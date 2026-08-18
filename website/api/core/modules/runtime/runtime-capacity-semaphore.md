# `@codesoul-co/hypha-core` / `modules/runtime/runtime-capacity-semaphore`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-capacity-semaphore.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-capacity-semaphore.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryRuntimeCapacitySemaphore` | class | <code>new InMemoryRuntimeCapacitySemaphore(options: InMemoryRuntimeCapacitySemaphoreOptions): InMemoryRuntimeCapacitySemaphore</code> | Runtime implementation for In Memory Runtime Capacity Semaphore; see its public constructor and members below. |
| `InMemoryRuntimeCapacitySemaphoreOptions` | interface | <code>interface InMemoryRuntimeCapacitySemaphoreOptions</code> | Field contract for In Memory Runtime Capacity Semaphore Options; see all contract members below. |

## `InMemoryRuntimeCapacitySemaphore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: RuntimeCapacityAcquireRequest): Promise&lt;RuntimeCapacityLease &#124; null&gt;</code> | Public runtime operation for acquire. |
| `assertCurrent` | method | <code>assertCurrent(request: RuntimeCapacityAssertionRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | Asserts Current at this module boundary. |
| `constructor` | constructor | <code>(options: InMemoryRuntimeCapacitySemaphoreOptions): InMemoryRuntimeCapacitySemaphore</code> | Creates an instance of this class. |
| `release` | method | <code>release(request: RuntimeCapacityReleaseRequest): Promise&lt;void&gt;</code> | Public runtime operation for release. |
| `renew` | method | <code>renew(request: RuntimeCapacityRenewRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | Public runtime operation for renew. |
| `usage` | method | <code>usage(request: RuntimeCapacityUsageRequest): Promise&lt;RuntimeCapacityUsage&gt;</code> | Public runtime operation for usage. |

## `InMemoryRuntimeCapacitySemaphoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `policy` | property | <code>policy: RuntimeCapacityPolicy</code> | Public policy property. |
