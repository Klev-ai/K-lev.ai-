import { registerProvider } from './provider-selector';
import { OpenAIProvider } from '../../packages/providers/openai';
import { GoogleProvider } from '../../packages/providers/google';
import { AnthropicProvider } from '../../packages/providers/anthropic';
import { LocalProvider } from '../../packages/providers/local';
import { logger } from '../api/logger';

export async function setupProviders(): Promise<void> {
  logger.info('Initializing AI providers...');
  if (process.env.OPENAI_ENABLED === 'true') registerProvider(new OpenAIProvider());
  if (process.env.GOOGLE_ENABLED === 'true') registerProvider(new GoogleProvider());
  if (process.env.ANTHROPIC_ENABLED === 'true') registerProvider(new AnthropicProvider());
  if (process.env.LOCAL_MODEL_ENABLED === 'true') registerProvider(new LocalProvider());
  logger.info('Providers initialized');
}
