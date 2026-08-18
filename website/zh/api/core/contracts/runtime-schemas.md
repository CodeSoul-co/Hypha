# `@codesoul-co/hypha-core` / `contracts/runtime-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)
- 导出数: **48**

## 模块用法

用于声明并运行时校验契约。Runtime schemas 模块公开 40 常量、8 函数。

### 从包入口导入

```ts
import {
  normalizedRuntimeErrorDefinition,
  normalizedRuntimeErrorExample,
  normalizedRuntimeErrorJsonSchema,
  normalizedRuntimeErrorSchema,
  runSignalRequestDefinition,
  runSignalRequestExample,
  runSignalRequestJsonSchema,
  runSignalRequestSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 8 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 40 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { normalizedRuntimeErrorSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = normalizedRuntimeErrorSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `normalizedRuntimeErrorDefinition` | 常量 | <code>const normalizedRuntimeErrorDefinition: SpecSchemaDefinition&lt;NormalizedRuntimeError&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 Normalized Runtime Error Definition 常量。 |
| `normalizedRuntimeErrorExample` | 常量 | <code>const normalizedRuntimeErrorExample: NormalizedRuntimeError</code> | Normalized Runtime Error 的有效示例值。 |
| `normalizedRuntimeErrorJsonSchema` | 常量 | <code>const normalizedRuntimeErrorJsonSchema: JsonSchema</code> | Normalized Runtime Error 的 JSON Schema。 |
| `normalizedRuntimeErrorSchema` | 常量 | <code>const normalizedRuntimeErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW"...</code> | Normalized Runtime Error 的运行时 Schema。 |
| `runSignalRequestDefinition` | 常量 | <code>const runSignalRequestDefinition: SpecSchemaDefinition&lt;RunSignalRequest&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 Run Signal Request Definition 常量。 |
| `runSignalRequestExample` | 常量 | <code>const runSignalRequestExample: RunSignalRequest</code> | Run Signal Request 的有效示例值。 |
| `runSignalRequestJsonSchema` | 常量 | <code>const runSignalRequestJsonSchema: JsonSchema</code> | Run Signal Request 的 JSON Schema。 |
| `runSignalRequestSchema` | 常量 | <code>const runSignalRequestSchema: z.ZodObject&lt;{ signalId: z.ZodString; runId: z.ZodString; key: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodStri...</code> | Run Signal Request 的运行时 Schema。 |
| `runtimeContractDefinitions` | 常量 | <code>const runtimeContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeScope&gt;, SpecSchemaDefinition&lt;RuntimePrincipal&gt;, SpecSchemaDefinition&lt;NormalizedRuntimeError&gt;, SpecSchemaDefinition&lt;RuntimeSession&gt;, SpecSchemaDefinition&lt;RuntimeRun&gt;, SpecSchemaDefinition&lt;RuntimeWaitRequest&gt;, SpecSchemaDefinition&lt;RuntimeWaitRecord&gt;, SpecSchemaDefinition&lt;RunSignalRequest&gt;]</code> | 由 `contracts/runtime-schemas` 模块导出的 Runtime Contract Definitions 常量。 |
| `runtimeContractJsonSchemas` | 常量 | <code>const runtimeContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 Runtime Contract JSON Schemas 常量。 |
| `runtimeErrorCodeSchema` | 常量 | <code>const runtimeErrorCodeSchema: z.ZodEnum&lt;["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW", "RUNTIME_RUN_NOT_FOUND",...</code> | Runtime Error Code 的运行时 Schema。 |
| `runtimePrincipalDefinition` | 常量 | <code>const runtimePrincipalDefinition: SpecSchemaDefinition&lt;RuntimePrincipal&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 Runtime Principal Definition 常量。 |
| `runtimePrincipalExample` | 常量 | <code>const runtimePrincipalExample: RuntimePrincipal</code> | Runtime Principal 的有效示例值。 |
| `runtimePrincipalJsonSchema` | 常量 | <code>const runtimePrincipalJsonSchema: JsonSchema</code> | Runtime Principal 的 JSON Schema。 |
| `runtimePrincipalSchema` | 常量 | <code>const runtimePrincipalSchema: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodType&lt;JsonValue, z.Z...</code> | Runtime Principal 的运行时 Schema。 |
| `runtimePrincipalTypeSchema` | 常量 | <code>const runtimePrincipalTypeSchema: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;</code> | Runtime Principal Type 的运行时 Schema。 |
| `runtimeRunDefinition` | 常量 | <code>const runtimeRunDefinition: SpecSchemaDefinition&lt;RuntimeRun&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 Runtime Run Definition 常量。 |
| `runtimeRunExample` | 常量 | <code>const runtimeRunExample: RuntimeRun</code> | Runtime Run 的有效示例值。 |
| `runtimeRunJsonSchema` | 常量 | <code>const runtimeRunJsonSchema: JsonSchema</code> | Runtime Run 的 JSON Schema。 |
| `runtimeRunSchema` | 常量 | <code>const runtimeRunSchema: z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; domainPackRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?:...</code> | Runtime Run 的运行时 Schema。 |
| `runtimeRunStatusSchema` | 常量 | <code>const runtimeRunStatusSchema: z.ZodEnum&lt;["created", "queued", "starting", "acquiring", "running", "waiting", "waiting_human", "waiting_signal", "waiting_timer", "pausing", "paused", "retry_scheduled", "recovering", "cancelling", "completed", "failed", "cancelled", "timed_out"]&gt;</code> | Runtime Run Status 的运行时 Schema。 |
| `runtimeScopeDefinition` | 常量 | <code>const runtimeScopeDefinition: SpecSchemaDefinition&lt;RuntimeScope&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 Runtime Scope Definition 常量。 |
| `runtimeScopeExample` | 常量 | <code>const runtimeScopeExample: RuntimeScope</code> | Runtime Scope 的有效示例值。 |
| `runtimeScopeJsonSchema` | 常量 | <code>const runtimeScopeJsonSchema: JsonSchema</code> | Runtime Scope 的 JSON Schema。 |
| `runtimeScopeSchema` | 常量 | <code>const runtimeScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; runId: string; tenantId?: string &#124; undefined; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; }, { userId: string; s...</code> | Runtime Scope 的运行时 Schema。 |
| `runtimeSessionDefinition` | 常量 | <code>const runtimeSessionDefinition: SpecSchemaDefinition&lt;RuntimeSession&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 Runtime Session Definition 常量。 |
| `runtimeSessionExample` | 常量 | <code>const runtimeSessionExample: RuntimeSession</code> | Runtime Session 的有效示例值。 |
| `runtimeSessionJsonSchema` | 常量 | <code>const runtimeSessionJsonSchema: JsonSchema</code> | Runtime Session 的 JSON Schema。 |
| `runtimeSessionSchema` | 常量 | <code>const runtimeSessionSchema: z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; domainPackRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined;...</code> | Runtime Session 的运行时 Schema。 |
| `runtimeSessionStatusSchema` | 常量 | <code>const runtimeSessionStatusSchema: z.ZodEnum&lt;["active", "closed", "archived"]&gt;</code> | Runtime Session Status 的运行时 Schema。 |
| `runtimeWaitRecordDefinition` | 常量 | <code>const runtimeWaitRecordDefinition: SpecSchemaDefinition&lt;RuntimeWaitRecord&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 Runtime Wait Record Definition 常量。 |
| `runtimeWaitRecordExample` | 常量 | <code>const runtimeWaitRecordExample: RuntimeWaitRecord</code> | Runtime Wait Record 的有效示例值。 |
| `runtimeWaitRecordJsonSchema` | 常量 | <code>const runtimeWaitRecordJsonSchema: JsonSchema</code> | Runtime Wait Record 的 JSON Schema。 |
| `runtimeWaitRecordSchema` | 常量 | <code>const runtimeWaitRecordSchema: z.ZodObject&lt;{ id: z.ZodString; runId: z.ZodString; stateId: z.ZodString; type: z.ZodEnum&lt;["human", "signal", "timer", "external_operation"]&gt;; key: z.ZodOptional&lt;z.ZodString&gt;; status: z.ZodEnum&lt;["waiting", "received", "expired", "cancelled"]&gt;; expectedSchemaHash: z.ZodOptional&lt;z.ZodString&gt;; createdAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; resolvedAt: z.ZodOptional&lt;z.ZodS...</code> | Runtime Wait Record 的运行时 Schema。 |
| `runtimeWaitRequestDefinition` | 常量 | <code>const runtimeWaitRequestDefinition: SpecSchemaDefinition&lt;RuntimeWaitRequest&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 Runtime Wait Request Definition 常量。 |
| `runtimeWaitRequestExample` | 常量 | <code>const runtimeWaitRequestExample: RuntimeWaitRequest</code> | Runtime Wait Request 的有效示例值。 |
| `runtimeWaitRequestJsonSchema` | 常量 | <code>const runtimeWaitRequestJsonSchema: JsonSchema</code> | Runtime Wait Request 的 JSON Schema。 |
| `runtimeWaitRequestSchema` | 常量 | <code>const runtimeWaitRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ type: z.ZodEnum&lt;["human", "signal", "timer", "external_operation"]&gt;; key: z.ZodOptional&lt;z.ZodString&gt;; expectedSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; timeoutTransitionId: z.ZodOptional&lt;z.ZodString&gt;; pendingActionRef: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodS...</code> | Runtime Wait Request 的运行时 Schema。 |
| `runtimeWaitStatusSchema` | 常量 | <code>const runtimeWaitStatusSchema: z.ZodEnum&lt;["waiting", "received", "expired", "cancelled"]&gt;</code> | Runtime Wait Status 的运行时 Schema。 |
| `runtimeWaitTypeSchema` | 常量 | <code>const runtimeWaitTypeSchema: z.ZodEnum&lt;["human", "signal", "timer", "external_operation"]&gt;</code> | Runtime Wait Type 的运行时 Schema。 |
| `validateNormalizedRuntimeError` | 函数 | <code>validateNormalizedRuntimeError(input: unknown): NormalizedRuntimeError</code> | Validate Normalized Runtime Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRunSignalRequest` | 函数 | <code>validateRunSignalRequest(input: unknown): RunSignalRequest</code> | Validate Run Signal Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimePrincipal` | 函数 | <code>validateRuntimePrincipal(input: unknown): RuntimePrincipal</code> | Validate Runtime Principal 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeRun` | 函数 | <code>validateRuntimeRun(input: unknown): RuntimeRun</code> | Validate Runtime Run 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeScope` | 函数 | <code>validateRuntimeScope(input: unknown): RuntimeScope</code> | Validate Runtime Scope 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeSession` | 函数 | <code>validateRuntimeSession(input: unknown): RuntimeSession</code> | Validate Runtime Session 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeWaitRecord` | 函数 | <code>validateRuntimeWaitRecord(input: unknown): RuntimeWaitRecord</code> | Validate Runtime Wait Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeWaitRequest` | 函数 | <code>validateRuntimeWaitRequest(input: unknown): RuntimeWaitRequest</code> | Validate Runtime Wait Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `normalizedRuntimeErrorDefinition`

由 `contracts/runtime-schemas` 模块导出的 Normalized Runtime Error Definition 常量。

- 种类: 常量
- 导入: `import { normalizedRuntimeErrorDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const normalizedRuntimeErrorDefinition: SpecSchemaDefinition<NormalizedRuntimeError>;
```

## `normalizedRuntimeErrorExample`

Normalized Runtime Error 的有效示例值。

- 种类: 常量
- 导入: `import { normalizedRuntimeErrorExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const normalizedRuntimeErrorExample: NormalizedRuntimeError;
```

## `normalizedRuntimeErrorJsonSchema`

Normalized Runtime Error 的 JSON Schema。

- 种类: 常量
- 导入: `import { normalizedRuntimeErrorJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const normalizedRuntimeErrorJsonSchema: JsonSchema;
```

## `normalizedRuntimeErrorSchema`

Normalized Runtime Error 的运行时 Schema。

- 种类: 常量
- 导入: `import { normalizedRuntimeErrorSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const normalizedRuntimeErrorSchema: z.ZodObject<{ code: z.ZodEnum<["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW", "RUNTIME_RUN_NOT_FOUND", "RUNTIME_RUN_CONFLICT", "RUNTIME_LEASE_CONFLICT", "RUNTIME_WORKFLOW_INVALID", "RUNTIME_PROCESS_MISMATCH", "RUNTIME_STATE_NOT_FOUND", "RUNTIME_TRANSITION_REJECTED", "RUNTIME_GUARD_FAILED", "RUNTIME_INVARIANT_FAILED", "RUNTIME_STATE_TIMEOUT", "RUNTIME_RUN_TIMEOUT", "RUNTIME_CANCELLED", "RUNTIME_SIGNAL_INVALID", "RUNTIME_SIGNAL_EXPIRED", "RUNTIME_RETRY_EXHAUSTED", "RUNTIME_CHECKPOINT_FAILED", "RUNTIME_EVENT_APPEND_FAILED", "RUNTIME_PROJECTION_FAILED", "RUNTIME_REPLAY_DIVERGENCE", "RUNTIME_INTERNAL_ERROR"]>; message: z.ZodString; retryable: z.ZodBoolean; stateId: z.ZodOptional<z.ZodString>; transitionId: z.ZodOptional<z.ZodString>; details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>>>; causeRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { code: "RUNTIME_INVALID_INPUT" | "RUNTIME_MESSAGE_BUS_UNAVAILABLE" | "RUNTIME_MESSAGE_SCHEMA_INVALID" | "RUNTIME_MESSAGE_DEAD_LETTERED" | "RUNTIME_SESSION_QUEUE_CONFLICT" | "RUNTIME_SESSION_QUEUE_OVERFLOW" | "RUNTIME_FENCING_REJECTED" | "RUNTIME_RESOURCE_CONFLICT" | "RUNTIME_IDEMPOTENCY_CONFLICT" | "RUNTIME_EVENT_STREAM_CORRUPT" | "RUNTIME_RECOVERY_REQUIRES_REVIEW" | "RUNTIME_RUN_NOT_FOUND" | "RUNTIME_RUN_CONFLICT" | "RUNTIME_LEASE_CONFLICT" | "RUNTIME_WORKFLOW_INVALID" | "RUNTIME_PROCESS_MISMATCH" | "RUNTIME_STATE_NOT_FOUND" | "RUNTIME_TRANSITION_REJECTED" | "RUNTIME_GUARD_FAILED" | "RUNTIME_INVARIANT_FAILED" | "RUNTIME_STATE_TIMEOUT" | "RUNTIME_RUN_TIMEOUT" | "RUNTIME_CANCELLED" | "RUNTIME_SIGNAL_INVALID" | "RUNTIME_SIGNAL_EXPIRED" | "RUNTIME_RETRY_EXHAUSTED" | "RUNTIME_CHECKPOINT_FAILED" | "RUNTIME_EVENT_APPEND_FAILED" | "RUNTIME_PROJECTION_FAILED" | "RUNTIME_REPLAY_DIVERGENCE" | "RUNTIME_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, JsonValue> | undefined; causeRef?: string | undefined; stateId?: string | undefined; transitionId?: string | undefined; }, { code: "RUNTIME_INVALID_INPUT" | "RUNTIME_MESSAGE_BUS_UNAVAILABLE" | "RUNTIME_MESSAGE_SCHEMA_INVALID" | "RUNTIME_MESSAGE_DEAD_LETTERED" | "RUNTIME_SESSION_QUEUE_CONFLICT" | "RUNTIME_SESSION_QUEUE_OVERFLOW" | "RUNTIME_FENCING_REJECTED" | "RUNTIME_RESOURCE_CONFLICT" | "RUNTIME_IDEMPOTENCY_CONFLICT" | "RUNTIME_EVENT_STREAM_CORRUPT" | "RUNTIME_RECOVERY_REQUIRES_REVIEW" | "RUNTIME_RUN_NOT_FOUND" | "RUNTIME_RUN_CONFLICT" | "RUNTIME_LEASE_CONFLICT" | "RUNTIME_WORKFLOW_INVALID" | "RUNTIME_PROCESS_MISMATCH" | "RUNTIME_STATE_NOT_FOUND" | "RUNTIME_TRANSITION_REJECTED" | "RUNTIME_GUARD_FAILED" | "RUNTIME_INVARIANT_FAILED" | "RUNTIME_STATE_TIMEOUT" | "RUNTIME_RUN_TIMEOUT" | "RUNTIME_CANCELLED" | "RUNTIME_SIGNAL_INVALID" | "RUNTIME_SIGNAL_EXPIRED" | "RUNTIME_RETRY_EXHAUSTED" | "RUNTIME_CHECKPOINT_FAILED" | "RUNTIME_EVENT_APPEND_FAILED" | "RUNTIME_PROJECTION_FAILED" | "RUNTIME_REPLAY_DIVERGENCE" | "RUNTIME_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, JsonValue> | undefined; causeRef?: string | undefined; stateId?: string | undefined; transitionId?: string | undefined; }>;
```

## `runSignalRequestDefinition`

由 `contracts/runtime-schemas` 模块导出的 Run Signal Request Definition 常量。

- 种类: 常量
- 导入: `import { runSignalRequestDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runSignalRequestDefinition: SpecSchemaDefinition<RunSignalRequest>;
```

## `runSignalRequestExample`

Run Signal Request 的有效示例值。

- 种类: 常量
- 导入: `import { runSignalRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runSignalRequestExample: RunSignalRequest;
```

## `runSignalRequestJsonSchema`

Run Signal Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { runSignalRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runSignalRequestJsonSchema: JsonSchema;
```

## `runSignalRequestSchema`

Run Signal Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runSignalRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runSignalRequestSchema: z.ZodObject<{ signalId: z.ZodString; runId: z.ZodString; key: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; tenantId?: string | undefined; userId?: string | undefined; agentId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; tenantId?: string | undefined; userId?: string | undefined; agentId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; roles?: string[] | undefined; }>; payload: z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>; idempotencyKey: z.ZodOptional<z.ZodString>; sentAt: z.ZodString; }, "strict", z.ZodTypeAny, { runId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; tenantId?: string | undefined; userId?: string | undefined; agentId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; roles?: string[] | undefined; }; payload: JsonValue; key: string; signalId: string; sentAt: string; idempotencyKey?: string | undefined; }, { runId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; tenantId?: string | undefined; userId?: string | undefined; agentId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; roles?: string[] | undefined; }; payload: JsonValue; key: string; signalId: string; sentAt: string; idempotencyKey?: string | undefined; }>;
```

## `runtimeContractDefinitions`

由 `contracts/runtime-schemas` 模块导出的 Runtime Contract Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeContractDefinitions: readonly [SpecSchemaDefinition<RuntimeScope>, SpecSchemaDefinition<RuntimePrincipal>, SpecSchemaDefinition<NormalizedRuntimeError>, SpecSchemaDefinition<RuntimeSession>, SpecSchemaDefinition<RuntimeRun>, SpecSchemaDefinition<RuntimeWaitRequest>, SpecSchemaDefinition<RuntimeWaitRecord>, SpecSchemaDefinition<RunSignalRequest>];
```

## `runtimeContractJsonSchemas`

由 `contracts/runtime-schemas` 模块导出的 Runtime Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { runtimeContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeErrorCodeSchema`

Runtime Error Code 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeErrorCodeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeErrorCodeSchema: z.ZodEnum<["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW", "RUNTIME_RUN_NOT_FOUND", "RUNTIME_RUN_CONFLICT", "RUNTIME_LEASE_CONFLICT", "RUNTIME_WORKFLOW_INVALID", "RUNTIME_PROCESS_MISMATCH", "RUNTIME_STATE_NOT_FOUND", "RUNTIME_TRANSITION_REJECTED", "RUNTIME_GUARD_FAILED", "RUNTIME_INVARIANT_FAILED", "RUNTIME_STATE_TIMEOUT", "RUNTIME_RUN_TIMEOUT", "RUNTIME_CANCELLED", "RUNTIME_SIGNAL_INVALID", "RUNTIME_SIGNAL_EXPIRED", "RUNTIME_RETRY_EXHAUSTED", "RUNTIME_CHECKPOINT_FAILED", "RUNTIME_EVENT_APPEND_FAILED", "RUNTIME_PROJECTION_FAILED", "RUNTIME_REPLAY_DIVERGENCE", "RUNTIME_INTERNAL_ERROR"]>;
```

## `runtimePrincipalDefinition`

由 `contracts/runtime-schemas` 模块导出的 Runtime Principal Definition 常量。

- 种类: 常量
- 导入: `import { runtimePrincipalDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimePrincipalDefinition: SpecSchemaDefinition<RuntimePrincipal>;
```

## `runtimePrincipalExample`

Runtime Principal 的有效示例值。

- 种类: 常量
- 导入: `import { runtimePrincipalExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimePrincipalExample: RuntimePrincipal;
```

## `runtimePrincipalJsonSchema`

Runtime Principal 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimePrincipalJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimePrincipalJsonSchema: JsonSchema;
```

## `runtimePrincipalSchema`

Runtime Principal 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimePrincipalSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimePrincipalSchema: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; tenantId?: string | undefined; userId?: string | undefined; agentId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; tenantId?: string | undefined; userId?: string | undefined; agentId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; roles?: string[] | undefined; }>;
```

## `runtimePrincipalTypeSchema`

Runtime Principal Type 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimePrincipalTypeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimePrincipalTypeSchema: z.ZodEnum<["user", "agent", "service", "system"]>;
```

## `runtimeRunDefinition`

由 `contracts/runtime-schemas` 模块导出的 Runtime Run Definition 常量。

- 种类: 常量
- 导入: `import { runtimeRunDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeRunDefinition: SpecSchemaDefinition<RuntimeRun>;
```

## `runtimeRunExample`

Runtime Run 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeRunExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeRunExample: RuntimeRun;
```

## `runtimeRunJsonSchema`

Runtime Run 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeRunJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeRunJsonSchema: JsonSchema;
```

## `runtimeRunSchema`

Runtime Run 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeRunSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeRunSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRunSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeRunStatusSchema`

Runtime Run Status 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeRunStatusSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeRunStatusSchema: z.ZodEnum<["created", "queued", "starting", "acquiring", "running", "waiting", "waiting_human", "waiting_signal", "waiting_timer", "pausing", "paused", "retry_scheduled", "recovering", "cancelling", "completed", "failed", "cancelled", "timed_out"]>;
```

## `runtimeScopeDefinition`

由 `contracts/runtime-schemas` 模块导出的 Runtime Scope Definition 常量。

- 种类: 常量
- 导入: `import { runtimeScopeDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeScopeDefinition: SpecSchemaDefinition<RuntimeScope>;
```

## `runtimeScopeExample`

Runtime Scope 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeScopeExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeScopeExample: RuntimeScope;
```

## `runtimeScopeJsonSchema`

Runtime Scope 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeScopeJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeScopeJsonSchema: JsonSchema;
```

## `runtimeScopeSchema`

Runtime Scope 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeScopeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; runId: string; tenantId?: string | undefined; workspaceId?: string | undefined; agentId?: string | undefined; }, { userId: string; sessionId: string; runId: string; tenantId?: string | undefined; workspaceId?: string | undefined; agentId?: string | undefined; }>;
```

## `runtimeSessionDefinition`

由 `contracts/runtime-schemas` 模块导出的 Runtime Session Definition 常量。

- 种类: 常量
- 导入: `import { runtimeSessionDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeSessionDefinition: SpecSchemaDefinition<RuntimeSession>;
```

## `runtimeSessionExample`

Runtime Session 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeSessionExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeSessionExample: RuntimeSession;
```

## `runtimeSessionJsonSchema`

Runtime Session 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeSessionJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeSessionJsonSchema: JsonSchema;
```

## `runtimeSessionSchema`

Runtime Session 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeSessionSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeSessionSchema: z.ZodObject<{ id: z.ZodString; revision: z.ZodNumber; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; domainPackRef: z.ZodOptional<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>>; sessionProfileRef: z.ZodOptional<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>>; title: z.ZodOptional<z.ZodString>; metadata: z.ZodRecord<z.ZodString, z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>>; status: z.ZodEnum<["active", "closed", "archived"]>; createdAt: z.ZodString; updatedAt: z.ZodString; closedAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; revision: number; userId: string; status: "archived" | "active" | "closed"; metadata: Record<string, JsonValue>; createdAt: string; updatedAt: string; tenantId?: string | undefined; workspaceId?: string | undefined; domainPackRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; sessionProfileRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; closedAt?: string | undefined; title?: string | undefined; }, { id: string; revision: number; userId: string; status: "archived" | "active" | "closed"; metadata: Record<string, JsonValue>; createdAt: string; updatedAt: string; tenantId?: string | undefined; workspaceId?: string | undefined; domainPackRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; sessionProfileRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; closedAt?: string | undefined; title?: string | undefined; }>;
```

## `runtimeSessionStatusSchema`

Runtime Session Status 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeSessionStatusSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeSessionStatusSchema: z.ZodEnum<["active", "closed", "archived"]>;
```

## `runtimeWaitRecordDefinition`

由 `contracts/runtime-schemas` 模块导出的 Runtime Wait Record Definition 常量。

- 种类: 常量
- 导入: `import { runtimeWaitRecordDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeWaitRecordDefinition: SpecSchemaDefinition<RuntimeWaitRecord>;
```

## `runtimeWaitRecordExample`

Runtime Wait Record 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeWaitRecordExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeWaitRecordExample: RuntimeWaitRecord;
```

## `runtimeWaitRecordJsonSchema`

Runtime Wait Record 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeWaitRecordJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeWaitRecordJsonSchema: JsonSchema;
```

## `runtimeWaitRecordSchema`

Runtime Wait Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeWaitRecordSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeWaitRecordSchema: z.ZodObject<{ id: z.ZodString; runId: z.ZodString; stateId: z.ZodString; type: z.ZodEnum<["human", "signal", "timer", "external_operation"]>; key: z.ZodOptional<z.ZodString>; status: z.ZodEnum<["waiting", "received", "expired", "cancelled"]>; expectedSchemaHash: z.ZodOptional<z.ZodString>; createdAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; resolvedAt: z.ZodOptional<z.ZodString>; signalRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; runId: string; status: "received" | "expired" | "cancelled" | "waiting"; type: "signal" | "human" | "timer" | "external_operation"; createdAt: string; stateId: string; expiresAt?: string | undefined; key?: string | undefined; resolvedAt?: string | undefined; expectedSchemaHash?: string | undefined; signalRef?: string | undefined; }, { id: string; runId: string; status: "received" | "expired" | "cancelled" | "waiting"; type: "signal" | "human" | "timer" | "external_operation"; createdAt: string; stateId: string; expiresAt?: string | undefined; key?: string | undefined; resolvedAt?: string | undefined; expectedSchemaHash?: string | undefined; signalRef?: string | undefined; }>;
```

## `runtimeWaitRequestDefinition`

由 `contracts/runtime-schemas` 模块导出的 Runtime Wait Request Definition 常量。

- 种类: 常量
- 导入: `import { runtimeWaitRequestDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeWaitRequestDefinition: SpecSchemaDefinition<RuntimeWaitRequest>;
```

## `runtimeWaitRequestExample`

Runtime Wait Request 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeWaitRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeWaitRequestExample: RuntimeWaitRequest;
```

## `runtimeWaitRequestJsonSchema`

Runtime Wait Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeWaitRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeWaitRequestJsonSchema: JsonSchema;
```

## `runtimeWaitRequestSchema`

Runtime Wait Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeWaitRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeWaitRequestSchema: z.ZodEffects<z.ZodObject<{ type: z.ZodEnum<["human", "signal", "timer", "external_operation"]>; key: z.ZodOptional<z.ZodString>; expectedSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; expiresAt: z.ZodOptional<z.ZodString>; timeoutTransitionId: z.ZodOptional<z.ZodString>; pendingActionRef: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>>>; }, "strict", z.ZodTypeAny, { type: "signal" | "human" | "timer" | "external_operation"; metadata?: Record<string, JsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }, { type: "signal" | "human" | "timer" | "external_operation"; metadata?: Record<string, JsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }>, { type: "signal" | "human" | "timer" | "external_operation"; metadata?: Record<string, JsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }, { type: "signal" | "human" | "timer" | "external_operation"; metadata?: Record<string, JsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }>;
```

## `runtimeWaitStatusSchema`

Runtime Wait Status 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeWaitStatusSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeWaitStatusSchema: z.ZodEnum<["waiting", "received", "expired", "cancelled"]>;
```

## `runtimeWaitTypeSchema`

Runtime Wait Type 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeWaitTypeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare const runtimeWaitTypeSchema: z.ZodEnum<["human", "signal", "timer", "external_operation"]>;
```

## `validateNormalizedRuntimeError`

Validate Normalized Runtime Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateNormalizedRuntimeError } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare function validateNormalizedRuntimeError(input: unknown): NormalizedRuntimeError;
```

### 调用签名

```text
validateNormalizedRuntimeError(input: unknown): NormalizedRuntimeError
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `NormalizedRuntimeError`
- 说明: 返回值契约由上述类型定义。

## `validateRunSignalRequest`

Validate Run Signal Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRunSignalRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare function validateRunSignalRequest(input: unknown): RunSignalRequest;
```

### 调用签名

```text
validateRunSignalRequest(input: unknown): RunSignalRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RunSignalRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimePrincipal`

Validate Runtime Principal 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimePrincipal } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare function validateRuntimePrincipal(input: unknown): RuntimePrincipal;
```

### 调用签名

```text
validateRuntimePrincipal(input: unknown): RuntimePrincipal
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimePrincipal`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeRun`

Validate Runtime Run 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeRun } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare function validateRuntimeRun(input: unknown): RuntimeRun;
```

### 调用签名

```text
validateRuntimeRun(input: unknown): RuntimeRun
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeRun`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeScope`

Validate Runtime Scope 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeScope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare function validateRuntimeScope(input: unknown): RuntimeScope;
```

### 调用签名

```text
validateRuntimeScope(input: unknown): RuntimeScope
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeScope`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeSession`

Validate Runtime Session 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeSession } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare function validateRuntimeSession(input: unknown): RuntimeSession;
```

### 调用签名

```text
validateRuntimeSession(input: unknown): RuntimeSession
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeSession`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeWaitRecord`

Validate Runtime Wait Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeWaitRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare function validateRuntimeWaitRecord(input: unknown): RuntimeWaitRecord;
```

### 调用签名

```text
validateRuntimeWaitRecord(input: unknown): RuntimeWaitRecord
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeWaitRecord`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeWaitRequest`

Validate Runtime Wait Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeWaitRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### 声明

```text
export declare function validateRuntimeWaitRequest(input: unknown): RuntimeWaitRequest;
```

### 调用签名

```text
validateRuntimeWaitRequest(input: unknown): RuntimeWaitRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeWaitRequest`
- 说明: 返回值契约由上述类型定义。
