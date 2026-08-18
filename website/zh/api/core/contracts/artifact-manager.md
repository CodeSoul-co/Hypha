# `@codesoul-co/hypha-core` / `contracts/artifact-manager`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/artifact-manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)
- 导出数: **21**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactCreateDownloadAccessRequest` | 接口 | <code>interface ArtifactCreateDownloadAccessRequest extends ArtifactGetRecordRequest</code> | Artifact Create Download Access Request 的字段契约；完整字段见下表。 |
| `ArtifactCreateRequest` | 接口 | <code>interface ArtifactCreateRequest</code> | Artifact Create Request 的字段契约；完整字段见下表。 |
| `ArtifactFromWorkspaceRequest` | 接口 | <code>interface ArtifactFromWorkspaceRequest</code> | Artifact From Workspace Request 的字段契约；完整字段见下表。 |
| `ArtifactGetRecordRequest` | 接口 | <code>interface ArtifactGetRecordRequest</code> | Artifact Get Record Request 的字段契约；完整字段见下表。 |
| `ArtifactLatestRequest` | 接口 | <code>interface ArtifactLatestRequest</code> | Artifact Latest Request 的字段契约；完整字段见下表。 |
| `ArtifactListRequest` | 接口 | <code>interface ArtifactListRequest</code> | Artifact List Request 的字段契约；完整字段见下表。 |
| `ArtifactManager` | 接口 | <code>interface ArtifactManager</code> | Artifact Manager 的字段契约；完整字段见下表。 |
| `ArtifactMutationRequest` | 接口 | <code>interface ArtifactMutationRequest</code> | Artifact Mutation Request 的字段契约；完整字段见下表。 |
| `ArtifactPreviousRequest` | 接口 | <code>interface ArtifactPreviousRequest</code> | Artifact Previous Request 的字段契约；完整字段见下表。 |
| `ArtifactReadRequest` | 接口 | <code>interface ArtifactReadRequest extends ArtifactGetRecordRequest</code> | Artifact Read Request 的字段契约；完整字段见下表。 |
| `ArtifactReadResult` | 接口 | <code>interface ArtifactReadResult</code> | Artifact Read Result 的字段契约；完整字段见下表。 |
| `ArtifactTraceLineageRequest` | 接口 | <code>interface ArtifactTraceLineageRequest</code> | Artifact Trace Lineage Request 的字段契约；完整字段见下表。 |
| `ArtifactVersionRequest` | 接口 | <code>interface ArtifactVersionRequest</code> | Artifact Version Request 的字段契约；完整字段见下表。 |
| `ArtifactWorkspaceContent` | 接口 | <code>interface ArtifactWorkspaceContent</code> | Artifact Workspace Content 的字段契约；完整字段见下表。 |
| `ArtifactWorkspaceContentReader` | 接口 | <code>interface ArtifactWorkspaceContentReader</code> | Governed Workspace port used by ArtifactManager; it never accepts a host path. |
| `ArtifactWorkspaceContentRequest` | 接口 | <code>interface ArtifactWorkspaceContentRequest</code> | Artifact Workspace Content Request 的字段契约；完整字段见下表。 |
| `NormalizedArtifactError` | 接口 | <code>interface NormalizedArtifactError</code> | Normalized Artifact Error 的字段契约；完整字段见下表。 |
| `ArtifactArchiveRequest` | 类型 | <code>type ArtifactArchiveRequest = ArtifactMutationRequest</code> | Artifact Archive Request 的公共类型别名。 |
| `ArtifactDeleteRequest` | 类型 | <code>type ArtifactDeleteRequest = ArtifactMutationRequest</code> | Artifact Delete Request 的公共类型别名。 |
| `ArtifactFinalizeRequest` | 类型 | <code>type ArtifactFinalizeRequest = ArtifactMutationRequest</code> | Artifact Finalize Request 的公共类型别名。 |
| `ArtifactInvalidateRequest` | 类型 | <code>type ArtifactInvalidateRequest = ArtifactMutationRequest</code> | Artifact Invalidate Request 的公共类型别名。 |

## `ArtifactCreateDownloadAccessRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | artifact Id 字段。 |
| `expiresInSeconds` | 属性 | <code>expiresInSeconds: number</code> | expires In Seconds 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `responseFilename` | 属性 | <code>responseFilename: string</code> | response Filename 字段。 |
| `responseMimeType` | 属性 | <code>responseMimeType: string</code> | response Mime Type 字段。 |
| `versionId` | 属性 | <code>versionId: string</code> | version Id 字段。 |

## `ArtifactCreateRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `access` | 属性 | <code>access: ArtifactAccessRecord</code> | access 字段。 |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `content` | 属性 | <code>content: ArtifactByteSource</code> | content 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `encoding` | 属性 | <code>encoding: string</code> | encoding 字段。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash: string</code> | expected Content Hash 字段。 |
| `expectedSizeBytes` | 属性 | <code>expectedSizeBytes: number</code> | expected Size Bytes 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `kind` | 属性 | <code>kind: ArtifactKind</code> | kind 字段。 |
| `logicalArtifactId` | 属性 | <code>logicalArtifactId: string</code> | logical Artifact Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `mimeType` | 属性 | <code>mimeType: string</code> | mime Type 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | profile Ref 字段。 |
| `provenance` | 属性 | <code>provenance: ArtifactProvenance</code> | provenance 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `retention` | 属性 | <code>retention: ArtifactRetentionRecord</code> | retention 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sensitive` | 属性 | <code>sensitive: boolean</code> | sensitive 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ArtifactFromWorkspaceRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash: string</code> | expected Content Hash 字段。 |
| `expectedSizeBytes` | 属性 | <code>expectedSizeBytes: number</code> | expected Size Bytes 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `kind` | 属性 | <code>kind: ArtifactKind</code> | kind 字段。 |
| `logicalArtifactId` | 属性 | <code>logicalArtifactId: string</code> | logical Artifact Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `mimeType` | 属性 | <code>mimeType: string</code> | mime Type 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | profile Ref 字段。 |
| `provenance` | 属性 | <code>provenance: ArtifactProvenance</code> | provenance 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `retention` | 属性 | <code>retention: ArtifactRetentionRecord</code> | retention 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sensitive` | 属性 | <code>sensitive: boolean</code> | sensitive 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ArtifactGetRecordRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | artifact Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `versionId` | 属性 | <code>versionId: string</code> | version Id 字段。 |

## `ArtifactLatestRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `logicalArtifactId` | 属性 | <code>logicalArtifactId: string</code> | logical Artifact Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |

## `ArtifactListRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `includeDeleted` | 属性 | <code>includeDeleted: boolean</code> | include Deleted 字段。 |
| `kinds` | 属性 | <code>kinds: ArtifactKind[]</code> | kinds 字段。 |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `logicalArtifactId` | 属性 | <code>logicalArtifactId: string</code> | logical Artifact Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `statuses` | 属性 | <code>statuses: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/contracts/artifact").ArtifactStatus[]</code> | statuses 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ArtifactManager` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archive` | 方法 | <code>archive(request: ArtifactArchiveRequest): Promise&lt;ArtifactRecord&gt;</code> | archive 的公开运行时操作。 |
| `create` | 方法 | <code>create(request: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 创建 create。 |
| `createDownloadAccess` | 方法 | <code>createDownloadAccess(request: ArtifactCreateDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | 创建 Download Access。 |
| `createFromWorkspace` | 方法 | <code>createFromWorkspace(request: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 创建 From Workspace。 |
| `createVersion` | 方法 | <code>createVersion(request: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 创建 Version。 |
| `delete` | 方法 | <code>delete(request: ArtifactDeleteRequest): Promise&lt;void&gt;</code> | 删除 delete。 |
| `finalize` | 方法 | <code>finalize(request: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | finalize 的公开运行时操作。 |
| `get` | 方法 | <code>get(request: ArtifactGetRecordRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | health 的公开运行时操作。 |
| `invalidate` | 方法 | <code>invalidate(request: ArtifactInvalidateRequest): Promise&lt;ArtifactRecord&gt;</code> | invalidate 的公开运行时操作。 |
| `latest` | 方法 | <code>latest(request: ArtifactLatestRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | latest 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: ArtifactListRequest): Promise&lt;ArtifactRecord[]&gt;</code> | 列出 list。 |
| `previous` | 方法 | <code>previous(request: ArtifactPreviousRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | previous 的公开运行时操作。 |
| `profile` | 方法 | <code>profile(ref: SpecRef): Promise&lt;ArtifactProfileSpec &#124; null&gt;</code> | profile 的公开运行时操作。 |
| `read` | 方法 | <code>read(request: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactReadResult&gt;</code> | read 的公开运行时操作。 |
| `traceLineage` | 方法 | <code>traceLineage(request: ArtifactTraceLineageRequest): Promise&lt;ArtifactLineage&gt;</code> | trace Lineage 的公开运行时操作。 |

## `ArtifactMutationRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | artifact Id 字段。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | expected Revision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |

## `ArtifactPreviousRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `versionId` | 属性 | <code>versionId: string</code> | version Id 字段。 |

## `ArtifactReadRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | artifact Id 字段。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash: string</code> | expected Content Hash 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `range` | 属性 | <code>range: ArtifactByteRange</code> | range 字段。 |
| `versionId` | 属性 | <code>versionId: string</code> | version Id 字段。 |

## `ArtifactReadResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: ArtifactContent</code> | content 字段。 |
| `record` | 属性 | <code>record: ArtifactRecord</code> | record 字段。 |

## `ArtifactTraceLineageRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | artifact Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |

## `ArtifactVersionRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | artifact Id 字段。 |
| `content` | 属性 | <code>content: ArtifactByteSource</code> | content 字段。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash: string</code> | expected Content Hash 字段。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | expected Revision 字段。 |
| `expectedSizeBytes` | 属性 | <code>expectedSizeBytes: number</code> | expected Size Bytes 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `provenance` | 属性 | <code>provenance: ArtifactProvenance</code> | provenance 字段。 |

## `ArtifactWorkspaceContent` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: ArtifactByteSource</code> | content 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `mimeType` | 属性 | <code>mimeType: string</code> | mime Type 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |

## `ArtifactWorkspaceContentReader` 契约字段

Governed Workspace port used by ArtifactManager; it never accepts a host path.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `read` | 方法 | <code>read(request: ArtifactWorkspaceContentRequest): Promise&lt;ArtifactWorkspaceContent&gt;</code> | read 的公开运行时操作。 |

## `ArtifactWorkspaceContentRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxBytes` | 属性 | <code>maxBytes: number</code> | max Bytes 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `NormalizedArtifactError` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causeRef` | 属性 | <code>causeRef: string</code> | cause Ref 字段。 |
| `code` | 属性 | <code>code: "ARTIFACT_INVALID_INPUT" &#124; "ARTIFACT_NOT_FOUND" &#124; "ARTIFACT_PERMISSION_DENIED" &#124; "ARTIFACT_TOO_LARGE" &#124; "ARTIFACT_TYPE_DENIED" &#124; "ARTIFACT_HASH_MISMATCH" &#124; "ARTIFACT_VERSION_CONFLICT" &#124; "ARTIFACT_STORE_UNAVAILABLE" &#124; "ARTIFACT_UPLOAD_FAILED" &#124; "ARTIFACT_DOWNLOAD_FAILED" &#124; "ARTIFACT_DELETE_BLOCKED" &#124; "ARTIFACT_DELETE_PARTIAL" &#124; "ARTIFACT_VALIDATION_FAILED" &#124; "ARTIFACT_INTERNAL_ERROR"</code> | code 字段。 |
| `details` | 属性 | <code>details: Record&lt;string, unknown&gt;</code> | details 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | retryable 字段。 |
