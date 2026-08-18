# `@codesoul-co/hypha-adapters-local` / `local-process-resource-accounting`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-resource-accounting.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-resource-accounting.ts)
- 导出数: **2**

## 模块用法

用于使用该功能边界的公共契约与操作。Local process resource accounting 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  LocalProcessResourceAccountant,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalProcessResourceEvidence,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalProcessResourceAccountant` | 类 | <code>new LocalProcessResourceAccountant(): LocalProcessResourceAccountant</code> | Reports only evidence the host Local Process adapter can actually observe. |
| `LocalProcessResourceEvidence` | 接口 | <code>interface LocalProcessResourceEvidence</code> | Local Process Resource Evidence 接口，共包含 2 个公开字段或方法。 |

## `LocalProcessResourceAccountant`

Reports only evidence the host Local Process adapter can actually observe.

- 种类: 类
- 导入: `import { LocalProcessResourceAccountant } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-resource-accounting`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-resource-accounting.ts)

### 声明

```text
export declare class LocalProcessResourceAccountant {
    account(result: LocalProcessRunResult): LocalProcessResourceEvidence;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `account` | 方法 | <code>account(result: LocalProcessRunResult): LocalProcessResourceEvidence</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): LocalProcessResourceAccountant</code> | 创建该类的实例。 |

## `LocalProcessResourceEvidence`

Local Process Resource Evidence 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalProcessResourceEvidence } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-resource-accounting`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-resource-accounting.ts)

### 声明

```text
export interface LocalProcessResourceEvidence {
    usage: ExecutionResourceUsage;
    metadata: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `usage` | 属性 | <code>usage: ExecutionResourceUsage</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
