import express from 'express';

const router = express.Router();
router.get('/', (_req, res) => {
  res.json({
    status:      'OK',
    timestamp:   new Date().toISOString(),
    apiKeyPresent: !!process.env.API_KEY,
    endpoints: [
      '/api/matches',
      '/api/team-matches?teamId={id}&status={status}',
      '/api/standings?competition={code}',
      '/api/scorers?competition={code}'
    ]
  });
});

export default router;
