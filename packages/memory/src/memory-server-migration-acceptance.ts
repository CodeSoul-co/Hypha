import type { NormalizedMemoryError } from './contracts';
import type {
  MemoryServerConsumer,
  MemoryServerMigrationAcceptance,
  MemoryServerMigrationIssue,
  MemoryServerMigrationSharedFixture,
} from './memory-server-migration-contract';
import { memoryServerMigrationAcceptance } from './memory-server-migration-contract';
import {
  allowedLegacyAdapterResponsibilities,
  type CanonicalProfileSwitchObservation,
} from './memory-server-consumer-migration';
import type { MemoryRuntimeCompositionReceipt } from './memory-runtime-factory';

export interface CanonicalMemoryConsumerObservation {
  compositionReceipt?: MemoryRuntimeCompositionReceipt;
  consumerServiceInstanceIds: Partial<Record<MemoryServerConsumer, string>>;
  serviceRegistrationCount: number;
  runtimeDependencies: readonly string[];
  unresolvedDependencyRefs: readonly string[];
  directStoreConsumers: readonly MemoryServerConsumer[];
  secondWritePaths: readonly string[];
  profileSwitches: readonly CanonicalProfileSwitchObservation[];
  legacyAdapterResponsibilities: readonly string[];
}

export interface RedisWorkingMemoryObservation {
  trimArgumentSemantics: 'target_max_length' | 'deletion_count';
  newestReadStrategy: 'reverse_range' | 'forward_range' | 'reliable_metadata';
  cleanupStrategy: 'scan' | 'keys';
}

export interface PermanentMemoryFailureObservation {
  notFoundReturnsEmpty: boolean;
  providerFailureResult: 'normalized_error' | 'empty_result' | 'success';
  normalizedFailure?: NormalizedMemoryError;
  failureDisposition: 'retry_reconcile_quarantine_or_dlq' | 'empty_result' | 'none';
}

export interface MemoryMigrationObservationPort<T> {
  observe(fixture: MemoryServerMigrationSharedFixture): Promise<T>;
}

export interface MemoryServerMigrationAcceptancePorts {
  canonicalConsumer: MemoryMigrationObservationPort<CanonicalMemoryConsumerObservation>;
  redisWorkingMemory: MemoryMigrationObservationPort<RedisWorkingMemoryObservation>;
  permanentMemory: MemoryMigrationObservationPort<PermanentMemoryFailureObservation>;
}

export interface MemoryServerMigrationFinding {
  issue: MemoryServerMigrationIssue;
  code: string;
  message: string;
}

export interface MemoryServerMigrationSuiteReport {
  issue: MemoryServerMigrationIssue;
  passed: boolean;
  findings: MemoryServerMigrationFinding[];
}

export interface MemoryServerMigrationAcceptanceReport {
  contractRef: MemoryServerMigrationAcceptance['contractRef'];
  passed: boolean;
  suites: readonly MemoryServerMigrationSuiteReport[];
}

export async function runCanonicalConsumerMigrationAcceptance(
  port: MemoryServerMigrationAcceptancePorts['canonicalConsumer'],
  acceptance = memoryServerMigrationAcceptance
): Promise<MemoryServerMigrationSuiteReport> {
  const observation = await port.observe(acceptance.sharedFixture);
  const findings: MemoryServerMigrationFinding[] = [];
  const serviceInstanceId = observation.compositionReceipt?.serviceInstanceId;
  if (
    !observation.compositionReceipt ||
    observation.compositionReceipt.serviceContract !== '@hypha/memory.MemoryApplicationService' ||
    !serviceInstanceId
  ) {
    findings.push(
      finding(
        'P0-1',
        'COMPOSITION_RECEIPT_MISSING',
        'Canonical consumer evidence must include a valid Memory runtime composition receipt.'
      )
    );
  }
  for (const consumer of acceptance.requiredConsumers) {
    const serviceId = observation.consumerServiceInstanceIds[consumer];
    if (!serviceId) {
      findings.push(
        finding('P0-1', 'MISSING_CANONICAL_CONSUMER', `${consumer} has no Memory service.`)
      );
    } else if (!serviceInstanceId || serviceId !== serviceInstanceId) {
      findings.push(
        finding('P0-1', 'NON_CANONICAL_SERVICE_INSTANCE', `${consumer} uses ${serviceId}.`)
      );
    }
  }
  for (const dependency of observation.runtimeDependencies) {
    if (acceptance.prohibitedRuntimeDependencies.some((value) => value === dependency)) {
      findings.push(
        finding('P0-1', 'LEGACY_RUNTIME_DEPENDENCY', `Runtime still depends on ${dependency}.`)
      );
    }
  }
  for (const consumer of observation.directStoreConsumers) {
    findings.push(
      finding('P0-1', 'DIRECT_STORE_CONSUMER', `${consumer} bypasses MemoryApplicationService.`)
    );
  }
  if (observation.serviceRegistrationCount !== 1) {
    findings.push(
      finding(
        'P0-1',
        'NON_UNIQUE_SERVICE_REGISTRATION',
        'Exactly one Memory service must be registered.'
      )
    );
  }
  for (const reference of observation.unresolvedDependencyRefs) {
    findings.push(
      finding('P0-1', 'UNRESOLVED_MEMORY_DEPENDENCY', `Dependency ${reference} is unresolved.`)
    );
  }
  for (const path of observation.secondWritePaths) {
    findings.push(
      finding('P0-1', 'SECOND_MEMORY_WRITE_PATH', `Second write path remains: ${path}.`)
    );
  }
  if (observation.profileSwitches.length < 2) {
    findings.push(
      finding('P0-1', 'PROFILE_SWITCH_EVIDENCE_MISSING', 'At least two profile cases are required.')
    );
  }
  for (const profileSwitch of observation.profileSwitches) {
    if (
      profileSwitch.observedReadProviderId !== profileSwitch.expectedProviderId ||
      profileSwitch.observedWriteProviderId !== profileSwitch.expectedProviderId
    ) {
      findings.push(
        finding(
          'P0-1',
          'PROFILE_SWITCH_NOT_EFFECTIVE',
          `Profile ${profileSwitch.profileId} did not route reads and writes to ${profileSwitch.expectedProviderId}.`
        )
      );
    }
  }
  for (const responsibility of observation.legacyAdapterResponsibilities) {
    if (!allowedLegacyAdapterResponsibilities.some((allowed) => allowed === responsibility)) {
      findings.push(
        finding(
          'P0-1',
          'LEGACY_ADAPTER_OWNS_BUSINESS_LOGIC',
          `Legacy adapter retains ${responsibility}.`
        )
      );
    }
  }
  return suite('P0-1', findings);
}

export async function runRedisWorkingMemoryMigrationAcceptance(
  port: MemoryServerMigrationAcceptancePorts['redisWorkingMemory'],
  acceptance = memoryServerMigrationAcceptance
): Promise<MemoryServerMigrationSuiteReport> {
  const observation = await port.observe(acceptance.sharedFixture);
  const findings: MemoryServerMigrationFinding[] = [];
  if (observation.trimArgumentSemantics !== acceptance.redisWorkingMemory.trimArgumentSemantics) {
    findings.push(
      finding('P0-2', 'REDIS_TRIM_USES_DELETION_COUNT', 'MAXLEN must receive the target length.')
    );
  }
  if (observation.newestReadStrategy === 'forward_range') {
    findings.push(
      finding('P0-2', 'REDIS_NEWEST_READ_DIRECTION', 'Newest reads cannot use forward XRANGE + -.')
    );
  }
  if (observation.cleanupStrategy !== 'scan') {
    findings.push(finding('P0-2', 'REDIS_BLOCKING_KEYS', 'Cleanup must use bounded SCAN.'));
  }
  return suite('P0-2', findings);
}

export async function runPermanentMemoryMigrationAcceptance(
  port: MemoryServerMigrationAcceptancePorts['permanentMemory'],
  acceptance = memoryServerMigrationAcceptance
): Promise<MemoryServerMigrationSuiteReport> {
  const observation = await port.observe(acceptance.sharedFixture);
  const findings: MemoryServerMigrationFinding[] = [];
  if (!observation.notFoundReturnsEmpty) {
    findings.push(
      finding(
        'P0-3',
        'NOT_FOUND_CONTRACT_MISSING',
        'Explicit not-found must retain empty semantics.'
      )
    );
  }
  if (observation.providerFailureResult !== acceptance.permanentMemory.providerFailureResult) {
    findings.push(
      finding(
        'P0-3',
        'PROVIDER_FAILURE_SWALLOWED',
        'Provider failure was presented as empty or success.'
      )
    );
  }
  if (!observation.normalizedFailure) {
    findings.push(
      finding('P0-3', 'NORMALIZED_ERROR_MISSING', 'Provider failure lacks NormalizedMemoryError.')
    );
  }
  if (observation.failureDisposition !== acceptance.permanentMemory.requiredFailureDisposition) {
    findings.push(
      finding('P0-3', 'FAILURE_RECOVERY_MISSING', 'Provider failure lacks a recovery disposition.')
    );
  }
  return suite('P0-3', findings);
}

export async function runMemoryServerMigrationAcceptance(
  ports: MemoryServerMigrationAcceptancePorts,
  acceptance = memoryServerMigrationAcceptance
): Promise<MemoryServerMigrationAcceptanceReport> {
  const suites = await Promise.all([
    runCanonicalConsumerMigrationAcceptance(ports.canonicalConsumer, acceptance),
    runRedisWorkingMemoryMigrationAcceptance(ports.redisWorkingMemory, acceptance),
    runPermanentMemoryMigrationAcceptance(ports.permanentMemory, acceptance),
  ]);
  return {
    contractRef: acceptance.contractRef,
    passed: suites.every((result) => result.passed),
    suites,
  };
}

function finding(
  issue: MemoryServerMigrationIssue,
  code: string,
  message: string
): MemoryServerMigrationFinding {
  return { issue, code, message };
}

function suite(
  issue: MemoryServerMigrationIssue,
  findings: MemoryServerMigrationFinding[]
): MemoryServerMigrationSuiteReport {
  return { issue, passed: findings.length === 0, findings };
}
