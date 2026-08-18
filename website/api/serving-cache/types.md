# `@codesoul-co/hypha-serving-cache` / `types`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Source: [`packages/serving-cache/src/types.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)
- Exports: **29**

## Using this module

Use the Types module for declaring and runtime-validating contracts. It exports 18 interfaces, 11 types.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 29 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CachedLLMProviderOptions` | interface | <code>interface CachedLLMProviderOptions</code> | Cached LLM Provider Options interface with 8 public fields or methods. |
| `CachedModelResponseProjection` | interface | <code>interface CachedModelResponseProjection</code> | Cached Model Response Projection interface with 6 public fields or methods. |
| `CacheEntry` | interface | <code>interface CacheEntry</code> | Cache Entry interface with 8 public fields or methods. |
| `CacheLookupHit` | interface | <code>interface CacheLookupHit</code> | Cache Lookup Hit interface with 4 public fields or methods. |
| `CacheLookupMiss` | interface | <code>interface CacheLookupMiss</code> | Cache Lookup Miss interface with 3 public fields or methods. |
| `CacheMetadata` | interface | <code>interface CacheMetadata</code> | Cache Metadata interface with 12 public fields or methods. |
| `CachePolicy` | interface | <code>interface CachePolicy</code> | Cache Policy interface with 10 public fields or methods. |
| `CacheScope` | interface | <code>interface CacheScope</code> | Cache Scope interface with 5 public fields or methods. |
| `CacheStore` | interface | <code>interface CacheStore</code> | Cache Store interface with 8 public fields or methods. |
| `CacheStoreHealth` | interface | <code>interface CacheStoreHealth</code> | Cache Store Health interface with 3 public fields or methods. |
| `CacheStoreStats` | interface | <code>interface CacheStoreStats</code> | Cache Store Stats interface with 3 public fields or methods. |
| `LLMCacheKeyInput` | interface | <code>interface LLMCacheKeyInput</code> | LLM Cache Key Input interface with 8 public fields or methods. |
| `ModelRequestCacheControl` | interface | <code>interface ModelRequestCacheControl</code> | Model Request Cache Control interface with 2 public fields or methods. |
| `PrefixCacheShapeObservation` | interface | <code>interface PrefixCacheShapeObservation</code> | Prefix Cache Shape Observation interface with 17 public fields or methods. |
| `PromptPrefixBlock` | interface | <code>interface PromptPrefixBlock extends Required&lt;Pick&lt;PromptPrefixBlockInput, 'id' &#124; 'type' &#124; 'hash'&gt;&gt;</code> | Prompt Prefix Block interface with 11 public fields or methods. |
| `PromptPrefixBlockInput` | interface | <code>interface PromptPrefixBlockInput</code> | Prompt Prefix Block Input interface with 11 public fields or methods. |
| `PromptPrefixMetadata` | interface | <code>interface PromptPrefixMetadata</code> | Prompt Prefix Metadata interface with 7 public fields or methods. |
| `ProviderPrefixCacheUsage` | interface | <code>interface ProviderPrefixCacheUsage</code> | Provider Prefix Cache Usage interface with 5 public fields or methods. |
| `CacheFailureMode` | type | <code>type CacheFailureMode = 'bypass' &#124; 'strict'</code> | Public type alias for Cache Failure Mode; the declaration contains its complete type expression. |
| `CacheLookupResult` | type | <code>type CacheLookupResult = CacheLookupHit&lt;T&gt; &#124; CacheLookupMiss</code> | Public type alias for Cache Lookup Result; the declaration contains its complete type expression. |
| `CacheMode` | type | <code>type CacheMode = 'off' &#124; 'read' &#124; 'write' &#124; 'readwrite'</code> | Public type alias for Cache Mode; the declaration contains its complete type expression. |
| `CacheScopeRequirement` | type | <code>type CacheScopeRequirement = 'none' &#124; 'user' &#124; 'session'</code> | Public type alias for Cache Scope Requirement; the declaration contains its complete type expression. |
| `CacheType` | type | <code>type CacheType = 'exact' &#124; 'prefix-metadata' &#124; 'semantic'</code> | Public type alias for Cache Type; the declaration contains its complete type expression. |
| `PrefixCacheChangeReason` | type | <code>type PrefixCacheChangeReason = 'first_request' &#124; 'prefix_changed' &#124; 'tool_schema_changed' &#124; 'domain_pack_changed' &#124; 'dynamic_suffix_changed' &#124; 'unchanged'</code> | Public type alias for Prefix Cache Change Reason; the declaration contains its complete type expression. |
| `PromptPrefixBlockType` | type | <code>type PromptPrefixBlockType = 'system' &#124; 'tool-schema' &#124; 'project-context' &#124; 'domain-pack' &#124; 'memory' &#124; 'prompt-template'</code> | Public type alias for Prompt Prefix Block Type; the declaration contains its complete type expression. |
| `ServingCacheEvent` | type | <code>type ServingCacheEvent = { type: 'llm.cache.lookup'; key: string; provider: string; model: string; scope?: CacheScope; prefixCache?: PrefixCacheShapeObservation; runId?: string; stepId?: string; } &#124; { type: 'llm.cache.hit'; key: string; ageMs: number; provider: string; model: string; scope?: CacheScope; prefixCache?: PrefixCacheShapeObservation; runId?: string; stepId?: string; } &#124; { type: 'llm.cache.miss'; key: s...</code> | Public type alias for Serving Cache Event; the declaration contains its complete type expression. |
| `ServingCacheMissReason` | type | <code>type ServingCacheMissReason = 'not_found' &#124; 'expired' &#124; 'disabled' &#124; 'streaming' &#124; 'no_cache' &#124; 'mode_off' &#124; 'read_disabled' &#124; 'scope_missing' &#124; 'store_unavailable' &#124; 'entry_oversized' &#124; 'corrupt'</code> | Public type alias for Serving Cache Miss Reason; the declaration contains its complete type expression. |
| `ServingCacheStoreKind` | type | <code>type ServingCacheStoreKind = 'off' &#124; 'noop' &#124; 'memory' &#124; 'sqlite' &#124; 'redis'</code> | Public type alias for Serving Cache Store Kind; the declaration contains its complete type expression. |
| `ServingCacheTraceSink` | type | <code>type ServingCacheTraceSink = (event: ServingCacheEvent) =&gt; void &#124; Promise&lt;void&gt;</code> | Public type alias for Serving Cache Trace Sink; the declaration contains its complete type expression. |

## `CachedLLMProviderOptions`

Cached LLM Provider Options interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { CachedLLMProviderOptions } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `modelResolver` | method | <code>modelResolver?(request: ModelRequest, inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;): string</code> | Public method; parameters and return type are shown in the signature. |
| `paramsResolver` | method | <code>paramsResolver?(request: ModelRequest): Record&lt;string, unknown&gt; &#124; undefined</code> | Public method; parameters and return type are shown in the signature. |
| `policy` | property | <code>policy?: Partial&lt;CachePolicy&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptBlocksResolver` | method | <code>promptBlocksResolver?(request: ModelRequest): PromptPrefixBlockInput[] &#124; undefined</code> | Public method; parameters and return type are shown in the signature. |
| `providerResolver` | method | <code>providerResolver?(request: ModelRequest, inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;): string</code> | Public method; parameters and return type are shown in the signature. |
| `responseIdFactory` | method | <code>responseIdFactory?(request: ModelRequest, key: string): string</code> | Public method; parameters and return type are shown in the signature. |
| `scopeResolver` | method | <code>scopeResolver?(request: ModelRequest): CacheScope &#124; undefined</code> | Public method; parameters and return type are shown in the signature. |
| `trace` | method | <code>trace?(event: ServingCacheEvent): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `CachedModelResponseProjection`

Cached Model Response Projection interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { CachedModelResponseProjection } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `model` | property | <code>model?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaVersion` | property | <code>schemaVersion: "1.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCalls` | property | <code>toolCalls?: import("/Users/erwin/Downloads/codespace/Hypha/packages/models/dist/index").NormalizedToolCall[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `usage` | property | <code>usage?: import("/Users/erwin/Downloads/codespace/Hypha/packages/models/dist/index").ModelUsage</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CacheEntry`

Cache Entry interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { CacheEntry } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `keyVersion` | property | <code>keyVersion?: "1"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: CacheMetadata</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaVersion` | property | <code>schemaVersion?: "1.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `value` | property | <code>value: T</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CacheLookupHit`

Cache Lookup Hit interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { CacheLookupHit } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export interface CacheLookupHit<T = unknown> {
    hit: true;
    key: string;
    entry: CacheEntry<T>;
    ageMs: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ageMs` | property | <code>ageMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `entry` | property | <code>entry: CacheEntry&lt;T&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hit` | property | <code>hit: true</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CacheLookupMiss`

Cache Lookup Miss interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { CacheLookupMiss } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export interface CacheLookupMiss {
    hit: false;
    key: string;
    reason: 'not_found' | 'expired';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `hit` | property | <code>hit: false</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: "not_found" &#124; "expired"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CacheMetadata`

Cache Metadata interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { CacheMetadata } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheType` | property | <code>cacheType: CacheType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `classification` | property | <code>classification?: "restricted" &#124; "public" &#124; "internal" &#124; "confidential"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hitCount` | property | <code>hitCount?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `model` | property | <code>model: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixMetadata` | property | <code>prefixMetadata?: PromptPrefixMetadata</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionType` | property | <code>projectionType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptHash` | property | <code>promptHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestHash` | property | <code>requestHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope?: CacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolSchemaHash` | property | <code>toolSchemaHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CachePolicy`

Cache Policy interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { CachePolicy } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `circuitBreaker` | property | <code>circuitBreaker?: { failureThreshold: number; resetTimeoutMs: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `enabled` | property | <code>enabled: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failureMode` | property | <code>failureMode?: CacheFailureMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEntryBytes` | property | <code>maxEntryBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: CacheMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationTimeoutMs` | property | <code>operationTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `respectNoCache` | property | <code>respectNoCache?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeRequirement` | property | <code>scopeRequirement?: CacheScopeRequirement</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `singleflight` | property | <code>singleflight?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlMs` | property | <code>ttlMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CacheScope`

Cache Scope interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { CacheScope } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export interface CacheScope {
    tenantId?: string;
    userId?: string;
    projectId?: string;
    sessionId?: string;
    domainPackId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `domainPackId` | property | <code>domainPackId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectId` | property | <code>projectId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CacheStore`

Cache Store interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { CacheStore } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;TValue = T&gt;(key: string): Promise&lt;CacheEntry&lt;TValue&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health?(): Promise&lt;CacheStoreHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set&lt;TValue = T&gt;(key: string, entry: CacheEntry&lt;TValue&gt;): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `stats` | method | <code>stats?(): Promise&lt;CacheStoreStats&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `touch` | method | <code>touch?(key: string, timestamp: number): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `CacheStoreHealth`

Cache Store Health interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { CacheStoreHealth } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export interface CacheStoreHealth {
    status: 'healthy' | 'degraded' | 'unavailable';
    checkedAt: string;
    details?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `details` | property | <code>details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "healthy" &#124; "degraded" &#124; "unavailable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CacheStoreStats`

Cache Store Stats interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { CacheStoreStats } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export interface CacheStoreStats {
    entries: number;
    sizeBytes?: number;
    evictions?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `entries` | property | <code>entries: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evictions` | property | <code>evictions?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LLMCacheKeyInput`

LLM Cache Key Input interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { LLMCacheKeyInput } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheScope` | property | <code>cacheScope?: CacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messages` | property | <code>messages: unknown[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `model` | property | <code>model: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `params` | property | <code>params?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptBlocks` | property | <code>promptBlocks?: PromptPrefixBlockInput[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `system` | property | <code>system?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tools` | property | <code>tools?: unknown[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ModelRequestCacheControl`

Model Request Cache Control interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ModelRequestCacheControl } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export interface ModelRequestCacheControl {
    mode?: CacheMode;
    noCache?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mode` | property | <code>mode?: CacheMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `noCache` | property | <code>noCache?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PrefixCacheShapeObservation`

Prefix Cache Shape Observation interface with 17 public fields or methods.

- Kind: interface
- Import: `import type { PrefixCacheShapeObservation } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `blockCount` | property | <code>blockCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `changedReasons` | property | <code>changedReasons: PrefixCacheChangeReason[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackHash` | property | <code>domainPackHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dynamicSuffixChanged` | property | <code>dynamicSuffixChanged: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dynamicSuffixHash` | property | <code>dynamicSuffixHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `model` | property | <code>model: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixHash` | property | <code>prefixHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixTokenEstimate` | property | <code>prefixTokenEstimate?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `previousDomainPackHash` | property | <code>previousDomainPackHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `previousDynamicSuffixHash` | property | <code>previousDynamicSuffixHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `previousPrefixHash` | property | <code>previousPrefixHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `previousToolSchemaHash` | property | <code>previousToolSchemaHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestHash` | property | <code>requestHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope?: CacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stablePrefixChanged` | property | <code>stablePrefixChanged: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolSchemaHash` | property | <code>toolSchemaHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PromptPrefixBlock`

Prompt Prefix Block interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { PromptPrefixBlock } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hash` | property | <code>hash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `order` | property | <code>order?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stable` | property | <code>stable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `templateId` | property | <code>templateId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `templateVersion` | property | <code>templateVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenEstimate` | property | <code>tokenEstimate?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: PromptPrefixBlockType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PromptPrefixBlockInput`

Prompt Prefix Block Input interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { PromptPrefixBlockInput } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hash` | property | <code>hash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `order` | property | <code>order?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stable` | property | <code>stable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `templateId` | property | <code>templateId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `templateVersion` | property | <code>templateVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenEstimate` | property | <code>tokenEstimate?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: PromptPrefixBlockType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PromptPrefixMetadata`

Prompt Prefix Metadata interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { PromptPrefixMetadata } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `blocks` | property | <code>blocks: PromptPrefixBlock[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackHash` | property | <code>domainPackHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dynamicSuffixHash` | property | <code>dynamicSuffixHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixHash` | property | <code>prefixHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixTokenEstimate` | property | <code>prefixTokenEstimate?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestHash` | property | <code>requestHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolSchemaHash` | property | <code>toolSchemaHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ProviderPrefixCacheUsage`

Provider Prefix Cache Usage interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ProviderPrefixCacheUsage } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export interface ProviderPrefixCacheUsage {
    source: 'provider-usage' | 'hypha-serving-cache' | 'unknown';
    inputTokens?: number;
    hitTokens?: number;
    missTokens?: number;
    hitRate?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `hitRate` | property | <code>hitRate?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hitTokens` | property | <code>hitTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputTokens` | property | <code>inputTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `missTokens` | property | <code>missTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: "unknown" &#124; "provider-usage" &#124; "hypha-serving-cache"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CacheFailureMode`

Public type alias for Cache Failure Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { CacheFailureMode } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export type CacheFailureMode = 'bypass' | 'strict';
```

## `CacheLookupResult`

Public type alias for Cache Lookup Result; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { CacheLookupResult } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export type CacheLookupResult<T = unknown> = CacheLookupHit<T> | CacheLookupMiss;
```

## `CacheMode`

Public type alias for Cache Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { CacheMode } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export type CacheMode = 'off' | 'read' | 'write' | 'readwrite';
```

## `CacheScopeRequirement`

Public type alias for Cache Scope Requirement; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { CacheScopeRequirement } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export type CacheScopeRequirement = 'none' | 'user' | 'session';
```

## `CacheType`

Public type alias for Cache Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { CacheType } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export type CacheType = 'exact' | 'prefix-metadata' | 'semantic';
```

## `PrefixCacheChangeReason`

Public type alias for Prefix Cache Change Reason; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { PrefixCacheChangeReason } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export type PrefixCacheChangeReason = 'first_request' | 'prefix_changed' | 'tool_schema_changed' | 'domain_pack_changed' | 'dynamic_suffix_changed' | 'unchanged';
```

## `PromptPrefixBlockType`

Public type alias for Prompt Prefix Block Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { PromptPrefixBlockType } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export type PromptPrefixBlockType = 'system' | 'tool-schema' | 'project-context' | 'domain-pack' | 'memory' | 'prompt-template';
```

## `ServingCacheEvent`

Public type alias for Serving Cache Event; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ServingCacheEvent } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

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

Public type alias for Serving Cache Miss Reason; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ServingCacheMissReason } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export type ServingCacheMissReason = 'not_found' | 'expired' | 'disabled' | 'streaming' | 'no_cache' | 'mode_off' | 'read_disabled' | 'scope_missing' | 'store_unavailable' | 'entry_oversized' | 'corrupt';
```

## `ServingCacheStoreKind`

Public type alias for Serving Cache Store Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ServingCacheStoreKind } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export type ServingCacheStoreKind = 'off' | 'noop' | 'memory' | 'sqlite' | 'redis';
```

## `ServingCacheTraceSink`

Public type alias for Serving Cache Trace Sink; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ServingCacheTraceSink } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts)

### Declaration

```text
export type ServingCacheTraceSink = (event: ServingCacheEvent) => void | Promise<void>;
```
