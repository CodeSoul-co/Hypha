# `@codesoul-co/hypha-core` / `modules/runtime/runtime-human-wait-service`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-human-wait-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeHumanWaitService` | class | <code>new RuntimeHumanWaitService(options: RuntimeHumanWaitServiceOptions): RuntimeHumanWaitService</code> | Runtime implementation for Runtime Human Wait Service; see its public constructor and members below. |
| `RuntimeHumanWaitCreateCommand` | interface | <code>interface RuntimeHumanWaitCreateCommand</code> | Field contract for Runtime Human Wait Create Command; see all contract members below. |
| `RuntimeHumanWaitResolveCommand` | interface | <code>interface RuntimeHumanWaitResolveCommand</code> | Field contract for Runtime Human Wait Resolve Command; see all contract members below. |
| `RuntimeHumanWaitResult` | interface | <code>interface RuntimeHumanWaitResult</code> | Field contract for Runtime Human Wait Result; see all contract members below. |
| `RuntimeHumanWaitServiceOptions` | interface | <code>interface RuntimeHumanWaitServiceOptions</code> | Field contract for Runtime Human Wait Service Options; see all contract members below. |
| `RuntimeHumanWaitSupersedeCommand` | interface | <code>interface RuntimeHumanWaitSupersedeCommand</code> | Field contract for Runtime Human Wait Supersede Command; see all contract members below. |

## `RuntimeHumanWaitService` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeHumanWaitServiceOptions): RuntimeHumanWaitService</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: RuntimeHumanWaitCreateCommand): Promise&lt;RuntimeHumanWaitResult&gt;</code> | Creates create at this module boundary. |
| `resolve` | method | <code>resolve(input: RuntimeHumanWaitResolveCommand): Promise&lt;RuntimeHumanWaitResult&gt;</code> | Resolves resolve at this module boundary. |
| `supersede` | method | <code>supersede(input: RuntimeHumanWaitSupersedeCommand): Promise&lt;RuntimeHumanWaitResult&gt;</code> | Public runtime operation for supersede. |

## `RuntimeHumanWaitCreateCommand` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `humanTasks` | property | <code>humanTasks: RuntimeHumanTaskRequest[]</code> | Public human Tasks property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public lease Ttl Ms property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `pendingActionRef` | property | <code>pendingActionRef: string</code> | Public pending Action Ref property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `waitId` | property | <code>waitId: string</code> | Public wait Id property. |

## `RuntimeHumanWaitResolveCommand` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `decision` | property | <code>decision: "rejected" &#124; "cancelled" &#124; "expired" &#124; "approved"</code> | Public decision property. |
| `humanTaskDecision` | property | <code>humanTaskDecision: RuntimeHumanTaskDecisionCommand</code> | Public human Task Decision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public lease Ttl Ms property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `pendingActionRef` | property | <code>pendingActionRef: string</code> | Public pending Action Ref property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `resolvedAt` | property | <code>resolvedAt: string</code> | Public resolved At property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `waitId` | property | <code>waitId: string</code> | Public wait Id property. |

## `RuntimeHumanWaitResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `disposition` | property | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | Public disposition property. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public event Ids property. |
| `projection` | property | <code>projection: RuntimeOrchestrationProjection</code> | Public projection property. |
| `runRevision` | property | <code>runRevision: number</code> | Public run Revision property. |

## `RuntimeHumanWaitServiceOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: EventRuntime</code> | Public events property. |
| `nextId` | method | <code>nextId(namespace: string): string</code> | Public runtime operation for next Id. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public projections property. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public projection Store property. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public run Leases property. |

## `RuntimeHumanWaitSupersedeCommand` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `humanTaskDecision` | property | <code>humanTaskDecision: RuntimeHumanTaskDecisionCommand</code> | Public human Task Decision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public lease Ttl Ms property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `pendingActionRef` | property | <code>pendingActionRef: string</code> | Public pending Action Ref property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `replacementTask` | property | <code>replacementTask: RuntimeHumanTaskRequest</code> | Public replacement Task property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `supersededAt` | property | <code>supersededAt: string</code> | Public superseded At property. |
| `waitId` | property | <code>waitId: string</code> | Public wait Id property. |
