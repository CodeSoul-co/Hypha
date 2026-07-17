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

## Sandbox and Command Lifecycle

Sandbox and command states have explicit transition tables. Providers return normalized records and
results rather than SDK objects. Command results bind execution and sandbox identity, distinguish
terminal states, require normalized error evidence for unsuccessful terminals, and use artifact
references when bounded inline output is truncated.

`SandboxProviderCapabilities` and capability negotiation keep environment requirements separate
from a concrete provider. Runtime code can reject an incompatible provider before any side effect.

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
