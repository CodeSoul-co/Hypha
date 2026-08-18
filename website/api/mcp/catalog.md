# `@codesoul-co/hypha-mcp` / `catalog`

- Package index: [`@codesoul-co/hypha-mcp`](/api/mcp)
- Package guide: [learning and composition guide](/packages/mcp)
- Source: [`packages/mcp/src/catalog.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)
- Exports: **24**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMCPCapabilityCatalogStore` | class | <code>new InMemoryMCPCapabilityCatalogStore(): InMemoryMCPCapabilityCatalogStore</code> | Runtime implementation for In Memory MCP Capability Catalog Store; see its public constructor and members below. |
| `InMemoryToolContractSnapshotStore` | class | <code>new InMemoryToolContractSnapshotStore(): InMemoryToolContractSnapshotStore</code> | Runtime implementation for In Memory Tool Contract Snapshot Store; see its public constructor and members below. |
| `MCPCapabilityCatalog` | class | <code>new MCPCapabilityCatalog(options: MCPCapabilityCatalogOptions): MCPCapabilityCatalog</code> | Runtime implementation for MCP Capability Catalog; see its public constructor and members below. |
| `MCPSchemaCache` | class | <code>new MCPSchemaCache(options?: MCPSchemaCacheOptions): MCPSchemaCache</code> | Runtime implementation for MCP Schema Cache; see its public constructor and members below. |
| `RedisMCPCapabilityCatalogStore` | class | <code>new RedisMCPCapabilityCatalogStore(client: RedisLikeMCPStoreClient, namespace?: string): RedisMCPCapabilityCatalogStore</code> | Multi-worker catalog store. Redis key operations are idempotent per capability id. |
| `RedisToolContractSnapshotStore` | class | <code>new RedisToolContractSnapshotStore(client: Pick&lt;RedisLikeMCPStoreClient, "get" &#124; "set"&gt;, namespace?: string): RedisToolContractSnapshotStore</code> | Runtime implementation for Redis Tool Contract Snapshot Store; see its public constructor and members below. |
| `mcpCapabilityRecordDefinition` | constant | <code>const mcpCapabilityRecordDefinition: SpecSchemaDefinition&lt;MCPCapabilityRecord&gt;</code> | mcp Capability Record Definition constant exported by the `catalog` module. |
| `mcpCapabilityRecordExample` | constant | <code>const mcpCapabilityRecordExample: MCPCapabilityRecord</code> | Valid example value for mcp Capability Record. |
| `mcpCapabilityRecordJsonSchema` | constant | <code>const mcpCapabilityRecordJsonSchema: JsonSchema</code> | JSON Schema for mcp Capability Record. |
| `mcpCapabilityRecordSchema` | constant | <code>const mcpCapabilityRecordSchema: ZodType&lt;MCPCapabilityRecord, ZodTypeDef, MCPCapabilityRecord&gt;</code> | Runtime schema for mcp Capability Record. |
| `normalizeMCPToolOutput` | function | <code>normalizeMCPToolOutput(result: unknown): unknown</code> | MCP CallToolResult is a transport envelope. A declared Tool output schema applies to structuredContent, not to the protocol's content/isError fields. |
| `MCPCapabilityApprovalRequest` | interface | <code>interface MCPCapabilityApprovalRequest extends MCPCapabilityRef</code> | Field contract for MCP Capability Approval Request; see all contract members below. |
| `MCPCapabilityCatalogOptions` | interface | <code>interface MCPCapabilityCatalogOptions</code> | Field contract for MCP Capability Catalog Options; see all contract members below. |
| `MCPCapabilityCatalogStore` | interface | <code>interface MCPCapabilityCatalogStore</code> | Field contract for MCP Capability Catalog Store; see all contract members below. |
| `MCPCapabilityListRequest` | interface | <code>interface MCPCapabilityListRequest</code> | Field contract for MCP Capability List Request; see all contract members below. |
| `MCPCapabilityQuarantineRequest` | interface | <code>interface MCPCapabilityQuarantineRequest extends MCPCapabilityRef</code> | Field contract for MCP Capability Quarantine Request; see all contract members below. |
| `MCPCapabilityRecord` | interface | <code>interface MCPCapabilityRecord</code> | Field contract for MCP Capability Record; see all contract members below. |
| `MCPCapabilityRef` | interface | <code>interface MCPCapabilityRef</code> | Field contract for MCP Capability Ref; see all contract members below. |
| `MCPCatalogSnapshot` | interface | <code>interface MCPCatalogSnapshot</code> | Field contract for MCP Catalog Snapshot; see all contract members below. |
| `MCPSchemaCacheEntry` | interface | <code>interface MCPSchemaCacheEntry</code> | Field contract for MCP Schema Cache Entry; see all contract members below. |
| `MCPSchemaCacheOptions` | interface | <code>interface MCPSchemaCacheOptions</code> | Field contract for MCP Schema Cache Options; see all contract members below. |
| `RedisLikeMCPStoreClient` | interface | <code>interface RedisLikeMCPStoreClient</code> | Field contract for Redis Like MCP Store Client; see all contract members below. |
| `MCPCapabilityDriftType` | type | <code>type MCPCapabilityDriftType = 'description_changed' &#124; 'input_schema_changed' &#124; 'output_schema_changed' &#124; 'annotations_changed' &#124; 'capability_added' &#124; 'capability_removed' &#124; 'server_identity_changed' &#124; 'protocol_version_changed'</code> | Public type alias for MCP Capability Drift Type. |
| `MCPCapabilityKind` | type | <code>type MCPCapabilityKind = 'tool' &#124; 'resource' &#124; 'prompt'</code> | Public type alias for MCP Capability Kind. |

## `InMemoryMCPCapabilityCatalogStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryMCPCapabilityCatalogStore</code> | Creates an instance of this class. |
| `list` | method | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | Lists list at this module boundary. |
| `save` | method | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | Saves save at this module boundary. |

## `InMemoryToolContractSnapshotStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryToolContractSnapshotStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | Gets get at this module boundary. |
| `save` | method | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | Saves save at this module boundary. |

## `MCPCapabilityCatalog` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approveRevision` | method | <code>approveRevision(request: MCPCapabilityApprovalRequest): Promise&lt;void&gt;</code> | Public runtime operation for approve Revision. |
| `bindConnectionManager` | method | <code>bindConnectionManager(manager: MCPConnectionManager): () =&gt; void</code> | Public runtime operation for bind Connection Manager. |
| `constructor` | constructor | <code>(options: MCPCapabilityCatalogOptions): MCPCapabilityCatalog</code> | Creates an instance of this class. |
| `getCapability` | method | <code>getCapability(ref: MCPCapabilityRef): Promise&lt;MCPCapabilityRecord &#124; null&gt;</code> | Gets Capability at this module boundary. |
| `importTools` | method | <code>importTools(registry: ToolRegistry, refs: MCPCapabilityRef[], context?: Partial&lt;ToolCallContext&gt;): Promise&lt;ToolSpec[]&gt;</code> | Public runtime operation for import Tools. |
| `list` | method | <code>list(request?: MCPCapabilityListRequest): Promise&lt;MCPCapabilityRecord[]&gt;</code> | Lists list at this module boundary. |
| `quarantine` | method | <code>quarantine(request: MCPCapabilityQuarantineRequest): Promise&lt;void&gt;</code> | Public runtime operation for quarantine. |
| `refresh` | method | <code>refresh(serverId: string, reason?: string): Promise&lt;MCPCatalogSnapshot&gt;</code> | Public runtime operation for refresh. |
| `snapshot` | method | <code>snapshot(runId: string, refs: MCPCapabilityRef[]): Promise&lt;ToolContractSnapshot&gt;</code> | Public runtime operation for snapshot. |
| `snapshotStore` | property | <code>snapshotStore: ToolContractSnapshotStore</code> | Public snapshot Store property. |

## `MCPSchemaCache` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: MCPSchemaCacheOptions): MCPSchemaCache</code> | Creates an instance of this class. |
| `get` | method | <code>get(ref: MCPCapabilityRef &amp; { protocolVersion?: string; }): MCPSchemaCacheEntry &#124; null</code> | Gets get at this module boundary. |
| `invalidate` | method | <code>invalidate(serverId: string, capabilityId?: string): number</code> | Public runtime operation for invalidate. |
| `set` | method | <code>set(record: MCPCapabilityRecord): MCPSchemaCacheEntry</code> | Sets set at this module boundary. |
| `size` | method | <code>size(): number</code> | Public runtime operation for size. |

## `RedisMCPCapabilityCatalogStore` public members

Multi-worker catalog store. Redis key operations are idempotent per capability id.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(client: RedisLikeMCPStoreClient, namespace?: string): RedisMCPCapabilityCatalogStore</code> | Creates an instance of this class. |
| `list` | method | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | Lists list at this module boundary. |
| `save` | method | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | Saves save at this module boundary. |

## `RedisToolContractSnapshotStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(client: Pick&lt;RedisLikeMCPStoreClient, "get" &#124; "set"&gt;, namespace?: string): RedisToolContractSnapshotStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | Gets get at this module boundary. |
| `save` | method | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | Saves save at this module boundary. |

## `MCPCapabilityApprovalRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvedBy` | property | <code>approvedBy: string</code> | Public approved By property. |
| `capabilityHash` | property | <code>capabilityHash: string</code> | Public capability Hash property. |
| `capabilityId` | property | <code>capabilityId: string</code> | Public capability Id property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `kind` | property | <code>kind: MCPCapabilityKind</code> | Public kind property. |
| `restrictions` | property | <code>restrictions: string[]</code> | Public restrictions property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public side Effect Level property. |

## `MCPCapabilityCatalogOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `driftPolicy` | property | <code>driftPolicy: MCPCapabilityDriftPolicySpec</code> | Public drift Policy property. |
| `gateway` | property | <code>gateway: MCPGateway</code> | Public gateway property. |
| `integration` | property | <code>integration: MCPIntegrationSpec</code> | Public integration property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `onEvent` | method | <code>onEvent(type: string, payload: Record&lt;string, unknown&gt;): Promise&lt;void&gt; &#124; void</code> | Handles Event at this module boundary. |
| `schemaCache` | property | <code>schemaCache: MCPSchemaCache</code> | Public schema Cache property. |
| `snapshotStore` | property | <code>snapshotStore: ToolContractSnapshotStore</code> | Public snapshot Store property. |
| `store` | property | <code>store: MCPCapabilityCatalogStore</code> | Public store property. |
| `telemetry` | property | <code>telemetry: TelemetryRecorder</code> | Public telemetry property. |
| `trustPolicy` | property | <code>trustPolicy: MCPTrustPolicySpec</code> | Public trust Policy property. |

## `MCPCapabilityCatalogStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `list` | method | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | Lists list at this module boundary. |
| `save` | method | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | Saves save at this module boundary. |

## `MCPCapabilityListRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kind` | property | <code>kind: MCPCapabilityKind</code> | Public kind property. |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `loadDescriptors` | property | <code>loadDescriptors: boolean</code> | Public load Descriptors property. |
| `permissionScopes` | property | <code>permissionScopes: string[]</code> | Public permission Scopes property. |
| `query` | property | <code>query: string</code> | Public query property. |
| `schemaTokenBudget` | property | <code>schemaTokenBudget: number</code> | Public schema Token Budget property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |
| `states` | property | <code>states: ("quarantined" &#124; "approved" &#124; "changed" &#124; "removed" &#124; "stable" &#124; "new")[]</code> | Public states property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |

## `MCPCapabilityQuarantineRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityHash` | property | <code>capabilityHash: string</code> | Public capability Hash property. |
| `capabilityId` | property | <code>capabilityId: string</code> | Public capability Id property. |
| `kind` | property | <code>kind: MCPCapabilityKind</code> | Public kind property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |

## `MCPCapabilityRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalExpiresAt` | property | <code>approvalExpiresAt: string</code> | Public approval Expires At property. |
| `approvedAt` | property | <code>approvedAt: string</code> | Public approved At property. |
| `capabilityHash` | property | <code>capabilityHash: string</code> | Public capability Hash property. |
| `capabilityVersion` | property | <code>capabilityVersion: string</code> | Public capability Version property. |
| `descriptor` | property | <code>descriptor: Record&lt;string, unknown&gt;</code> | Public descriptor property. |
| `descriptorHash` | property | <code>descriptorHash: string</code> | Public descriptor Hash property. |
| `driftState` | property | <code>driftState: "quarantined" &#124; "approved" &#124; "changed" &#124; "removed" &#124; "stable" &#124; "new"</code> | Public drift State property. |
| `driftTypes` | property | <code>driftTypes: MCPCapabilityDriftType[]</code> | Public drift Types property. |
| `firstSeenAt` | property | <code>firstSeenAt: string</code> | Public first Seen At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `kind` | property | <code>kind: MCPCapabilityKind</code> | Public kind property. |
| `lastSeenAt` | property | <code>lastSeenAt: string</code> | Public last Seen At property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `normalizedToolSpec` | property | <code>normalizedToolSpec: ToolSpec</code> | Public normalized Tool Spec property. |
| `protocolVersion` | property | <code>protocolVersion: string</code> | Public protocol Version property. |
| `remoteName` | property | <code>remoteName: string</code> | Public remote Name property. |
| `removedAt` | property | <code>removedAt: string</code> | Public removed At property. |
| `schemaHash` | property | <code>schemaHash: string</code> | Public schema Hash property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |
| `stableToolId` | property | <code>stableToolId: string</code> | Public stable Tool Id property. |
| `trust` | property | <code>trust: MCPCapabilityTrustRecord</code> | Public trust property. |

## `MCPCapabilityRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityHash` | property | <code>capabilityHash: string</code> | Public capability Hash property. |
| `capabilityId` | property | <code>capabilityId: string</code> | Public capability Id property. |
| `kind` | property | <code>kind: MCPCapabilityKind</code> | Public kind property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |

## `MCPCatalogSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: MCPCapabilityRecord[]</code> | Public capabilities property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `drift` | property | <code>drift: { capabilityId: string; previousHash?: string; currentHash?: string; types: MCPCapabilityDriftType[]; }[]</code> | Public drift property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |

## `MCPSchemaCacheEntry` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cachedAt` | property | <code>cachedAt: string</code> | Public cached At property. |
| `capabilityHash` | property | <code>capabilityHash: string</code> | Public capability Hash property. |
| `capabilityId` | property | <code>capabilityId: string</code> | Public capability Id property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `protocolVersion` | property | <code>protocolVersion: string</code> | Public protocol Version property. |
| `schema` | property | <code>schema: JsonSchema</code> | Public schema property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |

## `MCPSchemaCacheOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxEntries` | property | <code>maxEntries: number</code> | Public max Entries property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |

## `RedisLikeMCPStoreClient` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eval` | method | <code>eval(script: string, numberOfKeys: number, ...args: Array&lt;string &#124; number&gt;): Promise&lt;number &#124; string &#124; null&gt;</code> | Public runtime operation for eval. |
| `get` | method | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | Gets get at this module boundary. |
| `sadd` | method | <code>sadd(key: string, ...members: string[]): Promise&lt;number&gt;</code> | Public runtime operation for sadd. |
| `set` | method | <code>set(key: string, value: string): Promise&lt;unknown&gt;</code> | Sets set at this module boundary. |
| `smembers` | method | <code>smembers(key: string): Promise&lt;string[]&gt;</code> | Public runtime operation for smembers. |
