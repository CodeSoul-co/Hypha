# `@codesoul-co/hypha-adapters-local` / `local-artifact-store-values`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-artifact-store-values.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-store-values.ts)
- 导出数: **4**

## 模块用法

用于持久化并读取该边界的数据。Local artifact store values 模块公开 4 函数。

### 从包入口导入

```ts
import {
  cloneLocalArtifactMetadata,
  localManifestMetadata,
  normalizeLocalArtifactRange,
  normalizeLocalArtifactStoreError,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cloneLocalArtifactMetadata` | 函数 | <code>cloneLocalArtifactMetadata(value?: Record&lt;string, string&gt;): Record&lt;string, string&gt; &#124; undefined</code> | Clone Local Artifact Metadata 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `localManifestMetadata` | 函数 | <code>localManifestMetadata(manifest: LocalArtifactObjectManifest): ArtifactObjectMetadata</code> | Local Manifest Metadata 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `normalizeLocalArtifactRange` | 函数 | <code>normalizeLocalArtifactRange(range: ArtifactGetRequest["range"], sizeBytes: number): { start: number; endInclusive: number; } &#124; undefined</code> | Normalize Local Artifact Range 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `normalizeLocalArtifactStoreError` | 函数 | <code>normalizeLocalArtifactStoreError(error: unknown, operation: string): ArtifactStoreAdapterError</code> | Normalize Local Artifact Store Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `cloneLocalArtifactMetadata`

Clone Local Artifact Metadata 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { cloneLocalArtifactMetadata } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-store-values`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-store-values.ts)

### 声明

```text
export declare function cloneLocalArtifactMetadata(value?: Record<string, string>): Record<string, string> | undefined;
```

### 调用签名

```text
cloneLocalArtifactMetadata(value?: Record<string, string>): Record<string, string> | undefined
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>Record&lt;string, string&gt;</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Record<string, string>`
- 说明: 返回值契约由上述类型定义。

## `localManifestMetadata`

Local Manifest Metadata 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { localManifestMetadata } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-store-values`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-store-values.ts)

### 声明

```text
export declare function localManifestMetadata(manifest: LocalArtifactObjectManifest): ArtifactObjectMetadata;
```

### 调用签名

```text
localManifestMetadata(manifest: LocalArtifactObjectManifest): ArtifactObjectMetadata
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `manifest` | <code>LocalArtifactObjectManifest</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactObjectMetadata`
- 说明: 返回值契约由上述类型定义。

## `normalizeLocalArtifactRange`

Normalize Local Artifact Range 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizeLocalArtifactRange } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-store-values`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-store-values.ts)

### 声明

```text
export declare function normalizeLocalArtifactRange(range: ArtifactGetRequest['range'], sizeBytes: number): {
    start: number;
    endInclusive: number;
} | undefined;
```

### 调用签名

```text
normalizeLocalArtifactRange(range: ArtifactGetRequest["range"], sizeBytes: number): { start: number; endInclusive: number; } | undefined
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `range` | <code>ArtifactByteRange</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `sizeBytes` | <code>number</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `{ start: number; endInclusive: number; }`
- 说明: 返回值契约由上述类型定义。

## `normalizeLocalArtifactStoreError`

Normalize Local Artifact Store Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizeLocalArtifactStoreError } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-store-values`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-store-values.ts)

### 声明

```text
export declare function normalizeLocalArtifactStoreError(error: unknown, operation: string): ArtifactStoreAdapterError;
```

### 调用签名

```text
normalizeLocalArtifactStoreError(error: unknown, operation: string): ArtifactStoreAdapterError
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `operation` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactStoreAdapterError`
- 说明: 返回值契约由上述类型定义。
