# `@codesoul-co/hypha-memory` / `profile-contract`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/profile-contract.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)
- Exports: **39**

## Using this module

Use the Profile contract module for declaring and runtime-validating contracts. It exports 34 constants, 5 functions.

### Import from the package entrypoint

```ts
import {
  embeddingProviderSpecDefinition,
  embeddingProviderSpecExample,
  embeddingProviderSpecSchema,
  memoryConflictPolicySpecSchema,
  memoryConsolidationPolicySpecSchema,
  memoryContractJsonSchemas,
  memoryContractSpecDefinitions,
  memoryContractSpecRefJsonSchema,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 5 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 34 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { embeddingProviderSpecSchema } from '@codesoul-co/hypha-memory';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = embeddingProviderSpecSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `embeddingProviderSpecDefinition` | constant | <code>const embeddingProviderSpecDefinition: SpecSchemaDefinition&lt;EmbeddingProviderSpec&gt;</code> | Runtime validation entrypoint for the Embedding Provider spec, combining its parser, example and JSON Schema. |
| `embeddingProviderSpecExample` | constant | <code>const embeddingProviderSpecExample: EmbeddingProviderSpec</code> | Valid example value for Embedding Provider Spec. |
| `embeddingProviderSpecSchema` | constant | <code>const embeddingProviderSpecSchema: z.ZodType&lt;EmbeddingProviderSpec, z.ZodTypeDef, EmbeddingProviderSpec&gt;</code> | Runtime schema for Embedding Provider Spec. |
| `memoryConflictPolicySpecSchema` | constant | <code>const memoryConflictPolicySpecSchema: z.ZodType&lt;MemoryConflictPolicySpec, z.ZodTypeDef, MemoryConflictPolicySpec&gt;</code> | Runtime schema for Memory Conflict Policy Spec. |
| `memoryConsolidationPolicySpecSchema` | constant | <code>const memoryConsolidationPolicySpecSchema: z.ZodType&lt;MemoryConsolidationPolicySpec, z.ZodTypeDef, MemoryConsolidationPolicySpec&gt;</code> | Runtime schema for Memory Consolidation Policy Spec. |
| `memoryContractJsonSchemas` | constant | <code>const memoryContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Memory Contract JSON Schemas constant exported by the `profile-contract` module. |
| `memoryContractSpecDefinitions` | constant | <code>const memoryContractSpecDefinitions: readonly [SpecSchemaDefinition&lt;MemoryProfileSpec&gt;, SpecSchemaDefinition&lt;MemoryManagementProviderSpec&gt;, SpecSchemaDefinition&lt;WorkingMemoryStoreSpec&gt;, SpecSchemaDefinition&lt;MemoryRecordStoreSpec&gt;, SpecSchemaDefinition&lt;VectorStoreSpec&gt;, SpecSchemaDefinition&lt;EmbeddingProviderSpec&gt;]</code> | Memory Contract Spec Definitions constant exported by the `profile-contract` module. |
| `memoryContractSpecRefJsonSchema` | constant | <code>const memoryContractSpecRefJsonSchema: JsonSchema</code> | JSON Schema for Memory Contract Spec Ref. |
| `memoryContractSpecRefSchema` | constant | <code>const memoryContractSpecRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }&gt;</code> | Runtime schema for Memory Contract Spec Ref. |
| `memoryFallbackPolicySpecSchema` | constant | <code>const memoryFallbackPolicySpecSchema: z.ZodType&lt;MemoryFallbackPolicySpec, z.ZodTypeDef, MemoryFallbackPolicySpec&gt;</code> | Runtime schema for Memory Fallback Policy Spec. |
| `memoryIndexingPolicySpecSchema` | constant | <code>const memoryIndexingPolicySpecSchema: z.ZodType&lt;MemoryIndexingPolicySpec, z.ZodTypeDef, MemoryIndexingPolicySpec&gt;</code> | Runtime schema for Memory Indexing Policy Spec. |
| `memoryManagementCapabilitiesSchema` | constant | <code>const memoryManagementCapabilitiesSchema: z.ZodType&lt;MemoryManagementCapabilities, z.ZodTypeDef, MemoryManagementCapabilities&gt;</code> | Runtime schema for Memory Management Capabilities. |
| `memoryManagementProviderSpecDefinition` | constant | <code>const memoryManagementProviderSpecDefinition: SpecSchemaDefinition&lt;MemoryManagementProviderSpec&gt;</code> | Runtime validation entrypoint for the Memory Management Provider spec, combining its parser, example and JSON Schema. |
| `memoryManagementProviderSpecExample` | constant | <code>const memoryManagementProviderSpecExample: MemoryManagementProviderSpec</code> | Valid example value for Memory Management Provider Spec. |
| `memoryManagementProviderSpecSchema` | constant | <code>const memoryManagementProviderSpecSchema: z.ZodType&lt;MemoryManagementProviderSpec, z.ZodTypeDef, MemoryManagementProviderSpec&gt;</code> | Runtime schema for Memory Management Provider Spec. |
| `memoryPrivacyPolicySpecSchema` | constant | <code>const memoryPrivacyPolicySpecSchema: z.ZodType&lt;MemoryPrivacyPolicySpec, z.ZodTypeDef, MemoryPrivacyPolicySpec&gt;</code> | Runtime schema for Memory Privacy Policy Spec. |
| `memoryProfileSpecDefinition` | constant | <code>const memoryProfileSpecDefinition: SpecSchemaDefinition&lt;MemoryProfileSpec&gt;</code> | Runtime validation entrypoint for the Memory Profile spec, combining its parser, example and JSON Schema. |
| `memoryProfileSpecExample` | constant | <code>const memoryProfileSpecExample: MemoryProfileSpec</code> | Valid example value for Memory Profile Spec. |
| `memoryProfileSpecJsonSchema` | constant | <code>const memoryProfileSpecJsonSchema: JsonSchema</code> | JSON Schema for Memory Profile Spec. |
| `memoryProfileSpecSchema` | constant | <code>const memoryProfileSpecSchema: z.ZodType&lt;MemoryProfileSpec, z.ZodTypeDef, MemoryProfileSpec&gt;</code> | Runtime schema for Memory Profile Spec. |
| `memoryRecordStoreSpecDefinition` | constant | <code>const memoryRecordStoreSpecDefinition: SpecSchemaDefinition&lt;MemoryRecordStoreSpec&gt;</code> | Runtime validation entrypoint for the Memory Record Store spec, combining its parser, example and JSON Schema. |
| `memoryRecordStoreSpecExample` | constant | <code>const memoryRecordStoreSpecExample: MemoryRecordStoreSpec</code> | Valid example value for Memory Record Store Spec. |
| `memoryRecordStoreSpecSchema` | constant | <code>const memoryRecordStoreSpecSchema: z.ZodType&lt;MemoryRecordStoreSpec, z.ZodTypeDef, MemoryRecordStoreSpec&gt;</code> | Runtime schema for Memory Record Store Spec. |
| `memoryRetentionPolicySpecSchema` | constant | <code>const memoryRetentionPolicySpecSchema: z.ZodType&lt;MemoryRetentionPolicySpec, z.ZodTypeDef, MemoryRetentionPolicySpec&gt;</code> | Runtime schema for Memory Retention Policy Spec. |
| `memoryRetrievalPolicySpecSchema` | constant | <code>const memoryRetrievalPolicySpecSchema: z.ZodType&lt;MemoryRetrievalPolicySpec, z.ZodTypeDef, MemoryRetrievalPolicySpec&gt;</code> | Runtime schema for Memory Retrieval Policy Spec. |
| `memoryScopePolicySpecSchema` | constant | <code>const memoryScopePolicySpecSchema: z.ZodType&lt;MemoryScopePolicySpec, z.ZodTypeDef, MemoryScopePolicySpec&gt;</code> | Runtime schema for Memory Scope Policy Spec. |
| `memoryWritePolicySpecSchema` | constant | <code>const memoryWritePolicySpecSchema: z.ZodType&lt;MemoryWritePolicySpec, z.ZodTypeDef, MemoryWritePolicySpec&gt;</code> | Runtime schema for Memory Write Policy Spec. |
| `vectorStoreCapabilitiesSchema` | constant | <code>const vectorStoreCapabilitiesSchema: z.ZodType&lt;VectorStoreCapabilities, z.ZodTypeDef, VectorStoreCapabilities&gt;</code> | Runtime schema for Vector Store Capabilities. |
| `vectorStoreSpecDefinition` | constant | <code>const vectorStoreSpecDefinition: SpecSchemaDefinition&lt;VectorStoreSpec&gt;</code> | Runtime validation entrypoint for the Vector Store spec, combining its parser, example and JSON Schema. |
| `vectorStoreSpecExample` | constant | <code>const vectorStoreSpecExample: VectorStoreSpec</code> | Valid example value for Vector Store Spec. |
| `vectorStoreSpecSchema` | constant | <code>const vectorStoreSpecSchema: z.ZodType&lt;VectorStoreSpec, z.ZodTypeDef, VectorStoreSpec&gt;</code> | Runtime schema for Vector Store Spec. |
| `workingMemoryStoreSpecDefinition` | constant | <code>const workingMemoryStoreSpecDefinition: SpecSchemaDefinition&lt;WorkingMemoryStoreSpec&gt;</code> | Runtime validation entrypoint for the Working Memory Store spec, combining its parser, example and JSON Schema. |
| `workingMemoryStoreSpecExample` | constant | <code>const workingMemoryStoreSpecExample: WorkingMemoryStoreSpec</code> | Valid example value for Working Memory Store Spec. |
| `workingMemoryStoreSpecSchema` | constant | <code>const workingMemoryStoreSpecSchema: z.ZodType&lt;WorkingMemoryStoreSpec, z.ZodTypeDef, WorkingMemoryStoreSpec&gt;</code> | Runtime schema for Working Memory Store Spec. |
| `validateEmbeddingProviderSpec` | function | <code>validateEmbeddingProviderSpec(input: unknown): EmbeddingProviderSpec</code> | Validate Embedding Provider Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateMemoryProfileSpec` | function | <code>validateMemoryProfileSpec(input: unknown): MemoryProfileSpec</code> | Validate Memory Profile Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateMemoryRecordStoreSpec` | function | <code>validateMemoryRecordStoreSpec(input: unknown): MemoryRecordStoreSpec</code> | Validate Memory Record Store Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateVectorStoreSpec` | function | <code>validateVectorStoreSpec(input: unknown): VectorStoreSpec</code> | Validate Vector Store Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkingMemoryStoreSpec` | function | <code>validateWorkingMemoryStoreSpec(input: unknown): WorkingMemoryStoreSpec</code> | Validate Working Memory Store Spec function with 1 public call signature; parameters and return types are listed below. |

## `embeddingProviderSpecDefinition`

Runtime validation entrypoint for the Embedding Provider spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { embeddingProviderSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const embeddingProviderSpecDefinition: SpecSchemaDefinition<EmbeddingProviderSpec>;
```

## `embeddingProviderSpecExample`

Valid example value for Embedding Provider Spec.

- Kind: constant
- Import: `import { embeddingProviderSpecExample } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const embeddingProviderSpecExample: EmbeddingProviderSpec;
```

## `embeddingProviderSpecSchema`

Runtime schema for Embedding Provider Spec.

- Kind: constant
- Import: `import { embeddingProviderSpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const embeddingProviderSpecSchema: z.ZodType<EmbeddingProviderSpec, z.ZodTypeDef, EmbeddingProviderSpec>;
```

## `memoryConflictPolicySpecSchema`

Runtime schema for Memory Conflict Policy Spec.

- Kind: constant
- Import: `import { memoryConflictPolicySpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryConflictPolicySpecSchema: z.ZodType<MemoryConflictPolicySpec, z.ZodTypeDef, MemoryConflictPolicySpec>;
```

## `memoryConsolidationPolicySpecSchema`

Runtime schema for Memory Consolidation Policy Spec.

- Kind: constant
- Import: `import { memoryConsolidationPolicySpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryConsolidationPolicySpecSchema: z.ZodType<MemoryConsolidationPolicySpec, z.ZodTypeDef, MemoryConsolidationPolicySpec>;
```

## `memoryContractJsonSchemas`

Memory Contract JSON Schemas constant exported by the `profile-contract` module.

- Kind: constant
- Import: `import { memoryContractJsonSchemas } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryContractJsonSchemas: Record<string, JsonSchema>;
```

## `memoryContractSpecDefinitions`

Memory Contract Spec Definitions constant exported by the `profile-contract` module.

- Kind: constant
- Import: `import { memoryContractSpecDefinitions } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryContractSpecDefinitions: readonly [SpecSchemaDefinition<MemoryProfileSpec>, SpecSchemaDefinition<MemoryManagementProviderSpec>, SpecSchemaDefinition<WorkingMemoryStoreSpec>, SpecSchemaDefinition<MemoryRecordStoreSpec>, SpecSchemaDefinition<VectorStoreSpec>, SpecSchemaDefinition<EmbeddingProviderSpec>];
```

## `memoryContractSpecRefJsonSchema`

JSON Schema for Memory Contract Spec Ref.

- Kind: constant
- Import: `import { memoryContractSpecRefJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryContractSpecRefJsonSchema: JsonSchema;
```

## `memoryContractSpecRefSchema`

Runtime schema for Memory Contract Spec Ref.

- Kind: constant
- Import: `import { memoryContractSpecRefSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryContractSpecRefSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; } & { revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; revision?: string | undefined; }, { id: string; version?: string | undefined; revision?: string | undefined; }>;
```

## `memoryFallbackPolicySpecSchema`

Runtime schema for Memory Fallback Policy Spec.

- Kind: constant
- Import: `import { memoryFallbackPolicySpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryFallbackPolicySpecSchema: z.ZodType<MemoryFallbackPolicySpec, z.ZodTypeDef, MemoryFallbackPolicySpec>;
```

## `memoryIndexingPolicySpecSchema`

Runtime schema for Memory Indexing Policy Spec.

- Kind: constant
- Import: `import { memoryIndexingPolicySpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryIndexingPolicySpecSchema: z.ZodType<MemoryIndexingPolicySpec, z.ZodTypeDef, MemoryIndexingPolicySpec>;
```

## `memoryManagementCapabilitiesSchema`

Runtime schema for Memory Management Capabilities.

- Kind: constant
- Import: `import { memoryManagementCapabilitiesSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryManagementCapabilitiesSchema: z.ZodType<MemoryManagementCapabilities, z.ZodTypeDef, MemoryManagementCapabilities>;
```

## `memoryManagementProviderSpecDefinition`

Runtime validation entrypoint for the Memory Management Provider spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { memoryManagementProviderSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryManagementProviderSpecDefinition: SpecSchemaDefinition<MemoryManagementProviderSpec>;
```

## `memoryManagementProviderSpecExample`

Valid example value for Memory Management Provider Spec.

- Kind: constant
- Import: `import { memoryManagementProviderSpecExample } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryManagementProviderSpecExample: MemoryManagementProviderSpec;
```

## `memoryManagementProviderSpecSchema`

Runtime schema for Memory Management Provider Spec.

- Kind: constant
- Import: `import { memoryManagementProviderSpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryManagementProviderSpecSchema: z.ZodType<MemoryManagementProviderSpec, z.ZodTypeDef, MemoryManagementProviderSpec>;
```

## `memoryPrivacyPolicySpecSchema`

Runtime schema for Memory Privacy Policy Spec.

- Kind: constant
- Import: `import { memoryPrivacyPolicySpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryPrivacyPolicySpecSchema: z.ZodType<MemoryPrivacyPolicySpec, z.ZodTypeDef, MemoryPrivacyPolicySpec>;
```

## `memoryProfileSpecDefinition`

Runtime validation entrypoint for the Memory Profile spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { memoryProfileSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryProfileSpecDefinition: SpecSchemaDefinition<MemoryProfileSpec>;
```

## `memoryProfileSpecExample`

Valid example value for Memory Profile Spec.

- Kind: constant
- Import: `import { memoryProfileSpecExample } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryProfileSpecExample: MemoryProfileSpec;
```

## `memoryProfileSpecJsonSchema`

JSON Schema for Memory Profile Spec.

- Kind: constant
- Import: `import { memoryProfileSpecJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryProfileSpecJsonSchema: JsonSchema;
```

## `memoryProfileSpecSchema`

Runtime schema for Memory Profile Spec.

- Kind: constant
- Import: `import { memoryProfileSpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryProfileSpecSchema: z.ZodType<MemoryProfileSpec, z.ZodTypeDef, MemoryProfileSpec>;
```

## `memoryRecordStoreSpecDefinition`

Runtime validation entrypoint for the Memory Record Store spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { memoryRecordStoreSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryRecordStoreSpecDefinition: SpecSchemaDefinition<MemoryRecordStoreSpec>;
```

## `memoryRecordStoreSpecExample`

Valid example value for Memory Record Store Spec.

- Kind: constant
- Import: `import { memoryRecordStoreSpecExample } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryRecordStoreSpecExample: MemoryRecordStoreSpec;
```

## `memoryRecordStoreSpecSchema`

Runtime schema for Memory Record Store Spec.

- Kind: constant
- Import: `import { memoryRecordStoreSpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryRecordStoreSpecSchema: z.ZodType<MemoryRecordStoreSpec, z.ZodTypeDef, MemoryRecordStoreSpec>;
```

## `memoryRetentionPolicySpecSchema`

Runtime schema for Memory Retention Policy Spec.

- Kind: constant
- Import: `import { memoryRetentionPolicySpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryRetentionPolicySpecSchema: z.ZodType<MemoryRetentionPolicySpec, z.ZodTypeDef, MemoryRetentionPolicySpec>;
```

## `memoryRetrievalPolicySpecSchema`

Runtime schema for Memory Retrieval Policy Spec.

- Kind: constant
- Import: `import { memoryRetrievalPolicySpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryRetrievalPolicySpecSchema: z.ZodType<MemoryRetrievalPolicySpec, z.ZodTypeDef, MemoryRetrievalPolicySpec>;
```

## `memoryScopePolicySpecSchema`

Runtime schema for Memory Scope Policy Spec.

- Kind: constant
- Import: `import { memoryScopePolicySpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryScopePolicySpecSchema: z.ZodType<MemoryScopePolicySpec, z.ZodTypeDef, MemoryScopePolicySpec>;
```

## `memoryWritePolicySpecSchema`

Runtime schema for Memory Write Policy Spec.

- Kind: constant
- Import: `import { memoryWritePolicySpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const memoryWritePolicySpecSchema: z.ZodType<MemoryWritePolicySpec, z.ZodTypeDef, MemoryWritePolicySpec>;
```

## `vectorStoreCapabilitiesSchema`

Runtime schema for Vector Store Capabilities.

- Kind: constant
- Import: `import { vectorStoreCapabilitiesSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const vectorStoreCapabilitiesSchema: z.ZodType<VectorStoreCapabilities, z.ZodTypeDef, VectorStoreCapabilities>;
```

## `vectorStoreSpecDefinition`

Runtime validation entrypoint for the Vector Store spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { vectorStoreSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const vectorStoreSpecDefinition: SpecSchemaDefinition<VectorStoreSpec>;
```

## `vectorStoreSpecExample`

Valid example value for Vector Store Spec.

- Kind: constant
- Import: `import { vectorStoreSpecExample } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const vectorStoreSpecExample: VectorStoreSpec;
```

## `vectorStoreSpecSchema`

Runtime schema for Vector Store Spec.

- Kind: constant
- Import: `import { vectorStoreSpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const vectorStoreSpecSchema: z.ZodType<VectorStoreSpec, z.ZodTypeDef, VectorStoreSpec>;
```

## `workingMemoryStoreSpecDefinition`

Runtime validation entrypoint for the Working Memory Store spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { workingMemoryStoreSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const workingMemoryStoreSpecDefinition: SpecSchemaDefinition<WorkingMemoryStoreSpec>;
```

## `workingMemoryStoreSpecExample`

Valid example value for Working Memory Store Spec.

- Kind: constant
- Import: `import { workingMemoryStoreSpecExample } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const workingMemoryStoreSpecExample: WorkingMemoryStoreSpec;
```

## `workingMemoryStoreSpecSchema`

Runtime schema for Working Memory Store Spec.

- Kind: constant
- Import: `import { workingMemoryStoreSpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare const workingMemoryStoreSpecSchema: z.ZodType<WorkingMemoryStoreSpec, z.ZodTypeDef, WorkingMemoryStoreSpec>;
```

## `validateEmbeddingProviderSpec`

Validate Embedding Provider Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateEmbeddingProviderSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare function validateEmbeddingProviderSpec(input: unknown): EmbeddingProviderSpec;
```

### Call signature

```text
validateEmbeddingProviderSpec(input: unknown): EmbeddingProviderSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `EmbeddingProviderSpec`
- Description: The return contract is defined by the type shown above.

## `validateMemoryProfileSpec`

Validate Memory Profile Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemoryProfileSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare function validateMemoryProfileSpec(input: unknown): MemoryProfileSpec;
```

### Call signature

```text
validateMemoryProfileSpec(input: unknown): MemoryProfileSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryProfileSpec`
- Description: The return contract is defined by the type shown above.

## `validateMemoryRecordStoreSpec`

Validate Memory Record Store Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemoryRecordStoreSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare function validateMemoryRecordStoreSpec(input: unknown): MemoryRecordStoreSpec;
```

### Call signature

```text
validateMemoryRecordStoreSpec(input: unknown): MemoryRecordStoreSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryRecordStoreSpec`
- Description: The return contract is defined by the type shown above.

## `validateVectorStoreSpec`

Validate Vector Store Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateVectorStoreSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare function validateVectorStoreSpec(input: unknown): VectorStoreSpec;
```

### Call signature

```text
validateVectorStoreSpec(input: unknown): VectorStoreSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `VectorStoreSpec`
- Description: The return contract is defined by the type shown above.

## `validateWorkingMemoryStoreSpec`

Validate Working Memory Store Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkingMemoryStoreSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### Declaration

```text
export declare function validateWorkingMemoryStoreSpec(input: unknown): WorkingMemoryStoreSpec;
```

### Call signature

```text
validateWorkingMemoryStoreSpec(input: unknown): WorkingMemoryStoreSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkingMemoryStoreSpec`
- Description: The return contract is defined by the type shown above.
