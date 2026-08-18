# `@codesoul-co/hypha-core` / `contracts/runtime-coordination-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-coordination-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)
- Exports: **56**

## Using this module

Use the Runtime coordination schemas module for declaring and runtime-validating contracts. It exports 38 constants, 18 functions.

### Import from the package entrypoint

```ts
import {
  fencedRunLeaseDefinition,
  fencedRunLeaseExample,
  fencedRunLeaseJsonSchema,
  fencedRunLeaseSchema,
  resourceAcquireRequestSchema,
  resourceClaimAssertionRequestSchema,
  resourceListRequestSchema,
  resourceReleaseRequestSchema,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 18 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 38 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { fencedRunLeaseSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = fencedRunLeaseSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fencedRunLeaseDefinition` | constant | <code>const fencedRunLeaseDefinition: SpecSchemaDefinition&lt;FencedRunLease&gt;</code> | Fenced Run Lease Definition constant exported by the `contracts/runtime-coordination-schemas` module. |
| `fencedRunLeaseExample` | constant | <code>const fencedRunLeaseExample: FencedRunLease</code> | Valid example value for Fenced Run Lease. |
| `fencedRunLeaseJsonSchema` | constant | <code>const fencedRunLeaseJsonSchema: JsonSchema</code> | JSON Schema for Fenced Run Lease. |
| `fencedRunLeaseSchema` | constant | <code>const fencedRunLeaseSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; ownerId: z.ZodString; acquiredAt: z.ZodString; expiresAt: z.ZodString; heartbeatAt: z.ZodString; revision: z.ZodNumber; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { id: string; revision: number; userId: string; runId: string; ex...</code> | Runtime schema for Fenced Run Lease. |
| `resourceAcquireRequestSchema` | constant | <code>const resourceAcquireRequestSchema: z.ZodObject&lt;{ runLease: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;; guard: z.Z...</code> | Runtime schema for Resource Acquire Request. |
| `resourceClaimAssertionRequestSchema` | constant | <code>const resourceClaimAssertionRequestSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; resourceType: z.ZodEnum&lt;["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]&gt;; resourceKey: z.ZodString; checkedAt: z.ZodString; } &amp; { claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; checkedAt: string; ownerId: stri...</code> | Runtime schema for Resource Claim Assertion Request. |
| `resourceListRequestSchema` | constant | <code>const resourceListRequestSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; resourceType: z.ZodEnum&lt;["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]&gt;; resourceKey: z.ZodString; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { checkedAt: string; resourceType: "custom" &#124; "workspace" &#124; "artifact" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"; resourceKey: strin...</code> | Runtime schema for Resource List Request. |
| `resourceReleaseRequestSchema` | constant | <code>const resourceReleaseRequestSchema: z.ZodObject&lt;{ runLease: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;; guard: z.Z...</code> | Runtime schema for Resource Release Request. |
| `resourceRenewRequestSchema` | constant | <code>const resourceRenewRequestSchema: z.ZodObject&lt;{ runLease: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;; guard: z.Zod...</code> | Runtime schema for Resource Renew Request. |
| `runLeaseAcquireRequestSchema` | constant | <code>const runLeaseAcquireRequestSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; requestedLeaseId: z.ZodString; ownerId: z.ZodString; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; idempotencyKey: string; ownerId: string; acquiredAt: string; requestedLeas...</code> | Runtime schema for Run Lease Acquire Request. |
| `runLeaseAssertionRequestSchema` | constant | <code>const runLeaseAssertionRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;; guard: z.ZodObject&lt;{ leaseId: z....</code> | Runtime schema for Run Lease Assertion Request. |
| `runLeaseAuthorizationSchema` | constant | <code>const runLeaseAuthorizationSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;; guard: z.ZodObject&lt;{ leaseId: z.Zod...</code> | Runtime schema for Run Lease Authorization. |
| `runLeaseGuardJsonSchema` | constant | <code>const runLeaseGuardJsonSchema: JsonSchema</code> | JSON Schema for Run Lease Guard. |
| `runLeaseGuardSchema` | constant | <code>const runLeaseGuardSchema: z.ZodObject&lt;{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }&gt;</code> | Runtime schema for Run Lease Guard. |
| `runLeaseHeartbeatRequestSchema` | constant | <code>const runLeaseHeartbeatRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;; guard: z.ZodObject&lt;{ leaseId: z....</code> | Runtime schema for Run Lease Heartbeat Request. |
| `runLeasePreemptRequestSchema` | constant | <code>const runLeasePreemptRequestSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; requestedLeaseId: z.ZodString; ownerId: z.ZodString; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodString; } &amp; { reason: z.ZodLiteral&lt;"cancellation"&gt;; }, "strict", z.ZodTypeAny, { userId: string; runId: string; reason: "cancellation"; idempo...</code> | Runtime schema for Run Lease Preempt Request. |
| `runLeaseReleaseRequestSchema` | constant | <code>const runLeaseReleaseRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;; guard: z.ZodObject&lt;{ leaseId: z.Zo...</code> | Runtime schema for Run Lease Release Request. |
| `runLeaseScopeJsonSchema` | constant | <code>const runLeaseScopeJsonSchema: JsonSchema</code> | JSON Schema for Run Lease Scope. |
| `runLeaseScopeSchema` | constant | <code>const runLeaseScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;</code> | Runtime schema for Run Lease Scope. |
| `runtimeCoordinationContractDefinitions` | constant | <code>const runtimeCoordinationContractDefinitions: readonly [SpecSchemaDefinition&lt;FencedRunLease&gt;, SpecSchemaDefinition&lt;StateExecutionClaim&gt;, SpecSchemaDefinition&lt;RuntimeResourceClaim&gt;]</code> | Runtime Coordination Contract Definitions constant exported by the `contracts/runtime-coordination-schemas` module. |
| `runtimeCoordinationContractJsonSchemas` | constant | <code>const runtimeCoordinationContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Runtime Coordination Contract JSON Schemas constant exported by the `contracts/runtime-coordination-schemas` module. |
| `runtimeResourceClaimDefinition` | constant | <code>const runtimeResourceClaimDefinition: SpecSchemaDefinition&lt;RuntimeResourceClaim&gt;</code> | Runtime Resource Claim Definition constant exported by the `contracts/runtime-coordination-schemas` module. |
| `runtimeResourceClaimExample` | constant | <code>const runtimeResourceClaimExample: RuntimeResourceClaim</code> | Valid example value for Runtime Resource Claim. |
| `runtimeResourceClaimJsonSchema` | constant | <code>const runtimeResourceClaimJsonSchema: JsonSchema</code> | JSON Schema for Runtime Resource Claim. |
| `runtimeResourceClaimModeSchema` | constant | <code>const runtimeResourceClaimModeSchema: z.ZodEnum&lt;["shared", "exclusive"]&gt;</code> | Runtime schema for Runtime Resource Claim Mode. |
| `runtimeResourceClaimSchema` | constant | <code>const runtimeResourceClaimSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; resourceType: z.ZodEnum&lt;["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]&gt;; resourceKey: z.ZodString; mode: z.ZodEnum&lt;["shared", "exclusive"]&gt;; runId: z.ZodString; stateId: z.ZodOptional&lt;z.ZodString&gt;; ownerId: z.ZodString; fencingToken: z.ZodNu...</code> | Runtime schema for Runtime Resource Claim. |
| `runtimeResourceTypeSchema` | constant | <code>const runtimeResourceTypeSchema: z.ZodEnum&lt;["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]&gt;</code> | Runtime schema for Runtime Resource Type. |
| `stateExecutionClaimAcquireRequestSchema` | constant | <code>const stateExecutionClaimAcquireRequestSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; requestedClaimId: z.ZodString; processRevision: z.ZodString; expectedRunRevision: z.ZodNumber; runLease: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partition...</code> | Runtime schema for State Execution Claim Acquire Request. |
| `stateExecutionClaimAssertionRequestSchema` | constant | <code>const stateExecutionClaimAssertionRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; ...</code> | Runtime schema for State Execution Claim Assertion Request. |
| `stateExecutionClaimCompleteRequestSchema` | constant | <code>const stateExecutionClaimCompleteRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; t...</code> | Runtime schema for State Execution Claim Complete Request. |
| `stateExecutionClaimDefinition` | constant | <code>const stateExecutionClaimDefinition: SpecSchemaDefinition&lt;StateExecutionClaim&gt;</code> | State Execution Claim Definition constant exported by the `contracts/runtime-coordination-schemas` module. |
| `stateExecutionClaimExample` | constant | <code>const stateExecutionClaimExample: StateExecutionClaim</code> | Valid example value for State Execution Claim. |
| `stateExecutionClaimGuardSchema` | constant | <code>const stateExecutionClaimGuardSchema: z.ZodObject&lt;{ claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; claimId: string; }, { fencingToken: number; ownerId: string; claimId: string; }&gt;</code> | Runtime schema for State Execution Claim Guard. |
| `stateExecutionClaimJsonSchema` | constant | <code>const stateExecutionClaimJsonSchema: JsonSchema</code> | JSON Schema for State Execution Claim. |
| `stateExecutionClaimReleaseRequestSchema` | constant | <code>const stateExecutionClaimReleaseRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; te...</code> | Runtime schema for State Execution Claim Release Request. |
| `stateExecutionClaimRenewRequestSchema` | constant | <code>const stateExecutionClaimRenewRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; tena...</code> | Runtime schema for State Execution Claim Renew Request. |
| `stateExecutionClaimSchema` | constant | <code>const stateExecutionClaimSchema: z.ZodEffects&lt;z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; claimId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; processRevision: z.ZodString; expectedRunRevision: z.ZodNumber; fencingToken: z.ZodNumber; ownerId: z.ZodString; status: z.ZodEnum&lt;["claimed", "completed", "released", "expired"]&gt;; acquiredAt: z.ZodString; e...</code> | Runtime schema for State Execution Claim. |
| `stateExecutionClaimScopeSchema` | constant | <code>const stateExecutionClaimScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }&gt;</code> | Runtime schema for State Execution Claim Scope. |
| `validateFencedRunLease` | function | <code>validateFencedRunLease(input: unknown): FencedRunLease</code> | Validate Fenced Run Lease function with 1 public call signature; parameters and return types are listed below. |
| `validateResourceAcquireRequest` | function | <code>validateResourceAcquireRequest(input: unknown): ResourceAcquireRequest</code> | Validate Resource Acquire Request function with 1 public call signature; parameters and return types are listed below. |
| `validateResourceClaimAssertionRequest` | function | <code>validateResourceClaimAssertionRequest(input: unknown): ResourceClaimAssertionRequest</code> | Validate Resource Claim Assertion Request function with 1 public call signature; parameters and return types are listed below. |
| `validateResourceListRequest` | function | <code>validateResourceListRequest(input: unknown): ResourceListRequest</code> | Validate Resource List Request function with 1 public call signature; parameters and return types are listed below. |
| `validateResourceReleaseRequest` | function | <code>validateResourceReleaseRequest(input: unknown): ResourceReleaseRequest</code> | Validate Resource Release Request function with 1 public call signature; parameters and return types are listed below. |
| `validateResourceRenewRequest` | function | <code>validateResourceRenewRequest(input: unknown): ResourceRenewRequest</code> | Validate Resource Renew Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRunLeaseAcquireRequest` | function | <code>validateRunLeaseAcquireRequest(input: unknown): RunLeaseAcquireRequest</code> | Validate Run Lease Acquire Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRunLeaseAssertionRequest` | function | <code>validateRunLeaseAssertionRequest(input: unknown): RunLeaseAssertionRequest</code> | Validate Run Lease Assertion Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRunLeaseHeartbeatRequest` | function | <code>validateRunLeaseHeartbeatRequest(input: unknown): RunLeaseHeartbeatRequest</code> | Validate Run Lease Heartbeat Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRunLeasePreemptRequest` | function | <code>validateRunLeasePreemptRequest(input: unknown): RunLeasePreemptRequest</code> | Validate Run Lease Preempt Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRunLeaseReleaseRequest` | function | <code>validateRunLeaseReleaseRequest(input: unknown): RunLeaseReleaseRequest</code> | Validate Run Lease Release Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeResourceClaim` | function | <code>validateRuntimeResourceClaim(input: unknown): RuntimeResourceClaim</code> | Validate Runtime Resource Claim function with 1 public call signature; parameters and return types are listed below. |
| `validateStateExecutionClaim` | function | <code>validateStateExecutionClaim(input: unknown): StateExecutionClaim</code> | Validate State Execution Claim function with 1 public call signature; parameters and return types are listed below. |
| `validateStateExecutionClaimAcquireRequest` | function | <code>validateStateExecutionClaimAcquireRequest(input: unknown): StateExecutionClaimAcquireRequest</code> | Validate State Execution Claim Acquire Request function with 1 public call signature; parameters and return types are listed below. |
| `validateStateExecutionClaimAssertionRequest` | function | <code>validateStateExecutionClaimAssertionRequest(input: unknown): StateExecutionClaimAssertionRequest</code> | Validate State Execution Claim Assertion Request function with 1 public call signature; parameters and return types are listed below. |
| `validateStateExecutionClaimCompleteRequest` | function | <code>validateStateExecutionClaimCompleteRequest(input: unknown): StateExecutionClaimCompleteRequest</code> | Validate State Execution Claim Complete Request function with 1 public call signature; parameters and return types are listed below. |
| `validateStateExecutionClaimReleaseRequest` | function | <code>validateStateExecutionClaimReleaseRequest(input: unknown): StateExecutionClaimReleaseRequest</code> | Validate State Execution Claim Release Request function with 1 public call signature; parameters and return types are listed below. |
| `validateStateExecutionClaimRenewRequest` | function | <code>validateStateExecutionClaimRenewRequest(input: unknown): StateExecutionClaimRenewRequest</code> | Validate State Execution Claim Renew Request function with 1 public call signature; parameters and return types are listed below. |

## `fencedRunLeaseDefinition`

Fenced Run Lease Definition constant exported by the `contracts/runtime-coordination-schemas` module.

- Kind: constant
- Import: `import { fencedRunLeaseDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const fencedRunLeaseDefinition: SpecSchemaDefinition<FencedRunLease>;
```

## `fencedRunLeaseExample`

Valid example value for Fenced Run Lease.

- Kind: constant
- Import: `import { fencedRunLeaseExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const fencedRunLeaseExample: FencedRunLease;
```

## `fencedRunLeaseJsonSchema`

JSON Schema for Fenced Run Lease.

- Kind: constant
- Import: `import { fencedRunLeaseJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const fencedRunLeaseJsonSchema: JsonSchema;
```

## `fencedRunLeaseSchema`

Runtime schema for Fenced Run Lease.

- Kind: constant
- Import: `import { fencedRunLeaseSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const fencedRunLeaseSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; ownerId: z.ZodString; acquiredAt: z.ZodString; expiresAt: z.ZodString; heartbeatAt: z.ZodString; revision: z.ZodNumber; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { id: string; revision: number; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; partitionKey: string; tenantId?: string | undefined; }, { id: string; revision: number; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; partitionKey: string; tenantId?: string | undefined; }>, { id: string; revision: number; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; partitionKey: string; tenantId?: string | undefined; }, { id: string; revision: number; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; partitionKey: string; tenantId?: string | undefined; }>;
```

## `resourceAcquireRequestSchema`

Runtime schema for Resource Acquire Request.

- Kind: constant
- Import: `import { resourceAcquireRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const resourceAcquireRequestSchema: z.ZodObject<{ runLease: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>; stateId: z.ZodOptional<z.ZodString>; resources: z.ZodArray<z.ZodObject<{ requestedClaimId: z.ZodString; resourceType: z.ZodEnum<["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]>; resourceKey: z.ZodString; mode: z.ZodEnum<["shared", "exclusive"]>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>>>; }, "strict", z.ZodTypeAny, { requestedClaimId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; metadata?: Record<string, JsonValue> | undefined; }, { requestedClaimId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; metadata?: Record<string, JsonValue> | undefined; }>, "many">; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { idempotencyKey: string; resources: { requestedClaimId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; metadata?: Record<string, JsonValue> | undefined; }[]; acquiredAt: string; ttlMs: number; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; stateId?: string | undefined; }, { idempotencyKey: string; resources: { requestedClaimId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; metadata?: Record<string, JsonValue> | undefined; }[]; acquiredAt: string; ttlMs: number; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; stateId?: string | undefined; }>;
```

## `resourceClaimAssertionRequestSchema`

Runtime schema for Resource Claim Assertion Request.

- Kind: constant
- Import: `import { resourceClaimAssertionRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const resourceClaimAssertionRequestSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; resourceType: z.ZodEnum<["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]>; resourceKey: z.ZodString; checkedAt: z.ZodString; } & { claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; checkedAt: string; ownerId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; claimId: string; tenantId?: string | undefined; }, { fencingToken: number; checkedAt: string; ownerId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; claimId: string; tenantId?: string | undefined; }>;
```

## `resourceListRequestSchema`

Runtime schema for Resource List Request.

- Kind: constant
- Import: `import { resourceListRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const resourceListRequestSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; resourceType: z.ZodEnum<["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]>; resourceKey: z.ZodString; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { checkedAt: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; tenantId?: string | undefined; }, { checkedAt: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; tenantId?: string | undefined; }>;
```

## `resourceReleaseRequestSchema`

Runtime schema for Resource Release Request.

- Kind: constant
- Import: `import { resourceReleaseRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const resourceReleaseRequestSchema: z.ZodObject<{ runLease: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>; claimIds: z.ZodArray<z.ZodString, "many">; releasedAt: z.ZodString; }, "strict", z.ZodTypeAny, { releasedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; claimIds: string[]; }, { releasedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; claimIds: string[]; }>;
```

## `resourceRenewRequestSchema`

Runtime schema for Resource Renew Request.

- Kind: constant
- Import: `import { resourceRenewRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const resourceRenewRequestSchema: z.ZodObject<{ runLease: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>; claimIds: z.ZodArray<z.ZodString, "many">; ttlMs: z.ZodNumber; renewedAt: z.ZodString; }, "strict", z.ZodTypeAny, { ttlMs: number; renewedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; claimIds: string[]; }, { ttlMs: number; renewedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; claimIds: string[]; }>;
```

## `runLeaseAcquireRequestSchema`

Runtime schema for Run Lease Acquire Request.

- Kind: constant
- Import: `import { runLeaseAcquireRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runLeaseAcquireRequestSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; requestedLeaseId: z.ZodString; ownerId: z.ZodString; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; idempotencyKey: string; ownerId: string; acquiredAt: string; requestedLeaseId: string; ttlMs: number; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; idempotencyKey: string; ownerId: string; acquiredAt: string; requestedLeaseId: string; ttlMs: number; partitionKey: string; tenantId?: string | undefined; }>;
```

## `runLeaseAssertionRequestSchema`

Runtime schema for Run Lease Assertion Request.

- Kind: constant
- Import: `import { runLeaseAssertionRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runLeaseAssertionRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; checkedAt: string; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; checkedAt: string; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>;
```

## `runLeaseAuthorizationSchema`

Runtime schema for Run Lease Authorization.

- Kind: constant
- Import: `import { runLeaseAuthorizationSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runLeaseAuthorizationSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>;
```

## `runLeaseGuardJsonSchema`

JSON Schema for Run Lease Guard.

- Kind: constant
- Import: `import { runLeaseGuardJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runLeaseGuardJsonSchema: JsonSchema;
```

## `runLeaseGuardSchema`

Runtime schema for Run Lease Guard.

- Kind: constant
- Import: `import { runLeaseGuardSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runLeaseGuardSchema: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>;
```

## `runLeaseHeartbeatRequestSchema`

Runtime schema for Run Lease Heartbeat Request.

- Kind: constant
- Import: `import { runLeaseHeartbeatRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runLeaseHeartbeatRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; ttlMs: z.ZodNumber; heartbeatAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; heartbeatAt: string; ttlMs: number; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; heartbeatAt: string; ttlMs: number; }>;
```

## `runLeasePreemptRequestSchema`

Runtime schema for Run Lease Preempt Request.

- Kind: constant
- Import: `import { runLeasePreemptRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runLeasePreemptRequestSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; requestedLeaseId: z.ZodString; ownerId: z.ZodString; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodString; } & { reason: z.ZodLiteral<"cancellation">; }, "strict", z.ZodTypeAny, { userId: string; runId: string; reason: "cancellation"; idempotencyKey: string; ownerId: string; acquiredAt: string; requestedLeaseId: string; ttlMs: number; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; reason: "cancellation"; idempotencyKey: string; ownerId: string; acquiredAt: string; requestedLeaseId: string; ttlMs: number; partitionKey: string; tenantId?: string | undefined; }>;
```

## `runLeaseReleaseRequestSchema`

Runtime schema for Run Lease Release Request.

- Kind: constant
- Import: `import { runLeaseReleaseRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runLeaseReleaseRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; releasedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; releasedAt: string; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; releasedAt: string; }>;
```

## `runLeaseScopeJsonSchema`

JSON Schema for Run Lease Scope.

- Kind: constant
- Import: `import { runLeaseScopeJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runLeaseScopeJsonSchema: JsonSchema;
```

## `runLeaseScopeSchema`

Runtime schema for Run Lease Scope.

- Kind: constant
- Import: `import { runLeaseScopeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runLeaseScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>;
```

## `runtimeCoordinationContractDefinitions`

Runtime Coordination Contract Definitions constant exported by the `contracts/runtime-coordination-schemas` module.

- Kind: constant
- Import: `import { runtimeCoordinationContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runtimeCoordinationContractDefinitions: readonly [SpecSchemaDefinition<FencedRunLease>, SpecSchemaDefinition<StateExecutionClaim>, SpecSchemaDefinition<RuntimeResourceClaim>];
```

## `runtimeCoordinationContractJsonSchemas`

Runtime Coordination Contract JSON Schemas constant exported by the `contracts/runtime-coordination-schemas` module.

- Kind: constant
- Import: `import { runtimeCoordinationContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runtimeCoordinationContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeResourceClaimDefinition`

Runtime Resource Claim Definition constant exported by the `contracts/runtime-coordination-schemas` module.

- Kind: constant
- Import: `import { runtimeResourceClaimDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runtimeResourceClaimDefinition: SpecSchemaDefinition<RuntimeResourceClaim>;
```

## `runtimeResourceClaimExample`

Valid example value for Runtime Resource Claim.

- Kind: constant
- Import: `import { runtimeResourceClaimExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runtimeResourceClaimExample: RuntimeResourceClaim;
```

## `runtimeResourceClaimJsonSchema`

JSON Schema for Runtime Resource Claim.

- Kind: constant
- Import: `import { runtimeResourceClaimJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runtimeResourceClaimJsonSchema: JsonSchema;
```

## `runtimeResourceClaimModeSchema`

Runtime schema for Runtime Resource Claim Mode.

- Kind: constant
- Import: `import { runtimeResourceClaimModeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runtimeResourceClaimModeSchema: z.ZodEnum<["shared", "exclusive"]>;
```

## `runtimeResourceClaimSchema`

Runtime schema for Runtime Resource Claim.

- Kind: constant
- Import: `import { runtimeResourceClaimSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runtimeResourceClaimSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; resourceType: z.ZodEnum<["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]>; resourceKey: z.ZodString; mode: z.ZodEnum<["shared", "exclusive"]>; runId: z.ZodString; stateId: z.ZodOptional<z.ZodString>; ownerId: z.ZodString; fencingToken: z.ZodNumber; runFencingToken: z.ZodNumber; acquiredAt: z.ZodString; expiresAt: z.ZodString; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>>>; }, "strict", z.ZodTypeAny, { id: string; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; acquiredAt: string; runFencingToken: number; tenantId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; stateId?: string | undefined; }, { id: string; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; acquiredAt: string; runFencingToken: number; tenantId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; stateId?: string | undefined; }>, { id: string; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; acquiredAt: string; runFencingToken: number; tenantId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; stateId?: string | undefined; }, { id: string; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; acquiredAt: string; runFencingToken: number; tenantId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; stateId?: string | undefined; }>;
```

## `runtimeResourceTypeSchema`

Runtime schema for Runtime Resource Type.

- Kind: constant
- Import: `import { runtimeResourceTypeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const runtimeResourceTypeSchema: z.ZodEnum<["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]>;
```

## `stateExecutionClaimAcquireRequestSchema`

Runtime schema for State Execution Claim Acquire Request.

- Kind: constant
- Import: `import { stateExecutionClaimAcquireRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const stateExecutionClaimAcquireRequestSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; requestedClaimId: z.ZodString; processRevision: z.ZodString; expectedRunRevision: z.ZodNumber; runLease: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; idempotencyKey: string; stateAttempt: number; stateId: string; expectedRunRevision: number; requestedClaimId: string; acquiredAt: string; ttlMs: number; processRevision: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; tenantId?: string | undefined; }, { userId: string; runId: string; idempotencyKey: string; stateAttempt: number; stateId: string; expectedRunRevision: number; requestedClaimId: string; acquiredAt: string; ttlMs: number; processRevision: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; tenantId?: string | undefined; }>;
```

## `stateExecutionClaimAssertionRequestSchema`

Runtime schema for State Execution Claim Assertion Request.

- Kind: constant
- Import: `import { stateExecutionClaimAssertionRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const stateExecutionClaimAssertionRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; claimId: string; }, { fencingToken: number; ownerId: string; claimId: string; }>; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; checkedAt: string; guard: { fencingToken: number; ownerId: string; claimId: string; }; }, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; checkedAt: string; guard: { fencingToken: number; ownerId: string; claimId: string; }; }>;
```

## `stateExecutionClaimCompleteRequestSchema`

Runtime schema for State Execution Claim Complete Request.

- Kind: constant
- Import: `import { stateExecutionClaimCompleteRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const stateExecutionClaimCompleteRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; claimId: string; }, { fencingToken: number; ownerId: string; claimId: string; }>; runLease: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>; completedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; claimId: string; }; completedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; }, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; claimId: string; }; completedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; }>;
```

## `stateExecutionClaimDefinition`

State Execution Claim Definition constant exported by the `contracts/runtime-coordination-schemas` module.

- Kind: constant
- Import: `import { stateExecutionClaimDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const stateExecutionClaimDefinition: SpecSchemaDefinition<StateExecutionClaim>;
```

## `stateExecutionClaimExample`

Valid example value for State Execution Claim.

- Kind: constant
- Import: `import { stateExecutionClaimExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const stateExecutionClaimExample: StateExecutionClaim;
```

## `stateExecutionClaimGuardSchema`

Runtime schema for State Execution Claim Guard.

- Kind: constant
- Import: `import { stateExecutionClaimGuardSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const stateExecutionClaimGuardSchema: z.ZodObject<{ claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; claimId: string; }, { fencingToken: number; ownerId: string; claimId: string; }>;
```

## `stateExecutionClaimJsonSchema`

JSON Schema for State Execution Claim.

- Kind: constant
- Import: `import { stateExecutionClaimJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const stateExecutionClaimJsonSchema: JsonSchema;
```

## `stateExecutionClaimReleaseRequestSchema`

Runtime schema for State Execution Claim Release Request.

- Kind: constant
- Import: `import { stateExecutionClaimReleaseRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const stateExecutionClaimReleaseRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; claimId: string; }, { fencingToken: number; ownerId: string; claimId: string; }>; runLease: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>; releasedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; claimId: string; }; releasedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; }, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; claimId: string; }; releasedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; }>;
```

## `stateExecutionClaimRenewRequestSchema`

Runtime schema for State Execution Claim Renew Request.

- Kind: constant
- Import: `import { stateExecutionClaimRenewRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const stateExecutionClaimRenewRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; claimId: string; }, { fencingToken: number; ownerId: string; claimId: string; }>; runLease: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>; ttlMs: z.ZodNumber; renewedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; claimId: string; }; ttlMs: number; renewedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; }, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; claimId: string; }; ttlMs: number; renewedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; }>;
```

## `stateExecutionClaimSchema`

Runtime schema for State Execution Claim.

- Kind: constant
- Import: `import { stateExecutionClaimSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const stateExecutionClaimSchema: z.ZodEffects<z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; claimId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; processRevision: z.ZodString; expectedRunRevision: z.ZodNumber; fencingToken: z.ZodNumber; ownerId: z.ZodString; status: z.ZodEnum<["claimed", "completed", "released", "expired"]>; acquiredAt: z.ZodString; expiresAt: z.ZodString; completedAt: z.ZodOptional<z.ZodString>; releasedAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { userId: string; runId: string; status: "expired" | "completed" | "claimed" | "released"; expiresAt: string; stateAttempt: number; stateId: string; fencingToken: number; ownerId: string; expectedRunRevision: number; acquiredAt: string; claimId: string; processRevision: string; tenantId?: string | undefined; completedAt?: string | undefined; releasedAt?: string | undefined; }, { userId: string; runId: string; status: "expired" | "completed" | "claimed" | "released"; expiresAt: string; stateAttempt: number; stateId: string; fencingToken: number; ownerId: string; expectedRunRevision: number; acquiredAt: string; claimId: string; processRevision: string; tenantId?: string | undefined; completedAt?: string | undefined; releasedAt?: string | undefined; }>, { userId: string; runId: string; status: "expired" | "completed" | "claimed" | "released"; expiresAt: string; stateAttempt: number; stateId: string; fencingToken: number; ownerId: string; expectedRunRevision: number; acquiredAt: string; claimId: string; processRevision: string; tenantId?: string | undefined; completedAt?: string | undefined; releasedAt?: string | undefined; }, { userId: string; runId: string; status: "expired" | "completed" | "claimed" | "released"; expiresAt: string; stateAttempt: number; stateId: string; fencingToken: number; ownerId: string; expectedRunRevision: number; acquiredAt: string; claimId: string; processRevision: string; tenantId?: string | undefined; completedAt?: string | undefined; releasedAt?: string | undefined; }>;
```

## `stateExecutionClaimScopeSchema`

Runtime schema for State Execution Claim Scope.

- Kind: constant
- Import: `import { stateExecutionClaimScopeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare const stateExecutionClaimScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }>;
```

## `validateFencedRunLease`

Validate Fenced Run Lease function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateFencedRunLease } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateFencedRunLease(input: unknown): FencedRunLease;
```

### Call signature

```text
validateFencedRunLease(input: unknown): FencedRunLease
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FencedRunLease`
- Description: The return contract is defined by the type shown above.

## `validateResourceAcquireRequest`

Validate Resource Acquire Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateResourceAcquireRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateResourceAcquireRequest(input: unknown): ResourceAcquireRequest;
```

### Call signature

```text
validateResourceAcquireRequest(input: unknown): ResourceAcquireRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ResourceAcquireRequest`
- Description: The return contract is defined by the type shown above.

## `validateResourceClaimAssertionRequest`

Validate Resource Claim Assertion Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateResourceClaimAssertionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateResourceClaimAssertionRequest(input: unknown): ResourceClaimAssertionRequest;
```

### Call signature

```text
validateResourceClaimAssertionRequest(input: unknown): ResourceClaimAssertionRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ResourceClaimAssertionRequest`
- Description: The return contract is defined by the type shown above.

## `validateResourceListRequest`

Validate Resource List Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateResourceListRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateResourceListRequest(input: unknown): ResourceListRequest;
```

### Call signature

```text
validateResourceListRequest(input: unknown): ResourceListRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ResourceListRequest`
- Description: The return contract is defined by the type shown above.

## `validateResourceReleaseRequest`

Validate Resource Release Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateResourceReleaseRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateResourceReleaseRequest(input: unknown): ResourceReleaseRequest;
```

### Call signature

```text
validateResourceReleaseRequest(input: unknown): ResourceReleaseRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ResourceReleaseRequest`
- Description: The return contract is defined by the type shown above.

## `validateResourceRenewRequest`

Validate Resource Renew Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateResourceRenewRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateResourceRenewRequest(input: unknown): ResourceRenewRequest;
```

### Call signature

```text
validateResourceRenewRequest(input: unknown): ResourceRenewRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ResourceRenewRequest`
- Description: The return contract is defined by the type shown above.

## `validateRunLeaseAcquireRequest`

Validate Run Lease Acquire Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRunLeaseAcquireRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateRunLeaseAcquireRequest(input: unknown): RunLeaseAcquireRequest;
```

### Call signature

```text
validateRunLeaseAcquireRequest(input: unknown): RunLeaseAcquireRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RunLeaseAcquireRequest`
- Description: The return contract is defined by the type shown above.

## `validateRunLeaseAssertionRequest`

Validate Run Lease Assertion Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRunLeaseAssertionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateRunLeaseAssertionRequest(input: unknown): RunLeaseAssertionRequest;
```

### Call signature

```text
validateRunLeaseAssertionRequest(input: unknown): RunLeaseAssertionRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RunLeaseAssertionRequest`
- Description: The return contract is defined by the type shown above.

## `validateRunLeaseHeartbeatRequest`

Validate Run Lease Heartbeat Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRunLeaseHeartbeatRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateRunLeaseHeartbeatRequest(input: unknown): RunLeaseHeartbeatRequest;
```

### Call signature

```text
validateRunLeaseHeartbeatRequest(input: unknown): RunLeaseHeartbeatRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RunLeaseHeartbeatRequest`
- Description: The return contract is defined by the type shown above.

## `validateRunLeasePreemptRequest`

Validate Run Lease Preempt Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRunLeasePreemptRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateRunLeasePreemptRequest(input: unknown): RunLeasePreemptRequest;
```

### Call signature

```text
validateRunLeasePreemptRequest(input: unknown): RunLeasePreemptRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RunLeasePreemptRequest`
- Description: The return contract is defined by the type shown above.

## `validateRunLeaseReleaseRequest`

Validate Run Lease Release Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRunLeaseReleaseRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateRunLeaseReleaseRequest(input: unknown): RunLeaseReleaseRequest;
```

### Call signature

```text
validateRunLeaseReleaseRequest(input: unknown): RunLeaseReleaseRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RunLeaseReleaseRequest`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeResourceClaim`

Validate Runtime Resource Claim function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeResourceClaim } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateRuntimeResourceClaim(input: unknown): RuntimeResourceClaim;
```

### Call signature

```text
validateRuntimeResourceClaim(input: unknown): RuntimeResourceClaim
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeResourceClaim`
- Description: The return contract is defined by the type shown above.

## `validateStateExecutionClaim`

Validate State Execution Claim function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateStateExecutionClaim } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateStateExecutionClaim(input: unknown): StateExecutionClaim;
```

### Call signature

```text
validateStateExecutionClaim(input: unknown): StateExecutionClaim
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StateExecutionClaim`
- Description: The return contract is defined by the type shown above.

## `validateStateExecutionClaimAcquireRequest`

Validate State Execution Claim Acquire Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateStateExecutionClaimAcquireRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateStateExecutionClaimAcquireRequest(input: unknown): StateExecutionClaimAcquireRequest;
```

### Call signature

```text
validateStateExecutionClaimAcquireRequest(input: unknown): StateExecutionClaimAcquireRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StateExecutionClaimAcquireRequest`
- Description: The return contract is defined by the type shown above.

## `validateStateExecutionClaimAssertionRequest`

Validate State Execution Claim Assertion Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateStateExecutionClaimAssertionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateStateExecutionClaimAssertionRequest(input: unknown): StateExecutionClaimAssertionRequest;
```

### Call signature

```text
validateStateExecutionClaimAssertionRequest(input: unknown): StateExecutionClaimAssertionRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StateExecutionClaimAssertionRequest`
- Description: The return contract is defined by the type shown above.

## `validateStateExecutionClaimCompleteRequest`

Validate State Execution Claim Complete Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateStateExecutionClaimCompleteRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateStateExecutionClaimCompleteRequest(input: unknown): StateExecutionClaimCompleteRequest;
```

### Call signature

```text
validateStateExecutionClaimCompleteRequest(input: unknown): StateExecutionClaimCompleteRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StateExecutionClaimCompleteRequest`
- Description: The return contract is defined by the type shown above.

## `validateStateExecutionClaimReleaseRequest`

Validate State Execution Claim Release Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateStateExecutionClaimReleaseRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateStateExecutionClaimReleaseRequest(input: unknown): StateExecutionClaimReleaseRequest;
```

### Call signature

```text
validateStateExecutionClaimReleaseRequest(input: unknown): StateExecutionClaimReleaseRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StateExecutionClaimReleaseRequest`
- Description: The return contract is defined by the type shown above.

## `validateStateExecutionClaimRenewRequest`

Validate State Execution Claim Renew Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateStateExecutionClaimRenewRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### Declaration

```text
export declare function validateStateExecutionClaimRenewRequest(input: unknown): StateExecutionClaimRenewRequest;
```

### Call signature

```text
validateStateExecutionClaimRenewRequest(input: unknown): StateExecutionClaimRenewRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StateExecutionClaimRenewRequest`
- Description: The return contract is defined by the type shown above.
