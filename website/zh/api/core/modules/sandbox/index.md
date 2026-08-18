# `@codesoul-co/hypha-core` / `modules/sandbox/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/sandbox/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)
- 导出数: **23**

## 模块用法

用于使用该功能边界的公共契约与操作。Index 模块公开 15 常量、8 函数。

### 从包入口导入

```ts
import {
  sandboxCleanupRequestSchema,
  sandboxCreateRequestExample,
  sandboxCreateRequestSchema,
  sandboxLifecycleJsonSchemas,
  sandboxProviderCapabilitiesExample,
  sandboxProviderCapabilitiesJsonSchema,
  sandboxProviderCapabilitiesSchema,
  sandboxRecordExample,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 8 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 15 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { sandboxCleanupRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = sandboxCleanupRequestSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `sandboxCleanupRequestSchema` | 常量 | <code>const sandboxCleanupRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "m...</code> | Sandbox Cleanup Request 的运行时 Schema。 |
| `sandboxCreateRequestExample` | 常量 | <code>const sandboxCreateRequestExample: SandboxCreateRequest</code> | Sandbox Create Request 的有效示例值。 |
| `sandboxCreateRequestSchema` | 常量 | <code>const sandboxCreateRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metad...</code> | Sandbox Create Request 的运行时 Schema。 |
| `sandboxLifecycleJsonSchemas` | 常量 | <code>const sandboxLifecycleJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/sandbox/index` 模块导出的 Sandbox Lifecycle JSON Schemas 常量。 |
| `sandboxProviderCapabilitiesExample` | 常量 | <code>const sandboxProviderCapabilitiesExample: SandboxProviderCapabilities</code> | Sandbox Provider Capabilities 的有效示例值。 |
| `sandboxProviderCapabilitiesJsonSchema` | 常量 | <code>const sandboxProviderCapabilitiesJsonSchema: JsonSchema</code> | Sandbox Provider Capabilities 的 JSON Schema。 |
| `sandboxProviderCapabilitiesSchema` | 常量 | <code>const sandboxProviderCapabilitiesSchema: z.ZodObject&lt;{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; snapshots: z.ZodBoolean; imageDigestPinning: z.ZodBoolean; remoteExecution: z.ZodBoolean; }, "strict...</code> | Sandbox Provider Capabilities 的运行时 Schema。 |
| `sandboxRecordExample` | 常量 | <code>const sandboxRecordExample: SandboxRecord</code> | Sandbox Record 的有效示例值。 |
| `sandboxRecordJsonSchema` | 常量 | <code>const sandboxRecordJsonSchema: JsonSchema</code> | Sandbox Record 的 JSON Schema。 |
| `sandboxRecordSchema` | 常量 | <code>const sandboxRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; providerId: z.ZodString; environmentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefine...</code> | Sandbox Record 的运行时 Schema。 |
| `sandboxStartRequestSchema` | 常量 | <code>const sandboxStartRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "man...</code> | Sandbox Start Request 的运行时 Schema。 |
| `sandboxStatusRequestSchema` | 常量 | <code>const sandboxStatusRequestSchema: z.ZodObject&lt;{ sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptio...</code> | Sandbox Status Request 的运行时 Schema。 |
| `sandboxStatusSchema` | 常量 | <code>const sandboxStatusSchema: z.ZodEnum&lt;["creating", "created", "starting", "ready", "busy", "stopping", "stopped", "terminating", "terminated", "cleaning", "cleaned", "failed"]&gt;</code> | Sandbox Status 的运行时 Schema。 |
| `sandboxStatusTransitions` | 常量 | <code>const sandboxStatusTransitions: Readonly&lt;Record&lt;SandboxStatus, readonly SandboxStatus[]&gt;&gt;</code> | 由 `modules/sandbox/index` 模块导出的 Sandbox Status Transitions 常量。 |
| `sandboxTerminateRequestSchema` | 常量 | <code>const sandboxTerminateRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, ...</code> | Sandbox Terminate Request 的运行时 Schema。 |
| `canTransitionSandboxStatus` | 函数 | <code>canTransitionSandboxStatus(from: SandboxStatus, to: SandboxStatus): boolean</code> | Can Transition Sandbox Status 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateSandboxCleanupRequest` | 函数 | <code>validateSandboxCleanupRequest(input: unknown): SandboxCleanupRequest</code> | Validate Sandbox Cleanup Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateSandboxCreateRequest` | 函数 | <code>validateSandboxCreateRequest(input: unknown): SandboxCreateRequest</code> | Validate Sandbox Create Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateSandboxProviderCapabilities` | 函数 | <code>validateSandboxProviderCapabilities(input: unknown): SandboxProviderCapabilities</code> | Validate Sandbox Provider Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateSandboxRecord` | 函数 | <code>validateSandboxRecord(input: unknown): SandboxRecord</code> | Validate Sandbox Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateSandboxStartRequest` | 函数 | <code>validateSandboxStartRequest(input: unknown): SandboxStartRequest</code> | Validate Sandbox Start Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateSandboxStatusRequest` | 函数 | <code>validateSandboxStatusRequest(input: unknown): SandboxStatusRequest</code> | Validate Sandbox Status Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateSandboxTerminateRequest` | 函数 | <code>validateSandboxTerminateRequest(input: unknown): SandboxTerminateRequest</code> | Validate Sandbox Terminate Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `sandboxCleanupRequestSchema`

Sandbox Cleanup Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxCleanupRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare const sandboxCleanupRequestSchema: z.ZodObject<{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; expectedRevision: z.ZodNumber; idempotencyKey: z.ZodOptional<z.ZodString>; } & { reason: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; idempotencyKey?: string | undefined; }, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; idempotencyKey?: string | undefined; }>;
```

## `sandboxCreateRequestExample`

Sandbox Create Request 的有效示例值。

- 种类: 常量
- 导入: `import { sandboxCreateRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare const sandboxCreateRequestExample: SandboxCreateRequest;
```

## `sandboxCreateRequestSchema`

Sandbox Create Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxCreateRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const sandboxCreateRequestSchema: (typeof import('@codesoul-co/hypha-core'))['sandboxCreateRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `sandboxLifecycleJsonSchemas`

由 `modules/sandbox/index` 模块导出的 Sandbox Lifecycle JSON Schemas 常量。

- 种类: 常量
- 导入: `import { sandboxLifecycleJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare const sandboxLifecycleJsonSchemas: Record<string, JsonSchema>;
```

## `sandboxProviderCapabilitiesExample`

Sandbox Provider Capabilities 的有效示例值。

- 种类: 常量
- 导入: `import { sandboxProviderCapabilitiesExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare const sandboxProviderCapabilitiesExample: SandboxProviderCapabilities;
```

## `sandboxProviderCapabilitiesJsonSchema`

Sandbox Provider Capabilities 的 JSON Schema。

- 种类: 常量
- 导入: `import { sandboxProviderCapabilitiesJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare const sandboxProviderCapabilitiesJsonSchema: JsonSchema;
```

## `sandboxProviderCapabilitiesSchema`

Sandbox Provider Capabilities 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxProviderCapabilitiesSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare const sandboxProviderCapabilitiesSchema: z.ZodObject<{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; snapshots: z.ZodBoolean; imageDigestPinning: z.ZodBoolean; remoteExecution: z.ZodBoolean; }, "strict", z.ZodTypeAny, { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: boolean; }, { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: boolean; }>;
```

## `sandboxRecordExample`

Sandbox Record 的有效示例值。

- 种类: 常量
- 导入: `import { sandboxRecordExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare const sandboxRecordExample: SandboxRecord;
```

## `sandboxRecordJsonSchema`

Sandbox Record 的 JSON Schema。

- 种类: 常量
- 导入: `import { sandboxRecordJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare const sandboxRecordJsonSchema: JsonSchema;
```

## `sandboxRecordSchema`

Sandbox Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxRecordSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const sandboxRecordSchema: (typeof import('@codesoul-co/hypha-core'))['sandboxRecordSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `sandboxStartRequestSchema`

Sandbox Start Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxStartRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare const sandboxStartRequestSchema: z.ZodObject<{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; expectedRevision: z.ZodNumber; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; idempotencyKey?: string | undefined; }, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; idempotencyKey?: string | undefined; }>;
```

## `sandboxStatusRequestSchema`

Sandbox Status Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxStatusRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare const sandboxStatusRequestSchema: z.ZodObject<{ sandboxId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; }, "strict", z.ZodTypeAny, { sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }, { sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; }>;
```

## `sandboxStatusSchema`

Sandbox Status 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxStatusSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare const sandboxStatusSchema: z.ZodEnum<["creating", "created", "starting", "ready", "busy", "stopping", "stopped", "terminating", "terminated", "cleaning", "cleaned", "failed"]>;
```

## `sandboxStatusTransitions`

由 `modules/sandbox/index` 模块导出的 Sandbox Status Transitions 常量。

- 种类: 常量
- 导入: `import { sandboxStatusTransitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare const sandboxStatusTransitions: Readonly<Record<SandboxStatus, readonly SandboxStatus[]>>;
```

## `sandboxTerminateRequestSchema`

Sandbox Terminate Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxTerminateRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare const sandboxTerminateRequestSchema: z.ZodObject<{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; expectedRevision: z.ZodNumber; idempotencyKey: z.ZodOptional<z.ZodString>; } & { reason: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; idempotencyKey?: string | undefined; }, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; expectedRevision: number; reason?: string | undefined; idempotencyKey?: string | undefined; }>;
```

## `canTransitionSandboxStatus`

Can Transition Sandbox Status 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { canTransitionSandboxStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare function canTransitionSandboxStatus(from: SandboxStatus, to: SandboxStatus): boolean;
```

### 调用签名

```text
canTransitionSandboxStatus(from: SandboxStatus, to: SandboxStatus): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `from` | <code>SandboxStatus</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `to` | <code>SandboxStatus</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `validateSandboxCleanupRequest`

Validate Sandbox Cleanup Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateSandboxCleanupRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare function validateSandboxCleanupRequest(input: unknown): SandboxCleanupRequest;
```

### 调用签名

```text
validateSandboxCleanupRequest(input: unknown): SandboxCleanupRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SandboxCleanupRequest`
- 说明: 返回值契约由上述类型定义。

## `validateSandboxCreateRequest`

Validate Sandbox Create Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateSandboxCreateRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare function validateSandboxCreateRequest(input: unknown): SandboxCreateRequest;
```

### 调用签名

```text
validateSandboxCreateRequest(input: unknown): SandboxCreateRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SandboxCreateRequest`
- 说明: 返回值契约由上述类型定义。

## `validateSandboxProviderCapabilities`

Validate Sandbox Provider Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateSandboxProviderCapabilities } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare function validateSandboxProviderCapabilities(input: unknown): SandboxProviderCapabilities;
```

### 调用签名

```text
validateSandboxProviderCapabilities(input: unknown): SandboxProviderCapabilities
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SandboxProviderCapabilities`
- 说明: 返回值契约由上述类型定义。

## `validateSandboxRecord`

Validate Sandbox Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateSandboxRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare function validateSandboxRecord(input: unknown): SandboxRecord;
```

### 调用签名

```text
validateSandboxRecord(input: unknown): SandboxRecord
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SandboxRecord`
- 说明: 返回值契约由上述类型定义。

## `validateSandboxStartRequest`

Validate Sandbox Start Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateSandboxStartRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare function validateSandboxStartRequest(input: unknown): SandboxStartRequest;
```

### 调用签名

```text
validateSandboxStartRequest(input: unknown): SandboxStartRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SandboxStartRequest`
- 说明: 返回值契约由上述类型定义。

## `validateSandboxStatusRequest`

Validate Sandbox Status Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateSandboxStatusRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare function validateSandboxStatusRequest(input: unknown): SandboxStatusRequest;
```

### 调用签名

```text
validateSandboxStatusRequest(input: unknown): SandboxStatusRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SandboxStatusRequest`
- 说明: 返回值契约由上述类型定义。

## `validateSandboxTerminateRequest`

Validate Sandbox Terminate Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateSandboxTerminateRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox/index.ts)

### 声明

```text
export declare function validateSandboxTerminateRequest(input: unknown): SandboxTerminateRequest;
```

### 调用签名

```text
validateSandboxTerminateRequest(input: unknown): SandboxTerminateRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SandboxTerminateRequest`
- 说明: 返回值契约由上述类型定义。
