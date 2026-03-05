import type { AnalyzedMove } from '../types';
import { CLASSIFICATION_COLORS } from '../utils/moveClassifier';

interface MoveFeedbackProps {
  move: AnalyzedMove | null;
}

export function MoveFeedback({ move }: MoveFeedbackProps) {
  if (!move) {
    return (
      <div className="bg-[#1e1f2e] rounded-lg border border-gray-700/50 p-4 flex-1">
        <p className="text-sm text-gray-500 italic">
          Navigate to a move to see detailed feedback and analysis.
        </p>
      </div>
    );
  }

  const feedback = move.feedback;
  const isError = ['inaccuracy', 'mistake', 'blunder'].includes(move.classification);
  const color = CLASSIFICATION_COLORS[move.classification];

  return (
    <div className="bg-[#1e1f2e] rounded-lg border border-gray-700/50 p-4 flex-1 overflow-y-auto">
      {/* Header: classification dot + headline */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm font-semibold text-white">
          {feedback.headline}
        </span>
      </div>

      {/* Main explanation */}
      <p className="text-sm text-gray-300 leading-relaxed mb-3">
        {feedback.explanation}
      </p>

      {/* Best move section (only for errors) */}
      {isError && feedback.bestMoveExplanation && (
        <div
          className="bg-[#16171f] rounded-lg p-3 mb-3 border-l-2"
          style={{ borderLeftColor: CLASSIFICATION_COLORS.best }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-semibold text-green-400">
              Better: {move.bestMoveSan}
            </span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            {feedback.bestMoveExplanation}
          </p>
          {feedback.pvDisplay && (
            <p className="text-xs text-gray-500 font-mono mt-2 bg-[#1e1f2e] rounded px-2 py-1">
              {feedback.pvDisplay}
            </p>
          )}
        </div>
      )}

      {/* PV display for good moves */}
      {!isError && feedback.pvDisplay && (
        <p className="text-xs text-gray-500 font-mono bg-[#16171f] rounded px-2 py-1 mb-2">
          Line: {feedback.pvDisplay}
        </p>
      )}

      {/* Material impact */}
      {feedback.materialImpact && (
        <div className="flex items-center gap-1.5 mt-2">
          <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-gray-500">
            {feedback.materialImpact}
          </p>
        </div>
      )}
    </div>
  );
}
