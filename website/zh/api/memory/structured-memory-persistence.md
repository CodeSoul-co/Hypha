# `@codesoul-co/hypha-memory` / `structured-memory-persistence`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/structured-memory-persistence.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-memory-persistence.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `StructuredMemoryIndexOutboxStore` | 类 | <code>new StructuredMemoryIndexOutboxStore(options: StructuredMemoryIndexOutboxStoreOptions): StructuredMemoryIndexOutboxStore</code> | Structured Memory Index Outbox Store 的运行时实现；公开构造函数与成员见下表。 |
| `StructuredMemoryPersistenceUnitOfWork` | 类 | <code>new StructuredMemoryPersistenceUnitOfWork(options: StructuredMemoryPersistenceUnitOfWorkOptions): StructuredMemoryPersistenceUnitOfWork</code> | Structured Memory Persistence Unit Of Work 的运行时实现；公开构造函数与成员见下表。 |
| `StructuredMemoryIndexOutboxStoreOptions` | 接口 | <code>interface StructuredMemoryIndexOutboxStoreOptions</code> | Structured Memory Index Outbox Store Options 的字段契约；完整字段见下表。 |
| `StructuredMemoryPersistenceUnitOfWorkOptions` | 接口 | <code>interface StructuredMemoryPersistenceUnitOfWorkOptions</code> | Structured Memory Persistence Unit Of Work Options 的字段契约；完整字段见下表。 |

## `StructuredMemoryIndexOutboxStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(id: string, owner: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | complete 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: StructuredMemoryIndexOutboxStoreOptions): StructuredMemoryIndexOutboxStore</code> | 创建该类的实例。 |
| `enqueue` | 方法 | <code>enqueue(record: MemoryIndexOutboxRecord): Promise&lt;void&gt;</code> | enqueue 的公开运行时操作。 |
| `fail` | 方法 | <code>fail(id: string, owner: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise&lt;boolean&gt;</code> | fail 的公开运行时操作。 |
| `lease` | 方法 | <code>lease(owner: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | lease 的公开运行时操作。 |
| `list` | 方法 | <code>list(): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | 列出 list。 |
| `renew` | 方法 | <code>renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | renew 的公开运行时操作。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (store: MemoryIndexOutboxStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | transaction 的公开运行时操作。 |

## `StructuredMemoryPersistenceUnitOfWork` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: MemoryPersistenceCapabilities</code> | capabilities 字段。 |
| `constructor` | 构造函数 | <code>(options: StructuredMemoryPersistenceUnitOfWorkOptions): StructuredMemoryPersistenceUnitOfWork</code> | 创建该类的实例。 |
| `outboxStore` | 属性 | <code>outboxStore: StructuredMemoryIndexOutboxStore</code> | outbox Store 字段。 |
| `recordStore` | 属性 | <code>recordStore: StructuredManagedMemoryRecordStore</code> | record Store 字段。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (stores: MemoryPersistenceTransaction) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | transaction 的公开运行时操作。 |

## `StructuredMemoryIndexOutboxStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `inTransaction` | 属性 | <code>inTransaction: boolean</code> | in Transaction 字段。 |
| `provider` | 属性 | <code>provider: StructuredStoreProvider</code> | provider 字段。 |
| `table` | 属性 | <code>table: string</code> | table 字段。 |

## `StructuredMemoryPersistenceUnitOfWorkOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `currentTable` | 属性 | <code>currentTable: string</code> | current Table 字段。 |
| `outboxTable` | 属性 | <code>outboxTable: string</code> | outbox Table 字段。 |
| `provider` | 属性 | <code>provider: StructuredStoreProvider</code> | provider 字段。 |
| `versionsTable` | 属性 | <code>versionsTable: string</code> | versions Table 字段。 |
