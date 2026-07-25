# Architecture Reference

hypha is a harness-oriented agent system framework. In this repository, "harness" is the system-level envelope around an agent: specs, runtime, FSM, events, policy, tools, memory, MCP, inference, trace, replay, audit, regression, and evaluation. It is not a single loop hidden inside one package.

## Package Map

| Package                 | Responsibility                                                                                                                                                   | Should Not Contain                                                             |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `@hypha/core`           | Shared spec primitives, schema helpers, events, errors, IDs, policy interfaces.                                                                                  | Provider SDKs, database clients, HTTP server code.                             |
| `@hypha/storage`        | Storage profiles/topology, connection resolution, provider-neutral failure classification, and recovery advice.                                                  | Concrete database clients or memory behavior.                                  |
| `@hypha/domain`         | `DomainPackSpec`, `WorkflowSpec`, `ReasoningSpec`, session initialization, local pack loading, overlays, registry, and compiler.                                 | Business-specific workflows or app routes.                                     |
| `@hypha/fsm`            | FSM process spec, `FSMRuntime`, guarded transitions, validated snapshots, anomaly classification, bounded retry/circuit/compensation/quarantine semantics.       | Tool handlers, model calls, storage adapters.                                  |
| `@hypha/kernel`         | ReAct agent spec, context/reasoning builder interfaces, verifier interfaces, executable ReAct runners.                                                           | Concrete model providers, direct tool side effects.                            |
| `@hypha/inference`      | Prompt compilation, prefix segmentation, Plasmod hot layer, backend registry, prefix/KV cache, reasoning orchestration.                                          | Provider-specific request types in public kernel contracts.                    |
| `@hypha/models`         | `ModelProvider` abstraction, model aliases/routing, normalized usage/errors/stream events, OpenAI-compatible provider adapters.                                  | Agent loop, workflow semantics, or app-specific model preferences.             |
| `@hypha/serving-cache`  | Exact LLM response cache middleware, deterministic request keys, prompt prefix metadata, stores, and cache trace events.                                         | Semantic cache, WorkCache graph scheduling, or agent loop changes.             |
| `@hypha/workcache`      | Event-derived typed runtime cache blocks, WorkGraph scheduling view, hot-indexed typed cache forest, memory/SQLite stores, and audit events.                     | Source-of-truth events, provider response cache, MessageTree, or KVPrefixTree. |
| `@hypha/tools`          | Tool specs, registry, safe recursive schema validation, governed runner, common JSON/text/hash utilities, side-effect policy and trace events.                   | Direct execution bypassing policy.                                             |
| `@hypha/mcp`            | MCP profile specs, gateway contracts, mock gateway, and capability normalization/registration into governed tool contracts.                                      | Provider SDK lifecycle as framework core.                                      |
| `@hypha/memory`         | Versioned profiles, scoped managed records, atomic persistence/outbox, deterministic retrieval/context, external adapters, recovery, replay, and cache bindings. | App session storage rules or direct ungoverned provider writes.                |
| `@hypha/skills`         | Skill specs, refs, local markdown loader, selector, context loader, policy, instruction/assets metadata.                                                         | Workflow replacement logic or direct tool execution.                           |
| `@hypha/harness`        | Event-first runtime projections, ReAct/FSM runner, cross-module recovery supervisor, bounded message bus, replay/audit/regression.                               | FSM internals or app-specific state.                                           |
| `@hypha/adapters-local` | Local SQLite/JSON/file/vector adapters for development and self-hosting.                                                                                         | Framework spec definitions.                                                    |
| `@hypha/testing`        | Deterministic evaluation, replay fixtures, trace diffs, and regression runners for event/spec/runtime contracts.                                                 | Production runtime behavior or live model/tool execution.                      |

## Harness, Runtime, and FSM

`harness` is the architectural model: agent behavior is placed inside a governed, observable, replayable system. The `@hypha/harness` package contains reusable runtime support and event-derived projections, but it should not absorb every runtime concern.

`runtime` is the execution layer. It creates sessions and runs, appends events, records side effects, and projects state from events. The server surface currently adapts HTTP requests into this runtime through `apps/server/src/services/EventRuntime.ts`.

`fsm` remains a separate package because FSM is a reusable process language. Domain workflows compile into `FSMProcessSpec`, and the ReAct runtime uses FSM transitions without coupling domain declarations to HTTP, storage, or provider adapters. Recovery is also expressed as FSM state: `Recovering`, `Compensating`, and `Quarantined` are visible scheduling and evidence boundaries rather than a hidden exception loop.

`RunManager` and `HarnessedReActFSMRunner` live in `@hypha/harness` because they coordinate event recording, run lifecycle, ReAct execution, and FSM callbacks. They do not define FSM semantics; they consume `FSMRuntime` and record the resulting state and transition facts as events.

`runFSMRecoveryLoop()` coordinates one bounded operation. `runRecoverySupervisor()` coordinates a
dependency-ordered set of module participants through the same FSM. It retains completed upstream
outputs, fingerprints failures, compares evidence hashes, limits cycles/no-progress/repeated
strategies/elapsed time, and selects only declared retry, reconciliation, fallback, degradation,
compensation, or escalation handlers. Delayed work suspends unless a scheduler and inline delay
budget are explicitly supplied. See [FSM Anomaly Recovery](../architecture/fsm-recovery.md).

`InMemoryMessageBus` is the package-level transport contract for future
multi-workflow and multi-agent surfaces. Messages are scoped by
`userId + sessionId + runId`, can carry `fsmState`, `stepId`, and `agentId`,
and emit `message.enqueued`, `message.delivered`, `message.retrying`,
`message.acknowledged`, `message.failed`, or `message.dead_lettered` through a `TraceRecorder`.
Retries use bounded exponential delay and exhausted, expired, or poison messages are dead-lettered
without blocking the recipient queue. The bus
does not advance FSM state by itself; consumers bind message handling to FSM
guards and transitions.

`@hypha/domain` owns the declaration-to-runtime binding step. `LocalDomainPackLoader`
loads predefined packs, `DomainPackRegistry` stores validated versions,
`extendDomainPack()` applies user or deployment overlays, and
`compileDomainPackToHarnessedSystem()` resolves task, workflow, profile, tool,
skill, business rule, policy, and evaluation refs into an `FSMProcessSpec`,
`HarnessedAgentSystemSpec`, and agent-facing patch.

## Dependency Direction

Application surfaces may depend on packages. Packages must not depend on `apps/*`.

Allowed examples:

```text
apps/server -> @hypha/domain -> @hypha/fsm -> @hypha/core
apps/server -> @hypha/kernel -> @hypha/inference -> @hypha/models
apps/server -> @hypha/serving-cache -> @hypha/models
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

## Serving Cache

`@hypha/serving-cache` wraps `ModelProvider.generate()` when
`HYPHA_SERVING_CACHE=memory` or `sqlite`. It computes an exact request key from
provider, model, system/prefix content, messages, tools, generation params, and
scope metadata. Fresh hits return the cached `ModelResponse`; misses call the
inner provider and may write the response. Streaming requests bypass cache in
the first version.

The layer records prompt prefix metadata and emits `llm.cache.lookup`,
`llm.cache.hit`, `llm.cache.miss`, `llm.cache.write`, and `llm.cache.bypass`
events through the runtime trace bridge. It is not a semantic cache, WorkCache,
or provider KV cache.

## Extension Boundaries

Add new behavior by defining or extending a spec first, then implementing an adapter or runtime component behind that spec. Public extensions should expose TypeScript types, Zod validation, JSON schema export, examples, and tests.

Presentation clients such as CLI, web, or API server routes are surfaces. They may call runtime APIs, but they do not define framework core types or runtime semantics.
