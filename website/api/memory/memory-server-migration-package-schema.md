# `@codesoul-co/hypha-memory` / `memory-server-migration-package-schema`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-server-migration-package-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-schema.ts)
- Exports: **3**

## Using this module

Use the Memory server migration package schema module for declaring and runtime-validating contracts. It exports 2 constants, 1 function.

### Import from the package entrypoint

```ts
import {
  memoryServerMigrationPackageSpecJsonSchema,
  memoryServerMigrationPackageSpecSchema,
  validateMemoryServerMigrationPackageSpec,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryServerMigrationPackageSpecJsonSchema` | constant | <code>const memoryServerMigrationPackageSpecJsonSchema: JsonSchema</code> | JSON Schema for Memory Server Migration Package Spec. |
| `memoryServerMigrationPackageSpecSchema` | constant | <code>const memoryServerMigrationPackageSpecSchema: ZodType&lt;MemoryServerMigrationPackageSpec, ZodTypeDef, MemoryServerMigrationPackageSpec&gt;</code> | Runtime schema for Memory Server Migration Package Spec. |
| `validateMemoryServerMigrationPackageSpec` | function | <code>validateMemoryServerMigrationPackageSpec(input: unknown): MemoryServerMigrationPackageSpec</code> | Validate Memory Server Migration Package Spec function with 1 public call signature; parameters and return types are listed below. |

## `memoryServerMigrationPackageSpecJsonSchema`

JSON Schema for Memory Server Migration Package Spec.

- Kind: constant
- Import: `import { memoryServerMigrationPackageSpecJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-schema.ts)

### Declaration

```text
export declare const memoryServerMigrationPackageSpecJsonSchema: JsonSchema;
```

## `memoryServerMigrationPackageSpecSchema`

Runtime schema for Memory Server Migration Package Spec.

- Kind: constant
- Import: `import { memoryServerMigrationPackageSpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-schema.ts)

### Declaration

```text
export declare const memoryServerMigrationPackageSpecSchema: ZodType<MemoryServerMigrationPackageSpec, ZodTypeDef, MemoryServerMigrationPackageSpec>;
```

## `validateMemoryServerMigrationPackageSpec`

Validate Memory Server Migration Package Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemoryServerMigrationPackageSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-schema.ts)

### Declaration

```text
export declare function validateMemoryServerMigrationPackageSpec(input: unknown): MemoryServerMigrationPackageSpec;
```

### Call signature

```text
validateMemoryServerMigrationPackageSpec(input: unknown): MemoryServerMigrationPackageSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryServerMigrationPackageSpec`
- Description: The return contract is defined by the type shown above.
