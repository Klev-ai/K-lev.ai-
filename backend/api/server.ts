import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import { logger } from './logger';
import { setupProviders } from '../routing/provider-setup';
import { healthRouter } from './health';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

app.use('/health', healthRouter);

setupProviders().catch((err) => {
  logger.error('Provider setup failed', err);
  process.exit(1);
});

app.use((err: Error, req: Request, res: Response, next: Function) => {
  logger.error('Request error', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  logger.info(`K'lev.ai server running on port ${PORT}`);
});

export default app;
