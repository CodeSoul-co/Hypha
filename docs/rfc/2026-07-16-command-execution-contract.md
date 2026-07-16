# RFC: Governed Command Execution Contract

## Summary

Hypha should define provider-neutral command request, result, resource-usage, output-stream, and
cancellation contracts before introducing a `SandboxProvider` or any process/container adapter.
This increment is contract only. It does not call `child_process`, a shell, Docker, a remote
Sandbox, Artifact storage, Cache, or Runtime.

## Repository Mapping

| Logical responsibility              | Current repository mapping                         |
| ----------------------------------- | -------------------------------------------------- |
| Shared command types                | `packages/core/src/contracts/command-execution.ts` |
| Boundary validation and JSON Schema | `packages/core/src/modules/command-execution/*`    |
| Shared principal/error validation   | `packages/core/src/modules/execution/*`            |

The principal and normalized-error schemas previously introduced through Workspace and Sandbox
are centralized in the Execution module and re-exported where needed. Their public TypeScript
contracts do not change.

## Scope

This RFC covers the engineering specification's:

- `CommandExecutionRequest`;
- `CommandExecutionStatus` and `CommandExecutionResult`;
- `ExecutionResourceUsage`;
- normalized failure/status mapping;
- governed cancellation request;
- provider receipt and streamed-output boundary proposals.

`SandboxProvider`, `ExecutionRecord`, `ExecutionLease`, real command execution, output persistence,
Artifact creation, Cache lookup, Event emission, Policy evaluation, and Human Approval remain
deferred.

## Missing Engineering-Spec Types

The engineering specification references `ExecutionReceipt` and `ExecutionCancelRequest` without
defining their fields. It also requires streamed and truncated output behavior without defining a
portable output chunk. This RFC proposes:

```ts
export interface ExecutionReceipt {
  id: string;
  providerId: string;
  executionId: string;
  providerExecutionRef?: string;
  status: 'accepted' | 'completed' | 'rejected' | 'unknown';
  issuedAt: string;
  receiptHash: string;
  metadata?: Record<string, unknown>;
}

export interface CommandOutputChunk {
  executionId: string;
  sequence: number;
  stream: 'stdout' | 'stderr';
  encoding: 'utf8' | 'base64';
  content: string;
  byteLength: number;
  contentHash: string;
  emittedAt: string;
  truncated?: boolean;
}
```

`ExecutionCancelRequest` carries an operation ID, principal, expected record revision, optional
grace period, idempotency key, reason, and trace correlation references. The expected revision
prevents a stale cancellation from racing a completed or recovered execution.

These are RFC-level proposals, not claims that the omitted fields were already fixed by the
engineering specification.

## Boundary and Security Validation

- executable, arguments, and environment data reject null bytes;
- `cwd` is a Workspace-relative path and is resolved by Workspace policy, never accepted as a raw
  host path;
- request user/tenant ownership must match the declared `ExecutionPrincipal` boundary;
- Secret references are explicit and unique; plaintext Secret discovery remains a Policy/Secret
  broker responsibility;
- limits are positive, while measurements and revisions are non-negative;
- terminal results require `completedAt`; non-success terminal results require a normalized error;
- a fail-closed transition table prevents terminal executions from restarting or moving backward;
- timeout, cancellation, OOM, and resource failure statuses must use their corresponding normalized
  error codes;
- truncated stdout/stderr requires an Artifact reference so data loss is explicit;
- Provider receipts must reference the same execution;
- output chunks are ordered, hashed, timestamped, and encoding-aware.

`shell: true` remains representable because it is part of the engineering specification, but
schema validation is not authorization. Runtime must still require Tool Policy, Environment shell
permission, Workspace permission, risk assessment, Human Approval when applicable, and a capable
Sandbox Provider. No `approved: true` shortcut exists in this contract.

The engineering specification requires `startedAt` even though status includes `queued`. This RFC
preserves that published field contract rather than silently changing it. Execution Store design
may later add a separate creation/queue timestamp if needed.

## Artifact and Cache Compatibility

Command results contain only Artifact and Snapshot references, never Artifact bytes. Large output
must be persisted by a later Artifact integration and represented inline only as a bounded summary.
This keeps the contract compatible with the canonical Artifact work without duplicating the
Memory-owned legacy `ArtifactRef`.

This increment does not implement Cache. It preserves the inputs needed for later cache validity:
the Workspace snapshot expectation, Environment reference, command arguments, idempotency key,
network authorization reference, generated Artifact references, and deterministic result metadata.
Cache must store result metadata, hashes, and Artifact references only; it must not store Secrets or
raw large output through this contract.

## Acceptance

- TypeScript, Zod, JSON Schema, examples, and tests agree;
- unsafe paths, null bytes, ownership mismatch, invalid lifecycle evidence, and mismatched errors
  are rejected;
- truncated output cannot silently discard bytes;
- shell mode is not treated as policy approval;
- package tests, typecheck, lint, and package build pass;
- the pre-existing Windows FilesystemTool unit-test failure is reported separately;
- no Provider, Artifact store, Cache implementation, Runtime scheduler, or Server route is added.
