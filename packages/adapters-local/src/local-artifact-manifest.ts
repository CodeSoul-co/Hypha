import { z, type ZodType } from 'zod';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { LocalArtifactStorePaths } from './local-artifact-files';
import {
  ensureSafeLocalArtifactDirectory,
  ensureSafeLocalArtifactFile,
  isNodeError,
  listLocalArtifactFiles,
  localArtifactManifestPath,
  writeJsonAtomically,
} from './local-artifact-files';

export interface LocalArtifactObjectManifest {
  schemaVersion: 1;
  objectKey: string;
  contentHash: string;
  sizeBytes: number;
  mimeType?: string;
  etag: string;
  metadata?: Record<string, string>;
  lastModifiedAt: string;
}

const manifestSchema = z
  .object({
    schemaVersion: z.literal(1),
    objectKey: z.string().min(1),
    contentHash: z.string().regex(/^sha256:[0-9a-f]{64}$/u),
    sizeBytes: z.number().int().nonnegative(),
    mimeType: z.string().min(1).optional(),
    etag: z.string().min(1),
    metadata: z.record(z.string()).optional(),
    lastModifiedAt: z.string().datetime({ offset: true }),
  })
  .strict() satisfies ZodType<LocalArtifactObjectManifest>;

export async function readLocalArtifactManifest(
  paths: LocalArtifactStorePaths,
  objectKey: string
): Promise<LocalArtifactObjectManifest | null> {
  const filename = localArtifactManifestPath(paths, objectKey);
  await ensureSafeLocalArtifactDirectory(paths.root, path.dirname(filename));
  try {
    await ensureSafeLocalArtifactFile(paths.root, filename);
    const value = manifestSchema.parse(JSON.parse(await fs.readFile(filename, 'utf8')));
    if (value.objectKey !== objectKey) {
      throw new Error(`Artifact manifest key collision for ${objectKey}.`);
    }
    return value;
  } catch (error) {
    if (isNodeError(error, 'ENOENT')) return null;
    throw error;
  }
}

export async function writeLocalArtifactManifest(
  paths: LocalArtifactStorePaths,
  manifest: LocalArtifactObjectManifest
): Promise<void> {
  manifestSchema.parse(manifest);
  await writeJsonAtomically(
    paths.root,
    localArtifactManifestPath(paths, manifest.objectKey),
    manifest
  );
}

export async function deleteLocalArtifactManifest(
  paths: LocalArtifactStorePaths,
  objectKey: string
): Promise<void> {
  const filename = localArtifactManifestPath(paths, objectKey);
  await ensureSafeLocalArtifactDirectory(paths.root, path.dirname(filename));
  await fs.rm(filename, { force: true });
}

export async function listLocalArtifactManifests(
  paths: LocalArtifactStorePaths
): Promise<LocalArtifactObjectManifest[]> {
  const manifests: LocalArtifactObjectManifest[] = [];
  for (const filename of await listLocalArtifactFiles(paths.objects, '.json')) {
    manifests.push(manifestSchema.parse(JSON.parse(await fs.readFile(filename, 'utf8'))));
  }
  return manifests;
}
