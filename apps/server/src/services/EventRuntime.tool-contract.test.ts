import type { EffectiveAgentCapabilitySnapshot, ToolSpec } from '@hypha/tools';
import { capabilityPolicyHash, mergeManagedToolSpec } from './EventRuntime';

const inputSchema = {
  type: 'object' as const,
  properties: { value: { type: 'string' as const } },
  required: ['value'],
  additionalProperties: false,
};

describe('EventRuntime managed Tool contract identity', () => {
  it('compares immutable capability policy independently of generated identity timestamps', () => {
    const snapshot: EffectiveAgentCapabilitySnapshot = {
      id: 'capability:first',
      runId: 'run:capability',
      agentId: 'agent:capability',
      principalId: 'user:capability',
      createdAt: '2026-08-01T00:00:00.000Z',
      skillRevisions: [],
      allowedToolIds: ['utility.text'],
      allowedMCPServerIds: [],
      memoryAccess: 'read',
      allowedExecutionProfiles: [],
      maximumSideEffectLevel: 'read',
      policyRefs: ['policy:default'],
      requiresHumanReview: false,
      snapshotHash: 'sha256:test-capability',
    };

    expect(
      capabilityPolicyHash({
        ...snapshot,
        id: 'capability:regenerated',
        createdAt: '2026-08-01T00:01:00.000Z',
      })
    ).toBe(capabilityPolicyHash(snapshot));
    expect(capabilityPolicyHash({ ...snapshot, allowedToolIds: [] })).not.toBe(
      capabilityPolicyHash(snapshot)
    );
  });

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
