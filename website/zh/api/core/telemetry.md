# `@codesoul-co/hypha-core` / `telemetry`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/telemetry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/telemetry.ts)
- 导出数: **4**

## 模块用法

用于使用该功能边界的公共契约与操作。Telemetry 模块公开 1 类、2 接口、1 类型。

### 从包入口导入

```ts
import {
  InMemoryTelemetryRecorder,
} from '@codesoul-co/hypha-core';

import type {
  TelemetryMetric,
  TelemetryRecorder,
  TelemetryMetricKind,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryTelemetryRecorder` | 类 | <code>new InMemoryTelemetryRecorder(): InMemoryTelemetryRecorder</code> | In Memory Telemetry Recorder 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `TelemetryMetric` | 接口 | <code>interface TelemetryMetric</code> | Telemetry Metric 接口，共包含 5 个公开字段或方法。 |
| `TelemetryRecorder` | 接口 | <code>interface TelemetryRecorder</code> | Telemetry Recorder 接口，共包含 1 个公开字段或方法。 |
| `TelemetryMetricKind` | 类型 | <code>type TelemetryMetricKind = 'counter' &#124; 'histogram' &#124; 'gauge'</code> | Telemetry Metric Kind 公共类型别名；完整类型表达式见声明。 |

## `InMemoryTelemetryRecorder`

In Memory Telemetry Recorder 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryTelemetryRecorder } from '@codesoul-co/hypha-core';`
- 源码模块: [`telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/telemetry.ts)

### 声明

```text
export declare class InMemoryTelemetryRecorder implements TelemetryRecorder {
    recordMetric(metric: TelemetryMetric): void;
    list(name?: string): TelemetryMetric[];
    sum(name: string): number;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryTelemetryRecorder</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(name?: string): TelemetryMetric[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordMetric` | 方法 | <code>recordMetric(metric: TelemetryMetric): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `sum` | 方法 | <code>sum(name: string): number</code> | 公开方法；参数与返回类型以签名列为准。 |

## `TelemetryMetric`

Telemetry Metric 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TelemetryMetric } from '@codesoul-co/hypha-core';`
- 源码模块: [`telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/telemetry.ts)

### 声明

```text
export interface TelemetryMetric {
    name: string;
    kind: TelemetryMetricKind;
    value: number;
    recordedAt: string;
    attributes?: Record<string, string | number | boolean>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attributes` | 属性 | <code>attributes?: Record&lt;string, string &#124; number &#124; boolean&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: TelemetryMetricKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordedAt` | 属性 | <code>recordedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `value` | 属性 | <code>value: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `TelemetryRecorder`

Telemetry Recorder 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TelemetryRecorder } from '@codesoul-co/hypha-core';`
- 源码模块: [`telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/telemetry.ts)

### 声明

```text
export interface TelemetryRecorder {
    recordMetric(metric: TelemetryMetric): Promise<void> | void;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `recordMetric` | 方法 | <code>recordMetric(metric: TelemetryMetric): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |

## `TelemetryMetricKind`

Telemetry Metric Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { TelemetryMetricKind } from '@codesoul-co/hypha-core';`
- 源码模块: [`telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/telemetry.ts)

### 声明

```text
export type TelemetryMetricKind = 'counter' | 'histogram' | 'gauge';
```
