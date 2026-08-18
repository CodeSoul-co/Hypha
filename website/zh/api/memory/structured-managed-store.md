# `@codesoul-co/hypha-memory` / `structured-managed-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/structured-managed-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-managed-store.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `StructuredManagedMemoryRecordStore` | 类 | <code>new StructuredManagedMemoryRecordStore(options: StructuredManagedMemoryRecordStoreOptions): StructuredManagedMemoryRecordStore</code> | Structured Managed Memory Record Store 的运行时实现；公开构造函数与成员见下表。 |
| `StructuredManagedMemoryRecordStoreOptions` | 接口 | <code>interface StructuredManagedMemoryRecordStoreOptions</code> | Structured Managed Memory Record Store Options 的字段契约；完整字段见下表。 |

## `StructuredManagedMemoryRecordStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: StructuredManagedMemoryRecordStoreOptions): StructuredManagedMemoryRecordStore</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(record: ManagedMemoryRecord): Promise&lt;ManagedMemoryRecord&gt;</code> | 创建 create。 |
| `createVersion` | 方法 | <code>createVersion(record: ManagedMemoryRecord, expectedRevision: number): Promise&lt;ManagedMemoryRecord&gt;</code> | 创建 Version。 |
| `delete` | 方法 | <code>delete(id: string, scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(id: string, scope: ManagedMemoryScope): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `getVersionByScopeHash` | 方法 | <code>getVersionByScopeHash(id: string, versionId: string, scopeHash: string): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 Version By Scope Hash。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(id: string, scope: ManagedMemoryScope): Promise&lt;ManagedMemoryRecord[]&gt;</code> | history 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: ManagedMemoryRecordQuery): Promise&lt;ManagedMemoryRecord[]&gt;</code> | 列出 list。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (store: ManagedMemoryRecordStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | transaction 的公开运行时操作。 |
| `updateStatus` | 方法 | <code>updateStatus(id: string, scope: ManagedMemoryScope, expectedRevision: number, status: MemoryStatus, updatedAt: string): Promise&lt;ManagedMemoryRecord&gt;</code> | update Status 的公开运行时操作。 |

## `StructuredManagedMemoryRecordStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `currentTable` | 属性 | <code>currentTable: string</code> | current Table 字段。 |
| `inTransaction` | 属性 | <code>inTransaction: boolean</code> | in Transaction 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `provider` | 属性 | <code>provider: StructuredStoreProvider</code> | provider 字段。 |
| `versionsTable` | 属性 | <code>versionsTable: string</code> | versions Table 字段。 |
