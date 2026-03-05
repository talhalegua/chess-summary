import { useState, useCallback, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { GameSelector } from './components/GameSelector';
import { AnalysisView } from './components/AnalysisView';
import { AnalysisProgress } from './components/AnalysisProgress';
import { OpeningSelectView, OpeningTrainerView } from './components/opening-trainer';
import { useGameAnalysis } from './hooks/useGameAnalysis';
import { fetchRecentGames } from './utils/chesscomApi';
import type { AppView, ChessComGame, GameAnalysis, OpeningDefinition } from './types';

function App() {
  const [view, setView] = useState<AppView>('landing');
  const [username, setUsername] = useState('');
  const [games, setGames] = useState<ChessComGame[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [completedAnalysis, setCompletedAnalysis] = useState<GameAnalysis | null>(null);
  const [selectedOpening, setSelectedOpening] = useState<OpeningDefinition | null>(null);

  const {
    analysis,
    isAnalyzing,
    progress,
    currentMoveText,
    engineLoading,
    engineError,
    analysisError,
    startAnalysis,
  } = useGameAnalysis();

  // Track when analysis completes
  const prevAnalysisRef = useRef<GameAnalysis | null>(null);
  useEffect(() => {
    if (analysis && analysis !== prevAnalysisRef.current) {
      prevAnalysisRef.current = analysis;
      setCompletedAnalysis(analysis);
      setView('analysis');
    }
  }, [analysis]);

  const handleFetchGames = useCallback(async (user: string) => {
    setFetchLoading(true);
    setFetchError(null);
    setUsername(user);
    try {
      const fetchedGames = await fetchRecentGames(user);
      setGames(fetchedGames);
      setView('select-game');
    } catch (err: any) {
      if (err.response?.status === 404) {
        setFetchError(`Player "${user}" not found on chess.com`);
      } else {
        setFetchError('Failed to fetch games. Please check the username and try again.');
      }
    } finally {
      setFetchLoading(false);
    }
  }, []);

  const handleSelectGame = useCallback(
    (game: ChessComGame) => {
      if (!game.pgn) {
        setFetchError('This game has no PGN data.');
        return;
      }
      startAnalysis(game.pgn, username);
    },
    [startAnalysis, username],
  );

  const handlePastePgn = useCallback(
    (pgn: string) => {
      startAnalysis(pgn);
    },
    [startAnalysis],
  );

  const handleOpenOpenings = useCallback(() => {
    setView('opening-select');
  }, []);

  const handleSelectOpening = useCallback((opening: OpeningDefinition) => {
    setSelectedOpening(opening);
    setView('opening-trainer');
  }, []);

  const handleBackFromTrainer = useCallback(() => {
    setView('opening-select');
    setSelectedOpening(null);
  }, []);

  const handleGoHome = useCallback(() => {
    setView('landing');
    setCompletedAnalysis(null);
    setSelectedOpening(null);
    setGames([]);
    setFetchError(null);
    prevAnalysisRef.current = null;
  }, []);

  const handleBackToGames = useCallback(() => {
    setView('select-game');
    setCompletedAnalysis(null);
    prevAnalysisRef.current = null;
  }, []);

  // Show analyzing/loading states
  const showProgress = engineLoading || isAnalyzing;

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1b26]">
      <Header onLogoClick={handleGoHome} />

      {showProgress && (
        <AnalysisProgress
          progress={progress}
          currentMoveText={currentMoveText}
          engineLoading={engineLoading}
        />
      )}

      {engineError && !showProgress && view === 'landing' && (
        <div className="mx-auto mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm max-w-lg text-center">
          Engine error: {engineError}
        </div>
      )}

      {!showProgress && view === 'landing' && (
        <LandingPage
          onFetchGames={handleFetchGames}
          onPastePgn={handlePastePgn}
          onOpenOpenings={handleOpenOpenings}
          isLoading={fetchLoading}
          error={fetchError || analysisError}
        />
      )}

      {!showProgress && view === 'select-game' && (
        <GameSelector
          games={games}
          username={username}
          onSelectGame={handleSelectGame}
          onBack={handleGoHome}
        />
      )}

      {!showProgress && view === 'analysis' && completedAnalysis && (
        <AnalysisView
          analysis={completedAnalysis}
          onBack={games.length > 0 ? handleBackToGames : handleGoHome}
        />
      )}

      {!showProgress && view === 'opening-select' && (
        <OpeningSelectView
          onSelectOpening={handleSelectOpening}
          onBack={handleGoHome}
        />
      )}

      {!showProgress && view === 'opening-trainer' && selectedOpening && (
        <OpeningTrainerView
          opening={selectedOpening}
          onBack={handleBackFromTrainer}
        />
      )}
    </div>
  );
}

export default App;
