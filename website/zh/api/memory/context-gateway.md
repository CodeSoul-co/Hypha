# `@codesoul-co/hypha-memory` / `context-gateway`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/context-gateway.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)
- 导出数: **6**

## 模块用法

用于使用该功能边界的公共契约与操作。Context gateway 模块公开 1 类、4 接口、1 类型。

### 从包入口导入

```ts
import {
  DefaultMemoryContextGateway,
} from '@codesoul-co/hypha-memory';

import type {
  ContextGatewayRequest,
  ContextGatewayResult,
  DefaultMemoryContextGatewayOptions,
  MemoryContextGateway,
  ContextGatewayConsumer,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 5 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultMemoryContextGateway` | 类 | <code>new DefaultMemoryContextGateway(options: DefaultMemoryContextGatewayOptions): DefaultMemoryContextGateway</code> | Canonical Context entry point shared by Chat, Workflow, and Harness consumers. |
| `ContextGatewayRequest` | 接口 | <code>interface ContextGatewayRequest extends ResolvedContextBuildInput</code> | Context Gateway Request 接口，共包含 20 个公开字段或方法。 |
| `ContextGatewayResult` | 接口 | <code>interface ContextGatewayResult</code> | Context Gateway Result 接口，共包含 4 个公开字段或方法。 |
| `DefaultMemoryContextGatewayOptions` | 接口 | <code>interface DefaultMemoryContextGatewayOptions</code> | Default Memory Context Gateway Options 接口，共包含 5 个公开字段或方法。 |
| `MemoryContextGateway` | 接口 | <code>interface MemoryContextGateway</code> | Memory Context Gateway 接口，共包含 1 个公开字段或方法。 |
| `ContextGatewayConsumer` | 类型 | <code>type ContextGatewayConsumer = 'chat' &#124; 'workflow' &#124; 'harness'</code> | Context Gateway Consumer 公共类型别名；完整类型表达式见声明。 |

## `DefaultMemoryContextGateway`

Canonical Context entry point shared by Chat, Workflow, and Harness consumers.

- 种类: 类
- 导入: `import { DefaultMemoryContextGateway } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-gateway`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)

### 声明

```text
export declare class DefaultMemoryContextGateway implements MemoryContextGateway {
    constructor(options: DefaultMemoryContextGatewayOptions);
    build(request: ContextGatewayRequest, signal?: AbortSignal): Promise<ContextGatewayResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(request: ContextGatewayRequest, signal?: AbortSignal): Promise&lt;ContextGatewayResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: DefaultMemoryContextGatewayOptions): DefaultMemoryContextGateway</code> | 创建该类的实例。 |

## `ContextGatewayRequest`

Context Gateway Request 接口，共包含 20 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextGatewayRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-gateway`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)

### 声明

```text
export interface ContextGatewayRequest extends ResolvedContextBuildInput {
    consumer: ContextGatewayConsumer;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `consumer` | 属性 | <code>consumer: ContextGatewayConsumer</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `explicitSourceRefs` | 属性 | <code>explicitSourceRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messageCursor` | 属性 | <code>messageCursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelContextWindowTokens` | 属性 | <code>modelContextWindowTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `previousContextHash` | 属性 | <code>previousContextHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profile` | 属性 | <code>profile: ContextProfileSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `query` | 属性 | <code>query?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedInstructionTokens` | 属性 | <code>reservedInstructionTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedOutputTokens` | 属性 | <code>reservedOutputTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedSystemTokens` | 属性 | <code>reservedSystemTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtimeStateRef` | 属性 | <code>runtimeStateRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenizerRef` | 属性 | <code>tokenizerRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextGatewayResult`

Context Gateway Result 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextGatewayResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-gateway`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)

### 声明

```text
export interface ContextGatewayResult {
    envelope: ContextEnvelope;
    explanation: ContextBuildExplanation;
    sourceItemCount: number;
    consumer: ContextGatewayConsumer;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `consumer` | 属性 | <code>consumer: ContextGatewayConsumer</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `envelope` | 属性 | <code>envelope: ContextEnvelope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `explanation` | 属性 | <code>explanation: ContextBuildExplanation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceItemCount` | 属性 | <code>sourceItemCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DefaultMemoryContextGatewayOptions`

Default Memory Context Gateway Options 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DefaultMemoryContextGatewayOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-gateway`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)

### 声明

```text
export interface DefaultMemoryContextGatewayOptions {
    resolver: ContextSourceResolverRegistry;
    builder: MemoryContextBuilder;
    injection: ContextInjectionGateway;
    activityHook?: MemoryActivityHarnessHook;
    eventContext?: (request: ContextGatewayRequest) => MemoryActivityRequest['eventContext'];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityHook` | 属性 | <code>activityHook?: MemoryActivityHarnessHook</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `builder` | 属性 | <code>builder: MemoryContextBuilder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventContext` | 方法 | <code>eventContext?(request: ContextGatewayRequest): MemoryActivityRequest["eventContext"]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `injection` | 属性 | <code>injection: ContextInjectionGateway</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolver` | 属性 | <code>resolver: ContextSourceResolverRegistry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryContextGateway`

Memory Context Gateway 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryContextGateway } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-gateway`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)

### 声明

```text
export interface MemoryContextGateway {
    build(request: ContextGatewayRequest, signal?: AbortSignal): Promise<ContextGatewayResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(request: ContextGatewayRequest, signal?: AbortSignal): Promise&lt;ContextGatewayResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ContextGatewayConsumer`

Context Gateway Consumer 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ContextGatewayConsumer } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-gateway`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)

### 声明

```text
export type ContextGatewayConsumer = 'chat' | 'workflow' | 'harness';
```
