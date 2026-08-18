# `@codesoul-co/hypha-memory` / `hybrid`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/hybrid.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hybrid.ts)
- 导出数: **2**

## 模块用法

用于使用该功能边界的公共契约与操作。Hybrid 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  HybridMemoryProvider,
} from '@codesoul-co/hypha-memory';

import type {
  HybridMemoryProviderOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `HybridMemoryProvider` | 类 | <code>new HybridMemoryProvider(options: HybridMemoryProviderOptions): HybridMemoryProvider</code> | Hybrid Memory Provider 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `HybridMemoryProviderOptions` | 接口 | <code>interface HybridMemoryProviderOptions</code> | Hybrid Memory Provider Options 接口，共包含 5 个公开字段或方法。 |

## `HybridMemoryProvider`

Hybrid Memory Provider 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { HybridMemoryProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`hybrid`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hybrid.ts)

### 声明

```text
export declare class HybridMemoryProvider implements MemoryProvider {
    constructor(options: HybridMemoryProviderOptions);
    read(scope: MemoryScope, query: MemoryReadQuery): Promise<MemoryRecord[]>;
    search(scope: MemoryScope, query: MemorySearchQuery): Promise<MemorySearchResult[]>;
    write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise<MemoryWriteResult>;
    update(scope: MemoryScope, recordId: string, patch: Partial<MemoryRecord>): Promise<void>;
    invalidate(scope: MemoryScope, recordId: string, reason: string): Promise<void>;
    summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise<MemorySummary>;
    audit(scope: MemoryScope, _options?: MemoryAuditOptions): Promise<MemoryAuditReport>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `audit` | 方法 | <code>audit(scope: MemoryScope, _options?: MemoryAuditOptions): Promise&lt;MemoryAuditReport&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: HybridMemoryProviderOptions): HybridMemoryProvider</code> | 创建该类的实例。 |
| `invalidate` | 方法 | <code>invalidate(scope: MemoryScope, recordId: string, reason: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `read` | 方法 | <code>read(scope: MemoryScope, query: MemoryReadQuery): Promise&lt;MemoryRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(scope: MemoryScope, query: MemorySearchQuery): Promise&lt;MemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `summarize` | 方法 | <code>summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise&lt;MemorySummary&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(scope: MemoryScope, recordId: string, patch: Partial&lt;MemoryRecord&gt;): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `write` | 方法 | <code>write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise&lt;MemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `HybridMemoryProviderOptions`

Hybrid Memory Provider Options 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { HybridMemoryProviderOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`hybrid`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hybrid.ts)

### 声明

```text
export interface HybridMemoryProviderOptions {
    structured: StructuredStoreProvider;
    vector?: VectorIndexProvider;
    artifacts?: ArtifactStoreProvider;
    embeddings?: EmbeddingProvider;
    tableName?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts?: ArtifactStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `embeddings` | 属性 | <code>embeddings?: EmbeddingProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `structured` | 属性 | <code>structured: StructuredStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tableName` | 属性 | <code>tableName?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vector` | 属性 | <code>vector?: VectorIndexProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
