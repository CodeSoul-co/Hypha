# `@codesoul-co/hypha-serving-cache` / `types`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 模块指南: [学习与组合说明](/zh/packages/serving-cache)
- 源码: [`packages/serving-cache/src/types.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)
- 导出数: **29**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CachedLLMProviderOptions` | 接口 | <code>interface CachedLLMProviderOptions</code> | Cached LLM Provider Options 的字段契约；完整字段见下表。 |
| `CachedModelResponseProjection` | 接口 | <code>interface CachedModelResponseProjection</code> | Cached Model Response Projection 的字段契约；完整字段见下表。 |
| `CacheEntry` | 接口 | <code>interface CacheEntry</code> | Cache Entry 的字段契约；完整字段见下表。 |
| `CacheLookupHit` | 接口 | <code>interface CacheLookupHit</code> | Cache Lookup Hit 的字段契约；完整字段见下表。 |
| `CacheLookupMiss` | 接口 | <code>interface CacheLookupMiss</code> | Cache Lookup Miss 的字段契约；完整字段见下表。 |
| `CacheMetadata` | 接口 | <code>interface CacheMetadata</code> | Cache Metadata 的字段契约；完整字段见下表。 |
| `CachePolicy` | 接口 | <code>interface CachePolicy</code> | Cache Policy 的字段契约；完整字段见下表。 |
| `CacheScope` | 接口 | <code>interface CacheScope</code> | Cache Scope 的字段契约；完整字段见下表。 |
| `CacheStore` | 接口 | <code>interface CacheStore</code> | Cache Store 的字段契约；完整字段见下表。 |
| `CacheStoreHealth` | 接口 | <code>interface CacheStoreHealth</code> | Cache Store Health 的字段契约；完整字段见下表。 |
| `CacheStoreStats` | 接口 | <code>interface CacheStoreStats</code> | Cache Store Stats 的字段契约；完整字段见下表。 |
| `LLMCacheKeyInput` | 接口 | <code>interface LLMCacheKeyInput</code> | LLM Cache Key Input 的字段契约；完整字段见下表。 |
| `ModelRequestCacheControl` | 接口 | <code>interface ModelRequestCacheControl</code> | Model Request Cache Control 的字段契约；完整字段见下表。 |
| `PrefixCacheShapeObservation` | 接口 | <code>interface PrefixCacheShapeObservation</code> | Prefix Cache Shape Observation 的字段契约；完整字段见下表。 |
| `PromptPrefixBlock` | 接口 | <code>interface PromptPrefixBlock extends Required&lt;Pick&lt;PromptPrefixBlockInput, 'id' &#124; 'type' &#124; 'hash'&gt;&gt;</code> | Prompt Prefix Block 的字段契约；完整字段见下表。 |
| `PromptPrefixBlockInput` | 接口 | <code>interface PromptPrefixBlockInput</code> | Prompt Prefix Block Input 的字段契约；完整字段见下表。 |
| `PromptPrefixMetadata` | 接口 | <code>interface PromptPrefixMetadata</code> | Prompt Prefix Metadata 的字段契约；完整字段见下表。 |
| `ProviderPrefixCacheUsage` | 接口 | <code>interface ProviderPrefixCacheUsage</code> | Provider Prefix Cache Usage 的字段契约；完整字段见下表。 |
| `CacheFailureMode` | 类型 | <code>type CacheFailureMode = 'bypass' &#124; 'strict'</code> | Cache Failure Mode 的公共类型别名。 |
| `CacheLookupResult` | 类型 | <code>type CacheLookupResult = CacheLookupHit&lt;T&gt; &#124; CacheLookupMiss</code> | Cache Lookup Result 的公共类型别名。 |
| `CacheMode` | 类型 | <code>type CacheMode = 'off' &#124; 'read' &#124; 'write' &#124; 'readwrite'</code> | Cache Mode 的公共类型别名。 |
| `CacheScopeRequirement` | 类型 | <code>type CacheScopeRequirement = 'none' &#124; 'user' &#124; 'session'</code> | Cache Scope Requirement 的公共类型别名。 |
| `CacheType` | 类型 | <code>type CacheType = 'exact' &#124; 'prefix-metadata' &#124; 'semantic'</code> | Cache Type 的公共类型别名。 |
| `PrefixCacheChangeReason` | 类型 | <code>type PrefixCacheChangeReason = 'first_request' &#124; 'prefix_changed' &#124; 'tool_schema_changed' &#124; 'domain_pack_changed' &#124; 'dynamic_suffix_changed' &#124; 'unchanged'</code> | Prefix Cache Change Reason 的公共类型别名。 |
| `PromptPrefixBlockType` | 类型 | <code>type PromptPrefixBlockType = 'system' &#124; 'tool-schema' &#124; 'project-context' &#124; 'domain-pack' &#124; 'memory' &#124; 'prompt-template'</code> | Prompt Prefix Block Type 的公共类型别名。 |
| `ServingCacheEvent` | 类型 | <code>type ServingCacheEvent = { type: 'llm.cache.lookup'; key: string; provider: string; model: string; scope?: CacheScope; prefixCache?: PrefixCacheShapeObservation; runId?: string; stepId?: string; } &#124; { type: 'llm.cache.hit'; key: string; ageMs: number; provider: string; model: string; scope?: CacheScope; prefixCache?: PrefixCacheShapeObservation; runId?: string; stepId?: string; } &#124; { type: 'llm.cache.miss'; key: s...</code> | Serving Cache Event 的公共类型别名。 |
| `ServingCacheMissReason` | 类型 | <code>type ServingCacheMissReason = 'not_found' &#124; 'expired' &#124; 'disabled' &#124; 'streaming' &#124; 'no_cache' &#124; 'mode_off' &#124; 'read_disabled' &#124; 'scope_missing' &#124; 'store_unavailable' &#124; 'entry_oversized' &#124; 'corrupt'</code> | Serving Cache Miss Reason 的公共类型别名。 |
| `ServingCacheStoreKind` | 类型 | <code>type ServingCacheStoreKind = 'off' &#124; 'noop' &#124; 'memory' &#124; 'sqlite' &#124; 'redis'</code> | Serving Cache Store Kind 的公共类型别名。 |
| `ServingCacheTraceSink` | 类型 | <code>type ServingCacheTraceSink = (event: ServingCacheEvent) =&gt; void &#124; Promise&lt;void&gt;</code> | Serving Cache Trace Sink 的公共类型别名。 |

## `CachedLLMProviderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `modelResolver` | 方法 | <code>modelResolver(request: ModelRequest, inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;): string</code> | model Resolver 的公开运行时操作。 |
| `paramsResolver` | 方法 | <code>paramsResolver(request: ModelRequest): Record&lt;string, unknown&gt; &#124; undefined</code> | params Resolver 的公开运行时操作。 |
| `policy` | 属性 | <code>policy: Partial&lt;CachePolicy&gt;</code> | policy 字段。 |
| `promptBlocksResolver` | 方法 | <code>promptBlocksResolver(request: ModelRequest): PromptPrefixBlockInput[] &#124; undefined</code> | prompt Blocks Resolver 的公开运行时操作。 |
| `providerResolver` | 方法 | <code>providerResolver(request: ModelRequest, inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;): string</code> | provider Resolver 的公开运行时操作。 |
| `responseIdFactory` | 方法 | <code>responseIdFactory(request: ModelRequest, key: string): string</code> | response Id Factory 的公开运行时操作。 |
| `scopeResolver` | 方法 | <code>scopeResolver(request: ModelRequest): CacheScope &#124; undefined</code> | scope Resolver 的公开运行时操作。 |
| `trace` | 方法 | <code>trace(event: ServingCacheEvent): void &#124; Promise&lt;void&gt;</code> | trace 的公开运行时操作。 |

## `CachedModelResponseProjection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `model` | 属性 | <code>model: string</code> | model 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `schemaVersion` | 属性 | <code>schemaVersion: "1.0"</code> | schema Version 字段。 |
| `toolCalls` | 属性 | <code>toolCalls: import("/Users/erwin/Downloads/codespace/Hypha/packages/models/dist/index").NormalizedToolCall[]</code> | tool Calls 字段。 |
| `usage` | 属性 | <code>usage: import("/Users/erwin/Downloads/codespace/Hypha/packages/models/dist/index").ModelUsage</code> | usage 字段。 |

## `CacheEntry` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: number</code> | created At 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: number</code> | expires At 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `keyVersion` | 属性 | <code>keyVersion: "1"</code> | key Version 字段。 |
| `metadata` | 属性 | <code>metadata: CacheMetadata</code> | metadata 字段。 |
| `schemaVersion` | 属性 | <code>schemaVersion: "1.0"</code> | schema Version 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
| `value` | 属性 | <code>value: T</code> | value 字段。 |

## `CacheLookupHit` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ageMs` | 属性 | <code>ageMs: number</code> | age Ms 字段。 |
| `entry` | 属性 | <code>entry: CacheEntry&lt;T&gt;</code> | entry 字段。 |
| `hit` | 属性 | <code>hit: true</code> | hit 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |

## `CacheLookupMiss` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `hit` | 属性 | <code>hit: false</code> | hit 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `reason` | 属性 | <code>reason: "not_found" &#124; "expired"</code> | reason 字段。 |

## `CacheMetadata` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheType` | 属性 | <code>cacheType: CacheType</code> | cache Type 字段。 |
| `classification` | 属性 | <code>classification: "restricted" &#124; "public" &#124; "internal" &#124; "confidential"</code> | classification 字段。 |
| `hitCount` | 属性 | <code>hitCount: number</code> | hit Count 字段。 |
| `model` | 属性 | <code>model: string</code> | model 字段。 |
| `prefixMetadata` | 属性 | <code>prefixMetadata: PromptPrefixMetadata</code> | prefix Metadata 字段。 |
| `projectionType` | 属性 | <code>projectionType: string</code> | projection Type 字段。 |
| `promptHash` | 属性 | <code>promptHash: string</code> | prompt Hash 字段。 |
| `provider` | 属性 | <code>provider: string</code> | provider 字段。 |
| `requestHash` | 属性 | <code>requestHash: string</code> | request Hash 字段。 |
| `scope` | 属性 | <code>scope: CacheScope</code> | scope 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `toolSchemaHash` | 属性 | <code>toolSchemaHash: string</code> | tool Schema Hash 字段。 |

## `CachePolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `circuitBreaker` | 属性 | <code>circuitBreaker: { failureThreshold: number; resetTimeoutMs: number; }</code> | circuit Breaker 字段。 |
| `enabled` | 属性 | <code>enabled: boolean</code> | enabled 字段。 |
| `failureMode` | 属性 | <code>failureMode: CacheFailureMode</code> | failure Mode 字段。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes: number</code> | max Entry Bytes 字段。 |
| `mode` | 属性 | <code>mode: CacheMode</code> | mode 字段。 |
| `operationTimeoutMs` | 属性 | <code>operationTimeoutMs: number</code> | operation Timeout Ms 字段。 |
| `respectNoCache` | 属性 | <code>respectNoCache: boolean</code> | respect No Cache 字段。 |
| `scopeRequirement` | 属性 | <code>scopeRequirement: CacheScopeRequirement</code> | scope Requirement 字段。 |
| `singleflight` | 属性 | <code>singleflight: boolean</code> | singleflight 字段。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |

## `CacheScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `domainPackId` | 属性 | <code>domainPackId: string</code> | domain Pack Id 字段。 |
| `projectId` | 属性 | <code>projectId: string</code> | project Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `CacheStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear(): Promise&lt;void&gt;</code> | clear 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get&lt;TValue = T&gt;(key: string): Promise&lt;CacheEntry&lt;TValue&gt; &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;CacheStoreHealth&gt;</code> | health 的公开运行时操作。 |
| `set` | 方法 | <code>set&lt;TValue = T&gt;(key: string, entry: CacheEntry&lt;TValue&gt;): Promise&lt;void&gt;</code> | 写入 set。 |
| `stats` | 方法 | <code>stats(): Promise&lt;CacheStoreStats&gt;</code> | stats 的公开运行时操作。 |
| `touch` | 方法 | <code>touch(key: string, timestamp: number): Promise&lt;void&gt;</code> | touch 的公开运行时操作。 |

## `CacheStoreHealth` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `details` | 属性 | <code>details: Record&lt;string, unknown&gt;</code> | details 字段。 |
| `status` | 属性 | <code>status: "healthy" &#124; "degraded" &#124; "unavailable"</code> | status 字段。 |

## `CacheStoreStats` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `entries` | 属性 | <code>entries: number</code> | entries 字段。 |
| `evictions` | 属性 | <code>evictions: number</code> | evictions 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |

## `LLMCacheKeyInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheScope` | 属性 | <code>cacheScope: CacheScope</code> | cache Scope 字段。 |
| `messages` | 属性 | <code>messages: unknown[]</code> | messages 字段。 |
| `model` | 属性 | <code>model: string</code> | model 字段。 |
| `params` | 属性 | <code>params: Record&lt;string, unknown&gt;</code> | params 字段。 |
| `promptBlocks` | 属性 | <code>promptBlocks: PromptPrefixBlockInput[]</code> | prompt Blocks 字段。 |
| `provider` | 属性 | <code>provider: string</code> | provider 字段。 |
| `system` | 属性 | <code>system: string</code> | system 字段。 |
| `tools` | 属性 | <code>tools: unknown[]</code> | tools 字段。 |

## `ModelRequestCacheControl` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mode` | 属性 | <code>mode: CacheMode</code> | mode 字段。 |
| `noCache` | 属性 | <code>noCache: boolean</code> | no Cache 字段。 |

## `PrefixCacheShapeObservation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `blockCount` | 属性 | <code>blockCount: number</code> | block Count 字段。 |
| `changedReasons` | 属性 | <code>changedReasons: PrefixCacheChangeReason[]</code> | changed Reasons 字段。 |
| `domainPackHash` | 属性 | <code>domainPackHash: string</code> | domain Pack Hash 字段。 |
| `dynamicSuffixChanged` | 属性 | <code>dynamicSuffixChanged: boolean</code> | dynamic Suffix Changed 字段。 |
| `dynamicSuffixHash` | 属性 | <code>dynamicSuffixHash: string</code> | dynamic Suffix Hash 字段。 |
| `model` | 属性 | <code>model: string</code> | model 字段。 |
| `prefixHash` | 属性 | <code>prefixHash: string</code> | prefix Hash 字段。 |
| `prefixTokenEstimate` | 属性 | <code>prefixTokenEstimate: number</code> | prefix Token Estimate 字段。 |
| `previousDomainPackHash` | 属性 | <code>previousDomainPackHash: string</code> | previous Domain Pack Hash 字段。 |
| `previousDynamicSuffixHash` | 属性 | <code>previousDynamicSuffixHash: string</code> | previous Dynamic Suffix Hash 字段。 |
| `previousPrefixHash` | 属性 | <code>previousPrefixHash: string</code> | previous Prefix Hash 字段。 |
| `previousToolSchemaHash` | 属性 | <code>previousToolSchemaHash: string</code> | previous Tool Schema Hash 字段。 |
| `provider` | 属性 | <code>provider: string</code> | provider 字段。 |
| `requestHash` | 属性 | <code>requestHash: string</code> | request Hash 字段。 |
| `scope` | 属性 | <code>scope: CacheScope</code> | scope 字段。 |
| `stablePrefixChanged` | 属性 | <code>stablePrefixChanged: boolean</code> | stable Prefix Changed 字段。 |
| `toolSchemaHash` | 属性 | <code>toolSchemaHash: string</code> | tool Schema Hash 字段。 |

## `PromptPrefixBlock` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `hash` | 属性 | <code>hash: string</code> | hash 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `order` | 属性 | <code>order: number</code> | order 字段。 |
| `source` | 属性 | <code>source: string</code> | source 字段。 |
| `stable` | 属性 | <code>stable: boolean</code> | stable 字段。 |
| `templateId` | 属性 | <code>templateId: string</code> | template Id 字段。 |
| `templateVersion` | 属性 | <code>templateVersion: string</code> | template Version 字段。 |
| `tokenEstimate` | 属性 | <code>tokenEstimate: number</code> | token Estimate 字段。 |
| `type` | 属性 | <code>type: PromptPrefixBlockType</code> | type 字段。 |

## `PromptPrefixBlockInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `hash` | 属性 | <code>hash: string</code> | hash 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `order` | 属性 | <code>order: number</code> | order 字段。 |
| `source` | 属性 | <code>source: string</code> | source 字段。 |
| `stable` | 属性 | <code>stable: boolean</code> | stable 字段。 |
| `templateId` | 属性 | <code>templateId: string</code> | template Id 字段。 |
| `templateVersion` | 属性 | <code>templateVersion: string</code> | template Version 字段。 |
| `tokenEstimate` | 属性 | <code>tokenEstimate: number</code> | token Estimate 字段。 |
| `type` | 属性 | <code>type: PromptPrefixBlockType</code> | type 字段。 |

## `PromptPrefixMetadata` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `blocks` | 属性 | <code>blocks: PromptPrefixBlock[]</code> | blocks 字段。 |
| `domainPackHash` | 属性 | <code>domainPackHash: string</code> | domain Pack Hash 字段。 |
| `dynamicSuffixHash` | 属性 | <code>dynamicSuffixHash: string</code> | dynamic Suffix Hash 字段。 |
| `prefixHash` | 属性 | <code>prefixHash: string</code> | prefix Hash 字段。 |
| `prefixTokenEstimate` | 属性 | <code>prefixTokenEstimate: number</code> | prefix Token Estimate 字段。 |
| `requestHash` | 属性 | <code>requestHash: string</code> | request Hash 字段。 |
| `toolSchemaHash` | 属性 | <code>toolSchemaHash: string</code> | tool Schema Hash 字段。 |

## `ProviderPrefixCacheUsage` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `hitRate` | 属性 | <code>hitRate: number</code> | hit Rate 字段。 |
| `hitTokens` | 属性 | <code>hitTokens: number</code> | hit Tokens 字段。 |
| `inputTokens` | 属性 | <code>inputTokens: number</code> | input Tokens 字段。 |
| `missTokens` | 属性 | <code>missTokens: number</code> | miss Tokens 字段。 |
| `source` | 属性 | <code>source: "unknown" &#124; "provider-usage" &#124; "hypha-serving-cache"</code> | source 字段。 |
