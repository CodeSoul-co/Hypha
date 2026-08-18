# `@codesoul-co/hypha-core` / `modules/runtime/runtime-checkpoint-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-checkpoint-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-store.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryRuntimeCheckpointStore` | class | <code>new InMemoryRuntimeCheckpointStore(): InMemoryRuntimeCheckpointStore</code> | Runtime implementation for In Memory Runtime Checkpoint Store; see its public constructor and members below. |
| `runtimeCheckpointChecksum` | function | <code>runtimeCheckpointChecksum(record: Omit&lt;RuntimeCheckpointRecord, "checksum"&gt; &#124; RuntimeCheckpointRecord): string</code> | Public runtime operation for runtime Checkpoint Checksum. |
| `verifyRuntimeCheckpointChecksum` | function | <code>verifyRuntimeCheckpointChecksum(record: RuntimeCheckpointRecord): void</code> | Public runtime operation for verify Runtime Checkpoint Checksum. |

## `InMemoryRuntimeCheckpointStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryRuntimeCheckpointStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scope: RuntimeScope, checkpointId: string): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `latest` | method | <code>latest(scope: RuntimeScope): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | Public runtime operation for latest. |
| `list` | method | <code>list(scope: RuntimeScope, limit?: number): Promise&lt;RuntimeCheckpointRecord[]&gt;</code> | Lists list at this module boundary. |
| `put` | method | <code>put(input: RuntimeCheckpointRecord, idempotencyKey: string): Promise&lt;RuntimeCheckpointPutResult&gt;</code> | Public runtime operation for put. |
