# `@codesoul-co/hypha-core` / `modules/runtime/runtime-activity-helper`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-activity-helper.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-helper.ts)
- 导出数: **3**

## 模块用法

用于执行该边界的运行时行为。Runtime activity helper 模块公开 2 类、1 接口。

### 从包入口导入

```ts
import {
  DefaultRuntimeActivityHelper,
  RuntimeEventActivityLifecycleCommitPort,
} from '@codesoul-co/hypha-core';

import type {
  DefaultRuntimeActivityHelperOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultRuntimeActivityHelper` | 类 | <code>new DefaultRuntimeActivityHelper(options: DefaultRuntimeActivityHelperOptions): DefaultRuntimeActivityHelper</code> | Default Runtime Activity Helper 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RuntimeEventActivityLifecycleCommitPort` | 类 | <code>new RuntimeEventActivityLifecycleCommitPort(events: RuntimeEventCommitPort): RuntimeEventActivityLifecycleCommitPort</code> | Runtime Event Activity Lifecycle Commit Port 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DefaultRuntimeActivityHelperOptions` | 接口 | <code>interface DefaultRuntimeActivityHelperOptions</code> | Default Runtime Activity Helper Options 接口，共包含 6 个公开字段或方法。 |

## `DefaultRuntimeActivityHelper`

Default Runtime Activity Helper 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultRuntimeActivityHelper } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-helper`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-helper.ts)

### 声明

```text
export declare class DefaultRuntimeActivityHelper implements RuntimeActivityHelper {
    constructor(options: DefaultRuntimeActivityHelperOptions);
    tool(request: RuntimeActivityRequest): Promise<RuntimeActivityObservation>;
    memory(request: RuntimeActivityRequest): Promise<RuntimeActivityObservation>;
    model(request: RuntimeActivityRequest): Promise<RuntimeActivityObservation>;
    execution(request: RuntimeActivityRequest): Promise<RuntimeActivityObservation>;
    custom(request: RuntimeActivityRequest): Promise<RuntimeActivityObservation>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DefaultRuntimeActivityHelperOptions): DefaultRuntimeActivityHelper</code> | 创建该类的实例。 |
| `custom` | 方法 | <code>custom(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `execution` | 方法 | <code>execution(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `memory` | 方法 | <code>memory(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `model` | 方法 | <code>model(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `tool` | 方法 | <code>tool(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeEventActivityLifecycleCommitPort`

Runtime Event Activity Lifecycle Commit Port 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RuntimeEventActivityLifecycleCommitPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-helper`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-helper.ts)

### 声明

```text
export declare class RuntimeEventActivityLifecycleCommitPort implements RuntimeActivityLifecycleCommitPort {
    constructor(events: RuntimeEventCommitPort);
    append(request: RuntimeActivityLifecycleCommitRequest): Promise<FrameworkEvent>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: RuntimeActivityLifecycleCommitRequest): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(events: RuntimeEventCommitPort): RuntimeEventActivityLifecycleCommitPort</code> | 创建该类的实例。 |

## `DefaultRuntimeActivityHelperOptions`

Default Runtime Activity Helper Options 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DefaultRuntimeActivityHelperOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-helper`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-helper.ts)

### 声明

```text
export interface DefaultRuntimeActivityHelperOptions {
    execution: RuntimeHelperExecutionScope;
    ids: RuntimeIdHelper;
    clock: {
        now(): Promise<string>;
    };
    dispatch: RuntimeActivityDispatchPort;
    lifecycle: RuntimeActivityLifecycleCommitPort;
    abortSignal: AbortSignal;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `clock` | 属性 | <code>clock: { now(): Promise&lt;string&gt;; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dispatch` | 属性 | <code>dispatch: RuntimeActivityDispatchPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `execution` | 属性 | <code>execution: RuntimeHelperExecutionScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ids` | 属性 | <code>ids: RuntimeIdHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lifecycle` | 属性 | <code>lifecycle: RuntimeActivityLifecycleCommitPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
