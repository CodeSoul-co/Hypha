# `@codesoul-co/hypha-core` / `modules/runtime/runtime-checkpoint-service`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-checkpoint-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-service.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeCheckpointService` | class | <code>new RuntimeCheckpointService(options: RuntimeCheckpointServiceOptions): RuntimeCheckpointService</code> | Runtime implementation for Runtime Checkpoint Service; see its public constructor and members below. |
| `RuntimeCheckpointServiceOptions` | interface | <code>interface RuntimeCheckpointServiceOptions</code> | Field contract for Runtime Checkpoint Service Options; see all contract members below. |

## `RuntimeCheckpointService` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeCheckpointServiceOptions): RuntimeCheckpointService</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: RuntimeCheckpointCreateCommand): Promise&lt;RuntimeCheckpointCreateResult&gt;</code> | Creates create at this module boundary. |
| `load` | method | <code>load(input: RuntimeCheckpointLoadRequest): Promise&lt;RuntimeCheckpointLoadResult &#124; null&gt;</code> | Loads load at this module boundary. |

## `RuntimeCheckpointServiceOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpoints` | property | <code>checkpoints: RuntimeCheckpointStore</code> | Public checkpoints property. |
| `events` | property | <code>events: EventRuntime</code> | Public events property. |
| `nextId` | method | <code>nextId(namespace: string): string</code> | Public runtime operation for next Id. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public projections property. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public projection Store property. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public run Leases property. |
