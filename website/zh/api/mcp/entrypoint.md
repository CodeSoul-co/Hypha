# `@codesoul-co/hypha-mcp` / `index`

- 包索引: [`@codesoul-co/hypha-mcp`](/zh/api/mcp)
- 模块指南: [学习与组合说明](/zh/packages/mcp)
- 源码: [`packages/mcp/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)
- 导出数: **32**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MockMCPGateway` | 类 | <code>new MockMCPGateway(capabilities?: MCPCapabilityDescriptor[]): MockMCPGateway</code> | Mock MCP Gateway 的运行时实现；公开构造函数与成员见下表。 |
| `classicMCPCapabilityDescriptors` | 常量 | <code>const classicMCPCapabilityDescriptors: MCPCapabilityDescriptor[]</code> | 由 `index` 模块导出的 classic MCP Capability Descriptors 常量。 |
| `classicMCPIntegrationSpec` | 常量 | <code>const classicMCPIntegrationSpec: MCPIntegrationSpec</code> | 由 `index` 模块导出的 classic MCP Integration Spec 常量。 |
| `mcpCapabilityDescriptorSchema` | 常量 | <code>const mcpCapabilityDescriptorSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { serverId: z.ZodString; capabilityId: z.ZodString; type: z.ZodEnum&lt;["tool"...</code> | mcp Capability Descriptor 的运行时 Schema。 |
| `mcpIntegrationSpecDefinition` | 常量 | <code>const mcpIntegrationSpecDefinition: SpecSchemaDefinition&lt;MCPIntegrationSpec&gt;</code> | mcp Integration Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `mcpIntegrationSpecExample` | 常量 | <code>const mcpIntegrationSpecExample: MCPIntegrationSpec</code> | mcp Integration Spec 的有效示例值。 |
| `mcpIntegrationSpecJsonSchema` | 常量 | <code>const mcpIntegrationSpecJsonSchema: JsonSchema</code> | mcp Integration Spec 的 JSON Schema。 |
| `mcpIntegrationSpecSchema` | 常量 | <code>const mcpIntegrationSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; servers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; mode: z.ZodEnum&lt;["local", "remote"]&gt;; version: z.ZodOptional&lt;z.ZodString&gt;; endpoint: z.ZodOptional&lt;z.ZodString&gt;; command: z.ZodOptional&lt;z.ZodString&gt;; args: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { id: string; mode: "local" &#124; "remote"; version?: s...</code> | mcp Integration Spec 的运行时 Schema。 |
| `mcpServerSpecSchema` | 常量 | <code>const mcpServerSpecSchema: z.ZodObject&lt;{ id: z.ZodString; mode: z.ZodEnum&lt;["local", "remote"]&gt;; version: z.ZodOptional&lt;z.ZodString&gt;; endpoint: z.ZodOptional&lt;z.ZodString&gt;; command: z.ZodOptional&lt;z.ZodString&gt;; args: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { id: string; mode: "local" &#124; "remote"; version?: string &#124; undefined; endpoint?: string &#124; undefined; command?: string &#124; undefined...</code> | mcp Server Spec 的运行时 Schema。 |
| `mcpSpecDefinitions` | 常量 | <code>const mcpSpecDefinitions: readonly [SpecSchemaDefinition&lt;MCPIntegrationSpec&gt;]</code> | 由 `index` 模块导出的 mcp Spec Definitions 常量。 |
| `mcpSpecJsonSchemas` | 常量 | <code>const mcpSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 mcp Spec Json Schemas 常量。 |
| `createClassicMCPMockGateway` | 函数 | <code>createClassicMCPMockGateway(options?: ClassicMCPMockGatewayOptions): MockMCPGateway</code> | 创建 Classic MCP Mock Gateway。 |
| `normalizeMCPToolSpec` | 函数 | <code>normalizeMCPToolSpec(capability: MCPCapabilityDescriptor): ToolSpec</code> | 规范化 MCP Tool Spec。 |
| `registerMCPGatewayTools` | 函数 | <code>registerMCPGatewayTools(options: MCPGatewayToolRegistrationOptions): Promise&lt;MCPGatewayToolRegistrationResult&gt;</code> | 注册 MCP Gateway Tools。 |
| `validateMCPIntegrationSpec` | 函数 | <code>validateMCPIntegrationSpec(input: unknown): MCPIntegrationSpec</code> | 校验 MCP Integration Spec。 |
| `ClassicMCPFetchResponse` | 接口 | <code>interface ClassicMCPFetchResponse</code> | Classic MCP Fetch Response 的字段契约；完整字段见下表。 |
| `ClassicMCPMockGatewayOptions` | 接口 | <code>interface ClassicMCPMockGatewayOptions</code> | Classic MCP Mock Gateway Options 的字段契约；完整字段见下表。 |
| `ClassicMCPSearchResult` | 接口 | <code>interface ClassicMCPSearchResult</code> | Classic MCP Search Result 的字段契约；完整字段见下表。 |
| `MCPCapabilityDescriptor` | 接口 | <code>interface MCPCapabilityDescriptor extends VersionedSpec, SpecMetadata</code> | MCP Capability Descriptor 的字段契约；完整字段见下表。 |
| `MCPGateway` | 接口 | <code>interface MCPGateway</code> | MCP Gateway 的字段契约；完整字段见下表。 |
| `MCPGatewayToolRegistrationContext` | 接口 | <code>interface MCPGatewayToolRegistrationContext</code> | MCP Gateway Tool Registration Context 的字段契约；完整字段见下表。 |
| `MCPGatewayToolRegistrationOptions` | 接口 | <code>interface MCPGatewayToolRegistrationOptions</code> | MCP Gateway Tool Registration Options 的字段契约；完整字段见下表。 |
| `MCPGatewayToolRegistrationResult` | 接口 | <code>interface MCPGatewayToolRegistrationResult</code> | MCP Gateway Tool Registration Result 的字段契约；完整字段见下表。 |
| `MCPIntegrationSpec` | 接口 | <code>interface MCPIntegrationSpec</code> | MCP Integration Spec 的字段契约；完整字段见下表。 |
| `MCPPromptRequest` | 接口 | <code>interface MCPPromptRequest</code> | MCP Prompt Request 的字段契约；完整字段见下表。 |
| `MCPPromptResult` | 接口 | <code>interface MCPPromptResult</code> | MCP Prompt Result 的字段契约；完整字段见下表。 |
| `MCPResourceReadRequest` | 接口 | <code>interface MCPResourceReadRequest</code> | MCP Resource Read Request 的字段契约；完整字段见下表。 |
| `MCPResourceResult` | 接口 | <code>interface MCPResourceResult</code> | MCP Resource Result 的字段契约；完整字段见下表。 |
| `MCPServerSpec` | 接口 | <code>interface MCPServerSpec</code> | MCP Server Spec 的字段契约；完整字段见下表。 |
| `MCPToolCallRequest` | 接口 | <code>interface MCPToolCallRequest</code> | MCP Tool Call Request 的字段契约；完整字段见下表。 |
| `NormalizedMCPCapability` | 接口 | <code>interface NormalizedMCPCapability</code> | Normalized MCP Capability 的字段契约；完整字段见下表。 |
| `MCPToolHandler` | 类型 | <code>type MCPToolHandler = (request: MCPToolCallRequest&lt;TInput&gt;) =&gt; Promise&lt;TOutput&gt; &#124; TOutput</code> | MCP Tool Handler 的公共类型别名。 |

## `MockMCPGateway` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `call` | 方法 | <code>call(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | call 的公开运行时操作。 |
| `callTool` | 方法 | <code>callTool(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | call Tool 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(capabilities?: MCPCapabilityDescriptor[]): MockMCPGateway</code> | 创建该类的实例。 |
| `discover` | 方法 | <code>discover(integration: MCPIntegrationSpec): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | discover 的公开运行时操作。 |
| `getPrompt` | 方法 | <code>getPrompt(request: MCPPromptRequest): Promise&lt;MCPPromptResult&gt;</code> | 读取 Prompt。 |
| `health` | 方法 | <code>health(serverId?: string): Promise&lt;Record&lt;string, import("@codesoul-co/hypha-tools").ProviderHealth&gt;&gt;</code> | health 的公开运行时操作。 |
| `normalize` | 方法 | <code>normalize(capability: MCPCapabilityDescriptor): Promise&lt;NormalizedMCPCapability&gt;</code> | 规范化 normalize。 |
| `readResource` | 方法 | <code>readResource(request: MCPResourceReadRequest): Promise&lt;MCPResourceResult&gt;</code> | read Resource 的公开运行时操作。 |
| `registerPrompt` | 方法 | <code>registerPrompt(serverId: string, name: string, result: MCPPromptResult): void</code> | 注册 Prompt。 |
| `registerResource` | 方法 | <code>registerResource(serverId: string, uri: string, result: MCPResourceResult): void</code> | 注册 Resource。 |
| `registerToolHandler` | 方法 | <code>registerToolHandler(serverId: string, capabilityId: string, handler: MCPToolHandler): void</code> | 注册 Tool Handler。 |

## `ClassicMCPFetchResponse` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `body` | 属性 | <code>body: string</code> | body 字段。 |
| `headers` | 属性 | <code>headers: Record&lt;string, string&gt;</code> | headers 字段。 |
| `json` | 属性 | <code>json: unknown</code> | json 字段。 |
| `status` | 属性 | <code>status: number</code> | status 字段。 |

## `ClassicMCPMockGatewayOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fetchResponses` | 属性 | <code>fetchResponses: Record&lt;string, ClassicMCPFetchResponse&gt;</code> | fetch Responses 字段。 |
| `files` | 属性 | <code>files: Record&lt;string, string&gt;</code> | files 字段。 |
| `now` | 属性 | <code>now: string</code> | now 字段。 |
| `searchResults` | 属性 | <code>searchResults: Record&lt;string, ClassicMCPSearchResult[]&gt;</code> | search Results 字段。 |

## `ClassicMCPSearchResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `snippet` | 属性 | <code>snippet: string</code> | snippet 字段。 |
| `title` | 属性 | <code>title: string</code> | title 字段。 |
| `url` | 属性 | <code>url: string</code> | url 字段。 |

## `MCPCapabilityDescriptor` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `annotations` | 属性 | <code>annotations: Record&lt;string, unknown&gt;</code> | annotations 字段。 |
| `capabilityHash` | 属性 | <code>capabilityHash: string</code> | capability Hash 字段。 |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | capability Id 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `declarationSource` | 属性 | <code>declarationSource: "unknown" &#124; "user" &#124; "framework" &#124; "server"</code> | declaration Source 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `inputSchema` | 属性 | <code>inputSchema: JsonSchema</code> | input schema 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `outputSchema` | 属性 | <code>outputSchema: JsonSchema</code> | output schema 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `permissionScope` | 属性 | <code>permissionScope: string[]</code> | permission Scope 字段。 |
| `protocolVersion` | 属性 | <code>protocolVersion: string</code> | protocol Version 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |
| `serverIdentity` | 属性 | <code>serverIdentity: Record&lt;string, unknown&gt;</code> | server Identity 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | side Effect Level 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `trustLevel` | 属性 | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | trust Level 字段。 |
| `type` | 属性 | <code>type: "tool" &#124; "prompt" &#124; "resource"</code> | type 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `MCPGateway` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `call` | 方法 | <code>call(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | call 的公开运行时操作。 |
| `callTool` | 方法 | <code>callTool(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | call Tool 的公开运行时操作。 |
| `discover` | 方法 | <code>discover(integration: MCPIntegrationSpec): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | discover 的公开运行时操作。 |
| `getPrompt` | 方法 | <code>getPrompt(request: MCPPromptRequest): Promise&lt;MCPPromptResult&gt;</code> | 读取 Prompt。 |
| `health` | 方法 | <code>health(serverId?: string): Promise&lt;Record&lt;string, import("@codesoul-co/hypha-tools").ProviderHealth&gt;&gt;</code> | health 的公开运行时操作。 |
| `normalize` | 方法 | <code>normalize(capability: MCPCapabilityDescriptor): Promise&lt;NormalizedMCPCapability&gt;</code> | 规范化 normalize。 |
| `readResource` | 方法 | <code>readResource(request: MCPResourceReadRequest): Promise&lt;MCPResourceResult&gt;</code> | read Resource 的公开运行时操作。 |

## `MCPGatewayToolRegistrationContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |

## `MCPGatewayToolRegistrationOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baselineStore` | 属性 | <code>baselineStore: MCPCapabilityBaselineStore</code> | baseline Store 字段。 |
| `gateway` | 属性 | <code>gateway: MCPGateway</code> | gateway 字段。 |
| `integration` | 属性 | <code>integration: MCPIntegrationSpec</code> | integration 字段。 |
| `registry` | 属性 | <code>registry: ToolRegistry</code> | registry 字段。 |
| `trace` | 属性 | <code>trace: TraceRecorder</code> | trace 字段。 |
| `traceContext` | 属性 | <code>traceContext: MCPGatewayToolRegistrationContext</code> | trace Context 字段。 |

## `MCPGatewayToolRegistrationResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `discoveredCapabilities` | 属性 | <code>discoveredCapabilities: MCPCapabilityDescriptor[]</code> | discovered Capabilities 字段。 |
| `driftRecords` | 属性 | <code>driftRecords: MCPDriftRecord[]</code> | drift Records 字段。 |
| `normalizedCapabilities` | 属性 | <code>normalizedCapabilities: NormalizedMCPCapability[]</code> | normalized Capabilities 字段。 |
| `quarantinedCapabilities` | 属性 | <code>quarantinedCapabilities: MCPCapabilityDescriptor[]</code> | quarantined Capabilities 字段。 |
| `registeredTools` | 属性 | <code>registeredTools: ToolSpec[]</code> | registered Tools 字段。 |

## `MCPIntegrationSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedCapabilities` | 属性 | <code>allowedCapabilities: string[]</code> | allowed Capabilities 字段。 |
| `capabilityHashing` | 属性 | <code>capabilityHashing: boolean</code> | capability Hashing 字段。 |
| `deniedCapabilities` | 属性 | <code>deniedCapabilities: string[]</code> | denied Capabilities 字段。 |
| `driftPolicy` | 属性 | <code>driftPolicy: MCPDriftPolicy</code> | drift Policy 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `importPolicy` | 属性 | <code>importPolicy: string</code> | import Policy 字段。 |
| `promptPolicy` | 属性 | <code>promptPolicy: string</code> | prompt Policy 字段。 |
| `resourcePolicy` | 属性 | <code>resourcePolicy: string</code> | resource Policy 字段。 |
| `servers` | 属性 | <code>servers: MCPServerSpec[]</code> | servers 字段。 |
| `toolPolicy` | 属性 | <code>toolPolicy: string</code> | tool Policy 字段。 |
| `trustPolicy` | 属性 | <code>trustPolicy: string</code> | trust Policy 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
| `versionPinning` | 属性 | <code>versionPinning: boolean</code> | version Pinning 字段。 |

## `MCPPromptRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `arguments` | 属性 | <code>arguments: Record&lt;string, string&gt;</code> | arguments 字段。 |
| `context` | 属性 | <code>context: Partial&lt;ToolCallContext&gt;</code> | context 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |

## `MCPPromptResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `messages` | 属性 | <code>messages: unknown[]</code> | messages 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |

## `MCPResourceReadRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context: Partial&lt;ToolCallContext&gt;</code> | context 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |
| `uri` | 属性 | <code>uri: string</code> | uri 字段。 |

## `MCPResourceResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contents` | 属性 | <code>contents: { uri: string; mimeType?: string; text?: string; blob?: string; metadata?: Record&lt;string, unknown&gt;; }[]</code> | contents 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |

## `MCPServerSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `args` | 属性 | <code>args: string[]</code> | args 字段。 |
| `command` | 属性 | <code>command: string</code> | command 字段。 |
| `endpoint` | 属性 | <code>endpoint: string</code> | endpoint 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `mode` | 属性 | <code>mode: "local" &#124; "remote"</code> | mode 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `MCPToolCallRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | capability Id 字段。 |
| `context` | 属性 | <code>context: ToolCallContext</code> | context 字段。 |
| `input` | 属性 | <code>input: TInput</code> | input 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |

## `NormalizedMCPCapability` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityHash` | 属性 | <code>capabilityHash: string</code> | capability Hash 字段。 |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | capability Id 字段。 |
| `normalizedSpecId` | 属性 | <code>normalizedSpecId: string</code> | normalized Spec Id 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | side Effect Level 字段。 |
| `type` | 属性 | <code>type: "tool" &#124; "prompt" &#124; "resource"</code> | type 字段。 |
