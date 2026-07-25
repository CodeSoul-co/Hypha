import { createHash, verify } from 'crypto';
import { z, type ZodType } from 'zod';

export interface SkillDependencyLock {
  id: string;
  version: string;
  contentSha256: string;
}

export interface SkillSbomRef {
  format: 'cyclonedx-json' | 'spdx-json';
  sha256: string;
  url?: string;
}

export interface SkillSupplyChainManifest {
  skillId: string;
  version: string;
  contentSha256: string;
  downloadUrl: string;
  publisherId: string;
  issuedAt: string;
  expiresAt?: string;
  tenantIds?: string[];
  dependencies: SkillDependencyLock[];
  sbom: SkillSbomRef;
}

export interface SkillTransparencyProof {
  logId: string;
  logIndex: number;
  entryHash: string;
  checkpointHash: string;
  signature: string;
}

export interface SignedSkillRegistryEntry {
  manifest: SkillSupplyChainManifest;
  publisherSignature: string;
  transparency: SkillTransparencyProof;
}

export interface VerifiedSkillBundle {
  entry: SignedSkillRegistryEntry;
  content: Uint8Array;
}

export interface HttpsSkillRegistryClientOptions {
  endpoint: string;
  publisherKeys: Readonly<Record<string, string>>;
  transparencyLogKeys: Readonly<Record<string, string>>;
  tenantId?: string;
  authorization?: () => string | Promise<string>;
  artifactOrigins?: string[];
  maxMetadataBytes?: number;
  maxBundleBytes?: number;
  fetch?: typeof fetch;
  now?: () => number;
}

const sha256Schema = z.string().regex(/^[a-f0-9]{64}$/u);
const dependencySchema = z
  .object({
    id: z.string().min(1),
    version: z.string().min(1),
    contentSha256: sha256Schema,
  })
  .strict() satisfies ZodType<SkillDependencyLock>;
const sbomSchema = z
  .object({
    format: z.enum(['cyclonedx-json', 'spdx-json']),
    sha256: sha256Schema,
    url: z.string().url().optional(),
  })
  .strict() satisfies ZodType<SkillSbomRef>;
const manifestSchema = z
  .object({
    skillId: z.string().regex(/^[a-z0-9](?:[a-z0-9._-]{0,126}[a-z0-9])?$/u),
    version: z.string().min(1),
    contentSha256: sha256Schema,
    downloadUrl: z.string().url(),
    publisherId: z.string().min(1),
    issuedAt: z.string().datetime({ offset: true }),
    expiresAt: z.string().datetime({ offset: true }).optional(),
    tenantIds: z.array(z.string().min(1)).min(1).optional(),
    dependencies: z.array(dependencySchema),
    sbom: sbomSchema,
  })
  .strict() satisfies ZodType<SkillSupplyChainManifest>;
const transparencySchema = z
  .object({
    logId: z.string().min(1),
    logIndex: z.number().int().nonnegative(),
    entryHash: sha256Schema,
    checkpointHash: sha256Schema,
    signature: z.string().min(1),
  })
  .strict() satisfies ZodType<SkillTransparencyProof>;
const entrySchema = z
  .object({
    manifest: manifestSchema,
    publisherSignature: z.string().min(1),
    transparency: transparencySchema,
  })
  .strict() satisfies ZodType<SignedSkillRegistryEntry>;

/** HTTPS registry client that verifies publisher identity and transparency inclusion. */
export class HttpsSkillRegistryClient {
  private readonly endpoint: URL;
  private readonly fetchImpl: typeof fetch;
  private readonly allowedArtifactOrigins: Set<string>;
  private readonly now: () => number;

  constructor(private readonly options: HttpsSkillRegistryClientOptions) {
    this.endpoint = secureUrl(options.endpoint, 'SKILL_REGISTRY_ENDPOINT_INVALID');
    this.fetchImpl = options.fetch ?? fetch;
    this.allowedArtifactOrigins = new Set([
      this.endpoint.origin,
      ...(options.artifactOrigins ?? []).map(
        (origin) => secureUrl(origin, 'SKILL_REGISTRY_ARTIFACT_ORIGIN_INVALID').origin
      ),
    ]);
    this.now = options.now ?? Date.now;
  }

  async resolve(skillId: string, version: string): Promise<SignedSkillRegistryEntry> {
    if (!/^[a-z0-9](?:[a-z0-9._-]{0,126}[a-z0-9])?$/u.test(skillId) || !version) {
      throw registryError('SKILL_REGISTRY_REFERENCE_INVALID', 'Skill registry reference is invalid.');
    }
    const url = new URL(
      `v1/skills/${encodeURIComponent(skillId)}/versions/${encodeURIComponent(version)}`,
      ensureTrailingSlash(this.endpoint)
    );
    const response = await this.request(url);
    if (response.status === 404) {
      throw registryError('SKILL_REGISTRY_NOT_FOUND', 'Skill version was not found.');
    }
    const text = await boundedText(
      response,
      this.options.maxMetadataBytes ?? 256 * 1024,
      'SKILL_REGISTRY_METADATA_TOO_LARGE'
    );
    if (!response.ok) {
      throw registryError(
        'SKILL_REGISTRY_REQUEST_FAILED',
        `Skill registry request failed (${response.status}).`
      );
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw registryError('SKILL_REGISTRY_RESPONSE_INVALID', 'Skill registry response is invalid.');
    }
    const entry = entrySchema.parse(parsed);
    if (entry.manifest.skillId !== skillId || entry.manifest.version !== version) {
      throw registryError(
        'SKILL_REGISTRY_REFERENCE_MISMATCH',
        'Skill registry returned a different package reference.'
      );
    }
    this.verifyEntry(entry);
    return clone(entry);
  }

  async download(entryInput: SignedSkillRegistryEntry): Promise<VerifiedSkillBundle> {
    const entry = entrySchema.parse(entryInput);
    this.verifyEntry(entry);
    const url = secureUrl(entry.manifest.downloadUrl, 'SKILL_REGISTRY_DOWNLOAD_URL_INVALID');
    if (!this.allowedArtifactOrigins.has(url.origin)) {
      throw registryError(
        'SKILL_REGISTRY_DOWNLOAD_ORIGIN_DENIED',
        'Skill bundle origin is not allow-listed.'
      );
    }
    const response = await this.request(url);
    if (!response.ok) {
      throw registryError(
        'SKILL_REGISTRY_DOWNLOAD_FAILED',
        `Skill bundle download failed (${response.status}).`
      );
    }
    const content = await boundedBytes(
      response,
      this.options.maxBundleBytes ?? 2 * 1024 * 1024,
      'SKILL_REGISTRY_BUNDLE_TOO_LARGE'
    );
    if (sha256(content) !== entry.manifest.contentSha256) {
      throw registryError(
        'SKILL_REGISTRY_CONTENT_MISMATCH',
        'Skill bundle hash does not match its signed manifest.'
      );
    }
    return { entry: clone(entry), content };
  }

  verifyOfflineBundle(bundle: VerifiedSkillBundle): VerifiedSkillBundle {
    const entry = entrySchema.parse(bundle.entry);
    this.verifyEntry(entry);
    const content = new Uint8Array(bundle.content);
    if (content.byteLength > (this.options.maxBundleBytes ?? 2 * 1024 * 1024)) {
      throw registryError('SKILL_REGISTRY_BUNDLE_TOO_LARGE', 'Skill bundle exceeds its limit.');
    }
    if (sha256(content) !== entry.manifest.contentSha256) {
      throw registryError(
        'SKILL_REGISTRY_CONTENT_MISMATCH',
        'Offline Skill bundle hash does not match its signed manifest.'
      );
    }
    return { entry: clone(entry), content };
  }

  private verifyEntry(entry: SignedSkillRegistryEntry): void {
    const manifest = entry.manifest;
    if (manifest.expiresAt && Date.parse(manifest.expiresAt) <= this.now()) {
      throw registryError('SKILL_REGISTRY_PACKAGE_EXPIRED', 'Skill package has expired.');
    }
    if (manifest.tenantIds && (!this.options.tenantId || !manifest.tenantIds.includes(this.options.tenantId))) {
      throw registryError(
        'SKILL_REGISTRY_TENANT_DENIED',
        'Skill package is not distributed to this tenant.'
      );
    }
    const dependencyKeys = new Set<string>();
    for (const dependency of manifest.dependencies) {
      const key = `${dependency.id}@${dependency.version}`;
      if (dependencyKeys.has(key)) {
        throw registryError(
          'SKILL_REGISTRY_DEPENDENCY_LOCK_INVALID',
          'Skill dependency lock contains duplicates.'
        );
      }
      dependencyKeys.add(key);
    }
    validateOptionalArtifactUrl(manifest.sbom.url, this.allowedArtifactOrigins);

    const publisherKey = this.options.publisherKeys[manifest.publisherId];
    if (
      !publisherKey ||
      !verifySignature(canonicalJson(manifest), entry.publisherSignature, publisherKey)
    ) {
      throw registryError(
        'SKILL_REGISTRY_PUBLISHER_SIGNATURE_INVALID',
        'Skill publisher signature is invalid.'
      );
    }
    const expectedEntryHash = sha256(
      new TextEncoder().encode(
        canonicalJson({ manifest, publisherSignature: entry.publisherSignature })
      )
    );
    if (entry.transparency.entryHash !== expectedEntryHash) {
      throw registryError(
        'SKILL_REGISTRY_TRANSPARENCY_MISMATCH',
        'Skill transparency entry hash does not match the package.'
      );
    }
    const logKey = this.options.transparencyLogKeys[entry.transparency.logId];
    const proofPayload = canonicalJson({
      logId: entry.transparency.logId,
      logIndex: entry.transparency.logIndex,
      entryHash: entry.transparency.entryHash,
      checkpointHash: entry.transparency.checkpointHash,
    });
    if (!logKey || !verifySignature(proofPayload, entry.transparency.signature, logKey)) {
      throw registryError(
        'SKILL_REGISTRY_TRANSPARENCY_SIGNATURE_INVALID',
        'Skill transparency proof signature is invalid.'
      );
    }
  }

  private async request(url: URL): Promise<Response> {
    const headers = new Headers({ accept: 'application/json' });
    const authorization = await this.options.authorization?.();
    if (authorization) headers.set('authorization', authorization);
    try {
      return await this.fetchImpl(url, {
        method: 'GET',
        headers,
        redirect: 'error',
      });
    } catch {
      throw registryError('SKILL_REGISTRY_UNAVAILABLE', 'Skill registry request failed.');
    }
  }
}

function validateOptionalArtifactUrl(value: string | undefined, allowedOrigins: Set<string>): void {
  if (!value) return;
  const url = secureUrl(value, 'SKILL_REGISTRY_SBOM_URL_INVALID');
  if (!allowedOrigins.has(url.origin)) {
    throw registryError('SKILL_REGISTRY_SBOM_ORIGIN_DENIED', 'Skill SBOM origin is not allow-listed.');
  }
}

function verifySignature(payload: string, signature: string, publicKey: string): boolean {
  try {
    return verify(null, Buffer.from(payload, 'utf8'), publicKey, Buffer.from(signature, 'base64'));
  } catch {
    return false;
  }
}

async function boundedText(response: Response, maxBytes: number, code: string): Promise<string> {
  const bytes = await boundedBytes(response, maxBytes, code);
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw registryError('SKILL_REGISTRY_RESPONSE_INVALID', 'Skill registry response is not UTF-8.');
  }
}

async function boundedBytes(response: Response, maxBytes: number, code: string): Promise<Uint8Array> {
  const declared = Number(response.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > maxBytes) {
    throw registryError(code, 'Skill registry response exceeds its configured limit.');
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength > maxBytes) {
    throw registryError(code, 'Skill registry response exceeds its configured limit.');
  }
  return bytes;
}

function secureUrl(value: string, code: string): URL {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw registryError(code, 'Skill registry URL is invalid.');
  }
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw registryError(code, 'Skill registry URL must use HTTPS without embedded credentials.');
  }
  return url;
}

function ensureTrailingSlash(url: URL): URL {
  return new URL(url.pathname.endsWith('/') ? url.toString() : `${url.toString()}/`);
}

function canonicalJson(value: unknown): string {
  return JSON.stringify(sortObject(value));
}

function sortObject(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortObject);
  if (!value || typeof value !== 'object') return value;
  return Object.keys(value as Record<string, unknown>)
    .sort()
    .reduce<Record<string, unknown>>((result, key) => {
      const item = (value as Record<string, unknown>)[key];
      if (item !== undefined) result[key] = sortObject(item);
      return result;
    }, {});
}

function sha256(value: Uint8Array): string {
  return createHash('sha256').update(value).digest('hex');
}

function registryError(code: string, message: string): Error {
  return Object.assign(new Error(message), { code });
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
