import { describe, expect, it } from 'vitest';
import {
  validateWorkspaceEventPayload,
  validateWorkspaceRecord,
  validateWorkspaceSpec,
  workspaceEventPayloadExample,
  workspaceEventPayloadJsonSchema,
  workspaceRecordExample,
  workspaceRecordJsonSchema,
  workspaceRecordJsonSchemas,
  workspaceSpecExample,
  workspaceSpecJsonSchema,
} from './index';

describe('WorkspaceSpec', () => {
  it('validates and exports the example contract', () => {
    expect(validateWorkspaceSpec(workspaceSpecExample)).toEqual(workspaceSpecExample);
    expect(workspaceSpecJsonSchema.required).toEqual(
      expect.arrayContaining(['directories', 'pathPolicy', 'quota', 'cleanup', 'snapshot'])
    );
    expect(workspaceSpecJsonSchema.allOf).toHaveLength(3);
    expect(workspaceSpecJsonSchema.properties?.directories.properties?.working.pattern).toBe(
      '^(?![\\\\/])(?![A-Za-z]:[\\\\/])(?!.*(?:^|[\\\\/])\\.\\.(?:[\\\\/]|$)).+$'
    );
  });

  it.each([
    '/host/root',
    '\\host\\root',
    '%5chost%5croot',
    'C:\\host\\root',
    '..\\outside',
    'working/../../outside',
  ])('rejects unsafe workspace path %s', (working) => {
    expect(() =>
      validateWorkspaceSpec({
        ...workspaceSpecExample,
        directories: { ...workspaceSpecExample.directories, working },
      })
    ).toThrow();
  });

  it('requires provided roots and rejects roots for managed workspaces', () => {
    expect(() =>
      validateWorkspaceSpec({
        ...workspaceSpecExample,
        rootPolicy: 'provided_ref',
      })
    ).toThrow(/rootRef/u);

    expect(() =>
      validateWorkspaceSpec({
        ...workspaceSpecExample,
        rootPolicy: 'managed',
        rootRef: 'workspace-root-ref',
      })
    ).toThrow(/rootRef/u);
  });

  it('requires positive limits and a ttl for after_ttl cleanup', () => {
    expect(() =>
      validateWorkspaceSpec({
        ...workspaceSpecExample,
        quota: { maxFiles: 0 },
      })
    ).toThrow();

    expect(() =>
      validateWorkspaceSpec({
        ...workspaceSpecExample,
        cleanup: { mode: 'after_ttl' },
      })
    ).toThrow(/ttlSeconds/u);
  });

  it('rejects extensions that are both allowed and denied', () => {
    expect(() =>
      validateWorkspaceSpec({
        ...workspaceSpecExample,
        pathPolicy: {
          ...workspaceSpecExample.pathPolicy,
          allowedExtensions: ['.TS'],
          deniedExtensions: ['ts'],
        },
      })
    ).toThrow(/both allowed and denied/u);
  });

  it('keeps path-policy deny precedence while rejecting ambiguous list entries', () => {
    expect(
      validateWorkspaceSpec({
        ...workspaceSpecExample,
        pathPolicy: {
          ...workspaceSpecExample.pathPolicy,
          writablePaths: ['working'],
          deniedPaths: ['working/private'],
        },
      }).pathPolicy.deniedPaths
    ).toEqual(['working/private']);

    expect(() =>
      validateWorkspaceSpec({
        ...workspaceSpecExample,
        pathPolicy: {
          ...workspaceSpecExample.pathPolicy,
          caseSensitivity: 'insensitive',
          writablePaths: ['Working/Output', 'working\\output/'],
        },
      })
    ).toThrow(/duplicates another path/u);
  });

  it('requires symlink permission before following symlinks for reads', () => {
    expect(() =>
      validateWorkspaceSpec({
        ...workspaceSpecExample,
        pathPolicy: {
          ...workspaceSpecExample.pathPolicy,
          allowSymlinks: false,
          followSymlinksForRead: true,
        },
      })
    ).toThrow(/requires allowSymlinks/u);

    const pathPolicyJsonSchema = workspaceSpecJsonSchema.properties?.pathPolicy;
    expect(pathPolicyJsonSchema?.allOf).toHaveLength(1);
    expect(pathPolicyJsonSchema?.properties?.deniedPaths.description).toMatch(
      /cannot be overridden/u
    );
  });

  it('rejects undeclared WorkspaceSpec fields at every contract boundary', () => {
    expect(() => validateWorkspaceSpec({ ...workspaceSpecExample, unexpected: true })).toThrow();
    expect(() =>
      validateWorkspaceSpec({
        ...workspaceSpecExample,
        quota: { ...workspaceSpecExample.quota, unexpected: true },
      })
    ).toThrow();
  });
});

describe('WorkspaceRecord', () => {
  it('validates and exports the example contract', () => {
    expect(validateWorkspaceRecord(workspaceRecordExample)).toEqual(workspaceRecordExample);
    expect(workspaceRecordJsonSchema.required).toEqual(
      expect.arrayContaining([
        'id',
        'revision',
        'userId',
        'profileRef',
        'status',
        'quota',
        'usage',
        'activeExecutionIds',
        'createdAt',
        'updatedAt',
      ])
    );
    expect(workspaceRecordJsonSchema.additionalProperties).toBe(false);
    expect(workspaceRecordJsonSchema.allOf).toHaveLength(4);
    expect(workspaceRecordJsonSchema.properties?.profileRef.properties?.revision).toEqual({
      type: 'string',
      minLength: 1,
    });
    expect(workspaceRecordJsonSchemas.WorkspaceRecord).toBe(workspaceRecordJsonSchema);
  });

  it('retains SpecRef revisions and rejects undeclared record fields', () => {
    expect(
      validateWorkspaceRecord({
        ...workspaceRecordExample,
        profileRef: { ...workspaceRecordExample.profileRef, revision: 'sha256:profile' },
      }).profileRef.revision
    ).toBe('sha256:profile');
    expect(() =>
      validateWorkspaceRecord({ ...workspaceRecordExample, unexpected: true })
    ).toThrow();
  });

  it.each([
    {
      name: 'duplicate active executions',
      record: { ...workspaceRecordExample, activeExecutionIds: ['exec:1', 'exec:1'] },
    },
    {
      name: 'ready without readyAt',
      record: { ...workspaceRecordExample, readyAt: undefined },
    },
    {
      name: 'busy without an active execution',
      record: { ...workspaceRecordExample, status: 'busy' as const, activeExecutionIds: [] },
    },
    {
      name: 'cleaned without cleanedAt',
      record: { ...workspaceRecordExample, status: 'cleaned' as const, readyAt: undefined },
    },
    {
      name: 'cleaned with an active execution',
      record: {
        ...workspaceRecordExample,
        status: 'cleaned' as const,
        cleanedAt: workspaceRecordExample.updatedAt,
        activeExecutionIds: ['exec:1'],
      },
    },
    {
      name: 'failed without an error',
      record: { ...workspaceRecordExample, status: 'failed' as const, readyAt: undefined },
    },
    {
      name: 'updated before creation',
      record: {
        ...workspaceRecordExample,
        updatedAt: '2026-07-16T23:59:59.000Z',
      },
    },
  ])('rejects $name', ({ record }) => {
    expect(() => validateWorkspaceRecord(record)).toThrow();
  });
});

describe('WorkspaceEventPayload', () => {
  it('validates and exports the example contract', () => {
    expect(validateWorkspaceEventPayload(workspaceEventPayloadExample)).toEqual(
      workspaceEventPayloadExample
    );
    expect(workspaceEventPayloadJsonSchema.required).toEqual(['workspaceId']);
    expect(workspaceEventPayloadJsonSchema.additionalProperties).toBe(false);
  });

  it.each([
    {
      name: 'unknown top-level field',
      payload: { ...workspaceEventPayloadExample, rawResult: 'unbounded' },
    },
    {
      name: 'duplicate artifact references',
      payload: {
        ...workspaceEventPayloadExample,
        artifactRefs: ['artifact:1', 'artifact:1'],
      },
    },
    {
      name: 'negative usage',
      payload: { ...workspaceEventPayloadExample, bytes: -1 },
    },
    {
      name: 'secret metadata',
      payload: {
        ...workspaceEventPayloadExample,
        metadata: { secretValue: 'plaintext' },
      },
    },
    {
      name: 'file content in error details',
      payload: {
        ...workspaceEventPayloadExample,
        error: {
          code: 'WORKSPACE_OPERATION_FAILED',
          message: 'Workspace operation failed',
          retryable: false,
          details: { fileContent: 'raw data' },
        },
      },
    },
  ])('rejects $name', ({ payload }) => {
    expect(() => validateWorkspaceEventPayload(payload)).toThrow();
  });
});
