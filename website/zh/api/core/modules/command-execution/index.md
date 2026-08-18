# `@codesoul-co/hypha-core` / `modules/command-execution/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/command-execution/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)
- 导出数: **24**

## 模块用法

用于执行该边界的运行时行为。Index 模块公开 19 常量、5 函数。

### 从包入口导入

```ts
import {
  commandExecutionJsonSchemas,
  commandExecutionRequestExample,
  commandExecutionRequestJsonSchema,
  commandExecutionRequestSchema,
  commandExecutionResultExample,
  commandExecutionResultJsonSchema,
  commandExecutionResultSchema,
  commandExecutionStatusSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 5 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 19 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { commandExecutionRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = commandExecutionRequestSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandExecutionJsonSchemas` | 常量 | <code>const commandExecutionJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/command-execution/index` 模块导出的 Command Execution JSON Schemas 常量。 |
| `commandExecutionRequestExample` | 常量 | <code>const commandExecutionRequestExample: CommandExecutionRequest</code> | Command Execution Request 的有效示例值。 |
| `commandExecutionRequestJsonSchema` | 常量 | <code>const commandExecutionRequestJsonSchema: JsonSchema</code> | Command Execution Request 的 JSON Schema。 |
| `commandExecutionRequestSchema` | 常量 | <code>const commandExecutionRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionSc...</code> | Command Execution Request 的运行时 Schema。 |
| `commandExecutionResultExample` | 常量 | <code>const commandExecutionResultExample: CommandExecutionResult</code> | Command Execution Result 的有效示例值。 |
| `commandExecutionResultJsonSchema` | 常量 | <code>const commandExecutionResultJsonSchema: JsonSchema</code> | Command Execution Result 的 JSON Schema。 |
| `commandExecutionResultSchema` | 常量 | <code>const commandExecutionResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; revision: z.ZodNumber; sandboxId: z.ZodString; status: z.ZodEnum&lt;["queued", "starting", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]&gt;; exitCode: z.ZodNullable&lt;z.ZodNumber&gt;; signal: z.ZodOptional&lt;z.ZodString&gt;; stdout: z.ZodOptional&lt;z.ZodString&gt;; stde...</code> | Command Execution Result 的运行时 Schema。 |
| `commandExecutionStatusSchema` | 常量 | <code>const commandExecutionStatusSchema: z.ZodEnum&lt;["queued", "starting", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]&gt;</code> | Command Execution Status 的运行时 Schema。 |
| `commandExecutionStatusTransitions` | 常量 | <code>const commandExecutionStatusTransitions: Readonly&lt;Record&lt;CommandExecutionStatus, readonly CommandExecutionStatus[]&gt;&gt;</code> | 由 `modules/command-execution/index` 模块导出的 Command Execution Status Transitions 常量。 |
| `commandOutputChunkExample` | 常量 | <code>const commandOutputChunkExample: CommandOutputChunk</code> | Command Output Chunk 的有效示例值。 |
| `commandOutputChunkJsonSchema` | 常量 | <code>const commandOutputChunkJsonSchema: JsonSchema</code> | Command Output Chunk 的 JSON Schema。 |
| `commandOutputChunkSchema` | 常量 | <code>const commandOutputChunkSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; sequence: z.ZodNumber; stream: z.ZodEnum&lt;["stdout", "stderr"]&gt;; encoding: z.ZodEnum&lt;["utf8", "base64"]&gt;; content: z.ZodString; byteLength: z.ZodNumber; contentHash: z.ZodString; emittedAt: z.ZodString; truncated: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { executionId: string; contentHash: string; sequence: number; s...</code> | Command Output Chunk 的运行时 Schema。 |
| `executionCancelRequestExample` | 常量 | <code>const executionCancelRequestExample: ExecutionCancelRequest</code> | Execution Cancel Request 的有效示例值。 |
| `executionCancelRequestJsonSchema` | 常量 | <code>const executionCancelRequestJsonSchema: JsonSchema</code> | Execution Cancel Request 的 JSON Schema。 |
| `executionCancelRequestSchema` | 常量 | <code>const executionCancelRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString,...</code> | Execution Cancel Request 的运行时 Schema。 |
| `executionReceiptJsonSchema` | 常量 | <code>const executionReceiptJsonSchema: JsonSchema</code> | Execution Receipt 的 JSON Schema。 |
| `executionReceiptSchema` | 常量 | <code>const executionReceiptSchema: z.ZodObject&lt;{ id: z.ZodString; providerId: z.ZodString; executionId: z.ZodString; providerExecutionRef: z.ZodOptional&lt;z.ZodString&gt;; status: z.ZodEnum&lt;["accepted", "completed", "rejected", "unknown"]&gt;; issuedAt: z.ZodString; receiptHash: z.ZodString; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "strict", z.ZodTypeAny, { status: "unknown" &#124; "completed" &#124; "rejected...</code> | Execution Receipt 的运行时 Schema。 |
| `executionResourceUsageJsonSchema` | 常量 | <code>const executionResourceUsageJsonSchema: JsonSchema</code> | Execution Resource Usage 的 JSON Schema。 |
| `executionResourceUsageSchema` | 常量 | <code>const executionResourceUsageSchema: z.ZodObject&lt;{ cpuTimeMs: z.ZodOptional&lt;z.ZodNumber&gt;; peakMemoryBytes: z.ZodOptional&lt;z.ZodNumber&gt;; readBytes: z.ZodOptional&lt;z.ZodNumber&gt;; writtenBytes: z.ZodOptional&lt;z.ZodNumber&gt;; networkBytesSent: z.ZodOptional&lt;z.ZodNumber&gt;; networkBytesReceived: z.ZodOptional&lt;z.ZodNumber&gt;; processCountPeak: z.ZodOptional&lt;z.ZodNumber&gt;; outputBytes: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodT...</code> | Execution Resource Usage 的运行时 Schema。 |
| `canTransitionCommandExecutionStatus` | 函数 | <code>canTransitionCommandExecutionStatus(from: CommandExecutionStatus, to: CommandExecutionStatus): boolean</code> | Can Transition Command Execution Status 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateCommandExecutionRequest` | 函数 | <code>validateCommandExecutionRequest(input: unknown): CommandExecutionRequest</code> | Validate Command Execution Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateCommandExecutionResult` | 函数 | <code>validateCommandExecutionResult(input: unknown): CommandExecutionResult</code> | Validate Command Execution Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateCommandOutputChunk` | 函数 | <code>validateCommandOutputChunk(input: unknown): CommandOutputChunk</code> | Validate Command Output Chunk 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionCancelRequest` | 函数 | <code>validateExecutionCancelRequest(input: unknown): ExecutionCancelRequest</code> | Validate Execution Cancel Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `commandExecutionJsonSchemas`

由 `modules/command-execution/index` 模块导出的 Command Execution JSON Schemas 常量。

- 种类: 常量
- 导入: `import { commandExecutionJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const commandExecutionJsonSchemas: Record<string, JsonSchema>;
```

## `commandExecutionRequestExample`

Command Execution Request 的有效示例值。

- 种类: 常量
- 导入: `import { commandExecutionRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const commandExecutionRequestExample: CommandExecutionRequest;
```

## `commandExecutionRequestJsonSchema`

Command Execution Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { commandExecutionRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const commandExecutionRequestJsonSchema: JsonSchema;
```

## `commandExecutionRequestSchema`

Command Execution Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { commandExecutionRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const commandExecutionRequestSchema: (typeof import('@codesoul-co/hypha-core'))['commandExecutionRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `commandExecutionResultExample`

Command Execution Result 的有效示例值。

- 种类: 常量
- 导入: `import { commandExecutionResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const commandExecutionResultExample: CommandExecutionResult;
```

## `commandExecutionResultJsonSchema`

Command Execution Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { commandExecutionResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const commandExecutionResultJsonSchema: JsonSchema;
```

## `commandExecutionResultSchema`

Command Execution Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { commandExecutionResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const commandExecutionResultSchema: (typeof import('@codesoul-co/hypha-core'))['commandExecutionResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `commandExecutionStatusSchema`

Command Execution Status 的运行时 Schema。

- 种类: 常量
- 导入: `import { commandExecutionStatusSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const commandExecutionStatusSchema: z.ZodEnum<["queued", "starting", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]>;
```

## `commandExecutionStatusTransitions`

由 `modules/command-execution/index` 模块导出的 Command Execution Status Transitions 常量。

- 种类: 常量
- 导入: `import { commandExecutionStatusTransitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const commandExecutionStatusTransitions: Readonly<Record<CommandExecutionStatus, readonly CommandExecutionStatus[]>>;
```

## `commandOutputChunkExample`

Command Output Chunk 的有效示例值。

- 种类: 常量
- 导入: `import { commandOutputChunkExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const commandOutputChunkExample: CommandOutputChunk;
```

## `commandOutputChunkJsonSchema`

Command Output Chunk 的 JSON Schema。

- 种类: 常量
- 导入: `import { commandOutputChunkJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const commandOutputChunkJsonSchema: JsonSchema;
```

## `commandOutputChunkSchema`

Command Output Chunk 的运行时 Schema。

- 种类: 常量
- 导入: `import { commandOutputChunkSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const commandOutputChunkSchema: z.ZodEffects<z.ZodObject<{ executionId: z.ZodString; sequence: z.ZodNumber; stream: z.ZodEnum<["stdout", "stderr"]>; encoding: z.ZodEnum<["utf8", "base64"]>; content: z.ZodString; byteLength: z.ZodNumber; contentHash: z.ZodString; emittedAt: z.ZodString; truncated: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { executionId: string; contentHash: string; sequence: number; stream: "stdout" | "stderr"; content: string; encoding: "utf8" | "base64"; byteLength: number; emittedAt: string; truncated?: boolean | undefined; }, { executionId: string; contentHash: string; sequence: number; stream: "stdout" | "stderr"; content: string; encoding: "utf8" | "base64"; byteLength: number; emittedAt: string; truncated?: boolean | undefined; }>, { executionId: string; contentHash: string; sequence: number; stream: "stdout" | "stderr"; content: string; encoding: "utf8" | "base64"; byteLength: number; emittedAt: string; truncated?: boolean | undefined; }, { executionId: string; contentHash: string; sequence: number; stream: "stdout" | "stderr"; content: string; encoding: "utf8" | "base64"; byteLength: number; emittedAt: string; truncated?: boolean | undefined; }>;
```

## `executionCancelRequestExample`

Execution Cancel Request 的有效示例值。

- 种类: 常量
- 导入: `import { executionCancelRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const executionCancelRequestExample: ExecutionCancelRequest;
```

## `executionCancelRequestJsonSchema`

Execution Cancel Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionCancelRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const executionCancelRequestJsonSchema: JsonSchema;
```

## `executionCancelRequestSchema`

Execution Cancel Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionCancelRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const executionCancelRequestSchema: z.ZodObject<{ operationId: z.ZodString; executionId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; expectedRevision: z.ZodNumber; reason: z.ZodOptional<z.ZodString>; gracePeriodMs: z.ZodOptional<z.ZodNumber>; idempotencyKey: z.ZodOptional<z.ZodString>; correlationId: z.ZodOptional<z.ZodString>; causationId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; executionId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; correlationId?: string | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; gracePeriodMs?: number | undefined; }, { operationId: string; executionId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; correlationId?: string | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; gracePeriodMs?: number | undefined; }>;
```

## `executionReceiptJsonSchema`

Execution Receipt 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionReceiptJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const executionReceiptJsonSchema: JsonSchema;
```

## `executionReceiptSchema`

Execution Receipt 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionReceiptSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const executionReceiptSchema: z.ZodObject<{ id: z.ZodString; providerId: z.ZodString; executionId: z.ZodString; providerExecutionRef: z.ZodOptional<z.ZodString>; status: z.ZodEnum<["accepted", "completed", "rejected", "unknown"]>; issuedAt: z.ZodString; receiptHash: z.ZodString; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { status: "unknown" | "completed" | "rejected" | "accepted"; id: string; executionId: string; providerId: string; issuedAt: string; receiptHash: string; metadata?: Record<string, unknown> | undefined; providerExecutionRef?: string | undefined; }, { status: "unknown" | "completed" | "rejected" | "accepted"; id: string; executionId: string; providerId: string; issuedAt: string; receiptHash: string; metadata?: Record<string, unknown> | undefined; providerExecutionRef?: string | undefined; }>;
```

## `executionResourceUsageJsonSchema`

Execution Resource Usage 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionResourceUsageJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const executionResourceUsageJsonSchema: JsonSchema;
```

## `executionResourceUsageSchema`

Execution Resource Usage 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionResourceUsageSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare const executionResourceUsageSchema: z.ZodObject<{ cpuTimeMs: z.ZodOptional<z.ZodNumber>; peakMemoryBytes: z.ZodOptional<z.ZodNumber>; readBytes: z.ZodOptional<z.ZodNumber>; writtenBytes: z.ZodOptional<z.ZodNumber>; networkBytesSent: z.ZodOptional<z.ZodNumber>; networkBytesReceived: z.ZodOptional<z.ZodNumber>; processCountPeak: z.ZodOptional<z.ZodNumber>; outputBytes: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { cpuTimeMs?: number | undefined; peakMemoryBytes?: number | undefined; readBytes?: number | undefined; writtenBytes?: number | undefined; networkBytesSent?: number | undefined; networkBytesReceived?: number | undefined; processCountPeak?: number | undefined; outputBytes?: number | undefined; }, { cpuTimeMs?: number | undefined; peakMemoryBytes?: number | undefined; readBytes?: number | undefined; writtenBytes?: number | undefined; networkBytesSent?: number | undefined; networkBytesReceived?: number | undefined; processCountPeak?: number | undefined; outputBytes?: number | undefined; }>;
```

## `canTransitionCommandExecutionStatus`

Can Transition Command Execution Status 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { canTransitionCommandExecutionStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare function canTransitionCommandExecutionStatus(from: CommandExecutionStatus, to: CommandExecutionStatus): boolean;
```

### 调用签名

```text
canTransitionCommandExecutionStatus(from: CommandExecutionStatus, to: CommandExecutionStatus): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `from` | <code>CommandExecutionStatus</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `to` | <code>CommandExecutionStatus</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `validateCommandExecutionRequest`

Validate Command Execution Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateCommandExecutionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare function validateCommandExecutionRequest(input: unknown): CommandExecutionRequest;
```

### 调用签名

```text
validateCommandExecutionRequest(input: unknown): CommandExecutionRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `CommandExecutionRequest`
- 说明: 返回值契约由上述类型定义。

## `validateCommandExecutionResult`

Validate Command Execution Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateCommandExecutionResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare function validateCommandExecutionResult(input: unknown): CommandExecutionResult;
```

### 调用签名

```text
validateCommandExecutionResult(input: unknown): CommandExecutionResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `CommandExecutionResult`
- 说明: 返回值契约由上述类型定义。

## `validateCommandOutputChunk`

Validate Command Output Chunk 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateCommandOutputChunk } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare function validateCommandOutputChunk(input: unknown): CommandOutputChunk;
```

### 调用签名

```text
validateCommandOutputChunk(input: unknown): CommandOutputChunk
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `CommandOutputChunk`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionCancelRequest`

Validate Execution Cancel Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionCancelRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### 声明

```text
export declare function validateExecutionCancelRequest(input: unknown): ExecutionCancelRequest;
```

### 调用签名

```text
validateExecutionCancelRequest(input: unknown): ExecutionCancelRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionCancelRequest`
- 说明: 返回值契约由上述类型定义。
