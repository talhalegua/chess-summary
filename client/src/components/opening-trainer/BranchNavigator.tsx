import type { OpeningMoveNode } from '../../types/openings';
import type { Breadcrumb } from '../../hooks/useOpeningNavigation';

interface BranchNavigatorProps {
  branches: OpeningMoveNode[];
  breadcrumbs: Breadcrumb[];
  exploredBranches: Set<string>;
  isOnMainLine: boolean;
  onSelectBranch: (nodeId: string) => void;
  onGoToMainLine: () => void;
  onGoToMove: (index: number) => void;
}

export function BranchNavigator({
  branches,
  breadcrumbs,
  exploredBranches,
  isOnMainLine,
  onSelectBranch,
  onGoToMainLine,
  onGoToMove,
}: BranchNavigatorProps) {
  const hasBranches = branches.length > 1;
  const showBreadcrumbs = breadcrumbs.length > 1;

  if (!hasBranches && !showBreadcrumbs && isOnMainLine) {
    return null;
  }

  return (
    <div className="space-y-2">
      {/* Breadcrumbs */}
      {showBreadcrumbs && (
        <div className="flex items-center gap-1 flex-wrap">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-gray-600 text-xs">/</span>}
              <button
                onClick={() => onGoToMove(crumb.pathIndex)}
                className="text-xs text-gray-400 hover:text-green-400 transition-colors"
              >
                {crumb.label}
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Branch cards */}
      {hasBranches && (
        <div className="bg-[#1e1f2e] rounded-lg border border-gray-700/50 p-3">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Choose a variation
          </h4>
          <div className="space-y-2">
            {branches.map(branch => {
              const isExplored = exploredBranches.has(branch.id);
              const isMain = branch.isMainLine;

              return (
                <button
                  key={branch.id}
                  onClick={() => onSelectBranch(branch.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all hover:border-green-500/50 hover:bg-green-500/5 ${
                    isMain
                      ? 'border-green-500/30 bg-green-500/5'
                      : 'border-gray-700/50 bg-[#16171f]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-bold text-sm">{branch.san}</span>
                    {branch.branchLabel && (
                      <span className="text-xs text-gray-400">
                        {branch.branchLabel}
                      </span>
                    )}
                    {isMain && (
                      <span className="text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded font-medium ml-auto">
                        Main Line
                      </span>
                    )}
                    {isExplored && !isMain && (
                      <span className="text-xs text-gray-500 ml-auto">
                        &#10003; explored
                      </span>
                    )}
                  </div>
                  {branch.branchDescription && (
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {branch.branchDescription}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Return to main line button */}
      {!isOnMainLine && (
        <button
          onClick={onGoToMainLine}
          className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          Return to main line
        </button>
      )}
    </div>
  );
}
