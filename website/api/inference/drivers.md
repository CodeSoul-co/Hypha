# `@codesoul-co/hypha-inference` / `drivers`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Source: [`packages/inference/src/drivers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)
- Exports: **14**

## Using this module

Use the Drivers module for using the public contracts and operations for this capability boundary. It exports 3 classes, 7 interfaces, 4 types.

### Import from the package entrypoint

```ts
import {
  HttpLocalInferenceDriver,
  LocalInferenceDriverRegistry,
  NodeLocalInferenceProcessSupervisor,
} from '@codesoul-co/hypha-inference';

import type {
  LocalInferenceDriver,
  LocalInferenceDriverConfig,
  LocalInferenceDriverStatus,
  LocalInferenceHealthProbeRequest,
  LocalInferenceProcessHandle,
  LocalInferenceProcessSpec,
  LocalInferenceProcessSupervisor,
  LocalInferenceDriverMode,
} from '@codesoul-co/hypha-inference';

// The complete export list is documented below.
```

### Usage patterns

- Use the 11 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `HttpLocalInferenceDriver` | class | <code>new HttpLocalInferenceDriver(config: LocalInferenceDriverConfig, supervisor?: LocalInferenceProcessSupervisor, healthProbe?: LocalInferenceHealthProbe): HttpLocalInferenceDriver</code> | Http Local Inference Driver class with 10 public constructor or member entries; its exact declarations are listed below. |
| `LocalInferenceDriverRegistry` | class | <code>new LocalInferenceDriverRegistry(): LocalInferenceDriverRegistry</code> | Local Inference Driver Registry class with 6 public constructor or member entries; its exact declarations are listed below. |
| `NodeLocalInferenceProcessSupervisor` | class | <code>new NodeLocalInferenceProcessSupervisor(): NodeLocalInferenceProcessSupervisor</code> | Node Local Inference Process Supervisor class with 2 public constructor or member entries; its exact declarations are listed below. |
| `LocalInferenceDriver` | interface | <code>interface LocalInferenceDriver</code> | Local Inference Driver interface with 9 public fields or methods. |
| `LocalInferenceDriverConfig` | interface | <code>interface LocalInferenceDriverConfig</code> | Local Inference Driver Config interface with 17 public fields or methods. |
| `LocalInferenceDriverStatus` | interface | <code>interface LocalInferenceDriverStatus</code> | Local Inference Driver Status interface with 9 public fields or methods. |
| `LocalInferenceHealthProbeRequest` | interface | <code>interface LocalInferenceHealthProbeRequest</code> | Local Inference Health Probe Request interface with 3 public fields or methods. |
| `LocalInferenceProcessHandle` | interface | <code>interface LocalInferenceProcessHandle</code> | Local Inference Process Handle interface with 3 public fields or methods. |
| `LocalInferenceProcessSpec` | interface | <code>interface LocalInferenceProcessSpec</code> | Local Inference Process Spec interface with 4 public fields or methods. |
| `LocalInferenceProcessSupervisor` | interface | <code>interface LocalInferenceProcessSupervisor</code> | Local Inference Process Supervisor interface with 1 public fields or methods. |
| `LocalInferenceDriverMode` | type | <code>type LocalInferenceDriverMode = 'connect' &#124; 'managed'</code> | Public type alias for Local Inference Driver Mode; the declaration contains its complete type expression. |
| `LocalInferenceDriverState` | type | <code>type LocalInferenceDriverState = 'idle' &#124; 'starting' &#124; 'ready' &#124; 'stopping' &#124; 'stopped' &#124; 'failed'</code> | Public type alias for Local Inference Driver State; the declaration contains its complete type expression. |
| `LocalInferenceEngineKind` | type | <code>type LocalInferenceEngineKind = 'ollama' &#124; 'sglang' &#124; 'vllm'</code> | Public type alias for Local Inference Engine Kind; the declaration contains its complete type expression. |
| `LocalInferenceHealthProbe` | type | <code>type LocalInferenceHealthProbe = (request: LocalInferenceHealthProbeRequest) =&gt; Promise&lt;boolean&gt;</code> | Public type alias for Local Inference Health Probe; the declaration contains its complete type expression. |

## `HttpLocalInferenceDriver`

Http Local Inference Driver class with 10 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { HttpLocalInferenceDriver } from '@codesoul-co/hypha-inference';`
- Source module: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### Declaration

```text
export declare class HttpLocalInferenceDriver implements LocalInferenceDriver {
    readonly id: string;
    readonly kind: LocalInferenceEngineKind;
    constructor(config: LocalInferenceDriverConfig, supervisor?: LocalInferenceProcessSupervisor, healthProbe?: LocalInferenceHealthProbe);
    start(model?: string | undefined): Promise<LocalInferenceDriverStatus>;
    load(model: string): Promise<LocalInferenceDriverStatus>;
    unload(model?: string | undefined): Promise<LocalInferenceDriverStatus>;
    stop(): Promise<LocalInferenceDriverStatus>;
    health(): Promise<boolean>;
    status(): LocalInferenceDriverStatus;
    backend(): InferenceBackend;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `backend` | method | <code>backend(): InferenceBackend</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(config: LocalInferenceDriverConfig, supervisor?: LocalInferenceProcessSupervisor, healthProbe?: LocalInferenceHealthProbe): HttpLocalInferenceDriver</code> | Creates an instance of this class. |
| `health` | method | <code>health(): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>readonly kind: LocalInferenceEngineKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `load` | method | <code>load(model: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `start` | method | <code>start(model?: string &#124; undefined): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `status` | method | <code>status(): LocalInferenceDriverStatus</code> | Public method; parameters and return type are shown in the signature. |
| `stop` | method | <code>stop(): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `unload` | method | <code>unload(model?: string &#124; undefined): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LocalInferenceDriverRegistry`

Local Inference Driver Registry class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LocalInferenceDriverRegistry } from '@codesoul-co/hypha-inference';`
- Source module: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### Declaration

```text
export declare class LocalInferenceDriverRegistry {
    register(driver: LocalInferenceDriver): void;
    get(id: string): LocalInferenceDriver | null;
    require(id: string): LocalInferenceDriver;
    list(): LocalInferenceDriver[];
    stopAll(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): LocalInferenceDriverRegistry</code> | Creates an instance of this class. |
| `get` | method | <code>get(id: string): LocalInferenceDriver &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): LocalInferenceDriver[]</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(driver: LocalInferenceDriver): void</code> | Public method; parameters and return type are shown in the signature. |
| `require` | method | <code>require(id: string): LocalInferenceDriver</code> | Public method; parameters and return type are shown in the signature. |
| `stopAll` | method | <code>stopAll(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `NodeLocalInferenceProcessSupervisor`

Node Local Inference Process Supervisor class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { NodeLocalInferenceProcessSupervisor } from '@codesoul-co/hypha-inference';`
- Source module: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### Declaration

```text
export declare class NodeLocalInferenceProcessSupervisor implements LocalInferenceProcessSupervisor {
    start(spec: LocalInferenceProcessSpec): Promise<LocalInferenceProcessHandle>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): NodeLocalInferenceProcessSupervisor</code> | Creates an instance of this class. |
| `start` | method | <code>start(spec: LocalInferenceProcessSpec): Promise&lt;LocalInferenceProcessHandle&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LocalInferenceDriver`

Local Inference Driver interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { LocalInferenceDriver } from '@codesoul-co/hypha-inference';`
- Source module: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### Declaration

```text
export interface LocalInferenceDriver {
    readonly id: string;
    readonly kind: LocalInferenceEngineKind;
    start(model?: string): Promise<LocalInferenceDriverStatus>;
    load(model: string): Promise<LocalInferenceDriverStatus>;
    unload(model?: string): Promise<LocalInferenceDriverStatus>;
    stop(): Promise<LocalInferenceDriverStatus>;
    health(): Promise<boolean>;
    status(): LocalInferenceDriverStatus;
    backend(): InferenceBackend;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `backend` | method | <code>backend(): InferenceBackend</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>readonly kind: LocalInferenceEngineKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `load` | method | <code>load(model: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `start` | method | <code>start(model?: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `status` | method | <code>status(): LocalInferenceDriverStatus</code> | Public method; parameters and return type are shown in the signature. |
| `stop` | method | <code>stop(): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `unload` | method | <code>unload(model?: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LocalInferenceDriverConfig`

Local Inference Driver Config interface with 17 public fields or methods.

- Kind: interface
- Import: `import type { LocalInferenceDriverConfig } from '@codesoul-co/hypha-inference';`
- Source module: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### Declaration

```text
export interface LocalInferenceDriverConfig {
    id?: string;
    kind: LocalInferenceEngineKind;
    mode?: LocalInferenceDriverMode;
    baseUrl?: string;
    endpoint?: string;
    model?: string;
    host?: string;
    port?: number;
    command?: string;
    args?: string[];
    cwd?: string;
    env?: Record<string, string>;
    startupTimeoutMs?: number;
    healthPollMs?: number;
    requestTimeoutMs?: number;
    apiKey?: string;
    apiKeyEnv?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apiKey` | property | <code>apiKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `apiKeyEnv` | property | <code>apiKeyEnv?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `args` | property | <code>args?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `baseUrl` | property | <code>baseUrl?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `command` | property | <code>command?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cwd` | property | <code>cwd?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `endpoint` | property | <code>endpoint?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `env` | property | <code>env?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `healthPollMs` | property | <code>healthPollMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `host` | property | <code>host?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: LocalInferenceEngineKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode?: LocalInferenceDriverMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `model` | property | <code>model?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `port` | property | <code>port?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestTimeoutMs` | property | <code>requestTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startupTimeoutMs` | property | <code>startupTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalInferenceDriverStatus`

Local Inference Driver Status interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { LocalInferenceDriverStatus } from '@codesoul-co/hypha-inference';`
- Source module: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### Declaration

```text
export interface LocalInferenceDriverStatus {
    id: string;
    kind: LocalInferenceEngineKind;
    mode: LocalInferenceDriverMode;
    state: LocalInferenceDriverState;
    baseUrl: string;
    model?: string;
    pid?: number;
    healthy: boolean;
    error?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseUrl` | property | <code>baseUrl: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `healthy` | property | <code>healthy: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: LocalInferenceEngineKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: LocalInferenceDriverMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `model` | property | <code>model?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pid` | property | <code>pid?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: LocalInferenceDriverState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalInferenceHealthProbeRequest`

Local Inference Health Probe Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { LocalInferenceHealthProbeRequest } from '@codesoul-co/hypha-inference';`
- Source module: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### Declaration

```text
export interface LocalInferenceHealthProbeRequest {
    url: string;
    headers: Record<string, string>;
    timeoutMs: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `headers` | property | <code>headers: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `url` | property | <code>url: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalInferenceProcessHandle`

Local Inference Process Handle interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { LocalInferenceProcessHandle } from '@codesoul-co/hypha-inference';`
- Source module: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### Declaration

```text
export interface LocalInferenceProcessHandle {
    readonly pid?: number;
    readonly exited: Promise<{
        code: number | null;
        signal: NodeJS.Signals | null;
    }>;
    stop(graceMs?: number): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `exited` | property | <code>readonly exited: Promise&lt;{ code: number &#124; null; signal: NodeJS.Signals &#124; null; }&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pid` | property | <code>readonly pid?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stop` | method | <code>stop(graceMs?: number): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LocalInferenceProcessSpec`

Local Inference Process Spec interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { LocalInferenceProcessSpec } from '@codesoul-co/hypha-inference';`
- Source module: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### Declaration

```text
export interface LocalInferenceProcessSpec {
    command: string;
    args: string[];
    cwd?: string;
    env?: Record<string, string>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `args` | property | <code>args: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `command` | property | <code>command: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cwd` | property | <code>cwd?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `env` | property | <code>env?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalInferenceProcessSupervisor`

Local Inference Process Supervisor interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { LocalInferenceProcessSupervisor } from '@codesoul-co/hypha-inference';`
- Source module: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### Declaration

```text
export interface LocalInferenceProcessSupervisor {
    start(spec: LocalInferenceProcessSpec): Promise<LocalInferenceProcessHandle>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `start` | method | <code>start(spec: LocalInferenceProcessSpec): Promise&lt;LocalInferenceProcessHandle&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LocalInferenceDriverMode`

Public type alias for Local Inference Driver Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { LocalInferenceDriverMode } from '@codesoul-co/hypha-inference';`
- Source module: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### Declaration

```text
export type LocalInferenceDriverMode = 'connect' | 'managed';
```

## `LocalInferenceDriverState`

Public type alias for Local Inference Driver State; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { LocalInferenceDriverState } from '@codesoul-co/hypha-inference';`
- Source module: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### Declaration

```text
export type LocalInferenceDriverState = 'idle' | 'starting' | 'ready' | 'stopping' | 'stopped' | 'failed';
```

## `LocalInferenceEngineKind`

Public type alias for Local Inference Engine Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { LocalInferenceEngineKind } from '@codesoul-co/hypha-inference';`
- Source module: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### Declaration

```text
export type LocalInferenceEngineKind = 'ollama' | 'sglang' | 'vllm';
```

## `LocalInferenceHealthProbe`

Public type alias for Local Inference Health Probe; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { LocalInferenceHealthProbe } from '@codesoul-co/hypha-inference';`
- Source module: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### Declaration

```text
export type LocalInferenceHealthProbe = (request: LocalInferenceHealthProbeRequest) => Promise<boolean>;
```
