import type { MemoryContractSpecRef, NormalizedMemoryError } from './contracts';
import {
  runMemoryServerMigrationAcceptance,
  type MemoryServerMigrationAcceptancePorts,
  type MemoryServerMigrationFinding,
} from './memory-server-migration-acceptance';
import { memoryServerMigrationAcceptance } from './memory-server-migration-contract';
import {
  runPermanentMemoryBehaviorAcceptance,
  type PermanentMemoryBehaviorFinding,
} from './memory-server-permanent-migration-acceptance';
import type { PermanentMemoryMigrationHarnessFactory } from './memory-server-permanent-migration-fixtures';
import {
  runRedisWorkingMemoryBehaviorAcceptance,
  type RedisWorkingMemoryBehaviorFinding,
} from './memory-server-redis-migration-acceptance';
import type { WorkingMemoryMigrationHarnessFactory } from './memory-server-redis-migration-fixtures';
import type {
  MemoryServerCanonicalMigrationState,
  MemoryServerMigrationTransitionInput,
  MemoryServerMigrationTransitionResult,
} from './memory-server-consumer-migration';
import { isNormalizedMemoryError, stableStringify } from './memory-utils';

export type MemoryServerMigrationPackageSuiteId =
  | 'consumer_contract'
  | 'redis_behavior'
  | 'permanent_behavior'
  | 'migration_state_machine'
  | 'runtime_lifecycle';

export interface MemoryServerMigrationPackageSpec {
  contractRef: MemoryContractSpecRef;
  baseAcceptanceRef: MemoryContractSpecRef;
  requiredSuites: readonly [
    'consumer_contract',
    'redis_behavior',
    'permanent_behavior',
    'migration_state_machine',
    'runtime_lifecycle',
  ];
  lifecycleFailurePoints: readonly [
    'provider_create',
    'capability_negotiation',
    'health_check',
    'activity_registration',
  ];
}

export const memoryServerMigrationPackageSpec: MemoryServerMigrationPackageSpec = {
  contractRef: {
    id: 'memory.server-migration-package',
    version: '1.0.0',
    revision: 'migration-acceptance-v1',
  },
  baseAcceptanceRef: memoryServerMigrationAcceptance.contractRef,
  requiredSuites: [
    'consumer_contract',
    'redis_behavior',
    'permanent_behavior',
    'migration_state_machine',
    'runtime_lifecycle',
  ],
  lifecycleFailurePoints: [
    'provider_create',
    'capability_negotiation',
    'health_check',
    'activity_registration',
  ],
};

export interface MemoryServerMigrationStateMachinePort {
  create(input: {
    migrationId: string;
    revision: string;
    createdAt: string;
  }): MemoryServerCanonicalMigrationState | Promise<MemoryServerCanonicalMigrationState>;
  transition(
    current: MemoryServerCanonicalMigrationState,
    input: MemoryServerMigrationTransitionInput
  ): MemoryServerMigrationTransitionResult | Promise<MemoryServerMigrationTransitionResult>;
}

export type MemoryServerLifecycleFailurePoint =
  (typeof memoryServerMigrationPackageSpec.lifecycleFailurePoints)[number];

export interface MemoryServerLifecycleFailureEvidence {
  point: MemoryServerLifecycleFailurePoint;
  rejected: boolean;
  resourcesCreated: number;
  resourcesClosed: number;
  openHandleCount: number;
}

export interface MemoryServerRuntimeLifecycleEvidence {
  closeInvocations: number;
  providerCloseCount: number;
  installationCloseCount: number;
  openHandleCount: number;
  failures: readonly MemoryServerLifecycleFailureEvidence[];
}

export interface MemoryServerRuntimeLifecyclePort {
  observe(): Promise<MemoryServerRuntimeLifecycleEvidence>;
}

export interface MemoryServerMigrationPackagePorts {
  contract: MemoryServerMigrationAcceptancePorts;
  redisBehavior: WorkingMemoryMigrationHarnessFactory;
  permanentBehavior: PermanentMemoryMigrationHarnessFactory;
  migrationStateMachine: MemoryServerMigrationStateMachinePort;
  runtimeLifecycle: MemoryServerRuntimeLifecyclePort;
}

export interface MemoryServerMigrationPackageFinding {
  code: string;
  message: string;
  fixtureId?: string;
  issue?: string;
}

export interface MemoryServerMigrationPackageSuiteReport {
  id: MemoryServerMigrationPackageSuiteId;
  passed: boolean;
  cases: number;
  findings: readonly MemoryServerMigrationPackageFinding[];
}

export interface MemoryServerMigrationPackageReport {
  contractRef: MemoryContractSpecRef;
  baseAcceptanceRef: MemoryContractSpecRef;
  passed: boolean;
  suites: readonly MemoryServerMigrationPackageSuiteReport[];
}

export async function runMemoryServerMigrationPackageAcceptance(
  ports: MemoryServerMigrationPackagePorts,
  spec = memoryServerMigrationPackageSpec
): Promise<MemoryServerMigrationPackageReport> {
  const [contract, redis, permanent, migration, lifecycle] = await Promise.all([
    runMemoryServerMigrationAcceptance(ports.contract),
    runRedisWorkingMemoryBehaviorAcceptance(ports.redisBehavior),
    runPermanentMemoryBehaviorAcceptance(ports.permanentBehavior),
    runMigrationStateMachineAcceptance(ports.migrationStateMachine),
    runRuntimeLifecycleAcceptance(ports.runtimeLifecycle, spec),
  ]);
  const suites: MemoryServerMigrationPackageSuiteReport[] = [
    {
      id: 'consumer_contract',
      passed: contract.passed,
      cases: contract.suites.length,
      findings: contract.suites.flatMap((suite) => suite.findings.map(contractFinding)),
    },
    {
      id: 'redis_behavior',
      passed: redis.passed,
      cases: redis.cases,
      findings: redis.findings.map(redisFinding),
    },
    {
      id: 'permanent_behavior',
      passed: permanent.passed,
      cases: permanent.cases,
      findings: permanent.findings.map(permanentFinding),
    },
    migration,
    lifecycle,
  ];
  return {
    contractRef: spec.contractRef,
    baseAcceptanceRef: spec.baseAcceptanceRef,
    passed: suites.every((suite) => suite.passed),
    suites,
  };
}

export async function runMigrationStateMachineAcceptance(
  port: MemoryServerMigrationStateMachinePort
): Promise<MemoryServerMigrationPackageSuiteReport> {
  const findings: MemoryServerMigrationPackageFinding[] = [];
  const migrationId = 'memory-server:acceptance';
  const revision = 'migration:v1';
  const createdAt = '2026-07-23T00:00:00.000Z';
  const checkpointRef = 'checkpoint:migration:v1';
  const create = () => port.create({ migrationId, revision, createdAt });
  let cases = 0;

  const initial = await create();
  cases += 1;
  if (initial.phase !== 'planned' || initial.activePath !== 'legacy') {
    findings.push(
      finding('MIGRATION_INITIAL_STATE_INVALID', 'Migration must start on planned/legacy.')
    );
  }

  cases += 1;
  try {
    await port.transition(initial, {
      targetPhase: 'shadow_read',
      expectedRevision: 'wrong-revision',
      occurredAt: '2026-07-23T00:01:00.000Z',
      reason: 'revision-negative-case',
    });
    findings.push(
      finding('MIGRATION_REVISION_NOT_FENCED', 'A stale migration revision was accepted.')
    );
  } catch (error) {
    assertConflict(error, 'MIGRATION_REVISION_ERROR_INVALID', findings);
  }

  const transition = async (
    state: MemoryServerCanonicalMigrationState,
    input: MemoryServerMigrationTransitionInput
  ) => {
    const first = await port.transition(state, input);
    const replay = await port.transition(state, input);
    cases += 2;
    if (stableStringify(first) !== stableStringify(replay)) {
      findings.push(
        finding('MIGRATION_REPLAY_UNSTABLE', `Replay diverged for ${input.targetPhase}.`)
      );
    }
    assertTransitionEvidence(first, findings);
    return first.state;
  };

  let state = await transition(initial, {
    targetPhase: 'shadow_read',
    expectedRevision: revision,
    occurredAt: '2026-07-23T00:02:00.000Z',
    reason: 'shadow-read',
  });
  state = await transition(state, {
    targetPhase: 'bounded_dual_write',
    expectedRevision: revision,
    occurredAt: '2026-07-23T00:03:00.000Z',
    reason: 'dual-write',
    dualWrite: {
      deadlineAt: '2026-07-23T01:00:00.000Z',
      idempotencyKey: 'migration:dual:v1',
      checkpointRef,
    },
  });

  cases += 1;
  try {
    await port.transition(state, {
      targetPhase: 'verify',
      expectedRevision: revision,
      occurredAt: '2026-07-23T02:00:00.000Z',
      reason: 'expired-dual-write',
    });
    findings.push(finding('MIGRATION_DEADLINE_NOT_ENFORCED', 'Expired dual-write advanced.'));
  } catch (error) {
    assertConflict(error, 'MIGRATION_DEADLINE_ERROR_INVALID', findings);
  }

  const reconciliation = {
    status: 'passed' as const,
    comparedRecords: 10,
    mismatchCount: 0,
    shadowResult: 'matched' as const,
  };
  state = await transition(state, {
    targetPhase: 'verify',
    expectedRevision: revision,
    occurredAt: '2026-07-23T00:04:00.000Z',
    reason: 'verify',
    reconciliation,
  });
  state = await transition(state, {
    targetPhase: 'cutover',
    expectedRevision: revision,
    occurredAt: '2026-07-23T00:05:00.000Z',
    reason: 'cutover',
  });
  state = await transition(state, {
    targetPhase: 'rollback',
    expectedRevision: revision,
    occurredAt: '2026-07-23T00:06:00.000Z',
    reason: 'rollback',
  });
  if (state.phase !== 'rollback' || state.activePath !== 'legacy') {
    findings.push(
      finding('MIGRATION_ROLLBACK_INVALID', 'Rollback did not restore the legacy path.')
    );
  }

  let retireState = await transition(await create(), {
    targetPhase: 'shadow_read',
    expectedRevision: revision,
    occurredAt: '2026-07-23T00:02:00.000Z',
    reason: 'retire-shadow',
  });
  retireState = await transition(retireState, {
    targetPhase: 'bounded_dual_write',
    expectedRevision: revision,
    occurredAt: '2026-07-23T00:03:00.000Z',
    reason: 'retire-dual',
    dualWrite: {
      deadlineAt: '2026-07-23T01:00:00.000Z',
      idempotencyKey: 'migration:retire:v1',
      checkpointRef,
    },
  });
  retireState = await transition(retireState, {
    targetPhase: 'verify',
    expectedRevision: revision,
    occurredAt: '2026-07-23T00:04:00.000Z',
    reason: 'retire-verify',
    reconciliation,
  });
  retireState = await transition(retireState, {
    targetPhase: 'cutover',
    expectedRevision: revision,
    occurredAt: '2026-07-23T00:05:00.000Z',
    reason: 'retire-cutover',
  });
  retireState = await transition(retireState, {
    targetPhase: 'retire',
    expectedRevision: revision,
    occurredAt: '2026-07-23T03:00:00.000Z',
    reason: 'retire',
    retirement: {
      legacyReadTraffic: 0,
      legacyWriteTraffic: 0,
      legacyImports: 0,
      legacyRegistrations: 0,
      rollbackWindowEndsAt: '2026-07-23T02:00:00.000Z',
    },
  });
  if (retireState.phase !== 'retire' || retireState.activePath !== 'canonical') {
    findings.push(
      finding('MIGRATION_RETIREMENT_INVALID', 'Retirement did not preserve canonical path.')
    );
  }

  return suite('migration_state_machine', cases, findings);
}

export async function runRuntimeLifecycleAcceptance(
  port: MemoryServerRuntimeLifecyclePort,
  spec = memoryServerMigrationPackageSpec
): Promise<MemoryServerMigrationPackageSuiteReport> {
  const evidence = await port.observe();
  const findings: MemoryServerMigrationPackageFinding[] = [];
  if (
    evidence.closeInvocations < 2 ||
    evidence.providerCloseCount !== 1 ||
    evidence.installationCloseCount !== 1
  ) {
    findings.push(
      finding(
        'RUNTIME_CLOSE_NOT_IDEMPOTENT',
        'Repeated close must release provider and installation once.'
      )
    );
  }
  if (evidence.openHandleCount !== 0) {
    findings.push(finding('RUNTIME_OPEN_HANDLES', 'Runtime close left open handles.'));
  }
  for (const point of spec.lifecycleFailurePoints) {
    const failure = evidence.failures.find((item) => item.point === point);
    if (!failure) {
      findings.push(
        finding('RUNTIME_FAILURE_POINT_MISSING', `No lifecycle evidence for ${point}.`)
      );
      continue;
    }
    if (!failure.rejected) {
      findings.push(finding('RUNTIME_FAILURE_NOT_REJECTED', `${point} did not reject creation.`));
    }
    if (failure.resourcesClosed !== failure.resourcesCreated || failure.openHandleCount !== 0) {
      findings.push(finding('RUNTIME_ROLLBACK_INCOMPLETE', `${point} leaked runtime resources.`));
    }
  }
  return suite('runtime_lifecycle', spec.lifecycleFailurePoints.length + 1, findings);
}

function assertTransitionEvidence(
  result: MemoryServerMigrationTransitionResult,
  findings: MemoryServerMigrationPackageFinding[]
): void {
  const event = result.event;
  if (
    !event.migrationRevision ||
    !event.activePath ||
    !event.shadowResult ||
    !event.reason ||
    !event.occurredAt
  ) {
    findings.push(
      finding('MIGRATION_EVENT_EVIDENCE_MISSING', 'Transition evidence is incomplete.')
    );
  }
}

function assertConflict(
  error: unknown,
  code: string,
  findings: MemoryServerMigrationPackageFinding[]
): void {
  if (!isNormalizedMemoryError(error) || error.code !== 'MEMORY_MAINTENANCE_CONFLICT') {
    findings.push(finding(code, 'Expected a normalized maintenance conflict.'));
  }
}

function contractFinding(value: MemoryServerMigrationFinding): MemoryServerMigrationPackageFinding {
  return { code: value.code, message: value.message, issue: value.issue };
}
function redisFinding(
  value: RedisWorkingMemoryBehaviorFinding
): MemoryServerMigrationPackageFinding {
  return { code: value.code, message: value.message, fixtureId: value.fixtureId };
}
function permanentFinding(
  value: PermanentMemoryBehaviorFinding
): MemoryServerMigrationPackageFinding {
  return { code: value.code, message: value.message, fixtureId: value.fixtureId };
}
function finding(code: string, message: string): MemoryServerMigrationPackageFinding {
  return { code, message };
}
function suite(
  id: MemoryServerMigrationPackageSuiteId,
  cases: number,
  findings: MemoryServerMigrationPackageFinding[]
): MemoryServerMigrationPackageSuiteReport {
  return { id, passed: findings.length === 0, cases, findings };
}

export function lifecycleFailureError(
  point: MemoryServerLifecycleFailurePoint
): NormalizedMemoryError {
  return {
    code: 'MEMORY_PROVIDER_UNAVAILABLE',
    message: `Injected lifecycle failure: ${point}.`,
    retryable: false,
    details: { point },
  };
}
