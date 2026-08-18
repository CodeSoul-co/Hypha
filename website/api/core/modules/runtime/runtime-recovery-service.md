# `@codesoul-co/hypha-core` / `modules/runtime/runtime-recovery-service`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-recovery-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-recovery-service.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeRecoveryService` | class | <code>new RuntimeRecoveryService(options: RuntimeRecoveryServiceOptions): RuntimeRecoveryService</code> | Runtime implementation for Runtime Recovery Service; see its public constructor and members below. |
| `RuntimeActivityRedispatchRecoveryPort` | interface | <code>interface RuntimeActivityRedispatchRecoveryPort</code> | Field contract for Runtime Activity Redispatch Recovery Port; see all contract members below. |
| `RuntimeRecoveryServiceOptions` | interface | <code>interface RuntimeRecoveryServiceOptions</code> | Field contract for Runtime Recovery Service Options; see all contract members below. |

## `RuntimeRecoveryService` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeRecoveryServiceOptions): RuntimeRecoveryService</code> | Creates an instance of this class. |
| `recover` | method | <code>recover(input: RuntimeRecoveryCommand): Promise&lt;RuntimeRecoveryResult&gt;</code> | Public runtime operation for recover. |
| `scan` | method | <code>scan(input: RuntimeRecoveryScanRequest): Promise&lt;RuntimeRecoveryScanResult&gt;</code> | Public runtime operation for scan. |

## `RuntimeActivityRedispatchRecoveryPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `redispatch` | method | <code>redispatch(command: RuntimeActivityRedispatchCommand): Promise&lt;RuntimeActivityRedispatchResult&gt;</code> | Public runtime operation for redispatch. |

## `RuntimeRecoveryServiceOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activities` | property | <code>activities: RuntimeActivityReconciliationPort</code> | Public activities property. |
| `cancellations` | property | <code>cancellations: RuntimeCancellationRecoveryPort</code> | Public cancellations property. |
| `events` | property | <code>events: EventRuntime</code> | Public events property. |
| `nextId` | method | <code>nextId(namespace: string): string</code> | Public runtime operation for next Id. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public projections property. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public projection Store property. |
| `redispatches` | property | <code>redispatches: RuntimeActivityRedispatchRecoveryPort</code> | Public redispatches property. |
| `requeue` | property | <code>requeue: RuntimeRecoveryRequeuePort</code> | Public requeue property. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public run Leases property. |
| `stateClaims` | property | <code>stateClaims: StateExecutionClaimStore</code> | Public state Claims property. |
