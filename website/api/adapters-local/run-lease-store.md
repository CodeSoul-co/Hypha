# `@codesoul-co/hypha-adapters-local` / `run-lease-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/run-lease-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/run-lease-store.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteRunLeaseStore` | class | <code>new SQLiteRunLeaseStore(options: SQLiteRunLeaseStoreOptions): SQLiteRunLeaseStore</code> | Runtime implementation for SQ Lite Run Lease Store; see its public constructor and members below. |
| `SQLiteRunLeaseStoreOptions` | interface | <code>interface SQLiteRunLeaseStoreOptions</code> | Field contract for SQ Lite Run Lease Store Options; see all contract members below. |

## `SQLiteRunLeaseStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: RunLeaseAcquireRequest): Promise&lt;FencedRunLease &#124; null&gt;</code> | Public runtime operation for acquire. |
| `assertCurrent` | method | <code>assertCurrent(request: RunLeaseAssertionRequest): Promise&lt;FencedRunLease&gt;</code> | Asserts Current at this module boundary. |
| `close` | method | <code>close(): void</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: SQLiteRunLeaseStoreOptions): SQLiteRunLeaseStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scope: RunLeaseScope, checkedAt?: string): Promise&lt;FencedRunLease &#124; null&gt;</code> | Gets get at this module boundary. |
| `heartbeat` | method | <code>heartbeat(request: RunLeaseHeartbeatRequest): Promise&lt;FencedRunLease&gt;</code> | Public runtime operation for heartbeat. |
| `preempt` | method | <code>preempt(request: RunLeasePreemptRequest): Promise&lt;FencedRunLease&gt;</code> | Public runtime operation for preempt. |
| `release` | method | <code>release(request: RunLeaseReleaseRequest): Promise&lt;void&gt;</code> | Public runtime operation for release. |

## `SQLiteRunLeaseStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public filename property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
