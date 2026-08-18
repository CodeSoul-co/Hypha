# `@codesoul-co/hypha-core` / `contracts/execution-governance`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/execution-governance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)
- Exports: **9**

## Using this module

Use the Execution governance module for declaring and runtime-validating contracts. It exports 2 constants, 4 interfaces, 3 types.

### Import from the package entrypoint

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

### Usage patterns

- Use the 7 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `EXECUTION_SANDBOX_LEVELS` | constant | <code>const EXECUTION_SANDBOX_LEVELS: readonly ["local", "container", "remote_isolated"]</code> | EXECUTION SANDBOX LEVELS constant exported by the `contracts/execution-governance` module. |
| `EXECUTION_TOOL_OPERATIONS` | constant | <code>const EXECUTION_TOOL_OPERATIONS: readonly ["file_read", "file_write", "command", "sandbox", "artifact"]</code> | EXECUTION TOOL OPERATIONS constant exported by the `contracts/execution-governance` module. |
| `ExecutionRiskAssessment` | interface | <code>interface ExecutionRiskAssessment</code> | Execution Risk Assessment interface with 7 public fields or methods. |
| `ExecutionRiskEvaluationInput` | interface | <code>interface ExecutionRiskEvaluationInput</code> | Execution Risk Evaluation Input interface with 6 public fields or methods. |
| `ExecutionRiskEvaluator` | interface | <code>interface ExecutionRiskEvaluator</code> | Execution Risk Evaluator interface with 1 public fields or methods. |
| `ExecutionToolBinding` | interface | <code>interface ExecutionToolBinding</code> | Execution Tool Binding interface with 6 public fields or methods. |
| `ExecutionSandboxLevel` | type | <code>type ExecutionSandboxLevel = (typeof EXECUTION_SANDBOX_LEVELS)[number]</code> | Public type alias for Execution Sandbox Level; the declaration contains its complete type expression. |
| `ExecutionToolOperation` | type | <code>type ExecutionToolOperation = (typeof EXECUTION_TOOL_OPERATIONS)[number]</code> | Public type alias for Execution Tool Operation; the declaration contains its complete type expression. |
| `ExecutionToolSideEffectLevel` | type | <code>type ExecutionToolSideEffectLevel = Exclude&lt;SideEffectLevel, 'none'&gt;</code> | Public type alias for Execution Tool Side Effect Level; the declaration contains its complete type expression. |

## `EXECUTION_SANDBOX_LEVELS`

EXECUTION SANDBOX LEVELS constant exported by the `contracts/execution-governance` module.

- Kind: constant
- Import: `import { EXECUTION_SANDBOX_LEVELS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### Declaration

```text
export declare const EXECUTION_SANDBOX_LEVELS: readonly ["local", "container", "remote_isolated"];
```

## `EXECUTION_TOOL_OPERATIONS`

EXECUTION TOOL OPERATIONS constant exported by the `contracts/execution-governance` module.

- Kind: constant
- Import: `import { EXECUTION_TOOL_OPERATIONS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### Declaration

```text
export declare const EXECUTION_TOOL_OPERATIONS: readonly ["file_read", "file_write", "command", "sandbox", "artifact"];
```

## `ExecutionRiskAssessment`

Execution Risk Assessment interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionRiskAssessment } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluatedAt` | property | <code>evaluatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `level` | property | <code>level: RiskLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `matchedRules` | property | <code>matchedRules?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasons` | property | <code>reasons: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recommendedSandboxLevel` | property | <code>recommendedSandboxLevel?: "local" &#124; "container" &#124; "remote_isolated"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiresApproval` | property | <code>requiresApproval: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionRiskEvaluationInput`

Execution Risk Evaluation Input interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionRiskEvaluationInput } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assessmentId` | property | <code>assessmentId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `binding` | property | <code>binding: ExecutionToolBinding</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environment` | property | <code>environment: ExecutionEnvironmentSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluatedAt` | property | <code>evaluatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `request` | property | <code>request: CommandExecutionRequest &#124; WorkspaceOperationRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspace` | property | <code>workspace: WorkspaceSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionRiskEvaluator`

Execution Risk Evaluator interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionRiskEvaluator } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### Declaration

```text
export interface ExecutionRiskEvaluator {
    evaluate(input: ExecutionRiskEvaluationInput): ExecutionRiskAssessment;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluate` | method | <code>evaluate(input: ExecutionRiskEvaluationInput): ExecutionRiskAssessment</code> | Public method; parameters and return type are shown in the signature. |

## `ExecutionToolBinding`

Execution Tool Binding interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionToolBinding } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionProfileRef` | property | <code>executionProfileRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `humanReviewPolicyRef` | property | <code>humanReviewPolicyRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredScopes` | property | <code>requiredScopes: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel: ExecutionToolSideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionSandboxLevel`

Public type alias for Execution Sandbox Level; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionSandboxLevel } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### Declaration

```text
export type ExecutionSandboxLevel = (typeof EXECUTION_SANDBOX_LEVELS)[number];
```

## `ExecutionToolOperation`

Public type alias for Execution Tool Operation; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionToolOperation } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### Declaration

```text
export type ExecutionToolOperation = (typeof EXECUTION_TOOL_OPERATIONS)[number];
```

## `ExecutionToolSideEffectLevel`

Public type alias for Execution Tool Side Effect Level; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionToolSideEffectLevel } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)

### Declaration

```text
export type ExecutionToolSideEffectLevel = Exclude<SideEffectLevel, 'none'>;
```
