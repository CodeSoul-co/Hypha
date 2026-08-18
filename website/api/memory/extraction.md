# `@codesoul-co/hypha-memory` / `extraction`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/extraction.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)
- Exports: **11**

## Using this module

Use the Extraction module for using the public contracts and operations for this capability boundary. It exports 4 classes, 4 functions, 2 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  BasicMemoryExtractionSourceAdapter,
  DeterministicMemoryExtractor,
  InMemoryMemoryExtractionStateStore,
  MemoryExtractionCoordinator,
  createConversationExtractionAdapter,
  createEpisodicRecordExtractionAdapter,
  createRuntimeEventExtractionAdapter,
  createTruthExtractionAdapter,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryExtractionCoordinatorOptions,
  MemoryExtractionStateStore,
  ExtractionSourceLoader,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 4 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `BasicMemoryExtractionSourceAdapter` | class | <code>new BasicMemoryExtractionSourceAdapter&lt;T = unknown&gt;(type: MemoryExtractionSourceType, loader: ExtractionSourceLoader&lt;T&gt;, normalizer: (value: T, ref: MemoryExtractionSourceRef) =&gt; NormalizedExtractionInput): BasicMemoryExtractionSourceAdapter&lt;T&gt;</code> | Basic Memory Extraction Source Adapter class with 5 public constructor or member entries; its exact declarations are listed below. |
| `DeterministicMemoryExtractor` | class | <code>new DeterministicMemoryExtractor(): DeterministicMemoryExtractor</code> | Deterministic Memory Extractor class with 4 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryMemoryExtractionStateStore` | class | <code>new InMemoryMemoryExtractionStateStore(): InMemoryMemoryExtractionStateStore</code> | In Memory Memory Extraction State Store class with 7 public constructor or member entries; its exact declarations are listed below. |
| `MemoryExtractionCoordinator` | class | <code>new MemoryExtractionCoordinator(options: MemoryExtractionCoordinatorOptions): MemoryExtractionCoordinator</code> | Memory Extraction Coordinator class with 4 public constructor or member entries; its exact declarations are listed below. |
| `createConversationExtractionAdapter` | function | <code>createConversationExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | Create Conversation Extraction Adapter function with 1 public call signature; parameters and return types are listed below. |
| `createEpisodicRecordExtractionAdapter` | function | <code>createEpisodicRecordExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | Create Episodic Record Extraction Adapter function with 1 public call signature; parameters and return types are listed below. |
| `createRuntimeEventExtractionAdapter` | function | <code>createRuntimeEventExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | Create Runtime Event Extraction Adapter function with 1 public call signature; parameters and return types are listed below. |
| `createTruthExtractionAdapter` | function | <code>createTruthExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | Create Truth Extraction Adapter function with 1 public call signature; parameters and return types are listed below. |
| `MemoryExtractionCoordinatorOptions` | interface | <code>interface MemoryExtractionCoordinatorOptions</code> | Memory Extraction Coordinator Options interface with 4 public fields or methods. |
| `MemoryExtractionStateStore` | interface | <code>interface MemoryExtractionStateStore</code> | Memory Extraction State Store interface with 6 public fields or methods. |
| `ExtractionSourceLoader` | type | <code>type ExtractionSourceLoader = (ref: MemoryExtractionSourceRef) =&gt; Promise&lt;T&gt;</code> | Public type alias for Extraction Source Loader; the declaration contains its complete type expression. |

## `BasicMemoryExtractionSourceAdapter`

Basic Memory Extraction Source Adapter class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { BasicMemoryExtractionSourceAdapter } from '@codesoul-co/hypha-memory';`
- Source module: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### Declaration

```text
export declare class BasicMemoryExtractionSourceAdapter<T = unknown> implements MemoryExtractionSourceAdapter<T> {
    readonly type: MemoryExtractionSourceType;
    constructor(type: MemoryExtractionSourceType, loader: ExtractionSourceLoader<T>, normalizer: (value: T, ref: MemoryExtractionSourceRef) => NormalizedExtractionInput);
    load(refs: MemoryExtractionSourceRef[], cursor?: MemoryExtractionCursor): Promise<MemoryExtractionSourceBatch<T>>;
    normalize(batch: MemoryExtractionSourceBatch<T>): Promise<NormalizedExtractionInput[]>;
    health(): Promise<ProviderHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>&lt;T = unknown&gt;(type: MemoryExtractionSourceType, loader: ExtractionSourceLoader&lt;T&gt;, normalizer: (value: T, ref: MemoryExtractionSourceRef) =&gt; NormalizedExtractionInput): BasicMemoryExtractionSourceAdapter&lt;T&gt;</code> | Creates an instance of this class. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `load` | method | <code>load(refs: MemoryExtractionSourceRef[], cursor?: MemoryExtractionCursor): Promise&lt;MemoryExtractionSourceBatch&lt;T&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `normalize` | method | <code>normalize(batch: MemoryExtractionSourceBatch&lt;T&gt;): Promise&lt;NormalizedExtractionInput[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `type` | property | <code>readonly type: MemoryExtractionSourceType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DeterministicMemoryExtractor`

Deterministic Memory Extractor class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DeterministicMemoryExtractor } from '@codesoul-co/hypha-memory';`
- Source module: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### Declaration

```text
export declare class DeterministicMemoryExtractor implements MemoryExtractor {
    readonly id = "memory.extractor.deterministic";
    extract(inputs: NormalizedExtractionInput[], profile: MemoryExtractionProfileSpec): Promise<ExtractedMemoryCandidate[]>;
    health(): Promise<ProviderHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DeterministicMemoryExtractor</code> | Creates an instance of this class. |
| `extract` | method | <code>extract(inputs: NormalizedExtractionInput[], profile: MemoryExtractionProfileSpec): Promise&lt;ExtractedMemoryCandidate[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: "memory.extractor.deterministic"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InMemoryMemoryExtractionStateStore`

In Memory Memory Extraction State Store class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryMemoryExtractionStateStore } from '@codesoul-co/hypha-memory';`
- Source module: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### Declaration

```text
export declare class InMemoryMemoryExtractionStateStore implements MemoryExtractionStateStore {
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
| `constructor` | constructor | <code>(): InMemoryMemoryExtractionStateStore</code> | Creates an instance of this class. |
| `getBatch` | method | <code>getBatch(id: string): Promise&lt;MemoryExtractionBatch &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getCursor` | method | <code>getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise&lt;MemoryExtractionCursor &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getJob` | method | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `saveBatch` | method | <code>saveBatch(batch: MemoryExtractionBatch): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `saveCursor` | method | <code>saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `saveJob` | method | <code>saveJob(job: MemoryExtractionJob): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryExtractionCoordinator`

Memory Extraction Coordinator class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryExtractionCoordinator } from '@codesoul-co/hypha-memory';`
- Source module: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### Declaration

```text
export declare class MemoryExtractionCoordinator {
    readonly stateStore: MemoryExtractionStateStore;
    constructor(options: MemoryExtractionCoordinatorOptions);
    run(request: MemoryExtractionRequest, profile: MemoryExtractionProfileSpec): Promise<{
            job: MemoryExtractionJob;
            batch: MemoryExtractionBatch;
        }>;
    getJob(id: string): Promise<MemoryExtractionJob | null>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: MemoryExtractionCoordinatorOptions): MemoryExtractionCoordinator</code> | Creates an instance of this class. |
| `getJob` | method | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `run` | method | <code>run(request: MemoryExtractionRequest, profile: MemoryExtractionProfileSpec): Promise&lt;{ job: MemoryExtractionJob; batch: MemoryExtractionBatch; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `stateStore` | property | <code>readonly stateStore: MemoryExtractionStateStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `createConversationExtractionAdapter`

Create Conversation Extraction Adapter function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createConversationExtractionAdapter } from '@codesoul-co/hypha-memory';`
- Source module: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### Declaration

```text
export declare function createConversationExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter;
```

### Call signature

```text
createConversationExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `loader` | <code>ExtractionSourceLoader&lt;unknown&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `BasicMemoryExtractionSourceAdapter<unknown>`
- Description: The return contract is defined by the type shown above.

## `createEpisodicRecordExtractionAdapter`

Create Episodic Record Extraction Adapter function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createEpisodicRecordExtractionAdapter } from '@codesoul-co/hypha-memory';`
- Source module: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### Declaration

```text
export declare function createEpisodicRecordExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter;
```

### Call signature

```text
createEpisodicRecordExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `loader` | <code>ExtractionSourceLoader&lt;unknown&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `BasicMemoryExtractionSourceAdapter<unknown>`
- Description: The return contract is defined by the type shown above.

## `createRuntimeEventExtractionAdapter`

Create Runtime Event Extraction Adapter function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createRuntimeEventExtractionAdapter } from '@codesoul-co/hypha-memory';`
- Source module: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### Declaration

```text
export declare function createRuntimeEventExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter;
```

### Call signature

```text
createRuntimeEventExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `loader` | <code>ExtractionSourceLoader&lt;unknown&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `BasicMemoryExtractionSourceAdapter<unknown>`
- Description: The return contract is defined by the type shown above.

## `createTruthExtractionAdapter`

Create Truth Extraction Adapter function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createTruthExtractionAdapter } from '@codesoul-co/hypha-memory';`
- Source module: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### Declaration

```text
export declare function createTruthExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter;
```

### Call signature

```text
createTruthExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `loader` | <code>ExtractionSourceLoader&lt;unknown&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `BasicMemoryExtractionSourceAdapter<unknown>`
- Description: The return contract is defined by the type shown above.

## `MemoryExtractionCoordinatorOptions`

Memory Extraction Coordinator Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryExtractionCoordinatorOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### Declaration

```text
export interface MemoryExtractionCoordinatorOptions {
    adapters: MemoryExtractionSourceAdapter[];
    extractor: MemoryExtractor;
    stateStore?: MemoryExtractionStateStore;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adapters` | property | <code>adapters: MemoryExtractionSourceAdapter&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `extractor` | property | <code>extractor: MemoryExtractor</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `stateStore` | property | <code>stateStore?: MemoryExtractionStateStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryExtractionStateStore`

Memory Extraction State Store interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MemoryExtractionStateStore } from '@codesoul-co/hypha-memory';`
- Source module: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### Declaration

```text
export interface MemoryExtractionStateStore {
    getJob(id: string): Promise<MemoryExtractionJob | null>;
    saveJob(job: MemoryExtractionJob): Promise<void>;
    getBatch(id: string): Promise<MemoryExtractionBatch | null>;
    saveBatch(batch: MemoryExtractionBatch): Promise<void>;
    getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise<MemoryExtractionCursor | null>;
    saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `getBatch` | method | <code>getBatch(id: string): Promise&lt;MemoryExtractionBatch &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getCursor` | method | <code>getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise&lt;MemoryExtractionCursor &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getJob` | method | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `saveBatch` | method | <code>saveBatch(batch: MemoryExtractionBatch): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `saveCursor` | method | <code>saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `saveJob` | method | <code>saveJob(job: MemoryExtractionJob): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ExtractionSourceLoader`

Public type alias for Extraction Source Loader; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExtractionSourceLoader } from '@codesoul-co/hypha-memory';`
- Source module: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### Declaration

```text
export type ExtractionSourceLoader<T> = (ref: MemoryExtractionSourceRef) => Promise<T>;
```
