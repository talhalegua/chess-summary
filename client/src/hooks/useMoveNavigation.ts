import { useCallback, useEffect, useState } from 'react';
import type { AnalyzedMove } from '../types';

interface UseMoveNavigationReturn {
  currentIndex: number;        // -1 = starting position, 0 = first move, etc.
  currentMove: AnalyzedMove | null;
  currentFen: string;
  goForward: () => void;
  goBack: () => void;
  goToStart: () => void;
  goToEnd: () => void;
  goToMove: (index: number) => void;
  totalMoves: number;
}

const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export function useMoveNavigation(moves: AnalyzedMove[]): UseMoveNavigationReturn {
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Reset to start when moves change
  useEffect(() => {
    setCurrentIndex(-1);
  }, [moves]);

  const goForward = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, moves.length - 1));
  }, [moves.length]);

  const goBack = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, -1));
  }, []);

  const goToStart = useCallback(() => {
    setCurrentIndex(-1);
  }, []);

  const goToEnd = useCallback(() => {
    setCurrentIndex(moves.length - 1);
  }, [moves.length]);

  const goToMove = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(-1, Math.min(index, moves.length - 1)));
    },
    [moves.length],
  );

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goForward();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goBack();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToStart();
      } else if (e.key === 'End') {
        e.preventDefault();
        goToEnd();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goForward, goBack, goToStart, goToEnd]);

  const currentMove = currentIndex >= 0 ? moves[currentIndex] : null;
  const currentFen = currentIndex >= 0 ? moves[currentIndex].fen : STARTING_FEN;

  return {
    currentIndex,
    currentMove,
    currentFen,
    goForward,
    goBack,
    goToStart,
    goToEnd,
    goToMove,
    totalMoves: moves.length,
  };
}
