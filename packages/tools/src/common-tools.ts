import { createHash } from 'crypto';
import type { ToolSpec } from './index';

export type JsonValue = null | boolean | number | string | JsonValue[] | JsonObject;
export interface JsonObject {
  [key: string]: JsonValue;
}

export const COMMON_TOOL_LIMITS = Object.freeze({
  maxTextCharacters: 1_000_000,
  maxJsonDepth: 64,
  maxJsonNodes: 100_000,
  maxPointerSegments: 128,
  maxMatches: 1_000,
  maxQueryCharacters: 4_096,
});

export type JsonUtilityInput =
  | { operation: 'parse'; text: string }
  | { operation: 'stringify'; value: unknown; pretty?: boolean }
  | { operation: 'get'; value: unknown; pointer: string }
  | { operation: 'keys'; value: unknown };

export interface TextUtilityInput {
  operation:
    | 'length'
    | 'line_select'
    | 'literal_find'
    | 'literal_replace'
    | 'slice'
    | 'normalize_whitespace';
  text: string;
  start?: number;
  end?: number;
  query?: string;
  replacement?: string;
  caseSensitive?: boolean;
  maxResults?: number;
  mode?: 'spaces' | 'lines';
}

export type HashUtilityInput =
  | { operation: 'sha256_text'; text: string }
  | { operation: 'sha256_json'; value: unknown };

const commonGovernance = {
  sideEffectLevel: 'none' as const,
  timeoutPolicy: { timeoutMs: 1_000, onTimeout: 'fail' as const },
  auditPolicy: { enabled: true, includeInput: true, includeOutput: true },
  source: 'local' as const,
};

export const jsonUtilityToolSpec: ToolSpec = {
  id: 'utility.json',
  version: '1.0.0',
  name: 'utility.json',
  description:
    'Safely parse, deterministically stringify, inspect by JSON Pointer, or list keys in JSON values.',
  inputSchema: {
    type: 'object',
    required: ['operation'],
    additionalProperties: false,
    properties: {
      operation: { enum: ['parse', 'stringify', 'get', 'keys'] },
      text: { type: 'string', maxLength: COMMON_TOOL_LIMITS.maxTextCharacters },
      value: {},
      pointer: { type: 'string', maxLength: 8_192 },
      pretty: { type: 'boolean' },
    },
  },
  outputSchema: { type: 'object' },
  permissionScope: ['utility.json'],
  ...commonGovernance,
};

export const textUtilityToolSpec: ToolSpec = {
  id: 'utility.text',
  version: '1.0.0',
  name: 'utility.text',
  description:
    'Perform bounded text length, line selection, literal search/replace, Unicode slicing, and whitespace normalization.',
  inputSchema: {
    type: 'object',
    required: ['operation', 'text'],
    additionalProperties: false,
    properties: {
      operation: {
        enum: [
          'length',
          'line_select',
          'literal_find',
          'literal_replace',
          'slice',
          'normalize_whitespace',
        ],
      },
      text: { type: 'string', maxLength: COMMON_TOOL_LIMITS.maxTextCharacters },
      start: { type: 'integer', minimum: 0 },
      end: { type: 'integer', minimum: 0 },
      query: { type: 'string', minLength: 1, maxLength: COMMON_TOOL_LIMITS.maxQueryCharacters },
      replacement: { type: 'string', maxLength: COMMON_TOOL_LIMITS.maxTextCharacters },
      caseSensitive: { type: 'boolean' },
      maxResults: { type: 'integer', minimum: 1, maximum: COMMON_TOOL_LIMITS.maxMatches },
      mode: { enum: ['spaces', 'lines'] },
    },
  },
  outputSchema: { type: 'object' },
  permissionScope: ['utility.text'],
  ...commonGovernance,
};

export const hashUtilityToolSpec: ToolSpec = {
  id: 'utility.hash',
  version: '1.0.0',
  name: 'utility.hash',
  description: 'Compute SHA-256 for bounded text or canonical JSON without external side effects.',
  inputSchema: {
    type: 'object',
    required: ['operation'],
    additionalProperties: false,
    properties: {
      operation: { enum: ['sha256_text', 'sha256_json'] },
      text: { type: 'string', maxLength: COMMON_TOOL_LIMITS.maxTextCharacters },
      value: {},
    },
  },
  outputSchema: {
    type: 'object',
    required: ['algorithm', 'encoding', 'digest', 'inputBytes'],
    additionalProperties: false,
    properties: {
      algorithm: { enum: ['sha256'] },
      encoding: { enum: ['hex'] },
      digest: { type: 'string', minLength: 64, maxLength: 64 },
      inputBytes: { type: 'integer', minimum: 0 },
    },
  },
  permissionScope: ['utility.hash'],
  ...commonGovernance,
};

export const commonUtilityToolSpecs = [
  jsonUtilityToolSpec,
  textUtilityToolSpec,
  hashUtilityToolSpec,
] as const;

export function executeJsonUtility(input: JsonUtilityInput): Record<string, unknown> {
  switch (input.operation) {
    case 'parse': {
      assertText(input.text, 'text');
      let parsed: unknown;
      try {
        parsed = JSON.parse(input.text);
      } catch (error) {
        throw utilityError('UTILITY_JSON_PARSE_FAILED', errorMessage(error));
      }
      return { value: sanitizeJsonValue(parsed) };
    }
    case 'stringify': {
      const value = sanitizeJsonValue(input.value);
      const text = input.pretty ? JSON.stringify(value, null, 2) : stableJson(value);
      assertText(text, 'output');
      return { text };
    }
    case 'get': {
      const value = sanitizeJsonValue(input.value);
      const resolved = resolveJsonPointer(value, input.pointer);
      return resolved.found ? { found: true, value: resolved.value } : { found: false };
    }
    case 'keys': {
      const value = sanitizeJsonValue(input.value);
      if (!isJsonObject(value)) {
        throw utilityError('UTILITY_JSON_OBJECT_REQUIRED', 'keys requires a JSON object value.');
      }
      const keys = Object.keys(value).sort();
      return { keys, count: keys.length };
    }
    default:
      throw utilityError('UTILITY_JSON_OPERATION_INVALID', 'Unsupported JSON utility operation.');
  }
}

export function executeTextUtility(input: TextUtilityInput): Record<string, unknown> {
  assertText(input.text, 'text');
  switch (input.operation) {
    case 'length':
      return {
        codeUnits: input.text.length,
        codePoints: Array.from(input.text).length,
        utf8Bytes: Buffer.byteLength(input.text, 'utf8'),
        lines: input.text.length === 0 ? 0 : input.text.split(/\r\n|\r|\n/).length,
      };
    case 'line_select': {
      const lines = input.text.split(/\r\n|\r|\n/);
      const start = boundedIndex(input.start ?? 0, lines.length, 'start');
      const end = boundedIndex(input.end ?? lines.length, lines.length, 'end');
      if (end < start) throw utilityError('UTILITY_TEXT_RANGE_INVALID', 'end must be >= start.');
      const text = lines.slice(start, end).join('\n');
      return { text, start, end, selectedLines: end - start, totalLines: lines.length };
    }
    case 'literal_find': {
      const query = requiredQuery(input.query);
      const maxResults = boundedResultCount(input.maxResults);
      const expression = new RegExp(
        escapeRegExp(query),
        input.caseSensitive === false ? 'gi' : 'g'
      );
      const indexes: number[] = [];
      for (const match of input.text.matchAll(expression)) {
        indexes.push(match.index);
        if (indexes.length > maxResults) break;
      }
      const truncated = indexes.length > maxResults;
      const boundedIndexes = indexes.slice(0, maxResults);
      return { indexes: boundedIndexes, count: boundedIndexes.length, truncated };
    }
    case 'literal_replace': {
      const query = requiredQuery(input.query);
      const replacement = input.replacement ?? '';
      assertText(replacement, 'replacement');
      const maxResults = boundedResultCount(input.maxResults);
      const expression = new RegExp(
        escapeRegExp(query),
        input.caseSensitive === false ? 'gi' : 'g'
      );
      let replacements = 0;
      let truncated = false;
      const text = input.text.replace(expression, (matched) => {
        if (replacements >= maxResults) {
          truncated = true;
          return matched;
        }
        replacements += 1;
        return replacement;
      });
      assertText(text, 'output');
      return { text, replacements, truncated };
    }
    case 'slice': {
      const codePoints = Array.from(input.text);
      const start = boundedIndex(input.start ?? 0, codePoints.length, 'start');
      const end = boundedIndex(input.end ?? codePoints.length, codePoints.length, 'end');
      if (end < start) throw utilityError('UTILITY_TEXT_RANGE_INVALID', 'end must be >= start.');
      return { text: codePoints.slice(start, end).join(''), start, end };
    }
    case 'normalize_whitespace': {
      const mode = input.mode ?? 'spaces';
      const text =
        mode === 'spaces'
          ? input.text.replace(/[\t ]+/g, ' ').trim()
          : input.text
              .split(/\r\n|\r|\n/)
              .map((line) => line.replace(/[\t ]+$/g, ''))
              .join('\n')
              .replace(/\n{3,}/g, '\n\n')
              .trim();
      return { text, mode };
    }
    default:
      throw utilityError('UTILITY_TEXT_OPERATION_INVALID', 'Unsupported text utility operation.');
  }
}

export function executeHashUtility(input: HashUtilityInput): Record<string, unknown> {
  let material: string;
  if (input.operation === 'sha256_text') {
    assertText(input.text, 'text');
    material = input.text;
  } else if (input.operation === 'sha256_json') {
    material = stableJson(sanitizeJsonValue(input.value));
  } else {
    throw utilityError('UTILITY_HASH_OPERATION_INVALID', 'Unsupported hash utility operation.');
  }
  assertText(material, 'hash input');
  return {
    algorithm: 'sha256',
    encoding: 'hex',
    digest: createHash('sha256').update(material, 'utf8').digest('hex'),
    inputBytes: Buffer.byteLength(material, 'utf8'),
  };
}

export function sanitizeJsonValue(value: unknown): JsonValue {
  const counter = { nodes: 0 };
  return sanitizeJsonNode(value, 0, counter);
}

function sanitizeJsonNode(value: unknown, depth: number, counter: { nodes: number }): JsonValue {
  counter.nodes += 1;
  if (counter.nodes > COMMON_TOOL_LIMITS.maxJsonNodes) {
    throw utilityError('UTILITY_JSON_NODE_LIMIT', 'JSON value exceeds the node limit.');
  }
  if (depth > COMMON_TOOL_LIMITS.maxJsonDepth) {
    throw utilityError('UTILITY_JSON_DEPTH_LIMIT', 'JSON value exceeds the depth limit.');
  }
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw utilityError('UTILITY_JSON_NUMBER_INVALID', 'JSON numbers must be finite.');
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeJsonNode(item, depth + 1, counter));
  }
  const prototype = value && typeof value === 'object' ? Object.getPrototypeOf(value) : undefined;
  if (
    !value ||
    typeof value !== 'object' ||
    (prototype !== Object.prototype && prototype !== null)
  ) {
    throw utilityError(
      'UTILITY_JSON_VALUE_INVALID',
      'Value must contain JSON-compatible data only.'
    );
  }
  const output: JsonObject = Object.create(null) as JsonObject;
  for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
    assertSafeKey(key);
    output[key] = sanitizeJsonNode(nested, depth + 1, counter);
  }
  return output;
}

function stableJson(value: JsonValue): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
    .join(',')}}`;
}

function resolveJsonPointer(
  value: JsonValue,
  pointer: string
): { found: true; value: JsonValue } | { found: false } {
  if (typeof pointer !== 'string') {
    throw utilityError('UTILITY_JSON_POINTER_REQUIRED', 'pointer must be a string.');
  }
  if (pointer === '') return { found: true, value };
  if (!pointer.startsWith('/')) {
    throw utilityError(
      'UTILITY_JSON_POINTER_INVALID',
      'JSON Pointer must be empty or start with /.'
    );
  }
  const segments = pointer.slice(1).split('/').map(decodePointerSegment);
  if (segments.length > COMMON_TOOL_LIMITS.maxPointerSegments) {
    throw utilityError('UTILITY_JSON_POINTER_LIMIT', 'JSON Pointer has too many segments.');
  }
  let current: JsonValue = value;
  for (const segment of segments) {
    assertSafeKey(segment);
    if (Array.isArray(current)) {
      if (!/^(0|[1-9]\d*)$/.test(segment)) return { found: false };
      const index = Number(segment);
      if (index >= current.length) return { found: false };
      current = current[index];
      continue;
    }
    if (!isJsonObject(current) || !Object.prototype.hasOwnProperty.call(current, segment)) {
      return { found: false };
    }
    current = current[segment];
  }
  return { found: true, value: current };
}

function decodePointerSegment(segment: string): string {
  if (/~(?:[^01]|$)/.test(segment)) {
    throw utilityError('UTILITY_JSON_POINTER_INVALID', 'JSON Pointer contains an invalid escape.');
  }
  return segment.replace(/~1/g, '/').replace(/~0/g, '~');
}

function isJsonObject(value: JsonValue): value is JsonObject {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function assertSafeKey(key: string): void {
  if (key === '__proto__' || key === 'prototype' || key === 'constructor') {
    throw utilityError('UTILITY_JSON_UNSAFE_KEY', `Unsafe JSON key is not allowed: ${key}`);
  }
}

function assertText(value: string, field: string): void {
  if (typeof value !== 'string') {
    throw utilityError('UTILITY_TEXT_REQUIRED', `${field} must be a string.`);
  }
  if (value.length > COMMON_TOOL_LIMITS.maxTextCharacters) {
    throw utilityError(
      'UTILITY_TEXT_LIMIT',
      `${field} exceeds ${COMMON_TOOL_LIMITS.maxTextCharacters} characters.`
    );
  }
}

function requiredQuery(query: string | undefined): string {
  if (!query) throw utilityError('UTILITY_TEXT_QUERY_REQUIRED', 'query must not be empty.');
  if (query.length > COMMON_TOOL_LIMITS.maxQueryCharacters) {
    throw utilityError('UTILITY_TEXT_QUERY_LIMIT', 'query exceeds the character limit.');
  }
  return query;
}

function boundedResultCount(value: number = COMMON_TOOL_LIMITS.maxMatches): number {
  if (!Number.isInteger(value) || value < 1) {
    throw utilityError(
      'UTILITY_TEXT_RESULT_LIMIT_INVALID',
      'maxResults must be a positive integer.'
    );
  }
  return Math.min(value, COMMON_TOOL_LIMITS.maxMatches);
}

function boundedIndex(value: number, maximum: number, field: string): number {
  if (!Number.isInteger(value) || value < 0 || value > maximum) {
    throw utilityError(
      'UTILITY_TEXT_INDEX_INVALID',
      `${field} must be an integer between 0 and ${maximum}.`
    );
  }
  return value;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function utilityError(code: string, message: string): Error & { code: string } {
  return Object.assign(new Error(message), { code });
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
