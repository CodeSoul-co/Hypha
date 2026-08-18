# `@codesoul-co/hypha-memory` / `memory-server-migration-fixtures`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-server-migration-fixtures.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-fixtures.ts)
- Exports: **2**

## Using this module

Use the Memory server migration fixtures module for writing deterministic tests and contract assertions. It exports 2 constants.

### Import from the package entrypoint

```ts
import {
  compliantMemoryServerSkeletonPorts,
  legacyMemoryServerGapPorts,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compliantMemoryServerSkeletonPorts` | constant | <code>const compliantMemoryServerSkeletonPorts: MemoryServerMigrationAcceptancePorts</code> | Minimal positive fixture proving that the acceptance runner is adapter-neutral. |
| `legacyMemoryServerGapPorts` | constant | <code>const legacyMemoryServerGapPorts: MemoryServerMigrationAcceptancePorts</code> | Reproduces the three audited legacy gaps without importing Server-owned code. |

## `compliantMemoryServerSkeletonPorts`

Minimal positive fixture proving that the acceptance runner is adapter-neutral.

- Kind: constant
- Import: `import { compliantMemoryServerSkeletonPorts } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-fixtures.ts)

### Declaration

```text
export declare const compliantMemoryServerSkeletonPorts: MemoryServerMigrationAcceptancePorts;
```

## `legacyMemoryServerGapPorts`

Reproduces the three audited legacy gaps without importing Server-owned code.

- Kind: constant
- Import: `import { legacyMemoryServerGapPorts } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-fixtures.ts)

### Declaration

```text
export declare const legacyMemoryServerGapPorts: MemoryServerMigrationAcceptancePorts;
```
