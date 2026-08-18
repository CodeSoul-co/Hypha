# `@codesoul-co/hypha-core` / `modules/workspace/operations`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/workspace/operations.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)
- 导出数: **28**

## 模块用法

用于声明并实施 Workspace 作用域边界。Operations 模块公开 18 常量、10 函数。

### 从包入口导入

```ts
import {
  fileMutationJsonSchema,
  fileMutationSchema,
  principalJsonSchema,
  relativePathJsonSchema,
  resolvedWorkspacePathSchema,
  workspaceDeleteRequestExample,
  workspaceDeleteRequestSchema,
  workspaceFileEntrySchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 10 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 18 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { fileMutationSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = fileMutationSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fileMutationJsonSchema` | 常量 | <code>const fileMutationJsonSchema: JsonSchema</code> | File Mutation 的 JSON Schema。 |
| `fileMutationSchema` | 常量 | <code>const fileMutationSchema: z.ZodObject&lt;{ path: z.ZodEffects&lt;z.ZodString, string, string&gt;; operation: z.ZodEnum&lt;["created", "modified", "deleted", "renamed", "permission_changed"]&gt;; beforeHash: z.ZodOptional&lt;z.ZodString&gt;; afterHash: z.ZodOptional&lt;z.ZodString&gt;; beforeSizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; afterSizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; artifactRef: z.ZodOptional&lt;z.ZodString&gt;; oldPath: z.ZodOptional&lt;z.Zod...</code> | File Mutation 的运行时 Schema。 |
| `principalJsonSchema` | 常量 | <code>const principalJsonSchema: JsonSchema</code> | Principal 的 JSON Schema。 |
| `relativePathJsonSchema` | 常量 | <code>const relativePathJsonSchema: JsonSchema</code> | Relative Path 的 JSON Schema。 |
| `resolvedWorkspacePathSchema` | 常量 | <code>const resolvedWorkspacePathSchema: z.ZodObject&lt;{ workspaceId: z.ZodString; relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; canonicalRelativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; pathRef: z.ZodString; exists: z.ZodBoolean; kind: z.ZodOptional&lt;z.ZodEnum&lt;["file", "directory", "symlink", "other"]&gt;&gt;; permissions: z.ZodArray&lt;z.ZodEnum&lt;["read", "write", "execute", "delete"]&gt;, "many"&gt;; contentHash: z.Z...</code> | Resolved Workspace Path 的运行时 Schema。 |
| `workspaceDeleteRequestExample` | 常量 | <code>const workspaceDeleteRequestExample: WorkspaceDeleteRequest</code> | Workspace Delete Request 的有效示例值。 |
| `workspaceDeleteRequestSchema` | 常量 | <code>const workspaceDeleteRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString,...</code> | Workspace Delete Request 的运行时 Schema。 |
| `workspaceFileEntrySchema` | 常量 | <code>const workspaceFileEntrySchema: z.ZodObject&lt;{ relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; kind: z.ZodEnum&lt;["file", "directory", "symlink", "other"]&gt;; sizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; contentHash: z.ZodOptional&lt;z.ZodString&gt;; modifiedAt: z.ZodOptional&lt;z.ZodString&gt;; permissions: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["read", "write", "execute", "delete"]&gt;, "many"&gt;&gt;; }, "strict", z.ZodTypeAny, { kind: ...</code> | Workspace File Entry 的运行时 Schema。 |
| `workspaceListRequestSchema` | 常量 | <code>const workspaceListRequestSchema: z.ZodObject&lt;{ workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOpt...</code> | Workspace List Request 的运行时 Schema。 |
| `workspaceOperationJsonSchemas` | 常量 | <code>const workspaceOperationJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/workspace/operations` 模块导出的 Workspace Operation JSON Schemas 常量。 |
| `workspaceOperationPrincipalExample` | 常量 | <code>const workspaceOperationPrincipalExample: ExecutionPrincipal</code> | Workspace Operation Principal 的有效示例值。 |
| `workspacePathRequestSchema` | 常量 | <code>const workspacePathRequestSchema: z.ZodObject&lt;{ workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOpt...</code> | Workspace Path Request 的运行时 Schema。 |
| `workspaceReadRequestSchema` | 常量 | <code>const workspaceReadRequestSchema: z.ZodObject&lt;{ workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOpt...</code> | Workspace Read Request 的运行时 Schema。 |
| `workspaceReadResultSchema` | 常量 | <code>const workspaceReadResultSchema: z.ZodObject&lt;{ relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; encoding: z.ZodEnum&lt;["utf8", "base64"]&gt;; content: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; truncated: z.ZodOptional&lt;z.ZodBoolean&gt;; nextOffset: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodTypeAny, { contentHash: string; sizeBytes: number; content: string; relativePath: string; encoding: "u...</code> | Workspace Read Result 的运行时 Schema。 |
| `workspaceWriteRequestExample` | 常量 | <code>const workspaceWriteRequestExample: WorkspaceWriteRequest</code> | Workspace Write Request 的有效示例值。 |
| `workspaceWriteRequestSchema` | 常量 | <code>const workspaceWriteRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;...</code> | Workspace Write Request 的运行时 Schema。 |
| `workspaceWriteResultExample` | 常量 | <code>const workspaceWriteResultExample: WorkspaceWriteResult</code> | Workspace Write Result 的有效示例值。 |
| `workspaceWriteResultSchema` | 常量 | <code>const workspaceWriteResultSchema: z.ZodObject&lt;{ relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; beforeHash: z.ZodOptional&lt;z.ZodString&gt;; afterHash: z.ZodString; sizeBytes: z.ZodNumber; mutation: z.ZodObject&lt;{ path: z.ZodEffects&lt;z.ZodString, string, string&gt;; operation: z.ZodEnum&lt;["created", "modified", "deleted", "renamed", "permission_changed"]&gt;; beforeHash: z.ZodOptional&lt;z.ZodString&gt;; afterHash: z.ZodOpti...</code> | Workspace Write Result 的运行时 Schema。 |
| `validateFileMutation` | 函数 | <code>validateFileMutation(input: unknown): FileMutation</code> | Validate File Mutation 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateResolvedWorkspacePath` | 函数 | <code>validateResolvedWorkspacePath(input: unknown): ResolvedWorkspacePath</code> | Validate Resolved Workspace Path 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceDeleteRequest` | 函数 | <code>validateWorkspaceDeleteRequest(input: unknown): WorkspaceDeleteRequest</code> | Validate Workspace Delete Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceFileEntry` | 函数 | <code>validateWorkspaceFileEntry(input: unknown): WorkspaceFileEntry</code> | Validate Workspace File Entry 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceListRequest` | 函数 | <code>validateWorkspaceListRequest(input: unknown): WorkspaceListRequest</code> | Validate Workspace List Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspacePathRequest` | 函数 | <code>validateWorkspacePathRequest(input: unknown): WorkspacePathRequest</code> | Validate Workspace Path Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceReadRequest` | 函数 | <code>validateWorkspaceReadRequest(input: unknown): WorkspaceReadRequest</code> | Validate Workspace Read Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceReadResult` | 函数 | <code>validateWorkspaceReadResult(input: unknown): WorkspaceReadResult</code> | Validate Workspace Read Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceWriteRequest` | 函数 | <code>validateWorkspaceWriteRequest(input: unknown): WorkspaceWriteRequest</code> | Validate Workspace Write Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceWriteResult` | 函数 | <code>validateWorkspaceWriteResult(input: unknown): WorkspaceWriteResult</code> | Validate Workspace Write Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `fileMutationJsonSchema`

File Mutation 的 JSON Schema。

- 种类: 常量
- 导入: `import { fileMutationJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const fileMutationJsonSchema: JsonSchema;
```

## `fileMutationSchema`

File Mutation 的运行时 Schema。

- 种类: 常量
- 导入: `import { fileMutationSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const fileMutationSchema: z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; operation: z.ZodEnum<["created", "modified", "deleted", "renamed", "permission_changed"]>; beforeHash: z.ZodOptional<z.ZodString>; afterHash: z.ZodOptional<z.ZodString>; beforeSizeBytes: z.ZodOptional<z.ZodNumber>; afterSizeBytes: z.ZodOptional<z.ZodNumber>; artifactRef: z.ZodOptional<z.ZodString>; oldPath: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; detectedAt: z.ZodString; }, "strict", z.ZodTypeAny, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }>;
```

## `principalJsonSchema`

Principal 的 JSON Schema。

- 种类: 常量
- 导入: `import { principalJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const principalJsonSchema: JsonSchema;
```

## `relativePathJsonSchema`

Relative Path 的 JSON Schema。

- 种类: 常量
- 导入: `import { relativePathJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const relativePathJsonSchema: JsonSchema;
```

## `resolvedWorkspacePathSchema`

Resolved Workspace Path 的运行时 Schema。

- 种类: 常量
- 导入: `import { resolvedWorkspacePathSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const resolvedWorkspacePathSchema: z.ZodObject<{ workspaceId: z.ZodString; relativePath: z.ZodEffects<z.ZodString, string, string>; canonicalRelativePath: z.ZodEffects<z.ZodString, string, string>; pathRef: z.ZodString; exists: z.ZodBoolean; kind: z.ZodOptional<z.ZodEnum<["file", "directory", "symlink", "other"]>>; permissions: z.ZodArray<z.ZodEnum<["read", "write", "execute", "delete"]>, "many">; contentHash: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { workspaceId: string; relativePath: string; canonicalRelativePath: string; pathRef: string; exists: boolean; permissions: ("read" | "write" | "execute" | "delete")[]; contentHash?: string | undefined; kind?: "file" | "directory" | "symlink" | "other" | undefined; }, { workspaceId: string; relativePath: string; canonicalRelativePath: string; pathRef: string; exists: boolean; permissions: ("read" | "write" | "execute" | "delete")[]; contentHash?: string | undefined; kind?: "file" | "directory" | "symlink" | "other" | undefined; }>;
```

## `workspaceDeleteRequestExample`

Workspace Delete Request 的有效示例值。

- 种类: 常量
- 导入: `import { workspaceDeleteRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const workspaceDeleteRequestExample: WorkspaceDeleteRequest;
```

## `workspaceDeleteRequestSchema`

Workspace Delete Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceDeleteRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const workspaceDeleteRequestSchema: z.ZodObject<{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; relativePath: z.ZodEffects<z.ZodString, string, string>; recursive: z.ZodOptional<z.ZodBoolean>; expectedContentHash: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; relativePath: string; idempotencyKey?: string | undefined; recursive?: boolean | undefined; expectedContentHash?: string | undefined; }, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; relativePath: string; idempotencyKey?: string | undefined; recursive?: boolean | undefined; expectedContentHash?: string | undefined; }>;
```

## `workspaceFileEntrySchema`

Workspace File Entry 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceFileEntrySchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const workspaceFileEntrySchema: z.ZodObject<{ relativePath: z.ZodEffects<z.ZodString, string, string>; kind: z.ZodEnum<["file", "directory", "symlink", "other"]>; sizeBytes: z.ZodOptional<z.ZodNumber>; contentHash: z.ZodOptional<z.ZodString>; modifiedAt: z.ZodOptional<z.ZodString>; permissions: z.ZodOptional<z.ZodArray<z.ZodEnum<["read", "write", "execute", "delete"]>, "many">>; }, "strict", z.ZodTypeAny, { kind: "file" | "directory" | "symlink" | "other"; relativePath: string; contentHash?: string | undefined; sizeBytes?: number | undefined; permissions?: ("read" | "write" | "execute" | "delete")[] | undefined; modifiedAt?: string | undefined; }, { kind: "file" | "directory" | "symlink" | "other"; relativePath: string; contentHash?: string | undefined; sizeBytes?: number | undefined; permissions?: ("read" | "write" | "execute" | "delete")[] | undefined; modifiedAt?: string | undefined; }>;
```

## `workspaceListRequestSchema`

Workspace List Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceListRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const workspaceListRequestSchema: z.ZodObject<{ workspaceId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; relativePath: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; recursive: z.ZodOptional<z.ZodBoolean>; includeHidden: z.ZodOptional<z.ZodBoolean>; maxEntries: z.ZodOptional<z.ZodNumber>; cursor: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; cursor?: string | undefined; relativePath?: string | undefined; recursive?: boolean | undefined; includeHidden?: boolean | undefined; maxEntries?: number | undefined; }, { workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; cursor?: string | undefined; relativePath?: string | undefined; recursive?: boolean | undefined; includeHidden?: boolean | undefined; maxEntries?: number | undefined; }>;
```

## `workspaceOperationJsonSchemas`

由 `modules/workspace/operations` 模块导出的 Workspace Operation JSON Schemas 常量。

- 种类: 常量
- 导入: `import { workspaceOperationJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const workspaceOperationJsonSchemas: Record<string, JsonSchema>;
```

## `workspaceOperationPrincipalExample`

Workspace Operation Principal 的有效示例值。

- 种类: 常量
- 导入: `import { workspaceOperationPrincipalExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const workspaceOperationPrincipalExample: ExecutionPrincipal;
```

## `workspacePathRequestSchema`

Workspace Path Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspacePathRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const workspacePathRequestSchema: z.ZodObject<{ workspaceId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; relativePath: z.ZodEffects<z.ZodString, string, string>; operation: z.ZodEnum<["read", "write", "execute", "delete", "list"]>; allowMissing: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; operation: "read" | "list" | "write" | "execute" | "delete"; relativePath: string; allowMissing?: boolean | undefined; }, { workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; operation: "read" | "list" | "write" | "execute" | "delete"; relativePath: string; allowMissing?: boolean | undefined; }>;
```

## `workspaceReadRequestSchema`

Workspace Read Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceReadRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const workspaceReadRequestSchema: z.ZodObject<{ workspaceId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; relativePath: z.ZodEffects<z.ZodString, string, string>; encoding: z.ZodOptional<z.ZodEnum<["utf8", "base64"]>>; offset: z.ZodOptional<z.ZodNumber>; length: z.ZodOptional<z.ZodNumber>; maxBytes: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; relativePath: string; length?: number | undefined; offset?: number | undefined; maxBytes?: number | undefined; encoding?: "utf8" | "base64" | undefined; }, { workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; relativePath: string; length?: number | undefined; offset?: number | undefined; maxBytes?: number | undefined; encoding?: "utf8" | "base64" | undefined; }>;
```

## `workspaceReadResultSchema`

Workspace Read Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceReadResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const workspaceReadResultSchema: z.ZodObject<{ relativePath: z.ZodEffects<z.ZodString, string, string>; encoding: z.ZodEnum<["utf8", "base64"]>; content: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; truncated: z.ZodOptional<z.ZodBoolean>; nextOffset: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { contentHash: string; sizeBytes: number; content: string; relativePath: string; encoding: "utf8" | "base64"; truncated?: boolean | undefined; nextOffset?: number | undefined; }, { contentHash: string; sizeBytes: number; content: string; relativePath: string; encoding: "utf8" | "base64"; truncated?: boolean | undefined; nextOffset?: number | undefined; }>;
```

## `workspaceWriteRequestExample`

Workspace Write Request 的有效示例值。

- 种类: 常量
- 导入: `import { workspaceWriteRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const workspaceWriteRequestExample: WorkspaceWriteRequest;
```

## `workspaceWriteRequestSchema`

Workspace Write Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceWriteRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const workspaceWriteRequestSchema: (typeof import('@codesoul-co/hypha-core'))['workspaceWriteRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `workspaceWriteResultExample`

Workspace Write Result 的有效示例值。

- 种类: 常量
- 导入: `import { workspaceWriteResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const workspaceWriteResultExample: WorkspaceWriteResult;
```

## `workspaceWriteResultSchema`

Workspace Write Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceWriteResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare const workspaceWriteResultSchema: z.ZodObject<{ relativePath: z.ZodEffects<z.ZodString, string, string>; beforeHash: z.ZodOptional<z.ZodString>; afterHash: z.ZodString; sizeBytes: z.ZodNumber; mutation: z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; operation: z.ZodEnum<["created", "modified", "deleted", "renamed", "permission_changed"]>; beforeHash: z.ZodOptional<z.ZodString>; afterHash: z.ZodOptional<z.ZodString>; beforeSizeBytes: z.ZodOptional<z.ZodNumber>; afterSizeBytes: z.ZodOptional<z.ZodNumber>; artifactRef: z.ZodOptional<z.ZodString>; oldPath: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; detectedAt: z.ZodString; }, "strict", z.ZodTypeAny, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }>; artifactRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sizeBytes: number; mutation: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }; relativePath: string; afterHash: string; artifactRef?: string | undefined; beforeHash?: string | undefined; }, { sizeBytes: number; mutation: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }; relativePath: string; afterHash: string; artifactRef?: string | undefined; beforeHash?: string | undefined; }>;
```

## `validateFileMutation`

Validate File Mutation 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateFileMutation } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare function validateFileMutation(input: unknown): FileMutation;
```

### 调用签名

```text
validateFileMutation(input: unknown): FileMutation
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FileMutation`
- 说明: 返回值契约由上述类型定义。

## `validateResolvedWorkspacePath`

Validate Resolved Workspace Path 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateResolvedWorkspacePath } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare function validateResolvedWorkspacePath(input: unknown): ResolvedWorkspacePath;
```

### 调用签名

```text
validateResolvedWorkspacePath(input: unknown): ResolvedWorkspacePath
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ResolvedWorkspacePath`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceDeleteRequest`

Validate Workspace Delete Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceDeleteRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare function validateWorkspaceDeleteRequest(input: unknown): WorkspaceDeleteRequest;
```

### 调用签名

```text
validateWorkspaceDeleteRequest(input: unknown): WorkspaceDeleteRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceDeleteRequest`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceFileEntry`

Validate Workspace File Entry 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceFileEntry } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare function validateWorkspaceFileEntry(input: unknown): WorkspaceFileEntry;
```

### 调用签名

```text
validateWorkspaceFileEntry(input: unknown): WorkspaceFileEntry
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceFileEntry`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceListRequest`

Validate Workspace List Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceListRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare function validateWorkspaceListRequest(input: unknown): WorkspaceListRequest;
```

### 调用签名

```text
validateWorkspaceListRequest(input: unknown): WorkspaceListRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceListRequest`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspacePathRequest`

Validate Workspace Path Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspacePathRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare function validateWorkspacePathRequest(input: unknown): WorkspacePathRequest;
```

### 调用签名

```text
validateWorkspacePathRequest(input: unknown): WorkspacePathRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspacePathRequest`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceReadRequest`

Validate Workspace Read Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceReadRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare function validateWorkspaceReadRequest(input: unknown): WorkspaceReadRequest;
```

### 调用签名

```text
validateWorkspaceReadRequest(input: unknown): WorkspaceReadRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceReadRequest`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceReadResult`

Validate Workspace Read Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceReadResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare function validateWorkspaceReadResult(input: unknown): WorkspaceReadResult;
```

### 调用签名

```text
validateWorkspaceReadResult(input: unknown): WorkspaceReadResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceReadResult`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceWriteRequest`

Validate Workspace Write Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceWriteRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare function validateWorkspaceWriteRequest(input: unknown): WorkspaceWriteRequest;
```

### 调用签名

```text
validateWorkspaceWriteRequest(input: unknown): WorkspaceWriteRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceWriteRequest`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceWriteResult`

Validate Workspace Write Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceWriteResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### 声明

```text
export declare function validateWorkspaceWriteResult(input: unknown): WorkspaceWriteResult;
```

### 调用签名

```text
validateWorkspaceWriteResult(input: unknown): WorkspaceWriteResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceWriteResult`
- 说明: 返回值契约由上述类型定义。
