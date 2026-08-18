# `@codesoul-co/hypha-adapters-local` / `local-filesystem-execution-artifact-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-filesystem-execution-artifact-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-filesystem-execution-artifact-store.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalFilesystemExecutionArtifactStore` | class | <code>new LocalFilesystemExecutionArtifactStore(options: LocalFilesystemExecutionArtifactStoreOptions): LocalFilesystemExecutionArtifactStore</code> | Runtime implementation for Local Filesystem Execution Artifact Store; see its public constructor and members below. |
| `LocalArtifactGarbageCollectionResult` | interface | <code>interface LocalArtifactGarbageCollectionResult</code> | Field contract for Local Artifact Garbage Collection Result; see all contract members below. |
| `LocalFilesystemExecutionArtifactStoreOptions` | interface | <code>interface LocalFilesystemExecutionArtifactStoreOptions</code> | Field contract for Local Filesystem Execution Artifact Store Options; see all contract members below. |
| `LocalFilesystemExecutionArtifactStoreStats` | interface | <code>interface LocalFilesystemExecutionArtifactStoreStats</code> | Field contract for Local Filesystem Execution Artifact Store Stats; see all contract members below. |

## `LocalFilesystemExecutionArtifactStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): Promise&lt;ArtifactStoreCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `collectGarbage` | method | <code>collectGarbage(): Promise&lt;LocalArtifactGarbageCollectionResult&gt;</code> | Public runtime operation for collect Garbage. |
| `constructor` | constructor | <code>(options: LocalFilesystemExecutionArtifactStoreOptions): LocalFilesystemExecutionArtifactStore</code> | Creates an instance of this class. |
| `copy` | method | <code>copy(input: ArtifactCopyRequest): Promise&lt;ArtifactStorageRef&gt;</code> | Public runtime operation for copy. |
| `delete` | method | <code>delete(input: ArtifactStorageRef): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `exists` | method | <code>exists(input: ArtifactStorageRef): Promise&lt;boolean&gt;</code> | Public runtime operation for exists. |
| `get` | method | <code>get(input: ArtifactGetRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactContent&gt;</code> | Gets get at this module boundary. |
| `head` | method | <code>head(input: ArtifactStorageRef): Promise&lt;ArtifactObjectMetadata &#124; null&gt;</code> | Public runtime operation for head. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `put` | method | <code>put(input: ArtifactPutRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactStorageRef&gt;</code> | Public runtime operation for put. |
| `stats` | method | <code>stats(): Promise&lt;LocalFilesystemExecutionArtifactStoreStats&gt;</code> | Public runtime operation for stats. |

## `LocalArtifactGarbageCollectionResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deletedBlobs` | property | <code>deletedBlobs: number</code> | Public deleted Blobs property. |
| `reclaimedBytes` | property | <code>reclaimedBytes: number</code> | Public reclaimed Bytes property. |

## `LocalFilesystemExecutionArtifactStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `maxObjectBytes` | property | <code>maxObjectBytes: number</code> | Public max Object Bytes property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `rootPath` | property | <code>rootPath: string</code> | Public root Path property. |

## `LocalFilesystemExecutionArtifactStoreStats` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `blobs` | property | <code>blobs: number</code> | Public blobs property. |
| `objects` | property | <code>objects: number</code> | Public objects property. |
| `storedBytes` | property | <code>storedBytes: number</code> | Public stored Bytes property. |
