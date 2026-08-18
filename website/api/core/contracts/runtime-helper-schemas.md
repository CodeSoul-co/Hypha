# `@codesoul-co/hypha-core` / `contracts/runtime-helper-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-helper-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)
- Exports: **30**

## Using this module

Use the Runtime helper schemas module for declaring and runtime-validating contracts. It exports 24 constants, 6 functions.

### Import from the package entrypoint

```ts
import {
  runtimeDeterminismScopeSchema,
  runtimeDeterministicObservationDefinition,
  runtimeDeterministicObservationExample,
  runtimeDeterministicObservationJsonSchema,
  runtimeDeterministicObservationSchema,
  runtimeHelperContractDefinitions,
  runtimeHelperContractJsonSchemas,
  runtimeHelperExecutionScopeSchema,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 6 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 24 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { runtimeDeterminismScopeSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeDeterminismScopeSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeDeterminismScopeSchema` | constant | <code>const runtimeDeterminismScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }, { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }&gt;</code> | Runtime schema for Runtime Determinism Scope. |
| `runtimeDeterministicObservationDefinition` | constant | <code>const runtimeDeterministicObservationDefinition: SpecSchemaDefinition&lt;RuntimeDeterministicObservation&lt;RuntimeJsonValue&gt;&gt;</code> | Runtime Deterministic Observation Definition constant exported by the `contracts/runtime-helper-schemas` module. |
| `runtimeDeterministicObservationExample` | constant | <code>const runtimeDeterministicObservationExample: RuntimeDeterministicObservation&lt;RuntimeJsonValue&gt;</code> | Valid example value for Runtime Deterministic Observation. |
| `runtimeDeterministicObservationJsonSchema` | constant | <code>const runtimeDeterministicObservationJsonSchema: JsonSchema</code> | JSON Schema for Runtime Deterministic Observation. |
| `runtimeDeterministicObservationSchema` | constant | <code>const runtimeDeterministicObservationSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }, { runId: string; userId: string; stateAttempt: number; stateId: string; tena...</code> | Runtime schema for Runtime Deterministic Observation. |
| `runtimeHelperContractDefinitions` | constant | <code>const runtimeHelperContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeTransitionProposal&gt;, SpecSchemaDefinition&lt;RuntimeWaitIntent&gt;, SpecSchemaDefinition&lt;RuntimeStateExecutionResult&gt;, SpecSchemaDefinition&lt;RuntimeDeterministicObservation&lt;RuntimeJsonValue&gt;&gt;, SpecSchemaDefinition&lt;RuntimeObservationEventInput&lt;RuntimeJsonValue&gt;&gt;]</code> | Runtime Helper Contract Definitions constant exported by the `contracts/runtime-helper-schemas` module. |
| `runtimeHelperContractJsonSchemas` | constant | <code>const runtimeHelperContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Runtime Helper Contract JSON Schemas constant exported by the `contracts/runtime-helper-schemas` module. |
| `runtimeHelperExecutionScopeSchema` | constant | <code>const runtimeHelperExecutionScopeSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string...</code> | Runtime schema for Runtime Helper Execution Scope. |
| `runtimeObservationEventInputDefinition` | constant | <code>const runtimeObservationEventInputDefinition: SpecSchemaDefinition&lt;RuntimeObservationEventInput&lt;RuntimeJsonValue&gt;&gt;</code> | Runtime Observation Event Input Definition constant exported by the `contracts/runtime-helper-schemas` module. |
| `runtimeObservationEventInputExample` | constant | <code>const runtimeObservationEventInputExample: RuntimeObservationEventInput&lt;RuntimeJsonValue&gt;</code> | Valid example value for Runtime Observation Event Input. |
| `runtimeObservationEventInputJsonSchema` | constant | <code>const runtimeObservationEventInputJsonSchema: JsonSchema</code> | JSON Schema for Runtime Observation Event Input. |
| `runtimeObservationEventInputSchema` | constant | <code>const runtimeObservationEventInputSchema: z.ZodObject&lt;{ type: z.ZodType&lt;`runtime.observation.${string}`, z.ZodTypeDef, `runtime.observation.${string}`&gt;; payload: z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;; options: z.ZodOptional&lt;z.ZodObject&lt;{ idempotencyKey: z.ZodOptional&lt;z.ZodString&gt;; causationId: z.ZodOptional&lt;z.ZodString&gt;; parentEventId: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.Zod...</code> | Runtime schema for Runtime Observation Event Input. |
| `runtimeStateExecutionResultDefinition` | constant | <code>const runtimeStateExecutionResultDefinition: SpecSchemaDefinition&lt;RuntimeStateExecutionResult&gt;</code> | Runtime State Execution Result Definition constant exported by the `contracts/runtime-helper-schemas` module. |
| `runtimeStateExecutionResultExample` | constant | <code>const runtimeStateExecutionResultExample: RuntimeStateExecutionResult</code> | Valid example value for Runtime State Execution Result. |
| `runtimeStateExecutionResultJsonSchema` | constant | <code>const runtimeStateExecutionResultJsonSchema: JsonSchema</code> | JSON Schema for Runtime State Execution Result. |
| `runtimeStateExecutionResultSchema` | constant | <code>const runtimeStateExecutionResultSchema: z.ZodDiscriminatedUnion&lt;"kind", [z.ZodObject&lt;{ kind: z.ZodLiteral&lt;"completed"&gt;; output: z.ZodOptional&lt;z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;&gt;; variablesPatch: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;&gt;&gt;; }, "strict", z.ZodTypeAny, { kind: "completed"; variablesPatch?: Record&lt;string, RuntimeJsonVal...</code> | Runtime schema for Runtime State Execution Result. |
| `runtimeTransitionProposalDefinition` | constant | <code>const runtimeTransitionProposalDefinition: SpecSchemaDefinition&lt;RuntimeTransitionProposal&gt;</code> | Runtime Transition Proposal Definition constant exported by the `contracts/runtime-helper-schemas` module. |
| `runtimeTransitionProposalExample` | constant | <code>const runtimeTransitionProposalExample: RuntimeTransitionProposal</code> | Valid example value for Runtime Transition Proposal. |
| `runtimeTransitionProposalJsonSchema` | constant | <code>const runtimeTransitionProposalJsonSchema: JsonSchema</code> | JSON Schema for Runtime Transition Proposal. |
| `runtimeTransitionProposalSchema` | constant | <code>const runtimeTransitionProposalSchema: z.ZodObject&lt;{ to: z.ZodString; reason: z.ZodOptional&lt;z.ZodString&gt;; variablesPatch: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;&gt;&gt;; }, "strict", z.ZodTypeAny, { to: string; reason?: string &#124; undefined; variablesPatch?: Record&lt;string, RuntimeJsonValue&gt; &#124; undefined; }, { to: string; reason?: string &#124; undefined; variablesPatch...</code> | Runtime schema for Runtime Transition Proposal. |
| `runtimeWaitIntentDefinition` | constant | <code>const runtimeWaitIntentDefinition: SpecSchemaDefinition&lt;RuntimeWaitIntent&gt;</code> | Runtime Wait Intent Definition constant exported by the `contracts/runtime-helper-schemas` module. |
| `runtimeWaitIntentExample` | constant | <code>const runtimeWaitIntentExample: RuntimeWaitIntent</code> | Valid example value for Runtime Wait Intent. |
| `runtimeWaitIntentJsonSchema` | constant | <code>const runtimeWaitIntentJsonSchema: JsonSchema</code> | JSON Schema for Runtime Wait Intent. |
| `runtimeWaitIntentSchema` | constant | <code>const runtimeWaitIntentSchema: z.ZodEffects&lt;z.ZodObject&lt;{ type: z.ZodEnum&lt;["human", "signal", "timer", "pause"]&gt;; key: z.ZodOptional&lt;z.ZodString&gt;; expectedSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; timeoutTransitionId: z.ZodOptional&lt;z.ZodString&gt;; pendingActionRef: z.ZodOptional&lt;z.ZodString&gt;; reason: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptio...</code> | Runtime schema for Runtime Wait Intent. |
| `validateRuntimeDeterministicObservation` | function | <code>validateRuntimeDeterministicObservation(input: unknown): RuntimeDeterministicObservation</code> | Validate Runtime Deterministic Observation function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeHelperExecutionScope` | function | <code>validateRuntimeHelperExecutionScope(input: unknown): RuntimeHelperExecutionScope</code> | Validate Runtime Helper Execution Scope function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeObservationEventInput` | function | <code>validateRuntimeObservationEventInput(input: unknown): RuntimeObservationEventInput</code> | Validate Runtime Observation Event Input function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeStateExecutionResult` | function | <code>validateRuntimeStateExecutionResult(input: unknown): RuntimeStateExecutionResult</code> | Validate Runtime State Execution Result function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeTransitionProposal` | function | <code>validateRuntimeTransitionProposal(input: unknown): RuntimeTransitionProposal</code> | Validate Runtime Transition Proposal function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeWaitIntent` | function | <code>validateRuntimeWaitIntent(input: unknown): RuntimeWaitIntent</code> | Validate Runtime Wait Intent function with 1 public call signature; parameters and return types are listed below. |

## `runtimeDeterminismScopeSchema`

Runtime schema for Runtime Determinism Scope.

- Kind: constant
- Import: `import { runtimeDeterminismScopeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeDeterminismScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }, { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }>;
```

## `runtimeDeterministicObservationDefinition`

Runtime Deterministic Observation Definition constant exported by the `contracts/runtime-helper-schemas` module.

- Kind: constant
- Import: `import { runtimeDeterministicObservationDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeDeterministicObservationDefinition: SpecSchemaDefinition<RuntimeDeterministicObservation<RuntimeJsonValue>>;
```

## `runtimeDeterministicObservationExample`

Valid example value for Runtime Deterministic Observation.

- Kind: constant
- Import: `import { runtimeDeterministicObservationExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeDeterministicObservationExample: RuntimeDeterministicObservation<RuntimeJsonValue>;
```

## `runtimeDeterministicObservationJsonSchema`

JSON Schema for Runtime Deterministic Observation.

- Kind: constant
- Import: `import { runtimeDeterministicObservationJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeDeterministicObservationJsonSchema: JsonSchema;
```

## `runtimeDeterministicObservationSchema`

Runtime schema for Runtime Deterministic Observation.

- Kind: constant
- Import: `import { runtimeDeterministicObservationSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeDeterministicObservationSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }, { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }>; key: z.ZodString; kind: z.ZodEnum<["clock", "id"]>; value: z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>; }, "strict", z.ZodTypeAny, { value: RuntimeJsonValue; scope: { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; key: string; kind: "id" | "clock"; }, { value: RuntimeJsonValue; scope: { runId: string; userId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; key: string; kind: "id" | "clock"; }>;
```

## `runtimeHelperContractDefinitions`

Runtime Helper Contract Definitions constant exported by the `contracts/runtime-helper-schemas` module.

- Kind: constant
- Import: `import { runtimeHelperContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeHelperContractDefinitions: readonly [SpecSchemaDefinition<RuntimeTransitionProposal>, SpecSchemaDefinition<RuntimeWaitIntent>, SpecSchemaDefinition<RuntimeStateExecutionResult>, SpecSchemaDefinition<RuntimeDeterministicObservation<RuntimeJsonValue>>, SpecSchemaDefinition<RuntimeObservationEventInput<RuntimeJsonValue>>];
```

## `runtimeHelperContractJsonSchemas`

Runtime Helper Contract JSON Schemas constant exported by the `contracts/runtime-helper-schemas` module.

- Kind: constant
- Import: `import { runtimeHelperContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeHelperContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeHelperExecutionScopeSchema`

Runtime schema for Runtime Helper Execution Scope.

- Kind: constant
- Import: `import { runtimeHelperExecutionScopeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeHelperExecutionScopeSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; stateId: z.ZodString; stateAttempt: z.ZodNumber; fencingToken: z.ZodNumber; correlationId: z.ZodString; causationId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { correlationId: string; scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; stateAttempt: number; stateId: string; fencingToken: number; causationId?: string | undefined; }, { correlationId: string; scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; stateAttempt: number; stateId: string; fencingToken: number; causationId?: string | undefined; }>;
```

## `runtimeObservationEventInputDefinition`

Runtime Observation Event Input Definition constant exported by the `contracts/runtime-helper-schemas` module.

- Kind: constant
- Import: `import { runtimeObservationEventInputDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeObservationEventInputDefinition: SpecSchemaDefinition<RuntimeObservationEventInput<RuntimeJsonValue>>;
```

## `runtimeObservationEventInputExample`

Valid example value for Runtime Observation Event Input.

- Kind: constant
- Import: `import { runtimeObservationEventInputExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeObservationEventInputExample: RuntimeObservationEventInput<RuntimeJsonValue>;
```

## `runtimeObservationEventInputJsonSchema`

JSON Schema for Runtime Observation Event Input.

- Kind: constant
- Import: `import { runtimeObservationEventInputJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeObservationEventInputJsonSchema: JsonSchema;
```

## `runtimeObservationEventInputSchema`

Runtime schema for Runtime Observation Event Input.

- Kind: constant
- Import: `import { runtimeObservationEventInputSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeObservationEventInputSchema: z.ZodObject<{ type: z.ZodType<`runtime.observation.${string}`, z.ZodTypeDef, `runtime.observation.${string}`>; payload: z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>; options: z.ZodOptional<z.ZodObject<{ idempotencyKey: z.ZodOptional<z.ZodString>; causationId: z.ZodOptional<z.ZodString>; parentEventId: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>>>; }, "strict", z.ZodTypeAny, { metadata?: Record<string, RuntimeJsonValue> | undefined; causationId?: string | undefined; parentEventId?: string | undefined; idempotencyKey?: string | undefined; }, { metadata?: Record<string, RuntimeJsonValue> | undefined; causationId?: string | undefined; parentEventId?: string | undefined; idempotencyKey?: string | undefined; }>>; }, "strict", z.ZodTypeAny, { type: `runtime.observation.${string}`; payload: RuntimeJsonValue; options?: { metadata?: Record<string, RuntimeJsonValue> | undefined; causationId?: string | undefined; parentEventId?: string | undefined; idempotencyKey?: string | undefined; } | undefined; }, { type: `runtime.observation.${string}`; payload: RuntimeJsonValue; options?: { metadata?: Record<string, RuntimeJsonValue> | undefined; causationId?: string | undefined; parentEventId?: string | undefined; idempotencyKey?: string | undefined; } | undefined; }>;
```

## `runtimeStateExecutionResultDefinition`

Runtime State Execution Result Definition constant exported by the `contracts/runtime-helper-schemas` module.

- Kind: constant
- Import: `import { runtimeStateExecutionResultDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeStateExecutionResultDefinition: SpecSchemaDefinition<RuntimeStateExecutionResult>;
```

## `runtimeStateExecutionResultExample`

Valid example value for Runtime State Execution Result.

- Kind: constant
- Import: `import { runtimeStateExecutionResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeStateExecutionResultExample: RuntimeStateExecutionResult;
```

## `runtimeStateExecutionResultJsonSchema`

JSON Schema for Runtime State Execution Result.

- Kind: constant
- Import: `import { runtimeStateExecutionResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeStateExecutionResultJsonSchema: JsonSchema;
```

## `runtimeStateExecutionResultSchema`

Runtime schema for Runtime State Execution Result.

- Kind: constant
- Import: `import { runtimeStateExecutionResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeStateExecutionResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeStateExecutionResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeTransitionProposalDefinition`

Runtime Transition Proposal Definition constant exported by the `contracts/runtime-helper-schemas` module.

- Kind: constant
- Import: `import { runtimeTransitionProposalDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeTransitionProposalDefinition: SpecSchemaDefinition<RuntimeTransitionProposal>;
```

## `runtimeTransitionProposalExample`

Valid example value for Runtime Transition Proposal.

- Kind: constant
- Import: `import { runtimeTransitionProposalExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeTransitionProposalExample: RuntimeTransitionProposal;
```

## `runtimeTransitionProposalJsonSchema`

JSON Schema for Runtime Transition Proposal.

- Kind: constant
- Import: `import { runtimeTransitionProposalJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeTransitionProposalJsonSchema: JsonSchema;
```

## `runtimeTransitionProposalSchema`

Runtime schema for Runtime Transition Proposal.

- Kind: constant
- Import: `import { runtimeTransitionProposalSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeTransitionProposalSchema: z.ZodObject<{ to: z.ZodString; reason: z.ZodOptional<z.ZodString>; variablesPatch: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>>>; }, "strict", z.ZodTypeAny, { to: string; reason?: string | undefined; variablesPatch?: Record<string, RuntimeJsonValue> | undefined; }, { to: string; reason?: string | undefined; variablesPatch?: Record<string, RuntimeJsonValue> | undefined; }>;
```

## `runtimeWaitIntentDefinition`

Runtime Wait Intent Definition constant exported by the `contracts/runtime-helper-schemas` module.

- Kind: constant
- Import: `import { runtimeWaitIntentDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeWaitIntentDefinition: SpecSchemaDefinition<RuntimeWaitIntent>;
```

## `runtimeWaitIntentExample`

Valid example value for Runtime Wait Intent.

- Kind: constant
- Import: `import { runtimeWaitIntentExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeWaitIntentExample: RuntimeWaitIntent;
```

## `runtimeWaitIntentJsonSchema`

JSON Schema for Runtime Wait Intent.

- Kind: constant
- Import: `import { runtimeWaitIntentJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeWaitIntentJsonSchema: JsonSchema;
```

## `runtimeWaitIntentSchema`

Runtime schema for Runtime Wait Intent.

- Kind: constant
- Import: `import { runtimeWaitIntentSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare const runtimeWaitIntentSchema: z.ZodEffects<z.ZodObject<{ type: z.ZodEnum<["human", "signal", "timer", "pause"]>; key: z.ZodOptional<z.ZodString>; expectedSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; expiresAt: z.ZodOptional<z.ZodString>; timeoutTransitionId: z.ZodOptional<z.ZodString>; pendingActionRef: z.ZodOptional<z.ZodString>; reason: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>>>; }, "strict", z.ZodTypeAny, { type: "signal" | "human" | "timer" | "pause"; reason?: string | undefined; metadata?: Record<string, RuntimeJsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }, { type: "signal" | "human" | "timer" | "pause"; reason?: string | undefined; metadata?: Record<string, RuntimeJsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }>, { type: "signal" | "human" | "timer" | "pause"; reason?: string | undefined; metadata?: Record<string, RuntimeJsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }, { type: "signal" | "human" | "timer" | "pause"; reason?: string | undefined; metadata?: Record<string, RuntimeJsonValue> | undefined; expiresAt?: string | undefined; key?: string | undefined; pendingActionRef?: string | undefined; expectedSchema?: JsonSchema | undefined; timeoutTransitionId?: string | undefined; }>;
```

## `validateRuntimeDeterministicObservation`

Validate Runtime Deterministic Observation function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeDeterministicObservation } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare function validateRuntimeDeterministicObservation(input: unknown): RuntimeDeterministicObservation;
```

### Call signature

```text
validateRuntimeDeterministicObservation(input: unknown): RuntimeDeterministicObservation
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeDeterministicObservation<RuntimeJsonValue>`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeHelperExecutionScope`

Validate Runtime Helper Execution Scope function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeHelperExecutionScope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare function validateRuntimeHelperExecutionScope(input: unknown): RuntimeHelperExecutionScope;
```

### Call signature

```text
validateRuntimeHelperExecutionScope(input: unknown): RuntimeHelperExecutionScope
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeHelperExecutionScope`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeObservationEventInput`

Validate Runtime Observation Event Input function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeObservationEventInput } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare function validateRuntimeObservationEventInput(input: unknown): RuntimeObservationEventInput;
```

### Call signature

```text
validateRuntimeObservationEventInput(input: unknown): RuntimeObservationEventInput
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeObservationEventInput<RuntimeJsonValue>`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeStateExecutionResult`

Validate Runtime State Execution Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeStateExecutionResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare function validateRuntimeStateExecutionResult(input: unknown): RuntimeStateExecutionResult;
```

### Call signature

```text
validateRuntimeStateExecutionResult(input: unknown): RuntimeStateExecutionResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeStateExecutionResult`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeTransitionProposal`

Validate Runtime Transition Proposal function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeTransitionProposal } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare function validateRuntimeTransitionProposal(input: unknown): RuntimeTransitionProposal;
```

### Call signature

```text
validateRuntimeTransitionProposal(input: unknown): RuntimeTransitionProposal
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeTransitionProposal`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeWaitIntent`

Validate Runtime Wait Intent function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeWaitIntent } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helper-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helper-schemas.ts)

### Declaration

```text
export declare function validateRuntimeWaitIntent(input: unknown): RuntimeWaitIntent;
```

### Call signature

```text
validateRuntimeWaitIntent(input: unknown): RuntimeWaitIntent
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeWaitIntent`
- Description: The return contract is defined by the type shown above.
