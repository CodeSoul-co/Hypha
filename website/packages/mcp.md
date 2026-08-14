# `@codesoul-co/hypha-mcp`

`hypha-mcp` governs Model Context Protocol servers, capability discovery, OAuth/connection lifecycle and Tool normalization. An MCP server becomes usable only after trusted composition allows it and maps its capabilities into the same governed Tool path as local Tools.

```bash
npm install @codesoul-co/hypha-mcp@1.0.1
```

## Main exports

| Export | Use |
| --- | --- |
| `MCPIntegrationSpec` / `mcpIntegrationSpecDefinition` | Declare allowed servers and capabilities |
| `MCPConnectionManager` | Manage connection lifecycle and health |
| `MCPCapabilityCatalog` | Discover and snapshot Tool/resource/prompt capabilities |
| `MCPGateway` | Provider-neutral call/read interface |
| `GovernedMCPGateway` | Apply policy and trace around MCP operations |
| `MCPToolRegistryBridge` | Normalize discovered MCP Tools into `ToolRegistry` |
| OAuth contracts | Authorize remote servers without exposing tokens to Agents |

## Declare allowed servers

```ts
import {
  mcpIntegrationSpecDefinition,
} from '@codesoul-co/hypha-mcp';

const integration = mcpIntegrationSpecDefinition.parse({
  id: 'mcp.docs',
  version: '1.0.0',
  servers: [
    {
      id: 'docs',
      mode: 'local',
      command: 'docs-mcp',
      args: ['./docs'],
    },
  ],
  allowedCapabilities: ['search'],
});
```

The spec is permission/configuration input; it does not launch the process. The server command, endpoint, environment and credentials must be resolved by trusted server composition.

## Runtime flow

```text
Domain Pack MCP allow-list
  → connection policy + transport
  → initialize and discover capabilities
  → immutable capability snapshot
  → bridge approved Tools into ToolRegistry
  → governed Tool execution
  → receipt + Event/trace
```

Resources and prompts should pass through equivalent scope, size and trust checks. Treat server descriptions and returned content as untrusted input.

## Local and remote servers

- Local processes need an executable allow-list, sanitized arguments/environment, lifecycle limits and cleanup.
- Remote endpoints need HTTPS policy, redirect/host validation, authentication and bounded response handling.
- OAuth tokens stay in a credential store; the Agent receives only the authorized capability.
- Reconnect logic must not duplicate an uncertain Tool effect.

## Capability snapshots

Record the server identity, protocol/version and capability contract used by a Run. If a server changes its schema, refresh and reauthorize it rather than silently applying a mutable contract to replayed work.

## Tests

Exercise real local transports in release acceptance, assert zero skipped cases, and cover initialization failure, timeout, cancellation, malicious endpoints, capability drift and cleanup. Use mock gateways only for deterministic unit tests.

See [`hypha-tools`](./tools) for governed invocation and [`hypha-domain`](./domain) for per-workflow capability allow-lists.

