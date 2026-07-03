# Architecture Reference

hypha is a harness-oriented agent system framework. In this repository, "harness" is the system-level envelope around an agent: specs, runtime, FSM, events, policy, tools, memory, MCP, inference, trace, replay, audit, regression, and evaluation. It is not a single loop hidden inside one package.

## Package Map

| Package | Responsibility | Should Not Contain |
| --- | --- | --- |
| `@hypha/core` | Shared spec primitives, schema helpers, events, errors, IDs, policy interfaces. | Provider SDKs, database clients, HTTP server code. |
| `@hypha/storage` | Storage provider profiles, topology specs, connection resolution, cloud/local profile helpers. | Concrete database clients or memory behavior. |
| `@hypha/domain` | `DomainPackSpec`, `WorkflowSpec`, session profile initialization, workflow-to-FSM compilation. | Business-specific workflows or app routes. |
| `@hypha/fsm` | FSM process spec, guarded transitions, timeout/retry/human-review semantics. | Tool handlers, model calls, storage adapters. |
| `@hypha/kernel` | ReAct agent spec and executable ReAct runner. | Concrete model providers, direct tool side effects. |
| `@hypha/inference` | Prompt compilation, prefix segmentation, Plasmod hot layer, backend registry, prefix/KV cache, reasoning orchestration. | Provider-specific request types in public kernel contracts. |
| `@hypha/models` | `ModelProvider` abstraction, model aliases/routing, normalized usage/errors/stream events, OpenAI-compatible provider adapters. | Agent loop, workflow semantics, or app-specific model preferences. |
| `@hypha/tools` | Tool specs, registry, governed runner, side-effect policy and trace events. | Direct execution bypassing policy. |
| `@hypha/mcp` | MCP profile specs and capability normalization into framework contracts. | Real server lifecycle as framework core. |
| `@hypha/memory` | Memory provider interfaces, scopes, records, write policy, hybrid provider. | App session storage rules. |
| `@hypha/skills` | Skill specs, refs, activation policy, instruction/assets metadata. | Workflow replacement logic. |
| `@hypha/harness` | Event-first runtime projections, session/run views, queues, replay/audit/regression structures. | FSM internals or app-specific state. |
| `@hypha/adapters-local` | Local SQLite/JSON/file/vector adapters for development and self-hosting. | Framework spec definitions. |
| `@hypha/testing` | Fixtures and test helpers for event/spec/runtime contracts. | Production runtime behavior. |

## Harness, Runtime, and FSM

`harness` is the architectural model: agent behavior is placed inside a governed, observable, replayable system. The `@hypha/harness` package contains reusable runtime support and event-derived projections, but it should not absorb every runtime concern.

`runtime` is the execution layer. It creates sessions and runs, appends events, records side effects, and projects state from events. The server surface currently adapts HTTP requests into this runtime through `apps/server/src/services/EventRuntime.ts`.

`fsm` remains a separate package because FSM is a reusable process language. Domain workflows compile into `FSMProcessSpec`, and the ReAct runtime uses FSM transitions without coupling domain declarations to HTTP, storage, or provider adapters.

## Dependency Direction

Application surfaces may depend on packages. Packages must not depend on `apps/*`.

Allowed examples:

```text
apps/server -> @hypha/domain -> @hypha/fsm -> @hypha/core
apps/server -> @hypha/kernel -> @hypha/inference -> @hypha/models
apps/server -> @hypha/tools -> @hypha/core
apps/server -> @hypha/storage -> @hypha/core
```

Avoid reverse or hidden dependencies:

```text
@hypha/core -> apps/server
@hypha/kernel -> concrete OpenAI SDK
@hypha/domain -> business-specific prompt or route
tool handler -> filesystem/network side effect without ToolRunner
memory writer -> provider write without scope, policy, and trace
agent kernel -> provider-specific model request or response type
```

## Inference Runtime

Agent inference is a packages-layer pipeline: `PromptCompiler` normalizes runtime input, `PrefixSegmenter` separates stable prefix segments from dynamic content, `PlasmodHotLayer` tracks prefix registry/cache metadata/session state/invalidation graph/reuse policy, and `InferenceBackend` adapters call physical backends.

`sglang` is the default backend. `vllm`, `llama.cpp`, and `openai-api` are registered through the same backend interface. Backends may expose physical KV cache handles through `InferenceBackendResponse.physicalKvCache`; the pipeline returns that handle as `InferenceResponse.nextKvCacheValue` so `InferenceManager` can persist it through `cachePolicy.writeKvCache`.

## Extension Boundaries

Add new behavior by defining or extending a spec first, then implementing an adapter or runtime component behind that spec. Public extensions should expose TypeScript types, Zod validation, JSON schema export, examples, and tests.

Presentation clients such as CLI, web, or API server routes are surfaces. They may call runtime APIs, but they do not define framework core types or runtime semantics.
