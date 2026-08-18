# `@codesoul-co/hypha-harness` / `bounded-fsm-driver`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Package guide: [learning and composition guide](/packages/harness)
- Source: [`packages/harness/src/bounded-fsm-driver.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `FencedBoundedFSMDriver` | class | <code>new FencedBoundedFSMDriver(options: FencedBoundedFSMDriverOptions): FencedBoundedFSMDriver</code> | Runtime implementation for Fenced Bounded FSM Driver; see its public constructor and members below. |
| `BoundedFSMDriverResult` | interface | <code>interface BoundedFSMDriverResult</code> | Field contract for Bounded FSM Driver Result; see all contract members below. |
| `BoundedFSMDriverRunInput` | interface | <code>interface BoundedFSMDriverRunInput</code> | Field contract for Bounded FSM Driver Run Input; see all contract members below. |
| `BoundedStateExecutionDecision` | interface | <code>interface BoundedStateExecutionDecision</code> | Field contract for Bounded State Execution Decision; see all contract members below. |
| `BoundedStateExecutorInput` | interface | <code>interface BoundedStateExecutorInput</code> | Field contract for Bounded State Executor Input; see all contract members below. |
| `FencedBoundedFSMDriverOptions` | interface | <code>interface FencedBoundedFSMDriverOptions</code> | Field contract for Fenced Bounded FSM Driver Options; see all contract members below. |
| `BoundedFSMDriverDisposition` | type | <code>type BoundedFSMDriverDisposition = 'completed' &#124; 'failed' &#124; 'cancelled' &#124; 'waiting' &#124; 'budget_exhausted' &#124; 'lease_unavailable' &#124; 'state_claim_unavailable'</code> | Public type alias for Bounded FSM Driver Disposition. |

## `FencedBoundedFSMDriver` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: FencedBoundedFSMDriverOptions): FencedBoundedFSMDriver</code> | Creates an instance of this class. |
| `run` | method | <code>run(input: BoundedFSMDriverRunInput): Promise&lt;BoundedFSMDriverResult&gt;</code> | Public runtime operation for run. |

## `BoundedFSMDriverResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `disposition` | property | <code>disposition: BoundedFSMDriverDisposition</code> | Public disposition property. |
| `projection` | property | <code>projection: RuntimeOrchestrationProjection</code> | Public projection property. |
| `steps` | property | <code>steps: number</code> | Public steps property. |
| `wait` | property | <code>wait: RuntimeWaitIntent</code> | Public wait property. |

## `BoundedFSMDriverRunInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal: AbortSignal</code> | Public abort Signal property. |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public lease Ttl Ms property. |
| `maxSteps` | property | <code>maxSteps: number</code> | Public max Steps property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `process` | property | <code>process: FSMProcessSpec</code> | Public process property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `stateClaimTtlMs` | property | <code>stateClaimTtlMs: number</code> | Public state Claim Ttl Ms property. |

## `BoundedStateExecutionDecision` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guardContext` | property | <code>guardContext: FSMGuardContext</code> | Public guard Context property. |
| `result` | property | <code>result: RuntimeStateExecutionResult</code> | Public result property. |
| `transition` | property | <code>transition: RuntimeTransitionProposal</code> | Public transition property. |

## `BoundedStateExecutorInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal: AbortSignal</code> | Public abort Signal property. |
| `process` | property | <code>process: Readonly&lt;FSMProcessSpec&gt;</code> | Public process property. |
| `projection` | property | <code>projection: Readonly&lt;RuntimeOrchestrationProjection&gt;</code> | Public projection property. |
| `runLease` | property | <code>runLease: Readonly&lt;FencedRunLease&gt;</code> | Public run Lease property. |
| `scope` | property | <code>scope: Readonly&lt;RuntimeScope&gt;</code> | Public scope property. |
| `state` | property | <code>state: Readonly&lt;FSMStateSpec&gt;</code> | Public state property. |
| `stateClaim` | property | <code>stateClaim: Readonly&lt;StateExecutionClaim&gt;</code> | Public state Claim property. |

## `FencedBoundedFSMDriverOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluateGuard` | method | <code>evaluateGuard(transition: Readonly&lt;FSMTransitionSpec&gt;, context: Readonly&lt;FSMGuardContext&gt;): Promise&lt;boolean&gt; &#124; boolean</code> | Evaluates Guard at this module boundary. |
| `events` | property | <code>events: EventRuntime</code> | Public events property. |
| `executeState` | method | <code>executeState(input: BoundedStateExecutorInput): Promise&lt;BoundedStateExecutionDecision&gt;</code> | Public runtime operation for execute State. |
| `nextId` | method | <code>nextId(namespace: string): string</code> | Public runtime operation for next Id. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public projections property. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public projection Store property. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public run Leases property. |
| `stateClaims` | property | <code>stateClaims: StateExecutionClaimStore</code> | Public state Claims property. |
