import type { MoveClassification } from '../types';

export const CLASSIFICATION_COLORS: Record<MoveClassification, string> = {
  brilliant: '#1baaa7',
  great: '#5c8bb0',
  best: '#96bc4b',
  good: '#96bc4b',
  book: '#a0a0a0',
  inaccuracy: '#f7c631',
  mistake: '#e58f2a',
  blunder: '#ca3431',
};

export const CLASSIFICATION_SYMBOLS: Record<MoveClassification, string> = {
  brilliant: '!!',
  great: '!',
  best: '',
  good: '',
  book: '',
  inaccuracy: '?!',
  mistake: '?',
  blunder: '??',
};

export function classifyMove(cpLoss: number, isBookMove: boolean): MoveClassification {
  // Only classify as book if the cpLoss is small — a move that loses
  // significant advantage is not a "book" move even if it's early in the game
  if (isBookMove && cpLoss <= 30) return 'book';
  if (cpLoss <= 0) return 'best';
  if (cpLoss <= 10) return 'great';
  if (cpLoss <= 30) return 'good';
  if (cpLoss <= 80) return 'inaccuracy';
  if (cpLoss <= 200) return 'mistake';
  return 'blunder';
}

export function classifyMoveWithContext(
  cpLoss: number,
  isBookMove: boolean,
  isSacrifice: boolean,
  evalBefore: number,
  evalAfter: number,
): MoveClassification {
  if (isBookMove && cpLoss <= 30) return 'book';

  // Brilliant: a sacrifice that maintains or improves advantage
  if (isSacrifice && cpLoss <= 10 && evalAfter >= evalBefore - 50) {
    return 'brilliant';
  }

  return classifyMove(cpLoss, false);
}
