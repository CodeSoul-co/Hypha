# `@codesoul-co/hypha-core` / `contracts/workspace`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/workspace.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)
- Exports: **39**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `FileMutation` | interface | <code>interface FileMutation</code> | Field contract for File Mutation; see all contract members below. |
| `ResolvedWorkspacePath` | interface | <code>interface ResolvedWorkspacePath</code> | Field contract for Resolved Workspace Path; see all contract members below. |
| `WorkspaceCleanupPolicySpec` | interface | <code>interface WorkspaceCleanupPolicySpec</code> | Field contract for Workspace Cleanup Policy Spec; see all contract members below. |
| `WorkspaceDeleteRequest` | interface | <code>interface WorkspaceDeleteRequest</code> | Field contract for Workspace Delete Request; see all contract members below. |
| `WorkspaceDiffRequest` | interface | <code>interface WorkspaceDiffRequest</code> | Field contract for Workspace Diff Request; see all contract members below. |
| `WorkspaceDiffResult` | interface | <code>interface WorkspaceDiffResult</code> | Field contract for Workspace Diff Result; see all contract members below. |
| `WorkspaceDiffSummary` | interface | <code>interface WorkspaceDiffSummary</code> | Field contract for Workspace Diff Summary; see all contract members below. |
| `WorkspaceDirectorySpec` | interface | <code>interface WorkspaceDirectorySpec</code> | Field contract for Workspace Directory Spec; see all contract members below. |
| `WorkspaceEventPayload` | interface | <code>interface WorkspaceEventPayload</code> | Field contract for Workspace Event Payload; see all contract members below. |
| `WorkspaceFileEntry` | interface | <code>interface WorkspaceFileEntry</code> | Field contract for Workspace File Entry; see all contract members below. |
| `WorkspaceListRequest` | interface | <code>interface WorkspaceListRequest</code> | Field contract for Workspace List Request; see all contract members below. |
| `WorkspaceMutationPolicySpec` | interface | <code>interface WorkspaceMutationPolicySpec</code> | Field contract for Workspace Mutation Policy Spec; see all contract members below. |
| `WorkspacePatchConflict` | interface | <code>interface WorkspacePatchConflict</code> | Field contract for Workspace Patch Conflict; see all contract members below. |
| `WorkspacePatchRequest` | interface | <code>interface WorkspacePatchRequest</code> | Field contract for Workspace Patch Request; see all contract members below. |
| `WorkspacePatchResult` | interface | <code>interface WorkspacePatchResult</code> | Field contract for Workspace Patch Result; see all contract members below. |
| `WorkspacePathPolicySpec` | interface | <code>interface WorkspacePathPolicySpec</code> | Field contract for Workspace Path Policy Spec; see all contract members below. |
| `WorkspacePathRequest` | interface | <code>interface WorkspacePathRequest</code> | Field contract for Workspace Path Request; see all contract members below. |
| `WorkspaceQuotaSpec` | interface | <code>interface WorkspaceQuotaSpec</code> | Field contract for Workspace Quota Spec; see all contract members below. |
| `WorkspaceReadRequest` | interface | <code>interface WorkspaceReadRequest</code> | Field contract for Workspace Read Request; see all contract members below. |
| `WorkspaceReadResult` | interface | <code>interface WorkspaceReadResult</code> | Field contract for Workspace Read Result; see all contract members below. |
| `WorkspaceRecord` | interface | <code>interface WorkspaceRecord</code> | Field contract for Workspace Record; see all contract members below. |
| `WorkspaceRestoreRequest` | interface | <code>interface WorkspaceRestoreRequest</code> | Field contract for Workspace Restore Request; see all contract members below. |
| `WorkspaceSnapshotEntry` | interface | <code>interface WorkspaceSnapshotEntry</code> | Field contract for Workspace Snapshot Entry; see all contract members below. |
| `WorkspaceSnapshotManifest` | interface | <code>interface WorkspaceSnapshotManifest</code> | Field contract for Workspace Snapshot Manifest; see all contract members below. |
| `WorkspaceSnapshotPolicySpec` | interface | <code>interface WorkspaceSnapshotPolicySpec</code> | Field contract for Workspace Snapshot Policy Spec; see all contract members below. |
| `WorkspaceSnapshotRequest` | interface | <code>interface WorkspaceSnapshotRequest</code> | Field contract for Workspace Snapshot Request; see all contract members below. |
| `WorkspaceSpec` | interface | <code>interface WorkspaceSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Workspace Spec; see all contract members below. |
| `WorkspaceUsage` | interface | <code>interface WorkspaceUsage</code> | Field contract for Workspace Usage; see all contract members below. |
| `WorkspaceWriteRequest` | interface | <code>interface WorkspaceWriteRequest</code> | Field contract for Workspace Write Request; see all contract members below. |
| `WorkspaceWriteResult` | interface | <code>interface WorkspaceWriteResult</code> | Field contract for Workspace Write Result; see all contract members below. |
| `WorkspaceEntryKind` | type | <code>type WorkspaceEntryKind = 'file' &#124; 'directory' &#124; 'symlink' &#124; 'other'</code> | Public type alias for Workspace Entry Kind. |
| `WorkspaceEventCreateInput` | type | <code>type WorkspaceEventCreateInput = Omit&lt;EventCreateInput&lt;WorkspaceEventPayloadMap[TType]&gt;, 'type' &#124; 'workspaceId'&gt; &amp; { type: TType; workspaceId: string; }</code> | Public type alias for Workspace Event Create Input. |
| `WorkspaceEventPayloadMap` | type | <code>type WorkspaceEventPayloadMap = { 'workspace.create.requested': WorkspaceEventPayloadWithRequired&lt;'operationId' &#124; 'profileRef'&gt;; 'workspace.created': WorkspaceEventPayloadWithRequired&lt;'operationId' &#124; 'profileRef' &#124; 'status'&gt;; 'workspace.ready': WorkspaceStatusEventPayload&lt;'ready'&gt;; 'workspace.busy': WorkspaceStatusEventPayload&lt;'busy'&gt;; 'workspace.path.resolved': WorkspaceEventPayloadWithRequired&lt;'operationId'&gt;; 'w...</code> | Public type alias for Workspace Event Payload Map. |
| `WorkspaceFrameworkEvent` | type | <code>type WorkspaceFrameworkEvent = Omit&lt;FrameworkEvent&lt;WorkspaceEventPayloadMap[TType]&gt;, 'type' &#124; 'workspaceId'&gt; &amp; { type: TType; workspaceId: string; }</code> | Public type alias for Workspace Framework Event. |
| `WorkspaceFrameworkEventType` | type | <code>type WorkspaceFrameworkEventType = 'workspace.create.requested' &#124; 'workspace.created' &#124; 'workspace.ready' &#124; 'workspace.busy' &#124; 'workspace.path.resolved' &#124; 'workspace.path.denied' &#124; 'workspace.quota.exceeded' &#124; 'workspace.snapshot.requested' &#124; 'workspace.snapshot.created' &#124; 'workspace.snapshot.failed' &#124; 'workspace.restore.requested' &#124; 'workspace.restored' &#124; 'workspace.restore.failed' &#124; 'workspace.patch.checked' &#124; '...</code> | Public type alias for Workspace Framework Event Type. |
| `WorkspacePathOperation` | type | <code>type WorkspacePathOperation = 'read' &#124; 'write' &#124; 'execute' &#124; 'delete' &#124; 'list'</code> | Public type alias for Workspace Path Operation. |
| `WorkspacePermission` | type | <code>type WorkspacePermission = 'read' &#124; 'write' &#124; 'execute' &#124; 'delete'</code> | Public type alias for Workspace Permission. |
| `WorkspaceSnapshotType` | type | <code>type WorkspaceSnapshotType = 'full' &#124; 'incremental' &#124; 'manifest_only' &#124; 'failure_snapshot'</code> | Public type alias for Workspace Snapshot Type. |
| `WorkspaceStatus` | type | <code>type WorkspaceStatus = 'creating' &#124; 'ready' &#124; 'busy' &#124; 'snapshotting' &#124; 'archiving' &#124; 'archived' &#124; 'cleaning' &#124; 'cleaned' &#124; 'failed'</code> | Public type alias for Workspace Status. |

## `FileMutation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `afterHash` | property | <code>afterHash: string</code> | Public after Hash property. |
| `afterSizeBytes` | property | <code>afterSizeBytes: number</code> | Public after Size Bytes property. |
| `artifactRef` | property | <code>artifactRef: string</code> | Public artifact Ref property. |
| `beforeHash` | property | <code>beforeHash: string</code> | Public before Hash property. |
| `beforeSizeBytes` | property | <code>beforeSizeBytes: number</code> | Public before Size Bytes property. |
| `detectedAt` | property | <code>detectedAt: string</code> | Public detected At property. |
| `oldPath` | property | <code>oldPath: string</code> | Public old Path property. |
| `operation` | property | <code>operation: "created" &#124; "deleted" &#124; "modified" &#124; "renamed" &#124; "permission_changed"</code> | Public operation property. |
| `path` | property | <code>path: string</code> | Public path property. |

## `ResolvedWorkspacePath` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalRelativePath` | property | <code>canonicalRelativePath: string</code> | Public canonical Relative Path property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `exists` | property | <code>exists: boolean</code> | Public exists property. |
| `kind` | property | <code>kind: WorkspaceEntryKind</code> | Public kind property. |
| `pathRef` | property | <code>pathRef: string</code> | Public path Ref property. |
| `permissions` | property | <code>permissions: WorkspacePermission[]</code> | Public permissions property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `WorkspaceCleanupPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archiveBeforeDelete` | property | <code>archiveBeforeDelete: boolean</code> | Public archive Before Delete property. |
| `mode` | property | <code>mode: "on_run_end" &#124; "on_success" &#124; "after_ttl" &#124; "retain" &#124; "manual"</code> | Public mode property. |
| `retainOnFailure` | property | <code>retainOnFailure: boolean</code> | Public retain On Failure property. |
| `retainSnapshots` | property | <code>retainSnapshots: boolean</code> | Public retain Snapshots property. |
| `secureDelete` | property | <code>secureDelete: boolean</code> | Public secure Delete property. |
| `ttlSeconds` | property | <code>ttlSeconds: number</code> | Public ttl Seconds property. |

## `WorkspaceDeleteRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedContentHash` | property | <code>expectedContentHash: string</code> | Public expected Content Hash property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `recursive` | property | <code>recursive: boolean</code> | Public recursive property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `WorkspaceDiffRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createPatchArtifact` | property | <code>createPatchArtifact: boolean</code> | Public create Patch Artifact property. |
| `fromSnapshotRef` | property | <code>fromSnapshotRef: string</code> | Public from Snapshot Ref property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `toSnapshotRef` | property | <code>toSnapshotRef: string</code> | Public to Snapshot Ref property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `WorkspaceDiffResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fromSnapshotRef` | property | <code>fromSnapshotRef: string</code> | Public from Snapshot Ref property. |
| `mutations` | property | <code>mutations: FileMutation[]</code> | Public mutations property. |
| `patchArtifactRef` | property | <code>patchArtifactRef: string</code> | Public patch Artifact Ref property. |
| `summary` | property | <code>summary: WorkspaceDiffSummary</code> | Public summary property. |
| `toSnapshotRef` | property | <code>toSnapshotRef: string</code> | Public to Snapshot Ref property. |

## `WorkspaceDiffSummary` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `bytesAdded` | property | <code>bytesAdded: number</code> | Public bytes Added property. |
| `bytesRemoved` | property | <code>bytesRemoved: number</code> | Public bytes Removed property. |
| `created` | property | <code>created: number</code> | Public created property. |
| `deleted` | property | <code>deleted: number</code> | Public deleted property. |
| `modified` | property | <code>modified: number</code> | Public modified property. |
| `permissionChanged` | property | <code>permissionChanged: number</code> | Public permission Changed property. |
| `renamed` | property | <code>renamed: number</code> | Public renamed property. |

## `WorkspaceDirectorySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: string</code> | Public artifacts property. |
| `cache` | property | <code>cache: string</code> | Public cache property. |
| `inputs` | property | <code>inputs: string</code> | Public inputs property. |
| `logs` | property | <code>logs: string</code> | Public logs property. |
| `outputs` | property | <code>outputs: string</code> | Public outputs property. |
| `snapshots` | property | <code>snapshots: string</code> | Public snapshots property. |
| `source` | property | <code>source: string</code> | Public source property. |
| `temp` | property | <code>temp: string</code> | Public temp property. |
| `working` | property | <code>working: string</code> | Public working property. |

## `WorkspaceEventPayload` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `bytes` | property | <code>bytes: number</code> | Public bytes property. |
| `error` | property | <code>error: NormalizedExecutionError</code> | Public error property. |
| `files` | property | <code>files: number</code> | Public files property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public profile Ref property. |
| `snapshotManifestHash` | property | <code>snapshotManifestHash: string</code> | Public snapshot Manifest Hash property. |
| `sourceTreeHash` | property | <code>sourceTreeHash: string</code> | Public source Tree Hash property. |
| `status` | property | <code>status: WorkspaceStatus</code> | Public status property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |
| `workspaceSnapshotHash` | property | <code>workspaceSnapshotHash: string</code> | Public workspace Snapshot Hash property. |

## `WorkspaceFileEntry` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `kind` | property | <code>kind: WorkspaceEntryKind</code> | Public kind property. |
| `modifiedAt` | property | <code>modifiedAt: string</code> | Public modified At property. |
| `permissions` | property | <code>permissions: WorkspacePermission[]</code> | Public permissions property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |

## `WorkspaceListRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cursor` | property | <code>cursor: string</code> | Public cursor property. |
| `includeHidden` | property | <code>includeHidden: boolean</code> | Public include Hidden property. |
| `maxEntries` | property | <code>maxEntries: number</code> | Public max Entries property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `recursive` | property | <code>recursive: boolean</code> | Public recursive property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `WorkspaceMutationPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowDelete` | property | <code>allowDelete: boolean</code> | Public allow Delete property. |
| `atomicWrite` | property | <code>atomicWrite: boolean</code> | Public atomic Write property. |
| `maxPatchBytes` | property | <code>maxPatchBytes: number</code> | Public max Patch Bytes property. |
| `preserveInputFiles` | property | <code>preserveInputFiles: boolean</code> | Public preserve Input Files property. |
| `requireApprovalForDelete` | property | <code>requireApprovalForDelete: boolean</code> | Public require Approval For Delete property. |
| `requireSnapshotBeforeWrite` | property | <code>requireSnapshotBeforeWrite: boolean</code> | Public require Snapshot Before Write property. |
| `trackFileMutations` | property | <code>trackFileMutations: boolean</code> | Public track File Mutations property. |

## `WorkspacePatchConflict` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actualHash` | property | <code>actualHash: string</code> | Public actual Hash property. |
| `expectedHash` | property | <code>expectedHash: string</code> | Public expected Hash property. |
| `path` | property | <code>path: string</code> | Public path property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |

## `WorkspacePatchRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `conflictPolicy` | property | <code>conflictPolicy: "fail" &#124; "three_way" &#124; "mark_conflicts"</code> | Public conflict Policy property. |
| `expectedBaseSnapshotHash` | property | <code>expectedBaseSnapshotHash: string</code> | Public expected Base Snapshot Hash property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `mode` | property | <code>mode: "check" &#124; "apply"</code> | Public mode property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `patchArtifactRef` | property | <code>patchArtifactRef: string</code> | Public patch Artifact Ref property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `WorkspacePatchResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `applied` | property | <code>applied: boolean</code> | Public applied property. |
| `checked` | property | <code>checked: boolean</code> | Public checked property. |
| `conflicts` | property | <code>conflicts: WorkspacePatchConflict[]</code> | Public conflicts property. |
| `mutations` | property | <code>mutations: FileMutation[]</code> | Public mutations property. |
| `resultingWorkspaceSnapshotHash` | property | <code>resultingWorkspaceSnapshotHash: string</code> | Public resulting Workspace Snapshot Hash property. |

## `WorkspacePathPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedExtensions` | property | <code>allowedExtensions: string[]</code> | Public allowed Extensions property. |
| `allowHardLinks` | property | <code>allowHardLinks: boolean</code> | Public allow Hard Links property. |
| `allowHiddenFiles` | property | <code>allowHiddenFiles: boolean</code> | Public allow Hidden Files property. |
| `allowSymlinks` | property | <code>allowSymlinks: boolean</code> | Public allow Symlinks property. |
| `caseSensitivity` | property | <code>caseSensitivity: "platform" &#124; "sensitive" &#124; "insensitive"</code> | Public case Sensitivity property. |
| `deniedExtensions` | property | <code>deniedExtensions: string[]</code> | Public denied Extensions property. |
| `deniedPaths` | property | <code>deniedPaths: string[]</code> | Final deny boundary; it cannot be widened by any allow list. |
| `executablePaths` | property | <code>executablePaths: string[]</code> | Execute permission only. Exact or descendant deny rules always take precedence. |
| `followSymlinksForRead` | property | <code>followSymlinksForRead: boolean</code> | Public follow Symlinks For Read property. |
| `maxPathLength` | property | <code>maxPathLength: number</code> | Public max Path Length property. |
| `readOnlyPaths` | property | <code>readOnlyPaths: string[]</code> | Read permission only. Exact or descendant deny rules always take precedence. |
| `writablePaths` | property | <code>writablePaths: string[]</code> | Write permission only. Exact or descendant deny rules always take precedence. |

## `WorkspacePathRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowMissing` | property | <code>allowMissing: boolean</code> | Public allow Missing property. |
| `operation` | property | <code>operation: WorkspacePathOperation</code> | Public operation property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `WorkspaceQuotaSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxBytes` | property | <code>maxBytes: number</code> | Public max Bytes property. |
| `maxDirectoryDepth` | property | <code>maxDirectoryDepth: number</code> | Public max Directory Depth property. |
| `maxFiles` | property | <code>maxFiles: number</code> | Public max Files property. |
| `maxMutationCountPerExecution` | property | <code>maxMutationCountPerExecution: number</code> | Public max Mutation Count Per Execution property. |
| `maxOpenFiles` | property | <code>maxOpenFiles: number</code> | Public max Open Files property. |
| `maxSingleFileBytes` | property | <code>maxSingleFileBytes: number</code> | Public max Single File Bytes property. |

## `WorkspaceReadRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `encoding` | property | <code>encoding: "utf8" &#124; "base64"</code> | Public encoding property. |
| `length` | property | <code>length: number</code> | Public length property. |
| `maxBytes` | property | <code>maxBytes: number</code> | Public max Bytes property. |
| `offset` | property | <code>offset: number</code> | Public offset property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `WorkspaceReadResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public content property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `encoding` | property | <code>encoding: "utf8" &#124; "base64"</code> | Public encoding property. |
| `nextOffset` | property | <code>nextOffset: number</code> | Public next Offset property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `truncated` | property | <code>truncated: boolean</code> | Public truncated property. |

## `WorkspaceRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeExecutionIds` | property | <code>activeExecutionIds: string[]</code> | Public active Execution Ids property. |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `cleanedAt` | property | <code>cleanedAt: string</code> | Public cleaned At property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `error` | property | <code>error: NormalizedExecutionError</code> | Public error property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `latestSnapshotRef` | property | <code>latestSnapshotRef: string</code> | Public latest Snapshot Ref property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public profile Ref property. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public profile Revision property. |
| `quota` | property | <code>quota: WorkspaceQuotaSpec</code> | Public quota property. |
| `readyAt` | property | <code>readyAt: string</code> | Public ready At property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `rootPathRef` | property | <code>rootPathRef: string</code> | Public root Path Ref property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `status` | property | <code>status: WorkspaceStatus</code> | Public status property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `usage` | property | <code>usage: WorkspaceUsage</code> | Public usage property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `WorkspaceRestoreRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedWorkspaceSnapshotHash` | property | <code>expectedWorkspaceSnapshotHash: string</code> | Public expected Workspace Snapshot Hash property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `snapshotRef` | property | <code>snapshotRef: string</code> | Public snapshot Ref property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `WorkspaceSnapshotEntry` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public artifact Ref property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `kind` | property | <code>kind: "file" &#124; "directory" &#124; "symlink"</code> | Public kind property. |
| `mode` | property | <code>mode: number</code> | Public mode property. |
| `path` | property | <code>path: string</code> | Public path property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `symlinkTarget` | property | <code>symlinkTarget: string</code> | Required only for symlink entries; always Workspace-relative. |

## `WorkspaceSnapshotManifest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseSnapshotId` | property | <code>baseSnapshotId: string</code> | Public base Snapshot Id property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `createdBy` | property | <code>createdBy: string</code> | Public created By property. |
| `entries` | property | <code>entries: WorkspaceSnapshotEntry[]</code> | Public entries property. |
| `fileCount` | property | <code>fileCount: number</code> | Public file Count property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `ignoredPatterns` | property | <code>ignoredPatterns: string[]</code> | Public ignored Patterns property. |
| `manifestHash` | property | <code>manifestHash: string</code> | Public manifest Hash property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `sourceTreeHash` | property | <code>sourceTreeHash: string</code> | Public source Tree Hash property. |
| `totalBytes` | property | <code>totalBytes: number</code> | Public total Bytes property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `WorkspaceSnapshotPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enabled` | property | <code>enabled: boolean</code> | Public enabled property. |
| `maxSnapshots` | property | <code>maxSnapshots: number</code> | Public max Snapshots property. |
| `mode` | property | <code>mode: "full" &#124; "incremental" &#124; "manifest_only"</code> | Public mode property. |
| `snapshotAfterExecution` | property | <code>snapshotAfterExecution: boolean</code> | Public snapshot After Execution property. |
| `snapshotBeforeWrite` | property | <code>snapshotBeforeWrite: boolean</code> | Public snapshot Before Write property. |
| `snapshotOnFailure` | property | <code>snapshotOnFailure: boolean</code> | Public snapshot On Failure property. |

## `WorkspaceSnapshotRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseSnapshotRef` | property | <code>baseSnapshotRef: string</code> | Public base Snapshot Ref property. |
| `excludePatterns` | property | <code>excludePatterns: string[]</code> | Public exclude Patterns property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `includePaths` | property | <code>includePaths: string[]</code> | Public include Paths property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `type` | property | <code>type: WorkspaceSnapshotType</code> | Public type property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `WorkspaceSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactProfileRef` | property | <code>artifactProfileRef: SpecRef</code> | Public artifact Profile Ref property. |
| `cleanup` | property | <code>cleanup: WorkspaceCleanupPolicySpec</code> | Public cleanup property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `directories` | property | <code>directories: WorkspaceDirectorySpec</code> | Public directories property. |
| `executionEnvironmentRef` | property | <code>executionEnvironmentRef: SpecRef</code> | Public execution Environment Ref property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `mutation` | property | <code>mutation: WorkspaceMutationPolicySpec</code> | Public mutation property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `pathPolicy` | property | <code>pathPolicy: WorkspacePathPolicySpec</code> | Public path Policy property. |
| `quota` | property | <code>quota: WorkspaceQuotaSpec</code> | Public quota property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `rootPolicy` | property | <code>rootPolicy: "managed" &#124; "provided_ref"</code> | Public root Policy property. |
| `rootRef` | property | <code>rootRef: string</code> | Public root Ref property. |
| `secretPolicyRef` | property | <code>secretPolicyRef: SpecRef</code> | Public secret Policy Ref property. |
| `snapshot` | property | <code>snapshot: WorkspaceSnapshotPolicySpec</code> | Public snapshot property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `WorkspaceUsage` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `bytes` | property | <code>bytes: number</code> | Public bytes property. |
| `directories` | property | <code>directories: number</code> | Public directories property. |
| `files` | property | <code>files: number</code> | Public files property. |
| `lastCalculatedAt` | property | <code>lastCalculatedAt: string</code> | Public last Calculated At property. |

## `WorkspaceWriteRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public artifact Ref property. |
| `content` | property | <code>content: string &#124; Uint8Array&lt;ArrayBufferLike&gt;</code> | Public content property. |
| `createParents` | property | <code>createParents: boolean</code> | Public create Parents property. |
| `expectedContentHash` | property | <code>expectedContentHash: string</code> | Public expected Content Hash property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `mode` | property | <code>mode: "create" &#124; "overwrite" &#124; "append" &#124; "atomic_replace"</code> | Public mode property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `WorkspaceWriteResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `afterHash` | property | <code>afterHash: string</code> | Public after Hash property. |
| `artifactRef` | property | <code>artifactRef: string</code> | Public artifact Ref property. |
| `beforeHash` | property | <code>beforeHash: string</code> | Public before Hash property. |
| `mutation` | property | <code>mutation: FileMutation</code> | Public mutation property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
