# `@codesoul-co/hypha-core` / `contracts/session-queue-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/session-queue-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)
- 导出数: **32**

## 模块用法

用于声明并运行时校验契约。Session queue schemas 模块公开 24 常量、8 函数。

### 从包入口导入

```ts
import {
  cancelSessionCommandsRequestDefinition,
  cancelSessionCommandsRequestSchema,
  cancelSessionCommandsResultDefinition,
  cancelSessionCommandsResultSchema,
  closeDeadLetterSessionCommandRequestDefinition,
  closeDeadLetterSessionCommandRequestSchema,
  listStuckSessionCommandsRequestSchema,
  redriveDeadLetterSessionCommandRequestDefinition,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 8 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 24 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { cancelSessionCommandsRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = cancelSessionCommandsRequestSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancelSessionCommandsRequestDefinition` | 常量 | <code>const cancelSessionCommandsRequestDefinition: SpecSchemaDefinition&lt;CancelSessionCommandsRequest&gt;</code> | 由 `contracts/session-queue-schemas` 模块导出的 Cancel Session Commands Request Definition 常量。 |
| `cancelSessionCommandsRequestSchema` | 常量 | <code>const cancelSessionCommandsRequestSchema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }&gt;; targetRunId: z.ZodString; cancellationCommandId: z.ZodS...</code> | Cancel Session Commands Request 的运行时 Schema。 |
| `cancelSessionCommandsResultDefinition` | 常量 | <code>const cancelSessionCommandsResultDefinition: SpecSchemaDefinition&lt;CancelSessionCommandsResult&gt;</code> | 由 `contracts/session-queue-schemas` 模块导出的 Cancel Session Commands Result Definition 常量。 |
| `cancelSessionCommandsResultSchema` | 常量 | <code>const cancelSessionCommandsResultSchema: z.ZodObject&lt;{ targetRunId: z.ZodString; cancelledCommandIds: z.ZodArray&lt;z.ZodString, "many"&gt;; alreadyCancelledCommandIds: z.ZodArray&lt;z.ZodString, "many"&gt;; alreadyTerminalCommandIds: z.ZodArray&lt;z.ZodString, "many"&gt;; }, "strict", z.ZodTypeAny, { targetRunId: string; cancelledCommandIds: string[]; alreadyCancelledCommandIds: string[]; alreadyTerminalCommandIds: string[]; }, { ...</code> | Cancel Session Commands Result 的运行时 Schema。 |
| `closeDeadLetterSessionCommandRequestDefinition` | 常量 | <code>const closeDeadLetterSessionCommandRequestDefinition: SpecSchemaDefinition&lt;CloseDeadLetterSessionCommandRequest&gt;</code> | 由 `contracts/session-queue-schemas` 模块导出的 Close Dead Letter Session Command Request Definition 常量。 |
| `closeDeadLetterSessionCommandRequestSchema` | 常量 | <code>const closeDeadLetterSessionCommandRequestSchema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }&gt;; commandId: z.ZodString; operatorId: z.ZodString...</code> | Close Dead Letter Session Command Request 的运行时 Schema。 |
| `listStuckSessionCommandsRequestSchema` | 常量 | <code>const listStuckSessionCommandsRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }&gt;; checkedAt: z.ZodString; graceMs: z.ZodOptional&lt;z.ZodNumber&gt;; limit: z.ZodOptional&lt;z....</code> | List Stuck Session Commands Request 的运行时 Schema。 |
| `redriveDeadLetterSessionCommandRequestDefinition` | 常量 | <code>const redriveDeadLetterSessionCommandRequestDefinition: SpecSchemaDefinition&lt;RedriveDeadLetterSessionCommandRequest&gt;</code> | 由 `contracts/session-queue-schemas` 模块导出的 Redrive Dead Letter Session Command Request Definition 常量。 |
| `redriveDeadLetterSessionCommandRequestSchema` | 常量 | <code>const redriveDeadLetterSessionCommandRequestSchema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }&gt;; sourceCommandId: z.ZodString; id: z.ZodString...</code> | Redrive Dead Letter Session Command Request 的运行时 Schema。 |
| `sessionCommandDeadLetterResolutionSchema` | 常量 | <code>const sessionCommandDeadLetterResolutionSchema: z.ZodEffects&lt;z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; disposition: z.ZodEnum&lt;["redriven", "closed"]&gt;; operatorId: z.ZodString; reason: z.ZodString; resolvedAt: z.ZodString; redriveCommandId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { version: "1.0.0"; reason: string; disposition: "closed" &#124; "redriven"; resolvedAt: string; operatorId: string; redriv...</code> | Session Command Dead Letter Resolution 的运行时 Schema。 |
| `sessionCommandLeaseRecoverySchema` | 常量 | <code>const sessionCommandLeaseRecoverySchema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; previousWorkerId: z.ZodString; previousLeaseEpoch: z.ZodNumber; leaseExpiredAt: z.ZodString; recoveredAt: z.ZodString; disposition: z.ZodEnum&lt;["requeued", "dead_lettered"]&gt;; }, "strict", z.ZodTypeAny, { version: "1.0.0"; disposition: "requeued" &#124; "dead_lettered"; previousWorkerId: string; previousLeaseEpoch: number; leaseExpired...</code> | Session Command Lease Recovery 的运行时 Schema。 |
| `sessionCommandRecordDefinition` | 常量 | <code>const sessionCommandRecordDefinition: SpecSchemaDefinition&lt;SessionCommandRecord&gt;</code> | 由 `contracts/session-queue-schemas` 模块导出的 Session Command Record Definition 常量。 |
| `sessionCommandRecordExample` | 常量 | <code>const sessionCommandRecordExample: SessionCommandRecord</code> | Session Command Record 的有效示例值。 |
| `sessionCommandRecordJsonSchema` | 常量 | <code>const sessionCommandRecordJsonSchema: JsonSchema</code> | Session Command Record 的 JSON Schema。 |
| `sessionCommandRecordSchema` | 常量 | <code>const sessionCommandRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; commandType: z.ZodEnum&lt;["start_run", "user_input", "resume", "signal", "cancel", "transition", "continue_react", "close_session"]&gt;; idempotencyKey: z.ZodString; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; targetRunId: z.ZodOptional&lt;z.ZodString&gt;; enqueueSequen...</code> | Session Command Record 的运行时 Schema。 |
| `sessionCommandRedriveSchema` | 常量 | <code>const sessionCommandRedriveSchema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; sourceCommandId: z.ZodString; operatorId: z.ZodString; reason: z.ZodString; requestedAt: z.ZodString; }, "strict", z.ZodTypeAny, { version: "1.0.0"; reason: string; requestedAt: string; sourceCommandId: string; operatorId: string; }, { version: "1.0.0"; reason: string; requestedAt: string; sourceCommandId: string; operatorId: string; }&gt;</code> | Session Command Redrive 的运行时 Schema。 |
| `sessionCommandStatusSchema` | 常量 | <code>const sessionCommandStatusSchema: z.ZodEnum&lt;["queued", "claimed", "applied", "reused", "rejected", "expired", "failed", "dead_letter", "dead_letter_resolved"]&gt;</code> | Session Command Status 的运行时 Schema。 |
| `sessionCommandTypeSchema` | 常量 | <code>const sessionCommandTypeSchema: z.ZodEnum&lt;["start_run", "user_input", "resume", "signal", "cancel", "transition", "continue_react", "close_session"]&gt;</code> | Session Command Type 的运行时 Schema。 |
| `sessionQueueContractDefinitions` | 常量 | <code>const sessionQueueContractDefinitions: readonly [SpecSchemaDefinition&lt;SessionCommandRecord&gt;, SpecSchemaDefinition&lt;CancelSessionCommandsRequest&gt;, SpecSchemaDefinition&lt;CancelSessionCommandsResult&gt;, SpecSchemaDefinition&lt;RedriveDeadLetterSessionCommandRequest&gt;, SpecSchemaDefinition&lt;CloseDeadLetterSessionCommandRequest&gt;, SpecSchemaDefinition&lt;SessionQueueHealthSnapshot&gt;]</code> | 由 `contracts/session-queue-schemas` 模块导出的 Session Queue Contract Definitions 常量。 |
| `sessionQueueContractJsonSchemas` | 常量 | <code>const sessionQueueContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/session-queue-schemas` 模块导出的 Session Queue Contract JSON Schemas 常量。 |
| `sessionQueueHealthSnapshotDefinition` | 常量 | <code>const sessionQueueHealthSnapshotDefinition: SpecSchemaDefinition&lt;SessionQueueHealthSnapshot&gt;</code> | 由 `contracts/session-queue-schemas` 模块导出的 Session Queue Health Snapshot Definition 常量。 |
| `sessionQueueHealthSnapshotSchema` | 常量 | <code>const sessionQueueHealthSnapshotSchema: z.ZodEffects&lt;z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; totalCommands: z.ZodNumber; pendingCommands: z.ZodNumber; queuedCommands: z.ZodNumber; claimedCommands: z.ZodNumber; deadLetterCommands: z.ZodNumber; resolvedDeadLetterCommands: z.ZodNumber; retryingCommands: z.ZodNumber; redeliveredCommands: z.ZodNumber; recoveredExpiredLeases: z.ZodNumber; leaseRecoveryCount: z.Zod...</code> | Session Queue Health Snapshot 的运行时 Schema。 |
| `sessionQueueScopeSchema` | 常量 | <code>const sessionQueueScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }&gt;</code> | Session Queue Scope 的运行时 Schema。 |
| `stuckSessionCommandSchema` | 常量 | <code>const stuckSessionCommandSchema: z.ZodObject&lt;{ command: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; commandType: z.ZodEnum&lt;["start_run", "user_input", "resume", "signal", "cancel", "transition", "continue_react", "close_session"]&gt;; idempotencyKey: z.ZodString; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; targetRunId: z.ZodOptional&lt;z.Zod...</code> | Stuck Session Command 的运行时 Schema。 |
| `validateCancelSessionCommandsRequest` | 函数 | <code>validateCancelSessionCommandsRequest(input: unknown): CancelSessionCommandsRequest</code> | Validate Cancel Session Commands Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateCancelSessionCommandsResult` | 函数 | <code>validateCancelSessionCommandsResult(input: unknown): CancelSessionCommandsResult</code> | Validate Cancel Session Commands Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateCloseDeadLetterSessionCommandRequest` | 函数 | <code>validateCloseDeadLetterSessionCommandRequest(input: unknown): CloseDeadLetterSessionCommandRequest</code> | Validate Close Dead Letter Session Command Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateListStuckSessionCommandsRequest` | 函数 | <code>validateListStuckSessionCommandsRequest(input: unknown): ListStuckSessionCommandsRequest</code> | Validate List Stuck Session Commands Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRedriveDeadLetterSessionCommandRequest` | 函数 | <code>validateRedriveDeadLetterSessionCommandRequest(input: unknown): RedriveDeadLetterSessionCommandRequest</code> | Validate Redrive Dead Letter Session Command Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateSessionCommandRecord` | 函数 | <code>validateSessionCommandRecord(input: unknown): SessionCommandRecord</code> | Validate Session Command Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateSessionQueueHealthSnapshot` | 函数 | <code>validateSessionQueueHealthSnapshot(input: unknown): SessionQueueHealthSnapshot</code> | Validate Session Queue Health Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateStuckSessionCommand` | 函数 | <code>validateStuckSessionCommand(input: unknown): StuckSessionCommand</code> | Validate Stuck Session Command 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `cancelSessionCommandsRequestDefinition`

由 `contracts/session-queue-schemas` 模块导出的 Cancel Session Commands Request Definition 常量。

- 种类: 常量
- 导入: `import { cancelSessionCommandsRequestDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const cancelSessionCommandsRequestDefinition: SpecSchemaDefinition<CancelSessionCommandsRequest>;
```

## `cancelSessionCommandsRequestSchema`

Cancel Session Commands Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { cancelSessionCommandsRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const cancelSessionCommandsRequestSchema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string | undefined; }, { userId: string; sessionId: string; tenantId?: string | undefined; }>; targetRunId: z.ZodString; cancellationCommandId: z.ZodString; reason: z.ZodString; cancelledAt: z.ZodString; }, "strict", z.ZodTypeAny, { version: "1.0.0"; reason: string; scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; targetRunId: string; cancellationCommandId: string; cancelledAt: string; }, { version: "1.0.0"; reason: string; scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; targetRunId: string; cancellationCommandId: string; cancelledAt: string; }>;
```

## `cancelSessionCommandsResultDefinition`

由 `contracts/session-queue-schemas` 模块导出的 Cancel Session Commands Result Definition 常量。

- 种类: 常量
- 导入: `import { cancelSessionCommandsResultDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const cancelSessionCommandsResultDefinition: SpecSchemaDefinition<CancelSessionCommandsResult>;
```

## `cancelSessionCommandsResultSchema`

Cancel Session Commands Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { cancelSessionCommandsResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const cancelSessionCommandsResultSchema: z.ZodObject<{ targetRunId: z.ZodString; cancelledCommandIds: z.ZodArray<z.ZodString, "many">; alreadyCancelledCommandIds: z.ZodArray<z.ZodString, "many">; alreadyTerminalCommandIds: z.ZodArray<z.ZodString, "many">; }, "strict", z.ZodTypeAny, { targetRunId: string; cancelledCommandIds: string[]; alreadyCancelledCommandIds: string[]; alreadyTerminalCommandIds: string[]; }, { targetRunId: string; cancelledCommandIds: string[]; alreadyCancelledCommandIds: string[]; alreadyTerminalCommandIds: string[]; }>;
```

## `closeDeadLetterSessionCommandRequestDefinition`

由 `contracts/session-queue-schemas` 模块导出的 Close Dead Letter Session Command Request Definition 常量。

- 种类: 常量
- 导入: `import { closeDeadLetterSessionCommandRequestDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const closeDeadLetterSessionCommandRequestDefinition: SpecSchemaDefinition<CloseDeadLetterSessionCommandRequest>;
```

## `closeDeadLetterSessionCommandRequestSchema`

Close Dead Letter Session Command Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { closeDeadLetterSessionCommandRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const closeDeadLetterSessionCommandRequestSchema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string | undefined; }, { userId: string; sessionId: string; tenantId?: string | undefined; }>; commandId: z.ZodString; operatorId: z.ZodString; reason: z.ZodString; closedAt: z.ZodString; }, "strict", z.ZodTypeAny, { version: "1.0.0"; reason: string; scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; commandId: string; operatorId: string; closedAt: string; }, { version: "1.0.0"; reason: string; scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; commandId: string; operatorId: string; closedAt: string; }>;
```

## `listStuckSessionCommandsRequestSchema`

List Stuck Session Commands Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { listStuckSessionCommandsRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const listStuckSessionCommandsRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string | undefined; }, { userId: string; sessionId: string; tenantId?: string | undefined; }>; checkedAt: z.ZodString; graceMs: z.ZodOptional<z.ZodNumber>; limit: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; checkedAt: string; limit?: number | undefined; graceMs?: number | undefined; }, { scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; checkedAt: string; limit?: number | undefined; graceMs?: number | undefined; }>;
```

## `redriveDeadLetterSessionCommandRequestDefinition`

由 `contracts/session-queue-schemas` 模块导出的 Redrive Dead Letter Session Command Request Definition 常量。

- 种类: 常量
- 导入: `import { redriveDeadLetterSessionCommandRequestDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const redriveDeadLetterSessionCommandRequestDefinition: SpecSchemaDefinition<RedriveDeadLetterSessionCommandRequest>;
```

## `redriveDeadLetterSessionCommandRequestSchema`

Redrive Dead Letter Session Command Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { redriveDeadLetterSessionCommandRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const redriveDeadLetterSessionCommandRequestSchema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string | undefined; }, { userId: string; sessionId: string; tenantId?: string | undefined; }>; sourceCommandId: z.ZodString; id: z.ZodString; idempotencyKey: z.ZodString; operatorId: z.ZodString; reason: z.ZodString; requestedAt: z.ZodOptional<z.ZodString>; availableAt: z.ZodOptional<z.ZodString>; expiresAt: z.ZodOptional<z.ZodString>; priority: z.ZodOptional<z.ZodNumber>; maxAttempts: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { id: string; version: "1.0.0"; reason: string; idempotencyKey: string; scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; sourceCommandId: string; operatorId: string; expiresAt?: string | undefined; requestedAt?: string | undefined; maxAttempts?: number | undefined; priority?: number | undefined; availableAt?: string | undefined; }, { id: string; version: "1.0.0"; reason: string; idempotencyKey: string; scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; sourceCommandId: string; operatorId: string; expiresAt?: string | undefined; requestedAt?: string | undefined; maxAttempts?: number | undefined; priority?: number | undefined; availableAt?: string | undefined; }>;
```

## `sessionCommandDeadLetterResolutionSchema`

Session Command Dead Letter Resolution 的运行时 Schema。

- 种类: 常量
- 导入: `import { sessionCommandDeadLetterResolutionSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const sessionCommandDeadLetterResolutionSchema: z.ZodEffects<z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; disposition: z.ZodEnum<["redriven", "closed"]>; operatorId: z.ZodString; reason: z.ZodString; resolvedAt: z.ZodString; redriveCommandId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { version: "1.0.0"; reason: string; disposition: "closed" | "redriven"; resolvedAt: string; operatorId: string; redriveCommandId?: string | undefined; }, { version: "1.0.0"; reason: string; disposition: "closed" | "redriven"; resolvedAt: string; operatorId: string; redriveCommandId?: string | undefined; }>, { version: "1.0.0"; reason: string; disposition: "closed" | "redriven"; resolvedAt: string; operatorId: string; redriveCommandId?: string | undefined; }, { version: "1.0.0"; reason: string; disposition: "closed" | "redriven"; resolvedAt: string; operatorId: string; redriveCommandId?: string | undefined; }>;
```

## `sessionCommandLeaseRecoverySchema`

Session Command Lease Recovery 的运行时 Schema。

- 种类: 常量
- 导入: `import { sessionCommandLeaseRecoverySchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const sessionCommandLeaseRecoverySchema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; previousWorkerId: z.ZodString; previousLeaseEpoch: z.ZodNumber; leaseExpiredAt: z.ZodString; recoveredAt: z.ZodString; disposition: z.ZodEnum<["requeued", "dead_lettered"]>; }, "strict", z.ZodTypeAny, { version: "1.0.0"; disposition: "requeued" | "dead_lettered"; previousWorkerId: string; previousLeaseEpoch: number; leaseExpiredAt: string; recoveredAt: string; }, { version: "1.0.0"; disposition: "requeued" | "dead_lettered"; previousWorkerId: string; previousLeaseEpoch: number; leaseExpiredAt: string; recoveredAt: string; }>;
```

## `sessionCommandRecordDefinition`

由 `contracts/session-queue-schemas` 模块导出的 Session Command Record Definition 常量。

- 种类: 常量
- 导入: `import { sessionCommandRecordDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const sessionCommandRecordDefinition: SpecSchemaDefinition<SessionCommandRecord>;
```

## `sessionCommandRecordExample`

Session Command Record 的有效示例值。

- 种类: 常量
- 导入: `import { sessionCommandRecordExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const sessionCommandRecordExample: SessionCommandRecord;
```

## `sessionCommandRecordJsonSchema`

Session Command Record 的 JSON Schema。

- 种类: 常量
- 导入: `import { sessionCommandRecordJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const sessionCommandRecordJsonSchema: JsonSchema;
```

## `sessionCommandRecordSchema`

Session Command Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { sessionCommandRecordSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const sessionCommandRecordSchema: (typeof import('@codesoul-co/hypha-core'))['sessionCommandRecordSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `sessionCommandRedriveSchema`

Session Command Redrive 的运行时 Schema。

- 种类: 常量
- 导入: `import { sessionCommandRedriveSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const sessionCommandRedriveSchema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; sourceCommandId: z.ZodString; operatorId: z.ZodString; reason: z.ZodString; requestedAt: z.ZodString; }, "strict", z.ZodTypeAny, { version: "1.0.0"; reason: string; requestedAt: string; sourceCommandId: string; operatorId: string; }, { version: "1.0.0"; reason: string; requestedAt: string; sourceCommandId: string; operatorId: string; }>;
```

## `sessionCommandStatusSchema`

Session Command Status 的运行时 Schema。

- 种类: 常量
- 导入: `import { sessionCommandStatusSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const sessionCommandStatusSchema: z.ZodEnum<["queued", "claimed", "applied", "reused", "rejected", "expired", "failed", "dead_letter", "dead_letter_resolved"]>;
```

## `sessionCommandTypeSchema`

Session Command Type 的运行时 Schema。

- 种类: 常量
- 导入: `import { sessionCommandTypeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const sessionCommandTypeSchema: z.ZodEnum<["start_run", "user_input", "resume", "signal", "cancel", "transition", "continue_react", "close_session"]>;
```

## `sessionQueueContractDefinitions`

由 `contracts/session-queue-schemas` 模块导出的 Session Queue Contract Definitions 常量。

- 种类: 常量
- 导入: `import { sessionQueueContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const sessionQueueContractDefinitions: readonly [SpecSchemaDefinition<SessionCommandRecord>, SpecSchemaDefinition<CancelSessionCommandsRequest>, SpecSchemaDefinition<CancelSessionCommandsResult>, SpecSchemaDefinition<RedriveDeadLetterSessionCommandRequest>, SpecSchemaDefinition<CloseDeadLetterSessionCommandRequest>, SpecSchemaDefinition<SessionQueueHealthSnapshot>];
```

## `sessionQueueContractJsonSchemas`

由 `contracts/session-queue-schemas` 模块导出的 Session Queue Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { sessionQueueContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const sessionQueueContractJsonSchemas: Record<string, JsonSchema>;
```

## `sessionQueueHealthSnapshotDefinition`

由 `contracts/session-queue-schemas` 模块导出的 Session Queue Health Snapshot Definition 常量。

- 种类: 常量
- 导入: `import { sessionQueueHealthSnapshotDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const sessionQueueHealthSnapshotDefinition: SpecSchemaDefinition<SessionQueueHealthSnapshot>;
```

## `sessionQueueHealthSnapshotSchema`

Session Queue Health Snapshot 的运行时 Schema。

- 种类: 常量
- 导入: `import { sessionQueueHealthSnapshotSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const sessionQueueHealthSnapshotSchema: z.ZodEffects<z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; totalCommands: z.ZodNumber; pendingCommands: z.ZodNumber; queuedCommands: z.ZodNumber; claimedCommands: z.ZodNumber; deadLetterCommands: z.ZodNumber; resolvedDeadLetterCommands: z.ZodNumber; retryingCommands: z.ZodNumber; redeliveredCommands: z.ZodNumber; recoveredExpiredLeases: z.ZodNumber; leaseRecoveryCount: z.ZodNumber; oldestPendingAgeMs: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { version: "1.0.0"; totalCommands: number; pendingCommands: number; queuedCommands: number; claimedCommands: number; deadLetterCommands: number; resolvedDeadLetterCommands: number; retryingCommands: number; redeliveredCommands: number; recoveredExpiredLeases: number; leaseRecoveryCount: number; oldestPendingAgeMs?: number | undefined; }, { version: "1.0.0"; totalCommands: number; pendingCommands: number; queuedCommands: number; claimedCommands: number; deadLetterCommands: number; resolvedDeadLetterCommands: number; retryingCommands: number; redeliveredCommands: number; recoveredExpiredLeases: number; leaseRecoveryCount: number; oldestPendingAgeMs?: number | undefined; }>, { version: "1.0.0"; totalCommands: number; pendingCommands: number; queuedCommands: number; claimedCommands: number; deadLetterCommands: number; resolvedDeadLetterCommands: number; retryingCommands: number; redeliveredCommands: number; recoveredExpiredLeases: number; leaseRecoveryCount: number; oldestPendingAgeMs?: number | undefined; }, { version: "1.0.0"; totalCommands: number; pendingCommands: number; queuedCommands: number; claimedCommands: number; deadLetterCommands: number; resolvedDeadLetterCommands: number; retryingCommands: number; redeliveredCommands: number; recoveredExpiredLeases: number; leaseRecoveryCount: number; oldestPendingAgeMs?: number | undefined; }>;
```

## `sessionQueueScopeSchema`

Session Queue Scope 的运行时 Schema。

- 种类: 常量
- 导入: `import { sessionQueueScopeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare const sessionQueueScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string | undefined; }, { userId: string; sessionId: string; tenantId?: string | undefined; }>;
```

## `stuckSessionCommandSchema`

Stuck Session Command 的运行时 Schema。

- 种类: 常量
- 导入: `import { stuckSessionCommandSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const stuckSessionCommandSchema: (typeof import('@codesoul-co/hypha-core'))['stuckSessionCommandSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `validateCancelSessionCommandsRequest`

Validate Cancel Session Commands Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateCancelSessionCommandsRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare function validateCancelSessionCommandsRequest(input: unknown): CancelSessionCommandsRequest;
```

### 调用签名

```text
validateCancelSessionCommandsRequest(input: unknown): CancelSessionCommandsRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `CancelSessionCommandsRequest`
- 说明: 返回值契约由上述类型定义。

## `validateCancelSessionCommandsResult`

Validate Cancel Session Commands Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateCancelSessionCommandsResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare function validateCancelSessionCommandsResult(input: unknown): CancelSessionCommandsResult;
```

### 调用签名

```text
validateCancelSessionCommandsResult(input: unknown): CancelSessionCommandsResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `CancelSessionCommandsResult`
- 说明: 返回值契约由上述类型定义。

## `validateCloseDeadLetterSessionCommandRequest`

Validate Close Dead Letter Session Command Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateCloseDeadLetterSessionCommandRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare function validateCloseDeadLetterSessionCommandRequest(input: unknown): CloseDeadLetterSessionCommandRequest;
```

### 调用签名

```text
validateCloseDeadLetterSessionCommandRequest(input: unknown): CloseDeadLetterSessionCommandRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `CloseDeadLetterSessionCommandRequest`
- 说明: 返回值契约由上述类型定义。

## `validateListStuckSessionCommandsRequest`

Validate List Stuck Session Commands Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateListStuckSessionCommandsRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare function validateListStuckSessionCommandsRequest(input: unknown): ListStuckSessionCommandsRequest;
```

### 调用签名

```text
validateListStuckSessionCommandsRequest(input: unknown): ListStuckSessionCommandsRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ListStuckSessionCommandsRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRedriveDeadLetterSessionCommandRequest`

Validate Redrive Dead Letter Session Command Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRedriveDeadLetterSessionCommandRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare function validateRedriveDeadLetterSessionCommandRequest(input: unknown): RedriveDeadLetterSessionCommandRequest;
```

### 调用签名

```text
validateRedriveDeadLetterSessionCommandRequest(input: unknown): RedriveDeadLetterSessionCommandRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RedriveDeadLetterSessionCommandRequest`
- 说明: 返回值契约由上述类型定义。

## `validateSessionCommandRecord`

Validate Session Command Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateSessionCommandRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare function validateSessionCommandRecord(input: unknown): SessionCommandRecord;
```

### 调用签名

```text
validateSessionCommandRecord(input: unknown): SessionCommandRecord
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SessionCommandRecord`
- 说明: 返回值契约由上述类型定义。

## `validateSessionQueueHealthSnapshot`

Validate Session Queue Health Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateSessionQueueHealthSnapshot } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare function validateSessionQueueHealthSnapshot(input: unknown): SessionQueueHealthSnapshot;
```

### 调用签名

```text
validateSessionQueueHealthSnapshot(input: unknown): SessionQueueHealthSnapshot
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SessionQueueHealthSnapshot`
- 说明: 返回值契约由上述类型定义。

## `validateStuckSessionCommand`

Validate Stuck Session Command 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateStuckSessionCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### 声明

```text
export declare function validateStuckSessionCommand(input: unknown): StuckSessionCommand;
```

### 调用签名

```text
validateStuckSessionCommand(input: unknown): StuckSessionCommand
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StuckSessionCommand`
- 说明: 返回值契约由上述类型定义。
