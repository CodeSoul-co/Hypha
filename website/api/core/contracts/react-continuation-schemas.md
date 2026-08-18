# `@codesoul-co/hypha-core` / `contracts/react-continuation-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/react-continuation-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)
- Exports: **12**

## Using this module

Use the React continuation schemas module for declaring and runtime-validating contracts. It exports 10 constants, 2 functions.

### Import from the package entrypoint

```ts
import {
  continueReActCommandPayloadDefinition,
  continueReActCommandPayloadV1Example,
  continueReActCommandPayloadV1JsonSchema,
  continueReActCommandPayloadV1Schema,
  reActContinuationContractDefinitions,
  reActContinuationContractJsonSchemas,
  reActQuantumDescriptorDefinition,
  reActQuantumDescriptorExample,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 10 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { continueReActCommandPayloadV1Schema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = continueReActCommandPayloadV1Schema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `continueReActCommandPayloadDefinition` | constant | <code>const continueReActCommandPayloadDefinition: SpecSchemaDefinition&lt;ContinueReActCommandPayloadV1&gt;</code> | Continue ReAct Command Payload Definition constant exported by the `contracts/react-continuation-schemas` module. |
| `continueReActCommandPayloadV1Example` | constant | <code>const continueReActCommandPayloadV1Example: ContinueReActCommandPayloadV1</code> | Valid example value for Continue ReAct Command Payload V1. |
| `continueReActCommandPayloadV1JsonSchema` | constant | <code>const continueReActCommandPayloadV1JsonSchema: JsonSchema</code> | JSON Schema for Continue ReAct Command Payload V1. |
| `continueReActCommandPayloadV1Schema` | constant | <code>const continueReActCommandPayloadV1Schema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; runId: z.ZodString; sessionId: z.ZodString; userId: z.ZodString; stepId: z.ZodString; checkpointRef: z.ZodString; checkpointHash: z.ZodString; checkpointSequence: z.ZodNumber; scopeHash: z.ZodString; agentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict",...</code> | Runtime schema for Continue ReAct Command Payload V1. |
| `reActContinuationContractDefinitions` | constant | <code>const reActContinuationContractDefinitions: readonly [SpecSchemaDefinition&lt;ContinueReActCommandPayloadV1&gt;, SpecSchemaDefinition&lt;ReActQuantumDescriptor&gt;]</code> | Re Act Continuation Contract Definitions constant exported by the `contracts/react-continuation-schemas` module. |
| `reActContinuationContractJsonSchemas` | constant | <code>const reActContinuationContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Re Act Continuation Contract JSON Schemas constant exported by the `contracts/react-continuation-schemas` module. |
| `reActQuantumDescriptorDefinition` | constant | <code>const reActQuantumDescriptorDefinition: SpecSchemaDefinition&lt;ReActQuantumDescriptor&gt;</code> | Re Act Quantum Descriptor Definition constant exported by the `contracts/react-continuation-schemas` module. |
| `reActQuantumDescriptorExample` | constant | <code>const reActQuantumDescriptorExample: ReActQuantumDescriptor</code> | Valid example value for Re Act Quantum Descriptor. |
| `reActQuantumDescriptorJsonSchema` | constant | <code>const reActQuantumDescriptorJsonSchema: JsonSchema</code> | JSON Schema for Re Act Quantum Descriptor. |
| `reActQuantumDescriptorSchema` | constant | <code>const reActQuantumDescriptorSchema: z.ZodDiscriminatedUnion&lt;"trigger", [z.ZodObject&lt;{ trigger: z.ZodLiteral&lt;"initial"&gt;; version: z.ZodLiteral&lt;"1.0.0"&gt;; runId: z.ZodString; sessionId: z.ZodString; userId: z.ZodString; stepId: z.ZodString; scopeHash: z.ZodString; agentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { id: string...</code> | Runtime schema for Re Act Quantum Descriptor. |
| `validateContinueReActCommandPayload` | function | <code>validateContinueReActCommandPayload(input: unknown): ContinueReActCommandPayloadV1</code> | Validate Continue ReAct Command Payload function with 1 public call signature; parameters and return types are listed below. |
| `validateReActQuantumDescriptor` | function | <code>validateReActQuantumDescriptor(input: unknown): ReActQuantumDescriptor</code> | Validate ReAct Quantum Descriptor function with 1 public call signature; parameters and return types are listed below. |

## `continueReActCommandPayloadDefinition`

Continue ReAct Command Payload Definition constant exported by the `contracts/react-continuation-schemas` module.

- Kind: constant
- Import: `import { continueReActCommandPayloadDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### Declaration

```text
export declare const continueReActCommandPayloadDefinition: SpecSchemaDefinition<ContinueReActCommandPayloadV1>;
```

## `continueReActCommandPayloadV1Example`

Valid example value for Continue ReAct Command Payload V1.

- Kind: constant
- Import: `import { continueReActCommandPayloadV1Example } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### Declaration

```text
export declare const continueReActCommandPayloadV1Example: ContinueReActCommandPayloadV1;
```

## `continueReActCommandPayloadV1JsonSchema`

JSON Schema for Continue ReAct Command Payload V1.

- Kind: constant
- Import: `import { continueReActCommandPayloadV1JsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### Declaration

```text
export declare const continueReActCommandPayloadV1JsonSchema: JsonSchema;
```

## `continueReActCommandPayloadV1Schema`

Runtime schema for Continue ReAct Command Payload V1.

- Kind: constant
- Import: `import { continueReActCommandPayloadV1Schema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### Declaration

```text
export declare const continueReActCommandPayloadV1Schema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; runId: z.ZodString; sessionId: z.ZodString; userId: z.ZodString; stepId: z.ZodString; checkpointRef: z.ZodString; checkpointHash: z.ZodString; checkpointSequence: z.ZodNumber; scopeHash: z.ZodString; agentRef: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>; domainPackRef: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>; workflowRef: z.ZodOptional<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>>; promptSnapshotRef: z.ZodString; promptSnapshotHash: z.ZodString; capabilitySnapshotRef: z.ZodString; capabilitySnapshotHash: z.ZodString; memoryContextRef: z.ZodOptional<z.ZodString>; workspaceRef: z.ZodOptional<z.ZodString>; executionRef: z.ZodOptional<z.ZodString>; pendingOperationReceipts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; globalBudget: z.ZodObject<{ iterations: z.ZodNumber; modelCalls: z.ZodNumber; toolCalls: z.ZodNumber; totalTokens: z.ZodNumber; }, "strict", z.ZodTypeAny, { iterations: number; modelCalls: number; toolCalls: number; totalTokens: number; }, { iterations: number; modelCalls: number; toolCalls: number; totalTokens: number; }>; deadlineAt: z.ZodOptional<z.ZodString>; cancellationRevision: z.ZodNumber; createdAt: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; runId: string; version: "1.0.0"; createdAt: string; stepId: string; checkpointSequence: number; checkpointRef: string; domainPackRef: { id: string; revision?: string | undefined; version?: string | undefined; }; scopeHash: string; checkpointHash: string; agentRef: { id: string; revision?: string | undefined; version?: string | undefined; }; promptSnapshotRef: string; promptSnapshotHash: string; capabilitySnapshotRef: string; capabilitySnapshotHash: string; globalBudget: { iterations: number; modelCalls: number; toolCalls: number; totalTokens: number; }; cancellationRevision: number; deadlineAt?: string | undefined; workflowRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; memoryContextRef?: string | undefined; workspaceRef?: string | undefined; executionRef?: string | undefined; pendingOperationReceipts?: string[] | undefined; }, { userId: string; sessionId: string; runId: string; version: "1.0.0"; createdAt: string; stepId: string; checkpointSequence: number; checkpointRef: string; domainPackRef: { id: string; revision?: string | undefined; version?: string | undefined; }; scopeHash: string; checkpointHash: string; agentRef: { id: string; revision?: string | undefined; version?: string | undefined; }; promptSnapshotRef: string; promptSnapshotHash: string; capabilitySnapshotRef: string; capabilitySnapshotHash: string; globalBudget: { iterations: number; modelCalls: number; toolCalls: number; totalTokens: number; }; cancellationRevision: number; deadlineAt?: string | undefined; workflowRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; memoryContextRef?: string | undefined; workspaceRef?: string | undefined; executionRef?: string | undefined; pendingOperationReceipts?: string[] | undefined; }>;
```

## `reActContinuationContractDefinitions`

Re Act Continuation Contract Definitions constant exported by the `contracts/react-continuation-schemas` module.

- Kind: constant
- Import: `import { reActContinuationContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### Declaration

```text
export declare const reActContinuationContractDefinitions: readonly [SpecSchemaDefinition<ContinueReActCommandPayloadV1>, SpecSchemaDefinition<ReActQuantumDescriptor>];
```

## `reActContinuationContractJsonSchemas`

Re Act Continuation Contract JSON Schemas constant exported by the `contracts/react-continuation-schemas` module.

- Kind: constant
- Import: `import { reActContinuationContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### Declaration

```text
export declare const reActContinuationContractJsonSchemas: Record<string, JsonSchema>;
```

## `reActQuantumDescriptorDefinition`

Re Act Quantum Descriptor Definition constant exported by the `contracts/react-continuation-schemas` module.

- Kind: constant
- Import: `import { reActQuantumDescriptorDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### Declaration

```text
export declare const reActQuantumDescriptorDefinition: SpecSchemaDefinition<ReActQuantumDescriptor>;
```

## `reActQuantumDescriptorExample`

Valid example value for Re Act Quantum Descriptor.

- Kind: constant
- Import: `import { reActQuantumDescriptorExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### Declaration

```text
export declare const reActQuantumDescriptorExample: ReActQuantumDescriptor;
```

## `reActQuantumDescriptorJsonSchema`

JSON Schema for Re Act Quantum Descriptor.

- Kind: constant
- Import: `import { reActQuantumDescriptorJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### Declaration

```text
export declare const reActQuantumDescriptorJsonSchema: JsonSchema;
```

## `reActQuantumDescriptorSchema`

Runtime schema for Re Act Quantum Descriptor.

- Kind: constant
- Import: `import { reActQuantumDescriptorSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const reActQuantumDescriptorSchema: (typeof import('@codesoul-co/hypha-core'))['reActQuantumDescriptorSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `validateContinueReActCommandPayload`

Validate Continue ReAct Command Payload function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateContinueReActCommandPayload } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### Declaration

```text
export declare function validateContinueReActCommandPayload(input: unknown): ContinueReActCommandPayloadV1;
```

### Call signature

```text
validateContinueReActCommandPayload(input: unknown): ContinueReActCommandPayloadV1
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ContinueReActCommandPayloadV1`
- Description: The return contract is defined by the type shown above.

## `validateReActQuantumDescriptor`

Validate ReAct Quantum Descriptor function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateReActQuantumDescriptor } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### Declaration

```text
export declare function validateReActQuantumDescriptor(input: unknown): ReActQuantumDescriptor;
```

### Call signature

```text
validateReActQuantumDescriptor(input: unknown): ReActQuantumDescriptor
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ReActQuantumDescriptor`
- Description: The return contract is defined by the type shown above.
