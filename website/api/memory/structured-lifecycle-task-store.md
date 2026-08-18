# `@codesoul-co/hypha-memory` / `structured-lifecycle-task-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/structured-lifecycle-task-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-lifecycle-task-store.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `StructuredMemoryLifecycleTaskStore` | class | <code>new StructuredMemoryLifecycleTaskStore(options: StructuredMemoryLifecycleTaskStoreOptions): StructuredMemoryLifecycleTaskStore</code> | Runtime implementation for Structured Memory Lifecycle Task Store; see its public constructor and members below. |
| `StructuredMemoryLifecycleTaskStoreOptions` | interface | <code>interface StructuredMemoryLifecycleTaskStoreOptions</code> | Field contract for Structured Memory Lifecycle Task Store Options; see all contract members below. |

## `StructuredMemoryLifecycleTaskStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | Public runtime operation for complete. |
| `constructor` | constructor | <code>(options: StructuredMemoryLifecycleTaskStoreOptions): StructuredMemoryLifecycleTaskStore</code> | Creates an instance of this class. |
| `enqueue` | method | <code>enqueue(task: MemoryLifecycleTask): Promise&lt;void&gt;</code> | Public runtime operation for enqueue. |
| `fail` | method | <code>fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise&lt;boolean&gt;</code> | Public runtime operation for fail. |
| `lease` | method | <code>lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryLifecycleTask[]&gt;</code> | Public runtime operation for lease. |
| `list` | method | <code>list(type?: MemoryLifecycleWorkerType): Promise&lt;MemoryLifecycleTask[]&gt;</code> | Lists list at this module boundary. |
| `renew` | method | <code>renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | Public runtime operation for renew. |

## `StructuredMemoryLifecycleTaskStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `store` | property | <code>store: StructuredStoreProvider</code> | Public store property. |
| `table` | property | <code>table: string</code> | Public table property. |
