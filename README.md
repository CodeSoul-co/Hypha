<p align="center">
  <img src="docs/hypha_logo.png" alt="hypha logo" width="180" />
</p>

<p align="center">
  <strong>Harness-oriented agent system framework for production-grade LLM agent applications.</strong>
</p>

<p align="center">
  English | <a href="README.zh-CN.md">中文</a>
</p>

## Overview

hypha is a TypeScript framework for building LLM agent systems that can be run, traced, replayed, governed, evaluated, and extended through stable APIs.

The framework separates reusable agent-system contracts from presentation surfaces. The API server, CLI, and web clients are clients of the same framework model; they do not define the core runtime behavior.

## Core Model

hypha uses a ReAct + FSM execution model. ReAct describes the agent loop of observing, reasoning, acting, observing results, and verifying. FSM makes that loop explicit as states, guarded transitions, retries, trace events, and terminal outcomes.

The runtime model is event-first:

- `DomainPack` declares domain-level definitions such as task schemas, workflows, tools, MCP profiles, memory profiles, skill policy, permissions, evaluation rules, and output contracts.
- `Session` is the runtime user or business context container. It can reference a DomainPack and initialize metadata from a SessionProfile.
- `Run` is one concrete execution under a Session.
- `Event` is the smallest source-of-truth fact record. Trace, replay, audit, regression, and state projection are derived from events.

The package runtime includes `FSMRuntime`, `ReActAgentRunner`, `RunManager`, and `HarnessedReActFSMRunner` for executing a minimal governed agent path with trace events for every FSM state. Anomaly recovery is also FSM-native: bounded retry and circuit wait enter `Recovering`, committed effects enter `Compensating`, and uncertain effects enter `Quarantined`.

## API Documentation

Public API documentation is maintained as field-level references:

- [Documentation Index](docs/README.md): entry point for architecture, package boundaries, guides, and API references.
- [HTTP API](docs/api/http.md): REST endpoints, authentication, request bodies, response shapes, and runtime conventions.
- [Framework API](docs/api/framework.md): TypeScript package contracts for DomainPack, Session, Run, Event, execution, inference, memory, tools, MCP, skills, and model providers.
- [Execution Contracts](docs/architecture/execution.md): provider-neutral Workspace, Sandbox, Command, Store, Event, and cache-fingerprint boundaries.
- [Architecture](docs/reference/architecture.md): package responsibilities, harness semantics, runtime model, and extension boundaries.
- [Storage](docs/reference/storage.md): document, messaging, relational, vector, and artifact storage conventions for local, self-hosted, managed, and cloud deployments.
- [Domain Packs](docs/guides/domain-packs.md): field contracts and examples for declaring workflows, tools, memory, skills, policy, and output contracts.

When the server is running, the interactive route index is also available at `/api/v1/docs`.

## Runtime Mode

hypha defaults to a single-user runtime for local and self-hosted deployments. The configured owner account is seeded from `auth.singleUser`, and public registration is disabled unless multi-user mode is explicitly enabled.

Internal APIs keep `userId` boundaries for sessions, memory, token usage, API keys, and session queues. This keeps default deployment simple while preserving the concurrency model required by multi-user clients.

## Governed Runtime

`@hypha/core` provides the event-first orchestration contracts and local reference implementations
needed to run FSM work without hidden loops. The runtime includes versioned event schemas and
upcasters, optimistic event-stream append, projections, scoped session commands, message
inbox/outbox delivery, run leases and state claims with fencing, shared/exclusive resource claims,
deterministic helpers, timers, pause/resume/signal controls, cancellation, checkpoints, recovery,
replay, and query services. `@hypha/harness` adds a bounded FSM driver and execution context while
keeping DomainPack workflows, provider adapters, and application state outside the runtime core.

Every command and durable operation remains scoped by user, session, and run identity. Revision,
lease, claim, event, and checkpoint evidence prevents stale workers or repeated loop iterations from
being treated as progress. See the [Runtime Model](docs/reference/runtime-model.md) and
[Framework API](docs/api/framework.md).

## Coordinated Recovery

Hypha coordinates inference, tools, MCP, memory, execution, storage, message delivery, policy, and
cache failures through the same FSM-governed recovery contract. Participants run in dependency
order, completed upstream work is not repeated, and progress is proven by stable receipts,
revisions, hashes, or provider state rather than by another loop iteration. Bounded retry,
reconciliation, compatible fallback, degradation, compensation, human review, quarantine,
cancellation, and failure are explicit strategies with trace events.

Unknown write outcomes are reconciled before replay. Optional caches may be bypassed without
changing the source result, and WorkCache can retain only revision-matched, revalidated recovery
knowledge as an acceleration hint. The event log and FSM snapshot remain the sources of truth. See
[FSM anomaly recovery](docs/architecture/fsm-recovery.md).

## Inference Runtime

Agent inference is exposed through `@hypha/inference`: prompt compilation, prefix segmentation, Plasmod cache coordination, backend routing, and normalized responses. SGLang is the default physical backend, with vLLM, llama.cpp, and OpenAI API adapters available through the same backend registry.

Configure the default backend and endpoints in `config.yaml` or `.env`, for example `HYPHA_INFERENCE_DEFAULT_BACKEND=sglang` and `SGLANG_BASE_URL=http://localhost:30000`.

## Serving Cache

Hypha Serving Cache is a lightweight middleware for LLM provider calls. It provides exact request-level caching, deterministic cache keys, pluggable stores, cache policies, prompt prefix metadata, and trace events without changing the agent runtime or Domain Pack interfaces.

The exact cache key is derived from the resolved provider, model, system or prefix content, messages, tools/function schemas, generation params, and optional scope fields such as `userId`, `sessionId`, `projectId`, and `domainPackId`. Request ids, timestamps, and undefined values are excluded before hashing.

Enable it with `HYPHA_SERVING_CACHE=memory` or `HYPHA_SERVING_CACHE=sqlite`; the default `off` mode keeps provider calls on the original path. `HYPHA_SERVING_CACHE_MODE` supports `off`, `read`, `write`, and `readwrite`, and `HYPHA_SERVING_CACHE_TTL_MS` controls expiry. SQLite entries use `HYPHA_SERVING_CACHE_SQLITE_PATH`.

Runtime traces may include `llm.cache.lookup`, `llm.cache.hit`, `llm.cache.miss`, `llm.cache.write`, and `llm.cache.bypass`. Streaming requests bypass the cache in this version. This layer does not implement semantic caching, cache trees, WorkCache scheduling, provider KV cache management, or CPU/GPU cache migration.

For provider-side prefix cache, Hypha keeps request shape stable by canonicalizing tool schemas and tracking stable prefix hashes per provider/model/scope. Provider usage fields include `cacheHitTokens` and `cacheMissTokens` when the upstream API reports cached or missed prompt tokens. These metrics describe provider prefix-cache reuse; they are separate from Hypha's local exact response cache.

## WorkCache

`@hypha/workcache` is an event-derived typed runtime cache for reusable agent artifacts. It consumes existing Hypha events, maps them to `PlanTree`, `ComputationTree`, `ToolTree`, `ObservationTree`, `VerificationTree`, `MemoryTree`, `RecoveryTree`, or `PromptPrefixTree`, and stores `CacheBlock` records without changing DomainPack, Session, Run, or Event semantics.

The bundled server configuration uses `HYPHA_WORKCACHE=memory`. Set `HYPHA_WORKCACHE=off` to disable it, or `HYPHA_WORKCACHE=sqlite` with `HYPHA_WORKCACHE_SQLITE_PATH` for persistent blocks. `HYPHA_WORKCACHE_PROMPT_BUDGET_TOKENS` controls prompt prefix materialization budget.

WorkCache is separate from Serving Cache. Serving Cache reuses exact LLM API responses; WorkCache organizes event-derived runtime artifacts. Tool blocks require read-only side effects, stable args, permission scope, and validity metadata. Verification blocks require strict source, test, and environment hashes. Recovery blocks are revision-matched, expiring strategy hints and never replace FSM, event, or receipt evidence.

## Governed Tools and MCP

Local, HTTP, Plugin, Mock, and MCP capabilities share `ToolAdapter`, `ToolRegistry`, and the
single `GovernedToolRunner` execution path. Each call is a persistent Invocation with schema,
permission, policy, approval, idempotency, retry, timeout, cancellation, artifact, event,
observation, cache-validity, and recovery semantics. Dynamic MCP capabilities are separated into
connection, catalog, trust, drift, schema-cache, and immutable Run snapshot records.

See the [Tool/MCP architecture](docs/architecture/tool-mcp.md),
[security guide](docs/guides/tool-mcp-security.md), and
[adapter guide](docs/guides/tool-adapters.md).

The server includes governed, side-effect-free `utility.json`, `utility.text`, and `utility.hash`
tools for bounded JSON operations, literal text transformations, and SHA-256 fingerprints. See the
[common utility guide](docs/guides/common-utility-tools.md) and
[FSM recovery architecture](docs/architecture/fsm-recovery.md).

## Governed Execution Contracts

`@hypha/core` exposes provider-neutral contracts for managed Workspaces, sandbox environments,
command execution, revisioned records and leases, lifecycle events, and deterministic cache
fingerprints. The contracts keep filesystem, process, container, remote-provider, storage, artifact,
policy, and secret implementations behind adapter and harness boundaries. Paths, identities,
transitions, terminal evidence, sensitive event fields, idempotency, and stale-writer fencing are
validated before adapters perform side effects.

The Artifact lifecycle is content-addressed and append-only. `DefaultArtifactManager` and its
eventing wrapper govern create, read, list, version navigation, lineage, retention, garbage
collection, and download access through principal-scoped policy checks. In-memory, local-file, and
SQLite-backed reference components are available; concrete cloud providers remain adapter
extensions and are not implied by the core contract.

See the [Execution architecture](docs/architecture/execution.md) for the contract layers and
extension rules.

## Governed Memory and Context

`@hypha/memory` provides versioned Memory profiles, principal/user/workspace scope enforcement,
optimistic record revisions, scoped idempotency, structured history, atomic record-plus-index-outbox
persistence, deterministic retrieval explanations, lifecycle workers, and bounded context assembly.
The native provider keeps structured records as the source of truth while vector indexing runs as a
leased, retry-bounded outbox job. Hard delete removes current and historical versions; external
provider adapters must preserve scope metadata and reconcile uncertain writes before replay.

Memory, Context, Domain, Cache, Replay, and Evaluation share versioned dependency and validity
snapshots. Context builders apply policy, provenance, token budgets, deterministic compaction, and
instruction/data boundaries before model injection. See the
[Governed Memory architecture](docs/architecture/memory.md).

## Development Commands

```bash
npm install
npm run dev
npm run build
npm run typecheck
npm test
npm run lint
npm run cli -- --help
```

- `npm run dev` starts the Express API server with dotenv.
- `npm run build` compiles framework packages, the API server, and the CLI.
- `npm test` runs unit, package, and integration test suites.
- `npm run cli -- --help` shows the CLI client commands.

## License

MIT
