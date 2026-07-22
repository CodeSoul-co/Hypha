import { hashMemoryScope } from './memory-utils';
import type { WorkingMemoryMigrationPort } from './memory-server-redis-migration';
import {
  redisWorkingMemoryBoundaryCases,
  type RedisWorkingMemoryBoundaryCase,
  type WorkingMemoryMigrationHarnessFactory,
} from './memory-server-redis-migration-fixtures';

export interface RedisWorkingMemoryBehaviorFinding {
  fixtureId: string;
  code: string;
  message: string;
}

export interface RedisWorkingMemoryBehaviorReport {
  passed: boolean;
  cases: number;
  findings: RedisWorkingMemoryBehaviorFinding[];
}

const scope = {
  tenantId: 'tenant:redis-migration',
  userId: 'user:redis-migration',
  workspaceId: 'workspace:redis-migration',
};
const otherScope = { ...scope, userId: 'user:redis-migration:other' };
const baseTime = Date.parse('2026-07-22T00:00:00.000Z');

export async function runRedisWorkingMemoryBehaviorAcceptance(
  factory: WorkingMemoryMigrationHarnessFactory,
  cases: readonly RedisWorkingMemoryBoundaryCase[] = redisWorkingMemoryBoundaryCases
): Promise<RedisWorkingMemoryBehaviorReport> {
  const findings: RedisWorkingMemoryBehaviorFinding[] = [];
  for (const fixture of cases) {
    try {
      await runRetentionCase(factory, fixture, findings);
    } catch (error) {
      findings.push({
        fixtureId: fixture.id,
        code: 'REDIS_ACCEPTANCE_EXECUTION_FAILED',
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
  await runEmptyLatestCase(factory, findings);
  await runScopeRestartAndCleanupCase(factory, findings);
  return { passed: findings.length === 0, cases: cases.length + 2, findings };
}

async function runRetentionCase(
  factory: WorkingMemoryMigrationHarnessFactory,
  fixture: RedisWorkingMemoryBoundaryCase,
  findings: RedisWorkingMemoryBehaviorFinding[]
): Promise<void> {
  const { port } = factory(fixture.id);
  const allIds: string[] = [];
  const seedMax = Math.max(1, fixture.preloadCount + fixture.appendCount + 1);
  for (let index = 0; index < fixture.preloadCount; index += 1) {
    const id = `${fixture.id}:preload:${index}`;
    allIds.push(id);
    await append(port, id, index, seedMax, scope);
  }
  const writes = Array.from({ length: fixture.appendCount }, (_, index) => {
    const sequence = fixture.preloadCount + index;
    const id = `${fixture.id}:append:${index}`;
    allIds.push(id);
    return () => append(port, id, sequence, fixture.maxMessages, scope);
  });
  if (fixture.concurrent) await Promise.all(writes.map((write) => write()));
  else for (const write of writes) await write();

  const entries = await port.list(scope);
  const expectedIds = fixture.maxMessages === 0 ? [] : allIds.slice(-fixture.maxMessages);
  if (entries.length !== expectedIds.length) {
    findings.push(
      finding(
        fixture.id,
        'REDIS_RETENTION_LENGTH_MISMATCH',
        `Expected ${expectedIds.length} entries, received ${entries.length}.`
      )
    );
  }
  if (new Set(entries.map((entry) => entry.id)).size !== entries.length) {
    findings.push(
      finding(fixture.id, 'REDIS_RETENTION_DUPLICATE', 'Retained entries are not unique.')
    );
  }
  if (entries.some((entry) => entry.scopeHash !== hashMemoryScope(scope))) {
    findings.push(
      finding(fixture.id, 'REDIS_RETENTION_SCOPE_MISMATCH', 'Retained entry crossed its scope.')
    );
  }
  if (fixture.exactOrder && entries.map((entry) => entry.id).join('|') !== expectedIds.join('|')) {
    findings.push(
      finding(fixture.id, 'REDIS_RETENTION_ORDER_MISMATCH', 'Retained entry order is incorrect.')
    );
  }
  if (
    fixture.concurrent &&
    entries.some((entry) => entry.id.includes(':preload:')) &&
    fixture.appendCount >= fixture.maxMessages
  ) {
    findings.push(
      finding(
        fixture.id,
        'REDIS_CONCURRENT_RETAINED_OLD_ENTRY',
        'Concurrent trim retained old entries.'
      )
    );
  }
  const latest = await port.latest(scope);
  const tail = entries.at(-1);
  const latestMatchesTail =
    entries.length === 0
      ? latest === null
      : latest !== null &&
        tail !== undefined &&
        latest.id === tail.id &&
        latest.createdAt === tail.createdAt;
  if (!latestMatchesTail) {
    findings.push(
      finding(
        fixture.id,
        'REDIS_LATEST_MISMATCH',
        'Latest read id or timestamp is not the stream tail.'
      )
    );
  }
}

async function runEmptyLatestCase(
  factory: WorkingMemoryMigrationHarnessFactory,
  findings: RedisWorkingMemoryBehaviorFinding[]
): Promise<void> {
  const fixtureId = 'empty-latest';
  try {
    const latest = await factory(fixtureId).port.latest(scope);
    if (latest !== null) {
      findings.push(
        finding(
          fixtureId,
          'REDIS_EMPTY_LATEST_NOT_NULL',
          'Empty stream returned a fabricated latest entry.'
        )
      );
    }
  } catch (error) {
    findings.push(
      finding(
        fixtureId,
        'REDIS_EMPTY_LATEST_FAILED',
        error instanceof Error ? error.message : String(error)
      )
    );
  }
}

async function runScopeRestartAndCleanupCase(
  factory: WorkingMemoryMigrationHarnessFactory,
  findings: RedisWorkingMemoryBehaviorFinding[]
): Promise<void> {
  const fixtureId = 'scope-restart-cleanup';
  try {
    const harness = factory(fixtureId);
    await append(harness.port, 'scope:primary', 1, 10, scope);
    await append(harness.port, 'scope:other', 2, 10, otherScope);
    const restarted = harness.restart();
    const latest = await restarted.latest(scope);
    if (latest?.id !== 'scope:primary' || latest.createdAt !== timestamp(1)) {
      findings.push(
        finding(
          fixtureId,
          'REDIS_RESTART_LATEST_MISMATCH',
          'Restart lost the latest entry metadata.'
        )
      );
    }
    if ((await restarted.list(scope)).some((entry) => entry.id === 'scope:other')) {
      findings.push(finding(fixtureId, 'REDIS_SCOPE_LEAK', 'Another user scope was returned.'));
    }
    const report = await restarted.clearScope(scope);
    if (!report.terminated || report.calls < 1 || (await restarted.list(scope)).length !== 0) {
      findings.push(
        finding(
          fixtureId,
          'REDIS_SCAN_CLEANUP_INCOMPLETE',
          'SCAN cleanup did not terminate cleanly.'
        )
      );
    }
    if ((await restarted.list(otherScope)).map((entry) => entry.id).join() !== 'scope:other') {
      findings.push(
        finding(fixtureId, 'REDIS_SCAN_CLEANUP_SCOPE_LEAK', 'Cleanup deleted another user scope.')
      );
    }
  } catch (error) {
    findings.push(
      finding(
        fixtureId,
        'REDIS_SCOPE_RESTART_EXECUTION_FAILED',
        error instanceof Error ? error.message : String(error)
      )
    );
  }
}

function append(
  port: WorkingMemoryMigrationPort,
  id: string,
  sequence: number,
  maxMessages: number,
  entryScope: typeof scope
): Promise<void> {
  return port.append({
    id,
    scope: entryScope,
    value: { sequence },
    createdAt: timestamp(sequence),
    maxMessages,
  });
}

function timestamp(sequence: number): string {
  return new Date(baseTime + sequence * 1_000).toISOString();
}

function finding(
  fixtureId: string,
  code: string,
  message: string
): RedisWorkingMemoryBehaviorFinding {
  return { fixtureId, code, message };
}
