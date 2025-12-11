import { convertToMap, convertToObject } from '@codemod-utils/package-json';

import type { Options, PackageJson } from '../../types/index.js';
import { getLatestVersion } from '../../utils/blueprints.js';

export function updateDevDependencies(
  packageJson: PackageJson,
  options: Options,
): void {
  const { packages } = options;

  const devDependencies = convertToMap(packageJson['devDependencies']);

  const packagesToDelete = new Set([
    '@glint/core',
    '@glint/environment-ember-loose',
    '@glint/environment-ember-template-imports',
    'ember-cli-typescript',
  ]);

  packagesToDelete.forEach((packageName) => {
    devDependencies.delete(packageName);
  });

  const packagesToInstall = new Set([
    '@embroider/broccoli-side-watch',
    '@ijlee2-frontend-configs/ember-template-lint',
    '@ijlee2-frontend-configs/eslint-config-ember',
    '@ijlee2-frontend-configs/prettier',
    '@ijlee2-frontend-configs/stylelint',
    'concurrently',
    'ember-cli',
    'ember-source',
    'ember-template-lint',
    'ember-try',
    'eslint',
    'prettier',
    'stylelint',
  ]);

  if (packages.addon.hasTypeScript) {
    packagesToInstall.add('@tsconfig/ember');
    packagesToInstall.add('typescript');
  }

  if (packages.addon.hasGlint) {
    packagesToInstall.add('@glint/ember-tsc');
    packagesToInstall.add('@glint/template');
    packagesToInstall.add('@glint/tsserver-plugin');
  }

  packagesToInstall.forEach((packageName) => {
    const version = getLatestVersion(packageName);

    devDependencies.set(packageName, version);
  });

  // Install addon
  devDependencies.set(packages.addon.name, packages.addon.version);

  packageJson['devDependencies'] = convertToObject(devDependencies);
}
