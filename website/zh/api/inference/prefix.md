# `@codesoul-co/hypha-inference` / `prefix`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 模块指南: [学习与组合说明](/zh/packages/inference)
- 源码: [`packages/inference/src/prefix.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prefix.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultPrefixSegmenter` | 类 | <code>new DefaultPrefixSegmenter(): DefaultPrefixSegmenter</code> | Default Prefix Segmenter 的运行时实现；公开构造函数与成员见下表。 |
| `estimateTokenCount` | 函数 | <code>estimateTokenCount(content: string): number</code> | estimate Token Count 的公开运行时操作。 |

## `DefaultPrefixSegmenter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DefaultPrefixSegmenter</code> | 创建该类的实例。 |
| `segment` | 方法 | <code>segment(prompt: CompiledPrompt): Promise&lt;PrefixSegmentationResult&gt;</code> | segment 的公开运行时操作。 |
