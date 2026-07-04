import { AIRequest, AIResponse, ProviderCapabilities, SupportedLanguage } from '../api/types';

export interface IAIProvider {
  name: string;
  isEnabled(): boolean;
  getCapabilities(): ProviderCapabilities;
  chat(request: AIRequest): Promise<AIResponse>;
  stream(request: AIRequest): AsyncIterable<string>;
  embed(text: string, language: SupportedLanguage): Promise<number[]>;
  transcribe(audio: Buffer, language: SupportedLanguage): Promise<string>;
  speak(text: string, language: SupportedLanguage): Promise<Buffer>;
  getHealth(): Promise<{ latency: number; available: boolean }>;
  validateResponse(response: AIResponse): boolean;
}
