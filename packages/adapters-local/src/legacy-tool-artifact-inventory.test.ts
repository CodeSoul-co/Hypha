import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { ArtifactStoreToolPort, FileArtifactStore } from './index';
import {
  LegacyToolArtifactInventory,
  LegacyToolArtifactInventoryError,
} from './legacy-tool-artifact-inventory';

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
});

function sha256(value: string): string {
  return `sha256:${createHash('sha256').update(value).digest('hex')}`;
}
