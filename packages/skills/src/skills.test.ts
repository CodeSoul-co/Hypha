import { describe, expect, it } from 'vitest';
import {
  SkillRegistry,
  SkillResolver,
  skillSpecDefinition,
  skillSpecJsonSchemas,
  validateSkillSpec,
} from './index';

describe('@hypha/skills resolver', () => {
  it('resolves only agent-bound active skills and loads activation references', () => {
    const registry = new SkillRegistry();
    registry.register({
      id: 'review',
      version: '0.0.0',
      description: 'Review output',
      activationPolicy: { mode: 'keyword', patterns: ['review'] },
      references: [{ path: 'references/checklist.md', type: 'reference', loadPolicy: 'on_activation' }],
    });

    const resolver = new SkillResolver(registry);
    const resolved = resolver.resolve({
      agentSkillRefs: [{ id: 'review' }],
      inputText: 'please review this',
      allowedSkills: ['review'],
    });

    expect(resolved).toHaveLength(1);
    expect(resolved[0].loadedReferences[0].path).toBe('references/checklist.md');
  });

  it('exports Stage1 SkillSpec schema and minimal example', () => {
    expect(validateSkillSpec(skillSpecDefinition.example).id).toBe('skill.context-enrichment');
    expect(skillSpecJsonSchemas.SkillSpec.required).toContain('description');
  });
});
