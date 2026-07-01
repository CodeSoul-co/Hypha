import Anthropic from '@anthropic-ai/sdk';
import { ILLMAdapter, ChatOptions, ChatResponse, LLMMessage, StreamChunk, ToolDefinition, ModelInfo } from '../types';
import { logger } from '../../../utils/logger';

export class ClaudeAdapter implements ILLMAdapter {
  readonly name = 'ClaudeAdapter';
  readonly provider = 'anthropic';

  private client: Anthropic | null = null;
  private apiKey: string;
  private baseUrl: string;
  private timeout: number;

  constructor(apiKey: string, baseUrl?: string, timeout?: number) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || 'https://api.anthropic.com';
    this.timeout = timeout || 60000;
  }

  async initialize(): Promise<void> {
    this.client = new Anthropic({
      apiKey: this.apiKey,
      baseURL: this.baseUrl,
      timeout: this.timeout,
    });
    logger.info('ClaudeAdapter initialized');
  }

  async destroy(): Promise<void> {
    this.client = null;
    logger.info('ClaudeAdapter destroyed');
  }

  async chat(messages: LLMMessage[], options?: ChatOptions): Promise<ChatResponse> {
    if (!this.client) await this.initialize();

    const model = options?.model || 'claude-3-5-sonnet-20241022';

    const anthropicMessages: Anthropic.MessageParam[] = messages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    const params: any = {
      model,
      messages: anthropicMessages,
      temperature: options?.temperature,
      max_tokens: options?.maxTokens || 4096,
      system: options?.systemPrompt,
      stop_sequences: options?.stopSequences,
    };

    if (options?.tools && options.tools.length > 0) {
      params.tools = options.tools.map(tool => ({
        name: tool.name,
        description: tool.description,
        input_schema: tool.inputSchema,
      }));
    }

    try {
      const response = await this.client!.messages.create(params);

      let content = '';
      const toolCalls: any[] = [];

      // Handle response content
      for (const block of response.content as any[]) {
        if (block.type === 'text') {
          content = block.text;
        } else if (block.type === 'tool_use') {
          toolCalls.push({
            id: block.id,
            name: block.name,
            input: block.input,
          });
        }
      }

      let finishReason: 'stop' | 'length' | 'tool_use' | 'content_filter' = 'stop';
      if (response.stop_reason === 'max_tokens') {
        finishReason = 'length';
      } else if ((response.stop_reason as string) === 'tool_use') {
        finishReason = 'tool_use';
      }

      return {
        id: response.id,
        model: response.model,
        provider: this.provider,
        content,
        role: 'assistant',
        finishReason,
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
          totalTokens: response.usage.input_tokens + response.usage.output_tokens,
        },
        toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
        raw: response,
      };
    } catch (error: any) {
      logger.error('Claude chat error:', error);
      throw new Error(`Claude API error: ${error.message}`);
    }
  }

  async *streamChat(messages: LLMMessage[], options?: ChatOptions): AsyncGenerator<StreamChunk> {
    if (!this.client) await this.initialize();

    const model = options?.model || 'claude-3-5-sonnet-20241022';

    const anthropicMessages: Anthropic.MessageParam[] = messages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    const params: any = {
      model,
      messages: anthropicMessages,
      temperature: options?.temperature,
      max_tokens: options?.maxTokens || 4096,
      system: options?.systemPrompt,
      stop_sequences: options?.stopSequences,
    };

    if (options?.tools && options.tools.length > 0) {
      params.tools = options.tools.map(tool => ({
        name: tool.name,
        description: tool.description,
        input_schema: tool.inputSchema,
      }));
    }

    try {
      const stream = await this.client!.messages.stream(params);
      let fullContent = '';
      let toolCalls: any[] = [];
      let finishReason: string | undefined;

      for await (const event of stream) {
        if (event.type === 'content_block_delta') {
          if ((event as any).delta?.type === 'text_delta') {
            const delta = (event as any).delta;
            fullContent += delta.text;
            yield {
              type: 'content',
              content: delta.text,
            };
          } else if ((event as any).delta?.type === 'input_json_delta') {
            const delta = (event as any).delta;
            const lastTool = toolCalls[toolCalls.length - 1];
            if (lastTool) {
              lastTool.input += delta.partial_json;
            }
          }
        } else if (event.type === 'content_block_start') {
          const block = event as any;
          if (block.content_block?.type === 'tool_use') {
            toolCalls.push({
              id: block.content_block.id,
              name: block.content_block.name,
              input: '',
            });
          }
        } else if (event.type === 'message_delta') {
          const deltaEvent = event as any;
          finishReason = deltaEvent.delta?.stop_reason || undefined;
          if (deltaEvent.usage) {
            yield {
              type: 'done',
              finishReason,
              usage: {
                inputTokens: deltaEvent.usage.input_tokens || 0,
                outputTokens: deltaEvent.usage.output_tokens || 0,
                totalTokens: (deltaEvent.usage.input_tokens || 0) + (deltaEvent.usage.output_tokens || 0),
              },
            };
          }
        }
      }

      yield {
        type: 'done',
        content: fullContent,
        finishReason,
      };
    } catch (error: any) {
      logger.error('Claude stream error:', error);
      yield { type: 'error', error: error.message };
    }
  }

  async createToolCall(messages: LLMMessage[], tools: ToolDefinition[], options?: ChatOptions): Promise<ChatResponse> {
    return this.chat(messages, { ...options, tools });
  }

  async listModels(): Promise<ModelInfo[]> {
    return [
      {
        id: 'claude-3-5-sonnet-20241022',
        name: 'claude-3-5-sonnet-20241022',
        provider: this.provider,
        displayName: 'Claude 3.5 Sonnet',
        description: 'Most intelligent model with excellent reasoning',
        contextWindow: 200000,
        supportedFeatures: {
          streaming: true,
          toolCalling: true,
          vision: true,
          functionCalling: true,
        },
        pricing: { input: 3, output: 15, currency: 'USD' },
      },
      {
        id: 'claude-3-5-haiku-20241022',
        name: 'claude-3-5-haiku-20241022',
        provider: this.provider,
        displayName: 'Claude 3.5 Haiku',
        description: 'Fast and affordable model',
        contextWindow: 200000,
        supportedFeatures: {
          streaming: true,
          toolCalling: true,
          vision: true,
          functionCalling: true,
        },
        pricing: { input: 0.8, output: 4, currency: 'USD' },
      },
      {
        id: 'claude-3-opus-20240229',
        name: 'claude-3-opus-20240229',
        provider: this.provider,
        displayName: 'Claude 3 Opus',
        description: 'Most powerful model for complex tasks',
        contextWindow: 200000,
        supportedFeatures: {
          streaming: true,
          toolCalling: true,
          vision: true,
          functionCalling: true,
        },
        pricing: { input: 15, output: 75, currency: 'USD' },
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
