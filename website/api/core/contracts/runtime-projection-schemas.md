# `@codesoul-co/hypha-core` / `contracts/runtime-projection-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-projection-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)
- Exports: **8**

## Using this module

Use the Runtime projection schemas module for declaring and runtime-validating contracts. It exports 7 constants, 1 function.

### Import from the package entrypoint

```ts
import {
  runtimeOrchestrationProjectionDefinition,
  runtimeOrchestrationProjectionExample,
  runtimeOrchestrationProjectionJsonSchema,
  runtimeOrchestrationProjectionSchema,
  runtimeOrchestrationRunStatusSchema,
  runtimeProjectionContractDefinitions,
  runtimeProjectionContractJsonSchemas,
  validateRuntimeOrchestrationProjection,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 7 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { runtimeOrchestrationProjectionSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeOrchestrationProjectionSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeOrchestrationProjectionDefinition` | constant | <code>const runtimeOrchestrationProjectionDefinition: SpecSchemaDefinition&lt;RuntimeOrchestrationProjection&gt;</code> | Runtime Orchestration Projection Definition constant exported by the `contracts/runtime-projection-schemas` module. |
| `runtimeOrchestrationProjectionExample` | constant | <code>const runtimeOrchestrationProjectionExample: RuntimeOrchestrationProjection</code> | Valid example value for Runtime Orchestration Projection. |
| `runtimeOrchestrationProjectionJsonSchema` | constant | <code>const runtimeOrchestrationProjectionJsonSchema: JsonSchema</code> | JSON Schema for Runtime Orchestration Projection. |
| `runtimeOrchestrationProjectionSchema` | constant | <code>const runtimeOrchestrationProjectionSchema: z.ZodEffects&lt;z.ZodObject&lt;{ runId: z.ZodString; runStatus: z.ZodEnum&lt;[RuntimeOrchestrationRunStatus, ...RuntimeOrchestrationRunStatus[]]&gt;; currentState: z.ZodOptional&lt;z.ZodString&gt;; terminalState: z.ZodOptional&lt;z.ZodString&gt;; statePath: z.ZodArray&lt;z.ZodString, "many"&gt;; stateVisitCounts: z.ZodRecord&lt;z.ZodString, z.ZodNumber&gt;; stateAttempt: z.ZodNumber; pendingTransition: z.Z...</code> | Runtime schema for Runtime Orchestration Projection. |
| `runtimeOrchestrationRunStatusSchema` | constant | <code>const runtimeOrchestrationRunStatusSchema: z.ZodEnum&lt;[RuntimeOrchestrationRunStatus, ...RuntimeOrchestrationRunStatus[]]&gt;</code> | Runtime schema for Runtime Orchestration Run Status. |
| `runtimeProjectionContractDefinitions` | constant | <code>const runtimeProjectionContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeOrchestrationProjection&gt;]</code> | Runtime Projection Contract Definitions constant exported by the `contracts/runtime-projection-schemas` module. |
| `runtimeProjectionContractJsonSchemas` | constant | <code>const runtimeProjectionContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Runtime Projection Contract JSON Schemas constant exported by the `contracts/runtime-projection-schemas` module. |
| `validateRuntimeOrchestrationProjection` | function | <code>validateRuntimeOrchestrationProjection(input: unknown): RuntimeOrchestrationProjection</code> | Validate Runtime Orchestration Projection function with 1 public call signature; parameters and return types are listed below. |

## `runtimeOrchestrationProjectionDefinition`

Runtime Orchestration Projection Definition constant exported by the `contracts/runtime-projection-schemas` module.

- Kind: constant
- Import: `import { runtimeOrchestrationProjectionDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### Declaration

```text
export declare const runtimeOrchestrationProjectionDefinition: SpecSchemaDefinition<RuntimeOrchestrationProjection>;
```

## `runtimeOrchestrationProjectionExample`

Valid example value for Runtime Orchestration Projection.

- Kind: constant
- Import: `import { runtimeOrchestrationProjectionExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### Declaration

```text
export declare const runtimeOrchestrationProjectionExample: RuntimeOrchestrationProjection;
```

## `runtimeOrchestrationProjectionJsonSchema`

JSON Schema for Runtime Orchestration Projection.

- Kind: constant
- Import: `import { runtimeOrchestrationProjectionJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### Declaration

```text
export declare const runtimeOrchestrationProjectionJsonSchema: JsonSchema;
```

## `runtimeOrchestrationProjectionSchema`

Runtime schema for Runtime Orchestration Projection.

- Kind: constant
- Import: `import { runtimeOrchestrationProjectionSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeOrchestrationProjectionSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeOrchestrationProjectionSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeOrchestrationRunStatusSchema`

Runtime schema for Runtime Orchestration Run Status.

- Kind: constant
- Import: `import { runtimeOrchestrationRunStatusSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### Declaration

```text
export declare const runtimeOrchestrationRunStatusSchema: z.ZodEnum<[RuntimeOrchestrationRunStatus, ...RuntimeOrchestrationRunStatus[]]>;
```

## `runtimeProjectionContractDefinitions`

Runtime Projection Contract Definitions constant exported by the `contracts/runtime-projection-schemas` module.

- Kind: constant
- Import: `import { runtimeProjectionContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### Declaration

```text
export declare const runtimeProjectionContractDefinitions: readonly [SpecSchemaDefinition<RuntimeOrchestrationProjection>];
```

## `runtimeProjectionContractJsonSchemas`

Runtime Projection Contract JSON Schemas constant exported by the `contracts/runtime-projection-schemas` module.

- Kind: constant
- Import: `import { runtimeProjectionContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### Declaration

```text
export declare const runtimeProjectionContractJsonSchemas: Record<string, JsonSchema>;
```

## `validateRuntimeOrchestrationProjection`

Validate Runtime Orchestration Projection function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeOrchestrationProjection } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### Declaration

```text
export declare function validateRuntimeOrchestrationProjection(input: unknown): RuntimeOrchestrationProjection;
```

### Call signature

```text
validateRuntimeOrchestrationProjection(input: unknown): RuntimeOrchestrationProjection
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeOrchestrationProjection`
- Description: The return contract is defined by the type shown above.
