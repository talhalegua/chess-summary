import type { OpeningMoveNode } from '../../types/openings';
import { useEffect, useRef } from 'react';

interface OpeningMoveListProps {
  path: OpeningMoveNode[];
  currentIndex: number;
  onMoveClick: (index: number) => void;
}

export function OpeningMoveList({ path, currentIndex, onMoveClick }: OpeningMoveListProps) {
  const activeRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to active move
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [currentIndex]);

  if (path.length === 0) {
    return (
      <div className="px-3 py-4 text-xs text-gray-500 italic">
        Starting position. Press the right arrow to begin.
      </div>
    );
  }

  // Group moves into pairs (white move + black response)
  const rows: { moveNum: number; white?: { node: OpeningMoveNode; idx: number }; black?: { node: OpeningMoveNode; idx: number } }[] = [];

  for (let i = 0; i < path.length; i++) {
    const node = path[i];
    const fullMoveNum = Math.ceil(node.moveNumber / 2);

    if (node.color === 'w') {
      rows.push({ moveNum: fullMoveNum, white: { node, idx: i } });
    } else {
      const lastRow = rows[rows.length - 1];
      if (lastRow && lastRow.moveNum === fullMoveNum && !lastRow.black) {
        lastRow.black = { node, idx: i };
      } else {
        rows.push({ moveNum: fullMoveNum, black: { node, idx: i } });
      }
    }
  }

  return (
    <div className="overflow-y-auto flex-1 px-1 py-1">
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="flex items-center text-sm font-mono"
        >
          <span className="w-8 text-right text-gray-500 text-xs pr-1 shrink-0">
            {row.moveNum}.
          </span>
          {row.white ? (
            <MoveButton
              ref={row.white.idx === currentIndex ? activeRef : undefined}
              node={row.white.node}
              isActive={row.white.idx === currentIndex}
              onClick={() => onMoveClick(row.white!.idx)}
            />
          ) : (
            <span className="w-16 text-gray-600 text-xs px-1">...</span>
          )}
          {row.black && (
            <MoveButton
              ref={row.black.idx === currentIndex ? activeRef : undefined}
              node={row.black.node}
              isActive={row.black.idx === currentIndex}
              onClick={() => onMoveClick(row.black!.idx)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

import { forwardRef } from 'react';

interface MoveButtonProps {
  node: OpeningMoveNode;
  isActive: boolean;
  onClick: () => void;
}

const MoveButton = forwardRef<HTMLButtonElement, MoveButtonProps>(
  function MoveButton({ node, isActive, onClick }, ref) {
    const hasBranch = !node.isMainLine;

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`px-1.5 py-0.5 rounded text-xs transition-colors min-w-[3rem] text-left ${
          isActive
            ? 'bg-green-500/20 text-green-400 font-bold'
            : 'text-gray-300 hover:bg-[#2a2b3d] hover:text-white'
        }`}
      >
        {node.san}
        {hasBranch && (
          <span className="text-amber-400 ml-0.5" title="Side variation">
            *
          </span>
        )}
      </button>
    );
  },
);
