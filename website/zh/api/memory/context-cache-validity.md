# `@codesoul-co/hypha-memory` / `context-cache-validity`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/context-cache-validity.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)
- 导出数: **7**

## 模块用法

用于读写或协调缓存状态。Context cache validity 模块公开 2 类、1 函数、4 接口。

### 从包入口导入

```ts
import {
  InMemoryContextEnvelopeCacheStore,
  VersionValidContextCache,
  createContextCacheValidityHash,
} from '@codesoul-co/hypha-memory';

import type {
  ContextCacheVersionSnapshot,
  ContextEnvelopeCacheStore,
  VersionValidContextCacheOptions,
  VersionValidContextCacheRecord,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryContextEnvelopeCacheStore` | 类 | <code>new InMemoryContextEnvelopeCacheStore(): InMemoryContextEnvelopeCacheStore</code> | In Memory Context Envelope Cache Store 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `VersionValidContextCache` | 类 | <code>new VersionValidContextCache(options: VersionValidContextCacheOptions): VersionValidContextCache</code> | Version Valid Context Cache 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `createContextCacheValidityHash` | 函数 | <code>createContextCacheValidityHash(snapshot: ContextCacheVersionSnapshot): string</code> | Create Context Cache Validity Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ContextCacheVersionSnapshot` | 接口 | <code>interface ContextCacheVersionSnapshot</code> | Context Cache Version Snapshot 接口，共包含 9 个公开字段或方法。 |
| `ContextEnvelopeCacheStore` | 接口 | <code>interface ContextEnvelopeCacheStore</code> | Context Envelope Cache Store 接口，共包含 4 个公开字段或方法。 |
| `VersionValidContextCacheOptions` | 接口 | <code>interface VersionValidContextCacheOptions</code> | Version Valid Context Cache Options 接口，共包含 5 个公开字段或方法。 |
| `VersionValidContextCacheRecord` | 接口 | <code>interface VersionValidContextCacheRecord</code> | Version Valid Context Cache Record 接口，共包含 7 个公开字段或方法。 |

## `InMemoryContextEnvelopeCacheStore`

In Memory Context Envelope Cache Store 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryContextEnvelopeCacheStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-cache-validity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)

### 声明

```text
export declare class InMemoryContextEnvelopeCacheStore implements ContextEnvelopeCacheStore {
    get(key: string): Promise<VersionValidContextCacheRecord | null>;
    set(key: string, value: VersionValidContextCacheRecord): Promise<void>;
    delete(key: string): Promise<void>;
    invalidateScope(scopeHash: string): Promise<number>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryContextEnvelopeCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;VersionValidContextCacheRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, value: VersionValidContextCacheRecord): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `VersionValidContextCache`

Version Valid Context Cache 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { VersionValidContextCache } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-cache-validity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)

### 声明

```text
export declare class VersionValidContextCache implements MemoryProjectionInvalidationTarget {
    readonly id: string;
    constructor(options: VersionValidContextCacheOptions);
    invalidateScope(scopeHash: string): Promise<number>;
    get(key: string, current: ContextCacheVersionSnapshot): Promise<ContextEnvelope | null>;
    set(key: string, envelope: ContextEnvelope, snapshot: ContextCacheVersionSnapshot, expiresAt?: string): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: VersionValidContextCacheOptions): VersionValidContextCache</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(key: string, current: ContextCacheVersionSnapshot): Promise&lt;ContextEnvelope &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, envelope: ContextEnvelope, snapshot: ContextCacheVersionSnapshot, expiresAt?: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `createContextCacheValidityHash`

Create Context Cache Validity Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createContextCacheValidityHash } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-cache-validity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)

### 声明

```text
export declare function createContextCacheValidityHash(snapshot: ContextCacheVersionSnapshot): string;
```

### 调用签名

```text
createContextCacheValidityHash(snapshot: ContextCacheVersionSnapshot): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `snapshot` | <code>ContextCacheVersionSnapshot</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `ContextCacheVersionSnapshot`

Context Cache Version Snapshot 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextCacheVersionSnapshot } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-cache-validity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)

### 声明

```text
export interface ContextCacheVersionSnapshot {
    contextProfileRevision: string;
    memoryProfileRevision: string;
    scopeHash: string;
    providerRevision?: string;
    policyRevision?: string;
    mutationGeneration: string;
    selectedMemoryVersionIds: string[];
    sourceHashes: Record<string, string>;
    artifactHashes?: Record<string, string>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactHashes` | 属性 | <code>artifactHashes?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextProfileRevision` | 属性 | <code>contextProfileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryProfileRevision` | 属性 | <code>memoryProfileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mutationGeneration` | 属性 | <code>mutationGeneration: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `selectedMemoryVersionIds` | 属性 | <code>selectedMemoryVersionIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceHashes` | 属性 | <code>sourceHashes: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextEnvelopeCacheStore`

Context Envelope Cache Store 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextEnvelopeCacheStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-cache-validity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)

### 声明

```text
export interface ContextEnvelopeCacheStore {
    get(key: string): Promise<VersionValidContextCacheRecord | null>;
    set(key: string, value: VersionValidContextCacheRecord): Promise<void>;
    delete(key: string): Promise<void>;
    invalidateScope(scopeHash: string): Promise<number>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;VersionValidContextCacheRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, value: VersionValidContextCacheRecord): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `VersionValidContextCacheOptions`

Version Valid Context Cache Options 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { VersionValidContextCacheOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-cache-validity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)

### 声明

```text
export interface VersionValidContextCacheOptions {
    store: ContextEnvelopeCacheStore;
    now?: () => string;
    artifactStore?: ContextArtifactStore;
    projectionId?: string;
    generations?: MemoryMutationGenerationStore;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactStore` | 属性 | <code>artifactStore?: ContextArtifactStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `generations` | 属性 | <code>generations?: MemoryMutationGenerationStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projectionId` | 属性 | <code>projectionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `store` | 属性 | <code>store: ContextEnvelopeCacheStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `VersionValidContextCacheRecord`

Version Valid Context Cache Record 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { VersionValidContextCacheRecord } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-cache-validity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)

### 声明

```text
export interface VersionValidContextCacheRecord {
    key: string;
    envelope: ContextEnvelope;
    snapshot: ContextCacheVersionSnapshot;
    validityHash: string;
    envelopeHash: string;
    createdAt: string;
    expiresAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `envelope` | 属性 | <code>envelope: ContextEnvelope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `envelopeHash` | 属性 | <code>envelopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshot` | 属性 | <code>snapshot: ContextCacheVersionSnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validityHash` | 属性 | <code>validityHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
