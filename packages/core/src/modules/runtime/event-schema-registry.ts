import { FrameworkError } from '../../errors';
import type { EventCreateInput, PersistedFrameworkEvent } from '../../events';
import { canonicalizeJson, hashCanonicalJson } from './canonical-json';

export interface EventSchemaDefinition {
  eventType: string;
  version: string;
  schema: Record<string, unknown>;
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

export class InMemoryEventSchemaRegistry implements EventSchemaRegistry {
  private readonly definitions = new Map<string, EventSchemaDefinition>();
  private readonly versions = new Map<string, Set<string>>();
  private readonly upcasters = new Map<string, EventUpcaster>();

  async register(definition: EventSchemaDefinition): Promise<void> {
    validateDefinition(definition);
    const actualHash = hashCanonicalJson(definition.schema);
    if (actualHash !== definition.schemaHash) {
      throw new FrameworkError({
        code: 'RUNTIME_MESSAGE_SCHEMA_INVALID',
        message: 'Event schema hash does not match its canonical schema',
        context: {
          eventType: definition.eventType,
          version: definition.version,
          expectedSchemaHash: definition.schemaHash,
          actualSchemaHash: actualHash,
        },
      });
    }
    const key = schemaKey(definition.eventType, definition.version);
    const current = this.definitions.get(key);
    if (current && definitionFingerprint(current) !== definitionFingerprint(definition)) {
      throw new FrameworkError({
        code: 'RUNTIME_MESSAGE_SCHEMA_INVALID',
        message: 'Event schema version is already registered with different content',
        context: { eventType: definition.eventType, version: definition.version },
      });
    }
    this.definitions.set(key, structuredClone(definition));
    const versions = this.versions.get(definition.eventType) ?? new Set<string>();
    versions.add(definition.version);
    this.versions.set(definition.eventType, versions);
  }

  async registerUpcaster(upcaster: EventUpcaster): Promise<void> {
    if (
      !upcaster.ref ||
      !upcaster.eventType ||
      !upcaster.fromVersion ||
      !upcaster.toVersion ||
      upcaster.fromVersion === upcaster.toVersion
    ) {
      throw new FrameworkError({
        code: 'RUNTIME_MESSAGE_SCHEMA_INVALID',
        message: 'Event upcaster requires distinct source and target versions',
      });
    }
    const key = upcasterKey(upcaster.eventType, upcaster.fromVersion, upcaster.toVersion);
    const current = this.upcasters.get(key);
    if (current && current.ref !== upcaster.ref) {
      throw new FrameworkError({
        code: 'RUNTIME_MESSAGE_SCHEMA_INVALID',
        message: 'Event upcaster edge is already registered',
        context: {
          eventType: upcaster.eventType,
          fromVersion: upcaster.fromVersion,
          toVersion: upcaster.toVersion,
        },
      });
    }
    this.upcasters.set(key, upcaster);
  }

  async validate(event: EventCreateInput): Promise<EventValidationResult> {
    const version = event.version ?? '1.0.0';
    const definition = this.definitions.get(schemaKey(event.type, version));
    if (!definition) {
      return {
        valid: false,
        eventType: event.type,
        version,
        issues: [
          {
            path: '$',
            code: 'schema_not_registered',
            message: `No schema is registered for ${event.type}@${version}`,
          },
        ],
      };
    }
    const issues = validateJsonSchema(definition.schema, event.payload);
    return {
      valid: issues.length === 0,
      eventType: event.type,
      version,
      schemaHash: definition.schemaHash,
      issues,
    };
  }

  async upcast(
    event: PersistedFrameworkEvent,
    targetVersion?: string
  ): Promise<PersistedFrameworkEvent> {
    const target = targetVersion ?? this.latestVersion(event.type);
    if (!target) schemaFailure(`No schemas are registered for ${event.type}`);
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
        throw new FrameworkError({
          code: 'RUNTIME_MESSAGE_SCHEMA_INVALID',
          message: `Upcast result failed ${event.type}@${version} validation`,
          context: { issues: validation.issues, upcasterRef: upcaster.ref },
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
        const path = [...current.path, candidate];
        if (candidate.toVersion === targetVersion) return path;
        if (!visited.has(candidate.toVersion)) {
          visited.add(candidate.toVersion);
          queue.push({ version: candidate.toVersion, path });
        }
      }
    }
    return null;
  }
}

export function validateJsonSchema(
  schema: Record<string, unknown>,
  value: unknown,
  path = '$'
): EventValidationIssue[] {
  const issues: EventValidationIssue[] = [];
  validateSchemaNode(schema, value, path, issues);
  return issues;
}

function validateSchemaNode(
  schema: Record<string, unknown>,
  value: unknown,
  path: string,
  issues: EventValidationIssue[]
): void {
  const allowedTypes = Array.isArray(schema.type) ? schema.type : [schema.type];
  if (schema.type !== undefined && !allowedTypes.some((type) => matchesType(type, value))) {
    issue(issues, path, 'type', `must be ${allowedTypes.join(' or ')}`);
    return;
  }
  if (Array.isArray(schema.enum) && !schema.enum.some((item) => jsonEqual(item, value))) {
    issue(issues, path, 'enum', 'must match an allowed value');
  }
  if ('const' in schema && !jsonEqual(schema.const, value)) {
    issue(issues, path, 'const', 'must match the constant value');
  }

  validateCompositions(schema, value, path, issues);
  if (typeof value === 'string') validateString(schema, value, path, issues);
  if (typeof value === 'number') validateNumber(schema, value, path, issues);
  if (Array.isArray(value)) validateArray(schema, value, path, issues);
  if (isPlainObject(value)) validateObject(schema, value, path, issues);
}

function validateCompositions(
  schema: Record<string, unknown>,
  value: unknown,
  path: string,
  issues: EventValidationIssue[]
): void {
  const allOf = schemaArray(schema.allOf);
  for (const child of allOf) validateSchemaNode(child, value, path, issues);
  const anyOf = schemaArray(schema.anyOf);
  if (
    anyOf.length > 0 &&
    !anyOf.some((child) => validateJsonSchema(child, value, path).length === 0)
  ) {
    issue(issues, path, 'anyOf', 'must match at least one schema');
  }
  const oneOf = schemaArray(schema.oneOf);
  if (
    oneOf.length > 0 &&
    oneOf.filter((child) => validateJsonSchema(child, value, path).length === 0).length !== 1
  ) {
    issue(issues, path, 'oneOf', 'must match exactly one schema');
  }
  const not = asSchema(schema.not);
  if (not && validateJsonSchema(not, value, path).length === 0) {
    issue(issues, path, 'not', 'must not match the excluded schema');
  }
  const condition = asSchema(schema.if);
  if (condition) {
    const branch =
      validateJsonSchema(condition, value, path).length === 0 ? schema.then : schema.else;
    const branchSchema = asSchema(branch);
    if (branchSchema) validateSchemaNode(branchSchema, value, path, issues);
  }
}

function validateObject(
  schema: Record<string, unknown>,
  value: Record<string, unknown>,
  path: string,
  issues: EventValidationIssue[]
): void {
  const required = Array.isArray(schema.required) ? schema.required : [];
  for (const key of required) {
    if (typeof key === 'string' && !Object.prototype.hasOwnProperty.call(value, key)) {
      issue(issues, `${path}.${key}`, 'required', 'is required');
    }
  }
  const properties = isPlainObject(schema.properties) ? schema.properties : {};
  for (const [key, childValue] of Object.entries(value)) {
    const childSchema = asSchema(properties[key]);
    if (childSchema) {
      validateSchemaNode(childSchema, childValue, `${path}.${key}`, issues);
      continue;
    }
    if (schema.additionalProperties === false) {
      issue(issues, `${path}.${key}`, 'additionalProperties', 'is not allowed');
    } else {
      const additional = asSchema(schema.additionalProperties);
      if (additional) validateSchemaNode(additional, childValue, `${path}.${key}`, issues);
    }
  }
}

function validateArray(
  schema: Record<string, unknown>,
  value: unknown[],
  path: string,
  issues: EventValidationIssue[]
): void {
  const minimum = numericKeyword(schema.minItems);
  const maximum = numericKeyword(schema.maxItems);
  if (minimum !== undefined && value.length < minimum)
    issue(issues, path, 'minItems', 'is too short');
  if (maximum !== undefined && value.length > maximum)
    issue(issues, path, 'maxItems', 'is too long');
  if (schema.uniqueItems === true) {
    const seen = new Set<string>();
    for (const item of value) {
      const canonical = canonicalizeJson(item);
      if (seen.has(canonical)) issue(issues, path, 'uniqueItems', 'contains duplicate items');
      seen.add(canonical);
    }
  }
  const items = asSchema(schema.items);
  if (items)
    value.forEach((item, index) => validateSchemaNode(items, item, `${path}[${index}]`, issues));
}

function validateString(
  schema: Record<string, unknown>,
  value: string,
  path: string,
  issues: EventValidationIssue[]
): void {
  const minimum = numericKeyword(schema.minLength);
  const maximum = numericKeyword(schema.maxLength);
  if (minimum !== undefined && Array.from(value).length < minimum)
    issue(issues, path, 'minLength', 'is too short');
  if (maximum !== undefined && Array.from(value).length > maximum)
    issue(issues, path, 'maxLength', 'is too long');
  if (typeof schema.pattern === 'string' && !new RegExp(schema.pattern, 'u').test(value)) {
    issue(issues, path, 'pattern', 'does not match the required pattern');
  }
  if (schema.format === 'date-time' && Number.isNaN(Date.parse(value))) {
    issue(issues, path, 'format', 'must be a valid date-time');
  }
}

function validateNumber(
  schema: Record<string, unknown>,
  value: number,
  path: string,
  issues: EventValidationIssue[]
): void {
  if (!Number.isFinite(value)) issue(issues, path, 'finite', 'must be finite');
  const minimum = numericKeyword(schema.minimum);
  const maximum = numericKeyword(schema.maximum);
  if (minimum !== undefined && value < minimum) issue(issues, path, 'minimum', 'is below minimum');
  if (maximum !== undefined && value > maximum) issue(issues, path, 'maximum', 'is above maximum');
}

function matchesType(type: unknown, value: unknown): boolean {
  if (type === 'null') return value === null;
  if (type === 'array') return Array.isArray(value);
  if (type === 'object') return isPlainObject(value);
  if (type === 'integer') return typeof value === 'number' && Number.isInteger(value);
  return typeof type === 'string' && typeof value === type;
}

function jsonEqual(left: unknown, right: unknown): boolean {
  try {
    return canonicalizeJson(left) === canonicalizeJson(right);
  } catch {
    return Object.is(left, right);
  }
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
        : leftPart < rightPart
          ? -1
          : leftPart > rightPart
            ? 1
            : 0;
    if (difference !== 0) return difference;
  }
  return 0;
}

function validateDefinition(definition: EventSchemaDefinition): void {
  if (!definition.eventType || !definition.version || !definition.schemaHash) {
    schemaFailure('Event schema definition requires eventType, version, and schemaHash');
  }
  canonicalizeJson(definition.schema);
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

function schemaKey(eventType: string, version: string): string {
  return `${eventType}\u0000${version}`;
}

function upcasterKey(eventType: string, fromVersion: string, toVersion: string): string {
  return `${eventType}\u0000${fromVersion}\u0000${toVersion}`;
}

function schemaArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.map(asSchema).filter((item) => item !== null) : [];
}

function asSchema(value: unknown): Record<string, unknown> | null {
  return isPlainObject(value) ? value : null;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function numericKeyword(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function issue(issues: EventValidationIssue[], path: string, code: string, message: string): void {
  issues.push({ path, code, message });
}

function schemaFailure(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_MESSAGE_SCHEMA_INVALID', message });
}
