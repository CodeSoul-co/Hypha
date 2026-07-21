import { authMiddleware, requirePermission } from './auth';

describe('authentication middleware composition', () => {
  it('accepts an API key principal that was already verified upstream', async () => {
    const req = {
      apiKey: { keyId: 'key-1', userId: 'user-1', permissions: ['runtime:read'] },
      headers: {},
    } as any;
    const next = jest.fn();

    await authMiddleware(true)(req, {} as any, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('does not continue after denying an API key permission', () => {
    const req = {
      apiKey: { keyId: 'key-1', userId: 'user-1', permissions: [] },
    } as any;
    const json = jest.fn();
    const res = { status: jest.fn(() => ({ json })) } as any;
    const next = jest.fn();

    requirePermission('runtime:read')(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});
