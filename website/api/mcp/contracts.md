# `@codesoul-co/hypha-mcp` / `contracts`

- Package index: [`@codesoul-co/hypha-mcp`](/api/mcp)
- Package guide: [learning and composition guide](/packages/mcp)
- Source: [`packages/mcp/src/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)
- Exports: **25**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `governedMCPIntegrationDefinition` | constant | <code>const governedMCPIntegrationDefinition: SpecSchemaDefinition&lt;GovernedMCPIntegrationSpec&gt;</code> | governed MCP Integration Definition constant exported by the `contracts` module. |
| `governedMCPIntegrationExample` | constant | <code>const governedMCPIntegrationExample: GovernedMCPIntegrationSpec</code> | Valid example value for governed MCP Integration. |
| `governedMCPIntegrationJsonSchema` | constant | <code>const governedMCPIntegrationJsonSchema: JsonSchema</code> | JSON Schema for governed MCP Integration. |
| `governedMCPIntegrationJsonSchemas` | constant | <code>const governedMCPIntegrationJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | governed MCP Integration Json Schemas constant exported by the `contracts` module. |
| `governedMCPIntegrationSpecSchema` | constant | <code>const governedMCPIntegrationSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; servers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; displayName: z.ZodOptional&lt;z.ZodString&gt;; mode: z.ZodEnum&lt;["fixture", "local", "remote"]&gt;; transport: z.ZodType&lt;MCPTransport...</code> | Runtime schema for governed MCP Integration Spec. |
| `mcpCapabilityDriftPolicySpecSchema` | constant | <code>const mcpCapabilityDriftPolicySpecSchema: z.ZodObject&lt;{ onDescriptionChange: z.ZodEnum&lt;["accept", "snapshot_next_run", "quarantine"]&gt;; onSchemaChange: z.ZodEnum&lt;["snapshot_next_run", "quarantine", "require_approval"]&gt;; onRemoval: z.ZodEnum&lt;["mark_unavailable", "allow_existing_run", "fail_existing_run"]&gt;; onServerIdentityChange: z.ZodEnum&lt;["disconnect", "quarantine"]&gt;; notifyRuntime: z.ZodOptional&lt;z.ZodBoolean&gt;; in...</code> | Runtime schema for mcp Capability Drift Policy Spec. |
| `mcpServerProfileSchema` | constant | <code>const mcpServerProfileSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; displayName: z.ZodOptional&lt;z.ZodString&gt;; mode: z.ZodEnum&lt;["fixture", "local", "remote"]&gt;; transport: z.ZodType&lt;MCPTransportSpec, z.ZodTypeDef, MCPTransportSpec&gt;; authRef: z.ZodOptional&lt;z.ZodString&gt;; environmentRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; workingDirectoryRef: z.ZodOptional&lt;z.ZodString&gt;; autoCo...</code> | Runtime schema for mcp Server Profile. |
| `mcpTransportSpecSchema` | constant | <code>const mcpTransportSpecSchema: z.ZodType&lt;MCPTransportSpec, z.ZodTypeDef, MCPTransportSpec&gt;</code> | Runtime schema for mcp Transport Spec. |
| `mcpTrustPolicySpecSchema` | constant | <code>const mcpTrustPolicySpecSchema: z.ZodObject&lt;{ defaultTrustLevel: z.ZodEnum&lt;["untrusted", "restricted", "trusted"]&gt;; trustedSourceRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; requireAdminApprovalForNewServer: z.ZodOptional&lt;z.ZodBoolean&gt;; requireApprovalForNewCapability: z.ZodOptional&lt;z.ZodBoolean&gt;; requireApprovalForSchemaChange: z.ZodOptional&lt;z.ZodBoolean&gt;; allowServerDeclaredSideEffectHints: z.ZodOptiona...</code> | Runtime schema for mcp Trust Policy Spec. |
| `NORMALIZED_MCP_ERROR_CODES` | constant | <code>const NORMALIZED_MCP_ERROR_CODES: readonly ["MCP_SERVER_NOT_FOUND", "MCP_CONNECTION_FAILED", "MCP_INITIALIZATION_FAILED", "MCP_PROTOCOL_MISMATCH", "MCP_REQUEST_TIMEOUT", "MCP_REQUEST_CANCELLED", "MCP_CAPABILITY_NOT_FOUND", "MCP_CAPABILITY_QUARANTINED", "MCP_CAPABILITY_DRIFT", "MCP_SCHEMA_INVALID", "MCP_AUTH_FAILED", "MCP_BULKHEAD_REJECTED", "MCP_RATE_LIMITED", "MCP_CIRCUIT_OPEN", "MCP_EGRESS_DENIED", "MCP_CONTENT_...</code> | NORMALIZED MCP ERROR CODES constant exported by the `contracts` module. |
| `normalizedMCPErrorDefinition` | constant | <code>const normalizedMCPErrorDefinition: SpecSchemaDefinition&lt;NormalizedMCPError&gt;</code> | normalized MCP Error Definition constant exported by the `contracts` module. |
| `normalizedMCPErrorExample` | constant | <code>const normalizedMCPErrorExample: NormalizedMCPError</code> | Valid example value for normalized MCP Error. |
| `normalizedMCPErrorJsonSchema` | constant | <code>const normalizedMCPErrorJsonSchema: JsonSchema</code> | JSON Schema for normalized MCP Error. |
| `normalizedMCPErrorSchema` | constant | <code>const normalizedMCPErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["MCP_SERVER_NOT_FOUND", "MCP_CONNECTION_FAILED", "MCP_INITIALIZATION_FAILED", "MCP_PROTOCOL_MISMATCH", "MCP_REQUEST_TIMEOUT", "MCP_REQUEST_CANCELLED", "MCP_CAPABILITY_NOT_FOUND", "MCP_CAPABILITY_QUARANTINED", "MCP_CAPABILITY_DRIFT", "MCP_SCHEMA_INVALID", "MCP_AUTH_FAILED", "MCP_BULKHEAD_REJECTED", "MCP_RATE_LIMITED", "MCP_CIRCUIT_OPEN", "MCP_EGRESS_DEN...</code> | Runtime schema for normalized MCP Error. |
| `GovernedMCPIntegrationSpec` | interface | <code>interface GovernedMCPIntegrationSpec</code> | Field contract for Governed MCP Integration Spec; see all contract members below. |
| `MCPAllowDenyRule` | interface | <code>interface MCPAllowDenyRule</code> | Field contract for MCP Allow Deny Rule; see all contract members below. |
| `MCPCapabilityDriftPolicySpec` | interface | <code>interface MCPCapabilityDriftPolicySpec</code> | Field contract for MCP Capability Drift Policy Spec; see all contract members below. |
| `MCPCapabilityTrustRecord` | interface | <code>interface MCPCapabilityTrustRecord</code> | Field contract for MCP Capability Trust Record; see all contract members below. |
| `MCPContractSnapshotPolicySpec` | interface | <code>interface MCPContractSnapshotPolicySpec</code> | Field contract for MCP Contract Snapshot Policy Spec; see all contract members below. |
| `MCPImportPolicySpec` | interface | <code>interface MCPImportPolicySpec</code> | Field contract for MCP Import Policy Spec; see all contract members below. |
| `MCPServerProfile` | interface | <code>interface MCPServerProfile</code> | Field contract for MCP Server Profile; see all contract members below. |
| `MCPTrustPolicySpec` | interface | <code>interface MCPTrustPolicySpec</code> | Field contract for MCP Trust Policy Spec; see all contract members below. |
| `NormalizedMCPError` | interface | <code>interface NormalizedMCPError</code> | Field contract for Normalized MCP Error; see all contract members below. |
| `MCPTransportSpec` | type | <code>type MCPTransportSpec = { type: 'stdio'; command: string; args?: string[]; envAllowList?: string[]; stderrMode?: 'inherit' &#124; 'capture' &#124; 'artifact'; } &#124; { type: 'streamable_http'; endpoint: string; headersRef?: string; authorizationRef?: string; sessionMode?: 'protocol_default' &#124; 'stateless'; } &#124; { type: 'custom'; adapterRef: string; config?: Record&lt;string, unknown&gt;; }</code> | Public type alias for MCP Transport Spec. |
| `NormalizedMCPErrorCode` | type | <code>type NormalizedMCPErrorCode = (typeof NORMALIZED_MCP_ERROR_CODES)[number]</code> | Public type alias for Normalized MCP Error Code. |

## `GovernedMCPIntegrationSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowCapabilities` | property | <code>allowCapabilities: MCPAllowDenyRule[]</code> | Public allow Capabilities property. |
| `denyCapabilities` | property | <code>denyCapabilities: MCPAllowDenyRule[]</code> | Public deny Capabilities property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `driftPolicy` | property | <code>driftPolicy: MCPCapabilityDriftPolicySpec</code> | Public drift Policy property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `importPolicy` | property | <code>importPolicy: MCPImportPolicySpec</code> | Public import Policy property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `promptPolicyRefs` | property | <code>promptPolicyRefs: { id: string; version?: string; revision?: string; }[]</code> | Public prompt Policy Refs property. |
| `resourcePolicyRefs` | property | <code>resourcePolicyRefs: { id: string; version?: string; revision?: string; }[]</code> | Public resource Policy Refs property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `servers` | property | <code>servers: MCPServerProfile[]</code> | Public servers property. |
| `snapshotPolicy` | property | <code>snapshotPolicy: MCPContractSnapshotPolicySpec</code> | Public snapshot Policy property. |
| `toolPolicyRefs` | property | <code>toolPolicyRefs: { id: string; version?: string; revision?: string; }[]</code> | Public tool Policy Refs property. |
| `trustPolicy` | property | <code>trustPolicy: MCPTrustPolicySpec</code> | Public trust Policy property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `MCPAllowDenyRule` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityId` | property | <code>capabilityId: string</code> | Public capability Id property. |
| `kind` | property | <code>kind: "tool" &#124; "prompt" &#124; "resource"</code> | Public kind property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |

## `MCPCapabilityDriftPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `invalidateSchemaCache` | property | <code>invalidateSchemaCache: boolean</code> | Public invalidate Schema Cache property. |
| `notifyRuntime` | property | <code>notifyRuntime: boolean</code> | Public notify Runtime property. |
| `onDescriptionChange` | property | <code>onDescriptionChange: "quarantine" &#124; "accept" &#124; "snapshot_next_run"</code> | Public on Description Change property. |
| `onRemoval` | property | <code>onRemoval: "mark_unavailable" &#124; "allow_existing_run" &#124; "fail_existing_run"</code> | Public on Removal property. |
| `onSchemaChange` | property | <code>onSchemaChange: "quarantine" &#124; "snapshot_next_run" &#124; "require_approval"</code> | Public on Schema Change property. |
| `onServerIdentityChange` | property | <code>onServerIdentityChange: "quarantine" &#124; "disconnect"</code> | Public on Server Identity Change property. |

## `MCPCapabilityTrustRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvedAt` | property | <code>approvedAt: string</code> | Public approved At property. |
| `approvedBy` | property | <code>approvedBy: string</code> | Public approved By property. |
| `level` | property | <code>level: "trusted" &#124; "untrusted" &#124; "restricted"</code> | Public level property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `restrictions` | property | <code>restrictions: string[]</code> | Public restrictions property. |
| `source` | property | <code>source: "import" &#124; "admin" &#124; "domain_pack" &#124; "runtime_discovery" &#124; "signed_manifest"</code> | Public source property. |
| `sourceRef` | property | <code>sourceRef: string</code> | Public source Ref property. |

## `MCPContractSnapshotPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mode` | property | <code>mode: "run" &#124; "state"</code> | Public mode property. |
| `preserveRemovedForExistingRuns` | property | <code>preserveRemovedForExistingRuns: boolean</code> | Public preserve Removed For Existing Runs property. |
| `requireApprovedRevision` | property | <code>requireApprovedRevision: boolean</code> | Public require Approved Revision property. |

## `MCPImportPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kinds` | property | <code>kinds: ("tool" &#124; "prompt" &#124; "resource")[]</code> | Public kinds property. |
| `lazyLoad` | property | <code>lazyLoad: boolean</code> | Public lazy Load property. |
| `maxLoadedCapabilities` | property | <code>maxLoadedCapabilities: number</code> | Public max Loaded Capabilities property. |
| `schemaTokenBudget` | property | <code>schemaTokenBudget: number</code> | Public schema Token Budget property. |

## `MCPServerProfile` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authRef` | property | <code>authRef: string</code> | Public auth Ref property. |
| `autoConnect` | property | <code>autoConnect: boolean</code> | Public auto Connect property. |
| `contentPolicy` | property | <code>contentPolicy: { maxToolResultBytes?: number; maxResourceBytes?: number; maxPromptBytes?: number; maxPromptTokens?: number; oversizeAction?: "reject" &#124; "artifact"; }</code> | Public content Policy property. |
| `displayName` | property | <code>displayName: string</code> | Public display Name property. |
| `egressPolicy` | property | <code>egressPolicy: { allowedHosts?: string[]; denyPrivateNetworks?: boolean; requireTls?: boolean; maxRedirects?: number; allowCrossOriginRedirects?: boolean; }</code> | Public egress Policy property. |
| `environmentRefs` | property | <code>environmentRefs: string[]</code> | Public environment Refs property. |
| `expectedServerInfo` | property | <code>expectedServerInfo: Record&lt;string, unknown&gt;</code> | Public expected Server Info property. |
| `healthCheckPolicy` | property | <code>healthCheckPolicy: { intervalMs?: number; timeoutMs?: number; unhealthyThreshold?: number; }</code> | Public health Check Policy property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `initializationTimeoutMs` | property | <code>initializationTimeoutMs: number</code> | Public initialization Timeout Ms property. |
| `lazyConnect` | property | <code>lazyConnect: boolean</code> | Public lazy Connect property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `mode` | property | <code>mode: "local" &#124; "remote" &#124; "fixture"</code> | Public mode property. |
| `protocolVersionPolicy` | property | <code>protocolVersionPolicy: { allowedVersions?: string[]; preferLatest?: boolean; rejectUnknown?: boolean; }</code> | Public protocol Version Policy property. |
| `reconnectPolicy` | property | <code>reconnectPolicy: RetryPolicySpec</code> | Public reconnect Policy property. |
| `requestGuardPolicy` | property | <code>requestGuardPolicy: { maxConcurrentRequests?: number; rateLimit?: { maxRequests: number; windowMs: number; }; circuitBreaker?: { failureThreshold: number; resetAfterMs: number; }; }</code> | Public request Guard Policy property. |
| `requestTimeoutMs` | property | <code>requestTimeoutMs: number</code> | Public request Timeout Ms property. |
| `shutdownTimeoutMs` | property | <code>shutdownTimeoutMs: number</code> | Public shutdown Timeout Ms property. |
| `singleStart` | property | <code>singleStart: boolean</code> | Public single Start property. |
| `transport` | property | <code>transport: MCPTransportSpec</code> | Public transport property. |
| `version` | property | <code>version: string</code> | Public version property. |
| `workingDirectoryRef` | property | <code>workingDirectoryRef: string</code> | Public working Directory Ref property. |

## `MCPTrustPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowServerDeclaredSideEffectHints` | property | <code>allowServerDeclaredSideEffectHints: boolean</code> | Public allow Server Declared Side Effect Hints property. |
| `defaultTrustLevel` | property | <code>defaultTrustLevel: "trusted" &#124; "untrusted" &#124; "restricted"</code> | Public default Trust Level property. |
| `pinCapabilityHashes` | property | <code>pinCapabilityHashes: boolean</code> | Public pin Capability Hashes property. |
| `pinProtocolVersion` | property | <code>pinProtocolVersion: boolean</code> | Public pin Protocol Version property. |
| `pinServerIdentity` | property | <code>pinServerIdentity: boolean</code> | Public pin Server Identity property. |
| `requireAdminApprovalForNewServer` | property | <code>requireAdminApprovalForNewServer: boolean</code> | Public require Admin Approval For New Server property. |
| `requireApprovalForNewCapability` | property | <code>requireApprovalForNewCapability: boolean</code> | Public require Approval For New Capability property. |
| `requireApprovalForSchemaChange` | property | <code>requireApprovalForSchemaChange: boolean</code> | Public require Approval For Schema Change property. |
| `trustedSourceRefs` | property | <code>trustedSourceRefs: string[]</code> | Public trusted Source Refs property. |

## `NormalizedMCPError` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityId` | property | <code>capabilityId: string</code> | Public capability Id property. |
| `code` | property | <code>code: "MCP_SERVER_NOT_FOUND" &#124; "MCP_CONNECTION_FAILED" &#124; "MCP_INITIALIZATION_FAILED" &#124; "MCP_PROTOCOL_MISMATCH" &#124; "MCP_REQUEST_TIMEOUT" &#124; "MCP_REQUEST_CANCELLED" &#124; "MCP_CAPABILITY_NOT_FOUND" &#124; "MCP_CAPABILITY_QUARANTINED" &#124; "MCP_CAPABILITY_DRIFT" &#124; "MCP_SCHEMA_INVALID" &#124; "MCP_AUTH_FAILED" &#124; "MCP_BULKHEAD_REJECTED" &#124; "MCP_RATE_LIMITED" &#124; "MCP_CIRCUIT_OPEN" &#124; "MCP_EGRESS_DENIED" &#124; "MCP_CONTENT_TOO_LARGE" &#124; "MCP_REMOT...</code> | Public code property. |
| `details` | property | <code>details: Record&lt;string, unknown&gt;</code> | Public details property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `remoteCode` | property | <code>remoteCode: string &#124; number</code> | Public remote Code property. |
| `retryable` | property | <code>retryable: boolean</code> | Public retryable property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |
