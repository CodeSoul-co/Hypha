# `@codesoul-co/hypha-core` / `modules/execution-governance/contracts`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-governance/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)
- 导出数: **12**

## 模块用法

用于声明并运行时校验契约。Contracts 模块公开 10 常量、2 函数。

### 从包入口导入

```ts
import {
  executionGovernanceJsonSchemas,
  executionRiskAssessmentExample,
  executionRiskAssessmentJsonSchema,
  executionRiskAssessmentSchema,
  executionSandboxLevelSchema,
  executionToolBindingExample,
  executionToolBindingJsonSchema,
  executionToolBindingSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 10 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { executionRiskAssessmentSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionRiskAssessmentSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionGovernanceJsonSchemas` | 常量 | <code>const executionGovernanceJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/execution-governance/contracts` 模块导出的 Execution Governance JSON Schemas 常量。 |
| `executionRiskAssessmentExample` | 常量 | <code>const executionRiskAssessmentExample: ExecutionRiskAssessment</code> | Execution Risk Assessment 的有效示例值。 |
| `executionRiskAssessmentJsonSchema` | 常量 | <code>const executionRiskAssessmentJsonSchema: JsonSchema</code> | Execution Risk Assessment 的 JSON Schema。 |
| `executionRiskAssessmentSchema` | 常量 | <code>const executionRiskAssessmentSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; level: z.ZodEnum&lt;["low", "medium", "high", "critical"]&gt;; reasons: z.ZodArray&lt;z.ZodString, "many"&gt;; matchedRules: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; requiresApproval: z.ZodBoolean; recommendedSandboxLevel: z.ZodOptional&lt;z.ZodEnum&lt;["local", "container", "remote_isolated"]&gt;&gt;; evaluatedAt: z.ZodString; }, "strict", z.ZodTypeA...</code> | Execution Risk Assessment 的运行时 Schema。 |
| `executionSandboxLevelSchema` | 常量 | <code>const executionSandboxLevelSchema: z.ZodEnum&lt;["local", "container", "remote_isolated"]&gt;</code> | Execution Sandbox Level 的运行时 Schema。 |
| `executionToolBindingExample` | 常量 | <code>const executionToolBindingExample: ExecutionToolBinding</code> | Execution Tool Binding 的有效示例值。 |
| `executionToolBindingJsonSchema` | 常量 | <code>const executionToolBindingJsonSchema: JsonSchema</code> | Execution Tool Binding 的 JSON Schema。 |
| `executionToolBindingSchema` | 常量 | <code>const executionToolBindingSchema: z.ZodEffects&lt;z.ZodObject&lt;{ toolId: z.ZodString; operation: z.ZodEnum&lt;["file_read", "file_write", "command", "sandbox", "artifact"]&gt;; executionProfileRef: z.ZodString; requiredScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; sideEffectLevel: z.ZodEnum&lt;["read", "write", "external_effect", "irreversible"]&gt;; humanReviewPolicyRef: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { operat...</code> | Execution Tool Binding 的运行时 Schema。 |
| `executionToolOperationSchema` | 常量 | <code>const executionToolOperationSchema: z.ZodEnum&lt;["file_read", "file_write", "command", "sandbox", "artifact"]&gt;</code> | Execution Tool Operation 的运行时 Schema。 |
| `executionToolSideEffectLevelSchema` | 常量 | <code>const executionToolSideEffectLevelSchema: z.ZodEnum&lt;["read", "write", "external_effect", "irreversible"]&gt;</code> | Execution Tool Side Effect Level 的运行时 Schema。 |
| `validateExecutionRiskAssessment` | 函数 | <code>validateExecutionRiskAssessment(input: unknown): ExecutionRiskAssessment</code> | Validate Execution Risk Assessment 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionToolBinding` | 函数 | <code>validateExecutionToolBinding(input: unknown): ExecutionToolBinding</code> | Validate Execution Tool Binding 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `executionGovernanceJsonSchemas`

由 `modules/execution-governance/contracts` 模块导出的 Execution Governance JSON Schemas 常量。

- 种类: 常量
- 导入: `import { executionGovernanceJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### 声明

```text
export declare const executionGovernanceJsonSchemas: Record<string, JsonSchema>;
```

## `executionRiskAssessmentExample`

Execution Risk Assessment 的有效示例值。

- 种类: 常量
- 导入: `import { executionRiskAssessmentExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### 声明

```text
export declare const executionRiskAssessmentExample: ExecutionRiskAssessment;
```

## `executionRiskAssessmentJsonSchema`

Execution Risk Assessment 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionRiskAssessmentJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### 声明

```text
export declare const executionRiskAssessmentJsonSchema: JsonSchema;
```

## `executionRiskAssessmentSchema`

Execution Risk Assessment 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionRiskAssessmentSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### 声明

```text
export declare const executionRiskAssessmentSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; level: z.ZodEnum<["low", "medium", "high", "critical"]>; reasons: z.ZodArray<z.ZodString, "many">; matchedRules: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; requiresApproval: z.ZodBoolean; recommendedSandboxLevel: z.ZodOptional<z.ZodEnum<["local", "container", "remote_isolated"]>>; evaluatedAt: z.ZodString; }, "strict", z.ZodTypeAny, { id: string; evaluatedAt: string; level: "low" | "medium" | "high" | "critical"; reasons: string[]; requiresApproval: boolean; matchedRules?: string[] | undefined; recommendedSandboxLevel?: "local" | "container" | "remote_isolated" | undefined; }, { id: string; evaluatedAt: string; level: "low" | "medium" | "high" | "critical"; reasons: string[]; requiresApproval: boolean; matchedRules?: string[] | undefined; recommendedSandboxLevel?: "local" | "container" | "remote_isolated" | undefined; }>, { id: string; evaluatedAt: string; level: "low" | "medium" | "high" | "critical"; reasons: string[]; requiresApproval: boolean; matchedRules?: string[] | undefined; recommendedSandboxLevel?: "local" | "container" | "remote_isolated" | undefined; }, { id: string; evaluatedAt: string; level: "low" | "medium" | "high" | "critical"; reasons: string[]; requiresApproval: boolean; matchedRules?: string[] | undefined; recommendedSandboxLevel?: "local" | "container" | "remote_isolated" | undefined; }>;
```

## `executionSandboxLevelSchema`

Execution Sandbox Level 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionSandboxLevelSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### 声明

```text
export declare const executionSandboxLevelSchema: z.ZodEnum<["local", "container", "remote_isolated"]>;
```

## `executionToolBindingExample`

Execution Tool Binding 的有效示例值。

- 种类: 常量
- 导入: `import { executionToolBindingExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### 声明

```text
export declare const executionToolBindingExample: ExecutionToolBinding;
```

## `executionToolBindingJsonSchema`

Execution Tool Binding 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionToolBindingJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### 声明

```text
export declare const executionToolBindingJsonSchema: JsonSchema;
```

## `executionToolBindingSchema`

Execution Tool Binding 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionToolBindingSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### 声明

```text
export declare const executionToolBindingSchema: z.ZodEffects<z.ZodObject<{ toolId: z.ZodString; operation: z.ZodEnum<["file_read", "file_write", "command", "sandbox", "artifact"]>; executionProfileRef: z.ZodString; requiredScopes: z.ZodArray<z.ZodString, "many">; sideEffectLevel: z.ZodEnum<["read", "write", "external_effect", "irreversible"]>; humanReviewPolicyRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operation: "command" | "artifact" | "file_read" | "file_write" | "sandbox"; toolId: string; sideEffectLevel: "external_effect" | "irreversible" | "read" | "write"; executionProfileRef: string; requiredScopes: string[]; humanReviewPolicyRef?: string | undefined; }, { operation: "command" | "artifact" | "file_read" | "file_write" | "sandbox"; toolId: string; sideEffectLevel: "external_effect" | "irreversible" | "read" | "write"; executionProfileRef: string; requiredScopes: string[]; humanReviewPolicyRef?: string | undefined; }>, { operation: "command" | "artifact" | "file_read" | "file_write" | "sandbox"; toolId: string; sideEffectLevel: "external_effect" | "irreversible" | "read" | "write"; executionProfileRef: string; requiredScopes: string[]; humanReviewPolicyRef?: string | undefined; }, { operation: "command" | "artifact" | "file_read" | "file_write" | "sandbox"; toolId: string; sideEffectLevel: "external_effect" | "irreversible" | "read" | "write"; executionProfileRef: string; requiredScopes: string[]; humanReviewPolicyRef?: string | undefined; }>;
```

## `executionToolOperationSchema`

Execution Tool Operation 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionToolOperationSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### 声明

```text
export declare const executionToolOperationSchema: z.ZodEnum<["file_read", "file_write", "command", "sandbox", "artifact"]>;
```

## `executionToolSideEffectLevelSchema`

Execution Tool Side Effect Level 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionToolSideEffectLevelSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### 声明

```text
export declare const executionToolSideEffectLevelSchema: z.ZodEnum<["read", "write", "external_effect", "irreversible"]>;
```

## `validateExecutionRiskAssessment`

Validate Execution Risk Assessment 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionRiskAssessment } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### 声明

```text
export declare function validateExecutionRiskAssessment(input: unknown): ExecutionRiskAssessment;
```

### 调用签名

```text
validateExecutionRiskAssessment(input: unknown): ExecutionRiskAssessment
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionRiskAssessment`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionToolBinding`

Validate Execution Tool Binding 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionToolBinding } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### 声明

```text
export declare function validateExecutionToolBinding(input: unknown): ExecutionToolBinding;
```

### 调用签名

```text
validateExecutionToolBinding(input: unknown): ExecutionToolBinding
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionToolBinding`
- 说明: 返回值契约由上述类型定义。
