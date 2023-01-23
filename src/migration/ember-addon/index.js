import {
  analyzeAddon,
  createOptions,
  createFilesFromBlueprint,
  moveAddonFiles,
  moveProjectRootFiles,
  moveTestAppFiles,
  updateAddonPackageJson,
  updateAddonTsconfigJson,
  updateTestAppPackageJson,
  updateTestAppTsconfigJson,
  useRelativePaths,
} from './steps/index.js';

export function migrateEmberAddon(codemodOptions) {
  const options = createOptions(codemodOptions);
  const { isV1Addon } = options.packages.addon;

  // Guarantee idempotency
  if (!isV1Addon) {
    return;
  }

  // Prepare for migration
  const context = analyzeAddon(options);
  useRelativePaths(options);

  // Preserve code
  moveAddonFiles(options);
  moveTestAppFiles(options);
  moveProjectRootFiles(options);

  // Get the latest code from blueprint
  createFilesFromBlueprint(context, options);

  // Fine-tune individual files
  updateAddonPackageJson(options);
  updateAddonTsconfigJson(options);
  updateTestAppPackageJson(options);
  updateTestAppTsconfigJson(options);
}
