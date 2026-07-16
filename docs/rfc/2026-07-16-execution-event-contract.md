# RFC: Execution Lifecycle Event and Payload Contract

## Summary

Hypha should register every Sandbox, Command Execution, and Network Authorization lifecycle event
from the engineering specification and attach structured, bounded, replay-safe payloads. This
increment adds event names, typed payloads, Zod validation, JSON Schema, examples, and tests. It does
not modify EventStore, TraceRecorder, Runtime, Replay, Provider, or message-bus implementations.

## Event Types

The public `FrameworkEventType` now includes the engineering specification's:

- 9 Sandbox lifecycle events;
- 15 Command Execution lifecycle events;
- 4 Network Authorization lifecycle events.

No Artifact lifecycle events are added in this increment because the canonical Artifact contract is
not yet defined. Existing legacy Artifact event names remain unchanged.

## Published Base Payload

`ExecutionEventPayloadBase` preserves the published fields for operation, Execution, Sandbox,
Workspace, Environment, command/source hashes, Artifact references, status, latency, resource usage,
normalized error, and metadata.

The engineering specification does not define which fields are mandatory for each event. A base
payload alone would allow unusable records such as `command.execution.completed` without an
Execution ID or exit code. This RFC therefore proposes three specialized payloads:

- `SandboxLifecycleEventPayload` adds Provider identity, Provider Sandbox reference, Sandbox status,
  and missing-capability facts;
- `CommandExecutionEventPayload` adds Revision, Provider, typed command status, exit evidence,
  truncated-output stream, approval reference, and recovery disposition;
- `NetworkAuthorizationEventPayload` adds authorization ID, policy hash, decision, expiry, and
  reason.

## Event Semantics

Runtime validation binds important event names to evidence:

- Sandbox create request records operation, Workspace, Environment ID, and Environment Revision even
  before a Sandbox ID exists;
- Sandbox ready, terminate, terminated, cleanup, and failure events use their matching lifecycle
  status;
- Command queued, started, cancellation, terminal, resource, OOM, and timeout events use matching
  command status and normalized error codes;
- completed Command events require exit code and latency;
- output-truncated events identify stdout/stderr and explicitly set `outputTruncated: true`;
- unknown and recovered result events carry recovery disposition;
- Network event names match `requested`, `granted`, `denied`, or `revoked`; grants require expiry and
  denials require a reason.

Envelope and payload Workspace identities must agree. The typed factory validates before returning
an event, while the existing generic `createFrameworkEvent` remains compatible for other modules.

## Sensitive and Unbounded Data

Execution event payloads and envelope metadata reject known raw-content field names recursively,
including plaintext Secret fields, stdout/stderr, raw output, file/binary content, host paths, and
raw environment maps. This check also applies inside normalized error details.

Events contain only bounded summaries, hashes, metrics, status, and references. They must not contain:

```text
complete Secrets
unbounded stdout or stderr
large file content
host-sensitive absolute paths
uploaded binary data
raw environment variables
```

Schema validation cannot detect a Secret copied into an innocently named string field. Provider,
Secret broker, Policy, and Trace adapters must still redact values before constructing the payload.

## Replay and Recovery

These events provide structured facts for later Replay and Recovery but do not implement either.
Replay consumes recorded Command results and Artifact references; it must not call a Provider merely
because it sees `command.execution.requested`. `provider_state_unknown` remains a reconciliation fact,
not permission to retry a side-effecting command.

## Cache Compatibility

Events may contain stable command/source hashes and Artifact references. They do not contain Cache
entries or invoke Cache. Cache enabled and disabled modes must emit the same canonical Execution
lifecycle facts for equivalent work.

## Ownership Boundary

- Execution owns the event names and Execution-specific payload contracts;
- Runtime/Harness owns when events are emitted and persistence through the canonical EventRuntime;
- Message Bus owns transport envelopes, not lifecycle meaning;
- Policy/Human Review owns authorization decisions;
- Cache and Artifact owners consume hashes/references without redefining these events.

## Acceptance

- all 28 Sandbox, Command, and Network event names are registered;
- specialized payloads enforce identity, status, error, truncation, and authorization evidence;
- sensitive/unbounded field names are rejected recursively;
- event and payload Workspace identity cannot diverge;
- TypeScript, Zod, JSON Schema, examples, and tests agree;
- typecheck, package tests, lint, and package build pass;
- the pre-existing Windows FilesystemTool unit-test failure is reported separately;
- no EventStore, Runtime, Provider, Replay, Cache, Artifact, or transport implementation changes.
