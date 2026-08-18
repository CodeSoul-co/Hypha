# `@codesoul-co/hypha-core` / `contracts/artifact-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/artifact-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)
- Exports: **13**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactByteRange` | interface | <code>interface ArtifactByteRange</code> | Field contract for Artifact Byte Range; see all contract members below. |
| `ArtifactContent` | interface | <code>interface ArtifactContent</code> | Field contract for Artifact Content; see all contract members below. |
| `ArtifactCopyRequest` | interface | <code>interface ArtifactCopyRequest</code> | Field contract for Artifact Copy Request; see all contract members below. |
| `ArtifactDownloadAccess` | interface | <code>interface ArtifactDownloadAccess</code> | Field contract for Artifact Download Access; see all contract members below. |
| `ArtifactDownloadAccessRequest` | interface | <code>interface ArtifactDownloadAccessRequest</code> | Field contract for Artifact Download Access Request; see all contract members below. |
| `ArtifactGetRequest` | interface | <code>interface ArtifactGetRequest</code> | Field contract for Artifact Get Request; see all contract members below. |
| `ArtifactObjectMetadata` | interface | <code>interface ArtifactObjectMetadata</code> | Field contract for Artifact Object Metadata; see all contract members below. |
| `ArtifactOperationOptions` | interface | <code>interface ArtifactOperationOptions</code> | Field contract for Artifact Operation Options; see all contract members below. |
| `ArtifactPutRequest` | interface | <code>interface ArtifactPutRequest</code> | Field contract for Artifact Put Request; see all contract members below. |
| `ArtifactStoreCapabilities` | interface | <code>interface ArtifactStoreCapabilities</code> | Field contract for Artifact Store Capabilities; see all contract members below. |
| `ArtifactStoreProvider` | interface | <code>interface ArtifactStoreProvider</code> | Field contract for Artifact Store Provider; see all contract members below. |
| `ArtifactStoreProviderFactory` | interface | <code>interface ArtifactStoreProviderFactory</code> | Field contract for Artifact Store Provider Factory; see all contract members below. |
| `ArtifactByteSource` | type | <code>type ArtifactByteSource = Uint8Array &#124; AsyncIterable&lt;Uint8Array&gt;</code> | Public type alias for Artifact Byte Source. |

## `ArtifactByteRange` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `endInclusive` | property | <code>endInclusive: number</code> | Public end Inclusive property. |
| `start` | property | <code>start: number</code> | Public start property. |

## `ArtifactContent` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `etag` | property | <code>etag: string</code> | Public etag property. |
| `mimeType` | property | <code>mimeType: string</code> | Public mime Type property. |
| `range` | property | <code>range: ArtifactByteRange</code> | Public range property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `stream` | property | <code>stream: AsyncIterable&lt;Uint8Array&lt;ArrayBufferLike&gt;&gt;</code> | Public stream property. |

## `ArtifactCopyRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ifAbsent` | property | <code>ifAbsent: boolean</code> | Public if Absent property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `source` | property | <code>source: ArtifactStorageRef</code> | Public source property. |
| `targetObjectKey` | property | <code>targetObjectKey: string</code> | Public target Object Key property. |

## `ArtifactDownloadAccess` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `headers` | property | <code>headers: Record&lt;string, string&gt;</code> | Public headers property. |
| `method` | property | <code>method: "GET"</code> | Public method property. |
| `url` | property | <code>url: string</code> | Public url property. |

## `ArtifactDownloadAccessRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expiresInSeconds` | property | <code>expiresInSeconds: number</code> | Public expires In Seconds property. |
| `ref` | property | <code>ref: ArtifactStorageRef</code> | Public ref property. |
| `responseFilename` | property | <code>responseFilename: string</code> | Public response Filename property. |
| `responseMimeType` | property | <code>responseMimeType: string</code> | Public response Mime Type property. |

## `ArtifactGetRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedContentHash` | property | <code>expectedContentHash: string</code> | Public expected Content Hash property. |
| `range` | property | <code>range: ArtifactByteRange</code> | Public range property. |
| `ref` | property | <code>ref: ArtifactStorageRef</code> | Public ref property. |

## `ArtifactObjectMetadata` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `etag` | property | <code>etag: string</code> | Public etag property. |
| `lastModifiedAt` | property | <code>lastModifiedAt: string</code> | Public last Modified At property. |
| `metadata` | property | <code>metadata: Record&lt;string, string&gt;</code> | Public metadata property. |
| `mimeType` | property | <code>mimeType: string</code> | Public mime Type property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |

## `ArtifactOperationOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal: AbortSignal</code> | Public abort Signal property. |

## `ArtifactPutRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: ArtifactByteSource</code> | Public content property. |
| `expectedContentHash` | property | <code>expectedContentHash: string</code> | Public expected Content Hash property. |
| `ifAbsent` | property | <code>ifAbsent: boolean</code> | Public if Absent property. |
| `metadata` | property | <code>metadata: Record&lt;string, string&gt;</code> | Public metadata property. |
| `mimeType` | property | <code>mimeType: string</code> | Public mime Type property. |
| `objectKey` | property | <code>objectKey: string</code> | Public object Key property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |

## `ArtifactStoreCapabilities` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentAddressing` | property | <code>contentAddressing: boolean</code> | Public content Addressing property. |
| `encryption` | property | <code>encryption: boolean</code> | Public encryption property. |
| `multipartUpload` | property | <code>multipartUpload: boolean</code> | Public multipart Upload property. |
| `rangeRead` | property | <code>rangeRead: boolean</code> | Public range Read property. |
| `serverSideCopy` | property | <code>serverSideCopy: boolean</code> | Public server Side Copy property. |
| `signedAccess` | property | <code>signedAccess: boolean</code> | Public signed Access property. |
| `versioning` | property | <code>versioning: boolean</code> | Public versioning property. |

## `ArtifactStoreProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): Promise&lt;ArtifactStoreCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `copy` | method | <code>copy(request: ArtifactCopyRequest): Promise&lt;ArtifactStorageRef&gt;</code> | Public runtime operation for copy. |
| `createDownloadAccess` | method | <code>createDownloadAccess(request: ArtifactDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | Creates Download Access at this module boundary. |
| `delete` | method | <code>delete(ref: ArtifactStorageRef): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `exists` | method | <code>exists(ref: ArtifactStorageRef): Promise&lt;boolean&gt;</code> | Public runtime operation for exists. |
| `get` | method | <code>get(request: ArtifactGetRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactContent&gt;</code> | Gets get at this module boundary. |
| `head` | method | <code>head(ref: ArtifactStorageRef): Promise&lt;ArtifactObjectMetadata &#124; null&gt;</code> | Public runtime operation for head. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `put` | method | <code>put(request: ArtifactPutRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactStorageRef&gt;</code> | Public runtime operation for put. |

## `ArtifactStoreProviderFactory` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(): ArtifactStoreProvider &#124; Promise&lt;ArtifactStoreProvider&gt;</code> | Creates create at this module boundary. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
