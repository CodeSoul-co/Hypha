# `@codesoul-co/hypha-adapters-local` / `local-process-output-collector`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-output-collector.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts)
- 导出数: **5**

## 模块用法

用于使用该功能边界的公共契约与操作。Local process output collector 模块公开 1 类、3 接口、1 类型。

### 从包入口导入

```ts
import {
  LocalProcessOutputCollector,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalProcessOutputAppendResult,
  LocalProcessOutputLimits,
  LocalProcessOutputSnapshot,
  LocalProcessOutputStream,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalProcessOutputCollector` | 类 | <code>new LocalProcessOutputCollector(limits: LocalProcessOutputLimits): LocalProcessOutputCollector</code> | Collects bounded process output while accounting against raw bytes, not string length. |
| `LocalProcessOutputAppendResult` | 接口 | <code>interface LocalProcessOutputAppendResult</code> | Local Process Output Append Result 接口，共包含 1 个公开字段或方法。 |
| `LocalProcessOutputLimits` | 接口 | <code>interface LocalProcessOutputLimits</code> | Local Process Output Limits 接口，共包含 3 个公开字段或方法。 |
| `LocalProcessOutputSnapshot` | 接口 | <code>interface LocalProcessOutputSnapshot</code> | Local Process Output Snapshot 接口，共包含 6 个公开字段或方法。 |
| `LocalProcessOutputStream` | 类型 | <code>type LocalProcessOutputStream = 'stdout' &#124; 'stderr'</code> | Local Process Output Stream 公共类型别名；完整类型表达式见声明。 |

## `LocalProcessOutputCollector`

Collects bounded process output while accounting against raw bytes, not string length.

- 种类: 类
- 导入: `import { LocalProcessOutputCollector } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-output-collector`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts)

### 声明

```text
export declare class LocalProcessOutputCollector {
    constructor(limits: LocalProcessOutputLimits);
    append(stream: LocalProcessOutputStream, chunk: Buffer): LocalProcessOutputAppendResult;
    snapshot(): LocalProcessOutputSnapshot;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(stream: LocalProcessOutputStream, chunk: Buffer): LocalProcessOutputAppendResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(limits: LocalProcessOutputLimits): LocalProcessOutputCollector</code> | 创建该类的实例。 |
| `snapshot` | 方法 | <code>snapshot(): LocalProcessOutputSnapshot</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalProcessOutputAppendResult`

Local Process Output Append Result 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalProcessOutputAppendResult } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-output-collector`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts)

### 声明

```text
export interface LocalProcessOutputAppendResult {
    limitExceeded?: LocalProcessOutputStream | 'combined';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `limitExceeded` | 属性 | <code>limitExceeded?: LocalProcessOutputStream &#124; "combined"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalProcessOutputLimits`

Local Process Output Limits 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalProcessOutputLimits } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-output-collector`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts)

### 声明

```text
export interface LocalProcessOutputLimits {
    maxStdoutBytes: number;
    maxStderrBytes: number;
    maxCombinedOutputBytes: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxCombinedOutputBytes` | 属性 | <code>maxCombinedOutputBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxStderrBytes` | 属性 | <code>maxStderrBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxStdoutBytes` | 属性 | <code>maxStdoutBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalProcessOutputSnapshot`

Local Process Output Snapshot 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalProcessOutputSnapshot } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-output-collector`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts)

### 声明

```text
export interface LocalProcessOutputSnapshot {
    stdout: string;
    stderr: string;
    capturedStdoutBytes: number;
    capturedStderrBytes: number;
    observedStdoutBytes: number;
    observedStderrBytes: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capturedStderrBytes` | 属性 | <code>capturedStderrBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capturedStdoutBytes` | 属性 | <code>capturedStdoutBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observedStderrBytes` | 属性 | <code>observedStderrBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observedStdoutBytes` | 属性 | <code>observedStdoutBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stderr` | 属性 | <code>stderr: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stdout` | 属性 | <code>stdout: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalProcessOutputStream`

Local Process Output Stream 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { LocalProcessOutputStream } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-output-collector`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts)

### 声明

```text
export type LocalProcessOutputStream = 'stdout' | 'stderr';
```
