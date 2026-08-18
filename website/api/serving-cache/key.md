# `@codesoul-co/hypha-serving-cache` / `key`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Source: [`packages/serving-cache/src/key.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)
- Exports: **6**

## Using this module

Use the Key module for using the public contracts and operations for this capability boundary. It exports 6 functions.

### Import from the package entrypoint

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

### Usage patterns

- The module exposes 6 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `buildPromptPrefixMetadata` | function | <code>buildPromptPrefixMetadata(input: LLMCacheKeyInput): PromptPrefixMetadata</code> | Build Prompt Prefix Metadata function with 1 public call signature; parameters and return types are listed below. |
| `canonicalize` | function | <code>canonicalize(value: unknown): unknown</code> | Canonicalize function with 1 public call signature; parameters and return types are listed below. |
| `createLLMCacheKey` | function | <code>createLLMCacheKey(input: LLMCacheKeyInput): string</code> | Create LLM Cache Key function with 1 public call signature; parameters and return types are listed below. |
| `hashStableJson` | function | <code>hashStableJson(value: unknown): string</code> | Hash Stable JSON function with 1 public call signature; parameters and return types are listed below. |
| `normalizeLLMCacheKeyInput` | function | <code>normalizeLLMCacheKeyInput(input: LLMCacheKeyInput): LLMCacheKeyInput</code> | Normalize LLM Cache Key Input function with 1 public call signature; parameters and return types are listed below. |
| `stableJson` | function | <code>stableJson(value: unknown): string</code> | Stable JSON function with 1 public call signature; parameters and return types are listed below. |

## `buildPromptPrefixMetadata`

Build Prompt Prefix Metadata function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { buildPromptPrefixMetadata } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`key`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)

### Declaration

```text
export declare function buildPromptPrefixMetadata(input: LLMCacheKeyInput): PromptPrefixMetadata;
```

### Call signature

```text
buildPromptPrefixMetadata(input: LLMCacheKeyInput): PromptPrefixMetadata
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>LLMCacheKeyInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `PromptPrefixMetadata`
- Description: The return contract is defined by the type shown above.

## `canonicalize`

Canonicalize function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { canonicalize } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`key`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)

### Declaration

```text
export declare function canonicalize(value: unknown): unknown;
```

### Call signature

```text
canonicalize(value: unknown): unknown
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `unknown`
- Description: The return contract is defined by the type shown above.

## `createLLMCacheKey`

Create LLM Cache Key function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createLLMCacheKey } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`key`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)

### Declaration

```text
export declare function createLLMCacheKey(input: LLMCacheKeyInput): string;
```

### Call signature

```text
createLLMCacheKey(input: LLMCacheKeyInput): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>LLMCacheKeyInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `hashStableJson`

Hash Stable JSON function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { hashStableJson } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`key`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)

### Declaration

```text
export declare function hashStableJson(value: unknown): string;
```

### Call signature

```text
hashStableJson(value: unknown): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `normalizeLLMCacheKeyInput`

Normalize LLM Cache Key Input function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizeLLMCacheKeyInput } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`key`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)

### Declaration

```text
export declare function normalizeLLMCacheKeyInput(input: LLMCacheKeyInput): LLMCacheKeyInput;
```

### Call signature

```text
normalizeLLMCacheKeyInput(input: LLMCacheKeyInput): LLMCacheKeyInput
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>LLMCacheKeyInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `LLMCacheKeyInput`
- Description: The return contract is defined by the type shown above.

## `stableJson`

Stable JSON function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { stableJson } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`key`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)

### Declaration

```text
export declare function stableJson(value: unknown): string;
```

### Call signature

```text
stableJson(value: unknown): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.
