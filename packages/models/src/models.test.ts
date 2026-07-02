import { describe, expect, it } from 'vitest';
import {
  MockModelProvider,
  ModelRegistry,
  OpenAICompatibleModelProvider,
  type ModelTransport,
} from './index';

describe('@hypha/models provider contracts', () => {
  it('routes normalized ModelRequest through provider abstraction', async () => {
    const registry = new ModelRegistry();
    const provider = new MockModelProvider();
    registry.register(provider);

    await expect(
      registry.get('mock')?.generate({
        runId: 'run_1',
        stepId: 'step_1',
        modelAlias: 'default-fast',
        input: [{ role: 'user', content: 'hello' }],
      })
    ).resolves.toMatchObject({
      id: 'run_1:step_1:mock-response',
      usage: { totalTokens: 0 },
    });
  });

  it('normalizes OpenAI-compatible responses and keeps aliases provider-neutral', async () => {
    const transport: ModelTransport = {
      postJson: async <TResponse>(_url: string, body: unknown): Promise<TResponse> =>
        ({
          id: 'chatcmpl_1',
          choices: [
            {
              message: {
                content: 'ok',
                tool_calls: [
                  {
                    id: 'call_1',
                    function: { name: 'search', arguments: '{"q":"hypha"}' },
                  },
                ],
              },
            },
          ],
          usage: { prompt_tokens: 2, completion_tokens: 1, total_tokens: 3 },
          body,
        }) as TResponse,
    };
    const provider = new OpenAICompatibleModelProvider({
      id: 'compatible',
      type: 'openai-compatible',
      baseUrl: 'https://example.invalid/v1',
      providerModelByAlias: { 'default-fast': 'provider-model-id' },
      transport,
    });

    await expect(
      provider.generate({
        runId: 'run_1',
        stepId: 'step_1',
        modelAlias: 'default-fast',
        input: [{ role: 'user', content: 'hello' }],
      })
    ).resolves.toMatchObject({
      content: 'ok',
      toolCalls: [{ id: 'call_1', toolId: 'search', arguments: { q: 'hypha' } }],
      usage: { totalTokens: 3 },
    });
  });
});
