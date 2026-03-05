import type { GameAnalysis } from '../types';
import { useMoveNavigation } from '../hooks/useMoveNavigation';
import { ChessBoardPanel } from './ChessBoardPanel';
import { MoveList } from './MoveList';
import { MoveFeedback } from './MoveFeedback';
import { EvalChart } from './EvalChart';
import { PhaseBreakdown } from './PhaseBreakdown';
import { GameNarrative } from './GameNarrative';

interface AnalysisViewProps {
  analysis: GameAnalysis;
  onBack: () => void;
}

export function AnalysisView({ analysis, onBack }: AnalysisViewProps) {
  const {
    currentIndex,
    currentMove,
    currentFen,
    goForward,
    goBack,
    goToStart,
    goToEnd,
    goToMove,
  } = useMoveNavigation(analysis.moves);

  const playerAccuracy =
    analysis.playerColor === 'w' ? analysis.whiteAccuracy : analysis.blackAccuracy;
  const opponentAccuracy =
    analysis.playerColor === 'w' ? analysis.blackAccuracy : analysis.whiteAccuracy;

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Game header */}
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
          <div className="flex items-center gap-3 flex-wrap">
            <PlayerTag
              name={analysis.whiteName}
              rating={analysis.whiteRating}
              color="white"
              accuracy={analysis.whiteAccuracy}
            />
            <span className="text-gray-500 text-sm font-mono">{analysis.result}</span>
            <PlayerTag
              name={analysis.blackName}
              rating={analysis.blackRating}
              color="black"
              accuracy={analysis.blackAccuracy}
            />
          </div>
          <div className="ml-auto text-xs text-gray-500">
            {analysis.opening} | {analysis.timeControl}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Left: Board */}
          <div className="shrink-0">
            <ChessBoardPanel
              fen={currentFen}
              currentMove={currentMove}
              orientation={analysis.playerColor === 'w' ? 'white' : 'black'}
              goForward={goForward}
              goBack={goBack}
              goToStart={goToStart}
              goToEnd={goToEnd}
            />
          </div>

          {/* Right: Move list + Feedback */}
          <div className="flex-1 flex flex-col gap-3 min-h-[400px] max-h-[500px]">
            {/* Move list */}
            <div className="bg-[#1e1f2e] rounded-lg border border-gray-700/50 flex flex-col min-h-[180px] max-h-[250px]">
              <div className="px-3 py-2 border-b border-gray-700/50 flex items-center justify-between">
                <span className="text-xs text-gray-500">Moves</span>
                <div className="flex gap-3 text-xs">
                  <span className="text-gray-400">
                    Your accuracy:{' '}
                    <span className="font-bold text-green-400">{playerAccuracy.toFixed(1)}%</span>
                  </span>
                  <span className="text-gray-400">
                    Opponent:{' '}
                    <span className="font-bold text-gray-300">{opponentAccuracy.toFixed(1)}%</span>
                  </span>
                </div>
              </div>
              <MoveList
                moves={analysis.moves}
                currentIndex={currentIndex}
                onMoveClick={goToMove}
                playerColor={analysis.playerColor}
              />
            </div>

            {/* Move Feedback */}
            <MoveFeedback move={currentMove} />
          </div>
        </div>

        {/* Bottom panels */}
        <div className="mt-4 space-y-4">
          <EvalChart
            moves={analysis.moves}
            currentIndex={currentIndex}
            onMoveClick={goToMove}
          />
          <PhaseBreakdown
            phases={analysis.phases}
            overallAccuracy={playerAccuracy}
          />
          <GameNarrative analysis={analysis} />
        </div>
      </div>
    </div>
  );
}

function PlayerTag({
  name,
  rating,
  color,
  accuracy,
}: {
  name: string;
  rating: number;
  color: 'white' | 'black';
  accuracy: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-3 h-3 rounded-full ${
          color === 'white' ? 'bg-white' : 'bg-gray-700 border border-gray-500'
        }`}
      />
      <span className="text-white font-medium text-sm">{name}</span>
      <span className="text-gray-500 text-xs">({rating})</span>
      <span className="text-green-400 text-xs font-medium">{accuracy.toFixed(1)}%</span>
    </div>
  );
}
