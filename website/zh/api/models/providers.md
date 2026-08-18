# `@codesoul-co/hypha-models` / `providers`

- 包索引: [`@codesoul-co/hypha-models`](/zh/api/models)
- 模块指南: [学习与组合说明](/zh/packages/models)
- 源码: [`packages/models/src/providers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `FetchModelTransport` | 类 | <code>new FetchModelTransport(): FetchModelTransport</code> | Fetch Model Transport 的运行时实现；公开构造函数与成员见下表。 |
| `OpenAICompatibleModelProvider` | 类 | <code>new OpenAICompatibleModelProvider(config: OpenAICompatibleProviderConfig): OpenAICompatibleModelProvider</code> | Open AI Compatible Model Provider 的运行时实现；公开构造函数与成员见下表。 |
| `OpenAIModelProvider` | 类 | <code>new OpenAIModelProvider(config: Omit&lt;OpenAICompatibleProviderConfig, "type" &#124; "baseUrl"&gt; &amp; { baseUrl?: string; }): OpenAIModelProvider</code> | Open AI Model Provider 的运行时实现；公开构造函数与成员见下表。 |
| `createDeepSeekProvider` | 函数 | <code>createDeepSeekProvider(config: Omit&lt;OpenAICompatibleProviderConfig, "type" &#124; "baseUrl"&gt; &amp; { baseUrl?: string; }): OpenAICompatibleModelProvider</code> | 创建 Deep Seek Provider。 |
| `normalizeOpenAIChatResponse` | 函数 | <code>normalizeOpenAIChatResponse(response: OpenAIChatCompletionResponse, context?: OpenAIChatCompletionNormalizationContext): ModelResponse</code> | 规范化 Open AI Chat Response。 |
| `providerSpecFromConfig` | 函数 | <code>providerSpecFromConfig(config: OpenAICompatibleProviderConfig): ModelProviderSpec</code> | provider Spec From Config 的公开运行时操作。 |
| `ModelTransport` | 接口 | <code>interface ModelTransport</code> | Model Transport 的字段契约；完整字段见下表。 |
| `OpenAIChatCompletionResponse` | 接口 | <code>interface OpenAIChatCompletionResponse</code> | Open AI Chat Completion Response 的字段契约；完整字段见下表。 |
| `OpenAICompatibleProviderConfig` | 接口 | <code>interface OpenAICompatibleProviderConfig</code> | Open AI Compatible Provider Config 的字段契约；完整字段见下表。 |

## `FetchModelTransport` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): FetchModelTransport</code> | 创建该类的实例。 |
| `postJson` | 方法 | <code>postJson&lt;TResponse&gt;(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | post Json 的公开运行时操作。 |
| `streamSse` | 方法 | <code>streamSse(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;string&gt;</code> | stream Sse 的公开运行时操作。 |

## `OpenAICompatibleModelProvider` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): ModelCapabilities</code> | capabilities 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(config: OpenAICompatibleProviderConfig): OpenAICompatibleModelProvider</code> | 创建该类的实例。 |
| `generate` | 方法 | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | generate 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `stream` | 方法 | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | stream 的公开运行时操作。 |

## `OpenAIModelProvider` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): ModelCapabilities</code> | capabilities 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(config: Omit&lt;OpenAICompatibleProviderConfig, "type" &#124; "baseUrl"&gt; &amp; { baseUrl?: string; }): OpenAIModelProvider</code> | 创建该类的实例。 |
| `generate` | 方法 | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | generate 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `stream` | 方法 | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | stream 的公开运行时操作。 |

## `ModelTransport` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `postJson` | 方法 | <code>postJson&lt;TResponse&gt;(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | post Json 的公开运行时操作。 |
| `streamSse` | 方法 | <code>streamSse(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;string&gt;</code> | stream Sse 的公开运行时操作。 |

## `OpenAIChatCompletionResponse` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `choices` | 属性 | <code>choices: { message?: { content?: string &#124; null; tool_calls?: Array&lt;{ id: string; function?: { name: string; arguments: string; }; }&gt;; }; finish_reason?: string &#124; null; }[]</code> | choices 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `model` | 属性 | <code>model: string</code> | model 字段。 |
| `usage` | 属性 | <code>usage: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number; prompt_cache_hit_tokens?: number; prompt_cache_miss_tokens?: number; prompt_tokens_details?: { cached_tokens?: number; }; }</code> | usage 字段。 |

## `OpenAICompatibleProviderConfig` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apiKey` | 属性 | <code>apiKey: string</code> | api Key 字段。 |
| `apiKeyEnv` | 属性 | <code>apiKeyEnv: string</code> | api Key Env 字段。 |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | base Url 字段。 |
| `capabilities` | 属性 | <code>capabilities: ModelCapabilities</code> | capabilities 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `providerModelByAlias` | 属性 | <code>providerModelByAlias: Record&lt;string, string&gt;</code> | provider Model By Alias 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |
| `transport` | 属性 | <code>transport: ModelTransport</code> | transport 字段。 |
| `type` | 属性 | <code>type: "openai" &#124; "openai-compatible"</code> | type 字段。 |
