# `@codesoul-co/hypha-core` / `modules/execution-port/governed-execution-port`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-port/governed-execution-port.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/governed-execution-port.ts)
- 导出数: **1**

## 模块用法

用于定义或实现 Provider-neutral Port。Governed execution port 模块公开 1 类。

### 从包入口导入

```ts
import {
  GovernedExecutionPort,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `GovernedExecutionPort` | 类 | <code>new GovernedExecutionPort(authorizationVerifier: ExecutionAuthorizationVerifier, dispatcher: ExecutionOperationDispatcher, now: () =&gt; string): GovernedExecutionPort</code> | Governed Execution Port 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |

## `GovernedExecutionPort`

Governed Execution Port 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { GovernedExecutionPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-port/governed-execution-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/governed-execution-port.ts)

### 声明

```text
export declare class GovernedExecutionPort implements ExecutionPort {
    constructor(authorizationVerifier: ExecutionAuthorizationVerifier, dispatcher: ExecutionOperationDispatcher, now: () => string);
    execute(input: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise<ExecutionActivityResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(authorizationVerifier: ExecutionAuthorizationVerifier, dispatcher: ExecutionOperationDispatcher, now: () =&gt; string): GovernedExecutionPort</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(input: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise&lt;ExecutionActivityResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
