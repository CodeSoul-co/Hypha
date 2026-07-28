# ADR 0002: Governed Tool and MCP Execution

## Status

Accepted

## Context

Hypha currently has a governed Tool runtime in `packages/tools`, MCP normalization in
`packages/mcp`, and a legacy server-side `ToolManager`. The server manager can invoke local and
MCP handlers directly, which creates a second execution path without the same principal,
permission, policy, approval, invocation, and recovery semantics.

Remote MCP descriptors are dynamic. Their names, schemas, annotations, protocol versions, and
server identity can change independently of a running Agent. Treating a remote read hint as a
trusted side-effect declaration or replacing a schema during a Run would bypass governance.

## Decision

1. `GovernedToolRunner` is the only public execution path for local, HTTP, plugin, and MCP Tools.
2. `ToolRegistry` and `ToolResolver` own stable ID, version, revision, adapter, health, and Run
   contract resolution. Server routes issue Tool service commands and never invoke handlers.
3. MCP SDK clients remain behind transport and gateway adapters. Agents and Domain Packs only see
   stable Tool contracts.
4. MCP connection state, capability catalog state, trust state, schema cache state, and Run
   contract snapshots are separate records with explicit revisions.
5. Server trust, capability trust, permission scopes, side-effect policy, and approval are separate
   decisions. A server-provided safety hint is untrusted unless policy explicitly permits it.
6. Existing flat Tool fields remain accepted through a compatibility normalizer while structured
   schema, semantics, execution, governance, observability, and cache contracts are introduced.
7. Generic media and external-source contracts may live in the Tool module. Concrete provider,
   credential, persistence, and business workflow behavior stays behind adapters or Domain Packs.

## Consequences

- Existing callers can migrate incrementally, but every registration is normalized to one
  immutable governed contract before execution.
- The legacy server `ToolManager.executeTool` path must delegate to the governed Tool service.
- Real stdio and Streamable HTTP transports require lifecycle, cancellation, reconnect, and child
  process cleanup tests.
- Capability drift creates a new catalog revision; it cannot replace a Run snapshot in place.
- Replay resolves the original invocation result and contract snapshot without rediscovery or
  re-executing side effects.
