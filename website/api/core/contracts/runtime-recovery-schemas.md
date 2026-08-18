# `@codesoul-co/hypha-core` / `contracts/runtime-recovery-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-recovery-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)
- Exports: **36**

## Using this module

Use the Runtime recovery schemas module for declaring and runtime-validating contracts. It exports 29 constants, 7 functions.

### Import from the package entrypoint

```ts
import {
  runtimeActivityCompensationResultDefinition,
  runtimeActivityCompensationResultExample,
  runtimeActivityCompensationResultSchema,
  runtimeActivityReconciliationResultDefinition,
  runtimeActivityReconciliationResultExample,
  runtimeActivityReconciliationResultJsonSchema,
  runtimeActivityReconciliationResultSchema,
  runtimeRecoveryCandidateDefinition,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 7 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 29 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { runtimeActivityCompensationResultSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeActivityCompensationResultSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeActivityCompensationResultDefinition` | constant | <code>const runtimeActivityCompensationResultDefinition: SpecSchemaDefinition&lt;RuntimeActivityCompensationResult&gt;</code> | Runtime Activity Compensation Result Definition constant exported by the `contracts/runtime-recovery-schemas` module. |
| `runtimeActivityCompensationResultExample` | constant | <code>const runtimeActivityCompensationResultExample: RuntimeActivityCompensationResult</code> | Valid example value for Runtime Activity Compensation Result. |
| `runtimeActivityCompensationResultSchema` | constant | <code>const runtimeActivityCompensationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; status: z.ZodEnum&lt;["completed", "failed", "requires_review"]&gt;; providerRevision: z.ZodOptional&lt;z.ZodString&gt;; receiptId: z.ZodOptional&lt;z.ZodString&gt;; errorCode: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { status: "failed" &#124; "completed" &#124; "requires_review"; activityId: string; providerRevision?: string &#124; un...</code> | Runtime schema for Runtime Activity Compensation Result. |
| `runtimeActivityReconciliationResultDefinition` | constant | <code>const runtimeActivityReconciliationResultDefinition: SpecSchemaDefinition&lt;RuntimeActivityReconciliationResult&gt;</code> | Runtime Activity Reconciliation Result Definition constant exported by the `contracts/runtime-recovery-schemas` module. |
| `runtimeActivityReconciliationResultExample` | constant | <code>const runtimeActivityReconciliationResultExample: RuntimeActivityReconciliationResult</code> | Valid example value for Runtime Activity Reconciliation Result. |
| `runtimeActivityReconciliationResultJsonSchema` | constant | <code>const runtimeActivityReconciliationResultJsonSchema: JsonSchema</code> | JSON Schema for Runtime Activity Reconciliation Result. |
| `runtimeActivityReconciliationResultSchema` | constant | <code>const runtimeActivityReconciliationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; status: z.ZodEnum&lt;["completed", "failed", "waiting", "cancelled", "not_started", "unknown"]&gt;; observation: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; status: z.ZodEnum&lt;["completed", "failed", "waiting", "cancelled"]&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; output: z.ZodOptional&lt;z.ZodType&lt;...</code> | Runtime schema for Runtime Activity Reconciliation Result. |
| `runtimeRecoveryCandidateDefinition` | constant | <code>const runtimeRecoveryCandidateDefinition: SpecSchemaDefinition&lt;RuntimeRecoveryCandidate&gt;</code> | Runtime Recovery Candidate Definition constant exported by the `contracts/runtime-recovery-schemas` module. |
| `runtimeRecoveryCandidateExample` | constant | <code>const runtimeRecoveryCandidateExample: RuntimeRecoveryCandidate</code> | Valid example value for Runtime Recovery Candidate. |
| `runtimeRecoveryCandidateJsonSchema` | constant | <code>const runtimeRecoveryCandidateJsonSchema: JsonSchema</code> | JSON Schema for Runtime Recovery Candidate. |
| `runtimeRecoveryCandidateSchema` | constant | <code>const runtimeRecoveryCandidateSchema: z.ZodEffects&lt;z.ZodObject&lt;{ candidateId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { runId: string; userId: string; tenantId?: string &#124; undefined; }, { runId: string; userId: string; tenantId?: string &#124; undefined; }&gt;; reason: z.ZodEnum&lt;["LEASE_EXPIRED", "STATE_CLAIM_EXPIRED", "PROJ...</code> | Runtime schema for Runtime Recovery Candidate. |
| `runtimeRecoveryCommandDefinition` | constant | <code>const runtimeRecoveryCommandDefinition: SpecSchemaDefinition&lt;RuntimeRecoveryCommand&gt;</code> | Runtime Recovery Command Definition constant exported by the `contracts/runtime-recovery-schemas` module. |
| `runtimeRecoveryCommandExample` | constant | <code>const runtimeRecoveryCommandExample: RuntimeRecoveryCommand</code> | Valid example value for Runtime Recovery Command. |
| `runtimeRecoveryCommandJsonSchema` | constant | <code>const runtimeRecoveryCommandJsonSchema: JsonSchema</code> | JSON Schema for Runtime Recovery Command. |
| `runtimeRecoveryCommandSchema` | constant | <code>const runtimeRecoveryCommandSchema: z.ZodObject&lt;{ candidate: z.ZodEffects&lt;z.ZodObject&lt;{ candidateId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { runId: string; userId: string; tenantId?: string &#124; undefined; }, { runId: string; userId: string; tenantId?: string &#124; undefined; }&gt;; reason: z.ZodEnum&lt;["LEASE_EXPIRED", "STAT...</code> | Runtime schema for Runtime Recovery Command. |
| `runtimeRecoveryContractDefinitions` | constant | <code>const runtimeRecoveryContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeRecoveryCandidate&gt;, SpecSchemaDefinition&lt;RuntimeRecoveryScanRequest&gt;, SpecSchemaDefinition&lt;RuntimeRecoveryScanResult&gt;, SpecSchemaDefinition&lt;RuntimeRecoveryCommand&gt;, SpecSchemaDefinition&lt;RuntimeRecoveryResult&gt;, SpecSchemaDefinition&lt;RuntimeActivityReconciliationResult&gt;, SpecSchemaDefinition&lt;RuntimeActivityCompensationResult&gt;]</code> | Runtime Recovery Contract Definitions constant exported by the `contracts/runtime-recovery-schemas` module. |
| `runtimeRecoveryContractJsonSchemas` | constant | <code>const runtimeRecoveryContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Runtime Recovery Contract JSON Schemas constant exported by the `contracts/runtime-recovery-schemas` module. |
| `runtimeRecoveryResultDefinition` | constant | <code>const runtimeRecoveryResultDefinition: SpecSchemaDefinition&lt;RuntimeRecoveryResult&gt;</code> | Runtime Recovery Result Definition constant exported by the `contracts/runtime-recovery-schemas` module. |
| `runtimeRecoveryResultExample` | constant | <code>const runtimeRecoveryResultExample: RuntimeRecoveryResult</code> | Valid example value for Runtime Recovery Result. |
| `runtimeRecoveryResultJsonSchema` | constant | <code>const runtimeRecoveryResultJsonSchema: JsonSchema</code> | JSON Schema for Runtime Recovery Result. |
| `runtimeRecoveryResultSchema` | constant | <code>const runtimeRecoveryResultSchema: z.ZodObject&lt;{ candidateId: z.ZodString; disposition: z.ZodEnum&lt;["recovered", "reused", "requeued", "compensated", "requires_review", "lease_unavailable", "stale"]&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; projection: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodObject&lt;{ runId: z.ZodString; runStatus: z.ZodEnum&lt;[import("./runtime-projection").RuntimeOrchestrationRunStatus, ...import("./runt...</code> | Runtime schema for Runtime Recovery Result. |
| `runtimeRecoveryScanRequestDefinition` | constant | <code>const runtimeRecoveryScanRequestDefinition: SpecSchemaDefinition&lt;RuntimeRecoveryScanRequest&gt;</code> | Runtime Recovery Scan Request Definition constant exported by the `contracts/runtime-recovery-schemas` module. |
| `runtimeRecoveryScanRequestExample` | constant | <code>const runtimeRecoveryScanRequestExample: RuntimeRecoveryScanRequest</code> | Valid example value for Runtime Recovery Scan Request. |
| `runtimeRecoveryScanRequestJsonSchema` | constant | <code>const runtimeRecoveryScanRequestJsonSchema: JsonSchema</code> | JSON Schema for Runtime Recovery Scan Request. |
| `runtimeRecoveryScanRequestSchema` | constant | <code>const runtimeRecoveryScanRequestSchema: z.ZodObject&lt;{ checkedAt: z.ZodString; limit: z.ZodNumber; cursor: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { limit: number; checkedAt: string; cursor?: string &#124; undefined; }, { limit: number; checkedAt: string; cursor?: string &#124; undefined; }&gt;</code> | Runtime schema for Runtime Recovery Scan Request. |
| `runtimeRecoveryScanResultDefinition` | constant | <code>const runtimeRecoveryScanResultDefinition: SpecSchemaDefinition&lt;RuntimeRecoveryScanResult&gt;</code> | Runtime Recovery Scan Result Definition constant exported by the `contracts/runtime-recovery-schemas` module. |
| `runtimeRecoveryScanResultExample` | constant | <code>const runtimeRecoveryScanResultExample: RuntimeRecoveryScanResult</code> | Valid example value for Runtime Recovery Scan Result. |
| `runtimeRecoveryScanResultJsonSchema` | constant | <code>const runtimeRecoveryScanResultJsonSchema: JsonSchema</code> | JSON Schema for Runtime Recovery Scan Result. |
| `runtimeRecoveryScanResultSchema` | constant | <code>const runtimeRecoveryScanResultSchema: z.ZodObject&lt;{ candidates: z.ZodArray&lt;z.ZodEffects&lt;z.ZodObject&lt;{ candidateId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { runId: string; userId: string; tenantId?: string &#124; undefined; }, { runId: string; userId: string; tenantId?: string &#124; undefined; }&gt;; reason: z.ZodEnum&lt;["LEASE_...</code> | Runtime schema for Runtime Recovery Scan Result. |
| `validateRuntimeActivityCompensationResult` | function | <code>validateRuntimeActivityCompensationResult(input: unknown): RuntimeActivityCompensationResult</code> | Validate Runtime Activity Compensation Result function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeActivityReconciliationResult` | function | <code>validateRuntimeActivityReconciliationResult(input: unknown): RuntimeActivityReconciliationResult</code> | Validate Runtime Activity Reconciliation Result function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeRecoveryCandidate` | function | <code>validateRuntimeRecoveryCandidate(input: unknown): RuntimeRecoveryCandidate</code> | Validate Runtime Recovery Candidate function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeRecoveryCommand` | function | <code>validateRuntimeRecoveryCommand(input: unknown): RuntimeRecoveryCommand</code> | Validate Runtime Recovery Command function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeRecoveryResult` | function | <code>validateRuntimeRecoveryResult(input: unknown): RuntimeRecoveryResult</code> | Validate Runtime Recovery Result function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeRecoveryScanRequest` | function | <code>validateRuntimeRecoveryScanRequest(input: unknown): RuntimeRecoveryScanRequest</code> | Validate Runtime Recovery Scan Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeRecoveryScanResult` | function | <code>validateRuntimeRecoveryScanResult(input: unknown): RuntimeRecoveryScanResult</code> | Validate Runtime Recovery Scan Result function with 1 public call signature; parameters and return types are listed below. |

## `runtimeActivityCompensationResultDefinition`

Runtime Activity Compensation Result Definition constant exported by the `contracts/runtime-recovery-schemas` module.

- Kind: constant
- Import: `import { runtimeActivityCompensationResultDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeActivityCompensationResultDefinition: SpecSchemaDefinition<RuntimeActivityCompensationResult>;
```

## `runtimeActivityCompensationResultExample`

Valid example value for Runtime Activity Compensation Result.

- Kind: constant
- Import: `import { runtimeActivityCompensationResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeActivityCompensationResultExample: RuntimeActivityCompensationResult;
```

## `runtimeActivityCompensationResultSchema`

Runtime schema for Runtime Activity Compensation Result.

- Kind: constant
- Import: `import { runtimeActivityCompensationResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeActivityCompensationResultSchema: z.ZodEffects<z.ZodObject<{ activityId: z.ZodString; status: z.ZodEnum<["completed", "failed", "requires_review"]>; providerRevision: z.ZodOptional<z.ZodString>; receiptId: z.ZodOptional<z.ZodString>; errorCode: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { status: "failed" | "completed" | "requires_review"; activityId: string; providerRevision?: string | undefined; receiptId?: string | undefined; errorCode?: string | undefined; }, { status: "failed" | "completed" | "requires_review"; activityId: string; providerRevision?: string | undefined; receiptId?: string | undefined; errorCode?: string | undefined; }>, { status: "failed" | "completed" | "requires_review"; activityId: string; providerRevision?: string | undefined; receiptId?: string | undefined; errorCode?: string | undefined; }, { status: "failed" | "completed" | "requires_review"; activityId: string; providerRevision?: string | undefined; receiptId?: string | undefined; errorCode?: string | undefined; }>;
```

## `runtimeActivityReconciliationResultDefinition`

Runtime Activity Reconciliation Result Definition constant exported by the `contracts/runtime-recovery-schemas` module.

- Kind: constant
- Import: `import { runtimeActivityReconciliationResultDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeActivityReconciliationResultDefinition: SpecSchemaDefinition<RuntimeActivityReconciliationResult>;
```

## `runtimeActivityReconciliationResultExample`

Valid example value for Runtime Activity Reconciliation Result.

- Kind: constant
- Import: `import { runtimeActivityReconciliationResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeActivityReconciliationResultExample: RuntimeActivityReconciliationResult;
```

## `runtimeActivityReconciliationResultJsonSchema`

JSON Schema for Runtime Activity Reconciliation Result.

- Kind: constant
- Import: `import { runtimeActivityReconciliationResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeActivityReconciliationResultJsonSchema: JsonSchema;
```

## `runtimeActivityReconciliationResultSchema`

Runtime schema for Runtime Activity Reconciliation Result.

- Kind: constant
- Import: `import { runtimeActivityReconciliationResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeActivityReconciliationResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeActivityReconciliationResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeRecoveryCandidateDefinition`

Runtime Recovery Candidate Definition constant exported by the `contracts/runtime-recovery-schemas` module.

- Kind: constant
- Import: `import { runtimeRecoveryCandidateDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryCandidateDefinition: SpecSchemaDefinition<RuntimeRecoveryCandidate>;
```

## `runtimeRecoveryCandidateExample`

Valid example value for Runtime Recovery Candidate.

- Kind: constant
- Import: `import { runtimeRecoveryCandidateExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryCandidateExample: RuntimeRecoveryCandidate;
```

## `runtimeRecoveryCandidateJsonSchema`

JSON Schema for Runtime Recovery Candidate.

- Kind: constant
- Import: `import { runtimeRecoveryCandidateJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryCandidateJsonSchema: JsonSchema;
```

## `runtimeRecoveryCandidateSchema`

Runtime schema for Runtime Recovery Candidate.

- Kind: constant
- Import: `import { runtimeRecoveryCandidateSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeRecoveryCandidateSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRecoveryCandidateSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeRecoveryCommandDefinition`

Runtime Recovery Command Definition constant exported by the `contracts/runtime-recovery-schemas` module.

- Kind: constant
- Import: `import { runtimeRecoveryCommandDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryCommandDefinition: SpecSchemaDefinition<RuntimeRecoveryCommand>;
```

## `runtimeRecoveryCommandExample`

Valid example value for Runtime Recovery Command.

- Kind: constant
- Import: `import { runtimeRecoveryCommandExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryCommandExample: RuntimeRecoveryCommand;
```

## `runtimeRecoveryCommandJsonSchema`

JSON Schema for Runtime Recovery Command.

- Kind: constant
- Import: `import { runtimeRecoveryCommandJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryCommandJsonSchema: JsonSchema;
```

## `runtimeRecoveryCommandSchema`

Runtime schema for Runtime Recovery Command.

- Kind: constant
- Import: `import { runtimeRecoveryCommandSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeRecoveryCommandSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRecoveryCommandSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeRecoveryContractDefinitions`

Runtime Recovery Contract Definitions constant exported by the `contracts/runtime-recovery-schemas` module.

- Kind: constant
- Import: `import { runtimeRecoveryContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryContractDefinitions: readonly [SpecSchemaDefinition<RuntimeRecoveryCandidate>, SpecSchemaDefinition<RuntimeRecoveryScanRequest>, SpecSchemaDefinition<RuntimeRecoveryScanResult>, SpecSchemaDefinition<RuntimeRecoveryCommand>, SpecSchemaDefinition<RuntimeRecoveryResult>, SpecSchemaDefinition<RuntimeActivityReconciliationResult>, SpecSchemaDefinition<RuntimeActivityCompensationResult>];
```

## `runtimeRecoveryContractJsonSchemas`

Runtime Recovery Contract JSON Schemas constant exported by the `contracts/runtime-recovery-schemas` module.

- Kind: constant
- Import: `import { runtimeRecoveryContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeRecoveryResultDefinition`

Runtime Recovery Result Definition constant exported by the `contracts/runtime-recovery-schemas` module.

- Kind: constant
- Import: `import { runtimeRecoveryResultDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryResultDefinition: SpecSchemaDefinition<RuntimeRecoveryResult>;
```

## `runtimeRecoveryResultExample`

Valid example value for Runtime Recovery Result.

- Kind: constant
- Import: `import { runtimeRecoveryResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryResultExample: RuntimeRecoveryResult;
```

## `runtimeRecoveryResultJsonSchema`

JSON Schema for Runtime Recovery Result.

- Kind: constant
- Import: `import { runtimeRecoveryResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryResultJsonSchema: JsonSchema;
```

## `runtimeRecoveryResultSchema`

Runtime schema for Runtime Recovery Result.

- Kind: constant
- Import: `import { runtimeRecoveryResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeRecoveryResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRecoveryResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeRecoveryScanRequestDefinition`

Runtime Recovery Scan Request Definition constant exported by the `contracts/runtime-recovery-schemas` module.

- Kind: constant
- Import: `import { runtimeRecoveryScanRequestDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryScanRequestDefinition: SpecSchemaDefinition<RuntimeRecoveryScanRequest>;
```

## `runtimeRecoveryScanRequestExample`

Valid example value for Runtime Recovery Scan Request.

- Kind: constant
- Import: `import { runtimeRecoveryScanRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryScanRequestExample: RuntimeRecoveryScanRequest;
```

## `runtimeRecoveryScanRequestJsonSchema`

JSON Schema for Runtime Recovery Scan Request.

- Kind: constant
- Import: `import { runtimeRecoveryScanRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryScanRequestJsonSchema: JsonSchema;
```

## `runtimeRecoveryScanRequestSchema`

Runtime schema for Runtime Recovery Scan Request.

- Kind: constant
- Import: `import { runtimeRecoveryScanRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryScanRequestSchema: z.ZodObject<{ checkedAt: z.ZodString; limit: z.ZodNumber; cursor: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { limit: number; checkedAt: string; cursor?: string | undefined; }, { limit: number; checkedAt: string; cursor?: string | undefined; }>;
```

## `runtimeRecoveryScanResultDefinition`

Runtime Recovery Scan Result Definition constant exported by the `contracts/runtime-recovery-schemas` module.

- Kind: constant
- Import: `import { runtimeRecoveryScanResultDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryScanResultDefinition: SpecSchemaDefinition<RuntimeRecoveryScanResult>;
```

## `runtimeRecoveryScanResultExample`

Valid example value for Runtime Recovery Scan Result.

- Kind: constant
- Import: `import { runtimeRecoveryScanResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryScanResultExample: RuntimeRecoveryScanResult;
```

## `runtimeRecoveryScanResultJsonSchema`

JSON Schema for Runtime Recovery Scan Result.

- Kind: constant
- Import: `import { runtimeRecoveryScanResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare const runtimeRecoveryScanResultJsonSchema: JsonSchema;
```

## `runtimeRecoveryScanResultSchema`

Runtime schema for Runtime Recovery Scan Result.

- Kind: constant
- Import: `import { runtimeRecoveryScanResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeRecoveryScanResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRecoveryScanResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `validateRuntimeActivityCompensationResult`

Validate Runtime Activity Compensation Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeActivityCompensationResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare function validateRuntimeActivityCompensationResult(input: unknown): RuntimeActivityCompensationResult;
```

### Call signature

```text
validateRuntimeActivityCompensationResult(input: unknown): RuntimeActivityCompensationResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeActivityCompensationResult`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeActivityReconciliationResult`

Validate Runtime Activity Reconciliation Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeActivityReconciliationResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare function validateRuntimeActivityReconciliationResult(input: unknown): RuntimeActivityReconciliationResult;
```

### Call signature

```text
validateRuntimeActivityReconciliationResult(input: unknown): RuntimeActivityReconciliationResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeActivityReconciliationResult`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeRecoveryCandidate`

Validate Runtime Recovery Candidate function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeRecoveryCandidate } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare function validateRuntimeRecoveryCandidate(input: unknown): RuntimeRecoveryCandidate;
```

### Call signature

```text
validateRuntimeRecoveryCandidate(input: unknown): RuntimeRecoveryCandidate
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeRecoveryCandidate`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeRecoveryCommand`

Validate Runtime Recovery Command function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeRecoveryCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare function validateRuntimeRecoveryCommand(input: unknown): RuntimeRecoveryCommand;
```

### Call signature

```text
validateRuntimeRecoveryCommand(input: unknown): RuntimeRecoveryCommand
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeRecoveryCommand`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeRecoveryResult`

Validate Runtime Recovery Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeRecoveryResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare function validateRuntimeRecoveryResult(input: unknown): RuntimeRecoveryResult;
```

### Call signature

```text
validateRuntimeRecoveryResult(input: unknown): RuntimeRecoveryResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeRecoveryResult`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeRecoveryScanRequest`

Validate Runtime Recovery Scan Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeRecoveryScanRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare function validateRuntimeRecoveryScanRequest(input: unknown): RuntimeRecoveryScanRequest;
```

### Call signature

```text
validateRuntimeRecoveryScanRequest(input: unknown): RuntimeRecoveryScanRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeRecoveryScanRequest`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeRecoveryScanResult`

Validate Runtime Recovery Scan Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeRecoveryScanResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### Declaration

```text
export declare function validateRuntimeRecoveryScanResult(input: unknown): RuntimeRecoveryScanResult;
```

### Call signature

```text
validateRuntimeRecoveryScanResult(input: unknown): RuntimeRecoveryScanResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeRecoveryScanResult`
- Description: The return contract is defined by the type shown above.
