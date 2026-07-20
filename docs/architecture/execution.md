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
| Activity boundary   | `ExecutionActivityRequest`, `ExecutionActivityResult`                                     | Fenced Runtime-to-Execution dispatch for governed Command and Workspace operations, with event and Artifact evidence.                   |
| Tool governance     | `ExecutionToolBinding`, `ExecutionRiskAssessment`                                         | Permission, side-effect, human-review, risk evidence, and recommended isolation inputs for governed Tool execution.                     |
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
references when bounded inline output is truncated. Bounded inline stdout and stderr carry SHA-256
content hashes; a truncated inline value is only a summary and must reference the preserved full
output Artifact.

`SandboxProviderCapabilities` and capability negotiation keep environment requirements separate
from a concrete provider. Runtime code can reject an incompatible provider before any side effect.

## Runtime Activity Boundary

`ExecutionActivityRequest` is the provider-neutral handoff from Runtime scheduling to Execution. It
binds the activity, operation, Run, FSM state attempt, Workspace, fencing token, optional deadline,
and idempotency identity to one validated `CommandExecutionRequest` or Workspace operation. Boundary
validation rejects conflicting operation, Run, Workspace, and idempotency identities before an
adapter is called.

`ExecutionActivityResult` returns a terminal activity status plus bounded Execution, Artifact,
snapshot, Event, and normalized-error references. Event evidence is mandatory and references must
be unique. These contracts do not schedule FSM transitions, pause or resume a Run, approve a Tool,
or select a provider; those responsibilities remain with Runtime, Tool governance, and adapters.

## Tool Governance Boundary

Command, file, Sandbox, and Artifact capabilities are registered as governed Tools through an
`ExecutionToolBinding`. The binding declares the Execution operation, profile, required permission
scopes, side-effect level, and optional human-review policy reference. It does not bypass
`GovernedToolRunner` or invoke a provider directly.

`ExecutionRiskAssessment` carries bounded reasons, matched rule identifiers, approval requirement,
recommended isolation, and evaluation time. High and critical risk fail closed unless approval is
required. Execution supplies these risk facts and constraints; Tool policy and Human Approval own
the approval decision and grant lifecycle.

`DefaultExecutionRiskEvaluator` deterministically derives those facts from a validated Tool binding,
Command or Workspace request, `ExecutionEnvironmentSpec`, and `WorkspaceSpec`. Its framework rules
cover shell execution, recursive deletion, input-directory mutation, network access, package
installation, downloaded-script execution, permission changes, executable policy drift, Secret
access, background processes, and external publishing. The evaluator never authorizes a request;
adapters must still enforce environment policy and `GovernedToolRunner` must still complete policy
and approval before dispatch.

`GovernedExecutionPort` is the side-effect boundary after Tool governance. A dispatch binds the
validated activity, Tool binding, risk assessment, and authorization evidence to the
same Run, principal, operation, and Tool. The port checks required scopes, required approval,
operation compatibility, cancellation, and expiry before it asks an injected
`ExecutionAuthorizationVerifier` to validate the durable Tool, Policy, and Approval records. Only a
valid verification result reaches the injected `ExecutionOperationDispatcher`.

Execution does not trust an `approvalRef` by itself, issue approvals, read Tool-owned stores, or
reimplement the Tool input hash. The evidence carries the Tool runner's lowercase SHA-256 input
digest, while the composition root supplies a verifier that resolves the authoritative records.
Runtime pause and resume, durable Event emission, and concrete Command or Workspace dispatch remain
separate integration responsibilities.

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

## Remote Sandbox Provider Contract

`RemoteSandboxProvider` extends the common `SandboxProvider` lifecycle without exposing a remote
vendor SDK to Core, Kernel, or Runtime. Create, start, execute, cancel, terminate, status, cleanup,
health, command results, and remote execution receipts continue using the shared execution
contracts. A remote implementation additionally provides:

- `streamOutput()` as an async stream of the existing validated `CommandOutputChunk` contract;
- `uploadArtifact()` with a principal-scoped, revision-aware, idempotent transfer request and a
  validated async stream of `RemoteArtifactChunk` values;
- `downloadArtifact()` with an explicit maximum byte limit and a validated async chunk stream; and
- `RemoteArtifactTransferReceipt` as provider-neutral transfer completion and integrity evidence.

Remote Artifact chunks are base64-encoded serializable values with a transfer id, Artifact
reference, zero-based sequence, contiguous byte offset, decoded byte length, per-chunk content hash,
and explicit final marker. `validateRemoteArtifactChunkSequence()` rejects mixed transfers, gaps,
overlaps, early final markers, decoded-size mismatches, and total-size mismatches. A completed
transfer receipt requires whole-content hash evidence.

The contract requires `remoteExecution: true`; it does not define endpoints, credentials, queues,
HTTP/RPC clients, object-store clients, provider job types, or retry transports. Concrete remote
adapters remain responsible for validating every external response, normalizing vendor failures,
and proving timeout, cancellation, idempotency, receipt, and cleanup behavior in contract tests.
Closing an output iterator stops output consumption; cancelling execution still uses the governed
`cancel()` operation. Runtime or Harness continues to own authorization, policy, events, replay,
and durable records around all remote operations.

## Output Collection Contract

`ExecutionOutputCollectionPolicy` governs which final Workspace file mutations are eligible for
Artifact collection. It supports safe relative include and exclude patterns, bounded Artifact count
and total bytes, optional framework-level extension classification, and finalization after a
successful Execution. Excludes take precedence over includes.

`DefaultExecutionOutputPlanner` validates a terminal `CommandExecutionResult`, collapses its mutation
stream to the final state of each path, rejects entries without content hash and size evidence, and
applies limits in stable path order. Its plan contains bounded skip counts rather than file contents
or an unbounded rejection list. Existing stdout, stderr, and generated Artifact references are
deduplicated and carried separately so they are not collected again.

The planner is side-effect free. `DefaultExecutionOutputCollector` executes its validated plan
through a narrow Artifact Manager port. Each Workspace read is fenced by the planned content hash
and byte size, retries carry stable idempotency keys, existing Artifact references are not recreated,
and only outputs from successful Executions are finalized. The collector does not read host paths,
bypass Artifact authorization, decide a business-specific output schema, or emit Runtime events;
business output contracts stay in Domain configuration.

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
