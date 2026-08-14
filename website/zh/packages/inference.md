# `@codesoul-co/hypha-inference`

`hypha-inference` 提供统一 Inference Request、Backend 注册、Prompt Profile 与 Prefix/KV Cache 协调。Kernel 只面向 Backend ID 或 Model Alias，不导入 Provider SDK。

```bash
npm install @codesoul-co/hypha-inference@1.0.1
```

## 主要导出

| 导出 | 用途 |
| --- | --- |
| `InferenceManager` | 注册 Provider 并执行统一推理 |
| `InferenceProvider` | 最小 Provider-neutral Port |
| `InferenceBackendRegistry` | 注册 HTTP/本地 Backend |
| `createDefaultInferenceBackendRegistry` | 组合支持的 Backend Adapter |
| `PromptProfileRegistry` | 版本化、解析分层 Prompt |
| `InMemoryPrefixCacheProvider` | 测试/本地 Prefix Metadata |
| `InMemoryKvCacheProvider` | 测试/本地作用域 KV 复用 |

## 最小 Provider

```ts
import { InferenceManager } from '@codesoul-co/hypha-inference';

const inference = new InferenceManager();
inference.register({
  id: 'echo',
  infer: async (request) => ({
    id: `response-${request.stepId}`,
    output: request.input,
  }),
});

const response = await inference.infer('echo', {
  runId: 'run-1',
  stepId: 'step-reason-1',
  modelAlias: 'reasoning.primary',
  input: 'Summarize the verified evidence.',
});
```

`runId`/`stepId` 让请求可追踪；只有 Policy 明确允许时才增加 Session/Workspace Cache Scope。

## Cache 与 Backend

`InferenceManager` 可注入 `InMemoryPrefixCacheProvider` 和 `InMemoryKvCacheProvider`。Prefix 描述可复用稳定 Prompt 段；KV 必须限制在 Run、Session 或 Workspace。Cache Hit 是优化，不能代替解释 Run Observation 的 Event/Trace。

Backend Registry 支持 OpenAI API、Ollama、SGLang、vLLM 和 llama.cpp。只注册部署启用的 Backend，在可信层解析 Endpoint/Secret，并传播 Timeout/Cancellation。

生产测试应覆盖未知 Backend、Provider 故障、超时、畸形输出、Cache Miss/Scope 隔离与 Trace 脱敏。
