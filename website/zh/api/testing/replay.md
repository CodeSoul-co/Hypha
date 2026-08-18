# `@codesoul-co/hypha-testing` / `replay`

- 包索引: [`@codesoul-co/hypha-testing`](/zh/api/testing)
- 源码: [`packages/testing/src/replay.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)
- 导出数: **16**

## 模块用法

用于使用该功能边界的公共契约与操作。Replay 模块公开 3 类、3 函数、10 接口。

### 从包入口导入

```ts
import {
  FileReplayFixtureStore,
  InMemoryReplayFixtureStore,
  ReplayEngine,
  diffStringSequences,
  normalizeEvents,
  projectReplay,
} from '@codesoul-co/hypha-testing';

import type {
  FileReplayFixtureStoreOptions,
  ReplayCaptureInput,
  ReplayEngineOptions,
  ReplayFixture,
  ReplayFixtureStore,
  ReplayProjection,
  ReplayResult,
  TraceDiff,
} from '@codesoul-co/hypha-testing';

// 完整导出列表见下方。
```

### 使用要点

- 10 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `FileReplayFixtureStore` | 类 | <code>new FileReplayFixtureStore(options: FileReplayFixtureStoreOptions): FileReplayFixtureStore</code> | File Replay Fixture Store 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryReplayFixtureStore` | 类 | <code>new InMemoryReplayFixtureStore(): InMemoryReplayFixtureStore</code> | In Memory Replay Fixture Store 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ReplayEngine` | 类 | <code>new ReplayEngine(options?: ReplayEngineOptions): ReplayEngine</code> | Replay Engine 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `diffStringSequences` | 函数 | <code>diffStringSequences(expected: string[], actual: string[]): TraceSequenceDiff</code> | Diff String Sequences 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `normalizeEvents` | 函数 | <code>normalizeEvents(events: FrameworkEvent[]): FrameworkEvent[]</code> | Normalize Events 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `projectReplay` | 函数 | <code>projectReplay(events: FrameworkEvent[]): ReplayProjection</code> | Project Replay 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `FileReplayFixtureStoreOptions` | 接口 | <code>interface FileReplayFixtureStoreOptions</code> | File Replay Fixture Store Options 接口，共包含 2 个公开字段或方法。 |
| `ReplayCaptureInput` | 接口 | <code>interface ReplayCaptureInput</code> | Replay Capture Input 接口，共包含 7 个公开字段或方法。 |
| `ReplayEngineOptions` | 接口 | <code>interface ReplayEngineOptions</code> | Replay Engine Options 接口，共包含 8 个公开字段或方法。 |
| `ReplayFixture` | 接口 | <code>interface ReplayFixture</code> | Replay Fixture 接口，共包含 15 个公开字段或方法。 |
| `ReplayFixtureStore` | 接口 | <code>interface ReplayFixtureStore</code> | Replay Fixture Store 接口，共包含 3 个公开字段或方法。 |
| `ReplayProjection` | 接口 | <code>interface ReplayProjection</code> | Replay Projection 接口，共包含 9 个公开字段或方法。 |
| `ReplayResult` | 接口 | <code>interface ReplayResult</code> | Replay Result 接口，共包含 3 个公开字段或方法。 |
| `TraceDiff` | 接口 | <code>interface TraceDiff</code> | Trace Diff 接口，共包含 8 个公开字段或方法。 |
| `TraceSequenceDiff` | 接口 | <code>interface TraceSequenceDiff</code> | Trace Sequence Diff 接口，共包含 6 个公开字段或方法。 |
| `TraceValueDiff` | 接口 | <code>interface TraceValueDiff</code> | Trace Value Diff 接口，共包含 3 个公开字段或方法。 |

## `FileReplayFixtureStore`

File Replay Fixture Store 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { FileReplayFixtureStore } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export declare class FileReplayFixtureStore implements ReplayFixtureStore {
    constructor(options: FileReplayFixtureStoreOptions);
    save(fixture: ReplayFixture): Promise<void>;
    get(id: string): Promise<ReplayFixture | null>;
    list(): Promise<ReplayFixture[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: FileReplayFixtureStoreOptions): FileReplayFixtureStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): Promise&lt;ReplayFixture[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(fixture: ReplayFixture): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryReplayFixtureStore`

In Memory Replay Fixture Store 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryReplayFixtureStore } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export declare class InMemoryReplayFixtureStore implements ReplayFixtureStore {
    save(fixture: ReplayFixture): Promise<void>;
    get(id: string): Promise<ReplayFixture | null>;
    list(): Promise<ReplayFixture[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryReplayFixtureStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): Promise&lt;ReplayFixture[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(fixture: ReplayFixture): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReplayEngine`

Replay Engine 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ReplayEngine } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export declare class ReplayEngine {
    constructor(options?: ReplayEngineOptions);
    capture(input: ReplayCaptureInput): Promise<ReplayFixture>;
    replay(fixture: ReplayFixture): ReplayResult;
    compare(expected: ReplayFixture, actual: ReplayFixture | FrameworkEvent[]): TraceDiff;
    getFixture(id: string): Promise<ReplayFixture | null>;
    listFixtures(): Promise<ReplayFixture[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capture` | 方法 | <code>capture(input: ReplayCaptureInput): Promise&lt;ReplayFixture&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `compare` | 方法 | <code>compare(expected: ReplayFixture, actual: ReplayFixture &#124; FrameworkEvent[]): TraceDiff</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options?: ReplayEngineOptions): ReplayEngine</code> | 创建该类的实例。 |
| `getFixture` | 方法 | <code>getFixture(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listFixtures` | 方法 | <code>listFixtures(): Promise&lt;ReplayFixture[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `replay` | 方法 | <code>replay(fixture: ReplayFixture): ReplayResult</code> | 公开方法；参数与返回类型以签名列为准。 |

## `diffStringSequences`

Diff String Sequences 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { diffStringSequences } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export declare function diffStringSequences(expected: string[], actual: string[]): TraceSequenceDiff;
```

### 调用签名

```text
diffStringSequences(expected: string[], actual: string[]): TraceSequenceDiff
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `expected` | <code>string[]</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `actual` | <code>string[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `TraceSequenceDiff`
- 说明: 返回值契约由上述类型定义。

## `normalizeEvents`

Normalize Events 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizeEvents } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export declare function normalizeEvents(events: FrameworkEvent[]): FrameworkEvent[];
```

### 调用签名

```text
normalizeEvents(events: FrameworkEvent[]): FrameworkEvent[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `events` | <code>FrameworkEvent&lt;unknown&gt;[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FrameworkEvent<unknown>[]`
- 说明: 返回值契约由上述类型定义。

## `projectReplay`

Project Replay 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { projectReplay } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export declare function projectReplay(events: FrameworkEvent[]): ReplayProjection;
```

### 调用签名

```text
projectReplay(events: FrameworkEvent[]): ReplayProjection
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `events` | <code>FrameworkEvent&lt;unknown&gt;[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ReplayProjection`
- 说明: 返回值契约由上述类型定义。

## `FileReplayFixtureStoreOptions`

File Replay Fixture Store Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FileReplayFixtureStoreOptions } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export interface FileReplayFixtureStoreOptions {
    directory: string;
    extension?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `directory` | 属性 | <code>directory: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `extension` | 属性 | <code>extension?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReplayCaptureInput`

Replay Capture Input 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReplayCaptureInput } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export interface ReplayCaptureInput {
    id: string;
    version: string;
    runId: string;
    events?: FrameworkEvent[];
    replaySpec?: ReplaySpec;
    outputContract?: OutputContractSpec;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events?: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContract` | 属性 | <code>outputContract?: OutputContractSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `replaySpec` | 属性 | <code>replaySpec?: ReplaySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReplayEngineOptions`

Replay Engine Options 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReplayEngineOptions } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export interface ReplayEngineOptions {
    eventStore?: EventStore;
    fixtureStore?: ReplayFixtureStore;
    now?: () => string;
    trace?: TraceRecorder;
    sessionId?: string;
    workspaceId?: string;
    agentId?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventStore` | 属性 | <code>eventStore?: EventStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fixtureStore` | 属性 | <code>fixtureStore?: ReplayFixtureStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trace` | 属性 | <code>trace?: TraceRecorder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReplayFixture`

Replay Fixture 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReplayFixture } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export interface ReplayFixture {
    id: string;
    version: string;
    runId: string;
    createdAt: string;
    replaySpecRef?: SpecRef;
    events: FrameworkEvent[];
    eventTypes: string[];
    statePath: string[];
    finalOutput?: unknown;
    toolCalls: string[];
    modelCalls: string[];
    policyDecisions: string[];
    memoryReadSet: string[];
    outputContract?: OutputContractSpec;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventTypes` | 属性 | <code>eventTypes: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalOutput` | 属性 | <code>finalOutput?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryReadSet` | 属性 | <code>memoryReadSet: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelCalls` | 属性 | <code>modelCalls: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContract` | 属性 | <code>outputContract?: OutputContractSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyDecisions` | 属性 | <code>policyDecisions: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `replaySpecRef` | 属性 | <code>replaySpecRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCalls` | 属性 | <code>toolCalls: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReplayFixtureStore`

Replay Fixture Store 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReplayFixtureStore } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export interface ReplayFixtureStore {
    save(fixture: ReplayFixture): Promise<void>;
    get(id: string): Promise<ReplayFixture | null>;
    list(): Promise<ReplayFixture[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): Promise&lt;ReplayFixture[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(fixture: ReplayFixture): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReplayProjection`

Replay Projection 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReplayProjection } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export interface ReplayProjection {
    runId: string;
    events: FrameworkEvent[];
    eventTypes: string[];
    statePath: string[];
    finalOutput?: unknown;
    toolCalls: string[];
    policyDecisions: string[];
    memoryReadSet: string[];
    modelCalls: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventTypes` | 属性 | <code>eventTypes: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalOutput` | 属性 | <code>finalOutput?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryReadSet` | 属性 | <code>memoryReadSet: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelCalls` | 属性 | <code>modelCalls: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyDecisions` | 属性 | <code>policyDecisions: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCalls` | 属性 | <code>toolCalls: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReplayResult`

Replay Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReplayResult } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export interface ReplayResult {
    fixtureId: string;
    runId: string;
    projection: ReplayProjection;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fixtureId` | 属性 | <code>fixtureId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projection` | 属性 | <code>projection: ReplayProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `TraceDiff`

Trace Diff 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TraceDiff } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export interface TraceDiff {
    passed: boolean;
    eventTypes: TraceSequenceDiff;
    statePath: TraceSequenceDiff;
    toolCalls: TraceSequenceDiff;
    modelCalls: TraceSequenceDiff;
    policyDecisions: TraceSequenceDiff;
    memoryReadSet: TraceSequenceDiff;
    output: TraceValueDiff;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventTypes` | 属性 | <code>eventTypes: TraceSequenceDiff</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryReadSet` | 属性 | <code>memoryReadSet: TraceSequenceDiff</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelCalls` | 属性 | <code>modelCalls: TraceSequenceDiff</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output: TraceValueDiff</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `passed` | 属性 | <code>passed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyDecisions` | 属性 | <code>policyDecisions: TraceSequenceDiff</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statePath` | 属性 | <code>statePath: TraceSequenceDiff</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCalls` | 属性 | <code>toolCalls: TraceSequenceDiff</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `TraceSequenceDiff`

Trace Sequence Diff 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TraceSequenceDiff } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export interface TraceSequenceDiff {
    passed: boolean;
    expected: string[];
    actual: string[];
    missing: string[];
    extra: string[];
    mismatches: Array<{
        index: number;
        expected?: string;
        actual?: string;
    }>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actual` | 属性 | <code>actual: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expected` | 属性 | <code>expected: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `extra` | 属性 | <code>extra: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mismatches` | 属性 | <code>mismatches: { index: number; expected?: string; actual?: string; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `missing` | 属性 | <code>missing: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `passed` | 属性 | <code>passed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `TraceValueDiff`

Trace Value Diff 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TraceValueDiff } from '@codesoul-co/hypha-testing';`
- 源码模块: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### 声明

```text
export interface TraceValueDiff {
    passed: boolean;
    expected?: unknown;
    actual?: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actual` | 属性 | <code>actual?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expected` | 属性 | <code>expected?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `passed` | 属性 | <code>passed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
