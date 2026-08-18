# `@codesoul-co/hypha-mcp` / `index`

- Package index: [`@codesoul-co/hypha-mcp`](/api/mcp)
- Package guide: [learning and composition guide](/packages/mcp)
- Source: [`packages/mcp/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)
- Exports: **32**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MockMCPGateway` | class | <code>new MockMCPGateway(capabilities?: MCPCapabilityDescriptor[]): MockMCPGateway</code> | Runtime implementation for Mock MCP Gateway; see its public constructor and members below. |
| `classicMCPCapabilityDescriptors` | constant | <code>const classicMCPCapabilityDescriptors: MCPCapabilityDescriptor[]</code> | classic MCP Capability Descriptors constant exported by the `index` module. |
| `classicMCPIntegrationSpec` | constant | <code>const classicMCPIntegrationSpec: MCPIntegrationSpec</code> | classic MCP Integration Spec constant exported by the `index` module. |
| `mcpCapabilityDescriptorSchema` | constant | <code>const mcpCapabilityDescriptorSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { serverId: z.ZodString; capabilityId: z.ZodString; type: z.ZodEnum&lt;["tool"...</code> | Runtime schema for mcp Capability Descriptor. |
| `mcpIntegrationSpecDefinition` | constant | <code>const mcpIntegrationSpecDefinition: SpecSchemaDefinition&lt;MCPIntegrationSpec&gt;</code> | Runtime validation entrypoint for the mcp Integration spec, combining its parser, example and JSON Schema. |
| `mcpIntegrationSpecExample` | constant | <code>const mcpIntegrationSpecExample: MCPIntegrationSpec</code> | Valid example value for mcp Integration Spec. |
| `mcpIntegrationSpecJsonSchema` | constant | <code>const mcpIntegrationSpecJsonSchema: JsonSchema</code> | JSON Schema for mcp Integration Spec. |
| `mcpIntegrationSpecSchema` | constant | <code>const mcpIntegrationSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; servers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; mode: z.ZodEnum&lt;["local", "remote"]&gt;; version: z.ZodOptional&lt;z.ZodString&gt;; endpoint: z.ZodOptional&lt;z.ZodString&gt;; command: z.ZodOptional&lt;z.ZodString&gt;; args: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { id: string; mode: "local" &#124; "remote"; version?: s...</code> | Runtime schema for mcp Integration Spec. |
| `mcpServerSpecSchema` | constant | <code>const mcpServerSpecSchema: z.ZodObject&lt;{ id: z.ZodString; mode: z.ZodEnum&lt;["local", "remote"]&gt;; version: z.ZodOptional&lt;z.ZodString&gt;; endpoint: z.ZodOptional&lt;z.ZodString&gt;; command: z.ZodOptional&lt;z.ZodString&gt;; args: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { id: string; mode: "local" &#124; "remote"; version?: string &#124; undefined; endpoint?: string &#124; undefined; command?: string &#124; undefined...</code> | Runtime schema for mcp Server Spec. |
| `mcpSpecDefinitions` | constant | <code>const mcpSpecDefinitions: readonly [SpecSchemaDefinition&lt;MCPIntegrationSpec&gt;]</code> | mcp Spec Definitions constant exported by the `index` module. |
| `mcpSpecJsonSchemas` | constant | <code>const mcpSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | mcp Spec Json Schemas constant exported by the `index` module. |
| `createClassicMCPMockGateway` | function | <code>createClassicMCPMockGateway(options?: ClassicMCPMockGatewayOptions): MockMCPGateway</code> | Creates Classic MCP Mock Gateway at this module boundary. |
| `normalizeMCPToolSpec` | function | <code>normalizeMCPToolSpec(capability: MCPCapabilityDescriptor): ToolSpec</code> | Normalizes MCP Tool Spec at this module boundary. |
| `registerMCPGatewayTools` | function | <code>registerMCPGatewayTools(options: MCPGatewayToolRegistrationOptions): Promise&lt;MCPGatewayToolRegistrationResult&gt;</code> | Registers MCP Gateway Tools at this module boundary. |
| `validateMCPIntegrationSpec` | function | <code>validateMCPIntegrationSpec(input: unknown): MCPIntegrationSpec</code> | Validates MCP Integration Spec at this module boundary. |
| `ClassicMCPFetchResponse` | interface | <code>interface ClassicMCPFetchResponse</code> | Field contract for Classic MCP Fetch Response; see all contract members below. |
| `ClassicMCPMockGatewayOptions` | interface | <code>interface ClassicMCPMockGatewayOptions</code> | Field contract for Classic MCP Mock Gateway Options; see all contract members below. |
| `ClassicMCPSearchResult` | interface | <code>interface ClassicMCPSearchResult</code> | Field contract for Classic MCP Search Result; see all contract members below. |
| `MCPCapabilityDescriptor` | interface | <code>interface MCPCapabilityDescriptor extends VersionedSpec, SpecMetadata</code> | Field contract for MCP Capability Descriptor; see all contract members below. |
| `MCPGateway` | interface | <code>interface MCPGateway</code> | Field contract for MCP Gateway; see all contract members below. |
| `MCPGatewayToolRegistrationContext` | interface | <code>interface MCPGatewayToolRegistrationContext</code> | Field contract for MCP Gateway Tool Registration Context; see all contract members below. |
| `MCPGatewayToolRegistrationOptions` | interface | <code>interface MCPGatewayToolRegistrationOptions</code> | Field contract for MCP Gateway Tool Registration Options; see all contract members below. |
| `MCPGatewayToolRegistrationResult` | interface | <code>interface MCPGatewayToolRegistrationResult</code> | Field contract for MCP Gateway Tool Registration Result; see all contract members below. |
| `MCPIntegrationSpec` | interface | <code>interface MCPIntegrationSpec</code> | Field contract for MCP Integration Spec; see all contract members below. |
| `MCPPromptRequest` | interface | <code>interface MCPPromptRequest</code> | Field contract for MCP Prompt Request; see all contract members below. |
| `MCPPromptResult` | interface | <code>interface MCPPromptResult</code> | Field contract for MCP Prompt Result; see all contract members below. |
| `MCPResourceReadRequest` | interface | <code>interface MCPResourceReadRequest</code> | Field contract for MCP Resource Read Request; see all contract members below. |
| `MCPResourceResult` | interface | <code>interface MCPResourceResult</code> | Field contract for MCP Resource Result; see all contract members below. |
| `MCPServerSpec` | interface | <code>interface MCPServerSpec</code> | Field contract for MCP Server Spec; see all contract members below. |
| `MCPToolCallRequest` | interface | <code>interface MCPToolCallRequest</code> | Field contract for MCP Tool Call Request; see all contract members below. |
| `NormalizedMCPCapability` | interface | <code>interface NormalizedMCPCapability</code> | Field contract for Normalized MCP Capability; see all contract members below. |
| `MCPToolHandler` | type | <code>type MCPToolHandler = (request: MCPToolCallRequest&lt;TInput&gt;) =&gt; Promise&lt;TOutput&gt; &#124; TOutput</code> | Public type alias for MCP Tool Handler. |

## `MockMCPGateway` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `call` | method | <code>call(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | Public runtime operation for call. |
| `callTool` | method | <code>callTool(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | Public runtime operation for call Tool. |
| `constructor` | constructor | <code>(capabilities?: MCPCapabilityDescriptor[]): MockMCPGateway</code> | Creates an instance of this class. |
| `discover` | method | <code>discover(integration: MCPIntegrationSpec): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | Public runtime operation for discover. |
| `getPrompt` | method | <code>getPrompt(request: MCPPromptRequest): Promise&lt;MCPPromptResult&gt;</code> | Gets Prompt at this module boundary. |
| `health` | method | <code>health(serverId?: string): Promise&lt;Record&lt;string, import("@codesoul-co/hypha-tools").ProviderHealth&gt;&gt;</code> | Public runtime operation for health. |
| `normalize` | method | <code>normalize(capability: MCPCapabilityDescriptor): Promise&lt;NormalizedMCPCapability&gt;</code> | Normalizes normalize at this module boundary. |
| `readResource` | method | <code>readResource(request: MCPResourceReadRequest): Promise&lt;MCPResourceResult&gt;</code> | Public runtime operation for read Resource. |
| `registerPrompt` | method | <code>registerPrompt(serverId: string, name: string, result: MCPPromptResult): void</code> | Registers Prompt at this module boundary. |
| `registerResource` | method | <code>registerResource(serverId: string, uri: string, result: MCPResourceResult): void</code> | Registers Resource at this module boundary. |
| `registerToolHandler` | method | <code>registerToolHandler(serverId: string, capabilityId: string, handler: MCPToolHandler): void</code> | Registers Tool Handler at this module boundary. |

## `ClassicMCPFetchResponse` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `body` | property | <code>body: string</code> | Public body property. |
| `headers` | property | <code>headers: Record&lt;string, string&gt;</code> | Public headers property. |
| `json` | property | <code>json: unknown</code> | Public json property. |
| `status` | property | <code>status: number</code> | Public status property. |

## `ClassicMCPMockGatewayOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fetchResponses` | property | <code>fetchResponses: Record&lt;string, ClassicMCPFetchResponse&gt;</code> | Public fetch Responses property. |
| `files` | property | <code>files: Record&lt;string, string&gt;</code> | Public files property. |
| `now` | property | <code>now: string</code> | Public now property. |
| `searchResults` | property | <code>searchResults: Record&lt;string, ClassicMCPSearchResult[]&gt;</code> | Public search Results property. |

## `ClassicMCPSearchResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `snippet` | property | <code>snippet: string</code> | Public snippet property. |
| `title` | property | <code>title: string</code> | Public title property. |
| `url` | property | <code>url: string</code> | Public url property. |

## `MCPCapabilityDescriptor` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `annotations` | property | <code>annotations: Record&lt;string, unknown&gt;</code> | Public annotations property. |
| `capabilityHash` | property | <code>capabilityHash: string</code> | Public capability Hash property. |
| `capabilityId` | property | <code>capabilityId: string</code> | Public capability Id property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `declarationSource` | property | <code>declarationSource: "unknown" &#124; "user" &#124; "framework" &#124; "server"</code> | Public declaration Source property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `inputSchema` | property | <code>inputSchema: JsonSchema</code> | Public input schema property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `outputSchema` | property | <code>outputSchema: JsonSchema</code> | Public output schema property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `permissionScope` | property | <code>permissionScope: string[]</code> | Public permission Scope property. |
| `protocolVersion` | property | <code>protocolVersion: string</code> | Public protocol Version property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |
| `serverIdentity` | property | <code>serverIdentity: Record&lt;string, unknown&gt;</code> | Public server Identity property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public side Effect Level property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `trustLevel` | property | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public trust Level property. |
| `type` | property | <code>type: "tool" &#124; "prompt" &#124; "resource"</code> | Public type property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `MCPGateway` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `call` | method | <code>call(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | Public runtime operation for call. |
| `callTool` | method | <code>callTool(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | Public runtime operation for call Tool. |
| `discover` | method | <code>discover(integration: MCPIntegrationSpec): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | Public runtime operation for discover. |
| `getPrompt` | method | <code>getPrompt(request: MCPPromptRequest): Promise&lt;MCPPromptResult&gt;</code> | Gets Prompt at this module boundary. |
| `health` | method | <code>health(serverId?: string): Promise&lt;Record&lt;string, import("@codesoul-co/hypha-tools").ProviderHealth&gt;&gt;</code> | Public runtime operation for health. |
| `normalize` | method | <code>normalize(capability: MCPCapabilityDescriptor): Promise&lt;NormalizedMCPCapability&gt;</code> | Normalizes normalize at this module boundary. |
| `readResource` | method | <code>readResource(request: MCPResourceReadRequest): Promise&lt;MCPResourceResult&gt;</code> | Public runtime operation for read Resource. |

## `MCPGatewayToolRegistrationContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |

## `MCPGatewayToolRegistrationOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baselineStore` | property | <code>baselineStore: MCPCapabilityBaselineStore</code> | Public baseline Store property. |
| `gateway` | property | <code>gateway: MCPGateway</code> | Public gateway property. |
| `integration` | property | <code>integration: MCPIntegrationSpec</code> | Public integration property. |
| `registry` | property | <code>registry: ToolRegistry</code> | Public registry property. |
| `trace` | property | <code>trace: TraceRecorder</code> | Public trace property. |
| `traceContext` | property | <code>traceContext: MCPGatewayToolRegistrationContext</code> | Public trace Context property. |

## `MCPGatewayToolRegistrationResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `discoveredCapabilities` | property | <code>discoveredCapabilities: MCPCapabilityDescriptor[]</code> | Public discovered Capabilities property. |
| `driftRecords` | property | <code>driftRecords: MCPDriftRecord[]</code> | Public drift Records property. |
| `normalizedCapabilities` | property | <code>normalizedCapabilities: NormalizedMCPCapability[]</code> | Public normalized Capabilities property. |
| `quarantinedCapabilities` | property | <code>quarantinedCapabilities: MCPCapabilityDescriptor[]</code> | Public quarantined Capabilities property. |
| `registeredTools` | property | <code>registeredTools: ToolSpec[]</code> | Public registered Tools property. |

## `MCPIntegrationSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedCapabilities` | property | <code>allowedCapabilities: string[]</code> | Public allowed Capabilities property. |
| `capabilityHashing` | property | <code>capabilityHashing: boolean</code> | Public capability Hashing property. |
| `deniedCapabilities` | property | <code>deniedCapabilities: string[]</code> | Public denied Capabilities property. |
| `driftPolicy` | property | <code>driftPolicy: MCPDriftPolicy</code> | Public drift Policy property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `importPolicy` | property | <code>importPolicy: string</code> | Public import Policy property. |
| `promptPolicy` | property | <code>promptPolicy: string</code> | Public prompt Policy property. |
| `resourcePolicy` | property | <code>resourcePolicy: string</code> | Public resource Policy property. |
| `servers` | property | <code>servers: MCPServerSpec[]</code> | Public servers property. |
| `toolPolicy` | property | <code>toolPolicy: string</code> | Public tool Policy property. |
| `trustPolicy` | property | <code>trustPolicy: string</code> | Public trust Policy property. |
| `version` | property | <code>version: string</code> | Public version property. |
| `versionPinning` | property | <code>versionPinning: boolean</code> | Public version Pinning property. |

## `MCPPromptRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `arguments` | property | <code>arguments: Record&lt;string, string&gt;</code> | Public arguments property. |
| `context` | property | <code>context: Partial&lt;ToolCallContext&gt;</code> | Public context property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |

## `MCPPromptResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `description` | property | <code>description: string</code> | Public description property. |
| `messages` | property | <code>messages: unknown[]</code> | Public messages property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |

## `MCPResourceReadRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: Partial&lt;ToolCallContext&gt;</code> | Public context property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |
| `uri` | property | <code>uri: string</code> | Public uri property. |

## `MCPResourceResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contents` | property | <code>contents: { uri: string; mimeType?: string; text?: string; blob?: string; metadata?: Record&lt;string, unknown&gt;; }[]</code> | Public contents property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |

## `MCPServerSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `args` | property | <code>args: string[]</code> | Public args property. |
| `command` | property | <code>command: string</code> | Public command property. |
| `endpoint` | property | <code>endpoint: string</code> | Public endpoint property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `mode` | property | <code>mode: "local" &#124; "remote"</code> | Public mode property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `MCPToolCallRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityId` | property | <code>capabilityId: string</code> | Public capability Id property. |
| `context` | property | <code>context: ToolCallContext</code> | Public context property. |
| `input` | property | <code>input: TInput</code> | Public input property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |

## `NormalizedMCPCapability` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityHash` | property | <code>capabilityHash: string</code> | Public capability Hash property. |
| `capabilityId` | property | <code>capabilityId: string</code> | Public capability Id property. |
| `normalizedSpecId` | property | <code>normalizedSpecId: string</code> | Public normalized Spec Id property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public side Effect Level property. |
| `type` | property | <code>type: "tool" &#124; "prompt" &#124; "resource"</code> | Public type property. |
