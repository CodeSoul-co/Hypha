# `@codesoul-co/hypha-adapters-local` / `local-filesystem-execution-artifact-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-filesystem-execution-artifact-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-filesystem-execution-artifact-store.ts)
- Exports: **4**

## Using this module

Use the Local filesystem execution artifact store module for persisting and reading data at this boundary. It exports 1 class, 3 interfaces.

### Import from the package entrypoint

```ts
import {
  LocalFilesystemExecutionArtifactStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalArtifactGarbageCollectionResult,
  LocalFilesystemExecutionArtifactStoreOptions,
  LocalFilesystemExecutionArtifactStoreStats,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalFilesystemExecutionArtifactStore` | class | <code>new LocalFilesystemExecutionArtifactStore(options: LocalFilesystemExecutionArtifactStoreOptions): LocalFilesystemExecutionArtifactStore</code> | Local Filesystem Execution Artifact Store class with 13 public constructor or member entries; its exact declarations are listed below. |
| `LocalArtifactGarbageCollectionResult` | interface | <code>interface LocalArtifactGarbageCollectionResult</code> | Local Artifact Garbage Collection Result interface with 2 public fields or methods. |
| `LocalFilesystemExecutionArtifactStoreOptions` | interface | <code>interface LocalFilesystemExecutionArtifactStoreOptions</code> | Local Filesystem Execution Artifact Store Options interface with 4 public fields or methods. |
| `LocalFilesystemExecutionArtifactStoreStats` | interface | <code>interface LocalFilesystemExecutionArtifactStoreStats</code> | Local Filesystem Execution Artifact Store Stats interface with 3 public fields or methods. |

## `LocalFilesystemExecutionArtifactStore`

Local Filesystem Execution Artifact Store class with 13 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LocalFilesystemExecutionArtifactStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-filesystem-execution-artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-filesystem-execution-artifact-store.ts)

### Declaration

```text
export declare class LocalFilesystemExecutionArtifactStore implements ArtifactStoreProvider {
    readonly id: string;
    constructor(options: LocalFilesystemExecutionArtifactStoreOptions);
    capabilities(): Promise<ArtifactStoreCapabilities>;
    put(input: ArtifactPutRequest, options?: ArtifactOperationOptions): Promise<ArtifactStorageRef>;
    get(input: ArtifactGetRequest, options?: ArtifactOperationOptions): Promise<ArtifactContent>;
    head(input: ArtifactStorageRef): Promise<ArtifactObjectMetadata | null>;
    exists(input: ArtifactStorageRef): Promise<boolean>;
    delete(input: ArtifactStorageRef): Promise<void>;
    copy(input: ArtifactCopyRequest): Promise<ArtifactStorageRef>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
    stats(): Promise<LocalFilesystemExecutionArtifactStoreStats>;
    collectGarbage(): Promise<LocalArtifactGarbageCollectionResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): Promise&lt;ArtifactStoreCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `collectGarbage` | method | <code>collectGarbage(): Promise&lt;LocalArtifactGarbageCollectionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: LocalFilesystemExecutionArtifactStoreOptions): LocalFilesystemExecutionArtifactStore</code> | Creates an instance of this class. |
| `copy` | method | <code>copy(input: ArtifactCopyRequest): Promise&lt;ArtifactStorageRef&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `delete` | method | <code>delete(input: ArtifactStorageRef): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `exists` | method | <code>exists(input: ArtifactStorageRef): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(input: ArtifactGetRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactContent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `head` | method | <code>head(input: ArtifactStorageRef): Promise&lt;ArtifactObjectMetadata &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `put` | method | <code>put(input: ArtifactPutRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactStorageRef&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `stats` | method | <code>stats(): Promise&lt;LocalFilesystemExecutionArtifactStoreStats&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LocalArtifactGarbageCollectionResult`

Local Artifact Garbage Collection Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { LocalArtifactGarbageCollectionResult } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-filesystem-execution-artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-filesystem-execution-artifact-store.ts)

### Declaration

```text
export interface LocalArtifactGarbageCollectionResult {
    deletedBlobs: number;
    reclaimedBytes: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deletedBlobs` | property | <code>deletedBlobs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reclaimedBytes` | property | <code>reclaimedBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalFilesystemExecutionArtifactStoreOptions`

Local Filesystem Execution Artifact Store Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { LocalFilesystemExecutionArtifactStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-filesystem-execution-artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-filesystem-execution-artifact-store.ts)

### Declaration

```text
export interface LocalFilesystemExecutionArtifactStoreOptions {
    id?: string;
    rootPath: string;
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
| `rootPath` | property | <code>rootPath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalFilesystemExecutionArtifactStoreStats`

Local Filesystem Execution Artifact Store Stats interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { LocalFilesystemExecutionArtifactStoreStats } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-filesystem-execution-artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-filesystem-execution-artifact-store.ts)

### Declaration

```text
export interface LocalFilesystemExecutionArtifactStoreStats {
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
