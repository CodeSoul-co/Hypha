# `@codesoul-co/hypha-core` / `ids`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/ids.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/ids.ts)
- 导出数: **3**

## 模块用法

用于使用该功能边界的公共契约与操作。Ids 模块公开 1 函数、1 接口、1 类型。

### 从包入口导入

```ts
import {
  formatFrameworkId,
} from '@codesoul-co/hypha-core';

import type {
  FrameworkId,
  FrameworkIdPrefix,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `formatFrameworkId` | 函数 | <code>formatFrameworkId(id: FrameworkId): string</code> | Format Framework ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `FrameworkId` | 接口 | <code>interface FrameworkId</code> | Framework ID 接口，共包含 2 个公开字段或方法。 |
| `FrameworkIdPrefix` | 类型 | <code>type FrameworkIdPrefix = 'workspace' &#124; 'session' &#124; 'run' &#124; 'step' &#124; 'event' &#124; 'agent' &#124; 'skill' &#124; 'tool' &#124; 'memory' &#124; 'model' &#124; 'domain' &#124; 'workflow' &#124; 'policy' &#124; 'artifact'</code> | Framework ID Prefix 公共类型别名；完整类型表达式见声明。 |

## `formatFrameworkId`

Format Framework ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { formatFrameworkId } from '@codesoul-co/hypha-core';`
- 源码模块: [`ids`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/ids.ts)

### 声明

```text
export declare function formatFrameworkId(id: FrameworkId): string;
```

### 调用签名

```text
formatFrameworkId(id: FrameworkId): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `id` | <code>FrameworkId</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `FrameworkId`

Framework ID 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FrameworkId } from '@codesoul-co/hypha-core';`
- 源码模块: [`ids`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/ids.ts)

### 声明

```text
export interface FrameworkId {
    prefix: FrameworkIdPrefix;
    value: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `prefix` | 属性 | <code>prefix: FrameworkIdPrefix</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `value` | 属性 | <code>value: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FrameworkIdPrefix`

Framework ID Prefix 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { FrameworkIdPrefix } from '@codesoul-co/hypha-core';`
- 源码模块: [`ids`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/ids.ts)

### 声明

```text
export type FrameworkIdPrefix = 'workspace' | 'session' | 'run' | 'step' | 'event' | 'agent' | 'skill' | 'tool' | 'memory' | 'model' | 'domain' | 'workflow' | 'policy' | 'artifact';
```
