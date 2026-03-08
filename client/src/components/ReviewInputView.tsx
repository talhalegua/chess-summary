import { useState } from 'react';

interface ReviewInputViewProps {
  onFetchGames: (username: string) => void;
  onPastePgn: (pgn: string) => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

export function ReviewInputView({ onFetchGames, onPastePgn, onBack, isLoading, error }: ReviewInputViewProps) {
  const [activeTab, setActiveTab] = useState<'username' | 'pgn'>('username');
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
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="bg-[#1e1f2e] border-b border-gray-700/50 px-6 py-3">
        <div className="flex items-center gap-4 max-w-lg mx-auto">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-white font-bold text-base">Review Game</h2>
        </div>
      </div>

      <div className="flex items-center justify-center p-4 mt-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Analyze Your Game</h2>
            <p className="text-gray-400 text-sm">
              Get a detailed walkthrough with Stockfish-powered analysis
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

              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
