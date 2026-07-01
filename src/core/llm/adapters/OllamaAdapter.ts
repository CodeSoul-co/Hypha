import axios, { AxiosInstance } from 'axios';
import { ILLMAdapter, ChatOptions, ChatResponse, LLMMessage, StreamChunk, ToolDefinition, ModelInfo } from '../types';
import { logger } from '../../../utils/logger';

export class OllamaAdapter implements ILLMAdapter {
  readonly name = 'OllamaAdapter';
  readonly provider: 'ollama' = 'ollama';

  private client: AxiosInstance | null = null;
  private baseUrl: string;
  private timeout: number;
  private availableModels: string[] = [];

  constructor(baseUrl?: string, timeout?: number) {
    this.baseUrl = baseUrl || 'http://localhost:11434';
    this.timeout = timeout || 120000;
  }

  async initialize(): Promise<void> {
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
    });
    logger.info('OllamaAdapter initialized');
    await this.loadModels();
  }

  async destroy(): Promise<void> {
    this.client = null;
    this.availableModels = [];
    logger.info('OllamaAdapter destroyed');
  }

  private async loadModels(): Promise<void> {
    try {
      const response = await this.client!.get('/api/tags');
      this.availableModels = response.data.models?.map((m: any) => m.name) || [];
    } catch (error) {
      logger.warn('Failed to load Ollama models:', error);
    }
  }

  async chat(messages: LLMMessage[], options?: ChatOptions): Promise<ChatResponse> {
    if (!this.client) await this.initialize();

    const model = options?.model || this.availableModels[0] || 'llama2';

    const requestMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    try {
      const response = await this.client!.post('/api/chat', {
        model,
        messages: requestMessages,
        stream: false,
        options: {
          temperature: options?.temperature,
          num_predict: options?.maxTokens,
          top_p: options?.topP,
          stop: options?.stopSequences,
        },
      });

      const data = response.data;

      return {
        id: `ollama-${Date.now()}`,
        model: data.model || model,
        provider: this.provider,
        content: data.message?.content || '',
        role: 'assistant',
        finishReason: data.done ? 'stop' : 'length',
        usage: data.eval_count ? {
          inputTokens: data.prompt_eval_count || 0,
          outputTokens: data.eval_count || 0,
          totalTokens: (data.prompt_eval_count || 0) + (data.eval_count || 0),
        } : undefined,
        raw: data,
      };
    } catch (error: any) {
      logger.error('Ollama chat error:', error);
      throw new Error(`Ollama API error: ${error.message}`);
    }
  }

  async *streamChat(messages: LLMMessage[], options?: ChatOptions): AsyncGenerator<StreamChunk> {
    if (!this.client) await this.initialize();

    const model = options?.model || this.availableModels[0] || 'llama2';

    const requestMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    try {
      const response = await this.client!.post('/api/chat', {
        model,
        messages: requestMessages,
        stream: true,
        options: {
          temperature: options?.temperature,
          num_predict: options?.maxTokens,
          top_p: options?.topP,
          stop: options?.stopSequences,
        },
      }, {
        responseType: 'stream',
      });

      let fullContent = '';

      const stream = response.data;

      for await (const chunk of stream) {
        try {
          const data = JSON.parse(chunk.toString());
          if (data.message?.content) {
            fullContent += data.message.content;
            yield { type: 'content', content: data.message.content };
          }
          if (data.done) {
            yield {
              type: 'done',
              content: fullContent,
              finishReason: 'stop',
              usage: data.eval_count ? {
                inputTokens: data.prompt_eval_count || 0,
                outputTokens: data.eval_count || 0,
                totalTokens: (data.prompt_eval_count || 0) + (data.eval_count || 0),
              } : undefined,
            };
          }
        } catch (parseError) {
          logger.warn('Failed to parse Ollama stream chunk:', parseError);
        }
      }
    } catch (error: any) {
      logger.error('Ollama stream error:', error);
      yield { type: 'error', error: error.message };
    }
  }

  async createToolCall(messages: LLMMessage[], tools: ToolDefinition[], options?: ChatOptions): Promise<ChatResponse> {
    // Ollama has limited tool calling support
    // We'll simulate it with a regular chat
    logger.warn('Ollama does not natively support tool calling. Using regular chat.');
    return this.chat(messages, options);
  }

  async listModels(): Promise<ModelInfo[]> {
    if (!this.client) await this.initialize();

    const defaultModels: ModelInfo[] = [
      {
        id: 'llama2',
        name: 'llama2',
        provider: this.provider,
        displayName: 'Llama 2',
        description: 'General purpose model',
        contextWindow: 4096,
        supportedFeatures: {
          streaming: true,
          toolCalling: false,
          vision: false,
          functionCalling: false,
        },
      },
      {
        id: 'mistral',
        name: 'mistral',
        provider: this.provider,
        displayName: 'Mistral',
        description: 'Efficient and capable model',
        contextWindow: 8192,
        supportedFeatures: {
          streaming: true,
          toolCalling: false,
          vision: false,
          functionCalling: false,
        },
      },
      {
        id: 'codellama',
        name: 'codellama',
        provider: this.provider,
        displayName: 'Code Llama',
        description: 'Code generation and understanding',
        contextWindow: 16384,
        supportedFeatures: {
          streaming: true,
          toolCalling: false,
          vision: false,
          functionCalling: false,
        },
      },
    ];

    // Add any models discovered from Ollama
    const discoveredModels = this.availableModels.map(name => ({
      id: name,
      name,
      provider: this.provider,
      displayName: name,
      description: 'Discovered from Ollama',
      contextWindow: 4096,
      supportedFeatures: {
        streaming: true,
        toolCalling: false,
        vision: false,
        functionCalling: false,
      },
    })) as ModelInfo[];

    return [...defaultModels, ...discoveredModels];
  }

  async getModel(modelId: string): Promise<ModelInfo | null> {
    const models = await this.listModels();
    return models.find(m => m.id === modelId) || null;
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (!this.client) await this.initialize();
      await this.client!.get('/api/tags');
      return true;
    } catch {
      return false;
    }
  }
}
