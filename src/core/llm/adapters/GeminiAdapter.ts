import { GoogleGenerativeAI } from '@google/generative-ai';
import { ILLMAdapter, ChatOptions, ChatResponse, LLMMessage, StreamChunk, ToolDefinition, ModelInfo } from '../types';
import { logger } from '../../../utils/logger';

export class GeminiAdapter implements ILLMAdapter {
  readonly name = 'GeminiAdapter';
  readonly provider = 'google';

  private client: GoogleGenerativeAI | null = null;
  private apiKey: string;
  private baseUrl: string;
  private timeout: number;

  constructor(apiKey: string, baseUrl?: string, timeout?: number) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || 'https://generativelanguage.googleapis.com';
    this.timeout = timeout || 60000;
  }

  async initialize(): Promise<void> {
    if (!this.client) {
      this.client = new GoogleGenerativeAI(this.apiKey);
      logger.info('GeminiAdapter initialized');
    }
  }

  async destroy(): Promise<void> {
    this.client = null;
    logger.info('GeminiAdapter destroyed');
  }

  async chat(messages: LLMMessage[], options?: ChatOptions): Promise<ChatResponse> {
    if (!this.client) {
      await this.initialize();
    }

    const modelId = options?.model || 'gemini-1.5-pro';
    const model = this.client!.getGenerativeModel({ model: modelId });

    // Convert messages to Gemini format
    const contents = this.convertMessages(messages);

    const generationConfig: any = {
      temperature: options?.temperature,
      maxOutputTokens: options?.maxTokens,
      topP: options?.topP,
      topK: options?.topK,
    };

    try {
      const requestParams: any = {
        contents,
        generationConfig,
        systemInstruction: options?.systemPrompt ? { parts: [{ text: options.systemPrompt }] } : undefined,
      };

      const result = await model.generateContent(requestParams);
      const response = result.response;

      return {
        id: `gemini-${Date.now()}`,
        model: modelId,
        provider: this.provider,
        content: response.text() || '',
        role: 'assistant',
        finishReason: 'stop',
        usage: {
          inputTokens: 0,
          outputTokens: 0,
          totalTokens: 0,
        },
        raw: response,
      };
    } catch (error: any) {
      logger.error('Gemini chat error:', error);
      throw new Error(`Gemini API error: ${error.message}`);
    }
  }

  async *streamChat(messages: LLMMessage[], options?: ChatOptions): AsyncGenerator<StreamChunk> {
    if (!this.client) {
      await this.initialize();
    }

    const modelId = options?.model || 'gemini-1.5-pro';
    const model = this.client!.getGenerativeModel({ model: modelId });

    const contents = this.convertMessages(messages);

    const generationConfig: any = {
      temperature: options?.temperature,
      maxOutputTokens: options?.maxTokens,
      topP: options?.topP,
      topK: options?.topK,
    };

    try {
      const requestParams: any = {
        contents,
        generationConfig,
        systemInstruction: options?.systemPrompt ? { parts: [{ text: options.systemPrompt }] } : undefined,
      };

      const result = await model.generateContentStream(requestParams);

      let fullContent = '';

      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          fullContent += text;
          yield { type: 'content', content: text };
        }
      }

      yield { type: 'done', content: fullContent };
    } catch (error: any) {
      logger.error('Gemini stream error:', error);
      yield { type: 'error', error: error.message };
    }
  }

  async createToolCall(messages: LLMMessage[], tools: ToolDefinition[], options?: ChatOptions): Promise<ChatResponse> {
    return this.chat(messages, { ...options, tools });
  }

  async listModels(): Promise<ModelInfo[]> {
    return [
      {
        id: 'gemini-2.0-flash',
        name: 'gemini-2.0-flash',
        provider: this.provider,
        displayName: 'Gemini 2.0 Flash',
        description: 'Latest fast model with enhanced capabilities',
        contextWindow: 1000000,
        supportedFeatures: {
          streaming: true,
          toolCalling: true,
          vision: true,
          functionCalling: true,
        },
      },
      {
        id: 'gemini-1.5-pro',
        name: 'gemini-1.5-pro',
        provider: this.provider,
        displayName: 'Gemini 1.5 Pro',
        description: 'Most capable model with large context',
        contextWindow: 1000000,
        supportedFeatures: {
          streaming: true,
          toolCalling: true,
          vision: true,
          functionCalling: true,
        },
        pricing: { input: 1.25, output: 5, currency: 'USD' },
      },
      {
        id: 'gemini-1.5-flash',
        name: 'gemini-1.5-flash',
        provider: this.provider,
        displayName: 'Gemini 1.5 Flash',
        description: 'Fast model with large context',
        contextWindow: 1000000,
        supportedFeatures: {
          streaming: true,
          toolCalling: true,
          vision: true,
          functionCalling: true,
        },
        pricing: { input: 0.075, output: 0.3, currency: 'USD' },
      },
    ];
  }

  async getModel(modelId: string): Promise<ModelInfo | null> {
    const models = await this.listModels();
    return models.find(m => m.id === modelId) || null;
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (!this.client) await this.initialize();
      return !!this.client;
    } catch {
      return false;
    }
  }

  private convertMessages(messages: LLMMessage[]): any[] {
    return messages
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));
  }
}
