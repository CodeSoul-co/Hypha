# `@codesoul-co/hypha-adapters-local` / `runtime-checkpoint-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/runtime-checkpoint-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-checkpoint-store.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteRuntimeCheckpointStore` | class | <code>new SQLiteRuntimeCheckpointStore(options: SQLiteRuntimeCheckpointStoreOptions): SQLiteRuntimeCheckpointStore</code> | Runtime implementation for SQ Lite Runtime Checkpoint Store; see its public constructor and members below. |
| `SQLiteRuntimeCheckpointStoreOptions` | interface | <code>interface SQLiteRuntimeCheckpointStoreOptions</code> | Field contract for SQ Lite Runtime Checkpoint Store Options; see all contract members below. |

## `SQLiteRuntimeCheckpointStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): void</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: SQLiteRuntimeCheckpointStoreOptions): SQLiteRuntimeCheckpointStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scope: RuntimeScope, checkpointId: string): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `latest` | method | <code>latest(scope: RuntimeScope): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | Public runtime operation for latest. |
| `list` | method | <code>list(scope: RuntimeScope, limit?: number): Promise&lt;RuntimeCheckpointRecord[]&gt;</code> | Lists list at this module boundary. |
| `put` | method | <code>put(input: RuntimeCheckpointRecord, idempotencyKey: string): Promise&lt;RuntimeCheckpointPutResult&gt;</code> | Public runtime operation for put. |

## `SQLiteRuntimeCheckpointStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public filename property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
