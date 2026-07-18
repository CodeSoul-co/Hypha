export type LocalProcessOutputStream = 'stdout' | 'stderr';

export interface LocalProcessOutputLimits {
  maxStdoutBytes: number;
  maxStderrBytes: number;
  maxCombinedOutputBytes: number;
}

export interface LocalProcessOutputSnapshot {
  stdout: string;
  stderr: string;
  capturedStdoutBytes: number;
  capturedStderrBytes: number;
  observedStdoutBytes: number;
  observedStderrBytes: number;
}

export interface LocalProcessOutputAppendResult {
  limitExceeded?: LocalProcessOutputStream | 'combined';
}

/** Collects bounded process output while accounting against raw bytes, not string length. */
export class LocalProcessOutputCollector {
  private readonly stdout: Buffer[] = [];
  private readonly stderr: Buffer[] = [];
  private capturedStdoutBytes = 0;
  private capturedStderrBytes = 0;
  private observedStdoutBytes = 0;
  private observedStderrBytes = 0;

  constructor(private readonly limits: LocalProcessOutputLimits) {
    validateLimits(limits);
  }

  append(stream: LocalProcessOutputStream, chunk: Buffer): LocalProcessOutputAppendResult {
    if (stream === 'stdout') this.observedStdoutBytes += chunk.byteLength;
    else this.observedStderrBytes += chunk.byteLength;

    const capturedStreamBytes =
      stream === 'stdout' ? this.capturedStdoutBytes : this.capturedStderrBytes;
    const streamLimit =
      stream === 'stdout' ? this.limits.maxStdoutBytes : this.limits.maxStderrBytes;
    const capturedCombinedBytes = this.capturedStdoutBytes + this.capturedStderrBytes;
    const remainingBytes = Math.max(
      0,
      Math.min(
        streamLimit - capturedStreamBytes,
        this.limits.maxCombinedOutputBytes - capturedCombinedBytes
      )
    );

    if (remainingBytes > 0) {
      const captured = chunk.subarray(0, remainingBytes);
      if (stream === 'stdout') {
        this.stdout.push(captured);
        this.capturedStdoutBytes += captured.byteLength;
      } else {
        this.stderr.push(captured);
        this.capturedStderrBytes += captured.byteLength;
      }
    }

    if (this.observedStdoutBytes + this.observedStderrBytes > this.limits.maxCombinedOutputBytes) {
      return { limitExceeded: 'combined' };
    }
    const observedStreamBytes =
      stream === 'stdout' ? this.observedStdoutBytes : this.observedStderrBytes;
    return observedStreamBytes > streamLimit ? { limitExceeded: stream } : {};
  }

  snapshot(): LocalProcessOutputSnapshot {
    return {
      stdout: decodeBoundedUtf8(this.stdout, this.capturedStdoutBytes),
      stderr: decodeBoundedUtf8(this.stderr, this.capturedStderrBytes),
      capturedStdoutBytes: this.capturedStdoutBytes,
      capturedStderrBytes: this.capturedStderrBytes,
      observedStdoutBytes: this.observedStdoutBytes,
      observedStderrBytes: this.observedStderrBytes,
    };
  }
}

function decodeBoundedUtf8(chunks: Buffer[], maxBytes: number): string {
  const decoded = Buffer.concat(chunks).toString('utf8');
  if (Buffer.byteLength(decoded) <= maxBytes) return decoded;

  const output: string[] = [];
  let outputBytes = 0;
  for (const character of decoded) {
    const characterBytes = Buffer.byteLength(character);
    if (outputBytes + characterBytes > maxBytes) break;
    output.push(character);
    outputBytes += characterBytes;
  }
  return output.join('');
}

function validateLimits(limits: LocalProcessOutputLimits): void {
  for (const [name, value] of Object.entries(limits)) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error(`${name} must be a positive integer.`);
    }
  }
}
