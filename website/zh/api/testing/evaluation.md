# `@codesoul-co/hypha-testing` / `evaluation`

- 包索引: [`@codesoul-co/hypha-testing`](/zh/api/testing)
- 源码: [`packages/testing/src/evaluation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)
- 导出数: **15**

## 模块用法

用于使用该功能边界的公共契约与操作。Evaluation 模块公开 3 类、1 函数、10 接口、1 类型。

### 从包入口导入

```ts
import {
  DeterministicEvaluator,
  OutputContractValidator,
  TraceCompletenessEvaluator,
  validateJsonSchemaValue,
} from '@codesoul-co/hypha-testing';

import type {
  DeterministicEvaluationInput,
  DeterministicEvaluatorOptions,
  EvaluationCheckResult,
  EvaluationEventContext,
  EvaluationResult,
  EvaluationSummary,
  JsonSchemaValidationIssue,
  OutputContractValidationInput,
} from '@codesoul-co/hypha-testing';

// 完整导出列表见下方。
```

### 使用要点

- 11 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DeterministicEvaluator` | 类 | <code>new DeterministicEvaluator(options?: DeterministicEvaluatorOptions): DeterministicEvaluator</code> | Deterministic Evaluator 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `OutputContractValidator` | 类 | <code>new OutputContractValidator(options?: { now?: () =&gt; string; }): OutputContractValidator</code> | Output Contract Validator 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `TraceCompletenessEvaluator` | 类 | <code>new TraceCompletenessEvaluator(options?: TraceCompletenessEvaluatorOptions): TraceCompletenessEvaluator</code> | Trace Completeness Evaluator 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `validateJsonSchemaValue` | 函数 | <code>validateJsonSchemaValue(value: unknown, schema: JsonSchema, path?: string): JsonSchemaValidationIssue[]</code> | Validate JSON Schema Value 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `DeterministicEvaluationInput` | 接口 | <code>interface DeterministicEvaluationInput</code> | Deterministic Evaluation Input 接口，共包含 7 个公开字段或方法。 |
| `DeterministicEvaluatorOptions` | 接口 | <code>interface DeterministicEvaluatorOptions</code> | Deterministic Evaluator Options 接口，共包含 9 个公开字段或方法。 |
| `EvaluationCheckResult` | 接口 | <code>interface EvaluationCheckResult</code> | Evaluation Check Result 接口，共包含 7 个公开字段或方法。 |
| `EvaluationEventContext` | 接口 | <code>interface EvaluationEventContext</code> | Evaluation Event Context 接口，共包含 5 个公开字段或方法。 |
| `EvaluationResult` | 接口 | <code>interface EvaluationResult</code> | Evaluation Result 接口，共包含 10 个公开字段或方法。 |
| `EvaluationSummary` | 接口 | <code>interface EvaluationSummary</code> | Evaluation Summary 接口，共包含 7 个公开字段或方法。 |
| `JsonSchemaValidationIssue` | 接口 | <code>interface JsonSchemaValidationIssue</code> | JSON Schema Validation Issue 接口，共包含 4 个公开字段或方法。 |
| `OutputContractValidationInput` | 接口 | <code>interface OutputContractValidationInput</code> | Output Contract Validation Input 接口，共包含 5 个公开字段或方法。 |
| `TraceCompletenessEvaluatorOptions` | 接口 | <code>interface TraceCompletenessEvaluatorOptions</code> | Trace Completeness Evaluator Options 接口，共包含 3 个公开字段或方法。 |
| `TraceCompletenessInput` | 接口 | <code>interface TraceCompletenessInput</code> | Trace Completeness Input 接口，共包含 6 个公开字段或方法。 |
| `EvaluationStatus` | 类型 | <code>type EvaluationStatus = 'passed' &#124; 'failed'</code> | Evaluation Status 公共类型别名；完整类型表达式见声明。 |

## `DeterministicEvaluator`

Deterministic Evaluator 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DeterministicEvaluator } from '@codesoul-co/hypha-testing';`
- 源码模块: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### 声明

```text
export declare class DeterministicEvaluator {
    constructor(options?: DeterministicEvaluatorOptions);
    evaluate(input: DeterministicEvaluationInput): EvaluationSummary;
    evaluateAndRecord(input: DeterministicEvaluationInput): Promise<EvaluationSummary>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: DeterministicEvaluatorOptions): DeterministicEvaluator</code> | 创建该类的实例。 |
| `evaluate` | 方法 | <code>evaluate(input: DeterministicEvaluationInput): EvaluationSummary</code> | 公开方法；参数与返回类型以签名列为准。 |
| `evaluateAndRecord` | 方法 | <code>evaluateAndRecord(input: DeterministicEvaluationInput): Promise&lt;EvaluationSummary&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `OutputContractValidator`

Output Contract Validator 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { OutputContractValidator } from '@codesoul-co/hypha-testing';`
- 源码模块: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### 声明

```text
export declare class OutputContractValidator {
    constructor(options?: {
            now?: () => string;
        });
    validate(input: OutputContractValidationInput): EvaluationResult;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: { now?: () =&gt; string; }): OutputContractValidator</code> | 创建该类的实例。 |
| `validate` | 方法 | <code>validate(input: OutputContractValidationInput): EvaluationResult</code> | 公开方法；参数与返回类型以签名列为准。 |

## `TraceCompletenessEvaluator`

Trace Completeness Evaluator 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { TraceCompletenessEvaluator } from '@codesoul-co/hypha-testing';`
- 源码模块: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### 声明

```text
export declare class TraceCompletenessEvaluator {
    constructor(options?: TraceCompletenessEvaluatorOptions);
    evaluate(input: TraceCompletenessInput): EvaluationResult;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: TraceCompletenessEvaluatorOptions): TraceCompletenessEvaluator</code> | 创建该类的实例。 |
| `evaluate` | 方法 | <code>evaluate(input: TraceCompletenessInput): EvaluationResult</code> | 公开方法；参数与返回类型以签名列为准。 |

## `validateJsonSchemaValue`

Validate JSON Schema Value 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateJsonSchemaValue } from '@codesoul-co/hypha-testing';`
- 源码模块: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### 声明

```text
export declare function validateJsonSchemaValue(value: unknown, schema: JsonSchema, path?: string): JsonSchemaValidationIssue[];
```

### 调用签名

```text
validateJsonSchemaValue(value: unknown, schema: JsonSchema, path?: string): JsonSchemaValidationIssue[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `schema` | <code>JsonSchema</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `path` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `JsonSchemaValidationIssue[]`
- 说明: 返回值契约由上述类型定义。

## `DeterministicEvaluationInput`

Deterministic Evaluation Input 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DeterministicEvaluationInput } from '@codesoul-co/hypha-testing';`
- 源码模块: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### 声明

```text
export interface DeterministicEvaluationInput {
    runId?: string;
    events?: FrameworkEvent[];
    output?: unknown;
    outputContracts?: OutputContractSpec[];
    traceSpecs?: TraceSpec[];
    evaluationSpecs?: EvaluationSpec[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluationSpecs` | 属性 | <code>evaluationSpecs?: EvaluationSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>events?: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContracts` | 属性 | <code>outputContracts?: OutputContractSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceSpecs` | 属性 | <code>traceSpecs?: TraceSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DeterministicEvaluatorOptions`

Deterministic Evaluator Options 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DeterministicEvaluatorOptions } from '@codesoul-co/hypha-testing';`
- 源码模块: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### 声明

```text
export interface DeterministicEvaluatorOptions {
    now?: () => string;
    outputValidator?: OutputContractValidator;
    traceEvaluator?: TraceCompletenessEvaluator;
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
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trace` | 属性 | <code>trace?: TraceRecorder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceEvaluator` | 属性 | <code>traceEvaluator?: TraceCompletenessEvaluator</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EvaluationCheckResult`

Evaluation Check Result 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EvaluationCheckResult } from '@codesoul-co/hypha-testing';`
- 源码模块: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### 声明

```text
export interface EvaluationCheckResult {
    id: string;
    status: EvaluationStatus;
    message: string;
    path?: string;
    expected?: unknown;
    actual?: unknown;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actual` | 属性 | <code>actual?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expected` | 属性 | <code>expected?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `path` | 属性 | <code>path?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: EvaluationStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EvaluationEventContext`

Evaluation Event Context 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EvaluationEventContext } from '@codesoul-co/hypha-testing';`
- 源码模块: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### 声明

```text
export interface EvaluationEventContext {
    runId: string;
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
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EvaluationResult`

Evaluation Result 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EvaluationResult } from '@codesoul-co/hypha-testing';`
- 源码模块: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### 声明

```text
export interface EvaluationResult {
    id: string;
    evaluatorId: string;
    type: string;
    status: EvaluationStatus;
    score: number;
    checks: EvaluationCheckResult[];
    runId?: string;
    startedAt: string;
    completedAt: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checks` | 属性 | <code>checks: EvaluationCheckResult[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluatorId` | 属性 | <code>evaluatorId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `score` | 属性 | <code>score: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: EvaluationStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EvaluationSummary`

Evaluation Summary 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EvaluationSummary } from '@codesoul-co/hypha-testing';`
- 源码模块: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### 声明

```text
export interface EvaluationSummary {
    id: string;
    status: EvaluationStatus;
    score: number;
    results: EvaluationResult[];
    runId?: string;
    startedAt: string;
    completedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `completedAt` | 属性 | <code>completedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `results` | 属性 | <code>results: EvaluationResult[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `score` | 属性 | <code>score: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: EvaluationStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `JsonSchemaValidationIssue`

JSON Schema Validation Issue 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { JsonSchemaValidationIssue } from '@codesoul-co/hypha-testing';`
- 源码模块: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### 声明

```text
export interface JsonSchemaValidationIssue {
    path: string;
    message: string;
    expected?: unknown;
    actual?: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actual` | 属性 | <code>actual?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expected` | 属性 | <code>expected?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `path` | 属性 | <code>path: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `OutputContractValidationInput`

Output Contract Validation Input 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { OutputContractValidationInput } from '@codesoul-co/hypha-testing';`
- 源码模块: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### 声明

```text
export interface OutputContractValidationInput {
    contract: OutputContractSpec;
    output: unknown;
    runId?: string;
    evaluationId?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contract` | 属性 | <code>contract: OutputContractSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluationId` | 属性 | <code>evaluationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `TraceCompletenessEvaluatorOptions`

Trace Completeness Evaluator Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TraceCompletenessEvaluatorOptions } from '@codesoul-co/hypha-testing';`
- 源码模块: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### 声明

```text
export interface TraceCompletenessEvaluatorOptions {
    now?: () => string;
    enforceLifecyclePairs?: boolean;
    requireTerminalRun?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enforceLifecyclePairs` | 属性 | <code>enforceLifecyclePairs?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `requireTerminalRun` | 属性 | <code>requireTerminalRun?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `TraceCompletenessInput`

Trace Completeness Input 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TraceCompletenessInput } from '@codesoul-co/hypha-testing';`
- 源码模块: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### 声明

```text
export interface TraceCompletenessInput {
    events: FrameworkEvent[];
    traceSpec?: TraceSpec;
    runId?: string;
    requiredEventTypes?: string[];
    evaluationId?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluationId` | 属性 | <code>evaluationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredEventTypes` | 属性 | <code>requiredEventTypes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceSpec` | 属性 | <code>traceSpec?: TraceSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EvaluationStatus`

Evaluation Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { EvaluationStatus } from '@codesoul-co/hypha-testing';`
- 源码模块: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### 声明

```text
export type EvaluationStatus = 'passed' | 'failed';
```
