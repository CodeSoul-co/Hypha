# `@codesoul-co/hypha-adapters-local` / `sqlite-artifact-record-repository`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/sqlite-artifact-record-repository.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-artifact-record-repository.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。Sqlite artifact record repository 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  SQLiteArtifactRecordRepository,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteArtifactRecordRepositoryOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteArtifactRecordRepository` | 类 | <code>new SQLiteArtifactRecordRepository(options: SQLiteArtifactRecordRepositoryOptions): SQLiteArtifactRecordRepository</code> | SQLite Artifact Record Repository 类，共公开 14 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SQLiteArtifactRecordRepositoryOptions` | 接口 | <code>interface SQLiteArtifactRecordRepositoryOptions</code> | SQLite Artifact Record Repository Options 接口，共包含 5 个公开字段或方法。 |

## `SQLiteArtifactRecordRepository`

SQLite Artifact Record Repository 类，共公开 14 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SQLiteArtifactRecordRepository } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`sqlite-artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-artifact-record-repository.ts)

### 声明

```text
export declare class SQLiteArtifactRecordRepository implements ArtifactRecordRepository {
    readonly id: string;
    readonly filename: string;
    constructor(options: SQLiteArtifactRecordRepositoryOptions);
    get(artifactId: string, versionId?: string): Promise<StoredArtifactRecord | null>;
    getByVersionId(versionId: string): Promise<StoredArtifactRecord | null>;
    list(): Promise<StoredArtifactRecord[]>;
    findIdempotency(operationId: string, idempotencyKey: string): Promise<StoredArtifactRecord | null>;
    commit(request: ArtifactRecordCommitRequest): Promise<void>;
    listGarbageCollectionCandidates(request: ArtifactGarbageCollectionScanRequest): Promise<ArtifactGarbageCollectionCandidate[]>;
    claimGarbageCollection(request: ArtifactGarbageCollectionClaimRequest): Promise<boolean>;
    completeGarbageCollection(claimId: string, completedAt: string): Promise<void>;
    releaseGarbageCollection(claimId: string): Promise<void>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimGarbageCollection` | 方法 | <code>claimGarbageCollection(request: ArtifactGarbageCollectionClaimRequest): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `commit` | 方法 | <code>commit(request: ArtifactRecordCommitRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `completeGarbageCollection` | 方法 | <code>completeGarbageCollection(claimId: string, completedAt: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: SQLiteArtifactRecordRepositoryOptions): SQLiteArtifactRecordRepository</code> | 创建该类的实例。 |
| `filename` | 属性 | <code>readonly filename: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `findIdempotency` | 方法 | <code>findIdempotency(operationId: string, idempotencyKey: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(artifactId: string, versionId?: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getByVersionId` | 方法 | <code>getByVersionId(versionId: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `list` | 方法 | <code>list(): Promise&lt;StoredArtifactRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listGarbageCollectionCandidates` | 方法 | <code>listGarbageCollectionCandidates(request: ArtifactGarbageCollectionScanRequest): Promise&lt;ArtifactGarbageCollectionCandidate[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `releaseGarbageCollection` | 方法 | <code>releaseGarbageCollection(claimId: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SQLiteArtifactRecordRepositoryOptions`

SQLite Artifact Record Repository Options 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SQLiteArtifactRecordRepositoryOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`sqlite-artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-artifact-record-repository.ts)

### 声明

```text
export interface SQLiteArtifactRecordRepositoryOptions {
    rootPath: string;
    filename?: string;
    id?: string;
    busyTimeoutMs?: number;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `busyTimeoutMs` | 属性 | <code>busyTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `filename` | 属性 | <code>filename?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `rootPath` | 属性 | <code>rootPath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
