import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  fencedRunLeaseDefinition,
  fencedRunLeaseExample,
  fencedRunLeaseJsonSchema,
  fencedRunLeaseSchema,
  runtimeResourceClaimDefinition,
  runtimeResourceClaimExample,
  runtimeResourceClaimJsonSchema,
  runtimeResourceClaimSchema,
  runLeaseAcquireRequestSchema,
  runLeaseGuardSchema,
  stateExecutionClaimDefinition,
  stateExecutionClaimExample,
  stateExecutionClaimJsonSchema,
  stateExecutionClaimSchema,
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

  it('keeps state and resource claim examples aligned across schema formats', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);

    expect(stateExecutionClaimSchema.parse(stateExecutionClaimExample)).toEqual(
      stateExecutionClaimExample
    );
    expect(ajv.validate(stateExecutionClaimJsonSchema, stateExecutionClaimExample)).toBe(true);
    expect(stateExecutionClaimDefinition.example).toEqual(stateExecutionClaimExample);

    expect(runtimeResourceClaimSchema.parse(runtimeResourceClaimExample)).toEqual(
      runtimeResourceClaimExample
    );
    expect(ajv.validate(runtimeResourceClaimJsonSchema, runtimeResourceClaimExample)).toBe(true);
    expect(runtimeResourceClaimDefinition.example).toEqual(runtimeResourceClaimExample);
  });

  it('requires terminal state claim timestamps and valid resource claim lifetimes', () => {
    expect(() =>
      stateExecutionClaimSchema.parse({
        ...stateExecutionClaimExample,
        status: 'completed',
      })
    ).toThrow();
    expect(() =>
      stateExecutionClaimSchema.parse({
        ...stateExecutionClaimExample,
        status: 'released',
      })
    ).toThrow();
    expect(() =>
      runtimeResourceClaimSchema.parse({
        ...runtimeResourceClaimExample,
        expiresAt: runtimeResourceClaimExample.acquiredAt,
      })
    ).toThrow();
  });
});
