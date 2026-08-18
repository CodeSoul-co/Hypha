# `@codesoul-co/hypha-core` / `contracts/artifact-events`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/artifact-events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactEventPayload` | interface | <code>interface ArtifactEventPayload</code> | Field contract for Artifact Event Payload; see all contract members below. |
| `ArtifactEventPublisher` | interface | <code>interface ArtifactEventPublisher</code> | Runtime-owned adapters must durably and idempotently publish by publication ID. |
| `ArtifactEventCreateInput` | type | <code>type ArtifactEventCreateInput = Omit&lt;EventCreateInput&lt;ArtifactEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Public type alias for Artifact Event Create Input. |
| `ArtifactEventPayloadMap` | type | <code>type ArtifactEventPayloadMap = { 'artifact.create.requested': ArtifactEventPayloadWithRequired&lt;'operationId' &#124; 'workspaceId' &#124; 'profileRef'&gt;; 'artifact.created': ArtifactStatusEventPayload&lt;'draft'&gt; &amp; ArtifactEventPayloadWithRequired&lt;'logicalArtifactId' &#124; 'contentHash'&gt;; 'artifact.deduplicated': ArtifactEventPayloadWithRequired&lt;'operationId' &#124; 'artifactId' &#124; 'versionId' &#124; 'contentHash' &#124; 'deduplicated'&gt; &amp; { dedupli...</code> | Public type alias for Artifact Event Payload Map. |
| `ArtifactEventPublication` | type | <code>type ArtifactEventPublication = { id: string; type: TType; timestamp: string; payload: ArtifactEventPayloadMap[TType]; workspaceId?: string; sessionId?: string; runId?: string; agentId?: string; }</code> | Public type alias for Artifact Event Publication. |
| `ArtifactFrameworkEvent` | type | <code>type ArtifactFrameworkEvent = Omit&lt;FrameworkEvent&lt;ArtifactEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Public type alias for Artifact Framework Event. |
| `ArtifactFrameworkEventType` | type | <code>type ArtifactFrameworkEventType = 'artifact.create.requested' &#124; 'artifact.created' &#124; 'artifact.deduplicated' &#124; 'artifact.create.failed' &#124; 'artifact.read.requested' &#124; 'artifact.read.completed' &#124; 'artifact.version.created' &#124; 'artifact.finalized' &#124; 'artifact.archived' &#124; 'artifact.invalidated' &#124; 'artifact.delete.requested' &#124; 'artifact.delete.blocked' &#124; 'artifact.deleted' &#124; 'artifact.delete.failed' &#124; 'artifact.lineage....</code> | Public type alias for Artifact Framework Event Type. |

## `ArtifactEventPayload` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public artifact Id property. |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `candidateObjects` | property | <code>candidateObjects: number</code> | Public candidate Objects property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `deduplicated` | property | <code>deduplicated: boolean</code> | Public deduplicated property. |
| `deletedObjects` | property | <code>deletedObjects: number</code> | Public deleted Objects property. |
| `error` | property | <code>error: NormalizedArtifactError</code> | Public error property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `logicalArtifactId` | property | <code>logicalArtifactId: string</code> | Public logical Artifact Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `missingObjects` | property | <code>missingObjects: number</code> | Public missing Objects property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public profile Ref property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `reclaimedBytes` | property | <code>reclaimedBytes: number</code> | Public reclaimed Bytes property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `status` | property | <code>status: ArtifactStatus</code> | Public status property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ArtifactEventPublisher` contract members

Runtime-owned adapters must durably and idempotently publish by publication ID.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `publish` | method | <code>publish(publication: ArtifactEventPublication): Promise&lt;void&gt;</code> | Public runtime operation for publish. |
