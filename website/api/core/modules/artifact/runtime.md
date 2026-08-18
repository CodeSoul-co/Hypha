# `@codesoul-co/hypha-core` / `modules/artifact/runtime`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/artifact/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/runtime.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultArtifactManager` | class | <code>new DefaultArtifactManager(options: DefaultArtifactManagerOptions): DefaultArtifactManager</code> | Runtime implementation for Default Artifact Manager; see its public constructor and members below. |
| `DefaultArtifactManagerOptions` | interface | <code>interface DefaultArtifactManagerOptions</code> | Field contract for Default Artifact Manager Options; see all contract members below. |

## `DefaultArtifactManager` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archive` | method | <code>archive(request: ArtifactArchiveRequest): Promise&lt;ArtifactRecord&gt;</code> | Public runtime operation for archive. |
| `constructor` | constructor | <code>(options: DefaultArtifactManagerOptions): DefaultArtifactManager</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Creates create at this module boundary. |
| `createDownloadAccess` | method | <code>createDownloadAccess(input: ArtifactCreateDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | Creates Download Access at this module boundary. |
| `createFromWorkspace` | method | <code>createFromWorkspace(input: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Creates From Workspace at this module boundary. |
| `createVersion` | method | <code>createVersion(input: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Creates Version at this module boundary. |
| `delete` | method | <code>delete(input: ArtifactDeleteRequest): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `finalize` | method | <code>finalize(request: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | Public runtime operation for finalize. |
| `get` | method | <code>get(request: ArtifactGetRecordRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | Public runtime operation for health. |
| `invalidate` | method | <code>invalidate(request: ArtifactInvalidateRequest): Promise&lt;ArtifactRecord&gt;</code> | Public runtime operation for invalidate. |
| `latest` | method | <code>latest(input: ArtifactLatestRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Public runtime operation for latest. |
| `list` | method | <code>list(input: ArtifactListRequest): Promise&lt;ArtifactRecord[]&gt;</code> | Lists list at this module boundary. |
| `previous` | method | <code>previous(input: ArtifactPreviousRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Public runtime operation for previous. |
| `profile` | method | <code>profile(ref: SpecRef): Promise&lt;ArtifactProfileSpec &#124; null&gt;</code> | Public runtime operation for profile. |
| `read` | method | <code>read(input: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactReadResult&gt;</code> | Public runtime operation for read. |
| `traceLineage` | method | <code>traceLineage(input: ArtifactTraceLineageRequest): Promise&lt;ArtifactLineage&gt;</code> | Public runtime operation for trace Lineage. |

## `DefaultArtifactManagerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `idGenerator` | method | <code>idGenerator(): string</code> | Public runtime operation for id Generator. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `profiles` | property | <code>profiles: ArtifactProfileSpec[]</code> | Public profiles property. |
| `repository` | property | <code>repository: ArtifactRecordRepository</code> | Public repository property. |
| `stores` | property | <code>stores: ArtifactStoreProvider[]</code> | Public stores property. |
| `workspaceReader` | property | <code>workspaceReader: ArtifactWorkspaceContentReader</code> | Public workspace Reader property. |
