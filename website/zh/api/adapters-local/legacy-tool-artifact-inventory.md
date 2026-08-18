# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-inventory`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/legacy-tool-artifact-inventory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts)
- 导出数: **6**

## 模块用法

用于使用该功能边界的公共契约与操作。Legacy tool artifact inventory 模块公开 2 类、3 接口、1 类型。

### 从包入口导入

```ts
import {
  LegacyToolArtifactInventory,
  LegacyToolArtifactInventoryError,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LegacyToolArtifactInventoryEntry,
  LegacyToolArtifactInventoryOptions,
  LegacyToolArtifactInventoryResult,
  LegacyToolArtifactInventoryErrorCode,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LegacyToolArtifactInventory` | 类 | <code>new LegacyToolArtifactInventory(options: LegacyToolArtifactInventoryOptions): LegacyToolArtifactInventory</code> | Builds a deterministic, bounded, read-only inventory of old Tool outputs. |
| `LegacyToolArtifactInventoryError` | 类 | <code>new LegacyToolArtifactInventoryError(code: LegacyToolArtifactInventoryErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactInventoryError</code> | Legacy Tool Artifact Inventory Error 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LegacyToolArtifactInventoryEntry` | 接口 | <code>interface LegacyToolArtifactInventoryEntry</code> | Describes an old Tool output without treating sanitized path segments as authoritative Tool or Invocation identities. |
| `LegacyToolArtifactInventoryOptions` | 接口 | <code>interface LegacyToolArtifactInventoryOptions</code> | Legacy Tool Artifact Inventory Options 接口，共包含 4 个公开字段或方法。 |
| `LegacyToolArtifactInventoryResult` | 接口 | <code>interface LegacyToolArtifactInventoryResult</code> | Legacy Tool Artifact Inventory Result 接口，共包含 2 个公开字段或方法。 |
| `LegacyToolArtifactInventoryErrorCode` | 类型 | <code>type LegacyToolArtifactInventoryErrorCode = 'LEGACY_INVENTORY_INVALID_ROOT' &#124; 'LEGACY_INVENTORY_INVALID_LAYOUT' &#124; 'LEGACY_INVENTORY_LIMIT_EXCEEDED' &#124; 'LEGACY_INVENTORY_SOURCE_CHANGED'</code> | Legacy Tool Artifact Inventory Error Code 公共类型别名；完整类型表达式见声明。 |

## `LegacyToolArtifactInventory`

Builds a deterministic, bounded, read-only inventory of old Tool outputs.

- 种类: 类
- 导入: `import { LegacyToolArtifactInventory } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-inventory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts)

### 声明

```text
export declare class LegacyToolArtifactInventory {
    constructor(options: LegacyToolArtifactInventoryOptions);
    scan(): Promise<LegacyToolArtifactInventoryResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LegacyToolArtifactInventoryOptions): LegacyToolArtifactInventory</code> | 创建该类的实例。 |
| `scan` | 方法 | <code>scan(): Promise&lt;LegacyToolArtifactInventoryResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LegacyToolArtifactInventoryError`

Legacy Tool Artifact Inventory Error 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LegacyToolArtifactInventoryError } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-inventory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts)

### 声明

```text
export declare class LegacyToolArtifactInventoryError extends Error {
    readonly code: LegacyToolArtifactInventoryErrorCode;
    readonly details?: Record<string, unknown> | undefined;
    constructor(code: LegacyToolArtifactInventoryErrorCode, message: string, details?: Record<string, unknown> | undefined);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>readonly code: LegacyToolArtifactInventoryErrorCode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(code: LegacyToolArtifactInventoryErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactInventoryError</code> | 创建该类的实例。 |
| `details` | 属性 | <code>readonly details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LegacyToolArtifactInventoryEntry`

Describes an old Tool output without treating sanitized path segments as authoritative Tool or Invocation identities.

- 种类: 接口
- 导入: `import type { LegacyToolArtifactInventoryEntry } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-inventory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts)

### 声明

```text
export interface LegacyToolArtifactInventoryEntry {
    relativePath: string;
    legacyArtifactId: string;
    contentHash: string;
    sizeBytes: number;
    mimeType: 'application/json' | 'text/plain';
    legacyToolPathSegment: string;
    legacyInvocationPathSegment: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `legacyArtifactId` | 属性 | <code>legacyArtifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `legacyInvocationPathSegment` | 属性 | <code>legacyInvocationPathSegment: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `legacyToolPathSegment` | 属性 | <code>legacyToolPathSegment: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mimeType` | 属性 | <code>mimeType: "application/json" &#124; "text/plain"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactInventoryOptions`

Legacy Tool Artifact Inventory Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactInventoryOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-inventory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts)

### 声明

```text
export interface LegacyToolArtifactInventoryOptions {
    legacyRootPath: string;
    maxEntries?: number;
    maxFileBytes?: number;
    maxTotalBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `legacyRootPath` | 属性 | <code>legacyRootPath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEntries` | 属性 | <code>maxEntries?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxFileBytes` | 属性 | <code>maxFileBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTotalBytes` | 属性 | <code>maxTotalBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactInventoryResult`

Legacy Tool Artifact Inventory Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactInventoryResult } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-inventory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts)

### 声明

```text
export interface LegacyToolArtifactInventoryResult {
    entries: LegacyToolArtifactInventoryEntry[];
    totalBytes: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `entries` | 属性 | <code>entries: LegacyToolArtifactInventoryEntry[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalBytes` | 属性 | <code>totalBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactInventoryErrorCode`

Legacy Tool Artifact Inventory Error Code 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { LegacyToolArtifactInventoryErrorCode } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-inventory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts)

### 声明

```text
export type LegacyToolArtifactInventoryErrorCode = 'LEGACY_INVENTORY_INVALID_ROOT' | 'LEGACY_INVENTORY_INVALID_LAYOUT' | 'LEGACY_INVENTORY_LIMIT_EXCEEDED' | 'LEGACY_INVENTORY_SOURCE_CHANGED';
```
