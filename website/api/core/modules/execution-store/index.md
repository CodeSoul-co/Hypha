# `@codesoul-co/hypha-core` / `modules/execution-store/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-store/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)
- Exports: **48**

## Using this module

Use the Index module for persisting and reading data at this boundary. It exports 37 constants, 11 functions.

### Import from the package entrypoint

```ts
import {
  executionIdempotencyQueryJsonSchema,
  executionIdempotencyQuerySchema,
  executionIdempotencyResolutionJsonSchema,
  executionIdempotencyResolutionSchema,
  executionLeaseAcquireRequestExample,
  executionLeaseAcquireRequestJsonSchema,
  executionLeaseAcquireRequestSchema,
  executionLeaseExample,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 11 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 37 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { executionIdempotencyQuerySchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionIdempotencyQuerySchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionIdempotencyQueryJsonSchema` | constant | <code>const executionIdempotencyQueryJsonSchema: JsonSchema</code> | JSON Schema for Execution Idempotency Query. |
| `executionIdempotencyQuerySchema` | constant | <code>const executionIdempotencyQuerySchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; idempotencyKey: z.ZodString; fingerprint: z.ZodString; }, "strict", z.ZodTypeAny, { workspaceId: string; userId: string; idempotencyKey: string; fingerprint: string; tenantId?: string &#124; undefined; }, { workspaceId: string; userId: string; idempotencyKey: string; fingerprint: str...</code> | Runtime schema for Execution Idempotency Query. |
| `executionIdempotencyResolutionJsonSchema` | constant | <code>const executionIdempotencyResolutionJsonSchema: JsonSchema</code> | JSON Schema for Execution Idempotency Resolution. |
| `executionIdempotencyResolutionSchema` | constant | <code>const executionIdempotencyResolutionSchema: z.ZodDiscriminatedUnion&lt;"status", [z.ZodObject&lt;{ status: z.ZodLiteral&lt;"miss"&gt;; }, "strict", z.ZodTypeAny, { status: "miss"; }, { status: "miss"; }&gt;, z.ZodObject&lt;{ status: z.ZodLiteral&lt;"match"&gt;; record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; request: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; p...</code> | Runtime schema for Execution Idempotency Resolution. |
| `executionLeaseAcquireRequestExample` | constant | <code>const executionLeaseAcquireRequestExample: ExecutionLeaseAcquireRequest</code> | Valid example value for Execution Lease Acquire Request. |
| `executionLeaseAcquireRequestJsonSchema` | constant | <code>const executionLeaseAcquireRequestJsonSchema: JsonSchema</code> | JSON Schema for Execution Lease Acquire Request. |
| `executionLeaseAcquireRequestSchema` | constant | <code>const executionLeaseAcquireRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; expectedRevision: z.ZodNumber; requestedLeaseId: z.ZodString; ownerId: z.ZodString; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { operationId: string; executionId: string; ownerId: string; expectedRevision: number; acquiredAt: string; re...</code> | Runtime schema for Execution Lease Acquire Request. |
| `executionLeaseExample` | constant | <code>const executionLeaseExample: ExecutionLease</code> | Valid example value for Execution Lease. |
| `executionLeaseGuardExample` | constant | <code>const executionLeaseGuardExample: ExecutionLeaseGuard</code> | Valid example value for Execution Lease Guard. |
| `executionLeaseGuardJsonSchema` | constant | <code>const executionLeaseGuardJsonSchema: JsonSchema</code> | JSON Schema for Execution Lease Guard. |
| `executionLeaseGuardSchema` | constant | <code>const executionLeaseGuardSchema: z.ZodObject&lt;{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }&gt;</code> | Runtime schema for Execution Lease Guard. |
| `executionLeaseJsonSchema` | constant | <code>const executionLeaseJsonSchema: JsonSchema</code> | JSON Schema for Execution Lease. |
| `executionLeaseReleaseRequestExample` | constant | <code>const executionLeaseReleaseRequestExample: ExecutionLeaseReleaseRequest</code> | Valid example value for Execution Lease Release Request. |
| `executionLeaseReleaseRequestJsonSchema` | constant | <code>const executionLeaseReleaseRequestJsonSchema: JsonSchema</code> | JSON Schema for Execution Lease Release Request. |
| `executionLeaseReleaseRequestSchema` | constant | <code>const executionLeaseReleaseRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; expectedRevision: z.ZodNumber; leaseGuard: z.ZodObject&lt;{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }&gt;; releasedAt: z.ZodString; reason...</code> | Runtime schema for Execution Lease Release Request. |
| `executionLeaseRenewRequestExample` | constant | <code>const executionLeaseRenewRequestExample: ExecutionLeaseRenewRequest</code> | Valid example value for Execution Lease Renew Request. |
| `executionLeaseRenewRequestJsonSchema` | constant | <code>const executionLeaseRenewRequestJsonSchema: JsonSchema</code> | JSON Schema for Execution Lease Renew Request. |
| `executionLeaseRenewRequestSchema` | constant | <code>const executionLeaseRenewRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; expectedRevision: z.ZodNumber; leaseGuard: z.ZodObject&lt;{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }&gt;; ttlMs: z.ZodNumber; heartbeatAt: ...</code> | Runtime schema for Execution Lease Renew Request. |
| `executionLeaseSchema` | constant | <code>const executionLeaseSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; executionId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; acquiredAt: z.ZodString; expiresAt: z.ZodString; heartbeatAt: z.ZodString; }, "strict", z.ZodTypeAny, { id: string; executionId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; }, { id: string; executionId: stri...</code> | Runtime schema for Execution Lease. |
| `executionRecordCompareAndSetRequestExample` | constant | <code>const executionRecordCompareAndSetRequestExample: ExecutionRecordCompareAndSetRequest</code> | Valid example value for Execution Record Compare And Set Request. |
| `executionRecordCompareAndSetRequestJsonSchema` | constant | <code>const executionRecordCompareAndSetRequestJsonSchema: JsonSchema</code> | JSON Schema for Execution Record Compare And Set Request. |
| `executionRecordCompareAndSetRequestSchema` | constant | <code>const executionRecordCompareAndSetRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; expectedRevision: z.ZodNumber; leaseGuard: z.ZodOptional&lt;z.ZodObject&lt;{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }...</code> | Runtime schema for Execution Record Compare And Set Request. |
| `executionRecordCreateRequestExample` | constant | <code>const executionRecordCreateRequestExample: ExecutionRecordCreateRequest</code> | Valid example value for Execution Record Create Request. |
| `executionRecordCreateRequestJsonSchema` | constant | <code>const executionRecordCreateRequestJsonSchema: JsonSchema</code> | JSON Schema for Execution Record Create Request. |
| `executionRecordCreateRequestSchema` | constant | <code>const executionRecordCreateRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; request: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;...</code> | Runtime schema for Execution Record Create Request. |
| `executionRecordExample` | constant | <code>const executionRecordExample: ExecutionRecord</code> | Valid example value for Execution Record. |
| `executionRecordJsonSchema` | constant | <code>const executionRecordJsonSchema: JsonSchema</code> | JSON Schema for Execution Record. |
| `executionRecordPageJsonSchema` | constant | <code>const executionRecordPageJsonSchema: JsonSchema</code> | JSON Schema for Execution Record Page. |
| `executionRecordPageSchema` | constant | <code>const executionRecordPageSchema: z.ZodObject&lt;{ records: z.ZodArray&lt;z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; request: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;...</code> | Runtime schema for Execution Record Page. |
| `executionRecordQueryJsonSchema` | constant | <code>const executionRecordQueryJsonSchema: JsonSchema</code> | JSON Schema for Execution Record Query. |
| `executionRecordQuerySchema` | constant | <code>const executionRecordQuerySchema: z.ZodEffects&lt;z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; providerId: z.ZodOptional&lt;z.ZodString&gt;; statuses: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["queued", "starting", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_...</code> | Runtime schema for Execution Record Query. |
| `executionRecordSchema` | constant | <code>const executionRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; request: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;;...</code> | Runtime schema for Execution Record. |
| `executionRecoveryAssessmentExample` | constant | <code>const executionRecoveryAssessmentExample: ExecutionRecoveryAssessment</code> | Valid example value for Execution Recovery Assessment. |
| `executionRecoveryAssessmentJsonSchema` | constant | <code>const executionRecoveryAssessmentJsonSchema: JsonSchema</code> | JSON Schema for Execution Recovery Assessment. |
| `executionRecoveryAssessmentSchema` | constant | <code>const executionRecoveryAssessmentSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; recordRevision: z.ZodNumber; disposition: z.ZodEnum&lt;["not_started", "provider_queryable", "provider_completed_result_missing", "provider_state_unknown"]&gt;; assessedAt: z.ZodString; providerStatusRef: z.ZodOptional&lt;z.ZodString&gt;; reason: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { executionId: string; dispositio...</code> | Runtime schema for Execution Recovery Assessment. |
| `executionRecoveryDispositionSchema` | constant | <code>const executionRecoveryDispositionSchema: z.ZodEnum&lt;["not_started", "provider_queryable", "provider_completed_result_missing", "provider_state_unknown"]&gt;</code> | Runtime schema for Execution Recovery Disposition. |
| `executionStoreJsonSchemas` | constant | <code>const executionStoreJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Execution Store JSON Schemas constant exported by the `modules/execution-store/index` module. |
| `validateExecutionIdempotencyQuery` | function | <code>validateExecutionIdempotencyQuery(input: unknown): ExecutionIdempotencyQuery</code> | Validate Execution Idempotency Query function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionIdempotencyResolution` | function | <code>validateExecutionIdempotencyResolution(input: unknown): ExecutionIdempotencyResolution</code> | Validate Execution Idempotency Resolution function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionLease` | function | <code>validateExecutionLease(input: unknown): ExecutionLease</code> | Validate Execution Lease function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionLeaseAcquireRequest` | function | <code>validateExecutionLeaseAcquireRequest(input: unknown): ExecutionLeaseAcquireRequest</code> | Validate Execution Lease Acquire Request function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionLeaseReleaseRequest` | function | <code>validateExecutionLeaseReleaseRequest(input: unknown): ExecutionLeaseReleaseRequest</code> | Validate Execution Lease Release Request function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionLeaseRenewRequest` | function | <code>validateExecutionLeaseRenewRequest(input: unknown): ExecutionLeaseRenewRequest</code> | Validate Execution Lease Renew Request function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionRecord` | function | <code>validateExecutionRecord(input: unknown): ExecutionRecord</code> | Validate Execution Record function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionRecordCompareAndSetRequest` | function | <code>validateExecutionRecordCompareAndSetRequest(input: unknown): ExecutionRecordCompareAndSetRequest</code> | Validate Execution Record Compare And Set Request function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionRecordCreateRequest` | function | <code>validateExecutionRecordCreateRequest(input: unknown): ExecutionRecordCreateRequest</code> | Validate Execution Record Create Request function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionRecordQuery` | function | <code>validateExecutionRecordQuery(input: unknown): ExecutionRecordQuery</code> | Validate Execution Record Query function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionRecoveryAssessment` | function | <code>validateExecutionRecoveryAssessment(input: unknown): ExecutionRecoveryAssessment</code> | Validate Execution Recovery Assessment function with 1 public call signature; parameters and return types are listed below. |

## `executionIdempotencyQueryJsonSchema`

JSON Schema for Execution Idempotency Query.

- Kind: constant
- Import: `import { executionIdempotencyQueryJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionIdempotencyQueryJsonSchema: JsonSchema;
```

## `executionIdempotencyQuerySchema`

Runtime schema for Execution Idempotency Query.

- Kind: constant
- Import: `import { executionIdempotencyQuerySchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionIdempotencyQuerySchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodString; idempotencyKey: z.ZodString; fingerprint: z.ZodString; }, "strict", z.ZodTypeAny, { workspaceId: string; userId: string; idempotencyKey: string; fingerprint: string; tenantId?: string | undefined; }, { workspaceId: string; userId: string; idempotencyKey: string; fingerprint: string; tenantId?: string | undefined; }>;
```

## `executionIdempotencyResolutionJsonSchema`

JSON Schema for Execution Idempotency Resolution.

- Kind: constant
- Import: `import { executionIdempotencyResolutionJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionIdempotencyResolutionJsonSchema: JsonSchema;
```

## `executionIdempotencyResolutionSchema`

Runtime schema for Execution Idempotency Resolution.

- Kind: constant
- Import: `import { executionIdempotencyResolutionSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionIdempotencyResolutionSchema: (typeof import('@codesoul-co/hypha-core'))['executionIdempotencyResolutionSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionLeaseAcquireRequestExample`

Valid example value for Execution Lease Acquire Request.

- Kind: constant
- Import: `import { executionLeaseAcquireRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionLeaseAcquireRequestExample: ExecutionLeaseAcquireRequest;
```

## `executionLeaseAcquireRequestJsonSchema`

JSON Schema for Execution Lease Acquire Request.

- Kind: constant
- Import: `import { executionLeaseAcquireRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionLeaseAcquireRequestJsonSchema: JsonSchema;
```

## `executionLeaseAcquireRequestSchema`

Runtime schema for Execution Lease Acquire Request.

- Kind: constant
- Import: `import { executionLeaseAcquireRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionLeaseAcquireRequestSchema: z.ZodObject<{ operationId: z.ZodString; executionId: z.ZodString; expectedRevision: z.ZodNumber; requestedLeaseId: z.ZodString; ownerId: z.ZodString; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; executionId: string; ownerId: string; expectedRevision: number; acquiredAt: string; requestedLeaseId: string; ttlMs: number; idempotencyKey?: string | undefined; }, { operationId: string; executionId: string; ownerId: string; expectedRevision: number; acquiredAt: string; requestedLeaseId: string; ttlMs: number; idempotencyKey?: string | undefined; }>;
```

## `executionLeaseExample`

Valid example value for Execution Lease.

- Kind: constant
- Import: `import { executionLeaseExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionLeaseExample: ExecutionLease;
```

## `executionLeaseGuardExample`

Valid example value for Execution Lease Guard.

- Kind: constant
- Import: `import { executionLeaseGuardExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionLeaseGuardExample: ExecutionLeaseGuard;
```

## `executionLeaseGuardJsonSchema`

JSON Schema for Execution Lease Guard.

- Kind: constant
- Import: `import { executionLeaseGuardJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionLeaseGuardJsonSchema: JsonSchema;
```

## `executionLeaseGuardSchema`

Runtime schema for Execution Lease Guard.

- Kind: constant
- Import: `import { executionLeaseGuardSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionLeaseGuardSchema: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>;
```

## `executionLeaseJsonSchema`

JSON Schema for Execution Lease.

- Kind: constant
- Import: `import { executionLeaseJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionLeaseJsonSchema: JsonSchema;
```

## `executionLeaseReleaseRequestExample`

Valid example value for Execution Lease Release Request.

- Kind: constant
- Import: `import { executionLeaseReleaseRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionLeaseReleaseRequestExample: ExecutionLeaseReleaseRequest;
```

## `executionLeaseReleaseRequestJsonSchema`

JSON Schema for Execution Lease Release Request.

- Kind: constant
- Import: `import { executionLeaseReleaseRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionLeaseReleaseRequestJsonSchema: JsonSchema;
```

## `executionLeaseReleaseRequestSchema`

Runtime schema for Execution Lease Release Request.

- Kind: constant
- Import: `import { executionLeaseReleaseRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionLeaseReleaseRequestSchema: z.ZodObject<{ operationId: z.ZodString; executionId: z.ZodString; expectedRevision: z.ZodNumber; leaseGuard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; releasedAt: z.ZodString; reason: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; executionId: string; expectedRevision: number; leaseGuard: { fencingToken: number; ownerId: string; leaseId: string; }; releasedAt: string; reason?: string | undefined; idempotencyKey?: string | undefined; }, { operationId: string; executionId: string; expectedRevision: number; leaseGuard: { fencingToken: number; ownerId: string; leaseId: string; }; releasedAt: string; reason?: string | undefined; idempotencyKey?: string | undefined; }>;
```

## `executionLeaseRenewRequestExample`

Valid example value for Execution Lease Renew Request.

- Kind: constant
- Import: `import { executionLeaseRenewRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionLeaseRenewRequestExample: ExecutionLeaseRenewRequest;
```

## `executionLeaseRenewRequestJsonSchema`

JSON Schema for Execution Lease Renew Request.

- Kind: constant
- Import: `import { executionLeaseRenewRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionLeaseRenewRequestJsonSchema: JsonSchema;
```

## `executionLeaseRenewRequestSchema`

Runtime schema for Execution Lease Renew Request.

- Kind: constant
- Import: `import { executionLeaseRenewRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionLeaseRenewRequestSchema: z.ZodObject<{ operationId: z.ZodString; executionId: z.ZodString; expectedRevision: z.ZodNumber; leaseGuard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; ttlMs: z.ZodNumber; heartbeatAt: z.ZodString; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; executionId: string; expectedRevision: number; heartbeatAt: string; leaseGuard: { fencingToken: number; ownerId: string; leaseId: string; }; ttlMs: number; idempotencyKey?: string | undefined; }, { operationId: string; executionId: string; expectedRevision: number; heartbeatAt: string; leaseGuard: { fencingToken: number; ownerId: string; leaseId: string; }; ttlMs: number; idempotencyKey?: string | undefined; }>;
```

## `executionLeaseSchema`

Runtime schema for Execution Lease.

- Kind: constant
- Import: `import { executionLeaseSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionLeaseSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; executionId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; acquiredAt: z.ZodString; expiresAt: z.ZodString; heartbeatAt: z.ZodString; }, "strict", z.ZodTypeAny, { id: string; executionId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; }, { id: string; executionId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; }>, { id: string; executionId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; }, { id: string; executionId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; }>;
```

## `executionRecordCompareAndSetRequestExample`

Valid example value for Execution Record Compare And Set Request.

- Kind: constant
- Import: `import { executionRecordCompareAndSetRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionRecordCompareAndSetRequestExample: ExecutionRecordCompareAndSetRequest;
```

## `executionRecordCompareAndSetRequestJsonSchema`

JSON Schema for Execution Record Compare And Set Request.

- Kind: constant
- Import: `import { executionRecordCompareAndSetRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionRecordCompareAndSetRequestJsonSchema: JsonSchema;
```

## `executionRecordCompareAndSetRequestSchema`

Runtime schema for Execution Record Compare And Set Request.

- Kind: constant
- Import: `import { executionRecordCompareAndSetRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionRecordCompareAndSetRequestSchema: (typeof import('@codesoul-co/hypha-core'))['executionRecordCompareAndSetRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionRecordCreateRequestExample`

Valid example value for Execution Record Create Request.

- Kind: constant
- Import: `import { executionRecordCreateRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionRecordCreateRequestExample: ExecutionRecordCreateRequest;
```

## `executionRecordCreateRequestJsonSchema`

JSON Schema for Execution Record Create Request.

- Kind: constant
- Import: `import { executionRecordCreateRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionRecordCreateRequestJsonSchema: JsonSchema;
```

## `executionRecordCreateRequestSchema`

Runtime schema for Execution Record Create Request.

- Kind: constant
- Import: `import { executionRecordCreateRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionRecordCreateRequestSchema: (typeof import('@codesoul-co/hypha-core'))['executionRecordCreateRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionRecordExample`

Valid example value for Execution Record.

- Kind: constant
- Import: `import { executionRecordExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionRecordExample: ExecutionRecord;
```

## `executionRecordJsonSchema`

JSON Schema for Execution Record.

- Kind: constant
- Import: `import { executionRecordJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionRecordJsonSchema: JsonSchema;
```

## `executionRecordPageJsonSchema`

JSON Schema for Execution Record Page.

- Kind: constant
- Import: `import { executionRecordPageJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionRecordPageJsonSchema: JsonSchema;
```

## `executionRecordPageSchema`

Runtime schema for Execution Record Page.

- Kind: constant
- Import: `import { executionRecordPageSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionRecordPageSchema: (typeof import('@codesoul-co/hypha-core'))['executionRecordPageSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionRecordQueryJsonSchema`

JSON Schema for Execution Record Query.

- Kind: constant
- Import: `import { executionRecordQueryJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionRecordQueryJsonSchema: JsonSchema;
```

## `executionRecordQuerySchema`

Runtime schema for Execution Record Query.

- Kind: constant
- Import: `import { executionRecordQuerySchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionRecordQuerySchema: z.ZodEffects<z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; workspaceId: z.ZodOptional<z.ZodString>; runId: z.ZodOptional<z.ZodString>; providerId: z.ZodOptional<z.ZodString>; statuses: z.ZodOptional<z.ZodArray<z.ZodEnum<["queued", "starting", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]>, "many">>; leaseExpiresBefore: z.ZodOptional<z.ZodString>; updatedBefore: z.ZodOptional<z.ZodString>; limit: z.ZodOptional<z.ZodNumber>; cursor: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { workspaceId?: string | undefined; runId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; providerId?: string | undefined; limit?: number | undefined; cursor?: string | undefined; leaseExpiresBefore?: string | undefined; statuses?: ("failed" | "starting" | "queued" | "running" | "cancelling" | "cancelled" | "completed" | "timed_out" | "oom_killed" | "resource_exceeded" | "quarantined")[] | undefined; updatedBefore?: string | undefined; }, { workspaceId?: string | undefined; runId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; providerId?: string | undefined; limit?: number | undefined; cursor?: string | undefined; leaseExpiresBefore?: string | undefined; statuses?: ("failed" | "starting" | "queued" | "running" | "cancelling" | "cancelled" | "completed" | "timed_out" | "oom_killed" | "resource_exceeded" | "quarantined")[] | undefined; updatedBefore?: string | undefined; }>, { workspaceId?: string | undefined; runId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; providerId?: string | undefined; limit?: number | undefined; cursor?: string | undefined; leaseExpiresBefore?: string | undefined; statuses?: ("failed" | "starting" | "queued" | "running" | "cancelling" | "cancelled" | "completed" | "timed_out" | "oom_killed" | "resource_exceeded" | "quarantined")[] | undefined; updatedBefore?: string | undefined; }, { workspaceId?: string | undefined; runId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; providerId?: string | undefined; limit?: number | undefined; cursor?: string | undefined; leaseExpiresBefore?: string | undefined; statuses?: ("failed" | "starting" | "queued" | "running" | "cancelling" | "cancelled" | "completed" | "timed_out" | "oom_killed" | "resource_exceeded" | "quarantined")[] | undefined; updatedBefore?: string | undefined; }>;
```

## `executionRecordSchema`

Runtime schema for Execution Record.

- Kind: constant
- Import: `import { executionRecordSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionRecordSchema: (typeof import('@codesoul-co/hypha-core'))['executionRecordSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionRecoveryAssessmentExample`

Valid example value for Execution Recovery Assessment.

- Kind: constant
- Import: `import { executionRecoveryAssessmentExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionRecoveryAssessmentExample: ExecutionRecoveryAssessment;
```

## `executionRecoveryAssessmentJsonSchema`

JSON Schema for Execution Recovery Assessment.

- Kind: constant
- Import: `import { executionRecoveryAssessmentJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionRecoveryAssessmentJsonSchema: JsonSchema;
```

## `executionRecoveryAssessmentSchema`

Runtime schema for Execution Recovery Assessment.

- Kind: constant
- Import: `import { executionRecoveryAssessmentSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionRecoveryAssessmentSchema: z.ZodEffects<z.ZodObject<{ executionId: z.ZodString; recordRevision: z.ZodNumber; disposition: z.ZodEnum<["not_started", "provider_queryable", "provider_completed_result_missing", "provider_state_unknown"]>; assessedAt: z.ZodString; providerStatusRef: z.ZodOptional<z.ZodString>; reason: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { executionId: string; disposition: "not_started" | "provider_queryable" | "provider_completed_result_missing" | "provider_state_unknown"; recordRevision: number; assessedAt: string; reason?: string | undefined; providerStatusRef?: string | undefined; }, { executionId: string; disposition: "not_started" | "provider_queryable" | "provider_completed_result_missing" | "provider_state_unknown"; recordRevision: number; assessedAt: string; reason?: string | undefined; providerStatusRef?: string | undefined; }>, { executionId: string; disposition: "not_started" | "provider_queryable" | "provider_completed_result_missing" | "provider_state_unknown"; recordRevision: number; assessedAt: string; reason?: string | undefined; providerStatusRef?: string | undefined; }, { executionId: string; disposition: "not_started" | "provider_queryable" | "provider_completed_result_missing" | "provider_state_unknown"; recordRevision: number; assessedAt: string; reason?: string | undefined; providerStatusRef?: string | undefined; }>;
```

## `executionRecoveryDispositionSchema`

Runtime schema for Execution Recovery Disposition.

- Kind: constant
- Import: `import { executionRecoveryDispositionSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionRecoveryDispositionSchema: z.ZodEnum<["not_started", "provider_queryable", "provider_completed_result_missing", "provider_state_unknown"]>;
```

## `executionStoreJsonSchemas`

Execution Store JSON Schemas constant exported by the `modules/execution-store/index` module.

- Kind: constant
- Import: `import { executionStoreJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare const executionStoreJsonSchemas: Record<string, JsonSchema>;
```

## `validateExecutionIdempotencyQuery`

Validate Execution Idempotency Query function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionIdempotencyQuery } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare function validateExecutionIdempotencyQuery(input: unknown): ExecutionIdempotencyQuery;
```

### Call signature

```text
validateExecutionIdempotencyQuery(input: unknown): ExecutionIdempotencyQuery
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionIdempotencyQuery`
- Description: The return contract is defined by the type shown above.

## `validateExecutionIdempotencyResolution`

Validate Execution Idempotency Resolution function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionIdempotencyResolution } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare function validateExecutionIdempotencyResolution(input: unknown): ExecutionIdempotencyResolution;
```

### Call signature

```text
validateExecutionIdempotencyResolution(input: unknown): ExecutionIdempotencyResolution
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionIdempotencyResolution`
- Description: The return contract is defined by the type shown above.

## `validateExecutionLease`

Validate Execution Lease function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionLease } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare function validateExecutionLease(input: unknown): ExecutionLease;
```

### Call signature

```text
validateExecutionLease(input: unknown): ExecutionLease
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionLease`
- Description: The return contract is defined by the type shown above.

## `validateExecutionLeaseAcquireRequest`

Validate Execution Lease Acquire Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionLeaseAcquireRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare function validateExecutionLeaseAcquireRequest(input: unknown): ExecutionLeaseAcquireRequest;
```

### Call signature

```text
validateExecutionLeaseAcquireRequest(input: unknown): ExecutionLeaseAcquireRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionLeaseAcquireRequest`
- Description: The return contract is defined by the type shown above.

## `validateExecutionLeaseReleaseRequest`

Validate Execution Lease Release Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionLeaseReleaseRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare function validateExecutionLeaseReleaseRequest(input: unknown): ExecutionLeaseReleaseRequest;
```

### Call signature

```text
validateExecutionLeaseReleaseRequest(input: unknown): ExecutionLeaseReleaseRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionLeaseReleaseRequest`
- Description: The return contract is defined by the type shown above.

## `validateExecutionLeaseRenewRequest`

Validate Execution Lease Renew Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionLeaseRenewRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare function validateExecutionLeaseRenewRequest(input: unknown): ExecutionLeaseRenewRequest;
```

### Call signature

```text
validateExecutionLeaseRenewRequest(input: unknown): ExecutionLeaseRenewRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionLeaseRenewRequest`
- Description: The return contract is defined by the type shown above.

## `validateExecutionRecord`

Validate Execution Record function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionRecord } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare function validateExecutionRecord(input: unknown): ExecutionRecord;
```

### Call signature

```text
validateExecutionRecord(input: unknown): ExecutionRecord
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionRecord`
- Description: The return contract is defined by the type shown above.

## `validateExecutionRecordCompareAndSetRequest`

Validate Execution Record Compare And Set Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionRecordCompareAndSetRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare function validateExecutionRecordCompareAndSetRequest(input: unknown): ExecutionRecordCompareAndSetRequest;
```

### Call signature

```text
validateExecutionRecordCompareAndSetRequest(input: unknown): ExecutionRecordCompareAndSetRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionRecordCompareAndSetRequest`
- Description: The return contract is defined by the type shown above.

## `validateExecutionRecordCreateRequest`

Validate Execution Record Create Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionRecordCreateRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare function validateExecutionRecordCreateRequest(input: unknown): ExecutionRecordCreateRequest;
```

### Call signature

```text
validateExecutionRecordCreateRequest(input: unknown): ExecutionRecordCreateRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionRecordCreateRequest`
- Description: The return contract is defined by the type shown above.

## `validateExecutionRecordQuery`

Validate Execution Record Query function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionRecordQuery } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare function validateExecutionRecordQuery(input: unknown): ExecutionRecordQuery;
```

### Call signature

```text
validateExecutionRecordQuery(input: unknown): ExecutionRecordQuery
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionRecordQuery`
- Description: The return contract is defined by the type shown above.

## `validateExecutionRecoveryAssessment`

Validate Execution Recovery Assessment function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionRecoveryAssessment } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### Declaration

```text
export declare function validateExecutionRecoveryAssessment(input: unknown): ExecutionRecoveryAssessment;
```

### Call signature

```text
validateExecutionRecoveryAssessment(input: unknown): ExecutionRecoveryAssessment
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionRecoveryAssessment`
- Description: The return contract is defined by the type shown above.
