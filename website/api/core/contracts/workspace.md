# `@codesoul-co/hypha-core` / `contracts/workspace`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/workspace.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)
- Exports: **39**

## Using this module

Use the Workspace module for declaring and runtime-validating contracts. It exports 30 interfaces, 9 types.

### Import from the package entrypoint

```ts
import type {
  FileMutation,
  ResolvedWorkspacePath,
  WorkspaceCleanupPolicySpec,
  WorkspaceDeleteRequest,
  WorkspaceDiffRequest,
  WorkspaceDiffResult,
  WorkspaceDiffSummary,
  WorkspaceDirectorySpec,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 39 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `FileMutation` | interface | <code>interface FileMutation</code> | File Mutation interface with 9 public fields or methods. |
| `ResolvedWorkspacePath` | interface | <code>interface ResolvedWorkspacePath</code> | Resolved Workspace Path interface with 8 public fields or methods. |
| `WorkspaceCleanupPolicySpec` | interface | <code>interface WorkspaceCleanupPolicySpec</code> | Workspace Cleanup Policy Spec interface with 6 public fields or methods. |
| `WorkspaceDeleteRequest` | interface | <code>interface WorkspaceDeleteRequest</code> | Workspace Delete Request interface with 7 public fields or methods. |
| `WorkspaceDiffRequest` | interface | <code>interface WorkspaceDiffRequest</code> | Workspace Diff Request interface with 6 public fields or methods. |
| `WorkspaceDiffResult` | interface | <code>interface WorkspaceDiffResult</code> | Workspace Diff Result interface with 5 public fields or methods. |
| `WorkspaceDiffSummary` | interface | <code>interface WorkspaceDiffSummary</code> | Workspace Diff Summary interface with 7 public fields or methods. |
| `WorkspaceDirectorySpec` | interface | <code>interface WorkspaceDirectorySpec</code> | Workspace Directory Spec interface with 9 public fields or methods. |
| `WorkspaceEventPayload` | interface | <code>interface WorkspaceEventPayload</code> | Workspace Event Payload interface with 12 public fields or methods. |
| `WorkspaceFileEntry` | interface | <code>interface WorkspaceFileEntry</code> | Workspace File Entry interface with 6 public fields or methods. |
| `WorkspaceListRequest` | interface | <code>interface WorkspaceListRequest</code> | Workspace List Request interface with 7 public fields or methods. |
| `WorkspaceMutationPolicySpec` | interface | <code>interface WorkspaceMutationPolicySpec</code> | Workspace Mutation Policy Spec interface with 7 public fields or methods. |
| `WorkspacePatchConflict` | interface | <code>interface WorkspacePatchConflict</code> | Workspace Patch Conflict interface with 4 public fields or methods. |
| `WorkspacePatchRequest` | interface | <code>interface WorkspacePatchRequest</code> | Workspace Patch Request interface with 8 public fields or methods. |
| `WorkspacePatchResult` | interface | <code>interface WorkspacePatchResult</code> | Workspace Patch Result interface with 5 public fields or methods. |
| `WorkspacePathPolicySpec` | interface | <code>interface WorkspacePathPolicySpec</code> | Workspace Path Policy Spec interface with 12 public fields or methods. |
| `WorkspacePathRequest` | interface | <code>interface WorkspacePathRequest</code> | Workspace Path Request interface with 5 public fields or methods. |
| `WorkspaceQuotaSpec` | interface | <code>interface WorkspaceQuotaSpec</code> | Workspace Quota Spec interface with 6 public fields or methods. |
| `WorkspaceReadRequest` | interface | <code>interface WorkspaceReadRequest</code> | Workspace Read Request interface with 7 public fields or methods. |
| `WorkspaceReadResult` | interface | <code>interface WorkspaceReadResult</code> | Workspace Read Result interface with 7 public fields or methods. |
| `WorkspaceRecord` | interface | <code>interface WorkspaceRecord</code> | Workspace Record interface with 22 public fields or methods. |
| `WorkspaceRestoreRequest` | interface | <code>interface WorkspaceRestoreRequest</code> | Workspace Restore Request interface with 6 public fields or methods. |
| `WorkspaceSnapshotEntry` | interface | <code>interface WorkspaceSnapshotEntry</code> | Workspace Snapshot Entry interface with 7 public fields or methods. |
| `WorkspaceSnapshotManifest` | interface | <code>interface WorkspaceSnapshotManifest</code> | Workspace Snapshot Manifest interface with 12 public fields or methods. |
| `WorkspaceSnapshotPolicySpec` | interface | <code>interface WorkspaceSnapshotPolicySpec</code> | Workspace Snapshot Policy Spec interface with 6 public fields or methods. |
| `WorkspaceSnapshotRequest` | interface | <code>interface WorkspaceSnapshotRequest</code> | Workspace Snapshot Request interface with 10 public fields or methods. |
| `WorkspaceSpec` | interface | <code>interface WorkspaceSpec extends VersionedSpec, SpecMetadata</code> | Workspace Spec interface with 21 public fields or methods. |
| `WorkspaceUsage` | interface | <code>interface WorkspaceUsage</code> | Workspace Usage interface with 4 public fields or methods. |
| `WorkspaceWriteRequest` | interface | <code>interface WorkspaceWriteRequest</code> | Workspace Write Request interface with 10 public fields or methods. |
| `WorkspaceWriteResult` | interface | <code>interface WorkspaceWriteResult</code> | Workspace Write Result interface with 6 public fields or methods. |
| `WorkspaceEntryKind` | type | <code>type WorkspaceEntryKind = 'file' &#124; 'directory' &#124; 'symlink' &#124; 'other'</code> | Public type alias for Workspace Entry Kind; the declaration contains its complete type expression. |
| `WorkspaceEventCreateInput` | type | <code>type WorkspaceEventCreateInput = Omit&lt;EventCreateInput&lt;WorkspaceEventPayloadMap[TType]&gt;, 'type' &#124; 'workspaceId'&gt; &amp; { type: TType; workspaceId: string; }</code> | Public type alias for Workspace Event Create Input; the declaration contains its complete type expression. |
| `WorkspaceEventPayloadMap` | type | <code>type WorkspaceEventPayloadMap = { 'workspace.create.requested': WorkspaceEventPayloadWithRequired&lt;'operationId' &#124; 'profileRef'&gt;; 'workspace.created': WorkspaceEventPayloadWithRequired&lt;'operationId' &#124; 'profileRef' &#124; 'status'&gt;; 'workspace.ready': WorkspaceStatusEventPayload&lt;'ready'&gt;; 'workspace.busy': WorkspaceStatusEventPayload&lt;'busy'&gt;; 'workspace.path.resolved': WorkspaceEventPayloadWithRequired&lt;'operationId'&gt;; 'w...</code> | Public type alias for Workspace Event Payload Map; the declaration contains its complete type expression. |
| `WorkspaceFrameworkEvent` | type | <code>type WorkspaceFrameworkEvent = Omit&lt;FrameworkEvent&lt;WorkspaceEventPayloadMap[TType]&gt;, 'type' &#124; 'workspaceId'&gt; &amp; { type: TType; workspaceId: string; }</code> | Public type alias for Workspace Framework Event; the declaration contains its complete type expression. |
| `WorkspaceFrameworkEventType` | type | <code>type WorkspaceFrameworkEventType = 'workspace.create.requested' &#124; 'workspace.created' &#124; 'workspace.ready' &#124; 'workspace.busy' &#124; 'workspace.path.resolved' &#124; 'workspace.path.denied' &#124; 'workspace.quota.exceeded' &#124; 'workspace.snapshot.requested' &#124; 'workspace.snapshot.created' &#124; 'workspace.snapshot.failed' &#124; 'workspace.restore.requested' &#124; 'workspace.restored' &#124; 'workspace.restore.failed' &#124; 'workspace.patch.checked' &#124; '...</code> | Public type alias for Workspace Framework Event Type; the declaration contains its complete type expression. |
| `WorkspacePathOperation` | type | <code>type WorkspacePathOperation = 'read' &#124; 'write' &#124; 'execute' &#124; 'delete' &#124; 'list'</code> | Public type alias for Workspace Path Operation; the declaration contains its complete type expression. |
| `WorkspacePermission` | type | <code>type WorkspacePermission = 'read' &#124; 'write' &#124; 'execute' &#124; 'delete'</code> | Public type alias for Workspace Permission; the declaration contains its complete type expression. |
| `WorkspaceSnapshotType` | type | <code>type WorkspaceSnapshotType = 'full' &#124; 'incremental' &#124; 'manifest_only' &#124; 'failure_snapshot'</code> | Public type alias for Workspace Snapshot Type; the declaration contains its complete type expression. |
| `WorkspaceStatus` | type | <code>type WorkspaceStatus = 'creating' &#124; 'ready' &#124; 'busy' &#124; 'snapshotting' &#124; 'archiving' &#124; 'archived' &#124; 'cleaning' &#124; 'cleaned' &#124; 'failed'</code> | Public type alias for Workspace Status; the declaration contains its complete type expression. |

## `FileMutation`

File Mutation interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { FileMutation } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface FileMutation {
    path: string;
    operation: 'created' | 'modified' | 'deleted' | 'renamed' | 'permission_changed';
    beforeHash?: string;
    afterHash?: string;
    beforeSizeBytes?: number;
    afterSizeBytes?: number;
    artifactRef?: string;
    oldPath?: string;
    detectedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `afterHash` | property | <code>afterHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `afterSizeBytes` | property | <code>afterSizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `artifactRef` | property | <code>artifactRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `beforeHash` | property | <code>beforeHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `beforeSizeBytes` | property | <code>beforeSizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `detectedAt` | property | <code>detectedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `oldPath` | property | <code>oldPath?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: "created" &#124; "deleted" &#124; "modified" &#124; "renamed" &#124; "permission_changed"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `path` | property | <code>path: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ResolvedWorkspacePath`

Resolved Workspace Path interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ResolvedWorkspacePath } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface ResolvedWorkspacePath {
    workspaceId: string;
    relativePath: string;
    canonicalRelativePath: string;
    pathRef: string;
    exists: boolean;
    kind?: WorkspaceEntryKind;
    permissions: WorkspacePermission[];
    contentHash?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalRelativePath` | property | <code>canonicalRelativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `exists` | property | <code>exists: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind?: WorkspaceEntryKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pathRef` | property | <code>pathRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permissions` | property | <code>permissions: WorkspacePermission[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceCleanupPolicySpec`

Workspace Cleanup Policy Spec interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceCleanupPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceCleanupPolicySpec {
    mode: 'on_run_end' | 'on_success' | 'after_ttl' | 'retain' | 'manual';
    ttlSeconds?: number;
    retainOnFailure?: boolean;
    retainSnapshots?: boolean;
    secureDelete?: boolean;
    archiveBeforeDelete?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archiveBeforeDelete` | property | <code>archiveBeforeDelete?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "on_run_end" &#124; "on_success" &#124; "after_ttl" &#124; "retain" &#124; "manual"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retainOnFailure` | property | <code>retainOnFailure?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retainSnapshots` | property | <code>retainSnapshots?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `secureDelete` | property | <code>secureDelete?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlSeconds` | property | <code>ttlSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceDeleteRequest`

Workspace Delete Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceDeleteRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceDeleteRequest {
    operationId: string;
    workspaceId: string;
    principal: ExecutionPrincipal;
    relativePath: string;
    recursive?: boolean;
    expectedContentHash?: string;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedContentHash` | property | <code>expectedContentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recursive` | property | <code>recursive?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceDiffRequest`

Workspace Diff Request interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceDiffRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceDiffRequest {
    operationId: string;
    workspaceId: string;
    principal: ExecutionPrincipal;
    fromSnapshotRef: string;
    toSnapshotRef?: string;
    createPatchArtifact?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createPatchArtifact` | property | <code>createPatchArtifact?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fromSnapshotRef` | property | <code>fromSnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toSnapshotRef` | property | <code>toSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceDiffResult`

Workspace Diff Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceDiffResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceDiffResult {
    fromSnapshotRef: string;
    toSnapshotRef?: string;
    mutations: FileMutation[];
    patchArtifactRef?: string;
    summary: WorkspaceDiffSummary;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fromSnapshotRef` | property | <code>fromSnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mutations` | property | <code>mutations: FileMutation[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `patchArtifactRef` | property | <code>patchArtifactRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `summary` | property | <code>summary: WorkspaceDiffSummary</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toSnapshotRef` | property | <code>toSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceDiffSummary`

Workspace Diff Summary interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceDiffSummary } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceDiffSummary {
    created: number;
    modified: number;
    deleted: number;
    renamed: number;
    permissionChanged: number;
    bytesAdded: number;
    bytesRemoved: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `bytesAdded` | property | <code>bytesAdded: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `bytesRemoved` | property | <code>bytesRemoved: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `created` | property | <code>created: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deleted` | property | <code>deleted: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modified` | property | <code>modified: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permissionChanged` | property | <code>permissionChanged: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `renamed` | property | <code>renamed: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceDirectorySpec`

Workspace Directory Spec interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceDirectorySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceDirectorySpec {
    inputs: string;
    source: string;
    working: string;
    outputs: string;
    logs: string;
    temp: string;
    snapshots: string;
    artifacts?: string;
    cache?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cache` | property | <code>cache?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputs` | property | <code>inputs: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `logs` | property | <code>logs: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputs` | property | <code>outputs: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshots` | property | <code>snapshots: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `temp` | property | <code>temp: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `working` | property | <code>working: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceEventPayload`

Workspace Event Payload interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceEventPayload } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceEventPayload {
    operationId?: string;
    workspaceId: string;
    profileRef?: SpecRef;
    status?: WorkspaceStatus;
    sourceTreeHash?: string;
    workspaceSnapshotHash?: string;
    snapshotManifestHash?: string;
    artifactRefs?: string[];
    bytes?: number;
    files?: number;
    error?: NormalizedExecutionError;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `bytes` | property | <code>bytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedExecutionError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `files` | property | <code>files?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotManifestHash` | property | <code>snapshotManifestHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceTreeHash` | property | <code>sourceTreeHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status?: WorkspaceStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceSnapshotHash` | property | <code>workspaceSnapshotHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceFileEntry`

Workspace File Entry interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceFileEntry } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceFileEntry {
    relativePath: string;
    kind: WorkspaceEntryKind;
    sizeBytes?: number;
    contentHash?: string;
    modifiedAt?: string;
    permissions?: WorkspacePermission[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: WorkspaceEntryKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modifiedAt` | property | <code>modifiedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permissions` | property | <code>permissions?: WorkspacePermission[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceListRequest`

Workspace List Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceListRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceListRequest {
    workspaceId: string;
    principal: ExecutionPrincipal;
    relativePath?: string;
    recursive?: boolean;
    includeHidden?: boolean;
    maxEntries?: number;
    cursor?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cursor` | property | <code>cursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeHidden` | property | <code>includeHidden?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEntries` | property | <code>maxEntries?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recursive` | property | <code>recursive?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceMutationPolicySpec`

Workspace Mutation Policy Spec interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceMutationPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceMutationPolicySpec {
    requireSnapshotBeforeWrite?: boolean;
    trackFileMutations?: boolean;
    maxPatchBytes?: number;
    allowDelete?: boolean;
    requireApprovalForDelete?: boolean;
    preserveInputFiles?: boolean;
    atomicWrite?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowDelete` | property | <code>allowDelete?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `atomicWrite` | property | <code>atomicWrite?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxPatchBytes` | property | <code>maxPatchBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preserveInputFiles` | property | <code>preserveInputFiles?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireApprovalForDelete` | property | <code>requireApprovalForDelete?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireSnapshotBeforeWrite` | property | <code>requireSnapshotBeforeWrite?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trackFileMutations` | property | <code>trackFileMutations?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspacePatchConflict`

Workspace Patch Conflict interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { WorkspacePatchConflict } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspacePatchConflict {
    path: string;
    reason: string;
    expectedHash?: string;
    actualHash?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actualHash` | property | <code>actualHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedHash` | property | <code>expectedHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `path` | property | <code>path: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspacePatchRequest`

Workspace Patch Request interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { WorkspacePatchRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspacePatchRequest {
    operationId: string;
    workspaceId: string;
    principal: ExecutionPrincipal;
    patchArtifactRef: string;
    expectedBaseSnapshotHash?: string;
    mode: 'check' | 'apply';
    conflictPolicy: 'fail' | 'three_way' | 'mark_conflicts';
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `conflictPolicy` | property | <code>conflictPolicy: "fail" &#124; "three_way" &#124; "mark_conflicts"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedBaseSnapshotHash` | property | <code>expectedBaseSnapshotHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "check" &#124; "apply"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `patchArtifactRef` | property | <code>patchArtifactRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspacePatchResult`

Workspace Patch Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { WorkspacePatchResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspacePatchResult {
    checked: boolean;
    applied: boolean;
    conflicts: WorkspacePatchConflict[];
    mutations: FileMutation[];
    resultingWorkspaceSnapshotHash?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `applied` | property | <code>applied: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `checked` | property | <code>checked: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `conflicts` | property | <code>conflicts: WorkspacePatchConflict[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mutations` | property | <code>mutations: FileMutation[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resultingWorkspaceSnapshotHash` | property | <code>resultingWorkspaceSnapshotHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspacePathPolicySpec`

Workspace Path Policy Spec interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { WorkspacePathPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspacePathPolicySpec {
    /** Read permission only. Exact or descendant deny rules always take precedence. */
    readOnlyPaths?: string[];
    /** Write permission only. Exact or descendant deny rules always take precedence. */
    writablePaths?: string[];
    /** Execute permission only. Exact or descendant deny rules always take precedence. */
    executablePaths?: string[];
    /** Final deny boundary; it cannot be widened by any allow list. */
    deniedPaths?: string[];
    allowSymlinks?: boolean;
    allowHardLinks?: boolean;
    followSymlinksForRead?: boolean;
    allowHiddenFiles?: boolean;
    maxPathLength?: number;
    allowedExtensions?: string[];
    deniedExtensions?: string[];
    caseSensitivity?: 'platform' | 'sensitive' | 'insensitive';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedExtensions` | property | <code>allowedExtensions?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowHardLinks` | property | <code>allowHardLinks?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowHiddenFiles` | property | <code>allowHiddenFiles?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowSymlinks` | property | <code>allowSymlinks?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `caseSensitivity` | property | <code>caseSensitivity?: "platform" &#124; "sensitive" &#124; "insensitive"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deniedExtensions` | property | <code>deniedExtensions?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deniedPaths` | property | <code>deniedPaths?: string[]</code> | Final deny boundary; it cannot be widened by any allow list. |
| `executablePaths` | property | <code>executablePaths?: string[]</code> | Execute permission only. Exact or descendant deny rules always take precedence. |
| `followSymlinksForRead` | property | <code>followSymlinksForRead?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxPathLength` | property | <code>maxPathLength?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `readOnlyPaths` | property | <code>readOnlyPaths?: string[]</code> | Read permission only. Exact or descendant deny rules always take precedence. |
| `writablePaths` | property | <code>writablePaths?: string[]</code> | Write permission only. Exact or descendant deny rules always take precedence. |

## `WorkspacePathRequest`

Workspace Path Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { WorkspacePathRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspacePathRequest {
    workspaceId: string;
    principal: ExecutionPrincipal;
    relativePath: string;
    operation: WorkspacePathOperation;
    allowMissing?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowMissing` | property | <code>allowMissing?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: WorkspacePathOperation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceQuotaSpec`

Workspace Quota Spec interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceQuotaSpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceQuotaSpec {
    maxBytes?: number;
    maxFiles?: number;
    maxSingleFileBytes?: number;
    maxDirectoryDepth?: number;
    maxOpenFiles?: number;
    maxMutationCountPerExecution?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxBytes` | property | <code>maxBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxDirectoryDepth` | property | <code>maxDirectoryDepth?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxFiles` | property | <code>maxFiles?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxMutationCountPerExecution` | property | <code>maxMutationCountPerExecution?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxOpenFiles` | property | <code>maxOpenFiles?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxSingleFileBytes` | property | <code>maxSingleFileBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceReadRequest`

Workspace Read Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceReadRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceReadRequest {
    workspaceId: string;
    principal: ExecutionPrincipal;
    relativePath: string;
    encoding?: 'utf8' | 'base64';
    offset?: number;
    length?: number;
    maxBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `encoding` | property | <code>encoding?: "utf8" &#124; "base64"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `length` | property | <code>length?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxBytes` | property | <code>maxBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `offset` | property | <code>offset?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceReadResult`

Workspace Read Result interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceReadResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceReadResult {
    relativePath: string;
    encoding: 'utf8' | 'base64';
    content: string;
    contentHash: string;
    sizeBytes: number;
    truncated?: boolean;
    nextOffset?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `encoding` | property | <code>encoding: "utf8" &#124; "base64"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextOffset` | property | <code>nextOffset?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `truncated` | property | <code>truncated?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceRecord`

Workspace Record interface with 22 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceRecord {
    id: string;
    revision: number;
    tenantId?: string;
    userId: string;
    sessionId?: string;
    runId?: string;
    agentId?: string;
    profileRef: SpecRef;
    profileRevision: string;
    rootPathRef: string;
    status: WorkspaceStatus;
    quota: WorkspaceQuotaSpec;
    usage: WorkspaceUsage;
    activeExecutionIds: string[];
    latestSnapshotRef?: string;
    createdAt: string;
    readyAt?: string;
    updatedAt: string;
    expiresAt?: string;
    cleanedAt?: string;
    error?: NormalizedExecutionError;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeExecutionIds` | property | <code>activeExecutionIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cleanedAt` | property | <code>cleanedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedExecutionError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `latestSnapshotRef` | property | <code>latestSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `quota` | property | <code>quota: WorkspaceQuotaSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `readyAt` | property | <code>readyAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rootPathRef` | property | <code>rootPathRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: WorkspaceStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `usage` | property | <code>usage: WorkspaceUsage</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceRestoreRequest`

Workspace Restore Request interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceRestoreRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceRestoreRequest {
    operationId: string;
    workspaceId: string;
    principal: ExecutionPrincipal;
    snapshotRef: string;
    expectedWorkspaceSnapshotHash?: string;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedWorkspaceSnapshotHash` | property | <code>expectedWorkspaceSnapshotHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotRef` | property | <code>snapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceSnapshotEntry`

Workspace Snapshot Entry interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceSnapshotEntry } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceSnapshotEntry {
    path: string;
    kind: 'file' | 'directory' | 'symlink';
    sizeBytes?: number;
    contentHash?: string;
    mode?: number;
    /** Required only for symlink entries; always Workspace-relative. */
    symlinkTarget?: string;
    artifactRef?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "file" &#124; "directory" &#124; "symlink"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `path` | property | <code>path: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `symlinkTarget` | property | <code>symlinkTarget?: string</code> | Required only for symlink entries; always Workspace-relative. |

## `WorkspaceSnapshotManifest`

Workspace Snapshot Manifest interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceSnapshotManifest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceSnapshotManifest {
    id: string;
    workspaceId: string;
    baseSnapshotId?: string;
    entries: WorkspaceSnapshotEntry[];
    ignoredPatterns?: string[];
    sourceTreeHash: string;
    manifestHash: string;
    totalBytes: number;
    fileCount: number;
    createdAt: string;
    createdBy: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseSnapshotId` | property | <code>baseSnapshotId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdBy` | property | <code>createdBy: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `entries` | property | <code>entries: WorkspaceSnapshotEntry[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fileCount` | property | <code>fileCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ignoredPatterns` | property | <code>ignoredPatterns?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `manifestHash` | property | <code>manifestHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceTreeHash` | property | <code>sourceTreeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalBytes` | property | <code>totalBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceSnapshotPolicySpec`

Workspace Snapshot Policy Spec interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceSnapshotPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceSnapshotPolicySpec {
    enabled: boolean;
    mode: 'full' | 'incremental' | 'manifest_only';
    snapshotBeforeWrite?: boolean;
    snapshotAfterExecution?: boolean;
    snapshotOnFailure?: boolean;
    maxSnapshots?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enabled` | property | <code>enabled: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxSnapshots` | property | <code>maxSnapshots?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "full" &#124; "incremental" &#124; "manifest_only"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotAfterExecution` | property | <code>snapshotAfterExecution?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotBeforeWrite` | property | <code>snapshotBeforeWrite?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotOnFailure` | property | <code>snapshotOnFailure?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceSnapshotRequest`

Workspace Snapshot Request interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceSnapshotRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceSnapshotRequest {
    operationId: string;
    workspaceId: string;
    principal: ExecutionPrincipal;
    type: WorkspaceSnapshotType;
    baseSnapshotRef?: string;
    includePaths?: string[];
    excludePatterns?: string[];
    reason?: string;
    idempotencyKey?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseSnapshotRef` | property | <code>baseSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `excludePatterns` | property | <code>excludePatterns?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includePaths` | property | <code>includePaths?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: WorkspaceSnapshotType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceSpec`

Workspace Spec interface with 21 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceSpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceSpec extends VersionedSpec, SpecMetadata {
    revision?: string;
    rootPolicy: 'managed' | 'provided_ref';
    rootRef?: string;
    directories: WorkspaceDirectorySpec;
    pathPolicy: WorkspacePathPolicySpec;
    quota: WorkspaceQuotaSpec;
    cleanup: WorkspaceCleanupPolicySpec;
    snapshot: WorkspaceSnapshotPolicySpec;
    mutation: WorkspaceMutationPolicySpec;
    executionEnvironmentRef?: SpecRef;
    artifactProfileRef?: SpecRef;
    secretPolicyRef?: SpecRef;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactProfileRef` | property | <code>artifactProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cleanup` | property | <code>cleanup: WorkspaceCleanupPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `directories` | property | <code>directories: WorkspaceDirectorySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionEnvironmentRef` | property | <code>executionEnvironmentRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mutation` | property | <code>mutation: WorkspaceMutationPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pathPolicy` | property | <code>pathPolicy: WorkspacePathPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `quota` | property | <code>quota: WorkspaceQuotaSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rootPolicy` | property | <code>rootPolicy: "managed" &#124; "provided_ref"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rootRef` | property | <code>rootRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `secretPolicyRef` | property | <code>secretPolicyRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshot` | property | <code>snapshot: WorkspaceSnapshotPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceUsage`

Workspace Usage interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceUsage } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceUsage {
    bytes: number;
    files: number;
    directories?: number;
    lastCalculatedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `bytes` | property | <code>bytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `directories` | property | <code>directories?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `files` | property | <code>files: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastCalculatedAt` | property | <code>lastCalculatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceWriteRequest`

Workspace Write Request interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceWriteRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceWriteRequest {
    operationId: string;
    workspaceId: string;
    principal: ExecutionPrincipal;
    relativePath: string;
    content?: string | Uint8Array;
    artifactRef?: string;
    mode: 'create' | 'overwrite' | 'append' | 'atomic_replace';
    expectedContentHash?: string;
    createParents?: boolean;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content?: string &#124; Uint8Array&lt;ArrayBufferLike&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createParents` | property | <code>createParents?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedContentHash` | property | <code>expectedContentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "create" &#124; "overwrite" &#124; "append" &#124; "atomic_replace"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceWriteResult`

Workspace Write Result interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceWriteResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export interface WorkspaceWriteResult {
    relativePath: string;
    beforeHash?: string;
    afterHash: string;
    sizeBytes: number;
    mutation: FileMutation;
    artifactRef?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `afterHash` | property | <code>afterHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `artifactRef` | property | <code>artifactRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `beforeHash` | property | <code>beforeHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mutation` | property | <code>mutation: FileMutation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceEntryKind`

Public type alias for Workspace Entry Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { WorkspaceEntryKind } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export type WorkspaceEntryKind = 'file' | 'directory' | 'symlink' | 'other';
```

## `WorkspaceEventCreateInput`

Public type alias for Workspace Event Create Input; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { WorkspaceEventCreateInput } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export type WorkspaceEventCreateInput<TType extends WorkspaceFrameworkEventType = WorkspaceFrameworkEventType> = Omit<EventCreateInput<WorkspaceEventPayloadMap[TType]>, 'type' | 'workspaceId'> & {
    type: TType;
    workspaceId: string;
};
```

## `WorkspaceEventPayloadMap`

Public type alias for Workspace Event Payload Map; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { WorkspaceEventPayloadMap } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export type WorkspaceEventPayloadMap = {
    'workspace.create.requested': WorkspaceEventPayloadWithRequired<'operationId' | 'profileRef'>;
    'workspace.created': WorkspaceEventPayloadWithRequired<'operationId' | 'profileRef' | 'status'>;
    'workspace.ready': WorkspaceStatusEventPayload<'ready'>;
    'workspace.busy': WorkspaceStatusEventPayload<'busy'>;
    'workspace.path.resolved': WorkspaceEventPayloadWithRequired<'operationId'>;
    'workspace.path.denied': WorkspaceEventPayloadWithRequired<'operationId' | 'error'>;
    'workspace.quota.exceeded': WorkspaceQuotaExceededEventPayload;
    'workspace.snapshot.requested': WorkspaceEventPayloadWithRequired<'operationId'>;
    'workspace.snapshot.created': WorkspaceEventPayloadWithRequired<'operationId' | 'snapshotManifestHash' | 'artifactRefs'>;
    'workspace.snapshot.failed': WorkspaceEventPayloadWithRequired<'operationId' | 'error'>;
    'workspace.restore.requested': WorkspaceEventPayloadWithRequired<'operationId' | 'artifactRefs'>;
    'workspace.restored': WorkspaceEventPayloadWithRequired<'operationId' | 'workspaceSnapshotHash'>;
    'workspace.restore.failed': WorkspaceEventPayloadWithRequired<'operationId' | 'error'>;
    'workspace.patch.checked': WorkspaceEventPayloadWithRequired<'operationId'>;
    'workspace.patch.applied': WorkspaceEventPayloadWithRequired<'operationId' | 'workspaceSnapshotHash'>;
    'workspace.patch.conflict': WorkspaceEventPayloadWithRequired<'operationId'>;
    'workspace.cleanup.started': WorkspaceEventPayloadWithRequired<'operationId'>;
    'workspace.cleanup.completed': WorkspaceEventPayloadWithRequired<'operationId'>;
    'workspace.cleanup.failed': WorkspaceEventPayloadWithRequired<'operationId' | 'error'>;
};
```

## `WorkspaceFrameworkEvent`

Public type alias for Workspace Framework Event; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { WorkspaceFrameworkEvent } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export type WorkspaceFrameworkEvent<TType extends WorkspaceFrameworkEventType = WorkspaceFrameworkEventType> = Omit<FrameworkEvent<WorkspaceEventPayloadMap[TType]>, 'type' | 'workspaceId'> & {
    type: TType;
    workspaceId: string;
};
```

## `WorkspaceFrameworkEventType`

Public type alias for Workspace Framework Event Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { WorkspaceFrameworkEventType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export type WorkspaceFrameworkEventType = 'workspace.create.requested' | 'workspace.created' | 'workspace.ready' | 'workspace.busy' | 'workspace.path.resolved' | 'workspace.path.denied' | 'workspace.quota.exceeded' | 'workspace.snapshot.requested' | 'workspace.snapshot.created' | 'workspace.snapshot.failed' | 'workspace.restore.requested' | 'workspace.restored' | 'workspace.restore.failed' | 'workspace.patch.checked' | 'workspace.patch.applied' | 'workspace.patch.conflict' | 'workspace.cleanup.started' | 'workspace.cleanup.completed' | 'workspace.cleanup.failed';
```

## `WorkspacePathOperation`

Public type alias for Workspace Path Operation; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { WorkspacePathOperation } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export type WorkspacePathOperation = 'read' | 'write' | 'execute' | 'delete' | 'list';
```

## `WorkspacePermission`

Public type alias for Workspace Permission; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { WorkspacePermission } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export type WorkspacePermission = 'read' | 'write' | 'execute' | 'delete';
```

## `WorkspaceSnapshotType`

Public type alias for Workspace Snapshot Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { WorkspaceSnapshotType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export type WorkspaceSnapshotType = 'full' | 'incremental' | 'manifest_only' | 'failure_snapshot';
```

## `WorkspaceStatus`

Public type alias for Workspace Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { WorkspaceStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### Declaration

```text
export type WorkspaceStatus = 'creating' | 'ready' | 'busy' | 'snapshotting' | 'archiving' | 'archived' | 'cleaning' | 'cleaned' | 'failed';
```
