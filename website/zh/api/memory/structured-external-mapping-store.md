# `@codesoul-co/hypha-memory` / `structured-external-mapping-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/structured-external-mapping-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-external-mapping-store.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。Structured external mapping store 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  StructuredExternalMemoryMappingStore,
} from '@codesoul-co/hypha-memory';

import type {
  StructuredExternalMemoryMappingStoreOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `StructuredExternalMemoryMappingStore` | 类 | <code>new StructuredExternalMemoryMappingStore(options: StructuredExternalMemoryMappingStoreOptions): StructuredExternalMemoryMappingStore</code> | Persistent, restart-safe mapping between Hypha memory IDs and provider IDs. |
| `StructuredExternalMemoryMappingStoreOptions` | 接口 | <code>interface StructuredExternalMemoryMappingStoreOptions</code> | Structured External Memory Mapping Store Options 接口，共包含 2 个公开字段或方法。 |

## `StructuredExternalMemoryMappingStore`

Persistent, restart-safe mapping between Hypha memory IDs and provider IDs.

- 种类: 类
- 导入: `import { StructuredExternalMemoryMappingStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-external-mapping-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-external-mapping-store.ts)

### 声明

```text
export declare class StructuredExternalMemoryMappingStore implements ExternalMemoryMappingStore {
    readonly durability: "durable";
    constructor(options: StructuredExternalMemoryMappingStoreOptions);
    get(providerId: string, memoryId: string): Promise<ExternalMemoryMapping | null>;
    getByExternalId(providerId: string, externalId: string): Promise<ExternalMemoryMapping | null>;
    set(mapping: ExternalMemoryMapping): Promise<void>;
    list(providerId: string): Promise<ExternalMemoryMapping[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: StructuredExternalMemoryMappingStoreOptions): StructuredExternalMemoryMappingStore</code> | 创建该类的实例。 |
| `durability` | 属性 | <code>readonly durability: "durable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `get` | 方法 | <code>get(providerId: string, memoryId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getByExternalId` | 方法 | <code>getByExternalId(providerId: string, externalId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(providerId: string): Promise&lt;ExternalMemoryMapping[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(mapping: ExternalMemoryMapping): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `StructuredExternalMemoryMappingStoreOptions`

Structured External Memory Mapping Store Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StructuredExternalMemoryMappingStoreOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-external-mapping-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-external-mapping-store.ts)

### 声明

```text
export interface StructuredExternalMemoryMappingStoreOptions {
    store: StructuredStoreProvider;
    table?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `store` | 属性 | <code>store: StructuredStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `table` | 属性 | <code>table?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
