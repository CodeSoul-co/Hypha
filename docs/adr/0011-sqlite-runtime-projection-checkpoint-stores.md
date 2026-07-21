# ADR 0011: SQLite Runtime Projection and Checkpoint Stores

- Status: Accepted
- Date: 2026-07-21
- Owner: Runtime
- Source branch: `runtime`

## Feedback Record

- Source agent: Timing learning planner, used only as an integration consumer
- Source business requirement: an interrupted Agent Run must recover its projected state and verified checkpoint after local restart
- Existing Hypha capability: projection engine, in-memory projection store, checkpoint contracts, checksum rules, and in-memory checkpoint store
- Current gap: projection offsets and checkpoint records are lost on Server restart
- Why this cannot be solved only in the business project: recovery state integrity and revision semantics are Runtime Framework responsibilities
- Cross-business reuse: yes
- Classification: Framework adapters
- Target directories: `packages/core/src/modules/runtime`, `packages/adapters-local/src`
- Spec change: expose the core Projection record validator for adapter parity
- Event change: none
- Compatibility impact: additive; in-memory stores remain reference implementations
- Test plan: restart persistence, revision CAS, checkpoint idempotency, ordered checkpoint sequence, Event coverage monotonicity, deletion, and corruption detection
- Other module impact: Runtime bootstrap may use these stores after durable Lease and State Claim adapters are available

## Context

The Runtime event stream is the source of truth, but rebuilding every projection from sequence one after every process restart is unnecessary. Checkpoints also need durable storage so recovery can resume from a verified state boundary and replay only the remaining Event delta.

## Decision

Add two independent SQLite adapters:

- `SQLiteProjectionStore` persists projection version, state, state hash, Event offset, revision, and update time. Writes use revision CAS and require revisions to advance by exactly one.
- `SQLiteRuntimeCheckpointStore` persists ordered checkpoint records and append idempotency results. Writes require contiguous checkpoint sequence and non-decreasing covered Event sequence.

Projection reads validate the canonical state hash and record shape. Checkpoint reads validate the contract, scope, checksum, and canonical record hash before returning recovery data.

Projection state remains a rebuildable cache. If its integrity check fails, Runtime must rebuild it from the durable Event stream instead of treating the cached state as authoritative. A checkpoint integrity failure blocks recovery until a previous valid checkpoint or full replay is selected.

## Migration

Projection tables use Runtime migration version 2. Checkpoint tables use migration version 3. Both migrations are idempotent and may share the SQLite database created by the durable Event store.

## Consequences

- Projection offsets and checkpoints survive restart.
- Stale projection writers cannot overwrite newer revisions.
- Duplicate checkpoint commands are deterministic across restart.
- Corrupted projection or checkpoint JSON is rejected before execution resumes.
- Durable Run Lease and State Execution Claim adapters remain required before the canonical Server graph can safely execute across workers.
