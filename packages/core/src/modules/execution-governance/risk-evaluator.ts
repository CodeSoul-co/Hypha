import type { CommandExecutionRequest } from '../../contracts/command-execution';
import type {
  ExecutionRiskAssessment,
  ExecutionRiskEvaluationInput,
  ExecutionRiskEvaluator,
} from '../../contracts/execution-governance';
import type { RiskLevel } from '../../specs';
import type { WorkspaceOperationRequest } from '../../contracts/execution-activities';
import type {
  WorkspaceDeleteRequest,
  WorkspacePathRequest,
  WorkspaceWriteRequest,
} from '../../contracts/workspace';
import { validateCommandExecutionRequest } from '../command-execution';
import { validateExecutionEnvironmentSpec } from '../execution-environment';
import { validateWorkspaceOperationRequest } from '../execution-activities';
import { validateWorkspaceSpec } from '../workspace';
import { validateExecutionRiskAssessment, validateExecutionToolBinding } from './contracts';

export const EXECUTION_RISK_RULE_IDS = {
  governedRead: 'execution.risk.governed_read',
  workspaceWrite: 'execution.risk.workspace_write',
  externalEffect: 'execution.risk.external_effect',
  irreversibleEffect: 'execution.risk.irreversible_effect',
  shellExecution: 'execution.risk.shell_execution',
  recursiveDelete: 'execution.risk.recursive_delete',
  inputDirectoryWrite: 'execution.risk.input_directory_write',
  networkAccess: 'execution.risk.network_access',
  packageInstall: 'execution.risk.package_install',
  downloadedScriptExecution: 'execution.risk.downloaded_script_execution',
  permissionModification: 'execution.risk.permission_modification',
  executableNotAllowed: 'execution.risk.executable_not_allowed',
  executableDenied: 'execution.risk.executable_denied',
  secretAccess: 'execution.risk.secret_access',
  backgroundProcess: 'execution.risk.background_process',
  externalPublish: 'execution.risk.external_publish',
} as const;

type RiskRuleId = (typeof EXECUTION_RISK_RULE_IDS)[keyof typeof EXECUTION_RISK_RULE_IDS];

interface RiskMatch {
  ruleId: RiskRuleId;
  reason: string;
  level: RiskLevel;
}

const riskRank: Record<RiskLevel, number> = {
  low: 0,
  medium: 1,
  high: 2,
  critical: 3,
};

const networkExecutables = new Set([
  'curl',
  'ftp',
  'invoke-restmethod',
  'invoke-webrequest',
  'nc',
  'netcat',
  'scp',
  'sftp',
  'ssh',
  'wget',
]);

const permissionExecutables = new Set(['chmod', 'chown', 'icacls', 'setfacl', 'takeown']);

const backgroundExecutables = new Set(['nohup', 'start', 'start-process']);

const packageInstallCommands: Readonly<Record<string, readonly string[]>> = {
  apt: ['install'],
  'apt-get': ['install'],
  apk: ['add'],
  brew: ['install'],
  choco: ['install'],
  dnf: ['install'],
  npm: ['install', 'i'],
  pacman: ['-s'],
  pip: ['install'],
  pip3: ['install'],
  pnpm: ['add', 'install'],
  winget: ['install'],
  yarn: ['add'],
  yum: ['install'],
};

export class DefaultExecutionRiskEvaluator implements ExecutionRiskEvaluator {
  evaluate(input: ExecutionRiskEvaluationInput): ExecutionRiskAssessment {
    const assessmentId = nonEmpty(input.assessmentId, 'assessmentId');
    const evaluatedAt = timestamp(input.evaluatedAt);
    const binding = validateExecutionToolBinding(input.binding);
    const environment = validateExecutionEnvironmentSpec(input.environment);
    const workspace = validateWorkspaceSpec(input.workspace);
    const request = isCommandExecutionRequest(input.request)
      ? validateCommandExecutionRequest(input.request)
      : validateWorkspaceOperationRequest(input.request);

    if (isCommandExecutionRequest(request)) {
      assertEnvironmentReference(request, environment.id, environment.version);
    }

    const matches: RiskMatch[] = [baseRisk(binding.sideEffectLevel)];
    if (isCommandExecutionRequest(request)) {
      assessCommand(
        request,
        environment,
        workspace.directories.inputs,
        binding.sideEffectLevel
      ).forEach((match) => matches.push(match));
    } else {
      assessWorkspaceOperation(request, workspace.directories.inputs).forEach((match) =>
        matches.push(match)
      );
    }

    const deduplicated = deduplicateMatches(matches);
    const level = deduplicated.reduce<RiskLevel>(
      (highest, match) => (riskRank[match.level] > riskRank[highest] ? match.level : highest),
      'low'
    );
    const requiresApproval =
      level === 'high' || level === 'critical' || Boolean(binding.humanReviewPolicyRef);

    return validateExecutionRiskAssessment({
      id: assessmentId,
      level,
      reasons: deduplicated.map((match) => match.reason),
      matchedRules: deduplicated.map((match) => match.ruleId),
      requiresApproval,
      ...(level === 'critical'
        ? { recommendedSandboxLevel: 'remote_isolated' as const }
        : level === 'high'
          ? { recommendedSandboxLevel: 'container' as const }
          : {}),
      evaluatedAt,
    });
  }
}

function baseRisk(
  sideEffectLevel: ExecutionRiskEvaluationInput['binding']['sideEffectLevel']
): RiskMatch {
  switch (sideEffectLevel) {
    case 'read':
      return match(EXECUTION_RISK_RULE_IDS.governedRead, 'governed_read_operation', 'low');
    case 'write':
      return match(EXECUTION_RISK_RULE_IDS.workspaceWrite, 'workspace_write', 'medium');
    case 'external_effect':
      return match(EXECUTION_RISK_RULE_IDS.externalEffect, 'external_effect', 'high');
    case 'irreversible':
      return match(EXECUTION_RISK_RULE_IDS.irreversibleEffect, 'irreversible_effect', 'critical');
  }
}

function assessCommand(
  request: CommandExecutionRequest,
  environment: ExecutionRiskEvaluationInput['environment'],
  inputDirectory: string,
  sideEffectLevel: ExecutionRiskEvaluationInput['binding']['sideEffectLevel']
): RiskMatch[] {
  const matches: RiskMatch[] = [];
  const executable = executableName(request.executable);
  const args = (request.args ?? []).map((argument) => argument.toLowerCase());
  const commandText = [executable, ...args].join(' ');

  if (request.shell) {
    matches.push(match(EXECUTION_RISK_RULE_IDS.shellExecution, 'shell_execution', 'high'));
  }
  if (isRecursiveDelete(executable, args)) {
    matches.push(match(EXECUTION_RISK_RULE_IDS.recursiveDelete, 'recursive_delete', 'critical'));
  }
  if (sideEffectLevel !== 'read' && request.cwd && isAtOrUnder(request.cwd, inputDirectory)) {
    matches.push(
      match(EXECUTION_RISK_RULE_IDS.inputDirectoryWrite, 'input_directory_write', 'high')
    );
  }
  if (isNetworkAccess(executable, args, request.networkAuthorizationRef)) {
    matches.push(match(EXECUTION_RISK_RULE_IDS.networkAccess, 'network_access', 'high'));
  }
  if (isPackageInstall(executable, args)) {
    matches.push(match(EXECUTION_RISK_RULE_IDS.packageInstall, 'package_install', 'high'));
  }
  if (executesDownloadedScript(commandText)) {
    matches.push(
      match(
        EXECUTION_RISK_RULE_IDS.downloadedScriptExecution,
        'downloaded_script_execution',
        'critical'
      )
    );
  }
  if (permissionExecutables.has(executable)) {
    matches.push(
      match(EXECUTION_RISK_RULE_IDS.permissionModification, 'permission_modification', 'high')
    );
  }

  const allowed = environment.process.allowedExecutables;
  if (allowed?.length && !allowed.includes(request.executable)) {
    matches.push(
      match(EXECUTION_RISK_RULE_IDS.executableNotAllowed, 'executable_not_allowlisted', 'high')
    );
  }
  if (environment.process.deniedExecutables?.includes(request.executable)) {
    matches.push(match(EXECUTION_RISK_RULE_IDS.executableDenied, 'executable_denied', 'critical'));
  }
  if (request.secretRefs?.length) {
    matches.push(match(EXECUTION_RISK_RULE_IDS.secretAccess, 'secret_access', 'high'));
  }
  if (isBackgroundProcess(executable, commandText)) {
    matches.push(match(EXECUTION_RISK_RULE_IDS.backgroundProcess, 'background_process', 'high'));
  }
  if (isExternalPublish(executable, args)) {
    matches.push(match(EXECUTION_RISK_RULE_IDS.externalPublish, 'external_publish', 'critical'));
  }
  return matches;
}

function assessWorkspaceOperation(
  request: WorkspaceOperationRequest,
  inputDirectory: string
): RiskMatch[] {
  const matches: RiskMatch[] = [];
  if (isWorkspaceDeleteRequest(request) && request.recursive) {
    matches.push(match(EXECUTION_RISK_RULE_IDS.recursiveDelete, 'recursive_delete', 'critical'));
  }
  if (isInputMutation(request, inputDirectory)) {
    matches.push(
      match(EXECUTION_RISK_RULE_IDS.inputDirectoryWrite, 'input_directory_write', 'high')
    );
  }
  return matches;
}

function isInputMutation(request: WorkspaceOperationRequest, inputDirectory: string): boolean {
  if (isWorkspaceWriteRequest(request) || isWorkspaceDeleteRequest(request)) {
    return isAtOrUnder(request.relativePath, inputDirectory);
  }
  return (
    isWorkspacePathRequest(request) &&
    (request.operation === 'write' || request.operation === 'delete') &&
    isAtOrUnder(request.relativePath, inputDirectory)
  );
}

function isCommandExecutionRequest(
  request: ExecutionRiskEvaluationInput['request']
): request is CommandExecutionRequest {
  return 'executable' in request && 'environmentRef' in request && 'runId' in request;
}

function isWorkspaceWriteRequest(
  request: WorkspaceOperationRequest
): request is WorkspaceWriteRequest {
  return 'mode' in request && 'relativePath' in request && !('patchArtifactRef' in request);
}

function isWorkspaceDeleteRequest(
  request: WorkspaceOperationRequest
): request is WorkspaceDeleteRequest {
  return (
    'operationId' in request &&
    'relativePath' in request &&
    !('mode' in request) &&
    !('snapshotRef' in request) &&
    !('fromSnapshotRef' in request)
  );
}

function isWorkspacePathRequest(
  request: WorkspaceOperationRequest
): request is WorkspacePathRequest {
  return 'operation' in request && 'relativePath' in request;
}

function executableName(executable: string): string {
  const normalized = executable.replace(/\\/gu, '/');
  return normalized.slice(normalized.lastIndexOf('/') + 1).toLowerCase();
}

function isRecursiveDelete(executable: string, args: readonly string[]): boolean {
  if (executable === 'rm') {
    return args.some(
      (argument) => /^-[a-z]*r[a-z]*$/iu.test(argument) || argument === '--recursive'
    );
  }
  if (executable === 'remove-item') return args.includes('-recurse');
  if (executable === 'rmdir' || executable === 'rd' || executable === 'del') {
    return args.includes('/s');
  }
  return false;
}

function isPackageInstall(executable: string, args: readonly string[]): boolean {
  const commands = packageInstallCommands[executable];
  return Boolean(commands?.some((command) => args.includes(command)));
}

function isNetworkAccess(
  executable: string,
  args: readonly string[],
  networkAuthorizationRef?: string
): boolean {
  if (networkAuthorizationRef || networkExecutables.has(executable)) return true;
  if (executable !== 'git') return false;
  return ['clone', 'fetch', 'pull', 'push', 'ls-remote', 'submodule'].includes(args[0] ?? '');
}

function executesDownloadedScript(commandText: string): boolean {
  const downloads = /\b(?:curl|wget|invoke-webrequest)\b/iu.test(commandText);
  const executes = /(?:\||&&)\s*(?:bash|sh|node|powershell|pwsh|python3?)\b/iu.test(commandText);
  return downloads && executes;
}

function isBackgroundProcess(executable: string, commandText: string): boolean {
  return backgroundExecutables.has(executable) || /(?:^|\s)&(?:\s|$)/u.test(commandText);
}

function isExternalPublish(executable: string, args: readonly string[]): boolean {
  const subcommand = args[0];
  if (executable === 'git') return subcommand === 'push';
  if (['npm', 'pnpm', 'yarn'].includes(executable)) return subcommand === 'publish';
  if (executable === 'docker') return subcommand === 'push';
  if (executable === 'kubectl') {
    return ['apply', 'create', 'delete', 'rollout'].includes(subcommand ?? '');
  }
  if (executable === 'helm') return ['install', 'upgrade', 'uninstall'].includes(subcommand ?? '');
  if (executable === 'terraform') return ['apply', 'destroy'].includes(subcommand ?? '');
  return executable === 'gh' && subcommand === 'release' && args[1] === 'create';
}

function isAtOrUnder(relativePath: string, root: string): boolean {
  const path = normalizeWorkspacePath(relativePath);
  const normalizedRoot = normalizeWorkspacePath(root);
  return path === normalizedRoot || path.startsWith(`${normalizedRoot}/`);
}

function normalizeWorkspacePath(value: string): string {
  return value.replace(/\\/gu, '/').replace(/^\.\//u, '').replace(/\/$/u, '').toLowerCase();
}

function assertEnvironmentReference(
  request: CommandExecutionRequest,
  environmentId: string,
  environmentVersion: string
): void {
  if (
    request.environmentRef.id !== environmentId ||
    request.environmentRef.version !== environmentVersion
  ) {
    throw new Error('Command environmentRef must match the evaluated ExecutionEnvironmentSpec.');
  }
}

function deduplicateMatches(matches: readonly RiskMatch[]): RiskMatch[] {
  const byRule = new Map<RiskRuleId, RiskMatch>();
  for (const candidate of matches) {
    const existing = byRule.get(candidate.ruleId);
    if (!existing || riskRank[candidate.level] > riskRank[existing.level]) {
      byRule.set(candidate.ruleId, candidate);
    }
  }
  return [...byRule.values()];
}

function match(ruleId: RiskRuleId, reason: string, level: RiskLevel): RiskMatch {
  return { ruleId, reason, level };
}

function nonEmpty(value: string, name: string): string {
  if (!value.trim()) throw new Error(`${name} must not be empty.`);
  return value;
}

function timestamp(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/u.test(value)) {
    throw new Error('evaluatedAt must be an ISO 8601 timestamp with an offset.');
  }
  if (Number.isNaN(Date.parse(value))) {
    throw new Error('evaluatedAt must be a valid timestamp.');
  }
  return value;
}
