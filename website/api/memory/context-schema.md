# `@codesoul-co/hypha-memory` / `context-schema`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/context-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)
- Exports: **18**

## Using this module

Use the Context schema module for declaring and runtime-validating contracts. It exports 15 constants, 3 functions.

### Import from the package entrypoint

```ts
import {
  contextArtifactRefSchema,
  contextBudgetPlanSchema,
  contextBuildRequestSchema,
  contextConflictSchema,
  contextEnvelopeSchema,
  contextItemSchema,
  contextProfileSpecDefinition,
  contextProfileSpecExample,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 15 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { contextArtifactRefSchema } from '@codesoul-co/hypha-memory';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = contextArtifactRefSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextArtifactRefSchema` | constant | <code>const contextArtifactRefSchema: z.ZodObject&lt;{ id: z.ZodString; path: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; contentType: z.ZodLiteral&lt;"text/plain; charset=utf-8"&gt;; scopeHash: z.ZodString; profileRevision: z.ZodString; sourceItemId: z.ZodString; createdAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { id: string; path: string; createdAt: string; scopeHash: ...</code> | Runtime schema for Context Artifact Ref. |
| `contextBudgetPlanSchema` | constant | <code>const contextBudgetPlanSchema: z.ZodObject&lt;{ totalAvailableTokens: z.ZodNumber; fixedTokens: z.ZodNumber; dynamicTokens: z.ZodNumber; sourceBudgets: z.ZodArray&lt;z.ZodObject&lt;{ sourceId: z.ZodString; minTokens: z.ZodOptional&lt;z.ZodNumber&gt;; targetTokens: z.ZodOptional&lt;z.ZodNumber&gt;; maxTokens: z.ZodNumber; required: z.ZodBoolean; overflowPolicy: z.ZodEnum&lt;["drop", "truncate", "summarize", "spill_to_artifact", "fail"]&gt;; ...</code> | Runtime schema for Context Budget Plan. |
| `contextBuildRequestSchema` | constant | <code>const contextBuildRequestSchema: z.ZodType&lt;ContextBuildRequest, z.ZodTypeDef, ContextBuildRequest&gt;</code> | Runtime schema for Context Build Request. |
| `contextConflictSchema` | constant | <code>const contextConflictSchema: z.ZodObject&lt;{ conflictGroupId: z.ZodString; itemIds: z.ZodArray&lt;z.ZodString, "many"&gt;; resolution: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { conflictGroupId: string; itemIds: string[]; resolution?: string &#124; undefined; }, { conflictGroupId: string; itemIds: string[]; resolution?: string &#124; undefined; }&gt;</code> | Runtime schema for Context Conflict. |
| `contextEnvelopeSchema` | constant | <code>const contextEnvelopeSchema: z.ZodType&lt;ContextEnvelope, z.ZodTypeDef, ContextEnvelope&gt;</code> | Runtime schema for Context Envelope. |
| `contextItemSchema` | constant | <code>const contextItemSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; sourceType: z.ZodEnum&lt;["system", "workflow_state", "messages", "working_memory", "long_term_memory", "tool_observation", "artifact", "human_review", "custom"]&gt;; sourceId: z.ZodOptional&lt;z.ZodString&gt;; content: z.ZodUnknown; text: z.ZodString; tokenEstimate: z.ZodNumber; priority: z.ZodNumber; score: z.ZodOptional&lt;z.ZodNumber&gt;; required: z.ZodOption...</code> | Runtime schema for Context Item. |
| `contextProfileSpecDefinition` | constant | <code>const contextProfileSpecDefinition: SpecSchemaDefinition&lt;ContextProfileSpec&gt;</code> | Runtime validation entrypoint for the Context Profile spec, combining its parser, example and JSON Schema. |
| `contextProfileSpecExample` | constant | <code>const contextProfileSpecExample: ContextProfileSpec</code> | Valid example value for Context Profile Spec. |
| `contextProfileSpecJsonSchema` | constant | <code>const contextProfileSpecJsonSchema: JsonSchema</code> | JSON Schema for Context Profile Spec. |
| `contextProfileSpecSchema` | constant | <code>const contextProfileSpecSchema: z.ZodType&lt;ContextProfileSpec, z.ZodTypeDef, ContextProfileSpec&gt;</code> | Runtime schema for Context Profile Spec. |
| `contextProvenanceLabelSchema` | constant | <code>const contextProvenanceLabelSchema: z.ZodObject&lt;{ sourceType: z.ZodEnum&lt;["system", "workflow_state", "messages", "working_memory", "long_term_memory", "tool_observation", "artifact", "human_review", "custom"]&gt;; sourceId: z.ZodString; memoryId: z.ZodOptional&lt;z.ZodString&gt;; memoryVersionId: z.ZodOptional&lt;z.ZodString&gt;; authority: z.ZodOptional&lt;z.ZodEnum&lt;["unverified", "user_asserted", "system_observed", "verified", "a...</code> | Runtime schema for Context Provenance Label. |
| `contextSourceBudgetSchema` | constant | <code>const contextSourceBudgetSchema: z.ZodObject&lt;{ sourceId: z.ZodString; minTokens: z.ZodOptional&lt;z.ZodNumber&gt;; targetTokens: z.ZodOptional&lt;z.ZodNumber&gt;; maxTokens: z.ZodNumber; required: z.ZodBoolean; overflowPolicy: z.ZodEnum&lt;["drop", "truncate", "summarize", "spill_to_artifact", "fail"]&gt;; }, "strip", z.ZodTypeAny, { required: boolean; sourceId: string; maxTokens: number; overflowPolicy: "summarize" &#124; "fail" &#124; "dro...</code> | Runtime schema for Context Source Budget. |
| `contextSourceSpecSchema` | constant | <code>const contextSourceSpecSchema: z.ZodType&lt;ContextSourceSpec, z.ZodTypeDef, ContextSourceSpec&gt;</code> | Runtime schema for Context Source Spec. |
| `contextTruncationRecordSchema` | constant | <code>const contextTruncationRecordSchema: z.ZodObject&lt;{ itemId: z.ZodString; originalTokens: z.ZodNumber; retainedTokens: z.ZodNumber; method: z.ZodEnum&lt;["drop", "truncate", "summarize", "spill_to_artifact"]&gt;; reason: z.ZodString; }, "strip", z.ZodTypeAny, { reason: string; itemId: string; originalTokens: number; retainedTokens: number; method: "summarize" &#124; "drop" &#124; "truncate" &#124; "spill_to_artifact"; }, { reason: strin...</code> | Runtime schema for Context Truncation Record. |
| `promptSegmentSchema` | constant | <code>const promptSegmentSchema: z.ZodObject&lt;{ id: z.ZodString; role: z.ZodEnum&lt;["system", "developer", "user", "assistant", "tool", "data"]&gt;; text: z.ZodString; tokenCount: z.ZodNumber; trustLevel: z.ZodEnum&lt;["trusted_instruction", "trusted_data", "untrusted_data"]&gt;; sourceRefs: z.ZodArray&lt;z.ZodString, "many"&gt;; required: z.ZodOptional&lt;z.ZodBoolean&gt;; artifactRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; ...</code> | Runtime schema for Prompt Segment. |
| `validateContextEnvelope` | function | <code>validateContextEnvelope(input: unknown): ContextEnvelope</code> | Validate Context Envelope function with 1 public call signature; parameters and return types are listed below. |
| `validateContextItem` | function | <code>validateContextItem(input: unknown): ContextItem</code> | Validate Context Item function with 1 public call signature; parameters and return types are listed below. |
| `validateContextProfileSpec` | function | <code>validateContextProfileSpec(input: unknown): ContextProfileSpec</code> | Validate Context Profile Spec function with 1 public call signature; parameters and return types are listed below. |

## `contextArtifactRefSchema`

Runtime schema for Context Artifact Ref.

- Kind: constant
- Import: `import { contextArtifactRefSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare const contextArtifactRefSchema: z.ZodObject<{ id: z.ZodString; path: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; contentType: z.ZodLiteral<"text/plain; charset=utf-8">; scopeHash: z.ZodString; profileRevision: z.ZodString; sourceItemId: z.ZodString; createdAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; path: string; createdAt: string; scopeHash: string; contentType: "text/plain; charset=utf-8"; sizeBytes: number; profileRevision: string; sourceItemId: string; contentHash: string; expiresAt?: string | undefined; }, { id: string; path: string; createdAt: string; scopeHash: string; contentType: "text/plain; charset=utf-8"; sizeBytes: number; profileRevision: string; sourceItemId: string; contentHash: string; expiresAt?: string | undefined; }>;
```

## `contextBudgetPlanSchema`

Runtime schema for Context Budget Plan.

- Kind: constant
- Import: `import { contextBudgetPlanSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare const contextBudgetPlanSchema: z.ZodObject<{ totalAvailableTokens: z.ZodNumber; fixedTokens: z.ZodNumber; dynamicTokens: z.ZodNumber; sourceBudgets: z.ZodArray<z.ZodObject<{ sourceId: z.ZodString; minTokens: z.ZodOptional<z.ZodNumber>; targetTokens: z.ZodOptional<z.ZodNumber>; maxTokens: z.ZodNumber; required: z.ZodBoolean; overflowPolicy: z.ZodEnum<["drop", "truncate", "summarize", "spill_to_artifact", "fail"]>; }, "strip", z.ZodTypeAny, { required: boolean; sourceId: string; maxTokens: number; overflowPolicy: "summarize" | "fail" | "drop" | "truncate" | "spill_to_artifact"; minTokens?: number | undefined; targetTokens?: number | undefined; }, { required: boolean; sourceId: string; maxTokens: number; overflowPolicy: "summarize" | "fail" | "drop" | "truncate" | "spill_to_artifact"; minTokens?: number | undefined; targetTokens?: number | undefined; }>, "many">; tokenizerRef: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; } & { revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; revision?: string | undefined; }, { id: string; version?: string | undefined; revision?: string | undefined; }>; safetyMarginTokens: z.ZodNumber; }, "strip", z.ZodTypeAny, { totalAvailableTokens: number; fixedTokens: number; dynamicTokens: number; sourceBudgets: { required: boolean; sourceId: string; maxTokens: number; overflowPolicy: "summarize" | "fail" | "drop" | "truncate" | "spill_to_artifact"; minTokens?: number | undefined; targetTokens?: number | undefined; }[]; tokenizerRef: { id: string; version?: string | undefined; revision?: string | undefined; }; safetyMarginTokens: number; }, { totalAvailableTokens: number; fixedTokens: number; dynamicTokens: number; sourceBudgets: { required: boolean; sourceId: string; maxTokens: number; overflowPolicy: "summarize" | "fail" | "drop" | "truncate" | "spill_to_artifact"; minTokens?: number | undefined; targetTokens?: number | undefined; }[]; tokenizerRef: { id: string; version?: string | undefined; revision?: string | undefined; }; safetyMarginTokens: number; }>;
```

## `contextBuildRequestSchema`

Runtime schema for Context Build Request.

- Kind: constant
- Import: `import { contextBuildRequestSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare const contextBuildRequestSchema: z.ZodType<ContextBuildRequest, z.ZodTypeDef, ContextBuildRequest>;
```

## `contextConflictSchema`

Runtime schema for Context Conflict.

- Kind: constant
- Import: `import { contextConflictSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare const contextConflictSchema: z.ZodObject<{ conflictGroupId: z.ZodString; itemIds: z.ZodArray<z.ZodString, "many">; resolution: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { conflictGroupId: string; itemIds: string[]; resolution?: string | undefined; }, { conflictGroupId: string; itemIds: string[]; resolution?: string | undefined; }>;
```

## `contextEnvelopeSchema`

Runtime schema for Context Envelope.

- Kind: constant
- Import: `import { contextEnvelopeSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare const contextEnvelopeSchema: z.ZodType<ContextEnvelope, z.ZodTypeDef, ContextEnvelope>;
```

## `contextItemSchema`

Runtime schema for Context Item.

- Kind: constant
- Import: `import { contextItemSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const contextItemSchema: (typeof import('@codesoul-co/hypha-memory'))['contextItemSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `contextProfileSpecDefinition`

Runtime validation entrypoint for the Context Profile spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { contextProfileSpecDefinition } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare const contextProfileSpecDefinition: SpecSchemaDefinition<ContextProfileSpec>;
```

## `contextProfileSpecExample`

Valid example value for Context Profile Spec.

- Kind: constant
- Import: `import { contextProfileSpecExample } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare const contextProfileSpecExample: ContextProfileSpec;
```

## `contextProfileSpecJsonSchema`

JSON Schema for Context Profile Spec.

- Kind: constant
- Import: `import { contextProfileSpecJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare const contextProfileSpecJsonSchema: JsonSchema;
```

## `contextProfileSpecSchema`

Runtime schema for Context Profile Spec.

- Kind: constant
- Import: `import { contextProfileSpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare const contextProfileSpecSchema: z.ZodType<ContextProfileSpec, z.ZodTypeDef, ContextProfileSpec>;
```

## `contextProvenanceLabelSchema`

Runtime schema for Context Provenance Label.

- Kind: constant
- Import: `import { contextProvenanceLabelSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare const contextProvenanceLabelSchema: z.ZodObject<{ sourceType: z.ZodEnum<["system", "workflow_state", "messages", "working_memory", "long_term_memory", "tool_observation", "artifact", "human_review", "custom"]>; sourceId: z.ZodString; memoryId: z.ZodOptional<z.ZodString>; memoryVersionId: z.ZodOptional<z.ZodString>; authority: z.ZodOptional<z.ZodEnum<["unverified", "user_asserted", "system_observed", "verified", "authoritative"]>>; observedAt: z.ZodOptional<z.ZodString>; citationLabel: z.ZodString; }, "strip", z.ZodTypeAny, { sourceType: "artifact" | "custom" | "human_review" | "tool_observation" | "workflow_state" | "system" | "messages" | "working_memory" | "long_term_memory"; sourceId: string; citationLabel: string; memoryId?: string | undefined; memoryVersionId?: string | undefined; authority?: "unverified" | "user_asserted" | "system_observed" | "verified" | "authoritative" | undefined; observedAt?: string | undefined; }, { sourceType: "artifact" | "custom" | "human_review" | "tool_observation" | "workflow_state" | "system" | "messages" | "working_memory" | "long_term_memory"; sourceId: string; citationLabel: string; memoryId?: string | undefined; memoryVersionId?: string | undefined; authority?: "unverified" | "user_asserted" | "system_observed" | "verified" | "authoritative" | undefined; observedAt?: string | undefined; }>;
```

## `contextSourceBudgetSchema`

Runtime schema for Context Source Budget.

- Kind: constant
- Import: `import { contextSourceBudgetSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare const contextSourceBudgetSchema: z.ZodObject<{ sourceId: z.ZodString; minTokens: z.ZodOptional<z.ZodNumber>; targetTokens: z.ZodOptional<z.ZodNumber>; maxTokens: z.ZodNumber; required: z.ZodBoolean; overflowPolicy: z.ZodEnum<["drop", "truncate", "summarize", "spill_to_artifact", "fail"]>; }, "strip", z.ZodTypeAny, { required: boolean; sourceId: string; maxTokens: number; overflowPolicy: "summarize" | "fail" | "drop" | "truncate" | "spill_to_artifact"; minTokens?: number | undefined; targetTokens?: number | undefined; }, { required: boolean; sourceId: string; maxTokens: number; overflowPolicy: "summarize" | "fail" | "drop" | "truncate" | "spill_to_artifact"; minTokens?: number | undefined; targetTokens?: number | undefined; }>;
```

## `contextSourceSpecSchema`

Runtime schema for Context Source Spec.

- Kind: constant
- Import: `import { contextSourceSpecSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare const contextSourceSpecSchema: z.ZodType<ContextSourceSpec, z.ZodTypeDef, ContextSourceSpec>;
```

## `contextTruncationRecordSchema`

Runtime schema for Context Truncation Record.

- Kind: constant
- Import: `import { contextTruncationRecordSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare const contextTruncationRecordSchema: z.ZodObject<{ itemId: z.ZodString; originalTokens: z.ZodNumber; retainedTokens: z.ZodNumber; method: z.ZodEnum<["drop", "truncate", "summarize", "spill_to_artifact"]>; reason: z.ZodString; }, "strip", z.ZodTypeAny, { reason: string; itemId: string; originalTokens: number; retainedTokens: number; method: "summarize" | "drop" | "truncate" | "spill_to_artifact"; }, { reason: string; itemId: string; originalTokens: number; retainedTokens: number; method: "summarize" | "drop" | "truncate" | "spill_to_artifact"; }>;
```

## `promptSegmentSchema`

Runtime schema for Prompt Segment.

- Kind: constant
- Import: `import { promptSegmentSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare const promptSegmentSchema: z.ZodObject<{ id: z.ZodString; role: z.ZodEnum<["system", "developer", "user", "assistant", "tool", "data"]>; text: z.ZodString; tokenCount: z.ZodNumber; trustLevel: z.ZodEnum<["trusted_instruction", "trusted_data", "untrusted_data"]>; sourceRefs: z.ZodArray<z.ZodString, "many">; required: z.ZodOptional<z.ZodBoolean>; artifactRefs: z.ZodOptional<z.ZodArray<z.ZodObject<{ id: z.ZodString; path: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; contentType: z.ZodLiteral<"text/plain; charset=utf-8">; scopeHash: z.ZodString; profileRevision: z.ZodString; sourceItemId: z.ZodString; createdAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; path: string; createdAt: string; scopeHash: string; contentType: "text/plain; charset=utf-8"; sizeBytes: number; profileRevision: string; sourceItemId: string; contentHash: string; expiresAt?: string | undefined; }, { id: string; path: string; createdAt: string; scopeHash: string; contentType: "text/plain; charset=utf-8"; sizeBytes: number; profileRevision: string; sourceItemId: string; contentHash: string; expiresAt?: string | undefined; }>, "many">>; }, "strip", z.ZodTypeAny, { id: string; text: string; role: "tool" | "system" | "developer" | "user" | "assistant" | "data"; tokenCount: number; trustLevel: "trusted_instruction" | "trusted_data" | "untrusted_data"; sourceRefs: string[]; required?: boolean | undefined; artifactRefs?: { id: string; path: string; createdAt: string; scopeHash: string; contentType: "text/plain; charset=utf-8"; sizeBytes: number; profileRevision: string; sourceItemId: string; contentHash: string; expiresAt?: string | undefined; }[] | undefined; }, { id: string; text: string; role: "tool" | "system" | "developer" | "user" | "assistant" | "data"; tokenCount: number; trustLevel: "trusted_instruction" | "trusted_data" | "untrusted_data"; sourceRefs: string[]; required?: boolean | undefined; artifactRefs?: { id: string; path: string; createdAt: string; scopeHash: string; contentType: "text/plain; charset=utf-8"; sizeBytes: number; profileRevision: string; sourceItemId: string; contentHash: string; expiresAt?: string | undefined; }[] | undefined; }>;
```

## `validateContextEnvelope`

Validate Context Envelope function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateContextEnvelope } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare function validateContextEnvelope(input: unknown): ContextEnvelope;
```

### Call signature

```text
validateContextEnvelope(input: unknown): ContextEnvelope
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ContextEnvelope`
- Description: The return contract is defined by the type shown above.

## `validateContextItem`

Validate Context Item function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateContextItem } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare function validateContextItem(input: unknown): ContextItem;
```

### Call signature

```text
validateContextItem(input: unknown): ContextItem
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ContextItem`
- Description: The return contract is defined by the type shown above.

## `validateContextProfileSpec`

Validate Context Profile Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateContextProfileSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### Declaration

```text
export declare function validateContextProfileSpec(input: unknown): ContextProfileSpec;
```

### Call signature

```text
validateContextProfileSpec(input: unknown): ContextProfileSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ContextProfileSpec`
- Description: The return contract is defined by the type shown above.
