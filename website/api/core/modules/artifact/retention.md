# `@codesoul-co/hypha-core` / `modules/artifact/retention`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/artifact/retention.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)
- Exports: **14**

## Using this module

Use the Retention module for using the public contracts and operations for this capability boundary. It exports 2 classes, 9 constants, 3 functions.

### Import from the package entrypoint

```ts
import {
  DefaultArtifactRetentionEvaluator,
  DefaultArtifactRetentionProcessor,
  artifactRetentionContractJsonSchemas,
  artifactRetentionDecisionJsonSchema,
  artifactRetentionDecisionSchema,
  artifactRetentionEvaluationRequestJsonSchema,
  artifactRetentionEvaluationRequestSchema,
  artifactRetentionProcessRequestJsonSchema,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 9 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { artifactRetentionDecisionSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = artifactRetentionDecisionSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultArtifactRetentionEvaluator` | class | <code>new DefaultArtifactRetentionEvaluator(): DefaultArtifactRetentionEvaluator</code> | Default Artifact Retention Evaluator class with 2 public constructor or member entries; its exact declarations are listed below. |
| `DefaultArtifactRetentionProcessor` | class | <code>new DefaultArtifactRetentionProcessor(options: DefaultArtifactRetentionProcessorOptions): DefaultArtifactRetentionProcessor</code> | Default Artifact Retention Processor class with 2 public constructor or member entries; its exact declarations are listed below. |
| `artifactRetentionContractJsonSchemas` | constant | <code>const artifactRetentionContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Artifact Retention Contract JSON Schemas constant exported by the `modules/artifact/retention` module. |
| `artifactRetentionDecisionJsonSchema` | constant | <code>const artifactRetentionDecisionJsonSchema: JsonSchema</code> | JSON Schema for Artifact Retention Decision. |
| `artifactRetentionDecisionSchema` | constant | <code>const artifactRetentionDecisionSchema: z.ZodObject&lt;{ action: z.ZodEnum&lt;["retain", "archive", "delete"]&gt;; reason: z.ZodEnum&lt;["not_due", "already_terminal", "archive_after", "delete_after", "expired", "legal_hold", "referenced", "retain_final", "retain_failure"]&gt;; effectiveAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { reason: "expired" &#124; "already_terminal" &#124; "not_due" &#124; "archive_after" &#124; "delete_after...</code> | Runtime schema for Artifact Retention Decision. |
| `artifactRetentionEvaluationRequestJsonSchema` | constant | <code>const artifactRetentionEvaluationRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact Retention Evaluation Request. |
| `artifactRetentionEvaluationRequestSchema` | constant | <code>const artifactRetentionEvaluationRequestSchema: z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; versionNumber: z.ZodNumber; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; sessionId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodString; description: ...</code> | Runtime schema for Artifact Retention Evaluation Request. |
| `artifactRetentionProcessRequestJsonSchema` | constant | <code>const artifactRetentionProcessRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact Retention Process Request. |
| `artifactRetentionProcessRequestSchema` | constant | <code>const artifactRetentionProcessRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadat...</code> | Runtime schema for Artifact Retention Process Request. |
| `artifactRetentionProcessResultJsonSchema` | constant | <code>const artifactRetentionProcessResultJsonSchema: JsonSchema</code> | JSON Schema for Artifact Retention Process Result. |
| `artifactRetentionProcessResultSchema` | constant | <code>const artifactRetentionProcessResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ artifactId: z.ZodString; versionId: z.ZodString; workspaceId: z.ZodString; decision: z.ZodObject&lt;{ action: z.ZodEnum&lt;["retain", "archive", "delete"]&gt;; reason: z.ZodEnum&lt;["not_due", "already_terminal", "archive_after", "delete_after", "expired", "legal_hold", "referenced", "retain_final", "retain_failure"]&gt;; effectiveAt: z.ZodOptional&lt;z.ZodStrin...</code> | Runtime schema for Artifact Retention Process Result. |
| `validateArtifactRetentionEvaluationRequest` | function | <code>validateArtifactRetentionEvaluationRequest(input: unknown): ArtifactRetentionEvaluationRequest</code> | Validate Artifact Retention Evaluation Request function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactRetentionProcessRequest` | function | <code>validateArtifactRetentionProcessRequest(input: unknown): ArtifactRetentionProcessRequest</code> | Validate Artifact Retention Process Request function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactRetentionProcessResult` | function | <code>validateArtifactRetentionProcessResult(input: unknown): ArtifactRetentionProcessResult</code> | Validate Artifact Retention Process Result function with 1 public call signature; parameters and return types are listed below. |

## `DefaultArtifactRetentionEvaluator`

Default Artifact Retention Evaluator class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultArtifactRetentionEvaluator } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### Declaration

```text
export declare class DefaultArtifactRetentionEvaluator implements ArtifactRetentionEvaluator {
    evaluate(input: ArtifactRetentionEvaluationRequest): ArtifactRetentionDecision;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DefaultArtifactRetentionEvaluator</code> | Creates an instance of this class. |
| `evaluate` | method | <code>evaluate(input: ArtifactRetentionEvaluationRequest): ArtifactRetentionDecision</code> | Public method; parameters and return type are shown in the signature. |

## `DefaultArtifactRetentionProcessor`

Default Artifact Retention Processor class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultArtifactRetentionProcessor } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### Declaration

```text
export declare class DefaultArtifactRetentionProcessor implements ArtifactRetentionProcessor {
    constructor(options: DefaultArtifactRetentionProcessorOptions);
    process(input: ArtifactRetentionProcessRequest): Promise<ArtifactRetentionProcessResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DefaultArtifactRetentionProcessorOptions): DefaultArtifactRetentionProcessor</code> | Creates an instance of this class. |
| `process` | method | <code>process(input: ArtifactRetentionProcessRequest): Promise&lt;ArtifactRetentionProcessResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `artifactRetentionContractJsonSchemas`

Artifact Retention Contract JSON Schemas constant exported by the `modules/artifact/retention` module.

- Kind: constant
- Import: `import { artifactRetentionContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### Declaration

```text
export declare const artifactRetentionContractJsonSchemas: Record<string, JsonSchema>;
```

## `artifactRetentionDecisionJsonSchema`

JSON Schema for Artifact Retention Decision.

- Kind: constant
- Import: `import { artifactRetentionDecisionJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### Declaration

```text
export declare const artifactRetentionDecisionJsonSchema: JsonSchema;
```

## `artifactRetentionDecisionSchema`

Runtime schema for Artifact Retention Decision.

- Kind: constant
- Import: `import { artifactRetentionDecisionSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### Declaration

```text
export declare const artifactRetentionDecisionSchema: z.ZodObject<{ action: z.ZodEnum<["retain", "archive", "delete"]>; reason: z.ZodEnum<["not_due", "already_terminal", "archive_after", "delete_after", "expired", "legal_hold", "referenced", "retain_final", "retain_failure"]>; effectiveAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }, { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }>;
```

## `artifactRetentionEvaluationRequestJsonSchema`

JSON Schema for Artifact Retention Evaluation Request.

- Kind: constant
- Import: `import { artifactRetentionEvaluationRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### Declaration

```text
export declare const artifactRetentionEvaluationRequestJsonSchema: JsonSchema;
```

## `artifactRetentionEvaluationRequestSchema`

Runtime schema for Artifact Retention Evaluation Request.

- Kind: constant
- Import: `import { artifactRetentionEvaluationRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const artifactRetentionEvaluationRequestSchema: (typeof import('@codesoul-co/hypha-core'))['artifactRetentionEvaluationRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `artifactRetentionProcessRequestJsonSchema`

JSON Schema for Artifact Retention Process Request.

- Kind: constant
- Import: `import { artifactRetentionProcessRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### Declaration

```text
export declare const artifactRetentionProcessRequestJsonSchema: JsonSchema;
```

## `artifactRetentionProcessRequestSchema`

Runtime schema for Artifact Retention Process Request.

- Kind: constant
- Import: `import { artifactRetentionProcessRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### Declaration

```text
export declare const artifactRetentionProcessRequestSchema: z.ZodObject<{ operationId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; artifactId: z.ZodString; evaluatedAt: z.ZodOptional<z.ZodString>; dryRun: z.ZodOptional<z.ZodBoolean>; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; idempotencyKey?: string | undefined; evaluatedAt?: string | undefined; dryRun?: boolean | undefined; }, { operationId: string; artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; idempotencyKey?: string | undefined; evaluatedAt?: string | undefined; dryRun?: boolean | undefined; }>;
```

## `artifactRetentionProcessResultJsonSchema`

JSON Schema for Artifact Retention Process Result.

- Kind: constant
- Import: `import { artifactRetentionProcessResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### Declaration

```text
export declare const artifactRetentionProcessResultJsonSchema: JsonSchema;
```

## `artifactRetentionProcessResultSchema`

Runtime schema for Artifact Retention Process Result.

- Kind: constant
- Import: `import { artifactRetentionProcessResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### Declaration

```text
export declare const artifactRetentionProcessResultSchema: z.ZodEffects<z.ZodObject<{ artifactId: z.ZodString; versionId: z.ZodString; workspaceId: z.ZodString; decision: z.ZodObject<{ action: z.ZodEnum<["retain", "archive", "delete"]>; reason: z.ZodEnum<["not_due", "already_terminal", "archive_after", "delete_after", "expired", "legal_hold", "referenced", "retain_final", "retain_failure"]>; effectiveAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }, { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }>; applied: z.ZodBoolean; replayed: z.ZodBoolean; dryRun: z.ZodBoolean; }, "strict", z.ZodTypeAny, { artifactId: string; versionId: string; workspaceId: string; decision: { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }; applied: boolean; dryRun: boolean; replayed: boolean; }, { artifactId: string; versionId: string; workspaceId: string; decision: { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }; applied: boolean; dryRun: boolean; replayed: boolean; }>, { artifactId: string; versionId: string; workspaceId: string; decision: { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }; applied: boolean; dryRun: boolean; replayed: boolean; }, { artifactId: string; versionId: string; workspaceId: string; decision: { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }; applied: boolean; dryRun: boolean; replayed: boolean; }>;
```

## `validateArtifactRetentionEvaluationRequest`

Validate Artifact Retention Evaluation Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactRetentionEvaluationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### Declaration

```text
export declare function validateArtifactRetentionEvaluationRequest(input: unknown): ArtifactRetentionEvaluationRequest;
```

### Call signature

```text
validateArtifactRetentionEvaluationRequest(input: unknown): ArtifactRetentionEvaluationRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactRetentionEvaluationRequest`
- Description: The return contract is defined by the type shown above.

## `validateArtifactRetentionProcessRequest`

Validate Artifact Retention Process Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactRetentionProcessRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### Declaration

```text
export declare function validateArtifactRetentionProcessRequest(input: unknown): ArtifactRetentionProcessRequest;
```

### Call signature

```text
validateArtifactRetentionProcessRequest(input: unknown): ArtifactRetentionProcessRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactRetentionProcessRequest`
- Description: The return contract is defined by the type shown above.

## `validateArtifactRetentionProcessResult`

Validate Artifact Retention Process Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactRetentionProcessResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### Declaration

```text
export declare function validateArtifactRetentionProcessResult(input: unknown): ArtifactRetentionProcessResult;
```

### Call signature

```text
validateArtifactRetentionProcessResult(input: unknown): ArtifactRetentionProcessResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactRetentionProcessResult`
- Description: The return contract is defined by the type shown above.
