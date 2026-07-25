import { describe, expect, it } from 'vitest';
import type { JsonSchema } from '@hypha/core';
import {
  contextProfileSpecExample,
  contextProfileSpecJsonSchema,
  memoryContractJsonSchemas,
  memoryContractSpecRefJsonSchema,
  memoryExtractionProfileSpecExample,
  memoryExtractionProfileSpecJsonSchema,
  memoryLifecycleJsonSchemas,
  memoryIntegrationJsonSchemas,
  memoryIntegrationSpecDefinitions,
  memoryProfileSpecExample,
  memoryProfileSpecJsonSchema,
  validateContextProfileSpec,
  validateMemoryExtractionProfileSpec,
  validateMemoryProfileSpec,
} from './index';

function property(schema: JsonSchema, name: string): JsonSchema {
  const value = schema.properties?.[name];
  if (!value) throw new Error(`Missing JSON Schema property: ${name}`);
  return value;
}
function arrayItems(schema: JsonSchema): JsonSchema {
  const value = schema.items;
  if (!value) throw new Error('Missing JSON Schema array items.');
  return value;
}

function expectStrictSpecRef(schema: JsonSchema): void {
  expect(schema).toMatchObject({
    type: 'object',
    required: ['id'],
    additionalProperties: false,
    properties: {
      id: { type: 'string', minLength: 1 },
      version: { type: 'string', minLength: 1 },
      revision: { type: 'string', minLength: 1 },
    },
  });
}

describe('memory JSON Schema parity', () => {
  it('uses one strict SpecRef contract in profile and lifecycle JSON schemas', () => {
    expectStrictSpecRef(memoryContractSpecRefJsonSchema);
    for (const name of [
      'managementProviderRef',
      'workingStoreRef',
      'recordStoreRef',
      'artifactStoreRef',
      'embeddingProviderRef',
      'rerankerProviderRef',
      'contextProfileRef',
    ]) {
      expectStrictSpecRef(property(memoryProfileSpecJsonSchema, name));
    }
    expectStrictSpecRef(arrayItems(property(memoryProfileSpecJsonSchema, 'vectorStoreRefs')));
    for (const name of ['sensitiveDataPolicyRef', 'writePolicyRef', 'maintenancePolicyRef']) {
      expectStrictSpecRef(property(memoryExtractionProfileSpecJsonSchema, name));
    }
  });

  it('exports the complete integration contract JSON Schema set', () => {
    expect(Object.keys(memoryIntegrationJsonSchemas).sort()).toEqual([
      'DomainMemoryDependencySnapshot',
      'MemoryCacheInvalidation',
      'MemoryCacheValidityInput',
      'MemoryEvaluationCase',
      'MemoryEvaluationObservation',
      'MemoryReplayReference',
      'SessionMemoryBinding',
      'WorkflowStateMemoryBinding',
    ]);
    for (const definition of memoryIntegrationSpecDefinitions) {
      expect(definition.parse(definition.example)).toEqual(definition.example);
      expect(definition.jsonSchema.additionalProperties).toBe(false);
    }
  });

  it('keeps integration nested references and capability snapshots strict', () => {
    const workflow = memoryIntegrationJsonSchemas.WorkflowStateMemoryBinding;
    expectStrictSpecRef(property(workflow, 'memoryProfileRef'));
    expectStrictSpecRef(property(workflow, 'contextProfileRef'));
    expectStrictSpecRef(property(workflow, 'extractionProfileRef'));

    const snapshot = memoryIntegrationJsonSchemas.DomainMemoryDependencySnapshot;
    expectStrictSpecRef(property(snapshot, 'domainPackRef'));
    expectStrictSpecRef(arrayItems(property(snapshot, 'providerRefs')));
    expectStrictSpecRef(arrayItems(property(snapshot, 'policyRefs')));
    expect(property(snapshot, 'capabilitySnapshot').additionalProperties).toBe(false);
    expect(snapshot.properties).not.toHaveProperty('capabilitySnapshots');
    expect(snapshot.properties).not.toHaveProperty('stateBindings');
  });

  it('keeps nested profile, provider, vector, lifecycle and context objects strict', () => {
    for (const name of [
      'scopePolicy',
      'retrievalPolicy',
      'writePolicy',
      'retentionPolicy',
      'consolidationPolicy',
      'conflictPolicy',
      'fallbackPolicy',
      'privacyPolicy',
      'indexingPolicy',
    ]) {
      expect(property(memoryProfileSpecJsonSchema, name).additionalProperties).toBe(false);
    }

    const provider = memoryContractJsonSchemas.MemoryManagementProviderSpec;
    expect(property(provider, 'capabilities').additionalProperties).toBe(false);
    const vector = memoryContractJsonSchemas.VectorStoreSpec;
    expect(property(vector, 'capabilities').additionalProperties).toBe(false);

    expect(arrayItems(property(contextProfileSpecJsonSchema, 'sources')).additionalProperties).toBe(
      false
    );
    expect(property(contextProfileSpecJsonSchema, 'ranking').additionalProperties).toBe(false);
    expect(property(contextProfileSpecJsonSchema, 'truncation').additionalProperties).toBe(false);
    expect(
      property(memoryExtractionProfileSpecJsonSchema, 'candidateValidation').additionalProperties
    ).toBe(false);
  });

  it('rejects unknown fields inside nested Zod contract objects', () => {
    expect(() =>
      validateMemoryProfileSpec({
        ...memoryProfileSpecExample,
        retrievalPolicy: {
          ...memoryProfileSpecExample.retrievalPolicy,
          unexpectedSecret: true,
        },
      })
    ).toThrow(/unrecognized/i);
    expect(() =>
      validateMemoryExtractionProfileSpec({
        ...memoryExtractionProfileSpecExample,
        candidateValidation: {
          ...memoryExtractionProfileSpecExample.candidateValidation,
          unexpectedSecret: true,
        },
      })
    ).toThrow(/unrecognized/i);
    expect(() =>
      validateContextProfileSpec({
        ...contextProfileSpecExample,
        ranking: { ...contextProfileSpecExample.ranking, unexpectedSecret: true },
      })
    ).toThrow(/unrecognized/i);
  });

  it('mirrors non-empty and numeric bounds in exported JSON schemas', () => {
    for (const schema of [
      memoryProfileSpecJsonSchema,
      memoryContractJsonSchemas.MemoryManagementProviderSpec,
      memoryContractJsonSchemas.WorkingMemoryStoreSpec,
      memoryContractJsonSchemas.MemoryRecordStoreSpec,
      memoryContractJsonSchemas.VectorStoreSpec,
      memoryContractJsonSchemas.EmbeddingProviderSpec,
      contextProfileSpecJsonSchema,
      memoryExtractionProfileSpecJsonSchema,
      memoryLifecycleJsonSchemas.MemoryMaintenancePolicySpec,
    ]) {
      expect(property(schema, 'id').minLength).toBe(1);
      expect(property(schema, 'version').minLength).toBe(1);
    }

    expect(property(contextProfileSpecJsonSchema, 'maxTokens')).toMatchObject({
      type: 'integer',
      minimum: 1,
    });
    expect(property(contextProfileSpecJsonSchema, 'reservedOutputTokens').minimum).toBe(0);
    const sourceTypes = property(memoryExtractionProfileSpecJsonSchema, 'acceptedSourceTypes');
    expect(sourceTypes.minItems).toBe(1);
    expect(arrayItems(sourceTypes).enum).toContain('runtime_event');
    const outputTypes = property(memoryExtractionProfileSpecJsonSchema, 'outputMemoryTypes');
    expect(outputTypes.minItems).toBe(1);
    expect(arrayItems(outputTypes).enum).toContain('semantic');
  });
});
