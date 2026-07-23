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

  it('enforces an exact subject-bound approval when the effective snapshot requires review', async () => {
    const registry = new ToolRegistry();
    registry.register(
      {
        id: 'tool.reviewed',
        version: '1.0.0',
        description: 'Reviewed read',
        inputSchema: { type: 'object', additionalProperties: false },
        sideEffectLevel: 'read',
      },
      async () => ({ ok: true })
    );
    const spec = registry.getSpec('tool.reviewed')!;
    const effectiveBody = {
      runId: 'run-review',
      agentId: 'agent-review',
      principalId: 'user-review',
      createdAt: '2026-07-22T00:00:00.000Z',
      skillRevisions: [
        { id: 'skill.untrusted', version: '1.0.0', contentHash: 'a'.repeat(64) },
      ],
      allowedToolIds: [spec.id],
      allowedMCPServerIds: [],
      memoryAccess: 'none' as const,
      allowedExecutionProfiles: [],
      maximumSideEffectLevel: 'read' as const,
      requiresHumanReview: true,
      policyRefs: ['skill.review'],
    };
    const subjectHash = hashToolContract(effectiveBody);
    const snapshot: ToolContractSnapshot = {
      id: 'tool-snapshot:run-review',
      runId: 'run-review',
      createdAt: effectiveBody.createdAt,
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
        id: 'agent-capability:run-review:agent-review',
        ...effectiveBody,
        snapshotHash: subjectHash,
      },
      snapshotHash: 'contract-snapshot-hash',
    };
    const runner = new GovernedToolRunner(registry, new InMemoryEventStore(), undefined, {
      snapshotStore: new SnapshotStore(snapshot),
    });
    const context = {
      runId: 'run-review',
      stepId: 'step-review',
      contractSnapshotRef: snapshot.id,
      capabilitySnapshotRef: snapshot.id,
      agentId: 'agent-review',
      principal: {
        id: 'user-review',
        principalId: 'user-review',
        type: 'user' as const,
        agentId: 'agent-review',
        permissionScopes: ['*'],
      },
    };

    await expect(
      runner.run({ toolId: spec.id, input: {}, context })
    ).resolves.toMatchObject({
      status: 'denied',
      error: {
        code: 'TOOL_CAPABILITY_SCOPE_DENIED',
        message: expect.stringContaining('exact, unexpired human approval'),
      },
    });
    await expect(
      runner.run({
        toolId: spec.id,
        input: {},
        context: {
          ...context,
          invocationId: 'wrong-subject',
          capabilityApprovals: [
            {
              taskId: 'review:wrong',
              subjectType: 'effective_capability_snapshot',
              subjectHash: '0'.repeat(64),
              snapshotId: snapshot.effectiveCapabilities!.id,
              runId: context.runId,
              agentId: context.agentId,
              principalId: context.principal.principalId,
              approvedBy: 'reviewer',
              approvedAt: new Date().toISOString(),
              expiresAt: new Date(Date.now() + 60_000).toISOString(),
              status: 'approved',
            },
          ],
        },
      })
    ).resolves.toMatchObject({ status: 'denied' });
    await expect(
      runner.run({
        toolId: spec.id,
        input: {},
        context: {
          ...context,
          invocationId: 'exact-subject',
          capabilityApprovals: [
            {
              taskId: 'review:approved',
              subjectType: 'effective_capability_snapshot',
              subjectHash,
              snapshotId: snapshot.effectiveCapabilities!.id,
              runId: context.runId,
              agentId: context.agentId,
              principalId: context.principal.principalId,
              approvedBy: 'reviewer',
              approvedAt: new Date().toISOString(),
              expiresAt: new Date(Date.now() + 60_000).toISOString(),
              status: 'approved',
            },
          ],
        },
      })
    ).resolves.toMatchObject({ status: 'completed', output: { ok: true } });
  });
});
