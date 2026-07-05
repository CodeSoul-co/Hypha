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
});
