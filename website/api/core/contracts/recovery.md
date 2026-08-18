# `@codesoul-co/hypha-core` / `contracts/recovery`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)
- Exports: **23**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `defaultRecoveryConvergencePolicy` | constant | <code>const defaultRecoveryConvergencePolicy: RecoveryConvergencePolicy</code> | default Recovery Convergence Policy constant exported by the `contracts/recovery` module. |
| `RECOVERY_CATEGORIES` | constant | <code>const RECOVERY_CATEGORIES: readonly ["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"]</code> | RECOVERY CATEGORIES constant exported by the `contracts/recovery` module. |
| `RECOVERY_MODULES` | constant | <code>const RECOVERY_MODULES: readonly ["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"]</code> | RECOVERY MODULES constant exported by the `contracts/recovery` module. |
| `RECOVERY_STRATEGIES` | constant | <code>const RECOVERY_STRATEGIES: readonly ["retry", "reconcile", "fallback", "degrade", "compensate", "wait", "human_review", "quarantine", "fail", "cancel"]</code> | RECOVERY STRATEGIES constant exported by the `contracts/recovery` module. |
| `recoveryEvidenceHash` | function | <code>recoveryEvidenceHash(evidence: RecoveryEvidence): string</code> | Public runtime operation for recovery Evidence Hash. |
| `recoveryFailureFingerprint` | function | <code>recoveryFailureFingerprint(failure: RecoveryFailure): string</code> | Public runtime operation for recovery Failure Fingerprint. |
| `recoveryKnowledgeKeyMatches` | function | <code>recoveryKnowledgeKeyMatches(expected: RecoveryKnowledgeKey, actual: RecoveryKnowledgeKey): boolean</code> | Public runtime operation for recovery Knowledge Key Matches. |
| `recoveryKnowledgeScopeMatches` | function | <code>recoveryKnowledgeScopeMatches(expected: RecoveryKnowledgeScope &#124; undefined, actual: RecoveryKnowledgeScope &#124; undefined): boolean</code> | Public runtime operation for recovery Knowledge Scope Matches. |
| `stableRecoveryHash` | function | <code>stableRecoveryHash(value: unknown): string</code> | Public runtime operation for stable Recovery Hash. |
| `RecoveryAttemptRecord` | interface | <code>interface RecoveryAttemptRecord</code> | Field contract for Recovery Attempt Record; see all contract members below. |
| `RecoveryCaseSnapshot` | interface | <code>interface RecoveryCaseSnapshot</code> | Field contract for Recovery Case Snapshot; see all contract members below. |
| `RecoveryConvergencePolicy` | interface | <code>interface RecoveryConvergencePolicy</code> | Field contract for Recovery Convergence Policy; see all contract members below. |
| `RecoveryEvidence` | interface | <code>interface RecoveryEvidence</code> | Facts that can prove whether a recovery attempt changed the underlying state. Callers should prefer stable revisions, receipts, checksums, and provider state over human-readable messages. |
| `RecoveryFailure` | interface | <code>interface RecoveryFailure</code> | Field contract for Recovery Failure; see all contract members below. |
| `RecoveryKnowledge` | interface | <code>interface RecoveryKnowledge</code> | Field contract for Recovery Knowledge; see all contract members below. |
| `RecoveryKnowledgeKey` | interface | <code>interface RecoveryKnowledgeKey</code> | Field contract for Recovery Knowledge Key; see all contract members below. |
| `RecoveryKnowledgePort` | interface | <code>interface RecoveryKnowledgePort</code> | Cache implementations are hints only. The supervisor must revalidate a hit. |
| `RecoveryKnowledgeScope` | interface | <code>interface RecoveryKnowledgeScope</code> | Field contract for Recovery Knowledge Scope; see all contract members below. |
| `RecoveryCaseStatus` | type | <code>type RecoveryCaseStatus = 'active' &#124; 'suspended' &#124; 'recovered' &#124; 'degraded' &#124; 'compensated' &#124; 'quarantined' &#124; 'failed' &#124; 'cancelled'</code> | Public type alias for Recovery Case Status. |
| `RecoveryCategory` | type | <code>type RecoveryCategory = (typeof RECOVERY_CATEGORIES)[number]</code> | Public type alias for Recovery Category. |
| `RecoveryModule` | type | <code>type RecoveryModule = (typeof RECOVERY_MODULES)[number]</code> | Public type alias for Recovery Module. |
| `RecoverySideEffectState` | type | <code>type RecoverySideEffectState = 'none' &#124; 'not_started' &#124; 'committed' &#124; 'unknown'</code> | Public type alias for Recovery Side Effect State. |
| `RecoveryStrategy` | type | <code>type RecoveryStrategy = (typeof RECOVERY_STRATEGIES)[number]</code> | Public type alias for Recovery Strategy. |

## `RecoveryAttemptRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `cycle` | property | <code>cycle: number</code> | Public cycle property. |
| `errorCode` | property | <code>errorCode: string</code> | Public error Code property. |
| `evidenceAfterHash` | property | <code>evidenceAfterHash: string</code> | Public evidence After Hash property. |
| `evidenceBeforeHash` | property | <code>evidenceBeforeHash: string</code> | Public evidence Before Hash property. |
| `fingerprint` | property | <code>fingerprint: string</code> | Public fingerprint property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `module` | property | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | Public module property. |
| `participantId` | property | <code>participantId: string</code> | Public participant Id property. |
| `startedAt` | property | <code>startedAt: string</code> | Public started At property. |
| `status` | property | <code>status: "failed" &#124; "started" &#124; "succeeded" &#124; "no_progress" &#124; "skipped"</code> | Public status property. |
| `strategy` | property | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public strategy property. |

## `RecoveryCaseSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: RecoveryAttemptRecord[]</code> | Public attempts property. |
| `cycles` | property | <code>cycles: number</code> | Public cycles property. |
| `degradedParticipants` | property | <code>degradedParticipants: string[]</code> | Public degraded Participants property. |
| `fsmState` | property | <code>fsmState: string</code> | Public fsm State property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `lastEvidenceHash` | property | <code>lastEvidenceHash: string</code> | Public last Evidence Hash property. |
| `lastFailure` | property | <code>lastFailure: RecoveryFailure</code> | Public last Failure property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `noProgressCycles` | property | <code>noProgressCycles: number</code> | Public no Progress Cycles property. |
| `openedAt` | property | <code>openedAt: string</code> | Public opened At property. |
| `outputs` | property | <code>outputs: Record&lt;string, unknown&gt;</code> | Public outputs property. |
| `rootFingerprint` | property | <code>rootFingerprint: string</code> | Public root Fingerprint property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `status` | property | <code>status: RecoveryCaseStatus</code> | Public status property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `RecoveryConvergencePolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxCycles` | property | <code>maxCycles: number</code> | Public max Cycles property. |
| `maxElapsedMs` | property | <code>maxElapsedMs: number</code> | Public max Elapsed Ms property. |
| `maxNoProgressCycles` | property | <code>maxNoProgressCycles: number</code> | Public max No Progress Cycles property. |
| `maxSameStrategyAttempts` | property | <code>maxSameStrategyAttempts: number</code> | Public max Same Strategy Attempts property. |
| `onExhausted` | property | <code>onExhausted: "fail" &#124; "human_review" &#124; "quarantine"</code> | Public on Exhausted property. |
| `onNoProgress` | property | <code>onNoProgress: "fail" &#124; "human_review" &#124; "fallback" &#124; "degrade" &#124; "quarantine"</code> | Public on No Progress property. |

## `RecoveryEvidence` contract members

Facts that can prove whether a recovery attempt changed the underlying state. Callers should prefer stable revisions, receipts, checksums, and provider state over human-readable messages.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dependencyKey` | property | <code>dependencyKey: string</code> | Public dependency Key property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `markers` | property | <code>markers: Record&lt;string, string &#124; number &#124; boolean&gt;</code> | Public markers property. |
| `observedAt` | property | <code>observedAt: string</code> | Public observed At property. |
| `operationKey` | property | <code>operationKey: string</code> | Public operation Key property. |
| `outputHash` | property | <code>outputHash: string</code> | Public output Hash property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `receiptStatus` | property | <code>receiptStatus: "unknown" &#124; "accepted" &#124; "completed" &#124; "rejected"</code> | Public receipt Status property. |
| `revision` | property | <code>revision: string &#124; number</code> | Public revision property. |
| `sourceHashes` | property | <code>sourceHashes: Record&lt;string, string&gt;</code> | Public source Hashes property. |
| `specRevision` | property | <code>specRevision: string</code> | Public spec Revision property. |
| `state` | property | <code>state: string</code> | Public state property. |

## `RecoveryFailure` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `category` | property | <code>category: "unknown" &#124; "cancellation" &#124; "timeout" &#124; "validation" &#124; "policy_denied" &#124; "authentication" &#124; "authorization" &#124; "rate_limit" &#124; "transient_dependency" &#124; "permanent_dependency" &#124; "concurrency_conflict" &#124; "resource_exhausted" &#124; "tool_failure" &#124; "inference_failure" &#124; "memory_failure" &#124; "execution_failure" &#124; "storage_failure" &#124; "message_failure" &#124; "cache_failure" &#124; "invariant_violation"</code> | Public category property. |
| `circuitKey` | property | <code>circuitKey: string</code> | Public circuit Key property. |
| `code` | property | <code>code: string</code> | Public code property. |
| `compensationAvailable` | property | <code>compensationAvailable: boolean</code> | Public compensation Available property. |
| `evidence` | property | <code>evidence: RecoveryEvidence</code> | Public evidence property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `module` | property | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | Public module property. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public occurred At property. |
| `retryable` | property | <code>retryable: boolean</code> | Public retryable property. |
| `retryAfterMs` | property | <code>retryAfterMs: number</code> | Public retry After Ms property. |
| `rootCauseKey` | property | <code>rootCauseKey: string</code> | Public root Cause Key property. |
| `sideEffectState` | property | <code>sideEffectState: RecoverySideEffectState</code> | Public side Effect State property. |

## `RecoveryKnowledge` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evidenceHash` | property | <code>evidenceHash: string</code> | Public evidence Hash property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `key` | property | <code>key: RecoveryKnowledgeKey</code> | Public key property. |
| `learnedAt` | property | <code>learnedAt: string</code> | Public learned At property. |
| `outcome` | property | <code>outcome: "degraded" &#124; "failed" &#124; "recovered" &#124; "compensated"</code> | Public outcome property. |
| `strategy` | property | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public strategy property. |
| `validation` | property | <code>validation: { status: "verified" &#124; "negative"; sourceEventId?: string; proof?: Record&lt;string, unknown&gt;; }</code> | Public validation property. |

## `RecoveryKnowledgeKey` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fingerprint` | property | <code>fingerprint: string</code> | Public fingerprint property. |
| `participantId` | property | <code>participantId: string</code> | Public participant Id property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `scope` | property | <code>scope: RecoveryKnowledgeScope</code> | New runtime writes always include scope. Absence is accepted only for legacy Provider migration and must not be persisted by strict adapters. |
| `specRevision` | property | <code>specRevision: string</code> | Public spec Revision property. |

## `RecoveryKnowledgePort` contract members

Cache implementations are hints only. The supervisor must revalidate a hit.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(key: RecoveryKnowledgeKey): Promise&lt;RecoveryKnowledge &#124; null&gt;</code> | Gets get at this module boundary. |
| `invalidate` | method | <code>invalidate(key: RecoveryKnowledgeKey, reason: string): Promise&lt;void&gt;</code> | Public runtime operation for invalidate. |
| `put` | method | <code>put(knowledge: RecoveryKnowledge): Promise&lt;void&gt;</code> | Public runtime operation for put. |

## `RecoveryKnowledgeScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `domainPackId` | property | <code>domainPackId: string</code> | Public domain Pack Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |
