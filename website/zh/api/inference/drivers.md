# `@codesoul-co/hypha-inference` / `drivers`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 源码: [`packages/inference/src/drivers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)
- 导出数: **14**

## 模块用法

用于使用该功能边界的公共契约与操作。Drivers 模块公开 3 类、7 接口、4 类型。

### 从包入口导入

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

// 完整导出列表见下方。
```

### 使用要点

- 11 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `HttpLocalInferenceDriver` | 类 | <code>new HttpLocalInferenceDriver(config: LocalInferenceDriverConfig, supervisor?: LocalInferenceProcessSupervisor, healthProbe?: LocalInferenceHealthProbe): HttpLocalInferenceDriver</code> | Http Local Inference Driver 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LocalInferenceDriverRegistry` | 类 | <code>new LocalInferenceDriverRegistry(): LocalInferenceDriverRegistry</code> | Local Inference Driver Registry 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `NodeLocalInferenceProcessSupervisor` | 类 | <code>new NodeLocalInferenceProcessSupervisor(): NodeLocalInferenceProcessSupervisor</code> | Node Local Inference Process Supervisor 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LocalInferenceDriver` | 接口 | <code>interface LocalInferenceDriver</code> | Local Inference Driver 接口，共包含 9 个公开字段或方法。 |
| `LocalInferenceDriverConfig` | 接口 | <code>interface LocalInferenceDriverConfig</code> | Local Inference Driver Config 接口，共包含 17 个公开字段或方法。 |
| `LocalInferenceDriverStatus` | 接口 | <code>interface LocalInferenceDriverStatus</code> | Local Inference Driver Status 接口，共包含 9 个公开字段或方法。 |
| `LocalInferenceHealthProbeRequest` | 接口 | <code>interface LocalInferenceHealthProbeRequest</code> | Local Inference Health Probe Request 接口，共包含 3 个公开字段或方法。 |
| `LocalInferenceProcessHandle` | 接口 | <code>interface LocalInferenceProcessHandle</code> | Local Inference Process Handle 接口，共包含 3 个公开字段或方法。 |
| `LocalInferenceProcessSpec` | 接口 | <code>interface LocalInferenceProcessSpec</code> | Local Inference Process Spec 接口，共包含 4 个公开字段或方法。 |
| `LocalInferenceProcessSupervisor` | 接口 | <code>interface LocalInferenceProcessSupervisor</code> | Local Inference Process Supervisor 接口，共包含 1 个公开字段或方法。 |
| `LocalInferenceDriverMode` | 类型 | <code>type LocalInferenceDriverMode = 'connect' &#124; 'managed'</code> | Local Inference Driver Mode 公共类型别名；完整类型表达式见声明。 |
| `LocalInferenceDriverState` | 类型 | <code>type LocalInferenceDriverState = 'idle' &#124; 'starting' &#124; 'ready' &#124; 'stopping' &#124; 'stopped' &#124; 'failed'</code> | Local Inference Driver State 公共类型别名；完整类型表达式见声明。 |
| `LocalInferenceEngineKind` | 类型 | <code>type LocalInferenceEngineKind = 'ollama' &#124; 'sglang' &#124; 'vllm'</code> | Local Inference Engine Kind 公共类型别名；完整类型表达式见声明。 |
| `LocalInferenceHealthProbe` | 类型 | <code>type LocalInferenceHealthProbe = (request: LocalInferenceHealthProbeRequest) =&gt; Promise&lt;boolean&gt;</code> | Local Inference Health Probe 公共类型别名；完整类型表达式见声明。 |

## `HttpLocalInferenceDriver`

Http Local Inference Driver 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { HttpLocalInferenceDriver } from '@codesoul-co/hypha-inference';`
- 源码模块: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `backend` | 方法 | <code>backend(): InferenceBackend</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(config: LocalInferenceDriverConfig, supervisor?: LocalInferenceProcessSupervisor, healthProbe?: LocalInferenceHealthProbe): HttpLocalInferenceDriver</code> | 创建该类的实例。 |
| `health` | 方法 | <code>health(): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>readonly kind: LocalInferenceEngineKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `load` | 方法 | <code>load(model: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `start` | 方法 | <code>start(model?: string &#124; undefined): Promise&lt;LocalInferenceDriverStatus&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `status` | 方法 | <code>status(): LocalInferenceDriverStatus</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stop` | 方法 | <code>stop(): Promise&lt;LocalInferenceDriverStatus&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `unload` | 方法 | <code>unload(model?: string &#124; undefined): Promise&lt;LocalInferenceDriverStatus&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalInferenceDriverRegistry`

Local Inference Driver Registry 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LocalInferenceDriverRegistry } from '@codesoul-co/hypha-inference';`
- 源码模块: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### 声明

```text
export declare class LocalInferenceDriverRegistry {
    register(driver: LocalInferenceDriver): void;
    get(id: string): LocalInferenceDriver | null;
    require(id: string): LocalInferenceDriver;
    list(): LocalInferenceDriver[];
    stopAll(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): LocalInferenceDriverRegistry</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(id: string): LocalInferenceDriver &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): LocalInferenceDriver[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `register` | 方法 | <code>register(driver: LocalInferenceDriver): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `require` | 方法 | <code>require(id: string): LocalInferenceDriver</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stopAll` | 方法 | <code>stopAll(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `NodeLocalInferenceProcessSupervisor`

Node Local Inference Process Supervisor 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { NodeLocalInferenceProcessSupervisor } from '@codesoul-co/hypha-inference';`
- 源码模块: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### 声明

```text
export declare class NodeLocalInferenceProcessSupervisor implements LocalInferenceProcessSupervisor {
    start(spec: LocalInferenceProcessSpec): Promise<LocalInferenceProcessHandle>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): NodeLocalInferenceProcessSupervisor</code> | 创建该类的实例。 |
| `start` | 方法 | <code>start(spec: LocalInferenceProcessSpec): Promise&lt;LocalInferenceProcessHandle&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalInferenceDriver`

Local Inference Driver 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalInferenceDriver } from '@codesoul-co/hypha-inference';`
- 源码模块: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `backend` | 方法 | <code>backend(): InferenceBackend</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>readonly kind: LocalInferenceEngineKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `load` | 方法 | <code>load(model: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `start` | 方法 | <code>start(model?: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `status` | 方法 | <code>status(): LocalInferenceDriverStatus</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stop` | 方法 | <code>stop(): Promise&lt;LocalInferenceDriverStatus&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `unload` | 方法 | <code>unload(model?: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalInferenceDriverConfig`

Local Inference Driver Config 接口，共包含 17 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalInferenceDriverConfig } from '@codesoul-co/hypha-inference';`
- 源码模块: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apiKey` | 属性 | <code>apiKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `apiKeyEnv` | 属性 | <code>apiKeyEnv?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `args` | 属性 | <code>args?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `baseUrl` | 属性 | <code>baseUrl?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `command` | 属性 | <code>command?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cwd` | 属性 | <code>cwd?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `endpoint` | 属性 | <code>endpoint?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `env` | 属性 | <code>env?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `healthPollMs` | 属性 | <code>healthPollMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `host` | 属性 | <code>host?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: LocalInferenceEngineKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode?: LocalInferenceDriverMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `model` | 属性 | <code>model?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `port` | 属性 | <code>port?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestTimeoutMs` | 属性 | <code>requestTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startupTimeoutMs` | 属性 | <code>startupTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalInferenceDriverStatus`

Local Inference Driver Status 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalInferenceDriverStatus } from '@codesoul-co/hypha-inference';`
- 源码模块: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `healthy` | 属性 | <code>healthy: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: LocalInferenceEngineKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: LocalInferenceDriverMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `model` | 属性 | <code>model?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pid` | 属性 | <code>pid?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: LocalInferenceDriverState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalInferenceHealthProbeRequest`

Local Inference Health Probe Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalInferenceHealthProbeRequest } from '@codesoul-co/hypha-inference';`
- 源码模块: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### 声明

```text
export interface LocalInferenceHealthProbeRequest {
    url: string;
    headers: Record<string, string>;
    timeoutMs: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `headers` | 属性 | <code>headers: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `url` | 属性 | <code>url: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalInferenceProcessHandle`

Local Inference Process Handle 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalInferenceProcessHandle } from '@codesoul-co/hypha-inference';`
- 源码模块: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `exited` | 属性 | <code>readonly exited: Promise&lt;{ code: number &#124; null; signal: NodeJS.Signals &#124; null; }&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pid` | 属性 | <code>readonly pid?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stop` | 方法 | <code>stop(graceMs?: number): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalInferenceProcessSpec`

Local Inference Process Spec 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalInferenceProcessSpec } from '@codesoul-co/hypha-inference';`
- 源码模块: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### 声明

```text
export interface LocalInferenceProcessSpec {
    command: string;
    args: string[];
    cwd?: string;
    env?: Record<string, string>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `args` | 属性 | <code>args: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `command` | 属性 | <code>command: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cwd` | 属性 | <code>cwd?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `env` | 属性 | <code>env?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalInferenceProcessSupervisor`

Local Inference Process Supervisor 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalInferenceProcessSupervisor } from '@codesoul-co/hypha-inference';`
- 源码模块: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### 声明

```text
export interface LocalInferenceProcessSupervisor {
    start(spec: LocalInferenceProcessSpec): Promise<LocalInferenceProcessHandle>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `start` | 方法 | <code>start(spec: LocalInferenceProcessSpec): Promise&lt;LocalInferenceProcessHandle&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalInferenceDriverMode`

Local Inference Driver Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { LocalInferenceDriverMode } from '@codesoul-co/hypha-inference';`
- 源码模块: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### 声明

```text
export type LocalInferenceDriverMode = 'connect' | 'managed';
```

## `LocalInferenceDriverState`

Local Inference Driver State 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { LocalInferenceDriverState } from '@codesoul-co/hypha-inference';`
- 源码模块: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### 声明

```text
export type LocalInferenceDriverState = 'idle' | 'starting' | 'ready' | 'stopping' | 'stopped' | 'failed';
```

## `LocalInferenceEngineKind`

Local Inference Engine Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { LocalInferenceEngineKind } from '@codesoul-co/hypha-inference';`
- 源码模块: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### 声明

```text
export type LocalInferenceEngineKind = 'ollama' | 'sglang' | 'vllm';
```

## `LocalInferenceHealthProbe`

Local Inference Health Probe 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { LocalInferenceHealthProbe } from '@codesoul-co/hypha-inference';`
- 源码模块: [`drivers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)

### 声明

```text
export type LocalInferenceHealthProbe = (request: LocalInferenceHealthProbeRequest) => Promise<boolean>;
```
