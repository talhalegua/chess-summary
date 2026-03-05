import type { VercelRequest, VercelResponse } from '@vercel/node';

const CHESSCOM_API = 'https://api.chess.com/pub';

const headers = {
  'User-Agent': 'ChessGameSummary/1.0',
  Accept: 'application/json',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { username } = req.query;

  if (!username || Array.isArray(username)) {
    res.status(400).json({ error: 'Invalid username' });
    return;
  }

  try {
    // Get the archive list
    const archivesResponse = await fetch(
      `${CHESSCOM_API}/player/${encodeURIComponent(username)}/games/archives`,
      { headers },
    );

    if (archivesResponse.status === 404) {
      res.status(404).json({ error: 'Player not found' });
      return;
    }

    if (!archivesResponse.ok) {
      throw new Error(`Archives request failed: ${archivesResponse.status}`);
    }

    const archivesData = await archivesResponse.json();
    const archives: string[] = archivesData.archives;

    if (!archives || archives.length === 0) {
      res.json({ games: [] });
      return;
    }

    // Fetch last 2 months of archives
    const recentArchives = archives.slice(-2);
    const allGames: any[] = [];

    for (const archiveUrl of recentArchives) {
      try {
        const gamesResponse = await fetch(archiveUrl, { headers });
        if (gamesResponse.ok) {
          const gamesData = await gamesResponse.json();
          if (gamesData.games) {
            allGames.push(...gamesData.games);
          }
        }
      } catch {
        // Skip failed archive fetches
      }
    }

    // Sort by end_time descending, return most recent 30
    const sortedGames = allGames
      .sort((a, b) => (b.end_time || 0) - (a.end_time || 0))
      .slice(0, 30)
      .map((game) => ({
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

    // Cache for 5 minutes
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    res.json({ games: sortedGames });
  } catch (error: any) {
    console.error('Error fetching games:', error.message);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
}
