import path from 'node:path';
import {
  applyDomainAgentPatch,
  compileDomainPackToHarnessedSystem,
  loadDomainPackFile,
} from '@codesoul-co/hypha-domain';
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

  return { domainPack, compiled, agent };
}
