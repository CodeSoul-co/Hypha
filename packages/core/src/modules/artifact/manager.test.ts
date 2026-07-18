import { describe, expect, it } from 'vitest';
import {
  artifactCreateRequestExample,
  artifactCreateDownloadAccessRequestExample,
  artifactFromWorkspaceRequestExample,
  artifactVersionRequestExample,
  validateArtifactCreateRequest,
  validateArtifactCreateDownloadAccessRequest,
  validateArtifactFromWorkspaceRequest,
  validateArtifactListRequest,
  validateArtifactMutationRequest,
  validateArtifactVersionRequest,
  validateNormalizedArtifactError,
} from './manager';

describe('ArtifactManager contracts', () => {
  it('validates create, collect, and version examples', () => {
    expect(validateArtifactCreateRequest(artifactCreateRequestExample)).toEqual(
      artifactCreateRequestExample
    );
    expect(validateArtifactFromWorkspaceRequest(artifactFromWorkspaceRequestExample)).toEqual(
      artifactFromWorkspaceRequestExample
    );
    expect(validateArtifactVersionRequest(artifactVersionRequestExample)).toEqual(
      artifactVersionRequestExample
    );
    expect(
      validateArtifactCreateDownloadAccessRequest(artifactCreateDownloadAccessRequestExample)
    ).toEqual(artifactCreateDownloadAccessRequestExample);
  });

  it.each(['../report.json', 'nested/report.json', 'report\r\nmalicious.txt'])(
    'rejects unsafe download filename %s',
    (responseFilename) => {
      expect(() =>
        validateArtifactCreateDownloadAccessRequest({
          ...artifactCreateDownloadAccessRequestExample,
          responseFilename,
        })
      ).toThrow();
    }
  );

  it('binds caller identity and access scope to the requested owner', () => {
    expect(() =>
      validateArtifactCreateRequest({ ...artifactCreateRequestExample, userId: 'user.other' })
    ).toThrow(/userId/u);
    expect(() =>
      validateArtifactCreateRequest({
        ...artifactCreateRequestExample,
        access: { ...artifactCreateRequestExample.access, workspaceId: 'workspace.other' },
      })
    ).toThrow(/workspaceId/u);
  });

  it.each(['/host/report.json', 'C:\\host\\report.json', '../report.json'])(
    'rejects unsafe Workspace source path %s',
    (relativePath) => {
      expect(() =>
        validateArtifactFromWorkspaceRequest({
          ...artifactFromWorkspaceRequestExample,
          relativePath,
        })
      ).toThrow();
    }
  );

  it('requires revision fencing for mutations and rejects duplicate filters', () => {
    expect(() =>
      validateArtifactMutationRequest({
        operationId: 'operation.artifact.finalize.example',
        principal: artifactCreateRequestExample.principal,
        artifactId: 'artifact.example',
        expectedRevision: -1,
      })
    ).toThrow();
    expect(() =>
      validateArtifactListRequest({
        principal: artifactCreateRequestExample.principal,
        workspaceId: 'workspace.example',
        kinds: ['report', 'report'],
      })
    ).toThrow(/duplicate/u);
  });

  it('normalizes Artifact failures without embedding content', () => {
    expect(
      validateNormalizedArtifactError({
        code: 'ARTIFACT_HASH_MISMATCH',
        message: 'persisted bytes did not match the expected digest',
        retryable: false,
        causeRef: 'store-error:hash-mismatch',
      })
    ).toMatchObject({ code: 'ARTIFACT_HASH_MISMATCH', retryable: false });
  });
});
