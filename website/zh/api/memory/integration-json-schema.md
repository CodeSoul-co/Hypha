# `@codesoul-co/hypha-memory` / `integration-json-schema`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/integration-json-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)
- 导出数: **21**

## 模块用法

用于声明并运行时校验契约。Integration JSON schema 模块公开 21 常量。

### 从包入口导入

```ts
import {
  domainMemoryDependencySnapshotExample,
  domainMemoryDependencySnapshotJsonSchema,
  domainMemoryDependencySnapshotSpecDefinition,
  memoryCacheInvalidationExample,
  memoryCacheInvalidationJsonSchema,
  memoryCacheInvalidationSpecDefinition,
  memoryCacheValidityInputJsonSchema,
  memoryCacheValidityInputSpecDefinition,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 21 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `domainMemoryDependencySnapshotExample` | 常量 | <code>const domainMemoryDependencySnapshotExample: DomainMemoryDependencySnapshot</code> | Domain Memory Dependency Snapshot 的有效示例值。 |
| `domainMemoryDependencySnapshotJsonSchema` | 常量 | <code>const domainMemoryDependencySnapshotJsonSchema: JsonSchema</code> | Domain Memory Dependency Snapshot 的 JSON Schema。 |
| `domainMemoryDependencySnapshotSpecDefinition` | 常量 | <code>const domainMemoryDependencySnapshotSpecDefinition: SpecSchemaDefinition&lt;DomainMemoryDependencySnapshot&gt;</code> | Domain Memory Dependency Snapshot Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryCacheInvalidationExample` | 常量 | <code>const memoryCacheInvalidationExample: MemoryCacheInvalidation</code> | Memory Cache Invalidation 的有效示例值。 |
| `memoryCacheInvalidationJsonSchema` | 常量 | <code>const memoryCacheInvalidationJsonSchema: JsonSchema</code> | Memory Cache Invalidation 的 JSON Schema。 |
| `memoryCacheInvalidationSpecDefinition` | 常量 | <code>const memoryCacheInvalidationSpecDefinition: SpecSchemaDefinition&lt;MemoryCacheInvalidation&gt;</code> | Memory Cache Invalidation Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryCacheValidityInputJsonSchema` | 常量 | <code>const memoryCacheValidityInputJsonSchema: JsonSchema</code> | Memory Cache Validity Input 的 JSON Schema。 |
| `memoryCacheValidityInputSpecDefinition` | 常量 | <code>const memoryCacheValidityInputSpecDefinition: SpecSchemaDefinition&lt;MemoryCacheValidityInput&gt;</code> | Memory Cache Validity Input Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryEvaluationCaseJsonSchema` | 常量 | <code>const memoryEvaluationCaseJsonSchema: JsonSchema</code> | Memory Evaluation Case 的 JSON Schema。 |
| `memoryEvaluationCaseSpecDefinition` | 常量 | <code>const memoryEvaluationCaseSpecDefinition: SpecSchemaDefinition&lt;MemoryEvaluationCase&gt;</code> | Memory Evaluation Case Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryEvaluationObservationExample` | 常量 | <code>const memoryEvaluationObservationExample: MemoryEvaluationObservation</code> | Memory Evaluation Observation 的有效示例值。 |
| `memoryEvaluationObservationJsonSchema` | 常量 | <code>const memoryEvaluationObservationJsonSchema: JsonSchema</code> | Memory Evaluation Observation 的 JSON Schema。 |
| `memoryEvaluationObservationSpecDefinition` | 常量 | <code>const memoryEvaluationObservationSpecDefinition: SpecSchemaDefinition&lt;MemoryEvaluationObservation&gt;</code> | Memory Evaluation Observation Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryIntegrationJsonSchemas` | 常量 | <code>const memoryIntegrationJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `integration-json-schema` 模块导出的 Memory Integration JSON Schemas 常量。 |
| `memoryIntegrationSpecDefinitions` | 常量 | <code>const memoryIntegrationSpecDefinitions: readonly [SpecSchemaDefinition&lt;WorkflowStateMemoryBinding&gt;, SpecSchemaDefinition&lt;SessionMemoryBinding&gt;, SpecSchemaDefinition&lt;DomainMemoryDependencySnapshot&gt;, SpecSchemaDefinition&lt;MemoryCacheValidityInput&gt;, SpecSchemaDefinition&lt;MemoryCacheInvalidation&gt;, SpecSchemaDefinition&lt;MemoryReplayReference&gt;, SpecSchemaDefinition&lt;MemoryEvaluationCase&gt;, SpecSchemaDefinition&lt;MemoryEvaluati...</code> | 由 `integration-json-schema` 模块导出的 Memory Integration Spec Definitions 常量。 |
| `memoryReplayReferenceJsonSchema` | 常量 | <code>const memoryReplayReferenceJsonSchema: JsonSchema</code> | Memory Replay Reference 的 JSON Schema。 |
| `memoryReplayReferenceSpecDefinition` | 常量 | <code>const memoryReplayReferenceSpecDefinition: SpecSchemaDefinition&lt;MemoryReplayReference&gt;</code> | Memory Replay Reference Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `sessionMemoryBindingJsonSchema` | 常量 | <code>const sessionMemoryBindingJsonSchema: JsonSchema</code> | Session Memory Binding 的 JSON Schema。 |
| `sessionMemoryBindingSpecDefinition` | 常量 | <code>const sessionMemoryBindingSpecDefinition: SpecSchemaDefinition&lt;SessionMemoryBinding&gt;</code> | Session Memory Binding Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `workflowStateMemoryBindingJsonSchema` | 常量 | <code>const workflowStateMemoryBindingJsonSchema: JsonSchema</code> | Workflow State Memory Binding 的 JSON Schema。 |
| `workflowStateMemoryBindingSpecDefinition` | 常量 | <code>const workflowStateMemoryBindingSpecDefinition: SpecSchemaDefinition&lt;WorkflowStateMemoryBinding&gt;</code> | Workflow State Memory Binding Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |

## `domainMemoryDependencySnapshotExample`

Domain Memory Dependency Snapshot 的有效示例值。

- 种类: 常量
- 导入: `import { domainMemoryDependencySnapshotExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const domainMemoryDependencySnapshotExample: DomainMemoryDependencySnapshot;
```

## `domainMemoryDependencySnapshotJsonSchema`

Domain Memory Dependency Snapshot 的 JSON Schema。

- 种类: 常量
- 导入: `import { domainMemoryDependencySnapshotJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const domainMemoryDependencySnapshotJsonSchema: JsonSchema;
```

## `domainMemoryDependencySnapshotSpecDefinition`

Domain Memory Dependency Snapshot Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { domainMemoryDependencySnapshotSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const domainMemoryDependencySnapshotSpecDefinition: SpecSchemaDefinition<DomainMemoryDependencySnapshot>;
```

## `memoryCacheInvalidationExample`

Memory Cache Invalidation 的有效示例值。

- 种类: 常量
- 导入: `import { memoryCacheInvalidationExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const memoryCacheInvalidationExample: MemoryCacheInvalidation;
```

## `memoryCacheInvalidationJsonSchema`

Memory Cache Invalidation 的 JSON Schema。

- 种类: 常量
- 导入: `import { memoryCacheInvalidationJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const memoryCacheInvalidationJsonSchema: JsonSchema;
```

## `memoryCacheInvalidationSpecDefinition`

Memory Cache Invalidation Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { memoryCacheInvalidationSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const memoryCacheInvalidationSpecDefinition: SpecSchemaDefinition<MemoryCacheInvalidation>;
```

## `memoryCacheValidityInputJsonSchema`

Memory Cache Validity Input 的 JSON Schema。

- 种类: 常量
- 导入: `import { memoryCacheValidityInputJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const memoryCacheValidityInputJsonSchema: JsonSchema;
```

## `memoryCacheValidityInputSpecDefinition`

Memory Cache Validity Input Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { memoryCacheValidityInputSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const memoryCacheValidityInputSpecDefinition: SpecSchemaDefinition<MemoryCacheValidityInput>;
```

## `memoryEvaluationCaseJsonSchema`

Memory Evaluation Case 的 JSON Schema。

- 种类: 常量
- 导入: `import { memoryEvaluationCaseJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const memoryEvaluationCaseJsonSchema: JsonSchema;
```

## `memoryEvaluationCaseSpecDefinition`

Memory Evaluation Case Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { memoryEvaluationCaseSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const memoryEvaluationCaseSpecDefinition: SpecSchemaDefinition<MemoryEvaluationCase>;
```

## `memoryEvaluationObservationExample`

Memory Evaluation Observation 的有效示例值。

- 种类: 常量
- 导入: `import { memoryEvaluationObservationExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const memoryEvaluationObservationExample: MemoryEvaluationObservation;
```

## `memoryEvaluationObservationJsonSchema`

Memory Evaluation Observation 的 JSON Schema。

- 种类: 常量
- 导入: `import { memoryEvaluationObservationJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const memoryEvaluationObservationJsonSchema: JsonSchema;
```

## `memoryEvaluationObservationSpecDefinition`

Memory Evaluation Observation Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { memoryEvaluationObservationSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const memoryEvaluationObservationSpecDefinition: SpecSchemaDefinition<MemoryEvaluationObservation>;
```

## `memoryIntegrationJsonSchemas`

由 `integration-json-schema` 模块导出的 Memory Integration JSON Schemas 常量。

- 种类: 常量
- 导入: `import { memoryIntegrationJsonSchemas } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const memoryIntegrationJsonSchemas: Record<string, JsonSchema>;
```

## `memoryIntegrationSpecDefinitions`

由 `integration-json-schema` 模块导出的 Memory Integration Spec Definitions 常量。

- 种类: 常量
- 导入: `import { memoryIntegrationSpecDefinitions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const memoryIntegrationSpecDefinitions: readonly [SpecSchemaDefinition<WorkflowStateMemoryBinding>, SpecSchemaDefinition<SessionMemoryBinding>, SpecSchemaDefinition<DomainMemoryDependencySnapshot>, SpecSchemaDefinition<MemoryCacheValidityInput>, SpecSchemaDefinition<MemoryCacheInvalidation>, SpecSchemaDefinition<MemoryReplayReference>, SpecSchemaDefinition<MemoryEvaluationCase>, SpecSchemaDefinition<MemoryEvaluationObservation>];
```

## `memoryReplayReferenceJsonSchema`

Memory Replay Reference 的 JSON Schema。

- 种类: 常量
- 导入: `import { memoryReplayReferenceJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const memoryReplayReferenceJsonSchema: JsonSchema;
```

## `memoryReplayReferenceSpecDefinition`

Memory Replay Reference Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { memoryReplayReferenceSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const memoryReplayReferenceSpecDefinition: SpecSchemaDefinition<MemoryReplayReference>;
```

## `sessionMemoryBindingJsonSchema`

Session Memory Binding 的 JSON Schema。

- 种类: 常量
- 导入: `import { sessionMemoryBindingJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const sessionMemoryBindingJsonSchema: JsonSchema;
```

## `sessionMemoryBindingSpecDefinition`

Session Memory Binding Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { sessionMemoryBindingSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const sessionMemoryBindingSpecDefinition: SpecSchemaDefinition<SessionMemoryBinding>;
```

## `workflowStateMemoryBindingJsonSchema`

Workflow State Memory Binding 的 JSON Schema。

- 种类: 常量
- 导入: `import { workflowStateMemoryBindingJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const workflowStateMemoryBindingJsonSchema: JsonSchema;
```

## `workflowStateMemoryBindingSpecDefinition`

Workflow State Memory Binding Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { workflowStateMemoryBindingSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-json-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)

### 声明

```text
export declare const workflowStateMemoryBindingSpecDefinition: SpecSchemaDefinition<WorkflowStateMemoryBinding>;
```
