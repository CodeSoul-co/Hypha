import { createHash } from 'node:crypto';
import type { ArtifactRef, ArtifactStoreProvider } from './index';
import { memoryError } from './memory-utils';

export interface ContextArtifactRef {
  id: string;
  path: string;
  contentHash: string;
  sizeBytes: number;
  contentType: 'text/plain; charset=utf-8';
  scopeHash: string;
  profileRevision: string;
  sourceItemId: string;
  createdAt: string;
  expiresAt?: string;
}

export interface ContextArtifactWriteRequest {
  content: string;
  scopeHash: string;
  profileRevision: string;
  sourceItemId: string;
  createdAt: string;
  expiresAt?: string;
}

export interface ContextArtifactReadExpectation {
  scopeHash: string;
  profileRevision: string;
}

export interface ContextArtifactStore {
  readonly durability: 'ephemeral' | 'durable';
  put(request: ContextArtifactWriteRequest): Promise<ContextArtifactRef>;
  read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise<string>;
  delete(reference: ContextArtifactRef): Promise<void>;
}

export interface ContextArtifactRecord {
  reference: ContextArtifactRef;
  content: string;
}

export type InMemoryContextArtifactBacking = Map<string, ContextArtifactRecord>;

export class InMemoryContextArtifactStore implements ContextArtifactStore {
  readonly durability = 'ephemeral' as const;

  constructor(private readonly records: InMemoryContextArtifactBacking = new Map()) {}

  async put(request: ContextArtifactWriteRequest): Promise<ContextArtifactRef> {
    validateWriteRequest(request);
    const contentHash = contextArtifactContentHash(request.content);
    const reference: ContextArtifactRef = {
      id: artifactId(request.scopeHash, request.profileRevision, contentHash),
      path: artifactPath(request.scopeHash, request.profileRevision, contentHash),
      contentHash,
      sizeBytes: Buffer.byteLength(request.content, 'utf8'),
      contentType: 'text/plain; charset=utf-8',
      scopeHash: request.scopeHash,
      profileRevision: request.profileRevision,
      sourceItemId: request.sourceItemId,
      createdAt: request.createdAt,
      expiresAt: request.expiresAt,
    };
    const key = artifactKey(reference);
    const current = this.records.get(key);
    if (current && current.content !== request.content) {
      throw integrityError('Context Artifact hash collision detected.', reference);
    }
    this.records.set(key, { reference: structuredClone(reference), content: request.content });
    return structuredClone(reference);
  }

  async read(
    reference: ContextArtifactRef,
    expected: ContextArtifactReadExpectation
  ): Promise<string> {
    validateContextArtifactReference(reference, expected);
    const record = this.records.get(artifactKey(reference));
    if (!record) throw integrityError('Context Artifact is missing.', reference);
    validateStoredArtifact(record.content, record.reference, reference, expected);
    return record.content;
  }

  async delete(reference: ContextArtifactRef): Promise<void> {
    this.records.delete(artifactKey(reference));
  }
}

export interface ProviderBackedContextArtifactStoreOptions {
  provider: ArtifactStoreProvider;
  durability?: 'ephemeral' | 'durable';
}

export class ProviderBackedContextArtifactStore implements ContextArtifactStore {
  readonly durability: 'ephemeral' | 'durable';

  constructor(private readonly options: ProviderBackedContextArtifactStoreOptions) {
    this.durability = options.durability ?? 'durable';
  }

  async put(request: ContextArtifactWriteRequest): Promise<ContextArtifactRef> {
    validateWriteRequest(request);
    const contentHash = contextArtifactContentHash(request.content);
    const reference: ContextArtifactRef = {
      id: artifactId(request.scopeHash, request.profileRevision, contentHash),
      path: artifactPath(request.scopeHash, request.profileRevision, contentHash),
      contentHash,
      sizeBytes: Buffer.byteLength(request.content, 'utf8'),
      contentType: 'text/plain; charset=utf-8',
      scopeHash: request.scopeHash,
      profileRevision: request.profileRevision,
      sourceItemId: request.sourceItemId,
      createdAt: request.createdAt,
      expiresAt: request.expiresAt,
    };
    const stored = await this.options.provider.put(reference.path, request.content, {
      contentType: reference.contentType,
      sizeBytes: reference.sizeBytes,
      hash: reference.contentHash,
      metadata: {
        id: reference.id,
        scopeHash: reference.scopeHash,
        profileRevision: reference.profileRevision,
        sourceItemId: reference.sourceItemId,
        createdAt: reference.createdAt,
        expiresAt: reference.expiresAt,
      },
    });
    if (stored.path !== reference.path) {
      throw integrityError('Artifact provider changed the content-addressed path.', reference);
    }
    return reference;
  }

  async read(
    reference: ContextArtifactRef,
    expected: ContextArtifactReadExpectation
  ): Promise<string> {
    validateContextArtifactReference(reference, expected);
    const content = await this.options.provider.get(toArtifactRef(reference));
    const text = content.toString('utf8');
    validateStoredArtifact(text, reference, reference, expected);
    return text;
  }

  async delete(reference: ContextArtifactRef): Promise<void> {
    await this.options.provider.delete(toArtifactRef(reference));
  }
}

export function contextArtifactContentHash(content: string): string {
  return `sha256:${createHash('sha256').update(content, 'utf8').digest('hex')}`;
}

export function validateContextArtifactReference(
  reference: ContextArtifactRef,
  expected: ContextArtifactReadExpectation
): void {
  validateReferenceBinding(reference, expected);
  if (
    reference.id !==
    artifactId(reference.scopeHash, reference.profileRevision, reference.contentHash)
  ) {
    throw integrityError('Context Artifact id does not match its content hash.', reference);
  }
  if (
    reference.path !==
    artifactPath(reference.scopeHash, reference.profileRevision, reference.contentHash)
  ) {
    throw integrityError('Context Artifact path does not match its scope and hash.', reference);
  }
}

function validateStoredArtifact(
  content: string,
  stored: ContextArtifactRef,
  requested: ContextArtifactRef,
  expected: ContextArtifactReadExpectation
): void {
  validateContextArtifactReference(stored, expected);
  if (
    stored.id !== requested.id ||
    stored.path !== requested.path ||
    stored.contentHash !== requested.contentHash ||
    stored.sizeBytes !== requested.sizeBytes
  ) {
    throw integrityError('Context Artifact metadata does not match its reference.', requested);
  }
  const actualHash = contextArtifactContentHash(content);
  const actualBytes = Buffer.byteLength(content, 'utf8');
  if (actualHash !== requested.contentHash || actualBytes !== requested.sizeBytes) {
    throw integrityError('Context Artifact content failed integrity verification.', requested);
  }
}

function validateReferenceBinding(
  reference: ContextArtifactRef,
  expected: ContextArtifactReadExpectation
): void {
  if (reference.scopeHash !== expected.scopeHash) {
    throw integrityError('Context Artifact scope binding does not match.', reference);
  }
  if (reference.profileRevision !== expected.profileRevision) {
    throw integrityError('Context Artifact profile revision does not match.', reference);
  }
  validateContextArtifactReferenceShape(reference);
}

function validateContextArtifactReferenceShape(reference: ContextArtifactRef): void {
  if (!/^sha256:[a-f0-9]{64}$/u.test(reference.contentHash)) {
    throw integrityError('Context Artifact content hash is invalid.', reference);
  }
  if (!Number.isSafeInteger(reference.sizeBytes) || reference.sizeBytes < 0) {
    throw integrityError('Context Artifact size is invalid.', reference);
  }
  if (reference.contentType !== 'text/plain; charset=utf-8') {
    throw integrityError('Context Artifact content type is unsupported.', reference);
  }
  if (reference.expiresAt && reference.expiresAt <= reference.createdAt) {
    throw integrityError('Context Artifact expiry must be after creation.', reference);
  }
}

function validateWriteRequest(request: ContextArtifactWriteRequest): void {
  if (!request.scopeHash || !request.profileRevision || !request.sourceItemId) {
    throw memoryError(
      'MEMORY_INVALID_INPUT',
      'Context Artifact writes require scope, profile revision and source item id.'
    );
  }
}

function artifactId(scopeHash: string, profileRevision: string, contentHash: string): string {
  return `context-artifact:${bindingDigest(scopeHash, profileRevision, contentHash)}`;
}

function artifactPath(scopeHash: string, profileRevision: string, contentHash: string): string {
  return `context/${scopeHash}/${bindingDigest(scopeHash, profileRevision, contentHash)}`;
}

function artifactKey(reference: ContextArtifactRef): string {
  return reference.path;
}

function bindingDigest(scopeHash: string, profileRevision: string, contentHash: string): string {
  return createHash('sha256')
    .update(JSON.stringify({ scopeHash, profileRevision, contentHash }), 'utf8')
    .digest('hex');
}
function toArtifactRef(reference: ContextArtifactRef): ArtifactRef {
  return {
    id: reference.id,
    path: reference.path,
    meta: {
      contentType: reference.contentType,
      sizeBytes: reference.sizeBytes,
      hash: reference.contentHash,
      metadata: {
        scopeHash: reference.scopeHash,
        profileRevision: reference.profileRevision,
        sourceItemId: reference.sourceItemId,
        createdAt: reference.createdAt,
        expiresAt: reference.expiresAt,
      },
    },
  };
}

function integrityError(
  message: string,
  reference: ContextArtifactRef
): ReturnType<typeof memoryError> {
  return memoryError('MEMORY_INVALID_INPUT', message, false, {
    artifactId: reference.id,
    integrityFailure: true,
  });
}
