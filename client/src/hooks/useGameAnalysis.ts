import { useCallback, useRef, useState } from 'react';
import { Chess } from 'chess.js';
import type { AnalyzedMove, GameAnalysis, StockfishResult } from '../types';
import { useStockfish } from './useStockfish';
import { classifyMove } from '../utils/moveClassifier';
import { calculateMoveAccuracy, calculateOverallAccuracy } from '../utils/accuracyCalc';
import { detectPhases } from '../utils/phaseDetector';
import { parsePgnHeaders, parseOpeningFromPgn } from '../utils/chesscomApi';
import { generateAllMoveFeedback } from '../utils/moveFeedbackGenerator';

interface UseGameAnalysisReturn {
  analysis: GameAnalysis | null;
  isAnalyzing: boolean;
  progress: number;           // 0-100
  currentMoveText: string;    // "Analyzing move 12/40..."
  engineReady: boolean;
  engineLoading: boolean;
  engineError: string | null;
  analysisError: string | null;
  startAnalysis: (pgn: string, playerUsername?: string) => Promise<void>;
  cancelAnalysis: () => void;
}

export function useGameAnalysis(): UseGameAnalysisReturn {
  const { isReady, isLoading, error, analyzePosition, stop } = useStockfish();
  const [analysis, setAnalysis] = useState<GameAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentMoveText, setCurrentMoveText] = useState('');
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const cancelledRef = useRef(false);

  const startAnalysis = useCallback(
    async (pgn: string, playerUsername?: string) => {
      if (!isReady) return;

      cancelledRef.current = false;
      setIsAnalyzing(true);
      setProgress(0);
      setAnalysis(null);
      setAnalysisError(null);

      try {
        const game = new Chess();
        game.loadPgn(pgn);

        const headers = parsePgnHeaders(pgn);
        const opening = parseOpeningFromPgn(pgn);

        // Determine player color
        let playerColor: 'w' | 'b' = 'w';
        if (playerUsername) {
          const lowerUser = playerUsername.toLowerCase();
          if (headers.Black?.toLowerCase() === lowerUser) {
            playerColor = 'b';
          }
        }

        // Replay the game to get all positions and FENs
        const replay = new Chess();
        const history = game.history({ verbose: true });

        // Collect all FENs first (N+1 positions for N moves)
        const fens: string[] = [replay.fen()];
        for (const move of history) {
          replay.move(move.san);
          fens.push(replay.fen());
        }

        // Check if final position is game-over (checkmate/stalemate)
        // Stockfish can't analyze positions with no legal moves
        const finalCheck = new Chess(fens[fens.length - 1]);
        const isGameOver = finalCheck.isGameOver();

        // Evaluate all positions (one eval per position, depth 12 for speed)
        // Skip the last position if it's game-over
        const DEPTH = 12;
        const positionsToEval = isGameOver ? fens.length - 1 : fens.length;
        const evals: StockfishResult[] = [];

        for (let i = 0; i < positionsToEval; i++) {
          if (cancelledRef.current) break;
          setCurrentMoveText(`Analyzing position ${i + 1}/${positionsToEval}...`);
          setProgress(Math.round((i / positionsToEval) * 100));

          const result = await analyzePosition(fens[i], DEPTH);
          evals.push(result);
        }

        // Add a synthetic eval for game-over position
        if (isGameOver && !cancelledRef.current) {
          if (finalCheck.isCheckmate()) {
            evals.push({ score: -100000, bestMove: '', isMate: true, mateIn: 0, pv: [], depth: 0 });
          } else {
            evals.push({ score: 0, bestMove: '', isMate: false, pv: [], depth: 0 });
          }
        }

        if (cancelledRef.current) {
          setIsAnalyzing(false);
          return;
        }

        // Build analyzed moves from consecutive evals
        const analyzedMoves: AnalyzedMove[] = [];

        for (let i = 0; i < history.length; i++) {
          const move = history[i];
          const fenBefore = fens[i];
          const fenAfter = fens[i + 1];
          const evalBeforeRaw = evals[i];     // eval from side-to-move perspective
          const evalAfterRaw = evals[i + 1];  // eval from next side-to-move perspective

          // Normalize: score from the perspective of the side that made this move
          // evalBeforeRaw.score is from side-to-move's perspective (= this move's color)
          const scoreBefore = evalBeforeRaw.score;
          // evalAfterRaw.score is from the NEXT side-to-move's perspective (= opponent)
          // So negate it to get this move's color's perspective
          const scoreAfter = -evalAfterRaw.score;

          // If the played move matches the engine's best move, cpLoss is 0 by definition.
          // Depth-limited evaluations can produce inconsistent scores across positions,
          // so we trust the engine's move ranking over the raw score difference.
          const uciPlayed = `${move.from}${move.to}${move.promotion || ''}`;
          const rawCpLoss = Math.max(0, scoreBefore - scoreAfter);
          const cpLoss = uciPlayed === evalBeforeRaw.bestMove ? 0 : rawCpLoss;

          // Determine best move SAN
          let bestMoveSan = evalBeforeRaw.bestMove;
          try {
            const tempGame = new Chess(fenBefore);
            const bestMoveObj = tempGame.move({
              from: evalBeforeRaw.bestMove.substring(0, 2),
              to: evalBeforeRaw.bestMove.substring(2, 4),
              promotion: evalBeforeRaw.bestMove.length > 4
                ? evalBeforeRaw.bestMove[4]
                : undefined,
            });
            if (bestMoveObj) bestMoveSan = bestMoveObj.san;
          } catch {
            // Keep UCI notation
          }

          const classification = classifyMove(cpLoss, i < 6);
          const accuracy = calculateMoveAccuracy(scoreBefore, scoreAfter);

          // Convert PV from UCI to SAN (truncate to 6 half-moves)
          let pvSan: string[] = [];
          const pvUci = (evalBeforeRaw.pv || []).slice(0, 6);
          try {
            const pvGame = new Chess(fenBefore);
            for (const uciMove of pvUci) {
              const from = uciMove.substring(0, 2);
              const to = uciMove.substring(2, 4);
              const promotion = uciMove.length > 4 ? uciMove[4] : undefined;
              const moveObj = pvGame.move({ from, to, promotion });
              if (moveObj) {
                pvSan.push(moveObj.san);
              } else {
                break;
              }
            }
          } catch {
            pvSan = [];
          }

          analyzedMoves.push({
            moveNumber: i + 1,
            san: move.san,
            uci: `${move.from}${move.to}${move.promotion || ''}`,
            color: move.color,
            fen: fenAfter,
            fenBefore,
            evalBefore: scoreBefore,
            evalAfter: scoreAfter,
            bestMove: evalBeforeRaw.bestMove,
            bestMoveSan,
            cpLoss,
            classification,
            isMate: evalBeforeRaw.isMate,
            mateIn: evalBeforeRaw.mateIn,
            accuracy,
            pv: pvUci,
            pvSan,
            feedback: { headline: '', explanation: '' }, // placeholder, filled below
          });
        }

        if (cancelledRef.current) {
          setIsAnalyzing(false);
          return;
        }

        // Generate per-move feedback explanations
        generateAllMoveFeedback(analyzedMoves);

        // Calculate accuracies
        const whiteMoves = analyzedMoves.filter(m => m.color === 'w');
        const blackMoves = analyzedMoves.filter(m => m.color === 'b');
        const whiteAccuracy = calculateOverallAccuracy(whiteMoves.map(m => m.accuracy));
        const blackAccuracy = calculateOverallAccuracy(blackMoves.map(m => m.accuracy));

        // Detect phases
        const phases = detectPhases(analyzedMoves, playerColor);

        // Count classifications for player's moves
        const playerMoves = analyzedMoves.filter(m => m.color === playerColor);
        const moveCounts = countClassifications(playerMoves);

        const result: GameAnalysis = {
          moves: analyzedMoves,
          whiteAccuracy,
          blackAccuracy,
          phases,
          opening,
          result: headers.Result || '*',
          whiteName: headers.White || 'White',
          blackName: headers.Black || 'Black',
          whiteRating: parseInt(headers.WhiteElo || '0'),
          blackRating: parseInt(headers.BlackElo || '0'),
          timeControl: headers.TimeControl || '',
          date: headers.Date || '',
          playerColor,
          moveCounts,
        };

        setAnalysis(result);
      } catch (err: any) {
        console.error('Analysis error:', err);
        const msg = err?.message || 'Unknown error during analysis';
        if (msg.includes('Invalid move')) {
          setAnalysisError(`Invalid PGN: ${msg}. Please check your PGN and try again.`);
        } else {
          setAnalysisError(`Analysis failed: ${msg}`);
        }
      } finally {
        setIsAnalyzing(false);
        setProgress(100);
      }
    },
    [isReady, analyzePosition],
  );

  const cancelAnalysis = useCallback(() => {
    cancelledRef.current = true;
    stop();
  }, [stop]);

  return {
    analysis,
    isAnalyzing,
    progress,
    currentMoveText,
    engineReady: isReady,
    engineLoading: isLoading,
    engineError: error,
    analysisError,
    startAnalysis,
    cancelAnalysis,
  };
}

function countClassifications(
  moves: AnalyzedMove[],
): GameAnalysis['moveCounts'] {
  const counts: GameAnalysis['moveCounts'] = {
    brilliant: 0,
    great: 0,
    best: 0,
    good: 0,
    book: 0,
    inaccuracy: 0,
    mistake: 0,
    blunder: 0,
  };

  for (const move of moves) {
    counts[move.classification]++;
  }

  return counts;
}
