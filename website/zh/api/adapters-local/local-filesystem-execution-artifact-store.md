# `@codesoul-co/hypha-adapters-local` / `local-filesystem-execution-artifact-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-filesystem-execution-artifact-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-filesystem-execution-artifact-store.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalFilesystemExecutionArtifactStore` | 类 | <code>new LocalFilesystemExecutionArtifactStore(options: LocalFilesystemExecutionArtifactStoreOptions): LocalFilesystemExecutionArtifactStore</code> | Local Filesystem Execution Artifact Store 的运行时实现；公开构造函数与成员见下表。 |
| `LocalArtifactGarbageCollectionResult` | 接口 | <code>interface LocalArtifactGarbageCollectionResult</code> | Local Artifact Garbage Collection Result 的字段契约；完整字段见下表。 |
| `LocalFilesystemExecutionArtifactStoreOptions` | 接口 | <code>interface LocalFilesystemExecutionArtifactStoreOptions</code> | Local Filesystem Execution Artifact Store Options 的字段契约；完整字段见下表。 |
| `LocalFilesystemExecutionArtifactStoreStats` | 接口 | <code>interface LocalFilesystemExecutionArtifactStoreStats</code> | Local Filesystem Execution Artifact Store Stats 的字段契约；完整字段见下表。 |

## `LocalFilesystemExecutionArtifactStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ArtifactStoreCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `collectGarbage` | 方法 | <code>collectGarbage(): Promise&lt;LocalArtifactGarbageCollectionResult&gt;</code> | collect Garbage 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: LocalFilesystemExecutionArtifactStoreOptions): LocalFilesystemExecutionArtifactStore</code> | 创建该类的实例。 |
| `copy` | 方法 | <code>copy(input: ArtifactCopyRequest): Promise&lt;ArtifactStorageRef&gt;</code> | copy 的公开运行时操作。 |
| `delete` | 方法 | <code>delete(input: ArtifactStorageRef): Promise&lt;void&gt;</code> | 删除 delete。 |
| `exists` | 方法 | <code>exists(input: ArtifactStorageRef): Promise&lt;boolean&gt;</code> | exists 的公开运行时操作。 |
| `get` | 方法 | <code>get(input: ArtifactGetRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactContent&gt;</code> | 读取 get。 |
| `head` | 方法 | <code>head(input: ArtifactStorageRef): Promise&lt;ArtifactObjectMetadata &#124; null&gt;</code> | head 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `put` | 方法 | <code>put(input: ArtifactPutRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactStorageRef&gt;</code> | put 的公开运行时操作。 |
| `stats` | 方法 | <code>stats(): Promise&lt;LocalFilesystemExecutionArtifactStoreStats&gt;</code> | stats 的公开运行时操作。 |

## `LocalArtifactGarbageCollectionResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deletedBlobs` | 属性 | <code>deletedBlobs: number</code> | deleted Blobs 字段。 |
| `reclaimedBytes` | 属性 | <code>reclaimedBytes: number</code> | reclaimed Bytes 字段。 |

## `LocalFilesystemExecutionArtifactStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `maxObjectBytes` | 属性 | <code>maxObjectBytes: number</code> | max Object Bytes 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `rootPath` | 属性 | <code>rootPath: string</code> | root Path 字段。 |

## `LocalFilesystemExecutionArtifactStoreStats` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `blobs` | 属性 | <code>blobs: number</code> | blobs 字段。 |
| `objects` | 属性 | <code>objects: number</code> | objects 字段。 |
| `storedBytes` | 属性 | <code>storedBytes: number</code> | stored Bytes 字段。 |
