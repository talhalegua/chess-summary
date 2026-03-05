import type { ChessComGame } from '../types';

interface GameSelectorProps {
  games: ChessComGame[];
  username: string;
  onSelectGame: (game: ChessComGame) => void;
  onBack: () => void;
}

function formatTimeControl(tc: string): string {
  const parts = tc.split('+');
  const base = parseInt(parts[0]);

  if (base < 180) return 'Bullet';
  if (base < 600) return 'Blitz';
  if (base < 1800) return 'Rapid';
  return 'Classical';
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getResultDisplay(
  game: ChessComGame,
  username: string,
): { text: string; color: string } {
  const lowerUser = username.toLowerCase();
  const isWhite = game.white.username.toLowerCase() === lowerUser;
  const playerResult = isWhite ? game.white.result : game.black.result;

  if (playerResult === 'win') return { text: 'Win', color: 'text-green-400' };
  if (playerResult === 'checkmated' || playerResult === 'resigned' || playerResult === 'timeout' || playerResult === 'abandoned')
    return { text: 'Loss', color: 'text-red-400' };
  return { text: 'Draw', color: 'text-yellow-400' };
}

export function GameSelector({ games, username, onSelectGame, onBack }: GameSelectorProps) {
  return (
    <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-white">
          Select a game for <span className="text-green-400">{username}</span>
        </h2>
      </div>

      <div className="grid gap-3">
        {games.map((game, i) => {
          const result = getResultDisplay(game, username);
          const isWhite = game.white.username.toLowerCase() === username.toLowerCase();
          const opponent = isWhite ? game.black : game.white;
          const playerRating = isWhite ? game.white.rating : game.black.rating;

          return (
            <button
              key={i}
              onClick={() => onSelectGame(game)}
              className="bg-[#1e1f2e] border border-gray-700/50 rounded-lg p-4 hover:border-green-400/50 hover:bg-[#232436] transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isWhite ? 'bg-white' : 'bg-gray-800 border border-gray-500'
                    }`}
                  />
                  <div>
                    <span className="text-white font-medium">
                      {opponent.username}
                    </span>
                    <span className="text-gray-500 ml-2">({opponent.rating})</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded">
                    {formatTimeControl(game.time_control)}
                  </span>
                  <span className={`font-bold ${result.color}`}>{result.text}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span>Your rating: {playerRating}</span>
                <span>{formatDate(game.end_time)}</span>
              </div>
            </button>
          );
        })}
      </div>

      {games.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          No games found for this player.
        </div>
      )}
    </div>
  );
}
