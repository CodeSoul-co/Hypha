# `@codesoul-co/hypha-core` / `modules/artifact/runtime`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/artifact/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/runtime.ts)
- Exports: **2**

## Using this module

Use the Runtime module for executing runtime behavior at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  DefaultArtifactManager,
} from '@codesoul-co/hypha-core';

import type {
  DefaultArtifactManagerOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultArtifactManager` | class | <code>new DefaultArtifactManager(options: DefaultArtifactManagerOptions): DefaultArtifactManager</code> | Default Artifact Manager class with 17 public constructor or member entries; its exact declarations are listed below. |
| `DefaultArtifactManagerOptions` | interface | <code>interface DefaultArtifactManagerOptions</code> | Default Artifact Manager Options interface with 6 public fields or methods. |

## `DefaultArtifactManager`

Default Artifact Manager class with 17 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultArtifactManager } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/runtime.ts)

### Declaration

```text
export declare class DefaultArtifactManager implements ArtifactManager {
    constructor(options: DefaultArtifactManagerOptions);
    create(input: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    createFromWorkspace(input: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    createVersion(input: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    get(request: ArtifactGetRecordRequest): Promise<ArtifactRecord | null>;
    read(input: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise<ArtifactReadResult>;
    createDownloadAccess(input: ArtifactCreateDownloadAccessRequest): Promise<ArtifactDownloadAccess>;
    list(input: ArtifactListRequest): Promise<ArtifactRecord[]>;
    finalize(request: ArtifactFinalizeRequest): Promise<ArtifactRecord>;
    archive(request: ArtifactArchiveRequest): Promise<ArtifactRecord>;
    invalidate(request: ArtifactInvalidateRequest): Promise<ArtifactRecord>;
    delete(input: ArtifactDeleteRequest): Promise<void>;
    traceLineage(input: ArtifactTraceLineageRequest): Promise<ArtifactLineage>;
    latest(input: ArtifactLatestRequest): Promise<ArtifactRecord | null>;
    previous(input: ArtifactPreviousRequest): Promise<ArtifactRecord | null>;
    profile(ref: SpecRef): Promise<ArtifactProfileSpec | null>;
    health(): Promise<Record<string, ProviderHealth>>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archive` | method | <code>archive(request: ArtifactArchiveRequest): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: DefaultArtifactManagerOptions): DefaultArtifactManager</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `createDownloadAccess` | method | <code>createDownloadAccess(input: ArtifactCreateDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `createFromWorkspace` | method | <code>createFromWorkspace(input: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `createVersion` | method | <code>createVersion(input: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `delete` | method | <code>delete(input: ArtifactDeleteRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `finalize` | method | <code>finalize(request: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: ArtifactGetRecordRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidate` | method | <code>invalidate(request: ArtifactInvalidateRequest): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `latest` | method | <code>latest(input: ArtifactLatestRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(input: ArtifactListRequest): Promise&lt;ArtifactRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `previous` | method | <code>previous(input: ArtifactPreviousRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `profile` | method | <code>profile(ref: SpecRef): Promise&lt;ArtifactProfileSpec &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `read` | method | <code>read(input: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactReadResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `traceLineage` | method | <code>traceLineage(input: ArtifactTraceLineageRequest): Promise&lt;ArtifactLineage&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DefaultArtifactManagerOptions`

Default Artifact Manager Options interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { DefaultArtifactManagerOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/runtime.ts)

### Declaration

```text
export interface DefaultArtifactManagerOptions {
    profiles: ArtifactProfileSpec[];
    stores: ArtifactStoreProvider[];
    repository: ArtifactRecordRepository;
    workspaceReader?: ArtifactWorkspaceContentReader;
    idGenerator: () => string;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `idGenerator` | method | <code>idGenerator(): string</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `profiles` | property | <code>profiles: ArtifactProfileSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `repository` | property | <code>repository: ArtifactRecordRepository</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stores` | property | <code>stores: ArtifactStoreProvider[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceReader` | property | <code>workspaceReader?: ArtifactWorkspaceContentReader</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
