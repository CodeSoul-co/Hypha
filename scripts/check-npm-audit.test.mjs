import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { validateReport } from './check-npm-audit.mjs';

const advisory = {
  source: 1,
  name: 'dependency-a',
  url: 'https://github.com/advisories/GHSA-aaaa-bbbb-cccc',
  severity: 'moderate',
};

function report() {
  return {
    auditReportVersion: 2,
    vulnerabilities: {
      'dependency-a': {
        severity: 'moderate',
        via: [advisory],
        nodes: ['node_modules/dependency-a'],
      },
      parent: {
        severity: 'moderate',
        via: ['dependency-a'],
        nodes: ['node_modules/parent'],
      },
    },
  };
}

function policy() {
  return {
    version: 1,
    expiresOn: '2026-10-04',
    exceptions: {
      'dependency-a': {
        severity: 'moderate',
        nodes: ['node_modules/dependency-a'],
        advisories: ['GHSA-aaaa-bbbb-cccc'],
        reason: 'The vulnerable function is unreachable.',
      },
      parent: {
        severity: 'moderate',
        nodes: ['node_modules/parent'],
        advisories: ['GHSA-aaaa-bbbb-cccc'],
        reason: 'This is a propagated finding.',
      },
    },
  };
}

describe('npm audit policy', () => {
  it('accepts only the exact, unexpired report described by policy', () => {
    assert.deepEqual(validateReport(report(), policy(), new Date('2026-09-04T00:00:00Z')), []);
  });

  it('rejects new advisories, severities, and dependency paths', () => {
    const changed = report();
    changed.vulnerabilities['dependency-a'].severity = 'high';
    changed.vulnerabilities['dependency-a'].nodes = ['node_modules/nested/dependency-a'];
    changed.vulnerabilities['dependency-a'].via.push({
      ...advisory,
      url: 'https://github.com/advisories/GHSA-dddd-eeee-ffff',
    });

    assert.deepEqual(validateReport(changed, policy(), new Date('2026-09-04T00:00:00Z')), [
      'dependency-a severity changed from moderate to high.',
      'dependency-a dependency nodes changed.',
      'dependency-a advisory roots changed.',
      'parent advisory roots changed.',
    ]);
  });

  it('rejects unexpected vulnerabilities and stale exceptions', () => {
    const changed = report();
    delete changed.vulnerabilities.parent;
    changed.vulnerabilities.unreviewed = {
      severity: 'low',
      via: [],
      nodes: ['node_modules/unreviewed'],
    };

    assert.deepEqual(validateReport(changed, policy(), new Date('2026-09-04T00:00:00Z')), [
      'Unexpected vulnerability: unreviewed.',
      'Stale audit exception must be removed: parent.',
    ]);
  });

  it('rejects expired exceptions and malformed reports', () => {
    assert.deepEqual(validateReport(report(), policy(), new Date('2026-10-05T00:00:00Z')), [
      'Audit exceptions expired on 2026-10-04.',
    ]);
    assert.deepEqual(validateReport({}, policy(), new Date('2026-09-04T00:00:00Z')), [
      'Unsupported or malformed npm audit report.',
    ]);
  });
});
