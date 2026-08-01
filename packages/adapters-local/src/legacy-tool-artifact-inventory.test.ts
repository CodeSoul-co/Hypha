import { createHash } from 'node:crypto';
import type { BigIntStats } from 'node:fs';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { ArtifactStoreToolPort, FileArtifactStore } from './index';
import {
  LegacyToolArtifactInventory,
  LegacyToolArtifactInventoryError,
} from './legacy-tool-artifact-inventory';
import {
  type LegacyToolArtifactIdentityStat,
  sameDirectoryIdentity,
  sameRegularFileIdentity,
} from './legacy-tool-artifact-identity';

describe('LegacyToolArtifactInventory', () => {
  it('maps real legacy Provider outputs to deterministic old IDs and current content hashes', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-inventory-'));
    const oldPort = new ArtifactStoreToolPort(new FileArtifactStore({ rootPath: root }));
    const jsonContent = JSON.stringify({ rows: [1, 2, 3] });
    const jsonId = await oldPort.store({
      invocationId: 'invocation-2',
      toolId: 'tool.report',
      value: { rows: [1, 2, 3] },
    });
    const textId = await oldPort.store({
      invocationId: 'invocation-1',
      toolId: 'tool.report',
      value: 'legacy text',
      mimeType: 'text/plain',
    });

    const result = await new LegacyToolArtifactInventory({ legacyRootPath: root }).scan();

    expect(result).toEqual({
      totalBytes: Buffer.byteLength(jsonContent) + Buffer.byteLength('legacy text'),
      entries: [
        {
          relativePath: 'tool-results/tool.report/invocation-1.txt',
          legacyArtifactId: textId,
          contentHash: sha256('legacy text'),
          sizeBytes: Buffer.byteLength('legacy text'),
          mimeType: 'text/plain',
          legacyToolPathSegment: 'tool.report',
          legacyInvocationPathSegment: 'invocation-1',
        },
        {
          relativePath: 'tool-results/tool.report/invocation-2.json',
          legacyArtifactId: jsonId,
          contentHash: sha256(jsonContent),
          sizeBytes: Buffer.byteLength(jsonContent),
          mimeType: 'application/json',
          legacyToolPathSegment: 'tool.report',
          legacyInvocationPathSegment: 'invocation-2',
        },
      ],
    });
    await expect(
      fs.readFile(path.join(root, 'tool-results', 'tool.report', 'invocation-1.txt'), 'utf8')
    ).resolves.toBe('legacy text');
  });

  it('returns an empty inventory when the legacy root has no Tool outputs', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-inventory-empty-'));
    await expect(new LegacyToolArtifactInventory({ legacyRootPath: root }).scan()).resolves.toEqual(
      { entries: [], totalBytes: 0 }
    );
  });

  it('accepts an unchanged directory with a non-single link count', async () => {
    const before = identityStat('directory', { nlink: 3n });
    const after = identityStat('directory', { nlink: 3n });

    expect(sameDirectoryIdentity(before, after)).toBe(true);
    expect(
      sameRegularFileIdentity(
        identityStat('file', { nlink: 2n }),
        identityStat('file', { nlink: 2n })
      )
    ).toBe(false);

    const fixture = await createMutationFixture('directory-links');
    const result = await scanWithDirectoryLinkCount(fixture.root, 3n);
    expect(result.entries).toHaveLength(1);
    expect(result.entries[0].relativePath).toBe('tool-results/tool.identity/invocation.txt');
  });

  it.each([
    ['device', { dev: 2n }],
    ['inode', { ino: 2n }],
    ['link topology', { nlink: 3n }],
    ['size', { size: 4097n }],
    ['mtime nanoseconds', { mtimeNs: 1_000_000_001n }],
    ['ctime nanoseconds', { ctimeNs: 1_000_000_001n }],
  ] as const)('rejects a real directory identity change in %s', (_name, change) => {
    const before = identityStat('directory', { nlink: 2n });
    const after = identityStat('directory', { nlink: 2n, ...change });

    expect(sameDirectoryIdentity(before, after)).toBe(false);
  });

  it('rejects directory and regular-file type replacement without timestamp tolerance', () => {
    const directory = identityStat('directory', { nlink: 2n });
    const file = identityStat('file');
    const symlink = identityStat('symlink');

    expect(sameDirectoryIdentity(directory, file)).toBe(false);
    expect(sameDirectoryIdentity(directory, symlink)).toBe(false);
    expect(sameRegularFileIdentity(file, directory)).toBe(false);
    expect(sameRegularFileIdentity(file, symlink)).toBe(false);
    expect(
      sameRegularFileIdentity(file, identityStat('file', { mtimeNs: file.mtimeNs + 1n }))
    ).toBe(false);
  });

  it('fails closed when entry, per-file, or aggregate bounds are exceeded', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-inventory-limits-'));
    const oldPort = new ArtifactStoreToolPort(new FileArtifactStore({ rootPath: root }));
    await oldPort.store({ invocationId: 'one', toolId: 'tool.limit', value: '1234' });
    await oldPort.store({ invocationId: 'two', toolId: 'tool.limit', value: '5678' });

    for (const options of [{ maxEntries: 1 }, { maxFileBytes: 3 }, { maxTotalBytes: 7 }]) {
      await expect(
        new LegacyToolArtifactInventory({ legacyRootPath: root, ...options }).scan()
      ).rejects.toMatchObject({ code: 'LEGACY_INVENTORY_LIMIT_EXCEEDED' });
    }
  });

  it('rejects unexpected nesting and symbolic-link directory entries', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-inventory-layout-'));
    const nested = path.join(root, 'tool-results', 'tool.invalid', 'nested');
    await fs.mkdir(nested, { recursive: true });
    await fs.writeFile(path.join(nested, 'invocation.json'), '{}');
    await expect(
      new LegacyToolArtifactInventory({ legacyRootPath: root }).scan()
    ).rejects.toBeInstanceOf(LegacyToolArtifactInventoryError);

    await fs.rm(path.join(root, 'tool-results'), { recursive: true });
    const outside = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-inventory-outside-'));
    await fs.writeFile(path.join(outside, 'invocation.json'), '{}');
    await fs.mkdir(path.join(root, 'tool-results'), { recursive: true });
    await fs.symlink(
      outside,
      path.join(root, 'tool-results', 'tool.link'),
      process.platform === 'win32' ? 'junction' : 'dir'
    );
    await expect(
      new LegacyToolArtifactInventory({ legacyRootPath: root }).scan()
    ).rejects.toMatchObject({ code: 'LEGACY_INVENTORY_INVALID_LAYOUT' });
  });

  it('rejects hard-linked legacy files that alias content outside the migration root', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-inventory-hardlink-'));
    const outsideRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), 'hypha-legacy-inventory-hardlink-outside-')
    );
    const outside = path.join(outsideRoot, 'outside.txt');
    const linked = path.join(root, 'tool-results', 'tool.link', 'invocation.txt');
    await fs.writeFile(outside, 'outside content');
    await fs.mkdir(path.dirname(linked), { recursive: true });
    await fs.link(outside, linked);

    await expect(
      new LegacyToolArtifactInventory({ legacyRootPath: root }).scan()
    ).rejects.toMatchObject({ code: 'LEGACY_INVENTORY_INVALID_LAYOUT' });
    await expect(fs.readFile(outside, 'utf8')).resolves.toBe('outside content');
  });

  it('rejects a legacy output path that is itself an external file symlink', async () => {
    const fixture = await createMutationFixture('external-file-symlink');
    const outsideRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), 'hypha-legacy-inventory-file-symlink-outside-')
    );
    const outside = path.join(outsideRoot, 'outside.txt');
    await fs.writeFile(outside, 'outside content');
    await fs.rm(fixture.filePath);
    await createFileSymlinkOrHardlink(outside, fixture.filePath);

    await expect(
      new LegacyToolArtifactInventory({ legacyRootPath: fixture.root }).scan()
    ).rejects.toMatchObject({ code: 'LEGACY_INVENTORY_INVALID_LAYOUT' });
  });

  it('rejects a legacy output symlink targeting a control-plane-like path', async () => {
    const fixture = await createMutationFixture('control-plane-file-symlink');
    const controlPlaneDirectory = path.join(fixture.root, '.control-plane');
    const sensitiveFile = path.join(controlPlaneDirectory, 'credentials.txt');
    await fs.mkdir(controlPlaneDirectory);
    await fs.writeFile(sensitiveFile, 'sensitive');
    await fs.rm(fixture.filePath);
    await createFileSymlinkOrHardlink(sensitiveFile, fixture.filePath);

    await expect(
      new LegacyToolArtifactInventory({ legacyRootPath: fixture.root }).scan()
    ).rejects.toMatchObject({ code: 'LEGACY_INVENTORY_INVALID_LAYOUT' });
  });

  it.each([
    {
      name: 'adds a file',
      target: (fixture: MutationFixture) => fixture.toolPath,
      mutate: (fixture: MutationFixture) =>
        fs.writeFile(path.join(fixture.toolPath, 'added.txt'), 'added'),
    },
    {
      name: 'deletes a file',
      target: (fixture: MutationFixture) => fixture.toolPath,
      mutate: (fixture: MutationFixture) => fs.rm(fixture.filePath),
    },
    {
      name: 'adds a child directory',
      target: (fixture: MutationFixture) => fixture.toolPath,
      mutate: (fixture: MutationFixture) =>
        fs.mkdir(path.join(fixture.toolPath, 'added-directory')),
    },
    {
      name: 'deletes a child directory',
      target: (fixture: MutationFixture) => fixture.toolResultsPath,
      mutate: (fixture: MutationFixture) => fs.rm(fixture.toolPath, { recursive: true }),
    },
    {
      name: 'renames a directory and replaces its path with a new directory',
      target: (fixture: MutationFixture) => fixture.toolPath,
      mutate: async (fixture: MutationFixture) => {
        await fs.rename(fixture.toolPath, `${fixture.toolPath}.renamed`);
        await fs.mkdir(fixture.toolPath);
        await fs.writeFile(path.join(fixture.toolPath, 'invocation.txt'), 'legacy');
      },
    },
    {
      name: 'replaces a directory with a regular file',
      target: (fixture: MutationFixture) => fixture.toolPath,
      mutate: async (fixture: MutationFixture) => {
        await fs.rename(fixture.toolPath, `${fixture.toolPath}.renamed`);
        await fs.writeFile(fixture.toolPath, 'replacement');
      },
    },
    {
      name: 'replaces a directory with an external symlink',
      target: (fixture: MutationFixture) => fixture.toolPath,
      mutate: async (fixture: MutationFixture) => {
        const outside = await fs.mkdtemp(
          path.join(os.tmpdir(), 'hypha-legacy-inventory-directory-outside-')
        );
        await fs.rename(fixture.toolPath, `${fixture.toolPath}.renamed`);
        await fs.symlink(
          outside,
          fixture.toolPath,
          process.platform === 'win32' ? 'junction' : 'dir'
        );
      },
    },
    {
      name: 'replaces a directory with a symlink loop',
      target: (fixture: MutationFixture) => fixture.toolPath,
      mutate: async (fixture: MutationFixture) => {
        await fs.rename(fixture.toolPath, `${fixture.toolPath}.renamed`);
        await fs.symlink(
          fixture.toolResultsPath,
          fixture.toolPath,
          process.platform === 'win32' ? 'junction' : 'dir'
        );
      },
    },
  ])('fails closed when scanning a directory that $name', async ({ target, mutate }) => {
    const fixture = await createMutationFixture('directory-mutation');

    await expectMutationAfterFirstLstat(fixture, target(fixture), () => mutate(fixture));
  });

  it.each([
    {
      name: 'is modified in place',
      mutate: (fixture: MutationFixture) => fs.writeFile(fixture.filePath, 'changed'),
    },
    {
      name: 'is deleted and recreated',
      mutate: async (fixture: MutationFixture) => {
        await fs.rm(fixture.filePath);
        await fs.writeFile(fixture.filePath, 'legacy');
      },
    },
    {
      name: 'is renamed and its original path receives a new inode',
      mutate: async (fixture: MutationFixture) => {
        await fs.rename(fixture.filePath, `${fixture.filePath}.renamed`);
        await fs.writeFile(fixture.filePath, 'legacy');
        const original = await fs.lstat(`${fixture.filePath}.renamed`, { bigint: true });
        await fs.utimes(
          fixture.filePath,
          Number(original.atimeNs) / 1_000_000_000,
          Number(original.mtimeNs) / 1_000_000_000
        );
      },
    },
    {
      name: 'is replaced by a directory',
      mutate: async (fixture: MutationFixture) => {
        await fs.rm(fixture.filePath);
        await fs.mkdir(fixture.filePath);
      },
    },
    {
      name: 'gains a hardlink alias after the initial lstat',
      mutate: (fixture: MutationFixture) =>
        fs.link(fixture.filePath, path.join(fixture.root, 'outside-alias.txt')),
    },
    {
      name: 'is modified through a hardlink alias introduced after the initial lstat',
      mutate: async (fixture: MutationFixture) => {
        const alias = path.join(fixture.root, 'outside-mutating-alias.txt');
        await fs.link(fixture.filePath, alias);
        await fs.writeFile(alias, 'mutate');
      },
    },
    {
      name: 'is replaced by an external symlink or equivalent fail-closed alias',
      mutate: (fixture: MutationFixture) => replaceFileWithExternalLink(fixture),
    },
    {
      name: 'is renamed away before open',
      mutate: (fixture: MutationFixture) =>
        fs.rename(fixture.filePath, `${fixture.filePath}.renamed`),
    },
  ])('fails closed when a regular file $name', async ({ mutate }) => {
    const fixture = await createMutationFixture('file-mutation');

    await expectMutationAfterFirstLstat(fixture, fixture.filePath, () => mutate(fixture));
  });

  it('detects same-size content mutation after read and before the final handle stat', async () => {
    const fixture = await createMutationFixture('mutation-after-read');

    await expectFileMutationAtHandleStage(fixture, 'after-read', () =>
      fs.writeFile(fixture.filePath, 'mutate')
    );
  });

  it('detects path replacement after the final handle stat and before the final lstat', async () => {
    const fixture = await createMutationFixture('replacement-before-final-lstat');

    await expectFileMutationAtHandleStage(fixture, 'after-final-stat', async () => {
      await fs.rename(fixture.filePath, `${fixture.filePath}.renamed`);
      await fs.writeFile(fixture.filePath, 'legacy');
    });
  });

  it('detects file replacement between parent traversal and the first child lstat', async () => {
    const fixture = await createMutationFixture('replacement-before-file-lstat');

    await expectMutationBeforeFirstLstat(fixture, fixture.filePath, () =>
      replaceFileWithExternalLink(fixture)
    );
  });

  it('detects directory replacement between parent traversal and the first child lstat', async () => {
    const fixture = await createMutationFixture('replacement-before-directory-lstat');

    await expectMutationBeforeFirstLstat(fixture, fixture.toolPath, async () => {
      const outside = await fs.mkdtemp(
        path.join(os.tmpdir(), 'hypha-legacy-inventory-parent-child-outside-')
      );
      await fs.rename(fixture.toolPath, `${fixture.toolPath}.renamed`);
      await fs.symlink(
        outside,
        fixture.toolPath,
        process.platform === 'win32' ? 'junction' : 'dir'
      );
    });
  });

  it('revalidates an earlier file after later entries have been scanned', async () => {
    const fixture = await createMutationFixture('late-earlier-file-mutation');
    const laterFile = path.join(fixture.toolPath, 'z-later.txt');
    await fs.writeFile(laterFile, 'later');

    await expectMutationAfterFirstLstat(fixture, laterFile, () =>
      fs.writeFile(fixture.filePath, 'mutate')
    );
  });

  it('revalidates an earlier directory after a later tool directory is traversed', async () => {
    const fixture = await createMutationFixture('late-directory-mutation');
    const laterTool = path.join(fixture.toolResultsPath, 'tool.z-later');
    await fs.mkdir(laterTool);
    await fs.writeFile(path.join(laterTool, 'invocation.txt'), 'later');

    await expectMutationAfterFirstLstat(fixture, laterTool, () =>
      fs.writeFile(path.join(fixture.toolPath, 'added-after-scan.txt'), 'added')
    );
  });
});

interface MutationFixture {
  root: string;
  toolResultsPath: string;
  toolPath: string;
  filePath: string;
}

async function createMutationFixture(label: string): Promise<MutationFixture> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), `hypha-legacy-${label}-`));
  const toolResultsPath = path.join(root, 'tool-results');
  const toolPath = path.join(toolResultsPath, 'tool.identity');
  const filePath = path.join(toolPath, 'invocation.txt');
  await fs.mkdir(toolPath, { recursive: true });
  await fs.writeFile(filePath, 'legacy');
  return { root, toolResultsPath, toolPath, filePath };
}

async function expectMutationAfterFirstLstat(
  fixture: MutationFixture,
  target: string,
  mutate: () => Promise<unknown>
): Promise<void> {
  const originalLstat = fs.lstat.bind(fs);
  const normalizedTarget = path.resolve(target);
  let mutationApplied = false;
  const implementation = async (filename: Parameters<typeof fs.lstat>[0]) => {
    const stat = await originalLstat(filename, { bigint: true });
    if (!mutationApplied && path.resolve(String(filename)) === normalizedTarget) {
      mutationApplied = true;
      await mutate();
    }
    return stat;
  };
  const spy = vi
    .spyOn(fs, 'lstat')
    .mockImplementation(implementation as unknown as typeof fs.lstat);
  try {
    await expect(
      new LegacyToolArtifactInventory({ legacyRootPath: fixture.root }).scan()
    ).rejects.toMatchObject({ code: 'LEGACY_INVENTORY_SOURCE_CHANGED' });
    expect(mutationApplied).toBe(true);
  } finally {
    spy.mockRestore();
  }
}

async function expectMutationBeforeFirstLstat(
  fixture: MutationFixture,
  target: string,
  mutate: () => Promise<unknown>
): Promise<void> {
  const originalLstat = fs.lstat.bind(fs);
  const normalizedTarget = path.resolve(target);
  let mutationApplied = false;
  const implementation = async (filename: Parameters<typeof fs.lstat>[0]) => {
    if (!mutationApplied && path.resolve(String(filename)) === normalizedTarget) {
      mutationApplied = true;
      await mutate();
    }
    return originalLstat(filename, { bigint: true });
  };
  const spy = vi
    .spyOn(fs, 'lstat')
    .mockImplementation(implementation as unknown as typeof fs.lstat);
  try {
    await expect(
      new LegacyToolArtifactInventory({ legacyRootPath: fixture.root }).scan()
    ).rejects.toMatchObject({ code: 'LEGACY_INVENTORY_SOURCE_CHANGED' });
    expect(mutationApplied).toBe(true);
  } finally {
    spy.mockRestore();
  }
}

async function scanWithDirectoryLinkCount(
  root: string,
  nlink: bigint
): Promise<Awaited<ReturnType<LegacyToolArtifactInventory['scan']>>> {
  const originalLstat = fs.lstat.bind(fs);
  const implementation = async (filename: Parameters<typeof fs.lstat>[0]) => {
    const stat = await originalLstat(filename, { bigint: true });
    if (!stat.isDirectory()) return stat;
    return Object.assign(Object.create(Object.getPrototypeOf(stat)) as BigIntStats, stat, {
      nlink,
    });
  };
  const spy = vi
    .spyOn(fs, 'lstat')
    .mockImplementation(implementation as unknown as typeof fs.lstat);
  try {
    return await new LegacyToolArtifactInventory({ legacyRootPath: root }).scan();
  } finally {
    spy.mockRestore();
  }
}

async function replaceFileWithExternalLink(fixture: MutationFixture): Promise<void> {
  const outside = path.join(fixture.root, 'outside.txt');
  await fs.writeFile(outside, 'external');
  await fs.rm(fixture.filePath);
  await createFileSymlinkOrHardlink(outside, fixture.filePath);
}

async function createFileSymlinkOrHardlink(source: string, destination: string): Promise<void> {
  try {
    await fs.symlink(source, destination, 'file');
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (process.platform !== 'win32' || (code !== 'EPERM' && code !== 'EACCES')) throw error;
    // Windows without Developer Mode cannot create file symlinks. A hardlink
    // still exercises the same fail-closed path-alias boundary without skipping.
    await fs.link(source, destination);
  }
}

async function expectFileMutationAtHandleStage(
  fixture: MutationFixture,
  stage: 'after-read' | 'after-final-stat',
  mutate: () => Promise<unknown>
): Promise<void> {
  const originalOpen = fs.open.bind(fs);
  let mutationApplied = false;
  const implementation = async (
    filename: Parameters<typeof fs.open>[0],
    flags: Parameters<typeof fs.open>[1]
  ) => {
    const handle = await originalOpen(filename, flags);
    if (path.resolve(String(filename)) !== path.resolve(fixture.filePath)) return handle;

    if (stage === 'after-read') {
      const originalReadFile = handle.readFile.bind(handle);
      vi.spyOn(handle, 'readFile').mockImplementation(async () => {
        const content = await originalReadFile();
        mutationApplied = true;
        await mutate();
        return content;
      });
    } else {
      const originalStat = handle.stat.bind(handle);
      let statCalls = 0;
      const statImplementation = async (options: { bigint: true }) => {
        const stat = await originalStat(options);
        statCalls += 1;
        if (statCalls === 2) {
          mutationApplied = true;
          await mutate();
        }
        return stat;
      };
      vi.spyOn(handle, 'stat').mockImplementation(
        statImplementation as unknown as typeof handle.stat
      );
    }
    return handle;
  };
  const spy = vi.spyOn(fs, 'open').mockImplementation(implementation as unknown as typeof fs.open);
  try {
    await expect(
      new LegacyToolArtifactInventory({ legacyRootPath: fixture.root }).scan()
    ).rejects.toMatchObject({ code: 'LEGACY_INVENTORY_SOURCE_CHANGED' });
    expect(mutationApplied).toBe(true);
  } finally {
    spy.mockRestore();
  }
}

function identityStat(
  kind: 'file' | 'directory' | 'symlink',
  overrides: Partial<Omit<LegacyToolArtifactIdentityStat, 'isFile' | 'isDirectory'>> = {}
): LegacyToolArtifactIdentityStat {
  return {
    dev: 1n,
    ino: 1n,
    nlink: kind === 'directory' ? 2n : 1n,
    size: 4096n,
    mtimeNs: 1_000_000_000n,
    ctimeNs: 1_000_000_000n,
    isFile: () => kind === 'file',
    isDirectory: () => kind === 'directory',
    ...overrides,
  };
}

function sha256(value: string): string {
  return `sha256:${createHash('sha256').update(value).digest('hex')}`;
}
