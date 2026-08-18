# `@codesoul-co/hypha-adapters-local` / `react-continuation-checkpoint-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/react-continuation-checkpoint-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/react-continuation-checkpoint-store.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteReActContinuationCheckpointStore` | 类 | <code>new SQLiteReActContinuationCheckpointStore(options: SQLiteReActContinuationCheckpointStoreOptions): SQLiteReActContinuationCheckpointStore</code> | Local durable materialization for resumable ReAct work. Runtime Events remain the execution truth. This store contains only bounded, schema-validated continuation material and rejects stale checkpoint writers. |
| `SQLiteReActContinuationCheckpointStoreOptions` | 接口 | <code>interface SQLiteReActContinuationCheckpointStoreOptions</code> | SQ Lite Re Act Continuation Checkpoint Store Options 的字段契约；完整字段见下表。 |

## `SQLiteReActContinuationCheckpointStore` 公开成员

Local durable materialization for resumable ReAct work. Runtime Events remain the execution truth. This store contains only bounded, schema-validated continuation material and rejects stale checkpoint writers.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): void</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: SQLiteReActContinuationCheckpointStoreOptions): SQLiteReActContinuationCheckpointStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise&lt;boolean&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(runId: string, stepId: string, expectedScopeHash: string): Promise&lt;ReActContinuationCheckpoint &#124; null&gt;</code> | 读取 get。 |
| `put` | 方法 | <code>put(input: ReActContinuationCheckpoint, idempotencyKey: string): Promise&lt;ReActContinuationCheckpointPutResult&gt;</code> | put 的公开运行时操作。 |

## `SQLiteReActContinuationCheckpointStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | filename 字段。 |
| `maxCheckpointBytes` | 属性 | <code>maxCheckpointBytes: number</code> | max Checkpoint Bytes 字段。 |
| `maxIdempotencyRecordsPerCheckpoint` | 属性 | <code>maxIdempotencyRecordsPerCheckpoint: number</code> | max Idempotency Records Per Checkpoint 字段。 |
