# `@codesoul-co/hypha-core` / `telemetry`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/telemetry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/telemetry.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryTelemetryRecorder` | class | <code>new InMemoryTelemetryRecorder(): InMemoryTelemetryRecorder</code> | Runtime implementation for In Memory Telemetry Recorder; see its public constructor and members below. |
| `TelemetryMetric` | interface | <code>interface TelemetryMetric</code> | Field contract for Telemetry Metric; see all contract members below. |
| `TelemetryRecorder` | interface | <code>interface TelemetryRecorder</code> | Field contract for Telemetry Recorder; see all contract members below. |
| `TelemetryMetricKind` | type | <code>type TelemetryMetricKind = 'counter' &#124; 'histogram' &#124; 'gauge'</code> | Public type alias for Telemetry Metric Kind. |

## `InMemoryTelemetryRecorder` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryTelemetryRecorder</code> | Creates an instance of this class. |
| `list` | method | <code>list(name?: string): TelemetryMetric[]</code> | Lists list at this module boundary. |
| `recordMetric` | method | <code>recordMetric(metric: TelemetryMetric): void</code> | Records Metric at this module boundary. |
| `sum` | method | <code>sum(name: string): number</code> | Public runtime operation for sum. |

## `TelemetryMetric` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attributes` | property | <code>attributes: Record&lt;string, string &#124; number &#124; boolean&gt;</code> | Public attributes property. |
| `kind` | property | <code>kind: TelemetryMetricKind</code> | Public kind property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `recordedAt` | property | <code>recordedAt: string</code> | Public recorded At property. |
| `value` | property | <code>value: number</code> | Public value property. |

## `TelemetryRecorder` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `recordMetric` | method | <code>recordMetric(metric: TelemetryMetric): Promise&lt;void&gt; &#124; void</code> | Records Metric at this module boundary. |
