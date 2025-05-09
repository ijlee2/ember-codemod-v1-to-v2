import { convertToMap, convertToObject } from '@codemod-utils/json';

import type { Options, PackageJson } from '../../types/index.js';
import { getLatestVersion } from '../../utils/blueprints.js';

export function updateDevDependencies(
  packageJson: PackageJson,
  options: Options,
): void {
  const { packages } = options;

  const devDependencies = convertToMap(packageJson['devDependencies']);

  const packagesToInstall = new Set([
    '@embroider/broccoli-side-watch',
    '@eslint/js',
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
    packagesToInstall.add('@glint/core');
    packagesToInstall.add('@glint/environment-ember-loose');
    packagesToInstall.add('@glint/environment-ember-template-imports');
    packagesToInstall.add('@glint/template');
  }

  Array.from(packagesToInstall).forEach((packageName) => {
    const version = getLatestVersion(packageName);

    devDependencies.set(packageName, version);
  });

  // Install addon
  devDependencies.set(packages.addon.name, packages.addon.version);

  packageJson['devDependencies'] = convertToObject(devDependencies);
}
