# Runtime Migration

This guide moves legacy mutable Runtime behavior to the event-first contracts without changing
public protocol surfaces in one step.

## Inventory

Locate all code that stores current state, pending Tool calls, approvals, timers, retries, or Run
status in routes, Session objects, singleton maps, or provider wrappers. Also locate direct Model,
Tool, Memory, and Execution calls that bypass Runtime Activity Ports.

Classify each write as one of:

- a command that requests a state change;
- a Framework Event fact;
- a projection derived from events;
- provider-owned external state referenced by an Activity result.

## Migration Order

1. Introduce scoped Event Store writes and project existing Run views from events.
2. Compile and pin Workflow revision, Process hash, and dependency snapshot for new Runs.
3. Route Run lifecycle commands through `EventSourcedRunManager`.
4. Route non-deterministic work through Activity Ports and persist started/result facts.
5. Replace in-memory approval, Signal, and Timer state with durable waits.
6. Move Session serialization to `SessionQueueV2` and use lease/fencing checks for workers.
7. Add startup recovery and provider reconciliation.
8. Convert Server handlers to authentication, validation, command submission, and projection query
   adapters only.
9. Remove legacy mutable writers after replay and restart tests cover the migrated path.

## Compatibility

Do not synthesize historical side effects while importing old data. Import factual events when
their ordering and identity can be proven; otherwise create a migration boundary and start new
Runs on the event-first path. Preserve source ids, timestamps, revisions, and version information.

During a staged migration, only one path may own a given Run. A route must not update a legacy Run
record and append an unrelated Runtime event independently. If a compatibility projection is
required, update it from committed events.

## Exit Criteria

- No Session field is the authority for current FSM state.
- No route or UI directly performs a Workflow transition.
- All external work has operation identity, idempotency, and reconciliation.
- Waiting and cancelling Runs survive process restart.
- Full replay reproduces the same projection without provider calls.
- Legacy Server Runtime code is removed or is a protocol adapter over package Runtime APIs.
