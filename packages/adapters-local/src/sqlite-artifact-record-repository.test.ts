import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  ArtifactRecordRepositoryConflictError,
  ArtifactRecordRepositoryError,
  artifactProfileSpecExample,
  artifactRecordExample,
  type StoredArtifactRecord,
} from '@hypha/core';
import { SQLiteArtifactRecordRepository } from './sqlite-artifact-record-repository';

const temporaryRoots: string[] = [];
const storedExample: StoredArtifactRecord = {
  record: artifactRecordExample,
  profileRef: {
    id: artifactProfileSpecExample.id,
    version: artifactProfileSpecExample.version,
  },
};

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map((root) => fs.rm(root, { recursive: true, force: true }))
  );
});

describe('SQLiteArtifactRecordRepository', () => {
  it('recovers Artifact records and idempotency results after restart', async () => {
    const root = await temporaryRoot();
    const first = new SQLiteArtifactRecordRepository({ rootPath: root });
    await first.commit({
      records: [storedExample],
      idempotency: {
        operationId: 'operation.create',
        idempotencyKey: 'request-1',
        artifactId: artifactRecordExample.id,
        versionId: artifactRecordExample.versionId,
      },
    });
    await first.close();

    const reopened = new SQLiteArtifactRecordRepository({ rootPath: root });
    await expect(reopened.get(artifactRecordExample.id)).resolves.toEqual(storedExample);
    await expect(reopened.getByVersionId(artifactRecordExample.versionId)).resolves.toEqual(
      storedExample
    );
    await expect(reopened.findIdempotency('operation.create', 'request-1')).resolves.toEqual(
      storedExample
    );
    await expect(reopened.health()).resolves.toMatchObject({
      status: 'healthy',
      details: { records: 1, idempotencyRecords: 1 },
    });
    await reopened.close();
  });

  it('commits a linked version update atomically behind a revision fence', async () => {
    const repository = new SQLiteArtifactRecordRepository({ rootPath: await temporaryRoot() });
    await repository.commit({ records: [storedExample] });
    const next = nextVersion();
    const previous = {
      ...storedExample,
      record: {
        ...artifactRecordExample,
        revision: 1,
        nextVersionId: next.record.versionId,
        updatedAt: '2026-07-18T00:00:02.000Z',
      },
    };

    await repository.commit({
      records: [previous, next],
      expectedLatest: {
        artifactId: artifactRecordExample.id,
        versionId: artifactRecordExample.versionId,
        revision: artifactRecordExample.revision,
      },
    });

    await expect(repository.get(artifactRecordExample.id)).resolves.toEqual(next);
    await expect(repository.list()).resolves.toEqual([previous, next]);
    await repository.close();
  });

  it('allows only one writer to pass the same latest revision fence', async () => {
    const root = await temporaryRoot();
    const first = new SQLiteArtifactRecordRepository({ rootPath: root });
    const second = new SQLiteArtifactRecordRepository({ rootPath: root });
    await first.commit({ records: [storedExample] });
    const fence = {
      artifactId: artifactRecordExample.id,
      versionId: artifactRecordExample.versionId,
      revision: artifactRecordExample.revision,
    };
    const firstUpdate: StoredArtifactRecord = {
      ...storedExample,
      record: {
        ...artifactRecordExample,
        revision: 1,
        name: 'first-writer.json',
        updatedAt: '2026-07-18T00:00:02.000Z',
      },
    };
    const secondUpdate: StoredArtifactRecord = {
      ...firstUpdate,
      record: { ...firstUpdate.record, name: 'second-writer.json' },
    };

    await first.commit({ records: [firstUpdate], expectedLatest: fence });
    await expect(
      second.commit({ records: [secondUpdate], expectedLatest: fence })
    ).rejects.toBeInstanceOf(ArtifactRecordRepositoryConflictError);
    await expect(second.get(artifactRecordExample.id)).resolves.toEqual(firstUpdate);
    await first.close();
    await second.close();
  });

  it('rolls back the entire transaction when idempotency targets are invalid', async () => {
    const repository = new SQLiteArtifactRecordRepository({ rootPath: await temporaryRoot() });
    await expect(
      repository.commit({
        records: [storedExample],
        idempotency: {
          operationId: 'operation.invalid',
          idempotencyKey: 'request-invalid',
          artifactId: artifactRecordExample.id,
          versionId: 'missing-version',
        },
      })
    ).rejects.toBeInstanceOf(ArtifactRecordRepositoryConflictError);
    await expect(repository.list()).resolves.toEqual([]);
    await repository.close();
  });

  it('reports persisted record corruption instead of returning unvalidated metadata', async () => {
    const root = await temporaryRoot();
    const repository = new SQLiteArtifactRecordRepository({ rootPath: root });
    await repository.commit({ records: [storedExample] });
    await repository.close();
    corruptRecordJson(path.join(root, 'artifact-records.sqlite'), artifactRecordExample.versionId);

    const reopened = new SQLiteArtifactRecordRepository({ rootPath: root });
    await expect(reopened.get(artifactRecordExample.id)).rejects.toMatchObject({
      code: 'ARTIFACT_RECORD_REPOSITORY_CORRUPT',
    });
    await reopened.close();
  });

  it('rejects unsafe filenames and operations after close', async () => {
    const root = await temporaryRoot();
    expect(
      () => new SQLiteArtifactRecordRepository({ rootPath: root, filename: '../outside.sqlite' })
    ).toThrow(/filename/u);
    const repository = new SQLiteArtifactRecordRepository({ rootPath: root });
    await repository.close();
    await expect(repository.get(artifactRecordExample.id)).rejects.toBeInstanceOf(
      ArtifactRecordRepositoryError
    );
    await expect(repository.health()).resolves.toMatchObject({ status: 'unhealthy' });
  });
});

function nextVersion(): StoredArtifactRecord {
  return {
    ...storedExample,
    record: {
      ...artifactRecordExample,
      versionId: 'artifact.example:v2:sha256-example',
      versionNumber: 2,
      revision: 1,
      previousVersionId: artifactRecordExample.versionId,
      parentVersionId: artifactRecordExample.versionId,
      createdAt: '2026-07-18T00:00:02.000Z',
      updatedAt: '2026-07-18T00:00:02.000Z',
    },
  };
}

async function temporaryRoot(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-artifact-records-'));
  temporaryRoots.push(root);
  return root;
}

function corruptRecordJson(filename: string, versionId: string): void {
  const database = openTestDatabase(filename);
  try {
    database
      .prepare('UPDATE artifact_records SET record_json = ? WHERE version_id = ?')
      .run('{invalid-json', versionId);
  } finally {
    database.close();
  }
}

function openTestDatabase(filename: string): {
  prepare(sql: string): { run(...params: unknown[]): unknown };
  close(): void;
} {
  try {
    const sqlite = require('node:sqlite') as {
      DatabaseSync: new (filename: string) => ReturnType<typeof openTestDatabase>;
    };
    return new sqlite.DatabaseSync(filename);
  } catch (nodeSQLiteError) {
    try {
      const BetterSQLite = require('better-sqlite3') as new (
        filename: string
      ) => ReturnType<typeof openTestDatabase>;
      return new BetterSQLite(filename);
    } catch (betterSQLiteError) {
      throw new AggregateError([nodeSQLiteError, betterSQLiteError]);
    }
  }
}
