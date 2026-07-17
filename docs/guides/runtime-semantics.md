# Runtime Semantics

Hypha Runtime is event-first. Append-only Framework Events are the durable facts; Run, Wait,
Activity, FSM snapshot, and query views are projections. FSM is the only authority allowed to
accept a Workflow transition. ReAct, Model, Tool, Memory, Execution, and Human providers return
results or proposals and never mutate FSM state directly.

## Durable Identity

Every command targets an `EventStreamScope` and carries:

- `expectedLastSequence` and, where relevant, `expectedRunRevision`;
- a positive lease `fencingToken`;
- a stable `operationId` and `idempotencyKey`.

The Event Store rejects stale sequences and stale fencing tokens. Reusing an idempotency key is
allowed only for the same canonical request. Session Queue ordering is scoped to tenant, user, and
Session; Message Bus ordering is scoped to topic and partition.

## Run Lifecycle

`EventSourcedRunManager` creates Run lifecycle facts and derives the current Run from its stream.
A Run pins `workflowRevision`, `processSpecRef`, and `processHash`. The corresponding Domain
compiler result contains `compilerVersion` and a `WorkflowDependencySnapshot` with a canonical
`dependencyHash`.

Waiting is durable:

```text
run.waiting_human | run.waiting_signal | run.waiting_timer
  + runtime.wait.created
  -> process restart
  -> restore or fire the persisted wait
  -> runtime.wait.resolved
  -> run.resumed
```

Signals include principal and permission scopes. Duplicate operations reuse the original append;
they do not consume a wait twice.

## Activity Lifecycle

Non-deterministic work crosses a `RuntimeActivityPort`:

```ts
interface RuntimeActivityPort<TInput, TOutput> {
  execute(request: RuntimeActivityRequest<TInput>): Promise<RuntimeActivityResult<TOutput>>;
  cancel(activityId: string, reason?: string): Promise<void>;
  reconcile(activityId: string): Promise<RuntimeActivityResult<TOutput>>;
}
```

`RuntimeActivityWorker` persists `runtime.activity.started` before invoking a provider. If the
process exits after an external operation commits, the next dispatch reconciles provider-owned
state instead of calling `execute` again. Unknown results are safe to retry only for `pure` or
`idempotent` activities; unknown external effects require manual review.

Ports currently exist for Model, Tool, Memory, Execution, and Human review. Provider records and
receipts remain owned by their source packages; Runtime stores their result and evidence refs.

## Cancellation

Cancellation is historical state, not deletion:

```text
run.cancel.requested -> run.cancelling
runtime.activity.cancellation.requested
-> provider cancellation and reconciliation
-> runtime.activity.cancelled
```

When `RuntimeActivityWorker.cancellationGraceMs` expires, Runtime records
`runtime.activity.cancellation.unresolved` and leaves the Activity in `cancelling`. Final Run
cancellation can persist those Activity ids in `unresolvedActivityRefs`.

## Replay Boundary

Replay reads events and rebuilds projections. It does not call Activity ports. Wall-clock time and
generated ids used by deterministic execution must pass through `EventSourcedRuntimeObservationPort`;
live mode records each observation and replay mode requires the recorded value.

Do not place mutable execution state in Session, use process-local timers as the only timer, write
projections outside event reducers, or let Message Bus delivery select FSM transitions.
