# `@codesoul-co/hypha-core` / `contracts/session-queue-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/session-queue-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)
- Exports: **32**

## Using this module

Use the Session queue schemas module for declaring and runtime-validating contracts. It exports 24 constants, 8 functions.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 8 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 24 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { cancelSessionCommandsRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = cancelSessionCommandsRequestSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancelSessionCommandsRequestDefinition` | constant | <code>const cancelSessionCommandsRequestDefinition: SpecSchemaDefinition&lt;CancelSessionCommandsRequest&gt;</code> | Cancel Session Commands Request Definition constant exported by the `contracts/session-queue-schemas` module. |
| `cancelSessionCommandsRequestSchema` | constant | <code>const cancelSessionCommandsRequestSchema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }&gt;; targetRunId: z.ZodString; cancellationCommandId: z.ZodS...</code> | Runtime schema for Cancel Session Commands Request. |
| `cancelSessionCommandsResultDefinition` | constant | <code>const cancelSessionCommandsResultDefinition: SpecSchemaDefinition&lt;CancelSessionCommandsResult&gt;</code> | Cancel Session Commands Result Definition constant exported by the `contracts/session-queue-schemas` module. |
| `cancelSessionCommandsResultSchema` | constant | <code>const cancelSessionCommandsResultSchema: z.ZodObject&lt;{ targetRunId: z.ZodString; cancelledCommandIds: z.ZodArray&lt;z.ZodString, "many"&gt;; alreadyCancelledCommandIds: z.ZodArray&lt;z.ZodString, "many"&gt;; alreadyTerminalCommandIds: z.ZodArray&lt;z.ZodString, "many"&gt;; }, "strict", z.ZodTypeAny, { targetRunId: string; cancelledCommandIds: string[]; alreadyCancelledCommandIds: string[]; alreadyTerminalCommandIds: string[]; }, { ...</code> | Runtime schema for Cancel Session Commands Result. |
| `closeDeadLetterSessionCommandRequestDefinition` | constant | <code>const closeDeadLetterSessionCommandRequestDefinition: SpecSchemaDefinition&lt;CloseDeadLetterSessionCommandRequest&gt;</code> | Close Dead Letter Session Command Request Definition constant exported by the `contracts/session-queue-schemas` module. |
| `closeDeadLetterSessionCommandRequestSchema` | constant | <code>const closeDeadLetterSessionCommandRequestSchema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }&gt;; commandId: z.ZodString; operatorId: z.ZodString...</code> | Runtime schema for Close Dead Letter Session Command Request. |
| `listStuckSessionCommandsRequestSchema` | constant | <code>const listStuckSessionCommandsRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }&gt;; checkedAt: z.ZodString; graceMs: z.ZodOptional&lt;z.ZodNumber&gt;; limit: z.ZodOptional&lt;z....</code> | Runtime schema for List Stuck Session Commands Request. |
| `redriveDeadLetterSessionCommandRequestDefinition` | constant | <code>const redriveDeadLetterSessionCommandRequestDefinition: SpecSchemaDefinition&lt;RedriveDeadLetterSessionCommandRequest&gt;</code> | Redrive Dead Letter Session Command Request Definition constant exported by the `contracts/session-queue-schemas` module. |
| `redriveDeadLetterSessionCommandRequestSchema` | constant | <code>const redriveDeadLetterSessionCommandRequestSchema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }&gt;; sourceCommandId: z.ZodString; id: z.ZodString...</code> | Runtime schema for Redrive Dead Letter Session Command Request. |
| `sessionCommandDeadLetterResolutionSchema` | constant | <code>const sessionCommandDeadLetterResolutionSchema: z.ZodEffects&lt;z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; disposition: z.ZodEnum&lt;["redriven", "closed"]&gt;; operatorId: z.ZodString; reason: z.ZodString; resolvedAt: z.ZodString; redriveCommandId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { version: "1.0.0"; reason: string; disposition: "closed" &#124; "redriven"; resolvedAt: string; operatorId: string; redriv...</code> | Runtime schema for Session Command Dead Letter Resolution. |
| `sessionCommandLeaseRecoverySchema` | constant | <code>const sessionCommandLeaseRecoverySchema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; previousWorkerId: z.ZodString; previousLeaseEpoch: z.ZodNumber; leaseExpiredAt: z.ZodString; recoveredAt: z.ZodString; disposition: z.ZodEnum&lt;["requeued", "dead_lettered"]&gt;; }, "strict", z.ZodTypeAny, { version: "1.0.0"; disposition: "requeued" &#124; "dead_lettered"; previousWorkerId: string; previousLeaseEpoch: number; leaseExpired...</code> | Runtime schema for Session Command Lease Recovery. |
| `sessionCommandRecordDefinition` | constant | <code>const sessionCommandRecordDefinition: SpecSchemaDefinition&lt;SessionCommandRecord&gt;</code> | Session Command Record Definition constant exported by the `contracts/session-queue-schemas` module. |
| `sessionCommandRecordExample` | constant | <code>const sessionCommandRecordExample: SessionCommandRecord</code> | Valid example value for Session Command Record. |
| `sessionCommandRecordJsonSchema` | constant | <code>const sessionCommandRecordJsonSchema: JsonSchema</code> | JSON Schema for Session Command Record. |
| `sessionCommandRecordSchema` | constant | <code>const sessionCommandRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; commandType: z.ZodEnum&lt;["start_run", "user_input", "resume", "signal", "cancel", "transition", "continue_react", "close_session"]&gt;; idempotencyKey: z.ZodString; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; targetRunId: z.ZodOptional&lt;z.ZodString&gt;; enqueueSequen...</code> | Runtime schema for Session Command Record. |
| `sessionCommandRedriveSchema` | constant | <code>const sessionCommandRedriveSchema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; sourceCommandId: z.ZodString; operatorId: z.ZodString; reason: z.ZodString; requestedAt: z.ZodString; }, "strict", z.ZodTypeAny, { version: "1.0.0"; reason: string; requestedAt: string; sourceCommandId: string; operatorId: string; }, { version: "1.0.0"; reason: string; requestedAt: string; sourceCommandId: string; operatorId: string; }&gt;</code> | Runtime schema for Session Command Redrive. |
| `sessionCommandStatusSchema` | constant | <code>const sessionCommandStatusSchema: z.ZodEnum&lt;["queued", "claimed", "applied", "reused", "rejected", "expired", "failed", "dead_letter", "dead_letter_resolved"]&gt;</code> | Runtime schema for Session Command Status. |
| `sessionCommandTypeSchema` | constant | <code>const sessionCommandTypeSchema: z.ZodEnum&lt;["start_run", "user_input", "resume", "signal", "cancel", "transition", "continue_react", "close_session"]&gt;</code> | Runtime schema for Session Command Type. |
| `sessionQueueContractDefinitions` | constant | <code>const sessionQueueContractDefinitions: readonly [SpecSchemaDefinition&lt;SessionCommandRecord&gt;, SpecSchemaDefinition&lt;CancelSessionCommandsRequest&gt;, SpecSchemaDefinition&lt;CancelSessionCommandsResult&gt;, SpecSchemaDefinition&lt;RedriveDeadLetterSessionCommandRequest&gt;, SpecSchemaDefinition&lt;CloseDeadLetterSessionCommandRequest&gt;, SpecSchemaDefinition&lt;SessionQueueHealthSnapshot&gt;]</code> | Session Queue Contract Definitions constant exported by the `contracts/session-queue-schemas` module. |
| `sessionQueueContractJsonSchemas` | constant | <code>const sessionQueueContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Session Queue Contract JSON Schemas constant exported by the `contracts/session-queue-schemas` module. |
| `sessionQueueHealthSnapshotDefinition` | constant | <code>const sessionQueueHealthSnapshotDefinition: SpecSchemaDefinition&lt;SessionQueueHealthSnapshot&gt;</code> | Session Queue Health Snapshot Definition constant exported by the `contracts/session-queue-schemas` module. |
| `sessionQueueHealthSnapshotSchema` | constant | <code>const sessionQueueHealthSnapshotSchema: z.ZodEffects&lt;z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; totalCommands: z.ZodNumber; pendingCommands: z.ZodNumber; queuedCommands: z.ZodNumber; claimedCommands: z.ZodNumber; deadLetterCommands: z.ZodNumber; resolvedDeadLetterCommands: z.ZodNumber; retryingCommands: z.ZodNumber; redeliveredCommands: z.ZodNumber; recoveredExpiredLeases: z.ZodNumber; leaseRecoveryCount: z.Zod...</code> | Runtime schema for Session Queue Health Snapshot. |
| `sessionQueueScopeSchema` | constant | <code>const sessionQueueScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }, { userId: string; sessionId: string; tenantId?: string &#124; undefined; }&gt;</code> | Runtime schema for Session Queue Scope. |
| `stuckSessionCommandSchema` | constant | <code>const stuckSessionCommandSchema: z.ZodObject&lt;{ command: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; commandType: z.ZodEnum&lt;["start_run", "user_input", "resume", "signal", "cancel", "transition", "continue_react", "close_session"]&gt;; idempotencyKey: z.ZodString; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; targetRunId: z.ZodOptional&lt;z.Zod...</code> | Runtime schema for Stuck Session Command. |
| `validateCancelSessionCommandsRequest` | function | <code>validateCancelSessionCommandsRequest(input: unknown): CancelSessionCommandsRequest</code> | Validate Cancel Session Commands Request function with 1 public call signature; parameters and return types are listed below. |
| `validateCancelSessionCommandsResult` | function | <code>validateCancelSessionCommandsResult(input: unknown): CancelSessionCommandsResult</code> | Validate Cancel Session Commands Result function with 1 public call signature; parameters and return types are listed below. |
| `validateCloseDeadLetterSessionCommandRequest` | function | <code>validateCloseDeadLetterSessionCommandRequest(input: unknown): CloseDeadLetterSessionCommandRequest</code> | Validate Close Dead Letter Session Command Request function with 1 public call signature; parameters and return types are listed below. |
| `validateListStuckSessionCommandsRequest` | function | <code>validateListStuckSessionCommandsRequest(input: unknown): ListStuckSessionCommandsRequest</code> | Validate List Stuck Session Commands Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRedriveDeadLetterSessionCommandRequest` | function | <code>validateRedriveDeadLetterSessionCommandRequest(input: unknown): RedriveDeadLetterSessionCommandRequest</code> | Validate Redrive Dead Letter Session Command Request function with 1 public call signature; parameters and return types are listed below. |
| `validateSessionCommandRecord` | function | <code>validateSessionCommandRecord(input: unknown): SessionCommandRecord</code> | Validate Session Command Record function with 1 public call signature; parameters and return types are listed below. |
| `validateSessionQueueHealthSnapshot` | function | <code>validateSessionQueueHealthSnapshot(input: unknown): SessionQueueHealthSnapshot</code> | Validate Session Queue Health Snapshot function with 1 public call signature; parameters and return types are listed below. |
| `validateStuckSessionCommand` | function | <code>validateStuckSessionCommand(input: unknown): StuckSessionCommand</code> | Validate Stuck Session Command function with 1 public call signature; parameters and return types are listed below. |

## `cancelSessionCommandsRequestDefinition`

Cancel Session Commands Request Definition constant exported by the `contracts/session-queue-schemas` module.

- Kind: constant
- Import: `import { cancelSessionCommandsRequestDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const cancelSessionCommandsRequestDefinition: SpecSchemaDefinition<CancelSessionCommandsRequest>;
```

## `cancelSessionCommandsRequestSchema`

Runtime schema for Cancel Session Commands Request.

- Kind: constant
- Import: `import { cancelSessionCommandsRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const cancelSessionCommandsRequestSchema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string | undefined; }, { userId: string; sessionId: string; tenantId?: string | undefined; }>; targetRunId: z.ZodString; cancellationCommandId: z.ZodString; reason: z.ZodString; cancelledAt: z.ZodString; }, "strict", z.ZodTypeAny, { version: "1.0.0"; reason: string; scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; targetRunId: string; cancellationCommandId: string; cancelledAt: string; }, { version: "1.0.0"; reason: string; scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; targetRunId: string; cancellationCommandId: string; cancelledAt: string; }>;
```

## `cancelSessionCommandsResultDefinition`

Cancel Session Commands Result Definition constant exported by the `contracts/session-queue-schemas` module.

- Kind: constant
- Import: `import { cancelSessionCommandsResultDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const cancelSessionCommandsResultDefinition: SpecSchemaDefinition<CancelSessionCommandsResult>;
```

## `cancelSessionCommandsResultSchema`

Runtime schema for Cancel Session Commands Result.

- Kind: constant
- Import: `import { cancelSessionCommandsResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const cancelSessionCommandsResultSchema: z.ZodObject<{ targetRunId: z.ZodString; cancelledCommandIds: z.ZodArray<z.ZodString, "many">; alreadyCancelledCommandIds: z.ZodArray<z.ZodString, "many">; alreadyTerminalCommandIds: z.ZodArray<z.ZodString, "many">; }, "strict", z.ZodTypeAny, { targetRunId: string; cancelledCommandIds: string[]; alreadyCancelledCommandIds: string[]; alreadyTerminalCommandIds: string[]; }, { targetRunId: string; cancelledCommandIds: string[]; alreadyCancelledCommandIds: string[]; alreadyTerminalCommandIds: string[]; }>;
```

## `closeDeadLetterSessionCommandRequestDefinition`

Close Dead Letter Session Command Request Definition constant exported by the `contracts/session-queue-schemas` module.

- Kind: constant
- Import: `import { closeDeadLetterSessionCommandRequestDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const closeDeadLetterSessionCommandRequestDefinition: SpecSchemaDefinition<CloseDeadLetterSessionCommandRequest>;
```

## `closeDeadLetterSessionCommandRequestSchema`

Runtime schema for Close Dead Letter Session Command Request.

- Kind: constant
- Import: `import { closeDeadLetterSessionCommandRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const closeDeadLetterSessionCommandRequestSchema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string | undefined; }, { userId: string; sessionId: string; tenantId?: string | undefined; }>; commandId: z.ZodString; operatorId: z.ZodString; reason: z.ZodString; closedAt: z.ZodString; }, "strict", z.ZodTypeAny, { version: "1.0.0"; reason: string; scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; commandId: string; operatorId: string; closedAt: string; }, { version: "1.0.0"; reason: string; scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; commandId: string; operatorId: string; closedAt: string; }>;
```

## `listStuckSessionCommandsRequestSchema`

Runtime schema for List Stuck Session Commands Request.

- Kind: constant
- Import: `import { listStuckSessionCommandsRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const listStuckSessionCommandsRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string | undefined; }, { userId: string; sessionId: string; tenantId?: string | undefined; }>; checkedAt: z.ZodString; graceMs: z.ZodOptional<z.ZodNumber>; limit: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; checkedAt: string; limit?: number | undefined; graceMs?: number | undefined; }, { scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; checkedAt: string; limit?: number | undefined; graceMs?: number | undefined; }>;
```

## `redriveDeadLetterSessionCommandRequestDefinition`

Redrive Dead Letter Session Command Request Definition constant exported by the `contracts/session-queue-schemas` module.

- Kind: constant
- Import: `import { redriveDeadLetterSessionCommandRequestDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const redriveDeadLetterSessionCommandRequestDefinition: SpecSchemaDefinition<RedriveDeadLetterSessionCommandRequest>;
```

## `redriveDeadLetterSessionCommandRequestSchema`

Runtime schema for Redrive Dead Letter Session Command Request.

- Kind: constant
- Import: `import { redriveDeadLetterSessionCommandRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const redriveDeadLetterSessionCommandRequestSchema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string | undefined; }, { userId: string; sessionId: string; tenantId?: string | undefined; }>; sourceCommandId: z.ZodString; id: z.ZodString; idempotencyKey: z.ZodString; operatorId: z.ZodString; reason: z.ZodString; requestedAt: z.ZodOptional<z.ZodString>; availableAt: z.ZodOptional<z.ZodString>; expiresAt: z.ZodOptional<z.ZodString>; priority: z.ZodOptional<z.ZodNumber>; maxAttempts: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { id: string; version: "1.0.0"; reason: string; idempotencyKey: string; scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; sourceCommandId: string; operatorId: string; expiresAt?: string | undefined; requestedAt?: string | undefined; maxAttempts?: number | undefined; priority?: number | undefined; availableAt?: string | undefined; }, { id: string; version: "1.0.0"; reason: string; idempotencyKey: string; scope: { userId: string; sessionId: string; tenantId?: string | undefined; }; sourceCommandId: string; operatorId: string; expiresAt?: string | undefined; requestedAt?: string | undefined; maxAttempts?: number | undefined; priority?: number | undefined; availableAt?: string | undefined; }>;
```

## `sessionCommandDeadLetterResolutionSchema`

Runtime schema for Session Command Dead Letter Resolution.

- Kind: constant
- Import: `import { sessionCommandDeadLetterResolutionSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const sessionCommandDeadLetterResolutionSchema: z.ZodEffects<z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; disposition: z.ZodEnum<["redriven", "closed"]>; operatorId: z.ZodString; reason: z.ZodString; resolvedAt: z.ZodString; redriveCommandId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { version: "1.0.0"; reason: string; disposition: "closed" | "redriven"; resolvedAt: string; operatorId: string; redriveCommandId?: string | undefined; }, { version: "1.0.0"; reason: string; disposition: "closed" | "redriven"; resolvedAt: string; operatorId: string; redriveCommandId?: string | undefined; }>, { version: "1.0.0"; reason: string; disposition: "closed" | "redriven"; resolvedAt: string; operatorId: string; redriveCommandId?: string | undefined; }, { version: "1.0.0"; reason: string; disposition: "closed" | "redriven"; resolvedAt: string; operatorId: string; redriveCommandId?: string | undefined; }>;
```

## `sessionCommandLeaseRecoverySchema`

Runtime schema for Session Command Lease Recovery.

- Kind: constant
- Import: `import { sessionCommandLeaseRecoverySchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const sessionCommandLeaseRecoverySchema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; previousWorkerId: z.ZodString; previousLeaseEpoch: z.ZodNumber; leaseExpiredAt: z.ZodString; recoveredAt: z.ZodString; disposition: z.ZodEnum<["requeued", "dead_lettered"]>; }, "strict", z.ZodTypeAny, { version: "1.0.0"; disposition: "requeued" | "dead_lettered"; previousWorkerId: string; previousLeaseEpoch: number; leaseExpiredAt: string; recoveredAt: string; }, { version: "1.0.0"; disposition: "requeued" | "dead_lettered"; previousWorkerId: string; previousLeaseEpoch: number; leaseExpiredAt: string; recoveredAt: string; }>;
```

## `sessionCommandRecordDefinition`

Session Command Record Definition constant exported by the `contracts/session-queue-schemas` module.

- Kind: constant
- Import: `import { sessionCommandRecordDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const sessionCommandRecordDefinition: SpecSchemaDefinition<SessionCommandRecord>;
```

## `sessionCommandRecordExample`

Valid example value for Session Command Record.

- Kind: constant
- Import: `import { sessionCommandRecordExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const sessionCommandRecordExample: SessionCommandRecord;
```

## `sessionCommandRecordJsonSchema`

JSON Schema for Session Command Record.

- Kind: constant
- Import: `import { sessionCommandRecordJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const sessionCommandRecordJsonSchema: JsonSchema;
```

## `sessionCommandRecordSchema`

Runtime schema for Session Command Record.

- Kind: constant
- Import: `import { sessionCommandRecordSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const sessionCommandRecordSchema: (typeof import('@codesoul-co/hypha-core'))['sessionCommandRecordSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `sessionCommandRedriveSchema`

Runtime schema for Session Command Redrive.

- Kind: constant
- Import: `import { sessionCommandRedriveSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const sessionCommandRedriveSchema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; sourceCommandId: z.ZodString; operatorId: z.ZodString; reason: z.ZodString; requestedAt: z.ZodString; }, "strict", z.ZodTypeAny, { version: "1.0.0"; reason: string; requestedAt: string; sourceCommandId: string; operatorId: string; }, { version: "1.0.0"; reason: string; requestedAt: string; sourceCommandId: string; operatorId: string; }>;
```

## `sessionCommandStatusSchema`

Runtime schema for Session Command Status.

- Kind: constant
- Import: `import { sessionCommandStatusSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const sessionCommandStatusSchema: z.ZodEnum<["queued", "claimed", "applied", "reused", "rejected", "expired", "failed", "dead_letter", "dead_letter_resolved"]>;
```

## `sessionCommandTypeSchema`

Runtime schema for Session Command Type.

- Kind: constant
- Import: `import { sessionCommandTypeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const sessionCommandTypeSchema: z.ZodEnum<["start_run", "user_input", "resume", "signal", "cancel", "transition", "continue_react", "close_session"]>;
```

## `sessionQueueContractDefinitions`

Session Queue Contract Definitions constant exported by the `contracts/session-queue-schemas` module.

- Kind: constant
- Import: `import { sessionQueueContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const sessionQueueContractDefinitions: readonly [SpecSchemaDefinition<SessionCommandRecord>, SpecSchemaDefinition<CancelSessionCommandsRequest>, SpecSchemaDefinition<CancelSessionCommandsResult>, SpecSchemaDefinition<RedriveDeadLetterSessionCommandRequest>, SpecSchemaDefinition<CloseDeadLetterSessionCommandRequest>, SpecSchemaDefinition<SessionQueueHealthSnapshot>];
```

## `sessionQueueContractJsonSchemas`

Session Queue Contract JSON Schemas constant exported by the `contracts/session-queue-schemas` module.

- Kind: constant
- Import: `import { sessionQueueContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const sessionQueueContractJsonSchemas: Record<string, JsonSchema>;
```

## `sessionQueueHealthSnapshotDefinition`

Session Queue Health Snapshot Definition constant exported by the `contracts/session-queue-schemas` module.

- Kind: constant
- Import: `import { sessionQueueHealthSnapshotDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const sessionQueueHealthSnapshotDefinition: SpecSchemaDefinition<SessionQueueHealthSnapshot>;
```

## `sessionQueueHealthSnapshotSchema`

Runtime schema for Session Queue Health Snapshot.

- Kind: constant
- Import: `import { sessionQueueHealthSnapshotSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const sessionQueueHealthSnapshotSchema: z.ZodEffects<z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; totalCommands: z.ZodNumber; pendingCommands: z.ZodNumber; queuedCommands: z.ZodNumber; claimedCommands: z.ZodNumber; deadLetterCommands: z.ZodNumber; resolvedDeadLetterCommands: z.ZodNumber; retryingCommands: z.ZodNumber; redeliveredCommands: z.ZodNumber; recoveredExpiredLeases: z.ZodNumber; leaseRecoveryCount: z.ZodNumber; oldestPendingAgeMs: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { version: "1.0.0"; totalCommands: number; pendingCommands: number; queuedCommands: number; claimedCommands: number; deadLetterCommands: number; resolvedDeadLetterCommands: number; retryingCommands: number; redeliveredCommands: number; recoveredExpiredLeases: number; leaseRecoveryCount: number; oldestPendingAgeMs?: number | undefined; }, { version: "1.0.0"; totalCommands: number; pendingCommands: number; queuedCommands: number; claimedCommands: number; deadLetterCommands: number; resolvedDeadLetterCommands: number; retryingCommands: number; redeliveredCommands: number; recoveredExpiredLeases: number; leaseRecoveryCount: number; oldestPendingAgeMs?: number | undefined; }>, { version: "1.0.0"; totalCommands: number; pendingCommands: number; queuedCommands: number; claimedCommands: number; deadLetterCommands: number; resolvedDeadLetterCommands: number; retryingCommands: number; redeliveredCommands: number; recoveredExpiredLeases: number; leaseRecoveryCount: number; oldestPendingAgeMs?: number | undefined; }, { version: "1.0.0"; totalCommands: number; pendingCommands: number; queuedCommands: number; claimedCommands: number; deadLetterCommands: number; resolvedDeadLetterCommands: number; retryingCommands: number; redeliveredCommands: number; recoveredExpiredLeases: number; leaseRecoveryCount: number; oldestPendingAgeMs?: number | undefined; }>;
```

## `sessionQueueScopeSchema`

Runtime schema for Session Queue Scope.

- Kind: constant
- Import: `import { sessionQueueScopeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare const sessionQueueScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; sessionId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; tenantId?: string | undefined; }, { userId: string; sessionId: string; tenantId?: string | undefined; }>;
```

## `stuckSessionCommandSchema`

Runtime schema for Stuck Session Command.

- Kind: constant
- Import: `import { stuckSessionCommandSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const stuckSessionCommandSchema: (typeof import('@codesoul-co/hypha-core'))['stuckSessionCommandSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `validateCancelSessionCommandsRequest`

Validate Cancel Session Commands Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateCancelSessionCommandsRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare function validateCancelSessionCommandsRequest(input: unknown): CancelSessionCommandsRequest;
```

### Call signature

```text
validateCancelSessionCommandsRequest(input: unknown): CancelSessionCommandsRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `CancelSessionCommandsRequest`
- Description: The return contract is defined by the type shown above.

## `validateCancelSessionCommandsResult`

Validate Cancel Session Commands Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateCancelSessionCommandsResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare function validateCancelSessionCommandsResult(input: unknown): CancelSessionCommandsResult;
```

### Call signature

```text
validateCancelSessionCommandsResult(input: unknown): CancelSessionCommandsResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `CancelSessionCommandsResult`
- Description: The return contract is defined by the type shown above.

## `validateCloseDeadLetterSessionCommandRequest`

Validate Close Dead Letter Session Command Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateCloseDeadLetterSessionCommandRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare function validateCloseDeadLetterSessionCommandRequest(input: unknown): CloseDeadLetterSessionCommandRequest;
```

### Call signature

```text
validateCloseDeadLetterSessionCommandRequest(input: unknown): CloseDeadLetterSessionCommandRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `CloseDeadLetterSessionCommandRequest`
- Description: The return contract is defined by the type shown above.

## `validateListStuckSessionCommandsRequest`

Validate List Stuck Session Commands Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateListStuckSessionCommandsRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare function validateListStuckSessionCommandsRequest(input: unknown): ListStuckSessionCommandsRequest;
```

### Call signature

```text
validateListStuckSessionCommandsRequest(input: unknown): ListStuckSessionCommandsRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ListStuckSessionCommandsRequest`
- Description: The return contract is defined by the type shown above.

## `validateRedriveDeadLetterSessionCommandRequest`

Validate Redrive Dead Letter Session Command Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRedriveDeadLetterSessionCommandRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare function validateRedriveDeadLetterSessionCommandRequest(input: unknown): RedriveDeadLetterSessionCommandRequest;
```

### Call signature

```text
validateRedriveDeadLetterSessionCommandRequest(input: unknown): RedriveDeadLetterSessionCommandRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RedriveDeadLetterSessionCommandRequest`
- Description: The return contract is defined by the type shown above.

## `validateSessionCommandRecord`

Validate Session Command Record function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateSessionCommandRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare function validateSessionCommandRecord(input: unknown): SessionCommandRecord;
```

### Call signature

```text
validateSessionCommandRecord(input: unknown): SessionCommandRecord
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SessionCommandRecord`
- Description: The return contract is defined by the type shown above.

## `validateSessionQueueHealthSnapshot`

Validate Session Queue Health Snapshot function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateSessionQueueHealthSnapshot } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare function validateSessionQueueHealthSnapshot(input: unknown): SessionQueueHealthSnapshot;
```

### Call signature

```text
validateSessionQueueHealthSnapshot(input: unknown): SessionQueueHealthSnapshot
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SessionQueueHealthSnapshot`
- Description: The return contract is defined by the type shown above.

## `validateStuckSessionCommand`

Validate Stuck Session Command function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateStuckSessionCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue-schemas.ts)

### Declaration

```text
export declare function validateStuckSessionCommand(input: unknown): StuckSessionCommand;
```

### Call signature

```text
validateStuckSessionCommand(input: unknown): StuckSessionCommand
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StuckSessionCommand`
- Description: The return contract is defined by the type shown above.
