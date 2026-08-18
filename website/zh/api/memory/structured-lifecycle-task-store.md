# `@codesoul-co/hypha-memory` / `structured-lifecycle-task-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/structured-lifecycle-task-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-lifecycle-task-store.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `StructuredMemoryLifecycleTaskStore` | 类 | <code>new StructuredMemoryLifecycleTaskStore(options: StructuredMemoryLifecycleTaskStoreOptions): StructuredMemoryLifecycleTaskStore</code> | Structured Memory Lifecycle Task Store 的运行时实现；公开构造函数与成员见下表。 |
| `StructuredMemoryLifecycleTaskStoreOptions` | 接口 | <code>interface StructuredMemoryLifecycleTaskStoreOptions</code> | Structured Memory Lifecycle Task Store Options 的字段契约；完整字段见下表。 |

## `StructuredMemoryLifecycleTaskStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | complete 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: StructuredMemoryLifecycleTaskStoreOptions): StructuredMemoryLifecycleTaskStore</code> | 创建该类的实例。 |
| `enqueue` | 方法 | <code>enqueue(task: MemoryLifecycleTask): Promise&lt;void&gt;</code> | enqueue 的公开运行时操作。 |
| `fail` | 方法 | <code>fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise&lt;boolean&gt;</code> | fail 的公开运行时操作。 |
| `lease` | 方法 | <code>lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryLifecycleTask[]&gt;</code> | lease 的公开运行时操作。 |
| `list` | 方法 | <code>list(type?: MemoryLifecycleWorkerType): Promise&lt;MemoryLifecycleTask[]&gt;</code> | 列出 list。 |
| `renew` | 方法 | <code>renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | renew 的公开运行时操作。 |

## `StructuredMemoryLifecycleTaskStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `store` | 属性 | <code>store: StructuredStoreProvider</code> | store 字段。 |
| `table` | 属性 | <code>table: string</code> | table 字段。 |
