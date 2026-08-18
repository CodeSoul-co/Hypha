# `@codesoul-co/hypha-adapters-local` / `local-workspace-snapshot-artifacts`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-workspace-snapshot-artifacts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-snapshot-artifacts.ts)
- Exports: **3**

## Using this module

Use the Local workspace snapshot artifacts module for declaring and enforcing workspace scope boundaries. It exports 1 class, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  LocalWorkspaceSnapshotArtifactService,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalWorkspaceSnapshotArtifactContext,
  LocalWorkspaceSnapshotArtifactServiceOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalWorkspaceSnapshotArtifactService` | class | <code>new LocalWorkspaceSnapshotArtifactService(options: LocalWorkspaceSnapshotArtifactServiceOptions): LocalWorkspaceSnapshotArtifactService</code> | Persists a full Workspace tree through ArtifactManager. Host paths never enter Artifact metadata; file bytes are collected through its governed Workspace reader port. |
| `LocalWorkspaceSnapshotArtifactContext` | interface | <code>interface LocalWorkspaceSnapshotArtifactContext</code> | Local Workspace Snapshot Artifact Context interface with 7 public fields or methods. |
| `LocalWorkspaceSnapshotArtifactServiceOptions` | interface | <code>interface LocalWorkspaceSnapshotArtifactServiceOptions</code> | Local Workspace Snapshot Artifact Service Options interface with 11 public fields or methods. |

## `LocalWorkspaceSnapshotArtifactService`

Persists a full Workspace tree through ArtifactManager. Host paths never enter Artifact metadata; file bytes are collected through its governed Workspace reader port.

- Kind: class
- Import: `import { LocalWorkspaceSnapshotArtifactService } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-workspace-snapshot-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-snapshot-artifacts.ts)

### Declaration

```text
export declare class LocalWorkspaceSnapshotArtifactService {
    constructor(options: LocalWorkspaceSnapshotArtifactServiceOptions);
    createFullSnapshot(input: WorkspaceSnapshotRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    restoreFullSnapshot(input: WorkspaceRestoreRequest, options?: ArtifactOperationOptions): Promise<void>;
    recoverInterruptedRestore(): Promise<LocalWorkspaceRestoreRecoveryResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LocalWorkspaceSnapshotArtifactServiceOptions): LocalWorkspaceSnapshotArtifactService</code> | Creates an instance of this class. |
| `createFullSnapshot` | method | <code>createFullSnapshot(input: WorkspaceSnapshotRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recoverInterruptedRestore` | method | <code>recoverInterruptedRestore(): Promise&lt;LocalWorkspaceRestoreRecoveryResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `restoreFullSnapshot` | method | <code>restoreFullSnapshot(input: WorkspaceRestoreRequest, options?: ArtifactOperationOptions): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LocalWorkspaceSnapshotArtifactContext`

Local Workspace Snapshot Artifact Context interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { LocalWorkspaceSnapshotArtifactContext } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-workspace-snapshot-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-snapshot-artifacts.ts)

### Declaration

```text
export interface LocalWorkspaceSnapshotArtifactContext {
    profileRef: SpecRef;
    userId: string;
    tenantId?: string;
    workspaceId: string;
    sessionId?: string;
    runId?: string;
    agentId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalWorkspaceSnapshotArtifactServiceOptions`

Local Workspace Snapshot Artifact Service Options interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { LocalWorkspaceSnapshotArtifactServiceOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-workspace-snapshot-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-snapshot-artifacts.ts)

### Declaration

```text
export interface LocalWorkspaceSnapshotArtifactServiceOptions {
    workspace: Pick<LocalWorkspaceAdapter, 'capture' | 'workspaceRoot'>;
    artifacts: Pick<ArtifactManager, 'create' | 'createFromWorkspace' | 'finalize' | 'read'>;
    context: LocalWorkspaceSnapshotArtifactContext;
    now?: () => string;
    nowMs?: () => number;
    maxManifestBytes?: number;
    maxSnapshotPersistenceDurationMs?: number;
    maxRestoreBytes?: number;
    maxRestoreEntries?: number;
    maxRestoreLockWaitDurationMs?: number;
    maxRestoreStagingDurationMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: Pick&lt;ArtifactManager, "read" &#124; "create" &#124; "createFromWorkspace" &#124; "finalize"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `context` | property | <code>context: LocalWorkspaceSnapshotArtifactContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxManifestBytes` | property | <code>maxManifestBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxRestoreBytes` | property | <code>maxRestoreBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxRestoreEntries` | property | <code>maxRestoreEntries?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxRestoreLockWaitDurationMs` | property | <code>maxRestoreLockWaitDurationMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxRestoreStagingDurationMs` | property | <code>maxRestoreStagingDurationMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxSnapshotPersistenceDurationMs` | property | <code>maxSnapshotPersistenceDurationMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `nowMs` | method | <code>nowMs?(): number</code> | Public method; parameters and return type are shown in the signature. |
| `workspace` | property | <code>workspace: Pick&lt;LocalWorkspaceAdapter, "workspaceRoot" &#124; "capture"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
