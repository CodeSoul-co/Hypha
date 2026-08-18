# `@codesoul-co/hypha-memory` / `bounded-recovery`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/bounded-recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/bounded-recovery.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createMemoryFailureFingerprint` | function | <code>createMemoryFailureFingerprint(failure: RecoveryFailure): string</code> | Creates Memory Failure Fingerprint at this module boundary. |
| `resolveBoundedMemoryRecovery` | function | <code>resolveBoundedMemoryRecovery(failure: RecoveryFailure, budget: MemoryRecoveryBudget): BoundedMemoryRecoveryOutcome</code> | Resolves Bounded Memory Recovery at this module boundary. |
| `BoundedMemoryRecoveryOutcome` | interface | <code>interface BoundedMemoryRecoveryOutcome</code> | Field contract for Bounded Memory Recovery Outcome; see all contract members below. |
| `MemoryRecoveryBudget` | interface | <code>interface MemoryRecoveryBudget</code> | Field contract for Memory Recovery Budget; see all contract members below. |
| `MemoryRunRecoveryState` | type | <code>type MemoryRunRecoveryState = 'degraded' &#124; 'waiting' &#124; 'review' &#124; 'quarantined' &#124; 'failed'</code> | Public type alias for Memory Run Recovery State. |

## `BoundedMemoryRecoveryOutcome` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `boundedEmptyResultAllowed` | property | <code>boundedEmptyResultAllowed: boolean</code> | Public bounded Empty Result Allowed property. |
| `failureFingerprint` | property | <code>failureFingerprint: string</code> | Public failure Fingerprint property. |
| `nextAttempt` | property | <code>nextAttempt: number</code> | Public next Attempt property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `retryAllowed` | property | <code>retryAllowed: boolean</code> | Public retry Allowed property. |
| `state` | property | <code>state: MemoryRunRecoveryState</code> | Public state property. |
| `strategy` | property | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public strategy property. |

## `MemoryRecoveryBudget` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attemptsUsed` | property | <code>attemptsUsed: number</code> | Public attempts Used property. |
| `deadline` | property | <code>deadline: string</code> | Public deadline property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `now` | property | <code>now: string</code> | Public now property. |
| `seenFailureFingerprints` | property | <code>seenFailureFingerprints: string[]</code> | Public seen Failure Fingerprints property. |
