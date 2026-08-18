# `@codesoul-co/hypha-tools` / `adapter-factory`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Package guide: [learning and composition guide](/packages/tools)
- Source: [`packages/tools/src/adapter-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)
- Exports: **17**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LoadedToolAdapterProfiles` | class | <code>new LoadedToolAdapterProfiles(entries: Map&lt;string, LoadedToolAdapterProfile&gt;): LoadedToolAdapterProfiles</code> | Runtime implementation for Loaded Tool Adapter Profiles; see its public constructor and members below. |
| `ToolAdapterFactoryRegistry` | class | <code>new ToolAdapterFactoryRegistry(options: ToolAdapterFactoryRegistryOptions): ToolAdapterFactoryRegistry</code> | Creates adapters from declarative profiles without allowing profiles to smuggle executable factories or plaintext credentials through configuration. |
| `toolAdapterKinds` | constant | <code>const toolAdapterKinds: readonly ["local_function", "http", "plugin", "mcp_stdio", "mcp_streamable_http", "execution"]</code> | tool Adapter Kinds constant exported by the `adapter-factory` module. |
| `toolAdapterProfileSchema` | constant | <code>const toolAdapterProfileSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; kind: z.ZodEnum&lt;["local_function", "http", "plugin", "mcp_stdio", "mcp_streamable_http", "execution"]&gt;; required: z.ZodDefault&lt;z.ZodBoolean&gt;; toolSpecRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?...</code> | Runtime schema for tool Adapter Profile. |
| `toolAdapterProfilesDocumentSchema` | constant | <code>const toolAdapterProfilesDocumentSchema: z.ZodObject&lt;{ profiles: z.ZodArray&lt;z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; kind: z.ZodEnum&lt;["local_function", "http", "plugin", "mcp_stdio", "mcp_streamable_http", "execution"]&gt;; required: z.ZodDefault&lt;z.ZodBoolean&gt;; toolSpecRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { id: str...</code> | Runtime schema for tool Adapter Profiles Document. |
| `loadToolAdapterProfiles` | function | <code>loadToolAdapterProfiles(input: unknown, registry: ToolAdapterFactoryRegistry): Promise&lt;LoadedToolAdapterProfiles&gt;</code> | Loads Tool Adapter Profiles at this module boundary. |
| `parseToolAdapterProfilesDocument` | function | <code>parseToolAdapterProfilesDocument(input: unknown): ToolAdapterProfilesDocument</code> | Parses and validates Tool Adapter Profiles Document at this module boundary. |
| `registerConcreteToolAdapterFactories` | function | <code>registerConcreteToolAdapterFactories(registry: ToolAdapterFactoryRegistry, dependencies?: ConcreteToolAdapterFactoryDependencies): void</code> | Registers the complete declarative factory surface used by server composition. |
| `ConcreteToolAdapterFactoryDependencies` | interface | <code>interface ConcreteToolAdapterFactoryDependencies</code> | Field contract for Concrete Tool Adapter Factory Dependencies; see all contract members below. |
| `LoadedToolAdapterProfile` | interface | <code>interface LoadedToolAdapterProfile</code> | Field contract for Loaded Tool Adapter Profile; see all contract members below. |
| `ToolAdapterFactory` | interface | <code>interface ToolAdapterFactory</code> | Field contract for Tool Adapter Factory; see all contract members below. |
| `ToolAdapterFactoryInput` | interface | <code>interface ToolAdapterFactoryInput</code> | Field contract for Tool Adapter Factory Input; see all contract members below. |
| `ToolAdapterFactoryRegistryOptions` | interface | <code>interface ToolAdapterFactoryRegistryOptions</code> | Field contract for Tool Adapter Factory Registry Options; see all contract members below. |
| `ToolAdapterProfile` | interface | <code>interface ToolAdapterProfile</code> | Field contract for Tool Adapter Profile; see all contract members below. |
| `ToolAdapterProfilesDocument` | interface | <code>interface ToolAdapterProfilesDocument</code> | Field contract for Tool Adapter Profiles Document; see all contract members below. |
| `ToolSpecReference` | interface | <code>interface ToolSpecReference</code> | Field contract for Tool Spec Reference; see all contract members below. |
| `ToolAdapterKind` | type | <code>type ToolAdapterKind = (typeof toolAdapterKinds)[number]</code> | Public type alias for Tool Adapter Kind. |

## `LoadedToolAdapterProfiles` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(entries: Map&lt;string, LoadedToolAdapterProfile&gt;): LoadedToolAdapterProfiles</code> | Creates an instance of this class. |
| `get` | method | <code>get(profileId: string): LoadedToolAdapterProfile &#124; undefined</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;Record&lt;string, Awaited&lt;ReturnType&lt;ToolAdapter["health"]&gt;&gt;&gt;&gt;</code> | Public runtime operation for health. |
| `list` | method | <code>list(): LoadedToolAdapterProfile[]</code> | Lists list at this module boundary. |

## `ToolAdapterFactoryRegistry` public members

Creates adapters from declarative profiles without allowing profiles to smuggle executable factories or plaintext credentials through configuration.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ToolAdapterFactoryRegistryOptions): ToolAdapterFactoryRegistry</code> | Creates an instance of this class. |
| `create` | method | <code>create(untrustedProfile: ToolAdapterProfile): Promise&lt;{ profile: ToolAdapterProfile; toolSpec: ToolSpec; adapter: ToolAdapter; }&gt;</code> | Creates create at this module boundary. |
| `register` | method | <code>register(factory: ToolAdapterFactory): void</code> | Registers register at this module boundary. |

## `ConcreteToolAdapterFactoryDependencies` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createExecutionAdapter` | method | <code>createExecutionAdapter(input: ToolAdapterFactoryInput): Promise&lt;ToolAdapter&gt;</code> | Creates Execution Adapter at this module boundary. |
| `fetch` | method | <code>fetch(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | Public runtime operation for fetch. |
| `localFunctions` | property | <code>localFunctions: Readonly&lt;Record&lt;string, ToolHandler&gt;&gt;</code> | Public local Functions property. |
| `mcpPort` | property | <code>mcpPort: MCPToolInvocationPort</code> | Public mcp Port property. |
| `plugins` | property | <code>plugins: Readonly&lt;Record&lt;string, ToolHandler&gt;&gt;</code> | Public plugins property. |
| `prepareMCPConnection` | method | <code>prepareMCPConnection(input: ToolAdapterFactoryInput): Promise&lt;{ port: MCPToolInvocationPort; close?(): Promise&lt;void&gt;; }&gt;</code> | Public runtime operation for prepare MCP Connection. |

## `LoadedToolAdapterProfile` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adapter` | property | <code>adapter: ToolAdapter&lt;unknown, unknown&gt;</code> | Public adapter property. |
| `error` | property | <code>error: string</code> | Public error property. |
| `profile` | property | <code>profile: ToolAdapterProfile</code> | Public profile property. |
| `status` | property | <code>status: "degraded" &#124; "ready"</code> | Public status property. |
| `toolSpec` | property | <code>toolSpec: ToolSpec</code> | Public tool Spec property. |

## `ToolAdapterFactory` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(input: ToolAdapterFactoryInput): Promise&lt;ToolAdapter&gt;</code> | Creates create at this module boundary. |
| `kind` | property | <code>kind: "http" &#124; "execution" &#124; "plugin" &#124; "local_function" &#124; "mcp_stdio" &#124; "mcp_streamable_http"</code> | Public kind property. |

## `ToolAdapterFactoryInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquireCredential` | method | <code>acquireCredential(): Promise&lt;CredentialLease &#124; null&gt;</code> | Public runtime operation for acquire Credential. |
| `profile` | property | <code>profile: ToolAdapterProfile</code> | Public profile property. |
| `resolveCredential` | method | <code>resolveCredential(): Promise&lt;string &#124; null&gt;</code> | Resolves Credential at this module boundary. |
| `toolSpec` | property | <code>toolSpec: ToolSpec</code> | Public tool Spec property. |

## `ToolAdapterFactoryRegistryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `resolveToolSpec` | method | <code>resolveToolSpec(reference: ToolSpecReference): Promise&lt;ToolSpec &#124; null&gt;</code> | Resolves Tool Spec at this module boundary. |
| `secretResolver` | property | <code>secretResolver: ToolSecretResolver</code> | Public secret Resolver property. |

## `ToolAdapterProfile` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `binding` | property | <code>binding: { localFunctionId?: string; pluginId?: string; executionPortRef?: string; mcpServerId?: string; mcpCapabilityId?: string; mcpConnectionProfileRef?: string; }</code> | Public binding property. |
| `config` | property | <code>config: Record&lt;string, unknown&gt;</code> | Public config property. |
| `credentialRef` | property | <code>credentialRef: string</code> | Public credential Ref property. |
| `endpoint` | property | <code>endpoint: string</code> | Public endpoint property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `kind` | property | <code>kind: "http" &#124; "execution" &#124; "plugin" &#124; "local_function" &#124; "mcp_stdio" &#124; "mcp_streamable_http"</code> | Public kind property. |
| `required` | property | <code>required: boolean</code> | Public required property. |
| `requiredCapabilities` | property | <code>requiredCapabilities: (keyof ToolAdapterCapabilities)[]</code> | Public required Capabilities property. |
| `toolSpecRef` | property | <code>toolSpecRef: ToolSpecReference</code> | Public tool Spec Ref property. |

## `ToolAdapterProfilesDocument` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `profiles` | property | <code>profiles: ToolAdapterProfile[]</code> | Public profiles property. |

## `ToolSpecReference` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `version` | property | <code>version: string</code> | Public version property. |
