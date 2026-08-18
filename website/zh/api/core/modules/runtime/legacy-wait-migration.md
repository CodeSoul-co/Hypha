# `@codesoul-co/hypha-core` / `modules/runtime/legacy-wait-migration`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/legacy-wait-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)
- 导出数: **7**

## 模块用法

用于执行该边界的运行时行为。Legacy wait migration 模块公开 1 常量、2 函数、3 接口、1 类型。

### 从包入口导入

```ts
import {
  LEGACY_HUMAN_WAIT_MIGRATION_VERSION,
  migrateLegacyHumanWaitEvent,
  migrateLegacyHumanWaitEvents,
} from '@codesoul-co/hypha-core';

import type {
  LegacyHumanWaitMigrationEntry,
  LegacyHumanWaitMigrationReport,
  LegacyHumanWaitMigrationResult,
  MigratableRuntimeEvent,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LEGACY_HUMAN_WAIT_MIGRATION_VERSION` | 常量 | <code>const LEGACY_HUMAN_WAIT_MIGRATION_VERSION: "1.0.0"</code> | 由 `modules/runtime/legacy-wait-migration` 模块导出的 LEGACY HUMAN WAIT MIGRATION VERSION 常量。 |
| `migrateLegacyHumanWaitEvent` | 函数 | <code>migrateLegacyHumanWaitEvent&lt;TEvent extends FrameworkEvent&gt;(event: TEvent, priorPendingActionRef?: string): { event: TEvent; entry: LegacyHumanWaitMigrationEntry; }</code> | Migrate Legacy Human Wait Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `migrateLegacyHumanWaitEvents` | 函数 | <code>migrateLegacyHumanWaitEvents&lt;TEvent extends FrameworkEvent&gt;(events: readonly TEvent[]): LegacyHumanWaitMigrationResult&lt;TEvent&gt;</code> | Migrate Legacy Human Wait Events 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `LegacyHumanWaitMigrationEntry` | 接口 | <code>interface LegacyHumanWaitMigrationEntry</code> | Legacy Human Wait Migration Entry 接口，共包含 6 个公开字段或方法。 |
| `LegacyHumanWaitMigrationReport` | 接口 | <code>interface LegacyHumanWaitMigrationReport</code> | Legacy Human Wait Migration Report 接口，共包含 8 个公开字段或方法。 |
| `LegacyHumanWaitMigrationResult` | 接口 | <code>interface LegacyHumanWaitMigrationResult</code> | Legacy Human Wait Migration Result 接口，共包含 2 个公开字段或方法。 |
| `MigratableRuntimeEvent` | 类型 | <code>type MigratableRuntimeEvent = FrameworkEvent &#124; PersistedFrameworkEvent</code> | Migratable Runtime Event 公共类型别名；完整类型表达式见声明。 |

## `LEGACY_HUMAN_WAIT_MIGRATION_VERSION`

由 `modules/runtime/legacy-wait-migration` 模块导出的 LEGACY HUMAN WAIT MIGRATION VERSION 常量。

- 种类: 常量
- 导入: `import { LEGACY_HUMAN_WAIT_MIGRATION_VERSION } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/legacy-wait-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)

### 声明

```text
export declare const LEGACY_HUMAN_WAIT_MIGRATION_VERSION: "1.0.0";
```

## `migrateLegacyHumanWaitEvent`

Migrate Legacy Human Wait Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { migrateLegacyHumanWaitEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/legacy-wait-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)

### 声明

```text
export declare function migrateLegacyHumanWaitEvent<TEvent extends FrameworkEvent>(event: TEvent, priorPendingActionRef?: string): {
    event: TEvent;
    entry: LegacyHumanWaitMigrationEntry;
};
```

### 调用签名

```text
migrateLegacyHumanWaitEvent<TEvent extends FrameworkEvent>(event: TEvent, priorPendingActionRef?: string): { event: TEvent; entry: LegacyHumanWaitMigrationEntry; }
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `event` | <code>TEvent</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `priorPendingActionRef` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `{ event: TEvent; entry: LegacyHumanWaitMigrationEntry; }`
- 说明: 返回值契约由上述类型定义。

## `migrateLegacyHumanWaitEvents`

Migrate Legacy Human Wait Events 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { migrateLegacyHumanWaitEvents } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/legacy-wait-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)

### 声明

```text
export declare function migrateLegacyHumanWaitEvents<TEvent extends FrameworkEvent>(events: readonly TEvent[]): LegacyHumanWaitMigrationResult<TEvent>;
```

### 调用签名

```text
migrateLegacyHumanWaitEvents<TEvent extends FrameworkEvent>(events: readonly TEvent[]): LegacyHumanWaitMigrationResult<TEvent>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `events` | <code>readonly TEvent[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `LegacyHumanWaitMigrationResult<TEvent>`
- 说明: 返回值契约由上述类型定义。

## `LegacyHumanWaitMigrationEntry`

Legacy Human Wait Migration Entry 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyHumanWaitMigrationEntry } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/legacy-wait-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)

### 声明

```text
export interface LegacyHumanWaitMigrationEntry {
    eventId: string;
    runId: string;
    status: 'current' | 'migrated' | 'quarantined';
    waitId?: string;
    pendingActionRef?: string;
    reason?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventId` | 属性 | <code>eventId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "quarantined" &#124; "current" &#124; "migrated"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `waitId` | 属性 | <code>waitId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyHumanWaitMigrationReport`

Legacy Human Wait Migration Report 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyHumanWaitMigrationReport } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/legacy-wait-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)

### 声明

```text
export interface LegacyHumanWaitMigrationReport {
    formatVersion: typeof LEGACY_HUMAN_WAIT_MIGRATION_VERSION;
    scannedEvents: number;
    waitingEvents: number;
    migratedEvents: number;
    currentEvents: number;
    quarantinedEvents: number;
    quarantinedRunIds: string[];
    entries: LegacyHumanWaitMigrationEntry[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `currentEvents` | 属性 | <code>currentEvents: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `entries` | 属性 | <code>entries: LegacyHumanWaitMigrationEntry[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `formatVersion` | 属性 | <code>formatVersion: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `migratedEvents` | 属性 | <code>migratedEvents: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `quarantinedEvents` | 属性 | <code>quarantinedEvents: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `quarantinedRunIds` | 属性 | <code>quarantinedRunIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scannedEvents` | 属性 | <code>scannedEvents: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `waitingEvents` | 属性 | <code>waitingEvents: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyHumanWaitMigrationResult`

Legacy Human Wait Migration Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyHumanWaitMigrationResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/legacy-wait-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)

### 声明

```text
export interface LegacyHumanWaitMigrationResult<TEvent extends FrameworkEvent> {
    events: TEvent[];
    report: LegacyHumanWaitMigrationReport;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: TEvent[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `report` | 属性 | <code>report: LegacyHumanWaitMigrationReport</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MigratableRuntimeEvent`

Migratable Runtime Event 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MigratableRuntimeEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/legacy-wait-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)

### 声明

```text
export type MigratableRuntimeEvent = FrameworkEvent | PersistedFrameworkEvent;
```
