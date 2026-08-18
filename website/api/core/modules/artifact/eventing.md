# `@codesoul-co/hypha-core` / `modules/artifact/eventing`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/artifact/eventing.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `EventingArtifactGarbageCollector` | class | <code>new EventingArtifactGarbageCollector(options: EventingArtifactGarbageCollectorOptions): EventingArtifactGarbageCollector</code> | Runtime implementation for Eventing Artifact Garbage Collector; see its public constructor and members below. |
| `EventingArtifactManager` | class | <code>new EventingArtifactManager(options: EventingArtifactManagerOptions): EventingArtifactManager</code> | Runtime implementation for Eventing Artifact Manager; see its public constructor and members below. |
| `EventingArtifactRetentionProcessor` | class | <code>new EventingArtifactRetentionProcessor(options: EventingArtifactRetentionProcessorOptions): EventingArtifactRetentionProcessor</code> | Runtime implementation for Eventing Artifact Retention Processor; see its public constructor and members below. |
| `EventingArtifactGarbageCollectorOptions` | interface | <code>interface EventingArtifactGarbageCollectorOptions</code> | Field contract for Eventing Artifact Garbage Collector Options; see all contract members below. |
| `EventingArtifactManagerOptions` | interface | <code>interface EventingArtifactManagerOptions</code> | Field contract for Eventing Artifact Manager Options; see all contract members below. |
| `EventingArtifactRetentionProcessorOptions` | interface | <code>interface EventingArtifactRetentionProcessorOptions</code> | Field contract for Eventing Artifact Retention Processor Options; see all contract members below. |

## `EventingArtifactGarbageCollector` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collect` | method | <code>collect(input: ArtifactGarbageCollectionRequest): Promise&lt;ArtifactGarbageCollectionResult&gt;</code> | Public runtime operation for collect. |
| `constructor` | constructor | <code>(options: EventingArtifactGarbageCollectorOptions): EventingArtifactGarbageCollector</code> | Creates an instance of this class. |

## `EventingArtifactManager` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archive` | method | <code>archive(input: ArtifactArchiveRequest): Promise&lt;ArtifactRecord&gt;</code> | Public runtime operation for archive. |
| `constructor` | constructor | <code>(options: EventingArtifactManagerOptions): EventingArtifactManager</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Creates create at this module boundary. |
| `createDownloadAccess` | method | <code>createDownloadAccess(request: ArtifactCreateDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | Creates Download Access at this module boundary. |
| `createFromWorkspace` | method | <code>createFromWorkspace(input: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Creates From Workspace at this module boundary. |
| `createVersion` | method | <code>createVersion(input: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Creates Version at this module boundary. |
| `delete` | method | <code>delete(input: ArtifactDeleteRequest): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `finalize` | method | <code>finalize(input: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | Public runtime operation for finalize. |
| `get` | method | <code>get(request: ArtifactGetRecordRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | Public runtime operation for health. |
| `invalidate` | method | <code>invalidate(input: ArtifactInvalidateRequest): Promise&lt;ArtifactRecord&gt;</code> | Public runtime operation for invalidate. |
| `latest` | method | <code>latest(request: ArtifactLatestRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Public runtime operation for latest. |
| `list` | method | <code>list(request: ArtifactListRequest): Promise&lt;ArtifactRecord[]&gt;</code> | Lists list at this module boundary. |
| `previous` | method | <code>previous(request: ArtifactPreviousRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Public runtime operation for previous. |
| `profile` | method | <code>profile(ref: SpecRef): Promise&lt;ArtifactProfileSpec &#124; null&gt;</code> | Public runtime operation for profile. |
| `read` | method | <code>read(input: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactReadResult&gt;</code> | Public runtime operation for read. |
| `traceLineage` | method | <code>traceLineage(request: ArtifactTraceLineageRequest): Promise&lt;ArtifactLineage&gt;</code> | Public runtime operation for trace Lineage. |

## `EventingArtifactRetentionProcessor` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: EventingArtifactRetentionProcessorOptions): EventingArtifactRetentionProcessor</code> | Creates an instance of this class. |
| `process` | method | <code>process(request: ArtifactRetentionProcessRequest): Promise&lt;ArtifactRetentionProcessResult&gt;</code> | Public runtime operation for process. |

## `EventingArtifactGarbageCollectorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `collector` | property | <code>collector: ArtifactGarbageCollector</code> | Public collector property. |
| `idGenerator` | method | <code>idGenerator(): string</code> | Public runtime operation for id Generator. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `publisher` | property | <code>publisher: ArtifactEventPublisher</code> | Public publisher property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `EventingArtifactManagerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `idGenerator` | method | <code>idGenerator(): string</code> | Public runtime operation for id Generator. |
| `manager` | property | <code>manager: ArtifactManager</code> | Public manager property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `publisher` | property | <code>publisher: ArtifactEventPublisher</code> | Public publisher property. |

## `EventingArtifactRetentionProcessorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `idGenerator` | method | <code>idGenerator(): string</code> | Public runtime operation for id Generator. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `processor` | property | <code>processor: ArtifactRetentionProcessor</code> | Public processor property. |
| `publisher` | property | <code>publisher: ArtifactEventPublisher</code> | Public publisher property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |
