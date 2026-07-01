import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { PromptManager } from '../../src/core/prompts/PromptManager';

describe('PromptManager', () => {
  let originalCwd: string;
  let tmp: string;

  beforeEach(async () => {
    originalCwd = process.cwd();
    tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-prompts-'));

    await fs.mkdir(path.join(tmp, 'prompts', 'system'), { recursive: true });
    await fs.mkdir(path.join(tmp, 'src', 'prompts', 'system'), { recursive: true });

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
      path.join(tmp, 'src', 'prompts', 'system', 'sentinel.yaml'),
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

  it('loads prompt templates from src/prompts by default', async () => {
    const manager = new PromptManager();

    await manager.initialize();

    expect(manager.render('sentinel', {}, 'system')).toBe('src prompt');
  });
});
