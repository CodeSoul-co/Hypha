# `@codesoul-co/hypha-memory` / `memory-server-migration-schema`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-server-migration-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-schema.ts)
- Exports: **3**

## Using this module

Use the Memory server migration schema module for declaring and runtime-validating contracts. It exports 2 constants, 1 function.

### Import from the package entrypoint

```ts
import {
  memoryServerMigrationAcceptanceJsonSchema,
  memoryServerMigrationAcceptanceSchema,
  validateMemoryServerMigrationAcceptance,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryServerMigrationAcceptanceJsonSchema` | constant | <code>const memoryServerMigrationAcceptanceJsonSchema: JsonSchema</code> | JSON Schema for Memory Server Migration Acceptance. |
| `memoryServerMigrationAcceptanceSchema` | constant | <code>const memoryServerMigrationAcceptanceSchema: ZodType&lt;MemoryServerMigrationAcceptance, ZodTypeDef, MemoryServerMigrationAcceptance&gt;</code> | Runtime schema for Memory Server Migration Acceptance. |
| `validateMemoryServerMigrationAcceptance` | function | <code>validateMemoryServerMigrationAcceptance(input: unknown): MemoryServerMigrationAcceptance</code> | Validate Memory Server Migration Acceptance function with 1 public call signature; parameters and return types are listed below. |

## `memoryServerMigrationAcceptanceJsonSchema`

JSON Schema for Memory Server Migration Acceptance.

- Kind: constant
- Import: `import { memoryServerMigrationAcceptanceJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-schema.ts)

### Declaration

```text
export declare const memoryServerMigrationAcceptanceJsonSchema: JsonSchema;
```

## `memoryServerMigrationAcceptanceSchema`

Runtime schema for Memory Server Migration Acceptance.

- Kind: constant
- Import: `import { memoryServerMigrationAcceptanceSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-schema.ts)

### Declaration

```text
export declare const memoryServerMigrationAcceptanceSchema: ZodType<MemoryServerMigrationAcceptance, ZodTypeDef, MemoryServerMigrationAcceptance>;
```

## `validateMemoryServerMigrationAcceptance`

Validate Memory Server Migration Acceptance function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemoryServerMigrationAcceptance } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-schema.ts)

### Declaration

```text
export declare function validateMemoryServerMigrationAcceptance(input: unknown): MemoryServerMigrationAcceptance;
```

### Call signature

```text
validateMemoryServerMigrationAcceptance(input: unknown): MemoryServerMigrationAcceptance
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryServerMigrationAcceptance`
- Description: The return contract is defined by the type shown above.
