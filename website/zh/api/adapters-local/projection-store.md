# `@codesoul-co/hypha-adapters-local` / `projection-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/projection-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/projection-store.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteProjectionStore` | 类 | <code>new SQLiteProjectionStore&lt;TState = unknown&gt;(options: SQLiteProjectionStoreOptions): SQLiteProjectionStore&lt;TState&gt;</code> | SQ Lite Projection Store 的运行时实现；公开构造函数与成员见下表。 |
| `SQLiteProjectionStoreOptions` | 接口 | <code>interface SQLiteProjectionStoreOptions</code> | SQ Lite Projection Store Options 的字段契约；完整字段见下表。 |

## `SQLiteProjectionStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): void</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>&lt;TState = unknown&gt;(options: SQLiteProjectionStoreOptions): SQLiteProjectionStore&lt;TState&gt;</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(projectionId: string, key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(projectionId: string, key: string): Promise&lt;ProjectionRecord&lt;TState&gt; &#124; null&gt;</code> | 读取 get。 |
| `put` | 方法 | <code>put(record: ProjectionRecord&lt;TState&gt;, expectedRevision?: number): Promise&lt;void&gt;</code> | put 的公开运行时操作。 |

## `SQLiteProjectionStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | filename 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
