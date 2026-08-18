# `@codesoul-co/hypha-adapters-local` / `runtime-integrity-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/runtime-integrity-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-integrity-store.ts)
- Exports: **2**

## Using this module

Use the Runtime integrity store module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  SQLiteRuntimeIntegrityStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteRuntimeIntegrityStoreOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteRuntimeIntegrityStore` | class | <code>new SQLiteRuntimeIntegrityStore(options: SQLiteRuntimeIntegrityStoreOptions): SQLiteRuntimeIntegrityStore</code> | SQLite Runtime Integrity Store class with 6 public constructor or member entries; its exact declarations are listed below. |
| `SQLiteRuntimeIntegrityStoreOptions` | interface | <code>interface SQLiteRuntimeIntegrityStoreOptions</code> | SQLite Runtime Integrity Store Options interface with 1 public fields or methods. |

## `SQLiteRuntimeIntegrityStore`

SQLite Runtime Integrity Store class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SQLiteRuntimeIntegrityStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`runtime-integrity-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-integrity-store.ts)

### Declaration

```text
export declare class SQLiteRuntimeIntegrityStore implements RuntimeIntegrityStore {
    constructor(options: SQLiteRuntimeIntegrityStoreOptions);
    getWatermark(): Promise<RuntimeIntegrityWatermark | null>;
    putWatermark(watermark: RuntimeIntegrityWatermark, expectedLastGlobalSequence: number | null): Promise<void>;
    getRepair(repairId: string): Promise<RuntimeIntegrityRepairEvidence | null>;
    putRepair(evidence: RuntimeIntegrityRepairEvidence): Promise<void>;
    close(): void;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): void</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: SQLiteRuntimeIntegrityStoreOptions): SQLiteRuntimeIntegrityStore</code> | Creates an instance of this class. |
| `getRepair` | method | <code>getRepair(repairId: string): Promise&lt;RuntimeIntegrityRepairEvidence &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getWatermark` | method | <code>getWatermark(): Promise&lt;RuntimeIntegrityWatermark &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `putRepair` | method | <code>putRepair(evidence: RuntimeIntegrityRepairEvidence): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `putWatermark` | method | <code>putWatermark(watermark: RuntimeIntegrityWatermark, expectedLastGlobalSequence: number &#124; null): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SQLiteRuntimeIntegrityStoreOptions`

SQLite Runtime Integrity Store Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { SQLiteRuntimeIntegrityStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`runtime-integrity-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-integrity-store.ts)

### Declaration

```text
export interface SQLiteRuntimeIntegrityStoreOptions {
    filename: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
