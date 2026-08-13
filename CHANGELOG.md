# Changelog

Hypha follows Semantic Versioning for public `@hypha/*` packages and the versioned HTTP API.

## Unreleased

### Added

- Publish-ready `@hypha/*` package manifests with explicit runtime dependencies, exports, Node.js
  compatibility, and npm tarball validation.
- External user configuration overlays through `HYPHA_CONFIG_PATH`, plus independent Agent, Tool,
  Workflow, Prompt template, and Prompt registry paths.
- OpenAPI 3.1 route inventory at `/api/v1/openapi.json` and `/api/v1/docs/openapi.json`, generated
  from the mounted Express route registry.
- A standalone release consumer under `examples/release-agent`.
- Application-defined FSM Runs from validated `FSMProcessSpec` or compiled DomainPack workflows.
- `analyzeFSMTopology()` for reachable, unreachable, dead-end, and cyclic State inspection.
- Governed owner FSM inspection and manual transition APIs with process identity, optimistic Run
  revision, guards, Policy, idempotency, Run Lease, fencing, terminal Events, and replay evidence.

### Changed

- `WorkflowEngine` now honors the configured `workflows.configPath` and `autoReload` values.

### Compatibility

- Existing deployments that edit `config.yaml` continue to work. Move local differences into a
  user-owned overlay before the next source update to avoid merge conflicts.
- The legacy `/api/v1/docs` HTML and `/api/v1/docs/json` endpoints remain available. New clients
  should discover routes through OpenAPI.

## 1.0.0 release baseline

- Initial versioned Agent Core, Production Harness, DomainPack, governed capability, Memory,
  Storage, Cache, testing, Express Server, and example CLI contracts.
