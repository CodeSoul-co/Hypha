# `@codesoul-co/hypha-mcp` / `connection-manager`

- 包索引: [`@codesoul-co/hypha-mcp`](/zh/api/mcp)
- 源码: [`packages/mcp/src/connection-manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)
- 导出数: **18**

## 模块用法

用于使用该功能边界的公共契约与操作。Connection manager 模块公开 2 类、4 常量、2 函数、9 接口、1 类型。

### 从包入口导入

```ts
import {
  MCPConnectionManager,
  SDKMCPConnectionSessionFactory,
  mcpConnectionRecordDefinition,
  mcpConnectionRecordExample,
  mcpConnectionRecordJsonSchema,
  mcpConnectionRecordSchema,
  assertRemoteEgressAllowed,
  createGuardedMCPFetch,
} from '@codesoul-co/hypha-mcp';

import type {
  GuardedMCPFetchOptions,
  MCPConnectionManagerOptions,
  MCPConnectionRecord,
  MCPConnectionSession,
  MCPConnectionSessionFactory,
  MCPConnectionStatus,
  MCPRemoteContentArtifact,
  MCPRemoteContentArtifactPort,
} from '@codesoul-co/hypha-mcp';

// 完整导出列表见下方。
```

### 使用要点

- 10 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 4 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { mcpConnectionRecordSchema } from '@codesoul-co/hypha-mcp';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = mcpConnectionRecordSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MCPConnectionManager` | 类 | <code>new MCPConnectionManager(options: MCPConnectionManagerOptions): MCPConnectionManager</code> | MCP Connection Manager 类，共公开 16 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SDKMCPConnectionSessionFactory` | 类 | <code>new SDKMCPConnectionSessionFactory(options?: SDKMCPConnectionSessionFactoryOptions): SDKMCPConnectionSessionFactory</code> | SDKMCP Connection Session Factory 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `mcpConnectionRecordDefinition` | 常量 | <code>const mcpConnectionRecordDefinition: SpecSchemaDefinition&lt;MCPConnectionRecord&gt;</code> | 由 `connection-manager` 模块导出的 MCP Connection Record Definition 常量。 |
| `mcpConnectionRecordExample` | 常量 | <code>const mcpConnectionRecordExample: MCPConnectionRecord</code> | MCP Connection Record 的有效示例值。 |
| `mcpConnectionRecordJsonSchema` | 常量 | <code>const mcpConnectionRecordJsonSchema: JsonSchema</code> | MCP Connection Record 的 JSON Schema。 |
| `mcpConnectionRecordSchema` | 常量 | <code>const mcpConnectionRecordSchema: z.ZodObject&lt;{ id: z.ZodString; serverId: z.ZodString; revision: z.ZodNumber; state: z.ZodEnum&lt;["disconnected", "starting", "initializing", "ready", "degraded", "reconnecting", "closing", "closed", "failed"]&gt;; transportType: z.ZodEnum&lt;["stdio", "streamable_http", "custom"]&gt;; negotiatedProtocolVersion: z.ZodOptional&lt;z.ZodString&gt;; clientInfo: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.Z...</code> | MCP Connection Record 的运行时 Schema。 |
| `assertRemoteEgressAllowed` | 函数 | <code>assertRemoteEgressAllowed(endpoint: string, policy: MCPServerProfile["egressPolicy"]): Promise&lt;void&gt;</code> | Assert Remote Egress Allowed 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createGuardedMCPFetch` | 函数 | <code>createGuardedMCPFetch(options?: GuardedMCPFetchOptions): MCPFetch</code> | Applies the remote MCP egress policy to every request and redirect hop. Credentials are resolved immediately before each request so rotations take effect without rebuilding declarative profiles. |
| `GuardedMCPFetchOptions` | 接口 | <code>interface GuardedMCPFetchOptions</code> | Guarded MCP Fetch Options 接口，共包含 4 个公开字段或方法。 |
| `MCPConnectionManagerOptions` | 接口 | <code>interface MCPConnectionManagerOptions</code> | MCP Connection Manager Options 接口，共包含 12 个公开字段或方法。 |
| `MCPConnectionRecord` | 接口 | <code>interface MCPConnectionRecord</code> | MCP Connection Record 接口，共包含 18 个公开字段或方法。 |
| `MCPConnectionSession` | 接口 | <code>interface MCPConnectionSession</code> | MCP Connection Session 接口，共包含 9 个公开字段或方法。 |
| `MCPConnectionSessionFactory` | 接口 | <code>interface MCPConnectionSessionFactory</code> | MCP Connection Session Factory 接口，共包含 1 个公开字段或方法。 |
| `MCPConnectionStatus` | 接口 | <code>interface MCPConnectionStatus</code> | MCP Connection Status 接口，共包含 2 个公开字段或方法。 |
| `MCPRemoteContentArtifact` | 接口 | <code>interface MCPRemoteContentArtifact</code> | MCP Remote Content Artifact 接口，共包含 3 个公开字段或方法。 |
| `MCPRemoteContentArtifactPort` | 接口 | <code>interface MCPRemoteContentArtifactPort</code> | MCP Remote Content Artifact Port 接口，共包含 1 个公开字段或方法。 |
| `SDKMCPConnectionSessionFactoryOptions` | 接口 | <code>interface SDKMCPConnectionSessionFactoryOptions</code> | SDKMCP Connection Session Factory Options 接口，共包含 5 个公开字段或方法。 |
| `MCPConnectionState` | 类型 | <code>type MCPConnectionState = 'disconnected' &#124; 'starting' &#124; 'initializing' &#124; 'ready' &#124; 'degraded' &#124; 'reconnecting' &#124; 'closing' &#124; 'closed' &#124; 'failed'</code> | MCP Connection State 公共类型别名；完整类型表达式见声明。 |

## `MCPConnectionManager`

MCP Connection Manager 类，共公开 16 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MCPConnectionManager } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export declare class MCPConnectionManager implements MCPGateway {
    constructor(options: MCPConnectionManagerOptions);
    onListChanged(listener: (serverId: string) => Promise<void> | void): () => void;
    register(profile: MCPServerProfile): MCPConnectionRecord;
    connect(serverId: string): Promise<MCPConnectionRecord>;
    get(serverId: string): Promise<MCPConnectionRecord | null>;
    status(serverId: string): Promise<MCPConnectionStatus>;
    health(serverId?: string): Promise<Record<string, ProviderHealth>>;
    reconnect(serverId: string): Promise<MCPConnectionRecord>;
    cancelRequest(requestId: string): Promise<void>;
    disconnect(serverId: string, reason?: string): Promise<void>;
    closeAll(): Promise<void>;
    discover(integration: MCPIntegrationSpec): Promise<MCPCapabilityDescriptor[]>;
    normalize(capability: MCPCapabilityDescriptor): Promise<NormalizedMCPCapability>;
    call(request: MCPToolCallRequest): Promise<unknown>;
    readResource(request: MCPResourceReadRequest): Promise<MCPResourceResult>;
    getPrompt(request: MCPPromptRequest): Promise<MCPPromptResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `call` | 方法 | <code>call(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `cancelRequest` | 方法 | <code>cancelRequest(requestId: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `closeAll` | 方法 | <code>closeAll(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `connect` | 方法 | <code>connect(serverId: string): Promise&lt;MCPConnectionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: MCPConnectionManagerOptions): MCPConnectionManager</code> | 创建该类的实例。 |
| `disconnect` | 方法 | <code>disconnect(serverId: string, reason?: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `discover` | 方法 | <code>discover(integration: MCPIntegrationSpec): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(serverId: string): Promise&lt;MCPConnectionRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getPrompt` | 方法 | <code>getPrompt(request: MCPPromptRequest): Promise&lt;MCPPromptResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(serverId?: string): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `normalize` | 方法 | <code>normalize(capability: MCPCapabilityDescriptor): Promise&lt;NormalizedMCPCapability&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onListChanged` | 方法 | <code>onListChanged(listener: (serverId: string) =&gt; Promise&lt;void&gt; &#124; void): () =&gt; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `readResource` | 方法 | <code>readResource(request: MCPResourceReadRequest): Promise&lt;MCPResourceResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reconnect` | 方法 | <code>reconnect(serverId: string): Promise&lt;MCPConnectionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `register` | 方法 | <code>register(profile: MCPServerProfile): MCPConnectionRecord</code> | 公开方法；参数与返回类型以签名列为准。 |
| `status` | 方法 | <code>status(serverId: string): Promise&lt;MCPConnectionStatus&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SDKMCPConnectionSessionFactory`

SDKMCP Connection Session Factory 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SDKMCPConnectionSessionFactory } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export declare class SDKMCPConnectionSessionFactory implements MCPConnectionSessionFactory {
    constructor(options?: SDKMCPConnectionSessionFactoryOptions);
    create(profile: MCPServerProfile): MCPConnectionSession;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: SDKMCPConnectionSessionFactoryOptions): SDKMCPConnectionSessionFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(profile: MCPServerProfile): MCPConnectionSession</code> | 公开方法；参数与返回类型以签名列为准。 |

## `mcpConnectionRecordDefinition`

由 `connection-manager` 模块导出的 MCP Connection Record Definition 常量。

- 种类: 常量
- 导入: `import { mcpConnectionRecordDefinition } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export declare const mcpConnectionRecordDefinition: SpecSchemaDefinition<MCPConnectionRecord>;
```

## `mcpConnectionRecordExample`

MCP Connection Record 的有效示例值。

- 种类: 常量
- 导入: `import { mcpConnectionRecordExample } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export declare const mcpConnectionRecordExample: MCPConnectionRecord;
```

## `mcpConnectionRecordJsonSchema`

MCP Connection Record 的 JSON Schema。

- 种类: 常量
- 导入: `import { mcpConnectionRecordJsonSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export declare const mcpConnectionRecordJsonSchema: JsonSchema;
```

## `mcpConnectionRecordSchema`

MCP Connection Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { mcpConnectionRecordSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const mcpConnectionRecordSchema: (typeof import('@codesoul-co/hypha-mcp'))['mcpConnectionRecordSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `assertRemoteEgressAllowed`

Assert Remote Egress Allowed 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assertRemoteEgressAllowed } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export declare function assertRemoteEgressAllowed(endpoint: string, policy: MCPServerProfile['egressPolicy']): Promise<void>;
```

### 调用签名

```text
assertRemoteEgressAllowed(endpoint: string, policy: MCPServerProfile["egressPolicy"]): Promise<void>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `endpoint` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `policy` | <code>{ allowedHosts?: string[]; denyPrivateNetworks?: boolean; requireTls?: boolean; maxRedirects?: number; allowCrossOriginRedirects?: boolean; }</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<void>`
- 说明: 返回值契约由上述类型定义。

## `createGuardedMCPFetch`

Applies the remote MCP egress policy to every request and redirect hop. Credentials are resolved immediately before each request so rotations take effect without rebuilding declarative profiles.

- 种类: 函数
- 导入: `import { createGuardedMCPFetch } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export declare function createGuardedMCPFetch(options?: GuardedMCPFetchOptions): MCPFetch;
```

### 调用签名

```text
createGuardedMCPFetch(options?: GuardedMCPFetchOptions): MCPFetch
```

Applies the remote MCP egress policy to every request and redirect hop. Credentials are resolved immediately before each request so rotations take effect without rebuilding declarative profiles.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>GuardedMCPFetchOptions</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MCPFetch`
- 说明: 返回值契约由上述类型定义。

## `GuardedMCPFetchOptions`

Guarded MCP Fetch Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { GuardedMCPFetchOptions } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export interface GuardedMCPFetchOptions {
    policy?: MCPServerProfile['egressPolicy'];
    fetch?: MCPFetch;
    resolveHeaders?: () => Promise<Record<string, string>> | Record<string, string>;
    resolveAuthorization?: () => Promise<string | undefined> | string | undefined;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fetch` | 方法 | <code>fetch?(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `policy` | 属性 | <code>policy?: { allowedHosts?: string[]; denyPrivateNetworks?: boolean; requireTls?: boolean; maxRedirects?: number; allowCrossOriginRedirects?: boolean; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolveAuthorization` | 方法 | <code>resolveAuthorization?(): Promise&lt;string &#124; undefined&gt; &#124; string &#124; undefined</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolveHeaders` | 方法 | <code>resolveHeaders?(): Promise&lt;Record&lt;string, string&gt;&gt; &#124; Record&lt;string, string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MCPConnectionManagerOptions`

MCP Connection Manager Options 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPConnectionManagerOptions } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export interface MCPConnectionManagerOptions {
    sessionFactory: MCPConnectionSessionFactory;
    trace?: TraceRecorder;
    traceContext?: {
        runId: string;
        stepId?: string;
        sessionId?: string;
    };
    now?: () => string;
    monotonicNow?: () => number;
    sleep?: (ms: number) => Promise<void>;
    random?: () => number;
    onListChanged?: (serverId: string) => Promise<void> | void;
    telemetry?: TelemetryRecorder;
    contentArtifacts?: MCPRemoteContentArtifactPort;
    reconnectCoordinator?: MCPReconnectCoordinator;
    reconnectOwnerId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentArtifacts` | 属性 | <code>contentArtifacts?: MCPRemoteContentArtifactPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `monotonicNow` | 方法 | <code>monotonicNow?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onListChanged` | 方法 | <code>onListChanged?(serverId: string): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `random` | 方法 | <code>random?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reconnectCoordinator` | 属性 | <code>reconnectCoordinator?: MCPReconnectCoordinator</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconnectOwnerId` | 属性 | <code>reconnectOwnerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionFactory` | 属性 | <code>sessionFactory: MCPConnectionSessionFactory</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sleep` | 方法 | <code>sleep?(ms: number): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `telemetry` | 属性 | <code>telemetry?: TelemetryRecorder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trace` | 属性 | <code>trace?: TraceRecorder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceContext` | 属性 | <code>traceContext?: { runId: string; stepId?: string; sessionId?: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPConnectionRecord`

MCP Connection Record 接口，共包含 18 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPConnectionRecord } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export interface MCPConnectionRecord {
    id: string;
    serverId: string;
    revision: number;
    state: MCPConnectionState;
    transportType: MCPTransportSpec['type'];
    negotiatedProtocolVersion?: string;
    clientInfo?: Record<string, unknown>;
    serverInfo?: Record<string, unknown>;
    serverCapabilities?: Record<string, unknown>;
    startedAt?: string;
    readyAt?: string;
    lastActivityAt?: string;
    lastHealthCheckAt?: string;
    closedAt?: string;
    activeRequestCount: number;
    reconnectAttempts: number;
    error?: NormalizedMCPError;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeRequestCount` | 属性 | <code>activeRequestCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `clientInfo` | 属性 | <code>clientInfo?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `closedAt` | 属性 | <code>closedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedMCPError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastActivityAt` | 属性 | <code>lastActivityAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastHealthCheckAt` | 属性 | <code>lastHealthCheckAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `negotiatedProtocolVersion` | 属性 | <code>negotiatedProtocolVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `readyAt` | 属性 | <code>readyAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconnectAttempts` | 属性 | <code>reconnectAttempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverCapabilities` | 属性 | <code>serverCapabilities?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverInfo` | 属性 | <code>serverInfo?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startedAt` | 属性 | <code>startedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: MCPConnectionState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transportType` | 属性 | <code>transportType: "custom" &#124; "stdio" &#124; "streamable_http"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPConnectionSession`

MCP Connection Session 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPConnectionSession } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export interface MCPConnectionSession {
    connect(signal?: AbortSignal): Promise<{
        negotiatedProtocolVersion?: string;
        serverInfo?: Record<string, unknown>;
        serverCapabilities?: Record<string, unknown>;
    }>;
    listCapabilities(signal?: AbortSignal): Promise<MCPCapabilityDescriptor[]>;
    callTool(capabilityId: string, input: unknown, options?: {
        signal?: AbortSignal;
        timeoutMs?: number;
        onProgress?: (progress: unknown) => void;
    }): Promise<unknown>;
    readResource?(uri: string, options?: {
        signal?: AbortSignal;
        timeoutMs?: number;
    }): Promise<MCPResourceResult>;
    getPrompt?(name: string, args?: Record<string, string>, options?: {
        signal?: AbortSignal;
        timeoutMs?: number;
    }): Promise<MCPPromptResult>;
    ping(signal?: AbortSignal): Promise<void>;
    close(): Promise<void>;
    onClose?: (error?: Error) => void;
    onListChanged?: () => void;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `callTool` | 方法 | <code>callTool(capabilityId: string, input: unknown, options?: { signal?: AbortSignal; timeoutMs?: number; onProgress?: (progress: unknown) =&gt; void; }): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `connect` | 方法 | <code>connect(signal?: AbortSignal): Promise&lt;{ negotiatedProtocolVersion?: string; serverInfo?: Record&lt;string, unknown&gt;; serverCapabilities?: Record&lt;string, unknown&gt;; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getPrompt` | 方法 | <code>getPrompt?(name: string, args?: Record&lt;string, string&gt;, options?: { signal?: AbortSignal; timeoutMs?: number; }): Promise&lt;MCPPromptResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listCapabilities` | 方法 | <code>listCapabilities(signal?: AbortSignal): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onClose` | 方法 | <code>onClose?(error?: Error): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onListChanged` | 方法 | <code>onListChanged?(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `ping` | 方法 | <code>ping(signal?: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `readResource` | 方法 | <code>readResource?(uri: string, options?: { signal?: AbortSignal; timeoutMs?: number; }): Promise&lt;MCPResourceResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MCPConnectionSessionFactory`

MCP Connection Session Factory 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPConnectionSessionFactory } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export interface MCPConnectionSessionFactory {
    create(profile: MCPServerProfile): MCPConnectionSession;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(profile: MCPServerProfile): MCPConnectionSession</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MCPConnectionStatus`

MCP Connection Status 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPConnectionStatus } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export interface MCPConnectionStatus {
    record: MCPConnectionRecord | null;
    health: ProviderHealth;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `health` | 属性 | <code>health: ProviderHealth</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `record` | 属性 | <code>record: MCPConnectionRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPRemoteContentArtifact`

MCP Remote Content Artifact 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPRemoteContentArtifact } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export interface MCPRemoteContentArtifact {
    artifactRef: string;
    contentHash: string;
    sizeBytes: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPRemoteContentArtifactPort`

MCP Remote Content Artifact Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPRemoteContentArtifactPort } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export interface MCPRemoteContentArtifactPort {
    store(input: {
        serverId: string;
        kind: 'resource' | 'prompt';
        capabilityId: string;
        mediaType: string;
        bytes: Uint8Array;
        contentHash: string;
        provenance: Record<string, unknown>;
    }): Promise<MCPRemoteContentArtifact>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `store` | 方法 | <code>store(input: { serverId: string; kind: "resource" &#124; "prompt"; capabilityId: string; mediaType: string; bytes: Uint8Array; contentHash: string; provenance: Record&lt;string, unknown&gt;; }): Promise&lt;MCPRemoteContentArtifact&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SDKMCPConnectionSessionFactoryOptions`

SDKMCP Connection Session Factory Options 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SDKMCPConnectionSessionFactoryOptions } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export interface SDKMCPConnectionSessionFactoryOptions {
    clientInfo?: {
        name: string;
        version: string;
    };
    resolveHeadersRef?: (ref: string) => Promise<Record<string, string>> | Record<string, string>;
    resolveAuthorizationRef?: (ref: string) => Promise<string> | string;
    resolveWorkingDirectoryRef?: (ref: string) => Promise<string> | string;
    resolveEnvironmentRefs?: (refs: string[]) => Promise<Record<string, string>> | Record<string, string>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clientInfo` | 属性 | <code>clientInfo?: { name: string; version: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolveAuthorizationRef` | 方法 | <code>resolveAuthorizationRef?(ref: string): Promise&lt;string&gt; &#124; string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolveEnvironmentRefs` | 方法 | <code>resolveEnvironmentRefs?(refs: string[]): Promise&lt;Record&lt;string, string&gt;&gt; &#124; Record&lt;string, string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolveHeadersRef` | 方法 | <code>resolveHeadersRef?(ref: string): Promise&lt;Record&lt;string, string&gt;&gt; &#124; Record&lt;string, string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolveWorkingDirectoryRef` | 方法 | <code>resolveWorkingDirectoryRef?(ref: string): Promise&lt;string&gt; &#124; string</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MCPConnectionState`

MCP Connection State 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MCPConnectionState } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### 声明

```text
export type MCPConnectionState = 'disconnected' | 'starting' | 'initializing' | 'ready' | 'degraded' | 'reconnecting' | 'closing' | 'closed' | 'failed';
```
