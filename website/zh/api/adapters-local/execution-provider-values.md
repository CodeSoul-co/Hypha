# `@codesoul-co/hypha-adapters-local` / `execution-provider-values`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/execution-provider-values.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/execution-provider-values.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cloneExecutionValue` | 函数 | <code>cloneExecutionValue&lt;T&gt;(value: T): T</code> | clone Execution Value 的公开运行时操作。 |
| `hashExecutionBytes` | 函数 | <code>hashExecutionBytes(value: Uint8Array): string</code> | 判断是否存在 h Execution Bytes。 |
| `hashExecutionText` | 函数 | <code>hashExecutionText(value: string): string</code> | 判断是否存在 h Execution Text。 |
| `hashExecutionValue` | 函数 | <code>hashExecutionValue(value: unknown): string</code> | 判断是否存在 h Execution Value。 |
| `shortExecutionHash` | 函数 | <code>shortExecutionHash(value: string, length?: number): string</code> | short Execution Hash 的公开运行时操作。 |
