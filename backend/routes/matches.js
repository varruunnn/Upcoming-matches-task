import express from 'express';
import { fetchFromFootballData } from '../utils/apiClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { competition, status, dateFrom, dateTo } = req.query;
    let url;

    if (competition) {
      const params = new URLSearchParams();
      if (status && status !== 'ALL') params.append('status', status);
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);

      url = `https://api.football-data.org/v4/competitions/${competition}/matches`;
      if ([...params].length) {
        url += `?${params.toString()}`;
      }
    } else {
      url = 'https://api.football-data.org/v4/matches';
    }

    console.log('📡 Fetching:', url);
    const data = await fetchFromFootballData(url);

    if (!data.matches || !Array.isArray(data.matches)) {
      return res.status(500).json({
        success: false,
        error: 'Unexpected response structure',
        raw: data
      });
    }
    let matches = data.matches;
    if (status === 'SCHEDULED' || !competition) {
      const now = new Date();
      matches = matches.filter((m) => new Date(m.utcDate) > now);
    }

    const formatted = matches.map((m) => ({
      id:            m.id,
      competition:   m.competition?.name || competition || null,
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
      totalMatchesReturned: formatted.length,
      matches: formatted
    });
  } catch (err) {
    console.error('GET /api/matches error:', err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export default router;
