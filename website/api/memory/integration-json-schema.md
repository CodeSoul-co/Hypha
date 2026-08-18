# `@codesoul-co/hypha-memory` / `integration-json-schema`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/integration-json-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)
- Exports: **21**

## Using this module

Use the Integration JSON schema module for declaring and runtime-validating contracts. It exports 21 constants.

### Import from the package entrypoint

```ts
import {
  domainMemoryDependencySnapshotExample,
  domainMemoryDependencySnapshotJsonSchema,
  domainMemoryDependencySnapshotSpecDefinition,
  memoryCacheInvalidationExample,
  memoryCacheInvalidationJsonSchema,
  memoryCacheInvalidationSpecDefinition,
  memoryCacheValidityInputJsonSchema,
  memoryCacheValidityInputSpecDefinition,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- The 21 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `domainMemoryDependencySnapshotExample` | constant | <code>const domainMemoryDependencySnapshotExample: DomainMemoryDependencySnapshot</code> | Valid example value for Domain Memory Dependency Snapshot. |
| `domainMemoryDependencySnapshotJsonSchema` | constant | <code>const domainMemoryDependencySnapshotJsonSchema: JsonSchema</code> | JSON Schema for Domain Memory Dependency Snapshot. |
| `domainMemoryDependencySnapshotSpecDefinition` | constant | <code>const domainMemoryDependencySnapshotSpecDefinition: SpecSchemaDefinition&lt;DomainMemoryDependencySnapshot&gt;</code> | Runtime validation entrypoint for the Domain Memory Dependency Snapshot spec, combining its parser, example and JSON Schema. |
| `memoryCacheInvalidationExample` | constant | <code>const memoryCacheInvalidationExample: MemoryCacheInvalidation</code> | Valid example value for Memory Cache Invalidation. |
| `memoryCacheInvalidationJsonSchema` | constant | <code>const memoryCacheInvalidationJsonSchema: JsonSchema</code> | JSON Schema for Memory Cache Invalidation. |
| `memoryCacheInvalidationSpecDefinition` | constant | <code>const memoryCacheInvalidationSpecDefinition: SpecSchemaDefinition&lt;MemoryCacheInvalidation&gt;</code> | Runtime validation entrypoint for the Memory Cache Invalidation spec, combining its parser, example and JSON Schema. |
| `memoryCacheValidityInputJsonSchema` | constant | <code>const memoryCacheValidityInputJsonSchema: JsonSchema</code> | JSON Schema for Memory Cache Validity Input. |
| `memoryCacheValidityInputSpecDefinition` | constant | <code>const memoryCacheValidityInputSpecDefinition: SpecSchemaDefinition&lt;MemoryCacheValidityInput&gt;</code> | Runtime validation entrypoint for the Memory Cache Validity Input spec, combining its parser, example and JSON Schema. |
| `memoryEvaluationCaseJsonSchema` | constant | <code>const memoryEvaluationCaseJsonSchema: JsonSchema</code> | JSON Schema for Memory Evaluation Case. |
| `memoryEvaluationCaseSpecDefinition` | constant | <code>const memoryEvaluationCaseSpecDefinition: SpecSchemaDefinition&lt;MemoryEvaluationCase&gt;</code> | Runtime validation entrypoint for the Memory Evaluation Case spec, combining its parser, example and JSON Schema. |
| `memoryEvaluationObservationExample` | constant | <code>const memoryEvaluationObservationExample: MemoryEvaluationObservation</code> | Valid example value for Memory Evaluation Observation. |
| `memoryEvaluationObservationJsonSchema` | constant | <code>const memoryEvaluationObservationJsonSchema: JsonSchema</code> | JSON Schema for Memory Evaluation Observation. |
| `memoryEvaluationObservationSpecDefinition` | constant | <code>const memoryEvaluationObservationSpecDefinition: SpecSchemaDefinition&lt;MemoryEvaluationObservation&gt;</code> | Runtime validation entrypoint for the Memory Evaluation Observation spec, combining its parser, example and JSON Schema. |
| `memoryIntegrationJsonSchemas` | constant | <code>const memoryIntegrationJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Memory Integration JSON Schemas constant exported by the `integration-json-schema` module. |
| `memoryIntegrationSpecDefinitions` | constant | <code>const memoryIntegrationSpecDefinitions: readonly [SpecSchemaDefinition&lt;WorkflowStateMemoryBinding&gt;, SpecSchemaDefinition&lt;SessionMemoryBinding&gt;, SpecSchemaDefinition&lt;DomainMemoryDependencySnapshot&gt;, SpecSchemaDefinition&lt;MemoryCacheValidityInput&gt;, SpecSchemaDefinition&lt;MemoryCacheInvalidation&gt;, SpecSchemaDefinition&lt;MemoryReplayReference&gt;, SpecSchemaDefinition&lt;MemoryEvaluationCase&gt;, SpecSchemaDefinition&lt;MemoryEvaluati...</code> | Memory Integration Spec Definitions constant exported by the `integration-json-schema` module. |
| `memoryReplayReferenceJsonSchema` | constant | <code>const memoryReplayReferenceJsonSchema: JsonSchema</code> | JSON Schema for Memory Replay Reference. |
| `memoryReplayReferenceSpecDefinition` | constant | <code>const memoryReplayReferenceSpecDefinition: SpecSchemaDefinition&lt;MemoryReplayReference&gt;</code> | Runtime validation entrypoint for the Memory Replay Reference spec, combining its parser, example and JSON Schema. |
| `sessionMemoryBindingJsonSchema` | constant | <code>const sessionMemoryBindingJsonSchema: JsonSchema</code> | JSON Schema for Session Memory Binding. |
| `sessionMemoryBindingSpecDefinition` | constant | <code>const sessionMemoryBindingSpecDefinition: SpecSchemaDefinition&lt;SessionMemoryBinding&gt;</code> | Runtime validation entrypoint for the Session Memory Binding spec, combining its parser, example and JSON Schema. |
| `workflowStateMemoryBindingJsonSchema` | constant | <code>const workflowStateMemoryBindingJsonSchema: JsonSchema</code> | JSON Schema for Workflow State Memory Binding. |
| `workflowStateMemoryBindingSpecDefinition` | constant | <code>const workflowStateMemoryBindingSpecDefinition: SpecSchemaDefinition&lt;WorkflowStateMemoryBinding&gt;</code> | Runtime validation entrypoint for the Workflow State Memory Binding spec, combining its parser, example and JSON Schema. |

## `domainMemoryDependencySnapshotExample`

Valid example value for Domain Memory Dependency Snapshot.

- Kind: constant
- Import: `import { domainMemoryDependencySnapshotExample } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const domainMemoryDependencySnapshotExample: DomainMemoryDependencySnapshot;
```

## `domainMemoryDependencySnapshotJsonSchema`

JSON Schema for Domain Memory Dependency Snapshot.

- Kind: constant
- Import: `import { domainMemoryDependencySnapshotJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const domainMemoryDependencySnapshotJsonSchema: JsonSchema;
```

## `domainMemoryDependencySnapshotSpecDefinition`

Runtime validation entrypoint for the Domain Memory Dependency Snapshot spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { domainMemoryDependencySnapshotSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const domainMemoryDependencySnapshotSpecDefinition: SpecSchemaDefinition<DomainMemoryDependencySnapshot>;
```

## `memoryCacheInvalidationExample`

Valid example value for Memory Cache Invalidation.

- Kind: constant
- Import: `import { memoryCacheInvalidationExample } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const memoryCacheInvalidationExample: MemoryCacheInvalidation;
```

## `memoryCacheInvalidationJsonSchema`

JSON Schema for Memory Cache Invalidation.

- Kind: constant
- Import: `import { memoryCacheInvalidationJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const memoryCacheInvalidationJsonSchema: JsonSchema;
```

## `memoryCacheInvalidationSpecDefinition`

Runtime validation entrypoint for the Memory Cache Invalidation spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { memoryCacheInvalidationSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const memoryCacheInvalidationSpecDefinition: SpecSchemaDefinition<MemoryCacheInvalidation>;
```

## `memoryCacheValidityInputJsonSchema`

JSON Schema for Memory Cache Validity Input.

- Kind: constant
- Import: `import { memoryCacheValidityInputJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const memoryCacheValidityInputJsonSchema: JsonSchema;
```

## `memoryCacheValidityInputSpecDefinition`

Runtime validation entrypoint for the Memory Cache Validity Input spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { memoryCacheValidityInputSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const memoryCacheValidityInputSpecDefinition: SpecSchemaDefinition<MemoryCacheValidityInput>;
```

## `memoryEvaluationCaseJsonSchema`

JSON Schema for Memory Evaluation Case.

- Kind: constant
- Import: `import { memoryEvaluationCaseJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const memoryEvaluationCaseJsonSchema: JsonSchema;
```

## `memoryEvaluationCaseSpecDefinition`

Runtime validation entrypoint for the Memory Evaluation Case spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { memoryEvaluationCaseSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const memoryEvaluationCaseSpecDefinition: SpecSchemaDefinition<MemoryEvaluationCase>;
```

## `memoryEvaluationObservationExample`

Valid example value for Memory Evaluation Observation.

- Kind: constant
- Import: `import { memoryEvaluationObservationExample } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const memoryEvaluationObservationExample: MemoryEvaluationObservation;
```

## `memoryEvaluationObservationJsonSchema`

JSON Schema for Memory Evaluation Observation.

- Kind: constant
- Import: `import { memoryEvaluationObservationJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const memoryEvaluationObservationJsonSchema: JsonSchema;
```

## `memoryEvaluationObservationSpecDefinition`

Runtime validation entrypoint for the Memory Evaluation Observation spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { memoryEvaluationObservationSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const memoryEvaluationObservationSpecDefinition: SpecSchemaDefinition<MemoryEvaluationObservation>;
```

## `memoryIntegrationJsonSchemas`

Memory Integration JSON Schemas constant exported by the `integration-json-schema` module.

- Kind: constant
- Import: `import { memoryIntegrationJsonSchemas } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const memoryIntegrationJsonSchemas: Record<string, JsonSchema>;
```

## `memoryIntegrationSpecDefinitions`

Memory Integration Spec Definitions constant exported by the `integration-json-schema` module.

- Kind: constant
- Import: `import { memoryIntegrationSpecDefinitions } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const memoryIntegrationSpecDefinitions: readonly [SpecSchemaDefinition<WorkflowStateMemoryBinding>, SpecSchemaDefinition<SessionMemoryBinding>, SpecSchemaDefinition<DomainMemoryDependencySnapshot>, SpecSchemaDefinition<MemoryCacheValidityInput>, SpecSchemaDefinition<MemoryCacheInvalidation>, SpecSchemaDefinition<MemoryReplayReference>, SpecSchemaDefinition<MemoryEvaluationCase>, SpecSchemaDefinition<MemoryEvaluationObservation>];
```

## `memoryReplayReferenceJsonSchema`

JSON Schema for Memory Replay Reference.

- Kind: constant
- Import: `import { memoryReplayReferenceJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const memoryReplayReferenceJsonSchema: JsonSchema;
```

## `memoryReplayReferenceSpecDefinition`

Runtime validation entrypoint for the Memory Replay Reference spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { memoryReplayReferenceSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const memoryReplayReferenceSpecDefinition: SpecSchemaDefinition<MemoryReplayReference>;
```

## `sessionMemoryBindingJsonSchema`

JSON Schema for Session Memory Binding.

- Kind: constant
- Import: `import { sessionMemoryBindingJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const sessionMemoryBindingJsonSchema: JsonSchema;
```

## `sessionMemoryBindingSpecDefinition`

Runtime validation entrypoint for the Session Memory Binding spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { sessionMemoryBindingSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const sessionMemoryBindingSpecDefinition: SpecSchemaDefinition<SessionMemoryBinding>;
```

## `workflowStateMemoryBindingJsonSchema`

JSON Schema for Workflow State Memory Binding.

- Kind: constant
- Import: `import { workflowStateMemoryBindingJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const workflowStateMemoryBindingJsonSchema: JsonSchema;
```

## `workflowStateMemoryBindingSpecDefinition`

Runtime validation entrypoint for the Workflow State Memory Binding spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { workflowStateMemoryBindingSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### Declaration

```text
export declare const workflowStateMemoryBindingSpecDefinition: SpecSchemaDefinition<WorkflowStateMemoryBinding>;
```
