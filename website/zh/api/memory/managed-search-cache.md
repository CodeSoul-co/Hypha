# `@codesoul-co/hypha-memory` / `managed-search-cache`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/managed-search-cache.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)
- 导出数: **20**

## 模块用法

用于读写或协调缓存状态。Managed search cache 模块公开 3 类、2 常量、3 函数、8 接口、4 类型。

### 从包入口导入

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

// 完整导出列表见下方。
```

### 使用要点

- 12 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { managedMemorySearchResultSchema } from '@codesoul-co/hypha-memory';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = managedMemorySearchResultSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CachedMemoryManagementProvider` | 类 | <code>new CachedMemoryManagementProvider(options: CachedMemoryManagementProviderOptions): CachedMemoryManagementProvider</code> | Managed-memory read-through cache. Mutations always execute against the provider first and then invalidate the exact scope. Access-stat searches are never cached because a hit would skip their intended write side effect. |
| `InMemoryMemorySearchCacheStore` | 类 | <code>new InMemoryMemorySearchCacheStore(options?: InMemoryMemorySearchCacheOptions): InMemoryMemorySearchCacheStore</code> | In Memory Memory Search Cache Store 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RedisMemorySearchCacheStore` | 类 | <code>new RedisMemorySearchCacheStore(options: RedisMemorySearchCacheOptions): RedisMemorySearchCacheStore</code> | Shared Store for local, self-hosted, or managed Redis-compatible deployments. |
| `managedMemorySearchResultSchema` | 常量 | <code>const managedMemorySearchResultSchema: z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; revision: z.ZodNumber; type: z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "preference", "artifact", "governance", "reflection", "custom"]&gt;; subtype: z.ZodOptional&lt;z.ZodString&gt;; content: z.ZodUnknown; canonicalText: z.ZodOptional&lt;z.ZodString&gt;; summary: z.ZodOptional&lt;z.ZodSt...</code> | Managed Memory Search Result 的运行时 Schema。 |
| `memorySearchCacheRecordSchema` | 常量 | <code>const memorySearchCacheRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ schemaVersion: z.ZodLiteral&lt;"1.0"&gt;; keyVersion: z.ZodLiteral&lt;"1"&gt;; key: z.ZodString; scopeHash: z.ZodString; scopeRevision: z.ZodString; requestHash: z.ZodString; profileRevision: z.ZodString; providerRevision: z.ZodString; results: z.ZodArray&lt;z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; revision: z.ZodNumb...</code> | Memory Search Cache Record 的运行时 Schema。 |
| `composeMemorySearchCacheProvider` | 函数 | <code>composeMemorySearchCacheProvider(options: MemorySearchCacheCompositionOptions): MemoryManagementProvider</code> | Explicit product-composition boundary for Search Cache mode. Disabled mode returns the canonical provider without opening or consulting a Cache Store. |
| `validateManagedMemorySearchResults` | 函数 | <code>validateManagedMemorySearchResults(input: unknown): ManagedMemorySearchResult[]</code> | Validate Managed Memory Search Results 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateMemorySearchCacheRecord` | 函数 | <code>validateMemorySearchCacheRecord(input: unknown, maxEntryBytes?: number): MemorySearchCacheRecord</code> | Validate Memory Search Cache Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `CachedMemoryManagementProviderOptions` | 接口 | <code>interface CachedMemoryManagementProviderOptions</code> | Cached Memory Management Provider Options 接口，共包含 14 个公开字段或方法。 |
| `InMemoryMemorySearchCacheOptions` | 接口 | <code>interface InMemoryMemorySearchCacheOptions</code> | In Memory Memory Search Cache Options 接口，共包含 2 个公开字段或方法。 |
| `MemorySearchCacheAuthorizationDecision` | 接口 | <code>interface MemorySearchCacheAuthorizationDecision</code> | Memory Search Cache Authorization Decision 接口，共包含 4 个公开字段或方法。 |
| `MemorySearchCacheAuthorizationPort` | 接口 | <code>interface MemorySearchCacheAuthorizationPort</code> | Memory Search Cache Authorization Port 接口，共包含 1 个公开字段或方法。 |
| `MemorySearchCacheEvent` | 接口 | <code>interface MemorySearchCacheEvent</code> | Memory Search Cache Event 接口，共包含 6 个公开字段或方法。 |
| `MemorySearchCacheStore` | 接口 | <code>interface MemorySearchCacheStore</code> | Memory Search Cache Store 接口，共包含 7 个公开字段或方法。 |
| `RedisLikeMemorySearchCacheClient` | 接口 | <code>interface RedisLikeMemorySearchCacheClient</code> | Redis Like Memory Search Cache Client 接口，共包含 8 个公开字段或方法。 |
| `RedisMemorySearchCacheOptions` | 接口 | <code>interface RedisMemorySearchCacheOptions</code> | Redis Memory Search Cache Options 接口，共包含 4 个公开字段或方法。 |
| `MemorySearchCacheCompositionOptions` | 类型 | <code>type MemorySearchCacheCompositionOptions = { mode: 'disabled'; provider: MemoryManagementProvider; } &#124; (CachedMemoryManagementProviderOptions &amp; { mode: 'enabled'; })</code> | Memory Search Cache Composition Options 公共类型别名；完整类型表达式见声明。 |
| `MemorySearchCacheFailureMode` | 类型 | <code>type MemorySearchCacheFailureMode = 'bypass' &#124; 'strict'</code> | Memory Search Cache Failure Mode 公共类型别名；完整类型表达式见声明。 |
| `MemorySearchCacheMode` | 类型 | <code>type MemorySearchCacheMode = 'enabled' &#124; 'disabled'</code> | Memory Search Cache Mode 公共类型别名；完整类型表达式见声明。 |
| `MemorySearchCacheRecord` | 类型 | <code>type MemorySearchCacheRecord = z.infer&lt;typeof memorySearchCacheRecordSchema&gt;</code> | Memory Search Cache Record 公共类型别名；完整类型表达式见声明。 |

## `CachedMemoryManagementProvider`

Managed-memory read-through cache. Mutations always execute against the provider first and then invalidate the exact scope. Access-stat searches are never cached because a hit would skip their intended write side effect.

- 种类: 类
- 导入: `import { CachedMemoryManagementProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;import("./contracts").MemoryManagementCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: CachedMemoryManagementProviderOptions): CachedMemoryManagementProvider</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(rawRequest: ManagedMemorySearchRequest): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryMemorySearchCacheStore`

In Memory Memory Search Cache Store 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryMemorySearchCacheStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options?: InMemoryMemorySearchCacheOptions): InMemoryMemorySearchCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;MemorySearchCacheRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getScopeRevision` | 方法 | <code>getScopeRevision(scopeHash: string): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, rawRecord: MemorySearchCacheRecord): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stats` | 方法 | <code>stats(): { entries: number; sizeBytes: number; evictions: number; }</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisMemorySearchCacheStore`

Shared Store for local, self-hosted, or managed Redis-compatible deployments.

- 种类: 类
- 导入: `import { RedisMemorySearchCacheStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RedisMemorySearchCacheOptions): RedisMemorySearchCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;MemorySearchCacheRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getScopeRevision` | 方法 | <code>getScopeRevision(scopeHash: string): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, input: MemorySearchCacheRecord): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `managedMemorySearchResultSchema`

Managed Memory Search Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { managedMemorySearchResultSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const managedMemorySearchResultSchema: (typeof import('@codesoul-co/hypha-memory'))['managedMemorySearchResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `memorySearchCacheRecordSchema`

Memory Search Cache Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { memorySearchCacheRecordSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const memorySearchCacheRecordSchema: (typeof import('@codesoul-co/hypha-memory'))['memorySearchCacheRecordSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `composeMemorySearchCacheProvider`

Explicit product-composition boundary for Search Cache mode. Disabled mode returns the canonical provider without opening or consulting a Cache Store.

- 种类: 函数
- 导入: `import { composeMemorySearchCacheProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

```text
export declare function composeMemorySearchCacheProvider(options: MemorySearchCacheCompositionOptions): MemoryManagementProvider;
```

### 调用签名

```text
composeMemorySearchCacheProvider(options: MemorySearchCacheCompositionOptions): MemoryManagementProvider
```

Explicit product-composition boundary for Search Cache mode. Disabled mode returns the canonical provider without opening or consulting a Cache Store.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>MemorySearchCacheCompositionOptions</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryManagementProvider`
- 说明: 返回值契约由上述类型定义。

## `validateManagedMemorySearchResults`

Validate Managed Memory Search Results 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateManagedMemorySearchResults } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

```text
export declare function validateManagedMemorySearchResults(input: unknown): ManagedMemorySearchResult[];
```

### 调用签名

```text
validateManagedMemorySearchResults(input: unknown): ManagedMemorySearchResult[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ManagedMemorySearchResult[]`
- 说明: 返回值契约由上述类型定义。

## `validateMemorySearchCacheRecord`

Validate Memory Search Cache Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemorySearchCacheRecord } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

```text
export declare function validateMemorySearchCacheRecord(input: unknown, maxEntryBytes?: number): MemorySearchCacheRecord;
```

### 调用签名

```text
validateMemorySearchCacheRecord(input: unknown, maxEntryBytes?: number): MemorySearchCacheRecord
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `maxEntryBytes` | <code>number</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `{ createdAt: number; scopeHash: string; expiresAt: number; providerRevision: string; profileRevision: string; key: string; schemaVersion: "1.0"; keyVersion: "1"; scopeRevision: string; requestHash: string; results: { record: { id: string; type: "working" | "episodic" | "semantic" | "procedural" | "artifact" | "governance" | "custom" | "preference" | "reflection"; status: "pending" | "failed" | "deleted" | "active" | "dormant" | "superseded" | "invalidated" | "deletion_pending"; createdAt: string; updatedAt: string; revision: number; scopeHash: string; scope: { userId: string; workspaceId?: string | undefined; sessionId?: string | undefined; runId?: string | undefined; tenantId?: string | undefined; projectId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }; source: { type: "artifact" | "human_review" | "user_message" | "assistant_message" | "tool_result" | "workflow_state" | "import" | "derived" | "system"; sourceId?: string | undefined; sourceEventId?: string | undefined; sourceRunId?: string | undefined; sourceMessageId?: string | undefined; sourceArtifactId?: string | undefined; }; visibility: "workspace" | "private" | "session" | "tenant" | "shared"; provenance: { createdAt: string; providerId: string; createdBy: string; metadata?: Record<string, unknown> | undefined; extractorVersion?: string | undefined; sourceEventIds?: string[] | undefined; sourceMemoryIds?: string[] | undefined; transformation?: string | undefined; humanDecisionId?: string | undefined; }; versionId: string; contentHash: string; accessCount: number; indexStatus: { state: "none" | "pending" | "failed" | "deleted" | "partial" | "indexing" | "indexed"; attempts: number; lastError?: import("./contracts").NormalizedMemoryError | undefined; lastAttemptAt?: string | undefined; }; tags?: string[] | undefined; metadata?: Record<string, unknown> | undefined; expiresAt?: string | undefined; confidence?: number | undefined; entities?: { entityId: string; type?: string | undefined; confidence?: number | undefined; label?: string | undefined; }[] | undefined; canonicalText?: string | undefined; content?: unknown; importance?: number | undefined; subtype?: string | undefined; summary?: string | undefined; language?: string | undefined; strength?: number | undefined; salience?: number | undefined; lastAccessedAt?: string | undefined; lastReinforcedAt?: string | undefined; decayScore?: number | undefined; immutable?: boolean | undefined; humanVerified?: boolean | undefined; sensitive?: boolean | undefined; relations?: { type: "supersedes" | "supports" | "contradicts" | "derived_from" | "related_to" | "same_as" | "part_of"; targetMemoryId: string; metadata?: Record<string, unknown> | undefined; confidence?: number | undefined; }[] | undefined; vectorRefs?: { vectorStoreId: string; indexName: string; vectorId: string; embeddingProviderId: string; embeddingModel: string; indexedAt: string; embeddingRevision?: string | undefined; dimensions?: number | undefined; }[] | undefined; artifactRefs?: string[] | undefined; deletedAt?: string | undefined; }; score?: number | undefined; semanticScore?: number | undefined; keywordScore?: number | undefined; graphScore?: number | undefined; rerankScore?: number | undefined; reasons?: string[] | undefined; }[]; selectedMemoryVersionIds: string[]; sizeBytes?: number | undefined; }`
- 说明: 返回值契约由上述类型定义。

## `CachedMemoryManagementProviderOptions`

Cached Memory Management Provider Options 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CachedMemoryManagementProviderOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cache` | 属性 | <code>cache: MemorySearchCacheStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cacheAuthorization` | 属性 | <code>cacheAuthorization?: MemorySearchCacheAuthorizationPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failureMode` | 属性 | <code>failureMode?: MemorySearchCacheFailureMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxScopeRevisionRetries` | 属性 | <code>maxScopeRevisionRetries?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `operationTimeoutMs` | 属性 | <code>operationTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: MemoryManagementProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireCacheAuthorization` | 属性 | <code>requireCacheAuthorization?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredScopeFields` | 属性 | <code>requiredScopeFields?: readonly (keyof ManagedMemoryScope)[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `singleflight` | 属性 | <code>singleflight?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trace` | 方法 | <code>trace?(event: MemorySearchCacheEvent): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InMemoryMemorySearchCacheOptions`

In Memory Memory Search Cache Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InMemoryMemorySearchCacheOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

```text
export interface InMemoryMemorySearchCacheOptions {
    maxEntries?: number;
    maxBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxBytes` | 属性 | <code>maxBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEntries` | 属性 | <code>maxEntries?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemorySearchCacheAuthorizationDecision`

Memory Search Cache Authorization Decision 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemorySearchCacheAuthorizationDecision } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

```text
export interface MemorySearchCacheAuthorizationDecision {
    allowed: boolean;
    policyRevision: string;
    expiresAt?: string;
    reason?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowed` | 属性 | <code>allowed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemorySearchCacheAuthorizationPort`

Memory Search Cache Authorization Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemorySearchCacheAuthorizationPort } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

```text
export interface MemorySearchCacheAuthorizationPort {
    authorize(request: ManagedMemorySearchRequest): Promise<MemorySearchCacheAuthorizationDecision>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorize` | 方法 | <code>authorize(request: ManagedMemorySearchRequest): Promise&lt;MemorySearchCacheAuthorizationDecision&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemorySearchCacheEvent`

Memory Search Cache Event 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemorySearchCacheEvent } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ageMs` | 属性 | <code>ageMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: "not_found" &#124; "expired" &#124; "scope_mismatch" &#124; "store_unavailable" &#124; "entry_oversized" &#124; "corrupt" &#124; "revision_changed" &#124; "access_stats_requested" &#124; "profile_revision_missing" &#124; "scope_incomplete" &#124; "invalidation_pending"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "memory.cache.lookup" &#124; "memory.cache.hit" &#124; "memory.cache.miss" &#124; "memory.cache.write" &#124; "memory.cache.invalidate" &#124; "memory.cache.bypass"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemorySearchCacheStore`

Memory Search Cache Store 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemorySearchCacheStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;MemorySearchCacheRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getScopeRevision` | 方法 | <code>getScopeRevision(scopeHash: string): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, record: MemorySearchCacheRecord): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisLikeMemorySearchCacheClient`

Redis Like Memory Search Cache Client 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisLikeMemorySearchCacheClient } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `del` | 方法 | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `incr` | 方法 | <code>incr(key: string): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `pexpire` | 方法 | <code>pexpire(key: string, durationMilliseconds: number): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `sadd` | 方法 | <code>sadd(key: string, ...members: string[]): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, value: string, mode: "PX", durationMilliseconds: number): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `smembers` | 方法 | <code>smembers(key: string): Promise&lt;string[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `srem` | 方法 | <code>srem(key: string, ...members: string[]): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisMemorySearchCacheOptions`

Redis Memory Search Cache Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisMemorySearchCacheOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

```text
export interface RedisMemorySearchCacheOptions {
    client: RedisLikeMemorySearchCacheClient;
    namespace?: string;
    maxEntryBytes?: number;
    now?: () => number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `client` | 属性 | <code>client: RedisLikeMemorySearchCacheClient</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `namespace` | 属性 | <code>namespace?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemorySearchCacheCompositionOptions`

Memory Search Cache Composition Options 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemorySearchCacheCompositionOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

```text
export type MemorySearchCacheCompositionOptions = {
    mode: 'disabled';
    provider: MemoryManagementProvider;
} | (CachedMemoryManagementProviderOptions & {
    mode: 'enabled';
});
```

## `MemorySearchCacheFailureMode`

Memory Search Cache Failure Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemorySearchCacheFailureMode } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

```text
export type MemorySearchCacheFailureMode = 'bypass' | 'strict';
```

## `MemorySearchCacheMode`

Memory Search Cache Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemorySearchCacheMode } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

```text
export type MemorySearchCacheMode = 'enabled' | 'disabled';
```

## `MemorySearchCacheRecord`

Memory Search Cache Record 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemorySearchCacheRecord } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-search-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)

### 声明

```text
export type MemorySearchCacheRecord = z.infer<typeof memorySearchCacheRecordSchema>;
```
