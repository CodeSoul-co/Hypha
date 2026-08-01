import { describe, expect, it, vi } from 'vitest';
import { RenewableCredentialManager } from './managed-credentials';

describe('renewable managed credentials', () => {
  it('singleflights refresh, renews expiring leases and revokes on close', async () => {
    let now = new Date('2026-07-22T00:00:00.000Z');
    const acquire = vi
      .fn()
      .mockResolvedValueOnce({
        token: 'short-lived-secret',
        tokenType: 'oauth_bearer',
        expiresAt: '2026-07-22T00:00:30.000Z',
      })
      .mockResolvedValueOnce({
        token: 'renewed-secret',
        tokenType: 'oauth_bearer',
        expiresAt: '2026-07-22T01:00:00.000Z',
      });
    const revoke = vi.fn(async () => undefined);
    const manager = new RenewableCredentialManager({
      provider: { acquire, revoke },
      refreshSkewMs: 10_000,
      now: () => now,
    });

    const [first, shared] = await Promise.all([manager.get(), manager.get()]);
    expect(first.token).toBe('short-lived-secret');
    expect(shared.token).toBe('short-lived-secret');
    expect(acquire).toHaveBeenCalledTimes(1);

    now = new Date('2026-07-22T00:00:25.000Z');
    await expect(manager.get()).resolves.toMatchObject({ token: 'renewed-secret' });
    expect(acquire).toHaveBeenCalledTimes(2);

    await manager.close();
    expect(revoke).toHaveBeenCalledWith(
      expect.objectContaining({ token: 'renewed-secret' }),
      undefined
    );
  });

  it('rejects empty and already expired leases', async () => {
    const empty = new RenewableCredentialManager({
      provider: { acquire: async () => ({ token: '', tokenType: 'api_token' }) },
    });
    await expect(empty.get()).rejects.toMatchObject({ code: 'MEMORY_PERMISSION_DENIED' });

    const expired = new RenewableCredentialManager({
      provider: {
        acquire: async () => ({
          token: 'expired',
          tokenType: 'oauth_bearer',
          expiresAt: '2020-01-01T00:00:00.000Z',
        }),
      },
      now: () => new Date('2026-07-22T00:00:00.000Z'),
    });
    await expect(expired.get()).rejects.toMatchObject({ code: 'MEMORY_PERMISSION_DENIED' });
  });
});
