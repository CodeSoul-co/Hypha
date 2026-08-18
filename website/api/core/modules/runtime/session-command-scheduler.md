# `@codesoul-co/hypha-core` / `modules/runtime/session-command-scheduler`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/session-command-scheduler.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-scheduler.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DurableSessionCommandScheduler` | class | <code>new DurableSessionCommandScheduler(options: DurableSessionCommandSchedulerOptions): DurableSessionCommandScheduler</code> | Repeatedly invokes a single-command processor until shutdown is requested. Abort stops new claims, wakes idle waits, and lets an in-flight handler drain. |
| `DurableSessionCommandSchedulerOptions` | interface | <code>interface DurableSessionCommandSchedulerOptions</code> | Field contract for Durable Session Command Scheduler Options; see all contract members below. |
| `RunSessionCommandSchedulerRequest` | interface | <code>interface RunSessionCommandSchedulerRequest</code> | Field contract for Run Session Command Scheduler Request; see all contract members below. |
| `SessionCommandProcessor` | interface | <code>interface SessionCommandProcessor</code> | Field contract for Session Command Processor; see all contract members below. |
| `SessionCommandSchedulerResult` | interface | <code>interface SessionCommandSchedulerResult</code> | Field contract for Session Command Scheduler Result; see all contract members below. |

## `DurableSessionCommandScheduler` public members

Repeatedly invokes a single-command processor until shutdown is requested. Abort stops new claims, wakes idle waits, and lets an in-flight handler drain.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DurableSessionCommandSchedulerOptions): DurableSessionCommandScheduler</code> | Creates an instance of this class. |
| `run` | method | <code>run(request: RunSessionCommandSchedulerRequest): Promise&lt;SessionCommandSchedulerResult&gt;</code> | Public runtime operation for run. |

## `DurableSessionCommandSchedulerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `errorBackoffMs` | property | <code>errorBackoffMs: number</code> | Public error Backoff Ms property. |
| `onError` | method | <code>onError(error: unknown): void</code> | Handles Error at this module boundary. |
| `onResult` | method | <code>onResult(result: SessionCommandWorkerResult): void</code> | Handles Result at this module boundary. |
| `pollIntervalMs` | property | <code>pollIntervalMs: number</code> | Public poll Interval Ms property. |
| `shutdownDrainMs` | property | <code>shutdownDrainMs: number</code> | Public shutdown Drain Ms property. |
| `wait` | method | <code>wait(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | Public runtime operation for wait. |
| `worker` | property | <code>worker: SessionCommandProcessor</code> | Public worker property. |

## `RunSessionCommandSchedulerRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `scope` | property | <code>scope: SessionQueueScope</code> | Public scope property. |
| `signal` | property | <code>signal: AbortSignal</code> | Public signal property. |

## `SessionCommandProcessor` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `processNext` | method | <code>processNext(scope?: SessionQueueScope, signal?: AbortSignal): Promise&lt;SessionCommandWorkerResult&gt;</code> | Public runtime operation for process Next. |

## `SessionCommandSchedulerResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `errors` | property | <code>errors: number</code> | Public errors property. |
| `idlePolls` | property | <code>idlePolls: number</code> | Public idle Polls property. |
| `processed` | property | <code>processed: number</code> | Public processed property. |
