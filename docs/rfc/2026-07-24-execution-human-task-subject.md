# RFC: Execution HumanTask Subject

## Status

Proposed

## Context

High-risk command execution may require a durable human decision before a provider can run.
The Runtime module owns HumanTask lifecycle, persistence, decision scopes, expiry, revision, and
resume semantics. Execution owns the security-relevant description of the command that a reviewer
approves.

A Runtime HumanTask therefore needs a stable `subjectRef` and `subjectHash` that bind the decision
to the exact Execution activity, command, Workspace expectations, environment policy, provider
revision, risk assessment, and policy decision. Reusing an unstructured object would make it easy
to omit security-sensitive fields or accidentally include secret values.

## Decision

Add a versioned `ExecutionHumanTaskSubject` public contract and a factory that:

- accepts an already validated command activity, tool binding, risk assessment, environment,
  policy decision reference, provider identity, and provider revision;
- requires an approval-bearing risk assessment and HumanReview policy binding;
- records command arguments, Workspace identity, fencing token, mounts, network policy summary,
  resource limits, expected side effects, provider revision, and environment revision;
- records only environment variable names and Secret references, never environment values, stdin,
  or Secret values;
- validates that the command references the supplied environment version and revision;
- produces a canonical SHA-256 `subjectHash` compatible with Runtime HumanTask;
- remains provider-neutral and does not implement HumanTask lifecycle or persistence.

The initial version covers command execution. Workspace operations can add a separately modelled
subject variant in a later RFC instead of encoding operation-specific payloads as unvalidated
metadata.

## Security invariants

1. A decision is bound to `runId`, `stateAttemptId`, `activityId`, `operationId`, Workspace,
   fencing token, input hash, policy decision, risk assessment, provider revision, and environment
   revision.
2. `task_authorized` networking requires a matching network authorization reference.
3. Requested Secret references must be permitted by the environment policy when that policy
   declares an allow list.
4. Subject hashing uses canonical JSON, so property insertion order cannot change the identity.
5. Any mutation after approval changes the subject hash and must fail Runtime subject-hash
   revalidation before dispatch.
6. The final Execution port still performs its own last-await revalidation; HumanTask approval
   does not replace authorization, scope, lease, fencing, deadline, or provider checks.

## Ownership and integration

- `execution`: subject contract, Runtime Schema, JSON Schema, canonical snapshot factory, tests.
- `runtime`: HumanTask lifecycle, persistence, decision, expiry, checkpoint, and resume.
- `tools`: Tool invocation binding to Execution.
- `dev`: composition and API/worker wiring.

The Execution contract does not import a Runtime HumanTask implementation. Integration passes the
returned `subject.id` and `subjectHash` to Runtime with HumanTask kind `execution`.

## Compatibility

This is an additive public API. No existing Execution, Runtime, Tool, or Provider contract changes.
The subject carries `version: 1.0.0`; incompatible future shapes require a new version.

## Alternatives considered

- Reuse the full command request: rejected because it contains environment values and stdin.
- Store an arbitrary metadata object: rejected because important identity fields could be omitted.
- Implement a second HumanTask lifecycle in Execution: rejected because Runtime already owns the
  durable lifecycle and recovery semantics.
- Hash only command text and arguments: rejected because Workspace, policy, environment, provider,
  fencing, and input identity could change without invalidating approval.
