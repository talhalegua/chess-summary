import type { OpeningMoveNode, OpeningConcept, OpeningDefinition } from '../../types/openings';

interface OpeningExplanationPanelProps {
  node: OpeningMoveNode | null;
  opening: OpeningDefinition;
}

const CONCEPT_LABELS: Record<OpeningConcept, { label: string; color: string }> = {
  center_control: { label: 'Center Control', color: 'bg-green-500/20 text-green-400' },
  development: { label: 'Development', color: 'bg-blue-500/20 text-blue-400' },
  king_safety: { label: 'King Safety', color: 'bg-yellow-500/20 text-yellow-400' },
  pawn_structure: { label: 'Pawn Structure', color: 'bg-purple-500/20 text-purple-400' },
  piece_activity: { label: 'Piece Activity', color: 'bg-cyan-500/20 text-cyan-400' },
  tempo: { label: 'Tempo', color: 'bg-orange-500/20 text-orange-400' },
  tactical_threat: { label: 'Tactical Threat', color: 'bg-red-500/20 text-red-400' },
  sacrifice: { label: 'Sacrifice', color: 'bg-pink-500/20 text-pink-400' },
  prophylaxis: { label: 'Prophylaxis', color: 'bg-indigo-500/20 text-indigo-400' },
  space_advantage: { label: 'Space', color: 'bg-teal-500/20 text-teal-400' },
};

export function OpeningExplanationPanel({ node, opening }: OpeningExplanationPanelProps) {
  // Starting position — show opening overview
  if (!node) {
    return (
      <div className="bg-[#1e1f2e] rounded-lg border border-gray-700/50 p-4 flex-1 overflow-y-auto">
        <h3 className="text-lg font-bold text-white mb-2">{opening.name}</h3>
        <p className="text-sm text-gray-300 leading-relaxed mb-4">{opening.description}</p>

        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Key Ideas
          </h4>
          <ul className="space-y-1.5">
            {opening.keyIdeas.map((idea, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-green-400 mt-0.5 shrink-0">&#x2713;</span>
                {idea}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Common Mistakes
          </h4>
          <ul className="space-y-1.5">
            {opening.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-red-400 mt-0.5 shrink-0">&#x2717;</span>
                {mistake}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-gray-500 italic mt-4">
          Press the right arrow key or click Next to start exploring moves.
        </p>
      </div>
    );
  }

  // Format move label: e.g. "3. Bc4" or "3... Bc5"
  const moveLabel =
    node.color === 'w'
      ? `${Math.ceil(node.moveNumber / 2)}. ${node.san}`
      : `${Math.ceil(node.moveNumber / 2)}... ${node.san}`;

  return (
    <div className="bg-[#1e1f2e] rounded-lg border border-gray-700/50 p-4 flex-1 overflow-y-auto">
      {/* Move header */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`w-4 h-4 rounded-full shrink-0 border ${
            node.color === 'w'
              ? 'bg-white border-gray-300'
              : 'bg-gray-800 border-gray-500'
          }`}
        />
        <span className="text-lg font-bold text-white">{moveLabel}</span>
        {node.branchLabel && (
          <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-medium">
            {node.branchLabel}
          </span>
        )}
      </div>

      {/* Concept tags */}
      {node.concepts.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {node.concepts.map(concept => {
            const meta = CONCEPT_LABELS[concept];
            return (
              <span
                key={concept}
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${meta.color}`}
              >
                {meta.label}
              </span>
            );
          })}
        </div>
      )}

      {/* Main explanation */}
      <p className="text-sm text-gray-300 leading-relaxed mb-3">{node.explanation}</p>

      {/* Strategic idea box */}
      {node.strategicIdea && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-sm">&#128161;</span>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Strategic Idea
            </span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{node.strategicIdea}</p>
        </div>
      )}

      {/* Watch out box */}
      {node.watchOutFor && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-sm">&#9888;&#65039;</span>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Watch Out
            </span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{node.watchOutFor}</p>
        </div>
      )}
    </div>
  );
}
