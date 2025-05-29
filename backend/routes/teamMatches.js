import express from 'express';
import { fetchFromFootballData } from '../utils/apiClient.js';

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const { teamId, status = 'SCHEDULED' } = req.query;
    if (!teamId) {
      return res.status(400).json({
        success: false,
        error: 'teamId query parameter is required'
      });
    }

    const params = new URLSearchParams();
    if (status && status !== 'ALL') {
      params.append('status', status);
    }

    let url = `https://api.football-data.org/v4/teams/${teamId}/matches`;
    if ([...params].length) {
      url += `?${params.toString()}`;
    }

    console.log('Fetching:', url);
    const data = await fetchFromFootballData(url);

    if (!data.matches || !Array.isArray(data.matches)) {
      return res.status(500).json({
        success: false,
        error: 'Unexpected response structure',
        raw: data
      });
    }

    const now = new Date();
    const filtered = data.matches
      .filter((m) => {
        if (status === 'SCHEDULED') {
          return new Date(m.utcDate) > now;
        }
        return true;
      })
      .map((m) => ({
        id:            m.id,
        competition:   m.competition?.name || null,
        matchday:      m.matchday || null,
        homeTeam:      m.homeTeam?.name || null,
        awayTeam:      m.awayTeam?.name || null,
        homeTeamCrest: m.homeTeam?.crest || null,
        awayTeamCrest: m.awayTeam?.crest || null,
        date:          m.utcDate,
        status:        m.status
      }));

    res.json({
      success: true,
      totalMatchesReceived: data.matches.length,
      totalMatchesReturned: filtered.length,
      matches: filtered
    });
  } catch (err) {
    console.error(' GET /api/team-matches error:', err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export default router;
