import { authenticatedToolAuthority, authMiddleware, requirePermission } from './auth';

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

  it('maps API key permissions to an exact service principal', () => {
    const authority = authenticatedToolAuthority({
      apiKey: {
        keyId: 'key-1',
        userId: 'user-1',
        permissions: ['runtime:read', '*', 'runtime:read'],
      },
    } as any);

    expect(authority).toMatchObject({
      grantsAllPermissions: true,
      principal: {
        id: 'key-1',
        type: 'service',
        userId: 'user-1',
        permissionScopes: ['runtime:read'],
      },
    });
    expect(authority.principal.permissionScopes).not.toContain('*');
  });

  it('keeps a standard JWT principal fail-closed for scoped Tools', () => {
    const authority = authenticatedToolAuthority({
      user: { userId: 'user-1', email: 'user@example.com', isAdmin: false },
    } as any);

    expect(authority.grantsAllPermissions).toBe(false);
    expect(authority.principal.permissionScopes).toEqual([]);
  });

  it('rejects construction without a verified principal', () => {
    expect(() => authenticatedToolAuthority({} as any)).toThrow(
      'Authenticated Tool authority requires a verified principal.'
    );
  });
});
