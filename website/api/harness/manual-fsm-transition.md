# `@codesoul-co/hypha-harness` / `manual-fsm-transition`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Package guide: [learning and composition guide](/packages/harness)
- Source: [`packages/harness/src/manual-fsm-transition.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `GovernedFSMTransitionService` | class | <code>new GovernedFSMTransitionService(options: GovernedFSMTransitionServiceOptions): GovernedFSMTransitionService</code> | Applies an explicitly requested FSM edge under owner scope, permission, optimistic revision, Run Lease, fencing, Policy, guard, trace, and replay. It never mutates a snapshot or projection directly. |
| `MANUAL_FSM_TRANSITION_PERMISSION` | constant | <code>const MANUAL_FSM_TRANSITION_PERMISSION: "runtime.fsm.transition"</code> | MANUAL FSM TRANSITION PERMISSION constant exported by the `manual-fsm-transition` module. |
| `GovernedFSMTransitionServiceOptions` | interface | <code>interface GovernedFSMTransitionServiceOptions</code> | Field contract for Governed FSM Transition Service Options; see all contract members below. |
| `ManualFSMRunView` | interface | <code>interface ManualFSMRunView</code> | Field contract for Manual FSM Run View; see all contract members below. |
| `ManualFSMTransitionCommand` | interface | <code>interface ManualFSMTransitionCommand</code> | Field contract for Manual FSM Transition Command; see all contract members below. |
| `ManualFSMTransitionResult` | interface | <code>interface ManualFSMTransitionResult</code> | Field contract for Manual FSM Transition Result; see all contract members below. |

## `GovernedFSMTransitionService` public members

Applies an explicitly requested FSM edge under owner scope, permission, optimistic revision, Run Lease, fencing, Policy, guard, trace, and replay. It never mutates a snapshot or projection directly.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: GovernedFSMTransitionServiceOptions): GovernedFSMTransitionService</code> | Creates an instance of this class. |
| `inspect` | method | <code>inspect(scope: RuntimeScope, process: FSMProcessSpec): Promise&lt;ManualFSMRunView&gt;</code> | Public runtime operation for inspect. |
| `transition` | method | <code>transition(process: FSMProcessSpec, input: ManualFSMTransitionCommand): Promise&lt;ManualFSMTransitionResult&gt;</code> | Transitions transition at this module boundary. |

## `GovernedFSMTransitionServiceOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: EventRuntime</code> | Public events property. |
| `nextId` | method | <code>nextId(namespace: string): string</code> | Public runtime operation for next Id. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `policy` | property | <code>policy: PolicyEngine</code> | Public policy property. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public projections property. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public projection Store property. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public run Leases property. |

## `ManualFSMRunView` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedTransitions` | property | <code>allowedTransitions: { to: string; guard?: string; description?: string; }[]</code> | Public allowed Transitions property. |
| `currentState` | property | <code>currentState: string</code> | Public current State property. |
| `processId` | property | <code>processId: string</code> | Public process Id property. |
| `processVersion` | property | <code>processVersion: string</code> | Public process Version property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `runRevision` | property | <code>runRevision: number</code> | Public run Revision property. |
| `runStatus` | property | <code>runStatus: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeOrchestrationRunStatus</code> | Public run Status property. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public state Attempt property. |
| `statePath` | property | <code>statePath: string[]</code> | Public state Path property. |
| `terminalStates` | property | <code>terminalStates: string[]</code> | Public terminal States property. |

## `ManualFSMTransitionCommand` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `expectedRunRevision` | property | <code>expectedRunRevision: number</code> | Public expected Run Revision property. |
| `expectedState` | property | <code>expectedState: string</code> | Public expected State property. |
| `guardContext` | property | <code>guardContext: FSMGuardContext</code> | Public guard Context property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public lease Ttl Ms property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public principal property. |
| `processId` | property | <code>processId: string</code> | Public process Id property. |
| `processVersion` | property | <code>processVersion: string</code> | Public process Version property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `targetState` | property | <code>targetState: string</code> | Public target State property. |
| `variablesPatch` | property | <code>variablesPatch: Record&lt;string, RuntimeJsonValue&gt;</code> | Public variables Patch property. |

## `ManualFSMTransitionResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `disposition` | property | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | Public disposition property. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public event Ids property. |
| `runRevision` | property | <code>runRevision: number</code> | Public run Revision property. |
| `view` | property | <code>view: ManualFSMRunView</code> | Public view property. |
