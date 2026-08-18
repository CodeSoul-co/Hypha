# `@codesoul-co/hypha-core` / `contracts/runtime-projection`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-projection.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeCancellationProjection` | interface | <code>interface RuntimeCancellationProjection</code> | Field contract for Runtime Cancellation Projection; see all contract members below. |
| `RuntimeOrchestrationProjection` | interface | <code>interface RuntimeOrchestrationProjection</code> | Field contract for Runtime Orchestration Projection; see all contract members below. |
| `RuntimePendingTransitionProjection` | interface | <code>interface RuntimePendingTransitionProjection</code> | Field contract for Runtime Pending Transition Projection; see all contract members below. |
| `RuntimePendingWaitProjection` | interface | <code>interface RuntimePendingWaitProjection</code> | Field contract for Runtime Pending Wait Projection; see all contract members below. |
| `RuntimeResumeProjection` | interface | <code>interface RuntimeResumeProjection</code> | Field contract for Runtime Resume Projection; see all contract members below. |
| `RuntimeOrchestrationRunStatus` | type | <code>type RuntimeOrchestrationRunStatus = 'not_created' &#124; RuntimeRunStatus</code> | Public type alias for Runtime Orchestration Run Status. |

## `RuntimeCancellationProjection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |

## `RuntimeOrchestrationProjection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancellation` | property | <code>cancellation: RuntimeCancellationProjection</code> | Public cancellation property. |
| `currentState` | property | <code>currentState: string</code> | Public current State property. |
| `lastResume` | property | <code>lastResume: RuntimeResumeProjection</code> | Public last Resume property. |
| `pendingActivityIds` | property | <code>pendingActivityIds: string[]</code> | Public pending Activity Ids property. |
| `pendingHumanActionRef` | property | <code>pendingHumanActionRef: string</code> | Public pending Human Action Ref property. |
| `pendingTransition` | property | <code>pendingTransition: RuntimePendingTransitionProjection</code> | Public pending Transition property. |
| `pendingWait` | property | <code>pendingWait: RuntimePendingWaitProjection</code> | Public pending Wait property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `runStatus` | property | <code>runStatus: RuntimeOrchestrationRunStatus</code> | Public run Status property. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public state Attempt property. |
| `statePath` | property | <code>statePath: string[]</code> | Public state Path property. |
| `stateVisitCounts` | property | <code>stateVisitCounts: Record&lt;string, number&gt;</code> | Public state Visit Counts property. |
| `terminalState` | property | <code>terminalState: string</code> | Public terminal State property. |

## `RuntimePendingTransitionProjection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventId` | property | <code>eventId: string</code> | Public event Id property. |
| `from` | property | <code>from: string</code> | Public from property. |
| `to` | property | <code>to: string</code> | Public to property. |

## `RuntimePendingWaitProjection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `expectedSchema` | property | <code>expectedSchema: JsonSchema</code> | Public expected schema property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `pendingActionRef` | property | <code>pendingActionRef: string</code> | Public pending Action Ref property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public state Attempt property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `type` | property | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "pause"</code> | Public type property. |
| `waitId` | property | <code>waitId: string</code> | Public wait Id property. |

## `RuntimeResumeProjection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `kind` | property | <code>kind: "manual" &#124; "signal" &#124; "timer"</code> | Public kind property. |
| `payload` | property | <code>payload: RuntimeJsonValue</code> | Public payload property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `resumedAt` | property | <code>resumedAt: string</code> | Public resumed At property. |
| `waitId` | property | <code>waitId: string</code> | Public wait Id property. |
