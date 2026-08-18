# `@codesoul-co/hypha-core` / `modules/workspace/snapshots`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/workspace/snapshots.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)
- Exports: **26**

## Using this module

Use the Snapshots module for declaring and enforcing workspace scope boundaries. It exports 16 constants, 10 functions.

### Import from the package entrypoint

```ts
import {
  workspaceDiffRequestSchema,
  workspaceDiffResultExample,
  workspaceDiffResultSchema,
  workspaceDiffSummarySchema,
  workspacePatchConflictSchema,
  workspacePatchRequestExample,
  workspacePatchRequestSchema,
  workspacePatchResultExample,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 10 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 16 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { workspaceDiffRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = workspaceDiffRequestSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `workspaceDiffRequestSchema` | constant | <code>const workspaceDiffRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "...</code> | Runtime schema for Workspace Diff Request. |
| `workspaceDiffResultExample` | constant | <code>const workspaceDiffResultExample: WorkspaceDiffResult</code> | Valid example value for Workspace Diff Result. |
| `workspaceDiffResultSchema` | constant | <code>const workspaceDiffResultSchema: z.ZodObject&lt;{ fromSnapshotRef: z.ZodString; toSnapshotRef: z.ZodOptional&lt;z.ZodString&gt;; mutations: z.ZodArray&lt;z.ZodObject&lt;{ path: z.ZodEffects&lt;z.ZodString, string, string&gt;; operation: z.ZodEnum&lt;["created", "modified", "deleted", "renamed", "permission_changed"]&gt;; beforeHash: z.ZodOptional&lt;z.ZodString&gt;; afterHash: z.ZodOptional&lt;z.ZodString&gt;; beforeSizeBytes: z.ZodOptional&lt;z.ZodNumber...</code> | Runtime schema for Workspace Diff Result. |
| `workspaceDiffSummarySchema` | constant | <code>const workspaceDiffSummarySchema: z.ZodObject&lt;{ created: z.ZodNumber; modified: z.ZodNumber; deleted: z.ZodNumber; renamed: z.ZodNumber; permissionChanged: z.ZodNumber; bytesAdded: z.ZodNumber; bytesRemoved: z.ZodNumber; }, "strict", z.ZodTypeAny, { deleted: number; created: number; modified: number; renamed: number; permissionChanged: number; bytesAdded: number; bytesRemoved: number; }, { deleted: number; created...</code> | Runtime schema for Workspace Diff Summary. |
| `workspacePatchConflictSchema` | constant | <code>const workspacePatchConflictSchema: z.ZodObject&lt;{ path: z.ZodEffects&lt;z.ZodString, string, string&gt;; reason: z.ZodString; expectedHash: z.ZodOptional&lt;z.ZodString&gt;; actualHash: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { path: string; reason: string; expectedHash?: string &#124; undefined; actualHash?: string &#124; undefined; }, { path: string; reason: string; expectedHash?: string &#124; undefined; actualHash?: strin...</code> | Runtime schema for Workspace Patch Conflict. |
| `workspacePatchRequestExample` | constant | <code>const workspacePatchRequestExample: WorkspacePatchRequest</code> | Valid example value for Workspace Patch Request. |
| `workspacePatchRequestSchema` | constant | <code>const workspacePatchRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;...</code> | Runtime schema for Workspace Patch Request. |
| `workspacePatchResultExample` | constant | <code>const workspacePatchResultExample: WorkspacePatchResult</code> | Valid example value for Workspace Patch Result. |
| `workspacePatchResultSchema` | constant | <code>const workspacePatchResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ checked: z.ZodBoolean; applied: z.ZodBoolean; conflicts: z.ZodArray&lt;z.ZodObject&lt;{ path: z.ZodEffects&lt;z.ZodString, string, string&gt;; reason: z.ZodString; expectedHash: z.ZodOptional&lt;z.ZodString&gt;; actualHash: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { path: string; reason: string; expectedHash?: string &#124; undefined; actualHash?: string &#124; undefi...</code> | Runtime schema for Workspace Patch Result. |
| `workspaceRestoreRequestSchema` | constant | <code>const workspaceRestoreRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString...</code> | Runtime schema for Workspace Restore Request. |
| `workspaceSnapshotEntrySchema` | constant | <code>const workspaceSnapshotEntrySchema: z.ZodEffects&lt;z.ZodObject&lt;{ path: z.ZodEffects&lt;z.ZodString, string, string&gt;; kind: z.ZodEnum&lt;["file", "directory", "symlink"]&gt;; sizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; contentHash: z.ZodOptional&lt;z.ZodString&gt;; mode: z.ZodOptional&lt;z.ZodNumber&gt;; symlinkTarget: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodString, string, string&gt;&gt;; artifactRef: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny,...</code> | Runtime schema for Workspace Snapshot Entry. |
| `workspaceSnapshotJsonSchemas` | constant | <code>const workspaceSnapshotJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Workspace Snapshot JSON Schemas constant exported by the `modules/workspace/snapshots` module. |
| `workspaceSnapshotManifestExample` | constant | <code>const workspaceSnapshotManifestExample: WorkspaceSnapshotManifest</code> | Valid example value for Workspace Snapshot Manifest. |
| `workspaceSnapshotManifestSchema` | constant | <code>const workspaceSnapshotManifestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; workspaceId: z.ZodString; baseSnapshotId: z.ZodOptional&lt;z.ZodString&gt;; entries: z.ZodArray&lt;z.ZodEffects&lt;z.ZodObject&lt;{ path: z.ZodEffects&lt;z.ZodString, string, string&gt;; kind: z.ZodEnum&lt;["file", "directory", "symlink"]&gt;; sizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; contentHash: z.ZodOptional&lt;z.ZodString&gt;; mode: z.ZodOptional&lt;z.ZodNumber&gt;; sym...</code> | Runtime schema for Workspace Snapshot Manifest. |
| `workspaceSnapshotRequestExample` | constant | <code>const workspaceSnapshotRequestExample: WorkspaceSnapshotRequest</code> | Valid example value for Workspace Snapshot Request. |
| `workspaceSnapshotRequestSchema` | constant | <code>const workspaceSnapshotRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArr...</code> | Runtime schema for Workspace Snapshot Request. |
| `validateWorkspaceDiffRequest` | function | <code>validateWorkspaceDiffRequest(input: unknown): WorkspaceDiffRequest</code> | Validate Workspace Diff Request function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceDiffResult` | function | <code>validateWorkspaceDiffResult(input: unknown): WorkspaceDiffResult</code> | Validate Workspace Diff Result function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceDiffSummary` | function | <code>validateWorkspaceDiffSummary(input: unknown): WorkspaceDiffSummary</code> | Validate Workspace Diff Summary function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspacePatchConflict` | function | <code>validateWorkspacePatchConflict(input: unknown): WorkspacePatchConflict</code> | Validate Workspace Patch Conflict function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspacePatchRequest` | function | <code>validateWorkspacePatchRequest(input: unknown): WorkspacePatchRequest</code> | Validate Workspace Patch Request function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspacePatchResult` | function | <code>validateWorkspacePatchResult(input: unknown): WorkspacePatchResult</code> | Validate Workspace Patch Result function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceRestoreRequest` | function | <code>validateWorkspaceRestoreRequest(input: unknown): WorkspaceRestoreRequest</code> | Validate Workspace Restore Request function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceSnapshotEntry` | function | <code>validateWorkspaceSnapshotEntry(input: unknown): WorkspaceSnapshotEntry</code> | Validate Workspace Snapshot Entry function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceSnapshotManifest` | function | <code>validateWorkspaceSnapshotManifest(input: unknown): WorkspaceSnapshotManifest</code> | Validate Workspace Snapshot Manifest function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceSnapshotRequest` | function | <code>validateWorkspaceSnapshotRequest(input: unknown): WorkspaceSnapshotRequest</code> | Validate Workspace Snapshot Request function with 1 public call signature; parameters and return types are listed below. |

## `workspaceDiffRequestSchema`

Runtime schema for Workspace Diff Request.

- Kind: constant
- Import: `import { workspaceDiffRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare const workspaceDiffRequestSchema: z.ZodObject<{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; fromSnapshotRef: z.ZodString; toSnapshotRef: z.ZodOptional<z.ZodString>; createPatchArtifact: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; fromSnapshotRef: string; toSnapshotRef?: string | undefined; createPatchArtifact?: boolean | undefined; }, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; fromSnapshotRef: string; toSnapshotRef?: string | undefined; createPatchArtifact?: boolean | undefined; }>;
```

## `workspaceDiffResultExample`

Valid example value for Workspace Diff Result.

- Kind: constant
- Import: `import { workspaceDiffResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare const workspaceDiffResultExample: WorkspaceDiffResult;
```

## `workspaceDiffResultSchema`

Runtime schema for Workspace Diff Result.

- Kind: constant
- Import: `import { workspaceDiffResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare const workspaceDiffResultSchema: z.ZodObject<{ fromSnapshotRef: z.ZodString; toSnapshotRef: z.ZodOptional<z.ZodString>; mutations: z.ZodArray<z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; operation: z.ZodEnum<["created", "modified", "deleted", "renamed", "permission_changed"]>; beforeHash: z.ZodOptional<z.ZodString>; afterHash: z.ZodOptional<z.ZodString>; beforeSizeBytes: z.ZodOptional<z.ZodNumber>; afterSizeBytes: z.ZodOptional<z.ZodNumber>; artifactRef: z.ZodOptional<z.ZodString>; oldPath: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; detectedAt: z.ZodString; }, "strict", z.ZodTypeAny, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }>, "many">; patchArtifactRef: z.ZodOptional<z.ZodString>; summary: z.ZodObject<{ created: z.ZodNumber; modified: z.ZodNumber; deleted: z.ZodNumber; renamed: z.ZodNumber; permissionChanged: z.ZodNumber; bytesAdded: z.ZodNumber; bytesRemoved: z.ZodNumber; }, "strict", z.ZodTypeAny, { deleted: number; created: number; modified: number; renamed: number; permissionChanged: number; bytesAdded: number; bytesRemoved: number; }, { deleted: number; created: number; modified: number; renamed: number; permissionChanged: number; bytesAdded: number; bytesRemoved: number; }>; }, "strict", z.ZodTypeAny, { fromSnapshotRef: string; mutations: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }[]; summary: { deleted: number; created: number; modified: number; renamed: number; permissionChanged: number; bytesAdded: number; bytesRemoved: number; }; toSnapshotRef?: string | undefined; patchArtifactRef?: string | undefined; }, { fromSnapshotRef: string; mutations: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }[]; summary: { deleted: number; created: number; modified: number; renamed: number; permissionChanged: number; bytesAdded: number; bytesRemoved: number; }; toSnapshotRef?: string | undefined; patchArtifactRef?: string | undefined; }>;
```

## `workspaceDiffSummarySchema`

Runtime schema for Workspace Diff Summary.

- Kind: constant
- Import: `import { workspaceDiffSummarySchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare const workspaceDiffSummarySchema: z.ZodObject<{ created: z.ZodNumber; modified: z.ZodNumber; deleted: z.ZodNumber; renamed: z.ZodNumber; permissionChanged: z.ZodNumber; bytesAdded: z.ZodNumber; bytesRemoved: z.ZodNumber; }, "strict", z.ZodTypeAny, { deleted: number; created: number; modified: number; renamed: number; permissionChanged: number; bytesAdded: number; bytesRemoved: number; }, { deleted: number; created: number; modified: number; renamed: number; permissionChanged: number; bytesAdded: number; bytesRemoved: number; }>;
```

## `workspacePatchConflictSchema`

Runtime schema for Workspace Patch Conflict.

- Kind: constant
- Import: `import { workspacePatchConflictSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare const workspacePatchConflictSchema: z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; reason: z.ZodString; expectedHash: z.ZodOptional<z.ZodString>; actualHash: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }, { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }>;
```

## `workspacePatchRequestExample`

Valid example value for Workspace Patch Request.

- Kind: constant
- Import: `import { workspacePatchRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare const workspacePatchRequestExample: WorkspacePatchRequest;
```

## `workspacePatchRequestSchema`

Runtime schema for Workspace Patch Request.

- Kind: constant
- Import: `import { workspacePatchRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare const workspacePatchRequestSchema: z.ZodEffects<z.ZodObject<{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; patchArtifactRef: z.ZodString; expectedBaseSnapshotHash: z.ZodOptional<z.ZodString>; mode: z.ZodEnum<["check", "apply"]>; conflictPolicy: z.ZodEnum<["fail", "three_way", "mark_conflicts"]>; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; mode: "check" | "apply"; patchArtifactRef: string; conflictPolicy: "fail" | "three_way" | "mark_conflicts"; idempotencyKey?: string | undefined; expectedBaseSnapshotHash?: string | undefined; }, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; mode: "check" | "apply"; patchArtifactRef: string; conflictPolicy: "fail" | "three_way" | "mark_conflicts"; idempotencyKey?: string | undefined; expectedBaseSnapshotHash?: string | undefined; }>, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; mode: "check" | "apply"; patchArtifactRef: string; conflictPolicy: "fail" | "three_way" | "mark_conflicts"; idempotencyKey?: string | undefined; expectedBaseSnapshotHash?: string | undefined; }, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; mode: "check" | "apply"; patchArtifactRef: string; conflictPolicy: "fail" | "three_way" | "mark_conflicts"; idempotencyKey?: string | undefined; expectedBaseSnapshotHash?: string | undefined; }>;
```

## `workspacePatchResultExample`

Valid example value for Workspace Patch Result.

- Kind: constant
- Import: `import { workspacePatchResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare const workspacePatchResultExample: WorkspacePatchResult;
```

## `workspacePatchResultSchema`

Runtime schema for Workspace Patch Result.

- Kind: constant
- Import: `import { workspacePatchResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare const workspacePatchResultSchema: z.ZodEffects<z.ZodObject<{ checked: z.ZodBoolean; applied: z.ZodBoolean; conflicts: z.ZodArray<z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; reason: z.ZodString; expectedHash: z.ZodOptional<z.ZodString>; actualHash: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }, { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }>, "many">; mutations: z.ZodArray<z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; operation: z.ZodEnum<["created", "modified", "deleted", "renamed", "permission_changed"]>; beforeHash: z.ZodOptional<z.ZodString>; afterHash: z.ZodOptional<z.ZodString>; beforeSizeBytes: z.ZodOptional<z.ZodNumber>; afterSizeBytes: z.ZodOptional<z.ZodNumber>; artifactRef: z.ZodOptional<z.ZodString>; oldPath: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; detectedAt: z.ZodString; }, "strict", z.ZodTypeAny, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }>, "many">; resultingWorkspaceSnapshotHash: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { applied: boolean; mutations: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }[]; checked: boolean; conflicts: { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }[]; resultingWorkspaceSnapshotHash?: string | undefined; }, { applied: boolean; mutations: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }[]; checked: boolean; conflicts: { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }[]; resultingWorkspaceSnapshotHash?: string | undefined; }>, { applied: boolean; mutations: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }[]; checked: boolean; conflicts: { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }[]; resultingWorkspaceSnapshotHash?: string | undefined; }, { applied: boolean; mutations: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }[]; checked: boolean; conflicts: { path: string; reason: string; expectedHash?: string | undefined; actualHash?: string | undefined; }[]; resultingWorkspaceSnapshotHash?: string | undefined; }>;
```

## `workspaceRestoreRequestSchema`

Runtime schema for Workspace Restore Request.

- Kind: constant
- Import: `import { workspaceRestoreRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare const workspaceRestoreRequestSchema: z.ZodObject<{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; snapshotRef: z.ZodString; expectedWorkspaceSnapshotHash: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; snapshotRef: string; idempotencyKey?: string | undefined; expectedWorkspaceSnapshotHash?: string | undefined; }, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; snapshotRef: string; idempotencyKey?: string | undefined; expectedWorkspaceSnapshotHash?: string | undefined; }>;
```

## `workspaceSnapshotEntrySchema`

Runtime schema for Workspace Snapshot Entry.

- Kind: constant
- Import: `import { workspaceSnapshotEntrySchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare const workspaceSnapshotEntrySchema: z.ZodEffects<z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; kind: z.ZodEnum<["file", "directory", "symlink"]>; sizeBytes: z.ZodOptional<z.ZodNumber>; contentHash: z.ZodOptional<z.ZodString>; mode: z.ZodOptional<z.ZodNumber>; symlinkTarget: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; artifactRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }>, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }>;
```

## `workspaceSnapshotJsonSchemas`

Workspace Snapshot JSON Schemas constant exported by the `modules/workspace/snapshots` module.

- Kind: constant
- Import: `import { workspaceSnapshotJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare const workspaceSnapshotJsonSchemas: Record<string, JsonSchema>;
```

## `workspaceSnapshotManifestExample`

Valid example value for Workspace Snapshot Manifest.

- Kind: constant
- Import: `import { workspaceSnapshotManifestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare const workspaceSnapshotManifestExample: WorkspaceSnapshotManifest;
```

## `workspaceSnapshotManifestSchema`

Runtime schema for Workspace Snapshot Manifest.

- Kind: constant
- Import: `import { workspaceSnapshotManifestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare const workspaceSnapshotManifestSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; workspaceId: z.ZodString; baseSnapshotId: z.ZodOptional<z.ZodString>; entries: z.ZodArray<z.ZodEffects<z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; kind: z.ZodEnum<["file", "directory", "symlink"]>; sizeBytes: z.ZodOptional<z.ZodNumber>; contentHash: z.ZodOptional<z.ZodString>; mode: z.ZodOptional<z.ZodNumber>; symlinkTarget: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; artifactRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }>, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }, { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }>, "many">; ignoredPatterns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; sourceTreeHash: z.ZodString; manifestHash: z.ZodString; totalBytes: z.ZodNumber; fileCount: z.ZodNumber; createdAt: z.ZodString; createdBy: z.ZodString; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { entries: { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }[]; id: string; workspaceId: string; sourceTreeHash: string; createdAt: string; manifestHash: string; totalBytes: number; fileCount: number; createdBy: string; metadata?: Record<string, unknown> | undefined; baseSnapshotId?: string | undefined; ignoredPatterns?: string[] | undefined; }, { entries: { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }[]; id: string; workspaceId: string; sourceTreeHash: string; createdAt: string; manifestHash: string; totalBytes: number; fileCount: number; createdBy: string; metadata?: Record<string, unknown> | undefined; baseSnapshotId?: string | undefined; ignoredPatterns?: string[] | undefined; }>, { entries: { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }[]; id: string; workspaceId: string; sourceTreeHash: string; createdAt: string; manifestHash: string; totalBytes: number; fileCount: number; createdBy: string; metadata?: Record<string, unknown> | undefined; baseSnapshotId?: string | undefined; ignoredPatterns?: string[] | undefined; }, { entries: { path: string; kind: "file" | "directory" | "symlink"; contentHash?: string | undefined; sizeBytes?: number | undefined; mode?: number | undefined; artifactRef?: string | undefined; symlinkTarget?: string | undefined; }[]; id: string; workspaceId: string; sourceTreeHash: string; createdAt: string; manifestHash: string; totalBytes: number; fileCount: number; createdBy: string; metadata?: Record<string, unknown> | undefined; baseSnapshotId?: string | undefined; ignoredPatterns?: string[] | undefined; }>;
```

## `workspaceSnapshotRequestExample`

Valid example value for Workspace Snapshot Request.

- Kind: constant
- Import: `import { workspaceSnapshotRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare const workspaceSnapshotRequestExample: WorkspaceSnapshotRequest;
```

## `workspaceSnapshotRequestSchema`

Runtime schema for Workspace Snapshot Request.

- Kind: constant
- Import: `import { workspaceSnapshotRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const workspaceSnapshotRequestSchema: (typeof import('@codesoul-co/hypha-core'))['workspaceSnapshotRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `validateWorkspaceDiffRequest`

Validate Workspace Diff Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceDiffRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare function validateWorkspaceDiffRequest(input: unknown): WorkspaceDiffRequest;
```

### Call signature

```text
validateWorkspaceDiffRequest(input: unknown): WorkspaceDiffRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceDiffRequest`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceDiffResult`

Validate Workspace Diff Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceDiffResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare function validateWorkspaceDiffResult(input: unknown): WorkspaceDiffResult;
```

### Call signature

```text
validateWorkspaceDiffResult(input: unknown): WorkspaceDiffResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceDiffResult`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceDiffSummary`

Validate Workspace Diff Summary function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceDiffSummary } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare function validateWorkspaceDiffSummary(input: unknown): WorkspaceDiffSummary;
```

### Call signature

```text
validateWorkspaceDiffSummary(input: unknown): WorkspaceDiffSummary
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceDiffSummary`
- Description: The return contract is defined by the type shown above.

## `validateWorkspacePatchConflict`

Validate Workspace Patch Conflict function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspacePatchConflict } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare function validateWorkspacePatchConflict(input: unknown): WorkspacePatchConflict;
```

### Call signature

```text
validateWorkspacePatchConflict(input: unknown): WorkspacePatchConflict
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspacePatchConflict`
- Description: The return contract is defined by the type shown above.

## `validateWorkspacePatchRequest`

Validate Workspace Patch Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspacePatchRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare function validateWorkspacePatchRequest(input: unknown): WorkspacePatchRequest;
```

### Call signature

```text
validateWorkspacePatchRequest(input: unknown): WorkspacePatchRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspacePatchRequest`
- Description: The return contract is defined by the type shown above.

## `validateWorkspacePatchResult`

Validate Workspace Patch Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspacePatchResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare function validateWorkspacePatchResult(input: unknown): WorkspacePatchResult;
```

### Call signature

```text
validateWorkspacePatchResult(input: unknown): WorkspacePatchResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspacePatchResult`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceRestoreRequest`

Validate Workspace Restore Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceRestoreRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare function validateWorkspaceRestoreRequest(input: unknown): WorkspaceRestoreRequest;
```

### Call signature

```text
validateWorkspaceRestoreRequest(input: unknown): WorkspaceRestoreRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceRestoreRequest`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceSnapshotEntry`

Validate Workspace Snapshot Entry function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceSnapshotEntry } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare function validateWorkspaceSnapshotEntry(input: unknown): WorkspaceSnapshotEntry;
```

### Call signature

```text
validateWorkspaceSnapshotEntry(input: unknown): WorkspaceSnapshotEntry
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceSnapshotEntry`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceSnapshotManifest`

Validate Workspace Snapshot Manifest function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceSnapshotManifest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare function validateWorkspaceSnapshotManifest(input: unknown): WorkspaceSnapshotManifest;
```

### Call signature

```text
validateWorkspaceSnapshotManifest(input: unknown): WorkspaceSnapshotManifest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceSnapshotManifest`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceSnapshotRequest`

Validate Workspace Snapshot Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceSnapshotRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/snapshots`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/snapshots.ts)

### Declaration

```text
export declare function validateWorkspaceSnapshotRequest(input: unknown): WorkspaceSnapshotRequest;
```

### Call signature

```text
validateWorkspaceSnapshotRequest(input: unknown): WorkspaceSnapshotRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceSnapshotRequest`
- Description: The return contract is defined by the type shown above.
