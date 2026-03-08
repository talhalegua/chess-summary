interface LandingPageProps {
  onReviewGame: () => void;
  onOpenOpenings: () => void;
}

export function LandingPage({ onReviewGame, onOpenOpenings }: LandingPageProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Chess Summary</h2>
          <p className="text-gray-400">
            Analyze your games and master popular openings
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Review Game Card */}
          <button
            onClick={onReviewGame}
            className="group bg-[#1e1f2e] rounded-xl border border-gray-700/50 p-6 text-left hover:border-green-500/50 hover:bg-[#1e1f2e]/80 transition-all"
          >
            <div className="w-12 h-12 mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Review Game</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Get a detailed Stockfish-powered walkthrough of your game with move-by-move analysis.
            </p>
          </button>

          {/* Openings Card */}
          <button
            onClick={onOpenOpenings}
            className="group bg-[#1e1f2e] rounded-xl border border-gray-700/50 p-6 text-left hover:border-amber-500/50 hover:bg-[#1e1f2e]/80 transition-all"
          >
            <div className="w-12 h-12 mb-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 2H5C3.9 2 3 2.9 3 4v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H5V4h14v16zM7 10h10v2H7zm0 4h7v2H7z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Openings</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Learn and practice popular chess openings with interactive lessons and drilling exercises.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
