# `@codesoul-co/hypha-memory` / `structured-managed-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/structured-managed-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-managed-store.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。Structured managed store 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  StructuredManagedMemoryRecordStore,
} from '@codesoul-co/hypha-memory';

import type {
  StructuredManagedMemoryRecordStoreOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `StructuredManagedMemoryRecordStore` | 类 | <code>new StructuredManagedMemoryRecordStore(options: StructuredManagedMemoryRecordStoreOptions): StructuredManagedMemoryRecordStore</code> | Structured Managed Memory Record Store 类，共公开 11 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `StructuredManagedMemoryRecordStoreOptions` | 接口 | <code>interface StructuredManagedMemoryRecordStoreOptions</code> | Structured Managed Memory Record Store Options 接口，共包含 5 个公开字段或方法。 |

## `StructuredManagedMemoryRecordStore`

Structured Managed Memory Record Store 类，共公开 11 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { StructuredManagedMemoryRecordStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-managed-store.ts)

### 声明

```text
export declare class StructuredManagedMemoryRecordStore implements ManagedMemoryRecordStore {
    constructor(options: StructuredManagedMemoryRecordStoreOptions);
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
| `constructor` | 构造函数 | <code>(options: StructuredManagedMemoryRecordStoreOptions): StructuredManagedMemoryRecordStore</code> | 创建该类的实例。 |
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

## `StructuredManagedMemoryRecordStoreOptions`

Structured Managed Memory Record Store Options 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StructuredManagedMemoryRecordStoreOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-managed-store.ts)

### 声明

```text
export interface StructuredManagedMemoryRecordStoreOptions {
    provider: StructuredStoreProvider;
    currentTable?: string;
    versionsTable?: string;
    inTransaction?: boolean;
    now?: () => Date;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `currentTable` | 属性 | <code>currentTable?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inTransaction` | 属性 | <code>inTransaction?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `provider` | 属性 | <code>provider: StructuredStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionsTable` | 属性 | <code>versionsTable?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
