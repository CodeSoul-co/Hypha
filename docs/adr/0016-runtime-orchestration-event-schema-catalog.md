# ADR 0016: Runtime Orchestration Event Schema Catalog

- Status: Accepted
- Date: 2026-07-21
- Owner: Runtime
- Source branch: `runtime`

## Feedback Record

- Source agent: Timing learning planner, used only as an integration consumer
- Source business requirement: Runtime routes must persist lifecycle and FSM facts through the durable Event Runtime
- Existing Hypha capability: fail-closed Event schema registry, durable event store, orchestration projection, control services, and bounded FSM driver
- Current gap: production code has no schema catalog for the Events consumed by the orchestration projection
- Why this cannot be solved only in the business project: Event payload compatibility is a cross-business Runtime contract
- Cross-business reuse: yes
- Classification: Framework and Server Runtime bootstrap
- Target directory: `packages/core/src/modules/runtime`, `packages/harness/src`, and `apps/server/src/services`
- Spec change: adds versioned `1.0.0` payload schemas for canonical orchestration Events
- Event change: no new Event names; existing Event payload requirements become explicit
- Compatibility impact: canonical writers must provide the required orchestration evidence
- Test plan: schema hash integrity, duplicate registration, valid lifecycle and Wait payloads, missing evidence rejection, bounded FSM/control/timer/cancellation tests, Server typecheck, and package regression
- Other module impact: enables the next Server facade migration without weakening schema validation

## Context

The durable Event store rejects Events whose type and version are not registered. Until now, package tests created local permissive object schemas while Server startup used an empty registry. Activating a canonical route in that state would reject its first lifecycle Event.

A wildcard object schema would make startup pass but would not protect projection invariants. Missing `stateId`, `stateAttempt`, `waitId`, transition endpoints, cancellation identity, or terminal state would then be discovered only during replay.

## Decision

Publish a core Runtime schema catalog for the Event types consumed or emitted by:

- the orchestration projection;
- the bounded FSM driver;
- Run control and Timer services;
- cancellation propagation;
- Runtime Activity observations.

Every definition has an explicit Event type, semantic version, canonical schema hash, and required evidence fields. Extensible evidence fields remain JSON-compatible, but there is no catch-all Event type and unregistered Events still fail closed.

The bounded FSM integration test now uses this production catalog instead of test-local permissive schemas. Server Runtime initialization registers the catalog before opening the durable backbone. Registration remains idempotent so startup retries are safe.

## Consequences

- Canonical Runtime startup has a usable, versioned orchestration registry.
- Invalid lifecycle Events fail before persistence rather than during projection or replay.
- Package tests exercise the same schema definitions Server will use.
- Inference, Tool, Memory, Workflow-stage, and other Activity-specific Event families remain unregistered until their dedicated migration slices define concrete contracts.
- Route activation remains deferred until the durable compatibility bridge is installed.
