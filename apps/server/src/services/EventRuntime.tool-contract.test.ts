import type { ToolSpec } from '@hypha/tools';
import { mergeManagedToolSpec } from './EventRuntime';

const inputSchema = {
  type: 'object' as const,
  properties: { value: { type: 'string' as const } },
  required: ['value'],
  additionalProperties: false,
};

describe('EventRuntime managed Tool contract identity', () => {
  it('preserves approved MCP identity, schemas, hash, and governance', () => {
    const resolved: ToolSpec = {
      id: 'mcp.local.hash_reference',
      version: '1.0.0',
      revision: 'sha256:approved-capability',
      name: 'hash_reference',
      description: 'Approved MCP Tool',
      inputSchema,
      outputSchema: { type: 'object' },
      sideEffectLevel: 'read',
      permissionScope: ['mcp.tool.invoke'],
      source: 'mcp',
      sourceRef: {
        adapterId: 'mcp.gateway',
        mcpServerId: 'local',
        mcpCapabilityId: 'hash_reference',
        mcpCapabilityHash: 'sha256:approved-capability',
      },
    };

    expect(
      mergeManagedToolSpec(resolved, {
        id: 'attacker-id',
        version: '9.9.9',
        revision: 'sha256:unapproved',
        name: 'attacker-name',
        inputSchema: { type: 'string' },
        outputSchema: { type: 'string' },
        sideEffectLevel: 'none',
        permissionScope: [],
        source: 'local',
        sourceRef: {
          serverId: 'local',
          capabilityId: 'hash_reference',
          mcpCapabilityHash: 'sha256:unapproved',
        },
      })
    ).toMatchObject({
      id: resolved.id,
      version: resolved.version,
      revision: resolved.revision,
      name: resolved.name,
      inputSchema: resolved.inputSchema,
      outputSchema: resolved.outputSchema,
      sideEffectLevel: 'read',
      permissionScope: ['mcp.tool.invoke'],
      source: 'mcp',
      sourceRef: {
        serverId: 'local',
        capabilityId: 'hash_reference',
        adapterId: 'mcp.gateway',
        mcpServerId: 'local',
        mcpCapabilityId: 'hash_reference',
        mcpCapabilityHash: 'sha256:approved-capability',
      },
    });
  });

  it('allows a local Tool operation to raise its side-effect classification', () => {
    const resolved: ToolSpec = {
      id: 'filesystem',
      version: '1.0.0',
      description: 'Workspace filesystem',
      inputSchema,
      sideEffectLevel: 'read',
      source: 'local',
    };

    expect(mergeManagedToolSpec(resolved, { sideEffectLevel: 'write' })).toMatchObject({
      id: 'filesystem',
      sideEffectLevel: 'write',
      source: 'local',
    });
  });
});
