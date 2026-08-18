# `@codesoul-co/hypha-core` / `contracts/artifact-manager`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/artifact-manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)
- Exports: **21**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactCreateDownloadAccessRequest` | interface | <code>interface ArtifactCreateDownloadAccessRequest extends ArtifactGetRecordRequest</code> | Field contract for Artifact Create Download Access Request; see all contract members below. |
| `ArtifactCreateRequest` | interface | <code>interface ArtifactCreateRequest</code> | Field contract for Artifact Create Request; see all contract members below. |
| `ArtifactFromWorkspaceRequest` | interface | <code>interface ArtifactFromWorkspaceRequest</code> | Field contract for Artifact From Workspace Request; see all contract members below. |
| `ArtifactGetRecordRequest` | interface | <code>interface ArtifactGetRecordRequest</code> | Field contract for Artifact Get Record Request; see all contract members below. |
| `ArtifactLatestRequest` | interface | <code>interface ArtifactLatestRequest</code> | Field contract for Artifact Latest Request; see all contract members below. |
| `ArtifactListRequest` | interface | <code>interface ArtifactListRequest</code> | Field contract for Artifact List Request; see all contract members below. |
| `ArtifactManager` | interface | <code>interface ArtifactManager</code> | Field contract for Artifact Manager; see all contract members below. |
| `ArtifactMutationRequest` | interface | <code>interface ArtifactMutationRequest</code> | Field contract for Artifact Mutation Request; see all contract members below. |
| `ArtifactPreviousRequest` | interface | <code>interface ArtifactPreviousRequest</code> | Field contract for Artifact Previous Request; see all contract members below. |
| `ArtifactReadRequest` | interface | <code>interface ArtifactReadRequest extends ArtifactGetRecordRequest</code> | Field contract for Artifact Read Request; see all contract members below. |
| `ArtifactReadResult` | interface | <code>interface ArtifactReadResult</code> | Field contract for Artifact Read Result; see all contract members below. |
| `ArtifactTraceLineageRequest` | interface | <code>interface ArtifactTraceLineageRequest</code> | Field contract for Artifact Trace Lineage Request; see all contract members below. |
| `ArtifactVersionRequest` | interface | <code>interface ArtifactVersionRequest</code> | Field contract for Artifact Version Request; see all contract members below. |
| `ArtifactWorkspaceContent` | interface | <code>interface ArtifactWorkspaceContent</code> | Field contract for Artifact Workspace Content; see all contract members below. |
| `ArtifactWorkspaceContentReader` | interface | <code>interface ArtifactWorkspaceContentReader</code> | Governed Workspace port used by ArtifactManager; it never accepts a host path. |
| `ArtifactWorkspaceContentRequest` | interface | <code>interface ArtifactWorkspaceContentRequest</code> | Field contract for Artifact Workspace Content Request; see all contract members below. |
| `NormalizedArtifactError` | interface | <code>interface NormalizedArtifactError</code> | Field contract for Normalized Artifact Error; see all contract members below. |
| `ArtifactArchiveRequest` | type | <code>type ArtifactArchiveRequest = ArtifactMutationRequest</code> | Public type alias for Artifact Archive Request. |
| `ArtifactDeleteRequest` | type | <code>type ArtifactDeleteRequest = ArtifactMutationRequest</code> | Public type alias for Artifact Delete Request. |
| `ArtifactFinalizeRequest` | type | <code>type ArtifactFinalizeRequest = ArtifactMutationRequest</code> | Public type alias for Artifact Finalize Request. |
| `ArtifactInvalidateRequest` | type | <code>type ArtifactInvalidateRequest = ArtifactMutationRequest</code> | Public type alias for Artifact Invalidate Request. |

## `ArtifactCreateDownloadAccessRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public artifact Id property. |
| `expiresInSeconds` | property | <code>expiresInSeconds: number</code> | Public expires In Seconds property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `responseFilename` | property | <code>responseFilename: string</code> | Public response Filename property. |
| `responseMimeType` | property | <code>responseMimeType: string</code> | Public response Mime Type property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |

## `ArtifactCreateRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `access` | property | <code>access: ArtifactAccessRecord</code> | Public access property. |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `content` | property | <code>content: ArtifactByteSource</code> | Public content property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `encoding` | property | <code>encoding: string</code> | Public encoding property. |
| `expectedContentHash` | property | <code>expectedContentHash: string</code> | Public expected Content Hash property. |
| `expectedSizeBytes` | property | <code>expectedSizeBytes: number</code> | Public expected Size Bytes property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `kind` | property | <code>kind: ArtifactKind</code> | Public kind property. |
| `logicalArtifactId` | property | <code>logicalArtifactId: string</code> | Public logical Artifact Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `mimeType` | property | <code>mimeType: string</code> | Public mime Type property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public profile Ref property. |
| `provenance` | property | <code>provenance: ArtifactProvenance</code> | Public provenance property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `retention` | property | <code>retention: ArtifactRetentionRecord</code> | Public retention property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sensitive` | property | <code>sensitive: boolean</code> | Public sensitive property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ArtifactFromWorkspaceRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `expectedContentHash` | property | <code>expectedContentHash: string</code> | Public expected Content Hash property. |
| `expectedSizeBytes` | property | <code>expectedSizeBytes: number</code> | Public expected Size Bytes property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `kind` | property | <code>kind: ArtifactKind</code> | Public kind property. |
| `logicalArtifactId` | property | <code>logicalArtifactId: string</code> | Public logical Artifact Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `mimeType` | property | <code>mimeType: string</code> | Public mime Type property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public profile Ref property. |
| `provenance` | property | <code>provenance: ArtifactProvenance</code> | Public provenance property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `retention` | property | <code>retention: ArtifactRetentionRecord</code> | Public retention property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sensitive` | property | <code>sensitive: boolean</code> | Public sensitive property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ArtifactGetRecordRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public artifact Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |

## `ArtifactLatestRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `logicalArtifactId` | property | <code>logicalArtifactId: string</code> | Public logical Artifact Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |

## `ArtifactListRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `includeDeleted` | property | <code>includeDeleted: boolean</code> | Public include Deleted property. |
| `kinds` | property | <code>kinds: ArtifactKind[]</code> | Public kinds property. |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `logicalArtifactId` | property | <code>logicalArtifactId: string</code> | Public logical Artifact Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `statuses` | property | <code>statuses: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/contracts/artifact").ArtifactStatus[]</code> | Public statuses property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ArtifactManager` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archive` | method | <code>archive(request: ArtifactArchiveRequest): Promise&lt;ArtifactRecord&gt;</code> | Public runtime operation for archive. |
| `create` | method | <code>create(request: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Creates create at this module boundary. |
| `createDownloadAccess` | method | <code>createDownloadAccess(request: ArtifactCreateDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | Creates Download Access at this module boundary. |
| `createFromWorkspace` | method | <code>createFromWorkspace(request: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Creates From Workspace at this module boundary. |
| `createVersion` | method | <code>createVersion(request: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Creates Version at this module boundary. |
| `delete` | method | <code>delete(request: ArtifactDeleteRequest): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `finalize` | method | <code>finalize(request: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | Public runtime operation for finalize. |
| `get` | method | <code>get(request: ArtifactGetRecordRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | Public runtime operation for health. |
| `invalidate` | method | <code>invalidate(request: ArtifactInvalidateRequest): Promise&lt;ArtifactRecord&gt;</code> | Public runtime operation for invalidate. |
| `latest` | method | <code>latest(request: ArtifactLatestRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Public runtime operation for latest. |
| `list` | method | <code>list(request: ArtifactListRequest): Promise&lt;ArtifactRecord[]&gt;</code> | Lists list at this module boundary. |
| `previous` | method | <code>previous(request: ArtifactPreviousRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Public runtime operation for previous. |
| `profile` | method | <code>profile(ref: SpecRef): Promise&lt;ArtifactProfileSpec &#124; null&gt;</code> | Public runtime operation for profile. |
| `read` | method | <code>read(request: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactReadResult&gt;</code> | Public runtime operation for read. |
| `traceLineage` | method | <code>traceLineage(request: ArtifactTraceLineageRequest): Promise&lt;ArtifactLineage&gt;</code> | Public runtime operation for trace Lineage. |

## `ArtifactMutationRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public artifact Id property. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public expected Revision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |

## `ArtifactPreviousRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |

## `ArtifactReadRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public artifact Id property. |
| `expectedContentHash` | property | <code>expectedContentHash: string</code> | Public expected Content Hash property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `range` | property | <code>range: ArtifactByteRange</code> | Public range property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |

## `ArtifactReadResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: ArtifactContent</code> | Public content property. |
| `record` | property | <code>record: ArtifactRecord</code> | Public record property. |

## `ArtifactTraceLineageRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public artifact Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |

## `ArtifactVersionRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public artifact Id property. |
| `content` | property | <code>content: ArtifactByteSource</code> | Public content property. |
| `expectedContentHash` | property | <code>expectedContentHash: string</code> | Public expected Content Hash property. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public expected Revision property. |
| `expectedSizeBytes` | property | <code>expectedSizeBytes: number</code> | Public expected Size Bytes property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `provenance` | property | <code>provenance: ArtifactProvenance</code> | Public provenance property. |

## `ArtifactWorkspaceContent` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: ArtifactByteSource</code> | Public content property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `mimeType` | property | <code>mimeType: string</code> | Public mime Type property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |

## `ArtifactWorkspaceContentReader` contract members

Governed Workspace port used by ArtifactManager; it never accepts a host path.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `read` | method | <code>read(request: ArtifactWorkspaceContentRequest): Promise&lt;ArtifactWorkspaceContent&gt;</code> | Public runtime operation for read. |

## `ArtifactWorkspaceContentRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxBytes` | property | <code>maxBytes: number</code> | Public max Bytes property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `NormalizedArtifactError` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causeRef` | property | <code>causeRef: string</code> | Public cause Ref property. |
| `code` | property | <code>code: "ARTIFACT_INVALID_INPUT" &#124; "ARTIFACT_NOT_FOUND" &#124; "ARTIFACT_PERMISSION_DENIED" &#124; "ARTIFACT_TOO_LARGE" &#124; "ARTIFACT_TYPE_DENIED" &#124; "ARTIFACT_HASH_MISMATCH" &#124; "ARTIFACT_VERSION_CONFLICT" &#124; "ARTIFACT_STORE_UNAVAILABLE" &#124; "ARTIFACT_UPLOAD_FAILED" &#124; "ARTIFACT_DOWNLOAD_FAILED" &#124; "ARTIFACT_DELETE_BLOCKED" &#124; "ARTIFACT_DELETE_PARTIAL" &#124; "ARTIFACT_VALIDATION_FAILED" &#124; "ARTIFACT_INTERNAL_ERROR"</code> | Public code property. |
| `details` | property | <code>details: Record&lt;string, unknown&gt;</code> | Public details property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `retryable` | property | <code>retryable: boolean</code> | Public retryable property. |
