# `@codesoul-co/hypha-fsm` / `recovery`

- 包索引: [`@codesoul-co/hypha-fsm`](/zh/api/fsm)
- 模块指南: [学习与组合说明](/zh/packages/fsm)
- 源码: [`packages/fsm/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)
- 导出数: **27**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `defaultFSMRecoveryPolicy` | 常量 | <code>const defaultFSMRecoveryPolicy: FSMRecoveryPolicySpec</code> | 由 `recovery` 模块导出的 default FSM Recovery Policy 常量。 |
| `FSM_ANOMALY_CATEGORIES` | 常量 | <code>const FSM_ANOMALY_CATEGORIES: readonly ["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"]</code> | 由 `recovery` 模块导出的 FSM ANOMALY CATEGORIES 常量。 |
| `FSM_ANOMALY_SOURCES` | 常量 | <code>const FSM_ANOMALY_SOURCES: readonly ["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"]</code> | 由 `recovery` 模块导出的 FSM ANOMALY SOURCES 常量。 |
| `FSM_RECOVERY_ACTIONS` | 常量 | <code>const FSM_RECOVERY_ACTIONS: readonly ["retry", "reconcile", "fallback", "degrade", "wait", "compensate", "human_review", "quarantine", "fail", "cancel"]</code> | 由 `recovery` 模块导出的 FSM RECOVERY ACTIONS 常量。 |
| `fsmAnomalySchema` | 常量 | <code>const fsmAnomalySchema: z.ZodObject&lt;{ id: z.ZodString; source: z.ZodEnum&lt;["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"]&gt;; category: z.ZodEnum&lt;["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted"...</code> | fsm Anomaly 的运行时 Schema。 |
| `fsmRecoveryPolicySpecSchema` | 常量 | <code>const fsmRecoveryPolicySpecSchema: z.ZodObject&lt;{ maxAttemptsPerState: z.ZodNumber; maxTotalAttempts: z.ZodNumber; maxElapsedMs: z.ZodNumber; retryableCategories: z.ZodArray&lt;z.ZodEnum&lt;["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_fai...</code> | fsm Recovery Policy Spec 的运行时 Schema。 |
| `fsmRecoverySnapshotSchema` | 常量 | <code>const fsmRecoverySnapshotSchema: z.ZodObject&lt;{ startedAt: z.ZodString; updatedAt: z.ZodString; totalAttempts: z.ZodNumber; attemptsByState: z.ZodRecord&lt;z.ZodString, z.ZodNumber&gt;; circuits: z.ZodRecord&lt;z.ZodString, z.ZodObject&lt;{ status: z.ZodEnum&lt;["closed", "open", "half_open"]&gt;; consecutiveFailures: z.ZodNumber; halfOpenAttempts: z.ZodNumber; openedAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { status...</code> | fsm Recovery Snapshot 的运行时 Schema。 |
| `classifyFSMAnomaly` | 函数 | <code>classifyFSMAnomaly(error: unknown, input: FSMAnomalyClassificationInput): FSMAnomaly</code> | classify FSM Anomaly 的公开运行时操作。 |
| `computeFSMRecoveryDelay` | 函数 | <code>computeFSMRecoveryDelay(policy: FSMRecoveryBackoffPolicy, attempt: number, seed: string): number</code> | compute FSM Recovery Delay 的公开运行时操作。 |
| `createInitialFSMRecoverySnapshot` | 函数 | <code>createInitialFSMRecoverySnapshot(now?: string): FSMRecoverySnapshot</code> | 创建 Initial FSM Recovery Snapshot。 |
| `planFSMRecovery` | 函数 | <code>planFSMRecovery(input: { anomaly: FSMAnomaly; stateId: string; policy?: FSMRecoveryPolicySpec; snapshot?: FSMRecoverySnapshot; now?: string; }): FSMRecoveryPlan</code> | 规划 FSM Recovery。 |
| `registerFSMRecoverySuccess` | 函数 | <code>registerFSMRecoverySuccess(snapshot: FSMRecoverySnapshot, circuitKey: string, now?: string): FSMRecoverySnapshot</code> | 注册 FSM Recovery Success。 |
| `FSMAnomaly` | 接口 | <code>interface FSMAnomaly</code> | FSM Anomaly 的字段契约；完整字段见下表。 |
| `FSMAnomalyClassificationInput` | 接口 | <code>interface FSMAnomalyClassificationInput</code> | FSM Anomaly Classification Input 的字段契约；完整字段见下表。 |
| `FSMCircuitBreakerPolicy` | 接口 | <code>interface FSMCircuitBreakerPolicy</code> | FSM Circuit Breaker Policy 的字段契约；完整字段见下表。 |
| `FSMCircuitSnapshot` | 接口 | <code>interface FSMCircuitSnapshot</code> | FSM Circuit Snapshot 的字段契约；完整字段见下表。 |
| `FSMRecoveryBackoffPolicy` | 接口 | <code>interface FSMRecoveryBackoffPolicy</code> | FSM Recovery Backoff Policy 的字段契约；完整字段见下表。 |
| `FSMRecoveryDecision` | 接口 | <code>interface FSMRecoveryDecision</code> | FSM Recovery Decision 的字段契约；完整字段见下表。 |
| `FSMRecoveryPlan` | 接口 | <code>interface FSMRecoveryPlan</code> | FSM Recovery Plan 的字段契约；完整字段见下表。 |
| `FSMRecoveryPolicySpec` | 接口 | <code>interface FSMRecoveryPolicySpec</code> | FSM Recovery Policy Spec 的字段契约；完整字段见下表。 |
| `FSMRecoverySnapshot` | 接口 | <code>interface FSMRecoverySnapshot</code> | FSM Recovery Snapshot 的字段契约；完整字段见下表。 |
| `FSMRecoveryStateTargets` | 接口 | <code>interface FSMRecoveryStateTargets</code> | FSM Recovery State Targets 的字段契约；完整字段见下表。 |
| `FSMAnomalyCategory` | 类型 | <code>type FSMAnomalyCategory = RecoveryCategory</code> | FSM Anomaly Category 的公共类型别名。 |
| `FSMAnomalySource` | 类型 | <code>type FSMAnomalySource = RecoveryModule</code> | FSM Anomaly Source 的公共类型别名。 |
| `FSMCircuitStatus` | 类型 | <code>type FSMCircuitStatus = 'closed' &#124; 'open' &#124; 'half_open'</code> | FSM Circuit Status 的公共类型别名。 |
| `FSMRecoveryAction` | 类型 | <code>type FSMRecoveryAction = (typeof FSM_RECOVERY_ACTIONS)[number]</code> | FSM Recovery Action 的公共类型别名。 |
| `FSMSideEffectState` | 类型 | <code>type FSMSideEffectState = RecoverySideEffectState</code> | FSM Side Effect State 的公共类型别名。 |

## `FSMAnomaly` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `category` | 属性 | <code>category: "unknown" &#124; "cancellation" &#124; "timeout" &#124; "validation" &#124; "policy_denied" &#124; "authentication" &#124; "authorization" &#124; "rate_limit" &#124; "transient_dependency" &#124; "permanent_dependency" &#124; "concurrency_conflict" &#124; "resource_exhausted" &#124; "tool_failure" &#124; "inference_failure" &#124; "memory_failure" &#124; "execution_failure" &#124; "storage_failure" &#124; "message_failure" &#124; "cache_failure" &#124; "invariant_violation"</code> | category 字段。 |
| `circuitKey` | 属性 | <code>circuitKey: string</code> | circuit Key 字段。 |
| `code` | 属性 | <code>code: string</code> | code 字段。 |
| `compensationAvailable` | 属性 | <code>compensationAvailable: boolean</code> | compensation Available 字段。 |
| `degradationAvailable` | 属性 | <code>degradationAvailable: boolean</code> | degradation Available 字段。 |
| `fallbackAvailable` | 属性 | <code>fallbackAvailable: boolean</code> | fallback Available 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | occurred At 字段。 |
| `reconciliationAvailable` | 属性 | <code>reconciliationAvailable: boolean</code> | reconciliation Available 字段。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | retryable 字段。 |
| `retryAfterMs` | 属性 | <code>retryAfterMs: number</code> | retry After Ms 字段。 |
| `sideEffectState` | 属性 | <code>sideEffectState: RecoverySideEffectState</code> | side Effect State 字段。 |
| `source` | 属性 | <code>source: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | source 字段。 |

## `FSMAnomalyClassificationInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `circuitKey` | 属性 | <code>circuitKey: string</code> | circuit Key 字段。 |
| `compensationAvailable` | 属性 | <code>compensationAvailable: boolean</code> | compensation Available 字段。 |
| `degradationAvailable` | 属性 | <code>degradationAvailable: boolean</code> | degradation Available 字段。 |
| `fallbackAvailable` | 属性 | <code>fallbackAvailable: boolean</code> | fallback Available 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | occurred At 字段。 |
| `reconciliationAvailable` | 属性 | <code>reconciliationAvailable: boolean</code> | reconciliation Available 字段。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | retryable 字段。 |
| `retryAfterMs` | 属性 | <code>retryAfterMs: number</code> | retry After Ms 字段。 |
| `sideEffectState` | 属性 | <code>sideEffectState: RecoverySideEffectState</code> | side Effect State 字段。 |
| `source` | 属性 | <code>source: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | source 字段。 |

## `FSMCircuitBreakerPolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `failureThreshold` | 属性 | <code>failureThreshold: number</code> | failure Threshold 字段。 |
| `halfOpenMaxAttempts` | 属性 | <code>halfOpenMaxAttempts: number</code> | half Open Max Attempts 字段。 |
| `resetTimeoutMs` | 属性 | <code>resetTimeoutMs: number</code> | reset Timeout Ms 字段。 |

## `FSMCircuitSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `consecutiveFailures` | 属性 | <code>consecutiveFailures: number</code> | consecutive Failures 字段。 |
| `halfOpenAttempts` | 属性 | <code>halfOpenAttempts: number</code> | half Open Attempts 字段。 |
| `openedAt` | 属性 | <code>openedAt: string</code> | opened At 字段。 |
| `status` | 属性 | <code>status: FSMCircuitStatus</code> | status 字段。 |

## `FSMRecoveryBackoffPolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `initialDelayMs` | 属性 | <code>initialDelayMs: number</code> | initial Delay Ms 字段。 |
| `jitterRatio` | 属性 | <code>jitterRatio: number</code> | jitter Ratio 字段。 |
| `maxDelayMs` | 属性 | <code>maxDelayMs: number</code> | max Delay Ms 字段。 |
| `multiplier` | 属性 | <code>multiplier: number</code> | multiplier 字段。 |

## `FSMRecoveryDecision` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `action` | 属性 | <code>action: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | action 字段。 |
| `afterCompensationAction` | 属性 | <code>afterCompensationAction: "fail" &#124; "human_review" &#124; "quarantine"</code> | after Compensation Action 字段。 |
| `afterCompensationState` | 属性 | <code>afterCompensationState: string</code> | after Compensation State 字段。 |
| `anomaly` | 属性 | <code>anomaly: FSMAnomaly</code> | anomaly 字段。 |
| `attempt` | 属性 | <code>attempt: number</code> | attempt 字段。 |
| `circuitKey` | 属性 | <code>circuitKey: string</code> | circuit Key 字段。 |
| `circuitStatus` | 属性 | <code>circuitStatus: FSMCircuitStatus</code> | circuit Status 字段。 |
| `decidedAt` | 属性 | <code>decidedAt: string</code> | decided At 字段。 |
| `delayMs` | 属性 | <code>delayMs: number</code> | delay Ms 字段。 |
| `fromState` | 属性 | <code>fromState: string</code> | from State 字段。 |
| `nextEligibleAt` | 属性 | <code>nextEligibleAt: string</code> | next Eligible At 字段。 |
| `quarantineState` | 属性 | <code>quarantineState: string</code> | quarantine State 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `resumeState` | 属性 | <code>resumeState: string</code> | resume State 字段。 |
| `totalAttempts` | 属性 | <code>totalAttempts: number</code> | total Attempts 字段。 |
| `transitionState` | 属性 | <code>transitionState: string</code> | transition State 字段。 |

## `FSMRecoveryPlan` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `decision` | 属性 | <code>decision: FSMRecoveryDecision</code> | decision 字段。 |
| `snapshot` | 属性 | <code>snapshot: FSMRecoverySnapshot</code> | snapshot 字段。 |

## `FSMRecoveryPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `afterCompensation` | 属性 | <code>afterCompensation: "fail" &#124; "human_review" &#124; "quarantine"</code> | after Compensation 字段。 |
| `backoff` | 属性 | <code>backoff: FSMRecoveryBackoffPolicy</code> | backoff 字段。 |
| `circuitBreaker` | 属性 | <code>circuitBreaker: FSMCircuitBreakerPolicy</code> | circuit Breaker 字段。 |
| `maxAttemptsPerState` | 属性 | <code>maxAttemptsPerState: number</code> | max Attempts Per State 字段。 |
| `maxElapsedMs` | 属性 | <code>maxElapsedMs: number</code> | max Elapsed Ms 字段。 |
| `maxTotalAttempts` | 属性 | <code>maxTotalAttempts: number</code> | max Total Attempts 字段。 |
| `nonRetryableCodes` | 属性 | <code>nonRetryableCodes: string[]</code> | non Retryable Codes 字段。 |
| `onExhausted` | 属性 | <code>onExhausted: "fail" &#124; "human_review" &#124; "quarantine"</code> | on Exhausted 字段。 |
| `retryableCategories` | 属性 | <code>retryableCategories: ("unknown" &#124; "cancellation" &#124; "timeout" &#124; "validation" &#124; "policy_denied" &#124; "authentication" &#124; "authorization" &#124; "rate_limit" &#124; "transient_dependency" &#124; "permanent_dependency" &#124; "concurrency_conflict" &#124; "resource_exhausted" &#124; "tool_failure" &#124; "inference_failure" &#124; "memory_failure" &#124; "execution_failure" &#124; "storage_failure" &#124; "message_failure" &#124; "cache_failure" &#124; "invariant_violation")[]</code> | retryable Categories 字段。 |
| `stateTargets` | 属性 | <code>stateTargets: FSMRecoveryStateTargets</code> | state Targets 字段。 |

## `FSMRecoverySnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attemptsByState` | 属性 | <code>attemptsByState: Record&lt;string, number&gt;</code> | attempts By State 字段。 |
| `circuits` | 属性 | <code>circuits: Record&lt;string, FSMCircuitSnapshot&gt;</code> | circuits 字段。 |
| `lastAction` | 属性 | <code>lastAction: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | last Action 字段。 |
| `lastAnomalyId` | 属性 | <code>lastAnomalyId: string</code> | last Anomaly Id 字段。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | started At 字段。 |
| `totalAttempts` | 属性 | <code>totalAttempts: number</code> | total Attempts 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `FSMRecoveryStateTargets` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancelled` | 属性 | <code>cancelled: string</code> | cancelled 字段。 |
| `compensating` | 属性 | <code>compensating: string</code> | compensating 字段。 |
| `failed` | 属性 | <code>failed: string</code> | failed 字段。 |
| `humanReview` | 属性 | <code>humanReview: string</code> | human Review 字段。 |
| `quarantined` | 属性 | <code>quarantined: string</code> | quarantined 字段。 |
| `recovering` | 属性 | <code>recovering: string</code> | recovering 字段。 |
