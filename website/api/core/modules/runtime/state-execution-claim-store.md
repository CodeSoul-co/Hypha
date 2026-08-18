# `@codesoul-co/hypha-core` / `modules/runtime/state-execution-claim-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/state-execution-claim-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/state-execution-claim-store.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryStateExecutionClaimStore` | class | <code>new InMemoryStateExecutionClaimStore(options: InMemoryStateExecutionClaimStoreOptions): InMemoryStateExecutionClaimStore</code> | Runtime implementation for In Memory State Execution Claim Store; see its public constructor and members below. |
| `stateExecutionClaimGuard` | function | <code>stateExecutionClaimGuard(claim: StateExecutionClaim): StateExecutionClaimGuard</code> | Public runtime operation for state Execution Claim Guard. |
| `stateExecutionClaimScopeKey` | function | <code>stateExecutionClaimScopeKey(scope: StateExecutionClaimScope): string</code> | Public runtime operation for state Execution Claim Scope Key. |
| `InMemoryStateExecutionClaimStoreOptions` | interface | <code>interface InMemoryStateExecutionClaimStoreOptions</code> | Field contract for In Memory State Execution Claim Store Options; see all contract members below. |

## `InMemoryStateExecutionClaimStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: StateExecutionClaimAcquireRequest): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | Public runtime operation for acquire. |
| `assertCurrent` | method | <code>assertCurrent(request: StateExecutionClaimAssertionRequest): Promise&lt;StateExecutionClaim&gt;</code> | Asserts Current at this module boundary. |
| `complete` | method | <code>complete(request: StateExecutionClaimCompleteRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public runtime operation for complete. |
| `constructor` | constructor | <code>(options: InMemoryStateExecutionClaimStoreOptions): InMemoryStateExecutionClaimStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scope: StateExecutionClaimScope, checkedAt?: string): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | Gets get at this module boundary. |
| `release` | method | <code>release(request: StateExecutionClaimReleaseRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public runtime operation for release. |
| `renew` | method | <code>renew(request: StateExecutionClaimRenewRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public runtime operation for renew. |

## `InMemoryStateExecutionClaimStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `runLeaseStore` | property | <code>runLeaseStore: Pick&lt;RunLeaseStore, "assertCurrent"&gt;</code> | Public run Lease Store property. |
