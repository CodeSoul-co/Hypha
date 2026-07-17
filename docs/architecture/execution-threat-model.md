# Execution Threat Model

Hypha treats executable code, generated files, network access, and injected credentials as
untrusted by default. Execution contracts define the authorization and evidence required before an
adapter may cross an operating-system, container, or remote-provider boundary. Contract validation
is not itself isolation: a provider must enforce the declared policy and report only capabilities
it can actually guarantee.

## Security Objectives

- Keep host files, credentials, processes, and networks outside an execution's authority.
- Restrict each execution to its principal, Workspace, environment revision, and policy revision.
- Prevent command, path, environment, mount, and network-policy input from becoming implicit
  authority.
- Bound CPU, memory, process count, disk writes, output, duration, and retained resources.
- Make cancellation, cleanup, recovery, and replay deterministic and auditable.
- Keep approval records, leases, events, checkpoints, cache metadata, and provider credentials
  outside the authority of the workload they govern.
- Keep large or sensitive bytes in governed storage and place only hashes and references in
  events and cache records.

## Trust Boundaries

| Boundary                                       | Untrusted input                                                      | Required enforcement                                                                                     |
| ---------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Agent or Tool to harness                       | Command, arguments, paths, requested capabilities, metadata          | Principal and permission checks, policy decision, approval when required, schema validation, trace event |
| Harness to Execution service                   | Environment, Workspace, Artifact, cache, and lifecycle references    | Immutable revisions, capability negotiation, idempotency, lease, and fencing checks                      |
| Execution service to provider                  | Executable, arguments, mounts, resources, network, and secret policy | Provider-side isolation, resource limits, minimal secret resolution, bounded output, cancellation scope  |
| Provider to host, container, or remote runtime | Filesystem handles, processes, DNS, sockets, credentials             | Operating-system, container, proxy, or remote control-plane enforcement                                  |
| Provider to Workspace and Artifact storage     | Generated files, snapshots, output streams, manifests                | Canonical paths, final-target confinement, quotas, content verification, lineage, and access checks      |
| Execution to Event and Cache storage           | Status, errors, metrics, hashes, references                          | No plaintext secrets, raw environment values, host paths, or unbounded stdout and stderr                 |
| Workload to Execution control-plane storage    | File, shell, mount, and network operations that may reach framework state | Independently protected roots; deny rules take precedence over broad Workspace grants; no workload write authority over policy, approval, lease, event, checkpoint, cache-index, or provider-credential state |

## Threats and Required Controls

| Threat                                 | Required controls                                                                                                                                                                        | Residual limitation                                                                                                  |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Shell or argument injection            | Prefer executable plus argument array; shell disabled by default; executable allowlist; no user-input concatenation                                                                      | A permitted executable can still interpret its own arguments as code and remains policy-sensitive                    |
| Process escape or orphaned descendants | Isolated process group, Windows Job Object, container, or remote termination scope; graceful cancel followed by forced termination; cleanup reconciliation                               | Killing only the direct child is not a process-tree guarantee                                                        |
| Path traversal and link escape         | Workspace-relative paths; deny absolute, encoded, Unicode-confusable, and traversal forms; canonicalize existing roots and final targets; use handle-relative operations where available | String-prefix checks and check-then-open sequences remain vulnerable to symlink, junction, hardlink, or TOCTOU races |
| Host filesystem exposure               | Precise Workspace mounts or managed roots; separate read, write, execute, and deny policy; read-only root filesystem for containers                                                      | A local process with path checks is not OS-level filesystem isolation                                                |
| Control-plane state modification        | Store framework-owned policy, approval, lease, event, checkpoint, cache-index, and provider-credential state outside workload roots; apply an independent deny guard after Workspace resolution and again at the storage boundary | A broad Workspace or host mount must never implicitly authorize mutation of the mechanisms that govern or audit the same execution |
| Secret leakage                         | Resolve references at the provider boundary; minimal allowlist; short lifetime; revoke on completion; redact output, events, errors, and logs                                            | Inheriting the complete host environment can disclose unrelated credentials to a child process                       |
| Network escape, SSRF, or DNS rebinding | Network disabled by default; provider or proxy enforcement; DNS resolution and pinning; private and metadata ranges denied; bounded authorization lifetime                               | Application-only URL validation cannot provide network isolation                                                     |
| Resource exhaustion                    | CPU, memory, PID, disk, output, connection, byte, idle, and wall-clock limits; deterministic cleanup                                                                                     | Timeout and output buffering alone do not constrain CPU, memory, descendants, or disk usage                          |
| Container breakout                     | Non-root user, no new privileges, dropped capabilities, no privileged mode, no Docker socket, precise mounts, immutable image digest                                                     | A container is not a security boundary unless every declared control is enforced by its adapter and host runtime     |
| Artifact substitution or corruption    | Algorithm-qualified content digest, verification on write and read, immutable blob identity, separate logical version and lineage                                                        | A path-derived identifier or unverified metadata hash is not content addressing                                      |
| Incomplete or unsafe Workspace restore  | Declare the capture surface; snapshot governed mutations before the side effect; use provider/filesystem snapshots or post-execution manifests for process-created changes; revalidate the live root, links, policy, and expected base hash before restore | A Tool preview cannot discover arbitrary shell, subprocess, database, network, or concurrent external side effects   |
| Replay repeats an external effect      | Replay reads persisted events, receipts, and Artifact references; it never calls the provider again                                                                                      | Ambiguous provider state remains conflict or recovery evidence and must not be guessed as success                    |
| Cache returns unsafe output            | Fingerprint command, source, environment, network, dependency, image, Workspace, and secret versions; fail closed for external or irreversible effects                                   | Cache storage must not contain plaintext secrets or substitute for Artifact access control                           |

## Repeatable Security Surface Review

Security review covers direct calls, dynamic imports, dependency-provided transports, configuration
that enables a side effect, and serialization paths that can disclose the result. A textual match
is a review signal rather than proof of a vulnerability; for example, a database object's `exec`
method is not a shell call.

| Surface family                 | Review indicators                                                                                                                                                                                | Required disposition                                                                                                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Process and shell              | `child_process`, `node:child_process`, `exec`, `execFile`, `spawn`, `fork`, synchronous variants, command-runner dependencies, stdio transports, and `shell: true`                               | Classify runtime versus test use; verify executable-plus-arguments, shell policy, environment policy, output bounds, timeout, termination scope, and cleanup                            |
| Filesystem mutation            | `fs` and `fs/promises` imports, dynamic `require`, open/read/write/append streams, copy, rename, unlink, remove, directory creation, permissions, links, temporary files, and archive extraction | Identify the authority boundary; verify canonical final target, managed root, read/write/execute policy, quota, atomicity, link behavior, and trace evidence                            |
| Path construction              | `resolve`, `join`, `normalize`, `relative`, `isAbsolute`, URL decoding, `realpath`, `lstat`, and handle opening                                                                                  | Test traversal, encoded traversal, Unicode confusables, Windows drive, UNC and device paths, case behavior, symlink, junction, hardlink, and TOCTOU changes                             |
| Container and remote execution | Docker socket paths, Docker or Podman CLI, Docker SDKs, containerd, Kubernetes Pod or Job creation, remote command APIs, and provider SDKs                                                       | Require an explicit provider adapter, immutable runtime identity, capability negotiation, resource and security controls, receipts, termination, and cleanup                            |
| Network egress                 | `fetch`, Axios, HTTP and HTTPS clients, sockets, TLS, DNS, WebSocket, proxy configuration, redirects, and provider SDK networking                                                                | Classify control-plane versus workload traffic; verify network mode, destination policy, DNS behavior, private and metadata ranges, authorization lifetime, byte limits, and revocation |
| Secrets and environment        | `process.env`, environment spreads, dotenv files, API keys, tokens, credentials, authorization headers, secret resolvers, and error/log/event/cache serialization                                | Require reference-based minimal injection, explicit inheritance, redaction, bounded lifetime, revocation, and absence of plaintext values from durable evidence                         |
| Framework-owned state          | Approval databases, policy files, leases, event logs, checkpoints, cache indexes, provider credentials, session stores, and administrative configuration                                      | Prove that workload mounts and Workspace grants exclude these roots; verify deny precedence, independent storage authorization, immutable audit evidence, and failure when a protected root overlaps a broad grant |
| Dynamic or native execution    | `eval`, `Function`, VM contexts, worker processes, WebAssembly, native add-ons, generated scripts, and interpreter flags                                                                         | Treat the surface as executable code and apply the same provider, policy, capability, trace, timeout, and cleanup requirements                                                          |

Every new or changed match is classified as runtime, administrative, build, test, or fixture code;
as direct or indirect execution; and as enforced behavior or contract-only behavior. Runtime side
effects that belong to Execution must remain behind a provider adapter. Adjacent module surfaces
retain their own boundaries and must not be described as inheriting Execution guarantees.

### Review Gate

A reviewed surface is acceptable only when all applicable statements are true:

- authority is explicit in principal, policy, capability, and immutable revision inputs;
- the side effect crosses a named adapter boundary rather than Agent or Tool code directly;
- executable, arguments, paths, environment, mounts, network, and Secret references are validated;
- framework-owned policy, approval, lease, event, checkpoint, cache-index, session, and credential
  stores remain unreachable even when a Workspace grant or mount is broader than intended;
- timeout, cancellation, process-tree termination, output bounds, and cleanup are defined;
- events contain bounded decisions, hashes, receipts, and references instead of sensitive bytes;
- replay consumes recorded evidence without repeating the side effect;
- negative tests prove denial and failure behavior, not only the successful path;
- the runtime inventory and provider capability evidence remain consistent with the code.

## Runtime Surface Inventory

### Process and Shell Surfaces

| Surface                                                             | Existing control                                                                                            | Security classification                                                                                |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `packages/adapters-local/src/workspace-runtime.ts`                  | `execFile`, `shell: false`, argument array, execute-root checks, minimal environment, timeout, output bound | Trusted local Workspace adapter; not an OS sandbox and does not prove process-tree termination         |
| `packages/inference/src/drivers.ts`                                 | `spawn`, `shell: false`, argument array, graceful and forced direct-child signals                           | Adjacent inference supervisor; inherits the host environment and does not prove descendant termination |
| MCP SDK stdio transport in `packages/mcp/src/connection-manager.ts` | Command and arguments are separate; environment comes from explicit references and an allowlist             | Adjacent transport boundary; SDK lifecycle does not by itself prove process-tree cleanup               |
| `tests/integration/full-test.ts`                                    | Literal Redis test commands                                                                                 | Test-only shell usage; not a runtime provider surface                                                  |

Agent and Tool code must not call these process surfaces directly. Governed execution flows through
the harness, policy, trace, capability negotiation, and a provider adapter.

### Filesystem Surfaces

| Surface group                                                        | Existing control                                                                                                                       | Boundary implication                                                                                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Local Workspace runtime                                              | Configured roots, `path.relative` confinement, `realpath` checks for existing targets and ancestors, separate read/write/execute roots | Stronger than string-prefix validation, but still local confinement with filesystem race limitations                                          |
| Local Artifact store                                                 | Root-relative path resolution and SHA-256 metadata hash                                                                                | Existing storage substrate is not a content-addressed Execution Artifact manager; link confinement and read-time integrity are not guaranteed |
| Config, prompt, workflow, Skill, CLI, logging, and ToolManager files | Application-specific paths and administrative configuration                                                                            | These surfaces are outside Execution and require their own authentication, canonical-path, and input controls                                 |
| Storage, serving-cache, testing, and build files                     | Adapter-owned data paths or test fixtures                                                                                              | These paths do not inherit Workspace or Sandbox guarantees                                                                                    |

Server-side path or URL installation features must not be treated as Execution providers. When they
accept untrusted input, their owning application boundary must enforce canonical destination paths,
authenticated authority, and controlled network egress.

### Snapshot Coverage Boundaries

Snapshot and rewind guarantees are defined by their capture surface rather than by the word
"snapshot":

- a governed-mutation snapshot can capture the pre-write state of Workspace operations whose
  targets are known before execution;
- a process or shell command may create, rename, or delete files that a Tool-level preview cannot
  enumerate, so complete coverage requires a provider/filesystem snapshot or a verified
  before-and-after manifest diff;
- database writes, network calls, deployments, and other external effects are never made reversible
  by a Workspace snapshot;
- restore re-runs live Workspace authorization and final-target confinement, verifies the expected
  base or snapshot hash, and reports a conflict rather than silently overwriting a concurrent
  external edit;
- snapshot manifests and events contain bounded metadata, hashes, and Artifact references; large
  file contents remain in governed Artifact storage rather than event, cache, or checkpoint JSON.

Providers and adapters must state which capture surface they implement. A Tool-level pre-write
checkpoint must not be reported as complete provider snapshot capability.

### Docker, Network, and Secret Surfaces

- No production Docker daemon, Docker socket, Docker SDK, or Docker CLI call is present. Docker is
  represented by environment validation and provider contracts only.
- Network policy has schemas, hashes, events, and capability requirements, but no concrete
  Execution adapter currently enforces namespaces, firewall rules, or governed egress.
- Execution environment contracts use Secret references rather than values and reject secret-shaped
  event and cache content. The local Workspace runtime inherits only a small operational
  environment allowlist.
- The inference supervisor inherits the full host environment. It is outside the Execution provider
  boundary and must not be presented as a sandbox without a minimal environment policy.
- MCP stdio inherits only named environment entries plus explicitly resolved references. Resolvers
  and logs must preserve redaction and reference-only event semantics.

## Contract Guarantees and Provider Responsibility

The public Execution contracts enforce or represent:

- separate Workspace read, write, execute, deny, quota, snapshot, diff, and patch concerns;
- environment policies for process, filesystem, resources, network, security, secrets, logging,
  and lifecycle controls;
- Docker-policy rejection of privileged mode, Docker socket mounts, writable root filesystems,
  missing resource limits, missing Workspace mounts, and unpinned images;
- capability negotiation for isolation, limits, cancellation, process-tree kill, snapshots,
  digest pinning, and remote execution;
- bounded command results, Artifact references for truncated output, normalized errors, leases,
  fencing, idempotency, and recovery receipts;
- strict execution events and cache fingerprints that reject plaintext secret-shaped fields.

These guarantees become effective isolation only when a concrete provider enforces them. A
provider that cannot meet a required capability must fail negotiation before creating a sandbox or
starting a command.
