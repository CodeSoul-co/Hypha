# `@codesoul-co/hypha-core` / `modules/artifact/eventing`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/artifact/eventing.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `EventingArtifactGarbageCollector` | 类 | <code>new EventingArtifactGarbageCollector(options: EventingArtifactGarbageCollectorOptions): EventingArtifactGarbageCollector</code> | Eventing Artifact Garbage Collector 的运行时实现；公开构造函数与成员见下表。 |
| `EventingArtifactManager` | 类 | <code>new EventingArtifactManager(options: EventingArtifactManagerOptions): EventingArtifactManager</code> | Eventing Artifact Manager 的运行时实现；公开构造函数与成员见下表。 |
| `EventingArtifactRetentionProcessor` | 类 | <code>new EventingArtifactRetentionProcessor(options: EventingArtifactRetentionProcessorOptions): EventingArtifactRetentionProcessor</code> | Eventing Artifact Retention Processor 的运行时实现；公开构造函数与成员见下表。 |
| `EventingArtifactGarbageCollectorOptions` | 接口 | <code>interface EventingArtifactGarbageCollectorOptions</code> | Eventing Artifact Garbage Collector Options 的字段契约；完整字段见下表。 |
| `EventingArtifactManagerOptions` | 接口 | <code>interface EventingArtifactManagerOptions</code> | Eventing Artifact Manager Options 的字段契约；完整字段见下表。 |
| `EventingArtifactRetentionProcessorOptions` | 接口 | <code>interface EventingArtifactRetentionProcessorOptions</code> | Eventing Artifact Retention Processor Options 的字段契约；完整字段见下表。 |

## `EventingArtifactGarbageCollector` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collect` | 方法 | <code>collect(input: ArtifactGarbageCollectionRequest): Promise&lt;ArtifactGarbageCollectionResult&gt;</code> | collect 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: EventingArtifactGarbageCollectorOptions): EventingArtifactGarbageCollector</code> | 创建该类的实例。 |

## `EventingArtifactManager` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archive` | 方法 | <code>archive(input: ArtifactArchiveRequest): Promise&lt;ArtifactRecord&gt;</code> | archive 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: EventingArtifactManagerOptions): EventingArtifactManager</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 创建 create。 |
| `createDownloadAccess` | 方法 | <code>createDownloadAccess(request: ArtifactCreateDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | 创建 Download Access。 |
| `createFromWorkspace` | 方法 | <code>createFromWorkspace(input: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 创建 From Workspace。 |
| `createVersion` | 方法 | <code>createVersion(input: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 创建 Version。 |
| `delete` | 方法 | <code>delete(input: ArtifactDeleteRequest): Promise&lt;void&gt;</code> | 删除 delete。 |
| `finalize` | 方法 | <code>finalize(input: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | finalize 的公开运行时操作。 |
| `get` | 方法 | <code>get(request: ArtifactGetRecordRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | health 的公开运行时操作。 |
| `invalidate` | 方法 | <code>invalidate(input: ArtifactInvalidateRequest): Promise&lt;ArtifactRecord&gt;</code> | invalidate 的公开运行时操作。 |
| `latest` | 方法 | <code>latest(request: ArtifactLatestRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | latest 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: ArtifactListRequest): Promise&lt;ArtifactRecord[]&gt;</code> | 列出 list。 |
| `previous` | 方法 | <code>previous(request: ArtifactPreviousRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | previous 的公开运行时操作。 |
| `profile` | 方法 | <code>profile(ref: SpecRef): Promise&lt;ArtifactProfileSpec &#124; null&gt;</code> | profile 的公开运行时操作。 |
| `read` | 方法 | <code>read(input: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactReadResult&gt;</code> | read 的公开运行时操作。 |
| `traceLineage` | 方法 | <code>traceLineage(request: ArtifactTraceLineageRequest): Promise&lt;ArtifactLineage&gt;</code> | trace Lineage 的公开运行时操作。 |

## `EventingArtifactRetentionProcessor` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: EventingArtifactRetentionProcessorOptions): EventingArtifactRetentionProcessor</code> | 创建该类的实例。 |
| `process` | 方法 | <code>process(request: ArtifactRetentionProcessRequest): Promise&lt;ArtifactRetentionProcessResult&gt;</code> | process 的公开运行时操作。 |

## `EventingArtifactGarbageCollectorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `collector` | 属性 | <code>collector: ArtifactGarbageCollector</code> | collector 字段。 |
| `idGenerator` | 方法 | <code>idGenerator(): string</code> | id Generator 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `publisher` | 属性 | <code>publisher: ArtifactEventPublisher</code> | publisher 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `EventingArtifactManagerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `idGenerator` | 方法 | <code>idGenerator(): string</code> | id Generator 的公开运行时操作。 |
| `manager` | 属性 | <code>manager: ArtifactManager</code> | manager 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `publisher` | 属性 | <code>publisher: ArtifactEventPublisher</code> | publisher 字段。 |

## `EventingArtifactRetentionProcessorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `idGenerator` | 方法 | <code>idGenerator(): string</code> | id Generator 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `processor` | 属性 | <code>processor: ArtifactRetentionProcessor</code> | processor 字段。 |
| `publisher` | 属性 | <code>publisher: ArtifactEventPublisher</code> | publisher 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |
