# `@codesoul-co/hypha-core` / `modules/artifact/manager-content`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/artifact/manager-content.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-content.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `persistArtifactContent` | function | <code>persistArtifactContent(request: PersistArtifactContentRequest, options?: ArtifactOperationOptions): Promise&lt;PersistedArtifactContent&gt;</code> | Public runtime operation for persist Artifact Content. |
| `PersistArtifactContentRequest` | interface | <code>interface PersistArtifactContentRequest</code> | Field contract for Persist Artifact Content Request; see all contract members below. |
| `PersistedArtifactContent` | interface | <code>interface PersistedArtifactContent</code> | Field contract for Persisted Artifact Content; see all contract members below. |

## `PersistArtifactContentRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: ArtifactByteSource</code> | Public content property. |
| `expectedContentHash` | property | <code>expectedContentHash: string</code> | Public expected Content Hash property. |
| `expectedSizeBytes` | property | <code>expectedSizeBytes: number</code> | Public expected Size Bytes property. |
| `mimeType` | property | <code>mimeType: string</code> | Public mime Type property. |
| `nonce` | property | <code>nonce: string</code> | Public nonce property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `profile` | property | <code>profile: ArtifactProfileSpec</code> | Public profile property. |
| `store` | property | <code>store: ArtifactStoreProvider</code> | Public store property. |

## `PersistedArtifactContent` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `deduplicated` | property | <code>deduplicated: boolean</code> | Public deduplicated property. |
| `mimeType` | property | <code>mimeType: string</code> | Public mime Type property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `storageRef` | property | <code>storageRef: ArtifactStorageRef</code> | Public storage Ref property. |
