# Stage 1 Runtime Initialization

Stage 1 turns the Stage 0 contracts into the first usable runtime backbone while keeping app surfaces separate from framework packages.

## DomainPack, Session, Run, Event

`DomainPackSpec` is a domain-level definition package. It declares task structure, `WorkflowSpec`, tool and MCP profiles, memory profiles, skill policy, permissions, evaluation, output contracts, and optional `SessionProfileSpec` defaults.

Session is not a DomainPack component. Session is the runtime user or business context container. A Session can reference a DomainPack and initialize metadata from a DomainPack-declared SessionProfile.

Run is one concrete execution instance under a Session. Event is the smallest fact emitted inside a Run.

```text
DomainPackSpec
  -> SessionProfileSpec defaults

RuntimeSession
  -> references DomainPackSpec
  -> owns RuntimeRun[]

RuntimeRun
  -> emits FrameworkEvent[]

Projections
  -> session view
  -> run view
  -> replay fixture
  -> audit report
  -> regression state
```

## Event-First Runtime

`@hypha/harness` now includes `EventFirstRuntime`. It creates sessions, creates runs, appends run events, and derives session, run, replay, audit, and regression projections from events. Session and Run records are product views; Event remains the source of truth.

## Inference

`@hypha/inference` now includes:

- `InferenceCacheManager` for prefix hash management and KV cache TTL handling.
- `InferenceManager` for provider routing and cache hit metadata.
- `ReasoningOrchestrator` with `direct`, `cot`, `tot`, and `self_consistency` methods.

Reasoning methods stay provider-neutral and attach strategy metadata to inference requests. They do not couple the agent kernel to any provider SDK.

## Model Providers

`@hypha/models` now includes:

- `MockModelProvider` for deterministic contract tests.
- `OpenAIModelProvider`.
- `OpenAICompatibleModelProvider`.
- `createDeepSeekProvider` as an OpenAI-compatible profile.

Provider responses normalize into `ModelResponse`; raw provider payloads remain available only for trace/debug.

## Memory

`@hypha/memory` now includes `HybridMemoryProvider`: structured storage is the source of truth, vector indexes provide semantic recall, and artifacts remain a separate storage concern.

## Validation

Stage 1 initialization is covered by package contract tests:

```bash
npm run typecheck
npm run build
npm run test:packages
```

Before merging application behavior changes, also run:

```bash
npm test
npm run lint
```
