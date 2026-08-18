# `@codesoul-co/hypha-adapters-local` / `in-memory-execution-artifact-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/in-memory-execution-artifact-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-artifact-store.ts)
- Exports: **3**

## Using this module

Use the In memory execution artifact store module for persisting and reading data at this boundary. It exports 1 class, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  InMemoryExecutionArtifactStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  InMemoryExecutionArtifactStoreOptions,
  InMemoryExecutionArtifactStoreStats,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryExecutionArtifactStore` | class | <code>new InMemoryExecutionArtifactStore(options?: InMemoryExecutionArtifactStoreOptions): InMemoryExecutionArtifactStore</code> | In Memory Execution Artifact Store class with 12 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryExecutionArtifactStoreOptions` | interface | <code>interface InMemoryExecutionArtifactStoreOptions</code> | In Memory Execution Artifact Store Options interface with 3 public fields or methods. |
| `InMemoryExecutionArtifactStoreStats` | interface | <code>interface InMemoryExecutionArtifactStoreStats</code> | In Memory Execution Artifact Store Stats interface with 3 public fields or methods. |

## `InMemoryExecutionArtifactStore`

In Memory Execution Artifact Store class with 12 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryExecutionArtifactStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`in-memory-execution-artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-artifact-store.ts)

### Declaration

```text
export declare class InMemoryExecutionArtifactStore implements ArtifactStoreProvider {
    readonly id: string;
    constructor(options?: InMemoryExecutionArtifactStoreOptions);
    capabilities(): Promise<ArtifactStoreCapabilities>;
    put(input: ArtifactPutRequest): Promise<ArtifactStorageRef>;
    get(input: ArtifactGetRequest, options?: ArtifactOperationOptions): Promise<ArtifactContent>;
    head(input: ArtifactStorageRef): Promise<ArtifactObjectMetadata | null>;
    exists(input: ArtifactStorageRef): Promise<boolean>;
    delete(input: ArtifactStorageRef): Promise<void>;
    copy(input: ArtifactCopyRequest): Promise<ArtifactStorageRef>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
    stats(): InMemoryExecutionArtifactStoreStats;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): Promise&lt;ArtifactStoreCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options?: InMemoryExecutionArtifactStoreOptions): InMemoryExecutionArtifactStore</code> | Creates an instance of this class. |
| `copy` | method | <code>copy(input: ArtifactCopyRequest): Promise&lt;ArtifactStorageRef&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `delete` | method | <code>delete(input: ArtifactStorageRef): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `exists` | method | <code>exists(input: ArtifactStorageRef): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(input: ArtifactGetRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactContent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `head` | method | <code>head(input: ArtifactStorageRef): Promise&lt;ArtifactObjectMetadata &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `put` | method | <code>put(input: ArtifactPutRequest): Promise&lt;ArtifactStorageRef&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `stats` | method | <code>stats(): InMemoryExecutionArtifactStoreStats</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryExecutionArtifactStoreOptions`

In Memory Execution Artifact Store Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryExecutionArtifactStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`in-memory-execution-artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-artifact-store.ts)

### Declaration

```text
export interface InMemoryExecutionArtifactStoreOptions {
    id?: string;
    maxObjectBytes?: number;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxObjectBytes` | property | <code>maxObjectBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryExecutionArtifactStoreStats`

In Memory Execution Artifact Store Stats interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryExecutionArtifactStoreStats } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`in-memory-execution-artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-artifact-store.ts)

### Declaration

```text
export interface InMemoryExecutionArtifactStoreStats {
    objects: number;
    blobs: number;
    storedBytes: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `blobs` | property | <code>blobs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `objects` | property | <code>objects: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `storedBytes` | property | <code>storedBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
