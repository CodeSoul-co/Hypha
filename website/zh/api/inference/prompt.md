# `@codesoul-co/hypha-inference` / `prompt`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 源码: [`packages/inference/src/prompt.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts)
- 导出数: **4**

## 模块用法

用于使用该功能边界的公共契约与操作。Prompt 模块公开 1 类、3 函数。

### 从包入口导入

```ts
import {
  DefaultPromptCompiler,
  normalizePromptInput,
  normalizePromptInputFromInferenceRequest,
  renderMessages,
} from '@codesoul-co/hypha-inference';
```

### 使用要点

- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultPromptCompiler` | 类 | <code>new DefaultPromptCompiler(): DefaultPromptCompiler</code> | Default Prompt Compiler 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `normalizePromptInput` | 函数 | <code>normalizePromptInput(input: unknown): PromptMessage[]</code> | Normalize Prompt Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `normalizePromptInputFromInferenceRequest` | 函数 | <code>normalizePromptInputFromInferenceRequest(request: InferenceRequest): PromptCompileInput</code> | Normalize Prompt Input From Inference Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `renderMessages` | 函数 | <code>renderMessages(messages: PromptMessage[]): string</code> | Render Messages 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `DefaultPromptCompiler`

Default Prompt Compiler 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultPromptCompiler } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts)

### 声明

```text
export declare class DefaultPromptCompiler implements PromptCompiler {
    compile<TInput = unknown>(input: PromptCompileInput<TInput>): Promise<CompiledPrompt>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compile` | 方法 | <code>compile&lt;TInput = unknown&gt;(input: PromptCompileInput&lt;TInput&gt;): Promise&lt;CompiledPrompt&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): DefaultPromptCompiler</code> | 创建该类的实例。 |

## `normalizePromptInput`

Normalize Prompt Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizePromptInput } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts)

### 声明

```text
export declare function normalizePromptInput(input: unknown): PromptMessage[];
```

### 调用签名

```text
normalizePromptInput(input: unknown): PromptMessage[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `PromptMessage[]`
- 说明: 返回值契约由上述类型定义。

## `normalizePromptInputFromInferenceRequest`

Normalize Prompt Input From Inference Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizePromptInputFromInferenceRequest } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts)

### 声明

```text
export declare function normalizePromptInputFromInferenceRequest(request: InferenceRequest): PromptCompileInput;
```

### 调用签名

```text
normalizePromptInputFromInferenceRequest(request: InferenceRequest): PromptCompileInput
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `request` | <code>InferenceRequest&lt;unknown&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `PromptCompileInput<unknown>`
- 说明: 返回值契约由上述类型定义。

## `renderMessages`

Render Messages 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { renderMessages } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts)

### 声明

```text
export declare function renderMessages(messages: PromptMessage[]): string;
```

### 调用签名

```text
renderMessages(messages: PromptMessage[]): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `messages` | <code>PromptMessage[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。
