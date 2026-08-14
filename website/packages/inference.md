# `@codesoul-co/hypha-inference`

`hypha-inference` provides normalized inference requests, backend registration, prompt profiles and prefix/KV cache coordination. Kernel code addresses a backend ID or model alias instead of importing a provider SDK.

```bash
npm install @codesoul-co/hypha-inference@1.0.1
```

## Main exports

| Export | Use |
| --- | --- |
| `InferenceManager` | Register providers and execute normalized inference |
| `InferenceProvider` | Minimal provider-neutral inference port |
| `InferenceBackendRegistry` | Register HTTP/local backend families |
| `createDefaultInferenceBackendRegistry` | Compose supported backend adapters |
| `PromptProfileRegistry` | Version and resolve layered prompt profiles |
| `InMemoryPrefixCacheProvider` | Test/local prefix-cache metadata |
| `InMemoryKvCacheProvider` | Test/local scoped KV reuse |

## Minimal provider

```ts
import { InferenceManager } from '@codesoul-co/hypha-inference';

const inference = new InferenceManager();

inference.register({
  id: 'echo',
  infer: async (request) => ({
    id: `response-${request.stepId}`,
    output: request.input,
    usage: { inputTokens: 0, outputTokens: 0 },
  }),
});

const response = await inference.infer('echo', {
  runId: 'run-1',
  stepId: 'step-reason-1',
  modelAlias: 'reasoning.primary',
  input: 'Summarize the verified evidence.',
});
```

`runId` and `stepId` make the request traceable. Add Session/workspace cache scope only when reuse is explicitly allowed by policy.

## Cache-aware composition

```ts
import {
  InferenceManager,
  InMemoryKvCacheProvider,
  InMemoryPrefixCacheProvider,
} from '@codesoul-co/hypha-inference';

const manager = new InferenceManager({
  prefixCache: new InMemoryPrefixCacheProvider(),
  kvCache: new InMemoryKvCacheProvider(),
});
```

Prefix metadata describes reusable stable prompt segments. KV entries must be bounded by Run, Session or workspace scope. A cache hit is an optimization and must not replace the Event/trace that explains what the Run observed.

## Backend selection

The backend registry includes OpenAI API, Ollama, SGLang, vLLM and llama.cpp adapters. Register only the backends enabled by deployment configuration. Resolve endpoints and credentials in trusted composition, enforce timeouts/cancellation, and normalize response/error evidence before returning to Kernel.

## Prompt profiles

`PromptProfileRegistry` composes versioned layers from controlled sources. Record the selected profile/version or artifact reference in trace evidence; do not silently change the prompt for an in-progress replay fixture.

## Production checks

- Reject unknown backend IDs and unapproved aliases at startup.
- Bound request/output size and redact secrets before tracing.
- Propagate cancellation and deadlines to the transport.
- Verify cache scope equivalence before reuse.
- Test provider failure, timeout, malformed output and cache miss paths.
