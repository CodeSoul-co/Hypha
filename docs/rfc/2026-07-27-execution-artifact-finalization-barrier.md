# RFC: Execution Artifact Finalization Barrier

## Status

Proposed

## Context

The durable terminal receipt checkpoint prevents Provider replay after a terminal side effect, but
the remaining Execution-owned steps were not composed into one enforced order. A caller could
terminal-commit an Execution before output Artifact collection and finalization completed, or lose
the in-memory transition after Artifact finalization failed.

The existing output planner and collector already provide bounded planning, Workspace-only reads,
hash and size verification, scoped Artifact records, deterministic idempotency keys, and idempotent
finalization. The missing piece is an orchestration boundary that consumes those capabilities after
the durable receipt and before terminal CAS.

## Decision

Add `DurableExecutionCompletionCoordinator` with this order:

```text
checkpoint immutable Provider terminal receipt
  -> renew and revalidate lease/fencing
  -> plan output collection
  -> create/verify/finalize Artifact records
  -> merge verified Artifact refs into the terminal result
  -> fenced Execution record terminal CAS
```

The coordinator never invokes a Provider. If Artifact handling fails, the receipt remains in the
Execution Store and recovery retries Artifact operations with their deterministic idempotency keys.
A completed Execution with new collected outputs cannot terminal-commit unless its plan finalizes
those outputs and the collector returns matching final evidence.

Add Runtime Schema and JSON Schema validation for `ExecutionOutputCollectionResult`. The result
must account for planned paths, content hashes, sizes, existing references, collected references,
and finalized references before it can reach terminal CAS.

## Security and consistency

1. Receipt checkpointing uses the active lease and fencing token.
2. The worker lease is renewed immediately before Artifact side effects, rejecting stale retries.
3. Artifact Manager responses remain runtime-validated for integrity, scope, provenance, and
   version identity.
4. Collection results cannot add, omit, duplicate, or substitute Artifact references.
5. A durable receipt cannot disappear from the final Execution result.
6. Artifact failure never causes Provider re-execution in this coordinator.
7. Terminal CAS remains protected by revision, lease owner, and fencing token.

## Recovery boundary

Artifacts are durable evidence. A crash after finalization but before terminal CAS may repeat the
same create/finalize calls, but deterministic idempotency keys must resolve them to the same
Artifact versions. Recovery must refresh the Execution record and reuse the stored receipt.

Event append, FSM observation, Memory sync, queue acknowledgement, and Server composition remain
outside this Execution-owned RFC and keep their respective Owner boundaries.

## Compatibility

The coordinator and result validators are additive. Existing planners, collectors, Artifact
Managers, and Execution Store records remain compatible. No database schema migration or new
external dependency is required.
