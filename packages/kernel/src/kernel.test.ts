import { describe, expect, it } from 'vitest';
import { createReActStep, REACT_PHASE_ORDER, type ReActAgentSpec } from './index';

describe('@hypha/kernel ReAct contracts', () => {
  it('keeps skills attached to agents and exposes explicit ReAct phases', () => {
    const agent: ReActAgentSpec = {
      id: 'agent',
      version: '0.0.0',
      name: 'Agent',
      modelAlias: 'default-reasoning',
      skillRefs: [{ id: 'review' }],
    };

    expect(agent.skillRefs?.[0]).toEqual({ id: 'review' });
    expect(REACT_PHASE_ORDER).toContain('policy_check');
    expect(createReActStep('step_1', 'reason')).toMatchObject({ phase: 'reason' });
  });
});
