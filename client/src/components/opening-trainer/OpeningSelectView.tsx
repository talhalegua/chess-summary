import type { OpeningDefinition } from '../../types/openings';
import { ALL_OPENINGS } from '../../data/openings';

interface OpeningSelectViewProps {
  onSelectOpening: (opening: OpeningDefinition) => void;
  onBack: () => void;
}

export function OpeningSelectView({ onSelectOpening, onBack }: OpeningSelectViewProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="bg-[#1e1f2e] border-b border-gray-700/50 px-6 py-3">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h2 className="text-lg font-bold text-white">Opening Trainer</h2>
            <p className="text-xs text-gray-400">Learn popular openings with move-by-move explanations</p>
          </div>
        </div>
      </div>

      {/* Opening cards grid */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ALL_OPENINGS.map(opening => (
            <OpeningCard
              key={opening.id}
              opening={opening}
              onClick={() => onSelectOpening(opening)}
            />
          ))}
        </div>

        {ALL_OPENINGS.length === 0 && (
          <p className="text-gray-500 text-center py-12">No openings available yet.</p>
        )}
      </div>
    </div>
  );
}

function OpeningCard({
  opening,
  onClick,
}: {
  opening: OpeningDefinition;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-[#1e1f2e] rounded-xl border border-gray-700/50 p-5 hover:border-green-500/40 hover:bg-[#1e1f2e]/80 transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-white font-bold text-base group-hover:text-green-400 transition-colors">
            {opening.name}
          </h3>
          <span className="text-xs text-gray-500 font-mono">{opening.eco}</span>
        </div>
        <div className="flex items-center gap-2">
          <DifficultyBadge difficulty={opening.difficulty} />
          <PlayAsBadge playAs={opening.playAs} />
        </div>
      </div>

      <p className="text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2">
        {opening.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {opening.tags.map(tag => (
          <span
            key={tag}
            className="text-xs bg-[#2a2b3d] text-gray-400 px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: 'beginner' | 'intermediate' }) {
  const colors =
    difficulty === 'beginner'
      ? 'bg-green-500/15 text-green-400'
      : 'bg-amber-500/15 text-amber-400';

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors}`}>
      {difficulty === 'beginner' ? 'Beginner' : 'Intermediate'}
    </span>
  );
}

function PlayAsBadge({ playAs }: { playAs: 'white' | 'black' }) {
  return (
    <div className="flex items-center gap-1" title={`Play as ${playAs}`}>
      <div
        className={`w-3 h-3 rounded-full ${
          playAs === 'white'
            ? 'bg-white border border-gray-300'
            : 'bg-gray-800 border border-gray-500'
        }`}
      />
    </div>
  );
}
