# `@codesoul-co/hypha-core` / `contracts/runtime-control-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-control-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)
- 导出数: **15**

## 模块用法

用于声明并运行时校验契约。Runtime control schemas 模块公开 13 常量、2 函数。

### 从包入口导入

```ts
import {
  runtimeControlContractDefinitions,
  runtimeControlContractJsonSchemas,
  runtimePauseCommandSchema,
  runtimeResumeCommandSchema,
  runtimeRunControlCommandDefinition,
  runtimeRunControlCommandExample,
  runtimeRunControlCommandJsonSchema,
  runtimeRunControlCommandSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 13 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { runtimePauseCommandSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimePauseCommandSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeControlContractDefinitions` | 常量 | <code>const runtimeControlContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeRunControlCommand&gt;, SpecSchemaDefinition&lt;RuntimeRunControlResult&gt;]</code> | 由 `contracts/runtime-control-schemas` 模块导出的 Runtime Control Contract Definitions 常量。 |
| `runtimeControlContractJsonSchemas` | 常量 | <code>const runtimeControlContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-control-schemas` 模块导出的 Runtime Control Contract JSON Schemas 常量。 |
| `runtimePauseCommandSchema` | 常量 | <code>const runtimePauseCommandSchema: z.ZodObject&lt;{ kind: z.ZodLiteral&lt;"pause"&gt;; reason: z.ZodString; resumeKey: z.ZodOptional&lt;z.ZodString&gt;; requestedAt: z.ZodString; commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { ...</code> | Runtime Pause Command 的运行时 Schema。 |
| `runtimeResumeCommandSchema` | 常量 | <code>const runtimeResumeCommandSchema: z.ZodObject&lt;{ kind: z.ZodLiteral&lt;"resume"&gt;; key: z.ZodOptional&lt;z.ZodString&gt;; payload: z.ZodOptional&lt;z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;&gt;; requestedAt: z.ZodString; commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentI...</code> | Runtime Resume Command 的运行时 Schema。 |
| `runtimeRunControlCommandDefinition` | 常量 | <code>const runtimeRunControlCommandDefinition: SpecSchemaDefinition&lt;RuntimeRunControlCommand&gt;</code> | 由 `contracts/runtime-control-schemas` 模块导出的 Runtime Run Control Command Definition 常量。 |
| `runtimeRunControlCommandExample` | 常量 | <code>const runtimeRunControlCommandExample: RuntimeRunControlCommand</code> | Runtime Run Control Command 的有效示例值。 |
| `runtimeRunControlCommandJsonSchema` | 常量 | <code>const runtimeRunControlCommandJsonSchema: JsonSchema</code> | Runtime Run Control Command 的 JSON Schema。 |
| `runtimeRunControlCommandSchema` | 常量 | <code>const runtimeRunControlCommandSchema: z.ZodDiscriminatedUnion&lt;"kind", [z.ZodObject&lt;{ kind: z.ZodLiteral&lt;"pause"&gt;; reason: z.ZodString; resumeKey: z.ZodOptional&lt;z.ZodString&gt;; requestedAt: z.ZodString; commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.Zod...</code> | Runtime Run Control Command 的运行时 Schema。 |
| `runtimeRunControlResultDefinition` | 常量 | <code>const runtimeRunControlResultDefinition: SpecSchemaDefinition&lt;RuntimeRunControlResult&gt;</code> | 由 `contracts/runtime-control-schemas` 模块导出的 Runtime Run Control Result Definition 常量。 |
| `runtimeRunControlResultExample` | 常量 | <code>const runtimeRunControlResultExample: RuntimeRunControlResult</code> | Runtime Run Control Result 的有效示例值。 |
| `runtimeRunControlResultJsonSchema` | 常量 | <code>const runtimeRunControlResultJsonSchema: JsonSchema</code> | Runtime Run Control Result 的 JSON Schema。 |
| `runtimeRunControlResultSchema` | 常量 | <code>const runtimeRunControlResultSchema: z.ZodObject&lt;{ commandId: z.ZodString; kind: z.ZodEnum&lt;["pause", "resume", "signal"]&gt;; disposition: z.ZodEnum&lt;["applied", "reused", "lease_unavailable"]&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; runRevision: z.ZodNumber; projection: z.ZodEffects&lt;z.ZodObject&lt;{ runId: z.ZodString; runStatus: z.ZodEnum&lt;[import("./runtime-projection").RuntimeOrchestrationRunStatus, ...import("./r...</code> | Runtime Run Control Result 的运行时 Schema。 |
| `runtimeSignalCommandSchema` | 常量 | <code>const runtimeSignalCommandSchema: z.ZodObject&lt;{ kind: z.ZodLiteral&lt;"signal"&gt;; key: z.ZodString; payload: z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;; sentAt: z.ZodString; commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "...</code> | Runtime Signal Command 的运行时 Schema。 |
| `validateRuntimeRunControlCommand` | 函数 | <code>validateRuntimeRunControlCommand(input: unknown): RuntimeRunControlCommand</code> | Validate Runtime Run Control Command 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeRunControlResult` | 函数 | <code>validateRuntimeRunControlResult(input: unknown): RuntimeRunControlResult</code> | Validate Runtime Run Control Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `runtimeControlContractDefinitions`

由 `contracts/runtime-control-schemas` 模块导出的 Runtime Control Contract Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeControlContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### 声明

```text
export declare const runtimeControlContractDefinitions: readonly [SpecSchemaDefinition<RuntimeRunControlCommand>, SpecSchemaDefinition<RuntimeRunControlResult>];
```

## `runtimeControlContractJsonSchemas`

由 `contracts/runtime-control-schemas` 模块导出的 Runtime Control Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { runtimeControlContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### 声明

```text
export declare const runtimeControlContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimePauseCommandSchema`

Runtime Pause Command 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimePauseCommandSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimePauseCommandSchema: (typeof import('@codesoul-co/hypha-core'))['runtimePauseCommandSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeResumeCommandSchema`

Runtime Resume Command 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeResumeCommandSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeResumeCommandSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeResumeCommandSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeRunControlCommandDefinition`

由 `contracts/runtime-control-schemas` 模块导出的 Runtime Run Control Command Definition 常量。

- 种类: 常量
- 导入: `import { runtimeRunControlCommandDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### 声明

```text
export declare const runtimeRunControlCommandDefinition: SpecSchemaDefinition<RuntimeRunControlCommand>;
```

## `runtimeRunControlCommandExample`

Runtime Run Control Command 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeRunControlCommandExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### 声明

```text
export declare const runtimeRunControlCommandExample: RuntimeRunControlCommand;
```

## `runtimeRunControlCommandJsonSchema`

Runtime Run Control Command 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeRunControlCommandJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### 声明

```text
export declare const runtimeRunControlCommandJsonSchema: JsonSchema;
```

## `runtimeRunControlCommandSchema`

Runtime Run Control Command 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeRunControlCommandSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeRunControlCommandSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRunControlCommandSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeRunControlResultDefinition`

由 `contracts/runtime-control-schemas` 模块导出的 Runtime Run Control Result Definition 常量。

- 种类: 常量
- 导入: `import { runtimeRunControlResultDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### 声明

```text
export declare const runtimeRunControlResultDefinition: SpecSchemaDefinition<RuntimeRunControlResult>;
```

## `runtimeRunControlResultExample`

Runtime Run Control Result 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeRunControlResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### 声明

```text
export declare const runtimeRunControlResultExample: RuntimeRunControlResult;
```

## `runtimeRunControlResultJsonSchema`

Runtime Run Control Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeRunControlResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### 声明

```text
export declare const runtimeRunControlResultJsonSchema: JsonSchema;
```

## `runtimeRunControlResultSchema`

Runtime Run Control Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeRunControlResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeRunControlResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRunControlResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeSignalCommandSchema`

Runtime Signal Command 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeSignalCommandSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeSignalCommandSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeSignalCommandSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `validateRuntimeRunControlCommand`

Validate Runtime Run Control Command 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeRunControlCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### 声明

```text
export declare function validateRuntimeRunControlCommand(input: unknown): RuntimeRunControlCommand;
```

### 调用签名

```text
validateRuntimeRunControlCommand(input: unknown): RuntimeRunControlCommand
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeRunControlCommand`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeRunControlResult`

Validate Runtime Run Control Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeRunControlResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### 声明

```text
export declare function validateRuntimeRunControlResult(input: unknown): RuntimeRunControlResult;
```

### 调用签名

```text
validateRuntimeRunControlResult(input: unknown): RuntimeRunControlResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeRunControlResult`
- 说明: 返回值契约由上述类型定义。
