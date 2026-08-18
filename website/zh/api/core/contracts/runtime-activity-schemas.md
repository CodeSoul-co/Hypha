# `@codesoul-co/hypha-core` / `contracts/runtime-activity-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-activity-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)
- 导出数: **17**

## 模块用法

用于声明并运行时校验契约。Runtime activity schemas 模块公开 13 常量、4 函数。

### 从包入口导入

```ts
import {
  runtimeActivityContractDefinitions,
  runtimeActivityContractJsonSchemas,
  runtimeActivityDescriptorDefinition,
  runtimeActivityDescriptorExample,
  runtimeActivityDescriptorJsonSchema,
  runtimeActivityDescriptorSchema,
  runtimeActivityInvocationSchema,
  runtimeActivityObservationJsonSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 13 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { runtimeActivityDescriptorSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeActivityDescriptorSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeActivityContractDefinitions` | 常量 | <code>const runtimeActivityContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeActivityRequest&lt;RuntimeJsonValue&gt;&gt;, SpecSchemaDefinition&lt;RuntimeActivityDescriptor&gt;]</code> | 由 `contracts/runtime-activity-schemas` 模块导出的 Runtime Activity Contract Definitions 常量。 |
| `runtimeActivityContractJsonSchemas` | 常量 | <code>const runtimeActivityContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-activity-schemas` 模块导出的 Runtime Activity Contract JSON Schemas 常量。 |
| `runtimeActivityDescriptorDefinition` | 常量 | <code>const runtimeActivityDescriptorDefinition: SpecSchemaDefinition&lt;RuntimeActivityDescriptor&gt;</code> | 由 `contracts/runtime-activity-schemas` 模块导出的 Runtime Activity Descriptor Definition 常量。 |
| `runtimeActivityDescriptorExample` | 常量 | <code>const runtimeActivityDescriptorExample: RuntimeActivityDescriptor</code> | Runtime Activity Descriptor 的有效示例值。 |
| `runtimeActivityDescriptorJsonSchema` | 常量 | <code>const runtimeActivityDescriptorJsonSchema: JsonSchema</code> | Runtime Activity Descriptor 的 JSON Schema。 |
| `runtimeActivityDescriptorSchema` | 常量 | <code>const runtimeActivityDescriptorSchema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; activityId: z.ZodString; activityKind: z.ZodEnum&lt;["react_quantum", "tool", "memory", "execution", "mcp", "policy"]&gt;; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; operationId: z.ZodString; inputRef: z.ZodString; inputHash: z.ZodString; providerRef: z.ZodOptional&lt;z.ZodString&gt;; providerRevision: z.ZodOptional&lt;...</code> | Runtime Activity Descriptor 的运行时 Schema。 |
| `runtimeActivityInvocationSchema` | 常量 | <code>const runtimeActivityInvocationSchema: z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; activityType: z.ZodEnum&lt;["tool", "memory", "model", "execution", "custom"]&gt;; target: z.ZodString; input: z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; ru...</code> | Runtime Activity Invocation 的运行时 Schema。 |
| `runtimeActivityObservationJsonSchema` | 常量 | <code>const runtimeActivityObservationJsonSchema: JsonSchema</code> | Runtime Activity Observation 的 JSON Schema。 |
| `runtimeActivityObservationSchema` | 常量 | <code>const runtimeActivityObservationSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; status: z.ZodEnum&lt;["completed", "failed", "waiting", "cancelled"]&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; output: z.ZodOptional&lt;z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;&gt;; artifactRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; retryable: z.ZodOptional&lt;z.ZodBoolean&gt;; error: z.ZodOptional&lt;z.ZodOb...</code> | Runtime Activity Observation 的运行时 Schema。 |
| `runtimeActivityRequestDefinition` | 常量 | <code>const runtimeActivityRequestDefinition: SpecSchemaDefinition&lt;RuntimeActivityRequest&lt;RuntimeJsonValue&gt;&gt;</code> | 由 `contracts/runtime-activity-schemas` 模块导出的 Runtime Activity Request Definition 常量。 |
| `runtimeActivityRequestExample` | 常量 | <code>const runtimeActivityRequestExample: RuntimeActivityRequest&lt;RuntimeJsonValue&gt;</code> | Runtime Activity Request 的有效示例值。 |
| `runtimeActivityRequestJsonSchema` | 常量 | <code>const runtimeActivityRequestJsonSchema: JsonSchema</code> | Runtime Activity Request 的 JSON Schema。 |
| `runtimeActivityRequestSchema` | 常量 | <code>const runtimeActivityRequestSchema: z.ZodObject&lt;{ target: z.ZodString; input: z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;; options: z.ZodOptional&lt;z.ZodObject&lt;{ effect: z.ZodOptional&lt;z.ZodEnum&lt;["pure", "idempotent", "external_effect", "irreversible"]&gt;&gt;; timeoutMs: z.ZodOptional&lt;z.ZodNumber&gt;; retry: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodObject&lt;{ maxAttempts: z.ZodNumber; initialDelayMs: z.ZodOptional&lt;z.Zod...</code> | Runtime Activity Request 的运行时 Schema。 |
| `validateRuntimeActivityDescriptor` | 函数 | <code>validateRuntimeActivityDescriptor(input: unknown): RuntimeActivityDescriptor</code> | Validate Runtime Activity Descriptor 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeActivityInvocation` | 函数 | <code>validateRuntimeActivityInvocation(input: unknown): RuntimeActivityInvocation</code> | Validate Runtime Activity Invocation 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeActivityObservation` | 函数 | <code>validateRuntimeActivityObservation(input: unknown): RuntimeActivityObservation</code> | Validate Runtime Activity Observation 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeActivityRequest` | 函数 | <code>validateRuntimeActivityRequest(input: unknown): RuntimeActivityRequest</code> | Validate Runtime Activity Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `runtimeActivityContractDefinitions`

由 `contracts/runtime-activity-schemas` 模块导出的 Runtime Activity Contract Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeActivityContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare const runtimeActivityContractDefinitions: readonly [SpecSchemaDefinition<RuntimeActivityRequest<RuntimeJsonValue>>, SpecSchemaDefinition<RuntimeActivityDescriptor>];
```

## `runtimeActivityContractJsonSchemas`

由 `contracts/runtime-activity-schemas` 模块导出的 Runtime Activity Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { runtimeActivityContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare const runtimeActivityContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeActivityDescriptorDefinition`

由 `contracts/runtime-activity-schemas` 模块导出的 Runtime Activity Descriptor Definition 常量。

- 种类: 常量
- 导入: `import { runtimeActivityDescriptorDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare const runtimeActivityDescriptorDefinition: SpecSchemaDefinition<RuntimeActivityDescriptor>;
```

## `runtimeActivityDescriptorExample`

Runtime Activity Descriptor 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeActivityDescriptorExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare const runtimeActivityDescriptorExample: RuntimeActivityDescriptor;
```

## `runtimeActivityDescriptorJsonSchema`

Runtime Activity Descriptor 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeActivityDescriptorJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare const runtimeActivityDescriptorJsonSchema: JsonSchema;
```

## `runtimeActivityDescriptorSchema`

Runtime Activity Descriptor 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeActivityDescriptorSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare const runtimeActivityDescriptorSchema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; activityId: z.ZodString; activityKind: z.ZodEnum<["react_quantum", "tool", "memory", "execution", "mcp", "policy"]>; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; operationId: z.ZodString; inputRef: z.ZodString; inputHash: z.ZodString; providerRef: z.ZodOptional<z.ZodString>; providerRevision: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodString; deadlineAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; version: "1.0.0"; runId: string; idempotencyKey: string; stateAttempt: number; stateId: string; activityId: string; activityKind: "tool" | "memory" | "execution" | "policy" | "mcp" | "react_quantum"; inputRef: string; inputHash: string; providerRevision?: string | undefined; providerRef?: string | undefined; deadlineAt?: string | undefined; }, { operationId: string; version: "1.0.0"; runId: string; idempotencyKey: string; stateAttempt: number; stateId: string; activityId: string; activityKind: "tool" | "memory" | "execution" | "policy" | "mcp" | "react_quantum"; inputRef: string; inputHash: string; providerRevision?: string | undefined; providerRef?: string | undefined; deadlineAt?: string | undefined; }>;
```

## `runtimeActivityInvocationSchema`

Runtime Activity Invocation 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeActivityInvocationSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare const runtimeActivityInvocationSchema: z.ZodObject<{ activityId: z.ZodString; operationId: z.ZodString; activityType: z.ZodEnum<["tool", "memory", "model", "execution", "custom"]>; target: z.ZodString; input: z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>; scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; stateId: z.ZodString; stateAttempt: z.ZodNumber; fencingToken: z.ZodNumber; correlationId: z.ZodString; causationId: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodString; requestedAt: z.ZodString; effect: z.ZodEnum<["pure", "idempotent", "external_effect", "irreversible"]>; timeoutMs: z.ZodOptional<z.ZodNumber>; retry: z.ZodOptional<z.ZodEffects<z.ZodObject<{ maxAttempts: z.ZodNumber; initialDelayMs: z.ZodOptional<z.ZodNumber>; maxDelayMs: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }>, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }>>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>>>; }, "strict", z.ZodTypeAny, { operationId: string; effect: "pure" | "idempotent" | "external_effect" | "irreversible"; correlationId: string; idempotencyKey: string; scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; stateAttempt: number; stateId: string; requestedAt: string; fencingToken: number; activityId: string; activityType: "custom" | "tool" | "memory" | "model" | "execution"; input: RuntimeJsonValue; target: string; metadata?: Record<string, RuntimeJsonValue> | undefined; causationId?: string | undefined; timeoutMs?: number | undefined; retry?: { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; } | undefined; }, { operationId: string; effect: "pure" | "idempotent" | "external_effect" | "irreversible"; correlationId: string; idempotencyKey: string; scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; stateAttempt: number; stateId: string; requestedAt: string; fencingToken: number; activityId: string; activityType: "custom" | "tool" | "memory" | "model" | "execution"; input: RuntimeJsonValue; target: string; metadata?: Record<string, RuntimeJsonValue> | undefined; causationId?: string | undefined; timeoutMs?: number | undefined; retry?: { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; } | undefined; }>;
```

## `runtimeActivityObservationJsonSchema`

Runtime Activity Observation 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeActivityObservationJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare const runtimeActivityObservationJsonSchema: JsonSchema;
```

## `runtimeActivityObservationSchema`

Runtime Activity Observation 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeActivityObservationSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeActivityObservationSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeActivityObservationSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeActivityRequestDefinition`

由 `contracts/runtime-activity-schemas` 模块导出的 Runtime Activity Request Definition 常量。

- 种类: 常量
- 导入: `import { runtimeActivityRequestDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare const runtimeActivityRequestDefinition: SpecSchemaDefinition<RuntimeActivityRequest<RuntimeJsonValue>>;
```

## `runtimeActivityRequestExample`

Runtime Activity Request 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeActivityRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare const runtimeActivityRequestExample: RuntimeActivityRequest<RuntimeJsonValue>;
```

## `runtimeActivityRequestJsonSchema`

Runtime Activity Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeActivityRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare const runtimeActivityRequestJsonSchema: JsonSchema;
```

## `runtimeActivityRequestSchema`

Runtime Activity Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeActivityRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare const runtimeActivityRequestSchema: z.ZodObject<{ target: z.ZodString; input: z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>; options: z.ZodOptional<z.ZodObject<{ effect: z.ZodOptional<z.ZodEnum<["pure", "idempotent", "external_effect", "irreversible"]>>; timeoutMs: z.ZodOptional<z.ZodNumber>; retry: z.ZodOptional<z.ZodEffects<z.ZodObject<{ maxAttempts: z.ZodNumber; initialDelayMs: z.ZodOptional<z.ZodNumber>; maxDelayMs: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }>, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }>>; idempotencyKey: z.ZodOptional<z.ZodString>; causationId: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>>>; }, "strict", z.ZodTypeAny, { metadata?: Record<string, RuntimeJsonValue> | undefined; effect?: "pure" | "idempotent" | "external_effect" | "irreversible" | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; timeoutMs?: number | undefined; retry?: { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; } | undefined; }, { metadata?: Record<string, RuntimeJsonValue> | undefined; effect?: "pure" | "idempotent" | "external_effect" | "irreversible" | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; timeoutMs?: number | undefined; retry?: { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; } | undefined; }>>; }, "strict", z.ZodTypeAny, { input: RuntimeJsonValue; target: string; options?: { metadata?: Record<string, RuntimeJsonValue> | undefined; effect?: "pure" | "idempotent" | "external_effect" | "irreversible" | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; timeoutMs?: number | undefined; retry?: { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; } | undefined; } | undefined; }, { input: RuntimeJsonValue; target: string; options?: { metadata?: Record<string, RuntimeJsonValue> | undefined; effect?: "pure" | "idempotent" | "external_effect" | "irreversible" | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; timeoutMs?: number | undefined; retry?: { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; } | undefined; } | undefined; }>;
```

## `validateRuntimeActivityDescriptor`

Validate Runtime Activity Descriptor 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeActivityDescriptor } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare function validateRuntimeActivityDescriptor(input: unknown): RuntimeActivityDescriptor;
```

### 调用签名

```text
validateRuntimeActivityDescriptor(input: unknown): RuntimeActivityDescriptor
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeActivityDescriptor`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeActivityInvocation`

Validate Runtime Activity Invocation 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeActivityInvocation } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare function validateRuntimeActivityInvocation(input: unknown): RuntimeActivityInvocation;
```

### 调用签名

```text
validateRuntimeActivityInvocation(input: unknown): RuntimeActivityInvocation
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeActivityInvocation<RuntimeJsonValue>`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeActivityObservation`

Validate Runtime Activity Observation 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeActivityObservation } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare function validateRuntimeActivityObservation(input: unknown): RuntimeActivityObservation;
```

### 调用签名

```text
validateRuntimeActivityObservation(input: unknown): RuntimeActivityObservation
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeActivityObservation<RuntimeJsonValue>`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeActivityRequest`

Validate Runtime Activity Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeActivityRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### 声明

```text
export declare function validateRuntimeActivityRequest(input: unknown): RuntimeActivityRequest;
```

### 调用签名

```text
validateRuntimeActivityRequest(input: unknown): RuntimeActivityRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeActivityRequest<RuntimeJsonValue>`
- 说明: 返回值契约由上述类型定义。
