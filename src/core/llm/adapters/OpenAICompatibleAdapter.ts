import axios, { AxiosInstance } from 'axios';
import { ILLMAdapter, ChatOptions, ChatResponse, LLMMessage, StreamChunk, ToolDefinition, ModelInfo, LLMProvider } from '../types';
import { logger } from '../../../utils/logger';

export interface OpenAICompatibleConfig {
  name: string;
  /** Provider key used for tagging responses + token usage records (e.g. 'siliconflow', 'kimi'). */
  provider: LLMProvider;
  baseUrl: string;
  apiKey: string;
  timeout?: number;
  models?: string[];
  defaultModel?: string;
}

/**
 * OpenAI Compatible Adapter
 * Supports any API that follows OpenAI's chat completions format:
 * - Kimi (Moonshot)
 * - SiliconFlow
 * - Groq
 * - Together AI
 * - Anyscale
 * - Perplexity
 * - Fireworks AI
 * - etc.
 */
export class OpenAICompatibleAdapter implements ILLMAdapter {
  readonly name: string;
  readonly provider: LLMProvider;

  private client: AxiosInstance;
  private availableModels: string[];
  private defaultModelId: string;
  private config: OpenAICompatibleConfig;

  constructor(config: OpenAICompatibleConfig) {
    this.config = config;
    this.name = `${config.name}Adapter`;
    this.provider = config.provider;
    this.defaultModelId = config.defaultModel || config.models?.[0] || 'gpt-3.5-turbo';
    this.availableModels = config.models || [];

    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: config.timeout || 60000,
    });
  }

  async initialize(): Promise<void> {
    // Try to fetch available models if not provided
    if (this.availableModels.length === 0) {
      try {
        const response = await this.client.get('/models');
        this.availableModels = response.data.data?.map((m: any) => m.id) || [];
        logger.info(`${this.config.name} models loaded`, { count: this.availableModels.length });
      } catch (error) {
        logger.warn(`Failed to fetch models from ${this.config.name}, using defaults`);
        this.availableModels = [this.defaultModelId];
      }
    }
    logger.info(`${this.config.name} adapter initialized`);
  }

  async destroy(): Promise<void> {
    this.client = null as any;
    logger.info(`${this.config.name} adapter destroyed`);
  }

  async chat(messages: LLMMessage[], options?: ChatOptions): Promise<ChatResponse> {
    const model = options?.model || this.defaultModelId;

    const requestMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
      name: msg.name,
    }));

    try {
      const response = await this.client.post('/chat/completions', {
        model,
        messages: requestMessages,
        temperature: options?.temperature,
        max_tokens: options?.maxTokens,
        top_p: options?.topP,
        stop: options?.stopSequences,
        stream: false,
        tools: options?.tools?.map(tool => ({
          type: 'function',
          function: {
            name: tool.name,
            description: tool.description,
            parameters: tool.inputSchema,
          },
        })),
      });

      const data = response.data;
      const choice = data.choices[0];

      return {
        id: data.id || `compat-${Date.now()}`,
        model: data.model || model,
        provider: this.provider,
        content: choice.message.content || '',
        role: 'assistant',
        finishReason: (choice.finish_reason === 'length' ? 'length' :
                      choice.finish_reason === 'tool_calls' ? 'tool_use' :
                      choice.finish_reason) as any,
        usage: data.usage ? {
          inputTokens: data.usage.prompt_tokens,
          outputTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
          cacheHitTokens: data.usage.prompt_tokens_details?.cached_tokens ?? 0,
        } : undefined,
        toolCalls: choice.message.tool_calls?.map((tc: any) => ({
          id: tc.id,
          name: tc.function.name,
          input: JSON.parse(tc.function.arguments),
        })),
        raw: data,
      };
    } catch (error: any) {
      const msg = error?.response?.data?.error?.message
        || error?.response?.data?.message
        || error?.message
        || String(error);
      logger.error(`${this.config.name} chat error: ${msg}`);
      throw new Error(`${this.config.name} API error: ${msg}`);
    }
  }

  async *streamChat(messages: LLMMessage[], options?: ChatOptions): AsyncGenerator<StreamChunk> {
    const model = options?.model || this.defaultModelId;

    const requestMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    try {
      const response = await this.client.post('/chat/completions', {
        model,
        messages: requestMessages,
        temperature: options?.temperature,
        max_tokens: options?.maxTokens,
        top_p: options?.topP,
        stop: options?.stopSequences,
        stream: true,
      }, {
        responseType: 'stream',
      });

      let fullContent = '';
      let finishReason: string | undefined;

      const stream = response.data;

      for await (const chunk of stream) {
        try {
          const lines = chunk.toString().split('\n').filter((line: string) => line.trim() !== '');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6);
              if (dataStr === '[DONE]') continue;

              const data = JSON.parse(dataStr);
              const delta = data.choices?.[0]?.delta;

              if (delta?.content) {
                fullContent += delta.content;
                yield { type: 'content', content: delta.content };
              }

              if (data.choices?.[0]?.finish_reason) {
                finishReason = data.choices[0].finish_reason;
              }
            }
          }
        } catch {
          // Skip malformed JSON
        }
      }

      yield { type: 'done', content: fullContent, finishReason };
    } catch (error: any) {
      const msg = error?.response?.data?.error?.message
        || error?.response?.data?.message
        || error?.message
        || String(error);
      logger.error(`${this.config.name} stream error: ${msg}`);
      yield { type: 'error', error: msg };
    }
  }

  async createToolCall(messages: LLMMessage[], tools: ToolDefinition[], options?: ChatOptions): Promise<ChatResponse> {
    return this.chat(messages, { ...options, tools });
  }

  async listModels(): Promise<ModelInfo[]> {
    if (this.availableModels.length === 0) {
      return [{
        id: this.defaultModelId,
        name: this.defaultModelId,
        provider: this.provider,
        displayName: this.config.name,
        description: `OpenAI compatible model via ${this.config.name}`,
        contextWindow: 128000,
        supportedFeatures: {
          streaming: true,
          toolCalling: true,
          vision: false,
        },
      }];
    }

    return this.availableModels.map(id => ({
      id,
      name: id,
      provider: this.provider,
      displayName: id,
      description: `OpenAI compatible model via ${this.config.name}`,
      contextWindow: 128000,
      supportedFeatures: {
        streaming: true,
        toolCalling: true,
        vision: false,
      },
    }));
  }

  async getModel(modelId: string): Promise<ModelInfo | null> {
    const models = await this.listModels();
    return models.find(m => m.id === modelId) || null;
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.client.get('/models', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
