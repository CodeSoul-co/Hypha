import { describe, expect, it } from 'vitest';
import {
  artifactContractJsonSchemas,
  artifactLineageExample,
  artifactProfileSpecExample,
  artifactRecordExample,
  artifactRefExample,
  validateArtifactLineage,
  validateArtifactProfileSpec,
  validateArtifactRecord,
  validateArtifactRef,
} from './index';

describe('ArtifactProfileSpec', () => {
  it('validates the safe example and exports its JSON Schema', () => {
    expect(validateArtifactProfileSpec(artifactProfileSpecExample)).toEqual(
      artifactProfileSpecExample
    );
    expect(artifactContractJsonSchemas.ArtifactProfileSpec.required).toEqual(
      expect.arrayContaining(['contentAddressing', 'versioning', 'access', 'retention'])
    );
  });

  it('rejects ambiguous versioning, invalid retention, and duplicate policy values', () => {
    expect(() =>
      validateArtifactProfileSpec({
        ...artifactProfileSpecExample,
        versioning: { strategy: 'append_only', retainPreviousVersions: false },
      })
    ).toThrow(/retainPreviousVersions/u);
    expect(() =>
      validateArtifactProfileSpec({
        ...artifactProfileSpecExample,
        versioning: { strategy: 'replace_latest', retainPreviousVersions: true },
      })
    ).toThrow(/strategy/u);
    expect(() =>
      validateArtifactProfileSpec({
        ...artifactProfileSpecExample,
        retention: { archiveAfterSeconds: 100, deleteAfterSeconds: 100 },
      })
    ).toThrow(/deleteAfterSeconds/u);
    expect(() =>
      validateArtifactProfileSpec({
        ...artifactProfileSpecExample,
        allowedMimeTypes: ['application/json', 'APPLICATION/JSON'],
      })
    ).toThrow(/duplicate/u);
  });

  it('rejects undeclared fields at nested public boundaries', () => {
    expect(() =>
      validateArtifactProfileSpec({ ...artifactProfileSpecExample, unexpected: true })
    ).toThrow();
    expect(() =>
      validateArtifactProfileSpec({
        ...artifactProfileSpecExample,
        access: { ...artifactProfileSpecExample.access, unexpected: true },
      })
    ).toThrow();
  });
});

describe('ArtifactRecord and ArtifactRef', () => {
  it('validates examples without embedding content bytes', () => {
    expect(validateArtifactRecord(artifactRecordExample)).toEqual(artifactRecordExample);
    expect(validateArtifactRef(artifactRefExample)).toEqual(artifactRefExample);
    expect(JSON.stringify(artifactContractJsonSchemas)).not.toContain('contentBytes');
    expect(JSON.stringify(artifactContractJsonSchemas)).not.toContain('hostPath');
  });

  it('requires an algorithm-qualified digest that matches hashAlgorithm', () => {
    expect(() =>
      validateArtifactRecord({ ...artifactRecordExample, contentHash: 'not-a-digest' })
    ).toThrow();
    expect(() =>
      validateArtifactRecord({ ...artifactRecordExample, hashAlgorithm: 'blake3' })
    ).toThrow(/hashAlgorithm/u);
    expect(() =>
      validateArtifactRef({ ...artifactRefExample, contentHash: 'a'.repeat(64) })
    ).toThrow();
  });

  it('enforces workspace access scope and lifecycle evidence', () => {
    expect(() =>
      validateArtifactRecord({
        ...artifactRecordExample,
        access: { ...artifactRecordExample.access, workspaceId: 'workspace.other' },
      })
    ).toThrow(/workspaceId/u);
    expect(() =>
      validateArtifactRecord({ ...artifactRecordExample, finalizedAt: undefined })
    ).toThrow(/finalizedAt/u);
    expect(() =>
      validateArtifactRecord({
        ...artifactRecordExample,
        status: 'deleted',
        finalizedAt: undefined,
      })
    ).toThrow(/deletedAt/u);
  });

  it('requires derived provenance to identify source Artifacts', () => {
    expect(() =>
      validateArtifactRecord({
        ...artifactRecordExample,
        provenance: {
          sourceType: 'derived',
          createdBy: 'agent.example',
        },
      })
    ).toThrow(/sourceArtifactIds/u);
  });
});

describe('ArtifactLineage', () => {
  it('validates the example and rejects duplicate logical versions', () => {
    expect(validateArtifactLineage(artifactLineageExample)).toEqual(artifactLineageExample);
    expect(() =>
      validateArtifactLineage({
        ...artifactLineageExample,
        versions: [artifactRecordExample, artifactRecordExample],
      })
    ).toThrow(/duplicate version IDs/u);
  });
});
