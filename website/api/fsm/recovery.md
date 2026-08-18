# `@codesoul-co/hypha-fsm` / `recovery`

- Package index: [`@codesoul-co/hypha-fsm`](/api/fsm)
- Source: [`packages/fsm/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)
- Exports: **27**

## Using this module

Use the Recovery module for handling bounded recovery, retry, or degradation. It exports 7 constants, 5 functions, 10 interfaces, 5 types.

### Import from the package entrypoint

```ts
import {
  defaultFSMRecoveryPolicy,
  FSM_ANOMALY_CATEGORIES,
  FSM_ANOMALY_SOURCES,
  FSM_RECOVERY_ACTIONS,
  fsmAnomalySchema,
  fsmRecoveryPolicySpecSchema,
  fsmRecoverySnapshotSchema,
  classifyFSMAnomaly,
} from '@codesoul-co/hypha-fsm';

import type {
  FSMAnomaly,
  FSMAnomalyClassificationInput,
  FSMCircuitBreakerPolicy,
  FSMCircuitSnapshot,
  FSMRecoveryBackoffPolicy,
  FSMRecoveryDecision,
  FSMRecoveryPlan,
  FSMRecoveryPolicySpec,
} from '@codesoul-co/hypha-fsm';

// The complete export list is documented below.
```

### Usage patterns

- Use the 15 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 5 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 7 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { fsmAnomalySchema } from '@codesoul-co/hypha-fsm';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = fsmAnomalySchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `defaultFSMRecoveryPolicy` | constant | <code>const defaultFSMRecoveryPolicy: FSMRecoveryPolicySpec</code> | Default FSM Recovery Policy constant exported by the `recovery` module. |
| `FSM_ANOMALY_CATEGORIES` | constant | <code>const FSM_ANOMALY_CATEGORIES: readonly ["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"]</code> | FSM ANOMALY CATEGORIES constant exported by the `recovery` module. |
| `FSM_ANOMALY_SOURCES` | constant | <code>const FSM_ANOMALY_SOURCES: readonly ["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"]</code> | FSM ANOMALY SOURCES constant exported by the `recovery` module. |
| `FSM_RECOVERY_ACTIONS` | constant | <code>const FSM_RECOVERY_ACTIONS: readonly ["retry", "reconcile", "fallback", "degrade", "wait", "compensate", "human_review", "quarantine", "fail", "cancel"]</code> | FSM RECOVERY ACTIONS constant exported by the `recovery` module. |
| `fsmAnomalySchema` | constant | <code>const fsmAnomalySchema: z.ZodObject&lt;{ id: z.ZodString; source: z.ZodEnum&lt;["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"]&gt;; category: z.ZodEnum&lt;["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted"...</code> | Runtime schema for FSM Anomaly. |
| `fsmRecoveryPolicySpecSchema` | constant | <code>const fsmRecoveryPolicySpecSchema: z.ZodObject&lt;{ maxAttemptsPerState: z.ZodNumber; maxTotalAttempts: z.ZodNumber; maxElapsedMs: z.ZodNumber; retryableCategories: z.ZodArray&lt;z.ZodEnum&lt;["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_fai...</code> | Runtime schema for FSM Recovery Policy Spec. |
| `fsmRecoverySnapshotSchema` | constant | <code>const fsmRecoverySnapshotSchema: z.ZodObject&lt;{ startedAt: z.ZodString; updatedAt: z.ZodString; totalAttempts: z.ZodNumber; attemptsByState: z.ZodRecord&lt;z.ZodString, z.ZodNumber&gt;; circuits: z.ZodRecord&lt;z.ZodString, z.ZodObject&lt;{ status: z.ZodEnum&lt;["closed", "open", "half_open"]&gt;; consecutiveFailures: z.ZodNumber; halfOpenAttempts: z.ZodNumber; openedAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { status...</code> | Runtime schema for FSM Recovery Snapshot. |
| `classifyFSMAnomaly` | function | <code>classifyFSMAnomaly(error: unknown, input: FSMAnomalyClassificationInput): FSMAnomaly</code> | Classify FSM Anomaly function with 1 public call signature; parameters and return types are listed below. |
| `computeFSMRecoveryDelay` | function | <code>computeFSMRecoveryDelay(policy: FSMRecoveryBackoffPolicy, attempt: number, seed: string): number</code> | Compute FSM Recovery Delay function with 1 public call signature; parameters and return types are listed below. |
| `createInitialFSMRecoverySnapshot` | function | <code>createInitialFSMRecoverySnapshot(now?: string): FSMRecoverySnapshot</code> | Create Initial FSM Recovery Snapshot function with 1 public call signature; parameters and return types are listed below. |
| `planFSMRecovery` | function | <code>planFSMRecovery(input: { anomaly: FSMAnomaly; stateId: string; policy?: FSMRecoveryPolicySpec; snapshot?: FSMRecoverySnapshot; now?: string; }): FSMRecoveryPlan</code> | Plan FSM Recovery function with 1 public call signature; parameters and return types are listed below. |
| `registerFSMRecoverySuccess` | function | <code>registerFSMRecoverySuccess(snapshot: FSMRecoverySnapshot, circuitKey: string, now?: string): FSMRecoverySnapshot</code> | Register FSM Recovery Success function with 1 public call signature; parameters and return types are listed below. |
| `FSMAnomaly` | interface | <code>interface FSMAnomaly</code> | FSM Anomaly interface with 15 public fields or methods. |
| `FSMAnomalyClassificationInput` | interface | <code>interface FSMAnomalyClassificationInput</code> | FSM Anomaly Classification Input interface with 12 public fields or methods. |
| `FSMCircuitBreakerPolicy` | interface | <code>interface FSMCircuitBreakerPolicy</code> | FSM Circuit Breaker Policy interface with 3 public fields or methods. |
| `FSMCircuitSnapshot` | interface | <code>interface FSMCircuitSnapshot</code> | FSM Circuit Snapshot interface with 4 public fields or methods. |
| `FSMRecoveryBackoffPolicy` | interface | <code>interface FSMRecoveryBackoffPolicy</code> | FSM Recovery Backoff Policy interface with 4 public fields or methods. |
| `FSMRecoveryDecision` | interface | <code>interface FSMRecoveryDecision</code> | FSM Recovery Decision interface with 16 public fields or methods. |
| `FSMRecoveryPlan` | interface | <code>interface FSMRecoveryPlan</code> | FSM Recovery Plan interface with 2 public fields or methods. |
| `FSMRecoveryPolicySpec` | interface | <code>interface FSMRecoveryPolicySpec</code> | FSM Recovery Policy Spec interface with 10 public fields or methods. |
| `FSMRecoverySnapshot` | interface | <code>interface FSMRecoverySnapshot</code> | FSM Recovery Snapshot interface with 7 public fields or methods. |
| `FSMRecoveryStateTargets` | interface | <code>interface FSMRecoveryStateTargets</code> | FSM Recovery State Targets interface with 6 public fields or methods. |
| `FSMAnomalyCategory` | type | <code>type FSMAnomalyCategory = RecoveryCategory</code> | Public type alias for FSM Anomaly Category; the declaration contains its complete type expression. |
| `FSMAnomalySource` | type | <code>type FSMAnomalySource = RecoveryModule</code> | Public type alias for FSM Anomaly Source; the declaration contains its complete type expression. |
| `FSMCircuitStatus` | type | <code>type FSMCircuitStatus = 'closed' &#124; 'open' &#124; 'half_open'</code> | Public type alias for FSM Circuit Status; the declaration contains its complete type expression. |
| `FSMRecoveryAction` | type | <code>type FSMRecoveryAction = (typeof FSM_RECOVERY_ACTIONS)[number]</code> | Public type alias for FSM Recovery Action; the declaration contains its complete type expression. |
| `FSMSideEffectState` | type | <code>type FSMSideEffectState = RecoverySideEffectState</code> | Public type alias for FSM Side Effect State; the declaration contains its complete type expression. |

## `defaultFSMRecoveryPolicy`

Default FSM Recovery Policy constant exported by the `recovery` module.

- Kind: constant
- Import: `import { defaultFSMRecoveryPolicy } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export declare const defaultFSMRecoveryPolicy: FSMRecoveryPolicySpec;
```

## `FSM_ANOMALY_CATEGORIES`

FSM ANOMALY CATEGORIES constant exported by the `recovery` module.

- Kind: constant
- Import: `import { FSM_ANOMALY_CATEGORIES } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export declare const FSM_ANOMALY_CATEGORIES: readonly ["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"];
```

## `FSM_ANOMALY_SOURCES`

FSM ANOMALY SOURCES constant exported by the `recovery` module.

- Kind: constant
- Import: `import { FSM_ANOMALY_SOURCES } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export declare const FSM_ANOMALY_SOURCES: readonly ["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"];
```

## `FSM_RECOVERY_ACTIONS`

FSM RECOVERY ACTIONS constant exported by the `recovery` module.

- Kind: constant
- Import: `import { FSM_RECOVERY_ACTIONS } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export declare const FSM_RECOVERY_ACTIONS: readonly ["retry", "reconcile", "fallback", "degrade", "wait", "compensate", "human_review", "quarantine", "fail", "cancel"];
```

## `fsmAnomalySchema`

Runtime schema for FSM Anomaly.

- Kind: constant
- Import: `import { fsmAnomalySchema } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export declare const fsmAnomalySchema: z.ZodObject<{ id: z.ZodString; source: z.ZodEnum<["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"]>; category: z.ZodEnum<["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"]>; code: z.ZodString; message: z.ZodString; occurredAt: z.ZodString; retryable: z.ZodOptional<z.ZodBoolean>; retryAfterMs: z.ZodOptional<z.ZodNumber>; circuitKey: z.ZodOptional<z.ZodString>; sideEffectState: z.ZodOptional<z.ZodEnum<["none", "not_started", "committed", "unknown"]>>; compensationAvailable: z.ZodOptional<z.ZodBoolean>; reconciliationAvailable: z.ZodOptional<z.ZodBoolean>; fallbackAvailable: z.ZodOptional<z.ZodBoolean>; degradationAvailable: z.ZodOptional<z.ZodBoolean>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { id: string; source: "fsm" | "inference" | "tool" | "memory" | "execution" | "mcp" | "workspace" | "storage" | "message_bus" | "cache" | "policy" | "domain" | "unknown"; category: "unknown" | "validation" | "policy_denied" | "authentication" | "authorization" | "rate_limit" | "timeout" | "transient_dependency" | "permanent_dependency" | "concurrency_conflict" | "resource_exhausted" | "tool_failure" | "inference_failure" | "memory_failure" | "execution_failure" | "storage_failure" | "message_failure" | "cache_failure" | "invariant_violation" | "cancellation"; code: string; message: string; occurredAt: string; retryable?: boolean | undefined; retryAfterMs?: number | undefined; circuitKey?: string | undefined; sideEffectState?: "unknown" | "none" | "not_started" | "committed" | undefined; compensationAvailable?: boolean | undefined; reconciliationAvailable?: boolean | undefined; fallbackAvailable?: boolean | undefined; degradationAvailable?: boolean | undefined; metadata?: Record<string, unknown> | undefined; }, { id: string; source: "fsm" | "inference" | "tool" | "memory" | "execution" | "mcp" | "workspace" | "storage" | "message_bus" | "cache" | "policy" | "domain" | "unknown"; category: "unknown" | "validation" | "policy_denied" | "authentication" | "authorization" | "rate_limit" | "timeout" | "transient_dependency" | "permanent_dependency" | "concurrency_conflict" | "resource_exhausted" | "tool_failure" | "inference_failure" | "memory_failure" | "execution_failure" | "storage_failure" | "message_failure" | "cache_failure" | "invariant_violation" | "cancellation"; code: string; message: string; occurredAt: string; retryable?: boolean | undefined; retryAfterMs?: number | undefined; circuitKey?: string | undefined; sideEffectState?: "unknown" | "none" | "not_started" | "committed" | undefined; compensationAvailable?: boolean | undefined; reconciliationAvailable?: boolean | undefined; fallbackAvailable?: boolean | undefined; degradationAvailable?: boolean | undefined; metadata?: Record<string, unknown> | undefined; }>;
```

## `fsmRecoveryPolicySpecSchema`

Runtime schema for FSM Recovery Policy Spec.

- Kind: constant
- Import: `import { fsmRecoveryPolicySpecSchema } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export declare const fsmRecoveryPolicySpecSchema: z.ZodObject<{ maxAttemptsPerState: z.ZodNumber; maxTotalAttempts: z.ZodNumber; maxElapsedMs: z.ZodNumber; retryableCategories: z.ZodArray<z.ZodEnum<["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"]>, "many">; nonRetryableCodes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; backoff: z.ZodObject<{ initialDelayMs: z.ZodNumber; maxDelayMs: z.ZodNumber; multiplier: z.ZodNumber; jitterRatio: z.ZodNumber; }, "strip", z.ZodTypeAny, { initialDelayMs: number; maxDelayMs: number; multiplier: number; jitterRatio: number; }, { initialDelayMs: number; maxDelayMs: number; multiplier: number; jitterRatio: number; }>; circuitBreaker: z.ZodObject<{ failureThreshold: z.ZodNumber; resetTimeoutMs: z.ZodNumber; halfOpenMaxAttempts: z.ZodNumber; }, "strip", z.ZodTypeAny, { failureThreshold: number; resetTimeoutMs: number; halfOpenMaxAttempts: number; }, { failureThreshold: number; resetTimeoutMs: number; halfOpenMaxAttempts: number; }>; stateTargets: z.ZodObject<{ recovering: z.ZodString; compensating: z.ZodString; humanReview: z.ZodString; quarantined: z.ZodString; failed: z.ZodString; cancelled: z.ZodString; }, "strip", z.ZodTypeAny, { recovering: string; compensating: string; humanReview: string; quarantined: string; failed: string; cancelled: string; }, { recovering: string; compensating: string; humanReview: string; quarantined: string; failed: string; cancelled: string; }>; onExhausted: z.ZodEnum<["human_review", "quarantine", "fail"]>; afterCompensation: z.ZodEnum<["human_review", "quarantine", "fail"]>; }, "strip", z.ZodTypeAny, { maxAttemptsPerState: number; maxTotalAttempts: number; maxElapsedMs: number; retryableCategories: ("unknown" | "validation" | "policy_denied" | "authentication" | "authorization" | "rate_limit" | "timeout" | "transient_dependency" | "permanent_dependency" | "concurrency_conflict" | "resource_exhausted" | "tool_failure" | "inference_failure" | "memory_failure" | "execution_failure" | "storage_failure" | "message_failure" | "cache_failure" | "invariant_violation" | "cancellation")[]; backoff: { initialDelayMs: number; maxDelayMs: number; multiplier: number; jitterRatio: number; }; circuitBreaker: { failureThreshold: number; resetTimeoutMs: number; halfOpenMaxAttempts: number; }; stateTargets: { recovering: string; compensating: string; humanReview: string; quarantined: string; failed: string; cancelled: string; }; onExhausted: "human_review" | "quarantine" | "fail"; afterCompensation: "human_review" | "quarantine" | "fail"; nonRetryableCodes?: string[] | undefined; }, { maxAttemptsPerState: number; maxTotalAttempts: number; maxElapsedMs: number; retryableCategories: ("unknown" | "validation" | "policy_denied" | "authentication" | "authorization" | "rate_limit" | "timeout" | "transient_dependency" | "permanent_dependency" | "concurrency_conflict" | "resource_exhausted" | "tool_failure" | "inference_failure" | "memory_failure" | "execution_failure" | "storage_failure" | "message_failure" | "cache_failure" | "invariant_violation" | "cancellation")[]; backoff: { initialDelayMs: number; maxDelayMs: number; multiplier: number; jitterRatio: number; }; circuitBreaker: { failureThreshold: number; resetTimeoutMs: number; halfOpenMaxAttempts: number; }; stateTargets: { recovering: string; compensating: string; humanReview: string; quarantined: string; failed: string; cancelled: string; }; onExhausted: "human_review" | "quarantine" | "fail"; afterCompensation: "human_review" | "quarantine" | "fail"; nonRetryableCodes?: string[] | undefined; }>;
```

## `fsmRecoverySnapshotSchema`

Runtime schema for FSM Recovery Snapshot.

- Kind: constant
- Import: `import { fsmRecoverySnapshotSchema } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export declare const fsmRecoverySnapshotSchema: z.ZodObject<{ startedAt: z.ZodString; updatedAt: z.ZodString; totalAttempts: z.ZodNumber; attemptsByState: z.ZodRecord<z.ZodString, z.ZodNumber>; circuits: z.ZodRecord<z.ZodString, z.ZodObject<{ status: z.ZodEnum<["closed", "open", "half_open"]>; consecutiveFailures: z.ZodNumber; halfOpenAttempts: z.ZodNumber; openedAt: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { status: "closed" | "open" | "half_open"; consecutiveFailures: number; halfOpenAttempts: number; openedAt?: string | undefined; }, { status: "closed" | "open" | "half_open"; consecutiveFailures: number; halfOpenAttempts: number; openedAt?: string | undefined; }>>; lastAnomalyId: z.ZodOptional<z.ZodString>; lastAction: z.ZodOptional<z.ZodEnum<["retry", "reconcile", "fallback", "degrade", "wait", "compensate", "human_review", "quarantine", "fail", "cancel"]>>; }, "strip", z.ZodTypeAny, { startedAt: string; updatedAt: string; totalAttempts: number; attemptsByState: Record<string, number>; circuits: Record<string, { status: "closed" | "open" | "half_open"; consecutiveFailures: number; halfOpenAttempts: number; openedAt?: string | undefined; }>; lastAnomalyId?: string | undefined; lastAction?: "retry" | "reconcile" | "fallback" | "degrade" | "wait" | "compensate" | "human_review" | "quarantine" | "fail" | "cancel" | undefined; }, { startedAt: string; updatedAt: string; totalAttempts: number; attemptsByState: Record<string, number>; circuits: Record<string, { status: "closed" | "open" | "half_open"; consecutiveFailures: number; halfOpenAttempts: number; openedAt?: string | undefined; }>; lastAnomalyId?: string | undefined; lastAction?: "retry" | "reconcile" | "fallback" | "degrade" | "wait" | "compensate" | "human_review" | "quarantine" | "fail" | "cancel" | undefined; }>;
```

## `classifyFSMAnomaly`

Classify FSM Anomaly function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { classifyFSMAnomaly } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export declare function classifyFSMAnomaly(error: unknown, input: FSMAnomalyClassificationInput): FSMAnomaly;
```

### Call signature

```text
classifyFSMAnomaly(error: unknown, input: FSMAnomalyClassificationInput): FSMAnomaly
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `input` | <code>FSMAnomalyClassificationInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FSMAnomaly`
- Description: The return contract is defined by the type shown above.

## `computeFSMRecoveryDelay`

Compute FSM Recovery Delay function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { computeFSMRecoveryDelay } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export declare function computeFSMRecoveryDelay(policy: FSMRecoveryBackoffPolicy, attempt: number, seed: string): number;
```

### Call signature

```text
computeFSMRecoveryDelay(policy: FSMRecoveryBackoffPolicy, attempt: number, seed: string): number
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `policy` | <code>FSMRecoveryBackoffPolicy</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `attempt` | <code>number</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `seed` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `number`
- Description: The return contract is defined by the type shown above.

## `createInitialFSMRecoverySnapshot`

Create Initial FSM Recovery Snapshot function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createInitialFSMRecoverySnapshot } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export declare function createInitialFSMRecoverySnapshot(now?: string): FSMRecoverySnapshot;
```

### Call signature

```text
createInitialFSMRecoverySnapshot(now?: string): FSMRecoverySnapshot
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `now` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FSMRecoverySnapshot`
- Description: The return contract is defined by the type shown above.

## `planFSMRecovery`

Plan FSM Recovery function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { planFSMRecovery } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export declare function planFSMRecovery(input: {
    anomaly: FSMAnomaly;
    stateId: string;
    policy?: FSMRecoveryPolicySpec;
    snapshot?: FSMRecoverySnapshot;
    now?: string;
}): FSMRecoveryPlan;
```

### Call signature

```text
planFSMRecovery(input: { anomaly: FSMAnomaly; stateId: string; policy?: FSMRecoveryPolicySpec; snapshot?: FSMRecoverySnapshot; now?: string; }): FSMRecoveryPlan
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>{ anomaly: FSMAnomaly; stateId: string; policy?: FSMRecoveryPolicySpec; snapshot?: FSMRecoverySnapshot; now?: string; }</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FSMRecoveryPlan`
- Description: The return contract is defined by the type shown above.

## `registerFSMRecoverySuccess`

Register FSM Recovery Success function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { registerFSMRecoverySuccess } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export declare function registerFSMRecoverySuccess(snapshot: FSMRecoverySnapshot, circuitKey: string, now?: string): FSMRecoverySnapshot;
```

### Call signature

```text
registerFSMRecoverySuccess(snapshot: FSMRecoverySnapshot, circuitKey: string, now?: string): FSMRecoverySnapshot
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `snapshot` | <code>FSMRecoverySnapshot</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `circuitKey` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `now` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FSMRecoverySnapshot`
- Description: The return contract is defined by the type shown above.

## `FSMAnomaly`

FSM Anomaly interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { FSMAnomaly } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export interface FSMAnomaly {
    id: string;
    source: FSMAnomalySource;
    category: FSMAnomalyCategory;
    code: string;
    message: string;
    occurredAt: string;
    retryable?: boolean;
    retryAfterMs?: number;
    circuitKey?: string;
    sideEffectState?: FSMSideEffectState;
    compensationAvailable?: boolean;
    reconciliationAvailable?: boolean;
    fallbackAvailable?: boolean;
    degradationAvailable?: boolean;
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
| `degradationAvailable` | property | <code>degradationAvailable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fallbackAvailable` | property | <code>fallbackAvailable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconciliationAvailable` | property | <code>reconciliationAvailable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>retryable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryAfterMs` | property | <code>retryAfterMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectState` | property | <code>sideEffectState?: RecoverySideEffectState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMAnomalyClassificationInput`

FSM Anomaly Classification Input interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { FSMAnomalyClassificationInput } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export interface FSMAnomalyClassificationInput {
    id: string;
    source?: FSMAnomalySource;
    occurredAt?: string;
    sideEffectState?: FSMSideEffectState;
    compensationAvailable?: boolean;
    reconciliationAvailable?: boolean;
    fallbackAvailable?: boolean;
    degradationAvailable?: boolean;
    retryable?: boolean;
    retryAfterMs?: number;
    circuitKey?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `circuitKey` | property | <code>circuitKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `compensationAvailable` | property | <code>compensationAvailable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `degradationAvailable` | property | <code>degradationAvailable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fallbackAvailable` | property | <code>fallbackAvailable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `occurredAt` | property | <code>occurredAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconciliationAvailable` | property | <code>reconciliationAvailable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>retryable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryAfterMs` | property | <code>retryAfterMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectState` | property | <code>sideEffectState?: RecoverySideEffectState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source?: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMCircuitBreakerPolicy`

FSM Circuit Breaker Policy interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { FSMCircuitBreakerPolicy } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export interface FSMCircuitBreakerPolicy {
    failureThreshold: number;
    resetTimeoutMs: number;
    halfOpenMaxAttempts: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `failureThreshold` | property | <code>failureThreshold: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `halfOpenMaxAttempts` | property | <code>halfOpenMaxAttempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resetTimeoutMs` | property | <code>resetTimeoutMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMCircuitSnapshot`

FSM Circuit Snapshot interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { FSMCircuitSnapshot } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export interface FSMCircuitSnapshot {
    status: FSMCircuitStatus;
    consecutiveFailures: number;
    halfOpenAttempts: number;
    openedAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `consecutiveFailures` | property | <code>consecutiveFailures: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `halfOpenAttempts` | property | <code>halfOpenAttempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `openedAt` | property | <code>openedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: FSMCircuitStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMRecoveryBackoffPolicy`

FSM Recovery Backoff Policy interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { FSMRecoveryBackoffPolicy } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export interface FSMRecoveryBackoffPolicy {
    initialDelayMs: number;
    maxDelayMs: number;
    multiplier: number;
    jitterRatio: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `initialDelayMs` | property | <code>initialDelayMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `jitterRatio` | property | <code>jitterRatio: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxDelayMs` | property | <code>maxDelayMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `multiplier` | property | <code>multiplier: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMRecoveryDecision`

FSM Recovery Decision interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { FSMRecoveryDecision } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export interface FSMRecoveryDecision {
    anomaly: FSMAnomaly;
    action: FSMRecoveryAction;
    fromState: string;
    transitionState: string;
    resumeState?: string;
    attempt: number;
    totalAttempts: number;
    delayMs: number;
    decidedAt: string;
    nextEligibleAt?: string;
    circuitKey: string;
    circuitStatus: FSMCircuitStatus;
    reason: string;
    quarantineState: string;
    afterCompensationAction?: Extract<FSMRecoveryAction, 'human_review' | 'quarantine' | 'fail'>;
    afterCompensationState?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `action` | property | <code>action: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `afterCompensationAction` | property | <code>afterCompensationAction?: "fail" &#124; "human_review" &#124; "quarantine"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `afterCompensationState` | property | <code>afterCompensationState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `anomaly` | property | <code>anomaly: FSMAnomaly</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `attempt` | property | <code>attempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `circuitKey` | property | <code>circuitKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `circuitStatus` | property | <code>circuitStatus: FSMCircuitStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decidedAt` | property | <code>decidedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `delayMs` | property | <code>delayMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fromState` | property | <code>fromState: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextEligibleAt` | property | <code>nextEligibleAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `quarantineState` | property | <code>quarantineState: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resumeState` | property | <code>resumeState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalAttempts` | property | <code>totalAttempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transitionState` | property | <code>transitionState: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMRecoveryPlan`

FSM Recovery Plan interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { FSMRecoveryPlan } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export interface FSMRecoveryPlan {
    decision: FSMRecoveryDecision;
    snapshot: FSMRecoverySnapshot;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `decision` | property | <code>decision: FSMRecoveryDecision</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshot` | property | <code>snapshot: FSMRecoverySnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMRecoveryPolicySpec`

FSM Recovery Policy Spec interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { FSMRecoveryPolicySpec } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export interface FSMRecoveryPolicySpec {
    maxAttemptsPerState: number;
    maxTotalAttempts: number;
    maxElapsedMs: number;
    retryableCategories: FSMAnomalyCategory[];
    nonRetryableCodes?: string[];
    backoff: FSMRecoveryBackoffPolicy;
    circuitBreaker: FSMCircuitBreakerPolicy;
    stateTargets: FSMRecoveryStateTargets;
    onExhausted: Extract<FSMRecoveryAction, 'human_review' | 'quarantine' | 'fail'>;
    afterCompensation: Extract<FSMRecoveryAction, 'human_review' | 'quarantine' | 'fail'>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `afterCompensation` | property | <code>afterCompensation: "fail" &#124; "human_review" &#124; "quarantine"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `backoff` | property | <code>backoff: FSMRecoveryBackoffPolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `circuitBreaker` | property | <code>circuitBreaker: FSMCircuitBreakerPolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttemptsPerState` | property | <code>maxAttemptsPerState: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxElapsedMs` | property | <code>maxElapsedMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTotalAttempts` | property | <code>maxTotalAttempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nonRetryableCodes` | property | <code>nonRetryableCodes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `onExhausted` | property | <code>onExhausted: "fail" &#124; "human_review" &#124; "quarantine"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryableCategories` | property | <code>retryableCategories: ("unknown" &#124; "cancellation" &#124; "timeout" &#124; "validation" &#124; "policy_denied" &#124; "authentication" &#124; "authorization" &#124; "rate_limit" &#124; "transient_dependency" &#124; "permanent_dependency" &#124; "concurrency_conflict" &#124; "resource_exhausted" &#124; "tool_failure" &#124; "inference_failure" &#124; "memory_failure" &#124; "execution_failure" &#124; "storage_failure" &#124; "message_failure" &#124; "cache_failure" &#124; "invariant_violation")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateTargets` | property | <code>stateTargets: FSMRecoveryStateTargets</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMRecoverySnapshot`

FSM Recovery Snapshot interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { FSMRecoverySnapshot } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export interface FSMRecoverySnapshot {
    startedAt: string;
    updatedAt: string;
    totalAttempts: number;
    attemptsByState: Record<string, number>;
    circuits: Record<string, FSMCircuitSnapshot>;
    lastAnomalyId?: string;
    lastAction?: FSMRecoveryAction;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attemptsByState` | property | <code>attemptsByState: Record&lt;string, number&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `circuits` | property | <code>circuits: Record&lt;string, FSMCircuitSnapshot&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastAction` | property | <code>lastAction?: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastAnomalyId` | property | <code>lastAnomalyId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startedAt` | property | <code>startedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalAttempts` | property | <code>totalAttempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMRecoveryStateTargets`

FSM Recovery State Targets interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { FSMRecoveryStateTargets } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export interface FSMRecoveryStateTargets {
    recovering: string;
    compensating: string;
    humanReview: string;
    quarantined: string;
    failed: string;
    cancelled: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancelled` | property | <code>cancelled: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `compensating` | property | <code>compensating: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failed` | property | <code>failed: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `humanReview` | property | <code>humanReview: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `quarantined` | property | <code>quarantined: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recovering` | property | <code>recovering: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMAnomalyCategory`

Public type alias for FSM Anomaly Category; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { FSMAnomalyCategory } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export type FSMAnomalyCategory = RecoveryCategory;
```

## `FSMAnomalySource`

Public type alias for FSM Anomaly Source; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { FSMAnomalySource } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export type FSMAnomalySource = RecoveryModule;
```

## `FSMCircuitStatus`

Public type alias for FSM Circuit Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { FSMCircuitStatus } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export type FSMCircuitStatus = 'closed' | 'open' | 'half_open';
```

## `FSMRecoveryAction`

Public type alias for FSM Recovery Action; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { FSMRecoveryAction } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export type FSMRecoveryAction = (typeof FSM_RECOVERY_ACTIONS)[number];
```

## `FSMSideEffectState`

Public type alias for FSM Side Effect State; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { FSMSideEffectState } from '@codesoul-co/hypha-fsm';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### Declaration

```text
export type FSMSideEffectState = RecoverySideEffectState;
```
