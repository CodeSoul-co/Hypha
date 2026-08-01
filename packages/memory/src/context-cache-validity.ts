import type { ContextArtifactRef, ContextArtifactStore } from './context-artifacts';
import type { ContextEnvelope } from './context-contracts';
import { sha256 } from './memory-utils';

export interface ContextCacheVersionSnapshot {
  contextProfileRevision: string;
  memoryProfileRevision: string;
  scopeHash: string;
  providerRevision?: string;
  policyRevision?: string;
  selectedMemoryVersionIds: string[];
  sourceHashes: Record<string, string>;
  artifactHashes?: Record<string, string>;
}

export interface VersionValidContextCacheRecord {
  key: string;
  envelope: ContextEnvelope;
  snapshot: ContextCacheVersionSnapshot;
  validityHash: string;
  envelopeHash: string;
  createdAt: string;
  expiresAt?: string;
}

export interface ContextEnvelopeCacheStore {
  get(key: string): Promise<VersionValidContextCacheRecord | null>;
  set(key: string, value: VersionValidContextCacheRecord): Promise<void>;
  delete(key: string): Promise<void>;
}

export class InMemoryContextEnvelopeCacheStore implements ContextEnvelopeCacheStore {
  private readonly entries = new Map<string, VersionValidContextCacheRecord>();
  async get(key: string): Promise<VersionValidContextCacheRecord | null> {
    const value = this.entries.get(key);
    return value ? structuredClone(value) : null;
  }
  async set(key: string, value: VersionValidContextCacheRecord): Promise<void> {
    this.entries.set(key, structuredClone(value));
  }
  async delete(key: string): Promise<void> {
    this.entries.delete(key);
  }
}

export interface VersionValidContextCacheOptions {
  store: ContextEnvelopeCacheStore;
  now?: () => string;
  artifactStore?: ContextArtifactStore;
}

export class VersionValidContextCache {
  private readonly now: () => string;
  constructor(private readonly options: VersionValidContextCacheOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async get(key: string, current: ContextCacheVersionSnapshot): Promise<ContextEnvelope | null> {
    const record = await this.options.store.get(key);
    if (!record) return null;
    if (record.expiresAt && record.expiresAt <= this.now()) {
      await this.options.store.delete(key);
      return null;
    }
    const expected = createContextCacheValidityHash(current);
    if (
      record.validityHash !== expected ||
      !sameSnapshot(record.snapshot, current) ||
      record.envelopeHash !== sha256(record.envelope)
    ) {
      await this.options.store.delete(key);
      return null;
    }
    try {
      await validateEnvelopeArtifacts(record.envelope, current, this.options.artifactStore);
    } catch {
      await this.options.store.delete(key);
      return null;
    }
    return structuredClone(record.envelope);
  }

  async set(
    key: string,
    envelope: ContextEnvelope,
    snapshot: ContextCacheVersionSnapshot,
    expiresAt?: string
  ): Promise<void> {
    if (envelope.profileRevision !== snapshot.contextProfileRevision) {
      throw new Error('Context envelope profile revision is not version-valid for caching.');
    }
    const selected = Object.values(envelope.provenanceIndex)
      .map((label) => label.memoryVersionId)
      .filter((value): value is string => Boolean(value))
      .sort();
    const declared = [...snapshot.selectedMemoryVersionIds].sort();
    if (selected.length > 0 && JSON.stringify(selected) !== JSON.stringify(declared)) {
      throw new Error('Context envelope memory versions do not match the cache validity snapshot.');
    }
    await validateEnvelopeArtifacts(envelope, snapshot, this.options.artifactStore);
    await this.options.store.set(key, {
      key,
      envelope: structuredClone(envelope),
      snapshot: normalizeSnapshot(snapshot),
      validityHash: createContextCacheValidityHash(snapshot),
      envelopeHash: sha256(envelope),
      createdAt: this.now(),
      expiresAt,
    });
  }
}

export function createContextCacheValidityHash(snapshot: ContextCacheVersionSnapshot): string {
  return sha256(normalizeSnapshot(snapshot));
}

function normalizeSnapshot(snapshot: ContextCacheVersionSnapshot): ContextCacheVersionSnapshot {
  return {
    ...snapshot,
    selectedMemoryVersionIds: [...snapshot.selectedMemoryVersionIds].sort(),
    sourceHashes: sortRecord(snapshot.sourceHashes),
    artifactHashes: snapshot.artifactHashes ? sortRecord(snapshot.artifactHashes) : undefined,
  };
}

function sameSnapshot(
  left: ContextCacheVersionSnapshot,
  right: ContextCacheVersionSnapshot
): boolean {
  return createContextCacheValidityHash(left) === createContextCacheValidityHash(right);
}

async function validateEnvelopeArtifacts(
  envelope: ContextEnvelope,
  snapshot: ContextCacheVersionSnapshot,
  artifactStore?: ContextArtifactStore
): Promise<void> {
  const references = envelope.artifactRefs ?? [];
  const declaredById = new Map(references.map((reference) => [reference.id, reference]));
  for (const reference of segmentArtifactReferences(envelope)) {
    const declared = declaredById.get(reference.id);
    if (!declared || sha256(declared) !== sha256(reference)) {
      throw new Error('Context segment Artifact reference is not declared by the envelope.');
    }
  }
  const actualHashes = sortRecord(
    Object.fromEntries(references.map((reference) => [reference.id, reference.contentHash]))
  );
  const declaredHashes = sortRecord(snapshot.artifactHashes ?? {});
  if (sha256(actualHashes) !== sha256(declaredHashes)) {
    throw new Error('Context Artifact hashes do not match the cache validity snapshot.');
  }
  if (references.length > 0 && !artifactStore) {
    throw new Error('Context Artifact cache validation requires an Artifact store.');
  }
  for (const reference of references) {
    await artifactStore!.read(reference, {
      scopeHash: snapshot.scopeHash,
      profileRevision: snapshot.contextProfileRevision,
    });
  }
}

function segmentArtifactReferences(envelope: ContextEnvelope): ContextArtifactRef[] {
  return [
    ...envelope.systemSegments,
    ...envelope.instructionSegments,
    ...envelope.dataSegments,
  ].flatMap((segment) => segment.artifactRefs ?? []);
}

function sortRecord(record: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(record).sort(([a], [b]) => a.localeCompare(b)));
}
