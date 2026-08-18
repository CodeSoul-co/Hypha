# `@codesoul-co/hypha-core` / `contracts/recovery`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)
- Exports: **23**

## Using this module

Use the Recovery module for declaring and runtime-validating contracts. It exports 4 constants, 5 functions, 9 interfaces, 5 types.

### Import from the package entrypoint

```ts
import {
  defaultRecoveryConvergencePolicy,
  RECOVERY_CATEGORIES,
  RECOVERY_MODULES,
  RECOVERY_STRATEGIES,
  recoveryEvidenceHash,
  recoveryFailureFingerprint,
  recoveryKnowledgeKeyMatches,
  recoveryKnowledgeScopeMatches,
} from '@codesoul-co/hypha-core';

import type {
  RecoveryAttemptRecord,
  RecoveryCaseSnapshot,
  RecoveryConvergencePolicy,
  RecoveryEvidence,
  RecoveryFailure,
  RecoveryKnowledge,
  RecoveryKnowledgeKey,
  RecoveryKnowledgePort,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 14 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 5 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 4 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `defaultRecoveryConvergencePolicy` | constant | <code>const defaultRecoveryConvergencePolicy: RecoveryConvergencePolicy</code> | Default Recovery Convergence Policy constant exported by the `contracts/recovery` module. |
| `RECOVERY_CATEGORIES` | constant | <code>const RECOVERY_CATEGORIES: readonly ["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"]</code> | RECOVERY CATEGORIES constant exported by the `contracts/recovery` module. |
| `RECOVERY_MODULES` | constant | <code>const RECOVERY_MODULES: readonly ["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"]</code> | RECOVERY MODULES constant exported by the `contracts/recovery` module. |
| `RECOVERY_STRATEGIES` | constant | <code>const RECOVERY_STRATEGIES: readonly ["retry", "reconcile", "fallback", "degrade", "compensate", "wait", "human_review", "quarantine", "fail", "cancel"]</code> | RECOVERY STRATEGIES constant exported by the `contracts/recovery` module. |
| `recoveryEvidenceHash` | function | <code>recoveryEvidenceHash(evidence: RecoveryEvidence): string</code> | Recovery Evidence Hash function with 1 public call signature; parameters and return types are listed below. |
| `recoveryFailureFingerprint` | function | <code>recoveryFailureFingerprint(failure: RecoveryFailure): string</code> | Recovery Failure Fingerprint function with 1 public call signature; parameters and return types are listed below. |
| `recoveryKnowledgeKeyMatches` | function | <code>recoveryKnowledgeKeyMatches(expected: RecoveryKnowledgeKey, actual: RecoveryKnowledgeKey): boolean</code> | Recovery Knowledge Key Matches function with 1 public call signature; parameters and return types are listed below. |
| `recoveryKnowledgeScopeMatches` | function | <code>recoveryKnowledgeScopeMatches(expected: RecoveryKnowledgeScope &#124; undefined, actual: RecoveryKnowledgeScope &#124; undefined): boolean</code> | Recovery Knowledge Scope Matches function with 1 public call signature; parameters and return types are listed below. |
| `stableRecoveryHash` | function | <code>stableRecoveryHash(value: unknown): string</code> | Stable Recovery Hash function with 1 public call signature; parameters and return types are listed below. |
| `RecoveryAttemptRecord` | interface | <code>interface RecoveryAttemptRecord</code> | Recovery Attempt Record interface with 12 public fields or methods. |
| `RecoveryCaseSnapshot` | interface | <code>interface RecoveryCaseSnapshot</code> | Recovery Case Snapshot interface with 15 public fields or methods. |
| `RecoveryConvergencePolicy` | interface | <code>interface RecoveryConvergencePolicy</code> | Recovery Convergence Policy interface with 6 public fields or methods. |
| `RecoveryEvidence` | interface | <code>interface RecoveryEvidence</code> | Facts that can prove whether a recovery attempt changed the underlying state. Callers should prefer stable revisions, receipts, checksums, and provider state over human-readable messages. |
| `RecoveryFailure` | interface | <code>interface RecoveryFailure</code> | Recovery Failure interface with 14 public fields or methods. |
| `RecoveryKnowledge` | interface | <code>interface RecoveryKnowledge</code> | Recovery Knowledge interface with 7 public fields or methods. |
| `RecoveryKnowledgeKey` | interface | <code>interface RecoveryKnowledgeKey</code> | Recovery Knowledge Key interface with 6 public fields or methods. |
| `RecoveryKnowledgePort` | interface | <code>interface RecoveryKnowledgePort</code> | Cache implementations are hints only. The supervisor must revalidate a hit. |
| `RecoveryKnowledgeScope` | interface | <code>interface RecoveryKnowledgeScope</code> | Recovery Knowledge Scope interface with 6 public fields or methods. |
| `RecoveryCaseStatus` | type | <code>type RecoveryCaseStatus = 'active' &#124; 'suspended' &#124; 'recovered' &#124; 'degraded' &#124; 'compensated' &#124; 'quarantined' &#124; 'failed' &#124; 'cancelled'</code> | Public type alias for Recovery Case Status; the declaration contains its complete type expression. |
| `RecoveryCategory` | type | <code>type RecoveryCategory = (typeof RECOVERY_CATEGORIES)[number]</code> | Public type alias for Recovery Category; the declaration contains its complete type expression. |
| `RecoveryModule` | type | <code>type RecoveryModule = (typeof RECOVERY_MODULES)[number]</code> | Public type alias for Recovery Module; the declaration contains its complete type expression. |
| `RecoverySideEffectState` | type | <code>type RecoverySideEffectState = 'none' &#124; 'not_started' &#124; 'committed' &#124; 'unknown'</code> | Public type alias for Recovery Side Effect State; the declaration contains its complete type expression. |
| `RecoveryStrategy` | type | <code>type RecoveryStrategy = (typeof RECOVERY_STRATEGIES)[number]</code> | Public type alias for Recovery Strategy; the declaration contains its complete type expression. |

## `defaultRecoveryConvergencePolicy`

Default Recovery Convergence Policy constant exported by the `contracts/recovery` module.

- Kind: constant
- Import: `import { defaultRecoveryConvergencePolicy } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export declare const defaultRecoveryConvergencePolicy: RecoveryConvergencePolicy;
```

## `RECOVERY_CATEGORIES`

RECOVERY CATEGORIES constant exported by the `contracts/recovery` module.

- Kind: constant
- Import: `import { RECOVERY_CATEGORIES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export declare const RECOVERY_CATEGORIES: readonly ["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"];
```

## `RECOVERY_MODULES`

RECOVERY MODULES constant exported by the `contracts/recovery` module.

- Kind: constant
- Import: `import { RECOVERY_MODULES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export declare const RECOVERY_MODULES: readonly ["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"];
```

## `RECOVERY_STRATEGIES`

RECOVERY STRATEGIES constant exported by the `contracts/recovery` module.

- Kind: constant
- Import: `import { RECOVERY_STRATEGIES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export declare const RECOVERY_STRATEGIES: readonly ["retry", "reconcile", "fallback", "degrade", "compensate", "wait", "human_review", "quarantine", "fail", "cancel"];
```

## `recoveryEvidenceHash`

Recovery Evidence Hash function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { recoveryEvidenceHash } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export declare function recoveryEvidenceHash(evidence: RecoveryEvidence): string;
```

### Call signature

```text
recoveryEvidenceHash(evidence: RecoveryEvidence): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `evidence` | <code>RecoveryEvidence</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `recoveryFailureFingerprint`

Recovery Failure Fingerprint function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { recoveryFailureFingerprint } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export declare function recoveryFailureFingerprint(failure: RecoveryFailure): string;
```

### Call signature

```text
recoveryFailureFingerprint(failure: RecoveryFailure): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `failure` | <code>RecoveryFailure</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `recoveryKnowledgeKeyMatches`

Recovery Knowledge Key Matches function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { recoveryKnowledgeKeyMatches } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export declare function recoveryKnowledgeKeyMatches(expected: RecoveryKnowledgeKey, actual: RecoveryKnowledgeKey): boolean;
```

### Call signature

```text
recoveryKnowledgeKeyMatches(expected: RecoveryKnowledgeKey, actual: RecoveryKnowledgeKey): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `expected` | <code>RecoveryKnowledgeKey</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `actual` | <code>RecoveryKnowledgeKey</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `recoveryKnowledgeScopeMatches`

Recovery Knowledge Scope Matches function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { recoveryKnowledgeScopeMatches } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export declare function recoveryKnowledgeScopeMatches(expected: RecoveryKnowledgeScope | undefined, actual: RecoveryKnowledgeScope | undefined): boolean;
```

### Call signature

```text
recoveryKnowledgeScopeMatches(expected: RecoveryKnowledgeScope | undefined, actual: RecoveryKnowledgeScope | undefined): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `expected` | <code>RecoveryKnowledgeScope</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `actual` | <code>RecoveryKnowledgeScope</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `stableRecoveryHash`

Stable Recovery Hash function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { stableRecoveryHash } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export declare function stableRecoveryHash(value: unknown): string;
```

### Call signature

```text
stableRecoveryHash(value: unknown): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `RecoveryAttemptRecord`

Recovery Attempt Record interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { RecoveryAttemptRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export interface RecoveryAttemptRecord {
    cycle: number;
    participantId: string;
    module: RecoveryModule;
    strategy: RecoveryStrategy;
    fingerprint: string;
    startedAt: string;
    completedAt?: string;
    status: 'started' | 'succeeded' | 'failed' | 'no_progress' | 'skipped';
    evidenceBeforeHash: string;
    evidenceAfterHash?: string;
    errorCode?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `completedAt` | property | <code>completedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cycle` | property | <code>cycle: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `errorCode` | property | <code>errorCode?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evidenceAfterHash` | property | <code>evidenceAfterHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evidenceBeforeHash` | property | <code>evidenceBeforeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fingerprint` | property | <code>fingerprint: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `module` | property | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `participantId` | property | <code>participantId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startedAt` | property | <code>startedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "failed" &#124; "started" &#124; "succeeded" &#124; "no_progress" &#124; "skipped"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `strategy` | property | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RecoveryCaseSnapshot`

Recovery Case Snapshot interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { RecoveryCaseSnapshot } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export interface RecoveryCaseSnapshot {
    id: string;
    runId: string;
    fsmState: string;
    rootFingerprint: string;
    status: RecoveryCaseStatus;
    openedAt: string;
    updatedAt: string;
    cycles: number;
    noProgressCycles: number;
    lastEvidenceHash: string;
    lastFailure?: RecoveryFailure;
    attempts: RecoveryAttemptRecord[];
    outputs: Record<string, unknown>;
    degradedParticipants: string[];
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: RecoveryAttemptRecord[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cycles` | property | <code>cycles: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `degradedParticipants` | property | <code>degradedParticipants: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmState` | property | <code>fsmState: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastEvidenceHash` | property | <code>lastEvidenceHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastFailure` | property | <code>lastFailure?: RecoveryFailure</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `noProgressCycles` | property | <code>noProgressCycles: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `openedAt` | property | <code>openedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputs` | property | <code>outputs: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rootFingerprint` | property | <code>rootFingerprint: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: RecoveryCaseStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RecoveryConvergencePolicy`

Recovery Convergence Policy interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RecoveryConvergencePolicy } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export interface RecoveryConvergencePolicy {
    maxCycles: number;
    maxNoProgressCycles: number;
    maxSameStrategyAttempts: number;
    maxElapsedMs: number;
    onNoProgress: Extract<RecoveryStrategy, 'fallback' | 'degrade' | 'human_review' | 'quarantine' | 'fail'>;
    onExhausted: Extract<RecoveryStrategy, 'human_review' | 'quarantine' | 'fail'>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxCycles` | property | <code>maxCycles: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxElapsedMs` | property | <code>maxElapsedMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxNoProgressCycles` | property | <code>maxNoProgressCycles: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxSameStrategyAttempts` | property | <code>maxSameStrategyAttempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `onExhausted` | property | <code>onExhausted: "fail" &#124; "human_review" &#124; "quarantine"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `onNoProgress` | property | <code>onNoProgress: "fail" &#124; "human_review" &#124; "fallback" &#124; "degrade" &#124; "quarantine"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RecoveryEvidence`

Facts that can prove whether a recovery attempt changed the underlying state. Callers should prefer stable revisions, receipts, checksums, and provider state over human-readable messages.

- Kind: interface
- Import: `import type { RecoveryEvidence } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export interface RecoveryEvidence {
    observedAt: string;
    operationKey: string;
    dependencyKey?: string;
    state?: string;
    revision?: string | number;
    receiptStatus?: 'accepted' | 'completed' | 'rejected' | 'unknown';
    idempotencyKey?: string;
    inputHash?: string;
    outputHash?: string;
    policyRevision?: string;
    specRevision?: string;
    providerRevision?: string;
    sourceHashes?: Record<string, string>;
    markers?: Record<string, string | number | boolean | null>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dependencyKey` | property | <code>dependencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `markers` | property | <code>markers?: Record&lt;string, string &#124; number &#124; boolean&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observedAt` | property | <code>observedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationKey` | property | <code>operationKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputHash` | property | <code>outputHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `receiptStatus` | property | <code>receiptStatus?: "unknown" &#124; "accepted" &#124; "completed" &#124; "rejected"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string &#124; number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceHashes` | property | <code>sourceHashes?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `specRevision` | property | <code>specRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RecoveryFailure`

Recovery Failure interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { RecoveryFailure } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export interface RecoveryFailure {
    id: string;
    module: RecoveryModule;
    category: RecoveryCategory;
    code: string;
    message: string;
    occurredAt: string;
    retryable: boolean;
    sideEffectState: RecoverySideEffectState;
    compensationAvailable?: boolean;
    retryAfterMs?: number;
    circuitKey?: string;
    rootCauseKey?: string;
    evidence: RecoveryEvidence;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `category` | property | <code>category: "unknown" &#124; "cancellation" &#124; "timeout" &#124; "validation" &#124; "policy_denied" &#124; "authentication" &#124; "authorization" &#124; "rate_limit" &#124; "transient_dependency" &#124; "permanent_dependency" &#124; "concurrency_conflict" &#124; "resource_exhausted" &#124; "tool_failure" &#124; "inference_failure" &#124; "memory_failure" &#124; "execution_failure" &#124; "storage_failure" &#124; "message_failure" &#124; "cache_failure" &#124; "invariant_violation"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `circuitKey` | property | <code>circuitKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>code: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `compensationAvailable` | property | <code>compensationAvailable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evidence` | property | <code>evidence: RecoveryEvidence</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `module` | property | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>retryable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryAfterMs` | property | <code>retryAfterMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rootCauseKey` | property | <code>rootCauseKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectState` | property | <code>sideEffectState: RecoverySideEffectState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RecoveryKnowledge`

Recovery Knowledge interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RecoveryKnowledge } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export interface RecoveryKnowledge {
    key: RecoveryKnowledgeKey;
    strategy: RecoveryStrategy;
    outcome: Extract<RecoveryCaseStatus, 'recovered' | 'degraded' | 'compensated' | 'failed'>;
    evidenceHash: string;
    learnedAt: string;
    expiresAt?: string;
    validation: {
        status: 'verified' | 'negative';
        sourceEventId?: string;
        proof?: Record<string, unknown>;
    };
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evidenceHash` | property | <code>evidenceHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key: RecoveryKnowledgeKey</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `learnedAt` | property | <code>learnedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outcome` | property | <code>outcome: "degraded" &#124; "failed" &#124; "recovered" &#124; "compensated"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `strategy` | property | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validation` | property | <code>validation: { status: "verified" &#124; "negative"; sourceEventId?: string; proof?: Record&lt;string, unknown&gt;; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RecoveryKnowledgeKey`

Recovery Knowledge Key interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RecoveryKnowledgeKey } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export interface RecoveryKnowledgeKey {
    fingerprint: string;
    participantId: string;
    /**
     * New runtime writes always include scope. Absence is accepted only for
     * legacy Provider migration and must not be persisted by strict adapters.
     */
    scope?: RecoveryKnowledgeScope;
    policyRevision?: string;
    specRevision?: string;
    providerRevision?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fingerprint` | property | <code>fingerprint: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `participantId` | property | <code>participantId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope?: RecoveryKnowledgeScope</code> | New runtime writes always include scope. Absence is accepted only for legacy Provider migration and must not be persisted by strict adapters. |
| `specRevision` | property | <code>specRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RecoveryKnowledgePort`

Cache implementations are hints only. The supervisor must revalidate a hit.

- Kind: interface
- Import: `import type { RecoveryKnowledgePort } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export interface RecoveryKnowledgePort {
    get(key: RecoveryKnowledgeKey): Promise<RecoveryKnowledge | null>;
    put(knowledge: RecoveryKnowledge): Promise<void>;
    invalidate(key: RecoveryKnowledgeKey, reason: string): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(key: RecoveryKnowledgeKey): Promise&lt;RecoveryKnowledge &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidate` | method | <code>invalidate(key: RecoveryKnowledgeKey, reason: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(knowledge: RecoveryKnowledge): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RecoveryKnowledgeScope`

Recovery Knowledge Scope interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RecoveryKnowledgeScope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export interface RecoveryKnowledgeScope {
    tenantId?: string;
    userId: string;
    workspaceId?: string;
    sessionId?: string;
    agentId?: string;
    domainPackId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackId` | property | <code>domainPackId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RecoveryCaseStatus`

Public type alias for Recovery Case Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RecoveryCaseStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export type RecoveryCaseStatus = 'active' | 'suspended' | 'recovered' | 'degraded' | 'compensated' | 'quarantined' | 'failed' | 'cancelled';
```

## `RecoveryCategory`

Public type alias for Recovery Category; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RecoveryCategory } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export type RecoveryCategory = (typeof RECOVERY_CATEGORIES)[number];
```

## `RecoveryModule`

Public type alias for Recovery Module; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RecoveryModule } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export type RecoveryModule = (typeof RECOVERY_MODULES)[number];
```

## `RecoverySideEffectState`

Public type alias for Recovery Side Effect State; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RecoverySideEffectState } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export type RecoverySideEffectState = 'none' | 'not_started' | 'committed' | 'unknown';
```

## `RecoveryStrategy`

Public type alias for Recovery Strategy; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RecoveryStrategy } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### Declaration

```text
export type RecoveryStrategy = (typeof RECOVERY_STRATEGIES)[number];
```
