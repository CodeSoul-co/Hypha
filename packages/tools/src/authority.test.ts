import { describe, expect, it } from 'vitest';
import { resolveToolAuthority } from './authority';

describe('resolveToolAuthority', () => {
  it('narrows an authenticated wildcard grant to the Tool required scopes', () => {
    const authority = resolveToolAuthority({
      requestedToolId: 'tool.filesystem',
      principal: {
        id: 'user.admin',
        permissionScopes: ['*'],
      },
      requiredPermissionScopes: ['filesystem:write', 'filesystem:read'],
    });

    expect(authority.principal.permissionScopes).toEqual(['filesystem:read', 'filesystem:write']);
    expect(authority.principal.permissionScopes).not.toContain('*');
    expect(authority.missingPermissionScopes).toEqual([]);
  });

  it('does not invent a permission missing from the authenticated principal', () => {
    const authority = resolveToolAuthority({
      requestedToolId: 'tool.filesystem',
      principal: {
        id: 'user.reader',
        permissionScopes: ['filesystem:read'],
      },
      requiredPermissionScopes: ['filesystem:read', 'filesystem:write'],
    });

    expect(authority.principal.permissionScopes).toEqual(['filesystem:read']);
    expect(authority.missingPermissionScopes).toEqual(['filesystem:write']);
  });

  it('intersects DomainPack, Agent, and active Skill Tool policies', () => {
    const authority = resolveToolAuthority({
      requestedToolId: 'tool.filesystem',
      principal: {
        id: 'user.writer',
        permissionScopes: ['filesystem:write'],
      },
      requiredPermissionScopes: ['filesystem:write'],
      constraints: [
        {
          policyRef: 'domain:default',
          allowedToolIds: ['tool.filesystem', 'tool.search'],
        },
        { policyRef: 'agent:planner', allowedToolIds: ['tool.filesystem'] },
        { policyRef: 'skill:research', allowedToolIds: ['tool.search'] },
      ],
    });

    expect(authority.executionScope.allowedToolIds).toEqual([]);
    expect(authority.rejectedBy).toEqual(['skill:research']);
  });

  it('intersects policy permission scopes and produces a stable bound revision', () => {
    const input = {
      requestedToolId: 'tool.search',
      principal: {
        principalId: 'api-key.search',
        permissionScopes: ['web.search', 'web.fetch'],
      },
      requiredPermissionScopes: ['web.search'],
      constraints: [
        {
          policyRef: 'skill:research',
          allowedToolIds: ['tool.search'],
          permissionScopes: ['web.search'],
        },
        {
          policyRef: 'domain:default',
          allowedToolIds: ['tool.search', 'tool.filesystem'],
        },
      ],
      fsmState: 'Researching',
      binding: { runId: 'run.authority', runRevision: 7 },
    } as const;

    const first = resolveToolAuthority(input);
    const second = resolveToolAuthority({
      ...input,
      principal: {
        ...input.principal,
        permissionScopes: ['web.fetch', 'web.search'],
      },
      constraints: [...input.constraints].reverse(),
    });

    expect(first.principal.permissionScopes).toEqual(['web.search']);
    expect(first.executionScope).toEqual({
      allowedToolIds: ['tool.search'],
      policyRefs: ['domain:default', 'skill:research'],
      fsmState: 'Researching',
    });
    expect(first.policyRevision).toBe(second.policyRevision);
  });
});
