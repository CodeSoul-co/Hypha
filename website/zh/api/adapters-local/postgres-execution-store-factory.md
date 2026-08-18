# `@codesoul-co/hypha-adapters-local` / `postgres-execution-store-factory`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/postgres-execution-store-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/postgres-execution-store-factory.ts)
- 导出数: **3**

## 模块用法

用于持久化并读取该边界的数据。Postgres execution store factory 模块公开 1 类、1 常量、1 类型。

### 从包入口导入

```ts
import {
  PostgresExecutionStoreFactory,
  POSTGRES_EXECUTION_STORE_ID,
} from '@codesoul-co/hypha-adapters-local';

import type {
  PostgresExecutionStoreFactoryOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `PostgresExecutionStoreFactory` | 类 | <code>new PostgresExecutionStoreFactory(options: PostgresExecutionStoreFactoryOptions): PostgresExecutionStoreFactory</code> | Composition adapter for the accepted Postgres Execution Store. Registration remains explicit: callers add this factory to the Core ExecutionStoreRegistry. |
| `POSTGRES_EXECUTION_STORE_ID` | 常量 | <code>const POSTGRES_EXECUTION_STORE_ID: "execution-store.postgres"</code> | 由 `postgres-execution-store-factory` 模块导出的 POSTGRES EXECUTION STORE ID 常量。 |
| `PostgresExecutionStoreFactoryOptions` | 类型 | <code>type PostgresExecutionStoreFactoryOptions = PostgresExecutionStoreConnectionOptions</code> | Postgres Execution Store Factory Options 公共类型别名；完整类型表达式见声明。 |

## `PostgresExecutionStoreFactory`

Composition adapter for the accepted Postgres Execution Store. Registration remains explicit: callers add this factory to the Core ExecutionStoreRegistry.

- 种类: 类
- 导入: `import { PostgresExecutionStoreFactory } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`postgres-execution-store-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/postgres-execution-store-factory.ts)

### 声明

```text
export declare class PostgresExecutionStoreFactory implements ExecutionStoreFactory {
    readonly storeId = "execution-store.postgres";
    constructor(options: PostgresExecutionStoreFactoryOptions);
    create(): Promise<ExecutionStore>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: PostgresExecutionStoreFactoryOptions): PostgresExecutionStoreFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(): Promise&lt;ExecutionStore&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `storeId` | 属性 | <code>readonly storeId: "execution-store.postgres"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `POSTGRES_EXECUTION_STORE_ID`

由 `postgres-execution-store-factory` 模块导出的 POSTGRES EXECUTION STORE ID 常量。

- 种类: 常量
- 导入: `import { POSTGRES_EXECUTION_STORE_ID } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`postgres-execution-store-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/postgres-execution-store-factory.ts)

### 声明

```text
export declare const POSTGRES_EXECUTION_STORE_ID: "execution-store.postgres";
```

## `PostgresExecutionStoreFactoryOptions`

Postgres Execution Store Factory Options 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { PostgresExecutionStoreFactoryOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`postgres-execution-store-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/postgres-execution-store-factory.ts)

### 声明

```text
export type PostgresExecutionStoreFactoryOptions = PostgresExecutionStoreConnectionOptions;
```
