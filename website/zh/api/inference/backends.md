# `@codesoul-co/hypha-inference` / `backends`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 模块指南: [学习与组合说明](/zh/packages/inference)
- 源码: [`packages/inference/src/backends.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)
- 导出数: **11**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `FetchInferenceBackendTransport` | 类 | <code>new FetchInferenceBackendTransport(): FetchInferenceBackendTransport</code> | Fetch Inference Backend Transport 的运行时实现；公开构造函数与成员见下表。 |
| `InferenceBackendRegistry` | 类 | <code>new InferenceBackendRegistry(defaultBackendId?: string): InferenceBackendRegistry</code> | Inference Backend Registry 的运行时实现；公开构造函数与成员见下表。 |
| `LlamaCppInferenceBackend` | 类 | <code>new LlamaCppInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): LlamaCppInferenceBackend</code> | Llama Cpp Inference Backend 的运行时实现；公开构造函数与成员见下表。 |
| `OllamaInferenceBackend` | 类 | <code>new OllamaInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OllamaInferenceBackend</code> | Ollama Inference Backend 的运行时实现；公开构造函数与成员见下表。 |
| `OpenAIAPIInferenceBackend` | 类 | <code>new OpenAIAPIInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OpenAIAPIInferenceBackend</code> | Open AIAPI Inference Backend 的运行时实现；公开构造函数与成员见下表。 |
| `SGLangInferenceBackend` | 类 | <code>new SGLangInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): SGLangInferenceBackend</code> | SG Lang Inference Backend 的运行时实现；公开构造函数与成员见下表。 |
| `VLLMInferenceBackend` | 类 | <code>new VLLMInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): VLLMInferenceBackend</code> | VLLM Inference Backend 的运行时实现；公开构造函数与成员见下表。 |
| `createDefaultInferenceBackendRegistry` | 函数 | <code>createDefaultInferenceBackendRegistry(options?: DefaultInferenceBackendRegistryOptions): InferenceBackendRegistry</code> | 创建 Default Inference Backend Registry。 |
| `DefaultInferenceBackendRegistryOptions` | 接口 | <code>interface DefaultInferenceBackendRegistryOptions</code> | Default Inference Backend Registry Options 的字段契约；完整字段见下表。 |
| `HttpInferenceBackendConfig` | 接口 | <code>interface HttpInferenceBackendConfig</code> | Http Inference Backend Config 的字段契约；完整字段见下表。 |
| `InferenceBackendTransport` | 接口 | <code>interface InferenceBackendTransport</code> | Inference Backend Transport 的字段契约；完整字段见下表。 |

## `FetchInferenceBackendTransport` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): FetchInferenceBackendTransport</code> | 创建该类的实例。 |
| `postJson` | 方法 | <code>postJson&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | post Json 的公开运行时操作。 |
| `streamJson` | 方法 | <code>streamJson&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;TResponse&gt;</code> | stream Json 的公开运行时操作。 |

## `InferenceBackendRegistry` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(defaultBackendId?: string): InferenceBackendRegistry</code> | 创建该类的实例。 |
| `default` | 方法 | <code>default(): InferenceBackend</code> | default 的公开运行时操作。 |
| `get` | 方法 | <code>get(id: string): InferenceBackend &#124; null</code> | 读取 get。 |
| `list` | 方法 | <code>list(): InferenceBackendRegistryEntry[]</code> | 列出 list。 |
| `register` | 方法 | <code>register(backend: InferenceBackend, options?: { default?: boolean; }): void</code> | 注册 register。 |
| `require` | 方法 | <code>require(id: string): InferenceBackend</code> | require 的公开运行时操作。 |

## `LlamaCppInferenceBackend` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): InferenceBackendCapabilities</code> | capabilities 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): LlamaCppInferenceBackend</code> | 创建该类的实例。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `infer` | 方法 | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | infer 的公开运行时操作。 |
| `kind` | 属性 | <code>kind: InferenceBackendKind</code> | kind 字段。 |
| `stream` | 方法 | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | stream 的公开运行时操作。 |

## `OllamaInferenceBackend` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): InferenceBackendCapabilities</code> | capabilities 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OllamaInferenceBackend</code> | 创建该类的实例。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `infer` | 方法 | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | infer 的公开运行时操作。 |
| `kind` | 属性 | <code>kind: InferenceBackendKind</code> | kind 字段。 |
| `stream` | 方法 | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | stream 的公开运行时操作。 |

## `OpenAIAPIInferenceBackend` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): InferenceBackendCapabilities</code> | capabilities 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OpenAIAPIInferenceBackend</code> | 创建该类的实例。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `infer` | 方法 | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | infer 的公开运行时操作。 |
| `kind` | 属性 | <code>kind: InferenceBackendKind</code> | kind 字段。 |
| `stream` | 方法 | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | stream 的公开运行时操作。 |

## `SGLangInferenceBackend` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): InferenceBackendCapabilities</code> | capabilities 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): SGLangInferenceBackend</code> | 创建该类的实例。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `infer` | 方法 | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | infer 的公开运行时操作。 |
| `kind` | 属性 | <code>kind: InferenceBackendKind</code> | kind 字段。 |
| `stream` | 方法 | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | stream 的公开运行时操作。 |

## `VLLMInferenceBackend` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): InferenceBackendCapabilities</code> | capabilities 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): VLLMInferenceBackend</code> | 创建该类的实例。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `infer` | 方法 | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | infer 的公开运行时操作。 |
| `kind` | 属性 | <code>kind: InferenceBackendKind</code> | kind 字段。 |
| `stream` | 方法 | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | stream 的公开运行时操作。 |

## `DefaultInferenceBackendRegistryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `defaultBackendId` | 属性 | <code>defaultBackendId: string</code> | default Backend Id 字段。 |
| `llamaCpp` | 属性 | <code>llamaCpp: Partial&lt;HttpInferenceBackendConfig&gt;</code> | llama Cpp 字段。 |
| `ollama` | 属性 | <code>ollama: Partial&lt;HttpInferenceBackendConfig&gt;</code> | ollama 字段。 |
| `openaiApi` | 属性 | <code>openaiApi: Partial&lt;HttpInferenceBackendConfig&gt;</code> | openai Api 字段。 |
| `sglang` | 属性 | <code>sglang: Partial&lt;HttpInferenceBackendConfig&gt;</code> | sglang 字段。 |
| `vllm` | 属性 | <code>vllm: Partial&lt;HttpInferenceBackendConfig&gt;</code> | vllm 字段。 |

## `HttpInferenceBackendConfig` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apiKey` | 属性 | <code>apiKey: string</code> | api Key 字段。 |
| `apiKeyEnv` | 属性 | <code>apiKeyEnv: string</code> | api Key Env 字段。 |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | base Url 字段。 |
| `capabilities` | 属性 | <code>capabilities: Partial&lt;InferenceBackendCapabilities&gt;</code> | capabilities 字段。 |
| `endpoint` | 属性 | <code>endpoint: string</code> | endpoint 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |
| `transport` | 属性 | <code>transport: InferenceBackendTransport</code> | transport 字段。 |

## `InferenceBackendTransport` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `postJson` | 方法 | <code>postJson&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | post Json 的公开运行时操作。 |
| `streamJson` | 方法 | <code>streamJson&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;TResponse&gt;</code> | stream Json 的公开运行时操作。 |
