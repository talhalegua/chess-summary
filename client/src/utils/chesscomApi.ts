import axios from 'axios';
import type { ChessComGame } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Fetch recent games for a chess.com user via our backend proxy.
 */
export async function fetchRecentGames(username: string): Promise<ChessComGame[]> {
  const response = await axios.get(`${API_BASE}/api/player/${encodeURIComponent(username)}/games`);
  return response.data.games;
}

/**
 * Parse opening name from PGN headers.
 */
export function parseOpeningFromPgn(pgn: string): string {
  // Try Opening header first (cleaner name)
  const openingMatch = pgn.match(/\[Opening "([^"]+)"\]/);
  if (openingMatch) return openingMatch[1];

  // Fall back to ECOUrl - extract last path segment and clean it
  const ecoMatch = pgn.match(/\[ECOUrl "[^"]*\/([^"/]+)"\]/);
  if (ecoMatch) {
    return ecoMatch[1]
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  return 'Unknown Opening';
}

/**
 * Parse result from PGN headers.
 */
export function parseResultFromPgn(pgn: string): string {
  const match = pgn.match(/\[Result "([^"]+)"\]/);
  return match ? match[1] : '*';
}

/**
 * Extract player info from PGN headers.
 */
export function parsePgnHeaders(pgn: string): Record<string, string> {
  const headers: Record<string, string> = {};
  const regex = /\[(\w+)\s+"([^"]*)"\]/g;
  let match;
  while ((match = regex.exec(pgn)) !== null) {
    headers[match[1]] = match[2];
  }
  return headers;
}
