import { Chessboard } from 'react-chessboard';
import type { AnalyzedMove } from '../types';
import { EvalBar } from './EvalBar';
import { CLASSIFICATION_COLORS } from '../utils/moveClassifier';

interface ChessBoardPanelProps {
  fen: string;
  currentMove: AnalyzedMove | null;
  orientation: 'white' | 'black';
  goForward: () => void;
  goBack: () => void;
  goToStart: () => void;
  goToEnd: () => void;
}

export function ChessBoardPanel({
  fen,
  currentMove,
  orientation,
  goForward,
  goBack,
  goToStart,
  goToEnd,
}: ChessBoardPanelProps) {
  // Highlight squares for the current move
  const customSquareStyles: Record<string, React.CSSProperties> = {};

  if (currentMove) {
    const from = currentMove.uci.substring(0, 2);
    const to = currentMove.uci.substring(2, 4);
    const color = CLASSIFICATION_COLORS[currentMove.classification];

    customSquareStyles[from] = {
      backgroundColor: `${color}40`,
    };
    customSquareStyles[to] = {
      backgroundColor: `${color}60`,
    };
  }

  // Current evaluation for the eval bar (normalize to White's perspective)
  // evalAfter is from the perspective of the player who made the move
  const evaluation = currentMove
    ? (currentMove.color === 'w' ? currentMove.evalAfter : -currentMove.evalAfter)
    : 0;

  // Build arrows for best move suggestion on errors
  const arrows: { startSquare: string; endSquare: string; color: string }[] = [];
  if (
    currentMove &&
    ['inaccuracy', 'mistake', 'blunder'].includes(currentMove.classification) &&
    currentMove.bestMove &&
    currentMove.bestMove.length >= 4
  ) {
    arrows.push({
      startSquare: currentMove.bestMove.substring(0, 2),
      endSquare: currentMove.bestMove.substring(2, 4),
      color: 'rgba(96, 195, 96, 0.75)',
    });
  }

  return (
    <div className="flex gap-1">
      {/* Eval Bar */}
      <div className="h-[400px]">
        <EvalBar
          evaluation={evaluation}
          isMate={currentMove?.isMate ?? false}
          mateIn={currentMove?.mateIn}
        />
      </div>

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

        {/* Controls */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <ControlButton onClick={goToStart} title="Go to start">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </ControlButton>
          <ControlButton onClick={goBack} title="Previous move">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </ControlButton>
          <ControlButton onClick={goForward} title="Next move">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </ControlButton>
          <ControlButton onClick={goToEnd} title="Go to end">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </ControlButton>
        </div>
      </div>
    </div>
  );
}

function ControlButton({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-10 h-10 flex items-center justify-center bg-[#2a2b3d] hover:bg-[#353648] text-gray-300 hover:text-white rounded-lg transition-colors"
    >
      {children}
    </button>
  );
}
