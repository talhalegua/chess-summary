import { useCallback, useEffect, useMemo, useState } from 'react';
import type { OpeningDefinition, OpeningMoveNode } from '../types/openings';

export interface Breadcrumb {
  label: string;
  pathIndex: number;
}

export interface UseOpeningNavigationReturn {
  /** The sequence of move nodes from root to the end of the current branch */
  path: OpeningMoveNode[];
  /** Index within path (-1 = starting position, 0 = first move, ...) */
  currentIndex: number;
  /** The node at the current index, or null at starting position */
  currentNode: OpeningMoveNode | null;
  /** FEN to display on the board */
  currentFen: string;
  /** Available branches at the next step (when at end of current path) */
  nextBranches: OpeningMoveNode[];
  /** Breadcrumb trail showing branch choices */
  breadcrumbs: Breadcrumb[];
  /** Set of explored node IDs */
  exploredBranches: Set<string>;
  /** Whether the current path follows the main line */
  isOnMainLine: boolean;
  /** Whether we can step backward */
  canGoBack: boolean;
  /** Whether we can step forward (either mid-path or has children) */
  canGoForward: boolean;
  /** Total moves in the main line (for progress display) */
  totalMainLineMoves: number;

  goForward: () => void;
  goBack: () => void;
  goToStart: () => void;
  goToMainLine: () => void;
  selectBranch: (nodeId: string) => void;
  goToMove: (index: number) => void;
}

/** Count the depth of the main line from a set of root children */
function countMainLineDepth(nodes: OpeningMoveNode[]): number {
  const mainChild = nodes.find(n => n.isMainLine) ?? nodes[0];
  if (!mainChild) return 0;
  return 1 + countMainLineDepth(mainChild.children);
}

/** Get the main line path from a set of root children */
function getMainLinePath(nodes: OpeningMoveNode[]): OpeningMoveNode[] {
  const mainChild = nodes.find(n => n.isMainLine) ?? nodes[0];
  if (!mainChild) return [];
  return [mainChild, ...getMainLinePath(mainChild.children)];
}

/** Check if a path follows the main line throughout */
function isPathOnMainLine(path: OpeningMoveNode[]): boolean {
  return path.every(node => node.isMainLine);
}

export function useOpeningNavigation(opening: OpeningDefinition): UseOpeningNavigationReturn {
  const [path, setPath] = useState<OpeningMoveNode[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [exploredBranches, setExploredBranches] = useState<Set<string>>(new Set());

  // Reset when opening changes
  useEffect(() => {
    setPath([]);
    setCurrentIndex(-1);
    setExploredBranches(new Set());
  }, [opening.id]);

  const markExplored = useCallback((nodeId: string) => {
    setExploredBranches(prev => {
      if (prev.has(nodeId)) return prev;
      const next = new Set(prev);
      next.add(nodeId);
      return next;
    });
  }, []);

  // Derived state
  const currentNode = currentIndex >= 0 && currentIndex < path.length ? path[currentIndex] : null;
  const currentFen = currentNode ? currentNode.fen : opening.startingFen;

  // Next branches: available children at the current tip
  const nextBranches = useMemo<OpeningMoveNode[]>(() => {
    // If we're mid-path (not at the end), no branching UI — just continue
    if (currentIndex < path.length - 1) return [];
    // At the tip: show children of current node, or root moves if at start
    if (currentIndex === -1) return opening.moves;
    return currentNode?.children ?? [];
  }, [currentIndex, path.length, currentNode, opening.moves]);

  // Breadcrumbs: labels from nodes that have a branchLabel
  const breadcrumbs = useMemo<Breadcrumb[]>(() => {
    const crumbs: Breadcrumb[] = [{ label: opening.name, pathIndex: -1 }];
    path.forEach((node, idx) => {
      if (node.branchLabel) {
        crumbs.push({ label: node.branchLabel, pathIndex: idx });
      }
    });
    return crumbs;
  }, [path, opening.name]);

  const isOnMainLine = useMemo(() => isPathOnMainLine(path.slice(0, currentIndex + 1)), [path, currentIndex]);

  const totalMainLineMoves = useMemo(() => countMainLineDepth(opening.moves), [opening.moves]);

  const canGoBack = currentIndex > -1;
  const canGoForward = currentIndex < path.length - 1 || nextBranches.length > 0;

  // Navigate forward: follow main line child or advance through existing path
  const goForward = useCallback(() => {
    // If mid-path, just advance the index
    if (currentIndex < path.length - 1) {
      setCurrentIndex(prev => prev + 1);
      return;
    }
    // At the tip: auto-select main line child
    const branches = currentNode?.children ?? opening.moves;
    const mainLine = branches.find(b => b.isMainLine) ?? branches[0];
    if (mainLine) {
      setPath(prev => [...prev.slice(0, currentIndex + 1), mainLine]);
      setCurrentIndex(prev => prev + 1);
      markExplored(mainLine.id);
    }
  }, [currentIndex, path.length, currentNode, opening.moves, markExplored]);

  // Navigate backward
  const goBack = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, -1));
  }, []);

  // Go to starting position
  const goToStart = useCallback(() => {
    setCurrentIndex(-1);
  }, []);

  // Select a specific branch at the current branching point
  const selectBranch = useCallback((nodeId: string) => {
    const branches = currentNode?.children ?? opening.moves;
    const branch = branches.find(b => b.id === nodeId);
    if (branch) {
      // Truncate path after current position and add the chosen branch
      setPath(prev => [...prev.slice(0, currentIndex + 1), branch]);
      setCurrentIndex(prev => prev + 1);
      markExplored(branch.id);
    }
  }, [currentNode, currentIndex, opening.moves, markExplored]);

  // Reset to main line from the current position
  const goToMainLine = useCallback(() => {
    const mainLinePath = getMainLinePath(opening.moves);
    setPath(mainLinePath);
    // Keep the current depth but cap at main line length
    setCurrentIndex(prev => Math.min(prev, mainLinePath.length - 1));
  }, [opening.moves]);

  // Jump to a specific index
  const goToMove = useCallback((index: number) => {
    setCurrentIndex(Math.max(-1, Math.min(index, path.length - 1)));
  }, [path.length]);

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
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goForward, goBack, goToStart]);

  return {
    path,
    currentIndex,
    currentNode,
    currentFen,
    nextBranches,
    breadcrumbs,
    exploredBranches,
    isOnMainLine,
    canGoBack,
    canGoForward,
    totalMainLineMoves,
    goForward,
    goBack,
    goToStart,
    goToMainLine,
    selectBranch,
    goToMove,
  };
}
