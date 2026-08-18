# `@codesoul-co/hypha-mcp` / `catalog`

- 包索引: [`@codesoul-co/hypha-mcp`](/zh/api/mcp)
- 源码: [`packages/mcp/src/catalog.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)
- 导出数: **24**

## 模块用法

用于注册并解析版本化能力或实现。Catalog 模块公开 6 类、4 常量、1 函数、11 接口、2 类型。

### 从包入口导入

```ts
import {
  InMemoryMCPCapabilityCatalogStore,
  InMemoryToolContractSnapshotStore,
  MCPCapabilityCatalog,
  MCPSchemaCache,
  RedisMCPCapabilityCatalogStore,
  RedisToolContractSnapshotStore,
  mcpCapabilityRecordDefinition,
  mcpCapabilityRecordExample,
} from '@codesoul-co/hypha-mcp';

import type {
  MCPCapabilityApprovalRequest,
  MCPCapabilityCatalogOptions,
  MCPCapabilityCatalogStore,
  MCPCapabilityListRequest,
  MCPCapabilityQuarantineRequest,
  MCPCapabilityRecord,
  MCPCapabilityRef,
  MCPCatalogSnapshot,
} from '@codesoul-co/hypha-mcp';

// 完整导出列表见下方。
```

### 使用要点

- 13 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 6 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 4 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMCPCapabilityCatalogStore` | 类 | <code>new InMemoryMCPCapabilityCatalogStore(): InMemoryMCPCapabilityCatalogStore</code> | In Memory MCP Capability Catalog Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryToolContractSnapshotStore` | 类 | <code>new InMemoryToolContractSnapshotStore(): InMemoryToolContractSnapshotStore</code> | In Memory Tool Contract Snapshot Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MCPCapabilityCatalog` | 类 | <code>new MCPCapabilityCatalog(options: MCPCapabilityCatalogOptions): MCPCapabilityCatalog</code> | MCP Capability Catalog 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MCPSchemaCache` | 类 | <code>new MCPSchemaCache(options?: MCPSchemaCacheOptions): MCPSchemaCache</code> | MCP Schema Cache 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RedisMCPCapabilityCatalogStore` | 类 | <code>new RedisMCPCapabilityCatalogStore(client: RedisLikeMCPStoreClient, namespace?: string): RedisMCPCapabilityCatalogStore</code> | Multi-worker catalog store. Redis key operations are idempotent per capability id. |
| `RedisToolContractSnapshotStore` | 类 | <code>new RedisToolContractSnapshotStore(client: Pick&lt;RedisLikeMCPStoreClient, "get" &#124; "set"&gt;, namespace?: string): RedisToolContractSnapshotStore</code> | Redis Tool Contract Snapshot Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `mcpCapabilityRecordDefinition` | 常量 | <code>const mcpCapabilityRecordDefinition: SpecSchemaDefinition&lt;MCPCapabilityRecord&gt;</code> | 由 `catalog` 模块导出的 MCP Capability Record Definition 常量。 |
| `mcpCapabilityRecordExample` | 常量 | <code>const mcpCapabilityRecordExample: MCPCapabilityRecord</code> | MCP Capability Record 的有效示例值。 |
| `mcpCapabilityRecordJsonSchema` | 常量 | <code>const mcpCapabilityRecordJsonSchema: JsonSchema</code> | MCP Capability Record 的 JSON Schema。 |
| `mcpCapabilityRecordSchema` | 常量 | <code>const mcpCapabilityRecordSchema: ZodType&lt;MCPCapabilityRecord, ZodTypeDef, MCPCapabilityRecord&gt;</code> | MCP Capability Record 的运行时 Schema。 |
| `normalizeMCPToolOutput` | 函数 | <code>normalizeMCPToolOutput(result: unknown): unknown</code> | MCP CallToolResult is a transport envelope. A declared Tool output schema applies to structuredContent, not to the protocol's content/isError fields. |
| `MCPCapabilityApprovalRequest` | 接口 | <code>interface MCPCapabilityApprovalRequest extends MCPCapabilityRef</code> | MCP Capability Approval Request 接口，共包含 8 个公开字段或方法。 |
| `MCPCapabilityCatalogOptions` | 接口 | <code>interface MCPCapabilityCatalogOptions</code> | MCP Capability Catalog Options 接口，共包含 10 个公开字段或方法。 |
| `MCPCapabilityCatalogStore` | 接口 | <code>interface MCPCapabilityCatalogStore</code> | MCP Capability Catalog Store 接口，共包含 2 个公开字段或方法。 |
| `MCPCapabilityListRequest` | 接口 | <code>interface MCPCapabilityListRequest</code> | MCP Capability List Request 接口，共包含 9 个公开字段或方法。 |
| `MCPCapabilityQuarantineRequest` | 接口 | <code>interface MCPCapabilityQuarantineRequest extends MCPCapabilityRef</code> | MCP Capability Quarantine Request 接口，共包含 5 个公开字段或方法。 |
| `MCPCapabilityRecord` | 接口 | <code>interface MCPCapabilityRecord</code> | MCP Capability Record 接口，共包含 21 个公开字段或方法。 |
| `MCPCapabilityRef` | 接口 | <code>interface MCPCapabilityRef</code> | MCP Capability Ref 接口，共包含 4 个公开字段或方法。 |
| `MCPCatalogSnapshot` | 接口 | <code>interface MCPCatalogSnapshot</code> | MCP Catalog Snapshot 接口，共包含 7 个公开字段或方法。 |
| `MCPSchemaCacheEntry` | 接口 | <code>interface MCPSchemaCacheEntry</code> | MCP Schema Cache Entry 接口，共包含 7 个公开字段或方法。 |
| `MCPSchemaCacheOptions` | 接口 | <code>interface MCPSchemaCacheOptions</code> | MCP Schema Cache Options 接口，共包含 2 个公开字段或方法。 |
| `RedisLikeMCPStoreClient` | 接口 | <code>interface RedisLikeMCPStoreClient</code> | Redis Like MCP Store Client 接口，共包含 5 个公开字段或方法。 |
| `MCPCapabilityDriftType` | 类型 | <code>type MCPCapabilityDriftType = 'description_changed' &#124; 'input_schema_changed' &#124; 'output_schema_changed' &#124; 'annotations_changed' &#124; 'capability_added' &#124; 'capability_removed' &#124; 'server_identity_changed' &#124; 'protocol_version_changed'</code> | MCP Capability Drift Type 公共类型别名；完整类型表达式见声明。 |
| `MCPCapabilityKind` | 类型 | <code>type MCPCapabilityKind = 'tool' &#124; 'resource' &#124; 'prompt'</code> | MCP Capability Kind 公共类型别名；完整类型表达式见声明。 |

## `InMemoryMCPCapabilityCatalogStore`

In Memory MCP Capability Catalog Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryMCPCapabilityCatalogStore } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export declare class InMemoryMCPCapabilityCatalogStore implements MCPCapabilityCatalogStore {
    list(serverId?: string): Promise<MCPCapabilityRecord[]>;
    save(record: MCPCapabilityRecord, options?: {
            expected?: MCPCapabilityRecord | null;
        }): Promise<boolean>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryMCPCapabilityCatalogStore</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryToolContractSnapshotStore`

In Memory Tool Contract Snapshot Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryToolContractSnapshotStore } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export declare class InMemoryToolContractSnapshotStore implements ToolContractSnapshotStore {
    get(snapshotId: string): Promise<ToolContractSnapshot | null>;
    save(snapshot: ToolContractSnapshot): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryToolContractSnapshotStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MCPCapabilityCatalog`

MCP Capability Catalog 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MCPCapabilityCatalog } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export declare class MCPCapabilityCatalog {
    readonly snapshotStore: ToolContractSnapshotStore;
    constructor(options: MCPCapabilityCatalogOptions);
    bindConnectionManager(manager: MCPConnectionManager): () => void;
    refresh(serverId: string, reason?: string): Promise<MCPCatalogSnapshot>;
    getCapability(ref: MCPCapabilityRef): Promise<MCPCapabilityRecord | null>;
    list(request?: MCPCapabilityListRequest): Promise<MCPCapabilityRecord[]>;
    quarantine(request: MCPCapabilityQuarantineRequest): Promise<void>;
    approveRevision(request: MCPCapabilityApprovalRequest): Promise<void>;
    importTools(registry: ToolRegistry, refs: MCPCapabilityRef[], context?: Partial<ToolCallContext>): Promise<ToolSpec[]>;
    snapshot(runId: string, refs: MCPCapabilityRef[]): Promise<ToolContractSnapshot>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approveRevision` | 方法 | <code>approveRevision(request: MCPCapabilityApprovalRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `bindConnectionManager` | 方法 | <code>bindConnectionManager(manager: MCPConnectionManager): () =&gt; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: MCPCapabilityCatalogOptions): MCPCapabilityCatalog</code> | 创建该类的实例。 |
| `getCapability` | 方法 | <code>getCapability(ref: MCPCapabilityRef): Promise&lt;MCPCapabilityRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `importTools` | 方法 | <code>importTools(registry: ToolRegistry, refs: MCPCapabilityRef[], context?: Partial&lt;ToolCallContext&gt;): Promise&lt;ToolSpec[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request?: MCPCapabilityListRequest): Promise&lt;MCPCapabilityRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `quarantine` | 方法 | <code>quarantine(request: MCPCapabilityQuarantineRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `refresh` | 方法 | <code>refresh(serverId: string, reason?: string): Promise&lt;MCPCatalogSnapshot&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `snapshot` | 方法 | <code>snapshot(runId: string, refs: MCPCapabilityRef[]): Promise&lt;ToolContractSnapshot&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `snapshotStore` | 属性 | <code>readonly snapshotStore: ToolContractSnapshotStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPSchemaCache`

MCP Schema Cache 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MCPSchemaCache } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export declare class MCPSchemaCache {
    constructor(options?: MCPSchemaCacheOptions);
    get(ref: MCPCapabilityRef & {
            protocolVersion?: string;
        }): MCPSchemaCacheEntry | null;
    set(record: MCPCapabilityRecord): MCPSchemaCacheEntry;
    invalidate(serverId: string, capabilityId?: string): number;
    size(): number;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: MCPSchemaCacheOptions): MCPSchemaCache</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(ref: MCPCapabilityRef &amp; { protocolVersion?: string; }): MCPSchemaCacheEntry &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidate` | 方法 | <code>invalidate(serverId: string, capabilityId?: string): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(record: MCPCapabilityRecord): MCPSchemaCacheEntry</code> | 公开方法；参数与返回类型以签名列为准。 |
| `size` | 方法 | <code>size(): number</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisMCPCapabilityCatalogStore`

Multi-worker catalog store. Redis key operations are idempotent per capability id.

- 种类: 类
- 导入: `import { RedisMCPCapabilityCatalogStore } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export declare class RedisMCPCapabilityCatalogStore implements MCPCapabilityCatalogStore {
    constructor(client: RedisLikeMCPStoreClient, namespace?: string);
    list(serverId?: string): Promise<MCPCapabilityRecord[]>;
    save(record: MCPCapabilityRecord, options?: {
            expected?: MCPCapabilityRecord | null;
        }): Promise<boolean>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(client: RedisLikeMCPStoreClient, namespace?: string): RedisMCPCapabilityCatalogStore</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisToolContractSnapshotStore`

Redis Tool Contract Snapshot Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RedisToolContractSnapshotStore } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export declare class RedisToolContractSnapshotStore implements ToolContractSnapshotStore {
    constructor(client: Pick<RedisLikeMCPStoreClient, 'get' | 'set'>, namespace?: string);
    get(snapshotId: string): Promise<ToolContractSnapshot | null>;
    save(snapshot: ToolContractSnapshot): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(client: Pick&lt;RedisLikeMCPStoreClient, "get" &#124; "set"&gt;, namespace?: string): RedisToolContractSnapshotStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `mcpCapabilityRecordDefinition`

由 `catalog` 模块导出的 MCP Capability Record Definition 常量。

- 种类: 常量
- 导入: `import { mcpCapabilityRecordDefinition } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export declare const mcpCapabilityRecordDefinition: SpecSchemaDefinition<MCPCapabilityRecord>;
```

## `mcpCapabilityRecordExample`

MCP Capability Record 的有效示例值。

- 种类: 常量
- 导入: `import { mcpCapabilityRecordExample } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export declare const mcpCapabilityRecordExample: MCPCapabilityRecord;
```

## `mcpCapabilityRecordJsonSchema`

MCP Capability Record 的 JSON Schema。

- 种类: 常量
- 导入: `import { mcpCapabilityRecordJsonSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export declare const mcpCapabilityRecordJsonSchema: JsonSchema;
```

## `mcpCapabilityRecordSchema`

MCP Capability Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { mcpCapabilityRecordSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export declare const mcpCapabilityRecordSchema: ZodType<MCPCapabilityRecord, ZodTypeDef, MCPCapabilityRecord>;
```

## `normalizeMCPToolOutput`

MCP CallToolResult is a transport envelope. A declared Tool output schema applies to structuredContent, not to the protocol's content/isError fields.

- 种类: 函数
- 导入: `import { normalizeMCPToolOutput } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export declare function normalizeMCPToolOutput(result: unknown): unknown;
```

### 调用签名

```text
normalizeMCPToolOutput(result: unknown): unknown
```

MCP CallToolResult is a transport envelope. A declared Tool output schema applies to structuredContent, not to the protocol's content/isError fields.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `result` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `unknown`
- 说明: 返回值契约由上述类型定义。

## `MCPCapabilityApprovalRequest`

MCP Capability Approval Request 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPCapabilityApprovalRequest } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export interface MCPCapabilityApprovalRequest extends MCPCapabilityRef {
    approvedBy: string;
    expiresAt?: string;
    restrictions?: string[];
    sideEffectLevel?: SideEffectLevel;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvedBy` | 属性 | <code>approvedBy: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityHash` | 属性 | <code>capabilityHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind?: MCPCapabilityKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `restrictions` | 属性 | <code>restrictions?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel?: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPCapabilityCatalogOptions`

MCP Capability Catalog Options 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPCapabilityCatalogOptions } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export interface MCPCapabilityCatalogOptions {
    integration: MCPIntegrationSpec;
    gateway: MCPGateway;
    trustPolicy: MCPTrustPolicySpec;
    driftPolicy: MCPCapabilityDriftPolicySpec;
    store?: MCPCapabilityCatalogStore;
    schemaCache?: MCPSchemaCache;
    snapshotStore?: ToolContractSnapshotStore;
    now?: () => string;
    onEvent?: (type: string, payload: Record<string, unknown>) => Promise<void> | void;
    telemetry?: TelemetryRecorder;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `driftPolicy` | 属性 | <code>driftPolicy: MCPCapabilityDriftPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `gateway` | 属性 | <code>gateway: MCPGateway</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `integration` | 属性 | <code>integration: MCPIntegrationSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onEvent` | 方法 | <code>onEvent?(type: string, payload: Record&lt;string, unknown&gt;): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `schemaCache` | 属性 | <code>schemaCache?: MCPSchemaCache</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotStore` | 属性 | <code>snapshotStore?: ToolContractSnapshotStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `store` | 属性 | <code>store?: MCPCapabilityCatalogStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `telemetry` | 属性 | <code>telemetry?: TelemetryRecorder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trustPolicy` | 属性 | <code>trustPolicy: MCPTrustPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPCapabilityCatalogStore`

MCP Capability Catalog Store 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPCapabilityCatalogStore } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export interface MCPCapabilityCatalogStore {
    list(serverId?: string): Promise<MCPCapabilityRecord[]>;
    save(record: MCPCapabilityRecord, options?: {
        expected?: MCPCapabilityRecord | null;
    }): Promise<boolean>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `list` | 方法 | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MCPCapabilityListRequest`

MCP Capability List Request 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPCapabilityListRequest } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export interface MCPCapabilityListRequest {
    serverId?: string;
    kind?: MCPCapabilityKind;
    states?: MCPCapabilityRecord['driftState'][];
    permissionScopes?: string[];
    tags?: string[];
    query?: string;
    loadDescriptors?: boolean;
    schemaTokenBudget?: number;
    limit?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `kind` | 属性 | <code>kind?: MCPCapabilityKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `limit` | 属性 | <code>limit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `loadDescriptors` | 属性 | <code>loadDescriptors?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permissionScopes` | 属性 | <code>permissionScopes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `query` | 属性 | <code>query?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaTokenBudget` | 属性 | <code>schemaTokenBudget?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `states` | 属性 | <code>states?: ("quarantined" &#124; "approved" &#124; "changed" &#124; "removed" &#124; "stable" &#124; "new")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPCapabilityQuarantineRequest`

MCP Capability Quarantine Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPCapabilityQuarantineRequest } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export interface MCPCapabilityQuarantineRequest extends MCPCapabilityRef {
    reason: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityHash` | 属性 | <code>capabilityHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind?: MCPCapabilityKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPCapabilityRecord`

MCP Capability Record 接口，共包含 21 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPCapabilityRecord } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export interface MCPCapabilityRecord {
    id: string;
    serverId: string;
    kind: MCPCapabilityKind;
    remoteName: string;
    stableToolId?: string;
    protocolVersion?: string;
    capabilityVersion?: string;
    capabilityHash: string;
    schemaHash?: string;
    descriptorHash: string;
    descriptor: Record<string, unknown>;
    normalizedToolSpec?: ToolSpec;
    trust: MCPCapabilityTrustRecord;
    driftState: 'stable' | 'new' | 'changed' | 'removed' | 'quarantined' | 'approved';
    driftTypes?: MCPCapabilityDriftType[];
    firstSeenAt: string;
    lastSeenAt: string;
    approvedAt?: string;
    approvalExpiresAt?: string;
    removedAt?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalExpiresAt` | 属性 | <code>approvalExpiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `approvedAt` | 属性 | <code>approvedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityHash` | 属性 | <code>capabilityHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityVersion` | 属性 | <code>capabilityVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `descriptor` | 属性 | <code>descriptor: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `descriptorHash` | 属性 | <code>descriptorHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `driftState` | 属性 | <code>driftState: "quarantined" &#124; "approved" &#124; "changed" &#124; "removed" &#124; "stable" &#124; "new"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `driftTypes` | 属性 | <code>driftTypes?: MCPCapabilityDriftType[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `firstSeenAt` | 属性 | <code>firstSeenAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: MCPCapabilityKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastSeenAt` | 属性 | <code>lastSeenAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `normalizedToolSpec` | 属性 | <code>normalizedToolSpec?: ToolSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `protocolVersion` | 属性 | <code>protocolVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `remoteName` | 属性 | <code>remoteName: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `removedAt` | 属性 | <code>removedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaHash` | 属性 | <code>schemaHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stableToolId` | 属性 | <code>stableToolId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trust` | 属性 | <code>trust: MCPCapabilityTrustRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPCapabilityRef`

MCP Capability Ref 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPCapabilityRef } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export interface MCPCapabilityRef {
    serverId: string;
    capabilityId: string;
    kind?: MCPCapabilityKind;
    capabilityHash?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityHash` | 属性 | <code>capabilityHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind?: MCPCapabilityKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPCatalogSnapshot`

MCP Catalog Snapshot 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPCatalogSnapshot } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export interface MCPCatalogSnapshot {
    id: string;
    serverId: string;
    revision: string;
    createdAt: string;
    reason?: string;
    capabilities: MCPCapabilityRecord[];
    drift: Array<{
        capabilityId: string;
        previousHash?: string;
        currentHash?: string;
        types: MCPCapabilityDriftType[];
    }>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: MCPCapabilityRecord[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `drift` | 属性 | <code>drift: { capabilityId: string; previousHash?: string; currentHash?: string; types: MCPCapabilityDriftType[]; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPSchemaCacheEntry`

MCP Schema Cache Entry 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPSchemaCacheEntry } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export interface MCPSchemaCacheEntry {
    key: string;
    serverId: string;
    capabilityId: string;
    capabilityHash: string;
    protocolVersion?: string;
    schema?: JsonSchema;
    cachedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cachedAt` | 属性 | <code>cachedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityHash` | 属性 | <code>capabilityHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `protocolVersion` | 属性 | <code>protocolVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schema` | 属性 | <code>schema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPSchemaCacheOptions`

MCP Schema Cache Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPSchemaCacheOptions } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export interface MCPSchemaCacheOptions {
    maxEntries?: number;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxEntries` | 属性 | <code>maxEntries?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisLikeMCPStoreClient`

Redis Like MCP Store Client 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisLikeMCPStoreClient } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export interface RedisLikeMCPStoreClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<unknown>;
    sadd(key: string, ...members: string[]): Promise<number>;
    smembers(key: string): Promise<string[]>;
    eval?(script: string, numberOfKeys: number, ...args: Array<string | number>): Promise<number | string | null>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eval` | 方法 | <code>eval?(script: string, numberOfKeys: number, ...args: Array&lt;string &#124; number&gt;): Promise&lt;number &#124; string &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `sadd` | 方法 | <code>sadd(key: string, ...members: string[]): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, value: string): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `smembers` | 方法 | <code>smembers(key: string): Promise&lt;string[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MCPCapabilityDriftType`

MCP Capability Drift Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MCPCapabilityDriftType } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export type MCPCapabilityDriftType = 'description_changed' | 'input_schema_changed' | 'output_schema_changed' | 'annotations_changed' | 'capability_added' | 'capability_removed' | 'server_identity_changed' | 'protocol_version_changed';
```

## `MCPCapabilityKind`

MCP Capability Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MCPCapabilityKind } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts)

### 声明

```text
export type MCPCapabilityKind = 'tool' | 'resource' | 'prompt';
```
