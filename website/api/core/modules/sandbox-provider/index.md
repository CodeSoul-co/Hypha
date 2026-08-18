# `@codesoul-co/hypha-core` / `modules/sandbox-provider/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/sandbox-provider/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)
- Exports: **17**

## Using this module

Use the Index module for binding external or local providers to Hypha ports. It exports 13 constants, 4 functions.

### Import from the package entrypoint

```ts
import {
  sandboxCapabilityDerivationInputJsonSchema,
  sandboxCapabilityDerivationInputSchema,
  sandboxCapabilityNames,
  sandboxCapabilityNameSchema,
  sandboxCapabilityNegotiationRequestExample,
  sandboxCapabilityNegotiationRequestJsonSchema,
  sandboxCapabilityNegotiationRequestSchema,
  sandboxCapabilityNegotiationResultExample,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 13 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { sandboxCapabilityDerivationInputSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = sandboxCapabilityDerivationInputSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `sandboxCapabilityDerivationInputJsonSchema` | constant | <code>const sandboxCapabilityDerivationInputJsonSchema: JsonSchema</code> | JSON Schema for Sandbox Capability Derivation Input. |
| `sandboxCapabilityDerivationInputSchema` | constant | <code>const sandboxCapabilityDerivationInputSchema: z.ZodObject&lt;{ environment: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { revision: z.ZodOptional&lt;...</code> | Runtime schema for Sandbox Capability Derivation Input. |
| `sandboxCapabilityNames` | constant | <code>const sandboxCapabilityNames: readonly ["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"]</code> | Sandbox Capability Names constant exported by the `modules/sandbox-provider/index` module. |
| `sandboxCapabilityNameSchema` | constant | <code>const sandboxCapabilityNameSchema: z.ZodEnum&lt;["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"]&gt;</code> | Runtime schema for Sandbox Capability Name. |
| `sandboxCapabilityNegotiationRequestExample` | constant | <code>const sandboxCapabilityNegotiationRequestExample: SandboxCapabilityNegotiationRequest</code> | Valid example value for Sandbox Capability Negotiation Request. |
| `sandboxCapabilityNegotiationRequestJsonSchema` | constant | <code>const sandboxCapabilityNegotiationRequestJsonSchema: JsonSchema</code> | JSON Schema for Sandbox Capability Negotiation Request. |
| `sandboxCapabilityNegotiationRequestSchema` | constant | <code>const sandboxCapabilityNegotiationRequestSchema: z.ZodObject&lt;{ providerId: z.ZodString; capabilities: z.ZodObject&lt;{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; snapshots: z.ZodBoolean; imageDigestPin...</code> | Runtime schema for Sandbox Capability Negotiation Request. |
| `sandboxCapabilityNegotiationResultExample` | constant | <code>const sandboxCapabilityNegotiationResultExample: SandboxCapabilityNegotiationResult</code> | Valid example value for Sandbox Capability Negotiation Result. |
| `sandboxCapabilityNegotiationResultJsonSchema` | constant | <code>const sandboxCapabilityNegotiationResultJsonSchema: JsonSchema</code> | JSON Schema for Sandbox Capability Negotiation Result. |
| `sandboxCapabilityNegotiationResultSchema` | constant | <code>const sandboxCapabilityNegotiationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ providerId: z.ZodString; compatible: z.ZodBoolean; capabilities: z.ZodObject&lt;{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; s...</code> | Runtime schema for Sandbox Capability Negotiation Result. |
| `sandboxCapabilityRequirementJsonSchema` | constant | <code>const sandboxCapabilityRequirementJsonSchema: JsonSchema</code> | JSON Schema for Sandbox Capability Requirement. |
| `sandboxCapabilityRequirementSchema` | constant | <code>const sandboxCapabilityRequirementSchema: z.ZodObject&lt;{ capability: z.ZodEnum&lt;["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"]&gt;; source: z.ZodEnum&lt;["environment", "command", "policy", "runtime"]&gt;; reason: z.ZodString; }, "strict", z.ZodTypeAny, { reason: st...</code> | Runtime schema for Sandbox Capability Requirement. |
| `sandboxProviderContractJsonSchemas` | constant | <code>const sandboxProviderContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Sandbox Provider Contract JSON Schemas constant exported by the `modules/sandbox-provider/index` module. |
| `deriveSandboxCapabilityRequirements` | function | <code>deriveSandboxCapabilityRequirements(input: SandboxCapabilityDerivationInput): SandboxCapabilityRequirement[]</code> | Derive Sandbox Capability Requirements function with 1 public call signature; parameters and return types are listed below. |
| `negotiateSandboxCapabilities` | function | <code>negotiateSandboxCapabilities(request: SandboxCapabilityNegotiationRequest): SandboxCapabilityNegotiationResult</code> | Negotiate Sandbox Capabilities function with 1 public call signature; parameters and return types are listed below. |
| `validateSandboxCapabilityNegotiationRequest` | function | <code>validateSandboxCapabilityNegotiationRequest(input: unknown): SandboxCapabilityNegotiationRequest</code> | Validate Sandbox Capability Negotiation Request function with 1 public call signature; parameters and return types are listed below. |
| `validateSandboxCapabilityNegotiationResult` | function | <code>validateSandboxCapabilityNegotiationResult(input: unknown): SandboxCapabilityNegotiationResult</code> | Validate Sandbox Capability Negotiation Result function with 1 public call signature; parameters and return types are listed below. |

## `sandboxCapabilityDerivationInputJsonSchema`

JSON Schema for Sandbox Capability Derivation Input.

- Kind: constant
- Import: `import { sandboxCapabilityDerivationInputJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
export declare const sandboxCapabilityDerivationInputJsonSchema: JsonSchema;
```

## `sandboxCapabilityDerivationInputSchema`

Runtime schema for Sandbox Capability Derivation Input.

- Kind: constant
- Import: `import { sandboxCapabilityDerivationInputSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const sandboxCapabilityDerivationInputSchema: (typeof import('@codesoul-co/hypha-core'))['sandboxCapabilityDerivationInputSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `sandboxCapabilityNames`

Sandbox Capability Names constant exported by the `modules/sandbox-provider/index` module.

- Kind: constant
- Import: `import { sandboxCapabilityNames } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
export declare const sandboxCapabilityNames: readonly ["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"];
```

## `sandboxCapabilityNameSchema`

Runtime schema for Sandbox Capability Name.

- Kind: constant
- Import: `import { sandboxCapabilityNameSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
export declare const sandboxCapabilityNameSchema: z.ZodEnum<["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"]>;
```

## `sandboxCapabilityNegotiationRequestExample`

Valid example value for Sandbox Capability Negotiation Request.

- Kind: constant
- Import: `import { sandboxCapabilityNegotiationRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
export declare const sandboxCapabilityNegotiationRequestExample: SandboxCapabilityNegotiationRequest;
```

## `sandboxCapabilityNegotiationRequestJsonSchema`

JSON Schema for Sandbox Capability Negotiation Request.

- Kind: constant
- Import: `import { sandboxCapabilityNegotiationRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
export declare const sandboxCapabilityNegotiationRequestJsonSchema: JsonSchema;
```

## `sandboxCapabilityNegotiationRequestSchema`

Runtime schema for Sandbox Capability Negotiation Request.

- Kind: constant
- Import: `import { sandboxCapabilityNegotiationRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
export declare const sandboxCapabilityNegotiationRequestSchema: z.ZodObject<{ providerId: z.ZodString; capabilities: z.ZodObject<{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; snapshots: z.ZodBoolean; imageDigestPinning: z.ZodBoolean; remoteExecution: z.ZodBoolean; }, "strict", z.ZodTypeAny, { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: boolean; }, { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: boolean; }>; requirements: z.ZodArray<z.ZodObject<{ capability: z.ZodEnum<["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"]>; source: z.ZodEnum<["environment", "command", "policy", "runtime"]>; reason: z.ZodString; }, "strict", z.ZodTypeAny, { reason: string; source: "command" | "policy" | "environment" | "runtime"; capability: "processIsolation" | "filesystemIsolation" | "networkIsolation" | "cpuLimits" | "memoryLimits" | "diskLimits" | "pidsLimit" | "cancellation" | "processTreeKill" | "snapshots" | "imageDigestPinning" | "remoteExecution"; }, { reason: string; source: "command" | "policy" | "environment" | "runtime"; capability: "processIsolation" | "filesystemIsolation" | "networkIsolation" | "cpuLimits" | "memoryLimits" | "diskLimits" | "pidsLimit" | "cancellation" | "processTreeKill" | "snapshots" | "imageDigestPinning" | "remoteExecution"; }>, "many">; evaluatedAt: z.ZodString; }, "strict", z.ZodTypeAny, { providerId: string; capabilities: { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: boolean; }; requirements: { reason: string; source: "command" | "policy" | "environment" | "runtime"; capability: "processIsolation" | "filesystemIsolation" | "networkIsolation" | "cpuLimits" | "memoryLimits" | "diskLimits" | "pidsLimit" | "cancellation" | "processTreeKill" | "snapshots" | "imageDigestPinning" | "remoteExecution"; }[]; evaluatedAt: string; }, { providerId: string; capabilities: { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: boolean; }; requirements: { reason: string; source: "command" | "policy" | "environment" | "runtime"; capability: "processIsolation" | "filesystemIsolation" | "networkIsolation" | "cpuLimits" | "memoryLimits" | "diskLimits" | "pidsLimit" | "cancellation" | "processTreeKill" | "snapshots" | "imageDigestPinning" | "remoteExecution"; }[]; evaluatedAt: string; }>;
```

## `sandboxCapabilityNegotiationResultExample`

Valid example value for Sandbox Capability Negotiation Result.

- Kind: constant
- Import: `import { sandboxCapabilityNegotiationResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
export declare const sandboxCapabilityNegotiationResultExample: SandboxCapabilityNegotiationResult;
```

## `sandboxCapabilityNegotiationResultJsonSchema`

JSON Schema for Sandbox Capability Negotiation Result.

- Kind: constant
- Import: `import { sandboxCapabilityNegotiationResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
export declare const sandboxCapabilityNegotiationResultJsonSchema: JsonSchema;
```

## `sandboxCapabilityNegotiationResultSchema`

Runtime schema for Sandbox Capability Negotiation Result.

- Kind: constant
- Import: `import { sandboxCapabilityNegotiationResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const sandboxCapabilityNegotiationResultSchema: (typeof import('@codesoul-co/hypha-core'))['sandboxCapabilityNegotiationResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `sandboxCapabilityRequirementJsonSchema`

JSON Schema for Sandbox Capability Requirement.

- Kind: constant
- Import: `import { sandboxCapabilityRequirementJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
export declare const sandboxCapabilityRequirementJsonSchema: JsonSchema;
```

## `sandboxCapabilityRequirementSchema`

Runtime schema for Sandbox Capability Requirement.

- Kind: constant
- Import: `import { sandboxCapabilityRequirementSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
export declare const sandboxCapabilityRequirementSchema: z.ZodObject<{ capability: z.ZodEnum<["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"]>; source: z.ZodEnum<["environment", "command", "policy", "runtime"]>; reason: z.ZodString; }, "strict", z.ZodTypeAny, { reason: string; source: "command" | "policy" | "environment" | "runtime"; capability: "processIsolation" | "filesystemIsolation" | "networkIsolation" | "cpuLimits" | "memoryLimits" | "diskLimits" | "pidsLimit" | "cancellation" | "processTreeKill" | "snapshots" | "imageDigestPinning" | "remoteExecution"; }, { reason: string; source: "command" | "policy" | "environment" | "runtime"; capability: "processIsolation" | "filesystemIsolation" | "networkIsolation" | "cpuLimits" | "memoryLimits" | "diskLimits" | "pidsLimit" | "cancellation" | "processTreeKill" | "snapshots" | "imageDigestPinning" | "remoteExecution"; }>;
```

## `sandboxProviderContractJsonSchemas`

Sandbox Provider Contract JSON Schemas constant exported by the `modules/sandbox-provider/index` module.

- Kind: constant
- Import: `import { sandboxProviderContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
export declare const sandboxProviderContractJsonSchemas: Record<string, JsonSchema>;
```

## `deriveSandboxCapabilityRequirements`

Derive Sandbox Capability Requirements function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { deriveSandboxCapabilityRequirements } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
export declare function deriveSandboxCapabilityRequirements(input: SandboxCapabilityDerivationInput): SandboxCapabilityRequirement[];
```

### Call signature

```text
deriveSandboxCapabilityRequirements(input: SandboxCapabilityDerivationInput): SandboxCapabilityRequirement[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>SandboxCapabilityDerivationInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SandboxCapabilityRequirement[]`
- Description: The return contract is defined by the type shown above.

## `negotiateSandboxCapabilities`

Negotiate Sandbox Capabilities function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { negotiateSandboxCapabilities } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
export declare function negotiateSandboxCapabilities(request: SandboxCapabilityNegotiationRequest): SandboxCapabilityNegotiationResult;
```

### Call signature

```text
negotiateSandboxCapabilities(request: SandboxCapabilityNegotiationRequest): SandboxCapabilityNegotiationResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `request` | <code>SandboxCapabilityNegotiationRequest</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SandboxCapabilityNegotiationResult`
- Description: The return contract is defined by the type shown above.

## `validateSandboxCapabilityNegotiationRequest`

Validate Sandbox Capability Negotiation Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateSandboxCapabilityNegotiationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
export declare function validateSandboxCapabilityNegotiationRequest(input: unknown): SandboxCapabilityNegotiationRequest;
```

### Call signature

```text
validateSandboxCapabilityNegotiationRequest(input: unknown): SandboxCapabilityNegotiationRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SandboxCapabilityNegotiationRequest`
- Description: The return contract is defined by the type shown above.

## `validateSandboxCapabilityNegotiationResult`

Validate Sandbox Capability Negotiation Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateSandboxCapabilityNegotiationResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### Declaration

```text
export declare function validateSandboxCapabilityNegotiationResult(input: unknown): SandboxCapabilityNegotiationResult;
```

### Call signature

```text
validateSandboxCapabilityNegotiationResult(input: unknown): SandboxCapabilityNegotiationResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SandboxCapabilityNegotiationResult`
- Description: The return contract is defined by the type shown above.
