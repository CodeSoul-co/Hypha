# `@codesoul-co/hypha-adapters-local` / `local-artifact-files`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-artifact-files.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)
- 导出数: **17**

## 模块用法

用于使用该功能边界的公共契约与操作。Local artifact files 模块公开 2 类、13 函数、2 接口。

### 从包入口导入

```ts
import {
  LocalArtifactIntegrityError,
  LocalArtifactTransferAbortedError,
  ensureSafeLocalArtifactDirectory,
  ensureSafeLocalArtifactFile,
  hashLocalArtifactFile,
  isNodeError,
  listLocalArtifactFiles,
  localArtifactBlobPath,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalArtifactStorePaths,
  LocalArtifactTempFile,
} from '@codesoul-co/hypha-adapters-local';

// 完整导出列表见下方。
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 13 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalArtifactIntegrityError` | 类 | <code>new LocalArtifactIntegrityError(message: string): LocalArtifactIntegrityError</code> | Local Artifact Integrity Error 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LocalArtifactTransferAbortedError` | 类 | <code>new LocalArtifactTransferAbortedError(): LocalArtifactTransferAbortedError</code> | Local Artifact Transfer Aborted Error 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ensureSafeLocalArtifactDirectory` | 函数 | <code>ensureSafeLocalArtifactDirectory(root: string, directory: string): Promise&lt;void&gt;</code> | Ensure Safe Local Artifact Directory 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ensureSafeLocalArtifactFile` | 函数 | <code>ensureSafeLocalArtifactFile(root: string, filename: string): Promise&lt;void&gt;</code> | Ensure Safe Local Artifact File 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `hashLocalArtifactFile` | 函数 | <code>hashLocalArtifactFile(filename: string, root?: string, abortSignal?: AbortSignal): Promise&lt;{ contentHash: string; sizeBytes: number; }&gt;</code> | Hash Local Artifact File 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `isNodeError` | 函数 | <code>isNodeError(error: unknown, code: string): boolean</code> | Is Node Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `listLocalArtifactFiles` | 函数 | <code>listLocalArtifactFiles(root: string, extension?: string): Promise&lt;string[]&gt;</code> | List Local Artifact Files 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `localArtifactBlobPath` | 函数 | <code>localArtifactBlobPath(paths: LocalArtifactStorePaths, contentHash: string): string</code> | Local Artifact Blob Path 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `localArtifactManifestPath` | 函数 | <code>localArtifactManifestPath(paths: LocalArtifactStorePaths, objectKey: string): string</code> | Local Artifact Manifest Path 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `pathExists` | 函数 | <code>pathExists(filename: string): Promise&lt;boolean&gt;</code> | Path Exists 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `prepareLocalArtifactStore` | 函数 | <code>prepareLocalArtifactStore(rootPath: string): Promise&lt;LocalArtifactStorePaths&gt;</code> | Prepare Local Artifact Store 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `publishLocalArtifactBlob` | 函数 | <code>publishLocalArtifactBlob(root: string, temporaryPath: string, blobPath: string, expectedHash: string, expectedSizeBytes: number): Promise&lt;void&gt;</code> | Publish Local Artifact Blob 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `streamLocalArtifactFile` | 函数 | <code>streamLocalArtifactFile(filename: string, range?: ArtifactByteRange, root?: string, abortSignal?: AbortSignal): AsyncIterable&lt;Uint8Array&gt;</code> | Stream Local Artifact File 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `writeJsonAtomically` | 函数 | <code>writeJsonAtomically(root: string, filename: string, value: unknown, options?: { ifAbsent?: boolean; }): Promise&lt;void&gt;</code> | Write JSON Atomically 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `writeLocalArtifactTempFile` | 函数 | <code>writeLocalArtifactTempFile(source: ArtifactByteSource, paths: LocalArtifactStorePaths, maxBytes: number, abortSignal?: AbortSignal): Promise&lt;LocalArtifactTempFile&gt;</code> | Write Local Artifact Temp File 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `LocalArtifactStorePaths` | 接口 | <code>interface LocalArtifactStorePaths</code> | Local Artifact Store Paths 接口，共包含 4 个公开字段或方法。 |
| `LocalArtifactTempFile` | 接口 | <code>interface LocalArtifactTempFile</code> | Local Artifact Temp File 接口，共包含 3 个公开字段或方法。 |

## `LocalArtifactIntegrityError`

Local Artifact Integrity Error 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LocalArtifactIntegrityError } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export declare class LocalArtifactIntegrityError extends Error {
    constructor(message: string);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(message: string): LocalArtifactIntegrityError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LocalArtifactTransferAbortedError`

Local Artifact Transfer Aborted Error 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LocalArtifactTransferAbortedError } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export declare class LocalArtifactTransferAbortedError extends Error {
    readonly code = "LOCAL_ARTIFACT_TRANSFER_ABORTED";
    constructor();
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>readonly code: "LOCAL_ARTIFACT_TRANSFER_ABORTED"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(): LocalArtifactTransferAbortedError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `ensureSafeLocalArtifactDirectory`

Ensure Safe Local Artifact Directory 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { ensureSafeLocalArtifactDirectory } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export declare function ensureSafeLocalArtifactDirectory(root: string, directory: string): Promise<void>;
```

### 调用签名

```text
ensureSafeLocalArtifactDirectory(root: string, directory: string): Promise<void>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `root` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `directory` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<void>`
- 说明: 返回值契约由上述类型定义。

## `ensureSafeLocalArtifactFile`

Ensure Safe Local Artifact File 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { ensureSafeLocalArtifactFile } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export declare function ensureSafeLocalArtifactFile(root: string, filename: string): Promise<void>;
```

### 调用签名

```text
ensureSafeLocalArtifactFile(root: string, filename: string): Promise<void>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `root` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `filename` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<void>`
- 说明: 返回值契约由上述类型定义。

## `hashLocalArtifactFile`

Hash Local Artifact File 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { hashLocalArtifactFile } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export declare function hashLocalArtifactFile(filename: string, root?: string, abortSignal?: AbortSignal): Promise<{
    contentHash: string;
    sizeBytes: number;
}>;
```

### 调用签名

```text
hashLocalArtifactFile(filename: string, root?: string, abortSignal?: AbortSignal): Promise<{ contentHash: string; sizeBytes: number; }>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `filename` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `root` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |
| `abortSignal` | <code>AbortSignal</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<{ contentHash: string; sizeBytes: number; }>`
- 说明: 返回值契约由上述类型定义。

## `isNodeError`

Is Node Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { isNodeError } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export declare function isNodeError(error: unknown, code: string): boolean;
```

### 调用签名

```text
isNodeError(error: unknown, code: string): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `code` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `listLocalArtifactFiles`

List Local Artifact Files 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { listLocalArtifactFiles } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export declare function listLocalArtifactFiles(root: string, extension?: string): Promise<string[]>;
```

### 调用签名

```text
listLocalArtifactFiles(root: string, extension?: string): Promise<string[]>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `root` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `extension` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<string[]>`
- 说明: 返回值契约由上述类型定义。

## `localArtifactBlobPath`

Local Artifact Blob Path 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { localArtifactBlobPath } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export declare function localArtifactBlobPath(paths: LocalArtifactStorePaths, contentHash: string): string;
```

### 调用签名

```text
localArtifactBlobPath(paths: LocalArtifactStorePaths, contentHash: string): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `paths` | <code>LocalArtifactStorePaths</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `contentHash` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `localArtifactManifestPath`

Local Artifact Manifest Path 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { localArtifactManifestPath } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export declare function localArtifactManifestPath(paths: LocalArtifactStorePaths, objectKey: string): string;
```

### 调用签名

```text
localArtifactManifestPath(paths: LocalArtifactStorePaths, objectKey: string): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `paths` | <code>LocalArtifactStorePaths</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `objectKey` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `pathExists`

Path Exists 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { pathExists } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export declare function pathExists(filename: string): Promise<boolean>;
```

### 调用签名

```text
pathExists(filename: string): Promise<boolean>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `filename` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<boolean>`
- 说明: 返回值契约由上述类型定义。

## `prepareLocalArtifactStore`

Prepare Local Artifact Store 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { prepareLocalArtifactStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export declare function prepareLocalArtifactStore(rootPath: string): Promise<LocalArtifactStorePaths>;
```

### 调用签名

```text
prepareLocalArtifactStore(rootPath: string): Promise<LocalArtifactStorePaths>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `rootPath` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<LocalArtifactStorePaths>`
- 说明: 返回值契约由上述类型定义。

## `publishLocalArtifactBlob`

Publish Local Artifact Blob 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { publishLocalArtifactBlob } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export declare function publishLocalArtifactBlob(root: string, temporaryPath: string, blobPath: string, expectedHash: string, expectedSizeBytes: number): Promise<void>;
```

### 调用签名

```text
publishLocalArtifactBlob(root: string, temporaryPath: string, blobPath: string, expectedHash: string, expectedSizeBytes: number): Promise<void>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `root` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `temporaryPath` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `blobPath` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `expectedHash` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `expectedSizeBytes` | <code>number</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<void>`
- 说明: 返回值契约由上述类型定义。

## `streamLocalArtifactFile`

Stream Local Artifact File 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { streamLocalArtifactFile } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export declare function streamLocalArtifactFile(filename: string, range?: ArtifactByteRange, root?: string, abortSignal?: AbortSignal): AsyncIterable<Uint8Array>;
```

### 调用签名

```text
streamLocalArtifactFile(filename: string, range?: ArtifactByteRange, root?: string, abortSignal?: AbortSignal): AsyncIterable<Uint8Array>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `filename` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `range` | <code>ArtifactByteRange</code> | 否 | 可选参数；接受的值由类型列定义。 |
| `root` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |
| `abortSignal` | <code>AbortSignal</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `AsyncIterable<Uint8Array<ArrayBufferLike>>`
- 说明: 返回值契约由上述类型定义。

## `writeJsonAtomically`

Write JSON Atomically 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { writeJsonAtomically } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export declare function writeJsonAtomically(root: string, filename: string, value: unknown, options?: {
    ifAbsent?: boolean;
}): Promise<void>;
```

### 调用签名

```text
writeJsonAtomically(root: string, filename: string, value: unknown, options?: { ifAbsent?: boolean; }): Promise<void>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `root` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `filename` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `options` | <code>{ ifAbsent?: boolean; }</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<void>`
- 说明: 返回值契约由上述类型定义。

## `writeLocalArtifactTempFile`

Write Local Artifact Temp File 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { writeLocalArtifactTempFile } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export declare function writeLocalArtifactTempFile(source: ArtifactByteSource, paths: LocalArtifactStorePaths, maxBytes: number, abortSignal?: AbortSignal): Promise<LocalArtifactTempFile>;
```

### 调用签名

```text
writeLocalArtifactTempFile(source: ArtifactByteSource, paths: LocalArtifactStorePaths, maxBytes: number, abortSignal?: AbortSignal): Promise<LocalArtifactTempFile>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `source` | <code>ArtifactByteSource</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `paths` | <code>LocalArtifactStorePaths</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `maxBytes` | <code>number</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `abortSignal` | <code>AbortSignal</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<LocalArtifactTempFile>`
- 说明: 返回值契约由上述类型定义。

## `LocalArtifactStorePaths`

Local Artifact Store Paths 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalArtifactStorePaths } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export interface LocalArtifactStorePaths {
    root: string;
    blobs: string;
    objects: string;
    temporary: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `blobs` | 属性 | <code>blobs: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `objects` | 属性 | <code>objects: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `root` | 属性 | <code>root: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `temporary` | 属性 | <code>temporary: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalArtifactTempFile`

Local Artifact Temp File 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalArtifactTempFile } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### 声明

```text
export interface LocalArtifactTempFile {
    path: string;
    contentHash: string;
    sizeBytes: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `path` | 属性 | <code>path: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
