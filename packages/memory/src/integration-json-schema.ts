import { defineSpecSchema, exportSpecJsonSchemas, type JsonSchema } from '@hypha/core';
import type {
  DomainMemoryDependencySnapshot,
  MemoryCacheInvalidation,
  MemoryEvaluationObservation,
} from './integration-contracts';
import {
  domainMemoryDependencySnapshotSchema,
  memoryCacheInvalidationSchema,
  memoryCacheValidityInputExample,
  memoryCacheValidityInputSchema,
  memoryEvaluationCaseExample,
  memoryEvaluationCaseSchema,
  memoryEvaluationObservationSchema,
  memoryReplayReferenceExample,
  memoryReplayReferenceSchema,
  sessionMemoryBindingExample,
  sessionMemoryBindingSchema,
  workflowStateMemoryBindingExample,
  workflowStateMemoryBindingSchema,
} from './integration-schema';
import { memoryContractSpecRefJsonSchema } from './profile-contract';

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const nonEmptyStringArrayJsonSchema: JsonSchema = {
  type: 'array',
  items: nonEmptyStringJsonSchema,
};
const metadataJsonSchema: JsonSchema = { type: 'object', additionalProperties: true };

const managedMemoryTypeJsonSchema: JsonSchema = {
  type: 'string',
  enum: [
    'working',
    'episodic',
    'semantic',
    'procedural',
    'preference',
    'artifact',
    'governance',
    'reflection',
    'custom',
  ],
};

const managedMemoryScopeTemplateJsonSchema: JsonSchema = {
  type: 'object',
  properties: Object.fromEntries(
    [
      'tenantId',
      'userId',
      'workspaceId',
      'projectId',
      'sessionId',
      'runId',
      'agentId',
      'domainPackId',
    ].map((key) => [key, nonEmptyStringJsonSchema])
  ),
  additionalProperties: false,
};

const capabilityNames = [
  'add',
  'search',
  'get',
  'list',
  'update',
  'delete',
  'deleteByFilter',
  'history',
  'summarize',
  'consolidate',
  'decay',
  'reinforce',
  'conflictDetection',
  'hybridSearch',
  'graphRelations',
  'asyncWrite',
  'batchOperations',
] as const;

const partialMemoryManagementCapabilitiesJsonSchema: JsonSchema = {
  type: 'object',
  properties: Object.fromEntries(
    capabilityNames.map((name) => [name, { type: 'boolean' } satisfies JsonSchema])
  ),
  additionalProperties: false,
};

export const workflowStateMemoryBindingJsonSchema: JsonSchema = {
  type: 'object',
  properties: {
    memoryProfileRef: memoryContractSpecRefJsonSchema,
    contextProfileRef: memoryContractSpecRefJsonSchema,
    extractionProfileRef: memoryContractSpecRefJsonSchema,
    readPolicyRef: memoryContractSpecRefJsonSchema,
    writePolicyRef: memoryContractSpecRefJsonSchema,
    allowedMemoryTypes: { type: 'array', items: managedMemoryTypeJsonSchema },
    memoryAccessMode: { type: 'string', enum: ['none', 'read', 'write', 'read_write'] },
    autoCapture: { type: 'boolean' },
  },
  additionalProperties: false,
};

export const sessionMemoryBindingJsonSchema: JsonSchema = {
  type: 'object',
  properties: {
    memoryProfileRef: memoryContractSpecRefJsonSchema,
    contextProfileRef: memoryContractSpecRefJsonSchema,
    memoryScopeTemplate: managedMemoryScopeTemplateJsonSchema,
    sessionScopeMode: {
      type: 'string',
      enum: ['isolated', 'user_shared', 'workspace_shared'],
    },
  },
  additionalProperties: false,
};

export const domainMemoryDependencySnapshotJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'domainPackRef',
    'providerRefs',
    'policyRefs',
    'capabilitySnapshot',
    'dependencyHash',
    'createdAt',
  ],
  properties: {
    domainPackRef: memoryContractSpecRefJsonSchema,
    memoryProfileRef: memoryContractSpecRefJsonSchema,
    contextProfileRef: memoryContractSpecRefJsonSchema,
    extractionProfileRef: memoryContractSpecRefJsonSchema,
    providerRefs: { type: 'array', items: memoryContractSpecRefJsonSchema },
    policyRefs: { type: 'array', items: memoryContractSpecRefJsonSchema },
    scopeTemplate: managedMemoryScopeTemplateJsonSchema,
    capabilitySnapshot: partialMemoryManagementCapabilitiesJsonSchema,
    dependencyHash: nonEmptyStringJsonSchema,
    createdAt: { type: 'string', format: 'date-time' },
  },
  additionalProperties: false,
};

export const memoryCacheValidityInputJsonSchema: JsonSchema = {
  type: 'object',
  required: ['memoryProfileRevision', 'scopeHash'],
  properties: {
    memoryProfileRevision: nonEmptyStringJsonSchema,
    contextProfileRevision: nonEmptyStringJsonSchema,
    scopeHash: nonEmptyStringJsonSchema,
    queryHash: nonEmptyStringJsonSchema,
    recordSetRevision: nonEmptyStringJsonSchema,
    selectedMemoryVersionIds: nonEmptyStringArrayJsonSchema,
    providerRevision: nonEmptyStringJsonSchema,
    embeddingRevision: nonEmptyStringJsonSchema,
    policyRevision: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const memoryCacheInvalidationJsonSchema: JsonSchema = {
  type: 'object',
  required: ['operationId', 'scopeHash', 'reason', 'memoryIds', 'validityHash'],
  properties: {
    operationId: nonEmptyStringJsonSchema,
    scopeHash: nonEmptyStringJsonSchema,
    reason: {
      type: 'string',
      enum: ['created', 'updated', 'invalidated', 'deleted', 'provider_revision'],
    },
    memoryIds: nonEmptyStringArrayJsonSchema,
    memoryVersionIds: nonEmptyStringArrayJsonSchema,
    validityHash: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const memoryReplayReferenceJsonSchema: JsonSchema = {
  type: 'object',
  required: ['operationId', 'profileRevision', 'scopeHash', 'eventIds', 'memoryVersionIds'],
  properties: {
    operationId: nonEmptyStringJsonSchema,
    profileRevision: nonEmptyStringJsonSchema,
    scopeHash: nonEmptyStringJsonSchema,
    eventIds: nonEmptyStringArrayJsonSchema,
    memoryVersionIds: nonEmptyStringArrayJsonSchema,
    retrievalSnapshotId: nonEmptyStringJsonSchema,
    contextHash: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const memoryEvaluationCaseJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'category', 'inputRef', 'metricIds'],
  properties: {
    id: nonEmptyStringJsonSchema,
    category: { type: 'string', enum: ['extraction', 'retrieval', 'context', 'lifecycle'] },
    inputRef: nonEmptyStringJsonSchema,
    expectedRef: nonEmptyStringJsonSchema,
    metricIds: { ...nonEmptyStringArrayJsonSchema, minItems: 1 },
    metadata: metadataJsonSchema,
  },
  additionalProperties: false,
};

export const memoryEvaluationObservationJsonSchema: JsonSchema = {
  type: 'object',
  required: ['caseId', 'operationId', 'traceEventIds'],
  properties: {
    caseId: nonEmptyStringJsonSchema,
    operationId: nonEmptyStringJsonSchema,
    traceEventIds: nonEmptyStringArrayJsonSchema,
    memoryVersionIds: nonEmptyStringArrayJsonSchema,
    retrievalSnapshotId: nonEmptyStringJsonSchema,
    contextHash: nonEmptyStringJsonSchema,
    metrics: { type: 'object', additionalProperties: { type: 'number' } },
  },
  additionalProperties: false,
};

export const domainMemoryDependencySnapshotExample: DomainMemoryDependencySnapshot = {
  domainPackRef: { id: 'domain.example', version: '1.0.0' },
  memoryProfileRef: workflowStateMemoryBindingExample.memoryProfileRef,
  contextProfileRef: workflowStateMemoryBindingExample.contextProfileRef,
  providerRefs: [{ id: 'memory.provider.native', version: '1.0.0' }],
  policyRefs: [{ id: 'policy.memory.read', version: '1.0.0' }],
  scopeTemplate: { workspaceId: 'workspace:default' },
  capabilitySnapshot: { add: true, search: true },
  dependencyHash: 'sha256:dependency-snapshot',
  createdAt: '2026-07-18T00:00:00.000Z',
};

export const memoryCacheInvalidationExample: MemoryCacheInvalidation = {
  operationId: 'operation:memory:invalidate:1',
  scopeHash: 'scope:sha256',
  reason: 'updated',
  memoryIds: ['memory:preference'],
  memoryVersionIds: ['memory:preference:v3'],
  validityHash: 'sha256:validity',
};

export const memoryEvaluationObservationExample: MemoryEvaluationObservation = {
  caseId: memoryEvaluationCaseExample.id,
  operationId: 'operation:evaluation:1',
  traceEventIds: ['event:memory:requested', 'event:memory:completed'],
  memoryVersionIds: ['memory:preference:v3'],
  retrievalSnapshotId: 'retrieval:snapshot:1',
  contextHash: 'context:sha256',
  metrics: { 'memory.recall_at_k': 1 },
};

export const workflowStateMemoryBindingSpecDefinition = defineSpecSchema({
  id: 'WorkflowStateMemoryBinding',
  zod: workflowStateMemoryBindingSchema,
  jsonSchema: workflowStateMemoryBindingJsonSchema,
  example: workflowStateMemoryBindingExample,
});

export const sessionMemoryBindingSpecDefinition = defineSpecSchema({
  id: 'SessionMemoryBinding',
  zod: sessionMemoryBindingSchema,
  jsonSchema: sessionMemoryBindingJsonSchema,
  example: sessionMemoryBindingExample,
});

export const domainMemoryDependencySnapshotSpecDefinition = defineSpecSchema({
  id: 'DomainMemoryDependencySnapshot',
  zod: domainMemoryDependencySnapshotSchema,
  jsonSchema: domainMemoryDependencySnapshotJsonSchema,
  example: domainMemoryDependencySnapshotExample,
});

export const memoryCacheValidityInputSpecDefinition = defineSpecSchema({
  id: 'MemoryCacheValidityInput',
  zod: memoryCacheValidityInputSchema,
  jsonSchema: memoryCacheValidityInputJsonSchema,
  example: memoryCacheValidityInputExample,
});

export const memoryCacheInvalidationSpecDefinition = defineSpecSchema({
  id: 'MemoryCacheInvalidation',
  zod: memoryCacheInvalidationSchema,
  jsonSchema: memoryCacheInvalidationJsonSchema,
  example: memoryCacheInvalidationExample,
});

export const memoryReplayReferenceSpecDefinition = defineSpecSchema({
  id: 'MemoryReplayReference',
  zod: memoryReplayReferenceSchema,
  jsonSchema: memoryReplayReferenceJsonSchema,
  example: memoryReplayReferenceExample,
});

export const memoryEvaluationCaseSpecDefinition = defineSpecSchema({
  id: 'MemoryEvaluationCase',
  zod: memoryEvaluationCaseSchema,
  jsonSchema: memoryEvaluationCaseJsonSchema,
  example: memoryEvaluationCaseExample,
});

export const memoryEvaluationObservationSpecDefinition = defineSpecSchema({
  id: 'MemoryEvaluationObservation',
  zod: memoryEvaluationObservationSchema,
  jsonSchema: memoryEvaluationObservationJsonSchema,
  example: memoryEvaluationObservationExample,
});

export const memoryIntegrationSpecDefinitions = [
  workflowStateMemoryBindingSpecDefinition,
  sessionMemoryBindingSpecDefinition,
  domainMemoryDependencySnapshotSpecDefinition,
  memoryCacheValidityInputSpecDefinition,
  memoryCacheInvalidationSpecDefinition,
  memoryReplayReferenceSpecDefinition,
  memoryEvaluationCaseSpecDefinition,
  memoryEvaluationObservationSpecDefinition,
] as const;

export const memoryIntegrationJsonSchemas = exportSpecJsonSchemas(memoryIntegrationSpecDefinitions);
