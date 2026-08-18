# `@codesoul-co/hypha-serving-cache` / `key`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 源码: [`packages/serving-cache/src/key.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)
- 导出数: **6**

## 模块用法

用于使用该功能边界的公共契约与操作。Key 模块公开 6 函数。

### 从包入口导入

```ts
import {
  buildPromptPrefixMetadata,
  canonicalize,
  createLLMCacheKey,
  hashStableJson,
  normalizeLLMCacheKeyInput,
  stableJson,
} from '@codesoul-co/hypha-serving-cache';
```

### 使用要点

- 6 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `buildPromptPrefixMetadata` | 函数 | <code>buildPromptPrefixMetadata(input: LLMCacheKeyInput): PromptPrefixMetadata</code> | Build Prompt Prefix Metadata 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `canonicalize` | 函数 | <code>canonicalize(value: unknown): unknown</code> | Canonicalize 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createLLMCacheKey` | 函数 | <code>createLLMCacheKey(input: LLMCacheKeyInput): string</code> | Create LLM Cache Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `hashStableJson` | 函数 | <code>hashStableJson(value: unknown): string</code> | Hash Stable JSON 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `normalizeLLMCacheKeyInput` | 函数 | <code>normalizeLLMCacheKeyInput(input: LLMCacheKeyInput): LLMCacheKeyInput</code> | Normalize LLM Cache Key Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `stableJson` | 函数 | <code>stableJson(value: unknown): string</code> | Stable JSON 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `buildPromptPrefixMetadata`

Build Prompt Prefix Metadata 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { buildPromptPrefixMetadata } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`key`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)

### 声明

```text
export declare function buildPromptPrefixMetadata(input: LLMCacheKeyInput): PromptPrefixMetadata;
```

### 调用签名

```text
buildPromptPrefixMetadata(input: LLMCacheKeyInput): PromptPrefixMetadata
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>LLMCacheKeyInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `PromptPrefixMetadata`
- 说明: 返回值契约由上述类型定义。

## `canonicalize`

Canonicalize 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { canonicalize } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`key`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)

### 声明

```text
export declare function canonicalize(value: unknown): unknown;
```

### 调用签名

```text
canonicalize(value: unknown): unknown
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `unknown`
- 说明: 返回值契约由上述类型定义。

## `createLLMCacheKey`

Create LLM Cache Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createLLMCacheKey } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`key`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)

### 声明

```text
export declare function createLLMCacheKey(input: LLMCacheKeyInput): string;
```

### 调用签名

```text
createLLMCacheKey(input: LLMCacheKeyInput): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>LLMCacheKeyInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `hashStableJson`

Hash Stable JSON 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { hashStableJson } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`key`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)

### 声明

```text
export declare function hashStableJson(value: unknown): string;
```

### 调用签名

```text
hashStableJson(value: unknown): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `normalizeLLMCacheKeyInput`

Normalize LLM Cache Key Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizeLLMCacheKeyInput } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`key`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)

### 声明

```text
export declare function normalizeLLMCacheKeyInput(input: LLMCacheKeyInput): LLMCacheKeyInput;
```

### 调用签名

```text
normalizeLLMCacheKeyInput(input: LLMCacheKeyInput): LLMCacheKeyInput
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>LLMCacheKeyInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `LLMCacheKeyInput`
- 说明: 返回值契约由上述类型定义。

## `stableJson`

Stable JSON 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { stableJson } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`key`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)

### 声明

```text
export declare function stableJson(value: unknown): string;
```

### 调用签名

```text
stableJson(value: unknown): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。
