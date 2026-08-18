# `@codesoul-co/hypha-inference` / `prompt`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Package guide: [learning and composition guide](/packages/inference)
- Source: [`packages/inference/src/prompt.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultPromptCompiler` | class | <code>new DefaultPromptCompiler(): DefaultPromptCompiler</code> | Runtime implementation for Default Prompt Compiler; see its public constructor and members below. |
| `normalizePromptInput` | function | <code>normalizePromptInput(input: unknown): PromptMessage[]</code> | Normalizes Prompt Input at this module boundary. |
| `normalizePromptInputFromInferenceRequest` | function | <code>normalizePromptInputFromInferenceRequest(request: InferenceRequest): PromptCompileInput</code> | Normalizes Prompt Input From Inference Request at this module boundary. |
| `renderMessages` | function | <code>renderMessages(messages: PromptMessage[]): string</code> | Public runtime operation for render Messages. |

## `DefaultPromptCompiler` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compile` | method | <code>compile&lt;TInput = unknown&gt;(input: PromptCompileInput&lt;TInput&gt;): Promise&lt;CompiledPrompt&gt;</code> | Compiles compile at this module boundary. |
| `constructor` | constructor | <code>(): DefaultPromptCompiler</code> | Creates an instance of this class. |
