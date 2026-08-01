import { describe, expect, it } from 'vitest';
import { createFrameworkEvent } from '../../events';
import {
  createWorkspaceFrameworkEvent,
  validateWorkspaceEventPayloadForType,
  validateWorkspaceFrameworkEvent,
  workspaceEventPayloadRequirements,
  workspaceEventJsonSchemas,
  workspaceFrameworkEventExample,
  workspaceFrameworkEventTypes,
} from './events';

describe('Workspace lifecycle Event contracts', () => {
  it('validates and exports the typed Workspace event fixture', () => {
    expect(validateWorkspaceFrameworkEvent(workspaceFrameworkEventExample)).toEqual(
      workspaceFrameworkEventExample
    );
    expect(workspaceFrameworkEventTypes).toHaveLength(19);
    expect(workspaceFrameworkEventTypes).toEqual(
      expect.arrayContaining([
        'workspace.create.requested',
        'workspace.snapshot.created',
        'workspace.cleanup.failed',
      ])
    );
    expect(Object.keys(workspaceEventJsonSchemas)).toEqual([
      'WorkspaceEventPayload',
      'WorkspaceFrameworkEvent',
    ]);
    expect(workspaceEventJsonSchemas.WorkspaceEventPayload).toBe(
      workspaceEventJsonSchemas.WorkspaceFrameworkEvent.properties?.payload
    );
    expect(workspaceEventJsonSchemas.WorkspaceFrameworkEvent.required).toContain('workspaceId');
    expect(Object.keys(workspaceEventPayloadRequirements)).toEqual(workspaceFrameworkEventTypes);
    expect(workspaceEventJsonSchemas.WorkspaceFrameworkEvent.allOf).toHaveLength(
      workspaceFrameworkEventTypes.length
    );
  });

  it('creates and validates a typed Workspace event', () => {
    const event = createWorkspaceFrameworkEvent({
      id: 'event.workspace.snapshot.created.example',
      type: 'workspace.snapshot.created',
      workspaceId: 'workspace.example',
      runId: 'run.example',
      timestamp: '2026-07-17T00:00:03.000Z',
      payload: {
        operationId: 'operation.workspace.snapshot.example',
        workspaceId: 'workspace.example',
        snapshotManifestHash: 'sha256:manifest',
        artifactRefs: ['artifact:snapshot'],
      },
    });
    expect(event.type).toBe('workspace.snapshot.created');
    expect(event.payload.snapshotManifestHash).toBe('sha256:manifest');
  });

  it('enforces event-specific minimum evidence', () => {
    expect(() =>
      validateWorkspaceEventPayloadForType('workspace.snapshot.created', {
        operationId: 'operation.snapshot',
        workspaceId: 'workspace.example',
        snapshotManifestHash: 'sha256:manifest',
        artifactRefs: [],
      })
    ).toThrow(/must contain snapshot or patch evidence/u);

    expect(() =>
      validateWorkspaceEventPayloadForType('workspace.path.denied', {
        operationId: 'operation.path',
        workspaceId: 'workspace.example',
      })
    ).toThrow(/error/u);

    expect(() =>
      validateWorkspaceEventPayloadForType('workspace.quota.exceeded', {
        operationId: 'operation.quota',
        workspaceId: 'workspace.example',
      })
    ).toThrow(/at least one of bytes, files/u);

    expect(() =>
      validateWorkspaceEventPayloadForType('workspace.ready', {
        operationId: 'operation.ready',
        workspaceId: 'workspace.example',
        status: 'busy',
      })
    ).toThrow(/must be ready/u);
  });

  it('keeps the generic Framework event factory compatible', () => {
    const event = createFrameworkEvent({
      id: 'event.workspace.ready.generic',
      type: 'workspace.ready',
      workspaceId: 'workspace.example',
      runId: 'run.example',
      timestamp: '2026-07-17T00:00:01.000Z',
      payload: { workspaceId: 'workspace.example', status: 'ready' },
    });
    expect(event.type).toBe('workspace.ready');
  });

  it('rejects an envelope and payload Workspace identity mismatch', () => {
    expect(() =>
      validateWorkspaceFrameworkEvent({
        ...workspaceFrameworkEventExample,
        workspaceId: 'workspace.one',
        payload: { ...workspaceFrameworkEventExample.payload, workspaceId: 'workspace.two' },
      })
    ).toThrow(/must match the event workspaceId/u);
  });

  it('rejects unknown event types and undeclared envelope fields', () => {
    expect(() =>
      validateWorkspaceFrameworkEvent({
        ...workspaceFrameworkEventExample,
        type: 'workspace.unknown',
      })
    ).toThrow();
    expect(() =>
      validateWorkspaceFrameworkEvent({
        ...workspaceFrameworkEventExample,
        rawResult: 'unbounded',
      })
    ).toThrow();
  });

  it('rejects sensitive envelope metadata and payload content', () => {
    expect(() =>
      validateWorkspaceFrameworkEvent({
        ...workspaceFrameworkEventExample,
        metadata: { rawOutput: 'unbounded output' },
      })
    ).toThrow(/sensitive or unbounded/u);
    expect(() =>
      validateWorkspaceEventPayloadForType('workspace.ready', {
        workspaceId: 'workspace.example',
        metadata: { secretValue: 'plaintext' },
      })
    ).toThrow(/sensitive or unbounded/u);
  });
});
