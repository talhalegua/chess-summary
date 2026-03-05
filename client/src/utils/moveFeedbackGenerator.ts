import { Chess } from 'chess.js';
import type { AnalyzedMove, MoveFeedback, FeedbackPattern } from '../types';
import { CLASSIFICATION_SYMBOLS } from './moveClassifier';

// =========================================
// Piece values for material calculations
// =========================================
const PIECE_VALUES: Record<string, number> = {
  p: 1, n: 3, b: 3, r: 5, q: 9, k: 0,
};

// =========================================
// PUBLIC API
// =========================================

/**
 * Generate feedback for all moves in-place.
 * Mutates the analyzedMoves array to set the `feedback` field.
 */
export function generateAllMoveFeedback(moves: AnalyzedMove[]): void {
  for (let i = 0; i < moves.length; i++) {
    moves[i].feedback = generateMoveFeedback(moves[i], i, moves);
  }
}

// =========================================
// CORE DISPATCH
// =========================================

function generateMoveFeedback(
  move: AnalyzedMove,
  index: number,
  allMoves: AnalyzedMove[],
): MoveFeedback {
  if (move.classification === 'book') {
    return bookMoveFeedback(move);
  }

  if (['best', 'great', 'brilliant'].includes(move.classification)) {
    return goodMoveFeedback(move, index, allMoves);
  }

  if (move.classification === 'good') {
    return decentMoveFeedback(move);
  }

  // inaccuracy, mistake, blunder
  return errorMoveFeedback(move, index, allMoves);
}

// =========================================
// FEEDBACK GENERATORS BY CATEGORY
// =========================================

function bookMoveFeedback(move: AnalyzedMove): MoveFeedback {
  return {
    headline: `${move.san} — Book move`,
    explanation: 'This is a well-known opening move. Theory considers this a standard continuation in this position.',
    pattern: 'none',
  };
}

function goodMoveFeedback(move: AnalyzedMove, index: number, allMoves: AnalyzedMove[]): MoveFeedback {
  const symbol = CLASSIFICATION_SYMBOLS[move.classification] || '';
  const label = move.classification === 'brilliant' ? 'Brilliant'
    : move.classification === 'great' ? 'Great move'
    : 'Best move';

  const headline = `${move.san}${symbol} — ${label}`;

  // Detect what makes this move good
  let explanation = '';
  const pattern = detectPattern(move, index, allMoves);

  if (move.isMate && move.mateIn !== undefined && move.mateIn > 0) {
    explanation = `This move leads to a forced checkmate in ${move.mateIn} move${move.mateIn > 1 ? 's' : ''}.`;
  } else if (pattern === 'checkmate_threat') {
    explanation = 'This move creates a checkmate threat that the opponent cannot adequately defend.';
  } else if (pattern === 'fork') {
    explanation = 'This move attacks multiple pieces at once, winning material.';
  } else if (pattern === 'sacrifice') {
    explanation = `A strong sacrifice! You gave up material for a decisive advantage.`;
  } else if (move.san.includes('x')) {
    const captured = detectCapturedPiece(move);
    if (captured) {
      explanation = `Good capture! Taking the ${captured} improves your position.`;
    } else {
      explanation = 'A strong capture that maintains or improves your advantage.';
    }
  } else if (move.san.includes('+')) {
    explanation = 'A strong check that puts pressure on the opponent and limits their options.';
  } else if (move.san === 'O-O' || move.san === 'O-O-O') {
    explanation = 'Castling brings your king to safety and connects your rooks.';
  } else if (pattern === 'development' || index < 12) {
    explanation = developmentExplanation(move);
  } else if (pattern === 'center_control') {
    explanation = 'This move strengthens your control of the center, keeping your pieces active.';
  } else {
    explanation = 'The engine considers this the strongest move in this position, maintaining your advantage.';
  }

  const pvDisplay = formatPvDisplay(move.pvSan, move.color, Math.ceil(move.moveNumber / 2));

  return {
    headline,
    explanation,
    pvDisplay: pvDisplay || undefined,
    pattern,
  };
}

function decentMoveFeedback(move: AnalyzedMove): MoveFeedback {
  const cpLoss = move.cpLoss / 100;
  let explanation: string;

  if (cpLoss < 0.1) {
    explanation = 'A solid move, very close to the engine\'s top choice.';
  } else {
    explanation = `A reasonable move. The engine slightly preferred ${move.bestMoveSan}, but the difference is small (${cpLoss.toFixed(1)} pawns).`;
  }

  return {
    headline: `${move.san} — Good move`,
    explanation,
    pattern: 'none',
  };
}

function errorMoveFeedback(move: AnalyzedMove, index: number, allMoves: AnalyzedMove[]): MoveFeedback {
  const symbol = CLASSIFICATION_SYMBOLS[move.classification] || '';
  const label = move.classification === 'blunder' ? 'Blunder'
    : move.classification === 'mistake' ? 'Mistake'
    : 'Inaccuracy';

  const headline = `${move.san}${symbol} — ${label}`;

  // Detect the pattern
  const pattern = detectPattern(move, index, allMoves);

  // Generate the main explanation (what went wrong)
  const explanation = generateErrorExplanation(move, pattern, index, allMoves);

  // Generate best move explanation
  const bestMoveExplanation = generateBestMoveExplanation(move, pattern);

  // PV display
  const pvDisplay = formatPvDisplay(move.pvSan, move.color, Math.ceil(move.moveNumber / 2));

  // Material impact
  const materialImpact = describeMaterialImpact(move);

  return {
    headline,
    explanation,
    bestMoveExplanation,
    pvDisplay: pvDisplay || undefined,
    materialImpact: materialImpact || undefined,
    pattern,
  };
}

// =========================================
// ERROR EXPLANATION GENERATION
// =========================================

function generateErrorExplanation(
  move: AnalyzedMove,
  pattern: FeedbackPattern,
  index: number,
  allMoves: AnalyzedMove[],
): string {
  const cpLoss = move.cpLoss / 100;

  switch (pattern) {
    case 'checkmate_threat': {
      // Check if opponent now has a forced mate
      const nextMove = allMoves[index + 1];
      if (nextMove?.isMate && nextMove.mateIn !== undefined) {
        return `This move allows your opponent to force checkmate. After ${move.san}, there is no way to prevent mate.`;
      }
      if (move.isMate && move.mateIn !== undefined && move.mateIn > 0) {
        return `You missed a forced checkmate in ${move.mateIn}! The winning sequence was available with ${move.bestMoveSan}.`;
      }
      return `This move misses a critical tactical opportunity. The position called for a more aggressive approach.`;
    }

    case 'hanging_piece': {
      const toSquare = move.uci.substring(2, 4);
      const movedPiece = detectMovedPiece(move);
      return `After ${move.san}, the ${movedPiece} on ${toSquare} is left vulnerable. Your opponent can win material by targeting this undefended piece.`;
    }

    case 'fork':
      return `This move misses a fork with ${move.bestMoveSan} that would attack multiple pieces at once, winning material.`;

    case 'trade_advantage': {
      const impact = describeMaterialImpact(move);
      return `This exchange is unfavorable.${impact ? ' ' + impact + '.' : ''} A better trade or avoiding the exchange altogether was available.`;
    }

    case 'king_safety':
      return `This move weakens your king's safety. The pawn structure around your king is compromised, giving your opponent attacking chances.`;

    case 'development':
      return `This move wastes time in the opening. Developing pieces quickly and controlling the center is crucial in the opening phase.`;

    case 'center_control':
      return `This move gives up control of the center. Central control is key for piece activity and flexibility.`;

    case 'trapped_piece':
      return `This move leads to a piece being trapped with limited mobility. The engine found a way to keep all pieces active.`;

    case 'piece_activity':
      return `This move reduces your piece coordination. The engine preferred a more active continuation.`;

    case 'back_rank':
      return `This move is vulnerable to back-rank tactics. Your king needs an escape square or the back rank needs protection.`;

    default:
      // Generic fallback based on centipawn loss
      if (cpLoss > 3) {
        return `This move loses significant ground (${cpLoss.toFixed(1)} pawns worth of advantage). The engine strongly preferred ${move.bestMoveSan}.`;
      }
      if (cpLoss > 1) {
        return `This move costs about ${cpLoss.toFixed(1)} pawns of advantage. ${move.bestMoveSan} was the stronger continuation here.`;
      }
      return `A slight inaccuracy. ${move.bestMoveSan} was a better choice, keeping tighter control of the position.`;
  }
}

function generateBestMoveExplanation(move: AnalyzedMove, pattern: FeedbackPattern): string {
  const bestSan = move.bestMoveSan;

  // If best move is a capture
  if (bestSan.includes('x')) {
    const captured = detectPieceFromSan(bestSan);
    if (captured) {
      return `${bestSan} wins the ${captured}, improving your position significantly.`;
    }
    return `${bestSan} makes a favorable capture, gaining material advantage.`;
  }

  // If best move gives check
  if (bestSan.includes('+')) {
    return `${bestSan} gives check while improving your position, forcing your opponent into a defensive response.`;
  }

  // If best move is checkmate
  if (bestSan.includes('#')) {
    return `${bestSan} delivers checkmate!`;
  }

  // Castling
  if (bestSan === 'O-O' || bestSan === 'O-O-O') {
    return `Castling with ${bestSan} brings the king to safety and activates the rook.`;
  }

  // Pattern-based best move explanation
  switch (pattern) {
    case 'fork':
      return `${bestSan} attacks multiple pieces simultaneously, winning material.`;
    case 'hanging_piece':
      return `${bestSan} keeps all your pieces safe while maintaining a strong position.`;
    case 'king_safety':
      return `${bestSan} keeps the king safe while maintaining your position.`;
    case 'development':
      return `${bestSan} develops a piece to an active square, following good opening principles.`;
    case 'center_control':
      return `${bestSan} fights for central control, keeping your pieces active and flexible.`;
    case 'checkmate_threat':
      return `${bestSan} creates a decisive attack that cannot be adequately defended.`;
    default:
      return `${bestSan} maintains a stronger position with better piece coordination.`;
  }
}

// =========================================
// PATTERN DETECTION
// =========================================

function detectPattern(
  move: AnalyzedMove,
  index: number,
  allMoves: AnalyzedMove[],
): FeedbackPattern {
  const isError = ['inaccuracy', 'mistake', 'blunder'].includes(move.classification);

  try {
    // 1. Checkmate threat
    if (detectCheckmateThreat(move, index, allMoves)) {
      return 'checkmate_threat';
    }

    // 2. Hanging piece (for errors)
    if (isError && detectHangingAfterMove(move)) {
      return 'hanging_piece';
    }

    // 3. Fork (best move creates a fork)
    if (isError && detectForkInBestMove(move)) {
      return 'fork';
    }

    // 4. Material trade
    if (move.san.includes('x') && isError) {
      const matDiff = getMaterialChange(move.fenBefore, move.fen);
      if (matDiff !== 0) {
        return 'trade_advantage';
      }
    }

    // 5. King safety
    if (detectKingSafetyChange(move)) {
      return 'king_safety';
    }

    // 6. Development (opening)
    if (index < 12 && detectDevelopmentIssue(move, isError)) {
      return 'development';
    }

    // 7. Sacrifice (for brilliant/great moves)
    if (move.classification === 'brilliant') {
      return 'sacrifice';
    }

    // 8. Back rank
    if (detectBackRankVulnerability(move)) {
      return 'back_rank';
    }

    return 'none';
  } catch {
    return 'none';
  }
}

// =========================================
// PATTERN DETECTION HELPERS
// =========================================

function detectCheckmateThreat(
  move: AnalyzedMove,
  index: number,
  allMoves: AnalyzedMove[],
): boolean {
  // Missed mate: the position before had a forced mate
  if (move.isMate && move.mateIn !== undefined && move.mateIn > 0) {
    return true;
  }
  // The played move allows mate: next move has mate
  const nextMove = allMoves[index + 1];
  if (nextMove?.isMate && nextMove.mateIn !== undefined && nextMove.mateIn > 0) {
    return true;
  }
  // Best move is checkmate
  if (move.bestMoveSan.includes('#')) {
    return true;
  }
  return false;
}

function detectHangingAfterMove(move: AnalyzedMove): boolean {
  try {
    const chess = new Chess(move.fen); // position AFTER the move
    const toSquare = move.uci.substring(2, 4);
    const piece = chess.get(toSquare as any);
    if (!piece) return false;

    // Don't flag pawns as hanging (too minor)
    if (piece.type === 'p') return false;

    // Check if the moved piece is attacked by opponent
    const opponentColor = move.color === 'w' ? 'b' : 'w';
    const isAttacked = chess.isAttacked(toSquare as any, opponentColor);

    if (!isAttacked) return false;

    // Check if it's defended
    const isDefended = chess.isAttacked(toSquare as any, move.color);

    // Hanging = attacked and not defended
    if (!isDefended) return true;

    // Even if defended, check if attacker is worth less (winning exchange for opponent)
    // This is a simplified check
    return false;
  } catch {
    return false;
  }
}

function detectForkInBestMove(move: AnalyzedMove): boolean {
  if (!move.bestMove || move.bestMove.length < 4) return false;

  try {
    const chess = new Chess(move.fenBefore);
    const from = move.bestMove.substring(0, 2);
    const to = move.bestMove.substring(2, 4);
    const promotion = move.bestMove.length > 4 ? move.bestMove[4] : undefined;

    const result = chess.move({ from, to, promotion });
    if (!result) return false;

    // Check what the moved piece attacks after the best move
    const targetSquare = to;
    const piece = chess.get(targetSquare as any);
    if (!piece) return false;

    const opponentColor = move.color === 'w' ? 'b' : 'w';

    // Get all opponent pieces that are attacked from the new square
    // by checking each square with an opponent piece
    const board = chess.board();
    let attackedPieces = 0;
    let attackedValue = 0;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const sq = board[row][col];
        if (sq && sq.color === opponentColor && sq.type !== 'p') {
          const sqName = String.fromCharCode(97 + col) + (8 - row);
          // Check if our piece on targetSquare attacks this square
          if (chess.isAttacked(sqName as any, move.color === 'w' ? 'w' : 'b')) {
            // Verify it's the moved piece doing the attacking (simplified)
            attackedPieces++;
            attackedValue += PIECE_VALUES[sq.type] || 0;
          }
        }
      }
    }

    // Fork = attacking 2+ valuable pieces
    return attackedPieces >= 2 && attackedValue >= 6;
  } catch {
    return false;
  }
}

function detectKingSafetyChange(move: AnalyzedMove): boolean {
  try {
    // Check if the move is a pawn move near the king
    const chess = new Chess(move.fenBefore);
    const piece = chess.get(move.uci.substring(0, 2) as any);
    if (!piece || piece.type !== 'p') return false;

    // Find the king position
    const board = chess.board();
    let kingCol = -1;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const sq = board[row][col];
        if (sq && sq.type === 'k' && sq.color === move.color) {
          kingCol = col;
        }
      }
    }

    if (kingCol === -1) return false;

    // Check if the pawn being moved is near the king (within 1 column)
    const pawnCol = move.uci.charCodeAt(0) - 97;
    return Math.abs(pawnCol - kingCol) <= 1 && move.cpLoss > 50;
  } catch {
    return false;
  }
}

function detectDevelopmentIssue(move: AnalyzedMove, isError: boolean): boolean {
  if (!isError) {
    // Good development: moving a piece from back rank
    const fromRank = move.uci[1];
    const piece = move.san[0];
    // Check if it's a piece (not pawn) moving from back rank
    return (piece >= 'A' && piece <= 'Z' && piece !== 'O') &&
      ((move.color === 'w' && fromRank === '1') || (move.color === 'b' && fromRank === '8'));
  }

  // For errors: moving the same piece twice, or not developing
  const san = move.san;
  // Moving queen too early is often a development issue
  if (san.startsWith('Q') && move.moveNumber <= 6) return true;

  return false;
}

function detectBackRankVulnerability(move: AnalyzedMove): boolean {
  if (!move.bestMoveSan.includes('#')) return false;

  try {
    // Check if the best move is a back rank mate
    const chess = new Chess(move.fenBefore);
    const from = move.bestMove.substring(0, 2);
    const to = move.bestMove.substring(2, 4);
    const toRank = to[1];

    const piece = chess.get(from as any);
    if (!piece) return false;

    // Rook or queen delivering mate on rank 1 or 8
    if ((piece.type === 'r' || piece.type === 'q') && (toRank === '1' || toRank === '8')) {
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

// =========================================
// UTILITY HELPERS
// =========================================

function countMaterial(fen: string): { white: number; black: number } {
  const chess = new Chess(fen);
  const board = chess.board();
  let white = 0;
  let black = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const sq = board[row][col];
      if (sq) {
        const val = PIECE_VALUES[sq.type] || 0;
        if (sq.color === 'w') white += val;
        else black += val;
      }
    }
  }

  return { white, black };
}

function getMaterialChange(fenBefore: string, fenAfter: string): number {
  const before = countMaterial(fenBefore);
  const after = countMaterial(fenAfter);
  const whiteDiff = after.white - before.white;
  const blackDiff = after.black - before.black;
  return whiteDiff - blackDiff;
}

function detectCapturedPiece(move: AnalyzedMove): string | null {
  if (!move.san.includes('x')) return null;

  const beforeMat = countMaterial(move.fenBefore);
  const afterMat = countMaterial(move.fen);

  const opponentColor = move.color === 'w' ? 'black' : 'white';
  const diff = beforeMat[opponentColor as 'white' | 'black'] - afterMat[opponentColor as 'white' | 'black'];

  // Map value back to piece name
  if (diff >= 9) return 'queen';
  if (diff >= 5) return 'rook';
  if (diff >= 3) return 'bishop/knight';
  if (diff >= 1) return 'pawn';
  return null;
}

function detectMovedPiece(move: AnalyzedMove): string {
  const san = move.san.replace(/[+#!?]/g, '');
  if (san === 'O-O' || san === 'O-O-O') return 'king';
  const first = san[0];
  if (first === 'N') return 'knight';
  if (first === 'B') return 'bishop';
  if (first === 'R') return 'rook';
  if (first === 'Q') return 'queen';
  if (first === 'K') return 'king';
  return 'pawn';
}

function detectPieceFromSan(san: string): string | null {
  // Extract what piece is captured from the move SAN
  // This is a rough heuristic — look at the target square piece
  if (san.includes('x')) {
    // The piece after x might give a hint, but SAN doesn't encode captured piece
    // We'll just say "material"
    return 'material';
  }
  return null;
}

function describeMaterialImpact(move: AnalyzedMove): string | null {
  if (!move.san.includes('x')) {
    // Not a capture - check if opponent can capture after this move
    // (simplified: just check cpLoss magnitude)
    if (move.cpLoss > 250) {
      return 'This costs roughly a piece or more in material.';
    }
    if (move.cpLoss > 100) {
      return `Position worsens by about ${(move.cpLoss / 100).toFixed(1)} pawns.`;
    }
    return null;
  }

  const matChange = getMaterialChange(move.fenBefore, move.fen);
  // matChange is from white's perspective
  const fromMoverPerspective = move.color === 'w' ? matChange : -matChange;

  if (fromMoverPerspective < -8) return 'Loses a queen in the exchange.';
  if (fromMoverPerspective < -4) return 'Loses the exchange (rook for minor piece).';
  if (fromMoverPerspective < -2) return 'Loses a minor piece in this trade.';
  if (fromMoverPerspective < 0) return 'Slightly unfavorable trade.';
  return null;
}

function developmentExplanation(move: AnalyzedMove): string {
  const san = move.san;
  if (san === 'O-O' || san === 'O-O-O') {
    return 'Castling brings your king to safety and connects your rooks — excellent development.';
  }
  if (san.startsWith('N')) {
    return 'Developing the knight to an active square, controlling key central squares.';
  }
  if (san.startsWith('B')) {
    return 'Developing the bishop to a strong diagonal where it controls important squares.';
  }
  if (san.startsWith('R')) {
    return 'Activating the rook on an open or semi-open file.';
  }
  // Pawn moves
  if (san.match(/^[a-h][34]/)) {
    return 'A solid pawn move fighting for central space and allowing piece development.';
  }
  return 'A well-placed move that follows sound positional principles.';
}

/**
 * Format PV SAN array into readable move notation.
 * e.g. pvSan: ["Nf3", "d5", "c4"], color 'w', moveNum 5 → "5. Nf3 d5 6. c4"
 */
function formatPvDisplay(pvSan: string[], startColor: 'w' | 'b', startMoveNumber: number): string {
  if (pvSan.length === 0) return '';

  const parts: string[] = [];
  let moveNum = startMoveNumber;
  let isWhite = startColor === 'w';

  for (let i = 0; i < pvSan.length; i++) {
    if (isWhite) {
      parts.push(`${moveNum}. ${pvSan[i]}`);
    } else {
      if (i === 0) {
        parts.push(`${moveNum}...${pvSan[i]}`);
      } else {
        parts.push(pvSan[i]);
      }
      moveNum++;
    }
    isWhite = !isWhite;
  }

  return parts.join(' ');
}
