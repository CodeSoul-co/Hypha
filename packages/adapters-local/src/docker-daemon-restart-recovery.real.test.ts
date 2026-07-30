import { afterEach, describe, expect, it } from 'vitest';
import { DockerCliTransport } from './docker-cli-transport';
import { DockerManagedContainerCleanup } from './docker-container-cleanup';
import { DockerEngineCliClient } from './docker-engine-client';

const dockerPath = process.env.HYPHA_REAL_DOCKER_PATH ?? 'docker';
const containerName = requiredEnvironment(
  'HYPHA_REAL_DOCKER_RESTART_CONTAINER',
  process.env.HYPHA_REAL_DOCKER_RESTART_CONTAINER
);
const preRestartStartedAt = requiredEnvironment(
  'HYPHA_REAL_DOCKER_PRE_RESTART_STARTED_AT',
  process.env.HYPHA_REAL_DOCKER_PRE_RESTART_STARTED_AT
);
const daemonRestartConfirmed = requiredEnvironment(
  'HYPHA_REAL_DOCKER_DAEMON_RESTART_CONFIRMED',
  process.env.HYPHA_REAL_DOCKER_DAEMON_RESTART_CONFIRMED
);
const scopeId = 'scope.docker.daemon-restart.real';
const transport = new DockerCliTransport({ dockerPath });
const engine = new DockerEngineCliClient(transport);

afterEach(async () => {
  await engine.removeContainer(containerName);
  await expect(engine.inspectContainer(containerName)).resolves.toBeNull();
});

describe('Docker managed-container recovery after a real daemon restart', () => {
  it('reconciles a sentinel that survived a manually confirmed daemon restart', async () => {
    expect(daemonRestartConfirmed).toBe('1');
    const inspection = await engine.inspectContainer(containerName);
    expect(inspection).not.toBeNull();
    expect(['running', 'exited']).toContain(inspection?.status);
    expect(inspection?.running).toBe(inspection?.status === 'running');
    expect(inspection?.startedAt).toBeDefined();
    expect(Date.parse(preRestartStartedAt)).not.toBeNaN();
    expect(Date.parse(inspection?.startedAt ?? '')).not.toBeNaN();

    const recoveryTransport = new DockerCliTransport({ dockerPath });
    const recoveryEngine = new DockerEngineCliClient(recoveryTransport);
    const evidence = await new DockerManagedContainerCleanup(
      recoveryTransport,
      recoveryEngine
    ).reconcile({
      scopeId,
      activeContainerReferences: [],
      stopTimeoutSeconds: 1,
      signal: new AbortController().signal,
    });

    expect(evidence).toMatchObject({
      complete: true,
      discovered: 1,
      retainedActive: 0,
      alreadyMissing: 0,
      failures: [],
    });
    expect(evidence.removed).toEqual([
      {
        containerReference: inspection?.id,
        wasRunning: inspection?.running,
      },
    ]);
    await expect(recoveryEngine.inspectContainer(containerName)).resolves.toBeNull();
  }, 60_000);
});

function requiredEnvironment(name: string, value: string | undefined): string {
  if (!value?.trim()) {
    throw new Error(`${name} is required for real Docker daemon-restart acceptance.`);
  }
  return value;
}
