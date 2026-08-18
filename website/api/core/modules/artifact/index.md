# `@codesoul-co/hypha-core` / `modules/artifact/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/artifact/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)
- Exports: **46**

## Using this module

Use the Index module for using the public contracts and operations for this capability boundary. It exports 40 constants, 6 functions.

### Import from the package entrypoint

```ts
import {
  artifactAccessPolicySpecJsonSchema,
  artifactAccessPolicySpecSchema,
  artifactAccessRecordJsonSchema,
  artifactAccessRecordSchema,
  artifactContentAddressingSpecJsonSchema,
  artifactContentAddressingSpecSchema,
  artifactContentHashSchema,
  artifactContractJsonSchemas,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 6 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 40 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { artifactAccessPolicySpecSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = artifactAccessPolicySpecSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactAccessPolicySpecJsonSchema` | constant | <code>const artifactAccessPolicySpecJsonSchema: JsonSchema</code> | JSON Schema for Artifact Access Policy Spec. |
| `artifactAccessPolicySpecSchema` | constant | <code>const artifactAccessPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ defaultVisibility: z.ZodEnum&lt;["private", "session", "workspace", "tenant", "shared"]&gt;; allowedPrincipalTypes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;, "many"&gt;&gt;; requiredReadScopes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; requiredWriteScopes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; requiredDeleteScope...</code> | Runtime schema for Artifact Access Policy Spec. |
| `artifactAccessRecordJsonSchema` | constant | <code>const artifactAccessRecordJsonSchema: JsonSchema</code> | JSON Schema for Artifact Access Record. |
| `artifactAccessRecordSchema` | constant | <code>const artifactAccessRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ visibility: z.ZodEnum&lt;["private", "session", "workspace", "tenant", "shared"]&gt;; ownerPrincipalId: z.ZodString; workspaceId: z.ZodString; allowedPrincipalIds: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; allowedRoles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strict", z.ZodTypeAny, { workspaceId: string; visibility: "private" &#124; "session" &#124; "w...</code> | Runtime schema for Artifact Access Record. |
| `artifactContentAddressingSpecJsonSchema` | constant | <code>const artifactContentAddressingSpecJsonSchema: JsonSchema</code> | JSON Schema for Artifact Content Addressing Spec. |
| `artifactContentAddressingSpecSchema` | constant | <code>const artifactContentAddressingSpecSchema: z.ZodObject&lt;{ hashAlgorithm: z.ZodEnum&lt;["sha256", "blake3"]&gt;; verifyOnRead: z.ZodBoolean; deduplicate: z.ZodBoolean; }, "strict", z.ZodTypeAny, { hashAlgorithm: "sha256" &#124; "blake3"; verifyOnRead: boolean; deduplicate: boolean; }, { hashAlgorithm: "sha256" &#124; "blake3"; verifyOnRead: boolean; deduplicate: boolean; }&gt;</code> | Runtime schema for Artifact Content Addressing Spec. |
| `artifactContentHashSchema` | constant | <code>const artifactContentHashSchema: z.ZodString</code> | Runtime schema for Artifact Content Hash. |
| `artifactContractJsonSchemas` | constant | <code>const artifactContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Artifact Contract JSON Schemas constant exported by the `modules/artifact/index` module. |
| `artifactHashAlgorithmSchema` | constant | <code>const artifactHashAlgorithmSchema: z.ZodEnum&lt;["sha256", "blake3"]&gt;</code> | Runtime schema for Artifact Hash Algorithm. |
| `artifactKindSchema` | constant | <code>const artifactKindSchema: z.ZodEnum&lt;["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]&gt;</code> | Runtime schema for Artifact Kind. |
| `artifactLineageExample` | constant | <code>const artifactLineageExample: ArtifactLineage</code> | Valid example value for Artifact Lineage. |
| `artifactLineageJsonSchema` | constant | <code>const artifactLineageJsonSchema: JsonSchema</code> | JSON Schema for Artifact Lineage. |
| `artifactLineageNodeJsonSchema` | constant | <code>const artifactLineageNodeJsonSchema: JsonSchema</code> | JSON Schema for Artifact Lineage Node. |
| `artifactLineageNodeSchema` | constant | <code>const artifactLineageNodeSchema: z.ZodObject&lt;{ artifactId: z.ZodString; versionId: z.ZodString; logicalArtifactId: z.ZodString; contentHash: z.ZodString; kind: z.ZodOptional&lt;z.ZodEnum&lt;["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]&gt;&gt;; transformation: z.ZodOptional&lt;z.ZodSt...</code> | Runtime schema for Artifact Lineage Node. |
| `artifactLineageSchema` | constant | <code>const artifactLineageSchema: z.ZodEffects&lt;z.ZodObject&lt;{ artifactId: z.ZodString; ancestors: z.ZodArray&lt;z.ZodObject&lt;{ artifactId: z.ZodString; versionId: z.ZodString; logicalArtifactId: z.ZodString; contentHash: z.ZodString; kind: z.ZodOptional&lt;z.ZodEnum&lt;["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", ...</code> | Runtime schema for Artifact Lineage. |
| `artifactPreviewPolicySpecJsonSchema` | constant | <code>const artifactPreviewPolicySpecJsonSchema: JsonSchema</code> | JSON Schema for Artifact Preview Policy Spec. |
| `artifactPreviewPolicySpecSchema` | constant | <code>const artifactPreviewPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ enabled: z.ZodBoolean; maxPreviewBytes: z.ZodOptional&lt;z.ZodNumber&gt;; allowedMimeTypes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strict", z.ZodTypeAny, { enabled: boolean; maxPreviewBytes?: number &#124; undefined; allowedMimeTypes?: string[] &#124; undefined; }, { enabled: boolean; maxPreviewBytes?: number &#124; undefined; allowedMimeTypes?: string[] &#124; ...</code> | Runtime schema for Artifact Preview Policy Spec. |
| `artifactProfileSpecExample` | constant | <code>const artifactProfileSpecExample: ArtifactProfileSpec</code> | Valid example value for Artifact Profile Spec. |
| `artifactProfileSpecJsonSchema` | constant | <code>const artifactProfileSpecJsonSchema: JsonSchema</code> | JSON Schema for Artifact Profile Spec. |
| `artifactProfileSpecSchema` | constant | <code>const artifactProfileSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { revision: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodOptional&lt;z.ZodString&gt;; storeRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }, { id: string; revisi...</code> | Runtime schema for Artifact Profile Spec. |
| `artifactProvenanceJsonSchema` | constant | <code>const artifactProvenanceJsonSchema: JsonSchema</code> | JSON Schema for Artifact Provenance. |
| `artifactProvenanceSchema` | constant | <code>const artifactProvenanceSchema: z.ZodEffects&lt;z.ZodObject&lt;{ sourceType: z.ZodEnum&lt;["user_upload", "agent_generated", "tool_generated", "command_generated", "derived", "imported", "snapshot", "patch"]&gt;; createdBy: z.ZodString; sourceEventId: z.ZodOptional&lt;z.ZodString&gt;; toolInvocationId: z.ZodOptional&lt;z.ZodString&gt;; executionId: z.ZodOptional&lt;z.ZodString&gt;; workflowState: z.ZodOptional&lt;z.ZodString&gt;; sourceArtifactIds: ...</code> | Runtime schema for Artifact Provenance. |
| `artifactRecordExample` | constant | <code>const artifactRecordExample: ArtifactRecord</code> | Valid example value for Artifact Record. |
| `artifactRecordJsonSchema` | constant | <code>const artifactRecordJsonSchema: JsonSchema</code> | JSON Schema for Artifact Record. |
| `artifactRecordSchema` | constant | <code>const artifactRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; versionNumber: z.ZodNumber; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; sessionId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; relativePath: ...</code> | Runtime schema for Artifact Record. |
| `artifactRefExample` | constant | <code>const artifactRefExample: ArtifactRef</code> | Valid example value for Artifact Ref. |
| `artifactRefJsonSchema` | constant | <code>const artifactRefJsonSchema: JsonSchema</code> | JSON Schema for Artifact Ref. |
| `artifactRefSchema` | constant | <code>const artifactRefSchema: z.ZodObject&lt;{ artifactId: z.ZodString; versionId: z.ZodOptional&lt;z.ZodString&gt;; contentHash: z.ZodString; kind: z.ZodOptional&lt;z.ZodEnum&lt;["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]&gt;&gt;; mimeType: z.ZodOptional&lt;z.ZodString&gt;; sizeBytes: z.ZodOptional...</code> | Runtime schema for Artifact Ref. |
| `artifactRetentionPolicySpecJsonSchema` | constant | <code>const artifactRetentionPolicySpecJsonSchema: JsonSchema</code> | JSON Schema for Artifact Retention Policy Spec. |
| `artifactRetentionPolicySpecSchema` | constant | <code>const artifactRetentionPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ defaultTtlSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; archiveAfterSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; deleteAfterSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; retainFinal: z.ZodOptional&lt;z.ZodBoolean&gt;; retainOnFailure: z.ZodOptional&lt;z.ZodBoolean&gt;; legalHoldSupported: z.ZodOptional&lt;z.ZodBoolean&gt;; garbageCollectUnreferenced: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict"...</code> | Runtime schema for Artifact Retention Policy Spec. |
| `artifactRetentionRecordJsonSchema` | constant | <code>const artifactRetentionRecordJsonSchema: JsonSchema</code> | JSON Schema for Artifact Retention Record. |
| `artifactRetentionRecordSchema` | constant | <code>const artifactRetentionRecordSchema: z.ZodObject&lt;{ policyRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }&gt;&gt;; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; archivedAt: ...</code> | Runtime schema for Artifact Retention Record. |
| `artifactStatusSchema` | constant | <code>const artifactStatusSchema: z.ZodEnum&lt;["creating", "draft", "final", "archived", "invalidated", "deletion_pending", "deleted", "failed"]&gt;</code> | Runtime schema for Artifact Status. |
| `artifactStorageRefJsonSchema` | constant | <code>const artifactStorageRefJsonSchema: JsonSchema</code> | JSON Schema for Artifact Storage Ref. |
| `artifactStorageRefSchema` | constant | <code>const artifactStorageRefSchema: z.ZodObject&lt;{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional&lt;z.ZodString&gt;; objectKey: z.ZodString; versionId: z.ZodOptional&lt;z.ZodString&gt;; etag: z.ZodOptional&lt;z.ZodString&gt;; region: z.ZodOptional&lt;z.ZodString&gt;; encrypted: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: string &#124; undefined; bucketOrNamespace?: string &#124; und...</code> | Runtime schema for Artifact Storage Ref. |
| `artifactValidationPolicySpecJsonSchema` | constant | <code>const artifactValidationPolicySpecJsonSchema: JsonSchema</code> | JSON Schema for Artifact Validation Policy Spec. |
| `artifactValidationPolicySpecSchema` | constant | <code>const artifactValidationPolicySpecSchema: z.ZodObject&lt;{ verifyMimeType: z.ZodOptional&lt;z.ZodBoolean&gt;; verifyExtension: z.ZodOptional&lt;z.ZodBoolean&gt;; malwareScanRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }, { id: string; revision?: strin...</code> | Runtime schema for Artifact Validation Policy Spec. |
| `artifactVersioningPolicySpecJsonSchema` | constant | <code>const artifactVersioningPolicySpecJsonSchema: JsonSchema</code> | JSON Schema for Artifact Versioning Policy Spec. |
| `artifactVersioningPolicySpecSchema` | constant | <code>const artifactVersioningPolicySpecSchema: z.ZodObject&lt;{ strategy: z.ZodLiteral&lt;"append_only"&gt;; retainPreviousVersions: z.ZodLiteral&lt;true&gt;; maxVersions: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodTypeAny, { strategy: "append_only"; retainPreviousVersions: true; maxVersions?: number &#124; undefined; }, { strategy: "append_only"; retainPreviousVersions: true; maxVersions?: number &#124; undefined; }&gt;</code> | Runtime schema for Artifact Versioning Policy Spec. |
| `storedArtifactRecordSchema` | constant | <code>const storedArtifactRecordSchema: z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; versionNumber: z.ZodNumber; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; sessionId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodString; description: z.ZodOptional&lt;...</code> | Runtime schema for Stored Artifact Record. |
| `validateArtifactLineage` | function | <code>validateArtifactLineage(input: unknown): ArtifactLineage</code> | Validate Artifact Lineage function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactProfileSpec` | function | <code>validateArtifactProfileSpec(input: unknown): ArtifactProfileSpec</code> | Validate Artifact Profile Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactRecord` | function | <code>validateArtifactRecord(input: unknown): ArtifactRecord</code> | Validate Artifact Record function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactRef` | function | <code>validateArtifactRef(input: unknown): ArtifactRef</code> | Validate Artifact Ref function with 1 public call signature; parameters and return types are listed below. |
| `validateStoredArtifactRecord` | function | <code>validateStoredArtifactRecord(input: unknown): StoredArtifactRecord</code> | Validate Stored Artifact Record function with 1 public call signature; parameters and return types are listed below. |
| `validateStoredArtifactRecords` | function | <code>validateStoredArtifactRecords(input: unknown): StoredArtifactRecord[]</code> | Validate Stored Artifact Records function with 1 public call signature; parameters and return types are listed below. |

## `artifactAccessPolicySpecJsonSchema`

JSON Schema for Artifact Access Policy Spec.

- Kind: constant
- Import: `import { artifactAccessPolicySpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactAccessPolicySpecJsonSchema: JsonSchema;
```

## `artifactAccessPolicySpecSchema`

Runtime schema for Artifact Access Policy Spec.

- Kind: constant
- Import: `import { artifactAccessPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactAccessPolicySpecSchema: z.ZodEffects<z.ZodObject<{ defaultVisibility: z.ZodEnum<["private", "session", "workspace", "tenant", "shared"]>; allowedPrincipalTypes: z.ZodOptional<z.ZodArray<z.ZodEnum<["user", "agent", "service", "system"]>, "many">>; requiredReadScopes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; requiredWriteScopes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; requiredDeleteScopes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; signedUrlTtlSeconds: z.ZodOptional<z.ZodNumber>; allowRangeRead: z.ZodOptional<z.ZodBoolean>; allowCrossWorkspaceCopy: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { defaultVisibility: "private" | "session" | "workspace" | "tenant" | "shared"; allowedPrincipalTypes?: ("user" | "agent" | "service" | "system")[] | undefined; requiredReadScopes?: string[] | undefined; requiredWriteScopes?: string[] | undefined; requiredDeleteScopes?: string[] | undefined; signedUrlTtlSeconds?: number | undefined; allowRangeRead?: boolean | undefined; allowCrossWorkspaceCopy?: boolean | undefined; }, { defaultVisibility: "private" | "session" | "workspace" | "tenant" | "shared"; allowedPrincipalTypes?: ("user" | "agent" | "service" | "system")[] | undefined; requiredReadScopes?: string[] | undefined; requiredWriteScopes?: string[] | undefined; requiredDeleteScopes?: string[] | undefined; signedUrlTtlSeconds?: number | undefined; allowRangeRead?: boolean | undefined; allowCrossWorkspaceCopy?: boolean | undefined; }>, { defaultVisibility: "private" | "session" | "workspace" | "tenant" | "shared"; allowedPrincipalTypes?: ("user" | "agent" | "service" | "system")[] | undefined; requiredReadScopes?: string[] | undefined; requiredWriteScopes?: string[] | undefined; requiredDeleteScopes?: string[] | undefined; signedUrlTtlSeconds?: number | undefined; allowRangeRead?: boolean | undefined; allowCrossWorkspaceCopy?: boolean | undefined; }, { defaultVisibility: "private" | "session" | "workspace" | "tenant" | "shared"; allowedPrincipalTypes?: ("user" | "agent" | "service" | "system")[] | undefined; requiredReadScopes?: string[] | undefined; requiredWriteScopes?: string[] | undefined; requiredDeleteScopes?: string[] | undefined; signedUrlTtlSeconds?: number | undefined; allowRangeRead?: boolean | undefined; allowCrossWorkspaceCopy?: boolean | undefined; }>;
```

## `artifactAccessRecordJsonSchema`

JSON Schema for Artifact Access Record.

- Kind: constant
- Import: `import { artifactAccessRecordJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactAccessRecordJsonSchema: JsonSchema;
```

## `artifactAccessRecordSchema`

Runtime schema for Artifact Access Record.

- Kind: constant
- Import: `import { artifactAccessRecordSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactAccessRecordSchema: z.ZodEffects<z.ZodObject<{ visibility: z.ZodEnum<["private", "session", "workspace", "tenant", "shared"]>; ownerPrincipalId: z.ZodString; workspaceId: z.ZodString; allowedPrincipalIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; allowedRoles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strict", z.ZodTypeAny, { workspaceId: string; visibility: "private" | "session" | "workspace" | "tenant" | "shared"; ownerPrincipalId: string; allowedPrincipalIds?: string[] | undefined; allowedRoles?: string[] | undefined; }, { workspaceId: string; visibility: "private" | "session" | "workspace" | "tenant" | "shared"; ownerPrincipalId: string; allowedPrincipalIds?: string[] | undefined; allowedRoles?: string[] | undefined; }>, { workspaceId: string; visibility: "private" | "session" | "workspace" | "tenant" | "shared"; ownerPrincipalId: string; allowedPrincipalIds?: string[] | undefined; allowedRoles?: string[] | undefined; }, { workspaceId: string; visibility: "private" | "session" | "workspace" | "tenant" | "shared"; ownerPrincipalId: string; allowedPrincipalIds?: string[] | undefined; allowedRoles?: string[] | undefined; }>;
```

## `artifactContentAddressingSpecJsonSchema`

JSON Schema for Artifact Content Addressing Spec.

- Kind: constant
- Import: `import { artifactContentAddressingSpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactContentAddressingSpecJsonSchema: JsonSchema;
```

## `artifactContentAddressingSpecSchema`

Runtime schema for Artifact Content Addressing Spec.

- Kind: constant
- Import: `import { artifactContentAddressingSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactContentAddressingSpecSchema: z.ZodObject<{ hashAlgorithm: z.ZodEnum<["sha256", "blake3"]>; verifyOnRead: z.ZodBoolean; deduplicate: z.ZodBoolean; }, "strict", z.ZodTypeAny, { hashAlgorithm: "sha256" | "blake3"; verifyOnRead: boolean; deduplicate: boolean; }, { hashAlgorithm: "sha256" | "blake3"; verifyOnRead: boolean; deduplicate: boolean; }>;
```

## `artifactContentHashSchema`

Runtime schema for Artifact Content Hash.

- Kind: constant
- Import: `import { artifactContentHashSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactContentHashSchema: z.ZodString;
```

## `artifactContractJsonSchemas`

Artifact Contract JSON Schemas constant exported by the `modules/artifact/index` module.

- Kind: constant
- Import: `import { artifactContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactContractJsonSchemas: Record<string, JsonSchema>;
```

## `artifactHashAlgorithmSchema`

Runtime schema for Artifact Hash Algorithm.

- Kind: constant
- Import: `import { artifactHashAlgorithmSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactHashAlgorithmSchema: z.ZodEnum<["sha256", "blake3"]>;
```

## `artifactKindSchema`

Runtime schema for Artifact Kind.

- Kind: constant
- Import: `import { artifactKindSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactKindSchema: z.ZodEnum<["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]>;
```

## `artifactLineageExample`

Valid example value for Artifact Lineage.

- Kind: constant
- Import: `import { artifactLineageExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactLineageExample: ArtifactLineage;
```

## `artifactLineageJsonSchema`

JSON Schema for Artifact Lineage.

- Kind: constant
- Import: `import { artifactLineageJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactLineageJsonSchema: JsonSchema;
```

## `artifactLineageNodeJsonSchema`

JSON Schema for Artifact Lineage Node.

- Kind: constant
- Import: `import { artifactLineageNodeJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactLineageNodeJsonSchema: JsonSchema;
```

## `artifactLineageNodeSchema`

Runtime schema for Artifact Lineage Node.

- Kind: constant
- Import: `import { artifactLineageNodeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactLineageNodeSchema: z.ZodObject<{ artifactId: z.ZodString; versionId: z.ZodString; logicalArtifactId: z.ZodString; contentHash: z.ZodString; kind: z.ZodOptional<z.ZodEnum<["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]>>; transformation: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { versionId: string; contentHash: string; logicalArtifactId: string; artifactId: string; kind?: "document" | "code" | "dataset" | "image" | "audio" | "video" | "table" | "report" | "archive" | "patch" | "snapshot" | "test_report" | "build_output" | "log" | "tool_output" | "execution_receipt" | "other" | undefined; transformation?: string | undefined; }, { versionId: string; contentHash: string; logicalArtifactId: string; artifactId: string; kind?: "document" | "code" | "dataset" | "image" | "audio" | "video" | "table" | "report" | "archive" | "patch" | "snapshot" | "test_report" | "build_output" | "log" | "tool_output" | "execution_receipt" | "other" | undefined; transformation?: string | undefined; }>;
```

## `artifactLineageSchema`

Runtime schema for Artifact Lineage.

- Kind: constant
- Import: `import { artifactLineageSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const artifactLineageSchema: (typeof import('@codesoul-co/hypha-core'))['artifactLineageSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `artifactPreviewPolicySpecJsonSchema`

JSON Schema for Artifact Preview Policy Spec.

- Kind: constant
- Import: `import { artifactPreviewPolicySpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactPreviewPolicySpecJsonSchema: JsonSchema;
```

## `artifactPreviewPolicySpecSchema`

Runtime schema for Artifact Preview Policy Spec.

- Kind: constant
- Import: `import { artifactPreviewPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactPreviewPolicySpecSchema: z.ZodEffects<z.ZodObject<{ enabled: z.ZodBoolean; maxPreviewBytes: z.ZodOptional<z.ZodNumber>; allowedMimeTypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strict", z.ZodTypeAny, { enabled: boolean; maxPreviewBytes?: number | undefined; allowedMimeTypes?: string[] | undefined; }, { enabled: boolean; maxPreviewBytes?: number | undefined; allowedMimeTypes?: string[] | undefined; }>, { enabled: boolean; maxPreviewBytes?: number | undefined; allowedMimeTypes?: string[] | undefined; }, { enabled: boolean; maxPreviewBytes?: number | undefined; allowedMimeTypes?: string[] | undefined; }>;
```

## `artifactProfileSpecExample`

Valid example value for Artifact Profile Spec.

- Kind: constant
- Import: `import { artifactProfileSpecExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactProfileSpecExample: ArtifactProfileSpec;
```

## `artifactProfileSpecJsonSchema`

JSON Schema for Artifact Profile Spec.

- Kind: constant
- Import: `import { artifactProfileSpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactProfileSpecJsonSchema: JsonSchema;
```

## `artifactProfileSpecSchema`

Runtime schema for Artifact Profile Spec.

- Kind: constant
- Import: `import { artifactProfileSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const artifactProfileSpecSchema: (typeof import('@codesoul-co/hypha-core'))['artifactProfileSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `artifactProvenanceJsonSchema`

JSON Schema for Artifact Provenance.

- Kind: constant
- Import: `import { artifactProvenanceJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactProvenanceJsonSchema: JsonSchema;
```

## `artifactProvenanceSchema`

Runtime schema for Artifact Provenance.

- Kind: constant
- Import: `import { artifactProvenanceSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactProvenanceSchema: z.ZodEffects<z.ZodObject<{ sourceType: z.ZodEnum<["user_upload", "agent_generated", "tool_generated", "command_generated", "derived", "imported", "snapshot", "patch"]>; createdBy: z.ZodString; sourceEventId: z.ZodOptional<z.ZodString>; toolInvocationId: z.ZodOptional<z.ZodString>; executionId: z.ZodOptional<z.ZodString>; workflowState: z.ZodOptional<z.ZodString>; sourceArtifactIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; transformation: z.ZodOptional<z.ZodString>; environmentHash: z.ZodOptional<z.ZodString>; commandHash: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { sourceType: "patch" | "snapshot" | "user_upload" | "agent_generated" | "tool_generated" | "command_generated" | "derived" | "imported"; createdBy: string; sourceArtifactIds?: string[] | undefined; sourceEventId?: string | undefined; toolInvocationId?: string | undefined; executionId?: string | undefined; workflowState?: string | undefined; transformation?: string | undefined; environmentHash?: string | undefined; commandHash?: string | undefined; metadata?: Record<string, unknown> | undefined; }, { sourceType: "patch" | "snapshot" | "user_upload" | "agent_generated" | "tool_generated" | "command_generated" | "derived" | "imported"; createdBy: string; sourceArtifactIds?: string[] | undefined; sourceEventId?: string | undefined; toolInvocationId?: string | undefined; executionId?: string | undefined; workflowState?: string | undefined; transformation?: string | undefined; environmentHash?: string | undefined; commandHash?: string | undefined; metadata?: Record<string, unknown> | undefined; }>, { sourceType: "patch" | "snapshot" | "user_upload" | "agent_generated" | "tool_generated" | "command_generated" | "derived" | "imported"; createdBy: string; sourceArtifactIds?: string[] | undefined; sourceEventId?: string | undefined; toolInvocationId?: string | undefined; executionId?: string | undefined; workflowState?: string | undefined; transformation?: string | undefined; environmentHash?: string | undefined; commandHash?: string | undefined; metadata?: Record<string, unknown> | undefined; }, { sourceType: "patch" | "snapshot" | "user_upload" | "agent_generated" | "tool_generated" | "command_generated" | "derived" | "imported"; createdBy: string; sourceArtifactIds?: string[] | undefined; sourceEventId?: string | undefined; toolInvocationId?: string | undefined; executionId?: string | undefined; workflowState?: string | undefined; transformation?: string | undefined; environmentHash?: string | undefined; commandHash?: string | undefined; metadata?: Record<string, unknown> | undefined; }>;
```

## `artifactRecordExample`

Valid example value for Artifact Record.

- Kind: constant
- Import: `import { artifactRecordExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactRecordExample: ArtifactRecord;
```

## `artifactRecordJsonSchema`

JSON Schema for Artifact Record.

- Kind: constant
- Import: `import { artifactRecordJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactRecordJsonSchema: JsonSchema;
```

## `artifactRecordSchema`

Runtime schema for Artifact Record.

- Kind: constant
- Import: `import { artifactRecordSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const artifactRecordSchema: (typeof import('@codesoul-co/hypha-core'))['artifactRecordSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `artifactRefExample`

Valid example value for Artifact Ref.

- Kind: constant
- Import: `import { artifactRefExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactRefExample: ArtifactRef;
```

## `artifactRefJsonSchema`

JSON Schema for Artifact Ref.

- Kind: constant
- Import: `import { artifactRefJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactRefJsonSchema: JsonSchema;
```

## `artifactRefSchema`

Runtime schema for Artifact Ref.

- Kind: constant
- Import: `import { artifactRefSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactRefSchema: z.ZodObject<{ artifactId: z.ZodString; versionId: z.ZodOptional<z.ZodString>; contentHash: z.ZodString; kind: z.ZodOptional<z.ZodEnum<["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]>>; mimeType: z.ZodOptional<z.ZodString>; sizeBytes: z.ZodOptional<z.ZodNumber>; accessTokenRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { contentHash: string; artifactId: string; versionId?: string | undefined; kind?: "document" | "code" | "dataset" | "image" | "audio" | "video" | "table" | "report" | "archive" | "patch" | "snapshot" | "test_report" | "build_output" | "log" | "tool_output" | "execution_receipt" | "other" | undefined; mimeType?: string | undefined; sizeBytes?: number | undefined; accessTokenRef?: string | undefined; }, { contentHash: string; artifactId: string; versionId?: string | undefined; kind?: "document" | "code" | "dataset" | "image" | "audio" | "video" | "table" | "report" | "archive" | "patch" | "snapshot" | "test_report" | "build_output" | "log" | "tool_output" | "execution_receipt" | "other" | undefined; mimeType?: string | undefined; sizeBytes?: number | undefined; accessTokenRef?: string | undefined; }>;
```

## `artifactRetentionPolicySpecJsonSchema`

JSON Schema for Artifact Retention Policy Spec.

- Kind: constant
- Import: `import { artifactRetentionPolicySpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactRetentionPolicySpecJsonSchema: JsonSchema;
```

## `artifactRetentionPolicySpecSchema`

Runtime schema for Artifact Retention Policy Spec.

- Kind: constant
- Import: `import { artifactRetentionPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactRetentionPolicySpecSchema: z.ZodEffects<z.ZodObject<{ defaultTtlSeconds: z.ZodOptional<z.ZodNumber>; archiveAfterSeconds: z.ZodOptional<z.ZodNumber>; deleteAfterSeconds: z.ZodOptional<z.ZodNumber>; retainFinal: z.ZodOptional<z.ZodBoolean>; retainOnFailure: z.ZodOptional<z.ZodBoolean>; legalHoldSupported: z.ZodOptional<z.ZodBoolean>; garbageCollectUnreferenced: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { defaultTtlSeconds?: number | undefined; archiveAfterSeconds?: number | undefined; deleteAfterSeconds?: number | undefined; retainFinal?: boolean | undefined; retainOnFailure?: boolean | undefined; legalHoldSupported?: boolean | undefined; garbageCollectUnreferenced?: boolean | undefined; }, { defaultTtlSeconds?: number | undefined; archiveAfterSeconds?: number | undefined; deleteAfterSeconds?: number | undefined; retainFinal?: boolean | undefined; retainOnFailure?: boolean | undefined; legalHoldSupported?: boolean | undefined; garbageCollectUnreferenced?: boolean | undefined; }>, { defaultTtlSeconds?: number | undefined; archiveAfterSeconds?: number | undefined; deleteAfterSeconds?: number | undefined; retainFinal?: boolean | undefined; retainOnFailure?: boolean | undefined; legalHoldSupported?: boolean | undefined; garbageCollectUnreferenced?: boolean | undefined; }, { defaultTtlSeconds?: number | undefined; archiveAfterSeconds?: number | undefined; deleteAfterSeconds?: number | undefined; retainFinal?: boolean | undefined; retainOnFailure?: boolean | undefined; legalHoldSupported?: boolean | undefined; garbageCollectUnreferenced?: boolean | undefined; }>;
```

## `artifactRetentionRecordJsonSchema`

JSON Schema for Artifact Retention Record.

- Kind: constant
- Import: `import { artifactRetentionRecordJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactRetentionRecordJsonSchema: JsonSchema;
```

## `artifactRetentionRecordSchema`

Runtime schema for Artifact Retention Record.

- Kind: constant
- Import: `import { artifactRetentionRecordSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactRetentionRecordSchema: z.ZodObject<{ policyRef: z.ZodOptional<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>>; expiresAt: z.ZodOptional<z.ZodString>; archivedAt: z.ZodOptional<z.ZodString>; legalHold: z.ZodOptional<z.ZodBoolean>; referencedByCount: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { policyRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; expiresAt?: string | undefined; archivedAt?: string | undefined; legalHold?: boolean | undefined; referencedByCount?: number | undefined; }, { policyRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; expiresAt?: string | undefined; archivedAt?: string | undefined; legalHold?: boolean | undefined; referencedByCount?: number | undefined; }>;
```

## `artifactStatusSchema`

Runtime schema for Artifact Status.

- Kind: constant
- Import: `import { artifactStatusSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactStatusSchema: z.ZodEnum<["creating", "draft", "final", "archived", "invalidated", "deletion_pending", "deleted", "failed"]>;
```

## `artifactStorageRefJsonSchema`

JSON Schema for Artifact Storage Ref.

- Kind: constant
- Import: `import { artifactStorageRefJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactStorageRefJsonSchema: JsonSchema;
```

## `artifactStorageRefSchema`

Runtime schema for Artifact Storage Ref.

- Kind: constant
- Import: `import { artifactStorageRefSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactStorageRefSchema: z.ZodObject<{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional<z.ZodString>; objectKey: z.ZodString; versionId: z.ZodOptional<z.ZodString>; etag: z.ZodOptional<z.ZodString>; region: z.ZodOptional<z.ZodString>; encrypted: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }>;
```

## `artifactValidationPolicySpecJsonSchema`

JSON Schema for Artifact Validation Policy Spec.

- Kind: constant
- Import: `import { artifactValidationPolicySpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactValidationPolicySpecJsonSchema: JsonSchema;
```

## `artifactValidationPolicySpecSchema`

Runtime schema for Artifact Validation Policy Spec.

- Kind: constant
- Import: `import { artifactValidationPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactValidationPolicySpecSchema: z.ZodObject<{ verifyMimeType: z.ZodOptional<z.ZodBoolean>; verifyExtension: z.ZodOptional<z.ZodBoolean>; malwareScanRef: z.ZodOptional<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>>; archiveBombProtection: z.ZodOptional<z.ZodBoolean>; maxExpandedBytes: z.ZodOptional<z.ZodNumber>; checksumRequired: z.ZodOptional<z.ZodBoolean>; rejectExecutableUploads: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { verifyMimeType?: boolean | undefined; verifyExtension?: boolean | undefined; malwareScanRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; archiveBombProtection?: boolean | undefined; maxExpandedBytes?: number | undefined; checksumRequired?: boolean | undefined; rejectExecutableUploads?: boolean | undefined; }, { verifyMimeType?: boolean | undefined; verifyExtension?: boolean | undefined; malwareScanRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; archiveBombProtection?: boolean | undefined; maxExpandedBytes?: number | undefined; checksumRequired?: boolean | undefined; rejectExecutableUploads?: boolean | undefined; }>;
```

## `artifactVersioningPolicySpecJsonSchema`

JSON Schema for Artifact Versioning Policy Spec.

- Kind: constant
- Import: `import { artifactVersioningPolicySpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactVersioningPolicySpecJsonSchema: JsonSchema;
```

## `artifactVersioningPolicySpecSchema`

Runtime schema for Artifact Versioning Policy Spec.

- Kind: constant
- Import: `import { artifactVersioningPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare const artifactVersioningPolicySpecSchema: z.ZodObject<{ strategy: z.ZodLiteral<"append_only">; retainPreviousVersions: z.ZodLiteral<true>; maxVersions: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { strategy: "append_only"; retainPreviousVersions: true; maxVersions?: number | undefined; }, { strategy: "append_only"; retainPreviousVersions: true; maxVersions?: number | undefined; }>;
```

## `storedArtifactRecordSchema`

Runtime schema for Stored Artifact Record.

- Kind: constant
- Import: `import { storedArtifactRecordSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const storedArtifactRecordSchema: (typeof import('@codesoul-co/hypha-core'))['storedArtifactRecordSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `validateArtifactLineage`

Validate Artifact Lineage function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactLineage } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare function validateArtifactLineage(input: unknown): ArtifactLineage;
```

### Call signature

```text
validateArtifactLineage(input: unknown): ArtifactLineage
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactLineage`
- Description: The return contract is defined by the type shown above.

## `validateArtifactProfileSpec`

Validate Artifact Profile Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactProfileSpec } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare function validateArtifactProfileSpec(input: unknown): ArtifactProfileSpec;
```

### Call signature

```text
validateArtifactProfileSpec(input: unknown): ArtifactProfileSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactProfileSpec`
- Description: The return contract is defined by the type shown above.

## `validateArtifactRecord`

Validate Artifact Record function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactRecord } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare function validateArtifactRecord(input: unknown): ArtifactRecord;
```

### Call signature

```text
validateArtifactRecord(input: unknown): ArtifactRecord
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactRecord`
- Description: The return contract is defined by the type shown above.

## `validateArtifactRef`

Validate Artifact Ref function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactRef } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare function validateArtifactRef(input: unknown): ArtifactRef;
```

### Call signature

```text
validateArtifactRef(input: unknown): ArtifactRef
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactRef`
- Description: The return contract is defined by the type shown above.

## `validateStoredArtifactRecord`

Validate Stored Artifact Record function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateStoredArtifactRecord } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare function validateStoredArtifactRecord(input: unknown): StoredArtifactRecord;
```

### Call signature

```text
validateStoredArtifactRecord(input: unknown): StoredArtifactRecord
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StoredArtifactRecord`
- Description: The return contract is defined by the type shown above.

## `validateStoredArtifactRecords`

Validate Stored Artifact Records function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateStoredArtifactRecords } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/index.ts)

### Declaration

```text
export declare function validateStoredArtifactRecords(input: unknown): StoredArtifactRecord[];
```

### Call signature

```text
validateStoredArtifactRecords(input: unknown): StoredArtifactRecord[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StoredArtifactRecord[]`
- Description: The return contract is defined by the type shown above.
