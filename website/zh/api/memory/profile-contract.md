# `@codesoul-co/hypha-memory` / `profile-contract`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/profile-contract.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)
- 导出数: **39**

## 模块用法

用于声明并运行时校验契约。Profile contract 模块公开 34 常量、5 函数。

### 从包入口导入

```ts
import {
  embeddingProviderSpecDefinition,
  embeddingProviderSpecExample,
  embeddingProviderSpecSchema,
  memoryConflictPolicySpecSchema,
  memoryConsolidationPolicySpecSchema,
  memoryContractJsonSchemas,
  memoryContractSpecDefinitions,
  memoryContractSpecRefJsonSchema,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 5 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 34 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { embeddingProviderSpecSchema } from '@codesoul-co/hypha-memory';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = embeddingProviderSpecSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `embeddingProviderSpecDefinition` | 常量 | <code>const embeddingProviderSpecDefinition: SpecSchemaDefinition&lt;EmbeddingProviderSpec&gt;</code> | Embedding Provider Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `embeddingProviderSpecExample` | 常量 | <code>const embeddingProviderSpecExample: EmbeddingProviderSpec</code> | Embedding Provider Spec 的有效示例值。 |
| `embeddingProviderSpecSchema` | 常量 | <code>const embeddingProviderSpecSchema: z.ZodType&lt;EmbeddingProviderSpec, z.ZodTypeDef, EmbeddingProviderSpec&gt;</code> | Embedding Provider Spec 的运行时 Schema。 |
| `memoryConflictPolicySpecSchema` | 常量 | <code>const memoryConflictPolicySpecSchema: z.ZodType&lt;MemoryConflictPolicySpec, z.ZodTypeDef, MemoryConflictPolicySpec&gt;</code> | Memory Conflict Policy Spec 的运行时 Schema。 |
| `memoryConsolidationPolicySpecSchema` | 常量 | <code>const memoryConsolidationPolicySpecSchema: z.ZodType&lt;MemoryConsolidationPolicySpec, z.ZodTypeDef, MemoryConsolidationPolicySpec&gt;</code> | Memory Consolidation Policy Spec 的运行时 Schema。 |
| `memoryContractJsonSchemas` | 常量 | <code>const memoryContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `profile-contract` 模块导出的 Memory Contract JSON Schemas 常量。 |
| `memoryContractSpecDefinitions` | 常量 | <code>const memoryContractSpecDefinitions: readonly [SpecSchemaDefinition&lt;MemoryProfileSpec&gt;, SpecSchemaDefinition&lt;MemoryManagementProviderSpec&gt;, SpecSchemaDefinition&lt;WorkingMemoryStoreSpec&gt;, SpecSchemaDefinition&lt;MemoryRecordStoreSpec&gt;, SpecSchemaDefinition&lt;VectorStoreSpec&gt;, SpecSchemaDefinition&lt;EmbeddingProviderSpec&gt;]</code> | 由 `profile-contract` 模块导出的 Memory Contract Spec Definitions 常量。 |
| `memoryContractSpecRefJsonSchema` | 常量 | <code>const memoryContractSpecRefJsonSchema: JsonSchema</code> | Memory Contract Spec Ref 的 JSON Schema。 |
| `memoryContractSpecRefSchema` | 常量 | <code>const memoryContractSpecRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }&gt;</code> | Memory Contract Spec Ref 的运行时 Schema。 |
| `memoryFallbackPolicySpecSchema` | 常量 | <code>const memoryFallbackPolicySpecSchema: z.ZodType&lt;MemoryFallbackPolicySpec, z.ZodTypeDef, MemoryFallbackPolicySpec&gt;</code> | Memory Fallback Policy Spec 的运行时 Schema。 |
| `memoryIndexingPolicySpecSchema` | 常量 | <code>const memoryIndexingPolicySpecSchema: z.ZodType&lt;MemoryIndexingPolicySpec, z.ZodTypeDef, MemoryIndexingPolicySpec&gt;</code> | Memory Indexing Policy Spec 的运行时 Schema。 |
| `memoryManagementCapabilitiesSchema` | 常量 | <code>const memoryManagementCapabilitiesSchema: z.ZodType&lt;MemoryManagementCapabilities, z.ZodTypeDef, MemoryManagementCapabilities&gt;</code> | Memory Management Capabilities 的运行时 Schema。 |
| `memoryManagementProviderSpecDefinition` | 常量 | <code>const memoryManagementProviderSpecDefinition: SpecSchemaDefinition&lt;MemoryManagementProviderSpec&gt;</code> | Memory Management Provider Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryManagementProviderSpecExample` | 常量 | <code>const memoryManagementProviderSpecExample: MemoryManagementProviderSpec</code> | Memory Management Provider Spec 的有效示例值。 |
| `memoryManagementProviderSpecSchema` | 常量 | <code>const memoryManagementProviderSpecSchema: z.ZodType&lt;MemoryManagementProviderSpec, z.ZodTypeDef, MemoryManagementProviderSpec&gt;</code> | Memory Management Provider Spec 的运行时 Schema。 |
| `memoryPrivacyPolicySpecSchema` | 常量 | <code>const memoryPrivacyPolicySpecSchema: z.ZodType&lt;MemoryPrivacyPolicySpec, z.ZodTypeDef, MemoryPrivacyPolicySpec&gt;</code> | Memory Privacy Policy Spec 的运行时 Schema。 |
| `memoryProfileSpecDefinition` | 常量 | <code>const memoryProfileSpecDefinition: SpecSchemaDefinition&lt;MemoryProfileSpec&gt;</code> | Memory Profile Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryProfileSpecExample` | 常量 | <code>const memoryProfileSpecExample: MemoryProfileSpec</code> | Memory Profile Spec 的有效示例值。 |
| `memoryProfileSpecJsonSchema` | 常量 | <code>const memoryProfileSpecJsonSchema: JsonSchema</code> | Memory Profile Spec 的 JSON Schema。 |
| `memoryProfileSpecSchema` | 常量 | <code>const memoryProfileSpecSchema: z.ZodType&lt;MemoryProfileSpec, z.ZodTypeDef, MemoryProfileSpec&gt;</code> | Memory Profile Spec 的运行时 Schema。 |
| `memoryRecordStoreSpecDefinition` | 常量 | <code>const memoryRecordStoreSpecDefinition: SpecSchemaDefinition&lt;MemoryRecordStoreSpec&gt;</code> | Memory Record Store Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryRecordStoreSpecExample` | 常量 | <code>const memoryRecordStoreSpecExample: MemoryRecordStoreSpec</code> | Memory Record Store Spec 的有效示例值。 |
| `memoryRecordStoreSpecSchema` | 常量 | <code>const memoryRecordStoreSpecSchema: z.ZodType&lt;MemoryRecordStoreSpec, z.ZodTypeDef, MemoryRecordStoreSpec&gt;</code> | Memory Record Store Spec 的运行时 Schema。 |
| `memoryRetentionPolicySpecSchema` | 常量 | <code>const memoryRetentionPolicySpecSchema: z.ZodType&lt;MemoryRetentionPolicySpec, z.ZodTypeDef, MemoryRetentionPolicySpec&gt;</code> | Memory Retention Policy Spec 的运行时 Schema。 |
| `memoryRetrievalPolicySpecSchema` | 常量 | <code>const memoryRetrievalPolicySpecSchema: z.ZodType&lt;MemoryRetrievalPolicySpec, z.ZodTypeDef, MemoryRetrievalPolicySpec&gt;</code> | Memory Retrieval Policy Spec 的运行时 Schema。 |
| `memoryScopePolicySpecSchema` | 常量 | <code>const memoryScopePolicySpecSchema: z.ZodType&lt;MemoryScopePolicySpec, z.ZodTypeDef, MemoryScopePolicySpec&gt;</code> | Memory Scope Policy Spec 的运行时 Schema。 |
| `memoryWritePolicySpecSchema` | 常量 | <code>const memoryWritePolicySpecSchema: z.ZodType&lt;MemoryWritePolicySpec, z.ZodTypeDef, MemoryWritePolicySpec&gt;</code> | Memory Write Policy Spec 的运行时 Schema。 |
| `vectorStoreCapabilitiesSchema` | 常量 | <code>const vectorStoreCapabilitiesSchema: z.ZodType&lt;VectorStoreCapabilities, z.ZodTypeDef, VectorStoreCapabilities&gt;</code> | Vector Store Capabilities 的运行时 Schema。 |
| `vectorStoreSpecDefinition` | 常量 | <code>const vectorStoreSpecDefinition: SpecSchemaDefinition&lt;VectorStoreSpec&gt;</code> | Vector Store Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `vectorStoreSpecExample` | 常量 | <code>const vectorStoreSpecExample: VectorStoreSpec</code> | Vector Store Spec 的有效示例值。 |
| `vectorStoreSpecSchema` | 常量 | <code>const vectorStoreSpecSchema: z.ZodType&lt;VectorStoreSpec, z.ZodTypeDef, VectorStoreSpec&gt;</code> | Vector Store Spec 的运行时 Schema。 |
| `workingMemoryStoreSpecDefinition` | 常量 | <code>const workingMemoryStoreSpecDefinition: SpecSchemaDefinition&lt;WorkingMemoryStoreSpec&gt;</code> | Working Memory Store Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `workingMemoryStoreSpecExample` | 常量 | <code>const workingMemoryStoreSpecExample: WorkingMemoryStoreSpec</code> | Working Memory Store Spec 的有效示例值。 |
| `workingMemoryStoreSpecSchema` | 常量 | <code>const workingMemoryStoreSpecSchema: z.ZodType&lt;WorkingMemoryStoreSpec, z.ZodTypeDef, WorkingMemoryStoreSpec&gt;</code> | Working Memory Store Spec 的运行时 Schema。 |
| `validateEmbeddingProviderSpec` | 函数 | <code>validateEmbeddingProviderSpec(input: unknown): EmbeddingProviderSpec</code> | Validate Embedding Provider Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateMemoryProfileSpec` | 函数 | <code>validateMemoryProfileSpec(input: unknown): MemoryProfileSpec</code> | Validate Memory Profile Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateMemoryRecordStoreSpec` | 函数 | <code>validateMemoryRecordStoreSpec(input: unknown): MemoryRecordStoreSpec</code> | Validate Memory Record Store Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateVectorStoreSpec` | 函数 | <code>validateVectorStoreSpec(input: unknown): VectorStoreSpec</code> | Validate Vector Store Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkingMemoryStoreSpec` | 函数 | <code>validateWorkingMemoryStoreSpec(input: unknown): WorkingMemoryStoreSpec</code> | Validate Working Memory Store Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `embeddingProviderSpecDefinition`

Embedding Provider Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { embeddingProviderSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const embeddingProviderSpecDefinition: SpecSchemaDefinition<EmbeddingProviderSpec>;
```

## `embeddingProviderSpecExample`

Embedding Provider Spec 的有效示例值。

- 种类: 常量
- 导入: `import { embeddingProviderSpecExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const embeddingProviderSpecExample: EmbeddingProviderSpec;
```

## `embeddingProviderSpecSchema`

Embedding Provider Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { embeddingProviderSpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const embeddingProviderSpecSchema: z.ZodType<EmbeddingProviderSpec, z.ZodTypeDef, EmbeddingProviderSpec>;
```

## `memoryConflictPolicySpecSchema`

Memory Conflict Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryConflictPolicySpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryConflictPolicySpecSchema: z.ZodType<MemoryConflictPolicySpec, z.ZodTypeDef, MemoryConflictPolicySpec>;
```

## `memoryConsolidationPolicySpecSchema`

Memory Consolidation Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryConsolidationPolicySpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryConsolidationPolicySpecSchema: z.ZodType<MemoryConsolidationPolicySpec, z.ZodTypeDef, MemoryConsolidationPolicySpec>;
```

## `memoryContractJsonSchemas`

由 `profile-contract` 模块导出的 Memory Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { memoryContractJsonSchemas } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryContractJsonSchemas: Record<string, JsonSchema>;
```

## `memoryContractSpecDefinitions`

由 `profile-contract` 模块导出的 Memory Contract Spec Definitions 常量。

- 种类: 常量
- 导入: `import { memoryContractSpecDefinitions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryContractSpecDefinitions: readonly [SpecSchemaDefinition<MemoryProfileSpec>, SpecSchemaDefinition<MemoryManagementProviderSpec>, SpecSchemaDefinition<WorkingMemoryStoreSpec>, SpecSchemaDefinition<MemoryRecordStoreSpec>, SpecSchemaDefinition<VectorStoreSpec>, SpecSchemaDefinition<EmbeddingProviderSpec>];
```

## `memoryContractSpecRefJsonSchema`

Memory Contract Spec Ref 的 JSON Schema。

- 种类: 常量
- 导入: `import { memoryContractSpecRefJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryContractSpecRefJsonSchema: JsonSchema;
```

## `memoryContractSpecRefSchema`

Memory Contract Spec Ref 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryContractSpecRefSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryContractSpecRefSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; } & { revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; revision?: string | undefined; }, { id: string; version?: string | undefined; revision?: string | undefined; }>;
```

## `memoryFallbackPolicySpecSchema`

Memory Fallback Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryFallbackPolicySpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryFallbackPolicySpecSchema: z.ZodType<MemoryFallbackPolicySpec, z.ZodTypeDef, MemoryFallbackPolicySpec>;
```

## `memoryIndexingPolicySpecSchema`

Memory Indexing Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryIndexingPolicySpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryIndexingPolicySpecSchema: z.ZodType<MemoryIndexingPolicySpec, z.ZodTypeDef, MemoryIndexingPolicySpec>;
```

## `memoryManagementCapabilitiesSchema`

Memory Management Capabilities 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryManagementCapabilitiesSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryManagementCapabilitiesSchema: z.ZodType<MemoryManagementCapabilities, z.ZodTypeDef, MemoryManagementCapabilities>;
```

## `memoryManagementProviderSpecDefinition`

Memory Management Provider Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { memoryManagementProviderSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryManagementProviderSpecDefinition: SpecSchemaDefinition<MemoryManagementProviderSpec>;
```

## `memoryManagementProviderSpecExample`

Memory Management Provider Spec 的有效示例值。

- 种类: 常量
- 导入: `import { memoryManagementProviderSpecExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryManagementProviderSpecExample: MemoryManagementProviderSpec;
```

## `memoryManagementProviderSpecSchema`

Memory Management Provider Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryManagementProviderSpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryManagementProviderSpecSchema: z.ZodType<MemoryManagementProviderSpec, z.ZodTypeDef, MemoryManagementProviderSpec>;
```

## `memoryPrivacyPolicySpecSchema`

Memory Privacy Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryPrivacyPolicySpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryPrivacyPolicySpecSchema: z.ZodType<MemoryPrivacyPolicySpec, z.ZodTypeDef, MemoryPrivacyPolicySpec>;
```

## `memoryProfileSpecDefinition`

Memory Profile Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { memoryProfileSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryProfileSpecDefinition: SpecSchemaDefinition<MemoryProfileSpec>;
```

## `memoryProfileSpecExample`

Memory Profile Spec 的有效示例值。

- 种类: 常量
- 导入: `import { memoryProfileSpecExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryProfileSpecExample: MemoryProfileSpec;
```

## `memoryProfileSpecJsonSchema`

Memory Profile Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { memoryProfileSpecJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryProfileSpecJsonSchema: JsonSchema;
```

## `memoryProfileSpecSchema`

Memory Profile Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryProfileSpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryProfileSpecSchema: z.ZodType<MemoryProfileSpec, z.ZodTypeDef, MemoryProfileSpec>;
```

## `memoryRecordStoreSpecDefinition`

Memory Record Store Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { memoryRecordStoreSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryRecordStoreSpecDefinition: SpecSchemaDefinition<MemoryRecordStoreSpec>;
```

## `memoryRecordStoreSpecExample`

Memory Record Store Spec 的有效示例值。

- 种类: 常量
- 导入: `import { memoryRecordStoreSpecExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryRecordStoreSpecExample: MemoryRecordStoreSpec;
```

## `memoryRecordStoreSpecSchema`

Memory Record Store Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryRecordStoreSpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryRecordStoreSpecSchema: z.ZodType<MemoryRecordStoreSpec, z.ZodTypeDef, MemoryRecordStoreSpec>;
```

## `memoryRetentionPolicySpecSchema`

Memory Retention Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryRetentionPolicySpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryRetentionPolicySpecSchema: z.ZodType<MemoryRetentionPolicySpec, z.ZodTypeDef, MemoryRetentionPolicySpec>;
```

## `memoryRetrievalPolicySpecSchema`

Memory Retrieval Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryRetrievalPolicySpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryRetrievalPolicySpecSchema: z.ZodType<MemoryRetrievalPolicySpec, z.ZodTypeDef, MemoryRetrievalPolicySpec>;
```

## `memoryScopePolicySpecSchema`

Memory Scope Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryScopePolicySpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryScopePolicySpecSchema: z.ZodType<MemoryScopePolicySpec, z.ZodTypeDef, MemoryScopePolicySpec>;
```

## `memoryWritePolicySpecSchema`

Memory Write Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryWritePolicySpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const memoryWritePolicySpecSchema: z.ZodType<MemoryWritePolicySpec, z.ZodTypeDef, MemoryWritePolicySpec>;
```

## `vectorStoreCapabilitiesSchema`

Vector Store Capabilities 的运行时 Schema。

- 种类: 常量
- 导入: `import { vectorStoreCapabilitiesSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const vectorStoreCapabilitiesSchema: z.ZodType<VectorStoreCapabilities, z.ZodTypeDef, VectorStoreCapabilities>;
```

## `vectorStoreSpecDefinition`

Vector Store Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { vectorStoreSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const vectorStoreSpecDefinition: SpecSchemaDefinition<VectorStoreSpec>;
```

## `vectorStoreSpecExample`

Vector Store Spec 的有效示例值。

- 种类: 常量
- 导入: `import { vectorStoreSpecExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const vectorStoreSpecExample: VectorStoreSpec;
```

## `vectorStoreSpecSchema`

Vector Store Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { vectorStoreSpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const vectorStoreSpecSchema: z.ZodType<VectorStoreSpec, z.ZodTypeDef, VectorStoreSpec>;
```

## `workingMemoryStoreSpecDefinition`

Working Memory Store Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { workingMemoryStoreSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const workingMemoryStoreSpecDefinition: SpecSchemaDefinition<WorkingMemoryStoreSpec>;
```

## `workingMemoryStoreSpecExample`

Working Memory Store Spec 的有效示例值。

- 种类: 常量
- 导入: `import { workingMemoryStoreSpecExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const workingMemoryStoreSpecExample: WorkingMemoryStoreSpec;
```

## `workingMemoryStoreSpecSchema`

Working Memory Store Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { workingMemoryStoreSpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare const workingMemoryStoreSpecSchema: z.ZodType<WorkingMemoryStoreSpec, z.ZodTypeDef, WorkingMemoryStoreSpec>;
```

## `validateEmbeddingProviderSpec`

Validate Embedding Provider Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateEmbeddingProviderSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare function validateEmbeddingProviderSpec(input: unknown): EmbeddingProviderSpec;
```

### 调用签名

```text
validateEmbeddingProviderSpec(input: unknown): EmbeddingProviderSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `EmbeddingProviderSpec`
- 说明: 返回值契约由上述类型定义。

## `validateMemoryProfileSpec`

Validate Memory Profile Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemoryProfileSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare function validateMemoryProfileSpec(input: unknown): MemoryProfileSpec;
```

### 调用签名

```text
validateMemoryProfileSpec(input: unknown): MemoryProfileSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryProfileSpec`
- 说明: 返回值契约由上述类型定义。

## `validateMemoryRecordStoreSpec`

Validate Memory Record Store Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemoryRecordStoreSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare function validateMemoryRecordStoreSpec(input: unknown): MemoryRecordStoreSpec;
```

### 调用签名

```text
validateMemoryRecordStoreSpec(input: unknown): MemoryRecordStoreSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryRecordStoreSpec`
- 说明: 返回值契约由上述类型定义。

## `validateVectorStoreSpec`

Validate Vector Store Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateVectorStoreSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare function validateVectorStoreSpec(input: unknown): VectorStoreSpec;
```

### 调用签名

```text
validateVectorStoreSpec(input: unknown): VectorStoreSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `VectorStoreSpec`
- 说明: 返回值契约由上述类型定义。

## `validateWorkingMemoryStoreSpec`

Validate Working Memory Store Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkingMemoryStoreSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`profile-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)

### 声明

```text
export declare function validateWorkingMemoryStoreSpec(input: unknown): WorkingMemoryStoreSpec;
```

### 调用签名

```text
validateWorkingMemoryStoreSpec(input: unknown): WorkingMemoryStoreSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkingMemoryStoreSpec`
- 说明: 返回值契约由上述类型定义。
