# `@codesoul-co/hypha-core` / `modules/runtime/runtime-replay-service`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-replay-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-replay-service.ts)
- 导出数: **2**

## 模块用法

用于执行该边界的运行时行为。Runtime replay service 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  RuntimeReplayService,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeReplayServiceOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeReplayService` | 类 | <code>new RuntimeReplayService(options: RuntimeReplayServiceOptions): RuntimeReplayService</code> | Runtime Replay Service 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RuntimeReplayServiceOptions` | 接口 | <code>interface RuntimeReplayServiceOptions</code> | Runtime Replay Service Options 接口，共包含 3 个公开字段或方法。 |

## `RuntimeReplayService`

Runtime Replay Service 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RuntimeReplayService } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-replay-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-replay-service.ts)

### 声明

```text
export declare class RuntimeReplayService implements RuntimeReplayServiceContract {
    constructor(options: RuntimeReplayServiceOptions);
    replay(input: RuntimeReplayRequest): Promise<RuntimeReplayResult>;
    verify(input: RuntimeReplayVerificationRequest): Promise<RuntimeReplayVerificationResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeReplayServiceOptions): RuntimeReplayService</code> | 创建该类的实例。 |
| `replay` | 方法 | <code>replay(input: RuntimeReplayRequest): Promise&lt;RuntimeReplayResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `verify` | 方法 | <code>verify(input: RuntimeReplayVerificationRequest): Promise&lt;RuntimeReplayVerificationResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeReplayServiceOptions`

Runtime Replay Service Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeReplayServiceOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-replay-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-replay-service.ts)

### 声明

```text
export interface RuntimeReplayServiceOptions {
    events: Pick<EventRuntime, 'read'>;
    checkpoints: Pick<RuntimeCheckpointService, 'load'>;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpoints` | 属性 | <code>checkpoints: Pick&lt;RuntimeCheckpointService, "load"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>events: Pick&lt;EventRuntime, "read"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
