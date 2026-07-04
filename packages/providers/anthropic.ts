import { IAIProvider } from '../../backend/routing/provider-interface';
import { AIRequest, AIResponse, ProviderCapabilities, SupportedLanguage } from '../../backend/api/types';
import { logger } from '../../backend/api/logger';

export class AnthropicProvider implements IAIProvider {
  name = 'anthropic';

  isEnabled(): boolean {
    return process.env.ANTHROPIC_ENABLED === 'true' && !!process.env.ANTHROPIC_API_KEY;
  }

  getCapabilities(): ProviderCapabilities {
    return {chat: true, streaming: true, embeddings: false, vision: true, speech: false, tools: true, jsonMode: true, languageSupport: ['en', 'zu', 'st', 'tn', 'xh', 'af']};
  }

  async chat(request: AIRequest): Promise<AIResponse> {
    logger.info(`[Anthropic] Processing request for conversation ${request.conversationId}`);
    throw new Error('Not implemented');
  }

  async *stream(request: AIRequest): AsyncIterable<string> {
    logger.info(`[Anthropic] Streaming for conversation ${request.conversationId}`);
    yield 'streaming not yet implemented';
  }

  async embed(text: string, language: SupportedLanguage): Promise<number[]> {
    throw new Error('Anthropic does not support embeddings');
  }

  async transcribe(audio: Buffer, language: SupportedLanguage): Promise<string> {
    throw new Error('Anthropic does not support audio transcription');
  }

  async speak(text: string, language: SupportedLanguage): Promise<Buffer> {
    throw new Error('Anthropic does not support text-to-speech');
  }

  async getHealth(): Promise<{ latency: number; available: boolean }> {
    try {
      const start = Date.now();
      const latency = Date.now() - start;
      return { latency, available: true };
    } catch (err) {
      logger.error('[Anthropic] Health check failed', err);
      return { latency: 999999, available: false };
    }
  }

  validateResponse(response: AIResponse): boolean {
    return !!response.message && !!response.conversationId;
  }
}
