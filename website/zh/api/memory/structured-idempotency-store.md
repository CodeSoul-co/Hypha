# `@codesoul-co/hypha-memory` / `structured-idempotency-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/structured-idempotency-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-idempotency-store.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `StructuredMemoryIdempotencyStore` | 类 | <code>new StructuredMemoryIdempotencyStore(options: StructuredMemoryIdempotencyStoreOptions): StructuredMemoryIdempotencyStore</code> | Durable idempotency results used to reconcile retries after process restart. |
| `StructuredMemoryIdempotencyStoreOptions` | 接口 | <code>interface StructuredMemoryIdempotencyStoreOptions</code> | Structured Memory Idempotency Store Options 的字段契约；完整字段见下表。 |

## `StructuredMemoryIdempotencyStore` 公开成员

Durable idempotency results used to reconcile retries after process restart.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: StructuredMemoryIdempotencyStoreOptions): StructuredMemoryIdempotencyStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scopeHash: string, key: string): Promise&lt;unknown &#124; null&gt;</code> | 读取 get。 |
| `set` | 方法 | <code>set(scopeHash: string, key: string, result: unknown): Promise&lt;void&gt;</code> | 写入 set。 |

## `StructuredMemoryIdempotencyStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `store` | 属性 | <code>store: StructuredStoreProvider</code> | store 字段。 |
| `table` | 属性 | <code>table: string</code> | table 字段。 |
