# `@codesoul-co/hypha-core` / `modules/execution-store/registry`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/execution-store/registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/registry.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionStoreRegistry` | 类 | <code>new ExecutionStoreRegistry(): ExecutionStoreRegistry</code> | Provider-neutral DI registry for durable Execution stores. Core selects a factory but never imports a concrete database adapter. |
| `ExecutionStoreRegistration` | 接口 | <code>interface ExecutionStoreRegistration</code> | Execution Store Registration 的字段契约；完整字段见下表。 |

## `ExecutionStoreRegistry` 公开成员

Provider-neutral DI registry for durable Execution stores. Core selects a factory but never imports a concrete database adapter.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): ExecutionStoreRegistry</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(storeId: string): Promise&lt;ExecutionStore&gt;</code> | 创建 create。 |
| `list` | 方法 | <code>list(): ExecutionStoreRegistration[]</code> | 列出 list。 |
| `register` | 方法 | <code>register(factory: ExecutionStoreFactory): void</code> | 注册 register。 |
| `resolve` | 方法 | <code>resolve(storeId: string): ExecutionStoreFactory</code> | 解析 resolve。 |
| `unregister` | 方法 | <code>unregister(storeId: string): boolean</code> | unregister 的公开运行时操作。 |

## `ExecutionStoreRegistration` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `storeId` | 属性 | <code>storeId: string</code> | store Id 字段。 |
