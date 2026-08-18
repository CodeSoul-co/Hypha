# `@codesoul-co/hypha-memory` / `mongo-structured-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/mongo-structured-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)
- 导出数: **10**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MongoStructuredStoreProvider` | 类 | <code>new MongoStructuredStoreProvider(options: MongoStructuredStoreProviderOptions, session?: MongoSessionLike &#124; undefined): MongoStructuredStoreProvider</code> | Mongo-backed StructuredStoreProvider without leaking a Mongo SDK into Memory contracts. |
| `normalizeMongoStructuredStoreError` | 函数 | <code>normalizeMongoStructuredStoreError(error: unknown, operation: string): import("./contracts").NormalizedMemoryError</code> | 规范化 Mongo Structured Store Error。 |
| `MongoCollectionLike` | 接口 | <code>interface MongoCollectionLike</code> | Mongo Collection Like 的字段契约；完整字段见下表。 |
| `MongoCursorLike` | 接口 | <code>interface MongoCursorLike</code> | Mongo Cursor Like 的字段契约；完整字段见下表。 |
| `MongoDatabaseLike` | 接口 | <code>interface MongoDatabaseLike</code> | Mongo Database Like 的字段契约；完整字段见下表。 |
| `MongoOperationOptionsLike` | 接口 | <code>interface MongoOperationOptionsLike</code> | Mongo Operation Options Like 的字段契约；完整字段见下表。 |
| `MongoSessionLike` | 接口 | <code>interface MongoSessionLike</code> | Mongo Session Like 的字段契约；完整字段见下表。 |
| `MongoStructuredStoreHealth` | 接口 | <code>interface MongoStructuredStoreHealth</code> | Mongo Structured Store Health 的字段契约；完整字段见下表。 |
| `MongoStructuredStoreProviderOptions` | 接口 | <code>interface MongoStructuredStoreProviderOptions</code> | Mongo Structured Store Provider Options 的字段契约；完整字段见下表。 |
| `MongoTransactionMode` | 类型 | <code>type MongoTransactionMode = 'required' &#124; 'preferred' &#124; 'disabled'</code> | Mongo Transaction Mode 的公共类型别名。 |

## `MongoStructuredStoreProvider` 公开成员

Mongo-backed StructuredStoreProvider without leaking a Mongo SDK into Memory contracts.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compareAndSet` | 方法 | <code>compareAndSet&lt;T&gt;(table: string, id: string, expected: Partial&lt;T&gt;, patch: Partial&lt;T&gt;): Promise&lt;boolean&gt;</code> | compare And Set 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: MongoStructuredStoreProviderOptions, session?: MongoSessionLike &#124; undefined): MongoStructuredStoreProvider</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;MongoStructuredStoreHealth&gt;</code> | health 的公开运行时操作。 |
| `initialize` | 方法 | <code>initialize(collections: readonly string[]): Promise&lt;void&gt;</code> | initialize 的公开运行时操作。 |
| `insert` | 方法 | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | insert 的公开运行时操作。 |
| `query` | 方法 | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | query 的公开运行时操作。 |
| `supportsTransactions` | 方法 | <code>supportsTransactions(): boolean</code> | supports Transactions 的公开运行时操作。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(operation: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | transaction 的公开运行时操作。 |
| `update` | 方法 | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | update 的公开运行时操作。 |

## `MongoCollectionLike` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createIndex` | 方法 | <code>createIndex(keys: Record&lt;string, 1 &#124; -1&gt;, options?: { unique?: boolean; name?: string; }): Promise&lt;unknown&gt;</code> | 创建 Index。 |
| `deleteOne` | 方法 | <code>deleteOne(filter: Record&lt;string, unknown&gt;, options?: MongoOperationOptionsLike): Promise&lt;{ deletedCount?: number; }&gt;</code> | 删除 One。 |
| `find` | 方法 | <code>find&lt;T&gt;(filter: Record&lt;string, unknown&gt;, options?: MongoOperationOptionsLike): MongoCursorLike&lt;T&gt;</code> | find 的公开运行时操作。 |
| `findOne` | 方法 | <code>findOne&lt;T&gt;(filter: Record&lt;string, unknown&gt;, options?: MongoOperationOptionsLike): Promise&lt;T &#124; null&gt;</code> | find One 的公开运行时操作。 |
| `insertOne` | 方法 | <code>insertOne&lt;T extends object&gt;(document: T, options?: MongoOperationOptionsLike): Promise&lt;unknown&gt;</code> | insert One 的公开运行时操作。 |
| `updateOne` | 方法 | <code>updateOne(filter: Record&lt;string, unknown&gt;, update: { $set: Record&lt;string, unknown&gt;; }, options?: MongoOperationOptionsLike): Promise&lt;{ matchedCount?: number; }&gt;</code> | update One 的公开运行时操作。 |

## `MongoCursorLike` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `limit` | 方法 | <code>limit(limit: number): MongoCursorLike&lt;T&gt;</code> | limit 的公开运行时操作。 |
| `sort` | 方法 | <code>sort(order: Record&lt;string, 1 &#124; -1&gt;): MongoCursorLike&lt;T&gt;</code> | sort 的公开运行时操作。 |
| `toArray` | 方法 | <code>toArray(): Promise&lt;T[]&gt;</code> | to Array 的公开运行时操作。 |

## `MongoDatabaseLike` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collection` | 方法 | <code>collection(name: string): MongoCollectionLike</code> | collection 的公开运行时操作。 |
| `command` | 方法 | <code>command(command: Record&lt;string, unknown&gt;): Promise&lt;unknown&gt;</code> | command 的公开运行时操作。 |
| `startSession` | 方法 | <code>startSession(): MongoSessionLike</code> | 启动 Session。 |

## `MongoOperationOptionsLike` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `session` | 属性 | <code>session: MongoSessionLike</code> | session 字段。 |

## `MongoSessionLike` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `endSession` | 方法 | <code>endSession(): Promise&lt;void&gt;</code> | end Session 的公开运行时操作。 |
| `withTransaction` | 方法 | <code>withTransaction&lt;T&gt;(operation: () =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | with Transaction 的公开运行时操作。 |

## `MongoStructuredStoreHealth` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `status` | 属性 | <code>status: "healthy" &#124; "degraded" &#124; "unhealthy"</code> | status 字段。 |
| `transactions` | 属性 | <code>transactions: boolean</code> | transactions 字段。 |

## `MongoStructuredStoreProviderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collectionPrefix` | 属性 | <code>collectionPrefix: string</code> | collection Prefix 字段。 |
| `database` | 属性 | <code>database: MongoDatabaseLike</code> | database 字段。 |
| `transactionMode` | 属性 | <code>transactionMode: MongoTransactionMode</code> | transaction Mode 字段。 |
