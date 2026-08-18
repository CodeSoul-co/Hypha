# `@codesoul-co/hypha-core` / `modules/runtime/runtime-cancellation-service`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-cancellation-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-cancellation-service.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeCancellationService` | class | <code>new RuntimeCancellationService(options: RuntimeCancellationServiceOptions): RuntimeCancellationService</code> | Runtime implementation for Runtime Cancellation Service; see its public constructor and members below. |
| `RuntimeCancellationServiceOptions` | interface | <code>interface RuntimeCancellationServiceOptions</code> | Field contract for Runtime Cancellation Service Options; see all contract members below. |

## `RuntimeCancellationService` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(input: RuntimeCancelCommand): Promise&lt;RuntimeCancelResult&gt;</code> | Cancels cancel at this module boundary. |
| `constructor` | constructor | <code>(options: RuntimeCancellationServiceOptions): RuntimeCancellationService</code> | Creates an instance of this class. |

## `RuntimeCancellationServiceOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activities` | property | <code>activities: RuntimeActivityCancellationPort</code> | Public activities property. |
| `children` | property | <code>children: RuntimeChildRunCancellationPort</code> | Public children property. |
| `commands` | property | <code>commands: Pick&lt;SessionQueue, "cancelPending"&gt;</code> | Public commands property. |
| `events` | property | <code>events: EventRuntime</code> | Public events property. |
| `nextId` | method | <code>nextId(namespace: string): string</code> | Public runtime operation for next Id. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public projections property. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public projection Store property. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public run Leases property. |
