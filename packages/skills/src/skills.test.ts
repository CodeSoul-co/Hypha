import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { describe, expect, it } from 'vitest';
import {
  DefaultSkillPolicy,
  createEffectiveAgentCapabilitySnapshot,
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
  it('builds an immutable least-privilege Agent capability intersection', () => {
    const activeSkill = {
      id: 'skill-a',
      version: '1.0.0',
      description: 'Scoped skill',
      instructions: 'Use only approved capabilities.',
      references: [],
      allowedTools: ['tool.b', 'common.memory'],
      requiredTools: [],
      requiredMCPServers: ['mcp-b'],
      memoryAccessPolicy: 'read',
      sideEffectPolicy: 'human_review',
      provenance: { install: { contentHash: 'a'.repeat(64) } },
      policyDecision: {
        allowed: true,
        allowedTools: ['tool.b', 'common.memory'],
        requiresHumanReview: true,
        policyId: 'skill.policy',
      },
      activation: { reason: 'required', matchedPatterns: [] },
    };
    const snapshot = createEffectiveAgentCapabilitySnapshot({
      runId: 'run-a',
      agentId: 'agent-a',
      principalId: 'user-a',
      domainId: 'domain-a',
      createdAt: '2026-07-22T00:00:00.000Z',
      agent: {
        allowedToolIds: ['tool.a', 'tool.b', 'common.memory'],
        allowedMCPServerIds: ['mcp-a', 'mcp-b'],
        memoryAccess: 'read_write',
        allowedExecutionProfiles: ['exec-a', 'exec-b'],
        maximumSideEffectLevel: 'external_effect',
        policyRefs: ['agent.policy'],
      },
      domain: {
        allowedToolIds: ['tool.b', 'common.memory'],
        allowedMCPServerIds: ['mcp-b'],
        memoryAccess: 'read',
        allowedExecutionProfiles: ['exec-b'],
        maximumSideEffectLevel: 'write',
        policyRefs: ['domain.policy'],
      },
      activeSkills: [activeSkill],
    });

    expect(snapshot).toMatchObject({
      allowedToolIds: ['common.memory', 'tool.b'],
      allowedMCPServerIds: ['mcp-b'],
      memoryAccess: 'read',
      allowedExecutionProfiles: ['exec-b'],
      maximumSideEffectLevel: 'write',
      requiresHumanReview: true,
      policyRefs: ['agent.policy', 'domain.policy', 'skill.policy'],
    });
    expect(snapshot.skillRevisions).toEqual([
      { id: 'skill-a', version: '1.0.0', contentHash: 'a'.repeat(64) },
    ]);
    expect(Object.isFrozen(snapshot)).toBe(true);
    expect(Object.isFrozen(snapshot.allowedToolIds)).toBe(true);
  });

  it.each([
    '../secret.md',
    '..\\secret.md',
    '%2e%2e/secret.md',
    'C:\\secret.md',
    '\\\\server\\share\\secret.md',
  ])('rejects an activation reference outside the Skill root: %s', async (referencePath) => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-skill-'));
    try {
      const skillFile = path.join(root, 'skill.md');
      await fs.writeFile(skillFile, 'skill');
      await expect(
        new SkillContextLoader().load({
          selection: {
            spec: {
              id: 'confined',
              version: '1.0.0',
              description: 'Confinement test',
              references: [{ path: referencePath, type: 'reference', loadPolicy: 'on_activation' }],
              provenance: { filePath: skillFile },
            },
            reason: 'test',
            matchedPatterns: [],
            priority: 0,
          },
          policyDecision: { allowed: true, allowedTools: [] },
        })
      ).rejects.toThrow(/invalid reference path/);
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });

  it('loads a confined reference without exposing its absolute path', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-skill-'));
    try {
      const skillFile = path.join(root, 'skill.md');
      const referenceFile = path.join(root, 'reference.md');
      await fs.writeFile(skillFile, 'skill');
      await fs.writeFile(referenceFile, 'bounded evidence');
      const loaded = await new SkillContextLoader().load({
        selection: {
          spec: {
            id: 'confined',
            version: '1.0.0',
            description: 'Confinement test',
            references: [{ path: 'reference.md', type: 'reference', loadPolicy: 'on_activation' }],
            provenance: { filePath: skillFile },
          },
          reason: 'test',
          matchedPatterns: [],
          priority: 0,
        },
        policyDecision: { allowed: true, allowedTools: [] },
      });
      expect(loaded.references[0]).toMatchObject({ content: 'bounded evidence' });
      expect(loaded.references[0].absolutePath).toBeUndefined();
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });

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

  it('activates required skills even when activation policy does not match', () => {
    const registry = new SkillRegistry();
    registry.register({
      id: 'required-review',
      version: '0.0.0',
      description: 'Review output',
      activationPolicy: { mode: 'keyword', patterns: ['review'] },
    });

    const selector = new SkillSelector(registry);
    const selected = selector.select({
      agentSkillRefs: [{ id: 'required-review' }],
      inputText: 'plain request',
      allowedSkills: ['required-review'],
      requiredSkills: ['required-review', 'missing-required'],
    });

    expect(selected.selected).toEqual([
      expect.objectContaining({
        spec: expect.objectContaining({ id: 'required-review' }),
        reason: 'Skill is required by the current scope.',
      }),
    ]);
    expect(selected.rejected).toEqual(
      expect.arrayContaining([
        {
          skillId: 'missing-required',
          reason: 'Required skill is not attached to the agent.',
        },
      ])
    );
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
