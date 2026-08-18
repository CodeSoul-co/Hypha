# `@codesoul-co/hypha-core` / `modules/remote-sandbox-provider/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/remote-sandbox-provider/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)
- 导出数: **39**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Index 模块公开 1 类、28 常量、9 函数、1 接口。

### 从包入口导入

```ts
import {
  RemoteArtifactChunkSequenceValidator,
  remoteArtifactChunkExample,
  remoteArtifactChunkJsonSchema,
  remoteArtifactChunkSchema,
  remoteArtifactChunkSequenceExpectationExample,
  remoteArtifactChunkSequenceExpectationJsonSchema,
  remoteArtifactChunkSequenceExpectationSchema,
  remoteArtifactDownloadRequestExample,
} from '@codesoul-co/hypha-core';

import type {
  RemoteArtifactChunkSequenceProgress,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 9 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 28 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { remoteArtifactChunkSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = remoteArtifactChunkSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RemoteArtifactChunkSequenceValidator` | 类 | <code>new RemoteArtifactChunkSequenceValidator(expectationInput: unknown): RemoteArtifactChunkSequenceValidator</code> | Validates a remote Artifact transfer incrementally without retaining chunk content. |
| `remoteArtifactChunkExample` | 常量 | <code>const remoteArtifactChunkExample: RemoteArtifactChunk</code> | Remote Artifact Chunk 的有效示例值。 |
| `remoteArtifactChunkJsonSchema` | 常量 | <code>const remoteArtifactChunkJsonSchema: JsonSchema</code> | Remote Artifact Chunk 的 JSON Schema。 |
| `remoteArtifactChunkSchema` | 常量 | <code>const remoteArtifactChunkSchema: z.ZodEffects&lt;z.ZodObject&lt;{ transferId: z.ZodString; artifactRef: z.ZodString; sequence: z.ZodNumber; offsetBytes: z.ZodNumber; encoding: z.ZodLiteral&lt;"base64"&gt;; content: z.ZodEffects&lt;z.ZodString, string, string&gt;; byteLength: z.ZodNumber; contentHash: z.ZodString; final: z.ZodBoolean; }, "strict", z.ZodTypeAny, { contentHash: string; final: boolean; sequence: number; content: string...</code> | Remote Artifact Chunk 的运行时 Schema。 |
| `remoteArtifactChunkSequenceExpectationExample` | 常量 | <code>const remoteArtifactChunkSequenceExpectationExample: RemoteArtifactChunkSequenceExpectation</code> | Remote Artifact Chunk Sequence Expectation 的有效示例值。 |
| `remoteArtifactChunkSequenceExpectationJsonSchema` | 常量 | <code>const remoteArtifactChunkSequenceExpectationJsonSchema: JsonSchema</code> | Remote Artifact Chunk Sequence Expectation 的 JSON Schema。 |
| `remoteArtifactChunkSequenceExpectationSchema` | 常量 | <code>const remoteArtifactChunkSequenceExpectationSchema: z.ZodObject&lt;{ transferId: z.ZodString; artifactRef: z.ZodString; sizeBytes: z.ZodNumber; }, "strict", z.ZodTypeAny, { sizeBytes: number; artifactRef: string; transferId: string; }, { sizeBytes: number; artifactRef: string; transferId: string; }&gt;</code> | Remote Artifact Chunk Sequence Expectation 的运行时 Schema。 |
| `remoteArtifactDownloadRequestExample` | 常量 | <code>const remoteArtifactDownloadRequestExample: RemoteArtifactDownloadRequest</code> | Remote Artifact Download Request 的有效示例值。 |
| `remoteArtifactDownloadRequestJsonSchema` | 常量 | <code>const remoteArtifactDownloadRequestJsonSchema: JsonSchema</code> | Remote Artifact Download Request 的 JSON Schema。 |
| `remoteArtifactDownloadRequestSchema` | 常量 | <code>const remoteArtifactDownloadRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodSt...</code> | Remote Artifact Download Request 的运行时 Schema。 |
| `remoteArtifactTransferReceiptExample` | 常量 | <code>const remoteArtifactTransferReceiptExample: RemoteArtifactTransferReceipt</code> | Remote Artifact Transfer Receipt 的有效示例值。 |
| `remoteArtifactTransferReceiptJsonSchema` | 常量 | <code>const remoteArtifactTransferReceiptJsonSchema: JsonSchema</code> | Remote Artifact Transfer Receipt 的 JSON Schema。 |
| `remoteArtifactTransferReceiptSchema` | 常量 | <code>const remoteArtifactTransferReceiptSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; providerId: z.ZodString; sandboxId: z.ZodString; artifactRef: z.ZodString; direction: z.ZodEnum&lt;["upload", "download"]&gt;; status: z.ZodEnum&lt;["accepted", "completed", "rejected", "unknown"]&gt;; sizeBytes: z.ZodNumber; contentHash: z.ZodOptional&lt;z.ZodString&gt;; providerTransferRef: z.ZodOptional&lt;z.ZodString&gt;; issuedAt: z.ZodString; rec...</code> | Remote Artifact Transfer Receipt 的运行时 Schema。 |
| `remoteArtifactUploadRequestExample` | 常量 | <code>const remoteArtifactUploadRequestExample: RemoteArtifactUploadRequest</code> | Remote Artifact Upload Request 的有效示例值。 |
| `remoteArtifactUploadRequestJsonSchema` | 常量 | <code>const remoteArtifactUploadRequestJsonSchema: JsonSchema</code> | Remote Artifact Upload Request 的 JSON Schema。 |
| `remoteArtifactUploadRequestSchema` | 常量 | <code>const remoteArtifactUploadRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodStri...</code> | Remote Artifact Upload Request 的运行时 Schema。 |
| `remoteExecutionReconciliationRequestExample` | 常量 | <code>const remoteExecutionReconciliationRequestExample: RemoteExecutionReconciliationRequest</code> | Remote Execution Reconciliation Request 的有效示例值。 |
| `remoteExecutionReconciliationRequestJsonSchema` | 常量 | <code>const remoteExecutionReconciliationRequestJsonSchema: JsonSchema</code> | Remote Execution Reconciliation Request 的 JSON Schema。 |
| `remoteExecutionReconciliationRequestSchema` | 常量 | <code>const remoteExecutionReconciliationRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, ...</code> | Remote Execution Reconciliation Request 的运行时 Schema。 |
| `remoteExecutionReconciliationResultExample` | 常量 | <code>const remoteExecutionReconciliationResultExample: RemoteExecutionReconciliationResult</code> | Remote Execution Reconciliation Result 的有效示例值。 |
| `remoteExecutionReconciliationResultJsonSchema` | 常量 | <code>const remoteExecutionReconciliationResultJsonSchema: JsonSchema</code> | Remote Execution Reconciliation Result 的 JSON Schema。 |
| `remoteExecutionReconciliationResultSchema` | 常量 | <code>const remoteExecutionReconciliationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; sandboxId: z.ZodString; state: z.ZodEnum&lt;["not_found", "accepted", "running", "completed", "failed", "cancelled", "unknown"]&gt;; providerExecutionRef: z.ZodOptional&lt;z.ZodString&gt;; observedAt: z.ZodString; result: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; revision: z.ZodNumber; sandboxId: z.Zo...</code> | Remote Execution Reconciliation Result 的运行时 Schema。 |
| `remoteOutputStreamRequestExample` | 常量 | <code>const remoteOutputStreamRequestExample: RemoteOutputStreamRequest</code> | Remote Output Stream Request 的有效示例值。 |
| `remoteOutputStreamRequestJsonSchema` | 常量 | <code>const remoteOutputStreamRequestJsonSchema: JsonSchema</code> | Remote Output Stream Request 的 JSON Schema。 |
| `remoteOutputStreamRequestSchema` | 常量 | <code>const remoteOutputStreamRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodStri...</code> | Remote Output Stream Request 的运行时 Schema。 |
| `remoteSandboxProviderCapabilitiesExample` | 常量 | <code>const remoteSandboxProviderCapabilitiesExample: RemoteSandboxProviderCapabilities</code> | Remote Sandbox Provider Capabilities 的有效示例值。 |
| `remoteSandboxProviderCapabilitiesJsonSchema` | 常量 | <code>const remoteSandboxProviderCapabilitiesJsonSchema: JsonSchema</code> | Remote Sandbox Provider Capabilities 的 JSON Schema。 |
| `remoteSandboxProviderCapabilitiesSchema` | 常量 | <code>const remoteSandboxProviderCapabilitiesSchema: z.ZodObject&lt;{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; snapshots: z.ZodBoolean; imageDigestPinning: z.ZodBoolean; } &amp; { remoteExecution: z.ZodLiteral...</code> | Remote Sandbox Provider Capabilities 的运行时 Schema。 |
| `remoteSandboxProviderContractJsonSchemas` | 常量 | <code>const remoteSandboxProviderContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/remote-sandbox-provider/index` 模块导出的 Remote Sandbox Provider Contract JSON Schemas 常量。 |
| `validateRemoteArtifactChunk` | 函数 | <code>validateRemoteArtifactChunk(input: unknown): RemoteArtifactChunk</code> | Validate Remote Artifact Chunk 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRemoteArtifactChunkSequence` | 函数 | <code>validateRemoteArtifactChunkSequence(input: readonly unknown[], expectationInput: unknown): RemoteArtifactChunk[]</code> | Validate Remote Artifact Chunk Sequence 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRemoteArtifactDownloadRequest` | 函数 | <code>validateRemoteArtifactDownloadRequest(input: unknown): RemoteArtifactDownloadRequest</code> | Validate Remote Artifact Download Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRemoteArtifactTransferReceipt` | 函数 | <code>validateRemoteArtifactTransferReceipt(input: unknown): RemoteArtifactTransferReceipt</code> | Validate Remote Artifact Transfer Receipt 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRemoteArtifactUploadRequest` | 函数 | <code>validateRemoteArtifactUploadRequest(input: unknown): RemoteArtifactUploadRequest</code> | Validate Remote Artifact Upload Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRemoteExecutionReconciliationRequest` | 函数 | <code>validateRemoteExecutionReconciliationRequest(input: unknown): RemoteExecutionReconciliationRequest</code> | Validate Remote Execution Reconciliation Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRemoteExecutionReconciliationResult` | 函数 | <code>validateRemoteExecutionReconciliationResult(input: unknown): RemoteExecutionReconciliationResult</code> | Validate Remote Execution Reconciliation Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRemoteOutputStreamRequest` | 函数 | <code>validateRemoteOutputStreamRequest(input: unknown): RemoteOutputStreamRequest</code> | Validate Remote Output Stream Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRemoteSandboxProviderCapabilities` | 函数 | <code>validateRemoteSandboxProviderCapabilities(input: unknown): RemoteSandboxProviderCapabilities</code> | Validate Remote Sandbox Provider Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `RemoteArtifactChunkSequenceProgress` | 接口 | <code>interface RemoteArtifactChunkSequenceProgress</code> | Remote Artifact Chunk Sequence Progress 接口，共包含 3 个公开字段或方法。 |

## `RemoteArtifactChunkSequenceValidator`

Validates a remote Artifact transfer incrementally without retaining chunk content.

- 种类: 类
- 导入: `import { RemoteArtifactChunkSequenceValidator } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare class RemoteArtifactChunkSequenceValidator {
    constructor(expectationInput: unknown);
    push(input: unknown): RemoteArtifactChunk;
    progress(): RemoteArtifactChunkSequenceProgress;
    finish(): RemoteArtifactChunkSequenceProgress;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(expectationInput: unknown): RemoteArtifactChunkSequenceValidator</code> | 创建该类的实例。 |
| `finish` | 方法 | <code>finish(): RemoteArtifactChunkSequenceProgress</code> | 公开方法；参数与返回类型以签名列为准。 |
| `progress` | 方法 | <code>progress(): RemoteArtifactChunkSequenceProgress</code> | 公开方法；参数与返回类型以签名列为准。 |
| `push` | 方法 | <code>push(input: unknown): RemoteArtifactChunk</code> | 公开方法；参数与返回类型以签名列为准。 |

## `remoteArtifactChunkExample`

Remote Artifact Chunk 的有效示例值。

- 种类: 常量
- 导入: `import { remoteArtifactChunkExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteArtifactChunkExample: RemoteArtifactChunk;
```

## `remoteArtifactChunkJsonSchema`

Remote Artifact Chunk 的 JSON Schema。

- 种类: 常量
- 导入: `import { remoteArtifactChunkJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteArtifactChunkJsonSchema: JsonSchema;
```

## `remoteArtifactChunkSchema`

Remote Artifact Chunk 的运行时 Schema。

- 种类: 常量
- 导入: `import { remoteArtifactChunkSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteArtifactChunkSchema: z.ZodEffects<z.ZodObject<{ transferId: z.ZodString; artifactRef: z.ZodString; sequence: z.ZodNumber; offsetBytes: z.ZodNumber; encoding: z.ZodLiteral<"base64">; content: z.ZodEffects<z.ZodString, string, string>; byteLength: z.ZodNumber; contentHash: z.ZodString; final: z.ZodBoolean; }, "strict", z.ZodTypeAny, { contentHash: string; final: boolean; sequence: number; content: string; encoding: "base64"; artifactRef: string; byteLength: number; transferId: string; offsetBytes: number; }, { contentHash: string; final: boolean; sequence: number; content: string; encoding: "base64"; artifactRef: string; byteLength: number; transferId: string; offsetBytes: number; }>, { contentHash: string; final: boolean; sequence: number; content: string; encoding: "base64"; artifactRef: string; byteLength: number; transferId: string; offsetBytes: number; }, { contentHash: string; final: boolean; sequence: number; content: string; encoding: "base64"; artifactRef: string; byteLength: number; transferId: string; offsetBytes: number; }>;
```

## `remoteArtifactChunkSequenceExpectationExample`

Remote Artifact Chunk Sequence Expectation 的有效示例值。

- 种类: 常量
- 导入: `import { remoteArtifactChunkSequenceExpectationExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteArtifactChunkSequenceExpectationExample: RemoteArtifactChunkSequenceExpectation;
```

## `remoteArtifactChunkSequenceExpectationJsonSchema`

Remote Artifact Chunk Sequence Expectation 的 JSON Schema。

- 种类: 常量
- 导入: `import { remoteArtifactChunkSequenceExpectationJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteArtifactChunkSequenceExpectationJsonSchema: JsonSchema;
```

## `remoteArtifactChunkSequenceExpectationSchema`

Remote Artifact Chunk Sequence Expectation 的运行时 Schema。

- 种类: 常量
- 导入: `import { remoteArtifactChunkSequenceExpectationSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteArtifactChunkSequenceExpectationSchema: z.ZodObject<{ transferId: z.ZodString; artifactRef: z.ZodString; sizeBytes: z.ZodNumber; }, "strict", z.ZodTypeAny, { sizeBytes: number; artifactRef: string; transferId: string; }, { sizeBytes: number; artifactRef: string; transferId: string; }>;
```

## `remoteArtifactDownloadRequestExample`

Remote Artifact Download Request 的有效示例值。

- 种类: 常量
- 导入: `import { remoteArtifactDownloadRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteArtifactDownloadRequestExample: RemoteArtifactDownloadRequest;
```

## `remoteArtifactDownloadRequestJsonSchema`

Remote Artifact Download Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { remoteArtifactDownloadRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteArtifactDownloadRequestJsonSchema: JsonSchema;
```

## `remoteArtifactDownloadRequestSchema`

Remote Artifact Download Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { remoteArtifactDownloadRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteArtifactDownloadRequestSchema: z.ZodObject<{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; artifactRef: z.ZodString; maxBytes: z.ZodNumber; expectedContentHash: z.ZodOptional<z.ZodString>; correlationId: z.ZodOptional<z.ZodString>; causationId: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; maxBytes: number; artifactRef: string; metadata?: Record<string, unknown> | undefined; correlationId?: string | undefined; causationId?: string | undefined; expectedContentHash?: string | undefined; }, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; maxBytes: number; artifactRef: string; metadata?: Record<string, unknown> | undefined; correlationId?: string | undefined; causationId?: string | undefined; expectedContentHash?: string | undefined; }>;
```

## `remoteArtifactTransferReceiptExample`

Remote Artifact Transfer Receipt 的有效示例值。

- 种类: 常量
- 导入: `import { remoteArtifactTransferReceiptExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteArtifactTransferReceiptExample: RemoteArtifactTransferReceipt;
```

## `remoteArtifactTransferReceiptJsonSchema`

Remote Artifact Transfer Receipt 的 JSON Schema。

- 种类: 常量
- 导入: `import { remoteArtifactTransferReceiptJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteArtifactTransferReceiptJsonSchema: JsonSchema;
```

## `remoteArtifactTransferReceiptSchema`

Remote Artifact Transfer Receipt 的运行时 Schema。

- 种类: 常量
- 导入: `import { remoteArtifactTransferReceiptSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteArtifactTransferReceiptSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; providerId: z.ZodString; sandboxId: z.ZodString; artifactRef: z.ZodString; direction: z.ZodEnum<["upload", "download"]>; status: z.ZodEnum<["accepted", "completed", "rejected", "unknown"]>; sizeBytes: z.ZodNumber; contentHash: z.ZodOptional<z.ZodString>; providerTransferRef: z.ZodOptional<z.ZodString>; issuedAt: z.ZodString; receiptHash: z.ZodString; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { status: "unknown" | "completed" | "rejected" | "accepted"; id: string; sizeBytes: number; sandboxId: string; providerId: string; issuedAt: string; receiptHash: string; artifactRef: string; direction: "upload" | "download"; contentHash?: string | undefined; metadata?: Record<string, unknown> | undefined; providerTransferRef?: string | undefined; }, { status: "unknown" | "completed" | "rejected" | "accepted"; id: string; sizeBytes: number; sandboxId: string; providerId: string; issuedAt: string; receiptHash: string; artifactRef: string; direction: "upload" | "download"; contentHash?: string | undefined; metadata?: Record<string, unknown> | undefined; providerTransferRef?: string | undefined; }>, { status: "unknown" | "completed" | "rejected" | "accepted"; id: string; sizeBytes: number; sandboxId: string; providerId: string; issuedAt: string; receiptHash: string; artifactRef: string; direction: "upload" | "download"; contentHash?: string | undefined; metadata?: Record<string, unknown> | undefined; providerTransferRef?: string | undefined; }, { status: "unknown" | "completed" | "rejected" | "accepted"; id: string; sizeBytes: number; sandboxId: string; providerId: string; issuedAt: string; receiptHash: string; artifactRef: string; direction: "upload" | "download"; contentHash?: string | undefined; metadata?: Record<string, unknown> | undefined; providerTransferRef?: string | undefined; }>;
```

## `remoteArtifactUploadRequestExample`

Remote Artifact Upload Request 的有效示例值。

- 种类: 常量
- 导入: `import { remoteArtifactUploadRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteArtifactUploadRequestExample: RemoteArtifactUploadRequest;
```

## `remoteArtifactUploadRequestJsonSchema`

Remote Artifact Upload Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { remoteArtifactUploadRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteArtifactUploadRequestJsonSchema: JsonSchema;
```

## `remoteArtifactUploadRequestSchema`

Remote Artifact Upload Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { remoteArtifactUploadRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteArtifactUploadRequestSchema: z.ZodObject<{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; expectedSandboxRevision: z.ZodNumber; artifactRef: z.ZodString; sizeBytes: z.ZodNumber; contentHash: z.ZodString; mediaType: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodString; correlationId: z.ZodOptional<z.ZodString>; causationId: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { operationId: string; contentHash: string; sizeBytes: number; idempotencyKey: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; artifactRef: string; expectedSandboxRevision: number; metadata?: Record<string, unknown> | undefined; correlationId?: string | undefined; causationId?: string | undefined; mediaType?: string | undefined; }, { operationId: string; contentHash: string; sizeBytes: number; idempotencyKey: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; artifactRef: string; expectedSandboxRevision: number; metadata?: Record<string, unknown> | undefined; correlationId?: string | undefined; causationId?: string | undefined; mediaType?: string | undefined; }>;
```

## `remoteExecutionReconciliationRequestExample`

Remote Execution Reconciliation Request 的有效示例值。

- 种类: 常量
- 导入: `import { remoteExecutionReconciliationRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteExecutionReconciliationRequestExample: RemoteExecutionReconciliationRequest;
```

## `remoteExecutionReconciliationRequestJsonSchema`

Remote Execution Reconciliation Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { remoteExecutionReconciliationRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteExecutionReconciliationRequestJsonSchema: JsonSchema;
```

## `remoteExecutionReconciliationRequestSchema`

Remote Execution Reconciliation Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { remoteExecutionReconciliationRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteExecutionReconciliationRequestSchema: z.ZodEffects<z.ZodObject<{ operationId: z.ZodString; executionId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; providerExecutionRef: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodOptional<z.ZodString>; correlationId: z.ZodOptional<z.ZodString>; causationId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; executionId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; correlationId?: string | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; providerExecutionRef?: string | undefined; }, { operationId: string; executionId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; correlationId?: string | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; providerExecutionRef?: string | undefined; }>, { operationId: string; executionId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; correlationId?: string | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; providerExecutionRef?: string | undefined; }, { operationId: string; executionId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; correlationId?: string | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; providerExecutionRef?: string | undefined; }>;
```

## `remoteExecutionReconciliationResultExample`

Remote Execution Reconciliation Result 的有效示例值。

- 种类: 常量
- 导入: `import { remoteExecutionReconciliationResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteExecutionReconciliationResultExample: RemoteExecutionReconciliationResult;
```

## `remoteExecutionReconciliationResultJsonSchema`

Remote Execution Reconciliation Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { remoteExecutionReconciliationResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteExecutionReconciliationResultJsonSchema: JsonSchema;
```

## `remoteExecutionReconciliationResultSchema`

Remote Execution Reconciliation Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { remoteExecutionReconciliationResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const remoteExecutionReconciliationResultSchema: (typeof import('@codesoul-co/hypha-core'))['remoteExecutionReconciliationResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `remoteOutputStreamRequestExample`

Remote Output Stream Request 的有效示例值。

- 种类: 常量
- 导入: `import { remoteOutputStreamRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteOutputStreamRequestExample: RemoteOutputStreamRequest;
```

## `remoteOutputStreamRequestJsonSchema`

Remote Output Stream Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { remoteOutputStreamRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteOutputStreamRequestJsonSchema: JsonSchema;
```

## `remoteOutputStreamRequestSchema`

Remote Output Stream Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { remoteOutputStreamRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteOutputStreamRequestSchema: z.ZodObject<{ operationId: z.ZodString; executionId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; fromSequence: z.ZodOptional<z.ZodNumber>; maxChunks: z.ZodOptional<z.ZodNumber>; follow: z.ZodOptional<z.ZodBoolean>; correlationId: z.ZodOptional<z.ZodString>; causationId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; executionId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; correlationId?: string | undefined; causationId?: string | undefined; fromSequence?: number | undefined; maxChunks?: number | undefined; follow?: boolean | undefined; }, { operationId: string; executionId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; correlationId?: string | undefined; causationId?: string | undefined; fromSequence?: number | undefined; maxChunks?: number | undefined; follow?: boolean | undefined; }>;
```

## `remoteSandboxProviderCapabilitiesExample`

Remote Sandbox Provider Capabilities 的有效示例值。

- 种类: 常量
- 导入: `import { remoteSandboxProviderCapabilitiesExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteSandboxProviderCapabilitiesExample: RemoteSandboxProviderCapabilities;
```

## `remoteSandboxProviderCapabilitiesJsonSchema`

Remote Sandbox Provider Capabilities 的 JSON Schema。

- 种类: 常量
- 导入: `import { remoteSandboxProviderCapabilitiesJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteSandboxProviderCapabilitiesJsonSchema: JsonSchema;
```

## `remoteSandboxProviderCapabilitiesSchema`

Remote Sandbox Provider Capabilities 的运行时 Schema。

- 种类: 常量
- 导入: `import { remoteSandboxProviderCapabilitiesSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteSandboxProviderCapabilitiesSchema: z.ZodObject<{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; snapshots: z.ZodBoolean; imageDigestPinning: z.ZodBoolean; } & { remoteExecution: z.ZodLiteral<true>; }, "strict", z.ZodTypeAny, { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: true; }, { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: true; }>;
```

## `remoteSandboxProviderContractJsonSchemas`

由 `modules/remote-sandbox-provider/index` 模块导出的 Remote Sandbox Provider Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { remoteSandboxProviderContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare const remoteSandboxProviderContractJsonSchemas: Record<string, JsonSchema>;
```

## `validateRemoteArtifactChunk`

Validate Remote Artifact Chunk 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRemoteArtifactChunk } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare function validateRemoteArtifactChunk(input: unknown): RemoteArtifactChunk;
```

### 调用签名

```text
validateRemoteArtifactChunk(input: unknown): RemoteArtifactChunk
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RemoteArtifactChunk`
- 说明: 返回值契约由上述类型定义。

## `validateRemoteArtifactChunkSequence`

Validate Remote Artifact Chunk Sequence 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRemoteArtifactChunkSequence } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare function validateRemoteArtifactChunkSequence(input: readonly unknown[], expectationInput: unknown): RemoteArtifactChunk[];
```

### 调用签名

```text
validateRemoteArtifactChunkSequence(input: readonly unknown[], expectationInput: unknown): RemoteArtifactChunk[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>readonly unknown[]</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `expectationInput` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RemoteArtifactChunk[]`
- 说明: 返回值契约由上述类型定义。

## `validateRemoteArtifactDownloadRequest`

Validate Remote Artifact Download Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRemoteArtifactDownloadRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare function validateRemoteArtifactDownloadRequest(input: unknown): RemoteArtifactDownloadRequest;
```

### 调用签名

```text
validateRemoteArtifactDownloadRequest(input: unknown): RemoteArtifactDownloadRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RemoteArtifactDownloadRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRemoteArtifactTransferReceipt`

Validate Remote Artifact Transfer Receipt 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRemoteArtifactTransferReceipt } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare function validateRemoteArtifactTransferReceipt(input: unknown): RemoteArtifactTransferReceipt;
```

### 调用签名

```text
validateRemoteArtifactTransferReceipt(input: unknown): RemoteArtifactTransferReceipt
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RemoteArtifactTransferReceipt`
- 说明: 返回值契约由上述类型定义。

## `validateRemoteArtifactUploadRequest`

Validate Remote Artifact Upload Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRemoteArtifactUploadRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare function validateRemoteArtifactUploadRequest(input: unknown): RemoteArtifactUploadRequest;
```

### 调用签名

```text
validateRemoteArtifactUploadRequest(input: unknown): RemoteArtifactUploadRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RemoteArtifactUploadRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRemoteExecutionReconciliationRequest`

Validate Remote Execution Reconciliation Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRemoteExecutionReconciliationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare function validateRemoteExecutionReconciliationRequest(input: unknown): RemoteExecutionReconciliationRequest;
```

### 调用签名

```text
validateRemoteExecutionReconciliationRequest(input: unknown): RemoteExecutionReconciliationRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RemoteExecutionReconciliationRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRemoteExecutionReconciliationResult`

Validate Remote Execution Reconciliation Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRemoteExecutionReconciliationResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare function validateRemoteExecutionReconciliationResult(input: unknown): RemoteExecutionReconciliationResult;
```

### 调用签名

```text
validateRemoteExecutionReconciliationResult(input: unknown): RemoteExecutionReconciliationResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RemoteExecutionReconciliationResult`
- 说明: 返回值契约由上述类型定义。

## `validateRemoteOutputStreamRequest`

Validate Remote Output Stream Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRemoteOutputStreamRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare function validateRemoteOutputStreamRequest(input: unknown): RemoteOutputStreamRequest;
```

### 调用签名

```text
validateRemoteOutputStreamRequest(input: unknown): RemoteOutputStreamRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RemoteOutputStreamRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRemoteSandboxProviderCapabilities`

Validate Remote Sandbox Provider Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRemoteSandboxProviderCapabilities } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export declare function validateRemoteSandboxProviderCapabilities(input: unknown): RemoteSandboxProviderCapabilities;
```

### 调用签名

```text
validateRemoteSandboxProviderCapabilities(input: unknown): RemoteSandboxProviderCapabilities
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RemoteSandboxProviderCapabilities`
- 说明: 返回值契约由上述类型定义。

## `RemoteArtifactChunkSequenceProgress`

Remote Artifact Chunk Sequence Progress 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RemoteArtifactChunkSequenceProgress } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### 声明

```text
export interface RemoteArtifactChunkSequenceProgress {
    chunksValidated: number;
    bytesValidated: number;
    completed: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `bytesValidated` | 属性 | <code>bytesValidated: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `chunksValidated` | 属性 | <code>chunksValidated: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completed` | 属性 | <code>completed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
