# `@codesoul-co/hypha-adapters-local` / `workspace-runtime`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/workspace-runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/workspace-runtime.ts)
- 导出数: **1**

## 模块用法

用于声明并实施 Workspace 作用域边界。Workspace runtime 模块公开 1 类。

### 从包入口导入

```ts
import {
  LocalWorkspaceRuntime,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalWorkspaceRuntime` | 类 | <code>new LocalWorkspaceRuntime(config: WorkspaceRuntimeConfig): LocalWorkspaceRuntime</code> | Local Workspace Runtime 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |

## `LocalWorkspaceRuntime`

Local Workspace Runtime 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LocalWorkspaceRuntime } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`workspace-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/workspace-runtime.ts)

### 声明

```text
export declare class LocalWorkspaceRuntime implements WorkspaceRuntimePort {
    constructor(config: WorkspaceRuntimeConfig);
    initialize(): Promise<void>;
    execute(request: WorkspaceRuntimeRequest): Promise<unknown>;
    health(): Promise<ProviderHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(config: WorkspaceRuntimeConfig): LocalWorkspaceRuntime</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: WorkspaceRuntimeRequest): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `initialize` | 方法 | <code>initialize(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
