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
  metadata?: Record<string, unknown>;
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
  metadata: z.record(z.unknown()).optional(),
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

  register(input: AgentPromptSpec, options: { replace?: boolean } = {}): void {
    const spec = agentPromptSpecSchema.parse(input);
    const key = promptKey(spec.id, spec.version);
    if (this.specs.has(key) && !options.replace) {
      throw new Error(`Agent prompt already registered: ${key}`);
    }
    this.specs.set(key, spec);
    const versions = new Set(this.versions.get(spec.id) ?? []);
    versions.add(spec.version);
    this.versions.set(spec.id, Array.from(versions).sort(compareVersions).reverse());
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

  resolve(refs: AgentPromptRef[], variables: Record<string, unknown>): AgentPromptResolution {
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
      const content = renderAgentPrompt(spec, variables);
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

export function renderAgentPrompt(
  spec: AgentPromptSpec,
  variables: Record<string, unknown>
): string {
  const resolved = { ...promptDefaults(spec.variables), ...variables };
  for (const variable of spec.variables ?? []) {
    if (variable.required && isMissing(resolved[variable.name])) {
      throw new Error(`Required agent prompt variable missing: ${spec.id}.${variable.name}`);
    }
  }
  const rendered = spec.template.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_match, name: string) => {
    const value = resolved[name.trim()];
    return value === undefined || value === null ? '' : stringifyVariable(value);
  });
  const unresolved = Array.from(rendered.matchAll(/\{\{\s*([^}]+?)\s*\}\}/g)).map(
    (match) => match[1]
  );
  if (unresolved.length)
    throw new Error(`Unresolved agent prompt variables: ${unresolved.join(', ')}`);
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
