import { describe, expect, it } from 'vitest';
import {
  compileWorkflowToFSM,
  domainPackSpecDefinition,
  domainSpecJsonSchemas,
  initializeDomainSession,
  validateDomainPackSpec,
  validateWorkflowSpec,
  workflowSpecDefinition,
  type DomainPackSpec,
} from './index';

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
            {
              id: 'ReasonAct',
              goal: 'Run ReAct loop',
              allowedSkills: ['review'],
              timeoutPolicy: { timeoutMs: 1000, onTimeout: 'retry' },
              retryPolicy: { maxAttempts: 2 },
            },
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
    expect(fsm.states[1]).toMatchObject({
      timeoutPolicy: { timeoutMs: 1000, onTimeout: 'retry' },
      retryPolicy: { maxAttempts: 2 },
    });
    expect(fsm.transitions[1]).toMatchObject({ from: 'ReasonAct', to: 'Finalize' });
  });

  it('initializes runtime session metadata from DomainPack SessionProfile without embedding Session', () => {
    const domainPack: DomainPackSpec = {
      id: 'minimal',
      version: '0.0.0',
      name: 'Minimal',
      taskSchemas: [],
      workflows: [],
      sessionProfiles: [
        {
          id: 'default',
          version: '0.0.0',
          defaultMetadata: { locale: 'en' },
          defaultMemoryProfileRef: 'local-memory',
        },
      ],
    };

    expect(
      initializeDomainSession(domainPack, {
        profileId: 'default',
        metadata: { requestId: 'req_1' },
      })
    ).toMatchObject({
      domainPackRef: { id: 'minimal', version: '0.0.0' },
      sessionProfileRef: { id: 'default', version: '0.0.0' },
      metadata: { locale: 'en', requestId: 'req_1' },
      memoryProfileRef: 'local-memory',
    });
  });

  it('exports Stage1 DomainPack and Workflow spec schemas with minimal examples', () => {
    expect(validateWorkflowSpec(workflowSpecDefinition.example).id).toBe('workflow.default');
    expect(validateDomainPackSpec(domainPackSpecDefinition.example).id).toBe('domain.default');
    expect(domainSpecJsonSchemas.WorkflowSpec.required).toContain('states');
    expect(domainSpecJsonSchemas.DomainPackSpec.required).toContain('workflows');
  });

  it('rejects a DomainPack whose default workflow is not declared', () => {
    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        defaultWorkflow: 'missing',
      })
    ).toThrow(/Default workflow not found/);
  });
});
