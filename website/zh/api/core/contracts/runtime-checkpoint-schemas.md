# `@codesoul-co/hypha-core` / `contracts/runtime-checkpoint-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-checkpoint-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)
- 导出数: **32**

## 模块用法

用于声明并运行时校验契约。Runtime checkpoint schemas 模块公开 26 常量、6 函数。

### 从包入口导入

```ts
import {
  runtimeCheckpointContractDefinitions,
  runtimeCheckpointContractJsonSchemas,
  runtimeCheckpointCreateCommandDefinition,
  runtimeCheckpointCreateCommandExample,
  runtimeCheckpointCreateCommandJsonSchema,
  runtimeCheckpointCreateCommandSchema,
  runtimeCheckpointCreateResultDefinition,
  runtimeCheckpointCreateResultExample,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 6 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 26 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { runtimeCheckpointCreateCommandSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeCheckpointCreateCommandSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeCheckpointContractDefinitions` | 常量 | <code>const runtimeCheckpointContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeCheckpointPolicySpec&gt;, SpecSchemaDefinition&lt;RuntimeCheckpointRecord&gt;, SpecSchemaDefinition&lt;RuntimeCheckpointCreateCommand&gt;, SpecSchemaDefinition&lt;RuntimeCheckpointCreateResult&gt;, SpecSchemaDefinition&lt;RuntimeCheckpointLoadRequest&gt;, SpecSchemaDefinition&lt;RuntimeCheckpointLoadResult&gt;]</code> | 由 `contracts/runtime-checkpoint-schemas` 模块导出的 Runtime Checkpoint Contract Definitions 常量。 |
| `runtimeCheckpointContractJsonSchemas` | 常量 | <code>const runtimeCheckpointContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-checkpoint-schemas` 模块导出的 Runtime Checkpoint Contract JSON Schemas 常量。 |
| `runtimeCheckpointCreateCommandDefinition` | 常量 | <code>const runtimeCheckpointCreateCommandDefinition: SpecSchemaDefinition&lt;RuntimeCheckpointCreateCommand&gt;</code> | 由 `contracts/runtime-checkpoint-schemas` 模块导出的 Runtime Checkpoint Create Command Definition 常量。 |
| `runtimeCheckpointCreateCommandExample` | 常量 | <code>const runtimeCheckpointCreateCommandExample: RuntimeCheckpointCreateCommand</code> | Runtime Checkpoint Create Command 的有效示例值。 |
| `runtimeCheckpointCreateCommandJsonSchema` | 常量 | <code>const runtimeCheckpointCreateCommandJsonSchema: JsonSchema</code> | Runtime Checkpoint Create Command 的 JSON Schema。 |
| `runtimeCheckpointCreateCommandSchema` | 常量 | <code>const runtimeCheckpointCreateCommandSchema: z.ZodObject&lt;{ checkpointId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string ...</code> | Runtime Checkpoint Create Command 的运行时 Schema。 |
| `runtimeCheckpointCreateResultDefinition` | 常量 | <code>const runtimeCheckpointCreateResultDefinition: SpecSchemaDefinition&lt;RuntimeCheckpointCreateResult&gt;</code> | 由 `contracts/runtime-checkpoint-schemas` 模块导出的 Runtime Checkpoint Create Result Definition 常量。 |
| `runtimeCheckpointCreateResultExample` | 常量 | <code>const runtimeCheckpointCreateResultExample: RuntimeCheckpointCreateResult</code> | Runtime Checkpoint Create Result 的有效示例值。 |
| `runtimeCheckpointCreateResultJsonSchema` | 常量 | <code>const runtimeCheckpointCreateResultJsonSchema: JsonSchema</code> | Runtime Checkpoint Create Result 的 JSON Schema。 |
| `runtimeCheckpointCreateResultSchema` | 常量 | <code>const runtimeCheckpointCreateResultSchema: z.ZodObject&lt;{ checkpointId: z.ZodString; disposition: z.ZodEnum&lt;["applied", "reused", "lease_unavailable"]&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; record: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.Zo...</code> | Runtime Checkpoint Create Result 的运行时 Schema。 |
| `runtimeCheckpointLoadRequestDefinition` | 常量 | <code>const runtimeCheckpointLoadRequestDefinition: SpecSchemaDefinition&lt;RuntimeCheckpointLoadRequest&gt;</code> | 由 `contracts/runtime-checkpoint-schemas` 模块导出的 Runtime Checkpoint Load Request Definition 常量。 |
| `runtimeCheckpointLoadRequestExample` | 常量 | <code>const runtimeCheckpointLoadRequestExample: RuntimeCheckpointLoadRequest</code> | Runtime Checkpoint Load Request 的有效示例值。 |
| `runtimeCheckpointLoadRequestJsonSchema` | 常量 | <code>const runtimeCheckpointLoadRequestJsonSchema: JsonSchema</code> | Runtime Checkpoint Load Request 的 JSON Schema。 |
| `runtimeCheckpointLoadRequestSchema` | 常量 | <code>const runtimeCheckpointLoadRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: strin...</code> | Runtime Checkpoint Load Request 的运行时 Schema。 |
| `runtimeCheckpointLoadResultDefinition` | 常量 | <code>const runtimeCheckpointLoadResultDefinition: SpecSchemaDefinition&lt;RuntimeCheckpointLoadResult&gt;</code> | 由 `contracts/runtime-checkpoint-schemas` 模块导出的 Runtime Checkpoint Load Result Definition 常量。 |
| `runtimeCheckpointLoadResultExample` | 常量 | <code>const runtimeCheckpointLoadResultExample: RuntimeCheckpointLoadResult</code> | Runtime Checkpoint Load Result 的有效示例值。 |
| `runtimeCheckpointLoadResultJsonSchema` | 常量 | <code>const runtimeCheckpointLoadResultJsonSchema: JsonSchema</code> | Runtime Checkpoint Load Result 的 JSON Schema。 |
| `runtimeCheckpointLoadResultSchema` | 常量 | <code>const runtimeCheckpointLoadResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: st...</code> | Runtime Checkpoint Load Result 的运行时 Schema。 |
| `runtimeCheckpointPolicySpecDefinition` | 常量 | <code>const runtimeCheckpointPolicySpecDefinition: SpecSchemaDefinition&lt;RuntimeCheckpointPolicySpec&gt;</code> | Runtime Checkpoint Policy Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `runtimeCheckpointPolicySpecExample` | 常量 | <code>const runtimeCheckpointPolicySpecExample: RuntimeCheckpointPolicySpec</code> | Runtime Checkpoint Policy Spec 的有效示例值。 |
| `runtimeCheckpointPolicySpecJsonSchema` | 常量 | <code>const runtimeCheckpointPolicySpecJsonSchema: JsonSchema</code> | Runtime Checkpoint Policy Spec 的 JSON Schema。 |
| `runtimeCheckpointPolicySpecSchema` | 常量 | <code>const runtimeCheckpointPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ mode: z.ZodEnum&lt;["none", "state_boundary", "every_n_events", "wait_boundary", "custom"]&gt;; everyNEvents: z.ZodOptional&lt;z.ZodNumber&gt;; retainLast: z.ZodOptional&lt;z.ZodNumber&gt;; persistWorkspaceSnapshot: z.ZodOptional&lt;z.ZodBoolean&gt;; persistContextRefs: z.ZodOptional&lt;z.ZodBoolean&gt;; compression: z.ZodOptional&lt;z.ZodEnum&lt;["none", "gzip", "zstd"]&gt;&gt;; }, "stri...</code> | Runtime Checkpoint Policy Spec 的运行时 Schema。 |
| `runtimeCheckpointRecordDefinition` | 常量 | <code>const runtimeCheckpointRecordDefinition: SpecSchemaDefinition&lt;RuntimeCheckpointRecord&gt;</code> | 由 `contracts/runtime-checkpoint-schemas` 模块导出的 Runtime Checkpoint Record Definition 常量。 |
| `runtimeCheckpointRecordExample` | 常量 | <code>const runtimeCheckpointRecordExample: RuntimeCheckpointRecord</code> | Runtime Checkpoint Record 的有效示例值。 |
| `runtimeCheckpointRecordJsonSchema` | 常量 | <code>const runtimeCheckpointRecordJsonSchema: JsonSchema</code> | Runtime Checkpoint Record 的 JSON Schema。 |
| `runtimeCheckpointRecordSchema` | 常量 | <code>const runtimeCheckpointRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; un...</code> | Runtime Checkpoint Record 的运行时 Schema。 |
| `validateRuntimeCheckpointCreateCommand` | 函数 | <code>validateRuntimeCheckpointCreateCommand(input: unknown): RuntimeCheckpointCreateCommand</code> | Validate Runtime Checkpoint Create Command 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeCheckpointCreateResult` | 函数 | <code>validateRuntimeCheckpointCreateResult(input: unknown): RuntimeCheckpointCreateResult</code> | Validate Runtime Checkpoint Create Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeCheckpointLoadRequest` | 函数 | <code>validateRuntimeCheckpointLoadRequest(input: unknown): RuntimeCheckpointLoadRequest</code> | Validate Runtime Checkpoint Load Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeCheckpointLoadResult` | 函数 | <code>validateRuntimeCheckpointLoadResult(input: unknown): RuntimeCheckpointLoadResult</code> | Validate Runtime Checkpoint Load Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeCheckpointPolicySpec` | 函数 | <code>validateRuntimeCheckpointPolicySpec(input: unknown): RuntimeCheckpointPolicySpec</code> | Validate Runtime Checkpoint Policy Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeCheckpointRecord` | 函数 | <code>validateRuntimeCheckpointRecord(input: unknown): RuntimeCheckpointRecord</code> | Validate Runtime Checkpoint Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `runtimeCheckpointContractDefinitions`

由 `contracts/runtime-checkpoint-schemas` 模块导出的 Runtime Checkpoint Contract Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeCheckpointContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointContractDefinitions: readonly [SpecSchemaDefinition<RuntimeCheckpointPolicySpec>, SpecSchemaDefinition<RuntimeCheckpointRecord>, SpecSchemaDefinition<RuntimeCheckpointCreateCommand>, SpecSchemaDefinition<RuntimeCheckpointCreateResult>, SpecSchemaDefinition<RuntimeCheckpointLoadRequest>, SpecSchemaDefinition<RuntimeCheckpointLoadResult>];
```

## `runtimeCheckpointContractJsonSchemas`

由 `contracts/runtime-checkpoint-schemas` 模块导出的 Runtime Checkpoint Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { runtimeCheckpointContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeCheckpointCreateCommandDefinition`

由 `contracts/runtime-checkpoint-schemas` 模块导出的 Runtime Checkpoint Create Command Definition 常量。

- 种类: 常量
- 导入: `import { runtimeCheckpointCreateCommandDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointCreateCommandDefinition: SpecSchemaDefinition<RuntimeCheckpointCreateCommand>;
```

## `runtimeCheckpointCreateCommandExample`

Runtime Checkpoint Create Command 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeCheckpointCreateCommandExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointCreateCommandExample: RuntimeCheckpointCreateCommand;
```

## `runtimeCheckpointCreateCommandJsonSchema`

Runtime Checkpoint Create Command 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeCheckpointCreateCommandJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointCreateCommandJsonSchema: JsonSchema;
```

## `runtimeCheckpointCreateCommandSchema`

Runtime Checkpoint Create Command 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCheckpointCreateCommandSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointCreateCommandSchema: z.ZodObject<{ checkpointId: z.ZodString; scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; ownerId: z.ZodString; leaseTtlMs: z.ZodNumber; workflowRevision: z.ZodString; processHash: z.ZodString; variablesHash: z.ZodString; dependencySnapshotRef: z.ZodString; toolContractSnapshotRef: z.ZodOptional<z.ZodString>; workspaceSnapshotRef: z.ZodOptional<z.ZodString>; contextSnapshotRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; reason: z.ZodEnum<["state_boundary", "human_wait", "signal_wait", "timer_wait", "manual", "failure"]>; createdAt: z.ZodString; idempotencyKey: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>>>; }, "strict", z.ZodTypeAny, { reason: "manual" | "state_boundary" | "human_wait" | "signal_wait" | "timer_wait" | "failure"; scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; createdAt: string; checkpointId: string; workflowRevision: string; processHash: string; variablesHash: string; dependencySnapshotRef: string; ownerId: string; leaseTtlMs: number; metadata?: Record<string, RuntimeJsonValue> | undefined; idempotencyKey?: string | undefined; toolContractSnapshotRef?: string | undefined; workspaceSnapshotRef?: string | undefined; contextSnapshotRefs?: string[] | undefined; }, { reason: "manual" | "state_boundary" | "human_wait" | "signal_wait" | "timer_wait" | "failure"; scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; createdAt: string; checkpointId: string; workflowRevision: string; processHash: string; variablesHash: string; dependencySnapshotRef: string; ownerId: string; leaseTtlMs: number; metadata?: Record<string, RuntimeJsonValue> | undefined; idempotencyKey?: string | undefined; toolContractSnapshotRef?: string | undefined; workspaceSnapshotRef?: string | undefined; contextSnapshotRefs?: string[] | undefined; }>;
```

## `runtimeCheckpointCreateResultDefinition`

由 `contracts/runtime-checkpoint-schemas` 模块导出的 Runtime Checkpoint Create Result Definition 常量。

- 种类: 常量
- 导入: `import { runtimeCheckpointCreateResultDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointCreateResultDefinition: SpecSchemaDefinition<RuntimeCheckpointCreateResult>;
```

## `runtimeCheckpointCreateResultExample`

Runtime Checkpoint Create Result 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeCheckpointCreateResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointCreateResultExample: RuntimeCheckpointCreateResult;
```

## `runtimeCheckpointCreateResultJsonSchema`

Runtime Checkpoint Create Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeCheckpointCreateResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointCreateResultJsonSchema: JsonSchema;
```

## `runtimeCheckpointCreateResultSchema`

Runtime Checkpoint Create Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCheckpointCreateResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeCheckpointCreateResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeCheckpointCreateResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeCheckpointLoadRequestDefinition`

由 `contracts/runtime-checkpoint-schemas` 模块导出的 Runtime Checkpoint Load Request Definition 常量。

- 种类: 常量
- 导入: `import { runtimeCheckpointLoadRequestDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointLoadRequestDefinition: SpecSchemaDefinition<RuntimeCheckpointLoadRequest>;
```

## `runtimeCheckpointLoadRequestExample`

Runtime Checkpoint Load Request 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeCheckpointLoadRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointLoadRequestExample: RuntimeCheckpointLoadRequest;
```

## `runtimeCheckpointLoadRequestJsonSchema`

Runtime Checkpoint Load Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeCheckpointLoadRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointLoadRequestJsonSchema: JsonSchema;
```

## `runtimeCheckpointLoadRequestSchema`

Runtime Checkpoint Load Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCheckpointLoadRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointLoadRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; checkpointId: z.ZodOptional<z.ZodString>; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; checkedAt: string; checkpointId?: string | undefined; }, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; checkedAt: string; checkpointId?: string | undefined; }>;
```

## `runtimeCheckpointLoadResultDefinition`

由 `contracts/runtime-checkpoint-schemas` 模块导出的 Runtime Checkpoint Load Result Definition 常量。

- 种类: 常量
- 导入: `import { runtimeCheckpointLoadResultDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointLoadResultDefinition: SpecSchemaDefinition<RuntimeCheckpointLoadResult>;
```

## `runtimeCheckpointLoadResultExample`

Runtime Checkpoint Load Result 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeCheckpointLoadResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointLoadResultExample: RuntimeCheckpointLoadResult;
```

## `runtimeCheckpointLoadResultJsonSchema`

Runtime Checkpoint Load Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeCheckpointLoadResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointLoadResultJsonSchema: JsonSchema;
```

## `runtimeCheckpointLoadResultSchema`

Runtime Checkpoint Load Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCheckpointLoadResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeCheckpointLoadResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeCheckpointLoadResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeCheckpointPolicySpecDefinition`

Runtime Checkpoint Policy Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeCheckpointPolicySpecDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointPolicySpecDefinition: SpecSchemaDefinition<RuntimeCheckpointPolicySpec>;
```

## `runtimeCheckpointPolicySpecExample`

Runtime Checkpoint Policy Spec 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeCheckpointPolicySpecExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointPolicySpecExample: RuntimeCheckpointPolicySpec;
```

## `runtimeCheckpointPolicySpecJsonSchema`

Runtime Checkpoint Policy Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeCheckpointPolicySpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointPolicySpecJsonSchema: JsonSchema;
```

## `runtimeCheckpointPolicySpecSchema`

Runtime Checkpoint Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCheckpointPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointPolicySpecSchema: z.ZodEffects<z.ZodObject<{ mode: z.ZodEnum<["none", "state_boundary", "every_n_events", "wait_boundary", "custom"]>; everyNEvents: z.ZodOptional<z.ZodNumber>; retainLast: z.ZodOptional<z.ZodNumber>; persistWorkspaceSnapshot: z.ZodOptional<z.ZodBoolean>; persistContextRefs: z.ZodOptional<z.ZodBoolean>; compression: z.ZodOptional<z.ZodEnum<["none", "gzip", "zstd"]>>; }, "strict", z.ZodTypeAny, { mode: "custom" | "state_boundary" | "none" | "every_n_events" | "wait_boundary"; everyNEvents?: number | undefined; retainLast?: number | undefined; persistWorkspaceSnapshot?: boolean | undefined; persistContextRefs?: boolean | undefined; compression?: "none" | "gzip" | "zstd" | undefined; }, { mode: "custom" | "state_boundary" | "none" | "every_n_events" | "wait_boundary"; everyNEvents?: number | undefined; retainLast?: number | undefined; persistWorkspaceSnapshot?: boolean | undefined; persistContextRefs?: boolean | undefined; compression?: "none" | "gzip" | "zstd" | undefined; }>, { mode: "custom" | "state_boundary" | "none" | "every_n_events" | "wait_boundary"; everyNEvents?: number | undefined; retainLast?: number | undefined; persistWorkspaceSnapshot?: boolean | undefined; persistContextRefs?: boolean | undefined; compression?: "none" | "gzip" | "zstd" | undefined; }, { mode: "custom" | "state_boundary" | "none" | "every_n_events" | "wait_boundary"; everyNEvents?: number | undefined; retainLast?: number | undefined; persistWorkspaceSnapshot?: boolean | undefined; persistContextRefs?: boolean | undefined; compression?: "none" | "gzip" | "zstd" | undefined; }>;
```

## `runtimeCheckpointRecordDefinition`

由 `contracts/runtime-checkpoint-schemas` 模块导出的 Runtime Checkpoint Record Definition 常量。

- 种类: 常量
- 导入: `import { runtimeCheckpointRecordDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointRecordDefinition: SpecSchemaDefinition<RuntimeCheckpointRecord>;
```

## `runtimeCheckpointRecordExample`

Runtime Checkpoint Record 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeCheckpointRecordExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointRecordExample: RuntimeCheckpointRecord;
```

## `runtimeCheckpointRecordJsonSchema`

Runtime Checkpoint Record 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeCheckpointRecordJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare const runtimeCheckpointRecordJsonSchema: JsonSchema;
```

## `runtimeCheckpointRecordSchema`

Runtime Checkpoint Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCheckpointRecordSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeCheckpointRecordSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeCheckpointRecordSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `validateRuntimeCheckpointCreateCommand`

Validate Runtime Checkpoint Create Command 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeCheckpointCreateCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare function validateRuntimeCheckpointCreateCommand(input: unknown): RuntimeCheckpointCreateCommand;
```

### 调用签名

```text
validateRuntimeCheckpointCreateCommand(input: unknown): RuntimeCheckpointCreateCommand
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeCheckpointCreateCommand`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeCheckpointCreateResult`

Validate Runtime Checkpoint Create Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeCheckpointCreateResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare function validateRuntimeCheckpointCreateResult(input: unknown): RuntimeCheckpointCreateResult;
```

### 调用签名

```text
validateRuntimeCheckpointCreateResult(input: unknown): RuntimeCheckpointCreateResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeCheckpointCreateResult`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeCheckpointLoadRequest`

Validate Runtime Checkpoint Load Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeCheckpointLoadRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare function validateRuntimeCheckpointLoadRequest(input: unknown): RuntimeCheckpointLoadRequest;
```

### 调用签名

```text
validateRuntimeCheckpointLoadRequest(input: unknown): RuntimeCheckpointLoadRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeCheckpointLoadRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeCheckpointLoadResult`

Validate Runtime Checkpoint Load Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeCheckpointLoadResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare function validateRuntimeCheckpointLoadResult(input: unknown): RuntimeCheckpointLoadResult;
```

### 调用签名

```text
validateRuntimeCheckpointLoadResult(input: unknown): RuntimeCheckpointLoadResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeCheckpointLoadResult`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeCheckpointPolicySpec`

Validate Runtime Checkpoint Policy Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeCheckpointPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare function validateRuntimeCheckpointPolicySpec(input: unknown): RuntimeCheckpointPolicySpec;
```

### 调用签名

```text
validateRuntimeCheckpointPolicySpec(input: unknown): RuntimeCheckpointPolicySpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeCheckpointPolicySpec`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeCheckpointRecord`

Validate Runtime Checkpoint Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeCheckpointRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### 声明

```text
export declare function validateRuntimeCheckpointRecord(input: unknown): RuntimeCheckpointRecord;
```

### 调用签名

```text
validateRuntimeCheckpointRecord(input: unknown): RuntimeCheckpointRecord
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeCheckpointRecord`
- 说明: 返回值契约由上述类型定义。
