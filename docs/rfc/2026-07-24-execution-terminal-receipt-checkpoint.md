# RFC: Durable Execution Terminal Receipt Checkpoint

## Status

Proposed

## Context

A Provider may complete an Execution before Artifact finalization, terminal record commit, Event
append, FSM observation, or queue acknowledgement succeeds. If the Provider's terminal receipt
exists only in worker memory, a crash in that interval can make recovery incorrectly execute the
same side effect again.

The Execution Store already provides revision CAS, lease ownership, fencing, idempotency, and
durable JSON records. It can therefore persist the receipt without adding Provider details to
Runtime, FSM, or queue modules.

## Decision

Add an optional immutable `terminalReceipt` checkpoint to `ExecutionRecord` and a
`DurableExecutionWorker.checkpointTerminalReceipt()` operation.

The operation:

- accepts only Provider receipts with `completed` or `rejected` status;
- binds the receipt to the Execution and Provider identities;
- persists it in a separate revision before terminal commit;
- uses the active lease and fencing token;
- is idempotent for the same receipt;
- rejects replacement, removal, or mutation of an existing receipt;
- requires any later terminal result carrying a Provider receipt to match the durable checkpoint.

The checkpoint remains present after terminal commit and lease release. Existing records without
a receipt remain readable for backward compatibility, and terminal results for failures that
occurred before Provider execution do not require a receipt.

## Recovery semantics

After a crash, a non-terminal record with `terminalReceipt` proves that the Provider reached a
terminal decision. Recovery must reconcile Artifact and persistence steps using the same receipt;
it must not rerun Provider creation or execution.

This RFC establishes only the Execution-owned durable receipt boundary. Artifact finalization,
Event append, FSM observation, memory sync, and queue acknowledgement keep their existing Owner
boundaries and will consume this checkpoint through later integration work.

## Security and consistency

1. Receipt `executionId` and `providerId` must match the record.
2. Receipt identity, hash, status, and issue time become immutable after the first CAS.
3. Stale workers cannot write a checkpoint after lease takeover.
4. A terminal result cannot substitute a different receipt after Artifact handling.
5. The receipt contains references and hashes, not unbounded output or Artifact bytes.

## Compatibility

The field and worker method are additive. SQLite persists the field in existing `record_json`, so
no schema migration or new infrastructure dependency is required.
