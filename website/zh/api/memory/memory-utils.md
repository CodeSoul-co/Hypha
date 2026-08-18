# `@codesoul-co/hypha-memory` / `memory-utils`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-utils.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `hashMemoryContent` | 函数 | <code>hashMemoryContent(content: unknown): string</code> | 判断是否存在 h Memory Content。 |
| `hashMemoryScope` | 函数 | <code>hashMemoryScope(scope: ManagedMemoryScope): string</code> | 判断是否存在 h Memory Scope。 |
| `isNormalizedMemoryError` | 函数 | <code>isNormalizedMemoryError(value: unknown): value is NormalizedMemoryError</code> | 判断 Normalized Memory Error。 |
| `memoryError` | 函数 | <code>memoryError(code: NormalizedMemoryError["code"], message: string, retryable?: boolean, details?: Record&lt;string, unknown&gt;): NormalizedMemoryError</code> | memory Error 的公开运行时操作。 |
| `normalizeMemoryError` | 函数 | <code>normalizeMemoryError(error: unknown, fallbackCode?: NormalizedMemoryError["code"]): NormalizedMemoryError</code> | 规范化 Memory Error。 |
| `sha256` | 函数 | <code>sha256(value: unknown): string</code> | sha256 的公开运行时操作。 |
| `stableStringify` | 函数 | <code>stableStringify(value: unknown): string</code> | stable Stringify 的公开运行时操作。 |
