# `@codesoul-co/hypha-testing` / `regression`

- 包索引: [`@codesoul-co/hypha-testing`](/zh/api/testing)
- 源码: [`packages/testing/src/regression.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)
- 导出数: **7**

## 模块用法

用于使用该功能边界的公共契约与操作。Regression 模块公开 1 类、5 接口、1 类型。

### 从包入口导入

```ts
import {
  RegressionRunner,
} from '@codesoul-co/hypha-testing';

import type {
  RegressionCase,
  RegressionCaseResult,
  RegressionRunnerOptions,
  RegressionRunResult,
  RegressionSpecRunInput,
  RegressionCheck,
} from '@codesoul-co/hypha-testing';
```

### 使用要点

- 6 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RegressionRunner` | 类 | <code>new RegressionRunner(options?: RegressionRunnerOptions): RegressionRunner</code> | Regression Runner 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RegressionCase` | 接口 | <code>interface RegressionCase</code> | Regression Case 接口，共包含 6 个公开字段或方法。 |
| `RegressionCaseResult` | 接口 | <code>interface RegressionCaseResult</code> | Regression Case Result 接口，共包含 8 个公开字段或方法。 |
| `RegressionRunnerOptions` | 接口 | <code>interface RegressionRunnerOptions</code> | Regression Runner Options 接口，共包含 9 个公开字段或方法。 |
| `RegressionRunResult` | 接口 | <code>interface RegressionRunResult</code> | Regression Run Result 接口，共包含 7 个公开字段或方法。 |
| `RegressionSpecRunInput` | 接口 | <code>interface RegressionSpecRunInput</code> | Regression Spec Run Input 接口，共包含 9 个公开字段或方法。 |
| `RegressionCheck` | 类型 | <code>type RegressionCheck = 'event_types' &#124; 'state_path' &#124; 'tool_calls' &#124; 'policy_decisions' &#124; 'output_contract'</code> | Regression Check 公共类型别名；完整类型表达式见声明。 |

## `RegressionRunner`

Regression Runner 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RegressionRunner } from '@codesoul-co/hypha-testing';`
- 源码模块: [`regression`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)

### 声明

```text
export declare class RegressionRunner {
    constructor(options?: RegressionRunnerOptions);
    runCase(regressionCase: RegressionCase): RegressionCaseResult;
    runSpec(input: RegressionSpecRunInput): RegressionRunResult;
    runSpecAndRecord(input: RegressionSpecRunInput): Promise<RegressionRunResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: RegressionRunnerOptions): RegressionRunner</code> | 创建该类的实例。 |
| `runCase` | 方法 | <code>runCase(regressionCase: RegressionCase): RegressionCaseResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runSpec` | 方法 | <code>runSpec(input: RegressionSpecRunInput): RegressionRunResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runSpecAndRecord` | 方法 | <code>runSpecAndRecord(input: RegressionSpecRunInput): Promise&lt;RegressionRunResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RegressionCase`

Regression Case 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RegressionCase } from '@codesoul-co/hypha-testing';`
- 源码模块: [`regression`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)

### 声明

```text
export interface RegressionCase {
    id: string;
    fixture: ReplayFixture;
    actualEvents?: FrameworkEvent[];
    requiredChecks?: RegressionCheck[];
    outputContract?: OutputContractSpec;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actualEvents` | 属性 | <code>actualEvents?: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fixture` | 属性 | <code>fixture: ReplayFixture</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContract` | 属性 | <code>outputContract?: OutputContractSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredChecks` | 属性 | <code>requiredChecks?: RegressionCheck[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RegressionCaseResult`

Regression Case Result 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RegressionCaseResult } from '@codesoul-co/hypha-testing';`
- 源码模块: [`regression`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)

### 声明

```text
export interface RegressionCaseResult {
    id: string;
    fixtureId: string;
    runId: string;
    status: EvaluationStatus;
    checks: EvaluationCheckResult[];
    traceDiff: TraceDiff;
    outputContractResult?: EvaluationResult;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checks` | 属性 | <code>checks: EvaluationCheckResult[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fixtureId` | 属性 | <code>fixtureId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContractResult` | 属性 | <code>outputContractResult?: EvaluationResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: EvaluationStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceDiff` | 属性 | <code>traceDiff: TraceDiff</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RegressionRunnerOptions`

Regression Runner Options 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RegressionRunnerOptions } from '@codesoul-co/hypha-testing';`
- 源码模块: [`regression`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)

### 声明

```text
export interface RegressionRunnerOptions {
    replayEngine?: ReplayEngine;
    outputValidator?: OutputContractValidator;
    now?: () => string;
    trace?: TraceRecorder;
    eventRunId?: string;
    sessionId?: string;
    workspaceId?: string;
    agentId?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventRunId` | 属性 | <code>eventRunId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `outputValidator` | 属性 | <code>outputValidator?: OutputContractValidator</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `replayEngine` | 属性 | <code>replayEngine?: ReplayEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trace` | 属性 | <code>trace?: TraceRecorder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RegressionRunResult`

Regression Run Result 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RegressionRunResult } from '@codesoul-co/hypha-testing';`
- 源码模块: [`regression`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)

### 声明

```text
export interface RegressionRunResult {
    id: string;
    status: EvaluationStatus;
    specId?: string;
    startedAt: string;
    completedAt: string;
    cases: RegressionCaseResult[];
    summary: {
        total: number;
        passed: number;
        failed: number;
    };
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cases` | 属性 | <code>cases: RegressionCaseResult[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `specId` | 属性 | <code>specId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: EvaluationStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `summary` | 属性 | <code>summary: { total: number; passed: number; failed: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RegressionSpecRunInput`

Regression Spec Run Input 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RegressionSpecRunInput } from '@codesoul-co/hypha-testing';`
- 源码模块: [`regression`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)

### 声明

```text
export interface RegressionSpecRunInput {
    spec: RegressionSpec;
    fixtures: ReplayFixture[] | Map<string, ReplayFixture>;
    actualEventsByFixtureId?: Map<string, FrameworkEvent[]>;
    outputContractsByFixtureId?: Map<string, OutputContractSpec>;
    runId?: string;
    sessionId?: string;
    workspaceId?: string;
    agentId?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actualEventsByFixtureId` | 属性 | <code>actualEventsByFixtureId?: Map&lt;string, FrameworkEvent&lt;unknown&gt;[]&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fixtures` | 属性 | <code>fixtures: ReplayFixture[] &#124; Map&lt;string, ReplayFixture&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContractsByFixtureId` | 属性 | <code>outputContractsByFixtureId?: Map&lt;string, OutputContractSpec&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `spec` | 属性 | <code>spec: RegressionSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RegressionCheck`

Regression Check 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RegressionCheck } from '@codesoul-co/hypha-testing';`
- 源码模块: [`regression`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)

### 声明

```text
export type RegressionCheck = 'event_types' | 'state_path' | 'tool_calls' | 'policy_decisions' | 'output_contract';
```
