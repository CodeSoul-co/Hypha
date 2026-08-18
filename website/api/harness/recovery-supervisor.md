# `@codesoul-co/hypha-harness` / `recovery-supervisor`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Source: [`packages/harness/src/recovery-supervisor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)
- Exports: **8**

## Using this module

Use the Recovery supervisor module for handling bounded recovery, retry, or degradation. It exports 1 function, 6 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  runRecoverySupervisor,
} from '@codesoul-co/hypha-harness';

import type {
  RecoveryParticipant,
  RecoveryParticipantContext,
  RecoveryParticipantResult,
  RecoverySupervisorOptions,
  RecoverySupervisorResult,
  RecoverySupervisorScheduler,
  RecoveryParticipantAction,
} from '@codesoul-co/hypha-harness';
```

### Usage patterns

- Use the 7 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runRecoverySupervisor` | function | <code>runRecoverySupervisor(options: RecoverySupervisorOptions): Promise&lt;RecoverySupervisorResult&gt;</code> | Runs a dependency-ordered, FSM-governed recovery workflow. A participant is retried only while its evidence changes or the bounded strategy budget has not been exhausted. Completed upstream participants are not repeated. |
| `RecoveryParticipant` | interface | <code>interface RecoveryParticipant</code> | Recovery Participant interface with 9 public fields or methods. |
| `RecoveryParticipantContext` | interface | <code>interface RecoveryParticipantContext</code> | Recovery Participant Context interface with 10 public fields or methods. |
| `RecoveryParticipantResult` | interface | <code>interface RecoveryParticipantResult</code> | Recovery Participant Result interface with 3 public fields or methods. |
| `RecoverySupervisorOptions` | interface | <code>interface RecoverySupervisorOptions</code> | Recovery Supervisor Options interface with 18 public fields or methods. |
| `RecoverySupervisorResult` | interface | <code>interface RecoverySupervisorResult</code> | Recovery Supervisor Result interface with 5 public fields or methods. |
| `RecoverySupervisorScheduler` | interface | <code>interface RecoverySupervisorScheduler</code> | Recovery Supervisor Scheduler interface with 1 public fields or methods. |
| `RecoveryParticipantAction` | type | <code>type RecoveryParticipantAction = (context: RecoveryParticipantContext) =&gt; Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | Public type alias for Recovery Participant Action; the declaration contains its complete type expression. |

## `runRecoverySupervisor`

Runs a dependency-ordered, FSM-governed recovery workflow. A participant is retried only while its evidence changes or the bounded strategy budget has not been exhausted. Completed upstream participants are not repeated.

- Kind: function
- Import: `import { runRecoverySupervisor } from '@codesoul-co/hypha-harness';`
- Source module: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### Declaration

```text
export declare function runRecoverySupervisor(options: RecoverySupervisorOptions): Promise<RecoverySupervisorResult>;
```

### Call signature

```text
runRecoverySupervisor(options: RecoverySupervisorOptions): Promise<RecoverySupervisorResult>
```

Runs a dependency-ordered, FSM-governed recovery workflow. A participant is retried only while its evidence changes or the bounded strategy budget has not been exhausted. Completed upstream participants are not repeated.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>RecoverySupervisorOptions</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<RecoverySupervisorResult>`
- Description: The return contract is defined by the type shown above.

## `RecoveryParticipant`

Recovery Participant interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { RecoveryParticipant } from '@codesoul-co/hypha-harness';`
- Source module: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### Declaration

```text
export interface RecoveryParticipant<TOutput = unknown> {
    id: string;
    module: RecoveryModule;
    dependsOn?: string[];
    execute: RecoveryParticipantAction<TOutput>;
    classify(error: unknown, context: RecoveryParticipantContext): RecoveryFailure | Promise<RecoveryFailure>;
    reconcile?: RecoveryParticipantAction<TOutput>;
    fallback?: RecoveryParticipantAction<TOutput>;
    degrade?: RecoveryParticipantAction<TOutput>;
    compensate?: RecoveryParticipantAction<TOutput>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `classify` | method | <code>classify(error: unknown, context: RecoveryParticipantContext): RecoveryFailure &#124; Promise&lt;RecoveryFailure&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `compensate` | method | <code>compensate?(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `degrade` | method | <code>degrade?(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `dependsOn` | property | <code>dependsOn?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `execute` | method | <code>execute(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fallback` | method | <code>fallback?(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `module` | property | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconcile` | method | <code>reconcile?(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RecoveryParticipantContext`

Recovery Participant Context interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { RecoveryParticipantContext } from '@codesoul-co/hypha-harness';`
- Source module: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### Declaration

```text
export interface RecoveryParticipantContext {
    caseId: string;
    runId: string;
    scope: RecoveryKnowledgeScope;
    participantId: string;
    module: RecoveryModule;
    cycle: number;
    outputs: Readonly<Record<string, unknown>>;
    snapshot?: Readonly<RecoveryCaseSnapshot>;
    failure?: RecoveryFailure;
    signal?: AbortSignal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `caseId` | property | <code>caseId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cycle` | property | <code>cycle: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failure` | property | <code>failure?: RecoveryFailure</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `module` | property | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputs` | property | <code>outputs: Readonly&lt;Record&lt;string, unknown&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `participantId` | property | <code>participantId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RecoveryKnowledgeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal?: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshot` | property | <code>snapshot?: Readonly&lt;RecoveryCaseSnapshot&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RecoveryParticipantResult`

Recovery Participant Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RecoveryParticipantResult } from '@codesoul-co/hypha-harness';`
- Source module: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### Declaration

```text
export interface RecoveryParticipantResult<TOutput = unknown> {
    output: TOutput;
    evidence: RecoveryEvidence;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evidence` | property | <code>evidence: RecoveryEvidence</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output: TOutput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RecoverySupervisorOptions`

Recovery Supervisor Options interface with 18 public fields or methods.

- Kind: interface
- Import: `import type { RecoverySupervisorOptions } from '@codesoul-co/hypha-harness';`
- Source module: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### Declaration

```text
export interface RecoverySupervisorOptions {
    fsm: FSMRuntime;
    caseId: string;
    userId: string;
    tenantId?: string;
    participants: RecoveryParticipant[];
    policy?: Partial<RecoveryConvergencePolicy>;
    knowledge?: RecoveryKnowledgePort;
    trace?: TraceRecorder;
    sessionId?: string;
    workspaceId?: string;
    stepId?: string;
    agentId?: string;
    domainPackId?: string;
    scheduler?: RecoverySupervisorScheduler;
    maxInlineDelayMs?: number;
    signal?: AbortSignal;
    now?: () => string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `caseId` | property | <code>caseId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackId` | property | <code>domainPackId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsm` | property | <code>fsm: FSMRuntime</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `knowledge` | property | <code>knowledge?: RecoveryKnowledgePort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxInlineDelayMs` | property | <code>maxInlineDelayMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `participants` | property | <code>participants: RecoveryParticipant&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policy` | property | <code>policy?: Partial&lt;RecoveryConvergencePolicy&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scheduler` | property | <code>scheduler?: RecoverySupervisorScheduler</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal?: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trace` | property | <code>trace?: TraceRecorder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RecoverySupervisorResult`

Recovery Supervisor Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RecoverySupervisorResult } from '@codesoul-co/hypha-harness';`
- Source module: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### Declaration

```text
export interface RecoverySupervisorResult {
    status: 'succeeded' | 'degraded' | 'compensated' | 'suspended' | 'quarantined' | 'failed' | 'cancelled';
    outputs: Record<string, unknown>;
    snapshot?: RecoveryCaseSnapshot;
    failure?: RecoveryFailure;
    error?: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failure` | property | <code>failure?: RecoveryFailure</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputs` | property | <code>outputs: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshot` | property | <code>snapshot?: RecoveryCaseSnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "degraded" &#124; "cancelled" &#124; "failed" &#124; "quarantined" &#124; "succeeded" &#124; "suspended" &#124; "compensated"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RecoverySupervisorScheduler`

Recovery Supervisor Scheduler interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { RecoverySupervisorScheduler } from '@codesoul-co/hypha-harness';`
- Source module: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### Declaration

```text
export interface RecoverySupervisorScheduler {
    wait(delayMs: number, decision: FSMRecoveryDecision, signal?: AbortSignal): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `wait` | method | <code>wait(delayMs: number, decision: FSMRecoveryDecision, signal?: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RecoveryParticipantAction`

Public type alias for Recovery Participant Action; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RecoveryParticipantAction } from '@codesoul-co/hypha-harness';`
- Source module: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### Declaration

```text
export type RecoveryParticipantAction<TOutput = unknown> = (context: RecoveryParticipantContext) => Promise<RecoveryParticipantResult<TOutput>>;
```
