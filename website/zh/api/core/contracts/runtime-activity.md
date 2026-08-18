# `@codesoul-co/hypha-core` / `contracts/runtime-activity`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-activity.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity.ts)
- 导出数: **4**

## 模块用法

用于声明并运行时校验契约。Runtime activity 模块公开 2 常量、1 接口、1 类型。

### 从包入口导入

```ts
import {
  RUNTIME_ACTIVITY_DESCRIPTOR_VERSION,
  RUNTIME_ACTIVITY_KINDS,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeActivityDescriptor,
  RuntimeActivityKind,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_ACTIVITY_DESCRIPTOR_VERSION` | 常量 | <code>const RUNTIME_ACTIVITY_DESCRIPTOR_VERSION: "1.0.0"</code> | 由 `contracts/runtime-activity` 模块导出的 RUNTIME ACTIVITY DESCRIPTOR VERSION 常量。 |
| `RUNTIME_ACTIVITY_KINDS` | 常量 | <code>const RUNTIME_ACTIVITY_KINDS: readonly ["react_quantum", "tool", "memory", "execution", "mcp", "policy"]</code> | 由 `contracts/runtime-activity` 模块导出的 RUNTIME ACTIVITY KINDS 常量。 |
| `RuntimeActivityDescriptor` | 接口 | <code>interface RuntimeActivityDescriptor</code> | Runtime Activity Descriptor 接口，共包含 13 个公开字段或方法。 |
| `RuntimeActivityKind` | 类型 | <code>type RuntimeActivityKind = (typeof RUNTIME_ACTIVITY_KINDS)[number]</code> | Runtime Activity Kind 公共类型别名；完整类型表达式见声明。 |

## `RUNTIME_ACTIVITY_DESCRIPTOR_VERSION`

由 `contracts/runtime-activity` 模块导出的 RUNTIME ACTIVITY DESCRIPTOR VERSION 常量。

- 种类: 常量
- 导入: `import { RUNTIME_ACTIVITY_DESCRIPTOR_VERSION } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity.ts)

### 声明

```text
export declare const RUNTIME_ACTIVITY_DESCRIPTOR_VERSION: "1.0.0";
```

## `RUNTIME_ACTIVITY_KINDS`

由 `contracts/runtime-activity` 模块导出的 RUNTIME ACTIVITY KINDS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_ACTIVITY_KINDS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity.ts)

### 声明

```text
export declare const RUNTIME_ACTIVITY_KINDS: readonly ["react_quantum", "tool", "memory", "execution", "mcp", "policy"];
```

## `RuntimeActivityDescriptor`

Runtime Activity Descriptor 接口，共包含 13 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityDescriptor } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity.ts)

### 声明

```text
export interface RuntimeActivityDescriptor {
    version: typeof RUNTIME_ACTIVITY_DESCRIPTOR_VERSION;
    activityId: string;
    activityKind: RuntimeActivityKind;
    runId: string;
    stateId: string;
    stateAttempt: number;
    operationId: string;
    inputRef: string;
    inputHash: string;
    providerRef?: string;
    providerRevision?: string;
    idempotencyKey: string;
    deadlineAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `activityKind` | 属性 | <code>activityKind: "memory" &#124; "mcp" &#124; "policy" &#124; "tool" &#124; "execution" &#124; "react_quantum"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputRef` | 属性 | <code>inputRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRef` | 属性 | <code>providerRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityKind`

Runtime Activity Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeActivityKind } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity.ts)

### 声明

```text
export type RuntimeActivityKind = (typeof RUNTIME_ACTIVITY_KINDS)[number];
```
