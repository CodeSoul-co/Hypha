# `@codesoul-co/hypha-adapters-local` / `state-execution-claim-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/state-execution-claim-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/state-execution-claim-store.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteStateExecutionClaimStore` | class | <code>new SQLiteStateExecutionClaimStore(options: SQLiteStateExecutionClaimStoreOptions): SQLiteStateExecutionClaimStore</code> | Runtime implementation for SQ Lite State Execution Claim Store; see its public constructor and members below. |
| `SQLiteStateExecutionClaimStoreOptions` | interface | <code>interface SQLiteStateExecutionClaimStoreOptions</code> | Field contract for SQ Lite State Execution Claim Store Options; see all contract members below. |

## `SQLiteStateExecutionClaimStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: StateExecutionClaimAcquireRequest): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | Public runtime operation for acquire. |
| `assertCurrent` | method | <code>assertCurrent(request: StateExecutionClaimAssertionRequest): Promise&lt;StateExecutionClaim&gt;</code> | Asserts Current at this module boundary. |
| `close` | method | <code>close(): void</code> | Public runtime operation for close. |
| `complete` | method | <code>complete(request: StateExecutionClaimCompleteRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public runtime operation for complete. |
| `constructor` | constructor | <code>(options: SQLiteStateExecutionClaimStoreOptions): SQLiteStateExecutionClaimStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scope: StateExecutionClaimScope, checkedAt?: string): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | Gets get at this module boundary. |
| `release` | method | <code>release(request: StateExecutionClaimReleaseRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public runtime operation for release. |
| `renew` | method | <code>renew(request: StateExecutionClaimRenewRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public runtime operation for renew. |

## `SQLiteStateExecutionClaimStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public filename property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `runLeaseStore` | property | <code>runLeaseStore: Pick&lt;RunLeaseStore, "assertCurrent"&gt;</code> | Public run Lease Store property. |
