# `@codesoul-co/hypha-core` / `modules/runtime/runtime-timer-worker`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-timer-worker.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-timer-worker.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DurableRuntimeTimerWorker` | class | <code>new DurableRuntimeTimerWorker(options: DurableRuntimeTimerWorkerOptions): DurableRuntimeTimerWorker</code> | Runtime implementation for Durable Runtime Timer Worker; see its public constructor and members below. |
| `DurableRuntimeTimerWorkerOptions` | interface | <code>interface DurableRuntimeTimerWorkerOptions</code> | Field contract for Durable Runtime Timer Worker Options; see all contract members below. |

## `DurableRuntimeTimerWorker` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DurableRuntimeTimerWorkerOptions): DurableRuntimeTimerWorker</code> | Creates an instance of this class. |
| `sweep` | method | <code>sweep(input: RuntimeTimerSweepRequest): Promise&lt;RuntimeTimerSweepResult&gt;</code> | Public runtime operation for sweep. |

## `DurableRuntimeTimerWorkerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: EventRuntime</code> | Public events property. |
| `monotonicNow` | method | <code>monotonicNow(): number</code> | Public runtime operation for monotonic Now. |
| `nextId` | method | <code>nextId(namespace: string): string</code> | Public runtime operation for next Id. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `onLeaseRenewalFailure` | method | <code>onLeaseRenewalFailure(error: unknown, runId: string): void</code> | Handles Lease Renewal Failure at this module boundary. |
| `operationalTelemetry` | property | <code>operationalTelemetry: RuntimeOperationalTelemetry</code> | Public operational Telemetry property. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public projections property. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public projection Store property. |
| `renewalIntervalMs` | property | <code>renewalIntervalMs: number</code> | Public renewal Interval Ms property. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public run Leases property. |
| `wait` | method | <code>wait(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | Public runtime operation for wait. |
