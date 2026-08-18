# `@codesoul-co/hypha-core` / `contracts/runtime-helper-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-helper-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)
- 导出数: **30**

## 模块用法

用于声明并运行时校验契约。Runtime helper schemas 模块公开 24 常量、6 函数。

### 从包入口导入

```ts
import {
  runtimeDeterminismScopeSchema,
  runtimeDeterministicObservationDefinition,
  runtimeDeterministicObservationExample,
  runtimeDeterministicObservationJsonSchema,
  runtimeDeterministicObservationSchema,
  runtimeHelperContractDefinitions,
  runtimeHelperContractJsonSchemas,
  runtimeHelperExecutionScopeSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 6 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 24 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { runtimeDeterminismScopeSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeDeterminismScopeSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeDeterminismScopeSchema` | 常量 | <code>const runtimeDeterminismScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }, { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }&gt;</code> | Runtime Determinism Scope 的运行时 Schema。 |
| `runtimeDeterministicObservationDefinition` | 常量 | <code>const runtimeDeterministicObservationDefinition: SpecSchemaDefinition&lt;RuntimeDeterministicObservation&lt;RuntimeJsonValue&gt;&gt;</code> | 由 `contracts/runtime-helper-schemas` 模块导出的 Runtime Deterministic Observation Definition 常量。 |
| `runtimeDeterministicObservationExample` | 常量 | <code>const runtimeDeterministicObservationExample: RuntimeDeterministicObservation&lt;RuntimeJsonValue&gt;</code> | Runtime Deterministic Observation 的有效示例值。 |
| `runtimeDeterministicObservationJsonSchema` | 常量 | <code>const runtimeDeterministicObservationJsonSchema: JsonSchema</code> | Runtime Deterministic Observation 的 JSON Schema。 |
| `runtimeDeterministicObservationSchema` | 常量 | <code>const runtimeDeterministicObservationSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }, { runId: string; userId: string; stateAttempt: number; stateId: string; tena...</code> | Runtime Deterministic Observation 的运行时 Schema。 |
| `runtimeHelperContractDefinitions` | 常量 | <code>const runtimeHelperContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeTransitionProposal&gt;, SpecSchemaDefinition&lt;RuntimeWaitIntent&gt;, SpecSchemaDefinition&lt;RuntimeStateExecutionResult&gt;, SpecSchemaDefinition&lt;RuntimeDeterministicObservation&lt;RuntimeJsonValue&gt;&gt;, SpecSchemaDefinition&lt;RuntimeObservationEventInput&lt;RuntimeJsonValue&gt;&gt;]</code> | 由 `contracts/runtime-helper-schemas` 模块导出的 Runtime Helper Contract Definitions 常量。 |
| `runtimeHelperContractJsonSchemas` | 常量 | <code>const runtimeHelperContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-helper-schemas` 模块导出的 Runtime Helper Contract JSON Schemas 常量。 |
| `runtimeHelperExecutionScopeSchema` | 常量 | <code>const runtimeHelperExecutionScopeSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string...</code> | Runtime Helper Execution Scope 的运行时 Schema。 |
| `runtimeObservationEventInputDefinition` | 常量 | <code>const runtimeObservationEventInputDefinition: SpecSchemaDefinition&lt;RuntimeObservationEventInput&lt;RuntimeJsonValue&gt;&gt;</code> | 由 `contracts/runtime-helper-schemas` 模块导出的 Runtime Observation Event Input Definition 常量。 |
| `runtimeObservationEventInputExample` | 常量 | <code>const runtimeObservationEventInputExample: RuntimeObservationEventInput&lt;RuntimeJsonValue&gt;</code> | Runtime Observation Event Input 的有效示例值。 |
| `runtimeObservationEventInputJsonSchema` | 常量 | <code>const runtimeObservationEventInputJsonSchema: JsonSchema</code> | Runtime Observation Event Input 的 JSON Schema。 |
| `runtimeObservationEventInputSchema` | 常量 | <code>const runtimeObservationEventInputSchema: z.ZodObject&lt;{ type: z.ZodType&lt;`runtime.observation.${string}`, z.ZodTypeDef, `runtime.observation.${string}`&gt;; payload: z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;; options: z.ZodOptional&lt;z.ZodObject&lt;{ idempotencyKey: z.ZodOptional&lt;z.ZodString&gt;; causationId: z.ZodOptional&lt;z.ZodString&gt;; parentEventId: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.Zod...</code> | Runtime Observation Event Input 的运行时 Schema。 |
| `runtimeStateExecutionResultDefinition` | 常量 | <code>const runtimeStateExecutionResultDefinition: SpecSchemaDefinition&lt;RuntimeStateExecutionResult&gt;</code> | 由 `contracts/runtime-helper-schemas` 模块导出的 Runtime State Execution Result Definition 常量。 |
| `runtimeStateExecutionResultExample` | 常量 | <code>const runtimeStateExecutionResultExample: RuntimeStateExecutionResult</code> | Runtime State Execution Result 的有效示例值。 |
| `runtimeStateExecutionResultJsonSchema` | 常量 | <code>const runtimeStateExecutionResultJsonSchema: JsonSchema</code> | Runtime State Execution Result 的 JSON Schema。 |
| `runtimeStateExecutionResultSchema` | 常量 | <code>const runtimeStateExecutionResultSchema: z.ZodDiscriminatedUnion&lt;"kind", [z.ZodObject&lt;{ kind: z.ZodLiteral&lt;"completed"&gt;; output: z.ZodOptional&lt;z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;&gt;; variablesPatch: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;&gt;&gt;; }, "strict", z.ZodTypeAny, { kind: "completed"; variablesPatch?: Record&lt;string, RuntimeJsonVal...</code> | Runtime State Execution Result 的运行时 Schema。 |
| `runtimeTransitionProposalDefinition` | 常量 | <code>const runtimeTransitionProposalDefinition: SpecSchemaDefinition&lt;RuntimeTransitionProposal&gt;</code> | 由 `contracts/runtime-helper-schemas` 模块导出的 Runtime Transition Proposal Definition 常量。 |
| `runtimeTransitionProposalExample` | 常量 | <code>const runtimeTransitionProposalExample: RuntimeTransitionProposal</code> | Runtime Transition Proposal 的有效示例值。 |
| `runtimeTransitionProposalJsonSchema` | 常量 | <code>const runtimeTransitionProposalJsonSchema: JsonSchema</code> | Runtime Transition Proposal 的 JSON Schema。 |
| `runtimeTransitionProposalSchema` | 常量 | <code>const runtimeTransitionProposalSchema: z.ZodObject&lt;{ to: z.ZodString; reason: z.ZodOptional&lt;z.ZodString&gt;; variablesPatch: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;&gt;&gt;; }, "strict", z.ZodTypeAny, { to: string; reason?: string &#124; undefined; variablesPatch?: Record&lt;string, RuntimeJsonValue&gt; &#124; undefined; }, { to: string; reason?: string &#124; undefined; variablesPatch...</code> | Runtime Transition Proposal 的运行时 Schema。 |
| `runtimeWaitIntentDefinition` | 常量 | <code>const runtimeWaitIntentDefinition: SpecSchemaDefinition&lt;RuntimeWaitIntent&gt;</code> | 由 `contracts/runtime-helper-schemas` 模块导出的 Runtime Wait Intent Definition 常量。 |
| `runtimeWaitIntentExample` | 常量 | <code>const runtimeWaitIntentExample: RuntimeWaitIntent</code> | Runtime Wait Intent 的有效示例值。 |
| `runtimeWaitIntentJsonSchema` | 常量 | <code>const runtimeWaitIntentJsonSchema: JsonSchema</code> | Runtime Wait Intent 的 JSON Schema。 |
| `runtimeWaitIntentSchema` | 常量 | <code>const runtimeWaitIntentSchema: z.ZodEffects&lt;z.ZodObject&lt;{ type: z.ZodEnum&lt;["human", "signal", "timer", "pause"]&gt;; key: z.ZodOptional&lt;z.ZodString&gt;; expectedSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; timeoutTransitionId: z.ZodOptional&lt;z.ZodString&gt;; pendingActionRef: z.ZodOptional&lt;z.ZodString&gt;; reason: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptio...</code> | Runtime Wait Intent 的运行时 Schema。 |
| `validateRuntimeDeterministicObservation` | 函数 | <code>validateRuntimeDeterministicObservation(input: unknown): RuntimeDeterministicObservation</code> | Validate Runtime Deterministic Observation 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeHelperExecutionScope` | 函数 | <code>validateRuntimeHelperExecutionScope(input: unknown): RuntimeHelperExecutionScope</code> | Validate Runtime Helper Execution Scope 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeObservationEventInput` | 函数 | <code>validateRuntimeObservationEventInput(input: unknown): RuntimeObservationEventInput</code> | Validate Runtime Observation Event Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeStateExecutionResult` | 函数 | <code>validateRuntimeStateExecutionResult(input: unknown): RuntimeStateExecutionResult</code> | Validate Runtime State Execution Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeTransitionProposal` | 函数 | <code>validateRuntimeTransitionProposal(input: unknown): RuntimeTransitionProposal</code> | Validate Runtime Transition Proposal 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeWaitIntent` | 函数 | <code>validateRuntimeWaitIntent(input: unknown): RuntimeWaitIntent</code> | Validate Runtime Wait Intent 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `runtimeDeterminismScopeSchema`

Runtime Determinism Scope 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeDeterminismScopeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeDeterminismScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }, { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }>;
```

## `runtimeDeterministicObservationDefinition`

由 `contracts/runtime-helper-schemas` 模块导出的 Runtime Deterministic Observation Definition 常量。

- 种类: 常量
- 导入: `import { runtimeDeterministicObservationDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeDeterministicObservationDefinition: SpecSchemaDefinition<RuntimeDeterministicObservation<RuntimeJsonValue>>;
```

## `runtimeDeterministicObservationExample`

Runtime Deterministic Observation 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeDeterministicObservationExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeDeterministicObservationExample: RuntimeDeterministicObservation<RuntimeJsonValue>;
```

## `runtimeDeterministicObservationJsonSchema`

Runtime Deterministic Observation 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeDeterministicObservationJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeDeterministicObservationJsonSchema: JsonSchema;
```

## `runtimeDeterministicObservationSchema`

Runtime Deterministic Observation 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeDeterministicObservationSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeDeterministicObservationSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }, { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }>; key: z.ZodString; kind: z.ZodEnum<["clock", "id"]>; value: z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>; }, "strict", z.ZodTypeAny, { value: RuntimeJsonValue; scope: { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; key: string; kind: "id" | "clock"; }, { value: RuntimeJsonValue; scope: { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; key: string; kind: "id" | "clock"; }>;
```

## `runtimeHelperContractDefinitions`

由 `contracts/runtime-helper-schemas` 模块导出的 Runtime Helper Contract Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeHelperContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeHelperContractDefinitions: readonly [SpecSchemaDefinition<RuntimeTransitionProposal>, SpecSchemaDefinition<RuntimeWaitIntent>, SpecSchemaDefinition<RuntimeStateExecutionResult>, SpecSchemaDefinition<RuntimeDeterministicObservation<RuntimeJsonValue>>, SpecSchemaDefinition<RuntimeObservationEventInput<RuntimeJsonValue>>];
```

## `runtimeHelperContractJsonSchemas`

由 `contracts/runtime-helper-schemas` 模块导出的 Runtime Helper Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { runtimeHelperContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeHelperContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeHelperExecutionScopeSchema`

Runtime Helper Execution Scope 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeHelperExecutionScopeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeHelperExecutionScopeSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; stateId: z.ZodString; stateAttempt: z.ZodNumber; fencingToken: z.ZodNumber; correlationId: z.ZodString; causationId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { correlationId: string; scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; stateAttempt: number; stateId: string; fencingToken: number; causationId?: string | undefined; }, { correlationId: string; scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; stateAttempt: number; stateId: string; fencingToken: number; causationId?: string | undefined; }>;
```

## `runtimeObservationEventInputDefinition`

由 `contracts/runtime-helper-schemas` 模块导出的 Runtime Observation Event Input Definition 常量。

- 种类: 常量
- 导入: `import { runtimeObservationEventInputDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeObservationEventInputDefinition: SpecSchemaDefinition<RuntimeObservationEventInput<RuntimeJsonValue>>;
```

## `runtimeObservationEventInputExample`

Runtime Observation Event Input 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeObservationEventInputExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeObservationEventInputExample: RuntimeObservationEventInput<RuntimeJsonValue>;
```

## `runtimeObservationEventInputJsonSchema`

Runtime Observation Event Input 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeObservationEventInputJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeObservationEventInputJsonSchema: JsonSchema;
```

## `runtimeObservationEventInputSchema`

Runtime Observation Event Input 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeObservationEventInputSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeObservationEventInputSchema: z.ZodObject<{ type: z.ZodType<`runtime.observation.${string}`, z.ZodTypeDef, `runtime.observation.${string}`>; payload: z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>; options: z.ZodOptional<z.ZodObject<{ idempotencyKey: z.ZodOptional<z.ZodString>; causationId: z.ZodOptional<z.ZodString>; parentEventId: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>>>; }, "strict", z.ZodTypeAny, { metadata?: Record<string, RuntimeJsonValue> | undefined; causationId?: string | undefined; parentEventId?: string | undefined; idempotencyKey?: string | undefined; }, { metadata?: Record<string, RuntimeJsonValue> | undefined; causationId?: string | undefined; parentEventId?: string | undefined; idempotencyKey?: string | undefined; }>>; }, "strict", z.ZodTypeAny, { type: `runtime.observation.${string}`; payload: RuntimeJsonValue; options?: { metadata?: Record<string, RuntimeJsonValue> | undefined; causationId?: string | undefined; parentEventId?: string | undefined; idempotencyKey?: string | undefined; } | undefined; }, { type: `runtime.observation.${string}`; payload: RuntimeJsonValue; options?: { metadata?: Record<string, RuntimeJsonValue> | undefined; causationId?: string | undefined; parentEventId?: string | undefined; idempotencyKey?: string | undefined; } | undefined; }>;
```

## `runtimeStateExecutionResultDefinition`

由 `contracts/runtime-helper-schemas` 模块导出的 Runtime State Execution Result Definition 常量。

- 种类: 常量
- 导入: `import { runtimeStateExecutionResultDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeStateExecutionResultDefinition: SpecSchemaDefinition<RuntimeStateExecutionResult>;
```

## `runtimeStateExecutionResultExample`

Runtime State Execution Result 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeStateExecutionResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeStateExecutionResultExample: RuntimeStateExecutionResult;
```

## `runtimeStateExecutionResultJsonSchema`

Runtime State Execution Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeStateExecutionResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeStateExecutionResultJsonSchema: JsonSchema;
```

## `runtimeStateExecutionResultSchema`

Runtime State Execution Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeStateExecutionResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeStateExecutionResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeStateExecutionResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeTransitionProposalDefinition`

由 `contracts/runtime-helper-schemas` 模块导出的 Runtime Transition Proposal Definition 常量。

- 种类: 常量
- 导入: `import { runtimeTransitionProposalDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeTransitionProposalDefinition: SpecSchemaDefinition<RuntimeTransitionProposal>;
```

## `runtimeTransitionProposalExample`

Runtime Transition Proposal 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeTransitionProposalExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeTransitionProposalExample: RuntimeTransitionProposal;
```

## `runtimeTransitionProposalJsonSchema`

Runtime Transition Proposal 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeTransitionProposalJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeTransitionProposalJsonSchema: JsonSchema;
```

## `runtimeTransitionProposalSchema`

Runtime Transition Proposal 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeTransitionProposalSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeTransitionProposalSchema: z.ZodObject<{ to: z.ZodString; reason: z.ZodOptional<z.ZodString>; variablesPatch: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>>>; }, "strict", z.ZodTypeAny, { to: string; reason?: string | undefined; variablesPatch?: Record<string, RuntimeJsonValue> | undefined; }, { to: string; reason?: string | undefined; variablesPatch?: Record<string, RuntimeJsonValue> | undefined; }>;
```

## `runtimeWaitIntentDefinition`

由 `contracts/runtime-helper-schemas` 模块导出的 Runtime Wait Intent Definition 常量。

- 种类: 常量
- 导入: `import { runtimeWaitIntentDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeWaitIntentDefinition: SpecSchemaDefinition<RuntimeWaitIntent>;
```

## `runtimeWaitIntentExample`

Runtime Wait Intent 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeWaitIntentExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeWaitIntentExample: RuntimeWaitIntent;
```

## `runtimeWaitIntentJsonSchema`

Runtime Wait Intent 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeWaitIntentJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeWaitIntentJsonSchema: JsonSchema;
```

## `runtimeWaitIntentSchema`

Runtime Wait Intent 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeWaitIntentSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare const runtimeWaitIntentSchema: z.ZodEffects<z.ZodObject<{ type: z.ZodEnum<["human", "signal", "timer", "pause"]>; key: z.ZodOptional<z.ZodString>; expectedSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; expiresAt: z.ZodOptional<z.ZodString>; timeoutTransitionId: z.ZodOptional<z.ZodString>; pendingActionRef: z.ZodOptional<z.ZodString>; reason: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>>>; }, "strict", z.ZodTypeAny, { type: "signal" | "human" | "timer" | "pause"; reason?: string | undefined; metadata?: Record<string, RuntimeJsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }, { type: "signal" | "human" | "timer" | "pause"; reason?: string | undefined; metadata?: Record<string, RuntimeJsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }>, { type: "signal" | "human" | "timer" | "pause"; reason?: string | undefined; metadata?: Record<string, RuntimeJsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }, { type: "signal" | "human" | "timer" | "pause"; reason?: string | undefined; metadata?: Record<string, RuntimeJsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }>;
```

## `validateRuntimeDeterministicObservation`

Validate Runtime Deterministic Observation 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeDeterministicObservation } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare function validateRuntimeDeterministicObservation(input: unknown): RuntimeDeterministicObservation;
```

### 调用签名

```text
validateRuntimeDeterministicObservation(input: unknown): RuntimeDeterministicObservation
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeDeterministicObservation<RuntimeJsonValue>`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeHelperExecutionScope`

Validate Runtime Helper Execution Scope 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeHelperExecutionScope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare function validateRuntimeHelperExecutionScope(input: unknown): RuntimeHelperExecutionScope;
```

### 调用签名

```text
validateRuntimeHelperExecutionScope(input: unknown): RuntimeHelperExecutionScope
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeHelperExecutionScope`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeObservationEventInput`

Validate Runtime Observation Event Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeObservationEventInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare function validateRuntimeObservationEventInput(input: unknown): RuntimeObservationEventInput;
```

### 调用签名

```text
validateRuntimeObservationEventInput(input: unknown): RuntimeObservationEventInput
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeObservationEventInput<RuntimeJsonValue>`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeStateExecutionResult`

Validate Runtime State Execution Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeStateExecutionResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare function validateRuntimeStateExecutionResult(input: unknown): RuntimeStateExecutionResult;
```

### 调用签名

```text
validateRuntimeStateExecutionResult(input: unknown): RuntimeStateExecutionResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeStateExecutionResult`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeTransitionProposal`

Validate Runtime Transition Proposal 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeTransitionProposal } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare function validateRuntimeTransitionProposal(input: unknown): RuntimeTransitionProposal;
```

### 调用签名

```text
validateRuntimeTransitionProposal(input: unknown): RuntimeTransitionProposal
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeTransitionProposal`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeWaitIntent`

Validate Runtime Wait Intent 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeWaitIntent } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### 声明

```text
export declare function validateRuntimeWaitIntent(input: unknown): RuntimeWaitIntent;
```

### 调用签名

```text
validateRuntimeWaitIntent(input: unknown): RuntimeWaitIntent
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeWaitIntent`
- 说明: 返回值契约由上述类型定义。
