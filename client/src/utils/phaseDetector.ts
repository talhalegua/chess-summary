import { Chess } from 'chess.js';
import type { AnalyzedMove, GamePhase } from '../types';
import { calculateOverallAccuracy } from './accuracyCalc';

/**
 * Count total material value on the board (excluding kings and pawns).
 * Queen=9, Rook=5, Bishop=3, Knight=3
 */
function countMaterial(fen: string): number {
  const chess = new Chess(fen);
  const board = chess.board();
  let material = 0;

  const values: Record<string, number> = { q: 9, r: 5, b: 3, n: 3 };

  for (const row of board) {
    for (const square of row) {
      if (square && square.type !== 'k' && square.type !== 'p') {
        material += values[square.type] || 0;
      }
    }
  }

  return material;
}

/**
 * Detect game phases: opening, middlegame, endgame.
 * - Opening: first 10-15 moves (or until material starts dropping significantly)
 * - Endgame: when total non-pawn material drops below threshold
 * - Middlegame: everything in between
 */
export function detectPhases(
  moves: AnalyzedMove[],
  playerColor: 'w' | 'b',
): GamePhase[] {
  if (moves.length === 0) return [];

  const playerMoves = moves.filter(m => m.color === playerColor);
  if (playerMoves.length === 0) return [];

  // Determine phase boundaries
  let openingEnd = Math.min(10, playerMoves.length); // Default: first 10 moves
  let endgameStart = playerMoves.length; // Default: no endgame

  for (let i = 0; i < playerMoves.length; i++) {
    const material = countMaterial(playerMoves[i].fen);

    // Opening ends when material drops below starting amount or after move 15
    if (i < 15 && material < 62) {
      // 62 = full non-pawn material (2*9 + 4*5 + 4*3 + 4*3 = 62)
      openingEnd = Math.min(openingEnd, i);
    }

    // Endgame starts when material is low (roughly queens traded + some pieces)
    if (material <= 20 && endgameStart === playerMoves.length) {
      endgameStart = i;
    }
  }

  // Ensure phases don't overlap incorrectly
  if (endgameStart <= openingEnd) {
    endgameStart = openingEnd + 1;
  }

  const phases: GamePhase[] = [];

  // Opening
  if (openingEnd > 0) {
    const openingMoves = playerMoves.slice(0, openingEnd);
    phases.push({
      name: 'opening',
      startMove: 1,
      endMove: openingEnd,
      accuracy: calculateOverallAccuracy(openingMoves.map(m => m.accuracy)),
      moves: openingMoves,
    });
  }

  // Middlegame
  if (openingEnd < endgameStart && openingEnd < playerMoves.length) {
    const middleMoves = playerMoves.slice(openingEnd, endgameStart);
    if (middleMoves.length > 0) {
      phases.push({
        name: 'middlegame',
        startMove: openingEnd + 1,
        endMove: Math.min(endgameStart, playerMoves.length),
        accuracy: calculateOverallAccuracy(middleMoves.map(m => m.accuracy)),
        moves: middleMoves,
      });
    }
  }

  // Endgame
  if (endgameStart < playerMoves.length) {
    const endMoves = playerMoves.slice(endgameStart);
    phases.push({
      name: 'endgame',
      startMove: endgameStart + 1,
      endMove: playerMoves.length,
      accuracy: calculateOverallAccuracy(endMoves.map(m => m.accuracy)),
      moves: endMoves,
    });
  }

  return phases;
}
