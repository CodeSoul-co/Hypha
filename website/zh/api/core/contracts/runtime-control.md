# `@codesoul-co/hypha-core` / `contracts/runtime-control`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-control.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)
- 导出数: **9**

## 模块用法

用于声明并运行时校验契约。Runtime control 模块公开 2 常量、4 接口、3 类型。

### 从包入口导入

```ts
import {
  RUNTIME_CONTROL_DISPOSITIONS,
  RUNTIME_CONTROL_KINDS,
} from '@codesoul-co/hypha-core';

import type {
  RuntimePauseCommand,
  RuntimeResumeCommand,
  RuntimeRunControlResult,
  RuntimeSignalCommand,
  RuntimeControlDisposition,
  RuntimeControlKind,
  RuntimeRunControlCommand,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 7 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_CONTROL_DISPOSITIONS` | 常量 | <code>const RUNTIME_CONTROL_DISPOSITIONS: readonly ["applied", "reused", "lease_unavailable"]</code> | 由 `contracts/runtime-control` 模块导出的 RUNTIME CONTROL DISPOSITIONS 常量。 |
| `RUNTIME_CONTROL_KINDS` | 常量 | <code>const RUNTIME_CONTROL_KINDS: readonly ["pause", "resume", "signal"]</code> | 由 `contracts/runtime-control` 模块导出的 RUNTIME CONTROL KINDS 常量。 |
| `RuntimePauseCommand` | 接口 | <code>interface RuntimePauseCommand extends RuntimeRunControlCommandBase</code> | Runtime Pause Command 接口，共包含 10 个公开字段或方法。 |
| `RuntimeResumeCommand` | 接口 | <code>interface RuntimeResumeCommand extends RuntimeRunControlCommandBase</code> | Runtime Resume Command 接口，共包含 10 个公开字段或方法。 |
| `RuntimeRunControlResult` | 接口 | <code>interface RuntimeRunControlResult</code> | Runtime Run Control Result 接口，共包含 6 个公开字段或方法。 |
| `RuntimeSignalCommand` | 接口 | <code>interface RuntimeSignalCommand extends RuntimeRunControlCommandBase</code> | Runtime Signal Command 接口，共包含 10 个公开字段或方法。 |
| `RuntimeControlDisposition` | 类型 | <code>type RuntimeControlDisposition = (typeof RUNTIME_CONTROL_DISPOSITIONS)[number]</code> | Runtime Control Disposition 公共类型别名；完整类型表达式见声明。 |
| `RuntimeControlKind` | 类型 | <code>type RuntimeControlKind = (typeof RUNTIME_CONTROL_KINDS)[number]</code> | Runtime Control Kind 公共类型别名；完整类型表达式见声明。 |
| `RuntimeRunControlCommand` | 类型 | <code>type RuntimeRunControlCommand = RuntimePauseCommand &#124; RuntimeResumeCommand &#124; RuntimeSignalCommand</code> | Runtime Run Control Command 公共类型别名；完整类型表达式见声明。 |

## `RUNTIME_CONTROL_DISPOSITIONS`

由 `contracts/runtime-control` 模块导出的 RUNTIME CONTROL DISPOSITIONS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_CONTROL_DISPOSITIONS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### 声明

```text
export declare const RUNTIME_CONTROL_DISPOSITIONS: readonly ["applied", "reused", "lease_unavailable"];
```

## `RUNTIME_CONTROL_KINDS`

由 `contracts/runtime-control` 模块导出的 RUNTIME CONTROL KINDS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_CONTROL_KINDS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### 声明

```text
export declare const RUNTIME_CONTROL_KINDS: readonly ["pause", "resume", "signal"];
```

## `RuntimePauseCommand`

Runtime Pause Command 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimePauseCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### 声明

```text
export interface RuntimePauseCommand extends RuntimeRunControlCommandBase {
    kind: 'pause';
    reason: string;
    resumeKey?: string;
    requestedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "pause"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resumeKey` | 属性 | <code>resumeKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeResumeCommand`

Runtime Resume Command 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeResumeCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### 声明

```text
export interface RuntimeResumeCommand extends RuntimeRunControlCommandBase {
    kind: 'resume';
    key?: string;
    payload?: RuntimeJsonValue;
    requestedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "resume"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload?: RuntimeJsonValue</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeRunControlResult`

Runtime Run Control Result 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeRunControlResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### 声明

```text
export interface RuntimeRunControlResult {
    commandId: string;
    kind: RuntimeControlKind;
    disposition: RuntimeControlDisposition;
    eventIds: string[];
    runRevision: number;
    projection: RuntimeOrchestrationProjection;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `disposition` | 属性 | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "signal" &#124; "resume" &#124; "pause"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projection` | 属性 | <code>projection: RuntimeOrchestrationProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runRevision` | 属性 | <code>runRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeSignalCommand`

Runtime Signal Command 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeSignalCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### 声明

```text
export interface RuntimeSignalCommand extends RuntimeRunControlCommandBase {
    kind: 'signal';
    key: string;
    payload: RuntimeJsonValue;
    sentAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "signal"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: RuntimeJsonValue</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sentAt` | 属性 | <code>sentAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeControlDisposition`

Runtime Control Disposition 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeControlDisposition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### 声明

```text
export type RuntimeControlDisposition = (typeof RUNTIME_CONTROL_DISPOSITIONS)[number];
```

## `RuntimeControlKind`

Runtime Control Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeControlKind } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### 声明

```text
export type RuntimeControlKind = (typeof RUNTIME_CONTROL_KINDS)[number];
```

## `RuntimeRunControlCommand`

Runtime Run Control Command 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeRunControlCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### 声明

```text
export type RuntimeRunControlCommand = RuntimePauseCommand | RuntimeResumeCommand | RuntimeSignalCommand;
```
