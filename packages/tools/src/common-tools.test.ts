import { describe, expect, it } from 'vitest';
import {
  commonUtilityToolSpecs,
  executeHashUtility,
  executeJsonUtility,
  executeTextUtility,
  sanitizeJsonValue,
} from './common-tools';
import { validateToolSpec } from './index';

describe('@hypha/tools common utility tools', () => {
  it('publishes strict, side-effect-free governed tool specs', () => {
    expect(commonUtilityToolSpecs.map((spec) => validateToolSpec(spec).id)).toEqual([
      'utility.json',
      'utility.text',
      'utility.hash',
    ]);
    expect(commonUtilityToolSpecs.every((spec) => spec.sideEffectLevel === 'none')).toBe(true);
    expect(
      commonUtilityToolSpecs.every((spec) => spec.inputSchema.additionalProperties === false)
    ).toBe(true);
  });

  it('parses, stably serializes, and resolves RFC 6901 JSON Pointers', () => {
    expect(
      executeJsonUtility({ operation: 'stringify', value: { z: 1, a: { d: 2, c: 1 } } })
    ).toEqual({ text: '{"a":{"c":1,"d":2},"z":1}' });
    expect(
      executeJsonUtility({
        operation: 'get',
        value: { 'a/b': { '~key': 'value' } },
        pointer: '/a~1b/~0key',
      })
    ).toEqual({ found: true, value: 'value' });
    expect(executeJsonUtility({ operation: 'get', value: [1], pointer: '/2' })).toEqual({
      found: false,
    });
  });

  it('rejects prototype keys, non-JSON values, invalid pointers, and excessive depth', () => {
    expect(() =>
      executeJsonUtility({ operation: 'parse', text: '{"__proto__":{"polluted":true}}' })
    ).toThrow(/Unsafe JSON key/);
    expect(() => sanitizeJsonValue({ value: Number.POSITIVE_INFINITY })).toThrow(/finite/);
    expect(() =>
      executeJsonUtility({ operation: 'get', value: {}, pointer: 'missing-slash' })
    ).toThrow(/must be empty or start/);

    let nested: unknown = null;
    for (let depth = 0; depth < 66; depth += 1) nested = [nested];
    expect(() => sanitizeJsonValue(nested)).toThrow(/depth limit/);
  });

  it('handles Unicode slices and treats search input as a literal, not a regular expression', () => {
    expect(executeTextUtility({ operation: 'slice', text: 'A😀BC', start: 1, end: 3 })).toEqual({
      text: '😀B',
      start: 1,
      end: 3,
    });
    expect(
      executeTextUtility({
        operation: 'literal_find',
        text: 'a.b A.B a-b',
        query: 'a.b',
        caseSensitive: false,
      })
    ).toEqual({ indexes: [0, 4], count: 2, truncated: false });
    expect(
      executeTextUtility({
        operation: 'literal_replace',
        text: 'x x x',
        query: 'x',
        replacement: '$&',
        maxResults: 2,
      })
    ).toEqual({ text: '$& $& x', replacements: 2, truncated: true });
  });

  it('provides bounded line and whitespace operations with explicit ranges', () => {
    expect(
      executeTextUtility({ operation: 'line_select', text: 'a\r\nb\nc', start: 1, end: 3 })
    ).toEqual({ text: 'b\nc', start: 1, end: 3, selectedLines: 2, totalLines: 3 });
    expect(
      executeTextUtility({ operation: 'normalize_whitespace', text: ' a\t b  ', mode: 'spaces' })
    ).toEqual({ text: 'a b', mode: 'spaces' });
    expect(() => executeTextUtility({ operation: 'slice', text: 'abc', start: 3, end: 2 })).toThrow(
      /end must be/
    );
  });

  it('hashes canonical JSON deterministically regardless of object key order', () => {
    const left = executeHashUtility({ operation: 'sha256_json', value: { b: 2, a: 1 } });
    const right = executeHashUtility({ operation: 'sha256_json', value: { a: 1, b: 2 } });

    expect(left.digest).toBe(right.digest);
    expect(left).toMatchObject({ algorithm: 'sha256', encoding: 'hex', inputBytes: 13 });
    expect(String(left.digest)).toHaveLength(64);
  });
});
