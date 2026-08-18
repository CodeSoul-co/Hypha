# `@codesoul-co/hypha-inference` / `backends`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Package guide: [learning and composition guide](/packages/inference)
- Source: [`packages/inference/src/backends.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)
- Exports: **11**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `FetchInferenceBackendTransport` | class | <code>new FetchInferenceBackendTransport(): FetchInferenceBackendTransport</code> | Runtime implementation for Fetch Inference Backend Transport; see its public constructor and members below. |
| `InferenceBackendRegistry` | class | <code>new InferenceBackendRegistry(defaultBackendId?: string): InferenceBackendRegistry</code> | Runtime implementation for Inference Backend Registry; see its public constructor and members below. |
| `LlamaCppInferenceBackend` | class | <code>new LlamaCppInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): LlamaCppInferenceBackend</code> | Runtime implementation for Llama Cpp Inference Backend; see its public constructor and members below. |
| `OllamaInferenceBackend` | class | <code>new OllamaInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OllamaInferenceBackend</code> | Runtime implementation for Ollama Inference Backend; see its public constructor and members below. |
| `OpenAIAPIInferenceBackend` | class | <code>new OpenAIAPIInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OpenAIAPIInferenceBackend</code> | Runtime implementation for Open AIAPI Inference Backend; see its public constructor and members below. |
| `SGLangInferenceBackend` | class | <code>new SGLangInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): SGLangInferenceBackend</code> | Runtime implementation for SG Lang Inference Backend; see its public constructor and members below. |
| `VLLMInferenceBackend` | class | <code>new VLLMInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): VLLMInferenceBackend</code> | Runtime implementation for VLLM Inference Backend; see its public constructor and members below. |
| `createDefaultInferenceBackendRegistry` | function | <code>createDefaultInferenceBackendRegistry(options?: DefaultInferenceBackendRegistryOptions): InferenceBackendRegistry</code> | Creates Default Inference Backend Registry at this module boundary. |
| `DefaultInferenceBackendRegistryOptions` | interface | <code>interface DefaultInferenceBackendRegistryOptions</code> | Field contract for Default Inference Backend Registry Options; see all contract members below. |
| `HttpInferenceBackendConfig` | interface | <code>interface HttpInferenceBackendConfig</code> | Field contract for Http Inference Backend Config; see all contract members below. |
| `InferenceBackendTransport` | interface | <code>interface InferenceBackendTransport</code> | Field contract for Inference Backend Transport; see all contract members below. |

## `FetchInferenceBackendTransport` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): FetchInferenceBackendTransport</code> | Creates an instance of this class. |
| `postJson` | method | <code>postJson&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | Public runtime operation for post Json. |
| `streamJson` | method | <code>streamJson&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;TResponse&gt;</code> | Public runtime operation for stream Json. |

## `InferenceBackendRegistry` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(defaultBackendId?: string): InferenceBackendRegistry</code> | Creates an instance of this class. |
| `default` | method | <code>default(): InferenceBackend</code> | Public runtime operation for default. |
| `get` | method | <code>get(id: string): InferenceBackend &#124; null</code> | Gets get at this module boundary. |
| `list` | method | <code>list(): InferenceBackendRegistryEntry[]</code> | Lists list at this module boundary. |
| `register` | method | <code>register(backend: InferenceBackend, options?: { default?: boolean; }): void</code> | Registers register at this module boundary. |
| `require` | method | <code>require(id: string): InferenceBackend</code> | Public runtime operation for require. |

## `LlamaCppInferenceBackend` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): InferenceBackendCapabilities</code> | Public runtime operation for capabilities. |
| `constructor` | constructor | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): LlamaCppInferenceBackend</code> | Creates an instance of this class. |
| `id` | property | <code>id: string</code> | Public id property. |
| `infer` | method | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | Public runtime operation for infer. |
| `kind` | property | <code>kind: InferenceBackendKind</code> | Public kind property. |
| `stream` | method | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | Public runtime operation for stream. |

## `OllamaInferenceBackend` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): InferenceBackendCapabilities</code> | Public runtime operation for capabilities. |
| `constructor` | constructor | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OllamaInferenceBackend</code> | Creates an instance of this class. |
| `id` | property | <code>id: string</code> | Public id property. |
| `infer` | method | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | Public runtime operation for infer. |
| `kind` | property | <code>kind: InferenceBackendKind</code> | Public kind property. |
| `stream` | method | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | Public runtime operation for stream. |

## `OpenAIAPIInferenceBackend` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): InferenceBackendCapabilities</code> | Public runtime operation for capabilities. |
| `constructor` | constructor | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OpenAIAPIInferenceBackend</code> | Creates an instance of this class. |
| `id` | property | <code>id: string</code> | Public id property. |
| `infer` | method | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | Public runtime operation for infer. |
| `kind` | property | <code>kind: InferenceBackendKind</code> | Public kind property. |
| `stream` | method | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | Public runtime operation for stream. |

## `SGLangInferenceBackend` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): InferenceBackendCapabilities</code> | Public runtime operation for capabilities. |
| `constructor` | constructor | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): SGLangInferenceBackend</code> | Creates an instance of this class. |
| `id` | property | <code>id: string</code> | Public id property. |
| `infer` | method | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | Public runtime operation for infer. |
| `kind` | property | <code>kind: InferenceBackendKind</code> | Public kind property. |
| `stream` | method | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | Public runtime operation for stream. |

## `VLLMInferenceBackend` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): InferenceBackendCapabilities</code> | Public runtime operation for capabilities. |
| `constructor` | constructor | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): VLLMInferenceBackend</code> | Creates an instance of this class. |
| `id` | property | <code>id: string</code> | Public id property. |
| `infer` | method | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | Public runtime operation for infer. |
| `kind` | property | <code>kind: InferenceBackendKind</code> | Public kind property. |
| `stream` | method | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | Public runtime operation for stream. |

## `DefaultInferenceBackendRegistryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `defaultBackendId` | property | <code>defaultBackendId: string</code> | Public default Backend Id property. |
| `llamaCpp` | property | <code>llamaCpp: Partial&lt;HttpInferenceBackendConfig&gt;</code> | Public llama Cpp property. |
| `ollama` | property | <code>ollama: Partial&lt;HttpInferenceBackendConfig&gt;</code> | Public ollama property. |
| `openaiApi` | property | <code>openaiApi: Partial&lt;HttpInferenceBackendConfig&gt;</code> | Public openai Api property. |
| `sglang` | property | <code>sglang: Partial&lt;HttpInferenceBackendConfig&gt;</code> | Public sglang property. |
| `vllm` | property | <code>vllm: Partial&lt;HttpInferenceBackendConfig&gt;</code> | Public vllm property. |

## `HttpInferenceBackendConfig` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apiKey` | property | <code>apiKey: string</code> | Public api Key property. |
| `apiKeyEnv` | property | <code>apiKeyEnv: string</code> | Public api Key Env property. |
| `baseUrl` | property | <code>baseUrl: string</code> | Public base Url property. |
| `capabilities` | property | <code>capabilities: Partial&lt;InferenceBackendCapabilities&gt;</code> | Public capabilities property. |
| `endpoint` | property | <code>endpoint: string</code> | Public endpoint property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |
| `transport` | property | <code>transport: InferenceBackendTransport</code> | Public transport property. |

## `InferenceBackendTransport` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `postJson` | method | <code>postJson&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | Public runtime operation for post Json. |
| `streamJson` | method | <code>streamJson&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;TResponse&gt;</code> | Public runtime operation for stream Json. |
