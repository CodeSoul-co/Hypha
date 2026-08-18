# `@codesoul-co/hypha-core` / `contracts/artifact-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/artifact-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)
- 导出数: **13**

## 模块用法

用于声明并运行时校验契约。Artifact store 模块公开 12 接口、1 类型。

### 从包入口导入

```ts
import type {
  ArtifactByteRange,
  ArtifactContent,
  ArtifactCopyRequest,
  ArtifactDownloadAccess,
  ArtifactDownloadAccessRequest,
  ArtifactGetRequest,
  ArtifactObjectMetadata,
  ArtifactOperationOptions,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 13 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactByteRange` | 接口 | <code>interface ArtifactByteRange</code> | Artifact Byte Range 接口，共包含 2 个公开字段或方法。 |
| `ArtifactContent` | 接口 | <code>interface ArtifactContent</code> | Artifact Content 接口，共包含 6 个公开字段或方法。 |
| `ArtifactCopyRequest` | 接口 | <code>interface ArtifactCopyRequest</code> | Artifact Copy Request 接口，共包含 4 个公开字段或方法。 |
| `ArtifactDownloadAccess` | 接口 | <code>interface ArtifactDownloadAccess</code> | Artifact Download Access 接口，共包含 4 个公开字段或方法。 |
| `ArtifactDownloadAccessRequest` | 接口 | <code>interface ArtifactDownloadAccessRequest</code> | Artifact Download Access Request 接口，共包含 4 个公开字段或方法。 |
| `ArtifactGetRequest` | 接口 | <code>interface ArtifactGetRequest</code> | Artifact Get Request 接口，共包含 3 个公开字段或方法。 |
| `ArtifactObjectMetadata` | 接口 | <code>interface ArtifactObjectMetadata</code> | Artifact Object Metadata 接口，共包含 6 个公开字段或方法。 |
| `ArtifactOperationOptions` | 接口 | <code>interface ArtifactOperationOptions</code> | Artifact Operation Options 接口，共包含 1 个公开字段或方法。 |
| `ArtifactPutRequest` | 接口 | <code>interface ArtifactPutRequest</code> | Artifact Put Request 接口，共包含 8 个公开字段或方法。 |
| `ArtifactStoreCapabilities` | 接口 | <code>interface ArtifactStoreCapabilities</code> | Artifact Store Capabilities 接口，共包含 7 个公开字段或方法。 |
| `ArtifactStoreProvider` | 接口 | <code>interface ArtifactStoreProvider</code> | Artifact Store Provider 接口，共包含 11 个公开字段或方法。 |
| `ArtifactStoreProviderFactory` | 接口 | <code>interface ArtifactStoreProviderFactory</code> | Artifact Store Provider Factory 接口，共包含 2 个公开字段或方法。 |
| `ArtifactByteSource` | 类型 | <code>type ArtifactByteSource = Uint8Array &#124; AsyncIterable&lt;Uint8Array&gt;</code> | Artifact Byte Source 公共类型别名；完整类型表达式见声明。 |

## `ArtifactByteRange`

Artifact Byte Range 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactByteRange } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### 声明

```text
export interface ArtifactByteRange {
    start: number;
    endInclusive?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `endInclusive` | 属性 | <code>endInclusive?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `start` | 属性 | <code>start: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactContent`

Artifact Content 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactContent } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### 声明

```text
export interface ArtifactContent {
    stream: AsyncIterable<Uint8Array>;
    contentHash: string;
    sizeBytes: number;
    mimeType?: string;
    etag?: string;
    range?: ArtifactByteRange;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `etag` | 属性 | <code>etag?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mimeType` | 属性 | <code>mimeType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `range` | 属性 | <code>range?: ArtifactByteRange</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 属性 | <code>stream: AsyncIterable&lt;Uint8Array&lt;ArrayBufferLike&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactCopyRequest`

Artifact Copy Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactCopyRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### 声明

```text
export interface ArtifactCopyRequest {
    operationId: string;
    source: ArtifactStorageRef;
    targetObjectKey: string;
    ifAbsent?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ifAbsent` | 属性 | <code>ifAbsent?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: ArtifactStorageRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetObjectKey` | 属性 | <code>targetObjectKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactDownloadAccess`

Artifact Download Access 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactDownloadAccess } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### 声明

```text
export interface ArtifactDownloadAccess {
    method: 'GET';
    url: string;
    expiresAt: string;
    headers?: Record<string, string>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `headers` | 属性 | <code>headers?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `method` | 属性 | <code>method: "GET"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `url` | 属性 | <code>url: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactDownloadAccessRequest`

Artifact Download Access Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactDownloadAccessRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### 声明

```text
export interface ArtifactDownloadAccessRequest {
    ref: ArtifactStorageRef;
    expiresInSeconds: number;
    responseMimeType?: string;
    responseFilename?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expiresInSeconds` | 属性 | <code>expiresInSeconds: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ref` | 属性 | <code>ref: ArtifactStorageRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `responseFilename` | 属性 | <code>responseFilename?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `responseMimeType` | 属性 | <code>responseMimeType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactGetRequest`

Artifact Get Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactGetRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### 声明

```text
export interface ArtifactGetRequest {
    ref: ArtifactStorageRef;
    range?: ArtifactByteRange;
    expectedContentHash?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedContentHash` | 属性 | <code>expectedContentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `range` | 属性 | <code>range?: ArtifactByteRange</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ref` | 属性 | <code>ref: ArtifactStorageRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactObjectMetadata`

Artifact Object Metadata 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactObjectMetadata } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### 声明

```text
export interface ArtifactObjectMetadata {
    contentHash: string;
    sizeBytes: number;
    mimeType?: string;
    etag?: string;
    lastModifiedAt?: string;
    metadata?: Record<string, string>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `etag` | 属性 | <code>etag?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastModifiedAt` | 属性 | <code>lastModifiedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mimeType` | 属性 | <code>mimeType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactOperationOptions`

Artifact Operation Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactOperationOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### 声明

```text
export interface ArtifactOperationOptions {
    abortSignal?: AbortSignal;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal?: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactPutRequest`

Artifact Put Request 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactPutRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### 声明

```text
export interface ArtifactPutRequest {
    operationId: string;
    objectKey: string;
    content: ArtifactByteSource;
    expectedContentHash?: string;
    sizeBytes?: number;
    mimeType?: string;
    metadata?: Record<string, string>;
    ifAbsent?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: ArtifactByteSource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ifAbsent` | 属性 | <code>ifAbsent?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mimeType` | 属性 | <code>mimeType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `objectKey` | 属性 | <code>objectKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactStoreCapabilities`

Artifact Store Capabilities 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactStoreCapabilities } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### 声明

```text
export interface ArtifactStoreCapabilities {
    versioning: boolean;
    rangeRead: boolean;
    signedAccess: boolean;
    serverSideCopy: boolean;
    encryption: boolean;
    multipartUpload: boolean;
    contentAddressing: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentAddressing` | 属性 | <code>contentAddressing: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `encryption` | 属性 | <code>encryption: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `multipartUpload` | 属性 | <code>multipartUpload: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rangeRead` | 属性 | <code>rangeRead: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverSideCopy` | 属性 | <code>serverSideCopy: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signedAccess` | 属性 | <code>signedAccess: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versioning` | 属性 | <code>versioning: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactStoreProvider`

Artifact Store Provider 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactStoreProvider } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### 声明

```text
export interface ArtifactStoreProvider {
    readonly id: string;
    capabilities(): Promise<ArtifactStoreCapabilities>;
    put(request: ArtifactPutRequest, options?: ArtifactOperationOptions): Promise<ArtifactStorageRef>;
    get(request: ArtifactGetRequest, options?: ArtifactOperationOptions): Promise<ArtifactContent>;
    head(ref: ArtifactStorageRef): Promise<ArtifactObjectMetadata | null>;
    exists(ref: ArtifactStorageRef): Promise<boolean>;
    delete(ref: ArtifactStorageRef): Promise<void>;
    copy(request: ArtifactCopyRequest): Promise<ArtifactStorageRef>;
    createDownloadAccess?(request: ArtifactDownloadAccessRequest): Promise<ArtifactDownloadAccess>;
    health(): Promise<ProviderHealth>;
    close?(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ArtifactStoreCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `copy` | 方法 | <code>copy(request: ArtifactCopyRequest): Promise&lt;ArtifactStorageRef&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `createDownloadAccess` | 方法 | <code>createDownloadAccess?(request: ArtifactDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(ref: ArtifactStorageRef): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `exists` | 方法 | <code>exists(ref: ArtifactStorageRef): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: ArtifactGetRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactContent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `head` | 方法 | <code>head(ref: ArtifactStorageRef): Promise&lt;ArtifactObjectMetadata &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `put` | 方法 | <code>put(request: ArtifactPutRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactStorageRef&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ArtifactStoreProviderFactory`

Artifact Store Provider Factory 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactStoreProviderFactory } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### 声明

```text
export interface ArtifactStoreProviderFactory {
    readonly providerId: string;
    create(): ArtifactStoreProvider | Promise<ArtifactStoreProvider>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(): ArtifactStoreProvider &#124; Promise&lt;ArtifactStoreProvider&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerId` | 属性 | <code>readonly providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactByteSource`

Artifact Byte Source 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactByteSource } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### 声明

```text
export type ArtifactByteSource = Uint8Array | AsyncIterable<Uint8Array>;
```
