# `@codesoul-co/hypha-models` / `providers`

- Package index: [`@codesoul-co/hypha-models`](/api/models)
- Package guide: [learning and composition guide](/packages/models)
- Source: [`packages/models/src/providers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `FetchModelTransport` | class | <code>new FetchModelTransport(): FetchModelTransport</code> | Runtime implementation for Fetch Model Transport; see its public constructor and members below. |
| `OpenAICompatibleModelProvider` | class | <code>new OpenAICompatibleModelProvider(config: OpenAICompatibleProviderConfig): OpenAICompatibleModelProvider</code> | Runtime implementation for Open AI Compatible Model Provider; see its public constructor and members below. |
| `OpenAIModelProvider` | class | <code>new OpenAIModelProvider(config: Omit&lt;OpenAICompatibleProviderConfig, "type" &#124; "baseUrl"&gt; &amp; { baseUrl?: string; }): OpenAIModelProvider</code> | Runtime implementation for Open AI Model Provider; see its public constructor and members below. |
| `createDeepSeekProvider` | function | <code>createDeepSeekProvider(config: Omit&lt;OpenAICompatibleProviderConfig, "type" &#124; "baseUrl"&gt; &amp; { baseUrl?: string; }): OpenAICompatibleModelProvider</code> | Creates Deep Seek Provider at this module boundary. |
| `normalizeOpenAIChatResponse` | function | <code>normalizeOpenAIChatResponse(response: OpenAIChatCompletionResponse, context?: OpenAIChatCompletionNormalizationContext): ModelResponse</code> | Normalizes Open AI Chat Response at this module boundary. |
| `providerSpecFromConfig` | function | <code>providerSpecFromConfig(config: OpenAICompatibleProviderConfig): ModelProviderSpec</code> | Public runtime operation for provider Spec From Config. |
| `ModelTransport` | interface | <code>interface ModelTransport</code> | Field contract for Model Transport; see all contract members below. |
| `OpenAIChatCompletionResponse` | interface | <code>interface OpenAIChatCompletionResponse</code> | Field contract for Open AI Chat Completion Response; see all contract members below. |
| `OpenAICompatibleProviderConfig` | interface | <code>interface OpenAICompatibleProviderConfig</code> | Field contract for Open AI Compatible Provider Config; see all contract members below. |

## `FetchModelTransport` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): FetchModelTransport</code> | Creates an instance of this class. |
| `postJson` | method | <code>postJson&lt;TResponse&gt;(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | Public runtime operation for post Json. |
| `streamSse` | method | <code>streamSse(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;string&gt;</code> | Public runtime operation for stream Sse. |

## `OpenAICompatibleModelProvider` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): ModelCapabilities</code> | Public runtime operation for capabilities. |
| `constructor` | constructor | <code>(config: OpenAICompatibleProviderConfig): OpenAICompatibleModelProvider</code> | Creates an instance of this class. |
| `generate` | method | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | Public runtime operation for generate. |
| `id` | property | <code>id: string</code> | Public id property. |
| `stream` | method | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | Public runtime operation for stream. |

## `OpenAIModelProvider` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): ModelCapabilities</code> | Public runtime operation for capabilities. |
| `constructor` | constructor | <code>(config: Omit&lt;OpenAICompatibleProviderConfig, "type" &#124; "baseUrl"&gt; &amp; { baseUrl?: string; }): OpenAIModelProvider</code> | Creates an instance of this class. |
| `generate` | method | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | Public runtime operation for generate. |
| `id` | property | <code>id: string</code> | Public id property. |
| `stream` | method | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | Public runtime operation for stream. |

## `ModelTransport` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `postJson` | method | <code>postJson&lt;TResponse&gt;(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | Public runtime operation for post Json. |
| `streamSse` | method | <code>streamSse(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;string&gt;</code> | Public runtime operation for stream Sse. |

## `OpenAIChatCompletionResponse` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `choices` | property | <code>choices: { message?: { content?: string &#124; null; tool_calls?: Array&lt;{ id: string; function?: { name: string; arguments: string; }; }&gt;; }; finish_reason?: string &#124; null; }[]</code> | Public choices property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `model` | property | <code>model: string</code> | Public model property. |
| `usage` | property | <code>usage: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number; prompt_cache_hit_tokens?: number; prompt_cache_miss_tokens?: number; prompt_tokens_details?: { cached_tokens?: number; }; }</code> | Public usage property. |

## `OpenAICompatibleProviderConfig` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apiKey` | property | <code>apiKey: string</code> | Public api Key property. |
| `apiKeyEnv` | property | <code>apiKeyEnv: string</code> | Public api Key Env property. |
| `baseUrl` | property | <code>baseUrl: string</code> | Public base Url property. |
| `capabilities` | property | <code>capabilities: ModelCapabilities</code> | Public capabilities property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `providerModelByAlias` | property | <code>providerModelByAlias: Record&lt;string, string&gt;</code> | Public provider Model By Alias property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |
| `transport` | property | <code>transport: ModelTransport</code> | Public transport property. |
| `type` | property | <code>type: "openai" &#124; "openai-compatible"</code> | Public type property. |
