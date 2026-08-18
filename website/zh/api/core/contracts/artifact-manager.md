# `@codesoul-co/hypha-core` / `contracts/artifact-manager`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/artifact-manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)
- 导出数: **21**

## 模块用法

用于声明并运行时校验契约。Artifact manager 模块公开 17 接口、4 类型。

### 从包入口导入

```ts
import type {
  ArtifactCreateDownloadAccessRequest,
  ArtifactCreateRequest,
  ArtifactFromWorkspaceRequest,
  ArtifactGetRecordRequest,
  ArtifactLatestRequest,
  ArtifactListRequest,
  ArtifactManager,
  ArtifactMutationRequest,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 21 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactCreateDownloadAccessRequest` | 接口 | <code>interface ArtifactCreateDownloadAccessRequest extends ArtifactGetRecordRequest</code> | Artifact Create Download Access Request 接口，共包含 7 个公开字段或方法。 |
| `ArtifactCreateRequest` | 接口 | <code>interface ArtifactCreateRequest</code> | Artifact Create Request 接口，共包含 26 个公开字段或方法。 |
| `ArtifactFromWorkspaceRequest` | 接口 | <code>interface ArtifactFromWorkspaceRequest</code> | Artifact From Workspace Request 接口，共包含 22 个公开字段或方法。 |
| `ArtifactGetRecordRequest` | 接口 | <code>interface ArtifactGetRecordRequest</code> | Artifact Get Record Request 接口，共包含 3 个公开字段或方法。 |
| `ArtifactLatestRequest` | 接口 | <code>interface ArtifactLatestRequest</code> | Artifact Latest Request 接口，共包含 2 个公开字段或方法。 |
| `ArtifactListRequest` | 接口 | <code>interface ArtifactListRequest</code> | Artifact List Request 接口，共包含 8 个公开字段或方法。 |
| `ArtifactManager` | 接口 | <code>interface ArtifactManager</code> | Artifact Manager 接口，共包含 16 个公开字段或方法。 |
| `ArtifactMutationRequest` | 接口 | <code>interface ArtifactMutationRequest</code> | Artifact Mutation Request 接口，共包含 6 个公开字段或方法。 |
| `ArtifactPreviousRequest` | 接口 | <code>interface ArtifactPreviousRequest</code> | Artifact Previous Request 接口，共包含 2 个公开字段或方法。 |
| `ArtifactReadRequest` | 接口 | <code>interface ArtifactReadRequest extends ArtifactGetRecordRequest</code> | Artifact Read Request 接口，共包含 5 个公开字段或方法。 |
| `ArtifactReadResult` | 接口 | <code>interface ArtifactReadResult</code> | Artifact Read Result 接口，共包含 2 个公开字段或方法。 |
| `ArtifactTraceLineageRequest` | 接口 | <code>interface ArtifactTraceLineageRequest</code> | Artifact Trace Lineage Request 接口，共包含 2 个公开字段或方法。 |
| `ArtifactVersionRequest` | 接口 | <code>interface ArtifactVersionRequest</code> | Artifact Version Request 接口，共包含 10 个公开字段或方法。 |
| `ArtifactWorkspaceContent` | 接口 | <code>interface ArtifactWorkspaceContent</code> | Artifact Workspace Content 接口，共包含 4 个公开字段或方法。 |
| `ArtifactWorkspaceContentReader` | 接口 | <code>interface ArtifactWorkspaceContentReader</code> | Governed Workspace port used by ArtifactManager; it never accepts a host path. |
| `ArtifactWorkspaceContentRequest` | 接口 | <code>interface ArtifactWorkspaceContentRequest</code> | Artifact Workspace Content Request 接口，共包含 4 个公开字段或方法。 |
| `NormalizedArtifactError` | 接口 | <code>interface NormalizedArtifactError</code> | Normalized Artifact Error 接口，共包含 5 个公开字段或方法。 |
| `ArtifactArchiveRequest` | 类型 | <code>type ArtifactArchiveRequest = ArtifactMutationRequest</code> | Artifact Archive Request 公共类型别名；完整类型表达式见声明。 |
| `ArtifactDeleteRequest` | 类型 | <code>type ArtifactDeleteRequest = ArtifactMutationRequest</code> | Artifact Delete Request 公共类型别名；完整类型表达式见声明。 |
| `ArtifactFinalizeRequest` | 类型 | <code>type ArtifactFinalizeRequest = ArtifactMutationRequest</code> | Artifact Finalize Request 公共类型别名；完整类型表达式见声明。 |
| `ArtifactInvalidateRequest` | 类型 | <code>type ArtifactInvalidateRequest = ArtifactMutationRequest</code> | Artifact Invalidate Request 公共类型别名；完整类型表达式见声明。 |

## `ArtifactCreateDownloadAccessRequest`

Artifact Create Download Access Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactCreateDownloadAccessRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactCreateDownloadAccessRequest extends ArtifactGetRecordRequest {
    operationId: string;
    expiresInSeconds?: number;
    responseMimeType?: string;
    responseFilename?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresInSeconds` | 属性 | <code>expiresInSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `responseFilename` | 属性 | <code>responseFilename?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `responseMimeType` | 属性 | <code>responseMimeType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactCreateRequest`

Artifact Create Request 接口，共包含 26 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactCreateRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactCreateRequest {
    operationId: string;
    principal: ExecutionPrincipal;
    profileRef: SpecRef;
    userId: string;
    tenantId?: string;
    workspaceId: string;
    sessionId?: string;
    runId?: string;
    agentId?: string;
    name: string;
    description?: string;
    relativePath?: string;
    kind: ArtifactKind;
    mimeType?: string;
    encoding?: string;
    content: ArtifactByteSource;
    expectedContentHash?: string;
    expectedSizeBytes?: number;
    logicalArtifactId?: string;
    provenance: ArtifactProvenance;
    access?: ArtifactAccessRecord;
    retention?: ArtifactRetentionRecord;
    sensitive?: boolean;
    tags?: string[];
    idempotencyKey?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `access` | 属性 | <code>access?: ArtifactAccessRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content: ArtifactByteSource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `encoding` | 属性 | <code>encoding?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedSizeBytes` | 属性 | <code>expectedSizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: ArtifactKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `logicalArtifactId` | 属性 | <code>logicalArtifactId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mimeType` | 属性 | <code>mimeType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance: ArtifactProvenance</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retention` | 属性 | <code>retention?: ArtifactRetentionRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sensitive` | 属性 | <code>sensitive?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactFromWorkspaceRequest`

Artifact From Workspace Request 接口，共包含 22 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactFromWorkspaceRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactFromWorkspaceRequest {
    operationId: string;
    principal: ExecutionPrincipal;
    profileRef: SpecRef;
    userId: string;
    tenantId?: string;
    workspaceId: string;
    sessionId?: string;
    runId?: string;
    agentId?: string;
    relativePath: string;
    name?: string;
    kind: ArtifactKind;
    mimeType?: string;
    expectedContentHash?: string;
    expectedSizeBytes?: number;
    logicalArtifactId?: string;
    provenance: ArtifactProvenance;
    retention?: ArtifactRetentionRecord;
    sensitive?: boolean;
    tags?: string[];
    idempotencyKey?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedSizeBytes` | 属性 | <code>expectedSizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: ArtifactKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `logicalArtifactId` | 属性 | <code>logicalArtifactId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mimeType` | 属性 | <code>mimeType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance: ArtifactProvenance</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retention` | 属性 | <code>retention?: ArtifactRetentionRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sensitive` | 属性 | <code>sensitive?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactGetRecordRequest`

Artifact Get Record Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactGetRecordRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactGetRecordRequest {
    principal: ExecutionPrincipal;
    artifactId: string;
    versionId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactLatestRequest`

Artifact Latest Request 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactLatestRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactLatestRequest {
    principal: ExecutionPrincipal;
    logicalArtifactId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `logicalArtifactId` | 属性 | <code>logicalArtifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactListRequest`

Artifact List Request 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactListRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactListRequest {
    principal: ExecutionPrincipal;
    workspaceId: string;
    logicalArtifactId?: string;
    kinds?: ArtifactKind[];
    statuses?: ArtifactRecord['status'][];
    tags?: string[];
    includeDeleted?: boolean;
    limit?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `includeDeleted` | 属性 | <code>includeDeleted?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kinds` | 属性 | <code>kinds?: ArtifactKind[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `limit` | 属性 | <code>limit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `logicalArtifactId` | 属性 | <code>logicalArtifactId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statuses` | 属性 | <code>statuses?: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/contracts/artifact").ArtifactStatus[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactManager`

Artifact Manager 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactManager } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactManager {
    create(request: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    createFromWorkspace(request: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    createVersion(request: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    get(request: ArtifactGetRecordRequest): Promise<ArtifactRecord | null>;
    read(request: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise<ArtifactReadResult>;
    createDownloadAccess(request: ArtifactCreateDownloadAccessRequest): Promise<ArtifactDownloadAccess>;
    list(request: ArtifactListRequest): Promise<ArtifactRecord[]>;
    finalize(request: ArtifactFinalizeRequest): Promise<ArtifactRecord>;
    archive(request: ArtifactArchiveRequest): Promise<ArtifactRecord>;
    invalidate(request: ArtifactInvalidateRequest): Promise<ArtifactRecord>;
    delete(request: ArtifactDeleteRequest): Promise<void>;
    traceLineage(request: ArtifactTraceLineageRequest): Promise<ArtifactLineage>;
    latest(request: ArtifactLatestRequest): Promise<ArtifactRecord | null>;
    previous(request: ArtifactPreviousRequest): Promise<ArtifactRecord | null>;
    profile(ref: SpecRef): Promise<ArtifactProfileSpec | null>;
    health(): Promise<Record<string, ProviderHealth>>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archive` | 方法 | <code>archive(request: ArtifactArchiveRequest): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `create` | 方法 | <code>create(request: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `createDownloadAccess` | 方法 | <code>createDownloadAccess(request: ArtifactCreateDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `createFromWorkspace` | 方法 | <code>createFromWorkspace(request: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `createVersion` | 方法 | <code>createVersion(request: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(request: ArtifactDeleteRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `finalize` | 方法 | <code>finalize(request: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: ArtifactGetRecordRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidate` | 方法 | <code>invalidate(request: ArtifactInvalidateRequest): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `latest` | 方法 | <code>latest(request: ArtifactLatestRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: ArtifactListRequest): Promise&lt;ArtifactRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `previous` | 方法 | <code>previous(request: ArtifactPreviousRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `profile` | 方法 | <code>profile(ref: SpecRef): Promise&lt;ArtifactProfileSpec &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `read` | 方法 | <code>read(request: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactReadResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `traceLineage` | 方法 | <code>traceLineage(request: ArtifactTraceLineageRequest): Promise&lt;ArtifactLineage&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ArtifactMutationRequest`

Artifact Mutation Request 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactMutationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactMutationRequest {
    operationId: string;
    principal: ExecutionPrincipal;
    artifactId: string;
    expectedRevision: number;
    reason?: string;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactPreviousRequest`

Artifact Previous Request 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactPreviousRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactPreviousRequest {
    principal: ExecutionPrincipal;
    versionId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactReadRequest`

Artifact Read Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactReadRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactReadRequest extends ArtifactGetRecordRequest {
    range?: ArtifactByteRange;
    expectedContentHash?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `range` | 属性 | <code>range?: ArtifactByteRange</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactReadResult`

Artifact Read Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactReadResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactReadResult {
    record: ArtifactRecord;
    content: ArtifactContent;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: ArtifactContent</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `record` | 属性 | <code>record: ArtifactRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactTraceLineageRequest`

Artifact Trace Lineage Request 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactTraceLineageRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactTraceLineageRequest {
    principal: ExecutionPrincipal;
    artifactId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactVersionRequest`

Artifact Version Request 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactVersionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactVersionRequest {
    operationId: string;
    principal: ExecutionPrincipal;
    artifactId: string;
    expectedRevision: number;
    content: ArtifactByteSource;
    expectedContentHash?: string;
    expectedSizeBytes?: number;
    provenance: ArtifactProvenance;
    idempotencyKey?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content: ArtifactByteSource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedSizeBytes` | 属性 | <code>expectedSizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance: ArtifactProvenance</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactWorkspaceContent`

Artifact Workspace Content 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactWorkspaceContent } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactWorkspaceContent {
    content: ArtifactByteSource;
    contentHash?: string;
    sizeBytes?: number;
    mimeType?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: ArtifactByteSource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mimeType` | 属性 | <code>mimeType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactWorkspaceContentReader`

Governed Workspace port used by ArtifactManager; it never accepts a host path.

- 种类: 接口
- 导入: `import type { ArtifactWorkspaceContentReader } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactWorkspaceContentReader {
    read(request: ArtifactWorkspaceContentRequest): Promise<ArtifactWorkspaceContent>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `read` | 方法 | <code>read(request: ArtifactWorkspaceContentRequest): Promise&lt;ArtifactWorkspaceContent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ArtifactWorkspaceContentRequest`

Artifact Workspace Content Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactWorkspaceContentRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface ArtifactWorkspaceContentRequest {
    principal: ExecutionPrincipal;
    workspaceId: string;
    relativePath: string;
    maxBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxBytes` | 属性 | <code>maxBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `NormalizedArtifactError`

Normalized Artifact Error 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NormalizedArtifactError } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export interface NormalizedArtifactError {
    code: 'ARTIFACT_INVALID_INPUT' | 'ARTIFACT_NOT_FOUND' | 'ARTIFACT_PERMISSION_DENIED' | 'ARTIFACT_TOO_LARGE' | 'ARTIFACT_TYPE_DENIED' | 'ARTIFACT_HASH_MISMATCH' | 'ARTIFACT_VERSION_CONFLICT' | 'ARTIFACT_STORE_UNAVAILABLE' | 'ARTIFACT_UPLOAD_FAILED' | 'ARTIFACT_DOWNLOAD_FAILED' | 'ARTIFACT_DELETE_BLOCKED' | 'ARTIFACT_DELETE_PARTIAL' | 'ARTIFACT_VALIDATION_FAILED' | 'ARTIFACT_INTERNAL_ERROR';
    message: string;
    retryable: boolean;
    details?: Record<string, unknown>;
    causeRef?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causeRef` | 属性 | <code>causeRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>code: "ARTIFACT_INVALID_INPUT" &#124; "ARTIFACT_NOT_FOUND" &#124; "ARTIFACT_PERMISSION_DENIED" &#124; "ARTIFACT_TOO_LARGE" &#124; "ARTIFACT_TYPE_DENIED" &#124; "ARTIFACT_HASH_MISMATCH" &#124; "ARTIFACT_VERSION_CONFLICT" &#124; "ARTIFACT_STORE_UNAVAILABLE" &#124; "ARTIFACT_UPLOAD_FAILED" &#124; "ARTIFACT_DOWNLOAD_FAILED" &#124; "ARTIFACT_DELETE_BLOCKED" &#124; "ARTIFACT_DELETE_PARTIAL" &#124; "ARTIFACT_VALIDATION_FAILED" &#124; "ARTIFACT_INTERNAL_ERROR"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `details` | 属性 | <code>details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactArchiveRequest`

Artifact Archive Request 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactArchiveRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export type ArtifactArchiveRequest = ArtifactMutationRequest;
```

## `ArtifactDeleteRequest`

Artifact Delete Request 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactDeleteRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export type ArtifactDeleteRequest = ArtifactMutationRequest;
```

## `ArtifactFinalizeRequest`

Artifact Finalize Request 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactFinalizeRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export type ArtifactFinalizeRequest = ArtifactMutationRequest;
```

## `ArtifactInvalidateRequest`

Artifact Invalidate Request 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactInvalidateRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### 声明

```text
export type ArtifactInvalidateRequest = ArtifactMutationRequest;
```
