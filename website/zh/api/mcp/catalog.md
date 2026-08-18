# `@codesoul-co/hypha-mcp` / `catalog`

- 包索引: [`@codesoul-co/hypha-mcp`](/zh/api/mcp)
- 模块指南: [学习与组合说明](/zh/packages/mcp)
- 源码: [`packages/mcp/src/catalog.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)
- 导出数: **24**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMCPCapabilityCatalogStore` | 类 | <code>new InMemoryMCPCapabilityCatalogStore(): InMemoryMCPCapabilityCatalogStore</code> | In Memory MCP Capability Catalog Store 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryToolContractSnapshotStore` | 类 | <code>new InMemoryToolContractSnapshotStore(): InMemoryToolContractSnapshotStore</code> | In Memory Tool Contract Snapshot Store 的运行时实现；公开构造函数与成员见下表。 |
| `MCPCapabilityCatalog` | 类 | <code>new MCPCapabilityCatalog(options: MCPCapabilityCatalogOptions): MCPCapabilityCatalog</code> | MCP Capability Catalog 的运行时实现；公开构造函数与成员见下表。 |
| `MCPSchemaCache` | 类 | <code>new MCPSchemaCache(options?: MCPSchemaCacheOptions): MCPSchemaCache</code> | MCP Schema Cache 的运行时实现；公开构造函数与成员见下表。 |
| `RedisMCPCapabilityCatalogStore` | 类 | <code>new RedisMCPCapabilityCatalogStore(client: RedisLikeMCPStoreClient, namespace?: string): RedisMCPCapabilityCatalogStore</code> | Multi-worker catalog store. Redis key operations are idempotent per capability id. |
| `RedisToolContractSnapshotStore` | 类 | <code>new RedisToolContractSnapshotStore(client: Pick&lt;RedisLikeMCPStoreClient, "get" &#124; "set"&gt;, namespace?: string): RedisToolContractSnapshotStore</code> | Redis Tool Contract Snapshot Store 的运行时实现；公开构造函数与成员见下表。 |
| `mcpCapabilityRecordDefinition` | 常量 | <code>const mcpCapabilityRecordDefinition: SpecSchemaDefinition&lt;MCPCapabilityRecord&gt;</code> | 由 `catalog` 模块导出的 mcp Capability Record Definition 常量。 |
| `mcpCapabilityRecordExample` | 常量 | <code>const mcpCapabilityRecordExample: MCPCapabilityRecord</code> | mcp Capability Record 的有效示例值。 |
| `mcpCapabilityRecordJsonSchema` | 常量 | <code>const mcpCapabilityRecordJsonSchema: JsonSchema</code> | mcp Capability Record 的 JSON Schema。 |
| `mcpCapabilityRecordSchema` | 常量 | <code>const mcpCapabilityRecordSchema: ZodType&lt;MCPCapabilityRecord, ZodTypeDef, MCPCapabilityRecord&gt;</code> | mcp Capability Record 的运行时 Schema。 |
| `normalizeMCPToolOutput` | 函数 | <code>normalizeMCPToolOutput(result: unknown): unknown</code> | MCP CallToolResult is a transport envelope. A declared Tool output schema applies to structuredContent, not to the protocol's content/isError fields. |
| `MCPCapabilityApprovalRequest` | 接口 | <code>interface MCPCapabilityApprovalRequest extends MCPCapabilityRef</code> | MCP Capability Approval Request 的字段契约；完整字段见下表。 |
| `MCPCapabilityCatalogOptions` | 接口 | <code>interface MCPCapabilityCatalogOptions</code> | MCP Capability Catalog Options 的字段契约；完整字段见下表。 |
| `MCPCapabilityCatalogStore` | 接口 | <code>interface MCPCapabilityCatalogStore</code> | MCP Capability Catalog Store 的字段契约；完整字段见下表。 |
| `MCPCapabilityListRequest` | 接口 | <code>interface MCPCapabilityListRequest</code> | MCP Capability List Request 的字段契约；完整字段见下表。 |
| `MCPCapabilityQuarantineRequest` | 接口 | <code>interface MCPCapabilityQuarantineRequest extends MCPCapabilityRef</code> | MCP Capability Quarantine Request 的字段契约；完整字段见下表。 |
| `MCPCapabilityRecord` | 接口 | <code>interface MCPCapabilityRecord</code> | MCP Capability Record 的字段契约；完整字段见下表。 |
| `MCPCapabilityRef` | 接口 | <code>interface MCPCapabilityRef</code> | MCP Capability Ref 的字段契约；完整字段见下表。 |
| `MCPCatalogSnapshot` | 接口 | <code>interface MCPCatalogSnapshot</code> | MCP Catalog Snapshot 的字段契约；完整字段见下表。 |
| `MCPSchemaCacheEntry` | 接口 | <code>interface MCPSchemaCacheEntry</code> | MCP Schema Cache Entry 的字段契约；完整字段见下表。 |
| `MCPSchemaCacheOptions` | 接口 | <code>interface MCPSchemaCacheOptions</code> | MCP Schema Cache Options 的字段契约；完整字段见下表。 |
| `RedisLikeMCPStoreClient` | 接口 | <code>interface RedisLikeMCPStoreClient</code> | Redis Like MCP Store Client 的字段契约；完整字段见下表。 |
| `MCPCapabilityDriftType` | 类型 | <code>type MCPCapabilityDriftType = 'description_changed' &#124; 'input_schema_changed' &#124; 'output_schema_changed' &#124; 'annotations_changed' &#124; 'capability_added' &#124; 'capability_removed' &#124; 'server_identity_changed' &#124; 'protocol_version_changed'</code> | MCP Capability Drift Type 的公共类型别名。 |
| `MCPCapabilityKind` | 类型 | <code>type MCPCapabilityKind = 'tool' &#124; 'resource' &#124; 'prompt'</code> | MCP Capability Kind 的公共类型别名。 |

## `InMemoryMCPCapabilityCatalogStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryMCPCapabilityCatalogStore</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | 列出 list。 |
| `save` | 方法 | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | 保存 save。 |

## `InMemoryToolContractSnapshotStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryToolContractSnapshotStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | 读取 get。 |
| `save` | 方法 | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | 保存 save。 |

## `MCPCapabilityCatalog` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approveRevision` | 方法 | <code>approveRevision(request: MCPCapabilityApprovalRequest): Promise&lt;void&gt;</code> | approve Revision 的公开运行时操作。 |
| `bindConnectionManager` | 方法 | <code>bindConnectionManager(manager: MCPConnectionManager): () =&gt; void</code> | bind Connection Manager 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: MCPCapabilityCatalogOptions): MCPCapabilityCatalog</code> | 创建该类的实例。 |
| `getCapability` | 方法 | <code>getCapability(ref: MCPCapabilityRef): Promise&lt;MCPCapabilityRecord &#124; null&gt;</code> | 读取 Capability。 |
| `importTools` | 方法 | <code>importTools(registry: ToolRegistry, refs: MCPCapabilityRef[], context?: Partial&lt;ToolCallContext&gt;): Promise&lt;ToolSpec[]&gt;</code> | import Tools 的公开运行时操作。 |
| `list` | 方法 | <code>list(request?: MCPCapabilityListRequest): Promise&lt;MCPCapabilityRecord[]&gt;</code> | 列出 list。 |
| `quarantine` | 方法 | <code>quarantine(request: MCPCapabilityQuarantineRequest): Promise&lt;void&gt;</code> | quarantine 的公开运行时操作。 |
| `refresh` | 方法 | <code>refresh(serverId: string, reason?: string): Promise&lt;MCPCatalogSnapshot&gt;</code> | refresh 的公开运行时操作。 |
| `snapshot` | 方法 | <code>snapshot(runId: string, refs: MCPCapabilityRef[]): Promise&lt;ToolContractSnapshot&gt;</code> | snapshot 的公开运行时操作。 |
| `snapshotStore` | 属性 | <code>snapshotStore: ToolContractSnapshotStore</code> | snapshot Store 字段。 |

## `MCPSchemaCache` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: MCPSchemaCacheOptions): MCPSchemaCache</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(ref: MCPCapabilityRef &amp; { protocolVersion?: string; }): MCPSchemaCacheEntry &#124; null</code> | 读取 get。 |
| `invalidate` | 方法 | <code>invalidate(serverId: string, capabilityId?: string): number</code> | invalidate 的公开运行时操作。 |
| `set` | 方法 | <code>set(record: MCPCapabilityRecord): MCPSchemaCacheEntry</code> | 写入 set。 |
| `size` | 方法 | <code>size(): number</code> | size 的公开运行时操作。 |

## `RedisMCPCapabilityCatalogStore` 公开成员

Multi-worker catalog store. Redis key operations are idempotent per capability id.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(client: RedisLikeMCPStoreClient, namespace?: string): RedisMCPCapabilityCatalogStore</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | 列出 list。 |
| `save` | 方法 | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | 保存 save。 |

## `RedisToolContractSnapshotStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(client: Pick&lt;RedisLikeMCPStoreClient, "get" &#124; "set"&gt;, namespace?: string): RedisToolContractSnapshotStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | 读取 get。 |
| `save` | 方法 | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | 保存 save。 |

## `MCPCapabilityApprovalRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvedBy` | 属性 | <code>approvedBy: string</code> | approved By 字段。 |
| `capabilityHash` | 属性 | <code>capabilityHash: string</code> | capability Hash 字段。 |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | capability Id 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `kind` | 属性 | <code>kind: MCPCapabilityKind</code> | kind 字段。 |
| `restrictions` | 属性 | <code>restrictions: string[]</code> | restrictions 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | side Effect Level 字段。 |

## `MCPCapabilityCatalogOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `driftPolicy` | 属性 | <code>driftPolicy: MCPCapabilityDriftPolicySpec</code> | drift Policy 字段。 |
| `gateway` | 属性 | <code>gateway: MCPGateway</code> | gateway 字段。 |
| `integration` | 属性 | <code>integration: MCPIntegrationSpec</code> | integration 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `onEvent` | 方法 | <code>onEvent(type: string, payload: Record&lt;string, unknown&gt;): Promise&lt;void&gt; &#124; void</code> | 处理 Event。 |
| `schemaCache` | 属性 | <code>schemaCache: MCPSchemaCache</code> | schema Cache 字段。 |
| `snapshotStore` | 属性 | <code>snapshotStore: ToolContractSnapshotStore</code> | snapshot Store 字段。 |
| `store` | 属性 | <code>store: MCPCapabilityCatalogStore</code> | store 字段。 |
| `telemetry` | 属性 | <code>telemetry: TelemetryRecorder</code> | telemetry 字段。 |
| `trustPolicy` | 属性 | <code>trustPolicy: MCPTrustPolicySpec</code> | trust Policy 字段。 |

## `MCPCapabilityCatalogStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `list` | 方法 | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | 列出 list。 |
| `save` | 方法 | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | 保存 save。 |

## `MCPCapabilityListRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `kind` | 属性 | <code>kind: MCPCapabilityKind</code> | kind 字段。 |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `loadDescriptors` | 属性 | <code>loadDescriptors: boolean</code> | load Descriptors 字段。 |
| `permissionScopes` | 属性 | <code>permissionScopes: string[]</code> | permission Scopes 字段。 |
| `query` | 属性 | <code>query: string</code> | query 字段。 |
| `schemaTokenBudget` | 属性 | <code>schemaTokenBudget: number</code> | schema Token Budget 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |
| `states` | 属性 | <code>states: ("quarantined" &#124; "approved" &#124; "changed" &#124; "removed" &#124; "stable" &#124; "new")[]</code> | states 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |

## `MCPCapabilityQuarantineRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityHash` | 属性 | <code>capabilityHash: string</code> | capability Hash 字段。 |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | capability Id 字段。 |
| `kind` | 属性 | <code>kind: MCPCapabilityKind</code> | kind 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |

## `MCPCapabilityRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalExpiresAt` | 属性 | <code>approvalExpiresAt: string</code> | approval Expires At 字段。 |
| `approvedAt` | 属性 | <code>approvedAt: string</code> | approved At 字段。 |
| `capabilityHash` | 属性 | <code>capabilityHash: string</code> | capability Hash 字段。 |
| `capabilityVersion` | 属性 | <code>capabilityVersion: string</code> | capability Version 字段。 |
| `descriptor` | 属性 | <code>descriptor: Record&lt;string, unknown&gt;</code> | descriptor 字段。 |
| `descriptorHash` | 属性 | <code>descriptorHash: string</code> | descriptor Hash 字段。 |
| `driftState` | 属性 | <code>driftState: "quarantined" &#124; "approved" &#124; "changed" &#124; "removed" &#124; "stable" &#124; "new"</code> | drift State 字段。 |
| `driftTypes` | 属性 | <code>driftTypes: MCPCapabilityDriftType[]</code> | drift Types 字段。 |
| `firstSeenAt` | 属性 | <code>firstSeenAt: string</code> | first Seen At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `kind` | 属性 | <code>kind: MCPCapabilityKind</code> | kind 字段。 |
| `lastSeenAt` | 属性 | <code>lastSeenAt: string</code> | last Seen At 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `normalizedToolSpec` | 属性 | <code>normalizedToolSpec: ToolSpec</code> | normalized Tool Spec 字段。 |
| `protocolVersion` | 属性 | <code>protocolVersion: string</code> | protocol Version 字段。 |
| `remoteName` | 属性 | <code>remoteName: string</code> | remote Name 字段。 |
| `removedAt` | 属性 | <code>removedAt: string</code> | removed At 字段。 |
| `schemaHash` | 属性 | <code>schemaHash: string</code> | schema Hash 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |
| `stableToolId` | 属性 | <code>stableToolId: string</code> | stable Tool Id 字段。 |
| `trust` | 属性 | <code>trust: MCPCapabilityTrustRecord</code> | trust 字段。 |

## `MCPCapabilityRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityHash` | 属性 | <code>capabilityHash: string</code> | capability Hash 字段。 |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | capability Id 字段。 |
| `kind` | 属性 | <code>kind: MCPCapabilityKind</code> | kind 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |

## `MCPCatalogSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: MCPCapabilityRecord[]</code> | capabilities 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `drift` | 属性 | <code>drift: { capabilityId: string; previousHash?: string; currentHash?: string; types: MCPCapabilityDriftType[]; }[]</code> | drift 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |

## `MCPSchemaCacheEntry` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cachedAt` | 属性 | <code>cachedAt: string</code> | cached At 字段。 |
| `capabilityHash` | 属性 | <code>capabilityHash: string</code> | capability Hash 字段。 |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | capability Id 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `protocolVersion` | 属性 | <code>protocolVersion: string</code> | protocol Version 字段。 |
| `schema` | 属性 | <code>schema: JsonSchema</code> | schema 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |

## `MCPSchemaCacheOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxEntries` | 属性 | <code>maxEntries: number</code> | max Entries 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |

## `RedisLikeMCPStoreClient` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eval` | 方法 | <code>eval(script: string, numberOfKeys: number, ...args: Array&lt;string &#124; number&gt;): Promise&lt;number &#124; string &#124; null&gt;</code> | eval 的公开运行时操作。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | 读取 get。 |
| `sadd` | 方法 | <code>sadd(key: string, ...members: string[]): Promise&lt;number&gt;</code> | sadd 的公开运行时操作。 |
| `set` | 方法 | <code>set(key: string, value: string): Promise&lt;unknown&gt;</code> | 写入 set。 |
| `smembers` | 方法 | <code>smembers(key: string): Promise&lt;string[]&gt;</code> | smembers 的公开运行时操作。 |
