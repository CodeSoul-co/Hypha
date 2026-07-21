# ADR 0009: Canonical Runtime Composition Root

- Status: Accepted
- Date: 2026-07-21
- Owner: Runtime
- Source branch: `runtime`

## Feedback Record

- Source agent: Timing learning planner, used only as an integration consumer
- Source business requirement: a reusable Agent must execute Workflow, FSM, ReAct, and trace operations through one runtime graph
- Existing Hypha capability: durable event contracts, RunManager, fenced bounded FSM driver, and harnessed ReAct runner exist independently
- Current gap: the default Server constructs runtime components through unrelated singletons and permits implicit in-memory fallbacks
- Why this cannot be solved only in the business project: composition ownership and event-source authority are framework-wide runtime invariants
- Cross-business reuse: yes
- Classification: Framework contract and Server App Surface composition
- Target directories: `apps/server/src/runtime`, followed by Runtime-owned package adapters
- Spec change: define an explicit Runtime composition root
- Event change: none in this slice
- Compatibility impact: additive; existing Server execution remains active until the durable adapter is available
- Test plan: composition identity, single construction, missing-component fail-fast, Server typecheck and lint
- Other module impact: durable storage activation depends on the Runtime SQLite adapter; no DomainPack or business workflow changes

## Context

Hypha currently exposes the components needed for a canonical runtime, but the Server does not construct them as one dependency graph. `RunManager` may create an in-memory event source, while the bounded FSM driver accepts the durable EventRuntime contract. A composition root must make the shared EventRuntime dependency explicit before the Server can safely switch execution paths.

## Decision

The Server owns one `RuntimeCompositionRoot`. It constructs and retains exactly one graph containing:

- `EventRuntime`;
- `RunManager`;
- `FencedBoundedFSMDriver`;
- `HarnessedReActFSMRunner`.

Every factory receives the same EventRuntime instance. The ReAct runner factory also receives the selected RunManager and bounded FSM driver. Missing components fail composition immediately. Repeated calls return the same frozen composition.

The root has no implicit development fallback. A caller must explicitly provide all factories. This prevents production startup from silently creating a second in-memory event authority.

## Consequences

- Runtime construction becomes testable independently from HTTP routes.
- Durable adapter activation can be added without changing route-level ownership.
- Existing `EventRuntimeService` remains a compatibility facade during migration.
- This ADR does not claim that the current SQLite EventStore implements CAS, fencing, schema upcast, or durable recovery. Those requirements remain in the durable adapter work package.
- Timing-specific workflows, pages, prompts, and DomainPack content remain outside Hypha.
