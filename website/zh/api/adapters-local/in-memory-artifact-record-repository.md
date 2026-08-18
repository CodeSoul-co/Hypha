# `@codesoul-co/hypha-adapters-local` / `in-memory-artifact-record-repository`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/in-memory-artifact-record-repository.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-artifact-record-repository.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryArtifactRecordRepository` | 类 | <code>new InMemoryArtifactRecordRepository(options?: InMemoryArtifactRecordRepositoryOptions): InMemoryArtifactRecordRepository</code> | In Memory Artifact Record Repository 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryArtifactRecordRepositoryOptions` | 接口 | <code>interface InMemoryArtifactRecordRepositoryOptions</code> | In Memory Artifact Record Repository Options 的字段契约；完整字段见下表。 |

## `InMemoryArtifactRecordRepository` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimGarbageCollection` | 方法 | <code>claimGarbageCollection(request: ArtifactGarbageCollectionClaimRequest): Promise&lt;boolean&gt;</code> | claim Garbage Collection 的公开运行时操作。 |
| `commit` | 方法 | <code>commit(request: ArtifactRecordCommitRequest): Promise&lt;void&gt;</code> | commit 的公开运行时操作。 |
| `completeGarbageCollection` | 方法 | <code>completeGarbageCollection(claimId: string, completedAt: string): Promise&lt;void&gt;</code> | complete Garbage Collection 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options?: InMemoryArtifactRecordRepositoryOptions): InMemoryArtifactRecordRepository</code> | 创建该类的实例。 |
| `findIdempotency` | 方法 | <code>findIdempotency(operationId: string, idempotencyKey: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | find Idempotency 的公开运行时操作。 |
| `get` | 方法 | <code>get(artifactId: string, versionId?: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | 读取 get。 |
| `getByVersionId` | 方法 | <code>getByVersionId(versionId: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | 读取 By Version Id。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `list` | 方法 | <code>list(): Promise&lt;StoredArtifactRecord[]&gt;</code> | 列出 list。 |
| `listGarbageCollectionCandidates` | 方法 | <code>listGarbageCollectionCandidates(request: ArtifactGarbageCollectionScanRequest): Promise&lt;ArtifactGarbageCollectionCandidate[]&gt;</code> | 列出 Garbage Collection Candidates。 |
| `releaseGarbageCollection` | 方法 | <code>releaseGarbageCollection(claimId: string): Promise&lt;void&gt;</code> | release Garbage Collection 的公开运行时操作。 |

## `InMemoryArtifactRecordRepositoryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
