import type { FrameworkEvent, RecoveryKnowledge } from '@hypha/core';
import { createWorkBlockId, createWorkCacheKey, hashStableJson, stableJson } from './key';
import type {
  CacheBlock,
  CacheBlockValidity,
  CacheTreeType,
  NormalizedWorkEvent,
  PromptPrefixBlockValue,
  RecoveryKnowledgeBlockValue,
  WorkNodeType,
  WorkCacheScope,
} from './types';

export function materializeGenericBlock(event: NormalizedWorkEvent): CacheBlock[] {
  return [
    createBlock(event, {
      identity: {
        sourceEventType: event.sourceEventType,
        payloadHash: hashStableJson(event.payload),
      },
      value: event.payload,
      validity: validityFromRecord(recordFromUnknown(event.payload)) ?? { status: 'unknown' },
      metadata: {
        sourceEventType: event.sourceEventType,
      },
    }),
  ];
}

export function materializeComputationBlock(event: NormalizedWorkEvent): CacheBlock[] {
  const payload = recordFromUnknown(event.payload);
  const provider = stringValue(payload.provider);
  const model = stringValue(payload.model);
  const requestHash =
    stringValue(payload.requestHash) ??
    stringValue(payload.promptHash) ??
    stringValue(payload.inputHash) ??
    hashFromKnownInput(payload.request ?? payload.input ?? payload.messages);
  if (!provider || !model || !requestHash) return [];

  const paramsHash =
    stringValue(payload.paramsHash) ??
    stringValue(payload.parametersHash) ??
    hashFromKnownInput(payload.params ?? payload.parameters);
  const toolSchemaHash =
    stringValue(payload.toolSchemaHash) ??
    stringValue(payload.toolsHash) ??
    hashFromKnownInput(payload.tools ?? payload.toolSchemas);
  const environmentHash =
    stringValue(payload.envHash) ??
    stringValue(payload.environmentHash) ??
    stringValue(recordFromUnknown(payload.validity).envHash);
  const identity = {
    sourceEventType: event.sourceEventType,
    provider,
    model,
    requestHash,
    ...(paramsHash ? { paramsHash } : {}),
    ...(toolSchemaHash ? { toolSchemaHash } : {}),
    ...(environmentHash ? { environmentHash } : {}),
  };

  return [
    createBlock(event, {
      identity,
      value: {
        provider,
        model,
        output: payload.output ?? payload.response ?? payload.result,
        usage: payload.usage,
        finishReason: payload.finishReason ?? payload.finish_reason,
      },
      validity: validityFromRecord(payload) ?? {
        status: 'valid',
        sourceHashes: {
          request: requestHash,
          ...(paramsHash ? { params: paramsHash } : {}),
          ...(toolSchemaHash ? { toolSchema: toolSchemaHash } : {}),
          ...(environmentHash ? { environment: environmentHash } : {}),
        },
        provenanceHash: hashStableJson(identity),
      },
      provenance: {
        provider,
        model,
        requestHash,
        paramsHash,
        toolSchemaHash,
        environmentHash,
      },
      metadata: {
        requestHash,
        paramsHash,
        toolSchemaHash,
        environmentHash,
        latencyMs: numberValue(recordFromUnknown(payload.usage).latencyMs ?? payload.latencyMs),
      },
      tags: ['model-computation'],
    }),
  ];
}

export function materializeToolBlock(event: NormalizedWorkEvent): CacheBlock[] {
  const payload = recordFromUnknown(event.payload);
  if (!isReadOnlySideEffect(payload.sideEffectLevel)) return [];

  const stableArgs = payload.stableArgs ?? payload.input ?? payload.args ?? payload.params;
  const toolId = stringValue(payload.toolId ?? payload.name ?? payload.capabilityId);
  const permissionScope = permissionScopeFrom(payload.permissionScope);
  const validity = validityFromRecord(payload);
  if (!toolId || stableArgs === undefined || !permissionScope.length || !validity) return [];

  return [
    createBlock(event, {
      identity: {
        toolId,
        stableArgs,
        permissionScope,
      },
      value: {
        toolId,
        output: payload.output,
        attempts: payload.attempts,
      },
      validity,
      provenance: {
        toolId,
        permissionScope,
        stableArgsHash: hashStableJson(stableArgs),
        source: payload.source,
        sourceRef: payload.sourceRef,
      },
      metadata: {
        sideEffectLevel: payload.sideEffectLevel,
      },
      tags: ['read-only-tool'],
    }),
  ];
}

export function materializeObservationBlock(event: NormalizedWorkEvent): CacheBlock[] {
  const payload = recordFromUnknown(event.payload);
  const provenance = recordFromUnknown(payload.provenance);
  const resourceId =
    stringValue(payload.resourceId) ??
    stringValue(payload.path) ??
    stringValue(payload.url) ??
    stringValue(provenance.resourceId) ??
    stringValue(provenance.path) ??
    stringValue(provenance.url) ??
    event.sourceEventType;
  const contentHash =
    stringValue(payload.contentHash) ??
    stringValue(payload.hash) ??
    stringValue(provenance.contentHash) ??
    stringValue(provenance.hash) ??
    stringValue(provenance.sourceHash) ??
    hashStableJson(payload.output ?? payload.value ?? payload);
  return [
    createBlock(event, {
      identity: {
        sourceEventType: event.sourceEventType,
        resourceId,
      },
      value: payload.output ?? payload.value ?? payload,
      validity: {
        status: 'valid',
        sourceHashes: {
          [resourceId]: contentHash,
        },
        provenanceHash: hashStableJson(provenance),
      },
      provenance: {
        ...provenance,
        resourceId,
      },
      metadata: {
        contentHash,
      },
      tags: ['observation'],
    }),
  ];
}

export function materializeVerificationBlock(event: NormalizedWorkEvent): CacheBlock[] {
  const payload = recordFromUnknown(event.payload);
  const proof = verificationProofFrom(payload);
  if (!proof) return [];

  const target = stringValue(payload.target) ?? stringValue(payload.suite) ?? event.sourceEventType;
  return [
    createBlock(event, {
      identity: {
        sourceEventType: event.sourceEventType,
        target,
        test: payload.test ?? payload.command,
        env: proof.envHash,
      },
      value: payload.output ?? payload.result ?? payload,
      validity: {
        status: 'valid',
        proof,
        sourceHashes: {
          ...(proof.sourceHash ? { source: proof.sourceHash } : {}),
          ...(proof.testHash ? { test: proof.testHash } : {}),
          ...(proof.envHash ? { env: proof.envHash } : {}),
        },
        provenanceHash: hashStableJson(proof),
      },
      provenance: {
        target,
        proof,
      },
      tags: ['verification'],
    }),
  ];
}

export function materializeMemoryBlock(event: NormalizedWorkEvent): CacheBlock[] {
  const payload = recordFromUnknown(event.payload);
  const memoryId =
    stringValue(payload.memoryId) ??
    stringValue(payload.recordId) ??
    stringValue(payload.id) ??
    hashStableJson(payload.record ?? payload.value ?? payload);
  return [
    createBlock(event, {
      identity: {
        sourceEventType: event.sourceEventType,
        memoryId,
        scope: payload.scope,
      },
      value: payload.record ?? payload.value ?? payload,
      validity: validityFromRecord(payload) ?? {
        status: 'valid',
        provenanceHash: hashStableJson(payload.provenance ?? payload),
      },
      provenance: recordFromUnknown(payload.provenance),
      tags: ['memory'],
    }),
  ];
}

export function materializeMessageBlock(event: NormalizedWorkEvent): CacheBlock[] {
  const payload = recordFromUnknown(event.payload);
  const message = recordFromUnknown(payload.message);
  const messageId =
    stringValue(message.id) ??
    stringValue(payload.messageId) ??
    stringValue(payload.id) ??
    event.sourceEventId;
  const status =
    stringValue(message.status) ?? stringValue(payload.status) ?? event.sourceEventType;
  return [
    createBlock(event, {
      identity: {
        sourceEventType: event.sourceEventType,
        messageId,
        status,
      },
      value: {
        message: Object.keys(message).length ? message : payload,
        eventType: event.sourceEventType,
      },
      validity: {
        status: 'valid',
        provenanceHash: hashStableJson({
          sourceEventId: event.sourceEventId,
          sourceEventType: event.sourceEventType,
          messageId,
          status,
        }),
      },
      provenance: {
        messageId,
        status,
        from: message.from,
        to: message.to,
        correlationId: message.correlationId,
        causationId: message.causationId,
      },
      metadata: {
        messageType: stringValue(message.type) ?? stringValue(payload.messageType),
        messageStatus: status,
      },
      tags: ['message-bus'],
    }),
  ];
}

export function materializeRecoveryKnowledgeBlock(event: NormalizedWorkEvent): CacheBlock[] {
  const payload = recordFromUnknown(event.payload);
  const rawKnowledge = recordFromUnknown(payload.knowledge);
  const rawKey = recordFromUnknown(rawKnowledge.key);
  const validation = recordFromUnknown(rawKnowledge.validation);
  const fingerprint = stringValue(rawKey.fingerprint);
  const participantId = stringValue(rawKey.participantId);
  const strategy = stringValue(rawKnowledge.strategy);
  const outcome = stringValue(rawKnowledge.outcome);
  const learnedAt = stringValue(rawKnowledge.learnedAt);
  const validationStatus = stringValue(validation.status);
  if (
    !fingerprint ||
    !participantId ||
    !strategy ||
    !outcome ||
    !learnedAt ||
    (validationStatus !== 'verified' && validationStatus !== 'negative')
  ) {
    return [];
  }
  const knowledge = rawKnowledge as unknown as RecoveryKnowledge;
  const sourceHashes = Object.fromEntries(
    [
      ['policy', stringValue(rawKey.policyRevision)],
      ['spec', stringValue(rawKey.specRevision)],
      ['provider', stringValue(rawKey.providerRevision)],
    ].filter((entry): entry is [string, string] => Boolean(entry[1]))
  );
  return [
    createBlock<RecoveryKnowledgeBlockValue>(event, {
      identity: knowledge.key,
      value: knowledge,
      validity: {
        status: 'valid',
        proof: recordFromUnknown(validation.proof),
        sourceHashes,
        provenanceHash: hashStableJson({ key: knowledge.key, validation }),
      },
      provenance: {
        fingerprint,
        participantId,
        learnedAt,
      },
      metadata: {
        strategy,
        outcome,
        validationStatus,
      },
      tags: ['recovery-knowledge', `recovery:${validationStatus}`],
    }),
  ];
}

export function materializePromptPrefixBlock(event: NormalizedWorkEvent): CacheBlock[] {
  const payload = recordFromUnknown(event.payload);
  const prefixMetadata = promptPrefixMetadataFrom(payload, event.sourceEvent);
  if (!prefixMetadata) return [];

  const blocks = arrayFromUnknown(prefixMetadata.blocks)
    .map((block, index) => normalizePromptPrefixBlock(block, index))
    .filter((block): block is PromptPrefixBlockValue => Boolean(block))
    .filter((block) => block.stable === true)
    .sort((left, right) => {
      const order = left.order - right.order;
      if (order !== 0) return order;
      const leftKey = `${left.type}:${left.id}`;
      const rightKey = `${right.type}:${right.id}`;
      return leftKey.localeCompare(rightKey);
    });
  if (!blocks.length) return [];

  const prefixHash = stringValue(prefixMetadata.prefixHash) ?? hashStableJson(blocks);
  const requestHash = stringValue(prefixMetadata.requestHash);
  const toolSchemaHash = stringValue(prefixMetadata.toolSchemaHash);
  const domainPackHash = stringValue(prefixMetadata.domainPackHash);
  const dynamicSuffixHash = stringValue(prefixMetadata.dynamicSuffixHash);

  return blocks.map((block, index) =>
    createBlock<PromptPrefixBlockValue>(event, {
      identity: {
        prefixHash,
        blockId: block.id,
        blockType: block.type,
        blockHash: block.hash,
      },
      value: {
        ...block,
        prefixHash,
        order: block.order ?? index,
      },
      validity: {
        status: 'valid',
        proof: {
          blockHash: block.hash,
          blockId: block.id,
          blockType: block.type,
          templateId: block.templateId,
          templateVersion: block.templateVersion,
        },
        sourceHashes: {
          [`prompt:${block.type}:${block.id}`]: block.hash,
        },
        provenanceHash: hashStableJson({
          id: block.id,
          type: block.type,
          hash: block.hash,
          templateId: block.templateId,
          templateVersion: block.templateVersion,
        }),
      },
      provenance: {
        prefixHash,
        blockId: block.id,
        blockType: block.type,
        blockHash: block.hash,
        source: block.source,
        templateId: block.templateId,
        templateVersion: block.templateVersion,
      },
      metadata: {
        prefixHash,
        requestHash,
        toolSchemaHash,
        domainPackHash,
        dynamicSuffixHash,
        blockId: block.id,
        blockType: block.type,
        blockHash: block.hash,
        blockOrder: block.order ?? index,
        prefixBlockCount: blocks.length,
        source: block.source,
        templateId: block.templateId,
        templateVersion: block.templateVersion,
      },
      tags: [
        'prompt-prefix-block',
        `prompt-block:${block.type}`,
        ...(block.templateId ? ['prompt-template'] : []),
      ],
    })
  );
}

export function createBlock<T = unknown>(
  event: NormalizedWorkEvent,
  input: {
    identity: unknown;
    value: T;
    validity: CacheBlockValidity;
    provenance?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
    tags?: string[];
  }
): CacheBlock<T> {
  const scope = workCacheScopeFromEvent(event.sourceEvent);
  const cacheKey = createWorkCacheKey({
    treeType: event.treeType,
    nodeType: event.nodeType,
    scope,
    identity: input.identity,
  });
  const blockId = createWorkBlockId({
    treeType: event.treeType,
    nodeType: event.nodeType,
    sourceEventId: event.sourceEventId,
    scope,
    identity: input.identity,
  });
  const timestamp = Date.parse(event.sourceEvent.timestamp);
  const now = Number.isFinite(timestamp) ? timestamp : Date.now();
  return {
    schemaVersion: '1.0',
    keyVersion: '1',
    id: blockId,
    treeType: event.treeType,
    nodeType: event.nodeType,
    cacheKey,
    value: input.value,
    createdAt: now,
    updatedAt: now,
    sourceEventId: event.sourceEventId,
    sourceEventType: event.sourceEventType,
    scope,
    provenance: input.provenance,
    validity: input.validity,
    utility: { score: 1 },
    metadata: input.metadata,
    tags: input.tags,
  };
}

export function sameValidity(left: CacheBlockValidity, right: CacheBlockValidity): boolean {
  return hashStableJson(left) === hashStableJson(right);
}

export function fallbackAuditIdentity(
  event: FrameworkEvent,
  treeType: CacheTreeType,
  nodeType: WorkNodeType,
  reason: string
): { blockId: string; cacheKey: string } {
  const identity = {
    sourceEventId: event.id,
    sourceEventType: event.type,
    reason,
  };
  const scope = workCacheScopeFromEvent(event);
  return {
    blockId: createWorkBlockId({ treeType, nodeType, sourceEventId: event.id, scope, identity }),
    cacheKey: createWorkCacheKey({ treeType, nodeType, scope, identity }),
  };
}

export function workCacheScopeFromEvent(event: FrameworkEvent): WorkCacheScope | undefined {
  const metadata = recordFromUnknown(event.metadata);
  const scope: WorkCacheScope = {
    tenantId: stringValue(event.tenantId),
    userId: stringValue(event.userId),
    workspaceId: stringValue(event.workspaceId),
    sessionId: stringValue(event.sessionId),
    agentId: stringValue(event.agentId),
    domainPackId: stringValue(metadata.domainPackId),
  };
  return Object.values(scope).some(Boolean) ? scope : undefined;
}

function promptPrefixMetadataFrom(
  payload: Record<string, unknown>,
  event: FrameworkEvent
): Record<string, unknown> | null {
  const candidates = [
    payload.prefixMetadata,
    recordFromUnknown(payload.metadata).prefixMetadata,
    recordFromUnknown(payload.servingCache).prefixMetadata,
    recordFromUnknown(recordFromUnknown(payload.metadata).servingCache).prefixMetadata,
    recordFromUnknown(event.metadata).prefixMetadata,
    recordFromUnknown(recordFromUnknown(event.metadata).servingCache).prefixMetadata,
  ];
  for (const candidate of candidates) {
    const record = recordFromUnknown(candidate);
    if (typeof record.prefixHash === 'string' || Array.isArray(record.blocks)) return record;
  }
  return null;
}

function normalizePromptPrefixBlock(value: unknown, index: number): PromptPrefixBlockValue | null {
  const block = recordFromUnknown(value);
  const id = stringValue(block.id);
  const type = stringValue(block.type);
  if (!id || !type) return null;
  const content =
    stringValue(block.content) ??
    stringValue(block.prompt) ??
    stableJson({
      id,
      type,
      hash: block.hash,
    });
  const hash = stringValue(block.hash) ?? hashStableJson(content);
  return {
    id,
    type,
    hash,
    stable: block.stable !== false,
    content,
    tokenEstimate: numberValue(block.tokenEstimate),
    order: numberValue(block.order) ?? index,
    prefixHash: '',
    source: stringValue(block.source),
    templateId: stringValue(block.templateId),
    templateVersion: stringValue(block.templateVersion),
    metadata: recordWithValues(block.metadata),
  };
}

function verificationProofFrom(payload: Record<string, unknown>): Record<string, string> | null {
  const proof = recordFromUnknown(payload.validityProof ?? payload.proof);
  const sourceHash =
    stringValue(payload.sourceHash) ??
    stringValue(proof.sourceHash) ??
    stringValue(recordFromUnknown(payload.provenance).sourceHash);
  const testHash =
    stringValue(payload.testHash) ??
    stringValue(proof.testHash) ??
    stringValue(recordFromUnknown(payload.provenance).testHash);
  const envHash =
    stringValue(payload.envHash) ??
    stringValue(proof.envHash) ??
    stringValue(recordFromUnknown(payload.provenance).envHash);
  if (!sourceHash || !testHash || !envHash) return null;
  return { sourceHash, testHash, envHash };
}

function validityFromRecord(payload: Record<string, unknown>): CacheBlockValidity | null {
  const output = recordFromUnknown(payload.output);
  const outputProvenance = recordFromUnknown(output.provenance);
  const validity = recordFromUnknown(payload.validity ?? output.validity);
  const proof = recordFromUnknown(payload.validityProof ?? output.validityProof ?? validity.proof);
  const sourceHashes = recordStringMap(
    payload.sourceHashes ??
      output.sourceHashes ??
      validity.sourceHashes ??
      recordFromUnknown(payload.provenance).sourceHashes ??
      outputProvenance.sourceHashes
  );
  const hash =
    stringValue(payload.hash) ??
    stringValue(payload.contentHash) ??
    stringValue(payload.sourceHash) ??
    stringValue(output.hash) ??
    stringValue(output.contentHash) ??
    stringValue(output.sourceHash) ??
    stringValue(recordFromUnknown(payload.provenance).hash) ??
    stringValue(recordFromUnknown(payload.provenance).sourceHash) ??
    stringValue(outputProvenance.hash) ??
    stringValue(outputProvenance.sourceHash);
  if (!Object.keys(proof).length && !Object.keys(sourceHashes).length && !hash) return null;
  return {
    status:
      validity.status === 'invalid' || validity.status === 'unknown' || validity.status === 'valid'
        ? validity.status
        : 'valid',
    proof: Object.keys(proof).length ? proof : undefined,
    sourceHashes: Object.keys(sourceHashes).length
      ? sourceHashes
      : hash
        ? { source: hash }
        : undefined,
    provenanceHash: hashStableJson(payload.provenance ?? proof ?? sourceHashes ?? hash),
  };
}

function isReadOnlySideEffect(value: unknown): boolean {
  return value === 'read' || value === 'none';
}

function permissionScopeFrom(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string' && item.length > 0);
}

function recordStringMap(value: unknown): Record<string, string> {
  const record = recordFromUnknown(value);
  const output: Record<string, string> = {};
  for (const [key, candidate] of Object.entries(record)) {
    if (typeof candidate === 'string') output[key] = candidate;
  }
  return output;
}

function hashFromKnownInput(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  return hashStableJson(value);
}

function recordWithValues(value: unknown): Record<string, unknown> | undefined {
  const record = recordFromUnknown(value);
  return Object.keys(record).length ? record : undefined;
}

function recordFromUnknown(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function arrayFromUnknown(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function numberValue(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}
