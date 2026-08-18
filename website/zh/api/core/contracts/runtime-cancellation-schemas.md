# `@codesoul-co/hypha-core` / `contracts/runtime-cancellation-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-cancellation-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)
- 导出数: **15**

## 模块用法

用于声明并运行时校验契约。Runtime cancellation schemas 模块公开 12 常量、3 函数。

### 从包入口导入

```ts
import {
  runtimeCancelCommandDefinition,
  runtimeCancelCommandExample,
  runtimeCancelCommandJsonSchema,
  runtimeCancelCommandSchema,
  runtimeCancellationContractDefinitions,
  runtimeCancellationContractJsonSchemas,
  runtimeCancellationPolicySchema,
  runtimeCancellationTargetResultSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 12 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { runtimeCancelCommandSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeCancelCommandSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeCancelCommandDefinition` | 常量 | <code>const runtimeCancelCommandDefinition: SpecSchemaDefinition&lt;RuntimeCancelCommand&gt;</code> | 由 `contracts/runtime-cancellation-schemas` 模块导出的 Runtime Cancel Command Definition 常量。 |
| `runtimeCancelCommandExample` | 常量 | <code>const runtimeCancelCommandExample: RuntimeCancelCommand</code> | Runtime Cancel Command 的有效示例值。 |
| `runtimeCancelCommandJsonSchema` | 常量 | <code>const runtimeCancelCommandJsonSchema: JsonSchema</code> | Runtime Cancel Command 的 JSON Schema。 |
| `runtimeCancelCommandSchema` | 常量 | <code>const runtimeCancelCommandSchema: z.ZodObject&lt;{ commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; ...</code> | Runtime Cancel Command 的运行时 Schema。 |
| `runtimeCancellationContractDefinitions` | 常量 | <code>const runtimeCancellationContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeCancelCommand&gt;, SpecSchemaDefinition&lt;RuntimeCancelResult&gt;]</code> | 由 `contracts/runtime-cancellation-schemas` 模块导出的 Runtime Cancellation Contract Definitions 常量。 |
| `runtimeCancellationContractJsonSchemas` | 常量 | <code>const runtimeCancellationContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-cancellation-schemas` 模块导出的 Runtime Cancellation Contract JSON Schemas 常量。 |
| `runtimeCancellationPolicySchema` | 常量 | <code>const runtimeCancellationPolicySchema: z.ZodObject&lt;{ propagation: z.ZodEnum&lt;["none", "children", "all_descendants"]&gt;; cancelRunningActivities: z.ZodBoolean; waitGraceMs: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodTypeAny, { propagation: "none" &#124; "children" &#124; "all_descendants"; cancelRunningActivities: boolean; waitGraceMs?: number &#124; undefined; }, { propagation: "none" &#124; "children" &#124; "all_descendants"; cancelRun...</code> | Runtime Cancellation Policy 的运行时 Schema。 |
| `runtimeCancellationTargetResultSchema` | 常量 | <code>const runtimeCancellationTargetResultSchema: z.ZodObject&lt;{ targetType: z.ZodEnum&lt;["activity", "child_run", "session_command"]&gt;; targetId: z.ZodString; status: z.ZodEnum&lt;["cancelled", "already_terminal", "not_found", "failed"]&gt;; error: z.ZodOptional&lt;z.ZodObject&lt;{ code: z.ZodEnum&lt;["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_S...</code> | Runtime Cancellation Target Result 的运行时 Schema。 |
| `runtimeCancelResultDefinition` | 常量 | <code>const runtimeCancelResultDefinition: SpecSchemaDefinition&lt;RuntimeCancelResult&gt;</code> | 由 `contracts/runtime-cancellation-schemas` 模块导出的 Runtime Cancel Result Definition 常量。 |
| `runtimeCancelResultExample` | 常量 | <code>const runtimeCancelResultExample: RuntimeCancelResult</code> | Runtime Cancel Result 的有效示例值。 |
| `runtimeCancelResultJsonSchema` | 常量 | <code>const runtimeCancelResultJsonSchema: JsonSchema</code> | Runtime Cancel Result 的 JSON Schema。 |
| `runtimeCancelResultSchema` | 常量 | <code>const runtimeCancelResultSchema: z.ZodObject&lt;{ commandId: z.ZodString; disposition: z.ZodEnum&lt;["applied", "reused"]&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; targetResults: z.ZodArray&lt;z.ZodObject&lt;{ targetType: z.ZodEnum&lt;["activity", "child_run", "session_command"]&gt;; targetId: z.ZodString; status: z.ZodEnum&lt;["cancelled", "already_terminal", "not_found", "failed"]&gt;; error: z.ZodOptional&lt;z.ZodObject&lt;{ code: z.ZodE...</code> | Runtime Cancel Result 的运行时 Schema。 |
| `validateRuntimeCancelCommand` | 函数 | <code>validateRuntimeCancelCommand(input: unknown): RuntimeCancelCommand</code> | Validate Runtime Cancel Command 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeCancellationTargetResult` | 函数 | <code>validateRuntimeCancellationTargetResult(input: unknown): { status: "failed" &#124; "cancelled" &#124; "already_terminal" &#124; "not_found"; targetType: "session_command" &#124; "activity" &#124; "child_run"; targetId: string; error?: { code: "RUNTIME_INVALID_INPUT" &#124; "RUNTIME_MESSAGE_BUS_UNAVAILABLE" &#124; "RUNTIME_MESSAGE_SCHEMA_INVALID" &#124; "RUNTIME_MESSAGE_DEAD_LETTERED" &#124; "RUNTIME_SESSION_QUEUE_CONFLICT" &#124; "RUNTIME_SESSION_QUEUE_OVERFLOW" ...</code> | Validate Runtime Cancellation Target Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeCancelResult` | 函数 | <code>validateRuntimeCancelResult(input: unknown): RuntimeCancelResult</code> | Validate Runtime Cancel Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `runtimeCancelCommandDefinition`

由 `contracts/runtime-cancellation-schemas` 模块导出的 Runtime Cancel Command Definition 常量。

- 种类: 常量
- 导入: `import { runtimeCancelCommandDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### 声明

```text
export declare const runtimeCancelCommandDefinition: SpecSchemaDefinition<RuntimeCancelCommand>;
```

## `runtimeCancelCommandExample`

Runtime Cancel Command 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeCancelCommandExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### 声明

```text
export declare const runtimeCancelCommandExample: RuntimeCancelCommand;
```

## `runtimeCancelCommandJsonSchema`

Runtime Cancel Command 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeCancelCommandJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### 声明

```text
export declare const runtimeCancelCommandJsonSchema: JsonSchema;
```

## `runtimeCancelCommandSchema`

Runtime Cancel Command 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCancelCommandSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeCancelCommandSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeCancelCommandSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeCancellationContractDefinitions`

由 `contracts/runtime-cancellation-schemas` 模块导出的 Runtime Cancellation Contract Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeCancellationContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### 声明

```text
export declare const runtimeCancellationContractDefinitions: readonly [SpecSchemaDefinition<RuntimeCancelCommand>, SpecSchemaDefinition<RuntimeCancelResult>];
```

## `runtimeCancellationContractJsonSchemas`

由 `contracts/runtime-cancellation-schemas` 模块导出的 Runtime Cancellation Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { runtimeCancellationContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### 声明

```text
export declare const runtimeCancellationContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeCancellationPolicySchema`

Runtime Cancellation Policy 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCancellationPolicySchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### 声明

```text
export declare const runtimeCancellationPolicySchema: z.ZodObject<{ propagation: z.ZodEnum<["none", "children", "all_descendants"]>; cancelRunningActivities: z.ZodBoolean; waitGraceMs: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { propagation: "none" | "children" | "all_descendants"; cancelRunningActivities: boolean; waitGraceMs?: number | undefined; }, { propagation: "none" | "children" | "all_descendants"; cancelRunningActivities: boolean; waitGraceMs?: number | undefined; }>;
```

## `runtimeCancellationTargetResultSchema`

Runtime Cancellation Target Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCancellationTargetResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeCancellationTargetResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeCancellationTargetResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeCancelResultDefinition`

由 `contracts/runtime-cancellation-schemas` 模块导出的 Runtime Cancel Result Definition 常量。

- 种类: 常量
- 导入: `import { runtimeCancelResultDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### 声明

```text
export declare const runtimeCancelResultDefinition: SpecSchemaDefinition<RuntimeCancelResult>;
```

## `runtimeCancelResultExample`

Runtime Cancel Result 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeCancelResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### 声明

```text
export declare const runtimeCancelResultExample: RuntimeCancelResult;
```

## `runtimeCancelResultJsonSchema`

Runtime Cancel Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeCancelResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### 声明

```text
export declare const runtimeCancelResultJsonSchema: JsonSchema;
```

## `runtimeCancelResultSchema`

Runtime Cancel Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCancelResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeCancelResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeCancelResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `validateRuntimeCancelCommand`

Validate Runtime Cancel Command 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeCancelCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### 声明

```text
export declare function validateRuntimeCancelCommand(input: unknown): RuntimeCancelCommand;
```

### 调用签名

```text
validateRuntimeCancelCommand(input: unknown): RuntimeCancelCommand
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeCancelCommand`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeCancellationTargetResult`

Validate Runtime Cancellation Target Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeCancellationTargetResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### 声明

```text
export declare function validateRuntimeCancellationTargetResult(input: unknown): {
    status: "failed" | "cancelled" | "already_terminal" | "not_found";
    targetType: "session_command" | "activity" | "child_run";
    targetId: string;
    error?: {
        code: "RUNTIME_INVALID_INPUT" | "RUNTIME_MESSAGE_BUS_UNAVAILABLE" | "RUNTIME_MESSAGE_SCHEMA_INVALID" | "RUNTIME_MESSAGE_DEAD_LETTERED" | "RUNTIME_SESSION_QUEUE_CONFLICT" | "RUNTIME_SESSION_QUEUE_OVERFLOW" | "RUNTIME_FENCING_REJECTED" | "RUNTIME_RESOURCE_CONFLICT" | "RUNTIME_IDEMPOTENCY_CONFLICT" | "RUNTIME_EVENT_STREAM_CORRUPT" | "RUNTIME_RECOVERY_REQUIRES_REVIEW" | "RUNTIME_RUN_NOT_FOUND" | "RUNTIME_RUN_CONFLICT" | "RUNTIME_LEASE_CONFLICT" | "RUNTIME_WORKFLOW_INVALID" | "RUNTIME_PROCESS_MISMATCH" | "RUNTIME_STATE_NOT_FOUND" | "RUNTIME_TRANSITION_REJECTED" | "RUNTIME_GUARD_FAILED" | "RUNTIME_INVARIANT_FAILED" | "RUNTIME_STATE_TIMEOUT" | "RUNTIME_RUN_TIMEOUT" | "RUNTIME_CANCELLED" | "RUNTIME_SIGNAL_INVALID" | "RUNTIME_SIGNAL_EXPIRED" | "RUNTIME_RETRY_EXHAUSTED" | "RUNTIME_CHECKPOINT_FAILED" | "RUNTIME_EVENT_APPEND_FAILED" | "RUNTIME_PROJECTION_FAILED" | "RUNTIME_REPLAY_DIVERGENCE" | "RUNTIME_INTERNAL_ERROR";
        message: string;
        retryable: boolean;
        details?: Record<string, string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
            [key: string]: string | number | boolean | /*elided*/ any | /*elided*/ any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | /*elided*/ any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null)[] | /*elided*/ any | null;
        } | null> | undefined;
        causeRef?: string | undefined;
        stateId?: string | undefined;
        transitionId?: string | undefined;
    } | undefined;
};
```

### 调用签名

```text
validateRuntimeCancellationTargetResult(input: unknown): { status: "failed" | "cancelled" | "already_terminal" | "not_found"; targetType: "session_command" | "activity" | "child_run"; targetId: string; error?: { code: "RUNTIME_INVALID_INPUT" | "RUNTIME_MESSAGE_BUS_UNAVAILABLE" | "RUNTIME_MESSAGE_SCHEMA_INVALID" | "RUNTIME_MESSAGE_DEAD_LETTERED" | "RUNTIME_SESSION_QUEUE_CONFLICT" | "RUNTIME_SESSION_QUEUE_OVERFLOW" | "RUNTIME_FENCING_REJECTED" | "RUNTIME_RESOURCE_CONFLICT" | "RUNTIME_IDEMPOTENCY_CONFLICT" | "RUNTIME_EVENT_STREAM_CORRUPT" | "RUNTIME_RECOVERY_REQUIRES_REVIEW" | "RUNTIME_RUN_NOT_FOUND" | "RUNTIME_RUN_CONFLICT" | "RUNTIME_LEASE_CONFLICT" | "RUNTIME_WORKFLOW_INVALID" | "RUNTIME_PROCESS_MISMATCH" | "RUNTIME_STATE_NOT_FOUND" | "RUNTIME_TRANSITION_REJECTED" | "RUNTIME_GUARD_FAILED" | "RUNTIME_INVARIANT_FAILED" | "RUNTIME_STATE_TIMEOUT" | "RUNTIME_RUN_TIMEOUT" | "RUNTIME_CANCELLED" | "RUNTIME_SIGNAL_INVALID" | "RUNTIME_SIGNAL_EXPIRED" | "RUNTIME_RETRY_EXHAUSTED" | "RUNTIME_CHECKPOINT_FAILED" | "RUNTIME_EVENT_APPEND_FAILED" | "RUNTIME_PROJECTION_FAILED" | "RUNTIME_REPLAY_DIVERGENCE" | "RUNTIME_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | { [key: string]: string | number | boolean | any | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null> | undefined; causeRef?: string | undefined; stateId?: string | undefined; transitionId?: string | undefined; } | undefined; }
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `{ status: "failed" | "cancelled" | "already_terminal" | "not_found"; targetType: "session_command" | "activity" | "child_run"; targetId: string; error?: { code: "RUNTIME_INVALID_INPUT" | "RUNTIME_MESSAGE_BUS_UNAVAILABLE" | "RUNTIME_MESSAGE_SCHEMA_INVALID" | "RUNTIME_MESSAGE_DEAD_LETTERED" | "RUNTIME_SESSION_QUEUE_CONFLICT" | "RUNTIME_SESSION_QUEUE_OVERFLOW" | "RUNTIME_FENCING_REJECTED" | "RUNTIME_RESOURCE_CONFLICT" | "RUNTIME_IDEMPOTENCY_CONFLICT" | "RUNTIME_EVENT_STREAM_CORRUPT" | "RUNTIME_RECOVERY_REQUIRES_REVIEW" | "RUNTIME_RUN_NOT_FOUND" | "RUNTIME_RUN_CONFLICT" | "RUNTIME_LEASE_CONFLICT" | "RUNTIME_WORKFLOW_INVALID" | "RUNTIME_PROCESS_MISMATCH" | "RUNTIME_STATE_NOT_FOUND" | "RUNTIME_TRANSITION_REJECTED" | "RUNTIME_GUARD_FAILED" | "RUNTIME_INVARIANT_FAILED" | "RUNTIME_STATE_TIMEOUT" | "RUNTIME_RUN_TIMEOUT" | "RUNTIME_CANCELLED" | "RUNTIME_SIGNAL_INVALID" | "RUNTIME_SIGNAL_EXPIRED" | "RUNTIME_RETRY_EXHAUSTED" | "RUNTIME_CHECKPOINT_FAILED" | "RUNTIME_EVENT_APPEND_FAILED" | "RUNTIME_PROJECTION_FAILED" | "RUNTIME_REPLAY_DIVERGENCE" | "RUNTIME_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | { [key: string]: string | number | boolean | any | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null> | undefined; causeRef?: string | undefined; stateId?: string | undefined; transitionId?: string | undefined; } | undefined; }`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeCancelResult`

Validate Runtime Cancel Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeCancelResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### 声明

```text
export declare function validateRuntimeCancelResult(input: unknown): RuntimeCancelResult;
```

### 调用签名

```text
validateRuntimeCancelResult(input: unknown): RuntimeCancelResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeCancelResult`
- 说明: 返回值契约由上述类型定义。
