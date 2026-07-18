import type {
  ArtifactAccessRecord,
  ArtifactProfileSpec,
  ArtifactRecord,
  ExecutionPrincipal,
  SpecRef,
} from '../..';
import { artifactManagerError } from './manager-error';

export type ArtifactPermission = 'read' | 'write' | 'delete';

export function assertProfilePermission(
  profile: ArtifactProfileSpec,
  principal: ExecutionPrincipal,
  permission: ArtifactPermission
): void {
  if (
    profile.access.allowedPrincipalTypes?.length &&
    !profile.access.allowedPrincipalTypes.includes(principal.type)
  ) {
    throw artifactManagerError(
      'ARTIFACT_PERMISSION_DENIED',
      `Principal type ${principal.type} is not allowed by Artifact profile ${profile.id}.`
    );
  }
  const required =
    permission === 'read'
      ? profile.access.requiredReadScopes
      : permission === 'write'
        ? profile.access.requiredWriteScopes
        : profile.access.requiredDeleteScopes;
  const missing = (required ?? []).filter((scope) => !hasPermissionScope(principal, scope));
  if (missing.length) {
    throw artifactManagerError(
      'ARTIFACT_PERMISSION_DENIED',
      `Artifact ${permission} permission is missing required scopes.`,
      false,
      { missingScopes: missing }
    );
  }
}

export function assertRecordPermission(
  profile: ArtifactProfileSpec,
  record: ArtifactRecord,
  principal: ExecutionPrincipal,
  permission: ArtifactPermission
): void {
  assertProfilePermission(profile, principal, permission);
  if (hasPermissionScope(principal, 'artifact:admin') || canAccessRecord(record, principal)) {
    return;
  }
  throw artifactManagerError(
    'ARTIFACT_PERMISSION_DENIED',
    `Principal ${principal.principalId} cannot ${permission} this Artifact.`
  );
}

export function assertCreateAccess(
  access: ArtifactAccessRecord,
  principal: ExecutionPrincipal,
  workspaceId: string,
  tenantId?: string
): void {
  if (access.workspaceId !== workspaceId) {
    throw artifactManagerError(
      'ARTIFACT_PERMISSION_DENIED',
      'Artifact access workspace does not match the create request.'
    );
  }
  if (
    access.ownerPrincipalId !== principal.principalId &&
    !hasPermissionScope(principal, 'artifact:admin')
  ) {
    throw artifactManagerError(
      'ARTIFACT_PERMISSION_DENIED',
      'Artifact owner must be the requesting principal.'
    );
  }
  if (
    tenantId &&
    principal.tenantId &&
    tenantId !== principal.tenantId &&
    !hasPermissionScope(principal, 'artifact:admin')
  ) {
    throw artifactManagerError(
      'ARTIFACT_PERMISSION_DENIED',
      'Artifact tenant does not match the requesting principal.'
    );
  }
}

export function canAccessRecord(record: ArtifactRecord, principal: ExecutionPrincipal): boolean {
  if (
    record.access.ownerPrincipalId === principal.principalId ||
    record.userId === principal.userId ||
    record.access.allowedPrincipalIds?.includes(principal.principalId) ||
    record.access.allowedRoles?.some((role) => principal.roles?.includes(role))
  ) {
    return true;
  }
  if (record.access.visibility === 'shared') return true;
  if (record.access.visibility === 'tenant') {
    return Boolean(record.tenantId && record.tenantId === principal.tenantId);
  }
  if (record.access.visibility === 'workspace') {
    return principalMetadataContains(principal, 'workspaceId', 'workspaceIds', record.workspaceId);
  }
  if (record.access.visibility === 'session' && record.sessionId) {
    return principalMetadataContains(principal, 'sessionId', 'sessionIds', record.sessionId);
  }
  return false;
}

export function resolveProfileRef(
  profiles: ArtifactProfileSpec[],
  ref: SpecRef
): ArtifactProfileSpec | null {
  const candidates = profiles.filter(
    (profile) =>
      profile.id === ref.id &&
      (ref.version === undefined || profile.version === ref.version) &&
      (ref.revision === undefined || profile.revision === ref.revision)
  );
  return candidates.length === 1 ? candidates[0]! : null;
}

export function profileReference(profile: ArtifactProfileSpec): SpecRef {
  return {
    id: profile.id,
    version: profile.version,
    ...(profile.revision ? { revision: profile.revision } : {}),
  };
}

function hasPermissionScope(principal: ExecutionPrincipal, required: string): boolean {
  if (principal.permissionScopes.includes(required) || principal.permissionScopes.includes('*')) {
    return true;
  }
  const separator = required.indexOf(':');
  return separator > 0 && principal.permissionScopes.includes(`${required.slice(0, separator)}:*`);
}

function principalMetadataContains(
  principal: ExecutionPrincipal,
  singularKey: string,
  pluralKey: string,
  expected: string
): boolean {
  const singular = principal.metadata?.[singularKey];
  if (singular === expected) return true;
  const plural = principal.metadata?.[pluralKey];
  return Array.isArray(plural) && plural.some((value) => value === expected);
}
