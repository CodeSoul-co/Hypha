import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  fencedRunLeaseDefinition,
  fencedRunLeaseExample,
  fencedRunLeaseJsonSchema,
  fencedRunLeaseSchema,
  runLeaseAcquireRequestSchema,
  runLeaseGuardSchema,
} from './runtime-coordination-schemas';

describe('Runtime coordination contracts', () => {
  it('keeps the fenced lease example aligned across TypeScript, Zod, and JSON Schema', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);

    expect(fencedRunLeaseSchema.parse(fencedRunLeaseExample)).toEqual(fencedRunLeaseExample);
    expect(ajv.validate(fencedRunLeaseJsonSchema, fencedRunLeaseExample)).toBe(true);
    expect(fencedRunLeaseDefinition.example).toEqual(fencedRunLeaseExample);
  });

  it('rejects unknown fields, invalid guards, and inconsistent lease timestamps', () => {
    expect(() => fencedRunLeaseSchema.parse({ ...fencedRunLeaseExample, hidden: true })).toThrow();
    expect(() =>
      runLeaseGuardSchema.parse({ leaseId: 'lease.1', ownerId: 'worker.1', fencingToken: 0 })
    ).toThrow();
    expect(() =>
      fencedRunLeaseSchema.parse({
        ...fencedRunLeaseExample,
        expiresAt: fencedRunLeaseExample.heartbeatAt,
      })
    ).toThrow();
    expect(() =>
      runLeaseAcquireRequestSchema.parse({
        userId: 'user.example',
        runId: 'run.example',
        partitionKey: 'run:example',
        requestedLeaseId: 'lease.1',
        ownerId: 'worker.1',
        ttlMs: 0,
        acquiredAt: 'not-a-timestamp',
        idempotencyKey: 'acquire.1',
      })
    ).toThrow();
  });
});
