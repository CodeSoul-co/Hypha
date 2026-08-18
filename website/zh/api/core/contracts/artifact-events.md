# `@codesoul-co/hypha-core` / `contracts/artifact-events`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/artifact-events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactEventPayload` | 接口 | <code>interface ArtifactEventPayload</code> | Artifact Event Payload 的字段契约；完整字段见下表。 |
| `ArtifactEventPublisher` | 接口 | <code>interface ArtifactEventPublisher</code> | Runtime-owned adapters must durably and idempotently publish by publication ID. |
| `ArtifactEventCreateInput` | 类型 | <code>type ArtifactEventCreateInput = Omit&lt;EventCreateInput&lt;ArtifactEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Artifact Event Create Input 的公共类型别名。 |
| `ArtifactEventPayloadMap` | 类型 | <code>type ArtifactEventPayloadMap = { 'artifact.create.requested': ArtifactEventPayloadWithRequired&lt;'operationId' &#124; 'workspaceId' &#124; 'profileRef'&gt;; 'artifact.created': ArtifactStatusEventPayload&lt;'draft'&gt; &amp; ArtifactEventPayloadWithRequired&lt;'logicalArtifactId' &#124; 'contentHash'&gt;; 'artifact.deduplicated': ArtifactEventPayloadWithRequired&lt;'operationId' &#124; 'artifactId' &#124; 'versionId' &#124; 'contentHash' &#124; 'deduplicated'&gt; &amp; { dedupli...</code> | Artifact Event Payload Map 的公共类型别名。 |
| `ArtifactEventPublication` | 类型 | <code>type ArtifactEventPublication = { id: string; type: TType; timestamp: string; payload: ArtifactEventPayloadMap[TType]; workspaceId?: string; sessionId?: string; runId?: string; agentId?: string; }</code> | Artifact Event Publication 的公共类型别名。 |
| `ArtifactFrameworkEvent` | 类型 | <code>type ArtifactFrameworkEvent = Omit&lt;FrameworkEvent&lt;ArtifactEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Artifact Framework Event 的公共类型别名。 |
| `ArtifactFrameworkEventType` | 类型 | <code>type ArtifactFrameworkEventType = 'artifact.create.requested' &#124; 'artifact.created' &#124; 'artifact.deduplicated' &#124; 'artifact.create.failed' &#124; 'artifact.read.requested' &#124; 'artifact.read.completed' &#124; 'artifact.version.created' &#124; 'artifact.finalized' &#124; 'artifact.archived' &#124; 'artifact.invalidated' &#124; 'artifact.delete.requested' &#124; 'artifact.delete.blocked' &#124; 'artifact.deleted' &#124; 'artifact.delete.failed' &#124; 'artifact.lineage....</code> | Artifact Framework Event Type 的公共类型别名。 |

## `ArtifactEventPayload` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | artifact Id 字段。 |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `candidateObjects` | 属性 | <code>candidateObjects: number</code> | candidate Objects 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `deduplicated` | 属性 | <code>deduplicated: boolean</code> | deduplicated 字段。 |
| `deletedObjects` | 属性 | <code>deletedObjects: number</code> | deleted Objects 字段。 |
| `error` | 属性 | <code>error: NormalizedArtifactError</code> | error 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `logicalArtifactId` | 属性 | <code>logicalArtifactId: string</code> | logical Artifact Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `missingObjects` | 属性 | <code>missingObjects: number</code> | missing Objects 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | profile Ref 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `reclaimedBytes` | 属性 | <code>reclaimedBytes: number</code> | reclaimed Bytes 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
| `status` | 属性 | <code>status: ArtifactStatus</code> | status 字段。 |
| `versionId` | 属性 | <code>versionId: string</code> | version Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ArtifactEventPublisher` 契约字段

Runtime-owned adapters must durably and idempotently publish by publication ID.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `publish` | 方法 | <code>publish(publication: ArtifactEventPublication): Promise&lt;void&gt;</code> | publish 的公开运行时操作。 |
