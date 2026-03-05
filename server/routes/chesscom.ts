import { Router, Request, Response } from 'express';
import axios from 'axios';

export const chesscomRouter = Router();

const CHESSCOM_API = 'https://api.chess.com/pub';

const apiClient = axios.create({
  baseURL: CHESSCOM_API,
  headers: {
    'User-Agent': 'ChessGameSummary/1.0',
    'Accept': 'application/json',
  },
});

/**
 * GET /api/player/:username/games
 * Fetch recent games for a chess.com player (last 2 months).
 */
chesscomRouter.get('/player/:username/games', async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    // Get the archive list
    const archivesRes = await apiClient.get(`/player/${username}/games/archives`);
    const archives: string[] = archivesRes.data.archives;

    if (!archives || archives.length === 0) {
      res.json({ games: [] });
      return;
    }

    // Fetch last 2 months of archives
    const recentArchives = archives.slice(-2);
    const allGames: any[] = [];

    for (const archiveUrl of recentArchives) {
      try {
        const gamesRes = await apiClient.get(archiveUrl.replace(CHESSCOM_API, ''));
        if (gamesRes.data.games) {
          allGames.push(...gamesRes.data.games);
        }
      } catch {
        // Skip failed archive fetches
      }
    }

    // Sort by end_time descending, return most recent 30
    const sortedGames = allGames
      .sort((a, b) => (b.end_time || 0) - (a.end_time || 0))
      .slice(0, 30)
      .map(game => ({
        url: game.url,
        pgn: game.pgn,
        time_control: game.time_control,
        end_time: game.end_time,
        rated: game.rated,
        white: {
          username: game.white?.username || 'Unknown',
          rating: game.white?.rating || 0,
          result: game.white?.result || '',
        },
        black: {
          username: game.black?.username || 'Unknown',
          rating: game.black?.rating || 0,
          result: game.black?.result || '',
        },
      }));

    res.json({ games: sortedGames });
  } catch (error: any) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'Player not found' });
      return;
    }
    console.error('Error fetching games:', error.message);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});
