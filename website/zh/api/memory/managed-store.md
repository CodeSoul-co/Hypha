# `@codesoul-co/hypha-memory` / `managed-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/managed-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)
- 导出数: **13**

## 模块用法

用于持久化并读取该边界的数据。Managed store 模块公开 4 类、1 函数、8 接口。

### 从包入口导入

```ts
import {
  InMemoryManagedMemoryRecordStore,
  InMemoryMemoryIdempotencyStore,
  InMemoryMemoryIndexOutboxStore,
  InMemoryMemoryPersistenceUnitOfWork,
  matchesFilter,
} from '@codesoul-co/hypha-memory';

import type {
  ManagedMemoryRecordQuery,
  ManagedMemoryRecordStore,
  MemoryIdempotencyStore,
  MemoryIndexOutboxRecord,
  MemoryIndexOutboxStore,
  MemoryPersistenceCapabilities,
  MemoryPersistenceTransaction,
  MemoryPersistenceUnitOfWork,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 8 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 4 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryManagedMemoryRecordStore` | 类 | <code>new InMemoryManagedMemoryRecordStore(): InMemoryManagedMemoryRecordStore</code> | In Memory Managed Memory Record Store 类，共公开 11 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryMemoryIdempotencyStore` | 类 | <code>new InMemoryMemoryIdempotencyStore(): InMemoryMemoryIdempotencyStore</code> | In Memory Memory Idempotency Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryMemoryIndexOutboxStore` | 类 | <code>new InMemoryMemoryIndexOutboxStore(): InMemoryMemoryIndexOutboxStore</code> | In Memory Memory Index Outbox Store 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryMemoryPersistenceUnitOfWork` | 类 | <code>new InMemoryMemoryPersistenceUnitOfWork(recordStore?: ManagedMemoryRecordStore, outboxStore?: MemoryIndexOutboxStore): InMemoryMemoryPersistenceUnitOfWork</code> | In Memory Memory Persistence Unit Of Work 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `matchesFilter` | 函数 | <code>matchesFilter(record: ManagedMemoryRecord, filter?: MemorySearchFilter): boolean</code> | Matches Filter 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ManagedMemoryRecordQuery` | 接口 | <code>interface ManagedMemoryRecordQuery</code> | Managed Memory Record Query 接口，共包含 5 个公开字段或方法。 |
| `ManagedMemoryRecordStore` | 接口 | <code>interface ManagedMemoryRecordStore</code> | Managed Memory Record Store 接口，共包含 10 个公开字段或方法。 |
| `MemoryIdempotencyStore` | 接口 | <code>interface MemoryIdempotencyStore</code> | Memory Idempotency Store 接口，共包含 2 个公开字段或方法。 |
| `MemoryIndexOutboxRecord` | 接口 | <code>interface MemoryIndexOutboxRecord</code> | Memory Index Outbox Record 接口，共包含 19 个公开字段或方法。 |
| `MemoryIndexOutboxStore` | 接口 | <code>interface MemoryIndexOutboxStore</code> | Memory Index Outbox Store 接口，共包含 7 个公开字段或方法。 |
| `MemoryPersistenceCapabilities` | 接口 | <code>interface MemoryPersistenceCapabilities</code> | Memory Persistence Capabilities 接口，共包含 2 个公开字段或方法。 |
| `MemoryPersistenceTransaction` | 接口 | <code>interface MemoryPersistenceTransaction</code> | Memory Persistence Transaction 接口，共包含 2 个公开字段或方法。 |
| `MemoryPersistenceUnitOfWork` | 接口 | <code>interface MemoryPersistenceUnitOfWork extends MemoryPersistenceTransaction</code> | Memory Persistence Unit Of Work 接口，共包含 4 个公开字段或方法。 |

## `InMemoryManagedMemoryRecordStore`

In Memory Managed Memory Record Store 类，共公开 11 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryManagedMemoryRecordStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### 声明

```text
export declare class InMemoryManagedMemoryRecordStore implements ManagedMemoryRecordStore {
    create(record: ManagedMemoryRecord): Promise<ManagedMemoryRecord>;
    get(id: string, scope: ManagedMemoryScope): Promise<ManagedMemoryRecord | null>;
    getVersionByScopeHash(id: string, versionId: string, scopeHash: string): Promise<ManagedMemoryRecord | null>;
    list(request: ManagedMemoryRecordQuery): Promise<ManagedMemoryRecord[]>;
    createVersion(record: ManagedMemoryRecord, expectedRevision: number): Promise<ManagedMemoryRecord>;
    updateStatus(id: string, scope: ManagedMemoryScope, expectedRevision: number, status: MemoryStatus, updatedAt: string): Promise<ManagedMemoryRecord>;
    delete(id: string, scope: ManagedMemoryScope): Promise<void>;
    history(id: string, scope: ManagedMemoryScope): Promise<ManagedMemoryRecord[]>;
    transaction<T>(fn: (store: ManagedMemoryRecordStore) => Promise<T>): Promise<T>;
    health(): Promise<ProviderHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryManagedMemoryRecordStore</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(record: ManagedMemoryRecord): Promise&lt;ManagedMemoryRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `createVersion` | 方法 | <code>createVersion(record: ManagedMemoryRecord, expectedRevision: number): Promise&lt;ManagedMemoryRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(id: string, scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(id: string, scope: ManagedMemoryScope): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getVersionByScopeHash` | 方法 | <code>getVersionByScopeHash(id: string, versionId: string, scopeHash: string): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(id: string, scope: ManagedMemoryScope): Promise&lt;ManagedMemoryRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: ManagedMemoryRecordQuery): Promise&lt;ManagedMemoryRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (store: ManagedMemoryRecordStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `updateStatus` | 方法 | <code>updateStatus(id: string, scope: ManagedMemoryScope, expectedRevision: number, status: MemoryStatus, updatedAt: string): Promise&lt;ManagedMemoryRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryMemoryIdempotencyStore`

In Memory Memory Idempotency Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryMemoryIdempotencyStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### 声明

```text
export declare class InMemoryMemoryIdempotencyStore implements MemoryIdempotencyStore {
    get(scopeHash: string, key: string): Promise<unknown | null>;
    set(scopeHash: string, key: string, result: unknown): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryMemoryIdempotencyStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scopeHash: string, key: string): Promise&lt;unknown &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(scopeHash: string, key: string, result: unknown): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryMemoryIndexOutboxStore`

In Memory Memory Index Outbox Store 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryMemoryIndexOutboxStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### 声明

```text
export declare class InMemoryMemoryIndexOutboxStore implements MemoryIndexOutboxStore {
    enqueue(record: MemoryIndexOutboxRecord): Promise<void>;
    lease(owner: string, now: string, leaseUntil: string, limit: number): Promise<MemoryIndexOutboxRecord[]>;
    renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise<boolean>;
    complete(id: string, owner: string, leaseToken: string, now: string): Promise<boolean>;
    fail(id: string, owner: string, leaseToken: string, now: string, error: import('./contracts').NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise<boolean>;
    list(): Promise<MemoryIndexOutboxRecord[]>;
    transaction<T>(fn: (store: MemoryIndexOutboxStore) => Promise<T>): Promise<T>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(id: string, owner: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): InMemoryMemoryIndexOutboxStore</code> | 创建该类的实例。 |
| `enqueue` | 方法 | <code>enqueue(record: MemoryIndexOutboxRecord): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fail` | 方法 | <code>fail(id: string, owner: string, leaseToken: string, now: string, error: import("./contracts").NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `lease` | 方法 | <code>lease(owner: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (store: MemoryIndexOutboxStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryMemoryPersistenceUnitOfWork`

In Memory Memory Persistence Unit Of Work 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryMemoryPersistenceUnitOfWork } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### 声明

```text
export declare class InMemoryMemoryPersistenceUnitOfWork implements MemoryPersistenceUnitOfWork {
    readonly recordStore: ManagedMemoryRecordStore;
    readonly outboxStore: MemoryIndexOutboxStore;
    readonly capabilities: MemoryPersistenceCapabilities;
    constructor(recordStore?: ManagedMemoryRecordStore, outboxStore?: MemoryIndexOutboxStore);
    transaction<T>(fn: (stores: MemoryPersistenceTransaction) => Promise<T>): Promise<T>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>readonly capabilities: MemoryPersistenceCapabilities</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(recordStore?: ManagedMemoryRecordStore, outboxStore?: MemoryIndexOutboxStore): InMemoryMemoryPersistenceUnitOfWork</code> | 创建该类的实例。 |
| `outboxStore` | 属性 | <code>readonly outboxStore: MemoryIndexOutboxStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordStore` | 属性 | <code>readonly recordStore: ManagedMemoryRecordStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (stores: MemoryPersistenceTransaction) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `matchesFilter`

Matches Filter 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { matchesFilter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### 声明

```text
export declare function matchesFilter(record: ManagedMemoryRecord, filter?: MemorySearchFilter): boolean;
```

### 调用签名

```text
matchesFilter(record: ManagedMemoryRecord, filter?: MemorySearchFilter): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `record` | <code>ManagedMemoryRecord&lt;unknown&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `filter` | <code>MemorySearchFilter</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `ManagedMemoryRecordQuery`

Managed Memory Record Query 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedMemoryRecordQuery } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### 声明

```text
export interface ManagedMemoryRecordQuery {
    scope: ManagedMemoryScope;
    filter?: MemorySearchFilter;
    includeSuperseded?: boolean;
    includeInvalidated?: boolean;
    limit?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filter` | 属性 | <code>filter?: MemorySearchFilter</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeInvalidated` | 属性 | <code>includeInvalidated?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeSuperseded` | 属性 | <code>includeSuperseded?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `limit` | 属性 | <code>limit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManagedMemoryRecordStore`

Managed Memory Record Store 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedMemoryRecordStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### 声明

```text
export interface ManagedMemoryRecordStore {
    create(record: ManagedMemoryRecord): Promise<ManagedMemoryRecord>;
    get(id: string, scope: ManagedMemoryScope): Promise<ManagedMemoryRecord | null>;
    getVersionByScopeHash(id: string, versionId: string, scopeHash: string): Promise<ManagedMemoryRecord | null>;
    list(request: ManagedMemoryRecordQuery): Promise<ManagedMemoryRecord[]>;
    createVersion(record: ManagedMemoryRecord, expectedRevision: number): Promise<ManagedMemoryRecord>;
    updateStatus(id: string, scope: ManagedMemoryScope, expectedRevision: number, status: MemoryStatus, updatedAt: string): Promise<ManagedMemoryRecord>;
    delete(id: string, scope: ManagedMemoryScope): Promise<void>;
    history(id: string, scope: ManagedMemoryScope): Promise<ManagedMemoryRecord[]>;
    transaction<T>(fn: (store: ManagedMemoryRecordStore) => Promise<T>): Promise<T>;
    health(): Promise<ProviderHealth>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(record: ManagedMemoryRecord): Promise&lt;ManagedMemoryRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `createVersion` | 方法 | <code>createVersion(record: ManagedMemoryRecord, expectedRevision: number): Promise&lt;ManagedMemoryRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(id: string, scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(id: string, scope: ManagedMemoryScope): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getVersionByScopeHash` | 方法 | <code>getVersionByScopeHash(id: string, versionId: string, scopeHash: string): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(id: string, scope: ManagedMemoryScope): Promise&lt;ManagedMemoryRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: ManagedMemoryRecordQuery): Promise&lt;ManagedMemoryRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (store: ManagedMemoryRecordStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `updateStatus` | 方法 | <code>updateStatus(id: string, scope: ManagedMemoryScope, expectedRevision: number, status: MemoryStatus, updatedAt: string): Promise&lt;ManagedMemoryRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryIdempotencyStore`

Memory Idempotency Store 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryIdempotencyStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### 声明

```text
export interface MemoryIdempotencyStore {
    get(scopeHash: string, key: string): Promise<unknown | null>;
    set(scopeHash: string, key: string, result: unknown): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(scopeHash: string, key: string): Promise&lt;unknown &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(scopeHash: string, key: string, result: unknown): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryIndexOutboxRecord`

Memory Index Outbox Record 接口，共包含 19 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryIndexOutboxRecord } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### 声明

```text
export interface MemoryIndexOutboxRecord {
    id: string;
    operationId: string;
    memoryId: string;
    memoryVersionId: string;
    /** Logical Memory revision; distinct from this outbox record's lease fencing token. */
    memoryRevision?: number;
    scopeHash: string;
    action: 'upsert' | 'delete' | 'reindex';
    targetVectorStoreIds: string[];
    state: 'pending' | 'processing' | 'completed' | 'partial' | 'failed' | 'dead_letter';
    attempts: number;
    availableAt: string;
    completedVectorStoreIds?: string[];
    leaseOwner?: string;
    leaseToken?: string;
    leaseExpiresAt?: string;
    fencingToken?: number;
    lastError?: import('./contracts').NormalizedMemoryError;
    createdAt: string;
    updatedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `action` | 属性 | <code>action: "delete" &#124; "reindex" &#124; "upsert"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `attempts` | 属性 | <code>attempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `availableAt` | 属性 | <code>availableAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completedVectorStoreIds` | 属性 | <code>completedVectorStoreIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastError` | 属性 | <code>lastError?: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseExpiresAt` | 属性 | <code>leaseExpiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseOwner` | 属性 | <code>leaseOwner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseToken` | 属性 | <code>leaseToken?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryRevision` | 属性 | <code>memoryRevision?: number</code> | Logical Memory revision; distinct from this outbox record's lease fencing token. |
| `memoryVersionId` | 属性 | <code>memoryVersionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: "completed" &#124; "failed" &#124; "processing" &#124; "pending" &#124; "dead_letter" &#124; "partial"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetVectorStoreIds` | 属性 | <code>targetVectorStoreIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryIndexOutboxStore`

Memory Index Outbox Store 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryIndexOutboxStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### 声明

```text
export interface MemoryIndexOutboxStore {
    enqueue(record: MemoryIndexOutboxRecord): Promise<void>;
    lease(owner: string, now: string, leaseUntil: string, limit: number): Promise<MemoryIndexOutboxRecord[]>;
    renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise<boolean>;
    complete(id: string, owner: string, leaseToken: string, now: string): Promise<boolean>;
    fail(id: string, owner: string, leaseToken: string, now: string, error: import('./contracts').NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise<boolean>;
    list(): Promise<MemoryIndexOutboxRecord[]>;
    transaction<T>(fn: (store: MemoryIndexOutboxStore) => Promise<T>): Promise<T>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(id: string, owner: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `enqueue` | 方法 | <code>enqueue(record: MemoryIndexOutboxRecord): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fail` | 方法 | <code>fail(id: string, owner: string, leaseToken: string, now: string, error: import("./contracts").NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `lease` | 方法 | <code>lease(owner: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (store: MemoryIndexOutboxStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryPersistenceCapabilities`

Memory Persistence Capabilities 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryPersistenceCapabilities } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### 声明

```text
export interface MemoryPersistenceCapabilities {
    durable: boolean;
    atomicRecordAndOutbox: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `atomicRecordAndOutbox` | 属性 | <code>atomicRecordAndOutbox: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `durable` | 属性 | <code>durable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryPersistenceTransaction`

Memory Persistence Transaction 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryPersistenceTransaction } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### 声明

```text
export interface MemoryPersistenceTransaction {
    recordStore: ManagedMemoryRecordStore;
    outboxStore: MemoryIndexOutboxStore;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `outboxStore` | 属性 | <code>outboxStore: MemoryIndexOutboxStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordStore` | 属性 | <code>recordStore: ManagedMemoryRecordStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryPersistenceUnitOfWork`

Memory Persistence Unit Of Work 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryPersistenceUnitOfWork } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### 声明

```text
export interface MemoryPersistenceUnitOfWork extends MemoryPersistenceTransaction {
    capabilities: MemoryPersistenceCapabilities;
    transaction<T>(fn: (stores: MemoryPersistenceTransaction) => Promise<T>): Promise<T>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: MemoryPersistenceCapabilities</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outboxStore` | 属性 | <code>outboxStore: MemoryIndexOutboxStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordStore` | 属性 | <code>recordStore: ManagedMemoryRecordStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (stores: MemoryPersistenceTransaction) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
