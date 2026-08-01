import { z, type ZodType } from 'zod';
import type { CommandExecutionRequest } from '../../contracts/command-execution';
import type { ExecutionActivityRequest } from '../../contracts/execution-activities';
import type {
  ExecutionRiskAssessment,
  ExecutionToolBinding,
} from '../../contracts/execution-governance';
import {
  EXECUTION_HUMAN_TASK_SUBJECT_VERSION,
  type ExecutionHumanTaskSubject,
  type ExecutionHumanTaskSubjectEnvelope,
} from '../../contracts/execution-human-task';
import type { ExecutionEnvironmentSpec } from '../../contracts/sandbox';
import { defineSpecSchema, exportSpecJsonSchemas } from '../../schemas';
import type { JsonSchema } from '../../specs';
import { commandExecutionRequestSchema } from '../command-execution';
import { executionActivityRequestSchema } from '../execution-activities';
import {
  executionRiskAssessmentSchema,
  executionToolBindingSchema,
} from '../execution-governance/contracts';
import {
  executionEnvironmentSpecSchema,
  resourceLimitSpecSchema,
  sandboxMountSpecSchema,
} from '../execution-environment';
import { hashCanonicalJson } from '../runtime/canonical-json';

const nonEmptyString = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });
const rawSha256Schema = z.string().regex(/^[a-f0-9]{64}$/u);
const runtimeSha256Schema = z.string().regex(/^sha256:[a-f0-9]{64}$/u);

const activityIdentitySchema = z
  .object({
    activityId: nonEmptyString,
    operationId: nonEmptyString,
    runId: nonEmptyString,
    stateAttemptId: nonEmptyString,
    workspaceId: nonEmptyString,
    fencingToken: z.number().int().positive(),
    deadlineAt: timestampSchema.optional(),
  })
  .strict();

const toolIdentitySchema = z
  .object({
    toolId: nonEmptyString,
    toolRevision: nonEmptyString.optional(),
    operation: z.enum(['file_read', 'file_write', 'command', 'sandbox', 'artifact']),
    executionProfileRef: nonEmptyString,
    sideEffectLevel: z.enum(['read', 'write', 'external_effect', 'irreversible']),
    humanReviewPolicyRef: nonEmptyString,
  })
  .strict();

const commandSnapshotSchema = z
  .object({
    executable: nonEmptyString,
    args: z.array(z.string()),
    cwd: nonEmptyString.optional(),
    shell: z.boolean(),
    environmentVariableNames: z.array(nonEmptyString),
    secretRefs: z.array(nonEmptyString),
    networkAuthorizationRef: nonEmptyString.optional(),
    expectedWorkspaceSnapshotHash: nonEmptyString.optional(),
    timeoutMs: z.number().int().positive().optional(),
    idleTimeoutMs: z.number().int().positive().optional(),
    maxStdoutBytes: z.number().int().positive().optional(),
    maxStderrBytes: z.number().int().positive().optional(),
  })
  .strict();

const networkSnapshotSchema = z
  .object({
    mode: z.enum(['disabled', 'restricted', 'enabled', 'task_authorized']),
    allowedDomains: z.array(nonEmptyString),
    allowedCidrs: z.array(nonEmptyString),
    allowedPorts: z.array(z.number().int().min(1).max(65_535)),
    allowedProtocols: z.array(z.enum(['tcp', 'udp', 'http', 'https', 'dns'])),
    proxyRef: nonEmptyString.optional(),
    authorizationRef: nonEmptyString.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.mode === 'task_authorized' && !value.authorizationRef) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['authorizationRef'],
        message: 'is required for task-authorized networking',
      });
    }
    if (value.mode !== 'task_authorized' && value.authorizationRef) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['authorizationRef'],
        message: 'is allowed only for task-authorized networking',
      });
    }
  });

const environmentSnapshotSchema = z
  .object({
    id: nonEmptyString,
    version: nonEmptyString,
    revision: nonEmptyString,
    provider: z.enum(['mock', 'local_process', 'docker', 'remote_sandbox', 'custom']),
    providerRef: nonEmptyString.optional(),
    providerId: nonEmptyString,
    providerRevision: nonEmptyString,
    imageDigest: nonEmptyString.optional(),
    mounts: z.array(sandboxMountSpecSchema),
    network: networkSnapshotSchema,
    resources: resourceLimitSpecSchema,
  })
  .strict();

const riskSnapshotSchema = z
  .object({
    assessmentId: nonEmptyString,
    level: z.enum(['low', 'medium', 'high', 'critical']),
    reasons: z.array(nonEmptyString).min(1),
    matchedRules: z.array(nonEmptyString),
    policyDecisionRef: nonEmptyString,
  })
  .strict();

const expectedEffectsSchema = z
  .object({
    workspaceWrite: z.boolean(),
    networkAccess: z.boolean(),
    secretAccess: z.boolean(),
    artifactCapture: z.boolean(),
  })
  .strict();

export const executionHumanTaskSubjectSchema = z
  .object({
    id: nonEmptyString,
    version: z.literal(EXECUTION_HUMAN_TASK_SUBJECT_VERSION),
    kind: z.literal('execution'),
    capturedAt: timestampSchema,
    principalId: nonEmptyString,
    inputHash: rawSha256Schema,
    activity: activityIdentitySchema,
    tool: toolIdentitySchema,
    command: commandSnapshotSchema,
    environment: environmentSnapshotSchema,
    risk: riskSnapshotSchema,
    expectedEffects: expectedEffectsSchema,
  })
  .strict() satisfies ZodType<ExecutionHumanTaskSubject>;

export const executionHumanTaskSubjectEnvelopeSchema = z
  .object({
    subjectRef: nonEmptyString,
    subjectHash: runtimeSha256Schema,
    subject: executionHumanTaskSubjectSchema,
  })
  .strict()
  .superRefine((value, context) => {
    if (value.subjectRef !== value.subject.id) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['subjectRef'],
        message: 'must match the Execution HumanTask subject id',
      });
    }
    if (value.subjectHash !== hashCanonicalJson(value.subject)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['subjectHash'],
        message: 'must match the canonical Execution HumanTask subject hash',
      });
    }
  }) satisfies ZodType<ExecutionHumanTaskSubjectEnvelope>;

export interface CreateExecutionHumanTaskSubjectInput {
  activity: ExecutionActivityRequest;
  binding: ExecutionToolBinding;
  toolRevision?: string;
  riskAssessment: ExecutionRiskAssessment;
  environment: ExecutionEnvironmentSpec;
  providerId: string;
  providerRevision: string;
  inputHash: string;
  policyDecisionRef: string;
  capturedAt: string;
}

export function createExecutionHumanTaskSubject(
  input: CreateExecutionHumanTaskSubjectInput
): ExecutionHumanTaskSubjectEnvelope {
  const activity = executionActivityRequestSchema.parse(input.activity);
  const binding = executionToolBindingSchema.parse(input.binding);
  const toolRevision = input.toolRevision ? nonEmptyString.parse(input.toolRevision) : undefined;
  const riskAssessment = executionRiskAssessmentSchema.parse(input.riskAssessment);
  const environment = executionEnvironmentSpecSchema.parse(input.environment);
  const command = commandExecutionRequestSchema.parse(activity.request);
  const providerId = nonEmptyString.parse(input.providerId);
  const providerRevision = nonEmptyString.parse(input.providerRevision);
  const inputHash = rawSha256Schema.parse(input.inputHash);
  const policyDecisionRef = nonEmptyString.parse(input.policyDecisionRef);
  const capturedAt = timestampSchema.parse(input.capturedAt);

  const humanReviewPolicyRef = requireApprovalBinding(binding, riskAssessment);
  assertEnvironmentIdentity(command, environment);
  assertSecretPolicy(command, environment);
  assertNetworkAuthorization(command, environment);

  const subject: ExecutionHumanTaskSubject = executionHumanTaskSubjectSchema.parse({
    id: `execution-human-task-subject:${activity.activityId}`,
    version: EXECUTION_HUMAN_TASK_SUBJECT_VERSION,
    kind: 'execution',
    capturedAt,
    principalId: command.principal.principalId,
    inputHash,
    activity: {
      activityId: activity.activityId,
      operationId: activity.operationId,
      runId: activity.runId,
      stateAttemptId: activity.stateAttemptId,
      workspaceId: activity.workspaceId,
      fencingToken: activity.fencingToken,
      ...(activity.deadlineAt ? { deadlineAt: activity.deadlineAt } : {}),
    },
    tool: {
      toolId: binding.toolId,
      ...(toolRevision ? { toolRevision } : {}),
      operation: binding.operation,
      executionProfileRef: binding.executionProfileRef,
      sideEffectLevel: binding.sideEffectLevel,
      humanReviewPolicyRef,
    },
    command: {
      executable: command.executable,
      args: command.args ?? [],
      ...(command.cwd ? { cwd: command.cwd } : {}),
      shell: command.shell ?? false,
      environmentVariableNames: Object.keys(command.env ?? {}).sort(compareUnicodeCodePoints),
      secretRefs: [...(command.secretRefs ?? [])].sort(compareUnicodeCodePoints),
      ...(command.networkAuthorizationRef
        ? { networkAuthorizationRef: command.networkAuthorizationRef }
        : {}),
      ...(command.expectedWorkspaceSnapshotHash
        ? { expectedWorkspaceSnapshotHash: command.expectedWorkspaceSnapshotHash }
        : {}),
      ...(command.timeoutMs ? { timeoutMs: command.timeoutMs } : {}),
      ...(command.idleTimeoutMs ? { idleTimeoutMs: command.idleTimeoutMs } : {}),
      ...(command.maxStdoutBytes ? { maxStdoutBytes: command.maxStdoutBytes } : {}),
      ...(command.maxStderrBytes ? { maxStderrBytes: command.maxStderrBytes } : {}),
    },
    environment: {
      id: environment.id,
      version: environment.version,
      revision: environment.revision,
      provider: environment.provider,
      ...(environment.providerRef ? { providerRef: environment.providerRef } : {}),
      providerId,
      providerRevision,
      ...(environment.image?.digest ? { imageDigest: environment.image.digest } : {}),
      mounts: environment.filesystem.mounts,
      network: {
        mode: environment.network.mode,
        allowedDomains: sorted(environment.network.allowedDomains),
        allowedCidrs: sorted(environment.network.allowedCidrs),
        allowedPorts: [...(environment.network.allowedPorts ?? [])].sort(
          (left, right) => left - right
        ),
        allowedProtocols: sorted(environment.network.allowedProtocols),
        ...(environment.network.proxyRef ? { proxyRef: environment.network.proxyRef } : {}),
        ...(command.networkAuthorizationRef
          ? { authorizationRef: command.networkAuthorizationRef }
          : {}),
      },
      resources: environment.resources,
    },
    risk: {
      assessmentId: riskAssessment.id,
      level: riskAssessment.level,
      reasons: [...riskAssessment.reasons].sort(compareUnicodeCodePoints),
      matchedRules: sorted(riskAssessment.matchedRules),
      policyDecisionRef,
    },
    expectedEffects: {
      workspaceWrite: binding.sideEffectLevel !== 'read',
      networkAccess: environment.network.mode !== 'disabled',
      secretAccess: (command.secretRefs?.length ?? 0) > 0,
      artifactCapture: command.captureArtifacts === true,
    },
  });

  return executionHumanTaskSubjectEnvelopeSchema.parse({
    subjectRef: subject.id,
    subjectHash: hashCanonicalJson(subject),
    subject,
  });
}

export function validateExecutionHumanTaskSubject(input: unknown): ExecutionHumanTaskSubject {
  return executionHumanTaskSubjectSchema.parse(input);
}

export function validateExecutionHumanTaskSubjectEnvelope(
  input: unknown
): ExecutionHumanTaskSubjectEnvelope {
  return executionHumanTaskSubjectEnvelopeSchema.parse(input);
}

function requireApprovalBinding(
  binding: ExecutionToolBinding,
  riskAssessment: ExecutionRiskAssessment
): string {
  if (!binding.humanReviewPolicyRef) {
    throw new Error('Execution HumanTask requires a HumanReview policy binding');
  }
  if (!riskAssessment.requiresApproval) {
    throw new Error('Execution HumanTask requires an approval-bearing risk assessment');
  }
  return binding.humanReviewPolicyRef;
}

function assertEnvironmentIdentity(
  command: CommandExecutionRequest,
  environment: ExecutionEnvironmentSpec
): void {
  if (!environment.revision) {
    throw new Error('Execution HumanTask requires an environment revision');
  }
  if (command.environmentRef.id !== environment.id) {
    throw new Error('Execution HumanTask environment id does not match the command reference');
  }
  if (command.environmentRef.version && command.environmentRef.version !== environment.version) {
    throw new Error('Execution HumanTask environment version does not match the command reference');
  }
  if (command.environmentRef.revision && command.environmentRef.revision !== environment.revision) {
    throw new Error(
      'Execution HumanTask environment revision does not match the command reference'
    );
  }
}

function assertSecretPolicy(
  command: CommandExecutionRequest,
  environment: ExecutionEnvironmentSpec
): void {
  const allowed = environment.secrets.allowedSecretRefs;
  if (!allowed) return;
  const allowedSet = new Set(allowed);
  const denied = (command.secretRefs ?? []).find((secretRef) => !allowedSet.has(secretRef));
  if (denied) {
    throw new Error('Execution HumanTask command requests a Secret outside the environment policy');
  }
}

function assertNetworkAuthorization(
  command: CommandExecutionRequest,
  environment: ExecutionEnvironmentSpec
): void {
  if (environment.network.mode === 'task_authorized' && !command.networkAuthorizationRef) {
    throw new Error('Execution HumanTask requires task network authorization');
  }
  if (environment.network.mode !== 'task_authorized' && command.networkAuthorizationRef) {
    throw new Error('Execution HumanTask network authorization is not valid for this policy mode');
  }
}

function sorted<T extends string>(values: T[] | undefined): T[] {
  return [...(values ?? [])].sort(compareUnicodeCodePoints);
}

function compareUnicodeCodePoints(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };
const stringArrayJsonSchema: JsonSchema = {
  type: 'array',
  items: nonEmptyStringJsonSchema,
};
const positiveIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 1 };
const positiveNumberJsonSchema: JsonSchema = { type: 'number', exclusiveMinimum: 0 };

const activityIdentityJsonSchema: JsonSchema = {
  type: 'object',
  required: ['activityId', 'operationId', 'runId', 'stateAttemptId', 'workspaceId', 'fencingToken'],
  properties: {
    activityId: nonEmptyStringJsonSchema,
    operationId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    stateAttemptId: nonEmptyStringJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    fencingToken: positiveIntegerJsonSchema,
    deadlineAt: timestampJsonSchema,
  },
  additionalProperties: false,
};

const toolIdentityJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'toolId',
    'operation',
    'executionProfileRef',
    'sideEffectLevel',
    'humanReviewPolicyRef',
  ],
  properties: {
    toolId: nonEmptyStringJsonSchema,
    toolRevision: nonEmptyStringJsonSchema,
    operation: { enum: ['file_read', 'file_write', 'command', 'sandbox', 'artifact'] },
    executionProfileRef: nonEmptyStringJsonSchema,
    sideEffectLevel: { enum: ['read', 'write', 'external_effect', 'irreversible'] },
    humanReviewPolicyRef: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

const commandSnapshotJsonSchema: JsonSchema = {
  type: 'object',
  required: ['executable', 'args', 'shell', 'environmentVariableNames', 'secretRefs'],
  properties: {
    executable: nonEmptyStringJsonSchema,
    args: { type: 'array', items: { type: 'string' } },
    cwd: nonEmptyStringJsonSchema,
    shell: { type: 'boolean' },
    environmentVariableNames: stringArrayJsonSchema,
    secretRefs: stringArrayJsonSchema,
    networkAuthorizationRef: nonEmptyStringJsonSchema,
    expectedWorkspaceSnapshotHash: nonEmptyStringJsonSchema,
    timeoutMs: positiveIntegerJsonSchema,
    idleTimeoutMs: positiveIntegerJsonSchema,
    maxStdoutBytes: positiveIntegerJsonSchema,
    maxStderrBytes: positiveIntegerJsonSchema,
  },
  additionalProperties: false,
};

const networkSnapshotJsonSchema: JsonSchema = {
  type: 'object',
  required: ['mode', 'allowedDomains', 'allowedCidrs', 'allowedPorts', 'allowedProtocols'],
  properties: {
    mode: { enum: ['disabled', 'restricted', 'enabled', 'task_authorized'] },
    allowedDomains: stringArrayJsonSchema,
    allowedCidrs: stringArrayJsonSchema,
    allowedPorts: {
      type: 'array',
      items: { type: 'integer', minimum: 1, maximum: 65_535 },
    },
    allowedProtocols: {
      type: 'array',
      items: { enum: ['tcp', 'udp', 'http', 'https', 'dns'] },
    },
    proxyRef: nonEmptyStringJsonSchema,
    authorizationRef: nonEmptyStringJsonSchema,
  },
  allOf: [
    {
      if: { properties: { mode: { const: 'task_authorized' } }, required: ['mode'] },
      then: {
        properties: { authorizationRef: nonEmptyStringJsonSchema },
        required: ['authorizationRef'],
      },
      else: {
        not: {
          properties: { authorizationRef: {} },
          required: ['authorizationRef'],
        },
      },
    },
  ],
  additionalProperties: false,
};

const mountSnapshotJsonSchema: JsonSchema = {
  type: 'object',
  required: ['sourceRef', 'targetPath', 'mode', 'type'],
  properties: {
    sourceRef: nonEmptyStringJsonSchema,
    targetPath: nonEmptyStringJsonSchema,
    mode: { enum: ['ro', 'rw'] },
    type: { enum: ['bind', 'volume', 'artifact', 'workspace', 'tmpfs'] },
    propagation: { enum: ['private', 'rprivate'] },
    noExec: { type: 'boolean' },
    noSuid: { type: 'boolean' },
    noDev: { type: 'boolean' },
  },
  additionalProperties: false,
};

const resourceSnapshotJsonSchema: JsonSchema = {
  type: 'object',
  properties: {
    cpuCores: positiveNumberJsonSchema,
    cpuQuotaMicros: positiveIntegerJsonSchema,
    cpuPeriodMicros: positiveIntegerJsonSchema,
    cpuShares: positiveIntegerJsonSchema,
    maxCpuSeconds: positiveNumberJsonSchema,
    memoryMb: positiveNumberJsonSchema,
    memorySwapMb: positiveNumberJsonSchema,
    oomKillDisable: { type: 'boolean' },
    diskBytes: positiveIntegerJsonSchema,
    tempBytes: positiveIntegerJsonSchema,
    maxWriteBytes: positiveIntegerJsonSchema,
    blockIoWeight: positiveIntegerJsonSchema,
    pidsLimit: positiveIntegerJsonSchema,
    maxOpenFiles: positiveIntegerJsonSchema,
    maxStdoutBytes: positiveIntegerJsonSchema,
    maxStderrBytes: positiveIntegerJsonSchema,
    maxCombinedOutputBytes: positiveIntegerJsonSchema,
    maxExecutionSeconds: positiveNumberJsonSchema,
    maxIdleSeconds: positiveNumberJsonSchema,
  },
  additionalProperties: false,
};

const environmentSnapshotJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'version',
    'revision',
    'provider',
    'providerId',
    'providerRevision',
    'mounts',
    'network',
    'resources',
  ],
  properties: {
    id: nonEmptyStringJsonSchema,
    version: nonEmptyStringJsonSchema,
    revision: nonEmptyStringJsonSchema,
    provider: { enum: ['mock', 'local_process', 'docker', 'remote_sandbox', 'custom'] },
    providerRef: nonEmptyStringJsonSchema,
    providerId: nonEmptyStringJsonSchema,
    providerRevision: nonEmptyStringJsonSchema,
    imageDigest: nonEmptyStringJsonSchema,
    mounts: { type: 'array', items: mountSnapshotJsonSchema },
    network: networkSnapshotJsonSchema,
    resources: resourceSnapshotJsonSchema,
  },
  additionalProperties: false,
};

const riskSnapshotJsonSchema: JsonSchema = {
  type: 'object',
  required: ['assessmentId', 'level', 'reasons', 'matchedRules', 'policyDecisionRef'],
  properties: {
    assessmentId: nonEmptyStringJsonSchema,
    level: { enum: ['low', 'medium', 'high', 'critical'] },
    reasons: { ...stringArrayJsonSchema, minItems: 1 },
    matchedRules: stringArrayJsonSchema,
    policyDecisionRef: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

const expectedEffectsJsonSchema: JsonSchema = {
  type: 'object',
  required: ['workspaceWrite', 'networkAccess', 'secretAccess', 'artifactCapture'],
  properties: {
    workspaceWrite: { type: 'boolean' },
    networkAccess: { type: 'boolean' },
    secretAccess: { type: 'boolean' },
    artifactCapture: { type: 'boolean' },
  },
  additionalProperties: false,
};

export const executionHumanTaskSubjectJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'version',
    'kind',
    'capturedAt',
    'principalId',
    'inputHash',
    'activity',
    'tool',
    'command',
    'environment',
    'risk',
    'expectedEffects',
  ],
  properties: {
    id: nonEmptyStringJsonSchema,
    version: { const: EXECUTION_HUMAN_TASK_SUBJECT_VERSION },
    kind: { const: 'execution' },
    capturedAt: timestampJsonSchema,
    principalId: nonEmptyStringJsonSchema,
    inputHash: { type: 'string', pattern: '^[a-f0-9]{64}$' },
    activity: activityIdentityJsonSchema,
    tool: toolIdentityJsonSchema,
    command: commandSnapshotJsonSchema,
    environment: environmentSnapshotJsonSchema,
    risk: riskSnapshotJsonSchema,
    expectedEffects: expectedEffectsJsonSchema,
  },
  additionalProperties: false,
};

export const executionHumanTaskSubjectExample: ExecutionHumanTaskSubject = {
  id: 'execution-human-task-subject:activity.execution.example',
  version: EXECUTION_HUMAN_TASK_SUBJECT_VERSION,
  kind: 'execution',
  capturedAt: '2026-07-24T10:00:00.000Z',
  principalId: 'principal.example',
  inputHash: 'a'.repeat(64),
  activity: {
    activityId: 'activity.execution.example',
    operationId: 'operation.execution.example',
    runId: 'run.example',
    stateAttemptId: 'state.execute:attempt.1',
    workspaceId: 'workspace.example',
    fencingToken: 1,
  },
  tool: {
    toolId: 'execution.command.run',
    operation: 'command',
    executionProfileRef: 'execution-profile:container-safe:v1',
    sideEffectLevel: 'external_effect',
    humanReviewPolicyRef: 'human-review:execution-high-risk:v1',
  },
  command: {
    executable: 'node',
    args: ['scripts/check.mjs'],
    shell: false,
    environmentVariableNames: ['NODE_ENV'],
    secretRefs: [],
  },
  environment: {
    id: 'execution-environment.example',
    version: '1.0.0',
    revision: 'environment-revision.example',
    provider: 'docker',
    providerId: 'docker.default',
    providerRevision: 'provider-revision.example',
    imageDigest: 'sha256:example',
    mounts: [],
    network: {
      mode: 'disabled',
      allowedDomains: [],
      allowedCidrs: [],
      allowedPorts: [],
      allowedProtocols: [],
    },
    resources: { oomKillDisable: false },
  },
  risk: {
    assessmentId: 'execution-risk:operation.example',
    level: 'high',
    reasons: ['shell_execution'],
    matchedRules: ['execution-risk.shell'],
    policyDecisionRef: 'policy-decision:operation.example',
  },
  expectedEffects: {
    workspaceWrite: true,
    networkAccess: false,
    secretAccess: false,
    artifactCapture: false,
  },
};

export const executionHumanTaskSubjectDefinition = defineSpecSchema<ExecutionHumanTaskSubject>({
  id: 'ExecutionHumanTaskSubject',
  zod: executionHumanTaskSubjectSchema,
  jsonSchema: executionHumanTaskSubjectJsonSchema,
  example: executionHumanTaskSubjectExample,
});

export const executionHumanTaskSubjectDefinitions = [executionHumanTaskSubjectDefinition] as const;

export const executionHumanTaskSubjectJsonSchemas = exportSpecJsonSchemas(
  executionHumanTaskSubjectDefinitions
);
