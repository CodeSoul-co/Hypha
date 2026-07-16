import { describe, expect, it } from 'vitest';
import { createFrameworkEvent } from '../../events';
import { validateWorkspaceSpec, workspaceSpecExample, workspaceSpecJsonSchema } from './index';

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

  it('reserves workspace lifecycle events as framework events', () => {
    const event = createFrameworkEvent({
      id: 'event:workspace:created',
      type: 'workspace.created',
      runId: 'run:1',
      workspaceId: 'workspace:1',
      payload: { workspaceId: 'workspace:1', status: 'ready' },
    });
    expect(event.type).toBe('workspace.created');
    expect(event.workspaceId).toBe('workspace:1');
  });
});
