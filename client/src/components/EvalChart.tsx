import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { AnalyzedMove } from '../types';

interface EvalChartProps {
  moves: AnalyzedMove[];
  currentIndex: number;
  onMoveClick: (index: number) => void;
}

export function EvalChart({ moves, currentIndex, onMoveClick }: EvalChartProps) {
  const data = moves.map((move, i) => {
    // Normalize eval to pawns, clamped to [-10, 10]
    let evalPawns = move.evalAfter / 100;
    if (move.isMate && move.mateIn !== undefined) {
      evalPawns = move.mateIn > 0 ? 10 : -10;
    }
    evalPawns = Math.max(-10, Math.min(10, evalPawns));

    // evalAfter is from the perspective of the player who made the move.
    // For White moves: already from White's perspective (positive = White better)
    // For Black moves: from Black's perspective, so negate for chart (positive = White better)
    const chartEval = move.color === 'w' ? evalPawns : -evalPawns;

    return {
      moveNum: i + 1,
      eval: chartEval,
      move: `${Math.ceil((i + 1) / 2)}.${move.color === 'w' ? '' : '..'}${move.san}`,
    };
  });

  return (
    <div className="bg-[#1e1f2e] rounded-lg border border-gray-700/50 p-4">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Evaluation</h3>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            onClick={(e) => {
              if (e?.activeTooltipIndex != null && typeof e.activeTooltipIndex === 'number') {
                onMoveClick(e.activeTooltipIndex);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="moveNum"
              tick={{ fill: '#666', fontSize: 10 }}
              axisLine={{ stroke: '#444' }}
            />
            <YAxis
              domain={[-10, 10]}
              tick={{ fill: '#666', fontSize: 10 }}
              axisLine={{ stroke: '#444' }}
              width={30}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e1f2e',
                border: '1px solid #444',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
              formatter={(value: number | undefined) => [
                value != null ? `${value >= 0 ? '+' : ''}${value.toFixed(1)}` : '0',
                'Eval',
              ]}
              labelFormatter={(label: unknown) => {
                const idx = typeof label === 'number' ? label : Number(label);
                const move = data[idx - 1];
                return move ? move.move : `Move ${idx}`;
              }}
            />
            <ReferenceLine y={0} stroke="#555" strokeDasharray="3 3" />
            {currentIndex >= 0 && (
              <ReferenceLine
                x={currentIndex + 1}
                stroke="#4ade80"
                strokeWidth={2}
              />
            )}
            <defs>
              <linearGradient id="whiteGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e8e6e1" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#e8e6e1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="blackGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#403d39" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#403d39" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="eval"
              stroke="#888"
              fill="url(#whiteGrad)"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 4, fill: '#4ade80' }}
              baseValue={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
