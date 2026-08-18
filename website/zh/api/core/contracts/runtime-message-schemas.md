# `@codesoul-co/hypha-core` / `contracts/runtime-message-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-message-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)
- 导出数: **10**

## 模块用法

用于声明并运行时校验契约。Runtime message schemas 模块公开 8 常量、2 函数。

### 从包入口导入

```ts
import {
  runtimeMessageContractDefinitions,
  runtimeMessageContractJsonSchemas,
  runtimeMessageEnvelopeDefinition,
  runtimeMessageEnvelopeExample,
  runtimeMessageEnvelopeInputSchema,
  runtimeMessageEnvelopeJsonSchema,
  runtimeMessageEnvelopeSchema,
  runtimeMessageTypeSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 8 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { runtimeMessageEnvelopeInputSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeMessageEnvelopeInputSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeMessageContractDefinitions` | 常量 | <code>const runtimeMessageContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeMessageEnvelope&lt;unknown&gt;&gt;]</code> | 由 `contracts/runtime-message-schemas` 模块导出的 Runtime Message Contract Definitions 常量。 |
| `runtimeMessageContractJsonSchemas` | 常量 | <code>const runtimeMessageContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-message-schemas` 模块导出的 Runtime Message Contract JSON Schemas 常量。 |
| `runtimeMessageEnvelopeDefinition` | 常量 | <code>const runtimeMessageEnvelopeDefinition: SpecSchemaDefinition&lt;RuntimeMessageEnvelope&lt;unknown&gt;&gt;</code> | 由 `contracts/runtime-message-schemas` 模块导出的 Runtime Message Envelope Definition 常量。 |
| `runtimeMessageEnvelopeExample` | 常量 | <code>const runtimeMessageEnvelopeExample: RuntimeMessageEnvelope&lt;unknown&gt;</code> | Runtime Message Envelope 的有效示例值。 |
| `runtimeMessageEnvelopeInputSchema` | 常量 | <code>const runtimeMessageEnvelopeInputSchema: z.ZodObject&lt;{ payloadHash: z.ZodOptional&lt;z.ZodString&gt;; messageId: z.ZodString; messageType: z.ZodEnum&lt;["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projecti...</code> | Runtime Message Envelope Input 的运行时 Schema。 |
| `runtimeMessageEnvelopeJsonSchema` | 常量 | <code>const runtimeMessageEnvelopeJsonSchema: JsonSchema</code> | Runtime Message Envelope 的 JSON Schema。 |
| `runtimeMessageEnvelopeSchema` | 常量 | <code>const runtimeMessageEnvelopeSchema: z.ZodObject&lt;{ payloadHash: z.ZodString; messageId: z.ZodString; messageType: z.ZodEnum&lt;["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtim...</code> | Runtime Message Envelope 的运行时 Schema。 |
| `runtimeMessageTypeSchema` | 常量 | <code>const runtimeMessageTypeSchema: z.ZodEnum&lt;["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtime.recovery.requested", "runtime.custom"]&gt;</code> | Runtime Message Type 的运行时 Schema。 |
| `validateRuntimeMessageEnvelope` | 函数 | <code>validateRuntimeMessageEnvelope(input: unknown): RuntimeMessageEnvelope</code> | Validate Runtime Message Envelope 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeMessageEnvelopeInput` | 函数 | <code>validateRuntimeMessageEnvelopeInput(input: unknown): RuntimeMessageEnvelopeInput</code> | Validate Runtime Message Envelope Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `runtimeMessageContractDefinitions`

由 `contracts/runtime-message-schemas` 模块导出的 Runtime Message Contract Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeMessageContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### 声明

```text
export declare const runtimeMessageContractDefinitions: readonly [SpecSchemaDefinition<RuntimeMessageEnvelope<unknown>>];
```

## `runtimeMessageContractJsonSchemas`

由 `contracts/runtime-message-schemas` 模块导出的 Runtime Message Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { runtimeMessageContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### 声明

```text
export declare const runtimeMessageContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeMessageEnvelopeDefinition`

由 `contracts/runtime-message-schemas` 模块导出的 Runtime Message Envelope Definition 常量。

- 种类: 常量
- 导入: `import { runtimeMessageEnvelopeDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### 声明

```text
export declare const runtimeMessageEnvelopeDefinition: SpecSchemaDefinition<RuntimeMessageEnvelope<unknown>>;
```

## `runtimeMessageEnvelopeExample`

Runtime Message Envelope 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeMessageEnvelopeExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### 声明

```text
export declare const runtimeMessageEnvelopeExample: RuntimeMessageEnvelope<unknown>;
```

## `runtimeMessageEnvelopeInputSchema`

Runtime Message Envelope Input 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeMessageEnvelopeInputSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeMessageEnvelopeInputSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeMessageEnvelopeInputSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeMessageEnvelopeJsonSchema`

Runtime Message Envelope 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeMessageEnvelopeJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### 声明

```text
export declare const runtimeMessageEnvelopeJsonSchema: JsonSchema;
```

## `runtimeMessageEnvelopeSchema`

Runtime Message Envelope 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeMessageEnvelopeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeMessageEnvelopeSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeMessageEnvelopeSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeMessageTypeSchema`

Runtime Message Type 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeMessageTypeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### 声明

```text
export declare const runtimeMessageTypeSchema: z.ZodEnum<["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtime.recovery.requested", "runtime.custom"]>;
```

## `validateRuntimeMessageEnvelope`

Validate Runtime Message Envelope 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeMessageEnvelope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### 声明

```text
export declare function validateRuntimeMessageEnvelope(input: unknown): RuntimeMessageEnvelope;
```

### 调用签名

```text
validateRuntimeMessageEnvelope(input: unknown): RuntimeMessageEnvelope
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeMessageEnvelope<unknown>`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeMessageEnvelopeInput`

Validate Runtime Message Envelope Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeMessageEnvelopeInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-message-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)

### 声明

```text
export declare function validateRuntimeMessageEnvelopeInput(input: unknown): RuntimeMessageEnvelopeInput;
```

### 调用签名

```text
validateRuntimeMessageEnvelopeInput(input: unknown): RuntimeMessageEnvelopeInput
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeMessageEnvelopeInput<unknown>`
- 说明: 返回值契约由上述类型定义。
