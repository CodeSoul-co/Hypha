# `@codesoul-co/hypha-core` / `contracts/runtime-activity-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-activity-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)
- Exports: **17**

## Using this module

Use the Runtime activity schemas module for declaring and runtime-validating contracts. It exports 13 constants, 4 functions.

### Import from the package entrypoint

```ts
import {
  runtimeActivityContractDefinitions,
  runtimeActivityContractJsonSchemas,
  runtimeActivityDescriptorDefinition,
  runtimeActivityDescriptorExample,
  runtimeActivityDescriptorJsonSchema,
  runtimeActivityDescriptorSchema,
  runtimeActivityInvocationSchema,
  runtimeActivityObservationJsonSchema,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 13 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { runtimeActivityDescriptorSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeActivityDescriptorSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeActivityContractDefinitions` | constant | <code>const runtimeActivityContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeActivityRequest&lt;RuntimeJsonValue&gt;&gt;, SpecSchemaDefinition&lt;RuntimeActivityDescriptor&gt;]</code> | Runtime Activity Contract Definitions constant exported by the `contracts/runtime-activity-schemas` module. |
| `runtimeActivityContractJsonSchemas` | constant | <code>const runtimeActivityContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Runtime Activity Contract JSON Schemas constant exported by the `contracts/runtime-activity-schemas` module. |
| `runtimeActivityDescriptorDefinition` | constant | <code>const runtimeActivityDescriptorDefinition: SpecSchemaDefinition&lt;RuntimeActivityDescriptor&gt;</code> | Runtime Activity Descriptor Definition constant exported by the `contracts/runtime-activity-schemas` module. |
| `runtimeActivityDescriptorExample` | constant | <code>const runtimeActivityDescriptorExample: RuntimeActivityDescriptor</code> | Valid example value for Runtime Activity Descriptor. |
| `runtimeActivityDescriptorJsonSchema` | constant | <code>const runtimeActivityDescriptorJsonSchema: JsonSchema</code> | JSON Schema for Runtime Activity Descriptor. |
| `runtimeActivityDescriptorSchema` | constant | <code>const runtimeActivityDescriptorSchema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; activityId: z.ZodString; activityKind: z.ZodEnum&lt;["react_quantum", "tool", "memory", "execution", "mcp", "policy"]&gt;; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; operationId: z.ZodString; inputRef: z.ZodString; inputHash: z.ZodString; providerRef: z.ZodOptional&lt;z.ZodString&gt;; providerRevision: z.ZodOptional&lt;...</code> | Runtime schema for Runtime Activity Descriptor. |
| `runtimeActivityInvocationSchema` | constant | <code>const runtimeActivityInvocationSchema: z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; activityType: z.ZodEnum&lt;["tool", "memory", "model", "execution", "custom"]&gt;; target: z.ZodString; input: z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; ru...</code> | Runtime schema for Runtime Activity Invocation. |
| `runtimeActivityObservationJsonSchema` | constant | <code>const runtimeActivityObservationJsonSchema: JsonSchema</code> | JSON Schema for Runtime Activity Observation. |
| `runtimeActivityObservationSchema` | constant | <code>const runtimeActivityObservationSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; status: z.ZodEnum&lt;["completed", "failed", "waiting", "cancelled"]&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; output: z.ZodOptional&lt;z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;&gt;; artifactRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; retryable: z.ZodOptional&lt;z.ZodBoolean&gt;; error: z.ZodOptional&lt;z.ZodOb...</code> | Runtime schema for Runtime Activity Observation. |
| `runtimeActivityRequestDefinition` | constant | <code>const runtimeActivityRequestDefinition: SpecSchemaDefinition&lt;RuntimeActivityRequest&lt;RuntimeJsonValue&gt;&gt;</code> | Runtime Activity Request Definition constant exported by the `contracts/runtime-activity-schemas` module. |
| `runtimeActivityRequestExample` | constant | <code>const runtimeActivityRequestExample: RuntimeActivityRequest&lt;RuntimeJsonValue&gt;</code> | Valid example value for Runtime Activity Request. |
| `runtimeActivityRequestJsonSchema` | constant | <code>const runtimeActivityRequestJsonSchema: JsonSchema</code> | JSON Schema for Runtime Activity Request. |
| `runtimeActivityRequestSchema` | constant | <code>const runtimeActivityRequestSchema: z.ZodObject&lt;{ target: z.ZodString; input: z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;; options: z.ZodOptional&lt;z.ZodObject&lt;{ effect: z.ZodOptional&lt;z.ZodEnum&lt;["pure", "idempotent", "external_effect", "irreversible"]&gt;&gt;; timeoutMs: z.ZodOptional&lt;z.ZodNumber&gt;; retry: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodObject&lt;{ maxAttempts: z.ZodNumber; initialDelayMs: z.ZodOptional&lt;z.Zod...</code> | Runtime schema for Runtime Activity Request. |
| `validateRuntimeActivityDescriptor` | function | <code>validateRuntimeActivityDescriptor(input: unknown): RuntimeActivityDescriptor</code> | Validate Runtime Activity Descriptor function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeActivityInvocation` | function | <code>validateRuntimeActivityInvocation(input: unknown): RuntimeActivityInvocation</code> | Validate Runtime Activity Invocation function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeActivityObservation` | function | <code>validateRuntimeActivityObservation(input: unknown): RuntimeActivityObservation</code> | Validate Runtime Activity Observation function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeActivityRequest` | function | <code>validateRuntimeActivityRequest(input: unknown): RuntimeActivityRequest</code> | Validate Runtime Activity Request function with 1 public call signature; parameters and return types are listed below. |

## `runtimeActivityContractDefinitions`

Runtime Activity Contract Definitions constant exported by the `contracts/runtime-activity-schemas` module.

- Kind: constant
- Import: `import { runtimeActivityContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare const runtimeActivityContractDefinitions: readonly [SpecSchemaDefinition<RuntimeActivityRequest<RuntimeJsonValue>>, SpecSchemaDefinition<RuntimeActivityDescriptor>];
```

## `runtimeActivityContractJsonSchemas`

Runtime Activity Contract JSON Schemas constant exported by the `contracts/runtime-activity-schemas` module.

- Kind: constant
- Import: `import { runtimeActivityContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare const runtimeActivityContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeActivityDescriptorDefinition`

Runtime Activity Descriptor Definition constant exported by the `contracts/runtime-activity-schemas` module.

- Kind: constant
- Import: `import { runtimeActivityDescriptorDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare const runtimeActivityDescriptorDefinition: SpecSchemaDefinition<RuntimeActivityDescriptor>;
```

## `runtimeActivityDescriptorExample`

Valid example value for Runtime Activity Descriptor.

- Kind: constant
- Import: `import { runtimeActivityDescriptorExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare const runtimeActivityDescriptorExample: RuntimeActivityDescriptor;
```

## `runtimeActivityDescriptorJsonSchema`

JSON Schema for Runtime Activity Descriptor.

- Kind: constant
- Import: `import { runtimeActivityDescriptorJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare const runtimeActivityDescriptorJsonSchema: JsonSchema;
```

## `runtimeActivityDescriptorSchema`

Runtime schema for Runtime Activity Descriptor.

- Kind: constant
- Import: `import { runtimeActivityDescriptorSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare const runtimeActivityDescriptorSchema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; activityId: z.ZodString; activityKind: z.ZodEnum<["react_quantum", "tool", "memory", "execution", "mcp", "policy"]>; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; operationId: z.ZodString; inputRef: z.ZodString; inputHash: z.ZodString; providerRef: z.ZodOptional<z.ZodString>; providerRevision: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodString; deadlineAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; version: "1.0.0"; runId: string; idempotencyKey: string; stateAttempt: number; stateId: string; activityId: string; activityKind: "tool" | "memory" | "execution" | "policy" | "mcp" | "react_quantum"; inputRef: string; inputHash: string; providerRevision?: string | undefined; providerRef?: string | undefined; deadlineAt?: string | undefined; }, { operationId: string; version: "1.0.0"; runId: string; idempotencyKey: string; stateAttempt: number; stateId: string; activityId: string; activityKind: "tool" | "memory" | "execution" | "policy" | "mcp" | "react_quantum"; inputRef: string; inputHash: string; providerRevision?: string | undefined; providerRef?: string | undefined; deadlineAt?: string | undefined; }>;
```

## `runtimeActivityInvocationSchema`

Runtime schema for Runtime Activity Invocation.

- Kind: constant
- Import: `import { runtimeActivityInvocationSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare const runtimeActivityInvocationSchema: z.ZodObject<{ activityId: z.ZodString; operationId: z.ZodString; activityType: z.ZodEnum<["tool", "memory", "model", "execution", "custom"]>; target: z.ZodString; input: z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>; scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; stateId: z.ZodString; stateAttempt: z.ZodNumber; fencingToken: z.ZodNumber; correlationId: z.ZodString; causationId: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodString; requestedAt: z.ZodString; effect: z.ZodEnum<["pure", "idempotent", "external_effect", "irreversible"]>; timeoutMs: z.ZodOptional<z.ZodNumber>; retry: z.ZodOptional<z.ZodEffects<z.ZodObject<{ maxAttempts: z.ZodNumber; initialDelayMs: z.ZodOptional<z.ZodNumber>; maxDelayMs: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }>, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }>>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>>>; }, "strict", z.ZodTypeAny, { operationId: string; effect: "pure" | "idempotent" | "external_effect" | "irreversible"; correlationId: string; idempotencyKey: string; scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; stateAttempt: number; stateId: string; requestedAt: string; fencingToken: number; activityId: string; activityType: "custom" | "tool" | "memory" | "model" | "execution"; input: RuntimeJsonValue; target: string; metadata?: Record<string, RuntimeJsonValue> | undefined; causationId?: string | undefined; timeoutMs?: number | undefined; retry?: { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; } | undefined; }, { operationId: string; effect: "pure" | "idempotent" | "external_effect" | "irreversible"; correlationId: string; idempotencyKey: string; scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; stateAttempt: number; stateId: string; requestedAt: string; fencingToken: number; activityId: string; activityType: "custom" | "tool" | "memory" | "model" | "execution"; input: RuntimeJsonValue; target: string; metadata?: Record<string, RuntimeJsonValue> | undefined; causationId?: string | undefined; timeoutMs?: number | undefined; retry?: { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; } | undefined; }>;
```

## `runtimeActivityObservationJsonSchema`

JSON Schema for Runtime Activity Observation.

- Kind: constant
- Import: `import { runtimeActivityObservationJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare const runtimeActivityObservationJsonSchema: JsonSchema;
```

## `runtimeActivityObservationSchema`

Runtime schema for Runtime Activity Observation.

- Kind: constant
- Import: `import { runtimeActivityObservationSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeActivityObservationSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeActivityObservationSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeActivityRequestDefinition`

Runtime Activity Request Definition constant exported by the `contracts/runtime-activity-schemas` module.

- Kind: constant
- Import: `import { runtimeActivityRequestDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare const runtimeActivityRequestDefinition: SpecSchemaDefinition<RuntimeActivityRequest<RuntimeJsonValue>>;
```

## `runtimeActivityRequestExample`

Valid example value for Runtime Activity Request.

- Kind: constant
- Import: `import { runtimeActivityRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare const runtimeActivityRequestExample: RuntimeActivityRequest<RuntimeJsonValue>;
```

## `runtimeActivityRequestJsonSchema`

JSON Schema for Runtime Activity Request.

- Kind: constant
- Import: `import { runtimeActivityRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare const runtimeActivityRequestJsonSchema: JsonSchema;
```

## `runtimeActivityRequestSchema`

Runtime schema for Runtime Activity Request.

- Kind: constant
- Import: `import { runtimeActivityRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare const runtimeActivityRequestSchema: z.ZodObject<{ target: z.ZodString; input: z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>; options: z.ZodOptional<z.ZodObject<{ effect: z.ZodOptional<z.ZodEnum<["pure", "idempotent", "external_effect", "irreversible"]>>; timeoutMs: z.ZodOptional<z.ZodNumber>; retry: z.ZodOptional<z.ZodEffects<z.ZodObject<{ maxAttempts: z.ZodNumber; initialDelayMs: z.ZodOptional<z.ZodNumber>; maxDelayMs: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }>, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }, { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; }>>; idempotencyKey: z.ZodOptional<z.ZodString>; causationId: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>>>; }, "strict", z.ZodTypeAny, { metadata?: Record<string, RuntimeJsonValue> | undefined; effect?: "pure" | "idempotent" | "external_effect" | "irreversible" | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; timeoutMs?: number | undefined; retry?: { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; } | undefined; }, { metadata?: Record<string, RuntimeJsonValue> | undefined; effect?: "pure" | "idempotent" | "external_effect" | "irreversible" | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; timeoutMs?: number | undefined; retry?: { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; } | undefined; }>>; }, "strict", z.ZodTypeAny, { input: RuntimeJsonValue; target: string; options?: { metadata?: Record<string, RuntimeJsonValue> | undefined; effect?: "pure" | "idempotent" | "external_effect" | "irreversible" | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; timeoutMs?: number | undefined; retry?: { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; } | undefined; } | undefined; }, { input: RuntimeJsonValue; target: string; options?: { metadata?: Record<string, RuntimeJsonValue> | undefined; effect?: "pure" | "idempotent" | "external_effect" | "irreversible" | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; timeoutMs?: number | undefined; retry?: { maxAttempts: number; initialDelayMs?: number | undefined; maxDelayMs?: number | undefined; } | undefined; } | undefined; }>;
```

## `validateRuntimeActivityDescriptor`

Validate Runtime Activity Descriptor function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeActivityDescriptor } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare function validateRuntimeActivityDescriptor(input: unknown): RuntimeActivityDescriptor;
```

### Call signature

```text
validateRuntimeActivityDescriptor(input: unknown): RuntimeActivityDescriptor
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeActivityDescriptor`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeActivityInvocation`

Validate Runtime Activity Invocation function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeActivityInvocation } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare function validateRuntimeActivityInvocation(input: unknown): RuntimeActivityInvocation;
```

### Call signature

```text
validateRuntimeActivityInvocation(input: unknown): RuntimeActivityInvocation
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeActivityInvocation<RuntimeJsonValue>`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeActivityObservation`

Validate Runtime Activity Observation function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeActivityObservation } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare function validateRuntimeActivityObservation(input: unknown): RuntimeActivityObservation;
```

### Call signature

```text
validateRuntimeActivityObservation(input: unknown): RuntimeActivityObservation
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeActivityObservation<RuntimeJsonValue>`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeActivityRequest`

Validate Runtime Activity Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeActivityRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)

### Declaration

```text
export declare function validateRuntimeActivityRequest(input: unknown): RuntimeActivityRequest;
```

### Call signature

```text
validateRuntimeActivityRequest(input: unknown): RuntimeActivityRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeActivityRequest<RuntimeJsonValue>`
- Description: The return contract is defined by the type shown above.
