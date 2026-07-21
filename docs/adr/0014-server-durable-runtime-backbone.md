# ADR 0014: Server Durable Runtime Backbone

- Status: Accepted
- Date: 2026-07-21
- Owner: Runtime
- Source branch: `runtime`

## Feedback Record

- Source agent: Timing learning planner, used only as an integration consumer
- Source business requirement: Server runtime components must share one restart-safe event and coordination authority
- Existing Hypha capability: canonical composition root plus SQLite Event, Projection, Checkpoint, Run Lease, and State Claim adapters
- Current gap: the durable adapters exist independently and the composition factories receive only the Event Runtime
- Why this cannot be solved only in the business project: Server composition and dependency authority are cross-business Runtime invariants
- Cross-business reuse: yes
- Classification: Framework and Server App Surface composition
- Target directory: `apps/server/src/runtime`
- Spec change: composition factories now receive the complete durable dependency set
- Event change: none
- Compatibility impact: additive at runtime; factory signatures expand at compile time
- Test plan: dependency identity, single construction, shared database restart, event sequence recovery, Run Lease recovery, State Claim recovery, Server typecheck, lint, and package regression
- Other module impact: prepares the compatibility facade and routes for later migration without changing their current behavior in this slice

## Context

Durable Runtime adapters cannot provide a canonical execution path while each component is constructed independently. The FSM driver must receive the same Event Runtime, Projection Store, Run Lease Store, and State Claim Store that the Server owns. Startup must also have one place that closes every SQLite connection.

The existing `EventRuntimeService`, Workflow routes, and Chat routes still use legacy execution paths. Replacing those paths in the same change would combine storage activation with API behavior migration and make rollback and review unsafe.

## Decision

Add a `RuntimeBackbone` factory that constructs the following components over one explicitly selected SQLite database:

- `SQLiteDurableEventStore` and `DurableEventRuntime`;
- `ProjectionEngine` and `SQLiteProjectionStore`;
- `SQLiteRuntimeCheckpointStore`;
- `SQLiteRunLeaseStore`;
- `SQLiteStateExecutionClaimStore`.

The caller must provide an `EventSchemaRegistry`; there is no permissive or implicit schema fallback. The returned backbone is frozen, owns its database connections, closes them in reverse construction order, and makes repeated close calls safe.

`RuntimeCompositionRoot` now requires this complete durable dependency set. The FSM and ReAct factories receive the same object identities, preventing a factory from silently relying on an undeclared in-memory coordination store.

## Consequences

- The canonical Server graph has one explicit durable storage and coordination backbone.
- Restart recovery can be tested through the same assembly used by Server composition.
- Event schema registration remains an explicit startup prerequisite.
- Existing HTTP behavior is unchanged in this slice.
- The next slice will migrate `EventRuntimeService` behind this backbone before route ownership changes.
