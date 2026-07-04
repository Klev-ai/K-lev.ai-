import { Router, Request, Response } from 'express';
import { getProviderHealth } from '../routing/provider-selector';
import { logger } from './logger';

export const healthRouter = Router();

healthRouter.get('/', async (req: Request, res: Response) => {
  try {
    const health = await getProviderHealth();
    res.json({status: 'healthy', timestamp: new Date().toISOString(), providers: health});
  } catch (err) {
    logger.error('Health check failed', err);
    res.status(503).json({ status: 'unhealthy', error: String(err) });
  }
});
