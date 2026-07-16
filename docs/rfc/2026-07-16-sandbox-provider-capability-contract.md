# RFC: Sandbox Provider Port and Capability Negotiation

## Summary

Hypha should expose one provider-neutral `SandboxProvider` port and reject an Environment or Command
when a selected Provider cannot enforce its required isolation and lifecycle capabilities. This
increment defines the port, capability requirement/negotiation contracts, deterministic derivation,
JSON Schema, fixtures, and tests. It does not implement Mock, Local Process, Docker, or Remote
Providers.

## Provider Port

The Provider port exposes:

- identity and asynchronous capability discovery;
- governed create, start, status, terminate, and cleanup requests;
- governed command execution and cancellation;
- normalized health reporting;
- optional resource cleanup through `close`.

All lifecycle calls use the request contracts established by the Sandbox lifecycle RFC instead of
bare IDs. This keeps `ExecutionPrincipal`, expected Revision, operation ID, and idempotency context at
the boundary. The port contains no Docker SDK, remote API response, filesystem path, queue, Runtime,
or Cache type.

## Snapshot Method Deferral

The engineering specification shows an optional Provider method:

```ts
snapshot?(request: SandboxSnapshotRequest): Promise<ArtifactRecord>;
```

Neither `SandboxSnapshotRequest` nor the canonical Execution-owned `ArtifactRecord` is available yet.
Memory currently has a legacy Artifact reference with a different shape. This RFC deliberately does
not use `unknown`, a generic placeholder, or the Memory type to make the method compile. Because the
method is optional, omitting it does not prevent a concrete object from implementing extra snapshot
behavior. The typed method will be added additively after the canonical Artifact contract exists.

## Capability Requirements

The canonical capability names remain those in the engineering specification:

```text
processIsolation
filesystemIsolation
networkIsolation
cpuLimits
memoryLimits
diskLimits
pidsLimit
cancellation
processTreeKill
snapshots
imageDigestPinning
remoteExecution
```

Every requirement records its source (`environment`, `command`, `policy`, or `runtime`) and a
non-secret reason. Negotiation returns the Provider capability declaration, all requirements, the
unique missing capabilities, and a final `compatible` decision. Result validation recomputes the
missing set so a Provider cannot claim compatibility while concealing an unmet requirement.

## Deterministic Derivation

The pure derivation function currently maps:

- Docker and Remote Sandbox profiles to process/filesystem isolation;
- non-enabled network modes to network isolation;
- filesystem mounts, tmpfs, masks, scoped paths, and read-only roots to filesystem isolation;
- declared CPU, memory, disk/write, and PID/process limits to their enforcement capabilities;
- executable commands to cancellation and process-tree termination;
- snapshot command/lifecycle flags to snapshot capability;
- image digest requirements to image-digest pinning;
- Remote Sandbox profiles to remote execution.

Explicit Policy or Runtime requirements can be appended. The result contains at most one requirement
per capability, which makes negotiation deterministic.

Mock environments do not claim or require real isolation because they execute no process. Local
Process profiles may omit process isolation only when their Environment does not declare stronger
filesystem/network/resource constraints. They still require cancellation and process-tree kill.
This preserves Local Process as a trusted-development Provider without describing it as a security
Sandbox.

## Fail-Closed Rule

Runtime must validate an Environment, derive requirements, query Provider capabilities, negotiate,
and reject before `create` or `execute` if `compatible` is false. Providers must not silently ignore
unsupported resource, network, filesystem, image, snapshot, cancellation, or process-tree policy.
Capability negotiation is evidence for Policy/Trace; it is not a replacement for Tool Policy or
Human Approval.

## Cache Compatibility

Capability declarations and the negotiated Provider ID may contribute to the later Environment
fingerprint. Capability negotiation does not read or write Cache. Cache cannot turn an incompatible
Provider into a compatible one and cannot bypass negotiation on a hit.

## Ownership and Deferred Work

- Execution owns the Provider port, capabilities, and deterministic negotiation facts;
- concrete local adapters belong under `packages/adapters-local` in a later Provider phase;
- Runtime owns Provider selection orchestration, Activity, retry, cancellation propagation, and
  recovery;
- Policy/Harness owns authorization and trace decisions;
- Artifact snapshot integration remains deferred to the canonical Artifact contract.

## Acceptance

- the public Provider port contains no concrete Provider dependency;
- Environment, Command, Policy, and Runtime requirements are representable;
- missing capabilities cause a fail-closed incompatible result;
- Local Process and Mock profiles are not mislabeled as strong isolation;
- TypeScript, Zod, JSON Schema, examples, and tests agree;
- typecheck, package tests, lint, and package build pass;
- the pre-existing Windows FilesystemTool unit-test failure is reported separately;
- no Provider implementation, Store adapter, Runtime scheduler, Cache behavior, or Artifact
  placeholder is added.
