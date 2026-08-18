# `@codesoul-co/hypha-core` / `modules/runtime/runtime-io-helpers`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-io-helpers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-io-helpers.ts)
- 导出数: **5**

## 模块用法

用于执行该边界的运行时行为。Runtime io helpers 模块公开 3 类、1 函数、1 接口。

### 从包入口导入

```ts
import {
  DefaultRuntimeEventHelper,
  DefaultRuntimeResourceHelper,
  DurableRuntimeEventCommitPort,
  createRuntimeIoHelperSdk,
} from '@codesoul-co/hypha-core';

import type {
  DefaultRuntimeEventHelperOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultRuntimeEventHelper` | 类 | <code>new DefaultRuntimeEventHelper(options: DefaultRuntimeEventHelperOptions): DefaultRuntimeEventHelper</code> | Default Runtime Event Helper 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DefaultRuntimeResourceHelper` | 类 | <code>new DefaultRuntimeResourceHelper(dependencies: RuntimeResourceHelperDependencies): DefaultRuntimeResourceHelper</code> | Default Runtime Resource Helper 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DurableRuntimeEventCommitPort` | 类 | <code>new DurableRuntimeEventCommitPort(store: DurableEventStore): DurableRuntimeEventCommitPort</code> | Durable Runtime Event Commit Port 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `createRuntimeIoHelperSdk` | 函数 | <code>createRuntimeIoHelperSdk(options: { event: DefaultRuntimeEventHelperOptions; resource: RuntimeResourceHelperDependencies; }): RuntimeIoHelperSdk</code> | Create Runtime Io Helper Sdk 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `DefaultRuntimeEventHelperOptions` | 接口 | <code>interface DefaultRuntimeEventHelperOptions</code> | Default Runtime Event Helper Options 接口，共包含 4 个公开字段或方法。 |

## `DefaultRuntimeEventHelper`

Default Runtime Event Helper 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultRuntimeEventHelper } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-io-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-io-helpers.ts)

### 声明

```text
export declare class DefaultRuntimeEventHelper implements RuntimeEventHelper {
    constructor(options: DefaultRuntimeEventHelperOptions);
    append<T extends RuntimeJsonValue>(type: `runtime.observation.${string}`, payload: T, options?: RuntimeEventAppendOptions): Promise<FrameworkEvent<T>>;
    appendBatch(inputs: RuntimeObservationEventInput[]): Promise<FrameworkEvent[]>;
    readSince(sequence: number): Promise<FrameworkEvent[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append&lt;T extends RuntimeJsonValue&gt;(type: `runtime.observation.${string}`, payload: T, options?: RuntimeEventAppendOptions): Promise&lt;FrameworkEvent&lt;T&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `appendBatch` | 方法 | <code>appendBatch(inputs: RuntimeObservationEventInput[]): Promise&lt;FrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: DefaultRuntimeEventHelperOptions): DefaultRuntimeEventHelper</code> | 创建该类的实例。 |
| `readSince` | 方法 | <code>readSince(sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DefaultRuntimeResourceHelper`

Default Runtime Resource Helper 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultRuntimeResourceHelper } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-io-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-io-helpers.ts)

### 声明

```text
export declare class DefaultRuntimeResourceHelper implements RuntimeResourceHelper {
    constructor(dependencies: RuntimeResourceHelperDependencies);
    acquire(resources: Omit<RuntimeResourceRequest, 'requestedClaimId'>[], options: RuntimeResourceAcquireOptions): Promise<RuntimeResourceClaim[]>;
    renew(claims: RuntimeResourceClaim[], options: RuntimeResourceRenewOptions): Promise<RuntimeResourceClaim[]>;
    release(claims: RuntimeResourceClaim[]): Promise<void>;
    assertCurrent(claim: RuntimeResourceClaim): Promise<RuntimeResourceClaim>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(resources: Omit&lt;RuntimeResourceRequest, "requestedClaimId"&gt;[], options: RuntimeResourceAcquireOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `assertCurrent` | 方法 | <code>assertCurrent(claim: RuntimeResourceClaim): Promise&lt;RuntimeResourceClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(dependencies: RuntimeResourceHelperDependencies): DefaultRuntimeResourceHelper</code> | 创建该类的实例。 |
| `release` | 方法 | <code>release(claims: RuntimeResourceClaim[]): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(claims: RuntimeResourceClaim[], options: RuntimeResourceRenewOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DurableRuntimeEventCommitPort`

Durable Runtime Event Commit Port 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DurableRuntimeEventCommitPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-io-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-io-helpers.ts)

### 声明

```text
export declare class DurableRuntimeEventCommitPort implements RuntimeEventCommitPort {
    constructor(store: DurableEventStore);
    append(request: RuntimeEventCommitRequest): Promise<FrameworkEvent[]>;
    readSince(scope: RuntimeScope, sequence: number): Promise<FrameworkEvent[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: RuntimeEventCommitRequest): Promise&lt;FrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(store: DurableEventStore): DurableRuntimeEventCommitPort</code> | 创建该类的实例。 |
| `readSince` | 方法 | <code>readSince(scope: RuntimeScope, sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `createRuntimeIoHelperSdk`

Create Runtime Io Helper Sdk 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createRuntimeIoHelperSdk } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-io-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-io-helpers.ts)

### 声明

```text
export declare function createRuntimeIoHelperSdk(options: {
    event: DefaultRuntimeEventHelperOptions;
    resource: RuntimeResourceHelperDependencies;
}): RuntimeIoHelperSdk;
```

### 调用签名

```text
createRuntimeIoHelperSdk(options: { event: DefaultRuntimeEventHelperOptions; resource: RuntimeResourceHelperDependencies; }): RuntimeIoHelperSdk
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>{ event: DefaultRuntimeEventHelperOptions; resource: RuntimeResourceHelperDependencies; }</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeIoHelperSdk`
- 说明: 返回值契约由上述类型定义。

## `DefaultRuntimeEventHelperOptions`

Default Runtime Event Helper Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DefaultRuntimeEventHelperOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-io-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-io-helpers.ts)

### 声明

```text
export interface DefaultRuntimeEventHelperOptions {
    execution: RuntimeHelperExecutionScope;
    ids: RuntimeIdHelper;
    clock: {
        now(): Promise<string>;
    };
    port: RuntimeEventCommitPort;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clock` | 属性 | <code>clock: { now(): Promise&lt;string&gt;; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `execution` | 属性 | <code>execution: RuntimeHelperExecutionScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ids` | 属性 | <code>ids: RuntimeIdHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `port` | 属性 | <code>port: RuntimeEventCommitPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
