import express from 'express';
import { fetchFromFootballData } from '../utils/apiClient.js';

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const { competition } = req.query;
    if (!competition) {
      return res.status(400).json({
        success: false,
        error: 'competition query parameter is required'
      });
    }

    const url = `https://api.football-data.org/v4/competitions/${competition}/standings`;
    console.log('Fetching:', url);
    const data = await fetchFromFootballData(url);

    if (!data.standings || !Array.isArray(data.standings)) {
      return res.status(500).json({
        success: false,
        error: 'Unexpected response structure',
        raw: data
      });
    }
    const totalTable =
      data.standings.find((s) => s.type === 'TOTAL') || data.standings[0];

    if (!totalTable || !Array.isArray(totalTable.table)) {
      return res.status(500).json({
        success: false,
        error: 'No table array in standings data',
        raw: data
      });
    }

    const formatted = totalTable.table.map((entry) => ({
      position:       entry.position,
      team:           { id: entry.team.id, name: entry.team.name, crest: entry.team.crest },
      playedGames:    entry.playedGames,
      won:            entry.won,
      draw:           entry.draw,
      lost:           entry.lost,
      points:         entry.points,
      goalsFor:       entry.goalsFor,
      goalsAgainst:   entry.goalsAgainst,
      goalDifference: entry.goalDifference
    }));

    res.json({
      success: true,
      competition: data.competition?.name || competition,
      season:
        data.season?.startDate && data.season?.endDate
          ? `${data.season.startDate} → ${data.season.endDate}`
          : null,
      totalEntries: formatted.length,
      standings: formatted
    });
  } catch (err) {
    console.error('GET /api/standings error:', err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export default router;
