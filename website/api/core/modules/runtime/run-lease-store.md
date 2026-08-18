# `@codesoul-co/hypha-core` / `modules/runtime/run-lease-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/run-lease-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-lease-store.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryRunLeaseStore` | class | <code>new InMemoryRunLeaseStore(options?: InMemoryRunLeaseStoreOptions): InMemoryRunLeaseStore</code> | Runtime implementation for In Memory Run Lease Store; see its public constructor and members below. |
| `runLeaseGuard` | function | <code>runLeaseGuard(lease: FencedRunLease): { leaseId: string; ownerId: string; fencingToken: number; }</code> | Public runtime operation for run Lease Guard. |
| `runLeaseScopeKey` | function | <code>runLeaseScopeKey(scope: RunLeaseScope): string</code> | Public runtime operation for run Lease Scope Key. |
| `InMemoryRunLeaseStoreOptions` | interface | <code>interface InMemoryRunLeaseStoreOptions</code> | Field contract for In Memory Run Lease Store Options; see all contract members below. |

## `InMemoryRunLeaseStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: RunLeaseAcquireRequest): Promise&lt;FencedRunLease &#124; null&gt;</code> | Public runtime operation for acquire. |
| `assertCurrent` | method | <code>assertCurrent(request: RunLeaseAssertionRequest): Promise&lt;FencedRunLease&gt;</code> | Asserts Current at this module boundary. |
| `constructor` | constructor | <code>(options?: InMemoryRunLeaseStoreOptions): InMemoryRunLeaseStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scope: RunLeaseScope, checkedAt?: string): Promise&lt;FencedRunLease &#124; null&gt;</code> | Gets get at this module boundary. |
| `heartbeat` | method | <code>heartbeat(request: RunLeaseHeartbeatRequest): Promise&lt;FencedRunLease&gt;</code> | Public runtime operation for heartbeat. |
| `preempt` | method | <code>preempt(request: RunLeasePreemptRequest): Promise&lt;FencedRunLease&gt;</code> | Public runtime operation for preempt. |
| `release` | method | <code>release(request: RunLeaseReleaseRequest): Promise&lt;void&gt;</code> | Public runtime operation for release. |

## `InMemoryRunLeaseStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
