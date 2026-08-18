# `@codesoul-co/hypha-core` / `contracts/artifact`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/artifact.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)
- 导出数: **18**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactAccessPolicySpec` | 接口 | <code>interface ArtifactAccessPolicySpec</code> | Artifact Access Policy Spec 的字段契约；完整字段见下表。 |
| `ArtifactAccessRecord` | 接口 | <code>interface ArtifactAccessRecord</code> | Artifact Access Record 的字段契约；完整字段见下表。 |
| `ArtifactContentAddressingSpec` | 接口 | <code>interface ArtifactContentAddressingSpec</code> | Artifact Content Addressing Spec 的字段契约；完整字段见下表。 |
| `ArtifactLineage` | 接口 | <code>interface ArtifactLineage</code> | Artifact Lineage 的字段契约；完整字段见下表。 |
| `ArtifactLineageNode` | 接口 | <code>interface ArtifactLineageNode</code> | Artifact Lineage Node 的字段契约；完整字段见下表。 |
| `ArtifactPreviewPolicySpec` | 接口 | <code>interface ArtifactPreviewPolicySpec</code> | Artifact Preview Policy Spec 的字段契约；完整字段见下表。 |
| `ArtifactProfileSpec` | 接口 | <code>interface ArtifactProfileSpec extends VersionedSpec</code> | Artifact Profile Spec 的字段契约；完整字段见下表。 |
| `ArtifactProvenance` | 接口 | <code>interface ArtifactProvenance</code> | Artifact Provenance 的字段契约；完整字段见下表。 |
| `ArtifactRecord` | 接口 | <code>interface ArtifactRecord</code> | Artifact Record 的字段契约；完整字段见下表。 |
| `ArtifactRef` | 接口 | <code>interface ArtifactRef</code> | Artifact Ref 的字段契约；完整字段见下表。 |
| `ArtifactRetentionPolicySpec` | 接口 | <code>interface ArtifactRetentionPolicySpec</code> | Artifact Retention Policy Spec 的字段契约；完整字段见下表。 |
| `ArtifactRetentionRecord` | 接口 | <code>interface ArtifactRetentionRecord</code> | Artifact Retention Record 的字段契约；完整字段见下表。 |
| `ArtifactStorageRef` | 接口 | <code>interface ArtifactStorageRef</code> | Artifact Storage Ref 的字段契约；完整字段见下表。 |
| `ArtifactValidationPolicySpec` | 接口 | <code>interface ArtifactValidationPolicySpec</code> | Artifact Validation Policy Spec 的字段契约；完整字段见下表。 |
| `ArtifactVersioningPolicySpec` | 接口 | <code>interface ArtifactVersioningPolicySpec</code> | Artifact Versioning Policy Spec 的字段契约；完整字段见下表。 |
| `ArtifactHashAlgorithm` | 类型 | <code>type ArtifactHashAlgorithm = 'sha256' &#124; 'blake3'</code> | Artifact Hash Algorithm 的公共类型别名。 |
| `ArtifactKind` | 类型 | <code>type ArtifactKind = 'document' &#124; 'code' &#124; 'dataset' &#124; 'image' &#124; 'audio' &#124; 'video' &#124; 'table' &#124; 'report' &#124; 'archive' &#124; 'patch' &#124; 'snapshot' &#124; 'test_report' &#124; 'build_output' &#124; 'log' &#124; 'tool_output' &#124; 'execution_receipt' &#124; 'other'</code> | Artifact Kind 的公共类型别名。 |
| `ArtifactStatus` | 类型 | <code>type ArtifactStatus = 'creating' &#124; 'draft' &#124; 'final' &#124; 'archived' &#124; 'invalidated' &#124; 'deletion_pending' &#124; 'deleted' &#124; 'failed'</code> | Artifact Status 的公共类型别名。 |

## `ArtifactAccessPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowCrossWorkspaceCopy` | 属性 | <code>allowCrossWorkspaceCopy: boolean</code> | allow Cross Workspace Copy 字段。 |
| `allowedPrincipalTypes` | 属性 | <code>allowedPrincipalTypes: ("system" &#124; "agent" &#124; "user" &#124; "service")[]</code> | allowed Principal Types 字段。 |
| `allowRangeRead` | 属性 | <code>allowRangeRead: boolean</code> | allow Range Read 字段。 |
| `defaultVisibility` | 属性 | <code>defaultVisibility: "workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant"</code> | default Visibility 字段。 |
| `requiredDeleteScopes` | 属性 | <code>requiredDeleteScopes: string[]</code> | required Delete Scopes 字段。 |
| `requiredReadScopes` | 属性 | <code>requiredReadScopes: string[]</code> | required Read Scopes 字段。 |
| `requiredWriteScopes` | 属性 | <code>requiredWriteScopes: string[]</code> | required Write Scopes 字段。 |
| `signedUrlTtlSeconds` | 属性 | <code>signedUrlTtlSeconds: number</code> | signed Url Ttl Seconds 字段。 |

## `ArtifactAccessRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedPrincipalIds` | 属性 | <code>allowedPrincipalIds: string[]</code> | allowed Principal Ids 字段。 |
| `allowedRoles` | 属性 | <code>allowedRoles: string[]</code> | allowed Roles 字段。 |
| `ownerPrincipalId` | 属性 | <code>ownerPrincipalId: string</code> | owner Principal Id 字段。 |
| `visibility` | 属性 | <code>visibility: "workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant"</code> | visibility 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ArtifactContentAddressingSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deduplicate` | 属性 | <code>deduplicate: boolean</code> | deduplicate 字段。 |
| `hashAlgorithm` | 属性 | <code>hashAlgorithm: ArtifactHashAlgorithm</code> | hash Algorithm 字段。 |
| `verifyOnRead` | 属性 | <code>verifyOnRead: boolean</code> | verify On Read 字段。 |

## `ArtifactLineage` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ancestors` | 属性 | <code>ancestors: ArtifactLineageNode[]</code> | ancestors 字段。 |
| `artifactId` | 属性 | <code>artifactId: string</code> | artifact Id 字段。 |
| `descendants` | 属性 | <code>descendants: ArtifactLineageNode[]</code> | descendants 字段。 |
| `versions` | 属性 | <code>versions: ArtifactRecord[]</code> | versions 字段。 |

## `ArtifactLineageNode` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | artifact Id 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `kind` | 属性 | <code>kind: ArtifactKind</code> | kind 字段。 |
| `logicalArtifactId` | 属性 | <code>logicalArtifactId: string</code> | logical Artifact Id 字段。 |
| `transformation` | 属性 | <code>transformation: string</code> | transformation 字段。 |
| `versionId` | 属性 | <code>versionId: string</code> | version Id 字段。 |

## `ArtifactPreviewPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedMimeTypes` | 属性 | <code>allowedMimeTypes: string[]</code> | allowed Mime Types 字段。 |
| `enabled` | 属性 | <code>enabled: boolean</code> | enabled 字段。 |
| `maxPreviewBytes` | 属性 | <code>maxPreviewBytes: number</code> | max Preview Bytes 字段。 |

## `ArtifactProfileSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `access` | 属性 | <code>access: ArtifactAccessPolicySpec</code> | access 字段。 |
| `allowedKinds` | 属性 | <code>allowedKinds: ArtifactKind[]</code> | allowed Kinds 字段。 |
| `allowedMimeTypes` | 属性 | <code>allowedMimeTypes: string[]</code> | allowed Mime Types 字段。 |
| `contentAddressing` | 属性 | <code>contentAddressing: ArtifactContentAddressingSpec</code> | content Addressing 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `maxArtifactBytes` | 属性 | <code>maxArtifactBytes: number</code> | max Artifact Bytes 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `preview` | 属性 | <code>preview: ArtifactPreviewPolicySpec</code> | preview 字段。 |
| `retention` | 属性 | <code>retention: ArtifactRetentionPolicySpec</code> | retention 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `storeRef` | 属性 | <code>storeRef: SpecRef</code> | store Ref 字段。 |
| `validation` | 属性 | <code>validation: ArtifactValidationPolicySpec</code> | validation 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
| `versioning` | 属性 | <code>versioning: ArtifactVersioningPolicySpec</code> | versioning 字段。 |

## `ArtifactProvenance` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandHash` | 属性 | <code>commandHash: string</code> | command Hash 字段。 |
| `createdBy` | 属性 | <code>createdBy: string</code> | created By 字段。 |
| `environmentHash` | 属性 | <code>environmentHash: string</code> | environment Hash 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `sourceArtifactIds` | 属性 | <code>sourceArtifactIds: string[]</code> | source Artifact Ids 字段。 |
| `sourceEventId` | 属性 | <code>sourceEventId: string</code> | source Event Id 字段。 |
| `sourceType` | 属性 | <code>sourceType: "patch" &#124; "snapshot" &#124; "user_upload" &#124; "agent_generated" &#124; "tool_generated" &#124; "command_generated" &#124; "derived" &#124; "imported"</code> | source Type 字段。 |
| `toolInvocationId` | 属性 | <code>toolInvocationId: string</code> | tool Invocation Id 字段。 |
| `transformation` | 属性 | <code>transformation: string</code> | transformation 字段。 |
| `workflowState` | 属性 | <code>workflowState: string</code> | workflow State 字段。 |

## `ArtifactRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `access` | 属性 | <code>access: ArtifactAccessRecord</code> | access 字段。 |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `archivedAt` | 属性 | <code>archivedAt: string</code> | archived At 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `deduplicated` | 属性 | <code>deduplicated: boolean</code> | True when this version reused an already committed content-addressed Blob. |
| `deletedAt` | 属性 | <code>deletedAt: string</code> | deleted At 字段。 |
| `derivedArtifactIds` | 属性 | <code>derivedArtifactIds: string[]</code> | derived Artifact Ids 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `encoding` | 属性 | <code>encoding: string</code> | encoding 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `finalizedAt` | 属性 | <code>finalizedAt: string</code> | finalized At 字段。 |
| `hashAlgorithm` | 属性 | <code>hashAlgorithm: ArtifactHashAlgorithm</code> | hash Algorithm 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `immutable` | 属性 | <code>immutable: boolean</code> | immutable 字段。 |
| `kind` | 属性 | <code>kind: ArtifactKind</code> | kind 字段。 |
| `logicalArtifactId` | 属性 | <code>logicalArtifactId: string</code> | logical Artifact Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `mimeType` | 属性 | <code>mimeType: string</code> | mime Type 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `nextVersionId` | 属性 | <code>nextVersionId: string</code> | next Version Id 字段。 |
| `parentVersionId` | 属性 | <code>parentVersionId: string</code> | parent Version Id 字段。 |
| `previousVersionId` | 属性 | <code>previousVersionId: string</code> | previous Version Id 字段。 |
| `provenance` | 属性 | <code>provenance: ArtifactProvenance</code> | provenance 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `retention` | 属性 | <code>retention: ArtifactRetentionRecord</code> | retention 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sensitive` | 属性 | <code>sensitive: boolean</code> | sensitive 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
| `sourceArtifactIds` | 属性 | <code>sourceArtifactIds: string[]</code> | source Artifact Ids 字段。 |
| `status` | 属性 | <code>status: ArtifactStatus</code> | status 字段。 |
| `storageRef` | 属性 | <code>storageRef: ArtifactStorageRef</code> | storage Ref 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `versionId` | 属性 | <code>versionId: string</code> | version Id 字段。 |
| `versionNumber` | 属性 | <code>versionNumber: number</code> | version Number 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ArtifactRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `accessTokenRef` | 属性 | <code>accessTokenRef: string</code> | access Token Ref 字段。 |
| `artifactId` | 属性 | <code>artifactId: string</code> | artifact Id 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `kind` | 属性 | <code>kind: ArtifactKind</code> | kind 字段。 |
| `mimeType` | 属性 | <code>mimeType: string</code> | mime Type 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
| `versionId` | 属性 | <code>versionId: string</code> | version Id 字段。 |

## `ArtifactRetentionPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archiveAfterSeconds` | 属性 | <code>archiveAfterSeconds: number</code> | archive After Seconds 字段。 |
| `defaultTtlSeconds` | 属性 | <code>defaultTtlSeconds: number</code> | default Ttl Seconds 字段。 |
| `deleteAfterSeconds` | 属性 | <code>deleteAfterSeconds: number</code> | delete After Seconds 字段。 |
| `garbageCollectUnreferenced` | 属性 | <code>garbageCollectUnreferenced: boolean</code> | garbage Collect Unreferenced 字段。 |
| `legalHoldSupported` | 属性 | <code>legalHoldSupported: boolean</code> | legal Hold Supported 字段。 |
| `retainFinal` | 属性 | <code>retainFinal: boolean</code> | retain Final 字段。 |
| `retainOnFailure` | 属性 | <code>retainOnFailure: boolean</code> | retain On Failure 字段。 |

## `ArtifactRetentionRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archivedAt` | 属性 | <code>archivedAt: string</code> | archived At 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `legalHold` | 属性 | <code>legalHold: boolean</code> | legal Hold 字段。 |
| `policyRef` | 属性 | <code>policyRef: SpecRef</code> | policy Ref 字段。 |
| `referencedByCount` | 属性 | <code>referencedByCount: number</code> | referenced By Count 字段。 |

## `ArtifactStorageRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `bucketOrNamespace` | 属性 | <code>bucketOrNamespace: string</code> | bucket Or Namespace 字段。 |
| `encrypted` | 属性 | <code>encrypted: boolean</code> | encrypted 字段。 |
| `etag` | 属性 | <code>etag: string</code> | etag 字段。 |
| `objectKey` | 属性 | <code>objectKey: string</code> | object Key 字段。 |
| `region` | 属性 | <code>region: string</code> | region 字段。 |
| `storeId` | 属性 | <code>storeId: string</code> | store Id 字段。 |
| `versionId` | 属性 | <code>versionId: string</code> | version Id 字段。 |

## `ArtifactValidationPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archiveBombProtection` | 属性 | <code>archiveBombProtection: boolean</code> | archive Bomb Protection 字段。 |
| `checksumRequired` | 属性 | <code>checksumRequired: boolean</code> | checksum Required 字段。 |
| `malwareScanRef` | 属性 | <code>malwareScanRef: SpecRef</code> | malware Scan Ref 字段。 |
| `maxExpandedBytes` | 属性 | <code>maxExpandedBytes: number</code> | max Expanded Bytes 字段。 |
| `rejectExecutableUploads` | 属性 | <code>rejectExecutableUploads: boolean</code> | reject Executable Uploads 字段。 |
| `verifyExtension` | 属性 | <code>verifyExtension: boolean</code> | verify Extension 字段。 |
| `verifyMimeType` | 属性 | <code>verifyMimeType: boolean</code> | verify Mime Type 字段。 |

## `ArtifactVersioningPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxVersions` | 属性 | <code>maxVersions: number</code> | max Versions 字段。 |
| `retainPreviousVersions` | 属性 | <code>retainPreviousVersions: true</code> | retain Previous Versions 字段。 |
| `strategy` | 属性 | <code>strategy: "append_only"</code> | E4 guarantees immutable history; replacement semantics are deliberately unsupported. |
