# `@codesoul-co/hypha-mcp` / `contracts`

- Package index: [`@codesoul-co/hypha-mcp`](/api/mcp)
- Source: [`packages/mcp/src/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)
- Exports: **25**

## Using this module

Use the Contracts module for declaring and runtime-validating contracts. It exports 14 constants, 9 interfaces, 2 types.

### Import from the package entrypoint

```ts
import {
  governedMCPIntegrationDefinition,
  governedMCPIntegrationExample,
  governedMCPIntegrationJsonSchema,
  governedMCPIntegrationJsonSchemas,
  governedMCPIntegrationSpecSchema,
  mcpCapabilityDriftPolicySpecSchema,
  mcpServerProfileSchema,
  mcpTransportSpecSchema,
} from '@codesoul-co/hypha-mcp';

import type {
  GovernedMCPIntegrationSpec,
  MCPAllowDenyRule,
  MCPCapabilityDriftPolicySpec,
  MCPCapabilityTrustRecord,
  MCPContractSnapshotPolicySpec,
  MCPImportPolicySpec,
  MCPServerProfile,
  MCPTrustPolicySpec,
} from '@codesoul-co/hypha-mcp';

// The complete export list is documented below.
```

### Usage patterns

- Use the 11 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 14 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { governedMCPIntegrationSpecSchema } from '@codesoul-co/hypha-mcp';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = governedMCPIntegrationSpecSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `governedMCPIntegrationDefinition` | constant | <code>const governedMCPIntegrationDefinition: SpecSchemaDefinition&lt;GovernedMCPIntegrationSpec&gt;</code> | Governed MCP Integration Definition constant exported by the `contracts` module. |
| `governedMCPIntegrationExample` | constant | <code>const governedMCPIntegrationExample: GovernedMCPIntegrationSpec</code> | Valid example value for Governed MCP Integration. |
| `governedMCPIntegrationJsonSchema` | constant | <code>const governedMCPIntegrationJsonSchema: JsonSchema</code> | JSON Schema for Governed MCP Integration. |
| `governedMCPIntegrationJsonSchemas` | constant | <code>const governedMCPIntegrationJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Governed MCP Integration JSON Schemas constant exported by the `contracts` module. |
| `governedMCPIntegrationSpecSchema` | constant | <code>const governedMCPIntegrationSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; servers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; displayName: z.ZodOptional&lt;z.ZodString&gt;; mode: z.ZodEnum&lt;["fixture", "local", "remote"]&gt;; transport: z.ZodType&lt;MCPTransport...</code> | Runtime schema for Governed MCP Integration Spec. |
| `mcpCapabilityDriftPolicySpecSchema` | constant | <code>const mcpCapabilityDriftPolicySpecSchema: z.ZodObject&lt;{ onDescriptionChange: z.ZodEnum&lt;["accept", "snapshot_next_run", "quarantine"]&gt;; onSchemaChange: z.ZodEnum&lt;["snapshot_next_run", "quarantine", "require_approval"]&gt;; onRemoval: z.ZodEnum&lt;["mark_unavailable", "allow_existing_run", "fail_existing_run"]&gt;; onServerIdentityChange: z.ZodEnum&lt;["disconnect", "quarantine"]&gt;; notifyRuntime: z.ZodOptional&lt;z.ZodBoolean&gt;; in...</code> | Runtime schema for MCP Capability Drift Policy Spec. |
| `mcpServerProfileSchema` | constant | <code>const mcpServerProfileSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; displayName: z.ZodOptional&lt;z.ZodString&gt;; mode: z.ZodEnum&lt;["fixture", "local", "remote"]&gt;; transport: z.ZodType&lt;MCPTransportSpec, z.ZodTypeDef, MCPTransportSpec&gt;; authRef: z.ZodOptional&lt;z.ZodString&gt;; environmentRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; workingDirectoryRef: z.ZodOptional&lt;z.ZodString&gt;; autoCo...</code> | Runtime schema for MCP Server Profile. |
| `mcpTransportSpecSchema` | constant | <code>const mcpTransportSpecSchema: z.ZodType&lt;MCPTransportSpec, z.ZodTypeDef, MCPTransportSpec&gt;</code> | Runtime schema for MCP Transport Spec. |
| `mcpTrustPolicySpecSchema` | constant | <code>const mcpTrustPolicySpecSchema: z.ZodObject&lt;{ defaultTrustLevel: z.ZodEnum&lt;["untrusted", "restricted", "trusted"]&gt;; trustedSourceRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; requireAdminApprovalForNewServer: z.ZodOptional&lt;z.ZodBoolean&gt;; requireApprovalForNewCapability: z.ZodOptional&lt;z.ZodBoolean&gt;; requireApprovalForSchemaChange: z.ZodOptional&lt;z.ZodBoolean&gt;; allowServerDeclaredSideEffectHints: z.ZodOptiona...</code> | Runtime schema for MCP Trust Policy Spec. |
| `NORMALIZED_MCP_ERROR_CODES` | constant | <code>const NORMALIZED_MCP_ERROR_CODES: readonly ["MCP_SERVER_NOT_FOUND", "MCP_CONNECTION_FAILED", "MCP_INITIALIZATION_FAILED", "MCP_PROTOCOL_MISMATCH", "MCP_REQUEST_TIMEOUT", "MCP_REQUEST_CANCELLED", "MCP_CAPABILITY_NOT_FOUND", "MCP_CAPABILITY_QUARANTINED", "MCP_CAPABILITY_DRIFT", "MCP_SCHEMA_INVALID", "MCP_AUTH_FAILED", "MCP_BULKHEAD_REJECTED", "MCP_RATE_LIMITED", "MCP_CIRCUIT_OPEN", "MCP_EGRESS_DENIED", "MCP_CONTENT_...</code> | NORMALIZED MCP ERROR CODES constant exported by the `contracts` module. |
| `normalizedMCPErrorDefinition` | constant | <code>const normalizedMCPErrorDefinition: SpecSchemaDefinition&lt;NormalizedMCPError&gt;</code> | Normalized MCP Error Definition constant exported by the `contracts` module. |
| `normalizedMCPErrorExample` | constant | <code>const normalizedMCPErrorExample: NormalizedMCPError</code> | Valid example value for Normalized MCP Error. |
| `normalizedMCPErrorJsonSchema` | constant | <code>const normalizedMCPErrorJsonSchema: JsonSchema</code> | JSON Schema for Normalized MCP Error. |
| `normalizedMCPErrorSchema` | constant | <code>const normalizedMCPErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["MCP_SERVER_NOT_FOUND", "MCP_CONNECTION_FAILED", "MCP_INITIALIZATION_FAILED", "MCP_PROTOCOL_MISMATCH", "MCP_REQUEST_TIMEOUT", "MCP_REQUEST_CANCELLED", "MCP_CAPABILITY_NOT_FOUND", "MCP_CAPABILITY_QUARANTINED", "MCP_CAPABILITY_DRIFT", "MCP_SCHEMA_INVALID", "MCP_AUTH_FAILED", "MCP_BULKHEAD_REJECTED", "MCP_RATE_LIMITED", "MCP_CIRCUIT_OPEN", "MCP_EGRESS_DEN...</code> | Runtime schema for Normalized MCP Error. |
| `GovernedMCPIntegrationSpec` | interface | <code>interface GovernedMCPIntegrationSpec</code> | Governed MCP Integration Spec interface with 16 public fields or methods. |
| `MCPAllowDenyRule` | interface | <code>interface MCPAllowDenyRule</code> | MCP Allow Deny Rule interface with 4 public fields or methods. |
| `MCPCapabilityDriftPolicySpec` | interface | <code>interface MCPCapabilityDriftPolicySpec</code> | MCP Capability Drift Policy Spec interface with 6 public fields or methods. |
| `MCPCapabilityTrustRecord` | interface | <code>interface MCPCapabilityTrustRecord</code> | MCP Capability Trust Record interface with 7 public fields or methods. |
| `MCPContractSnapshotPolicySpec` | interface | <code>interface MCPContractSnapshotPolicySpec</code> | MCP Contract Snapshot Policy Spec interface with 3 public fields or methods. |
| `MCPImportPolicySpec` | interface | <code>interface MCPImportPolicySpec</code> | MCP Import Policy Spec interface with 4 public fields or methods. |
| `MCPServerProfile` | interface | <code>interface MCPServerProfile</code> | MCP Server Profile interface with 22 public fields or methods. |
| `MCPTrustPolicySpec` | interface | <code>interface MCPTrustPolicySpec</code> | MCP Trust Policy Spec interface with 9 public fields or methods. |
| `NormalizedMCPError` | interface | <code>interface NormalizedMCPError</code> | Normalized MCP Error interface with 7 public fields or methods. |
| `MCPTransportSpec` | type | <code>type MCPTransportSpec = { type: 'stdio'; command: string; args?: string[]; envAllowList?: string[]; stderrMode?: 'inherit' &#124; 'capture' &#124; 'artifact'; } &#124; { type: 'streamable_http'; endpoint: string; headersRef?: string; authorizationRef?: string; sessionMode?: 'protocol_default' &#124; 'stateless'; } &#124; { type: 'custom'; adapterRef: string; config?: Record&lt;string, unknown&gt;; }</code> | Public type alias for MCP Transport Spec; the declaration contains its complete type expression. |
| `NormalizedMCPErrorCode` | type | <code>type NormalizedMCPErrorCode = (typeof NORMALIZED_MCP_ERROR_CODES)[number]</code> | Public type alias for Normalized MCP Error Code; the declaration contains its complete type expression. |

## `governedMCPIntegrationDefinition`

Governed MCP Integration Definition constant exported by the `contracts` module.

- Kind: constant
- Import: `import { governedMCPIntegrationDefinition } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export declare const governedMCPIntegrationDefinition: SpecSchemaDefinition<GovernedMCPIntegrationSpec>;
```

## `governedMCPIntegrationExample`

Valid example value for Governed MCP Integration.

- Kind: constant
- Import: `import { governedMCPIntegrationExample } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export declare const governedMCPIntegrationExample: GovernedMCPIntegrationSpec;
```

## `governedMCPIntegrationJsonSchema`

JSON Schema for Governed MCP Integration.

- Kind: constant
- Import: `import { governedMCPIntegrationJsonSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export declare const governedMCPIntegrationJsonSchema: JsonSchema;
```

## `governedMCPIntegrationJsonSchemas`

Governed MCP Integration JSON Schemas constant exported by the `contracts` module.

- Kind: constant
- Import: `import { governedMCPIntegrationJsonSchemas } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export declare const governedMCPIntegrationJsonSchemas: Record<string, JsonSchema>;
```

## `governedMCPIntegrationSpecSchema`

Runtime schema for Governed MCP Integration Spec.

- Kind: constant
- Import: `import { governedMCPIntegrationSpecSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const governedMCPIntegrationSpecSchema: (typeof import('@codesoul-co/hypha-mcp'))['governedMCPIntegrationSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `mcpCapabilityDriftPolicySpecSchema`

Runtime schema for MCP Capability Drift Policy Spec.

- Kind: constant
- Import: `import { mcpCapabilityDriftPolicySpecSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export declare const mcpCapabilityDriftPolicySpecSchema: z.ZodObject<{ onDescriptionChange: z.ZodEnum<["accept", "snapshot_next_run", "quarantine"]>; onSchemaChange: z.ZodEnum<["snapshot_next_run", "quarantine", "require_approval"]>; onRemoval: z.ZodEnum<["mark_unavailable", "allow_existing_run", "fail_existing_run"]>; onServerIdentityChange: z.ZodEnum<["disconnect", "quarantine"]>; notifyRuntime: z.ZodOptional<z.ZodBoolean>; invalidateSchemaCache: z.ZodOptional<z.ZodBoolean>; }, "strip", z.ZodTypeAny, { onDescriptionChange: "quarantine" | "accept" | "snapshot_next_run"; onSchemaChange: "quarantine" | "snapshot_next_run" | "require_approval"; onRemoval: "mark_unavailable" | "allow_existing_run" | "fail_existing_run"; onServerIdentityChange: "quarantine" | "disconnect"; notifyRuntime?: boolean | undefined; invalidateSchemaCache?: boolean | undefined; }, { onDescriptionChange: "quarantine" | "accept" | "snapshot_next_run"; onSchemaChange: "quarantine" | "snapshot_next_run" | "require_approval"; onRemoval: "mark_unavailable" | "allow_existing_run" | "fail_existing_run"; onServerIdentityChange: "quarantine" | "disconnect"; notifyRuntime?: boolean | undefined; invalidateSchemaCache?: boolean | undefined; }>;
```

## `mcpServerProfileSchema`

Runtime schema for MCP Server Profile.

- Kind: constant
- Import: `import { mcpServerProfileSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const mcpServerProfileSchema: (typeof import('@codesoul-co/hypha-mcp'))['mcpServerProfileSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `mcpTransportSpecSchema`

Runtime schema for MCP Transport Spec.

- Kind: constant
- Import: `import { mcpTransportSpecSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export declare const mcpTransportSpecSchema: z.ZodType<MCPTransportSpec, z.ZodTypeDef, MCPTransportSpec>;
```

## `mcpTrustPolicySpecSchema`

Runtime schema for MCP Trust Policy Spec.

- Kind: constant
- Import: `import { mcpTrustPolicySpecSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export declare const mcpTrustPolicySpecSchema: z.ZodObject<{ defaultTrustLevel: z.ZodEnum<["untrusted", "restricted", "trusted"]>; trustedSourceRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; requireAdminApprovalForNewServer: z.ZodOptional<z.ZodBoolean>; requireApprovalForNewCapability: z.ZodOptional<z.ZodBoolean>; requireApprovalForSchemaChange: z.ZodOptional<z.ZodBoolean>; allowServerDeclaredSideEffectHints: z.ZodOptional<z.ZodBoolean>; pinServerIdentity: z.ZodOptional<z.ZodBoolean>; pinProtocolVersion: z.ZodOptional<z.ZodBoolean>; pinCapabilityHashes: z.ZodOptional<z.ZodBoolean>; }, "strip", z.ZodTypeAny, { defaultTrustLevel: "trusted" | "untrusted" | "restricted"; trustedSourceRefs?: string[] | undefined; requireAdminApprovalForNewServer?: boolean | undefined; requireApprovalForNewCapability?: boolean | undefined; requireApprovalForSchemaChange?: boolean | undefined; allowServerDeclaredSideEffectHints?: boolean | undefined; pinServerIdentity?: boolean | undefined; pinProtocolVersion?: boolean | undefined; pinCapabilityHashes?: boolean | undefined; }, { defaultTrustLevel: "trusted" | "untrusted" | "restricted"; trustedSourceRefs?: string[] | undefined; requireAdminApprovalForNewServer?: boolean | undefined; requireApprovalForNewCapability?: boolean | undefined; requireApprovalForSchemaChange?: boolean | undefined; allowServerDeclaredSideEffectHints?: boolean | undefined; pinServerIdentity?: boolean | undefined; pinProtocolVersion?: boolean | undefined; pinCapabilityHashes?: boolean | undefined; }>;
```

## `NORMALIZED_MCP_ERROR_CODES`

NORMALIZED MCP ERROR CODES constant exported by the `contracts` module.

- Kind: constant
- Import: `import { NORMALIZED_MCP_ERROR_CODES } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export declare const NORMALIZED_MCP_ERROR_CODES: readonly ["MCP_SERVER_NOT_FOUND", "MCP_CONNECTION_FAILED", "MCP_INITIALIZATION_FAILED", "MCP_PROTOCOL_MISMATCH", "MCP_REQUEST_TIMEOUT", "MCP_REQUEST_CANCELLED", "MCP_CAPABILITY_NOT_FOUND", "MCP_CAPABILITY_QUARANTINED", "MCP_CAPABILITY_DRIFT", "MCP_SCHEMA_INVALID", "MCP_AUTH_FAILED", "MCP_BULKHEAD_REJECTED", "MCP_RATE_LIMITED", "MCP_CIRCUIT_OPEN", "MCP_EGRESS_DENIED", "MCP_CONTENT_TOO_LARGE", "MCP_REMOTE_ERROR", "MCP_TRANSPORT_CLOSED", "MCP_INTERNAL_ERROR"];
```

## `normalizedMCPErrorDefinition`

Normalized MCP Error Definition constant exported by the `contracts` module.

- Kind: constant
- Import: `import { normalizedMCPErrorDefinition } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export declare const normalizedMCPErrorDefinition: SpecSchemaDefinition<NormalizedMCPError>;
```

## `normalizedMCPErrorExample`

Valid example value for Normalized MCP Error.

- Kind: constant
- Import: `import { normalizedMCPErrorExample } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export declare const normalizedMCPErrorExample: NormalizedMCPError;
```

## `normalizedMCPErrorJsonSchema`

JSON Schema for Normalized MCP Error.

- Kind: constant
- Import: `import { normalizedMCPErrorJsonSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export declare const normalizedMCPErrorJsonSchema: JsonSchema;
```

## `normalizedMCPErrorSchema`

Runtime schema for Normalized MCP Error.

- Kind: constant
- Import: `import { normalizedMCPErrorSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export declare const normalizedMCPErrorSchema: z.ZodObject<{ code: z.ZodEnum<["MCP_SERVER_NOT_FOUND", "MCP_CONNECTION_FAILED", "MCP_INITIALIZATION_FAILED", "MCP_PROTOCOL_MISMATCH", "MCP_REQUEST_TIMEOUT", "MCP_REQUEST_CANCELLED", "MCP_CAPABILITY_NOT_FOUND", "MCP_CAPABILITY_QUARANTINED", "MCP_CAPABILITY_DRIFT", "MCP_SCHEMA_INVALID", "MCP_AUTH_FAILED", "MCP_BULKHEAD_REJECTED", "MCP_RATE_LIMITED", "MCP_CIRCUIT_OPEN", "MCP_EGRESS_DENIED", "MCP_CONTENT_TOO_LARGE", "MCP_REMOTE_ERROR", "MCP_TRANSPORT_CLOSED", "MCP_INTERNAL_ERROR"]>; message: z.ZodString; retryable: z.ZodBoolean; serverId: z.ZodOptional<z.ZodString>; capabilityId: z.ZodOptional<z.ZodString>; remoteCode: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>; details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { code: "MCP_SERVER_NOT_FOUND" | "MCP_CONNECTION_FAILED" | "MCP_INITIALIZATION_FAILED" | "MCP_PROTOCOL_MISMATCH" | "MCP_REQUEST_TIMEOUT" | "MCP_REQUEST_CANCELLED" | "MCP_CAPABILITY_NOT_FOUND" | "MCP_CAPABILITY_QUARANTINED" | "MCP_CAPABILITY_DRIFT" | "MCP_SCHEMA_INVALID" | "MCP_AUTH_FAILED" | "MCP_BULKHEAD_REJECTED" | "MCP_RATE_LIMITED" | "MCP_CIRCUIT_OPEN" | "MCP_EGRESS_DENIED" | "MCP_CONTENT_TOO_LARGE" | "MCP_REMOTE_ERROR" | "MCP_TRANSPORT_CLOSED" | "MCP_INTERNAL_ERROR"; message: string; retryable: boolean; serverId?: string | undefined; capabilityId?: string | undefined; remoteCode?: string | number | undefined; details?: Record<string, unknown> | undefined; }, { code: "MCP_SERVER_NOT_FOUND" | "MCP_CONNECTION_FAILED" | "MCP_INITIALIZATION_FAILED" | "MCP_PROTOCOL_MISMATCH" | "MCP_REQUEST_TIMEOUT" | "MCP_REQUEST_CANCELLED" | "MCP_CAPABILITY_NOT_FOUND" | "MCP_CAPABILITY_QUARANTINED" | "MCP_CAPABILITY_DRIFT" | "MCP_SCHEMA_INVALID" | "MCP_AUTH_FAILED" | "MCP_BULKHEAD_REJECTED" | "MCP_RATE_LIMITED" | "MCP_CIRCUIT_OPEN" | "MCP_EGRESS_DENIED" | "MCP_CONTENT_TOO_LARGE" | "MCP_REMOTE_ERROR" | "MCP_TRANSPORT_CLOSED" | "MCP_INTERNAL_ERROR"; message: string; retryable: boolean; serverId?: string | undefined; capabilityId?: string | undefined; remoteCode?: string | number | undefined; details?: Record<string, unknown> | undefined; }>;
```

## `GovernedMCPIntegrationSpec`

Governed MCP Integration Spec interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { GovernedMCPIntegrationSpec } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export interface GovernedMCPIntegrationSpec {
    id: string;
    version: string;
    revision?: string;
    name?: string;
    description?: string;
    servers: MCPServerProfile[];
    allowCapabilities?: MCPAllowDenyRule[];
    denyCapabilities?: MCPAllowDenyRule[];
    trustPolicy: MCPTrustPolicySpec;
    importPolicy: MCPImportPolicySpec;
    driftPolicy: MCPCapabilityDriftPolicySpec;
    snapshotPolicy: MCPContractSnapshotPolicySpec;
    toolPolicyRefs?: Array<{
        id: string;
        version?: string;
        revision?: string;
    }>;
    resourcePolicyRefs?: Array<{
        id: string;
        version?: string;
        revision?: string;
    }>;
    promptPolicyRefs?: Array<{
        id: string;
        version?: string;
        revision?: string;
    }>;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowCapabilities` | property | <code>allowCapabilities?: MCPAllowDenyRule[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `denyCapabilities` | property | <code>denyCapabilities?: MCPAllowDenyRule[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `driftPolicy` | property | <code>driftPolicy: MCPCapabilityDriftPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `importPolicy` | property | <code>importPolicy: MCPImportPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptPolicyRefs` | property | <code>promptPolicyRefs?: { id: string; version?: string; revision?: string; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourcePolicyRefs` | property | <code>resourcePolicyRefs?: { id: string; version?: string; revision?: string; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `servers` | property | <code>servers: MCPServerProfile[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotPolicy` | property | <code>snapshotPolicy: MCPContractSnapshotPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolPolicyRefs` | property | <code>toolPolicyRefs?: { id: string; version?: string; revision?: string; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trustPolicy` | property | <code>trustPolicy: MCPTrustPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPAllowDenyRule`

MCP Allow Deny Rule interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MCPAllowDenyRule } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export interface MCPAllowDenyRule {
    serverId?: string;
    capabilityId?: string;
    kind?: 'tool' | 'resource' | 'prompt';
    tags?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityId` | property | <code>capabilityId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind?: "tool" &#124; "prompt" &#124; "resource"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPCapabilityDriftPolicySpec`

MCP Capability Drift Policy Spec interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MCPCapabilityDriftPolicySpec } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export interface MCPCapabilityDriftPolicySpec {
    onDescriptionChange: 'accept' | 'snapshot_next_run' | 'quarantine';
    onSchemaChange: 'snapshot_next_run' | 'quarantine' | 'require_approval';
    onRemoval: 'mark_unavailable' | 'allow_existing_run' | 'fail_existing_run';
    onServerIdentityChange: 'disconnect' | 'quarantine';
    notifyRuntime?: boolean;
    invalidateSchemaCache?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `invalidateSchemaCache` | property | <code>invalidateSchemaCache?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `notifyRuntime` | property | <code>notifyRuntime?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `onDescriptionChange` | property | <code>onDescriptionChange: "quarantine" &#124; "accept" &#124; "snapshot_next_run"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `onRemoval` | property | <code>onRemoval: "mark_unavailable" &#124; "allow_existing_run" &#124; "fail_existing_run"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `onSchemaChange` | property | <code>onSchemaChange: "quarantine" &#124; "snapshot_next_run" &#124; "require_approval"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `onServerIdentityChange` | property | <code>onServerIdentityChange: "quarantine" &#124; "disconnect"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPCapabilityTrustRecord`

MCP Capability Trust Record interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MCPCapabilityTrustRecord } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export interface MCPCapabilityTrustRecord {
    level: 'untrusted' | 'restricted' | 'trusted';
    source: 'admin' | 'domain_pack' | 'runtime_discovery' | 'signed_manifest' | 'import';
    sourceRef?: string;
    approvedBy?: string;
    approvedAt?: string;
    restrictions?: string[];
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvedAt` | property | <code>approvedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `approvedBy` | property | <code>approvedBy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `level` | property | <code>level: "trusted" &#124; "untrusted" &#124; "restricted"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `restrictions` | property | <code>restrictions?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: "import" &#124; "admin" &#124; "domain_pack" &#124; "runtime_discovery" &#124; "signed_manifest"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceRef` | property | <code>sourceRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPContractSnapshotPolicySpec`

MCP Contract Snapshot Policy Spec interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MCPContractSnapshotPolicySpec } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export interface MCPContractSnapshotPolicySpec {
    mode: 'run' | 'state';
    preserveRemovedForExistingRuns?: boolean;
    requireApprovedRevision?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mode` | property | <code>mode: "run" &#124; "state"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preserveRemovedForExistingRuns` | property | <code>preserveRemovedForExistingRuns?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireApprovedRevision` | property | <code>requireApprovedRevision?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPImportPolicySpec`

MCP Import Policy Spec interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MCPImportPolicySpec } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export interface MCPImportPolicySpec {
    kinds: Array<'tool' | 'resource' | 'prompt'>;
    lazyLoad?: boolean;
    maxLoadedCapabilities?: number;
    schemaTokenBudget?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kinds` | property | <code>kinds: ("tool" &#124; "prompt" &#124; "resource")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lazyLoad` | property | <code>lazyLoad?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxLoadedCapabilities` | property | <code>maxLoadedCapabilities?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaTokenBudget` | property | <code>schemaTokenBudget?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPServerProfile`

MCP Server Profile interface with 22 public fields or methods.

- Kind: interface
- Import: `import type { MCPServerProfile } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export interface MCPServerProfile {
    id: string;
    version?: string;
    displayName?: string;
    mode: 'fixture' | 'local' | 'remote';
    transport: MCPTransportSpec;
    authRef?: string;
    environmentRefs?: string[];
    workingDirectoryRef?: string;
    autoConnect?: boolean;
    lazyConnect?: boolean;
    singleStart?: boolean;
    initializationTimeoutMs?: number;
    requestTimeoutMs?: number;
    shutdownTimeoutMs?: number;
    reconnectPolicy?: RetryPolicySpec;
    healthCheckPolicy?: {
        intervalMs?: number;
        timeoutMs?: number;
        unhealthyThreshold?: number;
    };
    expectedServerInfo?: Record<string, unknown>;
    protocolVersionPolicy?: {
        allowedVersions?: string[];
        preferLatest?: boolean;
        rejectUnknown?: boolean;
    };
    egressPolicy?: {
        allowedHosts?: string[];
        denyPrivateNetworks?: boolean;
        requireTls?: boolean;
        maxRedirects?: number;
        allowCrossOriginRedirects?: boolean;
    };
    requestGuardPolicy?: {
        maxConcurrentRequests?: number;
        rateLimit?: {
            maxRequests: number;
            windowMs: number;
        };
        circuitBreaker?: {
            failureThreshold: number;
            resetAfterMs: number;
        };
    };
    contentPolicy?: {
        maxToolResultBytes?: number;
        maxResourceBytes?: number;
        maxPromptBytes?: number;
        maxPromptTokens?: number;
        oversizeAction?: 'reject' | 'artifact';
    };
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authRef` | property | <code>authRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `autoConnect` | property | <code>autoConnect?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentPolicy` | property | <code>contentPolicy?: { maxToolResultBytes?: number; maxResourceBytes?: number; maxPromptBytes?: number; maxPromptTokens?: number; oversizeAction?: "reject" &#124; "artifact"; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `displayName` | property | <code>displayName?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `egressPolicy` | property | <code>egressPolicy?: { allowedHosts?: string[]; denyPrivateNetworks?: boolean; requireTls?: boolean; maxRedirects?: number; allowCrossOriginRedirects?: boolean; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentRefs` | property | <code>environmentRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedServerInfo` | property | <code>expectedServerInfo?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `healthCheckPolicy` | property | <code>healthCheckPolicy?: { intervalMs?: number; timeoutMs?: number; unhealthyThreshold?: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `initializationTimeoutMs` | property | <code>initializationTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lazyConnect` | property | <code>lazyConnect?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "local" &#124; "remote" &#124; "fixture"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `protocolVersionPolicy` | property | <code>protocolVersionPolicy?: { allowedVersions?: string[]; preferLatest?: boolean; rejectUnknown?: boolean; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconnectPolicy` | property | <code>reconnectPolicy?: RetryPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestGuardPolicy` | property | <code>requestGuardPolicy?: { maxConcurrentRequests?: number; rateLimit?: { maxRequests: number; windowMs: number; }; circuitBreaker?: { failureThreshold: number; resetAfterMs: number; }; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestTimeoutMs` | property | <code>requestTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `shutdownTimeoutMs` | property | <code>shutdownTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `singleStart` | property | <code>singleStart?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transport` | property | <code>transport: MCPTransportSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workingDirectoryRef` | property | <code>workingDirectoryRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPTrustPolicySpec`

MCP Trust Policy Spec interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { MCPTrustPolicySpec } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export interface MCPTrustPolicySpec {
    defaultTrustLevel: 'untrusted' | 'restricted' | 'trusted';
    trustedSourceRefs?: string[];
    requireAdminApprovalForNewServer?: boolean;
    requireApprovalForNewCapability?: boolean;
    requireApprovalForSchemaChange?: boolean;
    allowServerDeclaredSideEffectHints?: boolean;
    pinServerIdentity?: boolean;
    pinProtocolVersion?: boolean;
    pinCapabilityHashes?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowServerDeclaredSideEffectHints` | property | <code>allowServerDeclaredSideEffectHints?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultTrustLevel` | property | <code>defaultTrustLevel: "trusted" &#124; "untrusted" &#124; "restricted"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pinCapabilityHashes` | property | <code>pinCapabilityHashes?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pinProtocolVersion` | property | <code>pinProtocolVersion?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pinServerIdentity` | property | <code>pinServerIdentity?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireAdminApprovalForNewServer` | property | <code>requireAdminApprovalForNewServer?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireApprovalForNewCapability` | property | <code>requireApprovalForNewCapability?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireApprovalForSchemaChange` | property | <code>requireApprovalForSchemaChange?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trustedSourceRefs` | property | <code>trustedSourceRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `NormalizedMCPError`

Normalized MCP Error interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { NormalizedMCPError } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export interface NormalizedMCPError {
    code: NormalizedMCPErrorCode;
    message: string;
    retryable: boolean;
    serverId?: string;
    capabilityId?: string;
    remoteCode?: string | number;
    details?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityId` | property | <code>capabilityId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>code: "MCP_SERVER_NOT_FOUND" &#124; "MCP_CONNECTION_FAILED" &#124; "MCP_INITIALIZATION_FAILED" &#124; "MCP_PROTOCOL_MISMATCH" &#124; "MCP_REQUEST_TIMEOUT" &#124; "MCP_REQUEST_CANCELLED" &#124; "MCP_CAPABILITY_NOT_FOUND" &#124; "MCP_CAPABILITY_QUARANTINED" &#124; "MCP_CAPABILITY_DRIFT" &#124; "MCP_SCHEMA_INVALID" &#124; "MCP_AUTH_FAILED" &#124; "MCP_BULKHEAD_REJECTED" &#124; "MCP_RATE_LIMITED" &#124; "MCP_CIRCUIT_OPEN" &#124; "MCP_EGRESS_DENIED" &#124; "MCP_CONTENT_TOO_LARGE" &#124; "MCP_REMOT...</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `details` | property | <code>details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `remoteCode` | property | <code>remoteCode?: string &#124; number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>retryable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPTransportSpec`

Public type alias for MCP Transport Spec; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MCPTransportSpec } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export type MCPTransportSpec = {
    type: 'stdio';
    command: string;
    args?: string[];
    envAllowList?: string[];
    stderrMode?: 'inherit' | 'capture' | 'artifact';
} | {
    type: 'streamable_http';
    endpoint: string;
    headersRef?: string;
    authorizationRef?: string;
    sessionMode?: 'protocol_default' | 'stateless';
} | {
    type: 'custom';
    adapterRef: string;
    config?: Record<string, unknown>;
};
```

## `NormalizedMCPErrorCode`

Public type alias for Normalized MCP Error Code; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { NormalizedMCPErrorCode } from '@codesoul-co/hypha-mcp';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### Declaration

```text
export type NormalizedMCPErrorCode = (typeof NORMALIZED_MCP_ERROR_CODES)[number];
```
