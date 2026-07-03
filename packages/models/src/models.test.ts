import { describe, expect, it } from 'vitest';
import {
  createDeepSeekProvider,
  MockModelProvider,
  ModelProviderError,
  ModelRegistry,
  ModelRouter,
  OpenAICompatibleModelProvider,
  modelAliasSpecDefinition,
  modelProviderSpecDefinition,
  modelRoutingSpecDefinition,
  modelSpecJsonSchemas,
  validateModelAliasSpec,
  validateModelProviderSpec,
  validateModelRoutingSpec,
  type ModelProvider,
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
      providerId: 'mock',
      model: 'default-fast',
      usage: { totalTokens: expect.any(Number) },
    });
  });

  it('streams and counts tokens through the deterministic mock provider', async () => {
    const provider = new MockModelProvider();
    const chunks = [];
    for await (const chunk of provider.stream!({
      runId: 'run_1',
      stepId: 'step_stream',
      modelAlias: 'default-fast',
      input: 'hello hypha',
    })) {
      chunks.push(chunk);
    }

    expect(chunks.map((chunk) => chunk.type)).toEqual(['delta', 'usage', 'done']);
    await expect(provider.countTokens!('hello hypha')).resolves.toMatchObject({
      totalTokens: 4,
    });
  });

  it('normalizes OpenAI-compatible responses and keeps aliases provider-neutral', async () => {
    const requests: Array<{ url: string; body: unknown }> = [];
    const transport: ModelTransport = {
      postJson: async <TResponse>(url: string, body: unknown): Promise<TResponse> => {
        requests.push({ url, body });
        return {
          id: 'chatcmpl_1',
          model: 'provider-model-id',
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
          usage: {
            prompt_tokens: 2,
            completion_tokens: 1,
            total_tokens: 3,
            prompt_tokens_details: { cached_tokens: 1 },
          },
          body,
        } as TResponse;
      },
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
        instructions: 'system instructions',
        input: [{ role: 'user', content: 'hello' }],
        cache: { prefixContent: 'cached prefix' },
        responseFormat: { type: 'object', properties: { ok: { type: 'boolean' } } },
        reasoning: { effort: 'medium' },
      })
    ).resolves.toMatchObject({
      providerId: 'compatible',
      model: 'provider-model-id',
      content: 'ok',
      toolCalls: [{ id: 'call_1', toolId: 'search', arguments: { q: 'hypha' } }],
      usage: { totalTokens: 3, cacheHitTokens: 1 },
    });
    expect(requests[0].url).toBe('https://example.invalid/v1/chat/completions');
    const requestBody = requests[0].body as {
      messages?: Array<{ role: string; content: string }>;
      response_format?: { type: string };
      reasoning_effort?: string;
    };
    expect(requestBody.messages?.[0]).toEqual({
      role: 'system',
      content: 'cached prefix\n\nsystem instructions',
    });
    expect(requestBody.response_format?.type).toBe('json_schema');
    expect(requestBody.reasoning_effort).toBe('medium');
  });

  it('normalizes OpenAI-compatible stream events', async () => {
    const transport: ModelTransport = {
      postJson: async () => ({}) as never,
      streamSse: async function* () {
        yield JSON.stringify({ choices: [{ delta: { content: 'he' } }] });
        yield JSON.stringify({
          choices: [
            {
              delta: {
                tool_calls: [
                  {
                    id: 'call_1',
                    function: { name: 'search', arguments: '{"q":"hypha"}' },
                  },
                ],
              },
            },
          ],
        });
        yield JSON.stringify({
          choices: [{ delta: { content: 'llo' }, finish_reason: 'stop' }],
          usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
        });
      },
    };
    const provider = new OpenAICompatibleModelProvider({
      id: 'compatible',
      type: 'openai-compatible',
      baseUrl: 'https://example.invalid/v1',
      providerModelByAlias: { 'default-fast': 'provider-model-id' },
      transport,
    });

    const chunks = [];
    for await (const chunk of provider.stream!({
      runId: 'run_1',
      stepId: 'step_stream',
      modelAlias: 'default-fast',
      input: [{ role: 'user', content: 'hello' }],
    })) {
      chunks.push(chunk);
    }

    expect(chunks).toEqual([
      { type: 'delta', content: 'he' },
      {
        type: 'tool_call',
        toolCall: { id: 'call_1', toolId: 'search', arguments: { q: 'hypha' } },
      },
      { type: 'delta', content: 'llo' },
      {
        type: 'usage',
        usage: { inputTokens: 1, outputTokens: 1, totalTokens: 2, cacheHitTokens: undefined },
      },
      {
        type: 'done',
        usage: { inputTokens: 1, outputTokens: 1, totalTokens: 2, cacheHitTokens: undefined },
      },
    ]);
  });

  it('normalizes provider errors for routing and retry decisions', async () => {
    const provider = new OpenAICompatibleModelProvider({
      id: 'compatible',
      type: 'openai-compatible',
      baseUrl: 'https://example.invalid/v1',
      providerModelByAlias: { 'default-fast': 'provider-model-id' },
      transport: {
        postJson: async () => {
          throw { response: { status: 429, data: { error: { message: 'rate limited' } } } };
        },
      },
    });

    await expect(
      provider.generate({
        runId: 'run_1',
        stepId: 'step_1',
        modelAlias: 'default-fast',
        input: [{ role: 'user', content: 'hello' }],
      })
    ).rejects.toMatchObject({
      code: 'MODEL_PROVIDER_RATE_LIMITED',
      retryable: true,
      message: 'rate limited',
    });
  });

  it('routes model aliases and falls back only for retryable provider failures', async () => {
    const registry = new ModelRegistry();
    const primary: ModelProvider = {
      id: 'primary',
      capabilities: () => ({ chat: true }),
      generate: async () => {
        throw new ModelProviderError({
          code: 'MODEL_PROVIDER_RATE_LIMITED',
          message: 'try fallback',
          providerId: 'primary',
          retryable: true,
        });
      },
    };
    const fallback: ModelProvider = {
      id: 'fallback',
      capabilities: () => ({ chat: true, streaming: true }),
      generate: async (request) => ({
        id: 'fallback_response',
        providerId: 'fallback',
        model: request.modelAlias,
        content: 'fallback',
        metadata: request.metadata,
      }),
    };
    registry.register(primary);
    registry.register(fallback);
    const router = new ModelRouter({
      registry,
      routing: {
        id: 'model.routing.test',
        version: '0.0.0',
        defaultAlias: 'default-chat',
        fallbackAliases: ['fallback-chat'],
        aliases: [
          {
            id: 'model.alias.default-chat',
            version: '0.0.0',
            alias: 'default-chat',
            providerId: 'primary',
            providerModel: 'primary-model',
          },
          {
            id: 'model.alias.fallback-chat',
            version: '0.0.0',
            alias: 'fallback-chat',
            providerId: 'fallback',
            providerModel: 'fallback-model',
          },
        ],
      },
    });

    await expect(
      router.generate({
        runId: 'run_1',
        stepId: 'step_1',
        modelAlias: 'default-chat',
        input: 'hello',
      })
    ).resolves.toMatchObject({
      providerId: 'fallback',
      model: 'fallback-model',
      metadata: {
        modelAlias: 'fallback-chat',
        providerId: 'fallback',
        providerModel: 'fallback-model',
      },
    });
  });

  it('creates DeepSeek as an OpenAI-compatible provider profile', async () => {
    const requests: Array<{ url: string; body: unknown }> = [];
    const provider = createDeepSeekProvider({
      id: 'deepseek',
      providerModelByAlias: { 'default-reasoning': 'provider-reasoning-model' },
      apiKey: 'test',
      transport: {
        postJson: async <TResponse>(url: string, body: unknown): Promise<TResponse> => {
          requests.push({ url, body });
          return {
            id: 'deepseek_1',
            model: 'provider-reasoning-model',
            choices: [{ message: { content: 'ok' } }],
            usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
          } as TResponse;
        },
      },
    });

    await expect(
      provider.generate({
        runId: 'run_1',
        stepId: 'step_1',
        modelAlias: 'default-reasoning',
        input: [{ role: 'user', content: 'hello' }],
      })
    ).resolves.toMatchObject({
      providerId: 'deepseek',
      model: 'provider-reasoning-model',
      content: 'ok',
    });
    expect(requests[0].url).toBe('https://api.deepseek.com/v1/chat/completions');
  });

  it('exports model provider, alias, and routing schemas with minimal examples', () => {
    expect(validateModelProviderSpec(modelProviderSpecDefinition.example).id).toBe(
      'provider.default'
    );
    expect(validateModelAliasSpec(modelAliasSpecDefinition.example).alias).toBe('default-chat');
    expect(validateModelRoutingSpec(modelRoutingSpecDefinition.example).defaultAlias).toBe(
      'default-chat'
    );
    expect(modelSpecJsonSchemas.ModelProviderSpec.required).toContain('type');
    expect(modelSpecJsonSchemas.ModelAliasSpec.required).toContain('providerModel');
    expect(modelSpecJsonSchemas.ModelRoutingSpec.required).toContain('aliases');
  });
});
