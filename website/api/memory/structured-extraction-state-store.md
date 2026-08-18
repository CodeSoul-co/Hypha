# `@codesoul-co/hypha-memory` / `structured-extraction-state-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/structured-extraction-state-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-extraction-state-store.ts)
- Exports: **2**

## Using this module

Use the Structured extraction state store module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  StructuredMemoryExtractionStateStore,
} from '@codesoul-co/hypha-memory';

import type {
  StructuredMemoryExtractionStateStoreOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `StructuredMemoryExtractionStateStore` | class | <code>new StructuredMemoryExtractionStateStore(options: StructuredMemoryExtractionStateStoreOptions): StructuredMemoryExtractionStateStore</code> | Structured Memory Extraction State Store class with 7 public constructor or member entries; its exact declarations are listed below. |
| `StructuredMemoryExtractionStateStoreOptions` | interface | <code>interface StructuredMemoryExtractionStateStoreOptions</code> | Structured Memory Extraction State Store Options interface with 4 public fields or methods. |

## `StructuredMemoryExtractionStateStore`

Structured Memory Extraction State Store class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { StructuredMemoryExtractionStateStore } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-extraction-state-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-extraction-state-store.ts)

### Declaration

```text
export declare class StructuredMemoryExtractionStateStore implements MemoryExtractionStateStore {
    constructor(options: StructuredMemoryExtractionStateStoreOptions);
    getJob(id: string): Promise<MemoryExtractionJob | null>;
    saveJob(job: MemoryExtractionJob): Promise<void>;
    getBatch(id: string): Promise<MemoryExtractionBatch | null>;
    saveBatch(batch: MemoryExtractionBatch): Promise<void>;
    getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise<MemoryExtractionCursor | null>;
    saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: StructuredMemoryExtractionStateStoreOptions): StructuredMemoryExtractionStateStore</code> | Creates an instance of this class. |
| `getBatch` | method | <code>getBatch(id: string): Promise&lt;MemoryExtractionBatch &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getCursor` | method | <code>getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise&lt;MemoryExtractionCursor &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getJob` | method | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `saveBatch` | method | <code>saveBatch(batch: MemoryExtractionBatch): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `saveCursor` | method | <code>saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `saveJob` | method | <code>saveJob(job: MemoryExtractionJob): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `StructuredMemoryExtractionStateStoreOptions`

Structured Memory Extraction State Store Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { StructuredMemoryExtractionStateStoreOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-extraction-state-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-extraction-state-store.ts)

### Declaration

```text
export interface StructuredMemoryExtractionStateStoreOptions {
    store: StructuredStoreProvider;
    jobTable?: string;
    batchTable?: string;
    cursorTable?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `batchTable` | property | <code>batchTable?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cursorTable` | property | <code>cursorTable?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `jobTable` | property | <code>jobTable?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `store` | property | <code>store: StructuredStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
