export interface ProviderHealth {
  status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  checkedAt: string;
  latencyMs?: number;
  message?: string;
  details?: Record<string, unknown>;
}

export interface ExecutionPrincipal {
  principalId: string;
  type: 'user' | 'agent' | 'service' | 'system';
  tenantId?: string;
  userId?: string;
  agentId?: string;
  roles?: string[];
  permissionScopes: string[];
  metadata?: Record<string, unknown>;
}

export interface NormalizedExecutionError {
  code:
    | 'EXECUTION_INVALID_REQUEST'
    | 'EXECUTION_PERMISSION_DENIED'
    | 'EXECUTION_POLICY_DENIED'
    | 'EXECUTION_APPROVAL_REQUIRED'
    | 'EXECUTION_WORKSPACE_NOT_FOUND'
    | 'EXECUTION_PATH_ESCAPE'
    | 'EXECUTION_PATH_DENIED'
    | 'EXECUTION_QUOTA_EXCEEDED'
    | 'EXECUTION_ENVIRONMENT_UNAVAILABLE'
    | 'EXECUTION_SANDBOX_CREATE_FAILED'
    | 'EXECUTION_SANDBOX_START_FAILED'
    | 'EXECUTION_IMAGE_UNTRUSTED'
    | 'EXECUTION_NETWORK_DENIED'
    | 'EXECUTION_SECRET_DENIED'
    | 'EXECUTION_PROCESS_START_FAILED'
    | 'EXECUTION_TIMEOUT'
    | 'EXECUTION_IDLE_TIMEOUT'
    | 'EXECUTION_CANCELLED'
    | 'EXECUTION_OOM_KILLED'
    | 'EXECUTION_RESOURCE_EXCEEDED'
    | 'EXECUTION_OUTPUT_LIMIT'
    | 'EXECUTION_RESULT_UNKNOWN'
    | 'EXECUTION_CLEANUP_FAILED'
    | 'EXECUTION_INTERNAL_ERROR';
  message: string;
  retryable: boolean;
  providerCode?: string | number;
  details?: Record<string, unknown>;
  causeRef?: string;
}
