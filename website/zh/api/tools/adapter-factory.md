# `@codesoul-co/hypha-tools` / `adapter-factory`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 源码: [`packages/tools/src/adapter-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)
- 导出数: **17**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Adapter factory 模块公开 2 类、3 常量、3 函数、8 接口、1 类型。

### 从包入口导入

```ts
import {
  LoadedToolAdapterProfiles,
  ToolAdapterFactoryRegistry,
  toolAdapterKinds,
  toolAdapterProfileSchema,
  toolAdapterProfilesDocumentSchema,
  loadToolAdapterProfiles,
  parseToolAdapterProfilesDocument,
  registerConcreteToolAdapterFactories,
} from '@codesoul-co/hypha-tools';

import type {
  ConcreteToolAdapterFactoryDependencies,
  LoadedToolAdapterProfile,
  ToolAdapterFactory,
  ToolAdapterFactoryInput,
  ToolAdapterFactoryRegistryOptions,
  ToolAdapterProfile,
  ToolAdapterProfilesDocument,
  ToolSpecReference,
} from '@codesoul-co/hypha-tools';

// 完整导出列表见下方。
```

### 使用要点

- 9 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 3 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { toolAdapterProfileSchema } from '@codesoul-co/hypha-tools';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = toolAdapterProfileSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LoadedToolAdapterProfiles` | 类 | <code>new LoadedToolAdapterProfiles(entries: Map&lt;string, LoadedToolAdapterProfile&gt;): LoadedToolAdapterProfiles</code> | Loaded Tool Adapter Profiles 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ToolAdapterFactoryRegistry` | 类 | <code>new ToolAdapterFactoryRegistry(options: ToolAdapterFactoryRegistryOptions): ToolAdapterFactoryRegistry</code> | Creates adapters from declarative profiles without allowing profiles to smuggle executable factories or plaintext credentials through configuration. |
| `toolAdapterKinds` | 常量 | <code>const toolAdapterKinds: readonly ["local_function", "http", "plugin", "mcp_stdio", "mcp_streamable_http", "execution"]</code> | 由 `adapter-factory` 模块导出的 Tool Adapter Kinds 常量。 |
| `toolAdapterProfileSchema` | 常量 | <code>const toolAdapterProfileSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; kind: z.ZodEnum&lt;["local_function", "http", "plugin", "mcp_stdio", "mcp_streamable_http", "execution"]&gt;; required: z.ZodDefault&lt;z.ZodBoolean&gt;; toolSpecRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?...</code> | Tool Adapter Profile 的运行时 Schema。 |
| `toolAdapterProfilesDocumentSchema` | 常量 | <code>const toolAdapterProfilesDocumentSchema: z.ZodObject&lt;{ profiles: z.ZodArray&lt;z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; kind: z.ZodEnum&lt;["local_function", "http", "plugin", "mcp_stdio", "mcp_streamable_http", "execution"]&gt;; required: z.ZodDefault&lt;z.ZodBoolean&gt;; toolSpecRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { id: str...</code> | Tool Adapter Profiles Document 的运行时 Schema。 |
| `loadToolAdapterProfiles` | 函数 | <code>loadToolAdapterProfiles(input: unknown, registry: ToolAdapterFactoryRegistry): Promise&lt;LoadedToolAdapterProfiles&gt;</code> | Load Tool Adapter Profiles 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `parseToolAdapterProfilesDocument` | 函数 | <code>parseToolAdapterProfilesDocument(input: unknown): ToolAdapterProfilesDocument</code> | Parse Tool Adapter Profiles Document 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `registerConcreteToolAdapterFactories` | 函数 | <code>registerConcreteToolAdapterFactories(registry: ToolAdapterFactoryRegistry, dependencies?: ConcreteToolAdapterFactoryDependencies): void</code> | Registers the complete declarative factory surface used by server composition. |
| `ConcreteToolAdapterFactoryDependencies` | 接口 | <code>interface ConcreteToolAdapterFactoryDependencies</code> | Concrete Tool Adapter Factory Dependencies 接口，共包含 6 个公开字段或方法。 |
| `LoadedToolAdapterProfile` | 接口 | <code>interface LoadedToolAdapterProfile</code> | Loaded Tool Adapter Profile 接口，共包含 5 个公开字段或方法。 |
| `ToolAdapterFactory` | 接口 | <code>interface ToolAdapterFactory</code> | Tool Adapter Factory 接口，共包含 2 个公开字段或方法。 |
| `ToolAdapterFactoryInput` | 接口 | <code>interface ToolAdapterFactoryInput</code> | Tool Adapter Factory Input 接口，共包含 4 个公开字段或方法。 |
| `ToolAdapterFactoryRegistryOptions` | 接口 | <code>interface ToolAdapterFactoryRegistryOptions</code> | Tool Adapter Factory Registry Options 接口，共包含 2 个公开字段或方法。 |
| `ToolAdapterProfile` | 接口 | <code>interface ToolAdapterProfile</code> | Tool Adapter Profile 接口，共包含 9 个公开字段或方法。 |
| `ToolAdapterProfilesDocument` | 接口 | <code>interface ToolAdapterProfilesDocument</code> | Tool Adapter Profiles Document 接口，共包含 1 个公开字段或方法。 |
| `ToolSpecReference` | 接口 | <code>interface ToolSpecReference</code> | Tool Spec Reference 接口，共包含 3 个公开字段或方法。 |
| `ToolAdapterKind` | 类型 | <code>type ToolAdapterKind = (typeof toolAdapterKinds)[number]</code> | Tool Adapter Kind 公共类型别名；完整类型表达式见声明。 |

## `LoadedToolAdapterProfiles`

Loaded Tool Adapter Profiles 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LoadedToolAdapterProfiles } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
export declare class LoadedToolAdapterProfiles {
    constructor(entries: Map<string, LoadedToolAdapterProfile>);
    list(): LoadedToolAdapterProfile[];
    get(profileId: string): LoadedToolAdapterProfile | undefined;
    health(): Promise<Record<string, Awaited<ReturnType<ToolAdapter['health']>>>>;
    close(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(entries: Map&lt;string, LoadedToolAdapterProfile&gt;): LoadedToolAdapterProfiles</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(profileId: string): LoadedToolAdapterProfile &#124; undefined</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;Record&lt;string, Awaited&lt;ReturnType&lt;ToolAdapter["health"]&gt;&gt;&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): LoadedToolAdapterProfile[]</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolAdapterFactoryRegistry`

Creates adapters from declarative profiles without allowing profiles to smuggle executable factories or plaintext credentials through configuration.

- 种类: 类
- 导入: `import { ToolAdapterFactoryRegistry } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
export declare class ToolAdapterFactoryRegistry {
    constructor(options: ToolAdapterFactoryRegistryOptions);
    register(factory: ToolAdapterFactory): void;
    create(untrustedProfile: ToolAdapterProfile): Promise<{
            profile: ToolAdapterProfile;
            toolSpec: ToolSpec;
            adapter: ToolAdapter;
        }>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ToolAdapterFactoryRegistryOptions): ToolAdapterFactoryRegistry</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(untrustedProfile: ToolAdapterProfile): Promise&lt;{ profile: ToolAdapterProfile; toolSpec: ToolSpec; adapter: ToolAdapter; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `register` | 方法 | <code>register(factory: ToolAdapterFactory): void</code> | 公开方法；参数与返回类型以签名列为准。 |

## `toolAdapterKinds`

由 `adapter-factory` 模块导出的 Tool Adapter Kinds 常量。

- 种类: 常量
- 导入: `import { toolAdapterKinds } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
export declare const toolAdapterKinds: readonly ["local_function", "http", "plugin", "mcp_stdio", "mcp_streamable_http", "execution"];
```

## `toolAdapterProfileSchema`

Tool Adapter Profile 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolAdapterProfileSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const toolAdapterProfileSchema: (typeof import('@codesoul-co/hypha-tools'))['toolAdapterProfileSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `toolAdapterProfilesDocumentSchema`

Tool Adapter Profiles Document 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolAdapterProfilesDocumentSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const toolAdapterProfilesDocumentSchema: (typeof import('@codesoul-co/hypha-tools'))['toolAdapterProfilesDocumentSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `loadToolAdapterProfiles`

Load Tool Adapter Profiles 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { loadToolAdapterProfiles } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
export declare function loadToolAdapterProfiles(input: unknown, registry: ToolAdapterFactoryRegistry): Promise<LoadedToolAdapterProfiles>;
```

### 调用签名

```text
loadToolAdapterProfiles(input: unknown, registry: ToolAdapterFactoryRegistry): Promise<LoadedToolAdapterProfiles>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `registry` | <code>ToolAdapterFactoryRegistry</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<LoadedToolAdapterProfiles>`
- 说明: 返回值契约由上述类型定义。

## `parseToolAdapterProfilesDocument`

Parse Tool Adapter Profiles Document 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { parseToolAdapterProfilesDocument } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
export declare function parseToolAdapterProfilesDocument(input: unknown): ToolAdapterProfilesDocument;
```

### 调用签名

```text
parseToolAdapterProfilesDocument(input: unknown): ToolAdapterProfilesDocument
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ToolAdapterProfilesDocument`
- 说明: 返回值契约由上述类型定义。

## `registerConcreteToolAdapterFactories`

Registers the complete declarative factory surface used by server composition.

- 种类: 函数
- 导入: `import { registerConcreteToolAdapterFactories } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
export declare function registerConcreteToolAdapterFactories(registry: ToolAdapterFactoryRegistry, dependencies?: ConcreteToolAdapterFactoryDependencies): void;
```

### 调用签名

```text
registerConcreteToolAdapterFactories(registry: ToolAdapterFactoryRegistry, dependencies?: ConcreteToolAdapterFactoryDependencies): void
```

Registers the complete declarative factory surface used by server composition.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `registry` | <code>ToolAdapterFactoryRegistry</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `dependencies` | <code>ConcreteToolAdapterFactoryDependencies</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `ConcreteToolAdapterFactoryDependencies`

Concrete Tool Adapter Factory Dependencies 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ConcreteToolAdapterFactoryDependencies } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
export interface ConcreteToolAdapterFactoryDependencies {
    localFunctions?: Readonly<Record<string, ToolHandler>>;
    plugins?: Readonly<Record<string, ToolHandler>>;
    mcpPort?: MCPToolInvocationPort;
    prepareMCPConnection?(input: ToolAdapterFactoryInput): Promise<{
        port: MCPToolInvocationPort;
        close?(): Promise<void>;
    }>;
    createExecutionAdapter?(input: ToolAdapterFactoryInput): Promise<ToolAdapter>;
    fetch?: typeof fetch;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createExecutionAdapter` | 方法 | <code>createExecutionAdapter?(input: ToolAdapterFactoryInput): Promise&lt;ToolAdapter&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fetch` | 方法 | <code>fetch?(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch?(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `localFunctions` | 属性 | <code>localFunctions?: Readonly&lt;Record&lt;string, ToolHandler&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mcpPort` | 属性 | <code>mcpPort?: MCPToolInvocationPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `plugins` | 属性 | <code>plugins?: Readonly&lt;Record&lt;string, ToolHandler&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prepareMCPConnection` | 方法 | <code>prepareMCPConnection?(input: ToolAdapterFactoryInput): Promise&lt;{ port: MCPToolInvocationPort; close?(): Promise&lt;void&gt;; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LoadedToolAdapterProfile`

Loaded Tool Adapter Profile 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LoadedToolAdapterProfile } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
export interface LoadedToolAdapterProfile {
    profile: ToolAdapterProfile;
    toolSpec?: ToolSpec;
    adapter?: ToolAdapter;
    status: 'ready' | 'degraded';
    error?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adapter` | 属性 | <code>adapter?: ToolAdapter&lt;unknown, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profile` | 属性 | <code>profile: ToolAdapterProfile</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "degraded" &#124; "ready"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolSpec` | 属性 | <code>toolSpec?: ToolSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolAdapterFactory`

Tool Adapter Factory 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolAdapterFactory } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
export interface ToolAdapterFactory {
    readonly kind: ToolAdapterKind;
    create(input: ToolAdapterFactoryInput): Promise<ToolAdapter>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(input: ToolAdapterFactoryInput): Promise&lt;ToolAdapter&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `kind` | 属性 | <code>readonly kind: "http" &#124; "execution" &#124; "plugin" &#124; "local_function" &#124; "mcp_stdio" &#124; "mcp_streamable_http"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolAdapterFactoryInput`

Tool Adapter Factory Input 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolAdapterFactoryInput } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
export interface ToolAdapterFactoryInput {
    profile: ToolAdapterProfile;
    toolSpec: ToolSpec;
    resolveCredential(): Promise<string | null>;
    acquireCredential(): Promise<CredentialLease | null>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquireCredential` | 方法 | <code>acquireCredential(): Promise&lt;CredentialLease &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `profile` | 属性 | <code>profile: ToolAdapterProfile</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolveCredential` | 方法 | <code>resolveCredential(): Promise&lt;string &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `toolSpec` | 属性 | <code>toolSpec: ToolSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolAdapterFactoryRegistryOptions`

Tool Adapter Factory Registry Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolAdapterFactoryRegistryOptions } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
export interface ToolAdapterFactoryRegistryOptions {
    resolveToolSpec(reference: ToolSpecReference): Promise<ToolSpec | null>;
    secretResolver?: ToolSecretResolver;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `resolveToolSpec` | 方法 | <code>resolveToolSpec(reference: ToolSpecReference): Promise&lt;ToolSpec &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `secretResolver` | 属性 | <code>secretResolver?: ToolSecretResolver</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolAdapterProfile`

Tool Adapter Profile 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolAdapterProfile } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
export interface ToolAdapterProfile {
    id: string;
    kind: ToolAdapterKind;
    required?: boolean;
    toolSpecRef: ToolSpecReference;
    endpoint?: string;
    credentialRef?: string;
    requiredCapabilities?: Array<keyof ToolAdapterCapabilities>;
    binding?: {
        localFunctionId?: string;
        pluginId?: string;
        executionPortRef?: string;
        mcpServerId?: string;
        mcpCapabilityId?: string;
        mcpConnectionProfileRef?: string;
    };
    /** @deprecated Use the typed binding object. */
    config?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `binding` | 属性 | <code>binding?: { localFunctionId?: string; pluginId?: string; executionPortRef?: string; mcpServerId?: string; mcpCapabilityId?: string; mcpConnectionProfileRef?: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `config` | 属性 | <code>config?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `credentialRef` | 属性 | <code>credentialRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `endpoint` | 属性 | <code>endpoint?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "http" &#124; "execution" &#124; "plugin" &#124; "local_function" &#124; "mcp_stdio" &#124; "mcp_streamable_http"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `required` | 属性 | <code>required?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredCapabilities` | 属性 | <code>requiredCapabilities?: (keyof ToolAdapterCapabilities)[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolSpecRef` | 属性 | <code>toolSpecRef: ToolSpecReference</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolAdapterProfilesDocument`

Tool Adapter Profiles Document 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolAdapterProfilesDocument } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
export interface ToolAdapterProfilesDocument {
    profiles: ToolAdapterProfile[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `profiles` | 属性 | <code>profiles: ToolAdapterProfile[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolSpecReference`

Tool Spec Reference 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolSpecReference } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
export interface ToolSpecReference {
    id: string;
    version?: string;
    revision?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolAdapterKind`

Tool Adapter Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ToolAdapterKind } from '@codesoul-co/hypha-tools';`
- 源码模块: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### 声明

```text
export type ToolAdapterKind = (typeof toolAdapterKinds)[number];
```
