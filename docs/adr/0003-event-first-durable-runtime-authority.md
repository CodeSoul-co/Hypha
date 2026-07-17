# ADR 0003: Event-First Durable Runtime Authority

## Status

Accepted

## Context

Hypha has reusable FSM, Harness, Event, local persistence, Tool, Memory, Inference, and Server
capabilities, but runtime authority is split. `packages/harness` provides an event-first runtime
while the server also owns mutable Run maps, FSM transitions, recovery orchestration, dependency
construction, and side-effect dispatch. This creates two execution paths and makes restart,
replay, concurrency, and ownership guarantees difficult to enforce consistently.

The current Event Store contract only appends and lists events. It does not define tenant or user
scope, stream sequence, expected revision, idempotency conflict behavior, or atomic transition
commit. The in-memory Message Bus provides routing and acknowledgement but not durable Inbox,
Outbox, delivery leases, visibility timeouts, or redelivery after worker failure.

Agent products also need long-running approval, signal, timer, cancellation, and reconciliation
semantics without allowing product code, model output, or transport state to become runtime truth.

## Decision

1. `FSMRuntime` is the only authority that validates and commits Workflow state transitions.
   ReAct, Model, Tool, Memory, Execution, Human, and custom handlers return activity results or
   transition proposals; they do not mutate Workflow state.
2. Versioned, append-only Framework Events are the source of runtime truth. Session, Run, FSM,
   State Attempt, approval, queue, and UI views are projections and can be rebuilt from events.
3. Every runtime operation carries an explicit scope containing tenant, user, workspace, session,
   and Run identity as applicable. Stores and queries enforce that scope instead of relying on
   globally unique caller-provided IDs.
4. Event streams use monotonic sequence and expected-revision checks. Idempotency keys may reuse
   an existing result only when their canonical request fingerprint matches; conflicting reuse is
   rejected. Appends never replace an existing historical event.
5. Runtime lifecycle has three explicit levels: Run, FSM Instance, and State Attempt. Transition
   commit records the accepted transition and resulting lifecycle facts atomically under the
   current lease and fencing token.
6. Non-deterministic work crosses provider-neutral Runtime Activity Ports. Activity requests carry
   operation identity, deadline, idempotency key, and fencing token. Results and receipts are
   persisted before a transition can depend on them.
7. Message Bus and Session Queue are durable transportation and scheduling facilities, not state
   authorities. Inbox deduplication, transactional Outbox, delivery leases, visibility timeout,
   acknowledgement, redelivery, dead letter, and per-session ordering protect Event/FSM handling.
8. External writes with unknown commit state are quarantined until reconciliation evidence is
   available. Replay reads persisted activity outcomes and never repeats historical side effects.
9. Human approval, signal, timer, pause, resume, cancellation, checkpoint, and recovery are
   persisted lifecycle operations. Process-local timers, maps, and counters are optimizations only.
10. Domain compilation pins Workflow revision, compiler version, Process hash, dependency contract
    hashes, Profile revisions, and Policy references. A running instance does not silently adopt
    newer Domain or provider contracts.
11. Existing package boundaries remain in place. Core owns shared contracts and events, FSM owns
    deterministic transition semantics, Harness owns orchestration, local adapters own persistence
    implementations, and Domain owns reusable Workflow bindings and compilation. No new workspace
    package is introduced for Runtime.
12. Server code is a protocol, authentication, command, query, and composition adapter. Runtime
    semantics migrate to owned packages; Server routes do not create a second FSM, Event Store,
    Tool, Memory, or recovery implementation.

## Consequences

- Event Store, Message Bus, Session Queue, lease, checkpoint, and projection contracts require
  compatible in-memory fixtures and durable local implementations.
- Existing append/list callers require a compatibility migration to scoped streams and explicit
  append results. Legacy replacement behavior cannot be preserved for historical events.
- Runtime tests must cover duplicate commands and messages, revision conflicts, stale fencing
  tokens, lost acknowledgements, worker restart, projection rebuild, cancellation, and replay
  without repeated side effects.
- Tool, Memory, Inference, and Execution implementations remain owned by their packages. Runtime
  integrates them through ports and contract tests rather than copying provider behavior.
- Product-specific Workflow, scheduling rules, prompts, pages, and data models remain in separate
  Business Agent projects. They may rely on durable approval and versioning semantics but do not
  define framework runtime behavior.
- Server migration is incremental: public APIs can remain compatible while command handling and
  projection reads delegate to the package-level Runtime composition.

## Affected Public Contracts

- Runtime scope and principal references
- Framework Event envelope and Event Store append/read contracts
- Run, FSM Instance, State Attempt, lease, checkpoint, and projection records
- Runtime Activity request/result ports
- Message Bus, Inbox, Outbox, and Session Queue contracts
- Workflow compilation output and dependency snapshot
- Replay and recovery results
