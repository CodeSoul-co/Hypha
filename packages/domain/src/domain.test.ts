import { describe, expect, it } from 'vitest';
import { compileWorkflowToFSM, type DomainPackSpec } from './index';

describe('@hypha/domain workflow compiler', () => {
  it('compiles a DomainPack WorkflowSpec into an FSMProcessSpec', () => {
    const domainPack: DomainPackSpec = {
      id: 'minimal',
      version: '0.0.0',
      name: 'Minimal',
      taskSchemas: [
        {
          id: 'task',
          version: '0.0.0',
          taskType: 'generic',
          inputSchema: { type: 'object' },
          outputContractRef: 'answer',
        },
      ],
      workflows: [
        {
          id: 'intake-reason-finalize',
          version: '0.0.0',
          initialState: 'Intake',
          terminalStates: ['Finalize'],
          states: [
            { id: 'Intake', goal: 'Read task input' },
            { id: 'ReasonAct', goal: 'Run ReAct loop', allowedSkills: ['review'] },
            { id: 'Finalize', goal: 'Return final output' },
          ],
          transitions: [
            { from: 'Intake', to: 'ReasonAct' },
            { from: 'ReasonAct', to: 'Finalize', guard: 'verified' },
          ],
        },
      ],
      defaultWorkflow: 'intake-reason-finalize',
    };

    const fsm = compileWorkflowToFSM(domainPack);

    expect(fsm.id).toBe('minimal.intake-reason-finalize.fsm');
    expect(fsm.states.map((state) => state.id)).toEqual(['Intake', 'ReasonAct', 'Finalize']);
    expect(fsm.transitions[1]).toMatchObject({ from: 'ReasonAct', to: 'Finalize' });
  });
});
