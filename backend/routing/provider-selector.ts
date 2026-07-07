import { AIRequest, ProviderName, HealthMetrics } from '../api/types';
import { IAIProvider } from './provider-interface';
import { logger } from '../api/logger';

const providers: Map<ProviderName, IAIProvider> = new Map();

export function registerProvider(provider: IAIProvider): void {
  providers.set(provider.name as ProviderName, provider);
  logger.info(`Provider registered: ${provider.name}`);
}

export async function selectProvider(request: AIRequest): Promise<IAIProvider> {
  const available = Array.from(providers.values()).filter((p) => p.isEnabled());
  if (available.length === 0) throw new Error('No AI providers available');

  const health = await Promise.all(
    available.map(async (p) => ({provider: p, health: await p.getHealth()}))
  );

  const healthy = health.filter((h) => h.health.available);
  if (healthy.length === 0) throw new Error('All providers are unavailable');

  healthy.sort((a, b) => a.health.latency - b.health.latency);
  return healthy[0].provider;
}

export async function getProviderHealth(): Promise<Record<string, HealthMetrics>> {
  const metrics: Record<string, HealthMetrics> = {};

  for (const [name, provider] of providers) {
    try {
      const health = await provider.getHealth();
      metrics[name] = {
        latency: health.latency,
        availability: health.available ? 1 : 0,
        crashRate: 0,
        tokenCost: 0,
        knowledgeFreshness: 0,
        promptQuality: 0,
        timestamp: Date.now(),
      };
    } catch (err) {
      logger.error(`Health check failed for ${name}`, err);
      metrics[name] = {latency: 999999, availability: 0, crashRate: 1, tokenCost: 0, knowledgeFreshness: 0, promptQuality: 0, timestamp: Date.now()};
    }
  }

  return metrics;
}
