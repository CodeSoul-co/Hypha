# `@codesoul-co/hypha-core` / `contracts/runtime-timer-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-timer-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)
- Exports: **12**

## Using this module

Use the Runtime timer schemas module for declaring and runtime-validating contracts. It exports 10 constants, 2 functions.

### Import from the package entrypoint

```ts
import {
  runtimeTimerContractDefinitions,
  runtimeTimerContractJsonSchemas,
  runtimeTimerSweepRequestDefinition,
  runtimeTimerSweepRequestExample,
  runtimeTimerSweepRequestJsonSchema,
  runtimeTimerSweepRequestSchema,
  runtimeTimerSweepResultDefinition,
  runtimeTimerSweepResultExample,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 10 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { runtimeTimerSweepRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeTimerSweepRequestSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeTimerContractDefinitions` | constant | <code>const runtimeTimerContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeTimerSweepRequest&gt;, SpecSchemaDefinition&lt;RuntimeTimerSweepResult&gt;]</code> | Runtime Timer Contract Definitions constant exported by the `contracts/runtime-timer-schemas` module. |
| `runtimeTimerContractJsonSchemas` | constant | <code>const runtimeTimerContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Runtime Timer Contract JSON Schemas constant exported by the `contracts/runtime-timer-schemas` module. |
| `runtimeTimerSweepRequestDefinition` | constant | <code>const runtimeTimerSweepRequestDefinition: SpecSchemaDefinition&lt;RuntimeTimerSweepRequest&gt;</code> | Runtime Timer Sweep Request Definition constant exported by the `contracts/runtime-timer-schemas` module. |
| `runtimeTimerSweepRequestExample` | constant | <code>const runtimeTimerSweepRequestExample: RuntimeTimerSweepRequest</code> | Valid example value for Runtime Timer Sweep Request. |
| `runtimeTimerSweepRequestJsonSchema` | constant | <code>const runtimeTimerSweepRequestJsonSchema: JsonSchema</code> | JSON Schema for Runtime Timer Sweep Request. |
| `runtimeTimerSweepRequestSchema` | constant | <code>const runtimeTimerSweepRequestSchema: z.ZodObject&lt;{ ownerId: z.ZodString; leaseTtlMs: z.ZodNumber; limit: z.ZodNumber; cursor: z.ZodOptional&lt;z.ZodString&gt;; firedAt: z.ZodString; }, "strict", z.ZodTypeAny, { limit: number; ownerId: string; leaseTtlMs: number; firedAt: string; cursor?: string &#124; undefined; }, { limit: number; ownerId: string; leaseTtlMs: number; firedAt: string; cursor?: string &#124; undefined; }&gt;</code> | Runtime schema for Runtime Timer Sweep Request. |
| `runtimeTimerSweepResultDefinition` | constant | <code>const runtimeTimerSweepResultDefinition: SpecSchemaDefinition&lt;RuntimeTimerSweepResult&gt;</code> | Runtime Timer Sweep Result Definition constant exported by the `contracts/runtime-timer-schemas` module. |
| `runtimeTimerSweepResultExample` | constant | <code>const runtimeTimerSweepResultExample: RuntimeTimerSweepResult</code> | Valid example value for Runtime Timer Sweep Result. |
| `runtimeTimerSweepResultJsonSchema` | constant | <code>const runtimeTimerSweepResultJsonSchema: JsonSchema</code> | JSON Schema for Runtime Timer Sweep Result. |
| `runtimeTimerSweepResultSchema` | constant | <code>const runtimeTimerSweepResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ scanned: z.ZodNumber; fired: z.ZodNumber; notDue: z.ZodNumber; leaseUnavailable: z.ZodNumber; alreadyResolved: z.ZodNumber; results: z.ZodArray&lt;z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string &#124; undefined; }, {...</code> | Runtime schema for Runtime Timer Sweep Result. |
| `validateRuntimeTimerSweepRequest` | function | <code>validateRuntimeTimerSweepRequest(input: unknown): RuntimeTimerSweepRequest</code> | Validate Runtime Timer Sweep Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeTimerSweepResult` | function | <code>validateRuntimeTimerSweepResult(input: unknown): RuntimeTimerSweepResult</code> | Validate Runtime Timer Sweep Result function with 1 public call signature; parameters and return types are listed below. |

## `runtimeTimerContractDefinitions`

Runtime Timer Contract Definitions constant exported by the `contracts/runtime-timer-schemas` module.

- Kind: constant
- Import: `import { runtimeTimerContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### Declaration

```text
export declare const runtimeTimerContractDefinitions: readonly [SpecSchemaDefinition<RuntimeTimerSweepRequest>, SpecSchemaDefinition<RuntimeTimerSweepResult>];
```

## `runtimeTimerContractJsonSchemas`

Runtime Timer Contract JSON Schemas constant exported by the `contracts/runtime-timer-schemas` module.

- Kind: constant
- Import: `import { runtimeTimerContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### Declaration

```text
export declare const runtimeTimerContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeTimerSweepRequestDefinition`

Runtime Timer Sweep Request Definition constant exported by the `contracts/runtime-timer-schemas` module.

- Kind: constant
- Import: `import { runtimeTimerSweepRequestDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### Declaration

```text
export declare const runtimeTimerSweepRequestDefinition: SpecSchemaDefinition<RuntimeTimerSweepRequest>;
```

## `runtimeTimerSweepRequestExample`

Valid example value for Runtime Timer Sweep Request.

- Kind: constant
- Import: `import { runtimeTimerSweepRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### Declaration

```text
export declare const runtimeTimerSweepRequestExample: RuntimeTimerSweepRequest;
```

## `runtimeTimerSweepRequestJsonSchema`

JSON Schema for Runtime Timer Sweep Request.

- Kind: constant
- Import: `import { runtimeTimerSweepRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### Declaration

```text
export declare const runtimeTimerSweepRequestJsonSchema: JsonSchema;
```

## `runtimeTimerSweepRequestSchema`

Runtime schema for Runtime Timer Sweep Request.

- Kind: constant
- Import: `import { runtimeTimerSweepRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### Declaration

```text
export declare const runtimeTimerSweepRequestSchema: z.ZodObject<{ ownerId: z.ZodString; leaseTtlMs: z.ZodNumber; limit: z.ZodNumber; cursor: z.ZodOptional<z.ZodString>; firedAt: z.ZodString; }, "strict", z.ZodTypeAny, { limit: number; ownerId: string; leaseTtlMs: number; firedAt: string; cursor?: string | undefined; }, { limit: number; ownerId: string; leaseTtlMs: number; firedAt: string; cursor?: string | undefined; }>;
```

## `runtimeTimerSweepResultDefinition`

Runtime Timer Sweep Result Definition constant exported by the `contracts/runtime-timer-schemas` module.

- Kind: constant
- Import: `import { runtimeTimerSweepResultDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### Declaration

```text
export declare const runtimeTimerSweepResultDefinition: SpecSchemaDefinition<RuntimeTimerSweepResult>;
```

## `runtimeTimerSweepResultExample`

Valid example value for Runtime Timer Sweep Result.

- Kind: constant
- Import: `import { runtimeTimerSweepResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### Declaration

```text
export declare const runtimeTimerSweepResultExample: RuntimeTimerSweepResult;
```

## `runtimeTimerSweepResultJsonSchema`

JSON Schema for Runtime Timer Sweep Result.

- Kind: constant
- Import: `import { runtimeTimerSweepResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### Declaration

```text
export declare const runtimeTimerSweepResultJsonSchema: JsonSchema;
```

## `runtimeTimerSweepResultSchema`

Runtime schema for Runtime Timer Sweep Result.

- Kind: constant
- Import: `import { runtimeTimerSweepResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### Declaration

```text
export declare const runtimeTimerSweepResultSchema: z.ZodEffects<z.ZodObject<{ scanned: z.ZodNumber; fired: z.ZodNumber; notDue: z.ZodNumber; leaseUnavailable: z.ZodNumber; alreadyResolved: z.ZodNumber; results: z.ZodArray<z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string | undefined; }, { userId: string; runId: string; tenantId?: string | undefined; }>; disposition: z.ZodEnum<["fired", "not_due", "lease_unavailable", "already_resolved"]>; eventIds: z.ZodArray<z.ZodString, "many">; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; tenantId?: string | undefined; }; disposition: "not_due" | "lease_unavailable" | "fired" | "already_resolved"; eventIds: string[]; }, { scope: { userId: string; runId: string; tenantId?: string | undefined; }; disposition: "not_due" | "lease_unavailable" | "fired" | "already_resolved"; eventIds: string[]; }>, "many">; nextCursor: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { fired: number; scanned: number; notDue: number; leaseUnavailable: number; alreadyResolved: number; results: { scope: { userId: string; runId: string; tenantId?: string | undefined; }; disposition: "not_due" | "lease_unavailable" | "fired" | "already_resolved"; eventIds: string[]; }[]; nextCursor?: string | undefined; }, { fired: number; scanned: number; notDue: number; leaseUnavailable: number; alreadyResolved: number; results: { scope: { userId: string; runId: string; tenantId?: string | undefined; }; disposition: "not_due" | "lease_unavailable" | "fired" | "already_resolved"; eventIds: string[]; }[]; nextCursor?: string | undefined; }>, { fired: number; scanned: number; notDue: number; leaseUnavailable: number; alreadyResolved: number; results: { scope: { userId: string; runId: string; tenantId?: string | undefined; }; disposition: "not_due" | "lease_unavailable" | "fired" | "already_resolved"; eventIds: string[]; }[]; nextCursor?: string | undefined; }, { fired: number; scanned: number; notDue: number; leaseUnavailable: number; alreadyResolved: number; results: { scope: { userId: string; runId: string; tenantId?: string | undefined; }; disposition: "not_due" | "lease_unavailable" | "fired" | "already_resolved"; eventIds: string[]; }[]; nextCursor?: string | undefined; }>;
```

## `validateRuntimeTimerSweepRequest`

Validate Runtime Timer Sweep Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeTimerSweepRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### Declaration

```text
export declare function validateRuntimeTimerSweepRequest(input: unknown): RuntimeTimerSweepRequest;
```

### Call signature

```text
validateRuntimeTimerSweepRequest(input: unknown): RuntimeTimerSweepRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeTimerSweepRequest`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeTimerSweepResult`

Validate Runtime Timer Sweep Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeTimerSweepResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### Declaration

```text
export declare function validateRuntimeTimerSweepResult(input: unknown): RuntimeTimerSweepResult;
```

### Call signature

```text
validateRuntimeTimerSweepResult(input: unknown): RuntimeTimerSweepResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeTimerSweepResult`
- Description: The return contract is defined by the type shown above.
