import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { describe, expect, it } from 'vitest';
import {
  applyDomainAgentPatch,
  businessRuleSpecDefinition,
  compileWorkflowToFSM,
  compileDomainPackToHarnessedSystem,
  DomainPackRegistry,
  domainPackSpecDefinition,
  domainSpecJsonSchemas,
  extendDomainPack,
  initializeDomainSession,
  LocalDomainPackLoader,
  parseDomainPackDocument,
  reasoningSpecDefinition,
  resolveWorkflowToolExecutionScope,
  validateDomainPackSpec,
  validateWorkflowSpec,
  WorkflowCompiler,
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
      outputContracts: [{ id: 'answer', version: '0.0.0', schema: { type: 'object' } }],
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
    expect(new WorkflowCompiler().compile(domainPack).id).toBe(
      'minimal.intake-reason-finalize.fsm'
    );
  });

  it('initializes runtime session metadata from DomainPack SessionProfile without embedding Session', () => {
    const domainPack: DomainPackSpec = {
      id: 'minimal',
      version: '0.0.0',
      name: 'Minimal',
      taskSchemas: [],
      outputContracts: [],
      workflows: [],
      sessionProfiles: [
        {
          id: 'default',
          version: '0.0.0',
          defaultMetadata: { locale: 'en' },
          defaultMemoryProfileRef: 'local-memory',
          defaultContextProfileRef: 'local-context',
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
      contextProfileRef: 'local-context',
      reasoningProfileRef: 'structured-reasoning',
    });
  });

  it('exports DomainPack and Workflow spec schemas with reusable examples', () => {
    expect(validateWorkflowSpec(workflowSpecDefinition.example).id).toBe('workflow.default');
    expect(reasoningSpecDefinition.parse(reasoningSpecDefinition.example).id).toBe(
      'reasoning.default'
    );
    expect(businessRuleSpecDefinition.parse(businessRuleSpecDefinition.example).id).toBe(
      'rule.output-contract'
    );
    expect(validateDomainPackSpec(domainPackSpecDefinition.example).id).toBe('domain.default');
    expect(domainSpecJsonSchemas.WorkflowSpec.required).toContain('states');
    expect(domainSpecJsonSchemas.ReasoningSpec.required).toContain('thinkingMode');
    expect(domainSpecJsonSchemas.BusinessRuleSpec.required).toContain('scope');
    expect(domainSpecJsonSchemas.DomainPackSpec.required).toContain('workflows');
    expect(domainSpecJsonSchemas.DomainPackSpec.required).toContain('outputContracts');
    const workflowStateProperties =
      domainSpecJsonSchemas.WorkflowSpec.properties?.states?.items?.properties ?? {};
    expect(workflowStateProperties.requiredSkills).toMatchObject({ type: 'array' });
    expect(domainSpecJsonSchemas.DomainPackSpec.properties).toMatchObject({
      allowedSkills: { type: 'array' },
      defaultSkills: { type: 'array' },
      skillPolicies: { type: 'array' },
      tools: { type: 'array' },
      toolProfiles: { type: 'array' },
      mcpProfiles: { type: 'array' },
      memoryProfiles: { type: 'array' },
      contextProfiles: { type: 'array' },
      reasoningProfiles: { type: 'array' },
      businessRules: { type: 'array' },
      evaluationProfiles: { type: 'array' },
      regressionCases: { type: 'array' },
      deploymentProfile: { type: 'object' },
    });
  });

  it('validates Tool profiles and state-level versioned Tool bindings', () => {
    const example = domainPackSpecDefinition.example;
    expect(validateDomainPackSpec(example).toolProfiles?.[0]).toMatchObject({
      id: 'tools.default',
      contractSnapshotMode: 'run',
      lazyLoad: true,
    });
    expect(() =>
      validateDomainPackSpec({
        ...example,
        toolProfiles: [
          {
            ...example.toolProfiles![0],
            toolRefs: [{ id: 'tool.missing', version: '1.0.0' }],
          },
        ],
      })
    ).toThrow(/Tool profile Tool not found/);
  });

  it('rejects invalid versioned Tool, profile, approval, and permission bindings', () => {
    const example = domainPackSpecDefinition.example;
    expect(() =>
      validateDomainPackSpec({
        ...example,
        toolProfiles: [
          {
            ...example.toolProfiles![0],
            toolRefs: [{ id: 'tool.search', version: '9.9.9' }],
          },
        ],
      })
    ).toThrow(/Tool profile Tool version mismatch/);

    expect(() =>
      validateDomainPackSpec({
        ...example,
        workflows: example.workflows.map((workflow) => ({
          ...workflow,
          states: workflow.states.map((state) =>
            state.id === 'Reasoning'
              ? { ...state, toolProfileRefs: [{ id: 'tools.missing', version: '1.0.0' }] }
              : state
          ),
        })),
      })
    ).toThrow(/Workflow state Tool profile not found/);

    expect(() =>
      validateDomainPackSpec({
        ...example,
        workflows: example.workflows.map((workflow) => ({
          ...workflow,
          states: workflow.states.map((state) =>
            state.id === 'Reasoning'
              ? {
                  ...state,
                  humanApprovalPolicyRef: { id: 'policy.missing', version: '1.0.0' },
                }
              : state
          ),
        })),
      })
    ).toThrow(/Workflow state human approval policy not found/);

    expect(() =>
      validateDomainPackSpec({
        ...example,
        tools: example.tools!.map((tool) =>
          tool.id === 'tool.search'
            ? {
                ...tool,
                permissionScope: ['search.execute'],
              }
            : tool
        ),
        workflows: example.workflows.map((workflow) => ({
          ...workflow,
          states: workflow.states.map((state) =>
            state.id === 'Reasoning'
              ? {
                  ...state,
                  allowedToolRefs: [{ id: 'tool.search', version: '0.0.0' }],
                  permissionScopes: [],
                }
              : state
          ),
        })),
      })
    ).toThrow(/Tool scope exceeds declared permissionScopes/);
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

  it('rejects DomainPack skill bindings outside allowedSkills', () => {
    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        allowedSkills: [{ id: 'skill.allowed', version: '0.0.0' }],
        defaultSkills: [{ id: 'skill.missing', version: '0.0.0' }],
        skillPolicies: [],
      })
    ).toThrow(/Default skill is not allowed/);

    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        allowedSkills: [{ id: 'skill.allowed', version: '0.0.0' }],
        defaultSkills: [],
        skillPolicies: [],
        workflows: [
          {
            ...domainPackSpecDefinition.example.workflows[0],
            states: domainPackSpecDefinition.example.workflows[0].states.map((state, index) =>
              index === 0 ? { ...state, allowedSkills: ['skill.missing'] } : state
            ),
          },
        ],
      })
    ).toThrow(/allows unknown skill/);

    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        allowedSkills: [{ id: 'skill.allowed', version: '0.0.0' }],
        defaultSkills: [],
        skillPolicies: [],
        workflows: [
          {
            ...domainPackSpecDefinition.example.workflows[0],
            states: domainPackSpecDefinition.example.workflows[0].states.map((state, index) =>
              index === 0 ? { ...state, requiredSkills: ['skill.missing'] } : state
            ),
          },
        ],
      })
    ).toThrow(/requires unknown skill/);

    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        workflows: [
          {
            ...domainPackSpecDefinition.example.workflows[0],
            states: domainPackSpecDefinition.example.workflows[0].states.map((state, index) =>
              index === 1
                ? {
                    ...state,
                    allowedSkills: [],
                    requiredSkills: ['skill.context-enrichment'],
                  }
                : state
            ),
          },
        ],
      })
    ).toThrow(/requires skill outside state allowedSkills/);
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
            id: 'mcp.default',
            version: '0.0.0',
            servers: [{ id: 'local', mode: 'local' }],
          },
        ],
        memoryProfiles: [
          {
            id: 'memory.default',
            version: '0.0.0',
            providers: [{ id: 'structured', type: 'structured', providerRef: 'local' }],
            memoryTypes: ['working'],
          },
        ],
        reasoningProfiles: [
          {
            id: 'reasoning.default',
            version: '0.0.0',
            thinkingMode: 'structured',
            agenticMode: 'react',
            maxSteps: 3,
            persist: 'summary_only',
          },
        ],
        defaultReasoningProfile: 'reasoning.default',
        evaluationProfiles: [
          {
            id: 'eval.output-schema',
            version: '0.0.0',
            type: 'output_contract',
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

  it('compiles a DomainPack into FSM, harness system, and Agent patch bindings', () => {
    const compiled = compileDomainPackToHarnessedSystem(domainPackSpecDefinition.example, {
      agentRef: { id: 'agent.default', version: '0.0.0' },
      metadata: { requestSource: 'test' },
    });

    expect(compiled.fsmProcess).toMatchObject({
      id: 'domain.default.workflow.default.fsm',
      initialState: 'Intake',
      terminalStates: ['Completed', 'Failed'],
    });
    expect(compiled.harnessedSystem).toMatchObject({
      id: 'domain.default.workflow.default.system',
      agentRef: { id: 'agent.default', version: '0.0.0' },
      fsmProcessRef: { id: 'domain.default.workflow.default.fsm', version: '0.0.0' },
      memoryRefs: [{ id: 'memory.default', version: '0.0.0' }],
      toolRefs: [{ id: 'tool.search', version: '0.0.0' }],
      skillRefs: [{ id: 'skill.context-enrichment', version: '0.0.0' }],
      mcpRefs: [{ id: 'mcp.default', version: '0.0.0' }],
      contextRefs: [{ id: 'context.default', version: '0.0.0' }],
      reasoningRefs: [{ id: 'reasoning.default', version: '0.0.0' }],
      outputContractRefs: [{ id: 'output.default', version: '0.0.0' }],
      businessRuleRefs: [{ id: 'rule.output-contract', version: '0.0.0' }],
      deploymentRef: { id: 'deployment.local', version: '0.0.0' },
    });
    expect(compiled.agentPatch).toMatchObject({
      skillRefs: [{ id: 'skill.context-enrichment', version: '0.0.0' }],
      toolRefs: ['tool.search'],
      memoryProfileRef: 'memory.default',
      mcpProfileRef: 'mcp.default',
      contextSpecRef: { id: 'context.default', version: '0.0.0' },
      reasoningProfileRef: 'reasoning.default',
      policyRefs: ['policy.default'],
    });
    expect(compiled.bindings).toMatchObject({
      outputContract: { id: 'output.default' },
      mcpProfile: { id: 'mcp.default' },
      reasoningProfile: { id: 'reasoning.default' },
      businessRules: [{ id: 'rule.output-contract' }],
    });
    const patchedAgent = applyDomainAgentPatch(
      {
        id: 'agent.default',
        version: '0.0.0',
        name: 'Default Agent',
        modelAlias: 'default-chat',
      },
      compiled.agentPatch
    );
    expect(patchedAgent).toMatchObject({
      skillRefs: [{ id: 'skill.context-enrichment', version: '0.0.0' }],
      toolRefs: ['tool.search'],
      memoryProfileRef: 'memory.default',
      contextSpecRef: { id: 'context.default', version: '0.0.0' },
      policyRefs: ['policy.default'],
      metadata: {
        mcpProfileRef: 'mcp.default',
        mcpProfileSpecRef: { id: 'mcp.default', version: '0.0.0' },
        reasoningProfileRef: 'reasoning.default',
        reasoningProfileSpecRef: { id: 'reasoning.default', version: '0.0.0' },
      },
    });
    expect(
      compiled.bindings.workflowStates.find((state) => state.stateId === 'Reasoning')
    ).toMatchObject({
      allowedTools: ['tool.search'],
      allowedSkills: ['skill.context-enrichment'],
      requiredSkills: ['skill.context-enrichment'],
      allowedMCPProfiles: ['mcp.default'],
      policyRefs: ['policy.default'],
      evaluationRefs: ['eval.output-schema'],
    });
    expect(
      resolveWorkflowToolExecutionScope(compiled.bindings.workflowStates, 'Reasoning')
    ).toEqual({
      fsmState: 'Reasoning',
      allowedToolIds: ['tool.search'],
      policyRefs: ['policy.default'],
    });
    expect(() =>
      resolveWorkflowToolExecutionScope(compiled.bindings.workflowStates, 'Unknown')
    ).toThrow('Workflow state binding not found: Unknown');
  });

  it('compiles only profile-selected tools and gives state denies precedence', () => {
    const example = domainPackSpecDefinition.example;
    const compiled = compileDomainPackToHarnessedSystem(
      {
        ...example,
        tools: [
          ...example.tools!,
          {
            ...example.tools![0],
            id: 'tool.write',
            version: '1.0.0',
            description: 'Write a governed document.',
            sideEffectLevel: 'write',
            permissionScope: ['document:write'],
          },
          {
            ...example.tools![0],
            id: 'tool.unused',
            version: '1.0.0',
            description: 'Declared but not selected.',
          },
        ],
        toolProfiles: [
          ...example.toolProfiles!,
          {
            id: 'tools.reasoning',
            version: '1.0.0',
            toolRefs: [
              { id: 'tool.search', version: '0.0.0' },
              { id: 'tool.write', version: '1.0.0' },
            ],
            mcpProfileRefs: [{ id: 'mcp.default', version: '0.0.0' }],
            policyRefs: [{ id: 'policy.default', version: '0.0.0' }],
            defaultPermissionScopes: ['document:write'],
            lazyLoad: true,
          },
        ],
        workflows: example.workflows.map((workflow) => ({
          ...workflow,
          states: workflow.states.map((state) =>
            state.id === 'Reasoning'
              ? {
                  ...state,
                  allowedTools: [],
                  toolProfileRefs: [{ id: 'tools.reasoning', version: '1.0.0' }],
                  deniedToolRefs: [{ id: 'tool.search', version: '0.0.0' }],
                }
              : state
          ),
        })),
      },
      { agentRef: { id: 'agent.default', version: '0.0.0' } }
    );

    expect(compiled.agentPatch.toolRefs).toEqual(['tool.search', 'tool.write']);
    expect(compiled.agentPatch.toolRefs).not.toContain('tool.unused');
    expect(compiled.bindings.toolProfiles.map((profile) => profile.id)).toEqual([
      'tools.default',
      'tools.reasoning',
    ]);
    expect(
      compiled.bindings.workflowStates.find((state) => state.stateId === 'Reasoning')
    ).toMatchObject({
      allowedTools: ['tool.write'],
      allowedToolRefs: [{ id: 'tool.write', version: '1.0.0' }],
      allowedMCPProfiles: ['mcp.default'],
      allowedMCPProfileRefs: [{ id: 'mcp.default', version: '0.0.0' }],
      policyRefs: ['policy.default'],
      permissionScopes: ['document:write'],
      capabilityLoadPolicy: 'lazy',
    });
    expect(
      resolveWorkflowToolExecutionScope(compiled.bindings.workflowStates, 'Reasoning')
    ).toEqual({
      fsmState: 'Reasoning',
      allowedToolIds: ['tool.write'],
      policyRefs: ['policy.default'],
    });
  });

  it('projects state-scoped MCP and reasoning profiles into compiled system refs', () => {
    const domainPack = validateDomainPackSpec({
      ...domainPackSpecDefinition.example,
      mcpProfiles: [
        ...domainPackSpecDefinition.example.mcpProfiles!,
        {
          ...domainPackSpecDefinition.example.mcpProfiles![0],
          id: 'mcp.research',
          servers: [{ id: 'research', mode: 'local', command: 'mcp-server-research' }],
        },
      ],
      reasoningProfiles: [
        ...domainPackSpecDefinition.example.reasoningProfiles!,
        {
          id: 'reasoning.critique',
          version: '0.0.0',
          thinkingMode: 'structured',
          agenticMode: 'critique',
          maxSteps: 2,
          persist: 'summary_only',
        },
      ],
      workflows: [
        {
          ...domainPackSpecDefinition.example.workflows[0],
          states: domainPackSpecDefinition.example.workflows[0].states.map((state) =>
            state.id === 'Reasoning'
              ? {
                  ...state,
                  allowedMCPProfiles: ['mcp.research'],
                  reasoningProfileRef: 'reasoning.critique',
                }
              : state
          ),
        },
      ],
    });

    const compiled = compileDomainPackToHarnessedSystem(domainPack, {
      agentRef: { id: 'agent.default', version: '0.0.0' },
    });

    expect(compiled.harnessedSystem.mcpRefs).toEqual([
      { id: 'mcp.default', version: '0.0.0' },
      { id: 'mcp.research', version: '0.0.0' },
    ]);
    expect(compiled.harnessedSystem.reasoningRefs).toEqual([
      { id: 'reasoning.default', version: '0.0.0' },
      { id: 'reasoning.critique', version: '0.0.0' },
    ]);
    expect(compiled.bindings.mcpProfile).toMatchObject({ id: 'mcp.default' });
    expect(compiled.bindings.reasoningProfile).toMatchObject({ id: 'reasoning.default' });
    expect(compiled.bindings.mcpProfiles.map((profile) => profile.id)).toEqual([
      'mcp.default',
      'mcp.research',
    ]);
    expect(compiled.bindings.reasoningProfiles.map((profile) => profile.id)).toEqual([
      'reasoning.default',
      'reasoning.critique',
    ]);
  });

  it('supports overlays for predefined DomainPack customization', () => {
    const extended = extendDomainPack(domainPackSpecDefinition.example, {
      version: '0.0.1',
      metadata: { preset: 'custom' },
      allowedSkills: [
        { id: 'skill.context-enrichment', version: '0.0.0' },
        { id: 'skill.custom', version: '0.0.0' },
      ],
      defaultSkills: [{ id: 'skill.custom', version: '0.0.0' }],
      tools: [
        {
          id: 'tool.custom',
          version: '0.0.0',
          description: 'Custom read-only tool.',
          inputSchema: { type: 'object' },
          sideEffectLevel: 'read',
        },
      ],
      businessRules: [
        {
          id: 'rule.custom',
          version: '0.0.0',
          scope: 'domain',
          effect: 'guidance',
          description: 'Custom domain guidance.',
        },
      ],
    });

    const compiled = compileDomainPackToHarnessedSystem(extended, {
      agentRef: { id: 'agent.custom', version: '0.0.0' },
      agentToolRefs: ['tool.custom'],
    });

    expect(extended.version).toBe('0.0.1');
    expect(extended.metadata).toMatchObject({ preset: 'custom' });
    expect(compiled.agentPatch.skillRefs.map((skill) => skill.id)).toEqual([
      'skill.context-enrichment',
      'skill.custom',
    ]);
    expect(compiled.agentPatch.toolRefs).toContain('tool.custom');
    expect(compiled.bindings.businessRules.map((rule) => rule.id)).toContain('rule.custom');

    const withoutRegression = extendDomainPack(domainPackSpecDefinition.example, {
      remove: { regressionCases: ['regression.event-contract'] },
    });
    expect(withoutRegression.regressionCases).toEqual([]);
  });

  it('loads local DomainPack files into a registry', async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-domain-'));
    try {
      const filePath = path.join(tempDir, 'minimal.domain.yaml');
      await fs.writeFile(
        filePath,
        `
id: domain.file
version: 0.0.0
name: File Domain
taskSchemas:
  - id: task.file
    version: 0.0.0
    taskType: generic
    inputSchema:
      type: object
    outputContractRef: output.file
    defaultWorkflowRef: workflow.file
outputContracts:
  - id: output.file
    version: 0.0.0
    schema:
      type: object
workflows:
  - id: workflow.file
    version: 0.0.0
    initialState: Start
    terminalStates: [Done]
    states:
      - id: Start
        goal: Read input
      - id: Done
        goal: Return output
    transitions:
      - from: Start
        to: Done
defaultWorkflow: workflow.file
`,
        'utf-8'
      );

      const registry = new DomainPackRegistry();
      const loaded = await new LocalDomainPackLoader({ directories: [tempDir] }).loadInto(registry);
      const parsed = parseDomainPackDocument(await fs.readFile(filePath, 'utf-8'), filePath);

      expect(loaded.map((domainPack) => domainPack.id)).toEqual(['domain.file']);
      expect(registry.get('domain.file')?.id).toBe('domain.file');
      expect(parsed.id).toBe('domain.file');
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });

  it('rejects broken internal DomainPack references', () => {
    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        taskSchemas: [
          {
            ...domainPackSpecDefinition.example.taskSchemas[0],
            outputContractRef: 'missing-output',
          },
        ],
      })
    ).toThrow(/Task output contract not found/);

    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        workflows: [
          {
            ...domainPackSpecDefinition.example.workflows[0],
            transitions: [{ from: 'Intake', to: 'Missing' }],
          },
        ],
      })
    ).toThrow(/Workflow transition to state not found/);

    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        sessionProfiles: [
          {
            ...domainPackSpecDefinition.example.sessionProfiles![0],
            defaultContextProfileRef: 'missing-context',
          },
        ],
      })
    ).toThrow(/Session default context profile not found/);

    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        businessRules: [
          {
            ...domainPackSpecDefinition.example.businessRules![0],
            outputContractRef: 'missing-output',
          },
        ],
      })
    ).toThrow(/Business rule output contract not found/);

    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        workflows: [
          {
            ...domainPackSpecDefinition.example.workflows[0],
            states: domainPackSpecDefinition.example.workflows[0].states.map((state, index) =>
              index === 1
                ? { ...state, id: domainPackSpecDefinition.example.workflows[0].states[0].id }
                : state
            ),
          },
        ],
      })
    ).toThrow(/Workflow workflow.default states contains duplicate id/);

    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        taskSchemas: [
          {
            ...domainPackSpecDefinition.example.taskSchemas[0],
            riskProfile: {
              defaultRiskLevel: 'high',
              escalationPolicyRef: 'missing-policy',
            },
          },
        ],
      })
    ).toThrow(/Task risk escalation policy not found/);

    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        workflows: [
          {
            ...domainPackSpecDefinition.example.workflows[0],
            states: domainPackSpecDefinition.example.workflows[0].states.map((state, index) =>
              index === 0 ? { ...state, memoryPolicyRef: 'missing-policy' } : state
            ),
          },
        ],
      })
    ).toThrow(/Workflow state memory policy not found/);
  });

  it('compiles prompt refs as state-scoped bindings and emits a deterministic audit hash', () => {
    const first = compileDomainPackToHarnessedSystem(domainPackSpecDefinition.example, {
      agentRef: { id: 'agent.default', version: '1.0.0' },
    });
    const second = compileDomainPackToHarnessedSystem(domainPackSpecDefinition.example, {
      agentRef: { id: 'agent.default', version: '1.0.0' },
    });

    expect(first.agentPatch.promptRefs).toEqual([
      { id: 'prompt.agent.default', version: '1.0.0', required: true, priority: 0 },
    ]);
    expect(
      first.bindings.workflowStates.find((state) => state.stateId === 'Reasoning')
    ).toMatchObject({
      allowedPromptRefs: [{ id: 'prompt.agent.default', version: '1.0.0' }],
      requiredPromptRefs: [
        { id: 'prompt.agent.default', version: '1.0.0', required: true, priority: 0 },
      ],
    });
    expect(first.audit.compilationHash).toMatch(/^sha256:[a-f0-9]{64}$/);
    expect(first.audit).toEqual(second.audit);

    const changed = compileDomainPackToHarnessedSystem(
      { ...domainPackSpecDefinition.example, version: '0.0.1' },
      { agentRef: { id: 'agent.default', version: '1.0.0' } }
    );
    expect(changed.audit.compilationHash).not.toBe(first.audit.compilationHash);
  });

  it('rejects prompt bindings outside the domain and workflow allowlists', () => {
    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        defaultPromptRefs: [{ id: 'prompt.unknown', version: '1.0.0', required: true }],
      })
    ).toThrow(/outside allowedPromptRefs/);

    expect(() =>
      validateDomainPackSpec({
        ...domainPackSpecDefinition.example,
        workflows: [
          {
            ...domainPackSpecDefinition.example.workflows[0],
            states: domainPackSpecDefinition.example.workflows[0].states.map((state) =>
              state.id === 'Reasoning'
                ? {
                    ...state,
                    allowedPromptRefs: [],
                    requiredPromptRefs: [
                      { id: 'prompt.agent.default', version: '1.0.0', required: true },
                    ],
                  }
                : state
            ),
          },
        ],
      })
    ).toThrow(/requires prompt outside state allowedPromptRefs/);
  });
});
