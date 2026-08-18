# `@codesoul-co/hypha-mcp` / `connection-manager`

- 包索引: [`@codesoul-co/hypha-mcp`](/zh/api/mcp)
- 模块指南: [学习与组合说明](/zh/packages/mcp)
- 源码: [`packages/mcp/src/connection-manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)
- 导出数: **18**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MCPConnectionManager` | 类 | <code>new MCPConnectionManager(options: MCPConnectionManagerOptions): MCPConnectionManager</code> | MCP Connection Manager 的运行时实现；公开构造函数与成员见下表。 |
| `SDKMCPConnectionSessionFactory` | 类 | <code>new SDKMCPConnectionSessionFactory(options?: SDKMCPConnectionSessionFactoryOptions): SDKMCPConnectionSessionFactory</code> | SDKMCP Connection Session Factory 的运行时实现；公开构造函数与成员见下表。 |
| `mcpConnectionRecordDefinition` | 常量 | <code>const mcpConnectionRecordDefinition: SpecSchemaDefinition&lt;MCPConnectionRecord&gt;</code> | 由 `connection-manager` 模块导出的 mcp Connection Record Definition 常量。 |
| `mcpConnectionRecordExample` | 常量 | <code>const mcpConnectionRecordExample: MCPConnectionRecord</code> | mcp Connection Record 的有效示例值。 |
| `mcpConnectionRecordJsonSchema` | 常量 | <code>const mcpConnectionRecordJsonSchema: JsonSchema</code> | mcp Connection Record 的 JSON Schema。 |
| `mcpConnectionRecordSchema` | 常量 | <code>const mcpConnectionRecordSchema: z.ZodObject&lt;{ id: z.ZodString; serverId: z.ZodString; revision: z.ZodNumber; state: z.ZodEnum&lt;["disconnected", "starting", "initializing", "ready", "degraded", "reconnecting", "closing", "closed", "failed"]&gt;; transportType: z.ZodEnum&lt;["stdio", "streamable_http", "custom"]&gt;; negotiatedProtocolVersion: z.ZodOptional&lt;z.ZodString&gt;; clientInfo: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.Z...</code> | mcp Connection Record 的运行时 Schema。 |
| `assertRemoteEgressAllowed` | 函数 | <code>assertRemoteEgressAllowed(endpoint: string, policy: MCPServerProfile["egressPolicy"]): Promise&lt;void&gt;</code> | 断言 Remote Egress Allowed。 |
| `createGuardedMCPFetch` | 函数 | <code>createGuardedMCPFetch(options?: GuardedMCPFetchOptions): MCPFetch</code> | Applies the remote MCP egress policy to every request and redirect hop. Credentials are resolved immediately before each request so rotations take effect without rebuilding declarative profiles. |
| `GuardedMCPFetchOptions` | 接口 | <code>interface GuardedMCPFetchOptions</code> | Guarded MCP Fetch Options 的字段契约；完整字段见下表。 |
| `MCPConnectionManagerOptions` | 接口 | <code>interface MCPConnectionManagerOptions</code> | MCP Connection Manager Options 的字段契约；完整字段见下表。 |
| `MCPConnectionRecord` | 接口 | <code>interface MCPConnectionRecord</code> | MCP Connection Record 的字段契约；完整字段见下表。 |
| `MCPConnectionSession` | 接口 | <code>interface MCPConnectionSession</code> | MCP Connection Session 的字段契约；完整字段见下表。 |
| `MCPConnectionSessionFactory` | 接口 | <code>interface MCPConnectionSessionFactory</code> | MCP Connection Session Factory 的字段契约；完整字段见下表。 |
| `MCPConnectionStatus` | 接口 | <code>interface MCPConnectionStatus</code> | MCP Connection Status 的字段契约；完整字段见下表。 |
| `MCPRemoteContentArtifact` | 接口 | <code>interface MCPRemoteContentArtifact</code> | MCP Remote Content Artifact 的字段契约；完整字段见下表。 |
| `MCPRemoteContentArtifactPort` | 接口 | <code>interface MCPRemoteContentArtifactPort</code> | MCP Remote Content Artifact Port 的字段契约；完整字段见下表。 |
| `SDKMCPConnectionSessionFactoryOptions` | 接口 | <code>interface SDKMCPConnectionSessionFactoryOptions</code> | SDKMCP Connection Session Factory Options 的字段契约；完整字段见下表。 |
| `MCPConnectionState` | 类型 | <code>type MCPConnectionState = 'disconnected' &#124; 'starting' &#124; 'initializing' &#124; 'ready' &#124; 'degraded' &#124; 'reconnecting' &#124; 'closing' &#124; 'closed' &#124; 'failed'</code> | MCP Connection State 的公共类型别名。 |

## `MCPConnectionManager` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `call` | 方法 | <code>call(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | call 的公开运行时操作。 |
| `cancelRequest` | 方法 | <code>cancelRequest(requestId: string): Promise&lt;void&gt;</code> | 取消 Request。 |
| `closeAll` | 方法 | <code>closeAll(): Promise&lt;void&gt;</code> | close All 的公开运行时操作。 |
| `connect` | 方法 | <code>connect(serverId: string): Promise&lt;MCPConnectionRecord&gt;</code> | connect 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: MCPConnectionManagerOptions): MCPConnectionManager</code> | 创建该类的实例。 |
| `disconnect` | 方法 | <code>disconnect(serverId: string, reason?: string): Promise&lt;void&gt;</code> | disconnect 的公开运行时操作。 |
| `discover` | 方法 | <code>discover(integration: MCPIntegrationSpec): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | discover 的公开运行时操作。 |
| `get` | 方法 | <code>get(serverId: string): Promise&lt;MCPConnectionRecord &#124; null&gt;</code> | 读取 get。 |
| `getPrompt` | 方法 | <code>getPrompt(request: MCPPromptRequest): Promise&lt;MCPPromptResult&gt;</code> | 读取 Prompt。 |
| `health` | 方法 | <code>health(serverId?: string): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | health 的公开运行时操作。 |
| `normalize` | 方法 | <code>normalize(capability: MCPCapabilityDescriptor): Promise&lt;NormalizedMCPCapability&gt;</code> | 规范化 normalize。 |
| `onListChanged` | 方法 | <code>onListChanged(listener: (serverId: string) =&gt; Promise&lt;void&gt; &#124; void): () =&gt; void</code> | 处理 List Changed。 |
| `readResource` | 方法 | <code>readResource(request: MCPResourceReadRequest): Promise&lt;MCPResourceResult&gt;</code> | read Resource 的公开运行时操作。 |
| `reconnect` | 方法 | <code>reconnect(serverId: string): Promise&lt;MCPConnectionRecord&gt;</code> | reconnect 的公开运行时操作。 |
| `register` | 方法 | <code>register(profile: MCPServerProfile): MCPConnectionRecord</code> | 注册 register。 |
| `status` | 方法 | <code>status(serverId: string): Promise&lt;MCPConnectionStatus&gt;</code> | status 的公开运行时操作。 |

## `SDKMCPConnectionSessionFactory` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: SDKMCPConnectionSessionFactoryOptions): SDKMCPConnectionSessionFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(profile: MCPServerProfile): MCPConnectionSession</code> | 创建 create。 |

## `GuardedMCPFetchOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fetch` | 方法 | <code>fetch(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | fetch 的公开运行时操作。 |
| `policy` | 属性 | <code>policy: { allowedHosts?: string[]; denyPrivateNetworks?: boolean; requireTls?: boolean; maxRedirects?: number; allowCrossOriginRedirects?: boolean; }</code> | policy 字段。 |
| `resolveAuthorization` | 方法 | <code>resolveAuthorization(): Promise&lt;string &#124; undefined&gt; &#124; string &#124; undefined</code> | 解析 Authorization。 |
| `resolveHeaders` | 方法 | <code>resolveHeaders(): Promise&lt;Record&lt;string, string&gt;&gt; &#124; Record&lt;string, string&gt;</code> | 解析 Headers。 |

## `MCPConnectionManagerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentArtifacts` | 属性 | <code>contentArtifacts: MCPRemoteContentArtifactPort</code> | content Artifacts 字段。 |
| `monotonicNow` | 方法 | <code>monotonicNow(): number</code> | monotonic Now 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `onListChanged` | 方法 | <code>onListChanged(serverId: string): Promise&lt;void&gt; &#124; void</code> | 处理 List Changed。 |
| `random` | 方法 | <code>random(): number</code> | random 的公开运行时操作。 |
| `reconnectCoordinator` | 属性 | <code>reconnectCoordinator: MCPReconnectCoordinator</code> | reconnect Coordinator 字段。 |
| `reconnectOwnerId` | 属性 | <code>reconnectOwnerId: string</code> | reconnect Owner Id 字段。 |
| `sessionFactory` | 属性 | <code>sessionFactory: MCPConnectionSessionFactory</code> | session Factory 字段。 |
| `sleep` | 方法 | <code>sleep(ms: number): Promise&lt;void&gt;</code> | sleep 的公开运行时操作。 |
| `telemetry` | 属性 | <code>telemetry: TelemetryRecorder</code> | telemetry 字段。 |
| `trace` | 属性 | <code>trace: TraceRecorder</code> | trace 字段。 |
| `traceContext` | 属性 | <code>traceContext: { runId: string; stepId?: string; sessionId?: string; }</code> | trace Context 字段。 |

## `MCPConnectionRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeRequestCount` | 属性 | <code>activeRequestCount: number</code> | active Request Count 字段。 |
| `clientInfo` | 属性 | <code>clientInfo: Record&lt;string, unknown&gt;</code> | client Info 字段。 |
| `closedAt` | 属性 | <code>closedAt: string</code> | closed At 字段。 |
| `error` | 属性 | <code>error: NormalizedMCPError</code> | error 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `lastActivityAt` | 属性 | <code>lastActivityAt: string</code> | last Activity At 字段。 |
| `lastHealthCheckAt` | 属性 | <code>lastHealthCheckAt: string</code> | last Health Check At 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `negotiatedProtocolVersion` | 属性 | <code>negotiatedProtocolVersion: string</code> | negotiated Protocol Version 字段。 |
| `readyAt` | 属性 | <code>readyAt: string</code> | ready At 字段。 |
| `reconnectAttempts` | 属性 | <code>reconnectAttempts: number</code> | reconnect Attempts 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `serverCapabilities` | 属性 | <code>serverCapabilities: Record&lt;string, unknown&gt;</code> | server Capabilities 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |
| `serverInfo` | 属性 | <code>serverInfo: Record&lt;string, unknown&gt;</code> | server Info 字段。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | started At 字段。 |
| `state` | 属性 | <code>state: MCPConnectionState</code> | state 字段。 |
| `transportType` | 属性 | <code>transportType: "custom" &#124; "stdio" &#124; "streamable_http"</code> | transport Type 字段。 |

## `MCPConnectionSession` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `callTool` | 方法 | <code>callTool(capabilityId: string, input: unknown, options?: { signal?: AbortSignal; timeoutMs?: number; onProgress?: (progress: unknown) =&gt; void; }): Promise&lt;unknown&gt;</code> | call Tool 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `connect` | 方法 | <code>connect(signal?: AbortSignal): Promise&lt;{ negotiatedProtocolVersion?: string; serverInfo?: Record&lt;string, unknown&gt;; serverCapabilities?: Record&lt;string, unknown&gt;; }&gt;</code> | connect 的公开运行时操作。 |
| `getPrompt` | 方法 | <code>getPrompt(name: string, args?: Record&lt;string, string&gt;, options?: { signal?: AbortSignal; timeoutMs?: number; }): Promise&lt;MCPPromptResult&gt;</code> | 读取 Prompt。 |
| `listCapabilities` | 方法 | <code>listCapabilities(signal?: AbortSignal): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | 列出 Capabilities。 |
| `onClose` | 方法 | <code>onClose(error?: Error): void</code> | 处理 Close。 |
| `onListChanged` | 方法 | <code>onListChanged(): void</code> | 处理 List Changed。 |
| `ping` | 方法 | <code>ping(signal?: AbortSignal): Promise&lt;void&gt;</code> | ping 的公开运行时操作。 |
| `readResource` | 方法 | <code>readResource(uri: string, options?: { signal?: AbortSignal; timeoutMs?: number; }): Promise&lt;MCPResourceResult&gt;</code> | read Resource 的公开运行时操作。 |

## `MCPConnectionSessionFactory` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(profile: MCPServerProfile): MCPConnectionSession</code> | 创建 create。 |

## `MCPConnectionStatus` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `health` | 属性 | <code>health: ProviderHealth</code> | health 字段。 |
| `record` | 属性 | <code>record: MCPConnectionRecord</code> | record 字段。 |

## `MCPRemoteContentArtifact` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | artifact Ref 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |

## `MCPRemoteContentArtifactPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `store` | 方法 | <code>store(input: { serverId: string; kind: "resource" &#124; "prompt"; capabilityId: string; mediaType: string; bytes: Uint8Array; contentHash: string; provenance: Record&lt;string, unknown&gt;; }): Promise&lt;MCPRemoteContentArtifact&gt;</code> | store 的公开运行时操作。 |

## `SDKMCPConnectionSessionFactoryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clientInfo` | 属性 | <code>clientInfo: { name: string; version: string; }</code> | client Info 字段。 |
| `resolveAuthorizationRef` | 方法 | <code>resolveAuthorizationRef(ref: string): Promise&lt;string&gt; &#124; string</code> | 解析 Authorization Ref。 |
| `resolveEnvironmentRefs` | 方法 | <code>resolveEnvironmentRefs(refs: string[]): Promise&lt;Record&lt;string, string&gt;&gt; &#124; Record&lt;string, string&gt;</code> | 解析 Environment Refs。 |
| `resolveHeadersRef` | 方法 | <code>resolveHeadersRef(ref: string): Promise&lt;Record&lt;string, string&gt;&gt; &#124; Record&lt;string, string&gt;</code> | 解析 Headers Ref。 |
| `resolveWorkingDirectoryRef` | 方法 | <code>resolveWorkingDirectoryRef(ref: string): Promise&lt;string&gt; &#124; string</code> | 解析 Working Directory Ref。 |
