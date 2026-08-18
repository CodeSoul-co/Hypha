# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-migration-planner`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)
- 导出数: **11**

## 模块用法

用于使用该功能边界的公共契约与操作。Legacy tool artifact migration planner 模块公开 2 类、7 接口、2 类型。

### 从包入口导入

```ts
import {
  LegacyToolArtifactMigrationPlanError,
  LegacyToolArtifactMigrationPlanner,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LegacyToolArtifactMigrationImportPlanItem,
  LegacyToolArtifactMigrationImportResolution,
  LegacyToolArtifactMigrationPlan,
  LegacyToolArtifactMigrationPlannerOptions,
  LegacyToolArtifactMigrationPlanRequest,
  LegacyToolArtifactMigrationSkipPlanItem,
  LegacyToolArtifactMigrationSkipResolution,
  LegacyToolArtifactMigrationPlanErrorCode,
} from '@codesoul-co/hypha-adapters-local';

// 完整导出列表见下方。
```

### 使用要点

- 9 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LegacyToolArtifactMigrationPlanError` | 类 | <code>new LegacyToolArtifactMigrationPlanError(code: LegacyToolArtifactMigrationPlanErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationPlanError</code> | Legacy Tool Artifact Migration Plan Error 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LegacyToolArtifactMigrationPlanner` | 类 | <code>new LegacyToolArtifactMigrationPlanner(options?: LegacyToolArtifactMigrationPlannerOptions): LegacyToolArtifactMigrationPlanner</code> | Creates a deterministic migration plan without reading, importing, or deleting Artifact bytes. Historical path segments are never identities. |
| `LegacyToolArtifactMigrationImportPlanItem` | 接口 | <code>interface LegacyToolArtifactMigrationImportPlanItem</code> | Legacy Tool Artifact Migration Import Plan Item 接口，共包含 2 个公开字段或方法。 |
| `LegacyToolArtifactMigrationImportResolution` | 接口 | <code>interface LegacyToolArtifactMigrationImportResolution</code> | Legacy Tool Artifact Migration Import Resolution 接口，共包含 5 个公开字段或方法。 |
| `LegacyToolArtifactMigrationPlan` | 接口 | <code>interface LegacyToolArtifactMigrationPlan</code> | Legacy Tool Artifact Migration Plan 接口，共包含 5 个公开字段或方法。 |
| `LegacyToolArtifactMigrationPlannerOptions` | 接口 | <code>interface LegacyToolArtifactMigrationPlannerOptions</code> | Legacy Tool Artifact Migration Planner Options 接口，共包含 1 个公开字段或方法。 |
| `LegacyToolArtifactMigrationPlanRequest` | 接口 | <code>interface LegacyToolArtifactMigrationPlanRequest</code> | Legacy Tool Artifact Migration Plan Request 接口，共包含 2 个公开字段或方法。 |
| `LegacyToolArtifactMigrationSkipPlanItem` | 接口 | <code>interface LegacyToolArtifactMigrationSkipPlanItem</code> | Legacy Tool Artifact Migration Skip Plan Item 接口，共包含 2 个公开字段或方法。 |
| `LegacyToolArtifactMigrationSkipResolution` | 接口 | <code>interface LegacyToolArtifactMigrationSkipResolution</code> | Legacy Tool Artifact Migration Skip Resolution 接口，共包含 2 个公开字段或方法。 |
| `LegacyToolArtifactMigrationPlanErrorCode` | 类型 | <code>type LegacyToolArtifactMigrationPlanErrorCode = 'LEGACY_MIGRATION_INVALID_INVENTORY' &#124; 'LEGACY_MIGRATION_DUPLICATE_SOURCE' &#124; 'LEGACY_MIGRATION_LIMIT_EXCEEDED' &#124; 'LEGACY_MIGRATION_INVALID_RESOLUTION'</code> | Legacy Tool Artifact Migration Plan Error Code 公共类型别名；完整类型表达式见声明。 |
| `LegacyToolArtifactMigrationResolution` | 类型 | <code>type LegacyToolArtifactMigrationResolution = LegacyToolArtifactMigrationImportResolution &#124; LegacyToolArtifactMigrationSkipResolution</code> | Legacy Tool Artifact Migration Resolution 公共类型别名；完整类型表达式见声明。 |

## `LegacyToolArtifactMigrationPlanError`

Legacy Tool Artifact Migration Plan Error 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LegacyToolArtifactMigrationPlanError } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### 声明

```text
export declare class LegacyToolArtifactMigrationPlanError extends Error {
    readonly code: LegacyToolArtifactMigrationPlanErrorCode;
    readonly details?: Record<string, unknown> | undefined;
    constructor(code: LegacyToolArtifactMigrationPlanErrorCode, message: string, details?: Record<string, unknown> | undefined);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>readonly code: LegacyToolArtifactMigrationPlanErrorCode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(code: LegacyToolArtifactMigrationPlanErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationPlanError</code> | 创建该类的实例。 |
| `details` | 属性 | <code>readonly details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LegacyToolArtifactMigrationPlanner`

Creates a deterministic migration plan without reading, importing, or deleting Artifact bytes. Historical path segments are never identities.

- 种类: 类
- 导入: `import { LegacyToolArtifactMigrationPlanner } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### 声明

```text
export declare class LegacyToolArtifactMigrationPlanner {
    constructor(options?: LegacyToolArtifactMigrationPlannerOptions);
    plan(request: LegacyToolArtifactMigrationPlanRequest): Promise<LegacyToolArtifactMigrationPlan>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: LegacyToolArtifactMigrationPlannerOptions): LegacyToolArtifactMigrationPlanner</code> | 创建该类的实例。 |
| `plan` | 方法 | <code>plan(request: LegacyToolArtifactMigrationPlanRequest): Promise&lt;LegacyToolArtifactMigrationPlan&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LegacyToolArtifactMigrationImportPlanItem`

Legacy Tool Artifact Migration Import Plan Item 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationImportPlanItem } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationImportPlanItem {
    source: LegacyToolArtifactInventoryEntry;
    request: LegacyToolArtifactImportRequest;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `request` | 属性 | <code>request: LegacyToolArtifactImportRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: LegacyToolArtifactInventoryEntry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationImportResolution`

Legacy Tool Artifact Migration Import Resolution 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationImportResolution } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationImportResolution {
    action: 'import';
    context: ToolArtifactManagerContext;
    toolId: string;
    invocationId: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `action` | 属性 | <code>action: "import"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `context` | 属性 | <code>context: ToolArtifactManagerContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationPlan`

Legacy Tool Artifact Migration Plan 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationPlan } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationPlan {
    planHash: string;
    imports: LegacyToolArtifactMigrationImportPlanItem[];
    skipped: LegacyToolArtifactMigrationSkipPlanItem[];
    totalEntries: number;
    totalBytes: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `imports` | 属性 | <code>imports: LegacyToolArtifactMigrationImportPlanItem[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `planHash` | 属性 | <code>planHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skipped` | 属性 | <code>skipped: LegacyToolArtifactMigrationSkipPlanItem[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalBytes` | 属性 | <code>totalBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalEntries` | 属性 | <code>totalEntries: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationPlannerOptions`

Legacy Tool Artifact Migration Planner Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationPlannerOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationPlannerOptions {
    maxEntries?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxEntries` | 属性 | <code>maxEntries?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationPlanRequest`

Legacy Tool Artifact Migration Plan Request 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationPlanRequest } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationPlanRequest {
    inventory: LegacyToolArtifactInventoryResult;
    resolve: (entry: Readonly<LegacyToolArtifactInventoryEntry>) => LegacyToolArtifactMigrationResolution | Promise<LegacyToolArtifactMigrationResolution>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `inventory` | 属性 | <code>inventory: LegacyToolArtifactInventoryResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolve` | 方法 | <code>resolve(entry: Readonly&lt;LegacyToolArtifactInventoryEntry&gt;): LegacyToolArtifactMigrationResolution &#124; Promise&lt;LegacyToolArtifactMigrationResolution&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LegacyToolArtifactMigrationSkipPlanItem`

Legacy Tool Artifact Migration Skip Plan Item 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationSkipPlanItem } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationSkipPlanItem {
    source: LegacyToolArtifactInventoryEntry;
    reason: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: LegacyToolArtifactInventoryEntry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationSkipResolution`

Legacy Tool Artifact Migration Skip Resolution 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationSkipResolution } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationSkipResolution {
    action: 'skip';
    reason: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `action` | 属性 | <code>action: "skip"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationPlanErrorCode`

Legacy Tool Artifact Migration Plan Error Code 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { LegacyToolArtifactMigrationPlanErrorCode } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### 声明

```text
export type LegacyToolArtifactMigrationPlanErrorCode = 'LEGACY_MIGRATION_INVALID_INVENTORY' | 'LEGACY_MIGRATION_DUPLICATE_SOURCE' | 'LEGACY_MIGRATION_LIMIT_EXCEEDED' | 'LEGACY_MIGRATION_INVALID_RESOLUTION';
```

## `LegacyToolArtifactMigrationResolution`

Legacy Tool Artifact Migration Resolution 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { LegacyToolArtifactMigrationResolution } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### 声明

```text
export type LegacyToolArtifactMigrationResolution = LegacyToolArtifactMigrationImportResolution | LegacyToolArtifactMigrationSkipResolution;
```
