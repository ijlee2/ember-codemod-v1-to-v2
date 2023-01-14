import {
  augmentOptions,
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

export function migrateEmberAddon(options) {
  const augmentedOptions = augmentOptions(options);
  const { isV1Addon } = augmentedOptions.packages.addon;

  // Guarantee idempotency
  if (!isV1Addon) {
    return;
  }

  // Prepare for migration
  useRelativePaths(augmentedOptions);

  // Preserve code
  moveAddonFiles(augmentedOptions);
  moveTestAppFiles(augmentedOptions);
  moveProjectRootFiles(augmentedOptions);

  // Get the latest code from blueprint
  createFilesFromBlueprint(augmentedOptions);

  // Fine-tune individual files
  updateAddonPackageJson(augmentedOptions);
  updateAddonTsconfigJson(augmentedOptions);
  updateTestAppPackageJson(augmentedOptions);
  updateTestAppTsconfigJson(augmentedOptions);
}
