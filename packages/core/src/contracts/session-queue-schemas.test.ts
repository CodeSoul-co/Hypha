import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  cancelSessionCommandsRequestDefinition,
  cancelSessionCommandsRequestSchema,
  cancelSessionCommandsResultDefinition,
  cancelSessionCommandsResultSchema,
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
