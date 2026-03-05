/**
 * Convert centipawn evaluation to win probability.
 * Uses logistic function similar to chess.com's approach.
 */
export function cpToWinProbability(cp: number): number {
  return 1 / (1 + Math.pow(10, -cp / 400));
}

/**
 * Calculate accuracy for a single move based on win probability change.
 * Uses the formula: accuracy = 103.1668 * exp(-0.04354 * (winProbBefore - winProbAfter) * 100) - 3.1668
 * This is an approximation of the chess.com accuracy formula.
 *
 * evalBefore and evalAfter should already be from the perspective of the player
 * who made the move (positive = good for that player).
 */
export function calculateMoveAccuracy(
  evalBefore: number,
  evalAfter: number,
): number {
  // Evals are already from the mover's perspective — no normalization needed
  const winProbBefore = cpToWinProbability(evalBefore);
  const winProbAfter = cpToWinProbability(evalAfter);

  const winProbLoss = Math.max(0, winProbBefore - winProbAfter);

  // Chess.com-like accuracy formula
  const accuracy = 103.1668 * Math.exp(-0.04354 * winProbLoss * 100) - 3.1668;

  return Math.max(0, Math.min(100, accuracy));
}

/**
 * Calculate overall accuracy from per-move accuracies.
 * Weighted harmonic mean - penalizes bad moves more heavily.
 */
export function calculateOverallAccuracy(moveAccuracies: number[]): number {
  if (moveAccuracies.length === 0) return 0;

  const sum = moveAccuracies.reduce((acc, a) => acc + a, 0);
  return sum / moveAccuracies.length;
}
