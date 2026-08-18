# `@codesoul-co/hypha-core` / `contracts/runtime-human-task-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-human-task-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)
- 导出数: **15**

## 模块用法

用于声明并运行时校验契约。Runtime human task schemas 模块公开 12 常量、3 函数。

### 从包入口导入

```ts
import {
  runtimeHumanTaskContractDefinitions,
  runtimeHumanTaskContractJsonSchemas,
  runtimeHumanTaskDecisionCommandDefinition,
  runtimeHumanTaskDecisionCommandExample,
  runtimeHumanTaskDecisionCommandJsonSchema,
  runtimeHumanTaskDecisionCommandSchema,
  runtimeHumanTaskDefinition,
  runtimeHumanTaskExample,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 12 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { runtimeHumanTaskDecisionCommandSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeHumanTaskDecisionCommandSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeHumanTaskContractDefinitions` | 常量 | <code>const runtimeHumanTaskContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeHumanTask&gt;, SpecSchemaDefinition&lt;RuntimeHumanTaskDecisionCommand&gt;]</code> | 由 `contracts/runtime-human-task-schemas` 模块导出的 Runtime Human Task Contract Definitions 常量。 |
| `runtimeHumanTaskContractJsonSchemas` | 常量 | <code>const runtimeHumanTaskContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-human-task-schemas` 模块导出的 Runtime Human Task Contract JSON Schemas 常量。 |
| `runtimeHumanTaskDecisionCommandDefinition` | 常量 | <code>const runtimeHumanTaskDecisionCommandDefinition: SpecSchemaDefinition&lt;RuntimeHumanTaskDecisionCommand&gt;</code> | 由 `contracts/runtime-human-task-schemas` 模块导出的 Runtime Human Task Decision Command Definition 常量。 |
| `runtimeHumanTaskDecisionCommandExample` | 常量 | <code>const runtimeHumanTaskDecisionCommandExample: RuntimeHumanTaskDecisionCommand</code> | Runtime Human Task Decision Command 的有效示例值。 |
| `runtimeHumanTaskDecisionCommandJsonSchema` | 常量 | <code>const runtimeHumanTaskDecisionCommandJsonSchema: JsonSchema</code> | Runtime Human Task Decision Command 的 JSON Schema。 |
| `runtimeHumanTaskDecisionCommandSchema` | 常量 | <code>const runtimeHumanTaskDecisionCommandSchema: z.ZodEffects&lt;z.ZodObject&lt;{ commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; runId: string; tenantId?: string &#124; undefined; workspace...</code> | Runtime Human Task Decision Command 的运行时 Schema。 |
| `runtimeHumanTaskDefinition` | 常量 | <code>const runtimeHumanTaskDefinition: SpecSchemaDefinition&lt;RuntimeHumanTask&gt;</code> | 由 `contracts/runtime-human-task-schemas` 模块导出的 Runtime Human Task Definition 常量。 |
| `runtimeHumanTaskExample` | 常量 | <code>const runtimeHumanTaskExample: RuntimeHumanTask</code> | Runtime Human Task 的有效示例值。 |
| `runtimeHumanTaskJsonSchema` | 常量 | <code>const runtimeHumanTaskJsonSchema: JsonSchema</code> | Runtime Human Task 的 JSON Schema。 |
| `runtimeHumanTaskRequestJsonSchema` | 常量 | <code>const runtimeHumanTaskRequestJsonSchema: JsonSchema</code> | Runtime Human Task Request 的 JSON Schema。 |
| `runtimeHumanTaskRequestSchema` | 常量 | <code>const runtimeHumanTaskRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ taskId: z.ZodString; kind: z.ZodEnum&lt;["tool", "skill", "prompt", "memory", "execution", "mcp", "policy"]&gt;; subjectRef: z.ZodString; subjectHash: z.ZodString; requestedBy: z.ZodString; allowedDecisionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; requestedAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; checkpointRef: z.ZodOptional&lt;z.ZodString&gt;; polic...</code> | Runtime Human Task Request 的运行时 Schema。 |
| `runtimeHumanTaskSchema` | 常量 | <code>const runtimeHumanTaskSchema: z.ZodEffects&lt;z.ZodEffects&lt;z.ZodObject&lt;{ runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; status: z.ZodEnum&lt;["pending", "approved", "rejected", "expired", "cancelled", "superseded"]&gt;; revision: z.ZodNumber; decisionEventId: z.ZodOptional&lt;z.ZodString&gt;; decisionCommandId: z.ZodOptional&lt;z.ZodString&gt;; decisionIdempotencyKey: z.ZodOptional&lt;z.ZodString&gt;; decidedBy: z.ZodO...</code> | Runtime Human Task 的运行时 Schema。 |
| `validateRuntimeHumanTask` | 函数 | <code>validateRuntimeHumanTask(input: unknown): RuntimeHumanTask</code> | Validate Runtime Human Task 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeHumanTaskDecisionCommand` | 函数 | <code>validateRuntimeHumanTaskDecisionCommand(input: unknown): RuntimeHumanTaskDecisionCommand</code> | Validate Runtime Human Task Decision Command 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeHumanTaskRequest` | 函数 | <code>validateRuntimeHumanTaskRequest(input: unknown): RuntimeHumanTaskRequest</code> | Validate Runtime Human Task Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `runtimeHumanTaskContractDefinitions`

由 `contracts/runtime-human-task-schemas` 模块导出的 Runtime Human Task Contract Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeHumanTaskContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### 声明

```text
export declare const runtimeHumanTaskContractDefinitions: readonly [SpecSchemaDefinition<RuntimeHumanTask>, SpecSchemaDefinition<RuntimeHumanTaskDecisionCommand>];
```

## `runtimeHumanTaskContractJsonSchemas`

由 `contracts/runtime-human-task-schemas` 模块导出的 Runtime Human Task Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { runtimeHumanTaskContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### 声明

```text
export declare const runtimeHumanTaskContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeHumanTaskDecisionCommandDefinition`

由 `contracts/runtime-human-task-schemas` 模块导出的 Runtime Human Task Decision Command Definition 常量。

- 种类: 常量
- 导入: `import { runtimeHumanTaskDecisionCommandDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### 声明

```text
export declare const runtimeHumanTaskDecisionCommandDefinition: SpecSchemaDefinition<RuntimeHumanTaskDecisionCommand>;
```

## `runtimeHumanTaskDecisionCommandExample`

Runtime Human Task Decision Command 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeHumanTaskDecisionCommandExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### 声明

```text
export declare const runtimeHumanTaskDecisionCommandExample: RuntimeHumanTaskDecisionCommand;
```

## `runtimeHumanTaskDecisionCommandJsonSchema`

Runtime Human Task Decision Command 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeHumanTaskDecisionCommandJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### 声明

```text
export declare const runtimeHumanTaskDecisionCommandJsonSchema: JsonSchema;
```

## `runtimeHumanTaskDecisionCommandSchema`

Runtime Human Task Decision Command 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeHumanTaskDecisionCommandSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeHumanTaskDecisionCommandSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeHumanTaskDecisionCommandSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeHumanTaskDefinition`

由 `contracts/runtime-human-task-schemas` 模块导出的 Runtime Human Task Definition 常量。

- 种类: 常量
- 导入: `import { runtimeHumanTaskDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### 声明

```text
export declare const runtimeHumanTaskDefinition: SpecSchemaDefinition<RuntimeHumanTask>;
```

## `runtimeHumanTaskExample`

Runtime Human Task 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeHumanTaskExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### 声明

```text
export declare const runtimeHumanTaskExample: RuntimeHumanTask;
```

## `runtimeHumanTaskJsonSchema`

Runtime Human Task 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeHumanTaskJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### 声明

```text
export declare const runtimeHumanTaskJsonSchema: JsonSchema;
```

## `runtimeHumanTaskRequestJsonSchema`

Runtime Human Task Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeHumanTaskRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### 声明

```text
export declare const runtimeHumanTaskRequestJsonSchema: JsonSchema;
```

## `runtimeHumanTaskRequestSchema`

Runtime Human Task Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeHumanTaskRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### 声明

```text
export declare const runtimeHumanTaskRequestSchema: z.ZodEffects<z.ZodObject<{ taskId: z.ZodString; kind: z.ZodEnum<["tool", "skill", "prompt", "memory", "execution", "mcp", "policy"]>; subjectRef: z.ZodString; subjectHash: z.ZodString; requestedBy: z.ZodString; allowedDecisionScopes: z.ZodArray<z.ZodString, "many">; requestedAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; checkpointRef: z.ZodOptional<z.ZodString>; policyRef: z.ZodOptional<z.ZodString>; providerRevision: z.ZodOptional<z.ZodString>; activityDescriptorRef: z.ZodOptional<z.ZodString>; activityDescriptorHash: z.ZodOptional<z.ZodString>; reason: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { kind: "tool" | "memory" | "execution" | "policy" | "skill" | "prompt" | "mcp"; requestedAt: string; taskId: string; subjectHash: string; subjectRef: string; requestedBy: string; allowedDecisionScopes: string[]; metadata?: Record<string, unknown> | undefined; policyRef?: string | undefined; expiresAt?: string | undefined; reason?: string | undefined; activityDescriptorRef?: string | undefined; activityDescriptorHash?: string | undefined; providerRevision?: string | undefined; checkpointRef?: string | undefined; }, { kind: "tool" | "memory" | "execution" | "policy" | "skill" | "prompt" | "mcp"; requestedAt: string; taskId: string; subjectHash: string; subjectRef: string; requestedBy: string; allowedDecisionScopes: string[]; metadata?: Record<string, unknown> | undefined; policyRef?: string | undefined; expiresAt?: string | undefined; reason?: string | undefined; activityDescriptorRef?: string | undefined; activityDescriptorHash?: string | undefined; providerRevision?: string | undefined; checkpointRef?: string | undefined; }>, { kind: "tool" | "memory" | "execution" | "policy" | "skill" | "prompt" | "mcp"; requestedAt: string; taskId: string; subjectHash: string; subjectRef: string; requestedBy: string; allowedDecisionScopes: string[]; metadata?: Record<string, unknown> | undefined; policyRef?: string | undefined; expiresAt?: string | undefined; reason?: string | undefined; activityDescriptorRef?: string | undefined; activityDescriptorHash?: string | undefined; providerRevision?: string | undefined; checkpointRef?: string | undefined; }, { kind: "tool" | "memory" | "execution" | "policy" | "skill" | "prompt" | "mcp"; requestedAt: string; taskId: string; subjectHash: string; subjectRef: string; requestedBy: string; allowedDecisionScopes: string[]; metadata?: Record<string, unknown> | undefined; policyRef?: string | undefined; expiresAt?: string | undefined; reason?: string | undefined; activityDescriptorRef?: string | undefined; activityDescriptorHash?: string | undefined; providerRevision?: string | undefined; checkpointRef?: string | undefined; }>;
```

## `runtimeHumanTaskSchema`

Runtime Human Task 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeHumanTaskSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeHumanTaskSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeHumanTaskSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `validateRuntimeHumanTask`

Validate Runtime Human Task 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeHumanTask } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### 声明

```text
export declare function validateRuntimeHumanTask(input: unknown): RuntimeHumanTask;
```

### 调用签名

```text
validateRuntimeHumanTask(input: unknown): RuntimeHumanTask
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeHumanTask`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeHumanTaskDecisionCommand`

Validate Runtime Human Task Decision Command 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeHumanTaskDecisionCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### 声明

```text
export declare function validateRuntimeHumanTaskDecisionCommand(input: unknown): RuntimeHumanTaskDecisionCommand;
```

### 调用签名

```text
validateRuntimeHumanTaskDecisionCommand(input: unknown): RuntimeHumanTaskDecisionCommand
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeHumanTaskDecisionCommand`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeHumanTaskRequest`

Validate Runtime Human Task Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeHumanTaskRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### 声明

```text
export declare function validateRuntimeHumanTaskRequest(input: unknown): RuntimeHumanTaskRequest;
```

### 调用签名

```text
validateRuntimeHumanTaskRequest(input: unknown): RuntimeHumanTaskRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeHumanTaskRequest`
- 说明: 返回值契约由上述类型定义。
