# `@codesoul-co/hypha-memory` / `structured-memory-persistence`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/structured-memory-persistence.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-memory-persistence.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `StructuredMemoryIndexOutboxStore` | class | <code>new StructuredMemoryIndexOutboxStore(options: StructuredMemoryIndexOutboxStoreOptions): StructuredMemoryIndexOutboxStore</code> | Runtime implementation for Structured Memory Index Outbox Store; see its public constructor and members below. |
| `StructuredMemoryPersistenceUnitOfWork` | class | <code>new StructuredMemoryPersistenceUnitOfWork(options: StructuredMemoryPersistenceUnitOfWorkOptions): StructuredMemoryPersistenceUnitOfWork</code> | Runtime implementation for Structured Memory Persistence Unit Of Work; see its public constructor and members below. |
| `StructuredMemoryIndexOutboxStoreOptions` | interface | <code>interface StructuredMemoryIndexOutboxStoreOptions</code> | Field contract for Structured Memory Index Outbox Store Options; see all contract members below. |
| `StructuredMemoryPersistenceUnitOfWorkOptions` | interface | <code>interface StructuredMemoryPersistenceUnitOfWorkOptions</code> | Field contract for Structured Memory Persistence Unit Of Work Options; see all contract members below. |

## `StructuredMemoryIndexOutboxStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(id: string, owner: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | Public runtime operation for complete. |
| `constructor` | constructor | <code>(options: StructuredMemoryIndexOutboxStoreOptions): StructuredMemoryIndexOutboxStore</code> | Creates an instance of this class. |
| `enqueue` | method | <code>enqueue(record: MemoryIndexOutboxRecord): Promise&lt;void&gt;</code> | Public runtime operation for enqueue. |
| `fail` | method | <code>fail(id: string, owner: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise&lt;boolean&gt;</code> | Public runtime operation for fail. |
| `lease` | method | <code>lease(owner: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | Public runtime operation for lease. |
| `list` | method | <code>list(): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | Lists list at this module boundary. |
| `renew` | method | <code>renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | Public runtime operation for renew. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (store: MemoryIndexOutboxStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public runtime operation for transaction. |

## `StructuredMemoryPersistenceUnitOfWork` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: MemoryPersistenceCapabilities</code> | Public capabilities property. |
| `constructor` | constructor | <code>(options: StructuredMemoryPersistenceUnitOfWorkOptions): StructuredMemoryPersistenceUnitOfWork</code> | Creates an instance of this class. |
| `outboxStore` | property | <code>outboxStore: StructuredMemoryIndexOutboxStore</code> | Public outbox Store property. |
| `recordStore` | property | <code>recordStore: StructuredManagedMemoryRecordStore</code> | Public record Store property. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (stores: MemoryPersistenceTransaction) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public runtime operation for transaction. |

## `StructuredMemoryIndexOutboxStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `inTransaction` | property | <code>inTransaction: boolean</code> | Public in Transaction property. |
| `provider` | property | <code>provider: StructuredStoreProvider</code> | Public provider property. |
| `table` | property | <code>table: string</code> | Public table property. |

## `StructuredMemoryPersistenceUnitOfWorkOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `currentTable` | property | <code>currentTable: string</code> | Public current Table property. |
| `outboxTable` | property | <code>outboxTable: string</code> | Public outbox Table property. |
| `provider` | property | <code>provider: StructuredStoreProvider</code> | Public provider property. |
| `versionsTable` | property | <code>versionsTable: string</code> | Public versions Table property. |
