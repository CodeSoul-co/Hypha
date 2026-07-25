import { describe, expect, it } from 'vitest';
import { artifactProfileSpecExample, artifactRecordExample } from '@hypha/core';
import { ArtifactRecordRepositoryConflictError, type StoredArtifactRecord } from '@hypha/core';
import { InMemoryArtifactRecordRepository } from './in-memory-artifact-record-repository';

const storedExample: StoredArtifactRecord = {
  record: artifactRecordExample,
  profileRef: {
    id: artifactProfileSpecExample.id,
    version: artifactProfileSpecExample.version,
  },
};

describe('InMemoryArtifactRecordRepository', () => {
  it('persists metadata without retaining mutable caller references', async () => {
    const repository = new InMemoryArtifactRecordRepository();
    await repository.commit({ records: [storedExample] });

    const fetched = await repository.get(artifactRecordExample.id);
    expect(fetched).toEqual(storedExample);
    fetched!.record.name = 'mutated.json';

    await expect(repository.get(artifactRecordExample.id)).resolves.toEqual(storedExample);
    await expect(repository.health()).resolves.toMatchObject({
      status: 'healthy',
      details: { records: 1 },
    });
  });

  it('returns the highest logical version and supports direct version lookup', async () => {
    const repository = new InMemoryArtifactRecordRepository();
    const next: StoredArtifactRecord = {
      ...storedExample,
      record: {
        ...artifactRecordExample,
        versionId: 'artifact.example:v2:sha256-example',
        versionNumber: 2,
        revision: 1,
        previousVersionId: artifactRecordExample.versionId,
      },
    };
    await repository.commit({ records: [next, storedExample] });

    await expect(repository.get(artifactRecordExample.id)).resolves.toEqual(next);
    await expect(repository.getByVersionId(artifactRecordExample.versionId)).resolves.toEqual(
      storedExample
    );
  });

  it('atomically enforces latest-version revision fencing', async () => {
    const repository = new InMemoryArtifactRecordRepository();
    await repository.commit({ records: [storedExample] });

    await expect(
      repository.commit({
        records: [
          {
            ...storedExample,
            record: { ...artifactRecordExample, name: 'must-not-persist.json' },
          },
        ],
        expectedLatest: {
          artifactId: artifactRecordExample.id,
          versionId: artifactRecordExample.versionId,
          revision: 99,
        },
      })
    ).rejects.toBeInstanceOf(ArtifactRecordRepositoryConflictError);
    await expect(repository.get(artifactRecordExample.id)).resolves.toEqual(storedExample);
  });

  it('binds an idempotency key to exactly one committed result', async () => {
    const repository = new InMemoryArtifactRecordRepository();
    const idempotency = {
      operationId: 'operation.create',
      idempotencyKey: 'request-1',
      artifactId: artifactRecordExample.id,
      versionId: artifactRecordExample.versionId,
    };
    await repository.commit({ records: [storedExample], idempotency });

    await expect(repository.findIdempotency('operation.create', 'request-1')).resolves.toEqual(
      storedExample
    );
    await expect(
      repository.commit({
        records: [storedExample],
        idempotency: { ...idempotency, versionId: 'artifact.example:v2' },
      })
    ).rejects.toBeInstanceOf(ArtifactRecordRepositoryConflictError);
  });
});
