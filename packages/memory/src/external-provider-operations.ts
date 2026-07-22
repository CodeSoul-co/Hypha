import { z, type ZodType } from 'zod';
import type { ManagedMemoryScope, MemoryContractSpecRef, NormalizedMemoryError } from './contracts';
import type { StructuredStoreProvider } from './index';
import { hashMemoryScope, memoryError, sha256 } from './memory-utils';

export type ExternalProviderOperationState =
  | 'pending'
  | 'running'
  | 'reconcile_required'
  | 'succeeded'
  | 'failed'
  | 'cancelled'
  | 'dead_letter';

export interface ExternalProviderOperation {
  id: string;
  providerId: string;
  operationId: string;
  externalOperationId?: string;
  kind: 'mem0_event' | 'vertex_lro' | 'unknown_write';
  state: ExternalProviderOperationState;
  scope: ManagedMemoryScope;
  scopeHash: string;
  profileRef: MemoryContractSpecRef;
  principal: { principalId: string; userId?: string };
  attempts: number;
  deadlineAt?: string;
  nextAttemptAt?: string;
  cancellationRequestedAt?: string;
  failure?: NormalizedMemoryError;
  failureFingerprint?: string;
  createdAt: string;
  updatedAt: string;
}

const specRefSchema = z
  .object({
    id: z.string().min(1),
    version: z.string().min(1).optional(),
    revision: z.string().min(1).optional(),
  })
  .strict();
const scopeSchema = z
  .object({
    tenantId: z.string().min(1).optional(),
    userId: z.string().min(1),
    workspaceId: z.string().min(1).optional(),
    projectId: z.string().min(1).optional(),
    sessionId: z.string().min(1).optional(),
    runId: z.string().min(1).optional(),
    agentId: z.string().min(1).optional(),
    domainPackId: z.string().min(1).optional(),
  })
  .strict();
const normalizedErrorSchema = z
  .object({
    code: z.string().min(1),
    message: z.string(),
    retryable: z.boolean(),
    details: z.record(z.string(), z.unknown()).optional(),
  })
  .strict() as ZodType<NormalizedMemoryError>;

export const externalProviderOperationSchema: ZodType<ExternalProviderOperation> = z
  .object({
    id: z.string().min(1),
    providerId: z.string().min(1),
    operationId: z.string().min(1),
    externalOperationId: z.string().min(1).optional(),
    kind: z.enum(['mem0_event', 'vertex_lro', 'unknown_write']),
    state: z.enum([
      'pending',
      'running',
      'reconcile_required',
      'succeeded',
      'failed',
      'cancelled',
      'dead_letter',
    ]),
    scope: scopeSchema,
    scopeHash: z.string().min(1),
    profileRef: specRefSchema,
    principal: z
      .object({
        principalId: z.string().min(1),
        userId: z.string().min(1).optional(),
      })
      .strict(),
    attempts: z.number().int().nonnegative(),
    deadlineAt: z.string().datetime().optional(),
    nextAttemptAt: z.string().datetime().optional(),
    cancellationRequestedAt: z.string().datetime().optional(),
    failure: normalizedErrorSchema.optional(),
    failureFingerprint: z.string().min(1).optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .strict()
  .superRefine((operation, context) => {
    if (operation.scopeHash !== hashMemoryScope(operation.scope)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['scopeHash'],
        message: 'Operation scope hash does not match scope.',
      });
    }
  });

export interface ExternalProviderOperationStore {
  readonly durability: 'ephemeral' | 'durable';
  get(providerId: string, operationId: string): Promise<ExternalProviderOperation | null>;
  set(operation: ExternalProviderOperation): Promise<void>;
  listRecoverable(providerId?: string, now?: string): Promise<ExternalProviderOperation[]>;
}

export class InMemoryExternalProviderOperationStore implements ExternalProviderOperationStore {
  readonly durability = 'ephemeral' as const;
  private readonly values = new Map<string, ExternalProviderOperation>();

  async get(providerId: string, operationId: string): Promise<ExternalProviderOperation | null> {
    const value = this.values.get(externalProviderOperationId(providerId, operationId));
    return value ? structuredClone(value) : null;
  }

  async set(operation: ExternalProviderOperation): Promise<void> {
    const value = externalProviderOperationSchema.parse(operation);
    this.values.set(value.id, structuredClone(value));
  }

  async listRecoverable(
    providerId?: string,
    now = new Date().toISOString()
  ): Promise<ExternalProviderOperation[]> {
    return [...this.values.values()]
      .filter(
        (value) => (!providerId || value.providerId === providerId) && isRecoverable(value, now)
      )
      .map((value) => structuredClone(value));
  }
}

export class StructuredExternalProviderOperationStore implements ExternalProviderOperationStore {
  readonly durability = 'durable' as const;
  private readonly table: string;

  constructor(private readonly options: { store: StructuredStoreProvider; table?: string }) {
    this.table = options.table ?? 'memory_external_provider_operations';
  }

  async get(providerId: string, operationId: string): Promise<ExternalProviderOperation | null> {
    const value = await this.options.store.get<ExternalProviderOperation>(
      this.table,
      externalProviderOperationId(providerId, operationId)
    );
    return value ? externalProviderOperationSchema.parse(value) : null;
  }

  async set(operation: ExternalProviderOperation): Promise<void> {
    const value = externalProviderOperationSchema.parse(operation);
    const current = await this.options.store.get<ExternalProviderOperation>(this.table, value.id);
    if (current) await this.options.store.update(this.table, value.id, value);
    else await this.options.store.insert(this.table, value);
  }

  async listRecoverable(
    providerId?: string,
    now = new Date().toISOString()
  ): Promise<ExternalProviderOperation[]> {
    const values = await this.options.store.query<ExternalProviderOperation>(this.table, {
      where: providerId ? { providerId } : undefined,
      limit: 1000,
    });
    return values
      .map((value) => externalProviderOperationSchema.parse(value))
      .filter((value) => isRecoverable(value, now));
  }
}

export function resolveExternalProviderOperationStore(
  store: ExternalProviderOperationStore | undefined,
  profile: 'production' | 'test' | 'ephemeral'
): ExternalProviderOperationStore {
  const resolved = store ?? new InMemoryExternalProviderOperationStore();
  if (profile === 'production' && resolved.durability !== 'durable') {
    throw memoryError(
      'MEMORY_INVALID_INPUT',
      'Production external providers require a durable operation store.'
    );
  }
  return resolved;
}

export function externalProviderOperationId(providerId: string, operationId: string): string {
  return providerId + ':' + operationId;
}

export function createExternalProviderOperation(
  input: Omit<
    ExternalProviderOperation,
    'id' | 'scopeHash' | 'attempts' | 'createdAt' | 'updatedAt'
  > & { now?: string }
): ExternalProviderOperation {
  const now = input.now ?? new Date().toISOString();
  const { now: _now, ...operation } = input;
  return externalProviderOperationSchema.parse({
    ...operation,
    profileRef: {
      id: input.profileRef.id,
      version: input.profileRef.version,
      revision: input.profileRef.revision,
    },
    id: externalProviderOperationId(input.providerId, input.operationId),
    scopeHash: hashMemoryScope(input.scope),
    attempts: 0,
    createdAt: now,
    updatedAt: now,
  });
}

export function fingerprintExternalOperationFailure(error: NormalizedMemoryError): string {
  return sha256({ code: error.code, message: error.message, details: error.details });
}

function isRecoverable(value: ExternalProviderOperation, now: string): boolean {
  return (
    ['pending', 'running', 'reconcile_required'].includes(value.state) &&
    !value.cancellationRequestedAt &&
    (!value.nextAttemptAt || value.nextAttemptAt <= now)
  );
}
