import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { PromptManager } from './PromptManager';

describe('PromptManager Prompt Profile publication', () => {
  let root: string;

  beforeEach(async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-prompt-profile-'));
    await fs.mkdir(path.join(root, 'templates'), { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(root, { recursive: true, force: true });
  });

  it('persists lifecycle state and resolves an exact revision after restart', async () => {
    const registryPath = path.join(root, 'registry.json');
    const first = new PromptManager(path.join(root, 'templates'), true, registryPath);
    const created = await first.createPromptProfile({
      id: 'agent.product',
      version: '1.0.0',
      name: 'Product profile',
      variableNames: ['question'],
      layers: [
        { id: 'system', source: 'system', content: 'Be precise.', trustLevel: 'trusted' },
        { id: 'mcp', source: 'mcp', content: 'Remote context.', trustLevel: 'untrusted' },
        { id: 'user', source: 'user', content: '{{question}}' },
      ],
    });
    const reviewed = await first.submitPromptProfileForReview(
      { id: created.id, version: created.version, revision: created.revision },
      { expectedLifecycleRevision: 1, reviewedBy: 'reviewer-1' }
    );
    const active = await first.activatePromptProfile(
      { id: reviewed.id, version: reviewed.version, revision: reviewed.revision },
      { expectedLifecycleRevision: 2, activatedBy: 'publisher-1' }
    );

    const restarted = new PromptManager(path.join(root, 'templates'), true, registryPath);
    await restarted.initialize();
    expect(restarted.listPromptProfiles()).toEqual([
      expect.objectContaining({
        id: active.id,
        revision: active.revision,
        status: 'active',
        contentHash: active.contentHash,
      }),
    ]);
    await expect(
      restarted.resolvePromptProfile(
        { id: active.id, version: active.version, revision: active.revision },
        {
          variables: { question: 'What is new?' },
          principal: { principalId: 'user-1' },
        }
      )
    ).resolves.toMatchObject({
      profileRef: { id: active.id, version: active.version, revision: active.revision },
      messages: [
        expect.objectContaining({ role: 'system' }),
        expect.objectContaining({
          role: 'context',
          metadata: expect.objectContaining({ source: 'mcp', trustLevel: 'untrusted' }),
        }),
        expect.objectContaining({ role: 'user', content: 'What is new?' }),
      ],
    });
  });
});
