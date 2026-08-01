import { z, type ZodType } from 'zod';
import { hashContent } from './cache';

export type AgentPromptRole = 'system' | 'developer';
export type AgentPromptVariableType = 'string' | 'number' | 'boolean' | 'array' | 'object';

export interface AgentPromptVariableSpec {
  name: string;
  type: AgentPromptVariableType;
  required?: boolean;
  default?: unknown;
  description?: string;
}

export interface AgentPromptSpec {
  id: string;
  version: string;
  name: string;
  description?: string;
  role: AgentPromptRole;
  template: string;
  variables?: AgentPromptVariableSpec[];
  stable?: boolean;
  cacheable?: boolean;
  ownerId?: string;
  tenantId?: string;
  scope?: 'global' | 'tenant' | 'owner';
  trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
  agentIds?: string[];
  domainIds?: string[];
  provenance?: Record<string, unknown>;
  revision?: number;
  contentHash?: string;
  metadata?: Record<string, unknown>;
}

export interface AgentPromptRef {
  id: string;
  version?: string;
  required?: boolean;
  priority?: number;
}

export interface ResolvedAgentPromptBlock {
  id: string;
  type: 'prompt-template';
  role: AgentPromptRole;
  content: string;
  hash: string;
  stable: boolean;
  cacheable: boolean;
  order: number;
  templateId: string;
  templateVersion: string;
  templateRevision: number;
  templateContentHash: string;
  scope: 'global' | 'tenant' | 'owner';
  trustLevel: 'trusted' | 'reviewed' | 'untrusted';
  ownerId?: string;
  tenantId?: string;
  provenance?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface AgentPromptPrincipal {
  principalId: string;
  tenantId?: string;
  agentId?: string;
  domainId?: string;
}

export interface AgentPromptApproval {
  taskId: string;
  subjectType: 'agent_prompt';
  subjectHash: string;
  promptId: string;
  promptVersion: string;
  promptRevision: number;
  contentHash: string;
  approvedBy: string;
  principalId?: string;
  tenantId?: string;
  agentId?: string;
  domainId?: string;
  expiresAt?: string;
  status: 'approved';
}

export interface AgentPromptResolutionContext {
  variables: Record<string, unknown>;
  principal: AgentPromptPrincipal;
  approvals?: AgentPromptApproval[];
}

export interface AgentPromptResolution {
  instructions: string;
  blocks: ResolvedAgentPromptBlock[];
  missing: AgentPromptRef[];
}

export const agentPromptVariableSpecSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['string', 'number', 'boolean', 'array', 'object']),
  required: z.boolean().optional(),
  default: z.unknown().optional(),
  description: z.string().optional(),
}) satisfies ZodType<AgentPromptVariableSpec>;

export const agentPromptSpecSchema = z.object({
  id: z.string().min(1),
  version: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  role: z.enum(['system', 'developer']),
  template: z.string().min(1),
  variables: z.array(agentPromptVariableSpecSchema).optional(),
  stable: z.boolean().optional(),
  cacheable: z.boolean().optional(),
  ownerId: z.string().min(1).optional(),
  tenantId: z.string().min(1).optional(),
  scope: z.enum(['global', 'tenant', 'owner']).optional(),
  trustLevel: z.enum(['trusted', 'reviewed', 'untrusted']).optional(),
  agentIds: z.array(z.string().min(1)).min(1).optional(),
  domainIds: z.array(z.string().min(1)).min(1).optional(),
  provenance: z.record(z.unknown()).optional(),
  revision: z.number().int().positive().optional(),
  contentHash: z
    .string()
    .regex(/^[a-f0-9]{64}$/)
    .optional(),
  metadata: z.record(z.unknown()).optional(),
}).superRefine((spec, context) => {
  const scope = spec.scope ?? 'global';
  if (scope === 'tenant' && !spec.tenantId) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['tenantId'],
      message: 'tenantId is required for tenant-scoped prompts',
    });
  }
  if (scope === 'owner' && !spec.ownerId) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['ownerId'],
      message: 'ownerId is required for owner-scoped prompts',
    });
  }
}) satisfies ZodType<AgentPromptSpec>;

export const agentPromptRefSchema = z.object({
  id: z.string().min(1),
  version: z.string().optional(),
  required: z.boolean().optional(),
  priority: z.number().int().optional(),
}) satisfies ZodType<AgentPromptRef>;

export class AgentPromptRegistry {
  private readonly specs = new Map<string, AgentPromptSpec>();
  private readonly versions = new Map<string, string[]>();

  register(
    input: AgentPromptSpec,
    options: { replace?: boolean; expectedRevision?: number } = {}
  ): AgentPromptSpec {
    const spec = agentPromptSpecSchema.parse(input);
    const key = promptKey(spec.id, spec.version);
    const current = this.specs.get(key);
    if (current && !options.replace) {
      throw new Error(`Agent prompt already registered: ${key}`);
    }
    if (
      options.expectedRevision !== undefined &&
      (current?.revision ?? 0) !== options.expectedRevision
    ) {
      throw new Error(`Agent prompt revision conflict: ${key}`);
    }
    const stored: AgentPromptSpec = {
      ...spec,
      revision: current ? (current.revision ?? 1) + 1 : (spec.revision ?? 1),
      contentHash: promptContentHash(spec),
    };
    this.specs.set(key, stored);
    const versions = new Set(this.versions.get(spec.id) ?? []);
    versions.add(spec.version);
    this.versions.set(spec.id, Array.from(versions).sort(compareVersions).reverse());
    return stored;
  }

  unregister(id: string, version?: string): boolean {
    if (version) {
      const removed = this.specs.delete(promptKey(id, version));
      this.refreshVersions(id);
      return removed;
    }
    let removed = false;
    for (const key of this.specs.keys()) {
      if (key.startsWith(`${id}@`)) {
        this.specs.delete(key);
        removed = true;
      }
    }
    this.versions.delete(id);
    return removed;
  }

  get(id: string, version?: string): AgentPromptSpec | null {
    const resolvedVersion = version ?? this.versions.get(id)?.[0];
    return resolvedVersion ? (this.specs.get(promptKey(id, resolvedVersion)) ?? null) : null;
  }

  list(): AgentPromptSpec[] {
    return Array.from(this.specs.values()).sort((left, right) => {
      const idOrder = left.id.localeCompare(right.id);
      return idOrder || compareVersions(right.version, left.version);
    });
  }

  resolve(refs: AgentPromptRef[], context: AgentPromptResolutionContext): AgentPromptResolution {
    const ordered = [...refs].sort((left, right) => (left.priority ?? 0) - (right.priority ?? 0));
    const blocks: ResolvedAgentPromptBlock[] = [];
    const missing: AgentPromptRef[] = [];
    for (const [index, ref] of ordered.entries()) {
      const spec = this.get(ref.id, ref.version);
      if (!spec) {
        if (ref.required) throw new Error(`Required agent prompt not registered: ${ref.id}`);
        missing.push(ref);
        continue;
      }
      assertPromptAccess(spec, context);
      const content = renderAgentPrompt(spec, context.variables);
      blocks.push({
        id: `${spec.id}@${spec.version}`,
        type: 'prompt-template',
        role: spec.role,
        content,
        hash: hashContent(content),
        stable: spec.stable ?? true,
        cacheable: spec.cacheable ?? true,
        order: ref.priority ?? index,
        templateId: spec.id,
        templateVersion: spec.version,
        templateRevision: spec.revision!,
        templateContentHash: spec.contentHash!,
        scope: spec.scope ?? 'global',
        trustLevel: spec.trustLevel ?? 'reviewed',
        ownerId: spec.ownerId,
        tenantId: spec.tenantId,
        provenance: spec.provenance,
        metadata: spec.metadata,
      });
    }
    return {
      instructions: blocks.map((block) => block.content).join('\n\n'),
      blocks,
      missing,
    };
  }

  private refreshVersions(id: string): void {
    const versions = Array.from(this.specs.values())
      .filter((spec) => spec.id === id)
      .map((spec) => spec.version)
      .sort(compareVersions)
      .reverse();
    if (versions.length) this.versions.set(id, versions);
    else this.versions.delete(id);
  }
}

function promptContentHash(spec: AgentPromptSpec): string {
  return hashContent(
    JSON.stringify({
      id: spec.id,
      version: spec.version,
      role: spec.role,
      template: spec.template,
      variables: spec.variables ?? [],
      stable: spec.stable ?? true,
      cacheable: spec.cacheable ?? true,
      ownerId: spec.ownerId,
      tenantId: spec.tenantId,
      scope: spec.scope ?? 'global',
      trustLevel: spec.trustLevel ?? 'reviewed',
      agentIds: spec.agentIds,
      domainIds: spec.domainIds,
      provenance: spec.provenance,
    })
  );
}

function assertPromptAccess(
  spec: AgentPromptSpec,
  context: AgentPromptResolutionContext
): void {
  const principal = context.principal;
  const scope = spec.scope ?? 'global';
  if (scope === 'tenant' && spec.tenantId !== principal.tenantId) {
    throw promptAccessError(spec, 'tenant scope does not match the request principal');
  }
  if (scope === 'owner' && spec.ownerId !== principal.principalId) {
    throw promptAccessError(spec, 'owner scope does not match the request principal');
  }
  if (spec.tenantId && spec.tenantId !== principal.tenantId) {
    throw promptAccessError(spec, 'tenant binding does not match the request principal');
  }
  if (spec.agentIds && (!principal.agentId || !spec.agentIds.includes(principal.agentId))) {
    throw promptAccessError(spec, 'agent binding does not match the request principal');
  }
  if (spec.domainIds && (!principal.domainId || !spec.domainIds.includes(principal.domainId))) {
    throw promptAccessError(spec, 'domain binding does not match the request principal');
  }
  if ((spec.trustLevel ?? 'reviewed') !== 'untrusted') return;
  const approval = context.approvals?.find(
    (candidate) =>
      candidate.status === 'approved' &&
      candidate.subjectType === 'agent_prompt' &&
      candidate.subjectHash === agentPromptSubjectHash(spec) &&
      candidate.promptId === spec.id &&
      candidate.promptVersion === spec.version &&
      candidate.promptRevision === spec.revision &&
      candidate.contentHash === spec.contentHash &&
      (!candidate.principalId || candidate.principalId === principal.principalId) &&
      (!candidate.tenantId || candidate.tenantId === principal.tenantId) &&
      (!candidate.agentId || candidate.agentId === principal.agentId) &&
      (!candidate.domainId || candidate.domainId === principal.domainId) &&
      (!candidate.expiresAt ||
        (Number.isFinite(Date.parse(candidate.expiresAt)) &&
          Date.parse(candidate.expiresAt) > Date.now()))
  );
  if (!approval) {
    throw promptAccessError(spec, 'untrusted prompt requires an exact, unexpired approval');
  }
}

export function agentPromptSubjectHash(
  spec: Pick<AgentPromptSpec, 'id' | 'version' | 'revision' | 'contentHash'>
): string {
  return hashContent(
    JSON.stringify({
      promptId: spec.id,
      promptVersion: spec.version,
      promptRevision: spec.revision,
      contentHash: spec.contentHash,
    })
  );
}

function promptAccessError(spec: AgentPromptSpec, reason: string): Error {
  return Object.assign(new Error(`Agent prompt access denied: ${spec.id}@${spec.version}; ${reason}`), {
    code: 'AGENT_PROMPT_ACCESS_DENIED',
    context: {
      promptId: spec.id,
      promptVersion: spec.version,
      promptRevision: spec.revision,
      contentHash: spec.contentHash,
    },
  });
}

export function renderAgentPrompt(
  spec: AgentPromptSpec,
  variables: Record<string, unknown>
): string {
  const resolved = { ...promptDefaults(spec.variables), ...variables };
  const declaredVariables = new Set((spec.variables ?? []).map((variable) => variable.name));
  const placeholders = Array.from(spec.template.matchAll(/\{\{\s*([^}]+?)\s*\}\}/g)).map((match) =>
    match[1].trim()
  );
  const undeclared = Array.from(
    new Set(placeholders.filter((name) => !declaredVariables.has(name)))
  );
  if (undeclared.length) {
    throw new Error(`Undeclared agent prompt variables: ${spec.id}.${undeclared.join(', ')}`);
  }
  for (const variable of spec.variables ?? []) {
    if (variable.required && isMissing(resolved[variable.name])) {
      throw new Error(`Required agent prompt variable missing: ${spec.id}.${variable.name}`);
    }
  }
  const rendered = spec.template.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_match, name: string) => {
    const value = resolved[name.trim()];
    return value === undefined || value === null ? '' : stringifyVariable(value);
  });
  return rendered;
}

function promptDefaults(variables: AgentPromptVariableSpec[] = []): Record<string, unknown> {
  return variables.reduce<Record<string, unknown>>((result, variable) => {
    if (variable.default !== undefined) result[variable.name] = variable.default;
    return result;
  }, {});
}

function stringifyVariable(value: unknown): string {
  return typeof value === 'string' ? value : JSON.stringify(value);
}

function isMissing(value: unknown): boolean {
  return value === undefined || value === null || value === '';
}

function promptKey(id: string, version: string): string {
  return `${id}@${version}`;
}

function compareVersions(left: string, right: string): number {
  return left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' });
}
