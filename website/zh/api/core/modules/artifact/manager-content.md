# `@codesoul-co/hypha-core` / `modules/artifact/manager-content`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/artifact/manager-content.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-content.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `persistArtifactContent` | 函数 | <code>persistArtifactContent(request: PersistArtifactContentRequest, options?: ArtifactOperationOptions): Promise&lt;PersistedArtifactContent&gt;</code> | persist Artifact Content 的公开运行时操作。 |
| `PersistArtifactContentRequest` | 接口 | <code>interface PersistArtifactContentRequest</code> | Persist Artifact Content Request 的字段契约；完整字段见下表。 |
| `PersistedArtifactContent` | 接口 | <code>interface PersistedArtifactContent</code> | Persisted Artifact Content 的字段契约；完整字段见下表。 |

## `PersistArtifactContentRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: ArtifactByteSource</code> | content 字段。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash: string</code> | expected Content Hash 字段。 |
| `expectedSizeBytes` | 属性 | <code>expectedSizeBytes: number</code> | expected Size Bytes 字段。 |
| `mimeType` | 属性 | <code>mimeType: string</code> | mime Type 字段。 |
| `nonce` | 属性 | <code>nonce: string</code> | nonce 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `profile` | 属性 | <code>profile: ArtifactProfileSpec</code> | profile 字段。 |
| `store` | 属性 | <code>store: ArtifactStoreProvider</code> | store 字段。 |

## `PersistedArtifactContent` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `deduplicated` | 属性 | <code>deduplicated: boolean</code> | deduplicated 字段。 |
| `mimeType` | 属性 | <code>mimeType: string</code> | mime Type 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
| `storageRef` | 属性 | <code>storageRef: ArtifactStorageRef</code> | storage Ref 字段。 |
