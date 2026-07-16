import { validateDomainPackSpec } from '@hypha/domain';
import { validateFSMProcessSpec } from '@hypha/fsm';
import { getEventRuntime } from '../../services/EventRuntime';
import { normalizeWorkflowExecutionContext } from './context';
import { WorkflowEngine } from './WorkflowEngine';
import type { WorkflowDefinition, WorkflowExecutionContext } from './types';

const baseContext: WorkflowExecutionContext = {
  userId: 'user_test',
  sessionId: 'session_test',
  messages: [],
  variables: {},
  metadata: {},
};

describe('WorkflowEngine conditional execution', () => {
  it('does not execute JavaScript from workflow conditions', async () => {
    delete process.env.HYPHA_CONDITION_EVAL_PROBE;
    const engine = new WorkflowEngine('/tmp/hypha-empty-workflows', false);
    engine.loadWorkflow({
      name: 'safe-condition',
      version: '1.0.0',
      stages: [
        {
          id: 'gate',
          type: 'conditional',
          condition: 'process.env.HYPHA_CONDITION_EVAL_PROBE = "executed"',
          branches: [
            { condition: 'true', then: 'pwned' },
            { condition: 'false', then: 'safe' },
          ],
        },
        { id: 'pwned', type: 'end' },
        { id: 'safe', type: 'end' },
      ],
    });

    const execution = await engine.execute('safe-condition', baseContext);

    expect(process.env.HYPHA_CONDITION_EVAL_PROBE).toBeUndefined();
    expect(execution.status).toBe('completed');
    expect(execution.stageResults.has('safe')).toBe(true);
    expect(execution.stageResults.has('pwned')).toBe(false);
  });

  it('evaluates declared variable operands and comparisons', async () => {
    const workflow: WorkflowDefinition = {
      name: 'variable-condition',
      version: '1.0.0',
      stages: [
        {
          id: 'gate',
          type: 'conditional',
          condition: '$allow === true',
          branches: [
            { condition: 'true', then: 'allowed' },
            { condition: 'false', then: 'blocked' },
          ],
        },
        { id: 'allowed', type: 'end' },
        { id: 'blocked', type: 'end' },
      ],
    };
    const engine = new WorkflowEngine('/tmp/hypha-empty-workflows', false);
    engine.loadWorkflow(workflow);

    const execution = await engine.execute('variable-condition', {
      ...baseContext,
      variables: { allow: true },
    });

    expect(execution.status).toBe('completed');
    expect(execution.stageResults.has('allowed')).toBe(true);
    expect(execution.stageResults.has('blocked')).toBe(false);
  });

  it('adapts workflow definitions into valid DomainPack runtime specs', () => {
    const workflow: WorkflowDefinition = {
      name: 'runtime-contract',
      version: '1.0.0',
      stages: [
        {
          id: 'prepare',
          type: 'preprocessor',
          skills: ['context-enrichment'],
          next: 'search',
        },
        {
          id: 'search',
          type: 'tool-call',
          tools: ['search'],
          next: 'end',
        },
      ],
    };

    const runtimeSpec = getEventRuntime().createRuntimeSpecFromWorkflow(workflow);
    const domainPack = validateDomainPackSpec(runtimeSpec.domainPack);

    expect(domainPack.allowedSkills).toEqual([{ id: 'context-enrichment' }]);
    expect(domainPack.tools).toEqual([
      expect.objectContaining({
        id: 'search',
        sideEffectLevel: 'read',
        source: 'local',
      }),
    ]);
    expect(domainPack.taskSchemas[0]).toMatchObject({
      outputContractRef: 'output.runtime-contract',
      defaultWorkflowRef: 'runtime-contract',
    });
    expect(runtimeSpec.fsm.initialState).toBe('prepare');
  });

  it('deduplicates equivalent branch and default FSM transitions', () => {
    const workflow: WorkflowDefinition = {
      name: 'runtime-duplicate-transition',
      version: '1.0.0',
      stages: [
        {
          id: 'gate',
          type: 'conditional',
          next: 'end',
          branches: [
            { condition: 'true', then: 'execute' },
            { condition: 'false', then: 'end' },
          ],
        },
        { id: 'execute', type: 'tool-call', next: 'end' },
      ],
    };

    const { fsm } = getEventRuntime().createRuntimeSpecFromWorkflow(workflow);

    expect(() => validateFSMProcessSpec(fsm)).not.toThrow();
    expect(
      fsm.transitions.filter(
        (transition) => transition.from === 'gate' && transition.to === 'Completed'
      )
    ).toHaveLength(1);
  });
});

describe('workflow context normalization', () => {
  const workflow: WorkflowDefinition = {
    name: 'context-normalization',
    version: '1.0.0',
    variables: { defaultModel: 'model-from-workflow' },
    stages: [{ id: 'llm', type: 'llm' }],
  };

  it('derives a user message from object input when messages are omitted', () => {
    const context = normalizeWorkflowExecutionContext(
      workflow,
      {
        sessionId: 'session_object_input',
        input: { message: 'hello from object input' },
        variables: { defaultModel: 'model-from-request' },
      },
      'user_test'
    );

    expect(context.messages).toEqual([
      expect.objectContaining({
        role: 'user',
        content: 'hello from object input',
      }),
    ]);
    expect(context.variables.defaultModel).toBe('model-from-request');
  });

  it('derives a user message from top-level message and preserves explicit messages', () => {
    const fromMessage = normalizeWorkflowExecutionContext(
      workflow,
      { message: 'hello from top-level message' },
      'user_test'
    );
    expect(fromMessage.messages[0]).toEqual(
      expect.objectContaining({
        role: 'user',
        content: 'hello from top-level message',
      })
    );

    const explicit = normalizeWorkflowExecutionContext(
      workflow,
      {
        message: 'ignored',
        messages: [{ role: 'user', content: 'explicit message' }],
      },
      'user_test'
    );
    expect(explicit.messages).toEqual([{ role: 'user', content: 'explicit message' }]);

    const nested = normalizeWorkflowExecutionContext(
      workflow,
      {
        input: { messages: [{ role: 'user', content: 'nested explicit message' }] },
      },
      'user_test'
    );
    expect(nested.messages).toEqual([{ role: 'user', content: 'nested explicit message' }]);
  });
});
