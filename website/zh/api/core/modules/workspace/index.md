# `@codesoul-co/hypha-core` / `modules/workspace/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/workspace/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)
- 导出数: **28**

## 模块用法

用于声明并实施 Workspace 作用域边界。Index 模块公开 25 常量、3 函数。

### 从包入口导入

```ts
import {
  workspaceCleanupPolicySpecSchema,
  workspaceDirectorySpecSchema,
  workspaceEventMetadataSchema,
  workspaceEventPayloadExample,
  workspaceEventPayloadJsonSchema,
  workspaceEventPayloadSchema,
  workspaceMutationPolicySpecSchema,
  workspacePathPolicySpecSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 25 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { workspaceCleanupPolicySpecSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = workspaceCleanupPolicySpecSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `workspaceCleanupPolicySpecSchema` | 常量 | <code>const workspaceCleanupPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ mode: z.ZodEnum&lt;["on_run_end", "on_success", "after_ttl", "retain", "manual"]&gt;; ttlSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; retainOnFailure: z.ZodOptional&lt;z.ZodBoolean&gt;; retainSnapshots: z.ZodOptional&lt;z.ZodBoolean&gt;; secureDelete: z.ZodOptional&lt;z.ZodBoolean&gt;; archiveBeforeDelete: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { mode: "manual" &#124;...</code> | Workspace Cleanup Policy Spec 的运行时 Schema。 |
| `workspaceDirectorySpecSchema` | 常量 | <code>const workspaceDirectorySpecSchema: z.ZodObject&lt;{ inputs: z.ZodEffects&lt;z.ZodString, string, string&gt;; source: z.ZodEffects&lt;z.ZodString, string, string&gt;; working: z.ZodEffects&lt;z.ZodString, string, string&gt;; outputs: z.ZodEffects&lt;z.ZodString, string, string&gt;; logs: z.ZodEffects&lt;z.ZodString, string, string&gt;; temp: z.ZodEffects&lt;z.ZodString, string, string&gt;; snapshots: z.ZodEffects&lt;z.ZodString, string, string&gt;; artifacts...</code> | Workspace Directory Spec 的运行时 Schema。 |
| `workspaceEventMetadataSchema` | 常量 | <code>const workspaceEventMetadataSchema: z.ZodEffects&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;, Record&lt;string, unknown&gt;, Record&lt;string, unknown&gt;&gt;</code> | Workspace Event Metadata 的运行时 Schema。 |
| `workspaceEventPayloadExample` | 常量 | <code>const workspaceEventPayloadExample: WorkspaceEventPayload</code> | Workspace Event Payload 的有效示例值。 |
| `workspaceEventPayloadJsonSchema` | 常量 | <code>const workspaceEventPayloadJsonSchema: JsonSchema</code> | Workspace Event Payload 的 JSON Schema。 |
| `workspaceEventPayloadSchema` | 常量 | <code>const workspaceEventPayloadSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodString; profileRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision...</code> | Workspace Event Payload 的运行时 Schema。 |
| `workspaceMutationPolicySpecSchema` | 常量 | <code>const workspaceMutationPolicySpecSchema: z.ZodObject&lt;{ requireSnapshotBeforeWrite: z.ZodOptional&lt;z.ZodBoolean&gt;; trackFileMutations: z.ZodOptional&lt;z.ZodBoolean&gt;; maxPatchBytes: z.ZodOptional&lt;z.ZodNumber&gt;; allowDelete: z.ZodOptional&lt;z.ZodBoolean&gt;; requireApprovalForDelete: z.ZodOptional&lt;z.ZodBoolean&gt;; preserveInputFiles: z.ZodOptional&lt;z.ZodBoolean&gt;; atomicWrite: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny...</code> | Workspace Mutation Policy Spec 的运行时 Schema。 |
| `workspacePathPolicySpecSchema` | 常量 | <code>const workspacePathPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ readOnlyPaths: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEffects&lt;z.ZodString, string, string&gt;, "many"&gt;&gt;; writablePaths: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEffects&lt;z.ZodString, string, string&gt;, "many"&gt;&gt;; executablePaths: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEffects&lt;z.ZodString, string, string&gt;, "many"&gt;&gt;; deniedPaths: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEffects&lt;z.ZodString, string, ...</code> | Workspace Path Policy Spec 的运行时 Schema。 |
| `workspaceQuotaSpecJsonSchema` | 常量 | <code>const workspaceQuotaSpecJsonSchema: JsonSchema</code> | Workspace Quota Spec 的 JSON Schema。 |
| `workspaceQuotaSpecSchema` | 常量 | <code>const workspaceQuotaSpecSchema: z.ZodObject&lt;{ maxBytes: z.ZodOptional&lt;z.ZodNumber&gt;; maxFiles: z.ZodOptional&lt;z.ZodNumber&gt;; maxSingleFileBytes: z.ZodOptional&lt;z.ZodNumber&gt;; maxDirectoryDepth: z.ZodOptional&lt;z.ZodNumber&gt;; maxOpenFiles: z.ZodOptional&lt;z.ZodNumber&gt;; maxMutationCountPerExecution: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodTypeAny, { maxBytes?: number &#124; undefined; maxFiles?: number &#124; undefined; maxSingle...</code> | Workspace Quota Spec 的运行时 Schema。 |
| `workspaceRecordExample` | 常量 | <code>const workspaceRecordExample: WorkspaceRecord</code> | Workspace Record 的有效示例值。 |
| `workspaceRecordJsonSchema` | 常量 | <code>const workspaceRecordJsonSchema: JsonSchema</code> | Workspace Record 的 JSON Schema。 |
| `workspaceRecordJsonSchemas` | 常量 | <code>const workspaceRecordJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/workspace/index` 模块导出的 Workspace Record JSON Schemas 常量。 |
| `workspaceRecordSchema` | 常量 | <code>const workspaceRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; sessionId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; profileRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: s...</code> | Workspace Record 的运行时 Schema。 |
| `workspaceRelativePathSchema` | 常量 | <code>const workspaceRelativePathSchema: z.ZodEffects&lt;z.ZodString, string, string&gt;</code> | Workspace Relative Path 的运行时 Schema。 |
| `workspaceSnapshotPolicySpecSchema` | 常量 | <code>const workspaceSnapshotPolicySpecSchema: z.ZodObject&lt;{ enabled: z.ZodBoolean; mode: z.ZodEnum&lt;["full", "incremental", "manifest_only"]&gt;; snapshotBeforeWrite: z.ZodOptional&lt;z.ZodBoolean&gt;; snapshotAfterExecution: z.ZodOptional&lt;z.ZodBoolean&gt;; snapshotOnFailure: z.ZodOptional&lt;z.ZodBoolean&gt;; maxSnapshots: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodTypeAny, { mode: "full" &#124; "incremental" &#124; "manifest_only"; enabled: b...</code> | Workspace Snapshot Policy Spec 的运行时 Schema。 |
| `workspaceSpecDefinition` | 常量 | <code>const workspaceSpecDefinition: SpecSchemaDefinition&lt;WorkspaceSpec&gt;</code> | Workspace Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `workspaceSpecDefinitions` | 常量 | <code>const workspaceSpecDefinitions: readonly [SpecSchemaDefinition&lt;WorkspaceSpec&gt;]</code> | 由 `modules/workspace/index` 模块导出的 Workspace Spec Definitions 常量。 |
| `workspaceSpecExample` | 常量 | <code>const workspaceSpecExample: WorkspaceSpec</code> | Workspace Spec 的有效示例值。 |
| `workspaceSpecJsonSchema` | 常量 | <code>const workspaceSpecJsonSchema: JsonSchema</code> | Workspace Spec 的 JSON Schema。 |
| `workspaceSpecJsonSchemas` | 常量 | <code>const workspaceSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/workspace/index` 模块导出的 Workspace Spec JSON Schemas 常量。 |
| `workspaceSpecSchema` | 常量 | <code>const workspaceSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { revision: z.ZodOptional&lt;z.ZodString&gt;; rootPolicy: z.ZodEnum&lt;["managed"...</code> | Workspace Spec 的运行时 Schema。 |
| `workspaceStatusSchema` | 常量 | <code>const workspaceStatusSchema: z.ZodEnum&lt;["creating", "ready", "busy", "snapshotting", "archiving", "archived", "cleaning", "cleaned", "failed"]&gt;</code> | Workspace Status 的运行时 Schema。 |
| `workspaceUsageJsonSchema` | 常量 | <code>const workspaceUsageJsonSchema: JsonSchema</code> | Workspace Usage 的 JSON Schema。 |
| `workspaceUsageSchema` | 常量 | <code>const workspaceUsageSchema: z.ZodObject&lt;{ bytes: z.ZodNumber; files: z.ZodNumber; directories: z.ZodOptional&lt;z.ZodNumber&gt;; lastCalculatedAt: z.ZodString; }, "strict", z.ZodTypeAny, { bytes: number; files: number; lastCalculatedAt: string; directories?: number &#124; undefined; }, { bytes: number; files: number; lastCalculatedAt: string; directories?: number &#124; undefined; }&gt;</code> | Workspace Usage 的运行时 Schema。 |
| `validateWorkspaceEventPayload` | 函数 | <code>validateWorkspaceEventPayload(input: unknown): WorkspaceEventPayload</code> | Validate Workspace Event Payload 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceRecord` | 函数 | <code>validateWorkspaceRecord(input: unknown): WorkspaceRecord</code> | Validate Workspace Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceSpec` | 函数 | <code>validateWorkspaceSpec(input: unknown): WorkspaceSpec</code> | Validate Workspace Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `workspaceCleanupPolicySpecSchema`

Workspace Cleanup Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceCleanupPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceCleanupPolicySpecSchema: z.ZodEffects<z.ZodObject<{ mode: z.ZodEnum<["on_run_end", "on_success", "after_ttl", "retain", "manual"]>; ttlSeconds: z.ZodOptional<z.ZodNumber>; retainOnFailure: z.ZodOptional<z.ZodBoolean>; retainSnapshots: z.ZodOptional<z.ZodBoolean>; secureDelete: z.ZodOptional<z.ZodBoolean>; archiveBeforeDelete: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { mode: "manual" | "on_run_end" | "on_success" | "after_ttl" | "retain"; ttlSeconds?: number | undefined; retainOnFailure?: boolean | undefined; retainSnapshots?: boolean | undefined; secureDelete?: boolean | undefined; archiveBeforeDelete?: boolean | undefined; }, { mode: "manual" | "on_run_end" | "on_success" | "after_ttl" | "retain"; ttlSeconds?: number | undefined; retainOnFailure?: boolean | undefined; retainSnapshots?: boolean | undefined; secureDelete?: boolean | undefined; archiveBeforeDelete?: boolean | undefined; }>, { mode: "manual" | "on_run_end" | "on_success" | "after_ttl" | "retain"; ttlSeconds?: number | undefined; retainOnFailure?: boolean | undefined; retainSnapshots?: boolean | undefined; secureDelete?: boolean | undefined; archiveBeforeDelete?: boolean | undefined; }, { mode: "manual" | "on_run_end" | "on_success" | "after_ttl" | "retain"; ttlSeconds?: number | undefined; retainOnFailure?: boolean | undefined; retainSnapshots?: boolean | undefined; secureDelete?: boolean | undefined; archiveBeforeDelete?: boolean | undefined; }>;
```

## `workspaceDirectorySpecSchema`

Workspace Directory Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceDirectorySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceDirectorySpecSchema: z.ZodObject<{ inputs: z.ZodEffects<z.ZodString, string, string>; source: z.ZodEffects<z.ZodString, string, string>; working: z.ZodEffects<z.ZodString, string, string>; outputs: z.ZodEffects<z.ZodString, string, string>; logs: z.ZodEffects<z.ZodString, string, string>; temp: z.ZodEffects<z.ZodString, string, string>; snapshots: z.ZodEffects<z.ZodString, string, string>; artifacts: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; cache: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; }, "strict", z.ZodTypeAny, { snapshots: string; source: string; inputs: string; working: string; outputs: string; logs: string; temp: string; cache?: string | undefined; artifacts?: string | undefined; }, { snapshots: string; source: string; inputs: string; working: string; outputs: string; logs: string; temp: string; cache?: string | undefined; artifacts?: string | undefined; }>;
```

## `workspaceEventMetadataSchema`

Workspace Event Metadata 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceEventMetadataSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceEventMetadataSchema: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>;
```

## `workspaceEventPayloadExample`

Workspace Event Payload 的有效示例值。

- 种类: 常量
- 导入: `import { workspaceEventPayloadExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceEventPayloadExample: WorkspaceEventPayload;
```

## `workspaceEventPayloadJsonSchema`

Workspace Event Payload 的 JSON Schema。

- 种类: 常量
- 导入: `import { workspaceEventPayloadJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceEventPayloadJsonSchema: JsonSchema;
```

## `workspaceEventPayloadSchema`

Workspace Event Payload 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceEventPayloadSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const workspaceEventPayloadSchema: (typeof import('@codesoul-co/hypha-core'))['workspaceEventPayloadSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `workspaceMutationPolicySpecSchema`

Workspace Mutation Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceMutationPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceMutationPolicySpecSchema: z.ZodObject<{ requireSnapshotBeforeWrite: z.ZodOptional<z.ZodBoolean>; trackFileMutations: z.ZodOptional<z.ZodBoolean>; maxPatchBytes: z.ZodOptional<z.ZodNumber>; allowDelete: z.ZodOptional<z.ZodBoolean>; requireApprovalForDelete: z.ZodOptional<z.ZodBoolean>; preserveInputFiles: z.ZodOptional<z.ZodBoolean>; atomicWrite: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { requireSnapshotBeforeWrite?: boolean | undefined; trackFileMutations?: boolean | undefined; maxPatchBytes?: number | undefined; allowDelete?: boolean | undefined; requireApprovalForDelete?: boolean | undefined; preserveInputFiles?: boolean | undefined; atomicWrite?: boolean | undefined; }, { requireSnapshotBeforeWrite?: boolean | undefined; trackFileMutations?: boolean | undefined; maxPatchBytes?: number | undefined; allowDelete?: boolean | undefined; requireApprovalForDelete?: boolean | undefined; preserveInputFiles?: boolean | undefined; atomicWrite?: boolean | undefined; }>;
```

## `workspacePathPolicySpecSchema`

Workspace Path Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspacePathPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspacePathPolicySpecSchema: z.ZodEffects<z.ZodObject<{ readOnlyPaths: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>; writablePaths: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>; executablePaths: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>; deniedPaths: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>; allowSymlinks: z.ZodOptional<z.ZodBoolean>; allowHardLinks: z.ZodOptional<z.ZodBoolean>; followSymlinksForRead: z.ZodOptional<z.ZodBoolean>; allowHiddenFiles: z.ZodOptional<z.ZodBoolean>; maxPathLength: z.ZodOptional<z.ZodNumber>; allowedExtensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; deniedExtensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; caseSensitivity: z.ZodOptional<z.ZodEnum<["platform", "sensitive", "insensitive"]>>; }, "strict", z.ZodTypeAny, { readOnlyPaths?: string[] | undefined; writablePaths?: string[] | undefined; executablePaths?: string[] | undefined; deniedPaths?: string[] | undefined; allowSymlinks?: boolean | undefined; allowHardLinks?: boolean | undefined; followSymlinksForRead?: boolean | undefined; allowHiddenFiles?: boolean | undefined; maxPathLength?: number | undefined; allowedExtensions?: string[] | undefined; deniedExtensions?: string[] | undefined; caseSensitivity?: "platform" | "sensitive" | "insensitive" | undefined; }, { readOnlyPaths?: string[] | undefined; writablePaths?: string[] | undefined; executablePaths?: string[] | undefined; deniedPaths?: string[] | undefined; allowSymlinks?: boolean | undefined; allowHardLinks?: boolean | undefined; followSymlinksForRead?: boolean | undefined; allowHiddenFiles?: boolean | undefined; maxPathLength?: number | undefined; allowedExtensions?: string[] | undefined; deniedExtensions?: string[] | undefined; caseSensitivity?: "platform" | "sensitive" | "insensitive" | undefined; }>, { readOnlyPaths?: string[] | undefined; writablePaths?: string[] | undefined; executablePaths?: string[] | undefined; deniedPaths?: string[] | undefined; allowSymlinks?: boolean | undefined; allowHardLinks?: boolean | undefined; followSymlinksForRead?: boolean | undefined; allowHiddenFiles?: boolean | undefined; maxPathLength?: number | undefined; allowedExtensions?: string[] | undefined; deniedExtensions?: string[] | undefined; caseSensitivity?: "platform" | "sensitive" | "insensitive" | undefined; }, { readOnlyPaths?: string[] | undefined; writablePaths?: string[] | undefined; executablePaths?: string[] | undefined; deniedPaths?: string[] | undefined; allowSymlinks?: boolean | undefined; allowHardLinks?: boolean | undefined; followSymlinksForRead?: boolean | undefined; allowHiddenFiles?: boolean | undefined; maxPathLength?: number | undefined; allowedExtensions?: string[] | undefined; deniedExtensions?: string[] | undefined; caseSensitivity?: "platform" | "sensitive" | "insensitive" | undefined; }>;
```

## `workspaceQuotaSpecJsonSchema`

Workspace Quota Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { workspaceQuotaSpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceQuotaSpecJsonSchema: JsonSchema;
```

## `workspaceQuotaSpecSchema`

Workspace Quota Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceQuotaSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceQuotaSpecSchema: z.ZodObject<{ maxBytes: z.ZodOptional<z.ZodNumber>; maxFiles: z.ZodOptional<z.ZodNumber>; maxSingleFileBytes: z.ZodOptional<z.ZodNumber>; maxDirectoryDepth: z.ZodOptional<z.ZodNumber>; maxOpenFiles: z.ZodOptional<z.ZodNumber>; maxMutationCountPerExecution: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { maxBytes?: number | undefined; maxFiles?: number | undefined; maxSingleFileBytes?: number | undefined; maxDirectoryDepth?: number | undefined; maxOpenFiles?: number | undefined; maxMutationCountPerExecution?: number | undefined; }, { maxBytes?: number | undefined; maxFiles?: number | undefined; maxSingleFileBytes?: number | undefined; maxDirectoryDepth?: number | undefined; maxOpenFiles?: number | undefined; maxMutationCountPerExecution?: number | undefined; }>;
```

## `workspaceRecordExample`

Workspace Record 的有效示例值。

- 种类: 常量
- 导入: `import { workspaceRecordExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceRecordExample: WorkspaceRecord;
```

## `workspaceRecordJsonSchema`

Workspace Record 的 JSON Schema。

- 种类: 常量
- 导入: `import { workspaceRecordJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceRecordJsonSchema: JsonSchema;
```

## `workspaceRecordJsonSchemas`

由 `modules/workspace/index` 模块导出的 Workspace Record JSON Schemas 常量。

- 种类: 常量
- 导入: `import { workspaceRecordJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceRecordJsonSchemas: Record<string, JsonSchema>;
```

## `workspaceRecordSchema`

Workspace Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceRecordSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const workspaceRecordSchema: (typeof import('@codesoul-co/hypha-core'))['workspaceRecordSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `workspaceRelativePathSchema`

Workspace Relative Path 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceRelativePathSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceRelativePathSchema: z.ZodEffects<z.ZodString, string, string>;
```

## `workspaceSnapshotPolicySpecSchema`

Workspace Snapshot Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceSnapshotPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceSnapshotPolicySpecSchema: z.ZodObject<{ enabled: z.ZodBoolean; mode: z.ZodEnum<["full", "incremental", "manifest_only"]>; snapshotBeforeWrite: z.ZodOptional<z.ZodBoolean>; snapshotAfterExecution: z.ZodOptional<z.ZodBoolean>; snapshotOnFailure: z.ZodOptional<z.ZodBoolean>; maxSnapshots: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { mode: "full" | "incremental" | "manifest_only"; enabled: boolean; snapshotOnFailure?: boolean | undefined; snapshotBeforeWrite?: boolean | undefined; snapshotAfterExecution?: boolean | undefined; maxSnapshots?: number | undefined; }, { mode: "full" | "incremental" | "manifest_only"; enabled: boolean; snapshotOnFailure?: boolean | undefined; snapshotBeforeWrite?: boolean | undefined; snapshotAfterExecution?: boolean | undefined; maxSnapshots?: number | undefined; }>;
```

## `workspaceSpecDefinition`

Workspace Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { workspaceSpecDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceSpecDefinition: SpecSchemaDefinition<WorkspaceSpec>;
```

## `workspaceSpecDefinitions`

由 `modules/workspace/index` 模块导出的 Workspace Spec Definitions 常量。

- 种类: 常量
- 导入: `import { workspaceSpecDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceSpecDefinitions: readonly [SpecSchemaDefinition<WorkspaceSpec>];
```

## `workspaceSpecExample`

Workspace Spec 的有效示例值。

- 种类: 常量
- 导入: `import { workspaceSpecExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceSpecExample: WorkspaceSpec;
```

## `workspaceSpecJsonSchema`

Workspace Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { workspaceSpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceSpecJsonSchema: JsonSchema;
```

## `workspaceSpecJsonSchemas`

由 `modules/workspace/index` 模块导出的 Workspace Spec JSON Schemas 常量。

- 种类: 常量
- 导入: `import { workspaceSpecJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceSpecJsonSchemas: Record<string, JsonSchema>;
```

## `workspaceSpecSchema`

Workspace Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const workspaceSpecSchema: (typeof import('@codesoul-co/hypha-core'))['workspaceSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `workspaceStatusSchema`

Workspace Status 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceStatusSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceStatusSchema: z.ZodEnum<["creating", "ready", "busy", "snapshotting", "archiving", "archived", "cleaning", "cleaned", "failed"]>;
```

## `workspaceUsageJsonSchema`

Workspace Usage 的 JSON Schema。

- 种类: 常量
- 导入: `import { workspaceUsageJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceUsageJsonSchema: JsonSchema;
```

## `workspaceUsageSchema`

Workspace Usage 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceUsageSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare const workspaceUsageSchema: z.ZodObject<{ bytes: z.ZodNumber; files: z.ZodNumber; directories: z.ZodOptional<z.ZodNumber>; lastCalculatedAt: z.ZodString; }, "strict", z.ZodTypeAny, { bytes: number; files: number; lastCalculatedAt: string; directories?: number | undefined; }, { bytes: number; files: number; lastCalculatedAt: string; directories?: number | undefined; }>;
```

## `validateWorkspaceEventPayload`

Validate Workspace Event Payload 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceEventPayload } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare function validateWorkspaceEventPayload(input: unknown): WorkspaceEventPayload;
```

### 调用签名

```text
validateWorkspaceEventPayload(input: unknown): WorkspaceEventPayload
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceEventPayload`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceRecord`

Validate Workspace Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare function validateWorkspaceRecord(input: unknown): WorkspaceRecord;
```

### 调用签名

```text
validateWorkspaceRecord(input: unknown): WorkspaceRecord
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceRecord`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceSpec`

Validate Workspace Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### 声明

```text
export declare function validateWorkspaceSpec(input: unknown): WorkspaceSpec;
```

### 调用签名

```text
validateWorkspaceSpec(input: unknown): WorkspaceSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceSpec`
- 说明: 返回值契约由上述类型定义。
