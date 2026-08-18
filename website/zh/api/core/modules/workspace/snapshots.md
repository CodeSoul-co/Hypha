# `@codesoul-co/hypha-core` / `modules/workspace/snapshots`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/workspace/snapshots.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)
- 导出数: **26**

## 模块用法

用于声明并实施 Workspace 作用域边界。Snapshots 模块公开 16 常量、10 函数。

### 从包入口导入

```ts
import {
  workspaceDiffRequestSchema,
  workspaceDiffResultExample,
  workspaceDiffResultSchema,
  workspaceDiffSummarySchema,
  workspacePatchConflictSchema,
  workspacePatchRequestExample,
  workspacePatchRequestSchema,
  workspacePatchResultExample,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 10 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 16 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { workspaceDiffRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = workspaceDiffRequestSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `workspaceDiffRequestSchema` | 常量 | <code>const workspaceDiffRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "...</code> | Workspace Diff Request 的运行时 Schema。 |
| `workspaceDiffResultExample` | 常量 | <code>const workspaceDiffResultExample: WorkspaceDiffResult</code> | Workspace Diff Result 的有效示例值。 |
| `workspaceDiffResultSchema` | 常量 | <code>const workspaceDiffResultSchema: z.ZodObject&lt;{ fromSnapshotRef: z.ZodString; toSnapshotRef: z.ZodOptional&lt;z.ZodString&gt;; mutations: z.ZodArray&lt;z.ZodObject&lt;{ path: z.ZodEffects&lt;z.ZodString, string, string&gt;; operation: z.ZodEnum&lt;["created", "modified", "deleted", "renamed", "permission_changed"]&gt;; beforeHash: z.ZodOptional&lt;z.ZodString&gt;; afterHash: z.ZodOptional&lt;z.ZodString&gt;; beforeSizeBytes: z.ZodOptional&lt;z.ZodNumber...</code> | Workspace Diff Result 的运行时 Schema。 |
| `workspaceDiffSummarySchema` | 常量 | <code>const workspaceDiffSummarySchema: z.ZodObject&lt;{ created: z.ZodNumber; modified: z.ZodNumber; deleted: z.ZodNumber; renamed: z.ZodNumber; permissionChanged: z.ZodNumber; bytesAdded: z.ZodNumber; bytesRemoved: z.ZodNumber; }, "strict", z.ZodTypeAny, { deleted: number; created: number; modified: number; renamed: number; permissionChanged: number; bytesAdded: number; bytesRemoved: number; }, { deleted: number; created...</code> | Workspace Diff Summary 的运行时 Schema。 |
| `workspacePatchConflictSchema` | 常量 | <code>const workspacePatchConflictSchema: z.ZodObject&lt;{ path: z.ZodEffects&lt;z.ZodString, string, string&gt;; reason: z.ZodString; expectedHash: z.ZodOptional&lt;z.ZodString&gt;; actualHash: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { path: string; reason: string; expectedHash?: string &#124; undefined; actualHash?: string &#124; undefined; }, { path: string; reason: string; expectedHash?: string &#124; undefined; actualHash?: strin...</code> | Workspace Patch Conflict 的运行时 Schema。 |
| `workspacePatchRequestExample` | 常量 | <code>const workspacePatchRequestExample: WorkspacePatchRequest</code> | Workspace Patch Request 的有效示例值。 |
| `workspacePatchRequestSchema` | 常量 | <code>const workspacePatchRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;...</code> | Workspace Patch Request 的运行时 Schema。 |
| `workspacePatchResultExample` | 常量 | <code>const workspacePatchResultExample: WorkspacePatchResult</code> | Workspace Patch Result 的有效示例值。 |
| `workspacePatchResultSchema` | 常量 | <code>const workspacePatchResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ checked: z.ZodBoolean; applied: z.ZodBoolean; conflicts: z.ZodArray&lt;z.ZodObject&lt;{ path: z.ZodEffects&lt;z.ZodString, string, string&gt;; reason: z.ZodString; expectedHash: z.ZodOptional&lt;z.ZodString&gt;; actualHash: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { path: string; reason: string; expectedHash?: string &#124; undefined; actualHash?: string &#124; undefi...</code> | Workspace Patch Result 的运行时 Schema。 |
| `workspaceRestoreRequestSchema` | 常量 | <code>const workspaceRestoreRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString...</code> | Workspace Restore Request 的运行时 Schema。 |
| `workspaceSnapshotEntrySchema` | 常量 | <code>const workspaceSnapshotEntrySchema: z.ZodEffects&lt;z.ZodObject&lt;{ path: z.ZodEffects&lt;z.ZodString, string, string&gt;; kind: z.ZodEnum&lt;["file", "directory", "symlink"]&gt;; sizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; contentHash: z.ZodOptional&lt;z.ZodString&gt;; mode: z.ZodOptional&lt;z.ZodNumber&gt;; symlinkTarget: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodString, string, string&gt;&gt;; artifactRef: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny,...</code> | Workspace Snapshot Entry 的运行时 Schema。 |
| `workspaceSnapshotJsonSchemas` | 常量 | <code>const workspaceSnapshotJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/workspace/snapshots` 模块导出的 Workspace Snapshot JSON Schemas 常量。 |
| `workspaceSnapshotManifestExample` | 常量 | <code>const workspaceSnapshotManifestExample: WorkspaceSnapshotManifest</code> | Workspace Snapshot Manifest 的有效示例值。 |
| `workspaceSnapshotManifestSchema` | 常量 | <code>const workspaceSnapshotManifestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; workspaceId: z.ZodString; baseSnapshotId: z.ZodOptional&lt;z.ZodString&gt;; entries: z.ZodArray&lt;z.ZodEffects&lt;z.ZodObject&lt;{ path: z.ZodEffects&lt;z.ZodString, string, string&gt;; kind: z.ZodEnum&lt;["file", "directory", "symlink"]&gt;; sizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; contentHash: z.ZodOptional&lt;z.ZodString&gt;; mode: z.ZodOptional&lt;z.ZodNumber&gt;; sym...</code> | Workspace Snapshot Manifest 的运行时 Schema。 |
| `workspaceSnapshotRequestExample` | 常量 | <code>const workspaceSnapshotRequestExample: WorkspaceSnapshotRequest</code> | Workspace Snapshot Request 的有效示例值。 |
| `workspaceSnapshotRequestSchema` | 常量 | <code>const workspaceSnapshotRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArr...</code> | Workspace Snapshot Request 的运行时 Schema。 |
| `validateWorkspaceDiffRequest` | 函数 | <code>validateWorkspaceDiffRequest(input: unknown): WorkspaceDiffRequest</code> | Validate Workspace Diff Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceDiffResult` | 函数 | <code>validateWorkspaceDiffResult(input: unknown): WorkspaceDiffResult</code> | Validate Workspace Diff Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceDiffSummary` | 函数 | <code>validateWorkspaceDiffSummary(input: unknown): WorkspaceDiffSummary</code> | Validate Workspace Diff Summary 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspacePatchConflict` | 函数 | <code>validateWorkspacePatchConflict(input: unknown): WorkspacePatchConflict</code> | Validate Workspace Patch Conflict 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspacePatchRequest` | 函数 | <code>validateWorkspacePatchRequest(input: unknown): WorkspacePatchRequest</code> | Validate Workspace Patch Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspacePatchResult` | 函数 | <code>validateWorkspacePatchResult(input: unknown): WorkspacePatchResult</code> | Validate Workspace Patch Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceRestoreRequest` | 函数 | <code>validateWorkspaceRestoreRequest(input: unknown): WorkspaceRestoreRequest</code> | Validate Workspace Restore Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceSnapshotEntry` | 函数 | <code>validateWorkspaceSnapshotEntry(input: unknown): WorkspaceSnapshotEntry</code> | Validate Workspace Snapshot Entry 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceSnapshotManifest` | 函数 | <code>validateWorkspaceSnapshotManifest(input: unknown): WorkspaceSnapshotManifest</code> | Validate Workspace Snapshot Manifest 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceSnapshotRequest` | 函数 | <code>validateWorkspaceSnapshotRequest(input: unknown): WorkspaceSnapshotRequest</code> | Validate Workspace Snapshot Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `workspaceDiffRequestSchema`

Workspace Diff Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceDiffRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare const workspaceDiffRequestSchema: z.ZodObject<{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; fromSnapshotRef: z.ZodString; toSnapshotRef: z.ZodOptional<z.ZodString>; createPatchArtifact: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; fromSnapshotRef: string; toSnapshotRef?: string | undefined; createPatchArtifact?: boolean | undefined; }, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; fromSnapshotRef: string; toSnapshotRef?: string | undefined; createPatchArtifact?: boolean | undefined; }>;
```

## `workspaceDiffResultExample`

Workspace Diff Result 的有效示例值。

- 种类: 常量
- 导入: `import { workspaceDiffResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare const workspaceDiffResultExample: WorkspaceDiffResult;
```

## `workspaceDiffResultSchema`

Workspace Diff Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceDiffResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare const workspaceDiffResultSchema: z.ZodObject<{ fromSnapshotRef: z.ZodString; toSnapshotRef: z.ZodOptional<z.ZodString>; mutations: z.ZodArray<z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; operation: z.ZodEnum<["created", "modified", "deleted", "renamed", "permission_changed"]>; beforeHash: z.ZodOptional<z.ZodString>; afterHash: z.ZodOptional<z.ZodString>; beforeSizeBytes: z.ZodOptional<z.ZodNumber>; afterSizeBytes: z.ZodOptional<z.ZodNumber>; artifactRef: z.ZodOptional<z.ZodString>; oldPath: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; detectedAt: z.ZodString; }, "strict", z.ZodTypeAny, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }>, "many">; patchArtifactRef: z.ZodOptional<z.ZodString>; summary: z.ZodObject<{ created: z.ZodNumber; modified: z.ZodNumber; deleted: z.ZodNumber; renamed: z.ZodNumber; permissionChanged: z.ZodNumber; bytesAdded: z.ZodNumber; bytesRemoved: z.ZodNumber; }, "strict", z.ZodTypeAny, { deleted: number; created: number; modified: number; renamed: number; permissionChanged: number; bytesAdded: number; bytesRemoved: number; }, { deleted: number; created: number; modified: number; renamed: number; permissionChanged: number; bytesAdded: number; bytesRemoved: number; }>; }, "strict", z.ZodTypeAny, { fromSnapshotRef: string; mutations: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }[]; summary: { deleted: number; created: number; modified: number; renamed: number; permissionChanged: number; bytesAdded: number; bytesRemoved: number; }; toSnapshotRef?: string | undefined; patchArtifactRef?: string | undefined; }, { fromSnapshotRef: string; mutations: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }[]; summary: { deleted: number; created: number; modified: number; renamed: number; permissionChanged: number; bytesAdded: number; bytesRemoved: number; }; toSnapshotRef?: string | undefined; patchArtifactRef?: string | undefined; }>;
```

## `workspaceDiffSummarySchema`

Workspace Diff Summary 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceDiffSummarySchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare const workspaceDiffSummarySchema: z.ZodObject<{ created: z.ZodNumber; modified: z.ZodNumber; deleted: z.ZodNumber; renamed: z.ZodNumber; permissionChanged: z.ZodNumber; bytesAdded: z.ZodNumber; bytesRemoved: z.ZodNumber; }, "strict", z.ZodTypeAny, { deleted: number; created: number; modified: number; renamed: number; permissionChanged: number; bytesAdded: number; bytesRemoved: number; }, { deleted: number; created: number; modified: number; renamed: number; permissionChanged: number; bytesAdded: number; bytesRemoved: number; }>;
```

## `workspacePatchConflictSchema`

Workspace Patch Conflict 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspacePatchConflictSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare const workspacePatchConflictSchema: z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; reason: z.ZodString; expectedHash: z.ZodOptional<z.ZodString>; actualHash: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }, { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }>;
```

## `workspacePatchRequestExample`

Workspace Patch Request 的有效示例值。

- 种类: 常量
- 导入: `import { workspacePatchRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare const workspacePatchRequestExample: WorkspacePatchRequest;
```

## `workspacePatchRequestSchema`

Workspace Patch Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspacePatchRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare const workspacePatchRequestSchema: z.ZodEffects<z.ZodObject<{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; patchArtifactRef: z.ZodString; expectedBaseSnapshotHash: z.ZodOptional<z.ZodString>; mode: z.ZodEnum<["check", "apply"]>; conflictPolicy: z.ZodEnum<["fail", "three_way", "mark_conflicts"]>; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; mode: "check" | "apply"; patchArtifactRef: string; conflictPolicy: "fail" | "three_way" | "mark_conflicts"; idempotencyKey?: string | undefined; expectedBaseSnapshotHash?: string | undefined; }, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; mode: "check" | "apply"; patchArtifactRef: string; conflictPolicy: "fail" | "three_way" | "mark_conflicts"; idempotencyKey?: string | undefined; expectedBaseSnapshotHash?: string | undefined; }>, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; mode: "check" | "apply"; patchArtifactRef: string; conflictPolicy: "fail" | "three_way" | "mark_conflicts"; idempotencyKey?: string | undefined; expectedBaseSnapshotHash?: string | undefined; }, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; mode: "check" | "apply"; patchArtifactRef: string; conflictPolicy: "fail" | "three_way" | "mark_conflicts"; idempotencyKey?: string | undefined; expectedBaseSnapshotHash?: string | undefined; }>;
```

## `workspacePatchResultExample`

Workspace Patch Result 的有效示例值。

- 种类: 常量
- 导入: `import { workspacePatchResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare const workspacePatchResultExample: WorkspacePatchResult;
```

## `workspacePatchResultSchema`

Workspace Patch Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspacePatchResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare const workspacePatchResultSchema: z.ZodEffects<z.ZodObject<{ checked: z.ZodBoolean; applied: z.ZodBoolean; conflicts: z.ZodArray<z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; reason: z.ZodString; expectedHash: z.ZodOptional<z.ZodString>; actualHash: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }, { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }>, "many">; mutations: z.ZodArray<z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; operation: z.ZodEnum<["created", "modified", "deleted", "renamed", "permission_changed"]>; beforeHash: z.ZodOptional<z.ZodString>; afterHash: z.ZodOptional<z.ZodString>; beforeSizeBytes: z.ZodOptional<z.ZodNumber>; afterSizeBytes: z.ZodOptional<z.ZodNumber>; artifactRef: z.ZodOptional<z.ZodString>; oldPath: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; detectedAt: z.ZodString; }, "strict", z.ZodTypeAny, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }>, "many">; resultingWorkspaceSnapshotHash: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { applied: boolean; mutations: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }[]; checked: boolean; conflicts: { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }[]; resultingWorkspaceSnapshotHash?: string | undefined; }, { applied: boolean; mutations: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }[]; checked: boolean; conflicts: { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }[]; resultingWorkspaceSnapshotHash?: string | undefined; }>, { applied: boolean; mutations: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }[]; checked: boolean; conflicts: { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }[]; resultingWorkspaceSnapshotHash?: string | undefined; }, { applied: boolean; mutations: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }[]; checked: boolean; conflicts: { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }[]; resultingWorkspaceSnapshotHash?: string | undefined; }>;
```

## `workspaceRestoreRequestSchema`

Workspace Restore Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceRestoreRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare const workspaceRestoreRequestSchema: z.ZodObject<{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; snapshotRef: z.ZodString; expectedWorkspaceSnapshotHash: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; snapshotRef: string; idempotencyKey?: string | undefined; expectedWorkspaceSnapshotHash?: string | undefined; }, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; snapshotRef: string; idempotencyKey?: string | undefined; expectedWorkspaceSnapshotHash?: string | undefined; }>;
```

## `workspaceSnapshotEntrySchema`

Workspace Snapshot Entry 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceSnapshotEntrySchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare const workspaceSnapshotEntrySchema: z.ZodEffects<z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; kind: z.ZodEnum<["file", "directory", "symlink"]>; sizeBytes: z.ZodOptional<z.ZodNumber>; contentHash: z.ZodOptional<z.ZodString>; mode: z.ZodOptional<z.ZodNumber>; symlinkTarget: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; artifactRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }>, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }>;
```

## `workspaceSnapshotJsonSchemas`

由 `modules/workspace/snapshots` 模块导出的 Workspace Snapshot JSON Schemas 常量。

- 种类: 常量
- 导入: `import { workspaceSnapshotJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare const workspaceSnapshotJsonSchemas: Record<string, JsonSchema>;
```

## `workspaceSnapshotManifestExample`

Workspace Snapshot Manifest 的有效示例值。

- 种类: 常量
- 导入: `import { workspaceSnapshotManifestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare const workspaceSnapshotManifestExample: WorkspaceSnapshotManifest;
```

## `workspaceSnapshotManifestSchema`

Workspace Snapshot Manifest 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceSnapshotManifestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare const workspaceSnapshotManifestSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; workspaceId: z.ZodString; baseSnapshotId: z.ZodOptional<z.ZodString>; entries: z.ZodArray<z.ZodEffects<z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; kind: z.ZodEnum<["file", "directory", "symlink"]>; sizeBytes: z.ZodOptional<z.ZodNumber>; contentHash: z.ZodOptional<z.ZodString>; mode: z.ZodOptional<z.ZodNumber>; symlinkTarget: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; artifactRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }>, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }>, "many">; ignoredPatterns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; sourceTreeHash: z.ZodString; manifestHash: z.ZodString; totalBytes: z.ZodNumber; fileCount: z.ZodNumber; createdAt: z.ZodString; createdBy: z.ZodString; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { entries: { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }[]; id: string; workspaceId: string; sourceTreeHash: string; createdAt: string; manifestHash: string; totalBytes: number; fileCount: number; createdBy: string; metadata?: Record<string, unknown> | undefined; baseSnapshotId?: string | undefined; ignoredPatterns?: string[] | undefined; }, { entries: { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }[]; id: string; workspaceId: string; sourceTreeHash: string; createdAt: string; manifestHash: string; totalBytes: number; fileCount: number; createdBy: string; metadata?: Record<string, unknown> | undefined; baseSnapshotId?: string | undefined; ignoredPatterns?: string[] | undefined; }>, { entries: { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }[]; id: string; workspaceId: string; sourceTreeHash: string; createdAt: string; manifestHash: string; totalBytes: number; fileCount: number; createdBy: string; metadata?: Record<string, unknown> | undefined; baseSnapshotId?: string | undefined; ignoredPatterns?: string[] | undefined; }, { entries: { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }[]; id: string; workspaceId: string; sourceTreeHash: string; createdAt: string; manifestHash: string; totalBytes: number; fileCount: number; createdBy: string; metadata?: Record<string, unknown> | undefined; baseSnapshotId?: string | undefined; ignoredPatterns?: string[] | undefined; }>;
```

## `workspaceSnapshotRequestExample`

Workspace Snapshot Request 的有效示例值。

- 种类: 常量
- 导入: `import { workspaceSnapshotRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare const workspaceSnapshotRequestExample: WorkspaceSnapshotRequest;
```

## `workspaceSnapshotRequestSchema`

Workspace Snapshot Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceSnapshotRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const workspaceSnapshotRequestSchema: (typeof import('@codesoul-co/hypha-core'))['workspaceSnapshotRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `validateWorkspaceDiffRequest`

Validate Workspace Diff Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceDiffRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare function validateWorkspaceDiffRequest(input: unknown): WorkspaceDiffRequest;
```

### 调用签名

```text
validateWorkspaceDiffRequest(input: unknown): WorkspaceDiffRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceDiffRequest`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceDiffResult`

Validate Workspace Diff Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceDiffResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare function validateWorkspaceDiffResult(input: unknown): WorkspaceDiffResult;
```

### 调用签名

```text
validateWorkspaceDiffResult(input: unknown): WorkspaceDiffResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceDiffResult`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceDiffSummary`

Validate Workspace Diff Summary 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceDiffSummary } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare function validateWorkspaceDiffSummary(input: unknown): WorkspaceDiffSummary;
```

### 调用签名

```text
validateWorkspaceDiffSummary(input: unknown): WorkspaceDiffSummary
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceDiffSummary`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspacePatchConflict`

Validate Workspace Patch Conflict 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspacePatchConflict } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare function validateWorkspacePatchConflict(input: unknown): WorkspacePatchConflict;
```

### 调用签名

```text
validateWorkspacePatchConflict(input: unknown): WorkspacePatchConflict
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspacePatchConflict`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspacePatchRequest`

Validate Workspace Patch Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspacePatchRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare function validateWorkspacePatchRequest(input: unknown): WorkspacePatchRequest;
```

### 调用签名

```text
validateWorkspacePatchRequest(input: unknown): WorkspacePatchRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspacePatchRequest`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspacePatchResult`

Validate Workspace Patch Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspacePatchResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare function validateWorkspacePatchResult(input: unknown): WorkspacePatchResult;
```

### 调用签名

```text
validateWorkspacePatchResult(input: unknown): WorkspacePatchResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspacePatchResult`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceRestoreRequest`

Validate Workspace Restore Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceRestoreRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare function validateWorkspaceRestoreRequest(input: unknown): WorkspaceRestoreRequest;
```

### 调用签名

```text
validateWorkspaceRestoreRequest(input: unknown): WorkspaceRestoreRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceRestoreRequest`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceSnapshotEntry`

Validate Workspace Snapshot Entry 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceSnapshotEntry } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare function validateWorkspaceSnapshotEntry(input: unknown): WorkspaceSnapshotEntry;
```

### 调用签名

```text
validateWorkspaceSnapshotEntry(input: unknown): WorkspaceSnapshotEntry
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceSnapshotEntry`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceSnapshotManifest`

Validate Workspace Snapshot Manifest 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceSnapshotManifest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare function validateWorkspaceSnapshotManifest(input: unknown): WorkspaceSnapshotManifest;
```

### 调用签名

```text
validateWorkspaceSnapshotManifest(input: unknown): WorkspaceSnapshotManifest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceSnapshotManifest`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceSnapshotRequest`

Validate Workspace Snapshot Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceSnapshotRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### 声明

```text
export declare function validateWorkspaceSnapshotRequest(input: unknown): WorkspaceSnapshotRequest;
```

### 调用签名

```text
validateWorkspaceSnapshotRequest(input: unknown): WorkspaceSnapshotRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceSnapshotRequest`
- 说明: 返回值契约由上述类型定义。
