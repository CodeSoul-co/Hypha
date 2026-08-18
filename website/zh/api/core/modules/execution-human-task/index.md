# `@codesoul-co/hypha-core` / `modules/execution-human-task/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-human-task/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)
- 导出数: **11**

## 模块用法

用于执行该边界的运行时行为。Index 模块公开 7 常量、3 函数、1 接口。

### 从包入口导入

```ts
import {
  executionHumanTaskSubjectDefinition,
  executionHumanTaskSubjectDefinitions,
  executionHumanTaskSubjectEnvelopeSchema,
  executionHumanTaskSubjectExample,
  executionHumanTaskSubjectJsonSchema,
  executionHumanTaskSubjectJsonSchemas,
  executionHumanTaskSubjectSchema,
  createExecutionHumanTaskSubject,
} from '@codesoul-co/hypha-core';

import type {
  CreateExecutionHumanTaskSubjectInput,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 7 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { executionHumanTaskSubjectEnvelopeSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionHumanTaskSubjectEnvelopeSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionHumanTaskSubjectDefinition` | 常量 | <code>const executionHumanTaskSubjectDefinition: SpecSchemaDefinition&lt;ExecutionHumanTaskSubject&gt;</code> | 由 `modules/execution-human-task/index` 模块导出的 Execution Human Task Subject Definition 常量。 |
| `executionHumanTaskSubjectDefinitions` | 常量 | <code>const executionHumanTaskSubjectDefinitions: readonly [SpecSchemaDefinition&lt;ExecutionHumanTaskSubject&gt;]</code> | 由 `modules/execution-human-task/index` 模块导出的 Execution Human Task Subject Definitions 常量。 |
| `executionHumanTaskSubjectEnvelopeSchema` | 常量 | <code>const executionHumanTaskSubjectEnvelopeSchema: z.ZodEffects&lt;z.ZodObject&lt;{ subjectRef: z.ZodString; subjectHash: z.ZodString; subject: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodLiteral&lt;"1.0.0"&gt;; kind: z.ZodLiteral&lt;"execution"&gt;; capturedAt: z.ZodString; principalId: z.ZodString; inputHash: z.ZodString; activity: z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z...</code> | Execution Human Task Subject Envelope 的运行时 Schema。 |
| `executionHumanTaskSubjectExample` | 常量 | <code>const executionHumanTaskSubjectExample: ExecutionHumanTaskSubject</code> | Execution Human Task Subject 的有效示例值。 |
| `executionHumanTaskSubjectJsonSchema` | 常量 | <code>const executionHumanTaskSubjectJsonSchema: JsonSchema</code> | Execution Human Task Subject 的 JSON Schema。 |
| `executionHumanTaskSubjectJsonSchemas` | 常量 | <code>const executionHumanTaskSubjectJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/execution-human-task/index` 模块导出的 Execution Human Task Subject JSON Schemas 常量。 |
| `executionHumanTaskSubjectSchema` | 常量 | <code>const executionHumanTaskSubjectSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodLiteral&lt;"1.0.0"&gt;; kind: z.ZodLiteral&lt;"execution"&gt;; capturedAt: z.ZodString; principalId: z.ZodString; inputHash: z.ZodString; activity: z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z.ZodString; workspaceId: z.ZodString; fencingToken: z.ZodNumber; deadlineAt: z.ZodOptional&lt;z.Zo...</code> | Execution Human Task Subject 的运行时 Schema。 |
| `createExecutionHumanTaskSubject` | 函数 | <code>createExecutionHumanTaskSubject(input: CreateExecutionHumanTaskSubjectInput): ExecutionHumanTaskSubjectEnvelope</code> | Create Execution Human Task Subject 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionHumanTaskSubject` | 函数 | <code>validateExecutionHumanTaskSubject(input: unknown): ExecutionHumanTaskSubject</code> | Validate Execution Human Task Subject 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionHumanTaskSubjectEnvelope` | 函数 | <code>validateExecutionHumanTaskSubjectEnvelope(input: unknown): ExecutionHumanTaskSubjectEnvelope</code> | Validate Execution Human Task Subject Envelope 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `CreateExecutionHumanTaskSubjectInput` | 接口 | <code>interface CreateExecutionHumanTaskSubjectInput</code> | Create Execution Human Task Subject Input 接口，共包含 10 个公开字段或方法。 |

## `executionHumanTaskSubjectDefinition`

由 `modules/execution-human-task/index` 模块导出的 Execution Human Task Subject Definition 常量。

- 种类: 常量
- 导入: `import { executionHumanTaskSubjectDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### 声明

```text
export declare const executionHumanTaskSubjectDefinition: SpecSchemaDefinition<ExecutionHumanTaskSubject>;
```

## `executionHumanTaskSubjectDefinitions`

由 `modules/execution-human-task/index` 模块导出的 Execution Human Task Subject Definitions 常量。

- 种类: 常量
- 导入: `import { executionHumanTaskSubjectDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### 声明

```text
export declare const executionHumanTaskSubjectDefinitions: readonly [SpecSchemaDefinition<ExecutionHumanTaskSubject>];
```

## `executionHumanTaskSubjectEnvelopeSchema`

Execution Human Task Subject Envelope 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionHumanTaskSubjectEnvelopeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionHumanTaskSubjectEnvelopeSchema: (typeof import('@codesoul-co/hypha-core'))['executionHumanTaskSubjectEnvelopeSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionHumanTaskSubjectExample`

Execution Human Task Subject 的有效示例值。

- 种类: 常量
- 导入: `import { executionHumanTaskSubjectExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### 声明

```text
export declare const executionHumanTaskSubjectExample: ExecutionHumanTaskSubject;
```

## `executionHumanTaskSubjectJsonSchema`

Execution Human Task Subject 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionHumanTaskSubjectJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### 声明

```text
export declare const executionHumanTaskSubjectJsonSchema: JsonSchema;
```

## `executionHumanTaskSubjectJsonSchemas`

由 `modules/execution-human-task/index` 模块导出的 Execution Human Task Subject JSON Schemas 常量。

- 种类: 常量
- 导入: `import { executionHumanTaskSubjectJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### 声明

```text
export declare const executionHumanTaskSubjectJsonSchemas: Record<string, JsonSchema>;
```

## `executionHumanTaskSubjectSchema`

Execution Human Task Subject 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionHumanTaskSubjectSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionHumanTaskSubjectSchema: (typeof import('@codesoul-co/hypha-core'))['executionHumanTaskSubjectSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `createExecutionHumanTaskSubject`

Create Execution Human Task Subject 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createExecutionHumanTaskSubject } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### 声明

```text
export declare function createExecutionHumanTaskSubject(input: CreateExecutionHumanTaskSubjectInput): ExecutionHumanTaskSubjectEnvelope;
```

### 调用签名

```text
createExecutionHumanTaskSubject(input: CreateExecutionHumanTaskSubjectInput): ExecutionHumanTaskSubjectEnvelope
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>CreateExecutionHumanTaskSubjectInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionHumanTaskSubjectEnvelope`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionHumanTaskSubject`

Validate Execution Human Task Subject 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionHumanTaskSubject } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### 声明

```text
export declare function validateExecutionHumanTaskSubject(input: unknown): ExecutionHumanTaskSubject;
```

### 调用签名

```text
validateExecutionHumanTaskSubject(input: unknown): ExecutionHumanTaskSubject
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionHumanTaskSubject`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionHumanTaskSubjectEnvelope`

Validate Execution Human Task Subject Envelope 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionHumanTaskSubjectEnvelope } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### 声明

```text
export declare function validateExecutionHumanTaskSubjectEnvelope(input: unknown): ExecutionHumanTaskSubjectEnvelope;
```

### 调用签名

```text
validateExecutionHumanTaskSubjectEnvelope(input: unknown): ExecutionHumanTaskSubjectEnvelope
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionHumanTaskSubjectEnvelope`
- 说明: 返回值契约由上述类型定义。

## `CreateExecutionHumanTaskSubjectInput`

Create Execution Human Task Subject Input 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CreateExecutionHumanTaskSubjectInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### 声明

```text
export interface CreateExecutionHumanTaskSubjectInput {
    activity: ExecutionActivityRequest;
    binding: ExecutionToolBinding;
    toolRevision?: string;
    riskAssessment: ExecutionRiskAssessment;
    environment: ExecutionEnvironmentSpec;
    providerId: string;
    providerRevision: string;
    inputHash: string;
    policyDecisionRef: string;
    capturedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activity` | 属性 | <code>activity: ExecutionActivityRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `binding` | 属性 | <code>binding: ExecutionToolBinding</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capturedAt` | 属性 | <code>capturedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environment` | 属性 | <code>environment: ExecutionEnvironmentSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyDecisionRef` | 属性 | <code>policyDecisionRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `riskAssessment` | 属性 | <code>riskAssessment: ExecutionRiskAssessment</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRevision` | 属性 | <code>toolRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
