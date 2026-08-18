# `@codesoul-co/hypha-core` / `contracts/artifact`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/artifact.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)
- Exports: **18**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactAccessPolicySpec` | interface | <code>interface ArtifactAccessPolicySpec</code> | Field contract for Artifact Access Policy Spec; see all contract members below. |
| `ArtifactAccessRecord` | interface | <code>interface ArtifactAccessRecord</code> | Field contract for Artifact Access Record; see all contract members below. |
| `ArtifactContentAddressingSpec` | interface | <code>interface ArtifactContentAddressingSpec</code> | Field contract for Artifact Content Addressing Spec; see all contract members below. |
| `ArtifactLineage` | interface | <code>interface ArtifactLineage</code> | Field contract for Artifact Lineage; see all contract members below. |
| `ArtifactLineageNode` | interface | <code>interface ArtifactLineageNode</code> | Field contract for Artifact Lineage Node; see all contract members below. |
| `ArtifactPreviewPolicySpec` | interface | <code>interface ArtifactPreviewPolicySpec</code> | Field contract for Artifact Preview Policy Spec; see all contract members below. |
| `ArtifactProfileSpec` | interface | <code>interface ArtifactProfileSpec extends VersionedSpec</code> | Field contract for Artifact Profile Spec; see all contract members below. |
| `ArtifactProvenance` | interface | <code>interface ArtifactProvenance</code> | Field contract for Artifact Provenance; see all contract members below. |
| `ArtifactRecord` | interface | <code>interface ArtifactRecord</code> | Field contract for Artifact Record; see all contract members below. |
| `ArtifactRef` | interface | <code>interface ArtifactRef</code> | Field contract for Artifact Ref; see all contract members below. |
| `ArtifactRetentionPolicySpec` | interface | <code>interface ArtifactRetentionPolicySpec</code> | Field contract for Artifact Retention Policy Spec; see all contract members below. |
| `ArtifactRetentionRecord` | interface | <code>interface ArtifactRetentionRecord</code> | Field contract for Artifact Retention Record; see all contract members below. |
| `ArtifactStorageRef` | interface | <code>interface ArtifactStorageRef</code> | Field contract for Artifact Storage Ref; see all contract members below. |
| `ArtifactValidationPolicySpec` | interface | <code>interface ArtifactValidationPolicySpec</code> | Field contract for Artifact Validation Policy Spec; see all contract members below. |
| `ArtifactVersioningPolicySpec` | interface | <code>interface ArtifactVersioningPolicySpec</code> | Field contract for Artifact Versioning Policy Spec; see all contract members below. |
| `ArtifactHashAlgorithm` | type | <code>type ArtifactHashAlgorithm = 'sha256' &#124; 'blake3'</code> | Public type alias for Artifact Hash Algorithm. |
| `ArtifactKind` | type | <code>type ArtifactKind = 'document' &#124; 'code' &#124; 'dataset' &#124; 'image' &#124; 'audio' &#124; 'video' &#124; 'table' &#124; 'report' &#124; 'archive' &#124; 'patch' &#124; 'snapshot' &#124; 'test_report' &#124; 'build_output' &#124; 'log' &#124; 'tool_output' &#124; 'execution_receipt' &#124; 'other'</code> | Public type alias for Artifact Kind. |
| `ArtifactStatus` | type | <code>type ArtifactStatus = 'creating' &#124; 'draft' &#124; 'final' &#124; 'archived' &#124; 'invalidated' &#124; 'deletion_pending' &#124; 'deleted' &#124; 'failed'</code> | Public type alias for Artifact Status. |

## `ArtifactAccessPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowCrossWorkspaceCopy` | property | <code>allowCrossWorkspaceCopy: boolean</code> | Public allow Cross Workspace Copy property. |
| `allowedPrincipalTypes` | property | <code>allowedPrincipalTypes: ("system" &#124; "agent" &#124; "user" &#124; "service")[]</code> | Public allowed Principal Types property. |
| `allowRangeRead` | property | <code>allowRangeRead: boolean</code> | Public allow Range Read property. |
| `defaultVisibility` | property | <code>defaultVisibility: "workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant"</code> | Public default Visibility property. |
| `requiredDeleteScopes` | property | <code>requiredDeleteScopes: string[]</code> | Public required Delete Scopes property. |
| `requiredReadScopes` | property | <code>requiredReadScopes: string[]</code> | Public required Read Scopes property. |
| `requiredWriteScopes` | property | <code>requiredWriteScopes: string[]</code> | Public required Write Scopes property. |
| `signedUrlTtlSeconds` | property | <code>signedUrlTtlSeconds: number</code> | Public signed Url Ttl Seconds property. |

## `ArtifactAccessRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedPrincipalIds` | property | <code>allowedPrincipalIds: string[]</code> | Public allowed Principal Ids property. |
| `allowedRoles` | property | <code>allowedRoles: string[]</code> | Public allowed Roles property. |
| `ownerPrincipalId` | property | <code>ownerPrincipalId: string</code> | Public owner Principal Id property. |
| `visibility` | property | <code>visibility: "workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant"</code> | Public visibility property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ArtifactContentAddressingSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deduplicate` | property | <code>deduplicate: boolean</code> | Public deduplicate property. |
| `hashAlgorithm` | property | <code>hashAlgorithm: ArtifactHashAlgorithm</code> | Public hash Algorithm property. |
| `verifyOnRead` | property | <code>verifyOnRead: boolean</code> | Public verify On Read property. |

## `ArtifactLineage` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ancestors` | property | <code>ancestors: ArtifactLineageNode[]</code> | Public ancestors property. |
| `artifactId` | property | <code>artifactId: string</code> | Public artifact Id property. |
| `descendants` | property | <code>descendants: ArtifactLineageNode[]</code> | Public descendants property. |
| `versions` | property | <code>versions: ArtifactRecord[]</code> | Public versions property. |

## `ArtifactLineageNode` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public artifact Id property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `kind` | property | <code>kind: ArtifactKind</code> | Public kind property. |
| `logicalArtifactId` | property | <code>logicalArtifactId: string</code> | Public logical Artifact Id property. |
| `transformation` | property | <code>transformation: string</code> | Public transformation property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |

## `ArtifactPreviewPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedMimeTypes` | property | <code>allowedMimeTypes: string[]</code> | Public allowed Mime Types property. |
| `enabled` | property | <code>enabled: boolean</code> | Public enabled property. |
| `maxPreviewBytes` | property | <code>maxPreviewBytes: number</code> | Public max Preview Bytes property. |

## `ArtifactProfileSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `access` | property | <code>access: ArtifactAccessPolicySpec</code> | Public access property. |
| `allowedKinds` | property | <code>allowedKinds: ArtifactKind[]</code> | Public allowed Kinds property. |
| `allowedMimeTypes` | property | <code>allowedMimeTypes: string[]</code> | Public allowed Mime Types property. |
| `contentAddressing` | property | <code>contentAddressing: ArtifactContentAddressingSpec</code> | Public content Addressing property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `maxArtifactBytes` | property | <code>maxArtifactBytes: number</code> | Public max Artifact Bytes property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `preview` | property | <code>preview: ArtifactPreviewPolicySpec</code> | Public preview property. |
| `retention` | property | <code>retention: ArtifactRetentionPolicySpec</code> | Public retention property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `storeRef` | property | <code>storeRef: SpecRef</code> | Public store Ref property. |
| `validation` | property | <code>validation: ArtifactValidationPolicySpec</code> | Public validation property. |
| `version` | property | <code>version: string</code> | Public version property. |
| `versioning` | property | <code>versioning: ArtifactVersioningPolicySpec</code> | Public versioning property. |

## `ArtifactProvenance` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandHash` | property | <code>commandHash: string</code> | Public command Hash property. |
| `createdBy` | property | <code>createdBy: string</code> | Public created By property. |
| `environmentHash` | property | <code>environmentHash: string</code> | Public environment Hash property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `sourceArtifactIds` | property | <code>sourceArtifactIds: string[]</code> | Public source Artifact Ids property. |
| `sourceEventId` | property | <code>sourceEventId: string</code> | Public source Event Id property. |
| `sourceType` | property | <code>sourceType: "patch" &#124; "snapshot" &#124; "user_upload" &#124; "agent_generated" &#124; "tool_generated" &#124; "command_generated" &#124; "derived" &#124; "imported"</code> | Public source Type property. |
| `toolInvocationId` | property | <code>toolInvocationId: string</code> | Public tool Invocation Id property. |
| `transformation` | property | <code>transformation: string</code> | Public transformation property. |
| `workflowState` | property | <code>workflowState: string</code> | Public workflow State property. |

## `ArtifactRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `access` | property | <code>access: ArtifactAccessRecord</code> | Public access property. |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `archivedAt` | property | <code>archivedAt: string</code> | Public archived At property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `deduplicated` | property | <code>deduplicated: boolean</code> | True when this version reused an already committed content-addressed Blob. |
| `deletedAt` | property | <code>deletedAt: string</code> | Public deleted At property. |
| `derivedArtifactIds` | property | <code>derivedArtifactIds: string[]</code> | Public derived Artifact Ids property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `encoding` | property | <code>encoding: string</code> | Public encoding property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `finalizedAt` | property | <code>finalizedAt: string</code> | Public finalized At property. |
| `hashAlgorithm` | property | <code>hashAlgorithm: ArtifactHashAlgorithm</code> | Public hash Algorithm property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `immutable` | property | <code>immutable: boolean</code> | Public immutable property. |
| `kind` | property | <code>kind: ArtifactKind</code> | Public kind property. |
| `logicalArtifactId` | property | <code>logicalArtifactId: string</code> | Public logical Artifact Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `mimeType` | property | <code>mimeType: string</code> | Public mime Type property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `nextVersionId` | property | <code>nextVersionId: string</code> | Public next Version Id property. |
| `parentVersionId` | property | <code>parentVersionId: string</code> | Public parent Version Id property. |
| `previousVersionId` | property | <code>previousVersionId: string</code> | Public previous Version Id property. |
| `provenance` | property | <code>provenance: ArtifactProvenance</code> | Public provenance property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `retention` | property | <code>retention: ArtifactRetentionRecord</code> | Public retention property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sensitive` | property | <code>sensitive: boolean</code> | Public sensitive property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `sourceArtifactIds` | property | <code>sourceArtifactIds: string[]</code> | Public source Artifact Ids property. |
| `status` | property | <code>status: ArtifactStatus</code> | Public status property. |
| `storageRef` | property | <code>storageRef: ArtifactStorageRef</code> | Public storage Ref property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |
| `versionNumber` | property | <code>versionNumber: number</code> | Public version Number property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ArtifactRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `accessTokenRef` | property | <code>accessTokenRef: string</code> | Public access Token Ref property. |
| `artifactId` | property | <code>artifactId: string</code> | Public artifact Id property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `kind` | property | <code>kind: ArtifactKind</code> | Public kind property. |
| `mimeType` | property | <code>mimeType: string</code> | Public mime Type property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |

## `ArtifactRetentionPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archiveAfterSeconds` | property | <code>archiveAfterSeconds: number</code> | Public archive After Seconds property. |
| `defaultTtlSeconds` | property | <code>defaultTtlSeconds: number</code> | Public default Ttl Seconds property. |
| `deleteAfterSeconds` | property | <code>deleteAfterSeconds: number</code> | Public delete After Seconds property. |
| `garbageCollectUnreferenced` | property | <code>garbageCollectUnreferenced: boolean</code> | Public garbage Collect Unreferenced property. |
| `legalHoldSupported` | property | <code>legalHoldSupported: boolean</code> | Public legal Hold Supported property. |
| `retainFinal` | property | <code>retainFinal: boolean</code> | Public retain Final property. |
| `retainOnFailure` | property | <code>retainOnFailure: boolean</code> | Public retain On Failure property. |

## `ArtifactRetentionRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archivedAt` | property | <code>archivedAt: string</code> | Public archived At property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `legalHold` | property | <code>legalHold: boolean</code> | Public legal Hold property. |
| `policyRef` | property | <code>policyRef: SpecRef</code> | Public policy Ref property. |
| `referencedByCount` | property | <code>referencedByCount: number</code> | Public referenced By Count property. |

## `ArtifactStorageRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `bucketOrNamespace` | property | <code>bucketOrNamespace: string</code> | Public bucket Or Namespace property. |
| `encrypted` | property | <code>encrypted: boolean</code> | Public encrypted property. |
| `etag` | property | <code>etag: string</code> | Public etag property. |
| `objectKey` | property | <code>objectKey: string</code> | Public object Key property. |
| `region` | property | <code>region: string</code> | Public region property. |
| `storeId` | property | <code>storeId: string</code> | Public store Id property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |

## `ArtifactValidationPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archiveBombProtection` | property | <code>archiveBombProtection: boolean</code> | Public archive Bomb Protection property. |
| `checksumRequired` | property | <code>checksumRequired: boolean</code> | Public checksum Required property. |
| `malwareScanRef` | property | <code>malwareScanRef: SpecRef</code> | Public malware Scan Ref property. |
| `maxExpandedBytes` | property | <code>maxExpandedBytes: number</code> | Public max Expanded Bytes property. |
| `rejectExecutableUploads` | property | <code>rejectExecutableUploads: boolean</code> | Public reject Executable Uploads property. |
| `verifyExtension` | property | <code>verifyExtension: boolean</code> | Public verify Extension property. |
| `verifyMimeType` | property | <code>verifyMimeType: boolean</code> | Public verify Mime Type property. |

## `ArtifactVersioningPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxVersions` | property | <code>maxVersions: number</code> | Public max Versions property. |
| `retainPreviousVersions` | property | <code>retainPreviousVersions: true</code> | Public retain Previous Versions property. |
| `strategy` | property | <code>strategy: "append_only"</code> | E4 guarantees immutable history; replacement semantics are deliberately unsupported. |
