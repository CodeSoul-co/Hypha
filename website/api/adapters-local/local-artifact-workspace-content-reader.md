# `@codesoul-co/hypha-adapters-local` / `local-artifact-workspace-content-reader`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-artifact-workspace-content-reader.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-workspace-content-reader.ts)
- Exports: **2**

## Using this module

Use the Local artifact workspace content reader module for declaring and enforcing workspace scope boundaries. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  LocalArtifactWorkspaceContentReader,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalArtifactWorkspaceContentReaderOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalArtifactWorkspaceContentReader` | class | <code>new LocalArtifactWorkspaceContentReader(options: LocalArtifactWorkspaceContentReaderOptions): LocalArtifactWorkspaceContentReader</code> | Streams governed Workspace files into ArtifactManager without exposing host paths or buffering the complete output in memory. |
| `LocalArtifactWorkspaceContentReaderOptions` | interface | <code>interface LocalArtifactWorkspaceContentReaderOptions</code> | Local Artifact Workspace Content Reader Options interface with 5 public fields or methods. |

## `LocalArtifactWorkspaceContentReader`

Streams governed Workspace files into ArtifactManager without exposing host paths or buffering the complete output in memory.

- Kind: class
- Import: `import { LocalArtifactWorkspaceContentReader } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-workspace-content-reader`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-workspace-content-reader.ts)

### Declaration

```text
export declare class LocalArtifactWorkspaceContentReader implements ArtifactWorkspaceContentReader {
    constructor(options: LocalArtifactWorkspaceContentReaderOptions);
    read(request: ArtifactWorkspaceContentRequest): Promise<ArtifactWorkspaceContent>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LocalArtifactWorkspaceContentReaderOptions): LocalArtifactWorkspaceContentReader</code> | Creates an instance of this class. |
| `read` | method | <code>read(request: ArtifactWorkspaceContentRequest): Promise&lt;ArtifactWorkspaceContent&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LocalArtifactWorkspaceContentReaderOptions`

Local Artifact Workspace Content Reader Options interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { LocalArtifactWorkspaceContentReaderOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-workspace-content-reader`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-workspace-content-reader.ts)

### Declaration

```text
export interface LocalArtifactWorkspaceContentReaderOptions {
    workspaceRoot: string;
    workspaceId: string;
    userId: string;
    tenantId?: string;
    chunkSizeBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `chunkSizeBytes` | property | <code>chunkSizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceRoot` | property | <code>workspaceRoot: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
