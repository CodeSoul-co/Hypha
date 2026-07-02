import { describe, expect, it } from 'vitest';
import { InMemoryEventStore } from '@hypha/core';
import { GovernedToolRunner, ToolRegistry } from './index';

describe('@hypha/tools governed runner', () => {
  it('records policy and denies high-risk side effects by default', async () => {
    const registry = new ToolRegistry();
    registry.register(
      {
        id: 'delete-file',
        version: '0.0.0',
        description: 'Deletes a file',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'irreversible',
      },
      async () => ({ ok: true })
    );
    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace);

    const result = await runner.run({
      toolId: 'delete-file',
      input: { path: '/tmp/example' },
      context: { runId: 'run_1', stepId: 'step_1' },
    });

    expect(result.status).toBe('denied');
    await expect(trace.list({ runId: 'run_1' })).resolves.toHaveLength(2);
  });
});
