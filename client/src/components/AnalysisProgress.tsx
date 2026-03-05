interface AnalysisProgressProps {
  progress: number;
  currentMoveText: string;
  engineLoading: boolean;
}

export function AnalysisProgress({ progress, currentMoveText, engineLoading }: AnalysisProgressProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-gray-700 border-t-green-400 animate-spin" />

        {engineLoading ? (
          <>
            <h3 className="text-lg font-semibold text-white mb-2">Loading Stockfish Engine</h3>
            <p className="text-gray-400 text-sm">Downloading and initializing the chess engine...</p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-white mb-2">Analyzing Game</h3>
            <p className="text-gray-400 text-sm mb-4">{currentMoveText}</p>

            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-gray-500 text-xs mt-2">{progress}% complete</p>
          </>
        )}
      </div>
    </div>
  );
}
