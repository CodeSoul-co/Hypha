# `@codesoul-co/hypha-core` / `modules/execution-events/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-events/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)
- 导出数: **22**

## 模块用法

用于创建、记录或读取 Event 契约。Index 模块公开 19 常量、3 函数。

### 从包入口导入

```ts
import {
  commandExecutionEventExample,
  commandExecutionEventPayloadJsonSchema,
  commandExecutionEventPayloadSchema,
  commandExecutionFrameworkEventTypes,
  executionEventJsonSchemas,
  executionEventPayloadBaseJsonSchema,
  executionEventPayloadBaseSchema,
  executionFrameworkEventEnvelopeSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 19 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { commandExecutionEventPayloadSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = commandExecutionEventPayloadSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandExecutionEventExample` | 常量 | <code>const commandExecutionEventExample: ExecutionFrameworkEvent&lt;"command.execution.completed"&gt;</code> | Command Execution Event 的有效示例值。 |
| `commandExecutionEventPayloadJsonSchema` | 常量 | <code>const commandExecutionEventPayloadJsonSchema: JsonSchema</code> | Command Execution Event Payload 的 JSON Schema。 |
| `commandExecutionEventPayloadSchema` | 常量 | <code>const commandExecutionEventPayloadSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodOptional&lt;z.ZodString&gt;; sandboxId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; environmentId: z.ZodOptional&lt;z.ZodString&gt;; environmentRevision: z.ZodOptional&lt;z.ZodString&gt;; commandHash: z.ZodOptional&lt;z.ZodString&gt;; sourceTreeHash: z.ZodOptional&lt;z.ZodString&gt;; artifactRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString...</code> | Command Execution Event Payload 的运行时 Schema。 |
| `commandExecutionFrameworkEventTypes` | 常量 | <code>const commandExecutionFrameworkEventTypes: readonly ["command.execution.requested", "command.execution.validated", "command.execution.approval.required", "command.execution.queued", "command.execution.started", "command.execution.output.truncated", "command.execution.resource.exceeded", "command.execution.oom_killed", "command.execution.timeout", "command.execution.cancellation.requested", "command.execution.cance...</code> | 由 `modules/execution-events/index` 模块导出的 Command Execution Framework Event Types 常量。 |
| `executionEventJsonSchemas` | 常量 | <code>const executionEventJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/execution-events/index` 模块导出的 Execution Event JSON Schemas 常量。 |
| `executionEventPayloadBaseJsonSchema` | 常量 | <code>const executionEventPayloadBaseJsonSchema: JsonSchema</code> | Execution Event Payload Base 的 JSON Schema。 |
| `executionEventPayloadBaseSchema` | 常量 | <code>const executionEventPayloadBaseSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodOptional&lt;z.ZodString&gt;; executionId: z.ZodOptional&lt;z.ZodString&gt;; sandboxId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; environmentId: z.ZodOptional&lt;z.ZodString&gt;; environmentRevision: z.ZodOptional&lt;z.ZodString&gt;; commandHash: z.ZodOptional&lt;z.ZodString&gt;; sourceTreeHash: z.ZodOptional&lt;z.ZodString&gt;; artifactRefs...</code> | Execution Event Payload Base 的运行时 Schema。 |
| `executionFrameworkEventEnvelopeSchema` | 常量 | <code>const executionFrameworkEventEnvelopeSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["sandbox.create.requested", "sandbox.created", "sandbox.started", "sandbox.ready", "sandbox.degraded", "sandbox.terminate.requested", "sandbox.terminated", "sandbox.cleanup.completed", "sandbox.cleanup.failed", "command.execution.requested", "command.execution.validated", "command.execution.approval.required",...</code> | Execution Framework Event Envelope 的运行时 Schema。 |
| `executionFrameworkEventJsonSchema` | 常量 | <code>const executionFrameworkEventJsonSchema: JsonSchema</code> | Execution Framework Event 的 JSON Schema。 |
| `executionFrameworkEventTypes` | 常量 | <code>const executionFrameworkEventTypes: readonly ["sandbox.create.requested", "sandbox.created", "sandbox.started", "sandbox.ready", "sandbox.degraded", "sandbox.terminate.requested", "sandbox.terminated", "sandbox.cleanup.completed", "sandbox.cleanup.failed", "command.execution.requested", "command.execution.validated", "command.execution.approval.required", "command.execution.queued", "command.execution.started", "c...</code> | 由 `modules/execution-events/index` 模块导出的 Execution Framework Event Types 常量。 |
| `executionFrameworkEventTypeSchema` | 常量 | <code>const executionFrameworkEventTypeSchema: z.ZodEnum&lt;["sandbox.create.requested", "sandbox.created", "sandbox.started", "sandbox.ready", "sandbox.degraded", "sandbox.terminate.requested", "sandbox.terminated", "sandbox.cleanup.completed", "sandbox.cleanup.failed", "command.execution.requested", "command.execution.validated", "command.execution.approval.required", "command.execution.queued", "command.execution.starte...</code> | Execution Framework Event Type 的运行时 Schema。 |
| `networkAuthorizationEventExample` | 常量 | <code>const networkAuthorizationEventExample: ExecutionFrameworkEvent&lt;"network.authorization.granted"&gt;</code> | Network Authorization Event 的有效示例值。 |
| `networkAuthorizationEventPayloadJsonSchema` | 常量 | <code>const networkAuthorizationEventPayloadJsonSchema: JsonSchema</code> | Network Authorization Event Payload 的 JSON Schema。 |
| `networkAuthorizationEventPayloadSchema` | 常量 | <code>const networkAuthorizationEventPayloadSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodOptional&lt;z.ZodString&gt;; executionId: z.ZodOptional&lt;z.ZodString&gt;; sandboxId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; environmentId: z.ZodOptional&lt;z.ZodString&gt;; environmentRevision: z.ZodOptional&lt;z.ZodString&gt;; commandHash: z.ZodOptional&lt;z.ZodString&gt;; sourceTreeHash: z.ZodOptional&lt;z.ZodString&gt;; artif...</code> | Network Authorization Event Payload 的运行时 Schema。 |
| `networkAuthorizationFrameworkEventTypes` | 常量 | <code>const networkAuthorizationFrameworkEventTypes: readonly ["network.authorization.requested", "network.authorization.granted", "network.authorization.denied", "network.authorization.revoked"]</code> | 由 `modules/execution-events/index` 模块导出的 Network Authorization Framework Event Types 常量。 |
| `sandboxFrameworkEventTypes` | 常量 | <code>const sandboxFrameworkEventTypes: readonly ["sandbox.create.requested", "sandbox.created", "sandbox.started", "sandbox.ready", "sandbox.degraded", "sandbox.terminate.requested", "sandbox.terminated", "sandbox.cleanup.completed", "sandbox.cleanup.failed"]</code> | 由 `modules/execution-events/index` 模块导出的 Sandbox Framework Event Types 常量。 |
| `sandboxLifecycleEventExample` | 常量 | <code>const sandboxLifecycleEventExample: ExecutionFrameworkEvent&lt;"sandbox.ready"&gt;</code> | Sandbox Lifecycle Event 的有效示例值。 |
| `sandboxLifecycleEventPayloadJsonSchema` | 常量 | <code>const sandboxLifecycleEventPayloadJsonSchema: JsonSchema</code> | Sandbox Lifecycle Event Payload 的 JSON Schema。 |
| `sandboxLifecycleEventPayloadSchema` | 常量 | <code>const sandboxLifecycleEventPayloadSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodOptional&lt;z.ZodString&gt;; executionId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; environmentId: z.ZodOptional&lt;z.ZodString&gt;; environmentRevision: z.ZodOptional&lt;z.ZodString&gt;; commandHash: z.ZodOptional&lt;z.ZodString&gt;; sourceTreeHash: z.ZodOptional&lt;z.ZodString&gt;; artifactRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodStri...</code> | Sandbox Lifecycle Event Payload 的运行时 Schema。 |
| `createExecutionFrameworkEvent` | 函数 | <code>createExecutionFrameworkEvent&lt;TType extends ExecutionFrameworkEventType&gt;(input: ExecutionEventCreateInput&lt;TType&gt;): ExecutionFrameworkEvent&lt;TType&gt;</code> | Create Execution Framework Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionEventPayload` | 函数 | <code>validateExecutionEventPayload&lt;TType extends ExecutionFrameworkEventType&gt;(type: TType, input: unknown): ExecutionEventPayloadMap[TType]</code> | Validate Execution Event Payload 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionFrameworkEvent` | 函数 | <code>validateExecutionFrameworkEvent(input: unknown): ExecutionFrameworkEvent</code> | Validate Execution Framework Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `commandExecutionEventExample`

Command Execution Event 的有效示例值。

- 种类: 常量
- 导入: `import { commandExecutionEventExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare const commandExecutionEventExample: ExecutionFrameworkEvent<"command.execution.completed">;
```

## `commandExecutionEventPayloadJsonSchema`

Command Execution Event Payload 的 JSON Schema。

- 种类: 常量
- 导入: `import { commandExecutionEventPayloadJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare const commandExecutionEventPayloadJsonSchema: JsonSchema;
```

## `commandExecutionEventPayloadSchema`

Command Execution Event Payload 的运行时 Schema。

- 种类: 常量
- 导入: `import { commandExecutionEventPayloadSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const commandExecutionEventPayloadSchema: (typeof import('@codesoul-co/hypha-core'))['commandExecutionEventPayloadSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `commandExecutionFrameworkEventTypes`

由 `modules/execution-events/index` 模块导出的 Command Execution Framework Event Types 常量。

- 种类: 常量
- 导入: `import { commandExecutionFrameworkEventTypes } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare const commandExecutionFrameworkEventTypes: readonly ["command.execution.requested", "command.execution.validated", "command.execution.approval.required", "command.execution.queued", "command.execution.started", "command.execution.output.truncated", "command.execution.resource.exceeded", "command.execution.oom_killed", "command.execution.timeout", "command.execution.cancellation.requested", "command.execution.cancelled", "command.execution.completed", "command.execution.failed", "command.execution.result.unknown", "command.execution.recovered"];
```

## `executionEventJsonSchemas`

由 `modules/execution-events/index` 模块导出的 Execution Event JSON Schemas 常量。

- 种类: 常量
- 导入: `import { executionEventJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare const executionEventJsonSchemas: Record<string, JsonSchema>;
```

## `executionEventPayloadBaseJsonSchema`

Execution Event Payload Base 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionEventPayloadBaseJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare const executionEventPayloadBaseJsonSchema: JsonSchema;
```

## `executionEventPayloadBaseSchema`

Execution Event Payload Base 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionEventPayloadBaseSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionEventPayloadBaseSchema: (typeof import('@codesoul-co/hypha-core'))['executionEventPayloadBaseSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionFrameworkEventEnvelopeSchema`

Execution Framework Event Envelope 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionFrameworkEventEnvelopeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionFrameworkEventEnvelopeSchema: (typeof import('@codesoul-co/hypha-core'))['executionFrameworkEventEnvelopeSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionFrameworkEventJsonSchema`

Execution Framework Event 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionFrameworkEventJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare const executionFrameworkEventJsonSchema: JsonSchema;
```

## `executionFrameworkEventTypes`

由 `modules/execution-events/index` 模块导出的 Execution Framework Event Types 常量。

- 种类: 常量
- 导入: `import { executionFrameworkEventTypes } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare const executionFrameworkEventTypes: readonly ["sandbox.create.requested", "sandbox.created", "sandbox.started", "sandbox.ready", "sandbox.degraded", "sandbox.terminate.requested", "sandbox.terminated", "sandbox.cleanup.completed", "sandbox.cleanup.failed", "command.execution.requested", "command.execution.validated", "command.execution.approval.required", "command.execution.queued", "command.execution.started", "command.execution.output.truncated", "command.execution.resource.exceeded", "command.execution.oom_killed", "command.execution.timeout", "command.execution.cancellation.requested", "command.execution.cancelled", "command.execution.completed", "command.execution.failed", "command.execution.result.unknown", "command.execution.recovered", "network.authorization.requested", "network.authorization.granted", "network.authorization.denied", "network.authorization.revoked"];
```

## `executionFrameworkEventTypeSchema`

Execution Framework Event Type 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionFrameworkEventTypeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare const executionFrameworkEventTypeSchema: z.ZodEnum<["sandbox.create.requested", "sandbox.created", "sandbox.started", "sandbox.ready", "sandbox.degraded", "sandbox.terminate.requested", "sandbox.terminated", "sandbox.cleanup.completed", "sandbox.cleanup.failed", "command.execution.requested", "command.execution.validated", "command.execution.approval.required", "command.execution.queued", "command.execution.started", "command.execution.output.truncated", "command.execution.resource.exceeded", "command.execution.oom_killed", "command.execution.timeout", "command.execution.cancellation.requested", "command.execution.cancelled", "command.execution.completed", "command.execution.failed", "command.execution.result.unknown", "command.execution.recovered", "network.authorization.requested", "network.authorization.granted", "network.authorization.denied", "network.authorization.revoked"]>;
```

## `networkAuthorizationEventExample`

Network Authorization Event 的有效示例值。

- 种类: 常量
- 导入: `import { networkAuthorizationEventExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare const networkAuthorizationEventExample: ExecutionFrameworkEvent<"network.authorization.granted">;
```

## `networkAuthorizationEventPayloadJsonSchema`

Network Authorization Event Payload 的 JSON Schema。

- 种类: 常量
- 导入: `import { networkAuthorizationEventPayloadJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare const networkAuthorizationEventPayloadJsonSchema: JsonSchema;
```

## `networkAuthorizationEventPayloadSchema`

Network Authorization Event Payload 的运行时 Schema。

- 种类: 常量
- 导入: `import { networkAuthorizationEventPayloadSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const networkAuthorizationEventPayloadSchema: (typeof import('@codesoul-co/hypha-core'))['networkAuthorizationEventPayloadSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `networkAuthorizationFrameworkEventTypes`

由 `modules/execution-events/index` 模块导出的 Network Authorization Framework Event Types 常量。

- 种类: 常量
- 导入: `import { networkAuthorizationFrameworkEventTypes } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare const networkAuthorizationFrameworkEventTypes: readonly ["network.authorization.requested", "network.authorization.granted", "network.authorization.denied", "network.authorization.revoked"];
```

## `sandboxFrameworkEventTypes`

由 `modules/execution-events/index` 模块导出的 Sandbox Framework Event Types 常量。

- 种类: 常量
- 导入: `import { sandboxFrameworkEventTypes } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare const sandboxFrameworkEventTypes: readonly ["sandbox.create.requested", "sandbox.created", "sandbox.started", "sandbox.ready", "sandbox.degraded", "sandbox.terminate.requested", "sandbox.terminated", "sandbox.cleanup.completed", "sandbox.cleanup.failed"];
```

## `sandboxLifecycleEventExample`

Sandbox Lifecycle Event 的有效示例值。

- 种类: 常量
- 导入: `import { sandboxLifecycleEventExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare const sandboxLifecycleEventExample: ExecutionFrameworkEvent<"sandbox.ready">;
```

## `sandboxLifecycleEventPayloadJsonSchema`

Sandbox Lifecycle Event Payload 的 JSON Schema。

- 种类: 常量
- 导入: `import { sandboxLifecycleEventPayloadJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare const sandboxLifecycleEventPayloadJsonSchema: JsonSchema;
```

## `sandboxLifecycleEventPayloadSchema`

Sandbox Lifecycle Event Payload 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxLifecycleEventPayloadSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const sandboxLifecycleEventPayloadSchema: (typeof import('@codesoul-co/hypha-core'))['sandboxLifecycleEventPayloadSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `createExecutionFrameworkEvent`

Create Execution Framework Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createExecutionFrameworkEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare function createExecutionFrameworkEvent<TType extends ExecutionFrameworkEventType>(input: ExecutionEventCreateInput<TType>): ExecutionFrameworkEvent<TType>;
```

### 调用签名

```text
createExecutionFrameworkEvent<TType extends ExecutionFrameworkEventType>(input: ExecutionEventCreateInput<TType>): ExecutionFrameworkEvent<TType>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>ExecutionEventCreateInput&lt;TType&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionFrameworkEvent<TType>`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionEventPayload`

Validate Execution Event Payload 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionEventPayload } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare function validateExecutionEventPayload<TType extends ExecutionFrameworkEventType>(type: TType, input: unknown): ExecutionEventPayloadMap[TType];
```

### 调用签名

```text
validateExecutionEventPayload<TType extends ExecutionFrameworkEventType>(type: TType, input: unknown): ExecutionEventPayloadMap[TType]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `type` | <code>TType</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionEventPayloadMap[TType]`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionFrameworkEvent`

Validate Execution Framework Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionFrameworkEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### 声明

```text
export declare function validateExecutionFrameworkEvent(input: unknown): ExecutionFrameworkEvent;
```

### 调用签名

```text
validateExecutionFrameworkEvent(input: unknown): ExecutionFrameworkEvent
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionFrameworkEvent`
- 说明: 返回值契约由上述类型定义。
