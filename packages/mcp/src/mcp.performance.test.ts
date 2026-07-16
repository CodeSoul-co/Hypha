import { performance } from 'node:perf_hooks';
import { describe, expect, it } from 'vitest';
import { InMemoryEventStore } from '@hypha/core';
import { GovernedToolRunner, LocalFunctionToolAdapter, ToolRegistry } from '@hypha/tools';
import {
  MCPCapabilityCatalog,
  MCPSchemaCache,
  MockMCPGateway,
  type MCPCapabilityDescriptor,
} from './index';

function descriptors(count: number): MCPCapabilityDescriptor[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `capability-${index}`,
    version: '1.0.0',
    name: `capability-${index}`,
    description: `Synthetic capability ${index}`,
    serverId: 'performance',
    capabilityId: `capability-${index}`,
    type: 'tool' as const,
    inputSchema: { type: 'object', properties: { value: { type: 'number' } } },
    outputSchema: { type: 'object' },
    sideEffectLevel: 'read' as const,
    trustLevel: 'reviewed' as const,
    declarationSource: 'server' as const,
    protocolVersion: '2025-11-25',
    serverIdentity: { name: 'performance', version: '1.0.0' },
  }));
}

function catalog(count: number, schemaCache?: MCPSchemaCache): MCPCapabilityCatalog {
  return new MCPCapabilityCatalog({
    integration: {
      id: 'performance',
      version: '1.0.0',
      servers: [{ id: 'performance', mode: 'local' }],
    },
    gateway: new MockMCPGateway(descriptors(count)),
    trustPolicy: { defaultTrustLevel: 'restricted' },
    driftPolicy: {
      onDescriptionChange: 'snapshot_next_run',
      onSchemaChange: 'snapshot_next_run',
      onRemoval: 'allow_existing_run',
      onServerIdentityChange: 'quarantine',
      invalidateSchemaCache: true,
    },
    schemaCache,
  });
}

describe('@hypha/mcp performance acceptance', () => {
  it('refreshes and queries 1k and 10k capability catalogs without order-of-magnitude regression', async () => {
    const measurements: Record<string, number> = {};
    const discoveryGateway = new MockMCPGateway(descriptors(1_000));
    const integration = {
      id: 'performance',
      version: '1.0.0',
      servers: [{ id: 'performance', mode: 'local' as const }],
    };
    const discoverySamples: number[] = [];
    for (let index = 0; index < 30; index += 1) {
      const started = performance.now();
      await discoveryGateway.discover(integration);
      discoverySamples.push(performance.now() - started);
    }
    discoverySamples.sort((left, right) => left - right);
    measurements.discovery_1000_p50_ms =
      discoverySamples[Math.floor(discoverySamples.length * 0.5)];
    measurements.discovery_1000_p95_ms =
      discoverySamples[Math.floor(discoverySamples.length * 0.95)];

    for (const count of [1_000, 10_000]) {
      const schemaCache = new MCPSchemaCache();
      const subject = catalog(count, schemaCache);
      const started = performance.now();
      const snapshot = await subject.refresh('performance');
      measurements[`refresh_${count}_ms`] = performance.now() - started;
      const queryStarted = performance.now();
      const selected = await subject.list({ query: `capability-${count - 1}`, limit: 1 });
      measurements[`query_${count}_ms`] = performance.now() - queryStarted;
      expect(snapshot.capabilities).toHaveLength(count);
      expect(selected).toHaveLength(1);
      if (count === 1_000) {
        const [loaded] = await subject.list({ loadDescriptors: true, limit: 1 });
        const cacheStarted = performance.now();
        for (let index = 0; index < 10_000; index += 1) {
          expect(
            schemaCache.get({
              serverId: loaded.serverId,
              capabilityId: loaded.remoteName,
              capabilityHash: loaded.capabilityHash,
              protocolVersion: loaded.protocolVersion,
            })
          ).not.toBeNull();
        }
        measurements.schema_cache_10000_hits_ms = performance.now() - cacheStarted;
      }
    }
    expect(measurements.refresh_10000_ms).toBeLessThan(20_000);
    expect(measurements.query_10000_ms).toBeLessThan(5_000);
    console.info('tool-mcp-performance', JSON.stringify(measurements));
  }, 30_000);

  it('executes concurrent governed read invocations without duplicate invocation records', async () => {
    const registry = new ToolRegistry();
    registry.registerAdapter(
      {
        id: 'performance.read',
        version: '1.0.0',
        description: 'Performance acceptance read Tool.',
        inputSchema: { type: 'object', required: ['value'] },
        sideEffectLevel: 'read',
        source: 'local',
      },
      new LocalFunctionToolAdapter('performance.read', async (input) => input)
    );
    const runner = new GovernedToolRunner(registry, new InMemoryEventStore());
    const started = performance.now();
    const results = await Promise.all(
      Array.from({ length: 250 }, (_, index) =>
        runner.run({
          toolId: 'performance.read',
          input: { value: index },
          context: {
            runId: 'run-performance',
            stepId: 'concurrent-read',
            invocationId: `invocation-performance-${index}`,
            principal: { id: 'test', type: 'service', permissionScopes: ['*'] },
          },
        })
      )
    );
    const latencyMs = performance.now() - started;
    expect(results.every((result) => result.status === 'completed')).toBe(true);
    expect(new Set(results.map((result) => result.invocationId)).size).toBe(250);
    expect(latencyMs).toBeLessThan(10_000);
    console.info('tool-invocation-performance', JSON.stringify({ count: 250, latencyMs }));
  }, 15_000);
});
