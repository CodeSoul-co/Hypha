# `@codesoul-co/hypha-memory` / `memory-runtime-coordinator`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-runtime-coordinator.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)
- 导出数: **12**

## 模块用法

用于执行该边界的运行时行为。Memory runtime coordinator 模块公开 3 类、8 接口、1 类型。

### 从包入口导入

```ts
import {
  InMemoryMemoryRuntimeControlStore,
  MemoryRuntimeCoordinator,
  StructuredMemoryRuntimeControlStore,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryRuntimeActiveState,
  MemoryRuntimeControlStore,
  MemoryRuntimeCoordinatorOptions,
  MemoryRuntimeCreator,
  MemoryRuntimeGeneration,
  MemoryRuntimeRevisionState,
  MemoryRuntimeSwitchResult,
  StructuredMemoryRuntimeControlStoreOptions,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 9 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMemoryRuntimeControlStore` | 类 | <code>new InMemoryMemoryRuntimeControlStore(): InMemoryMemoryRuntimeControlStore</code> | In Memory Memory Runtime Control Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryRuntimeCoordinator` | 类 | <code>new MemoryRuntimeCoordinator(options: MemoryRuntimeCoordinatorOptions): MemoryRuntimeCoordinator</code> | Memory Runtime Coordinator 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `StructuredMemoryRuntimeControlStore` | 类 | <code>new StructuredMemoryRuntimeControlStore(options: StructuredMemoryRuntimeControlStoreOptions): StructuredMemoryRuntimeControlStore</code> | Structured Memory Runtime Control Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryRuntimeActiveState` | 接口 | <code>interface MemoryRuntimeActiveState extends MemoryRuntimeRevisionState</code> | Memory Runtime Active State 接口，共包含 14 个公开字段或方法。 |
| `MemoryRuntimeControlStore` | 接口 | <code>interface MemoryRuntimeControlStore</code> | Memory Runtime Control Store 接口，共包含 6 个公开字段或方法。 |
| `MemoryRuntimeCoordinatorOptions` | 接口 | <code>interface MemoryRuntimeCoordinatorOptions</code> | Memory Runtime Coordinator Options 接口，共包含 6 个公开字段或方法。 |
| `MemoryRuntimeCreator` | 接口 | <code>interface MemoryRuntimeCreator</code> | Memory Runtime Creator 接口，共包含 1 个公开字段或方法。 |
| `MemoryRuntimeGeneration` | 接口 | <code>interface MemoryRuntimeGeneration</code> | Memory Runtime Generation 接口，共包含 6 个公开字段或方法。 |
| `MemoryRuntimeRevisionState` | 接口 | <code>interface MemoryRuntimeRevisionState</code> | Memory Runtime Revision State 接口，共包含 14 个公开字段或方法。 |
| `MemoryRuntimeSwitchResult` | 接口 | <code>interface MemoryRuntimeSwitchResult extends MemoryRuntimeGeneration</code> | Memory Runtime Switch Result 接口，共包含 7 个公开字段或方法。 |
| `StructuredMemoryRuntimeControlStoreOptions` | 接口 | <code>interface StructuredMemoryRuntimeControlStoreOptions</code> | Structured Memory Runtime Control Store Options 接口，共包含 3 个公开字段或方法。 |
| `MemoryRuntimeRevisionStatus` | 类型 | <code>type MemoryRuntimeRevisionStatus = 'active' &#124; 'draining' &#124; 'retired' &#124; 'quarantined'</code> | Memory Runtime Revision Status 公共类型别名；完整类型表达式见声明。 |

## `InMemoryMemoryRuntimeControlStore`

In Memory Memory Runtime Control Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryMemoryRuntimeControlStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### 声明

```text
export declare class InMemoryMemoryRuntimeControlStore implements MemoryRuntimeControlStore {
    readonly durability: "ephemeral";
    getActive(coordinatorId: string): Promise<MemoryRuntimeActiveState | null>;
    activate(coordinatorId: string, expectedGeneration: number | null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise<boolean>;
    getRevision(coordinatorId: string, profileRevision: string): Promise<MemoryRuntimeRevisionState | null>;
    setRevision(state: MemoryRuntimeRevisionState): Promise<void>;
    listRevisions(coordinatorId: string): Promise<MemoryRuntimeRevisionState[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activate` | 方法 | <code>activate(coordinatorId: string, expectedGeneration: number &#124; null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): InMemoryMemoryRuntimeControlStore</code> | 创建该类的实例。 |
| `durability` | 属性 | <code>readonly durability: "ephemeral"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `getActive` | 方法 | <code>getActive(coordinatorId: string): Promise&lt;MemoryRuntimeActiveState &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getRevision` | 方法 | <code>getRevision(coordinatorId: string, profileRevision: string): Promise&lt;MemoryRuntimeRevisionState &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listRevisions` | 方法 | <code>listRevisions(coordinatorId: string): Promise&lt;MemoryRuntimeRevisionState[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `setRevision` | 方法 | <code>setRevision(state: MemoryRuntimeRevisionState): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryRuntimeCoordinator`

Memory Runtime Coordinator 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryRuntimeCoordinator } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### 声明

```text
export declare class MemoryRuntimeCoordinator {
    constructor(options: MemoryRuntimeCoordinatorOptions);
    initialize(input: unknown, references?: ReadonlyMap<string, unknown>): Promise<MemoryRuntimeSwitchResult>;
    switchRevision(input: unknown, references?: ReadonlyMap<string, unknown>, expectedProfileRevision?: string): Promise<MemoryRuntimeSwitchResult>;
    withRuntime<T>(operation: (runtime: MemoryRuntime, generation: MemoryRuntimeGeneration) => Promise<T>): Promise<T>;
    probeActive(): Promise<MemoryRuntimeRevisionState>;
    current(): MemoryRuntimeGeneration | null;
    drain(): Promise<void>;
    close(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: MemoryRuntimeCoordinatorOptions): MemoryRuntimeCoordinator</code> | 创建该类的实例。 |
| `current` | 方法 | <code>current(): MemoryRuntimeGeneration &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `initialize` | 方法 | <code>initialize(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;): Promise&lt;MemoryRuntimeSwitchResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `probeActive` | 方法 | <code>probeActive(): Promise&lt;MemoryRuntimeRevisionState&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `switchRevision` | 方法 | <code>switchRevision(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;, expectedProfileRevision?: string): Promise&lt;MemoryRuntimeSwitchResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `withRuntime` | 方法 | <code>withRuntime&lt;T&gt;(operation: (runtime: MemoryRuntime, generation: MemoryRuntimeGeneration) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `StructuredMemoryRuntimeControlStore`

Structured Memory Runtime Control Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { StructuredMemoryRuntimeControlStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### 声明

```text
export declare class StructuredMemoryRuntimeControlStore implements MemoryRuntimeControlStore {
    readonly durability: "durable";
    constructor(options: StructuredMemoryRuntimeControlStoreOptions);
    getActive(coordinatorId: string): Promise<MemoryRuntimeActiveState | null>;
    activate(coordinatorId: string, expectedGeneration: number | null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise<boolean>;
    getRevision(coordinatorId: string, profileRevision: string): Promise<MemoryRuntimeRevisionState | null>;
    setRevision(state: MemoryRuntimeRevisionState): Promise<void>;
    listRevisions(coordinatorId: string): Promise<MemoryRuntimeRevisionState[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activate` | 方法 | <code>activate(coordinatorId: string, expectedGeneration: number &#124; null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: StructuredMemoryRuntimeControlStoreOptions): StructuredMemoryRuntimeControlStore</code> | 创建该类的实例。 |
| `durability` | 属性 | <code>readonly durability: "durable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `getActive` | 方法 | <code>getActive(coordinatorId: string): Promise&lt;MemoryRuntimeActiveState &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getRevision` | 方法 | <code>getRevision(coordinatorId: string, profileRevision: string): Promise&lt;MemoryRuntimeRevisionState &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listRevisions` | 方法 | <code>listRevisions(coordinatorId: string): Promise&lt;MemoryRuntimeRevisionState[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `setRevision` | 方法 | <code>setRevision(state: MemoryRuntimeRevisionState): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryRuntimeActiveState`

Memory Runtime Active State 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRuntimeActiveState } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### 声明

```text
export interface MemoryRuntimeActiveState extends MemoryRuntimeRevisionState {
    id: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityHash` | 属性 | <code>capabilityHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilitySnapshot` | 属性 | <code>capabilitySnapshot: MemoryManagementCapabilities</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `coordinatorId` | 属性 | <code>coordinatorId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `generation` | 属性 | <code>generation: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observedAt` | 属性 | <code>observedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileHash` | 属性 | <code>profileHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileId` | 属性 | <code>profileId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `quarantineError` | 属性 | <code>quarantineError?: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtimeId` | 属性 | <code>runtimeId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: MemoryRuntimeRevisionStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRuntimeControlStore`

Memory Runtime Control Store 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRuntimeControlStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### 声明

```text
export interface MemoryRuntimeControlStore {
    readonly durability: 'ephemeral' | 'durable';
    getActive(coordinatorId: string): Promise<MemoryRuntimeActiveState | null>;
    activate(coordinatorId: string, expectedGeneration: number | null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise<boolean>;
    getRevision(coordinatorId: string, profileRevision: string): Promise<MemoryRuntimeRevisionState | null>;
    setRevision(state: MemoryRuntimeRevisionState): Promise<void>;
    listRevisions(coordinatorId: string): Promise<MemoryRuntimeRevisionState[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activate` | 方法 | <code>activate(coordinatorId: string, expectedGeneration: number &#124; null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `durability` | 属性 | <code>readonly durability: "ephemeral" &#124; "durable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `getActive` | 方法 | <code>getActive(coordinatorId: string): Promise&lt;MemoryRuntimeActiveState &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getRevision` | 方法 | <code>getRevision(coordinatorId: string, profileRevision: string): Promise&lt;MemoryRuntimeRevisionState &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listRevisions` | 方法 | <code>listRevisions(coordinatorId: string): Promise&lt;MemoryRuntimeRevisionState[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `setRevision` | 方法 | <code>setRevision(state: MemoryRuntimeRevisionState): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryRuntimeCoordinatorOptions`

Memory Runtime Coordinator Options 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRuntimeCoordinatorOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### 声明

```text
export interface MemoryRuntimeCoordinatorOptions {
    id: string;
    factory: MemoryRuntimeFactory | MemoryRuntimeCreator;
    store: MemoryRuntimeControlStore;
    requireDurableStore?: boolean;
    now?: () => Date;
    capabilityProbeIntervalMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityProbeIntervalMs` | 属性 | <code>capabilityProbeIntervalMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `factory` | 属性 | <code>factory: MemoryRuntimeFactory &#124; MemoryRuntimeCreator</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `requireDurableStore` | 属性 | <code>requireDurableStore?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `store` | 属性 | <code>store: MemoryRuntimeControlStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRuntimeCreator`

Memory Runtime Creator 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRuntimeCreator } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### 声明

```text
export interface MemoryRuntimeCreator {
    create(input: unknown, references?: ReadonlyMap<string, unknown>): Promise<MemoryRuntime>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;): Promise&lt;MemoryRuntime&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryRuntimeGeneration`

Memory Runtime Generation 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRuntimeGeneration } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### 声明

```text
export interface MemoryRuntimeGeneration {
    generation: number;
    profileId: string;
    profileRevision: string;
    providerId: string;
    providerRevision: string;
    runtimeId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `generation` | 属性 | <code>generation: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileId` | 属性 | <code>profileId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtimeId` | 属性 | <code>runtimeId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRuntimeRevisionState`

Memory Runtime Revision State 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRuntimeRevisionState } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### 声明

```text
export interface MemoryRuntimeRevisionState {
    id: string;
    coordinatorId: string;
    profileId: string;
    profileRevision: string;
    providerId: string;
    providerRevision: string;
    runtimeId: string;
    profileHash: string;
    capabilityHash: string;
    capabilitySnapshot: MemoryManagementCapabilities;
    status: MemoryRuntimeRevisionStatus;
    generation: number;
    observedAt: string;
    quarantineError?: NormalizedMemoryError;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityHash` | 属性 | <code>capabilityHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilitySnapshot` | 属性 | <code>capabilitySnapshot: MemoryManagementCapabilities</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `coordinatorId` | 属性 | <code>coordinatorId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `generation` | 属性 | <code>generation: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observedAt` | 属性 | <code>observedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileHash` | 属性 | <code>profileHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileId` | 属性 | <code>profileId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `quarantineError` | 属性 | <code>quarantineError?: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtimeId` | 属性 | <code>runtimeId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: MemoryRuntimeRevisionStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRuntimeSwitchResult`

Memory Runtime Switch Result 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRuntimeSwitchResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### 声明

```text
export interface MemoryRuntimeSwitchResult extends MemoryRuntimeGeneration {
    previousProfileRevision?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `generation` | 属性 | <code>generation: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `previousProfileRevision` | 属性 | <code>previousProfileRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileId` | 属性 | <code>profileId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtimeId` | 属性 | <code>runtimeId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StructuredMemoryRuntimeControlStoreOptions`

Structured Memory Runtime Control Store Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StructuredMemoryRuntimeControlStoreOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### 声明

```text
export interface StructuredMemoryRuntimeControlStoreOptions {
    provider: StructuredStoreProvider;
    activeTable?: string;
    revisionTable?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeTable` | 属性 | <code>activeTable?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: StructuredStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revisionTable` | 属性 | <code>revisionTable?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRuntimeRevisionStatus`

Memory Runtime Revision Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryRuntimeRevisionStatus } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### 声明

```text
export type MemoryRuntimeRevisionStatus = 'active' | 'draining' | 'retired' | 'quarantined';
```
