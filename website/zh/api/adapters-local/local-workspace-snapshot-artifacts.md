# `@codesoul-co/hypha-adapters-local` / `local-workspace-snapshot-artifacts`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-workspace-snapshot-artifacts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-snapshot-artifacts.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalWorkspaceSnapshotArtifactService` | 类 | <code>new LocalWorkspaceSnapshotArtifactService(options: LocalWorkspaceSnapshotArtifactServiceOptions): LocalWorkspaceSnapshotArtifactService</code> | Persists a full Workspace tree through ArtifactManager. Host paths never enter Artifact metadata; file bytes are collected through its governed Workspace reader port. |
| `LocalWorkspaceSnapshotArtifactContext` | 接口 | <code>interface LocalWorkspaceSnapshotArtifactContext</code> | Local Workspace Snapshot Artifact Context 的字段契约；完整字段见下表。 |
| `LocalWorkspaceSnapshotArtifactServiceOptions` | 接口 | <code>interface LocalWorkspaceSnapshotArtifactServiceOptions</code> | Local Workspace Snapshot Artifact Service Options 的字段契约；完整字段见下表。 |

## `LocalWorkspaceSnapshotArtifactService` 公开成员

Persists a full Workspace tree through ArtifactManager. Host paths never enter Artifact metadata; file bytes are collected through its governed Workspace reader port.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LocalWorkspaceSnapshotArtifactServiceOptions): LocalWorkspaceSnapshotArtifactService</code> | 创建该类的实例。 |
| `createFullSnapshot` | 方法 | <code>createFullSnapshot(input: WorkspaceSnapshotRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 创建 Full Snapshot。 |
| `recoverInterruptedRestore` | 方法 | <code>recoverInterruptedRestore(): Promise&lt;LocalWorkspaceRestoreRecoveryResult&gt;</code> | recover Interrupted Restore 的公开运行时操作。 |
| `restoreFullSnapshot` | 方法 | <code>restoreFullSnapshot(input: WorkspaceRestoreRequest, options?: ArtifactOperationOptions): Promise&lt;void&gt;</code> | restore Full Snapshot 的公开运行时操作。 |

## `LocalWorkspaceSnapshotArtifactContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | profile Ref 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `LocalWorkspaceSnapshotArtifactServiceOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: Pick&lt;ArtifactManager, "read" &#124; "create" &#124; "createFromWorkspace" &#124; "finalize"&gt;</code> | artifacts 字段。 |
| `context` | 属性 | <code>context: LocalWorkspaceSnapshotArtifactContext</code> | context 字段。 |
| `maxManifestBytes` | 属性 | <code>maxManifestBytes: number</code> | max Manifest Bytes 字段。 |
| `maxRestoreBytes` | 属性 | <code>maxRestoreBytes: number</code> | max Restore Bytes 字段。 |
| `maxRestoreEntries` | 属性 | <code>maxRestoreEntries: number</code> | max Restore Entries 字段。 |
| `maxRestoreLockWaitDurationMs` | 属性 | <code>maxRestoreLockWaitDurationMs: number</code> | max Restore Lock Wait Duration Ms 字段。 |
| `maxRestoreStagingDurationMs` | 属性 | <code>maxRestoreStagingDurationMs: number</code> | max Restore Staging Duration Ms 字段。 |
| `maxSnapshotPersistenceDurationMs` | 属性 | <code>maxSnapshotPersistenceDurationMs: number</code> | max Snapshot Persistence Duration Ms 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `nowMs` | 方法 | <code>nowMs(): number</code> | now Ms 的公开运行时操作。 |
| `workspace` | 属性 | <code>workspace: Pick&lt;LocalWorkspaceAdapter, "workspaceRoot" &#124; "capture"&gt;</code> | workspace 字段。 |
