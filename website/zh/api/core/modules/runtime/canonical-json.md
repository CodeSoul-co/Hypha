# `@codesoul-co/hypha-core` / `modules/runtime/canonical-json`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/canonical-json.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/canonical-json.ts)
- 导出数: **3**

## 模块用法

用于执行该边界的运行时行为。Canonical JSON 模块公开 2 函数、1 类型。

### 从包入口导入

```ts
import {
  canonicalizeJson,
  hashCanonicalJson,
} from '@codesoul-co/hypha-core';

import type {
  CanonicalJsonValue,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalizeJson` | 函数 | <code>canonicalizeJson(value: unknown): string</code> | Canonicalize JSON 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `hashCanonicalJson` | 函数 | <code>hashCanonicalJson(value: unknown): string</code> | Hash Canonical JSON 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `CanonicalJsonValue` | 类型 | <code>type CanonicalJsonValue = null &#124; boolean &#124; number &#124; string &#124; CanonicalJsonValue[] &#124; { [key: string]: CanonicalJsonValue; }</code> | Canonical JSON Value 公共类型别名；完整类型表达式见声明。 |

## `canonicalizeJson`

Canonicalize JSON 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { canonicalizeJson } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/canonical-json`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/canonical-json.ts)

### 声明

```text
export declare function canonicalizeJson(value: unknown): string;
```

### 调用签名

```text
canonicalizeJson(value: unknown): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `hashCanonicalJson`

Hash Canonical JSON 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { hashCanonicalJson } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/canonical-json`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/canonical-json.ts)

### 声明

```text
export declare function hashCanonicalJson(value: unknown): string;
```

### 调用签名

```text
hashCanonicalJson(value: unknown): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `CanonicalJsonValue`

Canonical JSON Value 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { CanonicalJsonValue } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/canonical-json`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/canonical-json.ts)

### 声明

```text
export type CanonicalJsonValue = null | boolean | number | string | CanonicalJsonValue[] | {
    [key: string]: CanonicalJsonValue;
};
```
