import { generateId, generateSessionId, generateApiKey, formatDate, sleep, chunk, omit, pick } from '../../src/utils/helpers';

describe('Helpers', () => {
  describe('generateId', () => {
    it('should generate a valid UUID-like ID', () => {
      const id = generateId();
      expect(id).toBeDefined();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });

    it('should generate unique IDs', () => {
      const ids = new Set();
      for (let i = 0; i < 100; i++) {
        ids.add(generateId());
      }
      expect(ids.size).toBe(100);
    });
  });

  describe('generateSessionId', () => {
    it('should generate a session ID with prefix', () => {
      const sessionId = generateSessionId();
      expect(sessionId).toMatch(/^sess_/);
    });
  });

  describe('generateApiKey', () => {
    it('should generate an API key with prefix', () => {
      const apiKey = generateApiKey();
      expect(apiKey).toMatch(/^oa_/);
    });
  });

  describe('formatDate', () => {
    it('should format a date correctly', () => {
      const date = new Date('2024-01-15T10:30:00');
      const formatted = formatDate(date, 'YYYY-MM-DD');
      expect(formatted).toBe('2024-01-15');
    });
  });

  describe('sleep', () => {
    it('should delay execution', async () => {
      const start = Date.now();
      await sleep(100);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(95);
    });
  });

  describe('chunk', () => {
    it('should split array into chunks', () => {
      const arr = [1, 2, 3, 4, 5];
      const chunks = chunk(arr, 2);
      expect(chunks).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should handle empty arrays', () => {
      const chunks = chunk([], 2);
      expect(chunks).toEqual([]);
    });
  });

  describe('omit', () => {
    it('should omit specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = omit(obj, ['b']);
      expect(result).toEqual({ a: 1, c: 3 });
      expect(result).not.toHaveProperty('b');
    });
  });

  describe('pick', () => {
    it('should pick specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = pick(obj, ['a', 'c']);
      expect(result).toEqual({ a: 1, c: 3 });
    });
  });
});
