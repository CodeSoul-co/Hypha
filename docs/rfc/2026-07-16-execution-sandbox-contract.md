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
- `SandboxLifecyclePolicySpec`.

`SandboxProvider`, `SandboxRecord`, command execution, process-tree implementation, Docker/remote
integration, Artifact capture, and Event emission remain deferred.

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
