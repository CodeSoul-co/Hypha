import { z, type ZodType } from 'zod';
import { hashContent } from './cache';
import type { PromptMessage, PromptRole } from './types';

export const PROMPT_PROFILE_SOURCES = [
  'system',
  'developer',
  'domain',
  'skill',
  'mcp',
  'user',
] as const;
export const PROMPT_PROFILE_STATUSES = [
  'draft',
  'in_review',
  'active',
  'deprecated',
] as const;

export type PromptProfileSource = (typeof PROMPT_PROFILE_SOURCES)[number];
export type PromptProfileStatus = (typeof PROMPT_PROFILE_STATUSES)[number];

export interface PromptProfileLayer {
  id: string;
  source: PromptProfileSource;
  content: string;
  priority?: number;
  trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
  provenance?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface PromptProfileInput {
  id: string;
  version: string;
  name: string;
  description?: string;
  layers: PromptProfileLayer[];
  variableNames?: string[];
  scope?: 'global' | 'tenant' | 'owner';
  tenantId?: string;
  ownerId?: string;
  agentIds?: string[];
  domainIds?: string[];
  maxInlineBytes?: number;
  metadata?: Record<string, unknown>;
}

export interface PromptProfile extends PromptProfileInput {
  revision: number;
  lifecycleRevision: number;
  status: PromptProfileStatus;
  contentHash: string;
  createdAt: string;
  updatedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  activatedBy?: string;
  activatedAt?: string;
  deprecatedBy?: string;
  deprecatedAt?: string;
}

export interface PromptProfileRef {
  id: string;
  version?: string;
  revision?: number;
}

export interface PromptProfilePrincipal {
  principalId: string;
  tenantId?: string;
  agentId?: string;
  domainId?: string;
}

export interface PromptProfileArtifactPort {
  store(input: {
    profile: Pick<PromptProfile, 'id' | 'version' | 'revision' | 'contentHash'>;
    bytes: Uint8Array;
    contentHash: string;
    mediaType: 'application/json';
    metadata: Record<string, unknown>;
  }): Promise<{ artifactRef: string; contentHash: string; sizeBytes: number }>;
}

export interface PromptProfileTraceSink {
  record(event: {
    type: 'prompt.profile.resolved' | 'prompt.profile.cache_hit' | 'prompt.profile.externalized';
    profileId: string;
    version: string;
    revision: number;
    contentHash: string;
    principalScopeHash: string;
    sizeBytes: number;
    timestamp: string;
  }): Promise<void> | void;
}

export interface PromptProfileResolution {
  profileRef: Required<PromptProfileRef>;
  profileHash: string;
  messages: PromptMessage[];
  sizeBytes: number;
  cacheHit: boolean;
  artifactRef?: string;
}

export interface PromptProfileRegistryOptions {
  now?: () => string;
  artifacts?: PromptProfileArtifactPort;
  trace?: PromptProfileTraceSink;
}

const promptProfileLayerSchema = z
  .object({
    id: z.string().min(1),
    source: z.enum(PROMPT_PROFILE_SOURCES),
    content: z.string().min(1),
    priority: z.number().int().optional(),
    trustLevel: z.enum(['trusted', 'reviewed', 'untrusted']).optional(),
    provenance: z.record(z.unknown()).optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict() satisfies ZodType<PromptProfileLayer>;

export const promptProfileInputSchema = z
  .object({
    id: z.string().min(1),
    version: z.string().min(1),
    name: z.string().min(1),
    description: z.string().optional(),
    layers: z.array(promptProfileLayerSchema).min(1),
    variableNames: z.array(z.string().min(1)).optional(),
    scope: z.enum(['global', 'tenant', 'owner']).optional(),
    tenantId: z.string().min(1).optional(),
    ownerId: z.string().min(1).optional(),
    agentIds: z.array(z.string().min(1)).min(1).optional(),
    domainIds: z.array(z.string().min(1)).min(1).optional(),
    maxInlineBytes: z.number().int().positive().optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict()
  .superRefine((profile, context) => {
    const scope = profile.scope ?? 'global';
    if (scope === 'tenant' && !profile.tenantId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['tenantId'],
        message: 'tenantId is required for tenant-scoped Prompt Profiles',
      });
    }
    if (scope === 'owner' && !profile.ownerId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['ownerId'],
        message: 'ownerId is required for owner-scoped Prompt Profiles',
      });
    }
    const layerIds = new Set<string>();
    for (const [index, layer] of profile.layers.entries()) {
      if (layerIds.has(layer.id)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['layers', index, 'id'],
          message: `Prompt Profile layer id is duplicated: ${layer.id}`,
        });
      }
      layerIds.add(layer.id);
      if (
        (layer.source === 'mcp' || layer.source === 'skill') &&
        layer.trustLevel !== undefined &&
        layer.trustLevel !== 'untrusted'
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['layers', index, 'trustLevel'],
          message: `${layer.source} Prompt Profile layers must remain untrusted`,
        });
      }
    }
  }) satisfies ZodType<PromptProfileInput>;

/**
 * Immutable Prompt Profile revisions plus a CAS-protected publication lifecycle.
 * Active revisions are never overwritten, so a Run can safely keep an exact ref.
 */
export class PromptProfileRegistry {
  private readonly profiles = new Map<string, PromptProfile>();
  private readonly cache = new Map<string, PromptProfileResolution>();
  private readonly now: () => string;

  constructor(private readonly options: PromptProfileRegistryOptions = {}) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  create(input: PromptProfileInput): PromptProfile {
    const parsed = promptProfileInputSchema.parse(input);
    const revisions = this.list(parsed.id, parsed.version);
    const revision = (revisions.at(-1)?.revision ?? 0) + 1;
    const timestamp = this.now();
    const profile: PromptProfile = {
      ...clone(parsed),
      revision,
      lifecycleRevision: 1,
      status: 'draft',
      contentHash: profileContentHash(parsed),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.profiles.set(profileKey(profile.id, profile.version, profile.revision), profile);
    return clone(profile);
  }

  restore(input: PromptProfile): PromptProfile {
    const base = promptProfileInputSchema.parse(profileInputFromSnapshot(input));
    const generated = z
      .object({
        revision: z.number().int().positive(),
        lifecycleRevision: z.number().int().positive(),
        status: z.enum(PROMPT_PROFILE_STATUSES),
        contentHash: z.string().regex(/^[a-f0-9]{64}$/u),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
        reviewedBy: z.string().min(1).optional(),
        reviewedAt: z.string().datetime({ offset: true }).optional(),
        activatedBy: z.string().min(1).optional(),
        activatedAt: z.string().datetime({ offset: true }).optional(),
        deprecatedBy: z.string().min(1).optional(),
        deprecatedAt: z.string().datetime({ offset: true }).optional(),
      })
      .parse(input);
    const expectedHash = profileContentHash(base);
    if (generated.contentHash !== expectedHash) {
      throw promptProfileError(
        'PROMPT_PROFILE_HASH_MISMATCH',
        'Persisted Prompt Profile content hash does not match its content',
        {
          id: base.id,
          version: base.version,
          revision: generated.revision,
          expectedHash,
          actualHash: generated.contentHash,
        }
      );
    }
    const profile: PromptProfile = { ...clone(base), ...generated };
    const key = profileKey(profile.id, profile.version, profile.revision);
    if (this.profiles.has(key)) {
      throw promptProfileError(
        'PROMPT_PROFILE_REVISION_CONFLICT',
        'Prompt Profile revision is already restored',
        { ...exactRef(profile) }
      );
    }
    this.profiles.set(key, profile);
    return clone(profile);
  }

  submitForReview(
    ref: Required<PromptProfileRef>,
    input: { expectedLifecycleRevision: number; reviewedBy: string }
  ): PromptProfile {
    return this.transition(ref, input.expectedLifecycleRevision, 'draft', 'in_review', {
      reviewedBy: input.reviewedBy,
      reviewedAt: this.now(),
    });
  }

  activate(
    ref: Required<PromptProfileRef>,
    input: { expectedLifecycleRevision: number; activatedBy: string }
  ): PromptProfile {
    const activated = this.transition(
      ref,
      input.expectedLifecycleRevision,
      'in_review',
      'active',
      {
        activatedBy: input.activatedBy,
        activatedAt: this.now(),
      }
    );
    for (const profile of this.profiles.values()) {
      if (
        profile.id === activated.id &&
        profile.status === 'active' &&
        profileKey(profile.id, profile.version, profile.revision) !==
          profileKey(activated.id, activated.version, activated.revision)
      ) {
        this.replaceProfile(profile, {
          status: 'deprecated',
          lifecycleRevision: profile.lifecycleRevision + 1,
          deprecatedBy: input.activatedBy,
          deprecatedAt: this.now(),
          updatedAt: this.now(),
        });
      }
    }
    this.cache.clear();
    return activated;
  }

  deprecate(
    ref: Required<PromptProfileRef>,
    input: { expectedLifecycleRevision: number; deprecatedBy: string }
  ): PromptProfile {
    const current = this.requireExact(ref);
    if (current.status !== 'active' && current.status !== 'in_review') {
      lifecycleError(current, `cannot deprecate a ${current.status} Prompt Profile`);
    }
    const deprecated = this.replaceProfile(current, {
      status: 'deprecated',
      lifecycleRevision: current.lifecycleRevision + 1,
      deprecatedBy: input.deprecatedBy,
      deprecatedAt: this.now(),
      updatedAt: this.now(),
    }, input.expectedLifecycleRevision);
    this.cache.clear();
    return clone(deprecated);
  }

  get(ref: PromptProfileRef): PromptProfile | null {
    const profile =
      ref.version !== undefined && ref.revision !== undefined
        ? this.profiles.get(profileKey(ref.id, ref.version, ref.revision))
        : this.resolveActiveProfile(ref);
    return profile ? clone(profile) : null;
  }

  list(id?: string, version?: string): PromptProfile[] {
    return Array.from(this.profiles.values())
      .filter((profile) => (!id || profile.id === id) && (!version || profile.version === version))
      .sort((left, right) => {
        const idOrder = left.id.localeCompare(right.id);
        const versionOrder = compareVersions(left.version, right.version);
        return idOrder || versionOrder || left.revision - right.revision;
      })
      .map(clone);
  }

  clear(): void {
    this.profiles.clear();
    this.cache.clear();
  }

  async resolve(
    ref: PromptProfileRef,
    context: {
      variables: Record<string, unknown>;
      principal: PromptProfilePrincipal;
      maxInlineBytes?: number;
    }
  ): Promise<PromptProfileResolution> {
    const profile =
      ref.version !== undefined && ref.revision !== undefined
        ? this.requireExact(ref as Required<PromptProfileRef>)
        : this.resolveActiveProfile(ref);
    if (!profile) {
      throw promptProfileError('PROMPT_PROFILE_NOT_FOUND', 'Prompt Profile not found', { ...ref });
    }
    if (profile.status !== 'active' && !(ref.revision !== undefined && profile.status === 'deprecated')) {
      lifecycleError(profile, `Prompt Profile revision is ${profile.status}, not active`);
    }
    assertProfileAccess(profile, context.principal);
    const principalScopeHash = hashContent(stableStringify(context.principal));
    const cacheKey = hashContent(
      stableStringify({
        profile: exactRef(profile),
        profileHash: profile.contentHash,
        principal: context.principal,
        variables: context.variables,
        maxInlineBytes: context.maxInlineBytes,
      })
    );
    const cached = this.cache.get(cacheKey);
    if (cached) {
      await this.trace('prompt.profile.cache_hit', profile, principalScopeHash, cached.sizeBytes);
      return { ...clone(cached), cacheHit: true };
    }

    const messages = compileProfileMessages(profile, context.variables);
    const serializedMessages = stableStringify(messages);
    const encoded = new TextEncoder().encode(serializedMessages);
    const maxInlineBytes = context.maxInlineBytes ?? profile.maxInlineBytes ?? 256 * 1024;
    let resolution: PromptProfileResolution;
    if (encoded.byteLength > maxInlineBytes) {
      if (!this.options.artifacts) {
        throw promptProfileError(
          'PROMPT_PROFILE_CONTENT_TOO_LARGE',
          'Prompt Profile content exceeds its configured inline limit',
          {
            ...exactRef(profile),
            maxInlineBytes,
            actualBytes: encoded.byteLength,
            contentHash: hashContent(serializedMessages),
          }
        );
      }
      const contentHash = hashContent(serializedMessages);
      const artifact = await this.options.artifacts.store({
        profile: exactRefWithHash(profile),
        bytes: encoded,
        contentHash,
        mediaType: 'application/json',
        metadata: {
          source: 'prompt-profile',
          profileRef: exactRef(profile),
          profileHash: profile.contentHash,
          principalScopeHash,
        },
      });
      resolution = {
        profileRef: exactRef(profile),
        profileHash: profile.contentHash,
        messages: [
          {
            role: 'context',
            content: stableStringify({
              type: 'artifact_ref',
              artifactRef: artifact.artifactRef,
              contentHash: artifact.contentHash,
              sizeBytes: artifact.sizeBytes,
            }),
            metadata: {
              source: 'prompt-profile-artifact',
              trustLevel: 'untrusted',
              externalized: true,
            },
          },
        ],
        sizeBytes: artifact.sizeBytes,
        cacheHit: false,
        artifactRef: artifact.artifactRef,
      };
      await this.trace(
        'prompt.profile.externalized',
        profile,
        principalScopeHash,
        artifact.sizeBytes
      );
    } else {
      resolution = {
        profileRef: exactRef(profile),
        profileHash: profile.contentHash,
        messages,
        sizeBytes: encoded.byteLength,
        cacheHit: false,
      };
      await this.trace('prompt.profile.resolved', profile, principalScopeHash, encoded.byteLength);
    }
    this.cache.set(cacheKey, clone(resolution));
    return clone(resolution);
  }

  private transition(
    ref: Required<PromptProfileRef>,
    expectedLifecycleRevision: number,
    from: PromptProfileStatus,
    to: PromptProfileStatus,
    patch: Partial<PromptProfile>
  ): PromptProfile {
    const current = this.requireExact(ref);
    if (current.status !== from) lifecycleError(current, `expected ${from}, found ${current.status}`);
    const updated = this.replaceProfile(
      current,
      {
        ...patch,
        status: to,
        lifecycleRevision: current.lifecycleRevision + 1,
        updatedAt: this.now(),
      },
      expectedLifecycleRevision
    );
    this.cache.clear();
    return clone(updated);
  }

  private replaceProfile(
    current: PromptProfile,
    patch: Partial<PromptProfile>,
    expectedLifecycleRevision = current.lifecycleRevision
  ): PromptProfile {
    if (current.lifecycleRevision !== expectedLifecycleRevision) {
      throw promptProfileError(
        'PROMPT_PROFILE_REVISION_CONFLICT',
        'Prompt Profile lifecycle revision conflict',
        {
          ...exactRef(current),
          expectedLifecycleRevision,
          actualLifecycleRevision: current.lifecycleRevision,
        }
      );
    }
    const updated = { ...current, ...patch };
    this.profiles.set(profileKey(current.id, current.version, current.revision), updated);
    return updated;
  }

  private requireExact(ref: Required<PromptProfileRef>): PromptProfile {
    const profile = this.profiles.get(profileKey(ref.id, ref.version, ref.revision));
    if (!profile) throw promptProfileError('PROMPT_PROFILE_NOT_FOUND', 'Prompt Profile not found', ref);
    return profile;
  }

  private resolveActiveProfile(ref: PromptProfileRef): PromptProfile | null {
    const candidates = Array.from(this.profiles.values())
      .filter(
        (profile) =>
          profile.id === ref.id &&
          profile.status === 'active' &&
          (ref.version === undefined || profile.version === ref.version)
      )
      .sort(
        (left, right) =>
          compareVersions(right.version, left.version) || right.revision - left.revision
      );
    return candidates[0] ?? null;
  }

  private async trace(
    type: Parameters<PromptProfileTraceSink['record']>[0]['type'],
    profile: PromptProfile,
    principalScopeHash: string,
    sizeBytes: number
  ): Promise<void> {
    await this.options.trace?.record({
      type,
      profileId: profile.id,
      version: profile.version,
      revision: profile.revision,
      contentHash: profile.contentHash,
      principalScopeHash,
      sizeBytes,
      timestamp: this.now(),
    });
  }
}

function compileProfileMessages(
  profile: PromptProfile,
  variables: Record<string, unknown>
): PromptMessage[] {
  const declared = new Set(profile.variableNames ?? []);
  return [...profile.layers]
    .sort(
      (left, right) =>
        PROMPT_PROFILE_SOURCES.indexOf(left.source) -
          PROMPT_PROFILE_SOURCES.indexOf(right.source) ||
        (left.priority ?? 0) - (right.priority ?? 0) ||
        left.id.localeCompare(right.id)
    )
    .map((layer) => {
      const content = renderLayer(profile, layer, declared, variables);
      const untrusted = layer.source === 'mcp' || layer.source === 'skill';
      return {
        role: roleForSource(layer.source),
        content: untrusted
          ? `<untrusted-prompt-data source="${layer.source}" layer="${layer.id}" encoding="xml-escaped-text">\n${escapeUntrustedPromptData(content)}\n</untrusted-prompt-data>`
          : content,
        metadata: {
          ...layer.metadata,
          source: layer.source,
          layerId: layer.id,
          trustLevel: untrusted ? 'untrusted' : (layer.trustLevel ?? 'reviewed'),
          provenance: layer.provenance,
          profileRef: exactRef(profile),
          profileHash: profile.contentHash,
        },
      };
    });
}

function renderLayer(
  profile: PromptProfile,
  layer: PromptProfileLayer,
  declared: Set<string>,
  variables: Record<string, unknown>
): string {
  const placeholders = Array.from(layer.content.matchAll(/\{\{\s*([^}]+?)\s*\}\}/gu)).map(
    (match) => match[1].trim()
  );
  const undeclared = placeholders.filter((name) => !declared.has(name));
  if (undeclared.length > 0) {
    throw promptProfileError(
      'PROMPT_PROFILE_UNDECLARED_VARIABLE',
      'Prompt Profile contains undeclared variables',
      { ...exactRef(profile), layerId: layer.id, variables: [...new Set(undeclared)] }
    );
  }
  return layer.content.replace(/\{\{\s*([^}]+?)\s*\}\}/gu, (_match, name: string) => {
    const value = variables[name.trim()];
    return value === undefined || value === null
      ? ''
      : typeof value === 'string'
        ? value
        : stableStringify(value);
  });
}

function roleForSource(source: PromptProfileSource): PromptRole {
  if (source === 'system') return 'system';
  if (source === 'developer' || source === 'domain') return 'developer';
  if (source === 'user') return 'user';
  return 'context';
}

function escapeUntrustedPromptData(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function assertProfileAccess(profile: PromptProfile, principal: PromptProfilePrincipal): void {
  const scope = profile.scope ?? 'global';
  if (scope === 'tenant' && profile.tenantId !== principal.tenantId) {
    throw promptProfileError('PROMPT_PROFILE_SCOPE_DENIED', 'Prompt Profile tenant scope denied', {
      ...exactRef(profile),
      principalId: principal.principalId,
    });
  }
  if (scope === 'owner' && profile.ownerId !== principal.principalId) {
    throw promptProfileError('PROMPT_PROFILE_SCOPE_DENIED', 'Prompt Profile owner scope denied', {
      ...exactRef(profile),
      principalId: principal.principalId,
    });
  }
  if (profile.agentIds && (!principal.agentId || !profile.agentIds.includes(principal.agentId))) {
    throw promptProfileError('PROMPT_PROFILE_SCOPE_DENIED', 'Prompt Profile agent scope denied', {
      ...exactRef(profile),
      principalId: principal.principalId,
    });
  }
  if (profile.domainIds && (!principal.domainId || !profile.domainIds.includes(principal.domainId))) {
    throw promptProfileError('PROMPT_PROFILE_SCOPE_DENIED', 'Prompt Profile domain scope denied', {
      ...exactRef(profile),
      principalId: principal.principalId,
    });
  }
}

function lifecycleError(profile: PromptProfile, reason: string): never {
  throw promptProfileError('PROMPT_PROFILE_LIFECYCLE_INVALID', reason, {
    ...exactRef(profile),
    status: profile.status,
    lifecycleRevision: profile.lifecycleRevision,
  });
}

function promptProfileError(
  code: string,
  message: string,
  context: Record<string, unknown>
): Error {
  return Object.assign(new Error(message), { code, context });
}

function profileContentHash(profile: PromptProfileInput): string {
  return hashContent(
    stableStringify({
      ...profile,
      layers: profile.layers.map((layer) => ({
        ...layer,
        trustLevel:
          layer.source === 'mcp' || layer.source === 'skill'
            ? 'untrusted'
            : (layer.trustLevel ?? 'reviewed'),
      })),
      scope: profile.scope ?? 'global',
      maxInlineBytes: profile.maxInlineBytes ?? 256 * 1024,
    })
  );
}

function profileInputFromSnapshot(profile: PromptProfile): PromptProfileInput {
  return {
    id: profile.id,
    version: profile.version,
    name: profile.name,
    ...(profile.description === undefined ? {} : { description: profile.description }),
    layers: profile.layers,
    ...(profile.variableNames === undefined ? {} : { variableNames: profile.variableNames }),
    ...(profile.scope === undefined ? {} : { scope: profile.scope }),
    ...(profile.tenantId === undefined ? {} : { tenantId: profile.tenantId }),
    ...(profile.ownerId === undefined ? {} : { ownerId: profile.ownerId }),
    ...(profile.agentIds === undefined ? {} : { agentIds: profile.agentIds }),
    ...(profile.domainIds === undefined ? {} : { domainIds: profile.domainIds }),
    ...(profile.maxInlineBytes === undefined ? {} : { maxInlineBytes: profile.maxInlineBytes }),
    ...(profile.metadata === undefined ? {} : { metadata: profile.metadata }),
  };
}

function exactRef(profile: PromptProfile): Required<PromptProfileRef> {
  return { id: profile.id, version: profile.version, revision: profile.revision };
}

function exactRefWithHash(
  profile: PromptProfile
): Pick<PromptProfile, 'id' | 'version' | 'revision' | 'contentHash'> {
  return { ...exactRef(profile), contentHash: profile.contentHash };
}

function profileKey(id: string, version: string, revision: number): string {
  return `${id}@${version}#${revision}`;
}

function compareVersions(left: string, right: string): number {
  return left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' });
}

function stableStringify(value: unknown): string {
  return JSON.stringify(sortObject(value));
}

function sortObject(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortObject);
  if (!value || typeof value !== 'object') return value;
  return Object.keys(value as Record<string, unknown>)
    .sort()
    .reduce<Record<string, unknown>>((result, key) => {
      const candidate = (value as Record<string, unknown>)[key];
      if (candidate !== undefined) result[key] = sortObject(candidate);
      return result;
    }, {});
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
