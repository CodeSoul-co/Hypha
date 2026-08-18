# `@codesoul-co/hypha-adapters-local` / `sqlite-execution-store-factory`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/sqlite-execution-store-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store-factory.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteExecutionStoreFactory` | 类 | <code>new SQLiteExecutionStoreFactory(options: SQLiteExecutionStoreOptions): SQLiteExecutionStoreFactory</code> | SQ Lite Execution Store Factory 的运行时实现；公开构造函数与成员见下表。 |
| `SQLITE_EXECUTION_STORE_ID` | 常量 | <code>const SQLITE_EXECUTION_STORE_ID: "execution-store.sqlite"</code> | 由 `sqlite-execution-store-factory` 模块导出的 SQLITE EXECUTION STORE ID 常量。 |

## `SQLiteExecutionStoreFactory` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: SQLiteExecutionStoreOptions): SQLiteExecutionStoreFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(): Promise&lt;ExecutionStore&gt;</code> | 创建 create。 |
| `storeId` | 属性 | <code>storeId: "execution-store.sqlite"</code> | store Id 字段。 |
