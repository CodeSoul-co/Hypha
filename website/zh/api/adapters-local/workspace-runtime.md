# `@codesoul-co/hypha-adapters-local` / `workspace-runtime`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/workspace-runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/workspace-runtime.ts)
- 导出数: **1**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalWorkspaceRuntime` | 类 | <code>new LocalWorkspaceRuntime(config: WorkspaceRuntimeConfig): LocalWorkspaceRuntime</code> | Local Workspace Runtime 的运行时实现；公开构造函数与成员见下表。 |

## `LocalWorkspaceRuntime` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(config: WorkspaceRuntimeConfig): LocalWorkspaceRuntime</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: WorkspaceRuntimeRequest): Promise&lt;unknown&gt;</code> | execute 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `initialize` | 方法 | <code>initialize(): Promise&lt;void&gt;</code> | initialize 的公开运行时操作。 |
