import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import type { PracticePhase, PracticeArrow } from '../../hooks/useOpeningPractice';
import type { OpeningMoveNode } from '../../types/openings';

interface PracticeBoardPanelProps {
  fen: string;
  orientation: 'white' | 'black';
  phase: PracticePhase;
  path: OpeningMoveNode[];
  correctMoveArrow: PracticeArrow | null;
  mistakesOnCurrentMove: number;
  branchProgress: number;
  branchTotal: number;
  onPieceDrop: (from: string, to: string) => boolean;
  userColor: 'w' | 'b';
}

export function PracticeBoardPanel({
  fen,
  orientation,
  phase,
  path,
  correctMoveArrow,
  mistakesOnCurrentMove,
  branchProgress,
  branchTotal,
  onPieceDrop,
  userColor,
}: PracticeBoardPanelProps) {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  // Build square highlights
  const customSquareStyles: Record<string, React.CSSProperties> = {};

  // Highlight selected square for click-to-move
  if (selectedSquare) {
    customSquareStyles[selectedSquare] = { backgroundColor: 'rgba(34, 197, 94, 0.45)' };
    // Show legal move targets
    try {
      const chess = new Chess(fen);
      const moves = chess.moves({ square: selectedSquare as 'a1', verbose: true });
      for (const move of moves) {
        customSquareStyles[move.to] = {
          ...customSquareStyles[move.to],
          background: 'radial-gradient(circle, rgba(0,0,0,0.2) 25%, transparent 25%)',
        };
      }
    } catch { /* ignore */ }
  }

  // Highlight the last move played
  if (path.length > 0) {
    const lastNode = path[path.length - 1];
    const from = lastNode.uci.substring(0, 2);
    const to = lastNode.uci.substring(2, 4);
    customSquareStyles[from] = { backgroundColor: 'rgba(255, 255, 0, 0.25)' };
    customSquareStyles[to] = { backgroundColor: 'rgba(255, 255, 0, 0.35)' };
  }

  // Wrong move: flash red on the board
  const isWrongMove = phase === 'wrong_move' || phase === 'resetting';
  if (isWrongMove && correctMoveArrow) {
    customSquareStyles[correctMoveArrow.from] = { backgroundColor: 'rgba(239, 68, 68, 0.3)' };
    customSquareStyles[correctMoveArrow.to] = { backgroundColor: 'rgba(34, 197, 94, 0.35)' };
  }

  // Arrows
  const arrows: { startSquare: string; endSquare: string; color: string }[] = [];
  if (correctMoveArrow) {
    arrows.push({
      startSquare: correctMoveArrow.from,
      endSquare: correctMoveArrow.to,
      color: correctMoveArrow.color,
    });
  }

  // Only allow dragging on user's turn
  const canDrag = phase === 'user_turn';

  // Progress bar
  const progressPercent = branchTotal > 0 ? Math.round((branchProgress / branchTotal) * 100) : 0;

  return (
    <div>
      {/* Board */}
      <div className="w-[400px] h-[400px] relative">
        <Chessboard
          options={{
            position: fen,
            boardOrientation: orientation,
            boardStyle: { width: '400px', height: '400px' },
            squareStyles: customSquareStyles,
            darkSquareStyle: { backgroundColor: '#779952' },
            lightSquareStyle: { backgroundColor: '#edeed1' },
            allowDragging: canDrag,
            onPieceDrop: ({ sourceSquare, targetSquare }) => {
              if (!targetSquare) return false;
              return onPieceDrop(sourceSquare, targetSquare);
            },
            canDragPiece: ({ piece }) => {
              if (!canDrag) return false;
              // Only allow dragging user's pieces (pieceType is like "wP", "bN", etc.)
              const pieceColor = piece.pieceType.startsWith('w') ? 'w' : 'b';
              return pieceColor === userColor;
            },
            onSquareClick: ({ piece, square }) => {
              if (!canDrag) return;
              if (selectedSquare) {
                // Second click — try to move
                if (square !== selectedSquare) {
                  const result = onPieceDrop(selectedSquare, square);
                  if (result) {
                    setSelectedSquare(null);
                    return;
                  }
                }
                // Deselect if same square or invalid move
                setSelectedSquare(null);
              } else if (piece) {
                // First click — select a piece of user's color
                const pieceColor = piece.pieceType.startsWith('w') ? 'w' : 'b';
                if (pieceColor === userColor) {
                  setSelectedSquare(square);
                }
              }
            },
            showAnimations: true,
            animationDurationInMs: 200,
            arrows,
          }}
        />

        {/* Mistake badge */}
        {mistakesOnCurrentMove > 0 && phase !== 'resetting' && (
          <div className="absolute top-2 right-2 bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
            ❌ {mistakesOnCurrentMove}/2
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-2 h-1.5 bg-[#2a2b3d] rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>{branchProgress} / {branchTotal} moves</span>
        <span>{progressPercent}%</span>
      </div>
    </div>
  );
}
