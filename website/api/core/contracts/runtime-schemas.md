# `@codesoul-co/hypha-core` / `contracts/runtime-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)
- Exports: **48**

## Using this module

Use the Runtime schemas module for declaring and runtime-validating contracts. It exports 40 constants, 8 functions.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 8 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 40 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { normalizedRuntimeErrorSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = normalizedRuntimeErrorSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `normalizedRuntimeErrorDefinition` | constant | <code>const normalizedRuntimeErrorDefinition: SpecSchemaDefinition&lt;NormalizedRuntimeError&gt;</code> | Normalized Runtime Error Definition constant exported by the `contracts/runtime-schemas` module. |
| `normalizedRuntimeErrorExample` | constant | <code>const normalizedRuntimeErrorExample: NormalizedRuntimeError</code> | Valid example value for Normalized Runtime Error. |
| `normalizedRuntimeErrorJsonSchema` | constant | <code>const normalizedRuntimeErrorJsonSchema: JsonSchema</code> | JSON Schema for Normalized Runtime Error. |
| `normalizedRuntimeErrorSchema` | constant | <code>const normalizedRuntimeErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW"...</code> | Runtime schema for Normalized Runtime Error. |
| `runSignalRequestDefinition` | constant | <code>const runSignalRequestDefinition: SpecSchemaDefinition&lt;RunSignalRequest&gt;</code> | Run Signal Request Definition constant exported by the `contracts/runtime-schemas` module. |
| `runSignalRequestExample` | constant | <code>const runSignalRequestExample: RunSignalRequest</code> | Valid example value for Run Signal Request. |
| `runSignalRequestJsonSchema` | constant | <code>const runSignalRequestJsonSchema: JsonSchema</code> | JSON Schema for Run Signal Request. |
| `runSignalRequestSchema` | constant | <code>const runSignalRequestSchema: z.ZodObject&lt;{ signalId: z.ZodString; runId: z.ZodString; key: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodStri...</code> | Runtime schema for Run Signal Request. |
| `runtimeContractDefinitions` | constant | <code>const runtimeContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeScope&gt;, SpecSchemaDefinition&lt;RuntimePrincipal&gt;, SpecSchemaDefinition&lt;NormalizedRuntimeError&gt;, SpecSchemaDefinition&lt;RuntimeSession&gt;, SpecSchemaDefinition&lt;RuntimeRun&gt;, SpecSchemaDefinition&lt;RuntimeWaitRequest&gt;, SpecSchemaDefinition&lt;RuntimeWaitRecord&gt;, SpecSchemaDefinition&lt;RunSignalRequest&gt;]</code> | Runtime Contract Definitions constant exported by the `contracts/runtime-schemas` module. |
| `runtimeContractJsonSchemas` | constant | <code>const runtimeContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Runtime Contract JSON Schemas constant exported by the `contracts/runtime-schemas` module. |
| `runtimeErrorCodeSchema` | constant | <code>const runtimeErrorCodeSchema: z.ZodEnum&lt;["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW", "RUNTIME_RUN_NOT_FOUND",...</code> | Runtime schema for Runtime Error Code. |
| `runtimePrincipalDefinition` | constant | <code>const runtimePrincipalDefinition: SpecSchemaDefinition&lt;RuntimePrincipal&gt;</code> | Runtime Principal Definition constant exported by the `contracts/runtime-schemas` module. |
| `runtimePrincipalExample` | constant | <code>const runtimePrincipalExample: RuntimePrincipal</code> | Valid example value for Runtime Principal. |
| `runtimePrincipalJsonSchema` | constant | <code>const runtimePrincipalJsonSchema: JsonSchema</code> | JSON Schema for Runtime Principal. |
| `runtimePrincipalSchema` | constant | <code>const runtimePrincipalSchema: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodType&lt;JsonValue, z.Z...</code> | Runtime schema for Runtime Principal. |
| `runtimePrincipalTypeSchema` | constant | <code>const runtimePrincipalTypeSchema: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;</code> | Runtime schema for Runtime Principal Type. |
| `runtimeRunDefinition` | constant | <code>const runtimeRunDefinition: SpecSchemaDefinition&lt;RuntimeRun&gt;</code> | Runtime Run Definition constant exported by the `contracts/runtime-schemas` module. |
| `runtimeRunExample` | constant | <code>const runtimeRunExample: RuntimeRun</code> | Valid example value for Runtime Run. |
| `runtimeRunJsonSchema` | constant | <code>const runtimeRunJsonSchema: JsonSchema</code> | JSON Schema for Runtime Run. |
| `runtimeRunSchema` | constant | <code>const runtimeRunSchema: z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; domainPackRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?:...</code> | Runtime schema for Runtime Run. |
| `runtimeRunStatusSchema` | constant | <code>const runtimeRunStatusSchema: z.ZodEnum&lt;["created", "queued", "starting", "acquiring", "running", "waiting", "waiting_human", "waiting_signal", "waiting_timer", "pausing", "paused", "retry_scheduled", "recovering", "cancelling", "completed", "failed", "cancelled", "timed_out"]&gt;</code> | Runtime schema for Runtime Run Status. |
| `runtimeScopeDefinition` | constant | <code>const runtimeScopeDefinition: SpecSchemaDefinition&lt;RuntimeScope&gt;</code> | Runtime Scope Definition constant exported by the `contracts/runtime-schemas` module. |
| `runtimeScopeExample` | constant | <code>const runtimeScopeExample: RuntimeScope</code> | Valid example value for Runtime Scope. |
| `runtimeScopeJsonSchema` | constant | <code>const runtimeScopeJsonSchema: JsonSchema</code> | JSON Schema for Runtime Scope. |
| `runtimeScopeSchema` | constant | <code>const runtimeScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; runId: string; tenantId?: string &#124; undefined; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; }, { userId: string; s...</code> | Runtime schema for Runtime Scope. |
| `runtimeSessionDefinition` | constant | <code>const runtimeSessionDefinition: SpecSchemaDefinition&lt;RuntimeSession&gt;</code> | Runtime Session Definition constant exported by the `contracts/runtime-schemas` module. |
| `runtimeSessionExample` | constant | <code>const runtimeSessionExample: RuntimeSession</code> | Valid example value for Runtime Session. |
| `runtimeSessionJsonSchema` | constant | <code>const runtimeSessionJsonSchema: JsonSchema</code> | JSON Schema for Runtime Session. |
| `runtimeSessionSchema` | constant | <code>const runtimeSessionSchema: z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; domainPackRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined;...</code> | Runtime schema for Runtime Session. |
| `runtimeSessionStatusSchema` | constant | <code>const runtimeSessionStatusSchema: z.ZodEnum&lt;["active", "closed", "archived"]&gt;</code> | Runtime schema for Runtime Session Status. |
| `runtimeWaitRecordDefinition` | constant | <code>const runtimeWaitRecordDefinition: SpecSchemaDefinition&lt;RuntimeWaitRecord&gt;</code> | Runtime Wait Record Definition constant exported by the `contracts/runtime-schemas` module. |
| `runtimeWaitRecordExample` | constant | <code>const runtimeWaitRecordExample: RuntimeWaitRecord</code> | Valid example value for Runtime Wait Record. |
| `runtimeWaitRecordJsonSchema` | constant | <code>const runtimeWaitRecordJsonSchema: JsonSchema</code> | JSON Schema for Runtime Wait Record. |
| `runtimeWaitRecordSchema` | constant | <code>const runtimeWaitRecordSchema: z.ZodObject&lt;{ id: z.ZodString; runId: z.ZodString; stateId: z.ZodString; type: z.ZodEnum&lt;["human", "signal", "timer", "external_operation"]&gt;; key: z.ZodOptional&lt;z.ZodString&gt;; status: z.ZodEnum&lt;["waiting", "received", "expired", "cancelled"]&gt;; expectedSchemaHash: z.ZodOptional&lt;z.ZodString&gt;; createdAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; resolvedAt: z.ZodOptional&lt;z.ZodS...</code> | Runtime schema for Runtime Wait Record. |
| `runtimeWaitRequestDefinition` | constant | <code>const runtimeWaitRequestDefinition: SpecSchemaDefinition&lt;RuntimeWaitRequest&gt;</code> | Runtime Wait Request Definition constant exported by the `contracts/runtime-schemas` module. |
| `runtimeWaitRequestExample` | constant | <code>const runtimeWaitRequestExample: RuntimeWaitRequest</code> | Valid example value for Runtime Wait Request. |
| `runtimeWaitRequestJsonSchema` | constant | <code>const runtimeWaitRequestJsonSchema: JsonSchema</code> | JSON Schema for Runtime Wait Request. |
| `runtimeWaitRequestSchema` | constant | <code>const runtimeWaitRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ type: z.ZodEnum&lt;["human", "signal", "timer", "external_operation"]&gt;; key: z.ZodOptional&lt;z.ZodString&gt;; expectedSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; timeoutTransitionId: z.ZodOptional&lt;z.ZodString&gt;; pendingActionRef: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodS...</code> | Runtime schema for Runtime Wait Request. |
| `runtimeWaitStatusSchema` | constant | <code>const runtimeWaitStatusSchema: z.ZodEnum&lt;["waiting", "received", "expired", "cancelled"]&gt;</code> | Runtime schema for Runtime Wait Status. |
| `runtimeWaitTypeSchema` | constant | <code>const runtimeWaitTypeSchema: z.ZodEnum&lt;["human", "signal", "timer", "external_operation"]&gt;</code> | Runtime schema for Runtime Wait Type. |
| `validateNormalizedRuntimeError` | function | <code>validateNormalizedRuntimeError(input: unknown): NormalizedRuntimeError</code> | Validate Normalized Runtime Error function with 1 public call signature; parameters and return types are listed below. |
| `validateRunSignalRequest` | function | <code>validateRunSignalRequest(input: unknown): RunSignalRequest</code> | Validate Run Signal Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimePrincipal` | function | <code>validateRuntimePrincipal(input: unknown): RuntimePrincipal</code> | Validate Runtime Principal function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeRun` | function | <code>validateRuntimeRun(input: unknown): RuntimeRun</code> | Validate Runtime Run function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeScope` | function | <code>validateRuntimeScope(input: unknown): RuntimeScope</code> | Validate Runtime Scope function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeSession` | function | <code>validateRuntimeSession(input: unknown): RuntimeSession</code> | Validate Runtime Session function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeWaitRecord` | function | <code>validateRuntimeWaitRecord(input: unknown): RuntimeWaitRecord</code> | Validate Runtime Wait Record function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeWaitRequest` | function | <code>validateRuntimeWaitRequest(input: unknown): RuntimeWaitRequest</code> | Validate Runtime Wait Request function with 1 public call signature; parameters and return types are listed below. |

## `normalizedRuntimeErrorDefinition`

Normalized Runtime Error Definition constant exported by the `contracts/runtime-schemas` module.

- Kind: constant
- Import: `import { normalizedRuntimeErrorDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const normalizedRuntimeErrorDefinition: SpecSchemaDefinition<NormalizedRuntimeError>;
```

## `normalizedRuntimeErrorExample`

Valid example value for Normalized Runtime Error.

- Kind: constant
- Import: `import { normalizedRuntimeErrorExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const normalizedRuntimeErrorExample: NormalizedRuntimeError;
```

## `normalizedRuntimeErrorJsonSchema`

JSON Schema for Normalized Runtime Error.

- Kind: constant
- Import: `import { normalizedRuntimeErrorJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const normalizedRuntimeErrorJsonSchema: JsonSchema;
```

## `normalizedRuntimeErrorSchema`

Runtime schema for Normalized Runtime Error.

- Kind: constant
- Import: `import { normalizedRuntimeErrorSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const normalizedRuntimeErrorSchema: z.ZodObject<{ code: z.ZodEnum<["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW", "RUNTIME_RUN_NOT_FOUND", "RUNTIME_RUN_CONFLICT", "RUNTIME_LEASE_CONFLICT", "RUNTIME_WORKFLOW_INVALID", "RUNTIME_PROCESS_MISMATCH", "RUNTIME_STATE_NOT_FOUND", "RUNTIME_TRANSITION_REJECTED", "RUNTIME_GUARD_FAILED", "RUNTIME_INVARIANT_FAILED", "RUNTIME_STATE_TIMEOUT", "RUNTIME_RUN_TIMEOUT", "RUNTIME_CANCELLED", "RUNTIME_SIGNAL_INVALID", "RUNTIME_SIGNAL_EXPIRED", "RUNTIME_RETRY_EXHAUSTED", "RUNTIME_CHECKPOINT_FAILED", "RUNTIME_EVENT_APPEND_FAILED", "RUNTIME_PROJECTION_FAILED", "RUNTIME_REPLAY_DIVERGENCE", "RUNTIME_INTERNAL_ERROR"]>; message: z.ZodString; retryable: z.ZodBoolean; stateId: z.ZodOptional<z.ZodString>; transitionId: z.ZodOptional<z.ZodString>; details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>>>; causeRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { code: "RUNTIME_INVALID_INPUT" | "RUNTIME_MESSAGE_BUS_UNAVAILABLE" | "RUNTIME_MESSAGE_SCHEMA_INVALID" | "RUNTIME_MESSAGE_DEAD_LETTERED" | "RUNTIME_SESSION_QUEUE_CONFLICT" | "RUNTIME_SESSION_QUEUE_OVERFLOW" | "RUNTIME_FENCING_REJECTED" | "RUNTIME_RESOURCE_CONFLICT" | "RUNTIME_IDEMPOTENCY_CONFLICT" | "RUNTIME_EVENT_STREAM_CORRUPT" | "RUNTIME_RECOVERY_REQUIRES_REVIEW" | "RUNTIME_RUN_NOT_FOUND" | "RUNTIME_RUN_CONFLICT" | "RUNTIME_LEASE_CONFLICT" | "RUNTIME_WORKFLOW_INVALID" | "RUNTIME_PROCESS_MISMATCH" | "RUNTIME_STATE_NOT_FOUND" | "RUNTIME_TRANSITION_REJECTED" | "RUNTIME_GUARD_FAILED" | "RUNTIME_INVARIANT_FAILED" | "RUNTIME_STATE_TIMEOUT" | "RUNTIME_RUN_TIMEOUT" | "RUNTIME_CANCELLED" | "RUNTIME_SIGNAL_INVALID" | "RUNTIME_SIGNAL_EXPIRED" | "RUNTIME_RETRY_EXHAUSTED" | "RUNTIME_CHECKPOINT_FAILED" | "RUNTIME_EVENT_APPEND_FAILED" | "RUNTIME_PROJECTION_FAILED" | "RUNTIME_REPLAY_DIVERGENCE" | "RUNTIME_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, JsonValue> | undefined; causeRef?: string | undefined; stateId?: string | undefined; transitionId?: string | undefined; }, { code: "RUNTIME_INVALID_INPUT" | "RUNTIME_MESSAGE_BUS_UNAVAILABLE" | "RUNTIME_MESSAGE_SCHEMA_INVALID" | "RUNTIME_MESSAGE_DEAD_LETTERED" | "RUNTIME_SESSION_QUEUE_CONFLICT" | "RUNTIME_SESSION_QUEUE_OVERFLOW" | "RUNTIME_FENCING_REJECTED" | "RUNTIME_RESOURCE_CONFLICT" | "RUNTIME_IDEMPOTENCY_CONFLICT" | "RUNTIME_EVENT_STREAM_CORRUPT" | "RUNTIME_RECOVERY_REQUIRES_REVIEW" | "RUNTIME_RUN_NOT_FOUND" | "RUNTIME_RUN_CONFLICT" | "RUNTIME_LEASE_CONFLICT" | "RUNTIME_WORKFLOW_INVALID" | "RUNTIME_PROCESS_MISMATCH" | "RUNTIME_STATE_NOT_FOUND" | "RUNTIME_TRANSITION_REJECTED" | "RUNTIME_GUARD_FAILED" | "RUNTIME_INVARIANT_FAILED" | "RUNTIME_STATE_TIMEOUT" | "RUNTIME_RUN_TIMEOUT" | "RUNTIME_CANCELLED" | "RUNTIME_SIGNAL_INVALID" | "RUNTIME_SIGNAL_EXPIRED" | "RUNTIME_RETRY_EXHAUSTED" | "RUNTIME_CHECKPOINT_FAILED" | "RUNTIME_EVENT_APPEND_FAILED" | "RUNTIME_PROJECTION_FAILED" | "RUNTIME_REPLAY_DIVERGENCE" | "RUNTIME_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, JsonValue> | undefined; causeRef?: string | undefined; stateId?: string | undefined; transitionId?: string | undefined; }>;
```

## `runSignalRequestDefinition`

Run Signal Request Definition constant exported by the `contracts/runtime-schemas` module.

- Kind: constant
- Import: `import { runSignalRequestDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runSignalRequestDefinition: SpecSchemaDefinition<RunSignalRequest>;
```

## `runSignalRequestExample`

Valid example value for Run Signal Request.

- Kind: constant
- Import: `import { runSignalRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runSignalRequestExample: RunSignalRequest;
```

## `runSignalRequestJsonSchema`

JSON Schema for Run Signal Request.

- Kind: constant
- Import: `import { runSignalRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runSignalRequestJsonSchema: JsonSchema;
```

## `runSignalRequestSchema`

Runtime schema for Run Signal Request.

- Kind: constant
- Import: `import { runSignalRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runSignalRequestSchema: z.ZodObject<{ signalId: z.ZodString; runId: z.ZodString; key: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; tenantId?: string | undefined; userId?: string | undefined; agentId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; tenantId?: string | undefined; userId?: string | undefined; agentId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; roles?: string[] | undefined; }>; payload: z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>; idempotencyKey: z.ZodOptional<z.ZodString>; sentAt: z.ZodString; }, "strict", z.ZodTypeAny, { runId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; tenantId?: string | undefined; userId?: string | undefined; agentId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; roles?: string[] | undefined; }; payload: JsonValue; key: string; signalId: string; sentAt: string; idempotencyKey?: string | undefined; }, { runId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; tenantId?: string | undefined; userId?: string | undefined; agentId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; roles?: string[] | undefined; }; payload: JsonValue; key: string; signalId: string; sentAt: string; idempotencyKey?: string | undefined; }>;
```

## `runtimeContractDefinitions`

Runtime Contract Definitions constant exported by the `contracts/runtime-schemas` module.

- Kind: constant
- Import: `import { runtimeContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeContractDefinitions: readonly [SpecSchemaDefinition<RuntimeScope>, SpecSchemaDefinition<RuntimePrincipal>, SpecSchemaDefinition<NormalizedRuntimeError>, SpecSchemaDefinition<RuntimeSession>, SpecSchemaDefinition<RuntimeRun>, SpecSchemaDefinition<RuntimeWaitRequest>, SpecSchemaDefinition<RuntimeWaitRecord>, SpecSchemaDefinition<RunSignalRequest>];
```

## `runtimeContractJsonSchemas`

Runtime Contract JSON Schemas constant exported by the `contracts/runtime-schemas` module.

- Kind: constant
- Import: `import { runtimeContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeErrorCodeSchema`

Runtime schema for Runtime Error Code.

- Kind: constant
- Import: `import { runtimeErrorCodeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeErrorCodeSchema: z.ZodEnum<["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW", "RUNTIME_RUN_NOT_FOUND", "RUNTIME_RUN_CONFLICT", "RUNTIME_LEASE_CONFLICT", "RUNTIME_WORKFLOW_INVALID", "RUNTIME_PROCESS_MISMATCH", "RUNTIME_STATE_NOT_FOUND", "RUNTIME_TRANSITION_REJECTED", "RUNTIME_GUARD_FAILED", "RUNTIME_INVARIANT_FAILED", "RUNTIME_STATE_TIMEOUT", "RUNTIME_RUN_TIMEOUT", "RUNTIME_CANCELLED", "RUNTIME_SIGNAL_INVALID", "RUNTIME_SIGNAL_EXPIRED", "RUNTIME_RETRY_EXHAUSTED", "RUNTIME_CHECKPOINT_FAILED", "RUNTIME_EVENT_APPEND_FAILED", "RUNTIME_PROJECTION_FAILED", "RUNTIME_REPLAY_DIVERGENCE", "RUNTIME_INTERNAL_ERROR"]>;
```

## `runtimePrincipalDefinition`

Runtime Principal Definition constant exported by the `contracts/runtime-schemas` module.

- Kind: constant
- Import: `import { runtimePrincipalDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimePrincipalDefinition: SpecSchemaDefinition<RuntimePrincipal>;
```

## `runtimePrincipalExample`

Valid example value for Runtime Principal.

- Kind: constant
- Import: `import { runtimePrincipalExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimePrincipalExample: RuntimePrincipal;
```

## `runtimePrincipalJsonSchema`

JSON Schema for Runtime Principal.

- Kind: constant
- Import: `import { runtimePrincipalJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimePrincipalJsonSchema: JsonSchema;
```

## `runtimePrincipalSchema`

Runtime schema for Runtime Principal.

- Kind: constant
- Import: `import { runtimePrincipalSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimePrincipalSchema: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; tenantId?: string | undefined; userId?: string | undefined; agentId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; tenantId?: string | undefined; userId?: string | undefined; agentId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; roles?: string[] | undefined; }>;
```

## `runtimePrincipalTypeSchema`

Runtime schema for Runtime Principal Type.

- Kind: constant
- Import: `import { runtimePrincipalTypeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimePrincipalTypeSchema: z.ZodEnum<["user", "agent", "service", "system"]>;
```

## `runtimeRunDefinition`

Runtime Run Definition constant exported by the `contracts/runtime-schemas` module.

- Kind: constant
- Import: `import { runtimeRunDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeRunDefinition: SpecSchemaDefinition<RuntimeRun>;
```

## `runtimeRunExample`

Valid example value for Runtime Run.

- Kind: constant
- Import: `import { runtimeRunExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeRunExample: RuntimeRun;
```

## `runtimeRunJsonSchema`

JSON Schema for Runtime Run.

- Kind: constant
- Import: `import { runtimeRunJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeRunJsonSchema: JsonSchema;
```

## `runtimeRunSchema`

Runtime schema for Runtime Run.

- Kind: constant
- Import: `import { runtimeRunSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeRunSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRunSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeRunStatusSchema`

Runtime schema for Runtime Run Status.

- Kind: constant
- Import: `import { runtimeRunStatusSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeRunStatusSchema: z.ZodEnum<["created", "queued", "starting", "acquiring", "running", "waiting", "waiting_human", "waiting_signal", "waiting_timer", "pausing", "paused", "retry_scheduled", "recovering", "cancelling", "completed", "failed", "cancelled", "timed_out"]>;
```

## `runtimeScopeDefinition`

Runtime Scope Definition constant exported by the `contracts/runtime-schemas` module.

- Kind: constant
- Import: `import { runtimeScopeDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeScopeDefinition: SpecSchemaDefinition<RuntimeScope>;
```

## `runtimeScopeExample`

Valid example value for Runtime Scope.

- Kind: constant
- Import: `import { runtimeScopeExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeScopeExample: RuntimeScope;
```

## `runtimeScopeJsonSchema`

JSON Schema for Runtime Scope.

- Kind: constant
- Import: `import { runtimeScopeJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeScopeJsonSchema: JsonSchema;
```

## `runtimeScopeSchema`

Runtime schema for Runtime Scope.

- Kind: constant
- Import: `import { runtimeScopeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; runId: string; tenantId?: string | undefined; workspaceId?: string | undefined; agentId?: string | undefined; }, { userId: string; sessionId: string; runId: string; tenantId?: string | undefined; workspaceId?: string | undefined; agentId?: string | undefined; }>;
```

## `runtimeSessionDefinition`

Runtime Session Definition constant exported by the `contracts/runtime-schemas` module.

- Kind: constant
- Import: `import { runtimeSessionDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeSessionDefinition: SpecSchemaDefinition<RuntimeSession>;
```

## `runtimeSessionExample`

Valid example value for Runtime Session.

- Kind: constant
- Import: `import { runtimeSessionExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeSessionExample: RuntimeSession;
```

## `runtimeSessionJsonSchema`

JSON Schema for Runtime Session.

- Kind: constant
- Import: `import { runtimeSessionJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeSessionJsonSchema: JsonSchema;
```

## `runtimeSessionSchema`

Runtime schema for Runtime Session.

- Kind: constant
- Import: `import { runtimeSessionSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeSessionSchema: z.ZodObject<{ id: z.ZodString; revision: z.ZodNumber; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; domainPackRef: z.ZodOptional<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>>; sessionProfileRef: z.ZodOptional<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>>; title: z.ZodOptional<z.ZodString>; metadata: z.ZodRecord<z.ZodString, z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>>; status: z.ZodEnum<["active", "closed", "archived"]>; createdAt: z.ZodString; updatedAt: z.ZodString; closedAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; revision: number; userId: string; status: "archived" | "active" | "closed"; metadata: Record<string, JsonValue>; createdAt: string; updatedAt: string; tenantId?: string | undefined; workspaceId?: string | undefined; domainPackRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; sessionProfileRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; closedAt?: string | undefined; title?: string | undefined; }, { id: string; revision: number; userId: string; status: "archived" | "active" | "closed"; metadata: Record<string, JsonValue>; createdAt: string; updatedAt: string; tenantId?: string | undefined; workspaceId?: string | undefined; domainPackRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; sessionProfileRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; closedAt?: string | undefined; title?: string | undefined; }>;
```

## `runtimeSessionStatusSchema`

Runtime schema for Runtime Session Status.

- Kind: constant
- Import: `import { runtimeSessionStatusSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeSessionStatusSchema: z.ZodEnum<["active", "closed", "archived"]>;
```

## `runtimeWaitRecordDefinition`

Runtime Wait Record Definition constant exported by the `contracts/runtime-schemas` module.

- Kind: constant
- Import: `import { runtimeWaitRecordDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeWaitRecordDefinition: SpecSchemaDefinition<RuntimeWaitRecord>;
```

## `runtimeWaitRecordExample`

Valid example value for Runtime Wait Record.

- Kind: constant
- Import: `import { runtimeWaitRecordExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeWaitRecordExample: RuntimeWaitRecord;
```

## `runtimeWaitRecordJsonSchema`

JSON Schema for Runtime Wait Record.

- Kind: constant
- Import: `import { runtimeWaitRecordJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeWaitRecordJsonSchema: JsonSchema;
```

## `runtimeWaitRecordSchema`

Runtime schema for Runtime Wait Record.

- Kind: constant
- Import: `import { runtimeWaitRecordSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeWaitRecordSchema: z.ZodObject<{ id: z.ZodString; runId: z.ZodString; stateId: z.ZodString; type: z.ZodEnum<["human", "signal", "timer", "external_operation"]>; key: z.ZodOptional<z.ZodString>; status: z.ZodEnum<["waiting", "received", "expired", "cancelled"]>; expectedSchemaHash: z.ZodOptional<z.ZodString>; createdAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; resolvedAt: z.ZodOptional<z.ZodString>; signalRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; runId: string; status: "received" | "expired" | "cancelled" | "waiting"; type: "signal" | "human" | "timer" | "external_operation"; createdAt: string; stateId: string; expiresAt?: string | undefined; key?: string | undefined; resolvedAt?: string | undefined; expectedSchemaHash?: string | undefined; signalRef?: string | undefined; }, { id: string; runId: string; status: "received" | "expired" | "cancelled" | "waiting"; type: "signal" | "human" | "timer" | "external_operation"; createdAt: string; stateId: string; expiresAt?: string | undefined; key?: string | undefined; resolvedAt?: string | undefined; expectedSchemaHash?: string | undefined; signalRef?: string | undefined; }>;
```

## `runtimeWaitRequestDefinition`

Runtime Wait Request Definition constant exported by the `contracts/runtime-schemas` module.

- Kind: constant
- Import: `import { runtimeWaitRequestDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeWaitRequestDefinition: SpecSchemaDefinition<RuntimeWaitRequest>;
```

## `runtimeWaitRequestExample`

Valid example value for Runtime Wait Request.

- Kind: constant
- Import: `import { runtimeWaitRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeWaitRequestExample: RuntimeWaitRequest;
```

## `runtimeWaitRequestJsonSchema`

JSON Schema for Runtime Wait Request.

- Kind: constant
- Import: `import { runtimeWaitRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeWaitRequestJsonSchema: JsonSchema;
```

## `runtimeWaitRequestSchema`

Runtime schema for Runtime Wait Request.

- Kind: constant
- Import: `import { runtimeWaitRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeWaitRequestSchema: z.ZodEffects<z.ZodObject<{ type: z.ZodEnum<["human", "signal", "timer", "external_operation"]>; key: z.ZodOptional<z.ZodString>; expectedSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; expiresAt: z.ZodOptional<z.ZodString>; timeoutTransitionId: z.ZodOptional<z.ZodString>; pendingActionRef: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>>>; }, "strict", z.ZodTypeAny, { type: "signal" | "human" | "timer" | "external_operation"; metadata?: Record<string, JsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }, { type: "signal" | "human" | "timer" | "external_operation"; metadata?: Record<string, JsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }>, { type: "signal" | "human" | "timer" | "external_operation"; metadata?: Record<string, JsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }, { type: "signal" | "human" | "timer" | "external_operation"; metadata?: Record<string, JsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }>;
```

## `runtimeWaitStatusSchema`

Runtime schema for Runtime Wait Status.

- Kind: constant
- Import: `import { runtimeWaitStatusSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeWaitStatusSchema: z.ZodEnum<["waiting", "received", "expired", "cancelled"]>;
```

## `runtimeWaitTypeSchema`

Runtime schema for Runtime Wait Type.

- Kind: constant
- Import: `import { runtimeWaitTypeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare const runtimeWaitTypeSchema: z.ZodEnum<["human", "signal", "timer", "external_operation"]>;
```

## `validateNormalizedRuntimeError`

Validate Normalized Runtime Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateNormalizedRuntimeError } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare function validateNormalizedRuntimeError(input: unknown): NormalizedRuntimeError;
```

### Call signature

```text
validateNormalizedRuntimeError(input: unknown): NormalizedRuntimeError
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `NormalizedRuntimeError`
- Description: The return contract is defined by the type shown above.

## `validateRunSignalRequest`

Validate Run Signal Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRunSignalRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare function validateRunSignalRequest(input: unknown): RunSignalRequest;
```

### Call signature

```text
validateRunSignalRequest(input: unknown): RunSignalRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RunSignalRequest`
- Description: The return contract is defined by the type shown above.

## `validateRuntimePrincipal`

Validate Runtime Principal function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimePrincipal } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare function validateRuntimePrincipal(input: unknown): RuntimePrincipal;
```

### Call signature

```text
validateRuntimePrincipal(input: unknown): RuntimePrincipal
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimePrincipal`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeRun`

Validate Runtime Run function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeRun } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare function validateRuntimeRun(input: unknown): RuntimeRun;
```

### Call signature

```text
validateRuntimeRun(input: unknown): RuntimeRun
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeRun`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeScope`

Validate Runtime Scope function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeScope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare function validateRuntimeScope(input: unknown): RuntimeScope;
```

### Call signature

```text
validateRuntimeScope(input: unknown): RuntimeScope
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeScope`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeSession`

Validate Runtime Session function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeSession } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare function validateRuntimeSession(input: unknown): RuntimeSession;
```

### Call signature

```text
validateRuntimeSession(input: unknown): RuntimeSession
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeSession`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeWaitRecord`

Validate Runtime Wait Record function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeWaitRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare function validateRuntimeWaitRecord(input: unknown): RuntimeWaitRecord;
```

### Call signature

```text
validateRuntimeWaitRecord(input: unknown): RuntimeWaitRecord
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeWaitRecord`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeWaitRequest`

Validate Runtime Wait Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeWaitRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)

### Declaration

```text
export declare function validateRuntimeWaitRequest(input: unknown): RuntimeWaitRequest;
```

### Call signature

```text
validateRuntimeWaitRequest(input: unknown): RuntimeWaitRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeWaitRequest`
- Description: The return contract is defined by the type shown above.
