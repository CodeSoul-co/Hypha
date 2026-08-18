# `@codesoul-co/hypha-memory` / `memory-server-migration-package-fixtures`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-server-migration-package-fixtures.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-fixtures.ts)
- Exports: **3**

## Using this module

Use the Memory server migration package fixtures module for writing deterministic tests and contract assertions. It exports 3 constants.

### Import from the package entrypoint

```ts
import {
  canonicalNativeMemoryServerMigrationPackagePorts,
  compliantFrameworkMemoryServerMigrationPackagePorts,
  legacyMemoryServerMigrationPackagePorts,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- The 3 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalNativeMemoryServerMigrationPackagePorts` | constant | <code>const canonicalNativeMemoryServerMigrationPackagePorts: MemoryServerMigrationPackagePorts</code> | Canonical Native fixture: real runtime receipt plus concrete migration adapters. |
| `compliantFrameworkMemoryServerMigrationPackagePorts` | constant | <code>const compliantFrameworkMemoryServerMigrationPackagePorts: MemoryServerMigrationPackagePorts</code> | Framework reference fixture: adapter-neutral in-memory behavior with canonical contracts. |
| `legacyMemoryServerMigrationPackagePorts` | constant | <code>const legacyMemoryServerMigrationPackagePorts: MemoryServerMigrationPackagePorts</code> | Legacy failure fixture: every suite preserves at least one audited defect. |

## `canonicalNativeMemoryServerMigrationPackagePorts`

Canonical Native fixture: real runtime receipt plus concrete migration adapters.

- Kind: constant
- Import: `import { canonicalNativeMemoryServerMigrationPackagePorts } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-fixtures.ts)

### Declaration

```text
export declare const canonicalNativeMemoryServerMigrationPackagePorts: MemoryServerMigrationPackagePorts;
```

## `compliantFrameworkMemoryServerMigrationPackagePorts`

Framework reference fixture: adapter-neutral in-memory behavior with canonical contracts.

- Kind: constant
- Import: `import { compliantFrameworkMemoryServerMigrationPackagePorts } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-fixtures.ts)

### Declaration

```text
export declare const compliantFrameworkMemoryServerMigrationPackagePorts: MemoryServerMigrationPackagePorts;
```

## `legacyMemoryServerMigrationPackagePorts`

Legacy failure fixture: every suite preserves at least one audited defect.

- Kind: constant
- Import: `import { legacyMemoryServerMigrationPackagePorts } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-fixtures.ts)

### Declaration

```text
export declare const legacyMemoryServerMigrationPackagePorts: MemoryServerMigrationPackagePorts;
```
