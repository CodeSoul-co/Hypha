export interface LeaseHeartbeatOptions {
  leaseMs: number;
  renewalMs?: number;
  now: () => Date;
  controller: AbortController;
  renew(now: string, leaseUntil: string): Promise<boolean>;
  description: string;
}

/**
 * Runs a leased operation while periodically extending its lease.
 *
 * A failed renewal aborts cooperative work and rejects the operation. Stores
 * remain the final authority: complete/fail must still reject expired or stale
 * fencing tokens.
 */
export async function runWithLeaseHeartbeat<T>(
  operation: (signal: AbortSignal) => Promise<T>,
  options: LeaseHeartbeatOptions
): Promise<T> {
  const leaseMs = positiveInteger(options.leaseMs, 'leaseMs');
  const renewalMs = positiveInteger(
    options.renewalMs ?? Math.max(1, Math.floor(leaseMs / 3)),
    'renewalMs'
  );
  if (renewalMs >= leaseMs) {
    throw new Error('renewalMs must be shorter than leaseMs.');
  }

  let stopped = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let activeRenewal: Promise<void> | undefined;
  let rejectLeaseLost!: (reason: Error) => void;
  const leaseLost = new Promise<never>((_resolve, reject) => {
    rejectLeaseLost = reject;
  });

  const loseLease = (cause?: unknown): void => {
    if (stopped) return;
    const error =
      cause instanceof Error
        ? new Error(`${options.description} lease renewal failed: ${cause.message}`, {
            cause,
          })
        : new Error(`${options.description} lease was lost.`);
    options.controller.abort(error);
    rejectLeaseLost(error);
  };

  const schedule = (): void => {
    timer = setTimeout(() => {
      activeRenewal = (async () => {
        const now = options.now();
        const leaseUntil = new Date(now.getTime() + leaseMs);
        try {
          const renewed = await options.renew(now.toISOString(), leaseUntil.toISOString());
          if (!renewed) {
            loseLease();
            return;
          }
        } catch (error) {
          loseLease(error);
          return;
        }
        if (!stopped) schedule();
      })();
    }, renewalMs);
  };

  schedule();
  try {
    return await Promise.race([operation(options.controller.signal), leaseLost]);
  } finally {
    stopped = true;
    if (timer) clearTimeout(timer);
    await activeRenewal?.catch(() => undefined);
  }
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer.`);
  }
  return value;
}
