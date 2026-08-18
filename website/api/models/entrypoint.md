# `@codesoul-co/hypha-models` / `index`

- Package index: [`@codesoul-co/hypha-models`](/api/models)
- Package guide: [learning and composition guide](/packages/models)
- Source: [`packages/models/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)
- Exports: **36**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MockModelProvider` | class | <code>new MockModelProvider(id?: string): MockModelProvider</code> | Runtime implementation for Mock Model Provider; see its public constructor and members below. |
| `ModelRegistry` | class | <code>new ModelRegistry(): ModelRegistry</code> | Runtime implementation for Model Registry; see its public constructor and members below. |
| `modelAliasSpecDefinition` | constant | <code>const modelAliasSpecDefinition: SpecSchemaDefinition&lt;ModelAliasSpec&gt;</code> | Runtime validation entrypoint for the model Alias spec, combining its parser, example and JSON Schema. |
| `modelAliasSpecExample` | constant | <code>const modelAliasSpecExample: ModelAliasSpec</code> | Valid example value for model Alias Spec. |
| `modelAliasSpecJsonSchema` | constant | <code>const modelAliasSpecJsonSchema: JsonSchema</code> | JSON Schema for model Alias Spec. |
| `modelAliasSpecSchema` | constant | <code>const modelAliasSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { alias: z.ZodString; providerId: z.ZodString; providerModel: z.ZodString; }, "strip...</code> | Runtime schema for model Alias Spec. |
| `modelCapabilitiesSchema` | constant | <code>const modelCapabilitiesSchema: z.ZodObject&lt;{ chat: z.ZodOptional&lt;z.ZodBoolean&gt;; streaming: z.ZodOptional&lt;z.ZodBoolean&gt;; toolCalling: z.ZodOptional&lt;z.ZodBoolean&gt;; jsonMode: z.ZodOptional&lt;z.ZodBoolean&gt;; embeddings: z.ZodOptional&lt;z.ZodBoolean&gt;; reasoning: z.ZodOptional&lt;z.ZodBoolean&gt;; prefixCaching: z.ZodOptional&lt;z.ZodBoolean&gt;; kvCaching: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strip", z.ZodTypeAny, { chat?: boolean &#124; undefi...</code> | Runtime schema for model Capabilities. |
| `modelProviderSpecDefinition` | constant | <code>const modelProviderSpecDefinition: SpecSchemaDefinition&lt;ModelProviderSpec&gt;</code> | Runtime validation entrypoint for the model Provider spec, combining its parser, example and JSON Schema. |
| `modelProviderSpecExample` | constant | <code>const modelProviderSpecExample: ModelProviderSpec</code> | Valid example value for model Provider Spec. |
| `modelProviderSpecJsonSchema` | constant | <code>const modelProviderSpecJsonSchema: JsonSchema</code> | JSON Schema for model Provider Spec. |
| `modelProviderSpecSchema` | constant | <code>const modelProviderSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { type: z.ZodString; defaultModelAlias: z.ZodOptional&lt;z.ZodString&gt;; capabilities:...</code> | Runtime schema for model Provider Spec. |
| `modelRequestSchema` | constant | <code>const modelRequestSchema: z.ZodObject&lt;{ runId: z.ZodString; stepId: z.ZodString; modelAlias: z.ZodString; instructions: z.ZodOptional&lt;z.ZodString&gt;; input: z.ZodUnknown; tools: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; name: z.ZodString; description: z.ZodString; inputSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; }, "strip", z.ZodTypeAny, { id: string; name: string; description: string; inp...</code> | Runtime schema for model Request. |
| `modelRoutingSpecDefinition` | constant | <code>const modelRoutingSpecDefinition: SpecSchemaDefinition&lt;ModelRoutingSpec&gt;</code> | Runtime validation entrypoint for the model Routing spec, combining its parser, example and JSON Schema. |
| `modelRoutingSpecExample` | constant | <code>const modelRoutingSpecExample: ModelRoutingSpec</code> | Valid example value for model Routing Spec. |
| `modelRoutingSpecJsonSchema` | constant | <code>const modelRoutingSpecJsonSchema: JsonSchema</code> | JSON Schema for model Routing Spec. |
| `modelRoutingSpecSchema` | constant | <code>const modelRoutingSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { defaultAlias: z.ZodString; aliases: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; ve...</code> | Runtime schema for model Routing Spec. |
| `modelSpecDefinitions` | constant | <code>const modelSpecDefinitions: readonly [SpecSchemaDefinition&lt;ModelProviderSpec&gt;, SpecSchemaDefinition&lt;ModelAliasSpec&gt;, SpecSchemaDefinition&lt;ModelRoutingSpec&gt;]</code> | model Spec Definitions constant exported by the `index` module. |
| `modelSpecJsonSchemas` | constant | <code>const modelSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | model Spec Json Schemas constant exported by the `index` module. |
| `validateModelAliasSpec` | function | <code>validateModelAliasSpec(input: unknown): ModelAliasSpec</code> | Validates Model Alias Spec at this module boundary. |
| `validateModelProviderSpec` | function | <code>validateModelProviderSpec(input: unknown): ModelProviderSpec</code> | Validates Model Provider Spec at this module boundary. |
| `validateModelRoutingSpec` | function | <code>validateModelRoutingSpec(input: unknown): ModelRoutingSpec</code> | Validates Model Routing Spec at this module boundary. |
| `ModelAliasSpec` | interface | <code>interface ModelAliasSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Model Alias Spec; see all contract members below. |
| `ModelCacheControl` | interface | <code>interface ModelCacheControl</code> | Field contract for Model Cache Control; see all contract members below. |
| `ModelCapabilities` | interface | <code>interface ModelCapabilities</code> | Field contract for Model Capabilities; see all contract members below. |
| `ModelMessage` | interface | <code>interface ModelMessage</code> | Field contract for Model Message; see all contract members below. |
| `ModelProvider` | interface | <code>interface ModelProvider</code> | Field contract for Model Provider; see all contract members below. |
| `ModelProviderSpec` | interface | <code>interface ModelProviderSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Model Provider Spec; see all contract members below. |
| `ModelRequest` | interface | <code>interface ModelRequest</code> | Field contract for Model Request; see all contract members below. |
| `ModelResponse` | interface | <code>interface ModelResponse</code> | Field contract for Model Response; see all contract members below. |
| `ModelRoutingSpec` | interface | <code>interface ModelRoutingSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Model Routing Spec; see all contract members below. |
| `ModelStreamEvent` | interface | <code>interface ModelStreamEvent</code> | Field contract for Model Stream Event; see all contract members below. |
| `ModelToolDescriptor` | interface | <code>interface ModelToolDescriptor</code> | Field contract for Model Tool Descriptor; see all contract members below. |
| `ModelUsage` | interface | <code>interface ModelUsage</code> | Field contract for Model Usage; see all contract members below. |
| `NormalizedToolCall` | interface | <code>interface NormalizedToolCall</code> | Field contract for Normalized Tool Call; see all contract members below. |
| `ReasoningOptions` | interface | <code>interface ReasoningOptions</code> | Field contract for Reasoning Options; see all contract members below. |
| `ModelProviderType` | type | <code>type ModelProviderType = 'openai' &#124; 'openai-compatible' &#124; 'mock' &#124; string</code> | Public type alias for Model Provider Type. |

## `MockModelProvider` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): ModelCapabilities</code> | Public runtime operation for capabilities. |
| `constructor` | constructor | <code>(id?: string): MockModelProvider</code> | Creates an instance of this class. |
| `countTokens` | method | <code>countTokens(input: unknown): Promise&lt;ModelUsage&gt;</code> | Public runtime operation for count Tokens. |
| `generate` | method | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | Public runtime operation for generate. |
| `id` | property | <code>id: string</code> | Public id property. |
| `stream` | method | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | Public runtime operation for stream. |

## `ModelRegistry` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): ModelRegistry</code> | Creates an instance of this class. |
| `get` | method | <code>get(providerId: string): ModelProvider &#124; null</code> | Gets get at this module boundary. |
| `list` | method | <code>list(): ModelProvider[]</code> | Lists list at this module boundary. |
| `register` | method | <code>register(provider: ModelProvider): void</code> | Registers register at this module boundary. |

## `ModelAliasSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `alias` | property | <code>alias: string</code> | Public alias property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerModel` | property | <code>providerModel: string</code> | Public provider Model property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `ModelCacheControl` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kvCacheRef` | property | <code>kvCacheRef: { id: string; provider: string; modelAlias: string; scope: "run" &#124; "session" &#124; "workspace"; expiresAt?: string; metadata?: Record&lt;string, unknown&gt;; }</code> | Public kv Cache Ref property. |
| `kvCacheValue` | property | <code>kvCacheValue: unknown</code> | Public kv Cache Value property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `prefixContent` | property | <code>prefixContent: string</code> | Public prefix Content property. |

## `ModelCapabilities` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `chat` | property | <code>chat: boolean</code> | Public chat property. |
| `embeddings` | property | <code>embeddings: boolean</code> | Public embeddings property. |
| `jsonMode` | property | <code>jsonMode: boolean</code> | Public json Mode property. |
| `kvCaching` | property | <code>kvCaching: boolean</code> | Public kv Caching property. |
| `prefixCaching` | property | <code>prefixCaching: boolean</code> | Public prefix Caching property. |
| `reasoning` | property | <code>reasoning: boolean</code> | Public reasoning property. |
| `streaming` | property | <code>streaming: boolean</code> | Public streaming property. |
| `toolCalling` | property | <code>toolCalling: boolean</code> | Public tool Calling property. |

## `ModelMessage` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public content property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `role` | property | <code>role: "system" &#124; "tool" &#124; "user" &#124; "assistant"</code> | Public role property. |
| `toolCallId` | property | <code>toolCallId: string</code> | Public tool Call Id property. |

## `ModelProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): ModelCapabilities</code> | Public runtime operation for capabilities. |
| `countTokens` | method | <code>countTokens(input: unknown): Promise&lt;ModelUsage&gt;</code> | Public runtime operation for count Tokens. |
| `generate` | method | <code>generate(request: TRequest): Promise&lt;TResponse&gt;</code> | Public runtime operation for generate. |
| `id` | property | <code>id: string</code> | Public id property. |
| `stream` | method | <code>stream(request: TRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | Public runtime operation for stream. |

## `ModelProviderSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apiKeyEnv` | property | <code>apiKeyEnv: string</code> | Public api Key Env property. |
| `baseUrl` | property | <code>baseUrl: string</code> | Public base Url property. |
| `capabilities` | property | <code>capabilities: ModelCapabilities</code> | Public capabilities property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `defaultModelAlias` | property | <code>defaultModelAlias: string</code> | Public default Model Alias property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |
| `type` | property | <code>type: string</code> | Public type property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `ModelRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cache` | property | <code>cache: ModelCacheControl</code> | Public cache property. |
| `input` | property | <code>input: TInput</code> | Public input property. |
| `instructions` | property | <code>instructions: string</code> | Public instructions property. |
| `maxTokens` | property | <code>maxTokens: number</code> | Public max Tokens property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public model Alias property. |
| `reasoning` | property | <code>reasoning: ReasoningOptions</code> | Public reasoning property. |
| `responseFormat` | property | <code>responseFormat: SpecRef &#124; JsonSchema</code> | Public response Format property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `temperature` | property | <code>temperature: number</code> | Public temperature property. |
| `tools` | property | <code>tools: ModelToolDescriptor[]</code> | Public tools property. |

## `ModelResponse` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: TContent</code> | Public content property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `model` | property | <code>model: string</code> | Public model property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `raw` | property | <code>raw: unknown</code> | Public raw property. |
| `toolCalls` | property | <code>toolCalls: NormalizedToolCall[]</code> | Public tool Calls property. |
| `usage` | property | <code>usage: ModelUsage</code> | Public usage property. |

## `ModelRoutingSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `aliases` | property | <code>aliases: ModelAliasSpec[]</code> | Public aliases property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `defaultAlias` | property | <code>defaultAlias: string</code> | Public default Alias property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `fallbackAliases` | property | <code>fallbackAliases: string[]</code> | Public fallback Aliases property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `ModelStreamEvent` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: TContent</code> | Public content property. |
| `error` | property | <code>error: unknown</code> | Public error property. |
| `toolCall` | property | <code>toolCall: NormalizedToolCall</code> | Public tool Call property. |
| `type` | property | <code>type: "error" &#124; "delta" &#124; "tool_call" &#124; "usage" &#124; "done"</code> | Public type property. |
| `usage` | property | <code>usage: ModelUsage</code> | Public usage property. |

## `ModelToolDescriptor` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `inputSchema` | property | <code>inputSchema: JsonSchema</code> | Public input schema property. |
| `name` | property | <code>name: string</code> | Public name property. |

## `ModelUsage` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheHitTokens` | property | <code>cacheHitTokens: number</code> | Public cache Hit Tokens property. |
| `cacheMissTokens` | property | <code>cacheMissTokens: number</code> | Public cache Miss Tokens property. |
| `inputTokens` | property | <code>inputTokens: number</code> | Public input Tokens property. |
| `outputTokens` | property | <code>outputTokens: number</code> | Public output Tokens property. |
| `totalTokens` | property | <code>totalTokens: number</code> | Public total Tokens property. |

## `NormalizedToolCall` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `arguments` | property | <code>arguments: unknown</code> | Public arguments property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |

## `ReasoningOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `budgetTokens` | property | <code>budgetTokens: number</code> | Public budget Tokens property. |
| `effort` | property | <code>effort: "low" &#124; "medium" &#124; "high"</code> | Public effort property. |
