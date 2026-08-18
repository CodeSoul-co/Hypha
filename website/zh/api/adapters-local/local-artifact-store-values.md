# `@codesoul-co/hypha-adapters-local` / `local-artifact-store-values`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-artifact-store-values.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-store-values.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cloneLocalArtifactMetadata` | 函数 | <code>cloneLocalArtifactMetadata(value?: Record&lt;string, string&gt;): Record&lt;string, string&gt; &#124; undefined</code> | clone Local Artifact Metadata 的公开运行时操作。 |
| `localManifestMetadata` | 函数 | <code>localManifestMetadata(manifest: LocalArtifactObjectManifest): ArtifactObjectMetadata</code> | local Manifest Metadata 的公开运行时操作。 |
| `normalizeLocalArtifactRange` | 函数 | <code>normalizeLocalArtifactRange(range: ArtifactGetRequest["range"], sizeBytes: number): { start: number; endInclusive: number; } &#124; undefined</code> | 规范化 Local Artifact Range。 |
| `normalizeLocalArtifactStoreError` | 函数 | <code>normalizeLocalArtifactStoreError(error: unknown, operation: string): ArtifactStoreAdapterError</code> | 规范化 Local Artifact Store Error。 |
