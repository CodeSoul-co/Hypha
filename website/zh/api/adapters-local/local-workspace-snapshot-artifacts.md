# `@codesoul-co/hypha-adapters-local` / `local-workspace-snapshot-artifacts`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-workspace-snapshot-artifacts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-snapshot-artifacts.ts)
- 导出数: **3**

## 模块用法

用于声明并实施 Workspace 作用域边界。Local workspace snapshot artifacts 模块公开 1 类、2 接口。

### 从包入口导入

```ts
import {
  LocalWorkspaceSnapshotArtifactService,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalWorkspaceSnapshotArtifactContext,
  LocalWorkspaceSnapshotArtifactServiceOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalWorkspaceSnapshotArtifactService` | 类 | <code>new LocalWorkspaceSnapshotArtifactService(options: LocalWorkspaceSnapshotArtifactServiceOptions): LocalWorkspaceSnapshotArtifactService</code> | Persists a full Workspace tree through ArtifactManager. Host paths never enter Artifact metadata; file bytes are collected through its governed Workspace reader port. |
| `LocalWorkspaceSnapshotArtifactContext` | 接口 | <code>interface LocalWorkspaceSnapshotArtifactContext</code> | Local Workspace Snapshot Artifact Context 接口，共包含 7 个公开字段或方法。 |
| `LocalWorkspaceSnapshotArtifactServiceOptions` | 接口 | <code>interface LocalWorkspaceSnapshotArtifactServiceOptions</code> | Local Workspace Snapshot Artifact Service Options 接口，共包含 11 个公开字段或方法。 |

## `LocalWorkspaceSnapshotArtifactService`

Persists a full Workspace tree through ArtifactManager. Host paths never enter Artifact metadata; file bytes are collected through its governed Workspace reader port.

- 种类: 类
- 导入: `import { LocalWorkspaceSnapshotArtifactService } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-workspace-snapshot-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-snapshot-artifacts.ts)

### 声明

```text
export declare class LocalWorkspaceSnapshotArtifactService {
    constructor(options: LocalWorkspaceSnapshotArtifactServiceOptions);
    createFullSnapshot(input: WorkspaceSnapshotRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    restoreFullSnapshot(input: WorkspaceRestoreRequest, options?: ArtifactOperationOptions): Promise<void>;
    recoverInterruptedRestore(): Promise<LocalWorkspaceRestoreRecoveryResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LocalWorkspaceSnapshotArtifactServiceOptions): LocalWorkspaceSnapshotArtifactService</code> | 创建该类的实例。 |
| `createFullSnapshot` | 方法 | <code>createFullSnapshot(input: WorkspaceSnapshotRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recoverInterruptedRestore` | 方法 | <code>recoverInterruptedRestore(): Promise&lt;LocalWorkspaceRestoreRecoveryResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `restoreFullSnapshot` | 方法 | <code>restoreFullSnapshot(input: WorkspaceRestoreRequest, options?: ArtifactOperationOptions): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalWorkspaceSnapshotArtifactContext`

Local Workspace Snapshot Artifact Context 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalWorkspaceSnapshotArtifactContext } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-workspace-snapshot-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-snapshot-artifacts.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalWorkspaceSnapshotArtifactServiceOptions`

Local Workspace Snapshot Artifact Service Options 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalWorkspaceSnapshotArtifactServiceOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-workspace-snapshot-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-snapshot-artifacts.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: Pick&lt;ArtifactManager, "read" &#124; "create" &#124; "createFromWorkspace" &#124; "finalize"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `context` | 属性 | <code>context: LocalWorkspaceSnapshotArtifactContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxManifestBytes` | 属性 | <code>maxManifestBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxRestoreBytes` | 属性 | <code>maxRestoreBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxRestoreEntries` | 属性 | <code>maxRestoreEntries?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxRestoreLockWaitDurationMs` | 属性 | <code>maxRestoreLockWaitDurationMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxRestoreStagingDurationMs` | 属性 | <code>maxRestoreStagingDurationMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxSnapshotPersistenceDurationMs` | 属性 | <code>maxSnapshotPersistenceDurationMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `nowMs` | 方法 | <code>nowMs?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `workspace` | 属性 | <code>workspace: Pick&lt;LocalWorkspaceAdapter, "workspaceRoot" &#124; "capture"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
