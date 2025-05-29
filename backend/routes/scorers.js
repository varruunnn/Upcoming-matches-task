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

    const url = `https://api.football-data.org/v4/competitions/${competition}/scorers`;
    console.log('Fetching:', url);
    const data = await fetchFromFootballData(url);

    if (!data.scorers || !Array.isArray(data.scorers)) {
      return res.status(500).json({
        success: false,
        error: 'Unexpected response structure',
        raw: data
      });
    }

    const formatted = data.scorers.map((entry) => ({
      player: { id: entry.player.id, name: entry.player.name },
      team:   { id: entry.team.id, name: entry.team.name, crest: entry.team.crest },
      goals:  entry.numberOfGoals ?? entry.goals
    }));

    res.json({
      success: true,
      competition: data.competition?.name || competition,
      season: data.season?.currentMatchday || null,
      totalScorers: formatted.length,
      scorers: formatted
    });
  } catch (err) {
    console.error('GET /api/scorers error:', err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export default router;
