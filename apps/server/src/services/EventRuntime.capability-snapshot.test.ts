import {
  createEffectiveAgentCapabilitySnapshot,
  type EffectiveAgentCapabilitySnapshotInput,
} from '@hypha/skills';
import { InMemoryToolContractSnapshotStore } from '@hypha/mcp';
import { RunCapabilitySnapshotRepository } from './EventRuntime';

function capabilityInput(
  overrides: Partial<EffectiveAgentCapabilitySnapshotInput> = {}
): EffectiveAgentCapabilitySnapshotInput {
  return {
    runId: 'run-capability',
    agentId: 'agent-one',
    principalId: 'owner-one',
    createdAt: '2026-07-23T00:00:00.000Z',
    agent: {
      allowedToolIds: ['utility.text'],
      policyRefs: ['agent.policy@1'],
    },
    domain: {
      allowedToolIds: ['utility.text'],
      policyRefs: ['domain.policy@1'],
    },
    activeSkills: [],
    ...overrides,
  };
}

describe('RunCapabilitySnapshotRepository', () => {
  it('recovers the exact pinned snapshot after restart instead of accepting drift', async () => {
    const store = new InMemoryToolContractSnapshotStore();
    const firstRuntime = new RunCapabilitySnapshotRepository(store);
    const pinned = await firstRuntime.pin(
      createEffectiveAgentCapabilitySnapshot(capabilityInput())
    );

    const restartedRuntime = new RunCapabilitySnapshotRepository(store);
    const recovered = await restartedRuntime.get('run-capability');
    expect(recovered).toEqual(pinned);

    const drifted = createEffectiveAgentCapabilitySnapshot(
      capabilityInput({
        agent: {
          allowedToolIds: ['utility.text', 'workspace.read_file'],
          policyRefs: ['agent.policy@floating'],
        },
      })
    );
    await expect(restartedRuntime.pin(drifted)).resolves.toEqual(pinned);
  });

  it('fails closed when the persisted carrier is modified', async () => {
    const store = new InMemoryToolContractSnapshotStore();
    const firstRuntime = new RunCapabilitySnapshotRepository(store);
    await firstRuntime.pin(createEffectiveAgentCapabilitySnapshot(capabilityInput()));
    const carrierId = 'runtime-capability-snapshot:run-capability';
    const carrier = await store.get(carrierId);
    if (!carrier?.effectiveCapabilities) throw new Error('fixture carrier missing');
    carrier.effectiveCapabilities.allowedToolIds.push('attacker.tool');
    await store.save(carrier);

    const restartedRuntime = new RunCapabilitySnapshotRepository(store);
    await expect(restartedRuntime.get('run-capability')).rejects.toMatchObject({
      code: 'RUNTIME_CAPABILITY_SNAPSHOT_CORRUPT',
    });
  });
});
