/**
 * Framework-owned handoff contract for the Server/dev composition migration.
 * It contains no Server implementation and can be consumed by integration tests.
 */
export interface MemoryServerMigrationAcceptance {
  canonicalService: '@hypha/memory.MemoryApplicationService';
  requiredConsumers: readonly ['chat', 'memory-routes', 'workflow', 'harness'];
  prohibitedRuntimeDependencies: readonly ['TemporaryMemory', 'PermanentMemory'];
  redisWorkingMemory: {
    trimMode: 'MAXLEN';
    newestReadCommand: 'XREVRANGE';
    cleanupCommand: 'SCAN';
    prohibitedCommands: readonly ['XTRIM MINID with message count', 'XRANGE + -', 'KEYS'];
    retentionCases: readonly RedisWorkingMemoryRetentionCase[];
  };
}

export interface RedisWorkingMemoryRetentionCase {
  beforeAppend: number;
  maxMessages: number;
  expectedAfterAppend: number;
}

export const memoryServerMigrationAcceptance: MemoryServerMigrationAcceptance = {
  canonicalService: '@hypha/memory.MemoryApplicationService',
  requiredConsumers: ['chat', 'memory-routes', 'workflow', 'harness'],
  prohibitedRuntimeDependencies: ['TemporaryMemory', 'PermanentMemory'],
  redisWorkingMemory: {
    trimMode: 'MAXLEN',
    newestReadCommand: 'XREVRANGE',
    cleanupCommand: 'SCAN',
    prohibitedCommands: ['XTRIM MINID with message count', 'XRANGE + -', 'KEYS'],
    retentionCases: [
      { beforeAppend: 99, maxMessages: 100, expectedAfterAppend: 100 },
      { beforeAppend: 100, maxMessages: 100, expectedAfterAppend: 100 },
      { beforeAppend: 101, maxMessages: 100, expectedAfterAppend: 100 },
    ],
  },
};

export function verifyRedisWorkingMemoryRetention(
  observedCounts: readonly number[],
  acceptance = memoryServerMigrationAcceptance
): string[] {
  const cases = acceptance.redisWorkingMemory.retentionCases;
  if (observedCounts.length !== cases.length) {
    return [`Expected ${cases.length} retention observations, received ${observedCounts.length}.`];
  }
  return cases.flatMap((testCase, index) =>
    observedCounts[index] === testCase.expectedAfterAppend
      ? []
      : [
          `Retention case ${index} expected ${testCase.expectedAfterAppend}, received ${observedCounts[index]}.`,
        ]
  );
}
