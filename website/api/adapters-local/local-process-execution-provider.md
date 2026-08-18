# `@codesoul-co/hypha-adapters-local` / `local-process-execution-provider`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-process-execution-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-execution-provider.ts)
- Exports: **2**

## Using this module

Use the Local process execution provider module for binding external or local providers to Hypha ports. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  LocalProcessExecutionProvider,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalProcessExecutionProviderOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalProcessExecutionProvider` | class | <code>new LocalProcessExecutionProvider(options: LocalProcessExecutionProviderOptions): LocalProcessExecutionProvider</code> | Trusted-development provider. Workspace checks are confinement, not OS isolation. |
| `LocalProcessExecutionProviderOptions` | interface | <code>interface LocalProcessExecutionProviderOptions extends LocalProcessPolicyResolverOptions</code> | Local Process Execution Provider Options interface with 26 public fields or methods. |

## `LocalProcessExecutionProvider`

Trusted-development provider. Workspace checks are confinement, not OS isolation.

- Kind: class
- Import: `import { LocalProcessExecutionProvider } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-execution-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-execution-provider.ts)

### Declaration

```text
export declare class LocalProcessExecutionProvider implements SandboxProvider {
    readonly id: string;
    constructor(options: LocalProcessExecutionProviderOptions);
    capabilities(): Promise<SandboxProviderCapabilities>;
    create(input: SandboxCreateRequest): Promise<SandboxRecord>;
    start(input: SandboxStartRequest): Promise<SandboxRecord>;
    execute(input: CommandExecutionRequest): Promise<CommandExecutionResult>;
    streamOutput(input: RemoteOutputStreamRequest): AsyncIterable<CommandOutputChunk>;
    cancel(input: ExecutionCancelRequest): Promise<void>;
    terminate(input: SandboxTerminateRequest): Promise<void>;
    status(input: SandboxStatusRequest): Promise<SandboxRecord | null>;
    cleanup(input: SandboxCleanupRequest): Promise<void>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(input: ExecutionCancelRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;SandboxProviderCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `cleanup` | method | <code>cleanup(input: SandboxCleanupRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: LocalProcessExecutionProviderOptions): LocalProcessExecutionProvider</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `execute` | method | <code>execute(input: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `start` | method | <code>start(input: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `status` | method | <code>status(input: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `streamOutput` | method | <code>streamOutput(input: RemoteOutputStreamRequest): AsyncIterable&lt;CommandOutputChunk&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `terminate` | method | <code>terminate(input: SandboxTerminateRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LocalProcessExecutionProviderOptions`

Local Process Execution Provider Options interface with 26 public fields or methods.

- Kind: interface
- Import: `import type { LocalProcessExecutionProviderOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-execution-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-execution-provider.ts)

### Declaration

```text
export interface LocalProcessExecutionProviderOptions extends LocalProcessPolicyResolverOptions {
    gracefulTerminationMs?: number;
    maxTrackedFiles?: number;
    maxTrackedBytes?: number;
    allowBestEffortWindowsProcessTreeKill?: boolean;
    id?: string;
    now?: () => string;
    sandboxId?: (request: SandboxCreateRequest) => string;
    executionId?: (request: CommandExecutionRequest) => string;
    supervisor?: LocalProcessSupervisor;
    outputArtifacts?: LocalProcessOutputArtifactPort;
    maxRetainedOutputChunks?: number;
    maxTrackedOutputStreams?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowBestEffortWindowsProcessTreeKill` | property | <code>allowBestEffortWindowsProcessTreeKill?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `baseEnvironment` | property | <code>baseEnvironment?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executables` | property | <code>executables: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | method | <code>executionId?(request: CommandExecutionRequest): string</code> | Public method; parameters and return type are shown in the signature. |
| `gracefulTerminationMs` | property | <code>gracefulTerminationMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inheritEnvironment` | property | <code>inheritEnvironment?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxArgumentBytes` | property | <code>maxArgumentBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxArgumentCount` | property | <code>maxArgumentCount?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxCombinedOutputBytes` | property | <code>maxCombinedOutputBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEnvironmentValueBytes` | property | <code>maxEnvironmentValueBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEnvironmentVariables` | property | <code>maxEnvironmentVariables?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxExecutionTimeoutMs` | property | <code>maxExecutionTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxRetainedOutputChunks` | property | <code>maxRetainedOutputChunks?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxStderrBytes` | property | <code>maxStderrBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxStdoutBytes` | property | <code>maxStdoutBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTotalArgumentBytes` | property | <code>maxTotalArgumentBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTotalEnvironmentBytes` | property | <code>maxTotalEnvironmentBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTrackedBytes` | property | <code>maxTrackedBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTrackedFiles` | property | <code>maxTrackedFiles?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTrackedOutputStreams` | property | <code>maxTrackedOutputStreams?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `outputArtifacts` | property | <code>outputArtifacts?: LocalProcessOutputArtifactPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | method | <code>sandboxId?(request: SandboxCreateRequest): string</code> | Public method; parameters and return type are shown in the signature. |
| `supervisor` | property | <code>supervisor?: LocalProcessSupervisor</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceRoot` | property | <code>workspaceRoot: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
