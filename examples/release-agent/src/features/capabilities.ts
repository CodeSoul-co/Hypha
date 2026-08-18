import { mcpIntegrationSpecDefinition } from '@codesoul-co/hypha-mcp';
import { SkillRegistry, skillSpecDefinition } from '@codesoul-co/hypha-skills';
import { ToolRegistry, toolSpecDefinition } from '@codesoul-co/hypha-tools';

/** Register Skills and Tools, and validate the MCP allow-list boundary. */
export function runCapabilitiesExample() {
  const tool = toolSpecDefinition.parse(toolSpecDefinition.example);
  const tools = new ToolRegistry();
  tools.register(tool, async (input) => ({ input, source: 'feature-example' }));

  const skill = skillSpecDefinition.parse(skillSpecDefinition.example);
  const skills = new SkillRegistry();
  skills.register(skill);

  const mcp = mcpIntegrationSpecDefinition.parse(mcpIntegrationSpecDefinition.example);

  return {
    toolId: tools.getSpec(tool.id)?.id,
    skillIds: skills.list().map((entry) => entry.id),
    mcpServerIds: mcp.servers.map((server) => server.id),
  };
}
