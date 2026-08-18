# `@codesoul-co/hypha-memory` / `lifecycle-schema`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/lifecycle-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)
- 导出数: **14**

## 模块用法

用于声明并运行时校验契约。Lifecycle schema 模块公开 12 常量、2 函数。

### 从包入口导入

```ts
import {
  memoryExtractionProfileSpecDefinition,
  memoryExtractionProfileSpecExample,
  memoryExtractionProfileSpecJsonSchema,
  memoryExtractionProfileSpecSchema,
  memoryExtractionSourceRefSchema,
  memoryExtractionSourceTypeSchema,
  memoryLifecycleJsonSchemas,
  memoryLifecycleSpecDefinitions,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 12 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { memoryExtractionProfileSpecSchema } from '@codesoul-co/hypha-memory';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = memoryExtractionProfileSpecSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryExtractionProfileSpecDefinition` | 常量 | <code>const memoryExtractionProfileSpecDefinition: SpecSchemaDefinition&lt;MemoryExtractionProfileSpec&gt;</code> | Memory Extraction Profile Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryExtractionProfileSpecExample` | 常量 | <code>const memoryExtractionProfileSpecExample: MemoryExtractionProfileSpec</code> | Memory Extraction Profile Spec 的有效示例值。 |
| `memoryExtractionProfileSpecJsonSchema` | 常量 | <code>const memoryExtractionProfileSpecJsonSchema: JsonSchema</code> | Memory Extraction Profile Spec 的 JSON Schema。 |
| `memoryExtractionProfileSpecSchema` | 常量 | <code>const memoryExtractionProfileSpecSchema: z.ZodType&lt;MemoryExtractionProfileSpec, z.ZodTypeDef, MemoryExtractionProfileSpec&gt;</code> | Memory Extraction Profile Spec 的运行时 Schema。 |
| `memoryExtractionSourceRefSchema` | 常量 | <code>const memoryExtractionSourceRefSchema: z.ZodType&lt;MemoryExtractionSourceRef, z.ZodTypeDef, MemoryExtractionSourceRef&gt;</code> | Memory Extraction Source Ref 的运行时 Schema。 |
| `memoryExtractionSourceTypeSchema` | 常量 | <code>const memoryExtractionSourceTypeSchema: z.ZodEnum&lt;["conversation", "truth", "episodic_record", "runtime_event", "tool_observation", "artifact", "structured_record", "custom"]&gt;</code> | Memory Extraction Source Type 的运行时 Schema。 |
| `memoryLifecycleJsonSchemas` | 常量 | <code>const memoryLifecycleJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `lifecycle-schema` 模块导出的 Memory Lifecycle JSON Schemas 常量。 |
| `memoryLifecycleSpecDefinitions` | 常量 | <code>const memoryLifecycleSpecDefinitions: readonly [SpecSchemaDefinition&lt;MemoryExtractionProfileSpec&gt;, SpecSchemaDefinition&lt;MemoryMaintenancePolicySpec&gt;]</code> | 由 `lifecycle-schema` 模块导出的 Memory Lifecycle Spec Definitions 常量。 |
| `memoryMaintenancePolicySpecDefinition` | 常量 | <code>const memoryMaintenancePolicySpecDefinition: SpecSchemaDefinition&lt;MemoryMaintenancePolicySpec&gt;</code> | Memory Maintenance Policy Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryMaintenancePolicySpecExample` | 常量 | <code>const memoryMaintenancePolicySpecExample: MemoryMaintenancePolicySpec</code> | Memory Maintenance Policy Spec 的有效示例值。 |
| `memoryMaintenancePolicySpecJsonSchema` | 常量 | <code>const memoryMaintenancePolicySpecJsonSchema: JsonSchema</code> | Memory Maintenance Policy Spec 的 JSON Schema。 |
| `memoryMaintenancePolicySpecSchema` | 常量 | <code>const memoryMaintenancePolicySpecSchema: z.ZodType&lt;MemoryMaintenancePolicySpec, z.ZodTypeDef, MemoryMaintenancePolicySpec&gt;</code> | Memory Maintenance Policy Spec 的运行时 Schema。 |
| `validateMemoryExtractionProfileSpec` | 函数 | <code>validateMemoryExtractionProfileSpec(input: unknown): MemoryExtractionProfileSpec</code> | Validate Memory Extraction Profile Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateMemoryMaintenancePolicySpec` | 函数 | <code>validateMemoryMaintenancePolicySpec(input: unknown): MemoryMaintenancePolicySpec</code> | Validate Memory Maintenance Policy Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `memoryExtractionProfileSpecDefinition`

Memory Extraction Profile Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { memoryExtractionProfileSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### 声明

```text
export declare const memoryExtractionProfileSpecDefinition: SpecSchemaDefinition<MemoryExtractionProfileSpec>;
```

## `memoryExtractionProfileSpecExample`

Memory Extraction Profile Spec 的有效示例值。

- 种类: 常量
- 导入: `import { memoryExtractionProfileSpecExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### 声明

```text
export declare const memoryExtractionProfileSpecExample: MemoryExtractionProfileSpec;
```

## `memoryExtractionProfileSpecJsonSchema`

Memory Extraction Profile Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { memoryExtractionProfileSpecJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### 声明

```text
export declare const memoryExtractionProfileSpecJsonSchema: JsonSchema;
```

## `memoryExtractionProfileSpecSchema`

Memory Extraction Profile Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryExtractionProfileSpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### 声明

```text
export declare const memoryExtractionProfileSpecSchema: z.ZodType<MemoryExtractionProfileSpec, z.ZodTypeDef, MemoryExtractionProfileSpec>;
```

## `memoryExtractionSourceRefSchema`

Memory Extraction Source Ref 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryExtractionSourceRefSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### 声明

```text
export declare const memoryExtractionSourceRefSchema: z.ZodType<MemoryExtractionSourceRef, z.ZodTypeDef, MemoryExtractionSourceRef>;
```

## `memoryExtractionSourceTypeSchema`

Memory Extraction Source Type 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryExtractionSourceTypeSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### 声明

```text
export declare const memoryExtractionSourceTypeSchema: z.ZodEnum<["conversation", "truth", "episodic_record", "runtime_event", "tool_observation", "artifact", "structured_record", "custom"]>;
```

## `memoryLifecycleJsonSchemas`

由 `lifecycle-schema` 模块导出的 Memory Lifecycle JSON Schemas 常量。

- 种类: 常量
- 导入: `import { memoryLifecycleJsonSchemas } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### 声明

```text
export declare const memoryLifecycleJsonSchemas: Record<string, JsonSchema>;
```

## `memoryLifecycleSpecDefinitions`

由 `lifecycle-schema` 模块导出的 Memory Lifecycle Spec Definitions 常量。

- 种类: 常量
- 导入: `import { memoryLifecycleSpecDefinitions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### 声明

```text
export declare const memoryLifecycleSpecDefinitions: readonly [SpecSchemaDefinition<MemoryExtractionProfileSpec>, SpecSchemaDefinition<MemoryMaintenancePolicySpec>];
```

## `memoryMaintenancePolicySpecDefinition`

Memory Maintenance Policy Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { memoryMaintenancePolicySpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### 声明

```text
export declare const memoryMaintenancePolicySpecDefinition: SpecSchemaDefinition<MemoryMaintenancePolicySpec>;
```

## `memoryMaintenancePolicySpecExample`

Memory Maintenance Policy Spec 的有效示例值。

- 种类: 常量
- 导入: `import { memoryMaintenancePolicySpecExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### 声明

```text
export declare const memoryMaintenancePolicySpecExample: MemoryMaintenancePolicySpec;
```

## `memoryMaintenancePolicySpecJsonSchema`

Memory Maintenance Policy Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { memoryMaintenancePolicySpecJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### 声明

```text
export declare const memoryMaintenancePolicySpecJsonSchema: JsonSchema;
```

## `memoryMaintenancePolicySpecSchema`

Memory Maintenance Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryMaintenancePolicySpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### 声明

```text
export declare const memoryMaintenancePolicySpecSchema: z.ZodType<MemoryMaintenancePolicySpec, z.ZodTypeDef, MemoryMaintenancePolicySpec>;
```

## `validateMemoryExtractionProfileSpec`

Validate Memory Extraction Profile Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemoryExtractionProfileSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### 声明

```text
export declare function validateMemoryExtractionProfileSpec(input: unknown): MemoryExtractionProfileSpec;
```

### 调用签名

```text
validateMemoryExtractionProfileSpec(input: unknown): MemoryExtractionProfileSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryExtractionProfileSpec`
- 说明: 返回值契约由上述类型定义。

## `validateMemoryMaintenancePolicySpec`

Validate Memory Maintenance Policy Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemoryMaintenancePolicySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)

### 声明

```text
export declare function validateMemoryMaintenancePolicySpec(input: unknown): MemoryMaintenancePolicySpec;
```

### 调用签名

```text
validateMemoryMaintenancePolicySpec(input: unknown): MemoryMaintenancePolicySpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryMaintenancePolicySpec`
- 说明: 返回值契约由上述类型定义。
