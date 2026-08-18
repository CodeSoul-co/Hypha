# `@codesoul-co/hypha-core` / `modules/sandbox/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/sandbox/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)
- Exports: **23**

## Using this module

Use the Index module for using the public contracts and operations for this capability boundary. It exports 15 constants, 8 functions.

### Import from the package entrypoint

```ts
import {
  sandboxCleanupRequestSchema,
  sandboxCreateRequestExample,
  sandboxCreateRequestSchema,
  sandboxLifecycleJsonSchemas,
  sandboxProviderCapabilitiesExample,
  sandboxProviderCapabilitiesJsonSchema,
  sandboxProviderCapabilitiesSchema,
  sandboxRecordExample,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 8 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 15 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { sandboxCleanupRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = sandboxCleanupRequestSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `sandboxCleanupRequestSchema` | constant | <code>const sandboxCleanupRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "m...</code> | Runtime schema for Sandbox Cleanup Request. |
| `sandboxCreateRequestExample` | constant | <code>const sandboxCreateRequestExample: SandboxCreateRequest</code> | Valid example value for Sandbox Create Request. |
| `sandboxCreateRequestSchema` | constant | <code>const sandboxCreateRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metad...</code> | Runtime schema for Sandbox Create Request. |
| `sandboxLifecycleJsonSchemas` | constant | <code>const sandboxLifecycleJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Sandbox Lifecycle JSON Schemas constant exported by the `modules/sandbox/index` module. |
| `sandboxProviderCapabilitiesExample` | constant | <code>const sandboxProviderCapabilitiesExample: SandboxProviderCapabilities</code> | Valid example value for Sandbox Provider Capabilities. |
| `sandboxProviderCapabilitiesJsonSchema` | constant | <code>const sandboxProviderCapabilitiesJsonSchema: JsonSchema</code> | JSON Schema for Sandbox Provider Capabilities. |
| `sandboxProviderCapabilitiesSchema` | constant | <code>const sandboxProviderCapabilitiesSchema: z.ZodObject&lt;{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; snapshots: z.ZodBoolean; imageDigestPinning: z.ZodBoolean; remoteExecution: z.ZodBoolean; }, "strict...</code> | Runtime schema for Sandbox Provider Capabilities. |
| `sandboxRecordExample` | constant | <code>const sandboxRecordExample: SandboxRecord</code> | Valid example value for Sandbox Record. |
| `sandboxRecordJsonSchema` | constant | <code>const sandboxRecordJsonSchema: JsonSchema</code> | JSON Schema for Sandbox Record. |
| `sandboxRecordSchema` | constant | <code>const sandboxRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; providerId: z.ZodString; environmentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefine...</code> | Runtime schema for Sandbox Record. |
| `sandboxStartRequestSchema` | constant | <code>const sandboxStartRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "man...</code> | Runtime schema for Sandbox Start Request. |
| `sandboxStatusRequestSchema` | constant | <code>const sandboxStatusRequestSchema: z.ZodObject&lt;{ sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptio...</code> | Runtime schema for Sandbox Status Request. |
| `sandboxStatusSchema` | constant | <code>const sandboxStatusSchema: z.ZodEnum&lt;["creating", "created", "starting", "ready", "busy", "stopping", "stopped", "terminating", "terminated", "cleaning", "cleaned", "failed"]&gt;</code> | Runtime schema for Sandbox Status. |
| `sandboxStatusTransitions` | constant | <code>const sandboxStatusTransitions: Readonly&lt;Record&lt;SandboxStatus, readonly SandboxStatus[]&gt;&gt;</code> | Sandbox Status Transitions constant exported by the `modules/sandbox/index` module. |
| `sandboxTerminateRequestSchema` | constant | <code>const sandboxTerminateRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, ...</code> | Runtime schema for Sandbox Terminate Request. |
| `canTransitionSandboxStatus` | function | <code>canTransitionSandboxStatus(from: SandboxStatus, to: SandboxStatus): boolean</code> | Can Transition Sandbox Status function with 1 public call signature; parameters and return types are listed below. |
| `validateSandboxCleanupRequest` | function | <code>validateSandboxCleanupRequest(input: unknown): SandboxCleanupRequest</code> | Validate Sandbox Cleanup Request function with 1 public call signature; parameters and return types are listed below. |
| `validateSandboxCreateRequest` | function | <code>validateSandboxCreateRequest(input: unknown): SandboxCreateRequest</code> | Validate Sandbox Create Request function with 1 public call signature; parameters and return types are listed below. |
| `validateSandboxProviderCapabilities` | function | <code>validateSandboxProviderCapabilities(input: unknown): SandboxProviderCapabilities</code> | Validate Sandbox Provider Capabilities function with 1 public call signature; parameters and return types are listed below. |
| `validateSandboxRecord` | function | <code>validateSandboxRecord(input: unknown): SandboxRecord</code> | Validate Sandbox Record function with 1 public call signature; parameters and return types are listed below. |
| `validateSandboxStartRequest` | function | <code>validateSandboxStartRequest(input: unknown): SandboxStartRequest</code> | Validate Sandbox Start Request function with 1 public call signature; parameters and return types are listed below. |
| `validateSandboxStatusRequest` | function | <code>validateSandboxStatusRequest(input: unknown): SandboxStatusRequest</code> | Validate Sandbox Status Request function with 1 public call signature; parameters and return types are listed below. |
| `validateSandboxTerminateRequest` | function | <code>validateSandboxTerminateRequest(input: unknown): SandboxTerminateRequest</code> | Validate Sandbox Terminate Request function with 1 public call signature; parameters and return types are listed below. |

## `sandboxCleanupRequestSchema`

Runtime schema for Sandbox Cleanup Request.

- Kind: constant
- Import: `import { sandboxCleanupRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare const sandboxCleanupRequestSchema: z.ZodObject<{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; expectedRevision: z.ZodNumber; idempotencyKey: z.ZodOptional<z.ZodString>; } & { reason: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; idempotencyKey?: string | undefined; }, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; idempotencyKey?: string | undefined; }>;
```

## `sandboxCreateRequestExample`

Valid example value for Sandbox Create Request.

- Kind: constant
- Import: `import { sandboxCreateRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare const sandboxCreateRequestExample: SandboxCreateRequest;
```

## `sandboxCreateRequestSchema`

Runtime schema for Sandbox Create Request.

- Kind: constant
- Import: `import { sandboxCreateRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const sandboxCreateRequestSchema: (typeof import('@codesoul-co/hypha-core'))['sandboxCreateRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `sandboxLifecycleJsonSchemas`

Sandbox Lifecycle JSON Schemas constant exported by the `modules/sandbox/index` module.

- Kind: constant
- Import: `import { sandboxLifecycleJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare const sandboxLifecycleJsonSchemas: Record<string, JsonSchema>;
```

## `sandboxProviderCapabilitiesExample`

Valid example value for Sandbox Provider Capabilities.

- Kind: constant
- Import: `import { sandboxProviderCapabilitiesExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare const sandboxProviderCapabilitiesExample: SandboxProviderCapabilities;
```

## `sandboxProviderCapabilitiesJsonSchema`

JSON Schema for Sandbox Provider Capabilities.

- Kind: constant
- Import: `import { sandboxProviderCapabilitiesJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare const sandboxProviderCapabilitiesJsonSchema: JsonSchema;
```

## `sandboxProviderCapabilitiesSchema`

Runtime schema for Sandbox Provider Capabilities.

- Kind: constant
- Import: `import { sandboxProviderCapabilitiesSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare const sandboxProviderCapabilitiesSchema: z.ZodObject<{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; snapshots: z.ZodBoolean; imageDigestPinning: z.ZodBoolean; remoteExecution: z.ZodBoolean; }, "strict", z.ZodTypeAny, { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: boolean; }, { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: boolean; }>;
```

## `sandboxRecordExample`

Valid example value for Sandbox Record.

- Kind: constant
- Import: `import { sandboxRecordExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare const sandboxRecordExample: SandboxRecord;
```

## `sandboxRecordJsonSchema`

JSON Schema for Sandbox Record.

- Kind: constant
- Import: `import { sandboxRecordJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare const sandboxRecordJsonSchema: JsonSchema;
```

## `sandboxRecordSchema`

Runtime schema for Sandbox Record.

- Kind: constant
- Import: `import { sandboxRecordSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const sandboxRecordSchema: (typeof import('@codesoul-co/hypha-core'))['sandboxRecordSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `sandboxStartRequestSchema`

Runtime schema for Sandbox Start Request.

- Kind: constant
- Import: `import { sandboxStartRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare const sandboxStartRequestSchema: z.ZodObject<{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; expectedRevision: z.ZodNumber; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; idempotencyKey?: string | undefined; }, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; idempotencyKey?: string | undefined; }>;
```

## `sandboxStatusRequestSchema`

Runtime schema for Sandbox Status Request.

- Kind: constant
- Import: `import { sandboxStatusRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare const sandboxStatusRequestSchema: z.ZodObject<{ sandboxId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; }, "strict", z.ZodTypeAny, { sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }, { sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }>;
```

## `sandboxStatusSchema`

Runtime schema for Sandbox Status.

- Kind: constant
- Import: `import { sandboxStatusSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare const sandboxStatusSchema: z.ZodEnum<["creating", "created", "starting", "ready", "busy", "stopping", "stopped", "terminating", "terminated", "cleaning", "cleaned", "failed"]>;
```

## `sandboxStatusTransitions`

Sandbox Status Transitions constant exported by the `modules/sandbox/index` module.

- Kind: constant
- Import: `import { sandboxStatusTransitions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare const sandboxStatusTransitions: Readonly<Record<SandboxStatus, readonly SandboxStatus[]>>;
```

## `sandboxTerminateRequestSchema`

Runtime schema for Sandbox Terminate Request.

- Kind: constant
- Import: `import { sandboxTerminateRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare const sandboxTerminateRequestSchema: z.ZodObject<{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; expectedRevision: z.ZodNumber; idempotencyKey: z.ZodOptional<z.ZodString>; } & { reason: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; idempotencyKey?: string | undefined; }, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; idempotencyKey?: string | undefined; }>;
```

## `canTransitionSandboxStatus`

Can Transition Sandbox Status function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { canTransitionSandboxStatus } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare function canTransitionSandboxStatus(from: SandboxStatus, to: SandboxStatus): boolean;
```

### Call signature

```text
canTransitionSandboxStatus(from: SandboxStatus, to: SandboxStatus): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | <code>SandboxStatus</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `to` | <code>SandboxStatus</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `validateSandboxCleanupRequest`

Validate Sandbox Cleanup Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateSandboxCleanupRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare function validateSandboxCleanupRequest(input: unknown): SandboxCleanupRequest;
```

### Call signature

```text
validateSandboxCleanupRequest(input: unknown): SandboxCleanupRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SandboxCleanupRequest`
- Description: The return contract is defined by the type shown above.

## `validateSandboxCreateRequest`

Validate Sandbox Create Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateSandboxCreateRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare function validateSandboxCreateRequest(input: unknown): SandboxCreateRequest;
```

### Call signature

```text
validateSandboxCreateRequest(input: unknown): SandboxCreateRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SandboxCreateRequest`
- Description: The return contract is defined by the type shown above.

## `validateSandboxProviderCapabilities`

Validate Sandbox Provider Capabilities function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateSandboxProviderCapabilities } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare function validateSandboxProviderCapabilities(input: unknown): SandboxProviderCapabilities;
```

### Call signature

```text
validateSandboxProviderCapabilities(input: unknown): SandboxProviderCapabilities
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SandboxProviderCapabilities`
- Description: The return contract is defined by the type shown above.

## `validateSandboxRecord`

Validate Sandbox Record function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateSandboxRecord } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare function validateSandboxRecord(input: unknown): SandboxRecord;
```

### Call signature

```text
validateSandboxRecord(input: unknown): SandboxRecord
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SandboxRecord`
- Description: The return contract is defined by the type shown above.

## `validateSandboxStartRequest`

Validate Sandbox Start Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateSandboxStartRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare function validateSandboxStartRequest(input: unknown): SandboxStartRequest;
```

### Call signature

```text
validateSandboxStartRequest(input: unknown): SandboxStartRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SandboxStartRequest`
- Description: The return contract is defined by the type shown above.

## `validateSandboxStatusRequest`

Validate Sandbox Status Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateSandboxStatusRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare function validateSandboxStatusRequest(input: unknown): SandboxStatusRequest;
```

### Call signature

```text
validateSandboxStatusRequest(input: unknown): SandboxStatusRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SandboxStatusRequest`
- Description: The return contract is defined by the type shown above.

## `validateSandboxTerminateRequest`

Validate Sandbox Terminate Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateSandboxTerminateRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### Declaration

```text
export declare function validateSandboxTerminateRequest(input: unknown): SandboxTerminateRequest;
```

### Call signature

```text
validateSandboxTerminateRequest(input: unknown): SandboxTerminateRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SandboxTerminateRequest`
- Description: The return contract is defined by the type shown above.
