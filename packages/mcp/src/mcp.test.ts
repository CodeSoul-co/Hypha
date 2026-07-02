import { describe, expect, it } from 'vitest';
import { MockMCPGateway, normalizeMCPToolSpec } from './index';

describe('@hypha/mcp normalization', () => {
  it('filters and normalizes MCP capabilities before tool use', async () => {
    const gateway = new MockMCPGateway([
      {
        id: 'capability',
        version: '0.0.0',
        serverId: 'local',
        capabilityId: 'search',
        type: 'tool',
        sideEffectLevel: 'read',
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
      sideEffectLevel: 'read',
    });
  });
});
