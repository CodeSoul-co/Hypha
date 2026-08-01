import { z, type ZodType } from 'zod';
import type {
  ManagedMemoryRecord,
  ManagedMemoryScope,
  MemoryPrincipal,
  NormalizedMemoryError,
} from './contracts';
import type { MemoryActivityOperation } from './integration-contracts';
import { managedMemoryRecordSchema, normalizedMemoryErrorSchema } from './record-contract';
import { hashMemoryScope, memoryError, sha256, stableStringify } from './memory-utils';

export interface MemoryProviderRecordBinding {
  memoryId: string;
  versionId: string;
  revision: number;
  scopeHash: string;
  providerId: string;
}

export interface MemoryProviderReturnEvidence {
  schemaVersion: '1.0';
  operationId: string;
  operation: MemoryActivityOperation;
  inputHash: string;
  principalHash: string;
  scopeHash: string;
  providerId: string;
  providerRevision?: string;
  outputHash: string;
  recordBindings: MemoryProviderRecordBinding[];
  terminal: {
    status: 'completed' | 'partial' | 'failed' | 'cancelled';
    error?: NormalizedMemoryError;
  };
  proofHash: string;
}

const hashSchema = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const providerOperationSchema = z.enum([
  'add',
  'extract',
  'search',
  'get',
  'list',
  'update',
  'write',
  'maintain',
  'delete',
  'history',
  'build_context',
]);

export const memoryProviderReturnEvidenceSchema: ZodType<MemoryProviderReturnEvidence> = z
  .object({
    schemaVersion: z.literal('1.0'),
    operationId: z.string().min(1),
    operation: providerOperationSchema,
    inputHash: hashSchema,
    principalHash: hashSchema,
    scopeHash: hashSchema,
    providerId: z.string().min(1),
    providerRevision: z.string().min(1).optional(),
    outputHash: hashSchema,
    recordBindings: z.array(
      z
        .object({
          memoryId: z.string().min(1),
          versionId: z.string().min(1),
          revision: z.number().int().positive(),
          scopeHash: hashSchema,
          providerId: z.string().min(1),
        })
        .strict()
    ),
    terminal: z
      .object({
        status: z.enum(['completed', 'partial', 'failed', 'cancelled']),
        error: normalizedMemoryErrorSchema.optional(),
      })
      .strict(),
    proofHash: hashSchema,
  })
  .strict()
  .superRefine((evidence, context) => {
    const successful = evidence.terminal.status === 'completed';
    if (successful && evidence.terminal.error) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['terminal', 'error'],
        message: 'Successful provider evidence must not contain an error.',
      });
    }
    if (['failed', 'cancelled'].includes(evidence.terminal.status) && !evidence.terminal.error) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['terminal', 'error'],
        message: 'Failed or cancelled provider evidence requires a normalized error.',
      });
    }
  });

export interface MemoryProviderEvidenceContext {
  operationId: string;
  operation: MemoryActivityOperation;
  principal: MemoryPrincipal;
  scope: ManagedMemoryScope;
  providerId: string;
  providerRevision?: string;
  input: unknown;
  output: unknown;
  status: MemoryProviderReturnEvidence['terminal']['status'];
  error?: NormalizedMemoryError;
}

export function createMemoryProviderReturnEvidence(
  context: MemoryProviderEvidenceContext
): MemoryProviderReturnEvidence {
  const records = validateProviderOutput(context);
  const body = {
    schemaVersion: '1.0' as const,
    operationId: context.operationId,
    operation: context.operation,
    inputHash: sha256(context.input),
    principalHash: sha256(context.principal),
    scopeHash: hashMemoryScope(context.scope),
    providerId: context.providerId,
    providerRevision: context.providerRevision,
    outputHash: sha256(context.output),
    recordBindings: records.map((record) => ({
      memoryId: record.id,
      versionId: record.versionId,
      revision: record.revision,
      scopeHash: record.scopeHash,
      providerId: record.provenance.providerId,
    })),
    terminal: {
      status: context.status,
      error: context.error,
    },
  };
  return memoryProviderReturnEvidenceSchema.parse({ ...body, proofHash: sha256(body) });
}

export function verifyMemoryProviderReturnEvidence(
  evidence: unknown,
  context: Omit<MemoryProviderEvidenceContext, 'status' | 'error'>
): MemoryProviderReturnEvidence {
  const parsed = parseEvidence(evidence);
  const { proofHash, ...body } = parsed;
  const mismatches = [
    sha256(body) !== proofHash ? 'proofHash' : undefined,
    parsed.operationId !== context.operationId ? 'operationId' : undefined,
    parsed.operation !== context.operation ? 'operation' : undefined,
    parsed.inputHash !== sha256(context.input) ? 'inputHash' : undefined,
    parsed.principalHash !== sha256(context.principal) ? 'principalHash' : undefined,
    parsed.scopeHash !== hashMemoryScope(context.scope) ? 'scopeHash' : undefined,
    parsed.providerId !== context.providerId ? 'providerId' : undefined,
    parsed.providerRevision !== context.providerRevision ? 'providerRevision' : undefined,
    parsed.outputHash !== sha256(context.output) ? 'outputHash' : undefined,
  ].filter((value): value is string => value !== undefined);
  if (mismatches.length > 0) {
    throw invalidEvidence(
      'Provider return evidence identity or proof mismatch: ' + mismatches.join(', ') + '.'
    );
  }
  const records = validateProviderOutput({
    ...context,
    status: parsed.terminal.status,
    error: parsed.terminal.error,
  });
  const expectedBindings = records.map((record) => ({
    memoryId: record.id,
    versionId: record.versionId,
    revision: record.revision,
    scopeHash: record.scopeHash,
    providerId: record.provenance.providerId,
  }));
  if (stableStringify(parsed.recordBindings) !== stableStringify(expectedBindings)) {
    throw invalidEvidence('Provider return evidence record bindings do not match the output.');
  }
  return parsed;
}

function validateProviderOutput(context: MemoryProviderEvidenceContext): ManagedMemoryRecord[] {
  if (context.status === 'completed' && context.error) {
    throw invalidEvidence('A successful provider result must not contain an error.');
  }
  if (['failed', 'cancelled'].includes(context.status) && !context.error) {
    throw invalidEvidence('A failed or cancelled provider result requires a normalized error.');
  }
  const records = outputRecords(context.operation, context.output, context.operationId);
  const expectedScopeHash = hashMemoryScope(context.scope);
  for (const record of records) {
    if (
      stableStringify(record.scope) !== stableStringify(context.scope) ||
      record.scopeHash !== expectedScopeHash
    ) {
      throw invalidEvidence('Provider returned a record for a different memory scope.');
    }
  }
  if (context.operation === 'update') {
    const request = asObject(context.input);
    const memoryId = readString(request, 'memoryId');
    const expectedRevision = readNumber(request, 'expectedRevision');
    if (
      records.some(
        (record) =>
          (memoryId !== undefined && record.id !== memoryId) ||
          (expectedRevision !== undefined && record.revision !== expectedRevision + 1)
      )
    ) {
      throw invalidEvidence('Provider update returned the wrong logical record or revision.');
    }
  }
  return records;
}

function outputRecords(
  operation: MemoryActivityOperation,
  output: unknown,
  operationId: string
): ManagedMemoryRecord[] {
  let values: unknown[] = [];
  if (operation === 'add' || operation === 'update') {
    const result = asObject(output);
    if (readString(result, 'operationId') !== operationId || !Array.isArray(result.records)) {
      throw invalidEvidence('Provider write result is missing operation or record evidence.');
    }
    if (['failed', 'rejected'].includes(readString(result, 'status') ?? '')) {
      throw invalidEvidence(
        'Provider write returned a failed terminal without a normalized error.'
      );
    }
    values = result.records;
  } else if (operation === 'search') {
    if (!Array.isArray(output)) throw invalidEvidence('Provider search result must be an array.');
    values = output.map((item) => asObject(item).record);
  } else if (operation === 'get') {
    values = output === null ? [] : [output];
  } else if (operation === 'list') {
    const result = asObject(output);
    if (!Array.isArray(result.records) || typeof result.hasMore !== 'boolean') {
      throw invalidEvidence('Provider list result is missing pagination or record evidence.');
    }
    values = result.records;
  } else if (operation === 'history') {
    if (!Array.isArray(output)) throw invalidEvidence('Provider history result must be an array.');
    values = output.map((item) => {
      const version = asObject(item);
      const record = asObject(version.record);
      if (
        readString(version, 'memoryId') !== readString(record, 'id') ||
        readString(version, 'versionId') !== readString(record, 'versionId') ||
        readNumber(version, 'revision') !== readNumber(record, 'revision')
      ) {
        throw invalidEvidence('Provider history changed logical record/version identity.');
      }
      return record;
    });
  } else if (operation === 'delete') {
    const result = asObject(output);
    if (
      readString(result, 'operationId') !== operationId ||
      !Array.isArray(result.deletedMemoryIds)
    ) {
      throw invalidEvidence('Provider delete result is missing operation evidence.');
    }
  }
  return values.map((value) => parseRecord(value));
}

function parseRecord(value: unknown): ManagedMemoryRecord {
  const parsed = managedMemoryRecordSchema.safeParse(value);
  if (!parsed.success) throw invalidEvidence('Provider record violates the public Runtime Schema.');
  return parsed.data as ManagedMemoryRecord;
}

function parseEvidence(value: unknown): MemoryProviderReturnEvidence {
  const parsed = memoryProviderReturnEvidenceSchema.safeParse(value);
  if (!parsed.success) throw invalidEvidence('Provider return evidence is missing or malformed.');
  return parsed.data;
}

function invalidEvidence(message: string): NormalizedMemoryError {
  return memoryError('MEMORY_PROVIDER_UNAVAILABLE', message, false, {
    providerReturnEvidenceInvalid: true,
  });
}

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function readString(value: Record<string, unknown>, key: string): string | undefined {
  return typeof value[key] === 'string' ? (value[key] as string) : undefined;
}

function readNumber(value: Record<string, unknown>, key: string): number | undefined {
  return typeof value[key] === 'number' ? (value[key] as number) : undefined;
}
