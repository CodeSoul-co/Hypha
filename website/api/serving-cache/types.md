# `@codesoul-co/hypha-serving-cache` / `types`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Package guide: [learning and composition guide](/packages/serving-cache)
- Source: [`packages/serving-cache/src/types.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)
- Exports: **29**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CachedLLMProviderOptions` | interface | <code>interface CachedLLMProviderOptions</code> | Field contract for Cached LLM Provider Options; see all contract members below. |
| `CachedModelResponseProjection` | interface | <code>interface CachedModelResponseProjection</code> | Field contract for Cached Model Response Projection; see all contract members below. |
| `CacheEntry` | interface | <code>interface CacheEntry</code> | Field contract for Cache Entry; see all contract members below. |
| `CacheLookupHit` | interface | <code>interface CacheLookupHit</code> | Field contract for Cache Lookup Hit; see all contract members below. |
| `CacheLookupMiss` | interface | <code>interface CacheLookupMiss</code> | Field contract for Cache Lookup Miss; see all contract members below. |
| `CacheMetadata` | interface | <code>interface CacheMetadata</code> | Field contract for Cache Metadata; see all contract members below. |
| `CachePolicy` | interface | <code>interface CachePolicy</code> | Field contract for Cache Policy; see all contract members below. |
| `CacheScope` | interface | <code>interface CacheScope</code> | Field contract for Cache Scope; see all contract members below. |
| `CacheStore` | interface | <code>interface CacheStore</code> | Field contract for Cache Store; see all contract members below. |
| `CacheStoreHealth` | interface | <code>interface CacheStoreHealth</code> | Field contract for Cache Store Health; see all contract members below. |
| `CacheStoreStats` | interface | <code>interface CacheStoreStats</code> | Field contract for Cache Store Stats; see all contract members below. |
| `LLMCacheKeyInput` | interface | <code>interface LLMCacheKeyInput</code> | Field contract for LLM Cache Key Input; see all contract members below. |
| `ModelRequestCacheControl` | interface | <code>interface ModelRequestCacheControl</code> | Field contract for Model Request Cache Control; see all contract members below. |
| `PrefixCacheShapeObservation` | interface | <code>interface PrefixCacheShapeObservation</code> | Field contract for Prefix Cache Shape Observation; see all contract members below. |
| `PromptPrefixBlock` | interface | <code>interface PromptPrefixBlock extends Required&lt;Pick&lt;PromptPrefixBlockInput, 'id' &#124; 'type' &#124; 'hash'&gt;&gt;</code> | Field contract for Prompt Prefix Block; see all contract members below. |
| `PromptPrefixBlockInput` | interface | <code>interface PromptPrefixBlockInput</code> | Field contract for Prompt Prefix Block Input; see all contract members below. |
| `PromptPrefixMetadata` | interface | <code>interface PromptPrefixMetadata</code> | Field contract for Prompt Prefix Metadata; see all contract members below. |
| `ProviderPrefixCacheUsage` | interface | <code>interface ProviderPrefixCacheUsage</code> | Field contract for Provider Prefix Cache Usage; see all contract members below. |
| `CacheFailureMode` | type | <code>type CacheFailureMode = 'bypass' &#124; 'strict'</code> | Public type alias for Cache Failure Mode. |
| `CacheLookupResult` | type | <code>type CacheLookupResult = CacheLookupHit&lt;T&gt; &#124; CacheLookupMiss</code> | Public type alias for Cache Lookup Result. |
| `CacheMode` | type | <code>type CacheMode = 'off' &#124; 'read' &#124; 'write' &#124; 'readwrite'</code> | Public type alias for Cache Mode. |
| `CacheScopeRequirement` | type | <code>type CacheScopeRequirement = 'none' &#124; 'user' &#124; 'session'</code> | Public type alias for Cache Scope Requirement. |
| `CacheType` | type | <code>type CacheType = 'exact' &#124; 'prefix-metadata' &#124; 'semantic'</code> | Public type alias for Cache Type. |
| `PrefixCacheChangeReason` | type | <code>type PrefixCacheChangeReason = 'first_request' &#124; 'prefix_changed' &#124; 'tool_schema_changed' &#124; 'domain_pack_changed' &#124; 'dynamic_suffix_changed' &#124; 'unchanged'</code> | Public type alias for Prefix Cache Change Reason. |
| `PromptPrefixBlockType` | type | <code>type PromptPrefixBlockType = 'system' &#124; 'tool-schema' &#124; 'project-context' &#124; 'domain-pack' &#124; 'memory' &#124; 'prompt-template'</code> | Public type alias for Prompt Prefix Block Type. |
| `ServingCacheEvent` | type | <code>type ServingCacheEvent = { type: 'llm.cache.lookup'; key: string; provider: string; model: string; scope?: CacheScope; prefixCache?: PrefixCacheShapeObservation; runId?: string; stepId?: string; } &#124; { type: 'llm.cache.hit'; key: string; ageMs: number; provider: string; model: string; scope?: CacheScope; prefixCache?: PrefixCacheShapeObservation; runId?: string; stepId?: string; } &#124; { type: 'llm.cache.miss'; key: s...</code> | Public type alias for Serving Cache Event. |
| `ServingCacheMissReason` | type | <code>type ServingCacheMissReason = 'not_found' &#124; 'expired' &#124; 'disabled' &#124; 'streaming' &#124; 'no_cache' &#124; 'mode_off' &#124; 'read_disabled' &#124; 'scope_missing' &#124; 'store_unavailable' &#124; 'entry_oversized' &#124; 'corrupt'</code> | Public type alias for Serving Cache Miss Reason. |
| `ServingCacheStoreKind` | type | <code>type ServingCacheStoreKind = 'off' &#124; 'noop' &#124; 'memory' &#124; 'sqlite' &#124; 'redis'</code> | Public type alias for Serving Cache Store Kind. |
| `ServingCacheTraceSink` | type | <code>type ServingCacheTraceSink = (event: ServingCacheEvent) =&gt; void &#124; Promise&lt;void&gt;</code> | Public type alias for Serving Cache Trace Sink. |

## `CachedLLMProviderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `modelResolver` | method | <code>modelResolver(request: ModelRequest, inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;): string</code> | Public runtime operation for model Resolver. |
| `paramsResolver` | method | <code>paramsResolver(request: ModelRequest): Record&lt;string, unknown&gt; &#124; undefined</code> | Public runtime operation for params Resolver. |
| `policy` | property | <code>policy: Partial&lt;CachePolicy&gt;</code> | Public policy property. |
| `promptBlocksResolver` | method | <code>promptBlocksResolver(request: ModelRequest): PromptPrefixBlockInput[] &#124; undefined</code> | Public runtime operation for prompt Blocks Resolver. |
| `providerResolver` | method | <code>providerResolver(request: ModelRequest, inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;): string</code> | Public runtime operation for provider Resolver. |
| `responseIdFactory` | method | <code>responseIdFactory(request: ModelRequest, key: string): string</code> | Public runtime operation for response Id Factory. |
| `scopeResolver` | method | <code>scopeResolver(request: ModelRequest): CacheScope &#124; undefined</code> | Public runtime operation for scope Resolver. |
| `trace` | method | <code>trace(event: ServingCacheEvent): void &#124; Promise&lt;void&gt;</code> | Public runtime operation for trace. |

## `CachedModelResponseProjection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public content property. |
| `model` | property | <code>model: string</code> | Public model property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `schemaVersion` | property | <code>schemaVersion: "1.0"</code> | Public schema Version property. |
| `toolCalls` | property | <code>toolCalls: import("/Users/erwin/Downloads/codespace/Hypha/packages/models/dist/index").NormalizedToolCall[]</code> | Public tool Calls property. |
| `usage` | property | <code>usage: import("/Users/erwin/Downloads/codespace/Hypha/packages/models/dist/index").ModelUsage</code> | Public usage property. |

## `CacheEntry` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: number</code> | Public created At property. |
| `expiresAt` | property | <code>expiresAt: number</code> | Public expires At property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `keyVersion` | property | <code>keyVersion: "1"</code> | Public key Version property. |
| `metadata` | property | <code>metadata: CacheMetadata</code> | Public metadata property. |
| `schemaVersion` | property | <code>schemaVersion: "1.0"</code> | Public schema Version property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `value` | property | <code>value: T</code> | Public value property. |

## `CacheLookupHit` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ageMs` | property | <code>ageMs: number</code> | Public age Ms property. |
| `entry` | property | <code>entry: CacheEntry&lt;T&gt;</code> | Public entry property. |
| `hit` | property | <code>hit: true</code> | Public hit property. |
| `key` | property | <code>key: string</code> | Public key property. |

## `CacheLookupMiss` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `hit` | property | <code>hit: false</code> | Public hit property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `reason` | property | <code>reason: "not_found" &#124; "expired"</code> | Public reason property. |

## `CacheMetadata` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheType` | property | <code>cacheType: CacheType</code> | Public cache Type property. |
| `classification` | property | <code>classification: "restricted" &#124; "public" &#124; "internal" &#124; "confidential"</code> | Public classification property. |
| `hitCount` | property | <code>hitCount: number</code> | Public hit Count property. |
| `model` | property | <code>model: string</code> | Public model property. |
| `prefixMetadata` | property | <code>prefixMetadata: PromptPrefixMetadata</code> | Public prefix Metadata property. |
| `projectionType` | property | <code>projectionType: string</code> | Public projection Type property. |
| `promptHash` | property | <code>promptHash: string</code> | Public prompt Hash property. |
| `provider` | property | <code>provider: string</code> | Public provider property. |
| `requestHash` | property | <code>requestHash: string</code> | Public request Hash property. |
| `scope` | property | <code>scope: CacheScope</code> | Public scope property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `toolSchemaHash` | property | <code>toolSchemaHash: string</code> | Public tool Schema Hash property. |

## `CachePolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `circuitBreaker` | property | <code>circuitBreaker: { failureThreshold: number; resetTimeoutMs: number; }</code> | Public circuit Breaker property. |
| `enabled` | property | <code>enabled: boolean</code> | Public enabled property. |
| `failureMode` | property | <code>failureMode: CacheFailureMode</code> | Public failure Mode property. |
| `maxEntryBytes` | property | <code>maxEntryBytes: number</code> | Public max Entry Bytes property. |
| `mode` | property | <code>mode: CacheMode</code> | Public mode property. |
| `operationTimeoutMs` | property | <code>operationTimeoutMs: number</code> | Public operation Timeout Ms property. |
| `respectNoCache` | property | <code>respectNoCache: boolean</code> | Public respect No Cache property. |
| `scopeRequirement` | property | <code>scopeRequirement: CacheScopeRequirement</code> | Public scope Requirement property. |
| `singleflight` | property | <code>singleflight: boolean</code> | Public singleflight property. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |

## `CacheScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `domainPackId` | property | <code>domainPackId: string</code> | Public domain Pack Id property. |
| `projectId` | property | <code>projectId: string</code> | Public project Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `CacheStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public runtime operation for clear. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get&lt;TValue = T&gt;(key: string): Promise&lt;CacheEntry&lt;TValue&gt; &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;CacheStoreHealth&gt;</code> | Public runtime operation for health. |
| `set` | method | <code>set&lt;TValue = T&gt;(key: string, entry: CacheEntry&lt;TValue&gt;): Promise&lt;void&gt;</code> | Sets set at this module boundary. |
| `stats` | method | <code>stats(): Promise&lt;CacheStoreStats&gt;</code> | Public runtime operation for stats. |
| `touch` | method | <code>touch(key: string, timestamp: number): Promise&lt;void&gt;</code> | Public runtime operation for touch. |

## `CacheStoreHealth` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `details` | property | <code>details: Record&lt;string, unknown&gt;</code> | Public details property. |
| `status` | property | <code>status: "healthy" &#124; "degraded" &#124; "unavailable"</code> | Public status property. |

## `CacheStoreStats` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `entries` | property | <code>entries: number</code> | Public entries property. |
| `evictions` | property | <code>evictions: number</code> | Public evictions property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |

## `LLMCacheKeyInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheScope` | property | <code>cacheScope: CacheScope</code> | Public cache Scope property. |
| `messages` | property | <code>messages: unknown[]</code> | Public messages property. |
| `model` | property | <code>model: string</code> | Public model property. |
| `params` | property | <code>params: Record&lt;string, unknown&gt;</code> | Public params property. |
| `promptBlocks` | property | <code>promptBlocks: PromptPrefixBlockInput[]</code> | Public prompt Blocks property. |
| `provider` | property | <code>provider: string</code> | Public provider property. |
| `system` | property | <code>system: string</code> | Public system property. |
| `tools` | property | <code>tools: unknown[]</code> | Public tools property. |

## `ModelRequestCacheControl` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mode` | property | <code>mode: CacheMode</code> | Public mode property. |
| `noCache` | property | <code>noCache: boolean</code> | Public no Cache property. |

## `PrefixCacheShapeObservation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `blockCount` | property | <code>blockCount: number</code> | Public block Count property. |
| `changedReasons` | property | <code>changedReasons: PrefixCacheChangeReason[]</code> | Public changed Reasons property. |
| `domainPackHash` | property | <code>domainPackHash: string</code> | Public domain Pack Hash property. |
| `dynamicSuffixChanged` | property | <code>dynamicSuffixChanged: boolean</code> | Public dynamic Suffix Changed property. |
| `dynamicSuffixHash` | property | <code>dynamicSuffixHash: string</code> | Public dynamic Suffix Hash property. |
| `model` | property | <code>model: string</code> | Public model property. |
| `prefixHash` | property | <code>prefixHash: string</code> | Public prefix Hash property. |
| `prefixTokenEstimate` | property | <code>prefixTokenEstimate: number</code> | Public prefix Token Estimate property. |
| `previousDomainPackHash` | property | <code>previousDomainPackHash: string</code> | Public previous Domain Pack Hash property. |
| `previousDynamicSuffixHash` | property | <code>previousDynamicSuffixHash: string</code> | Public previous Dynamic Suffix Hash property. |
| `previousPrefixHash` | property | <code>previousPrefixHash: string</code> | Public previous Prefix Hash property. |
| `previousToolSchemaHash` | property | <code>previousToolSchemaHash: string</code> | Public previous Tool Schema Hash property. |
| `provider` | property | <code>provider: string</code> | Public provider property. |
| `requestHash` | property | <code>requestHash: string</code> | Public request Hash property. |
| `scope` | property | <code>scope: CacheScope</code> | Public scope property. |
| `stablePrefixChanged` | property | <code>stablePrefixChanged: boolean</code> | Public stable Prefix Changed property. |
| `toolSchemaHash` | property | <code>toolSchemaHash: string</code> | Public tool Schema Hash property. |

## `PromptPrefixBlock` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public content property. |
| `hash` | property | <code>hash: string</code> | Public hash property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `order` | property | <code>order: number</code> | Public order property. |
| `source` | property | <code>source: string</code> | Public source property. |
| `stable` | property | <code>stable: boolean</code> | Public stable property. |
| `templateId` | property | <code>templateId: string</code> | Public template Id property. |
| `templateVersion` | property | <code>templateVersion: string</code> | Public template Version property. |
| `tokenEstimate` | property | <code>tokenEstimate: number</code> | Public token Estimate property. |
| `type` | property | <code>type: PromptPrefixBlockType</code> | Public type property. |

## `PromptPrefixBlockInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public content property. |
| `hash` | property | <code>hash: string</code> | Public hash property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `order` | property | <code>order: number</code> | Public order property. |
| `source` | property | <code>source: string</code> | Public source property. |
| `stable` | property | <code>stable: boolean</code> | Public stable property. |
| `templateId` | property | <code>templateId: string</code> | Public template Id property. |
| `templateVersion` | property | <code>templateVersion: string</code> | Public template Version property. |
| `tokenEstimate` | property | <code>tokenEstimate: number</code> | Public token Estimate property. |
| `type` | property | <code>type: PromptPrefixBlockType</code> | Public type property. |

## `PromptPrefixMetadata` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `blocks` | property | <code>blocks: PromptPrefixBlock[]</code> | Public blocks property. |
| `domainPackHash` | property | <code>domainPackHash: string</code> | Public domain Pack Hash property. |
| `dynamicSuffixHash` | property | <code>dynamicSuffixHash: string</code> | Public dynamic Suffix Hash property. |
| `prefixHash` | property | <code>prefixHash: string</code> | Public prefix Hash property. |
| `prefixTokenEstimate` | property | <code>prefixTokenEstimate: number</code> | Public prefix Token Estimate property. |
| `requestHash` | property | <code>requestHash: string</code> | Public request Hash property. |
| `toolSchemaHash` | property | <code>toolSchemaHash: string</code> | Public tool Schema Hash property. |

## `ProviderPrefixCacheUsage` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `hitRate` | property | <code>hitRate: number</code> | Public hit Rate property. |
| `hitTokens` | property | <code>hitTokens: number</code> | Public hit Tokens property. |
| `inputTokens` | property | <code>inputTokens: number</code> | Public input Tokens property. |
| `missTokens` | property | <code>missTokens: number</code> | Public miss Tokens property. |
| `source` | property | <code>source: "unknown" &#124; "provider-usage" &#124; "hypha-serving-cache"</code> | Public source property. |
