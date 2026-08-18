# `@codesoul-co/hypha-adapters-local` / `in-memory-active-execution-registry`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/in-memory-active-execution-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-active-execution-registry.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalActiveExecutionRegistry` | 类 | <code>new LocalActiveExecutionRegistry(): InMemoryActiveExecutionRegistry</code> | Coordinates active executions without owning Sandbox or provider process semantics. |
| `ActiveLocalExecutionHandle` | 接口 | <code>interface ActiveLocalExecutionHandle</code> | Active Local Execution Handle 的字段契约；完整字段见下表。 |

## `LocalActiveExecutionRegistry` 公开成员

Coordinates active executions without owning Sandbox or provider process semantics.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSandbox` | 方法 | <code>abortSandbox(sandboxId: string, reason: string): Promise&lt;void&gt;</code> | abort Sandbox 的公开运行时操作。 |
| `begin` | 方法 | <code>begin(executionId: string, sandboxId: string): ActiveExecutionHandle</code> | begin 的公开运行时操作。 |
| `cancel` | 方法 | <code>cancel(request: ExecutionCancelRequest): Promise&lt;void&gt;</code> | 取消 cancel。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `complete` | 方法 | <code>complete(executionId: string): void</code> | complete 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(): InMemoryActiveExecutionRegistry</code> | 创建该类的实例。 |
| `sandboxId` | 方法 | <code>sandboxId(executionId: string): string &#124; undefined</code> | sandbox Id 的公开运行时操作。 |

## `ActiveLocalExecutionHandle` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | signal 字段。 |
