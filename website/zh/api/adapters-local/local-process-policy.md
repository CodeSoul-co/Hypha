# `@codesoul-co/hypha-adapters-local` / `local-process-policy`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-policy.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-policy.ts)
- 导出数: **3**

## 模块用法

用于实施 Policy 与治理检查。Local process policy 模块公开 1 类、2 接口。

### 从包入口导入

```ts
import {
  LocalProcessPolicyResolver,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalProcessPolicyResolverOptions,
  ResolvedLocalProcessPolicy,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalProcessPolicyResolver` | 类 | <code>new LocalProcessPolicyResolver(options: LocalProcessPolicyResolverOptions): LocalProcessPolicyResolver</code> | Resolves untrusted command input into an explicit, host-local execution policy. |
| `LocalProcessPolicyResolverOptions` | 接口 | <code>interface LocalProcessPolicyResolverOptions</code> | Local Process Policy Resolver Options 接口，共包含 14 个公开字段或方法。 |
| `ResolvedLocalProcessPolicy` | 接口 | <code>interface ResolvedLocalProcessPolicy</code> | Resolved Local Process Policy 接口，共包含 9 个公开字段或方法。 |

## `LocalProcessPolicyResolver`

Resolves untrusted command input into an explicit, host-local execution policy.

- 种类: 类
- 导入: `import { LocalProcessPolicyResolver } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-policy.ts)

### 声明

```text
export declare class LocalProcessPolicyResolver {
    readonly workspaceRoot: string;
    constructor(options: LocalProcessPolicyResolverOptions);
    validateEnvironment(environment: ExecutionEnvironmentSpec): void;
    resolve(environment: ExecutionEnvironmentSpec, request: CommandExecutionRequest): Promise<ResolvedLocalProcessPolicy>;
    assertExecutionSurfaceUnchanged(policy: ResolvedLocalProcessPolicy): Promise<void>;
    assertSurfaceAvailable(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertExecutionSurfaceUnchanged` | 方法 | <code>assertExecutionSurfaceUnchanged(policy: ResolvedLocalProcessPolicy): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `assertSurfaceAvailable` | 方法 | <code>assertSurfaceAvailable(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: LocalProcessPolicyResolverOptions): LocalProcessPolicyResolver</code> | 创建该类的实例。 |
| `resolve` | 方法 | <code>resolve(environment: ExecutionEnvironmentSpec, request: CommandExecutionRequest): Promise&lt;ResolvedLocalProcessPolicy&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `validateEnvironment` | 方法 | <code>validateEnvironment(environment: ExecutionEnvironmentSpec): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `workspaceRoot` | 属性 | <code>readonly workspaceRoot: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalProcessPolicyResolverOptions`

Local Process Policy Resolver Options 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalProcessPolicyResolverOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-policy.ts)

### 声明

```text
export interface LocalProcessPolicyResolverOptions {
    workspaceRoot: string;
    executables: Record<string, string>;
    baseEnvironment?: Record<string, string>;
    inheritEnvironment?: string[];
    maxExecutionTimeoutMs?: number;
    maxStdoutBytes?: number;
    maxStderrBytes?: number;
    maxCombinedOutputBytes?: number;
    maxArgumentCount?: number;
    maxArgumentBytes?: number;
    maxTotalArgumentBytes?: number;
    maxEnvironmentVariables?: number;
    maxEnvironmentValueBytes?: number;
    maxTotalEnvironmentBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseEnvironment` | 属性 | <code>baseEnvironment?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executables` | 属性 | <code>executables: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inheritEnvironment` | 属性 | <code>inheritEnvironment?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxArgumentBytes` | 属性 | <code>maxArgumentBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxArgumentCount` | 属性 | <code>maxArgumentCount?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxCombinedOutputBytes` | 属性 | <code>maxCombinedOutputBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEnvironmentValueBytes` | 属性 | <code>maxEnvironmentValueBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEnvironmentVariables` | 属性 | <code>maxEnvironmentVariables?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxExecutionTimeoutMs` | 属性 | <code>maxExecutionTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxStderrBytes` | 属性 | <code>maxStderrBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxStdoutBytes` | 属性 | <code>maxStdoutBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTotalArgumentBytes` | 属性 | <code>maxTotalArgumentBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTotalEnvironmentBytes` | 属性 | <code>maxTotalEnvironmentBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceRoot` | 属性 | <code>workspaceRoot: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ResolvedLocalProcessPolicy`

Resolved Local Process Policy 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ResolvedLocalProcessPolicy } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-policy.ts)

### 声明

```text
export interface ResolvedLocalProcessPolicy {
    executable: string;
    args: readonly string[];
    cwd: string;
    environment: NodeJS.ProcessEnv;
    timeoutMs: number;
    idleTimeoutMs?: number;
    maxStdoutBytes: number;
    maxStderrBytes: number;
    maxCombinedOutputBytes: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `args` | 属性 | <code>args: readonly string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cwd` | 属性 | <code>cwd: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environment` | 属性 | <code>environment: NodeJS.ProcessEnv</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executable` | 属性 | <code>executable: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idleTimeoutMs` | 属性 | <code>idleTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxCombinedOutputBytes` | 属性 | <code>maxCombinedOutputBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxStderrBytes` | 属性 | <code>maxStderrBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxStdoutBytes` | 属性 | <code>maxStdoutBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
