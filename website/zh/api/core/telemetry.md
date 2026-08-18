# `@codesoul-co/hypha-core` / `telemetry`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/telemetry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/telemetry.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryTelemetryRecorder` | 类 | <code>new InMemoryTelemetryRecorder(): InMemoryTelemetryRecorder</code> | In Memory Telemetry Recorder 的运行时实现；公开构造函数与成员见下表。 |
| `TelemetryMetric` | 接口 | <code>interface TelemetryMetric</code> | Telemetry Metric 的字段契约；完整字段见下表。 |
| `TelemetryRecorder` | 接口 | <code>interface TelemetryRecorder</code> | Telemetry Recorder 的字段契约；完整字段见下表。 |
| `TelemetryMetricKind` | 类型 | <code>type TelemetryMetricKind = 'counter' &#124; 'histogram' &#124; 'gauge'</code> | Telemetry Metric Kind 的公共类型别名。 |

## `InMemoryTelemetryRecorder` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryTelemetryRecorder</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(name?: string): TelemetryMetric[]</code> | 列出 list。 |
| `recordMetric` | 方法 | <code>recordMetric(metric: TelemetryMetric): void</code> | 记录 Metric。 |
| `sum` | 方法 | <code>sum(name: string): number</code> | sum 的公开运行时操作。 |

## `TelemetryMetric` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attributes` | 属性 | <code>attributes: Record&lt;string, string &#124; number &#124; boolean&gt;</code> | attributes 字段。 |
| `kind` | 属性 | <code>kind: TelemetryMetricKind</code> | kind 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `recordedAt` | 属性 | <code>recordedAt: string</code> | recorded At 字段。 |
| `value` | 属性 | <code>value: number</code> | value 字段。 |

## `TelemetryRecorder` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `recordMetric` | 方法 | <code>recordMetric(metric: TelemetryMetric): Promise&lt;void&gt; &#124; void</code> | 记录 Metric。 |
