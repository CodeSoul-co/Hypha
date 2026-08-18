# `@codesoul-co/hypha-core` / `modules/execution-output/collector`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-output/collector.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/collector.ts)
- 导出数: **1**

## 模块用法

用于执行该边界的运行时行为。Collector 模块公开 1 类。

### 从包入口导入

```ts
import {
  DefaultExecutionOutputCollector,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultExecutionOutputCollector` | 类 | <code>new DefaultExecutionOutputCollector(artifacts: ExecutionOutputArtifactManager): DefaultExecutionOutputCollector</code> | Default Execution Output Collector 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |

## `DefaultExecutionOutputCollector`

Default Execution Output Collector 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultExecutionOutputCollector } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/collector`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/collector.ts)

### 声明

```text
export declare class DefaultExecutionOutputCollector implements ExecutionOutputCollector {
    constructor(artifacts: ExecutionOutputArtifactManager);
    collect(rawPlan: ExecutionOutputCollectionPlan, context: ExecutionOutputCollectionContext): Promise<ExecutionOutputCollectionResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collect` | 方法 | <code>collect(rawPlan: ExecutionOutputCollectionPlan, context: ExecutionOutputCollectionContext): Promise&lt;ExecutionOutputCollectionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(artifacts: ExecutionOutputArtifactManager): DefaultExecutionOutputCollector</code> | 创建该类的实例。 |
