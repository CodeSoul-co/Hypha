import fs from 'fs/promises';
import path from 'path';
import { parse as parseYaml } from 'yaml';
import { z, type ZodType } from 'zod';
import {
  defineSpecSchema,
  exportSpecJsonSchemas,
  jsonSchemaSchema,
  specMetadataSchema,
  versionedSpecSchema,
  type JsonSchema,
  type SideEffectLevel,
  type SpecMetadata,
  type VersionedSpec,
} from '@hypha/core';
import {
  effectiveAgentCapabilitySnapshotSchema,
  hashToolContract,
  type EffectiveAgentCapabilitySnapshot,
} from '@hypha/tools';

export * from './remote-registry';

export interface SkillRef {
  id: string;
  version?: string;
}

export type SkillActivationMode = 'always' | 'keyword' | 'regex' | 'intent' | 'manual';

export interface SkillActivationPolicy {
  mode: SkillActivationMode;
  patterns?: string[];
}

export interface SkillAssetRef {
  path: string;
  type: 'reference' | 'script' | 'asset';
  loadPolicy?: 'frontmatter_only' | 'on_activation' | 'never';
}

export interface SkillSpec extends VersionedSpec, SpecMetadata {
  id: string;
  version: string;
  name?: string;
  description: string;
  enabled?: boolean;
  priority?: number;
  activationPolicy?: SkillActivationPolicy;
  instructions?: string;
  references?: SkillAssetRef[];
  scripts?: SkillAssetRef[];
  assets?: SkillAssetRef[];
  allowedTools?: string[];
  requiredTools?: string[];
  requiredMCPServers?: string[];
  memoryAccessPolicy?: string;
  sideEffectPolicy?: string;
  contextBudget?: number;
  inputSchema?: JsonSchema;
  outputContract?: JsonSchema;
  evaluationCases?: string[];
  provenance?: Record<string, unknown>;
  trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
}

export interface SkillResolutionContext {
  agentSkillRefs: SkillRef[];
  intent?: string;
  inputText?: string;
  allowedSkills?: string[];
  requiredSkills?: string[];
  manualSkillIds?: string[];
  availableToolRefs?: string[];
  metadata?: Record<string, unknown>;
}

export interface ResolvedSkill {
  spec: SkillSpec;
  loadedInstructions?: string;
  loadedReferences: SkillAssetRef[];
}

export interface SkillSelection {
  spec: SkillSpec;
  reason: string;
  matchedPatterns: string[];
  priority: number;
}

export interface SkillSelectionRejection {
  skillId: string;
  reason: string;
}

export interface SkillSelectionResult {
  selected: SkillSelection[];
  rejected: SkillSelectionRejection[];
}

export interface SkillPolicyInput {
  selection: SkillSelection;
  context: SkillResolutionContext;
}

export interface SkillPolicyDecision {
  allowed: boolean;
  reason?: string;
  requiresHumanReview?: boolean;
  allowedTools: string[];
  policyId?: string;
  metadata?: Record<string, unknown>;
}

export interface SkillPolicy {
  evaluate(input: SkillPolicyInput): Promise<SkillPolicyDecision>;
}

export interface LoadedSkillAsset extends SkillAssetRef {
  absolutePath?: string;
  content?: string;
  truncated?: boolean;
}

export interface LoadedSkillContext {
  id: string;
  version: string;
  name?: string;
  description: string;
  instructions?: string;
  references: LoadedSkillAsset[];
  allowedTools: string[];
  requiredTools: string[];
  requiredMCPServers: string[];
  memoryAccessPolicy?: string;
  sideEffectPolicy?: string;
  trustLevel?: SkillSpec['trustLevel'];
  provenance?: Record<string, unknown>;
  policyDecision: SkillPolicyDecision;
  activation: {
    reason: string;
    matchedPatterns: string[];
  };
  metadata?: Record<string, unknown>;
}

export interface AgentCapabilityConstraint {
  allowedToolIds?: string[];
  allowedMCPServerIds?: string[];
  memoryAccess?: EffectiveAgentCapabilitySnapshot['memoryAccess'];
  allowedExecutionProfiles?: string[];
  maximumSideEffectLevel?: SideEffectLevel;
  policyRefs?: string[];
}

export interface EffectiveAgentCapabilitySnapshotInput {
  runId: string;
  agentId: string;
  principalId: string;
  tenantId?: string;
  domainId?: string;
  createdAt?: string;
  expiresAt?: string;
  agent: AgentCapabilityConstraint;
  domain: AgentCapabilityConstraint;
  activeSkills: LoadedSkillContext[];
}

export interface SkillContextLoadInput {
  selection: SkillSelection;
  policyDecision: SkillPolicyDecision;
  maxChars?: number;
}

export interface SkillLoader {
  load(): Promise<SkillSpec[]>;
}

export interface LocalSkillLoaderOptions {
  directories: string[];
  recursive?: boolean;
  includeDisabled?: boolean;
}

export interface ParsedSkillMarkdown {
  filePath: string;
  slug: string;
  spec: SkillSpec;
}

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export class SkillRegistry {
  private readonly skills = new Map<string, SkillSpec>();

  register(skill: SkillSpec): void {
    const parsed = validateSkillSpec(skill);
    this.skills.set(parsed.id, parsed);
  }

  registerMany(skills: SkillSpec[]): void {
    for (const skill of skills) {
      this.register(skill);
    }
  }

  get(skillId: string): SkillSpec | null {
    return this.skills.get(skillId) ?? null;
  }

  list(): SkillSpec[] {
    return Array.from(this.skills.values()).sort(
      (left, right) =>
        (right.priority ?? 0) - (left.priority ?? 0) || left.id.localeCompare(right.id)
    );
  }
}

export class LocalSkillLoader implements SkillLoader {
  constructor(private readonly options: LocalSkillLoaderOptions) {}

  async load(): Promise<SkillSpec[]> {
    const files = await this.listFiles();
    const loaded: SkillSpec[] = [];
    for (const file of files) {
      const parsed = await loadSkillMarkdownFile(file);
      if (this.options.includeDisabled || parsed.spec.enabled !== false) {
        loaded.push(parsed.spec);
      }
    }
    return loaded.sort(
      (left, right) =>
        (right.priority ?? 0) - (left.priority ?? 0) || left.id.localeCompare(right.id)
    );
  }

  async loadInto(registry: SkillRegistry): Promise<SkillSpec[]> {
    const skills = await this.load();
    registry.registerMany(skills);
    return skills;
  }

  private async listFiles(): Promise<string[]> {
    const allFiles: string[] = [];
    for (const directory of this.options.directories) {
      allFiles.push(...(await listLocalSkillFiles(directory, this.options.recursive ?? true)));
    }
    return Array.from(new Set(allFiles)).sort();
  }
}

export class SkillSelector {
  constructor(private readonly registry: SkillRegistry) {}

  select(context: SkillResolutionContext): SkillSelectionResult {
    const allowed = context.allowedSkills ? new Set(context.allowedSkills) : null;
    const required = new Set(context.requiredSkills ?? []);
    const attached = new Set(context.agentSkillRefs.map((ref) => ref.id));
    const rejected: SkillSelectionRejection[] = [];
    const selected: SkillSelection[] = [];

    for (const ref of context.agentSkillRefs) {
      const spec = this.registry.get(ref.id);
      if (!spec) {
        rejected.push({ skillId: ref.id, reason: 'Skill is not registered.' });
        continue;
      }
      if (ref.version && ref.version !== spec.version) {
        rejected.push({
          skillId: ref.id,
          reason: `Skill version mismatch: requested ${ref.version}, found ${spec.version}.`,
        });
        continue;
      }
      if (spec.enabled === false) {
        rejected.push({ skillId: spec.id, reason: 'Skill is disabled.' });
        continue;
      }
      if (allowed && !allowed.has(spec.id)) {
        rejected.push({ skillId: spec.id, reason: 'Skill is not allowed by the current scope.' });
        continue;
      }

      const isRequired = required.has(spec.id);
      const activation = evaluateSkillActivation(spec, context);
      if (!activation.active && !isRequired) {
        rejected.push({ skillId: spec.id, reason: activation.reason });
        continue;
      }
      selected.push({
        spec,
        reason: isRequired ? 'Skill is required by the current scope.' : activation.reason,
        matchedPatterns: activation.matchedPatterns,
        priority: spec.priority ?? 0,
      });
    }

    for (const skillId of required) {
      if (!attached.has(skillId)) {
        rejected.push({ skillId, reason: 'Required skill is not attached to the agent.' });
      }
    }

    return {
      selected: selected.sort(
        (left, right) => right.priority - left.priority || left.spec.id.localeCompare(right.spec.id)
      ),
      rejected,
    };
  }
}

export class DefaultSkillPolicy implements SkillPolicy {
  constructor(
    private readonly options: {
      allowedTrustLevels?: Array<NonNullable<SkillSpec['trustLevel']>>;
      requireRegisteredTools?: boolean;
    } = {}
  ) {}

  async evaluate(input: SkillPolicyInput): Promise<SkillPolicyDecision> {
    const { selection, context } = input;
    const skill = selection.spec;
    const trustLevel = skill.trustLevel ?? 'reviewed';
    const allowedTrustLevels = this.options.allowedTrustLevels ?? ['trusted', 'reviewed'];
    if (!allowedTrustLevels.includes(trustLevel)) {
      return {
        allowed: false,
        allowedTools: [],
        policyId: 'skill.default-policy',
        reason: `Skill ${skill.id} trustLevel=${trustLevel} is not allowed.`,
      };
    }

    const availableTools = new Set(context.availableToolRefs ?? []);
    const requiredTools = skill.requiredTools ?? [];
    const missingRequiredTools = requiredTools.filter((toolId) => !availableTools.has(toolId));
    if (missingRequiredTools.length > 0) {
      return {
        allowed: false,
        allowedTools: [],
        policyId: 'skill.default-policy',
        reason: `Skill ${skill.id} requires unavailable tools: ${missingRequiredTools.join(', ')}.`,
      };
    }

    if (
      this.options.requireRegisteredTools &&
      skill.allowedTools?.some((toolId) => !availableTools.has(toolId))
    ) {
      const missingAllowedTools = skill.allowedTools.filter(
        (toolId) => !availableTools.has(toolId)
      );
      return {
        allowed: false,
        allowedTools: [],
        policyId: 'skill.default-policy',
        reason: `Skill ${skill.id} declares tools outside the current scope: ${missingAllowedTools.join(', ')}.`,
      };
    }

    const allowedTools = skill.allowedTools
      ? skill.allowedTools.filter((toolId) => availableTools.has(toolId))
      : Array.from(availableTools);
    return {
      allowed: true,
      allowedTools,
      requiresHumanReview: skill.sideEffectPolicy === 'human_review',
      policyId: 'skill.default-policy',
      metadata: {
        trustLevel,
        requiredTools,
      },
    };
  }
}

export class SkillContextLoader {
  constructor(
    private readonly options: {
      defaultMaxChars?: number;
      maxReferences?: number;
      maxFileBytes?: number;
      readTimeoutMs?: number;
    } = {}
  ) {}

  async load(input: SkillContextLoadInput): Promise<LoadedSkillContext> {
    const maxChars = Math.max(
      1,
      input.maxChars ?? input.selection.spec.contextBudget ?? this.options.defaultMaxChars ?? 4000
    );
    let remaining = maxChars;
    const instructions = truncateToBudget(input.selection.spec.instructions, remaining);
    remaining -= instructions?.length ?? 0;
    const references = await this.loadActivationReferences(input.selection.spec, remaining);

    return {
      id: input.selection.spec.id,
      version: input.selection.spec.version,
      name: input.selection.spec.name,
      description: input.selection.spec.description,
      instructions,
      references,
      allowedTools: input.policyDecision.allowedTools,
      requiredTools: input.selection.spec.requiredTools ?? [],
      requiredMCPServers: input.selection.spec.requiredMCPServers ?? [],
      memoryAccessPolicy: input.selection.spec.memoryAccessPolicy,
      sideEffectPolicy: input.selection.spec.sideEffectPolicy,
      trustLevel: input.selection.spec.trustLevel,
      provenance: input.selection.spec.provenance,
      policyDecision: input.policyDecision,
      activation: {
        reason: input.selection.reason,
        matchedPatterns: input.selection.matchedPatterns,
      },
      metadata: {
        contextBudget: maxChars,
        loadedReferenceCount: references.filter((reference) => reference.content).length,
      },
    };
  }

  private async loadActivationReferences(
    skill: SkillSpec,
    remainingChars: number
  ): Promise<LoadedSkillAsset[]> {
    const refs = [
      ...(skill.references ?? []),
      ...(skill.scripts ?? []),
      ...(skill.assets ?? []),
    ].filter((asset) => asset.loadPolicy === 'on_activation');
    const maxReferences = this.options.maxReferences ?? 32;
    if (refs.length > maxReferences) {
      throw new Error(`Skill ${skill.id} exceeds the ${maxReferences} activation asset limit.`);
    }
    const filePath =
      typeof skill.provenance?.filePath === 'string' ? skill.provenance.filePath : undefined;
    const baseDir = filePath ? await fs.realpath(path.dirname(filePath)) : undefined;
    const loaded: LoadedSkillAsset[] = [];
    let remaining = remainingChars;

    for (const ref of refs) {
      const asset: LoadedSkillAsset = { ...ref };
      if (remaining > 0 && ref.type === 'reference' && baseDir) {
        if (!isSafeRelativeSkillPath(ref.path)) {
          throw new Error(`Skill ${skill.id} contains an invalid reference path.`);
        }
        const requestedPath = path.resolve(baseDir, ref.path);
        const absolutePath = await fs.realpath(requestedPath);
        if (
          !isPathInside(baseDir, absolutePath) ||
          normalizeFilesystemPath(requestedPath) !== normalizeFilesystemPath(absolutePath)
        ) {
          throw new Error(`Skill ${skill.id} reference escapes its root or traverses a symlink.`);
        }
        const stat = await fs.stat(absolutePath);
        const maxFileBytes = this.options.maxFileBytes ?? 256 * 1024;
        if (!stat.isFile() || stat.size > maxFileBytes) {
          throw new Error(
            `Skill ${skill.id} reference is not a regular file within the size budget.`
          );
        }
        const content = await readTextWithTimeout(
          absolutePath,
          this.options.readTimeoutMs ?? 2_000
        );
        const truncated = truncateToBudget(content, remaining) ?? '';
        asset.content = truncated;
        asset.truncated = truncated.length < content.length;
        remaining -= truncated.length;
      }
      loaded.push(asset);
    }
    return loaded;
  }
}

function isSafeRelativeSkillPath(value: string): boolean {
  if (
    !value ||
    value.includes('\0') ||
    path.isAbsolute(value) ||
    /^[a-zA-Z]:/.test(value) ||
    value.startsWith('\\\\')
  ) {
    return false;
  }
  const normalized = value.replace(/\\/g, '/');
  let decoded: string;
  try {
    decoded = decodeURIComponent(normalized);
  } catch {
    return false;
  }
  return !decoded.split('/').some((segment) => segment === '..' || segment === '');
}

function normalizeFilesystemPath(value: string): string {
  const normalized = path.normalize(value);
  return process.platform === 'win32' ? normalized.toLowerCase() : normalized;
}

function isPathInside(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

async function readTextWithTimeout(filePath: string, timeoutMs: number): Promise<string> {
  let timeout: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      fs.readFile(filePath, 'utf8'),
      new Promise<string>((_resolve, reject) => {
        timeout = setTimeout(() => reject(new Error('Skill reference read timed out.')), timeoutMs);
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

export function createEffectiveAgentCapabilitySnapshot(
  input: EffectiveAgentCapabilitySnapshotInput
): Readonly<EffectiveAgentCapabilitySnapshot> {
  const allowedToolIds = intersectConstraints([
    input.agent.allowedToolIds,
    input.domain.allowedToolIds,
    ...input.activeSkills.map((skill) => skill.allowedTools),
  ]);
  const baseMCPServers = intersectConstraints([
    input.agent.allowedMCPServerIds,
    input.domain.allowedMCPServerIds,
  ]);
  const requiredMCPServers = uniqueSorted(
    input.activeSkills.flatMap((skill) => skill.requiredMCPServers)
  );
  const allowedMCPServerIds =
    baseMCPServers.length > 0 ? baseMCPServers : requiredMCPServers;
  const missingMCPServers = requiredMCPServers.filter(
    (serverId) => !allowedMCPServerIds.includes(serverId)
  );
  if (missingMCPServers.length > 0) {
    throw new Error(
      `Effective capability snapshot is missing required MCP servers: ${missingMCPServers.join(', ')}.`
    );
  }
  const memoryAccess = intersectMemoryAccess([
    input.agent.memoryAccess,
    input.domain.memoryAccess,
    ...input.activeSkills.map((skill) => parseMemoryAccess(skill.memoryAccessPolicy)),
  ]);
  const maximumSideEffectLevel = minimumSideEffectLevel([
    input.agent.maximumSideEffectLevel,
    input.domain.maximumSideEffectLevel,
    ...input.activeSkills.map((skill) => parseMaximumSideEffect(skill.sideEffectPolicy)),
  ]);
  const allowedExecutionProfiles = intersectConstraints([
    input.agent.allowedExecutionProfiles,
    input.domain.allowedExecutionProfiles,
  ]);
  const createdAt = input.createdAt ?? new Date().toISOString();
  const skillRevisions = input.activeSkills
    .map((skill) => ({
      id: skill.id,
      version: skill.version,
      contentHash: skillContentHash(skill),
    }))
    .sort((left, right) => left.id.localeCompare(right.id));
  const body = {
    runId: input.runId,
    agentId: input.agentId,
    principalId: input.principalId,
    tenantId: input.tenantId,
    domainId: input.domainId,
    createdAt,
    expiresAt: input.expiresAt,
    skillRevisions,
    allowedToolIds,
    allowedMCPServerIds,
    memoryAccess,
    allowedExecutionProfiles,
    maximumSideEffectLevel,
    requiresHumanReview: input.activeSkills.some(
      (skill) => skill.policyDecision.requiresHumanReview === true
    ),
    policyRefs: uniqueSorted([
      ...(input.agent.policyRefs ?? []),
      ...(input.domain.policyRefs ?? []),
      ...input.activeSkills
        .map((skill) => skill.policyDecision.policyId)
        .filter((value): value is string => Boolean(value)),
    ]),
  };
  const snapshot = effectiveAgentCapabilitySnapshotSchema.parse({
    id: `agent-capability:${input.runId}:${input.agentId}`,
    ...body,
    snapshotHash: hashToolContract(body),
  });
  return deepFreeze(snapshot);
}

function intersectConstraints(constraints: Array<string[] | undefined>): string[] {
  const defined = constraints.filter((value): value is string[] => Array.isArray(value));
  if (defined.length === 0) return [];
  let result = new Set(defined[0]);
  for (const constraint of defined.slice(1)) {
    const allowed = new Set(constraint);
    result = new Set(Array.from(result).filter((value) => allowed.has(value)));
  }
  return uniqueSorted(Array.from(result));
}

function intersectMemoryAccess(
  constraints: Array<EffectiveAgentCapabilitySnapshot['memoryAccess'] | undefined>
): EffectiveAgentCapabilitySnapshot['memoryAccess'] {
  const masks = constraints
    .filter(
      (value): value is EffectiveAgentCapabilitySnapshot['memoryAccess'] => value !== undefined
    )
    .map(memoryMask);
  if (masks.length === 0) return 'none';
  return memoryAccessFromMask(masks.reduce((result, mask) => result & mask));
}

function parseMemoryAccess(
  value: string | undefined
): EffectiveAgentCapabilitySnapshot['memoryAccess'] | undefined {
  if (!value || value === 'inherit') return undefined;
  const normalized = value.toLowerCase().replace(/[-+]/g, '_');
  if (normalized === 'none' || normalized === 'deny') return 'none';
  if (normalized === 'read' || normalized === 'read_only') return 'read';
  if (normalized === 'write' || normalized === 'write_only') return 'write';
  if (normalized === 'read_write' || normalized === 'all') return 'read_write';
  throw new Error(`Unsupported Skill memoryAccessPolicy: ${value}.`);
}

function memoryMask(value: EffectiveAgentCapabilitySnapshot['memoryAccess']): number {
  return value === 'read_write' ? 3 : value === 'read' ? 1 : value === 'write' ? 2 : 0;
}

function memoryAccessFromMask(mask: number): EffectiveAgentCapabilitySnapshot['memoryAccess'] {
  return mask === 3 ? 'read_write' : mask === 1 ? 'read' : mask === 2 ? 'write' : 'none';
}

const SIDE_EFFECT_RANK: Record<SideEffectLevel, number> = {
  none: 0,
  read: 1,
  write: 2,
  external_effect: 3,
  irreversible: 4,
};

function minimumSideEffectLevel(values: Array<SideEffectLevel | undefined>): SideEffectLevel {
  const defined = values.filter((value): value is SideEffectLevel => value !== undefined);
  if (defined.length === 0) return 'none';
  return defined.reduce((minimum, value) =>
    SIDE_EFFECT_RANK[value] < SIDE_EFFECT_RANK[minimum] ? value : minimum
  );
}

function parseMaximumSideEffect(value: string | undefined): SideEffectLevel | undefined {
  if (!value || value === 'inherit') return undefined;
  if (value === 'human_review') return 'write';
  if (value in SIDE_EFFECT_RANK) return value as SideEffectLevel;
  throw new Error(`Unsupported Skill sideEffectPolicy: ${value}.`);
}

function skillContentHash(skill: LoadedSkillContext): string {
  const install = recordField(skill.provenance ?? {}, 'install');
  const installedHash = typeof install?.contentHash === 'string' ? install.contentHash : undefined;
  return installedHash && /^[a-f0-9]{64}$/u.test(installedHash)
    ? installedHash
    : hashToolContract({
        id: skill.id,
        version: skill.version,
        instructions: skill.instructions,
        references: skill.references.map((reference) => ({
          path: reference.path,
          content: reference.content,
        })),
        provenance: skill.provenance,
      });
}

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort();
}

function deepFreeze<T>(value: T): Readonly<T> {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
  }
  return value;
}

export class SkillResolver {
  private readonly selector: SkillSelector;

  constructor(private readonly registry: SkillRegistry) {
    this.selector = new SkillSelector(registry);
  }

  resolve(context: SkillResolutionContext): ResolvedSkill[] {
    return this.selector.select(context).selected.map((selection) => ({
      spec: selection.spec,
      loadedInstructions: selection.spec.instructions,
      loadedReferences: [
        ...(selection.spec.references ?? []),
        ...(selection.spec.scripts ?? []),
        ...(selection.spec.assets ?? []),
      ].filter((asset) => asset.loadPolicy === 'on_activation'),
    }));
  }
}

export async function loadSkillMarkdownFile(filePath: string): Promise<ParsedSkillMarkdown> {
  const raw = await fs.readFile(filePath, 'utf-8');
  return parseSkillMarkdown(raw, filePath);
}

export function parseSkillMarkdown(raw: string, filePath: string): ParsedSkillMarkdown {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) {
    throw new Error(`Skill file missing YAML frontmatter: ${filePath}`);
  }
  const [, frontmatterRaw, bodyRaw] = match;
  const parsed = parseYaml(frontmatterRaw) as Record<string, unknown> | null;
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`Skill frontmatter is empty or not a mapping: ${filePath}`);
  }

  const slug =
    path.basename(path.dirname(filePath)) === 'skills'
      ? path.basename(filePath, path.extname(filePath))
      : path.basename(path.dirname(filePath));
  const id = stringField(parsed, 'id') ?? slug;
  const version = stringField(parsed, 'version');
  const description = stringField(parsed, 'description');
  if (!version || !description) {
    throw new Error(`Skill ${filePath} must declare version and description.`);
  }

  const body = bodyRaw.trim();
  const spec: SkillSpec = {
    id,
    version,
    name: stringField(parsed, 'name'),
    description,
    enabled: booleanField(parsed, 'enabled') ?? true,
    priority: numberField(parsed, 'priority'),
    activationPolicy: activationPolicyFromFrontmatter(parsed),
    instructions: stringField(parsed, 'instructions') ?? (body ? body : undefined),
    references: assetRefsFromFrontmatter(parsed.references, 'reference'),
    scripts: assetRefsFromFrontmatter(parsed.scripts, 'script'),
    assets: assetRefsFromFrontmatter(parsed.assets, 'asset'),
    allowedTools: stringArrayField(parsed, 'allowedTools'),
    requiredTools: stringArrayField(parsed, 'requiredTools'),
    requiredMCPServers: stringArrayField(parsed, 'requiredMCPServers'),
    memoryAccessPolicy: stringField(parsed, 'memoryAccessPolicy'),
    sideEffectPolicy: stringField(parsed, 'sideEffectPolicy'),
    contextBudget: numberField(parsed, 'contextBudget'),
    inputSchema: schemaField(parsed, 'inputSchema'),
    outputContract: schemaField(parsed, 'outputContract'),
    evaluationCases: stringArrayField(parsed, 'evaluationCases'),
    provenance: {
      ...(recordField(parsed, 'provenance') ?? {}),
      source: 'local-skill',
      filePath,
      slug,
    },
    trustLevel: trustLevelField(parsed, 'trustLevel') ?? 'reviewed',
  };
  return { filePath, slug, spec: validateSkillSpec(spec) };
}

export async function listLocalSkillFiles(directory: string, recursive = true): Promise<string[]> {
  const root = path.resolve(directory);
  const files: string[] = [];

  async function visit(current: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(current, { withFileTypes: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return;
      throw error;
    }

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (recursive) await visit(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }

  await visit(root);
  return files.sort();
}

function evaluateSkillActivation(
  skill: SkillSpec,
  context: SkillResolutionContext
): { active: boolean; reason: string; matchedPatterns: string[] } {
  const policy = skill.activationPolicy;
  if (!policy || policy.mode === 'always') {
    return { active: true, reason: 'Activation policy is always.', matchedPatterns: [] };
  }
  if (policy.mode === 'manual') {
    const active = Boolean(context.manualSkillIds?.includes(skill.id));
    return {
      active,
      reason: active ? 'Skill was manually selected.' : 'Manual skill was not requested.',
      matchedPatterns: active ? [skill.id] : [],
    };
  }
  if (policy.mode === 'intent') {
    const matchedPatterns = (policy.patterns ?? []).filter((pattern) => pattern === context.intent);
    return {
      active: matchedPatterns.length > 0,
      reason:
        matchedPatterns.length > 0
          ? `Intent matched: ${matchedPatterns.join(', ')}.`
          : 'Intent did not match activation policy.',
      matchedPatterns,
    };
  }

  const input = context.inputText ?? '';
  if (policy.mode === 'regex') {
    const matchedPatterns = (policy.patterns ?? []).filter((pattern) => {
      try {
        return new RegExp(pattern, 'i').test(input);
      } catch {
        return false;
      }
    });
    return {
      active: matchedPatterns.length > 0,
      reason:
        matchedPatterns.length > 0
          ? `Regex matched: ${matchedPatterns.join(', ')}.`
          : 'Regex did not match activation policy.',
      matchedPatterns,
    };
  }

  const normalizedInput = input.toLowerCase();
  const matchedPatterns = (policy.patterns ?? []).filter((pattern) =>
    normalizedInput.includes(pattern.toLowerCase())
  );
  return {
    active: matchedPatterns.length > 0,
    reason:
      matchedPatterns.length > 0
        ? `Keyword matched: ${matchedPatterns.join(', ')}.`
        : 'Keyword did not match activation policy.',
    matchedPatterns,
  };
}

function activationPolicyFromFrontmatter(
  parsed: Record<string, unknown>
): SkillActivationPolicy | undefined {
  const policy = recordField(parsed, 'activationPolicy');
  if (policy) {
    const mode = stringField(policy, 'mode') as SkillActivationMode | undefined;
    if (mode) return { mode, patterns: stringArrayField(policy, 'patterns') };
  }

  const triggers = Array.isArray(parsed.triggers) ? parsed.triggers : undefined;
  if (!triggers?.length) return undefined;
  if (triggers.some((trigger) => recordFieldValue(trigger, 'type') === 'always')) {
    return { mode: 'always' };
  }

  const first = triggers.find((trigger) => {
    const type = recordFieldValue(trigger, 'type');
    return type === 'keyword' || type === 'regex' || type === 'intent' || type === 'manual';
  });
  const mode = recordFieldValue(first, 'type') as SkillActivationMode | undefined;
  if (!mode) return undefined;
  const patterns = triggers
    .filter((trigger) => recordFieldValue(trigger, 'type') === mode)
    .map((trigger) => recordFieldValue(trigger, 'pattern'))
    .filter((pattern): pattern is string => Boolean(pattern));
  return { mode, patterns: patterns.length ? patterns : undefined };
}

function assetRefsFromFrontmatter(
  value: unknown,
  defaultType: SkillAssetRef['type']
): SkillAssetRef[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const refs = value
    .map((item): SkillAssetRef | null => {
      if (typeof item === 'string') {
        return {
          path: item,
          type: defaultType,
          loadPolicy: defaultType === 'reference' ? 'on_activation' : 'never',
        };
      }
      if (!item || typeof item !== 'object' || Array.isArray(item)) return null;
      const record = item as Record<string, unknown>;
      const itemPath = stringField(record, 'path');
      if (!itemPath) return null;
      const type =
        (stringField(record, 'type') as SkillAssetRef['type'] | undefined) ?? defaultType;
      const loadPolicy = stringField(record, 'loadPolicy') as
        | SkillAssetRef['loadPolicy']
        | undefined;
      return { path: itemPath, type, loadPolicy };
    })
    .filter((ref): ref is SkillAssetRef => Boolean(ref));
  return refs.length ? refs : undefined;
}

function truncateToBudget(value: string | undefined, maxChars: number): string | undefined {
  if (!value || maxChars <= 0) return undefined;
  if (value.length <= maxChars) return value;
  if (maxChars <= 20) return value.slice(0, maxChars);
  return `${value.slice(0, maxChars - 13)}...[truncated]`;
}

function stringField(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return undefined;
}

function booleanField(record: Record<string, unknown>, key: string): boolean | undefined {
  const value = record[key];
  return typeof value === 'boolean' ? value : undefined;
}

function numberField(record: Record<string, unknown>, key: string): number | undefined {
  const value = record[key];
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function stringArrayField(record: Record<string, unknown>, key: string): string[] | undefined {
  const value = record[key];
  if (!Array.isArray(value)) return undefined;
  const values = value.filter((item): item is string => typeof item === 'string');
  return values.length ? values : undefined;
}

function schemaField(record: Record<string, unknown>, key: string): JsonSchema | undefined {
  const value = record[key];
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as JsonSchema)
    : undefined;
}

function recordField(
  record: Record<string, unknown>,
  key: string
): Record<string, unknown> | undefined {
  const value = record[key];
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function recordFieldValue(value: unknown, key: string): string | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  return stringField(value as Record<string, unknown>, key);
}

function trustLevelField(
  record: Record<string, unknown>,
  key: string
): SkillSpec['trustLevel'] | undefined {
  const value = stringField(record, key);
  if (value === 'trusted' || value === 'reviewed' || value === 'untrusted') return value;
  return undefined;
}

export const skillRefSchema = z.object({
  id: z.string().min(1),
  version: z.string().optional(),
});

export const skillActivationPolicySchema = z.object({
  mode: z.enum(['always', 'keyword', 'regex', 'intent', 'manual']),
  patterns: z.array(z.string()).optional(),
});

export const skillAssetRefSchema = z.object({
  path: z.string().min(1),
  type: z.enum(['reference', 'script', 'asset']),
  loadPolicy: z.enum(['frontmatter_only', 'on_activation', 'never']).optional(),
});

export const skillSpecSchema = versionedSpecSchema.merge(specMetadataSchema).extend({
  description: z.string().min(1),
  enabled: z.boolean().optional(),
  priority: z.number().optional(),
  activationPolicy: skillActivationPolicySchema.optional(),
  instructions: z.string().optional(),
  references: z.array(skillAssetRefSchema).optional(),
  scripts: z.array(skillAssetRefSchema).optional(),
  assets: z.array(skillAssetRefSchema).optional(),
  allowedTools: z.array(z.string()).optional(),
  requiredTools: z.array(z.string()).optional(),
  requiredMCPServers: z.array(z.string()).optional(),
  memoryAccessPolicy: z.string().optional(),
  sideEffectPolicy: z.string().optional(),
  contextBudget: z.number().int().positive().optional(),
  inputSchema: jsonSchemaSchema.optional(),
  outputContract: jsonSchemaSchema.optional(),
  evaluationCases: z.array(z.string()).optional(),
  provenance: z.record(z.unknown()).optional(),
  trustLevel: z.enum(['trusted', 'reviewed', 'untrusted']).optional(),
}) satisfies ZodType<SkillSpec>;

export const skillSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'description'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    enabled: { type: 'boolean' },
    priority: { type: 'number' },
    activationPolicy: {
      type: 'object',
      properties: {
        mode: { enum: ['always', 'keyword', 'regex', 'intent', 'manual'] },
        patterns: { type: 'array', items: { type: 'string' } },
      },
      additionalProperties: false,
    },
    instructions: { type: 'string' },
    references: { type: 'array', items: { type: 'object' } },
    scripts: { type: 'array', items: { type: 'object' } },
    assets: { type: 'array', items: { type: 'object' } },
    allowedTools: { type: 'array', items: { type: 'string' } },
    requiredTools: { type: 'array', items: { type: 'string' } },
    requiredMCPServers: { type: 'array', items: { type: 'string' } },
    memoryAccessPolicy: { type: 'string' },
    sideEffectPolicy: { type: 'string' },
    contextBudget: { type: 'number' },
    inputSchema: { type: 'object' },
    outputContract: { type: 'object' },
    evaluationCases: { type: 'array', items: { type: 'string' } },
    provenance: { type: 'object' },
    trustLevel: { enum: ['trusted', 'reviewed', 'untrusted'] },
  },
  additionalProperties: false,
};

export const skillSpecExample: SkillSpec = {
  id: 'skill.context-enrichment',
  version: '0.0.0',
  name: 'Context Enrichment',
  description: 'Adds relevant context before reasoning.',
  enabled: true,
  priority: 10,
  activationPolicy: { mode: 'always' },
  allowedTools: ['tool.search'],
  contextBudget: 2000,
  inputSchema: { type: 'object' },
  outputContract: { type: 'object' },
  trustLevel: 'reviewed',
};

export const skillSpecDefinition = defineSpecSchema<SkillSpec>({
  id: 'SkillSpec',
  zod: skillSpecSchema,
  jsonSchema: skillSpecJsonSchema,
  example: skillSpecExample,
});

export const skillSpecDefinitions = [skillSpecDefinition] as const;
export const skillSpecJsonSchemas = exportSpecJsonSchemas(skillSpecDefinitions);

export function validateSkillSpec(input: unknown): SkillSpec {
  return skillSpecDefinition.parse(input);
}
