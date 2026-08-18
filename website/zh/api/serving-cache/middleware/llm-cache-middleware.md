# `@codesoul-co/hypha-serving-cache` / `middleware/llm-cache-middleware`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 模块指南: [学习与组合说明](/zh/packages/serving-cache)
- 源码: [`packages/serving-cache/src/middleware/llm-cache-middleware.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/middleware/llm-cache-middleware.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CachedLLMProvider` | 类 | <code>new CachedLLMProvider(inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;, cache: ServingCacheManager, options?: CachedLLMProviderOptions): CachedLLMProvider</code> | Cached LLM Provider 的运行时实现；公开构造函数与成员见下表。 |
| `requestHashForModelRequest` | 函数 | <code>requestHashForModelRequest(request: ModelRequest): string</code> | request Hash For Model Request 的公开运行时操作。 |
| `servingCacheResponseMetadata` | 函数 | <code>servingCacheResponseMetadata(response: ModelResponse): Record&lt;string, unknown&gt; &#124; undefined</code> | serving Cache Response Metadata 的公开运行时操作。 |

## `CachedLLMProvider` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): ReturnType&lt;ModelProvider["capabilities"]&gt;</code> | capabilities 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;, cache: ServingCacheManager, options?: CachedLLMProviderOptions): CachedLLMProvider</code> | 创建该类的实例。 |
| `countTokens` | 方法 | <code>countTokens(input: unknown): Promise&lt;ModelUsage&gt;</code> | count Tokens 的公开运行时操作。 |
| `generate` | 方法 | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | generate 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `stream` | 方法 | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | stream 的公开运行时操作。 |
