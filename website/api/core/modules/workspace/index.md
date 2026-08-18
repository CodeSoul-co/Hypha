# `@codesoul-co/hypha-core` / `modules/workspace/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/workspace/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)
- Exports: **28**

## Using this module

Use the Index module for declaring and enforcing workspace scope boundaries. It exports 25 constants, 3 functions.

### Import from the package entrypoint

```ts
import {
  workspaceCleanupPolicySpecSchema,
  workspaceDirectorySpecSchema,
  workspaceEventMetadataSchema,
  workspaceEventPayloadExample,
  workspaceEventPayloadJsonSchema,
  workspaceEventPayloadSchema,
  workspaceMutationPolicySpecSchema,
  workspacePathPolicySpecSchema,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 25 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { workspaceCleanupPolicySpecSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = workspaceCleanupPolicySpecSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `workspaceCleanupPolicySpecSchema` | constant | <code>const workspaceCleanupPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ mode: z.ZodEnum&lt;["on_run_end", "on_success", "after_ttl", "retain", "manual"]&gt;; ttlSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; retainOnFailure: z.ZodOptional&lt;z.ZodBoolean&gt;; retainSnapshots: z.ZodOptional&lt;z.ZodBoolean&gt;; secureDelete: z.ZodOptional&lt;z.ZodBoolean&gt;; archiveBeforeDelete: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { mode: "manual" &#124;...</code> | Runtime schema for Workspace Cleanup Policy Spec. |
| `workspaceDirectorySpecSchema` | constant | <code>const workspaceDirectorySpecSchema: z.ZodObject&lt;{ inputs: z.ZodEffects&lt;z.ZodString, string, string&gt;; source: z.ZodEffects&lt;z.ZodString, string, string&gt;; working: z.ZodEffects&lt;z.ZodString, string, string&gt;; outputs: z.ZodEffects&lt;z.ZodString, string, string&gt;; logs: z.ZodEffects&lt;z.ZodString, string, string&gt;; temp: z.ZodEffects&lt;z.ZodString, string, string&gt;; snapshots: z.ZodEffects&lt;z.ZodString, string, string&gt;; artifacts...</code> | Runtime schema for Workspace Directory Spec. |
| `workspaceEventMetadataSchema` | constant | <code>const workspaceEventMetadataSchema: z.ZodEffects&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;, Record&lt;string, unknown&gt;, Record&lt;string, unknown&gt;&gt;</code> | Runtime schema for Workspace Event Metadata. |
| `workspaceEventPayloadExample` | constant | <code>const workspaceEventPayloadExample: WorkspaceEventPayload</code> | Valid example value for Workspace Event Payload. |
| `workspaceEventPayloadJsonSchema` | constant | <code>const workspaceEventPayloadJsonSchema: JsonSchema</code> | JSON Schema for Workspace Event Payload. |
| `workspaceEventPayloadSchema` | constant | <code>const workspaceEventPayloadSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodString; profileRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision...</code> | Runtime schema for Workspace Event Payload. |
| `workspaceMutationPolicySpecSchema` | constant | <code>const workspaceMutationPolicySpecSchema: z.ZodObject&lt;{ requireSnapshotBeforeWrite: z.ZodOptional&lt;z.ZodBoolean&gt;; trackFileMutations: z.ZodOptional&lt;z.ZodBoolean&gt;; maxPatchBytes: z.ZodOptional&lt;z.ZodNumber&gt;; allowDelete: z.ZodOptional&lt;z.ZodBoolean&gt;; requireApprovalForDelete: z.ZodOptional&lt;z.ZodBoolean&gt;; preserveInputFiles: z.ZodOptional&lt;z.ZodBoolean&gt;; atomicWrite: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny...</code> | Runtime schema for Workspace Mutation Policy Spec. |
| `workspacePathPolicySpecSchema` | constant | <code>const workspacePathPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ readOnlyPaths: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEffects&lt;z.ZodString, string, string&gt;, "many"&gt;&gt;; writablePaths: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEffects&lt;z.ZodString, string, string&gt;, "many"&gt;&gt;; executablePaths: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEffects&lt;z.ZodString, string, string&gt;, "many"&gt;&gt;; deniedPaths: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEffects&lt;z.ZodString, string, ...</code> | Runtime schema for Workspace Path Policy Spec. |
| `workspaceQuotaSpecJsonSchema` | constant | <code>const workspaceQuotaSpecJsonSchema: JsonSchema</code> | JSON Schema for Workspace Quota Spec. |
| `workspaceQuotaSpecSchema` | constant | <code>const workspaceQuotaSpecSchema: z.ZodObject&lt;{ maxBytes: z.ZodOptional&lt;z.ZodNumber&gt;; maxFiles: z.ZodOptional&lt;z.ZodNumber&gt;; maxSingleFileBytes: z.ZodOptional&lt;z.ZodNumber&gt;; maxDirectoryDepth: z.ZodOptional&lt;z.ZodNumber&gt;; maxOpenFiles: z.ZodOptional&lt;z.ZodNumber&gt;; maxMutationCountPerExecution: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodTypeAny, { maxBytes?: number &#124; undefined; maxFiles?: number &#124; undefined; maxSingle...</code> | Runtime schema for Workspace Quota Spec. |
| `workspaceRecordExample` | constant | <code>const workspaceRecordExample: WorkspaceRecord</code> | Valid example value for Workspace Record. |
| `workspaceRecordJsonSchema` | constant | <code>const workspaceRecordJsonSchema: JsonSchema</code> | JSON Schema for Workspace Record. |
| `workspaceRecordJsonSchemas` | constant | <code>const workspaceRecordJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Workspace Record JSON Schemas constant exported by the `modules/workspace/index` module. |
| `workspaceRecordSchema` | constant | <code>const workspaceRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; sessionId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; profileRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: s...</code> | Runtime schema for Workspace Record. |
| `workspaceRelativePathSchema` | constant | <code>const workspaceRelativePathSchema: z.ZodEffects&lt;z.ZodString, string, string&gt;</code> | Runtime schema for Workspace Relative Path. |
| `workspaceSnapshotPolicySpecSchema` | constant | <code>const workspaceSnapshotPolicySpecSchema: z.ZodObject&lt;{ enabled: z.ZodBoolean; mode: z.ZodEnum&lt;["full", "incremental", "manifest_only"]&gt;; snapshotBeforeWrite: z.ZodOptional&lt;z.ZodBoolean&gt;; snapshotAfterExecution: z.ZodOptional&lt;z.ZodBoolean&gt;; snapshotOnFailure: z.ZodOptional&lt;z.ZodBoolean&gt;; maxSnapshots: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodTypeAny, { mode: "full" &#124; "incremental" &#124; "manifest_only"; enabled: b...</code> | Runtime schema for Workspace Snapshot Policy Spec. |
| `workspaceSpecDefinition` | constant | <code>const workspaceSpecDefinition: SpecSchemaDefinition&lt;WorkspaceSpec&gt;</code> | Runtime validation entrypoint for the Workspace spec, combining its parser, example and JSON Schema. |
| `workspaceSpecDefinitions` | constant | <code>const workspaceSpecDefinitions: readonly [SpecSchemaDefinition&lt;WorkspaceSpec&gt;]</code> | Workspace Spec Definitions constant exported by the `modules/workspace/index` module. |
| `workspaceSpecExample` | constant | <code>const workspaceSpecExample: WorkspaceSpec</code> | Valid example value for Workspace Spec. |
| `workspaceSpecJsonSchema` | constant | <code>const workspaceSpecJsonSchema: JsonSchema</code> | JSON Schema for Workspace Spec. |
| `workspaceSpecJsonSchemas` | constant | <code>const workspaceSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Workspace Spec JSON Schemas constant exported by the `modules/workspace/index` module. |
| `workspaceSpecSchema` | constant | <code>const workspaceSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { revision: z.ZodOptional&lt;z.ZodString&gt;; rootPolicy: z.ZodEnum&lt;["managed"...</code> | Runtime schema for Workspace Spec. |
| `workspaceStatusSchema` | constant | <code>const workspaceStatusSchema: z.ZodEnum&lt;["creating", "ready", "busy", "snapshotting", "archiving", "archived", "cleaning", "cleaned", "failed"]&gt;</code> | Runtime schema for Workspace Status. |
| `workspaceUsageJsonSchema` | constant | <code>const workspaceUsageJsonSchema: JsonSchema</code> | JSON Schema for Workspace Usage. |
| `workspaceUsageSchema` | constant | <code>const workspaceUsageSchema: z.ZodObject&lt;{ bytes: z.ZodNumber; files: z.ZodNumber; directories: z.ZodOptional&lt;z.ZodNumber&gt;; lastCalculatedAt: z.ZodString; }, "strict", z.ZodTypeAny, { bytes: number; files: number; lastCalculatedAt: string; directories?: number &#124; undefined; }, { bytes: number; files: number; lastCalculatedAt: string; directories?: number &#124; undefined; }&gt;</code> | Runtime schema for Workspace Usage. |
| `validateWorkspaceEventPayload` | function | <code>validateWorkspaceEventPayload(input: unknown): WorkspaceEventPayload</code> | Validate Workspace Event Payload function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceRecord` | function | <code>validateWorkspaceRecord(input: unknown): WorkspaceRecord</code> | Validate Workspace Record function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceSpec` | function | <code>validateWorkspaceSpec(input: unknown): WorkspaceSpec</code> | Validate Workspace Spec function with 1 public call signature; parameters and return types are listed below. |

## `workspaceCleanupPolicySpecSchema`

Runtime schema for Workspace Cleanup Policy Spec.

- Kind: constant
- Import: `import { workspaceCleanupPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceCleanupPolicySpecSchema: z.ZodEffects<z.ZodObject<{ mode: z.ZodEnum<["on_run_end", "on_success", "after_ttl", "retain", "manual"]>; ttlSeconds: z.ZodOptional<z.ZodNumber>; retainOnFailure: z.ZodOptional<z.ZodBoolean>; retainSnapshots: z.ZodOptional<z.ZodBoolean>; secureDelete: z.ZodOptional<z.ZodBoolean>; archiveBeforeDelete: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { mode: "manual" | "on_run_end" | "on_success" | "after_ttl" | "retain"; ttlSeconds?: number | undefined; retainOnFailure?: boolean | undefined; retainSnapshots?: boolean | undefined; secureDelete?: boolean | undefined; archiveBeforeDelete?: boolean | undefined; }, { mode: "manual" | "on_run_end" | "on_success" | "after_ttl" | "retain"; ttlSeconds?: number | undefined; retainOnFailure?: boolean | undefined; retainSnapshots?: boolean | undefined; secureDelete?: boolean | undefined; archiveBeforeDelete?: boolean | undefined; }>, { mode: "manual" | "on_run_end" | "on_success" | "after_ttl" | "retain"; ttlSeconds?: number | undefined; retainOnFailure?: boolean | undefined; retainSnapshots?: boolean | undefined; secureDelete?: boolean | undefined; archiveBeforeDelete?: boolean | undefined; }, { mode: "manual" | "on_run_end" | "on_success" | "after_ttl" | "retain"; ttlSeconds?: number | undefined; retainOnFailure?: boolean | undefined; retainSnapshots?: boolean | undefined; secureDelete?: boolean | undefined; archiveBeforeDelete?: boolean | undefined; }>;
```

## `workspaceDirectorySpecSchema`

Runtime schema for Workspace Directory Spec.

- Kind: constant
- Import: `import { workspaceDirectorySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceDirectorySpecSchema: z.ZodObject<{ inputs: z.ZodEffects<z.ZodString, string, string>; source: z.ZodEffects<z.ZodString, string, string>; working: z.ZodEffects<z.ZodString, string, string>; outputs: z.ZodEffects<z.ZodString, string, string>; logs: z.ZodEffects<z.ZodString, string, string>; temp: z.ZodEffects<z.ZodString, string, string>; snapshots: z.ZodEffects<z.ZodString, string, string>; artifacts: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; cache: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; }, "strict", z.ZodTypeAny, { snapshots: string; source: string; inputs: string; working: string; outputs: string; logs: string; temp: string; cache?: string | undefined; artifacts?: string | undefined; }, { snapshots: string; source: string; inputs: string; working: string; outputs: string; logs: string; temp: string; cache?: string | undefined; artifacts?: string | undefined; }>;
```

## `workspaceEventMetadataSchema`

Runtime schema for Workspace Event Metadata.

- Kind: constant
- Import: `import { workspaceEventMetadataSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceEventMetadataSchema: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>;
```

## `workspaceEventPayloadExample`

Valid example value for Workspace Event Payload.

- Kind: constant
- Import: `import { workspaceEventPayloadExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceEventPayloadExample: WorkspaceEventPayload;
```

## `workspaceEventPayloadJsonSchema`

JSON Schema for Workspace Event Payload.

- Kind: constant
- Import: `import { workspaceEventPayloadJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceEventPayloadJsonSchema: JsonSchema;
```

## `workspaceEventPayloadSchema`

Runtime schema for Workspace Event Payload.

- Kind: constant
- Import: `import { workspaceEventPayloadSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const workspaceEventPayloadSchema: (typeof import('@codesoul-co/hypha-core'))['workspaceEventPayloadSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `workspaceMutationPolicySpecSchema`

Runtime schema for Workspace Mutation Policy Spec.

- Kind: constant
- Import: `import { workspaceMutationPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceMutationPolicySpecSchema: z.ZodObject<{ requireSnapshotBeforeWrite: z.ZodOptional<z.ZodBoolean>; trackFileMutations: z.ZodOptional<z.ZodBoolean>; maxPatchBytes: z.ZodOptional<z.ZodNumber>; allowDelete: z.ZodOptional<z.ZodBoolean>; requireApprovalForDelete: z.ZodOptional<z.ZodBoolean>; preserveInputFiles: z.ZodOptional<z.ZodBoolean>; atomicWrite: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { requireSnapshotBeforeWrite?: boolean | undefined; trackFileMutations?: boolean | undefined; maxPatchBytes?: number | undefined; allowDelete?: boolean | undefined; requireApprovalForDelete?: boolean | undefined; preserveInputFiles?: boolean | undefined; atomicWrite?: boolean | undefined; }, { requireSnapshotBeforeWrite?: boolean | undefined; trackFileMutations?: boolean | undefined; maxPatchBytes?: number | undefined; allowDelete?: boolean | undefined; requireApprovalForDelete?: boolean | undefined; preserveInputFiles?: boolean | undefined; atomicWrite?: boolean | undefined; }>;
```

## `workspacePathPolicySpecSchema`

Runtime schema for Workspace Path Policy Spec.

- Kind: constant
- Import: `import { workspacePathPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspacePathPolicySpecSchema: z.ZodEffects<z.ZodObject<{ readOnlyPaths: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>; writablePaths: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>; executablePaths: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>; deniedPaths: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>; allowSymlinks: z.ZodOptional<z.ZodBoolean>; allowHardLinks: z.ZodOptional<z.ZodBoolean>; followSymlinksForRead: z.ZodOptional<z.ZodBoolean>; allowHiddenFiles: z.ZodOptional<z.ZodBoolean>; maxPathLength: z.ZodOptional<z.ZodNumber>; allowedExtensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; deniedExtensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; caseSensitivity: z.ZodOptional<z.ZodEnum<["platform", "sensitive", "insensitive"]>>; }, "strict", z.ZodTypeAny, { readOnlyPaths?: string[] | undefined; writablePaths?: string[] | undefined; executablePaths?: string[] | undefined; deniedPaths?: string[] | undefined; allowSymlinks?: boolean | undefined; allowHardLinks?: boolean | undefined; followSymlinksForRead?: boolean | undefined; allowHiddenFiles?: boolean | undefined; maxPathLength?: number | undefined; allowedExtensions?: string[] | undefined; deniedExtensions?: string[] | undefined; caseSensitivity?: "platform" | "sensitive" | "insensitive" | undefined; }, { readOnlyPaths?: string[] | undefined; writablePaths?: string[] | undefined; executablePaths?: string[] | undefined; deniedPaths?: string[] | undefined; allowSymlinks?: boolean | undefined; allowHardLinks?: boolean | undefined; followSymlinksForRead?: boolean | undefined; allowHiddenFiles?: boolean | undefined; maxPathLength?: number | undefined; allowedExtensions?: string[] | undefined; deniedExtensions?: string[] | undefined; caseSensitivity?: "platform" | "sensitive" | "insensitive" | undefined; }>, { readOnlyPaths?: string[] | undefined; writablePaths?: string[] | undefined; executablePaths?: string[] | undefined; deniedPaths?: string[] | undefined; allowSymlinks?: boolean | undefined; allowHardLinks?: boolean | undefined; followSymlinksForRead?: boolean | undefined; allowHiddenFiles?: boolean | undefined; maxPathLength?: number | undefined; allowedExtensions?: string[] | undefined; deniedExtensions?: string[] | undefined; caseSensitivity?: "platform" | "sensitive" | "insensitive" | undefined; }, { readOnlyPaths?: string[] | undefined; writablePaths?: string[] | undefined; executablePaths?: string[] | undefined; deniedPaths?: string[] | undefined; allowSymlinks?: boolean | undefined; allowHardLinks?: boolean | undefined; followSymlinksForRead?: boolean | undefined; allowHiddenFiles?: boolean | undefined; maxPathLength?: number | undefined; allowedExtensions?: string[] | undefined; deniedExtensions?: string[] | undefined; caseSensitivity?: "platform" | "sensitive" | "insensitive" | undefined; }>;
```

## `workspaceQuotaSpecJsonSchema`

JSON Schema for Workspace Quota Spec.

- Kind: constant
- Import: `import { workspaceQuotaSpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceQuotaSpecJsonSchema: JsonSchema;
```

## `workspaceQuotaSpecSchema`

Runtime schema for Workspace Quota Spec.

- Kind: constant
- Import: `import { workspaceQuotaSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceQuotaSpecSchema: z.ZodObject<{ maxBytes: z.ZodOptional<z.ZodNumber>; maxFiles: z.ZodOptional<z.ZodNumber>; maxSingleFileBytes: z.ZodOptional<z.ZodNumber>; maxDirectoryDepth: z.ZodOptional<z.ZodNumber>; maxOpenFiles: z.ZodOptional<z.ZodNumber>; maxMutationCountPerExecution: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { maxBytes?: number | undefined; maxFiles?: number | undefined; maxSingleFileBytes?: number | undefined; maxDirectoryDepth?: number | undefined; maxOpenFiles?: number | undefined; maxMutationCountPerExecution?: number | undefined; }, { maxBytes?: number | undefined; maxFiles?: number | undefined; maxSingleFileBytes?: number | undefined; maxDirectoryDepth?: number | undefined; maxOpenFiles?: number | undefined; maxMutationCountPerExecution?: number | undefined; }>;
```

## `workspaceRecordExample`

Valid example value for Workspace Record.

- Kind: constant
- Import: `import { workspaceRecordExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceRecordExample: WorkspaceRecord;
```

## `workspaceRecordJsonSchema`

JSON Schema for Workspace Record.

- Kind: constant
- Import: `import { workspaceRecordJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceRecordJsonSchema: JsonSchema;
```

## `workspaceRecordJsonSchemas`

Workspace Record JSON Schemas constant exported by the `modules/workspace/index` module.

- Kind: constant
- Import: `import { workspaceRecordJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceRecordJsonSchemas: Record<string, JsonSchema>;
```

## `workspaceRecordSchema`

Runtime schema for Workspace Record.

- Kind: constant
- Import: `import { workspaceRecordSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const workspaceRecordSchema: (typeof import('@codesoul-co/hypha-core'))['workspaceRecordSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `workspaceRelativePathSchema`

Runtime schema for Workspace Relative Path.

- Kind: constant
- Import: `import { workspaceRelativePathSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceRelativePathSchema: z.ZodEffects<z.ZodString, string, string>;
```

## `workspaceSnapshotPolicySpecSchema`

Runtime schema for Workspace Snapshot Policy Spec.

- Kind: constant
- Import: `import { workspaceSnapshotPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceSnapshotPolicySpecSchema: z.ZodObject<{ enabled: z.ZodBoolean; mode: z.ZodEnum<["full", "incremental", "manifest_only"]>; snapshotBeforeWrite: z.ZodOptional<z.ZodBoolean>; snapshotAfterExecution: z.ZodOptional<z.ZodBoolean>; snapshotOnFailure: z.ZodOptional<z.ZodBoolean>; maxSnapshots: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { mode: "full" | "incremental" | "manifest_only"; enabled: boolean; snapshotOnFailure?: boolean | undefined; snapshotBeforeWrite?: boolean | undefined; snapshotAfterExecution?: boolean | undefined; maxSnapshots?: number | undefined; }, { mode: "full" | "incremental" | "manifest_only"; enabled: boolean; snapshotOnFailure?: boolean | undefined; snapshotBeforeWrite?: boolean | undefined; snapshotAfterExecution?: boolean | undefined; maxSnapshots?: number | undefined; }>;
```

## `workspaceSpecDefinition`

Runtime validation entrypoint for the Workspace spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { workspaceSpecDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceSpecDefinition: SpecSchemaDefinition<WorkspaceSpec>;
```

## `workspaceSpecDefinitions`

Workspace Spec Definitions constant exported by the `modules/workspace/index` module.

- Kind: constant
- Import: `import { workspaceSpecDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceSpecDefinitions: readonly [SpecSchemaDefinition<WorkspaceSpec>];
```

## `workspaceSpecExample`

Valid example value for Workspace Spec.

- Kind: constant
- Import: `import { workspaceSpecExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceSpecExample: WorkspaceSpec;
```

## `workspaceSpecJsonSchema`

JSON Schema for Workspace Spec.

- Kind: constant
- Import: `import { workspaceSpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceSpecJsonSchema: JsonSchema;
```

## `workspaceSpecJsonSchemas`

Workspace Spec JSON Schemas constant exported by the `modules/workspace/index` module.

- Kind: constant
- Import: `import { workspaceSpecJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceSpecJsonSchemas: Record<string, JsonSchema>;
```

## `workspaceSpecSchema`

Runtime schema for Workspace Spec.

- Kind: constant
- Import: `import { workspaceSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const workspaceSpecSchema: (typeof import('@codesoul-co/hypha-core'))['workspaceSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `workspaceStatusSchema`

Runtime schema for Workspace Status.

- Kind: constant
- Import: `import { workspaceStatusSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceStatusSchema: z.ZodEnum<["creating", "ready", "busy", "snapshotting", "archiving", "archived", "cleaning", "cleaned", "failed"]>;
```

## `workspaceUsageJsonSchema`

JSON Schema for Workspace Usage.

- Kind: constant
- Import: `import { workspaceUsageJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceUsageJsonSchema: JsonSchema;
```

## `workspaceUsageSchema`

Runtime schema for Workspace Usage.

- Kind: constant
- Import: `import { workspaceUsageSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare const workspaceUsageSchema: z.ZodObject<{ bytes: z.ZodNumber; files: z.ZodNumber; directories: z.ZodOptional<z.ZodNumber>; lastCalculatedAt: z.ZodString; }, "strict", z.ZodTypeAny, { bytes: number; files: number; lastCalculatedAt: string; directories?: number | undefined; }, { bytes: number; files: number; lastCalculatedAt: string; directories?: number | undefined; }>;
```

## `validateWorkspaceEventPayload`

Validate Workspace Event Payload function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceEventPayload } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare function validateWorkspaceEventPayload(input: unknown): WorkspaceEventPayload;
```

### Call signature

```text
validateWorkspaceEventPayload(input: unknown): WorkspaceEventPayload
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceEventPayload`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceRecord`

Validate Workspace Record function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceRecord } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare function validateWorkspaceRecord(input: unknown): WorkspaceRecord;
```

### Call signature

```text
validateWorkspaceRecord(input: unknown): WorkspaceRecord
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceRecord`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceSpec`

Validate Workspace Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceSpec } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/index.ts)

### Declaration

```text
export declare function validateWorkspaceSpec(input: unknown): WorkspaceSpec;
```

### Call signature

```text
validateWorkspaceSpec(input: unknown): WorkspaceSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceSpec`
- Description: The return contract is defined by the type shown above.
