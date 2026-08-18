# `@codesoul-co/hypha-core` / `contracts/artifact`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/artifact.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)
- 导出数: **18**

## 模块用法

用于声明并运行时校验契约。Artifact 模块公开 15 接口、3 类型。

### 从包入口导入

```ts
import type {
  ArtifactAccessPolicySpec,
  ArtifactAccessRecord,
  ArtifactContentAddressingSpec,
  ArtifactLineage,
  ArtifactLineageNode,
  ArtifactPreviewPolicySpec,
  ArtifactProfileSpec,
  ArtifactProvenance,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 18 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactAccessPolicySpec` | 接口 | <code>interface ArtifactAccessPolicySpec</code> | Artifact Access Policy Spec 接口，共包含 8 个公开字段或方法。 |
| `ArtifactAccessRecord` | 接口 | <code>interface ArtifactAccessRecord</code> | Artifact Access Record 接口，共包含 5 个公开字段或方法。 |
| `ArtifactContentAddressingSpec` | 接口 | <code>interface ArtifactContentAddressingSpec</code> | Artifact Content Addressing Spec 接口，共包含 3 个公开字段或方法。 |
| `ArtifactLineage` | 接口 | <code>interface ArtifactLineage</code> | Artifact Lineage 接口，共包含 4 个公开字段或方法。 |
| `ArtifactLineageNode` | 接口 | <code>interface ArtifactLineageNode</code> | Artifact Lineage Node 接口，共包含 6 个公开字段或方法。 |
| `ArtifactPreviewPolicySpec` | 接口 | <code>interface ArtifactPreviewPolicySpec</code> | Artifact Preview Policy Spec 接口，共包含 3 个公开字段或方法。 |
| `ArtifactProfileSpec` | 接口 | <code>interface ArtifactProfileSpec extends VersionedSpec</code> | Artifact Profile Spec 接口，共包含 15 个公开字段或方法。 |
| `ArtifactProvenance` | 接口 | <code>interface ArtifactProvenance</code> | Artifact Provenance 接口，共包含 11 个公开字段或方法。 |
| `ArtifactRecord` | 接口 | <code>interface ArtifactRecord</code> | Artifact Record 接口，共包含 41 个公开字段或方法。 |
| `ArtifactRef` | 接口 | <code>interface ArtifactRef</code> | Artifact Ref 接口，共包含 7 个公开字段或方法。 |
| `ArtifactRetentionPolicySpec` | 接口 | <code>interface ArtifactRetentionPolicySpec</code> | Artifact Retention Policy Spec 接口，共包含 7 个公开字段或方法。 |
| `ArtifactRetentionRecord` | 接口 | <code>interface ArtifactRetentionRecord</code> | Artifact Retention Record 接口，共包含 5 个公开字段或方法。 |
| `ArtifactStorageRef` | 接口 | <code>interface ArtifactStorageRef</code> | Artifact Storage Ref 接口，共包含 7 个公开字段或方法。 |
| `ArtifactValidationPolicySpec` | 接口 | <code>interface ArtifactValidationPolicySpec</code> | Artifact Validation Policy Spec 接口，共包含 7 个公开字段或方法。 |
| `ArtifactVersioningPolicySpec` | 接口 | <code>interface ArtifactVersioningPolicySpec</code> | Artifact Versioning Policy Spec 接口，共包含 3 个公开字段或方法。 |
| `ArtifactHashAlgorithm` | 类型 | <code>type ArtifactHashAlgorithm = 'sha256' &#124; 'blake3'</code> | Artifact Hash Algorithm 公共类型别名；完整类型表达式见声明。 |
| `ArtifactKind` | 类型 | <code>type ArtifactKind = 'document' &#124; 'code' &#124; 'dataset' &#124; 'image' &#124; 'audio' &#124; 'video' &#124; 'table' &#124; 'report' &#124; 'archive' &#124; 'patch' &#124; 'snapshot' &#124; 'test_report' &#124; 'build_output' &#124; 'log' &#124; 'tool_output' &#124; 'execution_receipt' &#124; 'other'</code> | Artifact Kind 公共类型别名；完整类型表达式见声明。 |
| `ArtifactStatus` | 类型 | <code>type ArtifactStatus = 'creating' &#124; 'draft' &#124; 'final' &#124; 'archived' &#124; 'invalidated' &#124; 'deletion_pending' &#124; 'deleted' &#124; 'failed'</code> | Artifact Status 公共类型别名；完整类型表达式见声明。 |

## `ArtifactAccessPolicySpec`

Artifact Access Policy Spec 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactAccessPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export interface ArtifactAccessPolicySpec {
    defaultVisibility: 'private' | 'session' | 'workspace' | 'tenant' | 'shared';
    allowedPrincipalTypes?: ExecutionPrincipal['type'][];
    requiredReadScopes?: string[];
    requiredWriteScopes?: string[];
    requiredDeleteScopes?: string[];
    signedUrlTtlSeconds?: number;
    allowRangeRead?: boolean;
    allowCrossWorkspaceCopy?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowCrossWorkspaceCopy` | 属性 | <code>allowCrossWorkspaceCopy?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedPrincipalTypes` | 属性 | <code>allowedPrincipalTypes?: ("system" &#124; "agent" &#124; "user" &#124; "service")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowRangeRead` | 属性 | <code>allowRangeRead?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultVisibility` | 属性 | <code>defaultVisibility: "workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredDeleteScopes` | 属性 | <code>requiredDeleteScopes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredReadScopes` | 属性 | <code>requiredReadScopes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredWriteScopes` | 属性 | <code>requiredWriteScopes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signedUrlTtlSeconds` | 属性 | <code>signedUrlTtlSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactAccessRecord`

Artifact Access Record 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactAccessRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export interface ArtifactAccessRecord {
    visibility: ArtifactAccessPolicySpec['defaultVisibility'];
    ownerPrincipalId: string;
    workspaceId: string;
    allowedPrincipalIds?: string[];
    allowedRoles?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedPrincipalIds` | 属性 | <code>allowedPrincipalIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedRoles` | 属性 | <code>allowedRoles?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerPrincipalId` | 属性 | <code>ownerPrincipalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `visibility` | 属性 | <code>visibility: "workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactContentAddressingSpec`

Artifact Content Addressing Spec 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactContentAddressingSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export interface ArtifactContentAddressingSpec {
    hashAlgorithm: ArtifactHashAlgorithm;
    verifyOnRead: boolean;
    deduplicate: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deduplicate` | 属性 | <code>deduplicate: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hashAlgorithm` | 属性 | <code>hashAlgorithm: ArtifactHashAlgorithm</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `verifyOnRead` | 属性 | <code>verifyOnRead: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactLineage`

Artifact Lineage 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactLineage } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export interface ArtifactLineage {
    artifactId: string;
    ancestors: ArtifactLineageNode[];
    descendants: ArtifactLineageNode[];
    versions: ArtifactRecord[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ancestors` | 属性 | <code>ancestors: ArtifactLineageNode[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `artifactId` | 属性 | <code>artifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `descendants` | 属性 | <code>descendants: ArtifactLineageNode[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versions` | 属性 | <code>versions: ArtifactRecord[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactLineageNode`

Artifact Lineage Node 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactLineageNode } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export interface ArtifactLineageNode {
    artifactId: string;
    versionId: string;
    logicalArtifactId: string;
    contentHash: string;
    kind?: ArtifactKind;
    transformation?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind?: ArtifactKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `logicalArtifactId` | 属性 | <code>logicalArtifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transformation` | 属性 | <code>transformation?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactPreviewPolicySpec`

Artifact Preview Policy Spec 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactPreviewPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export interface ArtifactPreviewPolicySpec {
    enabled: boolean;
    maxPreviewBytes?: number;
    allowedMimeTypes?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedMimeTypes` | 属性 | <code>allowedMimeTypes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `enabled` | 属性 | <code>enabled: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxPreviewBytes` | 属性 | <code>maxPreviewBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactProfileSpec`

Artifact Profile Spec 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactProfileSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export interface ArtifactProfileSpec extends VersionedSpec {
    revision?: string;
    name?: string;
    storeRef: SpecRef;
    contentAddressing: ArtifactContentAddressingSpec;
    versioning: ArtifactVersioningPolicySpec;
    access: ArtifactAccessPolicySpec;
    retention: ArtifactRetentionPolicySpec;
    validation?: ArtifactValidationPolicySpec;
    preview?: ArtifactPreviewPolicySpec;
    allowedKinds?: ArtifactKind[];
    allowedMimeTypes?: string[];
    maxArtifactBytes?: number;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `access` | 属性 | <code>access: ArtifactAccessPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedKinds` | 属性 | <code>allowedKinds?: ArtifactKind[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedMimeTypes` | 属性 | <code>allowedMimeTypes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentAddressing` | 属性 | <code>contentAddressing: ArtifactContentAddressingSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxArtifactBytes` | 属性 | <code>maxArtifactBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preview` | 属性 | <code>preview?: ArtifactPreviewPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retention` | 属性 | <code>retention: ArtifactRetentionPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `storeRef` | 属性 | <code>storeRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validation` | 属性 | <code>validation?: ArtifactValidationPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versioning` | 属性 | <code>versioning: ArtifactVersioningPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactProvenance`

Artifact Provenance 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactProvenance } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export interface ArtifactProvenance {
    sourceType: 'user_upload' | 'agent_generated' | 'tool_generated' | 'command_generated' | 'derived' | 'imported' | 'snapshot' | 'patch';
    createdBy: string;
    sourceEventId?: string;
    toolInvocationId?: string;
    executionId?: string;
    workflowState?: string;
    sourceArtifactIds?: string[];
    transformation?: string;
    environmentHash?: string;
    commandHash?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandHash` | 属性 | <code>commandHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdBy` | 属性 | <code>createdBy: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentHash` | 属性 | <code>environmentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceArtifactIds` | 属性 | <code>sourceArtifactIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceEventId` | 属性 | <code>sourceEventId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceType` | 属性 | <code>sourceType: "patch" &#124; "snapshot" &#124; "user_upload" &#124; "agent_generated" &#124; "tool_generated" &#124; "command_generated" &#124; "derived" &#124; "imported"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolInvocationId` | 属性 | <code>toolInvocationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transformation` | 属性 | <code>transformation?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowState` | 属性 | <code>workflowState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactRecord`

Artifact Record 接口，共包含 41 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export interface ArtifactRecord {
    id: string;
    versionId: string;
    versionNumber: number;
    revision: number;
    tenantId?: string;
    userId: string;
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
    sizeBytes: number;
    contentHash: string;
    hashAlgorithm: ArtifactHashAlgorithm;
    storageRef: ArtifactStorageRef;
    /** True when this version reused an already committed content-addressed Blob. */
    deduplicated?: boolean;
    logicalArtifactId: string;
    parentVersionId?: string;
    previousVersionId?: string;
    nextVersionId?: string;
    sourceArtifactIds?: string[];
    derivedArtifactIds?: string[];
    provenance: ArtifactProvenance;
    access: ArtifactAccessRecord;
    retention: ArtifactRetentionRecord;
    status: ArtifactStatus;
    immutable?: boolean;
    sensitive?: boolean;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
    finalizedAt?: string;
    archivedAt?: string;
    expiresAt?: string;
    deletedAt?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `access` | 属性 | <code>access: ArtifactAccessRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `archivedAt` | 属性 | <code>archivedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deduplicated` | 属性 | <code>deduplicated?: boolean</code> | True when this version reused an already committed content-addressed Blob. |
| `deletedAt` | 属性 | <code>deletedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `derivedArtifactIds` | 属性 | <code>derivedArtifactIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `encoding` | 属性 | <code>encoding?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalizedAt` | 属性 | <code>finalizedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hashAlgorithm` | 属性 | <code>hashAlgorithm: ArtifactHashAlgorithm</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `immutable` | 属性 | <code>immutable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: ArtifactKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `logicalArtifactId` | 属性 | <code>logicalArtifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mimeType` | 属性 | <code>mimeType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextVersionId` | 属性 | <code>nextVersionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `parentVersionId` | 属性 | <code>parentVersionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `previousVersionId` | 属性 | <code>previousVersionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance: ArtifactProvenance</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retention` | 属性 | <code>retention: ArtifactRetentionRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sensitive` | 属性 | <code>sensitive?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceArtifactIds` | 属性 | <code>sourceArtifactIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: ArtifactStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `storageRef` | 属性 | <code>storageRef: ArtifactStorageRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionNumber` | 属性 | <code>versionNumber: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactRef`

Artifact Ref 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactRef } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export interface ArtifactRef {
    artifactId: string;
    versionId?: string;
    contentHash: string;
    kind?: ArtifactKind;
    mimeType?: string;
    sizeBytes?: number;
    accessTokenRef?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `accessTokenRef` | 属性 | <code>accessTokenRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `artifactId` | 属性 | <code>artifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind?: ArtifactKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mimeType` | 属性 | <code>mimeType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactRetentionPolicySpec`

Artifact Retention Policy Spec 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactRetentionPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export interface ArtifactRetentionPolicySpec {
    defaultTtlSeconds?: number;
    archiveAfterSeconds?: number;
    deleteAfterSeconds?: number;
    retainFinal?: boolean;
    retainOnFailure?: boolean;
    legalHoldSupported?: boolean;
    garbageCollectUnreferenced?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archiveAfterSeconds` | 属性 | <code>archiveAfterSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultTtlSeconds` | 属性 | <code>defaultTtlSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deleteAfterSeconds` | 属性 | <code>deleteAfterSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `garbageCollectUnreferenced` | 属性 | <code>garbageCollectUnreferenced?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `legalHoldSupported` | 属性 | <code>legalHoldSupported?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retainFinal` | 属性 | <code>retainFinal?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retainOnFailure` | 属性 | <code>retainOnFailure?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactRetentionRecord`

Artifact Retention Record 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactRetentionRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export interface ArtifactRetentionRecord {
    policyRef?: SpecRef;
    expiresAt?: string;
    archivedAt?: string;
    legalHold?: boolean;
    referencedByCount?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archivedAt` | 属性 | <code>archivedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `legalHold` | 属性 | <code>legalHold?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRef` | 属性 | <code>policyRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `referencedByCount` | 属性 | <code>referencedByCount?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactStorageRef`

Artifact Storage Ref 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactStorageRef } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export interface ArtifactStorageRef {
    storeId: string;
    bucketOrNamespace?: string;
    objectKey: string;
    versionId?: string;
    etag?: string;
    region?: string;
    encrypted?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `bucketOrNamespace` | 属性 | <code>bucketOrNamespace?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `encrypted` | 属性 | <code>encrypted?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `etag` | 属性 | <code>etag?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `objectKey` | 属性 | <code>objectKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `region` | 属性 | <code>region?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `storeId` | 属性 | <code>storeId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactValidationPolicySpec`

Artifact Validation Policy Spec 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactValidationPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export interface ArtifactValidationPolicySpec {
    verifyMimeType?: boolean;
    verifyExtension?: boolean;
    malwareScanRef?: SpecRef;
    archiveBombProtection?: boolean;
    maxExpandedBytes?: number;
    checksumRequired?: boolean;
    rejectExecutableUploads?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archiveBombProtection` | 属性 | <code>archiveBombProtection?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `checksumRequired` | 属性 | <code>checksumRequired?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `malwareScanRef` | 属性 | <code>malwareScanRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxExpandedBytes` | 属性 | <code>maxExpandedBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rejectExecutableUploads` | 属性 | <code>rejectExecutableUploads?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `verifyExtension` | 属性 | <code>verifyExtension?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `verifyMimeType` | 属性 | <code>verifyMimeType?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactVersioningPolicySpec`

Artifact Versioning Policy Spec 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactVersioningPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export interface ArtifactVersioningPolicySpec {
    /** E4 guarantees immutable history; replacement semantics are deliberately unsupported. */
    strategy: 'append_only';
    retainPreviousVersions: true;
    maxVersions?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxVersions` | 属性 | <code>maxVersions?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retainPreviousVersions` | 属性 | <code>retainPreviousVersions: true</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `strategy` | 属性 | <code>strategy: "append_only"</code> | E4 guarantees immutable history; replacement semantics are deliberately unsupported. |

## `ArtifactHashAlgorithm`

Artifact Hash Algorithm 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactHashAlgorithm } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export type ArtifactHashAlgorithm = 'sha256' | 'blake3';
```

## `ArtifactKind`

Artifact Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactKind } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export type ArtifactKind = 'document' | 'code' | 'dataset' | 'image' | 'audio' | 'video' | 'table' | 'report' | 'archive' | 'patch' | 'snapshot' | 'test_report' | 'build_output' | 'log' | 'tool_output' | 'execution_receipt' | 'other';
```

## `ArtifactStatus`

Artifact Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### 声明

```text
export type ArtifactStatus = 'creating' | 'draft' | 'final' | 'archived' | 'invalidated' | 'deletion_pending' | 'deleted' | 'failed';
```
