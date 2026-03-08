import type { OpeningDefinition } from '../../types/openings';
import { useOpeningPractice } from '../../hooks/useOpeningPractice';
import { PracticeBoardPanel } from './PracticeBoardPanel';

interface PracticeViewProps {
  opening: OpeningDefinition;
}

export function PracticeView({ opening }: PracticeViewProps) {
  const practice = useOpeningPractice(opening);
  const userColor = opening.playAs === 'white' ? 'w' : 'b';

  return (
    <div className="flex gap-4 flex-col lg:flex-row">
      {/* Left: Board */}
      <div className="shrink-0">
        <PracticeBoardPanel
          fen={practice.currentFen}
          orientation={opening.playAs}
          phase={practice.phase}
          path={practice.path}
          correctMoveArrow={practice.correctMoveArrow}
          mistakesOnCurrentMove={practice.mistakesOnCurrentMove}
          branchProgress={practice.branchProgress}
          branchTotal={practice.branchTotal}
          onPieceDrop={practice.attemptMove}
          userColor={userColor}
        />
      </div>

      {/* Right: Status panel */}
      <div className="flex-1 flex flex-col gap-3 min-h-[400px]">
        {/* Idle state — show start button */}
        {practice.phase === 'idle' && (
          <div className="bg-[#1e1f2e] rounded-lg border border-gray-700/50 p-6 text-center flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Practice Mode</h3>
            <p className="text-gray-400 text-sm mb-1">
              Play the correct moves for {opening.playAs}.
            </p>
            <p className="text-gray-400 text-sm mb-4">
              The computer will respond with the opponent's moves.
            </p>
            <div className="text-xs text-gray-500 mb-4">
              {practice.totalBranches} variation{practice.totalBranches !== 1 ? 's' : ''} to drill
            </div>
            <button
              onClick={practice.startPractice}
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Start Practice
            </button>
          </div>
        )}

        {/* Active practice states */}
        {practice.phase !== 'idle' && practice.phase !== 'all_complete' && (
          <>
            {/* Current branch info */}
            <div className="bg-[#1e1f2e] rounded-lg border border-gray-700/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Branch</span>
                  <span className="text-sm font-medium text-white">{practice.currentBranchLabel}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {practice.currentBranchIndex + 1} / {practice.totalBranches}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Accuracy:</span>
                  <span className={`font-medium ${
                    practice.accuracy >= 80 ? 'text-green-400' :
                    practice.accuracy >= 50 ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {practice.accuracy}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Mistakes:</span>
                  <span className="text-red-400 font-medium">{practice.totalMistakes}</span>
                </div>
              </div>
            </div>

            {/* Phase-specific status */}
            <div className="bg-[#1e1f2e] rounded-lg border border-gray-700/50 p-4 flex-1 flex flex-col items-center justify-center">
              {practice.phase === 'user_turn' && (
                <div className="text-center">
                  <div className="w-3 h-3 rounded-full mx-auto mb-2 bg-green-500 animate-pulse" />
                  <p className="text-white font-medium text-sm">Your turn</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Play the correct {opening.playAs} move
                  </p>
                </div>
              )}

              {practice.phase === 'computer_turn' && (
                <div className="text-center">
                  <div className="w-3 h-3 rounded-full mx-auto mb-2 bg-amber-500 animate-pulse" />
                  <p className="text-white font-medium text-sm">Opponent's turn</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Waiting for computer move...
                  </p>
                </div>
              )}

              {practice.phase === 'wrong_move' && (
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-red-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-red-400 font-medium text-sm">Wrong move!</p>
                  <p className="text-gray-400 text-xs mt-1">
                    The correct move is shown on the board. Try again.
                  </p>
                </div>
              )}

              {practice.phase === 'resetting' && (
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-red-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <p className="text-red-400 font-bold text-sm">Two mistakes!</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Restarting from the beginning...
                  </p>
                </div>
              )}

              {practice.phase === 'branch_complete' && (
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-green-400 font-bold text-base mb-1">Branch Complete!</p>
                  <p className="text-white text-sm font-medium mb-1">{practice.currentBranchLabel}</p>
                  <div className="flex items-center justify-center gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-500">Accuracy: </span>
                      <span className={`font-bold ${
                        practice.accuracy >= 80 ? 'text-green-400' :
                        practice.accuracy >= 50 ? 'text-amber-400' : 'text-red-400'
                      }`}>
                        {practice.accuracy}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Mistakes: </span>
                      <span className="text-red-400 font-bold">{practice.totalMistakes}</span>
                    </div>
                  </div>
                  {practice.currentBranchIndex < practice.totalBranches - 1 ? (
                    <button
                      onClick={practice.nextBranch}
                      className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
                    >
                      Next Variation →
                    </button>
                  ) : (
                    <button
                      onClick={practice.nextBranch}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
                    >
                      See Results
                    </button>
                  )}
                  <button
                    onClick={practice.restartBranch}
                    className="block mx-auto mt-2 text-gray-400 hover:text-white text-xs transition-colors"
                  >
                    Retry this branch
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* All complete */}
        {practice.phase === 'all_complete' && (
          <div className="bg-[#1e1f2e] rounded-lg border border-gray-700/50 p-6 text-center flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className="text-amber-400 font-bold text-xl mb-2">All Variations Complete!</h3>
            <p className="text-white text-base font-medium mb-4">{opening.name}</p>
            <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-xs">
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  practice.accuracy >= 80 ? 'text-green-400' :
                  practice.accuracy >= 50 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {practice.accuracy}%
                </div>
                <div className="text-xs text-gray-500">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{practice.completedBranches + 1}</div>
                <div className="text-xs text-gray-500">Branches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{practice.totalMistakes}</div>
                <div className="text-xs text-gray-500">Mistakes</div>
              </div>
            </div>
            <button
              onClick={() => {
                // Reset everything and restart from branch 0
                practice.restartBranch();
              }}
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
            >
              Practice Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
