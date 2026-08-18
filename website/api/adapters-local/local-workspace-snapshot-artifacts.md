# `@codesoul-co/hypha-adapters-local` / `local-workspace-snapshot-artifacts`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-workspace-snapshot-artifacts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-snapshot-artifacts.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalWorkspaceSnapshotArtifactService` | class | <code>new LocalWorkspaceSnapshotArtifactService(options: LocalWorkspaceSnapshotArtifactServiceOptions): LocalWorkspaceSnapshotArtifactService</code> | Persists a full Workspace tree through ArtifactManager. Host paths never enter Artifact metadata; file bytes are collected through its governed Workspace reader port. |
| `LocalWorkspaceSnapshotArtifactContext` | interface | <code>interface LocalWorkspaceSnapshotArtifactContext</code> | Field contract for Local Workspace Snapshot Artifact Context; see all contract members below. |
| `LocalWorkspaceSnapshotArtifactServiceOptions` | interface | <code>interface LocalWorkspaceSnapshotArtifactServiceOptions</code> | Field contract for Local Workspace Snapshot Artifact Service Options; see all contract members below. |

## `LocalWorkspaceSnapshotArtifactService` public members

Persists a full Workspace tree through ArtifactManager. Host paths never enter Artifact metadata; file bytes are collected through its governed Workspace reader port.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LocalWorkspaceSnapshotArtifactServiceOptions): LocalWorkspaceSnapshotArtifactService</code> | Creates an instance of this class. |
| `createFullSnapshot` | method | <code>createFullSnapshot(input: WorkspaceSnapshotRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Creates Full Snapshot at this module boundary. |
| `recoverInterruptedRestore` | method | <code>recoverInterruptedRestore(): Promise&lt;LocalWorkspaceRestoreRecoveryResult&gt;</code> | Public runtime operation for recover Interrupted Restore. |
| `restoreFullSnapshot` | method | <code>restoreFullSnapshot(input: WorkspaceRestoreRequest, options?: ArtifactOperationOptions): Promise&lt;void&gt;</code> | Public runtime operation for restore Full Snapshot. |

## `LocalWorkspaceSnapshotArtifactContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public profile Ref property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `LocalWorkspaceSnapshotArtifactServiceOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: Pick&lt;ArtifactManager, "read" &#124; "create" &#124; "createFromWorkspace" &#124; "finalize"&gt;</code> | Public artifacts property. |
| `context` | property | <code>context: LocalWorkspaceSnapshotArtifactContext</code> | Public context property. |
| `maxManifestBytes` | property | <code>maxManifestBytes: number</code> | Public max Manifest Bytes property. |
| `maxRestoreBytes` | property | <code>maxRestoreBytes: number</code> | Public max Restore Bytes property. |
| `maxRestoreEntries` | property | <code>maxRestoreEntries: number</code> | Public max Restore Entries property. |
| `maxRestoreLockWaitDurationMs` | property | <code>maxRestoreLockWaitDurationMs: number</code> | Public max Restore Lock Wait Duration Ms property. |
| `maxRestoreStagingDurationMs` | property | <code>maxRestoreStagingDurationMs: number</code> | Public max Restore Staging Duration Ms property. |
| `maxSnapshotPersistenceDurationMs` | property | <code>maxSnapshotPersistenceDurationMs: number</code> | Public max Snapshot Persistence Duration Ms property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `nowMs` | method | <code>nowMs(): number</code> | Public runtime operation for now Ms. |
| `workspace` | property | <code>workspace: Pick&lt;LocalWorkspaceAdapter, "workspaceRoot" &#124; "capture"&gt;</code> | Public workspace property. |
