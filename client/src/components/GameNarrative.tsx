import type { GameAnalysis } from '../types';
import { generateNarrative } from '../utils/narrativeGenerator';
import { CLASSIFICATION_COLORS } from '../utils/moveClassifier';

interface GameNarrativeProps {
  analysis: GameAnalysis;
}

export function GameNarrative({ analysis }: GameNarrativeProps) {
  const paragraphs = generateNarrative(analysis);
  const counts = analysis.moveCounts;

  return (
    <div className="bg-[#1e1f2e] rounded-lg border border-gray-700/50 p-4">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Game Summary</h3>

      {/* Move classification counts */}
      <div className="flex flex-wrap gap-2 mb-4">
        {counts.brilliant > 0 && (
          <Badge color={CLASSIFICATION_COLORS.brilliant} label="Brilliant" count={counts.brilliant} />
        )}
        {counts.great > 0 && (
          <Badge color={CLASSIFICATION_COLORS.great} label="Great" count={counts.great} />
        )}
        {counts.best > 0 && (
          <Badge color={CLASSIFICATION_COLORS.best} label="Best" count={counts.best} />
        )}
        {counts.good > 0 && (
          <Badge color={CLASSIFICATION_COLORS.good} label="Good" count={counts.good} />
        )}
        {counts.book > 0 && (
          <Badge color={CLASSIFICATION_COLORS.book} label="Book" count={counts.book} />
        )}
        {counts.inaccuracy > 0 && (
          <Badge color={CLASSIFICATION_COLORS.inaccuracy} label="Inaccuracy" count={counts.inaccuracy} />
        )}
        {counts.mistake > 0 && (
          <Badge color={CLASSIFICATION_COLORS.mistake} label="Mistake" count={counts.mistake} />
        )}
        {counts.blunder > 0 && (
          <Badge color={CLASSIFICATION_COLORS.blunder} label="Blunder" count={counts.blunder} />
        )}
      </div>

      {/* Narrative paragraphs */}
      <div className="space-y-3">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-sm text-gray-300 leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function Badge({ color, label, count }: { color: string; label: string; count: number }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium"
      style={{ backgroundColor: `${color}20`, color }}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      {count} {label}
    </span>
  );
}
