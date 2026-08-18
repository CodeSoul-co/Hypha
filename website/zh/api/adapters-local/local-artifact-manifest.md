# `@codesoul-co/hypha-adapters-local` / `local-artifact-manifest`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-artifact-manifest.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts)
- 导出数: **5**

## 模块用法

用于使用该功能边界的公共契约与操作。Local artifact manifest 模块公开 4 函数、1 接口。

### 从包入口导入

```ts
import {
  deleteLocalArtifactManifest,
  listLocalArtifactManifests,
  readLocalArtifactManifest,
  writeLocalArtifactManifest,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalArtifactObjectManifest,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deleteLocalArtifactManifest` | 函数 | <code>deleteLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise&lt;void&gt;</code> | Delete Local Artifact Manifest 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `listLocalArtifactManifests` | 函数 | <code>listLocalArtifactManifests(paths: LocalArtifactStorePaths): Promise&lt;LocalArtifactObjectManifest[]&gt;</code> | List Local Artifact Manifests 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `readLocalArtifactManifest` | 函数 | <code>readLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise&lt;LocalArtifactObjectManifest &#124; null&gt;</code> | Read Local Artifact Manifest 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `writeLocalArtifactManifest` | 函数 | <code>writeLocalArtifactManifest(paths: LocalArtifactStorePaths, manifest: LocalArtifactObjectManifest, options?: { ifAbsent?: boolean; }): Promise&lt;void&gt;</code> | Write Local Artifact Manifest 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `LocalArtifactObjectManifest` | 接口 | <code>interface LocalArtifactObjectManifest</code> | Local Artifact Object Manifest 接口，共包含 8 个公开字段或方法。 |

## `deleteLocalArtifactManifest`

Delete Local Artifact Manifest 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { deleteLocalArtifactManifest } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-manifest`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts)

### 声明

```text
export declare function deleteLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise<void>;
```

### 调用签名

```text
deleteLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise<void>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `paths` | <code>LocalArtifactStorePaths</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `objectKey` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<void>`
- 说明: 返回值契约由上述类型定义。

## `listLocalArtifactManifests`

List Local Artifact Manifests 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { listLocalArtifactManifests } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-manifest`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts)

### 声明

```text
export declare function listLocalArtifactManifests(paths: LocalArtifactStorePaths): Promise<LocalArtifactObjectManifest[]>;
```

### 调用签名

```text
listLocalArtifactManifests(paths: LocalArtifactStorePaths): Promise<LocalArtifactObjectManifest[]>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `paths` | <code>LocalArtifactStorePaths</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<LocalArtifactObjectManifest[]>`
- 说明: 返回值契约由上述类型定义。

## `readLocalArtifactManifest`

Read Local Artifact Manifest 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { readLocalArtifactManifest } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-manifest`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts)

### 声明

```text
export declare function readLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise<LocalArtifactObjectManifest | null>;
```

### 调用签名

```text
readLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise<LocalArtifactObjectManifest | null>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `paths` | <code>LocalArtifactStorePaths</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `objectKey` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<LocalArtifactObjectManifest>`
- 说明: 返回值契约由上述类型定义。

## `writeLocalArtifactManifest`

Write Local Artifact Manifest 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { writeLocalArtifactManifest } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-manifest`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts)

### 声明

```text
export declare function writeLocalArtifactManifest(paths: LocalArtifactStorePaths, manifest: LocalArtifactObjectManifest, options?: {
    ifAbsent?: boolean;
}): Promise<void>;
```

### 调用签名

```text
writeLocalArtifactManifest(paths: LocalArtifactStorePaths, manifest: LocalArtifactObjectManifest, options?: { ifAbsent?: boolean; }): Promise<void>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `paths` | <code>LocalArtifactStorePaths</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `manifest` | <code>LocalArtifactObjectManifest</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `options` | <code>{ ifAbsent?: boolean; }</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<void>`
- 说明: 返回值契约由上述类型定义。

## `LocalArtifactObjectManifest`

Local Artifact Object Manifest 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalArtifactObjectManifest } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-manifest`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts)

### 声明

```text
export interface LocalArtifactObjectManifest {
    schemaVersion: 1;
    objectKey: string;
    contentHash: string;
    sizeBytes: number;
    mimeType?: string;
    etag: string;
    metadata?: Record<string, string>;
    lastModifiedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `etag` | 属性 | <code>etag: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastModifiedAt` | 属性 | <code>lastModifiedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mimeType` | 属性 | <code>mimeType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `objectKey` | 属性 | <code>objectKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaVersion` | 属性 | <code>schemaVersion: 1</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
