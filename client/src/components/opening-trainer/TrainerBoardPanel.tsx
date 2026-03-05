import { Chessboard } from 'react-chessboard';
import type { OpeningMoveNode } from '../../types/openings';

interface TrainerBoardPanelProps {
  fen: string;
  currentNode: OpeningMoveNode | null;
  orientation: 'white' | 'black';
  goForward: () => void;
  goBack: () => void;
  goToStart: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  currentIndex: number;
  totalMainLineMoves: number;
}

export function TrainerBoardPanel({
  fen,
  currentNode,
  orientation,
  goForward,
  goBack,
  goToStart,
  canGoBack,
  canGoForward,
  currentIndex,
  totalMainLineMoves,
}: TrainerBoardPanelProps) {
  // Build square highlights from current node
  const customSquareStyles: Record<string, React.CSSProperties> = {};

  if (currentNode) {
    // Highlight the move that was just played
    const from = currentNode.uci.substring(0, 2);
    const to = currentNode.uci.substring(2, 4);
    customSquareStyles[from] = { backgroundColor: 'rgba(255, 255, 0, 0.25)' };
    customSquareStyles[to] = { backgroundColor: 'rgba(255, 255, 0, 0.35)' };

    // Add node-specific highlights
    for (const h of currentNode.highlights) {
      customSquareStyles[h.square] = {
        backgroundColor: h.color,
        ...(customSquareStyles[h.square] || {}),
      };
    }
  }

  // Map opening arrows to react-chessboard format
  const arrows: { startSquare: string; endSquare: string; color: string }[] =
    currentNode?.arrows.map(a => ({
      startSquare: a.from,
      endSquare: a.to,
      color: a.color ?? 'rgba(96, 195, 96, 0.75)',
    })) ?? [];

  // Progress bar percentage
  const progressPercent =
    totalMainLineMoves > 0
      ? Math.round(((currentIndex + 1) / totalMainLineMoves) * 100)
      : 0;

  return (
    <div>
      {/* Board */}
      <div className="w-[400px] h-[400px]">
        <Chessboard
          options={{
            position: fen,
            boardOrientation: orientation,
            boardStyle: { width: '400px', height: '400px' },
            squareStyles: customSquareStyles,
            darkSquareStyle: { backgroundColor: '#779952' },
            lightSquareStyle: { backgroundColor: '#edeed1' },
            allowDragging: false,
            showAnimations: true,
            animationDurationInMs: 200,
            arrows,
          }}
        />
      </div>

      {/* Progress bar */}
      <div className="mt-2 h-1.5 bg-[#2a2b3d] rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>Move {Math.max(0, currentIndex + 1)}</span>
        <span>{totalMainLineMoves} total</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2 mt-2">
        <ControlButton onClick={goToStart} title="Go to start" disabled={!canGoBack}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </ControlButton>
        <ControlButton onClick={goBack} title="Previous move" disabled={!canGoBack}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </ControlButton>
        <ControlButton onClick={goForward} title="Next move" disabled={!canGoForward}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </ControlButton>
      </div>
    </div>
  );
}

function ControlButton({
  onClick,
  title,
  disabled,
  children,
}: {
  onClick: () => void;
  title: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
        disabled
          ? 'bg-[#2a2b3d] text-gray-600 cursor-not-allowed'
          : 'bg-[#2a2b3d] hover:bg-[#353648] text-gray-300 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}
