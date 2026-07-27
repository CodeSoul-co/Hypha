# RFC: Execution Terminal Event Handoff

## Status

Proposed

## Context

The durable Execution completion path already checkpoints immutable Provider terminal evidence,
finalizes verified output Artifacts, and performs the fenced terminal record CAS. The next required
barrier is appending the corresponding Execution event. A failed event append must be retryable
without invoking the Provider or repeating unbounded side effects.

The durable Event Store, stream sequencing, FSM observation, Memory synchronization, and queue
acknowledgement are Runtime-owned concerns. Execution must not implement or bypass those
components, but it must provide a stable, runtime-validated handoff identity.

## Decision

Add an Execution-owned `DurableExecutionTerminalEventCoordinator` that:

1. accepts only a runtime-validated durable terminal `ExecutionRecord`;
2. derives the event type and bounded payload from its matching terminal result;
3. derives the event ID and append idempotency key from the Execution ID and terminal result
   revision;
4. delegates persistence through an injected `DurableExecutionTerminalEventCommitPort`;
5. validates the returned event and rejects mismatched identities.

The append port must implement idempotent resolution for an identical event and idempotency key.
Runtime composition will adapt this port to its durable Event Store and retain ownership of stream
sequence, run revision, fencing, and subsequent FSM observation.

## Ordering and recovery

```text
Provider terminal receipt
  -> Artifact bytes verified/finalized
  -> Execution record CAS terminal
  -> deterministic terminal event handoff
  -> Runtime durable Event append
```

The coordinator contains no Provider, Workspace, or Artifact operation. If append fails after the
terminal CAS, recovery reloads the terminal record and retries the same event ID and idempotency
key. The terminal result revision, rather than a later lease-release record revision, is the stable
version identity.

## Event mapping

- `completed` -> `command.execution.completed`
- `cancelled` -> `command.execution.cancelled`
- `timed_out` -> `command.execution.timeout`
- `oom_killed` -> `command.execution.oom_killed`
- `resource_exceeded` -> `command.execution.resource.exceeded`
- `failed` and `quarantined` -> `command.execution.failed`

The failed event accepts `quarantined` as its payload status so the durable state is not
misrepresented. Existing normalized error requirements remain enforced.

## Security and compatibility

1. The event payload is produced by the existing strict Execution Event Runtime Schema.
2. Raw stdout, stderr, secrets, host paths, and environment values remain forbidden.
3. Artifact references are bounded references only; bytes are never embedded in the event.
4. A non-terminal or identity-mismatched record fails closed.
5. A mismatched append response fails closed.
6. Existing completion APIs remain compatible; the new coordinator and port are additive.

## Owner boundary

This RFC does not implement the Runtime Event Store adapter, FSM observation, Memory sync, queue
acknowledgement, or Server composition. Those integrations must be completed by their respective
Owners using the stable Execution handoff contract.
