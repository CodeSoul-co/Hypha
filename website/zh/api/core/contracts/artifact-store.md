# `@codesoul-co/hypha-core` / `contracts/artifact-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/artifact-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)
- 导出数: **13**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactByteRange` | 接口 | <code>interface ArtifactByteRange</code> | Artifact Byte Range 的字段契约；完整字段见下表。 |
| `ArtifactContent` | 接口 | <code>interface ArtifactContent</code> | Artifact Content 的字段契约；完整字段见下表。 |
| `ArtifactCopyRequest` | 接口 | <code>interface ArtifactCopyRequest</code> | Artifact Copy Request 的字段契约；完整字段见下表。 |
| `ArtifactDownloadAccess` | 接口 | <code>interface ArtifactDownloadAccess</code> | Artifact Download Access 的字段契约；完整字段见下表。 |
| `ArtifactDownloadAccessRequest` | 接口 | <code>interface ArtifactDownloadAccessRequest</code> | Artifact Download Access Request 的字段契约；完整字段见下表。 |
| `ArtifactGetRequest` | 接口 | <code>interface ArtifactGetRequest</code> | Artifact Get Request 的字段契约；完整字段见下表。 |
| `ArtifactObjectMetadata` | 接口 | <code>interface ArtifactObjectMetadata</code> | Artifact Object Metadata 的字段契约；完整字段见下表。 |
| `ArtifactOperationOptions` | 接口 | <code>interface ArtifactOperationOptions</code> | Artifact Operation Options 的字段契约；完整字段见下表。 |
| `ArtifactPutRequest` | 接口 | <code>interface ArtifactPutRequest</code> | Artifact Put Request 的字段契约；完整字段见下表。 |
| `ArtifactStoreCapabilities` | 接口 | <code>interface ArtifactStoreCapabilities</code> | Artifact Store Capabilities 的字段契约；完整字段见下表。 |
| `ArtifactStoreProvider` | 接口 | <code>interface ArtifactStoreProvider</code> | Artifact Store Provider 的字段契约；完整字段见下表。 |
| `ArtifactStoreProviderFactory` | 接口 | <code>interface ArtifactStoreProviderFactory</code> | Artifact Store Provider Factory 的字段契约；完整字段见下表。 |
| `ArtifactByteSource` | 类型 | <code>type ArtifactByteSource = Uint8Array &#124; AsyncIterable&lt;Uint8Array&gt;</code> | Artifact Byte Source 的公共类型别名。 |

## `ArtifactByteRange` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `endInclusive` | 属性 | <code>endInclusive: number</code> | end Inclusive 字段。 |
| `start` | 属性 | <code>start: number</code> | start 字段。 |

## `ArtifactContent` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `etag` | 属性 | <code>etag: string</code> | etag 字段。 |
| `mimeType` | 属性 | <code>mimeType: string</code> | mime Type 字段。 |
| `range` | 属性 | <code>range: ArtifactByteRange</code> | range 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
| `stream` | 属性 | <code>stream: AsyncIterable&lt;Uint8Array&lt;ArrayBufferLike&gt;&gt;</code> | stream 字段。 |

## `ArtifactCopyRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ifAbsent` | 属性 | <code>ifAbsent: boolean</code> | if Absent 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `source` | 属性 | <code>source: ArtifactStorageRef</code> | source 字段。 |
| `targetObjectKey` | 属性 | <code>targetObjectKey: string</code> | target Object Key 字段。 |

## `ArtifactDownloadAccess` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `headers` | 属性 | <code>headers: Record&lt;string, string&gt;</code> | headers 字段。 |
| `method` | 属性 | <code>method: "GET"</code> | method 字段。 |
| `url` | 属性 | <code>url: string</code> | url 字段。 |

## `ArtifactDownloadAccessRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expiresInSeconds` | 属性 | <code>expiresInSeconds: number</code> | expires In Seconds 字段。 |
| `ref` | 属性 | <code>ref: ArtifactStorageRef</code> | ref 字段。 |
| `responseFilename` | 属性 | <code>responseFilename: string</code> | response Filename 字段。 |
| `responseMimeType` | 属性 | <code>responseMimeType: string</code> | response Mime Type 字段。 |

## `ArtifactGetRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedContentHash` | 属性 | <code>expectedContentHash: string</code> | expected Content Hash 字段。 |
| `range` | 属性 | <code>range: ArtifactByteRange</code> | range 字段。 |
| `ref` | 属性 | <code>ref: ArtifactStorageRef</code> | ref 字段。 |

## `ArtifactObjectMetadata` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `etag` | 属性 | <code>etag: string</code> | etag 字段。 |
| `lastModifiedAt` | 属性 | <code>lastModifiedAt: string</code> | last Modified At 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, string&gt;</code> | metadata 字段。 |
| `mimeType` | 属性 | <code>mimeType: string</code> | mime Type 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |

## `ArtifactOperationOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal: AbortSignal</code> | abort Signal 字段。 |

## `ArtifactPutRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: ArtifactByteSource</code> | content 字段。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash: string</code> | expected Content Hash 字段。 |
| `ifAbsent` | 属性 | <code>ifAbsent: boolean</code> | if Absent 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, string&gt;</code> | metadata 字段。 |
| `mimeType` | 属性 | <code>mimeType: string</code> | mime Type 字段。 |
| `objectKey` | 属性 | <code>objectKey: string</code> | object Key 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |

## `ArtifactStoreCapabilities` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentAddressing` | 属性 | <code>contentAddressing: boolean</code> | content Addressing 字段。 |
| `encryption` | 属性 | <code>encryption: boolean</code> | encryption 字段。 |
| `multipartUpload` | 属性 | <code>multipartUpload: boolean</code> | multipart Upload 字段。 |
| `rangeRead` | 属性 | <code>rangeRead: boolean</code> | range Read 字段。 |
| `serverSideCopy` | 属性 | <code>serverSideCopy: boolean</code> | server Side Copy 字段。 |
| `signedAccess` | 属性 | <code>signedAccess: boolean</code> | signed Access 字段。 |
| `versioning` | 属性 | <code>versioning: boolean</code> | versioning 字段。 |

## `ArtifactStoreProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ArtifactStoreCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `copy` | 方法 | <code>copy(request: ArtifactCopyRequest): Promise&lt;ArtifactStorageRef&gt;</code> | copy 的公开运行时操作。 |
| `createDownloadAccess` | 方法 | <code>createDownloadAccess(request: ArtifactDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | 创建 Download Access。 |
| `delete` | 方法 | <code>delete(ref: ArtifactStorageRef): Promise&lt;void&gt;</code> | 删除 delete。 |
| `exists` | 方法 | <code>exists(ref: ArtifactStorageRef): Promise&lt;boolean&gt;</code> | exists 的公开运行时操作。 |
| `get` | 方法 | <code>get(request: ArtifactGetRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactContent&gt;</code> | 读取 get。 |
| `head` | 方法 | <code>head(ref: ArtifactStorageRef): Promise&lt;ArtifactObjectMetadata &#124; null&gt;</code> | head 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `put` | 方法 | <code>put(request: ArtifactPutRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactStorageRef&gt;</code> | put 的公开运行时操作。 |

## `ArtifactStoreProviderFactory` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(): ArtifactStoreProvider &#124; Promise&lt;ArtifactStoreProvider&gt;</code> | 创建 create。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
