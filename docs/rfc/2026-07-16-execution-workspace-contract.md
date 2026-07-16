# RFC: Execution Workspace Contract Foundation

## Summary

Hypha should introduce the first Execution-owned contract as an internal Workspace module without
creating a new npm workspace package. The contract establishes stable TypeScript, Zod, JSON Schema,
event, and cache-validity boundaries before local, container, or remote execution providers are
implemented.

## Scope

This RFC covers only the Workspace contract foundation:

- `WorkspaceSpec` and its directory, path, quota, cleanup, snapshot, and mutation policies;
- `WorkspaceRecord`, `WorkspaceStatus`, and `WorkspaceUsage`;
- validation, JSON Schema export, examples, and contract tests;
- Workspace lifecycle event names and payload boundaries;
- the hashes and references later consumed by Execution and WorkCache.

It does not implement filesystem operations, Sandbox providers, command execution, Artifact
lifecycle, Text2SQL, DomainPack bindings, or Cache storage.

## Repository Mapping

The Execution engineering specification uses `src/modules/*` and `src/contracts/*` as logical
paths. Hypha already has workspace packages, so this work must reuse existing package boundaries
and must not create `packages/execution` or another `package.json`.

| Logical path                     | Current repository mapping                                 |
| -------------------------------- | ---------------------------------------------------------- |
| `src/contracts/workspace.ts`     | `packages/core/src/contracts/workspace.ts`                 |
| `src/modules/workspace/*`        | `packages/core/src/modules/workspace/*`                    |
| `src/adapters/execution/local/*` | `packages/adapters-local/src/execution/*` in a later phase |
| Workspace event types            | `packages/core/src/events.ts`                              |

`@hypha/core` owns shared contract shapes and event names. Provider implementations remain outside
Core. Tool governance stays in Tool, scheduling and recovery stay in Runtime, and Server remains an
API adapter.

## Proposed Snapshot Policy

The Execution engineering specification requires `WorkspaceSnapshotPolicySpec` but does not define
its fields. The initial contract is:

```ts
export interface WorkspaceSnapshotPolicySpec {
  enabled: boolean;
  mode: 'full' | 'incremental' | 'manifest_only';
  snapshotBeforeWrite?: boolean;
  snapshotAfterExecution?: boolean;
  snapshotOnFailure?: boolean;
  maxSnapshots?: number;
}
```

`maxSnapshots`, when present, must be a positive integer. Snapshot implementation and retention
enforcement are deferred; the first change only validates and exports the contract.

## Validation Rules

- Workspace directory values must be relative paths beneath the managed Workspace root.
- Absolute paths, empty paths, and `..` traversal segments are rejected.
- `rootRef` is required when `rootPolicy` is `provided_ref` and rejected when it is `managed`.
- Numeric quotas and limits must be positive integers.
- `after_ttl` cleanup requires a positive `ttlSeconds` value.
- Allowed and denied extension lists must not contain the same normalized extension.
- Snapshot settings are retained as declared even when disabled, but providers must not create
  snapshots while `enabled` is false.

## Event Boundary

Workspace lifecycle events are source-of-truth runtime events. The first contract reserves the
event names required by the engineering specification, while runtime emission is implemented only
when `WorkspaceRuntime` exists.

Events must contain identifiers, status, hashes, sizes, and normalized errors. They must not contain
host-sensitive absolute paths, secrets, unlimited output, or file bodies.

## Cache Compatibility

Workspace is not a Cache implementation. It must later expose stable validity inputs:

- `workspaceSnapshotHash`;
- `sourceTreeHash`;
- snapshot manifest hash;
- Artifact references and content hashes rather than Artifact bytes.

WorkCache remains event-derived and is not the source of truth. Cache-specific materializers belong
to `cache-feature-execution`; Execution-owned code must not import WorkCache stores or managers.

## Branch Ownership

- Workspace and Execution contracts: `execution` source branch, then `dev`.
- Generic DomainPack bindings: `domain-execution` source branch, then `domain`.
- WorkCache materializers or policies: `cache-feature-execution`, then `cache-base`.

No source-owned fix is made directly on `dev`, `domain`, `cache-base`, `dev-domain-merge`,
`dev-merge`, or `main`.

## Acceptance

The first implementation is accepted when:

- TypeScript types, Zod schemas, JSON Schemas, examples, and validators agree;
- contract tests reject absolute paths, traversal, invalid root references, and invalid limits;
- `npm run typecheck` passes;
- `npm run test:packages` passes;
- the pre-existing Windows-only FilesystemTool unit-test failure is reported separately and is not
  hidden as part of this contract change;
- Git shows no unrelated source changes.

## Deferred Work

- `WorkspaceRuntime` file operations and path-handle enforcement;
- Snapshot manifests, Diff, Patch, restore, and cleanup implementations;
- Local, Docker, and remote Sandbox providers;
- Artifact versioning, access, lineage, retention, and garbage collection;
- Text2SQL contracts and execution policy;
- DomainPack binding and WorkCache materialization.

## Workspace Operation Contract Increment

The second implementation increment adds path resolution and file-operation contracts without
exposing a filesystem provider to an Agent. It introduces the request and result shapes needed for
resolve, list, read, write, and delete operations, plus `ExecutionPrincipal`, `ProviderHealth`, and
`FileMutation`.

The engineering specification references `CreateWorkspaceRequest`, `WorkspaceListRequest`,
`WorkspaceReadResult`, `WorkspaceDeleteRequest`, and several Snapshot/Diff/Patch request or result
types without defining them. This increment defines only the non-Artifact-dependent file-operation
shapes:

- list requests use an optional relative directory, recursion flag, entry limit, and cursor;
- reads use non-negative offsets and positive length/output limits;
- writes require exactly one of inline `content` or `artifactRef` and retain optimistic concurrency
  through `expectedContentHash`;
- deletes retain optimistic concurrency and idempotency inputs;
- every public path input uses the same relative-path validation boundary.

Encoded or Unicode-normalized traversal is rejected at validation time. Provider implementations
must still perform canonical path, link, and time-of-check/time-of-use verification because string
validation alone is not a sandbox boundary.

The complete `WorkspaceRuntime` interface remains deferred until the canonical Execution-owned
`ArtifactRecord` is introduced. The repository currently has a Memory-local legacy `ArtifactRef`;
Core must not depend on Memory, and Execution must not create a second conflicting shared
`ArtifactRef` or modify Memory-owned implementation on the `execution` branch.

## Snapshot, Restore, Diff, and Patch Contract Increment

The third implementation increment defines the Workspace recovery contracts that do not require a
canonical `ArtifactRef` object. Snapshot and patch references remain opaque strings at this
boundary; file bodies and Artifact bytes are never embedded in manifests, events, or Cache inputs.

The engineering specification defines `WorkspaceSnapshotManifest`, `WorkspaceSnapshotEntry`,
`WorkspaceDiffResult`, and `WorkspacePatchRequest`, but leaves their surrounding request and result
shapes open. This increment adds the following conservative rules:

- incremental Snapshot requests require `baseSnapshotRef`;
- Snapshot manifests expose `sourceTreeHash` and `manifestHash` as stable Cache validity inputs;
- restores may include `expectedWorkspaceSnapshotHash` to reject stale replacement attempts;
- Diff compares a required base Snapshot with either another Snapshot or the current Workspace;
- Patch `check` is the dry-run mode;
- Patch `apply` requires `expectedBaseSnapshotHash` and reports conflicts explicitly;
- Snapshot entries, mutations, and conflicts contain only Workspace-relative paths and opaque
  references.

Provider implementations must calculate hashes from canonical manifests and must not treat Cache
as the source of truth. Actual Snapshot persistence and the `WorkspaceRuntime.snapshot()` return
type remain deferred until the Execution-owned Artifact contract is available.
