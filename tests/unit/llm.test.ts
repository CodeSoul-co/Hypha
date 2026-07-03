import { ClaudeAdapter } from '../../apps/server/src/core/llm/adapters/ClaudeAdapter';
import {
  createLLMManagerModelProvider,
  LLMManager,
} from '../../apps/server/src/core/llm/LLMFactory';
import type {
  ChatResponse,
  ILLMAdapter,
  LLMMessage,
  ModelInfo,
  StreamChunk,
  ToolDefinition,
} from '../../apps/server/src/core/llm/types';

describe('LLM Adapters', () => {
  describe('ClaudeAdapter', () => {
    let adapter: ClaudeAdapter;

    beforeEach(() => {
      adapter = new ClaudeAdapter('test-api-key');
    });

    it('should create an instance', () => {
      expect(adapter).toBeDefined();
      expect(adapter.provider).toBe('anthropic');
    });

    it('should have correct name', () => {
      expect(adapter.name).toBe('ClaudeAdapter');
    });

    it('should list available models', async () => {
      const models = await adapter.listModels();
      expect(models).toBeDefined();
      expect(Array.isArray(models)).toBe(true);
      expect(models.length).toBeGreaterThan(0);
    });

    it('should get model info', async () => {
      const model = await adapter.getModel('claude-3-5-sonnet-20241022');
      expect(model).toBeDefined();
      expect(model?.id).toBe('claude-3-5-sonnet-20241022');
    });

    it('should return null for unknown model', async () => {
      const model = await adapter.getModel('unknown-model');
      expect(model).toBeNull();
    });

    it('should perform health check', async () => {
      // Without proper API key, health check should still work (client initialized)
      await adapter.initialize();
      const healthy = await adapter.healthCheck();
      expect(typeof healthy).toBe('boolean');
    });
  });

  describe('LLMManager defaults', () => {
    it('updates the default model when switching to a provider fallback', async () => {
      const manager = new LLMManager();
      const deepseekModels = [
        createModelInfo('deepseek-v4-flash', 'deepseek'),
        createModelInfo('deepseek-v4-pro', 'deepseek'),
      ];

      (manager as any).adapters.set('deepseek', createAdapter('deepseek', deepseekModels));
      (manager as any).providerDefaultModels.set('deepseek', 'deepseek-v4-flash');

      await manager.setDefaultProvider('deepseek');

      expect(manager.getDefaultProvider()).toBe('deepseek');
      expect(manager.getDefaultModel()).toBe('deepseek-v4-flash');
    });
  });

  describe('LLMManagerModelProvider facade', () => {
    it('normalizes server chat through the package ModelProvider contract', async () => {
      const manager = {
        getDefaultModel: () => 'default-chat',
        getProviderFromModel: () => 'deepseek',
        chat: jest.fn(async () => ({
          id: 'chat_1',
          model: 'default-chat',
          provider: 'deepseek',
          content: 'ok',
          role: 'assistant',
          finishReason: 'stop',
          usage: { inputTokens: 1, outputTokens: 1, totalTokens: 2 },
          raw: { id: 'raw_1' },
        })),
        streamChat: async function* () {
          yield { type: 'content', content: 'o' };
          yield { type: 'done', usage: { inputTokens: 1, outputTokens: 1, totalTokens: 2 } };
        },
      } as unknown as LLMManager;
      const provider = createLLMManagerModelProvider(manager);

      await expect(
        provider.generate({
          runId: 'run_1',
          stepId: 'step_1',
          modelAlias: 'default-chat',
          input: [{ role: 'user', content: 'hello' }],
        })
      ).resolves.toMatchObject({
        id: 'chat_1',
        content: 'ok',
        usage: { totalTokens: 2 },
      });
      expect(manager.chat).toHaveBeenCalledWith(
        [{ role: 'user', content: 'hello', name: undefined }],
        expect.objectContaining({ model: 'default-chat' })
      );
    });
  });
});

function createAdapter(provider: ModelInfo['provider'], models: ModelInfo[]): ILLMAdapter {
  return {
    name: `${provider}TestAdapter`,
    provider,
    async initialize(): Promise<void> {},
    async destroy(): Promise<void> {},
    async chat(): Promise<ChatResponse> {
      return {
        id: 'chat_test',
        model: models[0].id,
        provider,
        content: 'ok',
        role: 'assistant',
        finishReason: 'stop',
      };
    },
    async *streamChat(): AsyncGenerator<StreamChunk> {
      yield { type: 'done' };
    },
    async createToolCall(_messages: LLMMessage[], _tools: ToolDefinition[]): Promise<ChatResponse> {
      return this.chat();
    },
    async listModels(): Promise<ModelInfo[]> {
      return models;
    },
    async getModel(modelId: string): Promise<ModelInfo | null> {
      return models.find((model) => model.id === modelId) ?? null;
    },
    async healthCheck(): Promise<boolean> {
      return true;
    },
  };
}

function createModelInfo(id: string, provider: ModelInfo['provider']): ModelInfo {
  return {
    id,
    name: id,
    provider,
    displayName: id,
    description: '',
    contextWindow: 0,
    supportedFeatures: {
      streaming: true,
      toolCalling: true,
      vision: false,
    },
  };
}
