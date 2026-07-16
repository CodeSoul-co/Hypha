import type { ProviderHealth } from './operations';
import type {
  ExtractedMemoryCandidate,
  MemoryExtractionBatch,
  MemoryExtractionCursor,
  MemoryExtractionJob,
  MemoryExtractionProfileSpec,
  MemoryExtractionRequest,
  MemoryExtractionSourceAdapter,
  MemoryExtractionSourceBatch,
  MemoryExtractionSourceRef,
  MemoryExtractionSourceType,
  MemoryExtractor,
  NormalizedExtractionInput,
} from './lifecycle-contracts';
import { hashMemoryScope, memoryError, normalizeMemoryError, sha256 } from './memory-utils';

export type ExtractionSourceLoader<T> = (ref: MemoryExtractionSourceRef) => Promise<T>;

export class BasicMemoryExtractionSourceAdapter<
  T = unknown,
> implements MemoryExtractionSourceAdapter<T> {
  constructor(
    readonly type: MemoryExtractionSourceType,
    private readonly loader: ExtractionSourceLoader<T>,
    private readonly normalizer: (
      value: T,
      ref: MemoryExtractionSourceRef
    ) => NormalizedExtractionInput
  ) {}

  async load(
    refs: MemoryExtractionSourceRef[],
    cursor?: MemoryExtractionCursor
  ): Promise<MemoryExtractionSourceBatch<T>> {
    const applicable = refs.filter((ref) => ref.type === this.type);
    const filtered = cursor?.sourceHash
      ? applicable.filter((ref) => ref.sourceHash !== cursor.sourceHash)
      : applicable;
    const values = await Promise.all(filtered.map((ref) => this.loader(ref)));
    return {
      sourceRefs: filtered,
      items: filtered.map((sourceRef, index) => ({
        sourceRef,
        value: values[index] as T,
      })),
      nextCursor: filtered.length
        ? {
            sourceType: this.type,
            sourceId: filtered[filtered.length - 1]?.sourceId ?? this.type,
            sequence: (cursor?.sequence ?? 0) + filtered.length,
            timestamp: new Date().toISOString(),
            sourceHash:
              filtered[filtered.length - 1]?.sourceHash ?? sha256(values[values.length - 1]),
          }
        : cursor,
    };
  }

  async normalize(batch: MemoryExtractionSourceBatch<T>): Promise<NormalizedExtractionInput[]> {
    return batch.items.map(({ value, sourceRef }) => this.normalizer(value, sourceRef));
  }

  async health(): Promise<ProviderHealth> {
    return { status: 'healthy', checkedAt: new Date().toISOString() };
  }
}

export class DeterministicMemoryExtractor implements MemoryExtractor {
  readonly id = 'memory.extractor.deterministic';

  async extract(
    inputs: NormalizedExtractionInput[],
    profile: MemoryExtractionProfileSpec
  ): Promise<ExtractedMemoryCandidate[]> {
    const outputType = profile.outputMemoryTypes[0] ?? 'semantic';
    return inputs
      .map((input, index) => {
        const text = input.canonicalText ?? stringify(input.value);
        return {
          candidateId: sha256({ source: input.sourceRef, index }).slice(7, 31),
          type: outputType,
          content: input.value,
          canonicalText: text,
          confidence: input.sourceRef.trustScore ?? authorityConfidence(input.sourceRef.authority),
          canonicalKey: sha256(text.trim().toLowerCase()),
          temporal: {
            observedAt: input.sourceRef.observedAt,
            validFrom: input.sourceRef.validFrom,
            validTo: input.sourceRef.validTo,
            temporalConfidence: input.sourceRef.trustScore,
          },
          authority: input.sourceRef.authority,
          evidence: [
            {
              sourceRef: input.sourceRef,
              supportType: 'direct' as const,
              confidence: input.sourceRef.trustScore,
            },
          ],
          extractionRationale: 'Deterministic source normalization.',
          extractionProfileRevision: profile.revision ?? profile.version,
          sourceHash: input.sourceRef.sourceHash ?? sha256(input.value),
        };
      })
      .filter((candidate) => candidate.confidence >= profile.candidateValidation.minConfidence)
      .filter(
        (candidate) =>
          !profile.candidateValidation.requireCanonicalText ||
          candidate.canonicalText.trim().length > 0
      )
      .filter(
        (candidate) => !profile.candidateValidation.requireEvidence || candidate.evidence.length > 0
      )
      .filter(
        (candidate) =>
          !profile.candidateValidation.rejectInstructionLikeContent ||
          !looksInstructionLike(candidate.canonicalText)
      )
      .slice(0, profile.candidateValidation.maxCandidatesPerJob ?? inputs.length);
  }

  async health(): Promise<ProviderHealth> {
    return { status: 'healthy', checkedAt: new Date().toISOString() };
  }
}

export interface MemoryExtractionStateStore {
  getJob(id: string): Promise<MemoryExtractionJob | null>;
  saveJob(job: MemoryExtractionJob): Promise<void>;
  getBatch(id: string): Promise<MemoryExtractionBatch | null>;
  saveBatch(batch: MemoryExtractionBatch): Promise<void>;
  getCursor(
    sourceType: MemoryExtractionSourceType,
    sourceId: string
  ): Promise<MemoryExtractionCursor | null>;
  saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise<void>;
}

export class InMemoryMemoryExtractionStateStore implements MemoryExtractionStateStore {
  private readonly jobs = new Map<string, MemoryExtractionJob>();
  private readonly batches = new Map<string, MemoryExtractionBatch>();
  private readonly cursors = new Map<string, MemoryExtractionCursor>();

  async getJob(id: string): Promise<MemoryExtractionJob | null> {
    const job = this.jobs.get(id);
    return job ? structuredClone(job) : null;
  }

  async saveJob(job: MemoryExtractionJob): Promise<void> {
    this.jobs.set(job.id, structuredClone(job));
  }

  async getBatch(id: string): Promise<MemoryExtractionBatch | null> {
    const batch = this.batches.get(id);
    return batch ? structuredClone(batch) : null;
  }

  async saveBatch(batch: MemoryExtractionBatch): Promise<void> {
    this.batches.set(batch.id, structuredClone(batch));
  }

  async getCursor(
    sourceType: MemoryExtractionSourceType,
    sourceId: string
  ): Promise<MemoryExtractionCursor | null> {
    const cursor = this.cursors.get(cursorKey(sourceType, sourceId));
    return cursor ? structuredClone(cursor) : null;
  }

  async saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise<void> {
    const key = cursorKey(cursor.sourceType, cursor.sourceId);
    const current = this.cursors.get(key);
    if ((current?.sequence ?? 0) !== (expectedSequence ?? current?.sequence ?? 0)) {
      throw memoryError(
        'MEMORY_EXTRACTION_CURSOR_CONFLICT',
        `Extraction cursor changed before commit: ${key}`
      );
    }
    this.cursors.set(key, structuredClone(cursor));
  }
}

export interface MemoryExtractionCoordinatorOptions {
  adapters: MemoryExtractionSourceAdapter[];
  extractor: MemoryExtractor;
  stateStore?: MemoryExtractionStateStore;
  now?: () => string;
}

export class MemoryExtractionCoordinator {
  readonly stateStore: MemoryExtractionStateStore;
  private readonly now: () => string;

  constructor(private readonly options: MemoryExtractionCoordinatorOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
    this.stateStore = options.stateStore ?? new InMemoryMemoryExtractionStateStore();
  }

  async run(
    request: MemoryExtractionRequest,
    profile: MemoryExtractionProfileSpec
  ): Promise<{ job: MemoryExtractionJob; batch: MemoryExtractionBatch }> {
    const profileRevision = profile.revision ?? profile.version;
    const sourceHash = sha256(request.sources);
    const identity = request.idempotencyKey ?? request.operationId;
    const jobId = `extraction:${sha256({ identity, sourceHash, profileRevision }).slice(7, 31)}`;
    const batchId = `${jobId}:batch`;
    const existing = await this.stateStore.getJob(jobId);
    if (existing?.status === 'completed') {
      const batch = await this.stateStore.getBatch(batchId);
      if (!batch) {
        throw memoryError(
          'MEMORY_EXTRACTION_FAILED',
          `Completed extraction job has no batch: ${jobId}`
        );
      }
      return { job: existing, batch };
    }

    const firstSource = request.sources[0];
    const cursorBefore = firstSource
      ? await this.stateStore.getCursor(firstSource.type, firstSource.sourceId)
      : null;
    const job: MemoryExtractionJob = {
      id: jobId,
      operationId: request.operationId,
      scopeHash: hashMemoryScope(request.scope),
      profileRef: request.profileRef,
      profileRevision,
      sourceRefs: request.sources,
      status: 'running',
      cursorBefore: cursorBefore ?? undefined,
      attempts: (existing?.attempts ?? 0) + 1,
      createdAt: existing?.createdAt ?? this.now(),
      startedAt: this.now(),
    };
    await this.stateStore.saveJob(job);

    try {
      const normalized: NormalizedExtractionInput[] = [];
      const cursorCommits: Array<{
        cursor: MemoryExtractionCursor;
        expectedSequence: number;
      }> = [];

      for (const sourceType of new Set(request.sources.map((source) => source.type))) {
        if (!profile.acceptedSourceTypes.includes(sourceType)) continue;
        const adapter = this.options.adapters.find((candidate) => candidate.type === sourceType);
        if (!adapter) {
          throw memoryError(
            'MEMORY_EXTRACTION_SOURCE_UNAVAILABLE',
            `No extraction adapter for ${sourceType}`,
            true
          );
        }
        const refs = request.sources.filter((source) => source.type === sourceType);
        const firstRef = refs[0];
        if (!firstRef) continue;
        const cursor = await this.stateStore.getCursor(sourceType, firstRef.sourceId);
        const sourceBatch = await adapter.load(
          refs,
          request.force ? undefined : (cursor ?? undefined)
        );
        normalized.push(...(await adapter.normalize(sourceBatch)));
        if (sourceBatch.nextCursor && sourceBatch.items.length > 0) {
          cursorCommits.push({
            cursor: {
              ...sourceBatch.nextCursor,
              timestamp: this.now(),
            },
            expectedSequence: cursor?.sequence ?? 0,
          });
        }
      }

      const candidates = await this.options.extractor.extract(normalized, profile);
      const batch: MemoryExtractionBatch = {
        id: batchId,
        jobId,
        sourceRefs: request.sources,
        candidates,
        rejectedCandidates: [],
        sourceHash,
        extractorVersion: this.options.extractor.id,
        createdAt: this.now(),
      };

      await this.stateStore.saveBatch(batch);
      for (const commit of cursorCommits) {
        await this.stateStore.saveCursor(commit.cursor, commit.expectedSequence);
      }
      job.cursorAfter = cursorCommits[cursorCommits.length - 1]?.cursor;
      job.status = 'completed';
      job.completedAt = this.now();
      await this.stateStore.saveJob(job);
      return { job: structuredClone(job), batch: structuredClone(batch) };
    } catch (error) {
      job.status = 'failed';
      job.lastError = normalizeMemoryError(error, 'MEMORY_EXTRACTION_FAILED');
      job.completedAt = this.now();
      await this.stateStore.saveJob(job);
      throw job.lastError;
    }
  }

  getJob(id: string): Promise<MemoryExtractionJob | null> {
    return this.stateStore.getJob(id);
  }
}

export function createConversationExtractionAdapter(
  loader: ExtractionSourceLoader<unknown>
): BasicMemoryExtractionSourceAdapter {
  return new BasicMemoryExtractionSourceAdapter(
    'conversation',
    loader,
    normalizeSource('conversation')
  );
}

export function createTruthExtractionAdapter(
  loader: ExtractionSourceLoader<unknown>
): BasicMemoryExtractionSourceAdapter {
  return new BasicMemoryExtractionSourceAdapter('truth', loader, normalizeSource('truth'));
}

export function createEpisodicRecordExtractionAdapter(
  loader: ExtractionSourceLoader<unknown>
): BasicMemoryExtractionSourceAdapter {
  return new BasicMemoryExtractionSourceAdapter(
    'episodic_record',
    loader,
    normalizeSource('episodic_record')
  );
}

export function createRuntimeEventExtractionAdapter(
  loader: ExtractionSourceLoader<unknown>
): BasicMemoryExtractionSourceAdapter {
  return new BasicMemoryExtractionSourceAdapter(
    'runtime_event',
    loader,
    normalizeSource('runtime_event')
  );
}

function normalizeSource(type: MemoryExtractionSourceType) {
  return (value: unknown, ref: MemoryExtractionSourceRef): NormalizedExtractionInput => ({
    sourceRef: { ...ref, type, sourceHash: ref.sourceHash ?? sha256(value) },
    value,
    canonicalText: stringify(value),
  });
}

function stringify(value: unknown): string {
  return typeof value === 'string' ? value : JSON.stringify(value);
}

function authorityConfidence(authority?: MemoryExtractionSourceRef['authority']): number {
  if (authority === 'authoritative') return 1;
  if (authority === 'verified') return 0.95;
  if (authority === 'system_observed') return 0.85;
  if (authority === 'user_asserted') return 0.75;
  return 0.6;
}

function looksInstructionLike(text: string): boolean {
  return /(ignore (all|previous)|system prompt|developer message|follow these instructions)/i.test(
    text
  );
}

function cursorKey(type: MemoryExtractionSourceType, id: string): string {
  return `${type}:${id}`;
}
