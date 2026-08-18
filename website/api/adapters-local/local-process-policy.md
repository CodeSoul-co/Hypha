# `@codesoul-co/hypha-adapters-local` / `local-process-policy`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-process-policy.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-policy.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalProcessPolicyResolver` | class | <code>new LocalProcessPolicyResolver(options: LocalProcessPolicyResolverOptions): LocalProcessPolicyResolver</code> | Resolves untrusted command input into an explicit, host-local execution policy. |
| `LocalProcessPolicyResolverOptions` | interface | <code>interface LocalProcessPolicyResolverOptions</code> | Field contract for Local Process Policy Resolver Options; see all contract members below. |
| `ResolvedLocalProcessPolicy` | interface | <code>interface ResolvedLocalProcessPolicy</code> | Field contract for Resolved Local Process Policy; see all contract members below. |

## `LocalProcessPolicyResolver` public members

Resolves untrusted command input into an explicit, host-local execution policy.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertExecutionSurfaceUnchanged` | method | <code>assertExecutionSurfaceUnchanged(policy: ResolvedLocalProcessPolicy): Promise&lt;void&gt;</code> | Asserts Execution Surface Unchanged at this module boundary. |
| `assertSurfaceAvailable` | method | <code>assertSurfaceAvailable(): Promise&lt;void&gt;</code> | Asserts Surface Available at this module boundary. |
| `constructor` | constructor | <code>(options: LocalProcessPolicyResolverOptions): LocalProcessPolicyResolver</code> | Creates an instance of this class. |
| `resolve` | method | <code>resolve(environment: ExecutionEnvironmentSpec, request: CommandExecutionRequest): Promise&lt;ResolvedLocalProcessPolicy&gt;</code> | Resolves resolve at this module boundary. |
| `validateEnvironment` | method | <code>validateEnvironment(environment: ExecutionEnvironmentSpec): void</code> | Validates Environment at this module boundary. |
| `workspaceRoot` | property | <code>workspaceRoot: string</code> | Public workspace Root property. |

## `LocalProcessPolicyResolverOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseEnvironment` | property | <code>baseEnvironment: Record&lt;string, string&gt;</code> | Public base Environment property. |
| `executables` | property | <code>executables: Record&lt;string, string&gt;</code> | Public executables property. |
| `inheritEnvironment` | property | <code>inheritEnvironment: string[]</code> | Public inherit Environment property. |
| `maxArgumentBytes` | property | <code>maxArgumentBytes: number</code> | Public max Argument Bytes property. |
| `maxArgumentCount` | property | <code>maxArgumentCount: number</code> | Public max Argument Count property. |
| `maxCombinedOutputBytes` | property | <code>maxCombinedOutputBytes: number</code> | Public max Combined Output Bytes property. |
| `maxEnvironmentValueBytes` | property | <code>maxEnvironmentValueBytes: number</code> | Public max Environment Value Bytes property. |
| `maxEnvironmentVariables` | property | <code>maxEnvironmentVariables: number</code> | Public max Environment Variables property. |
| `maxExecutionTimeoutMs` | property | <code>maxExecutionTimeoutMs: number</code> | Public max Execution Timeout Ms property. |
| `maxStderrBytes` | property | <code>maxStderrBytes: number</code> | Public max Stderr Bytes property. |
| `maxStdoutBytes` | property | <code>maxStdoutBytes: number</code> | Public max Stdout Bytes property. |
| `maxTotalArgumentBytes` | property | <code>maxTotalArgumentBytes: number</code> | Public max Total Argument Bytes property. |
| `maxTotalEnvironmentBytes` | property | <code>maxTotalEnvironmentBytes: number</code> | Public max Total Environment Bytes property. |
| `workspaceRoot` | property | <code>workspaceRoot: string</code> | Public workspace Root property. |

## `ResolvedLocalProcessPolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `args` | property | <code>args: readonly string[]</code> | Public args property. |
| `cwd` | property | <code>cwd: string</code> | Public cwd property. |
| `environment` | property | <code>environment: NodeJS.ProcessEnv</code> | Public environment property. |
| `executable` | property | <code>executable: string</code> | Public executable property. |
| `idleTimeoutMs` | property | <code>idleTimeoutMs: number</code> | Public idle Timeout Ms property. |
| `maxCombinedOutputBytes` | property | <code>maxCombinedOutputBytes: number</code> | Public max Combined Output Bytes property. |
| `maxStderrBytes` | property | <code>maxStderrBytes: number</code> | Public max Stderr Bytes property. |
| `maxStdoutBytes` | property | <code>maxStdoutBytes: number</code> | Public max Stdout Bytes property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |
