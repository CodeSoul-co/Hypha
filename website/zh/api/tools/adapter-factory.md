# `@codesoul-co/hypha-tools` / `adapter-factory`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 模块指南: [学习与组合说明](/zh/packages/tools)
- 源码: [`packages/tools/src/adapter-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)
- 导出数: **17**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LoadedToolAdapterProfiles` | 类 | <code>new LoadedToolAdapterProfiles(entries: Map&lt;string, LoadedToolAdapterProfile&gt;): LoadedToolAdapterProfiles</code> | Loaded Tool Adapter Profiles 的运行时实现；公开构造函数与成员见下表。 |
| `ToolAdapterFactoryRegistry` | 类 | <code>new ToolAdapterFactoryRegistry(options: ToolAdapterFactoryRegistryOptions): ToolAdapterFactoryRegistry</code> | Creates adapters from declarative profiles without allowing profiles to smuggle executable factories or plaintext credentials through configuration. |
| `toolAdapterKinds` | 常量 | <code>const toolAdapterKinds: readonly ["local_function", "http", "plugin", "mcp_stdio", "mcp_streamable_http", "execution"]</code> | 由 `adapter-factory` 模块导出的 tool Adapter Kinds 常量。 |
| `toolAdapterProfileSchema` | 常量 | <code>const toolAdapterProfileSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; kind: z.ZodEnum&lt;["local_function", "http", "plugin", "mcp_stdio", "mcp_streamable_http", "execution"]&gt;; required: z.ZodDefault&lt;z.ZodBoolean&gt;; toolSpecRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?...</code> | tool Adapter Profile 的运行时 Schema。 |
| `toolAdapterProfilesDocumentSchema` | 常量 | <code>const toolAdapterProfilesDocumentSchema: z.ZodObject&lt;{ profiles: z.ZodArray&lt;z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; kind: z.ZodEnum&lt;["local_function", "http", "plugin", "mcp_stdio", "mcp_streamable_http", "execution"]&gt;; required: z.ZodDefault&lt;z.ZodBoolean&gt;; toolSpecRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { id: str...</code> | tool Adapter Profiles Document 的运行时 Schema。 |
| `loadToolAdapterProfiles` | 函数 | <code>loadToolAdapterProfiles(input: unknown, registry: ToolAdapterFactoryRegistry): Promise&lt;LoadedToolAdapterProfiles&gt;</code> | 加载 Tool Adapter Profiles。 |
| `parseToolAdapterProfilesDocument` | 函数 | <code>parseToolAdapterProfilesDocument(input: unknown): ToolAdapterProfilesDocument</code> | 解析并校验 Tool Adapter Profiles Document。 |
| `registerConcreteToolAdapterFactories` | 函数 | <code>registerConcreteToolAdapterFactories(registry: ToolAdapterFactoryRegistry, dependencies?: ConcreteToolAdapterFactoryDependencies): void</code> | Registers the complete declarative factory surface used by server composition. |
| `ConcreteToolAdapterFactoryDependencies` | 接口 | <code>interface ConcreteToolAdapterFactoryDependencies</code> | Concrete Tool Adapter Factory Dependencies 的字段契约；完整字段见下表。 |
| `LoadedToolAdapterProfile` | 接口 | <code>interface LoadedToolAdapterProfile</code> | Loaded Tool Adapter Profile 的字段契约；完整字段见下表。 |
| `ToolAdapterFactory` | 接口 | <code>interface ToolAdapterFactory</code> | Tool Adapter Factory 的字段契约；完整字段见下表。 |
| `ToolAdapterFactoryInput` | 接口 | <code>interface ToolAdapterFactoryInput</code> | Tool Adapter Factory Input 的字段契约；完整字段见下表。 |
| `ToolAdapterFactoryRegistryOptions` | 接口 | <code>interface ToolAdapterFactoryRegistryOptions</code> | Tool Adapter Factory Registry Options 的字段契约；完整字段见下表。 |
| `ToolAdapterProfile` | 接口 | <code>interface ToolAdapterProfile</code> | Tool Adapter Profile 的字段契约；完整字段见下表。 |
| `ToolAdapterProfilesDocument` | 接口 | <code>interface ToolAdapterProfilesDocument</code> | Tool Adapter Profiles Document 的字段契约；完整字段见下表。 |
| `ToolSpecReference` | 接口 | <code>interface ToolSpecReference</code> | Tool Spec Reference 的字段契约；完整字段见下表。 |
| `ToolAdapterKind` | 类型 | <code>type ToolAdapterKind = (typeof toolAdapterKinds)[number]</code> | Tool Adapter Kind 的公共类型别名。 |

## `LoadedToolAdapterProfiles` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(entries: Map&lt;string, LoadedToolAdapterProfile&gt;): LoadedToolAdapterProfiles</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(profileId: string): LoadedToolAdapterProfile &#124; undefined</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;Record&lt;string, Awaited&lt;ReturnType&lt;ToolAdapter["health"]&gt;&gt;&gt;&gt;</code> | health 的公开运行时操作。 |
| `list` | 方法 | <code>list(): LoadedToolAdapterProfile[]</code> | 列出 list。 |

## `ToolAdapterFactoryRegistry` 公开成员

Creates adapters from declarative profiles without allowing profiles to smuggle executable factories or plaintext credentials through configuration.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ToolAdapterFactoryRegistryOptions): ToolAdapterFactoryRegistry</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(untrustedProfile: ToolAdapterProfile): Promise&lt;{ profile: ToolAdapterProfile; toolSpec: ToolSpec; adapter: ToolAdapter; }&gt;</code> | 创建 create。 |
| `register` | 方法 | <code>register(factory: ToolAdapterFactory): void</code> | 注册 register。 |

## `ConcreteToolAdapterFactoryDependencies` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createExecutionAdapter` | 方法 | <code>createExecutionAdapter(input: ToolAdapterFactoryInput): Promise&lt;ToolAdapter&gt;</code> | 创建 Execution Adapter。 |
| `fetch` | 方法 | <code>fetch(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | fetch 的公开运行时操作。 |
| `localFunctions` | 属性 | <code>localFunctions: Readonly&lt;Record&lt;string, ToolHandler&gt;&gt;</code> | local Functions 字段。 |
| `mcpPort` | 属性 | <code>mcpPort: MCPToolInvocationPort</code> | mcp Port 字段。 |
| `plugins` | 属性 | <code>plugins: Readonly&lt;Record&lt;string, ToolHandler&gt;&gt;</code> | plugins 字段。 |
| `prepareMCPConnection` | 方法 | <code>prepareMCPConnection(input: ToolAdapterFactoryInput): Promise&lt;{ port: MCPToolInvocationPort; close?(): Promise&lt;void&gt;; }&gt;</code> | prepare MCP Connection 的公开运行时操作。 |

## `LoadedToolAdapterProfile` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adapter` | 属性 | <code>adapter: ToolAdapter&lt;unknown, unknown&gt;</code> | adapter 字段。 |
| `error` | 属性 | <code>error: string</code> | error 字段。 |
| `profile` | 属性 | <code>profile: ToolAdapterProfile</code> | profile 字段。 |
| `status` | 属性 | <code>status: "degraded" &#124; "ready"</code> | status 字段。 |
| `toolSpec` | 属性 | <code>toolSpec: ToolSpec</code> | tool Spec 字段。 |

## `ToolAdapterFactory` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(input: ToolAdapterFactoryInput): Promise&lt;ToolAdapter&gt;</code> | 创建 create。 |
| `kind` | 属性 | <code>kind: "http" &#124; "execution" &#124; "plugin" &#124; "local_function" &#124; "mcp_stdio" &#124; "mcp_streamable_http"</code> | kind 字段。 |

## `ToolAdapterFactoryInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquireCredential` | 方法 | <code>acquireCredential(): Promise&lt;CredentialLease &#124; null&gt;</code> | acquire Credential 的公开运行时操作。 |
| `profile` | 属性 | <code>profile: ToolAdapterProfile</code> | profile 字段。 |
| `resolveCredential` | 方法 | <code>resolveCredential(): Promise&lt;string &#124; null&gt;</code> | 解析 Credential。 |
| `toolSpec` | 属性 | <code>toolSpec: ToolSpec</code> | tool Spec 字段。 |

## `ToolAdapterFactoryRegistryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `resolveToolSpec` | 方法 | <code>resolveToolSpec(reference: ToolSpecReference): Promise&lt;ToolSpec &#124; null&gt;</code> | 解析 Tool Spec。 |
| `secretResolver` | 属性 | <code>secretResolver: ToolSecretResolver</code> | secret Resolver 字段。 |

## `ToolAdapterProfile` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `binding` | 属性 | <code>binding: { localFunctionId?: string; pluginId?: string; executionPortRef?: string; mcpServerId?: string; mcpCapabilityId?: string; mcpConnectionProfileRef?: string; }</code> | binding 字段。 |
| `config` | 属性 | <code>config: Record&lt;string, unknown&gt;</code> | config 字段。 |
| `credentialRef` | 属性 | <code>credentialRef: string</code> | credential Ref 字段。 |
| `endpoint` | 属性 | <code>endpoint: string</code> | endpoint 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `kind` | 属性 | <code>kind: "http" &#124; "execution" &#124; "plugin" &#124; "local_function" &#124; "mcp_stdio" &#124; "mcp_streamable_http"</code> | kind 字段。 |
| `required` | 属性 | <code>required: boolean</code> | required 字段。 |
| `requiredCapabilities` | 属性 | <code>requiredCapabilities: (keyof ToolAdapterCapabilities)[]</code> | required Capabilities 字段。 |
| `toolSpecRef` | 属性 | <code>toolSpecRef: ToolSpecReference</code> | tool Spec Ref 字段。 |

## `ToolAdapterProfilesDocument` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `profiles` | 属性 | <code>profiles: ToolAdapterProfile[]</code> | profiles 字段。 |

## `ToolSpecReference` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
