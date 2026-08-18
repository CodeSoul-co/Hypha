# `@codesoul-co/hypha-core` / `contracts/workspace`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/workspace.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)
- 导出数: **39**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `FileMutation` | 接口 | <code>interface FileMutation</code> | File Mutation 的字段契约；完整字段见下表。 |
| `ResolvedWorkspacePath` | 接口 | <code>interface ResolvedWorkspacePath</code> | Resolved Workspace Path 的字段契约；完整字段见下表。 |
| `WorkspaceCleanupPolicySpec` | 接口 | <code>interface WorkspaceCleanupPolicySpec</code> | Workspace Cleanup Policy Spec 的字段契约；完整字段见下表。 |
| `WorkspaceDeleteRequest` | 接口 | <code>interface WorkspaceDeleteRequest</code> | Workspace Delete Request 的字段契约；完整字段见下表。 |
| `WorkspaceDiffRequest` | 接口 | <code>interface WorkspaceDiffRequest</code> | Workspace Diff Request 的字段契约；完整字段见下表。 |
| `WorkspaceDiffResult` | 接口 | <code>interface WorkspaceDiffResult</code> | Workspace Diff Result 的字段契约；完整字段见下表。 |
| `WorkspaceDiffSummary` | 接口 | <code>interface WorkspaceDiffSummary</code> | Workspace Diff Summary 的字段契约；完整字段见下表。 |
| `WorkspaceDirectorySpec` | 接口 | <code>interface WorkspaceDirectorySpec</code> | Workspace Directory Spec 的字段契约；完整字段见下表。 |
| `WorkspaceEventPayload` | 接口 | <code>interface WorkspaceEventPayload</code> | Workspace Event Payload 的字段契约；完整字段见下表。 |
| `WorkspaceFileEntry` | 接口 | <code>interface WorkspaceFileEntry</code> | Workspace File Entry 的字段契约；完整字段见下表。 |
| `WorkspaceListRequest` | 接口 | <code>interface WorkspaceListRequest</code> | Workspace List Request 的字段契约；完整字段见下表。 |
| `WorkspaceMutationPolicySpec` | 接口 | <code>interface WorkspaceMutationPolicySpec</code> | Workspace Mutation Policy Spec 的字段契约；完整字段见下表。 |
| `WorkspacePatchConflict` | 接口 | <code>interface WorkspacePatchConflict</code> | Workspace Patch Conflict 的字段契约；完整字段见下表。 |
| `WorkspacePatchRequest` | 接口 | <code>interface WorkspacePatchRequest</code> | Workspace Patch Request 的字段契约；完整字段见下表。 |
| `WorkspacePatchResult` | 接口 | <code>interface WorkspacePatchResult</code> | Workspace Patch Result 的字段契约；完整字段见下表。 |
| `WorkspacePathPolicySpec` | 接口 | <code>interface WorkspacePathPolicySpec</code> | Workspace Path Policy Spec 的字段契约；完整字段见下表。 |
| `WorkspacePathRequest` | 接口 | <code>interface WorkspacePathRequest</code> | Workspace Path Request 的字段契约；完整字段见下表。 |
| `WorkspaceQuotaSpec` | 接口 | <code>interface WorkspaceQuotaSpec</code> | Workspace Quota Spec 的字段契约；完整字段见下表。 |
| `WorkspaceReadRequest` | 接口 | <code>interface WorkspaceReadRequest</code> | Workspace Read Request 的字段契约；完整字段见下表。 |
| `WorkspaceReadResult` | 接口 | <code>interface WorkspaceReadResult</code> | Workspace Read Result 的字段契约；完整字段见下表。 |
| `WorkspaceRecord` | 接口 | <code>interface WorkspaceRecord</code> | Workspace Record 的字段契约；完整字段见下表。 |
| `WorkspaceRestoreRequest` | 接口 | <code>interface WorkspaceRestoreRequest</code> | Workspace Restore Request 的字段契约；完整字段见下表。 |
| `WorkspaceSnapshotEntry` | 接口 | <code>interface WorkspaceSnapshotEntry</code> | Workspace Snapshot Entry 的字段契约；完整字段见下表。 |
| `WorkspaceSnapshotManifest` | 接口 | <code>interface WorkspaceSnapshotManifest</code> | Workspace Snapshot Manifest 的字段契约；完整字段见下表。 |
| `WorkspaceSnapshotPolicySpec` | 接口 | <code>interface WorkspaceSnapshotPolicySpec</code> | Workspace Snapshot Policy Spec 的字段契约；完整字段见下表。 |
| `WorkspaceSnapshotRequest` | 接口 | <code>interface WorkspaceSnapshotRequest</code> | Workspace Snapshot Request 的字段契约；完整字段见下表。 |
| `WorkspaceSpec` | 接口 | <code>interface WorkspaceSpec extends VersionedSpec, SpecMetadata</code> | Workspace Spec 的字段契约；完整字段见下表。 |
| `WorkspaceUsage` | 接口 | <code>interface WorkspaceUsage</code> | Workspace Usage 的字段契约；完整字段见下表。 |
| `WorkspaceWriteRequest` | 接口 | <code>interface WorkspaceWriteRequest</code> | Workspace Write Request 的字段契约；完整字段见下表。 |
| `WorkspaceWriteResult` | 接口 | <code>interface WorkspaceWriteResult</code> | Workspace Write Result 的字段契约；完整字段见下表。 |
| `WorkspaceEntryKind` | 类型 | <code>type WorkspaceEntryKind = 'file' &#124; 'directory' &#124; 'symlink' &#124; 'other'</code> | Workspace Entry Kind 的公共类型别名。 |
| `WorkspaceEventCreateInput` | 类型 | <code>type WorkspaceEventCreateInput = Omit&lt;EventCreateInput&lt;WorkspaceEventPayloadMap[TType]&gt;, 'type' &#124; 'workspaceId'&gt; &amp; { type: TType; workspaceId: string; }</code> | Workspace Event Create Input 的公共类型别名。 |
| `WorkspaceEventPayloadMap` | 类型 | <code>type WorkspaceEventPayloadMap = { 'workspace.create.requested': WorkspaceEventPayloadWithRequired&lt;'operationId' &#124; 'profileRef'&gt;; 'workspace.created': WorkspaceEventPayloadWithRequired&lt;'operationId' &#124; 'profileRef' &#124; 'status'&gt;; 'workspace.ready': WorkspaceStatusEventPayload&lt;'ready'&gt;; 'workspace.busy': WorkspaceStatusEventPayload&lt;'busy'&gt;; 'workspace.path.resolved': WorkspaceEventPayloadWithRequired&lt;'operationId'&gt;; 'w...</code> | Workspace Event Payload Map 的公共类型别名。 |
| `WorkspaceFrameworkEvent` | 类型 | <code>type WorkspaceFrameworkEvent = Omit&lt;FrameworkEvent&lt;WorkspaceEventPayloadMap[TType]&gt;, 'type' &#124; 'workspaceId'&gt; &amp; { type: TType; workspaceId: string; }</code> | Workspace Framework Event 的公共类型别名。 |
| `WorkspaceFrameworkEventType` | 类型 | <code>type WorkspaceFrameworkEventType = 'workspace.create.requested' &#124; 'workspace.created' &#124; 'workspace.ready' &#124; 'workspace.busy' &#124; 'workspace.path.resolved' &#124; 'workspace.path.denied' &#124; 'workspace.quota.exceeded' &#124; 'workspace.snapshot.requested' &#124; 'workspace.snapshot.created' &#124; 'workspace.snapshot.failed' &#124; 'workspace.restore.requested' &#124; 'workspace.restored' &#124; 'workspace.restore.failed' &#124; 'workspace.patch.checked' &#124; '...</code> | Workspace Framework Event Type 的公共类型别名。 |
| `WorkspacePathOperation` | 类型 | <code>type WorkspacePathOperation = 'read' &#124; 'write' &#124; 'execute' &#124; 'delete' &#124; 'list'</code> | Workspace Path Operation 的公共类型别名。 |
| `WorkspacePermission` | 类型 | <code>type WorkspacePermission = 'read' &#124; 'write' &#124; 'execute' &#124; 'delete'</code> | Workspace Permission 的公共类型别名。 |
| `WorkspaceSnapshotType` | 类型 | <code>type WorkspaceSnapshotType = 'full' &#124; 'incremental' &#124; 'manifest_only' &#124; 'failure_snapshot'</code> | Workspace Snapshot Type 的公共类型别名。 |
| `WorkspaceStatus` | 类型 | <code>type WorkspaceStatus = 'creating' &#124; 'ready' &#124; 'busy' &#124; 'snapshotting' &#124; 'archiving' &#124; 'archived' &#124; 'cleaning' &#124; 'cleaned' &#124; 'failed'</code> | Workspace Status 的公共类型别名。 |

## `FileMutation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `afterHash` | 属性 | <code>afterHash: string</code> | after Hash 字段。 |
| `afterSizeBytes` | 属性 | <code>afterSizeBytes: number</code> | after Size Bytes 字段。 |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | artifact Ref 字段。 |
| `beforeHash` | 属性 | <code>beforeHash: string</code> | before Hash 字段。 |
| `beforeSizeBytes` | 属性 | <code>beforeSizeBytes: number</code> | before Size Bytes 字段。 |
| `detectedAt` | 属性 | <code>detectedAt: string</code> | detected At 字段。 |
| `oldPath` | 属性 | <code>oldPath: string</code> | old Path 字段。 |
| `operation` | 属性 | <code>operation: "created" &#124; "deleted" &#124; "modified" &#124; "renamed" &#124; "permission_changed"</code> | operation 字段。 |
| `path` | 属性 | <code>path: string</code> | path 字段。 |

## `ResolvedWorkspacePath` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalRelativePath` | 属性 | <code>canonicalRelativePath: string</code> | canonical Relative Path 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `exists` | 属性 | <code>exists: boolean</code> | exists 字段。 |
| `kind` | 属性 | <code>kind: WorkspaceEntryKind</code> | kind 字段。 |
| `pathRef` | 属性 | <code>pathRef: string</code> | path Ref 字段。 |
| `permissions` | 属性 | <code>permissions: WorkspacePermission[]</code> | permissions 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `WorkspaceCleanupPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archiveBeforeDelete` | 属性 | <code>archiveBeforeDelete: boolean</code> | archive Before Delete 字段。 |
| `mode` | 属性 | <code>mode: "on_run_end" &#124; "on_success" &#124; "after_ttl" &#124; "retain" &#124; "manual"</code> | mode 字段。 |
| `retainOnFailure` | 属性 | <code>retainOnFailure: boolean</code> | retain On Failure 字段。 |
| `retainSnapshots` | 属性 | <code>retainSnapshots: boolean</code> | retain Snapshots 字段。 |
| `secureDelete` | 属性 | <code>secureDelete: boolean</code> | secure Delete 字段。 |
| `ttlSeconds` | 属性 | <code>ttlSeconds: number</code> | ttl Seconds 字段。 |

## `WorkspaceDeleteRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedContentHash` | 属性 | <code>expectedContentHash: string</code> | expected Content Hash 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `recursive` | 属性 | <code>recursive: boolean</code> | recursive 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `WorkspaceDiffRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createPatchArtifact` | 属性 | <code>createPatchArtifact: boolean</code> | create Patch Artifact 字段。 |
| `fromSnapshotRef` | 属性 | <code>fromSnapshotRef: string</code> | from Snapshot Ref 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `toSnapshotRef` | 属性 | <code>toSnapshotRef: string</code> | to Snapshot Ref 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `WorkspaceDiffResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fromSnapshotRef` | 属性 | <code>fromSnapshotRef: string</code> | from Snapshot Ref 字段。 |
| `mutations` | 属性 | <code>mutations: FileMutation[]</code> | mutations 字段。 |
| `patchArtifactRef` | 属性 | <code>patchArtifactRef: string</code> | patch Artifact Ref 字段。 |
| `summary` | 属性 | <code>summary: WorkspaceDiffSummary</code> | summary 字段。 |
| `toSnapshotRef` | 属性 | <code>toSnapshotRef: string</code> | to Snapshot Ref 字段。 |

## `WorkspaceDiffSummary` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `bytesAdded` | 属性 | <code>bytesAdded: number</code> | bytes Added 字段。 |
| `bytesRemoved` | 属性 | <code>bytesRemoved: number</code> | bytes Removed 字段。 |
| `created` | 属性 | <code>created: number</code> | created 字段。 |
| `deleted` | 属性 | <code>deleted: number</code> | deleted 字段。 |
| `modified` | 属性 | <code>modified: number</code> | modified 字段。 |
| `permissionChanged` | 属性 | <code>permissionChanged: number</code> | permission Changed 字段。 |
| `renamed` | 属性 | <code>renamed: number</code> | renamed 字段。 |

## `WorkspaceDirectorySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: string</code> | artifacts 字段。 |
| `cache` | 属性 | <code>cache: string</code> | cache 字段。 |
| `inputs` | 属性 | <code>inputs: string</code> | inputs 字段。 |
| `logs` | 属性 | <code>logs: string</code> | logs 字段。 |
| `outputs` | 属性 | <code>outputs: string</code> | outputs 字段。 |
| `snapshots` | 属性 | <code>snapshots: string</code> | snapshots 字段。 |
| `source` | 属性 | <code>source: string</code> | source 字段。 |
| `temp` | 属性 | <code>temp: string</code> | temp 字段。 |
| `working` | 属性 | <code>working: string</code> | working 字段。 |

## `WorkspaceEventPayload` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `bytes` | 属性 | <code>bytes: number</code> | bytes 字段。 |
| `error` | 属性 | <code>error: NormalizedExecutionError</code> | error 字段。 |
| `files` | 属性 | <code>files: number</code> | files 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | profile Ref 字段。 |
| `snapshotManifestHash` | 属性 | <code>snapshotManifestHash: string</code> | snapshot Manifest Hash 字段。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash: string</code> | source Tree Hash 字段。 |
| `status` | 属性 | <code>status: WorkspaceStatus</code> | status 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |
| `workspaceSnapshotHash` | 属性 | <code>workspaceSnapshotHash: string</code> | workspace Snapshot Hash 字段。 |

## `WorkspaceFileEntry` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `kind` | 属性 | <code>kind: WorkspaceEntryKind</code> | kind 字段。 |
| `modifiedAt` | 属性 | <code>modifiedAt: string</code> | modified At 字段。 |
| `permissions` | 属性 | <code>permissions: WorkspacePermission[]</code> | permissions 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |

## `WorkspaceListRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cursor` | 属性 | <code>cursor: string</code> | cursor 字段。 |
| `includeHidden` | 属性 | <code>includeHidden: boolean</code> | include Hidden 字段。 |
| `maxEntries` | 属性 | <code>maxEntries: number</code> | max Entries 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `recursive` | 属性 | <code>recursive: boolean</code> | recursive 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `WorkspaceMutationPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowDelete` | 属性 | <code>allowDelete: boolean</code> | allow Delete 字段。 |
| `atomicWrite` | 属性 | <code>atomicWrite: boolean</code> | atomic Write 字段。 |
| `maxPatchBytes` | 属性 | <code>maxPatchBytes: number</code> | max Patch Bytes 字段。 |
| `preserveInputFiles` | 属性 | <code>preserveInputFiles: boolean</code> | preserve Input Files 字段。 |
| `requireApprovalForDelete` | 属性 | <code>requireApprovalForDelete: boolean</code> | require Approval For Delete 字段。 |
| `requireSnapshotBeforeWrite` | 属性 | <code>requireSnapshotBeforeWrite: boolean</code> | require Snapshot Before Write 字段。 |
| `trackFileMutations` | 属性 | <code>trackFileMutations: boolean</code> | track File Mutations 字段。 |

## `WorkspacePatchConflict` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actualHash` | 属性 | <code>actualHash: string</code> | actual Hash 字段。 |
| `expectedHash` | 属性 | <code>expectedHash: string</code> | expected Hash 字段。 |
| `path` | 属性 | <code>path: string</code> | path 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |

## `WorkspacePatchRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `conflictPolicy` | 属性 | <code>conflictPolicy: "fail" &#124; "three_way" &#124; "mark_conflicts"</code> | conflict Policy 字段。 |
| `expectedBaseSnapshotHash` | 属性 | <code>expectedBaseSnapshotHash: string</code> | expected Base Snapshot Hash 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `mode` | 属性 | <code>mode: "check" &#124; "apply"</code> | mode 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `patchArtifactRef` | 属性 | <code>patchArtifactRef: string</code> | patch Artifact Ref 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `WorkspacePatchResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `applied` | 属性 | <code>applied: boolean</code> | applied 字段。 |
| `checked` | 属性 | <code>checked: boolean</code> | checked 字段。 |
| `conflicts` | 属性 | <code>conflicts: WorkspacePatchConflict[]</code> | conflicts 字段。 |
| `mutations` | 属性 | <code>mutations: FileMutation[]</code> | mutations 字段。 |
| `resultingWorkspaceSnapshotHash` | 属性 | <code>resultingWorkspaceSnapshotHash: string</code> | resulting Workspace Snapshot Hash 字段。 |

## `WorkspacePathPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedExtensions` | 属性 | <code>allowedExtensions: string[]</code> | allowed Extensions 字段。 |
| `allowHardLinks` | 属性 | <code>allowHardLinks: boolean</code> | allow Hard Links 字段。 |
| `allowHiddenFiles` | 属性 | <code>allowHiddenFiles: boolean</code> | allow Hidden Files 字段。 |
| `allowSymlinks` | 属性 | <code>allowSymlinks: boolean</code> | allow Symlinks 字段。 |
| `caseSensitivity` | 属性 | <code>caseSensitivity: "platform" &#124; "sensitive" &#124; "insensitive"</code> | case Sensitivity 字段。 |
| `deniedExtensions` | 属性 | <code>deniedExtensions: string[]</code> | denied Extensions 字段。 |
| `deniedPaths` | 属性 | <code>deniedPaths: string[]</code> | Final deny boundary; it cannot be widened by any allow list. |
| `executablePaths` | 属性 | <code>executablePaths: string[]</code> | Execute permission only. Exact or descendant deny rules always take precedence. |
| `followSymlinksForRead` | 属性 | <code>followSymlinksForRead: boolean</code> | follow Symlinks For Read 字段。 |
| `maxPathLength` | 属性 | <code>maxPathLength: number</code> | max Path Length 字段。 |
| `readOnlyPaths` | 属性 | <code>readOnlyPaths: string[]</code> | Read permission only. Exact or descendant deny rules always take precedence. |
| `writablePaths` | 属性 | <code>writablePaths: string[]</code> | Write permission only. Exact or descendant deny rules always take precedence. |

## `WorkspacePathRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowMissing` | 属性 | <code>allowMissing: boolean</code> | allow Missing 字段。 |
| `operation` | 属性 | <code>operation: WorkspacePathOperation</code> | operation 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `WorkspaceQuotaSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxBytes` | 属性 | <code>maxBytes: number</code> | max Bytes 字段。 |
| `maxDirectoryDepth` | 属性 | <code>maxDirectoryDepth: number</code> | max Directory Depth 字段。 |
| `maxFiles` | 属性 | <code>maxFiles: number</code> | max Files 字段。 |
| `maxMutationCountPerExecution` | 属性 | <code>maxMutationCountPerExecution: number</code> | max Mutation Count Per Execution 字段。 |
| `maxOpenFiles` | 属性 | <code>maxOpenFiles: number</code> | max Open Files 字段。 |
| `maxSingleFileBytes` | 属性 | <code>maxSingleFileBytes: number</code> | max Single File Bytes 字段。 |

## `WorkspaceReadRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `encoding` | 属性 | <code>encoding: "utf8" &#124; "base64"</code> | encoding 字段。 |
| `length` | 属性 | <code>length: number</code> | length 字段。 |
| `maxBytes` | 属性 | <code>maxBytes: number</code> | max Bytes 字段。 |
| `offset` | 属性 | <code>offset: number</code> | offset 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `WorkspaceReadResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `encoding` | 属性 | <code>encoding: "utf8" &#124; "base64"</code> | encoding 字段。 |
| `nextOffset` | 属性 | <code>nextOffset: number</code> | next Offset 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
| `truncated` | 属性 | <code>truncated: boolean</code> | truncated 字段。 |

## `WorkspaceRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeExecutionIds` | 属性 | <code>activeExecutionIds: string[]</code> | active Execution Ids 字段。 |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `cleanedAt` | 属性 | <code>cleanedAt: string</code> | cleaned At 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `error` | 属性 | <code>error: NormalizedExecutionError</code> | error 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `latestSnapshotRef` | 属性 | <code>latestSnapshotRef: string</code> | latest Snapshot Ref 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | profile Ref 字段。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | profile Revision 字段。 |
| `quota` | 属性 | <code>quota: WorkspaceQuotaSpec</code> | quota 字段。 |
| `readyAt` | 属性 | <code>readyAt: string</code> | ready At 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `rootPathRef` | 属性 | <code>rootPathRef: string</code> | root Path Ref 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `status` | 属性 | <code>status: WorkspaceStatus</code> | status 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `usage` | 属性 | <code>usage: WorkspaceUsage</code> | usage 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `WorkspaceRestoreRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedWorkspaceSnapshotHash` | 属性 | <code>expectedWorkspaceSnapshotHash: string</code> | expected Workspace Snapshot Hash 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `snapshotRef` | 属性 | <code>snapshotRef: string</code> | snapshot Ref 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `WorkspaceSnapshotEntry` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | artifact Ref 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `kind` | 属性 | <code>kind: "file" &#124; "directory" &#124; "symlink"</code> | kind 字段。 |
| `mode` | 属性 | <code>mode: number</code> | mode 字段。 |
| `path` | 属性 | <code>path: string</code> | path 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
| `symlinkTarget` | 属性 | <code>symlinkTarget: string</code> | Required only for symlink entries; always Workspace-relative. |

## `WorkspaceSnapshotManifest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseSnapshotId` | 属性 | <code>baseSnapshotId: string</code> | base Snapshot Id 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `createdBy` | 属性 | <code>createdBy: string</code> | created By 字段。 |
| `entries` | 属性 | <code>entries: WorkspaceSnapshotEntry[]</code> | entries 字段。 |
| `fileCount` | 属性 | <code>fileCount: number</code> | file Count 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `ignoredPatterns` | 属性 | <code>ignoredPatterns: string[]</code> | ignored Patterns 字段。 |
| `manifestHash` | 属性 | <code>manifestHash: string</code> | manifest Hash 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash: string</code> | source Tree Hash 字段。 |
| `totalBytes` | 属性 | <code>totalBytes: number</code> | total Bytes 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `WorkspaceSnapshotPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enabled` | 属性 | <code>enabled: boolean</code> | enabled 字段。 |
| `maxSnapshots` | 属性 | <code>maxSnapshots: number</code> | max Snapshots 字段。 |
| `mode` | 属性 | <code>mode: "full" &#124; "incremental" &#124; "manifest_only"</code> | mode 字段。 |
| `snapshotAfterExecution` | 属性 | <code>snapshotAfterExecution: boolean</code> | snapshot After Execution 字段。 |
| `snapshotBeforeWrite` | 属性 | <code>snapshotBeforeWrite: boolean</code> | snapshot Before Write 字段。 |
| `snapshotOnFailure` | 属性 | <code>snapshotOnFailure: boolean</code> | snapshot On Failure 字段。 |

## `WorkspaceSnapshotRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseSnapshotRef` | 属性 | <code>baseSnapshotRef: string</code> | base Snapshot Ref 字段。 |
| `excludePatterns` | 属性 | <code>excludePatterns: string[]</code> | exclude Patterns 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `includePaths` | 属性 | <code>includePaths: string[]</code> | include Paths 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `type` | 属性 | <code>type: WorkspaceSnapshotType</code> | type 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `WorkspaceSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactProfileRef` | 属性 | <code>artifactProfileRef: SpecRef</code> | artifact Profile Ref 字段。 |
| `cleanup` | 属性 | <code>cleanup: WorkspaceCleanupPolicySpec</code> | cleanup 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `directories` | 属性 | <code>directories: WorkspaceDirectorySpec</code> | directories 字段。 |
| `executionEnvironmentRef` | 属性 | <code>executionEnvironmentRef: SpecRef</code> | execution Environment Ref 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `mutation` | 属性 | <code>mutation: WorkspaceMutationPolicySpec</code> | mutation 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `pathPolicy` | 属性 | <code>pathPolicy: WorkspacePathPolicySpec</code> | path Policy 字段。 |
| `quota` | 属性 | <code>quota: WorkspaceQuotaSpec</code> | quota 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `rootPolicy` | 属性 | <code>rootPolicy: "managed" &#124; "provided_ref"</code> | root Policy 字段。 |
| `rootRef` | 属性 | <code>rootRef: string</code> | root Ref 字段。 |
| `secretPolicyRef` | 属性 | <code>secretPolicyRef: SpecRef</code> | secret Policy Ref 字段。 |
| `snapshot` | 属性 | <code>snapshot: WorkspaceSnapshotPolicySpec</code> | snapshot 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `WorkspaceUsage` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `bytes` | 属性 | <code>bytes: number</code> | bytes 字段。 |
| `directories` | 属性 | <code>directories: number</code> | directories 字段。 |
| `files` | 属性 | <code>files: number</code> | files 字段。 |
| `lastCalculatedAt` | 属性 | <code>lastCalculatedAt: string</code> | last Calculated At 字段。 |

## `WorkspaceWriteRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | artifact Ref 字段。 |
| `content` | 属性 | <code>content: string &#124; Uint8Array&lt;ArrayBufferLike&gt;</code> | content 字段。 |
| `createParents` | 属性 | <code>createParents: boolean</code> | create Parents 字段。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash: string</code> | expected Content Hash 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `mode` | 属性 | <code>mode: "create" &#124; "overwrite" &#124; "append" &#124; "atomic_replace"</code> | mode 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `WorkspaceWriteResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `afterHash` | 属性 | <code>afterHash: string</code> | after Hash 字段。 |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | artifact Ref 字段。 |
| `beforeHash` | 属性 | <code>beforeHash: string</code> | before Hash 字段。 |
| `mutation` | 属性 | <code>mutation: FileMutation</code> | mutation 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
