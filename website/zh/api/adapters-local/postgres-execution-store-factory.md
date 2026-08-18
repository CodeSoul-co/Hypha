# `@codesoul-co/hypha-adapters-local` / `postgres-execution-store-factory`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/postgres-execution-store-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/postgres-execution-store-factory.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `PostgresExecutionStoreFactory` | 类 | <code>new PostgresExecutionStoreFactory(options: PostgresExecutionStoreFactoryOptions): PostgresExecutionStoreFactory</code> | Composition adapter for the accepted Postgres Execution Store. Registration remains explicit: callers add this factory to the Core ExecutionStoreRegistry. |
| `POSTGRES_EXECUTION_STORE_ID` | 常量 | <code>const POSTGRES_EXECUTION_STORE_ID: "execution-store.postgres"</code> | 由 `postgres-execution-store-factory` 模块导出的 POSTGRES EXECUTION STORE ID 常量。 |
| `PostgresExecutionStoreFactoryOptions` | 类型 | <code>type PostgresExecutionStoreFactoryOptions = PostgresExecutionStoreConnectionOptions</code> | Postgres Execution Store Factory Options 的公共类型别名。 |

## `PostgresExecutionStoreFactory` 公开成员

Composition adapter for the accepted Postgres Execution Store. Registration remains explicit: callers add this factory to the Core ExecutionStoreRegistry.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: PostgresExecutionStoreFactoryOptions): PostgresExecutionStoreFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(): Promise&lt;ExecutionStore&gt;</code> | 创建 create。 |
| `storeId` | 属性 | <code>storeId: "execution-store.postgres"</code> | store Id 字段。 |
