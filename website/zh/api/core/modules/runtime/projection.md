# `@codesoul-co/hypha-core` / `modules/runtime/projection`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/projection.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)
- 导出数: **7**

## 模块用法

用于执行该边界的运行时行为。Projection 模块公开 2 类、1 函数、4 接口。

### 从包入口导入

```ts
import {
  InMemoryProjectionStore,
  ProjectionEngine,
  validateProjectionRecord,
} from '@codesoul-co/hypha-core';

import type {
  ProjectionDefinition,
  ProjectionEngineOptions,
  ProjectionRecord,
  ProjectionStore,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryProjectionStore` | 类 | <code>new InMemoryProjectionStore&lt;TState = unknown&gt;(): InMemoryProjectionStore&lt;TState&gt;</code> | In Memory Projection Store 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ProjectionEngine` | 类 | <code>new ProjectionEngine(options: ProjectionEngineOptions): ProjectionEngine</code> | Projection Engine 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `validateProjectionRecord` | 函数 | <code>validateProjectionRecord&lt;TState&gt;(record: ProjectionRecord&lt;TState&gt;): void</code> | Validate Projection Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ProjectionDefinition` | 接口 | <code>interface ProjectionDefinition</code> | Projection Definition 接口，共包含 5 个公开字段或方法。 |
| `ProjectionEngineOptions` | 接口 | <code>interface ProjectionEngineOptions</code> | Projection Engine Options 接口，共包含 2 个公开字段或方法。 |
| `ProjectionRecord` | 接口 | <code>interface ProjectionRecord</code> | Projection Record 接口，共包含 7 个公开字段或方法。 |
| `ProjectionStore` | 接口 | <code>interface ProjectionStore</code> | Projection Store 接口，共包含 3 个公开字段或方法。 |

## `InMemoryProjectionStore`

In Memory Projection Store 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryProjectionStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)

### 声明

```text
export declare class InMemoryProjectionStore<TState = unknown> implements ProjectionStore<TState> {
    get(projectionId: string, key: string): Promise<ProjectionRecord<TState> | null>;
    put(record: ProjectionRecord<TState>, expectedRevision?: number): Promise<void>;
    delete(projectionId: string, key: string): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>&lt;TState = unknown&gt;(): InMemoryProjectionStore&lt;TState&gt;</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(projectionId: string, key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(projectionId: string, key: string): Promise&lt;ProjectionRecord&lt;TState&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(record: ProjectionRecord&lt;TState&gt;, expectedRevision?: number): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ProjectionEngine`

Projection Engine 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ProjectionEngine } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)

### 声明

```text
export declare class ProjectionEngine {
    constructor(options: ProjectionEngineOptions);
    update<TState>(definition: ProjectionDefinition<TState>, store: ProjectionStore<TState>, scope: EventStreamScope, key?: string): Promise<ProjectionRecord<TState>>;
    rebuild<TState>(definition: ProjectionDefinition<TState>, store: ProjectionStore<TState>, scope: EventStreamScope, key?: string): Promise<ProjectionRecord<TState>>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ProjectionEngineOptions): ProjectionEngine</code> | 创建该类的实例。 |
| `rebuild` | 方法 | <code>rebuild&lt;TState&gt;(definition: ProjectionDefinition&lt;TState&gt;, store: ProjectionStore&lt;TState&gt;, scope: EventStreamScope, key?: string): Promise&lt;ProjectionRecord&lt;TState&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update&lt;TState&gt;(definition: ProjectionDefinition&lt;TState&gt;, store: ProjectionStore&lt;TState&gt;, scope: EventStreamScope, key?: string): Promise&lt;ProjectionRecord&lt;TState&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `validateProjectionRecord`

Validate Projection Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateProjectionRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)

### 声明

```text
export declare function validateProjectionRecord<TState>(record: ProjectionRecord<TState>): void;
```

### 调用签名

```text
validateProjectionRecord<TState>(record: ProjectionRecord<TState>): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `record` | <code>ProjectionRecord&lt;TState&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `ProjectionDefinition`

Projection Definition 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProjectionDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)

### 声明

```text
export interface ProjectionDefinition<TState> {
    id: string;
    version: string;
    initialState(): TState;
    applies(event: PersistedFrameworkEvent): boolean;
    reduce(state: TState, event: PersistedFrameworkEvent): TState;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `applies` | 方法 | <code>applies(event: PersistedFrameworkEvent): boolean</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `initialState` | 方法 | <code>initialState(): TState</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reduce` | 方法 | <code>reduce(state: TState, event: PersistedFrameworkEvent): TState</code> | 公开方法；参数与返回类型以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ProjectionEngineOptions`

Projection Engine Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProjectionEngineOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)

### 声明

```text
export interface ProjectionEngineOptions {
    events: Pick<EventRuntime, 'read'>;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: Pick&lt;EventRuntime, "read"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ProjectionRecord`

Projection Record 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProjectionRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)

### 声明

```text
export interface ProjectionRecord<TState = unknown> {
    projectionId: string;
    projectionVersion: string;
    key: string;
    state: TState;
    lastSequence: number;
    revision: number;
    updatedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `key` | 属性 | <code>key: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastSequence` | 属性 | <code>lastSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionId` | 属性 | <code>projectionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionVersion` | 属性 | <code>projectionVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: TState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ProjectionStore`

Projection Store 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProjectionStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)

### 声明

```text
export interface ProjectionStore<TState = unknown> {
    get(projectionId: string, key: string): Promise<ProjectionRecord<TState> | null>;
    put(record: ProjectionRecord<TState>, expectedRevision?: number): Promise<void>;
    delete?(projectionId: string, key: string): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete?(projectionId: string, key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(projectionId: string, key: string): Promise&lt;ProjectionRecord&lt;TState&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(record: ProjectionRecord&lt;TState&gt;, expectedRevision?: number): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
