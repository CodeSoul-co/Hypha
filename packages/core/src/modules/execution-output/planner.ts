import type { ArtifactKind } from '../../contracts/artifact';
import type { CommandExecutionResult } from '../../contracts/command-execution';
import type {
  ExecutionOutputCollectionItem,
  ExecutionOutputCollectionPlan,
  ExecutionOutputCollectionPolicy,
  ExecutionOutputPlanner,
} from '../../contracts/execution-output';
import type { FileMutation } from '../../contracts/workspace';
import { FrameworkError } from '../../errors';
import { validateCommandExecutionResult } from '../command-execution';
import {
  emptyExecutionOutputSkipCounts,
  executionOutputTerminalStatusSchema,
  validateExecutionOutputCollectionPlan,
  validateExecutionOutputCollectionPolicy,
} from './contracts';

interface ArtifactClassification {
  kind: ArtifactKind;
  mimeType?: string;
}

export class DefaultExecutionOutputPlanner implements ExecutionOutputPlanner {
  plan(
    rawResult: CommandExecutionResult,
    rawPolicy: ExecutionOutputCollectionPolicy
  ): ExecutionOutputCollectionPlan {
    const result = validateCommandExecutionResult(rawResult);
    const policy = validateExecutionOutputCollectionPolicy(rawPolicy);
    const terminalStatus = executionOutputTerminalStatusSchema.safeParse(result.status);
    if (!terminalStatus.success) {
      throw new FrameworkError({
        code: 'EXECUTION_INVALID_REQUEST',
        message: 'Execution output collection requires a terminal result',
        context: { executionId: result.executionId, status: result.status },
      });
    }

    const includePatterns = (policy.includePatterns ?? ['**']).map(normalizePattern);
    const excludePatterns = (policy.excludePatterns ?? []).map(normalizePattern);
    const skipped = emptyExecutionOutputSkipCounts();
    const finalMutations = reduceToFinalMutations(result.changedFiles);
    const candidates: ExecutionOutputCollectionItem[] = [];

    for (const [relativePath, mutation] of finalMutations) {
      if (!matchesAny(relativePath, includePatterns)) {
        skipped.not_included += 1;
        continue;
      }
      if (matchesAny(relativePath, excludePatterns)) {
        skipped.excluded += 1;
        continue;
      }
      if (!isCollectableMutation(mutation)) {
        skipped.unsupported_mutation += 1;
        continue;
      }
      if (mutation.afterHash === undefined || mutation.afterSizeBytes === undefined) {
        skipped.missing_integrity_evidence += 1;
        continue;
      }

      const classification = policy.classifyByExtension
        ? classifyExecutionOutput(relativePath)
        : { kind: 'other' as const };
      candidates.push({
        relativePath,
        contentHash: mutation.afterHash,
        sizeBytes: mutation.afterSizeBytes,
        ...classification,
        ...(mutation.artifactRef ? { existingArtifactRef: mutation.artifactRef } : {}),
      });
    }

    candidates.sort((left, right) => comparePaths(left.relativePath, right.relativePath));

    const items: ExecutionOutputCollectionItem[] = [];
    let totalBytes = 0;
    for (const candidate of candidates) {
      if (policy.maxArtifacts !== undefined && items.length >= policy.maxArtifacts) {
        skipped.artifact_limit += 1;
        continue;
      }
      if (
        policy.maxTotalBytes !== undefined &&
        totalBytes + candidate.sizeBytes > policy.maxTotalBytes
      ) {
        skipped.byte_limit += 1;
        continue;
      }
      items.push(candidate);
      totalBytes += candidate.sizeBytes;
    }

    return validateExecutionOutputCollectionPlan({
      executionId: result.executionId,
      status: terminalStatus.data,
      items,
      existingArtifactRefs: collectExistingArtifactRefs(result),
      totalBytes,
      finalize: policy.finalizeOnSuccess === true && terminalStatus.data === 'completed',
      skipped,
    });
  }
}

export function classifyExecutionOutput(relativePath: string): ArtifactClassification {
  const lowerPath = relativePath.normalize('NFKC').toLocaleLowerCase('en-US');
  if (lowerPath.endsWith('.junit.xml')) {
    return { kind: 'test_report', mimeType: 'application/xml' };
  }

  const extension = lowerPath.includes('.') ? lowerPath.slice(lowerPath.lastIndexOf('.')) : '';
  return EXTENSION_CLASSIFICATIONS[extension] ?? { kind: 'other' };
}

function reduceToFinalMutations(mutations: FileMutation[]): Map<string, FileMutation> {
  const finalMutations = new Map<string, FileMutation>();
  for (const mutation of mutations) {
    const relativePath = normalizeWorkspacePath(mutation.path);
    if (mutation.operation === 'renamed' && mutation.oldPath) {
      finalMutations.delete(normalizeWorkspacePath(mutation.oldPath));
    }
    if (
      mutation.operation === 'permission_changed' &&
      isCollectableMutation(finalMutations.get(relativePath))
    ) {
      continue;
    }
    finalMutations.set(relativePath, mutation);
  }
  return finalMutations;
}

function isCollectableMutation(
  mutation: FileMutation | undefined
): mutation is FileMutation & { operation: 'created' | 'modified' | 'renamed' } {
  return (
    mutation !== undefined &&
    (mutation.operation === 'created' ||
      mutation.operation === 'modified' ||
      mutation.operation === 'renamed')
  );
}

function collectExistingArtifactRefs(result: CommandExecutionResult): string[] {
  const refs = [
    result.stdoutArtifactRef,
    result.stderrArtifactRef,
    ...result.generatedArtifactRefs,
  ].filter((value): value is string => value !== undefined);
  return [...new Set(refs)];
}

function normalizeWorkspacePath(value: string): string {
  return value.normalize('NFKC').replace(/\\/gu, '/');
}

function normalizePattern(value: string): string {
  return value.normalize('NFKC');
}

function matchesAny(relativePath: string, patterns: string[]): boolean {
  return patterns.some((pattern) => matchPathSegments(pattern.split('/'), relativePath.split('/')));
}

function matchPathSegments(pattern: string[], path: string[]): boolean {
  let patternIndex = 0;
  let pathIndex = 0;
  let globstarIndex = -1;
  let globstarPathIndex = -1;

  while (pathIndex < path.length) {
    const segment = pattern[patternIndex];
    if (segment !== undefined && segment !== '**' && matchSegment(segment, path[pathIndex] ?? '')) {
      patternIndex += 1;
      pathIndex += 1;
    } else if (segment === '**') {
      globstarIndex = patternIndex;
      globstarPathIndex = pathIndex;
      patternIndex += 1;
    } else if (globstarIndex >= 0) {
      patternIndex = globstarIndex + 1;
      globstarPathIndex += 1;
      pathIndex = globstarPathIndex;
    } else {
      return false;
    }
  }

  while (pattern[patternIndex] === '**') patternIndex += 1;
  return patternIndex === pattern.length;
}

function matchSegment(pattern: string, value: string): boolean {
  let patternIndex = 0;
  let valueIndex = 0;
  let starIndex = -1;
  let starValueIndex = -1;

  while (valueIndex < value.length) {
    if (pattern[patternIndex] === '?' || pattern[patternIndex] === value[valueIndex]) {
      patternIndex += 1;
      valueIndex += 1;
    } else if (pattern[patternIndex] === '*') {
      starIndex = patternIndex;
      starValueIndex = valueIndex;
      patternIndex += 1;
    } else if (starIndex >= 0) {
      patternIndex = starIndex + 1;
      starValueIndex += 1;
      valueIndex = starValueIndex;
    } else {
      return false;
    }
  }

  while (pattern[patternIndex] === '*') patternIndex += 1;
  return patternIndex === pattern.length;
}

function comparePaths(left: string, right: string): number {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

const EXTENSION_CLASSIFICATIONS: Readonly<Record<string, ArtifactClassification>> = {
  '.7z': { kind: 'archive', mimeType: 'application/x-7z-compressed' },
  '.avro': { kind: 'dataset', mimeType: 'application/avro' },
  '.bmp': { kind: 'image', mimeType: 'image/bmp' },
  '.bz2': { kind: 'archive', mimeType: 'application/x-bzip2' },
  '.c': { kind: 'code', mimeType: 'text/x-c' },
  '.cpp': { kind: 'code', mimeType: 'text/x-c++' },
  '.csv': { kind: 'table', mimeType: 'text/csv' },
  '.diff': { kind: 'patch', mimeType: 'text/x-diff' },
  '.doc': { kind: 'document', mimeType: 'application/msword' },
  '.docx': {
    kind: 'document',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  '.gif': { kind: 'image', mimeType: 'image/gif' },
  '.gz': { kind: 'archive', mimeType: 'application/gzip' },
  '.htm': { kind: 'document', mimeType: 'text/html' },
  '.html': { kind: 'document', mimeType: 'text/html' },
  '.java': { kind: 'code', mimeType: 'text/x-java-source' },
  '.jpeg': { kind: 'image', mimeType: 'image/jpeg' },
  '.jpg': { kind: 'image', mimeType: 'image/jpeg' },
  '.js': { kind: 'code', mimeType: 'text/javascript' },
  '.json': { kind: 'dataset', mimeType: 'application/json' },
  '.jsonl': { kind: 'dataset', mimeType: 'application/x-ndjson' },
  '.log': { kind: 'log', mimeType: 'text/plain' },
  '.md': { kind: 'document', mimeType: 'text/markdown' },
  '.mp3': { kind: 'audio', mimeType: 'audio/mpeg' },
  '.mp4': { kind: 'video', mimeType: 'video/mp4' },
  '.parquet': { kind: 'dataset', mimeType: 'application/vnd.apache.parquet' },
  '.patch': { kind: 'patch', mimeType: 'text/x-diff' },
  '.pdf': { kind: 'document', mimeType: 'application/pdf' },
  '.png': { kind: 'image', mimeType: 'image/png' },
  '.py': { kind: 'code', mimeType: 'text/x-python' },
  '.rs': { kind: 'code', mimeType: 'text/x-rust' },
  '.tar': { kind: 'archive', mimeType: 'application/x-tar' },
  '.ts': { kind: 'code', mimeType: 'text/typescript' },
  '.tsv': { kind: 'table', mimeType: 'text/tab-separated-values' },
  '.txt': { kind: 'document', mimeType: 'text/plain' },
  '.wav': { kind: 'audio', mimeType: 'audio/wav' },
  '.webm': { kind: 'video', mimeType: 'video/webm' },
  '.webp': { kind: 'image', mimeType: 'image/webp' },
  '.zip': { kind: 'archive', mimeType: 'application/zip' },
};
