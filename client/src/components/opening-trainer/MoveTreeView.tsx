import { useMemo, useEffect, useRef } from 'react';
import type { OpeningDefinition, OpeningMoveNode } from '../../types/openings';

interface MoveTreeViewProps {
  opening: OpeningDefinition;
  currentNode: OpeningMoveNode | null;
  currentPath: OpeningMoveNode[];
  exploredBranches: Set<string>;
  onNodeClick: (nodeId: string) => void;
}

// Layout constants
const COL_W = 48;
const ROW_H = 30;
const NODE_R = 9;
const PAD_X = 20;
const PAD_Y = 20;

interface LayoutNode {
  id: string;
  san: string;
  x: number;
  y: number;
  isMainLine: boolean;
  branchLabel?: string;
  color: 'w' | 'b';
}

interface LayoutEdge {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  isMainLine: boolean;
}

interface TreeLayout {
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  width: number;
  height: number;
}

/** Compute a horizontal left-to-right tree layout */
function computeLayout(roots: OpeningMoveNode[]): TreeLayout {
  const nodes: LayoutNode[] = [];
  const edges: LayoutEdge[] = [];
  let maxX = 0;
  let maxY = 0;

  function layout(
    node: OpeningMoveNode,
    col: number,
    row: number,
    parentX: number | null,
    parentY: number | null,
    parentIsMainLine: boolean,
  ): number {
    const x = PAD_X + col * COL_W;
    const y = PAD_Y + row * ROW_H;

    nodes.push({
      id: node.id,
      san: node.san,
      x,
      y,
      isMainLine: node.isMainLine,
      branchLabel: node.branchLabel,
      color: node.color,
    });

    if (parentX !== null && parentY !== null) {
      edges.push({
        fromX: parentX,
        fromY: parentY,
        toX: x,
        toY: y,
        isMainLine: node.isMainLine && parentIsMainLine,
      });
    }

    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);

    if (node.children.length === 0) return row;

    const nextCol = col + 1;
    let currentRow = row;

    // Main line child first — stays on same row
    const mainChild = node.children.find(c => c.isMainLine) ?? node.children[0];
    const sideChildren = node.children.filter(c => c !== mainChild);

    currentRow = layout(mainChild, nextCol, currentRow, x, y, node.isMainLine && mainChild.isMainLine);

    // Side branches go below
    for (const side of sideChildren) {
      currentRow += 1;
      currentRow = layout(side, nextCol, currentRow, x, y, false);
    }

    return currentRow;
  }

  let currentRow = 0;
  for (let i = 0; i < roots.length; i++) {
    const root = roots[i];
    currentRow = layout(root, 0, currentRow, null, null, root.isMainLine);
    if (i < roots.length - 1) currentRow += 1;
  }

  return {
    nodes,
    edges,
    width: maxX + PAD_X + NODE_R + 10,
    height: maxY + PAD_Y + NODE_R + 10,
  };
}

export function MoveTreeView({
  opening,
  currentNode,
  currentPath,
  exploredBranches,
  onNodeClick,
}: MoveTreeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentNodeRef = useRef<SVGGElement>(null);

  const tree = useMemo(() => computeLayout(opening.moves), [opening.moves]);

  const currentPathIds = useMemo(
    () => new Set(currentPath.map(n => n.id)),
    [currentPath],
  );

  // Auto-scroll to current node
  useEffect(() => {
    if (currentNodeRef.current && containerRef.current) {
      const container = containerRef.current;
      const nodeEl = currentNodeRef.current;
      const nodeRect = nodeEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const nodeCenter = nodeRect.left + nodeRect.width / 2 - containerRect.left + container.scrollLeft;
      const targetScroll = nodeCenter - containerRect.width / 2;
      container.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' });
    }
  }, [currentNode?.id]);

  function getNodeFill(node: LayoutNode): string {
    if (currentNode?.id === node.id) return '#4ade80';
    if (currentPathIds.has(node.id)) return '#22c55e50';
    if (exploredBranches.has(node.id)) return '#4ade8030';
    return node.isMainLine ? '#4b556380' : '#37415180';
  }

  function getNodeStroke(node: LayoutNode): string {
    if (currentNode?.id === node.id) return '#22c55e';
    if (currentPathIds.has(node.id)) return '#4ade80';
    if (node.isMainLine) return '#6b7280';
    return '#4b5563';
  }

  function getTextFill(node: LayoutNode): string {
    if (currentNode?.id === node.id) return '#ffffff';
    if (currentPathIds.has(node.id)) return '#bbf7d0';
    if (exploredBranches.has(node.id)) return '#9ca3af';
    return '#6b7280';
  }

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto overflow-y-auto flex-1"
    >
      <svg
        width={tree.width}
        height={tree.height}
        className="select-none"
      >
        {/* Edges */}
        {tree.edges.map((edge, i) => (
          <path
            key={`e-${i}`}
            d={`M${edge.fromX},${edge.fromY} C${edge.fromX + COL_W * 0.4},${edge.fromY} ${edge.toX - COL_W * 0.4},${edge.toY} ${edge.toX},${edge.toY}`}
            fill="none"
            stroke={edge.isMainLine ? '#4ade8060' : '#4b556340'}
            strokeWidth={edge.isMainLine ? 2.5 : 1.5}
          />
        ))}

        {/* Nodes */}
        {tree.nodes.map(node => {
          const isCurrent = currentNode?.id === node.id;
          return (
            <g
              key={node.id}
              ref={isCurrent ? currentNodeRef : undefined}
              onClick={() => onNodeClick(node.id)}
              className="cursor-pointer"
            >
              {/* Glow for current node */}
              {isCurrent && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={NODE_R + 4}
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth={1.5}
                  opacity={0.4}
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={NODE_R}
                fill={getNodeFill(node)}
                stroke={getNodeStroke(node)}
                strokeWidth={isCurrent ? 2 : 1}
              />
              {/* Piece color indicator (small inner dot) */}
              <circle
                cx={node.x}
                cy={node.y}
                r={3}
                fill={node.color === 'w' ? '#e5e7eb' : '#1f2937'}
                opacity={0.7}
              />
              {/* SAN label below */}
              <text
                x={node.x}
                y={node.y + NODE_R + 11}
                textAnchor="middle"
                fill={getTextFill(node)}
                fontSize={8}
                fontFamily="monospace"
                fontWeight={isCurrent ? 'bold' : 'normal'}
              >
                {node.san}
              </text>
              {/* Branch label (for variation starts) */}
              {node.branchLabel && !node.isMainLine && (
                <text
                  x={node.x}
                  y={node.y - NODE_R - 3}
                  textAnchor="middle"
                  fill="#f59e0b80"
                  fontSize={7}
                  fontFamily="sans-serif"
                >
                  {node.branchLabel.length > 12
                    ? node.branchLabel.substring(0, 11) + '…'
                    : node.branchLabel}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
