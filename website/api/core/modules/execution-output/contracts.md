# `@codesoul-co/hypha-core` / `modules/execution-output/contracts`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-output/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)
- Exports: **21**

## Using this module

Use the Contracts module for declaring and runtime-validating contracts. It exports 17 constants, 4 functions.

### Import from the package entrypoint

```ts
import {
  collectedExecutionOutputJsonSchema,
  collectedExecutionOutputSchema,
  executionOutputCollectionItemJsonSchema,
  executionOutputCollectionItemSchema,
  executionOutputCollectionPlanExample,
  executionOutputCollectionPlanJsonSchema,
  executionOutputCollectionPlanSchema,
  executionOutputCollectionPolicyExample,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 17 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { collectedExecutionOutputSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = collectedExecutionOutputSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collectedExecutionOutputJsonSchema` | constant | <code>const collectedExecutionOutputJsonSchema: JsonSchema</code> | JSON Schema for Collected Execution Output. |
| `collectedExecutionOutputSchema` | constant | <code>const collectedExecutionOutputSchema: z.ZodObject&lt;{ relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; artifactRef: z.ZodString; versionId: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; status: z.ZodEnum&lt;["draft", "final"]&gt;; }, "strict", z.ZodTypeAny, { versionId: string; status: "draft" &#124; "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }, { versio...</code> | Runtime schema for Collected Execution Output. |
| `executionOutputCollectionItemJsonSchema` | constant | <code>const executionOutputCollectionItemJsonSchema: JsonSchema</code> | JSON Schema for Execution Output Collection Item. |
| `executionOutputCollectionItemSchema` | constant | <code>const executionOutputCollectionItemSchema: z.ZodObject&lt;{ relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; contentHash: z.ZodString; sizeBytes: z.ZodNumber; kind: z.ZodEnum&lt;["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]&gt;; mimeType: z.ZodOptional&lt;z.ZodString&gt;; exis...</code> | Runtime schema for Execution Output Collection Item. |
| `executionOutputCollectionPlanExample` | constant | <code>const executionOutputCollectionPlanExample: ExecutionOutputCollectionPlan</code> | Valid example value for Execution Output Collection Plan. |
| `executionOutputCollectionPlanJsonSchema` | constant | <code>const executionOutputCollectionPlanJsonSchema: JsonSchema</code> | JSON Schema for Execution Output Collection Plan. |
| `executionOutputCollectionPlanSchema` | constant | <code>const executionOutputCollectionPlanSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; status: z.ZodEnum&lt;["cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]&gt;; items: z.ZodArray&lt;z.ZodObject&lt;{ relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; contentHash: z.ZodString; sizeBytes: z.ZodNumber; kind: z.ZodEnum&lt;["document", "code", "dataset", "image", "audi...</code> | Runtime schema for Execution Output Collection Plan. |
| `executionOutputCollectionPolicyExample` | constant | <code>const executionOutputCollectionPolicyExample: ExecutionOutputCollectionPolicy</code> | Valid example value for Execution Output Collection Policy. |
| `executionOutputCollectionPolicyJsonSchema` | constant | <code>const executionOutputCollectionPolicyJsonSchema: JsonSchema</code> | JSON Schema for Execution Output Collection Policy. |
| `executionOutputCollectionPolicySchema` | constant | <code>const executionOutputCollectionPolicySchema: z.ZodEffects&lt;z.ZodObject&lt;{ includePatterns: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEffects&lt;z.ZodString, string, string&gt;, "many"&gt;&gt;; excludePatterns: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEffects&lt;z.ZodString, string, string&gt;, "many"&gt;&gt;; maxArtifacts: z.ZodOptional&lt;z.ZodNumber&gt;; maxTotalBytes: z.ZodOptional&lt;z.ZodNumber&gt;; classifyByExtension: z.ZodOptional&lt;z.ZodBoolean&gt;; finalizeOnSuccess: z...</code> | Runtime schema for Execution Output Collection Policy. |
| `executionOutputCollectionResultJsonSchema` | constant | <code>const executionOutputCollectionResultJsonSchema: JsonSchema</code> | JSON Schema for Execution Output Collection Result. |
| `executionOutputCollectionResultSchema` | constant | <code>const executionOutputCollectionResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; collected: z.ZodArray&lt;z.ZodObject&lt;{ relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; artifactRef: z.ZodString; versionId: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; status: z.ZodEnum&lt;["draft", "final"]&gt;; }, "strict", z.ZodTypeAny, { versionId: string; status: "draft" &#124; "final"; contentHash:...</code> | Runtime schema for Execution Output Collection Result. |
| `executionOutputJsonSchemas` | constant | <code>const executionOutputJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Execution Output JSON Schemas constant exported by the `modules/execution-output/contracts` module. |
| `executionOutputPatternSchema` | constant | <code>const executionOutputPatternSchema: z.ZodEffects&lt;z.ZodString, string, string&gt;</code> | Runtime schema for Execution Output Pattern. |
| `executionOutputSkippedSchema` | constant | <code>const executionOutputSkippedSchema: z.ZodObject&lt;{ not_included: z.ZodNumber; excluded: z.ZodNumber; unsupported_mutation: z.ZodNumber; missing_integrity_evidence: z.ZodNumber; artifact_limit: z.ZodNumber; byte_limit: z.ZodNumber; }, "strict", z.ZodTypeAny, { not_included: number; excluded: number; unsupported_mutation: number; missing_integrity_evidence: number; artifact_limit: number; byte_limit: number; }, { not...</code> | Runtime schema for Execution Output Skipped. |
| `executionOutputSkipReasonSchema` | constant | <code>const executionOutputSkipReasonSchema: z.ZodEnum&lt;["not_included", "excluded", "unsupported_mutation", "missing_integrity_evidence", "artifact_limit", "byte_limit"]&gt;</code> | Runtime schema for Execution Output Skip Reason. |
| `executionOutputTerminalStatusSchema` | constant | <code>const executionOutputTerminalStatusSchema: z.ZodEnum&lt;["cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]&gt;</code> | Runtime schema for Execution Output Terminal Status. |
| `emptyExecutionOutputSkipCounts` | function | <code>emptyExecutionOutputSkipCounts(): Record&lt;ExecutionOutputSkipReason, number&gt;</code> | Empty Execution Output Skip Counts function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionOutputCollectionPlan` | function | <code>validateExecutionOutputCollectionPlan(input: unknown): ExecutionOutputCollectionPlan</code> | Validate Execution Output Collection Plan function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionOutputCollectionPolicy` | function | <code>validateExecutionOutputCollectionPolicy(input: unknown): ExecutionOutputCollectionPolicy</code> | Validate Execution Output Collection Policy function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionOutputCollectionResult` | function | <code>validateExecutionOutputCollectionResult(input: unknown): ExecutionOutputCollectionResult</code> | Validate Execution Output Collection Result function with 1 public call signature; parameters and return types are listed below. |

## `collectedExecutionOutputJsonSchema`

JSON Schema for Collected Execution Output.

- Kind: constant
- Import: `import { collectedExecutionOutputJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const collectedExecutionOutputJsonSchema: JsonSchema;
```

## `collectedExecutionOutputSchema`

Runtime schema for Collected Execution Output.

- Kind: constant
- Import: `import { collectedExecutionOutputSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const collectedExecutionOutputSchema: z.ZodObject<{ relativePath: z.ZodEffects<z.ZodString, string, string>; artifactRef: z.ZodString; versionId: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; status: z.ZodEnum<["draft", "final"]>; }, "strict", z.ZodTypeAny, { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }, { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }>;
```

## `executionOutputCollectionItemJsonSchema`

JSON Schema for Execution Output Collection Item.

- Kind: constant
- Import: `import { executionOutputCollectionItemJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const executionOutputCollectionItemJsonSchema: JsonSchema;
```

## `executionOutputCollectionItemSchema`

Runtime schema for Execution Output Collection Item.

- Kind: constant
- Import: `import { executionOutputCollectionItemSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const executionOutputCollectionItemSchema: z.ZodObject<{ relativePath: z.ZodEffects<z.ZodString, string, string>; contentHash: z.ZodString; sizeBytes: z.ZodNumber; kind: z.ZodEnum<["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]>; mimeType: z.ZodOptional<z.ZodString>; existingArtifactRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { contentHash: string; sizeBytes: number; kind: "code" | "log" | "snapshot" | "other" | "image" | "document" | "dataset" | "audio" | "video" | "table" | "report" | "archive" | "patch" | "test_report" | "build_output" | "tool_output" | "execution_receipt"; relativePath: string; mimeType?: string | undefined; existingArtifactRef?: string | undefined; }, { contentHash: string; sizeBytes: number; kind: "code" | "log" | "snapshot" | "other" | "image" | "document" | "dataset" | "audio" | "video" | "table" | "report" | "archive" | "patch" | "test_report" | "build_output" | "tool_output" | "execution_receipt"; relativePath: string; mimeType?: string | undefined; existingArtifactRef?: string | undefined; }>;
```

## `executionOutputCollectionPlanExample`

Valid example value for Execution Output Collection Plan.

- Kind: constant
- Import: `import { executionOutputCollectionPlanExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const executionOutputCollectionPlanExample: ExecutionOutputCollectionPlan;
```

## `executionOutputCollectionPlanJsonSchema`

JSON Schema for Execution Output Collection Plan.

- Kind: constant
- Import: `import { executionOutputCollectionPlanJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const executionOutputCollectionPlanJsonSchema: JsonSchema;
```

## `executionOutputCollectionPlanSchema`

Runtime schema for Execution Output Collection Plan.

- Kind: constant
- Import: `import { executionOutputCollectionPlanSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionOutputCollectionPlanSchema: (typeof import('@codesoul-co/hypha-core'))['executionOutputCollectionPlanSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionOutputCollectionPolicyExample`

Valid example value for Execution Output Collection Policy.

- Kind: constant
- Import: `import { executionOutputCollectionPolicyExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const executionOutputCollectionPolicyExample: ExecutionOutputCollectionPolicy;
```

## `executionOutputCollectionPolicyJsonSchema`

JSON Schema for Execution Output Collection Policy.

- Kind: constant
- Import: `import { executionOutputCollectionPolicyJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const executionOutputCollectionPolicyJsonSchema: JsonSchema;
```

## `executionOutputCollectionPolicySchema`

Runtime schema for Execution Output Collection Policy.

- Kind: constant
- Import: `import { executionOutputCollectionPolicySchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const executionOutputCollectionPolicySchema: z.ZodEffects<z.ZodObject<{ includePatterns: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>; excludePatterns: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>; maxArtifacts: z.ZodOptional<z.ZodNumber>; maxTotalBytes: z.ZodOptional<z.ZodNumber>; classifyByExtension: z.ZodOptional<z.ZodBoolean>; finalizeOnSuccess: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { excludePatterns?: string[] | undefined; includePatterns?: string[] | undefined; maxArtifacts?: number | undefined; maxTotalBytes?: number | undefined; classifyByExtension?: boolean | undefined; finalizeOnSuccess?: boolean | undefined; }, { excludePatterns?: string[] | undefined; includePatterns?: string[] | undefined; maxArtifacts?: number | undefined; maxTotalBytes?: number | undefined; classifyByExtension?: boolean | undefined; finalizeOnSuccess?: boolean | undefined; }>, { excludePatterns?: string[] | undefined; includePatterns?: string[] | undefined; maxArtifacts?: number | undefined; maxTotalBytes?: number | undefined; classifyByExtension?: boolean | undefined; finalizeOnSuccess?: boolean | undefined; }, { excludePatterns?: string[] | undefined; includePatterns?: string[] | undefined; maxArtifacts?: number | undefined; maxTotalBytes?: number | undefined; classifyByExtension?: boolean | undefined; finalizeOnSuccess?: boolean | undefined; }>;
```

## `executionOutputCollectionResultJsonSchema`

JSON Schema for Execution Output Collection Result.

- Kind: constant
- Import: `import { executionOutputCollectionResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const executionOutputCollectionResultJsonSchema: JsonSchema;
```

## `executionOutputCollectionResultSchema`

Runtime schema for Execution Output Collection Result.

- Kind: constant
- Import: `import { executionOutputCollectionResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const executionOutputCollectionResultSchema: z.ZodEffects<z.ZodObject<{ executionId: z.ZodString; collected: z.ZodArray<z.ZodObject<{ relativePath: z.ZodEffects<z.ZodString, string, string>; artifactRef: z.ZodString; versionId: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; status: z.ZodEnum<["draft", "final"]>; }, "strict", z.ZodTypeAny, { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }, { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }>, "many">; existingArtifactRefs: z.ZodArray<z.ZodString, "many">; artifactRefs: z.ZodArray<z.ZodString, "many">; finalizedArtifactRefs: z.ZodArray<z.ZodString, "many">; }, "strict", z.ZodTypeAny, { executionId: string; artifactRefs: string[]; existingArtifactRefs: string[]; collected: { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }[]; finalizedArtifactRefs: string[]; }, { executionId: string; artifactRefs: string[]; existingArtifactRefs: string[]; collected: { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }[]; finalizedArtifactRefs: string[]; }>, { executionId: string; artifactRefs: string[]; existingArtifactRefs: string[]; collected: { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }[]; finalizedArtifactRefs: string[]; }, { executionId: string; artifactRefs: string[]; existingArtifactRefs: string[]; collected: { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }[]; finalizedArtifactRefs: string[]; }>;
```

## `executionOutputJsonSchemas`

Execution Output JSON Schemas constant exported by the `modules/execution-output/contracts` module.

- Kind: constant
- Import: `import { executionOutputJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const executionOutputJsonSchemas: Record<string, JsonSchema>;
```

## `executionOutputPatternSchema`

Runtime schema for Execution Output Pattern.

- Kind: constant
- Import: `import { executionOutputPatternSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const executionOutputPatternSchema: z.ZodEffects<z.ZodString, string, string>;
```

## `executionOutputSkippedSchema`

Runtime schema for Execution Output Skipped.

- Kind: constant
- Import: `import { executionOutputSkippedSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const executionOutputSkippedSchema: z.ZodObject<{ not_included: z.ZodNumber; excluded: z.ZodNumber; unsupported_mutation: z.ZodNumber; missing_integrity_evidence: z.ZodNumber; artifact_limit: z.ZodNumber; byte_limit: z.ZodNumber; }, "strict", z.ZodTypeAny, { not_included: number; excluded: number; unsupported_mutation: number; missing_integrity_evidence: number; artifact_limit: number; byte_limit: number; }, { not_included: number; excluded: number; unsupported_mutation: number; missing_integrity_evidence: number; artifact_limit: number; byte_limit: number; }>;
```

## `executionOutputSkipReasonSchema`

Runtime schema for Execution Output Skip Reason.

- Kind: constant
- Import: `import { executionOutputSkipReasonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const executionOutputSkipReasonSchema: z.ZodEnum<["not_included", "excluded", "unsupported_mutation", "missing_integrity_evidence", "artifact_limit", "byte_limit"]>;
```

## `executionOutputTerminalStatusSchema`

Runtime schema for Execution Output Terminal Status.

- Kind: constant
- Import: `import { executionOutputTerminalStatusSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare const executionOutputTerminalStatusSchema: z.ZodEnum<["cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]>;
```

## `emptyExecutionOutputSkipCounts`

Empty Execution Output Skip Counts function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { emptyExecutionOutputSkipCounts } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare function emptyExecutionOutputSkipCounts(): Record<ExecutionOutputSkipReason, number>;
```

### Call signature

```text
emptyExecutionOutputSkipCounts(): Record<ExecutionOutputSkipReason, number>
```

#### Parameters

No parameters.

#### Returns

- Type: `Record<ExecutionOutputSkipReason, number>`
- Description: The return contract is defined by the type shown above.

## `validateExecutionOutputCollectionPlan`

Validate Execution Output Collection Plan function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionOutputCollectionPlan } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare function validateExecutionOutputCollectionPlan(input: unknown): ExecutionOutputCollectionPlan;
```

### Call signature

```text
validateExecutionOutputCollectionPlan(input: unknown): ExecutionOutputCollectionPlan
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionOutputCollectionPlan`
- Description: The return contract is defined by the type shown above.

## `validateExecutionOutputCollectionPolicy`

Validate Execution Output Collection Policy function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionOutputCollectionPolicy } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare function validateExecutionOutputCollectionPolicy(input: unknown): ExecutionOutputCollectionPolicy;
```

### Call signature

```text
validateExecutionOutputCollectionPolicy(input: unknown): ExecutionOutputCollectionPolicy
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionOutputCollectionPolicy`
- Description: The return contract is defined by the type shown above.

## `validateExecutionOutputCollectionResult`

Validate Execution Output Collection Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionOutputCollectionResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### Declaration

```text
export declare function validateExecutionOutputCollectionResult(input: unknown): ExecutionOutputCollectionResult;
```

### Call signature

```text
validateExecutionOutputCollectionResult(input: unknown): ExecutionOutputCollectionResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionOutputCollectionResult`
- Description: The return contract is defined by the type shown above.
