import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import type { CommandExecutionRequest } from '../../contracts/command-execution';
import type { ExecutionActivityRequest } from '../../contracts/execution-activities';
import type {
  ExecutionRiskAssessment,
  ExecutionToolBinding,
} from '../../contracts/execution-governance';
import type { ExecutionEnvironmentSpec } from '../../contracts/sandbox';
import { executionActivityRequestExample } from '../execution-activities';
import {
  executionRiskAssessmentExample,
  executionToolBindingExample,
} from '../execution-governance/contracts';
import { executionEnvironmentSpecExample } from '../execution-environment';
import {
  createExecutionHumanTaskSubject,
  executionHumanTaskSubjectExample,
  executionHumanTaskSubjectJsonSchema,
  validateExecutionHumanTaskSubject,
  validateExecutionHumanTaskSubjectEnvelope,
  type CreateExecutionHumanTaskSubjectInput,
} from './index';

describe('Execution HumanTask subject', () => {
  it('creates a versioned Runtime-compatible subject identity', () => {
    const envelope = createExecutionHumanTaskSubject(fixture());

    expect(envelope.subjectRef).toBe(envelope.subject.id);
    expect(envelope.subjectHash).toMatch(/^sha256:[a-f0-9]{64}$/u);
    expect(envelope.subject.version).toBe('1.0.0');
    expect(envelope.subject.kind).toBe('execution');
    expect(validateExecutionHumanTaskSubjectEnvelope(envelope)).toEqual(envelope);
  });

  it('keeps secret values, environment values, stdin, and metadata out of the subject', () => {
    const input = fixture();
    input.activity = {
      ...input.activity,
      request: {
        ...input.activity.request,
        env: {
          API_TOKEN: 'environment-secret-value',
          NODE_ENV: 'test',
        },
        secretRefs: ['secret.api-token'],
        stdin: 'stdin-secret-value',
        metadata: { password: 'metadata-secret-value' },
      },
    } as ExecutionActivityRequest;
    input.environment = {
      ...input.environment,
      secrets: {
        ...input.environment.secrets,
        allowedSecretRefs: ['secret.api-token'],
        injectionMode: 'brokered',
        ttlSeconds: 60,
      },
    };

    const envelope = createExecutionHumanTaskSubject(input);
    const serialized = JSON.stringify(envelope.subject);

    expect(envelope.subject.command.environmentVariableNames).toEqual(['API_TOKEN', 'NODE_ENV']);
    expect(envelope.subject.command.secretRefs).toEqual(['secret.api-token']);
    expect(serialized).not.toContain('environment-secret-value');
    expect(serialized).not.toContain('stdin-secret-value');
    expect(serialized).not.toContain('metadata-secret-value');
  });

  it('canonicalizes unordered security lists while preserving one stable hash', () => {
    const left = fixture();
    left.activity = {
      ...left.activity,
      request: {
        ...left.activity.request,
        env: { ZETA: '1', ALPHA: '2' },
        secretRefs: ['secret.zeta', 'secret.alpha'],
      },
    } as ExecutionActivityRequest;
    left.environment = {
      ...left.environment,
      network: {
        ...left.environment.network,
        mode: 'restricted',
        allowedDomains: ['z.example', 'a.example'],
        allowedPorts: [443, 80],
        allowedProtocols: ['https', 'http'],
      },
      secrets: {
        ...left.environment.secrets,
        allowedSecretRefs: ['secret.alpha', 'secret.zeta'],
        injectionMode: 'brokered',
        ttlSeconds: 60,
      },
    };
    left.riskAssessment = {
      ...left.riskAssessment,
      reasons: ['z-risk', 'a-risk'],
      matchedRules: ['z-rule', 'a-rule'],
    };
    const right = structuredClone(left);
    const rightCommand = commandRequest(right.activity);
    rightCommand.env = { ALPHA: 'changed-but-redacted', ZETA: 'also-redacted' };
    rightCommand.secretRefs = ['secret.alpha', 'secret.zeta'];
    right.environment.network.allowedDomains = ['a.example', 'z.example'];
    right.environment.network.allowedPorts = [80, 443];
    right.environment.network.allowedProtocols = ['http', 'https'];
    right.riskAssessment.reasons = ['a-risk', 'z-risk'];
    right.riskAssessment.matchedRules = ['a-rule', 'z-rule'];

    const leftEnvelope = createExecutionHumanTaskSubject(left);
    const rightEnvelope = createExecutionHumanTaskSubject(right);

    expect(rightEnvelope.subject).toEqual(leftEnvelope.subject);
    expect(rightEnvelope.subjectHash).toBe(leftEnvelope.subjectHash);
  });

  it.each([
    [
      'command arguments',
      (input: CreateExecutionHumanTaskSubjectInput) => {
        input.activity = {
          ...input.activity,
          request: { ...input.activity.request, args: ['changed'] },
        } as ExecutionActivityRequest;
      },
    ],
    [
      'fencing token',
      (input: CreateExecutionHumanTaskSubjectInput) => {
        input.activity = { ...input.activity, fencingToken: input.activity.fencingToken + 1 };
      },
    ],
    [
      'provider revision',
      (input: CreateExecutionHumanTaskSubjectInput) => {
        input.providerRevision = 'provider-revision.changed';
      },
    ],
    [
      'environment revision',
      (input: CreateExecutionHumanTaskSubjectInput) => {
        input.environment = { ...input.environment, revision: 'environment-revision.changed' };
      },
    ],
    [
      'input hash',
      (input: CreateExecutionHumanTaskSubjectInput) => {
        input.inputHash = 'b'.repeat(64);
      },
    ],
  ])('changes the subject hash when %s changes', (_name, mutate) => {
    const original = fixture();
    const changed = structuredClone(original);
    mutate(changed);

    expect(createExecutionHumanTaskSubject(changed).subjectHash).not.toBe(
      createExecutionHumanTaskSubject(original).subjectHash
    );
  });

  it('requires a HumanReview binding and approval-bearing risk assessment', () => {
    const withoutPolicy = fixture();
    withoutPolicy.binding = {
      ...withoutPolicy.binding,
      humanReviewPolicyRef: undefined,
    };
    expect(() => createExecutionHumanTaskSubject(withoutPolicy)).toThrow(/HumanReview policy/u);

    const withoutApproval = fixture();
    withoutApproval.riskAssessment = {
      ...withoutApproval.riskAssessment,
      level: 'medium',
      requiresApproval: false,
    };
    expect(() => createExecutionHumanTaskSubject(withoutApproval)).toThrow(/approval-bearing/u);
  });

  it('fails closed when environment identity does not match the command reference', () => {
    const idMismatch = fixture();
    idMismatch.environment = { ...idMismatch.environment, id: 'environment.other' };
    expect(() => createExecutionHumanTaskSubject(idMismatch)).toThrow(/environment id/u);

    const versionMismatch = fixture();
    versionMismatch.environment = { ...versionMismatch.environment, version: '2.0.0' };
    expect(() => createExecutionHumanTaskSubject(versionMismatch)).toThrow(/environment version/u);

    const revisionMismatch = fixture();
    revisionMismatch.activity = {
      ...revisionMismatch.activity,
      request: {
        ...revisionMismatch.activity.request,
        environmentRef: {
          ...commandRequest(revisionMismatch.activity).environmentRef,
          revision: 'expected-environment-revision',
        },
      },
    } as ExecutionActivityRequest;
    expect(() => createExecutionHumanTaskSubject(revisionMismatch)).toThrow(
      /environment revision/u
    );

    const missingRevision = fixture();
    missingRevision.environment = { ...missingRevision.environment, revision: undefined };
    expect(() => createExecutionHumanTaskSubject(missingRevision)).toThrow(/environment revision/u);
  });

  it('requires task-scoped network authorization without accepting it in other modes', () => {
    const missingAuthorization = fixture();
    missingAuthorization.environment = {
      ...missingAuthorization.environment,
      network: {
        ...missingAuthorization.environment.network,
        mode: 'task_authorized',
        taskAuthorizationTtlSeconds: 60,
      },
    };
    expect(() => createExecutionHumanTaskSubject(missingAuthorization)).toThrow(
      /network authorization/u
    );

    const unnecessaryAuthorization = fixture();
    unnecessaryAuthorization.activity = {
      ...unnecessaryAuthorization.activity,
      request: {
        ...unnecessaryAuthorization.activity.request,
        networkAuthorizationRef: 'network-authorization.unnecessary',
      },
    } as ExecutionActivityRequest;
    expect(() => createExecutionHumanTaskSubject(unnecessaryAuthorization)).toThrow(
      /not valid for this policy mode/u
    );
  });

  it('rejects Secret references outside the environment allow list', () => {
    const input = fixture();
    input.activity = {
      ...input.activity,
      request: {
        ...input.activity.request,
        secretRefs: ['secret.denied'],
      },
    } as ExecutionActivityRequest;
    input.environment = {
      ...input.environment,
      secrets: {
        ...input.environment.secrets,
        allowedSecretRefs: ['secret.allowed'],
        injectionMode: 'brokered',
        ttlSeconds: 60,
      },
    };

    expect(() => createExecutionHumanTaskSubject(input)).toThrow(/outside the environment policy/u);
  });

  it('rejects a tampered subject or hash in the envelope', () => {
    const envelope = createExecutionHumanTaskSubject(fixture());

    expect(() =>
      validateExecutionHumanTaskSubjectEnvelope({
        ...envelope,
        subjectHash: `sha256:${'f'.repeat(64)}`,
      })
    ).toThrow(/canonical/u);
    expect(() =>
      validateExecutionHumanTaskSubjectEnvelope({
        ...envelope,
        subject: {
          ...envelope.subject,
          command: {
            ...envelope.subject.command,
            env: { TOKEN: 'forbidden' },
          },
        },
      })
    ).toThrow();
  });

  it('keeps the public example valid in Zod and JSON Schema', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);

    expect(validateExecutionHumanTaskSubject(executionHumanTaskSubjectExample)).toEqual(
      executionHumanTaskSubjectExample
    );
    expect(
      ajv.validate(executionHumanTaskSubjectJsonSchema, executionHumanTaskSubjectExample),
      ajv.errorsText()
    ).toBe(true);
  });
});

function fixture(): CreateExecutionHumanTaskSubjectInput {
  const command = commandRequest(executionActivityRequestExample);
  const environment: ExecutionEnvironmentSpec = {
    ...structuredClone(executionEnvironmentSpecExample),
    id: command.environmentRef.id,
    version: command.environmentRef.version ?? '0.1.0',
    revision: 'environment-revision.example',
  };
  const binding: ExecutionToolBinding = structuredClone(executionToolBindingExample);
  const riskAssessment: ExecutionRiskAssessment = structuredClone(executionRiskAssessmentExample);

  return {
    activity: structuredClone(executionActivityRequestExample),
    binding,
    toolRevision: 'tool-revision.example',
    riskAssessment,
    environment,
    providerId: 'docker.default',
    providerRevision: 'provider-revision.example',
    inputHash: 'a'.repeat(64),
    policyDecisionRef: 'policy-decision:operation.example',
    capturedAt: '2026-07-24T10:00:00.000Z',
  };
}

function commandRequest(activity: ExecutionActivityRequest): CommandExecutionRequest {
  if (!('executable' in activity.request)) {
    throw new Error('Expected a command Execution activity fixture');
  }
  return activity.request;
}
