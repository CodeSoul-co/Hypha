# `@codesoul-co/hypha-mcp` / `connection-manager`

- Package index: [`@codesoul-co/hypha-mcp`](/api/mcp)
- Package guide: [learning and composition guide](/packages/mcp)
- Source: [`packages/mcp/src/connection-manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)
- Exports: **18**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MCPConnectionManager` | class | <code>new MCPConnectionManager(options: MCPConnectionManagerOptions): MCPConnectionManager</code> | Runtime implementation for MCP Connection Manager; see its public constructor and members below. |
| `SDKMCPConnectionSessionFactory` | class | <code>new SDKMCPConnectionSessionFactory(options?: SDKMCPConnectionSessionFactoryOptions): SDKMCPConnectionSessionFactory</code> | Runtime implementation for SDKMCP Connection Session Factory; see its public constructor and members below. |
| `mcpConnectionRecordDefinition` | constant | <code>const mcpConnectionRecordDefinition: SpecSchemaDefinition&lt;MCPConnectionRecord&gt;</code> | mcp Connection Record Definition constant exported by the `connection-manager` module. |
| `mcpConnectionRecordExample` | constant | <code>const mcpConnectionRecordExample: MCPConnectionRecord</code> | Valid example value for mcp Connection Record. |
| `mcpConnectionRecordJsonSchema` | constant | <code>const mcpConnectionRecordJsonSchema: JsonSchema</code> | JSON Schema for mcp Connection Record. |
| `mcpConnectionRecordSchema` | constant | <code>const mcpConnectionRecordSchema: z.ZodObject&lt;{ id: z.ZodString; serverId: z.ZodString; revision: z.ZodNumber; state: z.ZodEnum&lt;["disconnected", "starting", "initializing", "ready", "degraded", "reconnecting", "closing", "closed", "failed"]&gt;; transportType: z.ZodEnum&lt;["stdio", "streamable_http", "custom"]&gt;; negotiatedProtocolVersion: z.ZodOptional&lt;z.ZodString&gt;; clientInfo: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.Z...</code> | Runtime schema for mcp Connection Record. |
| `assertRemoteEgressAllowed` | function | <code>assertRemoteEgressAllowed(endpoint: string, policy: MCPServerProfile["egressPolicy"]): Promise&lt;void&gt;</code> | Asserts Remote Egress Allowed at this module boundary. |
| `createGuardedMCPFetch` | function | <code>createGuardedMCPFetch(options?: GuardedMCPFetchOptions): MCPFetch</code> | Applies the remote MCP egress policy to every request and redirect hop. Credentials are resolved immediately before each request so rotations take effect without rebuilding declarative profiles. |
| `GuardedMCPFetchOptions` | interface | <code>interface GuardedMCPFetchOptions</code> | Field contract for Guarded MCP Fetch Options; see all contract members below. |
| `MCPConnectionManagerOptions` | interface | <code>interface MCPConnectionManagerOptions</code> | Field contract for MCP Connection Manager Options; see all contract members below. |
| `MCPConnectionRecord` | interface | <code>interface MCPConnectionRecord</code> | Field contract for MCP Connection Record; see all contract members below. |
| `MCPConnectionSession` | interface | <code>interface MCPConnectionSession</code> | Field contract for MCP Connection Session; see all contract members below. |
| `MCPConnectionSessionFactory` | interface | <code>interface MCPConnectionSessionFactory</code> | Field contract for MCP Connection Session Factory; see all contract members below. |
| `MCPConnectionStatus` | interface | <code>interface MCPConnectionStatus</code> | Field contract for MCP Connection Status; see all contract members below. |
| `MCPRemoteContentArtifact` | interface | <code>interface MCPRemoteContentArtifact</code> | Field contract for MCP Remote Content Artifact; see all contract members below. |
| `MCPRemoteContentArtifactPort` | interface | <code>interface MCPRemoteContentArtifactPort</code> | Field contract for MCP Remote Content Artifact Port; see all contract members below. |
| `SDKMCPConnectionSessionFactoryOptions` | interface | <code>interface SDKMCPConnectionSessionFactoryOptions</code> | Field contract for SDKMCP Connection Session Factory Options; see all contract members below. |
| `MCPConnectionState` | type | <code>type MCPConnectionState = 'disconnected' &#124; 'starting' &#124; 'initializing' &#124; 'ready' &#124; 'degraded' &#124; 'reconnecting' &#124; 'closing' &#124; 'closed' &#124; 'failed'</code> | Public type alias for MCP Connection State. |

## `MCPConnectionManager` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `call` | method | <code>call(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | Public runtime operation for call. |
| `cancelRequest` | method | <code>cancelRequest(requestId: string): Promise&lt;void&gt;</code> | Cancels Request at this module boundary. |
| `closeAll` | method | <code>closeAll(): Promise&lt;void&gt;</code> | Public runtime operation for close All. |
| `connect` | method | <code>connect(serverId: string): Promise&lt;MCPConnectionRecord&gt;</code> | Public runtime operation for connect. |
| `constructor` | constructor | <code>(options: MCPConnectionManagerOptions): MCPConnectionManager</code> | Creates an instance of this class. |
| `disconnect` | method | <code>disconnect(serverId: string, reason?: string): Promise&lt;void&gt;</code> | Public runtime operation for disconnect. |
| `discover` | method | <code>discover(integration: MCPIntegrationSpec): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | Public runtime operation for discover. |
| `get` | method | <code>get(serverId: string): Promise&lt;MCPConnectionRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `getPrompt` | method | <code>getPrompt(request: MCPPromptRequest): Promise&lt;MCPPromptResult&gt;</code> | Gets Prompt at this module boundary. |
| `health` | method | <code>health(serverId?: string): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | Public runtime operation for health. |
| `normalize` | method | <code>normalize(capability: MCPCapabilityDescriptor): Promise&lt;NormalizedMCPCapability&gt;</code> | Normalizes normalize at this module boundary. |
| `onListChanged` | method | <code>onListChanged(listener: (serverId: string) =&gt; Promise&lt;void&gt; &#124; void): () =&gt; void</code> | Handles List Changed at this module boundary. |
| `readResource` | method | <code>readResource(request: MCPResourceReadRequest): Promise&lt;MCPResourceResult&gt;</code> | Public runtime operation for read Resource. |
| `reconnect` | method | <code>reconnect(serverId: string): Promise&lt;MCPConnectionRecord&gt;</code> | Public runtime operation for reconnect. |
| `register` | method | <code>register(profile: MCPServerProfile): MCPConnectionRecord</code> | Registers register at this module boundary. |
| `status` | method | <code>status(serverId: string): Promise&lt;MCPConnectionStatus&gt;</code> | Public runtime operation for status. |

## `SDKMCPConnectionSessionFactory` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: SDKMCPConnectionSessionFactoryOptions): SDKMCPConnectionSessionFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(profile: MCPServerProfile): MCPConnectionSession</code> | Creates create at this module boundary. |

## `GuardedMCPFetchOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fetch` | method | <code>fetch(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | Public runtime operation for fetch. |
| `policy` | property | <code>policy: { allowedHosts?: string[]; denyPrivateNetworks?: boolean; requireTls?: boolean; maxRedirects?: number; allowCrossOriginRedirects?: boolean; }</code> | Public policy property. |
| `resolveAuthorization` | method | <code>resolveAuthorization(): Promise&lt;string &#124; undefined&gt; &#124; string &#124; undefined</code> | Resolves Authorization at this module boundary. |
| `resolveHeaders` | method | <code>resolveHeaders(): Promise&lt;Record&lt;string, string&gt;&gt; &#124; Record&lt;string, string&gt;</code> | Resolves Headers at this module boundary. |

## `MCPConnectionManagerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentArtifacts` | property | <code>contentArtifacts: MCPRemoteContentArtifactPort</code> | Public content Artifacts property. |
| `monotonicNow` | method | <code>monotonicNow(): number</code> | Public runtime operation for monotonic Now. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `onListChanged` | method | <code>onListChanged(serverId: string): Promise&lt;void&gt; &#124; void</code> | Handles List Changed at this module boundary. |
| `random` | method | <code>random(): number</code> | Public runtime operation for random. |
| `reconnectCoordinator` | property | <code>reconnectCoordinator: MCPReconnectCoordinator</code> | Public reconnect Coordinator property. |
| `reconnectOwnerId` | property | <code>reconnectOwnerId: string</code> | Public reconnect Owner Id property. |
| `sessionFactory` | property | <code>sessionFactory: MCPConnectionSessionFactory</code> | Public session Factory property. |
| `sleep` | method | <code>sleep(ms: number): Promise&lt;void&gt;</code> | Public runtime operation for sleep. |
| `telemetry` | property | <code>telemetry: TelemetryRecorder</code> | Public telemetry property. |
| `trace` | property | <code>trace: TraceRecorder</code> | Public trace property. |
| `traceContext` | property | <code>traceContext: { runId: string; stepId?: string; sessionId?: string; }</code> | Public trace Context property. |

## `MCPConnectionRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeRequestCount` | property | <code>activeRequestCount: number</code> | Public active Request Count property. |
| `clientInfo` | property | <code>clientInfo: Record&lt;string, unknown&gt;</code> | Public client Info property. |
| `closedAt` | property | <code>closedAt: string</code> | Public closed At property. |
| `error` | property | <code>error: NormalizedMCPError</code> | Public error property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `lastActivityAt` | property | <code>lastActivityAt: string</code> | Public last Activity At property. |
| `lastHealthCheckAt` | property | <code>lastHealthCheckAt: string</code> | Public last Health Check At property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `negotiatedProtocolVersion` | property | <code>negotiatedProtocolVersion: string</code> | Public negotiated Protocol Version property. |
| `readyAt` | property | <code>readyAt: string</code> | Public ready At property. |
| `reconnectAttempts` | property | <code>reconnectAttempts: number</code> | Public reconnect Attempts property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `serverCapabilities` | property | <code>serverCapabilities: Record&lt;string, unknown&gt;</code> | Public server Capabilities property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |
| `serverInfo` | property | <code>serverInfo: Record&lt;string, unknown&gt;</code> | Public server Info property. |
| `startedAt` | property | <code>startedAt: string</code> | Public started At property. |
| `state` | property | <code>state: MCPConnectionState</code> | Public state property. |
| `transportType` | property | <code>transportType: "custom" &#124; "stdio" &#124; "streamable_http"</code> | Public transport Type property. |

## `MCPConnectionSession` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `callTool` | method | <code>callTool(capabilityId: string, input: unknown, options?: { signal?: AbortSignal; timeoutMs?: number; onProgress?: (progress: unknown) =&gt; void; }): Promise&lt;unknown&gt;</code> | Public runtime operation for call Tool. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `connect` | method | <code>connect(signal?: AbortSignal): Promise&lt;{ negotiatedProtocolVersion?: string; serverInfo?: Record&lt;string, unknown&gt;; serverCapabilities?: Record&lt;string, unknown&gt;; }&gt;</code> | Public runtime operation for connect. |
| `getPrompt` | method | <code>getPrompt(name: string, args?: Record&lt;string, string&gt;, options?: { signal?: AbortSignal; timeoutMs?: number; }): Promise&lt;MCPPromptResult&gt;</code> | Gets Prompt at this module boundary. |
| `listCapabilities` | method | <code>listCapabilities(signal?: AbortSignal): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | Lists Capabilities at this module boundary. |
| `onClose` | method | <code>onClose(error?: Error): void</code> | Handles Close at this module boundary. |
| `onListChanged` | method | <code>onListChanged(): void</code> | Handles List Changed at this module boundary. |
| `ping` | method | <code>ping(signal?: AbortSignal): Promise&lt;void&gt;</code> | Public runtime operation for ping. |
| `readResource` | method | <code>readResource(uri: string, options?: { signal?: AbortSignal; timeoutMs?: number; }): Promise&lt;MCPResourceResult&gt;</code> | Public runtime operation for read Resource. |

## `MCPConnectionSessionFactory` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(profile: MCPServerProfile): MCPConnectionSession</code> | Creates create at this module boundary. |

## `MCPConnectionStatus` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `health` | property | <code>health: ProviderHealth</code> | Public health property. |
| `record` | property | <code>record: MCPConnectionRecord</code> | Public record property. |

## `MCPRemoteContentArtifact` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public artifact Ref property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |

## `MCPRemoteContentArtifactPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `store` | method | <code>store(input: { serverId: string; kind: "resource" &#124; "prompt"; capabilityId: string; mediaType: string; bytes: Uint8Array; contentHash: string; provenance: Record&lt;string, unknown&gt;; }): Promise&lt;MCPRemoteContentArtifact&gt;</code> | Public runtime operation for store. |

## `SDKMCPConnectionSessionFactoryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clientInfo` | property | <code>clientInfo: { name: string; version: string; }</code> | Public client Info property. |
| `resolveAuthorizationRef` | method | <code>resolveAuthorizationRef(ref: string): Promise&lt;string&gt; &#124; string</code> | Resolves Authorization Ref at this module boundary. |
| `resolveEnvironmentRefs` | method | <code>resolveEnvironmentRefs(refs: string[]): Promise&lt;Record&lt;string, string&gt;&gt; &#124; Record&lt;string, string&gt;</code> | Resolves Environment Refs at this module boundary. |
| `resolveHeadersRef` | method | <code>resolveHeadersRef(ref: string): Promise&lt;Record&lt;string, string&gt;&gt; &#124; Record&lt;string, string&gt;</code> | Resolves Headers Ref at this module boundary. |
| `resolveWorkingDirectoryRef` | method | <code>resolveWorkingDirectoryRef(ref: string): Promise&lt;string&gt; &#124; string</code> | Resolves Working Directory Ref at this module boundary. |
