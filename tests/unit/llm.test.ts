import { ClaudeAdapter } from '../../apps/server/src/core/llm/adapters/ClaudeAdapter';
import { OpenAIAdapter } from '../../apps/server/src/core/llm/adapters/OpenAIAdapter';
import {
  createLLMManagerModelProvider,
  type LLMManager,
} from '../../apps/server/src/core/llm/LLMFactory';

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

  describe('OpenAIAdapter', () => {
    let adapter: OpenAIAdapter;

    beforeEach(() => {
      adapter = new OpenAIAdapter('test-api-key');
    });

    it('should create an instance', () => {
      expect(adapter).toBeDefined();
      expect(adapter.provider).toBe('openai');
    });

    it('should list available models', async () => {
      const models = await adapter.listModels();
      expect(models).toBeDefined();
      expect(Array.isArray(models)).toBe(true);
      expect(models.length).toBeGreaterThan(0);
    });

    it('should get model info', async () => {
      const model = await adapter.getModel('gpt-4o');
      expect(model).toBeDefined();
      expect(model?.id).toBe('gpt-4o');
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
