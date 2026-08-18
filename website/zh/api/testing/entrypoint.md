# `@codesoul-co/hypha-testing` / `index`

- 包索引: [`@codesoul-co/hypha-testing`](/zh/api/testing)
- 源码: [`packages/testing/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts)
- 导出数: **4**

## 模块用法

聚合 `@codesoul-co/hypha-testing` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。

### 从包入口导入

```ts
import {
  assertEventTypes,
  assertStatePath,
  collectEventTypes,
} from '@codesoul-co/hypha-testing';

import type {
  GoldenTraceFixture,
} from '@codesoul-co/hypha-testing';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertEventTypes` | 函数 | <code>assertEventTypes(fixture: GoldenTraceFixture, expectedTypes: FrameworkEventType[]): boolean</code> | Assert Event Types 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `assertStatePath` | 函数 | <code>assertStatePath(fixture: GoldenTraceFixture, expectedPath: string[]): boolean</code> | Assert State Path 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `collectEventTypes` | 函数 | <code>collectEventTypes(events: FrameworkEvent[]): FrameworkEventType[]</code> | Collect Event Types 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `GoldenTraceFixture` | 接口 | <code>interface GoldenTraceFixture</code> | Golden Trace Fixture 接口，共包含 4 个公开字段或方法。 |

## `assertEventTypes`

Assert Event Types 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assertEventTypes } from '@codesoul-co/hypha-testing';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts)

### 声明

```text
export declare function assertEventTypes(fixture: GoldenTraceFixture, expectedTypes: FrameworkEventType[]): boolean;
```

### 调用签名

```text
assertEventTypes(fixture: GoldenTraceFixture, expectedTypes: FrameworkEventType[]): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `fixture` | <code>GoldenTraceFixture</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `expectedTypes` | <code>FrameworkEventType[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `assertStatePath`

Assert State Path 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assertStatePath } from '@codesoul-co/hypha-testing';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts)

### 声明

```text
export declare function assertStatePath(fixture: GoldenTraceFixture, expectedPath: string[]): boolean;
```

### 调用签名

```text
assertStatePath(fixture: GoldenTraceFixture, expectedPath: string[]): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `fixture` | <code>GoldenTraceFixture</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `expectedPath` | <code>string[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `collectEventTypes`

Collect Event Types 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { collectEventTypes } from '@codesoul-co/hypha-testing';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts)

### 声明

```text
export declare function collectEventTypes(events: FrameworkEvent[]): FrameworkEventType[];
```

### 调用签名

```text
collectEventTypes(events: FrameworkEvent[]): FrameworkEventType[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `events` | <code>FrameworkEvent&lt;unknown&gt;[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FrameworkEventType[]`
- 说明: 返回值契约由上述类型定义。

## `GoldenTraceFixture`

Golden Trace Fixture 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { GoldenTraceFixture } from '@codesoul-co/hypha-testing';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts)

### 声明

```text
export interface GoldenTraceFixture {
    id: string;
    version: string;
    events: FrameworkEvent[];
    statePath?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statePath` | 属性 | <code>statePath?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
