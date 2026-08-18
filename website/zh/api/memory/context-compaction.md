# `@codesoul-co/hypha-memory` / `context-compaction`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/context-compaction.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-compaction.ts)
- 导出数: **3**

## 模块用法

用于使用该功能边界的公共契约与操作。Context compaction 模块公开 1 类、2 接口。

### 从包入口导入

```ts
import {
  DeterministicExtractiveContextCompactor,
} from '@codesoul-co/hypha-memory';

import type {
  ContextCompactionRequest,
  ContextCompactor,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DeterministicExtractiveContextCompactor` | 类 | <code>new DeterministicExtractiveContextCompactor(): DeterministicExtractiveContextCompactor</code> | Deterministic Extractive Context Compactor 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ContextCompactionRequest` | 接口 | <code>interface ContextCompactionRequest</code> | Context Compaction Request 接口，共包含 4 个公开字段或方法。 |
| `ContextCompactor` | 接口 | <code>interface ContextCompactor</code> | Context Compactor 接口，共包含 2 个公开字段或方法。 |

## `DeterministicExtractiveContextCompactor`

Deterministic Extractive Context Compactor 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DeterministicExtractiveContextCompactor } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-compaction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-compaction.ts)

### 声明

```text
export declare class DeterministicExtractiveContextCompactor implements ContextCompactor {
    readonly id = "context.compactor.extractive-v1";
    compact(request: ContextCompactionRequest): Promise<ContextItem | null>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compact` | 方法 | <code>compact(request: ContextCompactionRequest): Promise&lt;ContextItem &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): DeterministicExtractiveContextCompactor</code> | 创建该类的实例。 |
| `id` | 属性 | <code>readonly id: "context.compactor.extractive-v1"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextCompactionRequest`

Context Compaction Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextCompactionRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-compaction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-compaction.ts)

### 声明

```text
export interface ContextCompactionRequest {
    items: ContextItem[];
    maxTokens: number;
    tokenizer: TokenEstimator;
    sourceId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `items` | 属性 | <code>items: ContextItem[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTokens` | 属性 | <code>maxTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceId` | 属性 | <code>sourceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenizer` | 属性 | <code>tokenizer: TokenEstimator</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextCompactor`

Context Compactor 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextCompactor } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-compaction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-compaction.ts)

### 声明

```text
export interface ContextCompactor {
    readonly id: string;
    compact(request: ContextCompactionRequest): Promise<ContextItem | null>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compact` | 方法 | <code>compact(request: ContextCompactionRequest): Promise&lt;ContextItem &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
