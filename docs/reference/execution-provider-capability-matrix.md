# Execution Provider Capability Matrix

`SandboxProviderCapabilities` contains independently negotiated guarantees. A provider reports
observed enforcement, not intended architecture. Environment, command, policy, and runtime
requirements are derived before provider creation, and any missing capability makes the selection
incompatible.

## Public Capability Fields

| Capability            | Guarantee when `true`                                                                  |
| --------------------- | -------------------------------------------------------------------------------------- |
| `processIsolation`    | Executed processes cannot act as ordinary host processes outside the provider boundary |
| `filesystemIsolation` | Filesystem access is enforced independently of application-level path checks           |
| `networkIsolation`    | Disabled or restricted network policy is enforced outside the executed application     |
| `cpuLimits`           | Declared CPU limits are enforced                                                       |
| `memoryLimits`        | Declared memory and swap limits are enforced                                           |
| `diskLimits`          | Declared disk, temporary-space, or write limits are enforced                           |
| `pidsLimit`           | Declared process-count limit is enforced                                               |
| `cancellation`        | An accepted execution can be cancelled with a terminal result                          |
| `processTreeKill`     | Timeout, cancel, terminate, and cleanup cover every descendant in the execution scope  |
| `snapshots`           | The provider can create and restore the requested Workspace capture surface with verifiable snapshot evidence |
| `imageDigestPinning`  | The executed image is selected and verified by immutable digest                        |
| `remoteExecution`     | Work is executed by a remote provider with queryable identity and receipts             |

## Provider Requirements and Available Surfaces

| Provider kind    | Isolation expectation                                                                                       | Required lifecycle behavior                                                                                                 | Available framework surface                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `mock`           | No external process, filesystem, or network side effect                                                     | Deterministic result and lifecycle for tests                                                                                | Contracts and test doubles; never a security sandbox                                             |
| `local_process`  | No process or network isolation may be assumed; managed-root checks provide only filesystem confinement     | Cancellation and process-tree kill require a platform process group or Job Object before those capabilities may be reported | `LocalProcessExecutionProvider` is a trusted-development adapter; its Windows fallback reports `processTreeKill: false` |
| `docker`         | Process, filesystem, namespace, resource, mount, security, network, and image-digest controls are mandatory | Stop, forced kill, receipt capture, and container cleanup are idempotent and reconciled                                     | Environment validation and capability requirements; no concrete Docker adapter                   |
| `remote_sandbox` | Provider contract attests enforceable process, filesystem, network, resource, and tenant isolation          | Create, query, cancel, terminate, cleanup, health, and remote receipt reconciliation are required                           | Provider port and remote capability requirement; no concrete remote adapter                      |
| `custom`         | No capability is inferred from the provider name                                                            | Every claimed capability requires adapter contract tests and runtime health evidence                                        | Provider-neutral extension port                                                                  |

## Minimum Negotiation Rules

| Requested policy                                          | Required capability                       |
| --------------------------------------------------------- | ----------------------------------------- |
| Any non-mock executable environment                       | `cancellation`, `processTreeKill`         |
| Docker or remote sandbox environment                      | `processIsolation`, `filesystemIsolation` |
| Network mode other than `enabled`                         | `networkIsolation`                        |
| Read-only root, mounts, masks, or explicit writable paths | `filesystemIsolation`                     |
| CPU, memory, disk, or PID limits                          | Matching resource capability              |
| Snapshot before, after, or on failure                     | `snapshots`                               |
| Image digest or required digest pin                       | `imageDigestPinning`                      |
| Remote sandbox selection                                  | `remoteExecution`                         |

Capability negotiation is fail-closed. A local adapter reports `false` for a guarantee it cannot
enforce; configuration, documentation, or best-effort cleanup is not sufficient evidence.

## Evidence Required for Capability Claims

| Capability group                   | Minimum evidence before reporting `true`                                                                                                                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Process isolation                  | A provider contract test demonstrates that the workload cannot address or signal host processes outside its execution scope                                                          |
| Filesystem isolation               | Negative tests cover traversal, absolute and encoded paths, Unicode forms, symlink or junction escape, protected host paths, mount modes, and final-target replacement               |
| Network isolation                  | Tests exercise disabled and restricted modes, direct IP access, redirects, DNS rebinding, IPv4 and IPv6 private ranges, metadata endpoints, ports, protocols, limits, and revocation |
| CPU, memory, disk, and PID limits  | Provider-observed tests exceed each configured limit and verify bounded termination, normalized evidence, and cleanup without host-wide impact                                       |
| Cancellation and process-tree kill | Platform tests create descendants, request graceful cancellation, force termination after the grace period, and prove no descendant or owned resource remains                        |
| Snapshots                          | The provider declares whether coverage is Tool mutation, filesystem, volume, or remote snapshot; tests include process-created changes when complete coverage is claimed, compare content digests, metadata, mutation evidence, restore confinement, stale-base conflicts, failure, and retry |
| Image digest pinning               | Provider receipts identify the immutable digest actually executed; tag resolution alone is insufficient                                                                              |
| Remote execution                   | Receipts bind provider identity, remote execution identity, request fingerprint, terminal state, and reconciliation after transport failure                                          |

Evidence is scoped to a provider implementation, version, platform, and effective configuration.
A health check proves availability, not isolation. If an enforcement dependency is unavailable or
cannot be verified, the provider reports the affected capability as `false` and negotiation is
re-evaluated before any side effect.

A governed Tool pre-write checkpoint is useful recovery evidence but does not by itself satisfy the
provider `snapshots` capability: it cannot observe arbitrary shell or subprocess mutations. Provider
documentation and receipts must name the capture surface so Runtime, Cache, and recovery logic do
not infer broader coverage.
