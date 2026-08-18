# `@codesoul-co/hypha-adapters-local` / `local-sandbox-lifecycle`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-sandbox-lifecycle.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-sandbox-lifecycle.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalSandboxLifecycle` | 类 | <code>new LocalSandboxLifecycle(options: LocalSandboxLifecycleOptions): LocalSandboxLifecycle</code> | Local Process identity wrapper around the provider-neutral lifecycle state. |
| `LocalSandboxLifecycleOptions` | 接口 | <code>interface LocalSandboxLifecycleOptions</code> | Local Sandbox Lifecycle Options 的字段契约；完整字段见下表。 |

## `LocalSandboxLifecycle` 公开成员

Local Process identity wrapper around the provider-neutral lifecycle state.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `beginTermination` | 方法 | <code>beginTermination(input: SandboxTerminateRequest): SandboxRecord</code> | begin Termination 的公开运行时操作。 |
| `cleanup` | 方法 | <code>cleanup(input: SandboxCleanupRequest): void</code> | cleanup 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: LocalSandboxLifecycleOptions): LocalSandboxLifecycle</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: SandboxCreateRequest, metadata: Record&lt;string, unknown&gt;): SandboxRecord</code> | 创建 create。 |
| `environmentForCommand` | 方法 | <code>environmentForCommand(request: CommandExecutionRequest): ExecutionEnvironmentSpec</code> | environment For Command 的公开运行时操作。 |
| `finishTermination` | 方法 | <code>finishTermination(sandboxId: string): SandboxRecord</code> | finish Termination 的公开运行时操作。 |
| `markBusy` | 方法 | <code>markBusy(sandboxId: string, executionId: string): SandboxRecord</code> | mark Busy 的公开运行时操作。 |
| `markExecutionComplete` | 方法 | <code>markExecutionComplete(sandboxId: string, executionId: string, completedAt: string): SandboxRecord</code> | mark Execution Complete 的公开运行时操作。 |
| `start` | 方法 | <code>start(input: SandboxStartRequest): SandboxRecord</code> | 启动 start。 |
| `status` | 方法 | <code>status(input: SandboxStatusRequest): SandboxRecord &#124; null</code> | status 的公开运行时操作。 |

## `LocalSandboxLifecycleOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `sandboxId` | 方法 | <code>sandboxId(request: SandboxCreateRequest): string</code> | sandbox Id 的公开运行时操作。 |
| `workspaceRoot` | 属性 | <code>workspaceRoot: string</code> | workspace Root 字段。 |
