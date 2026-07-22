import crypto from 'crypto';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { SkillManager } from '../core/skills/SkillManager';
import {
  activateQuarantinedSkill,
  installSkill,
  listInstalledSkills,
} from './SkillInstaller';

const skillMarkdown = (id: string, body: string) => `---
id: ${id}
name: ${id}
description: Test skill
version: 1.0.0
priority: 1
enabled: true
triggers:
  - type: always
---

${body}
`;

describe('Skill installation governance', () => {
  let root: string;
  const original = { ...process.env };

  beforeEach(async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-skill-install-'));
    process.env.HYPHA_SKILL_DATA_ROOT = path.join(root, 'installed');
    delete process.env.HYPHA_SKILL_TRUSTED_SIGNERS;
  });

  afterEach(async () => {
    process.env = { ...original };
    await fs.rm(root, { recursive: true, force: true });
  });

  it('persists source, hash, reviewer, and status outside the source tree', async () => {
    const result = await installSkill({
      source: 'inline',
      content: skillMarkdown('installed-skill', 'Installed body.'),
      reviewedBy: 'reviewer-a',
      activate: true,
    });

    expect(result.filePath.startsWith(process.env.HYPHA_SKILL_DATA_ROOT!)).toBe(true);
    expect(result.record).toMatchObject({
      id: 'installed-skill',
      source: 'inline',
      reviewer: 'reviewer-a',
      status: 'active',
      contentHash: expect.stringMatching(/^[a-f0-9]{64}$/),
    });
    await expect(fs.readFile(`${result.filePath}.install.json`, 'utf8')).resolves.toContain(
      'reviewer-a'
    );
    await expect(listInstalledSkills()).resolves.toEqual([
      expect.objectContaining({
        id: 'installed-skill',
        record: expect.objectContaining({ status: 'active' }),
      }),
    ]);
  });

  it('quarantines an external package until an explicit reviewer activates its exact hash', async () => {
    const sourceRoot = path.join(root, 'source');
    await fs.mkdir(sourceRoot);
    const sourcePath = path.join(sourceRoot, 'external.md');
    const raw = skillMarkdown('external-skill', 'External body.');
    await fs.writeFile(sourcePath, raw);
    const contentHash = crypto.createHash('sha256').update(raw).digest('hex');
    process.env.HYPHA_SKILL_ALLOW_LOCAL_PATHS = 'true';
    process.env.HYPHA_SKILL_LOCAL_ROOTS = sourceRoot;

    const quarantined = await installSkill({
      source: 'path',
      path: sourcePath,
      expectedSha256: contentHash,
      activate: true,
    });
    expect(quarantined.status).toBe('quarantined');

    const active = await activateQuarantinedSkill(
      quarantined.id,
      quarantined.contentHash,
      'reviewer-b'
    );
    expect(active.record).toMatchObject({
      source: 'path',
      contentHash,
      reviewer: 'reviewer-b',
      status: 'active',
    });
  });

  it('verifies a trusted signer over a hash-bound manifest', async () => {
    const raw = skillMarkdown('signed-skill', 'Signed body.');
    const contentHash = crypto.createHash('sha256').update(raw).digest('hex');
    const manifest = { skillId: 'signed-skill', contentSha256: contentHash, assets: {} };
    const canonicalManifest = `{"assets":{},"contentSha256":"${contentHash}","skillId":"signed-skill"}`;
    const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
    process.env.HYPHA_SKILL_TRUSTED_SIGNERS = JSON.stringify({
      'signer-a': publicKey.export({ type: 'spki', format: 'pem' }).toString(),
    });
    const signature = crypto.sign(null, Buffer.from(canonicalManifest), privateKey).toString('base64');

    const result = await installSkill({
      source: 'inline',
      content: raw,
      manifest,
      signer: 'signer-a',
      signature,
    });
    expect(result.record).toMatchObject({
      signer: 'signer-a',
      manifestHash: expect.stringMatching(/^[a-f0-9]{64}$/),
    });
  });

  it('loads builtins as fallback and lets the dedicated user data root override them', async () => {
    const userSkill = path.join(process.env.HYPHA_SKILL_DATA_ROOT!, 'context-enrichment.md');
    await fs.mkdir(path.dirname(userSkill), { recursive: true });
    await fs.writeFile(userSkill, skillMarkdown('context-enrichment', 'User override body.'));
    const manager = new SkillManager();
    await manager.initialize();

    expect(manager.getSkillBody('context-enrichment')).toContain('User override body.');
  });

  it('fails closed when installed content no longer matches its provenance hash', async () => {
    const installed = await installSkill({
      source: 'inline',
      content: skillMarkdown('tampered-skill', 'Original body.'),
      reviewedBy: 'reviewer-a',
    });
    await fs.writeFile(installed.filePath, skillMarkdown('tampered-skill', 'Tampered body.'));
    const manager = new SkillManager();
    await manager.initialize();

    expect(manager.getSkill('tampered-skill')).toBeNull();
  });
});
