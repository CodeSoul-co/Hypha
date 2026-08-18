# `@codesoul-co/hypha-core` / `contracts/artifact-gc`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/artifact-gc.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)
- 导出数: **8**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactGarbageCollectionCandidate` | 接口 | <code>interface ArtifactGarbageCollectionCandidate</code> | Artifact Garbage Collection Candidate 的字段契约；完整字段见下表。 |
| `ArtifactGarbageCollectionClaimRequest` | 接口 | <code>interface ArtifactGarbageCollectionClaimRequest</code> | Artifact Garbage Collection Claim Request 的字段契约；完整字段见下表。 |
| `ArtifactGarbageCollectionFailure` | 接口 | <code>interface ArtifactGarbageCollectionFailure</code> | Artifact Garbage Collection Failure 的字段契约；完整字段见下表。 |
| `ArtifactGarbageCollectionRequest` | 接口 | <code>interface ArtifactGarbageCollectionRequest</code> | Artifact Garbage Collection Request 的字段契约；完整字段见下表。 |
| `ArtifactGarbageCollectionResult` | 接口 | <code>interface ArtifactGarbageCollectionResult</code> | Artifact Garbage Collection Result 的字段契约；完整字段见下表。 |
| `ArtifactGarbageCollectionScanRequest` | 接口 | <code>interface ArtifactGarbageCollectionScanRequest</code> | Artifact Garbage Collection Scan Request 的字段契约；完整字段见下表。 |
| `ArtifactGarbageCollector` | 接口 | <code>interface ArtifactGarbageCollector</code> | Artifact Garbage Collector 的字段契约；完整字段见下表。 |
| `DefaultArtifactGarbageCollectorOptions` | 接口 | <code>interface DefaultArtifactGarbageCollectorOptions</code> | Default Artifact Garbage Collector Options 的字段契约；完整字段见下表。 |

## `ArtifactGarbageCollectionCandidate` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `profileRefs` | 属性 | <code>profileRefs: SpecRef[]</code> | profile Refs 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
| `storageRef` | 属性 | <code>storageRef: ArtifactStorageRef</code> | storage Ref 字段。 |
| `versionIds` | 属性 | <code>versionIds: string[]</code> | version Ids 字段。 |

## `ArtifactGarbageCollectionClaimRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidate` | 属性 | <code>candidate: ArtifactGarbageCollectionCandidate</code> | candidate 字段。 |
| `claimedAt` | 属性 | <code>claimedAt: string</code> | claimed At 字段。 |
| `claimId` | 属性 | <code>claimId: string</code> | claim Id 字段。 |
| `staleBefore` | 属性 | <code>staleBefore: string</code> | stale Before 字段。 |

## `ArtifactGarbageCollectionFailure` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `code` | 属性 | <code>code: string</code> | code 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | retryable 字段。 |
| `storageRef` | 属性 | <code>storageRef: ArtifactStorageRef</code> | storage Ref 字段。 |

## `ArtifactGarbageCollectionRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimTtlSeconds` | 属性 | <code>claimTtlSeconds: number</code> | claim Ttl Seconds 字段。 |
| `dryRun` | 属性 | <code>dryRun: boolean</code> | dry Run 字段。 |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |

## `ArtifactGarbageCollectionResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidateObjects` | 属性 | <code>candidateObjects: number</code> | candidate Objects 字段。 |
| `claimedObjects` | 属性 | <code>claimedObjects: number</code> | claimed Objects 字段。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `deletedObjects` | 属性 | <code>deletedObjects: number</code> | deleted Objects 字段。 |
| `dryRun` | 属性 | <code>dryRun: boolean</code> | dry Run 字段。 |
| `failures` | 属性 | <code>failures: ArtifactGarbageCollectionFailure[]</code> | failures 字段。 |
| `missingObjects` | 属性 | <code>missingObjects: number</code> | missing Objects 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `reclaimedBytes` | 属性 | <code>reclaimedBytes: number</code> | reclaimed Bytes 字段。 |
| `skippedConcurrentObjects` | 属性 | <code>skippedConcurrentObjects: number</code> | skipped Concurrent Objects 字段。 |
| `skippedPolicyObjects` | 属性 | <code>skippedPolicyObjects: number</code> | skipped Policy Objects 字段。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | started At 字段。 |

## `ArtifactGarbageCollectionScanRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `staleBefore` | 属性 | <code>staleBefore: string</code> | stale Before 字段。 |

## `ArtifactGarbageCollector` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collect` | 方法 | <code>collect(request: ArtifactGarbageCollectionRequest): Promise&lt;ArtifactGarbageCollectionResult&gt;</code> | collect 的公开运行时操作。 |

## `DefaultArtifactGarbageCollectorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `idGenerator` | 方法 | <code>idGenerator(): string</code> | id Generator 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `profiles` | 属性 | <code>profiles: ArtifactProfileSpec[]</code> | profiles 字段。 |
| `repository` | 属性 | <code>repository: ArtifactRecordRepository</code> | repository 字段。 |
| `stores` | 属性 | <code>stores: ArtifactStoreProvider[]</code> | stores 字段。 |
