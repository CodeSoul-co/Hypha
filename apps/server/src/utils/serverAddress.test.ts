import { formatLocalHealthBaseUrl } from './serverAddress';

describe('formatLocalHealthBaseUrl', () => {
  it('uses connectable loopback addresses for wildcard listeners', () => {
    expect(formatLocalHealthBaseUrl('0.0.0.0', 3000)).toBe('http://127.0.0.1:3000');
    expect(formatLocalHealthBaseUrl('::', 3000)).toBe('http://[::1]:3000');
  });

  it('preserves explicit IPv4, IPv6 and DNS listener addresses', () => {
    expect(formatLocalHealthBaseUrl('127.0.0.2', 8080)).toBe('http://127.0.0.2:8080');
    expect(formatLocalHealthBaseUrl('::1', 8080)).toBe('http://[::1]:8080');
    expect(formatLocalHealthBaseUrl('localhost', 8080)).toBe('http://localhost:8080');
  });
});
