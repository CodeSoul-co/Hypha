# `@codesoul-co/hypha-adapters-local` / `sqlite-artifact-record-repository`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/sqlite-artifact-record-repository.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-artifact-record-repository.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteArtifactRecordRepository` | class | <code>new SQLiteArtifactRecordRepository(options: SQLiteArtifactRecordRepositoryOptions): SQLiteArtifactRecordRepository</code> | Runtime implementation for SQ Lite Artifact Record Repository; see its public constructor and members below. |
| `SQLiteArtifactRecordRepositoryOptions` | interface | <code>interface SQLiteArtifactRecordRepositoryOptions</code> | Field contract for SQ Lite Artifact Record Repository Options; see all contract members below. |

## `SQLiteArtifactRecordRepository` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimGarbageCollection` | method | <code>claimGarbageCollection(request: ArtifactGarbageCollectionClaimRequest): Promise&lt;boolean&gt;</code> | Public runtime operation for claim Garbage Collection. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `commit` | method | <code>commit(request: ArtifactRecordCommitRequest): Promise&lt;void&gt;</code> | Public runtime operation for commit. |
| `completeGarbageCollection` | method | <code>completeGarbageCollection(claimId: string, completedAt: string): Promise&lt;void&gt;</code> | Public runtime operation for complete Garbage Collection. |
| `constructor` | constructor | <code>(options: SQLiteArtifactRecordRepositoryOptions): SQLiteArtifactRecordRepository</code> | Creates an instance of this class. |
| `filename` | property | <code>filename: string</code> | Public filename property. |
| `findIdempotency` | method | <code>findIdempotency(operationId: string, idempotencyKey: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | Public runtime operation for find Idempotency. |
| `get` | method | <code>get(artifactId: string, versionId?: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `getByVersionId` | method | <code>getByVersionId(versionId: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | Gets By Version Id at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `list` | method | <code>list(): Promise&lt;StoredArtifactRecord[]&gt;</code> | Lists list at this module boundary. |
| `listGarbageCollectionCandidates` | method | <code>listGarbageCollectionCandidates(request: ArtifactGarbageCollectionScanRequest): Promise&lt;ArtifactGarbageCollectionCandidate[]&gt;</code> | Lists Garbage Collection Candidates at this module boundary. |
| `releaseGarbageCollection` | method | <code>releaseGarbageCollection(claimId: string): Promise&lt;void&gt;</code> | Public runtime operation for release Garbage Collection. |

## `SQLiteArtifactRecordRepositoryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `busyTimeoutMs` | property | <code>busyTimeoutMs: number</code> | Public busy Timeout Ms property. |
| `filename` | property | <code>filename: string</code> | Public filename property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `rootPath` | property | <code>rootPath: string</code> | Public root Path property. |
