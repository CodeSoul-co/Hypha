import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { expectContractParity } from './contract-schema-parity';

describe('contract schema parity assertions', () => {
  it('accepts matching strict object constraints', () => {
    expectContractParity({
      name: 'MatchingContract',
      zod: z
        .object({
          mode: z.enum(['safe', 'fast']),
          attempts: z.number().int().min(1).max(3),
          label: z.string().min(1).max(20),
        })
        .strict(),
      json: {
        type: 'object',
        required: ['mode', 'attempts', 'label'],
        properties: {
          mode: { enum: ['safe', 'fast'] },
          attempts: { type: 'integer', minimum: 1, maximum: 3 },
          label: { type: 'string', minLength: 1, maxLength: 20 },
        },
        additionalProperties: false,
      },
    });
  });

  it('detects enum, numeric-bound, and unknown-field policy drift', () => {
    const base = {
      type: 'object',
      required: ['mode', 'attempts'],
      properties: {
        mode: { enum: ['safe', 'fast'] },
        attempts: { type: 'integer', minimum: 1, maximum: 3 },
      },
      additionalProperties: false,
    } as const;

    expect(() =>
      expectContractParity({
        name: 'EnumDrift',
        zod: z
          .object({ mode: z.enum(['safe', 'slow']), attempts: z.number().int().min(1).max(3) })
          .strict(),
        json: base,
      })
    ).toThrow();
    expect(() =>
      expectContractParity({
        name: 'BoundDrift',
        zod: z
          .object({ mode: z.enum(['safe', 'fast']), attempts: z.number().int().min(0).max(3) })
          .strict(),
        json: base,
      })
    ).toThrow();
    expect(() =>
      expectContractParity({
        name: 'StrictnessDrift',
        zod: z.object({ mode: z.enum(['safe', 'fast']), attempts: z.number().int().min(1).max(3) }),
        json: base,
      })
    ).toThrow();
  });
});
