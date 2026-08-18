# `@codesoul-co/hypha-core` / `modules/runtime/runtime-helper-sdk`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-helper-sdk.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)
- 导出数: **8**

## 模块用法

用于执行该边界的运行时行为。Runtime helper sdk 模块公开 5 类、2 函数、1 接口。

### 从包入口导入

```ts
import {
  DefaultRuntimeTransitionHelper,
  DefaultRuntimeWaitHelper,
  DeterministicRuntimeClockHelper,
  DeterministicRuntimeIdHelper,
  InMemoryRuntimeDeterminismStore,
  createRuntimeHelperSdk,
  deterministicObservationKey,
} from '@codesoul-co/hypha-core';

import type {
  CreateRuntimeHelperSdkOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 5 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultRuntimeTransitionHelper` | 类 | <code>new DefaultRuntimeTransitionHelper(): DefaultRuntimeTransitionHelper</code> | Default Runtime Transition Helper 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DefaultRuntimeWaitHelper` | 类 | <code>new DefaultRuntimeWaitHelper(): DefaultRuntimeWaitHelper</code> | Default Runtime Wait Helper 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DeterministicRuntimeClockHelper` | 类 | <code>new DeterministicRuntimeClockHelper(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, waits: RuntimeWaitHelper, source?: () =&gt; string): DeterministicRuntimeClockHelper</code> | Deterministic Runtime Clock Helper 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DeterministicRuntimeIdHelper` | 类 | <code>new DeterministicRuntimeIdHelper(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, source?: (namespace: string) =&gt; string): DeterministicRuntimeIdHelper</code> | Deterministic Runtime ID Helper 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryRuntimeDeterminismStore` | 类 | <code>new InMemoryRuntimeDeterminismStore(): InMemoryRuntimeDeterminismStore</code> | In Memory Runtime Determinism Store 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `createRuntimeHelperSdk` | 函数 | <code>createRuntimeHelperSdk(options: CreateRuntimeHelperSdkOptions): RuntimeHelperSdk</code> | Create Runtime Helper Sdk 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `deterministicObservationKey` | 函数 | <code>deterministicObservationKey(scope: RuntimeDeterminismScope, key: string): string</code> | Deterministic Observation Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `CreateRuntimeHelperSdkOptions` | 接口 | <code>interface CreateRuntimeHelperSdkOptions</code> | Create Runtime Helper Sdk Options 接口，共包含 4 个公开字段或方法。 |

## `DefaultRuntimeTransitionHelper`

Default Runtime Transition Helper 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultRuntimeTransitionHelper } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### 声明

```text
export declare class DefaultRuntimeTransitionHelper implements RuntimeTransitionHelper {
    propose(to: string, reason?: string, variablesPatch?: Record<string, RuntimeJsonValue>): RuntimeTransitionProposal;
    complete(output?: RuntimeJsonValue, variablesPatch?: Record<string, RuntimeJsonValue>): RuntimeStateExecutionResult;
    continue(observation?: RuntimeJsonValue): RuntimeStateExecutionResult;
    fail(error: NormalizedRuntimeError): RuntimeStateExecutionResult;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(output?: RuntimeJsonValue, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeStateExecutionResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): DefaultRuntimeTransitionHelper</code> | 创建该类的实例。 |
| `continue` | 方法 | <code>continue(observation?: RuntimeJsonValue): RuntimeStateExecutionResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fail` | 方法 | <code>fail(error: NormalizedRuntimeError): RuntimeStateExecutionResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `propose` | 方法 | <code>propose(to: string, reason?: string, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeTransitionProposal</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DefaultRuntimeWaitHelper`

Default Runtime Wait Helper 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultRuntimeWaitHelper } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### 声明

```text
export declare class DefaultRuntimeWaitHelper implements RuntimeWaitHelper {
    human(request: HumanWaitRequest): RuntimeStateExecutionResult;
    signal(request: SignalWaitRequest): RuntimeStateExecutionResult;
    timer(request: TimerWaitRequest): RuntimeStateExecutionResult;
    pause(request: PauseRequest): RuntimeStateExecutionResult;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DefaultRuntimeWaitHelper</code> | 创建该类的实例。 |
| `human` | 方法 | <code>human(request: HumanWaitRequest): RuntimeStateExecutionResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `pause` | 方法 | <code>pause(request: PauseRequest): RuntimeStateExecutionResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `signal` | 方法 | <code>signal(request: SignalWaitRequest): RuntimeStateExecutionResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `timer` | 方法 | <code>timer(request: TimerWaitRequest): RuntimeStateExecutionResult</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DeterministicRuntimeClockHelper`

Deterministic Runtime Clock Helper 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DeterministicRuntimeClockHelper } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### 声明

```text
export declare class DeterministicRuntimeClockHelper implements RuntimeClockHelper {
    constructor(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, waits: RuntimeWaitHelper, source?: () => string);
    now(): Promise<string>;
    sleepUntil(isoTime: string): Promise<RuntimeStateExecutionResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, waits: RuntimeWaitHelper, source?: () =&gt; string): DeterministicRuntimeClockHelper</code> | 创建该类的实例。 |
| `now` | 方法 | <code>now(): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `sleepUntil` | 方法 | <code>sleepUntil(isoTime: string): Promise&lt;RuntimeStateExecutionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DeterministicRuntimeIdHelper`

Deterministic Runtime ID Helper 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DeterministicRuntimeIdHelper } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### 声明

```text
export declare class DeterministicRuntimeIdHelper implements RuntimeIdHelper {
    constructor(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, source?: (namespace: string) => string);
    next(namespace: string): Promise<string>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, source?: (namespace: string) =&gt; string): DeterministicRuntimeIdHelper</code> | 创建该类的实例。 |
| `next` | 方法 | <code>next(namespace: string): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryRuntimeDeterminismStore`

In Memory Runtime Determinism Store 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryRuntimeDeterminismStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### 声明

```text
export declare class InMemoryRuntimeDeterminismStore implements RuntimeDeterminismStore {
    resolve<T extends RuntimeJsonValue>(request: RuntimeDeterminismResolveRequest, produce: () => T | Promise<T>): Promise<RuntimeDeterminismResolution<T>>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryRuntimeDeterminismStore</code> | 创建该类的实例。 |
| `resolve` | 方法 | <code>resolve&lt;T extends RuntimeJsonValue&gt;(request: RuntimeDeterminismResolveRequest, produce: () =&gt; T &#124; Promise&lt;T&gt;): Promise&lt;RuntimeDeterminismResolution&lt;T&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `createRuntimeHelperSdk`

Create Runtime Helper Sdk 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createRuntimeHelperSdk } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### 声明

```text
export declare function createRuntimeHelperSdk(options: CreateRuntimeHelperSdkOptions): RuntimeHelperSdk;
```

### 调用签名

```text
createRuntimeHelperSdk(options: CreateRuntimeHelperSdkOptions): RuntimeHelperSdk
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>CreateRuntimeHelperSdkOptions</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeHelperSdk`
- 说明: 返回值契约由上述类型定义。

## `deterministicObservationKey`

Deterministic Observation Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { deterministicObservationKey } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### 声明

```text
export declare function deterministicObservationKey(scope: RuntimeDeterminismScope, key: string): string;
```

### 调用签名

```text
deterministicObservationKey(scope: RuntimeDeterminismScope, key: string): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `scope` | <code>RuntimeDeterminismScope</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `key` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `CreateRuntimeHelperSdkOptions`

Create Runtime Helper Sdk Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CreateRuntimeHelperSdkOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### 声明

```text
export interface CreateRuntimeHelperSdkOptions {
    scope: RuntimeDeterminismScope;
    determinismStore: RuntimeDeterminismStore;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `determinismStore` | 属性 | <code>determinismStore: RuntimeDeterminismStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextId` | 方法 | <code>nextId?(namespace: string): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeDeterminismScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
