# `@codesoul-co/hypha-core` / `modules/execution-output/planner`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-output/planner.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/planner.ts)
- 导出数: **2**

## 模块用法

用于执行该边界的运行时行为。Planner 模块公开 1 类、1 函数。

### 从包入口导入

```ts
import {
  DefaultExecutionOutputPlanner,
  classifyExecutionOutput,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultExecutionOutputPlanner` | 类 | <code>new DefaultExecutionOutputPlanner(): DefaultExecutionOutputPlanner</code> | Default Execution Output Planner 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `classifyExecutionOutput` | 函数 | <code>classifyExecutionOutput(relativePath: string): ArtifactClassification</code> | Classify Execution Output 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `DefaultExecutionOutputPlanner`

Default Execution Output Planner 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultExecutionOutputPlanner } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/planner.ts)

### 声明

```text
export declare class DefaultExecutionOutputPlanner implements ExecutionOutputPlanner {
    plan(rawResult: CommandExecutionResult, rawPolicy: ExecutionOutputCollectionPolicy): ExecutionOutputCollectionPlan;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DefaultExecutionOutputPlanner</code> | 创建该类的实例。 |
| `plan` | 方法 | <code>plan(rawResult: CommandExecutionResult, rawPolicy: ExecutionOutputCollectionPolicy): ExecutionOutputCollectionPlan</code> | 公开方法；参数与返回类型以签名列为准。 |

## `classifyExecutionOutput`

Classify Execution Output 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { classifyExecutionOutput } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/planner.ts)

### 声明

```text
export declare function classifyExecutionOutput(relativePath: string): ArtifactClassification;
```

### 调用签名

```text
classifyExecutionOutput(relativePath: string): ArtifactClassification
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `relativePath` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactClassification`
- 说明: 返回值契约由上述类型定义。
