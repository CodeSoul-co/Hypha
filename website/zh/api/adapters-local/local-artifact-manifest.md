# `@codesoul-co/hypha-adapters-local` / `local-artifact-manifest`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-artifact-manifest.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deleteLocalArtifactManifest` | 函数 | <code>deleteLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise&lt;void&gt;</code> | 删除 Local Artifact Manifest。 |
| `listLocalArtifactManifests` | 函数 | <code>listLocalArtifactManifests(paths: LocalArtifactStorePaths): Promise&lt;LocalArtifactObjectManifest[]&gt;</code> | 列出 Local Artifact Manifests。 |
| `readLocalArtifactManifest` | 函数 | <code>readLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise&lt;LocalArtifactObjectManifest &#124; null&gt;</code> | read Local Artifact Manifest 的公开运行时操作。 |
| `writeLocalArtifactManifest` | 函数 | <code>writeLocalArtifactManifest(paths: LocalArtifactStorePaths, manifest: LocalArtifactObjectManifest, options?: { ifAbsent?: boolean; }): Promise&lt;void&gt;</code> | write Local Artifact Manifest 的公开运行时操作。 |
| `LocalArtifactObjectManifest` | 接口 | <code>interface LocalArtifactObjectManifest</code> | Local Artifact Object Manifest 的字段契约；完整字段见下表。 |

## `LocalArtifactObjectManifest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `etag` | 属性 | <code>etag: string</code> | etag 字段。 |
| `lastModifiedAt` | 属性 | <code>lastModifiedAt: string</code> | last Modified At 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, string&gt;</code> | metadata 字段。 |
| `mimeType` | 属性 | <code>mimeType: string</code> | mime Type 字段。 |
| `objectKey` | 属性 | <code>objectKey: string</code> | object Key 字段。 |
| `schemaVersion` | 属性 | <code>schemaVersion: 1</code> | schema Version 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
