import { describe, expect, it } from 'vitest';
import express from 'express';
import { InMemoryEventStore, InMemoryTelemetryRecorder } from '@hypha/core';
import {
  GovernedToolRunner,
  ToolRegistry,
  hashToolContract,
  toolContractSnapshotExample,
} from '@hypha/tools';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import {
  InMemoryMCPCapabilityBaselineStore,
  MCPCapabilityCatalog,
  MCPSchemaCache,
  MCPConnectionManager,
  NORMALIZED_MCP_ERROR_CODES,
  SDKMCPConnectionSessionFactory,
  MockMCPGateway,
  classicMCPIntegrationSpec,
  createClassicMCPMockGateway,
  governedMCPIntegrationDefinition,
  governedMCPIntegrationJsonSchemas,
  mcpCapabilityRecordExample,
  mcpCapabilityRecordDefinition,
  mcpConnectionRecordDefinition,
  mcpIntegrationSpecDefinition,
  mcpSpecJsonSchemas,
  normalizeMCPToolSpec,
  normalizedMCPErrorSchema,
  RedisMCPCapabilityCatalogStore,
  RedisToolContractSnapshotStore,
  registerMCPGatewayTools,
  validateMCPIntegrationSpec,
  type MCPConnectionSession,
  type MCPConnectionSessionFactory,
  type MCPCapabilityDescriptor,
  type MCPServerProfile,
} from './index';

describe('@hypha/mcp normalization', () => {
  it('keeps NormalizedMCPError TypeScript, Zod, and JSON Schema in parity', () => {
    const jsonSchema = governedMCPIntegrationJsonSchemas.NormalizedMCPError;
    expect(jsonSchema.required).toEqual(['code', 'message', 'retryable']);
    expect(jsonSchema.additionalProperties).toBe(false);
    expect((jsonSchema.properties?.code as { enum?: unknown[] }).enum).toEqual([
      ...NORMALIZED_MCP_ERROR_CODES,
    ]);
    for (const code of NORMALIZED_MCP_ERROR_CODES) {
      expect(
        normalizedMCPErrorSchema.parse({ code, message: `fixture:${code}`, retryable: false })
      ).toMatchObject({ code });
    }
    expect(() =>
      normalizedMCPErrorSchema.parse({
        code: 'MCP_INTERNAL_ERROR',
        message: 'unexpected field',
        retryable: false,
        unexpected: true,
      })
    ).toThrow();
  });
  it('persists catalog records and contract snapshots in a shared Redis-compatible store', async () => {
    const strings = new Map<string, string>();
    const sets = new Map<string, Set<string>>();
    const redis = {
      async get(key: string) {
        return strings.get(key) ?? null;
      },
      async set(key: string, value: string) {
        strings.set(key, value);
        return 'OK';
      },
      async sadd(key: string, ...members: string[]) {
        const values = sets.get(key) ?? new Set<string>();
        const size = values.size;
        members.forEach((member) => values.add(member));
        sets.set(key, values);
        return values.size - size;
      },
      async smembers(key: string) {
        return Array.from(sets.get(key) ?? []);
      },
    };
    const catalog = new RedisMCPCapabilityCatalogStore(redis, 'test:catalog');
    await catalog.save(mcpCapabilityRecordExample);
    await expect(catalog.list(mcpCapabilityRecordExample.serverId)).resolves.toEqual([
      mcpCapabilityRecordExample,
    ]);

    const snapshots = new RedisToolContractSnapshotStore(redis, 'test:snapshots');
    await snapshots.save(toolContractSnapshotExample);
    await expect(snapshots.get(toolContractSnapshotExample.id)).resolves.toEqual(
      toolContractSnapshotExample
    );
  });

  it('bounds the MCP schema cache with least-recently-used eviction', () => {
    const schemaCache = new MCPSchemaCache({
      maxEntries: 2,
      now: () => '2026-07-21T00:00:00.000Z',
    });
    for (let index = 0; index < 3; index += 1) {
      schemaCache.set({
        ...mcpCapabilityRecordExample,
        id: `record-${index}`,
        remoteName: `capability-${index}`,
        capabilityHash: `sha256:capability-${index}`,
      });
    }

    expect(schemaCache.size()).toBe(2);
    expect(
      schemaCache.get({
        serverId: mcpCapabilityRecordExample.serverId,
        capabilityId: 'capability-0',
        capabilityHash: 'sha256:capability-0',
        protocolVersion: mcpCapabilityRecordExample.protocolVersion,
      })
    ).toBeNull();
    expect(
      schemaCache.get({
        serverId: mcpCapabilityRecordExample.serverId,
        capabilityId: 'capability-2',
        capabilityHash: 'sha256:capability-2',
        protocolVersion: mcpCapabilityRecordExample.protocolVersion,
      })
    ).not.toBeNull();
  });

  it('filters and normalizes MCP capabilities before tool use', async () => {
    const gateway = new MockMCPGateway([
      {
        id: 'capability',
        version: '0.0.0',
        serverId: 'local',
        capabilityId: 'search',
        type: 'tool',
        sideEffectLevel: 'read',
        trustLevel: 'reviewed',
      },
    ]);

    const discovered = await gateway.discover({
      id: 'mcp',
      version: '0.0.0',
      servers: [{ id: 'local', mode: 'local' }],
      allowedCapabilities: ['search'],
    });

    expect(await gateway.normalize(discovered[0])).toMatchObject({
      normalizedSpecId: 'local:tool:search',
    });
    expect(normalizeMCPToolSpec(discovered[0])).toMatchObject({
      id: 'local.search',
      source: 'mcp',
      sourceRef: { serverId: 'local', capabilityId: 'search' },
      sideEffectLevel: 'read',
    });
  });

  it('keeps the classic callTool gateway alias during adapter migration', async () => {
    const gateway = new MockMCPGateway();
    gateway.registerToolHandler('local', 'search', ({ input }) => ({ input }));
    const request = {
      serverId: 'local',
      capabilityId: 'search',
      input: { query: 'hypha' },
      context: { runId: 'run_compat', stepId: 'search' },
    };

    await expect(gateway.callTool(request)).resolves.toEqual({
      input: { query: 'hypha' },
    });
  });

  it('exports MCPIntegrationSpec schema and minimal example', () => {
    expect(validateMCPIntegrationSpec(mcpIntegrationSpecDefinition.example).id).toBe('mcp.default');
    expect(mcpSpecJsonSchemas.MCPIntegrationSpec.required).toContain('servers');
  });

  it('exports the owner-spec MCP transport, trust, drift, and snapshot contract', () => {
    const parsed = governedMCPIntegrationDefinition.parse(governedMCPIntegrationDefinition.example);
    expect(parsed.servers[0]).toMatchObject({
      transport: { type: 'stdio' },
      singleStart: true,
    });
    expect(parsed).toMatchObject({
      trustPolicy: { defaultTrustLevel: 'untrusted' },
      driftPolicy: { onSchemaChange: 'require_approval' },
      snapshotPolicy: { mode: 'run' },
    });
    expect(governedMCPIntegrationJsonSchemas.GovernedMCPIntegrationSpec.required).toContain(
      'snapshotPolicy'
    );
  });

  it('exports Connection and Capability runtime record schema definitions', () => {
    expect(
      mcpConnectionRecordDefinition.parse(mcpConnectionRecordDefinition.example)
    ).toMatchObject({ state: 'ready', transportType: 'stdio' });
    expect(
      mcpCapabilityRecordDefinition.parse(mcpCapabilityRecordDefinition.example)
    ).toMatchObject({ kind: 'tool', driftState: 'stable' });
  });

  it('quarantines drift, preserves revisions, and pins a stable Tool surface per run', async () => {
    const capabilities: MCPCapabilityDescriptor[] = [
      {
        id: 'search-capability',
        version: '1.0.0',
        name: 'search',
        description: 'Search the fixture index.',
        serverId: 'catalog-fixture',
        capabilityId: 'search',
        type: 'tool' as const,
        inputSchema: {
          type: 'object' as const,
          required: ['query'],
          properties: { query: { type: 'string' as const } },
        },
        outputSchema: { type: 'object' as const },
        sideEffectLevel: 'read' as const,
        permissionScope: ['search.read'],
        trustLevel: 'reviewed' as const,
        declarationSource: 'server' as const,
        protocolVersion: '2025-11-25',
        serverIdentity: { name: 'catalog-fixture', version: '1.0.0' },
      },
    ];
    const gateway = new MockMCPGateway(capabilities);
    gateway.registerToolHandler('catalog-fixture', 'search', ({ input }) => ({ input }));
    const schemaCache = new MCPSchemaCache();
    const events: string[] = [];
    const telemetry = new InMemoryTelemetryRecorder();
    const catalog = new MCPCapabilityCatalog({
      integration: {
        id: 'catalog-integration',
        version: '1.0.0',
        servers: [{ id: 'catalog-fixture', mode: 'local' }],
      },
      gateway,
      trustPolicy: {
        defaultTrustLevel: 'restricted',
        requireApprovalForNewCapability: true,
        requireApprovalForSchemaChange: true,
      },
      driftPolicy: {
        onDescriptionChange: 'snapshot_next_run',
        onSchemaChange: 'require_approval',
        onRemoval: 'allow_existing_run',
        onServerIdentityChange: 'quarantine',
        invalidateSchemaCache: true,
      },
      schemaCache,
      telemetry,
      onEvent(type) {
        events.push(type);
      },
    });

    const first = await catalog.refresh('catalog-fixture', 'initial discovery');
    const initial = first.capabilities[0];
    expect(initial).toMatchObject({
      stableToolId: 'mcp.catalog-fixture.search',
      driftState: 'quarantined',
      driftTypes: ['capability_added'],
    });
    await catalog.approveRevision({
      serverId: 'catalog-fixture',
      capabilityId: 'search',
      capabilityHash: initial.capabilityHash,
      approvedBy: 'admin-1',
    });
    const unchanged = await catalog.refresh('catalog-fixture', 'unchanged-after-approval');
    expect(unchanged.capabilities[0]).toMatchObject({
      capabilityHash: initial.capabilityHash,
      driftState: 'approved',
      approvedAt: expect.any(String),
    });

    const registry = new ToolRegistry();
    await catalog.importTools(registry, [
      {
        serverId: 'catalog-fixture',
        capabilityId: 'search',
        capabilityHash: initial.capabilityHash,
      },
    ]);
    const snapshot = await catalog.snapshot('run_catalog', [
      {
        serverId: 'catalog-fixture',
        capabilityId: 'search',
        capabilityHash: initial.capabilityHash,
      },
    ]);

    capabilities[0].inputSchema = {
      type: 'object',
      required: ['query', 'limit'],
      properties: {
        query: { type: 'string' },
        limit: { type: 'number' },
      },
    };
    const changed = await catalog.refresh('catalog-fixture', 'listChanged');
    expect(changed.drift[0].types).toContain('input_schema_changed');
    expect(changed.capabilities[0].driftState).toBe('quarantined');
    expect(snapshot.toolContracts[0].toolRevision).toBe(initial.capabilityHash);

    const runner = new GovernedToolRunner(registry, new InMemoryEventStore(), undefined, {
      snapshotStore: catalog.snapshotStore,
    });
    await expect(
      runner.run({
        toolId: 'mcp.catalog-fixture.search',
        input: { query: 'hypha' },
        context: {
          runId: 'run_catalog',
          stepId: 'search',
          contractSnapshotRef: snapshot.id,
          principal: {
            id: 'agent-1',
            type: 'agent',
            permissionScopes: ['search.read'],
          },
        },
      })
    ).resolves.toMatchObject({ status: 'completed' });
    expect(events).toEqual(
      expect.arrayContaining([
        'mcp.capability.quarantined',
        'mcp.capability.approved',
        'mcp.capability.drift.detected',
        'tool.contract.snapshot.created',
      ])
    );
    expect(telemetry.sum('mcp_capability_drift_total')).toBeGreaterThanOrEqual(2);
    expect(telemetry.sum('mcp_capability_quarantined_total')).toBeGreaterThanOrEqual(1);
  });

  it('fails closed unless import, snapshot, and invocation use the same live approved revision', async () => {
    let now = '2026-07-22T00:00:00.000Z';
    const gateway = new MockMCPGateway([
      {
        id: 'strict-search',
        version: '1.0.0',
        serverId: 'strict-server',
        capabilityId: 'search',
        type: 'tool',
        inputSchema: { type: 'object' },
        outputSchema: { type: 'object' },
        sideEffectLevel: 'read',
        permissionScope: ['search.read'],
        trustLevel: 'reviewed',
        declarationSource: 'server',
        protocolVersion: '2025-11-25',
        serverIdentity: { name: 'strict-server', version: '1.0.0' },
      },
    ]);
    gateway.registerToolHandler('strict-server', 'search', ({ input }) => ({ input }));
    const catalog = new MCPCapabilityCatalog({
      integration: {
        id: 'strict-integration',
        version: '1.0.0',
        servers: [{ id: 'strict-server', mode: 'local' }],
      },
      gateway,
      trustPolicy: {
        defaultTrustLevel: 'restricted',
        requireApprovalForNewCapability: true,
        requireApprovalForSchemaChange: true,
      },
      driftPolicy: {
        onDescriptionChange: 'snapshot_next_run',
        onSchemaChange: 'require_approval',
        onRemoval: 'allow_existing_run',
        onServerIdentityChange: 'quarantine',
      },
      now: () => now,
    });
    const discovered = await catalog.refresh('strict-server');
    const capability = discovered.capabilities[0];
    const ref = {
      serverId: 'strict-server',
      capabilityId: 'search',
      capabilityHash: capability.capabilityHash,
    };
    const registry = new ToolRegistry();

    await expect(catalog.importTools(registry, [ref])).rejects.toMatchObject({
      code: 'MCP_CAPABILITY_NOT_APPROVED',
    });
    await expect(
      catalog.importTools(registry, [{ serverId: 'strict-server', capabilityId: 'search' }])
    ).rejects.toMatchObject({ code: 'MCP_CAPABILITY_HASH_REQUIRED' });
    await expect(
      catalog.approveRevision({
        ...ref,
        approvedBy: 'admin.strict',
        expiresAt: '2026-07-21T00:00:00.000Z',
      })
    ).rejects.toMatchObject({ code: 'MCP_APPROVAL_EXPIRED' });

    await catalog.approveRevision({
      ...ref,
      approvedBy: 'admin.strict',
      expiresAt: '2026-07-23T00:00:00.000Z',
    });
    await catalog.importTools(registry, [ref]);
    const adapter = registry.getAdapter('mcp.strict-server.search')!;
    await expect(
      adapter.execute({
        toolId: 'mcp.strict-server.search',
        input: { query: 'hypha' },
        context: {
          runId: 'run.strict',
          stepId: 'search',
          invocationId: 'invocation.no-snapshot',
        },
      })
    ).rejects.toMatchObject({ code: 'MCP_CAPABILITY_SNAPSHOT_MISMATCH' });

    const snapshot = await catalog.snapshot('run.strict', [ref]);
    await expect(
      adapter.execute({
        toolId: 'mcp.strict-server.search',
        input: { query: 'hypha' },
        context: {
          runId: 'run.strict',
          stepId: 'search',
          invocationId: 'invocation.approved',
          contractSnapshotRef: snapshot.id,
        },
      })
    ).resolves.toMatchObject({ output: { input: { query: 'hypha' } } });

    const capabilityBody = {
      runId: 'run.strict',
      agentId: 'agent.strict',
      principalId: 'user.strict',
      createdAt: now,
      skillRevisions: [],
      allowedToolIds: ['mcp.strict-server.search'],
      allowedMCPServerIds: [],
      memoryAccess: 'none' as const,
      allowedExecutionProfiles: [],
      maximumSideEffectLevel: 'read' as const,
      requiresHumanReview: false,
      policyRefs: ['strict.policy'],
    };
    snapshot.effectiveCapabilities = {
      id: 'agent-capability:run.strict:agent.strict',
      ...capabilityBody,
      snapshotHash: hashToolContract(capabilityBody),
    };
    await catalog.snapshotStore.save(snapshot);
    const capabilityContext = {
      runId: 'run.strict',
      stepId: 'search',
      contractSnapshotRef: snapshot.id,
      capabilitySnapshotRef: snapshot.id,
      agentId: 'agent.strict',
      principal: {
        id: 'user.strict',
        principalId: 'user.strict',
        type: 'user' as const,
        agentId: 'agent.strict',
        permissionScopes: ['search.read'],
      },
    };
    await expect(
      adapter.execute({
        toolId: 'mcp.strict-server.search',
        input: { query: 'blocked' },
        context: capabilityContext,
      })
    ).rejects.toMatchObject({ code: 'MCP_CAPABILITY_SCOPE_DENIED' });

    snapshot.effectiveCapabilities = {
      ...snapshot.effectiveCapabilities,
      allowedMCPServerIds: ['strict-server'],
    };
    await catalog.snapshotStore.save(snapshot);
    expect((await catalog.snapshotStore.get(snapshot.id))?.effectiveCapabilities).toMatchObject({
      allowedMCPServerIds: ['strict-server'],
    });
    expect(registry.getSpec('mcp.strict-server.search')?.sourceRef).toMatchObject({
      mcpServerId: 'strict-server',
    });
    await expect(
      adapter.execute({
        toolId: 'mcp.strict-server.search',
        input: { query: 'allowed' },
        context: capabilityContext,
      })
    ).resolves.toMatchObject({ output: { input: { query: 'allowed' } } });

    gateway.registerToolHandler('strict-server', 'search', ({ input }) => {
      now = '2026-07-24T00:00:00.000Z';
      return { input };
    });
    await expect(
      adapter.execute({
        toolId: 'mcp.strict-server.search',
        input: { query: 'expired-during-call' },
        context: capabilityContext,
      })
    ).rejects.toMatchObject({ code: 'MCP_APPROVAL_EXPIRED' });

    now = '2026-07-24T00:00:00.000Z';
    await expect(catalog.snapshot('run.expired', [ref])).rejects.toMatchObject({
      code: 'MCP_APPROVAL_EXPIRED',
    });
  });

  it('registers discovered MCP tools into the governed ToolRunner path', async () => {
    const gateway = new MockMCPGateway([
      {
        id: 'capability',
        version: '0.0.0',
        serverId: 'local',
        capabilityId: 'search',
        type: 'tool',
        inputSchema: {
          type: 'object',
          required: ['query'],
          properties: { query: { type: 'string' } },
        },
        sideEffectLevel: 'read',
        capabilityHash: 'hash_search',
        trustLevel: 'reviewed',
      },
    ]);
    gateway.registerToolHandler('local', 'search', async (request) => ({
      query: request.input,
      source: 'mock-mcp',
    }));
    const registry = new ToolRegistry();
    const trace = new InMemoryEventStore();

    await expect(
      registerMCPGatewayTools({
        integration: {
          id: 'mcp.local',
          version: '0.0.0',
          servers: [{ id: 'local', mode: 'local' }],
          allowedCapabilities: ['search'],
        },
        gateway,
        registry,
        trace,
        traceContext: {
          runId: 'run_mcp_gateway',
          stepId: 'mcp.discover',
          sessionId: 'session_mcp',
        },
      })
    ).resolves.toMatchObject({
      registeredTools: [
        expect.objectContaining({
          id: 'local.search',
          source: 'mcp',
          sourceRef: expect.objectContaining({ serverId: 'local', capabilityId: 'search' }),
        }),
      ],
    });

    const runner = new GovernedToolRunner(registry, trace);
    await expect(
      runner.run({
        toolId: 'local.search',
        input: { query: 'hypha' },
        context: {
          runId: 'run_mcp_gateway',
          stepId: 'tool.search',
          sessionId: 'session_mcp',
        },
      })
    ).resolves.toMatchObject({
      status: 'completed',
      output: {
        source: 'mock-mcp',
      },
    });

    await expect(trace.list({ runId: 'run_mcp_gateway' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'mcp.capability.discovered' }),
        expect.objectContaining({ type: 'mcp.tool.normalized' }),
        expect.objectContaining({
          type: 'tool.call.started',
          payload: expect.objectContaining({
            source: 'mcp',
            sourceRef: expect.objectContaining({ serverId: 'local', capabilityId: 'search' }),
          }),
        }),
        expect.objectContaining({ type: 'mcp.call.started' }),
        expect.objectContaining({ type: 'mcp.call.completed' }),
      ])
    );
  });

  it('does not trust server-provided read hints and quarantines changed contracts', async () => {
    const baselineStore = new InMemoryMCPCapabilityBaselineStore();
    const integration = {
      id: 'mcp.drift',
      version: '0.0.0',
      servers: [{ id: 'remote', mode: 'remote' as const }],
    };
    const registry = new ToolRegistry();
    const firstGateway = new MockMCPGateway([
      {
        id: 'remote.search',
        version: '1.0.0',
        serverId: 'remote',
        capabilityId: 'search',
        type: 'tool',
        inputSchema: { type: 'object', properties: { query: { type: 'string' } } },
        sideEffectLevel: 'read',
      },
    ]);

    const first = await registerMCPGatewayTools({
      integration,
      gateway: firstGateway,
      registry,
      baselineStore,
    });
    expect(first.registeredTools[0]).toMatchObject({
      sideEffectLevel: 'external_effect',
      sourceRef: {
        trustLevel: 'untrusted',
        declarationSource: 'server',
        capabilityHash: expect.stringMatching(/^sha256:/),
      },
    });

    const changedGateway = new MockMCPGateway([
      {
        id: 'remote.search',
        version: '1.0.0',
        serverId: 'remote',
        capabilityId: 'search',
        type: 'tool',
        inputSchema: { type: 'object', required: ['query'] },
        sideEffectLevel: 'read',
      },
    ]);
    const second = await registerMCPGatewayTools({
      integration,
      gateway: changedGateway,
      registry: new ToolRegistry(),
      baselineStore,
    });

    expect(second.registeredTools).toHaveLength(0);
    expect(second.quarantinedCapabilities).toHaveLength(1);
    expect(second.driftRecords).toEqual([
      expect.objectContaining({ status: 'changed', capabilityKey: 'remote/search' }),
    ]);
  });

  it('single-flights MCP connections and manages request, cancellation, health, and close', async () => {
    let createCount = 0;
    let closeCount = 0;
    const factory: MCPConnectionSessionFactory = {
      create(profile: MCPServerProfile): MCPConnectionSession {
        createCount += 1;
        return {
          async connect() {
            await new Promise((resolve) => setTimeout(resolve, 5));
            return {
              negotiatedProtocolVersion: '2025-11-25',
              serverInfo: { name: profile.id, version: '1.0.0' },
              serverCapabilities: { tools: { listChanged: true } },
            };
          },
          async listCapabilities() {
            return [
              {
                id: `mcp.${profile.id}.echo`,
                version: '1.0.0',
                serverId: profile.id,
                capabilityId: 'echo',
                type: 'tool',
                inputSchema: { type: 'object' },
                trustLevel: 'untrusted',
                declarationSource: 'server',
                protocolVersion: '2025-11-25',
                serverIdentity: { name: profile.id, version: '1.0.0' },
              },
            ];
          },
          async callTool(_capabilityId, input, options) {
            if ((input as { wait?: boolean }).wait) {
              await new Promise<void>((_resolve, reject) => {
                options?.signal?.addEventListener('abort', () => reject(new Error('cancelled')), {
                  once: true,
                });
              });
            }
            return { content: [{ type: 'json', value: input }] };
          },
          async ping() {},
          async close() {
            closeCount += 1;
          },
        };
      },
    };
    const trace = new InMemoryEventStore();
    const telemetry = new InMemoryTelemetryRecorder();
    const manager = new MCPConnectionManager({
      sessionFactory: factory,
      trace,
      telemetry,
      traceContext: { runId: 'run_connection', stepId: 'mcp.connection' },
    });
    manager.register({
      id: 'fixture',
      mode: 'fixture',
      transport: { type: 'custom', adapterRef: 'fixture' },
      singleStart: true,
      protocolVersionPolicy: { allowedVersions: ['2025-11-25'] },
    });

    const [left, right] = await Promise.all([
      manager.connect('fixture'),
      manager.connect('fixture'),
    ]);
    expect(left.state).toBe('ready');
    expect(right.state).toBe('ready');
    expect(createCount).toBe(1);
    await expect(manager.status('fixture')).resolves.toMatchObject({
      health: { status: 'healthy' },
    });

    const pending = manager.call({
      serverId: 'fixture',
      capabilityId: 'echo',
      input: { wait: true },
      context: {
        runId: 'run_connection',
        stepId: 'call',
        invocationId: 'invocation_wait',
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    await manager.cancelRequest('fixture:invocation_wait');
    await expect(pending).rejects.toMatchObject({ code: 'MCP_REQUEST_CANCELLED' });

    await manager.closeAll();
    expect(closeCount).toBe(1);
    await expect(manager.get('fixture')).resolves.toMatchObject({ state: 'closed' });
    await expect(trace.list({ runId: 'run_connection' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'mcp.connection.ready' }),
        expect.objectContaining({ type: 'mcp.request.cancelled' }),
        expect.objectContaining({ type: 'mcp.connection.closed' }),
      ])
    );
    expect(telemetry.sum('mcp_connection_total')).toBe(1);
    expect(telemetry.list('mcp_active_requests').at(-1)?.value).toBe(0);
  });

  it('reconnects an unexpectedly closed MCP session but not an explicit shutdown', async () => {
    const sessions: MCPConnectionSession[] = [];
    let createCount = 0;
    const factory: MCPConnectionSessionFactory = {
      create() {
        createCount += 1;
        const session: MCPConnectionSession = {
          async connect() {
            return {
              negotiatedProtocolVersion: '2025-11-25',
              serverInfo: { name: 'reconnect-fixture', version: '1.0.0' },
              serverCapabilities: { tools: {} },
            };
          },
          async listCapabilities() {
            return [];
          },
          async callTool() {
            return {};
          },
          async ping() {},
          async close() {},
        };
        sessions.push(session);
        return session;
      },
    };
    const manager = new MCPConnectionManager({ sessionFactory: factory });
    manager.register({
      id: 'reconnect-fixture',
      mode: 'fixture',
      transport: { type: 'custom', adapterRef: 'fixture' },
      reconnectPolicy: { maxAttempts: 2, backoffMs: 1 },
    });
    await manager.connect('reconnect-fixture');
    sessions[0].onClose?.(new Error('fixture connection dropped'));
    for (let attempt = 0; attempt < 50 && createCount < 2; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 2));
    }
    expect(createCount).toBe(2);
    await expect(manager.get('reconnect-fixture')).resolves.toMatchObject({ state: 'ready' });

    await manager.closeAll();
    await new Promise((resolve) => setTimeout(resolve, 5));
    expect(createCount).toBe(2);
  });

  it('bounds reconnect supervision by jittered backoff and elapsed-time budget', async () => {
    let createCount = 0;
    let elapsedMs = 0;
    const sleeps: number[] = [];
    const factory: MCPConnectionSessionFactory = {
      create() {
        createCount += 1;
        return {
          async connect() {
            throw new Error('transport unavailable');
          },
          async listCapabilities() {
            return [];
          },
          async callTool() {
            return {};
          },
          async ping() {},
          async close() {},
        };
      },
    };
    const manager = new MCPConnectionManager({
      sessionFactory: factory,
      monotonicNow: () => elapsedMs,
      random: () => 1,
      sleep: async (ms) => {
        sleeps.push(ms);
        elapsedMs += ms;
      },
    });
    manager.register({
      id: 'bounded-reconnect',
      mode: 'fixture',
      transport: { type: 'custom', adapterRef: 'fixture' },
      reconnectPolicy: {
        maxAttempts: 5,
        backoffMs: 100,
        maxBackoffMs: 200,
        jitterRatio: 0.25,
        maxElapsedMs: 300,
      },
    });

    await expect(manager.reconnect('bounded-reconnect')).rejects.toMatchObject({
      code: 'MCP_CONNECTION_FAILED',
    });
    expect(createCount).toBe(2);
    expect(sleeps).toEqual([125]);
    await expect(manager.get('bounded-reconnect')).resolves.toMatchObject({
      state: 'failed',
      reconnectAttempts: 2,
    });
  });

  it('rejects Resource and Prompt results cancelled or expired while awaiting the server', async () => {
    let now = '2026-07-23T00:00:00.000Z';
    let resolveResource:
      ((value: { contents: Array<{ uri: string; text: string }> }) => void) | undefined;
    let resolvePrompt:
      ((value: { messages: Array<{ role: string; content: string }> }) => void) | undefined;
    const factory: MCPConnectionSessionFactory = {
      create() {
        return {
          async connect() {
            return {};
          },
          async listCapabilities() {
            return [];
          },
          async callTool() {
            return {};
          },
          readResource: async () =>
            new Promise((resolve) => {
              resolveResource = resolve;
            }),
          getPrompt: async () =>
            new Promise((resolve) => {
              resolvePrompt = resolve;
            }),
          async ping() {},
          async close() {},
        };
      },
    };
    const manager = new MCPConnectionManager({
      sessionFactory: factory,
      now: () => now,
    });
    manager.register({
      id: 'post-await-guards',
      mode: 'fixture',
      transport: { type: 'custom', adapterRef: 'fixture' },
    });
    await manager.connect('post-await-guards');

    const resource = manager.readResource({
      serverId: 'post-await-guards',
      uri: 'fixture://slow',
      context: {
        invocationId: 'resource-slow',
        deadlineAt: '2026-07-23T00:01:00.000Z',
      },
    });
    for (let attempt = 0; attempt < 20 && !resolveResource; attempt += 1) {
      await Promise.resolve();
    }
    expect(resolveResource).toBeTypeOf('function');
    await manager.cancelRequest('post-await-guards:resource-slow');
    resolveResource?.({ contents: [{ uri: 'fixture://slow', text: 'late' }] });
    await expect(resource).rejects.toMatchObject({ code: 'MCP_REQUEST_CANCELLED' });

    const prompt = manager.getPrompt({
      serverId: 'post-await-guards',
      name: 'slow-prompt',
      context: {
        invocationId: 'prompt-slow',
        deadlineAt: '2026-07-23T00:01:00.000Z',
      },
    });
    for (let attempt = 0; attempt < 20 && !resolvePrompt; attempt += 1) {
      await Promise.resolve();
    }
    expect(resolvePrompt).toBeTypeOf('function');
    now = '2026-07-23T00:02:00.000Z';
    resolvePrompt?.({ messages: [{ role: 'user', content: 'late' }] });
    await expect(prompt).rejects.toMatchObject({ code: 'MCP_REQUEST_TIMEOUT' });
  });

  it('marks remote Resource and Prompt content untrusted and externalizes oversized payloads', async () => {
    const artifactWrites: Array<{
      kind: 'resource' | 'prompt';
      contentHash: string;
      bytes: Uint8Array;
    }> = [];
    const factory: MCPConnectionSessionFactory = {
      create() {
        return {
          async connect() {
            return {
              negotiatedProtocolVersion: '2025-11-25',
              serverInfo: { name: 'remote-content', version: '2.0.0' },
            };
          },
          async listCapabilities() {
            return [];
          },
          async callTool() {
            return {};
          },
          async readResource(uri) {
            return {
              contents: [{ uri, text: uri.endsWith('/large') ? 'sensitive'.repeat(64) : 'safe' }],
            };
          },
          async getPrompt(name) {
            return {
              messages: [
                {
                  role: 'user',
                  content: name === 'large' ? 'private'.repeat(64) : 'hello',
                },
              ],
            };
          },
          async ping() {},
          async close() {},
        };
      },
    };
    const manager = new MCPConnectionManager({
      sessionFactory: factory,
      contentArtifacts: {
        async store(input) {
          artifactWrites.push({
            kind: input.kind,
            contentHash: input.contentHash,
            bytes: input.bytes,
          });
          return {
            artifactRef: `artifact://${input.serverId}/${input.kind}`,
            contentHash: input.contentHash,
            sizeBytes: input.bytes.byteLength,
          };
        },
      },
    });
    manager.register({
      id: 'remote-content',
      mode: 'remote',
      version: '2.0.0',
      transport: { type: 'custom', adapterRef: 'fixture' },
      contentPolicy: {
        maxResourceBytes: 160,
        maxPromptBytes: 160,
        maxPromptTokens: 40,
        oversizeAction: 'artifact',
      },
    });
    await manager.connect('remote-content');

    const inline = await manager.readResource({
      serverId: 'remote-content',
      uri: 'fixture://document/small',
    });
    expect(inline.metadata).toMatchObject({
      trust: 'untrusted',
      provenance: {
        source: 'mcp',
        serverId: 'remote-content',
        kind: 'resource',
      },
    });
    expect(inline.metadata?.contentHash).toMatch(/^[a-f0-9]{64}$/);

    const resource = await manager.readResource({
      serverId: 'remote-content',
      uri: 'fixture://document/large',
    });
    expect(resource.metadata).toMatchObject({
      externalized: true,
      artifactRef: 'artifact://remote-content/resource',
      trust: 'untrusted',
    });
    expect(JSON.stringify(resource)).not.toContain('sensitive');

    const prompt = await manager.getPrompt({
      serverId: 'remote-content',
      name: 'large',
    });
    expect(prompt.metadata).toMatchObject({
      externalized: true,
      artifactRef: 'artifact://remote-content/prompt',
      trust: 'untrusted',
    });
    expect(JSON.stringify(prompt)).not.toContain('private');
    expect(artifactWrites).toHaveLength(2);
    expect(artifactWrites.every((write) => write.contentHash.length === 64)).toBe(true);
  });

  it('rejects oversized MCP content when artifact externalization is not enabled', async () => {
    const manager = new MCPConnectionManager({
      sessionFactory: {
        create() {
          return {
            async connect() {
              return {};
            },
            async listCapabilities() {
              return [];
            },
            async callTool() {
              return {};
            },
            async readResource(uri) {
              return { contents: [{ uri, text: 'oversized-content' }] };
            },
            async ping() {},
            async close() {},
          };
        },
      },
    });
    manager.register({
      id: 'reject-content',
      mode: 'remote',
      transport: { type: 'custom', adapterRef: 'fixture' },
      contentPolicy: { maxResourceBytes: 8, oversizeAction: 'reject' },
    });
    await manager.connect('reject-content');

    await expect(
      manager.readResource({
        serverId: 'reject-content',
        uri: 'fixture://document/large',
      })
    ).rejects.toMatchObject({
      code: 'MCP_CONTENT_TOO_LARGE',
      retryable: false,
    });
  });

  it('connects to and cleans up a real stdio MCP server through the stable SDK adapter', async () => {
    const manager = new MCPConnectionManager({
      sessionFactory: new SDKMCPConnectionSessionFactory(),
    });
    manager.register({
      id: 'stdio-fixture',
      mode: 'local',
      transport: {
        type: 'stdio',
        command: process.execPath,
        args: [`${process.cwd().replace(/\\/g, '/')}/packages/mcp/fixtures/stdio-server.cjs`],
        envAllowList: ['PATH'],
        stderrMode: 'capture',
      },
      singleStart: true,
      initializationTimeoutMs: 10_000,
      requestTimeoutMs: 5000,
      shutdownTimeoutMs: 5000,
    });

    await expect(manager.connect('stdio-fixture')).resolves.toMatchObject({ state: 'ready' });
    const discovered = await manager.discover({
      id: 'stdio-integration',
      version: '1.0.0',
      servers: [
        {
          id: 'stdio-fixture',
          mode: 'local',
          command: process.execPath,
          args: [],
        },
      ],
    });
    expect(discovered).toHaveLength(4);
    expect(discovered).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          serverId: 'stdio-fixture',
          capabilityId: 'echo',
          annotations: { readOnlyHint: true },
          declarationSource: 'server',
        }),
        expect.objectContaining({
          serverId: 'stdio-fixture',
          capabilityId: 'fixture://document/readme',
          type: 'resource',
        }),
        expect.objectContaining({
          serverId: 'stdio-fixture',
          capabilityId: 'fixture://document/{name}',
          type: 'resource',
        }),
        expect.objectContaining({
          serverId: 'stdio-fixture',
          capabilityId: 'summarize',
          type: 'prompt',
        }),
      ])
    );
    await expect(
      manager.call({
        serverId: 'stdio-fixture',
        capabilityId: 'echo',
        input: { value: 'hypha' },
        context: {
          runId: 'run_stdio',
          stepId: 'call',
          invocationId: 'stdio-call',
        },
      })
    ).resolves.toMatchObject({
      structuredContent: { value: 'hypha' },
    });
    await expect(
      manager.readResource({
        serverId: 'stdio-fixture',
        uri: 'fixture://document/readme',
        context: { runId: 'run_stdio', stepId: 'resource' },
      })
    ).resolves.toMatchObject({
      contents: [
        {
          uri: 'fixture://document/readme',
          text: 'resource:fixture://document/readme',
        },
      ],
    });
    await expect(
      manager.getPrompt({
        serverId: 'stdio-fixture',
        name: 'summarize',
        arguments: { topic: 'Hypha' },
        context: { runId: 'run_stdio', stepId: 'prompt' },
      })
    ).resolves.toMatchObject({
      description: 'Fixture summary prompt.',
      messages: [
        {
          role: 'user',
          content: { type: 'text', text: 'Summarize Hypha' },
        },
      ],
    });
    await expect(manager.health('stdio-fixture')).resolves.toMatchObject({
      'stdio-fixture': { status: 'healthy' },
    });

    await manager.closeAll();
    await expect(manager.get('stdio-fixture')).resolves.toMatchObject({ state: 'closed' });
  });

  it('connects through the real MCP Streamable HTTP transport', async () => {
    const fixtureErrors: string[] = [];
    const createProtocolServer = () => {
      const protocolServer = new Server(
        { name: 'hypha-http-fixture', version: '1.0.0' },
        { capabilities: { tools: {} } }
      );
      protocolServer.setRequestHandler(ListToolsRequestSchema, async () => ({
        tools: [
          {
            name: 'http_echo',
            description: 'Streamable HTTP echo fixture.',
            inputSchema: { type: 'object' },
          },
        ],
      }));
      protocolServer.setRequestHandler(CallToolRequestSchema, async (request) => ({
        content: [{ type: 'text', text: String(request.params.arguments?.value ?? '') }],
        structuredContent: { value: request.params.arguments?.value },
      }));
      protocolServer.onerror = (error) => fixtureErrors.push(error.message);
      return protocolServer;
    };
    const app = express();
    app.use(express.json());
    app.post('/mcp', (request, response) => {
      response.on('finish', () => {
        if (response.statusCode >= 400) {
          fixtureErrors.push(`HTTP ${response.statusCode} ${request.method}`);
        }
      });
      void (async () => {
        const protocolServer = createProtocolServer();
        const transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: undefined,
          enableJsonResponse: true,
        });
        try {
          await protocolServer.connect(transport);
          await transport.handleRequest(request, response, request.body);
        } catch (error) {
          fixtureErrors.push(error instanceof Error ? error.message : String(error));
          if (!response.headersSent) {
            response.writeHead(500, { 'content-type': 'application/json' });
          }
          response.end(
            JSON.stringify({
              jsonrpc: '2.0',
              id: null,
              error: { code: -32603, message: 'Fixture request failed.' },
            })
          );
        } finally {
          await protocolServer.close();
        }
      })();
    });
    app.get('/mcp', (_request, response) => response.sendStatus(405));
    app.delete('/mcp', (_request, response) => response.sendStatus(405));
    const httpServer = await new Promise<ReturnType<typeof app.listen>>((resolve) => {
      const server = app.listen(0, '127.0.0.1', () => resolve(server));
    });
    const address = httpServer.address();
    if (!address || typeof address === 'string') throw new Error('Fixture server has no port.');

    const manager = new MCPConnectionManager({
      sessionFactory: new SDKMCPConnectionSessionFactory(),
    });
    manager.register({
      id: 'http-fixture',
      mode: 'remote',
      transport: {
        type: 'streamable_http',
        endpoint: `http://127.0.0.1:${address.port}/mcp`,
        sessionMode: 'stateless',
      },
      initializationTimeoutMs: 10_000,
      requestTimeoutMs: 5000,
      shutdownTimeoutMs: 5000,
      egressPolicy: {
        requireTls: false,
        denyPrivateNetworks: false,
        allowedHosts: ['127.0.0.1'],
        maxRedirects: 0,
      },
    });

    try {
      try {
        await expect(manager.connect('http-fixture')).resolves.toMatchObject({ state: 'ready' });
      } catch (error) {
        throw new Error(
          `${error instanceof Error ? error.message : String(error)}; fixture=${fixtureErrors.join('|')}`
        );
      }
      await expect(
        manager.call({
          serverId: 'http-fixture',
          capabilityId: 'http_echo',
          input: { value: 'streamable' },
          context: {
            runId: 'run_http',
            stepId: 'call',
            invocationId: 'http-call',
          },
        })
      ).resolves.toMatchObject({ structuredContent: { value: 'streamable' } });
    } finally {
      await manager.closeAll();
      await new Promise<void>((resolve, reject) =>
        httpServer.close((error) => (error ? reject(error) : resolve()))
      );
    }
  });

  it('blocks dangerous MCP tools before calling the gateway handler', async () => {
    let called = false;
    const gateway = new MockMCPGateway([
      {
        id: 'dangerous',
        version: '0.0.0',
        serverId: 'local',
        capabilityId: 'delete',
        type: 'tool',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'irreversible',
      },
    ]);
    gateway.registerToolHandler('local', 'delete', async () => {
      called = true;
      return { deleted: true };
    });
    const registry = new ToolRegistry();
    const trace = new InMemoryEventStore();

    await registerMCPGatewayTools({
      integration: {
        id: 'mcp.local',
        version: '0.0.0',
        servers: [{ id: 'local', mode: 'local' }],
      },
      gateway,
      registry,
      trace,
      traceContext: {
        runId: 'run_mcp_dangerous',
        stepId: 'mcp.discover',
      },
    });

    const runner = new GovernedToolRunner(registry, trace);
    await expect(
      runner.run({
        toolId: 'local.delete',
        input: { path: '/tmp/example' },
        context: { runId: 'run_mcp_dangerous', stepId: 'tool.delete' },
      })
    ).resolves.toMatchObject({
      status: 'denied',
    });
    expect(called).toBe(false);

    const events = await trace.list({ runId: 'run_mcp_dangerous' });
    expect(events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'tool.call.rejected',
          payload: expect.objectContaining({
            source: 'mcp',
            sideEffectLevel: 'irreversible',
          }),
        }),
      ])
    );
    expect(events).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ type: 'mcp.call.started' })])
    );
  });

  it('executes classic predefined MCP fixtures through the governed runner', async () => {
    const gateway = createClassicMCPMockGateway({
      files: {
        '/guide.md': 'Classic filesystem fixture content.',
      },
      fetchResponses: {
        'https://example.com/api': {
          status: 200,
          headers: { 'content-type': 'application/json' },
          json: { ok: true },
        },
      },
      now: '2026-07-03T00:00:00.000Z',
      searchResults: {
        hypha: [
          {
            title: 'Hypha test result',
            url: 'https://example.com/hypha',
            snippet: 'Deterministic MCP search result.',
          },
        ],
      },
    });
    const registry = new ToolRegistry();
    const trace = new InMemoryEventStore();

    const registration = await registerMCPGatewayTools({
      integration: classicMCPIntegrationSpec,
      gateway,
      registry,
      trace,
      traceContext: {
        runId: 'run_mcp_classic',
        stepId: 'mcp.discover',
        sessionId: 'session_mcp_classic',
      },
    });

    expect(registration.registeredTools.map((tool) => tool.id).sort()).toEqual([
      'baidu.web_search',
      'fetch.fetch',
      'filesystem.read_file',
      'search.web_search',
      'so360.web_search',
      'time.now',
    ]);

    const runner = new GovernedToolRunner(registry, trace);
    const principal = {
      id: 'classic-mcp-test',
      type: 'service' as const,
      permissionScopes: [
        'filesystem.read',
        'network.read',
        'time.read',
        'web.search',
        'web.search.cn',
      ],
    };
    await expect(
      runner.run({
        toolId: 'filesystem.read_file',
        input: { path: '/guide.md' },
        context: {
          runId: 'run_mcp_classic',
          stepId: 'tool.filesystem.custom',
          sessionId: 'session_mcp_classic',
          principal,
        },
      })
    ).resolves.toMatchObject({
      status: 'completed',
      output: {
        path: '/guide.md',
        content: 'Classic filesystem fixture content.',
      },
    });

    await expect(
      runner.run({
        toolId: 'fetch.fetch',
        input: { url: 'https://example.com/api' },
        context: {
          runId: 'run_mcp_classic',
          stepId: 'tool.fetch',
          sessionId: 'session_mcp_classic',
          principal,
        },
      })
    ).resolves.toMatchObject({
      status: 'completed',
      output: {
        status: 200,
        json: { ok: true },
      },
    });

    await expect(
      runner.run({
        toolId: 'time.now',
        input: { timezone: 'UTC' },
        context: {
          runId: 'run_mcp_classic',
          stepId: 'tool.time',
          sessionId: 'session_mcp_classic',
          principal,
        },
      })
    ).resolves.toMatchObject({
      status: 'completed',
      output: {
        now: '2026-07-03T00:00:00.000Z',
        timezone: 'UTC',
      },
    });

    const searchExample = await runner.run({
      toolId: 'search.web_search',
      input: { query: 'hypha', limit: 1 },
      context: {
        runId: 'run_mcp_classic',
        stepId: 'tool.search.assert',
        sessionId: 'session_mcp_classic',
        principal,
      },
    });
    expect(searchExample).toMatchObject({
      status: 'completed',
      output: {
        query: 'hypha',
        count: 1,
        provider: 'fixture',
        note: 'classic-mcp-mock',
      },
    });

    const baiduSearch = await runner.run({
      toolId: 'baidu.web_search',
      input: { query: 'hypha', limit: 1 },
      context: {
        runId: 'run_mcp_classic',
        stepId: 'tool.baidu.assert',
        sessionId: 'session_mcp_classic',
        principal,
      },
    });
    expect(baiduSearch).toMatchObject({
      status: 'completed',
      output: {
        query: 'hypha',
        count: 1,
        provider: 'baidu-fixture',
        note: 'classic-mcp-mainland-baidu',
      },
    });

    const events = await trace.list({ runId: 'run_mcp_classic' });
    expect(events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'mcp.capability.discovered' }),
        expect.objectContaining({ type: 'mcp.tool.normalized' }),
        expect.objectContaining({
          type: 'tool.policy.checked',
          payload: expect.objectContaining({
            source: 'mcp',
            sideEffectLevel: 'read',
          }),
        }),
        expect.objectContaining({ type: 'mcp.call.completed' }),
      ])
    );
    expect(events.filter((event) => event.type === 'mcp.call.completed')).toHaveLength(5);
  });

  it('enforces per-server bulkhead, rate limit, and circuit breaker policies', async () => {
    let release: (() => void) | undefined;
    let shouldFail = false;
    const factory: MCPConnectionSessionFactory = {
      create() {
        return {
          async connect() {
            return { serverCapabilities: { tools: {} } };
          },
          async listCapabilities() {
            return [];
          },
          async callTool() {
            if (shouldFail) throw new Error('provider failed');
            await new Promise<void>((resolve) => {
              release = resolve;
            });
            return { ok: true };
          },
          async ping() {},
          async close() {},
        };
      },
    };
    const manager = new MCPConnectionManager({ sessionFactory: factory });
    manager.register({
      id: 'guarded',
      mode: 'fixture',
      transport: { type: 'custom', adapterRef: 'fixture' },
      requestGuardPolicy: {
        maxConcurrentRequests: 1,
        rateLimit: { maxRequests: 2, windowMs: 60_000 },
        circuitBreaker: { failureThreshold: 1, resetAfterMs: 60_000 },
      },
    });
    const request = (invocationId: string) =>
      manager.call({
        serverId: 'guarded',
        capabilityId: 'echo',
        input: {},
        context: { runId: 'run-guard', stepId: 'call', invocationId },
      });

    const first = request('first');
    await new Promise((resolve) => setTimeout(resolve, 0));
    await expect(request('bulkhead')).rejects.toMatchObject({ code: 'MCP_BULKHEAD_REJECTED' });
    release?.();
    await expect(first).resolves.toEqual({ ok: true });

    shouldFail = true;
    await expect(request('failure')).rejects.toMatchObject({ code: 'MCP_CONNECTION_FAILED' });
    await expect(request('circuit')).rejects.toMatchObject({ code: 'MCP_CIRCUIT_OPEN' });
    await manager.closeAll();
  });
});
