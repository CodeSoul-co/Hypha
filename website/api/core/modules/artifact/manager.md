# `@codesoul-co/hypha-core` / `modules/artifact/manager`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/artifact/manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)
- Exports: **43**

## Using this module

Use the Manager module for using the public contracts and operations for this capability boundary. It exports 31 constants, 12 functions.

### Import from the package entrypoint

```ts
import {
  artifactCreateDownloadAccessRequestExample,
  artifactCreateDownloadAccessRequestJsonSchema,
  artifactCreateDownloadAccessRequestSchema,
  artifactCreateRequestExample,
  artifactCreateRequestJsonSchema,
  artifactCreateRequestSchema,
  artifactFromWorkspaceRequestExample,
  artifactFromWorkspaceRequestJsonSchema,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 12 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 31 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { artifactCreateDownloadAccessRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = artifactCreateDownloadAccessRequestSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactCreateDownloadAccessRequestExample` | constant | <code>const artifactCreateDownloadAccessRequestExample: ArtifactCreateDownloadAccessRequest</code> | Valid example value for Artifact Create Download Access Request. |
| `artifactCreateDownloadAccessRequestJsonSchema` | constant | <code>const artifactCreateDownloadAccessRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact Create Download Access Request. |
| `artifactCreateDownloadAccessRequestSchema` | constant | <code>const artifactCreateDownloadAccessRequestSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.Zod...</code> | Runtime schema for Artifact Create Download Access Request. |
| `artifactCreateRequestExample` | constant | <code>const artifactCreateRequestExample: ArtifactCreateRequest</code> | Valid example value for Artifact Create Request. |
| `artifactCreateRequestJsonSchema` | constant | <code>const artifactCreateRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact Create Request. |
| `artifactCreateRequestSchema` | constant | <code>const artifactCreateRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; meta...</code> | Runtime schema for Artifact Create Request. |
| `artifactFromWorkspaceRequestExample` | constant | <code>const artifactFromWorkspaceRequestExample: ArtifactFromWorkspaceRequest</code> | Valid example value for Artifact From Workspace Request. |
| `artifactFromWorkspaceRequestJsonSchema` | constant | <code>const artifactFromWorkspaceRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact From Workspace Request. |
| `artifactFromWorkspaceRequestSchema` | constant | <code>const artifactFromWorkspaceRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"...</code> | Runtime schema for Artifact From Workspace Request. |
| `artifactGetRecordRequestJsonSchema` | constant | <code>const artifactGetRecordRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact Get Record Request. |
| `artifactGetRecordRequestSchema` | constant | <code>const artifactGetRecordRequestSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.Zo...</code> | Runtime schema for Artifact Get Record Request. |
| `artifactLatestRequestJsonSchema` | constant | <code>const artifactLatestRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact Latest Request. |
| `artifactLatestRequestSchema` | constant | <code>const artifactLatestRequestSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodSt...</code> | Runtime schema for Artifact Latest Request. |
| `artifactListRequestJsonSchema` | constant | <code>const artifactListRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact List Request. |
| `artifactListRequestSchema` | constant | <code>const artifactListRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRec...</code> | Runtime schema for Artifact List Request. |
| `artifactManagerContractJsonSchemas` | constant | <code>const artifactManagerContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Artifact Manager Contract JSON Schemas constant exported by the `modules/artifact/manager` module. |
| `artifactMutationRequestJsonSchema` | constant | <code>const artifactMutationRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact Mutation Request. |
| `artifactMutationRequestSchema` | constant | <code>const artifactMutationRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.Zod...</code> | Runtime schema for Artifact Mutation Request. |
| `artifactPreviousRequestJsonSchema` | constant | <code>const artifactPreviousRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact Previous Request. |
| `artifactPreviousRequestSchema` | constant | <code>const artifactPreviousRequestSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.Zod...</code> | Runtime schema for Artifact Previous Request. |
| `artifactReadRequestJsonSchema` | constant | <code>const artifactReadRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact Read Request. |
| `artifactReadRequestSchema` | constant | <code>const artifactReadRequestSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodStri...</code> | Runtime schema for Artifact Read Request. |
| `artifactReadResultJsonSchema` | constant | <code>const artifactReadResultJsonSchema: JsonSchema</code> | JSON Schema for Artifact Read Result. |
| `artifactReadResultSchema` | constant | <code>const artifactReadResultSchema: z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; versionNumber: z.ZodNumber; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; sessionId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodString; description: z.ZodOptional&lt;z....</code> | Runtime schema for Artifact Read Result. |
| `artifactTraceLineageRequestJsonSchema` | constant | <code>const artifactTraceLineageRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact Trace Lineage Request. |
| `artifactTraceLineageRequestSchema` | constant | <code>const artifactTraceLineageRequestSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z...</code> | Runtime schema for Artifact Trace Lineage Request. |
| `artifactVersionRequestExample` | constant | <code>const artifactVersionRequestExample: ArtifactVersionRequest</code> | Valid example value for Artifact Version Request. |
| `artifactVersionRequestJsonSchema` | constant | <code>const artifactVersionRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact Version Request. |
| `artifactVersionRequestSchema` | constant | <code>const artifactVersionRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodO...</code> | Runtime schema for Artifact Version Request. |
| `normalizedArtifactErrorJsonSchema` | constant | <code>const normalizedArtifactErrorJsonSchema: JsonSchema</code> | JSON Schema for Normalized Artifact Error. |
| `normalizedArtifactErrorSchema` | constant | <code>const normalizedArtifactErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["ARTIFACT_INVALID_INPUT", "ARTIFACT_NOT_FOUND", "ARTIFACT_PERMISSION_DENIED", "ARTIFACT_TOO_LARGE", "ARTIFACT_TYPE_DENIED", "ARTIFACT_HASH_MISMATCH", "ARTIFACT_VERSION_CONFLICT", "ARTIFACT_STORE_UNAVAILABLE", "ARTIFACT_UPLOAD_FAILED", "ARTIFACT_DOWNLOAD_FAILED", "ARTIFACT_DELETE_BLOCKED", "ARTIFACT_DELETE_PARTIAL", "ARTIFACT_VALIDATION_FAILED", "A...</code> | Runtime schema for Normalized Artifact Error. |
| `validateArtifactCreateDownloadAccessRequest` | function | <code>validateArtifactCreateDownloadAccessRequest(input: unknown): ArtifactCreateDownloadAccessRequest</code> | Validate Artifact Create Download Access Request function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactCreateRequest` | function | <code>validateArtifactCreateRequest(input: unknown): ArtifactCreateRequest</code> | Validate Artifact Create Request function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactFromWorkspaceRequest` | function | <code>validateArtifactFromWorkspaceRequest(input: unknown): ArtifactFromWorkspaceRequest</code> | Validate Artifact From Workspace Request function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactGetRecordRequest` | function | <code>validateArtifactGetRecordRequest(input: unknown): ArtifactGetRecordRequest</code> | Validate Artifact Get Record Request function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactLatestRequest` | function | <code>validateArtifactLatestRequest(input: unknown): ArtifactLatestRequest</code> | Validate Artifact Latest Request function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactListRequest` | function | <code>validateArtifactListRequest(input: unknown): ArtifactListRequest</code> | Validate Artifact List Request function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactMutationRequest` | function | <code>validateArtifactMutationRequest(input: unknown): ArtifactMutationRequest</code> | Validate Artifact Mutation Request function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactPreviousRequest` | function | <code>validateArtifactPreviousRequest(input: unknown): ArtifactPreviousRequest</code> | Validate Artifact Previous Request function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactReadRequest` | function | <code>validateArtifactReadRequest(input: unknown): ArtifactReadRequest</code> | Validate Artifact Read Request function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactTraceLineageRequest` | function | <code>validateArtifactTraceLineageRequest(input: unknown): ArtifactTraceLineageRequest</code> | Validate Artifact Trace Lineage Request function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactVersionRequest` | function | <code>validateArtifactVersionRequest(input: unknown): ArtifactVersionRequest</code> | Validate Artifact Version Request function with 1 public call signature; parameters and return types are listed below. |
| `validateNormalizedArtifactError` | function | <code>validateNormalizedArtifactError(input: unknown): NormalizedArtifactError</code> | Validate Normalized Artifact Error function with 1 public call signature; parameters and return types are listed below. |

## `artifactCreateDownloadAccessRequestExample`

Valid example value for Artifact Create Download Access Request.

- Kind: constant
- Import: `import { artifactCreateDownloadAccessRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactCreateDownloadAccessRequestExample: ArtifactCreateDownloadAccessRequest;
```

## `artifactCreateDownloadAccessRequestJsonSchema`

JSON Schema for Artifact Create Download Access Request.

- Kind: constant
- Import: `import { artifactCreateDownloadAccessRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactCreateDownloadAccessRequestJsonSchema: JsonSchema;
```

## `artifactCreateDownloadAccessRequestSchema`

Runtime schema for Artifact Create Download Access Request.

- Kind: constant
- Import: `import { artifactCreateDownloadAccessRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactCreateDownloadAccessRequestSchema: z.ZodObject<{ principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; artifactId: z.ZodString; versionId: z.ZodOptional<z.ZodString>; } & { operationId: z.ZodString; expiresInSeconds: z.ZodOptional<z.ZodNumber>; responseMimeType: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>; responseFilename: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; versionId?: string | undefined; expiresInSeconds?: number | undefined; responseMimeType?: string | undefined; responseFilename?: string | undefined; }, { operationId: string; artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; versionId?: string | undefined; expiresInSeconds?: number | undefined; responseMimeType?: string | undefined; responseFilename?: string | undefined; }>;
```

## `artifactCreateRequestExample`

Valid example value for Artifact Create Request.

- Kind: constant
- Import: `import { artifactCreateRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactCreateRequestExample: ArtifactCreateRequest;
```

## `artifactCreateRequestJsonSchema`

JSON Schema for Artifact Create Request.

- Kind: constant
- Import: `import { artifactCreateRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactCreateRequestJsonSchema: JsonSchema;
```

## `artifactCreateRequestSchema`

Runtime schema for Artifact Create Request.

- Kind: constant
- Import: `import { artifactCreateRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const artifactCreateRequestSchema: (typeof import('@codesoul-co/hypha-core'))['artifactCreateRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `artifactFromWorkspaceRequestExample`

Valid example value for Artifact From Workspace Request.

- Kind: constant
- Import: `import { artifactFromWorkspaceRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactFromWorkspaceRequestExample: ArtifactFromWorkspaceRequest;
```

## `artifactFromWorkspaceRequestJsonSchema`

JSON Schema for Artifact From Workspace Request.

- Kind: constant
- Import: `import { artifactFromWorkspaceRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactFromWorkspaceRequestJsonSchema: JsonSchema;
```

## `artifactFromWorkspaceRequestSchema`

Runtime schema for Artifact From Workspace Request.

- Kind: constant
- Import: `import { artifactFromWorkspaceRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const artifactFromWorkspaceRequestSchema: (typeof import('@codesoul-co/hypha-core'))['artifactFromWorkspaceRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `artifactGetRecordRequestJsonSchema`

JSON Schema for Artifact Get Record Request.

- Kind: constant
- Import: `import { artifactGetRecordRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactGetRecordRequestJsonSchema: JsonSchema;
```

## `artifactGetRecordRequestSchema`

Runtime schema for Artifact Get Record Request.

- Kind: constant
- Import: `import { artifactGetRecordRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactGetRecordRequestSchema: z.ZodObject<{ principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; artifactId: z.ZodString; versionId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; versionId?: string | undefined; }, { artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; versionId?: string | undefined; }>;
```

## `artifactLatestRequestJsonSchema`

JSON Schema for Artifact Latest Request.

- Kind: constant
- Import: `import { artifactLatestRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactLatestRequestJsonSchema: JsonSchema;
```

## `artifactLatestRequestSchema`

Runtime schema for Artifact Latest Request.

- Kind: constant
- Import: `import { artifactLatestRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactLatestRequestSchema: z.ZodObject<{ principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; logicalArtifactId: z.ZodString; }, "strict", z.ZodTypeAny, { logicalArtifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }, { logicalArtifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }>;
```

## `artifactListRequestJsonSchema`

JSON Schema for Artifact List Request.

- Kind: constant
- Import: `import { artifactListRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactListRequestJsonSchema: JsonSchema;
```

## `artifactListRequestSchema`

Runtime schema for Artifact List Request.

- Kind: constant
- Import: `import { artifactListRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const artifactListRequestSchema: (typeof import('@codesoul-co/hypha-core'))['artifactListRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `artifactManagerContractJsonSchemas`

Artifact Manager Contract JSON Schemas constant exported by the `modules/artifact/manager` module.

- Kind: constant
- Import: `import { artifactManagerContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactManagerContractJsonSchemas: Record<string, JsonSchema>;
```

## `artifactMutationRequestJsonSchema`

JSON Schema for Artifact Mutation Request.

- Kind: constant
- Import: `import { artifactMutationRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactMutationRequestJsonSchema: JsonSchema;
```

## `artifactMutationRequestSchema`

Runtime schema for Artifact Mutation Request.

- Kind: constant
- Import: `import { artifactMutationRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactMutationRequestSchema: z.ZodObject<{ operationId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; artifactId: z.ZodString; expectedRevision: z.ZodNumber; reason: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; idempotencyKey?: string | undefined; }, { operationId: string; artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; idempotencyKey?: string | undefined; }>;
```

## `artifactPreviousRequestJsonSchema`

JSON Schema for Artifact Previous Request.

- Kind: constant
- Import: `import { artifactPreviousRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactPreviousRequestJsonSchema: JsonSchema;
```

## `artifactPreviousRequestSchema`

Runtime schema for Artifact Previous Request.

- Kind: constant
- Import: `import { artifactPreviousRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactPreviousRequestSchema: z.ZodObject<{ principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; versionId: z.ZodString; }, "strict", z.ZodTypeAny, { versionId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }, { versionId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }>;
```

## `artifactReadRequestJsonSchema`

JSON Schema for Artifact Read Request.

- Kind: constant
- Import: `import { artifactReadRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactReadRequestJsonSchema: JsonSchema;
```

## `artifactReadRequestSchema`

Runtime schema for Artifact Read Request.

- Kind: constant
- Import: `import { artifactReadRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactReadRequestSchema: z.ZodObject<{ principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; artifactId: z.ZodString; versionId: z.ZodOptional<z.ZodString>; } & { range: z.ZodOptional<z.ZodEffects<z.ZodObject<{ start: z.ZodNumber; endInclusive: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>>; expectedContentHash: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; versionId?: string | undefined; expectedContentHash?: string | undefined; range?: { start: number; endInclusive?: number | undefined; } | undefined; }, { artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; versionId?: string | undefined; expectedContentHash?: string | undefined; range?: { start: number; endInclusive?: number | undefined; } | undefined; }>;
```

## `artifactReadResultJsonSchema`

JSON Schema for Artifact Read Result.

- Kind: constant
- Import: `import { artifactReadResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactReadResultJsonSchema: JsonSchema;
```

## `artifactReadResultSchema`

Runtime schema for Artifact Read Result.

- Kind: constant
- Import: `import { artifactReadResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const artifactReadResultSchema: (typeof import('@codesoul-co/hypha-core'))['artifactReadResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `artifactTraceLineageRequestJsonSchema`

JSON Schema for Artifact Trace Lineage Request.

- Kind: constant
- Import: `import { artifactTraceLineageRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactTraceLineageRequestJsonSchema: JsonSchema;
```

## `artifactTraceLineageRequestSchema`

Runtime schema for Artifact Trace Lineage Request.

- Kind: constant
- Import: `import { artifactTraceLineageRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactTraceLineageRequestSchema: z.ZodObject<{ principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; artifactId: z.ZodString; }, "strict", z.ZodTypeAny, { artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }, { artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }>;
```

## `artifactVersionRequestExample`

Valid example value for Artifact Version Request.

- Kind: constant
- Import: `import { artifactVersionRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactVersionRequestExample: ArtifactVersionRequest;
```

## `artifactVersionRequestJsonSchema`

JSON Schema for Artifact Version Request.

- Kind: constant
- Import: `import { artifactVersionRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const artifactVersionRequestJsonSchema: JsonSchema;
```

## `artifactVersionRequestSchema`

Runtime schema for Artifact Version Request.

- Kind: constant
- Import: `import { artifactVersionRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const artifactVersionRequestSchema: (typeof import('@codesoul-co/hypha-core'))['artifactVersionRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `normalizedArtifactErrorJsonSchema`

JSON Schema for Normalized Artifact Error.

- Kind: constant
- Import: `import { normalizedArtifactErrorJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const normalizedArtifactErrorJsonSchema: JsonSchema;
```

## `normalizedArtifactErrorSchema`

Runtime schema for Normalized Artifact Error.

- Kind: constant
- Import: `import { normalizedArtifactErrorSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare const normalizedArtifactErrorSchema: z.ZodObject<{ code: z.ZodEnum<["ARTIFACT_INVALID_INPUT", "ARTIFACT_NOT_FOUND", "ARTIFACT_PERMISSION_DENIED", "ARTIFACT_TOO_LARGE", "ARTIFACT_TYPE_DENIED", "ARTIFACT_HASH_MISMATCH", "ARTIFACT_VERSION_CONFLICT", "ARTIFACT_STORE_UNAVAILABLE", "ARTIFACT_UPLOAD_FAILED", "ARTIFACT_DOWNLOAD_FAILED", "ARTIFACT_DELETE_BLOCKED", "ARTIFACT_DELETE_PARTIAL", "ARTIFACT_VALIDATION_FAILED", "ARTIFACT_INTERNAL_ERROR"]>; message: z.ZodString; retryable: z.ZodBoolean; details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; causeRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { code: "ARTIFACT_INVALID_INPUT" | "ARTIFACT_NOT_FOUND" | "ARTIFACT_PERMISSION_DENIED" | "ARTIFACT_TOO_LARGE" | "ARTIFACT_TYPE_DENIED" | "ARTIFACT_HASH_MISMATCH" | "ARTIFACT_VERSION_CONFLICT" | "ARTIFACT_STORE_UNAVAILABLE" | "ARTIFACT_UPLOAD_FAILED" | "ARTIFACT_DOWNLOAD_FAILED" | "ARTIFACT_DELETE_BLOCKED" | "ARTIFACT_DELETE_PARTIAL" | "ARTIFACT_VALIDATION_FAILED" | "ARTIFACT_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, unknown> | undefined; causeRef?: string | undefined; }, { code: "ARTIFACT_INVALID_INPUT" | "ARTIFACT_NOT_FOUND" | "ARTIFACT_PERMISSION_DENIED" | "ARTIFACT_TOO_LARGE" | "ARTIFACT_TYPE_DENIED" | "ARTIFACT_HASH_MISMATCH" | "ARTIFACT_VERSION_CONFLICT" | "ARTIFACT_STORE_UNAVAILABLE" | "ARTIFACT_UPLOAD_FAILED" | "ARTIFACT_DOWNLOAD_FAILED" | "ARTIFACT_DELETE_BLOCKED" | "ARTIFACT_DELETE_PARTIAL" | "ARTIFACT_VALIDATION_FAILED" | "ARTIFACT_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, unknown> | undefined; causeRef?: string | undefined; }>;
```

## `validateArtifactCreateDownloadAccessRequest`

Validate Artifact Create Download Access Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactCreateDownloadAccessRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare function validateArtifactCreateDownloadAccessRequest(input: unknown): ArtifactCreateDownloadAccessRequest;
```

### Call signature

```text
validateArtifactCreateDownloadAccessRequest(input: unknown): ArtifactCreateDownloadAccessRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactCreateDownloadAccessRequest`
- Description: The return contract is defined by the type shown above.

## `validateArtifactCreateRequest`

Validate Artifact Create Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactCreateRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare function validateArtifactCreateRequest(input: unknown): ArtifactCreateRequest;
```

### Call signature

```text
validateArtifactCreateRequest(input: unknown): ArtifactCreateRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactCreateRequest`
- Description: The return contract is defined by the type shown above.

## `validateArtifactFromWorkspaceRequest`

Validate Artifact From Workspace Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactFromWorkspaceRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare function validateArtifactFromWorkspaceRequest(input: unknown): ArtifactFromWorkspaceRequest;
```

### Call signature

```text
validateArtifactFromWorkspaceRequest(input: unknown): ArtifactFromWorkspaceRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactFromWorkspaceRequest`
- Description: The return contract is defined by the type shown above.

## `validateArtifactGetRecordRequest`

Validate Artifact Get Record Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactGetRecordRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare function validateArtifactGetRecordRequest(input: unknown): ArtifactGetRecordRequest;
```

### Call signature

```text
validateArtifactGetRecordRequest(input: unknown): ArtifactGetRecordRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactGetRecordRequest`
- Description: The return contract is defined by the type shown above.

## `validateArtifactLatestRequest`

Validate Artifact Latest Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactLatestRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare function validateArtifactLatestRequest(input: unknown): ArtifactLatestRequest;
```

### Call signature

```text
validateArtifactLatestRequest(input: unknown): ArtifactLatestRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactLatestRequest`
- Description: The return contract is defined by the type shown above.

## `validateArtifactListRequest`

Validate Artifact List Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactListRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare function validateArtifactListRequest(input: unknown): ArtifactListRequest;
```

### Call signature

```text
validateArtifactListRequest(input: unknown): ArtifactListRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactListRequest`
- Description: The return contract is defined by the type shown above.

## `validateArtifactMutationRequest`

Validate Artifact Mutation Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactMutationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare function validateArtifactMutationRequest(input: unknown): ArtifactMutationRequest;
```

### Call signature

```text
validateArtifactMutationRequest(input: unknown): ArtifactMutationRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactMutationRequest`
- Description: The return contract is defined by the type shown above.

## `validateArtifactPreviousRequest`

Validate Artifact Previous Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactPreviousRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare function validateArtifactPreviousRequest(input: unknown): ArtifactPreviousRequest;
```

### Call signature

```text
validateArtifactPreviousRequest(input: unknown): ArtifactPreviousRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactPreviousRequest`
- Description: The return contract is defined by the type shown above.

## `validateArtifactReadRequest`

Validate Artifact Read Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactReadRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare function validateArtifactReadRequest(input: unknown): ArtifactReadRequest;
```

### Call signature

```text
validateArtifactReadRequest(input: unknown): ArtifactReadRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactReadRequest`
- Description: The return contract is defined by the type shown above.

## `validateArtifactTraceLineageRequest`

Validate Artifact Trace Lineage Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactTraceLineageRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare function validateArtifactTraceLineageRequest(input: unknown): ArtifactTraceLineageRequest;
```

### Call signature

```text
validateArtifactTraceLineageRequest(input: unknown): ArtifactTraceLineageRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactTraceLineageRequest`
- Description: The return contract is defined by the type shown above.

## `validateArtifactVersionRequest`

Validate Artifact Version Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactVersionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare function validateArtifactVersionRequest(input: unknown): ArtifactVersionRequest;
```

### Call signature

```text
validateArtifactVersionRequest(input: unknown): ArtifactVersionRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactVersionRequest`
- Description: The return contract is defined by the type shown above.

## `validateNormalizedArtifactError`

Validate Normalized Artifact Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateNormalizedArtifactError } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager.ts)

### Declaration

```text
export declare function validateNormalizedArtifactError(input: unknown): NormalizedArtifactError;
```

### Call signature

```text
validateNormalizedArtifactError(input: unknown): NormalizedArtifactError
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `NormalizedArtifactError`
- Description: The return contract is defined by the type shown above.
