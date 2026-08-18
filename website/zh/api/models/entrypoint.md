# `@codesoul-co/hypha-models` / `index`

- 包索引: [`@codesoul-co/hypha-models`](/zh/api/models)
- 模块指南: [学习与组合说明](/zh/packages/models)
- 源码: [`packages/models/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)
- 导出数: **36**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MockModelProvider` | 类 | <code>new MockModelProvider(id?: string): MockModelProvider</code> | Mock Model Provider 的运行时实现；公开构造函数与成员见下表。 |
| `ModelRegistry` | 类 | <code>new ModelRegistry(): ModelRegistry</code> | Model Registry 的运行时实现；公开构造函数与成员见下表。 |
| `modelAliasSpecDefinition` | 常量 | <code>const modelAliasSpecDefinition: SpecSchemaDefinition&lt;ModelAliasSpec&gt;</code> | model Alias Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `modelAliasSpecExample` | 常量 | <code>const modelAliasSpecExample: ModelAliasSpec</code> | model Alias Spec 的有效示例值。 |
| `modelAliasSpecJsonSchema` | 常量 | <code>const modelAliasSpecJsonSchema: JsonSchema</code> | model Alias Spec 的 JSON Schema。 |
| `modelAliasSpecSchema` | 常量 | <code>const modelAliasSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { alias: z.ZodString; providerId: z.ZodString; providerModel: z.ZodString; }, "strip...</code> | model Alias Spec 的运行时 Schema。 |
| `modelCapabilitiesSchema` | 常量 | <code>const modelCapabilitiesSchema: z.ZodObject&lt;{ chat: z.ZodOptional&lt;z.ZodBoolean&gt;; streaming: z.ZodOptional&lt;z.ZodBoolean&gt;; toolCalling: z.ZodOptional&lt;z.ZodBoolean&gt;; jsonMode: z.ZodOptional&lt;z.ZodBoolean&gt;; embeddings: z.ZodOptional&lt;z.ZodBoolean&gt;; reasoning: z.ZodOptional&lt;z.ZodBoolean&gt;; prefixCaching: z.ZodOptional&lt;z.ZodBoolean&gt;; kvCaching: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strip", z.ZodTypeAny, { chat?: boolean &#124; undefi...</code> | model Capabilities 的运行时 Schema。 |
| `modelProviderSpecDefinition` | 常量 | <code>const modelProviderSpecDefinition: SpecSchemaDefinition&lt;ModelProviderSpec&gt;</code> | model Provider Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `modelProviderSpecExample` | 常量 | <code>const modelProviderSpecExample: ModelProviderSpec</code> | model Provider Spec 的有效示例值。 |
| `modelProviderSpecJsonSchema` | 常量 | <code>const modelProviderSpecJsonSchema: JsonSchema</code> | model Provider Spec 的 JSON Schema。 |
| `modelProviderSpecSchema` | 常量 | <code>const modelProviderSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { type: z.ZodString; defaultModelAlias: z.ZodOptional&lt;z.ZodString&gt;; capabilities:...</code> | model Provider Spec 的运行时 Schema。 |
| `modelRequestSchema` | 常量 | <code>const modelRequestSchema: z.ZodObject&lt;{ runId: z.ZodString; stepId: z.ZodString; modelAlias: z.ZodString; instructions: z.ZodOptional&lt;z.ZodString&gt;; input: z.ZodUnknown; tools: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; name: z.ZodString; description: z.ZodString; inputSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; }, "strip", z.ZodTypeAny, { id: string; name: string; description: string; inp...</code> | model Request 的运行时 Schema。 |
| `modelRoutingSpecDefinition` | 常量 | <code>const modelRoutingSpecDefinition: SpecSchemaDefinition&lt;ModelRoutingSpec&gt;</code> | model Routing Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `modelRoutingSpecExample` | 常量 | <code>const modelRoutingSpecExample: ModelRoutingSpec</code> | model Routing Spec 的有效示例值。 |
| `modelRoutingSpecJsonSchema` | 常量 | <code>const modelRoutingSpecJsonSchema: JsonSchema</code> | model Routing Spec 的 JSON Schema。 |
| `modelRoutingSpecSchema` | 常量 | <code>const modelRoutingSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { defaultAlias: z.ZodString; aliases: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; ve...</code> | model Routing Spec 的运行时 Schema。 |
| `modelSpecDefinitions` | 常量 | <code>const modelSpecDefinitions: readonly [SpecSchemaDefinition&lt;ModelProviderSpec&gt;, SpecSchemaDefinition&lt;ModelAliasSpec&gt;, SpecSchemaDefinition&lt;ModelRoutingSpec&gt;]</code> | 由 `index` 模块导出的 model Spec Definitions 常量。 |
| `modelSpecJsonSchemas` | 常量 | <code>const modelSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 model Spec Json Schemas 常量。 |
| `validateModelAliasSpec` | 函数 | <code>validateModelAliasSpec(input: unknown): ModelAliasSpec</code> | 校验 Model Alias Spec。 |
| `validateModelProviderSpec` | 函数 | <code>validateModelProviderSpec(input: unknown): ModelProviderSpec</code> | 校验 Model Provider Spec。 |
| `validateModelRoutingSpec` | 函数 | <code>validateModelRoutingSpec(input: unknown): ModelRoutingSpec</code> | 校验 Model Routing Spec。 |
| `ModelAliasSpec` | 接口 | <code>interface ModelAliasSpec extends VersionedSpec, SpecMetadata</code> | Model Alias Spec 的字段契约；完整字段见下表。 |
| `ModelCacheControl` | 接口 | <code>interface ModelCacheControl</code> | Model Cache Control 的字段契约；完整字段见下表。 |
| `ModelCapabilities` | 接口 | <code>interface ModelCapabilities</code> | Model Capabilities 的字段契约；完整字段见下表。 |
| `ModelMessage` | 接口 | <code>interface ModelMessage</code> | Model Message 的字段契约；完整字段见下表。 |
| `ModelProvider` | 接口 | <code>interface ModelProvider</code> | Model Provider 的字段契约；完整字段见下表。 |
| `ModelProviderSpec` | 接口 | <code>interface ModelProviderSpec extends VersionedSpec, SpecMetadata</code> | Model Provider Spec 的字段契约；完整字段见下表。 |
| `ModelRequest` | 接口 | <code>interface ModelRequest</code> | Model Request 的字段契约；完整字段见下表。 |
| `ModelResponse` | 接口 | <code>interface ModelResponse</code> | Model Response 的字段契约；完整字段见下表。 |
| `ModelRoutingSpec` | 接口 | <code>interface ModelRoutingSpec extends VersionedSpec, SpecMetadata</code> | Model Routing Spec 的字段契约；完整字段见下表。 |
| `ModelStreamEvent` | 接口 | <code>interface ModelStreamEvent</code> | Model Stream Event 的字段契约；完整字段见下表。 |
| `ModelToolDescriptor` | 接口 | <code>interface ModelToolDescriptor</code> | Model Tool Descriptor 的字段契约；完整字段见下表。 |
| `ModelUsage` | 接口 | <code>interface ModelUsage</code> | Model Usage 的字段契约；完整字段见下表。 |
| `NormalizedToolCall` | 接口 | <code>interface NormalizedToolCall</code> | Normalized Tool Call 的字段契约；完整字段见下表。 |
| `ReasoningOptions` | 接口 | <code>interface ReasoningOptions</code> | Reasoning Options 的字段契约；完整字段见下表。 |
| `ModelProviderType` | 类型 | <code>type ModelProviderType = 'openai' &#124; 'openai-compatible' &#124; 'mock' &#124; string</code> | Model Provider Type 的公共类型别名。 |

## `MockModelProvider` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): ModelCapabilities</code> | capabilities 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(id?: string): MockModelProvider</code> | 创建该类的实例。 |
| `countTokens` | 方法 | <code>countTokens(input: unknown): Promise&lt;ModelUsage&gt;</code> | count Tokens 的公开运行时操作。 |
| `generate` | 方法 | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | generate 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `stream` | 方法 | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | stream 的公开运行时操作。 |

## `ModelRegistry` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): ModelRegistry</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(providerId: string): ModelProvider &#124; null</code> | 读取 get。 |
| `list` | 方法 | <code>list(): ModelProvider[]</code> | 列出 list。 |
| `register` | 方法 | <code>register(provider: ModelProvider): void</code> | 注册 register。 |

## `ModelAliasSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `alias` | 属性 | <code>alias: string</code> | alias 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerModel` | 属性 | <code>providerModel: string</code> | provider Model 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `ModelCacheControl` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `kvCacheRef` | 属性 | <code>kvCacheRef: { id: string; provider: string; modelAlias: string; scope: "run" &#124; "session" &#124; "workspace"; expiresAt?: string; metadata?: Record&lt;string, unknown&gt;; }</code> | kv Cache Ref 字段。 |
| `kvCacheValue` | 属性 | <code>kvCacheValue: unknown</code> | kv Cache Value 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `prefixContent` | 属性 | <code>prefixContent: string</code> | prefix Content 字段。 |

## `ModelCapabilities` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `chat` | 属性 | <code>chat: boolean</code> | chat 字段。 |
| `embeddings` | 属性 | <code>embeddings: boolean</code> | embeddings 字段。 |
| `jsonMode` | 属性 | <code>jsonMode: boolean</code> | json Mode 字段。 |
| `kvCaching` | 属性 | <code>kvCaching: boolean</code> | kv Caching 字段。 |
| `prefixCaching` | 属性 | <code>prefixCaching: boolean</code> | prefix Caching 字段。 |
| `reasoning` | 属性 | <code>reasoning: boolean</code> | reasoning 字段。 |
| `streaming` | 属性 | <code>streaming: boolean</code> | streaming 字段。 |
| `toolCalling` | 属性 | <code>toolCalling: boolean</code> | tool Calling 字段。 |

## `ModelMessage` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `role` | 属性 | <code>role: "system" &#124; "tool" &#124; "user" &#124; "assistant"</code> | role 字段。 |
| `toolCallId` | 属性 | <code>toolCallId: string</code> | tool Call Id 字段。 |

## `ModelProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): ModelCapabilities</code> | capabilities 的公开运行时操作。 |
| `countTokens` | 方法 | <code>countTokens(input: unknown): Promise&lt;ModelUsage&gt;</code> | count Tokens 的公开运行时操作。 |
| `generate` | 方法 | <code>generate(request: TRequest): Promise&lt;TResponse&gt;</code> | generate 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `stream` | 方法 | <code>stream(request: TRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | stream 的公开运行时操作。 |

## `ModelProviderSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apiKeyEnv` | 属性 | <code>apiKeyEnv: string</code> | api Key Env 字段。 |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | base Url 字段。 |
| `capabilities` | 属性 | <code>capabilities: ModelCapabilities</code> | capabilities 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `defaultModelAlias` | 属性 | <code>defaultModelAlias: string</code> | default Model Alias 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |
| `type` | 属性 | <code>type: string</code> | type 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `ModelRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cache` | 属性 | <code>cache: ModelCacheControl</code> | cache 字段。 |
| `input` | 属性 | <code>input: TInput</code> | input 字段。 |
| `instructions` | 属性 | <code>instructions: string</code> | instructions 字段。 |
| `maxTokens` | 属性 | <code>maxTokens: number</code> | max Tokens 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | model Alias 字段。 |
| `reasoning` | 属性 | <code>reasoning: ReasoningOptions</code> | reasoning 字段。 |
| `responseFormat` | 属性 | <code>responseFormat: SpecRef &#124; JsonSchema</code> | response Format 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `temperature` | 属性 | <code>temperature: number</code> | temperature 字段。 |
| `tools` | 属性 | <code>tools: ModelToolDescriptor[]</code> | tools 字段。 |

## `ModelResponse` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: TContent</code> | content 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `model` | 属性 | <code>model: string</code> | model 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `raw` | 属性 | <code>raw: unknown</code> | raw 字段。 |
| `toolCalls` | 属性 | <code>toolCalls: NormalizedToolCall[]</code> | tool Calls 字段。 |
| `usage` | 属性 | <code>usage: ModelUsage</code> | usage 字段。 |

## `ModelRoutingSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `aliases` | 属性 | <code>aliases: ModelAliasSpec[]</code> | aliases 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `defaultAlias` | 属性 | <code>defaultAlias: string</code> | default Alias 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `fallbackAliases` | 属性 | <code>fallbackAliases: string[]</code> | fallback Aliases 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `ModelStreamEvent` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: TContent</code> | content 字段。 |
| `error` | 属性 | <code>error: unknown</code> | error 字段。 |
| `toolCall` | 属性 | <code>toolCall: NormalizedToolCall</code> | tool Call 字段。 |
| `type` | 属性 | <code>type: "error" &#124; "delta" &#124; "tool_call" &#124; "usage" &#124; "done"</code> | type 字段。 |
| `usage` | 属性 | <code>usage: ModelUsage</code> | usage 字段。 |

## `ModelToolDescriptor` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `inputSchema` | 属性 | <code>inputSchema: JsonSchema</code> | input schema 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |

## `ModelUsage` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheHitTokens` | 属性 | <code>cacheHitTokens: number</code> | cache Hit Tokens 字段。 |
| `cacheMissTokens` | 属性 | <code>cacheMissTokens: number</code> | cache Miss Tokens 字段。 |
| `inputTokens` | 属性 | <code>inputTokens: number</code> | input Tokens 字段。 |
| `outputTokens` | 属性 | <code>outputTokens: number</code> | output Tokens 字段。 |
| `totalTokens` | 属性 | <code>totalTokens: number</code> | total Tokens 字段。 |

## `NormalizedToolCall` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `arguments` | 属性 | <code>arguments: unknown</code> | arguments 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |

## `ReasoningOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `budgetTokens` | 属性 | <code>budgetTokens: number</code> | budget Tokens 字段。 |
| `effort` | 属性 | <code>effort: "low" &#124; "medium" &#124; "high"</code> | effort 字段。 |
