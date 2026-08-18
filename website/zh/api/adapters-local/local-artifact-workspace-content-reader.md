# `@codesoul-co/hypha-adapters-local` / `local-artifact-workspace-content-reader`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-artifact-workspace-content-reader.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-workspace-content-reader.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalArtifactWorkspaceContentReader` | 类 | <code>new LocalArtifactWorkspaceContentReader(options: LocalArtifactWorkspaceContentReaderOptions): LocalArtifactWorkspaceContentReader</code> | Streams governed Workspace files into ArtifactManager without exposing host paths or buffering the complete output in memory. |
| `LocalArtifactWorkspaceContentReaderOptions` | 接口 | <code>interface LocalArtifactWorkspaceContentReaderOptions</code> | Local Artifact Workspace Content Reader Options 的字段契约；完整字段见下表。 |

## `LocalArtifactWorkspaceContentReader` 公开成员

Streams governed Workspace files into ArtifactManager without exposing host paths or buffering the complete output in memory.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LocalArtifactWorkspaceContentReaderOptions): LocalArtifactWorkspaceContentReader</code> | 创建该类的实例。 |
| `read` | 方法 | <code>read(request: ArtifactWorkspaceContentRequest): Promise&lt;ArtifactWorkspaceContent&gt;</code> | read 的公开运行时操作。 |

## `LocalArtifactWorkspaceContentReaderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `chunkSizeBytes` | 属性 | <code>chunkSizeBytes: number</code> | chunk Size Bytes 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |
| `workspaceRoot` | 属性 | <code>workspaceRoot: string</code> | workspace Root 字段。 |
