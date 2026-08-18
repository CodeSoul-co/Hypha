# `@codesoul-co/hypha-adapters-local` / `in-memory-active-execution-registry`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/in-memory-active-execution-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-active-execution-registry.ts)
- 导出数: **2**

## 模块用法

用于注册并解析版本化能力或实现。In memory active execution registry 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  LocalActiveExecutionRegistry,
} from '@codesoul-co/hypha-adapters-local';

import type {
  ActiveLocalExecutionHandle,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalActiveExecutionRegistry` | 类 | <code>new LocalActiveExecutionRegistry(): InMemoryActiveExecutionRegistry</code> | Coordinates active executions without owning Sandbox or provider process semantics. |
| `ActiveLocalExecutionHandle` | 接口 | <code>interface ActiveLocalExecutionHandle</code> | Active Local Execution Handle 接口，共包含 3 个公开字段或方法。 |

## `LocalActiveExecutionRegistry`

Coordinates active executions without owning Sandbox or provider process semantics.

- 种类: 类
- 导入: `import { LocalActiveExecutionRegistry } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`in-memory-active-execution-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-active-execution-registry.ts)

### 声明

```text
export declare class InMemoryActiveExecutionRegistry {
    begin(executionId: string, sandboxId: string): ActiveExecutionHandle;
    sandboxId(executionId: string): string | undefined;
    cancel(request: ExecutionCancelRequest): Promise<void>;
    abortSandbox(sandboxId: string, reason: string): Promise<void>;
    complete(executionId: string): void;
    close(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSandbox` | 方法 | <code>abortSandbox(sandboxId: string, reason: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `begin` | 方法 | <code>begin(executionId: string, sandboxId: string): ActiveExecutionHandle</code> | 公开方法；参数与返回类型以签名列为准。 |
| `cancel` | 方法 | <code>cancel(request: ExecutionCancelRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `complete` | 方法 | <code>complete(executionId: string): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): InMemoryActiveExecutionRegistry</code> | 创建该类的实例。 |
| `sandboxId` | 方法 | <code>sandboxId(executionId: string): string &#124; undefined</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ActiveLocalExecutionHandle`

Active Local Execution Handle 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ActiveLocalExecutionHandle } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`in-memory-active-execution-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-active-execution-registry.ts)

### 声明

```text
export interface ActiveExecutionHandle {
    sandboxId: string;
    revision: number;
    signal: AbortSignal;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
