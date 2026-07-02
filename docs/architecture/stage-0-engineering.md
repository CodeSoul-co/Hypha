# Stage 0 Engineering Backbone

hypha now uses a workspace-oriented repository layout that separates framework packages from application surfaces.

## Workspace Layout

```text
packages/
  core/            shared specs, event contracts, errors, ids
  inference/       agent-internal inference abstraction, prefix refs, KV cache refs
  fsm/             FSM process/state/transition contracts
  kernel/          ReAct agent contracts
  harness/         run and trace contracts
  models/          provider contracts
  memory/          memory provider contracts
  tools/           tool governance contracts
  mcp/             MCP normalization contracts
  skills/          skill contracts
  domain/          DomainPack and WorkflowSpec contracts
  adapters-local/  local adapter profiles
  testing/         golden trace and regression helpers

apps/
  server/          current Express API service
  cli/             example CLI API client
```

## Stage 0 Boundary

The current API service remains in `apps/server/src` so existing routes, tests, and deployment behavior stay functional while framework contracts are extracted into `packages/*`. New framework capabilities should start in packages as specs or interfaces before concrete app integration.

The CLI is in `apps/cli` and must remain a surface over the API. It should not define framework core types or runtime behavior.

## Implemented Contract Backbone

Stage 0 defines the public contracts needed before concrete providers and UI surfaces expand:

- `@hypha/core`: versioned specs, policy decisions, structured events, trace/event store, ids, and structured errors.
- `@hypha/fsm`: FSM process specs, state/transition validation, snapshots, and explicit transition application.
- `@hypha/kernel`: ReAct agent specs, phase order, action/observation contracts, and inference-facing runtime interfaces.
- `@hypha/domain`: DomainPack, TaskSchema, WorkflowSpec, and `compileWorkflowToFSM`.
- `@hypha/harness`: run records, event-first trace recording, session projection, replay/regression fixtures, and user-scoped session queues.
- `@hypha/models`: provider-neutral model request/response contracts and a mock provider.
- `@hypha/memory`: structured store, vector index, artifact store, embedding, and unified MemoryProvider interfaces.
- `@hypha/tools`: ToolSpec, registry, governed runner, policy check, and trace recording.
- `@hypha/mcp`: MCP integration specs, mock gateway, capability filtering, and ToolSpec normalization.
- `@hypha/skills`: SkillSpec, agent-bound skill refs, activation policies, and progressive disclosure resolver.
- `@hypha/inference`: inference manager plus prefix cache and KV cache provider contracts.
- `@hypha/adapters-local`: in-memory local reference adapters for structured records, vectors, and artifacts.
- `@hypha/testing`: golden trace and state-path helpers.

## Inference Module

`packages/inference` is reserved for agent-internal inference orchestration. It currently defines provider, request, response, prefix cache, and KV cache references so future work can add prefix reuse, KV cache management, cache policy, and inference trace events without coupling those concerns to model provider adapters or app routes.

## Runtime Mode

hypha defaults to single-user operation for local and self-hosted deployments. Runtime records, API boundaries, memory, token usage, and session queues must still remain user-scoped so the same code paths can support future multi-user clients without changing storage or concurrency semantics.

## Commands

```bash
npm run typecheck
npm run build
npm run test:packages
npm run test:unit
npm run test:integration
npm run lint
```

`npm run test:packages` uses Vitest for package-level contracts. Existing API tests continue to use Jest.

## Stage 0 Done Criteria

Stage 0 is considered complete when package contracts compile, package contract tests pass, existing API behavior still passes Jest, and app surfaces remain outside framework packages. Future implementation work should add concrete providers by extending these contracts rather than changing app code first.
