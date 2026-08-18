# `@codesoul-co/hypha-memory` / `integration-schema`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/integration-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)
- 导出数: **21**

## 模块用法

用于声明并运行时校验契约。Integration schema 模块公开 13 常量、8 函数。

### 从包入口导入

```ts
import {
  domainMemoryDependencySnapshotSchema,
  memoryCacheInvalidationSchema,
  memoryCacheValidityInputExample,
  memoryCacheValidityInputSchema,
  memoryEvaluationCaseExample,
  memoryEvaluationCaseSchema,
  memoryEvaluationObservationSchema,
  memoryReplayReferenceExample,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 8 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 13 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `domainMemoryDependencySnapshotSchema` | 常量 | <code>const domainMemoryDependencySnapshotSchema: ZodType&lt;DomainMemoryDependencySnapshot, ZodTypeDef, DomainMemoryDependencySnapshot&gt;</code> | Domain Memory Dependency Snapshot 的运行时 Schema。 |
| `memoryCacheInvalidationSchema` | 常量 | <code>const memoryCacheInvalidationSchema: ZodType&lt;MemoryCacheInvalidation, ZodTypeDef, MemoryCacheInvalidation&gt;</code> | Memory Cache Invalidation 的运行时 Schema。 |
| `memoryCacheValidityInputExample` | 常量 | <code>const memoryCacheValidityInputExample: MemoryCacheValidityInput</code> | Memory Cache Validity Input 的有效示例值。 |
| `memoryCacheValidityInputSchema` | 常量 | <code>const memoryCacheValidityInputSchema: ZodType&lt;MemoryCacheValidityInput, ZodTypeDef, MemoryCacheValidityInput&gt;</code> | Memory Cache Validity Input 的运行时 Schema。 |
| `memoryEvaluationCaseExample` | 常量 | <code>const memoryEvaluationCaseExample: MemoryEvaluationCase</code> | Memory Evaluation Case 的有效示例值。 |
| `memoryEvaluationCaseSchema` | 常量 | <code>const memoryEvaluationCaseSchema: ZodType&lt;MemoryEvaluationCase, ZodTypeDef, MemoryEvaluationCase&gt;</code> | Memory Evaluation Case 的运行时 Schema。 |
| `memoryEvaluationObservationSchema` | 常量 | <code>const memoryEvaluationObservationSchema: ZodType&lt;MemoryEvaluationObservation, ZodTypeDef, MemoryEvaluationObservation&gt;</code> | Memory Evaluation Observation 的运行时 Schema。 |
| `memoryReplayReferenceExample` | 常量 | <code>const memoryReplayReferenceExample: MemoryReplayReference</code> | Memory Replay Reference 的有效示例值。 |
| `memoryReplayReferenceSchema` | 常量 | <code>const memoryReplayReferenceSchema: ZodType&lt;MemoryReplayReference, ZodTypeDef, MemoryReplayReference&gt;</code> | Memory Replay Reference 的运行时 Schema。 |
| `sessionMemoryBindingExample` | 常量 | <code>const sessionMemoryBindingExample: SessionMemoryBinding</code> | Session Memory Binding 的有效示例值。 |
| `sessionMemoryBindingSchema` | 常量 | <code>const sessionMemoryBindingSchema: ZodType&lt;SessionMemoryBinding, ZodTypeDef, SessionMemoryBinding&gt;</code> | Session Memory Binding 的运行时 Schema。 |
| `workflowStateMemoryBindingExample` | 常量 | <code>const workflowStateMemoryBindingExample: WorkflowStateMemoryBinding</code> | Workflow State Memory Binding 的有效示例值。 |
| `workflowStateMemoryBindingSchema` | 常量 | <code>const workflowStateMemoryBindingSchema: ZodType&lt;WorkflowStateMemoryBinding, ZodTypeDef, WorkflowStateMemoryBinding&gt;</code> | Workflow State Memory Binding 的运行时 Schema。 |
| `validateDomainMemoryDependencySnapshot` | 函数 | <code>validateDomainMemoryDependencySnapshot(input: unknown): DomainMemoryDependencySnapshot</code> | Validate Domain Memory Dependency Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateMemoryCacheInvalidation` | 函数 | <code>validateMemoryCacheInvalidation(input: unknown): MemoryCacheInvalidation</code> | Validate Memory Cache Invalidation 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateMemoryCacheValidityInput` | 函数 | <code>validateMemoryCacheValidityInput(input: unknown): MemoryCacheValidityInput</code> | Validate Memory Cache Validity Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateMemoryEvaluationCase` | 函数 | <code>validateMemoryEvaluationCase(input: unknown): MemoryEvaluationCase</code> | Validate Memory Evaluation Case 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateMemoryEvaluationObservation` | 函数 | <code>validateMemoryEvaluationObservation(input: unknown): MemoryEvaluationObservation</code> | Validate Memory Evaluation Observation 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateMemoryReplayReference` | 函数 | <code>validateMemoryReplayReference(input: unknown): MemoryReplayReference</code> | Validate Memory Replay Reference 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateSessionMemoryBinding` | 函数 | <code>validateSessionMemoryBinding(input: unknown): SessionMemoryBinding</code> | Validate Session Memory Binding 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkflowStateMemoryBinding` | 函数 | <code>validateWorkflowStateMemoryBinding(input: unknown): WorkflowStateMemoryBinding</code> | Validate Workflow State Memory Binding 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `domainMemoryDependencySnapshotSchema`

Domain Memory Dependency Snapshot 的运行时 Schema。

- 种类: 常量
- 导入: `import { domainMemoryDependencySnapshotSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare const domainMemoryDependencySnapshotSchema: ZodType<DomainMemoryDependencySnapshot, ZodTypeDef, DomainMemoryDependencySnapshot>;
```

## `memoryCacheInvalidationSchema`

Memory Cache Invalidation 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryCacheInvalidationSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare const memoryCacheInvalidationSchema: ZodType<MemoryCacheInvalidation, ZodTypeDef, MemoryCacheInvalidation>;
```

## `memoryCacheValidityInputExample`

Memory Cache Validity Input 的有效示例值。

- 种类: 常量
- 导入: `import { memoryCacheValidityInputExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare const memoryCacheValidityInputExample: MemoryCacheValidityInput;
```

## `memoryCacheValidityInputSchema`

Memory Cache Validity Input 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryCacheValidityInputSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare const memoryCacheValidityInputSchema: ZodType<MemoryCacheValidityInput, ZodTypeDef, MemoryCacheValidityInput>;
```

## `memoryEvaluationCaseExample`

Memory Evaluation Case 的有效示例值。

- 种类: 常量
- 导入: `import { memoryEvaluationCaseExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare const memoryEvaluationCaseExample: MemoryEvaluationCase;
```

## `memoryEvaluationCaseSchema`

Memory Evaluation Case 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryEvaluationCaseSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare const memoryEvaluationCaseSchema: ZodType<MemoryEvaluationCase, ZodTypeDef, MemoryEvaluationCase>;
```

## `memoryEvaluationObservationSchema`

Memory Evaluation Observation 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryEvaluationObservationSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare const memoryEvaluationObservationSchema: ZodType<MemoryEvaluationObservation, ZodTypeDef, MemoryEvaluationObservation>;
```

## `memoryReplayReferenceExample`

Memory Replay Reference 的有效示例值。

- 种类: 常量
- 导入: `import { memoryReplayReferenceExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare const memoryReplayReferenceExample: MemoryReplayReference;
```

## `memoryReplayReferenceSchema`

Memory Replay Reference 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryReplayReferenceSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare const memoryReplayReferenceSchema: ZodType<MemoryReplayReference, ZodTypeDef, MemoryReplayReference>;
```

## `sessionMemoryBindingExample`

Session Memory Binding 的有效示例值。

- 种类: 常量
- 导入: `import { sessionMemoryBindingExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare const sessionMemoryBindingExample: SessionMemoryBinding;
```

## `sessionMemoryBindingSchema`

Session Memory Binding 的运行时 Schema。

- 种类: 常量
- 导入: `import { sessionMemoryBindingSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare const sessionMemoryBindingSchema: ZodType<SessionMemoryBinding, ZodTypeDef, SessionMemoryBinding>;
```

## `workflowStateMemoryBindingExample`

Workflow State Memory Binding 的有效示例值。

- 种类: 常量
- 导入: `import { workflowStateMemoryBindingExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare const workflowStateMemoryBindingExample: WorkflowStateMemoryBinding;
```

## `workflowStateMemoryBindingSchema`

Workflow State Memory Binding 的运行时 Schema。

- 种类: 常量
- 导入: `import { workflowStateMemoryBindingSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare const workflowStateMemoryBindingSchema: ZodType<WorkflowStateMemoryBinding, ZodTypeDef, WorkflowStateMemoryBinding>;
```

## `validateDomainMemoryDependencySnapshot`

Validate Domain Memory Dependency Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateDomainMemoryDependencySnapshot } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare function validateDomainMemoryDependencySnapshot(input: unknown): DomainMemoryDependencySnapshot;
```

### 调用签名

```text
validateDomainMemoryDependencySnapshot(input: unknown): DomainMemoryDependencySnapshot
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `DomainMemoryDependencySnapshot`
- 说明: 返回值契约由上述类型定义。

## `validateMemoryCacheInvalidation`

Validate Memory Cache Invalidation 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemoryCacheInvalidation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare function validateMemoryCacheInvalidation(input: unknown): MemoryCacheInvalidation;
```

### 调用签名

```text
validateMemoryCacheInvalidation(input: unknown): MemoryCacheInvalidation
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryCacheInvalidation`
- 说明: 返回值契约由上述类型定义。

## `validateMemoryCacheValidityInput`

Validate Memory Cache Validity Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemoryCacheValidityInput } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare function validateMemoryCacheValidityInput(input: unknown): MemoryCacheValidityInput;
```

### 调用签名

```text
validateMemoryCacheValidityInput(input: unknown): MemoryCacheValidityInput
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryCacheValidityInput`
- 说明: 返回值契约由上述类型定义。

## `validateMemoryEvaluationCase`

Validate Memory Evaluation Case 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemoryEvaluationCase } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare function validateMemoryEvaluationCase(input: unknown): MemoryEvaluationCase;
```

### 调用签名

```text
validateMemoryEvaluationCase(input: unknown): MemoryEvaluationCase
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryEvaluationCase`
- 说明: 返回值契约由上述类型定义。

## `validateMemoryEvaluationObservation`

Validate Memory Evaluation Observation 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemoryEvaluationObservation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare function validateMemoryEvaluationObservation(input: unknown): MemoryEvaluationObservation;
```

### 调用签名

```text
validateMemoryEvaluationObservation(input: unknown): MemoryEvaluationObservation
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryEvaluationObservation`
- 说明: 返回值契约由上述类型定义。

## `validateMemoryReplayReference`

Validate Memory Replay Reference 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemoryReplayReference } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare function validateMemoryReplayReference(input: unknown): MemoryReplayReference;
```

### 调用签名

```text
validateMemoryReplayReference(input: unknown): MemoryReplayReference
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryReplayReference`
- 说明: 返回值契约由上述类型定义。

## `validateSessionMemoryBinding`

Validate Session Memory Binding 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateSessionMemoryBinding } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare function validateSessionMemoryBinding(input: unknown): SessionMemoryBinding;
```

### 调用签名

```text
validateSessionMemoryBinding(input: unknown): SessionMemoryBinding
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SessionMemoryBinding`
- 说明: 返回值契约由上述类型定义。

## `validateWorkflowStateMemoryBinding`

Validate Workflow State Memory Binding 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkflowStateMemoryBinding } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)

### 声明

```text
export declare function validateWorkflowStateMemoryBinding(input: unknown): WorkflowStateMemoryBinding;
```

### 调用签名

```text
validateWorkflowStateMemoryBinding(input: unknown): WorkflowStateMemoryBinding
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkflowStateMemoryBinding`
- 说明: 返回值契约由上述类型定义。
