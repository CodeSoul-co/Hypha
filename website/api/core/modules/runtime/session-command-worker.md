# `@codesoul-co/hypha-core` / `modules/runtime/session-command-worker`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/session-command-worker.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DurableSessionCommandWorker` | class | <code>new DurableSessionCommandWorker(options: DurableSessionCommandWorkerOptions): DurableSessionCommandWorker</code> | Claims and resolves one durable Session command without owning a polling loop. Command handlers must explicitly classify expected retry and failure outcomes. |
| `DurableSessionCommandWorkerOptions` | interface | <code>interface DurableSessionCommandWorkerOptions</code> | Field contract for Durable Session Command Worker Options; see all contract members below. |
| `SessionCommandHandlerContext` | interface | <code>interface SessionCommandHandlerContext</code> | Field contract for Session Command Handler Context; see all contract members below. |
| `SessionCommandWorkerResult` | interface | <code>interface SessionCommandWorkerResult</code> | Field contract for Session Command Worker Result; see all contract members below. |
| `SessionCommandHandler` | type | <code>type SessionCommandHandler = (context: Readonly&lt;SessionCommandHandlerContext&gt;) =&gt; Promise&lt;SessionCommandHandlerResult&gt;</code> | Public type alias for Session Command Handler. |
| `SessionCommandHandlerResult` | type | <code>type SessionCommandHandlerResult = { disposition: 'applied'; resultRunId?: string; resultEventIds?: string[]; } &#124; { disposition: 'retry'; availableAt?: string; } &#124; { disposition: 'failed'; rejectionCode: string; deadLetter?: boolean; }</code> | Public type alias for Session Command Handler Result. |
| `SessionCommandWorkerDisposition` | type | <code>type SessionCommandWorkerDisposition = 'idle' &#124; 'applied' &#124; 'retry_scheduled' &#124; 'failed' &#124; 'dead_lettered' &#124; 'lease_lost' &#124; 'aborted'</code> | Public type alias for Session Command Worker Disposition. |

## `DurableSessionCommandWorker` public members

Claims and resolves one durable Session command without owning a polling loop. Command handlers must explicitly classify expected retry and failure outcomes.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DurableSessionCommandWorkerOptions): DurableSessionCommandWorker</code> | Creates an instance of this class. |
| `processNext` | method | <code>processNext(scope?: SessionQueueScope, signal?: AbortSignal): Promise&lt;SessionCommandWorkerResult&gt;</code> | Public runtime operation for process Next. |

## `DurableSessionCommandWorkerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `handlers` | property | <code>handlers: Partial&lt;Record&lt;"user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session", SessionCommandHandler&gt;&gt;</code> | Public handlers property. |
| `leaseMs` | property | <code>leaseMs: number</code> | Public lease Ms property. |
| `maxHandlerDurationMs` | property | <code>maxHandlerDurationMs: number</code> | Public max Handler Duration Ms property. |
| `monotonicNow` | method | <code>monotonicNow(): number</code> | Public runtime operation for monotonic Now. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `onLeaseRenewalFailure` | method | <code>onLeaseRenewalFailure(error: unknown, claim: Readonly&lt;SessionCommandClaim&gt;): void</code> | Handles Lease Renewal Failure at this module boundary. |
| `operationalTelemetry` | property | <code>operationalTelemetry: RuntimeOperationalTelemetry</code> | Public operational Telemetry property. |
| `queue` | property | <code>queue: SessionQueue</code> | Public queue property. |
| `renewalIntervalMs` | property | <code>renewalIntervalMs: number</code> | Public renewal Interval Ms property. |
| `wait` | method | <code>wait(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | Public runtime operation for wait. |
| `workerId` | property | <code>workerId: string</code> | Public worker Id property. |

## `SessionCommandHandlerContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimToken` | property | <code>claimToken: string</code> | Public claim Token property. |
| `command` | property | <code>command: Readonly&lt;SessionCommandRecord&gt;</code> | Public command property. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public lease Epoch property. |
| `signal` | property | <code>signal: AbortSignal</code> | Public signal property. |

## `SessionCommandWorkerResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public attempts property. |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `commandType` | property | <code>commandType: "user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session"</code> | Public command Type property. |
| `disposition` | property | <code>disposition: SessionCommandWorkerDisposition</code> | Public disposition property. |
| `rejectionCode` | property | <code>rejectionCode: string</code> | Public rejection Code property. |
