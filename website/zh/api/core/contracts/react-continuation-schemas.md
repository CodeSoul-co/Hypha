# `@codesoul-co/hypha-core` / `contracts/react-continuation-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/react-continuation-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)
- 导出数: **12**

## 模块用法

用于声明并运行时校验契约。React continuation schemas 模块公开 10 常量、2 函数。

### 从包入口导入

```ts
import {
  continueReActCommandPayloadDefinition,
  continueReActCommandPayloadV1Example,
  continueReActCommandPayloadV1JsonSchema,
  continueReActCommandPayloadV1Schema,
  reActContinuationContractDefinitions,
  reActContinuationContractJsonSchemas,
  reActQuantumDescriptorDefinition,
  reActQuantumDescriptorExample,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 10 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { continueReActCommandPayloadV1Schema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = continueReActCommandPayloadV1Schema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `continueReActCommandPayloadDefinition` | 常量 | <code>const continueReActCommandPayloadDefinition: SpecSchemaDefinition&lt;ContinueReActCommandPayloadV1&gt;</code> | 由 `contracts/react-continuation-schemas` 模块导出的 Continue ReAct Command Payload Definition 常量。 |
| `continueReActCommandPayloadV1Example` | 常量 | <code>const continueReActCommandPayloadV1Example: ContinueReActCommandPayloadV1</code> | Continue ReAct Command Payload V1 的有效示例值。 |
| `continueReActCommandPayloadV1JsonSchema` | 常量 | <code>const continueReActCommandPayloadV1JsonSchema: JsonSchema</code> | Continue ReAct Command Payload V1 的 JSON Schema。 |
| `continueReActCommandPayloadV1Schema` | 常量 | <code>const continueReActCommandPayloadV1Schema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; runId: z.ZodString; sessionId: z.ZodString; userId: z.ZodString; stepId: z.ZodString; checkpointRef: z.ZodString; checkpointHash: z.ZodString; checkpointSequence: z.ZodNumber; scopeHash: z.ZodString; agentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict",...</code> | Continue ReAct Command Payload V1 的运行时 Schema。 |
| `reActContinuationContractDefinitions` | 常量 | <code>const reActContinuationContractDefinitions: readonly [SpecSchemaDefinition&lt;ContinueReActCommandPayloadV1&gt;, SpecSchemaDefinition&lt;ReActQuantumDescriptor&gt;]</code> | 由 `contracts/react-continuation-schemas` 模块导出的 Re Act Continuation Contract Definitions 常量。 |
| `reActContinuationContractJsonSchemas` | 常量 | <code>const reActContinuationContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/react-continuation-schemas` 模块导出的 Re Act Continuation Contract JSON Schemas 常量。 |
| `reActQuantumDescriptorDefinition` | 常量 | <code>const reActQuantumDescriptorDefinition: SpecSchemaDefinition&lt;ReActQuantumDescriptor&gt;</code> | 由 `contracts/react-continuation-schemas` 模块导出的 Re Act Quantum Descriptor Definition 常量。 |
| `reActQuantumDescriptorExample` | 常量 | <code>const reActQuantumDescriptorExample: ReActQuantumDescriptor</code> | Re Act Quantum Descriptor 的有效示例值。 |
| `reActQuantumDescriptorJsonSchema` | 常量 | <code>const reActQuantumDescriptorJsonSchema: JsonSchema</code> | Re Act Quantum Descriptor 的 JSON Schema。 |
| `reActQuantumDescriptorSchema` | 常量 | <code>const reActQuantumDescriptorSchema: z.ZodDiscriminatedUnion&lt;"trigger", [z.ZodObject&lt;{ trigger: z.ZodLiteral&lt;"initial"&gt;; version: z.ZodLiteral&lt;"1.0.0"&gt;; runId: z.ZodString; sessionId: z.ZodString; userId: z.ZodString; stepId: z.ZodString; scopeHash: z.ZodString; agentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { id: string...</code> | Re Act Quantum Descriptor 的运行时 Schema。 |
| `validateContinueReActCommandPayload` | 函数 | <code>validateContinueReActCommandPayload(input: unknown): ContinueReActCommandPayloadV1</code> | Validate Continue ReAct Command Payload 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateReActQuantumDescriptor` | 函数 | <code>validateReActQuantumDescriptor(input: unknown): ReActQuantumDescriptor</code> | Validate ReAct Quantum Descriptor 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `continueReActCommandPayloadDefinition`

由 `contracts/react-continuation-schemas` 模块导出的 Continue ReAct Command Payload Definition 常量。

- 种类: 常量
- 导入: `import { continueReActCommandPayloadDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### 声明

```text
export declare const continueReActCommandPayloadDefinition: SpecSchemaDefinition<ContinueReActCommandPayloadV1>;
```

## `continueReActCommandPayloadV1Example`

Continue ReAct Command Payload V1 的有效示例值。

- 种类: 常量
- 导入: `import { continueReActCommandPayloadV1Example } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### 声明

```text
export declare const continueReActCommandPayloadV1Example: ContinueReActCommandPayloadV1;
```

## `continueReActCommandPayloadV1JsonSchema`

Continue ReAct Command Payload V1 的 JSON Schema。

- 种类: 常量
- 导入: `import { continueReActCommandPayloadV1JsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### 声明

```text
export declare const continueReActCommandPayloadV1JsonSchema: JsonSchema;
```

## `continueReActCommandPayloadV1Schema`

Continue ReAct Command Payload V1 的运行时 Schema。

- 种类: 常量
- 导入: `import { continueReActCommandPayloadV1Schema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### 声明

```text
export declare const continueReActCommandPayloadV1Schema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; runId: z.ZodString; sessionId: z.ZodString; userId: z.ZodString; stepId: z.ZodString; checkpointRef: z.ZodString; checkpointHash: z.ZodString; checkpointSequence: z.ZodNumber; scopeHash: z.ZodString; agentRef: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>; domainPackRef: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>; workflowRef: z.ZodOptional<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>>; promptSnapshotRef: z.ZodString; promptSnapshotHash: z.ZodString; capabilitySnapshotRef: z.ZodString; capabilitySnapshotHash: z.ZodString; memoryContextRef: z.ZodOptional<z.ZodString>; workspaceRef: z.ZodOptional<z.ZodString>; executionRef: z.ZodOptional<z.ZodString>; pendingOperationReceipts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; globalBudget: z.ZodObject<{ iterations: z.ZodNumber; modelCalls: z.ZodNumber; toolCalls: z.ZodNumber; totalTokens: z.ZodNumber; }, "strict", z.ZodTypeAny, { iterations: number; modelCalls: number; toolCalls: number; totalTokens: number; }, { iterations: number; modelCalls: number; toolCalls: number; totalTokens: number; }>; deadlineAt: z.ZodOptional<z.ZodString>; cancellationRevision: z.ZodNumber; createdAt: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; runId: string; version: "1.0.0"; createdAt: string; stepId: string; checkpointSequence: number; checkpointRef: string; domainPackRef: { id: string; revision?: string | undefined; version?: string | undefined; }; scopeHash: string; checkpointHash: string; agentRef: { id: string; revision?: string | undefined; version?: string | undefined; }; promptSnapshotRef: string; promptSnapshotHash: string; capabilitySnapshotRef: string; capabilitySnapshotHash: string; globalBudget: { iterations: number; modelCalls: number; toolCalls: number; totalTokens: number; }; cancellationRevision: number; deadlineAt?: string | undefined; workflowRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; memoryContextRef?: string | undefined; workspaceRef?: string | undefined; executionRef?: string | undefined; pendingOperationReceipts?: string[] | undefined; }, { userId: string; sessionId: string; runId: string; version: "1.0.0"; createdAt: string; stepId: string; checkpointSequence: number; checkpointRef: string; domainPackRef: { id: string; revision?: string | undefined; version?: string | undefined; }; scopeHash: string; checkpointHash: string; agentRef: { id: string; revision?: string | undefined; version?: string | undefined; }; promptSnapshotRef: string; promptSnapshotHash: string; capabilitySnapshotRef: string; capabilitySnapshotHash: string; globalBudget: { iterations: number; modelCalls: number; toolCalls: number; totalTokens: number; }; cancellationRevision: number; deadlineAt?: string | undefined; workflowRef?: { id: string; revision?: string | undefined; version?: string | undefined; } | undefined; memoryContextRef?: string | undefined; workspaceRef?: string | undefined; executionRef?: string | undefined; pendingOperationReceipts?: string[] | undefined; }>;
```

## `reActContinuationContractDefinitions`

由 `contracts/react-continuation-schemas` 模块导出的 Re Act Continuation Contract Definitions 常量。

- 种类: 常量
- 导入: `import { reActContinuationContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### 声明

```text
export declare const reActContinuationContractDefinitions: readonly [SpecSchemaDefinition<ContinueReActCommandPayloadV1>, SpecSchemaDefinition<ReActQuantumDescriptor>];
```

## `reActContinuationContractJsonSchemas`

由 `contracts/react-continuation-schemas` 模块导出的 Re Act Continuation Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { reActContinuationContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### 声明

```text
export declare const reActContinuationContractJsonSchemas: Record<string, JsonSchema>;
```

## `reActQuantumDescriptorDefinition`

由 `contracts/react-continuation-schemas` 模块导出的 Re Act Quantum Descriptor Definition 常量。

- 种类: 常量
- 导入: `import { reActQuantumDescriptorDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### 声明

```text
export declare const reActQuantumDescriptorDefinition: SpecSchemaDefinition<ReActQuantumDescriptor>;
```

## `reActQuantumDescriptorExample`

Re Act Quantum Descriptor 的有效示例值。

- 种类: 常量
- 导入: `import { reActQuantumDescriptorExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### 声明

```text
export declare const reActQuantumDescriptorExample: ReActQuantumDescriptor;
```

## `reActQuantumDescriptorJsonSchema`

Re Act Quantum Descriptor 的 JSON Schema。

- 种类: 常量
- 导入: `import { reActQuantumDescriptorJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### 声明

```text
export declare const reActQuantumDescriptorJsonSchema: JsonSchema;
```

## `reActQuantumDescriptorSchema`

Re Act Quantum Descriptor 的运行时 Schema。

- 种类: 常量
- 导入: `import { reActQuantumDescriptorSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const reActQuantumDescriptorSchema: (typeof import('@codesoul-co/hypha-core'))['reActQuantumDescriptorSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `validateContinueReActCommandPayload`

Validate Continue ReAct Command Payload 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateContinueReActCommandPayload } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### 声明

```text
export declare function validateContinueReActCommandPayload(input: unknown): ContinueReActCommandPayloadV1;
```

### 调用签名

```text
validateContinueReActCommandPayload(input: unknown): ContinueReActCommandPayloadV1
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ContinueReActCommandPayloadV1`
- 说明: 返回值契约由上述类型定义。

## `validateReActQuantumDescriptor`

Validate ReAct Quantum Descriptor 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateReActQuantumDescriptor } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)

### 声明

```text
export declare function validateReActQuantumDescriptor(input: unknown): ReActQuantumDescriptor;
```

### 调用签名

```text
validateReActQuantumDescriptor(input: unknown): ReActQuantumDescriptor
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ReActQuantumDescriptor`
- 说明: 返回值契约由上述类型定义。
