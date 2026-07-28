import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { InMemoryEventStore } from '@hypha/core';
import { GovernedToolRunner, ToolRegistry } from '@hypha/tools';
import { FileToolRuntimeStore } from './index';

describe('@hypha/adapters-local FileToolRuntimeStore', () => {
  it('persists approval and resumes the original invocation after a runtime restart', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-tool-runtime-'));
    const filename = path.join(root, 'tool-runtime.json');
    let calls = 0;
    const registry = new ToolRegistry();
    registry.register(
      {
        id: 'tool.persisted-write',
        version: '0.0.0',
        description: 'Persisted write test',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'write',
        permissionScope: ['record:write'],
        idempotencyPolicy: { mode: 'required' },
        humanApprovalPolicy: { required: true, reason: 'confirm persisted write' },
      },
      async () => {
        calls += 1;
        return { calls };
      }
    );
    const request = {
      toolId: 'tool.persisted-write',
      input: { value: 1 },
      context: {
        runId: 'run_persisted',
        stepId: 'write',
        invocationId: 'invocation_persisted',
        idempotencyKey: 'invocation_persisted',
        principal: {
          id: 'owner',
          type: 'user' as const,
          permissionScopes: ['record:write'],
        },
      },
    };

    try {
      const firstStore = new FileToolRuntimeStore({ filename });
      const firstRunner = new GovernedToolRunner(registry, new InMemoryEventStore(), undefined, {
        approvalStore: firstStore,
        invocationStore: firstStore,
      });
      await expect(firstRunner.run(request)).resolves.toMatchObject({
        status: 'human_review_required',
        invocationId: 'invocation_persisted',
      });
      expect(calls).toBe(0);

      const restartedStore = new FileToolRuntimeStore({ filename });
      const restartedRunner = new GovernedToolRunner(
        registry,
        new InMemoryEventStore(),
        undefined,
        {
          approvalStore: restartedStore,
          invocationStore: restartedStore,
        }
      );
      await expect(
        restartedRunner.approveAndResume('invocation_persisted', 'owner')
      ).resolves.toMatchObject({
        status: 'completed',
        output: { calls: 1 },
      });

      const reopenedStore = new FileToolRuntimeStore({ filename });
      await expect(reopenedStore.get('invocation_persisted')).resolves.toMatchObject({
        status: 'completed',
        executionCycle: 2,
        result: { status: 'completed', output: { calls: 1 } },
      });
      expect(calls).toBe(1);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});
