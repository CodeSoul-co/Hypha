# `@codesoul-co/hypha-adapters-local` / `local-filesystem-execution-artifact-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-filesystem-execution-artifact-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-filesystem-execution-artifact-store.ts)
- 导出数: **4**

## 模块用法

用于持久化并读取该边界的数据。Local filesystem execution artifact store 模块公开 1 类、3 接口。

### 从包入口导入

```ts
import {
  LocalFilesystemExecutionArtifactStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalArtifactGarbageCollectionResult,
  LocalFilesystemExecutionArtifactStoreOptions,
  LocalFilesystemExecutionArtifactStoreStats,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalFilesystemExecutionArtifactStore` | 类 | <code>new LocalFilesystemExecutionArtifactStore(options: LocalFilesystemExecutionArtifactStoreOptions): LocalFilesystemExecutionArtifactStore</code> | Local Filesystem Execution Artifact Store 类，共公开 13 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LocalArtifactGarbageCollectionResult` | 接口 | <code>interface LocalArtifactGarbageCollectionResult</code> | Local Artifact Garbage Collection Result 接口，共包含 2 个公开字段或方法。 |
| `LocalFilesystemExecutionArtifactStoreOptions` | 接口 | <code>interface LocalFilesystemExecutionArtifactStoreOptions</code> | Local Filesystem Execution Artifact Store Options 接口，共包含 4 个公开字段或方法。 |
| `LocalFilesystemExecutionArtifactStoreStats` | 接口 | <code>interface LocalFilesystemExecutionArtifactStoreStats</code> | Local Filesystem Execution Artifact Store Stats 接口，共包含 3 个公开字段或方法。 |

## `LocalFilesystemExecutionArtifactStore`

Local Filesystem Execution Artifact Store 类，共公开 13 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LocalFilesystemExecutionArtifactStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-filesystem-execution-artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-filesystem-execution-artifact-store.ts)

### 声明

```text
export declare class LocalFilesystemExecutionArtifactStore implements ArtifactStoreProvider {
    readonly id: string;
    constructor(options: LocalFilesystemExecutionArtifactStoreOptions);
    capabilities(): Promise<ArtifactStoreCapabilities>;
    put(input: ArtifactPutRequest, options?: ArtifactOperationOptions): Promise<ArtifactStorageRef>;
    get(input: ArtifactGetRequest, options?: ArtifactOperationOptions): Promise<ArtifactContent>;
    head(input: ArtifactStorageRef): Promise<ArtifactObjectMetadata | null>;
    exists(input: ArtifactStorageRef): Promise<boolean>;
    delete(input: ArtifactStorageRef): Promise<void>;
    copy(input: ArtifactCopyRequest): Promise<ArtifactStorageRef>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
    stats(): Promise<LocalFilesystemExecutionArtifactStoreStats>;
    collectGarbage(): Promise<LocalArtifactGarbageCollectionResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ArtifactStoreCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `collectGarbage` | 方法 | <code>collectGarbage(): Promise&lt;LocalArtifactGarbageCollectionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: LocalFilesystemExecutionArtifactStoreOptions): LocalFilesystemExecutionArtifactStore</code> | 创建该类的实例。 |
| `copy` | 方法 | <code>copy(input: ArtifactCopyRequest): Promise&lt;ArtifactStorageRef&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(input: ArtifactStorageRef): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `exists` | 方法 | <code>exists(input: ArtifactStorageRef): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(input: ArtifactGetRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactContent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `head` | 方法 | <code>head(input: ArtifactStorageRef): Promise&lt;ArtifactObjectMetadata &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `put` | 方法 | <code>put(input: ArtifactPutRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactStorageRef&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stats` | 方法 | <code>stats(): Promise&lt;LocalFilesystemExecutionArtifactStoreStats&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalArtifactGarbageCollectionResult`

Local Artifact Garbage Collection Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalArtifactGarbageCollectionResult } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-filesystem-execution-artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-filesystem-execution-artifact-store.ts)

### 声明

```text
export interface LocalArtifactGarbageCollectionResult {
    deletedBlobs: number;
    reclaimedBytes: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deletedBlobs` | 属性 | <code>deletedBlobs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reclaimedBytes` | 属性 | <code>reclaimedBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalFilesystemExecutionArtifactStoreOptions`

Local Filesystem Execution Artifact Store Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalFilesystemExecutionArtifactStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-filesystem-execution-artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-filesystem-execution-artifact-store.ts)

### 声明

```text
export interface LocalFilesystemExecutionArtifactStoreOptions {
    id?: string;
    rootPath: string;
    maxObjectBytes?: number;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxObjectBytes` | 属性 | <code>maxObjectBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `rootPath` | 属性 | <code>rootPath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalFilesystemExecutionArtifactStoreStats`

Local Filesystem Execution Artifact Store Stats 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalFilesystemExecutionArtifactStoreStats } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-filesystem-execution-artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-filesystem-execution-artifact-store.ts)

### 声明

```text
export interface LocalFilesystemExecutionArtifactStoreStats {
    objects: number;
    blobs: number;
    storedBytes: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `blobs` | 属性 | <code>blobs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `objects` | 属性 | <code>objects: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `storedBytes` | 属性 | <code>storedBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
