import type { FrameworkEvent, FrameworkEventType } from '@hypha/core';
import {
  materializeGenericBlock,
  materializeMemoryBlock,
  materializeObservationBlock,
  materializePromptPrefixBlock,
  materializeToolBlock,
  materializeVerificationBlock,
} from './materializers';
import type {
  NormalizedWorkEvent,
  RuntimeTypeDefinition,
  WorkCacheUnknownEventPolicy,
} from './types';

export const DEFAULT_WORKCACHE_SOURCE_EVENT_TYPES = [
  'agent.reasoning.completed',
  'thinking.completed',
  'agent.deliberation.completed',
  'reasoning.decision.recorded',
  'tool.call.completed',
  'mcp.call.completed',
  'context.build.completed',
  'context.compacted',
  'eval.completed',
  'regression.completed',
  'memory.read.completed',
  'memory.write.committed',
  'inference.completed',
  'model.call.completed',
  'llm.cache.write',
] as const satisfies readonly FrameworkEventType[];

const defaultSourceEventSet = new Set<FrameworkEventType>(DEFAULT_WORKCACHE_SOURCE_EVENT_TYPES);

export const DEFAULT_RUNTIME_TYPE_DEFINITIONS: RuntimeTypeDefinition[] = [
  {
    id: 'plan.reasoning',
    sourceEventTypes: [
      'agent.reasoning.completed',
      'thinking.completed',
      'agent.deliberation.completed',
      'reasoning.decision.recorded',
    ],
    nodeType: 'plan',
    treeType: 'PlanTree',
    materialize: materializeGenericBlock,
  },
  {
    id: 'tool.completed',
    sourceEventTypes: ['tool.call.completed', 'mcp.call.completed'],
    nodeType: 'tool',
    treeType: 'ToolTree',
    materialize: materializeToolBlock,
  },
  {
    id: 'observation.context',
    sourceEventTypes: ['context.build.completed', 'context.compacted'],
    nodeType: 'observation',
    treeType: 'ObservationTree',
    materialize: materializeObservationBlock,
  },
  {
    id: 'verification.completed',
    sourceEventTypes: ['eval.completed', 'regression.completed'],
    nodeType: 'verification',
    treeType: 'VerificationTree',
    materialize: materializeVerificationBlock,
  },
  {
    id: 'memory.completed',
    sourceEventTypes: ['memory.read.completed', 'memory.write.committed'],
    nodeType: 'memory',
    treeType: 'MemoryTree',
    materialize: materializeMemoryBlock,
  },
  {
    id: 'computation.inference',
    sourceEventTypes: ['inference.completed', 'model.call.completed'],
    nodeType: 'computation',
    treeType: 'ComputationTree',
    materialize: materializeGenericBlock,
  },
  {
    id: 'prompt-prefix.serving-cache',
    sourceEventTypes: ['llm.cache.write'],
    nodeType: 'prompt_prefix',
    treeType: 'PromptPrefixTree',
    materialize: materializePromptPrefixBlock,
  },
];

export interface RuntimeTypeRegistryOptions {
  definitions?: RuntimeTypeDefinition[];
  allowExtensionEvents?: boolean;
  unknownEventPolicy?: WorkCacheUnknownEventPolicy;
}

export class RuntimeTypeRegistry {
  private readonly definitionsByEventType = new Map<FrameworkEventType, RuntimeTypeDefinition>();
  private readonly allowExtensionEvents: boolean;
  private readonly unknownEventPolicy: WorkCacheUnknownEventPolicy;

  constructor(options: RuntimeTypeRegistryOptions = {}) {
    this.allowExtensionEvents = options.allowExtensionEvents ?? false;
    this.unknownEventPolicy = options.unknownEventPolicy ?? 'reject';
    for (const definition of options.definitions ?? DEFAULT_RUNTIME_TYPE_DEFINITIONS) {
      this.register(definition);
    }
  }

  register(definition: RuntimeTypeDefinition): void {
    for (const sourceEventType of definition.sourceEventTypes) {
      if (!this.allowExtensionEvents && !defaultSourceEventSet.has(sourceEventType)) {
        throw new Error(
          `WorkCache source event ${sourceEventType} is not a registered Hypha FrameworkEventType alignment.`
        );
      }
      if (this.definitionsByEventType.has(sourceEventType)) {
        throw new Error(`WorkCache source event ${sourceEventType} already has a primary tree.`);
      }
    }
    for (const sourceEventType of definition.sourceEventTypes) {
      this.definitionsByEventType.set(sourceEventType, definition);
    }
  }

  getDefinition(sourceEventType: FrameworkEventType): RuntimeTypeDefinition | null {
    return this.definitionsByEventType.get(sourceEventType) ?? null;
  }

  listDefinitions(): RuntimeTypeDefinition[] {
    return Array.from(new Set(this.definitionsByEventType.values()));
  }

  listSourceEventTypes(): FrameworkEventType[] {
    return Array.from(this.definitionsByEventType.keys());
  }

  normalize<TPayload = unknown>(
    event: FrameworkEvent<TPayload>,
    options: { unknownEventPolicy?: WorkCacheUnknownEventPolicy } = {}
  ): NormalizedWorkEvent<TPayload> | null {
    const definition = this.definitionsByEventType.get(event.type);
    if (!definition) {
      const policy = options.unknownEventPolicy ?? this.unknownEventPolicy;
      if (policy === 'ignore') return null;
      throw new Error(`WorkCache cannot normalize unregistered source event: ${event.type}`);
    }
    return {
      sourceEvent: event,
      sourceEventId: event.id,
      sourceEventType: event.type,
      nodeType: definition.nodeType,
      treeType: definition.treeType,
      payload: event.payload,
      metadata: event.metadata,
    };
  }
}

export function createDefaultRuntimeTypeRegistry(
  options: Omit<RuntimeTypeRegistryOptions, 'definitions'> = {}
): RuntimeTypeRegistry {
  return new RuntimeTypeRegistry({
    ...options,
    definitions: DEFAULT_RUNTIME_TYPE_DEFINITIONS,
  });
}
