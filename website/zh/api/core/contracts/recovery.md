# `@codesoul-co/hypha-core` / `contracts/recovery`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)
- 导出数: **23**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `defaultRecoveryConvergencePolicy` | 常量 | <code>const defaultRecoveryConvergencePolicy: RecoveryConvergencePolicy</code> | 由 `contracts/recovery` 模块导出的 default Recovery Convergence Policy 常量。 |
| `RECOVERY_CATEGORIES` | 常量 | <code>const RECOVERY_CATEGORIES: readonly ["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"]</code> | 由 `contracts/recovery` 模块导出的 RECOVERY CATEGORIES 常量。 |
| `RECOVERY_MODULES` | 常量 | <code>const RECOVERY_MODULES: readonly ["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"]</code> | 由 `contracts/recovery` 模块导出的 RECOVERY MODULES 常量。 |
| `RECOVERY_STRATEGIES` | 常量 | <code>const RECOVERY_STRATEGIES: readonly ["retry", "reconcile", "fallback", "degrade", "compensate", "wait", "human_review", "quarantine", "fail", "cancel"]</code> | 由 `contracts/recovery` 模块导出的 RECOVERY STRATEGIES 常量。 |
| `recoveryEvidenceHash` | 函数 | <code>recoveryEvidenceHash(evidence: RecoveryEvidence): string</code> | recovery Evidence Hash 的公开运行时操作。 |
| `recoveryFailureFingerprint` | 函数 | <code>recoveryFailureFingerprint(failure: RecoveryFailure): string</code> | recovery Failure Fingerprint 的公开运行时操作。 |
| `recoveryKnowledgeKeyMatches` | 函数 | <code>recoveryKnowledgeKeyMatches(expected: RecoveryKnowledgeKey, actual: RecoveryKnowledgeKey): boolean</code> | recovery Knowledge Key Matches 的公开运行时操作。 |
| `recoveryKnowledgeScopeMatches` | 函数 | <code>recoveryKnowledgeScopeMatches(expected: RecoveryKnowledgeScope &#124; undefined, actual: RecoveryKnowledgeScope &#124; undefined): boolean</code> | recovery Knowledge Scope Matches 的公开运行时操作。 |
| `stableRecoveryHash` | 函数 | <code>stableRecoveryHash(value: unknown): string</code> | stable Recovery Hash 的公开运行时操作。 |
| `RecoveryAttemptRecord` | 接口 | <code>interface RecoveryAttemptRecord</code> | Recovery Attempt Record 的字段契约；完整字段见下表。 |
| `RecoveryCaseSnapshot` | 接口 | <code>interface RecoveryCaseSnapshot</code> | Recovery Case Snapshot 的字段契约；完整字段见下表。 |
| `RecoveryConvergencePolicy` | 接口 | <code>interface RecoveryConvergencePolicy</code> | Recovery Convergence Policy 的字段契约；完整字段见下表。 |
| `RecoveryEvidence` | 接口 | <code>interface RecoveryEvidence</code> | Facts that can prove whether a recovery attempt changed the underlying state. Callers should prefer stable revisions, receipts, checksums, and provider state over human-readable messages. |
| `RecoveryFailure` | 接口 | <code>interface RecoveryFailure</code> | Recovery Failure 的字段契约；完整字段见下表。 |
| `RecoveryKnowledge` | 接口 | <code>interface RecoveryKnowledge</code> | Recovery Knowledge 的字段契约；完整字段见下表。 |
| `RecoveryKnowledgeKey` | 接口 | <code>interface RecoveryKnowledgeKey</code> | Recovery Knowledge Key 的字段契约；完整字段见下表。 |
| `RecoveryKnowledgePort` | 接口 | <code>interface RecoveryKnowledgePort</code> | Cache implementations are hints only. The supervisor must revalidate a hit. |
| `RecoveryKnowledgeScope` | 接口 | <code>interface RecoveryKnowledgeScope</code> | Recovery Knowledge Scope 的字段契约；完整字段见下表。 |
| `RecoveryCaseStatus` | 类型 | <code>type RecoveryCaseStatus = 'active' &#124; 'suspended' &#124; 'recovered' &#124; 'degraded' &#124; 'compensated' &#124; 'quarantined' &#124; 'failed' &#124; 'cancelled'</code> | Recovery Case Status 的公共类型别名。 |
| `RecoveryCategory` | 类型 | <code>type RecoveryCategory = (typeof RECOVERY_CATEGORIES)[number]</code> | Recovery Category 的公共类型别名。 |
| `RecoveryModule` | 类型 | <code>type RecoveryModule = (typeof RECOVERY_MODULES)[number]</code> | Recovery Module 的公共类型别名。 |
| `RecoverySideEffectState` | 类型 | <code>type RecoverySideEffectState = 'none' &#124; 'not_started' &#124; 'committed' &#124; 'unknown'</code> | Recovery Side Effect State 的公共类型别名。 |
| `RecoveryStrategy` | 类型 | <code>type RecoveryStrategy = (typeof RECOVERY_STRATEGIES)[number]</code> | Recovery Strategy 的公共类型别名。 |

## `RecoveryAttemptRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `cycle` | 属性 | <code>cycle: number</code> | cycle 字段。 |
| `errorCode` | 属性 | <code>errorCode: string</code> | error Code 字段。 |
| `evidenceAfterHash` | 属性 | <code>evidenceAfterHash: string</code> | evidence After Hash 字段。 |
| `evidenceBeforeHash` | 属性 | <code>evidenceBeforeHash: string</code> | evidence Before Hash 字段。 |
| `fingerprint` | 属性 | <code>fingerprint: string</code> | fingerprint 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `module` | 属性 | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | module 字段。 |
| `participantId` | 属性 | <code>participantId: string</code> | participant Id 字段。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | started At 字段。 |
| `status` | 属性 | <code>status: "failed" &#124; "started" &#124; "succeeded" &#124; "no_progress" &#124; "skipped"</code> | status 字段。 |
| `strategy` | 属性 | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | strategy 字段。 |

## `RecoveryCaseSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: RecoveryAttemptRecord[]</code> | attempts 字段。 |
| `cycles` | 属性 | <code>cycles: number</code> | cycles 字段。 |
| `degradedParticipants` | 属性 | <code>degradedParticipants: string[]</code> | degraded Participants 字段。 |
| `fsmState` | 属性 | <code>fsmState: string</code> | fsm State 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `lastEvidenceHash` | 属性 | <code>lastEvidenceHash: string</code> | last Evidence Hash 字段。 |
| `lastFailure` | 属性 | <code>lastFailure: RecoveryFailure</code> | last Failure 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `noProgressCycles` | 属性 | <code>noProgressCycles: number</code> | no Progress Cycles 字段。 |
| `openedAt` | 属性 | <code>openedAt: string</code> | opened At 字段。 |
| `outputs` | 属性 | <code>outputs: Record&lt;string, unknown&gt;</code> | outputs 字段。 |
| `rootFingerprint` | 属性 | <code>rootFingerprint: string</code> | root Fingerprint 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `status` | 属性 | <code>status: RecoveryCaseStatus</code> | status 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `RecoveryConvergencePolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxCycles` | 属性 | <code>maxCycles: number</code> | max Cycles 字段。 |
| `maxElapsedMs` | 属性 | <code>maxElapsedMs: number</code> | max Elapsed Ms 字段。 |
| `maxNoProgressCycles` | 属性 | <code>maxNoProgressCycles: number</code> | max No Progress Cycles 字段。 |
| `maxSameStrategyAttempts` | 属性 | <code>maxSameStrategyAttempts: number</code> | max Same Strategy Attempts 字段。 |
| `onExhausted` | 属性 | <code>onExhausted: "fail" &#124; "human_review" &#124; "quarantine"</code> | on Exhausted 字段。 |
| `onNoProgress` | 属性 | <code>onNoProgress: "fail" &#124; "human_review" &#124; "fallback" &#124; "degrade" &#124; "quarantine"</code> | on No Progress 字段。 |

## `RecoveryEvidence` 契约字段

Facts that can prove whether a recovery attempt changed the underlying state. Callers should prefer stable revisions, receipts, checksums, and provider state over human-readable messages.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dependencyKey` | 属性 | <code>dependencyKey: string</code> | dependency Key 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `markers` | 属性 | <code>markers: Record&lt;string, string &#124; number &#124; boolean&gt;</code> | markers 字段。 |
| `observedAt` | 属性 | <code>observedAt: string</code> | observed At 字段。 |
| `operationKey` | 属性 | <code>operationKey: string</code> | operation Key 字段。 |
| `outputHash` | 属性 | <code>outputHash: string</code> | output Hash 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `receiptStatus` | 属性 | <code>receiptStatus: "unknown" &#124; "accepted" &#124; "completed" &#124; "rejected"</code> | receipt Status 字段。 |
| `revision` | 属性 | <code>revision: string &#124; number</code> | revision 字段。 |
| `sourceHashes` | 属性 | <code>sourceHashes: Record&lt;string, string&gt;</code> | source Hashes 字段。 |
| `specRevision` | 属性 | <code>specRevision: string</code> | spec Revision 字段。 |
| `state` | 属性 | <code>state: string</code> | state 字段。 |

## `RecoveryFailure` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `category` | 属性 | <code>category: "unknown" &#124; "cancellation" &#124; "timeout" &#124; "validation" &#124; "policy_denied" &#124; "authentication" &#124; "authorization" &#124; "rate_limit" &#124; "transient_dependency" &#124; "permanent_dependency" &#124; "concurrency_conflict" &#124; "resource_exhausted" &#124; "tool_failure" &#124; "inference_failure" &#124; "memory_failure" &#124; "execution_failure" &#124; "storage_failure" &#124; "message_failure" &#124; "cache_failure" &#124; "invariant_violation"</code> | category 字段。 |
| `circuitKey` | 属性 | <code>circuitKey: string</code> | circuit Key 字段。 |
| `code` | 属性 | <code>code: string</code> | code 字段。 |
| `compensationAvailable` | 属性 | <code>compensationAvailable: boolean</code> | compensation Available 字段。 |
| `evidence` | 属性 | <code>evidence: RecoveryEvidence</code> | evidence 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `module` | 属性 | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | module 字段。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | occurred At 字段。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | retryable 字段。 |
| `retryAfterMs` | 属性 | <code>retryAfterMs: number</code> | retry After Ms 字段。 |
| `rootCauseKey` | 属性 | <code>rootCauseKey: string</code> | root Cause Key 字段。 |
| `sideEffectState` | 属性 | <code>sideEffectState: RecoverySideEffectState</code> | side Effect State 字段。 |

## `RecoveryKnowledge` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evidenceHash` | 属性 | <code>evidenceHash: string</code> | evidence Hash 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `key` | 属性 | <code>key: RecoveryKnowledgeKey</code> | key 字段。 |
| `learnedAt` | 属性 | <code>learnedAt: string</code> | learned At 字段。 |
| `outcome` | 属性 | <code>outcome: "degraded" &#124; "failed" &#124; "recovered" &#124; "compensated"</code> | outcome 字段。 |
| `strategy` | 属性 | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | strategy 字段。 |
| `validation` | 属性 | <code>validation: { status: "verified" &#124; "negative"; sourceEventId?: string; proof?: Record&lt;string, unknown&gt;; }</code> | validation 字段。 |

## `RecoveryKnowledgeKey` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fingerprint` | 属性 | <code>fingerprint: string</code> | fingerprint 字段。 |
| `participantId` | 属性 | <code>participantId: string</code> | participant Id 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `scope` | 属性 | <code>scope: RecoveryKnowledgeScope</code> | New runtime writes always include scope. Absence is accepted only for legacy Provider migration and must not be persisted by strict adapters. |
| `specRevision` | 属性 | <code>specRevision: string</code> | spec Revision 字段。 |

## `RecoveryKnowledgePort` 契约字段

Cache implementations are hints only. The supervisor must revalidate a hit.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(key: RecoveryKnowledgeKey): Promise&lt;RecoveryKnowledge &#124; null&gt;</code> | 读取 get。 |
| `invalidate` | 方法 | <code>invalidate(key: RecoveryKnowledgeKey, reason: string): Promise&lt;void&gt;</code> | invalidate 的公开运行时操作。 |
| `put` | 方法 | <code>put(knowledge: RecoveryKnowledge): Promise&lt;void&gt;</code> | put 的公开运行时操作。 |

## `RecoveryKnowledgeScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `domainPackId` | 属性 | <code>domainPackId: string</code> | domain Pack Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |
