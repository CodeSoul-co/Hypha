# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-migration-rollback`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)
- 导出数: **8**

## 模块用法

用于使用该功能边界的公共契约与操作。Legacy tool artifact migration rollback 模块公开 2 类、5 接口、1 类型。

### 从包入口导入

```ts
import {
  LegacyToolArtifactMigrationRollbackError,
  LegacyToolArtifactMigrationRollbackExecutor,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LegacyToolArtifactMigrationRollbackExecutorOptions,
  LegacyToolArtifactMigrationRollbackItem,
  LegacyToolArtifactMigrationRollbackRequest,
  LegacyToolArtifactMigrationRollbackResult,
  LegacyToolArtifactMigrationRollbackSummary,
  LegacyToolArtifactMigrationRollbackErrorCode,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 6 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LegacyToolArtifactMigrationRollbackError` | 类 | <code>new LegacyToolArtifactMigrationRollbackError(code: LegacyToolArtifactMigrationRollbackErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationRollbackError</code> | Legacy Tool Artifact Migration Rollback Error 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LegacyToolArtifactMigrationRollbackExecutor` | 类 | <code>new LegacyToolArtifactMigrationRollbackExecutor(options: LegacyToolArtifactMigrationRollbackExecutorOptions): LegacyToolArtifactMigrationRollbackExecutor</code> | Reverses only Artifacts proven to have been created by a specific migration report. Revision fences prevent rollback from deleting a later mutation. |
| `LegacyToolArtifactMigrationRollbackExecutorOptions` | 接口 | <code>interface LegacyToolArtifactMigrationRollbackExecutorOptions</code> | Legacy Tool Artifact Migration Rollback Executor Options 接口，共包含 1 个公开字段或方法。 |
| `LegacyToolArtifactMigrationRollbackItem` | 接口 | <code>interface LegacyToolArtifactMigrationRollbackItem</code> | Legacy Tool Artifact Migration Rollback Item 接口，共包含 8 个公开字段或方法。 |
| `LegacyToolArtifactMigrationRollbackRequest` | 接口 | <code>interface LegacyToolArtifactMigrationRollbackRequest</code> | Legacy Tool Artifact Migration Rollback Request 接口，共包含 3 个公开字段或方法。 |
| `LegacyToolArtifactMigrationRollbackResult` | 接口 | <code>interface LegacyToolArtifactMigrationRollbackResult</code> | Legacy Tool Artifact Migration Rollback Result 接口，共包含 6 个公开字段或方法。 |
| `LegacyToolArtifactMigrationRollbackSummary` | 接口 | <code>interface LegacyToolArtifactMigrationRollbackSummary</code> | Legacy Tool Artifact Migration Rollback Summary 接口，共包含 5 个公开字段或方法。 |
| `LegacyToolArtifactMigrationRollbackErrorCode` | 类型 | <code>type LegacyToolArtifactMigrationRollbackErrorCode = 'LEGACY_MIGRATION_ROLLBACK_INVALID_REPORT' &#124; 'LEGACY_MIGRATION_ROLLBACK_TARGET_MISMATCH'</code> | Legacy Tool Artifact Migration Rollback Error Code 公共类型别名；完整类型表达式见声明。 |

## `LegacyToolArtifactMigrationRollbackError`

Legacy Tool Artifact Migration Rollback Error 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LegacyToolArtifactMigrationRollbackError } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### 声明

```text
export declare class LegacyToolArtifactMigrationRollbackError extends Error {
    readonly code: LegacyToolArtifactMigrationRollbackErrorCode;
    readonly details?: Record<string, unknown> | undefined;
    constructor(code: LegacyToolArtifactMigrationRollbackErrorCode, message: string, details?: Record<string, unknown> | undefined);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>readonly code: LegacyToolArtifactMigrationRollbackErrorCode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(code: LegacyToolArtifactMigrationRollbackErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationRollbackError</code> | 创建该类的实例。 |
| `details` | 属性 | <code>readonly details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LegacyToolArtifactMigrationRollbackExecutor`

Reverses only Artifacts proven to have been created by a specific migration report. Revision fences prevent rollback from deleting a later mutation.

- 种类: 类
- 导入: `import { LegacyToolArtifactMigrationRollbackExecutor } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### 声明

```text
export declare class LegacyToolArtifactMigrationRollbackExecutor {
    constructor(options: LegacyToolArtifactMigrationRollbackExecutorOptions);
    rollback(request: LegacyToolArtifactMigrationRollbackRequest): Promise<LegacyToolArtifactMigrationRollbackResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LegacyToolArtifactMigrationRollbackExecutorOptions): LegacyToolArtifactMigrationRollbackExecutor</code> | 创建该类的实例。 |
| `rollback` | 方法 | <code>rollback(request: LegacyToolArtifactMigrationRollbackRequest): Promise&lt;LegacyToolArtifactMigrationRollbackResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LegacyToolArtifactMigrationRollbackExecutorOptions`

Legacy Tool Artifact Migration Rollback Executor Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationRollbackExecutorOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationRollbackExecutorOptions {
    manager: Pick<ArtifactManager, 'get' | 'delete'>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `manager` | 属性 | <code>manager: Pick&lt;ArtifactManager, "delete" &#124; "get"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationRollbackItem`

Legacy Tool Artifact Migration Rollback Item 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationRollbackItem } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationRollbackItem {
    relativePath: string;
    legacyArtifactId: string;
    artifactId: string;
    versionId: string;
    revision: number;
    target: LegacyToolArtifactMigrationTargetSummary;
    status: 'dry_run' | 'rolled_back' | 'already_absent' | 'failed';
    failure?: LegacyToolArtifactMigrationFailure;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failure` | 属性 | <code>failure?: LegacyToolArtifactMigrationFailure</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `legacyArtifactId` | 属性 | <code>legacyArtifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "failed" &#124; "rolled_back" &#124; "dry_run" &#124; "already_absent"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `target` | 属性 | <code>target: LegacyToolArtifactMigrationTargetSummary</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationRollbackRequest`

Legacy Tool Artifact Migration Rollback Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationRollbackRequest } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationRollbackRequest {
    plan: LegacyToolArtifactMigrationPlan;
    execution: LegacyToolArtifactMigrationExecutionResult;
    dryRun?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dryRun` | 属性 | <code>dryRun?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `execution` | 属性 | <code>execution: LegacyToolArtifactMigrationExecutionResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `plan` | 属性 | <code>plan: LegacyToolArtifactMigrationPlan</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationRollbackResult`

Legacy Tool Artifact Migration Rollback Result 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationRollbackResult } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationRollbackResult {
    planHash: string;
    executionReportId: string;
    reportId: string;
    mode: 'dry_run' | 'rollback';
    items: LegacyToolArtifactMigrationRollbackItem[];
    summary: LegacyToolArtifactMigrationRollbackSummary;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionReportId` | 属性 | <code>executionReportId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `items` | 属性 | <code>items: LegacyToolArtifactMigrationRollbackItem[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "rollback" &#124; "dry_run"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `planHash` | 属性 | <code>planHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reportId` | 属性 | <code>reportId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `summary` | 属性 | <code>summary: LegacyToolArtifactMigrationRollbackSummary</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationRollbackSummary`

Legacy Tool Artifact Migration Rollback Summary 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationRollbackSummary } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationRollbackSummary {
    candidates: number;
    dryRun: number;
    rolledBack: number;
    alreadyAbsent: number;
    failed: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `alreadyAbsent` | 属性 | <code>alreadyAbsent: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `candidates` | 属性 | <code>candidates: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dryRun` | 属性 | <code>dryRun: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failed` | 属性 | <code>failed: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rolledBack` | 属性 | <code>rolledBack: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationRollbackErrorCode`

Legacy Tool Artifact Migration Rollback Error Code 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { LegacyToolArtifactMigrationRollbackErrorCode } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### 声明

```text
export type LegacyToolArtifactMigrationRollbackErrorCode = 'LEGACY_MIGRATION_ROLLBACK_INVALID_REPORT' | 'LEGACY_MIGRATION_ROLLBACK_TARGET_MISMATCH';
```
