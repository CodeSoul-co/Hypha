import { domainPackSpecDefinition } from '@codesoul-co/hypha-domain';
import { reactAgentSpecDefinition } from '@codesoul-co/hypha-kernel';
import { memorySpecDefinition } from '@codesoul-co/hypha-memory';

/** Validate composition contracts without embedding domain behavior in Core. */
export function runDomainKernelMemoryExample() {
  const domain = domainPackSpecDefinition.parse(domainPackSpecDefinition.example);
  const agent = reactAgentSpecDefinition.parse(reactAgentSpecDefinition.example);
  const memory = memorySpecDefinition.parse(memorySpecDefinition.example);

  return {
    domainPackId: domain.id,
    agentId: agent.id,
    memoryProfileId: memory.id,
  };
}
