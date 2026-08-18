# `@codesoul-co/hypha-serving-cache` / `key`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 模块指南: [学习与组合说明](/zh/packages/serving-cache)
- 源码: [`packages/serving-cache/src/key.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `buildPromptPrefixMetadata` | 函数 | <code>buildPromptPrefixMetadata(input: LLMCacheKeyInput): PromptPrefixMetadata</code> | 构建 Prompt Prefix Metadata。 |
| `canonicalize` | 函数 | <code>canonicalize(value: unknown): unknown</code> | 判断能否 onicalize。 |
| `createLLMCacheKey` | 函数 | <code>createLLMCacheKey(input: LLMCacheKeyInput): string</code> | 创建 LLM Cache Key。 |
| `hashStableJson` | 函数 | <code>hashStableJson(value: unknown): string</code> | 判断是否存在 h Stable Json。 |
| `normalizeLLMCacheKeyInput` | 函数 | <code>normalizeLLMCacheKeyInput(input: LLMCacheKeyInput): LLMCacheKeyInput</code> | 规范化 LLM Cache Key Input。 |
| `stableJson` | 函数 | <code>stableJson(value: unknown): string</code> | stable Json 的公开运行时操作。 |
