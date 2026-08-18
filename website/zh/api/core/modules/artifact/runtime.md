# `@codesoul-co/hypha-core` / `modules/artifact/runtime`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/artifact/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/runtime.ts)
- 导出数: **2**

## 模块用法

用于执行该边界的运行时行为。Runtime 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  DefaultArtifactManager,
} from '@codesoul-co/hypha-core';

import type {
  DefaultArtifactManagerOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultArtifactManager` | 类 | <code>new DefaultArtifactManager(options: DefaultArtifactManagerOptions): DefaultArtifactManager</code> | Default Artifact Manager 类，共公开 17 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DefaultArtifactManagerOptions` | 接口 | <code>interface DefaultArtifactManagerOptions</code> | Default Artifact Manager Options 接口，共包含 6 个公开字段或方法。 |

## `DefaultArtifactManager`

Default Artifact Manager 类，共公开 17 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultArtifactManager } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/runtime.ts)

### 声明

```text
export declare class DefaultArtifactManager implements ArtifactManager {
    constructor(options: DefaultArtifactManagerOptions);
    create(input: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    createFromWorkspace(input: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    createVersion(input: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    get(request: ArtifactGetRecordRequest): Promise<ArtifactRecord | null>;
    read(input: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise<ArtifactReadResult>;
    createDownloadAccess(input: ArtifactCreateDownloadAccessRequest): Promise<ArtifactDownloadAccess>;
    list(input: ArtifactListRequest): Promise<ArtifactRecord[]>;
    finalize(request: ArtifactFinalizeRequest): Promise<ArtifactRecord>;
    archive(request: ArtifactArchiveRequest): Promise<ArtifactRecord>;
    invalidate(request: ArtifactInvalidateRequest): Promise<ArtifactRecord>;
    delete(input: ArtifactDeleteRequest): Promise<void>;
    traceLineage(input: ArtifactTraceLineageRequest): Promise<ArtifactLineage>;
    latest(input: ArtifactLatestRequest): Promise<ArtifactRecord | null>;
    previous(input: ArtifactPreviousRequest): Promise<ArtifactRecord | null>;
    profile(ref: SpecRef): Promise<ArtifactProfileSpec | null>;
    health(): Promise<Record<string, ProviderHealth>>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archive` | 方法 | <code>archive(request: ArtifactArchiveRequest): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: DefaultArtifactManagerOptions): DefaultArtifactManager</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `createDownloadAccess` | 方法 | <code>createDownloadAccess(input: ArtifactCreateDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `createFromWorkspace` | 方法 | <code>createFromWorkspace(input: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `createVersion` | 方法 | <code>createVersion(input: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(input: ArtifactDeleteRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `finalize` | 方法 | <code>finalize(request: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: ArtifactGetRecordRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidate` | 方法 | <code>invalidate(request: ArtifactInvalidateRequest): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `latest` | 方法 | <code>latest(input: ArtifactLatestRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(input: ArtifactListRequest): Promise&lt;ArtifactRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `previous` | 方法 | <code>previous(input: ArtifactPreviousRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `profile` | 方法 | <code>profile(ref: SpecRef): Promise&lt;ArtifactProfileSpec &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `read` | 方法 | <code>read(input: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactReadResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `traceLineage` | 方法 | <code>traceLineage(input: ArtifactTraceLineageRequest): Promise&lt;ArtifactLineage&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DefaultArtifactManagerOptions`

Default Artifact Manager Options 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DefaultArtifactManagerOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/runtime.ts)

### 声明

```text
export interface DefaultArtifactManagerOptions {
    profiles: ArtifactProfileSpec[];
    stores: ArtifactStoreProvider[];
    repository: ArtifactRecordRepository;
    workspaceReader?: ArtifactWorkspaceContentReader;
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
| `workspaceReader` | 属性 | <code>workspaceReader?: ArtifactWorkspaceContentReader</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
