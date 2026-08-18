import { createFrameworkEvent } from '@codesoul-co/hypha-core';
import { MemoryCacheStore, ServingCacheManager } from '@codesoul-co/hypha-serving-cache';
import { assertStatePath } from '@codesoul-co/hypha-testing';

/** Exercise deterministic cache keys and a replay-style state-path assertion. */
export async function runCacheTestingExample() {
  const cache = new ServingCacheManager({ store: new MemoryCacheStore() });
  const key = cache.keyFor({
    provider: 'mock-tour',
    model: 'mock',
    messages: [{ role: 'user', content: 'cache this' }],
  });
  await cache.set(
    key,
    { content: 'cached result' },
    { provider: 'mock-tour', model: 'mock', cacheType: 'exact' }
  );

  const event = createFrameworkEvent({
    id: 'event-fixture-1',
    type: 'run.created',
    userId: 'owner',
    sessionId: 'session-fixture',
    runId: 'run-fixture',
    payload: {},
  });
  const statePathMatches = assertStatePath(
    { id: 'fixture-tour', version: '1.0.0', events: [event], statePath: ['Created'] },
    ['Created']
  );

  return {
    cacheHit: Boolean(await cache.get(key)),
    statePathMatches,
  };
}
