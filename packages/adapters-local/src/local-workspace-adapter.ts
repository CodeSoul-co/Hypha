import { constants as fsConstants } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { FileMutation } from '@hypha/core';
import { executionProviderError } from './execution-provider-error';
import {
  LocalWorkspaceSnapshotLimitError,
  captureLocalWorkspaceSnapshot,
  diffLocalWorkspaceSnapshots,
  type LocalWorkspaceSnapshot,
} from './local-workspace-mutations';

export interface LocalWorkspaceAdapterOptions {
  workspaceRoot: string;
  maxTrackedFiles?: number;
  maxTrackedBytes?: number;
}

/** Adapts a governed Workspace root to Local Process mutation evidence. */
export class LocalWorkspaceAdapter {
  readonly workspaceRoot: string;
  private readonly maxTrackedFiles: number;
  private readonly maxTrackedBytes: number;

  constructor(options: LocalWorkspaceAdapterOptions) {
    if (!options.workspaceRoot.trim()) throw new Error('workspaceRoot is required.');
    this.workspaceRoot = path.resolve(options.workspaceRoot);
    this.maxTrackedFiles = positiveInteger(options.maxTrackedFiles ?? 10_000, 'maxTrackedFiles');
    this.maxTrackedBytes = positiveInteger(
      options.maxTrackedBytes ?? 256 * 1024 * 1024,
      'maxTrackedBytes'
    );
  }

  async assertAvailable(): Promise<void> {
    await fs.access(this.workspaceRoot, fsConstants.R_OK | fsConstants.W_OK);
    const stat = await fs.stat(this.workspaceRoot);
    if (!stat.isDirectory()) {
      throw executionProviderError(
        'EXECUTION_WORKSPACE_NOT_FOUND',
        'Local Workspace root must be a directory.',
        false
      );
    }
  }

  async capture(): Promise<LocalWorkspaceSnapshot> {
    try {
      return await captureLocalWorkspaceSnapshot(this.workspaceRoot, {
        maxFiles: this.maxTrackedFiles,
        maxBytes: this.maxTrackedBytes,
      });
    } catch (error) {
      if (error instanceof LocalWorkspaceSnapshotLimitError) {
        throw executionProviderError(
          'EXECUTION_RESOURCE_EXCEEDED',
          error.message,
          false,
          error.details
        );
      }
      throw error;
    }
  }

  diff(
    before: LocalWorkspaceSnapshot,
    after: LocalWorkspaceSnapshot,
    detectedAt: string
  ): FileMutation[] {
    return diffLocalWorkspaceSnapshots(before, after, detectedAt);
  }
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer.`);
  }
  return value;
}
