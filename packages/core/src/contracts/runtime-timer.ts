export const RUNTIME_TIMER_SWEEP_DISPOSITIONS = [
  'fired',
  'not_due',
  'lease_unavailable',
  'already_resolved',
] as const;

export type RuntimeTimerSweepDisposition = (typeof RUNTIME_TIMER_SWEEP_DISPOSITIONS)[number];

export interface RuntimeTimerSweepRequest {
  ownerId: string;
  leaseTtlMs: number;
  limit: number;
  cursor?: string;
  firedAt: string;
}

export interface RuntimeTimerStreamScope {
  tenantId?: string;
  userId: string;
  runId: string;
}

export interface RuntimeTimerSweepRunResult {
  scope: RuntimeTimerStreamScope;
  disposition: RuntimeTimerSweepDisposition;
  eventIds: string[];
}

export interface RuntimeTimerSweepResult {
  scanned: number;
  fired: number;
  notDue: number;
  leaseUnavailable: number;
  alreadyResolved: number;
  results: RuntimeTimerSweepRunResult[];
  nextCursor?: string;
}
