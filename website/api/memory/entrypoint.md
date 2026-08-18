# `@codesoul-co/hypha-memory` / `index`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)
- Exports: **40**

## Using this module

Aggregates the public entrypoint exports for `@codesoul-co/hypha-memory`; applications import these symbols from the package entrypoint instead of internal file paths.

### Import from the package entrypoint

```ts
import {
  MemoryManager,
  memoryProviderProfileSchema,
  memoryRetrievalPolicySchema,
  memorySpecDefinition,
  memorySpecDefinitions,
  memorySpecExample,
  memorySpecJsonSchema,
  memorySpecJsonSchemas,
} from '@codesoul-co/hypha-memory';

import type {
  ArtifactMeta,
  ArtifactRef,
  ArtifactStoreProvider,
  EmbeddingProvider,
  MemoryAuditOptions,
  MemoryAuditReport,
  MemoryManagerOptions,
  MemoryManagerRecoveryOptions,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- Use the 29 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 9 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { memoryProviderProfileSchema } from '@codesoul-co/hypha-memory';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = memoryProviderProfileSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryManager` | class | <code>new MemoryManager(provider: MemoryProvider &#124; MemoryManagementProvider, options?: MemoryManagerOptions): MemoryManager</code> | Memory Manager class with 16 public constructor or member entries; its exact declarations are listed below. |
| `memoryProviderProfileSchema` | constant | <code>const memoryProviderProfileSchema: z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["structured", "vector", "artifact", "hybrid"]&gt;; providerRef: z.ZodString; configSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;; }, "strip", z.ZodTypeAny, { id: string; type: "artifact" &#124; "structured" &#124; "vector" &#124; "hybrid"; providerRef: string; configSchema?: JsonSchema &#124; undefined; }, { id: string; type: "art...</code> | Runtime schema for Memory Provider Profile. |
| `memoryRetrievalPolicySchema` | constant | <code>const memoryRetrievalPolicySchema: z.ZodObject&lt;{ defaultTopK: z.ZodOptional&lt;z.ZodNumber&gt;; vectorWeight: z.ZodOptional&lt;z.ZodNumber&gt;; textWeight: z.ZodOptional&lt;z.ZodNumber&gt;; requireScope: z.ZodOptional&lt;z.ZodBoolean&gt;; allowedTypes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "artifact", "governance"]&gt;, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { defaultTopK?: number &#124; undefined; vec...</code> | Runtime schema for Memory Retrieval Policy. |
| `memorySpecDefinition` | constant | <code>const memorySpecDefinition: SpecSchemaDefinition&lt;MemorySpec&gt;</code> | Runtime validation entrypoint for the Memory spec, combining its parser, example and JSON Schema. |
| `memorySpecDefinitions` | constant | <code>const memorySpecDefinitions: readonly [SpecSchemaDefinition&lt;MemorySpec&gt;]</code> | Memory Spec Definitions constant exported by the `index` module. |
| `memorySpecExample` | constant | <code>const memorySpecExample: MemorySpec</code> | Valid example value for Memory Spec. |
| `memorySpecJsonSchema` | constant | <code>const memorySpecJsonSchema: JsonSchema</code> | JSON Schema for Memory Spec. |
| `memorySpecJsonSchemas` | constant | <code>const memorySpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Memory Spec JSON Schemas constant exported by the `index` module. |
| `memorySpecSchema` | constant | <code>const memorySpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { providers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["structured", "v...</code> | Runtime schema for Memory Spec. |
| `memoryTypeSchema` | constant | <code>const memoryTypeSchema: z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "artifact", "governance"]&gt;</code> | Runtime schema for Memory Type. |
| `validateMemorySpec` | function | <code>validateMemorySpec(input: unknown): MemorySpec</code> | Validate Memory Spec function with 1 public call signature; parameters and return types are listed below. |
| `ArtifactMeta` | interface | <code>interface ArtifactMeta</code> | Artifact Meta interface with 4 public fields or methods. |
| `ArtifactRef` | interface | <code>interface ArtifactRef</code> | Artifact Ref interface with 3 public fields or methods. |
| `ArtifactStoreProvider` | interface | <code>interface ArtifactStoreProvider</code> | Artifact Store Provider interface with 3 public fields or methods. |
| `EmbeddingProvider` | interface | <code>interface EmbeddingProvider</code> | Embedding Provider interface with 1 public fields or methods. |
| `MemoryAuditOptions` | interface | <code>interface MemoryAuditOptions</code> | Memory Audit Options interface with 2 public fields or methods. |
| `MemoryAuditReport` | interface | <code>interface MemoryAuditReport</code> | Memory Audit Report interface with 3 public fields or methods. |
| `MemoryManagerOptions` | interface | <code>interface MemoryManagerOptions</code> | Memory Manager Options interface with 4 public fields or methods. |
| `MemoryManagerRecoveryOptions` | interface | <code>interface MemoryManagerRecoveryOptions</code> | Memory Manager Recovery Options interface with 5 public fields or methods. |
| `MemoryProvider` | interface | <code>interface MemoryProvider</code> | Memory Provider interface with 7 public fields or methods. |
| `MemoryProviderProfile` | interface | <code>interface MemoryProviderProfile</code> | Memory Provider Profile interface with 4 public fields or methods. |
| `MemoryReadQuery` | interface | <code>interface MemoryReadQuery</code> | Memory Read Query interface with 3 public fields or methods. |
| `MemoryRecord` | interface | <code>interface MemoryRecord</code> | Memory Record interface with 10 public fields or methods. |
| `MemoryRetrievalPolicy` | interface | <code>interface MemoryRetrievalPolicy</code> | Memory Retrieval Policy interface with 5 public fields or methods. |
| `MemoryScope` | interface | <code>interface MemoryScope</code> | Memory Scope interface with 4 public fields or methods. |
| `MemorySearchQuery` | interface | <code>interface MemorySearchQuery</code> | Memory Search Query interface with 4 public fields or methods. |
| `MemorySearchResult` | interface | <code>interface MemorySearchResult</code> | Memory Search Result interface with 3 public fields or methods. |
| `MemorySpec` | interface | <code>interface MemorySpec extends VersionedSpec, SpecMetadata</code> | Memory Spec interface with 23 public fields or methods. |
| `MemorySummary` | interface | <code>interface MemorySummary</code> | Memory Summary interface with 3 public fields or methods. |
| `MemorySummaryOptions` | interface | <code>interface MemorySummaryOptions</code> | Memory Summary Options interface with 2 public fields or methods. |
| `MemoryTraceContext` | interface | <code>interface MemoryTraceContext</code> | Memory Trace Context interface with 7 public fields or methods. |
| `MemoryWritePolicy` | interface | <code>interface MemoryWritePolicy</code> | Memory Write Policy interface with 4 public fields or methods. |
| `MemoryWriteResult` | interface | <code>interface MemoryWriteResult</code> | Memory Write Result interface with 3 public fields or methods. |
| `StructuredQuery` | interface | <code>interface StructuredQuery</code> | Structured Query interface with 3 public fields or methods. |
| `StructuredStoreProvider` | interface | <code>interface StructuredStoreProvider</code> | Structured Store Provider interface with 7 public fields or methods. |
| `VectorIndexProvider` | interface | <code>interface VectorIndexProvider</code> | Vector Index Provider interface with 3 public fields or methods. |
| `VectorQuery` | interface | <code>interface VectorQuery</code> | Vector Query interface with 3 public fields or methods. |
| `VectorRecord` | interface | <code>interface VectorRecord</code> | Vector Record interface with 3 public fields or methods. |
| `VectorSearchResult` | interface | <code>interface VectorSearchResult</code> | Vector Search Result interface with 3 public fields or methods. |
| `MemoryType` | type | <code>type MemoryType = 'working' &#124; 'episodic' &#124; 'semantic' &#124; 'procedural' &#124; 'artifact' &#124; 'governance'</code> | Public type alias for Memory Type; the declaration contains its complete type expression. |

## `MemoryManager`

Memory Manager class with 16 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryManager } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export declare class MemoryManager {
    constructor(provider: MemoryProvider | MemoryManagementProvider, options?: MemoryManagerOptions);
    capabilities(): Promise<MemoryManagementCapabilities>;
    add(request: MemoryAddRequest): Promise<ManagedMemoryWriteResult>;
    read(scope: MemoryScope, query: MemoryReadQuery): Promise<MemoryRecord[]>;
    search(scope: MemoryScope, query: MemorySearchQuery): Promise<MemorySearchResult[]>;
    search(request: ManagedMemorySearchRequest): Promise<ManagedMemorySearchResult[]>;
    write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise<MemoryWriteResult>;
    update(scope: MemoryScope, recordId: string, patch: Partial<MemoryRecord>): Promise<void>;
    update(request: ManagedMemoryUpdateRequest): Promise<ManagedMemoryWriteResult>;
    get(request: MemoryGetRequest): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest): Promise<MemoryListResult>;
    delete(request: ManagedMemoryDeleteRequest): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest): Promise<MemoryVersion[]>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
    invalidate(scope: MemoryScope, recordId: string, reason: string): Promise<void>;
    summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise<MemorySummary>;
    audit(scope: MemoryScope, options?: MemoryAuditOptions): Promise<MemoryAuditReport>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `audit` | method | <code>audit(scope: MemoryScope, options?: MemoryAuditOptions): Promise&lt;MemoryAuditReport&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(provider: MemoryProvider &#124; MemoryManagementProvider, options?: MemoryManagerOptions): MemoryManager</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidate` | method | <code>invalidate(scope: MemoryScope, recordId: string, reason: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `read` | method | <code>read(scope: MemoryScope, query: MemoryReadQuery): Promise&lt;MemoryRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(scope: MemoryScope, query: MemorySearchQuery): Promise&lt;MemorySearchResult[]&gt; &#124; search(request: ManagedMemorySearchRequest): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `summarize` | method | <code>summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise&lt;MemorySummary&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(scope: MemoryScope, recordId: string, patch: Partial&lt;MemoryRecord&gt;): Promise&lt;void&gt; &#124; update(request: ManagedMemoryUpdateRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `write` | method | <code>write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise&lt;MemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `memoryProviderProfileSchema`

Runtime schema for Memory Provider Profile.

- Kind: constant
- Import: `import { memoryProviderProfileSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export declare const memoryProviderProfileSchema: z.ZodObject<{ id: z.ZodString; type: z.ZodEnum<["structured", "vector", "artifact", "hybrid"]>; providerRef: z.ZodString; configSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; }, "strip", z.ZodTypeAny, { id: string; type: "artifact" | "structured" | "vector" | "hybrid"; providerRef: string; configSchema?: JsonSchema | undefined; }, { id: string; type: "artifact" | "structured" | "vector" | "hybrid"; providerRef: string; configSchema?: JsonSchema | undefined; }>;
```

## `memoryRetrievalPolicySchema`

Runtime schema for Memory Retrieval Policy.

- Kind: constant
- Import: `import { memoryRetrievalPolicySchema } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export declare const memoryRetrievalPolicySchema: z.ZodObject<{ defaultTopK: z.ZodOptional<z.ZodNumber>; vectorWeight: z.ZodOptional<z.ZodNumber>; textWeight: z.ZodOptional<z.ZodNumber>; requireScope: z.ZodOptional<z.ZodBoolean>; allowedTypes: z.ZodOptional<z.ZodArray<z.ZodEnum<["working", "episodic", "semantic", "procedural", "artifact", "governance"]>, "many">>; }, "strip", z.ZodTypeAny, { defaultTopK?: number | undefined; vectorWeight?: number | undefined; textWeight?: number | undefined; requireScope?: boolean | undefined; allowedTypes?: ("working" | "episodic" | "semantic" | "procedural" | "artifact" | "governance")[] | undefined; }, { defaultTopK?: number | undefined; vectorWeight?: number | undefined; textWeight?: number | undefined; requireScope?: boolean | undefined; allowedTypes?: ("working" | "episodic" | "semantic" | "procedural" | "artifact" | "governance")[] | undefined; }>;
```

## `memorySpecDefinition`

Runtime validation entrypoint for the Memory spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { memorySpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export declare const memorySpecDefinition: SpecSchemaDefinition<MemorySpec>;
```

## `memorySpecDefinitions`

Memory Spec Definitions constant exported by the `index` module.

- Kind: constant
- Import: `import { memorySpecDefinitions } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export declare const memorySpecDefinitions: readonly [SpecSchemaDefinition<MemorySpec>];
```

## `memorySpecExample`

Valid example value for Memory Spec.

- Kind: constant
- Import: `import { memorySpecExample } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export declare const memorySpecExample: MemorySpec;
```

## `memorySpecJsonSchema`

JSON Schema for Memory Spec.

- Kind: constant
- Import: `import { memorySpecJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export declare const memorySpecJsonSchema: JsonSchema;
```

## `memorySpecJsonSchemas`

Memory Spec JSON Schemas constant exported by the `index` module.

- Kind: constant
- Import: `import { memorySpecJsonSchemas } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export declare const memorySpecJsonSchemas: Record<string, JsonSchema>;
```

## `memorySpecSchema`

Runtime schema for Memory Spec.

- Kind: constant
- Import: `import { memorySpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const memorySpecSchema: (typeof import('@codesoul-co/hypha-memory'))['memorySpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `memoryTypeSchema`

Runtime schema for Memory Type.

- Kind: constant
- Import: `import { memoryTypeSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export declare const memoryTypeSchema: z.ZodEnum<["working", "episodic", "semantic", "procedural", "artifact", "governance"]>;
```

## `validateMemorySpec`

Validate Memory Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemorySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export declare function validateMemorySpec(input: unknown): MemorySpec;
```

### Call signature

```text
validateMemorySpec(input: unknown): MemorySpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemorySpec`
- Description: The return contract is defined by the type shown above.

## `ArtifactMeta`

Artifact Meta interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactMeta } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface ArtifactMeta {
    contentType?: string;
    sizeBytes?: number;
    hash?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentType` | property | <code>contentType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hash` | property | <code>hash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactRef`

Artifact Ref interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactRef } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface ArtifactRef {
    id: string;
    path: string;
    meta?: ArtifactMeta;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `meta` | property | <code>meta?: ArtifactMeta</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `path` | property | <code>path: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactStoreProvider`

Artifact Store Provider interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactStoreProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface ArtifactStoreProvider {
    put(path: string, content: Buffer | string, meta?: ArtifactMeta): Promise<ArtifactRef>;
    get(ref: ArtifactRef): Promise<Buffer>;
    delete(ref: ArtifactRef): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(ref: ArtifactRef): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(ref: ArtifactRef): Promise&lt;Buffer&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(path: string, content: Buffer &#124; string, meta?: ArtifactMeta): Promise&lt;ArtifactRef&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `EmbeddingProvider`

Embedding Provider interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { EmbeddingProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface EmbeddingProvider {
    embed(input: string[]): Promise<number[][]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `embed` | method | <code>embed(input: string[]): Promise&lt;number[][]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryAuditOptions`

Memory Audit Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryAuditOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemoryAuditOptions {
    since?: string;
    until?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `since` | property | <code>since?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `until` | property | <code>until?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryAuditReport`

Memory Audit Report interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryAuditReport } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemoryAuditReport {
    scope: MemoryScope;
    recordsChecked: number;
    missingProvenance: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `missingProvenance` | property | <code>missingProvenance: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordsChecked` | property | <code>recordsChecked: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: MemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryManagerOptions`

Memory Manager Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryManagerOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemoryManagerOptions {
    trace?: TraceRecorder;
    traceContext?: MemoryTraceContext;
    now?: () => string;
    recovery?: MemoryManagerRecoveryOptions;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `recovery` | property | <code>recovery?: MemoryManagerRecoveryOptions</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trace` | property | <code>trace?: TraceRecorder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceContext` | property | <code>traceContext?: MemoryTraceContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryManagerRecoveryOptions`

Memory Manager Recovery Options interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryManagerRecoveryOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemoryManagerRecoveryOptions {
    providerId?: string;
    providerRevision?: string;
    specRevision?: string;
    policyRevision?: string;
    onFailure?: (failure: RecoveryFailure) => void | Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `onFailure` | method | <code>onFailure?(failure: RecoveryFailure): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `policyRevision` | property | <code>policyRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `specRevision` | property | <code>specRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProvider`

Memory Provider interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemoryProvider {
    read(scope: MemoryScope, query: MemoryReadQuery): Promise<MemoryRecord[]>;
    search(scope: MemoryScope, query: MemorySearchQuery): Promise<MemorySearchResult[]>;
    write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise<MemoryWriteResult>;
    update(scope: MemoryScope, recordId: string, patch: Partial<MemoryRecord>): Promise<void>;
    invalidate(scope: MemoryScope, recordId: string, reason: string): Promise<void>;
    summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise<MemorySummary>;
    audit(scope: MemoryScope, options?: MemoryAuditOptions): Promise<MemoryAuditReport>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `audit` | method | <code>audit(scope: MemoryScope, options?: MemoryAuditOptions): Promise&lt;MemoryAuditReport&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidate` | method | <code>invalidate(scope: MemoryScope, recordId: string, reason: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `read` | method | <code>read(scope: MemoryScope, query: MemoryReadQuery): Promise&lt;MemoryRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(scope: MemoryScope, query: MemorySearchQuery): Promise&lt;MemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `summarize` | method | <code>summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise&lt;MemorySummary&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(scope: MemoryScope, recordId: string, patch: Partial&lt;MemoryRecord&gt;): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `write` | method | <code>write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise&lt;MemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryProviderProfile`

Memory Provider Profile interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProviderProfile } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemoryProviderProfile {
    id: string;
    type: 'structured' | 'vector' | 'artifact' | 'hybrid';
    providerRef: string;
    configSchema?: JsonSchema;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `configSchema` | property | <code>configSchema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRef` | property | <code>providerRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "artifact" &#124; "structured" &#124; "vector" &#124; "hybrid"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryReadQuery`

Memory Read Query interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryReadQuery } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemoryReadQuery {
    ids?: string[];
    type?: MemoryType;
    limit?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ids` | property | <code>ids?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `limit` | property | <code>limit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type?: MemoryType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRecord`

Memory Record interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRecord } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemoryRecord<TValue = unknown> {
    id: string;
    type: MemoryType;
    value: TValue;
    source?: string;
    confidence?: number;
    provenance: Record<string, unknown>;
    visibility?: 'private' | 'workspace' | 'public';
    expiresAt?: string;
    createdAt: string;
    updatedAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `confidence` | property | <code>confidence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: MemoryType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `value` | property | <code>value: TValue</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `visibility` | property | <code>visibility?: "workspace" &#124; "private" &#124; "public"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRetrievalPolicy`

Memory Retrieval Policy interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRetrievalPolicy } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemoryRetrievalPolicy {
    defaultTopK?: number;
    vectorWeight?: number;
    textWeight?: number;
    requireScope?: boolean;
    allowedTypes?: MemoryType[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedTypes` | property | <code>allowedTypes?: MemoryType[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultTopK` | property | <code>defaultTopK?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireScope` | property | <code>requireScope?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `textWeight` | property | <code>textWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vectorWeight` | property | <code>vectorWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryScope`

Memory Scope interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryScope } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemoryScope {
    workspaceId?: string;
    sessionId?: string;
    runId?: string;
    userId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemorySearchQuery`

Memory Search Query interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemorySearchQuery } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemorySearchQuery {
    text?: string;
    vector?: number[];
    type?: MemoryType;
    topK?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `text` | property | <code>text?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `topK` | property | <code>topK?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type?: MemoryType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vector` | property | <code>vector?: number[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemorySearchResult`

Memory Search Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemorySearchResult } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemorySearchResult {
    record: MemoryRecord;
    score?: number;
    provenance: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `provenance` | property | <code>provenance: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `record` | property | <code>record: MemoryRecord&lt;unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `score` | property | <code>score?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemorySpec`

Memory Spec interface with 23 public fields or methods.

- Kind: interface
- Import: `import type { MemorySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemorySpec extends VersionedSpec, SpecMetadata {
    providers: MemoryProviderProfile[];
    memoryTypes: MemoryType[];
    structuredStoreRef?: string;
    vectorIndexRef?: string;
    artifactStoreRef?: string;
    embeddingProviderRef?: string;
    readPolicy?: string;
    writePolicy?: string;
    freshnessPolicy?: string;
    provenancePolicy?: 'required' | 'best_effort';
    retentionPolicy?: string;
    privacyPolicy?: string;
    retrievalStrategy?: string;
    retrievalPolicy?: MemoryRetrievalPolicy;
    writePolicyConfig?: MemoryWritePolicy;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactStoreRef` | property | <code>artifactStoreRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `embeddingProviderRef` | property | <code>embeddingProviderRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `freshnessPolicy` | property | <code>freshnessPolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryTypes` | property | <code>memoryTypes: MemoryType[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `privacyPolicy` | property | <code>privacyPolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenancePolicy` | property | <code>provenancePolicy?: "required" &#124; "best_effort"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providers` | property | <code>providers: MemoryProviderProfile[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `readPolicy` | property | <code>readPolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retentionPolicy` | property | <code>retentionPolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retrievalPolicy` | property | <code>retrievalPolicy?: MemoryRetrievalPolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retrievalStrategy` | property | <code>retrievalStrategy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `structuredStoreRef` | property | <code>structuredStoreRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vectorIndexRef` | property | <code>vectorIndexRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `writePolicy` | property | <code>writePolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `writePolicyConfig` | property | <code>writePolicyConfig?: MemoryWritePolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemorySummary`

Memory Summary interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemorySummary } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemorySummary {
    scope: MemoryScope;
    recordCount: number;
    types: Partial<Record<MemoryType, number>>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `recordCount` | property | <code>recordCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: MemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `types` | property | <code>types: Partial&lt;Record&lt;MemoryType, number&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemorySummaryOptions`

Memory Summary Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemorySummaryOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemorySummaryOptions {
    type?: MemoryType;
    limit?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `limit` | property | <code>limit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type?: MemoryType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryTraceContext`

Memory Trace Context interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemoryTraceContext } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemoryTraceContext {
    runId?: string;
    stepId?: string;
    sessionId?: string;
    userId?: string;
    agentId?: string;
    workspaceId?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryWritePolicy`

Memory Write Policy interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryWritePolicy } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemoryWritePolicy {
    allowLongTerm?: boolean;
    requireProvenance?: boolean;
    decision?: PolicyDecision;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowLongTerm` | property | <code>allowLongTerm?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decision` | property | <code>decision?: PolicyDecision</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireProvenance` | property | <code>requireProvenance?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryWriteResult`

Memory Write Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryWriteResult } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface MemoryWriteResult {
    recordId: string;
    vectorIndexed?: boolean;
    artifactRef?: ArtifactRef;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef?: ArtifactRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordId` | property | <code>recordId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vectorIndexed` | property | <code>vectorIndexed?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StructuredQuery`

Structured Query interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { StructuredQuery } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface StructuredQuery {
    where?: Record<string, unknown>;
    limit?: number;
    orderBy?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `limit` | property | <code>limit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `orderBy` | property | <code>orderBy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `where` | property | <code>where?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StructuredStoreProvider`

Structured Store Provider interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { StructuredStoreProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface StructuredStoreProvider {
    get<T>(table: string, id: string): Promise<T | null>;
    insert<T extends {
        id: string;
    }>(table: string, record: T): Promise<void>;
    update<T>(table: string, id: string, patch: Partial<T>): Promise<void>;
    compareAndSet?<T>(table: string, id: string, expected: Partial<T>, patch: Partial<T>): Promise<boolean>;
    delete(table: string, id: string): Promise<void>;
    query<T>(table: string, query: StructuredQuery): Promise<T[]>;
    transaction<T>(fn: (tx: StructuredStoreProvider) => Promise<T>): Promise<T>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compareAndSet` | method | <code>compareAndSet?&lt;T&gt;(table: string, id: string, expected: Partial&lt;T&gt;, patch: Partial&lt;T&gt;): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `delete` | method | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `insert` | method | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `query` | method | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `VectorIndexProvider`

Vector Index Provider interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { VectorIndexProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface VectorIndexProvider {
    upsert(records: VectorRecord[]): Promise<void>;
    search(query: VectorQuery): Promise<VectorSearchResult[]>;
    delete(ids: string[]): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(ids: string[]): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(query: VectorQuery): Promise&lt;VectorSearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `upsert` | method | <code>upsert(records: VectorRecord[]): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `VectorQuery`

Vector Query interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { VectorQuery } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface VectorQuery {
    vector: number[];
    topK: number;
    filter?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filter` | property | <code>filter?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `topK` | property | <code>topK: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vector` | property | <code>vector: number[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `VectorRecord`

Vector Record interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { VectorRecord } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface VectorRecord {
    id: string;
    vector: number[];
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vector` | property | <code>vector: number[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `VectorSearchResult`

Vector Search Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { VectorSearchResult } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export interface VectorSearchResult {
    id: string;
    score: number;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `score` | property | <code>score: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryType`

Public type alias for Memory Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryType } from '@codesoul-co/hypha-memory';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### Declaration

```text
export type MemoryType = 'working' | 'episodic' | 'semantic' | 'procedural' | 'artifact' | 'governance';
```
