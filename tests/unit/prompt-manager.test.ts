import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { PromptManager } from '../../apps/server/src/core/prompts/PromptManager';

describe('PromptManager', () => {
  let originalCwd: string;
  let tmp: string;

  beforeEach(async () => {
    originalCwd = process.cwd();
    tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-prompts-'));

    await fs.mkdir(path.join(tmp, 'prompts', 'system'), { recursive: true });
    await fs.mkdir(path.join(tmp, 'apps', 'server', 'src', 'prompts', 'system'), {
      recursive: true,
    });

    await fs.writeFile(
      path.join(tmp, 'prompts', 'system', 'sentinel.yaml'),
      [
        'id: sentinel',
        'name: Root Sentinel',
        'category: system',
        'content: root prompt',
        'variables: []',
        '',
      ].join('\n')
    );

    await fs.writeFile(
      path.join(tmp, 'apps', 'server', 'src', 'prompts', 'system', 'sentinel.yaml'),
      [
        'id: sentinel',
        'name: Source Sentinel',
        'category: system',
        'content: src prompt',
        'variables: []',
        '',
      ].join('\n')
    );

    process.chdir(tmp);
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    await fs.rm(tmp, { recursive: true, force: true });
  });

  it('loads prompt templates from apps/server/src/prompts by default', async () => {
    const manager = new PromptManager();

    await manager.initialize();

    expect(manager.render('sentinel', {}, 'system')).toBe('src prompt');
  });

  it('applies declared defaults consistently on cached renders', () => {
    const manager = new PromptManager(undefined, true);
    manager.register({
      id: 'cached-defaults',
      name: 'Cached Defaults',
      category: 'system',
      content: 'Hello {{ agent_name }} from {{ session_id }}.',
      variables: [
        {
          name: 'agent_name',
          type: 'string',
          required: true,
          default: 'Assistant',
        },
        {
          name: 'session_id',
          type: 'string',
          required: false,
        },
      ],
    });

    expect(manager.render('cached-defaults', { agent_name: 'Planner' }, 'system')).toBe(
      'Hello Planner from .'
    );
    expect(manager.render('cached-defaults', {}, 'system')).toBe('Hello Assistant from .');
  });

  it('reports unresolved prompt variables during validated renders', () => {
    const manager = new PromptManager(undefined, false);
    manager.register({
      id: 'broken-template',
      name: 'Broken Template',
      category: 'system',
      content: 'Hello {{known}} {{unknown}}.',
      variables: [
        {
          name: 'known',
          type: 'string',
          required: true,
          default: 'Agent',
        },
      ],
    });

    expect(manager.renderWithValidation('broken-template', {}, 'system')).toEqual({
      success: false,
      errors: ['Unresolved variable: unknown'],
    });
  });

  it('adapts server templates into versioned agent prompt registry blocks', () => {
    const manager = new PromptManager(undefined, false);
    manager.register({
      id: 'agent-managed',
      name: 'Managed Agent Prompt',
      category: 'system',
      content: 'You are {{agent_name}} for {{user_id}}.',
      variables: [
        { name: 'agent_name', type: 'string', required: true },
        { name: 'user_id', type: 'string', required: true },
      ],
      metadata: { version: '2.1.0', stable: true, cacheable: true },
    });

    const resolved = manager.resolveAgentPrompts(
      [{ id: 'agent-managed', version: '2.1.0', required: true }],
      {
        variables: { agent_name: 'Hypha', user_id: 'user-1' },
        principal: { principalId: 'user-1' },
      }
    );
    expect(resolved.instructions).toBe('You are Hypha for user-1.');
    expect(resolved.blocks[0]).toMatchObject({
      templateId: 'agent-managed',
      templateVersion: '2.1.0',
      stable: true,
      cacheable: true,
    });
  });

  it('persists governed agent prompts with revision and content hash across restart', async () => {
    const registryPath = path.join(tmp, 'data', 'prompts', 'registry.json');
    const first = new PromptManager(undefined, false, registryPath);
    await first.initialize();
    const stored = await first.registerAgentPrompt({
      id: 'dynamic-agent',
      version: '1.0.0',
      name: 'Dynamic Agent',
      role: 'system',
      template: 'Act as {{role}}.',
      variables: [{ name: 'role', type: 'string', required: true }],
      ownerId: 'admin-1',
      tenantId: 'tenant-1',
      scope: 'tenant',
      trustLevel: 'reviewed',
      provenance: { source: 'admin-api' },
    });
    expect(stored).toMatchObject({
      revision: 1,
      contentHash: expect.stringMatching(/^[a-f0-9]{64}$/),
    });
    await first.destroy();

    const second = new PromptManager(undefined, false, registryPath);
    await second.initialize();
    expect(second.listAgentPrompts()).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'dynamic-agent', revision: 1 })])
    );
  });
});
