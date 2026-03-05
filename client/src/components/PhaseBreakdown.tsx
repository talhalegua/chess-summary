import type { GamePhase, MoveClassification } from '../types';

interface PhaseBreakdownProps {
  phases: GamePhase[];
  overallAccuracy: number;
}

function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 90) return 'text-green-400';
  if (accuracy >= 70) return 'text-yellow-400';
  if (accuracy >= 50) return 'text-orange-400';
  return 'text-red-400';
}

function getAccuracyBg(accuracy: number): string {
  if (accuracy >= 90) return 'bg-green-400';
  if (accuracy >= 70) return 'bg-yellow-400';
  if (accuracy >= 50) return 'bg-orange-400';
  return 'bg-red-400';
}

function countBadMoves(moves: { classification: MoveClassification }[]): {
  inaccuracies: number;
  mistakes: number;
  blunders: number;
} {
  return {
    inaccuracies: moves.filter(m => m.classification === 'inaccuracy').length,
    mistakes: moves.filter(m => m.classification === 'mistake').length,
    blunders: moves.filter(m => m.classification === 'blunder').length,
  };
}

export function PhaseBreakdown({ phases, overallAccuracy }: PhaseBreakdownProps) {
  return (
    <div className="bg-[#1e1f2e] rounded-lg border border-gray-700/50 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-400">Accuracy by Phase</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Overall:</span>
          <span className={`font-bold ${getAccuracyColor(overallAccuracy)}`}>
            {overallAccuracy.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {phases.map(phase => {
          const bad = countBadMoves(phase.moves);
          return (
            <div
              key={phase.name}
              className="bg-[#16171f] rounded-lg p-3 text-center"
            >
              <div className="text-xs text-gray-500 capitalize mb-1">{phase.name}</div>
              <div className={`text-2xl font-bold ${getAccuracyColor(phase.accuracy)}`}>
                {phase.accuracy.toFixed(0)}%
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${getAccuracyBg(phase.accuracy)}`}
                  style={{ width: `${phase.accuracy}%` }}
                />
              </div>
              <div className="flex justify-center gap-2 mt-2 text-[10px]">
                {bad.inaccuracies > 0 && (
                  <span className="text-yellow-400">{bad.inaccuracies} inac.</span>
                )}
                {bad.mistakes > 0 && (
                  <span className="text-orange-400">{bad.mistakes} mist.</span>
                )}
                {bad.blunders > 0 && (
                  <span className="text-red-400">{bad.blunders} blun.</span>
                )}
                {bad.inaccuracies === 0 && bad.mistakes === 0 && bad.blunders === 0 && (
                  <span className="text-green-400">Clean!</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
