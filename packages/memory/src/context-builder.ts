import type {
  ContextBudgetPlan,
  ContextBuildExplanation,
  ContextBuildInput,
  ContextBundle,
  ContextEnvelope,
  ContextInjectionGateway,
  ContextItem,
  ContextItemPolicyEvaluator,
  ContextItemPolicyInput,
  ContextProfileSpec,
  ContextRejectedItem,
  ContextSourceBudget,
  MemoryContextBuilder,
  PromptSegment,
  TokenEstimator,
} from './context-contracts';
import { hashMemoryScope, sha256 } from './memory-utils';
import {
  DeterministicExtractiveContextCompactor,
  type ContextCompactor,
} from './context-compaction';
import type { ContextArtifactRef, ContextArtifactStore } from './context-artifacts';

export class CalibratedCharacterTokenEstimator implements TokenEstimator {
  readonly id = 'tokenizer.calibrated-character-v1';
  constructor(private readonly charactersPerToken = 4) {}
  estimate(text: string): number {
    return Math.max(1, Math.ceil(text.length / this.charactersPerToken));
  }
}
export class MetadataContextItemPolicyEvaluator implements ContextItemPolicyEvaluator {
  async evaluate(input: ContextItemPolicyInput): Promise<{ allowed: boolean; reason?: string }> {
    if (input.item.metadata?.policyAllowed === false) {
      return {
        allowed: false,
        reason:
          typeof input.item.metadata.policyReason === 'string'
            ? input.item.metadata.policyReason
            : 'Context item was denied by its policy decision.',
      };
    }
    return { allowed: true };
  }
}

export class DefaultMemoryContextBuilder implements MemoryContextBuilder {
  private readonly explanations = new Map<string, ContextBuildExplanation>();
  constructor(
    private readonly tokenizer: TokenEstimator = new CalibratedCharacterTokenEstimator(),
    private readonly now: () => string = () => new Date().toISOString(),
    private readonly compactor: ContextCompactor = new DeterministicExtractiveContextCompactor(),
    private readonly policy: ContextItemPolicyEvaluator = new MetadataContextItemPolicyEvaluator(),
    private readonly artifactStore?: ContextArtifactStore
  ) {}

  async build(request: ContextBuildInput): Promise<ContextBundle> {
    validateProfileReference(request.profileRef.id, request.profile);
    const scopeHash = hashMemoryScope(request.scope);
    const rejectedItems: ContextRejectedItem[] = [];
    const sourceSpecs = new Map(request.profile.sources.map((source) => [source.id, source]));
    const normalized: ContextItem[] = [];
    for (const rawItem of request.sourceItems) {
      const item = normalizeItem(rawItem, this.tokenizer);
      const itemScopeHash = item.metadata?.scopeHash;
      if (itemScopeHash && itemScopeHash !== scopeHash) {
        rejectedItems.push({ itemId: item.id, reason: 'scope_denied' });
        continue;
      }
      if (
        item.metadata?.status === 'deleted' ||
        item.metadata?.status === 'invalidated' ||
        item.metadata?.status === 'superseded'
      ) {
        rejectedItems.push({ itemId: item.id, reason: 'invalid_status' });
        continue;
      }
      const policyDecision = await this.policy.evaluate({
        operationId: request.operationId,
        principal: request.principal,
        scope: request.scope,
        profileRef: request.profileRef,
        item,
      });
      if (!policyDecision.allowed) {
        rejectedItems.push({ itemId: item.id, reason: 'policy_denied' });
        continue;
      }
      if (
        item.untrusted &&
        looksInstructionLike(item.text) &&
        request.profile.untrustedContentPolicy === 'reject'
      ) {
        rejectedItems.push({ itemId: item.id, reason: 'untrusted_rejected' });
        continue;
      }
      normalized.push(item);
    }

    const deduplicated = deduplicate(normalized, request.profile, rejectedItems);
    const ranked = deduplicated
      .map((item) => rankItem(item, request.profile, sourceSpecs.get(item.sourceId ?? '')))
      .sort(
        (left, right) =>
          right.rankScore - left.rankScore || left.item.id.localeCompare(right.item.id)
      );
    const budgetPlan = createBudgetPlan(request, this.tokenizer.id);
    const selected: ContextItem[] = [];
    const artifactRefs: ContextArtifactRef[] = [];
    const omittedItemIds: string[] = [];
    const truncationRecords: ContextEnvelope['truncationRecords'] = [];
    let remaining = budgetPlan.dynamicTokens;
    let remainingCharacters = request.profile.maxCharacters ?? Number.MAX_SAFE_INTEGER;
    let remainingBytes = request.profile.maxSerializedBytes ?? Number.MAX_SAFE_INTEGER;
    const profileRevision = request.profile.revision ?? request.profile.version;
    const sourceRemaining = new Map(
      budgetPlan.sourceBudgets.map((budget) => [budget.sourceId, budget.maxTokens])
    );

    for (const rankedItem of ranked.slice(0, request.profile.maxItems ?? ranked.length)) {
      let item = normalizeItem(
        applyTrustBoundary(rankedItem.item, request.profile),
        this.tokenizer
      );
      const sourceSpec =
        request.profile.sources.find((source) => source.id === item.sourceId) ??
        request.profile.sources.find((source) => source.type === item.sourceType);
      const sourceBudget = sourceSpec
        ? budgetPlan.sourceBudgets.find((budget) => budget.sourceId === sourceSpec.id)
        : undefined;
      const required = Boolean(item.required || sourceSpec?.required);
      if (required !== Boolean(item.required)) item = { ...item, required };
      const sourceAvailable = sourceBudget
        ? (sourceRemaining.get(sourceBudget.sourceId) ?? 0)
        : remaining;
      const maxTokens = Math.min(sourceAvailable, remaining);
      if (fitsLimits(item, maxTokens, remainingCharacters, remainingBytes)) {
        selected.push(item);
        remaining -= item.tokenEstimate;
        remainingCharacters -= item.text.length;
        remainingBytes -= serializedItemBytes(item);
        if (sourceBudget) {
          sourceRemaining.set(sourceBudget.sourceId, sourceAvailable - item.tokenEstimate);
        }
        continue;
      }

      const overflowPolicy = sourceBudget?.overflowPolicy ?? (required ? 'truncate' : 'drop');
      if (overflowPolicy === 'fail') {
        throw new Error(`Context item exceeded a fail-closed budget: ${item.id}`);
      }
      if (overflowPolicy === 'spill_to_artifact') {
        if (!this.artifactStore) {
          throw new Error(`Context Artifact store is required to spill item: ${item.id}`);
        }
        const reference = await this.artifactStore.put({
          content: item.text,
          scopeHash,
          profileRevision,
          sourceItemId: item.id,
          createdAt: this.now(),
        });
        const spilled = createArtifactDescriptorItem(item, reference, this.tokenizer);
        if (!fitsLimits(spilled, maxTokens, remainingCharacters, remainingBytes)) {
          await this.artifactStore.delete(reference);
          if (required) {
            throw new Error(`Required Context Artifact descriptor cannot fit budget: ${item.id}`);
          }
          omitForBudget(item, omittedItemIds, rejectedItems, truncationRecords);
          continue;
        }
        selected.push(spilled);
        artifactRefs.push(reference);
        remaining -= spilled.tokenEstimate;
        remainingCharacters -= spilled.text.length;
        remainingBytes -= serializedItemBytes(spilled);
        if (sourceBudget) {
          sourceRemaining.set(sourceBudget.sourceId, sourceAvailable - spilled.tokenEstimate);
        }
        truncationRecords.push({
          itemId: item.id,
          originalTokens: item.tokenEstimate,
          retainedTokens: spilled.tokenEstimate,
          method: 'spill_to_artifact',
          reason: 'content_externalized',
        });
        continue;
      }

      const shouldTruncate =
        overflowPolicy === 'truncate' ||
        (required && request.profile.truncation.preserveRequiredSources) ||
        request.profile.truncation.method === 'truncate_items' ||
        request.profile.truncation.method === 'hybrid';
      if (shouldTruncate) {
        const truncated = truncateItemToLimits(
          item,
          maxTokens,
          remainingCharacters,
          remainingBytes,
          request.profile.truncation.truncationMarker ?? '[truncated]',
          this.tokenizer
        );
        const minimum = required ? 1 : (request.profile.truncation.minItemTokens ?? 8);
        if (truncated && truncated.tokenEstimate >= minimum) {
          selected.push(truncated);
          remaining -= truncated.tokenEstimate;
          remainingCharacters -= truncated.text.length;
          remainingBytes -= serializedItemBytes(truncated);
          if (sourceBudget) {
            sourceRemaining.set(sourceBudget.sourceId, sourceAvailable - truncated.tokenEstimate);
          }
          truncationRecords.push({
            itemId: item.id,
            originalTokens: item.tokenEstimate,
            retainedTokens: truncated.tokenEstimate,
            method: 'truncate',
            reason: required ? 'required_source' : 'budget_exceeded',
          });
          continue;
        }
      }
      if (required) {
        throw new Error(`Required context item cannot fit budget: ${item.id}`);
      }
      omitForBudget(item, omittedItemIds, rejectedItems, truncationRecords);
    }
    const requiredMissing = request.profile.sources
      .filter((source) => source.required)
      .filter(
        (source) =>
          !selected.some((item) => item.sourceId === source.id || item.sourceType === source.type)
      );
    if (requiredMissing.length > 0) {
      throw new Error(
        `Required context sources are missing from the final bundle: ${requiredMissing
          .map((source) => source.id)
          .join(', ')}`
      );
    }

    const utilization =
      (budgetPlan.dynamicTokens - remaining) / Math.max(1, budgetPlan.dynamicTokens);
    if (
      request.profile.compactionPolicy?.enabled &&
      omittedItemIds.length > 0 &&
      remaining > 0 &&
      utilization >= request.profile.compactionPolicy.triggerRatio
    ) {
      const omitted = normalized.filter((item) => omittedItemIds.includes(item.id));
      const compacted = await this.compactor.compact({
        items: omitted,
        maxTokens: remaining,
        tokenizer: this.tokenizer,
      });
      if (compacted) {
        const bounded = normalizeItem(
          applyTrustBoundary(compacted, request.profile),
          this.tokenizer
        );
        if (fitsLimits(bounded, remaining, remainingCharacters, remainingBytes)) {
          selected.push(bounded);
          remaining -= bounded.tokenEstimate;
          remainingCharacters -= bounded.text.length;
          remainingBytes -= serializedItemBytes(bounded);
          for (const item of omitted) {
            truncationRecords.push({
              itemId: item.id,
              originalTokens: item.tokenEstimate,
              retainedTokens: bounded.tokenEstimate,
              method: 'summarize',
              reason: `compacted_by:${this.compactor.id}`,
            });
          }
        }
      }
    }

    const sourceHashes = Object.fromEntries(
      request.profile.sources.map((source) => [
        source.id,
        sha256(
          selected
            .filter((item) => item.sourceId === source.id)
            .map((item) => item.artifactRef?.contentHash ?? item.text)
        ),
      ])
    );
    const contextHash = sha256({
      profile: request.profile.revision ?? request.profile.version,
      tokenizer: this.tokenizer.id,
      items: selected.map((item) => ({
        id: item.id,
        text: item.text,
        artifactHash: item.artifactRef?.contentHash,
        provenance: item.provenance,
      })),
      budgetPlan,
    });
    const bundle: ContextBundle = {
      id: `context:${contextHash.slice(7, 31)}`,
      runId: request.runId,
      stepId: request.stepId,
      profileRef: request.profileRef,
      profileRevision: request.profile.revision ?? request.profile.version,
      items: selected,
      totalTokens: selected.reduce((sum, item) => sum + item.tokenEstimate, 0),
      totalCharacters: selected.reduce((sum, item) => sum + item.text.length, 0),
      omittedItemIds,
      rejectedItems,
      conflicts: [],
      sourceHashes,
      contextHash,
      createdAt: this.now(),
      artifactRefs,
      metadata: {
        scopeHash,
        budgetPlan,
        truncationRecords,
        serializedBytes: request.profile.maxSerializedBytes
          ? request.profile.maxSerializedBytes - remainingBytes
          : selected.reduce((sum, item) => sum + serializedItemBytes(item), 0),
      },
    };
    this.explanations.set(contextHash, {
      contextHash,
      selectedItemIds: selected.map((item) => item.id),
      omittedItemIds,
      rejectedItems,
      ranking: ranked.map((entry) => ({
        itemId: entry.item.id,
        score: entry.rankScore,
        reasons: entry.reasons,
      })),
      budgetPlan,
    });
    return bundle;
  }

  async explain(contextHash: string): Promise<ContextBuildExplanation | null> {
    return this.explanations.get(contextHash) ?? null;
  }
}

export class DefaultContextInjectionGateway implements ContextInjectionGateway {
  constructor(
    private readonly now: () => string = () => new Date().toISOString(),
    private readonly artifactStore?: ContextArtifactStore
  ) {}

  async buildEnvelope(
    bundle: ContextBundle,
    profile: ContextProfileSpec
  ): Promise<ContextEnvelope> {
    const profileRevision = profile.revision ?? profile.version;
    if (bundle.profileRevision !== profileRevision) {
      throw new Error('Context bundle profile revision does not match the injection profile.');
    }
    const explanationBudget = bundle.metadata?.budgetPlan as ContextBudgetPlan | undefined;
    const budgetPlan = explanationBudget ?? fallbackBudgetPlan(profile);
    const scopeHash =
      typeof bundle.metadata?.scopeHash === 'string' ? bundle.metadata.scopeHash : '';
    const itemArtifactRefs = bundle.items
      .map((item) => item.artifactRef)
      .filter((reference): reference is ContextArtifactRef => Boolean(reference));
    const artifactRefs = bundle.artifactRefs ?? itemArtifactRefs;
    if (artifactRefs.length > 0 && (!this.artifactStore || !scopeHash)) {
      throw new Error('Context Artifact validation requires an Artifact store and scope binding.');
    }
    const declaredArtifactIds = new Set(artifactRefs.map((reference) => reference.id));
    if (itemArtifactRefs.some((reference) => !declaredArtifactIds.has(reference.id))) {
      throw new Error('Context bundle omitted an item Artifact reference.');
    }
    for (const reference of artifactRefs) {
      await this.artifactStore!.read(reference, {
        scopeHash,
        profileRevision: bundle.profileRevision,
      });
    }
    const systemSegments: PromptSegment[] = [];
    const dataSegments: PromptSegment[] = [];
    const provenanceIndex: ContextEnvelope['provenanceIndex'] = {};

    for (const item of bundle.items) {
      const sourceRef = item.sourceId ?? item.id;
      const segment: PromptSegment = {
        id: `segment:${item.id}`,
        role: item.sourceType === 'system' ? 'system' : 'data',
        text: item.text,
        tokenCount: item.tokenEstimate,
        trustLevel:
          item.sourceType === 'system' && !item.untrusted
            ? 'trusted_instruction'
            : item.untrusted
              ? 'untrusted_data'
              : 'trusted_data',
        sourceRefs: [sourceRef],
        required: item.required,
        artifactRefs: item.artifactRef ? [item.artifactRef] : undefined,
      };
      if (item.sourceType === 'system') systemSegments.push(segment);
      else dataSegments.push(segment);
      provenanceIndex[item.id] = {
        sourceType: item.sourceType,
        sourceId: sourceRef,
        memoryId: typeof item.metadata?.memoryId === 'string' ? item.metadata.memoryId : undefined,
        memoryVersionId:
          typeof item.metadata?.memoryVersionId === 'string'
            ? item.metadata.memoryVersionId
            : undefined,
        citationLabel: `[source:${sourceRef}]`,
      };
    }

    return {
      id: `envelope:${bundle.contextHash.slice(7, 31)}`,
      runId: bundle.runId,
      stepId: bundle.stepId,
      contextHash: bundle.contextHash,
      profileRevision: bundle.profileRevision,
      budgetPlan,
      systemSegments,
      instructionSegments: [],
      dataSegments,
      includedSourceRefs: Array.from(new Set(bundle.items.map((item) => item.sourceId ?? item.id))),
      omittedSourceRefs: bundle.omittedItemIds,
      truncationRecords:
        (bundle.metadata?.truncationRecords as ContextEnvelope['truncationRecords'] | undefined) ??
        [],
      provenanceIndex,
      conflicts: bundle.conflicts,
      totalTokens: bundle.totalTokens,
      createdAt: this.now(),
      artifactRefs,
    };
  }
}

function normalizeItem(item: ContextItem, tokenizer: TokenEstimator): ContextItem {
  const text =
    item.text || (typeof item.content === 'string' ? item.content : JSON.stringify(item.content));
  return { ...item, text, tokenEstimate: tokenizer.estimate(text) };
}

function deduplicate(
  items: ContextItem[],
  profile: ContextProfileSpec,
  rejected: ContextRejectedItem[]
): ContextItem[] {
  if (profile.deduplication === 'none') return items;
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = profile.deduplication === 'id' ? item.id : sha256(item.text.trim().toLowerCase());
    if (seen.has(key)) {
      rejected.push({ itemId: item.id, reason: 'duplicate' });
      return false;
    }
    seen.add(key);
    return true;
  });
}

function rankItem(
  item: ContextItem,
  profile: ContextProfileSpec,
  source?: { priority: number }
): { item: ContextItem; rankScore: number; reasons: string[] } {
  const sourceWeight = profile.ranking.sourceWeights?.[item.sourceId ?? ''] ?? 1;
  const relevance = item.score ?? 0;
  const rankScore =
    (item.priority + (source?.priority ?? 0)) * sourceWeight +
    relevance * (profile.ranking.relevanceWeight ?? 1);
  return {
    item: { ...item, score: rankScore },
    rankScore,
    reasons: ['priority', ...(relevance ? ['relevance'] : [])],
  };
}

function createBudgetPlan(request: ContextBuildInput, tokenizerId: string): ContextBudgetPlan {
  const fixedTokens =
    request.reservedSystemTokens + request.reservedInstructionTokens + request.reservedOutputTokens;
  const totalAvailableTokens = Math.min(
    request.profile.maxTokens,
    request.modelContextWindowTokens
  );
  const safetyMarginTokens = Math.max(16, Math.ceil(totalAvailableTokens * 0.02));
  const dynamicTokens = totalAvailableTokens - fixedTokens - safetyMarginTokens;
  if (dynamicTokens <= 0) throw new Error('Context budget is exhausted by reserved tokens.');
  const sourceBudgets: ContextSourceBudget[] = request.profile.sources.map((source) => ({
    sourceId: source.id,
    maxTokens: source.maxTokens ?? dynamicTokens,
    required: source.required ?? false,
    overflowPolicy: source.overflowPolicy ?? (source.required ? 'truncate' : 'drop'),
  }));
  return {
    totalAvailableTokens,
    fixedTokens,
    dynamicTokens,
    sourceBudgets,
    tokenizerRef: request.tokenizerRef ?? { id: tokenizerId, version: '1.0.0' },
    safetyMarginTokens,
  };
}

function applyTrustBoundary(item: ContextItem, profile: ContextProfileSpec): ContextItem {
  if (!item.untrusted) return item;
  if (profile.untrustedContentPolicy === 'tag')
    return { ...item, text: `<untrusted-data>\n${item.text}\n</untrusted-data>` };
  if (profile.untrustedContentPolicy === 'escape')
    return {
      ...item,
      text: item.text.replace(/(^|\n)\s*(system|assistant|developer)\s*:/gi, '$1[data-$2]:'),
    };
  return item;
}

function fitsLimits(
  item: ContextItem,
  maxTokens: number,
  maxCharacters: number,
  maxBytes: number
): boolean {
  return (
    item.tokenEstimate <= maxTokens &&
    item.text.length <= maxCharacters &&
    serializedItemBytes(item) <= maxBytes
  );
}

function serializedItemBytes(item: ContextItem): number {
  return Buffer.byteLength(JSON.stringify(item), 'utf8');
}

function truncateItemToLimits(
  item: ContextItem,
  maxTokens: number,
  maxCharacters: number,
  maxBytes: number,
  marker: string,
  tokenizer: TokenEstimator
): ContextItem | null {
  if (maxTokens <= 0 || maxCharacters <= 0 || maxBytes <= 0) return null;
  let low = 0;
  let high = Math.min(item.text.length, maxCharacters);
  let best: ContextItem | null = null;
  while (low <= high) {
    const retained = Math.floor((low + high) / 2);
    const text =
      retained < item.text.length ? `${item.text.slice(0, retained)}${marker}` : item.text;
    const candidate = { ...item, text, content: text, tokenEstimate: tokenizer.estimate(text) };
    if (fitsLimits(candidate, maxTokens, maxCharacters, maxBytes)) {
      best = candidate;
      low = retained + 1;
    } else {
      high = retained - 1;
    }
  }
  return best;
}

function createArtifactDescriptorItem(
  item: ContextItem,
  reference: ContextArtifactRef,
  tokenizer: TokenEstimator
): ContextItem {
  const text = `[Context Artifact ${reference.id} hash=${reference.contentHash} bytes=${reference.sizeBytes}]`;
  return {
    ...item,
    content: { artifactRef: reference },
    text,
    tokenEstimate: tokenizer.estimate(text),
    artifactRef: reference,
  };
}

function omitForBudget(
  item: ContextItem,
  omittedItemIds: string[],
  rejectedItems: ContextRejectedItem[],
  truncationRecords: ContextEnvelope['truncationRecords']
): void {
  omittedItemIds.push(item.id);
  rejectedItems.push({ itemId: item.id, reason: 'budget_exceeded' });
  truncationRecords.push({
    itemId: item.id,
    originalTokens: item.tokenEstimate,
    retainedTokens: 0,
    method: 'drop',
    reason: 'budget_exceeded',
  });
}
function looksInstructionLike(text: string): boolean {
  return /(ignore (all|previous)|system prompt|developer message|follow these instructions)/i.test(
    text
  );
}

function validateProfileReference(id: string, profile: ContextProfileSpec): void {
  if (id !== profile.id) throw new Error(`Context profile mismatch: ${id} != ${profile.id}`);
}

function fallbackBudgetPlan(profile: ContextProfileSpec): ContextBudgetPlan {
  return {
    totalAvailableTokens: profile.maxTokens,
    fixedTokens: 0,
    dynamicTokens: profile.maxTokens,
    sourceBudgets: profile.sources.map((source) => ({
      sourceId: source.id,
      maxTokens: source.maxTokens ?? profile.maxTokens,
      required: source.required ?? false,
      overflowPolicy: source.overflowPolicy ?? (source.required ? 'truncate' : 'drop'),
    })),
    tokenizerRef: { id: 'tokenizer.unknown', version: '1.0.0' },
    safetyMarginTokens: 0,
  };
}
