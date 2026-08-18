# `@codesoul-co/hypha-core` / `modules/runtime/runtime-checkpoint-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-checkpoint-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-store.ts)
- Exports: **3**

## Using this module

Use the Runtime checkpoint store module for persisting and reading data at this boundary. It exports 1 class, 2 functions.

### Import from the package entrypoint

```ts
import {
  InMemoryRuntimeCheckpointStore,
  runtimeCheckpointChecksum,
  verifyRuntimeCheckpointChecksum,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryRuntimeCheckpointStore` | class | <code>new InMemoryRuntimeCheckpointStore(): InMemoryRuntimeCheckpointStore</code> | In Memory Runtime Checkpoint Store class with 5 public constructor or member entries; its exact declarations are listed below. |
| `runtimeCheckpointChecksum` | function | <code>runtimeCheckpointChecksum(record: Omit&lt;RuntimeCheckpointRecord, "checksum"&gt; &#124; RuntimeCheckpointRecord): string</code> | Runtime Checkpoint Checksum function with 1 public call signature; parameters and return types are listed below. |
| `verifyRuntimeCheckpointChecksum` | function | <code>verifyRuntimeCheckpointChecksum(record: RuntimeCheckpointRecord): void</code> | Verify Runtime Checkpoint Checksum function with 1 public call signature; parameters and return types are listed below. |

## `InMemoryRuntimeCheckpointStore`

In Memory Runtime Checkpoint Store class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryRuntimeCheckpointStore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-checkpoint-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-store.ts)

### Declaration

```text
export declare class InMemoryRuntimeCheckpointStore implements RuntimeCheckpointStore {
    put(input: RuntimeCheckpointRecord, idempotencyKey: string): Promise<RuntimeCheckpointPutResult>;
    get(scope: RuntimeScope, checkpointId: string): Promise<RuntimeCheckpointRecord | null>;
    latest(scope: RuntimeScope): Promise<RuntimeCheckpointRecord | null>;
    list(scope: RuntimeScope, limit?: number): Promise<RuntimeCheckpointRecord[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryRuntimeCheckpointStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scope: RuntimeScope, checkpointId: string): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `latest` | method | <code>latest(scope: RuntimeScope): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(scope: RuntimeScope, limit?: number): Promise&lt;RuntimeCheckpointRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(input: RuntimeCheckpointRecord, idempotencyKey: string): Promise&lt;RuntimeCheckpointPutResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `runtimeCheckpointChecksum`

Runtime Checkpoint Checksum function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runtimeCheckpointChecksum } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-checkpoint-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-store.ts)

### Declaration

```text
export declare function runtimeCheckpointChecksum(record: Omit<RuntimeCheckpointRecord, 'checksum'> | RuntimeCheckpointRecord): string;
```

### Call signature

```text
runtimeCheckpointChecksum(record: Omit<RuntimeCheckpointRecord, "checksum"> | RuntimeCheckpointRecord): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `record` | <code>RuntimeCheckpointRecord &#124; Omit&lt;RuntimeCheckpointRecord, "checksum"&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `verifyRuntimeCheckpointChecksum`

Verify Runtime Checkpoint Checksum function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { verifyRuntimeCheckpointChecksum } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-checkpoint-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-store.ts)

### Declaration

```text
export declare function verifyRuntimeCheckpointChecksum(record: RuntimeCheckpointRecord): void;
```

### Call signature

```text
verifyRuntimeCheckpointChecksum(record: RuntimeCheckpointRecord): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `record` | <code>RuntimeCheckpointRecord</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.
