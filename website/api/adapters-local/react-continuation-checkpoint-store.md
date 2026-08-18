# `@codesoul-co/hypha-adapters-local` / `react-continuation-checkpoint-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/react-continuation-checkpoint-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/react-continuation-checkpoint-store.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteReActContinuationCheckpointStore` | class | <code>new SQLiteReActContinuationCheckpointStore(options: SQLiteReActContinuationCheckpointStoreOptions): SQLiteReActContinuationCheckpointStore</code> | Local durable materialization for resumable ReAct work. Runtime Events remain the execution truth. This store contains only bounded, schema-validated continuation material and rejects stale checkpoint writers. |
| `SQLiteReActContinuationCheckpointStoreOptions` | interface | <code>interface SQLiteReActContinuationCheckpointStoreOptions</code> | Field contract for SQ Lite Re Act Continuation Checkpoint Store Options; see all contract members below. |

## `SQLiteReActContinuationCheckpointStore` public members

Local durable materialization for resumable ReAct work. Runtime Events remain the execution truth. This store contains only bounded, schema-validated continuation material and rejects stale checkpoint writers.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): void</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: SQLiteReActContinuationCheckpointStoreOptions): SQLiteReActContinuationCheckpointStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise&lt;boolean&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(runId: string, stepId: string, expectedScopeHash: string): Promise&lt;ReActContinuationCheckpoint &#124; null&gt;</code> | Gets get at this module boundary. |
| `put` | method | <code>put(input: ReActContinuationCheckpoint, idempotencyKey: string): Promise&lt;ReActContinuationCheckpointPutResult&gt;</code> | Public runtime operation for put. |

## `SQLiteReActContinuationCheckpointStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public filename property. |
| `maxCheckpointBytes` | property | <code>maxCheckpointBytes: number</code> | Public max Checkpoint Bytes property. |
| `maxIdempotencyRecordsPerCheckpoint` | property | <code>maxIdempotencyRecordsPerCheckpoint: number</code> | Public max Idempotency Records Per Checkpoint property. |
