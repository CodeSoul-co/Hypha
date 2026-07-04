import { describe, expect, it } from 'vitest';
import {
  compileWorkflowToFSM,
  domainPackSpecDefinition,
  domainSpecJsonSchemas,
  initializeDomainSession,
  reasoningSpecDefinition,
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
          defaultReasoningProfileRef: 'structured-reasoning',
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
      reasoningProfileRef: 'structured-reasoning',
    });
  });

  it('exports Stage1 DomainPack and Workflow spec schemas with minimal examples', () => {
    expect(validateWorkflowSpec(workflowSpecDefinition.example).id).toBe('workflow.default');
    expect(reasoningSpecDefinition.parse(reasoningSpecDefinition.example).id).toBe(
      'reasoning.default'
    );
    expect(validateDomainPackSpec(domainPackSpecDefinition.example).id).toBe('domain.default');
    expect(domainSpecJsonSchemas.WorkflowSpec.required).toContain('states');
    expect(domainSpecJsonSchemas.ReasoningSpec.required).toContain('thinkingMode');
    expect(domainSpecJsonSchemas.DomainPackSpec.required).toContain('workflows');
    expect(domainSpecJsonSchemas.DomainPackSpec.properties).toMatchObject({
      reasoningProfiles: { type: 'array' },
      evaluationProfiles: { type: 'array' },
      regressionCases: { type: 'array' },
      deploymentProfile: { type: 'object' },
    });
  });

  it('rejects a DomainPack whose default workflow is not declared', () => {
    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        defaultWorkflow: 'missing',
      })
    ).toThrow(/Default workflow not found/);
  });

  it('rejects a DomainPack whose default reasoning profile is not declared', () => {
    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        defaultReasoningProfile: 'missing-reasoning',
      })
    ).toThrow(/Default reasoning profile not found/);
  });

  it('validates nested profile specs instead of accepting arbitrary objects', () => {
    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        tools: [{ id: 'broken-tool' }],
      })
    ).toThrow();

    expect(
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        tools: [
          {
            id: 'tool.search',
            version: '0.0.0',
            description: 'Search',
            inputSchema: { type: 'object' },
            sideEffectLevel: 'read',
          },
        ],
        mcpProfiles: [
          {
            id: 'mcp.local',
            version: '0.0.0',
            servers: [{ id: 'local', mode: 'local' }],
          },
        ],
        memoryProfiles: [
          {
            id: 'memory.local',
            version: '0.0.0',
            providers: [{ id: 'structured', type: 'structured', providerRef: 'local' }],
            memoryTypes: ['working'],
          },
        ],
        reasoningProfiles: [
          {
            id: 'reasoning.local',
            version: '0.0.0',
            thinkingMode: 'structured',
            agenticMode: 'react',
            maxSteps: 3,
            persist: 'summary_only',
          },
        ],
        defaultReasoningProfile: 'reasoning.local',
        evaluationProfiles: [
          {
            id: 'eval.schema',
            version: '0.0.0',
            type: 'schema',
            deterministic: true,
          },
        ],
        deploymentProfile: {
          id: 'deploy.local',
          version: '0.0.0',
          mode: 'local',
          runtimeMode: 'single-user',
        },
      }).id
    ).toBe('domain.default');
  });
});
