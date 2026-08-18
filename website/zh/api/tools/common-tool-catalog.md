# `@codesoul-co/hypha-tools` / `common-tool-catalog`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 源码: [`packages/tools/src/common-tool-catalog.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts)
- 导出数: **5**

## 模块用法

用于注册并解析版本化能力或实现。Common tool catalog 模块公开 2 常量、2 函数、1 类型。

### 从包入口导入

```ts
import {
  COMMON_TOOL_IDS,
  commonToolCatalogSpecs,
  assertCanonicalCommonToolCatalog,
  resolveCommonToolSpec,
} from '@codesoul-co/hypha-tools';

import type {
  CommonToolId,
} from '@codesoul-co/hypha-tools';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `COMMON_TOOL_IDS` | 常量 | <code>const COMMON_TOOL_IDS: Readonly&lt;{ readonly json: "utility.json"; readonly text: "utility.text"; readonly hash: "utility.hash"; readonly time: "utility.time"; readonly files: "common.files"; readonly artifact: "common.artifact"; readonly httpFetch: "common.http_fetch"; readonly search: "common.search"; readonly memory: "common.memory"; readonly command: "common.command"; readonly mcpResource: "common.mcp_resource";...</code> | 由 `common-tool-catalog` 模块导出的 COMMON TOOL IDS 常量。 |
| `commonToolCatalogSpecs` | 常量 | <code>const commonToolCatalogSpecs: readonly ToolSpec[]</code> | 由 `common-tool-catalog` 模块导出的 Common Tool Catalog Specs 常量。 |
| `assertCanonicalCommonToolCatalog` | 函数 | <code>assertCanonicalCommonToolCatalog(): void</code> | Assert Canonical Common Tool Catalog 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `resolveCommonToolSpec` | 函数 | <code>resolveCommonToolSpec(id: string): ToolSpec &#124; null</code> | Resolve Common Tool Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `CommonToolId` | 类型 | <code>type CommonToolId = (typeof COMMON_TOOL_IDS)[keyof typeof COMMON_TOOL_IDS]</code> | Common Tool ID 公共类型别名；完整类型表达式见声明。 |

## `COMMON_TOOL_IDS`

由 `common-tool-catalog` 模块导出的 COMMON TOOL IDS 常量。

- 种类: 常量
- 导入: `import { COMMON_TOOL_IDS } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts)

### 声明

```text
export declare const COMMON_TOOL_IDS: Readonly<{ readonly json: "utility.json"; readonly text: "utility.text"; readonly hash: "utility.hash"; readonly time: "utility.time"; readonly files: "common.files"; readonly artifact: "common.artifact"; readonly httpFetch: "common.http_fetch"; readonly search: "common.search"; readonly memory: "common.memory"; readonly command: "common.command"; readonly mcpResource: "common.mcp_resource"; readonly hashReference: "common.hash_reference"; }>;
```

## `commonToolCatalogSpecs`

由 `common-tool-catalog` 模块导出的 Common Tool Catalog Specs 常量。

- 种类: 常量
- 导入: `import { commonToolCatalogSpecs } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts)

### 声明

```text
export declare const commonToolCatalogSpecs: readonly ToolSpec[];
```

## `assertCanonicalCommonToolCatalog`

Assert Canonical Common Tool Catalog 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assertCanonicalCommonToolCatalog } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts)

### 声明

```text
export declare function assertCanonicalCommonToolCatalog(): void;
```

### 调用签名

```text
assertCanonicalCommonToolCatalog(): void
```

#### 参数

无参数。

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `resolveCommonToolSpec`

Resolve Common Tool Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { resolveCommonToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts)

### 声明

```text
export declare function resolveCommonToolSpec(id: string): ToolSpec | null;
```

### 调用签名

```text
resolveCommonToolSpec(id: string): ToolSpec | null
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `id` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ToolSpec`
- 说明: 返回值契约由上述类型定义。

## `CommonToolId`

Common Tool ID 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { CommonToolId } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts)

### 声明

```text
export type CommonToolId = (typeof COMMON_TOOL_IDS)[keyof typeof COMMON_TOOL_IDS];
```
