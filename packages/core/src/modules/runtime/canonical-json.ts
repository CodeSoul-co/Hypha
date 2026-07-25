import { createHash } from 'crypto';
import { FrameworkError } from '../../errors';

export type CanonicalJsonValue =
  | null
  | boolean
  | number
  | string
  | CanonicalJsonValue[]
  | { [key: string]: CanonicalJsonValue };

export function canonicalizeJson(value: unknown): string {
  return serializeCanonicalJson(value, new Set<object>(), '$');
}

export function hashCanonicalJson(value: unknown): string {
  return `sha256:${createHash('sha256').update(canonicalizeJson(value)).digest('hex')}`;
}

function serializeCanonicalJson(value: unknown, ancestors: Set<object>, path: string): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail(path, 'must contain only finite numbers');
    return JSON.stringify(Object.is(value, -0) ? 0 : value);
  }
  if (typeof value !== 'object') {
    fail(path, `contains unsupported ${typeof value} value`);
  }

  const objectValue = value as object;
  if (ancestors.has(objectValue)) fail(path, 'contains a circular reference');
  ancestors.add(objectValue);
  try {
    if (Array.isArray(value)) {
      const items: string[] = [];
      for (let index = 0; index < value.length; index += 1) {
        if (!Object.prototype.hasOwnProperty.call(value, index)) {
          fail(`${path}[${index}]`, 'must not be a sparse array entry');
        }
        items.push(serializeCanonicalJson(value[index], ancestors, `${path}[${index}]`));
      }
      return `[${items.join(',')}]`;
    }

    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      fail(path, 'must contain only plain JSON objects');
    }
    if (Object.getOwnPropertySymbols(value).length > 0) {
      fail(path, 'must not contain symbol keys');
    }
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort(compareUnicodeCodePoints)
      .map(
        (key) =>
          `${JSON.stringify(key)}:${serializeCanonicalJson(record[key], ancestors, `${path}.${key}`)}`
      )
      .join(',')}}`;
  } finally {
    ancestors.delete(objectValue);
  }
}

function compareUnicodeCodePoints(left: string, right: string): number {
  const leftPoints = Array.from(left, (character) => character.codePointAt(0) ?? 0);
  const rightPoints = Array.from(right, (character) => character.codePointAt(0) ?? 0);
  const length = Math.min(leftPoints.length, rightPoints.length);
  for (let index = 0; index < length; index += 1) {
    const difference = leftPoints[index] - rightPoints[index];
    if (difference !== 0) return difference;
  }
  return leftPoints.length - rightPoints.length;
}

function fail(path: string, message: string): never {
  throw new FrameworkError({
    code: 'RUNTIME_INVALID_INPUT',
    message: `Canonical JSON ${path} ${message}`,
    context: { path },
  });
}
