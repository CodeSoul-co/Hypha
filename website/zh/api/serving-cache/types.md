# `@codesoul-co/hypha-serving-cache` / `types`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 源码: [`packages/serving-cache/src/types.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)
- 导出数: **29**

## 模块用法

用于声明并运行时校验契约。Types 模块公开 18 接口、11 类型。

### 从包入口导入

```ts
import type {
  CachedLLMProviderOptions,
  CachedModelResponseProjection,
  CacheEntry,
  CacheLookupHit,
  CacheLookupMiss,
  CacheMetadata,
  CachePolicy,
  CacheScope,
} from '@codesoul-co/hypha-serving-cache';

// 完整导出列表见下方。
```

### 使用要点

- 29 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CachedLLMProviderOptions` | 接口 | <code>interface CachedLLMProviderOptions</code> | Cached LLM Provider Options 接口，共包含 8 个公开字段或方法。 |
| `CachedModelResponseProjection` | 接口 | <code>interface CachedModelResponseProjection</code> | Cached Model Response Projection 接口，共包含 6 个公开字段或方法。 |
| `CacheEntry` | 接口 | <code>interface CacheEntry</code> | Cache Entry 接口，共包含 8 个公开字段或方法。 |
| `CacheLookupHit` | 接口 | <code>interface CacheLookupHit</code> | Cache Lookup Hit 接口，共包含 4 个公开字段或方法。 |
| `CacheLookupMiss` | 接口 | <code>interface CacheLookupMiss</code> | Cache Lookup Miss 接口，共包含 3 个公开字段或方法。 |
| `CacheMetadata` | 接口 | <code>interface CacheMetadata</code> | Cache Metadata 接口，共包含 12 个公开字段或方法。 |
| `CachePolicy` | 接口 | <code>interface CachePolicy</code> | Cache Policy 接口，共包含 10 个公开字段或方法。 |
| `CacheScope` | 接口 | <code>interface CacheScope</code> | Cache Scope 接口，共包含 5 个公开字段或方法。 |
| `CacheStore` | 接口 | <code>interface CacheStore</code> | Cache Store 接口，共包含 8 个公开字段或方法。 |
| `CacheStoreHealth` | 接口 | <code>interface CacheStoreHealth</code> | Cache Store Health 接口，共包含 3 个公开字段或方法。 |
| `CacheStoreStats` | 接口 | <code>interface CacheStoreStats</code> | Cache Store Stats 接口，共包含 3 个公开字段或方法。 |
| `LLMCacheKeyInput` | 接口 | <code>interface LLMCacheKeyInput</code> | LLM Cache Key Input 接口，共包含 8 个公开字段或方法。 |
| `ModelRequestCacheControl` | 接口 | <code>interface ModelRequestCacheControl</code> | Model Request Cache Control 接口，共包含 2 个公开字段或方法。 |
| `PrefixCacheShapeObservation` | 接口 | <code>interface PrefixCacheShapeObservation</code> | Prefix Cache Shape Observation 接口，共包含 17 个公开字段或方法。 |
| `PromptPrefixBlock` | 接口 | <code>interface PromptPrefixBlock extends Required&lt;Pick&lt;PromptPrefixBlockInput, 'id' &#124; 'type' &#124; 'hash'&gt;&gt;</code> | Prompt Prefix Block 接口，共包含 11 个公开字段或方法。 |
| `PromptPrefixBlockInput` | 接口 | <code>interface PromptPrefixBlockInput</code> | Prompt Prefix Block Input 接口，共包含 11 个公开字段或方法。 |
| `PromptPrefixMetadata` | 接口 | <code>interface PromptPrefixMetadata</code> | Prompt Prefix Metadata 接口，共包含 7 个公开字段或方法。 |
| `ProviderPrefixCacheUsage` | 接口 | <code>interface ProviderPrefixCacheUsage</code> | Provider Prefix Cache Usage 接口，共包含 5 个公开字段或方法。 |
| `CacheFailureMode` | 类型 | <code>type CacheFailureMode = 'bypass' &#124; 'strict'</code> | Cache Failure Mode 公共类型别名；完整类型表达式见声明。 |
| `CacheLookupResult` | 类型 | <code>type CacheLookupResult = CacheLookupHit&lt;T&gt; &#124; CacheLookupMiss</code> | Cache Lookup Result 公共类型别名；完整类型表达式见声明。 |
| `CacheMode` | 类型 | <code>type CacheMode = 'off' &#124; 'read' &#124; 'write' &#124; 'readwrite'</code> | Cache Mode 公共类型别名；完整类型表达式见声明。 |
| `CacheScopeRequirement` | 类型 | <code>type CacheScopeRequirement = 'none' &#124; 'user' &#124; 'session'</code> | Cache Scope Requirement 公共类型别名；完整类型表达式见声明。 |
| `CacheType` | 类型 | <code>type CacheType = 'exact' &#124; 'prefix-metadata' &#124; 'semantic'</code> | Cache Type 公共类型别名；完整类型表达式见声明。 |
| `PrefixCacheChangeReason` | 类型 | <code>type PrefixCacheChangeReason = 'first_request' &#124; 'prefix_changed' &#124; 'tool_schema_changed' &#124; 'domain_pack_changed' &#124; 'dynamic_suffix_changed' &#124; 'unchanged'</code> | Prefix Cache Change Reason 公共类型别名；完整类型表达式见声明。 |
| `PromptPrefixBlockType` | 类型 | <code>type PromptPrefixBlockType = 'system' &#124; 'tool-schema' &#124; 'project-context' &#124; 'domain-pack' &#124; 'memory' &#124; 'prompt-template'</code> | Prompt Prefix Block Type 公共类型别名；完整类型表达式见声明。 |
| `ServingCacheEvent` | 类型 | <code>type ServingCacheEvent = { type: 'llm.cache.lookup'; key: string; provider: string; model: string; scope?: CacheScope; prefixCache?: PrefixCacheShapeObservation; runId?: string; stepId?: string; } &#124; { type: 'llm.cache.hit'; key: string; ageMs: number; provider: string; model: string; scope?: CacheScope; prefixCache?: PrefixCacheShapeObservation; runId?: string; stepId?: string; } &#124; { type: 'llm.cache.miss'; key: s...</code> | Serving Cache Event 公共类型别名；完整类型表达式见声明。 |
| `ServingCacheMissReason` | 类型 | <code>type ServingCacheMissReason = 'not_found' &#124; 'expired' &#124; 'disabled' &#124; 'streaming' &#124; 'no_cache' &#124; 'mode_off' &#124; 'read_disabled' &#124; 'scope_missing' &#124; 'store_unavailable' &#124; 'entry_oversized' &#124; 'corrupt'</code> | Serving Cache Miss Reason 公共类型别名；完整类型表达式见声明。 |
| `ServingCacheStoreKind` | 类型 | <code>type ServingCacheStoreKind = 'off' &#124; 'noop' &#124; 'memory' &#124; 'sqlite' &#124; 'redis'</code> | Serving Cache Store Kind 公共类型别名；完整类型表达式见声明。 |
| `ServingCacheTraceSink` | 类型 | <code>type ServingCacheTraceSink = (event: ServingCacheEvent) =&gt; void &#124; Promise&lt;void&gt;</code> | Serving Cache Trace Sink 公共类型别名；完整类型表达式见声明。 |

## `CachedLLMProviderOptions`

Cached LLM Provider Options 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CachedLLMProviderOptions } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface CachedLLMProviderOptions {
    policy?: Partial<CachePolicy>;
    trace?: ServingCacheTraceSink;
    providerResolver?: (request: ModelRequest, inner: ModelProvider<ModelRequest, ModelResponse>) => string;
    modelResolver?: (request: ModelRequest, inner: ModelProvider<ModelRequest, ModelResponse>) => string;
    scopeResolver?: (request: ModelRequest) => CacheScope | undefined;
    paramsResolver?: (request: ModelRequest) => Record<string, unknown> | undefined;
    promptBlocksResolver?: (request: ModelRequest) => PromptPrefixBlockInput[] | undefined;
    responseIdFactory?: (request: ModelRequest, key: string) => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `modelResolver` | 方法 | <code>modelResolver?(request: ModelRequest, inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `paramsResolver` | 方法 | <code>paramsResolver?(request: ModelRequest): Record&lt;string, unknown&gt; &#124; undefined</code> | 公开方法；参数与返回类型以签名列为准。 |
| `policy` | 属性 | <code>policy?: Partial&lt;CachePolicy&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptBlocksResolver` | 方法 | <code>promptBlocksResolver?(request: ModelRequest): PromptPrefixBlockInput[] &#124; undefined</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerResolver` | 方法 | <code>providerResolver?(request: ModelRequest, inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `responseIdFactory` | 方法 | <code>responseIdFactory?(request: ModelRequest, key: string): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `scopeResolver` | 方法 | <code>scopeResolver?(request: ModelRequest): CacheScope &#124; undefined</code> | 公开方法；参数与返回类型以签名列为准。 |
| `trace` | 方法 | <code>trace?(event: ServingCacheEvent): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `CachedModelResponseProjection`

Cached Model Response Projection 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CachedModelResponseProjection } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface CachedModelResponseProjection {
    schemaVersion: '1.0';
    providerId?: string;
    model?: string;
    content: ModelResponse['content'];
    toolCalls?: ModelResponse['toolCalls'];
    usage?: ModelResponse['usage'];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `model` | 属性 | <code>model?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaVersion` | 属性 | <code>schemaVersion: "1.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCalls` | 属性 | <code>toolCalls?: import("/Users/erwin/Downloads/codespace/Hypha/packages/models/dist/index").NormalizedToolCall[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `usage` | 属性 | <code>usage?: import("/Users/erwin/Downloads/codespace/Hypha/packages/models/dist/index").ModelUsage</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CacheEntry`

Cache Entry 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CacheEntry } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface CacheEntry<T = unknown> {
    schemaVersion?: '1.0';
    keyVersion?: '1';
    key: string;
    value: T;
    createdAt: number;
    expiresAt?: number;
    sizeBytes?: number;
    metadata?: CacheMetadata;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `keyVersion` | 属性 | <code>keyVersion?: "1"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: CacheMetadata</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaVersion` | 属性 | <code>schemaVersion?: "1.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `value` | 属性 | <code>value: T</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CacheLookupHit`

Cache Lookup Hit 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CacheLookupHit } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface CacheLookupHit<T = unknown> {
    hit: true;
    key: string;
    entry: CacheEntry<T>;
    ageMs: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ageMs` | 属性 | <code>ageMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `entry` | 属性 | <code>entry: CacheEntry&lt;T&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hit` | 属性 | <code>hit: true</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CacheLookupMiss`

Cache Lookup Miss 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CacheLookupMiss } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface CacheLookupMiss {
    hit: false;
    key: string;
    reason: 'not_found' | 'expired';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `hit` | 属性 | <code>hit: false</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: "not_found" &#124; "expired"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CacheMetadata`

Cache Metadata 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CacheMetadata } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface CacheMetadata {
    provider: string;
    model: string;
    cacheType: CacheType;
    promptHash?: string;
    toolSchemaHash?: string;
    requestHash?: string;
    hitCount?: number;
    tags?: string[];
    scope?: CacheScope;
    projectionType?: string;
    classification?: 'public' | 'internal' | 'confidential' | 'restricted';
    prefixMetadata?: PromptPrefixMetadata;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheType` | 属性 | <code>cacheType: CacheType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `classification` | 属性 | <code>classification?: "restricted" &#124; "public" &#124; "internal" &#124; "confidential"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hitCount` | 属性 | <code>hitCount?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `model` | 属性 | <code>model: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixMetadata` | 属性 | <code>prefixMetadata?: PromptPrefixMetadata</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionType` | 属性 | <code>projectionType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptHash` | 属性 | <code>promptHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestHash` | 属性 | <code>requestHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope?: CacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolSchemaHash` | 属性 | <code>toolSchemaHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CachePolicy`

Cache Policy 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CachePolicy } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface CachePolicy {
    enabled: boolean;
    mode: CacheMode;
    ttlMs?: number;
    respectNoCache?: boolean;
    failureMode?: CacheFailureMode;
    scopeRequirement?: CacheScopeRequirement;
    operationTimeoutMs?: number;
    singleflight?: boolean;
    maxEntryBytes?: number;
    circuitBreaker?: {
        failureThreshold: number;
        resetTimeoutMs: number;
    };
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `circuitBreaker` | 属性 | <code>circuitBreaker?: { failureThreshold: number; resetTimeoutMs: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `enabled` | 属性 | <code>enabled: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failureMode` | 属性 | <code>failureMode?: CacheFailureMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: CacheMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationTimeoutMs` | 属性 | <code>operationTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `respectNoCache` | 属性 | <code>respectNoCache?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeRequirement` | 属性 | <code>scopeRequirement?: CacheScopeRequirement</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `singleflight` | 属性 | <code>singleflight?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CacheScope`

Cache Scope 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CacheScope } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface CacheScope {
    tenantId?: string;
    userId?: string;
    projectId?: string;
    sessionId?: string;
    domainPackId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `domainPackId` | 属性 | <code>domainPackId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectId` | 属性 | <code>projectId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CacheStore`

Cache Store 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CacheStore } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface CacheStore<T = unknown> {
    get<TValue = T>(key: string): Promise<CacheEntry<TValue> | null>;
    set<TValue = T>(key: string, entry: CacheEntry<TValue>): Promise<void>;
    delete(key: string): Promise<void>;
    clear?(): Promise<void>;
    touch?(key: string, timestamp: number): Promise<void>;
    stats?(): Promise<CacheStoreStats>;
    health?(): Promise<CacheStoreHealth>;
    close?(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get&lt;TValue = T&gt;(key: string): Promise&lt;CacheEntry&lt;TValue&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health?(): Promise&lt;CacheStoreHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set&lt;TValue = T&gt;(key: string, entry: CacheEntry&lt;TValue&gt;): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stats` | 方法 | <code>stats?(): Promise&lt;CacheStoreStats&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `touch` | 方法 | <code>touch?(key: string, timestamp: number): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `CacheStoreHealth`

Cache Store Health 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CacheStoreHealth } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface CacheStoreHealth {
    status: 'healthy' | 'degraded' | 'unavailable';
    checkedAt: string;
    details?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `details` | 属性 | <code>details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "healthy" &#124; "degraded" &#124; "unavailable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CacheStoreStats`

Cache Store Stats 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CacheStoreStats } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface CacheStoreStats {
    entries: number;
    sizeBytes?: number;
    evictions?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `entries` | 属性 | <code>entries: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evictions` | 属性 | <code>evictions?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LLMCacheKeyInput`

LLM Cache Key Input 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LLMCacheKeyInput } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface LLMCacheKeyInput {
    provider: string;
    model: string;
    messages: unknown[];
    system?: string;
    tools?: unknown[];
    params?: Record<string, unknown>;
    cacheScope?: CacheScope;
    promptBlocks?: PromptPrefixBlockInput[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheScope` | 属性 | <code>cacheScope?: CacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messages` | 属性 | <code>messages: unknown[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `model` | 属性 | <code>model: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `params` | 属性 | <code>params?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptBlocks` | 属性 | <code>promptBlocks?: PromptPrefixBlockInput[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `system` | 属性 | <code>system?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tools` | 属性 | <code>tools?: unknown[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ModelRequestCacheControl`

Model Request Cache Control 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelRequestCacheControl } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface ModelRequestCacheControl {
    mode?: CacheMode;
    noCache?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mode` | 属性 | <code>mode?: CacheMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `noCache` | 属性 | <code>noCache?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PrefixCacheShapeObservation`

Prefix Cache Shape Observation 接口，共包含 17 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PrefixCacheShapeObservation } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface PrefixCacheShapeObservation {
    provider: string;
    model: string;
    prefixHash: string;
    previousPrefixHash?: string;
    toolSchemaHash?: string;
    previousToolSchemaHash?: string;
    domainPackHash?: string;
    previousDomainPackHash?: string;
    dynamicSuffixHash?: string;
    previousDynamicSuffixHash?: string;
    requestHash?: string;
    prefixTokenEstimate?: number;
    blockCount: number;
    stablePrefixChanged: boolean;
    dynamicSuffixChanged: boolean;
    changedReasons: PrefixCacheChangeReason[];
    scope?: CacheScope;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `blockCount` | 属性 | <code>blockCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `changedReasons` | 属性 | <code>changedReasons: PrefixCacheChangeReason[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackHash` | 属性 | <code>domainPackHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dynamicSuffixChanged` | 属性 | <code>dynamicSuffixChanged: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dynamicSuffixHash` | 属性 | <code>dynamicSuffixHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `model` | 属性 | <code>model: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixHash` | 属性 | <code>prefixHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixTokenEstimate` | 属性 | <code>prefixTokenEstimate?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `previousDomainPackHash` | 属性 | <code>previousDomainPackHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `previousDynamicSuffixHash` | 属性 | <code>previousDynamicSuffixHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `previousPrefixHash` | 属性 | <code>previousPrefixHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `previousToolSchemaHash` | 属性 | <code>previousToolSchemaHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestHash` | 属性 | <code>requestHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope?: CacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stablePrefixChanged` | 属性 | <code>stablePrefixChanged: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolSchemaHash` | 属性 | <code>toolSchemaHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PromptPrefixBlock`

Prompt Prefix Block 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptPrefixBlock } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface PromptPrefixBlock extends Required<Pick<PromptPrefixBlockInput, 'id' | 'type' | 'hash'>> {
    stable: boolean;
    content?: string;
    tokenEstimate?: number;
    order?: number;
    source?: string;
    templateId?: string;
    templateVersion?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hash` | 属性 | <code>hash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `order` | 属性 | <code>order?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stable` | 属性 | <code>stable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `templateId` | 属性 | <code>templateId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `templateVersion` | 属性 | <code>templateVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenEstimate` | 属性 | <code>tokenEstimate?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: PromptPrefixBlockType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PromptPrefixBlockInput`

Prompt Prefix Block Input 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptPrefixBlockInput } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface PromptPrefixBlockInput {
    id: string;
    type: PromptPrefixBlockType;
    stable?: boolean;
    hash?: string;
    content?: string;
    tokenEstimate?: number;
    order?: number;
    source?: string;
    templateId?: string;
    templateVersion?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hash` | 属性 | <code>hash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `order` | 属性 | <code>order?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stable` | 属性 | <code>stable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `templateId` | 属性 | <code>templateId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `templateVersion` | 属性 | <code>templateVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenEstimate` | 属性 | <code>tokenEstimate?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: PromptPrefixBlockType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PromptPrefixMetadata`

Prompt Prefix Metadata 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptPrefixMetadata } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface PromptPrefixMetadata {
    prefixHash: string;
    prefixTokenEstimate?: number;
    dynamicSuffixHash?: string;
    requestHash?: string;
    toolSchemaHash?: string;
    domainPackHash?: string;
    blocks: PromptPrefixBlock[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `blocks` | 属性 | <code>blocks: PromptPrefixBlock[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackHash` | 属性 | <code>domainPackHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dynamicSuffixHash` | 属性 | <code>dynamicSuffixHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixHash` | 属性 | <code>prefixHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixTokenEstimate` | 属性 | <code>prefixTokenEstimate?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestHash` | 属性 | <code>requestHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolSchemaHash` | 属性 | <code>toolSchemaHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ProviderPrefixCacheUsage`

Provider Prefix Cache Usage 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProviderPrefixCacheUsage } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export interface ProviderPrefixCacheUsage {
    source: 'provider-usage' | 'hypha-serving-cache' | 'unknown';
    inputTokens?: number;
    hitTokens?: number;
    missTokens?: number;
    hitRate?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `hitRate` | 属性 | <code>hitRate?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hitTokens` | 属性 | <code>hitTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputTokens` | 属性 | <code>inputTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `missTokens` | 属性 | <code>missTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: "unknown" &#124; "provider-usage" &#124; "hypha-serving-cache"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CacheFailureMode`

Cache Failure Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { CacheFailureMode } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export type CacheFailureMode = 'bypass' | 'strict';
```

## `CacheLookupResult`

Cache Lookup Result 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { CacheLookupResult } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export type CacheLookupResult<T = unknown> = CacheLookupHit<T> | CacheLookupMiss;
```

## `CacheMode`

Cache Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { CacheMode } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export type CacheMode = 'off' | 'read' | 'write' | 'readwrite';
```

## `CacheScopeRequirement`

Cache Scope Requirement 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { CacheScopeRequirement } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export type CacheScopeRequirement = 'none' | 'user' | 'session';
```

## `CacheType`

Cache Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { CacheType } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export type CacheType = 'exact' | 'prefix-metadata' | 'semantic';
```

## `PrefixCacheChangeReason`

Prefix Cache Change Reason 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { PrefixCacheChangeReason } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export type PrefixCacheChangeReason = 'first_request' | 'prefix_changed' | 'tool_schema_changed' | 'domain_pack_changed' | 'dynamic_suffix_changed' | 'unchanged';
```

## `PromptPrefixBlockType`

Prompt Prefix Block Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { PromptPrefixBlockType } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export type PromptPrefixBlockType = 'system' | 'tool-schema' | 'project-context' | 'domain-pack' | 'memory' | 'prompt-template';
```

## `ServingCacheEvent`

Serving Cache Event 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ServingCacheEvent } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export type ServingCacheEvent = {
    type: 'llm.cache.lookup';
    key: string;
    provider: string;
    model: string;
    scope?: CacheScope;
    prefixCache?: PrefixCacheShapeObservation;
    runId?: string;
    stepId?: string;
} | {
    type: 'llm.cache.hit';
    key: string;
    ageMs: number;
    provider: string;
    model: string;
    scope?: CacheScope;
    prefixCache?: PrefixCacheShapeObservation;
    runId?: string;
    stepId?: string;
} | {
    type: 'llm.cache.miss';
    key: string;
    reason: ServingCacheMissReason;
    provider: string;
    model: string;
    scope?: CacheScope;
    prefixCache?: PrefixCacheShapeObservation;
    runId?: string;
    stepId?: string;
} | {
    type: 'llm.cache.write';
    key: string;
    ttlMs?: number;
    provider: string;
    model: string;
    scope?: CacheScope;
    prefixMetadata?: PromptPrefixMetadata;
    prefixCache?: PrefixCacheShapeObservation;
    providerPrefixCache?: ProviderPrefixCacheUsage;
    runId?: string;
    stepId?: string;
} | {
    type: 'llm.cache.bypass';
    reason: ServingCacheMissReason;
    operation?: 'lookup' | 'write' | 'delete' | 'trace';
    code?: string;
    key?: string;
    provider?: string;
    model?: string;
    scope?: CacheScope;
    runId?: string;
    stepId?: string;
};
```

## `ServingCacheMissReason`

Serving Cache Miss Reason 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ServingCacheMissReason } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export type ServingCacheMissReason = 'not_found' | 'expired' | 'disabled' | 'streaming' | 'no_cache' | 'mode_off' | 'read_disabled' | 'scope_missing' | 'store_unavailable' | 'entry_oversized' | 'corrupt';
```

## `ServingCacheStoreKind`

Serving Cache Store Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ServingCacheStoreKind } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export type ServingCacheStoreKind = 'off' | 'noop' | 'memory' | 'sqlite' | 'redis';
```

## `ServingCacheTraceSink`

Serving Cache Trace Sink 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ServingCacheTraceSink } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### 声明

```text
export type ServingCacheTraceSink = (event: ServingCacheEvent) => void | Promise<void>;
```
