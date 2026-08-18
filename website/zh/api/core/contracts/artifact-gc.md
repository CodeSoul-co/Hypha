# `@codesoul-co/hypha-core` / `contracts/artifact-gc`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/artifact-gc.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)
- 导出数: **8**

## 模块用法

用于声明并运行时校验契约。Artifact gc 模块公开 8 接口。

### 从包入口导入

```ts
import type {
  ArtifactGarbageCollectionCandidate,
  ArtifactGarbageCollectionClaimRequest,
  ArtifactGarbageCollectionFailure,
  ArtifactGarbageCollectionRequest,
  ArtifactGarbageCollectionResult,
  ArtifactGarbageCollectionScanRequest,
  ArtifactGarbageCollector,
  DefaultArtifactGarbageCollectorOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 8 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactGarbageCollectionCandidate` | 接口 | <code>interface ArtifactGarbageCollectionCandidate</code> | Artifact Garbage Collection Candidate 接口，共包含 5 个公开字段或方法。 |
| `ArtifactGarbageCollectionClaimRequest` | 接口 | <code>interface ArtifactGarbageCollectionClaimRequest</code> | Artifact Garbage Collection Claim Request 接口，共包含 4 个公开字段或方法。 |
| `ArtifactGarbageCollectionFailure` | 接口 | <code>interface ArtifactGarbageCollectionFailure</code> | Artifact Garbage Collection Failure 接口，共包含 4 个公开字段或方法。 |
| `ArtifactGarbageCollectionRequest` | 接口 | <code>interface ArtifactGarbageCollectionRequest</code> | Artifact Garbage Collection Request 接口，共包含 4 个公开字段或方法。 |
| `ArtifactGarbageCollectionResult` | 接口 | <code>interface ArtifactGarbageCollectionResult</code> | Artifact Garbage Collection Result 接口，共包含 12 个公开字段或方法。 |
| `ArtifactGarbageCollectionScanRequest` | 接口 | <code>interface ArtifactGarbageCollectionScanRequest</code> | Artifact Garbage Collection Scan Request 接口，共包含 2 个公开字段或方法。 |
| `ArtifactGarbageCollector` | 接口 | <code>interface ArtifactGarbageCollector</code> | Artifact Garbage Collector 接口，共包含 1 个公开字段或方法。 |
| `DefaultArtifactGarbageCollectorOptions` | 接口 | <code>interface DefaultArtifactGarbageCollectorOptions</code> | Default Artifact Garbage Collector Options 接口，共包含 5 个公开字段或方法。 |

## `ArtifactGarbageCollectionCandidate`

Artifact Garbage Collection Candidate 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactGarbageCollectionCandidate } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### 声明

```text
export interface ArtifactGarbageCollectionCandidate {
    storageRef: ArtifactStorageRef;
    contentHash: string;
    sizeBytes: number;
    versionIds: string[];
    profileRefs: SpecRef[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRefs` | 属性 | <code>profileRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `storageRef` | 属性 | <code>storageRef: ArtifactStorageRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionIds` | 属性 | <code>versionIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactGarbageCollectionClaimRequest`

Artifact Garbage Collection Claim Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactGarbageCollectionClaimRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### 声明

```text
export interface ArtifactGarbageCollectionClaimRequest {
    claimId: string;
    claimedAt: string;
    staleBefore: string;
    candidate: ArtifactGarbageCollectionCandidate;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidate` | 属性 | <code>candidate: ArtifactGarbageCollectionCandidate</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `claimedAt` | 属性 | <code>claimedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `claimId` | 属性 | <code>claimId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `staleBefore` | 属性 | <code>staleBefore: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactGarbageCollectionFailure`

Artifact Garbage Collection Failure 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactGarbageCollectionFailure } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### 声明

```text
export interface ArtifactGarbageCollectionFailure {
    storageRef: ArtifactStorageRef;
    code: string;
    message: string;
    retryable: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `code` | 属性 | <code>code: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `storageRef` | 属性 | <code>storageRef: ArtifactStorageRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactGarbageCollectionRequest`

Artifact Garbage Collection Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactGarbageCollectionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### 声明

```text
export interface ArtifactGarbageCollectionRequest {
    operationId: string;
    dryRun?: boolean;
    limit?: number;
    claimTtlSeconds?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimTtlSeconds` | 属性 | <code>claimTtlSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dryRun` | 属性 | <code>dryRun?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `limit` | 属性 | <code>limit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactGarbageCollectionResult`

Artifact Garbage Collection Result 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactGarbageCollectionResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### 声明

```text
export interface ArtifactGarbageCollectionResult {
    operationId: string;
    dryRun: boolean;
    candidateObjects: number;
    claimedObjects: number;
    deletedObjects: number;
    missingObjects: number;
    skippedPolicyObjects: number;
    skippedConcurrentObjects: number;
    reclaimedBytes: number;
    failures: ArtifactGarbageCollectionFailure[];
    startedAt: string;
    completedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidateObjects` | 属性 | <code>candidateObjects: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `claimedObjects` | 属性 | <code>claimedObjects: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deletedObjects` | 属性 | <code>deletedObjects: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dryRun` | 属性 | <code>dryRun: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failures` | 属性 | <code>failures: ArtifactGarbageCollectionFailure[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `missingObjects` | 属性 | <code>missingObjects: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reclaimedBytes` | 属性 | <code>reclaimedBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skippedConcurrentObjects` | 属性 | <code>skippedConcurrentObjects: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skippedPolicyObjects` | 属性 | <code>skippedPolicyObjects: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactGarbageCollectionScanRequest`

Artifact Garbage Collection Scan Request 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactGarbageCollectionScanRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### 声明

```text
export interface ArtifactGarbageCollectionScanRequest {
    limit?: number;
    staleBefore: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `limit` | 属性 | <code>limit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `staleBefore` | 属性 | <code>staleBefore: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactGarbageCollector`

Artifact Garbage Collector 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactGarbageCollector } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### 声明

```text
export interface ArtifactGarbageCollector {
    collect(request: ArtifactGarbageCollectionRequest): Promise<ArtifactGarbageCollectionResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collect` | 方法 | <code>collect(request: ArtifactGarbageCollectionRequest): Promise&lt;ArtifactGarbageCollectionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DefaultArtifactGarbageCollectorOptions`

Default Artifact Garbage Collector Options 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DefaultArtifactGarbageCollectorOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### 声明

```text
export interface DefaultArtifactGarbageCollectorOptions {
    profiles: ArtifactProfileSpec[];
    stores: ArtifactStoreProvider[];
    repository: ArtifactRecordRepository;
    idGenerator: () => string;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `idGenerator` | 方法 | <code>idGenerator(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `profiles` | 属性 | <code>profiles: ArtifactProfileSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `repository` | 属性 | <code>repository: ArtifactRecordRepository</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stores` | 属性 | <code>stores: ArtifactStoreProvider[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
