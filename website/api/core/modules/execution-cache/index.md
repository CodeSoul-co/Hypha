# `@codesoul-co/hypha-core` / `modules/execution-cache/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-cache/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)
- Exports: **32**

## Using this module

Use the Index module for executing runtime behavior at this boundary. It exports 23 constants, 9 functions.

### Import from the package entrypoint

```ts
import {
  executionCacheArtifactReferenceJsonSchema,
  executionCacheArtifactReferenceSchema,
  executionCacheEntryProjectionExample,
  executionCacheEntryProjectionJsonSchema,
  executionCacheEntryProjectionSchema,
  executionCacheJsonSchemas,
  executionCacheRecordJsonSchema,
  executionCacheRecordSchema,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 9 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 23 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { executionCacheArtifactReferenceSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionCacheArtifactReferenceSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionCacheArtifactReferenceJsonSchema` | constant | <code>const executionCacheArtifactReferenceJsonSchema: JsonSchema</code> | JSON Schema for Execution Cache Artifact Reference. |
| `executionCacheArtifactReferenceSchema` | constant | <code>const executionCacheArtifactReferenceSchema: z.ZodObject&lt;{ artifactRef: z.ZodString; contentHash: z.ZodString; }, "strict", z.ZodTypeAny, { contentHash: string; artifactRef: string; }, { contentHash: string; artifactRef: string; }&gt;</code> | Runtime schema for Execution Cache Artifact Reference. |
| `executionCacheEntryProjectionExample` | constant | <code>const executionCacheEntryProjectionExample: ExecutionCacheEntryProjection</code> | Valid example value for Execution Cache Entry Projection. |
| `executionCacheEntryProjectionJsonSchema` | constant | <code>const executionCacheEntryProjectionJsonSchema: JsonSchema</code> | JSON Schema for Execution Cache Entry Projection. |
| `executionCacheEntryProjectionSchema` | constant | <code>const executionCacheEntryProjectionSchema: z.ZodEffects&lt;z.ZodObject&lt;{ commandHash: z.ZodString; validityHash: z.ZodString; validity: z.ZodObject&lt;{ executable: z.ZodString; argsHash: z.ZodString; sourceTreeHash: z.ZodString; workspaceSnapshotHash: z.ZodOptional&lt;z.ZodString&gt;; environmentHash: z.ZodString; imageDigest: z.ZodOptional&lt;z.ZodString&gt;; dependencyLockHash: z.ZodOptional&lt;z.ZodString&gt;; networkPolicyHash: z.Zo...</code> | Runtime schema for Execution Cache Entry Projection. |
| `executionCacheJsonSchemas` | constant | <code>const executionCacheJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Execution Cache JSON Schemas constant exported by the `modules/execution-cache/index` module. |
| `executionCacheRecordJsonSchema` | constant | <code>const executionCacheRecordJsonSchema: JsonSchema</code> | JSON Schema for Execution Cache Record. |
| `executionCacheRecordSchema` | constant | <code>const executionCacheRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ schemaVersion: z.ZodLiteral&lt;"1.0"&gt;; keyVersion: z.ZodLiteral&lt;"1"&gt;; key: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; }, "strict", z.ZodTypeAny, { workspaceId: string; userId: string; tenantId?: string &#124; undefined; }, { workspaceId: string; userId: string; tenantId?: string &#124; undefi...</code> | Runtime schema for Execution Cache Record. |
| `executionCacheResultMetadataJsonSchema` | constant | <code>const executionCacheResultMetadataJsonSchema: JsonSchema</code> | JSON Schema for Execution Cache Result Metadata. |
| `executionCacheResultMetadataSchema` | constant | <code>const executionCacheResultMetadataSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; status: z.ZodEnum&lt;["queued", "starting", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]&gt;; exitCode: z.ZodNullable&lt;z.ZodNumber&gt;; signal: z.ZodOptional&lt;z.ZodString&gt;; resourceUsage: z.ZodOptional&lt;z.ZodObject&lt;{ cpuTimeMs: z.ZodOptional&lt;z.ZodNumber&gt;;...</code> | Runtime schema for Execution Cache Result Metadata. |
| `executionCacheScopeJsonSchema` | constant | <code>const executionCacheScopeJsonSchema: JsonSchema</code> | JSON Schema for Execution Cache Scope. |
| `executionCacheScopeSchema` | constant | <code>const executionCacheScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; }, "strict", z.ZodTypeAny, { workspaceId: string; userId: string; tenantId?: string &#124; undefined; }, { workspaceId: string; userId: string; tenantId?: string &#124; undefined; }&gt;</code> | Runtime schema for Execution Cache Scope. |
| `executionCacheValidityInputExample` | constant | <code>const executionCacheValidityInputExample: ExecutionCacheValidityInput</code> | Valid example value for Execution Cache Validity Input. |
| `executionCacheValidityInputJsonSchema` | constant | <code>const executionCacheValidityInputJsonSchema: JsonSchema</code> | JSON Schema for Execution Cache Validity Input. |
| `executionCacheValidityInputSchema` | constant | <code>const executionCacheValidityInputSchema: z.ZodObject&lt;{ executable: z.ZodString; argsHash: z.ZodString; sourceTreeHash: z.ZodString; workspaceSnapshotHash: z.ZodOptional&lt;z.ZodString&gt;; environmentHash: z.ZodString; imageDigest: z.ZodOptional&lt;z.ZodString&gt;; dependencyLockHash: z.ZodOptional&lt;z.ZodString&gt;; networkPolicyHash: z.ZodString; secretVersionSetHash: z.ZodOptional&lt;z.ZodString&gt;; commandPolicyRevision: z.ZodOptio...</code> | Runtime schema for Execution Cache Validity Input. |
| `executionCommandFingerprintInputExample` | constant | <code>const executionCommandFingerprintInputExample: ExecutionCommandFingerprintInput</code> | Valid example value for Execution Command Fingerprint Input. |
| `executionCommandFingerprintInputJsonSchema` | constant | <code>const executionCommandFingerprintInputJsonSchema: JsonSchema</code> | JSON Schema for Execution Command Fingerprint Input. |
| `executionCommandFingerprintInputSchema` | constant | <code>const executionCommandFingerprintInputSchema: z.ZodObject&lt;{ executable: z.ZodString; argsHash: z.ZodString; cwd: z.ZodOptional&lt;z.ZodString&gt;; relevantEnvHash: z.ZodString; sourceTreeHash: z.ZodString; environmentHash: z.ZodString; networkPolicyHash: z.ZodString; secretVersionSetHash: z.ZodOptional&lt;z.ZodString&gt;; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { idempotencyKey: string; sourceTreeHash: string;...</code> | Runtime schema for Execution Command Fingerprint Input. |
| `executionEnvironmentFingerprintExample` | constant | <code>const executionEnvironmentFingerprintExample: ExecutionEnvironmentFingerprint</code> | Valid example value for Execution Environment Fingerprint. |
| `executionEnvironmentFingerprintJsonSchema` | constant | <code>const executionEnvironmentFingerprintJsonSchema: JsonSchema</code> | JSON Schema for Execution Environment Fingerprint. |
| `executionEnvironmentFingerprintResolutionJsonSchema` | constant | <code>const executionEnvironmentFingerprintResolutionJsonSchema: JsonSchema</code> | JSON Schema for Execution Environment Fingerprint Resolution. |
| `executionEnvironmentFingerprintResolutionSchema` | constant | <code>const executionEnvironmentFingerprintResolutionSchema: z.ZodDiscriminatedUnion&lt;"status", [z.ZodObject&lt;{ status: z.ZodLiteral&lt;"resolved"&gt;; fingerprint: z.ZodEffects&lt;z.ZodObject&lt;{ environmentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string;...</code> | Runtime schema for Execution Environment Fingerprint Resolution. |
| `executionEnvironmentFingerprintSchema` | constant | <code>const executionEnvironmentFingerprintSchema: z.ZodEffects&lt;z.ZodObject&lt;{ environmentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }&gt;; environmentRevision: z.ZodString; provid...</code> | Runtime schema for Execution Environment Fingerprint. |
| `assessExecutionCacheReuse` | function | <code>assessExecutionCacheReuse(input: ExecutionCacheReuseAssessmentInput): ExecutionCacheReuseAssessment</code> | Assess Execution Cache Reuse function with 1 public call signature; parameters and return types are listed below. |
| `canonicalizeExecutionFingerprintInput` | function | <code>canonicalizeExecutionFingerprintInput(input: ExecutionCommandFingerprintInput &#124; ExecutionCacheValidityInput): string</code> | Canonicalize Execution Fingerprint Input function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionCacheEntryProjection` | function | <code>validateExecutionCacheEntryProjection(input: unknown): ExecutionCacheEntryProjection</code> | Validate Execution Cache Entry Projection function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionCacheRecord` | function | <code>validateExecutionCacheRecord(input: unknown, maxEntryBytes?: number): ExecutionCacheRecord</code> | Validate Execution Cache Record function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionCacheScope` | function | <code>validateExecutionCacheScope(input: unknown): ExecutionCacheScope</code> | Validate Execution Cache Scope function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionCacheValidityInput` | function | <code>validateExecutionCacheValidityInput(input: unknown): ExecutionCacheValidityInput</code> | Validate Execution Cache Validity Input function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionCommandFingerprintInput` | function | <code>validateExecutionCommandFingerprintInput(input: unknown): ExecutionCommandFingerprintInput</code> | Validate Execution Command Fingerprint Input function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionEnvironmentFingerprint` | function | <code>validateExecutionEnvironmentFingerprint(input: unknown): ExecutionEnvironmentFingerprint</code> | Validate Execution Environment Fingerprint function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionEnvironmentFingerprintResolution` | function | <code>validateExecutionEnvironmentFingerprintResolution(input: unknown): ExecutionEnvironmentFingerprintResolution</code> | Validate Execution Environment Fingerprint Resolution function with 1 public call signature; parameters and return types are listed below. |

## `executionCacheArtifactReferenceJsonSchema`

JSON Schema for Execution Cache Artifact Reference.

- Kind: constant
- Import: `import { executionCacheArtifactReferenceJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionCacheArtifactReferenceJsonSchema: JsonSchema;
```

## `executionCacheArtifactReferenceSchema`

Runtime schema for Execution Cache Artifact Reference.

- Kind: constant
- Import: `import { executionCacheArtifactReferenceSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionCacheArtifactReferenceSchema: z.ZodObject<{ artifactRef: z.ZodString; contentHash: z.ZodString; }, "strict", z.ZodTypeAny, { contentHash: string; artifactRef: string; }, { contentHash: string; artifactRef: string; }>;
```

## `executionCacheEntryProjectionExample`

Valid example value for Execution Cache Entry Projection.

- Kind: constant
- Import: `import { executionCacheEntryProjectionExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionCacheEntryProjectionExample: ExecutionCacheEntryProjection;
```

## `executionCacheEntryProjectionJsonSchema`

JSON Schema for Execution Cache Entry Projection.

- Kind: constant
- Import: `import { executionCacheEntryProjectionJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionCacheEntryProjectionJsonSchema: JsonSchema;
```

## `executionCacheEntryProjectionSchema`

Runtime schema for Execution Cache Entry Projection.

- Kind: constant
- Import: `import { executionCacheEntryProjectionSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionCacheEntryProjectionSchema: (typeof import('@codesoul-co/hypha-core'))['executionCacheEntryProjectionSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionCacheJsonSchemas`

Execution Cache JSON Schemas constant exported by the `modules/execution-cache/index` module.

- Kind: constant
- Import: `import { executionCacheJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionCacheJsonSchemas: Record<string, JsonSchema>;
```

## `executionCacheRecordJsonSchema`

JSON Schema for Execution Cache Record.

- Kind: constant
- Import: `import { executionCacheRecordJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionCacheRecordJsonSchema: JsonSchema;
```

## `executionCacheRecordSchema`

Runtime schema for Execution Cache Record.

- Kind: constant
- Import: `import { executionCacheRecordSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionCacheRecordSchema: (typeof import('@codesoul-co/hypha-core'))['executionCacheRecordSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionCacheResultMetadataJsonSchema`

JSON Schema for Execution Cache Result Metadata.

- Kind: constant
- Import: `import { executionCacheResultMetadataJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionCacheResultMetadataJsonSchema: JsonSchema;
```

## `executionCacheResultMetadataSchema`

Runtime schema for Execution Cache Result Metadata.

- Kind: constant
- Import: `import { executionCacheResultMetadataSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionCacheResultMetadataSchema: (typeof import('@codesoul-co/hypha-core'))['executionCacheResultMetadataSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionCacheScopeJsonSchema`

JSON Schema for Execution Cache Scope.

- Kind: constant
- Import: `import { executionCacheScopeJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionCacheScopeJsonSchema: JsonSchema;
```

## `executionCacheScopeSchema`

Runtime schema for Execution Cache Scope.

- Kind: constant
- Import: `import { executionCacheScopeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionCacheScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodString; }, "strict", z.ZodTypeAny, { workspaceId: string; userId: string; tenantId?: string | undefined; }, { workspaceId: string; userId: string; tenantId?: string | undefined; }>;
```

## `executionCacheValidityInputExample`

Valid example value for Execution Cache Validity Input.

- Kind: constant
- Import: `import { executionCacheValidityInputExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionCacheValidityInputExample: ExecutionCacheValidityInput;
```

## `executionCacheValidityInputJsonSchema`

JSON Schema for Execution Cache Validity Input.

- Kind: constant
- Import: `import { executionCacheValidityInputJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionCacheValidityInputJsonSchema: JsonSchema;
```

## `executionCacheValidityInputSchema`

Runtime schema for Execution Cache Validity Input.

- Kind: constant
- Import: `import { executionCacheValidityInputSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionCacheValidityInputSchema: z.ZodObject<{ executable: z.ZodString; argsHash: z.ZodString; sourceTreeHash: z.ZodString; workspaceSnapshotHash: z.ZodOptional<z.ZodString>; environmentHash: z.ZodString; imageDigest: z.ZodOptional<z.ZodString>; dependencyLockHash: z.ZodOptional<z.ZodString>; networkPolicyHash: z.ZodString; secretVersionSetHash: z.ZodOptional<z.ZodString>; commandPolicyRevision: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sourceTreeHash: string; networkPolicyHash: string; executable: string; argsHash: string; environmentHash: string; workspaceSnapshotHash?: string | undefined; imageDigest?: string | undefined; dependencyLockHash?: string | undefined; secretVersionSetHash?: string | undefined; commandPolicyRevision?: string | undefined; }, { sourceTreeHash: string; networkPolicyHash: string; executable: string; argsHash: string; environmentHash: string; workspaceSnapshotHash?: string | undefined; imageDigest?: string | undefined; dependencyLockHash?: string | undefined; secretVersionSetHash?: string | undefined; commandPolicyRevision?: string | undefined; }>;
```

## `executionCommandFingerprintInputExample`

Valid example value for Execution Command Fingerprint Input.

- Kind: constant
- Import: `import { executionCommandFingerprintInputExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionCommandFingerprintInputExample: ExecutionCommandFingerprintInput;
```

## `executionCommandFingerprintInputJsonSchema`

JSON Schema for Execution Command Fingerprint Input.

- Kind: constant
- Import: `import { executionCommandFingerprintInputJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionCommandFingerprintInputJsonSchema: JsonSchema;
```

## `executionCommandFingerprintInputSchema`

Runtime schema for Execution Command Fingerprint Input.

- Kind: constant
- Import: `import { executionCommandFingerprintInputSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionCommandFingerprintInputSchema: z.ZodObject<{ executable: z.ZodString; argsHash: z.ZodString; cwd: z.ZodOptional<z.ZodString>; relevantEnvHash: z.ZodString; sourceTreeHash: z.ZodString; environmentHash: z.ZodString; networkPolicyHash: z.ZodString; secretVersionSetHash: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { idempotencyKey: string; sourceTreeHash: string; networkPolicyHash: string; executable: string; argsHash: string; environmentHash: string; relevantEnvHash: string; cwd?: string | undefined; secretVersionSetHash?: string | undefined; }, { idempotencyKey: string; sourceTreeHash: string; networkPolicyHash: string; executable: string; argsHash: string; environmentHash: string; relevantEnvHash: string; cwd?: string | undefined; secretVersionSetHash?: string | undefined; }>;
```

## `executionEnvironmentFingerprintExample`

Valid example value for Execution Environment Fingerprint.

- Kind: constant
- Import: `import { executionEnvironmentFingerprintExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionEnvironmentFingerprintExample: ExecutionEnvironmentFingerprint;
```

## `executionEnvironmentFingerprintJsonSchema`

JSON Schema for Execution Environment Fingerprint.

- Kind: constant
- Import: `import { executionEnvironmentFingerprintJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionEnvironmentFingerprintJsonSchema: JsonSchema;
```

## `executionEnvironmentFingerprintResolutionJsonSchema`

JSON Schema for Execution Environment Fingerprint Resolution.

- Kind: constant
- Import: `import { executionEnvironmentFingerprintResolutionJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionEnvironmentFingerprintResolutionJsonSchema: JsonSchema;
```

## `executionEnvironmentFingerprintResolutionSchema`

Runtime schema for Execution Environment Fingerprint Resolution.

- Kind: constant
- Import: `import { executionEnvironmentFingerprintResolutionSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionEnvironmentFingerprintResolutionSchema: (typeof import('@codesoul-co/hypha-core'))['executionEnvironmentFingerprintResolutionSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionEnvironmentFingerprintSchema`

Runtime schema for Execution Environment Fingerprint.

- Kind: constant
- Import: `import { executionEnvironmentFingerprintSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare const executionEnvironmentFingerprintSchema: z.ZodEffects<z.ZodObject<{ environmentRef: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; revision?: string | undefined; }, { id: string; version?: string | undefined; revision?: string | undefined; }>; environmentRevision: z.ZodString; providerId: z.ZodString; imageDigest: z.ZodOptional<z.ZodString>; platform: z.ZodOptional<z.ZodString>; executableVersions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>; dependencyLockHash: z.ZodOptional<z.ZodString>; resourcePolicyHash: z.ZodString; networkPolicyHash: z.ZodString; mountPolicyHash: z.ZodString; secretVersionSetHash: z.ZodOptional<z.ZodString>; fingerprintHash: z.ZodString; }, "strict", z.ZodTypeAny, { environmentRevision: string; providerId: string; networkPolicyHash: string; environmentRef: { id: string; version?: string | undefined; revision?: string | undefined; }; mountPolicyHash: string; resourcePolicyHash: string; fingerprintHash: string; platform?: string | undefined; imageDigest?: string | undefined; dependencyLockHash?: string | undefined; secretVersionSetHash?: string | undefined; executableVersions?: Record<string, string> | undefined; }, { environmentRevision: string; providerId: string; networkPolicyHash: string; environmentRef: { id: string; version?: string | undefined; revision?: string | undefined; }; mountPolicyHash: string; resourcePolicyHash: string; fingerprintHash: string; platform?: string | undefined; imageDigest?: string | undefined; dependencyLockHash?: string | undefined; secretVersionSetHash?: string | undefined; executableVersions?: Record<string, string> | undefined; }>, { environmentRevision: string; providerId: string; networkPolicyHash: string; environmentRef: { id: string; version?: string | undefined; revision?: string | undefined; }; mountPolicyHash: string; resourcePolicyHash: string; fingerprintHash: string; platform?: string | undefined; imageDigest?: string | undefined; dependencyLockHash?: string | undefined; secretVersionSetHash?: string | undefined; executableVersions?: Record<string, string> | undefined; }, { environmentRevision: string; providerId: string; networkPolicyHash: string; environmentRef: { id: string; version?: string | undefined; revision?: string | undefined; }; mountPolicyHash: string; resourcePolicyHash: string; fingerprintHash: string; platform?: string | undefined; imageDigest?: string | undefined; dependencyLockHash?: string | undefined; secretVersionSetHash?: string | undefined; executableVersions?: Record<string, string> | undefined; }>;
```

## `assessExecutionCacheReuse`

Assess Execution Cache Reuse function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assessExecutionCacheReuse } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare function assessExecutionCacheReuse(input: ExecutionCacheReuseAssessmentInput): ExecutionCacheReuseAssessment;
```

### Call signature

```text
assessExecutionCacheReuse(input: ExecutionCacheReuseAssessmentInput): ExecutionCacheReuseAssessment
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>ExecutionCacheReuseAssessmentInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionCacheReuseAssessment`
- Description: The return contract is defined by the type shown above.

## `canonicalizeExecutionFingerprintInput`

Canonicalize Execution Fingerprint Input function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { canonicalizeExecutionFingerprintInput } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare function canonicalizeExecutionFingerprintInput(input: ExecutionCommandFingerprintInput | ExecutionCacheValidityInput): string;
```

### Call signature

```text
canonicalizeExecutionFingerprintInput(input: ExecutionCommandFingerprintInput | ExecutionCacheValidityInput): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>ExecutionCacheValidityInput &#124; ExecutionCommandFingerprintInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `validateExecutionCacheEntryProjection`

Validate Execution Cache Entry Projection function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionCacheEntryProjection } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare function validateExecutionCacheEntryProjection(input: unknown): ExecutionCacheEntryProjection;
```

### Call signature

```text
validateExecutionCacheEntryProjection(input: unknown): ExecutionCacheEntryProjection
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionCacheEntryProjection`
- Description: The return contract is defined by the type shown above.

## `validateExecutionCacheRecord`

Validate Execution Cache Record function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionCacheRecord } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare function validateExecutionCacheRecord(input: unknown, maxEntryBytes?: number): ExecutionCacheRecord;
```

### Call signature

```text
validateExecutionCacheRecord(input: unknown, maxEntryBytes?: number): ExecutionCacheRecord
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `maxEntryBytes` | <code>number</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionCacheRecord`
- Description: The return contract is defined by the type shown above.

## `validateExecutionCacheScope`

Validate Execution Cache Scope function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionCacheScope } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare function validateExecutionCacheScope(input: unknown): ExecutionCacheScope;
```

### Call signature

```text
validateExecutionCacheScope(input: unknown): ExecutionCacheScope
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionCacheScope`
- Description: The return contract is defined by the type shown above.

## `validateExecutionCacheValidityInput`

Validate Execution Cache Validity Input function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionCacheValidityInput } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare function validateExecutionCacheValidityInput(input: unknown): ExecutionCacheValidityInput;
```

### Call signature

```text
validateExecutionCacheValidityInput(input: unknown): ExecutionCacheValidityInput
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionCacheValidityInput`
- Description: The return contract is defined by the type shown above.

## `validateExecutionCommandFingerprintInput`

Validate Execution Command Fingerprint Input function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionCommandFingerprintInput } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare function validateExecutionCommandFingerprintInput(input: unknown): ExecutionCommandFingerprintInput;
```

### Call signature

```text
validateExecutionCommandFingerprintInput(input: unknown): ExecutionCommandFingerprintInput
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionCommandFingerprintInput`
- Description: The return contract is defined by the type shown above.

## `validateExecutionEnvironmentFingerprint`

Validate Execution Environment Fingerprint function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionEnvironmentFingerprint } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare function validateExecutionEnvironmentFingerprint(input: unknown): ExecutionEnvironmentFingerprint;
```

### Call signature

```text
validateExecutionEnvironmentFingerprint(input: unknown): ExecutionEnvironmentFingerprint
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionEnvironmentFingerprint`
- Description: The return contract is defined by the type shown above.

## `validateExecutionEnvironmentFingerprintResolution`

Validate Execution Environment Fingerprint Resolution function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionEnvironmentFingerprintResolution } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### Declaration

```text
export declare function validateExecutionEnvironmentFingerprintResolution(input: unknown): ExecutionEnvironmentFingerprintResolution;
```

### Call signature

```text
validateExecutionEnvironmentFingerprintResolution(input: unknown): ExecutionEnvironmentFingerprintResolution
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionEnvironmentFingerprintResolution`
- Description: The return contract is defined by the type shown above.
