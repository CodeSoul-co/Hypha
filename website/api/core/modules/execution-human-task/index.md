# `@codesoul-co/hypha-core` / `modules/execution-human-task/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-human-task/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)
- Exports: **11**

## Using this module

Use the Index module for executing runtime behavior at this boundary. It exports 7 constants, 3 functions, 1 interface.

### Import from the package entrypoint

```ts
import {
  executionHumanTaskSubjectDefinition,
  executionHumanTaskSubjectDefinitions,
  executionHumanTaskSubjectEnvelopeSchema,
  executionHumanTaskSubjectExample,
  executionHumanTaskSubjectJsonSchema,
  executionHumanTaskSubjectJsonSchemas,
  executionHumanTaskSubjectSchema,
  createExecutionHumanTaskSubject,
} from '@codesoul-co/hypha-core';

import type {
  CreateExecutionHumanTaskSubjectInput,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 7 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { executionHumanTaskSubjectEnvelopeSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionHumanTaskSubjectEnvelopeSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionHumanTaskSubjectDefinition` | constant | <code>const executionHumanTaskSubjectDefinition: SpecSchemaDefinition&lt;ExecutionHumanTaskSubject&gt;</code> | Execution Human Task Subject Definition constant exported by the `modules/execution-human-task/index` module. |
| `executionHumanTaskSubjectDefinitions` | constant | <code>const executionHumanTaskSubjectDefinitions: readonly [SpecSchemaDefinition&lt;ExecutionHumanTaskSubject&gt;]</code> | Execution Human Task Subject Definitions constant exported by the `modules/execution-human-task/index` module. |
| `executionHumanTaskSubjectEnvelopeSchema` | constant | <code>const executionHumanTaskSubjectEnvelopeSchema: z.ZodEffects&lt;z.ZodObject&lt;{ subjectRef: z.ZodString; subjectHash: z.ZodString; subject: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodLiteral&lt;"1.0.0"&gt;; kind: z.ZodLiteral&lt;"execution"&gt;; capturedAt: z.ZodString; principalId: z.ZodString; inputHash: z.ZodString; activity: z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z...</code> | Runtime schema for Execution Human Task Subject Envelope. |
| `executionHumanTaskSubjectExample` | constant | <code>const executionHumanTaskSubjectExample: ExecutionHumanTaskSubject</code> | Valid example value for Execution Human Task Subject. |
| `executionHumanTaskSubjectJsonSchema` | constant | <code>const executionHumanTaskSubjectJsonSchema: JsonSchema</code> | JSON Schema for Execution Human Task Subject. |
| `executionHumanTaskSubjectJsonSchemas` | constant | <code>const executionHumanTaskSubjectJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Execution Human Task Subject JSON Schemas constant exported by the `modules/execution-human-task/index` module. |
| `executionHumanTaskSubjectSchema` | constant | <code>const executionHumanTaskSubjectSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodLiteral&lt;"1.0.0"&gt;; kind: z.ZodLiteral&lt;"execution"&gt;; capturedAt: z.ZodString; principalId: z.ZodString; inputHash: z.ZodString; activity: z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z.ZodString; workspaceId: z.ZodString; fencingToken: z.ZodNumber; deadlineAt: z.ZodOptional&lt;z.Zo...</code> | Runtime schema for Execution Human Task Subject. |
| `createExecutionHumanTaskSubject` | function | <code>createExecutionHumanTaskSubject(input: CreateExecutionHumanTaskSubjectInput): ExecutionHumanTaskSubjectEnvelope</code> | Create Execution Human Task Subject function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionHumanTaskSubject` | function | <code>validateExecutionHumanTaskSubject(input: unknown): ExecutionHumanTaskSubject</code> | Validate Execution Human Task Subject function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionHumanTaskSubjectEnvelope` | function | <code>validateExecutionHumanTaskSubjectEnvelope(input: unknown): ExecutionHumanTaskSubjectEnvelope</code> | Validate Execution Human Task Subject Envelope function with 1 public call signature; parameters and return types are listed below. |
| `CreateExecutionHumanTaskSubjectInput` | interface | <code>interface CreateExecutionHumanTaskSubjectInput</code> | Create Execution Human Task Subject Input interface with 10 public fields or methods. |

## `executionHumanTaskSubjectDefinition`

Execution Human Task Subject Definition constant exported by the `modules/execution-human-task/index` module.

- Kind: constant
- Import: `import { executionHumanTaskSubjectDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### Declaration

```text
export declare const executionHumanTaskSubjectDefinition: SpecSchemaDefinition<ExecutionHumanTaskSubject>;
```

## `executionHumanTaskSubjectDefinitions`

Execution Human Task Subject Definitions constant exported by the `modules/execution-human-task/index` module.

- Kind: constant
- Import: `import { executionHumanTaskSubjectDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### Declaration

```text
export declare const executionHumanTaskSubjectDefinitions: readonly [SpecSchemaDefinition<ExecutionHumanTaskSubject>];
```

## `executionHumanTaskSubjectEnvelopeSchema`

Runtime schema for Execution Human Task Subject Envelope.

- Kind: constant
- Import: `import { executionHumanTaskSubjectEnvelopeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionHumanTaskSubjectEnvelopeSchema: (typeof import('@codesoul-co/hypha-core'))['executionHumanTaskSubjectEnvelopeSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionHumanTaskSubjectExample`

Valid example value for Execution Human Task Subject.

- Kind: constant
- Import: `import { executionHumanTaskSubjectExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### Declaration

```text
export declare const executionHumanTaskSubjectExample: ExecutionHumanTaskSubject;
```

## `executionHumanTaskSubjectJsonSchema`

JSON Schema for Execution Human Task Subject.

- Kind: constant
- Import: `import { executionHumanTaskSubjectJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### Declaration

```text
export declare const executionHumanTaskSubjectJsonSchema: JsonSchema;
```

## `executionHumanTaskSubjectJsonSchemas`

Execution Human Task Subject JSON Schemas constant exported by the `modules/execution-human-task/index` module.

- Kind: constant
- Import: `import { executionHumanTaskSubjectJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### Declaration

```text
export declare const executionHumanTaskSubjectJsonSchemas: Record<string, JsonSchema>;
```

## `executionHumanTaskSubjectSchema`

Runtime schema for Execution Human Task Subject.

- Kind: constant
- Import: `import { executionHumanTaskSubjectSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionHumanTaskSubjectSchema: (typeof import('@codesoul-co/hypha-core'))['executionHumanTaskSubjectSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `createExecutionHumanTaskSubject`

Create Execution Human Task Subject function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createExecutionHumanTaskSubject } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### Declaration

```text
export declare function createExecutionHumanTaskSubject(input: CreateExecutionHumanTaskSubjectInput): ExecutionHumanTaskSubjectEnvelope;
```

### Call signature

```text
createExecutionHumanTaskSubject(input: CreateExecutionHumanTaskSubjectInput): ExecutionHumanTaskSubjectEnvelope
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>CreateExecutionHumanTaskSubjectInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionHumanTaskSubjectEnvelope`
- Description: The return contract is defined by the type shown above.

## `validateExecutionHumanTaskSubject`

Validate Execution Human Task Subject function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionHumanTaskSubject } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### Declaration

```text
export declare function validateExecutionHumanTaskSubject(input: unknown): ExecutionHumanTaskSubject;
```

### Call signature

```text
validateExecutionHumanTaskSubject(input: unknown): ExecutionHumanTaskSubject
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionHumanTaskSubject`
- Description: The return contract is defined by the type shown above.

## `validateExecutionHumanTaskSubjectEnvelope`

Validate Execution Human Task Subject Envelope function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionHumanTaskSubjectEnvelope } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### Declaration

```text
export declare function validateExecutionHumanTaskSubjectEnvelope(input: unknown): ExecutionHumanTaskSubjectEnvelope;
```

### Call signature

```text
validateExecutionHumanTaskSubjectEnvelope(input: unknown): ExecutionHumanTaskSubjectEnvelope
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionHumanTaskSubjectEnvelope`
- Description: The return contract is defined by the type shown above.

## `CreateExecutionHumanTaskSubjectInput`

Create Execution Human Task Subject Input interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { CreateExecutionHumanTaskSubjectInput } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-human-task/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)

### Declaration

```text
export interface CreateExecutionHumanTaskSubjectInput {
    activity: ExecutionActivityRequest;
    binding: ExecutionToolBinding;
    toolRevision?: string;
    riskAssessment: ExecutionRiskAssessment;
    environment: ExecutionEnvironmentSpec;
    providerId: string;
    providerRevision: string;
    inputHash: string;
    policyDecisionRef: string;
    capturedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activity` | property | <code>activity: ExecutionActivityRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `binding` | property | <code>binding: ExecutionToolBinding</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capturedAt` | property | <code>capturedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environment` | property | <code>environment: ExecutionEnvironmentSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyDecisionRef` | property | <code>policyDecisionRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `riskAssessment` | property | <code>riskAssessment: ExecutionRiskAssessment</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRevision` | property | <code>toolRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
