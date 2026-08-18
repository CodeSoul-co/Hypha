# `@codesoul-co/hypha-serving-cache` / `middleware/llm-cache-middleware`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Package guide: [learning and composition guide](/packages/serving-cache)
- Source: [`packages/serving-cache/src/middleware/llm-cache-middleware.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/middleware/llm-cache-middleware.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CachedLLMProvider` | class | <code>new CachedLLMProvider(inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;, cache: ServingCacheManager, options?: CachedLLMProviderOptions): CachedLLMProvider</code> | Runtime implementation for Cached LLM Provider; see its public constructor and members below. |
| `requestHashForModelRequest` | function | <code>requestHashForModelRequest(request: ModelRequest): string</code> | Public runtime operation for request Hash For Model Request. |
| `servingCacheResponseMetadata` | function | <code>servingCacheResponseMetadata(response: ModelResponse): Record&lt;string, unknown&gt; &#124; undefined</code> | Public runtime operation for serving Cache Response Metadata. |

## `CachedLLMProvider` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): ReturnType&lt;ModelProvider["capabilities"]&gt;</code> | Public runtime operation for capabilities. |
| `constructor` | constructor | <code>(inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;, cache: ServingCacheManager, options?: CachedLLMProviderOptions): CachedLLMProvider</code> | Creates an instance of this class. |
| `countTokens` | method | <code>countTokens(input: unknown): Promise&lt;ModelUsage&gt;</code> | Public runtime operation for count Tokens. |
| `generate` | method | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | Public runtime operation for generate. |
| `id` | property | <code>id: string</code> | Public id property. |
| `stream` | method | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | Public runtime operation for stream. |
