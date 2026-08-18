# `@codesoul-co/hypha-core` / `contracts/artifact-gc`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/artifact-gc.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)
- Exports: **8**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactGarbageCollectionCandidate` | interface | <code>interface ArtifactGarbageCollectionCandidate</code> | Field contract for Artifact Garbage Collection Candidate; see all contract members below. |
| `ArtifactGarbageCollectionClaimRequest` | interface | <code>interface ArtifactGarbageCollectionClaimRequest</code> | Field contract for Artifact Garbage Collection Claim Request; see all contract members below. |
| `ArtifactGarbageCollectionFailure` | interface | <code>interface ArtifactGarbageCollectionFailure</code> | Field contract for Artifact Garbage Collection Failure; see all contract members below. |
| `ArtifactGarbageCollectionRequest` | interface | <code>interface ArtifactGarbageCollectionRequest</code> | Field contract for Artifact Garbage Collection Request; see all contract members below. |
| `ArtifactGarbageCollectionResult` | interface | <code>interface ArtifactGarbageCollectionResult</code> | Field contract for Artifact Garbage Collection Result; see all contract members below. |
| `ArtifactGarbageCollectionScanRequest` | interface | <code>interface ArtifactGarbageCollectionScanRequest</code> | Field contract for Artifact Garbage Collection Scan Request; see all contract members below. |
| `ArtifactGarbageCollector` | interface | <code>interface ArtifactGarbageCollector</code> | Field contract for Artifact Garbage Collector; see all contract members below. |
| `DefaultArtifactGarbageCollectorOptions` | interface | <code>interface DefaultArtifactGarbageCollectorOptions</code> | Field contract for Default Artifact Garbage Collector Options; see all contract members below. |

## `ArtifactGarbageCollectionCandidate` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `profileRefs` | property | <code>profileRefs: SpecRef[]</code> | Public profile Refs property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `storageRef` | property | <code>storageRef: ArtifactStorageRef</code> | Public storage Ref property. |
| `versionIds` | property | <code>versionIds: string[]</code> | Public version Ids property. |

## `ArtifactGarbageCollectionClaimRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidate` | property | <code>candidate: ArtifactGarbageCollectionCandidate</code> | Public candidate property. |
| `claimedAt` | property | <code>claimedAt: string</code> | Public claimed At property. |
| `claimId` | property | <code>claimId: string</code> | Public claim Id property. |
| `staleBefore` | property | <code>staleBefore: string</code> | Public stale Before property. |

## `ArtifactGarbageCollectionFailure` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `code` | property | <code>code: string</code> | Public code property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `retryable` | property | <code>retryable: boolean</code> | Public retryable property. |
| `storageRef` | property | <code>storageRef: ArtifactStorageRef</code> | Public storage Ref property. |

## `ArtifactGarbageCollectionRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimTtlSeconds` | property | <code>claimTtlSeconds: number</code> | Public claim Ttl Seconds property. |
| `dryRun` | property | <code>dryRun: boolean</code> | Public dry Run property. |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |

## `ArtifactGarbageCollectionResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidateObjects` | property | <code>candidateObjects: number</code> | Public candidate Objects property. |
| `claimedObjects` | property | <code>claimedObjects: number</code> | Public claimed Objects property. |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `deletedObjects` | property | <code>deletedObjects: number</code> | Public deleted Objects property. |
| `dryRun` | property | <code>dryRun: boolean</code> | Public dry Run property. |
| `failures` | property | <code>failures: ArtifactGarbageCollectionFailure[]</code> | Public failures property. |
| `missingObjects` | property | <code>missingObjects: number</code> | Public missing Objects property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `reclaimedBytes` | property | <code>reclaimedBytes: number</code> | Public reclaimed Bytes property. |
| `skippedConcurrentObjects` | property | <code>skippedConcurrentObjects: number</code> | Public skipped Concurrent Objects property. |
| `skippedPolicyObjects` | property | <code>skippedPolicyObjects: number</code> | Public skipped Policy Objects property. |
| `startedAt` | property | <code>startedAt: string</code> | Public started At property. |

## `ArtifactGarbageCollectionScanRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `staleBefore` | property | <code>staleBefore: string</code> | Public stale Before property. |

## `ArtifactGarbageCollector` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collect` | method | <code>collect(request: ArtifactGarbageCollectionRequest): Promise&lt;ArtifactGarbageCollectionResult&gt;</code> | Public runtime operation for collect. |

## `DefaultArtifactGarbageCollectorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `idGenerator` | method | <code>idGenerator(): string</code> | Public runtime operation for id Generator. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `profiles` | property | <code>profiles: ArtifactProfileSpec[]</code> | Public profiles property. |
| `repository` | property | <code>repository: ArtifactRecordRepository</code> | Public repository property. |
| `stores` | property | <code>stores: ArtifactStoreProvider[]</code> | Public stores property. |
