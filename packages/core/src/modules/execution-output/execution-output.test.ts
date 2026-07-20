import { createHash } from 'node:crypto';
import Ajv from 'ajv';
import { describe, expect, it } from 'vitest';
import type { CommandExecutionResult } from '../../contracts/command-execution';
import { FrameworkError } from '../../errors';
import {
  classifyExecutionOutput,
  DefaultExecutionOutputPlanner,
  executionOutputCollectionPlanExample,
  executionOutputCollectionPlanJsonSchema,
  executionOutputCollectionPolicyExample,
  executionOutputCollectionPolicyJsonSchema,
  validateExecutionOutputCollectionPlan,
  validateExecutionOutputCollectionPolicy,
} from './index';

const planner = new DefaultExecutionOutputPlanner();

describe('Execution output boundary contracts', () => {
  it('keeps examples aligned across Zod and JSON Schema', () => {
    expect(validateExecutionOutputCollectionPolicy(executionOutputCollectionPolicyExample)).toEqual(
      executionOutputCollectionPolicyExample
    );
    expect(validateExecutionOutputCollectionPlan(executionOutputCollectionPlanExample)).toEqual(
      executionOutputCollectionPlanExample
    );

    const ajv = new Ajv({ strict: true, allErrors: true });
    expect(
      ajv.validate(
        executionOutputCollectionPolicyJsonSchema,
        executionOutputCollectionPolicyExample
      ),
      ajv.errorsText()
    ).toBe(true);
    expect(
      ajv.validate(executionOutputCollectionPlanJsonSchema, executionOutputCollectionPlanExample),
      ajv.errorsText()
    ).toBe(true);
  });

  it.each([
    '../outputs/**',
    '%2e%2e/outputs/**',
    'outputs/%2A.json',
    '/outputs/**',
    'C:/outputs/**',
    'outputs\\**',
    'outputs//**',
    'outputs/**.json',
    'outputs/[a].json',
    'outputs/{a,b}.json',
  ])('rejects unsafe or unsupported pattern %s', (pattern) => {
    expect(() => validateExecutionOutputCollectionPolicy({ includePatterns: [pattern] })).toThrow();
  });

  it.each([
    '../outputs/**',
    '%2e%2e/outputs/**',
    'outputs/%2A.json',
    '/outputs/**',
    'C:/outputs/**',
    'outputs\\**',
    'outputs/**.json',
  ])('rejects unsafe pattern %s at the JSON Schema boundary', (pattern) => {
    const ajv = new Ajv({ strict: true });
    expect(
      ajv.validate(executionOutputCollectionPolicyJsonSchema, { includePatterns: [pattern] })
    ).toBe(false);
  });

  it('rejects patterns duplicated after Unicode normalization', () => {
    expect(() =>
      validateExecutionOutputCollectionPolicy({ includePatterns: ['café/*', 'cafe\u0301/*'] })
    ).toThrow(/duplicates another pattern/u);
  });

  it('bounds pattern length and count', () => {
    expect(() =>
      validateExecutionOutputCollectionPolicy({ includePatterns: ['a'.repeat(513)] })
    ).toThrow();
    expect(() =>
      validateExecutionOutputCollectionPolicy({
        includePatterns: Array.from({ length: 65 }, (_, index) => `outputs/${index}.json`),
      })
    ).toThrow();
  });

  it('rejects duplicate collected paths and inconsistent byte totals', () => {
    const item = executionOutputCollectionPlanExample.items[0];
    expect(() =>
      validateExecutionOutputCollectionPlan({
        ...executionOutputCollectionPlanExample,
        items: [item, { ...item }],
        totalBytes: item.sizeBytes * 2,
      })
    ).toThrow(/must be unique/u);
    expect(() =>
      validateExecutionOutputCollectionPlan({
        ...executionOutputCollectionPlanExample,
        totalBytes: 99,
      })
    ).toThrow(/must equal the sum/u);
  });

  it('requires qualified content hashes in collection plans', () => {
    const invalid = {
      ...executionOutputCollectionPlanExample,
      items: [{ ...executionOutputCollectionPlanExample.items[0], contentHash: 'sha256:short' }],
    };

    expect(() => validateExecutionOutputCollectionPlan(invalid)).toThrow();
    const ajv = new Ajv({ strict: true });
    expect(ajv.validate(executionOutputCollectionPlanJsonSchema, invalid)).toBe(false);
  });

  it('rejects finalization for any non-success terminal status in both schemas', () => {
    const invalidPlan = {
      ...executionOutputCollectionPlanExample,
      status: 'failed',
      finalize: true,
    };
    expect(() => validateExecutionOutputCollectionPlan(invalidPlan)).toThrow(/only be true/u);
    const ajv = new Ajv({ strict: true });
    expect(ajv.validate(executionOutputCollectionPlanJsonSchema, invalidPlan)).toBe(false);
  });
});

describe('DefaultExecutionOutputPlanner', () => {
  it.each([
    ['outputs/report.pdf', 'document', 'application/pdf'],
    ['outputs/table.csv', 'table', 'text/csv'],
    ['outputs/tests.junit.xml', 'test_report', 'application/xml'],
    ['outputs/app.ts', 'code', 'text/typescript'],
    ['outputs/change.diff', 'patch', 'text/x-diff'],
    ['outputs/bundle.zip', 'archive', 'application/zip'],
    ['outputs/unknown.bin', 'other', undefined],
  ])('classifies %s as %s without exposing mutable shared state', (path, kind, mimeType) => {
    const first = classifyExecutionOutput(path);
    expect(first).toEqual({ kind, ...(mimeType ? { mimeType } : {}) });
    (first as { kind: string }).kind = 'log';
    expect(classifyExecutionOutput(path)).toEqual({
      kind,
      ...(mimeType ? { mimeType } : {}),
    });
  });

  it('applies include and exclude patterns, classifies files, and carries existing refs', () => {
    const result = completedResult({
      stdoutArtifactRef: 'artifact:shared',
      generatedArtifactRefs: ['artifact:shared', 'artifact:generated'],
      changedFiles: [
        mutation('notes/readme.md', 3),
        mutation('outputs/report.json', 12, 'artifact:report'),
        mutation('outputs/tmp/debug.log', 20),
      ],
    });

    const plan = planner.plan(result, {
      includePatterns: ['outputs/**'],
      excludePatterns: ['outputs/tmp/**'],
      classifyByExtension: true,
      finalizeOnSuccess: true,
    });

    expect(plan.items).toEqual([
      {
        relativePath: 'outputs/report.json',
        contentHash: outputHash('outputs/report.json'),
        sizeBytes: 12,
        kind: 'dataset',
        mimeType: 'application/json',
        existingArtifactRef: 'artifact:report',
      },
    ]);
    expect(plan.existingArtifactRefs).toEqual(['artifact:shared', 'artifact:generated']);
    expect(plan.totalBytes).toBe(12);
    expect(plan.finalize).toBe(true);
    expect(plan.skipped).toMatchObject({ not_included: 1, excluded: 1 });
  });

  it('collapses mutation history to each final path state', () => {
    const result = completedResult({
      changedFiles: [
        mutation('working/draft.txt', 5),
        {
          ...mutation('working/draft.txt', 5),
          operation: 'permission_changed',
        },
        {
          ...mutation('outputs/final.txt', 6),
          operation: 'renamed',
          oldPath: 'working/draft.txt',
        },
        mutation('outputs/deleted.txt', 7),
        {
          path: 'outputs/deleted.txt',
          operation: 'deleted',
          beforeHash: 'sha256:outputs/deleted.txt',
          beforeSizeBytes: 7,
          detectedAt: '2026-07-20T00:00:03.000Z',
        },
      ],
    });

    const plan = planner.plan(result, { classifyByExtension: true });

    expect(plan.items.map((item) => item.relativePath)).toEqual(['outputs/final.txt']);
    expect(plan.skipped.unsupported_mutation).toBe(1);
  });

  it('requires hash and size evidence before collection', () => {
    const result = completedResult({
      changedFiles: [
        {
          path: 'outputs/unknown.txt',
          operation: 'created',
          detectedAt: '2026-07-20T00:00:02.000Z',
        },
      ],
    });

    const plan = planner.plan(result, {});

    expect(plan.items).toEqual([]);
    expect(plan.skipped.missing_integrity_evidence).toBe(1);
  });

  it('applies count and byte limits in deterministic path order', () => {
    const result = completedResult({
      changedFiles: [
        mutation('outputs/c.txt', 1),
        mutation('outputs/a.txt', 4),
        mutation('outputs/b.txt', 7),
      ],
    });

    const byteLimited = planner.plan(result, { maxTotalBytes: 5 });
    expect(byteLimited.items.map((item) => item.relativePath)).toEqual([
      'outputs/a.txt',
      'outputs/c.txt',
    ]);
    expect(byteLimited.skipped.byte_limit).toBe(1);

    const countLimited = planner.plan(result, { maxArtifacts: 1 });
    expect(countLimited.items.map((item) => item.relativePath)).toEqual(['outputs/a.txt']);
    expect(countLimited.skipped.artifact_limit).toBe(2);
  });

  it('supports zero limits, empty files, question marks, and zero-or-more globstar segments', () => {
    const result = completedResult({
      changedFiles: [
        mutation('report.json', 0),
        mutation('outputs/a.json', 1),
        mutation('outputs/nested/b.json', 2),
        mutation('outputs/nested/long.json', 3),
      ],
    });

    expect(
      planner
        .plan(result, { includePatterns: ['**/?.json'] })
        .items.map((item) => item.relativePath)
    ).toEqual(['outputs/a.json', 'outputs/nested/b.json']);
    expect(
      planner.plan(result, { includePatterns: ['**/report.json'] }).items[0]?.relativePath
    ).toBe('report.json');
    expect(planner.plan(result, { maxArtifacts: 0 }).items).toEqual([]);
    expect(
      planner.plan(result, { maxTotalBytes: 0 }).items.map((item) => item.relativePath)
    ).toEqual(['report.json']);
  });

  it('does not finalize failed output collection', () => {
    const result = completedResult({
      status: 'failed',
      exitCode: 1,
      error: { code: 'EXECUTION_INTERNAL_ERROR', message: 'command failed', retryable: false },
    });

    expect(planner.plan(result, { finalizeOnSuccess: true }).finalize).toBe(false);
  });

  it('fails closed before the Execution reaches a terminal result', () => {
    const result = completedResult({ status: 'running', exitCode: null, completedAt: undefined });

    try {
      planner.plan(result, {});
      throw new Error('expected planner to reject a non-terminal result');
    } catch (error) {
      expect(error).toBeInstanceOf(FrameworkError);
      expect((error as FrameworkError).code).toBe('EXECUTION_INVALID_REQUEST');
    }
  });
});

function completedResult(overrides: Partial<CommandExecutionResult> = {}): CommandExecutionResult {
  return {
    executionId: 'execution.output.example',
    revision: 1,
    sandboxId: 'sandbox.example',
    status: 'completed',
    exitCode: 0,
    changedFiles: [],
    generatedArtifactRefs: [],
    startedAt: '2026-07-20T00:00:00.000Z',
    completedAt: '2026-07-20T00:00:04.000Z',
    ...overrides,
  };
}

function mutation(path: string, size: number, artifactRef?: string) {
  return {
    path,
    operation: 'created' as const,
    afterHash: outputHash(path),
    afterSizeBytes: size,
    ...(artifactRef ? { artifactRef } : {}),
    detectedAt: '2026-07-20T00:00:02.000Z',
  };
}

function outputHash(value: string): string {
  return `sha256:${createHash('sha256').update(value).digest('hex')}`;
}
