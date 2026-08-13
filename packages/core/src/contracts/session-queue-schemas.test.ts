import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  cancelSessionCommandsRequestDefinition,
  cancelSessionCommandsRequestSchema,
  cancelSessionCommandsResultDefinition,
  cancelSessionCommandsResultSchema,
  closeDeadLetterSessionCommandRequestDefinition,
  closeDeadLetterSessionCommandRequestSchema,
  redriveDeadLetterSessionCommandRequestDefinition,
  redriveDeadLetterSessionCommandRequestSchema,
  sessionQueueContractJsonSchemas,
  sessionCommandRecordDefinition,
  sessionCommandRecordExample,
  sessionCommandRecordJsonSchema,
  sessionCommandRecordSchema,
  sessionQueueHealthSnapshotDefinition,
  sessionQueueHealthSnapshotSchema,
} from './session-queue-schemas';

describe('Session Queue contracts', () => {
  it('keeps the persisted command example aligned across TypeScript, Zod, and JSON Schema', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    expect(sessionCommandRecordSchema.parse(sessionCommandRecordExample)).toEqual(
      sessionCommandRecordExample
    );
    expect(ajv.validate(sessionCommandRecordJsonSchema, sessionCommandRecordExample)).toBe(true);
    expect(sessionCommandRecordDefinition.example).toEqual(sessionCommandRecordExample);
  });

  it('rejects unknown fields, invalid hashes, and invalid queue state', () => {
    expect(() =>
      sessionCommandRecordSchema.parse({ ...sessionCommandRecordExample, currentState: 'Running' })
    ).toThrow();
    expect(() =>
      sessionCommandRecordSchema.parse({ ...sessionCommandRecordExample, payloadHash: 'wrong' })
    ).toThrow();
    expect(() =>
      sessionCommandRecordSchema.parse({ ...sessionCommandRecordExample, status: 'processing' })
    ).toThrow();
    expect(() =>
      sessionCommandRecordSchema.parse({ ...sessionCommandRecordExample, status: 'claimed' })
    ).toThrow(/claimedBy/u);
  });

  it('accepts bounded lease recovery evidence without exposing claim credentials', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    const recovered = {
      ...sessionCommandRecordExample,
      attempts: 1,
      leaseEpoch: 1,
      leaseRecoveries: [
        {
          version: '1.0.0' as const,
          previousWorkerId: 'worker.expired',
          previousLeaseEpoch: 1,
          leaseExpiredAt: '2026-07-18T05:00:01.000Z',
          recoveredAt: '2026-07-18T05:00:02.000Z',
          disposition: 'requeued' as const,
        },
      ],
    };
    expect(sessionCommandRecordSchema.parse(recovered)).toEqual(recovered);
    expect(ajv.validate(sessionCommandRecordJsonSchema, recovered)).toBe(true);
    expect(() =>
      sessionCommandRecordSchema.parse({
        ...recovered,
        leaseRecoveries: [{ ...recovered.leaseRecoveries[0], claimToken: 'secret' }],
      })
    ).toThrow();
    expect(
      ajv.validate(sessionCommandRecordJsonSchema, {
        ...recovered,
        leaseRecoveries: [{ ...recovered.leaseRecoveries[0], claimToken: 'secret' }],
      })
    ).toBe(false);
    expect(() =>
      sessionCommandRecordSchema.parse({
        ...recovered,
        leaseRecoveries: [{ ...recovered.leaseRecoveries[0], previousLeaseEpoch: 2 }],
      })
    ).toThrow(/lease epoch/u);
  });

  it('exports strict, versioned Run-scoped cancellation request and result contracts', () => {
    expect(
      cancelSessionCommandsRequestSchema.parse(cancelSessionCommandsRequestDefinition.example)
    ).toEqual(cancelSessionCommandsRequestDefinition.example);
    expect(
      cancelSessionCommandsResultSchema.parse(cancelSessionCommandsResultDefinition.example)
    ).toEqual(cancelSessionCommandsResultDefinition.example);
    expect(sessionQueueContractJsonSchemas).toHaveProperty('CancelSessionCommandsRequest');
    expect(sessionQueueContractJsonSchemas).toHaveProperty('CancelSessionCommandsResult');
    expect(() =>
      cancelSessionCommandsRequestSchema.parse({
        ...cancelSessionCommandsRequestDefinition.example,
        targetRunId: '',
      })
    ).toThrow();
    expect(() =>
      cancelSessionCommandsRequestSchema.parse({
        ...cancelSessionCommandsRequestDefinition.example,
        scope: { userId: 'user.example', sessionId: 'session.example', runId: 'run.leaked' },
      })
    ).toThrow();
  });

  it('exports strict, versioned dead-letter redrive and close contracts', () => {
    expect(
      redriveDeadLetterSessionCommandRequestSchema.parse(
        redriveDeadLetterSessionCommandRequestDefinition.example
      )
    ).toEqual(redriveDeadLetterSessionCommandRequestDefinition.example);
    expect(
      closeDeadLetterSessionCommandRequestSchema.parse(
        closeDeadLetterSessionCommandRequestDefinition.example
      )
    ).toEqual(closeDeadLetterSessionCommandRequestDefinition.example);
    expect(sessionQueueContractJsonSchemas).toHaveProperty(
      'RedriveDeadLetterSessionCommandRequest'
    );
    expect(sessionQueueContractJsonSchemas).toHaveProperty('CloseDeadLetterSessionCommandRequest');
    expect(() =>
      closeDeadLetterSessionCommandRequestSchema.parse({
        ...closeDeadLetterSessionCommandRequestDefinition.example,
        reason: '',
      })
    ).toThrow();
  });

  it('exports a strict, internally consistent Session Queue health snapshot', () => {
    expect(
      sessionQueueHealthSnapshotSchema.parse(sessionQueueHealthSnapshotDefinition.example)
    ).toEqual(sessionQueueHealthSnapshotDefinition.example);
    expect(sessionQueueContractJsonSchemas).toHaveProperty('SessionQueueHealthSnapshot');
    expect(() =>
      sessionQueueHealthSnapshotSchema.parse({
        ...sessionQueueHealthSnapshotDefinition.example,
        pendingCommands: 3,
      })
    ).toThrow(/pendingCommands/u);
    expect(() =>
      sessionQueueHealthSnapshotSchema.parse({
        ...sessionQueueHealthSnapshotDefinition.example,
        pendingCommands: 0,
        queuedCommands: 0,
        claimedCommands: 0,
      })
    ).toThrow(/oldestPendingAgeMs/u);
  });
});
