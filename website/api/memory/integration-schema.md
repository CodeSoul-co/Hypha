# `@codesoul-co/hypha-memory` / `integration-schema`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/integration-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)
- Exports: **21**

## Using this module

Use the Integration schema module for declaring and runtime-validating contracts. It exports 13 constants, 8 functions.

### Import from the package entrypoint

```ts
import {
  domainMemoryDependencySnapshotSchema,
  memoryCacheInvalidationSchema,
  memoryCacheValidityInputExample,
  memoryCacheValidityInputSchema,
  memoryEvaluationCaseExample,
  memoryEvaluationCaseSchema,
  memoryEvaluationObservationSchema,
  memoryReplayReferenceExample,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 8 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 13 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `domainMemoryDependencySnapshotSchema` | constant | <code>const domainMemoryDependencySnapshotSchema: ZodType&lt;DomainMemoryDependencySnapshot, ZodTypeDef, DomainMemoryDependencySnapshot&gt;</code> | Runtime schema for Domain Memory Dependency Snapshot. |
| `memoryCacheInvalidationSchema` | constant | <code>const memoryCacheInvalidationSchema: ZodType&lt;MemoryCacheInvalidation, ZodTypeDef, MemoryCacheInvalidation&gt;</code> | Runtime schema for Memory Cache Invalidation. |
| `memoryCacheValidityInputExample` | constant | <code>const memoryCacheValidityInputExample: MemoryCacheValidityInput</code> | Valid example value for Memory Cache Validity Input. |
| `memoryCacheValidityInputSchema` | constant | <code>const memoryCacheValidityInputSchema: ZodType&lt;MemoryCacheValidityInput, ZodTypeDef, MemoryCacheValidityInput&gt;</code> | Runtime schema for Memory Cache Validity Input. |
| `memoryEvaluationCaseExample` | constant | <code>const memoryEvaluationCaseExample: MemoryEvaluationCase</code> | Valid example value for Memory Evaluation Case. |
| `memoryEvaluationCaseSchema` | constant | <code>const memoryEvaluationCaseSchema: ZodType&lt;MemoryEvaluationCase, ZodTypeDef, MemoryEvaluationCase&gt;</code> | Runtime schema for Memory Evaluation Case. |
| `memoryEvaluationObservationSchema` | constant | <code>const memoryEvaluationObservationSchema: ZodType&lt;MemoryEvaluationObservation, ZodTypeDef, MemoryEvaluationObservation&gt;</code> | Runtime schema for Memory Evaluation Observation. |
| `memoryReplayReferenceExample` | constant | <code>const memoryReplayReferenceExample: MemoryReplayReference</code> | Valid example value for Memory Replay Reference. |
| `memoryReplayReferenceSchema` | constant | <code>const memoryReplayReferenceSchema: ZodType&lt;MemoryReplayReference, ZodTypeDef, MemoryReplayReference&gt;</code> | Runtime schema for Memory Replay Reference. |
| `sessionMemoryBindingExample` | constant | <code>const sessionMemoryBindingExample: SessionMemoryBinding</code> | Valid example value for Session Memory Binding. |
| `sessionMemoryBindingSchema` | constant | <code>const sessionMemoryBindingSchema: ZodType&lt;SessionMemoryBinding, ZodTypeDef, SessionMemoryBinding&gt;</code> | Runtime schema for Session Memory Binding. |
| `workflowStateMemoryBindingExample` | constant | <code>const workflowStateMemoryBindingExample: WorkflowStateMemoryBinding</code> | Valid example value for Workflow State Memory Binding. |
| `workflowStateMemoryBindingSchema` | constant | <code>const workflowStateMemoryBindingSchema: ZodType&lt;WorkflowStateMemoryBinding, ZodTypeDef, WorkflowStateMemoryBinding&gt;</code> | Runtime schema for Workflow State Memory Binding. |
| `validateDomainMemoryDependencySnapshot` | function | <code>validateDomainMemoryDependencySnapshot(input: unknown): DomainMemoryDependencySnapshot</code> | Validate Domain Memory Dependency Snapshot function with 1 public call signature; parameters and return types are listed below. |
| `validateMemoryCacheInvalidation` | function | <code>validateMemoryCacheInvalidation(input: unknown): MemoryCacheInvalidation</code> | Validate Memory Cache Invalidation function with 1 public call signature; parameters and return types are listed below. |
| `validateMemoryCacheValidityInput` | function | <code>validateMemoryCacheValidityInput(input: unknown): MemoryCacheValidityInput</code> | Validate Memory Cache Validity Input function with 1 public call signature; parameters and return types are listed below. |
| `validateMemoryEvaluationCase` | function | <code>validateMemoryEvaluationCase(input: unknown): MemoryEvaluationCase</code> | Validate Memory Evaluation Case function with 1 public call signature; parameters and return types are listed below. |
| `validateMemoryEvaluationObservation` | function | <code>validateMemoryEvaluationObservation(input: unknown): MemoryEvaluationObservation</code> | Validate Memory Evaluation Observation function with 1 public call signature; parameters and return types are listed below. |
| `validateMemoryReplayReference` | function | <code>validateMemoryReplayReference(input: unknown): MemoryReplayReference</code> | Validate Memory Replay Reference function with 1 public call signature; parameters and return types are listed below. |
| `validateSessionMemoryBinding` | function | <code>validateSessionMemoryBinding(input: unknown): SessionMemoryBinding</code> | Validate Session Memory Binding function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkflowStateMemoryBinding` | function | <code>validateWorkflowStateMemoryBinding(input: unknown): WorkflowStateMemoryBinding</code> | Validate Workflow State Memory Binding function with 1 public call signature; parameters and return types are listed below. |

## `domainMemoryDependencySnapshotSchema`

Runtime schema for Domain Memory Dependency Snapshot.

- Kind: constant
- Import: `import { domainMemoryDependencySnapshotSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare const domainMemoryDependencySnapshotSchema: ZodType<DomainMemoryDependencySnapshot, ZodTypeDef, DomainMemoryDependencySnapshot>;
```

## `memoryCacheInvalidationSchema`

Runtime schema for Memory Cache Invalidation.

- Kind: constant
- Import: `import { memoryCacheInvalidationSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare const memoryCacheInvalidationSchema: ZodType<MemoryCacheInvalidation, ZodTypeDef, MemoryCacheInvalidation>;
```

## `memoryCacheValidityInputExample`

Valid example value for Memory Cache Validity Input.

- Kind: constant
- Import: `import { memoryCacheValidityInputExample } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare const memoryCacheValidityInputExample: MemoryCacheValidityInput;
```

## `memoryCacheValidityInputSchema`

Runtime schema for Memory Cache Validity Input.

- Kind: constant
- Import: `import { memoryCacheValidityInputSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare const memoryCacheValidityInputSchema: ZodType<MemoryCacheValidityInput, ZodTypeDef, MemoryCacheValidityInput>;
```

## `memoryEvaluationCaseExample`

Valid example value for Memory Evaluation Case.

- Kind: constant
- Import: `import { memoryEvaluationCaseExample } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare const memoryEvaluationCaseExample: MemoryEvaluationCase;
```

## `memoryEvaluationCaseSchema`

Runtime schema for Memory Evaluation Case.

- Kind: constant
- Import: `import { memoryEvaluationCaseSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare const memoryEvaluationCaseSchema: ZodType<MemoryEvaluationCase, ZodTypeDef, MemoryEvaluationCase>;
```

## `memoryEvaluationObservationSchema`

Runtime schema for Memory Evaluation Observation.

- Kind: constant
- Import: `import { memoryEvaluationObservationSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare const memoryEvaluationObservationSchema: ZodType<MemoryEvaluationObservation, ZodTypeDef, MemoryEvaluationObservation>;
```

## `memoryReplayReferenceExample`

Valid example value for Memory Replay Reference.

- Kind: constant
- Import: `import { memoryReplayReferenceExample } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare const memoryReplayReferenceExample: MemoryReplayReference;
```

## `memoryReplayReferenceSchema`

Runtime schema for Memory Replay Reference.

- Kind: constant
- Import: `import { memoryReplayReferenceSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare const memoryReplayReferenceSchema: ZodType<MemoryReplayReference, ZodTypeDef, MemoryReplayReference>;
```

## `sessionMemoryBindingExample`

Valid example value for Session Memory Binding.

- Kind: constant
- Import: `import { sessionMemoryBindingExample } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare const sessionMemoryBindingExample: SessionMemoryBinding;
```

## `sessionMemoryBindingSchema`

Runtime schema for Session Memory Binding.

- Kind: constant
- Import: `import { sessionMemoryBindingSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare const sessionMemoryBindingSchema: ZodType<SessionMemoryBinding, ZodTypeDef, SessionMemoryBinding>;
```

## `workflowStateMemoryBindingExample`

Valid example value for Workflow State Memory Binding.

- Kind: constant
- Import: `import { workflowStateMemoryBindingExample } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare const workflowStateMemoryBindingExample: WorkflowStateMemoryBinding;
```

## `workflowStateMemoryBindingSchema`

Runtime schema for Workflow State Memory Binding.

- Kind: constant
- Import: `import { workflowStateMemoryBindingSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare const workflowStateMemoryBindingSchema: ZodType<WorkflowStateMemoryBinding, ZodTypeDef, WorkflowStateMemoryBinding>;
```

## `validateDomainMemoryDependencySnapshot`

Validate Domain Memory Dependency Snapshot function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateDomainMemoryDependencySnapshot } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare function validateDomainMemoryDependencySnapshot(input: unknown): DomainMemoryDependencySnapshot;
```

### Call signature

```text
validateDomainMemoryDependencySnapshot(input: unknown): DomainMemoryDependencySnapshot
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `DomainMemoryDependencySnapshot`
- Description: The return contract is defined by the type shown above.

## `validateMemoryCacheInvalidation`

Validate Memory Cache Invalidation function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemoryCacheInvalidation } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare function validateMemoryCacheInvalidation(input: unknown): MemoryCacheInvalidation;
```

### Call signature

```text
validateMemoryCacheInvalidation(input: unknown): MemoryCacheInvalidation
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryCacheInvalidation`
- Description: The return contract is defined by the type shown above.

## `validateMemoryCacheValidityInput`

Validate Memory Cache Validity Input function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemoryCacheValidityInput } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare function validateMemoryCacheValidityInput(input: unknown): MemoryCacheValidityInput;
```

### Call signature

```text
validateMemoryCacheValidityInput(input: unknown): MemoryCacheValidityInput
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryCacheValidityInput`
- Description: The return contract is defined by the type shown above.

## `validateMemoryEvaluationCase`

Validate Memory Evaluation Case function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemoryEvaluationCase } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare function validateMemoryEvaluationCase(input: unknown): MemoryEvaluationCase;
```

### Call signature

```text
validateMemoryEvaluationCase(input: unknown): MemoryEvaluationCase
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryEvaluationCase`
- Description: The return contract is defined by the type shown above.

## `validateMemoryEvaluationObservation`

Validate Memory Evaluation Observation function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemoryEvaluationObservation } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare function validateMemoryEvaluationObservation(input: unknown): MemoryEvaluationObservation;
```

### Call signature

```text
validateMemoryEvaluationObservation(input: unknown): MemoryEvaluationObservation
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryEvaluationObservation`
- Description: The return contract is defined by the type shown above.

## `validateMemoryReplayReference`

Validate Memory Replay Reference function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemoryReplayReference } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare function validateMemoryReplayReference(input: unknown): MemoryReplayReference;
```

### Call signature

```text
validateMemoryReplayReference(input: unknown): MemoryReplayReference
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryReplayReference`
- Description: The return contract is defined by the type shown above.

## `validateSessionMemoryBinding`

Validate Session Memory Binding function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateSessionMemoryBinding } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare function validateSessionMemoryBinding(input: unknown): SessionMemoryBinding;
```

### Call signature

```text
validateSessionMemoryBinding(input: unknown): SessionMemoryBinding
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SessionMemoryBinding`
- Description: The return contract is defined by the type shown above.

## `validateWorkflowStateMemoryBinding`

Validate Workflow State Memory Binding function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkflowStateMemoryBinding } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### Declaration

```text
export declare function validateWorkflowStateMemoryBinding(input: unknown): WorkflowStateMemoryBinding;
```

### Call signature

```text
validateWorkflowStateMemoryBinding(input: unknown): WorkflowStateMemoryBinding
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkflowStateMemoryBinding`
- Description: The return contract is defined by the type shown above.
