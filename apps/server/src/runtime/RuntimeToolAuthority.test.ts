import { resolveRuntimeToolAuthority } from './RuntimeToolAuthority';

describe('resolveRuntimeToolAuthority', () => {
  it('binds an exact effective authority to the current Run revision', () => {
    const authority = resolveRuntimeToolAuthority({
      runId: 'run-1',
      runRevision: 7,
      requestedToolId: 'tool.search',
      principal: {
        id: 'key-1',
        type: 'service',
        permissionScopes: ['web.search', 'web.fetch'],
      },
      requiredPermissionScopes: ['web.search'],
      constraints: [
        { policyRef: 'domain:research', allowedToolIds: ['tool.search'] },
        { policyRef: 'agent:planner', allowedToolIds: ['tool.search'] },
      ],
      fsmState: 'Researching',
    });

    expect(authority.principal.permissionScopes).toEqual(['web.search']);
    expect(authority.executionScope).toEqual({
      allowedToolIds: ['tool.search'],
      policyRefs: ['agent:planner', 'domain:research'],
      fsmState: 'Researching',
    });
    expect(authority.policyRevision).toMatch(/^sha256:[a-f0-9]{64}$/);
  });

  it('does not expand a principal that lacks a required scope', () => {
    const authority = resolveRuntimeToolAuthority({
      runId: 'run-1',
      runRevision: 7,
      requestedToolId: 'tool.filesystem',
      principal: {
        id: 'user-1',
        type: 'user',
        permissionScopes: ['filesystem:read'],
      },
      requiredPermissionScopes: ['filesystem:write'],
    });

    expect(authority.principal.permissionScopes).toEqual([]);
    expect(authority.missingPermissionScopes).toEqual(['filesystem:write']);
  });

  it('expands an authenticated all-permissions grant only to exact required scopes', () => {
    const authority = resolveRuntimeToolAuthority({
      runId: 'run-1',
      runRevision: 7,
      requestedToolId: 'tool.filesystem',
      principal: {
        id: 'admin-1',
        type: 'user',
        permissionScopes: [],
      },
      principalHasAllPermissions: true,
      requiredPermissionScopes: ['filesystem:write', 'filesystem:read'],
    });

    expect(authority.principal.permissionScopes).toEqual(['filesystem:read', 'filesystem:write']);
    expect(authority.principal.permissionScopes).not.toContain('*');
    expect(authority.missingPermissionScopes).toEqual([]);
  });

  it('changes the policy revision when the bound Run revision changes', () => {
    const common = {
      runId: 'run-1',
      requestedToolId: 'tool.search',
      principal: {
        id: 'user-1',
        type: 'user' as const,
        permissionScopes: ['web.search'],
      },
      requiredPermissionScopes: ['web.search'],
    };

    const first = resolveRuntimeToolAuthority({ ...common, runRevision: 7 });
    const second = resolveRuntimeToolAuthority({ ...common, runRevision: 8 });

    expect(first.policyRevision).not.toBe(second.policyRevision);
  });

  it('rejects an invalid Run revision before producing authority', () => {
    expect(() =>
      resolveRuntimeToolAuthority({
        runId: 'run-1',
        runRevision: -1,
        requestedToolId: 'tool.search',
        principal: { id: 'user-1', type: 'user', permissionScopes: [] },
      })
    ).toThrow('runRevision must be a non-negative integer');
  });
});
