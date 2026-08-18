# `@codesoul-co/hypha-tools` / `common-tools`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 源码: [`packages/tools/src/common-tools.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)
- 导出数: **17**

## 模块用法

用于使用该功能边界的公共契约与操作。Common tools 模块公开 6 常量、5 函数、2 接口、4 类型。

### 从包入口导入

```ts
import {
  COMMON_TOOL_LIMITS,
  commonUtilityToolSpecs,
  hashUtilityToolSpec,
  jsonUtilityToolSpec,
  textUtilityToolSpec,
  timeUtilityToolSpec,
  executeHashUtility,
  executeJsonUtility,
} from '@codesoul-co/hypha-tools';

import type {
  JsonObject,
  TextUtilityInput,
  HashUtilityInput,
  JsonUtilityInput,
  JsonValue,
  TimeUtilityInput,
} from '@codesoul-co/hypha-tools';

// 完整导出列表见下方。
```

### 使用要点

- 6 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 5 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 6 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `COMMON_TOOL_LIMITS` | 常量 | <code>const COMMON_TOOL_LIMITS: Readonly&lt;{ maxTextCharacters: 1000000; maxJsonDepth: 64; maxJsonNodes: 100000; maxPointerSegments: 128; maxMatches: 1000; maxQueryCharacters: 4096; }&gt;</code> | 由 `common-tools` 模块导出的 COMMON TOOL LIMITS 常量。 |
| `commonUtilityToolSpecs` | 常量 | <code>const commonUtilityToolSpecs: readonly [ToolSpec, ToolSpec, ToolSpec, ToolSpec]</code> | 由 `common-tools` 模块导出的 Common Utility Tool Specs 常量。 |
| `hashUtilityToolSpec` | 常量 | <code>const hashUtilityToolSpec: ToolSpec</code> | 由 `common-tools` 模块导出的 Hash Utility Tool Spec 常量。 |
| `jsonUtilityToolSpec` | 常量 | <code>const jsonUtilityToolSpec: ToolSpec</code> | 由 `common-tools` 模块导出的 JSON Utility Tool Spec 常量。 |
| `textUtilityToolSpec` | 常量 | <code>const textUtilityToolSpec: ToolSpec</code> | 由 `common-tools` 模块导出的 Text Utility Tool Spec 常量。 |
| `timeUtilityToolSpec` | 常量 | <code>const timeUtilityToolSpec: ToolSpec</code> | 由 `common-tools` 模块导出的 Time Utility Tool Spec 常量。 |
| `executeHashUtility` | 函数 | <code>executeHashUtility(input: HashUtilityInput): Record&lt;string, unknown&gt;</code> | Execute Hash Utility 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `executeJsonUtility` | 函数 | <code>executeJsonUtility(input: JsonUtilityInput): Record&lt;string, unknown&gt;</code> | Execute JSON Utility 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `executeTextUtility` | 函数 | <code>executeTextUtility(input: TextUtilityInput): Record&lt;string, unknown&gt;</code> | Execute Text Utility 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `executeTimeUtility` | 函数 | <code>executeTimeUtility(input: TimeUtilityInput, now?: () =&gt; Date): Record&lt;string, unknown&gt;</code> | Execute Time Utility 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `sanitizeJsonValue` | 函数 | <code>sanitizeJsonValue(value: unknown): JsonValue</code> | Sanitize JSON Value 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `JsonObject` | 接口 | <code>interface JsonObject</code> | JSON Object 接口，共包含 0 个公开字段或方法。 |
| `TextUtilityInput` | 接口 | <code>interface TextUtilityInput</code> | Text Utility Input 接口，共包含 11 个公开字段或方法。 |
| `HashUtilityInput` | 类型 | <code>type HashUtilityInput = { operation: 'sha256_text'; text: string; } &#124; { operation: 'sha256_json'; value: unknown; }</code> | Hash Utility Input 公共类型别名；完整类型表达式见声明。 |
| `JsonUtilityInput` | 类型 | <code>type JsonUtilityInput = { operation: 'parse'; text: string; } &#124; { operation: 'stringify'; value: unknown; pretty?: boolean; } &#124; { operation: 'get'; value: unknown; pointer: string; } &#124; { operation: 'keys'; value: unknown; } &#124; { operation: 'validate'; value: unknown; schema: JsonSchema; }</code> | JSON Utility Input 公共类型别名；完整类型表达式见声明。 |
| `JsonValue` | 类型 | <code>type JsonValue = null &#124; boolean &#124; number &#124; string &#124; JsonValue[] &#124; JsonObject</code> | JSON Value 公共类型别名；完整类型表达式见声明。 |
| `TimeUtilityInput` | 类型 | <code>type TimeUtilityInput = { operation: 'now'; } &#124; { operation: 'parse'; value: string; } &#124; { operation: 'format'; value: string &#124; number; timeZone?: string; locale?: string; }</code> | Time Utility Input 公共类型别名；完整类型表达式见声明。 |

## `COMMON_TOOL_LIMITS`

由 `common-tools` 模块导出的 COMMON TOOL LIMITS 常量。

- 种类: 常量
- 导入: `import { COMMON_TOOL_LIMITS } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export declare const COMMON_TOOL_LIMITS: Readonly<{ maxTextCharacters: 1000000; maxJsonDepth: 64; maxJsonNodes: 100000; maxPointerSegments: 128; maxMatches: 1000; maxQueryCharacters: 4096; }>;
```

## `commonUtilityToolSpecs`

由 `common-tools` 模块导出的 Common Utility Tool Specs 常量。

- 种类: 常量
- 导入: `import { commonUtilityToolSpecs } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export declare const commonUtilityToolSpecs: readonly [ToolSpec, ToolSpec, ToolSpec, ToolSpec];
```

## `hashUtilityToolSpec`

由 `common-tools` 模块导出的 Hash Utility Tool Spec 常量。

- 种类: 常量
- 导入: `import { hashUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export declare const hashUtilityToolSpec: ToolSpec;
```

## `jsonUtilityToolSpec`

由 `common-tools` 模块导出的 JSON Utility Tool Spec 常量。

- 种类: 常量
- 导入: `import { jsonUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export declare const jsonUtilityToolSpec: ToolSpec;
```

## `textUtilityToolSpec`

由 `common-tools` 模块导出的 Text Utility Tool Spec 常量。

- 种类: 常量
- 导入: `import { textUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export declare const textUtilityToolSpec: ToolSpec;
```

## `timeUtilityToolSpec`

由 `common-tools` 模块导出的 Time Utility Tool Spec 常量。

- 种类: 常量
- 导入: `import { timeUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export declare const timeUtilityToolSpec: ToolSpec;
```

## `executeHashUtility`

Execute Hash Utility 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { executeHashUtility } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export declare function executeHashUtility(input: HashUtilityInput): Record<string, unknown>;
```

### 调用签名

```text
executeHashUtility(input: HashUtilityInput): Record<string, unknown>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>HashUtilityInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Record<string, unknown>`
- 说明: 返回值契约由上述类型定义。

## `executeJsonUtility`

Execute JSON Utility 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { executeJsonUtility } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export declare function executeJsonUtility(input: JsonUtilityInput): Record<string, unknown>;
```

### 调用签名

```text
executeJsonUtility(input: JsonUtilityInput): Record<string, unknown>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>JsonUtilityInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Record<string, unknown>`
- 说明: 返回值契约由上述类型定义。

## `executeTextUtility`

Execute Text Utility 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { executeTextUtility } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export declare function executeTextUtility(input: TextUtilityInput): Record<string, unknown>;
```

### 调用签名

```text
executeTextUtility(input: TextUtilityInput): Record<string, unknown>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>TextUtilityInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Record<string, unknown>`
- 说明: 返回值契约由上述类型定义。

## `executeTimeUtility`

Execute Time Utility 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { executeTimeUtility } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export declare function executeTimeUtility(input: TimeUtilityInput, now?: () => Date): Record<string, unknown>;
```

### 调用签名

```text
executeTimeUtility(input: TimeUtilityInput, now?: () => Date): Record<string, unknown>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>TimeUtilityInput</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `now` | <code>() =&gt; Date</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Record<string, unknown>`
- 说明: 返回值契约由上述类型定义。

## `sanitizeJsonValue`

Sanitize JSON Value 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { sanitizeJsonValue } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export declare function sanitizeJsonValue(value: unknown): JsonValue;
```

### 调用签名

```text
sanitizeJsonValue(value: unknown): JsonValue
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `JsonValue`
- 说明: 返回值契约由上述类型定义。

## `JsonObject`

JSON Object 接口，共包含 0 个公开字段或方法。

- 种类: 接口
- 导入: `import type { JsonObject } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export interface JsonObject {
    [key: string]: JsonValue;
}
```

## `TextUtilityInput`

Text Utility Input 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TextUtilityInput } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export interface TextUtilityInput {
    operation: 'length' | 'line_select' | 'literal_find' | 'literal_replace' | 'slice' | 'normalize_whitespace' | 'split' | 'join';
    text?: string;
    parts?: string[];
    separator?: string;
    start?: number;
    end?: number;
    query?: string;
    replacement?: string;
    caseSensitive?: boolean;
    maxResults?: number;
    mode?: 'spaces' | 'lines';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `caseSensitive` | 属性 | <code>caseSensitive?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `end` | 属性 | <code>end?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxResults` | 属性 | <code>maxResults?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode?: "spaces" &#124; "lines"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: "length" &#124; "line_select" &#124; "literal_find" &#124; "literal_replace" &#124; "slice" &#124; "normalize_whitespace" &#124; "split" &#124; "join"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `parts` | 属性 | <code>parts?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `query` | 属性 | <code>query?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `replacement` | 属性 | <code>replacement?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `separator` | 属性 | <code>separator?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `start` | 属性 | <code>start?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `text` | 属性 | <code>text?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `HashUtilityInput`

Hash Utility Input 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { HashUtilityInput } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export type HashUtilityInput = {
    operation: 'sha256_text';
    text: string;
} | {
    operation: 'sha256_json';
    value: unknown;
};
```

## `JsonUtilityInput`

JSON Utility Input 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { JsonUtilityInput } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export type JsonUtilityInput = {
    operation: 'parse';
    text: string;
} | {
    operation: 'stringify';
    value: unknown;
    pretty?: boolean;
} | {
    operation: 'get';
    value: unknown;
    pointer: string;
} | {
    operation: 'keys';
    value: unknown;
} | {
    operation: 'validate';
    value: unknown;
    schema: JsonSchema;
};
```

## `JsonValue`

JSON Value 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { JsonValue } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export type JsonValue = null | boolean | number | string | JsonValue[] | JsonObject;
```

## `TimeUtilityInput`

Time Utility Input 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { TimeUtilityInput } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### 声明

```text
export type TimeUtilityInput = {
    operation: 'now';
} | {
    operation: 'parse';
    value: string;
} | {
    operation: 'format';
    value: string | number;
    timeZone?: string;
    locale?: string;
};
```
