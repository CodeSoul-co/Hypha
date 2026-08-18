# `@codesoul-co/hypha-core` / `contracts/runtime-message-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-message-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)
- Exports: **10**

## Using this module

Use the Runtime message schemas module for declaring and runtime-validating contracts. It exports 8 constants, 2 functions.

### Import from the package entrypoint

```ts
import {
  runtimeMessageContractDefinitions,
  runtimeMessageContractJsonSchemas,
  runtimeMessageEnvelopeDefinition,
  runtimeMessageEnvelopeExample,
  runtimeMessageEnvelopeInputSchema,
  runtimeMessageEnvelopeJsonSchema,
  runtimeMessageEnvelopeSchema,
  runtimeMessageTypeSchema,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 8 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { runtimeMessageEnvelopeInputSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeMessageEnvelopeInputSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeMessageContractDefinitions` | constant | <code>const runtimeMessageContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeMessageEnvelope&lt;unknown&gt;&gt;]</code> | Runtime Message Contract Definitions constant exported by the `contracts/runtime-message-schemas` module. |
| `runtimeMessageContractJsonSchemas` | constant | <code>const runtimeMessageContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Runtime Message Contract JSON Schemas constant exported by the `contracts/runtime-message-schemas` module. |
| `runtimeMessageEnvelopeDefinition` | constant | <code>const runtimeMessageEnvelopeDefinition: SpecSchemaDefinition&lt;RuntimeMessageEnvelope&lt;unknown&gt;&gt;</code> | Runtime Message Envelope Definition constant exported by the `contracts/runtime-message-schemas` module. |
| `runtimeMessageEnvelopeExample` | constant | <code>const runtimeMessageEnvelopeExample: RuntimeMessageEnvelope&lt;unknown&gt;</code> | Valid example value for Runtime Message Envelope. |
| `runtimeMessageEnvelopeInputSchema` | constant | <code>const runtimeMessageEnvelopeInputSchema: z.ZodObject&lt;{ payloadHash: z.ZodOptional&lt;z.ZodString&gt;; messageId: z.ZodString; messageType: z.ZodEnum&lt;["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projecti...</code> | Runtime schema for Runtime Message Envelope Input. |
| `runtimeMessageEnvelopeJsonSchema` | constant | <code>const runtimeMessageEnvelopeJsonSchema: JsonSchema</code> | JSON Schema for Runtime Message Envelope. |
| `runtimeMessageEnvelopeSchema` | constant | <code>const runtimeMessageEnvelopeSchema: z.ZodObject&lt;{ payloadHash: z.ZodString; messageId: z.ZodString; messageType: z.ZodEnum&lt;["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtim...</code> | Runtime schema for Runtime Message Envelope. |
| `runtimeMessageTypeSchema` | constant | <code>const runtimeMessageTypeSchema: z.ZodEnum&lt;["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtime.recovery.requested", "runtime.custom"]&gt;</code> | Runtime schema for Runtime Message Type. |
| `validateRuntimeMessageEnvelope` | function | <code>validateRuntimeMessageEnvelope(input: unknown): RuntimeMessageEnvelope</code> | Validate Runtime Message Envelope function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeMessageEnvelopeInput` | function | <code>validateRuntimeMessageEnvelopeInput(input: unknown): RuntimeMessageEnvelopeInput</code> | Validate Runtime Message Envelope Input function with 1 public call signature; parameters and return types are listed below. |

## `runtimeMessageContractDefinitions`

Runtime Message Contract Definitions constant exported by the `contracts/runtime-message-schemas` module.

- Kind: constant
- Import: `import { runtimeMessageContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### Declaration

```text
export declare const runtimeMessageContractDefinitions: readonly [SpecSchemaDefinition<RuntimeMessageEnvelope<unknown>>];
```

## `runtimeMessageContractJsonSchemas`

Runtime Message Contract JSON Schemas constant exported by the `contracts/runtime-message-schemas` module.

- Kind: constant
- Import: `import { runtimeMessageContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### Declaration

```text
export declare const runtimeMessageContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeMessageEnvelopeDefinition`

Runtime Message Envelope Definition constant exported by the `contracts/runtime-message-schemas` module.

- Kind: constant
- Import: `import { runtimeMessageEnvelopeDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### Declaration

```text
export declare const runtimeMessageEnvelopeDefinition: SpecSchemaDefinition<RuntimeMessageEnvelope<unknown>>;
```

## `runtimeMessageEnvelopeExample`

Valid example value for Runtime Message Envelope.

- Kind: constant
- Import: `import { runtimeMessageEnvelopeExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### Declaration

```text
export declare const runtimeMessageEnvelopeExample: RuntimeMessageEnvelope<unknown>;
```

## `runtimeMessageEnvelopeInputSchema`

Runtime schema for Runtime Message Envelope Input.

- Kind: constant
- Import: `import { runtimeMessageEnvelopeInputSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeMessageEnvelopeInputSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeMessageEnvelopeInputSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeMessageEnvelopeJsonSchema`

JSON Schema for Runtime Message Envelope.

- Kind: constant
- Import: `import { runtimeMessageEnvelopeJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### Declaration

```text
export declare const runtimeMessageEnvelopeJsonSchema: JsonSchema;
```

## `runtimeMessageEnvelopeSchema`

Runtime schema for Runtime Message Envelope.

- Kind: constant
- Import: `import { runtimeMessageEnvelopeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeMessageEnvelopeSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeMessageEnvelopeSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeMessageTypeSchema`

Runtime schema for Runtime Message Type.

- Kind: constant
- Import: `import { runtimeMessageTypeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### Declaration

```text
export declare const runtimeMessageTypeSchema: z.ZodEnum<["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtime.recovery.requested", "runtime.custom"]>;
```

## `validateRuntimeMessageEnvelope`

Validate Runtime Message Envelope function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeMessageEnvelope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### Declaration

```text
export declare function validateRuntimeMessageEnvelope(input: unknown): RuntimeMessageEnvelope;
```

### Call signature

```text
validateRuntimeMessageEnvelope(input: unknown): RuntimeMessageEnvelope
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeMessageEnvelope<unknown>`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeMessageEnvelopeInput`

Validate Runtime Message Envelope Input function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeMessageEnvelopeInput } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### Declaration

```text
export declare function validateRuntimeMessageEnvelopeInput(input: unknown): RuntimeMessageEnvelopeInput;
```

### Call signature

```text
validateRuntimeMessageEnvelopeInput(input: unknown): RuntimeMessageEnvelopeInput
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeMessageEnvelopeInput<unknown>`
- Description: The return contract is defined by the type shown above.
