# `@codesoul-co/hypha-core` / `modules/execution-store/registry`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-store/registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/registry.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。Registry 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  ExecutionStoreRegistry,
} from '@codesoul-co/hypha-core';

import type {
  ExecutionStoreRegistration,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionStoreRegistry` | 类 | <code>new ExecutionStoreRegistry(): ExecutionStoreRegistry</code> | Provider-neutral DI registry for durable Execution stores. Core selects a factory but never imports a concrete database adapter. |
| `ExecutionStoreRegistration` | 接口 | <code>interface ExecutionStoreRegistration</code> | Execution Store Registration 接口，共包含 1 个公开字段或方法。 |

## `ExecutionStoreRegistry`

Provider-neutral DI registry for durable Execution stores. Core selects a factory but never imports a concrete database adapter.

- 种类: 类
- 导入: `import { ExecutionStoreRegistry } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/registry.ts)

### 声明

```text
export declare class ExecutionStoreRegistry {
    register(factory: ExecutionStoreFactory): void;
    unregister(storeId: string): boolean;
    list(): ExecutionStoreRegistration[];
    resolve(storeId: string): ExecutionStoreFactory;
    create(storeId: string): Promise<ExecutionStore>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): ExecutionStoreRegistry</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(storeId: string): Promise&lt;ExecutionStore&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): ExecutionStoreRegistration[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `register` | 方法 | <code>register(factory: ExecutionStoreFactory): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolve` | 方法 | <code>resolve(storeId: string): ExecutionStoreFactory</code> | 公开方法；参数与返回类型以签名列为准。 |
| `unregister` | 方法 | <code>unregister(storeId: string): boolean</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExecutionStoreRegistration`

Execution Store Registration 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionStoreRegistration } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/registry.ts)

### 声明

```text
export interface ExecutionStoreRegistration {
    storeId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `storeId` | 属性 | <code>storeId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
