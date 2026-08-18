# `@codesoul-co/hypha-memory` / `native-maintenance`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/native-maintenance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-maintenance.ts)
- Exports: **2**

## Using this module

Use the Native maintenance module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 type.

### Import from the package entrypoint

```ts
import {
  DeterministicMemoryMaintenancePlanner,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryMaintenanceApplier,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DeterministicMemoryMaintenancePlanner` | class | <code>new DeterministicMemoryMaintenancePlanner(applyDecision?: MemoryMaintenanceApplier &#124; undefined, now?: () =&gt; string): DeterministicMemoryMaintenancePlanner</code> | Deterministic Memory Maintenance Planner class with 4 public constructor or member entries; its exact declarations are listed below. |
| `MemoryMaintenanceApplier` | type | <code>type MemoryMaintenanceApplier = (request: MemoryMaintenanceApplyRequest) =&gt; Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public type alias for Memory Maintenance Applier; the declaration contains its complete type expression. |

## `DeterministicMemoryMaintenancePlanner`

Deterministic Memory Maintenance Planner class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DeterministicMemoryMaintenancePlanner } from '@codesoul-co/hypha-memory';`
- Source module: [`native-maintenance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-maintenance.ts)

### Declaration

```text
export declare class DeterministicMemoryMaintenancePlanner implements MemoryMaintenancePlanner {
    constructor(applyDecision?: MemoryMaintenanceApplier | undefined, now?: () => string);
    plan(request: MemoryMaintenancePlanRequest): Promise<MemoryMaintenanceDecision>;
    apply(request: MemoryMaintenanceApplyRequest): Promise<ManagedMemoryWriteResult>;
    explain(decisionId: string): Promise<MemoryMaintenanceDecision | null>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apply` | method | <code>apply(request: MemoryMaintenanceApplyRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(applyDecision?: MemoryMaintenanceApplier &#124; undefined, now?: () =&gt; string): DeterministicMemoryMaintenancePlanner</code> | Creates an instance of this class. |
| `explain` | method | <code>explain(decisionId: string): Promise&lt;MemoryMaintenanceDecision &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `plan` | method | <code>plan(request: MemoryMaintenancePlanRequest): Promise&lt;MemoryMaintenanceDecision&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryMaintenanceApplier`

Public type alias for Memory Maintenance Applier; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryMaintenanceApplier } from '@codesoul-co/hypha-memory';`
- Source module: [`native-maintenance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-maintenance.ts)

### Declaration

```text
export type MemoryMaintenanceApplier = (request: MemoryMaintenanceApplyRequest) => Promise<ManagedMemoryWriteResult>;
```
