# `@codesoul-co/hypha-core` / `contracts/runtime-replay-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-replay-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)
- 导出数: **22**

## 模块用法

用于声明并运行时校验契约。Runtime replay schemas 模块公开 18 常量、4 函数。

### 从包入口导入

```ts
import {
  runtimeReplayContractDefinitions,
  runtimeReplayContractJsonSchemas,
  runtimeReplayRequestDefinition,
  runtimeReplayRequestExample,
  runtimeReplayRequestJsonSchema,
  runtimeReplayRequestSchema,
  runtimeReplayResultDefinition,
  runtimeReplayResultExample,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 18 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { runtimeReplayRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeReplayRequestSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeReplayContractDefinitions` | 常量 | <code>const runtimeReplayContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeReplayRequest&gt;, SpecSchemaDefinition&lt;RuntimeReplayResult&gt;, SpecSchemaDefinition&lt;RuntimeReplayVerificationRequest&gt;, SpecSchemaDefinition&lt;RuntimeReplayVerificationResult&gt;]</code> | 由 `contracts/runtime-replay-schemas` 模块导出的 Runtime Replay Contract Definitions 常量。 |
| `runtimeReplayContractJsonSchemas` | 常量 | <code>const runtimeReplayContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-replay-schemas` 模块导出的 Runtime Replay Contract JSON Schemas 常量。 |
| `runtimeReplayRequestDefinition` | 常量 | <code>const runtimeReplayRequestDefinition: SpecSchemaDefinition&lt;RuntimeReplayRequest&gt;</code> | 由 `contracts/runtime-replay-schemas` 模块导出的 Runtime Replay Request Definition 常量。 |
| `runtimeReplayRequestExample` | 常量 | <code>const runtimeReplayRequestExample: RuntimeReplayRequest</code> | Runtime Replay Request 的有效示例值。 |
| `runtimeReplayRequestJsonSchema` | 常量 | <code>const runtimeReplayRequestJsonSchema: JsonSchema</code> | Runtime Replay Request 的 JSON Schema。 |
| `runtimeReplayRequestSchema` | 常量 | <code>const runtimeReplayRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string &#124; unde...</code> | Runtime Replay Request 的运行时 Schema。 |
| `runtimeReplayResultDefinition` | 常量 | <code>const runtimeReplayResultDefinition: SpecSchemaDefinition&lt;RuntimeReplayResult&gt;</code> | 由 `contracts/runtime-replay-schemas` 模块导出的 Runtime Replay Result Definition 常量。 |
| `runtimeReplayResultExample` | 常量 | <code>const runtimeReplayResultExample: RuntimeReplayResult</code> | Runtime Replay Result 的有效示例值。 |
| `runtimeReplayResultJsonSchema` | 常量 | <code>const runtimeReplayResultJsonSchema: JsonSchema</code> | Runtime Replay Result 的 JSON Schema。 |
| `runtimeReplayResultSchema` | 常量 | <code>const runtimeReplayResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ sourceRunId: z.ZodString; mode: z.ZodLiteral&lt;"deterministic"&gt;; checkpointId: z.ZodString; baseEventSequence: z.ZodNumber; targetEventSequence: z.ZodNumber; replayedEventCount: z.ZodNumber; appliedEventCount: z.ZodNumber; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; workflowRevision: z.ZodString; processHash: z.ZodString; dependencySnapshotRef: z.ZodString; ...</code> | Runtime Replay Result 的运行时 Schema。 |
| `runtimeReplayVerificationRequestDefinition` | 常量 | <code>const runtimeReplayVerificationRequestDefinition: SpecSchemaDefinition&lt;RuntimeReplayVerificationRequest&gt;</code> | 由 `contracts/runtime-replay-schemas` 模块导出的 Runtime Replay Verification Request Definition 常量。 |
| `runtimeReplayVerificationRequestExample` | 常量 | <code>const runtimeReplayVerificationRequestExample: RuntimeReplayVerificationRequest</code> | Runtime Replay Verification Request 的有效示例值。 |
| `runtimeReplayVerificationRequestJsonSchema` | 常量 | <code>const runtimeReplayVerificationRequestJsonSchema: JsonSchema</code> | Runtime Replay Verification Request 的 JSON Schema。 |
| `runtimeReplayVerificationRequestSchema` | 常量 | <code>const runtimeReplayVerificationRequestSchema: z.ZodObject&lt;{ replay: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; u...</code> | Runtime Replay Verification Request 的运行时 Schema。 |
| `runtimeReplayVerificationResultDefinition` | 常量 | <code>const runtimeReplayVerificationResultDefinition: SpecSchemaDefinition&lt;RuntimeReplayVerificationResult&gt;</code> | 由 `contracts/runtime-replay-schemas` 模块导出的 Runtime Replay Verification Result Definition 常量。 |
| `runtimeReplayVerificationResultExample` | 常量 | <code>const runtimeReplayVerificationResultExample: RuntimeReplayVerificationResult</code> | Runtime Replay Verification Result 的有效示例值。 |
| `runtimeReplayVerificationResultJsonSchema` | 常量 | <code>const runtimeReplayVerificationResultJsonSchema: JsonSchema</code> | Runtime Replay Verification Result 的 JSON Schema。 |
| `runtimeReplayVerificationResultSchema` | 常量 | <code>const runtimeReplayVerificationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ replay: z.ZodEffects&lt;z.ZodObject&lt;{ sourceRunId: z.ZodString; mode: z.ZodLiteral&lt;"deterministic"&gt;; checkpointId: z.ZodString; baseEventSequence: z.ZodNumber; targetEventSequence: z.ZodNumber; replayedEventCount: z.ZodNumber; appliedEventCount: z.ZodNumber; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; workflowRevision: z.ZodString; processHash: z....</code> | Runtime Replay Verification Result 的运行时 Schema。 |
| `validateRuntimeReplayRequest` | 函数 | <code>validateRuntimeReplayRequest(input: unknown): RuntimeReplayRequest</code> | Validate Runtime Replay Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeReplayResult` | 函数 | <code>validateRuntimeReplayResult(input: unknown): RuntimeReplayResult</code> | Validate Runtime Replay Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeReplayVerificationRequest` | 函数 | <code>validateRuntimeReplayVerificationRequest(input: unknown): RuntimeReplayVerificationRequest</code> | Validate Runtime Replay Verification Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeReplayVerificationResult` | 函数 | <code>validateRuntimeReplayVerificationResult(input: unknown): RuntimeReplayVerificationResult</code> | Validate Runtime Replay Verification Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `runtimeReplayContractDefinitions`

由 `contracts/runtime-replay-schemas` 模块导出的 Runtime Replay Contract Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeReplayContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayContractDefinitions: readonly [SpecSchemaDefinition<RuntimeReplayRequest>, SpecSchemaDefinition<RuntimeReplayResult>, SpecSchemaDefinition<RuntimeReplayVerificationRequest>, SpecSchemaDefinition<RuntimeReplayVerificationResult>];
```

## `runtimeReplayContractJsonSchemas`

由 `contracts/runtime-replay-schemas` 模块导出的 Runtime Replay Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { runtimeReplayContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeReplayRequestDefinition`

由 `contracts/runtime-replay-schemas` 模块导出的 Runtime Replay Request Definition 常量。

- 种类: 常量
- 导入: `import { runtimeReplayRequestDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayRequestDefinition: SpecSchemaDefinition<RuntimeReplayRequest>;
```

## `runtimeReplayRequestExample`

Runtime Replay Request 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeReplayRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayRequestExample: RuntimeReplayRequest;
```

## `runtimeReplayRequestJsonSchema`

Runtime Replay Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeReplayRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayRequestJsonSchema: JsonSchema;
```

## `runtimeReplayRequestSchema`

Runtime Replay Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeReplayRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; checkpointId: z.ZodOptional<z.ZodString>; expectedWorkflowRevision: z.ZodString; expectedProcessHash: z.ZodString; expectedDependencySnapshotRef: z.ZodString; toSequence: z.ZodOptional<z.ZodNumber>; requestedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; requestedAt: string; expectedWorkflowRevision: string; expectedProcessHash: string; expectedDependencySnapshotRef: string; toSequence?: number | undefined; checkpointId?: string | undefined; }, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; requestedAt: string; expectedWorkflowRevision: string; expectedProcessHash: string; expectedDependencySnapshotRef: string; toSequence?: number | undefined; checkpointId?: string | undefined; }>;
```

## `runtimeReplayResultDefinition`

由 `contracts/runtime-replay-schemas` 模块导出的 Runtime Replay Result Definition 常量。

- 种类: 常量
- 导入: `import { runtimeReplayResultDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayResultDefinition: SpecSchemaDefinition<RuntimeReplayResult>;
```

## `runtimeReplayResultExample`

Runtime Replay Result 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeReplayResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayResultExample: RuntimeReplayResult;
```

## `runtimeReplayResultJsonSchema`

Runtime Replay Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeReplayResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayResultJsonSchema: JsonSchema;
```

## `runtimeReplayResultSchema`

Runtime Replay Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeReplayResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeReplayResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeReplayResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeReplayVerificationRequestDefinition`

由 `contracts/runtime-replay-schemas` 模块导出的 Runtime Replay Verification Request Definition 常量。

- 种类: 常量
- 导入: `import { runtimeReplayVerificationRequestDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayVerificationRequestDefinition: SpecSchemaDefinition<RuntimeReplayVerificationRequest>;
```

## `runtimeReplayVerificationRequestExample`

Runtime Replay Verification Request 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeReplayVerificationRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayVerificationRequestExample: RuntimeReplayVerificationRequest;
```

## `runtimeReplayVerificationRequestJsonSchema`

Runtime Replay Verification Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeReplayVerificationRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayVerificationRequestJsonSchema: JsonSchema;
```

## `runtimeReplayVerificationRequestSchema`

Runtime Replay Verification Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeReplayVerificationRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayVerificationRequestSchema: z.ZodObject<{ replay: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; checkpointId: z.ZodOptional<z.ZodString>; expectedWorkflowRevision: z.ZodString; expectedProcessHash: z.ZodString; expectedDependencySnapshotRef: z.ZodString; toSequence: z.ZodOptional<z.ZodNumber>; requestedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; requestedAt: string; expectedWorkflowRevision: string; expectedProcessHash: string; expectedDependencySnapshotRef: string; toSequence?: number | undefined; checkpointId?: string | undefined; }, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; requestedAt: string; expectedWorkflowRevision: string; expectedProcessHash: string; expectedDependencySnapshotRef: string; toSequence?: number | undefined; checkpointId?: string | undefined; }>; expectedSnapshotChecksum: z.ZodString; }, "strict", z.ZodTypeAny, { replay: { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; requestedAt: string; expectedWorkflowRevision: string; expectedProcessHash: string; expectedDependencySnapshotRef: string; toSequence?: number | undefined; checkpointId?: string | undefined; }; expectedSnapshotChecksum: string; }, { replay: { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; requestedAt: string; expectedWorkflowRevision: string; expectedProcessHash: string; expectedDependencySnapshotRef: string; toSequence?: number | undefined; checkpointId?: string | undefined; }; expectedSnapshotChecksum: string; }>;
```

## `runtimeReplayVerificationResultDefinition`

由 `contracts/runtime-replay-schemas` 模块导出的 Runtime Replay Verification Result Definition 常量。

- 种类: 常量
- 导入: `import { runtimeReplayVerificationResultDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayVerificationResultDefinition: SpecSchemaDefinition<RuntimeReplayVerificationResult>;
```

## `runtimeReplayVerificationResultExample`

Runtime Replay Verification Result 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeReplayVerificationResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayVerificationResultExample: RuntimeReplayVerificationResult;
```

## `runtimeReplayVerificationResultJsonSchema`

Runtime Replay Verification Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeReplayVerificationResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare const runtimeReplayVerificationResultJsonSchema: JsonSchema;
```

## `runtimeReplayVerificationResultSchema`

Runtime Replay Verification Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeReplayVerificationResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeReplayVerificationResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeReplayVerificationResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `validateRuntimeReplayRequest`

Validate Runtime Replay Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeReplayRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare function validateRuntimeReplayRequest(input: unknown): RuntimeReplayRequest;
```

### 调用签名

```text
validateRuntimeReplayRequest(input: unknown): RuntimeReplayRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeReplayRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeReplayResult`

Validate Runtime Replay Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeReplayResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare function validateRuntimeReplayResult(input: unknown): RuntimeReplayResult;
```

### 调用签名

```text
validateRuntimeReplayResult(input: unknown): RuntimeReplayResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeReplayResult`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeReplayVerificationRequest`

Validate Runtime Replay Verification Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeReplayVerificationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare function validateRuntimeReplayVerificationRequest(input: unknown): RuntimeReplayVerificationRequest;
```

### 调用签名

```text
validateRuntimeReplayVerificationRequest(input: unknown): RuntimeReplayVerificationRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeReplayVerificationRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeReplayVerificationResult`

Validate Runtime Replay Verification Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeReplayVerificationResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)

### 声明

```text
export declare function validateRuntimeReplayVerificationResult(input: unknown): RuntimeReplayVerificationResult;
```

### 调用签名

```text
validateRuntimeReplayVerificationResult(input: unknown): RuntimeReplayVerificationResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeReplayVerificationResult`
- 说明: 返回值契约由上述类型定义。
