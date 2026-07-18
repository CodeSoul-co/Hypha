import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  sessionCommandRecordDefinition,
  sessionCommandRecordExample,
  sessionCommandRecordJsonSchema,
  sessionCommandRecordSchema,
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
});
