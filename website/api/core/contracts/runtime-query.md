# `@codesoul-co/hypha-core` / `contracts/runtime-query`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-query.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeQueryRequest` | interface | <code>interface RuntimeQueryRequest</code> | Field contract for Runtime Query Request; see all contract members below. |
| `RuntimeQueryServiceContract` | interface | <code>interface RuntimeQueryServiceContract</code> | Field contract for Runtime Query Service Contract; see all contract members below. |
| `RuntimeRunView` | interface | <code>interface RuntimeRunView</code> | Field contract for Runtime Run View; see all contract members below. |
| `RuntimeStateExplanation` | interface | <code>interface RuntimeStateExplanation</code> | Field contract for Runtime State Explanation; see all contract members below. |
| `RuntimeTimelineRequest` | interface | <code>interface RuntimeTimelineRequest extends RuntimeQueryRequest</code> | Field contract for Runtime Timeline Request; see all contract members below. |
| `RuntimeTimelineResult` | interface | <code>interface RuntimeTimelineResult</code> | Field contract for Runtime Timeline Result; see all contract members below. |

## `RuntimeQueryRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |

## `RuntimeQueryServiceContract` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `explainState` | method | <code>explainState(request: RuntimeQueryRequest): Promise&lt;RuntimeStateExplanation &#124; null&gt;</code> | Public runtime operation for explain State. |
| `getFSM` | method | <code>getFSM(request: RuntimeQueryRequest): Promise&lt;RuntimeOrchestrationProjection &#124; null&gt;</code> | Gets FSM at this module boundary. |
| `getPendingWaits` | method | <code>getPendingWaits(request: RuntimeQueryRequest): Promise&lt;RuntimePendingWaitProjection[]&gt;</code> | Gets Pending Waits at this module boundary. |
| `getRun` | method | <code>getRun(request: RuntimeQueryRequest): Promise&lt;RuntimeRunView &#124; null&gt;</code> | Gets Run at this module boundary. |
| `getTimeline` | method | <code>getTimeline(request: RuntimeTimelineRequest): Promise&lt;RuntimeTimelineResult&gt;</code> | Gets Timeline at this module boundary. |

## `RuntimeRunView` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventHeadSequence` | property | <code>eventHeadSequence: number</code> | Public event Head Sequence property. |
| `projection` | property | <code>projection: RuntimeOrchestrationProjection</code> | Public projection property. |
| `projectionLag` | property | <code>projectionLag: number</code> | Public projection Lag property. |
| `projectionLastSequence` | property | <code>projectionLastSequence: number</code> | Public projection Last Sequence property. |
| `projectionVersion` | property | <code>projectionVersion: string</code> | Public projection Version property. |
| `refreshedAt` | property | <code>refreshedAt: string</code> | Public refreshed At property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |

## `RuntimeStateExplanation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `currentState` | property | <code>currentState: string</code> | Public current State property. |
| `lastEventSequence` | property | <code>lastEventSequence: number</code> | Public last Event Sequence property. |
| `pendingActivityIds` | property | <code>pendingActivityIds: string[]</code> | Public pending Activity Ids property. |
| `pendingTransitionEventId` | property | <code>pendingTransitionEventId: string</code> | Public pending Transition Event Id property. |
| `pendingWaitId` | property | <code>pendingWaitId: string</code> | Public pending Wait Id property. |
| `runStatus` | property | <code>runStatus: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/contracts/runtime-projection").RuntimeOrchestrationRunStatus</code> | Public run Status property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `source` | property | <code>source: "runtime.orchestration.projection"</code> | Public source property. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public state Attempt property. |
| `statePath` | property | <code>statePath: string[]</code> | Public state Path property. |

## `RuntimeTimelineRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fromSequence` | property | <code>fromSequence: number</code> | Public from Sequence property. |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `toSequence` | property | <code>toSequence: number</code> | Public to Sequence property. |
| `types` | property | <code>types: FrameworkEventType[]</code> | Public types property. |

## `RuntimeTimelineResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventCount` | property | <code>eventCount: number</code> | Public event Count property. |
| `eventHeadSequence` | property | <code>eventHeadSequence: number</code> | Public event Head Sequence property. |
| `events` | property | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | Public events property. |
| `refreshedAt` | property | <code>refreshedAt: string</code> | Public refreshed At property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
