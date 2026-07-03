# hypha Documentation

This directory contains public documentation for using hypha APIs, specs, runtime conventions, and extension points. It intentionally describes stable contracts rather than internal planning notes.

## Start Here

- [Architecture Reference](reference/architecture.md): package responsibilities, harness semantics, runtime boundaries, and extension rules.
- [Runtime Model](reference/runtime-model.md): DomainPack, Session, Run, Event, FSM, replay, audit, regression, and concurrency conventions.
- [Storage Reference](reference/storage.md): document, messaging, relational, vector, and artifact storage conventions plus memory extension points.
- [Local Data Layout](reference/local-data-layout.md): ignored `data/` tree for local runtime records, indexes, artifacts, and logs.
- [Framework API](api/framework.md): TypeScript package contracts and field-level spec references.
- [HTTP API](api/http.md): REST endpoints, authentication, request bodies, response shapes, and SSE behavior.
- [Architecture Notes](architecture/README.md): subsystem-level architecture notes.
- [ADRs](adr/README.md): accepted architecture decisions.
- [RFCs](rfc/README.md): proposed designs and extension plans.

## Guides

- [Domain Packs](guides/domain-packs.md): how to declare workflows, task schemas, tools, MCP profiles, memory profiles, policies, evaluations, regressions, and output contracts.
- [Local Development](guides/local-development.md): setup, environment, commands, storage adapters, and verification checks.

## Documentation Rules

Public docs should describe API behavior, fields, runtime conventions, package boundaries, and examples that remain valid for users of the framework. Local planning notes belong outside tracked docs.
