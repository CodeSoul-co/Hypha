import type { InferenceResponse } from './types';
import type {
  ReasoningMethod,
  ReasoningOptions,
  ReasoningRequest,
  ReasoningTraceEvent,
  ThoughtNode,
} from './reasoning';

export interface ReasoningStrategyReference {
  kind: 'repository' | 'paper' | 'documentation';
  title: string;
  url: string;
  repository?: string;
  revision?: string;
  license?: string;
  official: boolean;
  usage: 'adapted' | 'referenced';
  notes?: string;
}

export interface ReasoningStrategyDescriptor {
  id: string;
  version: string;
  method: ReasoningMethod;
  name: string;
  description: string;
  aliases?: string[];
  references: ReasoningStrategyReference[];
  capabilities: {
    branching: boolean;
    graph: boolean;
    aggregation: boolean;
    streaming: boolean;
    toolLoop: boolean;
  };
  metadata?: Record<string, unknown>;
}

export interface ReasoningStrategyRuntime {
  callProvider(metadata: Record<string, unknown>): Promise<InferenceResponse>;
  aggregate(
    responses: InferenceResponse[],
    defaultAggregation?: ReasoningOptions['aggregation']
  ): Promise<InferenceResponse>;
  score(response: InferenceResponse, node: ThoughtNode): Promise<number>;
  withReasoningMetadata(
    response: InferenceResponse,
    reasoning: Record<string, unknown>
  ): InferenceResponse;
  trace(event: ReasoningTraceEvent): Promise<void>;
  assertBudget(nodeCount?: number): void;
  readonly modelCalls: number;
  readonly maxNodes: number;
}

export interface ReasoningStrategyContext {
  request: ReasoningRequest;
  options: ReasoningOptions;
  runtime: ReasoningStrategyRuntime;
}

export interface ReasoningStrategy {
  descriptor: ReasoningStrategyDescriptor;
  execute(context: ReasoningStrategyContext): Promise<InferenceResponse>;
  stream?(context: ReasoningStrategyContext): AsyncIterable<InferenceResponse>;
}

export class ReasoningStrategyRegistry {
  private readonly strategies = new Map<string, ReasoningStrategy>();
  private readonly aliases = new Map<string, string>();

  register(strategy: ReasoningStrategy, options: { replace?: boolean } = {}): void {
    const descriptor = validateDescriptor(strategy.descriptor);
    if (this.strategies.has(descriptor.id) && !options.replace) {
      throw new Error(`Reasoning strategy already registered: ${descriptor.id}`);
    }
    this.strategies.set(descriptor.id, strategy);
    for (const alias of [descriptor.method, ...(descriptor.aliases ?? [])]) {
      if (!this.aliases.has(alias) || options.replace) this.aliases.set(alias, descriptor.id);
    }
  }

  unregister(id: string): boolean {
    const removed = this.strategies.delete(id);
    if (!removed) return false;
    for (const [alias, strategyId] of this.aliases) {
      if (strategyId === id) this.aliases.delete(alias);
    }
    return true;
  }

  get(idOrAlias: string): ReasoningStrategy | null {
    const id = this.aliases.get(idOrAlias) ?? idOrAlias;
    return this.strategies.get(id) ?? null;
  }

  require(idOrAlias: string): ReasoningStrategy {
    const strategy = this.get(idOrAlias);
    if (!strategy) throw new Error(`Reasoning strategy not registered: ${idOrAlias}`);
    return strategy;
  }

  has(idOrAlias: string): boolean {
    return this.get(idOrAlias) !== null;
  }

  list(): ReasoningStrategyDescriptor[] {
    return Array.from(this.strategies.values())
      .map((strategy) => strategy.descriptor)
      .sort((left, right) => left.id.localeCompare(right.id));
  }
}

function validateDescriptor(descriptor: ReasoningStrategyDescriptor): ReasoningStrategyDescriptor {
  if (!descriptor.id.trim()) throw new Error('Reasoning strategy id is required.');
  if (!descriptor.version.trim())
    throw new Error(`Reasoning strategy version is required: ${descriptor.id}`);
  if (!descriptor.references.length && descriptor.method !== 'direct') {
    throw new Error(
      `Reasoning strategy must declare at least one source reference: ${descriptor.id}`
    );
  }
  for (const reference of descriptor.references) {
    if (!reference.url.startsWith('https://')) {
      throw new Error(`Reasoning strategy reference must use HTTPS: ${descriptor.id}`);
    }
    if (reference.usage === 'adapted' && reference.kind === 'repository' && !reference.revision) {
      throw new Error(`Adapted repository references must pin a revision: ${descriptor.id}`);
    }
  }
  return descriptor;
}
