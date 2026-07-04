import { describe, expect, it } from 'vitest';
import {
  DefaultSkillPolicy,
  LocalSkillLoader,
  SkillContextLoader,
  SkillRegistry,
  SkillResolver,
  SkillSelector,
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
      references: [
        { path: 'references/checklist.md', type: 'reference', loadPolicy: 'on_activation' },
      ],
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
    expect(skillSpecJsonSchemas.SkillSpec.properties).toMatchObject({
      enabled: { type: 'boolean' },
      priority: { type: 'number' },
      activationPolicy: { type: 'object' },
    });
  });

  it('loads a real local markdown skill and activates it progressively', async () => {
    const registry = new SkillRegistry();
    const loader = new LocalSkillLoader({
      directories: ['apps/server/src/core/skills/builtins'],
      recursive: false,
    });
    await loader.loadInto(registry);

    const skill = registry.get('context-enrichment');
    expect(skill).toMatchObject({
      id: 'context-enrichment',
      version: '1.0.0',
      enabled: true,
      priority: 10,
      activationPolicy: { mode: 'always' },
      trustLevel: 'reviewed',
    });
    expect(skill?.instructions).toContain('Runs on every turn');

    const selector = new SkillSelector(registry);
    const selected = selector.select({
      agentSkillRefs: [{ id: 'context-enrichment', version: '1.0.0' }],
      inputText: '请补充上下文',
      allowedSkills: ['context-enrichment'],
      availableToolRefs: ['tool.search'],
    });
    expect(selected.rejected).toEqual([]);
    expect(selected.selected).toHaveLength(1);

    const policy = await new DefaultSkillPolicy().evaluate({
      selection: selected.selected[0],
      context: {
        agentSkillRefs: [{ id: 'context-enrichment', version: '1.0.0' }],
        inputText: '请补充上下文',
        allowedSkills: ['context-enrichment'],
        availableToolRefs: ['tool.search'],
      },
    });
    expect(policy).toMatchObject({ allowed: true });

    const context = await new SkillContextLoader().load({
      selection: selected.selected[0],
      policyDecision: policy,
    });
    expect(context).toMatchObject({
      id: 'context-enrichment',
      version: '1.0.0',
      instructions: expect.stringContaining('Runs on every turn'),
      policyDecision: expect.objectContaining({ allowed: true }),
    });
  });

  it('denies untrusted skills and missing required tools before context injection', async () => {
    const registry = new SkillRegistry();
    registry.register({
      id: 'dangerous',
      version: '0.0.0',
      description: 'Dangerous process',
      activationPolicy: { mode: 'always' },
      requiredTools: ['tool.write'],
      trustLevel: 'untrusted',
    });

    const selector = new SkillSelector(registry);
    const selected = selector.select({
      agentSkillRefs: [{ id: 'dangerous' }],
      inputText: 'run',
      availableToolRefs: ['tool.search'],
    });
    const decision = await new DefaultSkillPolicy().evaluate({
      selection: selected.selected[0],
      context: {
        agentSkillRefs: [{ id: 'dangerous' }],
        inputText: 'run',
        availableToolRefs: ['tool.search'],
      },
    });

    expect(decision.allowed).toBe(false);
    expect(decision.reason).toContain('trustLevel=untrusted');
  });
});
