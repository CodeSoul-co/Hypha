# `@codesoul-co/hypha-core` / `contracts/runtime-timer`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-timer.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_TIMER_SWEEP_DISPOSITIONS` | constant | <code>const RUNTIME_TIMER_SWEEP_DISPOSITIONS: readonly ["fired", "not_due", "lease_unavailable", "already_resolved"]</code> | RUNTIME TIMER SWEEP DISPOSITIONS constant exported by the `contracts/runtime-timer` module. |
| `RuntimeTimerStreamScope` | interface | <code>interface RuntimeTimerStreamScope</code> | Field contract for Runtime Timer Stream Scope; see all contract members below. |
| `RuntimeTimerSweepRequest` | interface | <code>interface RuntimeTimerSweepRequest</code> | Field contract for Runtime Timer Sweep Request; see all contract members below. |
| `RuntimeTimerSweepResult` | interface | <code>interface RuntimeTimerSweepResult</code> | Field contract for Runtime Timer Sweep Result; see all contract members below. |
| `RuntimeTimerSweepRunResult` | interface | <code>interface RuntimeTimerSweepRunResult</code> | Field contract for Runtime Timer Sweep Run Result; see all contract members below. |
| `RuntimeTimerSweepDisposition` | type | <code>type RuntimeTimerSweepDisposition = (typeof RUNTIME_TIMER_SWEEP_DISPOSITIONS)[number]</code> | Public type alias for Runtime Timer Sweep Disposition. |

## `RuntimeTimerStreamScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `RuntimeTimerSweepRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cursor` | property | <code>cursor: string</code> | Public cursor property. |
| `firedAt` | property | <code>firedAt: string</code> | Public fired At property. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public lease Ttl Ms property. |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |

## `RuntimeTimerSweepResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `alreadyResolved` | property | <code>alreadyResolved: number</code> | Public already Resolved property. |
| `fired` | property | <code>fired: number</code> | Public fired property. |
| `leaseUnavailable` | property | <code>leaseUnavailable: number</code> | Public lease Unavailable property. |
| `nextCursor` | property | <code>nextCursor: string</code> | Public next Cursor property. |
| `notDue` | property | <code>notDue: number</code> | Public not Due property. |
| `results` | property | <code>results: RuntimeTimerSweepRunResult[]</code> | Public results property. |
| `scanned` | property | <code>scanned: number</code> | Public scanned property. |

## `RuntimeTimerSweepRunResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `disposition` | property | <code>disposition: "lease_unavailable" &#124; "fired" &#124; "not_due" &#124; "already_resolved"</code> | Public disposition property. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public event Ids property. |
| `scope` | property | <code>scope: RuntimeTimerStreamScope</code> | Public scope property. |
