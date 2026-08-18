# `@codesoul-co/hypha-memory` / `memory-utils`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-utils.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)
- 导出数: **7**

## 模块用法

用于使用该功能边界的公共契约与操作。Memory utils 模块公开 7 函数。

### 从包入口导入

```ts
import {
  hashMemoryContent,
  hashMemoryScope,
  isNormalizedMemoryError,
  memoryError,
  normalizeMemoryError,
  sha256,
  stableStringify,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 7 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `hashMemoryContent` | 函数 | <code>hashMemoryContent(content: unknown): string</code> | Hash Memory Content 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `hashMemoryScope` | 函数 | <code>hashMemoryScope(scope: ManagedMemoryScope): string</code> | Hash Memory Scope 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `isNormalizedMemoryError` | 函数 | <code>isNormalizedMemoryError(value: unknown): value is NormalizedMemoryError</code> | Is Normalized Memory Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `memoryError` | 函数 | <code>memoryError(code: NormalizedMemoryError["code"], message: string, retryable?: boolean, details?: Record&lt;string, unknown&gt;): NormalizedMemoryError</code> | Memory Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `normalizeMemoryError` | 函数 | <code>normalizeMemoryError(error: unknown, fallbackCode?: NormalizedMemoryError["code"]): NormalizedMemoryError</code> | Normalize Memory Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `sha256` | 函数 | <code>sha256(value: unknown): string</code> | Sha256 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `stableStringify` | 函数 | <code>stableStringify(value: unknown): string</code> | Stable Stringify 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `hashMemoryContent`

Hash Memory Content 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { hashMemoryContent } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-utils`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)

### 声明

```text
export declare function hashMemoryContent(content: unknown): string;
```

### 调用签名

```text
hashMemoryContent(content: unknown): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `content` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `hashMemoryScope`

Hash Memory Scope 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { hashMemoryScope } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-utils`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)

### 声明

```text
export declare function hashMemoryScope(scope: ManagedMemoryScope): string;
```

### 调用签名

```text
hashMemoryScope(scope: ManagedMemoryScope): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `scope` | <code>ManagedMemoryScope</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `isNormalizedMemoryError`

Is Normalized Memory Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { isNormalizedMemoryError } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-utils`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)

### 声明

```text
export declare function isNormalizedMemoryError(value: unknown): value is NormalizedMemoryError;
```

### 调用签名

```text
isNormalizedMemoryError(value: unknown): value is NormalizedMemoryError
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `value is NormalizedMemoryError`
- 说明: 返回值契约由上述类型定义。

## `memoryError`

Memory Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { memoryError } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-utils`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)

### 声明

```text
export declare function memoryError(code: NormalizedMemoryError['code'], message: string, retryable?: boolean, details?: Record<string, unknown>): NormalizedMemoryError;
```

### 调用签名

```text
memoryError(code: NormalizedMemoryError["code"], message: string, retryable?: boolean, details?: Record<string, unknown>): NormalizedMemoryError
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `code` | <code>"MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; "MEMORY_PROVIDER_TIMEOUT"...</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `message` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `retryable` | <code>boolean</code> | 否 | 可选参数；接受的值由类型列定义。 |
| `details` | <code>Record&lt;string, unknown&gt;</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `NormalizedMemoryError`
- 说明: 返回值契约由上述类型定义。

## `normalizeMemoryError`

Normalize Memory Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizeMemoryError } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-utils`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)

### 声明

```text
export declare function normalizeMemoryError(error: unknown, fallbackCode?: NormalizedMemoryError['code']): NormalizedMemoryError;
```

### 调用签名

```text
normalizeMemoryError(error: unknown, fallbackCode?: NormalizedMemoryError["code"]): NormalizedMemoryError
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `fallbackCode` | <code>"MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; "MEMORY_PROVIDER_TIMEOUT"...</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `NormalizedMemoryError`
- 说明: 返回值契约由上述类型定义。

## `sha256`

Sha256 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { sha256 } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-utils`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)

### 声明

```text
export declare function sha256(value: unknown): string;
```

### 调用签名

```text
sha256(value: unknown): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `stableStringify`

Stable Stringify 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { stableStringify } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-utils`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)

### 声明

```text
export declare function stableStringify(value: unknown): string;
```

### 调用签名

```text
stableStringify(value: unknown): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。
