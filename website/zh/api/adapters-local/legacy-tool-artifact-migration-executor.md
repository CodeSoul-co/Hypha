# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-migration-executor`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)
- 导出数: **10**

## 模块用法

用于执行该边界的运行时行为。Legacy tool artifact migration executor 模块公开 2 类、7 接口、1 类型。

### 从包入口导入

```ts
import {
  LegacyToolArtifactMigrationExecutionError,
  LegacyToolArtifactMigrationExecutor,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LegacyToolArtifactMigrationExecuteRequest,
  LegacyToolArtifactMigrationExecutionItem,
  LegacyToolArtifactMigrationExecutionResult,
  LegacyToolArtifactMigrationExecutionSummary,
  LegacyToolArtifactMigrationExecutorOptions,
  LegacyToolArtifactMigrationFailure,
  LegacyToolArtifactMigrationTargetSummary,
  LegacyToolArtifactMigrationExecutionErrorCode,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 8 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LegacyToolArtifactMigrationExecutionError` | 类 | <code>new LegacyToolArtifactMigrationExecutionError(code: LegacyToolArtifactMigrationExecutionErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationExecutionError</code> | Legacy Tool Artifact Migration Execution Error 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LegacyToolArtifactMigrationExecutor` | 类 | <code>new LegacyToolArtifactMigrationExecutor(options: LegacyToolArtifactMigrationExecutorOptions): LegacyToolArtifactMigrationExecutor</code> | Executes a prevalidated migration plan sequentially. It never deletes or mutates legacy source files, and individual import failures remain isolated. |
| `LegacyToolArtifactMigrationExecuteRequest` | 接口 | <code>interface LegacyToolArtifactMigrationExecuteRequest</code> | Legacy Tool Artifact Migration Execute Request 接口，共包含 2 个公开字段或方法。 |
| `LegacyToolArtifactMigrationExecutionItem` | 接口 | <code>interface LegacyToolArtifactMigrationExecutionItem</code> | Legacy Tool Artifact Migration Execution Item 接口，共包含 10 个公开字段或方法。 |
| `LegacyToolArtifactMigrationExecutionResult` | 接口 | <code>interface LegacyToolArtifactMigrationExecutionResult</code> | Legacy Tool Artifact Migration Execution Result 接口，共包含 6 个公开字段或方法。 |
| `LegacyToolArtifactMigrationExecutionSummary` | 接口 | <code>interface LegacyToolArtifactMigrationExecutionSummary</code> | Legacy Tool Artifact Migration Execution Summary 接口，共包含 5 个公开字段或方法。 |
| `LegacyToolArtifactMigrationExecutorOptions` | 接口 | <code>interface LegacyToolArtifactMigrationExecutorOptions</code> | Legacy Tool Artifact Migration Executor Options 接口，共包含 2 个公开字段或方法。 |
| `LegacyToolArtifactMigrationFailure` | 接口 | <code>interface LegacyToolArtifactMigrationFailure</code> | Legacy Tool Artifact Migration Failure 接口，共包含 3 个公开字段或方法。 |
| `LegacyToolArtifactMigrationTargetSummary` | 接口 | <code>interface LegacyToolArtifactMigrationTargetSummary</code> | Legacy Tool Artifact Migration Target Summary 接口，共包含 4 个公开字段或方法。 |
| `LegacyToolArtifactMigrationExecutionErrorCode` | 类型 | <code>type LegacyToolArtifactMigrationExecutionErrorCode = 'LEGACY_MIGRATION_EXECUTION_INVALID_PLAN' &#124; 'LEGACY_MIGRATION_EXECUTION_LIMIT_EXCEEDED' &#124; 'LEGACY_MIGRATION_RESULT_MISMATCH'</code> | Legacy Tool Artifact Migration Execution Error Code 公共类型别名；完整类型表达式见声明。 |

## `LegacyToolArtifactMigrationExecutionError`

Legacy Tool Artifact Migration Execution Error 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LegacyToolArtifactMigrationExecutionError } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### 声明

```text
export declare class LegacyToolArtifactMigrationExecutionError extends Error {
    readonly code: LegacyToolArtifactMigrationExecutionErrorCode;
    readonly details?: Record<string, unknown> | undefined;
    constructor(code: LegacyToolArtifactMigrationExecutionErrorCode, message: string, details?: Record<string, unknown> | undefined);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>readonly code: LegacyToolArtifactMigrationExecutionErrorCode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(code: LegacyToolArtifactMigrationExecutionErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationExecutionError</code> | 创建该类的实例。 |
| `details` | 属性 | <code>readonly details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LegacyToolArtifactMigrationExecutor`

Executes a prevalidated migration plan sequentially. It never deletes or mutates legacy source files, and individual import failures remain isolated.

- 种类: 类
- 导入: `import { LegacyToolArtifactMigrationExecutor } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### 声明

```text
export declare class LegacyToolArtifactMigrationExecutor {
    constructor(options: LegacyToolArtifactMigrationExecutorOptions);
    execute(request: LegacyToolArtifactMigrationExecuteRequest): Promise<LegacyToolArtifactMigrationExecutionResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LegacyToolArtifactMigrationExecutorOptions): LegacyToolArtifactMigrationExecutor</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: LegacyToolArtifactMigrationExecuteRequest): Promise&lt;LegacyToolArtifactMigrationExecutionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LegacyToolArtifactMigrationExecuteRequest`

Legacy Tool Artifact Migration Execute Request 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationExecuteRequest } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationExecuteRequest {
    plan: LegacyToolArtifactMigrationPlan;
    dryRun?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dryRun` | 属性 | <code>dryRun?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `plan` | 属性 | <code>plan: LegacyToolArtifactMigrationPlan</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationExecutionItem`

Legacy Tool Artifact Migration Execution Item 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationExecutionItem } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationExecutionItem {
    relativePath: string;
    legacyArtifactId: string;
    target: LegacyToolArtifactMigrationTargetSummary;
    status: 'dry_run' | 'imported' | 'failed';
    artifactId?: string;
    versionId?: string;
    revision?: number;
    contentHash?: string;
    sizeBytes?: number;
    failure?: LegacyToolArtifactMigrationFailure;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failure` | 属性 | <code>failure?: LegacyToolArtifactMigrationFailure</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `legacyArtifactId` | 属性 | <code>legacyArtifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "failed" &#124; "imported" &#124; "dry_run"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `target` | 属性 | <code>target: LegacyToolArtifactMigrationTargetSummary</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationExecutionResult`

Legacy Tool Artifact Migration Execution Result 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationExecutionResult } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationExecutionResult {
    planHash: string;
    reportId: string;
    mode: 'dry_run' | 'execute';
    items: LegacyToolArtifactMigrationExecutionItem[];
    skipped: LegacyToolArtifactMigrationSkipPlanItem[];
    summary: LegacyToolArtifactMigrationExecutionSummary;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `items` | 属性 | <code>items: LegacyToolArtifactMigrationExecutionItem[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "execute" &#124; "dry_run"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `planHash` | 属性 | <code>planHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reportId` | 属性 | <code>reportId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skipped` | 属性 | <code>skipped: LegacyToolArtifactMigrationSkipPlanItem[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `summary` | 属性 | <code>summary: LegacyToolArtifactMigrationExecutionSummary</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationExecutionSummary`

Legacy Tool Artifact Migration Execution Summary 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationExecutionSummary } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationExecutionSummary {
    planned: number;
    dryRun: number;
    imported: number;
    failed: number;
    skipped: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dryRun` | 属性 | <code>dryRun: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failed` | 属性 | <code>failed: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `imported` | 属性 | <code>imported: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `planned` | 属性 | <code>planned: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skipped` | 属性 | <code>skipped: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationExecutorOptions`

Legacy Tool Artifact Migration Executor Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationExecutorOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationExecutorOptions {
    importer: Pick<LegacyToolArtifactImporter, 'import'>;
    maxImports?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `importer` | 属性 | <code>importer: Pick&lt;LegacyToolArtifactImporter, "import"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxImports` | 属性 | <code>maxImports?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationFailure`

Legacy Tool Artifact Migration Failure 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationFailure } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationFailure {
    name: string;
    code?: string;
    message: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `code` | 属性 | <code>code?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationTargetSummary`

Legacy Tool Artifact Migration Target Summary 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationTargetSummary } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationTargetSummary {
    principalId: string;
    workspaceId: string;
    toolId: string;
    invocationId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `invocationId` | 属性 | <code>invocationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationExecutionErrorCode`

Legacy Tool Artifact Migration Execution Error Code 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { LegacyToolArtifactMigrationExecutionErrorCode } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### 声明

```text
export type LegacyToolArtifactMigrationExecutionErrorCode = 'LEGACY_MIGRATION_EXECUTION_INVALID_PLAN' | 'LEGACY_MIGRATION_EXECUTION_LIMIT_EXCEEDED' | 'LEGACY_MIGRATION_RESULT_MISMATCH';
```
