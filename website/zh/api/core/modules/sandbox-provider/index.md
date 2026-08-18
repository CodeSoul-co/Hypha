# `@codesoul-co/hypha-core` / `modules/sandbox-provider/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/sandbox-provider/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)
- 导出数: **17**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Index 模块公开 13 常量、4 函数。

### 从包入口导入

```ts
import {
  sandboxCapabilityDerivationInputJsonSchema,
  sandboxCapabilityDerivationInputSchema,
  sandboxCapabilityNames,
  sandboxCapabilityNameSchema,
  sandboxCapabilityNegotiationRequestExample,
  sandboxCapabilityNegotiationRequestJsonSchema,
  sandboxCapabilityNegotiationRequestSchema,
  sandboxCapabilityNegotiationResultExample,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 13 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { sandboxCapabilityDerivationInputSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = sandboxCapabilityDerivationInputSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `sandboxCapabilityDerivationInputJsonSchema` | 常量 | <code>const sandboxCapabilityDerivationInputJsonSchema: JsonSchema</code> | Sandbox Capability Derivation Input 的 JSON Schema。 |
| `sandboxCapabilityDerivationInputSchema` | 常量 | <code>const sandboxCapabilityDerivationInputSchema: z.ZodObject&lt;{ environment: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { revision: z.ZodOptional&lt;...</code> | Sandbox Capability Derivation Input 的运行时 Schema。 |
| `sandboxCapabilityNames` | 常量 | <code>const sandboxCapabilityNames: readonly ["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"]</code> | 由 `modules/sandbox-provider/index` 模块导出的 Sandbox Capability Names 常量。 |
| `sandboxCapabilityNameSchema` | 常量 | <code>const sandboxCapabilityNameSchema: z.ZodEnum&lt;["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"]&gt;</code> | Sandbox Capability Name 的运行时 Schema。 |
| `sandboxCapabilityNegotiationRequestExample` | 常量 | <code>const sandboxCapabilityNegotiationRequestExample: SandboxCapabilityNegotiationRequest</code> | Sandbox Capability Negotiation Request 的有效示例值。 |
| `sandboxCapabilityNegotiationRequestJsonSchema` | 常量 | <code>const sandboxCapabilityNegotiationRequestJsonSchema: JsonSchema</code> | Sandbox Capability Negotiation Request 的 JSON Schema。 |
| `sandboxCapabilityNegotiationRequestSchema` | 常量 | <code>const sandboxCapabilityNegotiationRequestSchema: z.ZodObject&lt;{ providerId: z.ZodString; capabilities: z.ZodObject&lt;{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; snapshots: z.ZodBoolean; imageDigestPin...</code> | Sandbox Capability Negotiation Request 的运行时 Schema。 |
| `sandboxCapabilityNegotiationResultExample` | 常量 | <code>const sandboxCapabilityNegotiationResultExample: SandboxCapabilityNegotiationResult</code> | Sandbox Capability Negotiation Result 的有效示例值。 |
| `sandboxCapabilityNegotiationResultJsonSchema` | 常量 | <code>const sandboxCapabilityNegotiationResultJsonSchema: JsonSchema</code> | Sandbox Capability Negotiation Result 的 JSON Schema。 |
| `sandboxCapabilityNegotiationResultSchema` | 常量 | <code>const sandboxCapabilityNegotiationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ providerId: z.ZodString; compatible: z.ZodBoolean; capabilities: z.ZodObject&lt;{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; s...</code> | Sandbox Capability Negotiation Result 的运行时 Schema。 |
| `sandboxCapabilityRequirementJsonSchema` | 常量 | <code>const sandboxCapabilityRequirementJsonSchema: JsonSchema</code> | Sandbox Capability Requirement 的 JSON Schema。 |
| `sandboxCapabilityRequirementSchema` | 常量 | <code>const sandboxCapabilityRequirementSchema: z.ZodObject&lt;{ capability: z.ZodEnum&lt;["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"]&gt;; source: z.ZodEnum&lt;["environment", "command", "policy", "runtime"]&gt;; reason: z.ZodString; }, "strict", z.ZodTypeAny, { reason: st...</code> | Sandbox Capability Requirement 的运行时 Schema。 |
| `sandboxProviderContractJsonSchemas` | 常量 | <code>const sandboxProviderContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/sandbox-provider/index` 模块导出的 Sandbox Provider Contract JSON Schemas 常量。 |
| `deriveSandboxCapabilityRequirements` | 函数 | <code>deriveSandboxCapabilityRequirements(input: SandboxCapabilityDerivationInput): SandboxCapabilityRequirement[]</code> | Derive Sandbox Capability Requirements 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `negotiateSandboxCapabilities` | 函数 | <code>negotiateSandboxCapabilities(request: SandboxCapabilityNegotiationRequest): SandboxCapabilityNegotiationResult</code> | Negotiate Sandbox Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateSandboxCapabilityNegotiationRequest` | 函数 | <code>validateSandboxCapabilityNegotiationRequest(input: unknown): SandboxCapabilityNegotiationRequest</code> | Validate Sandbox Capability Negotiation Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateSandboxCapabilityNegotiationResult` | 函数 | <code>validateSandboxCapabilityNegotiationResult(input: unknown): SandboxCapabilityNegotiationResult</code> | Validate Sandbox Capability Negotiation Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `sandboxCapabilityDerivationInputJsonSchema`

Sandbox Capability Derivation Input 的 JSON Schema。

- 种类: 常量
- 导入: `import { sandboxCapabilityDerivationInputJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
export declare const sandboxCapabilityDerivationInputJsonSchema: JsonSchema;
```

## `sandboxCapabilityDerivationInputSchema`

Sandbox Capability Derivation Input 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxCapabilityDerivationInputSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const sandboxCapabilityDerivationInputSchema: (typeof import('@codesoul-co/hypha-core'))['sandboxCapabilityDerivationInputSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `sandboxCapabilityNames`

由 `modules/sandbox-provider/index` 模块导出的 Sandbox Capability Names 常量。

- 种类: 常量
- 导入: `import { sandboxCapabilityNames } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
export declare const sandboxCapabilityNames: readonly ["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"];
```

## `sandboxCapabilityNameSchema`

Sandbox Capability Name 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxCapabilityNameSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
export declare const sandboxCapabilityNameSchema: z.ZodEnum<["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"]>;
```

## `sandboxCapabilityNegotiationRequestExample`

Sandbox Capability Negotiation Request 的有效示例值。

- 种类: 常量
- 导入: `import { sandboxCapabilityNegotiationRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
export declare const sandboxCapabilityNegotiationRequestExample: SandboxCapabilityNegotiationRequest;
```

## `sandboxCapabilityNegotiationRequestJsonSchema`

Sandbox Capability Negotiation Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { sandboxCapabilityNegotiationRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
export declare const sandboxCapabilityNegotiationRequestJsonSchema: JsonSchema;
```

## `sandboxCapabilityNegotiationRequestSchema`

Sandbox Capability Negotiation Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxCapabilityNegotiationRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
export declare const sandboxCapabilityNegotiationRequestSchema: z.ZodObject<{ providerId: z.ZodString; capabilities: z.ZodObject<{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; snapshots: z.ZodBoolean; imageDigestPinning: z.ZodBoolean; remoteExecution: z.ZodBoolean; }, "strict", z.ZodTypeAny, { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: boolean; }, { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: boolean; }>; requirements: z.ZodArray<z.ZodObject<{ capability: z.ZodEnum<["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"]>; source: z.ZodEnum<["environment", "command", "policy", "runtime"]>; reason: z.ZodString; }, "strict", z.ZodTypeAny, { reason: string; source: "command" | "policy" | "environment" | "runtime"; capability: "processIsolation" | "filesystemIsolation" | "networkIsolation" | "cpuLimits" | "memoryLimits" | "diskLimits" | "pidsLimit" | "cancellation" | "processTreeKill" | "snapshots" | "imageDigestPinning" | "remoteExecution"; }, { reason: string; source: "command" | "policy" | "environment" | "runtime"; capability: "processIsolation" | "filesystemIsolation" | "networkIsolation" | "cpuLimits" | "memoryLimits" | "diskLimits" | "pidsLimit" | "cancellation" | "processTreeKill" | "snapshots" | "imageDigestPinning" | "remoteExecution"; }>, "many">; evaluatedAt: z.ZodString; }, "strict", z.ZodTypeAny, { providerId: string; capabilities: { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: boolean; }; requirements: { reason: string; source: "command" | "policy" | "environment" | "runtime"; capability: "processIsolation" | "filesystemIsolation" | "networkIsolation" | "cpuLimits" | "memoryLimits" | "diskLimits" | "pidsLimit" | "cancellation" | "processTreeKill" | "snapshots" | "imageDigestPinning" | "remoteExecution"; }[]; evaluatedAt: string; }, { providerId: string; capabilities: { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: boolean; }; requirements: { reason: string; source: "command" | "policy" | "environment" | "runtime"; capability: "processIsolation" | "filesystemIsolation" | "networkIsolation" | "cpuLimits" | "memoryLimits" | "diskLimits" | "pidsLimit" | "cancellation" | "processTreeKill" | "snapshots" | "imageDigestPinning" | "remoteExecution"; }[]; evaluatedAt: string; }>;
```

## `sandboxCapabilityNegotiationResultExample`

Sandbox Capability Negotiation Result 的有效示例值。

- 种类: 常量
- 导入: `import { sandboxCapabilityNegotiationResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
export declare const sandboxCapabilityNegotiationResultExample: SandboxCapabilityNegotiationResult;
```

## `sandboxCapabilityNegotiationResultJsonSchema`

Sandbox Capability Negotiation Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { sandboxCapabilityNegotiationResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
export declare const sandboxCapabilityNegotiationResultJsonSchema: JsonSchema;
```

## `sandboxCapabilityNegotiationResultSchema`

Sandbox Capability Negotiation Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxCapabilityNegotiationResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const sandboxCapabilityNegotiationResultSchema: (typeof import('@codesoul-co/hypha-core'))['sandboxCapabilityNegotiationResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `sandboxCapabilityRequirementJsonSchema`

Sandbox Capability Requirement 的 JSON Schema。

- 种类: 常量
- 导入: `import { sandboxCapabilityRequirementJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
export declare const sandboxCapabilityRequirementJsonSchema: JsonSchema;
```

## `sandboxCapabilityRequirementSchema`

Sandbox Capability Requirement 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxCapabilityRequirementSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
export declare const sandboxCapabilityRequirementSchema: z.ZodObject<{ capability: z.ZodEnum<["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"]>; source: z.ZodEnum<["environment", "command", "policy", "runtime"]>; reason: z.ZodString; }, "strict", z.ZodTypeAny, { reason: string; source: "command" | "policy" | "environment" | "runtime"; capability: "processIsolation" | "filesystemIsolation" | "networkIsolation" | "cpuLimits" | "memoryLimits" | "diskLimits" | "pidsLimit" | "cancellation" | "processTreeKill" | "snapshots" | "imageDigestPinning" | "remoteExecution"; }, { reason: string; source: "command" | "policy" | "environment" | "runtime"; capability: "processIsolation" | "filesystemIsolation" | "networkIsolation" | "cpuLimits" | "memoryLimits" | "diskLimits" | "pidsLimit" | "cancellation" | "processTreeKill" | "snapshots" | "imageDigestPinning" | "remoteExecution"; }>;
```

## `sandboxProviderContractJsonSchemas`

由 `modules/sandbox-provider/index` 模块导出的 Sandbox Provider Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { sandboxProviderContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
export declare const sandboxProviderContractJsonSchemas: Record<string, JsonSchema>;
```

## `deriveSandboxCapabilityRequirements`

Derive Sandbox Capability Requirements 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { deriveSandboxCapabilityRequirements } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
export declare function deriveSandboxCapabilityRequirements(input: SandboxCapabilityDerivationInput): SandboxCapabilityRequirement[];
```

### 调用签名

```text
deriveSandboxCapabilityRequirements(input: SandboxCapabilityDerivationInput): SandboxCapabilityRequirement[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>SandboxCapabilityDerivationInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SandboxCapabilityRequirement[]`
- 说明: 返回值契约由上述类型定义。

## `negotiateSandboxCapabilities`

Negotiate Sandbox Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { negotiateSandboxCapabilities } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
export declare function negotiateSandboxCapabilities(request: SandboxCapabilityNegotiationRequest): SandboxCapabilityNegotiationResult;
```

### 调用签名

```text
negotiateSandboxCapabilities(request: SandboxCapabilityNegotiationRequest): SandboxCapabilityNegotiationResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `request` | <code>SandboxCapabilityNegotiationRequest</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SandboxCapabilityNegotiationResult`
- 说明: 返回值契约由上述类型定义。

## `validateSandboxCapabilityNegotiationRequest`

Validate Sandbox Capability Negotiation Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateSandboxCapabilityNegotiationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
export declare function validateSandboxCapabilityNegotiationRequest(input: unknown): SandboxCapabilityNegotiationRequest;
```

### 调用签名

```text
validateSandboxCapabilityNegotiationRequest(input: unknown): SandboxCapabilityNegotiationRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SandboxCapabilityNegotiationRequest`
- 说明: 返回值契约由上述类型定义。

## `validateSandboxCapabilityNegotiationResult`

Validate Sandbox Capability Negotiation Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateSandboxCapabilityNegotiationResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)

### 声明

```text
export declare function validateSandboxCapabilityNegotiationResult(input: unknown): SandboxCapabilityNegotiationResult;
```

### 调用签名

```text
validateSandboxCapabilityNegotiationResult(input: unknown): SandboxCapabilityNegotiationResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SandboxCapabilityNegotiationResult`
- 说明: 返回值契约由上述类型定义。
