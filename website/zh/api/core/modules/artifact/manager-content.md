# `@codesoul-co/hypha-core` / `modules/artifact/manager-content`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/artifact/manager-content.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-content.ts)
- 导出数: **3**

## 模块用法

用于使用该功能边界的公共契约与操作。Manager content 模块公开 1 函数、2 接口。

### 从包入口导入

```ts
import {
  persistArtifactContent,
} from '@codesoul-co/hypha-core';

import type {
  PersistArtifactContentRequest,
  PersistedArtifactContent,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `persistArtifactContent` | 函数 | <code>persistArtifactContent(request: PersistArtifactContentRequest, options?: ArtifactOperationOptions): Promise&lt;PersistedArtifactContent&gt;</code> | Persist Artifact Content 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `PersistArtifactContentRequest` | 接口 | <code>interface PersistArtifactContentRequest</code> | Persist Artifact Content Request 接口，共包含 8 个公开字段或方法。 |
| `PersistedArtifactContent` | 接口 | <code>interface PersistedArtifactContent</code> | Persisted Artifact Content 接口，共包含 5 个公开字段或方法。 |

## `persistArtifactContent`

Persist Artifact Content 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { persistArtifactContent } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager-content`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-content.ts)

### 声明

```text
export declare function persistArtifactContent(request: PersistArtifactContentRequest, options?: ArtifactOperationOptions): Promise<PersistedArtifactContent>;
```

### 调用签名

```text
persistArtifactContent(request: PersistArtifactContentRequest, options?: ArtifactOperationOptions): Promise<PersistedArtifactContent>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `request` | <code>PersistArtifactContentRequest</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `options` | <code>ArtifactOperationOptions</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<PersistedArtifactContent>`
- 说明: 返回值契约由上述类型定义。

## `PersistArtifactContentRequest`

Persist Artifact Content Request 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PersistArtifactContentRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager-content`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-content.ts)

### 声明

```text
export interface PersistArtifactContentRequest {
    operationId: string;
    content: ArtifactByteSource;
    expectedContentHash?: string;
    expectedSizeBytes?: number;
    mimeType?: string;
    profile: ArtifactProfileSpec;
    store: ArtifactStoreProvider;
    nonce: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: ArtifactByteSource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedSizeBytes` | 属性 | <code>expectedSizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mimeType` | 属性 | <code>mimeType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nonce` | 属性 | <code>nonce: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profile` | 属性 | <code>profile: ArtifactProfileSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `store` | 属性 | <code>store: ArtifactStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PersistedArtifactContent`

Persisted Artifact Content 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PersistedArtifactContent } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager-content`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-content.ts)

### 声明

```text
export interface PersistedArtifactContent {
    storageRef: ArtifactStorageRef;
    contentHash: string;
    sizeBytes: number;
    mimeType?: string;
    deduplicated: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deduplicated` | 属性 | <code>deduplicated: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mimeType` | 属性 | <code>mimeType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `storageRef` | 属性 | <code>storageRef: ArtifactStorageRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
