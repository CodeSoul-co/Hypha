# `@codesoul-co/hypha-adapters-local` / `local-sandbox-lifecycle`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-sandbox-lifecycle.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-sandbox-lifecycle.ts)
- 导出数: **2**

## 模块用法

用于使用该功能边界的公共契约与操作。Local sandbox lifecycle 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  LocalSandboxLifecycle,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalSandboxLifecycleOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalSandboxLifecycle` | 类 | <code>new LocalSandboxLifecycle(options: LocalSandboxLifecycleOptions): LocalSandboxLifecycle</code> | Local Process identity wrapper around the provider-neutral lifecycle state. |
| `LocalSandboxLifecycleOptions` | 接口 | <code>interface LocalSandboxLifecycleOptions</code> | Local Sandbox Lifecycle Options 接口，共包含 4 个公开字段或方法。 |

## `LocalSandboxLifecycle`

Local Process identity wrapper around the provider-neutral lifecycle state.

- 种类: 类
- 导入: `import { LocalSandboxLifecycle } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-sandbox-lifecycle`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-sandbox-lifecycle.ts)

### 声明

```text
export declare class LocalSandboxLifecycle extends InMemorySandboxLifecycle {
    constructor(options: LocalSandboxLifecycleOptions);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `beginTermination` | 方法 | <code>beginTermination(input: SandboxTerminateRequest): SandboxRecord</code> | 公开方法；参数与返回类型以签名列为准。 |
| `cleanup` | 方法 | <code>cleanup(input: SandboxCleanupRequest): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: LocalSandboxLifecycleOptions): LocalSandboxLifecycle</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: SandboxCreateRequest, metadata: Record&lt;string, unknown&gt;): SandboxRecord</code> | 公开方法；参数与返回类型以签名列为准。 |
| `environmentForCommand` | 方法 | <code>environmentForCommand(request: CommandExecutionRequest): ExecutionEnvironmentSpec</code> | 公开方法；参数与返回类型以签名列为准。 |
| `finishTermination` | 方法 | <code>finishTermination(sandboxId: string): SandboxRecord</code> | 公开方法；参数与返回类型以签名列为准。 |
| `markBusy` | 方法 | <code>markBusy(sandboxId: string, executionId: string): SandboxRecord</code> | 公开方法；参数与返回类型以签名列为准。 |
| `markExecutionComplete` | 方法 | <code>markExecutionComplete(sandboxId: string, executionId: string, completedAt: string): SandboxRecord</code> | 公开方法；参数与返回类型以签名列为准。 |
| `start` | 方法 | <code>start(input: SandboxStartRequest): SandboxRecord</code> | 公开方法；参数与返回类型以签名列为准。 |
| `status` | 方法 | <code>status(input: SandboxStatusRequest): SandboxRecord &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalSandboxLifecycleOptions`

Local Sandbox Lifecycle Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalSandboxLifecycleOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-sandbox-lifecycle`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-sandbox-lifecycle.ts)

### 声明

```text
export interface LocalSandboxLifecycleOptions {
    providerId: string;
    workspaceRoot: string;
    now?: () => string;
    sandboxId?: (request: SandboxCreateRequest) => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 方法 | <code>sandboxId?(request: SandboxCreateRequest): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `workspaceRoot` | 属性 | <code>workspaceRoot: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
