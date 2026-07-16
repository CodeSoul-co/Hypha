import { hashContent } from './cache';
import {
  ReasoningStrategyRegistry,
  type ReasoningStrategy,
  type ReasoningStrategyContext,
} from './reasoning-registry';
import { BUILT_IN_REASONING_STRATEGY_DESCRIPTORS } from './reasoning-sources';
import type { InferenceProvider, InferenceRequest, InferenceResponse } from './types';

export type ReasoningMethod = 'direct' | 'cot' | 'tot' | 'got' | 'self_consistency';
export type ReasoningAggregation = 'first' | 'majority_vote' | 'score' | 'llm_judge';

export interface ReasoningBudget {
  maxModelCalls?: number;
  maxNodes?: number;
  timeoutMs?: number;
}

export interface ReasoningOptions {
  method: ReasoningMethod;
  strategyRef?: string;
  branches?: number;
  maxDepth?: number;
  beamWidth?: number;
  maxNodes?: number;
  revealReasoning?: boolean;
  aggregation?: ReasoningAggregation;
  evaluatorRef?: string;
  strategyVersion?: string;
  budget?: ReasoningBudget;
  evaluator?: (responses: InferenceResponse[]) => Promise<InferenceResponse>;
  scorer?: (response: InferenceResponse, node: ThoughtNode) => Promise<number> | number;
  trace?: ReasoningTraceSink;
}

export interface ReasoningRequest<TInput = unknown> extends InferenceRequest<TInput> {
  reasoning?: ReasoningOptions;
}

export type ThoughtNodeStatus = 'candidate' | 'evaluated' | 'selected' | 'rejected';
export type ThoughtEdgeType = 'expand' | 'merge' | 'refine' | 'criticize' | 'validate';

export interface ThoughtNode {
  id: string;
  parentIds: string[];
  depth: number;
  branchIndex: number;
  status: ThoughtNodeStatus;
  score?: number;
  outputHash?: string;
  responseId?: string;
  metadata?: Record<string, unknown>;
}

export interface ThoughtEdge {
  from: string;
  to: string;
  type: ThoughtEdgeType;
}

export interface ThoughtGraph {
  id: string;
  method: Extract<ReasoningMethod, 'tot' | 'got'>;
  nodes: ThoughtNode[];
  edges: ThoughtEdge[];
  selectedNodeId?: string;
}

export type ReasoningTraceEvent =
  | {
      type: 'reasoning.strategy.started';
      method: ReasoningMethod;
      strategyId?: string;
      requestId: string;
    }
  | { type: 'reasoning.node.generated'; method: ReasoningMethod; node: ThoughtNode }
  | { type: 'reasoning.node.evaluated'; method: ReasoningMethod; node: ThoughtNode }
  | { type: 'reasoning.node.selected'; method: ReasoningMethod; node: ThoughtNode }
  | {
      type: 'reasoning.strategy.completed';
      method: ReasoningMethod;
      strategyId?: string;
      requestId: string;
      modelCalls: number;
      nodeCount: number;
    };

export type ReasoningTraceSink = (event: ReasoningTraceEvent) => Promise<void> | void;

interface Candidate {
  node: ThoughtNode;
  response: InferenceResponse;
}

interface ExecutionState {
  startedAt: number;
  modelCalls: number;
  maxModelCalls: number;
  maxNodes: number;
  timeoutMs?: number;
}

const DEFAULT_STRATEGY_VERSION = '1';

export class ReasoningOrchestrator implements InferenceProvider {
  readonly id: string;
  readonly registry: ReasoningStrategyRegistry;

  constructor(
    private readonly provider: InferenceProvider,
    id = 'reasoning-orchestrator',
    registry = new ReasoningStrategyRegistry()
  ) {
    this.id = id;
    this.registry = registry;
    this.registerBuiltInStrategies();
  }

  async infer(request: ReasoningRequest): Promise<InferenceResponse> {
    const requestedOptions = request.reasoning ?? { method: 'direct' as const };
    const strategy = this.registry.require(requestedOptions.strategyRef ?? requestedOptions.method);
    const options: ReasoningOptions = {
      ...requestedOptions,
      method: strategy.descriptor.method,
      strategyRef: strategy.descriptor.id,
    };
    const requestId = `${request.runId}:${request.stepId}`;
    await options.trace?.({
      type: 'reasoning.strategy.started',
      method: options.method,
      strategyId: strategy.descriptor.id,
      requestId,
    });
    const state = this.createExecutionState(options);
    const response = await strategy.execute(this.createStrategyContext(request, options, state));
    await options.trace?.({
      type: 'reasoning.strategy.completed',
      method: options.method,
      strategyId: strategy.descriptor.id,
      requestId,
      modelCalls: state.modelCalls,
      nodeCount: numberFromReasoningMetadata(response.metadata, 'nodeCount') ?? 0,
    });
    return response;
  }

  async *stream(request: ReasoningRequest): AsyncIterable<InferenceResponse> {
    const requestedOptions = request.reasoning ?? { method: 'direct' as const };
    const strategy = this.registry.require(requestedOptions.strategyRef ?? requestedOptions.method);
    const method = strategy.descriptor.method;
    const options: ReasoningOptions = {
      ...requestedOptions,
      method,
      strategyRef: strategy.descriptor.id,
    };
    if (strategy.stream) {
      yield* strategy.stream(
        this.createStrategyContext(request, options, this.createExecutionState(options))
      );
      return;
    }
    if (method !== 'direct' && method !== 'cot') {
      yield await this.infer({ ...request, reasoning: options });
      return;
    }
    if (!this.provider.stream) {
      yield await this.infer(request);
      return;
    }
    const metadata = this.strategyMetadata(options, {
      reasoningMethod: method,
      reasoningInstruction: method === 'cot' ? cotInstruction(request.reasoning) : undefined,
    });
    yield* this.provider.stream({ ...request, metadata: { ...request.metadata, ...metadata } });
  }

  private registerBuiltInStrategies(): void {
    const executeByMethod: Record<ReasoningMethod, ReasoningStrategy['execute']> = {
      direct: async ({ request, options, runtime }) =>
        runtime.callProvider({ reasoningMethod: 'direct' }),
      cot: async ({ request, options }) =>
        this.runChainOfThought(request, options, this.strategyState(request, options)),
      tot: async ({ request, options }) =>
        this.runGraphSearch(request, options, this.strategyState(request, options), 'tot'),
      got: async ({ request, options }) =>
        this.runGraphSearch(request, options, this.strategyState(request, options), 'got'),
      self_consistency: async ({ request, options }) =>
        this.runSelfConsistency(request, options, this.strategyState(request, options)),
    };
    for (const descriptor of BUILT_IN_REASONING_STRATEGY_DESCRIPTORS) {
      if (this.registry.has(descriptor.id)) continue;
      this.registry.register({ descriptor, execute: executeByMethod[descriptor.method] });
    }
  }

  private readonly activeStates = new WeakMap<ReasoningRequest, ExecutionState>();

  private strategyState(request: ReasoningRequest, options: ReasoningOptions): ExecutionState {
    const state = this.activeStates.get(request);
    if (state) return state;
    const created = this.createExecutionState(options);
    this.activeStates.set(request, created);
    return created;
  }

  private createStrategyContext(
    request: ReasoningRequest,
    options: ReasoningOptions,
    state: ExecutionState
  ): ReasoningStrategyContext {
    this.activeStates.set(request, state);
    return {
      request,
      options,
      runtime: {
        callProvider: (metadata) => this.callProvider(request, options, state, metadata),
        aggregate: (responses, defaultAggregation) =>
          this.aggregate(responses, {
            ...options,
            aggregation: options.aggregation ?? defaultAggregation,
          }),
        score: (response, node) => this.score(response, node, options),
        withReasoningMetadata: (response, reasoning) =>
          this.withReasoningMetadata(response, options, reasoning),
        trace: async (event) => {
          await options.trace?.(event);
        },
        assertBudget: (nodeCount = 0) => this.assertBudget(state, nodeCount),
        get modelCalls() {
          return state.modelCalls;
        },
        get maxNodes() {
          return state.maxNodes;
        },
      },
    };
  }

  private async runChainOfThought(
    request: ReasoningRequest,
    options: ReasoningOptions,
    state: ExecutionState
  ): Promise<InferenceResponse> {
    const response = await this.callProvider(request, options, state, {
      reasoningMethod: 'cot',
      reasoningInstruction: cotInstruction(options),
      revealReasoning: options.revealReasoning ?? false,
    });
    return this.withReasoningMetadata(response, options, {
      modelCalls: state.modelCalls,
      nodeCount: 1,
    });
  }

  private async runSelfConsistency(
    request: ReasoningRequest,
    options: ReasoningOptions,
    state: ExecutionState
  ): Promise<InferenceResponse> {
    const branches = boundedPositive(options.branches, 3);
    const responses = await Promise.all(
      Array.from({ length: branches }, (_value, sampleIndex) =>
        this.callProvider(request, options, state, {
          reasoningMethod: 'self_consistency',
          reasoningInstruction:
            'Solve independently. Return a concise answer and a short verifiable rationale summary.',
          sampleIndex,
        })
      )
    );
    const selected = await this.aggregate(responses, options);
    return this.withReasoningMetadata(selected, options, {
      modelCalls: state.modelCalls,
      nodeCount: responses.length,
      candidateResponseIds: responses.map((response) => response.id),
    });
  }

  private async runGraphSearch(
    request: ReasoningRequest,
    options: ReasoningOptions,
    state: ExecutionState,
    method: 'tot' | 'got'
  ): Promise<InferenceResponse> {
    const graph: ThoughtGraph = {
      id: `thought-graph:${hashContent(`${request.runId}:${request.stepId}:${method}`)}`,
      method,
      nodes: [],
      edges: [],
    };
    const branches = boundedPositive(options.branches, 3);
    const maxDepth = boundedPositive(options.maxDepth, 2);
    const beamWidth = boundedPositive(options.beamWidth, branches);
    let frontier: Candidate[] = [];

    for (let depth = 0; depth < maxDepth; depth += 1) {
      const parents: Array<Candidate | undefined> = depth === 0 ? [undefined] : frontier;
      const generated = await Promise.all(
        parents.flatMap((parent) =>
          Array.from({ length: branches }, async (_value, branchIndex) => {
            this.assertBudget(state, graph.nodes.length);
            const node: ThoughtNode = {
              id: thoughtNodeId(graph.id, depth, parent?.node.id, branchIndex),
              parentIds: parent ? [parent.node.id] : [],
              depth,
              branchIndex,
              status: 'candidate',
            };
            const response = await this.callProvider(request, options, state, {
              reasoningMethod: method,
              reasoningInstruction: searchInstruction(method, depth),
              thoughtGraphId: graph.id,
              thoughtNodeId: node.id,
              parentThoughtIds: node.parentIds,
              parentOutputSummary: parent ? summarizeOutput(parent.response.output) : undefined,
              branchIndex,
              depth,
              maxDepth,
            });
            node.responseId = response.id;
            node.outputHash = hashContent(stableOutput(response.output));
            node.score = await this.score(response, node, options);
            node.status = 'evaluated';
            await options.trace?.({ type: 'reasoning.node.generated', method, node: { ...node } });
            await options.trace?.({ type: 'reasoning.node.evaluated', method, node: { ...node } });
            return { node, response };
          })
        )
      );
      for (const candidate of generated) {
        graph.nodes.push(candidate.node);
        for (const parentId of candidate.node.parentIds) {
          graph.edges.push({ from: parentId, to: candidate.node.id, type: 'expand' });
        }
      }

      const candidates = [...generated];
      if (method === 'got' && generated.length > 1 && graph.nodes.length < state.maxNodes) {
        const merged = await this.mergeCandidates(request, options, state, graph, generated, depth);
        candidates.push(merged);
      }
      candidates.sort((left, right) => (right.node.score ?? 0) - (left.node.score ?? 0));
      frontier = candidates.slice(0, beamWidth);
      const selectedIds = new Set(frontier.map((candidate) => candidate.node.id));
      for (const candidate of candidates) {
        candidate.node.status = selectedIds.has(candidate.node.id) ? 'selected' : 'rejected';
        if (candidate.node.status === 'selected') {
          await options.trace?.({
            type: 'reasoning.node.selected',
            method,
            node: { ...candidate.node },
          });
        }
      }
    }

    if (!frontier.length) throw new Error(`${method} produced no thought candidates.`);
    const response = await this.aggregate(
      frontier.map((candidate) => candidate.response),
      { ...options, aggregation: options.aggregation ?? 'score' }
    );
    const selected =
      frontier.find((candidate) => candidate.response.id === response.id) ?? frontier[0];
    graph.selectedNodeId = selected.node.id;
    return this.withReasoningMetadata(response, options, {
      graph,
      modelCalls: state.modelCalls,
      nodeCount: graph.nodes.length,
      selectedNodeId: graph.selectedNodeId,
    });
  }

  private async mergeCandidates(
    request: ReasoningRequest,
    options: ReasoningOptions,
    state: ExecutionState,
    graph: ThoughtGraph,
    candidates: Candidate[],
    depth: number
  ): Promise<Candidate> {
    this.assertBudget(state, graph.nodes.length);
    const parentIds = candidates.map((candidate) => candidate.node.id);
    const node: ThoughtNode = {
      id: thoughtNodeId(graph.id, depth, parentIds.join(','), candidates.length),
      parentIds,
      depth,
      branchIndex: candidates.length,
      status: 'candidate',
      metadata: { operation: 'merge' },
    };
    const response = await this.callProvider(request, options, state, {
      reasoningMethod: 'got',
      reasoningInstruction:
        'Merge the candidate summaries, preserving compatible evidence and resolving conflicts. Return one concise candidate answer.',
      thoughtGraphId: graph.id,
      thoughtNodeId: node.id,
      parentThoughtIds: parentIds,
      candidateSummaries: candidates.map((candidate) => summarizeOutput(candidate.response.output)),
      depth,
      operation: 'merge',
    });
    node.responseId = response.id;
    node.outputHash = hashContent(stableOutput(response.output));
    node.score = await this.score(response, node, options);
    node.status = 'evaluated';
    graph.nodes.push(node);
    for (const parentId of parentIds) {
      graph.edges.push({ from: parentId, to: node.id, type: 'merge' });
    }
    await options.trace?.({ type: 'reasoning.node.generated', method: 'got', node: { ...node } });
    await options.trace?.({ type: 'reasoning.node.evaluated', method: 'got', node: { ...node } });
    return { node, response };
  }

  private async callProvider(
    request: ReasoningRequest,
    options: ReasoningOptions,
    state: ExecutionState,
    metadata: Record<string, unknown>
  ): Promise<InferenceResponse> {
    this.assertBudget(state, 0);
    state.modelCalls += 1;
    const call = this.provider.infer({
      ...request,
      metadata: {
        ...request.metadata,
        ...this.strategyMetadata(options, metadata),
      },
    });
    if (!state.timeoutMs) return call;
    const remaining = Math.max(1, state.timeoutMs - (Date.now() - state.startedAt));
    return withTimeout(call, remaining, options.method);
  }

  private strategyMetadata(
    options: ReasoningOptions,
    metadata: Record<string, unknown>
  ): Record<string, unknown> {
    const descriptor = this.registry.get(options.strategyRef ?? options.method)?.descriptor;
    return {
      ...metadata,
      reasoningStrategy: {
        id: descriptor?.id ?? options.strategyRef,
        definitionVersion: descriptor?.version,
        method: options.method,
        version: options.strategyVersion ?? DEFAULT_STRATEGY_VERSION,
        branches: options.branches,
        maxDepth: options.maxDepth,
        beamWidth: options.beamWidth,
        aggregation: options.aggregation,
        evaluatorRef: options.evaluatorRef,
        references: descriptor?.references.map((reference) => ({
          kind: reference.kind,
          url: reference.url,
          repository: reference.repository,
          revision: reference.revision,
          usage: reference.usage,
        })),
      },
      reasoningCacheIdentity: hashContent(
        JSON.stringify({
          method: options.method,
          version: options.strategyVersion ?? DEFAULT_STRATEGY_VERSION,
          branches: options.branches,
          maxDepth: options.maxDepth,
          beamWidth: options.beamWidth,
          aggregation: options.aggregation,
          evaluatorRef: options.evaluatorRef,
          metadata,
        })
      ),
    };
  }

  private async score(
    response: InferenceResponse,
    node: ThoughtNode,
    options: ReasoningOptions
  ): Promise<number> {
    if (options.scorer) return options.scorer(response, node);
    const output = recordFromUnknown(response.output);
    const metadata = recordFromUnknown(response.metadata);
    return (
      finiteNumber(output?.score) ??
      finiteNumber(output?.confidence) ??
      finiteNumber(metadata?.reasoningScore) ??
      1 / (1 + node.depth + node.branchIndex / 100)
    );
  }

  private async aggregate(
    responses: InferenceResponse[],
    options: ReasoningOptions
  ): Promise<InferenceResponse> {
    if (!responses.length) throw new Error('Reasoning aggregation requires at least one response.');
    if (options.evaluator) return options.evaluator(responses);
    if ((options.aggregation ?? 'first') === 'majority_vote') {
      const counts = new Map<string, { count: number; response: InferenceResponse }>();
      for (const response of responses) {
        const key = stableOutput(response.output);
        const current = counts.get(key);
        counts.set(key, {
          count: (current?.count ?? 0) + 1,
          response: current?.response ?? response,
        });
      }
      return Array.from(counts.values()).sort((left, right) => right.count - left.count)[0]
        .response;
    }
    if (options.aggregation === 'score' || options.aggregation === 'llm_judge') {
      return [...responses].sort((left, right) => responseScore(right) - responseScore(left))[0];
    }
    return responses[0];
  }

  private withReasoningMetadata(
    response: InferenceResponse,
    options: ReasoningOptions,
    reasoning: Record<string, unknown>
  ): InferenceResponse {
    return {
      ...response,
      metadata: {
        ...response.metadata,
        reasoning: {
          strategyId: options.strategyRef,
          method: options.method,
          strategyVersion: options.strategyVersion ?? DEFAULT_STRATEGY_VERSION,
          aggregation: options.aggregation ?? 'first',
          ...reasoning,
        },
      },
    };
  }

  private createExecutionState(options: ReasoningOptions): ExecutionState {
    return {
      startedAt: Date.now(),
      modelCalls: 0,
      maxModelCalls: boundedPositive(options.budget?.maxModelCalls, 64),
      maxNodes: boundedPositive(options.maxNodes ?? options.budget?.maxNodes, 128),
      timeoutMs: options.budget?.timeoutMs,
    };
  }

  private assertBudget(state: ExecutionState, nodeCount: number): void {
    if (state.modelCalls >= state.maxModelCalls) {
      throw new Error(`Reasoning model-call budget exceeded: ${state.maxModelCalls}`);
    }
    if (nodeCount >= state.maxNodes) {
      throw new Error(`Reasoning node budget exceeded: ${state.maxNodes}`);
    }
    if (state.timeoutMs && Date.now() - state.startedAt >= state.timeoutMs) {
      throw new Error(`Reasoning timeout exceeded: ${state.timeoutMs}ms`);
    }
  }
}

function cotInstruction(options: ReasoningOptions | undefined): string {
  return options?.revealReasoning
    ? 'Reason step by step and return the answer with a concise rationale.'
    : 'Reason internally, then return only the answer and a concise verifiable reasoning summary.';
}

function searchInstruction(method: 'tot' | 'got', depth: number): string {
  const structure = method === 'tot' ? 'tree branch' : 'graph candidate';
  return `Generate one distinct ${structure} at depth ${depth}. State assumptions, proposed answer, and a concise verification summary.`;
}

function thoughtNodeId(
  graphId: string,
  depth: number,
  parentId: string | undefined,
  branchIndex: number
): string {
  return `thought:${hashContent(`${graphId}:${depth}:${parentId ?? 'root'}:${branchIndex}`)}`;
}

function boundedPositive(value: number | undefined, fallback: number): number {
  return Math.max(1, Math.floor(value ?? fallback));
}

function stableOutput(output: unknown): string {
  if (typeof output === 'string') return output.trim();
  try {
    return JSON.stringify(output, Object.keys(recordFromUnknown(output) ?? {}).sort());
  } catch {
    return String(output);
  }
}

function summarizeOutput(output: unknown): string {
  const value = stableOutput(output);
  return value.length <= 1000 ? value : `${value.slice(0, 997)}...`;
}

function recordFromUnknown(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function finiteNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function responseScore(response: InferenceResponse): number {
  const output = recordFromUnknown(response.output);
  const metadata = recordFromUnknown(response.metadata);
  return (
    finiteNumber(output?.score) ??
    finiteNumber(output?.confidence) ??
    finiteNumber(metadata?.reasoningScore) ??
    0
  );
}

function numberFromReasoningMetadata(
  metadata: Record<string, unknown> | undefined,
  key: string
): number | undefined {
  return finiteNumber(recordFromUnknown(metadata?.reasoning)?.[key]);
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, method: string): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_resolve, reject) => {
        timer = setTimeout(
          () => reject(new Error(`Reasoning strategy ${method} timed out after ${timeoutMs}ms`)),
          timeoutMs
        );
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
