# `@codesoul-co/hypha-core` / `modules/artifact/runtime`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/artifact/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/runtime.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultArtifactManager` | 类 | <code>new DefaultArtifactManager(options: DefaultArtifactManagerOptions): DefaultArtifactManager</code> | Default Artifact Manager 的运行时实现；公开构造函数与成员见下表。 |
| `DefaultArtifactManagerOptions` | 接口 | <code>interface DefaultArtifactManagerOptions</code> | Default Artifact Manager Options 的字段契约；完整字段见下表。 |

## `DefaultArtifactManager` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archive` | 方法 | <code>archive(request: ArtifactArchiveRequest): Promise&lt;ArtifactRecord&gt;</code> | archive 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: DefaultArtifactManagerOptions): DefaultArtifactManager</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 创建 create。 |
| `createDownloadAccess` | 方法 | <code>createDownloadAccess(input: ArtifactCreateDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | 创建 Download Access。 |
| `createFromWorkspace` | 方法 | <code>createFromWorkspace(input: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 创建 From Workspace。 |
| `createVersion` | 方法 | <code>createVersion(input: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 创建 Version。 |
| `delete` | 方法 | <code>delete(input: ArtifactDeleteRequest): Promise&lt;void&gt;</code> | 删除 delete。 |
| `finalize` | 方法 | <code>finalize(request: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | finalize 的公开运行时操作。 |
| `get` | 方法 | <code>get(request: ArtifactGetRecordRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | health 的公开运行时操作。 |
| `invalidate` | 方法 | <code>invalidate(request: ArtifactInvalidateRequest): Promise&lt;ArtifactRecord&gt;</code> | invalidate 的公开运行时操作。 |
| `latest` | 方法 | <code>latest(input: ArtifactLatestRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | latest 的公开运行时操作。 |
| `list` | 方法 | <code>list(input: ArtifactListRequest): Promise&lt;ArtifactRecord[]&gt;</code> | 列出 list。 |
| `previous` | 方法 | <code>previous(input: ArtifactPreviousRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | previous 的公开运行时操作。 |
| `profile` | 方法 | <code>profile(ref: SpecRef): Promise&lt;ArtifactProfileSpec &#124; null&gt;</code> | profile 的公开运行时操作。 |
| `read` | 方法 | <code>read(input: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactReadResult&gt;</code> | read 的公开运行时操作。 |
| `traceLineage` | 方法 | <code>traceLineage(input: ArtifactTraceLineageRequest): Promise&lt;ArtifactLineage&gt;</code> | trace Lineage 的公开运行时操作。 |

## `DefaultArtifactManagerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `idGenerator` | 方法 | <code>idGenerator(): string</code> | id Generator 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `profiles` | 属性 | <code>profiles: ArtifactProfileSpec[]</code> | profiles 字段。 |
| `repository` | 属性 | <code>repository: ArtifactRecordRepository</code> | repository 字段。 |
| `stores` | 属性 | <code>stores: ArtifactStoreProvider[]</code> | stores 字段。 |
| `workspaceReader` | 属性 | <code>workspaceReader: ArtifactWorkspaceContentReader</code> | workspace Reader 字段。 |
