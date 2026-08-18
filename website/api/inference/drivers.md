# `@codesoul-co/hypha-inference` / `drivers`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Package guide: [learning and composition guide](/packages/inference)
- Source: [`packages/inference/src/drivers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts)
- Exports: **14**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `HttpLocalInferenceDriver` | class | <code>new HttpLocalInferenceDriver(config: LocalInferenceDriverConfig, supervisor?: LocalInferenceProcessSupervisor, healthProbe?: LocalInferenceHealthProbe): HttpLocalInferenceDriver</code> | Runtime implementation for Http Local Inference Driver; see its public constructor and members below. |
| `LocalInferenceDriverRegistry` | class | <code>new LocalInferenceDriverRegistry(): LocalInferenceDriverRegistry</code> | Runtime implementation for Local Inference Driver Registry; see its public constructor and members below. |
| `NodeLocalInferenceProcessSupervisor` | class | <code>new NodeLocalInferenceProcessSupervisor(): NodeLocalInferenceProcessSupervisor</code> | Runtime implementation for Node Local Inference Process Supervisor; see its public constructor and members below. |
| `LocalInferenceDriver` | interface | <code>interface LocalInferenceDriver</code> | Field contract for Local Inference Driver; see all contract members below. |
| `LocalInferenceDriverConfig` | interface | <code>interface LocalInferenceDriverConfig</code> | Field contract for Local Inference Driver Config; see all contract members below. |
| `LocalInferenceDriverStatus` | interface | <code>interface LocalInferenceDriverStatus</code> | Field contract for Local Inference Driver Status; see all contract members below. |
| `LocalInferenceHealthProbeRequest` | interface | <code>interface LocalInferenceHealthProbeRequest</code> | Field contract for Local Inference Health Probe Request; see all contract members below. |
| `LocalInferenceProcessHandle` | interface | <code>interface LocalInferenceProcessHandle</code> | Field contract for Local Inference Process Handle; see all contract members below. |
| `LocalInferenceProcessSpec` | interface | <code>interface LocalInferenceProcessSpec</code> | Field contract for Local Inference Process Spec; see all contract members below. |
| `LocalInferenceProcessSupervisor` | interface | <code>interface LocalInferenceProcessSupervisor</code> | Field contract for Local Inference Process Supervisor; see all contract members below. |
| `LocalInferenceDriverMode` | type | <code>type LocalInferenceDriverMode = 'connect' &#124; 'managed'</code> | Public type alias for Local Inference Driver Mode. |
| `LocalInferenceDriverState` | type | <code>type LocalInferenceDriverState = 'idle' &#124; 'starting' &#124; 'ready' &#124; 'stopping' &#124; 'stopped' &#124; 'failed'</code> | Public type alias for Local Inference Driver State. |
| `LocalInferenceEngineKind` | type | <code>type LocalInferenceEngineKind = 'ollama' &#124; 'sglang' &#124; 'vllm'</code> | Public type alias for Local Inference Engine Kind. |
| `LocalInferenceHealthProbe` | type | <code>type LocalInferenceHealthProbe = (request: LocalInferenceHealthProbeRequest) =&gt; Promise&lt;boolean&gt;</code> | Public type alias for Local Inference Health Probe. |

## `HttpLocalInferenceDriver` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `backend` | method | <code>backend(): InferenceBackend</code> | Public runtime operation for backend. |
| `constructor` | constructor | <code>(config: LocalInferenceDriverConfig, supervisor?: LocalInferenceProcessSupervisor, healthProbe?: LocalInferenceHealthProbe): HttpLocalInferenceDriver</code> | Creates an instance of this class. |
| `health` | method | <code>health(): Promise&lt;boolean&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `kind` | property | <code>kind: LocalInferenceEngineKind</code> | Public kind property. |
| `load` | method | <code>load(model: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Loads load at this module boundary. |
| `start` | method | <code>start(model?: string &#124; undefined): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Starts start at this module boundary. |
| `status` | method | <code>status(): LocalInferenceDriverStatus</code> | Public runtime operation for status. |
| `stop` | method | <code>stop(): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Public runtime operation for stop. |
| `unload` | method | <code>unload(model?: string &#124; undefined): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Public runtime operation for unload. |

## `LocalInferenceDriverRegistry` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): LocalInferenceDriverRegistry</code> | Creates an instance of this class. |
| `get` | method | <code>get(id: string): LocalInferenceDriver &#124; null</code> | Gets get at this module boundary. |
| `list` | method | <code>list(): LocalInferenceDriver[]</code> | Lists list at this module boundary. |
| `register` | method | <code>register(driver: LocalInferenceDriver): void</code> | Registers register at this module boundary. |
| `require` | method | <code>require(id: string): LocalInferenceDriver</code> | Public runtime operation for require. |
| `stopAll` | method | <code>stopAll(): Promise&lt;void&gt;</code> | Public runtime operation for stop All. |

## `NodeLocalInferenceProcessSupervisor` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): NodeLocalInferenceProcessSupervisor</code> | Creates an instance of this class. |
| `start` | method | <code>start(spec: LocalInferenceProcessSpec): Promise&lt;LocalInferenceProcessHandle&gt;</code> | Starts start at this module boundary. |

## `LocalInferenceDriver` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `backend` | method | <code>backend(): InferenceBackend</code> | Public runtime operation for backend. |
| `health` | method | <code>health(): Promise&lt;boolean&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `kind` | property | <code>kind: LocalInferenceEngineKind</code> | Public kind property. |
| `load` | method | <code>load(model: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Loads load at this module boundary. |
| `start` | method | <code>start(model?: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Starts start at this module boundary. |
| `status` | method | <code>status(): LocalInferenceDriverStatus</code> | Public runtime operation for status. |
| `stop` | method | <code>stop(): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Public runtime operation for stop. |
| `unload` | method | <code>unload(model?: string): Promise&lt;LocalInferenceDriverStatus&gt;</code> | Public runtime operation for unload. |

## `LocalInferenceDriverConfig` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apiKey` | property | <code>apiKey: string</code> | Public api Key property. |
| `apiKeyEnv` | property | <code>apiKeyEnv: string</code> | Public api Key Env property. |
| `args` | property | <code>args: string[]</code> | Public args property. |
| `baseUrl` | property | <code>baseUrl: string</code> | Public base Url property. |
| `command` | property | <code>command: string</code> | Public command property. |
| `cwd` | property | <code>cwd: string</code> | Public cwd property. |
| `endpoint` | property | <code>endpoint: string</code> | Public endpoint property. |
| `env` | property | <code>env: Record&lt;string, string&gt;</code> | Public env property. |
| `healthPollMs` | property | <code>healthPollMs: number</code> | Public health Poll Ms property. |
| `host` | property | <code>host: string</code> | Public host property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `kind` | property | <code>kind: LocalInferenceEngineKind</code> | Public kind property. |
| `mode` | property | <code>mode: LocalInferenceDriverMode</code> | Public mode property. |
| `model` | property | <code>model: string</code> | Public model property. |
| `port` | property | <code>port: number</code> | Public port property. |
| `requestTimeoutMs` | property | <code>requestTimeoutMs: number</code> | Public request Timeout Ms property. |
| `startupTimeoutMs` | property | <code>startupTimeoutMs: number</code> | Public startup Timeout Ms property. |

## `LocalInferenceDriverStatus` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseUrl` | property | <code>baseUrl: string</code> | Public base Url property. |
| `error` | property | <code>error: string</code> | Public error property. |
| `healthy` | property | <code>healthy: boolean</code> | Public healthy property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `kind` | property | <code>kind: LocalInferenceEngineKind</code> | Public kind property. |
| `mode` | property | <code>mode: LocalInferenceDriverMode</code> | Public mode property. |
| `model` | property | <code>model: string</code> | Public model property. |
| `pid` | property | <code>pid: number</code> | Public pid property. |
| `state` | property | <code>state: LocalInferenceDriverState</code> | Public state property. |

## `LocalInferenceHealthProbeRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `headers` | property | <code>headers: Record&lt;string, string&gt;</code> | Public headers property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |
| `url` | property | <code>url: string</code> | Public url property. |

## `LocalInferenceProcessHandle` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `exited` | property | <code>exited: Promise&lt;{ code: number &#124; null; signal: NodeJS.Signals &#124; null; }&gt;</code> | Public exited property. |
| `pid` | property | <code>pid: number</code> | Public pid property. |
| `stop` | method | <code>stop(graceMs?: number): Promise&lt;void&gt;</code> | Public runtime operation for stop. |

## `LocalInferenceProcessSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `args` | property | <code>args: string[]</code> | Public args property. |
| `command` | property | <code>command: string</code> | Public command property. |
| `cwd` | property | <code>cwd: string</code> | Public cwd property. |
| `env` | property | <code>env: Record&lt;string, string&gt;</code> | Public env property. |

## `LocalInferenceProcessSupervisor` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `start` | method | <code>start(spec: LocalInferenceProcessSpec): Promise&lt;LocalInferenceProcessHandle&gt;</code> | Starts start at this module boundary. |
