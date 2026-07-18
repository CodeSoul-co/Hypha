import { describe, expect, it } from 'vitest';
import {
  runtimeProjectionContractJsonSchemas,
  validateRuntimeOrchestrationProjection,
} from './runtime-projection-schemas';

describe('Runtime orchestration projection schema', () => {
  it('validates persisted projection state and exports JSON Schema', () => {
    expect(
      validateRuntimeOrchestrationProjection({
        runId: 'run.1',
        runStatus: 'running',
        currentState: 'Acting',
        statePath: ['Intake', 'Acting'],
        stateVisitCounts: { Intake: 1, Acting: 1 },
        stateAttempt: 1,
        pendingActivityIds: ['activity.1'],
      })
    ).toMatchObject({ currentState: 'Acting', stateAttempt: 1 });
    expect(runtimeProjectionContractJsonSchemas.RuntimeOrchestrationProjection).toMatchObject({
      type: 'object',
      required: expect.arrayContaining(['runId', 'runStatus', 'statePath']),
    });
  });

  it('rejects inconsistent state paths and attempts', () => {
    expect(() =>
      validateRuntimeOrchestrationProjection({
        runId: 'run.1',
        runStatus: 'running',
        currentState: 'Acting',
        statePath: ['Intake'],
        stateVisitCounts: { Intake: 1, Acting: 1 },
        stateAttempt: 2,
        pendingActivityIds: [],
      })
    ).toThrow(/currentState|stateAttempt/u);
  });

  it('requires terminal state and unique pending Activity IDs', () => {
    expect(() =>
      validateRuntimeOrchestrationProjection({
        runId: 'run.1',
        runStatus: 'completed',
        currentState: 'Completed',
        statePath: ['Completed'],
        stateVisitCounts: { Completed: 1 },
        stateAttempt: 1,
        pendingActivityIds: [],
      })
    ).toThrow(/terminalState/u);
    expect(() =>
      validateRuntimeOrchestrationProjection({
        runId: 'run.1',
        runStatus: 'running',
        statePath: [],
        stateVisitCounts: {},
        stateAttempt: 0,
        pendingActivityIds: ['activity.1', 'activity.1'],
      })
    ).toThrow(/unique/u);
  });
});
