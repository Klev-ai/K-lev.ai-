import { IAIProvider } from '../../backend/routing/provider-interface';
import { AIRequest, AIResponse, ProviderCapabilities, SupportedLanguage } from '../../backend/api/types';
import { logger } from '../../backend/api/logger';

export class LocalProvider implements IAIProvider {
  name = 'local';

  isEnabled(): boolean {
    return process.env.LOCAL_MODEL_ENABLED === 'true';
  }

  getCapabilities(): ProviderCapabilities {
    return {chat: true, streaming: true, embeddings: true, vision: false, speech: false, tools: false, jsonMode: false, languageSupport: ['en', 'zu', 'af']};
  }

  async chat(request: AIRequest): Promise<AIResponse> {
    logger.info(`[Local] Processing request for conversation ${request.conversationId}`);
    throw new Error('Not implemented');
  }

  async *stream(request: AIRequest): AsyncIterable<string> {
    logger.info(`[Local] Streaming for conversation ${request.conversationId}`);
    yield 'streaming not yet implemented';
  }

  async embed(text: string, language: SupportedLanguage): Promise<number[]> {
    logger.info(`[Local] Embedding text in ${language}`);
    return [];
  }

  async transcribe(audio: Buffer, language: SupportedLanguage): Promise<string> {
    throw new Error('Local model does not support transcription');
  }

  async speak(text: string, language: SupportedLanguage): Promise<Buffer> {
    throw new Error('Local model does not support speech synthesis');
  }

  async getHealth(): Promise<{ latency: number; available: boolean }> {
    try {
      const start = Date.now();
      const latency = Date.now() - start;
      return { latency, available: true };
    } catch (err) {
      logger.error('[Local] Health check failed', err);
      return { latency: 999999, available: false };
    }
  }

  validateResponse(response: AIResponse): boolean {
    return !!response.message && !!response.conversationId;
  }
}
