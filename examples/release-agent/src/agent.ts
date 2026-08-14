import path from 'node:path';
import {
  applyDomainAgentPatch,
  compileDomainPackToHarnessedSystem,
  loadDomainPackFile,
  type WorkflowSpec,
} from '@codesoul-co/hypha-domain';
import { parseFSMProcessSpec, type FSMProcessSpec } from '@codesoul-co/hypha-fsm';
import type { ReActAgentSpec } from '@codesoul-co/hypha-kernel';

export async function buildReleaseAgent(projectRoot = process.cwd()) {
  const domainPack = await loadDomainPackFile(path.join(projectRoot, 'agent', 'domain-pack.yaml'));
  const compiled = compileDomainPackToHarnessedSystem(domainPack, {
    agentRef: { id: 'agent.release-research', version: '1.0.0' },
    taskSchemaId: 'task.research',
    workflowId: 'workflow.research',
    memoryProfileId: 'memory.release',
    reasoningProfileId: 'reasoning.release',
    agentSkillRefs: [{ id: 'skill.release-research', version: '1.0.0' }],
    agentToolRefs: ['search'],
  });
  const baseAgent: ReActAgentSpec & Record<string, unknown> = {
    id: 'agent.release-research',
    version: '1.0.0',
    name: 'Release Research Agent',
    modelAlias: 'default-chat',
    promptRefs: [{ id: 'prompt.release-research', version: '1.0.0' }],
  };
  const agent = applyDomainAgentPatch(baseAgent, compiled.agentPatch);

  const customFsm = buildApplicationWorkflowFSM(compiled.bindings.workflow);

  return { domainPack, compiled, customFsm, agent };
}

function buildApplicationWorkflowFSM(workflow: WorkflowSpec): FSMProcessSpec {
  return parseFSMProcessSpec({
    id: workflow.id,
    version: workflow.version,
    name: workflow.name,
    initialState: workflow.initialState,
    terminalStates: workflow.terminalStates,
    states: workflow.states.map((state) => ({
      id: state.id,
      kind: workflow.terminalStates.includes(state.id)
        ? state.id.toLowerCase().includes('fail')
          ? 'failed'
          : 'completed'
        : 'domain',
      timeoutPolicy: state.timeoutPolicy,
      retryPolicy: state.retryPolicy,
      policyRefs: state.policyRefs,
    })),
    transitions: workflow.transitions.map((transition) => ({
      from: transition.from,
      to: transition.to,
      guard: transition.guard,
      description: transition.description,
    })),
  });
}
