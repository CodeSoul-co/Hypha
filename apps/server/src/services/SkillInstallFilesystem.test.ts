import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import {
  assertDirectoryStable,
  installVerifiedSkillFile,
  isPortablePathWithin,
  readTrustedLocalSkill,
  resolveGovernedSkillRoots,
} from './SkillInstallFilesystem';

describe('Skill install filesystem boundary', () => {
  let root: string;
  const original = { ...process.env };

  beforeEach(async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-skill-fs-'));
  });

  afterEach(async () => {
    process.env = { ...original };
    await fs.rm(root, { recursive: true, force: true });
  });

  it('returns one canonical path for configured, staging, quarantine, and final targets', async () => {
    const configured = path.join(root, '含 空格', '%E6%8A%80%E8%83%BD');
    process.env.HYPHA_SKILL_DATA_ROOT = configured;
    const roots = await resolveGovernedSkillRoots();
    const target = await installVerifiedSkillFile({
      roots,
      destination: 'quarantine',
      filename: 'unicode-skill.abc.md',
      raw: 'verified',
      verify: (raw) => expect(raw).toBe('verified'),
    });

    expect(roots.data.canonicalPath).toBe(await fs.realpath(configured));
    expect(roots.quarantine.canonicalPath).toBe(
      await fs.realpath(path.join(configured, '.quarantine'))
    );
    expect(roots.staging.canonicalPath).toBe(await fs.realpath(path.join(configured, '.staging')));
    expect(target).toBe(await fs.realpath(target));
    expect(path.dirname(target)).toBe(roots.quarantine.canonicalPath);
  });

  it('keeps using the canonical root when a configured symlink alias is swapped', async () => {
    if (process.platform === 'win32') return;
    const first = path.join(root, 'first');
    const second = path.join(root, 'second');
    const alias = path.join(root, 'alias');
    await Promise.all([fs.mkdir(first), fs.mkdir(second)]);
    await fs.symlink(first, alias, 'dir');
    process.env.HYPHA_SKILL_DATA_ROOT = alias;
    const roots = await resolveGovernedSkillRoots();
    await fs.unlink(alias);
    await fs.symlink(second, alias, 'dir');

    const target = await installVerifiedSkillFile({
      roots,
      destination: 'active',
      filename: 'stable.md',
      raw: 'stable',
      verify: () => undefined,
    });
    expect(path.dirname(target)).toBe(await fs.realpath(first));
    await expect(fs.access(path.join(second, 'stable.md'))).rejects.toMatchObject({
      code: 'ENOENT',
    });
  });

  it('rejects replacement of the canonical data directory before promotion', async () => {
    process.env.HYPHA_SKILL_DATA_ROOT = path.join(root, 'installed');
    const roots = await resolveGovernedSkillRoots();
    const moved = path.join(root, 'moved');
    await fs.rename(roots.data.canonicalPath, moved);
    await fs.mkdir(roots.data.canonicalPath);

    await expect(assertDirectoryStable(roots.data)).rejects.toMatchObject({
      code: 'SKILL_DIRECTORY_IDENTITY_CHANGED',
    });
    await expect(
      installVerifiedSkillFile({
        roots,
        destination: 'active',
        filename: 'blocked.md',
        raw: 'blocked',
        verify: () => undefined,
      })
    ).rejects.toMatchObject({ code: 'SKILL_DIRECTORY_IDENTITY_CHANGED' });
  });

  it('rejects replacement of the final target immediately after promotion', async () => {
    process.env.HYPHA_SKILL_DATA_ROOT = path.join(root, 'installed');
    const roots = await resolveGovernedSkillRoots();
    const target = path.join(roots.data.canonicalPath, 'replaced-after-rename.md');
    const rename = fs.rename.bind(fs);
    const renameSpy = jest.spyOn(fs, 'rename').mockImplementation(async (source, destination) => {
      await rename(source, destination);
      if (path.resolve(String(destination)) !== target) return;
      await fs.unlink(target);
      await fs.writeFile(target, 'replacement', { encoding: 'utf8', mode: 0o600 });
    });

    try {
      await expect(
        installVerifiedSkillFile({
          roots,
          destination: 'active',
          filename: path.basename(target),
          raw: 'verified',
          verify: (raw) => expect(raw).toBe('verified'),
        })
      ).rejects.toMatchObject({ code: 'SKILL_TARGET_IDENTITY_CHANGED' });
      await expect(fs.readFile(target, 'utf8')).resolves.toBe('replacement');
    } finally {
      renameSpy.mockRestore();
    }
  });

  it('canonicalizes trusted sources and rejects symlinks that leave the allow-listed root', async () => {
    if (process.platform === 'win32') return;
    const trusted = path.join(root, 'trusted');
    const outside = path.join(root, 'outside');
    await Promise.all([fs.mkdir(trusted), fs.mkdir(outside)]);
    const source = path.join(trusted, '技能.md');
    await fs.writeFile(source, 'trusted');
    await expect(readTrustedLocalSkill(source, [trusted])).resolves.toMatchObject({
      raw: 'trusted',
      canonicalPath: await fs.realpath(source),
    });
    const outsideSource = path.join(outside, 'secret.md');
    const link = path.join(trusted, 'escape.md');
    await fs.writeFile(outsideSource, 'outside');
    await fs.symlink(outsideSource, link, 'file');
    await expect(readTrustedLocalSkill(link, [trusted])).rejects.toMatchObject({
      code: 'SKILL_PATH_NOT_ALLOWED',
    });
  });

  it('handles POSIX /var aliases and Windows drive/UNC containment without prefix checks', () => {
    expect(isPortablePathWithin('/private/var/folders/root', '/private/var/folders/root/a.md', 'posix')).toBe(
      true
    );
    expect(isPortablePathWithin('/var/folders/root', '/private/var/folders/root/a.md', 'posix')).toBe(
      false
    );
    expect(isPortablePathWithin('C:\\skills', 'C:\\skills\\a.md', 'win32')).toBe(true);
    expect(isPortablePathWithin('C:\\skills', 'C:\\skills-escape\\a.md', 'win32')).toBe(false);
    expect(isPortablePathWithin('\\\\server\\share\\skills', '\\\\server\\share\\skills\\a.md', 'win32')).toBe(
      true
    );
    expect(isPortablePathWithin('\\\\server\\share\\skills', '\\\\server\\other\\a.md', 'win32')).toBe(
      false
    );
  });

  it('canonicalizes a Windows junction data root', async () => {
    if (process.platform !== 'win32') return;
    const target = path.join(root, 'junction-target');
    const junction = path.join(root, 'junction');
    await fs.mkdir(target);
    await fs.symlink(target, junction, 'junction');
    process.env.HYPHA_SKILL_DATA_ROOT = junction;
    const roots = await resolveGovernedSkillRoots();
    expect(roots.data.canonicalPath.toLowerCase()).toBe((await fs.realpath(target)).toLowerCase());
  });
});
