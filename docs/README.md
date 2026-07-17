# hypha Documentation

This directory contains public documentation for using hypha APIs, specs, runtime conventions, and extension points. It intentionally describes stable contracts rather than internal planning notes.

## Start Here

- [Architecture Reference](reference/architecture.md): package responsibilities, harness semantics, runtime boundaries, and extension rules.
- [Runtime Model](reference/runtime-model.md): DomainPack, Session, Run, Event, FSM, replay, audit, regression, and concurrency conventions.
- [FSM Anomaly Recovery](architecture/fsm-recovery.md): cross-module supervision, evidence-based convergence, bounded recovery states, cache knowledge, and module failure matrix.
- [Storage Reference](reference/storage.md): document, messaging, relational, vector, and artifact storage conventions plus memory extension points.
- [Local Data Layout](reference/local-data-layout.md): ignored `data/` tree for local runtime records, indexes, artifacts, and logs.
- [Framework API](api/framework.md): TypeScript package contracts and field-level spec references.
- [HTTP API](api/http.md): REST endpoints, authentication, request bodies, response shapes, and SSE behavior.
- [Architecture Notes](architecture/README.md): subsystem-level architecture notes.
- [Serving Cache](architecture/serving-cache.md): exact LLM response cache middleware, key fields, policies, stores, and trace events.
- [Tool/MCP Architecture](architecture/tool-mcp.md): governed execution, Invocation lifecycle, MCP trust, drift, and Run snapshots.
- [Execution Contracts](architecture/execution.md): provider-neutral Workspace, Sandbox, Command, Store, Event, and cache-fingerprint boundaries.
- [ADRs](adr/README.md): accepted architecture decisions.
- [RFCs](rfc/README.md): proposed designs and extension plans.

## Guides

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
