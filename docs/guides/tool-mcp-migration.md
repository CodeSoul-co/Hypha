# Tool and MCP Migration Guide

1. Convert each legacy handler definition to a stable `ToolSpec` with explicit ID, version, input
   and output schemas, side-effect level, permission scopes, timeout, retry, approval, and audit.
2. Wrap provider execution in the matching `ToolAdapter`. Keep SDK and transport types inside that
   adapter or MCP gateway.
3. Replace direct `handler.execute`, `ToolManager.executeTool`, and public MCP `callTool` calls with
   `GovernedToolRunner.run` or a Runtime Tool Activity command.
4. Inject persistent Invocation and Approval stores, Event/Trace recorder, Artifact port, contract
   snapshot store, Observation port, cache, receipt reconciler, and telemetry as required.
5. For MCP, register a connection profile, discover into `MCPCapabilityCatalog`, approve trust and
   drift, import stable Tool IDs, and create a Run snapshot before execution.
6. Preserve legacy flat Tool fields only during transition. New integrations should use the
   structured governed contract exports and their Zod/JSON Schema definitions.
7. Validate restart recovery, approval resume, same-key conflict, cancellation, provider timeout,
   output validation, large artifacts, schema drift, and replay before removing the old path.

Server API consumers can query `/api/v1/tools/:id`, `/api/v1/tool-invocations/:id`, cancel an
Invocation, decide approvals, and inspect `/api/v1/mcp/servers`, `/capabilities`, and `/drifts`.
