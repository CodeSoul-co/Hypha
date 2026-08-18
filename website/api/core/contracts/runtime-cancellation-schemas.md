# `@codesoul-co/hypha-core` / `contracts/runtime-cancellation-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-cancellation-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)
- Exports: **15**

## Using this module

Use the Runtime cancellation schemas module for declaring and runtime-validating contracts. It exports 12 constants, 3 functions.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 12 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { runtimeCancelCommandSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeCancelCommandSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeCancelCommandDefinition` | constant | <code>const runtimeCancelCommandDefinition: SpecSchemaDefinition&lt;RuntimeCancelCommand&gt;</code> | Runtime Cancel Command Definition constant exported by the `contracts/runtime-cancellation-schemas` module. |
| `runtimeCancelCommandExample` | constant | <code>const runtimeCancelCommandExample: RuntimeCancelCommand</code> | Valid example value for Runtime Cancel Command. |
| `runtimeCancelCommandJsonSchema` | constant | <code>const runtimeCancelCommandJsonSchema: JsonSchema</code> | JSON Schema for Runtime Cancel Command. |
| `runtimeCancelCommandSchema` | constant | <code>const runtimeCancelCommandSchema: z.ZodObject&lt;{ commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; ...</code> | Runtime schema for Runtime Cancel Command. |
| `runtimeCancellationContractDefinitions` | constant | <code>const runtimeCancellationContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeCancelCommand&gt;, SpecSchemaDefinition&lt;RuntimeCancelResult&gt;]</code> | Runtime Cancellation Contract Definitions constant exported by the `contracts/runtime-cancellation-schemas` module. |
| `runtimeCancellationContractJsonSchemas` | constant | <code>const runtimeCancellationContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Runtime Cancellation Contract JSON Schemas constant exported by the `contracts/runtime-cancellation-schemas` module. |
| `runtimeCancellationPolicySchema` | constant | <code>const runtimeCancellationPolicySchema: z.ZodObject&lt;{ propagation: z.ZodEnum&lt;["none", "children", "all_descendants"]&gt;; cancelRunningActivities: z.ZodBoolean; waitGraceMs: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodTypeAny, { propagation: "none" &#124; "children" &#124; "all_descendants"; cancelRunningActivities: boolean; waitGraceMs?: number &#124; undefined; }, { propagation: "none" &#124; "children" &#124; "all_descendants"; cancelRun...</code> | Runtime schema for Runtime Cancellation Policy. |
| `runtimeCancellationTargetResultSchema` | constant | <code>const runtimeCancellationTargetResultSchema: z.ZodObject&lt;{ targetType: z.ZodEnum&lt;["activity", "child_run", "session_command"]&gt;; targetId: z.ZodString; status: z.ZodEnum&lt;["cancelled", "already_terminal", "not_found", "failed"]&gt;; error: z.ZodOptional&lt;z.ZodObject&lt;{ code: z.ZodEnum&lt;["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_S...</code> | Runtime schema for Runtime Cancellation Target Result. |
| `runtimeCancelResultDefinition` | constant | <code>const runtimeCancelResultDefinition: SpecSchemaDefinition&lt;RuntimeCancelResult&gt;</code> | Runtime Cancel Result Definition constant exported by the `contracts/runtime-cancellation-schemas` module. |
| `runtimeCancelResultExample` | constant | <code>const runtimeCancelResultExample: RuntimeCancelResult</code> | Valid example value for Runtime Cancel Result. |
| `runtimeCancelResultJsonSchema` | constant | <code>const runtimeCancelResultJsonSchema: JsonSchema</code> | JSON Schema for Runtime Cancel Result. |
| `runtimeCancelResultSchema` | constant | <code>const runtimeCancelResultSchema: z.ZodObject&lt;{ commandId: z.ZodString; disposition: z.ZodEnum&lt;["applied", "reused"]&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; targetResults: z.ZodArray&lt;z.ZodObject&lt;{ targetType: z.ZodEnum&lt;["activity", "child_run", "session_command"]&gt;; targetId: z.ZodString; status: z.ZodEnum&lt;["cancelled", "already_terminal", "not_found", "failed"]&gt;; error: z.ZodOptional&lt;z.ZodObject&lt;{ code: z.ZodE...</code> | Runtime schema for Runtime Cancel Result. |
| `validateRuntimeCancelCommand` | function | <code>validateRuntimeCancelCommand(input: unknown): RuntimeCancelCommand</code> | Validate Runtime Cancel Command function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeCancellationTargetResult` | function | <code>validateRuntimeCancellationTargetResult(input: unknown): { status: "failed" &#124; "cancelled" &#124; "already_terminal" &#124; "not_found"; targetType: "session_command" &#124; "activity" &#124; "child_run"; targetId: string; error?: { code: "RUNTIME_INVALID_INPUT" &#124; "RUNTIME_MESSAGE_BUS_UNAVAILABLE" &#124; "RUNTIME_MESSAGE_SCHEMA_INVALID" &#124; "RUNTIME_MESSAGE_DEAD_LETTERED" &#124; "RUNTIME_SESSION_QUEUE_CONFLICT" &#124; "RUNTIME_SESSION_QUEUE_OVERFLOW" ...</code> | Validate Runtime Cancellation Target Result function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeCancelResult` | function | <code>validateRuntimeCancelResult(input: unknown): RuntimeCancelResult</code> | Validate Runtime Cancel Result function with 1 public call signature; parameters and return types are listed below. |

## `runtimeCancelCommandDefinition`

Runtime Cancel Command Definition constant exported by the `contracts/runtime-cancellation-schemas` module.

- Kind: constant
- Import: `import { runtimeCancelCommandDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### Declaration

```text
export declare const runtimeCancelCommandDefinition: SpecSchemaDefinition<RuntimeCancelCommand>;
```

## `runtimeCancelCommandExample`

Valid example value for Runtime Cancel Command.

- Kind: constant
- Import: `import { runtimeCancelCommandExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### Declaration

```text
export declare const runtimeCancelCommandExample: RuntimeCancelCommand;
```

## `runtimeCancelCommandJsonSchema`

JSON Schema for Runtime Cancel Command.

- Kind: constant
- Import: `import { runtimeCancelCommandJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### Declaration

```text
export declare const runtimeCancelCommandJsonSchema: JsonSchema;
```

## `runtimeCancelCommandSchema`

Runtime schema for Runtime Cancel Command.

- Kind: constant
- Import: `import { runtimeCancelCommandSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeCancelCommandSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeCancelCommandSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeCancellationContractDefinitions`

Runtime Cancellation Contract Definitions constant exported by the `contracts/runtime-cancellation-schemas` module.

- Kind: constant
- Import: `import { runtimeCancellationContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### Declaration

```text
export declare const runtimeCancellationContractDefinitions: readonly [SpecSchemaDefinition<RuntimeCancelCommand>, SpecSchemaDefinition<RuntimeCancelResult>];
```

## `runtimeCancellationContractJsonSchemas`

Runtime Cancellation Contract JSON Schemas constant exported by the `contracts/runtime-cancellation-schemas` module.

- Kind: constant
- Import: `import { runtimeCancellationContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### Declaration

```text
export declare const runtimeCancellationContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeCancellationPolicySchema`

Runtime schema for Runtime Cancellation Policy.

- Kind: constant
- Import: `import { runtimeCancellationPolicySchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### Declaration

```text
export declare const runtimeCancellationPolicySchema: z.ZodObject<{ propagation: z.ZodEnum<["none", "children", "all_descendants"]>; cancelRunningActivities: z.ZodBoolean; waitGraceMs: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { propagation: "none" | "children" | "all_descendants"; cancelRunningActivities: boolean; waitGraceMs?: number | undefined; }, { propagation: "none" | "children" | "all_descendants"; cancelRunningActivities: boolean; waitGraceMs?: number | undefined; }>;
```

## `runtimeCancellationTargetResultSchema`

Runtime schema for Runtime Cancellation Target Result.

- Kind: constant
- Import: `import { runtimeCancellationTargetResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeCancellationTargetResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeCancellationTargetResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeCancelResultDefinition`

Runtime Cancel Result Definition constant exported by the `contracts/runtime-cancellation-schemas` module.

- Kind: constant
- Import: `import { runtimeCancelResultDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### Declaration

```text
export declare const runtimeCancelResultDefinition: SpecSchemaDefinition<RuntimeCancelResult>;
```

## `runtimeCancelResultExample`

Valid example value for Runtime Cancel Result.

- Kind: constant
- Import: `import { runtimeCancelResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### Declaration

```text
export declare const runtimeCancelResultExample: RuntimeCancelResult;
```

## `runtimeCancelResultJsonSchema`

JSON Schema for Runtime Cancel Result.

- Kind: constant
- Import: `import { runtimeCancelResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### Declaration

```text
export declare const runtimeCancelResultJsonSchema: JsonSchema;
```

## `runtimeCancelResultSchema`

Runtime schema for Runtime Cancel Result.

- Kind: constant
- Import: `import { runtimeCancelResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeCancelResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeCancelResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `validateRuntimeCancelCommand`

Validate Runtime Cancel Command function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeCancelCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### Declaration

```text
export declare function validateRuntimeCancelCommand(input: unknown): RuntimeCancelCommand;
```

### Call signature

```text
validateRuntimeCancelCommand(input: unknown): RuntimeCancelCommand
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeCancelCommand`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeCancellationTargetResult`

Validate Runtime Cancellation Target Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeCancellationTargetResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### Declaration

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

### Call signature

```text
validateRuntimeCancellationTargetResult(input: unknown): { status: "failed" | "cancelled" | "already_terminal" | "not_found"; targetType: "session_command" | "activity" | "child_run"; targetId: string; error?: { code: "RUNTIME_INVALID_INPUT" | "RUNTIME_MESSAGE_BUS_UNAVAILABLE" | "RUNTIME_MESSAGE_SCHEMA_INVALID" | "RUNTIME_MESSAGE_DEAD_LETTERED" | "RUNTIME_SESSION_QUEUE_CONFLICT" | "RUNTIME_SESSION_QUEUE_OVERFLOW" | "RUNTIME_FENCING_REJECTED" | "RUNTIME_RESOURCE_CONFLICT" | "RUNTIME_IDEMPOTENCY_CONFLICT" | "RUNTIME_EVENT_STREAM_CORRUPT" | "RUNTIME_RECOVERY_REQUIRES_REVIEW" | "RUNTIME_RUN_NOT_FOUND" | "RUNTIME_RUN_CONFLICT" | "RUNTIME_LEASE_CONFLICT" | "RUNTIME_WORKFLOW_INVALID" | "RUNTIME_PROCESS_MISMATCH" | "RUNTIME_STATE_NOT_FOUND" | "RUNTIME_TRANSITION_REJECTED" | "RUNTIME_GUARD_FAILED" | "RUNTIME_INVARIANT_FAILED" | "RUNTIME_STATE_TIMEOUT" | "RUNTIME_RUN_TIMEOUT" | "RUNTIME_CANCELLED" | "RUNTIME_SIGNAL_INVALID" | "RUNTIME_SIGNAL_EXPIRED" | "RUNTIME_RETRY_EXHAUSTED" | "RUNTIME_CHECKPOINT_FAILED" | "RUNTIME_EVENT_APPEND_FAILED" | "RUNTIME_PROJECTION_FAILED" | "RUNTIME_REPLAY_DIVERGENCE" | "RUNTIME_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | { [key: string]: string | number | boolean | any | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null> | undefined; causeRef?: string | undefined; stateId?: string | undefined; transitionId?: string | undefined; } | undefined; }
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `{ status: "failed" | "cancelled" | "already_terminal" | "not_found"; targetType: "session_command" | "activity" | "child_run"; targetId: string; error?: { code: "RUNTIME_INVALID_INPUT" | "RUNTIME_MESSAGE_BUS_UNAVAILABLE" | "RUNTIME_MESSAGE_SCHEMA_INVALID" | "RUNTIME_MESSAGE_DEAD_LETTERED" | "RUNTIME_SESSION_QUEUE_CONFLICT" | "RUNTIME_SESSION_QUEUE_OVERFLOW" | "RUNTIME_FENCING_REJECTED" | "RUNTIME_RESOURCE_CONFLICT" | "RUNTIME_IDEMPOTENCY_CONFLICT" | "RUNTIME_EVENT_STREAM_CORRUPT" | "RUNTIME_RECOVERY_REQUIRES_REVIEW" | "RUNTIME_RUN_NOT_FOUND" | "RUNTIME_RUN_CONFLICT" | "RUNTIME_LEASE_CONFLICT" | "RUNTIME_WORKFLOW_INVALID" | "RUNTIME_PROCESS_MISMATCH" | "RUNTIME_STATE_NOT_FOUND" | "RUNTIME_TRANSITION_REJECTED" | "RUNTIME_GUARD_FAILED" | "RUNTIME_INVARIANT_FAILED" | "RUNTIME_STATE_TIMEOUT" | "RUNTIME_RUN_TIMEOUT" | "RUNTIME_CANCELLED" | "RUNTIME_SIGNAL_INVALID" | "RUNTIME_SIGNAL_EXPIRED" | "RUNTIME_RETRY_EXHAUSTED" | "RUNTIME_CHECKPOINT_FAILED" | "RUNTIME_EVENT_APPEND_FAILED" | "RUNTIME_PROJECTION_FAILED" | "RUNTIME_REPLAY_DIVERGENCE" | "RUNTIME_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | { [key: string]: string | number | boolean | any | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null)[] | { [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null; } | null> | undefined; causeRef?: string | undefined; stateId?: string | undefined; transitionId?: string | undefined; } | undefined; }`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeCancelResult`

Validate Runtime Cancel Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeCancelResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)

### Declaration

```text
export declare function validateRuntimeCancelResult(input: unknown): RuntimeCancelResult;
```

### Call signature

```text
validateRuntimeCancelResult(input: unknown): RuntimeCancelResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeCancelResult`
- Description: The return contract is defined by the type shown above.
