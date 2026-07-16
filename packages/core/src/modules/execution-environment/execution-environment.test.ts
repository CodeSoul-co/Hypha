import { describe, expect, it } from 'vitest';
import {
  executionEnvironmentSpecExample,
  executionEnvironmentSpecJsonSchema,
  validateExecutionEnvironmentSpec,
} from './index';

describe('ExecutionEnvironmentSpec', () => {
  it('validates the safe Docker example and exports its JSON Schema', () => {
    expect(validateExecutionEnvironmentSpec(executionEnvironmentSpecExample)).toEqual(
      executionEnvironmentSpecExample
    );
    expect(executionEnvironmentSpecJsonSchema.required).toEqual(
      expect.arrayContaining(['process', 'filesystem', 'network', 'security', 'secrets'])
    );
    expect(executionEnvironmentSpecJsonSchema.allOf).toHaveLength(2);
  });

  it('applies safe defaults for host environment, OOM, and nested containers', () => {
    const process = { ...executionEnvironmentSpecExample.process };
    const resources = { ...executionEnvironmentSpecExample.resources };
    const security = { ...executionEnvironmentSpecExample.security };
    delete process.inheritHostEnvironment;
    delete resources.oomKillDisable;
    delete security.allowNestedContainers;

    expect(
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        process,
        resources,
        security,
      })
    ).toMatchObject({
      process: { inheritHostEnvironment: false },
      resources: { oomKillDisable: false },
      security: { allowNestedContainers: false },
    });
  });

  it('requires Docker image digest pinning and a read-only root filesystem', () => {
    expect(() =>
      validateExecutionEnvironmentSpec({ ...executionEnvironmentSpecExample, image: undefined })
    ).toThrow(/Docker environments/u);
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        image: { reference: 'example/image', requireDigestPin: false },
      })
    ).toThrow(/digest|requireDigestPin/u);
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        filesystem: {
          ...executionEnvironmentSpecExample.filesystem,
          rootFilesystem: 'writable',
        },
      })
    ).toThrow(/read_only/u);
  });

  it('requires Docker Workspace mounts, resource limits, and capability drops', () => {
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        filesystem: { ...executionEnvironmentSpecExample.filesystem, mounts: [] },
      })
    ).toThrow(/Workspace mount/u);
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        resources: {
          maxStdoutBytes: 1_024,
          maxStderrBytes: 1_024,
        },
      })
    ).toThrow(/CPU limit|memory and PID/u);
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        security: { ...executionEnvironmentSpecExample.security, dropCapabilities: [] },
      })
    ).toThrow(/dropCapabilities/u);
  });

  it('requires process-tree termination and rejects full host environment inheritance', () => {
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        process: { ...executionEnvironmentSpecExample.process, killProcessTreeOnExit: false },
      })
    ).toThrow();
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        process: { ...executionEnvironmentSpecExample.process, inheritHostEnvironment: true },
      })
    ).toThrow();
  });

  it('rejects shell allowlists when shell execution is disabled', () => {
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        process: {
          ...executionEnvironmentSpecExample.process,
          shellEnabled: false,
          allowedShells: ['/bin/sh'],
        },
      })
    ).toThrow(/allowedShells/u);
  });

  it('rejects invalid resource limits', () => {
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        resources: { ...executionEnvironmentSpecExample.resources, memoryMb: 0 },
      })
    ).toThrow();
  });

  it('rejects Docker socket mounts and undeclared host bind mounts', () => {
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        filesystem: {
          ...executionEnvironmentSpecExample.filesystem,
          mounts: [
            {
              sourceRef: '/var/run/docker.sock',
              targetPath: '/var/run/docker.sock',
              mode: 'rw',
              type: 'bind',
            },
          ],
          allowHostPathMounts: true,
        },
      })
    ).toThrow(/Docker socket/u);
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        filesystem: {
          ...executionEnvironmentSpecExample.filesystem,
          mounts: [{ sourceRef: 'host:source', targetPath: '/source', mode: 'ro', type: 'bind' }],
          allowHostPathMounts: false,
        },
      })
    ).toThrow(/bind mounts/u);
  });

  it('rejects duplicate mount targets and undeclared device access', () => {
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        filesystem: {
          ...executionEnvironmentSpecExample.filesystem,
          tmpfs: [{ targetPath: '/workspace' }],
        },
      })
    ).toThrow(/unique/u);
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        filesystem: {
          ...executionEnvironmentSpecExample.filesystem,
          allowedDevices: ['/dev/gpu0'],
          allowDeviceAccess: false,
        },
      })
    ).toThrow(/allowDeviceAccess/u);
  });

  it('keeps disabled networking closed and task authorization time-bound', () => {
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        network: { mode: 'disabled', allowedDomains: ['example.com'] },
      })
    ).toThrow(/disabled networking/u);
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        network: { mode: 'task_authorized', allowedDomains: ['example.com'] },
      })
    ).toThrow(/taskAuthorizationTtlSeconds/u);
  });

  it('rejects overlapping allow and deny rules', () => {
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        network: {
          mode: 'restricted',
          allowedDomains: ['EXAMPLE.COM'],
          deniedDomains: ['example.com'],
        },
      })
    ).toThrow(/both allowed and denied/u);
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        security: {
          ...executionEnvironmentSpecExample.security,
          dropCapabilities: ['NET_RAW'],
          addCapabilities: ['net_raw'],
        },
      })
    ).toThrow(/both allowed and denied/u);
  });

  it('enforces non-root, non-privileged, no-new-privileges security', () => {
    for (const security of [
      { ...executionEnvironmentSpecExample.security, nonRootRequired: false },
      { ...executionEnvironmentSpecExample.security, noNewPrivileges: false },
      { ...executionEnvironmentSpecExample.security, privileged: true },
      { ...executionEnvironmentSpecExample.security, allowNestedContainers: true },
    ]) {
      expect(() =>
        validateExecutionEnvironmentSpec({ ...executionEnvironmentSpecExample, security })
      ).toThrow();
    }
  });

  it('requires Secret redaction and time-bounds enabled injection', () => {
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        secrets: {
          ...executionEnvironmentSpecExample.secrets,
          redactFromOutput: false,
        },
      })
    ).toThrow();
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        secrets: {
          injectionMode: 'brokered',
          allowedSecretRefs: ['secret:build-token'],
          redactFromOutput: true,
          redactFromEvents: true,
        },
      })
    ).toThrow(/ttlSeconds/u);
    expect(() =>
      validateExecutionEnvironmentSpec({
        ...executionEnvironmentSpecExample,
        secrets: {
          ...executionEnvironmentSpecExample.secrets,
          allowedSecretRefs: ['secret:unused'],
        },
      })
    ).toThrow(/allowedSecretRefs/u);
  });

  it('does not define plaintext Secret values in the public schema', () => {
    const schema = JSON.stringify(executionEnvironmentSpecJsonSchema);
    expect(schema).not.toContain('secretValue');
    expect(schema).not.toContain('secretValues');
    expect(schema).not.toContain('environmentVariables');
  });
});
