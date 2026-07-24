import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';
import { canonicalizeJson } from './canonical-json';

describe('canonical JSON object boundaries', () => {
  it('accepts plain JSON objects created in another Realm', () => {
    const value = runInNewContext('({ nested: { value: 1 }, enabled: true })');

    expect(canonicalizeJson(value)).toBe('{"enabled":true,"nested":{"value":1}}');
  });

  it('continues to reject class instances', () => {
    class RuntimeState {
      constructor(readonly value: number) {}
    }

    expect(() => canonicalizeJson(new RuntimeState(1))).toThrow(
      'must contain only plain JSON objects'
    );
  });
});
