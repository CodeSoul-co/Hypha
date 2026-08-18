# `@codesoul-co/hypha-fsm` / `recovery`

- Package index: [`@codesoul-co/hypha-fsm`](/api/fsm)
- Package guide: [learning and composition guide](/packages/fsm)
- Source: [`packages/fsm/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)
- Exports: **27**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `defaultFSMRecoveryPolicy` | constant | <code>const defaultFSMRecoveryPolicy: FSMRecoveryPolicySpec</code> | default FSM Recovery Policy constant exported by the `recovery` module. |
| `FSM_ANOMALY_CATEGORIES` | constant | <code>const FSM_ANOMALY_CATEGORIES: readonly ["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"]</code> | FSM ANOMALY CATEGORIES constant exported by the `recovery` module. |
| `FSM_ANOMALY_SOURCES` | constant | <code>const FSM_ANOMALY_SOURCES: readonly ["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"]</code> | FSM ANOMALY SOURCES constant exported by the `recovery` module. |
| `FSM_RECOVERY_ACTIONS` | constant | <code>const FSM_RECOVERY_ACTIONS: readonly ["retry", "reconcile", "fallback", "degrade", "wait", "compensate", "human_review", "quarantine", "fail", "cancel"]</code> | FSM RECOVERY ACTIONS constant exported by the `recovery` module. |
| `fsmAnomalySchema` | constant | <code>const fsmAnomalySchema: z.ZodObject&lt;{ id: z.ZodString; source: z.ZodEnum&lt;["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"]&gt;; category: z.ZodEnum&lt;["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted"...</code> | Runtime schema for fsm Anomaly. |
| `fsmRecoveryPolicySpecSchema` | constant | <code>const fsmRecoveryPolicySpecSchema: z.ZodObject&lt;{ maxAttemptsPerState: z.ZodNumber; maxTotalAttempts: z.ZodNumber; maxElapsedMs: z.ZodNumber; retryableCategories: z.ZodArray&lt;z.ZodEnum&lt;["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_fai...</code> | Runtime schema for fsm Recovery Policy Spec. |
| `fsmRecoverySnapshotSchema` | constant | <code>const fsmRecoverySnapshotSchema: z.ZodObject&lt;{ startedAt: z.ZodString; updatedAt: z.ZodString; totalAttempts: z.ZodNumber; attemptsByState: z.ZodRecord&lt;z.ZodString, z.ZodNumber&gt;; circuits: z.ZodRecord&lt;z.ZodString, z.ZodObject&lt;{ status: z.ZodEnum&lt;["closed", "open", "half_open"]&gt;; consecutiveFailures: z.ZodNumber; halfOpenAttempts: z.ZodNumber; openedAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { status...</code> | Runtime schema for fsm Recovery Snapshot. |
| `classifyFSMAnomaly` | function | <code>classifyFSMAnomaly(error: unknown, input: FSMAnomalyClassificationInput): FSMAnomaly</code> | Public runtime operation for classify FSM Anomaly. |
| `computeFSMRecoveryDelay` | function | <code>computeFSMRecoveryDelay(policy: FSMRecoveryBackoffPolicy, attempt: number, seed: string): number</code> | Public runtime operation for compute FSM Recovery Delay. |
| `createInitialFSMRecoverySnapshot` | function | <code>createInitialFSMRecoverySnapshot(now?: string): FSMRecoverySnapshot</code> | Creates Initial FSM Recovery Snapshot at this module boundary. |
| `planFSMRecovery` | function | <code>planFSMRecovery(input: { anomaly: FSMAnomaly; stateId: string; policy?: FSMRecoveryPolicySpec; snapshot?: FSMRecoverySnapshot; now?: string; }): FSMRecoveryPlan</code> | Plans FSM Recovery at this module boundary. |
| `registerFSMRecoverySuccess` | function | <code>registerFSMRecoverySuccess(snapshot: FSMRecoverySnapshot, circuitKey: string, now?: string): FSMRecoverySnapshot</code> | Registers FSM Recovery Success at this module boundary. |
| `FSMAnomaly` | interface | <code>interface FSMAnomaly</code> | Field contract for FSM Anomaly; see all contract members below. |
| `FSMAnomalyClassificationInput` | interface | <code>interface FSMAnomalyClassificationInput</code> | Field contract for FSM Anomaly Classification Input; see all contract members below. |
| `FSMCircuitBreakerPolicy` | interface | <code>interface FSMCircuitBreakerPolicy</code> | Field contract for FSM Circuit Breaker Policy; see all contract members below. |
| `FSMCircuitSnapshot` | interface | <code>interface FSMCircuitSnapshot</code> | Field contract for FSM Circuit Snapshot; see all contract members below. |
| `FSMRecoveryBackoffPolicy` | interface | <code>interface FSMRecoveryBackoffPolicy</code> | Field contract for FSM Recovery Backoff Policy; see all contract members below. |
| `FSMRecoveryDecision` | interface | <code>interface FSMRecoveryDecision</code> | Field contract for FSM Recovery Decision; see all contract members below. |
| `FSMRecoveryPlan` | interface | <code>interface FSMRecoveryPlan</code> | Field contract for FSM Recovery Plan; see all contract members below. |
| `FSMRecoveryPolicySpec` | interface | <code>interface FSMRecoveryPolicySpec</code> | Field contract for FSM Recovery Policy Spec; see all contract members below. |
| `FSMRecoverySnapshot` | interface | <code>interface FSMRecoverySnapshot</code> | Field contract for FSM Recovery Snapshot; see all contract members below. |
| `FSMRecoveryStateTargets` | interface | <code>interface FSMRecoveryStateTargets</code> | Field contract for FSM Recovery State Targets; see all contract members below. |
| `FSMAnomalyCategory` | type | <code>type FSMAnomalyCategory = RecoveryCategory</code> | Public type alias for FSM Anomaly Category. |
| `FSMAnomalySource` | type | <code>type FSMAnomalySource = RecoveryModule</code> | Public type alias for FSM Anomaly Source. |
| `FSMCircuitStatus` | type | <code>type FSMCircuitStatus = 'closed' &#124; 'open' &#124; 'half_open'</code> | Public type alias for FSM Circuit Status. |
| `FSMRecoveryAction` | type | <code>type FSMRecoveryAction = (typeof FSM_RECOVERY_ACTIONS)[number]</code> | Public type alias for FSM Recovery Action. |
| `FSMSideEffectState` | type | <code>type FSMSideEffectState = RecoverySideEffectState</code> | Public type alias for FSM Side Effect State. |

## `FSMAnomaly` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `category` | property | <code>category: "unknown" &#124; "cancellation" &#124; "timeout" &#124; "validation" &#124; "policy_denied" &#124; "authentication" &#124; "authorization" &#124; "rate_limit" &#124; "transient_dependency" &#124; "permanent_dependency" &#124; "concurrency_conflict" &#124; "resource_exhausted" &#124; "tool_failure" &#124; "inference_failure" &#124; "memory_failure" &#124; "execution_failure" &#124; "storage_failure" &#124; "message_failure" &#124; "cache_failure" &#124; "invariant_violation"</code> | Public category property. |
| `circuitKey` | property | <code>circuitKey: string</code> | Public circuit Key property. |
| `code` | property | <code>code: string</code> | Public code property. |
| `compensationAvailable` | property | <code>compensationAvailable: boolean</code> | Public compensation Available property. |
| `degradationAvailable` | property | <code>degradationAvailable: boolean</code> | Public degradation Available property. |
| `fallbackAvailable` | property | <code>fallbackAvailable: boolean</code> | Public fallback Available property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public occurred At property. |
| `reconciliationAvailable` | property | <code>reconciliationAvailable: boolean</code> | Public reconciliation Available property. |
| `retryable` | property | <code>retryable: boolean</code> | Public retryable property. |
| `retryAfterMs` | property | <code>retryAfterMs: number</code> | Public retry After Ms property. |
| `sideEffectState` | property | <code>sideEffectState: RecoverySideEffectState</code> | Public side Effect State property. |
| `source` | property | <code>source: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | Public source property. |

## `FSMAnomalyClassificationInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `circuitKey` | property | <code>circuitKey: string</code> | Public circuit Key property. |
| `compensationAvailable` | property | <code>compensationAvailable: boolean</code> | Public compensation Available property. |
| `degradationAvailable` | property | <code>degradationAvailable: boolean</code> | Public degradation Available property. |
| `fallbackAvailable` | property | <code>fallbackAvailable: boolean</code> | Public fallback Available property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public occurred At property. |
| `reconciliationAvailable` | property | <code>reconciliationAvailable: boolean</code> | Public reconciliation Available property. |
| `retryable` | property | <code>retryable: boolean</code> | Public retryable property. |
| `retryAfterMs` | property | <code>retryAfterMs: number</code> | Public retry After Ms property. |
| `sideEffectState` | property | <code>sideEffectState: RecoverySideEffectState</code> | Public side Effect State property. |
| `source` | property | <code>source: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | Public source property. |

## `FSMCircuitBreakerPolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `failureThreshold` | property | <code>failureThreshold: number</code> | Public failure Threshold property. |
| `halfOpenMaxAttempts` | property | <code>halfOpenMaxAttempts: number</code> | Public half Open Max Attempts property. |
| `resetTimeoutMs` | property | <code>resetTimeoutMs: number</code> | Public reset Timeout Ms property. |

## `FSMCircuitSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `consecutiveFailures` | property | <code>consecutiveFailures: number</code> | Public consecutive Failures property. |
| `halfOpenAttempts` | property | <code>halfOpenAttempts: number</code> | Public half Open Attempts property. |
| `openedAt` | property | <code>openedAt: string</code> | Public opened At property. |
| `status` | property | <code>status: FSMCircuitStatus</code> | Public status property. |

## `FSMRecoveryBackoffPolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `initialDelayMs` | property | <code>initialDelayMs: number</code> | Public initial Delay Ms property. |
| `jitterRatio` | property | <code>jitterRatio: number</code> | Public jitter Ratio property. |
| `maxDelayMs` | property | <code>maxDelayMs: number</code> | Public max Delay Ms property. |
| `multiplier` | property | <code>multiplier: number</code> | Public multiplier property. |

## `FSMRecoveryDecision` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `action` | property | <code>action: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public action property. |
| `afterCompensationAction` | property | <code>afterCompensationAction: "fail" &#124; "human_review" &#124; "quarantine"</code> | Public after Compensation Action property. |
| `afterCompensationState` | property | <code>afterCompensationState: string</code> | Public after Compensation State property. |
| `anomaly` | property | <code>anomaly: FSMAnomaly</code> | Public anomaly property. |
| `attempt` | property | <code>attempt: number</code> | Public attempt property. |
| `circuitKey` | property | <code>circuitKey: string</code> | Public circuit Key property. |
| `circuitStatus` | property | <code>circuitStatus: FSMCircuitStatus</code> | Public circuit Status property. |
| `decidedAt` | property | <code>decidedAt: string</code> | Public decided At property. |
| `delayMs` | property | <code>delayMs: number</code> | Public delay Ms property. |
| `fromState` | property | <code>fromState: string</code> | Public from State property. |
| `nextEligibleAt` | property | <code>nextEligibleAt: string</code> | Public next Eligible At property. |
| `quarantineState` | property | <code>quarantineState: string</code> | Public quarantine State property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `resumeState` | property | <code>resumeState: string</code> | Public resume State property. |
| `totalAttempts` | property | <code>totalAttempts: number</code> | Public total Attempts property. |
| `transitionState` | property | <code>transitionState: string</code> | Public transition State property. |

## `FSMRecoveryPlan` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `decision` | property | <code>decision: FSMRecoveryDecision</code> | Public decision property. |
| `snapshot` | property | <code>snapshot: FSMRecoverySnapshot</code> | Public snapshot property. |

## `FSMRecoveryPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `afterCompensation` | property | <code>afterCompensation: "fail" &#124; "human_review" &#124; "quarantine"</code> | Public after Compensation property. |
| `backoff` | property | <code>backoff: FSMRecoveryBackoffPolicy</code> | Public backoff property. |
| `circuitBreaker` | property | <code>circuitBreaker: FSMCircuitBreakerPolicy</code> | Public circuit Breaker property. |
| `maxAttemptsPerState` | property | <code>maxAttemptsPerState: number</code> | Public max Attempts Per State property. |
| `maxElapsedMs` | property | <code>maxElapsedMs: number</code> | Public max Elapsed Ms property. |
| `maxTotalAttempts` | property | <code>maxTotalAttempts: number</code> | Public max Total Attempts property. |
| `nonRetryableCodes` | property | <code>nonRetryableCodes: string[]</code> | Public non Retryable Codes property. |
| `onExhausted` | property | <code>onExhausted: "fail" &#124; "human_review" &#124; "quarantine"</code> | Public on Exhausted property. |
| `retryableCategories` | property | <code>retryableCategories: ("unknown" &#124; "cancellation" &#124; "timeout" &#124; "validation" &#124; "policy_denied" &#124; "authentication" &#124; "authorization" &#124; "rate_limit" &#124; "transient_dependency" &#124; "permanent_dependency" &#124; "concurrency_conflict" &#124; "resource_exhausted" &#124; "tool_failure" &#124; "inference_failure" &#124; "memory_failure" &#124; "execution_failure" &#124; "storage_failure" &#124; "message_failure" &#124; "cache_failure" &#124; "invariant_violation")[]</code> | Public retryable Categories property. |
| `stateTargets` | property | <code>stateTargets: FSMRecoveryStateTargets</code> | Public state Targets property. |

## `FSMRecoverySnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attemptsByState` | property | <code>attemptsByState: Record&lt;string, number&gt;</code> | Public attempts By State property. |
| `circuits` | property | <code>circuits: Record&lt;string, FSMCircuitSnapshot&gt;</code> | Public circuits property. |
| `lastAction` | property | <code>lastAction: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public last Action property. |
| `lastAnomalyId` | property | <code>lastAnomalyId: string</code> | Public last Anomaly Id property. |
| `startedAt` | property | <code>startedAt: string</code> | Public started At property. |
| `totalAttempts` | property | <code>totalAttempts: number</code> | Public total Attempts property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `FSMRecoveryStateTargets` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancelled` | property | <code>cancelled: string</code> | Public cancelled property. |
| `compensating` | property | <code>compensating: string</code> | Public compensating property. |
| `failed` | property | <code>failed: string</code> | Public failed property. |
| `humanReview` | property | <code>humanReview: string</code> | Public human Review property. |
| `quarantined` | property | <code>quarantined: string</code> | Public quarantined property. |
| `recovering` | property | <code>recovering: string</code> | Public recovering property. |
