# `@codesoul-co/hypha-core` / `modules/artifact/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/artifact/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)
- 导出数: **46**

## 模块用法

用于使用该功能边界的公共契约与操作。Index 模块公开 40 常量、6 函数。

### 从包入口导入

```ts
import {
  artifactAccessPolicySpecJsonSchema,
  artifactAccessPolicySpecSchema,
  artifactAccessRecordJsonSchema,
  artifactAccessRecordSchema,
  artifactContentAddressingSpecJsonSchema,
  artifactContentAddressingSpecSchema,
  artifactContentHashSchema,
  artifactContractJsonSchemas,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 6 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 40 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { artifactAccessPolicySpecSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = artifactAccessPolicySpecSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactAccessPolicySpecJsonSchema` | 常量 | <code>const artifactAccessPolicySpecJsonSchema: JsonSchema</code> | Artifact Access Policy Spec 的 JSON Schema。 |
| `artifactAccessPolicySpecSchema` | 常量 | <code>const artifactAccessPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ defaultVisibility: z.ZodEnum&lt;["private", "session", "workspace", "tenant", "shared"]&gt;; allowedPrincipalTypes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;, "many"&gt;&gt;; requiredReadScopes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; requiredWriteScopes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; requiredDeleteScope...</code> | Artifact Access Policy Spec 的运行时 Schema。 |
| `artifactAccessRecordJsonSchema` | 常量 | <code>const artifactAccessRecordJsonSchema: JsonSchema</code> | Artifact Access Record 的 JSON Schema。 |
| `artifactAccessRecordSchema` | 常量 | <code>const artifactAccessRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ visibility: z.ZodEnum&lt;["private", "session", "workspace", "tenant", "shared"]&gt;; ownerPrincipalId: z.ZodString; workspaceId: z.ZodString; allowedPrincipalIds: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; allowedRoles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strict", z.ZodTypeAny, { workspaceId: string; visibility: "private" &#124; "session" &#124; "w...</code> | Artifact Access Record 的运行时 Schema。 |
| `artifactContentAddressingSpecJsonSchema` | 常量 | <code>const artifactContentAddressingSpecJsonSchema: JsonSchema</code> | Artifact Content Addressing Spec 的 JSON Schema。 |
| `artifactContentAddressingSpecSchema` | 常量 | <code>const artifactContentAddressingSpecSchema: z.ZodObject&lt;{ hashAlgorithm: z.ZodEnum&lt;["sha256", "blake3"]&gt;; verifyOnRead: z.ZodBoolean; deduplicate: z.ZodBoolean; }, "strict", z.ZodTypeAny, { hashAlgorithm: "sha256" &#124; "blake3"; verifyOnRead: boolean; deduplicate: boolean; }, { hashAlgorithm: "sha256" &#124; "blake3"; verifyOnRead: boolean; deduplicate: boolean; }&gt;</code> | Artifact Content Addressing Spec 的运行时 Schema。 |
| `artifactContentHashSchema` | 常量 | <code>const artifactContentHashSchema: z.ZodString</code> | Artifact Content Hash 的运行时 Schema。 |
| `artifactContractJsonSchemas` | 常量 | <code>const artifactContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/artifact/index` 模块导出的 Artifact Contract JSON Schemas 常量。 |
| `artifactHashAlgorithmSchema` | 常量 | <code>const artifactHashAlgorithmSchema: z.ZodEnum&lt;["sha256", "blake3"]&gt;</code> | Artifact Hash Algorithm 的运行时 Schema。 |
| `artifactKindSchema` | 常量 | <code>const artifactKindSchema: z.ZodEnum&lt;["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]&gt;</code> | Artifact Kind 的运行时 Schema。 |
| `artifactLineageExample` | 常量 | <code>const artifactLineageExample: ArtifactLineage</code> | Artifact Lineage 的有效示例值。 |
| `artifactLineageJsonSchema` | 常量 | <code>const artifactLineageJsonSchema: JsonSchema</code> | Artifact Lineage 的 JSON Schema。 |
| `artifactLineageNodeJsonSchema` | 常量 | <code>const artifactLineageNodeJsonSchema: JsonSchema</code> | Artifact Lineage Node 的 JSON Schema。 |
| `artifactLineageNodeSchema` | 常量 | <code>const artifactLineageNodeSchema: z.ZodObject&lt;{ artifactId: z.ZodString; versionId: z.ZodString; logicalArtifactId: z.ZodString; contentHash: z.ZodString; kind: z.ZodOptional&lt;z.ZodEnum&lt;["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]&gt;&gt;; transformation: z.ZodOptional&lt;z.ZodSt...</code> | Artifact Lineage Node 的运行时 Schema。 |
| `artifactLineageSchema` | 常量 | <code>const artifactLineageSchema: z.ZodEffects&lt;z.ZodObject&lt;{ artifactId: z.ZodString; ancestors: z.ZodArray&lt;z.ZodObject&lt;{ artifactId: z.ZodString; versionId: z.ZodString; logicalArtifactId: z.ZodString; contentHash: z.ZodString; kind: z.ZodOptional&lt;z.ZodEnum&lt;["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", ...</code> | Artifact Lineage 的运行时 Schema。 |
| `artifactPreviewPolicySpecJsonSchema` | 常量 | <code>const artifactPreviewPolicySpecJsonSchema: JsonSchema</code> | Artifact Preview Policy Spec 的 JSON Schema。 |
| `artifactPreviewPolicySpecSchema` | 常量 | <code>const artifactPreviewPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ enabled: z.ZodBoolean; maxPreviewBytes: z.ZodOptional&lt;z.ZodNumber&gt;; allowedMimeTypes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strict", z.ZodTypeAny, { enabled: boolean; maxPreviewBytes?: number &#124; undefined; allowedMimeTypes?: string[] &#124; undefined; }, { enabled: boolean; maxPreviewBytes?: number &#124; undefined; allowedMimeTypes?: string[] &#124; ...</code> | Artifact Preview Policy Spec 的运行时 Schema。 |
| `artifactProfileSpecExample` | 常量 | <code>const artifactProfileSpecExample: ArtifactProfileSpec</code> | Artifact Profile Spec 的有效示例值。 |
| `artifactProfileSpecJsonSchema` | 常量 | <code>const artifactProfileSpecJsonSchema: JsonSchema</code> | Artifact Profile Spec 的 JSON Schema。 |
| `artifactProfileSpecSchema` | 常量 | <code>const artifactProfileSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { revision: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodOptional&lt;z.ZodString&gt;; storeRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }, { id: string; revisi...</code> | Artifact Profile Spec 的运行时 Schema。 |
| `artifactProvenanceJsonSchema` | 常量 | <code>const artifactProvenanceJsonSchema: JsonSchema</code> | Artifact Provenance 的 JSON Schema。 |
| `artifactProvenanceSchema` | 常量 | <code>const artifactProvenanceSchema: z.ZodEffects&lt;z.ZodObject&lt;{ sourceType: z.ZodEnum&lt;["user_upload", "agent_generated", "tool_generated", "command_generated", "derived", "imported", "snapshot", "patch"]&gt;; createdBy: z.ZodString; sourceEventId: z.ZodOptional&lt;z.ZodString&gt;; toolInvocationId: z.ZodOptional&lt;z.ZodString&gt;; executionId: z.ZodOptional&lt;z.ZodString&gt;; workflowState: z.ZodOptional&lt;z.ZodString&gt;; sourceArtifactIds: ...</code> | Artifact Provenance 的运行时 Schema。 |
| `artifactRecordExample` | 常量 | <code>const artifactRecordExample: ArtifactRecord</code> | Artifact Record 的有效示例值。 |
| `artifactRecordJsonSchema` | 常量 | <code>const artifactRecordJsonSchema: JsonSchema</code> | Artifact Record 的 JSON Schema。 |
| `artifactRecordSchema` | 常量 | <code>const artifactRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; versionNumber: z.ZodNumber; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; sessionId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; relativePath: ...</code> | Artifact Record 的运行时 Schema。 |
| `artifactRefExample` | 常量 | <code>const artifactRefExample: ArtifactRef</code> | Artifact Ref 的有效示例值。 |
| `artifactRefJsonSchema` | 常量 | <code>const artifactRefJsonSchema: JsonSchema</code> | Artifact Ref 的 JSON Schema。 |
| `artifactRefSchema` | 常量 | <code>const artifactRefSchema: z.ZodObject&lt;{ artifactId: z.ZodString; versionId: z.ZodOptional&lt;z.ZodString&gt;; contentHash: z.ZodString; kind: z.ZodOptional&lt;z.ZodEnum&lt;["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]&gt;&gt;; mimeType: z.ZodOptional&lt;z.ZodString&gt;; sizeBytes: z.ZodOptional...</code> | Artifact Ref 的运行时 Schema。 |
| `artifactRetentionPolicySpecJsonSchema` | 常量 | <code>const artifactRetentionPolicySpecJsonSchema: JsonSchema</code> | Artifact Retention Policy Spec 的 JSON Schema。 |
| `artifactRetentionPolicySpecSchema` | 常量 | <code>const artifactRetentionPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ defaultTtlSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; archiveAfterSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; deleteAfterSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; retainFinal: z.ZodOptional&lt;z.ZodBoolean&gt;; retainOnFailure: z.ZodOptional&lt;z.ZodBoolean&gt;; legalHoldSupported: z.ZodOptional&lt;z.ZodBoolean&gt;; garbageCollectUnreferenced: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict"...</code> | Artifact Retention Policy Spec 的运行时 Schema。 |
| `artifactRetentionRecordJsonSchema` | 常量 | <code>const artifactRetentionRecordJsonSchema: JsonSchema</code> | Artifact Retention Record 的 JSON Schema。 |
| `artifactRetentionRecordSchema` | 常量 | <code>const artifactRetentionRecordSchema: z.ZodObject&lt;{ policyRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }&gt;&gt;; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; archivedAt: ...</code> | Artifact Retention Record 的运行时 Schema。 |
| `artifactStatusSchema` | 常量 | <code>const artifactStatusSchema: z.ZodEnum&lt;["creating", "draft", "final", "archived", "invalidated", "deletion_pending", "deleted", "failed"]&gt;</code> | Artifact Status 的运行时 Schema。 |
| `artifactStorageRefJsonSchema` | 常量 | <code>const artifactStorageRefJsonSchema: JsonSchema</code> | Artifact Storage Ref 的 JSON Schema。 |
| `artifactStorageRefSchema` | 常量 | <code>const artifactStorageRefSchema: z.ZodObject&lt;{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional&lt;z.ZodString&gt;; objectKey: z.ZodString; versionId: z.ZodOptional&lt;z.ZodString&gt;; etag: z.ZodOptional&lt;z.ZodString&gt;; region: z.ZodOptional&lt;z.ZodString&gt;; encrypted: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: string &#124; undefined; bucketOrNamespace?: string &#124; und...</code> | Artifact Storage Ref 的运行时 Schema。 |
| `artifactValidationPolicySpecJsonSchema` | 常量 | <code>const artifactValidationPolicySpecJsonSchema: JsonSchema</code> | Artifact Validation Policy Spec 的 JSON Schema。 |
| `artifactValidationPolicySpecSchema` | 常量 | <code>const artifactValidationPolicySpecSchema: z.ZodObject&lt;{ verifyMimeType: z.ZodOptional&lt;z.ZodBoolean&gt;; verifyExtension: z.ZodOptional&lt;z.ZodBoolean&gt;; malwareScanRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }, { id: string; revision?: strin...</code> | Artifact Validation Policy Spec 的运行时 Schema。 |
| `artifactVersioningPolicySpecJsonSchema` | 常量 | <code>const artifactVersioningPolicySpecJsonSchema: JsonSchema</code> | Artifact Versioning Policy Spec 的 JSON Schema。 |
| `artifactVersioningPolicySpecSchema` | 常量 | <code>const artifactVersioningPolicySpecSchema: z.ZodObject&lt;{ strategy: z.ZodLiteral&lt;"append_only"&gt;; retainPreviousVersions: z.ZodLiteral&lt;true&gt;; maxVersions: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodTypeAny, { strategy: "append_only"; retainPreviousVersions: true; maxVersions?: number &#124; undefined; }, { strategy: "append_only"; retainPreviousVersions: true; maxVersions?: number &#124; undefined; }&gt;</code> | Artifact Versioning Policy Spec 的运行时 Schema。 |
| `storedArtifactRecordSchema` | 常量 | <code>const storedArtifactRecordSchema: z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; versionNumber: z.ZodNumber; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; sessionId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodString; description: z.ZodOptional&lt;...</code> | Stored Artifact Record 的运行时 Schema。 |
| `validateArtifactLineage` | 函数 | <code>validateArtifactLineage(input: unknown): ArtifactLineage</code> | Validate Artifact Lineage 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactProfileSpec` | 函数 | <code>validateArtifactProfileSpec(input: unknown): ArtifactProfileSpec</code> | Validate Artifact Profile Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactRecord` | 函数 | <code>validateArtifactRecord(input: unknown): ArtifactRecord</code> | Validate Artifact Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactRef` | 函数 | <code>validateArtifactRef(input: unknown): ArtifactRef</code> | Validate Artifact Ref 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateStoredArtifactRecord` | 函数 | <code>validateStoredArtifactRecord(input: unknown): StoredArtifactRecord</code> | Validate Stored Artifact Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateStoredArtifactRecords` | 函数 | <code>validateStoredArtifactRecords(input: unknown): StoredArtifactRecord[]</code> | Validate Stored Artifact Records 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `artifactAccessPolicySpecJsonSchema`

Artifact Access Policy Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactAccessPolicySpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactAccessPolicySpecJsonSchema: JsonSchema;
```

## `artifactAccessPolicySpecSchema`

Artifact Access Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactAccessPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactAccessPolicySpecSchema: z.ZodEffects<z.ZodObject<{ defaultVisibility: z.ZodEnum<["private", "session", "workspace", "tenant", "shared"]>; allowedPrincipalTypes: z.ZodOptional<z.ZodArray<z.ZodEnum<["user", "agent", "service", "system"]>, "many">>; requiredReadScopes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; requiredWriteScopes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; requiredDeleteScopes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; signedUrlTtlSeconds: z.ZodOptional<z.ZodNumber>; allowRangeRead: z.ZodOptional<z.ZodBoolean>; allowCrossWorkspaceCopy: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { defaultVisibility: "private" | "session" | "workspace" | "tenant" | "shared"; allowedPrincipalTypes?: ("user" | "agent" | "service" | "system")[] | undefined; requiredReadScopes?: string[] | undefined; requiredWriteScopes?: string[] | undefined; requiredDeleteScopes?: string[] | undefined; signedUrlTtlSeconds?: number | undefined; allowRangeRead?: boolean | undefined; allowCrossWorkspaceCopy?: boolean | undefined; }, { defaultVisibility: "private" | "session" | "workspace" | "tenant" | "shared"; allowedPrincipalTypes?: ("user" | "agent" | "service" | "system")[] | undefined; requiredReadScopes?: string[] | undefined; requiredWriteScopes?: string[] | undefined; requiredDeleteScopes?: string[] | undefined; signedUrlTtlSeconds?: number | undefined; allowRangeRead?: boolean | undefined; allowCrossWorkspaceCopy?: boolean | undefined; }>, { defaultVisibility: "private" | "session" | "workspace" | "tenant" | "shared"; allowedPrincipalTypes?: ("user" | "agent" | "service" | "system")[] | undefined; requiredReadScopes?: string[] | undefined; requiredWriteScopes?: string[] | undefined; requiredDeleteScopes?: string[] | undefined; signedUrlTtlSeconds?: number | undefined; allowRangeRead?: boolean | undefined; allowCrossWorkspaceCopy?: boolean | undefined; }, { defaultVisibility: "private" | "session" | "workspace" | "tenant" | "shared"; allowedPrincipalTypes?: ("user" | "agent" | "service" | "system")[] | undefined; requiredReadScopes?: string[] | undefined; requiredWriteScopes?: string[] | undefined; requiredDeleteScopes?: string[] | undefined; signedUrlTtlSeconds?: number | undefined; allowRangeRead?: boolean | undefined; allowCrossWorkspaceCopy?: boolean | undefined; }>;
```

## `artifactAccessRecordJsonSchema`

Artifact Access Record 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactAccessRecordJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactAccessRecordJsonSchema: JsonSchema;
```

## `artifactAccessRecordSchema`

Artifact Access Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactAccessRecordSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactAccessRecordSchema: z.ZodEffects<z.ZodObject<{ visibility: z.ZodEnum<["private", "session", "workspace", "tenant", "shared"]>; ownerPrincipalId: z.ZodString; workspaceId: z.ZodString; allowedPrincipalIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; allowedRoles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strict", z.ZodTypeAny, { workspaceId: string; visibility: "private" | "session" | "workspace" | "tenant" | "shared"; ownerPrincipalId: string; allowedPrincipalIds?: string[] | undefined; allowedRoles?: string[] | undefined; }, { workspaceId: string; visibility: "private" | "session" | "workspace" | "tenant" | "shared"; ownerPrincipalId: string; allowedPrincipalIds?: string[] | undefined; allowedRoles?: string[] | undefined; }>, { workspaceId: string; visibility: "private" | "session" | "workspace" | "tenant" | "shared"; ownerPrincipalId: string; allowedPrincipalIds?: string[] | undefined; allowedRoles?: string[] | undefined; }, { workspaceId: string; visibility: "private" | "session" | "workspace" | "tenant" | "shared"; ownerPrincipalId: string; allowedPrincipalIds?: string[] | undefined; allowedRoles?: string[] | undefined; }>;
```

## `artifactContentAddressingSpecJsonSchema`

Artifact Content Addressing Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactContentAddressingSpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactContentAddressingSpecJsonSchema: JsonSchema;
```

## `artifactContentAddressingSpecSchema`

Artifact Content Addressing Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactContentAddressingSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactContentAddressingSpecSchema: z.ZodObject<{ hashAlgorithm: z.ZodEnum<["sha256", "blake3"]>; verifyOnRead: z.ZodBoolean; deduplicate: z.ZodBoolean; }, "strict", z.ZodTypeAny, { hashAlgorithm: "sha256" | "blake3"; verifyOnRead: boolean; deduplicate: boolean; }, { hashAlgorithm: "sha256" | "blake3"; verifyOnRead: boolean; deduplicate: boolean; }>;
```

## `artifactContentHashSchema`

Artifact Content Hash 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactContentHashSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactContentHashSchema: z.ZodString;
```

## `artifactContractJsonSchemas`

由 `modules/artifact/index` 模块导出的 Artifact Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { artifactContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactContractJsonSchemas: Record<string, JsonSchema>;
```

## `artifactHashAlgorithmSchema`

Artifact Hash Algorithm 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactHashAlgorithmSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactHashAlgorithmSchema: z.ZodEnum<["sha256", "blake3"]>;
```

## `artifactKindSchema`

Artifact Kind 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactKindSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactKindSchema: z.ZodEnum<["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]>;
```

## `artifactLineageExample`

Artifact Lineage 的有效示例值。

- 种类: 常量
- 导入: `import { artifactLineageExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactLineageExample: ArtifactLineage;
```

## `artifactLineageJsonSchema`

Artifact Lineage 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactLineageJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactLineageJsonSchema: JsonSchema;
```

## `artifactLineageNodeJsonSchema`

Artifact Lineage Node 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactLineageNodeJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactLineageNodeJsonSchema: JsonSchema;
```

## `artifactLineageNodeSchema`

Artifact Lineage Node 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactLineageNodeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactLineageNodeSchema: z.ZodObject<{ artifactId: z.ZodString; versionId: z.ZodString; logicalArtifactId: z.ZodString; contentHash: z.ZodString; kind: z.ZodOptional<z.ZodEnum<["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]>>; transformation: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { versionId: string; contentHash: string; logicalArtifactId: string; artifactId: string; kind?: "document" | "code" | "dataset" | "image" | "audio" | "video" | "table" | "report" | "archive" | "patch" | "snapshot" | "test_report" | "build_output" | "log" | "tool_output" | "execution_receipt" | "other" | undefined; transformation?: string | undefined; }, { versionId: string; contentHash: string; logicalArtifactId: string; artifactId: string; kind?: "document" | "code" | "dataset" | "image" | "audio" | "video" | "table" | "report" | "archive" | "patch" | "snapshot" | "test_report" | "build_output" | "log" | "tool_output" | "execution_receipt" | "other" | undefined; transformation?: string | undefined; }>;
```

## `artifactLineageSchema`

Artifact Lineage 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactLineageSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const artifactLineageSchema: (typeof import('@codesoul-co/hypha-core'))['artifactLineageSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `artifactPreviewPolicySpecJsonSchema`

Artifact Preview Policy Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactPreviewPolicySpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactPreviewPolicySpecJsonSchema: JsonSchema;
```

## `artifactPreviewPolicySpecSchema`

Artifact Preview Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactPreviewPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactPreviewPolicySpecSchema: z.ZodEffects<z.ZodObject<{ enabled: z.ZodBoolean; maxPreviewBytes: z.ZodOptional<z.ZodNumber>; allowedMimeTypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strict", z.ZodTypeAny, { enabled: boolean; maxPreviewBytes?: number | undefined; allowedMimeTypes?: string[] | undefined; }, { enabled: boolean; maxPreviewBytes?: number | undefined; allowedMimeTypes?: string[] | undefined; }>, { enabled: boolean; maxPreviewBytes?: number | undefined; allowedMimeTypes?: string[] | undefined; }, { enabled: boolean; maxPreviewBytes?: number | undefined; allowedMimeTypes?: string[] | undefined; }>;
```

## `artifactProfileSpecExample`

Artifact Profile Spec 的有效示例值。

- 种类: 常量
- 导入: `import { artifactProfileSpecExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactProfileSpecExample: ArtifactProfileSpec;
```

## `artifactProfileSpecJsonSchema`

Artifact Profile Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactProfileSpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactProfileSpecJsonSchema: JsonSchema;
```

## `artifactProfileSpecSchema`

Artifact Profile Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactProfileSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const artifactProfileSpecSchema: (typeof import('@codesoul-co/hypha-core'))['artifactProfileSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `artifactProvenanceJsonSchema`

Artifact Provenance 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactProvenanceJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactProvenanceJsonSchema: JsonSchema;
```

## `artifactProvenanceSchema`

Artifact Provenance 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactProvenanceSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactProvenanceSchema: z.ZodEffects<z.ZodObject<{ sourceType: z.ZodEnum<["user_upload", "agent_generated", "tool_generated", "command_generated", "derived", "imported", "snapshot", "patch"]>; createdBy: z.ZodString; sourceEventId: z.ZodOptional<z.ZodString>; toolInvocationId: z.ZodOptional<z.ZodString>; executionId: z.ZodOptional<z.ZodString>; workflowState: z.ZodOptional<z.ZodString>; sourceArtifactIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; transformation: z.ZodOptional<z.ZodString>; environmentHash: z.ZodOptional<z.ZodString>; commandHash: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { sourceType: "patch" | "snapshot" | "user_upload" | "agent_generated" | "tool_generated" | "command_generated" | "derived" | "imported"; createdBy: string; sourceArtifactIds?: string[] | undefined; sourceEventId?: string | undefined; toolInvocationId?: string | undefined; executionId?: string | undefined; workflowState?: string | undefined; transformation?: string | undefined; environmentHash?: string | undefined; commandHash?: string | undefined; metadata?: Record<string, unknown> | undefined; }, { sourceType: "patch" | "snapshot" | "user_upload" | "agent_generated" | "tool_generated" | "command_generated" | "derived" | "imported"; createdBy: string; sourceArtifactIds?: string[] | undefined; sourceEventId?: string | undefined; toolInvocationId?: string | undefined; executionId?: string | undefined; workflowState?: string | undefined; transformation?: string | undefined; environmentHash?: string | undefined; commandHash?: string | undefined; metadata?: Record<string, unknown> | undefined; }>, { sourceType: "patch" | "snapshot" | "user_upload" | "agent_generated" | "tool_generated" | "command_generated" | "derived" | "imported"; createdBy: string; sourceArtifactIds?: string[] | undefined; sourceEventId?: string | undefined; toolInvocationId?: string | undefined; executionId?: string | undefined; workflowState?: string | undefined; transformation?: string | undefined; environmentHash?: string | undefined; commandHash?: string | undefined; metadata?: Record<string, unknown> | undefined; }, { sourceType: "patch" | "snapshot" | "user_upload" | "agent_generated" | "tool_generated" | "command_generated" | "derived" | "imported"; createdBy: string; sourceArtifactIds?: string[] | undefined; sourceEventId?: string | undefined; toolInvocationId?: string | undefined; executionId?: string | undefined; workflowState?: string | undefined; transformation?: string | undefined; environmentHash?: string | undefined; commandHash?: string | undefined; metadata?: Record<string, unknown> | undefined; }>;
```

## `artifactRecordExample`

Artifact Record 的有效示例值。

- 种类: 常量
- 导入: `import { artifactRecordExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactRecordExample: ArtifactRecord;
```

## `artifactRecordJsonSchema`

Artifact Record 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactRecordJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactRecordJsonSchema: JsonSchema;
```

## `artifactRecordSchema`

Artifact Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactRecordSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const artifactRecordSchema: (typeof import('@codesoul-co/hypha-core'))['artifactRecordSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `artifactRefExample`

Artifact Ref 的有效示例值。

- 种类: 常量
- 导入: `import { artifactRefExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactRefExample: ArtifactRef;
```

## `artifactRefJsonSchema`

Artifact Ref 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactRefJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactRefJsonSchema: JsonSchema;
```

## `artifactRefSchema`

Artifact Ref 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactRefSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactRefSchema: z.ZodObject<{ artifactId: z.ZodString; versionId: z.ZodOptional<z.ZodString>; contentHash: z.ZodString; kind: z.ZodOptional<z.ZodEnum<["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]>>; mimeType: z.ZodOptional<z.ZodString>; sizeBytes: z.ZodOptional<z.ZodNumber>; accessTokenRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { contentHash: string; artifactId: string; versionId?: string | undefined; kind?: "document" | "code" | "dataset" | "image" | "audio" | "video" | "table" | "report" | "archive" | "patch" | "snapshot" | "test_report" | "build_output" | "log" | "tool_output" | "execution_receipt" | "other" | undefined; mimeType?: string | undefined; sizeBytes?: number | undefined; accessTokenRef?: string | undefined; }, { contentHash: string; artifactId: string; versionId?: string | undefined; kind?: "document" | "code" | "dataset" | "image" | "audio" | "video" | "table" | "report" | "archive" | "patch" | "snapshot" | "test_report" | "build_output" | "log" | "tool_output" | "execution_receipt" | "other" | undefined; mimeType?: string | undefined; sizeBytes?: number | undefined; accessTokenRef?: string | undefined; }>;
```

## `artifactRetentionPolicySpecJsonSchema`

Artifact Retention Policy Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactRetentionPolicySpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactRetentionPolicySpecJsonSchema: JsonSchema;
```

## `artifactRetentionPolicySpecSchema`

Artifact Retention Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactRetentionPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactRetentionPolicySpecSchema: z.ZodEffects<z.ZodObject<{ defaultTtlSeconds: z.ZodOptional<z.ZodNumber>; archiveAfterSeconds: z.ZodOptional<z.ZodNumber>; deleteAfterSeconds: z.ZodOptional<z.ZodNumber>; retainFinal: z.ZodOptional<z.ZodBoolean>; retainOnFailure: z.ZodOptional<z.ZodBoolean>; legalHoldSupported: z.ZodOptional<z.ZodBoolean>; garbageCollectUnreferenced: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { defaultTtlSeconds?: number | undefined; archiveAfterSeconds?: number | undefined; deleteAfterSeconds?: number | undefined; retainFinal?: boolean | undefined; retainOnFailure?: boolean | undefined; legalHoldSupported?: boolean | undefined; garbageCollectUnreferenced?: boolean | undefined; }, { defaultTtlSeconds?: number | undefined; archiveAfterSeconds?: number | undefined; deleteAfterSeconds?: number | undefined; retainFinal?: boolean | undefined; retainOnFailure?: boolean | undefined; legalHoldSupported?: boolean | undefined; garbageCollectUnreferenced?: boolean | undefined; }>, { defaultTtlSeconds?: number | undefined; archiveAfterSeconds?: number | undefined; deleteAfterSeconds?: number | undefined; retainFinal?: boolean | undefined; retainOnFailure?: boolean | undefined; legalHoldSupported?: boolean | undefined; garbageCollectUnreferenced?: boolean | undefined; }, { defaultTtlSeconds?: number | undefined; archiveAfterSeconds?: number | undefined; deleteAfterSeconds?: number | undefined; retainFinal?: boolean | undefined; retainOnFailure?: boolean | undefined; legalHoldSupported?: boolean | undefined; garbageCollectUnreferenced?: boolean | undefined; }>;
```

## `artifactRetentionRecordJsonSchema`

Artifact Retention Record 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactRetentionRecordJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactRetentionRecordJsonSchema: JsonSchema;
```

## `artifactRetentionRecordSchema`

Artifact Retention Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactRetentionRecordSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactRetentionRecordSchema: z.ZodObject<{ policyRef: z.ZodOptional<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>>; expiresAt: z.ZodOptional<z.ZodString>; archivedAt: z.ZodOptional<z.ZodString>; legalHold: z.ZodOptional<z.ZodBoolean>; referencedByCount: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { policyRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; expiresAt?: string | undefined; archivedAt?: string | undefined; legalHold?: boolean | undefined; referencedByCount?: number | undefined; }, { policyRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; expiresAt?: string | undefined; archivedAt?: string | undefined; legalHold?: boolean | undefined; referencedByCount?: number | undefined; }>;
```

## `artifactStatusSchema`

Artifact Status 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactStatusSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactStatusSchema: z.ZodEnum<["creating", "draft", "final", "archived", "invalidated", "deletion_pending", "deleted", "failed"]>;
```

## `artifactStorageRefJsonSchema`

Artifact Storage Ref 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactStorageRefJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactStorageRefJsonSchema: JsonSchema;
```

## `artifactStorageRefSchema`

Artifact Storage Ref 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactStorageRefSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactStorageRefSchema: z.ZodObject<{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional<z.ZodString>; objectKey: z.ZodString; versionId: z.ZodOptional<z.ZodString>; etag: z.ZodOptional<z.ZodString>; region: z.ZodOptional<z.ZodString>; encrypted: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }>;
```

## `artifactValidationPolicySpecJsonSchema`

Artifact Validation Policy Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactValidationPolicySpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactValidationPolicySpecJsonSchema: JsonSchema;
```

## `artifactValidationPolicySpecSchema`

Artifact Validation Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactValidationPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactValidationPolicySpecSchema: z.ZodObject<{ verifyMimeType: z.ZodOptional<z.ZodBoolean>; verifyExtension: z.ZodOptional<z.ZodBoolean>; malwareScanRef: z.ZodOptional<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>>; archiveBombProtection: z.ZodOptional<z.ZodBoolean>; maxExpandedBytes: z.ZodOptional<z.ZodNumber>; checksumRequired: z.ZodOptional<z.ZodBoolean>; rejectExecutableUploads: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { verifyMimeType?: boolean | undefined; verifyExtension?: boolean | undefined; malwareScanRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; archiveBombProtection?: boolean | undefined; maxExpandedBytes?: number | undefined; checksumRequired?: boolean | undefined; rejectExecutableUploads?: boolean | undefined; }, { verifyMimeType?: boolean | undefined; verifyExtension?: boolean | undefined; malwareScanRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; archiveBombProtection?: boolean | undefined; maxExpandedBytes?: number | undefined; checksumRequired?: boolean | undefined; rejectExecutableUploads?: boolean | undefined; }>;
```

## `artifactVersioningPolicySpecJsonSchema`

Artifact Versioning Policy Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactVersioningPolicySpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactVersioningPolicySpecJsonSchema: JsonSchema;
```

## `artifactVersioningPolicySpecSchema`

Artifact Versioning Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactVersioningPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare const artifactVersioningPolicySpecSchema: z.ZodObject<{ strategy: z.ZodLiteral<"append_only">; retainPreviousVersions: z.ZodLiteral<true>; maxVersions: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { strategy: "append_only"; retainPreviousVersions: true; maxVersions?: number | undefined; }, { strategy: "append_only"; retainPreviousVersions: true; maxVersions?: number | undefined; }>;
```

## `storedArtifactRecordSchema`

Stored Artifact Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { storedArtifactRecordSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const storedArtifactRecordSchema: (typeof import('@codesoul-co/hypha-core'))['storedArtifactRecordSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `validateArtifactLineage`

Validate Artifact Lineage 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactLineage } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare function validateArtifactLineage(input: unknown): ArtifactLineage;
```

### 调用签名

```text
validateArtifactLineage(input: unknown): ArtifactLineage
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactLineage`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactProfileSpec`

Validate Artifact Profile Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactProfileSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare function validateArtifactProfileSpec(input: unknown): ArtifactProfileSpec;
```

### 调用签名

```text
validateArtifactProfileSpec(input: unknown): ArtifactProfileSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactProfileSpec`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactRecord`

Validate Artifact Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare function validateArtifactRecord(input: unknown): ArtifactRecord;
```

### 调用签名

```text
validateArtifactRecord(input: unknown): ArtifactRecord
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactRecord`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactRef`

Validate Artifact Ref 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactRef } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare function validateArtifactRef(input: unknown): ArtifactRef;
```

### 调用签名

```text
validateArtifactRef(input: unknown): ArtifactRef
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactRef`
- 说明: 返回值契约由上述类型定义。

## `validateStoredArtifactRecord`

Validate Stored Artifact Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateStoredArtifactRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare function validateStoredArtifactRecord(input: unknown): StoredArtifactRecord;
```

### 调用签名

```text
validateStoredArtifactRecord(input: unknown): StoredArtifactRecord
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StoredArtifactRecord`
- 说明: 返回值契约由上述类型定义。

## `validateStoredArtifactRecords`

Validate Stored Artifact Records 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateStoredArtifactRecords } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### 声明

```text
export declare function validateStoredArtifactRecords(input: unknown): StoredArtifactRecord[];
```

### 调用签名

```text
validateStoredArtifactRecords(input: unknown): StoredArtifactRecord[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StoredArtifactRecord[]`
- 说明: 返回值契约由上述类型定义。
