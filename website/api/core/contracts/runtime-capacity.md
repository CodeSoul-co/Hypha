# `@codesoul-co/hypha-core` / `contracts/runtime-capacity`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-capacity.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)
- Exports: **14**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_CAPACITY_KINDS` | constant | <code>const RUNTIME_CAPACITY_KINDS: readonly ["model", "tool", "execution"]</code> | RUNTIME CAPACITY KINDS constant exported by the `contracts/runtime-capacity` module. |
| `RuntimeCapacityAcquireRequest` | interface | <code>interface RuntimeCapacityAcquireRequest extends RuntimeCapacityScope</code> | Field contract for Runtime Capacity Acquire Request; see all contract members below. |
| `RuntimeCapacityAssertionRequest` | interface | <code>interface RuntimeCapacityAssertionRequest</code> | Field contract for Runtime Capacity Assertion Request; see all contract members below. |
| `RuntimeCapacityLease` | interface | <code>interface RuntimeCapacityLease extends RuntimeCapacityScope</code> | Field contract for Runtime Capacity Lease; see all contract members below. |
| `RuntimeCapacityLeaseGuard` | interface | <code>interface RuntimeCapacityLeaseGuard</code> | Field contract for Runtime Capacity Lease Guard; see all contract members below. |
| `RuntimeCapacityLimit` | interface | <code>interface RuntimeCapacityLimit</code> | Field contract for Runtime Capacity Limit; see all contract members below. |
| `RuntimeCapacityPolicy` | interface | <code>interface RuntimeCapacityPolicy</code> | Field contract for Runtime Capacity Policy; see all contract members below. |
| `RuntimeCapacityReleaseRequest` | interface | <code>interface RuntimeCapacityReleaseRequest</code> | Field contract for Runtime Capacity Release Request; see all contract members below. |
| `RuntimeCapacityRenewRequest` | interface | <code>interface RuntimeCapacityRenewRequest</code> | Field contract for Runtime Capacity Renew Request; see all contract members below. |
| `RuntimeCapacityScope` | interface | <code>interface RuntimeCapacityScope</code> | Field contract for Runtime Capacity Scope; see all contract members below. |
| `RuntimeCapacitySemaphore` | interface | <code>interface RuntimeCapacitySemaphore</code> | Field contract for Runtime Capacity Semaphore; see all contract members below. |
| `RuntimeCapacityUsage` | interface | <code>interface RuntimeCapacityUsage</code> | Field contract for Runtime Capacity Usage; see all contract members below. |
| `RuntimeCapacityUsageRequest` | interface | <code>interface RuntimeCapacityUsageRequest</code> | Field contract for Runtime Capacity Usage Request; see all contract members below. |
| `RuntimeCapacityKind` | type | <code>type RuntimeCapacityKind = (typeof RUNTIME_CAPACITY_KINDS)[number]</code> | Public type alias for Runtime Capacity Kind. |

## `RuntimeCapacityAcquireRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public acquired At property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `kind` | property | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | Public kind property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `requestedLeaseId` | property | <code>requestedLeaseId: string</code> | Public requested Lease Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `RuntimeCapacityAssertionRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `guard` | property | <code>guard: RuntimeCapacityLeaseGuard</code> | Public guard property. |
| `kind` | property | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | Public kind property. |
| `scope` | property | <code>scope: RuntimeCapacityScope</code> | Public scope property. |

## `RuntimeCapacityLease` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public acquired At property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `heartbeatAt` | property | <code>heartbeatAt: string</code> | Public heartbeat At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `kind` | property | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | Public kind property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `RuntimeCapacityLeaseGuard` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `leaseId` | property | <code>leaseId: string</code> | Public lease Id property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |

## `RuntimeCapacityLimit` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `global` | property | <code>global: number</code> | Public global property. |
| `perUser` | property | <code>perUser: number</code> | Public per User property. |

## `RuntimeCapacityPolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `limits` | property | <code>limits: Record&lt;"tool" &#124; "model" &#124; "execution", RuntimeCapacityLimit&gt;</code> | Public limits property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |

## `RuntimeCapacityReleaseRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guard` | property | <code>guard: RuntimeCapacityLeaseGuard</code> | Public guard property. |
| `kind` | property | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | Public kind property. |
| `releasedAt` | property | <code>releasedAt: string</code> | Public released At property. |
| `scope` | property | <code>scope: RuntimeCapacityScope</code> | Public scope property. |

## `RuntimeCapacityRenewRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guard` | property | <code>guard: RuntimeCapacityLeaseGuard</code> | Public guard property. |
| `kind` | property | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | Public kind property. |
| `renewedAt` | property | <code>renewedAt: string</code> | Public renewed At property. |
| `scope` | property | <code>scope: RuntimeCapacityScope</code> | Public scope property. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |

## `RuntimeCapacityScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `RuntimeCapacitySemaphore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: RuntimeCapacityAcquireRequest): Promise&lt;RuntimeCapacityLease &#124; null&gt;</code> | Public runtime operation for acquire. |
| `assertCurrent` | method | <code>assertCurrent(request: RuntimeCapacityAssertionRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | Asserts Current at this module boundary. |
| `release` | method | <code>release(request: RuntimeCapacityReleaseRequest): Promise&lt;void&gt;</code> | Public runtime operation for release. |
| `renew` | method | <code>renew(request: RuntimeCapacityRenewRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | Public runtime operation for renew. |
| `usage` | method | <code>usage(request: RuntimeCapacityUsageRequest): Promise&lt;RuntimeCapacityUsage&gt;</code> | Public runtime operation for usage. |

## `RuntimeCapacityUsage` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `globalActive` | property | <code>globalActive: number</code> | Public global Active property. |
| `globalLimit` | property | <code>globalLimit: number</code> | Public global Limit property. |
| `kind` | property | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | Public kind property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `userActive` | property | <code>userActive: number</code> | Public user Active property. |
| `userLimit` | property | <code>userLimit: number</code> | Public user Limit property. |

## `RuntimeCapacityUsageRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `kind` | property | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | Public kind property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
