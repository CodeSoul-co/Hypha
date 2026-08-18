# `@codesoul-co/hypha-core` / `contracts/runtime-capacity-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-capacity-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)
- Exports: **22**

## Using this module

Use the Runtime capacity schemas module for declaring and runtime-validating contracts. It exports 22 constants.

### Import from the package entrypoint

```ts
import {
  runtimeCapacityAcquireRequestSchema,
  runtimeCapacityAssertionRequestSchema,
  runtimeCapacityContractDefinitions,
  runtimeCapacityContractJsonSchemas,
  runtimeCapacityLeaseDefinition,
  runtimeCapacityLeaseGuardSchema,
  runtimeCapacityLeaseSchema,
  runtimeCapacityPolicyDefinition,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The 22 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { runtimeCapacityAcquireRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeCapacityAcquireRequestSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeCapacityAcquireRequestSchema` | constant | <code>const runtimeCapacityAcquireRequestSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; } &amp; { kind: z.ZodEnum&lt;["model", "tool", "execution"]&gt;; operationId: z.ZodString; requestedLeaseId: z.ZodString; ownerId: z.ZodString; acquiredAt: z.ZodString; ttlMs: z.ZodNumber; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; kind: "tool" ...</code> | Runtime schema for Runtime Capacity Acquire Request. |
| `runtimeCapacityAssertionRequestSchema` | constant | <code>const runtimeCapacityAssertionRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; tenantId?: string &#124; undefined; }&gt;; kind: z.ZodEnum&lt;["model", "tool", "execution"]&gt;; guard: z.ZodObject&lt;{ leaseId: z.ZodString; owne...</code> | Runtime schema for Runtime Capacity Assertion Request. |
| `runtimeCapacityContractDefinitions` | constant | <code>const runtimeCapacityContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeCapacityPolicy&gt;, SpecSchemaDefinition&lt;RuntimeCapacityLease&gt;]</code> | Runtime Capacity Contract Definitions constant exported by the `contracts/runtime-capacity-schemas` module. |
| `runtimeCapacityContractJsonSchemas` | constant | <code>const runtimeCapacityContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Runtime Capacity Contract JSON Schemas constant exported by the `contracts/runtime-capacity-schemas` module. |
| `runtimeCapacityLeaseDefinition` | constant | <code>const runtimeCapacityLeaseDefinition: SpecSchemaDefinition&lt;RuntimeCapacityLease&gt;</code> | Runtime Capacity Lease Definition constant exported by the `contracts/runtime-capacity-schemas` module. |
| `runtimeCapacityLeaseGuardSchema` | constant | <code>const runtimeCapacityLeaseGuardSchema: z.ZodObject&lt;{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }&gt;</code> | Runtime schema for Runtime Capacity Lease Guard. |
| `runtimeCapacityLeaseSchema` | constant | <code>const runtimeCapacityLeaseSchema: z.ZodEffects&lt;z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; } &amp; { id: z.ZodString; kind: z.ZodEnum&lt;["model", "tool", "execution"]&gt;; operationId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; policyRevision: z.ZodString; acquiredAt: z.ZodString; heartbeatAt: z.ZodString; expiresAt: z.ZodString; }, "strict", z.ZodTypeAny,...</code> | Runtime schema for Runtime Capacity Lease. |
| `runtimeCapacityPolicyDefinition` | constant | <code>const runtimeCapacityPolicyDefinition: SpecSchemaDefinition&lt;RuntimeCapacityPolicy&gt;</code> | Runtime Capacity Policy Definition constant exported by the `contracts/runtime-capacity-schemas` module. |
| `runtimeCapacityPolicySchema` | constant | <code>const runtimeCapacityPolicySchema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; revision: z.ZodString; limits: z.ZodObject&lt;{ model: z.ZodEffects&lt;z.ZodObject&lt;{ global: z.ZodNumber; perUser: z.ZodNumber; }, "strict", z.ZodTypeAny, { global: number; perUser: number; }, { global: number; perUser: number; }&gt;, { global: number; perUser: number; }, { global: number; perUser: number; }&gt;; tool: z.ZodEffects&lt;z.ZodObject&lt;{ ...</code> | Runtime schema for Runtime Capacity Policy. |
| `runtimeCapacityReleaseRequestSchema` | constant | <code>const runtimeCapacityReleaseRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; tenantId?: string &#124; undefined; }&gt;; kind: z.ZodEnum&lt;["model", "tool", "execution"]&gt;; guard: z.ZodObject&lt;{ leaseId: z.ZodString; ownerI...</code> | Runtime schema for Runtime Capacity Release Request. |
| `runtimeCapacityRenewRequestSchema` | constant | <code>const runtimeCapacityRenewRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; tenantId?: string &#124; undefined; }&gt;; kind: z.ZodEnum&lt;["model", "tool", "execution"]&gt;; guard: z.ZodObject&lt;{ leaseId: z.ZodString; ownerId:...</code> | Runtime schema for Runtime Capacity Renew Request. |
| `runtimeCapacityScopeSchema` | constant | <code>const runtimeCapacityScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; tenantId?: string &#124; undefined; }&gt;</code> | Runtime schema for Runtime Capacity Scope. |
| `runtimeCapacityUsageRequestSchema` | constant | <code>const runtimeCapacityUsageRequestSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; kind: z.ZodEnum&lt;["model", "tool", "execution"]&gt;; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; kind: "tool" &#124; "model" &#124; "execution"; checkedAt: string; tenantId?: string &#124; undefined; }, { userId: string; kind: "tool" &#124; "model" &#124; "execution"; checkedAt: string; tenantId?: string &#124;...</code> | Runtime schema for Runtime Capacity Usage Request. |
| `runtimeCapacityUsageSchema` | constant | <code>const runtimeCapacityUsageSchema: z.ZodObject&lt;{ kind: z.ZodEnum&lt;["model", "tool", "execution"]&gt;; policyRevision: z.ZodString; globalActive: z.ZodNumber; userActive: z.ZodNumber; globalLimit: z.ZodNumber; userLimit: z.ZodNumber; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { kind: "tool" &#124; "model" &#124; "execution"; checkedAt: string; policyRevision: string; globalActive: number; userActive: number; globalLimit: ...</code> | Runtime schema for Runtime Capacity Usage. |
| `validateRuntimeCapacityAcquireRequest` | constant | <code>const validateRuntimeCapacityAcquireRequest: (input: unknown) =&gt; RuntimeCapacityAcquireRequest</code> | Validate Runtime Capacity Acquire Request constant exported by the `contracts/runtime-capacity-schemas` module. |
| `validateRuntimeCapacityAssertionRequest` | constant | <code>const validateRuntimeCapacityAssertionRequest: (input: unknown) =&gt; RuntimeCapacityAssertionRequest</code> | Validate Runtime Capacity Assertion Request constant exported by the `contracts/runtime-capacity-schemas` module. |
| `validateRuntimeCapacityLease` | constant | <code>const validateRuntimeCapacityLease: (input: unknown) =&gt; RuntimeCapacityLease</code> | Validate Runtime Capacity Lease constant exported by the `contracts/runtime-capacity-schemas` module. |
| `validateRuntimeCapacityPolicy` | constant | <code>const validateRuntimeCapacityPolicy: (input: unknown) =&gt; RuntimeCapacityPolicy</code> | Validate Runtime Capacity Policy constant exported by the `contracts/runtime-capacity-schemas` module. |
| `validateRuntimeCapacityReleaseRequest` | constant | <code>const validateRuntimeCapacityReleaseRequest: (input: unknown) =&gt; RuntimeCapacityReleaseRequest</code> | Validate Runtime Capacity Release Request constant exported by the `contracts/runtime-capacity-schemas` module. |
| `validateRuntimeCapacityRenewRequest` | constant | <code>const validateRuntimeCapacityRenewRequest: (input: unknown) =&gt; RuntimeCapacityRenewRequest</code> | Validate Runtime Capacity Renew Request constant exported by the `contracts/runtime-capacity-schemas` module. |
| `validateRuntimeCapacityUsage` | constant | <code>const validateRuntimeCapacityUsage: (input: unknown) =&gt; RuntimeCapacityUsage</code> | Validate Runtime Capacity Usage constant exported by the `contracts/runtime-capacity-schemas` module. |
| `validateRuntimeCapacityUsageRequest` | constant | <code>const validateRuntimeCapacityUsageRequest: (input: unknown) =&gt; RuntimeCapacityUsageRequest</code> | Validate Runtime Capacity Usage Request constant exported by the `contracts/runtime-capacity-schemas` module. |

## `runtimeCapacityAcquireRequestSchema`

Runtime schema for Runtime Capacity Acquire Request.

- Kind: constant
- Import: `import { runtimeCapacityAcquireRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const runtimeCapacityAcquireRequestSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; } & { kind: z.ZodEnum<["model", "tool", "execution"]>; operationId: z.ZodString; requestedLeaseId: z.ZodString; ownerId: z.ZodString; acquiredAt: z.ZodString; ttlMs: z.ZodNumber; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; kind: "tool" | "model" | "execution"; operationId: string; idempotencyKey: string; ownerId: string; acquiredAt: string; requestedLeaseId: string; ttlMs: number; tenantId?: string | undefined; }, { userId: string; runId: string; kind: "tool" | "model" | "execution"; operationId: string; idempotencyKey: string; ownerId: string; acquiredAt: string; requestedLeaseId: string; ttlMs: number; tenantId?: string | undefined; }>;
```

## `runtimeCapacityAssertionRequestSchema`

Runtime schema for Runtime Capacity Assertion Request.

- Kind: constant
- Import: `import { runtimeCapacityAssertionRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const runtimeCapacityAssertionRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string | undefined; }, { userId: string; runId: string; tenantId?: string | undefined; }>; kind: z.ZodEnum<["model", "tool", "execution"]>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { kind: "tool" | "model" | "execution"; scope: { userId: string; runId: string; tenantId?: string | undefined; }; checkedAt: string; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { kind: "tool" | "model" | "execution"; scope: { userId: string; runId: string; tenantId?: string | undefined; }; checkedAt: string; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>;
```

## `runtimeCapacityContractDefinitions`

Runtime Capacity Contract Definitions constant exported by the `contracts/runtime-capacity-schemas` module.

- Kind: constant
- Import: `import { runtimeCapacityContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const runtimeCapacityContractDefinitions: readonly [SpecSchemaDefinition<RuntimeCapacityPolicy>, SpecSchemaDefinition<RuntimeCapacityLease>];
```

## `runtimeCapacityContractJsonSchemas`

Runtime Capacity Contract JSON Schemas constant exported by the `contracts/runtime-capacity-schemas` module.

- Kind: constant
- Import: `import { runtimeCapacityContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const runtimeCapacityContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeCapacityLeaseDefinition`

Runtime Capacity Lease Definition constant exported by the `contracts/runtime-capacity-schemas` module.

- Kind: constant
- Import: `import { runtimeCapacityLeaseDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const runtimeCapacityLeaseDefinition: SpecSchemaDefinition<RuntimeCapacityLease>;
```

## `runtimeCapacityLeaseGuardSchema`

Runtime schema for Runtime Capacity Lease Guard.

- Kind: constant
- Import: `import { runtimeCapacityLeaseGuardSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const runtimeCapacityLeaseGuardSchema: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>;
```

## `runtimeCapacityLeaseSchema`

Runtime schema for Runtime Capacity Lease.

- Kind: constant
- Import: `import { runtimeCapacityLeaseSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const runtimeCapacityLeaseSchema: z.ZodEffects<z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; } & { id: z.ZodString; kind: z.ZodEnum<["model", "tool", "execution"]>; operationId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; policyRevision: z.ZodString; acquiredAt: z.ZodString; heartbeatAt: z.ZodString; expiresAt: z.ZodString; }, "strict", z.ZodTypeAny, { id: string; userId: string; runId: string; kind: "tool" | "model" | "execution"; expiresAt: string; operationId: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; policyRevision: string; tenantId?: string | undefined; }, { id: string; userId: string; runId: string; kind: "tool" | "model" | "execution"; expiresAt: string; operationId: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; policyRevision: string; tenantId?: string | undefined; }>, { id: string; userId: string; runId: string; kind: "tool" | "model" | "execution"; expiresAt: string; operationId: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; policyRevision: string; tenantId?: string | undefined; }, { id: string; userId: string; runId: string; kind: "tool" | "model" | "execution"; expiresAt: string; operationId: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; policyRevision: string; tenantId?: string | undefined; }>;
```

## `runtimeCapacityPolicyDefinition`

Runtime Capacity Policy Definition constant exported by the `contracts/runtime-capacity-schemas` module.

- Kind: constant
- Import: `import { runtimeCapacityPolicyDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const runtimeCapacityPolicyDefinition: SpecSchemaDefinition<RuntimeCapacityPolicy>;
```

## `runtimeCapacityPolicySchema`

Runtime schema for Runtime Capacity Policy.

- Kind: constant
- Import: `import { runtimeCapacityPolicySchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const runtimeCapacityPolicySchema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; revision: z.ZodString; limits: z.ZodObject<{ model: z.ZodEffects<z.ZodObject<{ global: z.ZodNumber; perUser: z.ZodNumber; }, "strict", z.ZodTypeAny, { global: number; perUser: number; }, { global: number; perUser: number; }>, { global: number; perUser: number; }, { global: number; perUser: number; }>; tool: z.ZodEffects<z.ZodObject<{ global: z.ZodNumber; perUser: z.ZodNumber; }, "strict", z.ZodTypeAny, { global: number; perUser: number; }, { global: number; perUser: number; }>, { global: number; perUser: number; }, { global: number; perUser: number; }>; execution: z.ZodEffects<z.ZodObject<{ global: z.ZodNumber; perUser: z.ZodNumber; }, "strict", z.ZodTypeAny, { global: number; perUser: number; }, { global: number; perUser: number; }>, { global: number; perUser: number; }, { global: number; perUser: number; }>; }, "strict", z.ZodTypeAny, { tool: { global: number; perUser: number; }; model: { global: number; perUser: number; }; execution: { global: number; perUser: number; }; }, { tool: { global: number; perUser: number; }; model: { global: number; perUser: number; }; execution: { global: number; perUser: number; }; }>; }, "strict", z.ZodTypeAny, { revision: string; version: "1.0.0"; limits: { tool: { global: number; perUser: number; }; model: { global: number; perUser: number; }; execution: { global: number; perUser: number; }; }; }, { revision: string; version: "1.0.0"; limits: { tool: { global: number; perUser: number; }; model: { global: number; perUser: number; }; execution: { global: number; perUser: number; }; }; }>;
```

## `runtimeCapacityReleaseRequestSchema`

Runtime schema for Runtime Capacity Release Request.

- Kind: constant
- Import: `import { runtimeCapacityReleaseRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const runtimeCapacityReleaseRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string | undefined; }, { userId: string; runId: string; tenantId?: string | undefined; }>; kind: z.ZodEnum<["model", "tool", "execution"]>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; releasedAt: z.ZodString; }, "strict", z.ZodTypeAny, { kind: "tool" | "model" | "execution"; scope: { userId: string; runId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; releasedAt: string; }, { kind: "tool" | "model" | "execution"; scope: { userId: string; runId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; releasedAt: string; }>;
```

## `runtimeCapacityRenewRequestSchema`

Runtime schema for Runtime Capacity Renew Request.

- Kind: constant
- Import: `import { runtimeCapacityRenewRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const runtimeCapacityRenewRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string | undefined; }, { userId: string; runId: string; tenantId?: string | undefined; }>; kind: z.ZodEnum<["model", "tool", "execution"]>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; renewedAt: z.ZodString; ttlMs: z.ZodNumber; }, "strict", z.ZodTypeAny, { kind: "tool" | "model" | "execution"; scope: { userId: string; runId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; ttlMs: number; renewedAt: string; }, { kind: "tool" | "model" | "execution"; scope: { userId: string; runId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; ttlMs: number; renewedAt: string; }>;
```

## `runtimeCapacityScopeSchema`

Runtime schema for Runtime Capacity Scope.

- Kind: constant
- Import: `import { runtimeCapacityScopeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const runtimeCapacityScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string | undefined; }, { userId: string; runId: string; tenantId?: string | undefined; }>;
```

## `runtimeCapacityUsageRequestSchema`

Runtime schema for Runtime Capacity Usage Request.

- Kind: constant
- Import: `import { runtimeCapacityUsageRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const runtimeCapacityUsageRequestSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; kind: z.ZodEnum<["model", "tool", "execution"]>; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; kind: "tool" | "model" | "execution"; checkedAt: string; tenantId?: string | undefined; }, { userId: string; kind: "tool" | "model" | "execution"; checkedAt: string; tenantId?: string | undefined; }>;
```

## `runtimeCapacityUsageSchema`

Runtime schema for Runtime Capacity Usage.

- Kind: constant
- Import: `import { runtimeCapacityUsageSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const runtimeCapacityUsageSchema: z.ZodObject<{ kind: z.ZodEnum<["model", "tool", "execution"]>; policyRevision: z.ZodString; globalActive: z.ZodNumber; userActive: z.ZodNumber; globalLimit: z.ZodNumber; userLimit: z.ZodNumber; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { kind: "tool" | "model" | "execution"; checkedAt: string; policyRevision: string; globalActive: number; userActive: number; globalLimit: number; userLimit: number; }, { kind: "tool" | "model" | "execution"; checkedAt: string; policyRevision: string; globalActive: number; userActive: number; globalLimit: number; userLimit: number; }>;
```

## `validateRuntimeCapacityAcquireRequest`

Validate Runtime Capacity Acquire Request constant exported by the `contracts/runtime-capacity-schemas` module.

- Kind: constant
- Import: `import { validateRuntimeCapacityAcquireRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const validateRuntimeCapacityAcquireRequest: (input: unknown) => RuntimeCapacityAcquireRequest;
```

## `validateRuntimeCapacityAssertionRequest`

Validate Runtime Capacity Assertion Request constant exported by the `contracts/runtime-capacity-schemas` module.

- Kind: constant
- Import: `import { validateRuntimeCapacityAssertionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const validateRuntimeCapacityAssertionRequest: (input: unknown) => RuntimeCapacityAssertionRequest;
```

## `validateRuntimeCapacityLease`

Validate Runtime Capacity Lease constant exported by the `contracts/runtime-capacity-schemas` module.

- Kind: constant
- Import: `import { validateRuntimeCapacityLease } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const validateRuntimeCapacityLease: (input: unknown) => RuntimeCapacityLease;
```

## `validateRuntimeCapacityPolicy`

Validate Runtime Capacity Policy constant exported by the `contracts/runtime-capacity-schemas` module.

- Kind: constant
- Import: `import { validateRuntimeCapacityPolicy } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const validateRuntimeCapacityPolicy: (input: unknown) => RuntimeCapacityPolicy;
```

## `validateRuntimeCapacityReleaseRequest`

Validate Runtime Capacity Release Request constant exported by the `contracts/runtime-capacity-schemas` module.

- Kind: constant
- Import: `import { validateRuntimeCapacityReleaseRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const validateRuntimeCapacityReleaseRequest: (input: unknown) => RuntimeCapacityReleaseRequest;
```

## `validateRuntimeCapacityRenewRequest`

Validate Runtime Capacity Renew Request constant exported by the `contracts/runtime-capacity-schemas` module.

- Kind: constant
- Import: `import { validateRuntimeCapacityRenewRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const validateRuntimeCapacityRenewRequest: (input: unknown) => RuntimeCapacityRenewRequest;
```

## `validateRuntimeCapacityUsage`

Validate Runtime Capacity Usage constant exported by the `contracts/runtime-capacity-schemas` module.

- Kind: constant
- Import: `import { validateRuntimeCapacityUsage } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const validateRuntimeCapacityUsage: (input: unknown) => RuntimeCapacityUsage;
```

## `validateRuntimeCapacityUsageRequest`

Validate Runtime Capacity Usage Request constant exported by the `contracts/runtime-capacity-schemas` module.

- Kind: constant
- Import: `import { validateRuntimeCapacityUsageRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### Declaration

```text
export declare const validateRuntimeCapacityUsageRequest: (input: unknown) => RuntimeCapacityUsageRequest;
```
