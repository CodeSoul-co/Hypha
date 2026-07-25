import { describe, expect, it } from 'vitest';
import type { SandboxProvider } from '../../contracts/sandbox-provider';
import { commandExecutionResultExample } from '../command-execution';
import { executionEnvironmentSpecExample } from '../execution-environment';
import { sandboxProviderCapabilitiesExample, sandboxRecordExample } from '../sandbox';
import {
  deriveSandboxCapabilityRequirements,
  negotiateSandboxCapabilities,
  sandboxCapabilityNegotiationRequestExample,
  sandboxCapabilityNegotiationResultExample,
  sandboxProviderContractJsonSchemas,
  validateSandboxCapabilityNegotiationRequest,
  validateSandboxCapabilityNegotiationResult,
} from './index';

describe('Sandbox Provider contract and capability negotiation', () => {
  it('validates negotiation fixtures and exports boundary JSON Schemas', () => {
    expect(
      validateSandboxCapabilityNegotiationRequest(sandboxCapabilityNegotiationRequestExample)
    ).toEqual(sandboxCapabilityNegotiationRequestExample);
    expect(
      validateSandboxCapabilityNegotiationResult(sandboxCapabilityNegotiationResultExample)
    ).toEqual(sandboxCapabilityNegotiationResultExample);
    expect(Object.keys(sandboxProviderContractJsonSchemas)).toEqual(
      expect.arrayContaining([
        'SandboxCapabilityRequirement',
        'SandboxCapabilityNegotiationRequest',
        'SandboxCapabilityNegotiationResult',
        'SandboxCapabilityDerivationInput',
      ])
    );
  });

  it('derives strong Docker requirements from Environment and command policy', () => {
    const requirements = deriveSandboxCapabilityRequirements({
      environment: executionEnvironmentSpecExample,
      command: { snapshotBefore: true },
    });
    const names = requirements.map((requirement) => requirement.capability);

    expect(names).toEqual(
      expect.arrayContaining([
        'processIsolation',
        'filesystemIsolation',
        'networkIsolation',
        'cpuLimits',
        'memoryLimits',
        'diskLimits',
        'pidsLimit',
        'cancellation',
        'processTreeKill',
        'snapshots',
        'imageDigestPinning',
      ])
    );
    expect(new Set(names).size).toBe(names.length);
  });

  it('rejects a Provider when any required capability is missing', () => {
    const result = negotiateSandboxCapabilities(sandboxCapabilityNegotiationRequestExample);
    expect(result.compatible).toBe(false);
    expect(result.missingCapabilities).toEqual(['snapshots']);
  });

  it('accepts a Provider only when every requirement is satisfied', () => {
    const result = negotiateSandboxCapabilities({
      ...sandboxCapabilityNegotiationRequestExample,
      capabilities: {
        ...sandboxCapabilityNegotiationRequestExample.capabilities,
        snapshots: true,
      },
    });
    expect(result.compatible).toBe(true);
    expect(result.missingCapabilities).toEqual([]);
  });

  it('rejects negotiation results that conceal missing capabilities', () => {
    expect(() =>
      validateSandboxCapabilityNegotiationResult({
        ...sandboxCapabilityNegotiationResultExample,
        compatible: true,
        missingCapabilities: [],
      })
    ).toThrow(/missing|required capabilities/u);
  });

  it('allows trusted local-process profiles without claiming process isolation', () => {
    const requirements = deriveSandboxCapabilityRequirements({
      environment: {
        ...executionEnvironmentSpecExample,
        provider: 'local_process',
        image: undefined,
        process: {
          ...executionEnvironmentSpecExample.process,
          maxProcesses: undefined,
        },
        resources: {},
        filesystem: {
          rootFilesystem: 'writable',
          mounts: [],
          allowDeviceAccess: false,
          allowHostPathMounts: false,
        },
        network: { mode: 'enabled' },
        lifecycle: {
          ...executionEnvironmentSpecExample.lifecycle,
          snapshotOnFailure: false,
        },
      },
    });
    const names = requirements.map((requirement) => requirement.capability);

    expect(names).not.toContain('processIsolation');
    expect(names).not.toContain('filesystemIsolation');
    expect(names).not.toContain('networkIsolation');
    expect(names).toEqual(expect.arrayContaining(['cancellation', 'processTreeKill']));
  });

  it('requires remote Providers to declare remote execution', () => {
    const requirements = deriveSandboxCapabilityRequirements({
      environment: {
        ...executionEnvironmentSpecExample,
        provider: 'remote_sandbox',
      },
    });
    expect(requirements.map((requirement) => requirement.capability)).toContain('remoteExecution');
  });

  it('preserves additional Policy and Runtime requirements', () => {
    const requirements = deriveSandboxCapabilityRequirements({
      environment: {
        ...executionEnvironmentSpecExample,
        provider: 'mock',
        lifecycle: {
          ...executionEnvironmentSpecExample.lifecycle,
          snapshotOnFailure: false,
        },
      },
      additionalRequirements: [
        {
          capability: 'networkIsolation',
          source: 'policy',
          reason: 'Policy requires an isolated network namespace',
        },
      ],
    });
    expect(requirements).toEqual([
      {
        capability: 'networkIsolation',
        source: 'policy',
        reason: 'Policy requires an isolated network namespace',
      },
    ]);
  });

  it('keeps mock environments free of false isolation claims', () => {
    const requirements = deriveSandboxCapabilityRequirements({
      environment: {
        ...executionEnvironmentSpecExample,
        provider: 'mock',
        lifecycle: {
          ...executionEnvironmentSpecExample.lifecycle,
          snapshotOnFailure: false,
        },
      },
    });
    expect(requirements).toEqual([]);
  });

  it('defines a provider-neutral, governed SandboxProvider port', async () => {
    const provider: SandboxProvider = {
      id: 'provider.mock',
      capabilities: () => Promise.resolve(sandboxProviderCapabilitiesExample),
      create: () => Promise.resolve(sandboxRecordExample),
      start: () => Promise.resolve(sandboxRecordExample),
      execute: () => Promise.resolve(commandExecutionResultExample),
      cancel: () => Promise.resolve(),
      terminate: () => Promise.resolve(),
      status: () => Promise.resolve(sandboxRecordExample),
      cleanup: () => Promise.resolve(),
      health: () =>
        Promise.resolve({
          status: 'healthy',
          checkedAt: '2026-07-16T00:00:00.000Z',
        }),
      close: () => Promise.resolve(),
    };

    expect(provider.id).toBe('provider.mock');
    expect((await provider.capabilities()).processTreeKill).toBe(true);
    expect((await provider.health()).status).toBe('healthy');
  });
});
