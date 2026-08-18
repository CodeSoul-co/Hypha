# `@codesoul-co/hypha-core` / `contracts/workspace`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/workspace.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)
- 导出数: **39**

## 模块用法

用于声明并运行时校验契约。Workspace 模块公开 30 接口、9 类型。

### 从包入口导入

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

// 完整导出列表见下方。
```

### 使用要点

- 39 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `FileMutation` | 接口 | <code>interface FileMutation</code> | File Mutation 接口，共包含 9 个公开字段或方法。 |
| `ResolvedWorkspacePath` | 接口 | <code>interface ResolvedWorkspacePath</code> | Resolved Workspace Path 接口，共包含 8 个公开字段或方法。 |
| `WorkspaceCleanupPolicySpec` | 接口 | <code>interface WorkspaceCleanupPolicySpec</code> | Workspace Cleanup Policy Spec 接口，共包含 6 个公开字段或方法。 |
| `WorkspaceDeleteRequest` | 接口 | <code>interface WorkspaceDeleteRequest</code> | Workspace Delete Request 接口，共包含 7 个公开字段或方法。 |
| `WorkspaceDiffRequest` | 接口 | <code>interface WorkspaceDiffRequest</code> | Workspace Diff Request 接口，共包含 6 个公开字段或方法。 |
| `WorkspaceDiffResult` | 接口 | <code>interface WorkspaceDiffResult</code> | Workspace Diff Result 接口，共包含 5 个公开字段或方法。 |
| `WorkspaceDiffSummary` | 接口 | <code>interface WorkspaceDiffSummary</code> | Workspace Diff Summary 接口，共包含 7 个公开字段或方法。 |
| `WorkspaceDirectorySpec` | 接口 | <code>interface WorkspaceDirectorySpec</code> | Workspace Directory Spec 接口，共包含 9 个公开字段或方法。 |
| `WorkspaceEventPayload` | 接口 | <code>interface WorkspaceEventPayload</code> | Workspace Event Payload 接口，共包含 12 个公开字段或方法。 |
| `WorkspaceFileEntry` | 接口 | <code>interface WorkspaceFileEntry</code> | Workspace File Entry 接口，共包含 6 个公开字段或方法。 |
| `WorkspaceListRequest` | 接口 | <code>interface WorkspaceListRequest</code> | Workspace List Request 接口，共包含 7 个公开字段或方法。 |
| `WorkspaceMutationPolicySpec` | 接口 | <code>interface WorkspaceMutationPolicySpec</code> | Workspace Mutation Policy Spec 接口，共包含 7 个公开字段或方法。 |
| `WorkspacePatchConflict` | 接口 | <code>interface WorkspacePatchConflict</code> | Workspace Patch Conflict 接口，共包含 4 个公开字段或方法。 |
| `WorkspacePatchRequest` | 接口 | <code>interface WorkspacePatchRequest</code> | Workspace Patch Request 接口，共包含 8 个公开字段或方法。 |
| `WorkspacePatchResult` | 接口 | <code>interface WorkspacePatchResult</code> | Workspace Patch Result 接口，共包含 5 个公开字段或方法。 |
| `WorkspacePathPolicySpec` | 接口 | <code>interface WorkspacePathPolicySpec</code> | Workspace Path Policy Spec 接口，共包含 12 个公开字段或方法。 |
| `WorkspacePathRequest` | 接口 | <code>interface WorkspacePathRequest</code> | Workspace Path Request 接口，共包含 5 个公开字段或方法。 |
| `WorkspaceQuotaSpec` | 接口 | <code>interface WorkspaceQuotaSpec</code> | Workspace Quota Spec 接口，共包含 6 个公开字段或方法。 |
| `WorkspaceReadRequest` | 接口 | <code>interface WorkspaceReadRequest</code> | Workspace Read Request 接口，共包含 7 个公开字段或方法。 |
| `WorkspaceReadResult` | 接口 | <code>interface WorkspaceReadResult</code> | Workspace Read Result 接口，共包含 7 个公开字段或方法。 |
| `WorkspaceRecord` | 接口 | <code>interface WorkspaceRecord</code> | Workspace Record 接口，共包含 22 个公开字段或方法。 |
| `WorkspaceRestoreRequest` | 接口 | <code>interface WorkspaceRestoreRequest</code> | Workspace Restore Request 接口，共包含 6 个公开字段或方法。 |
| `WorkspaceSnapshotEntry` | 接口 | <code>interface WorkspaceSnapshotEntry</code> | Workspace Snapshot Entry 接口，共包含 7 个公开字段或方法。 |
| `WorkspaceSnapshotManifest` | 接口 | <code>interface WorkspaceSnapshotManifest</code> | Workspace Snapshot Manifest 接口，共包含 12 个公开字段或方法。 |
| `WorkspaceSnapshotPolicySpec` | 接口 | <code>interface WorkspaceSnapshotPolicySpec</code> | Workspace Snapshot Policy Spec 接口，共包含 6 个公开字段或方法。 |
| `WorkspaceSnapshotRequest` | 接口 | <code>interface WorkspaceSnapshotRequest</code> | Workspace Snapshot Request 接口，共包含 10 个公开字段或方法。 |
| `WorkspaceSpec` | 接口 | <code>interface WorkspaceSpec extends VersionedSpec, SpecMetadata</code> | Workspace Spec 接口，共包含 21 个公开字段或方法。 |
| `WorkspaceUsage` | 接口 | <code>interface WorkspaceUsage</code> | Workspace Usage 接口，共包含 4 个公开字段或方法。 |
| `WorkspaceWriteRequest` | 接口 | <code>interface WorkspaceWriteRequest</code> | Workspace Write Request 接口，共包含 10 个公开字段或方法。 |
| `WorkspaceWriteResult` | 接口 | <code>interface WorkspaceWriteResult</code> | Workspace Write Result 接口，共包含 6 个公开字段或方法。 |
| `WorkspaceEntryKind` | 类型 | <code>type WorkspaceEntryKind = 'file' &#124; 'directory' &#124; 'symlink' &#124; 'other'</code> | Workspace Entry Kind 公共类型别名；完整类型表达式见声明。 |
| `WorkspaceEventCreateInput` | 类型 | <code>type WorkspaceEventCreateInput = Omit&lt;EventCreateInput&lt;WorkspaceEventPayloadMap[TType]&gt;, 'type' &#124; 'workspaceId'&gt; &amp; { type: TType; workspaceId: string; }</code> | Workspace Event Create Input 公共类型别名；完整类型表达式见声明。 |
| `WorkspaceEventPayloadMap` | 类型 | <code>type WorkspaceEventPayloadMap = { 'workspace.create.requested': WorkspaceEventPayloadWithRequired&lt;'operationId' &#124; 'profileRef'&gt;; 'workspace.created': WorkspaceEventPayloadWithRequired&lt;'operationId' &#124; 'profileRef' &#124; 'status'&gt;; 'workspace.ready': WorkspaceStatusEventPayload&lt;'ready'&gt;; 'workspace.busy': WorkspaceStatusEventPayload&lt;'busy'&gt;; 'workspace.path.resolved': WorkspaceEventPayloadWithRequired&lt;'operationId'&gt;; 'w...</code> | Workspace Event Payload Map 公共类型别名；完整类型表达式见声明。 |
| `WorkspaceFrameworkEvent` | 类型 | <code>type WorkspaceFrameworkEvent = Omit&lt;FrameworkEvent&lt;WorkspaceEventPayloadMap[TType]&gt;, 'type' &#124; 'workspaceId'&gt; &amp; { type: TType; workspaceId: string; }</code> | Workspace Framework Event 公共类型别名；完整类型表达式见声明。 |
| `WorkspaceFrameworkEventType` | 类型 | <code>type WorkspaceFrameworkEventType = 'workspace.create.requested' &#124; 'workspace.created' &#124; 'workspace.ready' &#124; 'workspace.busy' &#124; 'workspace.path.resolved' &#124; 'workspace.path.denied' &#124; 'workspace.quota.exceeded' &#124; 'workspace.snapshot.requested' &#124; 'workspace.snapshot.created' &#124; 'workspace.snapshot.failed' &#124; 'workspace.restore.requested' &#124; 'workspace.restored' &#124; 'workspace.restore.failed' &#124; 'workspace.patch.checked' &#124; '...</code> | Workspace Framework Event Type 公共类型别名；完整类型表达式见声明。 |
| `WorkspacePathOperation` | 类型 | <code>type WorkspacePathOperation = 'read' &#124; 'write' &#124; 'execute' &#124; 'delete' &#124; 'list'</code> | Workspace Path Operation 公共类型别名；完整类型表达式见声明。 |
| `WorkspacePermission` | 类型 | <code>type WorkspacePermission = 'read' &#124; 'write' &#124; 'execute' &#124; 'delete'</code> | Workspace Permission 公共类型别名；完整类型表达式见声明。 |
| `WorkspaceSnapshotType` | 类型 | <code>type WorkspaceSnapshotType = 'full' &#124; 'incremental' &#124; 'manifest_only' &#124; 'failure_snapshot'</code> | Workspace Snapshot Type 公共类型别名；完整类型表达式见声明。 |
| `WorkspaceStatus` | 类型 | <code>type WorkspaceStatus = 'creating' &#124; 'ready' &#124; 'busy' &#124; 'snapshotting' &#124; 'archiving' &#124; 'archived' &#124; 'cleaning' &#124; 'cleaned' &#124; 'failed'</code> | Workspace Status 公共类型别名；完整类型表达式见声明。 |

## `FileMutation`

File Mutation 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FileMutation } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `afterHash` | 属性 | <code>afterHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `afterSizeBytes` | 属性 | <code>afterSizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `artifactRef` | 属性 | <code>artifactRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `beforeHash` | 属性 | <code>beforeHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `beforeSizeBytes` | 属性 | <code>beforeSizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `detectedAt` | 属性 | <code>detectedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `oldPath` | 属性 | <code>oldPath?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: "created" &#124; "deleted" &#124; "modified" &#124; "renamed" &#124; "permission_changed"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `path` | 属性 | <code>path: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ResolvedWorkspacePath`

Resolved Workspace Path 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ResolvedWorkspacePath } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalRelativePath` | 属性 | <code>canonicalRelativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `exists` | 属性 | <code>exists: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind?: WorkspaceEntryKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pathRef` | 属性 | <code>pathRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permissions` | 属性 | <code>permissions: WorkspacePermission[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceCleanupPolicySpec`

Workspace Cleanup Policy Spec 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceCleanupPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archiveBeforeDelete` | 属性 | <code>archiveBeforeDelete?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "on_run_end" &#124; "on_success" &#124; "after_ttl" &#124; "retain" &#124; "manual"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retainOnFailure` | 属性 | <code>retainOnFailure?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retainSnapshots` | 属性 | <code>retainSnapshots?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `secureDelete` | 属性 | <code>secureDelete?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlSeconds` | 属性 | <code>ttlSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceDeleteRequest`

Workspace Delete Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceDeleteRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedContentHash` | 属性 | <code>expectedContentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recursive` | 属性 | <code>recursive?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceDiffRequest`

Workspace Diff Request 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceDiffRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createPatchArtifact` | 属性 | <code>createPatchArtifact?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fromSnapshotRef` | 属性 | <code>fromSnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toSnapshotRef` | 属性 | <code>toSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceDiffResult`

Workspace Diff Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceDiffResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

```text
export interface WorkspaceDiffResult {
    fromSnapshotRef: string;
    toSnapshotRef?: string;
    mutations: FileMutation[];
    patchArtifactRef?: string;
    summary: WorkspaceDiffSummary;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fromSnapshotRef` | 属性 | <code>fromSnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mutations` | 属性 | <code>mutations: FileMutation[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `patchArtifactRef` | 属性 | <code>patchArtifactRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `summary` | 属性 | <code>summary: WorkspaceDiffSummary</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toSnapshotRef` | 属性 | <code>toSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceDiffSummary`

Workspace Diff Summary 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceDiffSummary } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `bytesAdded` | 属性 | <code>bytesAdded: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `bytesRemoved` | 属性 | <code>bytesRemoved: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `created` | 属性 | <code>created: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deleted` | 属性 | <code>deleted: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modified` | 属性 | <code>modified: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permissionChanged` | 属性 | <code>permissionChanged: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `renamed` | 属性 | <code>renamed: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceDirectorySpec`

Workspace Directory Spec 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceDirectorySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cache` | 属性 | <code>cache?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputs` | 属性 | <code>inputs: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `logs` | 属性 | <code>logs: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputs` | 属性 | <code>outputs: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshots` | 属性 | <code>snapshots: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `temp` | 属性 | <code>temp: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `working` | 属性 | <code>working: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceEventPayload`

Workspace Event Payload 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceEventPayload } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `bytes` | 属性 | <code>bytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedExecutionError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `files` | 属性 | <code>files?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotManifestHash` | 属性 | <code>snapshotManifestHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status?: WorkspaceStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceSnapshotHash` | 属性 | <code>workspaceSnapshotHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceFileEntry`

Workspace File Entry 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceFileEntry } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: WorkspaceEntryKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modifiedAt` | 属性 | <code>modifiedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permissions` | 属性 | <code>permissions?: WorkspacePermission[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceListRequest`

Workspace List Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceListRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cursor` | 属性 | <code>cursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeHidden` | 属性 | <code>includeHidden?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEntries` | 属性 | <code>maxEntries?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recursive` | 属性 | <code>recursive?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceMutationPolicySpec`

Workspace Mutation Policy Spec 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceMutationPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowDelete` | 属性 | <code>allowDelete?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `atomicWrite` | 属性 | <code>atomicWrite?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxPatchBytes` | 属性 | <code>maxPatchBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preserveInputFiles` | 属性 | <code>preserveInputFiles?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireApprovalForDelete` | 属性 | <code>requireApprovalForDelete?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireSnapshotBeforeWrite` | 属性 | <code>requireSnapshotBeforeWrite?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trackFileMutations` | 属性 | <code>trackFileMutations?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspacePatchConflict`

Workspace Patch Conflict 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspacePatchConflict } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

```text
export interface WorkspacePatchConflict {
    path: string;
    reason: string;
    expectedHash?: string;
    actualHash?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actualHash` | 属性 | <code>actualHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedHash` | 属性 | <code>expectedHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `path` | 属性 | <code>path: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspacePatchRequest`

Workspace Patch Request 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspacePatchRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `conflictPolicy` | 属性 | <code>conflictPolicy: "fail" &#124; "three_way" &#124; "mark_conflicts"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedBaseSnapshotHash` | 属性 | <code>expectedBaseSnapshotHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "check" &#124; "apply"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `patchArtifactRef` | 属性 | <code>patchArtifactRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspacePatchResult`

Workspace Patch Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspacePatchResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

```text
export interface WorkspacePatchResult {
    checked: boolean;
    applied: boolean;
    conflicts: WorkspacePatchConflict[];
    mutations: FileMutation[];
    resultingWorkspaceSnapshotHash?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `applied` | 属性 | <code>applied: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `checked` | 属性 | <code>checked: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `conflicts` | 属性 | <code>conflicts: WorkspacePatchConflict[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mutations` | 属性 | <code>mutations: FileMutation[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resultingWorkspaceSnapshotHash` | 属性 | <code>resultingWorkspaceSnapshotHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspacePathPolicySpec`

Workspace Path Policy Spec 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspacePathPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedExtensions` | 属性 | <code>allowedExtensions?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowHardLinks` | 属性 | <code>allowHardLinks?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowHiddenFiles` | 属性 | <code>allowHiddenFiles?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowSymlinks` | 属性 | <code>allowSymlinks?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `caseSensitivity` | 属性 | <code>caseSensitivity?: "platform" &#124; "sensitive" &#124; "insensitive"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deniedExtensions` | 属性 | <code>deniedExtensions?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deniedPaths` | 属性 | <code>deniedPaths?: string[]</code> | Final deny boundary; it cannot be widened by any allow list. |
| `executablePaths` | 属性 | <code>executablePaths?: string[]</code> | Execute permission only. Exact or descendant deny rules always take precedence. |
| `followSymlinksForRead` | 属性 | <code>followSymlinksForRead?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxPathLength` | 属性 | <code>maxPathLength?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `readOnlyPaths` | 属性 | <code>readOnlyPaths?: string[]</code> | Read permission only. Exact or descendant deny rules always take precedence. |
| `writablePaths` | 属性 | <code>writablePaths?: string[]</code> | Write permission only. Exact or descendant deny rules always take precedence. |

## `WorkspacePathRequest`

Workspace Path Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspacePathRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

```text
export interface WorkspacePathRequest {
    workspaceId: string;
    principal: ExecutionPrincipal;
    relativePath: string;
    operation: WorkspacePathOperation;
    allowMissing?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowMissing` | 属性 | <code>allowMissing?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: WorkspacePathOperation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceQuotaSpec`

Workspace Quota Spec 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceQuotaSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxBytes` | 属性 | <code>maxBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxDirectoryDepth` | 属性 | <code>maxDirectoryDepth?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxFiles` | 属性 | <code>maxFiles?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxMutationCountPerExecution` | 属性 | <code>maxMutationCountPerExecution?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxOpenFiles` | 属性 | <code>maxOpenFiles?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxSingleFileBytes` | 属性 | <code>maxSingleFileBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceReadRequest`

Workspace Read Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceReadRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `encoding` | 属性 | <code>encoding?: "utf8" &#124; "base64"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `length` | 属性 | <code>length?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxBytes` | 属性 | <code>maxBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `offset` | 属性 | <code>offset?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceReadResult`

Workspace Read Result 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceReadResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `encoding` | 属性 | <code>encoding: "utf8" &#124; "base64"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextOffset` | 属性 | <code>nextOffset?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `truncated` | 属性 | <code>truncated?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceRecord`

Workspace Record 接口，共包含 22 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeExecutionIds` | 属性 | <code>activeExecutionIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cleanedAt` | 属性 | <code>cleanedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedExecutionError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `latestSnapshotRef` | 属性 | <code>latestSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `quota` | 属性 | <code>quota: WorkspaceQuotaSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `readyAt` | 属性 | <code>readyAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rootPathRef` | 属性 | <code>rootPathRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: WorkspaceStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `usage` | 属性 | <code>usage: WorkspaceUsage</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceRestoreRequest`

Workspace Restore Request 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceRestoreRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedWorkspaceSnapshotHash` | 属性 | <code>expectedWorkspaceSnapshotHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotRef` | 属性 | <code>snapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceSnapshotEntry`

Workspace Snapshot Entry 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceSnapshotEntry } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "file" &#124; "directory" &#124; "symlink"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `path` | 属性 | <code>path: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `symlinkTarget` | 属性 | <code>symlinkTarget?: string</code> | Required only for symlink entries; always Workspace-relative. |

## `WorkspaceSnapshotManifest`

Workspace Snapshot Manifest 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceSnapshotManifest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseSnapshotId` | 属性 | <code>baseSnapshotId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdBy` | 属性 | <code>createdBy: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `entries` | 属性 | <code>entries: WorkspaceSnapshotEntry[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fileCount` | 属性 | <code>fileCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ignoredPatterns` | 属性 | <code>ignoredPatterns?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `manifestHash` | 属性 | <code>manifestHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalBytes` | 属性 | <code>totalBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceSnapshotPolicySpec`

Workspace Snapshot Policy Spec 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceSnapshotPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enabled` | 属性 | <code>enabled: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxSnapshots` | 属性 | <code>maxSnapshots?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "full" &#124; "incremental" &#124; "manifest_only"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotAfterExecution` | 属性 | <code>snapshotAfterExecution?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotBeforeWrite` | 属性 | <code>snapshotBeforeWrite?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotOnFailure` | 属性 | <code>snapshotOnFailure?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceSnapshotRequest`

Workspace Snapshot Request 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceSnapshotRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseSnapshotRef` | 属性 | <code>baseSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `excludePatterns` | 属性 | <code>excludePatterns?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includePaths` | 属性 | <code>includePaths?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: WorkspaceSnapshotType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceSpec`

Workspace Spec 接口，共包含 21 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactProfileRef` | 属性 | <code>artifactProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cleanup` | 属性 | <code>cleanup: WorkspaceCleanupPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `directories` | 属性 | <code>directories: WorkspaceDirectorySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionEnvironmentRef` | 属性 | <code>executionEnvironmentRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mutation` | 属性 | <code>mutation: WorkspaceMutationPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pathPolicy` | 属性 | <code>pathPolicy: WorkspacePathPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `quota` | 属性 | <code>quota: WorkspaceQuotaSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rootPolicy` | 属性 | <code>rootPolicy: "managed" &#124; "provided_ref"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rootRef` | 属性 | <code>rootRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `secretPolicyRef` | 属性 | <code>secretPolicyRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshot` | 属性 | <code>snapshot: WorkspaceSnapshotPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceUsage`

Workspace Usage 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceUsage } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

```text
export interface WorkspaceUsage {
    bytes: number;
    files: number;
    directories?: number;
    lastCalculatedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `bytes` | 属性 | <code>bytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `directories` | 属性 | <code>directories?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `files` | 属性 | <code>files: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastCalculatedAt` | 属性 | <code>lastCalculatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceWriteRequest`

Workspace Write Request 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceWriteRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content?: string &#124; Uint8Array&lt;ArrayBufferLike&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createParents` | 属性 | <code>createParents?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "create" &#124; "overwrite" &#124; "append" &#124; "atomic_replace"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceWriteResult`

Workspace Write Result 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceWriteResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `afterHash` | 属性 | <code>afterHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `artifactRef` | 属性 | <code>artifactRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `beforeHash` | 属性 | <code>beforeHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mutation` | 属性 | <code>mutation: FileMutation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceEntryKind`

Workspace Entry Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { WorkspaceEntryKind } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

```text
export type WorkspaceEntryKind = 'file' | 'directory' | 'symlink' | 'other';
```

## `WorkspaceEventCreateInput`

Workspace Event Create Input 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { WorkspaceEventCreateInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

```text
export type WorkspaceEventCreateInput<TType extends WorkspaceFrameworkEventType = WorkspaceFrameworkEventType> = Omit<EventCreateInput<WorkspaceEventPayloadMap[TType]>, 'type' | 'workspaceId'> & {
    type: TType;
    workspaceId: string;
};
```

## `WorkspaceEventPayloadMap`

Workspace Event Payload Map 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { WorkspaceEventPayloadMap } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

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

Workspace Framework Event 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { WorkspaceFrameworkEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

```text
export type WorkspaceFrameworkEvent<TType extends WorkspaceFrameworkEventType = WorkspaceFrameworkEventType> = Omit<FrameworkEvent<WorkspaceEventPayloadMap[TType]>, 'type' | 'workspaceId'> & {
    type: TType;
    workspaceId: string;
};
```

## `WorkspaceFrameworkEventType`

Workspace Framework Event Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { WorkspaceFrameworkEventType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

```text
export type WorkspaceFrameworkEventType = 'workspace.create.requested' | 'workspace.created' | 'workspace.ready' | 'workspace.busy' | 'workspace.path.resolved' | 'workspace.path.denied' | 'workspace.quota.exceeded' | 'workspace.snapshot.requested' | 'workspace.snapshot.created' | 'workspace.snapshot.failed' | 'workspace.restore.requested' | 'workspace.restored' | 'workspace.restore.failed' | 'workspace.patch.checked' | 'workspace.patch.applied' | 'workspace.patch.conflict' | 'workspace.cleanup.started' | 'workspace.cleanup.completed' | 'workspace.cleanup.failed';
```

## `WorkspacePathOperation`

Workspace Path Operation 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { WorkspacePathOperation } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

```text
export type WorkspacePathOperation = 'read' | 'write' | 'execute' | 'delete' | 'list';
```

## `WorkspacePermission`

Workspace Permission 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { WorkspacePermission } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

```text
export type WorkspacePermission = 'read' | 'write' | 'execute' | 'delete';
```

## `WorkspaceSnapshotType`

Workspace Snapshot Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { WorkspaceSnapshotType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

```text
export type WorkspaceSnapshotType = 'full' | 'incremental' | 'manifest_only' | 'failure_snapshot';
```

## `WorkspaceStatus`

Workspace Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { WorkspaceStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/workspace.ts)

### 声明

```text
export type WorkspaceStatus = 'creating' | 'ready' | 'busy' | 'snapshotting' | 'archiving' | 'archived' | 'cleaning' | 'cleaned' | 'failed';
```
