# `@codesoul-co/hypha-inference` / `prompt`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 模块指南: [学习与组合说明](/zh/packages/inference)
- 源码: [`packages/inference/src/prompt.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultPromptCompiler` | 类 | <code>new DefaultPromptCompiler(): DefaultPromptCompiler</code> | Default Prompt Compiler 的运行时实现；公开构造函数与成员见下表。 |
| `normalizePromptInput` | 函数 | <code>normalizePromptInput(input: unknown): PromptMessage[]</code> | 规范化 Prompt Input。 |
| `normalizePromptInputFromInferenceRequest` | 函数 | <code>normalizePromptInputFromInferenceRequest(request: InferenceRequest): PromptCompileInput</code> | 规范化 Prompt Input From Inference Request。 |
| `renderMessages` | 函数 | <code>renderMessages(messages: PromptMessage[]): string</code> | render Messages 的公开运行时操作。 |

## `DefaultPromptCompiler` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compile` | 方法 | <code>compile&lt;TInput = unknown&gt;(input: PromptCompileInput&lt;TInput&gt;): Promise&lt;CompiledPrompt&gt;</code> | 编译 compile。 |
| `constructor` | 构造函数 | <code>(): DefaultPromptCompiler</code> | 创建该类的实例。 |
