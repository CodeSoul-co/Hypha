# `@codesoul-co/hypha-core` / `contracts/runtime-recovery`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)
- Exports: **25**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_ACTIVITY_COMPENSATION_STATUSES` | constant | <code>const RUNTIME_ACTIVITY_COMPENSATION_STATUSES: readonly ["completed", "failed", "requires_review"]</code> | RUNTIME ACTIVITY COMPENSATION STATUSES constant exported by the `contracts/runtime-recovery` module. |
| `RUNTIME_ACTIVITY_RECONCILIATION_STATUSES` | constant | <code>const RUNTIME_ACTIVITY_RECONCILIATION_STATUSES: readonly ["completed", "failed", "waiting", "cancelled", "not_started", "unknown"]</code> | RUNTIME ACTIVITY RECONCILIATION STATUSES constant exported by the `contracts/runtime-recovery` module. |
| `RUNTIME_RECOVERY_CANDIDATE_REASONS` | constant | <code>const RUNTIME_RECOVERY_CANDIDATE_REASONS: readonly ["LEASE_EXPIRED", "STATE_CLAIM_EXPIRED", "PROJECTION_BEHIND", "CHECKPOINT_BEHIND", "ACTIVITY_RESULT_UNAPPLIED", "ACTIVITY_COMPENSATION_REQUIRED", "ACTIVITY_REDISPATCH_INCOMPLETE", "MESSAGE_UNACKED", "OUTBOX_UNPUBLISHED", "WAIT_WITHOUT_REGISTRATION", "TIMER_OVERDUE", "SESSION_COMMAND_INCOMPLETE", "RUN_PROJECTION_CONFLICT", "CANCELLATION_INCOMPLETE", "CUSTOM"]</code> | RUNTIME RECOVERY CANDIDATE REASONS constant exported by the `contracts/runtime-recovery` module. |
| `RUNTIME_RECOVERY_DISPOSITIONS` | constant | <code>const RUNTIME_RECOVERY_DISPOSITIONS: readonly ["recovered", "reused", "requeued", "compensated", "requires_review", "lease_unavailable", "stale"]</code> | RUNTIME RECOVERY DISPOSITIONS constant exported by the `contracts/runtime-recovery` module. |
| `RUNTIME_RECOVERY_SAFE_ACTIONS` | constant | <code>const RUNTIME_RECOVERY_SAFE_ACTIONS: readonly ["rebuild_projection", "requeue", "apply_observation", "compensate_activity", "reconcile_redispatch", "restore_wait", "fire_timer", "republish_message", "mark_failed", "manual_review"]</code> | RUNTIME RECOVERY SAFE ACTIONS constant exported by the `contracts/runtime-recovery` module. |
| `RuntimeActivityCompensationRequest` | interface | <code>interface RuntimeActivityCompensationRequest</code> | Field contract for Runtime Activity Compensation Request; see all contract members below. |
| `RuntimeActivityCompensationResult` | interface | <code>interface RuntimeActivityCompensationResult</code> | Field contract for Runtime Activity Compensation Result; see all contract members below. |
| `RuntimeActivityReconciliationPort` | interface | <code>interface RuntimeActivityReconciliationPort</code> | Field contract for Runtime Activity Reconciliation Port; see all contract members below. |
| `RuntimeActivityReconciliationRequest` | interface | <code>interface RuntimeActivityReconciliationRequest</code> | Field contract for Runtime Activity Reconciliation Request; see all contract members below. |
| `RuntimeActivityReconciliationResult` | interface | <code>interface RuntimeActivityReconciliationResult</code> | Field contract for Runtime Activity Reconciliation Result; see all contract members below. |
| `RuntimeActivityRetryRequest` | interface | <code>interface RuntimeActivityRetryRequest extends RuntimeActivityReconciliationRequest</code> | Field contract for Runtime Activity Retry Request; see all contract members below. |
| `RuntimeCancellationRecoveryPort` | interface | <code>interface RuntimeCancellationRecoveryPort</code> | Field contract for Runtime Cancellation Recovery Port; see all contract members below. |
| `RuntimeRecoveryCandidate` | interface | <code>interface RuntimeRecoveryCandidate</code> | Field contract for Runtime Recovery Candidate; see all contract members below. |
| `RuntimeRecoveryCommand` | interface | <code>interface RuntimeRecoveryCommand</code> | Field contract for Runtime Recovery Command; see all contract members below. |
| `RuntimeRecoveryRequeuePort` | interface | <code>interface RuntimeRecoveryRequeuePort</code> | Field contract for Runtime Recovery Requeue Port; see all contract members below. |
| `RuntimeRecoveryRequeueRequest` | interface | <code>interface RuntimeRecoveryRequeueRequest</code> | Field contract for Runtime Recovery Requeue Request; see all contract members below. |
| `RuntimeRecoveryResult` | interface | <code>interface RuntimeRecoveryResult</code> | Field contract for Runtime Recovery Result; see all contract members below. |
| `RuntimeRecoveryScanRequest` | interface | <code>interface RuntimeRecoveryScanRequest</code> | Field contract for Runtime Recovery Scan Request; see all contract members below. |
| `RuntimeRecoveryScanResult` | interface | <code>interface RuntimeRecoveryScanResult</code> | Field contract for Runtime Recovery Scan Result; see all contract members below. |
| `RuntimeRecoveryScope` | interface | <code>interface RuntimeRecoveryScope</code> | Field contract for Runtime Recovery Scope; see all contract members below. |
| `RuntimeActivityCompensationStatus` | type | <code>type RuntimeActivityCompensationStatus = (typeof RUNTIME_ACTIVITY_COMPENSATION_STATUSES)[number]</code> | Public type alias for Runtime Activity Compensation Status. |
| `RuntimeActivityReconciliationStatus` | type | <code>type RuntimeActivityReconciliationStatus = (typeof RUNTIME_ACTIVITY_RECONCILIATION_STATUSES)[number]</code> | Public type alias for Runtime Activity Reconciliation Status. |
| `RuntimeRecoveryCandidateReason` | type | <code>type RuntimeRecoveryCandidateReason = (typeof RUNTIME_RECOVERY_CANDIDATE_REASONS)[number]</code> | Public type alias for Runtime Recovery Candidate Reason. |
| `RuntimeRecoveryDisposition` | type | <code>type RuntimeRecoveryDisposition = (typeof RUNTIME_RECOVERY_DISPOSITIONS)[number]</code> | Public type alias for Runtime Recovery Disposition. |
| `RuntimeRecoverySafeAction` | type | <code>type RuntimeRecoverySafeAction = (typeof RUNTIME_RECOVERY_SAFE_ACTIONS)[number]</code> | Public type alias for Runtime Recovery Safe Action. |

## `RuntimeActivityCompensationRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `invocation` | property | <code>invocation: RuntimeActivityInvocation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | Public invocation property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |

## `RuntimeActivityCompensationResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public activity Id property. |
| `errorCode` | property | <code>errorCode: string</code> | Public error Code property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `receiptId` | property | <code>receiptId: string</code> | Public receipt Id property. |
| `status` | property | <code>status: "completed" &#124; "failed" &#124; "requires_review"</code> | Public status property. |

## `RuntimeActivityReconciliationPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compensate` | method | <code>compensate(request: RuntimeActivityCompensationRequest): Promise&lt;RuntimeActivityCompensationResult&gt;</code> | Public runtime operation for compensate. |
| `reconcile` | method | <code>reconcile(request: RuntimeActivityReconciliationRequest): Promise&lt;RuntimeActivityReconciliationResult&gt;</code> | Public runtime operation for reconcile. |
| `retry` | method | <code>retry(request: RuntimeActivityRetryRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public runtime operation for retry. |

## `RuntimeActivityReconciliationRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `invocation` | property | <code>invocation: RuntimeActivityInvocation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | Public invocation property. |

## `RuntimeActivityReconciliationResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public activity Id property. |
| `observation` | property | <code>observation: RuntimeActivityObservation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | Public observation property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `receiptId` | property | <code>receiptId: string</code> | Public receipt Id property. |
| `status` | property | <code>status: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "not_started" &#124; "waiting"</code> | Public status property. |

## `RuntimeActivityRetryRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `invocation` | property | <code>invocation: RuntimeActivityInvocation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | Public invocation property. |

## `RuntimeCancellationRecoveryPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(input: RuntimeCancelCommand): Promise&lt;RuntimeCancelResult&gt;</code> | Cancels cancel at this module boundary. |

## `RuntimeRecoveryCandidate` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public activity Id property. |
| `candidateId` | property | <code>candidateId: string</code> | Public candidate Id property. |
| `currentLease` | property | <code>currentLease: FencedRunLease</code> | Public current Lease property. |
| `detectedAt` | property | <code>detectedAt: string</code> | Public detected At property. |
| `eventHeadSequence` | property | <code>eventHeadSequence: number</code> | Public event Head Sequence property. |
| `projectionSequence` | property | <code>projectionSequence: number</code> | Public projection Sequence property. |
| `reason` | property | <code>reason: "LEASE_EXPIRED" &#124; "STATE_CLAIM_EXPIRED" &#124; "PROJECTION_BEHIND" &#124; "CHECKPOINT_BEHIND" &#124; "ACTIVITY_RESULT_UNAPPLIED" &#124; "ACTIVITY_COMPENSATION_REQUIRED" &#124; "ACTIVITY_REDISPATCH_INCOMPLETE" &#124; "MESSAGE_UNACKED" &#124; "OUTBOX_UNPUBLISHED" &#124; "WAIT_WITHOUT_REGISTRATION" &#124; "TIMER_OVERDUE" &#124; "SESSION_COMMAND_INCOMPLETE" &#124; "RUN_PROJECTION_CONFLICT" &#124; "CANCELLATION_INCOMPLETE" &#124; "CUSTOM"</code> | Public reason property. |
| `redispatchRequestEventId` | property | <code>redispatchRequestEventId: string</code> | Public redispatch Request Event Id property. |
| `safeAction` | property | <code>safeAction: "rebuild_projection" &#124; "requeue" &#124; "apply_observation" &#124; "compensate_activity" &#124; "reconcile_redispatch" &#124; "restore_wait" &#124; "fire_timer" &#124; "republish_message" &#124; "mark_failed" &#124; "manual_review"</code> | Public safe Action property. |
| `scope` | property | <code>scope: RuntimeRecoveryScope</code> | Public scope property. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public state Attempt property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |

## `RuntimeRecoveryCommand` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidate` | property | <code>candidate: RuntimeRecoveryCandidate</code> | Public candidate property. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public lease Ttl Ms property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |

## `RuntimeRecoveryRequeuePort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `requeue` | method | <code>requeue(request: RuntimeRecoveryRequeueRequest): Promise&lt;void&gt;</code> | Public runtime operation for requeue. |

## `RuntimeRecoveryRequeueRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedStateAttempt` | property | <code>expectedStateAttempt: number</code> | Public expected State Attempt property. |
| `expectedStateId` | property | <code>expectedStateId: string</code> | Public expected State Id property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `reason` | property | <code>reason: "LEASE_EXPIRED" &#124; "STATE_CLAIM_EXPIRED" &#124; "PROJECTION_BEHIND" &#124; "CHECKPOINT_BEHIND" &#124; "ACTIVITY_RESULT_UNAPPLIED" &#124; "ACTIVITY_COMPENSATION_REQUIRED" &#124; "ACTIVITY_REDISPATCH_INCOMPLETE" &#124; "MESSAGE_UNACKED" &#124; "OUTBOX_UNPUBLISHED" &#124; "WAIT_WITHOUT_REGISTRATION" &#124; "TIMER_OVERDUE" &#124; "SESSION_COMMAND_INCOMPLETE" &#124; "RUN_PROJECTION_CONFLICT" &#124; "CANCELLATION_INCOMPLETE" &#124; "CUSTOM"</code> | Public reason property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `scope` | property | <code>scope: RuntimeRecoveryScope</code> | Public scope property. |

## `RuntimeRecoveryResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidateId` | property | <code>candidateId: string</code> | Public candidate Id property. |
| `disposition` | property | <code>disposition: "recovered" &#124; "compensated" &#124; "reused" &#124; "requeued" &#124; "lease_unavailable" &#124; "requires_review" &#124; "stale"</code> | Public disposition property. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public event Ids property. |
| `projection` | property | <code>projection: RuntimeOrchestrationProjection</code> | Public projection property. |

## `RuntimeRecoveryScanRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `cursor` | property | <code>cursor: string</code> | Public cursor property. |
| `limit` | property | <code>limit: number</code> | Public limit property. |

## `RuntimeRecoveryScanResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidates` | property | <code>candidates: RuntimeRecoveryCandidate[]</code> | Public candidates property. |
| `nextCursor` | property | <code>nextCursor: string</code> | Public next Cursor property. |
| `scannedStreams` | property | <code>scannedStreams: number</code> | Public scanned Streams property. |

## `RuntimeRecoveryScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
