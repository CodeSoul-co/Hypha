# hypha Documentation

This directory contains public documentation for using hypha APIs, specs, runtime conventions, and extension points. It intentionally describes stable contracts rather than internal planning notes.

The published v1.0.1 user guide, feature map, complete generated API reference, FSM walkthrough, and
full-system example are available at
[codesoul-co.github.io/Hypha](https://codesoul-co.github.io/Hypha/). The project website is
[hypha.code-soul.com](https://hypha.code-soul.com/).

## Start Here

- [Feature Map](https://codesoul-co.github.io/Hypha/guide/capability-map): end-to-end execution stages mapped to packages, modules, principal classes/functions, and isolated examples.
- [Complete API Reference](https://codesoul-co.github.io/Hypha/api/): every public package export grouped by source module, including signatures and public class/interface members.
- [Runnable Examples](https://codesoul-co.github.io/Hypha/guide/examples): seven isolated feature entries, a 15-package tour, DomainPack compilation, Server Run submission, and custom FSM control.
- [Architecture Reference](reference/architecture.md): package responsibilities, harness semantics, runtime boundaries, and extension rules.
- [Runtime Model](reference/runtime-model.md): DomainPack, Session, Run, Event, durable orchestration, FSM, replay, audit, regression, and concurrency conventions.
- [FSM Anomaly Recovery](architecture/fsm-recovery.md): cross-module supervision, evidence-based convergence, bounded recovery states, cache knowledge, and module failure matrix.
- [Custom FSM Topologies](guides/custom-fsm.md): application-defined graphs, topology analysis, custom Runs, and governed owner transitions.
- [Storage Reference](reference/storage.md): document, messaging, relational, vector, and artifact storage conventions plus memory extension points.
- [Local Data Layout](reference/local-data-layout.md): ignored `data/` tree for local runtime records, indexes, artifacts, and logs.
- [Framework API](api/framework.md): TypeScript package contracts and field-level spec references.
- [HTTP API](api/http.md): REST endpoints, authentication, request bodies, response shapes, and SSE behavior.
- [Architecture Notes](architecture/README.md): subsystem-level architecture notes.
- [Serving Cache](architecture/serving-cache.md): exact LLM response cache middleware, key fields, policies, stores, and trace events.
- [WorkCache](architecture/workcache.md): event-derived typed runtime cache, recovery knowledge, tree alignments, policies, stores, and audit events.
- [Tool/MCP Architecture](architecture/tool-mcp.md): governed execution, Invocation lifecycle, MCP trust, drift, and Run snapshots.
- [Execution Contracts](architecture/execution.md): provider-neutral Workspace, Sandbox, Command, Store, Event, and cache-fingerprint boundaries.
- [Governed Memory](architecture/memory.md): scoped records, atomic persistence and index outbox, deterministic retrieval, bounded context, external adapters, and replay/cache bindings.
- [Memory Provider Profiles](guides/memory-provider-profiles.md): select native Redis + MongoDB, self-hosted Mem0, or managed Mem0/Vertex profiles and inspect the disabled Hindsight candidate without embedding credentials.
- [Managed Memory Migration](guides/memory-managed-migration.md): move legacy memory consumers to the policy, harness, event, timeout, and recovery boundary.
- [External Memory Provider Runtime](guides/memory-external-provider-runtime.md): stable provider ID mapping, restart-safe persistence, cancellation, and deployment boundaries.
- [Execution Threat Model](architecture/execution-threat-model.md): trust boundaries, audited runtime surfaces, required controls, and residual limitations.
- [Execution Provider Matrix](reference/execution-provider-capability-matrix.md): provider guarantees and fail-closed capability negotiation.
- [ADRs](adr/README.md): accepted architecture decisions.

## Guides

- [Development Workflow](guides/development-workflow.md): direct `dev` maintenance, release gates,
  and the `dev` → `main` publication path.
- [Releases and npm Packages](guides/releases.md): version alignment, package verification,
  publication boundaries, and the standalone consumer example.
- [Upgrading Hypha](../UPGRADING.md): npm and source-release update, configuration migration,
  staging, backup, and rollback procedure.
- [Domain Packs](guides/domain-packs.md): how to declare workflows, task schemas, tools, MCP profiles, memory profiles, policies, evaluations, regressions, and output contracts.
- [Local Development](guides/local-development.md): setup, environment, commands, storage adapters, and verification checks.
- [Tool/MCP Security](guides/tool-mcp-security.md): trust boundaries, secrets, side effects, approval, and recovery.
- [Tool Adapter Guide](guides/tool-adapters.md): implement and register Local, HTTP, Plugin, Mock, and MCP adapters.
- [Common Utility Tools](guides/common-utility-tools.md): governed JSON, text, and SHA-256 tools with limits and examples.
- [Tool/MCP Migration](guides/tool-mcp-migration.md): move legacy handlers and MCP calls to the governed runtime.
- [Governance Examples](examples/tool-mcp-governance.md): local Tool execution and MCP catalog/snapshot examples.
- [Capability Matrix](reference/tool-mcp-capability-matrix.md): public surfaces and runtime guarantees.
- [Known Limitations](reference/tool-mcp-known-limitations.md): deliberate constraints and operational caveats.

## Documentation Rules

Public docs should describe API behavior, fields, runtime conventions, package boundaries, and examples that remain valid for users of the framework. Local planning notes belong outside tracked docs.
