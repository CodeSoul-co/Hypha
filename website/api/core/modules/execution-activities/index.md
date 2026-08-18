# `@codesoul-co/hypha-core` / `modules/execution-activities/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-activities/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)
- Exports: **14**

## Using this module

Use the Index module for executing runtime behavior at this boundary. It exports 11 constants, 3 functions.

### Import from the package entrypoint

```ts
import {
  executionActivityJsonSchemas,
  executionActivityRequestExample,
  executionActivityRequestJsonSchema,
  executionActivityRequestSchema,
  executionActivityResultExample,
  executionActivityResultJsonSchema,
  executionActivityResultSchema,
  executionActivityStatusSchema,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 11 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { executionActivityRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionActivityRequestSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionActivityJsonSchemas` | constant | <code>const executionActivityJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Execution Activity JSON Schemas constant exported by the `modules/execution-activities/index` module. |
| `executionActivityRequestExample` | constant | <code>const executionActivityRequestExample: ExecutionActivityRequest</code> | Valid example value for Execution Activity Request. |
| `executionActivityRequestJsonSchema` | constant | <code>const executionActivityRequestJsonSchema: JsonSchema</code> | JSON Schema for Execution Activity Request. |
| `executionActivityRequestSchema` | constant | <code>const executionActivityRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z.ZodString; workspaceId: z.ZodString; request: z.ZodUnion&lt;[z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; ten...</code> | Runtime schema for Execution Activity Request. |
| `executionActivityResultExample` | constant | <code>const executionActivityResultExample: ExecutionActivityResult</code> | Valid example value for Execution Activity Result. |
| `executionActivityResultJsonSchema` | constant | <code>const executionActivityResultJsonSchema: JsonSchema</code> | JSON Schema for Execution Activity Result. |
| `executionActivityResultSchema` | constant | <code>const executionActivityResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; status: z.ZodEnum&lt;["completed", "failed", "timeout", "cancelled", "unknown"]&gt;; executionId: z.ZodOptional&lt;z.ZodString&gt;; artifactRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; snapshotRef: z.ZodOptional&lt;z.ZodString&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; error: z.ZodOptional&lt;z.ZodObject&lt;{ code: z.ZodEnum&lt;["EXECUTION...</code> | Runtime schema for Execution Activity Result. |
| `executionActivityStatusSchema` | constant | <code>const executionActivityStatusSchema: z.ZodEnum&lt;["completed", "failed", "timeout", "cancelled", "unknown"]&gt;</code> | Runtime schema for Execution Activity Status. |
| `workspaceExecutionActivityRequestExample` | constant | <code>const workspaceExecutionActivityRequestExample: ExecutionActivityRequest</code> | Valid example value for Workspace Execution Activity Request. |
| `workspaceOperationRequestJsonSchema` | constant | <code>const workspaceOperationRequestJsonSchema: JsonSchema</code> | JSON Schema for Workspace Operation Request. |
| `workspaceOperationRequestSchema` | constant | <code>const workspaceOperationRequestSchema: z.ZodUnion&lt;[z.ZodObject&lt;{ workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; m...</code> | Runtime schema for Workspace Operation Request. |
| `validateExecutionActivityRequest` | function | <code>validateExecutionActivityRequest(input: unknown): ExecutionActivityRequest</code> | Validate Execution Activity Request function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionActivityResult` | function | <code>validateExecutionActivityResult(input: unknown): ExecutionActivityResult</code> | Validate Execution Activity Result function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceOperationRequest` | function | <code>validateWorkspaceOperationRequest(input: unknown): WorkspaceOperationRequest</code> | Validate Workspace Operation Request function with 1 public call signature; parameters and return types are listed below. |

## `executionActivityJsonSchemas`

Execution Activity JSON Schemas constant exported by the `modules/execution-activities/index` module.

- Kind: constant
- Import: `import { executionActivityJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### Declaration

```text
export declare const executionActivityJsonSchemas: Record<string, JsonSchema>;
```

## `executionActivityRequestExample`

Valid example value for Execution Activity Request.

- Kind: constant
- Import: `import { executionActivityRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### Declaration

```text
export declare const executionActivityRequestExample: ExecutionActivityRequest;
```

## `executionActivityRequestJsonSchema`

JSON Schema for Execution Activity Request.

- Kind: constant
- Import: `import { executionActivityRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### Declaration

```text
export declare const executionActivityRequestJsonSchema: JsonSchema;
```

## `executionActivityRequestSchema`

Runtime schema for Execution Activity Request.

- Kind: constant
- Import: `import { executionActivityRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionActivityRequestSchema: (typeof import('@codesoul-co/hypha-core'))['executionActivityRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionActivityResultExample`

Valid example value for Execution Activity Result.

- Kind: constant
- Import: `import { executionActivityResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### Declaration

```text
export declare const executionActivityResultExample: ExecutionActivityResult;
```

## `executionActivityResultJsonSchema`

JSON Schema for Execution Activity Result.

- Kind: constant
- Import: `import { executionActivityResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### Declaration

```text
export declare const executionActivityResultJsonSchema: JsonSchema;
```

## `executionActivityResultSchema`

Runtime schema for Execution Activity Result.

- Kind: constant
- Import: `import { executionActivityResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionActivityResultSchema: (typeof import('@codesoul-co/hypha-core'))['executionActivityResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionActivityStatusSchema`

Runtime schema for Execution Activity Status.

- Kind: constant
- Import: `import { executionActivityStatusSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### Declaration

```text
export declare const executionActivityStatusSchema: z.ZodEnum<["completed", "failed", "timeout", "cancelled", "unknown"]>;
```

## `workspaceExecutionActivityRequestExample`

Valid example value for Workspace Execution Activity Request.

- Kind: constant
- Import: `import { workspaceExecutionActivityRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### Declaration

```text
export declare const workspaceExecutionActivityRequestExample: ExecutionActivityRequest;
```

## `workspaceOperationRequestJsonSchema`

JSON Schema for Workspace Operation Request.

- Kind: constant
- Import: `import { workspaceOperationRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### Declaration

```text
export declare const workspaceOperationRequestJsonSchema: JsonSchema;
```

## `workspaceOperationRequestSchema`

Runtime schema for Workspace Operation Request.

- Kind: constant
- Import: `import { workspaceOperationRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const workspaceOperationRequestSchema: (typeof import('@codesoul-co/hypha-core'))['workspaceOperationRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `validateExecutionActivityRequest`

Validate Execution Activity Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionActivityRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### Declaration

```text
export declare function validateExecutionActivityRequest(input: unknown): ExecutionActivityRequest;
```

### Call signature

```text
validateExecutionActivityRequest(input: unknown): ExecutionActivityRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionActivityRequest`
- Description: The return contract is defined by the type shown above.

## `validateExecutionActivityResult`

Validate Execution Activity Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionActivityResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### Declaration

```text
export declare function validateExecutionActivityResult(input: unknown): ExecutionActivityResult;
```

### Call signature

```text
validateExecutionActivityResult(input: unknown): ExecutionActivityResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionActivityResult`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceOperationRequest`

Validate Workspace Operation Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceOperationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### Declaration

```text
export declare function validateWorkspaceOperationRequest(input: unknown): WorkspaceOperationRequest;
```

### Call signature

```text
validateWorkspaceOperationRequest(input: unknown): WorkspaceOperationRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceOperationRequest`
- Description: The return contract is defined by the type shown above.
