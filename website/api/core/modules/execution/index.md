# `@codesoul-co/hypha-core` / `modules/execution/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)
- Exports: **7**

## Using this module

Use the Index module for executing runtime behavior at this boundary. It exports 5 constants, 2 functions.

### Import from the package entrypoint

```ts
import {
  executionErrorCodes,
  executionPrincipalJsonSchema,
  executionPrincipalSchema,
  normalizedExecutionErrorJsonSchema,
  normalizedExecutionErrorSchema,
  validateExecutionPrincipal,
  validateNormalizedExecutionError,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 5 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { executionPrincipalSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionPrincipalSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionErrorCodes` | constant | <code>const executionErrorCodes: readonly ["EXECUTION_INVALID_REQUEST", "EXECUTION_PERMISSION_DENIED", "EXECUTION_POLICY_DENIED", "EXECUTION_APPROVAL_REQUIRED", "EXECUTION_WORKSPACE_NOT_FOUND", "EXECUTION_PATH_ESCAPE", "EXECUTION_PATH_DENIED", "EXECUTION_QUOTA_EXCEEDED", "EXECUTION_ENVIRONMENT_UNAVAILABLE", "EXECUTION_SANDBOX_CREATE_FAILED", "EXECUTION_SANDBOX_START_FAILED", "EXECUTION_IMAGE_UNTRUSTED", "EXECUTION_NETWO...</code> | Execution Error Codes constant exported by the `modules/execution/index` module. |
| `executionPrincipalJsonSchema` | constant | <code>const executionPrincipalJsonSchema: JsonSchema</code> | JSON Schema for Execution Principal. |
| `executionPrincipalSchema` | constant | <code>const executionPrincipalSchema: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "st...</code> | Runtime schema for Execution Principal. |
| `normalizedExecutionErrorJsonSchema` | constant | <code>const normalizedExecutionErrorJsonSchema: JsonSchema</code> | JSON Schema for Normalized Execution Error. |
| `normalizedExecutionErrorSchema` | constant | <code>const normalizedExecutionErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["EXECUTION_INVALID_REQUEST", "EXECUTION_PERMISSION_DENIED", "EXECUTION_POLICY_DENIED", "EXECUTION_APPROVAL_REQUIRED", "EXECUTION_WORKSPACE_NOT_FOUND", "EXECUTION_PATH_ESCAPE", "EXECUTION_PATH_DENIED", "EXECUTION_QUOTA_EXCEEDED", "EXECUTION_ENVIRONMENT_UNAVAILABLE", "EXECUTION_SANDBOX_CREATE_FAILED", "EXECUTION_SANDBOX_START_FAILED", "EXECUTION_IM...</code> | Runtime schema for Normalized Execution Error. |
| `validateExecutionPrincipal` | function | <code>validateExecutionPrincipal(input: unknown): ExecutionPrincipal</code> | Validate Execution Principal function with 1 public call signature; parameters and return types are listed below. |
| `validateNormalizedExecutionError` | function | <code>validateNormalizedExecutionError(input: unknown): NormalizedExecutionError</code> | Validate Normalized Execution Error function with 1 public call signature; parameters and return types are listed below. |

## `executionErrorCodes`

Execution Error Codes constant exported by the `modules/execution/index` module.

- Kind: constant
- Import: `import { executionErrorCodes } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)

### Declaration

```text
export declare const executionErrorCodes: readonly ["EXECUTION_INVALID_REQUEST", "EXECUTION_PERMISSION_DENIED", "EXECUTION_POLICY_DENIED", "EXECUTION_APPROVAL_REQUIRED", "EXECUTION_WORKSPACE_NOT_FOUND", "EXECUTION_PATH_ESCAPE", "EXECUTION_PATH_DENIED", "EXECUTION_QUOTA_EXCEEDED", "EXECUTION_ENVIRONMENT_UNAVAILABLE", "EXECUTION_SANDBOX_CREATE_FAILED", "EXECUTION_SANDBOX_START_FAILED", "EXECUTION_IMAGE_UNTRUSTED", "EXECUTION_NETWORK_DENIED", "EXECUTION_SECRET_DENIED", "EXECUTION_PROCESS_START_FAILED", "EXECUTION_TIMEOUT", "EXECUTION_IDLE_TIMEOUT", "EXECUTION_CANCELLED", "EXECUTION_OOM_KILLED", "EXECUTION_RESOURCE_EXCEEDED", "EXECUTION_OUTPUT_LIMIT", "EXECUTION_RESULT_UNKNOWN", "EXECUTION_REVISION_CONFLICT", "EXECUTION_LEASE_HELD", "EXECUTION_LEASE_LOST", "EXECUTION_IDEMPOTENCY_CONFLICT", "EXECUTION_CLEANUP_FAILED", "EXECUTION_INTERNAL_ERROR"];
```

## `executionPrincipalJsonSchema`

JSON Schema for Execution Principal.

- Kind: constant
- Import: `import { executionPrincipalJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)

### Declaration

```text
export declare const executionPrincipalJsonSchema: JsonSchema;
```

## `executionPrincipalSchema`

Runtime schema for Execution Principal.

- Kind: constant
- Import: `import { executionPrincipalSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)

### Declaration

```text
export declare const executionPrincipalSchema: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>;
```

## `normalizedExecutionErrorJsonSchema`

JSON Schema for Normalized Execution Error.

- Kind: constant
- Import: `import { normalizedExecutionErrorJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)

### Declaration

```text
export declare const normalizedExecutionErrorJsonSchema: JsonSchema;
```

## `normalizedExecutionErrorSchema`

Runtime schema for Normalized Execution Error.

- Kind: constant
- Import: `import { normalizedExecutionErrorSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)

### Declaration

```text
export declare const normalizedExecutionErrorSchema: z.ZodObject<{ code: z.ZodEnum<["EXECUTION_INVALID_REQUEST", "EXECUTION_PERMISSION_DENIED", "EXECUTION_POLICY_DENIED", "EXECUTION_APPROVAL_REQUIRED", "EXECUTION_WORKSPACE_NOT_FOUND", "EXECUTION_PATH_ESCAPE", "EXECUTION_PATH_DENIED", "EXECUTION_QUOTA_EXCEEDED", "EXECUTION_ENVIRONMENT_UNAVAILABLE", "EXECUTION_SANDBOX_CREATE_FAILED", "EXECUTION_SANDBOX_START_FAILED", "EXECUTION_IMAGE_UNTRUSTED", "EXECUTION_NETWORK_DENIED", "EXECUTION_SECRET_DENIED", "EXECUTION_PROCESS_START_FAILED", "EXECUTION_TIMEOUT", "EXECUTION_IDLE_TIMEOUT", "EXECUTION_CANCELLED", "EXECUTION_OOM_KILLED", "EXECUTION_RESOURCE_EXCEEDED", "EXECUTION_OUTPUT_LIMIT", "EXECUTION_RESULT_UNKNOWN", "EXECUTION_REVISION_CONFLICT", "EXECUTION_LEASE_HELD", "EXECUTION_LEASE_LOST", "EXECUTION_IDEMPOTENCY_CONFLICT", "EXECUTION_CLEANUP_FAILED", "EXECUTION_INTERNAL_ERROR"]>; message: z.ZodString; retryable: z.ZodBoolean; providerCode: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>; details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; causeRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { code: "EXECUTION_INVALID_REQUEST" | "EXECUTION_PERMISSION_DENIED" | "EXECUTION_POLICY_DENIED" | "EXECUTION_APPROVAL_REQUIRED" | "EXECUTION_WORKSPACE_NOT_FOUND" | "EXECUTION_PATH_ESCAPE" | "EXECUTION_PATH_DENIED" | "EXECUTION_QUOTA_EXCEEDED" | "EXECUTION_ENVIRONMENT_UNAVAILABLE" | "EXECUTION_SANDBOX_CREATE_FAILED" | "EXECUTION_SANDBOX_START_FAILED" | "EXECUTION_IMAGE_UNTRUSTED" | "EXECUTION_NETWORK_DENIED" | "EXECUTION_SECRET_DENIED" | "EXECUTION_PROCESS_START_FAILED" | "EXECUTION_TIMEOUT" | "EXECUTION_IDLE_TIMEOUT" | "EXECUTION_CANCELLED" | "EXECUTION_OOM_KILLED" | "EXECUTION_RESOURCE_EXCEEDED" | "EXECUTION_OUTPUT_LIMIT" | "EXECUTION_RESULT_UNKNOWN" | "EXECUTION_REVISION_CONFLICT" | "EXECUTION_LEASE_HELD" | "EXECUTION_LEASE_LOST" | "EXECUTION_IDEMPOTENCY_CONFLICT" | "EXECUTION_CLEANUP_FAILED" | "EXECUTION_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, unknown> | undefined; causeRef?: string | undefined; providerCode?: string | number | undefined; }, { code: "EXECUTION_INVALID_REQUEST" | "EXECUTION_PERMISSION_DENIED" | "EXECUTION_POLICY_DENIED" | "EXECUTION_APPROVAL_REQUIRED" | "EXECUTION_WORKSPACE_NOT_FOUND" | "EXECUTION_PATH_ESCAPE" | "EXECUTION_PATH_DENIED" | "EXECUTION_QUOTA_EXCEEDED" | "EXECUTION_ENVIRONMENT_UNAVAILABLE" | "EXECUTION_SANDBOX_CREATE_FAILED" | "EXECUTION_SANDBOX_START_FAILED" | "EXECUTION_IMAGE_UNTRUSTED" | "EXECUTION_NETWORK_DENIED" | "EXECUTION_SECRET_DENIED" | "EXECUTION_PROCESS_START_FAILED" | "EXECUTION_TIMEOUT" | "EXECUTION_IDLE_TIMEOUT" | "EXECUTION_CANCELLED" | "EXECUTION_OOM_KILLED" | "EXECUTION_RESOURCE_EXCEEDED" | "EXECUTION_OUTPUT_LIMIT" | "EXECUTION_RESULT_UNKNOWN" | "EXECUTION_REVISION_CONFLICT" | "EXECUTION_LEASE_HELD" | "EXECUTION_LEASE_LOST" | "EXECUTION_IDEMPOTENCY_CONFLICT" | "EXECUTION_CLEANUP_FAILED" | "EXECUTION_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, unknown> | undefined; causeRef?: string | undefined; providerCode?: string | number | undefined; }>;
```

## `validateExecutionPrincipal`

Validate Execution Principal function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionPrincipal } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)

### Declaration

```text
export declare function validateExecutionPrincipal(input: unknown): ExecutionPrincipal;
```

### Call signature

```text
validateExecutionPrincipal(input: unknown): ExecutionPrincipal
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionPrincipal`
- Description: The return contract is defined by the type shown above.

## `validateNormalizedExecutionError`

Validate Normalized Execution Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateNormalizedExecutionError } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)

### Declaration

```text
export declare function validateNormalizedExecutionError(input: unknown): NormalizedExecutionError;
```

### Call signature

```text
validateNormalizedExecutionError(input: unknown): NormalizedExecutionError
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `NormalizedExecutionError`
- Description: The return contract is defined by the type shown above.
