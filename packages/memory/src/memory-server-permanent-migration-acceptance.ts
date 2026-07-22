import type { NormalizedMemoryError } from './contracts';
import { hashMemoryScope, isNormalizedMemoryError } from './memory-utils';
import type {
  PermanentMemoryFailureFixture,
  PermanentMemoryMigrationHarnessFactory,
} from './memory-server-permanent-migration-fixtures';
import { permanentMemoryFailureFixtures } from './memory-server-permanent-migration-fixtures';
import type {
  PermanentMemoryMigrationOperation,
  PermanentMemoryMigrationPort,
  PermanentMemoryMigrationRequest,
} from './memory-server-permanent-migration';

export interface PermanentMemoryBehaviorFinding {
  fixtureId: string;
  code: string;
  message: string;
}

export interface PermanentMemoryBehaviorReport {
  passed: boolean;
  cases: number;
  findings: PermanentMemoryBehaviorFinding[];
}

const scope = {
  tenantId: 'tenant:permanent-migration',
  userId: 'user:permanent-migration',
  workspaceId: 'workspace:permanent-migration',
};
const forbiddenDiagnostics = ['secret', 'token', 'api_key', 'mongodb://', 'user content'];

export async function runPermanentMemoryBehaviorAcceptance(
  factory: PermanentMemoryMigrationHarnessFactory,
  fixtures: readonly PermanentMemoryFailureFixture[] = permanentMemoryFailureFixtures
): Promise<PermanentMemoryBehaviorReport> {
  const findings: PermanentMemoryBehaviorFinding[] = [];
  for (const fixture of fixtures) {
    try {
      await runFixture(factory, fixture, findings);
    } catch (error) {
      findings.push(
        finding(
          fixture.id,
          'PERMANENT_ACCEPTANCE_EXECUTION_FAILED',
          error instanceof Error ? error.message : String(error)
        )
      );
    }
  }
  return { passed: findings.length === 0, cases: fixtures.length, findings };
}

async function runFixture(
  factory: PermanentMemoryMigrationHarnessFactory,
  fixture: PermanentMemoryFailureFixture,
  findings: PermanentMemoryBehaviorFinding[]
): Promise<void> {
  const harness = factory(fixture);
  const request: PermanentMemoryMigrationRequest = {
    operationId: `permanent-migration:${fixture.id}`,
    scope,
    providerRef: 'mongodb:permanent-memory',
    profileRef: 'memory.profile.permanent',
    recordId: `memory:${fixture.id}`,
    attempt: fixture.attempt,
    maxAttempts: fixture.maxAttempts,
  };
  let result: unknown;
  let thrown: unknown;
  try {
    result = await invoke(harness.port, fixture.operation, request);
  } catch (error) {
    thrown = error;
  }

  if (fixture.expectedEmpty) {
    assertEmptyResult(fixture, result, thrown, findings);
    if (harness.events.length !== 0) {
      findings.push(
        finding(
          fixture.id,
          'NOT_FOUND_EMITTED_FAILURE',
          'Explicit not-found emitted a failure event.'
        )
      );
    }
    return;
  }

  if (result !== undefined || !isNormalizedMemoryError(thrown)) {
    findings.push(
      finding(
        fixture.id,
        'PROVIDER_FAILURE_NOT_PROPAGATED',
        'A non-not-found provider failure returned an empty or successful result.'
      )
    );
    return;
  }
  const error = thrown;
  assertNormalizedFailure(fixture, error, findings);
  assertSafeContext(fixture, error, request, findings);
  const event = harness.events.at(-1);
  if (!event) {
    findings.push(
      finding(fixture.id, 'FAILURE_EVENT_MISSING', 'Failure classification was not recorded.')
    );
  } else if (
    event.operation !== fixture.operation ||
    event.disposition !== fixture.expectedDisposition ||
    event.finalState !== fixture.expectedFinalState ||
    event.error.code !== error.code
  ) {
    findings.push(
      finding(
        fixture.id,
        'FAILURE_EVENT_MISMATCH',
        'Failure event does not preserve operation, classification and final state.'
      )
    );
  }
}

async function invoke(
  port: PermanentMemoryMigrationPort,
  operation: PermanentMemoryMigrationOperation,
  request: PermanentMemoryMigrationRequest
): Promise<unknown> {
  switch (operation) {
    case 'get':
      return port.get(request);
    case 'list':
      return port.list(request);
    case 'delete':
      return port.delete(request);
    case 'write':
      await port.write(request, { canonicalText: 'fixture content' });
      return 'success';
  }
}

function assertEmptyResult(
  fixture: PermanentMemoryFailureFixture,
  result: unknown,
  thrown: unknown,
  findings: PermanentMemoryBehaviorFinding[]
): void {
  const matches =
    fixture.expectedEmpty === 'null'
      ? result === null
      : fixture.expectedEmpty === 'array'
        ? Array.isArray(result) && result.length === 0
        : result === false;
  if (thrown !== undefined || !matches) {
    findings.push(
      finding(
        fixture.id,
        'EXPLICIT_NOT_FOUND_SEMANTICS_MISMATCH',
        `Explicit not-found did not return ${fixture.expectedEmpty}.`
      )
    );
  }
}

function assertNormalizedFailure(
  fixture: PermanentMemoryFailureFixture,
  error: NormalizedMemoryError,
  findings: PermanentMemoryBehaviorFinding[]
): void {
  if (error.code !== fixture.expectedCode || error.retryable !== fixture.expectedRetryable) {
    findings.push(
      finding(
        fixture.id,
        'NORMALIZED_ERROR_CLASSIFICATION_MISMATCH',
        `Expected ${fixture.expectedCode}/${fixture.expectedRetryable}, received ${error.code}/${error.retryable}.`
      )
    );
  }
  if (
    error.details?.disposition !== fixture.expectedDisposition ||
    error.details?.finalState !== fixture.expectedFinalState
  ) {
    findings.push(
      finding(
        fixture.id,
        'RECOVERY_DISPOSITION_MISMATCH',
        `Expected ${fixture.expectedDisposition}/${fixture.expectedFinalState}.`
      )
    );
  }
}

function assertSafeContext(
  fixture: PermanentMemoryFailureFixture,
  error: NormalizedMemoryError,
  request: PermanentMemoryMigrationRequest,
  findings: PermanentMemoryBehaviorFinding[]
): void {
  if (
    error.details?.operation !== fixture.operation ||
    error.details?.providerRef !== request.providerRef ||
    error.details?.profileRef !== request.profileRef ||
    error.details?.scopeHash !== hashMemoryScope(scope) ||
    !error.causeRef
  ) {
    findings.push(
      finding(
        fixture.id,
        'SAFE_FAILURE_CONTEXT_MISSING',
        'Normalized failure lacks operation, provider, profile, scope hash or cause reference.'
      )
    );
  }
  const serialized = JSON.stringify(error).toLowerCase();
  if (forbiddenDiagnostics.some((secret) => serialized.includes(secret))) {
    findings.push(
      finding(
        fixture.id,
        'UNSAFE_PROVIDER_DIAGNOSTIC_LEAK',
        'Normalized failure contains credentials or raw user/provider diagnostics.'
      )
    );
  }
}

function finding(fixtureId: string, code: string, message: string): PermanentMemoryBehaviorFinding {
  return { fixtureId, code, message };
}
