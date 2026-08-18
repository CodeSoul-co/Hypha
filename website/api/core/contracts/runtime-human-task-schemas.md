# `@codesoul-co/hypha-core` / `contracts/runtime-human-task-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-human-task-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)
- Exports: **15**

## Using this module

Use the Runtime human task schemas module for declaring and runtime-validating contracts. It exports 12 constants, 3 functions.

### Import from the package entrypoint

```ts
import {
  runtimeHumanTaskContractDefinitions,
  runtimeHumanTaskContractJsonSchemas,
  runtimeHumanTaskDecisionCommandDefinition,
  runtimeHumanTaskDecisionCommandExample,
  runtimeHumanTaskDecisionCommandJsonSchema,
  runtimeHumanTaskDecisionCommandSchema,
  runtimeHumanTaskDefinition,
  runtimeHumanTaskExample,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 12 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { runtimeHumanTaskDecisionCommandSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeHumanTaskDecisionCommandSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeHumanTaskContractDefinitions` | constant | <code>const runtimeHumanTaskContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeHumanTask&gt;, SpecSchemaDefinition&lt;RuntimeHumanTaskDecisionCommand&gt;]</code> | Runtime Human Task Contract Definitions constant exported by the `contracts/runtime-human-task-schemas` module. |
| `runtimeHumanTaskContractJsonSchemas` | constant | <code>const runtimeHumanTaskContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Runtime Human Task Contract JSON Schemas constant exported by the `contracts/runtime-human-task-schemas` module. |
| `runtimeHumanTaskDecisionCommandDefinition` | constant | <code>const runtimeHumanTaskDecisionCommandDefinition: SpecSchemaDefinition&lt;RuntimeHumanTaskDecisionCommand&gt;</code> | Runtime Human Task Decision Command Definition constant exported by the `contracts/runtime-human-task-schemas` module. |
| `runtimeHumanTaskDecisionCommandExample` | constant | <code>const runtimeHumanTaskDecisionCommandExample: RuntimeHumanTaskDecisionCommand</code> | Valid example value for Runtime Human Task Decision Command. |
| `runtimeHumanTaskDecisionCommandJsonSchema` | constant | <code>const runtimeHumanTaskDecisionCommandJsonSchema: JsonSchema</code> | JSON Schema for Runtime Human Task Decision Command. |
| `runtimeHumanTaskDecisionCommandSchema` | constant | <code>const runtimeHumanTaskDecisionCommandSchema: z.ZodEffects&lt;z.ZodObject&lt;{ commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; runId: string; tenantId?: string &#124; undefined; workspace...</code> | Runtime schema for Runtime Human Task Decision Command. |
| `runtimeHumanTaskDefinition` | constant | <code>const runtimeHumanTaskDefinition: SpecSchemaDefinition&lt;RuntimeHumanTask&gt;</code> | Runtime Human Task Definition constant exported by the `contracts/runtime-human-task-schemas` module. |
| `runtimeHumanTaskExample` | constant | <code>const runtimeHumanTaskExample: RuntimeHumanTask</code> | Valid example value for Runtime Human Task. |
| `runtimeHumanTaskJsonSchema` | constant | <code>const runtimeHumanTaskJsonSchema: JsonSchema</code> | JSON Schema for Runtime Human Task. |
| `runtimeHumanTaskRequestJsonSchema` | constant | <code>const runtimeHumanTaskRequestJsonSchema: JsonSchema</code> | JSON Schema for Runtime Human Task Request. |
| `runtimeHumanTaskRequestSchema` | constant | <code>const runtimeHumanTaskRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ taskId: z.ZodString; kind: z.ZodEnum&lt;["tool", "skill", "prompt", "memory", "execution", "mcp", "policy"]&gt;; subjectRef: z.ZodString; subjectHash: z.ZodString; requestedBy: z.ZodString; allowedDecisionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; requestedAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; checkpointRef: z.ZodOptional&lt;z.ZodString&gt;; polic...</code> | Runtime schema for Runtime Human Task Request. |
| `runtimeHumanTaskSchema` | constant | <code>const runtimeHumanTaskSchema: z.ZodEffects&lt;z.ZodEffects&lt;z.ZodObject&lt;{ runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; status: z.ZodEnum&lt;["pending", "approved", "rejected", "expired", "cancelled", "superseded"]&gt;; revision: z.ZodNumber; decisionEventId: z.ZodOptional&lt;z.ZodString&gt;; decisionCommandId: z.ZodOptional&lt;z.ZodString&gt;; decisionIdempotencyKey: z.ZodOptional&lt;z.ZodString&gt;; decidedBy: z.ZodO...</code> | Runtime schema for Runtime Human Task. |
| `validateRuntimeHumanTask` | function | <code>validateRuntimeHumanTask(input: unknown): RuntimeHumanTask</code> | Validate Runtime Human Task function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeHumanTaskDecisionCommand` | function | <code>validateRuntimeHumanTaskDecisionCommand(input: unknown): RuntimeHumanTaskDecisionCommand</code> | Validate Runtime Human Task Decision Command function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeHumanTaskRequest` | function | <code>validateRuntimeHumanTaskRequest(input: unknown): RuntimeHumanTaskRequest</code> | Validate Runtime Human Task Request function with 1 public call signature; parameters and return types are listed below. |

## `runtimeHumanTaskContractDefinitions`

Runtime Human Task Contract Definitions constant exported by the `contracts/runtime-human-task-schemas` module.

- Kind: constant
- Import: `import { runtimeHumanTaskContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### Declaration

```text
export declare const runtimeHumanTaskContractDefinitions: readonly [SpecSchemaDefinition<RuntimeHumanTask>, SpecSchemaDefinition<RuntimeHumanTaskDecisionCommand>];
```

## `runtimeHumanTaskContractJsonSchemas`

Runtime Human Task Contract JSON Schemas constant exported by the `contracts/runtime-human-task-schemas` module.

- Kind: constant
- Import: `import { runtimeHumanTaskContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### Declaration

```text
export declare const runtimeHumanTaskContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeHumanTaskDecisionCommandDefinition`

Runtime Human Task Decision Command Definition constant exported by the `contracts/runtime-human-task-schemas` module.

- Kind: constant
- Import: `import { runtimeHumanTaskDecisionCommandDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### Declaration

```text
export declare const runtimeHumanTaskDecisionCommandDefinition: SpecSchemaDefinition<RuntimeHumanTaskDecisionCommand>;
```

## `runtimeHumanTaskDecisionCommandExample`

Valid example value for Runtime Human Task Decision Command.

- Kind: constant
- Import: `import { runtimeHumanTaskDecisionCommandExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### Declaration

```text
export declare const runtimeHumanTaskDecisionCommandExample: RuntimeHumanTaskDecisionCommand;
```

## `runtimeHumanTaskDecisionCommandJsonSchema`

JSON Schema for Runtime Human Task Decision Command.

- Kind: constant
- Import: `import { runtimeHumanTaskDecisionCommandJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### Declaration

```text
export declare const runtimeHumanTaskDecisionCommandJsonSchema: JsonSchema;
```

## `runtimeHumanTaskDecisionCommandSchema`

Runtime schema for Runtime Human Task Decision Command.

- Kind: constant
- Import: `import { runtimeHumanTaskDecisionCommandSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeHumanTaskDecisionCommandSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeHumanTaskDecisionCommandSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeHumanTaskDefinition`

Runtime Human Task Definition constant exported by the `contracts/runtime-human-task-schemas` module.

- Kind: constant
- Import: `import { runtimeHumanTaskDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### Declaration

```text
export declare const runtimeHumanTaskDefinition: SpecSchemaDefinition<RuntimeHumanTask>;
```

## `runtimeHumanTaskExample`

Valid example value for Runtime Human Task.

- Kind: constant
- Import: `import { runtimeHumanTaskExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### Declaration

```text
export declare const runtimeHumanTaskExample: RuntimeHumanTask;
```

## `runtimeHumanTaskJsonSchema`

JSON Schema for Runtime Human Task.

- Kind: constant
- Import: `import { runtimeHumanTaskJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### Declaration

```text
export declare const runtimeHumanTaskJsonSchema: JsonSchema;
```

## `runtimeHumanTaskRequestJsonSchema`

JSON Schema for Runtime Human Task Request.

- Kind: constant
- Import: `import { runtimeHumanTaskRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### Declaration

```text
export declare const runtimeHumanTaskRequestJsonSchema: JsonSchema;
```

## `runtimeHumanTaskRequestSchema`

Runtime schema for Runtime Human Task Request.

- Kind: constant
- Import: `import { runtimeHumanTaskRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### Declaration

```text
export declare const runtimeHumanTaskRequestSchema: z.ZodEffects<z.ZodObject<{ taskId: z.ZodString; kind: z.ZodEnum<["tool", "skill", "prompt", "memory", "execution", "mcp", "policy"]>; subjectRef: z.ZodString; subjectHash: z.ZodString; requestedBy: z.ZodString; allowedDecisionScopes: z.ZodArray<z.ZodString, "many">; requestedAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; checkpointRef: z.ZodOptional<z.ZodString>; policyRef: z.ZodOptional<z.ZodString>; providerRevision: z.ZodOptional<z.ZodString>; activityDescriptorRef: z.ZodOptional<z.ZodString>; activityDescriptorHash: z.ZodOptional<z.ZodString>; reason: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { kind: "tool" | "memory" | "execution" | "policy" | "skill" | "prompt" | "mcp"; requestedAt: string; taskId: string; subjectHash: string; subjectRef: string; requestedBy: string; allowedDecisionScopes: string[]; metadata?: Record<string, unknown> | undefined; policyRef?: string | undefined; expiresAt?: string | undefined; reason?: string | undefined; activityDescriptorRef?: string | undefined; activityDescriptorHash?: string | undefined; providerRevision?: string | undefined; checkpointRef?: string | undefined; }, { kind: "tool" | "memory" | "execution" | "policy" | "skill" | "prompt" | "mcp"; requestedAt: string; taskId: string; subjectHash: string; subjectRef: string; requestedBy: string; allowedDecisionScopes: string[]; metadata?: Record<string, unknown> | undefined; policyRef?: string | undefined; expiresAt?: string | undefined; reason?: string | undefined; activityDescriptorRef?: string | undefined; activityDescriptorHash?: string | undefined; providerRevision?: string | undefined; checkpointRef?: string | undefined; }>, { kind: "tool" | "memory" | "execution" | "policy" | "skill" | "prompt" | "mcp"; requestedAt: string; taskId: string; subjectHash: string; subjectRef: string; requestedBy: string; allowedDecisionScopes: string[]; metadata?: Record<string, unknown> | undefined; policyRef?: string | undefined; expiresAt?: string | undefined; reason?: string | undefined; activityDescriptorRef?: string | undefined; activityDescriptorHash?: string | undefined; providerRevision?: string | undefined; checkpointRef?: string | undefined; }, { kind: "tool" | "memory" | "execution" | "policy" | "skill" | "prompt" | "mcp"; requestedAt: string; taskId: string; subjectHash: string; subjectRef: string; requestedBy: string; allowedDecisionScopes: string[]; metadata?: Record<string, unknown> | undefined; policyRef?: string | undefined; expiresAt?: string | undefined; reason?: string | undefined; activityDescriptorRef?: string | undefined; activityDescriptorHash?: string | undefined; providerRevision?: string | undefined; checkpointRef?: string | undefined; }>;
```

## `runtimeHumanTaskSchema`

Runtime schema for Runtime Human Task.

- Kind: constant
- Import: `import { runtimeHumanTaskSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeHumanTaskSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeHumanTaskSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `validateRuntimeHumanTask`

Validate Runtime Human Task function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeHumanTask } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### Declaration

```text
export declare function validateRuntimeHumanTask(input: unknown): RuntimeHumanTask;
```

### Call signature

```text
validateRuntimeHumanTask(input: unknown): RuntimeHumanTask
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeHumanTask`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeHumanTaskDecisionCommand`

Validate Runtime Human Task Decision Command function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeHumanTaskDecisionCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### Declaration

```text
export declare function validateRuntimeHumanTaskDecisionCommand(input: unknown): RuntimeHumanTaskDecisionCommand;
```

### Call signature

```text
validateRuntimeHumanTaskDecisionCommand(input: unknown): RuntimeHumanTaskDecisionCommand
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeHumanTaskDecisionCommand`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeHumanTaskRequest`

Validate Runtime Human Task Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeHumanTaskRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)

### Declaration

```text
export declare function validateRuntimeHumanTaskRequest(input: unknown): RuntimeHumanTaskRequest;
```

### Call signature

```text
validateRuntimeHumanTaskRequest(input: unknown): RuntimeHumanTaskRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeHumanTaskRequest`
- Description: The return contract is defined by the type shown above.
