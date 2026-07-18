import { describe, expect, it } from 'vitest';
import { createFrameworkEvent, type FrameworkEventType } from '../../events';
import {
  artifactEventJsonSchemas,
  artifactEventPayloadRequirements,
  artifactFrameworkEventExample,
  artifactFrameworkEventTypes,
  createArtifactFrameworkEvent,
  validateArtifactEventPayloadForType,
  validateArtifactFrameworkEvent,
} from './events';

describe('Artifact lifecycle Event contracts', () => {
  it('registers every Artifact event from the engineering specification', () => {
    expect(validateArtifactFrameworkEvent(artifactFrameworkEventExample)).toEqual(
      artifactFrameworkEventExample
    );
    expect(artifactFrameworkEventTypes).toHaveLength(18);
    expect(artifactFrameworkEventTypes).toEqual(
      expect.arrayContaining([
        'artifact.create.requested',
        'artifact.version.created',
        'artifact.delete.blocked',
        'artifact.gc.completed',
        'artifact.gc.failed',
      ])
    );
    expect(Object.keys(artifactEventPayloadRequirements)).toEqual(artifactFrameworkEventTypes);
    expect(artifactEventJsonSchemas.ArtifactEventPayload).toBe(
      artifactEventJsonSchemas.ArtifactFrameworkEvent.properties?.payload
    );
    expect(artifactEventJsonSchemas.ArtifactFrameworkEvent.allOf).toHaveLength(
      artifactFrameworkEventTypes.length
    );
  });

  it('creates typed lifecycle and GC events with bounded evidence', () => {
    const created = createArtifactFrameworkEvent({
      id: 'event.artifact.created',
      type: 'artifact.created',
      workspaceId: 'workspace.example',
      runId: 'run.example',
      timestamp: '2026-07-18T08:00:00.000Z',
      payload: {
        operationId: 'operation.create',
        artifactId: 'artifact.example',
        versionId: 'artifact.example:v1',
        logicalArtifactId: 'artifact.logical.example',
        workspaceId: 'workspace.example',
        contentHash: `sha256:${'a'.repeat(64)}`,
        status: 'draft',
      },
    });
    const collected = createArtifactFrameworkEvent({
      id: 'event.artifact.gc.completed',
      type: 'artifact.gc.completed',
      runId: 'run.maintenance',
      timestamp: '2026-07-18T08:01:00.000Z',
      payload: {
        operationId: 'operation.gc',
        candidateObjects: 2,
        deletedObjects: 1,
        missingObjects: 1,
        reclaimedBytes: 1024,
      },
    });
    expect(created.payload.status).toBe('draft');
    expect(collected.payload.reclaimedBytes).toBe(1024);
  });

  it('enforces event-specific status, error, deduplication, and lineage evidence', () => {
    expect(() =>
      validateArtifactEventPayloadForType('artifact.finalized', {
        operationId: 'operation.finalize',
        artifactId: 'artifact.example',
        versionId: 'artifact.example:v1',
        status: 'draft',
      })
    ).toThrow(/must be final/u);
    expect(() =>
      validateArtifactEventPayloadForType('artifact.deduplicated', {
        operationId: 'operation.deduplicate',
        artifactId: 'artifact.example',
        versionId: 'artifact.example:v1',
        contentHash: `sha256:${'b'.repeat(64)}`,
        deduplicated: false,
      })
    ).toThrow(/must be true/u);
    expect(() =>
      validateArtifactEventPayloadForType('artifact.delete.blocked', {
        operationId: 'operation.delete',
        artifactId: 'artifact.example',
        error: {
          code: 'ARTIFACT_PERMISSION_DENIED',
          message: 'denied',
          retryable: false,
        },
      })
    ).toThrow(/must match/u);
    expect(() =>
      validateArtifactEventPayloadForType('artifact.lineage.recorded', {
        artifactId: 'artifact.example',
        artifactRefs: [],
      })
    ).toThrow(/lineage evidence/u);
  });

  it('rejects identity drift, sensitive content, duplicates, and unknown fields', () => {
    expect(() =>
      validateArtifactFrameworkEvent({
        ...artifactFrameworkEventExample,
        workspaceId: 'workspace.one',
        payload: { ...artifactFrameworkEventExample.payload, workspaceId: 'workspace.two' },
      })
    ).toThrow(/must match the event workspaceId/u);
    expect(() =>
      validateArtifactFrameworkEvent({
        ...artifactFrameworkEventExample,
        metadata: { rawOutput: 'unbounded' },
      })
    ).toThrow(/sensitive or unbounded/u);
    expect(() =>
      validateArtifactEventPayloadForType('artifact.lineage.recorded', {
        artifactId: 'artifact.example',
        artifactRefs: ['artifact.source', 'artifact.source'],
      })
    ).toThrow(/duplicate Artifact references/u);
    expect(() =>
      validateArtifactFrameworkEvent({ ...artifactFrameworkEventExample, body: 'file bytes' })
    ).toThrow();
  });

  it('keeps the generic Framework event factory and legacy names compatible', () => {
    const eventTypes: FrameworkEventType[] = [
      'artifact.create.requested',
      'artifact.gc.failed',
      'artifact.updated',
      'artifact.versioned',
    ];
    const event = createFrameworkEvent({
      id: 'event.artifact.generic',
      type: eventTypes[0]!,
      runId: 'run.example',
      payload: { operationId: 'operation.example' },
    });
    expect(event.type).toBe('artifact.create.requested');
  });
});
