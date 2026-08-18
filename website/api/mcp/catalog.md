# `@codesoul-co/hypha-mcp` / `catalog`

- Package index: [`@codesoul-co/hypha-mcp`](/api/mcp)
- Source: [`packages/mcp/src/catalog.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)
- Exports: **24**

## Using this module

Use the Catalog module for registering and resolving versioned capabilities or implementations. It exports 6 classes, 4 constants, 1 function, 11 interfaces, 2 types.

### Import from the package entrypoint

```ts
import {
  InMemoryMCPCapabilityCatalogStore,
  InMemoryToolContractSnapshotStore,
  MCPCapabilityCatalog,
  MCPSchemaCache,
  RedisMCPCapabilityCatalogStore,
  RedisToolContractSnapshotStore,
  mcpCapabilityRecordDefinition,
  mcpCapabilityRecordExample,
} from '@codesoul-co/hypha-mcp';

import type {
  MCPCapabilityApprovalRequest,
  MCPCapabilityCatalogOptions,
  MCPCapabilityCatalogStore,
  MCPCapabilityListRequest,
  MCPCapabilityQuarantineRequest,
  MCPCapabilityRecord,
  MCPCapabilityRef,
  MCPCatalogSnapshot,
} from '@codesoul-co/hypha-mcp';

// The complete export list is documented below.
```

### Usage patterns

- Use the 13 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 6 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 4 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMCPCapabilityCatalogStore` | class | <code>new InMemoryMCPCapabilityCatalogStore(): InMemoryMCPCapabilityCatalogStore</code> | In Memory MCP Capability Catalog Store class with 3 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryToolContractSnapshotStore` | class | <code>new InMemoryToolContractSnapshotStore(): InMemoryToolContractSnapshotStore</code> | In Memory Tool Contract Snapshot Store class with 3 public constructor or member entries; its exact declarations are listed below. |
| `MCPCapabilityCatalog` | class | <code>new MCPCapabilityCatalog(options: MCPCapabilityCatalogOptions): MCPCapabilityCatalog</code> | MCP Capability Catalog class with 10 public constructor or member entries; its exact declarations are listed below. |
| `MCPSchemaCache` | class | <code>new MCPSchemaCache(options?: MCPSchemaCacheOptions): MCPSchemaCache</code> | MCP Schema Cache class with 5 public constructor or member entries; its exact declarations are listed below. |
| `RedisMCPCapabilityCatalogStore` | class | <code>new RedisMCPCapabilityCatalogStore(client: RedisLikeMCPStoreClient, namespace?: string): RedisMCPCapabilityCatalogStore</code> | Multi-worker catalog store. Redis key operations are idempotent per capability id. |
| `RedisToolContractSnapshotStore` | class | <code>new RedisToolContractSnapshotStore(client: Pick&lt;RedisLikeMCPStoreClient, "get" &#124; "set"&gt;, namespace?: string): RedisToolContractSnapshotStore</code> | Redis Tool Contract Snapshot Store class with 3 public constructor or member entries; its exact declarations are listed below. |
| `mcpCapabilityRecordDefinition` | constant | <code>const mcpCapabilityRecordDefinition: SpecSchemaDefinition&lt;MCPCapabilityRecord&gt;</code> | MCP Capability Record Definition constant exported by the `catalog` module. |
| `mcpCapabilityRecordExample` | constant | <code>const mcpCapabilityRecordExample: MCPCapabilityRecord</code> | Valid example value for MCP Capability Record. |
| `mcpCapabilityRecordJsonSchema` | constant | <code>const mcpCapabilityRecordJsonSchema: JsonSchema</code> | JSON Schema for MCP Capability Record. |
| `mcpCapabilityRecordSchema` | constant | <code>const mcpCapabilityRecordSchema: ZodType&lt;MCPCapabilityRecord, ZodTypeDef, MCPCapabilityRecord&gt;</code> | Runtime schema for MCP Capability Record. |
| `normalizeMCPToolOutput` | function | <code>normalizeMCPToolOutput(result: unknown): unknown</code> | MCP CallToolResult is a transport envelope. A declared Tool output schema applies to structuredContent, not to the protocol's content/isError fields. |
| `MCPCapabilityApprovalRequest` | interface | <code>interface MCPCapabilityApprovalRequest extends MCPCapabilityRef</code> | MCP Capability Approval Request interface with 8 public fields or methods. |
| `MCPCapabilityCatalogOptions` | interface | <code>interface MCPCapabilityCatalogOptions</code> | MCP Capability Catalog Options interface with 10 public fields or methods. |
| `MCPCapabilityCatalogStore` | interface | <code>interface MCPCapabilityCatalogStore</code> | MCP Capability Catalog Store interface with 2 public fields or methods. |
| `MCPCapabilityListRequest` | interface | <code>interface MCPCapabilityListRequest</code> | MCP Capability List Request interface with 9 public fields or methods. |
| `MCPCapabilityQuarantineRequest` | interface | <code>interface MCPCapabilityQuarantineRequest extends MCPCapabilityRef</code> | MCP Capability Quarantine Request interface with 5 public fields or methods. |
| `MCPCapabilityRecord` | interface | <code>interface MCPCapabilityRecord</code> | MCP Capability Record interface with 21 public fields or methods. |
| `MCPCapabilityRef` | interface | <code>interface MCPCapabilityRef</code> | MCP Capability Ref interface with 4 public fields or methods. |
| `MCPCatalogSnapshot` | interface | <code>interface MCPCatalogSnapshot</code> | MCP Catalog Snapshot interface with 7 public fields or methods. |
| `MCPSchemaCacheEntry` | interface | <code>interface MCPSchemaCacheEntry</code> | MCP Schema Cache Entry interface with 7 public fields or methods. |
| `MCPSchemaCacheOptions` | interface | <code>interface MCPSchemaCacheOptions</code> | MCP Schema Cache Options interface with 2 public fields or methods. |
| `RedisLikeMCPStoreClient` | interface | <code>interface RedisLikeMCPStoreClient</code> | Redis Like MCP Store Client interface with 5 public fields or methods. |
| `MCPCapabilityDriftType` | type | <code>type MCPCapabilityDriftType = 'description_changed' &#124; 'input_schema_changed' &#124; 'output_schema_changed' &#124; 'annotations_changed' &#124; 'capability_added' &#124; 'capability_removed' &#124; 'server_identity_changed' &#124; 'protocol_version_changed'</code> | Public type alias for MCP Capability Drift Type; the declaration contains its complete type expression. |
| `MCPCapabilityKind` | type | <code>type MCPCapabilityKind = 'tool' &#124; 'resource' &#124; 'prompt'</code> | Public type alias for MCP Capability Kind; the declaration contains its complete type expression. |

## `InMemoryMCPCapabilityCatalogStore`

In Memory MCP Capability Catalog Store class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryMCPCapabilityCatalogStore } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export declare class InMemoryMCPCapabilityCatalogStore implements MCPCapabilityCatalogStore {
    list(serverId?: string): Promise<MCPCapabilityRecord[]>;
    save(record: MCPCapabilityRecord, options?: {
            expected?: MCPCapabilityRecord | null;
        }): Promise<boolean>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryMCPCapabilityCatalogStore</code> | Creates an instance of this class. |
| `list` | method | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryToolContractSnapshotStore`

In Memory Tool Contract Snapshot Store class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryToolContractSnapshotStore } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export declare class InMemoryToolContractSnapshotStore implements ToolContractSnapshotStore {
    get(snapshotId: string): Promise<ToolContractSnapshot | null>;
    save(snapshot: ToolContractSnapshot): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryToolContractSnapshotStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MCPCapabilityCatalog`

MCP Capability Catalog class with 10 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MCPCapabilityCatalog } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export declare class MCPCapabilityCatalog {
    readonly snapshotStore: ToolContractSnapshotStore;
    constructor(options: MCPCapabilityCatalogOptions);
    bindConnectionManager(manager: MCPConnectionManager): () => void;
    refresh(serverId: string, reason?: string): Promise<MCPCatalogSnapshot>;
    getCapability(ref: MCPCapabilityRef): Promise<MCPCapabilityRecord | null>;
    list(request?: MCPCapabilityListRequest): Promise<MCPCapabilityRecord[]>;
    quarantine(request: MCPCapabilityQuarantineRequest): Promise<void>;
    approveRevision(request: MCPCapabilityApprovalRequest): Promise<void>;
    importTools(registry: ToolRegistry, refs: MCPCapabilityRef[], context?: Partial<ToolCallContext>): Promise<ToolSpec[]>;
    snapshot(runId: string, refs: MCPCapabilityRef[]): Promise<ToolContractSnapshot>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approveRevision` | method | <code>approveRevision(request: MCPCapabilityApprovalRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `bindConnectionManager` | method | <code>bindConnectionManager(manager: MCPConnectionManager): () =&gt; void</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: MCPCapabilityCatalogOptions): MCPCapabilityCatalog</code> | Creates an instance of this class. |
| `getCapability` | method | <code>getCapability(ref: MCPCapabilityRef): Promise&lt;MCPCapabilityRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `importTools` | method | <code>importTools(registry: ToolRegistry, refs: MCPCapabilityRef[], context?: Partial&lt;ToolCallContext&gt;): Promise&lt;ToolSpec[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request?: MCPCapabilityListRequest): Promise&lt;MCPCapabilityRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `quarantine` | method | <code>quarantine(request: MCPCapabilityQuarantineRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `refresh` | method | <code>refresh(serverId: string, reason?: string): Promise&lt;MCPCatalogSnapshot&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `snapshot` | method | <code>snapshot(runId: string, refs: MCPCapabilityRef[]): Promise&lt;ToolContractSnapshot&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `snapshotStore` | property | <code>readonly snapshotStore: ToolContractSnapshotStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPSchemaCache`

MCP Schema Cache class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MCPSchemaCache } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export declare class MCPSchemaCache {
    constructor(options?: MCPSchemaCacheOptions);
    get(ref: MCPCapabilityRef & {
            protocolVersion?: string;
        }): MCPSchemaCacheEntry | null;
    set(record: MCPCapabilityRecord): MCPSchemaCacheEntry;
    invalidate(serverId: string, capabilityId?: string): number;
    size(): number;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: MCPSchemaCacheOptions): MCPSchemaCache</code> | Creates an instance of this class. |
| `get` | method | <code>get(ref: MCPCapabilityRef &amp; { protocolVersion?: string; }): MCPSchemaCacheEntry &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `invalidate` | method | <code>invalidate(serverId: string, capabilityId?: string): number</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(record: MCPCapabilityRecord): MCPSchemaCacheEntry</code> | Public method; parameters and return type are shown in the signature. |
| `size` | method | <code>size(): number</code> | Public method; parameters and return type are shown in the signature. |

## `RedisMCPCapabilityCatalogStore`

Multi-worker catalog store. Redis key operations are idempotent per capability id.

- Kind: class
- Import: `import { RedisMCPCapabilityCatalogStore } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export declare class RedisMCPCapabilityCatalogStore implements MCPCapabilityCatalogStore {
    constructor(client: RedisLikeMCPStoreClient, namespace?: string);
    list(serverId?: string): Promise<MCPCapabilityRecord[]>;
    save(record: MCPCapabilityRecord, options?: {
            expected?: MCPCapabilityRecord | null;
        }): Promise<boolean>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(client: RedisLikeMCPStoreClient, namespace?: string): RedisMCPCapabilityCatalogStore</code> | Creates an instance of this class. |
| `list` | method | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RedisToolContractSnapshotStore`

Redis Tool Contract Snapshot Store class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RedisToolContractSnapshotStore } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export declare class RedisToolContractSnapshotStore implements ToolContractSnapshotStore {
    constructor(client: Pick<RedisLikeMCPStoreClient, 'get' | 'set'>, namespace?: string);
    get(snapshotId: string): Promise<ToolContractSnapshot | null>;
    save(snapshot: ToolContractSnapshot): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(client: Pick&lt;RedisLikeMCPStoreClient, "get" &#124; "set"&gt;, namespace?: string): RedisToolContractSnapshotStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `mcpCapabilityRecordDefinition`

MCP Capability Record Definition constant exported by the `catalog` module.

- Kind: constant
- Import: `import { mcpCapabilityRecordDefinition } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export declare const mcpCapabilityRecordDefinition: SpecSchemaDefinition<MCPCapabilityRecord>;
```

## `mcpCapabilityRecordExample`

Valid example value for MCP Capability Record.

- Kind: constant
- Import: `import { mcpCapabilityRecordExample } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export declare const mcpCapabilityRecordExample: MCPCapabilityRecord;
```

## `mcpCapabilityRecordJsonSchema`

JSON Schema for MCP Capability Record.

- Kind: constant
- Import: `import { mcpCapabilityRecordJsonSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export declare const mcpCapabilityRecordJsonSchema: JsonSchema;
```

## `mcpCapabilityRecordSchema`

Runtime schema for MCP Capability Record.

- Kind: constant
- Import: `import { mcpCapabilityRecordSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export declare const mcpCapabilityRecordSchema: ZodType<MCPCapabilityRecord, ZodTypeDef, MCPCapabilityRecord>;
```

## `normalizeMCPToolOutput`

MCP CallToolResult is a transport envelope. A declared Tool output schema applies to structuredContent, not to the protocol's content/isError fields.

- Kind: function
- Import: `import { normalizeMCPToolOutput } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export declare function normalizeMCPToolOutput(result: unknown): unknown;
```

### Call signature

```text
normalizeMCPToolOutput(result: unknown): unknown
```

MCP CallToolResult is a transport envelope. A declared Tool output schema applies to structuredContent, not to the protocol's content/isError fields.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `unknown`
- Description: The return contract is defined by the type shown above.

## `MCPCapabilityApprovalRequest`

MCP Capability Approval Request interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { MCPCapabilityApprovalRequest } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export interface MCPCapabilityApprovalRequest extends MCPCapabilityRef {
    approvedBy: string;
    expiresAt?: string;
    restrictions?: string[];
    sideEffectLevel?: SideEffectLevel;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvedBy` | property | <code>approvedBy: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityHash` | property | <code>capabilityHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityId` | property | <code>capabilityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind?: MCPCapabilityKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `restrictions` | property | <code>restrictions?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel?: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPCapabilityCatalogOptions`

MCP Capability Catalog Options interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { MCPCapabilityCatalogOptions } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export interface MCPCapabilityCatalogOptions {
    integration: MCPIntegrationSpec;
    gateway: MCPGateway;
    trustPolicy: MCPTrustPolicySpec;
    driftPolicy: MCPCapabilityDriftPolicySpec;
    store?: MCPCapabilityCatalogStore;
    schemaCache?: MCPSchemaCache;
    snapshotStore?: ToolContractSnapshotStore;
    now?: () => string;
    onEvent?: (type: string, payload: Record<string, unknown>) => Promise<void> | void;
    telemetry?: TelemetryRecorder;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `driftPolicy` | property | <code>driftPolicy: MCPCapabilityDriftPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `gateway` | property | <code>gateway: MCPGateway</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `integration` | property | <code>integration: MCPIntegrationSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `onEvent` | method | <code>onEvent?(type: string, payload: Record&lt;string, unknown&gt;): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `schemaCache` | property | <code>schemaCache?: MCPSchemaCache</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotStore` | property | <code>snapshotStore?: ToolContractSnapshotStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `store` | property | <code>store?: MCPCapabilityCatalogStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `telemetry` | property | <code>telemetry?: TelemetryRecorder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trustPolicy` | property | <code>trustPolicy: MCPTrustPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPCapabilityCatalogStore`

MCP Capability Catalog Store interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MCPCapabilityCatalogStore } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export interface MCPCapabilityCatalogStore {
    list(serverId?: string): Promise<MCPCapabilityRecord[]>;
    save(record: MCPCapabilityRecord, options?: {
        expected?: MCPCapabilityRecord | null;
    }): Promise<boolean>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `list` | method | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MCPCapabilityListRequest`

MCP Capability List Request interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { MCPCapabilityListRequest } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export interface MCPCapabilityListRequest {
    serverId?: string;
    kind?: MCPCapabilityKind;
    states?: MCPCapabilityRecord['driftState'][];
    permissionScopes?: string[];
    tags?: string[];
    query?: string;
    loadDescriptors?: boolean;
    schemaTokenBudget?: number;
    limit?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kind` | property | <code>kind?: MCPCapabilityKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `limit` | property | <code>limit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `loadDescriptors` | property | <code>loadDescriptors?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permissionScopes` | property | <code>permissionScopes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `query` | property | <code>query?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaTokenBudget` | property | <code>schemaTokenBudget?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `states` | property | <code>states?: ("quarantined" &#124; "approved" &#124; "changed" &#124; "removed" &#124; "stable" &#124; "new")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPCapabilityQuarantineRequest`

MCP Capability Quarantine Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MCPCapabilityQuarantineRequest } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export interface MCPCapabilityQuarantineRequest extends MCPCapabilityRef {
    reason: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityHash` | property | <code>capabilityHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityId` | property | <code>capabilityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind?: MCPCapabilityKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPCapabilityRecord`

MCP Capability Record interface with 21 public fields or methods.

- Kind: interface
- Import: `import type { MCPCapabilityRecord } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export interface MCPCapabilityRecord {
    id: string;
    serverId: string;
    kind: MCPCapabilityKind;
    remoteName: string;
    stableToolId?: string;
    protocolVersion?: string;
    capabilityVersion?: string;
    capabilityHash: string;
    schemaHash?: string;
    descriptorHash: string;
    descriptor: Record<string, unknown>;
    normalizedToolSpec?: ToolSpec;
    trust: MCPCapabilityTrustRecord;
    driftState: 'stable' | 'new' | 'changed' | 'removed' | 'quarantined' | 'approved';
    driftTypes?: MCPCapabilityDriftType[];
    firstSeenAt: string;
    lastSeenAt: string;
    approvedAt?: string;
    approvalExpiresAt?: string;
    removedAt?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalExpiresAt` | property | <code>approvalExpiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `approvedAt` | property | <code>approvedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityHash` | property | <code>capabilityHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityVersion` | property | <code>capabilityVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `descriptor` | property | <code>descriptor: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `descriptorHash` | property | <code>descriptorHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `driftState` | property | <code>driftState: "quarantined" &#124; "approved" &#124; "changed" &#124; "removed" &#124; "stable" &#124; "new"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `driftTypes` | property | <code>driftTypes?: MCPCapabilityDriftType[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `firstSeenAt` | property | <code>firstSeenAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: MCPCapabilityKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastSeenAt` | property | <code>lastSeenAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `normalizedToolSpec` | property | <code>normalizedToolSpec?: ToolSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `protocolVersion` | property | <code>protocolVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `remoteName` | property | <code>remoteName: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `removedAt` | property | <code>removedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaHash` | property | <code>schemaHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stableToolId` | property | <code>stableToolId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trust` | property | <code>trust: MCPCapabilityTrustRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPCapabilityRef`

MCP Capability Ref interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MCPCapabilityRef } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export interface MCPCapabilityRef {
    serverId: string;
    capabilityId: string;
    kind?: MCPCapabilityKind;
    capabilityHash?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityHash` | property | <code>capabilityHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityId` | property | <code>capabilityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind?: MCPCapabilityKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPCatalogSnapshot`

MCP Catalog Snapshot interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MCPCatalogSnapshot } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export interface MCPCatalogSnapshot {
    id: string;
    serverId: string;
    revision: string;
    createdAt: string;
    reason?: string;
    capabilities: MCPCapabilityRecord[];
    drift: Array<{
        capabilityId: string;
        previousHash?: string;
        currentHash?: string;
        types: MCPCapabilityDriftType[];
    }>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: MCPCapabilityRecord[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `drift` | property | <code>drift: { capabilityId: string; previousHash?: string; currentHash?: string; types: MCPCapabilityDriftType[]; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPSchemaCacheEntry`

MCP Schema Cache Entry interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MCPSchemaCacheEntry } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export interface MCPSchemaCacheEntry {
    key: string;
    serverId: string;
    capabilityId: string;
    capabilityHash: string;
    protocolVersion?: string;
    schema?: JsonSchema;
    cachedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cachedAt` | property | <code>cachedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityHash` | property | <code>capabilityHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityId` | property | <code>capabilityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `protocolVersion` | property | <code>protocolVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schema` | property | <code>schema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPSchemaCacheOptions`

MCP Schema Cache Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MCPSchemaCacheOptions } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export interface MCPSchemaCacheOptions {
    maxEntries?: number;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxEntries` | property | <code>maxEntries?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |

## `RedisLikeMCPStoreClient`

Redis Like MCP Store Client interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RedisLikeMCPStoreClient } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export interface RedisLikeMCPStoreClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<unknown>;
    sadd(key: string, ...members: string[]): Promise<number>;
    smembers(key: string): Promise<string[]>;
    eval?(script: string, numberOfKeys: number, ...args: Array<string | number>): Promise<number | string | null>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eval` | method | <code>eval?(script: string, numberOfKeys: number, ...args: Array&lt;string &#124; number&gt;): Promise&lt;number &#124; string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `sadd` | method | <code>sadd(key: string, ...members: string[]): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, value: string): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `smembers` | method | <code>smembers(key: string): Promise&lt;string[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MCPCapabilityDriftType`

Public type alias for MCP Capability Drift Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MCPCapabilityDriftType } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export type MCPCapabilityDriftType = 'description_changed' | 'input_schema_changed' | 'output_schema_changed' | 'annotations_changed' | 'capability_added' | 'capability_removed' | 'server_identity_changed' | 'protocol_version_changed';
```

## `MCPCapabilityKind`

Public type alias for MCP Capability Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MCPCapabilityKind } from '@codesoul-co/hypha-mcp';`
- Source module: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### Declaration

```text
export type MCPCapabilityKind = 'tool' | 'resource' | 'prompt';
```
