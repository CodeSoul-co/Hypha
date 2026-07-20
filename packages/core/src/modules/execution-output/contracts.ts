import { z, type ZodType } from 'zod';
import type {
  ExecutionOutputCollectionItem,
  ExecutionOutputCollectionPlan,
  ExecutionOutputCollectionPolicy,
  ExecutionOutputSkipReason,
} from '../../contracts/execution-output';
import type { JsonSchema } from '../../specs';
import { artifactKindSchema } from '../artifact';
import { workspaceRelativePathSchema } from '../workspace';
import { relativePathJsonSchema } from '../workspace/operations';

const nonEmptyString = z.string().min(1);
const nonNegativeInteger = z.number().int().nonnegative();

export const executionOutputPatternSchema = z
  .string()
  .min(1)
  .max(512)
  .superRefine((value, context) => {
    const normalized = normalizePatternForValidation(value);
    if (
      normalized.includes('\0') ||
      normalized.includes('\\') ||
      normalized.startsWith('/') ||
      /^[A-Za-z]:/u.test(normalized)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'must be a safe relative POSIX-style pattern',
      });
    }

    const segments = normalized.split('/');
    if (
      segments.some(
        (segment) =>
          !segment ||
          segment === '.' ||
          segment === '..' ||
          (segment.includes('**') && segment !== '**') ||
          segment.includes('[') ||
          segment.includes(']') ||
          segment.includes('{') ||
          segment.includes('}')
      )
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'supports only path segments, *, **, and ? wildcards',
      });
    }
  });

export const executionOutputCollectionPolicySchema = z
  .object({
    includePatterns: z.array(executionOutputPatternSchema).min(1).max(64).optional(),
    excludePatterns: z.array(executionOutputPatternSchema).min(1).max(64).optional(),
    maxArtifacts: nonNegativeInteger.optional(),
    maxTotalBytes: nonNegativeInteger.optional(),
    classifyByExtension: z.boolean().optional(),
    finalizeOnSuccess: z.boolean().optional(),
  })
  .strict()
  .superRefine((value, context) => {
    addDuplicatePatternIssues(value.includePatterns, 'includePatterns', context);
    addDuplicatePatternIssues(value.excludePatterns, 'excludePatterns', context);
  }) satisfies ZodType<ExecutionOutputCollectionPolicy>;

export const executionOutputSkipReasonSchema = z.enum([
  'not_included',
  'excluded',
  'unsupported_mutation',
  'missing_integrity_evidence',
  'artifact_limit',
  'byte_limit',
]) satisfies ZodType<ExecutionOutputSkipReason>;

export const executionOutputTerminalStatusSchema = z.enum([
  'cancelled',
  'completed',
  'failed',
  'timed_out',
  'oom_killed',
  'resource_exceeded',
  'quarantined',
]);

export const executionOutputCollectionItemSchema = z
  .object({
    relativePath: workspaceRelativePathSchema,
    contentHash: nonEmptyString,
    sizeBytes: nonNegativeInteger,
    kind: artifactKindSchema,
    mimeType: nonEmptyString.optional(),
    existingArtifactRef: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<ExecutionOutputCollectionItem>;

export const executionOutputSkippedSchema = z
  .object({
    not_included: nonNegativeInteger,
    excluded: nonNegativeInteger,
    unsupported_mutation: nonNegativeInteger,
    missing_integrity_evidence: nonNegativeInteger,
    artifact_limit: nonNegativeInteger,
    byte_limit: nonNegativeInteger,
  })
  .strict() satisfies ZodType<Record<ExecutionOutputSkipReason, number>>;

export const executionOutputCollectionPlanSchema = z
  .object({
    executionId: nonEmptyString,
    status: executionOutputTerminalStatusSchema,
    items: z.array(executionOutputCollectionItemSchema),
    existingArtifactRefs: z.array(nonEmptyString),
    totalBytes: nonNegativeInteger,
    finalize: z.boolean(),
    skipped: executionOutputSkippedSchema,
  })
  .strict()
  .superRefine((value, context) => {
    const paths = new Set<string>();
    value.items.forEach((item, index) => {
      const path = item.relativePath.normalize('NFKC').replace(/\\/gu, '/');
      if (paths.has(path)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['items', index, 'relativePath'],
          message: 'must be unique within an output collection plan',
        });
      }
      paths.add(path);
    });
    if (new Set(value.existingArtifactRefs).size !== value.existingArtifactRefs.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['existingArtifactRefs'],
        message: 'must not contain duplicate Artifact references',
      });
    }
    const calculatedBytes = value.items.reduce((total, item) => total + item.sizeBytes, 0);
    if (calculatedBytes !== value.totalBytes) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['totalBytes'],
        message: 'must equal the sum of collected item sizes',
      });
    }
    if (value.finalize && value.status !== 'completed') {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['finalize'],
        message: 'can only be true for completed Executions',
      });
    }
  }) satisfies ZodType<ExecutionOutputCollectionPlan>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const nonNegativeIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 0 };
const patternJsonSchema: JsonSchema = {
  type: 'string',
  minLength: 1,
  maxLength: 512,
  pattern: '^(?!/)(?![A-Za-z]:)(?!.*\\\\)(?!.*//)(?!.*[\\[\\]{}])[^\\u0000]+$',
  not: {
    anyOf: [
      { pattern: '(^|/)\\.{1,2}(/|$)' },
      { pattern: '(^|/)(?:[^/]+\\*\\*|\\*\\*[^/]+)(/|$)' },
    ],
  },
  description: 'Safe relative POSIX-style pattern using path segments plus *, **, and ? wildcards.',
};

export const executionOutputCollectionPolicyJsonSchema: JsonSchema = {
  type: 'object',
  properties: {
    includePatterns: {
      type: 'array',
      items: patternJsonSchema,
      minItems: 1,
      maxItems: 64,
      uniqueItems: true,
    },
    excludePatterns: {
      type: 'array',
      items: patternJsonSchema,
      minItems: 1,
      maxItems: 64,
      uniqueItems: true,
    },
    maxArtifacts: nonNegativeIntegerJsonSchema,
    maxTotalBytes: nonNegativeIntegerJsonSchema,
    classifyByExtension: { type: 'boolean' },
    finalizeOnSuccess: { type: 'boolean' },
  },
  additionalProperties: false,
};

export const executionOutputCollectionItemJsonSchema: JsonSchema = {
  type: 'object',
  required: ['relativePath', 'contentHash', 'sizeBytes', 'kind'],
  properties: {
    relativePath: relativePathJsonSchema,
    contentHash: nonEmptyStringJsonSchema,
    sizeBytes: nonNegativeIntegerJsonSchema,
    kind: { enum: artifactKindSchema.options },
    mimeType: nonEmptyStringJsonSchema,
    existingArtifactRef: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

const skippedJsonSchema: JsonSchema = {
  type: 'object',
  required: executionOutputSkipReasonSchema.options,
  properties: Object.fromEntries(
    executionOutputSkipReasonSchema.options.map((reason) => [reason, nonNegativeIntegerJsonSchema])
  ),
  additionalProperties: false,
};

export const executionOutputCollectionPlanJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'executionId',
    'status',
    'items',
    'existingArtifactRefs',
    'totalBytes',
    'finalize',
    'skipped',
  ],
  properties: {
    executionId: nonEmptyStringJsonSchema,
    status: { enum: executionOutputTerminalStatusSchema.options },
    items: { type: 'array', items: executionOutputCollectionItemJsonSchema },
    existingArtifactRefs: {
      type: 'array',
      items: nonEmptyStringJsonSchema,
      uniqueItems: true,
    },
    totalBytes: nonNegativeIntegerJsonSchema,
    finalize: { type: 'boolean' },
    skipped: skippedJsonSchema,
  },
  allOf: [
    {
      if: { properties: { finalize: { const: true } }, required: ['finalize'] },
      then: { properties: { status: { const: 'completed' } }, required: ['status'] },
    },
  ],
  additionalProperties: false,
};

export const executionOutputJsonSchemas: Record<string, JsonSchema> = {
  ExecutionOutputCollectionPolicy: executionOutputCollectionPolicyJsonSchema,
  ExecutionOutputCollectionItem: executionOutputCollectionItemJsonSchema,
  ExecutionOutputCollectionPlan: executionOutputCollectionPlanJsonSchema,
};

export const executionOutputCollectionPolicyExample: ExecutionOutputCollectionPolicy = {
  includePatterns: ['outputs/**', 'reports/*.json'],
  excludePatterns: ['outputs/tmp/**'],
  maxArtifacts: 25,
  maxTotalBytes: 10_485_760,
  classifyByExtension: true,
  finalizeOnSuccess: true,
};

export const executionOutputCollectionPlanExample: ExecutionOutputCollectionPlan = {
  executionId: 'execution.example',
  status: 'completed',
  items: [
    {
      relativePath: 'outputs/report.json',
      contentHash: 'sha256:report',
      sizeBytes: 12,
      kind: 'dataset',
      mimeType: 'application/json',
    },
  ],
  existingArtifactRefs: ['artifact:stdout'],
  totalBytes: 12,
  finalize: true,
  skipped: emptyExecutionOutputSkipCounts(),
};

export function validateExecutionOutputCollectionPolicy(
  input: unknown
): ExecutionOutputCollectionPolicy {
  return executionOutputCollectionPolicySchema.parse(input);
}

export function validateExecutionOutputCollectionPlan(
  input: unknown
): ExecutionOutputCollectionPlan {
  return executionOutputCollectionPlanSchema.parse(input);
}

export function emptyExecutionOutputSkipCounts(): Record<ExecutionOutputSkipReason, number> {
  return {
    not_included: 0,
    excluded: 0,
    unsupported_mutation: 0,
    missing_integrity_evidence: 0,
    artifact_limit: 0,
    byte_limit: 0,
  };
}

function addDuplicatePatternIssues(
  patterns: string[] | undefined,
  field: 'includePatterns' | 'excludePatterns',
  context: z.RefinementCtx
): void {
  if (!patterns) return;
  const seen = new Set<string>();
  patterns.forEach((pattern, index) => {
    const normalized = normalizePatternForValidation(pattern);
    if (seen.has(normalized)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [field, index],
        message: 'duplicates another pattern after normalization',
      });
    }
    seen.add(normalized);
  });
}

function normalizePatternForValidation(value: string): string {
  let normalized = value.normalize('NFKC');
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const decoded = decodeURIComponent(normalized);
      if (decoded === normalized) break;
      normalized = decoded.normalize('NFKC');
    } catch {
      break;
    }
  }
  return normalized;
}
