# `@codesoul-co/hypha-core` / `modules/runtime/runtime-query-service`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-query-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-query-service.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeQueryService` | class | <code>new RuntimeQueryService(options: RuntimeQueryServiceOptions): RuntimeQueryService</code> | Runtime implementation for Runtime Query Service; see its public constructor and members below. |
| `RuntimeQueryServiceOptions` | interface | <code>interface RuntimeQueryServiceOptions</code> | Field contract for Runtime Query Service Options; see all contract members below. |

## `RuntimeQueryService` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeQueryServiceOptions): RuntimeQueryService</code> | Creates an instance of this class. |
| `explainState` | method | <code>explainState(input: RuntimeQueryRequest): Promise&lt;RuntimeStateExplanation &#124; null&gt;</code> | Public runtime operation for explain State. |
| `getFSM` | method | <code>getFSM(input: RuntimeQueryRequest): Promise&lt;RuntimeOrchestrationProjection &#124; null&gt;</code> | Gets FSM at this module boundary. |
| `getPendingWaits` | method | <code>getPendingWaits(input: RuntimeQueryRequest): Promise&lt;RuntimePendingWaitProjection[]&gt;</code> | Gets Pending Waits at this module boundary. |
| `getRun` | method | <code>getRun(input: RuntimeQueryRequest): Promise&lt;RuntimeRunView &#124; null&gt;</code> | Gets Run at this module boundary. |
| `getTimeline` | method | <code>getTimeline(input: RuntimeTimelineRequest): Promise&lt;RuntimeTimelineResult&gt;</code> | Gets Timeline at this module boundary. |

## `RuntimeQueryServiceOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: Pick&lt;EventRuntime, "read" &#124; "getStreamHead"&gt;</code> | Public events property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public projections property. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public projection Store property. |
