import Ajv, { type ErrorObject, type ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import type { JsonSchema } from '../../specs';
import { FrameworkError, isFrameworkError } from '../../errors';
import type { EventCreateInput, PersistedFrameworkEvent } from '../../events';
import { canonicalizeJson, hashCanonicalJson } from './canonical-json';

export interface EventSchemaDefinition {
  eventType: string;
  version: string;
  schema: JsonSchema;
  schemaHash: string;
  sensitivePaths?: string[];
  upcasterRefs?: string[];
}

export interface EventValidationIssue {
  path: string;
  code: string;
  message: string;
}

export interface EventValidationResult {
  valid: boolean;
  eventType: string;
  version: string;
  schemaHash?: string;
  issues: EventValidationIssue[];
}

export interface EventUpcaster {
  ref: string;
  eventType: string;
  fromVersion: string;
  toVersion: string;
  upcast(payload: unknown): unknown;
}

export interface EventSchemaRegistry {
  register(definition: EventSchemaDefinition): Promise<void>;
  registerUpcaster(upcaster: EventUpcaster): Promise<void>;
  validate(event: EventCreateInput): Promise<EventValidationResult>;
  upcast(event: PersistedFrameworkEvent, targetVersion?: string): Promise<PersistedFrameworkEvent>;
}

interface RegisteredSchema {
  definition: EventSchemaDefinition;
  validate: ValidateFunction;
}

export class InMemoryEventSchemaRegistry implements EventSchemaRegistry {
  private readonly ajv: Ajv;
  private readonly schemas = new Map<string, RegisteredSchema>();
  private readonly versions = new Map<string, Set<string>>();
  private readonly upcasters = new Map<string, EventUpcaster>();
  private readonly upcasterRefs = new Map<string, string>();

  constructor() {
    this.ajv = new Ajv({ allErrors: true, strict: true, validateFormats: true });
    addFormats(this.ajv);
  }

  async register(definition: EventSchemaDefinition): Promise<void> {
    validateDefinition(definition);
    const actualHash = hashCanonicalJson(definition.schema);
    if (actualHash !== definition.schemaHash) {
      schemaFailure('Event schema hash does not match its canonical schema', {
        eventType: definition.eventType,
        version: definition.version,
        expectedSchemaHash: definition.schemaHash,
        actualSchemaHash: actualHash,
      });
    }

    const key = schemaKey(definition.eventType, definition.version);
    const current = this.schemas.get(key);
    if (current) {
      if (definitionFingerprint(current.definition) !== definitionFingerprint(definition)) {
        schemaFailure('Event schema version is already registered with different content', {
          eventType: definition.eventType,
          version: definition.version,
        });
      }
      return;
    }

    let validate: ValidateFunction;
    try {
      validate = this.ajv.compile(structuredClone(definition.schema));
    } catch (error) {
      schemaFailure('Event schema is not a valid JSON Schema', {
        eventType: definition.eventType,
        version: definition.version,
        cause: error instanceof Error ? error.message : String(error),
      });
    }

    const stored = structuredClone(definition);
    this.schemas.set(key, { definition: stored, validate: validate! });
    const versions = this.versions.get(definition.eventType) ?? new Set<string>();
    versions.add(definition.version);
    this.versions.set(definition.eventType, versions);
  }

  async registerUpcaster(upcaster: EventUpcaster): Promise<void> {
    validateUpcaster(upcaster);
    const source = this.schemas.get(schemaKey(upcaster.eventType, upcaster.fromVersion));
    const target = this.schemas.get(schemaKey(upcaster.eventType, upcaster.toVersion));
    if (!source || !target) {
      schemaFailure('Event upcaster requires registered source and target schemas', {
        eventType: upcaster.eventType,
        fromVersion: upcaster.fromVersion,
        toVersion: upcaster.toVersion,
      });
    }
    if (!source.definition.upcasterRefs?.includes(upcaster.ref)) {
      schemaFailure('Event upcaster ref is not declared by its source schema', {
        eventType: upcaster.eventType,
        fromVersion: upcaster.fromVersion,
        upcasterRef: upcaster.ref,
      });
    }

    const key = upcasterKey(upcaster.eventType, upcaster.fromVersion, upcaster.toVersion);
    const refOwner = this.upcasterRefs.get(upcaster.ref);
    if (refOwner && refOwner !== key) {
      schemaFailure('Event upcaster ref is already registered for another version edge', {
        upcasterRef: upcaster.ref,
      });
    }
    const current = this.upcasters.get(key);
    if (current && current.ref !== upcaster.ref) {
      schemaFailure('Event upcaster edge is already registered', {
        eventType: upcaster.eventType,
        fromVersion: upcaster.fromVersion,
        toVersion: upcaster.toVersion,
      });
    }
    if (current && current.upcast !== upcaster.upcast) {
      schemaFailure('Event upcaster edge cannot be replaced by another implementation', {
        eventType: upcaster.eventType,
        fromVersion: upcaster.fromVersion,
        toVersion: upcaster.toVersion,
        upcasterRef: upcaster.ref,
      });
    }
    if (current) return;
    this.upcasters.set(key, Object.freeze({ ...upcaster }));
    this.upcasterRefs.set(upcaster.ref, key);
  }

  async validate(event: EventCreateInput): Promise<EventValidationResult> {
    const version = event.version ?? '1.0.0';
    const registered = this.schemas.get(schemaKey(event.type, version));
    if (!registered) {
      return invalidResult(
        event.type,
        version,
        '$',
        'schema_not_registered',
        'No schema registered'
      );
    }

    try {
      canonicalizeJson(event.payload);
    } catch (error) {
      return invalidResult(
        event.type,
        version,
        isFrameworkError(error) && typeof error.context?.path === 'string'
          ? error.context.path
          : '$',
        'non_json_payload',
        error instanceof Error ? error.message : 'Payload is not canonical JSON'
      );
    }

    const valid = registered.validate(event.payload);
    return {
      valid,
      eventType: event.type,
      version,
      schemaHash: registered.definition.schemaHash,
      issues: valid ? [] : formatAjvErrors(registered.validate.errors),
    };
  }

  async upcast(
    event: PersistedFrameworkEvent,
    targetVersion?: string
  ): Promise<PersistedFrameworkEvent> {
    const actualPayloadHash = hashCanonicalJson(event.payload);
    if (actualPayloadHash !== event.payloadHash) {
      throw new FrameworkError({
        code: 'RUNTIME_EVENT_STREAM_CORRUPT',
        message: `Event payload hash mismatch for ${event.id}`,
        context: {
          eventId: event.id,
          expectedPayloadHash: event.payloadHash,
          actualPayloadHash,
        },
      });
    }
    const target = targetVersion ?? this.latestVersion(event.type);
    if (!target) schemaFailure(`No schemas are registered for ${event.type}`);
    if (!this.schemas.has(schemaKey(event.type, event.version))) {
      schemaFailure(`Source schema is not registered for ${event.type}@${event.version}`);
    }
    if (!this.schemas.has(schemaKey(event.type, target))) {
      schemaFailure(`Target schema is not registered for ${event.type}@${target}`);
    }
    if (event.version === target) return structuredClone(event);

    const path = this.findUpcastPath(event.type, event.version, target);
    if (!path) {
      schemaFailure(`No upcast path exists for ${event.type}@${event.version} to ${target}`);
    }

    let payload = structuredClone(event.payload);
    let version = event.version;
    for (const upcaster of path) {
      payload = upcaster.upcast(payload);
      version = upcaster.toVersion;
      const validation = await this.validate({
        id: event.id,
        type: event.type,
        version,
        runId: event.runId,
        payload,
      });
      if (!validation.valid) {
        schemaFailure(`Upcast result failed ${event.type}@${version} validation`, {
          issues: validation.issues,
          upcasterRef: upcaster.ref,
        });
      }
    }
    return {
      ...structuredClone(event),
      version,
      payload,
      payloadHash: hashCanonicalJson(payload),
    };
  }

  private latestVersion(eventType: string): string | undefined {
    return [...(this.versions.get(eventType) ?? [])].sort(compareVersions).at(-1);
  }

  private findUpcastPath(
    eventType: string,
    fromVersion: string,
    targetVersion: string
  ): EventUpcaster[] | null {
    const queue: Array<{ version: string; path: EventUpcaster[] }> = [
      { version: fromVersion, path: [] },
    ];
    const visited = new Set([fromVersion]);
    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) break;
      const candidates = [...this.upcasters.values()]
        .filter((item) => item.eventType === eventType && item.fromVersion === current.version)
        .sort((left, right) => compareVersions(left.toVersion, right.toVersion));
      for (const candidate of candidates) {
        const nextPath = [...current.path, candidate];
        if (candidate.toVersion === targetVersion) return nextPath;
        if (!visited.has(candidate.toVersion)) {
          visited.add(candidate.toVersion);
          queue.push({ version: candidate.toVersion, path: nextPath });
        }
      }
    }
    return null;
  }
}

function validateDefinition(definition: EventSchemaDefinition): void {
  if (!definition.eventType || !definition.version || !definition.schemaHash) {
    schemaFailure('Event schema definition requires eventType, version, and schemaHash');
  }
  canonicalizeJson(definition.schema);
}

function validateUpcaster(upcaster: EventUpcaster): void {
  if (
    !upcaster.ref ||
    !upcaster.eventType ||
    !upcaster.fromVersion ||
    !upcaster.toVersion ||
    upcaster.fromVersion === upcaster.toVersion
  ) {
    schemaFailure('Event upcaster requires a ref and distinct source and target versions');
  }
}

function invalidResult(
  eventType: string,
  version: string,
  path: string,
  code: string,
  message: string
): EventValidationResult {
  return { valid: false, eventType, version, issues: [{ path, code, message }] };
}

function formatAjvErrors(errors: ErrorObject[] | null | undefined): EventValidationIssue[] {
  return (errors ?? []).map((error) => ({
    path: jsonPointerToPath(
      error.keyword === 'required' && typeof error.params.missingProperty === 'string'
        ? `${error.instancePath}/${escapeJsonPointer(error.params.missingProperty)}`
        : error.instancePath
    ),
    code: error.keyword,
    message: error.message ?? 'JSON Schema validation failed',
  }));
}

function jsonPointerToPath(pointer: string): string {
  if (!pointer) return '$';
  return `$${pointer
    .split('/')
    .slice(1)
    .map((part) => `.${part.replace(/~1/gu, '/').replace(/~0/gu, '~')}`)
    .join('')}`;
}

function escapeJsonPointer(value: string): string {
  return value.replace(/~/gu, '~0').replace(/\//gu, '~1');
}

function definitionFingerprint(definition: EventSchemaDefinition): string {
  return canonicalizeJson({
    eventType: definition.eventType,
    version: definition.version,
    schema: definition.schema,
    schemaHash: definition.schemaHash,
    sensitivePaths: definition.sensitivePaths ?? null,
    upcasterRefs: definition.upcasterRefs ?? null,
  });
}

function compareVersions(left: string, right: string): number {
  const leftParts = left.split('.');
  const rightParts = right.split('.');
  const length = Math.max(leftParts.length, rightParts.length);
  for (let index = 0; index < length; index += 1) {
    const leftPart = leftParts[index] ?? '';
    const rightPart = rightParts[index] ?? '';
    const leftNumber = /^\d+$/u.test(leftPart) ? Number(leftPart) : null;
    const rightNumber = /^\d+$/u.test(rightPart) ? Number(rightPart) : null;
    const difference =
      leftNumber !== null && rightNumber !== null
        ? leftNumber - rightNumber
        : leftPart.localeCompare(rightPart);
    if (difference !== 0) return difference;
  }
  return 0;
}

function schemaKey(eventType: string, version: string): string {
  return `${eventType}\u0000${version}`;
}

function upcasterKey(eventType: string, fromVersion: string, toVersion: string): string {
  return `${eventType}\u0000${fromVersion}\u0000${toVersion}`;
}

function schemaFailure(message: string, context?: Record<string, unknown>): never {
  throw new FrameworkError({ code: 'RUNTIME_MESSAGE_SCHEMA_INVALID', message, context });
}
