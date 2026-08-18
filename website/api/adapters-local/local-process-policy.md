# `@codesoul-co/hypha-adapters-local` / `local-process-policy`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-process-policy.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-policy.ts)
- Exports: **3**

## Using this module

Use the Local process policy module for applying policy and governance checks. It exports 1 class, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  LocalProcessPolicyResolver,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalProcessPolicyResolverOptions,
  ResolvedLocalProcessPolicy,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalProcessPolicyResolver` | class | <code>new LocalProcessPolicyResolver(options: LocalProcessPolicyResolverOptions): LocalProcessPolicyResolver</code> | Resolves untrusted command input into an explicit, host-local execution policy. |
| `LocalProcessPolicyResolverOptions` | interface | <code>interface LocalProcessPolicyResolverOptions</code> | Local Process Policy Resolver Options interface with 14 public fields or methods. |
| `ResolvedLocalProcessPolicy` | interface | <code>interface ResolvedLocalProcessPolicy</code> | Resolved Local Process Policy interface with 9 public fields or methods. |

## `LocalProcessPolicyResolver`

Resolves untrusted command input into an explicit, host-local execution policy.

- Kind: class
- Import: `import { LocalProcessPolicyResolver } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-policy.ts)

### Declaration

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

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertExecutionSurfaceUnchanged` | method | <code>assertExecutionSurfaceUnchanged(policy: ResolvedLocalProcessPolicy): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `assertSurfaceAvailable` | method | <code>assertSurfaceAvailable(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: LocalProcessPolicyResolverOptions): LocalProcessPolicyResolver</code> | Creates an instance of this class. |
| `resolve` | method | <code>resolve(environment: ExecutionEnvironmentSpec, request: CommandExecutionRequest): Promise&lt;ResolvedLocalProcessPolicy&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `validateEnvironment` | method | <code>validateEnvironment(environment: ExecutionEnvironmentSpec): void</code> | Public method; parameters and return type are shown in the signature. |
| `workspaceRoot` | property | <code>readonly workspaceRoot: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalProcessPolicyResolverOptions`

Local Process Policy Resolver Options interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { LocalProcessPolicyResolverOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-policy.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseEnvironment` | property | <code>baseEnvironment?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executables` | property | <code>executables: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inheritEnvironment` | property | <code>inheritEnvironment?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxArgumentBytes` | property | <code>maxArgumentBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxArgumentCount` | property | <code>maxArgumentCount?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxCombinedOutputBytes` | property | <code>maxCombinedOutputBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEnvironmentValueBytes` | property | <code>maxEnvironmentValueBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEnvironmentVariables` | property | <code>maxEnvironmentVariables?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxExecutionTimeoutMs` | property | <code>maxExecutionTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxStderrBytes` | property | <code>maxStderrBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxStdoutBytes` | property | <code>maxStdoutBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTotalArgumentBytes` | property | <code>maxTotalArgumentBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTotalEnvironmentBytes` | property | <code>maxTotalEnvironmentBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceRoot` | property | <code>workspaceRoot: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ResolvedLocalProcessPolicy`

Resolved Local Process Policy interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { ResolvedLocalProcessPolicy } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-policy.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `args` | property | <code>args: readonly string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cwd` | property | <code>cwd: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environment` | property | <code>environment: NodeJS.ProcessEnv</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executable` | property | <code>executable: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idleTimeoutMs` | property | <code>idleTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxCombinedOutputBytes` | property | <code>maxCombinedOutputBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxStderrBytes` | property | <code>maxStderrBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxStdoutBytes` | property | <code>maxStdoutBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
