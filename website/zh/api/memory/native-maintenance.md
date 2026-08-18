# `@codesoul-co/hypha-memory` / `native-maintenance`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/native-maintenance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-maintenance.ts)
- 导出数: **2**

## 模块用法

用于使用该功能边界的公共契约与操作。Native maintenance 模块公开 1 类、1 类型。

### 从包入口导入

```ts
import {
  DeterministicMemoryMaintenancePlanner,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryMaintenanceApplier,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DeterministicMemoryMaintenancePlanner` | 类 | <code>new DeterministicMemoryMaintenancePlanner(applyDecision?: MemoryMaintenanceApplier &#124; undefined, now?: () =&gt; string): DeterministicMemoryMaintenancePlanner</code> | Deterministic Memory Maintenance Planner 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryMaintenanceApplier` | 类型 | <code>type MemoryMaintenanceApplier = (request: MemoryMaintenanceApplyRequest) =&gt; Promise&lt;ManagedMemoryWriteResult&gt;</code> | Memory Maintenance Applier 公共类型别名；完整类型表达式见声明。 |

## `DeterministicMemoryMaintenancePlanner`

Deterministic Memory Maintenance Planner 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DeterministicMemoryMaintenancePlanner } from '@codesoul-co/hypha-memory';`
- 源码模块: [`native-maintenance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-maintenance.ts)

### 声明

```text
export declare class DeterministicMemoryMaintenancePlanner implements MemoryMaintenancePlanner {
    constructor(applyDecision?: MemoryMaintenanceApplier | undefined, now?: () => string);
    plan(request: MemoryMaintenancePlanRequest): Promise<MemoryMaintenanceDecision>;
    apply(request: MemoryMaintenanceApplyRequest): Promise<ManagedMemoryWriteResult>;
    explain(decisionId: string): Promise<MemoryMaintenanceDecision | null>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apply` | 方法 | <code>apply(request: MemoryMaintenanceApplyRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(applyDecision?: MemoryMaintenanceApplier &#124; undefined, now?: () =&gt; string): DeterministicMemoryMaintenancePlanner</code> | 创建该类的实例。 |
| `explain` | 方法 | <code>explain(decisionId: string): Promise&lt;MemoryMaintenanceDecision &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `plan` | 方法 | <code>plan(request: MemoryMaintenancePlanRequest): Promise&lt;MemoryMaintenanceDecision&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryMaintenanceApplier`

Memory Maintenance Applier 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryMaintenanceApplier } from '@codesoul-co/hypha-memory';`
- 源码模块: [`native-maintenance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-maintenance.ts)

### 声明

```text
export type MemoryMaintenanceApplier = (request: MemoryMaintenanceApplyRequest) => Promise<ManagedMemoryWriteResult>;
```
