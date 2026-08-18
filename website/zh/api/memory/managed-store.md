# `@codesoul-co/hypha-memory` / `managed-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/managed-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)
- 导出数: **13**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryManagedMemoryRecordStore` | 类 | <code>new InMemoryManagedMemoryRecordStore(): InMemoryManagedMemoryRecordStore</code> | In Memory Managed Memory Record Store 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryMemoryIdempotencyStore` | 类 | <code>new InMemoryMemoryIdempotencyStore(): InMemoryMemoryIdempotencyStore</code> | In Memory Memory Idempotency Store 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryMemoryIndexOutboxStore` | 类 | <code>new InMemoryMemoryIndexOutboxStore(): InMemoryMemoryIndexOutboxStore</code> | In Memory Memory Index Outbox Store 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryMemoryPersistenceUnitOfWork` | 类 | <code>new InMemoryMemoryPersistenceUnitOfWork(recordStore?: ManagedMemoryRecordStore, outboxStore?: MemoryIndexOutboxStore): InMemoryMemoryPersistenceUnitOfWork</code> | In Memory Memory Persistence Unit Of Work 的运行时实现；公开构造函数与成员见下表。 |
| `matchesFilter` | 函数 | <code>matchesFilter(record: ManagedMemoryRecord, filter?: MemorySearchFilter): boolean</code> | matches Filter 的公开运行时操作。 |
| `ManagedMemoryRecordQuery` | 接口 | <code>interface ManagedMemoryRecordQuery</code> | Managed Memory Record Query 的字段契约；完整字段见下表。 |
| `ManagedMemoryRecordStore` | 接口 | <code>interface ManagedMemoryRecordStore</code> | Managed Memory Record Store 的字段契约；完整字段见下表。 |
| `MemoryIdempotencyStore` | 接口 | <code>interface MemoryIdempotencyStore</code> | Memory Idempotency Store 的字段契约；完整字段见下表。 |
| `MemoryIndexOutboxRecord` | 接口 | <code>interface MemoryIndexOutboxRecord</code> | Memory Index Outbox Record 的字段契约；完整字段见下表。 |
| `MemoryIndexOutboxStore` | 接口 | <code>interface MemoryIndexOutboxStore</code> | Memory Index Outbox Store 的字段契约；完整字段见下表。 |
| `MemoryPersistenceCapabilities` | 接口 | <code>interface MemoryPersistenceCapabilities</code> | Memory Persistence Capabilities 的字段契约；完整字段见下表。 |
| `MemoryPersistenceTransaction` | 接口 | <code>interface MemoryPersistenceTransaction</code> | Memory Persistence Transaction 的字段契约；完整字段见下表。 |
| `MemoryPersistenceUnitOfWork` | 接口 | <code>interface MemoryPersistenceUnitOfWork extends MemoryPersistenceTransaction</code> | Memory Persistence Unit Of Work 的字段契约；完整字段见下表。 |

## `InMemoryManagedMemoryRecordStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryManagedMemoryRecordStore</code> | 创建该类的实例。 |
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

## `InMemoryMemoryIdempotencyStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryMemoryIdempotencyStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scopeHash: string, key: string): Promise&lt;unknown &#124; null&gt;</code> | 读取 get。 |
| `set` | 方法 | <code>set(scopeHash: string, key: string, result: unknown): Promise&lt;void&gt;</code> | 写入 set。 |

## `InMemoryMemoryIndexOutboxStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(id: string, owner: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | complete 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(): InMemoryMemoryIndexOutboxStore</code> | 创建该类的实例。 |
| `enqueue` | 方法 | <code>enqueue(record: MemoryIndexOutboxRecord): Promise&lt;void&gt;</code> | enqueue 的公开运行时操作。 |
| `fail` | 方法 | <code>fail(id: string, owner: string, leaseToken: string, now: string, error: import("./contracts").NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise&lt;boolean&gt;</code> | fail 的公开运行时操作。 |
| `lease` | 方法 | <code>lease(owner: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | lease 的公开运行时操作。 |
| `list` | 方法 | <code>list(): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | 列出 list。 |
| `renew` | 方法 | <code>renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | renew 的公开运行时操作。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (store: MemoryIndexOutboxStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | transaction 的公开运行时操作。 |

## `InMemoryMemoryPersistenceUnitOfWork` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: MemoryPersistenceCapabilities</code> | capabilities 字段。 |
| `constructor` | 构造函数 | <code>(recordStore?: ManagedMemoryRecordStore, outboxStore?: MemoryIndexOutboxStore): InMemoryMemoryPersistenceUnitOfWork</code> | 创建该类的实例。 |
| `outboxStore` | 属性 | <code>outboxStore: MemoryIndexOutboxStore</code> | outbox Store 字段。 |
| `recordStore` | 属性 | <code>recordStore: ManagedMemoryRecordStore</code> | record Store 字段。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (stores: MemoryPersistenceTransaction) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | transaction 的公开运行时操作。 |

## `ManagedMemoryRecordQuery` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filter` | 属性 | <code>filter: MemorySearchFilter</code> | filter 字段。 |
| `includeInvalidated` | 属性 | <code>includeInvalidated: boolean</code> | include Invalidated 字段。 |
| `includeSuperseded` | 属性 | <code>includeSuperseded: boolean</code> | include Superseded 字段。 |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |

## `ManagedMemoryRecordStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
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

## `MemoryIdempotencyStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(scopeHash: string, key: string): Promise&lt;unknown &#124; null&gt;</code> | 读取 get。 |
| `set` | 方法 | <code>set(scopeHash: string, key: string, result: unknown): Promise&lt;void&gt;</code> | 写入 set。 |

## `MemoryIndexOutboxRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `action` | 属性 | <code>action: "delete" &#124; "reindex" &#124; "upsert"</code> | action 字段。 |
| `attempts` | 属性 | <code>attempts: number</code> | attempts 字段。 |
| `availableAt` | 属性 | <code>availableAt: string</code> | available At 字段。 |
| `completedVectorStoreIds` | 属性 | <code>completedVectorStoreIds: string[]</code> | completed Vector Store Ids 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `lastError` | 属性 | <code>lastError: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").NormalizedMemoryError</code> | last Error 字段。 |
| `leaseExpiresAt` | 属性 | <code>leaseExpiresAt: string</code> | lease Expires At 字段。 |
| `leaseOwner` | 属性 | <code>leaseOwner: string</code> | lease Owner 字段。 |
| `leaseToken` | 属性 | <code>leaseToken: string</code> | lease Token 字段。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | memory Id 字段。 |
| `memoryRevision` | 属性 | <code>memoryRevision: number</code> | Logical Memory revision; distinct from this outbox record's lease fencing token. |
| `memoryVersionId` | 属性 | <code>memoryVersionId: string</code> | memory Version Id 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `state` | 属性 | <code>state: "completed" &#124; "failed" &#124; "processing" &#124; "pending" &#124; "dead_letter" &#124; "partial"</code> | state 字段。 |
| `targetVectorStoreIds` | 属性 | <code>targetVectorStoreIds: string[]</code> | target Vector Store Ids 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `MemoryIndexOutboxStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(id: string, owner: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | complete 的公开运行时操作。 |
| `enqueue` | 方法 | <code>enqueue(record: MemoryIndexOutboxRecord): Promise&lt;void&gt;</code> | enqueue 的公开运行时操作。 |
| `fail` | 方法 | <code>fail(id: string, owner: string, leaseToken: string, now: string, error: import("./contracts").NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise&lt;boolean&gt;</code> | fail 的公开运行时操作。 |
| `lease` | 方法 | <code>lease(owner: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | lease 的公开运行时操作。 |
| `list` | 方法 | <code>list(): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | 列出 list。 |
| `renew` | 方法 | <code>renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | renew 的公开运行时操作。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (store: MemoryIndexOutboxStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | transaction 的公开运行时操作。 |

## `MemoryPersistenceCapabilities` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `atomicRecordAndOutbox` | 属性 | <code>atomicRecordAndOutbox: boolean</code> | atomic Record And Outbox 字段。 |
| `durable` | 属性 | <code>durable: boolean</code> | durable 字段。 |

## `MemoryPersistenceTransaction` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `outboxStore` | 属性 | <code>outboxStore: MemoryIndexOutboxStore</code> | outbox Store 字段。 |
| `recordStore` | 属性 | <code>recordStore: ManagedMemoryRecordStore</code> | record Store 字段。 |

## `MemoryPersistenceUnitOfWork` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: MemoryPersistenceCapabilities</code> | capabilities 字段。 |
| `outboxStore` | 属性 | <code>outboxStore: MemoryIndexOutboxStore</code> | outbox Store 字段。 |
| `recordStore` | 属性 | <code>recordStore: ManagedMemoryRecordStore</code> | record Store 字段。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (stores: MemoryPersistenceTransaction) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | transaction 的公开运行时操作。 |
