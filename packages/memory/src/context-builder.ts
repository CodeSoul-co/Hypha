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
    private readonly policy: ContextItemPolicyEvaluator = new MetadataContextItemPolicyEvaluator()
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
    const omittedItemIds: string[] = [];
    const truncationRecords: Array<{
      itemId: string;
      originalTokens: number;
      retainedTokens: number;
      method: 'drop' | 'truncate' | 'summarize';
      reason: string;
    }> = [];
    let remaining = budgetPlan.dynamicTokens;
    const sourceRemaining = new Map(
      budgetPlan.sourceBudgets.map((budget) => [budget.sourceId, budget.maxTokens])
    );

    for (const rankedItem of ranked.slice(0, request.profile.maxItems ?? ranked.length)) {
      const item = normalizeItem(
        applyTrustBoundary(rankedItem.item, request.profile),
        this.tokenizer
      );
      const sourceSpec =
        request.profile.sources.find((source) => source.id === item.sourceId) ??
        request.profile.sources.find((source) => source.type === item.sourceType);
      const sourceBudget = sourceSpec
        ? budgetPlan.sourceBudgets.find((budget) => budget.sourceId === sourceSpec.id)
        : undefined;
      const sourceAvailable = sourceBudget
        ? (sourceRemaining.get(sourceBudget.sourceId) ?? 0)
        : remaining;
      const maxTokens = Math.min(sourceAvailable, remaining);
      if (item.tokenEstimate <= maxTokens) {
        selected.push(item);
        remaining -= item.tokenEstimate;
        if (sourceBudget) {
          sourceRemaining.set(sourceBudget.sourceId, sourceAvailable - item.tokenEstimate);
        }
        continue;
      }
      if (item.required && request.profile.truncation.preserveRequiredSources) {
        if (maxTokens <= 0) throw new Error(`Required context item cannot fit budget: ${item.id}`);
        const truncated = truncateItem(
          item,
          maxTokens,
          request.profile.truncation.truncationMarker ?? '[truncated]',
          this.tokenizer
        );
        selected.push(truncated);
        remaining -= truncated.tokenEstimate;
        if (sourceBudget) {
          sourceRemaining.set(sourceBudget.sourceId, sourceAvailable - truncated.tokenEstimate);
        }
        truncationRecords.push({
          itemId: item.id,
          originalTokens: item.tokenEstimate,
          retainedTokens: truncated.tokenEstimate,
          method: 'truncate',
          reason: 'required_source',
        });
      } else if (
        request.profile.truncation.method === 'truncate_items' ||
        request.profile.truncation.method === 'hybrid'
      ) {
        const minimum = request.profile.truncation.minItemTokens ?? 8;
        if (maxTokens >= minimum) {
          const truncated = truncateItem(
            item,
            maxTokens,
            request.profile.truncation.truncationMarker ?? '[truncated]',
            this.tokenizer
          );
          selected.push(truncated);
          remaining -= truncated.tokenEstimate;
          if (sourceBudget) {
            sourceRemaining.set(sourceBudget.sourceId, sourceAvailable - truncated.tokenEstimate);
          }
          truncationRecords.push({
            itemId: item.id,
            originalTokens: item.tokenEstimate,
            retainedTokens: truncated.tokenEstimate,
            method: 'truncate',
            reason: 'budget_exceeded',
          });
        } else {
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
      } else {
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
        if (bounded.tokenEstimate <= remaining) {
          selected.push(bounded);
          remaining -= bounded.tokenEstimate;
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
        sha256(selected.filter((item) => item.sourceId === source.id).map((item) => item.text)),
      ])
    );
    const contextHash = sha256({
      profile: request.profile.revision ?? request.profile.version,
      tokenizer: this.tokenizer.id,
      items: selected.map((item) => ({
        id: item.id,
        text: item.text,
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
      metadata: { scopeHash, budgetPlan, truncationRecords },
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
  constructor(private readonly now: () => string = () => new Date().toISOString()) {}

  async buildEnvelope(
    bundle: ContextBundle,
    profile: ContextProfileSpec
  ): Promise<ContextEnvelope> {
    const explanationBudget = bundle.metadata?.budgetPlan as ContextBudgetPlan | undefined;
    const budgetPlan = explanationBudget ?? fallbackBudgetPlan(profile);
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
    overflowPolicy: source.required ? 'truncate' : 'drop',
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

function truncateItem(
  item: ContextItem,
  maxTokens: number,
  marker: string,
  tokenizer: TokenEstimator
): ContextItem {
  const maxCharacters = Math.max(0, maxTokens * 4 - marker.length);
  const text = `${item.text.slice(0, maxCharacters)}${marker}`;
  return { ...item, text, tokenEstimate: tokenizer.estimate(text) };
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
      overflowPolicy: source.required ? 'truncate' : 'drop',
    })),
    tokenizerRef: { id: 'tokenizer.unknown', version: '1.0.0' },
    safetyMarginTokens: 0,
  };
}
