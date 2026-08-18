# `@codesoul-co/hypha-core` / `modules/runtime/runtime-activity-redispatch-service`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeActivityRedispatchService` | class | <code>new RuntimeActivityRedispatchService(options: RuntimeActivityRedispatchServiceOptions): RuntimeActivityRedispatchService</code> | Revalidates approved HumanTask evidence, records redispatch intent, invokes an Owner-provided idempotent Activity dispatcher, and persists acceptance. An intent without a receipt is reconciled before any retry is dispatched. |
| `runtimeActivityRedispatchIdentity` | function | <code>runtimeActivityRedispatchIdentity(command: Pick&lt;RuntimeActivityRedispatchCommand, "scope" &#124; "taskId" &#124; "expectedTaskRevision"&gt;): string</code> | Public runtime operation for runtime Activity Redispatch Identity. |
| `RuntimeActivityRedispatchAttempt` | interface | <code>interface RuntimeActivityRedispatchAttempt</code> | Field contract for Runtime Activity Redispatch Attempt; see all contract members below. |
| `RuntimeActivityRedispatchCommand` | interface | <code>interface RuntimeActivityRedispatchCommand extends RuntimeActivityDescriptorReference</code> | Field contract for Runtime Activity Redispatch Command; see all contract members below. |
| `RuntimeActivityRedispatchPort` | interface | <code>interface RuntimeActivityRedispatchPort</code> | Field contract for Runtime Activity Redispatch Port; see all contract members below. |
| `RuntimeActivityRedispatchResult` | interface | <code>interface RuntimeActivityRedispatchResult</code> | Field contract for Runtime Activity Redispatch Result; see all contract members below. |
| `RuntimeActivityRedispatchServiceOptions` | interface | <code>interface RuntimeActivityRedispatchServiceOptions</code> | Field contract for Runtime Activity Redispatch Service Options; see all contract members below. |
| `RuntimeActivityRevisionValidator` | interface | <code>interface RuntimeActivityRevisionValidator</code> | Field contract for Runtime Activity Revision Validator; see all contract members below. |
| `RuntimeActivityRedispatchReconciliation` | type | <code>type RuntimeActivityRedispatchReconciliation = { status: 'accepted'; commandId: string; } &#124; { status: 'safe_to_dispatch'; } &#124; { status: 'unknown'; reason: string; }</code> | Public type alias for Runtime Activity Redispatch Reconciliation. |

## `RuntimeActivityRedispatchService` public members

Revalidates approved HumanTask evidence, records redispatch intent, invokes an Owner-provided idempotent Activity dispatcher, and persists acceptance. An intent without a receipt is reconciled before any retry is dispatched.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeActivityRedispatchServiceOptions): RuntimeActivityRedispatchService</code> | Creates an instance of this class. |
| `redispatch` | method | <code>redispatch(command: RuntimeActivityRedispatchCommand): Promise&lt;RuntimeActivityRedispatchResult&gt;</code> | Public runtime operation for redispatch. |

## `RuntimeActivityRedispatchAttempt` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalEventId` | property | <code>approvalEventId: string</code> | Public approval Event Id property. |
| `descriptor` | property | <code>descriptor: Readonly&lt;RuntimeActivityDescriptor&gt;</code> | Public descriptor property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `redispatchCommandId` | property | <code>redispatchCommandId: string</code> | Public redispatch Command Id property. |
| `redispatchIdempotencyKey` | property | <code>redispatchIdempotencyKey: string</code> | Public redispatch Idempotency Key property. |
| `requestEventId` | property | <code>requestEventId: string</code> | Public request Event Id property. |
| `scope` | property | <code>scope: Readonly&lt;RuntimeScope&gt;</code> | Public scope property. |
| `signal` | property | <code>signal: AbortSignal</code> | Public signal property. |
| `task` | property | <code>task: Readonly&lt;RuntimeHumanTask&gt;</code> | Public task property. |

## `RuntimeActivityRedispatchCommand` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityDescriptorHash` | property | <code>activityDescriptorHash: string</code> | Public activity Descriptor Hash property. |
| `activityDescriptorRef` | property | <code>activityDescriptorRef: string</code> | Public activity Descriptor Ref property. |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `expectedSubjectHash` | property | <code>expectedSubjectHash: string</code> | Public expected Subject Hash property. |
| `expectedTaskRevision` | property | <code>expectedTaskRevision: number</code> | Public expected Task Revision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public lease Ttl Ms property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `signal` | property | <code>signal: AbortSignal</code> | Public signal property. |
| `taskId` | property | <code>taskId: string</code> | Public task Id property. |

## `RuntimeActivityRedispatchPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dispatch` | method | <code>dispatch(input: RuntimeActivityRedispatchAttempt): Promise&lt;{ commandId: string; reused: boolean; }&gt;</code> | Public runtime operation for dispatch. |
| `reconcile` | method | <code>reconcile(input: RuntimeActivityRedispatchAttempt): Promise&lt;RuntimeActivityRedispatchReconciliation&gt;</code> | Resolves the crash window between an accepted external dispatch and its durable Runtime receipt. `safe_to_dispatch` is an authoritative absence result; uncertainty must be returned as `unknown`. |

## `RuntimeActivityRedispatchResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityCommandId` | property | <code>activityCommandId: string</code> | Public activity Command Id property. |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `commandReused` | property | <code>commandReused: boolean</code> | Public command Reused property. |
| `eventReused` | property | <code>eventReused: boolean</code> | Public event Reused property. |
| `receiptEventId` | property | <code>receiptEventId: string</code> | Public receipt Event Id property. |
| `receiptReused` | property | <code>receiptReused: boolean</code> | Public receipt Reused property. |
| `reconciled` | property | <code>reconciled: boolean</code> | Public reconciled property. |
| `requestEventId` | property | <code>requestEventId: string</code> | Public request Event Id property. |

## `RuntimeActivityRedispatchServiceOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `descriptors` | property | <code>descriptors: RuntimeActivityDescriptorStore</code> | Public descriptors property. |
| `dispatcher` | property | <code>dispatcher: RuntimeActivityRedispatchPort</code> | Public dispatcher property. |
| `events` | property | <code>events: EventRuntime</code> | Public events property. |
| `monotonicNow` | method | <code>monotonicNow(): number</code> | Public runtime operation for monotonic Now. |
| `nextId` | method | <code>nextId(namespace: string): string</code> | Public runtime operation for next Id. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `onLeaseRenewalFailure` | method | <code>onLeaseRenewalFailure(error: unknown, commandId: string): void</code> | Handles Lease Renewal Failure at this module boundary. |
| `operationalTelemetry` | property | <code>operationalTelemetry: RuntimeOperationalTelemetry</code> | Public operational Telemetry property. |
| `renewalIntervalMs` | property | <code>renewalIntervalMs: number</code> | Public renewal Interval Ms property. |
| `revisions` | property | <code>revisions: RuntimeActivityRevisionValidator</code> | Public revisions property. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public run Leases property. |
| `wait` | method | <code>wait(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | Public runtime operation for wait. |

## `RuntimeActivityRevisionValidator` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `validate` | method | <code>validate(input: { task: Readonly&lt;RuntimeHumanTask&gt;; descriptor: Readonly&lt;RuntimeActivityDescriptor&gt;; }): Promise&lt;void&gt;</code> | Validates validate at this module boundary. |
