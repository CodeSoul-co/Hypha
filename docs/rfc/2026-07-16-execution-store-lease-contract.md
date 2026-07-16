# RFC: Execution Store, Lease, and Fencing Contract

## Summary

Hypha should define an Execution-owned persistence port for command records, optimistic concurrency,
idempotency resolution, and worker leases before implementing a concrete local store or Runtime
recovery loop. This increment provides TypeScript contracts, Zod validation, JSON Schema, fixtures,
and contract tests only. It does not add SQLite, Redis, a scheduler, a queue, or a recovery worker.

## Ownership Boundary

The engineering specification assigns the shared Execution record and Provider-facing persistence
port to the Execution Owner. Runtime owns Activity handling, cancellation propagation, recovery,
reconciliation, resource claims, and the operational use of fencing.

| Responsibility                   | Owner / location                                        |
| -------------------------------- | ------------------------------------------------------- |
| Record, Lease, Store port        | Execution / `packages/core/src/contracts`               |
| Schema and boundary validation   | Execution / `packages/core/src/modules/execution-store` |
| Concrete local Store adapter     | Deferred / `packages/adapters-local`                    |
| Reconcile and recovery algorithm | Runtime Owner                                           |
| Cache lookup and invalidation    | Cache Owner                                             |

This RFC does not modify FSM, Run state, Runtime queues, EventStore, Cache Store, or Provider
implementations.

## Engineering-Spec Contract

`ExecutionRecord` preserves the published fields:

- immutable command request and execution ID;
- revision, status, Provider/Sandbox references, and attempt number;
- optional idempotency fingerprint, result, and lease;
- creation and update timestamps.

`ExecutionLease` preserves the published identity, owner, acquisition, heartbeat, and expiration
fields.

## Fencing Token Proposal

The engineering specification requires Runtime Lease/Fencing behavior and stale-worker rejection,
but the shown `ExecutionLease` has no fencing value. This RFC adds one required field:

```ts
fencingToken: number;
```

The Store must assign a strictly increasing positive token every time ownership is newly acquired.
A worker must supply the current lease ID, owner ID, and fencing token when mutating a leased record.
An expired or superseded worker therefore cannot commit merely because it still knows the execution
ID.

## Store Port Proposal

The engineering specification defines Record and Lease data but does not define Store methods. This
RFC proposes a provider-neutral `ExecutionStore` with:

- governed `create` and `get`; creation starts at revision/attempt zero in `queued` state without
  Provider execution state, result, or lease;
- filtered, cursor-based `list` for recovery candidate discovery;
- explicit idempotency resolution returning `miss`, `match`, or `conflict`;
- revision-based `compareAndSet`;
- atomic acquire, renew, and release lease operations;
- optional `close` for adapters with external resources.

Concrete stores must validate at the boundary and perform compare-and-set and lease changes
atomically. `next.revision` is exactly `expectedRevision + 1`. A leased record cannot be updated
without a matching `ExecutionLeaseGuard`. Compare-and-set must also preserve immutable execution
identity, command request, ownership scope, and `createdAt`; the Store compares these against the
currently persisted record because a standalone request Schema cannot see prior state.

## Idempotency

Idempotency lookup is scoped by tenant when present, user, Workspace, key, and command fingerprint.
The three outcomes are deliberately distinct:

- `miss`: no prior execution exists;
- `match`: the same key and fingerprint resolve to the existing record;
- `conflict`: the same key maps to a different fingerprint and must not execute silently.

The fingerprint contains hashes and version references only. It must not contain plaintext Secrets,
raw environment values, Workspace bytes, or Artifact content.

## Recovery Facts

`ExecutionRecoveryAssessment` represents the four states required by the engineering specification:

- not started;
- Provider is queryable;
- Provider completed but the result has not been persisted;
- Provider state is unknown.

Queryable states require a Provider status reference. Unknown state requires a reason. This is a
fact contract only: Runtime decides reconciliation behavior. In particular, `provider_state_unknown`
must not be interpreted by Execution Store as permission to run the command again.

## Normalized Store Errors

The published normalized error list did not include the conflicts required by Revision, Lease, and
Idempotency rules. This RFC adds:

```text
EXECUTION_REVISION_CONFLICT
EXECUTION_LEASE_HELD
EXECUTION_LEASE_LOST
EXECUTION_IDEMPOTENCY_CONFLICT
```

Adapters must normalize backend-specific constraint, transaction, or lock errors to these codes and
must not leak SQLite, Redis, or remote database response shapes into Core.

## Cache Compatibility

Execution Store is not Cache and must not call Cache internally. It persists canonical execution
state. Cache may consume stable fingerprints, result metadata, hashes, and Artifact references from
completed records. A Cache hit never grants a Lease, changes a Revision, or authorizes replay of an
external side effect.

## Acceptance

- Record, Lease, Store port, CAS, lease operation, query, idempotency, and recovery contracts exist;
- TypeScript, Zod, JSON Schema, examples, and tests agree;
- identity links, terminal-result evidence, timestamp order, and idempotency anchoring are checked;
- stale Revision and fencing guards are representable and validated;
- unknown Provider state cannot be confused with a safe retry;
- typecheck, package tests, lint, and package build pass;
- the pre-existing Windows FilesystemTool unit-test failure is reported separately;
- no Store adapter, Runtime recovery loop, Provider, Cache implementation, or Server route is added.
