# `@codesoul-co/hypha-memory` / `managed-search-cache`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/managed-search-cache.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)
- Exports: **20**

## Using this module

Use the Managed search cache module for reading, writing, or coordinating cache state. It exports 3 classes, 2 constants, 3 functions, 8 interfaces, 4 types.

### Import from the package entrypoint

```ts
import {
  CachedMemoryManagementProvider,
  InMemoryMemorySearchCacheStore,
  RedisMemorySearchCacheStore,
  managedMemorySearchResultSchema,
  memorySearchCacheRecordSchema,
  composeMemorySearchCacheProvider,
  validateManagedMemorySearchResults,
  validateMemorySearchCacheRecord,
} from '@codesoul-co/hypha-memory';

import type {
  CachedMemoryManagementProviderOptions,
  InMemoryMemorySearchCacheOptions,
  MemorySearchCacheAuthorizationDecision,
  MemorySearchCacheAuthorizationPort,
  MemorySearchCacheEvent,
  MemorySearchCacheStore,
  RedisLikeMemorySearchCacheClient,
  RedisMemorySearchCacheOptions,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- Use the 12 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { managedMemorySearchResultSchema } from '@codesoul-co/hypha-memory';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = managedMemorySearchResultSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CachedMemoryManagementProvider` | class | <code>new CachedMemoryManagementProvider(options: CachedMemoryManagementProviderOptions): CachedMemoryManagementProvider</code> | Managed-memory read-through cache. Mutations always execute against the provider first and then invalidate the exact scope. Access-stat searches are never cached because a hit would skip their intended write side effect. |
| `InMemoryMemorySearchCacheStore` | class | <code>new InMemoryMemorySearchCacheStore(options?: InMemoryMemorySearchCacheOptions): InMemoryMemorySearchCacheStore</code> | In Memory Memory Search Cache Store class with 8 public constructor or member entries; its exact declarations are listed below. |
| `RedisMemorySearchCacheStore` | class | <code>new RedisMemorySearchCacheStore(options: RedisMemorySearchCacheOptions): RedisMemorySearchCacheStore</code> | Shared Store for local, self-hosted, or managed Redis-compatible deployments. |
| `managedMemorySearchResultSchema` | constant | <code>const managedMemorySearchResultSchema: z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; revision: z.ZodNumber; type: z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "preference", "artifact", "governance", "reflection", "custom"]&gt;; subtype: z.ZodOptional&lt;z.ZodString&gt;; content: z.ZodUnknown; canonicalText: z.ZodOptional&lt;z.ZodString&gt;; summary: z.ZodOptional&lt;z.ZodSt...</code> | Runtime schema for Managed Memory Search Result. |
| `memorySearchCacheRecordSchema` | constant | <code>const memorySearchCacheRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ schemaVersion: z.ZodLiteral&lt;"1.0"&gt;; keyVersion: z.ZodLiteral&lt;"1"&gt;; key: z.ZodString; scopeHash: z.ZodString; scopeRevision: z.ZodString; requestHash: z.ZodString; profileRevision: z.ZodString; providerRevision: z.ZodString; results: z.ZodArray&lt;z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; revision: z.ZodNumb...</code> | Runtime schema for Memory Search Cache Record. |
| `composeMemorySearchCacheProvider` | function | <code>composeMemorySearchCacheProvider(options: MemorySearchCacheCompositionOptions): MemoryManagementProvider</code> | Explicit product-composition boundary for Search Cache mode. Disabled mode returns the canonical provider without opening or consulting a Cache Store. |
| `validateManagedMemorySearchResults` | function | <code>validateManagedMemorySearchResults(input: unknown): ManagedMemorySearchResult[]</code> | Validate Managed Memory Search Results function with 1 public call signature; parameters and return types are listed below. |
| `validateMemorySearchCacheRecord` | function | <code>validateMemorySearchCacheRecord(input: unknown, maxEntryBytes?: number): MemorySearchCacheRecord</code> | Validate Memory Search Cache Record function with 1 public call signature; parameters and return types are listed below. |
| `CachedMemoryManagementProviderOptions` | interface | <code>interface CachedMemoryManagementProviderOptions</code> | Cached Memory Management Provider Options interface with 14 public fields or methods. |
| `InMemoryMemorySearchCacheOptions` | interface | <code>interface InMemoryMemorySearchCacheOptions</code> | In Memory Memory Search Cache Options interface with 2 public fields or methods. |
| `MemorySearchCacheAuthorizationDecision` | interface | <code>interface MemorySearchCacheAuthorizationDecision</code> | Memory Search Cache Authorization Decision interface with 4 public fields or methods. |
| `MemorySearchCacheAuthorizationPort` | interface | <code>interface MemorySearchCacheAuthorizationPort</code> | Memory Search Cache Authorization Port interface with 1 public fields or methods. |
| `MemorySearchCacheEvent` | interface | <code>interface MemorySearchCacheEvent</code> | Memory Search Cache Event interface with 6 public fields or methods. |
| `MemorySearchCacheStore` | interface | <code>interface MemorySearchCacheStore</code> | Memory Search Cache Store interface with 7 public fields or methods. |
| `RedisLikeMemorySearchCacheClient` | interface | <code>interface RedisLikeMemorySearchCacheClient</code> | Redis Like Memory Search Cache Client interface with 8 public fields or methods. |
| `RedisMemorySearchCacheOptions` | interface | <code>interface RedisMemorySearchCacheOptions</code> | Redis Memory Search Cache Options interface with 4 public fields or methods. |
| `MemorySearchCacheCompositionOptions` | type | <code>type MemorySearchCacheCompositionOptions = { mode: 'disabled'; provider: MemoryManagementProvider; } &#124; (CachedMemoryManagementProviderOptions &amp; { mode: 'enabled'; })</code> | Public type alias for Memory Search Cache Composition Options; the declaration contains its complete type expression. |
| `MemorySearchCacheFailureMode` | type | <code>type MemorySearchCacheFailureMode = 'bypass' &#124; 'strict'</code> | Public type alias for Memory Search Cache Failure Mode; the declaration contains its complete type expression. |
| `MemorySearchCacheMode` | type | <code>type MemorySearchCacheMode = 'enabled' &#124; 'disabled'</code> | Public type alias for Memory Search Cache Mode; the declaration contains its complete type expression. |
| `MemorySearchCacheRecord` | type | <code>type MemorySearchCacheRecord = z.infer&lt;typeof memorySearchCacheRecordSchema&gt;</code> | Public type alias for Memory Search Cache Record; the declaration contains its complete type expression. |

## `CachedMemoryManagementProvider`

Managed-memory read-through cache. Mutations always execute against the provider first and then invalidate the exact scope. Access-stat searches are never cached because a hit would skip their intended write side effect.

- Kind: class
- Import: `import { CachedMemoryManagementProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export declare class CachedMemoryManagementProvider implements MemoryManagementProvider {
    readonly id: string;
    constructor(options: CachedMemoryManagementProviderOptions);
    capabilities(): Promise<import("./contracts").MemoryManagementCapabilities>;
    add(request: MemoryAddRequest): Promise<ManagedMemoryWriteResult>;
    search(rawRequest: ManagedMemorySearchRequest): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest): Promise<import("./contracts").ManagedMemoryRecord<unknown> | null>;
    list(request: MemoryListRequest): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest): Promise<MemoryVersion[]>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;import("./contracts").MemoryManagementCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: CachedMemoryManagementProviderOptions): CachedMemoryManagementProvider</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(rawRequest: ManagedMemorySearchRequest): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryMemorySearchCacheStore`

In Memory Memory Search Cache Store class with 8 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryMemorySearchCacheStore } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export declare class InMemoryMemorySearchCacheStore implements MemorySearchCacheStore {
    constructor(options?: InMemoryMemorySearchCacheOptions);
    getScopeRevision(scopeHash: string): Promise<string>;
    get(key: string): Promise<MemorySearchCacheRecord | null>;
    set(key: string, rawRecord: MemorySearchCacheRecord): Promise<void>;
    delete(key: string): Promise<void>;
    invalidateScope(scopeHash: string): Promise<number>;
    clear(): Promise<void>;
    stats(): {
            entries: number;
            sizeBytes: number;
            evictions: number;
        };
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options?: InMemoryMemorySearchCacheOptions): InMemoryMemorySearchCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;MemorySearchCacheRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getScopeRevision` | method | <code>getScopeRevision(scopeHash: string): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, rawRecord: MemorySearchCacheRecord): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `stats` | method | <code>stats(): { entries: number; sizeBytes: number; evictions: number; }</code> | Public method; parameters and return type are shown in the signature. |

## `RedisMemorySearchCacheStore`

Shared Store for local, self-hosted, or managed Redis-compatible deployments.

- Kind: class
- Import: `import { RedisMemorySearchCacheStore } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export declare class RedisMemorySearchCacheStore implements MemorySearchCacheStore {
    constructor(options: RedisMemorySearchCacheOptions);
    getScopeRevision(scopeHash: string): Promise<string>;
    get(key: string): Promise<MemorySearchCacheRecord | null>;
    set(key: string, input: MemorySearchCacheRecord): Promise<void>;
    delete(key: string): Promise<void>;
    invalidateScope(scopeHash: string): Promise<number>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RedisMemorySearchCacheOptions): RedisMemorySearchCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;MemorySearchCacheRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getScopeRevision` | method | <code>getScopeRevision(scopeHash: string): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, input: MemorySearchCacheRecord): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `managedMemorySearchResultSchema`

Runtime schema for Managed Memory Search Result.

- Kind: constant
- Import: `import { managedMemorySearchResultSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const managedMemorySearchResultSchema: (typeof import('@codesoul-co/hypha-memory'))['managedMemorySearchResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `memorySearchCacheRecordSchema`

Runtime schema for Memory Search Cache Record.

- Kind: constant
- Import: `import { memorySearchCacheRecordSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const memorySearchCacheRecordSchema: (typeof import('@codesoul-co/hypha-memory'))['memorySearchCacheRecordSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `composeMemorySearchCacheProvider`

Explicit product-composition boundary for Search Cache mode. Disabled mode returns the canonical provider without opening or consulting a Cache Store.

- Kind: function
- Import: `import { composeMemorySearchCacheProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export declare function composeMemorySearchCacheProvider(options: MemorySearchCacheCompositionOptions): MemoryManagementProvider;
```

### Call signature

```text
composeMemorySearchCacheProvider(options: MemorySearchCacheCompositionOptions): MemoryManagementProvider
```

Explicit product-composition boundary for Search Cache mode. Disabled mode returns the canonical provider without opening or consulting a Cache Store.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>MemorySearchCacheCompositionOptions</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryManagementProvider`
- Description: The return contract is defined by the type shown above.

## `validateManagedMemorySearchResults`

Validate Managed Memory Search Results function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateManagedMemorySearchResults } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export declare function validateManagedMemorySearchResults(input: unknown): ManagedMemorySearchResult[];
```

### Call signature

```text
validateManagedMemorySearchResults(input: unknown): ManagedMemorySearchResult[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ManagedMemorySearchResult[]`
- Description: The return contract is defined by the type shown above.

## `validateMemorySearchCacheRecord`

Validate Memory Search Cache Record function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemorySearchCacheRecord } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export declare function validateMemorySearchCacheRecord(input: unknown, maxEntryBytes?: number): MemorySearchCacheRecord;
```

### Call signature

```text
validateMemorySearchCacheRecord(input: unknown, maxEntryBytes?: number): MemorySearchCacheRecord
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `maxEntryBytes` | <code>number</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `{ createdAt: number; scopeHash: string; expiresAt: number; providerRevision: string; profileRevision: string; key: string; schemaVersion: "1.0"; keyVersion: "1"; scopeRevision: string; requestHash: string; results: { record: { id: string; type: "working" | "episodic" | "semantic" | "procedural" | "artifact" | "governance" | "custom" | "preference" | "reflection"; status: "pending" | "failed" | "deleted" | "active" | "dormant" | "superseded" | "invalidated" | "deletion_pending"; createdAt: string; updatedAt: string; revision: number; scopeHash: string; scope: { userId: string; workspaceId?: string | undefined; sessionId?: string | undefined; runId?: string | undefined; tenantId?: string | undefined; projectId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }; source: { type: "artifact" | "human_review" | "user_message" | "assistant_message" | "tool_result" | "workflow_state" | "import" | "derived" | "system"; sourceId?: string | undefined; sourceEventId?: string | undefined; sourceRunId?: string | undefined; sourceMessageId?: string | undefined; sourceArtifactId?: string | undefined; }; visibility: "workspace" | "private" | "session" | "tenant" | "shared"; provenance: { createdAt: string; providerId: string; createdBy: string; metadata?: Record<string, unknown> | undefined; extractorVersion?: string | undefined; sourceEventIds?: string[] | undefined; sourceMemoryIds?: string[] | undefined; transformation?: string | undefined; humanDecisionId?: string | undefined; }; versionId: string; contentHash: string; accessCount: number; indexStatus: { state: "none" | "pending" | "failed" | "deleted" | "partial" | "indexing" | "indexed"; attempts: number; lastError?: import("./contracts").NormalizedMemoryError | undefined; lastAttemptAt?: string | undefined; }; tags?: string[] | undefined; metadata?: Record<string, unknown> | undefined; expiresAt?: string | undefined; confidence?: number | undefined; entities?: { entityId: string; type?: string | undefined; confidence?: number | undefined; label?: string | undefined; }[] | undefined; canonicalText?: string | undefined; content?: unknown; importance?: number | undefined; subtype?: string | undefined; summary?: string | undefined; language?: string | undefined; strength?: number | undefined; salience?: number | undefined; lastAccessedAt?: string | undefined; lastReinforcedAt?: string | undefined; decayScore?: number | undefined; immutable?: boolean | undefined; humanVerified?: boolean | undefined; sensitive?: boolean | undefined; relations?: { type: "supersedes" | "supports" | "contradicts" | "derived_from" | "related_to" | "same_as" | "part_of"; targetMemoryId: string; metadata?: Record<string, unknown> | undefined; confidence?: number | undefined; }[] | undefined; vectorRefs?: { vectorStoreId: string; indexName: string; vectorId: string; embeddingProviderId: string; embeddingModel: string; indexedAt: string; embeddingRevision?: string | undefined; dimensions?: number | undefined; }[] | undefined; artifactRefs?: string[] | undefined; deletedAt?: string | undefined; }; score?: number | undefined; semanticScore?: number | undefined; keywordScore?: number | undefined; graphScore?: number | undefined; rerankScore?: number | undefined; reasons?: string[] | undefined; }[]; selectedMemoryVersionIds: string[]; sizeBytes?: number | undefined; }`
- Description: The return contract is defined by the type shown above.

## `CachedMemoryManagementProviderOptions`

Cached Memory Management Provider Options interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { CachedMemoryManagementProviderOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export interface CachedMemoryManagementProviderOptions {
    provider: MemoryManagementProvider;
    cache: MemorySearchCacheStore;
    providerRevision: string;
    failureMode?: MemorySearchCacheFailureMode;
    operationTimeoutMs?: number;
    ttlMs?: number;
    maxEntryBytes?: number;
    singleflight?: boolean;
    maxScopeRevisionRetries?: number;
    requiredScopeFields?: readonly (keyof ManagedMemoryScope)[];
    cacheAuthorization?: MemorySearchCacheAuthorizationPort;
    requireCacheAuthorization?: boolean;
    now?: () => number;
    trace?: (event: MemorySearchCacheEvent) => Promise<void> | void;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cache` | property | <code>cache: MemorySearchCacheStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cacheAuthorization` | property | <code>cacheAuthorization?: MemorySearchCacheAuthorizationPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failureMode` | property | <code>failureMode?: MemorySearchCacheFailureMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEntryBytes` | property | <code>maxEntryBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxScopeRevisionRetries` | property | <code>maxScopeRevisionRetries?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): number</code> | Public method; parameters and return type are shown in the signature. |
| `operationTimeoutMs` | property | <code>operationTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: MemoryManagementProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireCacheAuthorization` | property | <code>requireCacheAuthorization?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredScopeFields` | property | <code>requiredScopeFields?: readonly (keyof ManagedMemoryScope)[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `singleflight` | property | <code>singleflight?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trace` | method | <code>trace?(event: MemorySearchCacheEvent): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `ttlMs` | property | <code>ttlMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InMemoryMemorySearchCacheOptions`

In Memory Memory Search Cache Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryMemorySearchCacheOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export interface InMemoryMemorySearchCacheOptions {
    maxEntries?: number;
    maxBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxBytes` | property | <code>maxBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEntries` | property | <code>maxEntries?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemorySearchCacheAuthorizationDecision`

Memory Search Cache Authorization Decision interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemorySearchCacheAuthorizationDecision } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export interface MemorySearchCacheAuthorizationDecision {
    allowed: boolean;
    policyRevision: string;
    expiresAt?: string;
    reason?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowed` | property | <code>allowed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemorySearchCacheAuthorizationPort`

Memory Search Cache Authorization Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MemorySearchCacheAuthorizationPort } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export interface MemorySearchCacheAuthorizationPort {
    authorize(request: ManagedMemorySearchRequest): Promise<MemorySearchCacheAuthorizationDecision>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorize` | method | <code>authorize(request: ManagedMemorySearchRequest): Promise&lt;MemorySearchCacheAuthorizationDecision&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemorySearchCacheEvent`

Memory Search Cache Event interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MemorySearchCacheEvent } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export interface MemorySearchCacheEvent {
    type: 'memory.cache.lookup' | 'memory.cache.hit' | 'memory.cache.miss' | 'memory.cache.write' | 'memory.cache.invalidate' | 'memory.cache.bypass';
    providerId: string;
    scopeHash: string;
    key?: string;
    reason?: 'not_found' | 'expired' | 'corrupt' | 'scope_mismatch' | 'revision_changed' | 'access_stats_requested' | 'profile_revision_missing' | 'scope_incomplete' | 'invalidation_pending' | 'entry_oversized' | 'store_unavailable';
    ageMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ageMs` | property | <code>ageMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: "not_found" &#124; "expired" &#124; "scope_mismatch" &#124; "store_unavailable" &#124; "entry_oversized" &#124; "corrupt" &#124; "revision_changed" &#124; "access_stats_requested" &#124; "profile_revision_missing" &#124; "scope_incomplete" &#124; "invalidation_pending"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "memory.cache.lookup" &#124; "memory.cache.hit" &#124; "memory.cache.miss" &#124; "memory.cache.write" &#124; "memory.cache.invalidate" &#124; "memory.cache.bypass"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemorySearchCacheStore`

Memory Search Cache Store interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemorySearchCacheStore } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export interface MemorySearchCacheStore {
    getScopeRevision(scopeHash: string): Promise<string>;
    get(key: string): Promise<MemorySearchCacheRecord | null>;
    set(key: string, record: MemorySearchCacheRecord): Promise<void>;
    delete(key: string): Promise<void>;
    invalidateScope(scopeHash: string): Promise<number>;
    clear?(): Promise<void>;
    close?(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;MemorySearchCacheRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getScopeRevision` | method | <code>getScopeRevision(scopeHash: string): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, record: MemorySearchCacheRecord): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RedisLikeMemorySearchCacheClient`

Redis Like Memory Search Cache Client interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { RedisLikeMemorySearchCacheClient } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export interface RedisLikeMemorySearchCacheClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, mode: 'PX', durationMilliseconds: number): Promise<unknown>;
    del(...keys: string[]): Promise<number>;
    sadd(key: string, ...members: string[]): Promise<number>;
    srem(key: string, ...members: string[]): Promise<number>;
    smembers(key: string): Promise<string[]>;
    incr(key: string): Promise<number>;
    pexpire(key: string, durationMilliseconds: number): Promise<number>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `del` | method | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `incr` | method | <code>incr(key: string): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `pexpire` | method | <code>pexpire(key: string, durationMilliseconds: number): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `sadd` | method | <code>sadd(key: string, ...members: string[]): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, value: string, mode: "PX", durationMilliseconds: number): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `smembers` | method | <code>smembers(key: string): Promise&lt;string[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `srem` | method | <code>srem(key: string, ...members: string[]): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RedisMemorySearchCacheOptions`

Redis Memory Search Cache Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RedisMemorySearchCacheOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export interface RedisMemorySearchCacheOptions {
    client: RedisLikeMemorySearchCacheClient;
    namespace?: string;
    maxEntryBytes?: number;
    now?: () => number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `client` | property | <code>client: RedisLikeMemorySearchCacheClient</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEntryBytes` | property | <code>maxEntryBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `namespace` | property | <code>namespace?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): number</code> | Public method; parameters and return type are shown in the signature. |

## `MemorySearchCacheCompositionOptions`

Public type alias for Memory Search Cache Composition Options; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemorySearchCacheCompositionOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export type MemorySearchCacheCompositionOptions = {
    mode: 'disabled';
    provider: MemoryManagementProvider;
} | (CachedMemoryManagementProviderOptions & {
    mode: 'enabled';
});
```

## `MemorySearchCacheFailureMode`

Public type alias for Memory Search Cache Failure Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemorySearchCacheFailureMode } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export type MemorySearchCacheFailureMode = 'bypass' | 'strict';
```

## `MemorySearchCacheMode`

Public type alias for Memory Search Cache Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemorySearchCacheMode } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export type MemorySearchCacheMode = 'enabled' | 'disabled';
```

## `MemorySearchCacheRecord`

Public type alias for Memory Search Cache Record; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemorySearchCacheRecord } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### Declaration

```text
export type MemorySearchCacheRecord = z.infer<typeof memorySearchCacheRecordSchema>;
```
