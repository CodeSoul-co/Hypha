import { DefaultMemoryContextBuilder } from './context-builder';
import type {
  ContextBuildExplanation,
  ContextBundle,
  ContextItem,
  ContextSourceResolutionInput,
  ContextSourceResolver,
  ContextSourceResolverRegistry,
  ContextSourceSpec,
  ContextSourceType,
  MemoryContextBuilder,
  ResolvedContextBuildInput,
} from './context-contracts';

export type ContextSourceLoader = (request: ContextSourceResolutionInput) => Promise<ContextItem[]>;

export interface CallbackContextSourceResolverOptions {
  id: string;
  sourceTypes: ContextSourceType[];
  load: ContextSourceLoader;
}

export class CallbackContextSourceResolver implements ContextSourceResolver {
  readonly id: string;
  private readonly sourceTypes: ReadonlySet<ContextSourceType>;
  private readonly load: ContextSourceLoader;

  constructor(options: CallbackContextSourceResolverOptions) {
    this.id = options.id;
    this.sourceTypes = new Set(options.sourceTypes);
    this.load = options.load;
  }

  supports(source: ContextSourceSpec): boolean {
    return this.sourceTypes.has(source.type);
  }

  resolve(request: ContextSourceResolutionInput): Promise<ContextItem[]> {
    return this.load(request);
  }
}

export class DefaultContextSourceResolverRegistry implements ContextSourceResolverRegistry {
  constructor(private readonly resolvers: readonly ContextSourceResolver[]) {}

  async resolve(request: ResolvedContextBuildInput): Promise<ContextItem[]> {
    const explicit = request.explicitSourceRefs ? new Set(request.explicitSourceRefs) : undefined;
    const sources = request.profile.sources
      .filter(
        (source) =>
          source.required ||
          !explicit ||
          explicit.has(source.id) ||
          (source.ref ? explicit.has(source.ref.id) : false)
      )
      .sort((left, right) => right.priority - left.priority || left.id.localeCompare(right.id));
    const items: ContextItem[] = [];

    for (const source of sources) {
      const resolver = this.resolvers.find((candidate) => candidate.supports(source));
      if (!resolver) {
        if (source.required) {
          throw new Error(`Required context source has no resolver: ${source.id}`);
        }
        continue;
      }
      const resolved = await resolver.resolve({ ...request, source });
      const bounded = resolved.slice(0, source.maxItems ?? resolved.length).map((item) => ({
        ...item,
        sourceId: item.sourceId ?? source.id,
        priority: Number.isFinite(item.priority) ? item.priority : source.priority,
        required: item.required ?? source.required,
        metadata: {
          ...item.metadata,
          resolverId: resolver.id,
          sourceSpecId: source.id,
        },
      }));
      if (source.required && bounded.length === 0) {
        throw new Error(`Required context source resolved no items: ${source.id}`);
      }
      items.push(...bounded);
    }
    return items;
  }
}

export class SourceResolvingMemoryContextBuilder {
  constructor(
    private readonly sources: ContextSourceResolverRegistry,
    private readonly builder: MemoryContextBuilder = new DefaultMemoryContextBuilder()
  ) {}

  async build(request: ResolvedContextBuildInput): Promise<ContextBundle> {
    const sourceItems = await this.sources.resolve(request);
    return this.builder.build({ ...request, sourceItems });
  }

  explain(contextHash: string): Promise<ContextBuildExplanation | null> {
    return this.builder.explain(contextHash);
  }
}
