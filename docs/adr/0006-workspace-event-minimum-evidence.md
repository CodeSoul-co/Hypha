# ADR 0006: Workspace Event Minimum Evidence

## Status

Accepted

## Context

Workspace lifecycle events are part of the event-first runtime and become audit, replay, Cache,
and recovery evidence. A single permissive payload type allows an event name to be emitted without
the evidence implied by that name, such as a failed event without an error or a snapshot-created
event without a manifest hash. Type names alone therefore do not provide a usable public contract.

Event payloads must remain bounded. They must not solve missing evidence by embedding file content,
raw command output, host paths, credentials, or arbitrary provider state.

## Decision

1. Every Workspace event payload includes `workspaceId` and has event-specific minimum evidence.
2. Workspace operations carry `operationId`; request, completion, failure, and conflict events can
   therefore be correlated without relying on mutable Session state.
3. Failure and path-denial events require a normalized error. Ready and busy events require the
   matching status.
4. Snapshot creation requires a manifest hash and at least one Artifact reference. Restore
   requests carry a non-empty Artifact reference set, and successful restore or patch application
   carries the resulting Workspace snapshot hash.
5. Quota-exceeded events require at least one bounded observed value: bytes or files.
6. TypeScript payload maps, runtime validation, and exported JSON Schema express the same minimum
   requirements and are covered by contract tests.

## Consequences

- Consumers may rely on the minimum evidence associated with an event type instead of repeatedly
  checking a generic optional payload.
- Producers that emitted evidence-free Workspace events must add the required bounded fields.
- Event payloads still carry only hashes, references, counters, normalized errors, and bounded
  metadata; large or sensitive bytes remain in Artifact storage.
- Adding a new Workspace event requires updating its typed payload requirements, runtime validator,
  JSON Schema condition, and contract test together.
