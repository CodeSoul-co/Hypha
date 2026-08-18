# `@codesoul-co/hypha-adapters-local` / `react-continuation-checkpoint-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/react-continuation-checkpoint-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/react-continuation-checkpoint-store.ts)
- Exports: **2**

## Using this module

Use the React continuation checkpoint store module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  SQLiteReActContinuationCheckpointStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteReActContinuationCheckpointStoreOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteReActContinuationCheckpointStore` | class | <code>new SQLiteReActContinuationCheckpointStore(options: SQLiteReActContinuationCheckpointStoreOptions): SQLiteReActContinuationCheckpointStore</code> | Local durable materialization for resumable ReAct work. Runtime Events remain the execution truth. This store contains only bounded, schema-validated continuation material and rejects stale checkpoint writers. |
| `SQLiteReActContinuationCheckpointStoreOptions` | interface | <code>interface SQLiteReActContinuationCheckpointStoreOptions</code> | SQLite ReAct Continuation Checkpoint Store Options interface with 3 public fields or methods. |

## `SQLiteReActContinuationCheckpointStore`

Local durable materialization for resumable ReAct work. Runtime Events remain the execution truth. This store contains only bounded, schema-validated continuation material and rejects stale checkpoint writers.

- Kind: class
- Import: `import { SQLiteReActContinuationCheckpointStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`react-continuation-checkpoint-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/react-continuation-checkpoint-store.ts)

### Declaration

```text
export declare class SQLiteReActContinuationCheckpointStore implements ReActContinuationCheckpointStore {
    constructor(options: SQLiteReActContinuationCheckpointStoreOptions);
    put(input: ReActContinuationCheckpoint, idempotencyKey: string): Promise<ReActContinuationCheckpointPutResult>;
    get(runId: string, stepId: string, expectedScopeHash: string): Promise<ReActContinuationCheckpoint | null>;
    delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise<boolean>;
    close(): void;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): void</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: SQLiteReActContinuationCheckpointStoreOptions): SQLiteReActContinuationCheckpointStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(runId: string, stepId: string, expectedScopeHash: string): Promise&lt;ReActContinuationCheckpoint &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(input: ReActContinuationCheckpoint, idempotencyKey: string): Promise&lt;ReActContinuationCheckpointPutResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SQLiteReActContinuationCheckpointStoreOptions`

SQLite ReAct Continuation Checkpoint Store Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SQLiteReActContinuationCheckpointStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`react-continuation-checkpoint-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/react-continuation-checkpoint-store.ts)

### Declaration

```text
export interface SQLiteReActContinuationCheckpointStoreOptions {
    filename: string;
    maxIdempotencyRecordsPerCheckpoint?: number;
    maxCheckpointBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxCheckpointBytes` | property | <code>maxCheckpointBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxIdempotencyRecordsPerCheckpoint` | property | <code>maxIdempotencyRecordsPerCheckpoint?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
