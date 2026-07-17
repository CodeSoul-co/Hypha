# Runtime Recovery

Recovery is evidence-based continuation from persisted facts. It is not a second agent loop and it
does not infer state from process memory.

## Startup Procedure

1. Open the durable Event Store and coordination stores.
2. Run `EventFirstRecoveryScanner.scan()` over stream heads.
3. Process each candidate with `EventFirstRecoveryWorker` under a Run lease.
4. Restore waits, fire overdue timers, rebuild projections, or requeue progress according to the
   candidate's `safeAction`.
5. Dispatch non-terminal Activities. `requested` Activities may execute; `running`, `waiting`, and
   `cancelling` Activities must reconcile first.

Recovery candidates are stale-checked immediately before execution. A changed or already-resolved
candidate is not applied.

## External Operations

Provider-owned records are the reconciliation authority for Tool and Execution Activities. A
completed receipt is converted into an Activity result event. Missing provider state for a pure or
idempotent operation can be marked `safe_retry`; missing state for an external or irreversible
effect requires manual review.

Never rerun a historical Tool, Memory write, Model call, or Execution during replay. Recovery may
call `reconcile`; replay may not call any Activity port.

## Waits and Timers

Human, Signal, Timer, and external-operation waits are event records. On restart, restore the
registration from `RuntimeWaitRecord`. Timers are fired from persisted `expiresAt`, not an old
process-local timeout. Duplicate Signal and Timer commands use their original idempotency identity.

## Cancellation

Persist Run and Activity cancellation intent before external abort. Apply a bounded grace period.
If a provider does not acknowledge cancellation, retain the Activity in `cancelling`, record
`runtime.activity.cancellation.unresolved`, and include its id in the final Run cancellation event.
Later reconciliation may still record a terminal provider result.

## Operational Checks

- Event sequence is contiguous and payload hashes validate.
- Run projection revision matches the stream head.
- Active workers hold a non-expired lease and current fencing token.
- Waiting Runs have one matching pending wait.
- Published Outbox messages have Inbox/ack evidence or a recoverable delivery.
- Projection rebuild uses the full event stream and does not write hidden state.
- Unknown external commit outcomes are quarantined or reviewed, never guessed.
