# `@codesoul-co/hypha-core` / `modules/execution-port/contracts`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-port/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)
- Exports: **13**

## Using this module

Use the Contracts module for declaring and runtime-validating contracts. It exports 10 constants, 3 functions.

### Import from the package entrypoint

```ts
import {
  executionAuthorizationEvidenceExample,
  executionAuthorizationEvidenceJsonSchema,
  executionAuthorizationEvidenceSchema,
  executionAuthorizationVerificationResultExample,
  executionAuthorizationVerificationResultJsonSchema,
  executionAuthorizationVerificationResultSchema,
  executionDispatchRequestExample,
  executionDispatchRequestJsonSchema,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 10 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { executionAuthorizationEvidenceSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionAuthorizationEvidenceSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionAuthorizationEvidenceExample` | constant | <code>const executionAuthorizationEvidenceExample: ExecutionAuthorizationEvidence</code> | Valid example value for Execution Authorization Evidence. |
| `executionAuthorizationEvidenceJsonSchema` | constant | <code>const executionAuthorizationEvidenceJsonSchema: JsonSchema</code> | JSON Schema for Execution Authorization Evidence. |
| `executionAuthorizationEvidenceSchema` | constant | <code>const executionAuthorizationEvidenceSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; invocationId: z.ZodString; activityId: z.ZodString; runId: z.ZodString; toolId: z.ZodString; toolRevision: z.ZodOptional&lt;z.ZodString&gt;; contractSnapshotRef: z.ZodOptional&lt;z.ZodString&gt;; principalId: z.ZodString; inputHash: z.ZodString; policyDecisionRef: z.ZodString; riskAssessmentId: z.ZodString; approvalRef: z.ZodOptional&lt;z.Zod...</code> | Runtime schema for Execution Authorization Evidence. |
| `executionAuthorizationVerificationResultExample` | constant | <code>const executionAuthorizationVerificationResultExample: ExecutionAuthorizationVerificationResult</code> | Valid example value for Execution Authorization Verification Result. |
| `executionAuthorizationVerificationResultJsonSchema` | constant | <code>const executionAuthorizationVerificationResultJsonSchema: JsonSchema</code> | JSON Schema for Execution Authorization Verification Result. |
| `executionAuthorizationVerificationResultSchema` | constant | <code>const executionAuthorizationVerificationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ valid: z.ZodBoolean; verificationRef: z.ZodString; verifiedAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; reason: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { valid: boolean; verificationRef: string; verifiedAt: string; reason?: string &#124; undefined; expiresAt?: string &#124; undefined; }, { valid: boolean; verificationR...</code> | Runtime schema for Execution Authorization Verification Result. |
| `executionDispatchRequestExample` | constant | <code>const executionDispatchRequestExample: ExecutionDispatchRequest</code> | Valid example value for Execution Dispatch Request. |
| `executionDispatchRequestJsonSchema` | constant | <code>const executionDispatchRequestJsonSchema: JsonSchema</code> | JSON Schema for Execution Dispatch Request. |
| `executionDispatchRequestSchema` | constant | <code>const executionDispatchRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activity: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z.ZodString; workspaceId: z.ZodString; request: z.ZodUnion&lt;[z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user"...</code> | Runtime schema for Execution Dispatch Request. |
| `executionPortJsonSchemas` | constant | <code>const executionPortJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Execution Port JSON Schemas constant exported by the `modules/execution-port/contracts` module. |
| `validateExecutionAuthorizationEvidence` | function | <code>validateExecutionAuthorizationEvidence(input: unknown): ExecutionAuthorizationEvidence</code> | Validate Execution Authorization Evidence function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionAuthorizationVerificationResult` | function | <code>validateExecutionAuthorizationVerificationResult(input: unknown): ExecutionAuthorizationVerificationResult</code> | Validate Execution Authorization Verification Result function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionDispatchRequest` | function | <code>validateExecutionDispatchRequest(input: unknown): ExecutionDispatchRequest</code> | Validate Execution Dispatch Request function with 1 public call signature; parameters and return types are listed below. |

## `executionAuthorizationEvidenceExample`

Valid example value for Execution Authorization Evidence.

- Kind: constant
- Import: `import { executionAuthorizationEvidenceExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### Declaration

```text
export declare const executionAuthorizationEvidenceExample: ExecutionAuthorizationEvidence;
```

## `executionAuthorizationEvidenceJsonSchema`

JSON Schema for Execution Authorization Evidence.

- Kind: constant
- Import: `import { executionAuthorizationEvidenceJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### Declaration

```text
export declare const executionAuthorizationEvidenceJsonSchema: JsonSchema;
```

## `executionAuthorizationEvidenceSchema`

Runtime schema for Execution Authorization Evidence.

- Kind: constant
- Import: `import { executionAuthorizationEvidenceSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### Declaration

```text
export declare const executionAuthorizationEvidenceSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; invocationId: z.ZodString; activityId: z.ZodString; runId: z.ZodString; toolId: z.ZodString; toolRevision: z.ZodOptional<z.ZodString>; contractSnapshotRef: z.ZodOptional<z.ZodString>; principalId: z.ZodString; inputHash: z.ZodString; policyDecisionRef: z.ZodString; riskAssessmentId: z.ZodString; approvalRef: z.ZodOptional<z.ZodString>; authorizedAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; runId: string; principalId: string; activityId: string; inputHash: string; invocationId: string; toolId: string; policyDecisionRef: string; riskAssessmentId: string; authorizedAt: string; approvalRef?: string | undefined; expiresAt?: string | undefined; toolRevision?: string | undefined; contractSnapshotRef?: string | undefined; }, { id: string; runId: string; principalId: string; activityId: string; inputHash: string; invocationId: string; toolId: string; policyDecisionRef: string; riskAssessmentId: string; authorizedAt: string; approvalRef?: string | undefined; expiresAt?: string | undefined; toolRevision?: string | undefined; contractSnapshotRef?: string | undefined; }>, { id: string; runId: string; principalId: string; activityId: string; inputHash: string; invocationId: string; toolId: string; policyDecisionRef: string; riskAssessmentId: string; authorizedAt: string; approvalRef?: string | undefined; expiresAt?: string | undefined; toolRevision?: string | undefined; contractSnapshotRef?: string | undefined; }, { id: string; runId: string; principalId: string; activityId: string; inputHash: string; invocationId: string; toolId: string; policyDecisionRef: string; riskAssessmentId: string; authorizedAt: string; approvalRef?: string | undefined; expiresAt?: string | undefined; toolRevision?: string | undefined; contractSnapshotRef?: string | undefined; }>;
```

## `executionAuthorizationVerificationResultExample`

Valid example value for Execution Authorization Verification Result.

- Kind: constant
- Import: `import { executionAuthorizationVerificationResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### Declaration

```text
export declare const executionAuthorizationVerificationResultExample: ExecutionAuthorizationVerificationResult;
```

## `executionAuthorizationVerificationResultJsonSchema`

JSON Schema for Execution Authorization Verification Result.

- Kind: constant
- Import: `import { executionAuthorizationVerificationResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### Declaration

```text
export declare const executionAuthorizationVerificationResultJsonSchema: JsonSchema;
```

## `executionAuthorizationVerificationResultSchema`

Runtime schema for Execution Authorization Verification Result.

- Kind: constant
- Import: `import { executionAuthorizationVerificationResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### Declaration

```text
export declare const executionAuthorizationVerificationResultSchema: z.ZodEffects<z.ZodObject<{ valid: z.ZodBoolean; verificationRef: z.ZodString; verifiedAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; reason: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { valid: boolean; verificationRef: string; verifiedAt: string; reason?: string | undefined; expiresAt?: string | undefined; }, { valid: boolean; verificationRef: string; verifiedAt: string; reason?: string | undefined; expiresAt?: string | undefined; }>, { valid: boolean; verificationRef: string; verifiedAt: string; reason?: string | undefined; expiresAt?: string | undefined; }, { valid: boolean; verificationRef: string; verifiedAt: string; reason?: string | undefined; expiresAt?: string | undefined; }>;
```

## `executionDispatchRequestExample`

Valid example value for Execution Dispatch Request.

- Kind: constant
- Import: `import { executionDispatchRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### Declaration

```text
export declare const executionDispatchRequestExample: ExecutionDispatchRequest;
```

## `executionDispatchRequestJsonSchema`

JSON Schema for Execution Dispatch Request.

- Kind: constant
- Import: `import { executionDispatchRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### Declaration

```text
export declare const executionDispatchRequestJsonSchema: JsonSchema;
```

## `executionDispatchRequestSchema`

Runtime schema for Execution Dispatch Request.

- Kind: constant
- Import: `import { executionDispatchRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionDispatchRequestSchema: (typeof import('@codesoul-co/hypha-core'))['executionDispatchRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionPortJsonSchemas`

Execution Port JSON Schemas constant exported by the `modules/execution-port/contracts` module.

- Kind: constant
- Import: `import { executionPortJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### Declaration

```text
export declare const executionPortJsonSchemas: Record<string, JsonSchema>;
```

## `validateExecutionAuthorizationEvidence`

Validate Execution Authorization Evidence function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionAuthorizationEvidence } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### Declaration

```text
export declare function validateExecutionAuthorizationEvidence(input: unknown): ExecutionAuthorizationEvidence;
```

### Call signature

```text
validateExecutionAuthorizationEvidence(input: unknown): ExecutionAuthorizationEvidence
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionAuthorizationEvidence`
- Description: The return contract is defined by the type shown above.

## `validateExecutionAuthorizationVerificationResult`

Validate Execution Authorization Verification Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionAuthorizationVerificationResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### Declaration

```text
export declare function validateExecutionAuthorizationVerificationResult(input: unknown): ExecutionAuthorizationVerificationResult;
```

### Call signature

```text
validateExecutionAuthorizationVerificationResult(input: unknown): ExecutionAuthorizationVerificationResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionAuthorizationVerificationResult`
- Description: The return contract is defined by the type shown above.

## `validateExecutionDispatchRequest`

Validate Execution Dispatch Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionDispatchRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### Declaration

```text
export declare function validateExecutionDispatchRequest(input: unknown): ExecutionDispatchRequest;
```

### Call signature

```text
validateExecutionDispatchRequest(input: unknown): ExecutionDispatchRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionDispatchRequest`
- Description: The return contract is defined by the type shown above.
