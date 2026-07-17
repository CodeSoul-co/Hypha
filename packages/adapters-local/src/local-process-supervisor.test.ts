import os from 'node:os';
import { describe, expect, it } from 'vitest';
import { LocalProcessSupervisor } from './local-process-supervisor';

describe('LocalProcessSupervisor', () => {
  it('executes without a shell and captures bounded stdout and stderr', async () => {
    const supervisor = new LocalProcessSupervisor();
    const result = await supervisor.run(
      request(
        [
          '-e',
          "process.stdout.write(process.env.HYPHA_TEST ?? 'missing'); process.stderr.write('err')",
        ],
        {
          environment: { HYPHA_TEST: 'allowed' },
        }
      )
    );

    expect(result).toMatchObject({
      outcome: 'exited',
      exitCode: 0,
      stdout: 'allowed',
      stderr: 'err',
      terminationMechanism:
        process.platform === 'win32' ? 'windows_taskkill' : 'posix_process_group',
    });
    expect(result.processTreeTerminationVerified).toBe(process.platform !== 'win32');
  });

  it('terminates a long-running command after its total timeout', async () => {
    const result = await new LocalProcessSupervisor().run(
      request(['-e', 'setInterval(() => {}, 1000)'], { timeoutMs: 40 })
    );

    expect(result).toMatchObject({ outcome: 'timed_out' });
    expect(result.latencyMs).toBeGreaterThanOrEqual(0);
  });

  it('uses AbortSignal cancellation and waits for process cleanup', async () => {
    const controller = new AbortController();
    const execution = new LocalProcessSupervisor().run(
      request(['-e', 'setInterval(() => {}, 1000)'], { signal: controller.signal })
    );
    setTimeout(() => controller.abort('test cancellation'), 20);

    await expect(execution).resolves.toMatchObject({
      outcome: 'cancelled',
    });
  });

  it('terminates a command that stops producing output after its idle timeout', async () => {
    const result = await new LocalProcessSupervisor().run(
      request(['-e', "process.stdout.write('started'); setInterval(() => {}, 1000)"], {
        idleTimeoutMs: 250,
      })
    );

    expect(result).toMatchObject({ outcome: 'idle_timed_out', stdout: 'started' });
  });

  it('stops and bounds a process that exceeds an output limit', async () => {
    const result = await new LocalProcessSupervisor().run(
      request(['-e', "process.stdout.write('x'.repeat(4096)); setInterval(() => {}, 1000)"], {
        maxStdoutBytes: 32,
        maxCombinedOutputBytes: 32,
      })
    );

    expect(result).toMatchObject({
      outcome: 'output_limit',
      outputLimitStream: 'combined',
    });
    expect(Buffer.byteLength(result.stdout)).toBeLessThanOrEqual(32);
    expect(result.observedStdoutBytes).toBeGreaterThan(32);
  });

  it('normalizes a process start failure into runner evidence', async () => {
    const missing = `${os.tmpdir()}/hypha-executable-that-does-not-exist`;
    const result = await new LocalProcessSupervisor().run(request([], { executable: missing }));

    expect(result.outcome).toBe('start_failed');
    expect(result.startError).toBeInstanceOf(Error);
  });
});

function request(
  args: string[],
  overrides: Partial<Parameters<LocalProcessSupervisor['run']>[0]> = {}
): Parameters<LocalProcessSupervisor['run']>[0] {
  return {
    executable: process.execPath,
    args,
    cwd: process.cwd(),
    environment: {},
    timeoutMs: 2_000,
    maxStdoutBytes: 1_024,
    maxStderrBytes: 1_024,
    maxCombinedOutputBytes: 2_048,
    gracefulTerminationMs: 10,
    signal: new AbortController().signal,
    ...overrides,
  };
}
