# `@codesoul-co/hypha-core` / `contracts/artifact-record-repository`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/artifact-record-repository.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)
- 导出数: **7**

## 模块用法

用于声明并运行时校验契约。Artifact record repository 模块公开 2 类、5 接口。

### 从包入口导入

```ts
import {
  ArtifactRecordRepositoryConflictError,
  ArtifactRecordRepositoryError,
} from '@codesoul-co/hypha-core';

import type {
  ArtifactIdempotencyRecord,
  ArtifactRecordCommitRequest,
  ArtifactRecordRepository,
  ArtifactRevisionFence,
  StoredArtifactRecord,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 5 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactRecordRepositoryConflictError` | 类 | <code>new ArtifactRecordRepositoryConflictError(message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): ArtifactRecordRepositoryConflictError</code> | Artifact Record Repository Conflict Error 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ArtifactRecordRepositoryError` | 类 | <code>new ArtifactRecordRepositoryError(code: "ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE" &#124; "ARTIFACT_RECORD_REPOSITORY_CORRUPT", message: string, cause?: unknown &#124; undefined): ArtifactRecordRepositoryError</code> | Artifact Record Repository Error 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ArtifactIdempotencyRecord` | 接口 | <code>interface ArtifactIdempotencyRecord</code> | Artifact Idempotency Record 接口，共包含 4 个公开字段或方法。 |
| `ArtifactRecordCommitRequest` | 接口 | <code>interface ArtifactRecordCommitRequest</code> | Artifact Record Commit Request 接口，共包含 3 个公开字段或方法。 |
| `ArtifactRecordRepository` | 接口 | <code>interface ArtifactRecordRepository</code> | Metadata persistence port for ArtifactManager. Implementations persist records, version/lineage links, and idempotency results, but never Artifact content bytes. |
| `ArtifactRevisionFence` | 接口 | <code>interface ArtifactRevisionFence</code> | Artifact Revision Fence 接口，共包含 3 个公开字段或方法。 |
| `StoredArtifactRecord` | 接口 | <code>interface StoredArtifactRecord</code> | Stored Artifact Record 接口，共包含 2 个公开字段或方法。 |

## `ArtifactRecordRepositoryConflictError`

Artifact Record Repository Conflict Error 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ArtifactRecordRepositoryConflictError } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)

### 声明

```text
export declare class ArtifactRecordRepositoryConflictError extends Error {
    readonly details?: Record<string, unknown> | undefined;
    constructor(message: string, details?: Record<string, unknown> | undefined);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): ArtifactRecordRepositoryConflictError</code> | 创建该类的实例。 |
| `details` | 属性 | <code>readonly details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `ArtifactRecordRepositoryError`

Artifact Record Repository Error 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ArtifactRecordRepositoryError } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)

### 声明

```text
export declare class ArtifactRecordRepositoryError extends Error {
    readonly code: 'ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE' | 'ARTIFACT_RECORD_REPOSITORY_CORRUPT';
    readonly cause?: unknown | undefined;
    constructor(code: 'ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE' | 'ARTIFACT_RECORD_REPOSITORY_CORRUPT', message: string, cause?: unknown | undefined);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>readonly cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>readonly code: "ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE" &#124; "ARTIFACT_RECORD_REPOSITORY_CORRUPT"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(code: "ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE" &#124; "ARTIFACT_RECORD_REPOSITORY_CORRUPT", message: string, cause?: unknown &#124; undefined): ArtifactRecordRepositoryError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `ArtifactIdempotencyRecord`

Artifact Idempotency Record 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactIdempotencyRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)

### 声明

```text
export interface ArtifactIdempotencyRecord {
    operationId: string;
    idempotencyKey: string;
    artifactId: string;
    versionId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactRecordCommitRequest`

Artifact Record Commit Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactRecordCommitRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)

### 声明

```text
export interface ArtifactRecordCommitRequest {
    records: StoredArtifactRecord[];
    expectedLatest?: ArtifactRevisionFence;
    idempotency?: ArtifactIdempotencyRecord;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedLatest` | 属性 | <code>expectedLatest?: ArtifactRevisionFence</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotency` | 属性 | <code>idempotency?: ArtifactIdempotencyRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `records` | 属性 | <code>records: StoredArtifactRecord[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactRecordRepository`

Metadata persistence port for ArtifactManager. Implementations persist records, version/lineage links, and idempotency results, but never Artifact content bytes.

- 种类: 接口
- 导入: `import type { ArtifactRecordRepository } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)

### 声明

```text
export interface ArtifactRecordRepository {
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
    close?(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimGarbageCollection` | 方法 | <code>claimGarbageCollection(request: ArtifactGarbageCollectionClaimRequest): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `commit` | 方法 | <code>commit(request: ArtifactRecordCommitRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `completeGarbageCollection` | 方法 | <code>completeGarbageCollection(claimId: string, completedAt: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `findIdempotency` | 方法 | <code>findIdempotency(operationId: string, idempotencyKey: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(artifactId: string, versionId?: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getByVersionId` | 方法 | <code>getByVersionId(versionId: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): Promise&lt;StoredArtifactRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listGarbageCollectionCandidates` | 方法 | <code>listGarbageCollectionCandidates(request: ArtifactGarbageCollectionScanRequest): Promise&lt;ArtifactGarbageCollectionCandidate[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `releaseGarbageCollection` | 方法 | <code>releaseGarbageCollection(claimId: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ArtifactRevisionFence`

Artifact Revision Fence 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactRevisionFence } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)

### 声明

```text
export interface ArtifactRevisionFence {
    artifactId: string;
    versionId: string;
    revision: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StoredArtifactRecord`

Stored Artifact Record 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StoredArtifactRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)

### 声明

```text
export interface StoredArtifactRecord {
    record: ArtifactRecord;
    profileRef: SpecRef;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `record` | 属性 | <code>record: ArtifactRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
