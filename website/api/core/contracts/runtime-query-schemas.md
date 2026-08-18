# `@codesoul-co/hypha-core` / `contracts/runtime-query-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-query-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)
- Exports: **22**

## Using this module

Use the Runtime query schemas module for declaring and runtime-validating contracts. It exports 18 constants, 4 functions.

### Import from the package entrypoint

```ts
import {
  runtimeQueryContractDefinitions,
  runtimeQueryContractJsonSchemas,
  runtimeQueryRequestDefinition,
  runtimeQueryRequestExample,
  runtimeQueryRequestJsonSchema,
  runtimeQueryRequestSchema,
  runtimeRunViewDefinition,
  runtimeRunViewExample,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 18 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { runtimeQueryRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeQueryRequestSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeQueryContractDefinitions` | constant | <code>const runtimeQueryContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeQueryRequest&gt;, SpecSchemaDefinition&lt;RuntimeTimelineRequest&gt;, SpecSchemaDefinition&lt;RuntimeRunView&gt;, SpecSchemaDefinition&lt;RuntimeStateExplanation&gt;]</code> | Runtime Query Contract Definitions constant exported by the `contracts/runtime-query-schemas` module. |
| `runtimeQueryContractJsonSchemas` | constant | <code>const runtimeQueryContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Runtime Query Contract JSON Schemas constant exported by the `contracts/runtime-query-schemas` module. |
| `runtimeQueryRequestDefinition` | constant | <code>const runtimeQueryRequestDefinition: SpecSchemaDefinition&lt;RuntimeQueryRequest&gt;</code> | Runtime Query Request Definition constant exported by the `contracts/runtime-query-schemas` module. |
| `runtimeQueryRequestExample` | constant | <code>const runtimeQueryRequestExample: RuntimeQueryRequest</code> | Valid example value for Runtime Query Request. |
| `runtimeQueryRequestJsonSchema` | constant | <code>const runtimeQueryRequestJsonSchema: JsonSchema</code> | JSON Schema for Runtime Query Request. |
| `runtimeQueryRequestSchema` | constant | <code>const runtimeQueryRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string &#124; undef...</code> | Runtime schema for Runtime Query Request. |
| `runtimeRunViewDefinition` | constant | <code>const runtimeRunViewDefinition: SpecSchemaDefinition&lt;RuntimeRunView&gt;</code> | Runtime Run View Definition constant exported by the `contracts/runtime-query-schemas` module. |
| `runtimeRunViewExample` | constant | <code>const runtimeRunViewExample: RuntimeRunView</code> | Valid example value for Runtime Run View. |
| `runtimeRunViewJsonSchema` | constant | <code>const runtimeRunViewJsonSchema: JsonSchema</code> | JSON Schema for Runtime Run View. |
| `runtimeRunViewSchema` | constant | <code>const runtimeRunViewSchema: z.ZodEffects&lt;z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string...</code> | Runtime schema for Runtime Run View. |
| `runtimeStateExplanationDefinition` | constant | <code>const runtimeStateExplanationDefinition: SpecSchemaDefinition&lt;RuntimeStateExplanation&gt;</code> | Runtime State Explanation Definition constant exported by the `contracts/runtime-query-schemas` module. |
| `runtimeStateExplanationExample` | constant | <code>const runtimeStateExplanationExample: RuntimeStateExplanation</code> | Valid example value for Runtime State Explanation. |
| `runtimeStateExplanationJsonSchema` | constant | <code>const runtimeStateExplanationJsonSchema: JsonSchema</code> | JSON Schema for Runtime State Explanation. |
| `runtimeStateExplanationSchema` | constant | <code>const runtimeStateExplanationSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string &#124; u...</code> | Runtime schema for Runtime State Explanation. |
| `runtimeTimelineRequestDefinition` | constant | <code>const runtimeTimelineRequestDefinition: SpecSchemaDefinition&lt;RuntimeTimelineRequest&gt;</code> | Runtime Timeline Request Definition constant exported by the `contracts/runtime-query-schemas` module. |
| `runtimeTimelineRequestExample` | constant | <code>const runtimeTimelineRequestExample: RuntimeTimelineRequest</code> | Valid example value for Runtime Timeline Request. |
| `runtimeTimelineRequestJsonSchema` | constant | <code>const runtimeTimelineRequestJsonSchema: JsonSchema</code> | JSON Schema for Runtime Timeline Request. |
| `runtimeTimelineRequestSchema` | constant | <code>const runtimeTimelineRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?...</code> | Runtime schema for Runtime Timeline Request. |
| `validateRuntimeQueryRequest` | function | <code>validateRuntimeQueryRequest(input: unknown): RuntimeQueryRequest</code> | Validate Runtime Query Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeRunView` | function | <code>validateRuntimeRunView(input: unknown): RuntimeRunView</code> | Validate Runtime Run View function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeStateExplanation` | function | <code>validateRuntimeStateExplanation(input: unknown): RuntimeStateExplanation</code> | Validate Runtime State Explanation function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeTimelineRequest` | function | <code>validateRuntimeTimelineRequest(input: unknown): RuntimeTimelineRequest</code> | Validate Runtime Timeline Request function with 1 public call signature; parameters and return types are listed below. |

## `runtimeQueryContractDefinitions`

Runtime Query Contract Definitions constant exported by the `contracts/runtime-query-schemas` module.

- Kind: constant
- Import: `import { runtimeQueryContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeQueryContractDefinitions: readonly [SpecSchemaDefinition<RuntimeQueryRequest>, SpecSchemaDefinition<RuntimeTimelineRequest>, SpecSchemaDefinition<RuntimeRunView>, SpecSchemaDefinition<RuntimeStateExplanation>];
```

## `runtimeQueryContractJsonSchemas`

Runtime Query Contract JSON Schemas constant exported by the `contracts/runtime-query-schemas` module.

- Kind: constant
- Import: `import { runtimeQueryContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeQueryContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeQueryRequestDefinition`

Runtime Query Request Definition constant exported by the `contracts/runtime-query-schemas` module.

- Kind: constant
- Import: `import { runtimeQueryRequestDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeQueryRequestDefinition: SpecSchemaDefinition<RuntimeQueryRequest>;
```

## `runtimeQueryRequestExample`

Valid example value for Runtime Query Request.

- Kind: constant
- Import: `import { runtimeQueryRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeQueryRequestExample: RuntimeQueryRequest;
```

## `runtimeQueryRequestJsonSchema`

JSON Schema for Runtime Query Request.

- Kind: constant
- Import: `import { runtimeQueryRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeQueryRequestJsonSchema: JsonSchema;
```

## `runtimeQueryRequestSchema`

Runtime schema for Runtime Query Request.

- Kind: constant
- Import: `import { runtimeQueryRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeQueryRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; }, "strict", z.ZodTypeAny, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; }, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; }>;
```

## `runtimeRunViewDefinition`

Runtime Run View Definition constant exported by the `contracts/runtime-query-schemas` module.

- Kind: constant
- Import: `import { runtimeRunViewDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeRunViewDefinition: SpecSchemaDefinition<RuntimeRunView>;
```

## `runtimeRunViewExample`

Valid example value for Runtime Run View.

- Kind: constant
- Import: `import { runtimeRunViewExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeRunViewExample: RuntimeRunView;
```

## `runtimeRunViewJsonSchema`

JSON Schema for Runtime Run View.

- Kind: constant
- Import: `import { runtimeRunViewJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeRunViewJsonSchema: JsonSchema;
```

## `runtimeRunViewSchema`

Runtime schema for Runtime Run View.

- Kind: constant
- Import: `import { runtimeRunViewSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeRunViewSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRunViewSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeStateExplanationDefinition`

Runtime State Explanation Definition constant exported by the `contracts/runtime-query-schemas` module.

- Kind: constant
- Import: `import { runtimeStateExplanationDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeStateExplanationDefinition: SpecSchemaDefinition<RuntimeStateExplanation>;
```

## `runtimeStateExplanationExample`

Valid example value for Runtime State Explanation.

- Kind: constant
- Import: `import { runtimeStateExplanationExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeStateExplanationExample: RuntimeStateExplanation;
```

## `runtimeStateExplanationJsonSchema`

JSON Schema for Runtime State Explanation.

- Kind: constant
- Import: `import { runtimeStateExplanationJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeStateExplanationJsonSchema: JsonSchema;
```

## `runtimeStateExplanationSchema`

Runtime schema for Runtime State Explanation.

- Kind: constant
- Import: `import { runtimeStateExplanationSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeStateExplanationSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; runStatus: z.ZodEnum<[import("./runtime-projection").RuntimeOrchestrationRunStatus, ...import("./runtime-projection").RuntimeOrchestrationRunStatus[]]>; currentState: z.ZodOptional<z.ZodString>; stateAttempt: z.ZodNumber; statePath: z.ZodArray<z.ZodString, "many">; pendingWaitId: z.ZodOptional<z.ZodString>; pendingTransitionEventId: z.ZodOptional<z.ZodString>; pendingActivityIds: z.ZodArray<z.ZodString, "many">; lastEventSequence: z.ZodNumber; source: z.ZodLiteral<"runtime.orchestration.projection">; }, "strict", z.ZodTypeAny, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; runStatus: import("./runtime-projection").RuntimeOrchestrationRunStatus; statePath: string[]; stateAttempt: number; pendingActivityIds: string[]; lastEventSequence: number; source: "runtime.orchestration.projection"; currentState?: string | undefined; pendingWaitId?: string | undefined; pendingTransitionEventId?: string | undefined; }, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; runStatus: import("./runtime-projection").RuntimeOrchestrationRunStatus; statePath: string[]; stateAttempt: number; pendingActivityIds: string[]; lastEventSequence: number; source: "runtime.orchestration.projection"; currentState?: string | undefined; pendingWaitId?: string | undefined; pendingTransitionEventId?: string | undefined; }>;
```

## `runtimeTimelineRequestDefinition`

Runtime Timeline Request Definition constant exported by the `contracts/runtime-query-schemas` module.

- Kind: constant
- Import: `import { runtimeTimelineRequestDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeTimelineRequestDefinition: SpecSchemaDefinition<RuntimeTimelineRequest>;
```

## `runtimeTimelineRequestExample`

Valid example value for Runtime Timeline Request.

- Kind: constant
- Import: `import { runtimeTimelineRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeTimelineRequestExample: RuntimeTimelineRequest;
```

## `runtimeTimelineRequestJsonSchema`

JSON Schema for Runtime Timeline Request.

- Kind: constant
- Import: `import { runtimeTimelineRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeTimelineRequestJsonSchema: JsonSchema;
```

## `runtimeTimelineRequestSchema`

Runtime schema for Runtime Timeline Request.

- Kind: constant
- Import: `import { runtimeTimelineRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare const runtimeTimelineRequestSchema: z.ZodEffects<z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; fromSequence: z.ZodOptional<z.ZodNumber>; toSequence: z.ZodOptional<z.ZodNumber>; types: z.ZodOptional<z.ZodArray<z.ZodType<FrameworkEventType, z.ZodTypeDef, FrameworkEventType>, "many">>; limit: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; fromSequence?: number | undefined; toSequence?: number | undefined; types?: FrameworkEventType[] | undefined; limit?: number | undefined; }, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; fromSequence?: number | undefined; toSequence?: number | undefined; types?: FrameworkEventType[] | undefined; limit?: number | undefined; }>, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; fromSequence?: number | undefined; toSequence?: number | undefined; types?: FrameworkEventType[] | undefined; limit?: number | undefined; }, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; fromSequence?: number | undefined; toSequence?: number | undefined; types?: FrameworkEventType[] | undefined; limit?: number | undefined; }>;
```

## `validateRuntimeQueryRequest`

Validate Runtime Query Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeQueryRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare function validateRuntimeQueryRequest(input: unknown): RuntimeQueryRequest;
```

### Call signature

```text
validateRuntimeQueryRequest(input: unknown): RuntimeQueryRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeQueryRequest`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeRunView`

Validate Runtime Run View function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeRunView } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare function validateRuntimeRunView(input: unknown): RuntimeRunView;
```

### Call signature

```text
validateRuntimeRunView(input: unknown): RuntimeRunView
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeRunView`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeStateExplanation`

Validate Runtime State Explanation function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeStateExplanation } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare function validateRuntimeStateExplanation(input: unknown): RuntimeStateExplanation;
```

### Call signature

```text
validateRuntimeStateExplanation(input: unknown): RuntimeStateExplanation
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeStateExplanation`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeTimelineRequest`

Validate Runtime Timeline Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeTimelineRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### Declaration

```text
export declare function validateRuntimeTimelineRequest(input: unknown): RuntimeTimelineRequest;
```

### Call signature

```text
validateRuntimeTimelineRequest(input: unknown): RuntimeTimelineRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeTimelineRequest`
- Description: The return contract is defined by the type shown above.
