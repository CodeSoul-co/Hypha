# `@codesoul-co/hypha-core` / `contracts/runtime-cancellation`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-cancellation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)
- Exports: **18**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_CANCELLATION_DISPOSITIONS` | constant | <code>const RUNTIME_CANCELLATION_DISPOSITIONS: readonly ["applied", "reused"]</code> | RUNTIME CANCELLATION DISPOSITIONS constant exported by the `contracts/runtime-cancellation` module. |
| `RUNTIME_CANCELLATION_PROPAGATIONS` | constant | <code>const RUNTIME_CANCELLATION_PROPAGATIONS: readonly ["none", "children", "all_descendants"]</code> | RUNTIME CANCELLATION PROPAGATIONS constant exported by the `contracts/runtime-cancellation` module. |
| `RUNTIME_CANCELLATION_TARGET_STATUSES` | constant | <code>const RUNTIME_CANCELLATION_TARGET_STATUSES: readonly ["cancelled", "already_terminal", "not_found", "failed"]</code> | RUNTIME CANCELLATION TARGET STATUSES constant exported by the `contracts/runtime-cancellation` module. |
| `RUNTIME_CANCELLATION_TARGET_TYPES` | constant | <code>const RUNTIME_CANCELLATION_TARGET_TYPES: readonly ["activity", "child_run", "session_command"]</code> | RUNTIME CANCELLATION TARGET TYPES constant exported by the `contracts/runtime-cancellation` module. |
| `RuntimeActivityCancellationPort` | interface | <code>interface RuntimeActivityCancellationPort</code> | Field contract for Runtime Activity Cancellation Port; see all contract members below. |
| `RuntimeActivityCancellationRequest` | interface | <code>interface RuntimeActivityCancellationRequest</code> | Field contract for Runtime Activity Cancellation Request; see all contract members below. |
| `RuntimeCancelCommand` | interface | <code>interface RuntimeCancelCommand</code> | Field contract for Runtime Cancel Command; see all contract members below. |
| `RuntimeCancellationPolicy` | interface | <code>interface RuntimeCancellationPolicy</code> | Field contract for Runtime Cancellation Policy; see all contract members below. |
| `RuntimeCancellationTargetResult` | interface | <code>interface RuntimeCancellationTargetResult</code> | Field contract for Runtime Cancellation Target Result; see all contract members below. |
| `RuntimeCancelResult` | interface | <code>interface RuntimeCancelResult</code> | Field contract for Runtime Cancel Result; see all contract members below. |
| `RuntimeChildRunCancellationPort` | interface | <code>interface RuntimeChildRunCancellationPort</code> | Field contract for Runtime Child Run Cancellation Port; see all contract members below. |
| `RuntimeChildRunCancellationRequest` | interface | <code>interface RuntimeChildRunCancellationRequest</code> | Field contract for Runtime Child Run Cancellation Request; see all contract members below. |
| `RuntimeChildRunListRequest` | interface | <code>interface RuntimeChildRunListRequest</code> | Field contract for Runtime Child Run List Request; see all contract members below. |
| `RuntimeChildRunReference` | interface | <code>interface RuntimeChildRunReference</code> | Field contract for Runtime Child Run Reference; see all contract members below. |
| `RuntimeCancellationDisposition` | type | <code>type RuntimeCancellationDisposition = (typeof RUNTIME_CANCELLATION_DISPOSITIONS)[number]</code> | Public type alias for Runtime Cancellation Disposition. |
| `RuntimeCancellationPropagation` | type | <code>type RuntimeCancellationPropagation = (typeof RUNTIME_CANCELLATION_PROPAGATIONS)[number]</code> | Public type alias for Runtime Cancellation Propagation. |
| `RuntimeCancellationTargetStatus` | type | <code>type RuntimeCancellationTargetStatus = (typeof RUNTIME_CANCELLATION_TARGET_STATUSES)[number]</code> | Public type alias for Runtime Cancellation Target Status. |
| `RuntimeCancellationTargetType` | type | <code>type RuntimeCancellationTargetType = (typeof RUNTIME_CANCELLATION_TARGET_TYPES)[number]</code> | Public type alias for Runtime Cancellation Target Type. |

## `RuntimeActivityCancellationPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(request: RuntimeActivityCancellationRequest): Promise&lt;RuntimeCancellationTargetResult&gt;</code> | Cancels cancel at this module boundary. |

## `RuntimeActivityCancellationRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public activity Id property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |

## `RuntimeCancelCommand` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public lease Ttl Ms property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `policy` | property | <code>policy: RuntimeCancellationPolicy</code> | Public policy property. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public principal property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |

## `RuntimeCancellationPolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancelRunningActivities` | property | <code>cancelRunningActivities: boolean</code> | Public cancel Running Activities property. |
| `propagation` | property | <code>propagation: "none" &#124; "children" &#124; "all_descendants"</code> | Public propagation property. |
| `waitGraceMs` | property | <code>waitGraceMs: number</code> | Public wait Grace Ms property. |

## `RuntimeCancellationTargetResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error: NormalizedRuntimeError</code> | Public error property. |
| `status` | property | <code>status: "cancelled" &#124; "failed" &#124; "not_found" &#124; "already_terminal"</code> | Public status property. |
| `targetId` | property | <code>targetId: string</code> | Public target Id property. |
| `targetType` | property | <code>targetType: "activity" &#124; "child_run" &#124; "session_command"</code> | Public target Type property. |

## `RuntimeCancelResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `disposition` | property | <code>disposition: "applied" &#124; "reused"</code> | Public disposition property. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public event Ids property. |
| `projection` | property | <code>projection: RuntimeOrchestrationProjection</code> | Public projection property. |
| `targetResults` | property | <code>targetResults: RuntimeCancellationTargetResult[]</code> | Public target Results property. |
| `unresolvedActivityIds` | property | <code>unresolvedActivityIds: string[]</code> | Public unresolved Activity Ids property. |

## `RuntimeChildRunCancellationPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(request: RuntimeChildRunCancellationRequest): Promise&lt;RuntimeCancellationTargetResult&gt;</code> | Cancels cancel at this module boundary. |
| `listChildren` | method | <code>listChildren(request: RuntimeChildRunListRequest): Promise&lt;RuntimeChildRunReference[]&gt;</code> | Lists Children at this module boundary. |

## `RuntimeChildRunCancellationRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `childRunId` | property | <code>childRunId: string</code> | Public child Run Id property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `parentScope` | property | <code>parentScope: RuntimeScope</code> | Public parent Scope property. |
| `propagation` | property | <code>propagation: "children" &#124; "all_descendants"</code> | Public propagation property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |

## `RuntimeChildRunListRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |

## `RuntimeChildRunReference` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
