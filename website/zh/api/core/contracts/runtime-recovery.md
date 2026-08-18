# `@codesoul-co/hypha-core` / `contracts/runtime-recovery`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)
- 导出数: **25**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_ACTIVITY_COMPENSATION_STATUSES` | 常量 | <code>const RUNTIME_ACTIVITY_COMPENSATION_STATUSES: readonly ["completed", "failed", "requires_review"]</code> | 由 `contracts/runtime-recovery` 模块导出的 RUNTIME ACTIVITY COMPENSATION STATUSES 常量。 |
| `RUNTIME_ACTIVITY_RECONCILIATION_STATUSES` | 常量 | <code>const RUNTIME_ACTIVITY_RECONCILIATION_STATUSES: readonly ["completed", "failed", "waiting", "cancelled", "not_started", "unknown"]</code> | 由 `contracts/runtime-recovery` 模块导出的 RUNTIME ACTIVITY RECONCILIATION STATUSES 常量。 |
| `RUNTIME_RECOVERY_CANDIDATE_REASONS` | 常量 | <code>const RUNTIME_RECOVERY_CANDIDATE_REASONS: readonly ["LEASE_EXPIRED", "STATE_CLAIM_EXPIRED", "PROJECTION_BEHIND", "CHECKPOINT_BEHIND", "ACTIVITY_RESULT_UNAPPLIED", "ACTIVITY_COMPENSATION_REQUIRED", "ACTIVITY_REDISPATCH_INCOMPLETE", "MESSAGE_UNACKED", "OUTBOX_UNPUBLISHED", "WAIT_WITHOUT_REGISTRATION", "TIMER_OVERDUE", "SESSION_COMMAND_INCOMPLETE", "RUN_PROJECTION_CONFLICT", "CANCELLATION_INCOMPLETE", "CUSTOM"]</code> | 由 `contracts/runtime-recovery` 模块导出的 RUNTIME RECOVERY CANDIDATE REASONS 常量。 |
| `RUNTIME_RECOVERY_DISPOSITIONS` | 常量 | <code>const RUNTIME_RECOVERY_DISPOSITIONS: readonly ["recovered", "reused", "requeued", "compensated", "requires_review", "lease_unavailable", "stale"]</code> | 由 `contracts/runtime-recovery` 模块导出的 RUNTIME RECOVERY DISPOSITIONS 常量。 |
| `RUNTIME_RECOVERY_SAFE_ACTIONS` | 常量 | <code>const RUNTIME_RECOVERY_SAFE_ACTIONS: readonly ["rebuild_projection", "requeue", "apply_observation", "compensate_activity", "reconcile_redispatch", "restore_wait", "fire_timer", "republish_message", "mark_failed", "manual_review"]</code> | 由 `contracts/runtime-recovery` 模块导出的 RUNTIME RECOVERY SAFE ACTIONS 常量。 |
| `RuntimeActivityCompensationRequest` | 接口 | <code>interface RuntimeActivityCompensationRequest</code> | Runtime Activity Compensation Request 的字段契约；完整字段见下表。 |
| `RuntimeActivityCompensationResult` | 接口 | <code>interface RuntimeActivityCompensationResult</code> | Runtime Activity Compensation Result 的字段契约；完整字段见下表。 |
| `RuntimeActivityReconciliationPort` | 接口 | <code>interface RuntimeActivityReconciliationPort</code> | Runtime Activity Reconciliation Port 的字段契约；完整字段见下表。 |
| `RuntimeActivityReconciliationRequest` | 接口 | <code>interface RuntimeActivityReconciliationRequest</code> | Runtime Activity Reconciliation Request 的字段契约；完整字段见下表。 |
| `RuntimeActivityReconciliationResult` | 接口 | <code>interface RuntimeActivityReconciliationResult</code> | Runtime Activity Reconciliation Result 的字段契约；完整字段见下表。 |
| `RuntimeActivityRetryRequest` | 接口 | <code>interface RuntimeActivityRetryRequest extends RuntimeActivityReconciliationRequest</code> | Runtime Activity Retry Request 的字段契约；完整字段见下表。 |
| `RuntimeCancellationRecoveryPort` | 接口 | <code>interface RuntimeCancellationRecoveryPort</code> | Runtime Cancellation Recovery Port 的字段契约；完整字段见下表。 |
| `RuntimeRecoveryCandidate` | 接口 | <code>interface RuntimeRecoveryCandidate</code> | Runtime Recovery Candidate 的字段契约；完整字段见下表。 |
| `RuntimeRecoveryCommand` | 接口 | <code>interface RuntimeRecoveryCommand</code> | Runtime Recovery Command 的字段契约；完整字段见下表。 |
| `RuntimeRecoveryRequeuePort` | 接口 | <code>interface RuntimeRecoveryRequeuePort</code> | Runtime Recovery Requeue Port 的字段契约；完整字段见下表。 |
| `RuntimeRecoveryRequeueRequest` | 接口 | <code>interface RuntimeRecoveryRequeueRequest</code> | Runtime Recovery Requeue Request 的字段契约；完整字段见下表。 |
| `RuntimeRecoveryResult` | 接口 | <code>interface RuntimeRecoveryResult</code> | Runtime Recovery Result 的字段契约；完整字段见下表。 |
| `RuntimeRecoveryScanRequest` | 接口 | <code>interface RuntimeRecoveryScanRequest</code> | Runtime Recovery Scan Request 的字段契约；完整字段见下表。 |
| `RuntimeRecoveryScanResult` | 接口 | <code>interface RuntimeRecoveryScanResult</code> | Runtime Recovery Scan Result 的字段契约；完整字段见下表。 |
| `RuntimeRecoveryScope` | 接口 | <code>interface RuntimeRecoveryScope</code> | Runtime Recovery Scope 的字段契约；完整字段见下表。 |
| `RuntimeActivityCompensationStatus` | 类型 | <code>type RuntimeActivityCompensationStatus = (typeof RUNTIME_ACTIVITY_COMPENSATION_STATUSES)[number]</code> | Runtime Activity Compensation Status 的公共类型别名。 |
| `RuntimeActivityReconciliationStatus` | 类型 | <code>type RuntimeActivityReconciliationStatus = (typeof RUNTIME_ACTIVITY_RECONCILIATION_STATUSES)[number]</code> | Runtime Activity Reconciliation Status 的公共类型别名。 |
| `RuntimeRecoveryCandidateReason` | 类型 | <code>type RuntimeRecoveryCandidateReason = (typeof RUNTIME_RECOVERY_CANDIDATE_REASONS)[number]</code> | Runtime Recovery Candidate Reason 的公共类型别名。 |
| `RuntimeRecoveryDisposition` | 类型 | <code>type RuntimeRecoveryDisposition = (typeof RUNTIME_RECOVERY_DISPOSITIONS)[number]</code> | Runtime Recovery Disposition 的公共类型别名。 |
| `RuntimeRecoverySafeAction` | 类型 | <code>type RuntimeRecoverySafeAction = (typeof RUNTIME_RECOVERY_SAFE_ACTIONS)[number]</code> | Runtime Recovery Safe Action 的公共类型别名。 |

## `RuntimeActivityCompensationRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `invocation` | 属性 | <code>invocation: RuntimeActivityInvocation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | invocation 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |

## `RuntimeActivityCompensationResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | activity Id 字段。 |
| `errorCode` | 属性 | <code>errorCode: string</code> | error Code 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `receiptId` | 属性 | <code>receiptId: string</code> | receipt Id 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "failed" &#124; "requires_review"</code> | status 字段。 |

## `RuntimeActivityReconciliationPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compensate` | 方法 | <code>compensate(request: RuntimeActivityCompensationRequest): Promise&lt;RuntimeActivityCompensationResult&gt;</code> | compensate 的公开运行时操作。 |
| `reconcile` | 方法 | <code>reconcile(request: RuntimeActivityReconciliationRequest): Promise&lt;RuntimeActivityReconciliationResult&gt;</code> | reconcile 的公开运行时操作。 |
| `retry` | 方法 | <code>retry(request: RuntimeActivityRetryRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | retry 的公开运行时操作。 |

## `RuntimeActivityReconciliationRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `invocation` | 属性 | <code>invocation: RuntimeActivityInvocation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | invocation 字段。 |

## `RuntimeActivityReconciliationResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | activity Id 字段。 |
| `observation` | 属性 | <code>observation: RuntimeActivityObservation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | observation 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `receiptId` | 属性 | <code>receiptId: string</code> | receipt Id 字段。 |
| `status` | 属性 | <code>status: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "not_started" &#124; "waiting"</code> | status 字段。 |

## `RuntimeActivityRetryRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `invocation` | 属性 | <code>invocation: RuntimeActivityInvocation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | invocation 字段。 |

## `RuntimeCancellationRecoveryPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(input: RuntimeCancelCommand): Promise&lt;RuntimeCancelResult&gt;</code> | 取消 cancel。 |

## `RuntimeRecoveryCandidate` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | activity Id 字段。 |
| `candidateId` | 属性 | <code>candidateId: string</code> | candidate Id 字段。 |
| `currentLease` | 属性 | <code>currentLease: FencedRunLease</code> | current Lease 字段。 |
| `detectedAt` | 属性 | <code>detectedAt: string</code> | detected At 字段。 |
| `eventHeadSequence` | 属性 | <code>eventHeadSequence: number</code> | event Head Sequence 字段。 |
| `projectionSequence` | 属性 | <code>projectionSequence: number</code> | projection Sequence 字段。 |
| `reason` | 属性 | <code>reason: "LEASE_EXPIRED" &#124; "STATE_CLAIM_EXPIRED" &#124; "PROJECTION_BEHIND" &#124; "CHECKPOINT_BEHIND" &#124; "ACTIVITY_RESULT_UNAPPLIED" &#124; "ACTIVITY_COMPENSATION_REQUIRED" &#124; "ACTIVITY_REDISPATCH_INCOMPLETE" &#124; "MESSAGE_UNACKED" &#124; "OUTBOX_UNPUBLISHED" &#124; "WAIT_WITHOUT_REGISTRATION" &#124; "TIMER_OVERDUE" &#124; "SESSION_COMMAND_INCOMPLETE" &#124; "RUN_PROJECTION_CONFLICT" &#124; "CANCELLATION_INCOMPLETE" &#124; "CUSTOM"</code> | reason 字段。 |
| `redispatchRequestEventId` | 属性 | <code>redispatchRequestEventId: string</code> | redispatch Request Event Id 字段。 |
| `safeAction` | 属性 | <code>safeAction: "rebuild_projection" &#124; "requeue" &#124; "apply_observation" &#124; "compensate_activity" &#124; "reconcile_redispatch" &#124; "restore_wait" &#124; "fire_timer" &#124; "republish_message" &#124; "mark_failed" &#124; "manual_review"</code> | safe Action 字段。 |
| `scope` | 属性 | <code>scope: RuntimeRecoveryScope</code> | scope 字段。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | state Attempt 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |

## `RuntimeRecoveryCommand` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidate` | 属性 | <code>candidate: RuntimeRecoveryCandidate</code> | candidate 字段。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | lease Ttl Ms 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |

## `RuntimeRecoveryRequeuePort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `requeue` | 方法 | <code>requeue(request: RuntimeRecoveryRequeueRequest): Promise&lt;void&gt;</code> | requeue 的公开运行时操作。 |

## `RuntimeRecoveryRequeueRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedStateAttempt` | 属性 | <code>expectedStateAttempt: number</code> | expected State Attempt 字段。 |
| `expectedStateId` | 属性 | <code>expectedStateId: string</code> | expected State Id 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `reason` | 属性 | <code>reason: "LEASE_EXPIRED" &#124; "STATE_CLAIM_EXPIRED" &#124; "PROJECTION_BEHIND" &#124; "CHECKPOINT_BEHIND" &#124; "ACTIVITY_RESULT_UNAPPLIED" &#124; "ACTIVITY_COMPENSATION_REQUIRED" &#124; "ACTIVITY_REDISPATCH_INCOMPLETE" &#124; "MESSAGE_UNACKED" &#124; "OUTBOX_UNPUBLISHED" &#124; "WAIT_WITHOUT_REGISTRATION" &#124; "TIMER_OVERDUE" &#124; "SESSION_COMMAND_INCOMPLETE" &#124; "RUN_PROJECTION_CONFLICT" &#124; "CANCELLATION_INCOMPLETE" &#124; "CUSTOM"</code> | reason 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `scope` | 属性 | <code>scope: RuntimeRecoveryScope</code> | scope 字段。 |

## `RuntimeRecoveryResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidateId` | 属性 | <code>candidateId: string</code> | candidate Id 字段。 |
| `disposition` | 属性 | <code>disposition: "recovered" &#124; "compensated" &#124; "reused" &#124; "requeued" &#124; "lease_unavailable" &#124; "requires_review" &#124; "stale"</code> | disposition 字段。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | event Ids 字段。 |
| `projection` | 属性 | <code>projection: RuntimeOrchestrationProjection</code> | projection 字段。 |

## `RuntimeRecoveryScanRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `cursor` | 属性 | <code>cursor: string</code> | cursor 字段。 |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |

## `RuntimeRecoveryScanResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidates` | 属性 | <code>candidates: RuntimeRecoveryCandidate[]</code> | candidates 字段。 |
| `nextCursor` | 属性 | <code>nextCursor: string</code> | next Cursor 字段。 |
| `scannedStreams` | 属性 | <code>scannedStreams: number</code> | scanned Streams 字段。 |

## `RuntimeRecoveryScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
