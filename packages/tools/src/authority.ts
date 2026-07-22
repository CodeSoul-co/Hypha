import { hashToolContract } from './contracts';

export interface ToolAuthorityPrincipalLike {
  id?: string;
  principalId?: string;
  permissionScopes: readonly string[];
}

export interface ToolAuthorityConstraint {
  policyRef: string;
  allowedToolIds?: readonly string[];
  permissionScopes?: readonly string[];
}

export interface ResolveToolAuthorityInput<TPrincipal extends ToolAuthorityPrincipalLike> {
  requestedToolId: string;
  principal: TPrincipal;
  principalHasAllPermissions?: boolean;
  requiredPermissionScopes?: readonly string[];
  constraints?: readonly ToolAuthorityConstraint[];
  fsmState?: string;
  binding?: Record<string, unknown>;
}

export interface ResolvedToolAuthority<TPrincipal extends ToolAuthorityPrincipalLike> {
  principal: Omit<TPrincipal, 'permissionScopes'> & { permissionScopes: readonly string[] };
  executionScope: {
    allowedToolIds: readonly string[];
    policyRefs: readonly string[];
    fsmState?: string;
  };
  missingPermissionScopes: readonly string[];
  rejectedBy: readonly string[];
  policyRevision: string;
}

export function resolveToolAuthority<TPrincipal extends ToolAuthorityPrincipalLike>(
  input: ResolveToolAuthorityInput<TPrincipal>
): ResolvedToolAuthority<TPrincipal> {
  const requestedToolId = required(input.requestedToolId, 'requestedToolId');
  const principalId = required(
    input.principal.principalId ?? input.principal.id ?? '',
    'principal.id'
  );
  const constraints = normalizeConstraints(input.constraints ?? []);
  const requiredPermissionScopes = normalized(input.requiredPermissionScopes ?? []);
  const principalPermissionScopes = normalized(input.principal.permissionScopes);
  const effectivePermissionScopes = requiredPermissionScopes.filter(
    (scope) =>
      (input.principalHasAllPermissions === true || allows(principalPermissionScopes, scope)) &&
      constraints.every(
        (constraint) =>
          constraint.permissionScopes === undefined || allows(constraint.permissionScopes, scope)
      )
  );
  const missingPermissionScopes = requiredPermissionScopes.filter(
    (scope) => !effectivePermissionScopes.includes(scope)
  );
  const rejectedBy = constraints
    .filter(
      (constraint) =>
        constraint.allowedToolIds !== undefined &&
        !allows(constraint.allowedToolIds, requestedToolId)
    )
    .map((constraint) => constraint.policyRef);
  const allowedToolIds = rejectedBy.length === 0 ? [requestedToolId] : [];
  const policyRefs = constraints.map((constraint) => constraint.policyRef);
  const policyRevision = hashToolContract({
    principalId,
    principalHasAllPermissions: input.principalHasAllPermissions === true,
    requestedToolId,
    requiredPermissionScopes,
    effectivePermissionScopes,
    allowedToolIds,
    constraints,
    ...(input.fsmState === undefined ? {} : { fsmState: input.fsmState }),
    ...(input.binding === undefined ? {} : { binding: input.binding }),
  });

  return {
    principal: {
      ...input.principal,
      permissionScopes: effectivePermissionScopes,
    },
    executionScope: {
      allowedToolIds,
      policyRefs,
      ...(input.fsmState === undefined ? {} : { fsmState: input.fsmState }),
    },
    missingPermissionScopes,
    rejectedBy,
    policyRevision,
  };
}

function normalizeConstraints(
  constraints: readonly ToolAuthorityConstraint[]
): ToolAuthorityConstraint[] {
  return constraints
    .map((constraint) => ({
      policyRef: required(constraint.policyRef, 'constraint.policyRef'),
      ...(constraint.allowedToolIds === undefined
        ? {}
        : { allowedToolIds: normalized(constraint.allowedToolIds) }),
      ...(constraint.permissionScopes === undefined
        ? {}
        : { permissionScopes: normalized(constraint.permissionScopes) }),
    }))
    .sort((left, right) => left.policyRef.localeCompare(right.policyRef));
}

function normalized(values: readonly string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort();
}

function allows(values: readonly string[], candidate: string): boolean {
  return values.includes('*') || values.includes(candidate);
}

function required(value: string, label: string): string {
  const normalizedValue = value.trim();
  if (!normalizedValue) throw new Error(`${label} is required`);
  return normalizedValue;
}
