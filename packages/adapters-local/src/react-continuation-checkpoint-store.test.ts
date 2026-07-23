import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, expect, it } from 'vitest';
import type { ReActContinuationCheckpoint } from '@hypha/kernel';
import { SQLiteReActContinuationCheckpointStore } from './react-continuation-checkpoint-store';

const scopeHash = 'sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';

function checkpoint(
  stepSequence: number,
  overrides: Partial<ReActContinuationCheckpoint> = {}
): ReActContinuationCheckpoint {
  return {
    version: '1.0.0',
    runId: 'run.sqlite-react',
    stepId: 'react',
    scopeHash,
    agentRef: { id: 'agent.default', version: '1.0.0' },
    nextPhase: 'reason',
    messages: [{ role: 'user', content: 'continue safely' }],
    iterations: 1,
    modelCalls: 2,
    toolCalls: 1,
    totalTokens: 40,
    toolInvocationSequence: 1,
    stepSequence,
    consecutiveNoProgress: 0,
    createdAt: '2026-07-23T10:00:00.000Z',
    updatedAt: `2026-07-23T10:00:${String(stepSequence).padStart(2, '0')}.000Z`,
    ...overrides,
  };
}

describe('SQLiteReActContinuationCheckpointStore', () => {
  it('survives reopen and enforces idempotent monotonic checkpoints', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-react-checkpoint-'));
    const filename = path.join(root, 'runtime.sqlite');
    try {
      const firstStore = new SQLiteReActContinuationCheckpointStore({ filename });
      const first = checkpoint(10, {
        nextPhase: 'act',
        pendingAction: {
          type: 'tool',
          target: 'tool.persisted',
          input: { operation: 'resume' },
        },
        pendingToolInvocationId: 'run.sqlite-react:react:tool:tool.persisted:1',
      });
      await expect(firstStore.put(first, 'checkpoint:10')).resolves.toMatchObject({
        reused: false,
        checkpoint: { stepSequence: 10 },
      });
      await expect(firstStore.put(first, 'checkpoint:10')).resolves.toMatchObject({
        reused: true,
      });
      firstStore.close();

      const reopened = new SQLiteReActContinuationCheckpointStore({ filename });
      await expect(reopened.get(first.runId, first.stepId, scopeHash)).resolves.toEqual(first);
      const second = checkpoint(20, {
        iterations: 2,
        modelCalls: 3,
        toolCalls: 2,
        toolInvocationSequence: 2,
      });
      await expect(reopened.put(second, 'checkpoint:20')).resolves.toMatchObject({
        reused: false,
        checkpoint: { stepSequence: 20, toolCalls: 2 },
      });
      await expect(reopened.put(checkpoint(9), 'checkpoint:stale')).rejects.toMatchObject({
        code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
      });
      const otherScopeHash =
        'sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      await expect(reopened.get(first.runId, first.stepId, otherScopeHash)).rejects.toMatchObject({
        code: 'RUNTIME_CHECKPOINT_FAILED',
      });
      await expect(
        reopened.put(checkpoint(21, { scopeHash: otherScopeHash }), 'checkpoint:wrong-scope')
      ).rejects.toMatchObject({ code: 'RUNTIME_CHECKPOINT_FAILED' });
      await expect(reopened.delete(first.runId, first.stepId, scopeHash, 10)).rejects.toMatchObject(
        {
          code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
        }
      );
      await expect(reopened.delete(first.runId, first.stepId, scopeHash, 20)).resolves.toBe(true);
      await expect(reopened.get(first.runId, first.stepId, scopeHash)).resolves.toBeNull();
      reopened.close();
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('rejects same-step corruption and cross-key payloads', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-react-checkpoint-'));
    const store = new SQLiteReActContinuationCheckpointStore({
      filename: path.join(root, 'runtime.sqlite'),
    });
    try {
      await store.put(checkpoint(10), 'checkpoint:10');
      await expect(
        store.put(
          checkpoint(10, {
            messages: [{ role: 'user', content: 'different content' }],
          }),
          'checkpoint:10:different'
        )
      ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
      await expect(
        store.put(
          checkpoint(11, {
            nextPhase: 'act',
            pendingAction: undefined,
          }),
          'checkpoint:invalid'
        )
      ).rejects.toThrow();
    } finally {
      store.close();
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('rejects checkpoints that exceed the configured serialized byte limit', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-react-checkpoint-'));
    const store = new SQLiteReActContinuationCheckpointStore({
      filename: path.join(root, 'runtime.sqlite'),
      maxCheckpointBytes: 512,
    });
    try {
      await expect(
        store.put(
          checkpoint(10, {
            messages: [{ role: 'user', content: 'x'.repeat(1_000) }],
          }),
          'checkpoint:oversized'
        )
      ).rejects.toMatchObject({ code: 'RUNTIME_RESOURCE_EXHAUSTED' });
    } finally {
      store.close();
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});
