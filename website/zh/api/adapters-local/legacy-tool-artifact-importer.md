# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-importer`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/legacy-tool-artifact-importer.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)
- 导出数: **7**

## 模块用法

用于定义或实现 Provider-neutral Port。Legacy tool artifact importer 模块公开 2 类、1 函数、3 接口、1 类型。

### 从包入口导入

```ts
import {
  LegacyToolArtifactImporter,
  LegacyToolArtifactImportError,
  legacyArtifactReference,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LegacyToolArtifactImporterOptions,
  LegacyToolArtifactImportRequest,
  LegacyToolArtifactImportResult,
  LegacyToolArtifactImportErrorCode,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LegacyToolArtifactImporter` | 类 | <code>new LegacyToolArtifactImporter(options: LegacyToolArtifactImporterOptions): LegacyToolArtifactImporter</code> | Imports one explicitly identified legacy Tool file into Core ArtifactManager. |
| `LegacyToolArtifactImportError` | 类 | <code>new LegacyToolArtifactImportError(code: LegacyToolArtifactImportErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactImportError</code> | Legacy Tool Artifact Import Error 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `legacyArtifactReference` | 函数 | <code>legacyArtifactReference(relativePath: string, sizeBytes: number): string</code> | Legacy Artifact Reference 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `LegacyToolArtifactImporterOptions` | 接口 | <code>interface LegacyToolArtifactImporterOptions</code> | Legacy Tool Artifact Importer Options 接口，共包含 3 个公开字段或方法。 |
| `LegacyToolArtifactImportRequest` | 接口 | <code>interface LegacyToolArtifactImportRequest</code> | Legacy Tool Artifact Import Request 接口，共包含 9 个公开字段或方法。 |
| `LegacyToolArtifactImportResult` | 接口 | <code>interface LegacyToolArtifactImportResult</code> | Legacy Tool Artifact Import Result 接口，共包含 6 个公开字段或方法。 |
| `LegacyToolArtifactImportErrorCode` | 类型 | <code>type LegacyToolArtifactImportErrorCode = 'LEGACY_ARTIFACT_INVALID_PATH' &#124; 'LEGACY_ARTIFACT_NOT_FOUND' &#124; 'LEGACY_ARTIFACT_TOO_LARGE' &#124; 'LEGACY_ARTIFACT_ID_MISMATCH' &#124; 'LEGACY_ARTIFACT_SIZE_MISMATCH' &#124; 'LEGACY_ARTIFACT_CONTENT_MISMATCH'</code> | Legacy Tool Artifact Import Error Code 公共类型别名；完整类型表达式见声明。 |

## `LegacyToolArtifactImporter`

Imports one explicitly identified legacy Tool file into Core ArtifactManager.

- 种类: 类
- 导入: `import { LegacyToolArtifactImporter } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-importer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)

### 声明

```text
export declare class LegacyToolArtifactImporter {
    constructor(options: LegacyToolArtifactImporterOptions);
    import(request: LegacyToolArtifactImportRequest): Promise<LegacyToolArtifactImportResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LegacyToolArtifactImporterOptions): LegacyToolArtifactImporter</code> | 创建该类的实例。 |
| `import` | 方法 | <code>import(request: LegacyToolArtifactImportRequest): Promise&lt;LegacyToolArtifactImportResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LegacyToolArtifactImportError`

Legacy Tool Artifact Import Error 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LegacyToolArtifactImportError } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-importer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)

### 声明

```text
export declare class LegacyToolArtifactImportError extends Error {
    readonly code: LegacyToolArtifactImportErrorCode;
    readonly details?: Record<string, unknown> | undefined;
    constructor(code: LegacyToolArtifactImportErrorCode, message: string, details?: Record<string, unknown> | undefined);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>readonly code: LegacyToolArtifactImportErrorCode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(code: LegacyToolArtifactImportErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactImportError</code> | 创建该类的实例。 |
| `details` | 属性 | <code>readonly details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `legacyArtifactReference`

Legacy Artifact Reference 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { legacyArtifactReference } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-importer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)

### 声明

```text
export declare function legacyArtifactReference(relativePath: string, sizeBytes: number): string;
```

### 调用签名

```text
legacyArtifactReference(relativePath: string, sizeBytes: number): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `relativePath` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `sizeBytes` | <code>number</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `LegacyToolArtifactImporterOptions`

Legacy Tool Artifact Importer Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactImporterOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-importer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)

### 声明

```text
export interface LegacyToolArtifactImporterOptions {
    legacyRootPath: string;
    manager: Pick<ArtifactManager, 'create'>;
    maxArtifactBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `legacyRootPath` | 属性 | <code>legacyRootPath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `manager` | 属性 | <code>manager: Pick&lt;ArtifactManager, "create"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxArtifactBytes` | 属性 | <code>maxArtifactBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactImportRequest`

Legacy Tool Artifact Import Request 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactImportRequest } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-importer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)

### 声明

```text
export interface LegacyToolArtifactImportRequest {
    relativePath: string;
    expectedLegacyArtifactId?: string;
    expectedContentHash?: string;
    expectedSizeBytes?: number;
    context: ToolArtifactManagerContext;
    toolId: string;
    invocationId: string;
    mimeType?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context: ToolArtifactManagerContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedLegacyArtifactId` | 属性 | <code>expectedLegacyArtifactId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedSizeBytes` | 属性 | <code>expectedSizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mimeType` | 属性 | <code>mimeType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactImportResult`

Legacy Tool Artifact Import Result 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactImportResult } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-importer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)

### 声明

```text
export interface LegacyToolArtifactImportResult {
    legacyArtifactId: string;
    artifactId: string;
    versionId: string;
    revision: number;
    contentHash: string;
    sizeBytes: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `legacyArtifactId` | 属性 | <code>legacyArtifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactImportErrorCode`

Legacy Tool Artifact Import Error Code 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { LegacyToolArtifactImportErrorCode } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-importer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)

### 声明

```text
export type LegacyToolArtifactImportErrorCode = 'LEGACY_ARTIFACT_INVALID_PATH' | 'LEGACY_ARTIFACT_NOT_FOUND' | 'LEGACY_ARTIFACT_TOO_LARGE' | 'LEGACY_ARTIFACT_ID_MISMATCH' | 'LEGACY_ARTIFACT_SIZE_MISMATCH' | 'LEGACY_ARTIFACT_CONTENT_MISMATCH';
```
