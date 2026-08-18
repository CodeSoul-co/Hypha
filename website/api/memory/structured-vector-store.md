# `@codesoul-co/hypha-memory` / `structured-vector-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/structured-vector-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-vector-store.ts)
- Exports: **2**

## Using this module

Use the Structured vector store module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  StructuredManagedVectorStoreAdapter,
} from '@codesoul-co/hypha-memory';

import type {
  StructuredManagedVectorStoreAdapterOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `StructuredManagedVectorStoreAdapter` | class | <code>new StructuredManagedVectorStoreAdapter(store: StructuredStoreProvider, options?: StructuredManagedVectorStoreAdapterOptions): StructuredManagedVectorStoreAdapter</code> | Durable, bounded vector projection backed by the configured Structured Store. |
| `StructuredManagedVectorStoreAdapterOptions` | interface | <code>interface StructuredManagedVectorStoreAdapterOptions</code> | Structured Managed Vector Store Adapter Options interface with 4 public fields or methods. |

## `StructuredManagedVectorStoreAdapter`

Durable, bounded vector projection backed by the configured Structured Store.

- Kind: class
- Import: `import { StructuredManagedVectorStoreAdapter } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-vector-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-vector-store.ts)

### Declaration

```text
export declare class StructuredManagedVectorStoreAdapter implements ManagedVectorStoreAdapter {
    readonly id: string;
    constructor(store: StructuredStoreProvider, options?: StructuredManagedVectorStoreAdapterOptions);
    initialize(): Promise<void>;
    upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise<void>;
    delete(ids: string[], options?: ManagedVectorWriteOptions): Promise<void>;
    search(request: ManagedVectorSearchRequest): Promise<ManagedVectorSearchResult[]>;
    health(): Promise<ProviderHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(store: StructuredStoreProvider, options?: StructuredManagedVectorStoreAdapterOptions): StructuredManagedVectorStoreAdapter</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `initialize` | method | <code>initialize(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `upsert` | method | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `StructuredManagedVectorStoreAdapterOptions`

Structured Managed Vector Store Adapter Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { StructuredManagedVectorStoreAdapterOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-vector-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-vector-store.ts)

### Declaration

```text
export interface StructuredManagedVectorStoreAdapterOptions {
    id?: string;
    table?: string;
    maxScanPoints?: number;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxScanPoints` | property | <code>maxScanPoints?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `table` | property | <code>table?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
