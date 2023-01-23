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
  const augmentedOptions = createOptions(codemodOptions);
  const { isV1Addon } = augmentedOptions.packages.addon;

  // Guarantee idempotency
  if (!isV1Addon) {
    return;
  }

  // Prepare for migration
  const context = analyzeAddon(augmentedOptions);
  useRelativePaths(augmentedOptions);

  // Preserve code
  moveAddonFiles(augmentedOptions);
  moveTestAppFiles(augmentedOptions);
  moveProjectRootFiles(augmentedOptions);

  // Get the latest code from blueprint
  createFilesFromBlueprint(context, augmentedOptions);

  // Fine-tune individual files
  updateAddonPackageJson(augmentedOptions);
  updateAddonTsconfigJson(augmentedOptions);
  updateTestAppPackageJson(augmentedOptions);
  updateTestAppTsconfigJson(augmentedOptions);
}
