# `@codesoul-co/hypha-core` / `modules/execution-port/governed-execution-port`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/execution-port/governed-execution-port.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/governed-execution-port.ts)
- 导出数: **1**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `GovernedExecutionPort` | 类 | <code>new GovernedExecutionPort(authorizationVerifier: ExecutionAuthorizationVerifier, dispatcher: ExecutionOperationDispatcher, now: () =&gt; string): GovernedExecutionPort</code> | Governed Execution Port 的运行时实现；公开构造函数与成员见下表。 |

## `GovernedExecutionPort` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(authorizationVerifier: ExecutionAuthorizationVerifier, dispatcher: ExecutionOperationDispatcher, now: () =&gt; string): GovernedExecutionPort</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(input: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise&lt;ExecutionActivityResult&gt;</code> | execute 的公开运行时操作。 |
