import { convertToMap, convertToObject } from '@codemod-utils/package-json';

import type { Options, PackageJson } from '../../types/index.js';
import { getLatestVersion } from '../../utils/blueprints.js';

export function updateDependencies(
  packageJson: PackageJson,
  options: Options,
): void {
  const dependencies = convertToMap(packageJson['dependencies']);

  const packagesToDelete = new Set([
    '@embroider/macros',
    'ember-auto-import',
    'ember-cli-babel',
    'ember-cli-htmlbars',
  ]);

  if (options.packages.addon.hasTypeScript) {
    packagesToDelete.add('ember-cli-typescript');
  }

  packagesToDelete.forEach((packageName) => {
    dependencies.delete(packageName);
  });

  const packagesToInstall = ['@embroider/addon-shim', 'decorator-transforms'];

  packagesToInstall.forEach((packageName) => {
    const version = getLatestVersion(packageName);

    dependencies.set(packageName, version);
  });

  packageJson['dependencies'] = convertToObject(dependencies);
}
