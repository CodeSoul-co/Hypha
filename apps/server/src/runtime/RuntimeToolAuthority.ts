import {
  resolveToolAuthority,
  type ResolvedToolAuthority,
  type ToolAuthorityConstraint,
  type ToolPrincipal,
} from '@hypha/tools';

export interface RuntimeToolAuthorityInput {
  runId: string;
  runRevision: number;
  requestedToolId: string;
  principal: ToolPrincipal;
  principalHasAllPermissions?: boolean;
  requiredPermissionScopes?: readonly string[];
  constraints?: readonly ToolAuthorityConstraint[];
  fsmState?: string;
}

export function resolveRuntimeToolAuthority(
  input: RuntimeToolAuthorityInput
): ResolvedToolAuthority<ToolPrincipal> {
  if (!Number.isInteger(input.runRevision) || input.runRevision < 0) {
    throw new Error('runRevision must be a non-negative integer');
  }

  return resolveToolAuthority({
    requestedToolId: input.requestedToolId,
    principal: input.principal,
    principalHasAllPermissions: input.principalHasAllPermissions,
    requiredPermissionScopes: input.requiredPermissionScopes,
    constraints: input.constraints,
    fsmState: input.fsmState,
    binding: {
      runId: required(input.runId, 'runId'),
      runRevision: input.runRevision,
    },
  });
}

function required(value: string, label: string): string {
  const normalized = value.trim();
  if (!normalized) throw new Error(`${label} is required`);
  return normalized;
}
