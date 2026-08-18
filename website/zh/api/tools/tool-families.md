# `@codesoul-co/hypha-tools` / `tool-families`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 源码: [`packages/tools/src/tool-families.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts)
- 导出数: **4**

## 模块用法

用于使用该功能边界的公共契约与操作。Tool families 模块公开 1 常量、1 函数、2 接口。

### 从包入口导入

```ts
import {
  governedToolFamilySpecs,
  createGovernedToolFamilyBindings,
} from '@codesoul-co/hypha-tools';

import type {
  GovernedToolFamilyBinding,
  GovernedToolFamilyPort,
} from '@codesoul-co/hypha-tools';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `governedToolFamilySpecs` | 常量 | <code>const governedToolFamilySpecs: readonly ToolSpec[]</code> | 由 `tool-families` 模块导出的 Governed Tool Family Specs 常量。 |
| `createGovernedToolFamilyBindings` | 函数 | <code>createGovernedToolFamilyBindings(ports: Readonly&lt;Record&lt;string, GovernedToolFamilyPort&gt;&gt;): GovernedToolFamilyBinding[]</code> | Create Governed Tool Family Bindings 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `GovernedToolFamilyBinding` | 接口 | <code>interface GovernedToolFamilyBinding</code> | Governed Tool Family Binding 接口，共包含 2 个公开字段或方法。 |
| `GovernedToolFamilyPort` | 接口 | <code>interface GovernedToolFamilyPort</code> | Governed Tool Family Port 接口，共包含 1 个公开字段或方法。 |

## `governedToolFamilySpecs`

由 `tool-families` 模块导出的 Governed Tool Family Specs 常量。

- 种类: 常量
- 导入: `import { governedToolFamilySpecs } from '@codesoul-co/hypha-tools';`
- 源码模块: [`tool-families`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts)

### 声明

```text
export declare const governedToolFamilySpecs: readonly ToolSpec[];
```

## `createGovernedToolFamilyBindings`

Create Governed Tool Family Bindings 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createGovernedToolFamilyBindings } from '@codesoul-co/hypha-tools';`
- 源码模块: [`tool-families`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts)

### 声明

```text
export declare function createGovernedToolFamilyBindings(ports: Readonly<Record<string, GovernedToolFamilyPort>>): GovernedToolFamilyBinding[];
```

### 调用签名

```text
createGovernedToolFamilyBindings(ports: Readonly<Record<string, GovernedToolFamilyPort>>): GovernedToolFamilyBinding[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `ports` | <code>Readonly&lt;Record&lt;string, GovernedToolFamilyPort&gt;&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `GovernedToolFamilyBinding[]`
- 说明: 返回值契约由上述类型定义。

## `GovernedToolFamilyBinding`

Governed Tool Family Binding 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { GovernedToolFamilyBinding } from '@codesoul-co/hypha-tools';`
- 源码模块: [`tool-families`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts)

### 声明

```text
export interface GovernedToolFamilyBinding {
    spec: ToolSpec;
    adapter: ToolAdapter;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adapter` | 属性 | <code>adapter: ToolAdapter&lt;unknown, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `spec` | 属性 | <code>spec: ToolSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `GovernedToolFamilyPort`

Governed Tool Family Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { GovernedToolFamilyPort } from '@codesoul-co/hypha-tools';`
- 源码模块: [`tool-families`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts)

### 声明

```text
export interface GovernedToolFamilyPort {
    execute(input: {
        toolId: string;
        input: Record<string, unknown>;
        context: ToolCallContext;
    }): Promise<unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `execute` | 方法 | <code>execute(input: { toolId: string; input: Record&lt;string, unknown&gt;; context: ToolCallContext; }): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
