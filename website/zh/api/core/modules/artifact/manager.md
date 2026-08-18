# `@codesoul-co/hypha-core` / `modules/artifact/manager`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/artifact/manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)
- 导出数: **43**

## 模块用法

用于使用该功能边界的公共契约与操作。Manager 模块公开 31 常量、12 函数。

### 从包入口导入

```ts
import {
  artifactCreateDownloadAccessRequestExample,
  artifactCreateDownloadAccessRequestJsonSchema,
  artifactCreateDownloadAccessRequestSchema,
  artifactCreateRequestExample,
  artifactCreateRequestJsonSchema,
  artifactCreateRequestSchema,
  artifactFromWorkspaceRequestExample,
  artifactFromWorkspaceRequestJsonSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 12 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 31 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { artifactCreateDownloadAccessRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = artifactCreateDownloadAccessRequestSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactCreateDownloadAccessRequestExample` | 常量 | <code>const artifactCreateDownloadAccessRequestExample: ArtifactCreateDownloadAccessRequest</code> | Artifact Create Download Access Request 的有效示例值。 |
| `artifactCreateDownloadAccessRequestJsonSchema` | 常量 | <code>const artifactCreateDownloadAccessRequestJsonSchema: JsonSchema</code> | Artifact Create Download Access Request 的 JSON Schema。 |
| `artifactCreateDownloadAccessRequestSchema` | 常量 | <code>const artifactCreateDownloadAccessRequestSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.Zod...</code> | Artifact Create Download Access Request 的运行时 Schema。 |
| `artifactCreateRequestExample` | 常量 | <code>const artifactCreateRequestExample: ArtifactCreateRequest</code> | Artifact Create Request 的有效示例值。 |
| `artifactCreateRequestJsonSchema` | 常量 | <code>const artifactCreateRequestJsonSchema: JsonSchema</code> | Artifact Create Request 的 JSON Schema。 |
| `artifactCreateRequestSchema` | 常量 | <code>const artifactCreateRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; meta...</code> | Artifact Create Request 的运行时 Schema。 |
| `artifactFromWorkspaceRequestExample` | 常量 | <code>const artifactFromWorkspaceRequestExample: ArtifactFromWorkspaceRequest</code> | Artifact From Workspace Request 的有效示例值。 |
| `artifactFromWorkspaceRequestJsonSchema` | 常量 | <code>const artifactFromWorkspaceRequestJsonSchema: JsonSchema</code> | Artifact From Workspace Request 的 JSON Schema。 |
| `artifactFromWorkspaceRequestSchema` | 常量 | <code>const artifactFromWorkspaceRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"...</code> | Artifact From Workspace Request 的运行时 Schema。 |
| `artifactGetRecordRequestJsonSchema` | 常量 | <code>const artifactGetRecordRequestJsonSchema: JsonSchema</code> | Artifact Get Record Request 的 JSON Schema。 |
| `artifactGetRecordRequestSchema` | 常量 | <code>const artifactGetRecordRequestSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.Zo...</code> | Artifact Get Record Request 的运行时 Schema。 |
| `artifactLatestRequestJsonSchema` | 常量 | <code>const artifactLatestRequestJsonSchema: JsonSchema</code> | Artifact Latest Request 的 JSON Schema。 |
| `artifactLatestRequestSchema` | 常量 | <code>const artifactLatestRequestSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodSt...</code> | Artifact Latest Request 的运行时 Schema。 |
| `artifactListRequestJsonSchema` | 常量 | <code>const artifactListRequestJsonSchema: JsonSchema</code> | Artifact List Request 的 JSON Schema。 |
| `artifactListRequestSchema` | 常量 | <code>const artifactListRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRec...</code> | Artifact List Request 的运行时 Schema。 |
| `artifactManagerContractJsonSchemas` | 常量 | <code>const artifactManagerContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/artifact/manager` 模块导出的 Artifact Manager Contract JSON Schemas 常量。 |
| `artifactMutationRequestJsonSchema` | 常量 | <code>const artifactMutationRequestJsonSchema: JsonSchema</code> | Artifact Mutation Request 的 JSON Schema。 |
| `artifactMutationRequestSchema` | 常量 | <code>const artifactMutationRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.Zod...</code> | Artifact Mutation Request 的运行时 Schema。 |
| `artifactPreviousRequestJsonSchema` | 常量 | <code>const artifactPreviousRequestJsonSchema: JsonSchema</code> | Artifact Previous Request 的 JSON Schema。 |
| `artifactPreviousRequestSchema` | 常量 | <code>const artifactPreviousRequestSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.Zod...</code> | Artifact Previous Request 的运行时 Schema。 |
| `artifactReadRequestJsonSchema` | 常量 | <code>const artifactReadRequestJsonSchema: JsonSchema</code> | Artifact Read Request 的 JSON Schema。 |
| `artifactReadRequestSchema` | 常量 | <code>const artifactReadRequestSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodStri...</code> | Artifact Read Request 的运行时 Schema。 |
| `artifactReadResultJsonSchema` | 常量 | <code>const artifactReadResultJsonSchema: JsonSchema</code> | Artifact Read Result 的 JSON Schema。 |
| `artifactReadResultSchema` | 常量 | <code>const artifactReadResultSchema: z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; versionNumber: z.ZodNumber; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; sessionId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodString; description: z.ZodOptional&lt;z....</code> | Artifact Read Result 的运行时 Schema。 |
| `artifactTraceLineageRequestJsonSchema` | 常量 | <code>const artifactTraceLineageRequestJsonSchema: JsonSchema</code> | Artifact Trace Lineage Request 的 JSON Schema。 |
| `artifactTraceLineageRequestSchema` | 常量 | <code>const artifactTraceLineageRequestSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z...</code> | Artifact Trace Lineage Request 的运行时 Schema。 |
| `artifactVersionRequestExample` | 常量 | <code>const artifactVersionRequestExample: ArtifactVersionRequest</code> | Artifact Version Request 的有效示例值。 |
| `artifactVersionRequestJsonSchema` | 常量 | <code>const artifactVersionRequestJsonSchema: JsonSchema</code> | Artifact Version Request 的 JSON Schema。 |
| `artifactVersionRequestSchema` | 常量 | <code>const artifactVersionRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodO...</code> | Artifact Version Request 的运行时 Schema。 |
| `normalizedArtifactErrorJsonSchema` | 常量 | <code>const normalizedArtifactErrorJsonSchema: JsonSchema</code> | Normalized Artifact Error 的 JSON Schema。 |
| `normalizedArtifactErrorSchema` | 常量 | <code>const normalizedArtifactErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["ARTIFACT_INVALID_INPUT", "ARTIFACT_NOT_FOUND", "ARTIFACT_PERMISSION_DENIED", "ARTIFACT_TOO_LARGE", "ARTIFACT_TYPE_DENIED", "ARTIFACT_HASH_MISMATCH", "ARTIFACT_VERSION_CONFLICT", "ARTIFACT_STORE_UNAVAILABLE", "ARTIFACT_UPLOAD_FAILED", "ARTIFACT_DOWNLOAD_FAILED", "ARTIFACT_DELETE_BLOCKED", "ARTIFACT_DELETE_PARTIAL", "ARTIFACT_VALIDATION_FAILED", "A...</code> | Normalized Artifact Error 的运行时 Schema。 |
| `validateArtifactCreateDownloadAccessRequest` | 函数 | <code>validateArtifactCreateDownloadAccessRequest(input: unknown): ArtifactCreateDownloadAccessRequest</code> | Validate Artifact Create Download Access Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactCreateRequest` | 函数 | <code>validateArtifactCreateRequest(input: unknown): ArtifactCreateRequest</code> | Validate Artifact Create Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactFromWorkspaceRequest` | 函数 | <code>validateArtifactFromWorkspaceRequest(input: unknown): ArtifactFromWorkspaceRequest</code> | Validate Artifact From Workspace Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactGetRecordRequest` | 函数 | <code>validateArtifactGetRecordRequest(input: unknown): ArtifactGetRecordRequest</code> | Validate Artifact Get Record Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactLatestRequest` | 函数 | <code>validateArtifactLatestRequest(input: unknown): ArtifactLatestRequest</code> | Validate Artifact Latest Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactListRequest` | 函数 | <code>validateArtifactListRequest(input: unknown): ArtifactListRequest</code> | Validate Artifact List Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactMutationRequest` | 函数 | <code>validateArtifactMutationRequest(input: unknown): ArtifactMutationRequest</code> | Validate Artifact Mutation Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactPreviousRequest` | 函数 | <code>validateArtifactPreviousRequest(input: unknown): ArtifactPreviousRequest</code> | Validate Artifact Previous Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactReadRequest` | 函数 | <code>validateArtifactReadRequest(input: unknown): ArtifactReadRequest</code> | Validate Artifact Read Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactTraceLineageRequest` | 函数 | <code>validateArtifactTraceLineageRequest(input: unknown): ArtifactTraceLineageRequest</code> | Validate Artifact Trace Lineage Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactVersionRequest` | 函数 | <code>validateArtifactVersionRequest(input: unknown): ArtifactVersionRequest</code> | Validate Artifact Version Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateNormalizedArtifactError` | 函数 | <code>validateNormalizedArtifactError(input: unknown): NormalizedArtifactError</code> | Validate Normalized Artifact Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `artifactCreateDownloadAccessRequestExample`

Artifact Create Download Access Request 的有效示例值。

- 种类: 常量
- 导入: `import { artifactCreateDownloadAccessRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactCreateDownloadAccessRequestExample: ArtifactCreateDownloadAccessRequest;
```

## `artifactCreateDownloadAccessRequestJsonSchema`

Artifact Create Download Access Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactCreateDownloadAccessRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactCreateDownloadAccessRequestJsonSchema: JsonSchema;
```

## `artifactCreateDownloadAccessRequestSchema`

Artifact Create Download Access Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactCreateDownloadAccessRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactCreateDownloadAccessRequestSchema: z.ZodObject<{ principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; artifactId: z.ZodString; versionId: z.ZodOptional<z.ZodString>; } & { operationId: z.ZodString; expiresInSeconds: z.ZodOptional<z.ZodNumber>; responseMimeType: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; responseFilename: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; versionId?: string | undefined; expiresInSeconds?: number | undefined; responseMimeType?: string | undefined; responseFilename?: string | undefined; }, { operationId: string; artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; versionId?: string | undefined; expiresInSeconds?: number | undefined; responseMimeType?: string | undefined; responseFilename?: string | undefined; }>;
```

## `artifactCreateRequestExample`

Artifact Create Request 的有效示例值。

- 种类: 常量
- 导入: `import { artifactCreateRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactCreateRequestExample: ArtifactCreateRequest;
```

## `artifactCreateRequestJsonSchema`

Artifact Create Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactCreateRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactCreateRequestJsonSchema: JsonSchema;
```

## `artifactCreateRequestSchema`

Artifact Create Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactCreateRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const artifactCreateRequestSchema: (typeof import('@codesoul-co/hypha-core'))['artifactCreateRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `artifactFromWorkspaceRequestExample`

Artifact From Workspace Request 的有效示例值。

- 种类: 常量
- 导入: `import { artifactFromWorkspaceRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactFromWorkspaceRequestExample: ArtifactFromWorkspaceRequest;
```

## `artifactFromWorkspaceRequestJsonSchema`

Artifact From Workspace Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactFromWorkspaceRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactFromWorkspaceRequestJsonSchema: JsonSchema;
```

## `artifactFromWorkspaceRequestSchema`

Artifact From Workspace Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactFromWorkspaceRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const artifactFromWorkspaceRequestSchema: (typeof import('@codesoul-co/hypha-core'))['artifactFromWorkspaceRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `artifactGetRecordRequestJsonSchema`

Artifact Get Record Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactGetRecordRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactGetRecordRequestJsonSchema: JsonSchema;
```

## `artifactGetRecordRequestSchema`

Artifact Get Record Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactGetRecordRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactGetRecordRequestSchema: z.ZodObject<{ principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; artifactId: z.ZodString; versionId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; versionId?: string | undefined; }, { artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; versionId?: string | undefined; }>;
```

## `artifactLatestRequestJsonSchema`

Artifact Latest Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactLatestRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactLatestRequestJsonSchema: JsonSchema;
```

## `artifactLatestRequestSchema`

Artifact Latest Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactLatestRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactLatestRequestSchema: z.ZodObject<{ principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; logicalArtifactId: z.ZodString; }, "strict", z.ZodTypeAny, { logicalArtifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }, { logicalArtifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }>;
```

## `artifactListRequestJsonSchema`

Artifact List Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactListRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactListRequestJsonSchema: JsonSchema;
```

## `artifactListRequestSchema`

Artifact List Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactListRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const artifactListRequestSchema: (typeof import('@codesoul-co/hypha-core'))['artifactListRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `artifactManagerContractJsonSchemas`

由 `modules/artifact/manager` 模块导出的 Artifact Manager Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { artifactManagerContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactManagerContractJsonSchemas: Record<string, JsonSchema>;
```

## `artifactMutationRequestJsonSchema`

Artifact Mutation Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactMutationRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactMutationRequestJsonSchema: JsonSchema;
```

## `artifactMutationRequestSchema`

Artifact Mutation Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactMutationRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactMutationRequestSchema: z.ZodObject<{ operationId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; artifactId: z.ZodString; expectedRevision: z.ZodNumber; reason: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; idempotencyKey?: string | undefined; }, { operationId: string; artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; idempotencyKey?: string | undefined; }>;
```

## `artifactPreviousRequestJsonSchema`

Artifact Previous Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactPreviousRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactPreviousRequestJsonSchema: JsonSchema;
```

## `artifactPreviousRequestSchema`

Artifact Previous Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactPreviousRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactPreviousRequestSchema: z.ZodObject<{ principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; versionId: z.ZodString; }, "strict", z.ZodTypeAny, { versionId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }, { versionId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }>;
```

## `artifactReadRequestJsonSchema`

Artifact Read Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactReadRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactReadRequestJsonSchema: JsonSchema;
```

## `artifactReadRequestSchema`

Artifact Read Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactReadRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactReadRequestSchema: z.ZodObject<{ principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; artifactId: z.ZodString; versionId: z.ZodOptional<z.ZodString>; } & { range: z.ZodOptional<z.ZodEffects<z.ZodObject<{ start: z.ZodNumber; endInclusive: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>>; expectedContentHash: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; versionId?: string | undefined; expectedContentHash?: string | undefined; range?: { start: number; endInclusive?: number | undefined; } | undefined; }, { artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; versionId?: string | undefined; expectedContentHash?: string | undefined; range?: { start: number; endInclusive?: number | undefined; } | undefined; }>;
```

## `artifactReadResultJsonSchema`

Artifact Read Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactReadResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactReadResultJsonSchema: JsonSchema;
```

## `artifactReadResultSchema`

Artifact Read Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactReadResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const artifactReadResultSchema: (typeof import('@codesoul-co/hypha-core'))['artifactReadResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `artifactTraceLineageRequestJsonSchema`

Artifact Trace Lineage Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactTraceLineageRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactTraceLineageRequestJsonSchema: JsonSchema;
```

## `artifactTraceLineageRequestSchema`

Artifact Trace Lineage Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactTraceLineageRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactTraceLineageRequestSchema: z.ZodObject<{ principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; artifactId: z.ZodString; }, "strict", z.ZodTypeAny, { artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }, { artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }>;
```

## `artifactVersionRequestExample`

Artifact Version Request 的有效示例值。

- 种类: 常量
- 导入: `import { artifactVersionRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactVersionRequestExample: ArtifactVersionRequest;
```

## `artifactVersionRequestJsonSchema`

Artifact Version Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactVersionRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const artifactVersionRequestJsonSchema: JsonSchema;
```

## `artifactVersionRequestSchema`

Artifact Version Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactVersionRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const artifactVersionRequestSchema: (typeof import('@codesoul-co/hypha-core'))['artifactVersionRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `normalizedArtifactErrorJsonSchema`

Normalized Artifact Error 的 JSON Schema。

- 种类: 常量
- 导入: `import { normalizedArtifactErrorJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const normalizedArtifactErrorJsonSchema: JsonSchema;
```

## `normalizedArtifactErrorSchema`

Normalized Artifact Error 的运行时 Schema。

- 种类: 常量
- 导入: `import { normalizedArtifactErrorSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare const normalizedArtifactErrorSchema: z.ZodObject<{ code: z.ZodEnum<["ARTIFACT_INVALID_INPUT", "ARTIFACT_NOT_FOUND", "ARTIFACT_PERMISSION_DENIED", "ARTIFACT_TOO_LARGE", "ARTIFACT_TYPE_DENIED", "ARTIFACT_HASH_MISMATCH", "ARTIFACT_VERSION_CONFLICT", "ARTIFACT_STORE_UNAVAILABLE", "ARTIFACT_UPLOAD_FAILED", "ARTIFACT_DOWNLOAD_FAILED", "ARTIFACT_DELETE_BLOCKED", "ARTIFACT_DELETE_PARTIAL", "ARTIFACT_VALIDATION_FAILED", "ARTIFACT_INTERNAL_ERROR"]>; message: z.ZodString; retryable: z.ZodBoolean; details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; causeRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { code: "ARTIFACT_INVALID_INPUT" | "ARTIFACT_NOT_FOUND" | "ARTIFACT_PERMISSION_DENIED" | "ARTIFACT_TOO_LARGE" | "ARTIFACT_TYPE_DENIED" | "ARTIFACT_HASH_MISMATCH" | "ARTIFACT_VERSION_CONFLICT" | "ARTIFACT_STORE_UNAVAILABLE" | "ARTIFACT_UPLOAD_FAILED" | "ARTIFACT_DOWNLOAD_FAILED" | "ARTIFACT_DELETE_BLOCKED" | "ARTIFACT_DELETE_PARTIAL" | "ARTIFACT_VALIDATION_FAILED" | "ARTIFACT_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, unknown> | undefined; causeRef?: string | undefined; }, { code: "ARTIFACT_INVALID_INPUT" | "ARTIFACT_NOT_FOUND" | "ARTIFACT_PERMISSION_DENIED" | "ARTIFACT_TOO_LARGE" | "ARTIFACT_TYPE_DENIED" | "ARTIFACT_HASH_MISMATCH" | "ARTIFACT_VERSION_CONFLICT" | "ARTIFACT_STORE_UNAVAILABLE" | "ARTIFACT_UPLOAD_FAILED" | "ARTIFACT_DOWNLOAD_FAILED" | "ARTIFACT_DELETE_BLOCKED" | "ARTIFACT_DELETE_PARTIAL" | "ARTIFACT_VALIDATION_FAILED" | "ARTIFACT_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, unknown> | undefined; causeRef?: string | undefined; }>;
```

## `validateArtifactCreateDownloadAccessRequest`

Validate Artifact Create Download Access Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactCreateDownloadAccessRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare function validateArtifactCreateDownloadAccessRequest(input: unknown): ArtifactCreateDownloadAccessRequest;
```

### 调用签名

```text
validateArtifactCreateDownloadAccessRequest(input: unknown): ArtifactCreateDownloadAccessRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactCreateDownloadAccessRequest`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactCreateRequest`

Validate Artifact Create Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactCreateRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare function validateArtifactCreateRequest(input: unknown): ArtifactCreateRequest;
```

### 调用签名

```text
validateArtifactCreateRequest(input: unknown): ArtifactCreateRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactCreateRequest`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactFromWorkspaceRequest`

Validate Artifact From Workspace Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactFromWorkspaceRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare function validateArtifactFromWorkspaceRequest(input: unknown): ArtifactFromWorkspaceRequest;
```

### 调用签名

```text
validateArtifactFromWorkspaceRequest(input: unknown): ArtifactFromWorkspaceRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactFromWorkspaceRequest`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactGetRecordRequest`

Validate Artifact Get Record Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactGetRecordRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare function validateArtifactGetRecordRequest(input: unknown): ArtifactGetRecordRequest;
```

### 调用签名

```text
validateArtifactGetRecordRequest(input: unknown): ArtifactGetRecordRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactGetRecordRequest`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactLatestRequest`

Validate Artifact Latest Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactLatestRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare function validateArtifactLatestRequest(input: unknown): ArtifactLatestRequest;
```

### 调用签名

```text
validateArtifactLatestRequest(input: unknown): ArtifactLatestRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactLatestRequest`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactListRequest`

Validate Artifact List Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactListRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare function validateArtifactListRequest(input: unknown): ArtifactListRequest;
```

### 调用签名

```text
validateArtifactListRequest(input: unknown): ArtifactListRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactListRequest`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactMutationRequest`

Validate Artifact Mutation Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactMutationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare function validateArtifactMutationRequest(input: unknown): ArtifactMutationRequest;
```

### 调用签名

```text
validateArtifactMutationRequest(input: unknown): ArtifactMutationRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactMutationRequest`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactPreviousRequest`

Validate Artifact Previous Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactPreviousRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare function validateArtifactPreviousRequest(input: unknown): ArtifactPreviousRequest;
```

### 调用签名

```text
validateArtifactPreviousRequest(input: unknown): ArtifactPreviousRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactPreviousRequest`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactReadRequest`

Validate Artifact Read Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactReadRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare function validateArtifactReadRequest(input: unknown): ArtifactReadRequest;
```

### 调用签名

```text
validateArtifactReadRequest(input: unknown): ArtifactReadRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactReadRequest`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactTraceLineageRequest`

Validate Artifact Trace Lineage Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactTraceLineageRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare function validateArtifactTraceLineageRequest(input: unknown): ArtifactTraceLineageRequest;
```

### 调用签名

```text
validateArtifactTraceLineageRequest(input: unknown): ArtifactTraceLineageRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactTraceLineageRequest`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactVersionRequest`

Validate Artifact Version Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactVersionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare function validateArtifactVersionRequest(input: unknown): ArtifactVersionRequest;
```

### 调用签名

```text
validateArtifactVersionRequest(input: unknown): ArtifactVersionRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactVersionRequest`
- 说明: 返回值契约由上述类型定义。

## `validateNormalizedArtifactError`

Validate Normalized Artifact Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateNormalizedArtifactError } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### 声明

```text
export declare function validateNormalizedArtifactError(input: unknown): NormalizedArtifactError;
```

### 调用签名

```text
validateNormalizedArtifactError(input: unknown): NormalizedArtifactError
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `NormalizedArtifactError`
- 说明: 返回值契约由上述类型定义。
