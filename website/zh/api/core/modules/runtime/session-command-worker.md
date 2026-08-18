# `@codesoul-co/hypha-core` / `modules/runtime/session-command-worker`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/session-command-worker.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)
- 导出数: **7**

## 模块用法

用于执行该边界的运行时行为。Session command worker 模块公开 1 类、3 接口、3 类型。

### 从包入口导入

```ts
import {
  DurableSessionCommandWorker,
} from '@codesoul-co/hypha-core';

import type {
  DurableSessionCommandWorkerOptions,
  SessionCommandHandlerContext,
  SessionCommandWorkerResult,
  SessionCommandHandler,
  SessionCommandHandlerResult,
  SessionCommandWorkerDisposition,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 6 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DurableSessionCommandWorker` | 类 | <code>new DurableSessionCommandWorker(options: DurableSessionCommandWorkerOptions): DurableSessionCommandWorker</code> | Claims and resolves one durable Session command without owning a polling loop. Command handlers must explicitly classify expected retry and failure outcomes. |
| `DurableSessionCommandWorkerOptions` | 接口 | <code>interface DurableSessionCommandWorkerOptions</code> | Durable Session Command Worker Options 接口，共包含 11 个公开字段或方法。 |
| `SessionCommandHandlerContext` | 接口 | <code>interface SessionCommandHandlerContext</code> | Session Command Handler Context 接口，共包含 4 个公开字段或方法。 |
| `SessionCommandWorkerResult` | 接口 | <code>interface SessionCommandWorkerResult</code> | Session Command Worker Result 接口，共包含 5 个公开字段或方法。 |
| `SessionCommandHandler` | 类型 | <code>type SessionCommandHandler = (context: Readonly&lt;SessionCommandHandlerContext&gt;) =&gt; Promise&lt;SessionCommandHandlerResult&gt;</code> | Session Command Handler 公共类型别名；完整类型表达式见声明。 |
| `SessionCommandHandlerResult` | 类型 | <code>type SessionCommandHandlerResult = { disposition: 'applied'; resultRunId?: string; resultEventIds?: string[]; } &#124; { disposition: 'retry'; availableAt?: string; } &#124; { disposition: 'failed'; rejectionCode: string; deadLetter?: boolean; }</code> | Session Command Handler Result 公共类型别名；完整类型表达式见声明。 |
| `SessionCommandWorkerDisposition` | 类型 | <code>type SessionCommandWorkerDisposition = 'idle' &#124; 'applied' &#124; 'retry_scheduled' &#124; 'failed' &#124; 'dead_lettered' &#124; 'lease_lost' &#124; 'aborted'</code> | Session Command Worker Disposition 公共类型别名；完整类型表达式见声明。 |

## `DurableSessionCommandWorker`

Claims and resolves one durable Session command without owning a polling loop. Command handlers must explicitly classify expected retry and failure outcomes.

- 种类: 类
- 导入: `import { DurableSessionCommandWorker } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)

### 声明

```text
export declare class DurableSessionCommandWorker {
    constructor(options: DurableSessionCommandWorkerOptions);
    processNext(scope?: SessionQueueScope, signal?: AbortSignal): Promise<SessionCommandWorkerResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DurableSessionCommandWorkerOptions): DurableSessionCommandWorker</code> | 创建该类的实例。 |
| `processNext` | 方法 | <code>processNext(scope?: SessionQueueScope, signal?: AbortSignal): Promise&lt;SessionCommandWorkerResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DurableSessionCommandWorkerOptions`

Durable Session Command Worker Options 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DurableSessionCommandWorkerOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)

### 声明

```text
export interface DurableSessionCommandWorkerOptions {
    queue: SessionQueue;
    workerId: string;
    leaseMs: number;
    handlers: Partial<Record<SessionCommandType, SessionCommandHandler>>;
    now?: () => string;
    renewalIntervalMs?: number;
    maxHandlerDurationMs?: number;
    wait?: (delayMs: number, signal: AbortSignal) => Promise<void>;
    onLeaseRenewalFailure?: (error: unknown, claim: Readonly<SessionCommandClaim>) => void;
    operationalTelemetry?: RuntimeOperationalTelemetry;
    monotonicNow?: () => number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `handlers` | 属性 | <code>handlers: Partial&lt;Record&lt;"user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session", SessionCommandHandler&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseMs` | 属性 | <code>leaseMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxHandlerDurationMs` | 属性 | <code>maxHandlerDurationMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `monotonicNow` | 方法 | <code>monotonicNow?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onLeaseRenewalFailure` | 方法 | <code>onLeaseRenewalFailure?(error: unknown, claim: Readonly&lt;SessionCommandClaim&gt;): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `operationalTelemetry` | 属性 | <code>operationalTelemetry?: RuntimeOperationalTelemetry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `queue` | 属性 | <code>queue: SessionQueue</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `renewalIntervalMs` | 属性 | <code>renewalIntervalMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `wait` | 方法 | <code>wait?(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `workerId` | 属性 | <code>workerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionCommandHandlerContext`

Session Command Handler Context 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionCommandHandlerContext } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)

### 声明

```text
export interface SessionCommandHandlerContext {
    command: Readonly<SessionCommandRecord>;
    signal: AbortSignal;
    claimToken: string;
    leaseEpoch: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimToken` | 属性 | <code>claimToken: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `command` | 属性 | <code>command: Readonly&lt;SessionCommandRecord&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionCommandWorkerResult`

Session Command Worker Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionCommandWorkerResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)

### 声明

```text
export interface SessionCommandWorkerResult {
    disposition: SessionCommandWorkerDisposition;
    commandId?: string;
    commandType?: SessionCommandType;
    attempts?: number;
    rejectionCode?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandId` | 属性 | <code>commandId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandType` | 属性 | <code>commandType?: "user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `disposition` | 属性 | <code>disposition: SessionCommandWorkerDisposition</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rejectionCode` | 属性 | <code>rejectionCode?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionCommandHandler`

Session Command Handler 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { SessionCommandHandler } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)

### 声明

```text
export type SessionCommandHandler = (context: Readonly<SessionCommandHandlerContext>) => Promise<SessionCommandHandlerResult>;
```

## `SessionCommandHandlerResult`

Session Command Handler Result 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { SessionCommandHandlerResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)

### 声明

```text
export type SessionCommandHandlerResult = {
    disposition: 'applied';
    resultRunId?: string;
    resultEventIds?: string[];
} | {
    disposition: 'retry';
    availableAt?: string;
} | {
    disposition: 'failed';
    rejectionCode: string;
    deadLetter?: boolean;
};
```

## `SessionCommandWorkerDisposition`

Session Command Worker Disposition 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { SessionCommandWorkerDisposition } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)

### 声明

```text
export type SessionCommandWorkerDisposition = 'idle' | 'applied' | 'retry_scheduled' | 'failed' | 'dead_lettered' | 'lease_lost' | 'aborted';
```
