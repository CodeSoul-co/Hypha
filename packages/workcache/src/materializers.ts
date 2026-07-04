import type { FrameworkEvent } from '@hypha/core';
import { createWorkBlockId, createWorkCacheKey, hashStableJson, stableJson } from './key';
import type {
  CacheBlock,
  CacheBlockValidity,
  CacheTreeType,
  NormalizedWorkEvent,
  WorkNodeType,
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

export function materializePromptPrefixBlock(event: NormalizedWorkEvent): CacheBlock[] {
  const payload = recordFromUnknown(event.payload);
  const prefixMetadata = promptPrefixMetadataFrom(payload, event.sourceEvent);
  if (!prefixMetadata) return [];

  const blocks = arrayFromUnknown(prefixMetadata.blocks)
    .map((block) => recordFromUnknown(block))
    .filter((block) => block.stable === true)
    .sort((left, right) => {
      const leftKey = `${stringValue(left.type) ?? ''}:${stringValue(left.id) ?? ''}`;
      const rightKey = `${stringValue(right.type) ?? ''}:${stringValue(right.id) ?? ''}`;
      return leftKey.localeCompare(rightKey);
    });
  if (!blocks.length) return [];

  const prefixContent =
    stringValue(prefixMetadata.prefixContent) ??
    blocks
      .map((block) =>
        stableJson({
          id: block.id,
          type: block.type,
          hash: block.hash,
        })
      )
      .join('\n');
  const prefixHash = stringValue(prefixMetadata.prefixHash) ?? hashStableJson(blocks);
  const tokenEstimate = numberValue(prefixMetadata.prefixTokenEstimate);

  return [
    createBlock(event, {
      identity: {
        prefixHash,
        blockOrder: blocks.map((block) => `${stringValue(block.type)}:${stringValue(block.id)}`),
      },
      value: {
        content: prefixContent,
        prefixHash,
        blocks,
        tokenEstimate,
      },
      validity: {
        status: 'valid',
        proof: {
          prefixHash,
          requestHash: stringValue(prefixMetadata.requestHash),
          toolSchemaHash: stringValue(prefixMetadata.toolSchemaHash),
          domainPackHash: stringValue(prefixMetadata.domainPackHash),
        },
        sourceHashes: {
          prefix: prefixHash,
          ...(stringValue(prefixMetadata.dynamicSuffixHash)
            ? { dynamicSuffix: stringValue(prefixMetadata.dynamicSuffixHash) as string }
            : {}),
        },
      },
      metadata: {
        prefixHash,
        requestHash: stringValue(prefixMetadata.requestHash),
        toolSchemaHash: stringValue(prefixMetadata.toolSchemaHash),
        domainPackHash: stringValue(prefixMetadata.domainPackHash),
        prefixTokenEstimate: tokenEstimate,
      },
      tags: ['prompt-prefix'],
    }),
  ];
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
  const cacheKey = createWorkCacheKey({
    treeType: event.treeType,
    nodeType: event.nodeType,
    identity: input.identity,
  });
  const blockId = createWorkBlockId({
    treeType: event.treeType,
    nodeType: event.nodeType,
    sourceEventId: event.sourceEventId,
    identity: input.identity,
  });
  const timestamp = Date.parse(event.sourceEvent.timestamp);
  const now = Number.isFinite(timestamp) ? timestamp : Date.now();
  return {
    id: blockId,
    treeType: event.treeType,
    nodeType: event.nodeType,
    cacheKey,
    value: input.value,
    createdAt: now,
    updatedAt: now,
    sourceEventId: event.sourceEventId,
    sourceEventType: event.sourceEventType,
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
  return {
    blockId: createWorkBlockId({ treeType, nodeType, sourceEventId: event.id, identity }),
    cacheKey: createWorkCacheKey({ treeType, nodeType, identity }),
  };
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
  const validity = recordFromUnknown(payload.validity);
  const proof = recordFromUnknown(payload.validityProof ?? validity.proof);
  const sourceHashes = recordStringMap(
    payload.sourceHashes ?? validity.sourceHashes ?? recordFromUnknown(payload.provenance).sourceHashes
  );
  const hash =
    stringValue(payload.hash) ??
    stringValue(payload.contentHash) ??
    stringValue(payload.sourceHash) ??
    stringValue(recordFromUnknown(payload.provenance).hash) ??
    stringValue(recordFromUnknown(payload.provenance).sourceHash);
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
