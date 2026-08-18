# `@codesoul-co/hypha-mcp` / `contracts`

- 包索引: [`@codesoul-co/hypha-mcp`](/zh/api/mcp)
- 模块指南: [学习与组合说明](/zh/packages/mcp)
- 源码: [`packages/mcp/src/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)
- 导出数: **25**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `governedMCPIntegrationDefinition` | 常量 | <code>const governedMCPIntegrationDefinition: SpecSchemaDefinition&lt;GovernedMCPIntegrationSpec&gt;</code> | 由 `contracts` 模块导出的 governed MCP Integration Definition 常量。 |
| `governedMCPIntegrationExample` | 常量 | <code>const governedMCPIntegrationExample: GovernedMCPIntegrationSpec</code> | governed MCP Integration 的有效示例值。 |
| `governedMCPIntegrationJsonSchema` | 常量 | <code>const governedMCPIntegrationJsonSchema: JsonSchema</code> | governed MCP Integration 的 JSON Schema。 |
| `governedMCPIntegrationJsonSchemas` | 常量 | <code>const governedMCPIntegrationJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts` 模块导出的 governed MCP Integration Json Schemas 常量。 |
| `governedMCPIntegrationSpecSchema` | 常量 | <code>const governedMCPIntegrationSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; servers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; displayName: z.ZodOptional&lt;z.ZodString&gt;; mode: z.ZodEnum&lt;["fixture", "local", "remote"]&gt;; transport: z.ZodType&lt;MCPTransport...</code> | governed MCP Integration Spec 的运行时 Schema。 |
| `mcpCapabilityDriftPolicySpecSchema` | 常量 | <code>const mcpCapabilityDriftPolicySpecSchema: z.ZodObject&lt;{ onDescriptionChange: z.ZodEnum&lt;["accept", "snapshot_next_run", "quarantine"]&gt;; onSchemaChange: z.ZodEnum&lt;["snapshot_next_run", "quarantine", "require_approval"]&gt;; onRemoval: z.ZodEnum&lt;["mark_unavailable", "allow_existing_run", "fail_existing_run"]&gt;; onServerIdentityChange: z.ZodEnum&lt;["disconnect", "quarantine"]&gt;; notifyRuntime: z.ZodOptional&lt;z.ZodBoolean&gt;; in...</code> | mcp Capability Drift Policy Spec 的运行时 Schema。 |
| `mcpServerProfileSchema` | 常量 | <code>const mcpServerProfileSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; displayName: z.ZodOptional&lt;z.ZodString&gt;; mode: z.ZodEnum&lt;["fixture", "local", "remote"]&gt;; transport: z.ZodType&lt;MCPTransportSpec, z.ZodTypeDef, MCPTransportSpec&gt;; authRef: z.ZodOptional&lt;z.ZodString&gt;; environmentRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; workingDirectoryRef: z.ZodOptional&lt;z.ZodString&gt;; autoCo...</code> | mcp Server Profile 的运行时 Schema。 |
| `mcpTransportSpecSchema` | 常量 | <code>const mcpTransportSpecSchema: z.ZodType&lt;MCPTransportSpec, z.ZodTypeDef, MCPTransportSpec&gt;</code> | mcp Transport Spec 的运行时 Schema。 |
| `mcpTrustPolicySpecSchema` | 常量 | <code>const mcpTrustPolicySpecSchema: z.ZodObject&lt;{ defaultTrustLevel: z.ZodEnum&lt;["untrusted", "restricted", "trusted"]&gt;; trustedSourceRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; requireAdminApprovalForNewServer: z.ZodOptional&lt;z.ZodBoolean&gt;; requireApprovalForNewCapability: z.ZodOptional&lt;z.ZodBoolean&gt;; requireApprovalForSchemaChange: z.ZodOptional&lt;z.ZodBoolean&gt;; allowServerDeclaredSideEffectHints: z.ZodOptiona...</code> | mcp Trust Policy Spec 的运行时 Schema。 |
| `NORMALIZED_MCP_ERROR_CODES` | 常量 | <code>const NORMALIZED_MCP_ERROR_CODES: readonly ["MCP_SERVER_NOT_FOUND", "MCP_CONNECTION_FAILED", "MCP_INITIALIZATION_FAILED", "MCP_PROTOCOL_MISMATCH", "MCP_REQUEST_TIMEOUT", "MCP_REQUEST_CANCELLED", "MCP_CAPABILITY_NOT_FOUND", "MCP_CAPABILITY_QUARANTINED", "MCP_CAPABILITY_DRIFT", "MCP_SCHEMA_INVALID", "MCP_AUTH_FAILED", "MCP_BULKHEAD_REJECTED", "MCP_RATE_LIMITED", "MCP_CIRCUIT_OPEN", "MCP_EGRESS_DENIED", "MCP_CONTENT_...</code> | 由 `contracts` 模块导出的 NORMALIZED MCP ERROR CODES 常量。 |
| `normalizedMCPErrorDefinition` | 常量 | <code>const normalizedMCPErrorDefinition: SpecSchemaDefinition&lt;NormalizedMCPError&gt;</code> | 由 `contracts` 模块导出的 normalized MCP Error Definition 常量。 |
| `normalizedMCPErrorExample` | 常量 | <code>const normalizedMCPErrorExample: NormalizedMCPError</code> | normalized MCP Error 的有效示例值。 |
| `normalizedMCPErrorJsonSchema` | 常量 | <code>const normalizedMCPErrorJsonSchema: JsonSchema</code> | normalized MCP Error 的 JSON Schema。 |
| `normalizedMCPErrorSchema` | 常量 | <code>const normalizedMCPErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["MCP_SERVER_NOT_FOUND", "MCP_CONNECTION_FAILED", "MCP_INITIALIZATION_FAILED", "MCP_PROTOCOL_MISMATCH", "MCP_REQUEST_TIMEOUT", "MCP_REQUEST_CANCELLED", "MCP_CAPABILITY_NOT_FOUND", "MCP_CAPABILITY_QUARANTINED", "MCP_CAPABILITY_DRIFT", "MCP_SCHEMA_INVALID", "MCP_AUTH_FAILED", "MCP_BULKHEAD_REJECTED", "MCP_RATE_LIMITED", "MCP_CIRCUIT_OPEN", "MCP_EGRESS_DEN...</code> | normalized MCP Error 的运行时 Schema。 |
| `GovernedMCPIntegrationSpec` | 接口 | <code>interface GovernedMCPIntegrationSpec</code> | Governed MCP Integration Spec 的字段契约；完整字段见下表。 |
| `MCPAllowDenyRule` | 接口 | <code>interface MCPAllowDenyRule</code> | MCP Allow Deny Rule 的字段契约；完整字段见下表。 |
| `MCPCapabilityDriftPolicySpec` | 接口 | <code>interface MCPCapabilityDriftPolicySpec</code> | MCP Capability Drift Policy Spec 的字段契约；完整字段见下表。 |
| `MCPCapabilityTrustRecord` | 接口 | <code>interface MCPCapabilityTrustRecord</code> | MCP Capability Trust Record 的字段契约；完整字段见下表。 |
| `MCPContractSnapshotPolicySpec` | 接口 | <code>interface MCPContractSnapshotPolicySpec</code> | MCP Contract Snapshot Policy Spec 的字段契约；完整字段见下表。 |
| `MCPImportPolicySpec` | 接口 | <code>interface MCPImportPolicySpec</code> | MCP Import Policy Spec 的字段契约；完整字段见下表。 |
| `MCPServerProfile` | 接口 | <code>interface MCPServerProfile</code> | MCP Server Profile 的字段契约；完整字段见下表。 |
| `MCPTrustPolicySpec` | 接口 | <code>interface MCPTrustPolicySpec</code> | MCP Trust Policy Spec 的字段契约；完整字段见下表。 |
| `NormalizedMCPError` | 接口 | <code>interface NormalizedMCPError</code> | Normalized MCP Error 的字段契约；完整字段见下表。 |
| `MCPTransportSpec` | 类型 | <code>type MCPTransportSpec = { type: 'stdio'; command: string; args?: string[]; envAllowList?: string[]; stderrMode?: 'inherit' &#124; 'capture' &#124; 'artifact'; } &#124; { type: 'streamable_http'; endpoint: string; headersRef?: string; authorizationRef?: string; sessionMode?: 'protocol_default' &#124; 'stateless'; } &#124; { type: 'custom'; adapterRef: string; config?: Record&lt;string, unknown&gt;; }</code> | MCP Transport Spec 的公共类型别名。 |
| `NormalizedMCPErrorCode` | 类型 | <code>type NormalizedMCPErrorCode = (typeof NORMALIZED_MCP_ERROR_CODES)[number]</code> | Normalized MCP Error Code 的公共类型别名。 |

## `GovernedMCPIntegrationSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowCapabilities` | 属性 | <code>allowCapabilities: MCPAllowDenyRule[]</code> | allow Capabilities 字段。 |
| `denyCapabilities` | 属性 | <code>denyCapabilities: MCPAllowDenyRule[]</code> | deny Capabilities 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `driftPolicy` | 属性 | <code>driftPolicy: MCPCapabilityDriftPolicySpec</code> | drift Policy 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `importPolicy` | 属性 | <code>importPolicy: MCPImportPolicySpec</code> | import Policy 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `promptPolicyRefs` | 属性 | <code>promptPolicyRefs: { id: string; version?: string; revision?: string; }[]</code> | prompt Policy Refs 字段。 |
| `resourcePolicyRefs` | 属性 | <code>resourcePolicyRefs: { id: string; version?: string; revision?: string; }[]</code> | resource Policy Refs 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `servers` | 属性 | <code>servers: MCPServerProfile[]</code> | servers 字段。 |
| `snapshotPolicy` | 属性 | <code>snapshotPolicy: MCPContractSnapshotPolicySpec</code> | snapshot Policy 字段。 |
| `toolPolicyRefs` | 属性 | <code>toolPolicyRefs: { id: string; version?: string; revision?: string; }[]</code> | tool Policy Refs 字段。 |
| `trustPolicy` | 属性 | <code>trustPolicy: MCPTrustPolicySpec</code> | trust Policy 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `MCPAllowDenyRule` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | capability Id 字段。 |
| `kind` | 属性 | <code>kind: "tool" &#124; "prompt" &#124; "resource"</code> | kind 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |

## `MCPCapabilityDriftPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `invalidateSchemaCache` | 属性 | <code>invalidateSchemaCache: boolean</code> | invalidate Schema Cache 字段。 |
| `notifyRuntime` | 属性 | <code>notifyRuntime: boolean</code> | notify Runtime 字段。 |
| `onDescriptionChange` | 属性 | <code>onDescriptionChange: "quarantine" &#124; "accept" &#124; "snapshot_next_run"</code> | on Description Change 字段。 |
| `onRemoval` | 属性 | <code>onRemoval: "mark_unavailable" &#124; "allow_existing_run" &#124; "fail_existing_run"</code> | on Removal 字段。 |
| `onSchemaChange` | 属性 | <code>onSchemaChange: "quarantine" &#124; "snapshot_next_run" &#124; "require_approval"</code> | on Schema Change 字段。 |
| `onServerIdentityChange` | 属性 | <code>onServerIdentityChange: "quarantine" &#124; "disconnect"</code> | on Server Identity Change 字段。 |

## `MCPCapabilityTrustRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvedAt` | 属性 | <code>approvedAt: string</code> | approved At 字段。 |
| `approvedBy` | 属性 | <code>approvedBy: string</code> | approved By 字段。 |
| `level` | 属性 | <code>level: "trusted" &#124; "untrusted" &#124; "restricted"</code> | level 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `restrictions` | 属性 | <code>restrictions: string[]</code> | restrictions 字段。 |
| `source` | 属性 | <code>source: "import" &#124; "admin" &#124; "domain_pack" &#124; "runtime_discovery" &#124; "signed_manifest"</code> | source 字段。 |
| `sourceRef` | 属性 | <code>sourceRef: string</code> | source Ref 字段。 |

## `MCPContractSnapshotPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mode` | 属性 | <code>mode: "run" &#124; "state"</code> | mode 字段。 |
| `preserveRemovedForExistingRuns` | 属性 | <code>preserveRemovedForExistingRuns: boolean</code> | preserve Removed For Existing Runs 字段。 |
| `requireApprovedRevision` | 属性 | <code>requireApprovedRevision: boolean</code> | require Approved Revision 字段。 |

## `MCPImportPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `kinds` | 属性 | <code>kinds: ("tool" &#124; "prompt" &#124; "resource")[]</code> | kinds 字段。 |
| `lazyLoad` | 属性 | <code>lazyLoad: boolean</code> | lazy Load 字段。 |
| `maxLoadedCapabilities` | 属性 | <code>maxLoadedCapabilities: number</code> | max Loaded Capabilities 字段。 |
| `schemaTokenBudget` | 属性 | <code>schemaTokenBudget: number</code> | schema Token Budget 字段。 |

## `MCPServerProfile` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authRef` | 属性 | <code>authRef: string</code> | auth Ref 字段。 |
| `autoConnect` | 属性 | <code>autoConnect: boolean</code> | auto Connect 字段。 |
| `contentPolicy` | 属性 | <code>contentPolicy: { maxToolResultBytes?: number; maxResourceBytes?: number; maxPromptBytes?: number; maxPromptTokens?: number; oversizeAction?: "reject" &#124; "artifact"; }</code> | content Policy 字段。 |
| `displayName` | 属性 | <code>displayName: string</code> | display Name 字段。 |
| `egressPolicy` | 属性 | <code>egressPolicy: { allowedHosts?: string[]; denyPrivateNetworks?: boolean; requireTls?: boolean; maxRedirects?: number; allowCrossOriginRedirects?: boolean; }</code> | egress Policy 字段。 |
| `environmentRefs` | 属性 | <code>environmentRefs: string[]</code> | environment Refs 字段。 |
| `expectedServerInfo` | 属性 | <code>expectedServerInfo: Record&lt;string, unknown&gt;</code> | expected Server Info 字段。 |
| `healthCheckPolicy` | 属性 | <code>healthCheckPolicy: { intervalMs?: number; timeoutMs?: number; unhealthyThreshold?: number; }</code> | health Check Policy 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `initializationTimeoutMs` | 属性 | <code>initializationTimeoutMs: number</code> | initialization Timeout Ms 字段。 |
| `lazyConnect` | 属性 | <code>lazyConnect: boolean</code> | lazy Connect 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `mode` | 属性 | <code>mode: "local" &#124; "remote" &#124; "fixture"</code> | mode 字段。 |
| `protocolVersionPolicy` | 属性 | <code>protocolVersionPolicy: { allowedVersions?: string[]; preferLatest?: boolean; rejectUnknown?: boolean; }</code> | protocol Version Policy 字段。 |
| `reconnectPolicy` | 属性 | <code>reconnectPolicy: RetryPolicySpec</code> | reconnect Policy 字段。 |
| `requestGuardPolicy` | 属性 | <code>requestGuardPolicy: { maxConcurrentRequests?: number; rateLimit?: { maxRequests: number; windowMs: number; }; circuitBreaker?: { failureThreshold: number; resetAfterMs: number; }; }</code> | request Guard Policy 字段。 |
| `requestTimeoutMs` | 属性 | <code>requestTimeoutMs: number</code> | request Timeout Ms 字段。 |
| `shutdownTimeoutMs` | 属性 | <code>shutdownTimeoutMs: number</code> | shutdown Timeout Ms 字段。 |
| `singleStart` | 属性 | <code>singleStart: boolean</code> | single Start 字段。 |
| `transport` | 属性 | <code>transport: MCPTransportSpec</code> | transport 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
| `workingDirectoryRef` | 属性 | <code>workingDirectoryRef: string</code> | working Directory Ref 字段。 |

## `MCPTrustPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowServerDeclaredSideEffectHints` | 属性 | <code>allowServerDeclaredSideEffectHints: boolean</code> | allow Server Declared Side Effect Hints 字段。 |
| `defaultTrustLevel` | 属性 | <code>defaultTrustLevel: "trusted" &#124; "untrusted" &#124; "restricted"</code> | default Trust Level 字段。 |
| `pinCapabilityHashes` | 属性 | <code>pinCapabilityHashes: boolean</code> | pin Capability Hashes 字段。 |
| `pinProtocolVersion` | 属性 | <code>pinProtocolVersion: boolean</code> | pin Protocol Version 字段。 |
| `pinServerIdentity` | 属性 | <code>pinServerIdentity: boolean</code> | pin Server Identity 字段。 |
| `requireAdminApprovalForNewServer` | 属性 | <code>requireAdminApprovalForNewServer: boolean</code> | require Admin Approval For New Server 字段。 |
| `requireApprovalForNewCapability` | 属性 | <code>requireApprovalForNewCapability: boolean</code> | require Approval For New Capability 字段。 |
| `requireApprovalForSchemaChange` | 属性 | <code>requireApprovalForSchemaChange: boolean</code> | require Approval For Schema Change 字段。 |
| `trustedSourceRefs` | 属性 | <code>trustedSourceRefs: string[]</code> | trusted Source Refs 字段。 |

## `NormalizedMCPError` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | capability Id 字段。 |
| `code` | 属性 | <code>code: "MCP_SERVER_NOT_FOUND" &#124; "MCP_CONNECTION_FAILED" &#124; "MCP_INITIALIZATION_FAILED" &#124; "MCP_PROTOCOL_MISMATCH" &#124; "MCP_REQUEST_TIMEOUT" &#124; "MCP_REQUEST_CANCELLED" &#124; "MCP_CAPABILITY_NOT_FOUND" &#124; "MCP_CAPABILITY_QUARANTINED" &#124; "MCP_CAPABILITY_DRIFT" &#124; "MCP_SCHEMA_INVALID" &#124; "MCP_AUTH_FAILED" &#124; "MCP_BULKHEAD_REJECTED" &#124; "MCP_RATE_LIMITED" &#124; "MCP_CIRCUIT_OPEN" &#124; "MCP_EGRESS_DENIED" &#124; "MCP_CONTENT_TOO_LARGE" &#124; "MCP_REMOT...</code> | code 字段。 |
| `details` | 属性 | <code>details: Record&lt;string, unknown&gt;</code> | details 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `remoteCode` | 属性 | <code>remoteCode: string &#124; number</code> | remote Code 字段。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | retryable 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |
