# `@codesoul-co/hypha-core` / `modules/command-execution/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/command-execution/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)
- Exports: **24**

## Using this module

Use the Index module for executing runtime behavior at this boundary. It exports 19 constants, 5 functions.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 5 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 19 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { commandExecutionRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = commandExecutionRequestSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandExecutionJsonSchemas` | constant | <code>const commandExecutionJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Command Execution JSON Schemas constant exported by the `modules/command-execution/index` module. |
| `commandExecutionRequestExample` | constant | <code>const commandExecutionRequestExample: CommandExecutionRequest</code> | Valid example value for Command Execution Request. |
| `commandExecutionRequestJsonSchema` | constant | <code>const commandExecutionRequestJsonSchema: JsonSchema</code> | JSON Schema for Command Execution Request. |
| `commandExecutionRequestSchema` | constant | <code>const commandExecutionRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionSc...</code> | Runtime schema for Command Execution Request. |
| `commandExecutionResultExample` | constant | <code>const commandExecutionResultExample: CommandExecutionResult</code> | Valid example value for Command Execution Result. |
| `commandExecutionResultJsonSchema` | constant | <code>const commandExecutionResultJsonSchema: JsonSchema</code> | JSON Schema for Command Execution Result. |
| `commandExecutionResultSchema` | constant | <code>const commandExecutionResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; revision: z.ZodNumber; sandboxId: z.ZodString; status: z.ZodEnum&lt;["queued", "starting", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]&gt;; exitCode: z.ZodNullable&lt;z.ZodNumber&gt;; signal: z.ZodOptional&lt;z.ZodString&gt;; stdout: z.ZodOptional&lt;z.ZodString&gt;; stde...</code> | Runtime schema for Command Execution Result. |
| `commandExecutionStatusSchema` | constant | <code>const commandExecutionStatusSchema: z.ZodEnum&lt;["queued", "starting", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]&gt;</code> | Runtime schema for Command Execution Status. |
| `commandExecutionStatusTransitions` | constant | <code>const commandExecutionStatusTransitions: Readonly&lt;Record&lt;CommandExecutionStatus, readonly CommandExecutionStatus[]&gt;&gt;</code> | Command Execution Status Transitions constant exported by the `modules/command-execution/index` module. |
| `commandOutputChunkExample` | constant | <code>const commandOutputChunkExample: CommandOutputChunk</code> | Valid example value for Command Output Chunk. |
| `commandOutputChunkJsonSchema` | constant | <code>const commandOutputChunkJsonSchema: JsonSchema</code> | JSON Schema for Command Output Chunk. |
| `commandOutputChunkSchema` | constant | <code>const commandOutputChunkSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; sequence: z.ZodNumber; stream: z.ZodEnum&lt;["stdout", "stderr"]&gt;; encoding: z.ZodEnum&lt;["utf8", "base64"]&gt;; content: z.ZodString; byteLength: z.ZodNumber; contentHash: z.ZodString; emittedAt: z.ZodString; truncated: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { executionId: string; contentHash: string; sequence: number; s...</code> | Runtime schema for Command Output Chunk. |
| `executionCancelRequestExample` | constant | <code>const executionCancelRequestExample: ExecutionCancelRequest</code> | Valid example value for Execution Cancel Request. |
| `executionCancelRequestJsonSchema` | constant | <code>const executionCancelRequestJsonSchema: JsonSchema</code> | JSON Schema for Execution Cancel Request. |
| `executionCancelRequestSchema` | constant | <code>const executionCancelRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString,...</code> | Runtime schema for Execution Cancel Request. |
| `executionReceiptJsonSchema` | constant | <code>const executionReceiptJsonSchema: JsonSchema</code> | JSON Schema for Execution Receipt. |
| `executionReceiptSchema` | constant | <code>const executionReceiptSchema: z.ZodObject&lt;{ id: z.ZodString; providerId: z.ZodString; executionId: z.ZodString; providerExecutionRef: z.ZodOptional&lt;z.ZodString&gt;; status: z.ZodEnum&lt;["accepted", "completed", "rejected", "unknown"]&gt;; issuedAt: z.ZodString; receiptHash: z.ZodString; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "strict", z.ZodTypeAny, { status: "unknown" &#124; "completed" &#124; "rejected...</code> | Runtime schema for Execution Receipt. |
| `executionResourceUsageJsonSchema` | constant | <code>const executionResourceUsageJsonSchema: JsonSchema</code> | JSON Schema for Execution Resource Usage. |
| `executionResourceUsageSchema` | constant | <code>const executionResourceUsageSchema: z.ZodObject&lt;{ cpuTimeMs: z.ZodOptional&lt;z.ZodNumber&gt;; peakMemoryBytes: z.ZodOptional&lt;z.ZodNumber&gt;; readBytes: z.ZodOptional&lt;z.ZodNumber&gt;; writtenBytes: z.ZodOptional&lt;z.ZodNumber&gt;; networkBytesSent: z.ZodOptional&lt;z.ZodNumber&gt;; networkBytesReceived: z.ZodOptional&lt;z.ZodNumber&gt;; processCountPeak: z.ZodOptional&lt;z.ZodNumber&gt;; outputBytes: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodT...</code> | Runtime schema for Execution Resource Usage. |
| `canTransitionCommandExecutionStatus` | function | <code>canTransitionCommandExecutionStatus(from: CommandExecutionStatus, to: CommandExecutionStatus): boolean</code> | Can Transition Command Execution Status function with 1 public call signature; parameters and return types are listed below. |
| `validateCommandExecutionRequest` | function | <code>validateCommandExecutionRequest(input: unknown): CommandExecutionRequest</code> | Validate Command Execution Request function with 1 public call signature; parameters and return types are listed below. |
| `validateCommandExecutionResult` | function | <code>validateCommandExecutionResult(input: unknown): CommandExecutionResult</code> | Validate Command Execution Result function with 1 public call signature; parameters and return types are listed below. |
| `validateCommandOutputChunk` | function | <code>validateCommandOutputChunk(input: unknown): CommandOutputChunk</code> | Validate Command Output Chunk function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionCancelRequest` | function | <code>validateExecutionCancelRequest(input: unknown): ExecutionCancelRequest</code> | Validate Execution Cancel Request function with 1 public call signature; parameters and return types are listed below. |

## `commandExecutionJsonSchemas`

Command Execution JSON Schemas constant exported by the `modules/command-execution/index` module.

- Kind: constant
- Import: `import { commandExecutionJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const commandExecutionJsonSchemas: Record<string, JsonSchema>;
```

## `commandExecutionRequestExample`

Valid example value for Command Execution Request.

- Kind: constant
- Import: `import { commandExecutionRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const commandExecutionRequestExample: CommandExecutionRequest;
```

## `commandExecutionRequestJsonSchema`

JSON Schema for Command Execution Request.

- Kind: constant
- Import: `import { commandExecutionRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const commandExecutionRequestJsonSchema: JsonSchema;
```

## `commandExecutionRequestSchema`

Runtime schema for Command Execution Request.

- Kind: constant
- Import: `import { commandExecutionRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const commandExecutionRequestSchema: (typeof import('@codesoul-co/hypha-core'))['commandExecutionRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `commandExecutionResultExample`

Valid example value for Command Execution Result.

- Kind: constant
- Import: `import { commandExecutionResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const commandExecutionResultExample: CommandExecutionResult;
```

## `commandExecutionResultJsonSchema`

JSON Schema for Command Execution Result.

- Kind: constant
- Import: `import { commandExecutionResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const commandExecutionResultJsonSchema: JsonSchema;
```

## `commandExecutionResultSchema`

Runtime schema for Command Execution Result.

- Kind: constant
- Import: `import { commandExecutionResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const commandExecutionResultSchema: (typeof import('@codesoul-co/hypha-core'))['commandExecutionResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `commandExecutionStatusSchema`

Runtime schema for Command Execution Status.

- Kind: constant
- Import: `import { commandExecutionStatusSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const commandExecutionStatusSchema: z.ZodEnum<["queued", "starting", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]>;
```

## `commandExecutionStatusTransitions`

Command Execution Status Transitions constant exported by the `modules/command-execution/index` module.

- Kind: constant
- Import: `import { commandExecutionStatusTransitions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const commandExecutionStatusTransitions: Readonly<Record<CommandExecutionStatus, readonly CommandExecutionStatus[]>>;
```

## `commandOutputChunkExample`

Valid example value for Command Output Chunk.

- Kind: constant
- Import: `import { commandOutputChunkExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const commandOutputChunkExample: CommandOutputChunk;
```

## `commandOutputChunkJsonSchema`

JSON Schema for Command Output Chunk.

- Kind: constant
- Import: `import { commandOutputChunkJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const commandOutputChunkJsonSchema: JsonSchema;
```

## `commandOutputChunkSchema`

Runtime schema for Command Output Chunk.

- Kind: constant
- Import: `import { commandOutputChunkSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const commandOutputChunkSchema: z.ZodEffects<z.ZodObject<{ executionId: z.ZodString; sequence: z.ZodNumber; stream: z.ZodEnum<["stdout", "stderr"]>; encoding: z.ZodEnum<["utf8", "base64"]>; content: z.ZodString; byteLength: z.ZodNumber; contentHash: z.ZodString; emittedAt: z.ZodString; truncated: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { executionId: string; contentHash: string; sequence: number; stream: "stdout" | "stderr"; content: string; encoding: "utf8" | "base64"; byteLength: number; emittedAt: string; truncated?: boolean | undefined; }, { executionId: string; contentHash: string; sequence: number; stream: "stdout" | "stderr"; content: string; encoding: "utf8" | "base64"; byteLength: number; emittedAt: string; truncated?: boolean | undefined; }>, { executionId: string; contentHash: string; sequence: number; stream: "stdout" | "stderr"; content: string; encoding: "utf8" | "base64"; byteLength: number; emittedAt: string; truncated?: boolean | undefined; }, { executionId: string; contentHash: string; sequence: number; stream: "stdout" | "stderr"; content: string; encoding: "utf8" | "base64"; byteLength: number; emittedAt: string; truncated?: boolean | undefined; }>;
```

## `executionCancelRequestExample`

Valid example value for Execution Cancel Request.

- Kind: constant
- Import: `import { executionCancelRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const executionCancelRequestExample: ExecutionCancelRequest;
```

## `executionCancelRequestJsonSchema`

JSON Schema for Execution Cancel Request.

- Kind: constant
- Import: `import { executionCancelRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const executionCancelRequestJsonSchema: JsonSchema;
```

## `executionCancelRequestSchema`

Runtime schema for Execution Cancel Request.

- Kind: constant
- Import: `import { executionCancelRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const executionCancelRequestSchema: z.ZodObject<{ operationId: z.ZodString; executionId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; expectedRevision: z.ZodNumber; reason: z.ZodOptional<z.ZodString>; gracePeriodMs: z.ZodOptional<z.ZodNumber>; idempotencyKey: z.ZodOptional<z.ZodString>; correlationId: z.ZodOptional<z.ZodString>; causationId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; executionId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; correlationId?: string | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; gracePeriodMs?: number | undefined; }, { operationId: string; executionId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; correlationId?: string | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; gracePeriodMs?: number | undefined; }>;
```

## `executionReceiptJsonSchema`

JSON Schema for Execution Receipt.

- Kind: constant
- Import: `import { executionReceiptJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const executionReceiptJsonSchema: JsonSchema;
```

## `executionReceiptSchema`

Runtime schema for Execution Receipt.

- Kind: constant
- Import: `import { executionReceiptSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const executionReceiptSchema: z.ZodObject<{ id: z.ZodString; providerId: z.ZodString; executionId: z.ZodString; providerExecutionRef: z.ZodOptional<z.ZodString>; status: z.ZodEnum<["accepted", "completed", "rejected", "unknown"]>; issuedAt: z.ZodString; receiptHash: z.ZodString; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { status: "unknown" | "completed" | "rejected" | "accepted"; id: string; executionId: string; providerId: string; issuedAt: string; receiptHash: string; metadata?: Record<string, unknown> | undefined; providerExecutionRef?: string | undefined; }, { status: "unknown" | "completed" | "rejected" | "accepted"; id: string; executionId: string; providerId: string; issuedAt: string; receiptHash: string; metadata?: Record<string, unknown> | undefined; providerExecutionRef?: string | undefined; }>;
```

## `executionResourceUsageJsonSchema`

JSON Schema for Execution Resource Usage.

- Kind: constant
- Import: `import { executionResourceUsageJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const executionResourceUsageJsonSchema: JsonSchema;
```

## `executionResourceUsageSchema`

Runtime schema for Execution Resource Usage.

- Kind: constant
- Import: `import { executionResourceUsageSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare const executionResourceUsageSchema: z.ZodObject<{ cpuTimeMs: z.ZodOptional<z.ZodNumber>; peakMemoryBytes: z.ZodOptional<z.ZodNumber>; readBytes: z.ZodOptional<z.ZodNumber>; writtenBytes: z.ZodOptional<z.ZodNumber>; networkBytesSent: z.ZodOptional<z.ZodNumber>; networkBytesReceived: z.ZodOptional<z.ZodNumber>; processCountPeak: z.ZodOptional<z.ZodNumber>; outputBytes: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { cpuTimeMs?: number | undefined; peakMemoryBytes?: number | undefined; readBytes?: number | undefined; writtenBytes?: number | undefined; networkBytesSent?: number | undefined; networkBytesReceived?: number | undefined; processCountPeak?: number | undefined; outputBytes?: number | undefined; }, { cpuTimeMs?: number | undefined; peakMemoryBytes?: number | undefined; readBytes?: number | undefined; writtenBytes?: number | undefined; networkBytesSent?: number | undefined; networkBytesReceived?: number | undefined; processCountPeak?: number | undefined; outputBytes?: number | undefined; }>;
```

## `canTransitionCommandExecutionStatus`

Can Transition Command Execution Status function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { canTransitionCommandExecutionStatus } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare function canTransitionCommandExecutionStatus(from: CommandExecutionStatus, to: CommandExecutionStatus): boolean;
```

### Call signature

```text
canTransitionCommandExecutionStatus(from: CommandExecutionStatus, to: CommandExecutionStatus): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | <code>CommandExecutionStatus</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `to` | <code>CommandExecutionStatus</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `validateCommandExecutionRequest`

Validate Command Execution Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateCommandExecutionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare function validateCommandExecutionRequest(input: unknown): CommandExecutionRequest;
```

### Call signature

```text
validateCommandExecutionRequest(input: unknown): CommandExecutionRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `CommandExecutionRequest`
- Description: The return contract is defined by the type shown above.

## `validateCommandExecutionResult`

Validate Command Execution Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateCommandExecutionResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare function validateCommandExecutionResult(input: unknown): CommandExecutionResult;
```

### Call signature

```text
validateCommandExecutionResult(input: unknown): CommandExecutionResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `CommandExecutionResult`
- Description: The return contract is defined by the type shown above.

## `validateCommandOutputChunk`

Validate Command Output Chunk function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateCommandOutputChunk } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare function validateCommandOutputChunk(input: unknown): CommandOutputChunk;
```

### Call signature

```text
validateCommandOutputChunk(input: unknown): CommandOutputChunk
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `CommandOutputChunk`
- Description: The return contract is defined by the type shown above.

## `validateExecutionCancelRequest`

Validate Execution Cancel Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionCancelRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/command-execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)

### Declaration

```text
export declare function validateExecutionCancelRequest(input: unknown): ExecutionCancelRequest;
```

### Call signature

```text
validateExecutionCancelRequest(input: unknown): ExecutionCancelRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionCancelRequest`
- Description: The return contract is defined by the type shown above.
