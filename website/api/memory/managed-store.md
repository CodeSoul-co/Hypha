# `@codesoul-co/hypha-memory` / `managed-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/managed-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)
- Exports: **13**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryManagedMemoryRecordStore` | class | <code>new InMemoryManagedMemoryRecordStore(): InMemoryManagedMemoryRecordStore</code> | Runtime implementation for In Memory Managed Memory Record Store; see its public constructor and members below. |
| `InMemoryMemoryIdempotencyStore` | class | <code>new InMemoryMemoryIdempotencyStore(): InMemoryMemoryIdempotencyStore</code> | Runtime implementation for In Memory Memory Idempotency Store; see its public constructor and members below. |
| `InMemoryMemoryIndexOutboxStore` | class | <code>new InMemoryMemoryIndexOutboxStore(): InMemoryMemoryIndexOutboxStore</code> | Runtime implementation for In Memory Memory Index Outbox Store; see its public constructor and members below. |
| `InMemoryMemoryPersistenceUnitOfWork` | class | <code>new InMemoryMemoryPersistenceUnitOfWork(recordStore?: ManagedMemoryRecordStore, outboxStore?: MemoryIndexOutboxStore): InMemoryMemoryPersistenceUnitOfWork</code> | Runtime implementation for In Memory Memory Persistence Unit Of Work; see its public constructor and members below. |
| `matchesFilter` | function | <code>matchesFilter(record: ManagedMemoryRecord, filter?: MemorySearchFilter): boolean</code> | Public runtime operation for matches Filter. |
| `ManagedMemoryRecordQuery` | interface | <code>interface ManagedMemoryRecordQuery</code> | Field contract for Managed Memory Record Query; see all contract members below. |
| `ManagedMemoryRecordStore` | interface | <code>interface ManagedMemoryRecordStore</code> | Field contract for Managed Memory Record Store; see all contract members below. |
| `MemoryIdempotencyStore` | interface | <code>interface MemoryIdempotencyStore</code> | Field contract for Memory Idempotency Store; see all contract members below. |
| `MemoryIndexOutboxRecord` | interface | <code>interface MemoryIndexOutboxRecord</code> | Field contract for Memory Index Outbox Record; see all contract members below. |
| `MemoryIndexOutboxStore` | interface | <code>interface MemoryIndexOutboxStore</code> | Field contract for Memory Index Outbox Store; see all contract members below. |
| `MemoryPersistenceCapabilities` | interface | <code>interface MemoryPersistenceCapabilities</code> | Field contract for Memory Persistence Capabilities; see all contract members below. |
| `MemoryPersistenceTransaction` | interface | <code>interface MemoryPersistenceTransaction</code> | Field contract for Memory Persistence Transaction; see all contract members below. |
| `MemoryPersistenceUnitOfWork` | interface | <code>interface MemoryPersistenceUnitOfWork extends MemoryPersistenceTransaction</code> | Field contract for Memory Persistence Unit Of Work; see all contract members below. |

## `InMemoryManagedMemoryRecordStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryManagedMemoryRecordStore</code> | Creates an instance of this class. |
| `create` | method | <code>create(record: ManagedMemoryRecord): Promise&lt;ManagedMemoryRecord&gt;</code> | Creates create at this module boundary. |
| `createVersion` | method | <code>createVersion(record: ManagedMemoryRecord, expectedRevision: number): Promise&lt;ManagedMemoryRecord&gt;</code> | Creates Version at this module boundary. |
| `delete` | method | <code>delete(id: string, scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(id: string, scope: ManagedMemoryScope): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `getVersionByScopeHash` | method | <code>getVersionByScopeHash(id: string, versionId: string, scopeHash: string): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets Version By Scope Hash at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(id: string, scope: ManagedMemoryScope): Promise&lt;ManagedMemoryRecord[]&gt;</code> | Public runtime operation for history. |
| `list` | method | <code>list(request: ManagedMemoryRecordQuery): Promise&lt;ManagedMemoryRecord[]&gt;</code> | Lists list at this module boundary. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (store: ManagedMemoryRecordStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public runtime operation for transaction. |
| `updateStatus` | method | <code>updateStatus(id: string, scope: ManagedMemoryScope, expectedRevision: number, status: MemoryStatus, updatedAt: string): Promise&lt;ManagedMemoryRecord&gt;</code> | Public runtime operation for update Status. |

## `InMemoryMemoryIdempotencyStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryMemoryIdempotencyStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scopeHash: string, key: string): Promise&lt;unknown &#124; null&gt;</code> | Gets get at this module boundary. |
| `set` | method | <code>set(scopeHash: string, key: string, result: unknown): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `InMemoryMemoryIndexOutboxStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(id: string, owner: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | Public runtime operation for complete. |
| `constructor` | constructor | <code>(): InMemoryMemoryIndexOutboxStore</code> | Creates an instance of this class. |
| `enqueue` | method | <code>enqueue(record: MemoryIndexOutboxRecord): Promise&lt;void&gt;</code> | Public runtime operation for enqueue. |
| `fail` | method | <code>fail(id: string, owner: string, leaseToken: string, now: string, error: import("./contracts").NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise&lt;boolean&gt;</code> | Public runtime operation for fail. |
| `lease` | method | <code>lease(owner: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | Public runtime operation for lease. |
| `list` | method | <code>list(): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | Lists list at this module boundary. |
| `renew` | method | <code>renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | Public runtime operation for renew. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (store: MemoryIndexOutboxStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public runtime operation for transaction. |

## `InMemoryMemoryPersistenceUnitOfWork` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: MemoryPersistenceCapabilities</code> | Public capabilities property. |
| `constructor` | constructor | <code>(recordStore?: ManagedMemoryRecordStore, outboxStore?: MemoryIndexOutboxStore): InMemoryMemoryPersistenceUnitOfWork</code> | Creates an instance of this class. |
| `outboxStore` | property | <code>outboxStore: MemoryIndexOutboxStore</code> | Public outbox Store property. |
| `recordStore` | property | <code>recordStore: ManagedMemoryRecordStore</code> | Public record Store property. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (stores: MemoryPersistenceTransaction) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public runtime operation for transaction. |

## `ManagedMemoryRecordQuery` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filter` | property | <code>filter: MemorySearchFilter</code> | Public filter property. |
| `includeInvalidated` | property | <code>includeInvalidated: boolean</code> | Public include Invalidated property. |
| `includeSuperseded` | property | <code>includeSuperseded: boolean</code> | Public include Superseded property. |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |

## `ManagedMemoryRecordStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(record: ManagedMemoryRecord): Promise&lt;ManagedMemoryRecord&gt;</code> | Creates create at this module boundary. |
| `createVersion` | method | <code>createVersion(record: ManagedMemoryRecord, expectedRevision: number): Promise&lt;ManagedMemoryRecord&gt;</code> | Creates Version at this module boundary. |
| `delete` | method | <code>delete(id: string, scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(id: string, scope: ManagedMemoryScope): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `getVersionByScopeHash` | method | <code>getVersionByScopeHash(id: string, versionId: string, scopeHash: string): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets Version By Scope Hash at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(id: string, scope: ManagedMemoryScope): Promise&lt;ManagedMemoryRecord[]&gt;</code> | Public runtime operation for history. |
| `list` | method | <code>list(request: ManagedMemoryRecordQuery): Promise&lt;ManagedMemoryRecord[]&gt;</code> | Lists list at this module boundary. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (store: ManagedMemoryRecordStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public runtime operation for transaction. |
| `updateStatus` | method | <code>updateStatus(id: string, scope: ManagedMemoryScope, expectedRevision: number, status: MemoryStatus, updatedAt: string): Promise&lt;ManagedMemoryRecord&gt;</code> | Public runtime operation for update Status. |

## `MemoryIdempotencyStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(scopeHash: string, key: string): Promise&lt;unknown &#124; null&gt;</code> | Gets get at this module boundary. |
| `set` | method | <code>set(scopeHash: string, key: string, result: unknown): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `MemoryIndexOutboxRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `action` | property | <code>action: "delete" &#124; "reindex" &#124; "upsert"</code> | Public action property. |
| `attempts` | property | <code>attempts: number</code> | Public attempts property. |
| `availableAt` | property | <code>availableAt: string</code> | Public available At property. |
| `completedVectorStoreIds` | property | <code>completedVectorStoreIds: string[]</code> | Public completed Vector Store Ids property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `lastError` | property | <code>lastError: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").NormalizedMemoryError</code> | Public last Error property. |
| `leaseExpiresAt` | property | <code>leaseExpiresAt: string</code> | Public lease Expires At property. |
| `leaseOwner` | property | <code>leaseOwner: string</code> | Public lease Owner property. |
| `leaseToken` | property | <code>leaseToken: string</code> | Public lease Token property. |
| `memoryId` | property | <code>memoryId: string</code> | Public memory Id property. |
| `memoryRevision` | property | <code>memoryRevision: number</code> | Logical Memory revision; distinct from this outbox record's lease fencing token. |
| `memoryVersionId` | property | <code>memoryVersionId: string</code> | Public memory Version Id property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `state` | property | <code>state: "completed" &#124; "failed" &#124; "processing" &#124; "pending" &#124; "dead_letter" &#124; "partial"</code> | Public state property. |
| `targetVectorStoreIds` | property | <code>targetVectorStoreIds: string[]</code> | Public target Vector Store Ids property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `MemoryIndexOutboxStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(id: string, owner: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | Public runtime operation for complete. |
| `enqueue` | method | <code>enqueue(record: MemoryIndexOutboxRecord): Promise&lt;void&gt;</code> | Public runtime operation for enqueue. |
| `fail` | method | <code>fail(id: string, owner: string, leaseToken: string, now: string, error: import("./contracts").NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise&lt;boolean&gt;</code> | Public runtime operation for fail. |
| `lease` | method | <code>lease(owner: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | Public runtime operation for lease. |
| `list` | method | <code>list(): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | Lists list at this module boundary. |
| `renew` | method | <code>renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | Public runtime operation for renew. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (store: MemoryIndexOutboxStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public runtime operation for transaction. |

## `MemoryPersistenceCapabilities` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `atomicRecordAndOutbox` | property | <code>atomicRecordAndOutbox: boolean</code> | Public atomic Record And Outbox property. |
| `durable` | property | <code>durable: boolean</code> | Public durable property. |

## `MemoryPersistenceTransaction` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `outboxStore` | property | <code>outboxStore: MemoryIndexOutboxStore</code> | Public outbox Store property. |
| `recordStore` | property | <code>recordStore: ManagedMemoryRecordStore</code> | Public record Store property. |

## `MemoryPersistenceUnitOfWork` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: MemoryPersistenceCapabilities</code> | Public capabilities property. |
| `outboxStore` | property | <code>outboxStore: MemoryIndexOutboxStore</code> | Public outbox Store property. |
| `recordStore` | property | <code>recordStore: ManagedMemoryRecordStore</code> | Public record Store property. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (stores: MemoryPersistenceTransaction) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public runtime operation for transaction. |
