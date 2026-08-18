# `@codesoul-co/hypha-memory` / `record-contract`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/record-contract.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)
- Exports: **14**

## Using this module

Use the Record contract module for declaring and runtime-validating contracts. It exports 13 constants, 1 function.

### Import from the package entrypoint

```ts
import {
  managedMemoryRecordExample,
  managedMemoryRecordSchema,
  managedMemoryScopeSchema,
  managedMemoryTypeSchema,
  memoryEntityRefSchema,
  memoryIndexStatusSchema,
  memoryPrincipalSchema,
  memoryProvenanceSchema,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 13 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { managedMemoryRecordSchema } from '@codesoul-co/hypha-memory';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = managedMemoryRecordSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `managedMemoryRecordExample` | constant | <code>const managedMemoryRecordExample: ManagedMemoryRecord&lt;unknown&gt;</code> | Valid example value for Managed Memory Record. |
| `managedMemoryRecordSchema` | constant | <code>const managedMemoryRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; revision: z.ZodNumber; type: z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "preference", "artifact", "governance", "reflection", "custom"]&gt;; subtype: z.ZodOptional&lt;z.ZodString&gt;; content: z.ZodUnknown; canonicalText: z.ZodOptional&lt;z.ZodString&gt;; summary: z.ZodOptional&lt;z.ZodString&gt;; language: z.ZodOption...</code> | Runtime schema for Managed Memory Record. |
| `managedMemoryScopeSchema` | constant | <code>const managedMemoryScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; projectId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { userId: string; workspaceId?: string &#124; undefined; s...</code> | Runtime schema for Managed Memory Scope. |
| `managedMemoryTypeSchema` | constant | <code>const managedMemoryTypeSchema: z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "preference", "artifact", "governance", "reflection", "custom"]&gt;</code> | Runtime schema for Managed Memory Type. |
| `memoryEntityRefSchema` | constant | <code>const memoryEntityRefSchema: z.ZodObject&lt;{ entityId: z.ZodString; label: z.ZodOptional&lt;z.ZodString&gt;; type: z.ZodOptional&lt;z.ZodString&gt;; confidence: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strip", z.ZodTypeAny, { entityId: string; type?: string &#124; undefined; confidence?: number &#124; undefined; label?: string &#124; undefined; }, { entityId: string; type?: string &#124; undefined; confidence?: number &#124; undefined; label?: string &#124; undefine...</code> | Runtime schema for Memory Entity Ref. |
| `memoryIndexStatusSchema` | constant | <code>const memoryIndexStatusSchema: z.ZodObject&lt;{ state: z.ZodEnum&lt;["none", "pending", "indexing", "indexed", "partial", "failed", "deleted"]&gt;; attempts: z.ZodNumber; lastAttemptAt: z.ZodOptional&lt;z.ZodString&gt;; lastError: z.ZodOptional&lt;z.ZodType&lt;NormalizedMemoryError, z.ZodTypeDef, NormalizedMemoryError&gt;&gt;; }, "strip", z.ZodTypeAny, { state: "none" &#124; "pending" &#124; "failed" &#124; "deleted" &#124; "partial" &#124; "indexing" &#124; "indexed"; ...</code> | Runtime schema for Memory Index Status. |
| `memoryPrincipalSchema` | constant | <code>const memoryPrincipalSchema: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "strip...</code> | Runtime schema for Memory Principal. |
| `memoryProvenanceSchema` | constant | <code>const memoryProvenanceSchema: z.ZodObject&lt;{ createdBy: z.ZodString; providerId: z.ZodString; extractorVersion: z.ZodOptional&lt;z.ZodString&gt;; sourceEventIds: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; sourceMemoryIds: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; transformation: z.ZodOptional&lt;z.ZodString&gt;; humanDecisionId: z.ZodOptional&lt;z.ZodString&gt;; createdAt: z.ZodString; metadata: z.ZodOptional&lt;z.ZodRecord&lt;...</code> | Runtime schema for Memory Provenance. |
| `memoryRelationSchema` | constant | <code>const memoryRelationSchema: z.ZodObject&lt;{ type: z.ZodEnum&lt;["supports", "contradicts", "supersedes", "derived_from", "related_to", "same_as", "part_of"]&gt;; targetMemoryId: z.ZodString; confidence: z.ZodOptional&lt;z.ZodNumber&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "strip", z.ZodTypeAny, { type: "supersedes" &#124; "supports" &#124; "contradicts" &#124; "derived_from" &#124; "related_to" &#124; "same_as" &#124; "part_o...</code> | Runtime schema for Memory Relation. |
| `memorySourceSchema` | constant | <code>const memorySourceSchema: z.ZodObject&lt;{ type: z.ZodEnum&lt;["user_message", "assistant_message", "tool_result", "artifact", "workflow_state", "human_review", "import", "derived", "system"]&gt;; sourceId: z.ZodOptional&lt;z.ZodString&gt;; sourceEventId: z.ZodOptional&lt;z.ZodString&gt;; sourceRunId: z.ZodOptional&lt;z.ZodString&gt;; sourceMessageId: z.ZodOptional&lt;z.ZodString&gt;; sourceArtifactId: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.Zo...</code> | Runtime schema for Memory Source. |
| `memoryStatusSchema` | constant | <code>const memoryStatusSchema: z.ZodEnum&lt;["pending", "active", "dormant", "superseded", "invalidated", "deletion_pending", "deleted", "failed"]&gt;</code> | Runtime schema for Memory Status. |
| `memoryVectorRefSchema` | constant | <code>const memoryVectorRefSchema: z.ZodObject&lt;{ vectorStoreId: z.ZodString; indexName: z.ZodString; vectorId: z.ZodString; embeddingProviderId: z.ZodString; embeddingModel: z.ZodString; embeddingRevision: z.ZodOptional&lt;z.ZodString&gt;; dimensions: z.ZodOptional&lt;z.ZodNumber&gt;; indexedAt: z.ZodString; }, "strip", z.ZodTypeAny, { vectorStoreId: string; indexName: string; vectorId: string; embeddingProviderId: string; embeddin...</code> | Runtime schema for Memory Vector Ref. |
| `normalizedMemoryErrorSchema` | constant | <code>const normalizedMemoryErrorSchema: z.ZodType&lt;NormalizedMemoryError, z.ZodTypeDef, NormalizedMemoryError&gt;</code> | Runtime schema for Normalized Memory Error. |
| `validateManagedMemoryRecord` | function | <code>validateManagedMemoryRecord(input: unknown): ManagedMemoryRecord</code> | Validate Managed Memory Record function with 1 public call signature; parameters and return types are listed below. |

## `managedMemoryRecordExample`

Valid example value for Managed Memory Record.

- Kind: constant
- Import: `import { managedMemoryRecordExample } from '@codesoul-co/hypha-memory';`
- Source module: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### Declaration

```text
export declare const managedMemoryRecordExample: ManagedMemoryRecord<unknown>;
```

## `managedMemoryRecordSchema`

Runtime schema for Managed Memory Record.

- Kind: constant
- Import: `import { managedMemoryRecordSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const managedMemoryRecordSchema: (typeof import('@codesoul-co/hypha-memory'))['managedMemoryRecordSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `managedMemoryScopeSchema`

Runtime schema for Managed Memory Scope.

- Kind: constant
- Import: `import { managedMemoryScopeSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### Declaration

```text
export declare const managedMemoryScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; projectId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; runId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; domainPackId: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { userId: string; workspaceId?: string | undefined; sessionId?: string | undefined; runId?: string | undefined; tenantId?: string | undefined; projectId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }, { userId: string; workspaceId?: string | undefined; sessionId?: string | undefined; runId?: string | undefined; tenantId?: string | undefined; projectId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }>;
```

## `managedMemoryTypeSchema`

Runtime schema for Managed Memory Type.

- Kind: constant
- Import: `import { managedMemoryTypeSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### Declaration

```text
export declare const managedMemoryTypeSchema: z.ZodEnum<["working", "episodic", "semantic", "procedural", "preference", "artifact", "governance", "reflection", "custom"]>;
```

## `memoryEntityRefSchema`

Runtime schema for Memory Entity Ref.

- Kind: constant
- Import: `import { memoryEntityRefSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### Declaration

```text
export declare const memoryEntityRefSchema: z.ZodObject<{ entityId: z.ZodString; label: z.ZodOptional<z.ZodString>; type: z.ZodOptional<z.ZodString>; confidence: z.ZodOptional<z.ZodNumber>; }, "strip", z.ZodTypeAny, { entityId: string; type?: string | undefined; confidence?: number | undefined; label?: string | undefined; }, { entityId: string; type?: string | undefined; confidence?: number | undefined; label?: string | undefined; }>;
```

## `memoryIndexStatusSchema`

Runtime schema for Memory Index Status.

- Kind: constant
- Import: `import { memoryIndexStatusSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### Declaration

```text
export declare const memoryIndexStatusSchema: z.ZodObject<{ state: z.ZodEnum<["none", "pending", "indexing", "indexed", "partial", "failed", "deleted"]>; attempts: z.ZodNumber; lastAttemptAt: z.ZodOptional<z.ZodString>; lastError: z.ZodOptional<z.ZodType<NormalizedMemoryError, z.ZodTypeDef, NormalizedMemoryError>>; }, "strip", z.ZodTypeAny, { state: "none" | "pending" | "failed" | "deleted" | "partial" | "indexing" | "indexed"; attempts: number; lastError?: NormalizedMemoryError | undefined; lastAttemptAt?: string | undefined; }, { state: "none" | "pending" | "failed" | "deleted" | "partial" | "indexing" | "indexed"; attempts: number; lastError?: NormalizedMemoryError | undefined; lastAttemptAt?: string | undefined; }>;
```

## `memoryPrincipalSchema`

Runtime schema for Memory Principal.

- Kind: constant
- Import: `import { memoryPrincipalSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### Declaration

```text
export declare const memoryPrincipalSchema: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { type: "system" | "user" | "agent" | "service"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; userId?: string | undefined; tenantId?: string | undefined; agentId?: string | undefined; roles?: string[] | undefined; }, { type: "system" | "user" | "agent" | "service"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; userId?: string | undefined; tenantId?: string | undefined; agentId?: string | undefined; roles?: string[] | undefined; }>;
```

## `memoryProvenanceSchema`

Runtime schema for Memory Provenance.

- Kind: constant
- Import: `import { memoryProvenanceSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### Declaration

```text
export declare const memoryProvenanceSchema: z.ZodObject<{ createdBy: z.ZodString; providerId: z.ZodString; extractorVersion: z.ZodOptional<z.ZodString>; sourceEventIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; sourceMemoryIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; transformation: z.ZodOptional<z.ZodString>; humanDecisionId: z.ZodOptional<z.ZodString>; createdAt: z.ZodString; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { createdAt: string; providerId: string; createdBy: string; metadata?: Record<string, unknown> | undefined; extractorVersion?: string | undefined; sourceEventIds?: string[] | undefined; sourceMemoryIds?: string[] | undefined; transformation?: string | undefined; humanDecisionId?: string | undefined; }, { createdAt: string; providerId: string; createdBy: string; metadata?: Record<string, unknown> | undefined; extractorVersion?: string | undefined; sourceEventIds?: string[] | undefined; sourceMemoryIds?: string[] | undefined; transformation?: string | undefined; humanDecisionId?: string | undefined; }>;
```

## `memoryRelationSchema`

Runtime schema for Memory Relation.

- Kind: constant
- Import: `import { memoryRelationSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### Declaration

```text
export declare const memoryRelationSchema: z.ZodObject<{ type: z.ZodEnum<["supports", "contradicts", "supersedes", "derived_from", "related_to", "same_as", "part_of"]>; targetMemoryId: z.ZodString; confidence: z.ZodOptional<z.ZodNumber>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { type: "supersedes" | "supports" | "contradicts" | "derived_from" | "related_to" | "same_as" | "part_of"; targetMemoryId: string; metadata?: Record<string, unknown> | undefined; confidence?: number | undefined; }, { type: "supersedes" | "supports" | "contradicts" | "derived_from" | "related_to" | "same_as" | "part_of"; targetMemoryId: string; metadata?: Record<string, unknown> | undefined; confidence?: number | undefined; }>;
```

## `memorySourceSchema`

Runtime schema for Memory Source.

- Kind: constant
- Import: `import { memorySourceSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### Declaration

```text
export declare const memorySourceSchema: z.ZodObject<{ type: z.ZodEnum<["user_message", "assistant_message", "tool_result", "artifact", "workflow_state", "human_review", "import", "derived", "system"]>; sourceId: z.ZodOptional<z.ZodString>; sourceEventId: z.ZodOptional<z.ZodString>; sourceRunId: z.ZodOptional<z.ZodString>; sourceMessageId: z.ZodOptional<z.ZodString>; sourceArtifactId: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { type: "artifact" | "human_review" | "user_message" | "assistant_message" | "tool_result" | "workflow_state" | "import" | "derived" | "system"; sourceId?: string | undefined; sourceEventId?: string | undefined; sourceRunId?: string | undefined; sourceMessageId?: string | undefined; sourceArtifactId?: string | undefined; }, { type: "artifact" | "human_review" | "user_message" | "assistant_message" | "tool_result" | "workflow_state" | "import" | "derived" | "system"; sourceId?: string | undefined; sourceEventId?: string | undefined; sourceRunId?: string | undefined; sourceMessageId?: string | undefined; sourceArtifactId?: string | undefined; }>;
```

## `memoryStatusSchema`

Runtime schema for Memory Status.

- Kind: constant
- Import: `import { memoryStatusSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### Declaration

```text
export declare const memoryStatusSchema: z.ZodEnum<["pending", "active", "dormant", "superseded", "invalidated", "deletion_pending", "deleted", "failed"]>;
```

## `memoryVectorRefSchema`

Runtime schema for Memory Vector Ref.

- Kind: constant
- Import: `import { memoryVectorRefSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### Declaration

```text
export declare const memoryVectorRefSchema: z.ZodObject<{ vectorStoreId: z.ZodString; indexName: z.ZodString; vectorId: z.ZodString; embeddingProviderId: z.ZodString; embeddingModel: z.ZodString; embeddingRevision: z.ZodOptional<z.ZodString>; dimensions: z.ZodOptional<z.ZodNumber>; indexedAt: z.ZodString; }, "strip", z.ZodTypeAny, { vectorStoreId: string; indexName: string; vectorId: string; embeddingProviderId: string; embeddingModel: string; indexedAt: string; embeddingRevision?: string | undefined; dimensions?: number | undefined; }, { vectorStoreId: string; indexName: string; vectorId: string; embeddingProviderId: string; embeddingModel: string; indexedAt: string; embeddingRevision?: string | undefined; dimensions?: number | undefined; }>;
```

## `normalizedMemoryErrorSchema`

Runtime schema for Normalized Memory Error.

- Kind: constant
- Import: `import { normalizedMemoryErrorSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### Declaration

```text
export declare const normalizedMemoryErrorSchema: z.ZodType<NormalizedMemoryError, z.ZodTypeDef, NormalizedMemoryError>;
```

## `validateManagedMemoryRecord`

Validate Managed Memory Record function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateManagedMemoryRecord } from '@codesoul-co/hypha-memory';`
- Source module: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### Declaration

```text
export declare function validateManagedMemoryRecord(input: unknown): ManagedMemoryRecord;
```

### Call signature

```text
validateManagedMemoryRecord(input: unknown): ManagedMemoryRecord
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ManagedMemoryRecord<unknown>`
- Description: The return contract is defined by the type shown above.
