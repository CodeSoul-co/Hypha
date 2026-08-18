# `@codesoul-co/hypha-mcp` / `index`

- Package index: [`@codesoul-co/hypha-mcp`](/api/mcp)
- Source: [`packages/mcp/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)
- Exports: **32**

## Using this module

Aggregates the public entrypoint exports for `@codesoul-co/hypha-mcp`; applications import these symbols from the package entrypoint instead of internal file paths.

### Import from the package entrypoint

```ts
import {
  MockMCPGateway,
  classicMCPCapabilityDescriptors,
  classicMCPIntegrationSpec,
  mcpCapabilityDescriptorSchema,
  mcpIntegrationSpecDefinition,
  mcpIntegrationSpecExample,
  mcpIntegrationSpecJsonSchema,
  mcpIntegrationSpecSchema,
} from '@codesoul-co/hypha-mcp';

import type {
  ClassicMCPFetchResponse,
  ClassicMCPMockGatewayOptions,
  ClassicMCPSearchResult,
  MCPCapabilityDescriptor,
  MCPGateway,
  MCPGatewayToolRegistrationContext,
  MCPGatewayToolRegistrationOptions,
  MCPGatewayToolRegistrationResult,
} from '@codesoul-co/hypha-mcp';

// The complete export list is documented below.
```

### Usage patterns

- Use the 17 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 10 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { mcpCapabilityDescriptorSchema } from '@codesoul-co/hypha-mcp';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = mcpCapabilityDescriptorSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MockMCPGateway` | class | <code>new MockMCPGateway(capabilities?: MCPCapabilityDescriptor[]): MockMCPGateway</code> | Mock MCP Gateway class with 11 public constructor or member entries; its exact declarations are listed below. |
| `classicMCPCapabilityDescriptors` | constant | <code>const classicMCPCapabilityDescriptors: MCPCapabilityDescriptor[]</code> | Classic MCP Capability Descriptors constant exported by the `index` module. |
| `classicMCPIntegrationSpec` | constant | <code>const classicMCPIntegrationSpec: MCPIntegrationSpec</code> | Classic MCP Integration Spec constant exported by the `index` module. |
| `mcpCapabilityDescriptorSchema` | constant | <code>const mcpCapabilityDescriptorSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { serverId: z.ZodString; capabilityId: z.ZodString; type: z.ZodEnum&lt;["tool"...</code> | Runtime schema for MCP Capability Descriptor. |
| `mcpIntegrationSpecDefinition` | constant | <code>const mcpIntegrationSpecDefinition: SpecSchemaDefinition&lt;MCPIntegrationSpec&gt;</code> | Runtime validation entrypoint for the MCP Integration spec, combining its parser, example and JSON Schema. |
| `mcpIntegrationSpecExample` | constant | <code>const mcpIntegrationSpecExample: MCPIntegrationSpec</code> | Valid example value for MCP Integration Spec. |
| `mcpIntegrationSpecJsonSchema` | constant | <code>const mcpIntegrationSpecJsonSchema: JsonSchema</code> | JSON Schema for MCP Integration Spec. |
| `mcpIntegrationSpecSchema` | constant | <code>const mcpIntegrationSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; servers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; mode: z.ZodEnum&lt;["local", "remote"]&gt;; version: z.ZodOptional&lt;z.ZodString&gt;; endpoint: z.ZodOptional&lt;z.ZodString&gt;; command: z.ZodOptional&lt;z.ZodString&gt;; args: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { id: string; mode: "local" &#124; "remote"; version?: s...</code> | Runtime schema for MCP Integration Spec. |
| `mcpServerSpecSchema` | constant | <code>const mcpServerSpecSchema: z.ZodObject&lt;{ id: z.ZodString; mode: z.ZodEnum&lt;["local", "remote"]&gt;; version: z.ZodOptional&lt;z.ZodString&gt;; endpoint: z.ZodOptional&lt;z.ZodString&gt;; command: z.ZodOptional&lt;z.ZodString&gt;; args: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { id: string; mode: "local" &#124; "remote"; version?: string &#124; undefined; endpoint?: string &#124; undefined; command?: string &#124; undefined...</code> | Runtime schema for MCP Server Spec. |
| `mcpSpecDefinitions` | constant | <code>const mcpSpecDefinitions: readonly [SpecSchemaDefinition&lt;MCPIntegrationSpec&gt;]</code> | MCP Spec Definitions constant exported by the `index` module. |
| `mcpSpecJsonSchemas` | constant | <code>const mcpSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | MCP Spec JSON Schemas constant exported by the `index` module. |
| `createClassicMCPMockGateway` | function | <code>createClassicMCPMockGateway(options?: ClassicMCPMockGatewayOptions): MockMCPGateway</code> | Create Classic MCP Mock Gateway function with 1 public call signature; parameters and return types are listed below. |
| `normalizeMCPToolSpec` | function | <code>normalizeMCPToolSpec(capability: MCPCapabilityDescriptor): ToolSpec</code> | Normalize MCP Tool Spec function with 1 public call signature; parameters and return types are listed below. |
| `registerMCPGatewayTools` | function | <code>registerMCPGatewayTools(options: MCPGatewayToolRegistrationOptions): Promise&lt;MCPGatewayToolRegistrationResult&gt;</code> | Register MCP Gateway Tools function with 1 public call signature; parameters and return types are listed below. |
| `validateMCPIntegrationSpec` | function | <code>validateMCPIntegrationSpec(input: unknown): MCPIntegrationSpec</code> | Validate MCP Integration Spec function with 1 public call signature; parameters and return types are listed below. |
| `ClassicMCPFetchResponse` | interface | <code>interface ClassicMCPFetchResponse</code> | Classic MCP Fetch Response interface with 4 public fields or methods. |
| `ClassicMCPMockGatewayOptions` | interface | <code>interface ClassicMCPMockGatewayOptions</code> | Classic MCP Mock Gateway Options interface with 4 public fields or methods. |
| `ClassicMCPSearchResult` | interface | <code>interface ClassicMCPSearchResult</code> | Classic MCP Search Result interface with 3 public fields or methods. |
| `MCPCapabilityDescriptor` | interface | <code>interface MCPCapabilityDescriptor extends VersionedSpec, SpecMetadata</code> | MCP Capability Descriptor interface with 21 public fields or methods. |
| `MCPGateway` | interface | <code>interface MCPGateway</code> | MCP Gateway interface with 7 public fields or methods. |
| `MCPGatewayToolRegistrationContext` | interface | <code>interface MCPGatewayToolRegistrationContext</code> | MCP Gateway Tool Registration Context interface with 4 public fields or methods. |
| `MCPGatewayToolRegistrationOptions` | interface | <code>interface MCPGatewayToolRegistrationOptions</code> | MCP Gateway Tool Registration Options interface with 6 public fields or methods. |
| `MCPGatewayToolRegistrationResult` | interface | <code>interface MCPGatewayToolRegistrationResult</code> | MCP Gateway Tool Registration Result interface with 5 public fields or methods. |
| `MCPIntegrationSpec` | interface | <code>interface MCPIntegrationSpec</code> | MCP Integration Spec interface with 13 public fields or methods. |
| `MCPPromptRequest` | interface | <code>interface MCPPromptRequest</code> | MCP Prompt Request interface with 4 public fields or methods. |
| `MCPPromptResult` | interface | <code>interface MCPPromptResult</code> | MCP Prompt Result interface with 3 public fields or methods. |
| `MCPResourceReadRequest` | interface | <code>interface MCPResourceReadRequest</code> | MCP Resource Read Request interface with 3 public fields or methods. |
| `MCPResourceResult` | interface | <code>interface MCPResourceResult</code> | MCP Resource Result interface with 2 public fields or methods. |
| `MCPServerSpec` | interface | <code>interface MCPServerSpec</code> | MCP Server Spec interface with 6 public fields or methods. |
| `MCPToolCallRequest` | interface | <code>interface MCPToolCallRequest</code> | MCP Tool Call Request interface with 4 public fields or methods. |
| `NormalizedMCPCapability` | interface | <code>interface NormalizedMCPCapability</code> | Normalized MCP Capability interface with 6 public fields or methods. |
| `MCPToolHandler` | type | <code>type MCPToolHandler = (request: MCPToolCallRequest&lt;TInput&gt;) =&gt; Promise&lt;TOutput&gt; &#124; TOutput</code> | Public type alias for MCP Tool Handler; the declaration contains its complete type expression. |

## `MockMCPGateway`

Mock MCP Gateway class with 11 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MockMCPGateway } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export declare class MockMCPGateway implements MCPGateway {
    constructor(capabilities?: MCPCapabilityDescriptor[]);
    registerToolHandler(serverId: string, capabilityId: string, handler: MCPToolHandler): void;
    registerResource(serverId: string, uri: string, result: MCPResourceResult): void;
    registerPrompt(serverId: string, name: string, result: MCPPromptResult): void;
    discover(integration: MCPIntegrationSpec): Promise<MCPCapabilityDescriptor[]>;
    normalize(capability: MCPCapabilityDescriptor): Promise<NormalizedMCPCapability>;
    call(request: MCPToolCallRequest): Promise<unknown>;
    callTool(request: MCPToolCallRequest): Promise<unknown>;
    readResource(request: MCPResourceReadRequest): Promise<MCPResourceResult>;
    getPrompt(request: MCPPromptRequest): Promise<MCPPromptResult>;
    health(serverId?: string): Promise<Record<string, import('@codesoul-co/hypha-tools').ProviderHealth>>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `call` | method | <code>call(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `callTool` | method | <code>callTool(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(capabilities?: MCPCapabilityDescriptor[]): MockMCPGateway</code> | Creates an instance of this class. |
| `discover` | method | <code>discover(integration: MCPIntegrationSpec): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getPrompt` | method | <code>getPrompt(request: MCPPromptRequest): Promise&lt;MCPPromptResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(serverId?: string): Promise&lt;Record&lt;string, import("@codesoul-co/hypha-tools").ProviderHealth&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `normalize` | method | <code>normalize(capability: MCPCapabilityDescriptor): Promise&lt;NormalizedMCPCapability&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `readResource` | method | <code>readResource(request: MCPResourceReadRequest): Promise&lt;MCPResourceResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `registerPrompt` | method | <code>registerPrompt(serverId: string, name: string, result: MCPPromptResult): void</code> | Public method; parameters and return type are shown in the signature. |
| `registerResource` | method | <code>registerResource(serverId: string, uri: string, result: MCPResourceResult): void</code> | Public method; parameters and return type are shown in the signature. |
| `registerToolHandler` | method | <code>registerToolHandler(serverId: string, capabilityId: string, handler: MCPToolHandler): void</code> | Public method; parameters and return type are shown in the signature. |

## `classicMCPCapabilityDescriptors`

Classic MCP Capability Descriptors constant exported by the `index` module.

- Kind: constant
- Import: `import { classicMCPCapabilityDescriptors } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export declare const classicMCPCapabilityDescriptors: MCPCapabilityDescriptor[];
```

## `classicMCPIntegrationSpec`

Classic MCP Integration Spec constant exported by the `index` module.

- Kind: constant
- Import: `import { classicMCPIntegrationSpec } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export declare const classicMCPIntegrationSpec: MCPIntegrationSpec;
```

## `mcpCapabilityDescriptorSchema`

Runtime schema for MCP Capability Descriptor.

- Kind: constant
- Import: `import { mcpCapabilityDescriptorSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export declare const mcpCapabilityDescriptorSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { serverId: z.ZodString; capabilityId: z.ZodString; type: z.ZodEnum<["tool", "resource", "prompt"]>; inputSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; outputSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; sideEffectLevel: z.ZodOptional<z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>>; permissionScope: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; capabilityHash: z.ZodOptional<z.ZodString>; trustLevel: z.ZodOptional<z.ZodEnum<["trusted", "reviewed", "untrusted"]>>; declarationSource: z.ZodOptional<z.ZodEnum<["framework", "user", "server", "unknown"]>>; }, "strip", z.ZodTypeAny, { id: string; type: "tool" | "resource" | "prompt"; version: string; serverId: string; capabilityId: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; inputSchema?: JsonSchema | undefined; outputSchema?: JsonSchema | undefined; sideEffectLevel?: "none" | "read" | "write" | "external_effect" | "irreversible" | undefined; permissionScope?: string[] | undefined; capabilityHash?: string | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; declarationSource?: "unknown" | "framework" | "user" | "server" | undefined; }, { id: string; type: "tool" | "resource" | "prompt"; version: string; serverId: string; capabilityId: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; inputSchema?: JsonSchema | undefined; outputSchema?: JsonSchema | undefined; sideEffectLevel?: "none" | "read" | "write" | "external_effect" | "irreversible" | undefined; permissionScope?: string[] | undefined; capabilityHash?: string | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; declarationSource?: "unknown" | "framework" | "user" | "server" | undefined; }>;
```

## `mcpIntegrationSpecDefinition`

Runtime validation entrypoint for the MCP Integration spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { mcpIntegrationSpecDefinition } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export declare const mcpIntegrationSpecDefinition: SpecSchemaDefinition<MCPIntegrationSpec>;
```

## `mcpIntegrationSpecExample`

Valid example value for MCP Integration Spec.

- Kind: constant
- Import: `import { mcpIntegrationSpecExample } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export declare const mcpIntegrationSpecExample: MCPIntegrationSpec;
```

## `mcpIntegrationSpecJsonSchema`

JSON Schema for MCP Integration Spec.

- Kind: constant
- Import: `import { mcpIntegrationSpecJsonSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export declare const mcpIntegrationSpecJsonSchema: JsonSchema;
```

## `mcpIntegrationSpecSchema`

Runtime schema for MCP Integration Spec.

- Kind: constant
- Import: `import { mcpIntegrationSpecSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export declare const mcpIntegrationSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; servers: z.ZodArray<z.ZodObject<{ id: z.ZodString; mode: z.ZodEnum<["local", "remote"]>; version: z.ZodOptional<z.ZodString>; endpoint: z.ZodOptional<z.ZodString>; command: z.ZodOptional<z.ZodString>; args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { id: string; mode: "local" | "remote"; version?: string | undefined; endpoint?: string | undefined; command?: string | undefined; args?: string[] | undefined; }, { id: string; mode: "local" | "remote"; version?: string | undefined; endpoint?: string | undefined; command?: string | undefined; args?: string[] | undefined; }>, "many">; allowedCapabilities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; deniedCapabilities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; trustPolicy: z.ZodOptional<z.ZodString>; importPolicy: z.ZodOptional<z.ZodString>; resourcePolicy: z.ZodOptional<z.ZodString>; toolPolicy: z.ZodOptional<z.ZodString>; promptPolicy: z.ZodOptional<z.ZodString>; versionPinning: z.ZodOptional<z.ZodBoolean>; capabilityHashing: z.ZodOptional<z.ZodBoolean>; driftPolicy: z.ZodOptional<z.ZodEnum<["quarantine", "accept"]>>; }, "strip", z.ZodTypeAny, { id: string; version: string; servers: { id: string; mode: "local" | "remote"; version?: string | undefined; endpoint?: string | undefined; command?: string | undefined; args?: string[] | undefined; }[]; allowedCapabilities?: string[] | undefined; deniedCapabilities?: string[] | undefined; trustPolicy?: string | undefined; importPolicy?: string | undefined; resourcePolicy?: string | undefined; toolPolicy?: string | undefined; promptPolicy?: string | undefined; versionPinning?: boolean | undefined; capabilityHashing?: boolean | undefined; driftPolicy?: "quarantine" | "accept" | undefined; }, { id: string; version: string; servers: { id: string; mode: "local" | "remote"; version?: string | undefined; endpoint?: string | undefined; command?: string | undefined; args?: string[] | undefined; }[]; allowedCapabilities?: string[] | undefined; deniedCapabilities?: string[] | undefined; trustPolicy?: string | undefined; importPolicy?: string | undefined; resourcePolicy?: string | undefined; toolPolicy?: string | undefined; promptPolicy?: string | undefined; versionPinning?: boolean | undefined; capabilityHashing?: boolean | undefined; driftPolicy?: "quarantine" | "accept" | undefined; }>;
```

## `mcpServerSpecSchema`

Runtime schema for MCP Server Spec.

- Kind: constant
- Import: `import { mcpServerSpecSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export declare const mcpServerSpecSchema: z.ZodObject<{ id: z.ZodString; mode: z.ZodEnum<["local", "remote"]>; version: z.ZodOptional<z.ZodString>; endpoint: z.ZodOptional<z.ZodString>; command: z.ZodOptional<z.ZodString>; args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { id: string; mode: "local" | "remote"; version?: string | undefined; endpoint?: string | undefined; command?: string | undefined; args?: string[] | undefined; }, { id: string; mode: "local" | "remote"; version?: string | undefined; endpoint?: string | undefined; command?: string | undefined; args?: string[] | undefined; }>;
```

## `mcpSpecDefinitions`

MCP Spec Definitions constant exported by the `index` module.

- Kind: constant
- Import: `import { mcpSpecDefinitions } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export declare const mcpSpecDefinitions: readonly [SpecSchemaDefinition<MCPIntegrationSpec>];
```

## `mcpSpecJsonSchemas`

MCP Spec JSON Schemas constant exported by the `index` module.

- Kind: constant
- Import: `import { mcpSpecJsonSchemas } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export declare const mcpSpecJsonSchemas: Record<string, JsonSchema>;
```

## `createClassicMCPMockGateway`

Create Classic MCP Mock Gateway function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createClassicMCPMockGateway } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export declare function createClassicMCPMockGateway(options?: ClassicMCPMockGatewayOptions): MockMCPGateway;
```

### Call signature

```text
createClassicMCPMockGateway(options?: ClassicMCPMockGatewayOptions): MockMCPGateway
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>ClassicMCPMockGatewayOptions</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MockMCPGateway`
- Description: The return contract is defined by the type shown above.

## `normalizeMCPToolSpec`

Normalize MCP Tool Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizeMCPToolSpec } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export declare function normalizeMCPToolSpec(capability: MCPCapabilityDescriptor): ToolSpec;
```

### Call signature

```text
normalizeMCPToolSpec(capability: MCPCapabilityDescriptor): ToolSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `capability` | <code>MCPCapabilityDescriptor</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ToolSpec`
- Description: The return contract is defined by the type shown above.

## `registerMCPGatewayTools`

Register MCP Gateway Tools function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { registerMCPGatewayTools } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export declare function registerMCPGatewayTools(options: MCPGatewayToolRegistrationOptions): Promise<MCPGatewayToolRegistrationResult>;
```

### Call signature

```text
registerMCPGatewayTools(options: MCPGatewayToolRegistrationOptions): Promise<MCPGatewayToolRegistrationResult>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>MCPGatewayToolRegistrationOptions</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<MCPGatewayToolRegistrationResult>`
- Description: The return contract is defined by the type shown above.

## `validateMCPIntegrationSpec`

Validate MCP Integration Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMCPIntegrationSpec } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export declare function validateMCPIntegrationSpec(input: unknown): MCPIntegrationSpec;
```

### Call signature

```text
validateMCPIntegrationSpec(input: unknown): MCPIntegrationSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MCPIntegrationSpec`
- Description: The return contract is defined by the type shown above.

## `ClassicMCPFetchResponse`

Classic MCP Fetch Response interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ClassicMCPFetchResponse } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface ClassicMCPFetchResponse {
    status?: number;
    headers?: Record<string, string>;
    body?: string;
    json?: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `body` | property | <code>body?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `headers` | property | <code>headers?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `json` | property | <code>json?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ClassicMCPMockGatewayOptions`

Classic MCP Mock Gateway Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ClassicMCPMockGatewayOptions } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface ClassicMCPMockGatewayOptions {
    files?: Record<string, string>;
    fetchResponses?: Record<string, ClassicMCPFetchResponse>;
    now?: string;
    searchResults?: Record<string, ClassicMCPSearchResult[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fetchResponses` | property | <code>fetchResponses?: Record&lt;string, ClassicMCPFetchResponse&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `files` | property | <code>files?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | property | <code>now?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `searchResults` | property | <code>searchResults?: Record&lt;string, ClassicMCPSearchResult[]&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ClassicMCPSearchResult`

Classic MCP Search Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ClassicMCPSearchResult } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface ClassicMCPSearchResult {
    title: string;
    url: string;
    snippet: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `snippet` | property | <code>snippet: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `title` | property | <code>title: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `url` | property | <code>url: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPCapabilityDescriptor`

MCP Capability Descriptor interface with 21 public fields or methods.

- Kind: interface
- Import: `import type { MCPCapabilityDescriptor } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface MCPCapabilityDescriptor extends VersionedSpec, SpecMetadata {
    serverId: string;
    capabilityId: string;
    type: 'tool' | 'resource' | 'prompt';
    inputSchema?: JsonSchema;
    outputSchema?: JsonSchema;
    sideEffectLevel?: SideEffectLevel;
    permissionScope?: string[];
    capabilityHash?: string;
    trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
    declarationSource?: 'framework' | 'user' | 'server' | 'unknown';
    annotations?: Record<string, unknown>;
    protocolVersion?: string;
    serverIdentity?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `annotations` | property | <code>annotations?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityHash` | property | <code>capabilityHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityId` | property | <code>capabilityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `declarationSource` | property | <code>declarationSource?: "unknown" &#124; "user" &#124; "framework" &#124; "server"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputSchema` | property | <code>inputSchema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputSchema` | property | <code>outputSchema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permissionScope` | property | <code>permissionScope?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `protocolVersion` | property | <code>protocolVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverIdentity` | property | <code>serverIdentity?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel?: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trustLevel` | property | <code>trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "tool" &#124; "prompt" &#124; "resource"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPGateway`

MCP Gateway interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MCPGateway } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface MCPGateway {
    discover(integration: MCPIntegrationSpec): Promise<MCPCapabilityDescriptor[]>;
    normalize(capability: MCPCapabilityDescriptor): Promise<NormalizedMCPCapability>;
    call(request: MCPToolCallRequest): Promise<unknown>;
    /** @deprecated Use call(). Kept for adapters migrating from the classic gateway contract. */
    callTool?(request: MCPToolCallRequest): Promise<unknown>;
    readResource?(request: MCPResourceReadRequest): Promise<MCPResourceResult>;
    getPrompt?(request: MCPPromptRequest): Promise<MCPPromptResult>;
    health(serverId?: string): Promise<Record<string, import('@codesoul-co/hypha-tools').ProviderHealth>>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `call` | method | <code>call(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `callTool` | method | <code>callTool?(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `discover` | method | <code>discover(integration: MCPIntegrationSpec): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getPrompt` | method | <code>getPrompt?(request: MCPPromptRequest): Promise&lt;MCPPromptResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(serverId?: string): Promise&lt;Record&lt;string, import("@codesoul-co/hypha-tools").ProviderHealth&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `normalize` | method | <code>normalize(capability: MCPCapabilityDescriptor): Promise&lt;NormalizedMCPCapability&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `readResource` | method | <code>readResource?(request: MCPResourceReadRequest): Promise&lt;MCPResourceResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MCPGatewayToolRegistrationContext`

MCP Gateway Tool Registration Context interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MCPGatewayToolRegistrationContext } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface MCPGatewayToolRegistrationContext {
    runId: string;
    stepId?: string;
    sessionId?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPGatewayToolRegistrationOptions`

MCP Gateway Tool Registration Options interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MCPGatewayToolRegistrationOptions } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface MCPGatewayToolRegistrationOptions {
    integration: MCPIntegrationSpec;
    gateway: MCPGateway;
    registry: ToolRegistry;
    trace?: TraceRecorder;
    traceContext?: MCPGatewayToolRegistrationContext;
    baselineStore?: MCPCapabilityBaselineStore;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baselineStore` | property | <code>baselineStore?: MCPCapabilityBaselineStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `gateway` | property | <code>gateway: MCPGateway</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `integration` | property | <code>integration: MCPIntegrationSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `registry` | property | <code>registry: ToolRegistry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trace` | property | <code>trace?: TraceRecorder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceContext` | property | <code>traceContext?: MCPGatewayToolRegistrationContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPGatewayToolRegistrationResult`

MCP Gateway Tool Registration Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MCPGatewayToolRegistrationResult } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface MCPGatewayToolRegistrationResult {
    discoveredCapabilities: MCPCapabilityDescriptor[];
    normalizedCapabilities: NormalizedMCPCapability[];
    registeredTools: ToolSpec[];
    quarantinedCapabilities: MCPCapabilityDescriptor[];
    driftRecords: MCPDriftRecord[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `discoveredCapabilities` | property | <code>discoveredCapabilities: MCPCapabilityDescriptor[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `driftRecords` | property | <code>driftRecords: MCPDriftRecord[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `normalizedCapabilities` | property | <code>normalizedCapabilities: NormalizedMCPCapability[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `quarantinedCapabilities` | property | <code>quarantinedCapabilities: MCPCapabilityDescriptor[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `registeredTools` | property | <code>registeredTools: ToolSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPIntegrationSpec`

MCP Integration Spec interface with 13 public fields or methods.

- Kind: interface
- Import: `import type { MCPIntegrationSpec } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface MCPIntegrationSpec {
    id: string;
    version: string;
    servers: MCPServerSpec[];
    allowedCapabilities?: string[];
    deniedCapabilities?: string[];
    trustPolicy?: string;
    importPolicy?: string;
    resourcePolicy?: string;
    toolPolicy?: string;
    promptPolicy?: string;
    versionPinning?: boolean;
    capabilityHashing?: boolean;
    driftPolicy?: MCPDriftPolicy;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedCapabilities` | property | <code>allowedCapabilities?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityHashing` | property | <code>capabilityHashing?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deniedCapabilities` | property | <code>deniedCapabilities?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `driftPolicy` | property | <code>driftPolicy?: MCPDriftPolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `importPolicy` | property | <code>importPolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptPolicy` | property | <code>promptPolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourcePolicy` | property | <code>resourcePolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `servers` | property | <code>servers: MCPServerSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolPolicy` | property | <code>toolPolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trustPolicy` | property | <code>trustPolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionPinning` | property | <code>versionPinning?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPPromptRequest`

MCP Prompt Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MCPPromptRequest } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface MCPPromptRequest {
    serverId: string;
    name: string;
    arguments?: Record<string, string>;
    context?: Partial<ToolCallContext>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `arguments` | property | <code>arguments?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `context` | property | <code>context?: Partial&lt;ToolCallContext&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPPromptResult`

MCP Prompt Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MCPPromptResult } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface MCPPromptResult {
    description?: string;
    messages: unknown[];
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messages` | property | <code>messages: unknown[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPResourceReadRequest`

MCP Resource Read Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MCPResourceReadRequest } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface MCPResourceReadRequest {
    serverId: string;
    uri: string;
    context?: Partial<ToolCallContext>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context?: Partial&lt;ToolCallContext&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `uri` | property | <code>uri: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPResourceResult`

MCP Resource Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MCPResourceResult } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface MCPResourceResult {
    contents: Array<{
        uri: string;
        mimeType?: string;
        text?: string;
        blob?: string;
        metadata?: Record<string, unknown>;
    }>;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contents` | property | <code>contents: { uri: string; mimeType?: string; text?: string; blob?: string; metadata?: Record&lt;string, unknown&gt;; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPServerSpec`

MCP Server Spec interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MCPServerSpec } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface MCPServerSpec {
    id: string;
    mode: 'local' | 'remote';
    version?: string;
    endpoint?: string;
    command?: string;
    args?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `args` | property | <code>args?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `command` | property | <code>command?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `endpoint` | property | <code>endpoint?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "local" &#124; "remote"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPToolCallRequest`

MCP Tool Call Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MCPToolCallRequest } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface MCPToolCallRequest<TInput = unknown> {
    serverId: string;
    capabilityId: string;
    input: TInput;
    context: ToolCallContext;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityId` | property | <code>capabilityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `context` | property | <code>context: ToolCallContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `NormalizedMCPCapability`

Normalized MCP Capability interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { NormalizedMCPCapability } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export interface NormalizedMCPCapability {
    serverId: string;
    capabilityId: string;
    type: 'tool' | 'resource' | 'prompt';
    normalizedSpecId: string;
    capabilityHash?: string;
    sideEffectLevel?: SideEffectLevel;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityHash` | property | <code>capabilityHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityId` | property | <code>capabilityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `normalizedSpecId` | property | <code>normalizedSpecId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel?: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "tool" &#124; "prompt" &#124; "resource"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPToolHandler`

Public type alias for MCP Tool Handler; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MCPToolHandler } from '@codesoul-co/hypha-mcp';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### Declaration

```text
export type MCPToolHandler<TInput = unknown, TOutput = unknown> = (request: MCPToolCallRequest<TInput>) => Promise<TOutput> | TOutput;
```
