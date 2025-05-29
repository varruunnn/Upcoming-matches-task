import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import matchesRouter     from './routes/matches.js';
import teamMatchesRouter from './routes/teamMatches.js';
import standingsRouter   from './routes/standings.js';
import scorersRouter     from './routes/scorers.js';
import healthRouter      from './routes/health.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/matches', matchesRouter);
app.use('/api/team-matches', teamMatchesRouter);
app.use('/api/standings', standingsRouter);
app.use('/api/scorers', scorersRouter);
app.use('/api/health', healthRouter);

app.listen(PORT, () => {
  console.log(`backend listening on http://localhost:${PORT}`);
});
