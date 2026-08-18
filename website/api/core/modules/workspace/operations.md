# `@codesoul-co/hypha-core` / `modules/workspace/operations`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/workspace/operations.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)
- Exports: **28**

## Using this module

Use the Operations module for declaring and enforcing workspace scope boundaries. It exports 18 constants, 10 functions.

### Import from the package entrypoint

```ts
import {
  fileMutationJsonSchema,
  fileMutationSchema,
  principalJsonSchema,
  relativePathJsonSchema,
  resolvedWorkspacePathSchema,
  workspaceDeleteRequestExample,
  workspaceDeleteRequestSchema,
  workspaceFileEntrySchema,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 10 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 18 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { fileMutationSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = fileMutationSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fileMutationJsonSchema` | constant | <code>const fileMutationJsonSchema: JsonSchema</code> | JSON Schema for File Mutation. |
| `fileMutationSchema` | constant | <code>const fileMutationSchema: z.ZodObject&lt;{ path: z.ZodEffects&lt;z.ZodString, string, string&gt;; operation: z.ZodEnum&lt;["created", "modified", "deleted", "renamed", "permission_changed"]&gt;; beforeHash: z.ZodOptional&lt;z.ZodString&gt;; afterHash: z.ZodOptional&lt;z.ZodString&gt;; beforeSizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; afterSizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; artifactRef: z.ZodOptional&lt;z.ZodString&gt;; oldPath: z.ZodOptional&lt;z.Zod...</code> | Runtime schema for File Mutation. |
| `principalJsonSchema` | constant | <code>const principalJsonSchema: JsonSchema</code> | JSON Schema for Principal. |
| `relativePathJsonSchema` | constant | <code>const relativePathJsonSchema: JsonSchema</code> | JSON Schema for Relative Path. |
| `resolvedWorkspacePathSchema` | constant | <code>const resolvedWorkspacePathSchema: z.ZodObject&lt;{ workspaceId: z.ZodString; relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; canonicalRelativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; pathRef: z.ZodString; exists: z.ZodBoolean; kind: z.ZodOptional&lt;z.ZodEnum&lt;["file", "directory", "symlink", "other"]&gt;&gt;; permissions: z.ZodArray&lt;z.ZodEnum&lt;["read", "write", "execute", "delete"]&gt;, "many"&gt;; contentHash: z.Z...</code> | Runtime schema for Resolved Workspace Path. |
| `workspaceDeleteRequestExample` | constant | <code>const workspaceDeleteRequestExample: WorkspaceDeleteRequest</code> | Valid example value for Workspace Delete Request. |
| `workspaceDeleteRequestSchema` | constant | <code>const workspaceDeleteRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString,...</code> | Runtime schema for Workspace Delete Request. |
| `workspaceFileEntrySchema` | constant | <code>const workspaceFileEntrySchema: z.ZodObject&lt;{ relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; kind: z.ZodEnum&lt;["file", "directory", "symlink", "other"]&gt;; sizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; contentHash: z.ZodOptional&lt;z.ZodString&gt;; modifiedAt: z.ZodOptional&lt;z.ZodString&gt;; permissions: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["read", "write", "execute", "delete"]&gt;, "many"&gt;&gt;; }, "strict", z.ZodTypeAny, { kind: ...</code> | Runtime schema for Workspace File Entry. |
| `workspaceListRequestSchema` | constant | <code>const workspaceListRequestSchema: z.ZodObject&lt;{ workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOpt...</code> | Runtime schema for Workspace List Request. |
| `workspaceOperationJsonSchemas` | constant | <code>const workspaceOperationJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Workspace Operation JSON Schemas constant exported by the `modules/workspace/operations` module. |
| `workspaceOperationPrincipalExample` | constant | <code>const workspaceOperationPrincipalExample: ExecutionPrincipal</code> | Valid example value for Workspace Operation Principal. |
| `workspacePathRequestSchema` | constant | <code>const workspacePathRequestSchema: z.ZodObject&lt;{ workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOpt...</code> | Runtime schema for Workspace Path Request. |
| `workspaceReadRequestSchema` | constant | <code>const workspaceReadRequestSchema: z.ZodObject&lt;{ workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOpt...</code> | Runtime schema for Workspace Read Request. |
| `workspaceReadResultSchema` | constant | <code>const workspaceReadResultSchema: z.ZodObject&lt;{ relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; encoding: z.ZodEnum&lt;["utf8", "base64"]&gt;; content: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; truncated: z.ZodOptional&lt;z.ZodBoolean&gt;; nextOffset: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodTypeAny, { contentHash: string; sizeBytes: number; content: string; relativePath: string; encoding: "u...</code> | Runtime schema for Workspace Read Result. |
| `workspaceWriteRequestExample` | constant | <code>const workspaceWriteRequestExample: WorkspaceWriteRequest</code> | Valid example value for Workspace Write Request. |
| `workspaceWriteRequestSchema` | constant | <code>const workspaceWriteRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;...</code> | Runtime schema for Workspace Write Request. |
| `workspaceWriteResultExample` | constant | <code>const workspaceWriteResultExample: WorkspaceWriteResult</code> | Valid example value for Workspace Write Result. |
| `workspaceWriteResultSchema` | constant | <code>const workspaceWriteResultSchema: z.ZodObject&lt;{ relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; beforeHash: z.ZodOptional&lt;z.ZodString&gt;; afterHash: z.ZodString; sizeBytes: z.ZodNumber; mutation: z.ZodObject&lt;{ path: z.ZodEffects&lt;z.ZodString, string, string&gt;; operation: z.ZodEnum&lt;["created", "modified", "deleted", "renamed", "permission_changed"]&gt;; beforeHash: z.ZodOptional&lt;z.ZodString&gt;; afterHash: z.ZodOpti...</code> | Runtime schema for Workspace Write Result. |
| `validateFileMutation` | function | <code>validateFileMutation(input: unknown): FileMutation</code> | Validate File Mutation function with 1 public call signature; parameters and return types are listed below. |
| `validateResolvedWorkspacePath` | function | <code>validateResolvedWorkspacePath(input: unknown): ResolvedWorkspacePath</code> | Validate Resolved Workspace Path function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceDeleteRequest` | function | <code>validateWorkspaceDeleteRequest(input: unknown): WorkspaceDeleteRequest</code> | Validate Workspace Delete Request function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceFileEntry` | function | <code>validateWorkspaceFileEntry(input: unknown): WorkspaceFileEntry</code> | Validate Workspace File Entry function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceListRequest` | function | <code>validateWorkspaceListRequest(input: unknown): WorkspaceListRequest</code> | Validate Workspace List Request function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspacePathRequest` | function | <code>validateWorkspacePathRequest(input: unknown): WorkspacePathRequest</code> | Validate Workspace Path Request function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceReadRequest` | function | <code>validateWorkspaceReadRequest(input: unknown): WorkspaceReadRequest</code> | Validate Workspace Read Request function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceReadResult` | function | <code>validateWorkspaceReadResult(input: unknown): WorkspaceReadResult</code> | Validate Workspace Read Result function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceWriteRequest` | function | <code>validateWorkspaceWriteRequest(input: unknown): WorkspaceWriteRequest</code> | Validate Workspace Write Request function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceWriteResult` | function | <code>validateWorkspaceWriteResult(input: unknown): WorkspaceWriteResult</code> | Validate Workspace Write Result function with 1 public call signature; parameters and return types are listed below. |

## `fileMutationJsonSchema`

JSON Schema for File Mutation.

- Kind: constant
- Import: `import { fileMutationJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const fileMutationJsonSchema: JsonSchema;
```

## `fileMutationSchema`

Runtime schema for File Mutation.

- Kind: constant
- Import: `import { fileMutationSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const fileMutationSchema: z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; operation: z.ZodEnum<["created", "modified", "deleted", "renamed", "permission_changed"]>; beforeHash: z.ZodOptional<z.ZodString>; afterHash: z.ZodOptional<z.ZodString>; beforeSizeBytes: z.ZodOptional<z.ZodNumber>; afterSizeBytes: z.ZodOptional<z.ZodNumber>; artifactRef: z.ZodOptional<z.ZodString>; oldPath: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; detectedAt: z.ZodString; }, "strict", z.ZodTypeAny, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }>;
```

## `principalJsonSchema`

JSON Schema for Principal.

- Kind: constant
- Import: `import { principalJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const principalJsonSchema: JsonSchema;
```

## `relativePathJsonSchema`

JSON Schema for Relative Path.

- Kind: constant
- Import: `import { relativePathJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const relativePathJsonSchema: JsonSchema;
```

## `resolvedWorkspacePathSchema`

Runtime schema for Resolved Workspace Path.

- Kind: constant
- Import: `import { resolvedWorkspacePathSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const resolvedWorkspacePathSchema: z.ZodObject<{ workspaceId: z.ZodString; relativePath: z.ZodEffects<z.ZodString, string, string>; canonicalRelativePath: z.ZodEffects<z.ZodString, string, string>; pathRef: z.ZodString; exists: z.ZodBoolean; kind: z.ZodOptional<z.ZodEnum<["file", "directory", "symlink", "other"]>>; permissions: z.ZodArray<z.ZodEnum<["read", "write", "execute", "delete"]>, "many">; contentHash: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { workspaceId: string; relativePath: string; canonicalRelativePath: string; pathRef: string; exists: boolean; permissions: ("read" | "write" | "execute" | "delete")[]; contentHash?: string | undefined; kind?: "file" | "directory" | "symlink" | "other" | undefined; }, { workspaceId: string; relativePath: string; canonicalRelativePath: string; pathRef: string; exists: boolean; permissions: ("read" | "write" | "execute" | "delete")[]; contentHash?: string | undefined; kind?: "file" | "directory" | "symlink" | "other" | undefined; }>;
```

## `workspaceDeleteRequestExample`

Valid example value for Workspace Delete Request.

- Kind: constant
- Import: `import { workspaceDeleteRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const workspaceDeleteRequestExample: WorkspaceDeleteRequest;
```

## `workspaceDeleteRequestSchema`

Runtime schema for Workspace Delete Request.

- Kind: constant
- Import: `import { workspaceDeleteRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const workspaceDeleteRequestSchema: z.ZodObject<{ operationId: z.ZodString; workspaceId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; relativePath: z.ZodEffects<z.ZodString, string, string>; recursive: z.ZodOptional<z.ZodBoolean>; expectedContentHash: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; relativePath: string; idempotencyKey?: string | undefined; recursive?: boolean | undefined; expectedContentHash?: string | undefined; }, { operationId: string; workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; relativePath: string; idempotencyKey?: string | undefined; recursive?: boolean | undefined; expectedContentHash?: string | undefined; }>;
```

## `workspaceFileEntrySchema`

Runtime schema for Workspace File Entry.

- Kind: constant
- Import: `import { workspaceFileEntrySchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const workspaceFileEntrySchema: z.ZodObject<{ relativePath: z.ZodEffects<z.ZodString, string, string>; kind: z.ZodEnum<["file", "directory", "symlink", "other"]>; sizeBytes: z.ZodOptional<z.ZodNumber>; contentHash: z.ZodOptional<z.ZodString>; modifiedAt: z.ZodOptional<z.ZodString>; permissions: z.ZodOptional<z.ZodArray<z.ZodEnum<["read", "write", "execute", "delete"]>, "many">>; }, "strict", z.ZodTypeAny, { kind: "file" | "directory" | "symlink" | "other"; relativePath: string; contentHash?: string | undefined; sizeBytes?: number | undefined; permissions?: ("read" | "write" | "execute" | "delete")[] | undefined; modifiedAt?: string | undefined; }, { kind: "file" | "directory" | "symlink" | "other"; relativePath: string; contentHash?: string | undefined; sizeBytes?: number | undefined; permissions?: ("read" | "write" | "execute" | "delete")[] | undefined; modifiedAt?: string | undefined; }>;
```

## `workspaceListRequestSchema`

Runtime schema for Workspace List Request.

- Kind: constant
- Import: `import { workspaceListRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const workspaceListRequestSchema: z.ZodObject<{ workspaceId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; relativePath: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; recursive: z.ZodOptional<z.ZodBoolean>; includeHidden: z.ZodOptional<z.ZodBoolean>; maxEntries: z.ZodOptional<z.ZodNumber>; cursor: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; cursor?: string | undefined; relativePath?: string | undefined; recursive?: boolean | undefined; includeHidden?: boolean | undefined; maxEntries?: number | undefined; }, { workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; cursor?: string | undefined; relativePath?: string | undefined; recursive?: boolean | undefined; includeHidden?: boolean | undefined; maxEntries?: number | undefined; }>;
```

## `workspaceOperationJsonSchemas`

Workspace Operation JSON Schemas constant exported by the `modules/workspace/operations` module.

- Kind: constant
- Import: `import { workspaceOperationJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const workspaceOperationJsonSchemas: Record<string, JsonSchema>;
```

## `workspaceOperationPrincipalExample`

Valid example value for Workspace Operation Principal.

- Kind: constant
- Import: `import { workspaceOperationPrincipalExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const workspaceOperationPrincipalExample: ExecutionPrincipal;
```

## `workspacePathRequestSchema`

Runtime schema for Workspace Path Request.

- Kind: constant
- Import: `import { workspacePathRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const workspacePathRequestSchema: z.ZodObject<{ workspaceId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; relativePath: z.ZodEffects<z.ZodString, string, string>; operation: z.ZodEnum<["read", "write", "execute", "delete", "list"]>; allowMissing: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; operation: "read" | "list" | "write" | "execute" | "delete"; relativePath: string; allowMissing?: boolean | undefined; }, { workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; operation: "read" | "list" | "write" | "execute" | "delete"; relativePath: string; allowMissing?: boolean | undefined; }>;
```

## `workspaceReadRequestSchema`

Runtime schema for Workspace Read Request.

- Kind: constant
- Import: `import { workspaceReadRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const workspaceReadRequestSchema: z.ZodObject<{ workspaceId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; relativePath: z.ZodEffects<z.ZodString, string, string>; encoding: z.ZodOptional<z.ZodEnum<["utf8", "base64"]>>; offset: z.ZodOptional<z.ZodNumber>; length: z.ZodOptional<z.ZodNumber>; maxBytes: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; relativePath: string; length?: number | undefined; offset?: number | undefined; maxBytes?: number | undefined; encoding?: "utf8" | "base64" | undefined; }, { workspaceId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; relativePath: string; length?: number | undefined; offset?: number | undefined; maxBytes?: number | undefined; encoding?: "utf8" | "base64" | undefined; }>;
```

## `workspaceReadResultSchema`

Runtime schema for Workspace Read Result.

- Kind: constant
- Import: `import { workspaceReadResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const workspaceReadResultSchema: z.ZodObject<{ relativePath: z.ZodEffects<z.ZodString, string, string>; encoding: z.ZodEnum<["utf8", "base64"]>; content: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; truncated: z.ZodOptional<z.ZodBoolean>; nextOffset: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { contentHash: string; sizeBytes: number; content: string; relativePath: string; encoding: "utf8" | "base64"; truncated?: boolean | undefined; nextOffset?: number | undefined; }, { contentHash: string; sizeBytes: number; content: string; relativePath: string; encoding: "utf8" | "base64"; truncated?: boolean | undefined; nextOffset?: number | undefined; }>;
```

## `workspaceWriteRequestExample`

Valid example value for Workspace Write Request.

- Kind: constant
- Import: `import { workspaceWriteRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const workspaceWriteRequestExample: WorkspaceWriteRequest;
```

## `workspaceWriteRequestSchema`

Runtime schema for Workspace Write Request.

- Kind: constant
- Import: `import { workspaceWriteRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const workspaceWriteRequestSchema: (typeof import('@codesoul-co/hypha-core'))['workspaceWriteRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `workspaceWriteResultExample`

Valid example value for Workspace Write Result.

- Kind: constant
- Import: `import { workspaceWriteResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const workspaceWriteResultExample: WorkspaceWriteResult;
```

## `workspaceWriteResultSchema`

Runtime schema for Workspace Write Result.

- Kind: constant
- Import: `import { workspaceWriteResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare const workspaceWriteResultSchema: z.ZodObject<{ relativePath: z.ZodEffects<z.ZodString, string, string>; beforeHash: z.ZodOptional<z.ZodString>; afterHash: z.ZodString; sizeBytes: z.ZodNumber; mutation: z.ZodObject<{ path: z.ZodEffects<z.ZodString, string, string>; operation: z.ZodEnum<["created", "modified", "deleted", "renamed", "permission_changed"]>; beforeHash: z.ZodOptional<z.ZodString>; afterHash: z.ZodOptional<z.ZodString>; beforeSizeBytes: z.ZodOptional<z.ZodNumber>; afterSizeBytes: z.ZodOptional<z.ZodNumber>; artifactRef: z.ZodOptional<z.ZodString>; oldPath: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; detectedAt: z.ZodString; }, "strict", z.ZodTypeAny, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }, { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }>; artifactRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sizeBytes: number; mutation: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }; relativePath: string; afterHash: string; artifactRef?: string | undefined; beforeHash?: string | undefined; }, { sizeBytes: number; mutation: { path: string; detectedAt: string; operation: "deleted" | "created" | "modified" | "renamed" | "permission_changed"; artifactRef?: string | undefined; beforeHash?: string | undefined; afterHash?: string | undefined; beforeSizeBytes?: number | undefined; afterSizeBytes?: number | undefined; oldPath?: string | undefined; }; relativePath: string; afterHash: string; artifactRef?: string | undefined; beforeHash?: string | undefined; }>;
```

## `validateFileMutation`

Validate File Mutation function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateFileMutation } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare function validateFileMutation(input: unknown): FileMutation;
```

### Call signature

```text
validateFileMutation(input: unknown): FileMutation
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FileMutation`
- Description: The return contract is defined by the type shown above.

## `validateResolvedWorkspacePath`

Validate Resolved Workspace Path function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateResolvedWorkspacePath } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare function validateResolvedWorkspacePath(input: unknown): ResolvedWorkspacePath;
```

### Call signature

```text
validateResolvedWorkspacePath(input: unknown): ResolvedWorkspacePath
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ResolvedWorkspacePath`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceDeleteRequest`

Validate Workspace Delete Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceDeleteRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare function validateWorkspaceDeleteRequest(input: unknown): WorkspaceDeleteRequest;
```

### Call signature

```text
validateWorkspaceDeleteRequest(input: unknown): WorkspaceDeleteRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceDeleteRequest`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceFileEntry`

Validate Workspace File Entry function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceFileEntry } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare function validateWorkspaceFileEntry(input: unknown): WorkspaceFileEntry;
```

### Call signature

```text
validateWorkspaceFileEntry(input: unknown): WorkspaceFileEntry
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceFileEntry`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceListRequest`

Validate Workspace List Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceListRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare function validateWorkspaceListRequest(input: unknown): WorkspaceListRequest;
```

### Call signature

```text
validateWorkspaceListRequest(input: unknown): WorkspaceListRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceListRequest`
- Description: The return contract is defined by the type shown above.

## `validateWorkspacePathRequest`

Validate Workspace Path Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspacePathRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare function validateWorkspacePathRequest(input: unknown): WorkspacePathRequest;
```

### Call signature

```text
validateWorkspacePathRequest(input: unknown): WorkspacePathRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspacePathRequest`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceReadRequest`

Validate Workspace Read Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceReadRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare function validateWorkspaceReadRequest(input: unknown): WorkspaceReadRequest;
```

### Call signature

```text
validateWorkspaceReadRequest(input: unknown): WorkspaceReadRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceReadRequest`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceReadResult`

Validate Workspace Read Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceReadResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare function validateWorkspaceReadResult(input: unknown): WorkspaceReadResult;
```

### Call signature

```text
validateWorkspaceReadResult(input: unknown): WorkspaceReadResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceReadResult`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceWriteRequest`

Validate Workspace Write Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceWriteRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare function validateWorkspaceWriteRequest(input: unknown): WorkspaceWriteRequest;
```

### Call signature

```text
validateWorkspaceWriteRequest(input: unknown): WorkspaceWriteRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceWriteRequest`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceWriteResult`

Validate Workspace Write Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceWriteResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/operations.ts)

### Declaration

```text
export declare function validateWorkspaceWriteResult(input: unknown): WorkspaceWriteResult;
```

### Call signature

```text
validateWorkspaceWriteResult(input: unknown): WorkspaceWriteResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceWriteResult`
- Description: The return contract is defined by the type shown above.
