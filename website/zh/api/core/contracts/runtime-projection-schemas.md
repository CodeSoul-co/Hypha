# `@codesoul-co/hypha-core` / `contracts/runtime-projection-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-projection-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)
- 导出数: **8**

## 模块用法

用于声明并运行时校验契约。Runtime projection schemas 模块公开 7 常量、1 函数。

### 从包入口导入

```ts
import {
  runtimeOrchestrationProjectionDefinition,
  runtimeOrchestrationProjectionExample,
  runtimeOrchestrationProjectionJsonSchema,
  runtimeOrchestrationProjectionSchema,
  runtimeOrchestrationRunStatusSchema,
  runtimeProjectionContractDefinitions,
  runtimeProjectionContractJsonSchemas,
  validateRuntimeOrchestrationProjection,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 7 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { runtimeOrchestrationProjectionSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeOrchestrationProjectionSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeOrchestrationProjectionDefinition` | 常量 | <code>const runtimeOrchestrationProjectionDefinition: SpecSchemaDefinition&lt;RuntimeOrchestrationProjection&gt;</code> | 由 `contracts/runtime-projection-schemas` 模块导出的 Runtime Orchestration Projection Definition 常量。 |
| `runtimeOrchestrationProjectionExample` | 常量 | <code>const runtimeOrchestrationProjectionExample: RuntimeOrchestrationProjection</code> | Runtime Orchestration Projection 的有效示例值。 |
| `runtimeOrchestrationProjectionJsonSchema` | 常量 | <code>const runtimeOrchestrationProjectionJsonSchema: JsonSchema</code> | Runtime Orchestration Projection 的 JSON Schema。 |
| `runtimeOrchestrationProjectionSchema` | 常量 | <code>const runtimeOrchestrationProjectionSchema: z.ZodEffects&lt;z.ZodObject&lt;{ runId: z.ZodString; runStatus: z.ZodEnum&lt;[RuntimeOrchestrationRunStatus, ...RuntimeOrchestrationRunStatus[]]&gt;; currentState: z.ZodOptional&lt;z.ZodString&gt;; terminalState: z.ZodOptional&lt;z.ZodString&gt;; statePath: z.ZodArray&lt;z.ZodString, "many"&gt;; stateVisitCounts: z.ZodRecord&lt;z.ZodString, z.ZodNumber&gt;; stateAttempt: z.ZodNumber; pendingTransition: z.Z...</code> | Runtime Orchestration Projection 的运行时 Schema。 |
| `runtimeOrchestrationRunStatusSchema` | 常量 | <code>const runtimeOrchestrationRunStatusSchema: z.ZodEnum&lt;[RuntimeOrchestrationRunStatus, ...RuntimeOrchestrationRunStatus[]]&gt;</code> | Runtime Orchestration Run Status 的运行时 Schema。 |
| `runtimeProjectionContractDefinitions` | 常量 | <code>const runtimeProjectionContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeOrchestrationProjection&gt;]</code> | 由 `contracts/runtime-projection-schemas` 模块导出的 Runtime Projection Contract Definitions 常量。 |
| `runtimeProjectionContractJsonSchemas` | 常量 | <code>const runtimeProjectionContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-projection-schemas` 模块导出的 Runtime Projection Contract JSON Schemas 常量。 |
| `validateRuntimeOrchestrationProjection` | 函数 | <code>validateRuntimeOrchestrationProjection(input: unknown): RuntimeOrchestrationProjection</code> | Validate Runtime Orchestration Projection 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `runtimeOrchestrationProjectionDefinition`

由 `contracts/runtime-projection-schemas` 模块导出的 Runtime Orchestration Projection Definition 常量。

- 种类: 常量
- 导入: `import { runtimeOrchestrationProjectionDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### 声明

```text
export declare const runtimeOrchestrationProjectionDefinition: SpecSchemaDefinition<RuntimeOrchestrationProjection>;
```

## `runtimeOrchestrationProjectionExample`

Runtime Orchestration Projection 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeOrchestrationProjectionExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### 声明

```text
export declare const runtimeOrchestrationProjectionExample: RuntimeOrchestrationProjection;
```

## `runtimeOrchestrationProjectionJsonSchema`

Runtime Orchestration Projection 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeOrchestrationProjectionJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### 声明

```text
export declare const runtimeOrchestrationProjectionJsonSchema: JsonSchema;
```

## `runtimeOrchestrationProjectionSchema`

Runtime Orchestration Projection 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeOrchestrationProjectionSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeOrchestrationProjectionSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeOrchestrationProjectionSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeOrchestrationRunStatusSchema`

Runtime Orchestration Run Status 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeOrchestrationRunStatusSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### 声明

```text
export declare const runtimeOrchestrationRunStatusSchema: z.ZodEnum<[RuntimeOrchestrationRunStatus, ...RuntimeOrchestrationRunStatus[]]>;
```

## `runtimeProjectionContractDefinitions`

由 `contracts/runtime-projection-schemas` 模块导出的 Runtime Projection Contract Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeProjectionContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### 声明

```text
export declare const runtimeProjectionContractDefinitions: readonly [SpecSchemaDefinition<RuntimeOrchestrationProjection>];
```

## `runtimeProjectionContractJsonSchemas`

由 `contracts/runtime-projection-schemas` 模块导出的 Runtime Projection Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { runtimeProjectionContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### 声明

```text
export declare const runtimeProjectionContractJsonSchemas: Record<string, JsonSchema>;
```

## `validateRuntimeOrchestrationProjection`

Validate Runtime Orchestration Projection 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeOrchestrationProjection } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-projection-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)

### 声明

```text
export declare function validateRuntimeOrchestrationProjection(input: unknown): RuntimeOrchestrationProjection;
```

### 调用签名

```text
validateRuntimeOrchestrationProjection(input: unknown): RuntimeOrchestrationProjection
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeOrchestrationProjection`
- 说明: 返回值契约由上述类型定义。
