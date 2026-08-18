# `@codesoul-co/hypha-mcp` / `index`

- 包索引: [`@codesoul-co/hypha-mcp`](/zh/api/mcp)
- 源码: [`packages/mcp/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)
- 导出数: **32**

## 模块用法

聚合 `@codesoul-co/hypha-mcp` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。

### 从包入口导入

```ts
import {
  MockMCPGateway,
  classicMCPCapabilityDescriptors,
  classicMCPIntegrationSpec,
  mcpCapabilityDescriptorSchema,
  mcpIntegrationSpecDefinition,
  mcpIntegrationSpecExample,
  mcpIntegrationSpecJsonSchema,
  mcpIntegrationSpecSchema,
} from '@codesoul-co/hypha-mcp';

import type {
  ClassicMCPFetchResponse,
  ClassicMCPMockGatewayOptions,
  ClassicMCPSearchResult,
  MCPCapabilityDescriptor,
  MCPGateway,
  MCPGatewayToolRegistrationContext,
  MCPGatewayToolRegistrationOptions,
  MCPGatewayToolRegistrationResult,
} from '@codesoul-co/hypha-mcp';

// 完整导出列表见下方。
```

### 使用要点

- 17 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 10 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { mcpCapabilityDescriptorSchema } from '@codesoul-co/hypha-mcp';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = mcpCapabilityDescriptorSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MockMCPGateway` | 类 | <code>new MockMCPGateway(capabilities?: MCPCapabilityDescriptor[]): MockMCPGateway</code> | Mock MCP Gateway 类，共公开 11 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `classicMCPCapabilityDescriptors` | 常量 | <code>const classicMCPCapabilityDescriptors: MCPCapabilityDescriptor[]</code> | 由 `index` 模块导出的 Classic MCP Capability Descriptors 常量。 |
| `classicMCPIntegrationSpec` | 常量 | <code>const classicMCPIntegrationSpec: MCPIntegrationSpec</code> | 由 `index` 模块导出的 Classic MCP Integration Spec 常量。 |
| `mcpCapabilityDescriptorSchema` | 常量 | <code>const mcpCapabilityDescriptorSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { serverId: z.ZodString; capabilityId: z.ZodString; type: z.ZodEnum&lt;["tool"...</code> | MCP Capability Descriptor 的运行时 Schema。 |
| `mcpIntegrationSpecDefinition` | 常量 | <code>const mcpIntegrationSpecDefinition: SpecSchemaDefinition&lt;MCPIntegrationSpec&gt;</code> | MCP Integration Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `mcpIntegrationSpecExample` | 常量 | <code>const mcpIntegrationSpecExample: MCPIntegrationSpec</code> | MCP Integration Spec 的有效示例值。 |
| `mcpIntegrationSpecJsonSchema` | 常量 | <code>const mcpIntegrationSpecJsonSchema: JsonSchema</code> | MCP Integration Spec 的 JSON Schema。 |
| `mcpIntegrationSpecSchema` | 常量 | <code>const mcpIntegrationSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; servers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; mode: z.ZodEnum&lt;["local", "remote"]&gt;; version: z.ZodOptional&lt;z.ZodString&gt;; endpoint: z.ZodOptional&lt;z.ZodString&gt;; command: z.ZodOptional&lt;z.ZodString&gt;; args: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { id: string; mode: "local" &#124; "remote"; version?: s...</code> | MCP Integration Spec 的运行时 Schema。 |
| `mcpServerSpecSchema` | 常量 | <code>const mcpServerSpecSchema: z.ZodObject&lt;{ id: z.ZodString; mode: z.ZodEnum&lt;["local", "remote"]&gt;; version: z.ZodOptional&lt;z.ZodString&gt;; endpoint: z.ZodOptional&lt;z.ZodString&gt;; command: z.ZodOptional&lt;z.ZodString&gt;; args: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { id: string; mode: "local" &#124; "remote"; version?: string &#124; undefined; endpoint?: string &#124; undefined; command?: string &#124; undefined...</code> | MCP Server Spec 的运行时 Schema。 |
| `mcpSpecDefinitions` | 常量 | <code>const mcpSpecDefinitions: readonly [SpecSchemaDefinition&lt;MCPIntegrationSpec&gt;]</code> | 由 `index` 模块导出的 MCP Spec Definitions 常量。 |
| `mcpSpecJsonSchemas` | 常量 | <code>const mcpSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 MCP Spec JSON Schemas 常量。 |
| `createClassicMCPMockGateway` | 函数 | <code>createClassicMCPMockGateway(options?: ClassicMCPMockGatewayOptions): MockMCPGateway</code> | Create Classic MCP Mock Gateway 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `normalizeMCPToolSpec` | 函数 | <code>normalizeMCPToolSpec(capability: MCPCapabilityDescriptor): ToolSpec</code> | Normalize MCP Tool Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `registerMCPGatewayTools` | 函数 | <code>registerMCPGatewayTools(options: MCPGatewayToolRegistrationOptions): Promise&lt;MCPGatewayToolRegistrationResult&gt;</code> | Register MCP Gateway Tools 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateMCPIntegrationSpec` | 函数 | <code>validateMCPIntegrationSpec(input: unknown): MCPIntegrationSpec</code> | Validate MCP Integration Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ClassicMCPFetchResponse` | 接口 | <code>interface ClassicMCPFetchResponse</code> | Classic MCP Fetch Response 接口，共包含 4 个公开字段或方法。 |
| `ClassicMCPMockGatewayOptions` | 接口 | <code>interface ClassicMCPMockGatewayOptions</code> | Classic MCP Mock Gateway Options 接口，共包含 4 个公开字段或方法。 |
| `ClassicMCPSearchResult` | 接口 | <code>interface ClassicMCPSearchResult</code> | Classic MCP Search Result 接口，共包含 3 个公开字段或方法。 |
| `MCPCapabilityDescriptor` | 接口 | <code>interface MCPCapabilityDescriptor extends VersionedSpec, SpecMetadata</code> | MCP Capability Descriptor 接口，共包含 21 个公开字段或方法。 |
| `MCPGateway` | 接口 | <code>interface MCPGateway</code> | MCP Gateway 接口，共包含 7 个公开字段或方法。 |
| `MCPGatewayToolRegistrationContext` | 接口 | <code>interface MCPGatewayToolRegistrationContext</code> | MCP Gateway Tool Registration Context 接口，共包含 4 个公开字段或方法。 |
| `MCPGatewayToolRegistrationOptions` | 接口 | <code>interface MCPGatewayToolRegistrationOptions</code> | MCP Gateway Tool Registration Options 接口，共包含 6 个公开字段或方法。 |
| `MCPGatewayToolRegistrationResult` | 接口 | <code>interface MCPGatewayToolRegistrationResult</code> | MCP Gateway Tool Registration Result 接口，共包含 5 个公开字段或方法。 |
| `MCPIntegrationSpec` | 接口 | <code>interface MCPIntegrationSpec</code> | MCP Integration Spec 接口，共包含 13 个公开字段或方法。 |
| `MCPPromptRequest` | 接口 | <code>interface MCPPromptRequest</code> | MCP Prompt Request 接口，共包含 4 个公开字段或方法。 |
| `MCPPromptResult` | 接口 | <code>interface MCPPromptResult</code> | MCP Prompt Result 接口，共包含 3 个公开字段或方法。 |
| `MCPResourceReadRequest` | 接口 | <code>interface MCPResourceReadRequest</code> | MCP Resource Read Request 接口，共包含 3 个公开字段或方法。 |
| `MCPResourceResult` | 接口 | <code>interface MCPResourceResult</code> | MCP Resource Result 接口，共包含 2 个公开字段或方法。 |
| `MCPServerSpec` | 接口 | <code>interface MCPServerSpec</code> | MCP Server Spec 接口，共包含 6 个公开字段或方法。 |
| `MCPToolCallRequest` | 接口 | <code>interface MCPToolCallRequest</code> | MCP Tool Call Request 接口，共包含 4 个公开字段或方法。 |
| `NormalizedMCPCapability` | 接口 | <code>interface NormalizedMCPCapability</code> | Normalized MCP Capability 接口，共包含 6 个公开字段或方法。 |
| `MCPToolHandler` | 类型 | <code>type MCPToolHandler = (request: MCPToolCallRequest&lt;TInput&gt;) =&gt; Promise&lt;TOutput&gt; &#124; TOutput</code> | MCP Tool Handler 公共类型别名；完整类型表达式见声明。 |

## `MockMCPGateway`

Mock MCP Gateway 类，共公开 11 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MockMCPGateway } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export declare class MockMCPGateway implements MCPGateway {
    constructor(capabilities?: MCPCapabilityDescriptor[]);
    registerToolHandler(serverId: string, capabilityId: string, handler: MCPToolHandler): void;
    registerResource(serverId: string, uri: string, result: MCPResourceResult): void;
    registerPrompt(serverId: string, name: string, result: MCPPromptResult): void;
    discover(integration: MCPIntegrationSpec): Promise<MCPCapabilityDescriptor[]>;
    normalize(capability: MCPCapabilityDescriptor): Promise<NormalizedMCPCapability>;
    call(request: MCPToolCallRequest): Promise<unknown>;
    callTool(request: MCPToolCallRequest): Promise<unknown>;
    readResource(request: MCPResourceReadRequest): Promise<MCPResourceResult>;
    getPrompt(request: MCPPromptRequest): Promise<MCPPromptResult>;
    health(serverId?: string): Promise<Record<string, import('@codesoul-co/hypha-tools').ProviderHealth>>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `call` | 方法 | <code>call(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `callTool` | 方法 | <code>callTool(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(capabilities?: MCPCapabilityDescriptor[]): MockMCPGateway</code> | 创建该类的实例。 |
| `discover` | 方法 | <code>discover(integration: MCPIntegrationSpec): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getPrompt` | 方法 | <code>getPrompt(request: MCPPromptRequest): Promise&lt;MCPPromptResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(serverId?: string): Promise&lt;Record&lt;string, import("@codesoul-co/hypha-tools").ProviderHealth&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `normalize` | 方法 | <code>normalize(capability: MCPCapabilityDescriptor): Promise&lt;NormalizedMCPCapability&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `readResource` | 方法 | <code>readResource(request: MCPResourceReadRequest): Promise&lt;MCPResourceResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `registerPrompt` | 方法 | <code>registerPrompt(serverId: string, name: string, result: MCPPromptResult): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `registerResource` | 方法 | <code>registerResource(serverId: string, uri: string, result: MCPResourceResult): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `registerToolHandler` | 方法 | <code>registerToolHandler(serverId: string, capabilityId: string, handler: MCPToolHandler): void</code> | 公开方法；参数与返回类型以签名列为准。 |

## `classicMCPCapabilityDescriptors`

由 `index` 模块导出的 Classic MCP Capability Descriptors 常量。

- 种类: 常量
- 导入: `import { classicMCPCapabilityDescriptors } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export declare const classicMCPCapabilityDescriptors: MCPCapabilityDescriptor[];
```

## `classicMCPIntegrationSpec`

由 `index` 模块导出的 Classic MCP Integration Spec 常量。

- 种类: 常量
- 导入: `import { classicMCPIntegrationSpec } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export declare const classicMCPIntegrationSpec: MCPIntegrationSpec;
```

## `mcpCapabilityDescriptorSchema`

MCP Capability Descriptor 的运行时 Schema。

- 种类: 常量
- 导入: `import { mcpCapabilityDescriptorSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export declare const mcpCapabilityDescriptorSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { serverId: z.ZodString; capabilityId: z.ZodString; type: z.ZodEnum<["tool", "resource", "prompt"]>; inputSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; outputSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; sideEffectLevel: z.ZodOptional<z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>>; permissionScope: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; capabilityHash: z.ZodOptional<z.ZodString>; trustLevel: z.ZodOptional<z.ZodEnum<["trusted", "reviewed", "untrusted"]>>; declarationSource: z.ZodOptional<z.ZodEnum<["framework", "user", "server", "unknown"]>>; }, "strip", z.ZodTypeAny, { id: string; type: "tool" | "resource" | "prompt"; version: string; serverId: string; capabilityId: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; inputSchema?: JsonSchema | undefined; outputSchema?: JsonSchema | undefined; sideEffectLevel?: "none" | "read" | "write" | "external_effect" | "irreversible" | undefined; permissionScope?: string[] | undefined; capabilityHash?: string | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; declarationSource?: "unknown" | "framework" | "user" | "server" | undefined; }, { id: string; type: "tool" | "resource" | "prompt"; version: string; serverId: string; capabilityId: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; inputSchema?: JsonSchema | undefined; outputSchema?: JsonSchema | undefined; sideEffectLevel?: "none" | "read" | "write" | "external_effect" | "irreversible" | undefined; permissionScope?: string[] | undefined; capabilityHash?: string | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; declarationSource?: "unknown" | "framework" | "user" | "server" | undefined; }>;
```

## `mcpIntegrationSpecDefinition`

MCP Integration Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { mcpIntegrationSpecDefinition } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export declare const mcpIntegrationSpecDefinition: SpecSchemaDefinition<MCPIntegrationSpec>;
```

## `mcpIntegrationSpecExample`

MCP Integration Spec 的有效示例值。

- 种类: 常量
- 导入: `import { mcpIntegrationSpecExample } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export declare const mcpIntegrationSpecExample: MCPIntegrationSpec;
```

## `mcpIntegrationSpecJsonSchema`

MCP Integration Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { mcpIntegrationSpecJsonSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export declare const mcpIntegrationSpecJsonSchema: JsonSchema;
```

## `mcpIntegrationSpecSchema`

MCP Integration Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { mcpIntegrationSpecSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export declare const mcpIntegrationSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; servers: z.ZodArray<z.ZodObject<{ id: z.ZodString; mode: z.ZodEnum<["local", "remote"]>; version: z.ZodOptional<z.ZodString>; endpoint: z.ZodOptional<z.ZodString>; command: z.ZodOptional<z.ZodString>; args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { id: string; mode: "local" | "remote"; version?: string | undefined; endpoint?: string | undefined; command?: string | undefined; args?: string[] | undefined; }, { id: string; mode: "local" | "remote"; version?: string | undefined; endpoint?: string | undefined; command?: string | undefined; args?: string[] | undefined; }>, "many">; allowedCapabilities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; deniedCapabilities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; trustPolicy: z.ZodOptional<z.ZodString>; importPolicy: z.ZodOptional<z.ZodString>; resourcePolicy: z.ZodOptional<z.ZodString>; toolPolicy: z.ZodOptional<z.ZodString>; promptPolicy: z.ZodOptional<z.ZodString>; versionPinning: z.ZodOptional<z.ZodBoolean>; capabilityHashing: z.ZodOptional<z.ZodBoolean>; driftPolicy: z.ZodOptional<z.ZodEnum<["quarantine", "accept"]>>; }, "strip", z.ZodTypeAny, { id: string; version: string; servers: { id: string; mode: "local" | "remote"; version?: string | undefined; endpoint?: string | undefined; command?: string | undefined; args?: string[] | undefined; }[]; allowedCapabilities?: string[] | undefined; deniedCapabilities?: string[] | undefined; trustPolicy?: string | undefined; importPolicy?: string | undefined; resourcePolicy?: string | undefined; toolPolicy?: string | undefined; promptPolicy?: string | undefined; versionPinning?: boolean | undefined; capabilityHashing?: boolean | undefined; driftPolicy?: "quarantine" | "accept" | undefined; }, { id: string; version: string; servers: { id: string; mode: "local" | "remote"; version?: string | undefined; endpoint?: string | undefined; command?: string | undefined; args?: string[] | undefined; }[]; allowedCapabilities?: string[] | undefined; deniedCapabilities?: string[] | undefined; trustPolicy?: string | undefined; importPolicy?: string | undefined; resourcePolicy?: string | undefined; toolPolicy?: string | undefined; promptPolicy?: string | undefined; versionPinning?: boolean | undefined; capabilityHashing?: boolean | undefined; driftPolicy?: "quarantine" | "accept" | undefined; }>;
```

## `mcpServerSpecSchema`

MCP Server Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { mcpServerSpecSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export declare const mcpServerSpecSchema: z.ZodObject<{ id: z.ZodString; mode: z.ZodEnum<["local", "remote"]>; version: z.ZodOptional<z.ZodString>; endpoint: z.ZodOptional<z.ZodString>; command: z.ZodOptional<z.ZodString>; args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { id: string; mode: "local" | "remote"; version?: string | undefined; endpoint?: string | undefined; command?: string | undefined; args?: string[] | undefined; }, { id: string; mode: "local" | "remote"; version?: string | undefined; endpoint?: string | undefined; command?: string | undefined; args?: string[] | undefined; }>;
```

## `mcpSpecDefinitions`

由 `index` 模块导出的 MCP Spec Definitions 常量。

- 种类: 常量
- 导入: `import { mcpSpecDefinitions } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export declare const mcpSpecDefinitions: readonly [SpecSchemaDefinition<MCPIntegrationSpec>];
```

## `mcpSpecJsonSchemas`

由 `index` 模块导出的 MCP Spec JSON Schemas 常量。

- 种类: 常量
- 导入: `import { mcpSpecJsonSchemas } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export declare const mcpSpecJsonSchemas: Record<string, JsonSchema>;
```

## `createClassicMCPMockGateway`

Create Classic MCP Mock Gateway 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createClassicMCPMockGateway } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export declare function createClassicMCPMockGateway(options?: ClassicMCPMockGatewayOptions): MockMCPGateway;
```

### 调用签名

```text
createClassicMCPMockGateway(options?: ClassicMCPMockGatewayOptions): MockMCPGateway
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>ClassicMCPMockGatewayOptions</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MockMCPGateway`
- 说明: 返回值契约由上述类型定义。

## `normalizeMCPToolSpec`

Normalize MCP Tool Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizeMCPToolSpec } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export declare function normalizeMCPToolSpec(capability: MCPCapabilityDescriptor): ToolSpec;
```

### 调用签名

```text
normalizeMCPToolSpec(capability: MCPCapabilityDescriptor): ToolSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `capability` | <code>MCPCapabilityDescriptor</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ToolSpec`
- 说明: 返回值契约由上述类型定义。

## `registerMCPGatewayTools`

Register MCP Gateway Tools 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { registerMCPGatewayTools } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export declare function registerMCPGatewayTools(options: MCPGatewayToolRegistrationOptions): Promise<MCPGatewayToolRegistrationResult>;
```

### 调用签名

```text
registerMCPGatewayTools(options: MCPGatewayToolRegistrationOptions): Promise<MCPGatewayToolRegistrationResult>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>MCPGatewayToolRegistrationOptions</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<MCPGatewayToolRegistrationResult>`
- 说明: 返回值契约由上述类型定义。

## `validateMCPIntegrationSpec`

Validate MCP Integration Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMCPIntegrationSpec } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export declare function validateMCPIntegrationSpec(input: unknown): MCPIntegrationSpec;
```

### 调用签名

```text
validateMCPIntegrationSpec(input: unknown): MCPIntegrationSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MCPIntegrationSpec`
- 说明: 返回值契约由上述类型定义。

## `ClassicMCPFetchResponse`

Classic MCP Fetch Response 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ClassicMCPFetchResponse } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface ClassicMCPFetchResponse {
    status?: number;
    headers?: Record<string, string>;
    body?: string;
    json?: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `body` | 属性 | <code>body?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `headers` | 属性 | <code>headers?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `json` | 属性 | <code>json?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ClassicMCPMockGatewayOptions`

Classic MCP Mock Gateway Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ClassicMCPMockGatewayOptions } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface ClassicMCPMockGatewayOptions {
    files?: Record<string, string>;
    fetchResponses?: Record<string, ClassicMCPFetchResponse>;
    now?: string;
    searchResults?: Record<string, ClassicMCPSearchResult[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fetchResponses` | 属性 | <code>fetchResponses?: Record&lt;string, ClassicMCPFetchResponse&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `files` | 属性 | <code>files?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 属性 | <code>now?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `searchResults` | 属性 | <code>searchResults?: Record&lt;string, ClassicMCPSearchResult[]&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ClassicMCPSearchResult`

Classic MCP Search Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ClassicMCPSearchResult } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface ClassicMCPSearchResult {
    title: string;
    url: string;
    snippet: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `snippet` | 属性 | <code>snippet: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `title` | 属性 | <code>title: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `url` | 属性 | <code>url: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPCapabilityDescriptor`

MCP Capability Descriptor 接口，共包含 21 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPCapabilityDescriptor } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface MCPCapabilityDescriptor extends VersionedSpec, SpecMetadata {
    serverId: string;
    capabilityId: string;
    type: 'tool' | 'resource' | 'prompt';
    inputSchema?: JsonSchema;
    outputSchema?: JsonSchema;
    sideEffectLevel?: SideEffectLevel;
    permissionScope?: string[];
    capabilityHash?: string;
    trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
    declarationSource?: 'framework' | 'user' | 'server' | 'unknown';
    annotations?: Record<string, unknown>;
    protocolVersion?: string;
    serverIdentity?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `annotations` | 属性 | <code>annotations?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityHash` | 属性 | <code>capabilityHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `declarationSource` | 属性 | <code>declarationSource?: "unknown" &#124; "user" &#124; "framework" &#124; "server"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputSchema` | 属性 | <code>inputSchema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputSchema` | 属性 | <code>outputSchema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permissionScope` | 属性 | <code>permissionScope?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `protocolVersion` | 属性 | <code>protocolVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverIdentity` | 属性 | <code>serverIdentity?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel?: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trustLevel` | 属性 | <code>trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "tool" &#124; "prompt" &#124; "resource"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPGateway`

MCP Gateway 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPGateway } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface MCPGateway {
    discover(integration: MCPIntegrationSpec): Promise<MCPCapabilityDescriptor[]>;
    normalize(capability: MCPCapabilityDescriptor): Promise<NormalizedMCPCapability>;
    call(request: MCPToolCallRequest): Promise<unknown>;
    /** @deprecated Use call(). Kept for adapters migrating from the classic gateway contract. */
    callTool?(request: MCPToolCallRequest): Promise<unknown>;
    readResource?(request: MCPResourceReadRequest): Promise<MCPResourceResult>;
    getPrompt?(request: MCPPromptRequest): Promise<MCPPromptResult>;
    health(serverId?: string): Promise<Record<string, import('@codesoul-co/hypha-tools').ProviderHealth>>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `call` | 方法 | <code>call(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `callTool` | 方法 | <code>callTool?(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `discover` | 方法 | <code>discover(integration: MCPIntegrationSpec): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getPrompt` | 方法 | <code>getPrompt?(request: MCPPromptRequest): Promise&lt;MCPPromptResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(serverId?: string): Promise&lt;Record&lt;string, import("@codesoul-co/hypha-tools").ProviderHealth&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `normalize` | 方法 | <code>normalize(capability: MCPCapabilityDescriptor): Promise&lt;NormalizedMCPCapability&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `readResource` | 方法 | <code>readResource?(request: MCPResourceReadRequest): Promise&lt;MCPResourceResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MCPGatewayToolRegistrationContext`

MCP Gateway Tool Registration Context 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPGatewayToolRegistrationContext } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface MCPGatewayToolRegistrationContext {
    runId: string;
    stepId?: string;
    sessionId?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPGatewayToolRegistrationOptions`

MCP Gateway Tool Registration Options 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPGatewayToolRegistrationOptions } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface MCPGatewayToolRegistrationOptions {
    integration: MCPIntegrationSpec;
    gateway: MCPGateway;
    registry: ToolRegistry;
    trace?: TraceRecorder;
    traceContext?: MCPGatewayToolRegistrationContext;
    baselineStore?: MCPCapabilityBaselineStore;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baselineStore` | 属性 | <code>baselineStore?: MCPCapabilityBaselineStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `gateway` | 属性 | <code>gateway: MCPGateway</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `integration` | 属性 | <code>integration: MCPIntegrationSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `registry` | 属性 | <code>registry: ToolRegistry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trace` | 属性 | <code>trace?: TraceRecorder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceContext` | 属性 | <code>traceContext?: MCPGatewayToolRegistrationContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPGatewayToolRegistrationResult`

MCP Gateway Tool Registration Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPGatewayToolRegistrationResult } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface MCPGatewayToolRegistrationResult {
    discoveredCapabilities: MCPCapabilityDescriptor[];
    normalizedCapabilities: NormalizedMCPCapability[];
    registeredTools: ToolSpec[];
    quarantinedCapabilities: MCPCapabilityDescriptor[];
    driftRecords: MCPDriftRecord[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `discoveredCapabilities` | 属性 | <code>discoveredCapabilities: MCPCapabilityDescriptor[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `driftRecords` | 属性 | <code>driftRecords: MCPDriftRecord[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `normalizedCapabilities` | 属性 | <code>normalizedCapabilities: NormalizedMCPCapability[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `quarantinedCapabilities` | 属性 | <code>quarantinedCapabilities: MCPCapabilityDescriptor[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `registeredTools` | 属性 | <code>registeredTools: ToolSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPIntegrationSpec`

MCP Integration Spec 接口，共包含 13 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPIntegrationSpec } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface MCPIntegrationSpec {
    id: string;
    version: string;
    servers: MCPServerSpec[];
    allowedCapabilities?: string[];
    deniedCapabilities?: string[];
    trustPolicy?: string;
    importPolicy?: string;
    resourcePolicy?: string;
    toolPolicy?: string;
    promptPolicy?: string;
    versionPinning?: boolean;
    capabilityHashing?: boolean;
    driftPolicy?: MCPDriftPolicy;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedCapabilities` | 属性 | <code>allowedCapabilities?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityHashing` | 属性 | <code>capabilityHashing?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deniedCapabilities` | 属性 | <code>deniedCapabilities?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `driftPolicy` | 属性 | <code>driftPolicy?: MCPDriftPolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `importPolicy` | 属性 | <code>importPolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptPolicy` | 属性 | <code>promptPolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourcePolicy` | 属性 | <code>resourcePolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `servers` | 属性 | <code>servers: MCPServerSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolPolicy` | 属性 | <code>toolPolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trustPolicy` | 属性 | <code>trustPolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionPinning` | 属性 | <code>versionPinning?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPPromptRequest`

MCP Prompt Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPPromptRequest } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface MCPPromptRequest {
    serverId: string;
    name: string;
    arguments?: Record<string, string>;
    context?: Partial<ToolCallContext>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `arguments` | 属性 | <code>arguments?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `context` | 属性 | <code>context?: Partial&lt;ToolCallContext&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPPromptResult`

MCP Prompt Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPPromptResult } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface MCPPromptResult {
    description?: string;
    messages: unknown[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messages` | 属性 | <code>messages: unknown[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPResourceReadRequest`

MCP Resource Read Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPResourceReadRequest } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface MCPResourceReadRequest {
    serverId: string;
    uri: string;
    context?: Partial<ToolCallContext>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context?: Partial&lt;ToolCallContext&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `uri` | 属性 | <code>uri: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPResourceResult`

MCP Resource Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPResourceResult } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface MCPResourceResult {
    contents: Array<{
        uri: string;
        mimeType?: string;
        text?: string;
        blob?: string;
        metadata?: Record<string, unknown>;
    }>;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contents` | 属性 | <code>contents: { uri: string; mimeType?: string; text?: string; blob?: string; metadata?: Record&lt;string, unknown&gt;; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPServerSpec`

MCP Server Spec 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPServerSpec } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface MCPServerSpec {
    id: string;
    mode: 'local' | 'remote';
    version?: string;
    endpoint?: string;
    command?: string;
    args?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `args` | 属性 | <code>args?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `command` | 属性 | <code>command?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `endpoint` | 属性 | <code>endpoint?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "local" &#124; "remote"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPToolCallRequest`

MCP Tool Call Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPToolCallRequest } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface MCPToolCallRequest<TInput = unknown> {
    serverId: string;
    capabilityId: string;
    input: TInput;
    context: ToolCallContext;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `context` | 属性 | <code>context: ToolCallContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `NormalizedMCPCapability`

Normalized MCP Capability 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NormalizedMCPCapability } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export interface NormalizedMCPCapability {
    serverId: string;
    capabilityId: string;
    type: 'tool' | 'resource' | 'prompt';
    normalizedSpecId: string;
    capabilityHash?: string;
    sideEffectLevel?: SideEffectLevel;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityHash` | 属性 | <code>capabilityHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `normalizedSpecId` | 属性 | <code>normalizedSpecId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel?: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "tool" &#124; "prompt" &#124; "resource"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPToolHandler`

MCP Tool Handler 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MCPToolHandler } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts)

### 声明

```text
export type MCPToolHandler<TInput = unknown, TOutput = unknown> = (request: MCPToolCallRequest<TInput>) => Promise<TOutput> | TOutput;
```
