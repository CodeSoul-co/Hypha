# Governed Execution Contracts

Hypha models command execution as a provider-neutral, event-first capability. `@hypha/core`
publishes the contracts, validators, JSON Schemas, examples, lifecycle rules, and provider ports.
Concrete process, container, remote-sandbox, persistence, artifact, policy, and secret integrations
belong in adapters and must pass through the harness governance and trace path.

## Contract Layers

| Layer               | Main exports                                                                              | Responsibility                                                                                                                          |
| ------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Identity and errors | `ExecutionPrincipal`, `NormalizedExecutionError`                                          | Actor scope, permission evidence, and provider-neutral failures.                                                                        |
| Workspace           | `WorkspaceSpec`, `WorkspaceRecord`, event, operation, snapshot, diff, and patch contracts | Managed roots, revisioned lifecycle state, relative-path safety, quotas, bounded events, mutation evidence, and optimistic concurrency. |
| Environment         | `ExecutionEnvironmentSpec`                                                                | Provider choice, image pinning, process policy, resources, mounts, network, security, secrets, logging, and lifecycle policy.           |
| Sandbox             | `SandboxRecord`, lifecycle requests, `SandboxProvider`                                    | Revisioned sandbox state and the adapter boundary for create, start, execute, cancel, status, terminate, cleanup, and close.            |
| Command             | `CommandExecutionRequest`, `CommandExecutionResult`, `CommandOutputChunk`                 | Governed command input, bounded output, terminal evidence, resource usage, cancellation, and receipts.                                  |
| Persistence         | `ExecutionStore`, record, lease, fencing, idempotency, and recovery contracts             | Compare-and-set updates, exclusive workers, stale-writer rejection, and restart-safe reconciliation evidence.                           |
| Events              | typed Sandbox, Command, and Network Authorization events                                  | Bounded lifecycle evidence without raw output, host paths, environment values, or plaintext secrets.                                    |
| Cache boundary      | execution validity, environment fingerprint, and result projection contracts              | Deterministic reuse inputs without placing cache policy or storage inside Core.                                                         |

All public structures have TypeScript types and Zod validators. External schema consumers can use
the corresponding JSON Schema exports. Validator helpers use the `validate*` naming convention.

## Workspace Safety

Workspace paths are relative to a managed root. Validation rejects POSIX roots, Windows drive and
backslash roots, traversal segments, null bytes, encoded traversal, and Unicode-confusable forms.
`WorkspacePathPolicySpec` declares readable, writable, executable, and denied paths; the adapter is
responsible for canonicalizing the actual filesystem path, enforcing symlink policy, and verifying
that the resolved target remains inside the managed root.

Write, delete, restore, and patch requests carry operation identity and may carry idempotency or
expected-hash guards. Results return hashes and `FileMutation` evidence so replay and audit do not
need raw file contents in events.

`WorkspaceRecord` and `WorkspaceEventPayload` have strict Zod validators, JSON Schemas, and exported
fixtures. Record validation enforces lifecycle evidence and timestamp ordering; event validation
rejects duplicate references and recursively blocks sensitive or unbounded payload fields.
Workspace lifecycle events use a typed event map and a dedicated factory that validates the event
envelope, payload, and matching Workspace identity before the event can be recorded.

## Sandbox and Command Lifecycle

Sandbox and command states have explicit transition tables. Providers return normalized records and
results rather than SDK objects. Command results bind execution and sandbox identity, distinguish
terminal states, require normalized error evidence for unsuccessful terminals, and use artifact
references when bounded inline output is truncated.

Stateful `SandboxProvider` methods accept governed request objects rather than raw sandbox or
execution identifiers. Mutation requests carry an operation id, principal, expected record
revision, and optional idempotency evidence; status requests carry the principal. This keeps
authorization identity, optimistic concurrency, retries, audit, and replay explicit at the adapter
boundary without moving policy decisions or Runtime scheduling into Core. The compatibility
rationale is recorded in the
[Governed Execution Provider Requests RFC](../rfc/2026-07-17-governed-execution-provider-requests.md).

`SandboxProviderCapabilities` and capability negotiation keep environment requirements separate
from a concrete provider. Runtime code can reject an incompatible provider before any side effect.

## Deterministic Mock Provider

`@hypha/testing` exports `MockExecutionProvider` for provider contract tests, replay fixtures, and
failure injection. It implements the governed `SandboxProvider` requests in memory and supports a
queue of deterministic execution behaviors. A behavior can configure delay, terminal status,
stdout and stderr, truncation references, file mutations, generated Artifact references, resource
usage, and normalized errors. Delayed executions can be cancelled with an
`ExecutionCancelRequest`; Sandbox revisions, cleanup, health, and closed-provider behavior remain
observable through the normal provider contract.

The mock never starts a process, reads or writes a Workspace, or provides a security boundary.
Isolation capabilities therefore remain false; cancellation, process-tree termination, and
snapshots are simulated contract capabilities only. It also does not emit Framework events by
itself: Runtime or Harness code remains responsible for authorization, lifecycle event emission,
and durable execution records around every provider call.

## Trusted Local Process Provider

`@hypha/adapters-local` exports `LocalProcessExecutionProvider` for trusted engineering and local
development. It is not a strong Sandbox: process, filesystem, network, and resource isolation
capabilities remain `false`. Commands must select an explicitly configured executable alias; the
provider never invokes a shell, searches `PATH`, or inherits the complete host environment.
Environment variables are copied from an explicit base environment and request allowlist, while
secret-like names are rejected.

The provider canonicalizes the Workspace root, executable, and working directory before execution.
It applies bounded total and idle timeouts, bounded stdout and stderr capture, cancellation, and a
bounded before/after Workspace scan that reports content and metadata mutations without following
symlinks or junctions outside the managed root. Output that exceeds the configured limit fails with
normalized evidence; the adapter does not invent an Artifact reference when no Artifact store has
persisted the omitted bytes.

On POSIX platforms each command starts in a dedicated process group and cancellation follows a
graceful-then-forced group termination sequence. On Windows the Node.js standard library cannot
create a Job Object, so the adapter may use bounded `taskkill /T /F` cleanup only as an explicitly
enabled trusted-development fallback. It reports `processTreeKill: false`, health as degraded, and
rejects construction by default on Windows. Capability negotiation must therefore fail closed when
an environment requires a verified process-tree guarantee.

Runtime or Harness code remains responsible for capability negotiation, authorization, lifecycle
events, durable execution records, and Artifact persistence around provider calls. The local
adapter only implements the provider boundary and bounded local side effects.

## Docker Execution Provider

`@hypha/adapters-local` exports three composable Docker surfaces:

- `DockerCliCommandRunner` invokes one explicitly configured absolute `docker` executable without a
  shell and bounds management time, stdout, stderr, and combined output.
- `DockerEngineCli` translates typed operations into Docker `create`, `start`, `exec`, `inspect`,
  `stats`, `stop`, `kill`, and `rm` argument arrays.
- `DockerExecutionProvider` implements the governed `SandboxProvider` lifecycle over an injected
  `DockerEngineClient`, which keeps provider contract tests independent of a local daemon.

The provider requires an immutable `sha256` image digest, a numeric non-root user, read-only root
filesystem, exactly one canonical Workspace bind mount, CPU, memory, and PID limits,
`CAP_DROP=ALL`, no-new-privileges, no shell, no host environment inheritance, and no nested
containers. Disabled networking maps to Docker's `none` network. Enabled bridge networking is
available only through explicit provider configuration; restricted and task-authorized networking
fail closed until a governed egress adapter exists.

Sandboxes are single-use. After every command, including successful, failed, cancelled, timed-out,
output-limited, and OOM-killed commands, the provider stops the complete container scope, verifies
that it is no longer running, and force-kills it when graceful stop is insufficient. Cleanup removes
the owned container and anonymous volumes idempotently. Results carry bounded output, host-visible
Workspace mutation evidence, Docker inspection receipts, and bounded CPU percentage, memory,
network, block-I/O, PID, and output metrics when Docker exposes them.

Disk/write limits, volume snapshots, custom security profiles, signature policies, Secret
injection, output redaction, and restricted egress require dedicated enforcement adapters and are
rejected rather than silently ignored. Runtime or Harness still owns authorization, capability
negotiation, lifecycle events, durable records, and Artifact persistence.

## Store, Lease, and Recovery Rules

An `ExecutionRecord` is revisioned. Store adapters must apply compare-and-set atomically. When the
current record is leased, mutation must also validate the lease id, owner id, and monotonically
increasing fencing token against stored state; request validation alone is not a substitute for that
atomic check.

Idempotency resolution is scoped by user, workspace, key, and fingerprint. A matching fingerprint
may reuse the existing record; a different fingerprint is a conflict. Recovery assessments record
whether work never started, remains provider-queryable, completed without a persisted result, or has
unknown provider state. Runtime and adapters decide the recovery action and emit the corresponding
events.

## Event and Cache Boundaries

Execution events carry identifiers, revisions, status, hashes, metrics, normalized errors, and
artifact references. Payload and envelope validators reject undeclared top-level fields and inspect
nested metadata/error details for sensitive or unbounded content names.

Execution cache fingerprints include command, source tree, environment, network policy, dependency,
image, workspace snapshot, and secret-version evidence as applicable. Reuse fails closed when an
environment fingerprint is unavailable or an operation has external or irreversible side effects.
Raw environment values, secrets, stdout, and stderr are not cache-key inputs.

## Extension Boundary

Adapters may implement local processes, containers, or remote sandboxes, but Core remains provider
neutral. Side effects must be authorized before provider calls, recorded as events, and represented
by bounded results or references. Domain-specific workflow, prompt, task, or business schema belongs
in a DomainPack rather than these execution contracts.

## Security and Provider References

- [Execution Threat Model](execution-threat-model.md) defines assets, trust boundaries, required
  controls, audited runtime surfaces, and residual limitations.
- [Execution Provider Capability Matrix](../reference/execution-provider-capability-matrix.md)
  defines the evidence represented by each capability and the minimum negotiation rules.
- [ADR 0003](../adr/0003-content-addressed-execution-artifacts.md),
  [ADR 0004](../adr/0004-execution-process-tree-termination.md), and
  [ADR 0005](../adr/0005-execution-network-policy.md) define Artifact identity, termination, and
  network enforcement decisions.
