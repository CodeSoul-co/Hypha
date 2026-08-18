# `@codesoul-co/hypha-adapters-local` / `sqlite-execution-store-factory`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/sqlite-execution-store-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store-factory.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。Sqlite execution store factory 模块公开 1 类、1 常量。

### 从包入口导入

```ts
import {
  SQLiteExecutionStoreFactory,
  SQLITE_EXECUTION_STORE_ID,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteExecutionStoreFactory` | 类 | <code>new SQLiteExecutionStoreFactory(options: SQLiteExecutionStoreOptions): SQLiteExecutionStoreFactory</code> | SQLite Execution Store Factory 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SQLITE_EXECUTION_STORE_ID` | 常量 | <code>const SQLITE_EXECUTION_STORE_ID: "execution-store.sqlite"</code> | 由 `sqlite-execution-store-factory` 模块导出的 SQLITE EXECUTION STORE ID 常量。 |

## `SQLiteExecutionStoreFactory`

SQLite Execution Store Factory 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SQLiteExecutionStoreFactory } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`sqlite-execution-store-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store-factory.ts)

### 声明

```text
export declare class SQLiteExecutionStoreFactory implements ExecutionStoreFactory {
    readonly storeId = "execution-store.sqlite";
    constructor(options: SQLiteExecutionStoreOptions);
    create(): Promise<ExecutionStore>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: SQLiteExecutionStoreOptions): SQLiteExecutionStoreFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(): Promise&lt;ExecutionStore&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `storeId` | 属性 | <code>readonly storeId: "execution-store.sqlite"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SQLITE_EXECUTION_STORE_ID`

由 `sqlite-execution-store-factory` 模块导出的 SQLITE EXECUTION STORE ID 常量。

- 种类: 常量
- 导入: `import { SQLITE_EXECUTION_STORE_ID } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`sqlite-execution-store-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store-factory.ts)

### 声明

```text
export declare const SQLITE_EXECUTION_STORE_ID: "execution-store.sqlite";
```
