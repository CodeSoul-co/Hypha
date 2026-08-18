# `@codesoul-co/hypha-core` / `modules/runtime/resource-coordinator`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/resource-coordinator.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/resource-coordinator.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryRuntimeResourceCoordinator` | class | <code>new InMemoryRuntimeResourceCoordinator(options: InMemoryRuntimeResourceCoordinatorOptions): InMemoryRuntimeResourceCoordinator</code> | Runtime implementation for In Memory Runtime Resource Coordinator; see its public constructor and members below. |
| `resourceClaimGuard` | function | <code>resourceClaimGuard(claim: RuntimeResourceClaim): { claimId: string; ownerId: string; fencingToken: number; }</code> | Public runtime operation for resource Claim Guard. |
| `InMemoryRuntimeResourceCoordinatorOptions` | interface | <code>interface InMemoryRuntimeResourceCoordinatorOptions</code> | Field contract for In Memory Runtime Resource Coordinator Options; see all contract members below. |

## `InMemoryRuntimeResourceCoordinator` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: ResourceAcquireRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public runtime operation for acquire. |
| `assertCurrent` | method | <code>assertCurrent(request: ResourceClaimAssertionRequest): Promise&lt;RuntimeResourceClaim&gt;</code> | Asserts Current at this module boundary. |
| `constructor` | constructor | <code>(options: InMemoryRuntimeResourceCoordinatorOptions): InMemoryRuntimeResourceCoordinator</code> | Creates an instance of this class. |
| `list` | method | <code>list(request: ResourceListRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Lists list at this module boundary. |
| `release` | method | <code>release(request: ResourceReleaseRequest): Promise&lt;void&gt;</code> | Public runtime operation for release. |
| `renew` | method | <code>renew(request: ResourceRenewRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public runtime operation for renew. |

## `InMemoryRuntimeResourceCoordinatorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runLeaseStore` | property | <code>runLeaseStore: Pick&lt;RunLeaseStore, "assertCurrent"&gt;</code> | Public run Lease Store property. |
