import { describe, expect, it } from 'vitest';
import { InMemoryEventStore } from '@hypha/core';
import {
  GovernedToolRunner,
  ToolRegistry,
  hashToolContract,
  type ToolContractSnapshot,
  type ToolContractSnapshotStore,
} from './index';

class SnapshotStore implements ToolContractSnapshotStore {
  constructor(private readonly snapshot: ToolContractSnapshot) {}
  async get(id: string): Promise<ToolContractSnapshot | null> {
    return id === this.snapshot.id ? this.snapshot : null;
  }
  async save(): Promise<void> {}
}

describe('EffectiveAgentCapabilitySnapshot enforcement', () => {
  it('fails closed on tool, Agent, and snapshot-ref mismatches before Adapter execution', async () => {
    const registry = new ToolRegistry();
    let calls = 0;
    registry.register(
      {
        id: 'tool.allowed',
        version: '1.0.0',
        description: 'Allowed read',
        inputSchema: { type: 'object', additionalProperties: false },
        sideEffectLevel: 'read',
      },
      async () => {
        calls += 1;
        return { ok: true };
      }
    );
    const spec = registry.getSpec('tool.allowed')!;
    const capabilityBody = {
      runId: 'run-a',
      agentId: 'agent-a',
      principalId: 'user-a',
      createdAt: '2026-07-22T00:00:00.000Z',
      skillRevisions: [],
      allowedToolIds: ['tool.allowed'],
      allowedMCPServerIds: [],
      memoryAccess: 'none' as const,
      allowedExecutionProfiles: [],
      maximumSideEffectLevel: 'read' as const,
      requiresHumanReview: false,
      policyRefs: ['agent.policy'],
    };
    const snapshot: ToolContractSnapshot = {
      id: 'tool-snapshot:run-a',
      runId: 'run-a',
      createdAt: '2026-07-22T00:00:00.000Z',
      toolContracts: [
        {
          toolId: spec.id,
          toolVersion: spec.version,
          toolRevision: spec.revision,
          inputSchemaHash: spec.input.schemaHash,
          sideEffectLevel: spec.sideEffectLevel,
          adapterRef: 'local',
        },
      ],
      effectiveCapabilities: {
        id: 'agent-capability:run-a:agent-a',
        ...capabilityBody,
        snapshotHash: hashToolContract(capabilityBody),
      },
      snapshotHash: 'snapshot-hash',
    };
    const runner = new GovernedToolRunner(registry, new InMemoryEventStore(), undefined, {
      snapshotStore: new SnapshotStore(snapshot),
    });
    const context = {
      runId: 'run-a',
      stepId: 'step-a',
      contractSnapshotRef: snapshot.id,
      capabilitySnapshotRef: snapshot.id,
      agentId: 'agent-a',
      principal: {
        id: 'user-a',
        principalId: 'user-a',
        type: 'user' as const,
        agentId: 'agent-a',
        permissionScopes: ['*'],
      },
    };

    await expect(runner.run({ toolId: spec.id, input: {}, context })).resolves.toMatchObject({
      status: 'completed',
      output: { ok: true },
    });
    await expect(
      runner.run({
        toolId: spec.id,
        input: {},
        context: { ...context, invocationId: 'wrong-agent', agentId: 'agent-b' },
      })
    ).resolves.toMatchObject({
      status: 'denied',
      error: { code: 'TOOL_CAPABILITY_SCOPE_DENIED' },
    });
    await expect(
      runner.run({
        toolId: spec.id,
        input: {},
        context: { ...context, invocationId: 'missing-ref', capabilitySnapshotRef: undefined },
      })
    ).resolves.toMatchObject({
      status: 'denied',
      error: { code: 'TOOL_CAPABILITY_SCOPE_DENIED' },
    });
    expect(calls).toBe(1);
  });
});
