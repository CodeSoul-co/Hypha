# `@codesoul-co/hypha-core` / `contracts/execution-governance`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/execution-governance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)
- 导出数: **9**

## 模块用法

用于声明并运行时校验契约。Execution governance 模块公开 2 常量、4 接口、3 类型。

### 从包入口导入

```ts
import {
  EXECUTION_SANDBOX_LEVELS,
  EXECUTION_TOOL_OPERATIONS,
} from '@codesoul-co/hypha-core';

import type {
  ExecutionRiskAssessment,
  ExecutionRiskEvaluationInput,
  ExecutionRiskEvaluator,
  ExecutionToolBinding,
  ExecutionSandboxLevel,
  ExecutionToolOperation,
  ExecutionToolSideEffectLevel,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 7 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `EXECUTION_SANDBOX_LEVELS` | 常量 | <code>const EXECUTION_SANDBOX_LEVELS: readonly ["local", "container", "remote_isolated"]</code> | 由 `contracts/execution-governance` 模块导出的 EXECUTION SANDBOX LEVELS 常量。 |
| `EXECUTION_TOOL_OPERATIONS` | 常量 | <code>const EXECUTION_TOOL_OPERATIONS: readonly ["file_read", "file_write", "command", "sandbox", "artifact"]</code> | 由 `contracts/execution-governance` 模块导出的 EXECUTION TOOL OPERATIONS 常量。 |
| `ExecutionRiskAssessment` | 接口 | <code>interface ExecutionRiskAssessment</code> | Execution Risk Assessment 接口，共包含 7 个公开字段或方法。 |
| `ExecutionRiskEvaluationInput` | 接口 | <code>interface ExecutionRiskEvaluationInput</code> | Execution Risk Evaluation Input 接口，共包含 6 个公开字段或方法。 |
| `ExecutionRiskEvaluator` | 接口 | <code>interface ExecutionRiskEvaluator</code> | Execution Risk Evaluator 接口，共包含 1 个公开字段或方法。 |
| `ExecutionToolBinding` | 接口 | <code>interface ExecutionToolBinding</code> | Execution Tool Binding 接口，共包含 6 个公开字段或方法。 |
| `ExecutionSandboxLevel` | 类型 | <code>type ExecutionSandboxLevel = (typeof EXECUTION_SANDBOX_LEVELS)[number]</code> | Execution Sandbox Level 公共类型别名；完整类型表达式见声明。 |
| `ExecutionToolOperation` | 类型 | <code>type ExecutionToolOperation = (typeof EXECUTION_TOOL_OPERATIONS)[number]</code> | Execution Tool Operation 公共类型别名；完整类型表达式见声明。 |
| `ExecutionToolSideEffectLevel` | 类型 | <code>type ExecutionToolSideEffectLevel = Exclude&lt;SideEffectLevel, 'none'&gt;</code> | Execution Tool Side Effect Level 公共类型别名；完整类型表达式见声明。 |

## `EXECUTION_SANDBOX_LEVELS`

由 `contracts/execution-governance` 模块导出的 EXECUTION SANDBOX LEVELS 常量。

- 种类: 常量
- 导入: `import { EXECUTION_SANDBOX_LEVELS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### 声明

```text
export declare const EXECUTION_SANDBOX_LEVELS: readonly ["local", "container", "remote_isolated"];
```

## `EXECUTION_TOOL_OPERATIONS`

由 `contracts/execution-governance` 模块导出的 EXECUTION TOOL OPERATIONS 常量。

- 种类: 常量
- 导入: `import { EXECUTION_TOOL_OPERATIONS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### 声明

```text
export declare const EXECUTION_TOOL_OPERATIONS: readonly ["file_read", "file_write", "command", "sandbox", "artifact"];
```

## `ExecutionRiskAssessment`

Execution Risk Assessment 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionRiskAssessment } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### 声明

```text
export interface ExecutionRiskAssessment {
    id: string;
    level: RiskLevel;
    reasons: string[];
    matchedRules?: string[];
    requiresApproval: boolean;
    recommendedSandboxLevel?: ExecutionSandboxLevel;
    evaluatedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluatedAt` | 属性 | <code>evaluatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `level` | 属性 | <code>level: RiskLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `matchedRules` | 属性 | <code>matchedRules?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasons` | 属性 | <code>reasons: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recommendedSandboxLevel` | 属性 | <code>recommendedSandboxLevel?: "local" &#124; "container" &#124; "remote_isolated"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiresApproval` | 属性 | <code>requiresApproval: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionRiskEvaluationInput`

Execution Risk Evaluation Input 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionRiskEvaluationInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### 声明

```text
export interface ExecutionRiskEvaluationInput {
    assessmentId: string;
    binding: ExecutionToolBinding;
    request: CommandExecutionRequest | WorkspaceOperationRequest;
    environment: ExecutionEnvironmentSpec;
    workspace: WorkspaceSpec;
    evaluatedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assessmentId` | 属性 | <code>assessmentId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `binding` | 属性 | <code>binding: ExecutionToolBinding</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environment` | 属性 | <code>environment: ExecutionEnvironmentSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluatedAt` | 属性 | <code>evaluatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `request` | 属性 | <code>request: CommandExecutionRequest &#124; WorkspaceOperationRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspace` | 属性 | <code>workspace: WorkspaceSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionRiskEvaluator`

Execution Risk Evaluator 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionRiskEvaluator } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### 声明

```text
export interface ExecutionRiskEvaluator {
    evaluate(input: ExecutionRiskEvaluationInput): ExecutionRiskAssessment;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluate` | 方法 | <code>evaluate(input: ExecutionRiskEvaluationInput): ExecutionRiskAssessment</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExecutionToolBinding`

Execution Tool Binding 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionToolBinding } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### 声明

```text
export interface ExecutionToolBinding {
    toolId: string;
    operation: ExecutionToolOperation;
    executionProfileRef: string;
    requiredScopes: string[];
    sideEffectLevel: ExecutionToolSideEffectLevel;
    humanReviewPolicyRef?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionProfileRef` | 属性 | <code>executionProfileRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `humanReviewPolicyRef` | 属性 | <code>humanReviewPolicyRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredScopes` | 属性 | <code>requiredScopes: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: ExecutionToolSideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionSandboxLevel`

Execution Sandbox Level 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionSandboxLevel } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### 声明

```text
export type ExecutionSandboxLevel = (typeof EXECUTION_SANDBOX_LEVELS)[number];
```

## `ExecutionToolOperation`

Execution Tool Operation 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionToolOperation } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### 声明

```text
export type ExecutionToolOperation = (typeof EXECUTION_TOOL_OPERATIONS)[number];
```

## `ExecutionToolSideEffectLevel`

Execution Tool Side Effect Level 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionToolSideEffectLevel } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### 声明

```text
export type ExecutionToolSideEffectLevel = Exclude<SideEffectLevel, 'none'>;
```
