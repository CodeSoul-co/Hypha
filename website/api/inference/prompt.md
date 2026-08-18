# `@codesoul-co/hypha-inference` / `prompt`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Source: [`packages/inference/src/prompt.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts)
- Exports: **4**

## Using this module

Use the Prompt module for using the public contracts and operations for this capability boundary. It exports 1 class, 3 functions.

### Import from the package entrypoint

```ts
import {
  DefaultPromptCompiler,
  normalizePromptInput,
  normalizePromptInputFromInferenceRequest,
  renderMessages,
} from '@codesoul-co/hypha-inference';
```

### Usage patterns

- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultPromptCompiler` | class | <code>new DefaultPromptCompiler(): DefaultPromptCompiler</code> | Default Prompt Compiler class with 2 public constructor or member entries; its exact declarations are listed below. |
| `normalizePromptInput` | function | <code>normalizePromptInput(input: unknown): PromptMessage[]</code> | Normalize Prompt Input function with 1 public call signature; parameters and return types are listed below. |
| `normalizePromptInputFromInferenceRequest` | function | <code>normalizePromptInputFromInferenceRequest(request: InferenceRequest): PromptCompileInput</code> | Normalize Prompt Input From Inference Request function with 1 public call signature; parameters and return types are listed below. |
| `renderMessages` | function | <code>renderMessages(messages: PromptMessage[]): string</code> | Render Messages function with 1 public call signature; parameters and return types are listed below. |

## `DefaultPromptCompiler`

Default Prompt Compiler class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultPromptCompiler } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts)

### Declaration

```text
export declare class DefaultPromptCompiler implements PromptCompiler {
    compile<TInput = unknown>(input: PromptCompileInput<TInput>): Promise<CompiledPrompt>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compile` | method | <code>compile&lt;TInput = unknown&gt;(input: PromptCompileInput&lt;TInput&gt;): Promise&lt;CompiledPrompt&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): DefaultPromptCompiler</code> | Creates an instance of this class. |

## `normalizePromptInput`

Normalize Prompt Input function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizePromptInput } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts)

### Declaration

```text
export declare function normalizePromptInput(input: unknown): PromptMessage[];
```

### Call signature

```text
normalizePromptInput(input: unknown): PromptMessage[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `PromptMessage[]`
- Description: The return contract is defined by the type shown above.

## `normalizePromptInputFromInferenceRequest`

Normalize Prompt Input From Inference Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizePromptInputFromInferenceRequest } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts)

### Declaration

```text
export declare function normalizePromptInputFromInferenceRequest(request: InferenceRequest): PromptCompileInput;
```

### Call signature

```text
normalizePromptInputFromInferenceRequest(request: InferenceRequest): PromptCompileInput
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `request` | <code>InferenceRequest&lt;unknown&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `PromptCompileInput<unknown>`
- Description: The return contract is defined by the type shown above.

## `renderMessages`

Render Messages function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { renderMessages } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts)

### Declaration

```text
export declare function renderMessages(messages: PromptMessage[]): string;
```

### Call signature

```text
renderMessages(messages: PromptMessage[]): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `messages` | <code>PromptMessage[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.
