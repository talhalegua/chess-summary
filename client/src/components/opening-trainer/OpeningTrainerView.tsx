import type { OpeningDefinition } from '../../types/openings';
import { useOpeningNavigation } from '../../hooks/useOpeningNavigation';
import { TrainerBoardPanel } from './TrainerBoardPanel';
import { OpeningExplanationPanel } from './OpeningExplanationPanel';
import { BranchNavigator } from './BranchNavigator';
import { OpeningMoveList } from './OpeningMoveList';

interface OpeningTrainerViewProps {
  opening: OpeningDefinition;
  onBack: () => void;
}

export function OpeningTrainerView({ opening, onBack }: OpeningTrainerViewProps) {
  const nav = useOpeningNavigation(opening);

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="bg-[#1e1f2e] border-b border-gray-700/50 px-6 py-3">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-white font-bold text-base">{opening.name}</h2>
            <span className="text-xs text-gray-500 font-mono">{opening.eco}</span>
            {!nav.isOnMainLine && (
              <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-medium">
                Side variation
              </span>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                opening.playAs === 'white'
                  ? 'bg-white border border-gray-300'
                  : 'bg-gray-800 border border-gray-500'
              }`}
              title={`Play as ${opening.playAs}`}
            />
            <span className="text-xs text-gray-500">Playing as {opening.playAs}</span>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Left: Board */}
          <div className="shrink-0">
            <TrainerBoardPanel
              fen={nav.currentFen}
              currentNode={nav.currentNode}
              orientation={opening.playAs}
              goForward={nav.goForward}
              goBack={nav.goBack}
              goToStart={nav.goToStart}
              canGoBack={nav.canGoBack}
              canGoForward={nav.canGoForward}
              currentIndex={nav.currentIndex}
              totalMainLineMoves={nav.totalMainLineMoves}
            />
          </div>

          {/* Right: Explanation + Move list + Branches */}
          <div className="flex-1 flex flex-col gap-3 min-h-[400px] max-h-[550px]">
            {/* Move list (compact) */}
            <div className="bg-[#1e1f2e] rounded-lg border border-gray-700/50 flex flex-col max-h-[120px]">
              <div className="px-3 py-1.5 border-b border-gray-700/50">
                <span className="text-xs text-gray-500">Moves</span>
              </div>
              <OpeningMoveList
                path={nav.path}
                currentIndex={nav.currentIndex}
                onMoveClick={nav.goToMove}
              />
            </div>

            {/* Branch navigator (conditional) */}
            <BranchNavigator
              branches={nav.nextBranches}
              breadcrumbs={nav.breadcrumbs}
              exploredBranches={nav.exploredBranches}
              isOnMainLine={nav.isOnMainLine}
              onSelectBranch={nav.selectBranch}
              onGoToMainLine={nav.goToMainLine}
              onGoToMove={nav.goToMove}
            />

            {/* Explanation panel (fills remaining space) */}
            <OpeningExplanationPanel
              node={nav.currentNode}
              opening={opening}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
