import type { PersistedFrameworkEvent } from '../events';

export interface ScanCanonicalEventsRequest {
  afterGlobalSequence: number;
  limit: number;
  maxBytes: number;
}

export interface ScanCanonicalEventsResult {
  events: PersistedFrameworkEvent[];
  scannedBytes: number;
  lastGlobalSequence: number;
  hasMore: boolean;
}

export interface CanonicalEventScanPort {
  scanCanonicalEvents(request: ScanCanonicalEventsRequest): Promise<ScanCanonicalEventsResult>;
}

export interface RuntimeIntegrityWatermark {
  version: '1.0.0';
  lastGlobalSequence: number;
  projectionRevision: string;
  schemaCatalogHash: string;
  streamFingerprintRevision: string;
  reportHash: string;
  auditedAt: string;
}

export interface RuntimeIntegrityRepairEvidence {
  version: '1.0.0';
  repairId: string;
  findingHash: string;
  repairedRevision: string;
  evidenceRef: string;
  evidenceHash: string;
  repairedBy: string;
  repairedAt: string;
}

export interface RuntimeIntegrityRepairCommand {
  version: '1.0.0';
  repairId: string;
  findingHash: string;
  requestedRevision: string;
  requestedBy: string;
  requestedAt: string;
}

export interface RuntimeIntegrityRepairResult {
  evidenceRef: string;
  evidenceHash: string;
  repairedRevision: string;
}

export interface RuntimeIntegrityRepairPort {
  repair(command: RuntimeIntegrityRepairCommand): Promise<RuntimeIntegrityRepairResult>;
}

export interface RuntimeIntegrityStore {
  getWatermark(): Promise<RuntimeIntegrityWatermark | null>;
  putWatermark(
    watermark: RuntimeIntegrityWatermark,
    expectedLastGlobalSequence: number | null
  ): Promise<void>;
  getRepair(repairId: string): Promise<RuntimeIntegrityRepairEvidence | null>;
  putRepair(evidence: RuntimeIntegrityRepairEvidence): Promise<void>;
}
