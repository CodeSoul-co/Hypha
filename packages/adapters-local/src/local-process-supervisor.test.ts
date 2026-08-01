import os from 'node:os';
import { describe, expect, it } from 'vitest';
import { LocalProcessSupervisor, terminatePosixProcessGroup } from './local-process-supervisor';

describe('LocalProcessSupervisor', () => {
  it('stops POSIX termination escalation after SIGTERM removes the process group', async () => {
    const signals: string[] = [];

    await expect(
      terminatePosixProcessGroup(25, {
        signal: (signal) => signals.push(signal),
        isAlive: () => false,
        waitForExit: async () => {
          throw new Error('SIGKILL wait must not run after graceful termination');
        },
        delay: async () => undefined,
      })
    ).resolves.toBe(true);
    expect(signals).toEqual(['SIGTERM']);
  });

  it('escalates a surviving POSIX process group from SIGTERM to SIGKILL', async () => {
    const signals: string[] = [];
    const waits: number[] = [];

    await expect(
      terminatePosixProcessGroup(25, {
        signal: (signal) => signals.push(signal),
        isAlive: () => true,
        waitForExit: async (maximumWaitMs) => {
          waits.push(maximumWaitMs);
          return true;
        },
        delay: async () => undefined,
      })
    ).resolves.toBe(true);
    expect(signals).toEqual(['SIGTERM', 'SIGKILL']);
    expect(waits).toEqual([250]);
  });

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

  it('bounds simultaneous high-throughput stdout and stderr by stream and combined bytes', async () => {
    const result = await new LocalProcessSupervisor().run(
      request(
        [
          '-e',
          [
            "const chunk = 'x'.repeat(512);",
            'let remaining = 1_000;',
            'const write = () => {',
            '  process.stdout.write(chunk);',
            '  process.stderr.write(chunk);',
            '  remaining -= 1;',
            '  if (remaining > 0) setTimeout(write, 1);',
            '};',
            'write();',
          ].join('\n'),
        ],
        {
          maxStdoutBytes: 64 * 1024,
          maxStderrBytes: 64 * 1024,
          maxCombinedOutputBytes: 8 * 1024,
          timeoutMs: 5_000,
        }
      )
    );

    const capturedStdoutBytes = Buffer.byteLength(result.stdout);
    const capturedStderrBytes = Buffer.byteLength(result.stderr);
    expect(result).toMatchObject({
      outcome: 'output_limit',
      outputLimitStream: 'combined',
    });
    expect(result.observedStdoutBytes).toBeGreaterThan(0);
    expect(result.observedStderrBytes).toBeGreaterThan(0);
    expect(result.observedStdoutBytes + result.observedStderrBytes).toBeGreaterThan(8 * 1024);
    expect(capturedStdoutBytes).toBeLessThanOrEqual(64 * 1024);
    expect(capturedStderrBytes).toBeLessThanOrEqual(64 * 1024);
    expect(capturedStdoutBytes + capturedStderrBytes).toBeLessThanOrEqual(8 * 1024);
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
        // Leave enough startup budget for the child to be scheduled when the
        // full contract suite is running under constrained CI resources. The
        // assertion still proves the timer is reset by observed output and
        // eventually terminates the idle process.
        idleTimeoutMs: 1_000,
        timeoutMs: 5_000,
      })
    );

    expect(result).toMatchObject({ outcome: 'idle_timed_out', stdout: 'started' });
  });

  it.runIf(process.platform !== 'win32')(
    'falls back to the owned child when macOS denies a process-group signal',
    async () => {
      let denied = false;
      const supervisor = new LocalProcessSupervisor({
        kill: (pid, signal) => {
          if (pid < 0 && signal !== 0 && !denied) {
            denied = true;
            throw Object.assign(new Error('kill EPERM'), { code: 'EPERM' });
          }
          process.kill(pid, signal);
        },
      });

      const result = await supervisor.run(
        request(['-e', 'setInterval(() => {}, 1000)'], { timeoutMs: 40 })
      );

      expect(denied).toBe(true);
      expect(result).toMatchObject({
        outcome: 'timed_out',
        processTreeTerminationVerified: true,
      });
    }
  );

  it.runIf(process.platform !== 'win32')(
    'escalates to SIGKILL when a real child ignores SIGTERM and verifies process-group cleanup',
    async () => {
      const result = await new LocalProcessSupervisor().run(
        request(
          [
            '-e',
            [
              "process.on('SIGTERM', () => {});",
              "process.stdout.write('ready');",
              'setInterval(() => {}, 1_000);',
            ].join('\n'),
          ],
          {
            timeoutMs: 1_500,
            gracefulTerminationMs: 100,
          }
        )
      );

      expect(result).toMatchObject({
        outcome: 'timed_out',
        signal: 'SIGKILL',
        stdout: 'ready',
        terminationMechanism: 'posix_process_group',
        processTreeTerminationVerified: true,
      });
    }
  );

  it('removes a real descendant that ignores SIGTERM instead of leaving an orphan', async () => {
    const descendantProgram = [
      "process.on('SIGTERM', () => {});",
      'setInterval(() => {}, 1_000);',
    ].join('\n');
    const parentProgram = [
      "const { spawn } = require('node:child_process');",
      `const descendant = spawn(process.execPath, ['-e', ${JSON.stringify(descendantProgram)}], { stdio: 'ignore' });`,
      'process.stdout.write(String(descendant.pid));',
      'setInterval(() => {}, 1_000);',
    ].join('\n');

    const result = await new LocalProcessSupervisor().run(
      request(['-e', parentProgram], {
        timeoutMs: 1_500,
        gracefulTerminationMs: 100,
      })
    );
    const descendantPid = Number.parseInt(result.stdout, 10);

    expect(result).toMatchObject({
      outcome: 'timed_out',
      terminationMechanism:
        process.platform === 'win32' ? 'windows_taskkill' : 'posix_process_group',
      processTreeTerminationVerified: process.platform !== 'win32',
    });
    expect(Number.isSafeInteger(descendantPid)).toBe(true);
    await expect(waitForProcessExit(descendantPid, 2_000)).resolves.toBe(true);
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

  it('publishes raw output bytes and the governed truncation boundary', async () => {
    const observed: Array<{
      stream: 'stdout' | 'stderr';
      chunk: Uint8Array;
      truncated: boolean;
    }> = [];
    const result = await new LocalProcessSupervisor().run(
      request(['-e', "process.stdout.write('x'.repeat(128)); setInterval(() => {}, 1000)"], {
        maxStdoutBytes: 16,
        maxCombinedOutputBytes: 16,
        onOutput: (event) => {
          observed.push(event);
        },
      })
    );

    expect(result.outcome).toBe('output_limit');
    expect(observed).toEqual([
      {
        stream: 'stdout',
        chunk: new TextEncoder().encode('x'.repeat(128)),
        truncated: true,
      },
    ]);
  });

  it('waits for asynchronous output backpressure before completing the process result', async () => {
    const outputObserved = deferred();
    const releaseOutput = deferred();
    let completed = false;
    const execution = new LocalProcessSupervisor()
      .run(
        request(['-e', "process.stdout.write('output')"], {
          onOutput: async () => {
            outputObserved.resolve();
            await releaseOutput.promise;
          },
        })
      )
      .then((result) => {
        completed = true;
        return result;
      });

    await outputObserved.promise;
    await new Promise((resolve) => setTimeout(resolve, 25));
    expect(completed).toBe(false);
    releaseOutput.resolve();
    await expect(execution).resolves.toMatchObject({ outcome: 'exited', stdout: 'output' });
  });

  it('terminates the process when an output observer fails', async () => {
    const result = await new LocalProcessSupervisor().run(
      request(['-e', "process.stdout.write('output'); setInterval(() => {}, 1000)"], {
        onOutput: () => {
          throw new Error('observer unavailable');
        },
      })
    );

    expect(result).toMatchObject({
      outcome: 'termination_failed',
      terminationError: { message: 'observer unavailable' },
    });
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

function deferred(): { promise: Promise<void>; resolve(): void } {
  let resolve!: () => void;
  const promise = new Promise<void>((settle) => {
    resolve = settle;
  });
  return { promise, resolve };
}

async function waitForProcessExit(pid: number, maximumWaitMs: number): Promise<boolean> {
  const deadline = Date.now() + maximumWaitMs;
  while (Date.now() < deadline) {
    if (!isProcessAlive(pid)) return true;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return !isProcessAlive(pid);
}

function isProcessAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === 'ESRCH') return false;
    if (code === 'EPERM') return true;
    throw error;
  }
}
