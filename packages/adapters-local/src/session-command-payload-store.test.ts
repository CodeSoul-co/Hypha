import { afterEach, describe, expect, it } from 'vitest';
import { ArtifactSessionCommandPayloadStore } from '@hypha/core';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { LocalFilesystemExecutionArtifactStore } from './local-filesystem-execution-artifact-store';

describe('ArtifactSessionCommandPayloadStore', () => {
  const artifacts: LocalFilesystemExecutionArtifactStore[] = [];

  afterEach(async () => {
    while (artifacts.length > 0) await artifacts.pop()?.close();
  });

  it('restores canonical command payloads from a durable Artifact after restart', async () => {
    const rootPath = temporaryRoot();
    const firstArtifacts = openArtifacts(rootPath);
    const first = new ArtifactSessionCommandPayloadStore({ artifacts: firstArtifacts });
    const reference = await first.put({
      commandId: 'command.start.1',
      payload: { input: { topic: 'runtime' }, priority: 7 },
    });
    await firstArtifacts.close();
    artifacts.splice(artifacts.indexOf(firstArtifacts), 1);

    const reopenedArtifacts = openArtifacts(rootPath);
    const reopened = new ArtifactSessionCommandPayloadStore({ artifacts: reopenedArtifacts });
    await expect(reopened.get(reference)).resolves.toEqual({
      input: { topic: 'runtime' },
      priority: 7,
    });
    expect(reference).toMatchObject({
      payloadRef: expect.stringMatching(/^artifact-ref:/u),
      payloadHash: expect.stringMatching(/^sha256:[a-f0-9]{64}$/u),
    });
  });

  it('rejects payload bytes changed after the Queue reference was created', async () => {
    const artifactStore = openArtifacts(temporaryRoot());
    const payloads = new ArtifactSessionCommandPayloadStore({ artifacts: artifactStore });
    const reference = await payloads.put({ commandId: 'command.tampered', payload: { value: 1 } });
    const objectKey = decodeObjectKey(reference.payloadRef);
    const replacement = new TextEncoder().encode('{"value":2}');
    await artifactStore.put({
      operationId: 'tamper.test',
      objectKey,
      content: replacement,
      sizeBytes: replacement.byteLength,
      mimeType: 'application/json',
    });

    await expect(payloads.get(reference)).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_HASH_MISMATCH' },
    });
  });

  it('rejects malformed and foreign Artifact references', async () => {
    const artifactStore = openArtifacts(temporaryRoot());
    const payloads = new ArtifactSessionCommandPayloadStore({ artifacts: artifactStore });
    const payloadHash = `sha256:${'0'.repeat(64)}`;

    await expect(payloads.get({ payloadRef: 'inline:payload', payloadHash })).rejects.toMatchObject(
      {
        code: 'RUNTIME_EVENT_STREAM_CORRUPT',
      }
    );
    await expect(
      payloads.get({
        payloadRef: `artifact-ref:${encodeURIComponent('artifact-store.foreign')}:object.json`,
        payloadHash,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_EVENT_STREAM_CORRUPT' });
  });

  it('bounds payload bytes before writing them to the Artifact Store', async () => {
    const artifactStore = openArtifacts(temporaryRoot());
    const payloads = new ArtifactSessionCommandPayloadStore({
      artifacts: artifactStore,
      maxPayloadBytes: 4,
    });

    await expect(
      payloads.put({ commandId: 'command.large', payload: { value: 'too large' } })
    ).rejects.toMatchObject({
      code: 'RUNTIME_RESOURCE_EXHAUSTED',
      context: { maxPayloadBytes: 4 },
    });
    await expect(artifactStore.stats()).resolves.toEqual({
      objects: 0,
      blobs: 0,
      storedBytes: 0,
    });
  });

  function openArtifacts(rootPath: string): LocalFilesystemExecutionArtifactStore {
    const store = new LocalFilesystemExecutionArtifactStore({ rootPath });
    artifacts.push(store);
    return store;
  }
});

function temporaryRoot(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-session-command-payload-'));
}

function decodeObjectKey(payloadRef: string): string {
  const encoded = payloadRef.slice('artifact-ref:'.length);
  return decodeURIComponent(encoded.slice(encoded.indexOf(':') + 1));
}
