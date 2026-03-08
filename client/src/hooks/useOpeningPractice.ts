import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Chess } from 'chess.js';
import type { OpeningDefinition, OpeningMoveNode } from '../types/openings';

export type PracticePhase =
  | 'idle'
  | 'user_turn'
  | 'computer_turn'
  | 'wrong_move'
  | 'resetting'
  | 'branch_complete'
  | 'all_complete';

export interface PracticeArrow {
  from: string;
  to: string;
  color: string;
}

export interface UseOpeningPracticeReturn {
  phase: PracticePhase;
  currentFen: string;
  path: OpeningMoveNode[];
  currentBranchIndex: number;
  totalBranches: number;
  currentBranchLabel: string;
  mistakesOnCurrentMove: number;
  totalMistakes: number;
  totalMovesAttempted: number;
  correctMoveArrow: PracticeArrow | null;
  branchProgress: number; // moves played in this branch
  branchTotal: number;    // total user moves in this branch
  accuracy: number;       // 0-100
  completedBranches: number;

  startPractice: () => void;
  attemptMove: (from: string, to: string) => boolean;
  nextBranch: () => void;
  restartBranch: () => void;
}

/** Extract all leaf-to-root branches from the opening tree, main line first */
function extractBranches(opening: OpeningDefinition): OpeningMoveNode[][] {
  const branches: OpeningMoveNode[][] = [];

  function walk(nodes: OpeningMoveNode[], pathSoFar: OpeningMoveNode[]) {
    // Sort: main line first
    const sorted = [...nodes].sort((a, b) => {
      if (a.isMainLine && !b.isMainLine) return -1;
      if (!a.isMainLine && b.isMainLine) return 1;
      return 0;
    });

    for (const node of sorted) {
      const currentPath = [...pathSoFar, node];
      if (node.children.length === 0) {
        // Leaf — this is a complete branch
        branches.push(currentPath);
      } else {
        walk(node.children, currentPath);
      }
    }
  }

  walk(opening.moves, []);
  return branches;
}

export function useOpeningPractice(opening: OpeningDefinition): UseOpeningPracticeReturn {
  const [phase, setPhase] = useState<PracticePhase>('idle');
  const [path, setPath] = useState<OpeningMoveNode[]>([]);
  const [pathIndex, setPathIndex] = useState(-1); // index into current branch we've reached
  const [currentBranchIndex, setCurrentBranchIndex] = useState(0);
  const [mistakesOnCurrentMove, setMistakesOnCurrentMove] = useState(0);
  const [totalMistakes, setTotalMistakes] = useState(0);
  const [totalMovesAttempted, setTotalMovesAttempted] = useState(0);
  const [correctMoveArrow, setCorrectMoveArrow] = useState<PracticeArrow | null>(null);
  const [completedBranches, setCompletedBranches] = useState(0);

  const computerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Extract all branches from the opening tree
  const drillBranches = useMemo(() => extractBranches(opening), [opening]);

  // Current branch
  const currentBranch = drillBranches[currentBranchIndex] ?? [];

  // Determine user's color
  const userColor = opening.playAs === 'white' ? 'w' : 'b';

  // Current FEN: derive from position in the branch
  const currentFen = useMemo(() => {
    if (pathIndex < 0) return opening.startingFen;
    if (pathIndex < path.length) return path[pathIndex].fen;
    return opening.startingFen;
  }, [pathIndex, path, opening.startingFen]);

  // Branch label
  const currentBranchLabel = useMemo(() => {
    const branch = drillBranches[currentBranchIndex];
    if (!branch) return 'Main Line';
    // Find the first node with a branchLabel
    for (const node of branch) {
      if (node.branchLabel) return node.branchLabel;
    }
    // If no branchLabel found, check if it's the main line
    if (branch.every(n => n.isMainLine)) return 'Main Line';
    return `Variation ${currentBranchIndex + 1}`;
  }, [drillBranches, currentBranchIndex]);

  // Count user moves in current branch
  const branchTotal = useMemo(() => {
    return currentBranch.filter(n => n.color === userColor).length;
  }, [currentBranch, userColor]);

  // Count user moves played so far
  const branchProgress = useMemo(() => {
    return path.slice(0, pathIndex + 1).filter(n => n.color === userColor).length;
  }, [path, pathIndex, userColor]);

  // Accuracy
  const accuracy = useMemo(() => {
    if (totalMovesAttempted === 0) return 100;
    const correct = totalMovesAttempted - totalMistakes;
    return Math.round((correct / totalMovesAttempted) * 100);
  }, [totalMovesAttempted, totalMistakes]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (computerTimerRef.current) clearTimeout(computerTimerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  // Reset when opening changes
  useEffect(() => {
    setPhase('idle');
    setPath([]);
    setPathIndex(-1);
    setCurrentBranchIndex(0);
    setMistakesOnCurrentMove(0);
    setTotalMistakes(0);
    setTotalMovesAttempted(0);
    setCorrectMoveArrow(null);
    setCompletedBranches(0);
  }, [opening.id]);

  /** Check if the next move in the branch is a computer move and auto-play it */
  const maybePlayComputerMove = useCallback((nextIdx: number, branch: OpeningMoveNode[]) => {
    if (nextIdx >= branch.length) {
      setPhase('branch_complete');
      return;
    }

    const nextNode = branch[nextIdx];
    if (nextNode.color !== userColor) {
      // Computer's turn
      setPhase('computer_turn');
      computerTimerRef.current = setTimeout(() => {
        setPath(prev => [...prev.slice(0, nextIdx), nextNode]);
        setPathIndex(nextIdx);
        setMistakesOnCurrentMove(0);
        setCorrectMoveArrow(null);

        // Check if there's more after the computer's move
        const afterComputerIdx = nextIdx + 1;
        if (afterComputerIdx >= branch.length) {
          setPhase('branch_complete');
        } else if (branch[afterComputerIdx].color !== userColor) {
          // Another computer move follows (shouldn't normally happen but handle it)
          maybePlayComputerMove(afterComputerIdx, branch);
        } else {
          setPhase('user_turn');
        }
      }, 400);
    } else {
      setPhase('user_turn');
    }
  }, [userColor]);

  /** Start practice from idle or restart */
  const startPractice = useCallback(() => {
    const branch = drillBranches[currentBranchIndex];
    if (!branch || branch.length === 0) return;

    setPath([]);
    setPathIndex(-1);
    setMistakesOnCurrentMove(0);
    setCorrectMoveArrow(null);

    // Check if the first move is a computer move
    maybePlayComputerMove(0, branch);
  }, [drillBranches, currentBranchIndex, maybePlayComputerMove]);

  /** User attempts a move by dragging a piece */
  const attemptMove = useCallback((from: string, to: string): boolean => {
    if (phase !== 'user_turn') return false;

    const branch = drillBranches[currentBranchIndex];
    if (!branch) return false;

    const expectedIdx = pathIndex + 1;
    if (expectedIdx >= branch.length) return false;

    const expectedNode = branch[expectedIdx];

    // Use chess.js to figure out the SAN of the attempted move
    const chess = new Chess(currentFen);
    let attemptedSan: string;
    try {
      const moveResult = chess.move({ from, to, promotion: 'q' }); // auto-promote to queen
      if (!moveResult) return false;
      attemptedSan = moveResult.san;
    } catch {
      return false; // illegal move
    }

    setTotalMovesAttempted(prev => prev + 1);

    if (attemptedSan === expectedNode.san) {
      // Correct move!
      setPath(prev => [...prev.slice(0, expectedIdx), expectedNode]);
      setPathIndex(expectedIdx);
      setMistakesOnCurrentMove(0);
      setCorrectMoveArrow(null);

      // Check what comes next
      maybePlayComputerMove(expectedIdx + 1, branch);
      return true;
    } else {
      // Wrong move
      setTotalMistakes(prev => prev + 1);
      const newMistakeCount = mistakesOnCurrentMove + 1;
      setMistakesOnCurrentMove(newMistakeCount);

      if (newMistakeCount >= 2) {
        // Two mistakes on same move → reset
        setPhase('resetting');
        setCorrectMoveArrow({
          from: expectedNode.uci.substring(0, 2),
          to: expectedNode.uci.substring(2, 4),
          color: 'rgba(239, 68, 68, 0.8)',
        });
        // Auto-restart after a delay
        resetTimerRef.current = setTimeout(() => {
          setPath([]);
          setPathIndex(-1);
          setMistakesOnCurrentMove(0);
          setCorrectMoveArrow(null);
          maybePlayComputerMove(0, branch);
        }, 2500);
      } else {
        // First mistake — show the correct move
        setPhase('wrong_move');
        setCorrectMoveArrow({
          from: expectedNode.uci.substring(0, 2),
          to: expectedNode.uci.substring(2, 4),
          color: 'rgba(34, 197, 94, 0.8)',
        });
        // Let user try again after a short delay
        computerTimerRef.current = setTimeout(() => {
          setCorrectMoveArrow(null);
          setPhase('user_turn');
        }, 1200);
      }
      return false;
    }
  }, [phase, drillBranches, currentBranchIndex, pathIndex, currentFen, mistakesOnCurrentMove, maybePlayComputerMove]);

  /** Move to the next branch */
  const nextBranch = useCallback(() => {
    const nextIdx = currentBranchIndex + 1;
    if (nextIdx >= drillBranches.length) {
      setPhase('all_complete');
      return;
    }
    setCompletedBranches(prev => prev + 1);
    setCurrentBranchIndex(nextIdx);
    setPath([]);
    setPathIndex(-1);
    setMistakesOnCurrentMove(0);
    setCorrectMoveArrow(null);

    // Start the next branch
    const branch = drillBranches[nextIdx];
    if (branch && branch.length > 0) {
      maybePlayComputerMove(0, branch);
    }
  }, [currentBranchIndex, drillBranches, maybePlayComputerMove]);

  /** Restart the current branch */
  const restartBranch = useCallback(() => {
    if (computerTimerRef.current) clearTimeout(computerTimerRef.current);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    setPath([]);
    setPathIndex(-1);
    setMistakesOnCurrentMove(0);
    setCorrectMoveArrow(null);

    const branch = drillBranches[currentBranchIndex];
    if (branch && branch.length > 0) {
      maybePlayComputerMove(0, branch);
    }
  }, [drillBranches, currentBranchIndex, maybePlayComputerMove]);

  return {
    phase,
    currentFen,
    path,
    currentBranchIndex,
    totalBranches: drillBranches.length,
    currentBranchLabel,
    mistakesOnCurrentMove,
    totalMistakes,
    totalMovesAttempted,
    correctMoveArrow,
    branchProgress,
    branchTotal,
    accuracy,
    completedBranches,
    startPractice,
    attemptMove,
    nextBranch,
    restartBranch,
  };
}
