import { describe, expect, it } from 'vitest';
import { MockModelProvider, ModelRegistry } from './index';

describe('@hypha/models provider contracts', () => {
  it('routes normalized ModelRequest through provider abstraction', async () => {
    const registry = new ModelRegistry();
    const provider = new MockModelProvider();
    registry.register(provider);

    await expect(
      registry.get('mock')?.generate({
        runId: 'run_1',
        stepId: 'step_1',
        modelAlias: 'default-fast',
        input: [{ role: 'user', content: 'hello' }],
      })
    ).resolves.toMatchObject({
      id: 'run_1:step_1:mock-response',
      usage: { totalTokens: 0 },
    });
  });
});
