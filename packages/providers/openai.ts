import { IAIProvider } from '../../backend/routing/provider-interface';
import { AIRequest, AIResponse, ProviderCapabilities, SupportedLanguage } from '../../backend/api/types';
import { logger } from '../../backend/api/logger';

export class OpenAIProvider implements IAIProvider {
  name = 'openai';

  isEnabled(): boolean {
    return process.env.OPENAI_ENABLED === 'true' && !!process.env.OPENAI_API_KEY;
  }

  getCapabilities(): ProviderCapabilities {
    return {chat: true, streaming: true, embeddings: true, vision: true, speech: false, tools: true, jsonMode: true, languageSupport: ['en', 'zu', 'st', 'tn', 'xh', 'af']};
  }

  async chat(request: AIRequest): Promise<AIResponse> {
    logger.info(`[OpenAI] Processing request for conversation ${request.conversationId}`);
    throw new Error('Not implemented');
  }

  async *stream(request: AIRequest): AsyncIterable<string> {
    logger.info(`[OpenAI] Streaming for conversation ${request.conversationId}`);
    yield 'streaming not yet implemented';
  }

  async embed(text: string, language: SupportedLanguage): Promise<number[]> {
    logger.info(`[OpenAI] Embedding text in ${language}`);
    return [];
  }

  async transcribe(audio: Buffer, language: SupportedLanguage): Promise<string> {
    logger.info(`[OpenAI] Transcribing audio in ${language}`);
    return '';
  }

  async speak(text: string, language: SupportedLanguage): Promise<Buffer> {
    logger.info(`[OpenAI] Synthesizing speech in ${language}`);
    return Buffer.alloc(0);
  }

  async getHealth(): Promise<{ latency: number; available: boolean }> {
    try {
      const start = Date.now();
      const latency = Date.now() - start;
      return { latency, available: true };
    } catch (err) {
      logger.error('[OpenAI] Health check failed', err);
      return { latency: 999999, available: false };
    }
  }

  validateResponse(response: AIResponse): boolean {
    return !!response.message && !!response.conversationId;
  }
}
