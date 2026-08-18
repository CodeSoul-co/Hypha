# `@codesoul-co/hypha-core` / `contracts/runtime-control`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-control.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_CONTROL_DISPOSITIONS` | constant | <code>const RUNTIME_CONTROL_DISPOSITIONS: readonly ["applied", "reused", "lease_unavailable"]</code> | RUNTIME CONTROL DISPOSITIONS constant exported by the `contracts/runtime-control` module. |
| `RUNTIME_CONTROL_KINDS` | constant | <code>const RUNTIME_CONTROL_KINDS: readonly ["pause", "resume", "signal"]</code> | RUNTIME CONTROL KINDS constant exported by the `contracts/runtime-control` module. |
| `RuntimePauseCommand` | interface | <code>interface RuntimePauseCommand extends RuntimeRunControlCommandBase</code> | Field contract for Runtime Pause Command; see all contract members below. |
| `RuntimeResumeCommand` | interface | <code>interface RuntimeResumeCommand extends RuntimeRunControlCommandBase</code> | Field contract for Runtime Resume Command; see all contract members below. |
| `RuntimeRunControlResult` | interface | <code>interface RuntimeRunControlResult</code> | Field contract for Runtime Run Control Result; see all contract members below. |
| `RuntimeSignalCommand` | interface | <code>interface RuntimeSignalCommand extends RuntimeRunControlCommandBase</code> | Field contract for Runtime Signal Command; see all contract members below. |
| `RuntimeControlDisposition` | type | <code>type RuntimeControlDisposition = (typeof RUNTIME_CONTROL_DISPOSITIONS)[number]</code> | Public type alias for Runtime Control Disposition. |
| `RuntimeControlKind` | type | <code>type RuntimeControlKind = (typeof RUNTIME_CONTROL_KINDS)[number]</code> | Public type alias for Runtime Control Kind. |
| `RuntimeRunControlCommand` | type | <code>type RuntimeRunControlCommand = RuntimePauseCommand &#124; RuntimeResumeCommand &#124; RuntimeSignalCommand</code> | Public type alias for Runtime Run Control Command. |

## `RuntimePauseCommand` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `kind` | property | <code>kind: "pause"</code> | Public kind property. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public lease Ttl Ms property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public principal property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `resumeKey` | property | <code>resumeKey: string</code> | Public resume Key property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |

## `RuntimeResumeCommand` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `kind` | property | <code>kind: "resume"</code> | Public kind property. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public lease Ttl Ms property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `payload` | property | <code>payload: RuntimeJsonValue</code> | Public payload property. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public principal property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |

## `RuntimeRunControlResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `disposition` | property | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | Public disposition property. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public event Ids property. |
| `kind` | property | <code>kind: "signal" &#124; "resume" &#124; "pause"</code> | Public kind property. |
| `projection` | property | <code>projection: RuntimeOrchestrationProjection</code> | Public projection property. |
| `runRevision` | property | <code>runRevision: number</code> | Public run Revision property. |

## `RuntimeSignalCommand` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `kind` | property | <code>kind: "signal"</code> | Public kind property. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public lease Ttl Ms property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `payload` | property | <code>payload: RuntimeJsonValue</code> | Public payload property. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public principal property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `sentAt` | property | <code>sentAt: string</code> | Public sent At property. |
