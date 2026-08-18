# `@codesoul-co/hypha-adapters-local` / `runtime-capacity-semaphore`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/runtime-capacity-semaphore.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-capacity-semaphore.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteRuntimeCapacitySemaphore` | class | <code>new SQLiteRuntimeCapacitySemaphore(options: SQLiteRuntimeCapacitySemaphoreOptions): SQLiteRuntimeCapacitySemaphore</code> | Runtime implementation for SQ Lite Runtime Capacity Semaphore; see its public constructor and members below. |
| `SQLiteRuntimeCapacitySemaphoreOptions` | interface | <code>interface SQLiteRuntimeCapacitySemaphoreOptions</code> | Field contract for SQ Lite Runtime Capacity Semaphore Options; see all contract members below. |

## `SQLiteRuntimeCapacitySemaphore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: RuntimeCapacityAcquireRequest): Promise&lt;RuntimeCapacityLease &#124; null&gt;</code> | Public runtime operation for acquire. |
| `assertCurrent` | method | <code>assertCurrent(request: RuntimeCapacityAssertionRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | Asserts Current at this module boundary. |
| `close` | method | <code>close(): void</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: SQLiteRuntimeCapacitySemaphoreOptions): SQLiteRuntimeCapacitySemaphore</code> | Creates an instance of this class. |
| `release` | method | <code>release(request: RuntimeCapacityReleaseRequest): Promise&lt;void&gt;</code> | Public runtime operation for release. |
| `renew` | method | <code>renew(request: RuntimeCapacityRenewRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | Public runtime operation for renew. |
| `usage` | method | <code>usage(request: RuntimeCapacityUsageRequest): Promise&lt;RuntimeCapacityUsage&gt;</code> | Public runtime operation for usage. |

## `SQLiteRuntimeCapacitySemaphoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public filename property. |
| `policy` | property | <code>policy: RuntimeCapacityPolicy</code> | Public policy property. |
