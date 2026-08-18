# `@codesoul-co/hypha-core` / `contracts/runtime-replay-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-replay-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)
- Exports: **22**

## Using this module

Use the Runtime replay schemas module for declaring and runtime-validating contracts. It exports 18 constants, 4 functions.

### Import from the package entrypoint

```ts
import {
  runtimeReplayContractDefinitions,
  runtimeReplayContractJsonSchemas,
  runtimeReplayRequestDefinition,
  runtimeReplayRequestExample,
  runtimeReplayRequestJsonSchema,
  runtimeReplayRequestSchema,
  runtimeReplayResultDefinition,
  runtimeReplayResultExample,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 18 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { runtimeReplayRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeReplayRequestSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeReplayContractDefinitions` | constant | <code>const runtimeReplayContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeReplayRequest&gt;, SpecSchemaDefinition&lt;RuntimeReplayResult&gt;, SpecSchemaDefinition&lt;RuntimeReplayVerificationRequest&gt;, SpecSchemaDefinition&lt;RuntimeReplayVerificationResult&gt;]</code> | Runtime Replay Contract Definitions constant exported by the `contracts/runtime-replay-schemas` module. |
| `runtimeReplayContractJsonSchemas` | constant | <code>const runtimeReplayContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Runtime Replay Contract JSON Schemas constant exported by the `contracts/runtime-replay-schemas` module. |
| `runtimeReplayRequestDefinition` | constant | <code>const runtimeReplayRequestDefinition: SpecSchemaDefinition&lt;RuntimeReplayRequest&gt;</code> | Runtime Replay Request Definition constant exported by the `contracts/runtime-replay-schemas` module. |
| `runtimeReplayRequestExample` | constant | <code>const runtimeReplayRequestExample: RuntimeReplayRequest</code> | Valid example value for Runtime Replay Request. |
| `runtimeReplayRequestJsonSchema` | constant | <code>const runtimeReplayRequestJsonSchema: JsonSchema</code> | JSON Schema for Runtime Replay Request. |
| `runtimeReplayRequestSchema` | constant | <code>const runtimeReplayRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string &#124; unde...</code> | Runtime schema for Runtime Replay Request. |
| `runtimeReplayResultDefinition` | constant | <code>const runtimeReplayResultDefinition: SpecSchemaDefinition&lt;RuntimeReplayResult&gt;</code> | Runtime Replay Result Definition constant exported by the `contracts/runtime-replay-schemas` module. |
| `runtimeReplayResultExample` | constant | <code>const runtimeReplayResultExample: RuntimeReplayResult</code> | Valid example value for Runtime Replay Result. |
| `runtimeReplayResultJsonSchema` | constant | <code>const runtimeReplayResultJsonSchema: JsonSchema</code> | JSON Schema for Runtime Replay Result. |
| `runtimeReplayResultSchema` | constant | <code>const runtimeReplayResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ sourceRunId: z.ZodString; mode: z.ZodLiteral&lt;"deterministic"&gt;; checkpointId: z.ZodString; baseEventSequence: z.ZodNumber; targetEventSequence: z.ZodNumber; replayedEventCount: z.ZodNumber; appliedEventCount: z.ZodNumber; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; workflowRevision: z.ZodString; processHash: z.ZodString; dependencySnapshotRef: z.ZodString; ...</code> | Runtime schema for Runtime Replay Result. |
| `runtimeReplayVerificationRequestDefinition` | constant | <code>const runtimeReplayVerificationRequestDefinition: SpecSchemaDefinition&lt;RuntimeReplayVerificationRequest&gt;</code> | Runtime Replay Verification Request Definition constant exported by the `contracts/runtime-replay-schemas` module. |
| `runtimeReplayVerificationRequestExample` | constant | <code>const runtimeReplayVerificationRequestExample: RuntimeReplayVerificationRequest</code> | Valid example value for Runtime Replay Verification Request. |
| `runtimeReplayVerificationRequestJsonSchema` | constant | <code>const runtimeReplayVerificationRequestJsonSchema: JsonSchema</code> | JSON Schema for Runtime Replay Verification Request. |
| `runtimeReplayVerificationRequestSchema` | constant | <code>const runtimeReplayVerificationRequestSchema: z.ZodObject&lt;{ replay: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; u...</code> | Runtime schema for Runtime Replay Verification Request. |
| `runtimeReplayVerificationResultDefinition` | constant | <code>const runtimeReplayVerificationResultDefinition: SpecSchemaDefinition&lt;RuntimeReplayVerificationResult&gt;</code> | Runtime Replay Verification Result Definition constant exported by the `contracts/runtime-replay-schemas` module. |
| `runtimeReplayVerificationResultExample` | constant | <code>const runtimeReplayVerificationResultExample: RuntimeReplayVerificationResult</code> | Valid example value for Runtime Replay Verification Result. |
| `runtimeReplayVerificationResultJsonSchema` | constant | <code>const runtimeReplayVerificationResultJsonSchema: JsonSchema</code> | JSON Schema for Runtime Replay Verification Result. |
| `runtimeReplayVerificationResultSchema` | constant | <code>const runtimeReplayVerificationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ replay: z.ZodEffects&lt;z.ZodObject&lt;{ sourceRunId: z.ZodString; mode: z.ZodLiteral&lt;"deterministic"&gt;; checkpointId: z.ZodString; baseEventSequence: z.ZodNumber; targetEventSequence: z.ZodNumber; replayedEventCount: z.ZodNumber; appliedEventCount: z.ZodNumber; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; workflowRevision: z.ZodString; processHash: z....</code> | Runtime schema for Runtime Replay Verification Result. |
| `validateRuntimeReplayRequest` | function | <code>validateRuntimeReplayRequest(input: unknown): RuntimeReplayRequest</code> | Validate Runtime Replay Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeReplayResult` | function | <code>validateRuntimeReplayResult(input: unknown): RuntimeReplayResult</code> | Validate Runtime Replay Result function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeReplayVerificationRequest` | function | <code>validateRuntimeReplayVerificationRequest(input: unknown): RuntimeReplayVerificationRequest</code> | Validate Runtime Replay Verification Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeReplayVerificationResult` | function | <code>validateRuntimeReplayVerificationResult(input: unknown): RuntimeReplayVerificationResult</code> | Validate Runtime Replay Verification Result function with 1 public call signature; parameters and return types are listed below. |

## `runtimeReplayContractDefinitions`

Runtime Replay Contract Definitions constant exported by the `contracts/runtime-replay-schemas` module.

- Kind: constant
- Import: `import { runtimeReplayContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayContractDefinitions: readonly [SpecSchemaDefinition<RuntimeReplayRequest>, SpecSchemaDefinition<RuntimeReplayResult>, SpecSchemaDefinition<RuntimeReplayVerificationRequest>, SpecSchemaDefinition<RuntimeReplayVerificationResult>];
```

## `runtimeReplayContractJsonSchemas`

Runtime Replay Contract JSON Schemas constant exported by the `contracts/runtime-replay-schemas` module.

- Kind: constant
- Import: `import { runtimeReplayContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeReplayRequestDefinition`

Runtime Replay Request Definition constant exported by the `contracts/runtime-replay-schemas` module.

- Kind: constant
- Import: `import { runtimeReplayRequestDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayRequestDefinition: SpecSchemaDefinition<RuntimeReplayRequest>;
```

## `runtimeReplayRequestExample`

Valid example value for Runtime Replay Request.

- Kind: constant
- Import: `import { runtimeReplayRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayRequestExample: RuntimeReplayRequest;
```

## `runtimeReplayRequestJsonSchema`

JSON Schema for Runtime Replay Request.

- Kind: constant
- Import: `import { runtimeReplayRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayRequestJsonSchema: JsonSchema;
```

## `runtimeReplayRequestSchema`

Runtime schema for Runtime Replay Request.

- Kind: constant
- Import: `import { runtimeReplayRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; checkpointId: z.ZodOptional<z.ZodString>; expectedWorkflowRevision: z.ZodString; expectedProcessHash: z.ZodString; expectedDependencySnapshotRef: z.ZodString; toSequence: z.ZodOptional<z.ZodNumber>; requestedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; requestedAt: string; expectedWorkflowRevision: string; expectedProcessHash: string; expectedDependencySnapshotRef: string; toSequence?: number | undefined; checkpointId?: string | undefined; }, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; requestedAt: string; expectedWorkflowRevision: string; expectedProcessHash: string; expectedDependencySnapshotRef: string; toSequence?: number | undefined; checkpointId?: string | undefined; }>;
```

## `runtimeReplayResultDefinition`

Runtime Replay Result Definition constant exported by the `contracts/runtime-replay-schemas` module.

- Kind: constant
- Import: `import { runtimeReplayResultDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayResultDefinition: SpecSchemaDefinition<RuntimeReplayResult>;
```

## `runtimeReplayResultExample`

Valid example value for Runtime Replay Result.

- Kind: constant
- Import: `import { runtimeReplayResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayResultExample: RuntimeReplayResult;
```

## `runtimeReplayResultJsonSchema`

JSON Schema for Runtime Replay Result.

- Kind: constant
- Import: `import { runtimeReplayResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayResultJsonSchema: JsonSchema;
```

## `runtimeReplayResultSchema`

Runtime schema for Runtime Replay Result.

- Kind: constant
- Import: `import { runtimeReplayResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeReplayResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeReplayResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeReplayVerificationRequestDefinition`

Runtime Replay Verification Request Definition constant exported by the `contracts/runtime-replay-schemas` module.

- Kind: constant
- Import: `import { runtimeReplayVerificationRequestDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayVerificationRequestDefinition: SpecSchemaDefinition<RuntimeReplayVerificationRequest>;
```

## `runtimeReplayVerificationRequestExample`

Valid example value for Runtime Replay Verification Request.

- Kind: constant
- Import: `import { runtimeReplayVerificationRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayVerificationRequestExample: RuntimeReplayVerificationRequest;
```

## `runtimeReplayVerificationRequestJsonSchema`

JSON Schema for Runtime Replay Verification Request.

- Kind: constant
- Import: `import { runtimeReplayVerificationRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayVerificationRequestJsonSchema: JsonSchema;
```

## `runtimeReplayVerificationRequestSchema`

Runtime schema for Runtime Replay Verification Request.

- Kind: constant
- Import: `import { runtimeReplayVerificationRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayVerificationRequestSchema: z.ZodObject<{ replay: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; checkpointId: z.ZodOptional<z.ZodString>; expectedWorkflowRevision: z.ZodString; expectedProcessHash: z.ZodString; expectedDependencySnapshotRef: z.ZodString; toSequence: z.ZodOptional<z.ZodNumber>; requestedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; requestedAt: string; expectedWorkflowRevision: string; expectedProcessHash: string; expectedDependencySnapshotRef: string; toSequence?: number | undefined; checkpointId?: string | undefined; }, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; requestedAt: string; expectedWorkflowRevision: string; expectedProcessHash: string; expectedDependencySnapshotRef: string; toSequence?: number | undefined; checkpointId?: string | undefined; }>; expectedSnapshotChecksum: z.ZodString; }, "strict", z.ZodTypeAny, { replay: { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; requestedAt: string; expectedWorkflowRevision: string; expectedProcessHash: string; expectedDependencySnapshotRef: string; toSequence?: number | undefined; checkpointId?: string | undefined; }; expectedSnapshotChecksum: string; }, { replay: { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; requestedAt: string; expectedWorkflowRevision: string; expectedProcessHash: string; expectedDependencySnapshotRef: string; toSequence?: number | undefined; checkpointId?: string | undefined; }; expectedSnapshotChecksum: string; }>;
```

## `runtimeReplayVerificationResultDefinition`

Runtime Replay Verification Result Definition constant exported by the `contracts/runtime-replay-schemas` module.

- Kind: constant
- Import: `import { runtimeReplayVerificationResultDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayVerificationResultDefinition: SpecSchemaDefinition<RuntimeReplayVerificationResult>;
```

## `runtimeReplayVerificationResultExample`

Valid example value for Runtime Replay Verification Result.

- Kind: constant
- Import: `import { runtimeReplayVerificationResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayVerificationResultExample: RuntimeReplayVerificationResult;
```

## `runtimeReplayVerificationResultJsonSchema`

JSON Schema for Runtime Replay Verification Result.

- Kind: constant
- Import: `import { runtimeReplayVerificationResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare const runtimeReplayVerificationResultJsonSchema: JsonSchema;
```

## `runtimeReplayVerificationResultSchema`

Runtime schema for Runtime Replay Verification Result.

- Kind: constant
- Import: `import { runtimeReplayVerificationResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeReplayVerificationResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeReplayVerificationResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `validateRuntimeReplayRequest`

Validate Runtime Replay Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeReplayRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare function validateRuntimeReplayRequest(input: unknown): RuntimeReplayRequest;
```

### Call signature

```text
validateRuntimeReplayRequest(input: unknown): RuntimeReplayRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeReplayRequest`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeReplayResult`

Validate Runtime Replay Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeReplayResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare function validateRuntimeReplayResult(input: unknown): RuntimeReplayResult;
```

### Call signature

```text
validateRuntimeReplayResult(input: unknown): RuntimeReplayResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeReplayResult`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeReplayVerificationRequest`

Validate Runtime Replay Verification Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeReplayVerificationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare function validateRuntimeReplayVerificationRequest(input: unknown): RuntimeReplayVerificationRequest;
```

### Call signature

```text
validateRuntimeReplayVerificationRequest(input: unknown): RuntimeReplayVerificationRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeReplayVerificationRequest`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeReplayVerificationResult`

Validate Runtime Replay Verification Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeReplayVerificationResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### Declaration

```text
export declare function validateRuntimeReplayVerificationResult(input: unknown): RuntimeReplayVerificationResult;
```

### Call signature

```text
validateRuntimeReplayVerificationResult(input: unknown): RuntimeReplayVerificationResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeReplayVerificationResult`
- Description: The return contract is defined by the type shown above.
