import OpenAI from 'openai';
import { ILLMAdapter, ChatOptions, ChatResponse, LLMMessage, StreamChunk, ToolDefinition, ModelInfo } from '../types';
import { logger } from '../../../utils/logger';

export class OpenAIAdapter implements ILLMAdapter {
  readonly name = 'OpenAIAdapter';
  readonly provider = 'openai' as const;

  private client: OpenAI | null = null;
  private apiKey: string;
  private baseUrl: string;
  private timeout: number;

  constructor(apiKey: string, baseUrl?: string, timeout?: number) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || 'https://api.openai.com';
    this.timeout = timeout || 60000;
  }

  async initialize(): Promise<void> {
    this.client = new OpenAI({
      apiKey: this.apiKey,
      baseURL: this.baseUrl,
      timeout: this.timeout,
    });
    logger.info('OpenAIAdapter initialized');
  }

  async destroy(): Promise<void> {
    this.client = null;
    logger.info('OpenAIAdapter destroyed');
  }

  async chat(messages: LLMMessage[], options?: ChatOptions): Promise<ChatResponse> {
    if (!this.client) await this.initialize();

    const model = options?.model || 'gpt-4o';

    const openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
      name: msg.name,
    }));

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      model,
      messages: openaiMessages,
      temperature: options?.temperature,
      max_tokens: options?.maxTokens,
      top_p: options?.topP,
      stop: options?.stopSequences,
    };

    if (options?.tools && options.tools.length > 0) {
      params.tools = options.tools.map(tool => ({
        type: 'function' as const,
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.inputSchema,
        },
      }));
      if (options?.toolChoice) {
        params.tool_choice = options.toolChoice as any;
      }
    }

    try {
      const response = await this.client!.chat.completions.create(params);
      const choice = response.choices[0];

      const toolCalls = choice.message.tool_calls?.map(tc => ({
        id: tc.id,
        name: tc.function.name,
        input: JSON.parse(tc.function.arguments),
      }));

      return {
        id: response.id,
        model: response.model,
        provider: this.provider,
        content: choice.message.content || '',
        role: 'assistant',
        finishReason: (choice.finish_reason === 'length' ? 'length' : choice.finish_reason === 'tool_calls' ? 'tool_use' : choice.finish_reason) as 'stop' | 'length' | 'tool_use' | 'content_filter',
        usage: response.usage ? {
          inputTokens: response.usage.prompt_tokens,
          outputTokens: response.usage.completion_tokens,
          totalTokens: response.usage.total_tokens,
        } : undefined,
        toolCalls,
        raw: response,
      };
    } catch (error: any) {
      logger.error('OpenAI chat error:', error);
      throw new Error(`OpenAI API error: ${error.message}`);
    }
  }

  async *streamChat(messages: LLMMessage[], options?: ChatOptions): AsyncGenerator<StreamChunk> {
    if (!this.client) await this.initialize();

    const model = options?.model || 'gpt-4o';

    const openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
      name: msg.name,
    }));

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      model,
      messages: openaiMessages,
      temperature: options?.temperature,
      max_tokens: options?.maxTokens,
      top_p: options?.topP,
      stop: options?.stopSequences,
      stream: true,
    };

    if (options?.tools && options.tools.length > 0) {
      params.tools = options.tools.map(tool => ({
        type: 'function' as const,
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.inputSchema,
        },
      }));
    }

    try {
      const stream = await this.client!.chat.completions.create(params);
      let fullContent = '';
      const toolCalls: any[] = [];
      let finishReason: string | undefined;

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta;
        if (!delta) continue;

        if (delta.content) {
          fullContent += delta.content;
          yield { type: 'content', content: delta.content };
        }

        if (delta.tool_calls) {
          for (const tc of delta.tool_calls) {
            const existing = toolCalls.find(t => t.id === tc.id);
            if (existing) {
              existing.input += tc.function?.arguments || '';
            } else if (tc.function) {
              toolCalls.push({
                id: tc.id,
                name: tc.function.name,
                input: tc.function.arguments || '',
              });
            }
          }
        }

        if (chunk.choices[0]?.finish_reason) {
          finishReason = chunk.choices[0].finish_reason;
        }

        if (chunk.usage) {
          yield {
            type: 'done',
            usage: {
              inputTokens: chunk.usage.prompt_tokens,
              outputTokens: chunk.usage.completion_tokens,
              totalTokens: chunk.usage.total_tokens,
            },
            finishReason,
          };
        }
      }

      yield { type: 'done', content: fullContent, finishReason };
    } catch (error: any) {
      logger.error('OpenAI stream error:', error);
      yield { type: 'error', error: error.message };
    }
  }

  async createToolCall(messages: LLMMessage[], tools: ToolDefinition[], options?: ChatOptions): Promise<ChatResponse> {
    return this.chat(messages, { ...options, tools });
  }

  async listModels(): Promise<ModelInfo[]> {
    // Return predefined models since we can't list without API key
    return [
      {
        id: 'gpt-4o',
        name: 'gpt-4o',
        provider: this.provider,
        displayName: 'GPT-4o',
        description: 'Most capable model, multimodal',
        contextWindow: 128000,
        supportedFeatures: {
          streaming: true,
          toolCalling: true,
          vision: true,
          functionCalling: true,
        },
        pricing: { input: 5, output: 15, currency: 'USD' },
      },
      {
        id: 'gpt-4-turbo',
        name: 'gpt-4-turbo',
        provider: this.provider,
        displayName: 'GPT-4 Turbo',
        description: 'Fast and capable GPT-4 model',
        contextWindow: 128000,
        supportedFeatures: {
          streaming: true,
          toolCalling: true,
          vision: true,
          functionCalling: true,
        },
        pricing: { input: 10, output: 30, currency: 'USD' },
      },
      {
        id: 'gpt-3.5-turbo',
        name: 'gpt-3.5-turbo',
        provider: this.provider,
        displayName: 'GPT-3.5 Turbo',
        description: 'Fast and affordable',
        contextWindow: 16385,
        supportedFeatures: {
          streaming: true,
          toolCalling: true,
          vision: false,
          functionCalling: true,
        },
        pricing: { input: 0.5, output: 1.5, currency: 'USD' },
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
}
