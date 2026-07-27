import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { DockerCliTransport } from './docker-cli-transport';
import { DockerManagedContainerCleanup } from './docker-container-cleanup';
import { DockerEngineCliClient } from './docker-engine-client';

const dockerPath = process.env.HYPHA_REAL_DOCKER_PATH ?? 'docker';
const image = process.env.HYPHA_REAL_DOCKER_IMAGE ?? 'redis:latest';
const imageDigest =
  process.env.HYPHA_REAL_DOCKER_DIGEST ??
  'sha256:77cb4599f0121142e25139cea1aafaf45fe765c74a0a41b38f4a4ea9fc8cb846';
const cleanupEngine = new DockerEngineCliClient(new DockerCliTransport({ dockerPath }));
const containerNames: string[] = [];
const temporaryWorkspaces: string[] = [];

beforeAll(async () => {
  const inspection = await new DockerCliTransport({ dockerPath }).run({
    args: ['image', 'inspect', `${image}@${imageDigest}`],
    timeoutMs: 10_000,
    maxStdoutBytes: 1024 * 1024,
    maxStderrBytes: 1024 * 1024,
    maxCombinedOutputBytes: 2 * 1024 * 1024,
    signal: new AbortController().signal,
  });
  expect(inspection.outcome).toBe('exited');
  expect(inspection.exitCode).toBe(0);
}, 30_000);

afterEach(async () => {
  await Promise.all(
    containerNames.splice(0).map(async (name) => {
      await cleanupEngine.removeContainer(name);
      await expect(cleanupEngine.inspectContainer(name)).resolves.toBeNull();
    })
  );
  await Promise.all(
    temporaryWorkspaces.splice(0).map((root) => fs.rm(root, { recursive: true, force: true }))
  );
});

describe('DockerManagedContainerCleanup real daemon', () => {
  it('reconciles owned orphans through a new client without touching active or foreign containers', async () => {
    const workspace = await temporaryWorkspace();
    const creationEngine = new DockerEngineCliClient(new DockerCliTransport({ dockerPath }));
    const scopeId = 'scope.docker.cleanup.real';
    const runningOrphan = await createContainer(
      creationEngine,
      workspace,
      uniqueContainerName('running-orphan'),
      scopeId,
      true
    );
    const stoppedOrphan = await createContainer(
      creationEngine,
      workspace,
      uniqueContainerName('stopped-orphan'),
      scopeId,
      true
    );
    const activeName = uniqueContainerName('active');
    const active = await createContainer(creationEngine, workspace, activeName, scopeId, true);
    const foreign = await createContainer(
      creationEngine,
      workspace,
      uniqueContainerName('foreign'),
      'scope.docker.cleanup.foreign',
      true
    );
    const unmanaged = await createContainer(
      creationEngine,
      workspace,
      uniqueContainerName('unmanaged'),
      scopeId,
      false
    );
    await Promise.all([
      creationEngine.startContainer(runningOrphan),
      creationEngine.startContainer(active),
      creationEngine.startContainer(foreign),
      creationEngine.startContainer(unmanaged),
    ]);

    // A fresh transport and lifecycle simulate recovery after the creating
    // process and its in-memory container ownership state have disappeared.
    const recoveryTransport = new DockerCliTransport({ dockerPath });
    const recoveryEngine = new DockerEngineCliClient(recoveryTransport);
    const evidence = await new DockerManagedContainerCleanup(
      recoveryTransport,
      recoveryEngine
    ).reconcile({
      scopeId,
      activeContainerReferences: [activeName],
      stopTimeoutSeconds: 1,
      signal: new AbortController().signal,
    });

    expect(evidence).toMatchObject({
      complete: true,
      discovered: 3,
      retainedActive: 1,
      alreadyMissing: 0,
      failures: [],
    });
    expect(evidence.removed).toHaveLength(2);
    expect(evidence.removed).toEqual(
      expect.arrayContaining([
        { containerReference: runningOrphan, wasRunning: true },
        { containerReference: stoppedOrphan, wasRunning: false },
      ])
    );
    await expect(recoveryEngine.inspectContainer(runningOrphan)).resolves.toBeNull();
    await expect(recoveryEngine.inspectContainer(stoppedOrphan)).resolves.toBeNull();
    await expect(recoveryEngine.inspectContainer(active)).resolves.toMatchObject({
      id: active,
      running: true,
    });
    await expect(recoveryEngine.inspectContainer(foreign)).resolves.toMatchObject({
      id: foreign,
      running: true,
    });
    await expect(recoveryEngine.inspectContainer(unmanaged)).resolves.toMatchObject({
      id: unmanaged,
      running: true,
    });
  }, 60_000);
});

async function createContainer(
  engine: DockerEngineCliClient,
  workspace: string,
  name: string,
  scopeId: string,
  managed: boolean
): Promise<string> {
  return engine.createContainer({
    name,
    image,
    imageDigest,
    user: '999:999',
    workingDirectory: '/workspace',
    workspaceMount: {
      source: workspace,
      target: '/workspace',
      readOnly: false,
    },
    networkMode: 'none',
    readOnlyRoot: true,
    cpuCores: 0.25,
    memoryBytes: 64 * 1024 * 1024,
    pidsLimit: 32,
    tempBytes: 4 * 1024 * 1024,
    labels: {
      'hypha.execution.scope': scopeId,
      ...(managed ? { 'hypha.execution.managed': 'true' } : {}),
      'hypha.acceptance': 'docker-cleanup',
    },
    command: ['sleep', 'infinity'],
  });
}

async function temporaryWorkspace(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-docker-cleanup-real-'));
  temporaryWorkspaces.push(root);
  return root;
}

function uniqueContainerName(role: string): string {
  const name = `hypha-cleanup-${role}-${process.pid}-${Date.now()}-${containerNames.length}`;
  containerNames.push(name);
  return name;
}
