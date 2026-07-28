import { describe, expect, it } from 'vitest';
import { beginProviderPage, finishProviderPage } from './provider-pagination';

const scope = { userId: 'user:cursor', workspaceId: 'workspace:cursor' };

describe('provider pagination safety', () => {
  it('binds opaque provider cursors to provider and scope', () => {
    const first = beginProviderPage('provider:a', scope, { maxPages: 2 }, 0);
    const result = finishProviderPage(first, 'provider:a', scope, [{ id: '1' }], 'token:2', 1);
    expect(result.nextCursor).toMatch(/^hypha-provider-cursor:v1:/u);
    expect(() =>
      beginProviderPage(
        'provider:a',
        { ...scope, userId: 'user:other' },
        { cursor: result.nextCursor },
        2
      )
    ).toThrow('does not belong');
    expect(() => beginProviderPage('provider:b', scope, { cursor: result.nextCursor }, 2)).toThrow(
      'does not belong'
    );
  });

  it('rejects repeated provider cursors and bounded traversal overflow', () => {
    const first = beginProviderPage('provider:a', scope, { maxItems: 1 }, 0);
    expect(() =>
      finishProviderPage(first, 'provider:a', scope, [{ id: '1' }, { id: '2' }], 'token:2', 1)
    ).toThrow('exceeded its budget');

    const page = beginProviderPage('provider:a', scope, undefined, 0);
    const next = finishProviderPage(page, 'provider:a', scope, [], 'repeat', 1);
    const resumed = beginProviderPage('provider:a', scope, { cursor: next.nextCursor }, 2);
    expect(() => finishProviderPage(resumed, 'provider:a', scope, [], 'repeat', 3)).toThrow(
      'repeated pagination cursor'
    );
  });
});
