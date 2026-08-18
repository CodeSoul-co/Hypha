# `@codesoul-co/hypha-adapters-local` / `local-process-resource-accounting`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-resource-accounting.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-resource-accounting.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalProcessResourceAccountant` | 类 | <code>new LocalProcessResourceAccountant(): LocalProcessResourceAccountant</code> | Reports only evidence the host Local Process adapter can actually observe. |
| `LocalProcessResourceEvidence` | 接口 | <code>interface LocalProcessResourceEvidence</code> | Local Process Resource Evidence 的字段契约；完整字段见下表。 |

## `LocalProcessResourceAccountant` 公开成员

Reports only evidence the host Local Process adapter can actually observe.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `account` | 方法 | <code>account(result: LocalProcessRunResult): LocalProcessResourceEvidence</code> | account 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(): LocalProcessResourceAccountant</code> | 创建该类的实例。 |

## `LocalProcessResourceEvidence` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `usage` | 属性 | <code>usage: ExecutionResourceUsage</code> | usage 字段。 |
