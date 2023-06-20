import type { CodemodOptions } from '../../types/index.js';
import {
  analyzeAddon,
  createFilesFromBlueprints,
  createOptions,
  moveAddonFiles,
  moveProjectRootFiles,
  moveTestAppFiles,
  updateAddonPackageJson,
  updateAddonTsConfigJson,
  updateTestAppPackageJson,
  updateTestAppTsConfigJson,
} from './steps/index.js';

export function migrateEmberAddon(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);
  const { isV1Addon } = options.packages.addon;

  // Guarantee idempotency
  if (!isV1Addon) {
    return;
  }

  // Prepare for migration
  const context = analyzeAddon(options);

  // Preserve code
  moveAddonFiles(options);
  moveTestAppFiles(options);
  moveProjectRootFiles(options);

  // Get the latest code from blueprints
  createFilesFromBlueprints(context, options);

  // Fine-tune individual files
  updateAddonPackageJson(context, options);
  updateAddonTsConfigJson(options);
  updateTestAppPackageJson(options);
  updateTestAppTsConfigJson(options);
}
