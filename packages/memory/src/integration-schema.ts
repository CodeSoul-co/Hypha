import { z, type ZodType } from 'zod';
import type {
  DomainMemoryDependencySnapshot,
  MemoryCacheInvalidation,
  MemoryCacheValidityInput,
  MemoryEvaluationCase,
  MemoryEvaluationObservation,
  MemoryReplayReference,
  SessionMemoryBinding,
  WorkflowStateMemoryBinding,
} from './integration-contracts';
import { memoryContractSpecRefSchema } from './profile-contract';
import { managedMemoryScopeSchema, managedMemoryTypeSchema } from './record-contract';

export const workflowStateMemoryBindingSchema: ZodType<WorkflowStateMemoryBinding> = z
  .object({
    memoryProfileRef: memoryContractSpecRefSchema.optional(),
    contextProfileRef: memoryContractSpecRefSchema.optional(),
    extractionProfileRef: memoryContractSpecRefSchema.optional(),
    readPolicyRef: memoryContractSpecRefSchema.optional(),
    writePolicyRef: memoryContractSpecRefSchema.optional(),
    allowedMemoryTypes: z.array(managedMemoryTypeSchema).optional(),
    memoryAccessMode: z.enum(['none', 'read', 'write', 'read_write']).optional(),
    autoCapture: z.boolean().optional(),
  })
  .strict();

export const sessionMemoryBindingSchema: ZodType<SessionMemoryBinding> = z
  .object({
    memoryProfileRef: memoryContractSpecRefSchema.optional(),
    contextProfileRef: memoryContractSpecRefSchema.optional(),
    memoryScopeTemplate: managedMemoryScopeSchema.partial().strict().optional(),
    sessionScopeMode: z.enum(['isolated', 'user_shared', 'workspace_shared']).optional(),
  })
  .strict();

export const domainMemoryDependencySnapshotSchema: ZodType<DomainMemoryDependencySnapshot> = z
  .object({
    domainPackRef: memoryContractSpecRefSchema,
    memoryProfileRef: memoryContractSpecRefSchema.optional(),
    contextProfileRef: memoryContractSpecRefSchema.optional(),
    extractionProfileRef: memoryContractSpecRefSchema.optional(),
    providerRefs: z.array(memoryContractSpecRefSchema),
    policyRefs: z.array(memoryContractSpecRefSchema),
    scopeTemplate: managedMemoryScopeSchema.partial().strict().optional(),
    capabilitySnapshot: z
      .object({
        add: z.boolean().optional(),
        search: z.boolean().optional(),
        get: z.boolean().optional(),
        list: z.boolean().optional(),
        update: z.boolean().optional(),
        delete: z.boolean().optional(),
        deleteByFilter: z.boolean().optional(),
        history: z.boolean().optional(),
        summarize: z.boolean().optional(),
        consolidate: z.boolean().optional(),
        decay: z.boolean().optional(),
        reinforce: z.boolean().optional(),
        conflictDetection: z.boolean().optional(),
        hybridSearch: z.boolean().optional(),
        graphRelations: z.boolean().optional(),
        asyncWrite: z.boolean().optional(),
        batchOperations: z.boolean().optional(),
      })
      .strict(),
    dependencyHash: z.string().min(1),
    createdAt: z.string().datetime(),
  })
  .strict();

export const memoryCacheValidityInputSchema: ZodType<MemoryCacheValidityInput> = z
  .object({
    memoryProfileRevision: z.string().min(1),
    contextProfileRevision: z.string().min(1).optional(),
    scopeHash: z.string().min(1),
    queryHash: z.string().min(1).optional(),
    recordSetRevision: z.string().min(1).optional(),
    selectedMemoryVersionIds: z.array(z.string().min(1)).optional(),
    providerRevision: z.string().min(1).optional(),
    embeddingRevision: z.string().min(1).optional(),
    policyRevision: z.string().min(1).optional(),
  })
  .strict();

export const memoryCacheInvalidationSchema: ZodType<MemoryCacheInvalidation> = z
  .object({
    operationId: z.string().min(1),
    scopeHash: z.string().min(1),
    reason: z.enum(['created', 'updated', 'invalidated', 'deleted', 'provider_revision']),
    memoryIds: z.array(z.string().min(1)),
    memoryVersionIds: z.array(z.string().min(1)).optional(),
    validityHash: z.string().min(1),
  })
  .strict();

export const memoryReplayReferenceSchema: ZodType<MemoryReplayReference> = z
  .object({
    operationId: z.string().min(1),
    profileRevision: z.string().min(1),
    scopeHash: z.string().min(1),
    eventIds: z.array(z.string().min(1)),
    memoryVersionIds: z.array(z.string().min(1)),
    retrievalSnapshotId: z.string().min(1).optional(),
    contextHash: z.string().min(1).optional(),
  })
  .strict();

export const memoryEvaluationCaseSchema: ZodType<MemoryEvaluationCase> = z
  .object({
    id: z.string().min(1),
    category: z.enum(['extraction', 'retrieval', 'context', 'lifecycle']),
    inputRef: z.string().min(1),
    expectedRef: z.string().min(1).optional(),
    metricIds: z.array(z.string().min(1)).min(1),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict();

export const memoryEvaluationObservationSchema: ZodType<MemoryEvaluationObservation> = z
  .object({
    caseId: z.string().min(1),
    operationId: z.string().min(1),
    traceEventIds: z.array(z.string().min(1)),
    memoryVersionIds: z.array(z.string().min(1)).optional(),
    retrievalSnapshotId: z.string().min(1).optional(),
    contextHash: z.string().min(1).optional(),
    metrics: z.record(z.number().finite()).optional(),
  })
  .strict();

export const workflowStateMemoryBindingExample: WorkflowStateMemoryBinding = {
  memoryProfileRef: { id: 'memory.default', version: '1.0.0', revision: 'memory:v1' },
  contextProfileRef: { id: 'context.default', version: '1.0.0', revision: 'context:v1' },
  readPolicyRef: { id: 'policy.memory.read', version: '1.0.0' },
  writePolicyRef: { id: 'policy.memory.write', version: '1.0.0' },
  allowedMemoryTypes: ['working', 'episodic', 'semantic'],
  memoryAccessMode: 'read_write',
  autoCapture: true,
};

export const sessionMemoryBindingExample: SessionMemoryBinding = {
  memoryProfileRef: workflowStateMemoryBindingExample.memoryProfileRef,
  contextProfileRef: workflowStateMemoryBindingExample.contextProfileRef,
  memoryScopeTemplate: { workspaceId: 'workspace:default' },
  sessionScopeMode: 'isolated',
};

export const memoryCacheValidityInputExample: MemoryCacheValidityInput = {
  memoryProfileRevision: 'memory:v1',
  contextProfileRevision: 'context:v1',
  scopeHash: 'scope:sha256',
  selectedMemoryVersionIds: ['memory:preference:v3'],
  providerRevision: 'provider:v2',
  policyRevision: 'policy:v1',
};

export const memoryReplayReferenceExample: MemoryReplayReference = {
  operationId: 'operation:memory:1',
  profileRevision: 'memory:v1',
  scopeHash: 'scope:sha256',
  eventIds: ['event:memory:requested', 'event:memory:completed'],
  memoryVersionIds: ['memory:preference:v3'],
  retrievalSnapshotId: 'retrieval:snapshot:1',
  contextHash: 'context:sha256',
};

export const memoryEvaluationCaseExample: MemoryEvaluationCase = {
  id: 'evaluation:memory:retrieval:1',
  category: 'retrieval',
  inputRef: 'fixture:memory:retrieval:1',
  expectedRef: 'fixture:memory:retrieval:expected:1',
  metricIds: ['memory.recall_at_k', 'memory.scope_leak_count'],
};

export function validateWorkflowStateMemoryBinding(input: unknown): WorkflowStateMemoryBinding {
  return workflowStateMemoryBindingSchema.parse(input);
}

export function validateSessionMemoryBinding(input: unknown): SessionMemoryBinding {
  return sessionMemoryBindingSchema.parse(input);
}

export function validateDomainMemoryDependencySnapshot(
  input: unknown
): DomainMemoryDependencySnapshot {
  return domainMemoryDependencySnapshotSchema.parse(input);
}

export function validateMemoryCacheValidityInput(input: unknown): MemoryCacheValidityInput {
  return memoryCacheValidityInputSchema.parse(input);
}

export function validateMemoryCacheInvalidation(input: unknown): MemoryCacheInvalidation {
  return memoryCacheInvalidationSchema.parse(input);
}

export function validateMemoryReplayReference(input: unknown): MemoryReplayReference {
  return memoryReplayReferenceSchema.parse(input);
}

export function validateMemoryEvaluationCase(input: unknown): MemoryEvaluationCase {
  return memoryEvaluationCaseSchema.parse(input);
}

export function validateMemoryEvaluationObservation(input: unknown): MemoryEvaluationObservation {
  return memoryEvaluationObservationSchema.parse(input);
}
