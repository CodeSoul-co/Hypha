# `@codesoul-co/hypha-memory` / `integration-contracts`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/integration-contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)
- 导出数: **32**

## 模块用法

用于声明并运行时校验契约。Integration contracts 模块公开 2 类、8 函数、20 接口、2 类型。

### 从包入口导入

```ts
import {
  DefaultMemoryActivityPort,
  MemoryContextInferenceBridge,
  createContextBuildActivityHandler,
  createDomainMemoryDependencySnapshot,
  createMemoryCacheValidityInput,
  createMemorySearchActivityHandler,
  memoryCacheValidityHash,
  memoryRecordVersionSetHash,
} from '@codesoul-co/hypha-memory';

import type {
  DefaultMemoryActivityPortOptions,
  DomainMemoryDependencySnapshot,
  InferenceContextInput,
  InferenceContextPort,
  MemoryActivityHarnessHook,
  MemoryActivityObserver,
  MemoryActivityPolicyDecision,
  MemoryActivityPolicyPort,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 22 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 8 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultMemoryActivityPort` | 类 | <code>new DefaultMemoryActivityPort(options: DefaultMemoryActivityPortOptions): DefaultMemoryActivityPort</code> | Default Memory Activity Port 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryContextInferenceBridge` | 类 | <code>new MemoryContextInferenceBridge(activities: MemoryActivityPort, inference: InferenceContextPort): MemoryContextInferenceBridge</code> | Memory Context Inference Bridge 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `createContextBuildActivityHandler` | 函数 | <code>createContextBuildActivityHandler(builder: MemoryContextBuilder, gateway: ContextInjectionGateway): MemoryActivityHandler</code> | Create Context Build Activity Handler 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createDomainMemoryDependencySnapshot` | 函数 | <code>createDomainMemoryDependencySnapshot(input: Omit&lt;DomainMemoryDependencySnapshot, "dependencyHash" &#124; "createdAt"&gt;, now?: string): DomainMemoryDependencySnapshot</code> | Create Domain Memory Dependency Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createMemoryCacheValidityInput` | 函数 | <code>createMemoryCacheValidityInput(input: Omit&lt;MemoryCacheValidityInput, "scopeHash"&gt; &amp; { scope: ManagedMemoryScope; }): MemoryCacheValidityInput</code> | Create Memory Cache Validity Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createMemorySearchActivityHandler` | 函数 | <code>createMemorySearchActivityHandler(provider: MemoryManagementProvider): MemoryActivityHandler</code> | Create Memory Search Activity Handler 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `memoryCacheValidityHash` | 函数 | <code>memoryCacheValidityHash(input: MemoryCacheValidityInput): string</code> | Memory Cache Validity Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `memoryRecordVersionSetHash` | 函数 | <code>memoryRecordVersionSetHash(versionIds: string[]): string</code> | Memory Record Version Set Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateMemoryBindingCapabilities` | 函数 | <code>validateMemoryBindingCapabilities(binding: WorkflowStateMemoryBinding, capabilities: MemoryManagementCapabilities): string[]</code> | Validate Memory Binding Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateMemoryProfileCapabilities` | 函数 | <code>validateMemoryProfileCapabilities(profile: MemoryProfileSpec, capabilities: MemoryManagementCapabilities): string[]</code> | Validate Memory Profile Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `DefaultMemoryActivityPortOptions` | 接口 | <code>interface DefaultMemoryActivityPortOptions</code> | Default Memory Activity Port Options 接口，共包含 4 个公开字段或方法。 |
| `DomainMemoryDependencySnapshot` | 接口 | <code>interface DomainMemoryDependencySnapshot</code> | Domain Memory Dependency Snapshot 接口，共包含 10 个公开字段或方法。 |
| `InferenceContextInput` | 接口 | <code>interface InferenceContextInput</code> | Inference Context Input 接口，共包含 3 个公开字段或方法。 |
| `InferenceContextPort` | 接口 | <code>interface InferenceContextPort</code> | Inference Context Port 接口，共包含 1 个公开字段或方法。 |
| `MemoryActivityHarnessHook` | 接口 | <code>interface MemoryActivityHarnessHook</code> | Memory Activity Harness Hook 接口，共包含 2 个公开字段或方法。 |
| `MemoryActivityObserver` | 接口 | <code>interface MemoryActivityObserver</code> | Memory Activity Observer 接口，共包含 3 个公开字段或方法。 |
| `MemoryActivityPolicyDecision` | 接口 | <code>interface MemoryActivityPolicyDecision</code> | Memory Activity Policy Decision 接口，共包含 3 个公开字段或方法。 |
| `MemoryActivityPolicyPort` | 接口 | <code>interface MemoryActivityPolicyPort</code> | Memory Activity Policy Port 接口，共包含 1 个公开字段或方法。 |
| `MemoryActivityPort` | 接口 | <code>interface MemoryActivityPort</code> | Memory Activity Port 接口，共包含 1 个公开字段或方法。 |
| `MemoryActivityRequest` | 接口 | <code>interface MemoryActivityRequest</code> | Memory Activity Request 接口，共包含 9 个公开字段或方法。 |
| `MemoryActivityResult` | 接口 | <code>interface MemoryActivityResult</code> | Memory Activity Result 接口，共包含 8 个公开字段或方法。 |
| `MemoryCacheInvalidation` | 接口 | <code>interface MemoryCacheInvalidation</code> | Memory Cache Invalidation 接口，共包含 7 个公开字段或方法。 |
| `MemoryCacheValidityInput` | 接口 | <code>interface MemoryCacheValidityInput</code> | Memory Cache Validity Input 接口，共包含 10 个公开字段或方法。 |
| `MemoryContextInferenceResult` | 接口 | <code>interface MemoryContextInferenceResult</code> | Memory Context Inference Result 接口，共包含 2 个公开字段或方法。 |
| `MemoryEvaluationCase` | 接口 | <code>interface MemoryEvaluationCase</code> | Memory Evaluation Case 接口，共包含 6 个公开字段或方法。 |
| `MemoryEvaluationObservation` | 接口 | <code>interface MemoryEvaluationObservation</code> | Memory Evaluation Observation 接口，共包含 7 个公开字段或方法。 |
| `MemoryEvaluationPort` | 接口 | <code>interface MemoryEvaluationPort</code> | Memory Evaluation Port 接口，共包含 1 个公开字段或方法。 |
| `MemoryReplayReference` | 接口 | <code>interface MemoryReplayReference</code> | Memory Replay Reference 接口，共包含 7 个公开字段或方法。 |
| `SessionMemoryBinding` | 接口 | <code>interface SessionMemoryBinding</code> | Session Memory Binding 接口，共包含 4 个公开字段或方法。 |
| `WorkflowStateMemoryBinding` | 接口 | <code>interface WorkflowStateMemoryBinding</code> | Workflow State Memory Binding 接口，共包含 8 个公开字段或方法。 |
| `MemoryActivityHandler` | 类型 | <code>type MemoryActivityHandler = (request: MemoryActivityRequest, signal?: AbortSignal) =&gt; Promise&lt;Omit&lt;MemoryActivityResult, 'operationId'&gt;&gt;</code> | Memory Activity Handler 公共类型别名；完整类型表达式见声明。 |
| `MemoryActivityOperation` | 类型 | <code>type MemoryActivityOperation = 'add' &#124; 'extract' &#124; 'search' &#124; 'get' &#124; 'list' &#124; 'update' &#124; 'write' &#124; 'maintain' &#124; 'delete' &#124; 'history' &#124; 'build_context'</code> | Memory Activity Operation 公共类型别名；完整类型表达式见声明。 |

## `DefaultMemoryActivityPort`

Default Memory Activity Port 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultMemoryActivityPort } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export declare class DefaultMemoryActivityPort implements MemoryActivityPort {
    constructor(options: DefaultMemoryActivityPortOptions);
    register(operation: MemoryActivityOperation, handler: MemoryActivityHandler): this;
    execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise<MemoryActivityResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DefaultMemoryActivityPortOptions): DefaultMemoryActivityPort</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryActivityResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `register` | 方法 | <code>register(operation: MemoryActivityOperation, handler: MemoryActivityHandler): DefaultMemoryActivityPort</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryContextInferenceBridge`

Memory Context Inference Bridge 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryContextInferenceBridge } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export declare class MemoryContextInferenceBridge {
    constructor(activities: MemoryActivityPort, inference: InferenceContextPort);
    execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise<MemoryContextInferenceResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(activities: MemoryActivityPort, inference: InferenceContextPort): MemoryContextInferenceBridge</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryContextInferenceResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `createContextBuildActivityHandler`

Create Context Build Activity Handler 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createContextBuildActivityHandler } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export declare function createContextBuildActivityHandler(builder: MemoryContextBuilder, gateway: ContextInjectionGateway): MemoryActivityHandler;
```

### 调用签名

```text
createContextBuildActivityHandler(builder: MemoryContextBuilder, gateway: ContextInjectionGateway): MemoryActivityHandler
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `builder` | <code>MemoryContextBuilder</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `gateway` | <code>ContextInjectionGateway</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryActivityHandler`
- 说明: 返回值契约由上述类型定义。

## `createDomainMemoryDependencySnapshot`

Create Domain Memory Dependency Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createDomainMemoryDependencySnapshot } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export declare function createDomainMemoryDependencySnapshot(input: Omit<DomainMemoryDependencySnapshot, 'dependencyHash' | 'createdAt'>, now?: string): DomainMemoryDependencySnapshot;
```

### 调用签名

```text
createDomainMemoryDependencySnapshot(input: Omit<DomainMemoryDependencySnapshot, "dependencyHash" | "createdAt">, now?: string): DomainMemoryDependencySnapshot
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;DomainMemoryDependencySnapshot, "createdAt" &#124; "dependencyHash"&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `now` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `DomainMemoryDependencySnapshot`
- 说明: 返回值契约由上述类型定义。

## `createMemoryCacheValidityInput`

Create Memory Cache Validity Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createMemoryCacheValidityInput } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export declare function createMemoryCacheValidityInput(input: Omit<MemoryCacheValidityInput, 'scopeHash'> & {
    scope: ManagedMemoryScope;
}): MemoryCacheValidityInput;
```

### 调用签名

```text
createMemoryCacheValidityInput(input: Omit<MemoryCacheValidityInput, "scopeHash"> & { scope: ManagedMemoryScope; }): MemoryCacheValidityInput
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;MemoryCacheValidityInput, "scopeHash"&gt; &amp; { scope: ManagedMemoryScope; }</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryCacheValidityInput`
- 说明: 返回值契约由上述类型定义。

## `createMemorySearchActivityHandler`

Create Memory Search Activity Handler 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createMemorySearchActivityHandler } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export declare function createMemorySearchActivityHandler(provider: MemoryManagementProvider): MemoryActivityHandler;
```

### 调用签名

```text
createMemorySearchActivityHandler(provider: MemoryManagementProvider): MemoryActivityHandler
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `provider` | <code>MemoryManagementProvider</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryActivityHandler`
- 说明: 返回值契约由上述类型定义。

## `memoryCacheValidityHash`

Memory Cache Validity Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { memoryCacheValidityHash } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export declare function memoryCacheValidityHash(input: MemoryCacheValidityInput): string;
```

### 调用签名

```text
memoryCacheValidityHash(input: MemoryCacheValidityInput): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>MemoryCacheValidityInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `memoryRecordVersionSetHash`

Memory Record Version Set Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { memoryRecordVersionSetHash } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export declare function memoryRecordVersionSetHash(versionIds: string[]): string;
```

### 调用签名

```text
memoryRecordVersionSetHash(versionIds: string[]): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `versionIds` | <code>string[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `validateMemoryBindingCapabilities`

Validate Memory Binding Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemoryBindingCapabilities } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export declare function validateMemoryBindingCapabilities(binding: WorkflowStateMemoryBinding, capabilities: MemoryManagementCapabilities): string[];
```

### 调用签名

```text
validateMemoryBindingCapabilities(binding: WorkflowStateMemoryBinding, capabilities: MemoryManagementCapabilities): string[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `binding` | <code>WorkflowStateMemoryBinding</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `capabilities` | <code>MemoryManagementCapabilities</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string[]`
- 说明: 返回值契约由上述类型定义。

## `validateMemoryProfileCapabilities`

Validate Memory Profile Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemoryProfileCapabilities } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export declare function validateMemoryProfileCapabilities(profile: MemoryProfileSpec, capabilities: MemoryManagementCapabilities): string[];
```

### 调用签名

```text
validateMemoryProfileCapabilities(profile: MemoryProfileSpec, capabilities: MemoryManagementCapabilities): string[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `profile` | <code>MemoryProfileSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `capabilities` | <code>MemoryManagementCapabilities</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string[]`
- 说明: 返回值契约由上述类型定义。

## `DefaultMemoryActivityPortOptions`

Default Memory Activity Port Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DefaultMemoryActivityPortOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface DefaultMemoryActivityPortOptions {
    policy: MemoryActivityPolicyPort;
    events: MemoryEventPublisher;
    harness: MemoryActivityHarnessHook;
    observers?: MemoryActivityObserver[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: MemoryEventPublisher</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `harness` | 属性 | <code>harness: MemoryActivityHarnessHook</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observers` | 属性 | <code>observers?: MemoryActivityObserver[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policy` | 属性 | <code>policy: MemoryActivityPolicyPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DomainMemoryDependencySnapshot`

Domain Memory Dependency Snapshot 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DomainMemoryDependencySnapshot } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface DomainMemoryDependencySnapshot {
    domainPackRef: SpecRef;
    memoryProfileRef?: SpecRef;
    contextProfileRef?: SpecRef;
    extractionProfileRef?: SpecRef;
    providerRefs: SpecRef[];
    policyRefs: SpecRef[];
    scopeTemplate?: Partial<ManagedMemoryScope>;
    capabilitySnapshot: Partial<MemoryManagementCapabilities>;
    dependencyHash: string;
    createdAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilitySnapshot` | 属性 | <code>capabilitySnapshot: Partial&lt;MemoryManagementCapabilities&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextProfileRef` | 属性 | <code>contextProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dependencyHash` | 属性 | <code>dependencyHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `extractionProfileRef` | 属性 | <code>extractionProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryProfileRef` | 属性 | <code>memoryProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRefs` | 属性 | <code>providerRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeTemplate` | 属性 | <code>scopeTemplate?: Partial&lt;ManagedMemoryScope&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceContextInput`

Inference Context Input 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceContextInput } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface InferenceContextInput {
    envelope: ContextEnvelope;
    contextHash: string;
    provenanceRequired: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextHash` | 属性 | <code>contextHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `envelope` | 属性 | <code>envelope: ContextEnvelope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenanceRequired` | 属性 | <code>provenanceRequired: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceContextPort`

Inference Context Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceContextPort } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface InferenceContextPort<TOutput = unknown> {
    invoke(input: InferenceContextInput, signal?: AbortSignal): Promise<TOutput>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `invoke` | 方法 | <code>invoke(input: InferenceContextInput, signal?: AbortSignal): Promise&lt;TOutput&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryActivityHarnessHook`

Memory Activity Harness Hook 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryActivityHarnessHook } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface MemoryActivityHarnessHook {
    beforeExecute(request: MemoryActivityRequest, signal: AbortSignal): void | Promise<void>;
    afterExecute(request: MemoryActivityRequest, result: MemoryActivityResult): void | Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `afterExecute` | 方法 | <code>afterExecute(request: MemoryActivityRequest, result: MemoryActivityResult): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `beforeExecute` | 方法 | <code>beforeExecute(request: MemoryActivityRequest, signal: AbortSignal): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryActivityObserver`

Memory Activity Observer 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryActivityObserver } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface MemoryActivityObserver {
    onStarted?(request: MemoryActivityRequest): void | Promise<void>;
    onCompleted?(request: MemoryActivityRequest, result: MemoryActivityResult): void | Promise<void>;
    onFailed?(request: MemoryActivityRequest, result: MemoryActivityResult): void | Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `onCompleted` | 方法 | <code>onCompleted?(request: MemoryActivityRequest, result: MemoryActivityResult): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onFailed` | 方法 | <code>onFailed?(request: MemoryActivityRequest, result: MemoryActivityResult): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onStarted` | 方法 | <code>onStarted?(request: MemoryActivityRequest): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryActivityPolicyDecision`

Memory Activity Policy Decision 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryActivityPolicyDecision } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface MemoryActivityPolicyDecision {
    allowed: boolean;
    reason?: string;
    policyRevision?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowed` | 属性 | <code>allowed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryActivityPolicyPort`

Memory Activity Policy Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryActivityPolicyPort } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface MemoryActivityPolicyPort {
    authorize(request: MemoryActivityRequest, signal?: AbortSignal): Promise<MemoryActivityPolicyDecision>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorize` | 方法 | <code>authorize(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryActivityPolicyDecision&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryActivityPort`

Memory Activity Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryActivityPort } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface MemoryActivityPort {
    execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise<MemoryActivityResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `execute` | 方法 | <code>execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryActivityResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryActivityRequest`

Memory Activity Request 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryActivityRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface MemoryActivityRequest {
    operationId: string;
    operation: MemoryActivityOperation;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    profileRef: SpecRef;
    eventContext: MemoryEventContext;
    payload: unknown;
    timeoutMs?: number;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventContext` | 属性 | <code>eventContext: MemoryEventContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: MemoryActivityOperation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryActivityResult`

Memory Activity Result 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryActivityResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface MemoryActivityResult {
    operationId: string;
    status: 'completed' | 'failed' | 'cancelled' | 'partial';
    memoryRefs?: string[];
    contextEnvelopeRef?: string;
    eventIds: string[];
    error?: NormalizedMemoryError;
    evidence?: MemoryProviderReturnEvidence;
    output?: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextEnvelopeRef` | 属性 | <code>contextEnvelopeRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evidence` | 属性 | <code>evidence?: MemoryProviderReturnEvidence</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryRefs` | 属性 | <code>memoryRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "partial"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryCacheInvalidation`

Memory Cache Invalidation 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryCacheInvalidation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface MemoryCacheInvalidation {
    operationId: string;
    scopeHash: string;
    reason: 'created' | 'updated' | 'invalidated' | 'deleted' | 'provider_revision';
    memoryIds: string[];
    memoryVersionIds?: string[];
    mutationGeneration: string;
    validityHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryIds` | 属性 | <code>memoryIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryVersionIds` | 属性 | <code>memoryVersionIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mutationGeneration` | 属性 | <code>mutationGeneration: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: "created" &#124; "invalidated" &#124; "deleted" &#124; "updated" &#124; "provider_revision"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validityHash` | 属性 | <code>validityHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryCacheValidityInput`

Memory Cache Validity Input 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryCacheValidityInput } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface MemoryCacheValidityInput {
    memoryProfileRevision: string;
    mutationGeneration: string;
    contextProfileRevision?: string;
    scopeHash: string;
    queryHash?: string;
    recordSetRevision?: string;
    selectedMemoryVersionIds?: string[];
    providerRevision?: string;
    embeddingRevision?: string;
    policyRevision?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextProfileRevision` | 属性 | <code>contextProfileRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `embeddingRevision` | 属性 | <code>embeddingRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryProfileRevision` | 属性 | <code>memoryProfileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mutationGeneration` | 属性 | <code>mutationGeneration: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `queryHash` | 属性 | <code>queryHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordSetRevision` | 属性 | <code>recordSetRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `selectedMemoryVersionIds` | 属性 | <code>selectedMemoryVersionIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryContextInferenceResult`

Memory Context Inference Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryContextInferenceResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface MemoryContextInferenceResult<TOutput = unknown> {
    activity: MemoryActivityResult;
    inferenceOutput: TOutput;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activity` | 属性 | <code>activity: MemoryActivityResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inferenceOutput` | 属性 | <code>inferenceOutput: TOutput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryEvaluationCase`

Memory Evaluation Case 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryEvaluationCase } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface MemoryEvaluationCase {
    id: string;
    category: 'extraction' | 'retrieval' | 'context' | 'lifecycle';
    inputRef: string;
    expectedRef?: string;
    metricIds: string[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `category` | 属性 | <code>category: "lifecycle" &#124; "context" &#124; "extraction" &#124; "retrieval"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRef` | 属性 | <code>expectedRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputRef` | 属性 | <code>inputRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metricIds` | 属性 | <code>metricIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryEvaluationObservation`

Memory Evaluation Observation 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryEvaluationObservation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface MemoryEvaluationObservation {
    caseId: string;
    operationId: string;
    traceEventIds: string[];
    memoryVersionIds?: string[];
    retrievalSnapshotId?: string;
    contextHash?: string;
    metrics?: Record<string, number>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `caseId` | 属性 | <code>caseId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextHash` | 属性 | <code>contextHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryVersionIds` | 属性 | <code>memoryVersionIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metrics` | 属性 | <code>metrics?: Record&lt;string, number&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retrievalSnapshotId` | 属性 | <code>retrievalSnapshotId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceEventIds` | 属性 | <code>traceEventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryEvaluationPort`

Memory Evaluation Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryEvaluationPort } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface MemoryEvaluationPort {
    record(observation: MemoryEvaluationObservation): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `record` | 方法 | <code>record(observation: MemoryEvaluationObservation): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryReplayReference`

Memory Replay Reference 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryReplayReference } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface MemoryReplayReference {
    operationId: string;
    profileRevision: string;
    scopeHash: string;
    eventIds: string[];
    memoryVersionIds: string[];
    retrievalSnapshotId?: string;
    contextHash?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextHash` | 属性 | <code>contextHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryVersionIds` | 属性 | <code>memoryVersionIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retrievalSnapshotId` | 属性 | <code>retrievalSnapshotId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionMemoryBinding`

Session Memory Binding 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionMemoryBinding } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface SessionMemoryBinding {
    memoryProfileRef?: SpecRef;
    contextProfileRef?: SpecRef;
    memoryScopeTemplate?: Partial<ManagedMemoryScope>;
    sessionScopeMode?: 'isolated' | 'user_shared' | 'workspace_shared';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextProfileRef` | 属性 | <code>contextProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryProfileRef` | 属性 | <code>memoryProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryScopeTemplate` | 属性 | <code>memoryScopeTemplate?: Partial&lt;ManagedMemoryScope&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionScopeMode` | 属性 | <code>sessionScopeMode?: "isolated" &#124; "user_shared" &#124; "workspace_shared"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkflowStateMemoryBinding`

Workflow State Memory Binding 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkflowStateMemoryBinding } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export interface WorkflowStateMemoryBinding {
    memoryProfileRef?: SpecRef;
    contextProfileRef?: SpecRef;
    extractionProfileRef?: SpecRef;
    readPolicyRef?: SpecRef;
    writePolicyRef?: SpecRef;
    allowedMemoryTypes?: ManagedMemoryType[];
    memoryAccessMode?: 'none' | 'read' | 'write' | 'read_write';
    autoCapture?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedMemoryTypes` | 属性 | <code>allowedMemoryTypes?: ManagedMemoryType[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `autoCapture` | 属性 | <code>autoCapture?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextProfileRef` | 属性 | <code>contextProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `extractionProfileRef` | 属性 | <code>extractionProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryAccessMode` | 属性 | <code>memoryAccessMode?: "none" &#124; "read" &#124; "write" &#124; "read_write"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryProfileRef` | 属性 | <code>memoryProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `readPolicyRef` | 属性 | <code>readPolicyRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `writePolicyRef` | 属性 | <code>writePolicyRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryActivityHandler`

Memory Activity Handler 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryActivityHandler } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export type MemoryActivityHandler = (request: MemoryActivityRequest, signal?: AbortSignal) => Promise<Omit<MemoryActivityResult, 'operationId'>>;
```

## `MemoryActivityOperation`

Memory Activity Operation 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryActivityOperation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### 声明

```text
export type MemoryActivityOperation = 'add' | 'extract' | 'search' | 'get' | 'list' | 'update' | 'write' | 'maintain' | 'delete' | 'history' | 'build_context';
```
