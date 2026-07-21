import { describe, expect, it } from 'vitest';
import {
  memoryServerMigrationAcceptance,
  verifyRedisWorkingMemoryRetention,
} from './memory-server-migration-contract';

describe('Memory Server migration acceptance', () => {
  it('requires every runtime consumer to use the canonical application service', () => {
    expect(memoryServerMigrationAcceptance.requiredConsumers).toEqual([
      'chat',
      'memory-routes',
      'workflow',
      'harness',
    ]);
    expect(memoryServerMigrationAcceptance.prohibitedRuntimeDependencies).toEqual([
      'TemporaryMemory',
      'PermanentMemory',
    ]);
  });

  it('provides executable Redis retention edge cases for the Server owner', () => {
    expect(verifyRedisWorkingMemoryRetention([100, 100, 100])).toEqual([]);
    expect(verifyRedisWorkingMemoryRetention([100, 101, 100])).toEqual([
      'Retention case 1 expected 100, received 101.',
    ]);
    expect(memoryServerMigrationAcceptance.redisWorkingMemory).toMatchObject({
      trimMode: 'MAXLEN',
      newestReadCommand: 'XREVRANGE',
      cleanupCommand: 'SCAN',
    });
  });
});
