import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run();
}

function run() {
  const policyPath = fileURLToPath(new URL('./npm-audit-policy.json', import.meta.url));
  const policy = JSON.parse(readFileSync(policyPath, 'utf8'));
  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const audit = spawnSync(npmCommand, ['audit', '--json'], {
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
    timeout: 420_000,
  });

  if (audit.error) {
    console.error(`Unable to run npm audit: ${audit.error.message}`);
    process.exit(1);
  }

  let report;
  try {
    report = JSON.parse(audit.stdout);
  } catch {
    console.error('npm audit did not return valid JSON.');
    if (audit.stderr) console.error(audit.stderr.trim());
    process.exit(1);
  }

  const errors = validateReport(report, policy, new Date());
  if (errors.length > 0) {
    console.error('npm audit policy rejected the dependency report:');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  const accepted = Object.keys(report.vulnerabilities).length;
  if (accepted === 0) {
    console.log('npm audit found no vulnerabilities.');
  } else {
    console.warn(
      `npm audit accepted ${accepted} exact, time-bounded vulnerability entries through ${policy.expiresOn}.`
    );
    for (const [name, exception] of Object.entries(policy.exceptions)) {
      console.warn(`- ${name}: ${exception.reason}`);
    }
  }
}

export function validateReport(reportValue, policyValue, now) {
  const validationErrors = [];
  if (reportValue?.auditReportVersion !== 2 || !isRecord(reportValue.vulnerabilities)) {
    return ['Unsupported or malformed npm audit report.'];
  }
  if (
    policyValue?.version !== 1 ||
    !isRecord(policyValue.exceptions) ||
    typeof policyValue.expiresOn !== 'string'
  ) {
    return ['Unsupported or malformed npm audit policy.'];
  }

  const expiry = new Date(`${policyValue.expiresOn}T23:59:59.999Z`);
  if (Number.isNaN(expiry.getTime()) || now.getTime() > expiry.getTime()) {
    validationErrors.push(`Audit exceptions expired on ${policyValue.expiresOn}.`);
  }

  const vulnerabilityNames = Object.keys(reportValue.vulnerabilities);
  const exceptionNames = Object.keys(policyValue.exceptions);
  for (const name of vulnerabilityNames) {
    const vulnerability = reportValue.vulnerabilities[name];
    const exception = policyValue.exceptions[name];
    if (!isRecord(vulnerability) || !isRecord(exception)) {
      validationErrors.push(`Unexpected vulnerability: ${name}.`);
      continue;
    }
    if (vulnerability.severity !== exception.severity) {
      validationErrors.push(
        `${name} severity changed from ${String(exception.severity)} to ${String(vulnerability.severity)}.`
      );
    }
    if (!sameStrings(vulnerability.nodes, exception.nodes)) {
      validationErrors.push(`${name} dependency nodes changed.`);
    }
    const advisories = collectAdvisories(name, reportValue.vulnerabilities, new Set());
    if (!sameStrings([...advisories], exception.advisories)) {
      validationErrors.push(`${name} advisory roots changed.`);
    }
    if (typeof exception.reason !== 'string' || exception.reason.trim().length === 0) {
      validationErrors.push(`${name} has no audit exception rationale.`);
    }
  }

  for (const name of exceptionNames) {
    if (!(name in reportValue.vulnerabilities)) {
      validationErrors.push(`Stale audit exception must be removed: ${name}.`);
    }
  }
  return validationErrors;
}

function collectAdvisories(name, vulnerabilities, visited) {
  if (visited.has(name)) return new Set();
  visited.add(name);
  const vulnerability = vulnerabilities[name];
  if (!isRecord(vulnerability) || !Array.isArray(vulnerability.via)) {
    return new Set([`unresolved:${name}`]);
  }

  const advisories = new Set();
  for (const source of vulnerability.via) {
    if (typeof source === 'string') {
      for (const advisory of collectAdvisories(source, vulnerabilities, visited)) {
        advisories.add(advisory);
      }
      continue;
    }
    const match =
      isRecord(source) && typeof source.url === 'string'
        ? source.url.match(/\/(GHSA-[a-z0-9-]+)$/i)
        : undefined;
    advisories.add(match?.[1] ?? `unresolved:${name}`);
  }
  return advisories;
}

function sameStrings(actual, expected) {
  if (!Array.isArray(actual) || !Array.isArray(expected)) return false;
  return [...actual].sort().join('\n') === [...expected].sort().join('\n');
}

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
