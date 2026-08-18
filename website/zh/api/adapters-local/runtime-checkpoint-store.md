# `@codesoul-co/hypha-adapters-local` / `runtime-checkpoint-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/runtime-checkpoint-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-checkpoint-store.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteRuntimeCheckpointStore` | 类 | <code>new SQLiteRuntimeCheckpointStore(options: SQLiteRuntimeCheckpointStoreOptions): SQLiteRuntimeCheckpointStore</code> | SQ Lite Runtime Checkpoint Store 的运行时实现；公开构造函数与成员见下表。 |
| `SQLiteRuntimeCheckpointStoreOptions` | 接口 | <code>interface SQLiteRuntimeCheckpointStoreOptions</code> | SQ Lite Runtime Checkpoint Store Options 的字段契约；完整字段见下表。 |

## `SQLiteRuntimeCheckpointStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): void</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: SQLiteRuntimeCheckpointStoreOptions): SQLiteRuntimeCheckpointStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scope: RuntimeScope, checkpointId: string): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | 读取 get。 |
| `latest` | 方法 | <code>latest(scope: RuntimeScope): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | latest 的公开运行时操作。 |
| `list` | 方法 | <code>list(scope: RuntimeScope, limit?: number): Promise&lt;RuntimeCheckpointRecord[]&gt;</code> | 列出 list。 |
| `put` | 方法 | <code>put(input: RuntimeCheckpointRecord, idempotencyKey: string): Promise&lt;RuntimeCheckpointPutResult&gt;</code> | put 的公开运行时操作。 |

## `SQLiteRuntimeCheckpointStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | filename 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
