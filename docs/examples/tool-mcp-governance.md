# Governed Tool and MCP Examples

## Local Tool Governance

Register a structured Tool contract once and execute it through the shared runner:

```ts
const registry = new ToolRegistry();
registry.register(
  {
    id: 'tool.workspace.read-report',
    version: '1.0.0',
    revision: 'sha256:contract-v1',
    description: 'Read an approved workspace report.',
    inputSchema: { type: 'object', required: ['artifactRef'] },
    sideEffectLevel: 'read',
    permissionScope: ['workspace.report.read'],
    source: 'local',
  },
  handler
);

const result = await runner.run({
  toolId: 'tool.workspace.read-report',
  input: { artifactRef: 'artifact:report-1' },
  context: {
    runId: 'run-1',
    stepId: 'read-report',
    invocationId: 'invocation-1',
    operationId: 'operation-1',
    principal: {
      id: 'agent-1',
      type: 'agent',
      permissionScopes: ['workspace.report.read'],
    },
  },
});
```

Large output is written through `ToolArtifactPort`; the Tool result contains only the artifact reference. Approval resume, cancellation and idempotency reuse operate on the same persisted Invocation record.

## MCP External Capability

Create the connection owner and bind Catalog refresh to MCP `listChanged` notifications:

```ts
const manager = new MCPConnectionManager({
  sessionFactory: new SDKMCPConnectionSessionFactory(),
});
manager.register({
  id: 'search',
  mode: 'remote',
  transport: {
    type: 'streamable_http',
    endpoint: 'https://mcp.example.com/mcp',
    authorizationRef: 'secret:mcp-search',
  },
  singleStart: true,
  requestTimeoutMs: 30_000,
});

const catalog = new MCPCapabilityCatalog({
  integration,
  gateway: manager,
  trustPolicy: {
    defaultTrustLevel: 'restricted',
    requireApprovalForSchemaChange: true,
    pinServerIdentity: true,
    pinProtocolVersion: true,
    pinCapabilityHashes: true,
  },
  driftPolicy: {
    onDescriptionChange: 'snapshot_next_run',
    onSchemaChange: 'require_approval',
    onRemoval: 'allow_existing_run',
    onServerIdentityChange: 'quarantine',
    invalidateSchemaCache: true,
  },
});
catalog.bindConnectionManager(manager);
```

Before a Run starts, select approved capabilities, import their stable Tool IDs, and create the immutable contract snapshot:

```ts
await catalog.importTools(registry, refs);
const snapshot = await catalog.snapshot('run-1', refs);

await runner.run({
  toolId: 'mcp.search.web_search',
  input: { query: 'Hypha' },
  context: {
    runId: 'run-1',
    stepId: 'search',
    contractSnapshotRef: snapshot.id,
    principal,
  },
});
```

Schema or identity changes create a new `MCPCapabilityRecord` revision. The current Run keeps its original `snapshotHash`; a later Run can use the new revision only after its drift policy is satisfied.
