# RFC: Execution Environment and Sandbox Policy Contract Foundation

## Summary

Hypha should define provider-neutral Execution Environment and Sandbox policy contracts before
implementing Mock, Local Process, Docker, or Remote Sandbox providers. This increment is contract
only: it adds TypeScript types, Zod validation, JSON Schema, safe examples, and tests without
executing a process or creating a container.

## Repository Mapping

The engineering specification uses logical `src/modules/execution` paths. The current repository
mapping is:

| Logical responsibility          | Current repository mapping                          |
| ------------------------------- | --------------------------------------------------- |
| Execution/Sandbox shared types  | `packages/core/src/contracts/sandbox.ts`            |
| Environment Spec and validation | `packages/core/src/modules/execution-environment/*` |
| Sandbox lifecycle validation    | `packages/core/src/modules/sandbox/*`               |
| Future local providers          | `packages/adapters-local/src/execution/*`           |

No npm package, provider implementation, Runtime scheduler, Tool entry point, Cache store, Domain
binding, or Server route is introduced by this RFC.

## Scope

This RFC covers the engineering specification's policy contracts:

- `ExecutionEnvironmentSpec` and `ExecutionImageSpec`;
- `ProcessPolicySpec` and `ResourceLimitSpec`;
- `SandboxFilesystemPolicySpec`, mounts, and tmpfs;
- `NetworkPolicySpec`;
- `SandboxSecurityPolicySpec`;
- `SecretInjectionPolicySpec`;
- `ExecutionLoggingPolicySpec`;
- `SandboxLifecyclePolicySpec`;
- `SandboxProviderCapabilities`, `SandboxStatus`, and `SandboxRecord`;
- governed create, start, status, terminate, and cleanup request contracts.

`SandboxProvider`, command execution, process-tree implementation, Docker/remote integration,
Artifact capture, and Event emission remain deferred. The Provider port is intentionally deferred
until `CommandExecutionRequest` and `CommandExecutionResult` exist, so it does not expose an
incomplete or temporary execution method.

## Missing Engineering-Spec Types

The engineering specification references two types without defining their fields. The initial
contract defines them as follows.

```ts
export interface SandboxTmpfsSpec {
  targetPath: string;
  sizeBytes?: number;
  mode?: number;
  noExec?: boolean;
  noSuid?: boolean;
  noDev?: boolean;
}

export interface ExecutionLoggingPolicySpec {
  captureStdout: boolean;
  captureStderr: boolean;
  streamOutput?: boolean;
  includeTimestamps?: boolean;
  maxLineBytes?: number;
  redactPatterns?: string[];
  persistOutputAsArtifact?: boolean;
}
```

Tmpfs fields align with the mount security flags already required by the specification. Logging
contains policy and limits only; it does not contain output, credentials, or provider-specific
logger configuration.

## Lifecycle Request Contract Proposal

The engineering specification names `SandboxCreateRequest` and uses scalar arguments for other
Provider lifecycle methods, but it does not define the create fields or governed lifecycle request
boundaries. This RFC proposes the minimum provider-neutral requests needed before a Provider port:

- create binds the complete validated `ExecutionEnvironmentSpec`, its immutable revision, the
  Workspace and Run identity, the owning user/tenant boundary, an `ExecutionPrincipal`, and an
  optional idempotency key;
- start, terminate, and cleanup carry `operationId`, `sandboxId`, `ExecutionPrincipal`,
  `expectedRevision`, and an optional idempotency key;
- status carries `sandboxId` and `ExecutionPrincipal` because reads are governed capabilities too;
- terminate and cleanup may include a non-secret reason for audit and trace use.

The explicit `expectedRevision` prevents a stale caller from racing execute, terminate, or cleanup.
The create validator rejects a declared principal user or tenant that does not match the requested
owner boundary. These contracts do not execute side effects and do not define policy decisions or
Event emission on behalf of Runtime/Harness owners.

`SandboxRecord` follows the engineering specification. Runtime validation additionally requires
state evidence: ready/busy records have `readyAt`, terminated records have `terminatedAt`, cleaned
records have `cleanedAt`, failed records have a normalized error, and inactive/terminal records do
not retain active execution IDs. A fail-closed transition table makes the permitted status edges
explicit; notably, a busy Sandbox cannot enter cleanup and a cleaned Sandbox cannot restart.

## Security Validation

The first contract enforces these non-negotiable rules:

- Docker environments require an image, digest pin, read-only root filesystem, non-root execution,
  no-new-privileges, and non-privileged mode;
- process-tree termination is mandatory;
- host environment inheritance and OOM-killer disabling default to false;
- Docker socket mounts are rejected;
- device access and host bind mounts require explicit policy flags;
- disabled networking cannot declare network access and task-authorized networking requires a TTL;
- Secret output/event redaction is mandatory, and non-`none` injection requires a TTL;
- numeric timeouts, quotas, and resource limits are positive;
- allow/deny lists cannot contain the same normalized value.

Provider capability validation is still required later. A Provider must reject an Environment when
it cannot enforce a required isolation or resource policy; it must not silently degrade security.

`workingDirectoryPolicy: "configured_paths"` is retained because it is part of the engineering
specification, but that specification does not define where those paths are declared. This RFC does
not invent a second path field: providers must reject unresolved `configured_paths` environments
until a later Workspace/Environment binding contract supplies the configured path references.

## Cache Compatibility

Execution Environment is not a Cache implementation. Later runtime code will derive a stable
`ExecutionEnvironmentFingerprint` from image digest, executable versions, resource policy,
network policy, mount policy, dependency lock, and Secret version references. Cache consumes only
those hashes and references, never Secrets, full environment variables, logs, or filesystem bytes.

## Acceptance

- TypeScript, Zod, JSON Schema, and the safe example agree;
- unsafe Docker, process, mount, network, and Secret configurations are rejected;
- `npm run typecheck`, package tests, lint, and package build pass;
- the pre-existing Windows FilesystemTool unit-test failure remains reported separately;
- no unrelated module or provider implementation changes are present.
