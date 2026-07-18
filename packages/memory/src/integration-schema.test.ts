import { describe, expect, it } from 'vitest';
import {
  createDomainMemoryDependencySnapshot,
  domainMemoryDependencySnapshotSchema,
  memoryCacheValidityInputExample,
  memoryEvaluationCaseExample,
  memoryReplayReferenceExample,
  sessionMemoryBindingExample,
  validateDomainMemoryDependencySnapshot,
  validateMemoryCacheValidityInput,
  validateMemoryEvaluationCase,
  validateMemoryReplayReference,
  validateSessionMemoryBinding,
  validateWorkflowStateMemoryBinding,
  workflowStateMemoryBindingExample,
} from './index';

describe('memory integration schemas', () => {
  it('validates reusable workflow and session memory bindings', () => {
    expect(validateWorkflowStateMemoryBinding(workflowStateMemoryBindingExample)).toEqual(
      workflowStateMemoryBindingExample
    );
    expect(validateSessionMemoryBinding(sessionMemoryBindingExample)).toEqual(
      sessionMemoryBindingExample
    );
  });

  it('rejects unknown workflow binding fields and incomplete profile references', () => {
    expect(() =>
      validateWorkflowStateMemoryBinding({
        ...workflowStateMemoryBindingExample,
        businessPrompt: 'must not enter a framework binding',
      })
    ).toThrow();
    expect(() =>
      validateWorkflowStateMemoryBinding({
        memoryAccessMode: 'read',
        memoryProfileRef: {},
      })
    ).toThrow();
  });

  it('validates deterministic domain dependency snapshots', () => {
    const snapshot = createDomainMemoryDependencySnapshot(
      {
        domainPackRef: { id: 'domain.example', version: '1.0.0' },
        memoryProfileRef: workflowStateMemoryBindingExample.memoryProfileRef,
        contextProfileRef: workflowStateMemoryBindingExample.contextProfileRef,
        providerRefs: [{ id: 'provider.memory.native', version: '1.0.0' }],
        policyRefs: [{ id: 'policy.memory.read', version: '1.0.0' }],
        scopeTemplate: { workspaceId: 'workspace:default' },
        capabilitySnapshot: { add: true, search: true },
        capabilitySnapshots: { 'provider.memory.native': { add: true, search: true } },
        stateBindings: [
          {
            stateId: 'Reasoning',
            binding: workflowStateMemoryBindingExample,
          },
        ],
      },
      '2026-07-17T00:00:00.000Z'
    );

    expect(validateDomainMemoryDependencySnapshot(snapshot)).toEqual(snapshot);
    expect(
      domainMemoryDependencySnapshotSchema.safeParse({ ...snapshot, createdAt: 'today' }).success
    ).toBe(false);
  });

  it('validates cache, replay and evaluation fixtures', () => {
    expect(validateMemoryCacheValidityInput(memoryCacheValidityInputExample)).toEqual(
      memoryCacheValidityInputExample
    );
    expect(validateMemoryReplayReference(memoryReplayReferenceExample)).toEqual(
      memoryReplayReferenceExample
    );
    expect(validateMemoryEvaluationCase(memoryEvaluationCaseExample)).toEqual(
      memoryEvaluationCaseExample
    );
  });

  it('rejects empty replay identifiers and non-finite evaluation metrics', () => {
    expect(() =>
      validateMemoryReplayReference({
        ...memoryReplayReferenceExample,
        eventIds: [''],
      })
    ).toThrow();
    expect(() =>
      validateMemoryEvaluationCase({
        ...memoryEvaluationCaseExample,
        metricIds: [],
      })
    ).toThrow();
  });
});
