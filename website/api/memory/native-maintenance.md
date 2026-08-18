# `@codesoul-co/hypha-memory` / `native-maintenance`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/native-maintenance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-maintenance.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DeterministicMemoryMaintenancePlanner` | class | <code>new DeterministicMemoryMaintenancePlanner(applyDecision?: MemoryMaintenanceApplier &#124; undefined, now?: () =&gt; string): DeterministicMemoryMaintenancePlanner</code> | Runtime implementation for Deterministic Memory Maintenance Planner; see its public constructor and members below. |
| `MemoryMaintenanceApplier` | type | <code>type MemoryMaintenanceApplier = (request: MemoryMaintenanceApplyRequest) =&gt; Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public type alias for Memory Maintenance Applier. |

## `DeterministicMemoryMaintenancePlanner` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apply` | method | <code>apply(request: MemoryMaintenanceApplyRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Applies apply at this module boundary. |
| `constructor` | constructor | <code>(applyDecision?: MemoryMaintenanceApplier &#124; undefined, now?: () =&gt; string): DeterministicMemoryMaintenancePlanner</code> | Creates an instance of this class. |
| `explain` | method | <code>explain(decisionId: string): Promise&lt;MemoryMaintenanceDecision &#124; null&gt;</code> | Public runtime operation for explain. |
| `plan` | method | <code>plan(request: MemoryMaintenancePlanRequest): Promise&lt;MemoryMaintenanceDecision&gt;</code> | Plans plan at this module boundary. |
