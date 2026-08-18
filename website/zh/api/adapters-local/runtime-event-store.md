# `@codesoul-co/hypha-adapters-local` / `runtime-event-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/runtime-event-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-event-store.ts)
- 导出数: **3**

## 模块用法

用于创建、记录或读取 Event 契约。Runtime event store 模块公开 1 类、2 接口。

### 从包入口导入

```ts
import {
  SQLiteDurableEventStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteDurableEventStoreOptions,
  SQLiteImportedEventResetResult,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteDurableEventStore` | 类 | <code>new SQLiteDurableEventStore(options: SQLiteDurableEventStoreOptions): SQLiteDurableEventStore</code> | SQLite Durable Event Store 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SQLiteDurableEventStoreOptions` | 接口 | <code>interface SQLiteDurableEventStoreOptions</code> | SQLite Durable Event Store Options 接口，共包含 3 个公开字段或方法。 |
| `SQLiteImportedEventResetResult` | 接口 | <code>interface SQLiteImportedEventResetResult</code> | SQLite Imported Event Reset Result 接口，共包含 3 个公开字段或方法。 |

## `SQLiteDurableEventStore`

SQLite Durable Event Store 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SQLiteDurableEventStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`runtime-event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-event-store.ts)

### 声明

```text
export declare class SQLiteDurableEventStore implements DurableEventStore, CanonicalEventScanPort {
    constructor(options: SQLiteDurableEventStoreOptions);
    append(request: EventAppendRequest): Promise<EventAppendResult>;
    readStream(scope: EventStreamScope, fromSequence?: number): Promise<PersistedFrameworkEvent[]>;
    readById(scope: EventStreamScope, eventId: string): Promise<PersistedFrameworkEvent | null>;
    getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null>;
    listStreamHeads(request?: ListEventStreamHeadsRequest): Promise<ListEventStreamHeadsResult>;
    health(): Promise<ProviderHealth>;
    resetUnauditedImportedEvents(): Promise<SQLiteImportedEventResetResult>;
    scanCanonicalEvents(request: ScanCanonicalEventsRequest): Promise<ScanCanonicalEventsResult>;
    close(): void;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: SQLiteDurableEventStoreOptions): SQLiteDurableEventStore</code> | 创建该类的实例。 |
| `getStreamHead` | 方法 | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listStreamHeads` | 方法 | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `readById` | 方法 | <code>readById(scope: EventStreamScope, eventId: string): Promise&lt;PersistedFrameworkEvent &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `readStream` | 方法 | <code>readStream(scope: EventStreamScope, fromSequence?: number): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resetUnauditedImportedEvents` | 方法 | <code>resetUnauditedImportedEvents(): Promise&lt;SQLiteImportedEventResetResult&gt;</code> | Clears only an incomplete compatibility import. A successful integrity watermark or any live/non-imported Event makes the operation fail closed. |
| `scanCanonicalEvents` | 方法 | <code>scanCanonicalEvents(request: ScanCanonicalEventsRequest): Promise&lt;ScanCanonicalEventsResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SQLiteDurableEventStoreOptions`

SQLite Durable Event Store Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SQLiteDurableEventStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`runtime-event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-event-store.ts)

### 声明

```text
export interface SQLiteDurableEventStoreOptions {
    filename: string;
    schemaRegistry: EventSchemaRegistry;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `schemaRegistry` | 属性 | <code>schemaRegistry: EventSchemaRegistry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SQLiteImportedEventResetResult`

SQLite Imported Event Reset Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SQLiteImportedEventResetResult } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`runtime-event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-event-store.ts)

### 声明

```text
export interface SQLiteImportedEventResetResult {
    reset: boolean;
    deletedEvents: number;
    reason: 'empty' | 'reset' | 'audited_history' | 'non_imported_events';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deletedEvents` | 属性 | <code>deletedEvents: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: "empty" &#124; "reset" &#124; "audited_history" &#124; "non_imported_events"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reset` | 属性 | <code>reset: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
