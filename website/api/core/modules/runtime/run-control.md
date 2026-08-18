# `@codesoul-co/hypha-core` / `modules/runtime/run-control`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/run-control.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-control.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeRunControlService` | class | <code>new RuntimeRunControlService(options: RuntimeRunControlServiceOptions): RuntimeRunControlService</code> | Runtime implementation for Runtime Run Control Service; see its public constructor and members below. |
| `RuntimeRunControlServiceOptions` | interface | <code>interface RuntimeRunControlServiceOptions</code> | Field contract for Runtime Run Control Service Options; see all contract members below. |

## `RuntimeRunControlService` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeRunControlServiceOptions): RuntimeRunControlService</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(input: RuntimeRunControlCommand): Promise&lt;RuntimeRunControlResult&gt;</code> | Public runtime operation for execute. |

## `RuntimeRunControlServiceOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: EventRuntime</code> | Public events property. |
| `nextId` | method | <code>nextId(namespace: string): string</code> | Public runtime operation for next Id. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public projections property. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public projection Store property. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public run Leases property. |
