import { useState } from 'react';

interface LandingPageProps {
  onFetchGames: (username: string) => void;
  onPastePgn: (pgn: string) => void;
  onOpenOpenings: () => void;
  isLoading: boolean;
  error: string | null;
}

export function LandingPage({ onFetchGames, onPastePgn, onOpenOpenings, isLoading, error }: LandingPageProps) {
  const [activeTab, setActiveTab] = useState<'username' | 'pgn' | 'openings'>('username');
  const [username, setUsername] = useState('');
  const [pgn, setPgn] = useState('');

  const handleFetch = () => {
    if (username.trim()) {
      onFetchGames(username.trim());
    }
  };

  const handlePgn = () => {
    if (pgn.trim()) {
      onPastePgn(pgn.trim());
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Analyze Your Chess Game</h2>
          <p className="text-gray-400">
            Get a detailed walkthrough of your game with Stockfish-powered analysis
          </p>
        </div>

        <div className="bg-[#1e1f2e] rounded-xl border border-gray-700/50 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-700/50">
            <button
              onClick={() => setActiveTab('username')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'username'
                  ? 'text-green-400 border-b-2 border-green-400 bg-green-400/5'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Chess.com Username
            </button>
            <button
              onClick={() => setActiveTab('pgn')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'pgn'
                  ? 'text-green-400 border-b-2 border-green-400 bg-green-400/5'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Paste PGN
            </button>
            <button
              onClick={() => setActiveTab('openings')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'openings'
                  ? 'text-green-400 border-b-2 border-green-400 bg-green-400/5'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Learn Openings
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'username' && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Enter your Chess.com username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleFetch()}
                  placeholder="e.g. hikaru"
                  className="w-full bg-[#16171f] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={handleFetch}
                  disabled={!username.trim() || isLoading}
                  className="w-full mt-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
                >
                  {isLoading ? 'Fetching games...' : 'Fetch Games'}
                </button>
              </div>
            )}

            {activeTab === 'pgn' && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Paste your PGN
                </label>
                <textarea
                  value={pgn}
                  onChange={e => setPgn(e.target.value)}
                  placeholder={'[Event "Live Chess"]\n[White "player1"]\n[Black "player2"]\n\n1. e4 e5 2. Nf3 Nc6 ...'}
                  rows={8}
                  className="w-full bg-[#16171f] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors font-mono text-sm resize-none"
                />
                <button
                  onClick={handlePgn}
                  disabled={!pgn.trim()}
                  className="w-full mt-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Analyze Game
                </button>
              </div>
            )}

            {activeTab === 'openings' && (
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 2H5C3.9 2 3 2.9 3 4v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H5V4h14v16zM7 10h10v2H7zm0 4h7v2H7z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">Opening Trainer</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Master popular chess openings with interactive, move-by-move lessons.
                  Learn the ideas behind each move, explore variations, and understand key traps.
                </p>
                <button
                  onClick={onOpenOpenings}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Explore Openings
                </button>
              </div>
            )}

            {error && activeTab !== 'openings' && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
