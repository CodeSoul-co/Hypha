# `@codesoul-co/hypha-memory` / `mongo-structured-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/mongo-structured-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)
- Exports: **10**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MongoStructuredStoreProvider` | class | <code>new MongoStructuredStoreProvider(options: MongoStructuredStoreProviderOptions, session?: MongoSessionLike &#124; undefined): MongoStructuredStoreProvider</code> | Mongo-backed StructuredStoreProvider without leaking a Mongo SDK into Memory contracts. |
| `normalizeMongoStructuredStoreError` | function | <code>normalizeMongoStructuredStoreError(error: unknown, operation: string): import("./contracts").NormalizedMemoryError</code> | Normalizes Mongo Structured Store Error at this module boundary. |
| `MongoCollectionLike` | interface | <code>interface MongoCollectionLike</code> | Field contract for Mongo Collection Like; see all contract members below. |
| `MongoCursorLike` | interface | <code>interface MongoCursorLike</code> | Field contract for Mongo Cursor Like; see all contract members below. |
| `MongoDatabaseLike` | interface | <code>interface MongoDatabaseLike</code> | Field contract for Mongo Database Like; see all contract members below. |
| `MongoOperationOptionsLike` | interface | <code>interface MongoOperationOptionsLike</code> | Field contract for Mongo Operation Options Like; see all contract members below. |
| `MongoSessionLike` | interface | <code>interface MongoSessionLike</code> | Field contract for Mongo Session Like; see all contract members below. |
| `MongoStructuredStoreHealth` | interface | <code>interface MongoStructuredStoreHealth</code> | Field contract for Mongo Structured Store Health; see all contract members below. |
| `MongoStructuredStoreProviderOptions` | interface | <code>interface MongoStructuredStoreProviderOptions</code> | Field contract for Mongo Structured Store Provider Options; see all contract members below. |
| `MongoTransactionMode` | type | <code>type MongoTransactionMode = 'required' &#124; 'preferred' &#124; 'disabled'</code> | Public type alias for Mongo Transaction Mode. |

## `MongoStructuredStoreProvider` public members

Mongo-backed StructuredStoreProvider without leaking a Mongo SDK into Memory contracts.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compareAndSet` | method | <code>compareAndSet&lt;T&gt;(table: string, id: string, expected: Partial&lt;T&gt;, patch: Partial&lt;T&gt;): Promise&lt;boolean&gt;</code> | Public runtime operation for compare And Set. |
| `constructor` | constructor | <code>(options: MongoStructuredStoreProviderOptions, session?: MongoSessionLike &#124; undefined): MongoStructuredStoreProvider</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;MongoStructuredStoreHealth&gt;</code> | Public runtime operation for health. |
| `initialize` | method | <code>initialize(collections: readonly string[]): Promise&lt;void&gt;</code> | Public runtime operation for initialize. |
| `insert` | method | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | Public runtime operation for insert. |
| `query` | method | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | Public runtime operation for query. |
| `supportsTransactions` | method | <code>supportsTransactions(): boolean</code> | Public runtime operation for supports Transactions. |
| `transaction` | method | <code>transaction&lt;T&gt;(operation: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public runtime operation for transaction. |
| `update` | method | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | Public runtime operation for update. |

## `MongoCollectionLike` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createIndex` | method | <code>createIndex(keys: Record&lt;string, 1 &#124; -1&gt;, options?: { unique?: boolean; name?: string; }): Promise&lt;unknown&gt;</code> | Creates Index at this module boundary. |
| `deleteOne` | method | <code>deleteOne(filter: Record&lt;string, unknown&gt;, options?: MongoOperationOptionsLike): Promise&lt;{ deletedCount?: number; }&gt;</code> | Deletes One at this module boundary. |
| `find` | method | <code>find&lt;T&gt;(filter: Record&lt;string, unknown&gt;, options?: MongoOperationOptionsLike): MongoCursorLike&lt;T&gt;</code> | Public runtime operation for find. |
| `findOne` | method | <code>findOne&lt;T&gt;(filter: Record&lt;string, unknown&gt;, options?: MongoOperationOptionsLike): Promise&lt;T &#124; null&gt;</code> | Public runtime operation for find One. |
| `insertOne` | method | <code>insertOne&lt;T extends object&gt;(document: T, options?: MongoOperationOptionsLike): Promise&lt;unknown&gt;</code> | Public runtime operation for insert One. |
| `updateOne` | method | <code>updateOne(filter: Record&lt;string, unknown&gt;, update: { $set: Record&lt;string, unknown&gt;; }, options?: MongoOperationOptionsLike): Promise&lt;{ matchedCount?: number; }&gt;</code> | Public runtime operation for update One. |

## `MongoCursorLike` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `limit` | method | <code>limit(limit: number): MongoCursorLike&lt;T&gt;</code> | Public runtime operation for limit. |
| `sort` | method | <code>sort(order: Record&lt;string, 1 &#124; -1&gt;): MongoCursorLike&lt;T&gt;</code> | Public runtime operation for sort. |
| `toArray` | method | <code>toArray(): Promise&lt;T[]&gt;</code> | Public runtime operation for to Array. |

## `MongoDatabaseLike` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collection` | method | <code>collection(name: string): MongoCollectionLike</code> | Public runtime operation for collection. |
| `command` | method | <code>command(command: Record&lt;string, unknown&gt;): Promise&lt;unknown&gt;</code> | Public runtime operation for command. |
| `startSession` | method | <code>startSession(): MongoSessionLike</code> | Starts Session at this module boundary. |

## `MongoOperationOptionsLike` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `session` | property | <code>session: MongoSessionLike</code> | Public session property. |

## `MongoSessionLike` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `endSession` | method | <code>endSession(): Promise&lt;void&gt;</code> | Public runtime operation for end Session. |
| `withTransaction` | method | <code>withTransaction&lt;T&gt;(operation: () =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public runtime operation for with Transaction. |

## `MongoStructuredStoreHealth` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `message` | property | <code>message: string</code> | Public message property. |
| `status` | property | <code>status: "healthy" &#124; "degraded" &#124; "unhealthy"</code> | Public status property. |
| `transactions` | property | <code>transactions: boolean</code> | Public transactions property. |

## `MongoStructuredStoreProviderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collectionPrefix` | property | <code>collectionPrefix: string</code> | Public collection Prefix property. |
| `database` | property | <code>database: MongoDatabaseLike</code> | Public database property. |
| `transactionMode` | property | <code>transactionMode: MongoTransactionMode</code> | Public transaction Mode property. |
