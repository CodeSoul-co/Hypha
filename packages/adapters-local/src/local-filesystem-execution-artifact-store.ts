import fs from 'node:fs/promises';
import path from 'node:path';
import type {
  ArtifactContent,
  ArtifactCopyRequest,
  ArtifactGetRequest,
  ArtifactObjectMetadata,
  ArtifactPutRequest,
  ArtifactStorageRef,
  ArtifactStoreCapabilities,
  ArtifactStoreProvider,
  ProviderHealth,
} from '@hypha/core';
import {
  artifactCopyRequestSchema,
  artifactStorageRefSchema,
  validateArtifactGetRequest,
  validateArtifactPutRequest,
} from '@hypha/core';
import { ArtifactContentLimitError } from './artifact-content-io';
import {
  ArtifactStoreAdapterError,
  artifactStoreError,
  validateArtifactStoreInput,
} from './artifact-store-adapter-error';
import {
  type LocalArtifactStorePaths,
  ensureSafeLocalArtifactDirectory,
  hashLocalArtifactFile,
  listLocalArtifactFiles,
  localArtifactBlobPath,
  pathExists,
  prepareLocalArtifactStore,
  publishLocalArtifactBlob,
  streamLocalArtifactFile,
  writeLocalArtifactTempFile,
} from './local-artifact-files';
import {
  deleteLocalArtifactManifest,
  listLocalArtifactManifests,
  readLocalArtifactManifest,
  writeLocalArtifactManifest,
  type LocalArtifactObjectManifest,
} from './local-artifact-manifest';
import {
  cloneLocalArtifactMetadata,
  localManifestMetadata,
  normalizeLocalArtifactRange,
  normalizeLocalArtifactStoreError,
} from './local-artifact-store-values';

export interface LocalFilesystemExecutionArtifactStoreOptions {
  id?: string;
  rootPath: string;
  maxObjectBytes?: number;
  now?: () => string;
}

export interface LocalFilesystemExecutionArtifactStoreStats {
  objects: number;
  blobs: number;
  storedBytes: number;
}

export interface LocalArtifactGarbageCollectionResult {
  deletedBlobs: number;
  reclaimedBytes: number;
}

export class LocalFilesystemExecutionArtifactStore implements ArtifactStoreProvider {
  readonly id: string;
  private readonly maxObjectBytes: number;
  private readonly now: () => string;
  private readonly ready: Promise<LocalArtifactStorePaths>;
  private mutationTail: Promise<void> = Promise.resolve();
  private closed = false;

  constructor(options: LocalFilesystemExecutionArtifactStoreOptions) {
    if (!options.rootPath?.trim()) throw new TypeError('rootPath is required.');
    this.id = options.id ?? 'artifact-store.local-filesystem.execution';
    this.maxObjectBytes = options.maxObjectBytes ?? 1024 * 1024 * 1024;
    if (!Number.isSafeInteger(this.maxObjectBytes) || this.maxObjectBytes <= 0) {
      throw new TypeError('maxObjectBytes must be a positive safe integer.');
    }
    this.now = options.now ?? (() => new Date().toISOString());
    this.ready = prepareLocalArtifactStore(options.rootPath);
  }

  async capabilities(): Promise<ArtifactStoreCapabilities> {
    return {
      versioning: false,
      rangeRead: true,
      signedAccess: false,
      serverSideCopy: true,
      encryption: false,
      multipartUpload: false,
      contentAddressing: true,
    };
  }

  async put(input: ArtifactPutRequest): Promise<ArtifactStorageRef> {
    return this.operation('put', async (paths) => {
      const request = validateArtifactStoreInput(() => validateArtifactPutRequest(input));
      let temporary;
      try {
        temporary = await writeLocalArtifactTempFile(request.content, paths, this.maxObjectBytes);
      } catch (error) {
        if (error instanceof ArtifactContentLimitError) {
          throw artifactStoreError('ARTIFACT_TOO_LARGE', error.message, false, {
            maxObjectBytes: error.maxBytes,
            observedBytes: error.observedBytes,
          });
        }
        throw error;
      }
      try {
        this.assertOpen();
        if (request.sizeBytes !== undefined && request.sizeBytes !== temporary.sizeBytes) {
          throw artifactStoreError(
            'ARTIFACT_VALIDATION_FAILED',
            'Artifact size does not match the declared sizeBytes.',
            false,
            { expectedSizeBytes: request.sizeBytes, actualSizeBytes: temporary.sizeBytes }
          );
        }
        if (
          request.expectedContentHash !== undefined &&
          request.expectedContentHash !== temporary.contentHash
        ) {
          throw artifactStoreError(
            'ARTIFACT_HASH_MISMATCH',
            'Artifact bytes do not match expectedContentHash.',
            false,
            {
              expectedContentHash: request.expectedContentHash,
              actualContentHash: temporary.contentHash,
            }
          );
        }

        return await this.withMutation(async () => {
          this.assertOpen();
          const existing = await readLocalArtifactManifest(paths, request.objectKey);
          if (request.ifAbsent && existing) {
            throw artifactStoreError(
              'ARTIFACT_VERSION_CONFLICT',
              `Artifact object ${request.objectKey} already exists.`,
              false
            );
          }
          const blobPath = localArtifactBlobPath(paths, temporary.contentHash);
          await publishLocalArtifactBlob(
            paths.root,
            temporary.path,
            blobPath,
            temporary.contentHash,
            temporary.sizeBytes
          );
          const manifest: LocalArtifactObjectManifest = {
            schemaVersion: 1,
            objectKey: request.objectKey,
            contentHash: temporary.contentHash,
            sizeBytes: temporary.sizeBytes,
            mimeType: request.mimeType,
            etag: temporary.contentHash,
            metadata: cloneLocalArtifactMetadata(request.metadata),
            lastModifiedAt: this.now(),
          };
          await writeLocalArtifactManifest(paths, manifest);
          if (existing && existing.contentHash !== manifest.contentHash) {
            await this.deleteBlobWhenUnreferenced(paths, existing.contentHash);
          }
          return this.storageRef(manifest);
        });
      } catch (error) {
        await fs.rm(temporary.path, { force: true }).catch(() => undefined);
        throw error;
      }
    });
  }

  async get(input: ArtifactGetRequest): Promise<ArtifactContent> {
    return this.operation('get', async (paths) => {
      const request = validateArtifactStoreInput(() => validateArtifactGetRequest(input));
      this.assertOwnedRef(request.ref);
      const manifest = await this.requireManifest(paths, request.ref.objectKey);
      this.assertCurrentRef(request.ref, manifest);
      const blobPath = localArtifactBlobPath(paths, manifest.contentHash);
      await ensureSafeLocalArtifactDirectory(paths.root, path.dirname(blobPath));
      const verified = await hashLocalArtifactFile(blobPath, paths.root);
      if (
        verified.contentHash !== manifest.contentHash ||
        verified.sizeBytes !== manifest.sizeBytes
      ) {
        throw artifactStoreError(
          'ARTIFACT_HASH_MISMATCH',
          'Stored Artifact bytes failed integrity verification.',
          false,
          {
            expectedContentHash: manifest.contentHash,
            actualContentHash: verified.contentHash,
            expectedSizeBytes: manifest.sizeBytes,
            actualSizeBytes: verified.sizeBytes,
          }
        );
      }
      if (request.expectedContentHash && request.expectedContentHash !== verified.contentHash) {
        throw artifactStoreError(
          'ARTIFACT_HASH_MISMATCH',
          'Stored Artifact does not match expectedContentHash.',
          false,
          {
            expectedContentHash: request.expectedContentHash,
            actualContentHash: verified.contentHash,
          }
        );
      }
      const range = normalizeLocalArtifactRange(request.range, manifest.sizeBytes);
      return {
        stream: streamLocalArtifactFile(blobPath, range, paths.root),
        contentHash: verified.contentHash,
        sizeBytes: range ? range.endInclusive! - range.start + 1 : manifest.sizeBytes,
        mimeType: manifest.mimeType,
        etag: manifest.etag,
        range,
      };
    });
  }

  async head(input: ArtifactStorageRef): Promise<ArtifactObjectMetadata | null> {
    return this.operation('head', async (paths) => {
      const ref = validateArtifactStoreInput(() => artifactStorageRefSchema.parse(input));
      this.assertOwnedRef(ref);
      const manifest = await readLocalArtifactManifest(paths, ref.objectKey);
      if (!manifest) return null;
      this.assertCurrentRef(ref, manifest);
      return localManifestMetadata(manifest);
    });
  }

  async exists(input: ArtifactStorageRef): Promise<boolean> {
    return this.operation('exists', async (paths) => {
      const ref = validateArtifactStoreInput(() => artifactStorageRefSchema.parse(input));
      this.assertOwnedRef(ref);
      const manifest = await readLocalArtifactManifest(paths, ref.objectKey);
      if (!manifest) return false;
      if (ref.etag && ref.etag !== manifest.etag) return false;
      return true;
    });
  }

  async delete(input: ArtifactStorageRef): Promise<void> {
    await this.operation('delete', async (paths) => {
      const ref = validateArtifactStoreInput(() => artifactStorageRefSchema.parse(input));
      this.assertOwnedRef(ref);
      await this.withMutation(async () => {
        const manifest = await readLocalArtifactManifest(paths, ref.objectKey);
        if (!manifest) return;
        this.assertCurrentRef(ref, manifest);
        await deleteLocalArtifactManifest(paths, ref.objectKey);
        await this.deleteBlobWhenUnreferenced(paths, manifest.contentHash);
      });
    });
  }

  async copy(input: ArtifactCopyRequest): Promise<ArtifactStorageRef> {
    return this.operation('copy', async (paths) => {
      const request = validateArtifactStoreInput(() => artifactCopyRequestSchema.parse(input));
      this.assertOwnedRef(request.source);
      return this.withMutation(async () => {
        const source = await this.requireManifest(paths, request.source.objectKey);
        this.assertCurrentRef(request.source, source);
        const existing = await readLocalArtifactManifest(paths, request.targetObjectKey);
        if (request.ifAbsent && existing) {
          throw artifactStoreError(
            'ARTIFACT_VERSION_CONFLICT',
            `Artifact object ${request.targetObjectKey} already exists.`,
            false
          );
        }
        if (request.targetObjectKey === request.source.objectKey) return this.storageRef(source);
        const target: LocalArtifactObjectManifest = {
          ...source,
          objectKey: request.targetObjectKey,
          metadata: cloneLocalArtifactMetadata(source.metadata),
          lastModifiedAt: this.now(),
        };
        await writeLocalArtifactManifest(paths, target);
        if (existing && existing.contentHash !== target.contentHash) {
          await this.deleteBlobWhenUnreferenced(paths, existing.contentHash);
        }
        return this.storageRef(target);
      });
    });
  }

  async health(): Promise<ProviderHealth> {
    if (this.closed) {
      return { status: 'unhealthy', checkedAt: this.now(), message: 'Artifact Store is closed.' };
    }
    try {
      await this.ready;
      return {
        status: 'healthy',
        checkedAt: this.now(),
        details: { ...(await this.stats()) },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt: this.now(),
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async close(): Promise<void> {
    this.closed = true;
    await this.mutationTail;
  }

  async stats(): Promise<LocalFilesystemExecutionArtifactStoreStats> {
    const paths = await this.ready;
    const manifests = await listLocalArtifactManifests(paths);
    const blobFiles = await listLocalArtifactFiles(paths.blobs);
    let storedBytes = 0;
    for (const filename of blobFiles) storedBytes += (await fs.stat(filename)).size;
    return { objects: manifests.length, blobs: blobFiles.length, storedBytes };
  }

  async collectGarbage(): Promise<LocalArtifactGarbageCollectionResult> {
    return this.operation('collectGarbage', async (paths) =>
      this.withMutation(async () => {
        const referenced = new Set(
          (await listLocalArtifactManifests(paths)).map((manifest) => manifest.contentHash)
        );
        let deletedBlobs = 0;
        let reclaimedBytes = 0;
        for (const filename of await listLocalArtifactFiles(paths.blobs)) {
          const digest = path.basename(filename);
          if (referenced.has(`sha256:${digest}`)) continue;
          const sizeBytes = (await fs.stat(filename)).size;
          await fs.rm(filename, { force: true });
          deletedBlobs += 1;
          reclaimedBytes += sizeBytes;
        }
        return { deletedBlobs, reclaimedBytes };
      })
    );
  }

  private async operation<T>(
    operation: string,
    action: (paths: LocalArtifactStorePaths) => Promise<T>
  ): Promise<T> {
    try {
      this.assertOpen();
      const paths = await this.ready;
      this.assertOpen();
      return await action(paths);
    } catch (error) {
      throw normalizeLocalArtifactStoreError(error, operation);
    }
  }

  private async withMutation<T>(action: () => Promise<T>): Promise<T> {
    const previous = this.mutationTail;
    let release!: () => void;
    this.mutationTail = new Promise<void>((resolve) => {
      release = resolve;
    });
    await previous;
    try {
      return await action();
    } finally {
      release();
    }
  }

  private assertOpen(): void {
    if (this.closed) {
      throw artifactStoreError('ARTIFACT_STORE_UNAVAILABLE', 'Artifact Store is closed.', false);
    }
  }

  private assertOwnedRef(ref: ArtifactStorageRef): void {
    if (ref.storeId !== this.id) {
      throw artifactStoreError(
        'ARTIFACT_INVALID_INPUT',
        `Artifact reference belongs to Store ${ref.storeId}, not ${this.id}.`,
        false
      );
    }
    if (ref.versionId) {
      throw artifactStoreError(
        'ARTIFACT_INVALID_INPUT',
        'Local Filesystem Artifact Store does not support provider version IDs.',
        false
      );
    }
  }

  private assertCurrentRef(ref: ArtifactStorageRef, manifest: LocalArtifactObjectManifest): void {
    if (ref.etag && ref.etag !== manifest.etag) {
      throw artifactStoreError(
        'ARTIFACT_VERSION_CONFLICT',
        'Artifact reference no longer identifies the current object content.',
        false,
        { expectedEtag: ref.etag, actualEtag: manifest.etag }
      );
    }
  }

  private async requireManifest(
    paths: LocalArtifactStorePaths,
    objectKey: string
  ): Promise<LocalArtifactObjectManifest> {
    const manifest = await readLocalArtifactManifest(paths, objectKey);
    if (!manifest) {
      throw artifactStoreError(
        'ARTIFACT_NOT_FOUND',
        `Artifact object ${objectKey} was not found.`,
        false
      );
    }
    return manifest;
  }

  private async deleteBlobWhenUnreferenced(
    paths: LocalArtifactStorePaths,
    contentHash: string
  ): Promise<void> {
    const stillReferenced = (await listLocalArtifactManifests(paths)).some(
      (manifest) => manifest.contentHash === contentHash
    );
    if (!stillReferenced) {
      const blobPath = localArtifactBlobPath(paths, contentHash);
      await ensureSafeLocalArtifactDirectory(paths.root, path.dirname(blobPath));
      await fs.rm(blobPath, { force: true });
    }
  }

  private storageRef(manifest: LocalArtifactObjectManifest): ArtifactStorageRef {
    return {
      storeId: this.id,
      objectKey: manifest.objectKey,
      etag: manifest.etag,
      encrypted: false,
    };
  }
}
