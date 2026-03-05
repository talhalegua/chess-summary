import { useEffect, useRef } from 'react';
import type { AnalyzedMove } from '../types';
import { CLASSIFICATION_COLORS, CLASSIFICATION_SYMBOLS } from '../utils/moveClassifier';

interface MoveListProps {
  moves: AnalyzedMove[];
  currentIndex: number;
  onMoveClick: (index: number) => void;
  playerColor: 'w' | 'b';
}

export function MoveList({ moves, currentIndex, onMoveClick, playerColor }: MoveListProps) {
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [currentIndex]);

  // Group moves into pairs (white + black)
  const pairs: { white?: AnalyzedMove; black?: AnalyzedMove; moveNum: number }[] = [];
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    if (move.color === 'w') {
      pairs.push({ white: move, moveNum: Math.ceil(move.moveNumber / 2) });
    } else {
      if (pairs.length > 0 && !pairs[pairs.length - 1].black) {
        pairs[pairs.length - 1].black = move;
      } else {
        pairs.push({ black: move, moveNum: Math.ceil(move.moveNumber / 2) });
      }
    }
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="p-2">
        {pairs.map((pair, pairIdx) => (
          <div key={pairIdx} className="flex items-center text-sm">
            <span className="w-8 text-right text-gray-500 text-xs mr-2 shrink-0">
              {pair.moveNum}.
            </span>
            {pair.white && (
              <MoveButton
                move={pair.white}
                index={moves.indexOf(pair.white)}
                isActive={moves.indexOf(pair.white) === currentIndex}
                isPlayerMove={pair.white.color === playerColor}
                onClick={onMoveClick}
                ref={moves.indexOf(pair.white) === currentIndex ? activeRef : null}
              />
            )}
            {!pair.white && <div className="flex-1 px-2 py-1">...</div>}
            {pair.black && (
              <MoveButton
                move={pair.black}
                index={moves.indexOf(pair.black)}
                isActive={moves.indexOf(pair.black) === currentIndex}
                isPlayerMove={pair.black.color === playerColor}
                onClick={onMoveClick}
                ref={moves.indexOf(pair.black) === currentIndex ? activeRef : null}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import { forwardRef } from 'react';

interface MoveButtonProps {
  move: AnalyzedMove;
  index: number;
  isActive: boolean;
  isPlayerMove: boolean;
  onClick: (index: number) => void;
}

const MoveButton = forwardRef<HTMLButtonElement, MoveButtonProps>(
  ({ move, index, isActive, isPlayerMove, onClick }, ref) => {
    const color = CLASSIFICATION_COLORS[move.classification];
    const symbol = CLASSIFICATION_SYMBOLS[move.classification];

    return (
      <button
        ref={ref}
        onClick={() => onClick(index)}
        className={`flex-1 px-2 py-1 rounded text-left font-mono transition-colors ${
          isActive
            ? 'bg-green-400/20 text-white'
            : 'hover:bg-gray-700/50 text-gray-300'
        }`}
      >
        <span>{move.san}</span>
        {symbol && isPlayerMove && (
          <span className="ml-1 text-xs font-bold" style={{ color }}>
            {symbol}
          </span>
        )}
        {isPlayerMove && move.classification !== 'book' && (
          <span
            className="inline-block w-2 h-2 rounded-full ml-1"
            style={{ backgroundColor: color }}
          />
        )}
      </button>
    );
  },
);
