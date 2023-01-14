import { augmentOptions, useRelativePaths } from './steps/index.js';

export function migrateEmberAddon(options) {
  const augmentedOptions = augmentOptions(options);
  const { isV1Addon } = augmentedOptions.packages.addon;

  // Guarantee idempotency
  if (!isV1Addon) {
    return;
  }

  // Prepare for migration
  useRelativePaths(augmentedOptions);
}
