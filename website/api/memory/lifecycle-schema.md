# `@codesoul-co/hypha-memory` / `lifecycle-schema`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/lifecycle-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)
- Exports: **14**

## Using this module

Use the Lifecycle schema module for declaring and runtime-validating contracts. It exports 12 constants, 2 functions.

### Import from the package entrypoint

```ts
import {
  memoryExtractionProfileSpecDefinition,
  memoryExtractionProfileSpecExample,
  memoryExtractionProfileSpecJsonSchema,
  memoryExtractionProfileSpecSchema,
  memoryExtractionSourceRefSchema,
  memoryExtractionSourceTypeSchema,
  memoryLifecycleJsonSchemas,
  memoryLifecycleSpecDefinitions,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 12 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { memoryExtractionProfileSpecSchema } from '@codesoul-co/hypha-memory';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = memoryExtractionProfileSpecSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryExtractionProfileSpecDefinition` | constant | <code>const memoryExtractionProfileSpecDefinition: SpecSchemaDefinition&lt;MemoryExtractionProfileSpec&gt;</code> | Runtime validation entrypoint for the Memory Extraction Profile spec, combining its parser, example and JSON Schema. |
| `memoryExtractionProfileSpecExample` | constant | <code>const memoryExtractionProfileSpecExample: MemoryExtractionProfileSpec</code> | Valid example value for Memory Extraction Profile Spec. |
| `memoryExtractionProfileSpecJsonSchema` | constant | <code>const memoryExtractionProfileSpecJsonSchema: JsonSchema</code> | JSON Schema for Memory Extraction Profile Spec. |
| `memoryExtractionProfileSpecSchema` | constant | <code>const memoryExtractionProfileSpecSchema: z.ZodType&lt;MemoryExtractionProfileSpec, z.ZodTypeDef, MemoryExtractionProfileSpec&gt;</code> | Runtime schema for Memory Extraction Profile Spec. |
| `memoryExtractionSourceRefSchema` | constant | <code>const memoryExtractionSourceRefSchema: z.ZodType&lt;MemoryExtractionSourceRef, z.ZodTypeDef, MemoryExtractionSourceRef&gt;</code> | Runtime schema for Memory Extraction Source Ref. |
| `memoryExtractionSourceTypeSchema` | constant | <code>const memoryExtractionSourceTypeSchema: z.ZodEnum&lt;["conversation", "truth", "episodic_record", "runtime_event", "tool_observation", "artifact", "structured_record", "custom"]&gt;</code> | Runtime schema for Memory Extraction Source Type. |
| `memoryLifecycleJsonSchemas` | constant | <code>const memoryLifecycleJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Memory Lifecycle JSON Schemas constant exported by the `lifecycle-schema` module. |
| `memoryLifecycleSpecDefinitions` | constant | <code>const memoryLifecycleSpecDefinitions: readonly [SpecSchemaDefinition&lt;MemoryExtractionProfileSpec&gt;, SpecSchemaDefinition&lt;MemoryMaintenancePolicySpec&gt;]</code> | Memory Lifecycle Spec Definitions constant exported by the `lifecycle-schema` module. |
| `memoryMaintenancePolicySpecDefinition` | constant | <code>const memoryMaintenancePolicySpecDefinition: SpecSchemaDefinition&lt;MemoryMaintenancePolicySpec&gt;</code> | Runtime validation entrypoint for the Memory Maintenance Policy spec, combining its parser, example and JSON Schema. |
| `memoryMaintenancePolicySpecExample` | constant | <code>const memoryMaintenancePolicySpecExample: MemoryMaintenancePolicySpec</code> | Valid example value for Memory Maintenance Policy Spec. |
| `memoryMaintenancePolicySpecJsonSchema` | constant | <code>const memoryMaintenancePolicySpecJsonSchema: JsonSchema</code> | JSON Schema for Memory Maintenance Policy Spec. |
| `memoryMaintenancePolicySpecSchema` | constant | <code>const memoryMaintenancePolicySpecSchema: z.ZodType&lt;MemoryMaintenancePolicySpec, z.ZodTypeDef, MemoryMaintenancePolicySpec&gt;</code> | Runtime schema for Memory Maintenance Policy Spec. |
| `validateMemoryExtractionProfileSpec` | function | <code>validateMemoryExtractionProfileSpec(input: unknown): MemoryExtractionProfileSpec</code> | Validate Memory Extraction Profile Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateMemoryMaintenancePolicySpec` | function | <code>validateMemoryMaintenancePolicySpec(input: unknown): MemoryMaintenancePolicySpec</code> | Validate Memory Maintenance Policy Spec function with 1 public call signature; parameters and return types are listed below. |

## `memoryExtractionProfileSpecDefinition`

Runtime validation entrypoint for the Memory Extraction Profile spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { memoryExtractionProfileSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### Declaration

```text
export declare const memoryExtractionProfileSpecDefinition: SpecSchemaDefinition<MemoryExtractionProfileSpec>;
```

## `memoryExtractionProfileSpecExample`

Valid example value for Memory Extraction Profile Spec.

- Kind: constant
- Import: `import { memoryExtractionProfileSpecExample } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### Declaration

```text
export declare const memoryExtractionProfileSpecExample: MemoryExtractionProfileSpec;
```

## `memoryExtractionProfileSpecJsonSchema`

JSON Schema for Memory Extraction Profile Spec.

- Kind: constant
- Import: `import { memoryExtractionProfileSpecJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### Declaration

```text
export declare const memoryExtractionProfileSpecJsonSchema: JsonSchema;
```

## `memoryExtractionProfileSpecSchema`

Runtime schema for Memory Extraction Profile Spec.

- Kind: constant
- Import: `import { memoryExtractionProfileSpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### Declaration

```text
export declare const memoryExtractionProfileSpecSchema: z.ZodType<MemoryExtractionProfileSpec, z.ZodTypeDef, MemoryExtractionProfileSpec>;
```

## `memoryExtractionSourceRefSchema`

Runtime schema for Memory Extraction Source Ref.

- Kind: constant
- Import: `import { memoryExtractionSourceRefSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### Declaration

```text
export declare const memoryExtractionSourceRefSchema: z.ZodType<MemoryExtractionSourceRef, z.ZodTypeDef, MemoryExtractionSourceRef>;
```

## `memoryExtractionSourceTypeSchema`

Runtime schema for Memory Extraction Source Type.

- Kind: constant
- Import: `import { memoryExtractionSourceTypeSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### Declaration

```text
export declare const memoryExtractionSourceTypeSchema: z.ZodEnum<["conversation", "truth", "episodic_record", "runtime_event", "tool_observation", "artifact", "structured_record", "custom"]>;
```

## `memoryLifecycleJsonSchemas`

Memory Lifecycle JSON Schemas constant exported by the `lifecycle-schema` module.

- Kind: constant
- Import: `import { memoryLifecycleJsonSchemas } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### Declaration

```text
export declare const memoryLifecycleJsonSchemas: Record<string, JsonSchema>;
```

## `memoryLifecycleSpecDefinitions`

Memory Lifecycle Spec Definitions constant exported by the `lifecycle-schema` module.

- Kind: constant
- Import: `import { memoryLifecycleSpecDefinitions } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### Declaration

```text
export declare const memoryLifecycleSpecDefinitions: readonly [SpecSchemaDefinition<MemoryExtractionProfileSpec>, SpecSchemaDefinition<MemoryMaintenancePolicySpec>];
```

## `memoryMaintenancePolicySpecDefinition`

Runtime validation entrypoint for the Memory Maintenance Policy spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { memoryMaintenancePolicySpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### Declaration

```text
export declare const memoryMaintenancePolicySpecDefinition: SpecSchemaDefinition<MemoryMaintenancePolicySpec>;
```

## `memoryMaintenancePolicySpecExample`

Valid example value for Memory Maintenance Policy Spec.

- Kind: constant
- Import: `import { memoryMaintenancePolicySpecExample } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### Declaration

```text
export declare const memoryMaintenancePolicySpecExample: MemoryMaintenancePolicySpec;
```

## `memoryMaintenancePolicySpecJsonSchema`

JSON Schema for Memory Maintenance Policy Spec.

- Kind: constant
- Import: `import { memoryMaintenancePolicySpecJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### Declaration

```text
export declare const memoryMaintenancePolicySpecJsonSchema: JsonSchema;
```

## `memoryMaintenancePolicySpecSchema`

Runtime schema for Memory Maintenance Policy Spec.

- Kind: constant
- Import: `import { memoryMaintenancePolicySpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### Declaration

```text
export declare const memoryMaintenancePolicySpecSchema: z.ZodType<MemoryMaintenancePolicySpec, z.ZodTypeDef, MemoryMaintenancePolicySpec>;
```

## `validateMemoryExtractionProfileSpec`

Validate Memory Extraction Profile Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemoryExtractionProfileSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### Declaration

```text
export declare function validateMemoryExtractionProfileSpec(input: unknown): MemoryExtractionProfileSpec;
```

### Call signature

```text
validateMemoryExtractionProfileSpec(input: unknown): MemoryExtractionProfileSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryExtractionProfileSpec`
- Description: The return contract is defined by the type shown above.

## `validateMemoryMaintenancePolicySpec`

Validate Memory Maintenance Policy Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemoryMaintenancePolicySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### Declaration

```text
export declare function validateMemoryMaintenancePolicySpec(input: unknown): MemoryMaintenancePolicySpec;
```

### Call signature

```text
validateMemoryMaintenancePolicySpec(input: unknown): MemoryMaintenancePolicySpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryMaintenancePolicySpec`
- Description: The return contract is defined by the type shown above.
