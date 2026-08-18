# `@codesoul-co/hypha-adapters-local` / `local-process-policy`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-policy.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-policy.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalProcessPolicyResolver` | 类 | <code>new LocalProcessPolicyResolver(options: LocalProcessPolicyResolverOptions): LocalProcessPolicyResolver</code> | Resolves untrusted command input into an explicit, host-local execution policy. |
| `LocalProcessPolicyResolverOptions` | 接口 | <code>interface LocalProcessPolicyResolverOptions</code> | Local Process Policy Resolver Options 的字段契约；完整字段见下表。 |
| `ResolvedLocalProcessPolicy` | 接口 | <code>interface ResolvedLocalProcessPolicy</code> | Resolved Local Process Policy 的字段契约；完整字段见下表。 |

## `LocalProcessPolicyResolver` 公开成员

Resolves untrusted command input into an explicit, host-local execution policy.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertExecutionSurfaceUnchanged` | 方法 | <code>assertExecutionSurfaceUnchanged(policy: ResolvedLocalProcessPolicy): Promise&lt;void&gt;</code> | 断言 Execution Surface Unchanged。 |
| `assertSurfaceAvailable` | 方法 | <code>assertSurfaceAvailable(): Promise&lt;void&gt;</code> | 断言 Surface Available。 |
| `constructor` | 构造函数 | <code>(options: LocalProcessPolicyResolverOptions): LocalProcessPolicyResolver</code> | 创建该类的实例。 |
| `resolve` | 方法 | <code>resolve(environment: ExecutionEnvironmentSpec, request: CommandExecutionRequest): Promise&lt;ResolvedLocalProcessPolicy&gt;</code> | 解析 resolve。 |
| `validateEnvironment` | 方法 | <code>validateEnvironment(environment: ExecutionEnvironmentSpec): void</code> | 校验 Environment。 |
| `workspaceRoot` | 属性 | <code>workspaceRoot: string</code> | workspace Root 字段。 |

## `LocalProcessPolicyResolverOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseEnvironment` | 属性 | <code>baseEnvironment: Record&lt;string, string&gt;</code> | base Environment 字段。 |
| `executables` | 属性 | <code>executables: Record&lt;string, string&gt;</code> | executables 字段。 |
| `inheritEnvironment` | 属性 | <code>inheritEnvironment: string[]</code> | inherit Environment 字段。 |
| `maxArgumentBytes` | 属性 | <code>maxArgumentBytes: number</code> | max Argument Bytes 字段。 |
| `maxArgumentCount` | 属性 | <code>maxArgumentCount: number</code> | max Argument Count 字段。 |
| `maxCombinedOutputBytes` | 属性 | <code>maxCombinedOutputBytes: number</code> | max Combined Output Bytes 字段。 |
| `maxEnvironmentValueBytes` | 属性 | <code>maxEnvironmentValueBytes: number</code> | max Environment Value Bytes 字段。 |
| `maxEnvironmentVariables` | 属性 | <code>maxEnvironmentVariables: number</code> | max Environment Variables 字段。 |
| `maxExecutionTimeoutMs` | 属性 | <code>maxExecutionTimeoutMs: number</code> | max Execution Timeout Ms 字段。 |
| `maxStderrBytes` | 属性 | <code>maxStderrBytes: number</code> | max Stderr Bytes 字段。 |
| `maxStdoutBytes` | 属性 | <code>maxStdoutBytes: number</code> | max Stdout Bytes 字段。 |
| `maxTotalArgumentBytes` | 属性 | <code>maxTotalArgumentBytes: number</code> | max Total Argument Bytes 字段。 |
| `maxTotalEnvironmentBytes` | 属性 | <code>maxTotalEnvironmentBytes: number</code> | max Total Environment Bytes 字段。 |
| `workspaceRoot` | 属性 | <code>workspaceRoot: string</code> | workspace Root 字段。 |

## `ResolvedLocalProcessPolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `args` | 属性 | <code>args: readonly string[]</code> | args 字段。 |
| `cwd` | 属性 | <code>cwd: string</code> | cwd 字段。 |
| `environment` | 属性 | <code>environment: NodeJS.ProcessEnv</code> | environment 字段。 |
| `executable` | 属性 | <code>executable: string</code> | executable 字段。 |
| `idleTimeoutMs` | 属性 | <code>idleTimeoutMs: number</code> | idle Timeout Ms 字段。 |
| `maxCombinedOutputBytes` | 属性 | <code>maxCombinedOutputBytes: number</code> | max Combined Output Bytes 字段。 |
| `maxStderrBytes` | 属性 | <code>maxStderrBytes: number</code> | max Stderr Bytes 字段。 |
| `maxStdoutBytes` | 属性 | <code>maxStdoutBytes: number</code> | max Stdout Bytes 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |
