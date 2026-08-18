# `@codesoul-co/hypha-memory` / `memory-projection-invalidation`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-projection-invalidation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)
- 导出数: **9**

## 模块用法

用于使用该功能边界的公共契约与操作。Memory projection invalidation 模块公开 3 类、5 接口、1 类型。

### 从包入口导入

```ts
import {
  InMemoryMemoryMutationGenerationStore,
  MemoryProjectionInvalidationCoordinator,
  MemorySearchCacheInvalidationTarget,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryMutationGenerationStore,
  MemoryProjectionInvalidationPort,
  MemoryProjectionInvalidationReceipt,
  MemoryProjectionInvalidationRequest,
  MemoryProjectionInvalidationTarget,
  MemoryProjectionInvalidationReason,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 6 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMemoryMutationGenerationStore` | 类 | <code>new InMemoryMemoryMutationGenerationStore(): InMemoryMemoryMutationGenerationStore</code> | In Memory Memory Mutation Generation Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryProjectionInvalidationCoordinator` | 类 | <code>new MemoryProjectionInvalidationCoordinator(generations: MemoryMutationGenerationStore, targets: readonly MemoryProjectionInvalidationTarget[]): MemoryProjectionInvalidationCoordinator</code> | Memory Projection Invalidation Coordinator 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemorySearchCacheInvalidationTarget` | 类 | <code>new MemorySearchCacheInvalidationTarget(store: MemorySearchCacheStore, id?: string): MemorySearchCacheInvalidationTarget</code> | Memory Search Cache Invalidation Target 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryMutationGenerationStore` | 接口 | <code>interface MemoryMutationGenerationStore</code> | Memory Mutation Generation Store 接口，共包含 2 个公开字段或方法。 |
| `MemoryProjectionInvalidationPort` | 接口 | <code>interface MemoryProjectionInvalidationPort</code> | Memory Projection Invalidation Port 接口，共包含 1 个公开字段或方法。 |
| `MemoryProjectionInvalidationReceipt` | 接口 | <code>interface MemoryProjectionInvalidationReceipt</code> | Memory Projection Invalidation Receipt 接口，共包含 5 个公开字段或方法。 |
| `MemoryProjectionInvalidationRequest` | 接口 | <code>interface MemoryProjectionInvalidationRequest</code> | Memory Projection Invalidation Request 接口，共包含 5 个公开字段或方法。 |
| `MemoryProjectionInvalidationTarget` | 接口 | <code>interface MemoryProjectionInvalidationTarget</code> | Memory Projection Invalidation Target 接口，共包含 2 个公开字段或方法。 |
| `MemoryProjectionInvalidationReason` | 类型 | <code>type MemoryProjectionInvalidationReason = 'updated' &#124; 'deleted'</code> | Memory Projection Invalidation Reason 公共类型别名；完整类型表达式见声明。 |

## `InMemoryMemoryMutationGenerationStore`

In Memory Memory Mutation Generation Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryMemoryMutationGenerationStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### 声明

```text
export declare class InMemoryMemoryMutationGenerationStore implements MemoryMutationGenerationStore {
    current(scopeHash: string): Promise<string>;
    advance(scopeHash: string, operationId: string): Promise<string>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `advance` | 方法 | <code>advance(scopeHash: string, operationId: string): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): InMemoryMemoryMutationGenerationStore</code> | 创建该类的实例。 |
| `current` | 方法 | <code>current(scopeHash: string): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryProjectionInvalidationCoordinator`

Memory Projection Invalidation Coordinator 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryProjectionInvalidationCoordinator } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### 声明

```text
export declare class MemoryProjectionInvalidationCoordinator implements MemoryProjectionInvalidationPort {
    constructor(generations: MemoryMutationGenerationStore, targets: readonly MemoryProjectionInvalidationTarget[]);
    invalidate(request: MemoryProjectionInvalidationRequest): Promise<MemoryProjectionInvalidationReceipt>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(generations: MemoryMutationGenerationStore, targets: readonly MemoryProjectionInvalidationTarget[]): MemoryProjectionInvalidationCoordinator</code> | 创建该类的实例。 |
| `invalidate` | 方法 | <code>invalidate(request: MemoryProjectionInvalidationRequest): Promise&lt;MemoryProjectionInvalidationReceipt&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemorySearchCacheInvalidationTarget`

Memory Search Cache Invalidation Target 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemorySearchCacheInvalidationTarget } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### 声明

```text
export declare class MemorySearchCacheInvalidationTarget implements MemoryProjectionInvalidationTarget {
    readonly id: string;
    constructor(store: MemorySearchCacheStore, id?: string);
    invalidateScope(scopeHash: string): Promise<number>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(store: MemorySearchCacheStore, id?: string): MemorySearchCacheInvalidationTarget</code> | 创建该类的实例。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryMutationGenerationStore`

Memory Mutation Generation Store 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryMutationGenerationStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### 声明

```text
export interface MemoryMutationGenerationStore {
    current(scopeHash: string): Promise<string>;
    advance(scopeHash: string, operationId: string): Promise<string>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `advance` | 方法 | <code>advance(scopeHash: string, operationId: string): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `current` | 方法 | <code>current(scopeHash: string): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryProjectionInvalidationPort`

Memory Projection Invalidation Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProjectionInvalidationPort } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### 声明

```text
export interface MemoryProjectionInvalidationPort {
    invalidate(request: MemoryProjectionInvalidationRequest): Promise<MemoryProjectionInvalidationReceipt>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `invalidate` | 方法 | <code>invalidate(request: MemoryProjectionInvalidationRequest): Promise&lt;MemoryProjectionInvalidationReceipt&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryProjectionInvalidationReceipt`

Memory Projection Invalidation Receipt 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProjectionInvalidationReceipt } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### 声明

```text
export interface MemoryProjectionInvalidationReceipt {
    operationId: string;
    scopeHash: string;
    mutationGeneration: string;
    reason: MemoryProjectionInvalidationReason;
    targets: Array<{
        id: string;
        invalidatedEntries: number;
    }>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mutationGeneration` | 属性 | <code>mutationGeneration: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: MemoryProjectionInvalidationReason</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targets` | 属性 | <code>targets: { id: string; invalidatedEntries: number; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProjectionInvalidationRequest`

Memory Projection Invalidation Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProjectionInvalidationRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### 声明

```text
export interface MemoryProjectionInvalidationRequest {
    operationId: string;
    scope: ManagedMemoryScope;
    reason: MemoryProjectionInvalidationReason;
    memoryIds: string[];
    memoryVersionIds?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryIds` | 属性 | <code>memoryIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryVersionIds` | 属性 | <code>memoryVersionIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: MemoryProjectionInvalidationReason</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProjectionInvalidationTarget`

Memory Projection Invalidation Target 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProjectionInvalidationTarget } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### 声明

```text
export interface MemoryProjectionInvalidationTarget {
    readonly id: string;
    invalidateScope(scopeHash: string, mutationGeneration: string): Promise<number>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string, mutationGeneration: string): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryProjectionInvalidationReason`

Memory Projection Invalidation Reason 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryProjectionInvalidationReason } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### 声明

```text
export type MemoryProjectionInvalidationReason = 'updated' | 'deleted';
```
