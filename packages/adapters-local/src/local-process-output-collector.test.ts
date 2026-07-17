import { describe, expect, it } from 'vitest';
import { LocalProcessOutputCollector } from './local-process-output-collector';

describe('LocalProcessOutputCollector', () => {
  it('captures stdout and stderr within independent and combined limits', () => {
    const collector = new LocalProcessOutputCollector({
      maxStdoutBytes: 8,
      maxStderrBytes: 8,
      maxCombinedOutputBytes: 12,
    });

    expect(collector.append('stdout', Buffer.from('hello'))).toEqual({});
    expect(collector.append('stderr', Buffer.from('error'))).toEqual({});
    expect(collector.snapshot()).toEqual({
      stdout: 'hello',
      stderr: 'error',
      capturedStdoutBytes: 5,
      capturedStderrBytes: 5,
      observedStdoutBytes: 5,
      observedStderrBytes: 5,
    });
  });

  it('counts multibyte UTF-8 output by bytes and cannot be bypassed by character length', () => {
    const collector = new LocalProcessOutputCollector({
      maxStdoutBytes: 4,
      maxStderrBytes: 4,
      maxCombinedOutputBytes: 8,
    });

    expect(collector.append('stdout', Buffer.from('你好'))).toEqual({
      limitExceeded: 'stdout',
    });
    const snapshot = collector.snapshot();
    expect(snapshot.observedStdoutBytes).toBe(6);
    expect(snapshot.capturedStdoutBytes).toBe(4);
  });

  it('reports the combined boundary before a later stream boundary', () => {
    const collector = new LocalProcessOutputCollector({
      maxStdoutBytes: 8,
      maxStderrBytes: 8,
      maxCombinedOutputBytes: 6,
    });

    expect(collector.append('stdout', Buffer.from('1234'))).toEqual({});
    expect(collector.append('stderr', Buffer.from('5678'))).toEqual({
      limitExceeded: 'combined',
    });
    const snapshot = collector.snapshot();
    expect(
      Buffer.byteLength(snapshot.stdout) + Buffer.byteLength(snapshot.stderr)
    ).toBeLessThanOrEqual(6);
  });

  it('rejects invalid limits at the component boundary', () => {
    expect(
      () =>
        new LocalProcessOutputCollector({
          maxStdoutBytes: 0,
          maxStderrBytes: 1,
          maxCombinedOutputBytes: 1,
        })
    ).toThrow('maxStdoutBytes must be a positive integer.');
  });
});
