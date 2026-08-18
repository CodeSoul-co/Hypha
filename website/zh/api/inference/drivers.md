# `@codesoul-co/hypha-inference` / `drivers`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 模块指南: [学习与组合说明](/zh/packages/inference)
- 源码: [`packages/inference/src/drivers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)
- 导出数: **14**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `HttpLocalInferenceDriver` | 类 | <code>new HttpLocalInferenceDriver(config: LocalInferenceDriverConfig, supervisor?: LocalInferenceProcessSupervisor, healthProbe?: LocalInferenceHealthProbe): HttpLocalInferenceDriver</code> | Http Local Inference Driver 的运行时实现；公开构造函数与成员见下表。 |
| `LocalInferenceDriverRegistry` | 类 | <code>new LocalInferenceDriverRegistry(): LocalInferenceDriverRegistry</code> | Local Inference Driver Registry 的运行时实现；公开构造函数与成员见下表。 |
| `NodeLocalInferenceProcessSupervisor` | 类 | <code>new NodeLocalInferenceProcessSupervisor(): NodeLocalInferenceProcessSupervisor</code> | Node Local Inference Process Supervisor 的运行时实现；公开构造函数与成员见下表。 |
| `LocalInferenceDriver` | 接口 | <code>interface LocalInferenceDriver</code> | Local Inference Driver 的字段契约；完整字段见下表。 |
| `LocalInferenceDriverConfig` | 接口 | <code>interface LocalInferenceDriverConfig</code> | Local Inference Driver Config 的字段契约；完整字段见下表。 |
| `LocalInferenceDriverStatus` | 接口 | <code>interface LocalInferenceDriverStatus</code> | Local Inference Driver Status 的字段契约；完整字段见下表。 |
| `LocalInferenceHealthProbeRequest` | 接口 | <code>interface LocalInferenceHealthProbeRequest</code> | Local Inference Health Probe Request 的字段契约；完整字段见下表。 |
| `LocalInferenceProcessHandle` | 接口 | <code>interface LocalInferenceProcessHandle</code> | Local Inference Process Handle 的字段契约；完整字段见下表。 |
| `LocalInferenceProcessSpec` | 接口 | <code>interface LocalInferenceProcessSpec</code> | Local Inference Process Spec 的字段契约；完整字段见下表。 |
| `LocalInferenceProcessSupervisor` | 接口 | <code>interface LocalInferenceProcessSupervisor</code> | Local Inference Process Supervisor 的字段契约；完整字段见下表。 |
| `LocalInferenceDriverMode` | 类型 | <code>type LocalInferenceDriverMode = 'connect' &#124; 'managed'</code> | Local Inference Driver Mode 的公共类型别名。 |
| `LocalInferenceDriverState` | 类型 | <code>type LocalInferenceDriverState = 'idle' &#124; 'starting' &#124; 'ready' &#124; 'stopping' &#124; 'stopped' &#124; 'failed'</code> | Local Inference Driver State 的公共类型别名。 |
| `LocalInferenceEngineKind` | 类型 | <code>type LocalInferenceEngineKind = 'ollama' &#124; 'sglang' &#124; 'vllm'</code> | Local Inference Engine Kind 的公共类型别名。 |
| `LocalInferenceHealthProbe` | 类型 | <code>type LocalInferenceHealthProbe = (request: LocalInferenceHealthProbeRequest) =&gt; Promise&lt;boolean&gt;</code> | Local Inference Health Probe 的公共类型别名。 |

## `HttpLocalInferenceDriver` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `backend` | 方法 | <code>backend(): InferenceBackend</code> | backend 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(config: LocalInferenceDriverConfig, supervisor?: LocalInferenceProcessSupervisor, healthProbe?: LocalInferenceHealthProbe): HttpLocalInferenceDriver</code> | 创建该类的实例。 |
| `health` | 方法 | <code>health(): Promise&lt;boolean&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `kind` | 属性 | <code>kind: LocalInferenceEngineKind</code> | kind 字段。 |
| `load` | 方法 | <code>load(model: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | 加载 load。 |
| `start` | 方法 | <code>start(model?: string &#124; undefined): Promise&lt;LocalInferenceDriverStatus&gt;</code> | 启动 start。 |
| `status` | 方法 | <code>status(): LocalInferenceDriverStatus</code> | status 的公开运行时操作。 |
| `stop` | 方法 | <code>stop(): Promise&lt;LocalInferenceDriverStatus&gt;</code> | stop 的公开运行时操作。 |
| `unload` | 方法 | <code>unload(model?: string &#124; undefined): Promise&lt;LocalInferenceDriverStatus&gt;</code> | unload 的公开运行时操作。 |

## `LocalInferenceDriverRegistry` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): LocalInferenceDriverRegistry</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(id: string): LocalInferenceDriver &#124; null</code> | 读取 get。 |
| `list` | 方法 | <code>list(): LocalInferenceDriver[]</code> | 列出 list。 |
| `register` | 方法 | <code>register(driver: LocalInferenceDriver): void</code> | 注册 register。 |
| `require` | 方法 | <code>require(id: string): LocalInferenceDriver</code> | require 的公开运行时操作。 |
| `stopAll` | 方法 | <code>stopAll(): Promise&lt;void&gt;</code> | stop All 的公开运行时操作。 |

## `NodeLocalInferenceProcessSupervisor` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): NodeLocalInferenceProcessSupervisor</code> | 创建该类的实例。 |
| `start` | 方法 | <code>start(spec: LocalInferenceProcessSpec): Promise&lt;LocalInferenceProcessHandle&gt;</code> | 启动 start。 |

## `LocalInferenceDriver` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `backend` | 方法 | <code>backend(): InferenceBackend</code> | backend 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;boolean&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `kind` | 属性 | <code>kind: LocalInferenceEngineKind</code> | kind 字段。 |
| `load` | 方法 | <code>load(model: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | 加载 load。 |
| `start` | 方法 | <code>start(model?: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | 启动 start。 |
| `status` | 方法 | <code>status(): LocalInferenceDriverStatus</code> | status 的公开运行时操作。 |
| `stop` | 方法 | <code>stop(): Promise&lt;LocalInferenceDriverStatus&gt;</code> | stop 的公开运行时操作。 |
| `unload` | 方法 | <code>unload(model?: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | unload 的公开运行时操作。 |

## `LocalInferenceDriverConfig` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apiKey` | 属性 | <code>apiKey: string</code> | api Key 字段。 |
| `apiKeyEnv` | 属性 | <code>apiKeyEnv: string</code> | api Key Env 字段。 |
| `args` | 属性 | <code>args: string[]</code> | args 字段。 |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | base Url 字段。 |
| `command` | 属性 | <code>command: string</code> | command 字段。 |
| `cwd` | 属性 | <code>cwd: string</code> | cwd 字段。 |
| `endpoint` | 属性 | <code>endpoint: string</code> | endpoint 字段。 |
| `env` | 属性 | <code>env: Record&lt;string, string&gt;</code> | env 字段。 |
| `healthPollMs` | 属性 | <code>healthPollMs: number</code> | health Poll Ms 字段。 |
| `host` | 属性 | <code>host: string</code> | host 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `kind` | 属性 | <code>kind: LocalInferenceEngineKind</code> | kind 字段。 |
| `mode` | 属性 | <code>mode: LocalInferenceDriverMode</code> | mode 字段。 |
| `model` | 属性 | <code>model: string</code> | model 字段。 |
| `port` | 属性 | <code>port: number</code> | port 字段。 |
| `requestTimeoutMs` | 属性 | <code>requestTimeoutMs: number</code> | request Timeout Ms 字段。 |
| `startupTimeoutMs` | 属性 | <code>startupTimeoutMs: number</code> | startup Timeout Ms 字段。 |

## `LocalInferenceDriverStatus` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | base Url 字段。 |
| `error` | 属性 | <code>error: string</code> | error 字段。 |
| `healthy` | 属性 | <code>healthy: boolean</code> | healthy 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `kind` | 属性 | <code>kind: LocalInferenceEngineKind</code> | kind 字段。 |
| `mode` | 属性 | <code>mode: LocalInferenceDriverMode</code> | mode 字段。 |
| `model` | 属性 | <code>model: string</code> | model 字段。 |
| `pid` | 属性 | <code>pid: number</code> | pid 字段。 |
| `state` | 属性 | <code>state: LocalInferenceDriverState</code> | state 字段。 |

## `LocalInferenceHealthProbeRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `headers` | 属性 | <code>headers: Record&lt;string, string&gt;</code> | headers 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |
| `url` | 属性 | <code>url: string</code> | url 字段。 |

## `LocalInferenceProcessHandle` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `exited` | 属性 | <code>exited: Promise&lt;{ code: number &#124; null; signal: NodeJS.Signals &#124; null; }&gt;</code> | exited 字段。 |
| `pid` | 属性 | <code>pid: number</code> | pid 字段。 |
| `stop` | 方法 | <code>stop(graceMs?: number): Promise&lt;void&gt;</code> | stop 的公开运行时操作。 |

## `LocalInferenceProcessSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `args` | 属性 | <code>args: string[]</code> | args 字段。 |
| `command` | 属性 | <code>command: string</code> | command 字段。 |
| `cwd` | 属性 | <code>cwd: string</code> | cwd 字段。 |
| `env` | 属性 | <code>env: Record&lt;string, string&gt;</code> | env 字段。 |

## `LocalInferenceProcessSupervisor` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `start` | 方法 | <code>start(spec: LocalInferenceProcessSpec): Promise&lt;LocalInferenceProcessHandle&gt;</code> | 启动 start。 |
