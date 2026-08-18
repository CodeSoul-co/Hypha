# `@codesoul-co/hypha-mcp` / `contracts`

- 包索引: [`@codesoul-co/hypha-mcp`](/zh/api/mcp)
- 源码: [`packages/mcp/src/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)
- 导出数: **25**

## 模块用法

用于声明并运行时校验契约。Contracts 模块公开 14 常量、9 接口、2 类型。

### 从包入口导入

```ts
import {
  governedMCPIntegrationDefinition,
  governedMCPIntegrationExample,
  governedMCPIntegrationJsonSchema,
  governedMCPIntegrationJsonSchemas,
  governedMCPIntegrationSpecSchema,
  mcpCapabilityDriftPolicySpecSchema,
  mcpServerProfileSchema,
  mcpTransportSpecSchema,
} from '@codesoul-co/hypha-mcp';

import type {
  GovernedMCPIntegrationSpec,
  MCPAllowDenyRule,
  MCPCapabilityDriftPolicySpec,
  MCPCapabilityTrustRecord,
  MCPContractSnapshotPolicySpec,
  MCPImportPolicySpec,
  MCPServerProfile,
  MCPTrustPolicySpec,
} from '@codesoul-co/hypha-mcp';

// 完整导出列表见下方。
```

### 使用要点

- 11 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 14 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { governedMCPIntegrationSpecSchema } from '@codesoul-co/hypha-mcp';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = governedMCPIntegrationSpecSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `governedMCPIntegrationDefinition` | 常量 | <code>const governedMCPIntegrationDefinition: SpecSchemaDefinition&lt;GovernedMCPIntegrationSpec&gt;</code> | 由 `contracts` 模块导出的 Governed MCP Integration Definition 常量。 |
| `governedMCPIntegrationExample` | 常量 | <code>const governedMCPIntegrationExample: GovernedMCPIntegrationSpec</code> | Governed MCP Integration 的有效示例值。 |
| `governedMCPIntegrationJsonSchema` | 常量 | <code>const governedMCPIntegrationJsonSchema: JsonSchema</code> | Governed MCP Integration 的 JSON Schema。 |
| `governedMCPIntegrationJsonSchemas` | 常量 | <code>const governedMCPIntegrationJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts` 模块导出的 Governed MCP Integration JSON Schemas 常量。 |
| `governedMCPIntegrationSpecSchema` | 常量 | <code>const governedMCPIntegrationSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; servers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; displayName: z.ZodOptional&lt;z.ZodString&gt;; mode: z.ZodEnum&lt;["fixture", "local", "remote"]&gt;; transport: z.ZodType&lt;MCPTransport...</code> | Governed MCP Integration Spec 的运行时 Schema。 |
| `mcpCapabilityDriftPolicySpecSchema` | 常量 | <code>const mcpCapabilityDriftPolicySpecSchema: z.ZodObject&lt;{ onDescriptionChange: z.ZodEnum&lt;["accept", "snapshot_next_run", "quarantine"]&gt;; onSchemaChange: z.ZodEnum&lt;["snapshot_next_run", "quarantine", "require_approval"]&gt;; onRemoval: z.ZodEnum&lt;["mark_unavailable", "allow_existing_run", "fail_existing_run"]&gt;; onServerIdentityChange: z.ZodEnum&lt;["disconnect", "quarantine"]&gt;; notifyRuntime: z.ZodOptional&lt;z.ZodBoolean&gt;; in...</code> | MCP Capability Drift Policy Spec 的运行时 Schema。 |
| `mcpServerProfileSchema` | 常量 | <code>const mcpServerProfileSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; displayName: z.ZodOptional&lt;z.ZodString&gt;; mode: z.ZodEnum&lt;["fixture", "local", "remote"]&gt;; transport: z.ZodType&lt;MCPTransportSpec, z.ZodTypeDef, MCPTransportSpec&gt;; authRef: z.ZodOptional&lt;z.ZodString&gt;; environmentRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; workingDirectoryRef: z.ZodOptional&lt;z.ZodString&gt;; autoCo...</code> | MCP Server Profile 的运行时 Schema。 |
| `mcpTransportSpecSchema` | 常量 | <code>const mcpTransportSpecSchema: z.ZodType&lt;MCPTransportSpec, z.ZodTypeDef, MCPTransportSpec&gt;</code> | MCP Transport Spec 的运行时 Schema。 |
| `mcpTrustPolicySpecSchema` | 常量 | <code>const mcpTrustPolicySpecSchema: z.ZodObject&lt;{ defaultTrustLevel: z.ZodEnum&lt;["untrusted", "restricted", "trusted"]&gt;; trustedSourceRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; requireAdminApprovalForNewServer: z.ZodOptional&lt;z.ZodBoolean&gt;; requireApprovalForNewCapability: z.ZodOptional&lt;z.ZodBoolean&gt;; requireApprovalForSchemaChange: z.ZodOptional&lt;z.ZodBoolean&gt;; allowServerDeclaredSideEffectHints: z.ZodOptiona...</code> | MCP Trust Policy Spec 的运行时 Schema。 |
| `NORMALIZED_MCP_ERROR_CODES` | 常量 | <code>const NORMALIZED_MCP_ERROR_CODES: readonly ["MCP_SERVER_NOT_FOUND", "MCP_CONNECTION_FAILED", "MCP_INITIALIZATION_FAILED", "MCP_PROTOCOL_MISMATCH", "MCP_REQUEST_TIMEOUT", "MCP_REQUEST_CANCELLED", "MCP_CAPABILITY_NOT_FOUND", "MCP_CAPABILITY_QUARANTINED", "MCP_CAPABILITY_DRIFT", "MCP_SCHEMA_INVALID", "MCP_AUTH_FAILED", "MCP_BULKHEAD_REJECTED", "MCP_RATE_LIMITED", "MCP_CIRCUIT_OPEN", "MCP_EGRESS_DENIED", "MCP_CONTENT_...</code> | 由 `contracts` 模块导出的 NORMALIZED MCP ERROR CODES 常量。 |
| `normalizedMCPErrorDefinition` | 常量 | <code>const normalizedMCPErrorDefinition: SpecSchemaDefinition&lt;NormalizedMCPError&gt;</code> | 由 `contracts` 模块导出的 Normalized MCP Error Definition 常量。 |
| `normalizedMCPErrorExample` | 常量 | <code>const normalizedMCPErrorExample: NormalizedMCPError</code> | Normalized MCP Error 的有效示例值。 |
| `normalizedMCPErrorJsonSchema` | 常量 | <code>const normalizedMCPErrorJsonSchema: JsonSchema</code> | Normalized MCP Error 的 JSON Schema。 |
| `normalizedMCPErrorSchema` | 常量 | <code>const normalizedMCPErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["MCP_SERVER_NOT_FOUND", "MCP_CONNECTION_FAILED", "MCP_INITIALIZATION_FAILED", "MCP_PROTOCOL_MISMATCH", "MCP_REQUEST_TIMEOUT", "MCP_REQUEST_CANCELLED", "MCP_CAPABILITY_NOT_FOUND", "MCP_CAPABILITY_QUARANTINED", "MCP_CAPABILITY_DRIFT", "MCP_SCHEMA_INVALID", "MCP_AUTH_FAILED", "MCP_BULKHEAD_REJECTED", "MCP_RATE_LIMITED", "MCP_CIRCUIT_OPEN", "MCP_EGRESS_DEN...</code> | Normalized MCP Error 的运行时 Schema。 |
| `GovernedMCPIntegrationSpec` | 接口 | <code>interface GovernedMCPIntegrationSpec</code> | Governed MCP Integration Spec 接口，共包含 16 个公开字段或方法。 |
| `MCPAllowDenyRule` | 接口 | <code>interface MCPAllowDenyRule</code> | MCP Allow Deny Rule 接口，共包含 4 个公开字段或方法。 |
| `MCPCapabilityDriftPolicySpec` | 接口 | <code>interface MCPCapabilityDriftPolicySpec</code> | MCP Capability Drift Policy Spec 接口，共包含 6 个公开字段或方法。 |
| `MCPCapabilityTrustRecord` | 接口 | <code>interface MCPCapabilityTrustRecord</code> | MCP Capability Trust Record 接口，共包含 7 个公开字段或方法。 |
| `MCPContractSnapshotPolicySpec` | 接口 | <code>interface MCPContractSnapshotPolicySpec</code> | MCP Contract Snapshot Policy Spec 接口，共包含 3 个公开字段或方法。 |
| `MCPImportPolicySpec` | 接口 | <code>interface MCPImportPolicySpec</code> | MCP Import Policy Spec 接口，共包含 4 个公开字段或方法。 |
| `MCPServerProfile` | 接口 | <code>interface MCPServerProfile</code> | MCP Server Profile 接口，共包含 22 个公开字段或方法。 |
| `MCPTrustPolicySpec` | 接口 | <code>interface MCPTrustPolicySpec</code> | MCP Trust Policy Spec 接口，共包含 9 个公开字段或方法。 |
| `NormalizedMCPError` | 接口 | <code>interface NormalizedMCPError</code> | Normalized MCP Error 接口，共包含 7 个公开字段或方法。 |
| `MCPTransportSpec` | 类型 | <code>type MCPTransportSpec = { type: 'stdio'; command: string; args?: string[]; envAllowList?: string[]; stderrMode?: 'inherit' &#124; 'capture' &#124; 'artifact'; } &#124; { type: 'streamable_http'; endpoint: string; headersRef?: string; authorizationRef?: string; sessionMode?: 'protocol_default' &#124; 'stateless'; } &#124; { type: 'custom'; adapterRef: string; config?: Record&lt;string, unknown&gt;; }</code> | MCP Transport Spec 公共类型别名；完整类型表达式见声明。 |
| `NormalizedMCPErrorCode` | 类型 | <code>type NormalizedMCPErrorCode = (typeof NORMALIZED_MCP_ERROR_CODES)[number]</code> | Normalized MCP Error Code 公共类型别名；完整类型表达式见声明。 |

## `governedMCPIntegrationDefinition`

由 `contracts` 模块导出的 Governed MCP Integration Definition 常量。

- 种类: 常量
- 导入: `import { governedMCPIntegrationDefinition } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export declare const governedMCPIntegrationDefinition: SpecSchemaDefinition<GovernedMCPIntegrationSpec>;
```

## `governedMCPIntegrationExample`

Governed MCP Integration 的有效示例值。

- 种类: 常量
- 导入: `import { governedMCPIntegrationExample } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export declare const governedMCPIntegrationExample: GovernedMCPIntegrationSpec;
```

## `governedMCPIntegrationJsonSchema`

Governed MCP Integration 的 JSON Schema。

- 种类: 常量
- 导入: `import { governedMCPIntegrationJsonSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export declare const governedMCPIntegrationJsonSchema: JsonSchema;
```

## `governedMCPIntegrationJsonSchemas`

由 `contracts` 模块导出的 Governed MCP Integration JSON Schemas 常量。

- 种类: 常量
- 导入: `import { governedMCPIntegrationJsonSchemas } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export declare const governedMCPIntegrationJsonSchemas: Record<string, JsonSchema>;
```

## `governedMCPIntegrationSpecSchema`

Governed MCP Integration Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { governedMCPIntegrationSpecSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const governedMCPIntegrationSpecSchema: (typeof import('@codesoul-co/hypha-mcp'))['governedMCPIntegrationSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `mcpCapabilityDriftPolicySpecSchema`

MCP Capability Drift Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { mcpCapabilityDriftPolicySpecSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export declare const mcpCapabilityDriftPolicySpecSchema: z.ZodObject<{ onDescriptionChange: z.ZodEnum<["accept", "snapshot_next_run", "quarantine"]>; onSchemaChange: z.ZodEnum<["snapshot_next_run", "quarantine", "require_approval"]>; onRemoval: z.ZodEnum<["mark_unavailable", "allow_existing_run", "fail_existing_run"]>; onServerIdentityChange: z.ZodEnum<["disconnect", "quarantine"]>; notifyRuntime: z.ZodOptional<z.ZodBoolean>; invalidateSchemaCache: z.ZodOptional<z.ZodBoolean>; }, "strip", z.ZodTypeAny, { onDescriptionChange: "quarantine" | "accept" | "snapshot_next_run"; onSchemaChange: "quarantine" | "snapshot_next_run" | "require_approval"; onRemoval: "mark_unavailable" | "allow_existing_run" | "fail_existing_run"; onServerIdentityChange: "quarantine" | "disconnect"; notifyRuntime?: boolean | undefined; invalidateSchemaCache?: boolean | undefined; }, { onDescriptionChange: "quarantine" | "accept" | "snapshot_next_run"; onSchemaChange: "quarantine" | "snapshot_next_run" | "require_approval"; onRemoval: "mark_unavailable" | "allow_existing_run" | "fail_existing_run"; onServerIdentityChange: "quarantine" | "disconnect"; notifyRuntime?: boolean | undefined; invalidateSchemaCache?: boolean | undefined; }>;
```

## `mcpServerProfileSchema`

MCP Server Profile 的运行时 Schema。

- 种类: 常量
- 导入: `import { mcpServerProfileSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const mcpServerProfileSchema: (typeof import('@codesoul-co/hypha-mcp'))['mcpServerProfileSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `mcpTransportSpecSchema`

MCP Transport Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { mcpTransportSpecSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export declare const mcpTransportSpecSchema: z.ZodType<MCPTransportSpec, z.ZodTypeDef, MCPTransportSpec>;
```

## `mcpTrustPolicySpecSchema`

MCP Trust Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { mcpTrustPolicySpecSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export declare const mcpTrustPolicySpecSchema: z.ZodObject<{ defaultTrustLevel: z.ZodEnum<["untrusted", "restricted", "trusted"]>; trustedSourceRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; requireAdminApprovalForNewServer: z.ZodOptional<z.ZodBoolean>; requireApprovalForNewCapability: z.ZodOptional<z.ZodBoolean>; requireApprovalForSchemaChange: z.ZodOptional<z.ZodBoolean>; allowServerDeclaredSideEffectHints: z.ZodOptional<z.ZodBoolean>; pinServerIdentity: z.ZodOptional<z.ZodBoolean>; pinProtocolVersion: z.ZodOptional<z.ZodBoolean>; pinCapabilityHashes: z.ZodOptional<z.ZodBoolean>; }, "strip", z.ZodTypeAny, { defaultTrustLevel: "trusted" | "untrusted" | "restricted"; trustedSourceRefs?: string[] | undefined; requireAdminApprovalForNewServer?: boolean | undefined; requireApprovalForNewCapability?: boolean | undefined; requireApprovalForSchemaChange?: boolean | undefined; allowServerDeclaredSideEffectHints?: boolean | undefined; pinServerIdentity?: boolean | undefined; pinProtocolVersion?: boolean | undefined; pinCapabilityHashes?: boolean | undefined; }, { defaultTrustLevel: "trusted" | "untrusted" | "restricted"; trustedSourceRefs?: string[] | undefined; requireAdminApprovalForNewServer?: boolean | undefined; requireApprovalForNewCapability?: boolean | undefined; requireApprovalForSchemaChange?: boolean | undefined; allowServerDeclaredSideEffectHints?: boolean | undefined; pinServerIdentity?: boolean | undefined; pinProtocolVersion?: boolean | undefined; pinCapabilityHashes?: boolean | undefined; }>;
```

## `NORMALIZED_MCP_ERROR_CODES`

由 `contracts` 模块导出的 NORMALIZED MCP ERROR CODES 常量。

- 种类: 常量
- 导入: `import { NORMALIZED_MCP_ERROR_CODES } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export declare const NORMALIZED_MCP_ERROR_CODES: readonly ["MCP_SERVER_NOT_FOUND", "MCP_CONNECTION_FAILED", "MCP_INITIALIZATION_FAILED", "MCP_PROTOCOL_MISMATCH", "MCP_REQUEST_TIMEOUT", "MCP_REQUEST_CANCELLED", "MCP_CAPABILITY_NOT_FOUND", "MCP_CAPABILITY_QUARANTINED", "MCP_CAPABILITY_DRIFT", "MCP_SCHEMA_INVALID", "MCP_AUTH_FAILED", "MCP_BULKHEAD_REJECTED", "MCP_RATE_LIMITED", "MCP_CIRCUIT_OPEN", "MCP_EGRESS_DENIED", "MCP_CONTENT_TOO_LARGE", "MCP_REMOTE_ERROR", "MCP_TRANSPORT_CLOSED", "MCP_INTERNAL_ERROR"];
```

## `normalizedMCPErrorDefinition`

由 `contracts` 模块导出的 Normalized MCP Error Definition 常量。

- 种类: 常量
- 导入: `import { normalizedMCPErrorDefinition } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export declare const normalizedMCPErrorDefinition: SpecSchemaDefinition<NormalizedMCPError>;
```

## `normalizedMCPErrorExample`

Normalized MCP Error 的有效示例值。

- 种类: 常量
- 导入: `import { normalizedMCPErrorExample } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export declare const normalizedMCPErrorExample: NormalizedMCPError;
```

## `normalizedMCPErrorJsonSchema`

Normalized MCP Error 的 JSON Schema。

- 种类: 常量
- 导入: `import { normalizedMCPErrorJsonSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export declare const normalizedMCPErrorJsonSchema: JsonSchema;
```

## `normalizedMCPErrorSchema`

Normalized MCP Error 的运行时 Schema。

- 种类: 常量
- 导入: `import { normalizedMCPErrorSchema } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export declare const normalizedMCPErrorSchema: z.ZodObject<{ code: z.ZodEnum<["MCP_SERVER_NOT_FOUND", "MCP_CONNECTION_FAILED", "MCP_INITIALIZATION_FAILED", "MCP_PROTOCOL_MISMATCH", "MCP_REQUEST_TIMEOUT", "MCP_REQUEST_CANCELLED", "MCP_CAPABILITY_NOT_FOUND", "MCP_CAPABILITY_QUARANTINED", "MCP_CAPABILITY_DRIFT", "MCP_SCHEMA_INVALID", "MCP_AUTH_FAILED", "MCP_BULKHEAD_REJECTED", "MCP_RATE_LIMITED", "MCP_CIRCUIT_OPEN", "MCP_EGRESS_DENIED", "MCP_CONTENT_TOO_LARGE", "MCP_REMOTE_ERROR", "MCP_TRANSPORT_CLOSED", "MCP_INTERNAL_ERROR"]>; message: z.ZodString; retryable: z.ZodBoolean; serverId: z.ZodOptional<z.ZodString>; capabilityId: z.ZodOptional<z.ZodString>; remoteCode: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>; details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { code: "MCP_SERVER_NOT_FOUND" | "MCP_CONNECTION_FAILED" | "MCP_INITIALIZATION_FAILED" | "MCP_PROTOCOL_MISMATCH" | "MCP_REQUEST_TIMEOUT" | "MCP_REQUEST_CANCELLED" | "MCP_CAPABILITY_NOT_FOUND" | "MCP_CAPABILITY_QUARANTINED" | "MCP_CAPABILITY_DRIFT" | "MCP_SCHEMA_INVALID" | "MCP_AUTH_FAILED" | "MCP_BULKHEAD_REJECTED" | "MCP_RATE_LIMITED" | "MCP_CIRCUIT_OPEN" | "MCP_EGRESS_DENIED" | "MCP_CONTENT_TOO_LARGE" | "MCP_REMOTE_ERROR" | "MCP_TRANSPORT_CLOSED" | "MCP_INTERNAL_ERROR"; message: string; retryable: boolean; serverId?: string | undefined; capabilityId?: string | undefined; remoteCode?: string | number | undefined; details?: Record<string, unknown> | undefined; }, { code: "MCP_SERVER_NOT_FOUND" | "MCP_CONNECTION_FAILED" | "MCP_INITIALIZATION_FAILED" | "MCP_PROTOCOL_MISMATCH" | "MCP_REQUEST_TIMEOUT" | "MCP_REQUEST_CANCELLED" | "MCP_CAPABILITY_NOT_FOUND" | "MCP_CAPABILITY_QUARANTINED" | "MCP_CAPABILITY_DRIFT" | "MCP_SCHEMA_INVALID" | "MCP_AUTH_FAILED" | "MCP_BULKHEAD_REJECTED" | "MCP_RATE_LIMITED" | "MCP_CIRCUIT_OPEN" | "MCP_EGRESS_DENIED" | "MCP_CONTENT_TOO_LARGE" | "MCP_REMOTE_ERROR" | "MCP_TRANSPORT_CLOSED" | "MCP_INTERNAL_ERROR"; message: string; retryable: boolean; serverId?: string | undefined; capabilityId?: string | undefined; remoteCode?: string | number | undefined; details?: Record<string, unknown> | undefined; }>;
```

## `GovernedMCPIntegrationSpec`

Governed MCP Integration Spec 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { GovernedMCPIntegrationSpec } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export interface GovernedMCPIntegrationSpec {
    id: string;
    version: string;
    revision?: string;
    name?: string;
    description?: string;
    servers: MCPServerProfile[];
    allowCapabilities?: MCPAllowDenyRule[];
    denyCapabilities?: MCPAllowDenyRule[];
    trustPolicy: MCPTrustPolicySpec;
    importPolicy: MCPImportPolicySpec;
    driftPolicy: MCPCapabilityDriftPolicySpec;
    snapshotPolicy: MCPContractSnapshotPolicySpec;
    toolPolicyRefs?: Array<{
        id: string;
        version?: string;
        revision?: string;
    }>;
    resourcePolicyRefs?: Array<{
        id: string;
        version?: string;
        revision?: string;
    }>;
    promptPolicyRefs?: Array<{
        id: string;
        version?: string;
        revision?: string;
    }>;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowCapabilities` | 属性 | <code>allowCapabilities?: MCPAllowDenyRule[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `denyCapabilities` | 属性 | <code>denyCapabilities?: MCPAllowDenyRule[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `driftPolicy` | 属性 | <code>driftPolicy: MCPCapabilityDriftPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `importPolicy` | 属性 | <code>importPolicy: MCPImportPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptPolicyRefs` | 属性 | <code>promptPolicyRefs?: { id: string; version?: string; revision?: string; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourcePolicyRefs` | 属性 | <code>resourcePolicyRefs?: { id: string; version?: string; revision?: string; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `servers` | 属性 | <code>servers: MCPServerProfile[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotPolicy` | 属性 | <code>snapshotPolicy: MCPContractSnapshotPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolPolicyRefs` | 属性 | <code>toolPolicyRefs?: { id: string; version?: string; revision?: string; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trustPolicy` | 属性 | <code>trustPolicy: MCPTrustPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPAllowDenyRule`

MCP Allow Deny Rule 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPAllowDenyRule } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export interface MCPAllowDenyRule {
    serverId?: string;
    capabilityId?: string;
    kind?: 'tool' | 'resource' | 'prompt';
    tags?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityId` | 属性 | <code>capabilityId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind?: "tool" &#124; "prompt" &#124; "resource"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPCapabilityDriftPolicySpec`

MCP Capability Drift Policy Spec 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPCapabilityDriftPolicySpec } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export interface MCPCapabilityDriftPolicySpec {
    onDescriptionChange: 'accept' | 'snapshot_next_run' | 'quarantine';
    onSchemaChange: 'snapshot_next_run' | 'quarantine' | 'require_approval';
    onRemoval: 'mark_unavailable' | 'allow_existing_run' | 'fail_existing_run';
    onServerIdentityChange: 'disconnect' | 'quarantine';
    notifyRuntime?: boolean;
    invalidateSchemaCache?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `invalidateSchemaCache` | 属性 | <code>invalidateSchemaCache?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `notifyRuntime` | 属性 | <code>notifyRuntime?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `onDescriptionChange` | 属性 | <code>onDescriptionChange: "quarantine" &#124; "accept" &#124; "snapshot_next_run"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `onRemoval` | 属性 | <code>onRemoval: "mark_unavailable" &#124; "allow_existing_run" &#124; "fail_existing_run"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `onSchemaChange` | 属性 | <code>onSchemaChange: "quarantine" &#124; "snapshot_next_run" &#124; "require_approval"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `onServerIdentityChange` | 属性 | <code>onServerIdentityChange: "quarantine" &#124; "disconnect"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPCapabilityTrustRecord`

MCP Capability Trust Record 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPCapabilityTrustRecord } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export interface MCPCapabilityTrustRecord {
    level: 'untrusted' | 'restricted' | 'trusted';
    source: 'admin' | 'domain_pack' | 'runtime_discovery' | 'signed_manifest' | 'import';
    sourceRef?: string;
    approvedBy?: string;
    approvedAt?: string;
    restrictions?: string[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvedAt` | 属性 | <code>approvedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `approvedBy` | 属性 | <code>approvedBy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `level` | 属性 | <code>level: "trusted" &#124; "untrusted" &#124; "restricted"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `restrictions` | 属性 | <code>restrictions?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: "import" &#124; "admin" &#124; "domain_pack" &#124; "runtime_discovery" &#124; "signed_manifest"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceRef` | 属性 | <code>sourceRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPContractSnapshotPolicySpec`

MCP Contract Snapshot Policy Spec 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPContractSnapshotPolicySpec } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export interface MCPContractSnapshotPolicySpec {
    mode: 'run' | 'state';
    preserveRemovedForExistingRuns?: boolean;
    requireApprovedRevision?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mode` | 属性 | <code>mode: "run" &#124; "state"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preserveRemovedForExistingRuns` | 属性 | <code>preserveRemovedForExistingRuns?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireApprovedRevision` | 属性 | <code>requireApprovedRevision?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPImportPolicySpec`

MCP Import Policy Spec 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPImportPolicySpec } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export interface MCPImportPolicySpec {
    kinds: Array<'tool' | 'resource' | 'prompt'>;
    lazyLoad?: boolean;
    maxLoadedCapabilities?: number;
    schemaTokenBudget?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `kinds` | 属性 | <code>kinds: ("tool" &#124; "prompt" &#124; "resource")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lazyLoad` | 属性 | <code>lazyLoad?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxLoadedCapabilities` | 属性 | <code>maxLoadedCapabilities?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaTokenBudget` | 属性 | <code>schemaTokenBudget?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPServerProfile`

MCP Server Profile 接口，共包含 22 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPServerProfile } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export interface MCPServerProfile {
    id: string;
    version?: string;
    displayName?: string;
    mode: 'fixture' | 'local' | 'remote';
    transport: MCPTransportSpec;
    authRef?: string;
    environmentRefs?: string[];
    workingDirectoryRef?: string;
    autoConnect?: boolean;
    lazyConnect?: boolean;
    singleStart?: boolean;
    initializationTimeoutMs?: number;
    requestTimeoutMs?: number;
    shutdownTimeoutMs?: number;
    reconnectPolicy?: RetryPolicySpec;
    healthCheckPolicy?: {
        intervalMs?: number;
        timeoutMs?: number;
        unhealthyThreshold?: number;
    };
    expectedServerInfo?: Record<string, unknown>;
    protocolVersionPolicy?: {
        allowedVersions?: string[];
        preferLatest?: boolean;
        rejectUnknown?: boolean;
    };
    egressPolicy?: {
        allowedHosts?: string[];
        denyPrivateNetworks?: boolean;
        requireTls?: boolean;
        maxRedirects?: number;
        allowCrossOriginRedirects?: boolean;
    };
    requestGuardPolicy?: {
        maxConcurrentRequests?: number;
        rateLimit?: {
            maxRequests: number;
            windowMs: number;
        };
        circuitBreaker?: {
            failureThreshold: number;
            resetAfterMs: number;
        };
    };
    contentPolicy?: {
        maxToolResultBytes?: number;
        maxResourceBytes?: number;
        maxPromptBytes?: number;
        maxPromptTokens?: number;
        oversizeAction?: 'reject' | 'artifact';
    };
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authRef` | 属性 | <code>authRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `autoConnect` | 属性 | <code>autoConnect?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentPolicy` | 属性 | <code>contentPolicy?: { maxToolResultBytes?: number; maxResourceBytes?: number; maxPromptBytes?: number; maxPromptTokens?: number; oversizeAction?: "reject" &#124; "artifact"; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `displayName` | 属性 | <code>displayName?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `egressPolicy` | 属性 | <code>egressPolicy?: { allowedHosts?: string[]; denyPrivateNetworks?: boolean; requireTls?: boolean; maxRedirects?: number; allowCrossOriginRedirects?: boolean; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentRefs` | 属性 | <code>environmentRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedServerInfo` | 属性 | <code>expectedServerInfo?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `healthCheckPolicy` | 属性 | <code>healthCheckPolicy?: { intervalMs?: number; timeoutMs?: number; unhealthyThreshold?: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `initializationTimeoutMs` | 属性 | <code>initializationTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lazyConnect` | 属性 | <code>lazyConnect?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "local" &#124; "remote" &#124; "fixture"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `protocolVersionPolicy` | 属性 | <code>protocolVersionPolicy?: { allowedVersions?: string[]; preferLatest?: boolean; rejectUnknown?: boolean; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconnectPolicy` | 属性 | <code>reconnectPolicy?: RetryPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestGuardPolicy` | 属性 | <code>requestGuardPolicy?: { maxConcurrentRequests?: number; rateLimit?: { maxRequests: number; windowMs: number; }; circuitBreaker?: { failureThreshold: number; resetAfterMs: number; }; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestTimeoutMs` | 属性 | <code>requestTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `shutdownTimeoutMs` | 属性 | <code>shutdownTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `singleStart` | 属性 | <code>singleStart?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transport` | 属性 | <code>transport: MCPTransportSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workingDirectoryRef` | 属性 | <code>workingDirectoryRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPTrustPolicySpec`

MCP Trust Policy Spec 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPTrustPolicySpec } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export interface MCPTrustPolicySpec {
    defaultTrustLevel: 'untrusted' | 'restricted' | 'trusted';
    trustedSourceRefs?: string[];
    requireAdminApprovalForNewServer?: boolean;
    requireApprovalForNewCapability?: boolean;
    requireApprovalForSchemaChange?: boolean;
    allowServerDeclaredSideEffectHints?: boolean;
    pinServerIdentity?: boolean;
    pinProtocolVersion?: boolean;
    pinCapabilityHashes?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowServerDeclaredSideEffectHints` | 属性 | <code>allowServerDeclaredSideEffectHints?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultTrustLevel` | 属性 | <code>defaultTrustLevel: "trusted" &#124; "untrusted" &#124; "restricted"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pinCapabilityHashes` | 属性 | <code>pinCapabilityHashes?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pinProtocolVersion` | 属性 | <code>pinProtocolVersion?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pinServerIdentity` | 属性 | <code>pinServerIdentity?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireAdminApprovalForNewServer` | 属性 | <code>requireAdminApprovalForNewServer?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireApprovalForNewCapability` | 属性 | <code>requireApprovalForNewCapability?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireApprovalForSchemaChange` | 属性 | <code>requireApprovalForSchemaChange?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trustedSourceRefs` | 属性 | <code>trustedSourceRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `NormalizedMCPError`

Normalized MCP Error 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NormalizedMCPError } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export interface NormalizedMCPError {
    code: NormalizedMCPErrorCode;
    message: string;
    retryable: boolean;
    serverId?: string;
    capabilityId?: string;
    remoteCode?: string | number;
    details?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityId` | 属性 | <code>capabilityId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>code: "MCP_SERVER_NOT_FOUND" &#124; "MCP_CONNECTION_FAILED" &#124; "MCP_INITIALIZATION_FAILED" &#124; "MCP_PROTOCOL_MISMATCH" &#124; "MCP_REQUEST_TIMEOUT" &#124; "MCP_REQUEST_CANCELLED" &#124; "MCP_CAPABILITY_NOT_FOUND" &#124; "MCP_CAPABILITY_QUARANTINED" &#124; "MCP_CAPABILITY_DRIFT" &#124; "MCP_SCHEMA_INVALID" &#124; "MCP_AUTH_FAILED" &#124; "MCP_BULKHEAD_REJECTED" &#124; "MCP_RATE_LIMITED" &#124; "MCP_CIRCUIT_OPEN" &#124; "MCP_EGRESS_DENIED" &#124; "MCP_CONTENT_TOO_LARGE" &#124; "MCP_REMOT...</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `details` | 属性 | <code>details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `remoteCode` | 属性 | <code>remoteCode?: string &#124; number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPTransportSpec`

MCP Transport Spec 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MCPTransportSpec } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export type MCPTransportSpec = {
    type: 'stdio';
    command: string;
    args?: string[];
    envAllowList?: string[];
    stderrMode?: 'inherit' | 'capture' | 'artifact';
} | {
    type: 'streamable_http';
    endpoint: string;
    headersRef?: string;
    authorizationRef?: string;
    sessionMode?: 'protocol_default' | 'stateless';
} | {
    type: 'custom';
    adapterRef: string;
    config?: Record<string, unknown>;
};
```

## `NormalizedMCPErrorCode`

Normalized MCP Error Code 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { NormalizedMCPErrorCode } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts)

### 声明

```text
export type NormalizedMCPErrorCode = (typeof NORMALIZED_MCP_ERROR_CODES)[number];
```
