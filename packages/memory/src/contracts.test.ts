import { describe, expect, it } from 'vitest';
import {
  embeddingProviderSpecExample,
  managedMemoryRecordExample,
  memoryAddRequestExample,
  memoryContractJsonSchemas,
  memoryManagementProviderSpecExample,
  memoryManagementProviderSpecSchema,
  memoryProfileSpecDefinition,
  memoryProfileSpecExample,
  memoryRecordStoreSpecExample,
  vectorStoreSpecExample,
  workingMemoryStoreSpecExample,
  validateManagedMemoryRecord,
  validateMemoryProfileSpec,
  validateManagedMemoryDeleteRequest,
  validateManagedMemorySearchRequest,
  validateManagedMemoryUpdateRequest,
  validateMemoryAddRequest,
  validateEmbeddingProviderSpec,
  validateMemoryRecordStoreSpec,
  validateVectorStoreSpec,
  validateWorkingMemoryStoreSpec,
} from './index';

describe('@hypha/memory production contracts', () => {
  it('validates a versioned MemoryProfileSpec with explicit scope and policies', () => {
    expect(validateMemoryProfileSpec(memoryProfileSpecExample)).toEqual(memoryProfileSpecExample);
    expect(memoryProfileSpecDefinition.example.revision).toBe('memory-default-v1');
    expect(memoryContractJsonSchemas.MemoryProfileSpec.required).toEqual(
      expect.arrayContaining([
        'managementProviderRef',
        'recordStoreRef',
        'scopePolicy',
        'retrievalPolicy',
        'writePolicy',
        'retentionPolicy',
      ])
    );
  });

  it('exports and validates the required storage and embedding contracts', () => {
    expect(Object.keys(memoryContractJsonSchemas)).toEqual(
      expect.arrayContaining([
        'WorkingMemoryStoreSpec',
        'MemoryRecordStoreSpec',
        'VectorStoreSpec',
        'EmbeddingProviderSpec',
      ])
    );
    expect(validateWorkingMemoryStoreSpec(workingMemoryStoreSpecExample)).toEqual(
      workingMemoryStoreSpecExample
    );
    expect(validateMemoryRecordStoreSpec(memoryRecordStoreSpecExample)).toEqual(
      memoryRecordStoreSpecExample
    );
    expect(validateVectorStoreSpec(vectorStoreSpecExample)).toEqual(vectorStoreSpecExample);
    expect(validateEmbeddingProviderSpec(embeddingProviderSpecExample)).toEqual(
      embeddingProviderSpecExample
    );
  });

  it('rejects unknown top-level fields consistently with exported JSON schemas', () => {
    const cases: Array<() => unknown> = [
      () => validateMemoryProfileSpec({ ...memoryProfileSpecExample, unexpectedSecret: 'value' }),
      () =>
        memoryManagementProviderSpecSchema.parse({
          ...memoryManagementProviderSpecExample,
          unexpectedSecret: 'value',
        }),
      () =>
        validateWorkingMemoryStoreSpec({
          ...workingMemoryStoreSpecExample,
          unexpectedSecret: 'value',
        }),
      () =>
        validateMemoryRecordStoreSpec({
          ...memoryRecordStoreSpecExample,
          unexpectedSecret: 'value',
        }),
      () => validateVectorStoreSpec({ ...vectorStoreSpecExample, unexpectedSecret: 'value' }),
      () =>
        validateEmbeddingProviderSpec({
          ...embeddingProviderSpecExample,
          unexpectedSecret: 'value',
        }),
    ];

    for (const validate of cases) expect(validate).toThrow(/unrecognized/i);
  });

  it('rejects profiles without an explicit user scope boundary', () => {
    expect(() =>
      validateMemoryProfileSpec({
        ...memoryProfileSpecExample,
        scopePolicy: {
          ...memoryProfileSpecExample.scopePolicy,
          requiredDimensions: [],
        },
      })
    ).toThrow();
  });

  it('validates provider capabilities instead of inferring them from provider type', () => {
    expect(memoryManagementProviderSpecSchema.parse(memoryManagementProviderSpecExample)).toEqual(
      memoryManagementProviderSpecExample
    );
    expect(() =>
      memoryManagementProviderSpecSchema.parse({
        ...memoryManagementProviderSpecExample,
        capabilities: { add: true },
      })
    ).toThrow();
  });

  it('validates versioned, scoped and provenance-bearing memory records', () => {
    expect(validateManagedMemoryRecord(managedMemoryRecordExample)).toEqual(
      managedMemoryRecordExample
    );
  });

  it('rejects invalid revisions, confidence and missing provenance fields', () => {
    expect(() =>
      validateManagedMemoryRecord({
        ...managedMemoryRecordExample,
        revision: 0,
      })
    ).toThrow();
    expect(() =>
      validateManagedMemoryRecord({
        ...managedMemoryRecordExample,
        confidence: 1.1,
      })
    ).toThrow();
    expect(() =>
      validateManagedMemoryRecord({
        ...managedMemoryRecordExample,
        provenance: { createdBy: 'agent_01' },
      })
    ).toThrow();
  });

  it('validates governed add and search requests', () => {
    expect(validateMemoryAddRequest(memoryAddRequestExample)).toEqual(memoryAddRequestExample);
    expect(
      validateManagedMemorySearchRequest({
        operationId: 'operation_search_01',
        principal: memoryAddRequestExample.principal,
        scope: memoryAddRequestExample.scope,
        profileRef: memoryAddRequestExample.profileRef,
        query: 'answer preference',
        mode: 'hybrid',
        topK: 5,
      })
    ).toMatchObject({ operationId: 'operation_search_01', topK: 5 });
    expect(() =>
      validateManagedMemorySearchRequest({
        operationId: 'operation_search_invalid',
        principal: memoryAddRequestExample.principal,
        scope: memoryAddRequestExample.scope,
        profileRef: memoryAddRequestExample.profileRef,
      })
    ).toThrow(/requires a query/);
  });

  it('requires optimistic revision control and explicit delete targeting', () => {
    expect(
      validateManagedMemoryUpdateRequest({
        operationId: 'operation_update_01',
        principal: memoryAddRequestExample.principal,
        scope: memoryAddRequestExample.scope,
        memoryId: 'memory_01',
        expectedRevision: 1,
        patch: { canonicalText: 'User prefers short answers.' },
        reason: 'User correction',
      })
    ).toMatchObject({ expectedRevision: 1 });
    expect(() =>
      validateManagedMemoryDeleteRequest({
        operationId: 'operation_delete_invalid',
        principal: memoryAddRequestExample.principal,
        scope: memoryAddRequestExample.scope,
        mode: 'compliance',
        reason: 'User request',
      })
    ).toThrow(/exactly one/);
  });
});
