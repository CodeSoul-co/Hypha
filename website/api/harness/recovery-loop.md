# `@codesoul-co/hypha-harness` / `recovery-loop`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Source: [`packages/harness/src/recovery-loop.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts)
- Exports: **5**

## Using this module

Use the Recovery loop module for handling bounded recovery, retry, or degradation. It exports 1 function, 4 interfaces.

### Import from the package entrypoint

```ts
import {
  runFSMRecoveryLoop,
} from '@codesoul-co/hypha-harness';

import type {
  FSMRecoveryAttemptContext,
  FSMRecoveryLoopOptions,
  FSMRecoveryLoopResult,
  FSMRecoveryLoopScheduler,
} from '@codesoul-co/hypha-harness';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runFSMRecoveryLoop` | function | <code>runFSMRecoveryLoop&lt;TOutput&gt;(options: FSMRecoveryLoopOptions&lt;TOutput&gt;): Promise&lt;FSMRecoveryLoopResult&lt;TOutput&gt;&gt;</code> | Runs only the bounded recovery loop described by the FSM recovery policy. Delayed retries are suspended by default; a caller must inject a scheduler and explicitly opt into an inline delay budget to keep them in-process. |
| `FSMRecoveryAttemptContext` | interface | <code>interface FSMRecoveryAttemptContext</code> | FSM Recovery Attempt Context interface with 2 public fields or methods. |
| `FSMRecoveryLoopOptions` | interface | <code>interface FSMRecoveryLoopOptions</code> | FSM Recovery Loop Options interface with 12 public fields or methods. |
| `FSMRecoveryLoopResult` | interface | <code>interface FSMRecoveryLoopResult</code> | FSM Recovery Loop Result interface with 5 public fields or methods. |
| `FSMRecoveryLoopScheduler` | interface | <code>interface FSMRecoveryLoopScheduler</code> | FSM Recovery Loop Scheduler interface with 1 public fields or methods. |

## `runFSMRecoveryLoop`

Runs only the bounded recovery loop described by the FSM recovery policy. Delayed retries are suspended by default; a caller must inject a scheduler and explicitly opt into an inline delay budget to keep them in-process.

- Kind: function
- Import: `import { runFSMRecoveryLoop } from '@codesoul-co/hypha-harness';`
- Source module: [`recovery-loop`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts)

### Declaration

```text
export declare function runFSMRecoveryLoop<TOutput>(options: FSMRecoveryLoopOptions<TOutput>): Promise<FSMRecoveryLoopResult<TOutput>>;
```

### Call signature

```text
runFSMRecoveryLoop<TOutput>(options: FSMRecoveryLoopOptions<TOutput>): Promise<FSMRecoveryLoopResult<TOutput>>
```

Runs only the bounded recovery loop described by the FSM recovery policy. Delayed retries are suspended by default; a caller must inject a scheduler and explicitly opt into an inline delay budget to keep them in-process.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>FSMRecoveryLoopOptions&lt;TOutput&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<FSMRecoveryLoopResult<TOutput>>`
- Description: The return contract is defined by the type shown above.

## `FSMRecoveryAttemptContext`

FSM Recovery Attempt Context interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { FSMRecoveryAttemptContext } from '@codesoul-co/hypha-harness';`
- Source module: [`recovery-loop`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts)

### Declaration

```text
export interface FSMRecoveryAttemptContext {
    attempt: number;
    signal?: AbortSignal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal?: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMRecoveryLoopOptions`

FSM Recovery Loop Options interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { FSMRecoveryLoopOptions } from '@codesoul-co/hypha-harness';`
- Source module: [`recovery-loop`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts)

### Declaration

```text
export interface FSMRecoveryLoopOptions<TOutput> {
    fsm: FSMRuntime;
    source: FSMAnomalySource;
    execute(context: FSMRecoveryAttemptContext): Promise<TOutput>;
    classify?: (error: unknown, context: FSMRecoveryAttemptContext) => FSMAnomaly | Promise<FSMAnomaly>;
    compensate?: (decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext) => Promise<void>;
    reconcile?: (decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext) => Promise<TOutput>;
    fallback?: (decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext) => Promise<TOutput>;
    degrade?: (decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext) => Promise<TOutput>;
    scheduler?: FSMRecoveryLoopScheduler;
    maxInlineDelayMs?: number;
    signal?: AbortSignal;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `classify` | method | <code>classify?(error: unknown, context: FSMRecoveryAttemptContext): FSMAnomaly &#124; Promise&lt;FSMAnomaly&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `compensate` | method | <code>compensate?(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `degrade` | method | <code>degrade?(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `execute` | method | <code>execute(context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fallback` | method | <code>fallback?(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fsm` | property | <code>fsm: FSMRuntime</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxInlineDelayMs` | property | <code>maxInlineDelayMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `reconcile` | method | <code>reconcile?(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `scheduler` | property | <code>scheduler?: FSMRecoveryLoopScheduler</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal?: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMRecoveryLoopResult`

FSM Recovery Loop Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { FSMRecoveryLoopResult } from '@codesoul-co/hypha-harness';`
- Source module: [`recovery-loop`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts)

### Declaration

```text
export interface FSMRecoveryLoopResult<TOutput> {
    status: 'succeeded' | 'degraded' | 'suspended' | 'compensated' | 'failed' | 'cancelled';
    output?: TOutput;
    error?: unknown;
    decision?: FSMRecoveryDecision;
    attempts: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decision` | property | <code>decision?: FSMRecoveryDecision</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: TOutput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "degraded" &#124; "cancelled" &#124; "failed" &#124; "succeeded" &#124; "suspended" &#124; "compensated"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMRecoveryLoopScheduler`

FSM Recovery Loop Scheduler interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { FSMRecoveryLoopScheduler } from '@codesoul-co/hypha-harness';`
- Source module: [`recovery-loop`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts)

### Declaration

```text
export interface FSMRecoveryLoopScheduler {
    wait(delayMs: number, decision: FSMRecoveryDecision, signal?: AbortSignal): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `wait` | method | <code>wait(delayMs: number, decision: FSMRecoveryDecision, signal?: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
