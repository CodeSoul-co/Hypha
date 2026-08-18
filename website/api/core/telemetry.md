# `@codesoul-co/hypha-core` / `telemetry`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/telemetry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/telemetry.ts)
- Exports: **4**

## Using this module

Use the Telemetry module for using the public contracts and operations for this capability boundary. It exports 1 class, 2 interfaces, 1 type.

### Import from the package entrypoint

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

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryTelemetryRecorder` | class | <code>new InMemoryTelemetryRecorder(): InMemoryTelemetryRecorder</code> | In Memory Telemetry Recorder class with 4 public constructor or member entries; its exact declarations are listed below. |
| `TelemetryMetric` | interface | <code>interface TelemetryMetric</code> | Telemetry Metric interface with 5 public fields or methods. |
| `TelemetryRecorder` | interface | <code>interface TelemetryRecorder</code> | Telemetry Recorder interface with 1 public fields or methods. |
| `TelemetryMetricKind` | type | <code>type TelemetryMetricKind = 'counter' &#124; 'histogram' &#124; 'gauge'</code> | Public type alias for Telemetry Metric Kind; the declaration contains its complete type expression. |

## `InMemoryTelemetryRecorder`

In Memory Telemetry Recorder class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryTelemetryRecorder } from '@codesoul-co/hypha-core';`
- Source module: [`telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/telemetry.ts)

### Declaration

```text
export declare class InMemoryTelemetryRecorder implements TelemetryRecorder {
    recordMetric(metric: TelemetryMetric): void;
    list(name?: string): TelemetryMetric[];
    sum(name: string): number;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryTelemetryRecorder</code> | Creates an instance of this class. |
| `list` | method | <code>list(name?: string): TelemetryMetric[]</code> | Public method; parameters and return type are shown in the signature. |
| `recordMetric` | method | <code>recordMetric(metric: TelemetryMetric): void</code> | Public method; parameters and return type are shown in the signature. |
| `sum` | method | <code>sum(name: string): number</code> | Public method; parameters and return type are shown in the signature. |

## `TelemetryMetric`

Telemetry Metric interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { TelemetryMetric } from '@codesoul-co/hypha-core';`
- Source module: [`telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/telemetry.ts)

### Declaration

```text
export interface TelemetryMetric {
    name: string;
    kind: TelemetryMetricKind;
    value: number;
    recordedAt: string;
    attributes?: Record<string, string | number | boolean>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attributes` | property | <code>attributes?: Record&lt;string, string &#124; number &#124; boolean&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: TelemetryMetricKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordedAt` | property | <code>recordedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `value` | property | <code>value: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `TelemetryRecorder`

Telemetry Recorder interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { TelemetryRecorder } from '@codesoul-co/hypha-core';`
- Source module: [`telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/telemetry.ts)

### Declaration

```text
export interface TelemetryRecorder {
    recordMetric(metric: TelemetryMetric): Promise<void> | void;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `recordMetric` | method | <code>recordMetric(metric: TelemetryMetric): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |

## `TelemetryMetricKind`

Public type alias for Telemetry Metric Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { TelemetryMetricKind } from '@codesoul-co/hypha-core';`
- Source module: [`telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/telemetry.ts)

### Declaration

```text
export type TelemetryMetricKind = 'counter' | 'histogram' | 'gauge';
```
